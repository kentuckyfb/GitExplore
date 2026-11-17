const fallbackRepos = [
  { id: 1, name: 'appwrite', full_name: 'appwrite/appwrite', html_url: 'https://github.com/appwrite/appwrite', description: 'A complete backend platform for building modern applications with authentication, databases, storage, functions and realtime APIs.', stargazers_count: 52000, forks_count: 4800, open_issues_count: 720, language: 'TypeScript', topics: ['backend', 'self-hosted', 'developer-tools', 'database'], owner: { login: 'appwrite', avatar_url: 'https://github.com/appwrite.png' }, updated_at: '2026-11-11T00:00:00Z' },
  { id: 2, name: 'cal.com', full_name: 'calcom/cal.com', html_url: 'https://github.com/calcom/cal.com', description: 'Scheduling infrastructure for everyone. A production-scale Next.js application with teams, workflows and integrations.', stargazers_count: 39000, forks_count: 9300, open_issues_count: 510, language: 'TypeScript', topics: ['nextjs', 'scheduling', 'saas', 'react'], owner: { login: 'calcom', avatar_url: 'https://github.com/calcom.png' }, updated_at: '2026-11-10T00:00:00Z' },
  { id: 3, name: 'fastapi', full_name: 'fastapi/fastapi', html_url: 'https://github.com/fastapi/fastapi', description: 'A modern, fast web framework for building APIs with Python based on standard type hints.', stargazers_count: 93000, forks_count: 8200, open_issues_count: 190, language: 'Python', topics: ['api', 'python', 'framework', 'openapi'], owner: { login: 'fastapi', avatar_url: 'https://github.com/fastapi.png' }, updated_at: '2026-11-12T00:00:00Z' },
  { id: 4, name: 'supabase', full_name: 'supabase/supabase', html_url: 'https://github.com/supabase/supabase', description: 'The open source Firebase alternative: Postgres database, authentication, instant APIs, edge functions, realtime and storage.', stargazers_count: 95000, forks_count: 11000, open_issues_count: 420, language: 'TypeScript', topics: ['postgres', 'database', 'realtime', 'backend'], owner: { login: 'supabase', avatar_url: 'https://github.com/supabase.png' }, updated_at: '2026-11-12T00:00:00Z' },
  { id: 5, name: 'rustdesk', full_name: 'rustdesk/rustdesk', html_url: 'https://github.com/rustdesk/rustdesk', description: 'An open-source remote desktop application designed for self-hosting, with clients across desktop and mobile.', stargazers_count: 106000, forks_count: 15000, open_issues_count: 970, language: 'Rust', topics: ['remote-desktop', 'self-hosted', 'flutter', 'security'], owner: { login: 'rustdesk', avatar_url: 'https://github.com/rustdesk.png' }, updated_at: '2026-11-09T00:00:00Z' },
  { id: 6, name: 'excalidraw', full_name: 'excalidraw/excalidraw', html_url: 'https://github.com/excalidraw/excalidraw', description: 'A virtual collaborative whiteboard tool with an approachable hand-drawn look and an excellent interactive canvas architecture.', stargazers_count: 110000, forks_count: 11000, open_issues_count: 1300, language: 'TypeScript', topics: ['canvas', 'whiteboard', 'collaboration', 'react'], owner: { login: 'excalidraw', avatar_url: 'https://github.com/excalidraw.png' }, updated_at: '2026-11-10T00:00:00Z' },
  { id: 7, name: 'remote-jobs', full_name: 'remoteintech/remote-jobs', html_url: 'https://github.com/remoteintech/remote-jobs', description: 'A community-maintained list of technology companies that support remote work and distributed teams.', stargazers_count: 34000, forks_count: 3600, open_issues_count: 70, language: 'JavaScript', topics: ['jobs', 'remote-jobs', 'careers', 'hiring'], owner: { login: 'remoteintech', avatar_url: 'https://github.com/remoteintech.png' }, updated_at: '2026-11-10T00:00:00Z' }
];

const languages = ['All', 'TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Java', 'C#', 'C++', 'Kotlin', 'Swift', 'Dart', 'Ruby', 'PHP'];
const frameworks = ['Any', 'React', 'Next.js', 'Vue', 'Svelte', 'Angular', 'Node.js', 'Django', 'FastAPI', 'Flask', 'Rails', 'Laravel', 'Flutter', 'Docker', 'Kubernetes', 'Postgres', 'GraphQL'];
const topics = ['Any', 'Fun & hobby', 'Professional', 'AI', 'Developer tools', 'Backend', 'Frontend', 'Analytics', 'Visual', 'Learning', 'Games', 'Mobile', 'CLI', 'Security', 'Self-hosted', 'Creative'];
const discoveryModes = [
  { id: 'balanced', label: 'For you', detail: 'Varied stars, stacks and activity' },
  { id: 'hidden', label: 'Hidden gems', detail: 'Useful projects below the usual radar' },
  { id: 'jobs', label: 'Jobs & careers', detail: 'Job boards, hiring lists and career tools' },
  { id: 'rising', label: 'New & active', detail: 'Recently pushed projects with momentum' },
  { id: 'popular', label: 'Established', detail: 'Widely used, high-signal repositories' }
];
const frameworkQueries = { React: 'topic:react', 'Next.js': 'topic:nextjs', Vue: 'topic:vue', Svelte: 'topic:svelte', Angular: 'topic:angular', 'Node.js': 'topic:nodejs', Django: 'topic:django', FastAPI: 'topic:fastapi', Flask: 'topic:flask', Rails: 'topic:rails', Laravel: 'topic:laravel', Flutter: 'topic:flutter', Docker: 'topic:docker', Kubernetes: 'topic:kubernetes', Postgres: 'topic:postgresql', GraphQL: 'topic:graphql' };
const topicQueries = { 'Fun & hobby': 'topic:side-project', Professional: 'topic:production-ready', AI: 'topic:artificial-intelligence', 'Developer tools': 'topic:developer-tools', Backend: 'topic:backend', Frontend: 'topic:frontend', Analytics: 'topic:analytics', Visual: 'topic:data-visualization', Learning: 'topic:education', Games: 'topic:game', Mobile: 'topic:mobile', CLI: 'topic:cli', Security: 'topic:security', 'Self-hosted': 'topic:self-hosted', Creative: 'topic:creative-coding' };
const jobTopicQueries = ['topic:jobs', 'topic:job-board', 'topic:hiring', 'topic:careers'];
const languageColors = { TypeScript: '#3178c6', Python: '#3572A5', Rust: '#dea584', Go: '#00ADD8', Java: '#b07219', JavaScript: '#f1e05a', C: '#555555', 'C++': '#f34b7d', HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Ruby: '#701516', PHP: '#4F5D95', Dart: '#00B4AB', Swift: '#f05138', Kotlin: '#A97BFF' };
const techDescriptions = {
  TypeScript: 'JavaScript with static types. It helps teams catch mistakes earlier and makes large codebases easier to navigate and refactor.',
  JavaScript: 'The programming language of the web, commonly used for browser interfaces, servers, tooling, and cross-platform applications.',
  Python: 'A readable general-purpose language widely used for backend services, automation, data science, machine learning, and developer tooling.',
  Rust: 'A systems language focused on performance, memory safety, and reliable concurrency without a garbage collector.',
  Go: 'A compiled language designed for simple, concurrent, networked software such as APIs, infrastructure tools, and cloud services.',
  Java: 'A strongly typed language commonly used for large backend systems, Android applications, and enterprise software.',
  HTML: 'The structural markup used to define content and semantics for web pages and web-based interfaces.',
  CSS: 'The styling language used to control layout, typography, responsiveness, and visual presentation on the web.',
  Shell: 'Command-line scripts used to automate development, build, deployment, and system-administration workflows.',
  Markdown: 'A lightweight text format used for documentation, guides, project notes, and repository content.',
  React: 'A component-based JavaScript library for building interactive user interfaces.',
  Nextjs: 'A React framework providing routing, server rendering, data loading, and production web-application tooling.',
  Docker: 'A container platform for packaging applications and their dependencies into repeatable environments.',
  Kubernetes: 'A platform for deploying, scaling, and operating containerized applications across clusters.',
  Postgres: 'A powerful relational database known for reliability, standards support, and advanced data features.',
  Graphql: 'An API query language that lets clients request precisely the data they need.',
  'Machine learning': 'Techniques that let software learn patterns from data for prediction, classification, generation, and automation.'
};

const state = { repos: fallbackRepos, view: 'discover', language: 'All', framework: 'Any', topic: 'Any', discovery: 'balanced', sort: 'stars', page: 1, cycle: 0, loading: false, query: '', activeRepo: null, requestId: 0 };
const saved = new Set(JSON.parse(localStorage.getItem('repodive:saved') || '[]'));
const savedRepoDetails = new Map(Object.entries(JSON.parse(localStorage.getItem('gitexplore:saved-details') || '{}')));
const liked = new Set(JSON.parse(localStorage.getItem('repodive:liked') || '[]'));
const seen = new Set(JSON.parse(localStorage.getItem('repodive:seen') || '[]'));
const delivered = new Set();
const readmeCache = new Map();
const readmeOriginals = new WeakMap();
const stackCache = new Map();
const architectureCache = new Map();
const githubDiscussionCache = new Map();
const repoTranslationStates = new Map();
let githubUser = null;
let installPromptEvent = null;
let readmeObserver;
let seenObserver;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const feed = $('#feed');
const feedStatus = $('#feedStatus');
const esc = (value = '') => String(value).replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
const fmt = n => n >= 1e6 ? `${(n/1e6).toFixed(1)}m` : n >= 1e3 ? `${(n/1e3).toFixed(n >= 1e4 ? 0 : 1)}k` : String(n || 0);
const repoKey = repo => repo.full_name;
const persistSet = (key, set) => localStorage.setItem(key, JSON.stringify([...set]));
const persistSavedDetails = () => localStorage.setItem('gitexplore:saved-details', JSON.stringify(Object.fromEntries(savedRepoDetails)));
const jobSignal = /(^|[\s/_-])(jobs?|job[- ]?board|hiring|careers?|internships?|vacancies|recruiting)(?=$|[\s/_-])/i;

