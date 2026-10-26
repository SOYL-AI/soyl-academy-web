# Platform UI kit and content renderers (`components/platform/ui`)

Owner: design-system. Scoped, mobile-first, accessible components and the content renderers
(Markdown, maths, chemistry, diagrams, slides) used by every platform page.
Decisions: [ADR-009](../../../docs/platform/adr/009-platform-web-dependencies-and-test-tooling.md).
Gallery (dev only): `/dev/ui` with `NEXT_PUBLIC_PLATFORM_ENABLED=true` and `npm run dev`.

## Layout

| Path | What |
|---|---|
| `PlatformRoot.tsx` | `.soyl-platform` scope; imports `styles/tokens.css`. Put it on the outermost platform element. |
| `fonts.ts` | `notoDevanagari` (next/font, `--font-noto-devanagari`). |
| `styles/tokens.css` | Design tokens (all rules scoped under `.soyl-platform`). |
| `kit/` | Button, IconButton, Card, Dialog, BottomSheet, Tabs, ProgressBar, Badge, Chip, Toast, Skeleton, EmptyState, Field, TextInput, OTPInput, CreditChip, Avatar, Icon. |
| `render/` | **Reviewed renderers** (the only code allowed to inject HTML): `Markdown`, `MathBlock`/`MathInline`, `SvgDiagram`, plus `policy.ts`, `math.ts`, `sanitize-svg.ts`, `remark-soyl.ts`. |
| `visual/` | `Visual` dispatcher and one renderer per kind in `platform/shared/content/visual.ts`; safe expression parser `expr.ts`; flow layout. |
| `slides/` | `SlideFrame`, one component per layout, `renderSlide(slide, options)`, `ReadAlong`, narration `segment.ts`. |
| `__fixtures__/` | Sample decks (English, Hindi), XSS corpus. |
| `__tests__/` | Vitest suites (`npm run test:platform-ui` at the repo root). |

E2E (Playwright + axe): `platform/e2e/tests/platform/design-system/` → `npm run test:design-system -w @soyl/e2e` from `platform/`.

## Usage

```tsx
// app/(platform)/layout.tsx (web-platform)
import { notoDevanagari } from '@/components/platform/ui/fonts';
import { PlatformRoot } from '@/components/platform/ui/PlatformRoot';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <PlatformRoot className={notoDevanagari.variable}>{children}</PlatformRoot>;
}
```

```tsx
// A lesson page: render slides in a Server Component, pass them to the client player.
import { renderSlide } from '@/components/platform/ui/slides/layouts';

const slides = deck.slides.map((slide, i) =>
  renderSlide(slide, { index: i + 1, total: deck.slides.length, lang: deck.language, goals: deck.goals, renderCheck }),
);
return <SlidePlayer slides={slides} />; // 'use client' player (web-platform, M2) receives ReactNodes
```

- **Server first.** `Markdown`, `MathBlock`, `Visual`, the slide layouts and most kit components have no
  `'use client'`. Rendered in a Server Component they cost **zero client JS** (KaTeX and react-markdown
  stay on the server). Only `Dialog`, `BottomSheet`, `Tabs`, `Toast`, `Field`/`TextInput`/`OTPInput`,
  `CreditChip`, `SvgDiagram` and `SmilesView` are client components.
- **Listen mode.** The player re-renders the current slide with `mode: 'listen'` and
  `highlight: { word }` (global word index). Map Azure TTS word-boundary text offsets to word indices
  with `segmentNarration(text)` + `wordAtOffset(sentences, offset)`. Segmentation is deterministic
  (no `Intl.Segmenter`) and splits Hindi sentences on `।`/`॥`. If the player is a client component
  that re-renders slides itself, the slide modules (and KaTeX) join its chunk: lazy-load the player.
- **Check slides** render `options.renderCheck(questionId)`; the question UI belongs to the player/test engine.
- **Tables** (`visual.kind = 'table'`): every header/cell is **inline Markdown** (`**bold**`, `$…$`,
  `\ce{…}`, no images). Plain Unicode renders unchanged. A cell starting with `1. ` would parse as a
  list: write `1.` as `1\.` or avoid it.
