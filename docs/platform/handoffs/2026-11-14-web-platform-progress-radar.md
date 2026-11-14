# web-platform (+ design-system) — progress radar: the player card back on /me/progress — 2026-11-14

Status: done (gates below)
Branch: `platform/web-platform/progress-radar` (from `main` @ 147d01db). Not merged, not pushed, not deployed.
Contract: Lead brief 2026-11-14; [ADR-023](../adr/023-platform-app-shell-and-theme.md) (card: private, deterministic, earned only, no packs or randomness); [DESIGN-LANGUAGE.md](../design/redesign-v3/DESIGN-LANGUAGE.md) §10 "Progress"; card numbers from `platform/shared/config/learning.ts` (`PLAYER_CARD`). No new ADR: no shared/marketing file, API, DB, config or dependency change.

## What changed

**Kit: `components/platform/ui/kit/RadarChart.tsx` + `RadarChart.module.css` (new, client)**
- Hand-written SVG spider chart, no chart library, no new dependency. Props: `axes: { key, label, value, max }[]`, `label`, `min`, `rings`, `tone` (`accent` | `bronze` | `silver` | `gold` | `elite`, i.e. the card tier tokens), `ghost` (`{ label, values }`, drawn as a faint dashed outline, in the sentence and as a table column; nothing passes it yet), `blank`, `unit`, `columns`, `caption`.
- Pure, exported geometry: 200 × 200 viewBox, centre (100, 100), axis 0 up and clockwise, `min` at the centre, `max` on the outer ring, values clamped (`radarAngle`, `radarFraction`, `radarPoint`, `radarPoints`, `radarSentence`). Rings at the given values (a ring at `min` is a point, so skipped). Fewer than 3 axes: renders nothing (the page shows a list).
- Labels are HTML around the SVG ("Accuracy **72**"), not SVG text, so they wrap instead of clipping and keep the 13 px type floor. The plot radius comes from a container query unit: it shrinks until the widest side label (84 px) fits beside the furthest-out vertex, and each label's max-width keeps it inside the chart's box (e2e-checked at 360 px).
- `blank`: dashed grid and axis names only, no shape, no numbers, no table; sentence "…: not rated yet (Accuracy, Consistency, …)".
- Accessibility: the plot is `role="img"` with one full sentence ("Your card attributes, from 40 to 99: Accuracy 81, … and Tests 90."); a `<details>` "Show as a table" repeats the numbers in the kit `DataTable`. Colours are tokens (tier/accent ≥ 3:1 as graphics, both themes, already tested in `kit.test.tsx`); grid lines are decoration.
- Motion: the shape grows in once when the chart scrolls into view (IntersectionObserver sets `data-in` on the DOM, no React state); none under `prefers-reduced-motion`; without an observer it is shown at once.
- README: kit table entry.