function isJobsRepo(repo) {
  return jobSignal.test(`${repo.full_name || ''} ${repo.description || ''} ${(repo.topics || []).join(' ')}`);
}

function icon(id) { return `<svg aria-hidden="true"><use href="#${id}"/></svg>`; }
function renderFilters() {
  const languageMarkup = languages.map(x => `<button class="filter-chip ${state.language === x ? 'active' : ''}" data-language="${x}">${x}</button>`).join('');
  const desktopLanguageMarkup = languages.slice(0, 6).map(x => `<button class="filter-chip ${state.language === x ? 'active' : ''}" data-language="${x}">${x}</button>`).join('');
  const frameworkMarkup = frameworks.map(x => `<button class="filter-chip ${state.framework === x ? 'active' : ''}" data-framework="${x}">${x}</button>`).join('');
  const topicMarkup = topics.map(x => `<button class="filter-chip ${state.topic === x ? 'active' : ''}" data-topic="${x}">${x}</button>`).join('');
  const discoveryMarkup = discoveryModes.map(x => `<button class="discovery-option ${state.discovery === x.id ? 'active' : ''}" data-discovery="${x.id}"><span>${x.label}</span><small>${x.detail}</small>${icon('i-check')}</button>`).join('');
  $('#languageFilters').innerHTML = desktopLanguageMarkup;
  $('#topicFilters').innerHTML = topicMarkup;
  $('#mobileLanguageFilters').innerHTML = languageMarkup;
  $('#mobileFrameworkFilters').innerHTML = frameworkMarkup;
  $('#mobileTopicFilters').innerHTML = topicMarkup;
  $('#mobileDiscoveryFilters').innerHTML = discoveryMarkup;
  $('#seenCount').textContent = seen.size ? `${seen.size} explored repos hidden on this device` : 'Seen repositories stay hidden';
}

function getFilteredRepos() {
  let repos = state.repos;
  if (state.discovery === 'hidden') repos = repos.filter(repo => !isJobsRepo(repo));
  if (state.discovery === 'jobs') repos = repos.filter(isJobsRepo);
  if (state.query) {
    const q = state.query.toLowerCase();
    repos = repos.filter(r => `${r.full_name} ${r.description || ''} ${(r.topics || []).join(' ')}`.toLowerCase().includes(q));
  }
  return repos;
}

function renderFeed() {
  if (state.view === 'profile') { renderProfile(); return; }
  feed.classList.remove('profile-feed');
  const repos = getFilteredRepos();
  if (!repos.length) {
    if (state.loading) {
      feed.innerHTML = `<div class="feed-loader" role="status" aria-live="polite"><div class="loader-mark"><span></span><span></span><span></span><i></i></div><strong>Finding repositories</strong><p>Scanning GitHub for something worth exploring.</p></div>`;
      return;
    }
    feed.innerHTML = `<div class="empty-state"><h2>No repositories found.</h2><p>Try a broader stack filter or a different search.</p></div>`;
    return;
  }
  feed.innerHTML = repos.map((repo, index) => repoCard(repo, index)).join('');
  attachCardEvents();
  $$('.repo-slide', feed).forEach(slide => {
    if (translationState(slide.dataset.repoKey).enabled) applyCardTranslation($('.repo-card', slide), true).catch(() => {});
  });
}

function repoSnapshot(repo) {
  return { id: repo.id, name: repo.name, full_name: repo.full_name, html_url: repo.html_url, description: repo.description, stargazers_count: repo.stargazers_count, language: repo.language, topics: repo.topics || [], owner: { login: repo.owner?.login || repo.full_name.split('/')[0], avatar_url: repo.owner?.avatar_url || `https://github.com/${repo.full_name.split('/')[0]}.png` } };
}

function toggleSavedRepository(button) {
  const key = button.dataset.key;
  const removing = saved.has(key);
  if (removing) { saved.delete(key); savedRepoDetails.delete(key); }
  else {
    saved.add(key);
    const repo = state.repos.find(item => item.full_name === key);
    if (repo) savedRepoDetails.set(key, repoSnapshot(repo));
  }
  button.classList.toggle('active', !removing);
  persistSet('repodive:saved', saved);
  persistSavedDetails();
  updateSavedCount();
  showToast(removing ? 'Removed from saved' : 'Saved to your list');
}

async function loadSavedRepositories() {
  const results = [];
  for (const key of saved) {
    let repo = savedRepoDetails.get(key);
    if (!repo) {
      try {
        const response = await fetch(`https://api.github.com/repos/${key}`, { headers: { Accept: 'application/vnd.github+json' } });
        if (response.ok) { repo = repoSnapshot(await response.json()); savedRepoDetails.set(key, repo); }
      } catch {}
    }
    if (repo) results.push(repo);
  }
  persistSavedDetails();
  return results;
}

async function renderProfile() {
  feed.classList.add('profile-feed');
  feed.innerHTML = `<section class="profile-view"><div class="profile-loading">${icon('i-user')}<span>Loading your profile…</span></div></section>`;
  await loadGithubSession();
  const repositories = await loadSavedRepositories();
  if (state.view !== 'profile') return;
  const identity = githubUser ? `<img src="${esc(githubUser.avatar_url)}" alt="" /><div><span>GitHub account</span><h2>@${esc(githubUser.login)}</h2><a href="${esc(githubUser.html_url)}" target="_blank" rel="noopener">View GitHub profile ${icon('i-arrow')}</a></div>` : `<div class="profile-placeholder">${icon('i-user')}</div><div><span>Your GitExplore profile</span><h2>Connect GitHub</h2><p>Sign in to reply to repository discussions with your GitHub identity.</p></div>`;
  const savedMarkup = repositories.length ? repositories.map(repo => `<article class="saved-repo-card"><a class="saved-repo-owner" href="https://github.com/${encodeURIComponent(repo.owner.login)}" target="_blank" rel="noopener"><img src="${esc(repo.owner.avatar_url)}" alt="" /><span>@${esc(repo.owner.login)}</span></a><h3>${esc(repo.name)}</h3><p>${esc(repo.description || 'A saved public repository.')}</p><div class="saved-repo-meta"><span>${repo.language ? esc(repo.language) : 'Mixed stack'}</span><span>${fmt(repo.stargazers_count)} stars</span></div><div class="saved-repo-actions"><button class="profile-unsave" data-key="${esc(repo.full_name)}">${icon('i-bookmark')} Remove</button><a href="${esc(repo.html_url)}" target="_blank" rel="noopener">Open repo ${icon('i-arrow')}</a></div></article>`).join('') : `<div class="profile-empty">${icon('i-bookmark')}<strong>No saved repositories yet</strong><span>Use the bookmark button while exploring and they will appear here.</span></div>`;
  feed.innerHTML = `<section class="profile-view"><header class="profile-header"><div class="profile-identity">${identity}</div><button class="profile-auth-button" id="profileGithubAuth">${githubUser ? 'Sign out' : `${icon('i-github')} Sign in with GitHub`}</button></header><div class="profile-saved-head"><div><span>YOUR LIBRARY</span><h2>Saved repositories</h2></div><strong>${repositories.length}</strong></div><div class="saved-repo-list">${savedMarkup}</div></section>`;
  $('#profileGithubAuth').addEventListener('click', handleGithubAuth);
  $$('.profile-unsave', feed).forEach(button => button.addEventListener('click', () => {
    saved.delete(button.dataset.key); savedRepoDetails.delete(button.dataset.key); persistSet('repodive:saved', saved); persistSavedDetails(); updateSavedCount(); showToast('Removed from saved'); renderProfile();
  }));
}

