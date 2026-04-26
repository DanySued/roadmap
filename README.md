# FitPath

**Structured fitness training paths from yoga to marathons.** Dark editorial design with real-time search, fitness-specific progression tasks, and completion tracking with celebration animations.

---

## What it does

A static web app with 24+ curated training paths — strength, running, yoga, cycling, CrossFit, nutrition, and more. Users can browse paths, track progress through each stage, and build custom paths using a 4-step creator.

No backend. No build step. Everything runs in the browser.

---

## How to run it

You need Node.js installed. That's it.

```bash
# Clone the repo
git clone https://github.com/DanySued/roadmap.git
cd roadmap

# Start the local server
node server.js

# Open in browser
http://localhost:8000
```

The server defaults to port 8000. To use a different port:

```bash
PORT=3000 node server.js
```

Or visit the live deployment: https://fitpath-dev.vercel.app

---

## Dangers / things to know

- **No authentication backend** — the login/signup form is UI only. No passwords are stored or transmitted anywhere.
- **localStorage only** — custom paths and progress are saved in your browser. Clearing browser data will erase them.
- **React via CDN** — requires an internet connection on first load. React and Babel are loaded from unpkg.com.

---

## Features

- **24+ Training Paths** — Strength, running, yoga, cycling, nutrition, CrossFit, pilates, swimming, boxing, martial arts, PT certification, and rehab programs
- **Progressive Task Lists** — Each path has beginner-to-advanced stages that build on each other
- **Task Completion** — Mark stages done; get confetti animations and encouragement
- **Real-Time Search** — ⌘K shortcut to filter paths instantly
- **Progress Tracking** — Completion percentage per path, persisted in localStorage
- **Custom Path Builder** — 4-step wizard to create and publish your own training path
- **Live Color Customization** — Accent color picker; changes apply across all pages
- **Editorial Design** — Dark warm palette (Lora serif, orange accents) built for reading

---

## File structure

```
/
├── path.html              # Main hub — all fitness training paths
├── path-detail.html       # Individual path view with task tracking
├── create-path.html       # 4-step custom path builder
├── auth.html              # Login / signup (UI only)
├── best-practices.html    # Best practices resource hub
├── guides.html            # Written guides
├── guide-detail.html      # Individual guide view
├── videos.html            # Video resources
├── video-detail.html      # Individual video view
├── about.html             # About the project
├── changelog.html         # Release history
├── forgot-password.html   # Password reset flow (UI only)
├── terms.html             # Terms of service
├── privacy.html           # Privacy policy
├── test-buttons.html      # Interactive navigation test page
├── favicon.svg            # Site favicon (💪 on orange square)
├── server.js              # Node.js HTTP server
├── package.json           # Node.js config
└── vercel.json            # Vercel deployment config
```

**Redirect files** (kept for backward compatibility):
- `roadmap.html` → `path.html`
- `roadmap-detail.html` → `path-detail.html`
- `create-roadmap.html` → `create-path.html`
- `frontend-roadmap.html` → `path-detail.html?id=strength-training`

---

## Tech stack

- **React 18.3.1** — UMD build via unpkg CDN
- **Babel Standalone** — JSX compiled in-browser, no build step
- **Lora** (Google Fonts) — serif body type
- **Geist Mono** (Google Fonts) — monospace accents
- **CSS custom properties** — token-driven theming
- **localStorage** — progress and custom paths persistence
- **Vercel** — static hosting and deployment

---

## Made by

Dany Sue — built with [Claude Code](https://claude.ai/code) (Anthropic).

AI was used throughout this project for code generation, design iteration, and content cleanup. Prompts were issued conversationally via Claude Code CLI.

---

## License

MIT