- **Geometry** uses the maths convention: origin bottom-left, **y up**, coordinates in
  `[0, width] × [0, height]`; the renderer flips y. Point labels sit opposite the point's neighbours
  (outside its own shape); segment labels sit on the side away from the shape that contains the segment.
  Unknown point references and unknown/extra spec fields are ignored, so new optional fields
  (ADR-007 extensions) never break rendering.
- **Plot** functions use the ADR-007 grammar (`expr.ts`): `x`; `sin cos tan asin acos atan sqrt abs ln log exp floor ceil`
  (`log` = log10); `pi π e`; `+ - * / ^`; implicit multiplication only before a name or `(` (`2x`, `3sin(x)`,
  `(x+1)(x-1)`); `x2`, `e3`, `(x+1)2`, `1e3`, `**` are errors. Default 200 samples per function
  (`spec.samples`, 10–2000). Curves break at asymptotes.
- **Flow** uses a deterministic layered layout. Left-to-right flows with more than three steps also
  render a top-to-bottom version; a container query picks it under 480 px of width.

## Tokens contract

All tokens are CSS custom properties on `.soyl-platform`; light by default, dark through
`prefers-color-scheme: dark`, or forced with `data-theme="light|dark"` on the root (`<PlatformRoot theme>`).
Contrast is tested (`__tests__/kit.test.tsx`): text pairs ≥ 4.5:1, control boundaries and graphics ≥ 3:1, both themes.

| Group | Tokens |
|---|---|
| Surfaces | `--p-bg` (paper), `--p-surface`, `--p-surface-2`, `--p-surface-3`, `--p-scrim` |
| Text | `--p-ink`, `--p-ink-muted`, `--p-ink-subtle` |
| Lines | `--p-border` (decorative), `--p-border-strong` (controls, ≥ 3:1) |
| Action | `--p-accent` (cobalt), `--p-accent-hover`, `--p-accent-soft`, `--p-on-accent`, `--p-focus`, `--p-focus-ring` |
| Status | `--p-success`, `--p-warning`, `--p-danger`, `--p-info` and `-soft` backgrounds; `--p-highlight` / `--p-on-highlight` |
| Type | `--p-font-sans`, `--p-font-devanagari`, `--p-font-serif`, `--p-font-mono`; `--p-text-xs` (13 px floor) … `--p-text-3xl`; `--p-leading-body` 1.55, `--p-leading-devanagari` 1.75 |
| Space / shape | `--p-space-1…10` (4 px grid), `--p-gutter` (16 px), `--p-radius-sm|md|lg|pill`, `--p-shadow-1|2|3` |
| Interaction | `--p-touch` (44 px), `--p-ease`, `--p-duration-fast|base` (0 under reduced motion), `--p-z-sheet`, `--p-z-toast` |
| Diagrams | `--diagram-accent`, `--diagram-muted`, `--diagram-fill`, `--diagram-paper` (label halo), named colours `--diagram-blue`, `--diagram-green`, `--diagram-yellow`, `--diagram-brown`, `--diagram-red` |

Diagram colours are for SVG attributes (`stroke="var(--diagram-red)"`, `fill="var(--diagram-fill)"`) and
`currentColor`. Always say the colour in the label as well ("blue solution"): colour alone fails
colour-blind students. The sanitiser keeps only `diagram-*` classes; `tokens.css` styles
`diagram-accent`, `diagram-muted`, `diagram-fill`, `diagram-fill-accent`, `diagram-label`, `diagram-thin`.

**Fonts.** `--font-inter` comes from the root layout; `--font-noto-devanagari` from `fonts.ts`
(self-hosted variable font, Devanagari subset, `display: swap`). `--p-font-sans` lists Noto Devanagari
after Inter so mixed Hinglish text falls back per glyph; `lang="hi"` (also `mr`, `ne`, `sa`) switches to
`--p-font-devanagari`, line-height 1.75, no letter-spacing, and turns italics into weight.

**Global CSS.** Components use CSS Modules, not Tailwind classes. The only global stylesheets are
`tokens.css` (every selector starts with `.soyl-platform`) and KaTeX's CSS (`.katex*`), imported by the
modules that need them, so marketing routes never load them. The site's Tailwind preflight still applies
inside platform pages (e.g. it removes list markers; content lists set them back).

