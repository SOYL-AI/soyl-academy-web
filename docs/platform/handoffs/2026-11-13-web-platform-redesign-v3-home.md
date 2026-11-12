# web-platform — redesign v3 B1: Home + Progress — 2026-11-13

Status: done (gates below)
Branch: `platform/web-platform/redesign-v3-home` (from `platform/lead/redesign-v3` @ 2cfc9f3b). Not merged, not pushed.
Contract: [DESIGN-LANGUAGE.md](../design/redesign-v3/DESIGN-LANGUAGE.md) §1, §5, §6, §8, §10 "Home" and "Progress"; [ADR-032](../adr/032-design-language-v3-shell-and-age-stages.md). No new ADR: no shared, marketing, API, DB or config change.

## What changed

**Home (`/me/dashboard`)**: the members' calm "today" page (`components/platform/dashboard/`)
- `GreetingHeader variant="hero"`: eyebrow `dashboard-profile-line` ("CBSE · Class 10 · school"), the greeting by age stage and India time (computed after mount: `useNow`; before mount a neutral "Hi, Asha"), one encouraging line (new → goal met → streak today → streak at risk → questions left; never a zero), ONE primary `ButtonLink` (`home-next`, `data-kind`) to the real next step: the lesson part the student was on while the lesson is unfinished, then practice, else the chapter; without a chapter the class hub ("Pick a subject"), or `/learn` without a class. Art: the student's own `AnimalAvatar` (`dashboard-avatar`; 128/112/96 px by stage; hidden below 560 px by the kit).
- Compact prompts: `prompt-class` (board + class form on a blue tint, secondary Save so the hero keeps the only primary) and a one-row `prompt-school` / `prompt-school-consent` that no longer wraps badly at 360 px.
- `ContinueCard` (`continue-card`) only when there is something to continue: subject tint + glyph, "Science · Chapter 2 · Part 2 of 3 · 4 answered", lesson parts as the bar, "Open chapter".
- This week's goal (`today-goal`): `GoalRing` + `WeekStrip` (IST days from `/v1/me/activity?days=7`), "Change" → `/me/progress#weekly-goal`; a brand-new student gets a plain line instead of a 0/20 ring. **First on phones**, top of the rail from a 960 px page container.
- Your subjects (`home-subjects`): `SubjectCard` grid of the class subjects that have lessons, tint + glyph per subject, chapters started as the bar, mastery named only from 10 % (no "0% mastery"), "See all" → class hub; plain variant for seniors with more than 6.
- Study your way (`home-modes`): `ModeTile`s for the continue chapter from its hub (lesson parts/slides, notes sections, flashcards, practice tried of total, Tests → `/tests`); a mode the chapter does not have is "Coming soon" (disabled), never a 404 link.
- Rail: upcoming live mocks (`home-live`, `Timeline`, at most 2, live first, IST, hidden when none), weekly league (`league-card`: `LeaderboardMini` top five + You, tier pill, "You are #2 … Safe this week"; consent rules unchanged: `league-locked` without `leaderboards`, no request; hidden while the class is not set because the class prompt says it), daily challenge (`home-challenge`, yellow `RailCard`, 3 subjects with soft "Solve" buttons opening the existing `ChallengeSolver`, "Solved" pills, "All subjects" → class hub), AI credits (`credits-tile`, `dashboard-credit-guide` "What can I do with my credits?", `dashboard-bonus-today`; says credits are for Ask AI/Explain and learning is free).
- Quiet "See all your progress" link card (`progress-link`) → `/me/progress`.
- Brand-new student: welcome card (`dashboard-welcome`, three steps), `data-new` on `dashboard`, no zeros anywhere.
- Removed from Home: KPI row, difficulty chart, mastery bar, charts, focus areas, heatmap, recent activity, player card, the header's streak/level/coins chips (the top bar has them). All moved to Progress (nothing user-facing deleted).
- Guests (`dashboard-guest`): v3 restyle, same testids (`device-progress`, `dashboard-login`, `continue-card`).
- Layout: a page grid (`home.module.css` `.layout`, container query at 960 px) instead of `PageColumns`, because the brief needs the goal first on phones but the rest of the rail after the main column; `PageColumns` can only move the whole rail. See "Kit notes".

