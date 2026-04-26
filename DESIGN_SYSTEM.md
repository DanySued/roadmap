# Design System

Dark, warm-toned editorial design built around serif typography and amber/orange accents. Optimized for long-form reading.

---

## CSS Tokens (`:root`)

These are the actual tokens used in every HTML file. Do not use hex values directly — always reference tokens.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#1A1714` | Primary background |
| `--bg2` | `#211C18` | Secondary background (cards, panels) |
| `--bg3` | `#2A2420` | Tertiary background (inputs, code) |
| `--bg4` | `#302A25` | Quaternary background (scrollbar thumb) |
| `--border` | `#3D3028` | Primary borders and dividers |
| `--border2` | `#4A3A2E` | Secondary borders (inputs, subtle rules) |
| `--text` | `#D4CCC4` | Body text |
| `--text2` | `#8A7F76` | Secondary / muted text |
| `--text-head` | `#EDE8E2` | Headings and emphasized text |
| `--accent` | `#CF7B4B` | Primary accent — interactive elements, highlights |
| `--green` | `#9DC499` | Success states, completion indicators |
| `--font` | `'Lora', Georgia, serif` | Primary typeface |
| `--mono` | `'Geist Mono', monospace` | Monospace / data text |

---

## Typography

**Primary:** Lora (Google Fonts) — serif, optimized for reading-heavy interfaces.

**Monospace:** Geist Mono (Google Fonts) — used for labels, tags, and code-adjacent UI.

### Base styles

| Property | Value |
|---|---|
| `font-family` | `var(--font)` |
| `font-size` | `15px` |
| `line-height` | `1.75` |
| `color` | `var(--text)` |
| `background` | `var(--bg)` |

---

## Accent color usage

`--accent` (#CF7B4B) is used sparingly:
- CTA buttons and primary actions
- Active/selected state borders
- Link hover states
- Icon backgrounds on the nav logo

Never use it for body text. Never use it decoratively.

`--green` (#9DC499) is reserved for:
- Completion states (checkmarks, progress fills)
- Success messages after publishing/saving

---

## Scrollbar

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--bg4); border-radius: 3px; }
```

---

## Design principles

1. **Dark warmth** — `#1A1714` is a warm near-black, not a cold gray. The whole palette leans amber/brown, not blue.
2. **Layered depth** — Four background levels (`--bg` through `--bg4`) create surface hierarchy without harsh contrast.
3. **Readable serif** — Lora at 15px/1.75 line-height. Don't tighten line-height on body copy.
4. **Restrained accent** — Orange is an accent, not a background. Keep it rare so it reads as signal.
5. **Muted text hierarchy** — `--text-head` → `--text` → `--text2`. Three levels. Use them consistently.

---

## Global reset

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
