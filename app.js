const content = document.querySelector("#content");
const DEFAULT_MARKDOWN_SOURCE = content.dataset.markdownSource || "README.md";
const SOURCE_PARAMS = ["source", "file", "md"];
const ZERO_WIDTH_PREFIX = /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]+/;
const ALTITUDE_UNIT_STORAGE_KEY = "pct-section-j-altitude-unit";

const markdown = createMarkdownRenderer();

const MERMAID_CONFIG = {
  startOnLoad: false,
  securityLevel: "strict",
  suppressErrorRendering: true,
  theme: "base",
  flowchart: {
    curve: "basis",
    htmlLabels: true,
    padding: 18,
    useMaxWidth: true
  },
  sequence: {
    mirrorActors: false,
    rightAngles: false,
    useMaxWidth: true
  },
  themeVariables: {
    background: "transparent",
    mainBkg: "#15221a",
    primaryColor: "#17251d",
    primaryTextColor: "#eef7f0",
    primaryBorderColor: "#8bcf9a",
    secondaryColor: "#223229",
    secondaryTextColor: "#eef7f0",
    secondaryBorderColor: "#7ba98a",
    tertiaryColor: "#101913",
    tertiaryTextColor: "#eef7f0",
    tertiaryBorderColor: "#52685a",
    clusterBkg: "#101913",
    clusterBorder: "#52685a",
    edgeLabelBackground: "#0d1510",
    lineColor: "#a7c2ad",
    textColor: "#eef7f0",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    noteBkgColor: "#f1d88e",
    noteTextColor: "#182018",
    noteBorderColor: "#b79538",
    actorBkg: "#17251d",
    actorBorder: "#8bcf9a",
    actorTextColor: "#eef7f0",
    signalColor: "#c6dbc9",
    signalTextColor: "#eef7f0"
  }
};

mermaid.initialize(MERMAID_CONFIG);

