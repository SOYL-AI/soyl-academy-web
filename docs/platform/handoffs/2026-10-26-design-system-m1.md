# design-system — M1 UI kit, content renderers, slide layouts — 2026-10-26

Status: **done** (branch `platform/design-system/m1`)

## What changed

| Area | Files |
|---|---|
| Tokens, root, fonts | `components/platform/ui/styles/tokens.css`, `PlatformRoot.tsx`, `fonts.ts`, `cx.ts` |
| UI kit | `components/platform/ui/kit/`: Button, IconButton, Card (+Title/Meta), Dialog, BottomSheet, Tabs, ProgressBar, Badge, Chip, Toast (+Provider/useToast), Skeleton, EmptyState, Field, TextInput, OTPInput, CreditChip, Avatar, Icon |
| Reviewed renderers | `components/platform/ui/render/`: `Markdown.tsx`, `MathBlock.tsx`, `math.ts` (KaTeX config), `policy.ts` (link/image policy), `remark-soyl.ts`, `sanitize-svg.ts`, `SvgDiagram.tsx` |
| Visuals | `components/platform/ui/visual/`: `Visual.tsx` (dispatcher + table + chem equation), `PlotVisual.tsx`, `expr.ts` (safe parser), `GeometryVisual.tsx`, `FlowVisual.tsx` + `flow-layout.ts`, `SmilesView.tsx`, `svg-utils.ts` |
| Slides | `components/platform/ui/slides/`: `SlideFrame.tsx`, `layouts.tsx` (8 layouts + `renderSlide`), `ReadAlong.tsx`, `segment.ts` |
| Fixtures / tests | `__fixtures__/sample-deck.ts` (English deck: all 8 layouts + all 6 visual kinds; Hindi deck), `__fixtures__/xss-corpus.ts`; `__tests__/` (4 suites) + `vitest.config.mts` |
| Gallery | `app/(platform)/dev/ui/{page.tsx,GalleryClient.tsx,gallery.module.css}`: self-gated, 404 unless `NODE_ENV !== 'production'` and the platform flag is on |
| E2E | `platform/e2e/tests/platform/design-system/{playwright.config.ts,gallery.spec.ts}`; `platform/e2e/package.json` script `test:design-system` + devDependency `@axe-core/playwright` 4.13.0 (`platform/package-lock.json`) |
| Dependencies | root `package.json`/`package-lock.json`: additive only, see ADR-009 |
| Docs | `components/platform/ui/README.md`, `docs/platform/adr/009-platform-web-dependencies-and-test-tooling.md`, this note |

No change to `app/globals.css`, `app/layout.tsx`, marketing components/pages, `next.config.ts`, `tsconfig.json`, `platform/shared`.

## How to verify

```
# repo root
npm ci
npm run lint                 # clean
npm run build                # passes; /dev/ui is ƒ and returns 404 in production
npm run test:platform-ui     # 4 files, 422 tests
# platform/
npm ci
npm run test:design-system -w @soyl/e2e     # 10 tests (5 × mobile-360, desktop-1280), starts next dev on :3310
npm run marketing:regression -w @soyl/e2e   # zero visual diffs, routes OK, Lighthouse not regressed
git diff --stat origin/platform/main -- app/globals.css app/layout.tsx components/layout components/marketing components/home content lib next.config.ts tsconfig.json   # empty
```

Gallery by hand: `NEXT_PUBLIC_PLATFORM_ENABLED=true npm run dev`, open `http://localhost:3000/dev/ui`.

RESULTS_PLACEHOLDER

## Tests added

