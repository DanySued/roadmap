# Testing Guide

Start the server: `node server.js` → open `http://localhost:8000/path.html`

---

## Core flows

### Browse and track a path
```
path.html → click any path card
→ path-detail.html
→ click section tabs to switch
→ click checkboxes to mark stages done
→ click back → path.html
→ return to same path — progress is preserved
```

### Create a custom path
```
path.html → click "Create Path" banner
→ create-path.html
→ Step 1: enter title + description, pick icon + color
→ Continue → Step 2: select or create a category
→ Continue → Step 3: add sections + topics (optional)
→ Continue → Step 4: preview → click "Publish Path"
→ Success screen → "View on Home Page"
→ path.html — custom path appears in its category section
```

### Auth flow
```
path.html → Sign up
→ auth.html
→ fill name, email, password
→ submit → success screen
→ "Go to Paths" → path.html
```

### Search
```
path.html → press ⌘K or click search
→ type a fitness keyword (e.g. "strength", "yoga")
→ cards filter in real time
→ click result → path-detail.html
```

---

## Checklist

### Navigation
- [ ] Logo → path.html from every page
- [ ] Best Practices, Guides, Videos nav links
- [ ] Login / Sign up buttons
- [ ] All "← Back" links return to correct page

### path-detail.html
- [ ] Correct path loads for each `?id=` value
- [ ] Section tabs switch content
- [ ] Checking a box persists after page refresh
- [ ] Progress percentage updates correctly

### create-path.html
- [ ] Step 0 Continue disabled until title + desc filled
- [ ] Step 1 Continue disabled until category selected
- [ ] New category flow: type name → Set → selected
- [ ] Sections and topics can be added and removed
- [ ] Publish saves to localStorage as `custom_paths`
- [ ] Custom path appears on path.html after publish

### auth.html
- [ ] Toggle between login and signup
- [ ] Email validation triggers on bad input
- [ ] Password length check (8+ chars)
- [ ] Signup: password confirmation match check
- [ ] Success screen shows after valid submit
- [ ] Forgot password → forgot-password.html

### Redirects (confirm these don't 404)
- [ ] `roadmap.html` → redirects to `path.html`
- [ ] `roadmap-detail.html?id=running` → `path-detail.html?id=running`
- [ ] `create-roadmap.html` → `create-path.html`
- [ ] `frontend-roadmap.html` → `path-detail.html?id=strength-training`

---

## Pages: 15 real + 4 redirects = 19 HTML files