function repoCard(repo, index) {
  const key = repoKey(repo);
  const tags = (repo.topics || []).slice(0, 5);
  const commentCount = githubDiscussionCache.get(key)?.comments?.length || 0;
  const archUrl = `https://gitdiagram.com/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}`;
  const primaryLanguage = repo.language || 'Mixed';
  return `<article class="repo-slide" data-repo-key="${esc(key)}">
    <div class="repo-card">
      <div class="repo-content">
        <div class="repo-main">
          <div class="repo-meta-row">
            <a class="repo-owner" href="https://github.com/${encodeURIComponent(repo.owner.login)}" target="_blank" rel="noopener">
              <img src="${esc(repo.owner.avatar_url)}" alt="" loading="lazy" />
              <strong>@${esc(repo.owner.login)}</strong>
            </a>
            <button class="repo-translate ${translationState(key).enabled ? 'active' : ''}" type="button" data-translate-repo="${esc(key)}" aria-label="Translate repository content" title="Translate repository content">${icon('i-translate')}</button>
          </div>
          <h2 class="repo-name">${esc(repo.name)}</h2>
          <p class="repo-description">${esc(repo.description || 'A public repository waiting to be explored.')}</p>
        </div>
        <div class="detail-deck">
          <section class="stack-panel deck-panel" data-panel-name="stack" data-stack-repo="${esc(repo.full_name)}" data-primary="${esc(primaryLanguage)}" data-description="${esc(repo.description || '')}" data-topics="${esc(tags.join(','))}">
            <div class="stack-heading deck-panel-handle" data-panel-handle="stack"><strong>Tech stack</strong></div>
            <div class="stack-panel-body deck-panel-body">
            <div class="stack-items"><button class="stack-chip tech-chip" data-tech="${esc(primaryLanguage)}" data-repo="${esc(repo.full_name)}"><i style="--stack-color:${languageColors[primaryLanguage] || '#8a8f87'}"></i>${esc(primaryLanguage)}</button></div>
            ${tags.length ? `<div class="tools-row"><span>Also used</span><div>${tags.map(t => `<button class="tool-chip tech-chip" data-tech="${esc(t)}" data-repo="${esc(repo.full_name)}">${esc(t)}</button>`).join('')}</div></div>` : ''}
            <div class="stack-analysis" aria-live="polite"><div class="stack-explainer"><span>How it works</span><p>Analyzing the repository structure…</p></div><div class="stack-signals"><span>Methods &amp; protocols</span><div></div></div></div>
            </div>
          </section>
          <div class="metrics-row">
            <span class="metric">${icon('i-star')}<span><strong>${fmt(repo.stargazers_count)}</strong> stars</span></span>
            <span class="metric">${icon('i-fork')}<span><strong>${fmt(repo.forks_count)}</strong> forks</span></span>
            <span class="metric">${icon('i-issue')}<span><strong>${fmt(repo.open_issues_count)}</strong> issues</span></span>
          </div>
        <section class="readme-preview deck-panel" data-panel-name="readme" data-repo="${esc(repo.full_name)}" data-branch="${esc(repo.default_branch || 'main')}" role="button" tabindex="0" aria-expanded="false" aria-label="Expand repository documentation preview">
          <div class="readme-panel-handle deck-panel-handle" data-panel-handle="readme"><strong>README</strong><span>Project documentation</span></div>
          <div class="readme-panel-body deck-panel-body">
          <span class="readme-state sr-only">Loading repository documentation</span>
          <div class="readme-copy"><p>${esc(repo.description || 'Open the repository to read its documentation.')}</p></div>
          <span class="readme-ellipsis" aria-hidden="true">…</span>
          <a class="readme-link" href="${esc(repo.html_url)}#readme" target="_blank" rel="noopener" aria-label="Open full repository documentation" title="Open full repository documentation">${icon('i-arrow')}</a>
          </div>
        </section>
        <section class="diagram-preview deck-panel" data-panel-name="architecture" data-architecture-repo="${esc(repo.full_name)}" data-branch="${esc(repo.default_branch || 'main')}" data-primary="${esc(primaryLanguage)}" data-topics="${esc(tags.join(','))}" data-gitdiagram="${archUrl}" aria-label="Repository architecture preview">
          <div class="diagram-preview-head deck-panel-handle" data-panel-handle="architecture"><strong>${icon('i-diagram')} Architecture</strong><span class="architecture-source">Repository map</span></div>
          <div class="diagram-frame deck-panel-body" role="button" tabindex="0" aria-label="Expand repository architecture">
            <div class="mermaid-canvas" hidden></div>
            <div class="diagram-fallback" aria-live="polite">
              <span class="diagram-loading">Loading real architecture...</span>
            </div>
            <div class="architecture-insight" hidden></div>
            <div class="diagram-toolbar" aria-label="Architecture diagram controls">
              <a class="diagram-tool diagram-external" href="${archUrl}" target="_blank" rel="noopener" aria-label="Open this repository on GitDiagram" title="Open on GitDiagram">${icon('i-diagram')}</a>
              <button class="diagram-tool diagram-zoom" data-diagram-zoom="out" type="button" aria-label="Zoom out" title="Zoom out">${icon('i-minus')}</button>
              <button class="diagram-tool diagram-zoom" data-diagram-zoom="fit" type="button" aria-label="Fit diagram" title="Fit diagram">${icon('i-fit')}</button>
              <button class="diagram-tool diagram-zoom" data-diagram-zoom="in" type="button" aria-label="Zoom in" title="Zoom in">${icon('i-plus')}</button>
              <button class="diagram-tool diagram-expand" type="button" aria-label="Collapse architecture diagram" aria-expanded="true" title="Collapse architecture">${icon('i-collapse')}</button>
            </div>
          </div>
        </section>
        </div>
      </div>
      <div class="repo-footer">
        <p class="repo-path">${icon('i-github')} github.com/<strong>${esc(repo.full_name)}</strong></p>
        <div class="card-actions">
          <button class="action-button like-button ${liked.has(key) ? 'active' : ''}" data-key="${esc(key)}" aria-label="Like repository" title="Like">${icon('i-star')}</button>
          <button class="action-button comment-button" data-key="${esc(key)}" aria-label="View comments" title="Comments">${icon('i-message')}<span class="sr-only">${commentCount} comments</span></button>
          <button class="action-button save-button ${saved.has(key) ? 'active' : ''}" data-key="${esc(key)}" aria-label="Save repository" title="Save">${icon('i-bookmark')}</button>
          <button class="action-button share-button" data-url="${esc(repo.html_url)}" aria-label="Share repository" title="Share">${icon('i-share')}</button>
          <a class="open-repo" href="${esc(repo.html_url)}" target="_blank" rel="noopener">${icon('i-github')} Open repo ${icon('i-arrow')}</a>
        </div>
      </div>
    </div>
  </article>`;
}

function readmeExcerpt(markdown) {
  const cleaned = markdown
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[|*_`~>]/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const paragraphs = [];
  let current = [];
  const flush = () => {
    const text = current.join(' ').replace(/\s+/g, ' ').trim();
    if (text.length > 35 && !/shields\.io|badge|table of contents/i.test(text)) paragraphs.push(text);
    current = [];
  };
  for (const rawLine of cleaned.split(/\r?\n/)) {
    const line = rawLine.replace(/^#{1,6}\s*/, '').replace(/^[-+*]\s+/, '').trim();
    if (!line) { flush(); continue; }
    if (/^\[!\[|^={3,}$|^-{3,}$/.test(line)) continue;
    current.push(line);
    if (current.join(' ').length > 260) flush();
    if (paragraphs.length >= 5) break;
  }
  flush();
  return paragraphs.slice(0, 5);
}

function heuristicLanguage(text) {
  if (/[぀-ヿ]/.test(text)) return 'ja';
  if (/[가-힯]/.test(text)) return 'ko';
  if (/[一-鿿]/.test(text)) return 'zh';
  if (/[Ѐ-ӿ]/.test(text)) return 'ru';
  if (/[؀-ۿ]/.test(text)) return 'ar';
  if (/[ऀ-ॿ]/.test(text)) return 'hi';
  const samples = [
    ['es', /\b(el|la|los|las|para|con|este|esta|proyecto|instalaci[oó]n|c[oó]digo)\b/gi],
    ['fr', /\b(le|la|les|des|pour|avec|projet|installation|utilisation|d[eé]marrer)\b/gi],
    ['pt', /\b(o|os|uma|para|com|projeto|instala[cç][aã]o|utiliza[cç][aã]o|c[oó]digo)\b/gi],
    ['de', /\b(der|die|das|und|mit|f[uü]r|projekt|installation|verwendung|beispiel)\b/gi],
    ['it', /\b(il|gli|una|per|con|progetto|installazione|utilizzo|codice|esempio)\b/gi]
  ];
  const detected = samples.map(([language, pattern]) => [language, (text.match(pattern) || []).length]).sort((a, b) => b[1] - a[1])[0];
  if (detected?.[1] >= 4) return detected[0];
  return 'en';
}

async function detectReadmeLanguage(text) {
  try {
    if ('LanguageDetector' in window) {
      const detector = await LanguageDetector.create();
      const result = await detector.detect(text.slice(0, 3500));
      if (result?.[0]?.detectedLanguage) return result[0].detectedLanguage;
    }
  } catch {}
  return heuristicLanguage(text);
}

function renderReadmeParagraphs(element, paragraphs) {
  $('.readme-copy', element).innerHTML = paragraphs.map(text => `<p>${esc(text)}</p>`).join('');
}

async function prepareReadme(element, paragraphs) {
  renderReadmeParagraphs(element, paragraphs);
  const stack = $('.stack-panel', element.closest('.repo-card'));
  const knownLanguages = stack && stackCache.get(stack.dataset.stackRepo);
  if (stack && knownLanguages) renderStack(stack, knownLanguages);
  const language = await detectReadmeLanguage(paragraphs.join(' '));
  readmeOriginals.set(element, { paragraphs, language, translated: false });
  if (translationState(element.dataset.repo).enabled) await applyReadmeTranslation(element);
}

async function translateWithGoogle(text, sourceLanguage) {
  const endpoint = new URL('https://translate.googleapis.com/translate_a/single');
  endpoint.searchParams.set('client', 'gtx');
  endpoint.searchParams.set('sl', sourceLanguage || 'auto');
  endpoint.searchParams.set('tl', 'en');
  endpoint.searchParams.set('dt', 't');
  endpoint.searchParams.set('q', text);
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Translation service ${response.status}`);
  const payload = await response.json();
  const translated = Array.isArray(payload?.[0]) ? payload[0].map(segment => segment?.[0] || '').join('') : '';
  if (!translated) throw new Error('Empty translation');
  return translated;
}

