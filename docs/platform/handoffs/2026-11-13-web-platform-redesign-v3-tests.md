# web-platform — redesign v3 B3: Tests, Leaderboard, Ask AI, Profile, Coins, Store, Plans — 2026-11-13

Status: done (gates below; final SHA in the Lead report)
Branch: `platform/web-platform/redesign-v3-tests` (from `platform/lead/redesign-v3` @ 2cfc9f3b). Not merged, not pushed.
Contract: [DESIGN-LANGUAGE.md](../design/redesign-v3/DESIGN-LANGUAGE.md) §10 (Tests hub, series, result, builder; Leaderboard; Ask AI; Profile; Coins and Store; Plans), [ADR-032](../adr/032-design-language-v3-shell-and-age-stages.md). Kept: ADR-021 (coins), D-038 (store "coming soon"), D-046 (GST words from `invoicing.ts`), D-052 (consent only for purchases).

## What changed

All changes are inside the B3 owned paths. No API, DB, OpenAPI, billing, credits, shared-config, kit, shell or marketing changes.

**Tests** (`app/(platform)/tests/page.tsx`, `components/platform/tests/*`)
- `/tests`: plain `GreetingHeader` "Tests" + `DateChip` (IST, per request), one primary "Build your own test" + soft "Leaderboards"; `PageColumns` with "Upcoming live mocks" as a `Timeline` in the rail (first on phones; hidden when there are none); "Your subjects with tests" as kit `SubjectCard`s (subject tint + glyph, true pill "Full series" / "N chapter tests", meta "41 tests · 6 full papers" or "12 tests · free"), board/class pickers, collapsed "More subjects: coming soon"; "Recent attempts" as a `DataTable` with status pills (members). `subject-list`, `more-subjects` and `data-has-tests` kept (`data-has-tests` is now on the card's grid `<li>`: the kit SubjectCard is the link and takes no extra attributes).
- Series: `PageHeader` kept; tests as `List` rows (pink tile, title `h3`, "10 questions · 20 marks · 40 min · Chapter 2", `StatusPill` Not started / In progress / "Best 15/20", one action each: soft Start, secondary Take again, Resume link); live mocks as a `Timeline`; the start dialog's sections table is a `DataTable`. `test-card`, `data-test-id`, `start-test-open`, `start-test`, `test-meta`, `resume-test`, `series` kept.
- Result: score hero `Card` tinted by band (green ≥ 75 %, blue ≥ 40 %, yellow below) with the score, a `ProgressRing` and one line in the stage's tone (`SCORE_LINES`); `StatCard`s (answered, time, per question, percentile); sections `DataTable` (score, out of, %); topic mastery and accuracy-by-difficulty cards; review list with `StatusPill`s and 44 px `Chip` filters; "Back to tests" soft button. AI evaluation (quote → confirm → job → AI marks shown apart from the score) unchanged; `score`, `pending-self`, `percentile`, `ai-evaluation`, `ai-evaluate-all`, `ai-marks`, `self-eval`, `review-list`, `review-after-event`, `li[data-status]`, `data-item-id` kept.
- Builder: the form in one `Card` with numbered steps; chapters as a kit `List` of checkbox rows (`chapter-picker` wrapper); question types as checkbox pills (labels unchanged); "Papers like your school's" (Pro · AI) in the rail. `builder`, `build-test`, `builder-error`, `built`, `start-custom`, `paper-from-upload` kept.
- Attempt player and live mock (immersive): CSS tokens only (card hairlines, radii, pill timer/tabs, dock shadow token, the time-up overlay message on a surface card so it reads in dark mode). The live page header uses its own `liveHero` class. No markup or behaviour change in `AttemptPlayer.tsx` (autosave, offline queue, timer, auto-submit untouched).
- New `components/platform/tests/live-timeline.tsx` (`liveEventItem`, `upcomingLive`, `PHASE_TONES`, `OPEN_PHASES`) shared by the hub, the series page and the leaderboard; `attemptRow` added to `player-model.ts` (pure) and used by the hub and `/me`.

**Leaderboard** (`app/(platform)/leaderboard/page.tsx`, `components/platform/leaderboard/*`)
- `GreetingHeader` "Weekly league" with the `LeagueCrest` aside (tier written for screen readers); league card with "Your place", podium (kept), standings as LeaderboardMini-style rows grouped by zone with `StatusPill`s (Promotion / Safe / Relegation zone) and "You · {name}" written; "All-India mock ranks" section (existing `Leaderboard` from LiveEventClient); rail: "Coming up" (next four mocks as a Timeline) and "How leagues work". Guests: explanation + Log in. It is a `Button`, not a `ButtonLink`: login is a sheet opened by `useSession().openLogin`, there is no login URL (same as the shell's `login-button`). Consent-needed state kept for `CONSENT_REQUIRED.leaderboards`. One league request feeds header and card (`useLeague`). `leaderboards`, `leaderboard-consent`, `weekly-league`, `league-crest`, `league-me`, `league-class-required` kept; `zoneRows`/`ZONE_LABELS` still exported.

**Ask AI** (`app/(platform)/ask/page.tsx`, `components/platform/ai/AskClient.tsx`, `ai.module.css`)
- Plain `GreetingHeader` "Ask the AI tutor"; composer in a `Card` with radio pills (names unchanged: "Quick doubt…", "Step by step…", "Photo of a question…"); rail (stacks after the composer on phones): "AI credits" with the ghost "What can I do with my credits?" button (opens the guide) and "Recent chats" as a `List` of buttons + "Start a new chat". Quote → confirm → stream, photo upload, paywall and plan flows unchanged; every `ask-*` testid kept (+ `ask-credits`, `ask-credit-guide`, `ask-history`, `new-chat`). `ai.module.css` changes for the shared dialogs/notices/explain-slide are token-level only.

**Profile `/me`** (`components/platform/me/MeClient.tsx`, `MeExtras.tsx`, `MeInsights.tsx`, `me.module.css`)
- `GreetingHeader` with the avatar as art (also on phones; the kit hides hero art below 560 px, so `/me` shows it at 72 px via `zoom`), eyebrow "CBSE · Class 10", stage-toned subtitle.
- Cards in order: profile and school (form, weekly goal, school), avatar, appearance, public name, AI credits (`#credits`), badges (`#badges`), your tests (`#attempts`, kit `ListRow`s with score pills), plan (`#subscription`), parent approval (`#consent`), ways to log in, sign out, delete account.
- **Analytics duplication with `/me/progress` (B1):** the player card, the activity heatmap and "Solved by subject" are no longer rendered on `/me`. In their place the rail has a short "Your learning" card (anchor `#activity`, `activity-section`): streak (+ best), solved / lessons / tests totals, the player card's overall rating, and "See all your progress" → `/me/progress` (`progress-link`). Nothing was deleted: `MeInsights`, `PlayerCard`, `Heatmap`, `heatmap-model`, `BadgeGrid` keep their exports and props for B1's pages. `BadgesSection` and the new `ActivitySummary`/`activityFigures` are exported from `MeInsights.tsx`.
- Every `/me` testid kept (`my-attempts`, `subscription`, `credits`, `ledger`, `me-credit-guide`, `invoices-link`, `cancel-plan`, `public-name`, `public-name-value`, `avatar-card`, `avatar-open`, `appearance`, `profile-weekly-goal`, `logout-button`, `delete-account`, `confirm-delete`, school testids …).

**Coins and Store** (`app/(platform)/coins/page.tsx`, `components/platform/coins/*`)
- `/coins`: plain greeting; balance hero `Card tint="yellow"` (coin tile, balance, stage-toned line, the check-in, soft "Exclusive rewards: coming soon" → `/store`); Today and Practice milestones cards; "Ways to earn" as a `List` from `howToEarn()` with "Daily limit" pills; history as a `DataTable` (`coin-history-row` + `data-source` on the `<tr>`). New pure helpers `historyRow`, `earnVisual` in `coins-logic.ts`.
- `/store`: hero `GreetingHeader variant="hero" tint="yellow"` (h1 "Exclusive rewards — coming soon" while closed), teasers/items in a `CardGrid` with the deterministic rarity frames (`rarity.ts` unchanged), "Start earning now" `List`. D-038 unchanged: no items, prices, redeem or equip while `redemptionEnabled` is false.
- `CheckIn` and `DailyChallengeCard` (also on B2's Learn pages): markup and API unchanged; token-level CSS only.

**Plans** (`components/platform/plans/*`)
- Free / Plus / Pro / Board Exam Pass `Card`s from GET /v1/plans (prices and credits never hard-coded), icon tile per plan, "Most AI" and "Your plan" `StatusPill`s, one primary Buy (Pro; others soft), a green "Learning and tests are free forever" card (`free-forever`, outside every `[data-plan]`), restyled notices, invoice details and "How AI credits work". GST words only from `plans.pricesIncludeGst` (`gstRegistered` false today: no "GST" in any plan card). Billing, checkout, polling, consent and disabled logic unchanged (diff reviewed). `price-*`, `buy-*`, `plans-consent`, `plans-consent-soon`, `current-plan`, `[data-plan]`, `data-billing`, `activating`, `activated`, `plans-problem`, `invoice-*`, `how-credits` kept.

**Subject tints (Lead note):** one rule on the hub cards and live-mock timelines: the subject-art kind's tint first, the course hue only for generic subjects (`subjectTintOf` in `tests/live-timeline.tsx`, marked `TODO(lead): use subjectTintFor` for B2's helper). History/Social orange, English pink, Hindi red, Maths blue, Science green.

**Age stages:** `useStage().pick` for copy tone on the hub's empty attempts, series Start ("Let's go" for juniors), the result band line, `/me` subtitle and empty tests, the league header line, Ask's empty state, coins hero line and history empty state, store "Start earning now", plans' free-forever text. No feature is hidden by stage.

## How to verify

| Gate | Command | Result |
|---|---|---|
| Lint | `npm run lint` (root) | exit 0 |
| Build | `npm run build` (root) | exit 0 |
| Web unit | `npm run test:platform-web` | 26 files, 512 passed (+1 tint test after: `redesign-v3-tests-me` 13 passed) |
| UI kit unit | `npm run test:platform-ui` | 797 passed, 1 failed: `visual-v2.test.tsx › table` (known, pre-existing) |
| Platform typecheck | `cd platform && npm run typecheck` | exit 0 |
| Web e2e, flag ON (my specs) | `PW_WEB_PORT=3620 PW_FLAG_OFF_PORT=3621 PW_API_PORT=8610 PW_OIDC_PORT=8611 PW_CONTROL_PORT=8612 npm run test:platform-web -w @soyl/e2e -- --on-only tests.spec.ts ai.spec.ts plans.spec.ts coins.spec.ts account.spec.ts consent.spec.ts review.spec.ts revamp.spec.ts` | **49 passed** on c9640715 (31.8 min). A first run on 98892674 had 47 passed, 2 failed: `ai.spec` (recent-chat titles widened the page at 360 px) and `tests.spec` player (wider timer pushed the bottom bar 4 px out); both fixed in c9640715 |
| Web e2e, flag OFF | `… npm run test:platform-web -w @soyl/e2e -- --off-only` | **57 passed, 1 skipped** (the flag-ON-only marketing-nav test, by design) on ed9759ee |
| Marketing | `npm run marketing:diff -w @soyl/e2e -- --base platform/lead/redesign-v3` | **PASSED**: zero visual diffs (46 base snapshots, 50 checks incl. route status) on ed9759ee |

Screenshot pass on ed9759ee (production build, `next build` + `next start`, local API): 48 pages: 0 horizontal overflow, exactly one `h1` each, axe (WCAG 2.1 AA) serious/critical: none.

Environment note (Lead's gate gotcha): `.env.local` (flag ON, API on 8613) existed only while building for screenshots; it was moved out of the worktree before every e2e run, the flag-off suite and `marketing:diff` (all three ran without it), and is deleted now. `PW_*` ports were passed as process env. ed9759ee only changes subject tints (colour; tints are AA-tested in the kit) after the flag-on run.

## Tests added
- `components/platform/__tests__/redesign-v3-tests-me.test.tsx` (12): series meta, row status, series look, attempt rows (IST dates), score bands + stage copy, live timeline (IST, tint, subject only when the title lacks it, open phases soonest first), activity figures; hub (SubjectCards, `data-has-tests`, coming-soon group, timeline, recent-attempts table, no prices/credits), hub empty states by stage, series rows, result hero/ring/sections table/one h1.
- `components/platform/__tests__/redesign-v3-league-ask.test.tsx` (9): zone groups, league rules, week end, live items; header crest, standings rows with "You", guest Log in, ask rail (credits guide, chats list, new chat).
- `components/platform/__tests__/redesign-v3-coins-plans.test.tsx` (11): history/earn view-models, coins hero/table/stage copy, store h1/teasers/rarity/no redeem, plan looks, free-forever outside `[data-plan]`, "Your plan" pill + Manage, one primary, no "GST" unless registered.
- E2E edits: `review.spec.ts` (one line: `data-has-tests` on the card's `li`), `ai.spec.ts` (recent chats read from the rail list instead of `<details>`).

## Screenshots
`docs/platform/design/redesign-v3/after/tests-and-more/` — `{360,1280}-{light,dark}-member-{tests,series,result,builder,leaderboard,ask,me,coins,store,plans}.png` and `{360,1280}-{light,dark}-guest-{leaderboard,tests}.png` (48; production build; palette-optimised PNGs).

## Known gaps / follow-ups
1. **Kit (frozen) touch targets below 44 px**, reported for design-system: `RailCard` action link ("Ranks", "All tests": 36 px), `PageHeader` breadcrumb links (32 px), `Button size="sm"` and `Chip` (36 px). My pages avoid `sm` buttons and give the result filter chips 44 px in page CSS; B1's `WeeklyGoalEditor` "Change goal" on `/me` is 36 px (B1's component).
2. **Kit:** `SubjectCard` and `CardGrid` take no `data-*`/`data-testid` pass-through (hence the wrapper `div` for `subject-list` and `data-has-tests` on the `li`); `ListRow` cannot hold a button (chats, builder chapters and series rows use own rows inside the kit `List`); `LeaderboardMini` cannot carry zones/testids (league rows copy its look); `Card` accepts no `as="header"`.
3. **Kit `PageColumns` in one column** (below 960 px of container) has no `grid-template-columns: minmax(0, 1fr)`, so a `white-space: nowrap` descendant sizes the whole page column by its full text width (seen on `/ask` at 360 px once chats exist: "Recent chats" titles widened the page). Worked around in `ai.module.css` (chat titles wrap, clamped to two lines); the kit should add the `minmax(0, 1fr)` track.
4. **`/me/progress` link prefetch is off** (`prefetch={false}`) like the shell's `PROGRESS_NAV`: before B1's page exists, a prefetched 404 RSC request kept `/me` from going network-idle (e2e `goto(..., networkidle)` hangs). It can be removed once `/me/progress` is merged.
5. **Plans copy:** config lists `parent_weekly_report` ("Weekly progress report for parents") for Pro and the Board Exam Pass; it is shown because it comes from the API, but it is not obviously an AI feature (brief: "paid plans list AI features only"). Owner call; no config change made.
6. `/tests` and `/leaderboard`, `/coins`, `/ask` lost their single-item breadcrumb (`PageHeader` → `GreetingHeader`), so `/tests` no longer emits BreadcrumbList JSON-LD (it was one item). Series, builder and plans keep `PageHeader`.
7. The nested live `Leaderboard` card (LiveEventClient) still has its own `h2` "Leaderboard" inside "All-India mock ranks" on `/leaderboard`; harmless, could take a heading-level prop later.
8. When a hint's follow-up shows on `/ask`, "Show full solution" and "Ask" are both primary (unchanged flow).

## Decisions made
No new ADR (page restyles within ADR-032). Choices recorded above: analytics summary on `/me` instead of duplicating `/me/progress`; Start buttons soft on the series page (one cobalt primary per view); guest leaderboard login as a Button.

## Needs from owner
- Is "Weekly progress report for parents" an AI feature for the Plans card (follow-up 5)?