**Progress (`/me/progress`, new)**: `app/(platform)/me/progress/page.tsx` + `components/platform/progress/`
- Members only; guests get the /me pattern (`progress-guest`, h1 + `EmptyState` + `progress-login` returning to `/me/progress`). Rendered per request (`connection()`), `requirePlatform()`, `robots: noindex`.
- `GreetingHeader` plain "Your progress", "CBSE Class 10 · this week, 9–15 Nov". Exactly one h1.
- `StatGrid` (`kpi-solved|accuracy|lessons|days`, each with `data-value`): a stat with no data is left out; trends in words.
- Mastery (`mastery-tile`): `MasteryBar` (+ ring only when > 0) and per-subject `ListRow`s with a 40 px `ProgressRing`.
- Test scores (`tests-tile`): `DataTable` (`test-row` + `data-marking`, "Sat 15 Nov" dates, score %, marks, Auto/Self-marked and Time-up pills); the existing score chart (`score-trend`) only from 3 marked tests.
- Practice by difficulty (`difficulty-tile`, `difficulty-chart` + `data-solved`): three `StatCard`s; totals over 1,000 are never shown as denominators.
- Focus areas (`focus-tile`, `focus-weakest`, `focus-strongest`, `focus-practise`).
- Activity (`activity-card`): streak, longest, study days; `Heatmap` only from 7 active days in its window, otherwise this week's `WeekStrip`.
- Recent activity (`recent-tile`, rows `recent-row-{lesson|practice|test|badge}`).
- Rail: weekly goal (`weekly-goal`, anchor `#weekly-goal`, ring + the existing `WeeklyGoalEditor`), player card (`card-preview`), badges teaser (`badge-tile`, `BadgeMedal`, next badge progress).
- Brand-new student: one welcome card (`progress-empty`) listing what will appear, instead of six empty sections and a 0/20 ring.
- Route coverage checked (no edits needed): `proxy.ts` matcher `/me/:path*` (nonce CSP; e2e asserts it), `isPlatformPath` (`/me` prefix), `RETURN_TO_PREFIXES` (`/me`), `isFocusRoute` (not focus), tab bar Home lit (`HOME_NAV.also` has `/me/progress`, `ME_TAB.except` too), sitemap/robots (platform pages are not in the sitemap; the page is `noindex`).

**Shell**: `AppShell.tsx` only `PROGRESS_NAV`: `prefetch: false` and its comment removed.

**Shared dashboard code**: `model.ts` lost the Home-only view-models no page uses any more (`kpiTiles`, `classLine`, `difficultyView`, `difficultyScopeNote`, `goalView`); `greeting` stays (LearnHome re-exports it). `charts.tsx` keeps only `ScoreTrendChart`. `dashboard.module.css` keeps only the goal editor and chart styles (`WeeklyGoalEditor` is also used by `/me`). `Teasers.tsx` removed (replaced by `HomeRail.tsx` and the Progress rail).

New: `dashboard/home-model.ts` (pure), `dashboard/useHomeData.ts` (one hook per request), `dashboard/HomeRail.tsx`, `dashboard/home.module.css`, `progress/progress-model.ts` (pure), `progress/ProgressClient.tsx`, `progress/progress.module.css`.

Data: existing API only. Besides the listed endpoints Home reads the public chapter hub `GET /v1/chapters/{id}` (already proxied and used by the course pages) to know the lesson parts and which study modes exist. No API, DB, OpenAPI or shared-config change.

## How to verify

| Gate | Command | Result |
|---|---|---|
| Lint | `npm run lint` (root) | exit 0 |
| Build | `npm run build` (root) | exit 0 (`/me/dashboard` and `/me/progress` dynamic) |
| Web unit | `npm run test:platform-web` | 25 files, 499 passed |
| UI kit unit | `npm run test:platform-ui` | 797 passed, 1 failed: `visual-v2.test.tsx › real content … › table` (the known pre-existing failure, content data) |
| Platform typecheck | `cd platform && npm run typecheck` | exit 0 |
| Web e2e, flag ON | `PW_WEB_PORT=3420 PW_FLAG_OFF_PORT=3421 PW_API_PORT=8410 PW_OIDC_PORT=8411 PW_CONTROL_PORT=8412 npm run test:platform-web -w @soyl/e2e -- --on-only dashboard.spec.ts progress.spec.ts avatars-assets.spec.ts review.spec.ts revamp.spec.ts` (from `platform/`) | 45 passed, 0 failed (35 min) |
| Web e2e, flag OFF | same ports, `-- --off-only` | 57 passed, 1 skipped (the flag-ON-only marketing-nav test, by design) |
| Marketing | `npm run marketing:diff -w @soyl/e2e -- --base platform/lead/redesign-v3` | PASSED: zero visual diffs, 50 checks incl. route status |

Note for anyone running the gates: a worktree `.env.local` with `NEXT_PUBLIC_PLATFORM_ENABLED=true` is loaded by `next build` even when the runner strips the variable from the process env, so it turns the flag-OFF build and the marketing diff ON. Move it away before the e2e and marketing gates (the `PW_*` ports must be passed as process env; `env.mjs` does not read `.env.local`).