function splitTranslationChunks(text, maxBytes = 450) {
  const encoder = new TextEncoder();
  const chunks = [];
  let chunk = '';
  for (const character of text) {
    if (chunk && encoder.encode(chunk + character).length > maxBytes) { chunks.push(chunk); chunk = character; }
    else chunk += character;
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

async function translateWithMyMemory(text, sourceLanguage) {
  const languageMap = { zh: 'zh-CN', pt: 'pt-PT' };
  const source = languageMap[sourceLanguage] || sourceLanguage || 'auto';
  const pieces = [];
  for (const chunk of splitTranslationChunks(text)) {
    const endpoint = new URL('https://api.mymemory.translated.net/get');
    endpoint.searchParams.set('q', chunk);
    endpoint.searchParams.set('langpair', `${source}|en`);
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Backup translation service ${response.status}`);
    const payload = await response.json();
    const translated = payload?.responseData?.translatedText;
    if (!translated) throw new Error('Empty backup translation');
    const decoder = document.createElement('textarea');
    decoder.innerHTML = translated;
    pieces.push(decoder.value);
  }
  return pieces.join('');
}

async function translateDirectly(paragraphs, sourceLanguage) {
  try {
    const translated = [];
    for (const paragraph of paragraphs) translated.push(await translateWithGoogle(paragraph, sourceLanguage));
    return translated;
  } catch {
    const translated = [];
    for (const paragraph of paragraphs) translated.push(await translateWithMyMemory(paragraph, sourceLanguage));
    return translated;
  }
}

async function applyReadmeTranslation(element) {
  const record = readmeOriginals.get(element);
  if (!record) return;
  if (record.translatedParagraphs) {
    renderReadmeParagraphs(element, record.translatedParagraphs);
    record.translated = true;
    return;
  }
  try {
    let translated;
    if ('Translator' in window) {
      try {
        const translator = await Translator.create({ sourceLanguage: record.language, targetLanguage: 'en' });
        translated = [];
        for (const paragraph of record.paragraphs) translated.push(await translator.translate(paragraph));
      } catch {}
    }
    if (!translated?.length) {
      try { translated = await translateDirectly(record.paragraphs, record.language); }
      catch {}
    }
    if (!translated?.length) {
      try {
        const response = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paragraphs: record.paragraphs, sourceLanguage: record.language }) });
        if (response.ok) translated = (await response.json()).paragraphs;
      } catch {}
    }
    if (!Array.isArray(translated) || translated.length !== record.paragraphs.length) throw new Error('Invalid translation result');
    renderReadmeParagraphs(element, translated);
    record.translated = true;
    record.translatedParagraphs = translated;
  } catch {
    throw new Error('Translation unavailable');
  }
}

function translationState(repository) {
  if (!repoTranslationStates.has(repository)) repoTranslationStates.set(repository, { enabled: false, description: null, busy: false, comments: new Map() });
  return repoTranslationStates.get(repository);
}

async function translateParagraphs(paragraphs, sourceLanguage = 'auto') {
  const results = [];
  for (let index = 0; index < paragraphs.length; index += 6) {
    const batch = paragraphs.slice(index, index + 6);
    const response = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paragraphs: batch, sourceLanguage }) });
    if (!response.ok) throw new Error('Translation service unavailable');
    const payload = await response.json();
    if (!Array.isArray(payload.paragraphs) || payload.paragraphs.length !== batch.length) throw new Error('Invalid translation result');
    results.push(...payload.paragraphs);
  }
  return results;
}

function syncTranslationControls(repository) {
  const record = translationState(repository);
  $$('[data-translate-repo]').filter(button => button.dataset.translateRepo === repository).forEach(button => {
    button.classList.toggle('active', record.enabled);
    button.classList.toggle('is-busy', record.busy);
    button.disabled = record.busy;
    button.title = record.enabled ? 'Show original repository content' : 'Translate repository content';
    button.setAttribute('aria-label', button.title);
  });
  const commentsButton = $('#commentsTranslate');
  if (state.activeRepo === repository) {
    commentsButton.classList.toggle('active', record.enabled);
    commentsButton.classList.toggle('is-busy', record.busy);
    commentsButton.disabled = record.busy;
    commentsButton.title = record.enabled ? 'Show original discussion' : 'Translate repository discussion';
  }
}

async function applyCardTranslation(card, enabled) {
  if (!card) return;
  const repository = card.closest('.repo-slide').dataset.repoKey;
  const record = translationState(repository);
  const description = $('.repo-description', card);
  if (!description.dataset.original) description.dataset.original = description.textContent;
  const readme = $('.readme-preview', card);
  if (!enabled) {
    description.textContent = description.dataset.original;
    const readmeRecord = readmeOriginals.get(readme);
    if (readmeRecord) { renderReadmeParagraphs(readme, readmeRecord.paragraphs); readmeRecord.translated = false; }
    return;
  }
  if (!record.description) [record.description] = await translateParagraphs([description.dataset.original]);
  description.textContent = record.description;
  if (!readmeOriginals.has(readme)) await loadReadmePreview(readme);
  await applyReadmeTranslation(readme);
}

async function translateVisibleComments(repository) {
  const record = translationState(repository);
  const elements = $$('.comment p, .comment-actions span', $('#commentsList'));
  const originals = elements.map(element => element.dataset.original || element.textContent).filter(Boolean);
  const missing = [...new Set(originals.filter(text => !record.comments.has(text)))];
  if (missing.length) {
    const translated = await translateParagraphs(missing);
    missing.forEach((text, index) => record.comments.set(text, translated[index]));
  }
  elements.forEach(element => {
    if (!element.dataset.original) element.dataset.original = element.textContent;
    element.textContent = record.comments.get(element.dataset.original) || element.dataset.original;
  });
}

async function toggleRepositoryTranslation(repository) {
  const record = translationState(repository);
  if (record.busy) return;
  record.enabled = !record.enabled;
  record.busy = true;
  syncTranslationControls(repository);
  try {
    const slide = $$('.repo-slide', feed).find(element => element.dataset.repoKey === repository);
    await applyCardTranslation(slide && $('.repo-card', slide), record.enabled);
    if ($('#commentsDialog').open && state.activeRepo === repository) await renderComments();
    showToast(record.enabled ? 'Repository content translated' : 'Showing original content');
  } catch {
    record.enabled = false;
    const slide = $$('.repo-slide', feed).find(element => element.dataset.repoKey === repository);
    await applyCardTranslation(slide && $('.repo-card', slide), false);
    showToast('Translation is temporarily unavailable');
  } finally {
    record.busy = false;
    syncTranslationControls(repository);
  }
}

async function loadReadmePreview(element) {
  const fullName = element.dataset.repo;
  const branch = element.dataset.branch || 'main';
  const copy = $('.readme-copy', element);
  const status = $('.readme-state', element);
  if (readmeCache.has(fullName)) {
    const paragraphs = readmeCache.get(fullName);
    await prepareReadme(element, paragraphs);
    status.textContent = 'README preview';
    return;
  }
  const [owner, repo] = fullName.split('/');
  const branches = [...new Set([branch, 'main', 'master'])];
  try {
    let markdown = '';
    for (const candidate of branches) {
      for (const filename of ['README.md', 'readme.md', 'Readme.md']) {
        const url = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(candidate)}/${filename}`;
        const response = await fetch(url);
        if (response.ok) { markdown = await response.text(); break; }
      }
      if (markdown) break;
    }
    const paragraphs = readmeExcerpt(markdown);
    if (!paragraphs.length) throw new Error('No readable README excerpt');
    readmeCache.set(fullName, paragraphs);
    await prepareReadme(element, paragraphs);
    status.textContent = 'README preview';
  } catch {
    status.textContent = 'Description preview';
  }
}

function renderStack(element, languages) {
  const items = $('.stack-items', element);
  items.innerHTML = languages.slice(0, 4).map(language => `<button class="stack-chip tech-chip" data-tech="${esc(language)}" data-repo="${esc(element.dataset.stackRepo)}"><i style="--stack-color:${languageColors[language] || '#8a8f87'}"></i>${esc(language)}</button>`).join('');
  const profile = inferStackProfile(element, languages);
  $('.stack-explainer p', element).textContent = profile.summary;
  $('.stack-signals > div', element).innerHTML = profile.signals.map(signal => `<button class="analysis-chip tech-chip" data-tech="${esc(signal)}" data-repo="${esc(element.dataset.stackRepo)}">${esc(signal)}</button>`).join('');
}

function inferStackProfile(element, languages) {
  const readme = (readmeCache.get(element.dataset.stackRepo) || []).join(' ');
  const source = `${element.dataset.description || ''} ${element.dataset.topics || ''} ${readme}`.toLowerCase();
  const rules = [
    [/\b(rest|restful|openapi|http api)\b/, 'REST / HTTP'],
    [/\bgraphql\b/, 'GraphQL'],
    [/\b(websocket|real[ -]?time)\b/, 'Realtime'],
    [/\bgrpc\b/, 'gRPC'],
    [/\b(oauth|authentication|authorization|auth)\b/, 'Auth / OAuth'],
    [/\b(event[ -]?driven|kafka|rabbitmq|message queue)\b/, 'Event-driven'],
    [/\b(microservices?)\b/, 'Microservices'],
    [/\b(monorepo|workspace)\b/, 'Monorepo'],
    [/\b(mvc|model view controller)\b/, 'MVC'],
    [/\b(plugin|extension)\b/, 'Plugin architecture'],
    [/\b(docker|container)\b/, 'Containers'],
    [/\b(kubernetes|k8s)\b/, 'Orchestration'],
    [/\b(test|tests|testing|tdd)\b/, 'Automated testing'],
    [/\b(ci\/cd|continuous integration|github actions)\b/, 'CI / CD'],
    [/\b(postgres|mysql|sqlite|database|sql)\b/, 'Persistent data']
  ];
  const signals = rules.filter(([pattern]) => pattern.test(source)).map(([, label]) => label).slice(0, 8);
  if (!signals.length) signals.push('Open-source workflow', 'Repository conventions');
  const primary = languages[0] || element.dataset.primary || 'mixed-language';
  const kind = /\b(cli|command line)\b/.test(source) ? 'command-line tool' : /\b(mobile|android|ios)\b/.test(source) ? 'mobile application' : /\b(ai|machine learning|llm)\b/.test(source) ? 'AI-focused project' : /\b(api|backend|server)\b/.test(source) ? 'backend service' : /\b(frontend|react|vue|svelte|web app)\b/.test(source) ? 'web interface' : /\b(library|framework|sdk)\b/.test(source) ? 'library or framework' : 'software project';
  const connection = signals.includes('REST / HTTP') ? 'Components communicate over HTTP APIs.' : signals.includes('Realtime') ? 'Its components exchange updates in real time.' : signals.includes('Event-driven') ? 'Work moves through events and background processing.' : 'The repository is organized around its main application modules.';
  return { summary: `Primarily a ${primary} ${kind}. ${connection} Detected labels are inferred from its languages, topics, and README.`, signals };
}

function architectureNodeDescription(name, type) {
  const known = {
    src: 'Primary application source and core implementation.', app: 'Application entry points, routes, or product features.', apps: 'Separate runnable applications in this repository.', packages: 'Reusable packages shared across the project.', tests: 'Automated tests and quality checks.', test: 'Automated tests and quality checks.', docs: 'Project documentation and technical guides.', examples: 'Reference implementations and usage examples.', public: 'Static assets served directly by the application.', api: 'API routes, handlers, or service contracts.', server: 'Backend runtime, services, and server-side logic.', client: 'Client-side interface and browser application.', components: 'Reusable interface or application components.', '.github': 'GitHub automation, issue templates, and contribution workflows.', 'package.json': 'JavaScript package metadata, scripts, and dependencies.', dockerfile: 'Container build instructions for repeatable deployment.', 'readme.md': 'The project overview, setup steps, and usage documentation.'
  };
  return known[name.toLowerCase()] || (type !== 'file' ? `${name} is a module, workspace, or major project concern detected in this repository.` : `${name} is a top-level project or configuration file.`);
}

