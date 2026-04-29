# FitPath — Claude Working Instructions

Token-efficient rules for working on this project.

---

## Project map (don't re-discover this)

```
C:\Users\User\..Portfolio\
├── Roadmap\              ← Next.js source (THIS repo)
│   └── src\
│       ├── app\          ← App Router pages
│       ├── components\sections\   ← Nav, Hero, Footer, FAQ, etc.
│       ├── components\fitpath\    ← PathCard, TaskList, PathGrid
│       └── lib\data\              ← paths.ts, path-details.ts, guides.ts
└── fitpath\              ← screenshots only, no source code
```

Git remote: `https://github.com/DanySued/roadmap.git`  
Vercel project: `fitpath-dev` (auto-deploys on push to any branch)  
Design tokens: `src/app/globals.css` — use `var(--fp-*)` variables, never hardcode colors.

---

## Token efficiency rules

### Start fast
- Confirm the source root with one `ls` or `find` before reading anything.
- Never spawn an Explore subagent for this repo — the structure above is known.

### Read selectively
- Use `Grep` with a pattern before `Read` — find the exact lines, then read only that range with `offset` + `limit`.
- Never re-read a file already in context unless a tool call failed.

### Write data files fresh
- Large content files (`path-details.ts`, `guides.ts`) should be written with `Write` directly — no need to read the old version first when doing a full replacement.

### One build pass
- Write all files, then run `npm run build` once at the end.
- A clean build = code is correct. Don't add Playwright screenshots unless verifying visual layout or interactive browser state.

### Batch tool calls
- All independent reads fire in one message (parallel).
- All independent writes fire in one message.

### Commit once per feature
- Stage all changed files, commit once, push once. Don't commit after every file.

---

## Prompting patterns that save tokens

| Instead of | Say |
|---|---|
| "explore the project" | "source is at `src/`. check Nav.tsx for broken hrefs" |
| "make it look good" | "apply the fp- design tokens, match the existing card style in PathCard.tsx" |
| "does it work?" | "build passed = ship it. screenshot only if there's a specific visual concern" |
| open-ended feature request | list exact files to create + specific behavior expected |
