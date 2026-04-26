# Page Map

Current state of all pages and their navigation targets.

---

## Pages with content (15)

| File | Purpose |
|---|---|
| `path.html` | Main hub — browse all 24+ fitness training paths |
| `path-detail.html` | Individual path view with task tracking and progress |
| `create-path.html` | 4-step custom path builder |
| `auth.html` | Login / signup (UI only, no backend) |
| `best-practices.html` | Best practices resource hub |
| `guides.html` | Written guide listing |
| `guide-detail.html` | Individual guide article |
| `videos.html` | Video resource listing |
| `video-detail.html` | Individual video view |
| `about.html` | About the project |
| `changelog.html` | Release history |
| `forgot-password.html` | Password reset flow (UI only) |
| `terms.html` | Terms of service |
| `privacy.html` | Privacy policy |
| `test-buttons.html` | Navigation smoke test |

## Redirect files (4)

These exist only to preserve old URLs. They immediately redirect to the correct page.

| File | Redirects to |
|---|---|
| `roadmap.html` | `path.html` |
| `roadmap-detail.html` | `path-detail.html` + original query string |
| `create-roadmap.html` | `create-path.html` |
| `frontend-roadmap.html` | `path-detail.html?id=strength-training` |

---

## Navigation map

```
path.html (home)
├── Search (⌘K)
│   └── Results → path-detail.html?id=xxx
├── Nav bar
│   ├── Logo → path.html
│   ├── Best Practices → best-practices.html
│   ├── Guides → guides.html
│   ├── Videos → videos.html
│   ├── Login → auth.html
│   └── Sign up → auth.html?mode=signup
├── Create Path button → create-path.html
├── Path cards → path-detail.html?id=xxx
└── Footer
    ├── About → about.html
    ├── Changelog → changelog.html
    └── Social links (GitHub, YouTube, Discord, Twitter, LinkedIn)

path-detail.html
├── Back button → path.html
├── Section tabs → Switch sections
└── Checkboxes → Mark stages complete (localStorage)

create-path.html
├── Step 1: Title + description + icon + color
├── Step 2: Category (existing or new)
├── Step 3: Add sections + topics
├── Step 4: Preview + publish → saves to localStorage
└── Success: View on Home Page → path.html

auth.html
├── Toggle login/signup
├── Submit → Success screen → path.html
├── Forgot password → forgot-password.html
├── Terms → terms.html
└── Privacy → privacy.html

best-practices.html
└── Practice cards → path-detail.html?id=xxx&type=practice

guides.html → guide-detail.html
videos.html → video-detail.html

forgot-password.html → back → auth.html
terms.html → back → path.html
privacy.html → back → path.html
about.html → back → path.html
changelog.html → back → path.html
```

---

## localStorage keys

| Key | Stores |
|---|---|
| `custom_paths` | Custom paths created via the builder |
| `fe_roadmap_statuses` | Task completion state for the frontend path |
| Per-path keys | Completion state per individual path |