- `__tests__/xss.test.tsx`: 52 Markdown payloads × (client render, server render), KaTeX hardening (`\href`, `\url`, `\html*`, `\includegraphics`, macro bomb, `\rule` size, `\gdef` leak, escaped errors), 32 SVG payloads (script, `on*`, `javascript:`/`data:`, `xlink:href`, `foreignObject`, `style`/`url()`, external `<use>`, `<image>`, `<set>`/`<animate>` href tricks, mXSS `</style>` and CDATA/`<title>` tricks, class UI-redress, id clobbering, `feImage`, `handler`), 7 refused inputs (DOCTYPE/ENTITY, CDATA, `<?xml-stylesheet`, non-svg root, uppercase SVG, > 60 KB, no viewBox), id prefixing, `removed[]` reporting, `SvgDiagram` component.
- `__tests__/policy-expr.test.ts`: link/image policy table, chemistry helpers, plot grammar (incl. 27 rejected inputs such as `constructor`, `x.constructor`, `eval(...)`, `x2`, `1e3`), narration segmentation (English, Hindi danda).
- `__tests__/slides-visuals.test.tsx`: fixtures parse with the shared `Deck` schema and cover all layouts/kinds; every slide server-renders with slide semantics; listen-mode highlight; check slot; each visual renderer; **both merged exemplars (science ch01: 43 slides, maths ch06: 46 slides) render inert**.
- `__tests__/kit.test.tsx`: Button loading, IconButton name, Dialog (labels, focus in, Esc, focus return, Tab wrap), Tabs keyboard, TextInput wiring, OTP (autocomplete, inputmode, paste, Devanagari digits), ProgressBar, Toast live region, Avatar, IST credit reset; **token contrast** (15 text pairs ≥ 4.5:1, 17 graphic pairs ≥ 3:1, light and dark); dark blocks in sync; every `tokens.css` selector scoped; science exemplar SVGs pass the sanitiser with nothing removed.
- `platform/e2e/tests/platform/design-system/gallery.spec.ts` (360×800 and 1280×800): every layout/kind visible; hostile section inert in real Chromium (no dialogs, no `window.__xss`, no `on*`/`javascript:`/remote references, no requests to other origins, no page errors); axe (wcag2a/aa, 21a/aa, best-practice) zero serious/critical on the page, open dialog and open bottom sheet; Esc/focus return; no horizontal scroll; 44 px targets; Devanagari rendered with Noto Sans Devanagari (CDP platform fonts) and line-height ≥ 1.7; tabs keyboard; OTP paste.

## Known gaps / follow-ups

- **web-platform (M1/M2):** wrap the `(platform)` layout in `<PlatformRoot className={notoDevanagari.variable}>`; render slides in Server Components and pass them to the player (otherwise KaTeX + react-markdown join the player chunk: lazy-load it); enable `react/no-danger` with an exception for `components/platform/ui/render/**` (WEB-6 names `components/platform/render/**`; the reviewed renderers live under `ui/render/`); CSP keeps `style-src 'unsafe-inline'` for KaTeX.
- **Admin editor (later):** use `createSvgSanitizer(...).removed` to refuse saving instead of silently stripping (AC-19).
- **Notes renderer:** contract now has `NotesSection.visuals[]` (pipeline branch): render `visual` first, then `visuals`. Case questions gained `ChildQuestion.alternatives`. Both belong to the notes/practice UIs (M2).
- **Geometry extensions** (tick marks, parallel arrows, label placement/hiding, rays/lines, highlight, not-to-scale) are being added by pipeline-engineer; the renderer ignores unknown fields today and needs a follow-up once the contract lands.
- Tailwind preflight from `globals.css` still applies inside platform pages (e.g. list markers); components restore what they need.
- Avatar is initials only (no profile photos: WEB-1).
- The CreditChip is display-only; balance comes from the API in M4.

## Decisions made

- [ADR-009](../adr/009-platform-web-dependencies-and-test-tooling.md): dependencies (pinned, additive), vitest 4.1.12 at the root (vitest 5's `@types/node` peer conflicts with the marketing pin), vite pinned to 8.3.3 to keep `postcss`/`nanoid`/`source-map-js` unchanged, KaTeX override for remark-math.
- Reviewed renderers live in `components/platform/ui/render/`.
- Table cells render inline Markdown (`$…$`, `\ce{}`, bold); plain Unicode unchanged.
- `$$…$$` on a single line renders as display maths (authors write it that way; remark-math treats it as inline).
- Raw HTML in Markdown is shown as text, not dropped (reviewers see it).
- SVG classes limited to `diagram-*`; ids namespaced per diagram; text attributes (`aria-label`) exempt from DOMPurify's URI check.
- Plot grammar matches ADR-007 exactly (implicit × only before a name or `(`; no scientific notation).
- Named diagram colours `--diagram-blue|green|yellow|brown|red` (Lead request) with tested contrast.

## Needs from owner

None.
