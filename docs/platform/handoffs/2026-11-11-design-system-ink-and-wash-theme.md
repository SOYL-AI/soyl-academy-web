# design-system — Ink and wash in the app: paper by day, slate at night — 2026-11-11

Status: done (branch `design-system/ink-and-wash-theme`, from `marketing/ink-and-wash` at c2dcfaad; not pushed, no
PR yet). Ships as its own pull request with [ADR-029](../adr/029-platform-ui-paper-and-slate-theme.md) (proposed),
per plan §6 phase 4, after the Lead agrees.

## What changed

- `components/platform/ui/styles/tokens.css`: the light theme is **paper** (ground `#fbfaf7`, paper-2 surfaces
  `#f3f1ea`, ink text, graphite and muted secondary text, indigo `#27467e` as the action and focus) and the dark
  theme is **slate** (ground `#0e1215`, slate-2 surfaces `#14181c`, chalk text, chalk-muted secondary, mint `#9ec9c2`
  as the action with `#0b0f12` on it). Every `--p-*` name is kept; status, difficulty, mastery, heatmap, tier and
  diagram colours move onto the pigments (table in ADR-029). Fonts: `--p-font-sans` is Switzer, `--p-font-serif` is
  Zodiak (both from the root layout), Noto Sans Devanagari kept per glyph and under `lang="hi"`. `--p-radius-pill`
  is the soft 7 px corner (no pills), `--p-ease` is "bleed and settle", shadows are ink. New tokens `--p-stamp`,
  `--p-stamp-solved`.
- `components/platform/ui/kit/Stamp.tsx` + `Stamp.module.css` (new): the rubber stamp, double ring, label round the
  top, caption round the bottom, number in Zodiak, madder or leaf (`tone="solved"`), fixed-seed wear, tilt clamped
  to ±12°, at least 72 px. Streak days and rank cards only.
- `components/platform/ui/kit/Display.module.css`: the skeleton's gradient sweep is a flat wash that breathes.
- `components/platform/shell/appshell.module.css`: the tri-colour linear-gradient stripe is a 2 px rule in the
  action colour (indigo by day, mint at night); top bar and phone tab bar sit on the ground.
- `components/platform/shell/platform-global.css`: page canvas paper / slate; the cookie bar's night overrides on
  slate-2, chalk and mint (checkboxes too).
- `components/platform/shell/shell.module.css`: `PageHeader` titles in Zodiak 400 (Hindi titles: Noto at 600).
- `app/(platform)/dev/ui/page.tsx`: a Stamp section (`/dev/ui#stamp`), the stamp in the forced dark panel, the two
  stamp tokens in the swatches.
- `components/platform/ui/README.md`, `components/platform/ui/fonts.ts` (comment): the new grounds, fonts, Stamp.
- `docs/platform/adr/029-platform-ui-paper-and-slate-theme.md` (new, proposed).

No component markup or logic changed. Not touched: `app/globals.css`, `app/layout.tsx`, `components/ink/*`,
`components/layout/*`, `lib/*`, `components/platform/plans/*`, any marketing page, `platform/content/`,
`platform/infra/`. No new dependency.

## How to verify

```
npm ci                                   # postinstall fetched Switzer and Zodiak from Fontshare
npm run test:platform-ui                 # kit: contrast pairs in both themes, Stamp
npm run test:platform-web
npm run lint
NEXT_PUBLIC_PLATFORM_ENABLED=true npm run build
NEXT_PUBLIC_PLATFORM_ENABLED=true npx next start --port 3322 --hostname 127.0.0.1   # /learn, /plans, /ask
# with real data: (cd platform && npm run dev -w @soyl/api), then add
#   PLATFORM_API_ORIGIN=http://127.0.0.1:8787 PLATFORM_EDGE_SECRET=<the public local value in platform/e2e/tests/platform/web/env.mjs>
NEXT_PUBLIC_PLATFORM_ENABLED=true npx next dev --port 3322 --hostname 127.0.0.1     # /dev/ui (404 in production builds)
cd platform && npm ci && npm run browsers:install -w @soyl/e2e && npm run test:design-system -w @soyl/e2e
```

Theme switch for screenshots: the cookie `soyl_theme=light|dark` (ThemeBootScript sets `data-theme` on the
platform root and `data-platform-theme` on `<html>`).

Results on this branch (Windows 11, Node 24.14.1, npm 11.11.0):

