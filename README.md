# GitExplore

A scroll-first interface for discovering public GitHub repositories, hidden gems, job resources, and unfamiliar technology stacks.

## Features

- Live public-repository discovery through GitHub Search
- Hidden-gem ranking that excludes job repositories
- Dedicated Jobs & careers discovery category
- Keyword, language, framework, project-type, and freshness filters
- Full-screen mobile feed with seen-repository deduplication
- README, technology-stack, and repository architecture panels
- README language detection with in-browser translation where supported
- Installable full-screen PWA experience with offline app-shell caching
- Real GitHub issue and pull-request comments
- Secure GitHub OAuth sign-in and issue replies when server credentials are configured
- Interactive architecture diagrams with zoom, fit, and GitDiagram controls
- Local saves, likes, and sharing

## Run locally

```bash
node preview.mjs
```

Open `http://127.0.0.1:4173`.

## Enable GitHub sign-in and replies

1. Create a GitHub OAuth App under **Settings → Developer settings → OAuth Apps**.
2. Use `http://127.0.0.1:4173` as the homepage URL.
3. Use `http://127.0.0.1:4173/api/auth/github/callback` as the authorization callback URL.
4. Copy `.env.example` to `.env` and add the OAuth client ID, client secret, and a long random cookie secret.
5. Restart `node preview.mjs`.

OAuth tokens are encrypted into HttpOnly, SameSite cookies and never exposed to the browser bundle. For production, set `APP_ORIGIN` to the deployed HTTPS origin and update the OAuth App callback URL to match.

Public discovery and GitHub discussion reading work without authentication. Saved repositories and likes remain browser-local.
