# marketing — Ink and wash, phase 1 (foundations) — 2026-11-10

Status: done (branch `marketing/ink-and-wash`, draft PR #23). Not merged, not deployed, visual baseline not
re-captured (owner first; ADR-028 "Baseline").

Plan: `docs/redesign-ink-and-wash.md` §6, phase 1. Decision record: ADR-028 (amended for the points below).

## What changed

- **Tokens** (`app/globals.css`): `@theme static` with the paper set and the slate set from plan §2.2, the
  `--ease-ink` easing and `@property --sweep`. Legacy names are re-pointed to the new pigments (cobalt → indigo,
  red-pen/red-ink → madder, success → leaf, highlighter → a light turmeric, the `*-soft` tints), not removed.
  The body ground is paper. The `content-visibility: auto` rule on `main > section ~ section` and `.cv-auto` is
  **deleted** (the page no longer changes height while scrolling).
- **The old "paper" band** (`#F6F2EA`, used as `bg-paper` on pages not yet rebuilt) is now the ground, so those
  18 uses were renamed `bg-paper-2` (mechanical; same look). `.t-lead` reads graphite, because `muted` is the
  caption colour now.
- **Future Builders keeps its look** (plan §3.3): `app/future-builders/layout.tsx` wraps both FB routes in
  `.brand-legacy`, which restores the legacy values, the white ground, Inter and Newsreader (loaded only on
  those routes). Only the shared header and footer change there. The Diwali page and its prices are untouched.
- **Fonts**: `lib/fonts.ts` (`next/font/local`, Zodiak 400 + 400 italic with an adjusted Times New Roman
  fallback, `display: optional`; Switzer 400/500/600 with an adjusted Arial fallback, `display: swap`).
  `scripts/fetch-fonts.mjs` downloads them from Fontshare into git-ignored `assets/fonts/` on `postinstall`,
  `predev` and `prebuild`, with a cache in `node_modules/.cache/soyl-fonts/` and, as a last resort, a glyphless
  placeholder (`scripts/fonts/placeholder.woff2`, `make-placeholder.py`) so the build never fails. Newsreader is
  gone from the root layout; Inter and Instrument Serif stay (the platform UI kit reads them until phase 4).
- **Paint**: `tools/art/` (p5.brush + licence, the SOYL engine, `plates.js`, `paint.py`, `process.py`).
  `public/art/` has 19 WebP plates (ring, rays, wash, sun and their night versions; six pigment pools; three
  strokes and a chalk stroke; the panel), every one within budget (ring 101 KB, ring-chalk 108 KB, the rest
  under 80 KB). Raw plates (`tools/art/out/`) are git-ignored and reproducible from the seeds.
- **Components** `components/ink/`: `Button` (`InkLink`, `InkButton`, `inkButtonClasses`), `Chip`, `Section`,
  `Stroke`, `Dab`, `Wash`, `InkPhoto`, `Ring`, styled in `ink.module.css` inside Tailwind's `components` layer.
  Ink reveals (`data-reveal="ink-wipe"`, `"ink-ring"`) are in `globals.css` and use the existing RevealObserver.
- **Header and footer** restyled, same structure, ids, labels and menus (ADR-025): paper bar, Switzer, indigo
  action with soft corners, no pill hovers; menu tiles in the pigments; feature cards indigo / slate / paper-2
  with one painted pool instead of the tri-stripe and shapes. The footer is the slate band: chalk text, a chalk
  stroke under the slogan, a mint "Book a demo", the SOYL wordmark in flat chalk (no gradient). Focus and the
  hover line on dark bands are mint.
- `DESIGN.md` replaced (it was an unrelated Notion analysis from the first commit) by plan §2 plus a component
  guide. `eslint.config.mjs` ignores `tools/**`. ADR-028 amended.

## How to verify

```
npm ci                      # postinstall prints "[fetch-fonts] brand fonts from fontshare"
npm run lint                # clean
npm run build               # exit 0 (prebuild prints "brand fonts present")
npx next start --port 3311
python <checks>             # the phase 1 checks below
```

Run on 2026-11-10 (Windows 11, Node 24, Chrome), platform flag off (canonical env):

- `npm run lint`: no findings.
- `npm run build`: exit 0, TypeScript passed, 52 pages generated.
- Statuses against `next start`: all 22 pages and 10 endpoints in `platform/e2e/marketing/routes.ts` answered
  with their expected status (200, 404 for the not-found page, 405 for the POST-only APIs).
- No horizontal scroll (`scrollWidth <= clientWidth`) on all 21 pages at 360, 390, 768, 1024 and 1440 px.
- Document height identical at load and after scrolling to the bottom, all 21 pages at 390 and 1440 px.
- Fonts in use: Switzer (body, nav), Zodiak (headings, footer slogan); Newsreader and Inter inside Future Builders.
  No request to fontshare.com or Google Fonts from the browser.
- Looked at by eye (screenshots): `/about` top and footer, the Programs menu, `/future-builders`, the phone home
  and the phone menu sheet.
- No-network fallback: with all five files in `assets/fonts/` replaced by the placeholder, `npx next build`
  exits 0 (52 pages). The real files were then restored.

One bug found and fixed while checking: the root layout imports the header (and so `ink.module.css`) before
`globals.css`, so the module's `@layer components` became the first layer on the page and Tailwind's reset
outranked it, deleting every `.page` gutter (8 px of sideways scroll everywhere). The module now declares the
layer order first (`@layer properties, theme, base, components, utilities;`).

## Not run

- The platform e2e suites (`test:platform-web`, `marketing-nav.spec.ts` with the flag on), the design-system e2e
  and the marketing regression. The header kept every id, label and order those specs assert; the regression is
  expected to show visual diffs on this branch until the owner approves a re-baseline (ADR-028).
- A build with `NEXT_PUBLIC_PLATFORM_ENABLED=true` (the Learn feature card is the slate one in that state).
- Lighthouse.

## Known gaps / follow-ups

- **Phase 2** (moved from phase 1 on purpose): Learn first in the nav and the bar's `Start free` action when the
  flag is on (plan §3.3). They change labels and order that `marketing-nav.spec.ts` asserts, so they ship with
  the home page and the spec update together.
- The footer copy still describes school assignments ("Interactive assignments for Grades 1–10…"); rewrite it
  with the home page in phase 2.
- **Switzer has no ₹.** Set prices in Zodiak (it has the sign), or the rupee falls back to Arial.
- The cookie bar keeps its old black pill buttons (a legal component; phase 5).
- Inter is still preloaded on marketing pages for the UI kit; drop it in phase 4.
- The `components/ink` components are not used by any page yet except the header, footer and menus; phase 2 is
  the first real use of `Ring`, `Chip`, `Wash` and `InkPhoto`.

Decisions made: ADR-028 (amended: `postinstall`, the placeholder font, the Future Builders fence, `tools/**`
ignored by lint).

Needs from owner: a look at the branch preview; the open questions in the plan §8 still stand (fonts fetched vs
committed is implemented as "fetched").