## Renderer security rules (WEB-6, WEB-7, AC-19, F-012)

Only `render/MathBlock.tsx` and `render/SvgDiagram.tsx` use `dangerouslySetInnerHTML`, and only with the
output of `renderMathToString` and `sanitize-svg.ts`. When web-platform turns on `react/no-danger`
(WEB-6), allow it for `components/platform/ui/render/**` only. Change these files only with the XSS corpus green.

**Markdown** (`render/Markdown.tsx`)
- CommonMark + GFM tables/strikethrough → React elements; element allow-list; never `rehype-raw`.
- Raw HTML is shown as literal text (so reviewers see it), never interpreted.
- Links: same-site paths (`/learn/...`, normalised; encoded `\` refused), `#fragment`, `mailto:`, and
  `https:` to `DEFAULT_LINK_HOSTS` (soylai.com + official board sites). Anything else renders as text.
  External links get `target="_blank" rel="noopener noreferrer nofollow"`.
- Images: only `https` under `NEXT_PUBLIC_CDN_BASE_URL`; `allowImages={false}` for AI tutor output and any
  user-influenced text (no data exfiltration through image URLs).
- Maths: `$…$`, `$$…$$` (also on one line), bare `\ce{…}`/`\pu{…}`.

**KaTeX** (`render/math.ts`): `trust: false`, `strict: 'warn'`, `maxExpand: 1000`, `maxSize: 10`,
`throwOnError: false`, fresh `macros` per call (no `\gdef` leaks), 4,000-character cap, `output: htmlAndMathml`.
KaTeX uses inline `style` attributes, so CSP needs `style-src 'unsafe-inline'` (as WEB-3 already allows).

**SVG** (`render/sanitize-svg.ts`, DOMPurify, loaded lazily on the client)
- Elements/attributes = `svg-allowlist.ts`; `href` only `#fragment`; `url()` only `url(#fragment)`; no
  `style` attribute or element, no `script`, `foreignObject`, `a`, `image`, animation, `on*`, `data-*`;
  only `diagram-*` classes; aria-label kept as text.
- Every id is prefixed per diagram (hash of the source) and every `#ref`/`url(#ref)` rewritten, so diagrams
  never collide or reach page ids.
- Refused outright (alt text shown instead): DOCTYPE/ENTITY/CDATA/`<?xml-stylesheet`, > 60 KB, not exactly
  one `<svg>` root, no `viewBox` and no numeric width/height.
- `sanitize()` returns `removed[]`; the admin editor should show it and refuse to save (reject, not strip).
- Pipeline stage 4 applies the same rules with its own XML parser (ADR-007); renders ⊇ passes.

**SMILES**: charset check (`[A-Za-z0-9@+\-[\]()=#$:/\\.%*]`, ≤ 200), then smiles-drawer draws through DOM APIs.

**Plot expressions**: own recursive-descent parser, no `eval`/`Function`, limits on length (200), nodes (200), depth (40).

## Bundle (measured, ADR-009)

`/dev/ui` (every component, 60+ slides) first-load JS: **166.9 KB gz** = 157.4 KB shared with marketing
pages (framework + root layout) + **9.6 KB** platform-specific. Lazy: DOMPurify 11.4 KB gz (first raw SVG),
smiles-drawer + chroma-js 55.1 KB gz (first SMILES structure), 7.5 KB of glue. KaTeX, react-markdown and the
visual renderers ship **0 KB** to the client when rendered on the server. KaTeX CSS 3.4 KB gz, tokens 3.1 KB gz.

## Accessibility checklist (what the components already do)

44 px touch targets (small buttons extend their hit area), visible focus ring, `prefers-reduced-motion`
honoured, Dialog on native `<dialog>` (inert background, Tab wrap, Esc, focus return, scroll lock),
WAI-ARIA tabs, live-region toasts, labelled progress bars, fields wired with `aria-describedby`/`aria-invalid`,
OTP with `autocomplete="one-time-code"` + `inputmode="numeric"` + paste normalisation (also Devanagari digits),
every visual named by its `alt`, scrollable tables/maths focusable, slides as `article[aria-roledescription=slide]`.
Avatars show initials only (no remote images, WEB-1).