async function renderMarkdownDocument() {
  const source = getMarkdownSource();

  content.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Could not load markdown (${response.status})`);
    }

    const rawMarkdown = await response.text();
    const { body, metadata } = parseFrontMatter(rawMarkdown.replace(ZERO_WIDTH_PREFIX, ""));
    const rendered = markdown.render(body);

    content.innerHTML = DOMPurify.sanitize(rendered, {
      ADD_ATTR: ["checked", "data-label", "decoding", "disabled", "loading", "target"],
      ADD_TAGS: ["input", "section"],
      ALLOW_DATA_ATTR: true
    });

    enhanceDocument(content, metadata, source);
    await renderMermaid(content);
  } catch (error) {
    content.innerHTML = `<p class="loading">Unable to load the Markdown document: ${escapeHtml(error.message)}</p>`;
  } finally {
    content.removeAttribute("aria-busy");
  }
}

function createMarkdownRenderer() {
  const renderer = window.markdownit({
    breaks: false,
    html: true,
    linkify: true,
    typographer: true
  });

  if (window.markdownitTaskLists) {
    renderer.use(window.markdownitTaskLists, { enabled: false, label: true, labelAfter: true });
  }

  if (window.markdownitFootnote) {
    renderer.use(window.markdownitFootnote);
  }

  return renderer;
}

function getMarkdownSource() {
  const params = new URLSearchParams(window.location.search);
  const requested = SOURCE_PARAMS.map((key) => params.get(key)).find(Boolean);
  return normalizeSource(requested || DEFAULT_MARKDOWN_SOURCE);
}

function normalizeSource(value) {
  const source = value.trim();

  try {
    const url = new URL(source, window.location.href);
    if (!["http:", "https:"].includes(url.protocol)) {
      return DEFAULT_MARKDOWN_SOURCE;
    }
    return url.href;
  } catch {
    return DEFAULT_MARKDOWN_SOURCE;
  }
}

function parseFrontMatter(markdownText) {
  if (!markdownText.startsWith("---\n")) {
    return { body: markdownText, metadata: {} };
  }

  const end = markdownText.indexOf("\n---", 4);
  if (end === -1) {
    return { body: markdownText, metadata: {} };
  }

  const frontMatter = markdownText.slice(4, end).trim();
  const metadata = {};

  frontMatter.split("\n").forEach((line) => {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (!match) return;

    metadata[match[1].toLowerCase()] = match[2].replace(/^['"]|['"]$/g, "").trim();
  });

  return { body: markdownText.slice(end + 4).trimStart(), metadata };
}

function enhanceDocument(root, metadata, source) {
  document.title = getDocumentTitle(root, metadata, source);
  document.documentElement.dataset.theme = metadata.theme || "alpine";

  addHeadingIds(root);
  enhanceLinks(root);
  enhanceMedia(root);
  enhanceCodeBlocks(root);
  enhanceCallouts(root);
  wrapTables(root);
  buildGuideNavigation(root);
  enhanceAltitudeToggle(root);
}

function getDocumentTitle(root, metadata, source) {
  const firstHeading = root.querySelector("h1");
  const headingTitle = firstHeading?.textContent.trim();
  return metadata.title || headingTitle || titleFromSource(source);
}

function titleFromSource(source) {
  const pathname = new URL(source, window.location.href).pathname;
  const filename = pathname.split("/").filter(Boolean).pop() || "Markdown document";
  return filename
    .replace(/\.md$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function addHeadingIds(root) {
  const seen = new Map();

  root.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading, index) => {
    if (heading.id) return;

    const base = slugify(heading.textContent) || `section-${index + 1}`;
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    heading.id = count ? `${base}-${count + 1}` : base;
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function enhanceLinks(root) {
  root.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    let url;

    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    if (["http:", "https:"].includes(url.protocol) && url.origin !== window.location.origin) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

function enhanceMedia(root) {
  root.querySelectorAll("img").forEach((image) => {
    image.loading ||= "lazy";
    image.decoding = "async";
  });
}

function enhanceCodeBlocks(root) {
  root.querySelectorAll("pre > code[class*='language-']").forEach((code) => {
    const language = [...code.classList]
      .find((className) => className.startsWith("language-"))
      ?.replace("language-", "");

    if (language) {
      code.parentElement.dataset.language = language;
    }
  });
}

function enhanceCallouts(root) {
  root.querySelectorAll("blockquote").forEach((quote) => {
    const firstParagraph = quote.querySelector("p:first-child");
    if (!firstParagraph) return;

    const match = firstParagraph.textContent.trimStart().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|FIELD|RULE|DECISION|EMERGENCY|GEAR|WATER|FIRE|CHECK)\]\s*/i);
    if (!match) return;

    const type = match[1].toLowerCase();
    quote.classList.add("callout", `callout-${type}`);
    quote.dataset.callout = type;

    const markerPattern = new RegExp(`^\\s*\\[!${match[1]}\\]\\s*`, "i");
    firstParagraph.innerHTML = firstParagraph.innerHTML.replace(markerPattern, "");
  });
}

function buildGuideNavigation(root) {
  if (root.querySelector(".guide-nav")) return;

  const headings = [...root.querySelectorAll("h2")].filter((heading) => heading.id);
  if (headings.length < 3) return;

  const nav = document.createElement("nav");
  nav.className = "guide-nav";
  nav.setAttribute("aria-label", "Guide sections");

  const title = document.createElement("p");
  title.className = "guide-nav-title";
  title.textContent = "Field guide";

  const list = document.createElement("ol");
  headings.forEach((heading) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();
    item.appendChild(link);
    list.appendChild(item);
  });

  nav.append(title, list);

  const hero = root.querySelector(".guide-hero");
  if (hero?.nextSibling) {
    hero.parentNode.insertBefore(nav, hero.nextSibling);
  } else {
    root.insertBefore(nav, root.firstElementChild?.nextSibling || root.firstChild);
  }
}

function enhanceAltitudeToggle(root) {
  const values = [...root.querySelectorAll(".altitude-value[data-m][data-ft]")];
  if (values.length === 0 || root.querySelector(".unit-toggle")) return;

  const control = document.createElement("div");
  const label = document.createElement("span");
  const metresButton = document.createElement("button");
  const feetButton = document.createElement("button");

  control.className = "unit-toggle";
  control.setAttribute("aria-label", "Altitude unit selector");

  label.className = "unit-toggle-label";
  label.textContent = "Altitude";

  metresButton.type = "button";
  metresButton.dataset.unit = "m";
  metresButton.textContent = "m";

  feetButton.type = "button";
  feetButton.dataset.unit = "ft";
  feetButton.textContent = "ft";

  control.append(label, metresButton, feetButton);

  [metresButton, feetButton].forEach((button) => {
    button.addEventListener("click", () => setAltitudeUnit(root, button.dataset.unit));
  });

  const nav = root.querySelector(".guide-nav");
  const hero = root.querySelector(".guide-hero");
  const anchor = nav || hero;

  if (anchor?.nextSibling) {
    anchor.parentNode.insertBefore(control, anchor.nextSibling);
  } else {
    root.insertBefore(control, root.firstChild);
  }

  setAltitudeUnit(root, getStoredAltitudeUnit());
}

function getStoredAltitudeUnit() {
  try {
    const stored = window.localStorage?.getItem(ALTITUDE_UNIT_STORAGE_KEY);
    return stored === "ft" ? "ft" : "m";
  } catch {
    return "m";
  }
}

function setAltitudeUnit(root, unit) {
  const selectedUnit = unit === "ft" ? "ft" : "m";
  document.documentElement.dataset.altitudeUnit = selectedUnit;

  root.querySelectorAll(".altitude-value[data-m][data-ft]").forEach((value) => {
    value.textContent = formatAltitude(value.dataset[selectedUnit], selectedUnit);
  });

  root.querySelectorAll(".unit-toggle button[data-unit]").forEach((button) => {
    const isSelected = button.dataset.unit === selectedUnit;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  try {
    window.localStorage?.setItem(ALTITUDE_UNIT_STORAGE_KEY, selectedUnit);
  } catch {
    // Ignore storage failures; the toggle still works for the current page view.
  }
}

function formatAltitude(rawValue, unit) {
  const value = Number(rawValue);
  if (!Number.isFinite(value)) return rawValue;

  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value))} ${unit}`;
}