function renderArchitectureFallback(element, entries) {
  const fallback = $('.diagram-fallback', element);
  const usable = entries.filter(item => !['.gitignore', 'license', 'license.md'].includes(item.name.toLowerCase())).slice(0, 12);
  if (!usable.length) { fallback.innerHTML = '<span class="diagram-loading">Structure unavailable</span>'; return; }
  const positions = [[5, 9], [37, 5], [70, 9], [4, 38], [72, 38], [5, 71], [38, 76], [71, 71], [21, 23], [58, 23], [21, 58], [58, 58]];
  const positionByPath = new Map(usable.map((item, index) => [item.path || item.name, positions[index]]));
  const lines = usable.map((item, i) => {
    const parent = positionByPath.get(item.parent);
    return `<line x1="${parent ? parent[0] + 10 : 50}" y1="${parent ? parent[1] + 6 : 50}" x2="${positions[i][0] + 10}" y2="${positions[i][1] + 6}" />`;
  }).join('');
  const nodes = usable.map((item, i) => `<button class="architecture-node" style="--node-x:${positions[i][0]}%;--node-y:${positions[i][1]}%" data-node-name="${esc(item.name)}" data-node-kind="${esc(item.type)}" data-node-url="${esc(item.html_url || '')}" type="button"><span>${item.type === 'file' ? 'FILE' : 'MODULE'}</span>${esc(item.name)}</button>`).join('');
  fallback.innerHTML = `<svg class="architecture-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg><div class="architecture-root">${esc(element.dataset.architectureRepo.split('/')[1])}</div>${nodes}`;
}

let mermaidModulePromise;
function loadMermaidModule() {
  if (!mermaidModulePromise) {
    mermaidModulePromise = import('https://cdn.jsdelivr.net/npm/mermaid@11.12.1/dist/mermaid.esm.min.mjs').then(module => {
      const mermaid = module.default;
      mermaid.initialize({ startOnLoad: false, securityLevel: 'antiscript', theme: 'base', flowchart: { htmlLabels: false, useMaxWidth: true, curve: 'linear', nodeSpacing: 28, rankSpacing: 42 }, themeVariables: { background: '#f6f8f5', primaryColor: '#eef3eb', primaryBorderColor: '#819085', primaryTextColor: '#1d2920', lineColor: '#718078', secondaryColor: '#e9f0ff', tertiaryColor: '#fff2df', clusterBkg: '#f4f7f2', clusterBorder: '#cbd4cc', edgeLabelBackground: '#f6f8f5', fontFamily: 'Inter, ui-sans-serif, system-ui', fontSize: '12px' } });
      return mermaid;
    });
  }
  return mermaidModulePromise;
}

async function fetchGitDiagramGraph(fullName) {
  const response = await fetch(`/api/architecture?repository=${encodeURIComponent(fullName)}`);
  if (!response.ok) throw new Error('GitDiagram graph unavailable');
  const payload = await response.json();
  if (!payload.mermaid) throw new Error('GitDiagram returned no graph');
  return payload.mermaid;
}

async function renderMermaidArchitecture(element, source) {
  const mermaid = await loadMermaidModule();
  const canvas = $('.mermaid-canvas', element);
  const id = `repo-architecture-${Math.abs(hashText(element.dataset.architectureRepo))}-${Date.now()}`;
  const { svg, bindFunctions } = await mermaid.render(id, source);
  canvas.innerHTML = svg;
  canvas.hidden = false;
  $('.diagram-fallback', element).hidden = true;
  $('.diagram-frame', element)?.classList.add('has-mermaid');
  const svgElement = $('svg', canvas);
  svgElement?.removeAttribute('width');
  svgElement?.removeAttribute('height');
  canvas.dataset.zoom = '1';
  if (svgElement) requestAnimationFrame(() => applyDiagramZoom($('.diagram-frame', element), 1, true));
  $$('a', canvas).forEach(link => { link.target = '_blank'; link.rel = 'noopener'; });
  bindFunctions?.(canvas);
}

function applyDiagramZoom(frame, zoom, resetScroll = false) {
  const canvas = $('.mermaid-canvas', frame);
  const svg = $('svg', canvas);
  if (!canvas || !svg) return;
  const nextZoom = Math.max(.5, Math.min(3, zoom));
  canvas.dataset.zoom = String(nextZoom);
  svg.style.width = nextZoom === 1 ? '100%' : `${Math.round(canvas.clientWidth * nextZoom)}px`;
  svg.style.height = nextZoom === 1 ? '100%' : 'auto';
  svg.style.minWidth = '0';
  if (resetScroll) canvas.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  $$('.diagram-zoom', frame).forEach(button => {
    if (button.dataset.diagramZoom === 'out') button.disabled = nextZoom <= .5;
    if (button.dataset.diagramZoom === 'in') button.disabled = nextZoom >= 3;
  });
}

function changeDiagramZoom(button) {
  const frame = button.closest('.diagram-frame');
  const canvas = $('.mermaid-canvas', frame);
  if (!canvas || canvas.hidden) return;
  const current = Number(canvas.dataset.zoom || 1);
  const action = button.dataset.diagramZoom;
  applyDiagramZoom(frame, action === 'fit' ? 1 : current + (action === 'in' ? .25 : -.25), action === 'fit');
}

function renderArchitectureUnavailable(element) {
  const fallback = $('.diagram-fallback', element);
  fallback.hidden = false;
  fallback.innerHTML = `<div class="architecture-unavailable">${icon('i-diagram')}<strong>Full architecture not generated yet</strong><span>Open GitDiagram to generate the repository-specific map.</span><a href="${esc(element.dataset.gitdiagram)}" target="_blank" rel="noopener">Generate diagram ${icon('i-arrow')}</a></div>`;
}

function selectArchitectureEntries(tree, fullName, branch) {
  const clean = tree.filter(item => item.path && !item.path.split('/').some(part => part.startsWith('.') && part !== '.github') && !/(^|\/)(node_modules|vendor|dist|build|coverage|target)(\/|$)/i.test(item.path));
  const roleFor = path => {
    const value = path.toLowerCase();
    if (/(^|\/)(app|apps|web|ui|frontend|client|components?)(\/|$)/.test(value)) return 'interface';
    if (/(^|\/)(api|server|backend|services?|handlers?|controllers?)(\/|$)/.test(value)) return 'service layer';
    if (/(^|\/)(core|domain|lib|src|internal|pkg)(\/|$)/.test(value)) return 'core logic';
    if (/(^|\/)(data|database|db|models?|storage|migrations?)(\/|$)/.test(value)) return 'data layer';
    if (/(^|\/)(test|tests|spec|specs|e2e|fixtures?)(\/|$)/.test(value)) return 'quality';
    if (/(^|\/)(docs?|examples?|samples?)(\/|$)/.test(value)) return 'documentation';
    if (/(^|\/)(deploy|infra|ops|docker|k8s|scripts?|\.github)(\/|$)/.test(value)) return 'infrastructure';
    if (/\.(json|toml|ya?ml|lock)$|dockerfile|makefile/i.test(value)) return 'configuration';
    return 'module';
  };
  const rolePriority = new Map(['app','apps','src','packages','server','api','client','web','core','lib','internal','pkg','tests','docs','.github'].map((name, index) => [name, index]));
  const topDirectories = clean.filter(item => item.type === 'tree' && !item.path.includes('/')).map(item => ({ ...item, childCount: clean.filter(child => child.path.startsWith(`${item.path}/`)).length })).sort((a, b) => (rolePriority.get(a.path.toLowerCase()) ?? 99) - (rolePriority.get(b.path.toLowerCase()) ?? 99) || b.childCount - a.childCount).slice(0, 7);
  const childDirectories = topDirectories.flatMap(parent => clean.filter(item => item.type === 'tree' && item.path.startsWith(`${parent.path}/`) && item.path.split('/').length === 2).map(item => ({ ...item, childCount: clean.filter(child => child.path.startsWith(`${item.path}/`)).length })).sort((a, b) => b.childCount - a.childCount).slice(0, 2));
  const importantFiles = clean.filter(item => item.type === 'blob' && !item.path.includes('/') && /^(package\.json|pyproject\.toml|cargo\.toml|go\.mod|dockerfile|compose\.ya?ml|makefile|readme\.md|requirements\.txt)$/i.test(item.path)).slice(0, 4);
  return [...topDirectories, ...childDirectories, ...importantFiles].slice(0, 18).map(item => {
    const segments = item.path.split('/');
    return {
      name: segments.at(-1),
      path: item.path,
      parent: segments.length > 1 ? segments[0] : '',
      type: item.type === 'tree' ? 'dir' : 'file',
      role: roleFor(item.path),
      html_url: `https://github.com/${fullName}/${item.type === 'tree' ? 'tree' : 'blob'}/${encodeURIComponent(branch)}/${item.path.split('/').map(encodeURIComponent).join('/')}`
    };
  });
}