**Progress (`/me/progress`)**
- New first section **"Your player card"** (`CardSection.tsx`, `data-testid="card-section"`, heading id **`card`**, so `/me/progress#card` is the anchor). Rated card: the full `PlayerCard` beside the attribute radar in the card's tier colour (rings 40/60/80/99; caption "The centre is 40 and the outer ring 99." and, when Speed has no data yet, "Speed joins your card after 10 timed test questions answered right."), then `CardAttributes` (value, bar and the `explain` line for every attribute; two columns from a 560 px section).
- **Unrated** = the card is `provisional` (fewer than 10 checked answers or fewer than 3 active days in the 28-day window): `BlankPlayerCard` "Solve 10 questions to get rated", the dashed hexagon with all six attribute names, the rule in words from config ("…once you have checked 10 practice answers and learned on 3 different days in the last 4 weeks. Here is where each part stands:") and `CardAttributes rated={false}` (names + explain lines, no values or bars). The floor numbers (40s) are never shown. Card could not load: blank card + calm message, no radar.
- Brand-new student: the welcome first, then the (blank) card section. Everyone else: the card section first.
- New **"Your subjects"** section (`subjects-section`) right above Mastery, sharing one `GET /v1/me/mastery` with it (`MasteryBlocks`): `subjectRadar()` ranks subjects by chapters started (then score, then name); 3–8 subjects → radar (`subjects-radar`, `score` 0–100, rings 25/50/75/100, accent); more than 8 → top 8 and a "+N more subjects" section link to `#mastery-title` (the existing per-subject list); 1–2 → ranked bars (`subjects-bars`, kit `ProgressBar`, highest first); none → hidden. Single accent colour: subject tints on one shape added nothing.
- Rail: the compact card (`card-preview`) and its broken "Details → /me#card" link are **removed** (the card is the page's first section now); rail label "Your weekly goal and badges". Nothing links to `/me#card` (grep: only this note mentions it).
- View-models in `progress-model.ts`: `CARD_RADAR`, `isRatedCard`, `cardRadarAxes`, `cardRadarCaption`, `UNRATED_TITLE`, `unratedText`, `SUBJECT_RADAR_MIN/MAX`, `subjectRadar`.

**/me pieces I own**
- `MeInsights.tsx`: deleted the unused `MeInsights`, `PlayerCardSection`, `ActivitySection`, `SolvedSection` (nothing imported them since redesign v3). Kept `ActivitySummary`, `activityFigures`, `BadgesSection`, `AppearanceCard`. `ActivitySummary`'s card line now shows the rating only for a rated card ("Player card: 77 overall.", else "Your player card is not rated yet.") and links "See your card" → `/me/progress#card` (`card-link`, prefetch off like the Progress link).
- `PlayerCard.tsx`: `CardAttributes` gains `rated` and `className` and a `card-attributes` testid.

**e2e**
- `progress.spec.ts`: `card-section`, `subjects-section` instead of `card-preview`; a 4-answer member sees the blank card and a 6-axis dashed hexagon with no digits, Science in the subject bars, no `/me#card` link; at 360 and 1280 px, light and dark, no radar label leaves its chart.
- `bundle.mjs`: `/me/progress` added to the measured pages (it was missing since redesign v3).

## How to verify

Gate results (Windows 11, Node 22, 2026-11-14):
```
# repo root
npm run lint                     → exit 0
npm run build                    → ✓ Compiled successfully, TypeScript finished, 53/53 static pages, exit 0
npm run test:platform-web        → 29 files, 550 tests passed
npm run test:platform-ui         → 804 passed, 1 failed: visual-v2.test.tsx "real content … > table"
                                   ("script-like aria-label on <div>"). PRE-EXISTING: fails identically on a clean
                                   checkout of 147d01db (my changes stashed); content/visual renderer, not this task.
                                   radar-chart.test.tsx: 7/7.
# platform/
npm run typecheck                → exit 0 (all workspaces, incl. e2e)
PW_WEB_PORT=3330 PW_FLAG_OFF_PORT=3331 PW_API_PORT=8807 PW_OIDC_PORT=8808 PW_CONTROL_PORT=8809 \
  npm run test:platform-web -w @soyl/e2e -- --on-only progress.spec.ts dashboard.spec.ts pages.spec.ts
                                 → 23 passed (13.9 m)   (other ports than the defaults: a parallel agent)
node tests/platform/web/bundle.mjs --base http://localhost:3101 --only "progress,me,dashboard"   (flag-on build)
                                 → me 195.8, progress 197.3, dashboard 191.7 KB gz first load; PASSED (≤ 200)
```
Marketing CSS (Tailwind leak rule): flag-off builds of HEAD and of the base (changes stashed) → the Tailwind stylesheet is byte-identical (md5 `cb69928c8d28`, 114,824 B).

Visual check: dev API (`PORT=8797`, `MOCK_OIDC_PORT=8091`) + the flag-on build on `next start -p 3101`; fixture `student.cbse10@example.com` practised 60 MCQs in 11 chapters of 5 subjects, then (local throwaway DB only) its answers were spread over 9 IST days and 4 in 5 marked right first time, giving a rated silver card (66: ACC 87, CON 73, BRE 70, MAS 50, TST 40; no Speed). `student.cbse12@example.com` with 4 answers is the unrated case. /me/progress at 360 and 1440 px, light and dark: no radar label outside its chart, no horizontal scroll, labels 13 px.

## Tests added
- `components/platform/ui/__tests__/radar-chart.test.tsx` (7): angles and fractions (clamping, NaN, empty range), points for known values (square and card), rendered shape/rings/dots/labels/sides, the sentence and the table, default rings and units, blank state (no digits, no table), ghost outline + column, fewer than 3 axes.
- `components/platform/__tests__/progress.test.tsx` (+6, 1 updated): rated/unrated rule and axes (no Speed without data), captions and the rule text from config; `subjectRadar` none/bars/radar/top 8 + more; the rated section (first section, `#card`, tier tone, 5 axes, explanations), the provisional section (blank card, dashed hexagon, no ratings, explain lines), the new student (welcome first) and the load error, the subject radar with "+2 more subjects" → `#mastery-title` and the bars fallback; the rail no longer has a card.

## Known gaps / follow-ups
- `me.module.css` (not in my paths; the /me agent's area) still has the now-unused classes `cardSection`, `cardLayout`, `cardSide`, `statRow`, `solvedList`, `solvedHead`, `solvedTrack`, `solvedFill`, `insights`. Safe to delete with the next /me change.
- `/me` (`MeClient.tsx`, other agent): the summary card already links to `/me/progress#card` through `ActivitySummary`; no MeClient change needed. If /me wants a stronger entry, a "Your player card" row could link to the same anchor.
- Guests see only the log-in prompt on /me/progress (unchanged); the blank card + hexagon could be shown there as a teaser if the Lead wants.
- A "last month" ghost shape needs history the API does not keep (the card is computed on read); `ghost` is ready for it.
- Speed is left out of the radar until the card has timing data (a pentagon then), as the API omits it; the caption says why.
- Bundle headroom on /me/progress is 2.7 KB gz (197.3 of 200). The page was not in `bundle.mjs` before, so there is no base number; most of the card code (PlayerCard, crest, avatar) was already on the page through the rail. Watch it with the next Progress change.
- Subject mastery scores are low for most students (the score averages over every chapter of the subject, untouched = 0), so the subject shape starts small near the centre. That is honest, and it grows; if the Lead wants it more visible, a "chapters started" radar would be a product decision.
- `components/platform/ui/__tests__/visual-v2.test.tsx` "table" fails on main too (see above); for the design-system/content owner.

## Decisions made
- Provisional = unrated on this page (Lead brief: never show unsettled numbers); /me's summary follows the same rule.
- Rail card removed rather than re-pointed: the same card twice on one page was clutter.
- Labels in HTML rather than SVG text (wrapping, real type sizes at every width).

## Needs from owner
None.
