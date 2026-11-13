# GitExplore

A scroll-first interface for discovering public GitHub repositories, hidden gems, job resources, and unfamiliar technology stacks.

## Features

- Live public-repository discovery through GitHub Search
- Hidden-gem ranking that excludes job repositories
- Dedicated Jobs & careers discovery category
- Keyword, language, framework, project-type, and freshness filters
- Full-screen mobile feed with seen-repository deduplication
- README, technology-stack, and repository architecture panels
- Interactive architecture diagrams with zoom, fit, and GitDiagram controls
- Local saves, likes, sharing, and repository discussions

## Run locally

```bash
node preview.mjs
```

Open `http://127.0.0.1:4173`.

This prototype reads public GitHub data without authentication. Saved items and comments are stored in the browser.