function compileTreeMermaid(entries, repositoryName) {
  const cleanLabel = value => String(value).replace(/"/g, '#quot;').replace(/[<>]/g, '');
  const idByPath = new Map(entries.map((entry, index) => [entry.path, `tree_node_${index}`]));
  const classFor = entry => entry.role === 'interface' ? 'interface' : entry.role === 'service layer' ? 'service' : entry.role === 'data layer' ? 'data' : entry.role === 'quality' ? 'quality' : entry.role === 'infrastructure' ? 'infra' : entry.role === 'configuration' ? 'config' : 'module';
  const nodes = entries.map(entry => `${idByPath.get(entry.path)}["${cleanLabel(entry.name)}<br/>${cleanLabel(entry.role)}"]:::${classFor(entry)}`).join('\n');
  const edges = entries.map(entry => {
    const parentId = entry.parent ? idByPath.get(entry.parent) : '';
    return `${parentId || 'repository_root'} ${entry.type === 'dir' ? '-->' : '-.->'} ${idByPath.get(entry.path)}`;
  }).join('\n');
  const links = entries.filter(entry => entry.html_url).map(entry => `click ${idByPath.get(entry.path)} "${entry.html_url}"`).join('\n');
  return `flowchart LR
repository_root["${cleanLabel(repositoryName)}<br/>repository"]:::root
${nodes}
${edges}
${links}
classDef root fill:#c8f04e,stroke:#9aba32,color:#1f2900,stroke-width:2px
classDef module fill:#f3f5f0,stroke:#98a39a,color:#243027
classDef interface fill:#e8f0ff,stroke:#7f9ed8,color:#21334d
classDef service fill:#fff0dc,stroke:#d3a45f,color:#4e3515
classDef data fill:#e5f5ea,stroke:#79ad89,color:#21422b
classDef quality fill:#f4eaff,stroke:#aa88c6,color:#402752
classDef infra fill:#e9edeb,stroke:#78847b,color:#26302a
classDef config fill:#fff8d9,stroke:#c3ad52,color:#493f12`;
}

async function loadArchitecturePreview(element) {
  const fullName = element.dataset.architectureRepo;
  if (architectureCache.has(fullName)) {
    const cached = architectureCache.get(fullName);
    const sourceLabel = $('.architecture-source', element);
    if (sourceLabel) sourceLabel.textContent = cached.kind === 'mermaid' ? 'GitDiagram' : 'Live GitHub tree';
    await renderMermaidArchitecture(element, cached.source);
    return;
  }
  try {
    const source = await fetchGitDiagramGraph(fullName);
    architectureCache.set(fullName, { kind: 'mermaid', source });
    const sourceLabel = $('.architecture-source', element);
    if (sourceLabel) sourceLabel.textContent = 'GitDiagram';
    await renderMermaidArchitecture(element, source);
    return;
  } catch {}
  try {
    const branch = element.dataset.branch || 'main';
    const response = await fetch(`https://api.github.com/repos/${fullName}/git/trees/${encodeURIComponent(branch)}?recursive=1`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error('Repository structure unavailable');
    const data = await response.json();
    const entries = selectArchitectureEntries(data.tree || [], fullName, branch);
    if (!entries.length) throw new Error('Repository structure unavailable');
    const source = compileTreeMermaid(entries, fullName.split('/')[1]);
    architectureCache.set(fullName, { kind: 'tree', source });
    const sourceLabel = $('.architecture-source', element);
    if (sourceLabel) sourceLabel.textContent = 'Live GitHub tree';
    await renderMermaidArchitecture(element, source);
  } catch {
    renderArchitectureUnavailable(element);
  }
}

async function loadStackPreview(element) {
  const fullName = element.dataset.stackRepo;
  const fallback = [element.dataset.primary || 'Mixed'];
  if (stackCache.has(fullName)) { renderStack(element, stackCache.get(fullName)); return; }
  try {
    const response = await fetch(`https://api.github.com/repos/${fullName}/languages`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error('Language data unavailable');
    const data = await response.json();
    const languages = Object.entries(data).sort((a, b) => b[1] - a[1]).map(([language]) => language);
    const stack = languages.length ? languages : fallback;
    stackCache.set(fullName, stack);
    renderStack(element, stack);
  } catch {
    renderStack(element, fallback);
  }
}

function hydrateReadmes() {
  readmeObserver?.disconnect();
  readmeObserver = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      readmeObserver.unobserve(entry.target);
      loadReadmePreview(entry.target);
      const card = entry.target.closest('.repo-card');
      const stack = $('.stack-panel', card);
      const architecture = $('.diagram-preview', card);
      if (stack) loadStackPreview(stack);
      if (architecture) loadArchitecturePreview(architecture);
    });
  }, { root: feed, rootMargin: '320px 0px' });
  $$('.readme-preview', feed).forEach(element => readmeObserver.observe(element));
}

function attachCardEvents() {
  $$('.like-button', feed).forEach(btn => btn.addEventListener('click', () => toggleSet(btn, liked, 'repodive:liked', 'Starred for this session')));
  $$('.save-button', feed).forEach(btn => btn.addEventListener('click', () => toggleSavedRepository(btn)));
  $$('.share-button', feed).forEach(btn => btn.addEventListener('click', async () => { try { await navigator.clipboard.writeText(btn.dataset.url); showToast('Repository link copied'); } catch { showToast('Copy unavailable — open the repository instead'); } }));
  $$('.comment-button', feed).forEach(btn => btn.addEventListener('click', () => openComments(btn.dataset.key)));
  hydrateReadmes();
  observeSeenRepos();
}
function toggleSet(btn, set, storageKey, message) { const key = btn.dataset.key; set.has(key) ? set.delete(key) : set.add(key); btn.classList.toggle('active', set.has(key)); persistSet(storageKey, set); showToast(message); }
function updateSavedCount() { $$('[data-saved-count]').forEach(element => { element.textContent = saved.size; }); }

function observeSeenRepos() {
  seenObserver?.disconnect();
  if (state.view === 'profile') return;
  seenObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting || entry.intersectionRatio < .62) return;
    const key = entry.target.dataset.repoKey;
    if (!key || seen.has(key)) return;
    seen.add(key);
    while (seen.size > 1500) seen.delete(seen.values().next().value);
    persistSet('repodive:seen', seen);
    $('#seenCount').textContent = `${seen.size} explored repos hidden on this device`;
  }), { root: feed, threshold: [.62] });
  $$('.repo-slide', feed).forEach(slide => seenObserver.observe(slide));
}

function daysAgo(date) { return Math.max(0, (Date.now() - new Date(date || 0).getTime()) / 86400000); }
function hashText(value) { return [...value].reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0); }
function rankRepos(repos) {
  return repos.map(repo => {
    const stars = repo.stargazers_count || 0;
    const fresh = Math.max(0, 1 - daysAgo(repo.pushed_at || repo.updated_at) / 365);
    const hiddenGem = stars >= 20 && stars <= 5000 ? 1 : Math.max(0, 1 - Math.log10(Math.max(10, stars)) / 6);
    const context = (repo.description ? .35 : 0) + Math.min((repo.topics || []).length, 6) * .06;
    const variety = Math.abs(hashText(`${repo.full_name}:${state.cycle}`) % 1000) / 1000;
    const modeScore = state.discovery === 'hidden' ? hiddenGem * 2.4 + fresh * .7 : state.discovery === 'jobs' ? fresh * 1.8 + Math.log10(stars + 1) / 4 : state.discovery === 'rising' ? fresh * 2.5 + hiddenGem * .4 : state.discovery === 'popular' ? Math.log10(stars + 1) / 3 : hiddenGem + fresh + variety;
    return { repo, score: modeScore + context + variety * .35 };
  }).sort((a, b) => b.score - a.score).map(item => item.repo);
}

function discoveryQuery() {
  const balancedBands = ['stars:20..500', 'stars:500..5000', 'stars:5000..50000'];
  if (state.discovery === 'hidden') return ['stars:20..3000'];
  if (state.discovery === 'jobs') return [jobTopicQueries[state.cycle % jobTopicQueries.length], 'stars:>5'];
  if (state.discovery === 'rising') {
    const cutoff = new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString().slice(0, 10);
    return ['stars:10..10000', `pushed:>${cutoff}`];
  }
  if (state.discovery === 'popular') return ['stars:>5000'];
  return [balancedBands[state.cycle % balancedBands.length]];
}

async function loadRepos({ append = false } = {}) {
  if (state.loading) return;
  state.loading = true;
  const requestId = ++state.requestId;
  showFeedStatus(append ? 'Finding more repositories…' : 'Tuning your feed…');
  if (!append) {
    state.page = 1;
    state.cycle += 1;
    delivered.clear();
    state.repos = [];
    renderFeed();
  }
  const q = [...discoveryQuery(), 'archived:false', 'fork:false', 'is:public'];
  if (state.language !== 'All') q.push(`language:"${state.language}"`);
  if (state.framework !== 'Any') q.push(frameworkQueries[state.framework]);
  if (state.topic !== 'Any') q.push(topicQueries[state.topic]);
  if (state.query) q.push(state.query);
  const sort = state.view === 'trending' || state.discovery === 'rising' ? 'updated' : state.sort;
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(q.filter(Boolean).join(' '))}&sort=${sort}&order=desc&per_page=30&page=${state.page}`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub API ${response.status}`);
    const data = await response.json();
    if (requestId !== state.requestId) return;
    const candidates = data.items.filter(repo => !seen.has(repo.full_name) && !delivered.has(repo.full_name));
    const modeMatches = state.discovery === 'hidden' ? candidates.filter(repo => !isJobsRepo(repo)) : state.discovery === 'jobs' ? candidates.filter(isJobsRepo) : candidates;
    const unique = rankRepos(modeMatches);
    unique.forEach(repo => delivered.add(repo.full_name));
    state.repos = append ? dedupe([...state.repos, ...unique]) : unique;
    if (!state.repos.length) showToast('No unseen matches here — broaden a filter');
  } catch (error) {
    if (requestId !== state.requestId) return;
    if (!append) state.repos = filterFallback();
    showToast('GitHub limit reached — showing curated repos');
  } finally {
    if (requestId === state.requestId) { state.loading = false; renderFeed(); hideFeedStatus(); }
  }
}
function dedupe(repos) { return [...new Map(repos.map(r => [r.full_name, r])).values()]; }
function filterFallback() {
  const modeRepos = state.discovery === 'hidden' ? fallbackRepos.filter(repo => !isJobsRepo(repo)) : state.discovery === 'jobs' ? fallbackRepos.filter(isJobsRepo) : fallbackRepos;
  const matches = modeRepos.filter(r => !seen.has(r.full_name) && (state.language === 'All' || r.language === state.language) && (state.framework === 'Any' || (r.topics || []).includes(state.framework.toLowerCase().replaceAll('.', '').replace(' ', ''))) && (state.topic === 'Any' || (r.topics || []).some(t => t.includes(state.topic.toLowerCase().replaceAll('& ', '').replace(' ', '-')))));
  return matches.length ? matches : modeRepos.filter(r => !seen.has(r.full_name));
}

function setView(view) {
  state.view = view;
  $$('.nav-item, .mobile-nav [data-view]').forEach(el => el.classList.toggle('active', el.dataset.view === view));
  const copy = view === 'profile' ? ['YOUR PROFILE', 'Saved projects and GitHub identity.'] : view === 'trending' ? ['MOVING FAST RIGHT NOW', 'See what builders are shipping.'] : ['FOR CURIOUS BUILDERS', 'Find code worth reading.'];
  $('#sectionEyebrow').textContent = copy[0]; $('#sectionTitle').textContent = copy[1];
  feed.scrollTop = 0;
  view === 'profile' ? renderProfile() : loadRepos();
}
function setLanguage(language) { state.language = language; renderFilters(); bindFilterButtons(); feed.scrollTop = 0; loadRepos(); }
function setFramework(framework) { state.framework = framework; renderFilters(); bindFilterButtons(); feed.scrollTop = 0; loadRepos(); }
function setTopic(topic) { state.topic = topic; renderFilters(); bindFilterButtons(); feed.scrollTop = 0; loadRepos(); }
function setDiscovery(discovery) { state.discovery = discovery; renderFilters(); bindFilterButtons(); feed.scrollTop = 0; loadRepos(); }
function bindFilterButtons() {
  $$('[data-language]').forEach(btn => btn.onclick = () => setLanguage(btn.dataset.language));
  $$('[data-framework]').forEach(btn => btn.onclick = () => setFramework(btn.dataset.framework));
  $$('[data-topic]').forEach(btn => btn.onclick = () => setTopic(btn.dataset.topic));
  $$('[data-discovery]').forEach(btn => btn.onclick = () => setDiscovery(btn.dataset.discovery));
}

