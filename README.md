# Roadmap.dev

**Browse role-based and skill-based learning paths for developers.** Dark editorial design with real-time search, custom roadmap creation, and a customizable accent color system.

---

## Screenshot

![Roadmap.dev interface](https://via.placeholder.com/1200x600?text=Roadmap.dev+Dark+Editorial+Design)

---

## Features

- **12+ Role-Based Roadmaps** — Frontend, Backend, DevOps, and more. Each path shows a structured learning progression.
- **Real-Time Search** — ⌘K shortcut to find roadmaps across 24+ curated paths instantly.
- **Create & Save** — Build custom roadmaps and persist them to browser localStorage.
- **Live Color Customization** — Adjust accent colors in the tweaks panel; changes apply across all pages.
- **Editorial Design** — Dark warm palette (Lora serif, orange accents) optimized for long-form reading.

---

## Quick Start

```bash
# Start the server
node server.js

# Open your browser
http://localhost:8000
```

Navigate the site using the top navigation bar. All links work across pages (roadmap.html, auth.html, best-practices.html, guides.html, videos.html, create-roadmap.html, roadmap-detail.html, frontend-roadmap.html).

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
- **No Backend** — Fully static frontend. Custom roadmaps are stored in localStorage only.
- **Embedded JSX** — All React code lives in the HTML files. Edit directly; no compilation needed.

---

## File Structure

```
Roadmap/
├── roadmap.html              # Main hub (all roadmaps)
├── roadmap-detail.html       # Individual roadmap view
├── frontend-roadmap.html     # Focused frontend path
├── create-roadmap.html       # Custom roadmap editor
├── auth.html                 # Login / signup
├── guides.html, videos.html  # Navigation destinations
├── DESIGN_SYSTEM.md          # Color tokens & component specs
└── server.js                 # Node.js HTTP server
```

---

## License

MIT