| Check | Result |
|---|---|
| `npm run test:platform-ui` | 658 passed, **1 failed, pre-existing** (baseline on c2dcfaad: 645 passed, the same 1 failed): `visual-v2.test.tsx` "real content … table" flags "script-like aria-label on `<div>`". It fails identically on c2dcfaad before any change here: two authored table visuals (`computer-science/cbse-12-computer-science-ch05`, alt "Trace table run in Python for the expression (a[b)]…", and `maths/isc-11-mathematics-ch03`) contain the words "expression (", which `__tests__/inert.ts` reads as the old IE `expression(` CSS hack. Content and test heuristic, not the theme. |
| kit contrast (`kit.test.tsx`, design tokens) | 194 passed (every text pair 4.5:1, every graphic 3:1, both themes; the stamp's pairs added) |
| `npm run test:platform-web` | 464 passed (same as before the change) |
| `npm run lint` | clean |
| `npx tsc --noEmit` | clean |
| `NEXT_PUBLIC_PLATFORM_ENABLED=true npm run build` | succeeded |
| Marketing CSS | byte-identical to c2dcfaad (flag-on builds of both): every prerendered marketing page loads the same five CSS files with the same MD5s as the base build (checked again with this ADR and handoff on disk, since Tailwind scans Markdown); only chunks used by `/learn` and other platform routes changed |
| Screenshots, `next start`, flag on | `/learn`, `/learn/cbse/10`, `/plans`, `/ask` (and `/learn/cbse/10/science`) in light and dark at 390 and 1440 px, first without an API (the class page shows its error state, plans their "could not load" state), then against the local API (real catalog, plans, daily challenge). Looked at each one; not committed (they are in the session's scratch folder) |
| 360 px, no horizontal scroll | `/learn`, `/learn/cbse/10`, `/learn/cbse/10/science`, `/plans`, `/ask`, both themes: none |
| Gallery `/dev/ui` (`next dev`) | renders, both themes, 390 and 1440. In a plain (not mobile-emulated) 360 or 390 px Chrome window the document is 417 px wide: **pre-existing**, caused by the "Science exemplar" slides (KaTeX from `platform/content-templates/exemplars/…`); measured the same with this branch's kit and shell files swapped back to c2dcfaad. The e2e's mobile emulation (`isMobile`) passes its no-scroll check, so that check does not see it |
| `npm run test:design-system -w @soyl/e2e` | **14 passed** (2.1 min; mobile-360 and desktop-1280: art sheet light and dark, gallery render and XSS corpus, axe with no serious or critical violations on the page, dialog and sheet, no horizontal scroll and 44 px targets, Devanagari font, keyboard). The art-sheet spec rewrites `docs/platform/design/avatars-assets/*.png`; those regenerated images were **not** committed (outside this task's paths) and the committed ones were restored |

## Tests added

- `components/platform/ui/__tests__/stamp.test.tsx`: accessible name, decorative mode, solved tone, unique ids and
  references per stamp, tilt and size bounds, name formatting.
- `components/platform/ui/__tests__/kit.test.tsx`: `--p-stamp` and `--p-stamp-solved` text pairs on bg and surface.

## Known gaps / follow-ups

1. **The Stamp is not mounted in the app.** Every streak and rank display is in web-platform files outside this
   task's paths. Where it should go (ADR-029): the `streakRow` in `components/platform/learn/LearnHome.tsx`, the
   `dashboard-streak` stat in `components/platform/dashboard/DashboardClient.tsx` (solved tone on a goal day), and
   the weekly league card in `components/platform/leaderboard/WeeklyLeague.tsx`. Not the top-bar chip.
2. **Gradients left in web-platform CSS** (not allowed by DESIGN.md §1): the `/learn` hero's radial washes
   (`learn/home.module.css`, visible in the screenshots), the league card (`leaderboard/league.module.css`), the
   legendary shine (`coins/store.module.css`), and others in `dashboard`, `flashcards`, `lesson`, `me/insights`,
   `learn/course`, `coins`. The admin heatmap hard-codes a cobalt step (`admin/analytics/analytics.module.css`). The
   `/learn` door of plan §3.3 replaces the hero in phase 5.
3. Web-platform modules ask for weights 650 to 800; Switzer ships 400 to 600, so those headings render at 600. Which
   other headings move to Zodiak is a per-page call.
4. `app/layout.tsx` (not edited): the kit no longer reads `--font-inter` or `--font-instrument-serif`. Instrument
   Serif has no reader left and can go; Inter is still read by Future Builders (`.brand-legacy`) and
   `components/home/MiniSimulator.tsx`, so it stays, but it need not be preloaded on every page. Needs its own
   marketing-side change and regression.
5. The marketing cookie bar keeps its round buttons on platform pages (marketing component).
6. `docs/platform/adr/README.md` index does not list 028 or 029 yet (outside this task's paths); the Lead adds them.
7. The sample deck's hand-drawn refraction SVG (gallery fixture) draws its arrowheads in the SVG default black, which
   barely shows at night; pre-existing, not a token.
8. Marketing regression (`marketing:regression`) not run: the visual baseline is already expected to differ on this
   base branch (ADR-028), and the marketing CSS was compared byte for byte instead.

## Decisions made

- [ADR-029](../adr/029-platform-ui-paper-and-slate-theme.md) (proposed): keep the token names, change the values;
  a 2 px rule instead of the stripe (not a stretched painted stroke); pill radius 7 px; surface-2 lightened to
  `#ece9e0` so muted text keeps 4.5:1; mastery as a pigment ramp (turmeric deepened, henna, indigo, leaf); avatar
  backgrounds unchanged.

## Needs from owner

None for the change itself. The Lead's agreement to open the PR (plan §6 phase 4), and a look at the screenshots.

## After review (integrator, 2026-11-11)

- **The stamp is mounted** (`badfba9d`): in place of the flame on the learning home's dashboard card from day 1,
  and beside the streak in the daily check-in once today is checked in (not in the compact check-in). Both are
  decorative; the count is still written beside them, so the existing tests and screen readers read the same text.
  Not on the dashboard header: its streak is a small stat chip and a 72 px stamp does not fit it.
- **Gradients removed** (`de13c356`): the `/learn` hero is a plain sheet; the cobalt "continue" and "welcome"
  tiles are flat indigo `#27467e` (white text 9.3:1). Kept, as functional: the scroll fades in course and lesson,
  the flashcard dial, the mastery hatching, the goal stripe. **Kept, for the owner to decide:** the coin store's
  night-sky hero and the rank-card metals (bronze, silver, gold, amethyst) in `me/insights.module.css`, and the
  league card's tier tint. They are deliberate, but the language says no gradients.
- **ADR index**: 028 and 029 are listed in `docs/platform/adr/README.md`; the next free number is 030.
