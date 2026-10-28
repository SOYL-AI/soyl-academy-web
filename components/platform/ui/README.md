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
| `kit/` | Button, IconButton, Card, Dialog, BottomSheet, Tabs, ProgressBar, Badge, Chip, Toast, Skeleton, EmptyState, Field, TextInput, OTPInput, CreditChip, Avatar, Icon; ADR-023: `Mastery.tsx` (MasteryPip, MasteryBar, ProgressRing, DifficultyTag). |
| `render/` | **Reviewed renderers** (the only code allowed to inject HTML): `Markdown`, `MathBlock`/`MathInline`, `SvgDiagram`, plus `policy.ts`, `math.ts`, `sanitize-svg.ts`, `remark-soyl.ts`. |
| `visual/` | `Visual` dispatcher and one renderer per kind in `platform/shared/content/visual.ts`; safe expression parser `expr.ts`; flow layout. |
| `slides/` | `SlideFrame`, one component per layout, `renderSlide(slide, options)`, `ReadAlong`, narration `segment.ts`. |
| `question/` | Question renderers for every contract-v2 type (web-platform M2; the M3 test player reuses them): `model.ts` (drafts → `PracticeResponse`), `slots.tsx` (server-rendered content), `QuestionCard`, inputs, `OrderingInput`, `AnswerReveal`, `RichText` (lazy Markdown). |
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
- **Check slides** render `options.renderCheck(questionId)`; the question UI belongs to the player/test engine
  (web-platform passes a client `CheckQuestion` with server-built slots).
- **Underline** `++text++` (contract v2) renders as `<ins>` (underlined): text nodes only, never inside code or
  maths; `C++` stays text; `++**word**++` works. `UNDERLINE_SOURCE` in `remark-soyl.ts` must equal the shared
  `UNDERLINE_RE` (a test checks).
- **Tables** (`visual.kind = 'table'`): every header/cell is **inline Markdown** (`**bold**`, `$…$`,
  `\ce{…}`, no images). Plain Unicode renders unchanged. A cell starting with `1. ` would parse as a
  list: write `1.` as `1\.` or avoid it. The first column is the row header (`<th scope="row">`); an
  empty header or first cell (the corner of a Punnett square) renders as a plain `<td>`, never an
  unnamed header. Small grids (2–6 columns, ≤ 8 rows, every cell ≤ 16 characters, corner ignored) render
  compact: centred, bordered cells (`isCompactTable`), which suits Punnett squares and x/y value tables.
- **Geometry** uses the maths convention: origin bottom-left, **y up**, coordinates in
  `[0, width] × [0, height]`; the renderer flips y. Point labels sit opposite the point's neighbours
  (outside its own shape); segment labels sit on the side away from the shape that contains the segment.
  `lines` (`through: [A, B]`) are drawn infinitely, clipped to the canvas, label near the B-side end;
  `rays` (`from`, `through`) run from `from` to the canvas edge with an arrowhead; both take `dashed`.
  A point on a line gets its label beside the line. Segment `ticks: 1–3` = equal-length marks at the
  midpoint, `arrows: 1–3` = parallel chevrons pointing from → to; angle `arcs: 1–3` = concentric arcs
  for equal angles (right angles keep the square mark). Polygon `highlight`: `shade` = light fill,
  `outline` = thick accent outline (drawn above segments), `accent` = translucent accent fill + accent
  outline; labels are always drawn last, with halos. Unknown point references and unknown/extra spec
  fields are ignored, so new optional fields (ADR-007 extensions) never break rendering.
- **Diagram labels** (geometry and plot SVG text) go through `svgLabel` (`svg-utils.ts`): `x_1`/`P_{12}`
  subscript, `x^2`/`10^{-3}` superscript (`<tspan>` at 75 %, shifted with `dy`, which unlike
  `baseline-shift` also works in Firefox), ASCII `'` after a letter → `′` (`A'` → `A′`, but not
  `Snell's`), and inside `$…$` a small TeX subset (`\frac`/`\tfrac`/`\dfrac` → `a/b`, `\sqrt` → `√`,
  Greek letters, `\times \pm \le \ge \ne \angle`, `^\circ` → `°`, `\text{}`, `\ce{H2O}` → H₂O, `-` → `−`).
  All React text nodes; the accessible name stays the visual's `alt`.