## Tests added
- `components/platform/__tests__/home-model.test.ts` (12): stage titles and subtitles, continue labels, next step, continue meta/progress, subject tints (Maths blue, Science green, English pink, Hindi red with `lang="hi"`), subject cards ("no 0% mastery"), study modes ("Coming soon"), live mocks (IST, joinable only, live first), durations, week ranges, league rows (top five + You, "A student"), goal copy.
- `components/platform/__tests__/progress.test.tsx` (9): stats (hidden without data), no denominators over 1,000, subtitle and IST days, test rows, heatmap threshold, guests, member skeleton, fresh welcome, every section of an active student, heatmap from 7 days and no chart under 3 tests, the goal editor in the rail.
- `components/platform/__tests__/dashboard.test.tsx`: `HomeView`/`DashboardClient` tests rewritten for v3 (fresh welcome with no zeros, consent re-gated league, next step into lesson part 2, subjects, modes, league, challenge, mocks, removed sections, class prompt save, credits card + guide, guests, retry).
- E2E `dashboard.spec.ts`: Home for a new student (welcome, one h1, "Pick a subject", no analytics), the class prompt, Home after practice (next step into ch01, continue card, modes, week strip), Progress numbers (solved, accuracy, difficulty, study days, recent, week strip instead of a heatmap, streak), goal edit on Progress followed by Home, axe + 360 px light/dark on both pages; screenshot test also shoots Progress.
- E2E `progress.spec.ts` (new): guests (prompt, axe, nonce CSP, log in returns here), a brand-new member (welcome, no stats, tab bar Home lit, link from Home), a member with practice (every section, no "of 7,537"-style denominators, light/dark × 360/1280 axe + no horizontal scroll, sidebar Progress current and navigates from Home).
- E2E `review.spec.ts`: `/me/progress` added to the "one page container lines up with the top bar" list.

## Screenshots
Production build (`next build` + `next start`, no dev badge) against the local API, `docs/platform/design/redesign-v3/after/home/`: `{360,1280}-{light,dark}-{new,active}-{home,progress}.png` (16). "new" = signed up, name only, no class; "active" = CBSE 10, one lesson part done and one in progress, 9 practice answers, three short chapter tests. Full-page captures, so on phones the fixed tab bar shows mid-image.

## Kit notes (frozen kit; worked around locally)
1. `PageColumns` can only move the whole rail on phones (`railFirstOnPhones`). Home needs "goal first, rest of the rail after the main column", so it uses a page-local grid with the same 960 px container query and 320 px rail. Suggest a `railTop` slot (or per-card order) in `PageColumns`.
2. `StatGrid` switches columns by viewport (`@media 900px`, auto-fit 180 px), so four stats in the main column next to the rail wrap 3 + 1 at 1280 px. Progress overrides it with a container query (2 × 2, four in a row from 760 px of column). Suggest container queries in `Stat.module.css`.
3. `EmptyState compact` is still card-sized (icon squircle, centred text); six of them in a row read as a wall of empties. Progress and Home use a local one-row "quiet" empty state (icon tile + title + line + optional action). Suggest a kit `EmptyRow`.
4. `ContinueCard`'s pill is always cobalt; with the hero's primary that is two cobalt pills on Home (as in the brief and ref-1). Left as designed; the hero is the next step, the card opens the chapter ("Open chapter").
5. Subject tints: `subjectTint(subjectStyle().hue)` (the snippet in §8) gives History yellow and English red, while §2 says History orange and English pink. Home uses the subject-art kind (`subjectLook()` in `home-model.ts`: kind tint, hue only for generic subjects), which matches §2 and the gallery. B2 (Learn) should use the same so a subject looks the same on every page.

## Known gaps / follow-ups
- Practice "solved of total" per subject and lesson-part completion per chapter come from the existing APIs; Home shows chapters started rather than chapters completed per subject (no per-subject completion count in `/v1/me/mastery` for untouched subjects).
- `flag-off.spec.ts` (not mine) lists `/me/dashboard` and `/dashboard`; `/me/progress` is a 404 with the flag off through `requirePlatform()` like every platform page, but is not in that list. The Lead may add it.
- The score chart summary uses the existing `dayLabel` ("13 Nov 2026"); the table uses "Fri 13 Nov".
- `avatars-assets.spec.ts` rewrites the tracked screenshots in `docs/platform/design/avatars-assets/` on every flag-on run; I reverted them (not my paths). The Lead may want those regenerated once at integration.
- `dashboard.spec.ts › … /learn for members` still asserts `dashboard-link` on `/learn`; B2 owns `/learn` and may change it.

## Decisions made
None needing an ADR (page-level layout within the v3 contract; deviations listed under "Kit notes").

## Needs from owner
None.
