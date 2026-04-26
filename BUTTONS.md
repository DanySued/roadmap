# Buttons & Interactions

## Navigation (all pages)

- **Logo** → `path.html`
- **Best Practices** → `best-practices.html`
- **Guides** → `guides.html`
- **Videos** → `videos.html`
- **Login** → `auth.html`
- **Sign up** → `auth.html?mode=signup`

---

## path.html

- **Search button / ⌘K** — Opens search modal; filters path cards in real time
- **Create Path banner** → `create-path.html`
- **Path cards** → `path-detail.html?id=xxx`
- **Accent color picker** — Updates `--accent` CSS variable site-wide

## path-detail.html

- **Back button** — Returns to `path.html`
- **Section tabs** — Switch visible section
- **Checkboxes** — Mark topics done (persisted in localStorage)
- **Status cycle** — none → in-progress → done

## create-path.html

Step wizard — each step validates before advancing.

| Button | Behavior |
|---|---|
| Cancel (step 0) | → `path.html` |
| Back (steps 1–3) | → previous step |
| Continue | Validates, advances step |
| Icon buttons | Selects icon |
| Color swatches | Selects accent color for card |
| Category buttons | Selects existing category |
| Set (new category) | Confirms typed category |
| Add Section | Adds section to path |
| Remove Section (✕) | Deletes section |
| Add Topic / Enter | Adds topic to section |
| Remove Topic (✕) | Deletes topic |
| Publish Path | Saves to `custom_paths` in localStorage |
| View on Home Page | → `path.html` |
| Create Another | Resets form to step 0 |

## auth.html

| Button | Behavior |
|---|---|
| Sign in / Sign up toggle | Switches form mode |
| GitHub / Google | Social auth UI (no backend) |
| Submit | Validates fields, shows success screen |
| Go to Paths | → `path.html` |
| Forgot password | → `forgot-password.html` |
| Terms / Privacy links | → respective pages |

## best-practices.html

- **Practice cards** → `path-detail.html?id=xxx&type=practice`

---

## localStorage keys

| Key | What's stored |
|---|---|
| `custom_paths` | Paths created via the builder |
| Per-path completion keys | Checkbox state per individual path |

## URL params

| Param | Used by | Meaning |
|---|---|---|
| `?id=xxx` | `path-detail.html` | Which path to load |
| `?type=practice` | `path-detail.html` | Loads a best-practice view |
| `?mode=signup` | `auth.html` | Opens signup tab by default |
