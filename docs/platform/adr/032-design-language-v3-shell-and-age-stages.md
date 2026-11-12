# ADR-032: Design language v3, sidebar app shell and age stages

Status: accepted (design-system, 2026-11-12; Lead to confirm on integration)
Related: ADR-001 (platform inside the marketing app), ADR-009 (scoped tokens, CSS Modules), ADR-023 (platform app shell, Light/Dark/System theme; amended here), D-043 (student dashboard is the members' home), D-044 (credit guide), D-052 (consent only for purchases).
Contract for page agents: [`docs/platform/design/redesign-v3/DESIGN-LANGUAGE.md`](../design/redesign-v3/DESIGN-LANGUAGE.md).

## Context

The owner (2026-11-12) wants the learning platform to "feel as good as possible" for students in Classes 7–12, with complete freedom on the design language but SOYL's colours. Five reference screenshots were given (a calm tablet "today" home with a greeting hero, continue card, skill tiles, daily-goal ring, league and reward rail; a monochrome dashboard; pastel progress cards; a notion-style student dashboard; a sidebar dashboard with KPI cards). The Lead's critique of the ADR-023 UI: the signed-in `/learn` stacks an empty Continue block, a subject list, the daily challenge and the full board/class picker again; `/me/dashboard` is a 12-section analytics scroll with a mostly empty 140-day heatmap and "3 of 7,537" denominators; the top bar is crowded (streak, coins, AI credits, theme, avatar, five nav items); everything is flat white boxes with thin borders on a cool grey canvas.

Constraints: marketing must not change (golden rule 1, `marketing:diff` zero-diff); AA contrast in both themes (unit-tested); 360 px first; Devanagari intact; no new runtime dependency; the ADR-023 theme boot script and CSP hashes unchanged; existing pages must keep working before the page agents restyle them.

## Decision

### 1. Design language v3: "warm notebook, soft cards"

- **Canvas and surfaces.** Light: warm paper `#f6f4ef` (`--p-bg`; the brand paper `#f6f2ea` is `--p-paper` for hero panels) with white cards; dark: `#121316` canvas, `#1b1c20` cards. Cards lose the grey 1 px border and get a hairline (`--p-card-border`) plus a soft low shadow (`--p-shadow-card`); hover lifts to `--p-shadow-2`.
- **Colour roles.** SOYL cobalt `#2b4fe6` stays the single action colour (dark `#8ea2ff`). Red-pen `#c8473c` and highlighter `#f2d45c` stay brand accents (tri-stripe, hero decoration `--p-decor-*`, "new", live, errors). Ink `#15171c`.
- **Tint family (new).** Nine pastel fills `--p-tint-{blue,violet,pink,red,orange,yellow,green,teal,neutral}` each with a strong ink `--p-tint-X-ink`, for subjects (`subjectTint()`), study modes (`STUDY_MODES`) and friendly cards. Unit tests assert AA (4.5:1) for `--p-ink`, `--p-ink-muted`, `--p-ink-subtle`, `--p-accent` and the tint's own ink on every fill, in both themes.
- **Shape and type.** Radii up (sm 6, md 10, lg 16, xl 20, 2xl 24); cards use the stage radius (20 by default); **pill buttons**; a new `soft` button variant; badges and chips are pills. Bigger titles (`h1` 30 → 36 px, greeting 28 → 40 px fluid), display weight 750, slight negative tracking (normal for Devanagari).
- **Kit additions** (server-safe, CSS Modules, scoped under `.soyl-platform`): `PageColumns`, `PageSection`, `SectionHeader`, `CardGrid`, `GreetingHeader`, `DateChip`, `greetingFor`, `StatCard`, `StatGrid`, `GoalRing`, `WeekStrip`, `weekDays`, `IconTile`, `SubjectCard`, `ModeTile`, `ContinueCard`, `RailCard`, `LeaderboardMini`, `List`, `ListRow`, `StatusPill`, `DataTable`, `Timeline`, `ButtonLink`, `SkeletonCard`; `Card tint`, `cardLinkClass()`, `EmptyState tint|compact`; icons `chart`, `calendar`, `arrowRight`, `star`, `sparkles`. Existing kit APIs are unchanged (additive props only).

Options considered: (a) keep ADR-023's cool grey + borders and only add components: cheaper, but does not answer the owner's "feel as good as possible"; (b) a monochrome look (ref-2): clean but cold for 12-year-olds and loses SOYL's colours; (c) pastel-heavy cards everywhere (ref-3): friendly but noisy for exam-focused seniors. Chosen: a warm neutral base with white cards (calm), pastel tints reserved for subjects/modes (friendly, meaningful), cobalt only for action.

### 2. App shell: left sidebar, slim top bar (amends ADR-023 §a)

- **≥ 1024 px:** a sticky left sidebar replaces the top-bar navigation: the SOYL mark, nav (members: Home, Learn, Tests, Ask AI, Leaderboard, Progress; guests: Learn, Tests, Ask AI, Leaderboard), then today's AI credits (opens the credit guide; guests get a "Keep your progress / Log in" card), the "‹ soylai.com" link (owner requirement, ADR-023) and the student card (avatar, name, level, class → `/me`). 1024–1279 px it is an 80 px icon rail (names are accessible names and hover/focus tooltips); from 1280 px it is 248 px with labels.
- **Top bar (60 px):** the SOYL mark only below 1024 px; from 1024 px the page context (the member's class chip and today's date). Right side: only the streak and SOYL Coins chips, the theme picker and the avatar (or Log in).
- **AI credits leave the top bar** except on `/ask` and `/plans`, where credits are the subject (`CREDIT_CHIP_ROUTES`). The credit guide stays reachable from the sidebar (≥ 1024 px), from the top-bar chip on Ask AI and Plans, and from the Home credits card. Rationale: the Lead's "crowded top bar"; credits are only relevant when about to use AI (golden rule 3: learning is free, so credits should not shout on learning pages).
- **< 1024 px:** unchanged tab bar (five tabs; Home lit on `/leaderboard` and `/me/progress`), restyled with a pill behind the current icon; the "Back to soylai.com" row above the top bar.
- **Immersive routes** (lesson, flashcards, test attempt, live mock): no sidebar and no tab bar; the top bar keeps the mark, the soylai.com link (≥ 768 px) and the chips (as before).
- **Progress (`/me/progress`)** joins the member nav; the page itself is built by a page agent (it is under `/me`, so the proxy's nonce-CSP matcher already covers it). Until it lands the link returns the platform 404.
- One page container (`shell.page`, `--p-content-max` 1200 px, responsive `--p-gutter` 16/24/32 px) shared with the top bar, so content still lines up with the bar (review.spec).
- Unchanged: skip link, `CelebrationHost`, app footer, Light/Dark/System with the same `THEME_BOOT_SCRIPT` (no CSP hash change), dark cookie bar, `MainSiteLink` texts and testids.

### 3. Age stages

One system with a knob: `data-stage="junior|middle|senior"` on the shell root, `junior` for Classes 7–8, `middle` 9–10 (default), `senior` 11–12. Resolution (`shell/stage.ts`): the member's own class from GET /v1/session (no new API call), else the class in a course URL (`/learn/{board}/{class}/…`, `/tests/series/{board}/{class}/…`, so guests browsing Class 7 get the junior feel), else middle. `tokens.css` retunes only `--p-stage-*` tokens (card radius, padding, gap, tile minimum, greeting size, avatar size), which the kit reads; client pages get `useStage()` (`stage`, `classLevel`, `source`, `pick()`), server pages `stageForClass()` / `byStage()`. Stages change density, size and copy tone only, never features, navigation or what is free.

Options considered: separate "kids" and "teens" themes (rejected: two systems to maintain, and a Class 8 student can be 14); no stages (rejected: the owner's age range is wide).

## Consequences

- Every existing platform page picks up the new canvas, radii, card elevation, pill buttons and larger titles through tokens and kit CSS, before any page agent touches it. Spot-checked at 360/1100/1280 in both themes: nothing breaks and nothing overflows; pages that hard-code their own borders still look like ADR-023 cards until their page agent restyles them (listed in the handoff).
- The sidebar takes 80/248 px from 1024 px, so page containers are narrower than before on desktop (1032 px of column at 1280). Course pages with their own sidebar (subject, chapter, practice) still fit; `PageColumns` uses a container query (two columns from 960 px of page width), so the right rail appears from about 1100 px (icon rail) and at 1280 px (full sidebar).
- E2E updated for the shell: `revamp.spec.ts` (new canvas colours), `review.spec.ts` (widest member bar is now Ask AI; a v3 sidebar/stage test), `avatars-assets.spec.ts` (credit guide opened from the chip on Ask AI). Testids kept: `credit-chip` now only exists on `/ask` and `/plans`; new `sidebar`, `sidebar-credits`, `sidebar-profile`, `class-chip`, `app-shell` (+ `data-stage`).
- The member's stage can change once after the session loads on pages without a class in the URL (middle → junior/senior): only `--p-stage-*` values change (radius, padding, greeting size), no layout jump of navigation.
- No new dependencies, no API or DB changes, no shared/marketing file changes; `platform-global.css` (platform-only selectors) changes the page canvas colours to match.
