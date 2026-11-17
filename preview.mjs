import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { extname, join, normalize } from 'node:path';

async function loadLocalEnv() {
  try {
    const source = await readFile(new URL('./.env', import.meta.url), 'utf8');
    for (const line of source.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !(match[1] in process.env)) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {}
}

await loadLocalEnv();

const root = new URL('./dist/', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const port = Number(process.env.PORT || 4173);
const appOrigin = process.env.APP_ORIGIN || `http://127.0.0.1:${port}`;
const githubClientId = process.env.GITHUB_CLIENT_ID || '';
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || '';
const cookieSecret = process.env.COOKIE_SECRET || '';
const oauthConfigured = Boolean(githubClientId && githubClientSecret && cookieSecret.length >= 24);
const encryptionKey = createHash('sha256').update(cookieSecret || 'gitexplore-development-only').digest();
const secureCookie = appOrigin.startsWith('https://') ? '; Secure' : '';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json; charset=utf-8', '.svg': 'image/svg+xml; charset=utf-8' };

function encodeSession(value) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64url');
}

function decodeSession(value) {
  try {
    const payload = Buffer.from(value, 'base64url');
    const iv = payload.subarray(0, 12);
    const tag = payload.subarray(12, 28);
    const decipher = createDecipheriv('aes-256-gcm', encryptionKey, iv);
    decipher.setAuthTag(tag);
    return JSON.parse(Buffer.concat([decipher.update(payload.subarray(28)), decipher.final()]).toString('utf8'));
  } catch { return null; }
}

function cookies(request) {
  return Object.fromEntries((request.headers.cookie || '').split(';').map(value => value.trim()).filter(Boolean).map(value => {
    const index = value.indexOf('=');
    return [decodeURIComponent(value.slice(0, index)), decodeURIComponent(value.slice(index + 1))];
  }));
}

function setCookie(response, name, value, maxAge) {
  response.setHeader('Set-Cookie', `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureCookie}`);
}

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 12000) throw new Error('Request too large');
  }
  return JSON.parse(body || '{}');
}