function wrapTables(root) {
  root.querySelectorAll("table").forEach((table) => {
    const headers = [...table.querySelectorAll("thead th")].map((header) => header.textContent.trim());
    const columnCount = Math.max(headers.length, table.querySelector("tr")?.children.length || 0);

    table.querySelectorAll("tbody tr").forEach((row) => {
      [...row.children].forEach((cell, index) => {
        cell.dataset.label = headers[index] || `Column ${index + 1}`;
      });
    });

    const wrapper = table.parentElement?.classList.contains("table-wrap")
      ? table.parentElement
      : document.createElement("div");

    wrapper.className = "table-wrap";
    wrapper.dataset.columns = String(columnCount);
    wrapper.style.setProperty("--column-count", columnCount);

    if (columnCount > 4) wrapper.classList.add("is-wide");
    if (columnCount > 7) wrapper.classList.add("is-dense");

    if (table.parentElement !== wrapper) {
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
}

async function renderMermaid(root) {
  const blocks = [...root.querySelectorAll("pre > code.language-mermaid")];
  if (blocks.length === 0) return;

  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => {});
  }

  for (const [index, block] of blocks.entries()) {
    await renderMermaidBlock(block, index);
  }
}

async function renderMermaidBlock(block, index) {
  const source = block.textContent.trim();
  const type = detectMermaidType(source);
  const figure = document.createElement("figure");
  const viewport = document.createElement("div");

  figure.className = "diagram-wrap";
  figure.dataset.diagramType = type;
  figure.setAttribute("aria-label", `${type} diagram`);

  viewport.className = "diagram-viewport";
  figure.appendChild(viewport);
  block.parentElement.replaceWith(figure);

  try {
    const { svg, bindFunctions } = await mermaid.render(`diagram-${Date.now()}-${index}`, source);
    viewport.innerHTML = svg;
    bindFunctions?.(viewport);
    enhanceDiagramSvg(figure);
  } catch (error) {
    renderMermaidError(figure, source, error);
  }
}

function detectMermaidType(source) {
  try {
    return mermaid.detectType(source);
  } catch {
    return source.split(/\s+/)[0]?.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "mermaid";
  }
}

function enhanceDiagramSvg(figure) {
  const svg = figure.querySelector("svg");
  if (!svg) return;

  svg.classList.add("diagram-svg");
  svg.setAttribute("role", "img");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  const box = getSvgBox(svg);
  if (!box) return;

  svg.removeAttribute("width");
  svg.removeAttribute("height");
  figure.style.setProperty("--diagram-natural-width", `${Math.ceil(box.width)}px`);
  figure.style.setProperty("--diagram-natural-height", `${Math.ceil(box.height)}px`);

  if (box.width > 820 || box.width / box.height > 1.7) {
    figure.classList.add("is-wide");
  }

  if (box.height > box.width * 1.2) {
    figure.classList.add("is-tall");
  }
}

function getSvgBox(svg) {
  const viewBox = svg.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  if (viewBox?.length === 4 && viewBox.every(Number.isFinite) && viewBox[2] > 0 && viewBox[3] > 0) {
    return { width: viewBox[2], height: viewBox[3] };
  }

  const width = parseFloat(svg.getAttribute("width"));
  const height = parseFloat(svg.getAttribute("height"));

  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    return { width, height };
  }

  return null;
}

function renderMermaidError(figure, source, error) {
  figure.classList.add("diagram-error");
  figure.removeAttribute("aria-label");
  figure.innerHTML = "";

  const message = document.createElement("p");
  message.className = "diagram-message";
  message.textContent = `Unable to render Mermaid diagram: ${error.message || "invalid syntax"}`;

  const sourceBlock = document.createElement("pre");
  const code = document.createElement("code");
  code.className = "language-mermaid";
  code.textContent = source;
  sourceBlock.appendChild(code);

  figure.append(message, sourceBlock);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

renderMarkdownDocument();