function relativeDate(value) {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return 'now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

async function loadGithubDiscussion(repository, force = false) {
  if (!force && githubDiscussionCache.has(repository)) return githubDiscussionCache.get(repository);
  const response = await fetch(`https://api.github.com/repos/${repository}/issues?state=all&sort=updated&direction=desc&per_page=12`, { headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) throw new Error(`GitHub discussion ${response.status}`);
  const issues = await response.json();
  const threads = issues.filter(issue => issue.comments > 0).slice(0, 4);
  const batches = await Promise.all(threads.map(async issue => {
    const commentsResponse = await fetch(`${issue.comments_url}?per_page=8`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!commentsResponse.ok) return [];
    const issueComments = await commentsResponse.json();
    return issueComments.map(comment => ({ ...comment, issueNumber: issue.number, issueTitle: issue.title }));
  }));
  const discussion = { issues, comments: batches.flat().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 24) };
  githubDiscussionCache.set(repository, discussion);
  return discussion;
}

async function loadGithubSession() {
  try {
    const response = await fetch('/api/me', { credentials: 'include' });
    githubUser = response.ok ? await response.json() : null;
  } catch { githubUser = null; }
  updateGithubIdentity();
}

function updateGithubIdentity() {
  const title = $('#githubIdentityTitle');
  const copy = $('#githubIdentityCopy');
  const button = $('#githubSignIn');
  const avatar = $('.comment-form .comment-avatar');
  const textarea = $('#commentInput');
  $$('[data-profile-avatar]').forEach(element => { element.innerHTML = githubUser?.avatar_url ? `<img src="${esc(githubUser.avatar_url)}" alt="" />` : icon('i-user'); });
  if (githubUser?.login) {
    title.textContent = `Signed in as @${githubUser.login}`;
    copy.textContent = 'Replies are posted directly to the selected GitHub issue.';
    button.textContent = 'Sign out';
    button.dataset.action = 'signout';
    avatar.innerHTML = `<img src="${esc(githubUser.avatar_url)}" alt="" />`;
    textarea.disabled = false;
  } else {
    title.textContent = 'Continue with GitHub';
    copy.textContent = 'Read real issue and pull-request comments. Sign in to reply on GitHub.';
    button.textContent = 'Sign in';
    button.dataset.action = 'signin';
    avatar.innerHTML = icon('i-github');
    textarea.disabled = true;
  }
}

async function handleGithubAuth() {
  if (githubUser) {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    githubUser = null;
    updateGithubIdentity();
    if (state.view === 'profile') renderProfile();
    showToast('Signed out of GitHub');
    return;
  }
  try {
    const response = await fetch('/api/auth/config');
    const config = response.ok ? await response.json() : { configured: false };
    if (!config.configured) throw new Error('OAuth not configured');
    location.href = `/api/auth/github?returnTo=${encodeURIComponent(location.pathname + location.search)}`;
  } catch {
    showToast('GitHub sign-in is not configured on this deployment');
  }
}

async function openComments(key) {
  state.activeRepo = key;
  $('#commentsTitle').textContent = key;
  $('#commentsCount').textContent = '…';
  $('#commentsList').innerHTML = `<div class="comment-empty">${icon('i-message')}<strong>Loading GitHub discussion…</strong><span>Fetching recent issue and pull-request comments.</span></div>`;
  syncTranslationControls(key);
  $('#commentsDialog').showModal();
  await Promise.allSettled([renderComments(), loadGithubSession()]);
}

async function renderComments(force = false) {
  try {
    const discussion = await loadGithubDiscussion(state.activeRepo, force);
    const target = $('#commentTarget');
    target.innerHTML = `<option value="">Select an issue to reply</option>${discussion.issues.filter(issue => !issue.pull_request).map(issue => `<option value="${issue.number}">#${issue.number} ${esc(issue.title)}</option>`).join('')}`;
    $('#commentsCount').textContent = discussion.comments.length;
    $('#commentsList').innerHTML = discussion.comments.length ? discussion.comments.map(comment => `<article class="comment"><a class="comment-avatar" href="${esc(comment.user?.html_url || comment.html_url)}" target="_blank" rel="noopener"><img src="${esc(comment.user?.avatar_url || './icon.svg')}" alt="" /></a><div class="comment-body"><div class="comment-meta"><strong>@${esc(comment.user?.login || 'ghost')}</strong><span>${relativeDate(comment.created_at)}</span><span>on #${comment.issueNumber}</span></div><p>${esc((comment.body || '').slice(0, 900))}</p><div class="comment-actions"><a href="${esc(comment.html_url)}" target="_blank" rel="noopener">View on GitHub</a><span>${esc(comment.issueTitle)}</span></div></div></article>`).join('') : `<div class="comment-empty">${icon('i-message')}<strong>No recent GitHub comments</strong><span>Open an issue on GitHub to start a repository discussion.</span></div>`;
    if (discussion.comments.length && translationState(state.activeRepo).enabled) await translateVisibleComments(state.activeRepo);
  } catch {
    $('#commentsCount').textContent = '0';
    $('#commentsList').innerHTML = `<div class="comment-empty">${icon('i-message')}<strong>Discussion unavailable</strong><span>GitHub may be rate-limiting public requests. Try again shortly.</span></div>`;
  }
}
function showToast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => el.classList.remove('show'), 2200); }
function showFeedStatus(message) { feedStatus.textContent = message; feedStatus.classList.add('visible'); }
function hideFeedStatus() { feedStatus.classList.remove('visible'); }
function navigateFeed(direction) { const slides = $$('.repo-slide', feed); if (!slides.length) return; const top = feed.scrollTop + 10; let index = slides.findIndex(s => s.offsetTop >= top); if (index < 0) index = slides.length - 1; const target = slides[Math.max(0, Math.min(slides.length - 1, index + direction))]; target?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function isStandaloneApp() { return matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches || navigator.standalone === true; }
async function enterFullscreen() {
  if (document.fullscreenElement || !document.documentElement.requestFullscreen) return;
  try { await document.documentElement.requestFullscreen({ navigationUI: 'hide' }); } catch {}
}
function showInstallOffer() {
  if (isStandaloneApp() || localStorage.getItem('gitexplore:install-offer')) return;
  const dialog = $('#installDialog');
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (!installPromptEvent && isIOS) $('#installCopy').textContent = 'Use Share, then Add to Home Screen. GitExplore will open in a clean full-screen app window.';
  if (!installPromptEvent && !isIOS) $('#installCopy').textContent = 'Use your browser install menu to add GitExplore, or open the feed in full screen now.';
  if (!dialog.open) dialog.showModal();
}
async function installApplication() {
  if (installPromptEvent) {
    installPromptEvent.prompt();
    const choice = await installPromptEvent.userChoice;
    if (choice.outcome === 'accepted') localStorage.setItem('gitexplore:install-offer', 'installed');
    installPromptEvent = null;
    $('#installDialog').close();
    return;
  }
  await enterFullscreen();
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  showToast(isIOS ? 'Tap Share, then Add to Home Screen' : 'Use Install app in your browser menu');
}
function openTechDetails(technology, repository) {
  const display = technology.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
  const key = Object.keys(techDescriptions).find(name => name.toLowerCase() === display.toLowerCase());
  const isLanguage = Object.keys(languageColors).some(name => name.toLowerCase() === display.toLowerCase());
  const isMethod = /REST|HTTP|GraphQL|Realtime|gRPC|OAuth|Event|Microservices|Monorepo|MVC|architecture|Containers|Orchestration|testing|CI \/ CD|Persistent data/i.test(display);
  const colorKey = Object.keys(languageColors).find(name => name.toLowerCase() === display.toLowerCase());
  $('#techTitle').textContent = display;
  $('#techType').textContent = isLanguage ? 'Programming language' : isMethod ? 'Method or protocol' : 'Tool, platform or topic';
  $('#techDescription').textContent = key ? techDescriptions[key] : `${display} was detected from this repository's language data or GitHub topics. It describes a technology, tool, platform, or project concept used by the maintainers.`;
  $('#techRepo').textContent = repository;
  $('#techDialog').style.setProperty('--tech-color', colorKey ? languageColors[colorKey] : '#7f8a80');
  $('#techDialog').showModal();
}
function applyCardPanelState(card, nextPanel) {
  card.classList.remove('panel-architecture', 'panel-stack', 'panel-readme');
  card.classList.toggle('panel-focused', Boolean(nextPanel));
  card.dataset.activePanel = nextPanel;
  if (nextPanel) card.classList.add(`panel-${nextPanel}`);
  const stackTitle = $('.stack-heading strong', card);
  if (stackTitle) stackTitle.textContent = nextPanel === 'stack' ? 'Stack & workings' : 'Tech stack';
  $$('.deck-panel', card).forEach(panel => panel.classList.toggle('is-active', panel.dataset.panelName === nextPanel));
  $$('[data-panel-handle]', card).forEach(handle => {
    const selected = handle.dataset.panelHandle === nextPanel;
    handle.classList.toggle('active', selected);
    handle.setAttribute('aria-selected', String(selected));
  });
  const readme = $('.readme-preview', card);
  const readmeExpanded = nextPanel === 'readme';
  readme?.classList.toggle('expanded', readmeExpanded);
  readme?.setAttribute('aria-expanded', String(readmeExpanded));
  const expanded = nextPanel === 'architecture';
  const button = $('.diagram-expand', card);
  if (button) {
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', expanded ? 'Collapse architecture diagram' : 'Expand architecture diagram');
    button.innerHTML = icon(expanded ? 'i-collapse' : 'i-expand');
  }
  const frame = $('.diagram-frame', card);
  if (frame) frame.setAttribute('aria-label', expanded ? 'Collapse repository architecture' : 'Expand repository architecture');
}
async function setCardPanel(card, panel) {
  const activePanel = card.dataset.activePanel || '';
  const nextPanel = activePanel === panel ? '' : panel;
  if (card.classList.contains('is-panel-animating')) return;
  if (activePanel) {
    card.classList.add('is-panel-switching');
    applyCardPanelState(card, nextPanel);
    void card.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('is-panel-switching')));
    return;
  }
  const selectedPanel = $(`.deck-panel[data-panel-name="${nextPanel}"]`, card);
  const selectedBody = $('.deck-panel-body', selectedPanel);
  const first = selectedPanel.getBoundingClientRect();
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    applyCardPanelState(card, nextPanel);
    return;
  }
  card.classList.add('is-panel-animating');
  applyCardPanelState(card, nextPanel);
  const last = selectedBody.getBoundingClientRect();
  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const scaleX = last.width ? first.width / last.width : 1;
  const scaleY = last.height ? first.height / last.height : 1;
  const animation = selectedBody.animate([
    { transformOrigin: 'top left', transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})` },
    { transformOrigin: 'top left', transform: 'translate(0, 0) scale(1, 1)' }
  ], { duration: 360, easing: 'cubic-bezier(.2,.76,.2,1)', fill: 'forwards' });
  await animation.finished.catch(() => {});
  animation.cancel();
  card.classList.remove('is-panel-animating');
}
function showArchitectureInsight(node) {
  const frame = node.closest('.diagram-frame');
  const insight = $('.architecture-insight', frame);
  const name = node.dataset.nodeName;
  const url = node.dataset.nodeUrl;
  insight.hidden = false;
  insight.innerHTML = `<button class="insight-close" type="button" aria-label="Close architecture detail">${icon('i-close')}</button><span>${node.dataset.nodeKind === 'file' ? 'FILE' : 'MODULE'}</span><strong>${esc(name)}</strong><p>${esc(architectureNodeDescription(name, node.dataset.nodeKind))}</p>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">View on GitHub ${icon('i-arrow')}</a>` : ''}`;
}
function toggleReadme(preview) {
  const expanded = preview.classList.toggle('expanded');
  preview.setAttribute('aria-expanded', String(expanded));
  preview.setAttribute('aria-label', expanded ? 'Collapse repository documentation preview' : 'Expand repository documentation preview');
  if (expanded) $('.readme-copy', preview).scrollTop = 0;
}
function resetFilters() {
  state.language = 'All'; state.framework = 'Any'; state.topic = 'Any'; state.discovery = 'balanced'; state.sort = 'stars'; state.query = '';
  $('#searchInput').value = ''; $('#mobileFilterSearch').value = '';
  $$('[data-sort]').forEach(button => button.classList.toggle('active', button.dataset.sort === 'stars'));
  renderFilters(); bindFilterButtons(); loadRepos();
}