- **Plot** functions use the ADR-007 grammar (`expr.ts`): `x`; `sin cos tan asin acos atan sqrt abs ln log exp floor ceil`
  (`log` = log10); `pi π e`; `+ - * / ^`; implicit multiplication only before a name or `(` (`2x`, `3sin(x)`,
  `(x+1)(x-1)`); `x2`, `e3`, `(x+1)2`, `1e3`, `**` are errors. Default 200 samples per function
  (`spec.samples`, 10–2000). Curves break at asymptotes. `vlines` (`x`) / `hlines` (`y`) draw x = c / y = c
  across the plot area (under the curves, `dashed` optional) only when c is within the axis range; labels
  sit at the top / right end, nudged clear of the axis labels. `points[].on_curve: false` is lint-only and
  renders the same solid dot (a hollow dot would read as an excluded endpoint); it is marked
  `data-on-curve="false"`. Legend labels with `$…$`/`\ce{}` render through KaTeX (inline Markdown), others
  with `<sub>`/`<sup>`.
- **Flow** uses a deterministic layered layout. Left-to-right flows with more than three steps also
  render a top-to-bottom version; a container query picks it under 480 px of width.

## Questions (`question/`)

```tsx
// Server Component: content rendered on the server, interaction on the client.
import { buildQuestionSlots } from '@/components/platform/ui/question/slots';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard'; // 'use client'
<QuestionCard question={q} slots={buildQuestionSlots(q, lang)} submit={(response) => postAnswer(q, response)} />
```

- **Types:** mcq, multi-select, assertion-reason, true-false (native radios/checkboxes), numerical (number only,
  Unicode minus and thousands commas accepted), fill-blank (stem blanks `___` numbered, one labelled field each),
  match (a labelled `<select>` per left item; right column lettered A, B …), ordering (drag handle with pointer
  events, Move up/down buttons, and Space/↑/↓/Esc on the handle; moves announced), code-output (fenced code in the
  stem, monospace answer sent verbatim), short/long (word-limit counter), writing (format badge, word counter, rubric
  after checking), map (list of labelled fields with place suggestions per `map_id` until outline maps exist;
  `renderMap` slot for an SVG map later), case/source-based (passage, `passage_origin` label, parts, internal choice
  between a part and its `alternatives`).
- **F-006:** the card never holds answers. `submit(response)` returns the graded result with the key; the reveal shows
  verdict, marks, correct answer (where the inputs cannot), solution, marking scheme, model answer, rubric, and a
  self-mark form for written answers (`selfAssess`, members) or a login prompt (`onLogin`, guests).
- **Client rendering:** `QuestionCard` and the inputs ship no Markdown/KaTeX. Never value-import `slots.tsx`,
  `render/Markdown` or `visual/Visual` from a client module (type imports are fine); text that only exists after a
  client request goes through `RichText` (lazy chunk).
- **Fixtures** for every type: `__fixtures__/questions.ts`. Tests: `__tests__/question.test.tsx` (every type, model,
  XSS corpus through stems/options/passages on the server and through revealed keys in `RichText`, underline).

## Tokens contract

