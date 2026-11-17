const { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } = require('node:crypto');

const clientId = process.env.GITHUB_CLIENT_ID || '';
const clientSecret = process.env.GITHUB_CLIENT_SECRET || '';
const cookieSecret = process.env.COOKIE_SECRET || '';
const oauthConfigured = Boolean(clientId && clientSecret && cookieSecret.length >= 24);
const encryptionKey = createHash('sha256').update(cookieSecret || 'gitexplore-unconfigured').digest();

function origin(req) {
  if (process.env.APP_ORIGIN) return process.env.APP_ORIGIN.replace(/\/$/, '');
  const protocol = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  return `${protocol}://${req.headers.host}`;
}

function encode(value) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64url');
}

function decode(value) {
  try {
    const payload = Buffer.from(value, 'base64url');
    const decipher = createDecipheriv('aes-256-gcm', encryptionKey, payload.subarray(0, 12));
    decipher.setAuthTag(payload.subarray(12, 28));
    return JSON.parse(Buffer.concat([decipher.update(payload.subarray(28)), decipher.final()]).toString('utf8'));
  } catch { return null; }
}

function cookies(req) {
  return Object.fromEntries(String(req.headers.cookie || '').split(';').map(item => item.trim()).filter(Boolean).map(item => {
    const index = item.indexOf('=');
    return [decodeURIComponent(item.slice(0, index)), decodeURIComponent(item.slice(index + 1))];
  }));
}

function cookie(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${maxAge}`;
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function route(req) {
  return new URL(req.url, origin(req)).pathname.replace(/^\/api\/?/, '').replace(/\/$/, '');
}

function returnTo(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/';
}

function sameOrigin(req) {
  return !req.headers.origin || req.headers.origin === origin(req);
}

function session(req) {
  const value = decode(cookies(req).gitexplore_session || '');
  return value?.token && value?.user ? value : null;
}

function input(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch { return {}; }
}

async function githubFetch(path, options = {}) {
  return fetch(`https://api.github.com${path}`, { ...options, headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'GitExplore', ...(options.headers || {}) } });
}

module.exports = async function handler(req, res) {
  const path = route(req);
  const appOrigin = origin(req);

  if (path === 'auth/config' && req.method === 'GET') {
    return json(res, 200, { configured: oauthConfigured, callbackUrl: `${appOrigin}/api/auth/github/callback` });
  }

  if (path === 'auth/github' && req.method === 'GET') {
    if (!oauthConfigured) return json(res, 503, { error: 'GitHub OAuth is not configured.' });
    const state = randomBytes(24).toString('base64url');
    const pending = encode({ state, returnTo: returnTo(req.query?.returnTo), createdAt: Date.now() });
    res.setHeader('Set-Cookie', cookie('gitexplore_oauth', pending, 600));
    const authorize = new URL('https://github.com/login/oauth/authorize');
    authorize.searchParams.set('client_id', clientId);
    authorize.searchParams.set('redirect_uri', `${appOrigin}/api/auth/github/callback`);
    authorize.searchParams.set('scope', 'read:user public_repo');
    authorize.searchParams.set('state', state);
    res.statusCode = 302;
    res.setHeader('Location', authorize.toString());
    return res.end();
  }

  if (path === 'auth/github/callback' && req.method === 'GET') {
    const pending = decode(cookies(req).gitexplore_oauth || '');
    const returnedState = String(req.query?.state || '');
    const expectedState = String(pending?.state || '');
    const validState = returnedState.length === expectedState.length && returnedState.length > 10 && timingSafeEqual(Buffer.from(returnedState), Buffer.from(expectedState));
    if (!validState || Date.now() - Number(pending?.createdAt || 0) > 600000) return json(res, 400, { error: 'Invalid or expired OAuth state.' });
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code: req.query?.code, redirect_uri: `${appOrigin}/api/auth/github/callback` }) });
    const token = await tokenResponse.json();
    if (!token.access_token) return json(res, 401, { error: 'GitHub did not return an access token.' });
    const userResponse = await githubFetch('/user', { headers: { Authorization: `Bearer ${token.access_token}` } });
    const user = await userResponse.json();
    if (!userResponse.ok) return json(res, 401, { error: 'Could not load the GitHub user.' });
    const userData = { id: user.id, login: user.login, avatar_url: user.avatar_url, html_url: user.html_url };
    res.setHeader('Set-Cookie', [cookie('gitexplore_session', encode({ token: token.access_token, user: userData }), 2592000), cookie('gitexplore_oauth', '', 0)]);
    res.statusCode = 302;
    res.setHeader('Location', returnTo(pending.returnTo));
    return res.end();
  }

  if (path === 'me' && req.method === 'GET') {
    const current = session(req);
    return current ? json(res, 200, current.user) : json(res, 401, { error: 'Not signed in' });
  }

  if (path === 'auth/logout' && req.method === 'POST') {
    if (!sameOrigin(req)) return json(res, 403, { error: 'Invalid origin' });
    res.setHeader('Set-Cookie', cookie('gitexplore_session', '', 0));
    return json(res, 200, { ok: true });
  }

  if (path === 'github/comments' && req.method === 'POST') {
    if (!sameOrigin(req)) return json(res, 403, { error: 'Invalid origin' });
    const current = session(req);
    if (!current) return json(res, 401, { error: 'Sign in with GitHub first.' });
    const body = input(req);
    const repository = String(body.repository || '');
    const issueNumber = Number(body.issueNumber);
    const comment = String(body.body || '').trim();
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository) || !Number.isInteger(issueNumber) || issueNumber < 1 || !comment || comment.length > 1000) return json(res, 400, { error: 'Invalid comment request.' });
    const response = await githubFetch(`/repos/${repository}/issues/${issueNumber}/comments`, { method: 'POST', headers: { Authorization: `Bearer ${current.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ body: comment }) });
    const result = await response.json();
    return response.ok ? json(res, 201, { id: result.id, html_url: result.html_url }) : json(res, response.status, { error: result.message || 'GitHub rejected the comment.' });
  }

  if (path === 'translate' && req.method === 'POST') {
    if (!sameOrigin(req)) return json(res, 403, { error: 'Invalid origin' });
    const body = input(req);
    const paragraphs = Array.isArray(body.paragraphs) ? body.paragraphs.map(value => String(value).trim()).filter(Boolean) : [];
    const requested = String(body.sourceLanguage || 'auto').toLowerCase();
    const source = /^[a-z]{2,3}(?:-[a-z]{2})?$/.test(requested) ? requested : 'auto';
    if (!paragraphs.length || paragraphs.length > 6 || paragraphs.some(text => text.length > 2400) || paragraphs.join('').length > 9000) return json(res, 400, { error: 'Invalid translation request.' });
    try {
      const translated = await Promise.all(paragraphs.map(async text => {
        const endpoint = new URL('https://translate.googleapis.com/translate_a/single');
        Object.entries({ client: 'gtx', sl: source, tl: 'en', dt: 't', q: text }).forEach(([key, value]) => endpoint.searchParams.set(key, value));
        const response = await fetch(endpoint, { headers: { 'User-Agent': 'GitExplore/1.0' } });
        if (!response.ok) throw new Error('Translation failed');
        const payload = await response.json();
        return Array.isArray(payload?.[0]) ? payload[0].map(part => part?.[0] || '').join('') : '';
      }));
      if (translated.some(value => !value)) throw new Error('Empty translation');
      return json(res, 200, { paragraphs: translated });
    } catch { return json(res, 502, { error: 'Translation service unavailable.' }); }
  }

  return json(res, 404, { error: 'Not found' });
};