function translationChunks(text, maxBytes = 450) {
  const chunks = [];
  let chunk = '';
  for (const character of text) {
    if (chunk && Buffer.byteLength(chunk + character, 'utf8') > maxBytes) { chunks.push(chunk); chunk = character; }
    else chunk += character;
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

async function translateText(text, source) {
  try {
    const endpoint = new URL('https://translate.googleapis.com/translate_a/single');
    Object.entries({ client: 'gtx', sl: source, tl: 'en', dt: 't', q: text }).forEach(([key, value]) => endpoint.searchParams.set(key, value));
    const response = await fetch(endpoint, { headers: { 'User-Agent': 'GitExplore/1.0' } });
    if (!response.ok) throw new Error('Primary translation failed');
    const payload = await response.json();
    const translated = Array.isArray(payload?.[0]) ? payload[0].map(part => part?.[0] || '').join('') : '';
    if (!translated) throw new Error('Empty primary translation');
    return translated;
  } catch {
    const languageMap = { zh: 'zh-CN', pt: 'pt-PT' };
    const from = source === 'auto' ? 'autodetect' : (languageMap[source] || source);
    const pieces = [];
    for (const chunk of translationChunks(text)) {
      const endpoint = new URL('https://api.mymemory.translated.net/get');
      endpoint.searchParams.set('q', chunk);
      endpoint.searchParams.set('langpair', `${from}|en`);
      const response = await fetch(endpoint, { headers: { 'User-Agent': 'GitExplore/1.0' } });
      if (!response.ok) throw new Error('Fallback translation failed');
      const payload = await response.json();
      if (Number(payload?.responseStatus) !== 200 || !payload?.responseData?.translatedText) throw new Error('Empty fallback translation');
      pieces.push(payload.responseData.translatedText);
    }
    return pieces.join('');
  }
}

function safeReturnTo(value) { return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/'; }
function sameOrigin(request) { return !request.headers.origin || request.headers.origin === appOrigin; }
function currentSession(request) {
  const session = decodeSession(cookies(request).gitexplore_session || '');
  return session?.token && session?.user ? session : null;
}

async function handleApi(request, response, url) {
  if (url.pathname === '/api/auth/config' && request.method === 'GET') {
    sendJson(response, 200, { configured: oauthConfigured, callbackUrl: `${appOrigin}/api/auth/github/callback` });
    return true;
  }
  if (url.pathname === '/api/auth/github' && request.method === 'GET') {
    if (!oauthConfigured) { sendJson(response, 503, { error: 'GitHub OAuth is not configured. See .env.example.' }); return true; }
    const state = randomBytes(24).toString('base64url');
    const returnTo = safeReturnTo(url.searchParams.get('returnTo'));
    setCookie(response, 'gitexplore_oauth', encodeSession({ state, returnTo, createdAt: Date.now() }), 600);
    const authorize = new URL('https://github.com/login/oauth/authorize');
    authorize.searchParams.set('client_id', githubClientId);
    authorize.searchParams.set('redirect_uri', `${appOrigin}/api/auth/github/callback`);
    authorize.searchParams.set('scope', 'read:user public_repo');
    authorize.searchParams.set('state', state);
    response.writeHead(302, { Location: authorize.toString() });
    response.end();
    return true;
  }
  if (url.pathname === '/api/auth/github/callback' && request.method === 'GET') {
    const pending = decodeSession(cookies(request).gitexplore_oauth || '');
    const returnedState = url.searchParams.get('state') || '';
    const expectedState = pending?.state || '';
    const validState = returnedState.length === expectedState.length && returnedState.length > 10 && timingSafeEqual(Buffer.from(returnedState), Buffer.from(expectedState));
    if (!validState || Date.now() - Number(pending?.createdAt || 0) > 600000) { sendJson(response, 400, { error: 'Invalid or expired OAuth state.' }); return true; }
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: githubClientId, client_secret: githubClientSecret, code: url.searchParams.get('code'), redirect_uri: `${appOrigin}/api/auth/github/callback` }) });
    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) { sendJson(response, 401, { error: 'GitHub did not return an access token.' }); return true; }
    const userResponse = await fetch('https://api.github.com/user', { headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'GitExplore' } });
    const user = await userResponse.json();
    if (!userResponse.ok) { sendJson(response, 401, { error: 'Could not load the GitHub user.' }); return true; }
    const sessionCookie = `gitexplore_session=${encodeURIComponent(encodeSession({ token: tokenData.access_token, user: { id: user.id, login: user.login, avatar_url: user.avatar_url, html_url: user.html_url } }))}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${secureCookie}`;
    response.setHeader('Set-Cookie', [sessionCookie, `gitexplore_oauth=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureCookie}`]);
    response.writeHead(302, { Location: safeReturnTo(pending.returnTo) });
    response.end();
    return true;
  }
  if (url.pathname === '/api/me' && request.method === 'GET') {
    const session = currentSession(request);
    if (!session) { sendJson(response, 401, { error: 'Not signed in' }); return true; }
    sendJson(response, 200, session.user);
    return true;
  }
  if (url.pathname === '/api/auth/logout' && request.method === 'POST') {
    if (!sameOrigin(request)) { sendJson(response, 403, { error: 'Invalid origin' }); return true; }
    setCookie(response, 'gitexplore_session', '', 0);
    sendJson(response, 200, { ok: true });
    return true;
  }
  if (url.pathname === '/api/translate' && request.method === 'POST') {
    if (!sameOrigin(request)) { sendJson(response, 403, { error: 'Invalid origin' }); return true; }
    const input = await readJson(request);
    const paragraphs = Array.isArray(input.paragraphs) ? input.paragraphs.map(value => String(value).trim()).filter(Boolean) : [];
    const requestedLanguage = String(input.sourceLanguage || 'auto').toLowerCase();
    const sourceLanguage = /^[a-z]{2,3}(?:-[a-z]{2})?$/.test(requestedLanguage) ? requestedLanguage : 'auto';
    if (!paragraphs.length || paragraphs.length > 6 || paragraphs.some(text => text.length > 2400) || paragraphs.join('').length > 9000) { sendJson(response, 400, { error: 'Invalid translation request.' }); return true; }
    try {
      const translated = await Promise.all(paragraphs.map(text => translateText(text, sourceLanguage)));
      if (translated.some(text => !text)) throw new Error('Empty translation');
      sendJson(response, 200, { paragraphs: translated });
    } catch { sendJson(response, 502, { error: 'Translation service unavailable.' }); }
    return true;
  }
  if (url.pathname === '/api/github/comments' && request.method === 'POST') {
    if (!sameOrigin(request)) { sendJson(response, 403, { error: 'Invalid origin' }); return true; }
    const session = currentSession(request);
    if (!session) { sendJson(response, 401, { error: 'Sign in with GitHub first.' }); return true; }
    const input = await readJson(request);
    const repository = String(input.repository || '');
    const issueNumber = Number(input.issueNumber);
    const body = String(input.body || '').trim();
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository) || !Number.isInteger(issueNumber) || issueNumber < 1 || body.length < 1 || body.length > 1000) { sendJson(response, 400, { error: 'Invalid comment request.' }); return true; }
    const githubResponse = await fetch(`https://api.github.com/repos/${repository}/issues/${issueNumber}/comments`, { method: 'POST', headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json', 'User-Agent': 'GitExplore' }, body: JSON.stringify({ body }) });
    const result = await githubResponse.json();
    if (!githubResponse.ok) { sendJson(response, githubResponse.status, { error: result.message || 'GitHub rejected the comment.' }); return true; }
    sendJson(response, 201, { id: result.id, html_url: result.html_url });
    return true;
  }
  return false;
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, appOrigin);
    if (url.pathname.startsWith('/api/') && await handleApi(request, response, url)) return;
    const requested = decodeURIComponent(url.pathname);
    const relative = requested === '/' ? 'index.html' : requested.replace(/^\//, '');
    const path = normalize(join(root, relative));
    if (!path.startsWith(normalize(root))) throw new Error('Invalid path');
    const body = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`GitExplore: ${appOrigin}`));