$$('[data-view]').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
$('#resetFilters').addEventListener('click', resetFilters);
$('#mobileResetFilters').addEventListener('click', resetFilters);
$$('[data-sort]').forEach(btn => btn.addEventListener('click', () => { state.sort = btn.dataset.sort; $$('[data-sort]').forEach(x => x.classList.toggle('active', x.dataset.sort === state.sort)); loadRepos(); }));
let searchTimer;
function handleSearch(value, source) {
  state.query = value.trim();
  const other = source === 'desktop' ? $('#mobileFilterSearch') : $('#searchInput');
  if (other.value !== value) other.value = value;
  renderFeed();
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { feed.scrollTop = 0; loadRepos(); }, 450);
}
$('#searchInput').addEventListener('input', e => handleSearch(e.target.value, 'desktop'));
$('#mobileFilterSearch').addEventListener('input', e => handleSearch(e.target.value, 'mobile'));
$('#mobileFilters').addEventListener('click', () => $('#filterDialog').showModal());
$('#desktopFilters').addEventListener('click', () => $('#filterDialog').showModal());
$('#closeFilters').addEventListener('click', () => $('#filterDialog').close());
$('#applyFilters').addEventListener('click', () => $('#filterDialog').close());
$('#filterDialog').addEventListener('click', e => { if (e.target === $('#filterDialog')) $('#filterDialog').close(); });
$('#closeTech').addEventListener('click', () => $('#techDialog').close());
$('#techDialog').addEventListener('click', e => { if (e.target === $('#techDialog')) $('#techDialog').close(); });
$('#closeComments').addEventListener('click', () => $('#commentsDialog').close());
$('#commentsDialog').addEventListener('click', e => { if (e.target === $('#commentsDialog')) $('#commentsDialog').close(); });
$('#dismissInstall').addEventListener('click', () => { localStorage.setItem('gitexplore:install-offer', 'dismissed'); $('#installDialog').close(); });
$('#fullscreenOnly').addEventListener('click', async () => { await enterFullscreen(); localStorage.setItem('gitexplore:install-offer', 'fullscreen'); $('#installDialog').close(); });
$('#installApp').addEventListener('click', installApplication);
$('#installDialog').addEventListener('click', e => { if (e.target === $('#installDialog')) { localStorage.setItem('gitexplore:install-offer', 'dismissed'); $('#installDialog').close(); } });
$('#githubSignIn').addEventListener('click', handleGithubAuth);
$('#commentsTranslate').addEventListener('click', () => state.activeRepo && toggleRepositoryTranslation(state.activeRepo));
$('#commentForm').addEventListener('submit', async e => {
  e.preventDefault();
  const input = $('#commentInput');
  const issueNumber = Number($('#commentTarget').value);
  const body = input.value.trim();
  if (!githubUser) { showToast('Sign in with GitHub to reply'); return; }
  if (!issueNumber) { showToast('Choose the GitHub issue you want to reply to'); return; }
  if (!body) return;
  const submit = $('#commentForm button[type="submit"]');
  submit.disabled = true;
  try {
    const response = await fetch('/api/github/comments', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ repository: state.activeRepo, issueNumber, body }) });
    if (!response.ok) throw new Error('GitHub reply failed');
    input.value = '';
    githubDiscussionCache.delete(state.activeRepo);
    await renderComments(true);
    showToast('Reply posted to GitHub');
  } catch { showToast('Could not post this GitHub reply'); }
  finally { submit.disabled = false; }
});
document.addEventListener('keydown', e => {
  if (e.target.matches('input, textarea') || $('#commentsDialog').open || $('#filterDialog').open || $('#techDialog').open) return;
  const readme = e.target.closest?.('.readme-preview');
  if (readme && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setCardPanel(readme.closest('.repo-card'), 'readme'); return; }
  const diagram = e.target.closest?.('.diagram-frame');
  if (diagram && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setCardPanel(diagram.closest('.repo-card'), 'architecture'); return; }
  if (e.key === '/') { e.preventDefault(); $('#searchInput').focus(); }
  if (e.key.toLowerCase() === 'j') navigateFeed(1);
  if (e.key.toLowerCase() === 'k') navigateFeed(-1);
});
feed.addEventListener('click', e => {
  if (e.target.closest('.diagram-external, .architecture-unavailable a')) return;
  const translateButton = e.target.closest('.repo-translate');
  if (translateButton) { toggleRepositoryTranslation(translateButton.dataset.translateRepo); return; }
  const zoomControl = e.target.closest('.diagram-zoom');
  if (zoomControl) { changeDiagramZoom(zoomControl); return; }
  const panelHandle = e.target.closest('[data-panel-handle]');
  if (panelHandle) { setCardPanel(panelHandle.closest('.repo-card'), panelHandle.dataset.panelHandle); return; }
  const readmeLink = e.target.closest('.readme-link');
  if (readmeLink) {
    const card = readmeLink.closest('.repo-card');
    if (card.dataset.activePanel !== 'readme') { e.preventDefault(); setCardPanel(card, 'readme'); }
    return;
  }
  const tech = e.target.closest('.tech-chip');
  if (tech) { openTechDetails(tech.dataset.tech, tech.dataset.repo); return; }
  const insightClose = e.target.closest('.insight-close');
  if (insightClose) { insightClose.closest('.architecture-insight').hidden = true; return; }
  const architectureNode = e.target.closest('.architecture-node');
  if (architectureNode) { showArchitectureInsight(architectureNode); return; }
  const mermaidLink = e.target.closest('.mermaid-canvas a');
  if (mermaidLink) {
    const card = mermaidLink.closest('.repo-card');
    if (card.dataset.activePanel !== 'architecture') { e.preventDefault(); setCardPanel(card, 'architecture'); }
    return;
  }
  const diagramControl = e.target.closest('.diagram-expand, .diagram-frame');
  if (diagramControl) {
    const card = diagramControl.closest('.repo-card');
    if (card.dataset.activePanel !== 'architecture' || e.target.closest('.diagram-expand')) setCardPanel(card, 'architecture');
    return;
  }
  const stack = e.target.closest('.stack-panel');
  if (stack) { const card = stack.closest('.repo-card'); if (card.dataset.activePanel !== 'stack') setCardPanel(card, 'stack'); return; }
  const preview = e.target.closest('.readme-preview');
  if (preview) { const card = preview.closest('.repo-card'); if (card.dataset.activePanel !== 'readme') setCardPanel(card, 'readme'); }
});
feed.addEventListener('scroll', () => { if (state.view !== 'profile' && !state.loading && feed.scrollTop + feed.clientHeight > feed.scrollHeight - 500) { state.page += 1; loadRepos({ append: true }); } }, { passive: true });

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPromptEvent = event;
  setTimeout(showInstallOffer, 900);
});
window.addEventListener('appinstalled', () => {
  localStorage.setItem('gitexplore:install-offer', 'installed');
  if ($('#installDialog').open) $('#installDialog').close();
  showToast('GitExplore was added to your home screen');
});
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
if (!isStandaloneApp() && !localStorage.getItem('gitexplore:install-offer')) setTimeout(showInstallOffer, 2200);

renderFilters(); bindFilterButtons(); updateSavedCount(); loadRepos();