All tokens are CSS custom properties on `.soyl-platform`; light by default, dark through
`prefers-color-scheme: dark`, or forced with `data-theme="light|dark"` on the root (`<PlatformRoot theme>`).
Since ADR-023 the student picks **Light / Dark / System** (top bar and /me → Appearance): the `soyl_theme` cookie, a
hash-allowed inline boot script and `ThemeProvider` (`components/platform/shell/`) always put the resolved
`data-theme` on the root before first paint; the media query only covers the moment before the script runs.
Light is a cool neutral app background with white surfaces; dark is a neutral near-black (never pure black).
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
| Brand (ADR-023) | `--p-brand-blue`, `--p-brand-red`, `--p-brand-yellow` (the marketing tri-stripe; decoration only, never text) |
| Difficulty | `--p-easy`, `--p-medium`, `--p-hard` (AA text on surface) and `-soft` fills (AA text on them) |
| Mastery | `--p-m-none`, `--p-m-attempted`, `--p-m-familiar`, `--p-m-proficient`, `--p-m-mastered` (graphics, >= 3:1; the level is always written too) |
| Gamification | `--p-flame` (streak), `--p-heat-0…4` (activity heatmap), `--p-tier-bronze|silver|gold|elite` (player card, league, rarity) |
| Shape | `--p-radius-xl` (16 px, cards) |

Diagram colours are for SVG attributes (`stroke="var(--diagram-red)"`, `fill="var(--diagram-fill)"`) and
`currentColor`. Always say the colour in the label as well ("blue solution"): colour alone fails
colour-blind students. The sanitiser keeps only `diagram-*` classes; `tokens.css` styles
`diagram-accent`, `diagram-muted`, `diagram-fill`, `diagram-fill-accent`, `diagram-label`, `diagram-thin`.

**Fonts.** `--font-inter` comes from the root layout; `--font-noto-devanagari` from `fonts.ts`
(self-hosted variable font, Devanagari subset, `display: swap`). `--p-font-sans` lists Noto Devanagari
after Inter so mixed Hinglish text falls back per glyph; `lang="hi"` (also `mr`, `ne`, `sa`) switches to
`--p-font-devanagari`, line-height 1.75, no letter-spacing, and turns italics into weight.

**Tailwind leak rule.** Tailwind v4 scans *every* source file (including Markdown docs) for class-like
tokens and adds matching utilities to the marketing site's global stylesheet. Keep platform UI source and
docs free of strings that are Tailwind utilities the marketing site does not already use: name CSS-module
classes in camelCase (`fillGood`), and do not write a negated identifier directly before a utility name
(write `x === false`). Check: build with and without your files and compare the marketing CSS hash
(the design-system M1 handoff shows how).

**Global CSS.** Components use CSS Modules, not Tailwind classes. The only global stylesheets are
`tokens.css` (every selector starts with `.soyl-platform`) and KaTeX's CSS (`.katex*`), imported by the
modules that need them, so marketing routes never load them. The site's Tailwind preflight still applies
inside platform pages (e.g. it removes list markers; content lists set them back).

## Artwork (, design-system 2026-10-29)

Original, hand-drawn flat SVG for the platform; no icon set, emoji, illustration or font was copied or traced, and nothing loads from a third party.

| Piece | Data | React | Where it is used | Cost |
|---|---|---|---|---|
| 64 animal avatars (ids = ) |  (shared primitives: body, eyes, ears, muzzles, beaks) | ,  (inline) and  (static image) | picker and art sheet inline; everywhere else  →  (prerendered route, immutable cache) | the full set only in the picker's lazy chunk |
| Badge medals (12 + locked state) |  |   | /me badges (lazy grid), dashboard next badge, badge celebration | |
| League crests (Bronze … Diamond, Elite) |  |  | weekly league, dashboard league tile, player card | small, own module |
| Subject glyphs (15 kinds) |  (, follows the tile hue) |  | /learn, class page, subject header | server-rendered on the course pages |
| Empty states (6) |  (theme tokens only) |  →  | dashboard, /me badges, Ask AI, 404, error | |

All drawings are  data (): rendered with  (no ) or as a string by the avatar route. Avatar backgrounds are tokens  (8 themes, light and dark) with  (AA on all of them); the art's dark features are ≥ 3:1 on every background (kit test). Bump  () when a drawing changes. Dev review: .

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
