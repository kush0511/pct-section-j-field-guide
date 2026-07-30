# PCT Section J Field Guide

Static GitHub Pages guide for a southbound Pacific Crest Trail Section J trek from Stevens Pass to Snoqualmie Pass, planned for 6-12 September 2026.

The guide was adversarially re-audited on 29 July 2026. Its current planning status is **provisional no-go** because PCTA reports the Waptus River bridge out with a difficult ford rated as an Extreme hazard. The status is deliberately dated and must be rechecked from the live sources in the guide.

The site uses a small browser-side Markdown renderer:

- `content.md` is the guide.
- `app.js` loads Markdown, parses front matter, renders Markdown-it, adds heading anchors, guide navigation, callouts, responsive tables, and Mermaid diagrams.
- `styles.css` defines the alpine visual system.
- `quiz.html`, `quiz-data.js`, `quiz.js`, and `quiz.css` provide a standalone randomized trail-knowledge assessment with section mastery saved locally in the browser.
- `.github/workflows/pages.yml` deploys the repository root to GitHub Pages.

## Local preview

```sh
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.

The standalone quiz is at <http://127.0.0.1:4173/quiz.html>.

## Markdown sources

The default source is configured in `index.html` with `data-markdown-source="content.md"`. You can render another Markdown file with `?source=path/to/file.md`, `?file=path/to/file.md`, or `?md=path/to/file.md`.

## GitHub Pages

After pushing `main`, enable Pages with **GitHub Actions** as the source if it is not already enabled. The included workflow publishes the static site from the repository root.
