# Matteo Belletti — Personal Portfolio

Static portfolio website built with HTML, CSS, and vanilla JavaScript. Hosted on GitHub Pages.

## Quick Change Guide

| What to change | Where to edit | What to modify |
|---|---|---|
| **Projects** | `script.js` → `PROJECTS` array | Add/edit/reorder project objects |
| **Skills** | `script.js` → `SKILLS` object | Add/remove skills or groups |
| **Hero text** | `index.html` → `#hero` section | Name, title, tagline |
| **About text** | `index.html` → `#about` section | Bio paragraphs |
| **Contact info** | `index.html` → `#contact` section | Email, links |
| **Accent color** | `styles.css` → `:root` → `--color-accent` | Any hex color |
| **CV file** | `assets/MatteoBelletti_CV.pdf` | Replace with new PDF |

### Adding a Project

Open `script.js` and add an object to the `PROJECTS` array:

```javascript
{
  title: "Project Name",
  subtitle: "Category",
  description: "1-2 line technical description.",
  achievement: "Key result or metric",
  stack: ["Tech1", "Tech2"],
  link: "https://github.com/...",   // or null if no public repo
  linkLabel: "View on GitHub",       // or null
},
```

### Changing Colors

Open `styles.css` and edit the CSS variables at the top:

```css
--color-accent: #00d4ff;   /* Change this to rebrand the site */
--color-bg: #0a0a0f;       /* Background color */
--color-surface: #1a1a2e;  /* Card backgrounds */
```

## Deployment (GitHub Pages)

1. Push to `main` branch
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` / `/ (root)`
4. Site will be live at `https://mattebelle.github.io/Personal_Portfolio/`

To use a root domain (`mattebelle.github.io`), rename this repository to `MatteBelle.github.io`.

## Tech Stack

- HTML5, CSS3 (custom properties, Grid, Flexbox)
- Vanilla JavaScript (Intersection Observer for animations)
- Google Fonts (Inter + JetBrains Mono)
- No build tools, no frameworks, no dependencies
