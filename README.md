# PCT Section J Field Guide

Static GitHub Pages guide for a southbound Pacific Crest Trail Section J trek from Stevens Pass to Snoqualmie Pass, planned for 6-12 September 2026.

The site uses a small browser-side Markdown renderer:

- `content.md` is the guide.
- `app.js` loads Markdown, parses front matter, renders Markdown-it, adds heading anchors, guide navigation, callouts, responsive tables, and Mermaid diagrams.
- `styles.css` defines the alpine visual system.
- `.github/workflows/pages.yml` deploys the repository root to GitHub Pages.

## Local preview

```sh
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.

## Markdown sources

The default source is configured in `index.html` with `data-markdown-source="content.md"`. You can render another Markdown file with `?source=path/to/file.md`, `?file=path/to/file.md`, or `?md=path/to/file.md`.

## GitHub Pages

After pushing `main`, enable Pages with **GitHub Actions** as the source if it is not already enabled. The included workflow publishes the static site from the repository root.
