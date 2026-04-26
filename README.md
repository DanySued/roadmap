# FitPath.dev

**Structured fitness training paths from yoga to marathons.** Dark editorial design with real-time search, fitness-specific progression tasks, and task completion tracking with celebration animations.

---

## Features

- **12+ Training Paths** — Strength training, running, yoga, cycling, nutrition, CrossFit, pilates, swimming, boxing, martial arts, personal training certification, and rehab programs.
- **Progressive Task Lists** — Each path contains beginner-to-advanced tasks that build progressively and are preparatory for the next.
- **Fitness Icons** — Sports and fitness emojis throughout instead of generic shapes.
- **Task Completion** — Mark tasks as complete and get confetti animations + encouragement messages.
- **Real-Time Search** — ⌘K shortcut to find fitness programs instantly.
- **Progress Tracking** — Track your completion percentage for each training path.
- **Live Color Customization** — Adjust accent colors; changes apply across all pages.
- **Editorial Design** — Dark warm palette (Lora serif, orange accents) optimized for long-form reading.

---

## Quick Start

```bash
# Start the server (for local development)
node server.js

# Open your browser
http://localhost:8000
```

Or visit the live Vercel deployment at https://fitpath-dev.vercel.app

---

## Tech Stack

- **React 18.3.1** — UMD build via unpkg CDN (no build step required)
- **Babel Standalone** — JSX compilation on-the-fly in the browser
- **Typography** — Lora serif (Google Fonts) + Geist Mono
- **Styling** — Native CSS variables for theming and dark mode
- **Storage** — Browser localStorage (no backend required)

---

## Configuration

### Design System

The design system is token-driven via CSS custom properties. Edit colors in any `.html` file's `<style>` block:

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#1A1714` | Primary background (warm near-black) |
| `--orange` | `#CF7B4B` | Primary accent (interactive, borders) |
| `--text` | `#D4CCC4` | Body text (warm gray) |
| `--text-head` | `#EDE8E2` | Headings and emphasis |

For the full design system, see `DESIGN_SYSTEM.md`.

### Important Notes

- **React via CDN** — Requires internet for the first load. React and Babel are loaded from unpkg.
- **No Backend** — Fully static frontend. Custom fitness plans are stored in localStorage only.
- **Embedded JSX** — All React code lives in the HTML files. Edit directly; no compilation needed.

---

## File Structure

```
Roadmap/
├── path.html                 # Main hub (all fitness training paths)
├── path-detail.html          # Individual path view with task completion
├── auth.html                 # Login / signup
├── guides.html, videos.html  # Navigation destinations
├── best-practices.html       # Best practices resources
├── create-roadmap.html       # Custom program builder
├── DESIGN_SYSTEM.md          # Color tokens & component specs
├── server.js                 # Node.js HTTP server
├── package.json              # Node.js dependencies
└── vercel.json              # Vercel deployment configuration
```

---

## License

MIT
