# web-platform + design-system — student dashboard, school and weekly goal on the profile — 2026-10-28

Status: done (see "Gates")
Branch: `platform/web-platform/dashboard` (from local `platform/main` 0ce97af: UI revamp f71fc25 + the dashboard/school backend).
Decisions: D-043 (owner ask), D-014 (school only with consent), D-039 (data minimisation: nothing at sign-up), D-042 (what "solved" means), ADR-023 (app shell), ADR-010 (private data fetched in the browser).

## What changed

**Route: `/me/dashboard` (with `/dashboard` as a short link).** The brief recommended `/dashboard`. The proxy's matcher in `proxy.ts` is a literal list (Next requires it) and `proxy.ts` is outside this task's write paths, so a top-level `/dashboard` page would have shipped **without the platform CSP and security headers**; `/dashboard` is also not in `RETURN_TO_PREFIXES` (`platform/shared/config/security.ts`, backend-owned), so a login could not return to it. Under `/me` the page gets the nonce CSP like `/me` (WEB-3), is a valid return target, and `/me`'s logout rule (leave member pages for `/learn`) applies. `/dashboard` is in `PLATFORM_PREFIXES` (so no Vercel analytics, marketing chrome steps aside, marketing regression inventory) and is a page that `redirect()`s to `/me/dashboard` (a plain 307, no body); with the flag off it is the marketing 404 with the marketing header and footer. If the Lead prefers `/dashboard` as the canonical URL: add `'/dashboard', '/dashboard/:path*'` to `proxy.ts`'s matcher (+ its unit test), `/dashboard` to `NONCE_ROUTE_PREFIXES` and to `RETURN_TO_PREFIXES`, then swap the two pages (an ADR-level change to a shared file).

**Navigation (app shell, ADR-023).** Members: **Home** (→ `/me/dashboard`, new `home` icon) is the first item of the top bar. Mobile tab bar: still five tabs; for members Home replaces Ranks (Home, Learn, Tests, Ask AI, Me), and Home stays lit on `/leaderboard` (the dashboard carries the league teaser). Me is not lit on `/me/dashboard` (`except` on the nav item). Guests: unchanged (Learn, Tests, Ask AI, Ranks, Me).

**Default landing after login.** `defaultLoginReturnTo()` (`components/platform/lib/return-to.ts`): a login opened **without an explicit `returnTo` on the platform home `/learn`** (the top-bar Log in, the guest nudge) lands on `/me/dashboard`; on every other page the student comes back to that page exactly (CONTEXT §5, AUTH-13), and an explicit `returnTo` always wins (unchanged). Google sign-in follows the same target (it is passed through the sheet). The API-side fallback when no `returnTo` reaches it at all (`RETURN_TO_FALLBACK = '/learn'`, backend config) is unchanged.

**The dashboard page** (`components/platform/dashboard/`): `DashboardClient.tsx` (session gate, data loading, sections), `model.ts` (pure view-models, every chart's text alternative), `charts.tsx` (inline SVG/CSS), `WeeklyGoalEditor.tsx` (shared with `/me`), `Teasers.tsx` (player card + league, moved from `/learn`), `dashboard.module.css`. Data, all in the browser: `GET /v1/me/dashboard`, `GET /v1/me/card` (level, XP, coins, card), `GET /v1/me/activity?days=140` (streak, heatmap), `GET /v1/me/mastery` (per-subject), and `GET /v1/leagues/current` only when consent is granted. Only fields the API returns are shown.

| Section | Source | Empty state (new account) |
|---|---|---|
| Header: IST greeting + display name, board/class · school, streak, level + XP, coins | dashboard `profile`, `/card`, `/activity` | "Board and class not set" |
| Prompts | `profile.missing` / `profile.schoolStatus` | class missing → inline Board + Class form (PATCH `/v1/me`, then the dashboard reloads); school missing with consent → link to `/me#school`; `consent_required` → "add your school after a parent approves" → `/me/consent?next=/me/dashboard` (never a school prompt) |
| Welcome | `isNewAccount` (nothing answered, finished or submitted) | "Your dashboard fills in as you learn" + Start learning |
| KPI tiles | solved this/last week (delta), accuracy last 7 vs previous 7 days (points), lessons completed, tests taken with average/best %, active days this week | 0 / "–" / "No marked tests yet" |
| Weekly goal | `weeklyGoal` ring + "Change goal" (5–300, PATCH `/v1/me {weeklyGoal}`, "Use the default (20)" = null) | default goal 20, 0 solved |
| Solved by difficulty | `solvedByDifficulty` (LeetCode: ring for all + Easy/Medium/Hard bars, `solved/total` written) | zeros + "Set your class to count…" |
| Mastery | `mastery` (ring + Khan stacked bar over the scope) + `/v1/me/mastery` subjects (bar + %, link to the subject) | "Set your board and class, or start any chapter…" |
| Test scores | `testHistory` (bar per marked attempt, oldest → newest; self-marked bars hatched) + latest 5 with Auto-marked / Self-marked / Submitted-at-time-up tags, link to the result; "All your tests" → `/me#attempts` | "Take a chapter test…" + Find a test |
| Focus areas | `focus.weakest` ("Practise now" → `…/practice` from `link`) and `focus.strongest` (→ chapter) | "Answer at least 3 practice questions in a chapter…" |
| Activity | existing `Heatmap` + `/v1/me/activity` | empty calendar |
| Recent activity | `recent` (lesson, practice, test, badge; Today / Yesterday / date in IST) | "…will be listed here" |
| Next badge | `badges.next` progress bar, `earned of total` → `/me#badges` | first badge at 0 |
| Player card, weekly league | `/card`; `/leagues/current` (consent-gated, as before) | blank card; "How to unlock" |

Charts: hand-made inline SVG + CSS with existing tokens, no new dependency. Text alternatives: the difficulty ring's label and caption are the summary sentence and every band is written out; the score chart is a labelled `role="img"` with a summary sentence plus a visually hidden table (test, day, score, marking); each bar has a `<title>` tooltip; the mastery bar is the kit's `MasteryBar` (labelled, legend with counts). Not colour alone: difficulty rows are labelled, self-marked bars are hatched and outlined (and named in the legend), deltas carry an arrow and a sentence. Both themes from the same tokens (axe in light and dark).

Guests on `/me/dashboard`: "Log in to see your dashboard" (returns to the dashboard) and "On this device" (lessons done, answered, correct from `soyl_guest_v1`, Continue link). No API call.

**/learn for members (slimmed, no duplicate dashboard).** Kept: Continue where you left off, your class's subjects with mastery rings (navigation into courses, not metrics), the daily challenge. New: a "dashboard" tile (streak + level that the shell already loads, "Open your dashboard"). Moved to the dashboard: the activity heatmap, player card and weekly league. Reason: `/learn` answers "what do I study next" (it is also the guest landing and the brand link), the dashboard answers "how am I doing"; subjects stay on `/learn` because they are the way into lessons.

**/me → Profile card.** Below board/class (unchanged): **Weekly goal** (current target, "Change goal", same editor as the dashboard) and **School** (`components/platform/me/SchoolSetting.tsx`, loaded with `next/dynamic` so the validator is not in `/me`'s first-load JS):
- Consent `granted`: "Private: only you can see your school. It is never shown to other students."; search as you type (`GET /v1/schools?q=`, 300 ms debounce, aborted when superseded, only once the shared `schoolSearchKeys` says the query is long enough); pick a result (`{ schoolId }`); "Add my school" (name, city, optional state from the 36 states/UTs, optional board), checked in the browser with `validateSchoolName` / `validateCity` / `canonicalState` from `@soyl/shared/profile/school` before `PATCH /v1/me { school: { name, city, state?, board? } }`, API field errors (`body.school.name` …) shown on the field; change; remove (`school: null`).
- Not granted: one line and "Turn on extra features" (`/me/consent?next=/me`); no input, and no school request is ever sent. When the consent flow leaves `granted`, the page drops the school locally too (the server clears it, D-014).

**Other files.** `platform/shared/config/platform-routes.ts` and `platform/e2e/marketing/routes.ts` (`/dashboard`; the single-source test keeps them equal), `components/platform/ui/kit/Icon.tsx` (`home`, `pencil`), `components/platform/learn/links.ts` (`chapterHref`, moved out of `LearnHome` and re-exported), `components/platform/me/MeInsights.tsx` (`id="badges"`), `app/(platform)/me/dashboard/page.tsx`, `app/(platform)/dashboard/page.tsx`.

Uses of `PLATFORM_PREFIXES` checked: `ConsentedAnalytics` (no Vercel analytics on `/dashboard` ✓), `proxy.ts` (matcher literal; `/dashboard` is a body-less redirect, `/me/dashboard` already matched ✓), `chrome.ts` (shell on `/dashboard` while the flag is on ✓), marketing regression inventory (updated ✓), `robots.ts` (disallows `/api/` only; the dashboard is `noindex` like `/me` ✓), `app/sitemap.ts` (marketing pages only ✓), `/learn/sitemap.xml` (catalog only ✓).

## Owner request: a way back to the marketing site (2026-10-28)

"Once I click on learn there should be an option to go back to the marketing website."

- **Where.** From 768 px: a `‹ soylai.com` pill in the top bar right after the SOYL mark. Below 768 px: a slim "‹ Back to soylai.com" row above the top bar (`MainSiteLink`, `components/platform/shell/AppShell.tsx`). The row is not sticky, so it scrolls away and does not cover content. It is hidden on immersive pages (lesson, flashcards, test player), whose own controls own the screen. The phone top bar is full for members (mark, streak, coins, credits, theme, avatar), and the tab bar already has five tabs; there is no avatar menu, and the avatar is a link to /me that several flows rely on. A row is therefore the one place that works for guests and members alike. Accessible name on both: "Back to soylai.com, the SOYL main website" (`aria-label`, which contains the visible text, WCAG 2.5.3).
- **The SOYL mark stays → `/learn`.** It is the academy home and the first thing on every platform page, and the e2e and the owner screenshots already treat it that way. Pointing the mark at `/` and adding a separate "Academy" home would make the mark mean something different in the platform than in the marketing header. A labelled link reads more clearly than a logo whose target depends on context.
- **Behaviour.** A normal `next/link` navigation to `/`, the same as the footer link: the marketing header and footer come back, and `ThemeProvider` removes `data-platform-theme` from `<html>` on unmount (marketing stays light). `revamp.spec.ts` checks this on a phone (the row) and on desktop (the top-bar link), starting from a dark-themed platform page.

## Lead review of the live site (2026-10-28): fixes

| # | Finding | Fix |
|---|---|---|
| 1 | `/tests` listed ~85 subjects, each with "Full series" (from `wave === 1`, a plan, not content) | `TestsHome.tsx`. Subjects with content come from the same source as the class page (`fetchContentSubjects`, the daily-challenge list), and `GET /v1/test-series?subject=` is called for each of those (a handful) to count real tests. A subject is "Ready to take" only if it has at least one test. Badges say only what is true: "Full series" only when the series has a full mock paper, otherwise "N chapter tests" or "N tests". All other subjects sit under a collapsed "More subjects: coming soon" (the class page's `details`, same styles) with no badge. If this cannot be determined (requests fail), every subject is listed without badges, as on the class page. |
| 2 | Subject page repeated "Unit I…" / "Unit II…" at the end for the formative-only chapters 14 and 15 | `unitsOf()` (`learn/CourseSidebar.tsx`) puts chapters with `boardAssessed: false` into one final group, "School assessment only (not in board exam)". The chapters keep their "Not in board exam" tag. The sidebar uses the same function on the subject and chapter pages. A subject whose chapters are all outside the board exam keeps its units. |
| 3 | Course sidebar stopped after "UNIT V" (it scrolls on its own; that was not visible) | The sidebar is sticky (`top: 76px`) with `max-height: 100dvh − 96px`. It now has a visible thin scrollbar (`scrollbar-color`, `scrollbar-gutter: stable`), a fade at the bottom edge (a sticky `::after`), and `overscroll-behavior: contain`. On a chapter page, `SidebarKeepCurrent` scrolls the sidebar (never the page) so the current chapter is in view. |
| 4 | Page widths: `/ask`, `/tests` (and `/plans`, `/me`, …) in a 1120 px box starting at x≈96, while learn pages used 1280 px | One container rule: `.page` is now 1280 px with the top bar's gutter, so every page's content starts at the top bar's left edge. Reading widths stay with the content (chat 50rem, forms 640 px, and so on). An e2e test checks alignment on 9 pages at 1280 px. |
| 5a | `/plans` Free card said "Free" twice | No price → "₹0" (`priceParts`). |
| 5b | "₹499 one-time" rendered as "one - time" | `.price` used tabular figures for the whole line, and Inter's tabular hyphen is wide. The amount keeps `tabular-nums`; the suffix ("/month", " one-time") is a separate proportional span. |
| 5c | Me tab lit on `/plans` | `/plans` removed from the Me tab's sections: no tab is lit there (Plans is not a tab). |

**Formatting pass at 360 and 1280 px, light and dark** (shell, dashboard, /me, /learn, /tests, /plans, subject and chapter pages):
- **Top-bar overflow.** The tab bar showed below 768 px and the top-bar nav only from 900 px, so between 768 and 899 px there was no navigation at all. Now the tab bar shows below 1024 px and the nav from 1024 px. The brand name is hidden at 1024–1279 px (the mark stays) to make room for the nav, the site link and the member chips. For members the brand name shows only from 600 px. The credit chip's "resets in…" text shows only from 1440 px; the count and the full accessible label are always there. Before this, a consented member's bar overflowed at 480 px. An e2e sweep checks the top bar at 360, 420, 480, 600, 768, 900, 1024, 1100, 1280 and 1440 px for a guest and for a consented member with every chip: no element past the edge, one row, exactly one navigation, the site link visible.
- **Long subject names.** On `/learn` they wrapped mid-word (`overflow-wrap: anywhere`). They now break between words and are clamped to two lines; the full name stays in the DOM for screen readers. Dashboard rows break between words too.
- **Headings.** Page `h1`s no longer split words ("Chemical Reac|tions" at 360 px) and use `text-wrap: balance`. The same applies to the dashboard and `/tests` section headings.
- **Sticky bars covering content.** In-page anchors (`/me#school`, `#badges`, `#attempts`, `#weekly-goal`) landed under the sticky top bar; there is now `scroll-margin-top: 72px` on every `[id]` in the platform root. The phone row above the top bar is not sticky. The shell's bottom padding for the tab bar follows the new 1024 px breakpoint. Bottom-docked controls exist only on immersive pages, which have no tab bar.
- **Score chart's hidden table.** It widened the phone layout viewport to 625 px. A `<table>` ignores `width: 1px`, so it now sits inside a visually hidden wrapper that clips it.
- **Spacing.** The dashboard uses one rhythm (16 px between sections, 12 px between tiles); `/tests` groups use the existing stack gap. Nothing else needed changing in the screenshots.

## How to verify

From the repo root: `npm run lint`, then `npm run test:platform-web -- --maxWorkers=2`, then `npm run test:platform-ui -- --maxWorkers=2`, then `npm run build`.
From `platform/`: `npm run typecheck`, then `PW_WEB_PORT=3340 PW_FLAG_OFF_PORT=3341 npm run test:platform-web -w @soyl/e2e`, then `npm run marketing:regression -w @soyl/e2e`, then `npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main`. Run every heavy job through `heavy.sh`.

Manual check:
1. Run `npm run dev -w @soyl/api` and the web dev server.
2. On `/learn`, log in. You land on `/me/dashboard`.
3. Practise a few questions. The dashboard fills in.
4. On `/me` → Profile, set a weekly goal. Approve extra features (18+), then add a school.
5. Use the "‹ soylai.com" link. The marketing site comes back, light.

## Gates (this worktree, 2026-10-28/29, Windows 11, 8 GB; heavy jobs through `heavy.sh`, one at a time)

| Gate | Result |
|---|---|
| `npm run lint` (root) | exit 0 |
| `npm run test:platform-web -- --maxWorkers=2` | 18 files, 317 tests passed |
| `npm run test:platform-ui -- --maxWorkers=2` | 6 files, 606 tests passed |
| `npm run build` (root) | exit 0 |
| `npm run typecheck` (platform/) | exit 0 |
| `PW_WEB_PORT=3340 PW_FLAG_OFF_PORT=3341 npm run test:platform-web -w @soyl/e2e` | flag ON **99 passed**, flag OFF **42 passed**, `[platform-web] PASSED`. JS budget: every page ≤ 200 KB gz. The heaviest are test result 199.1, test player 198.8, lesson 197.7, me 196.1, dashboard 191.8, learn 187.3 and tests 181.6. |
| `npm run marketing:regression -w @soyl/e2e` | 48 passed: "no visual diffs, all routes as expected, Lighthouse within 5 points" (mobile performance 92–95, desktop 100) |
| `npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main` | 48 passed: "HEAD renders the marketing site identically to its merge-base" |
| gitleaks on `origin/platform/main..HEAD` | GITLEAKS |

Earlier runs, for the record:
- The first full e2e run had 7 failures. Two were caused by this work: the new dashboard spec signed in twice on the default client IP and hit the 10-an-hour per-IP email OTP limit (AUTH-5) for later specs. Those sign-ins now use their own IPs. The other five were in `tests.spec`: the local API stopped answering ("could not reach the server") late in that 27-minute run on the loaded 8 GB machine. All five passed in the next two full runs.
- The top-bar sweep found a member overflow at 480 px (now fixed). One run of the guest sweep hit its time limit while loading 10 ISR pages; the sweep now resizes one loaded page.

## Tests added / changed

- Unit, `components/platform/__tests__/dashboard.test.tsx` (29 tests):
  - view-models: deltas, KPI tiles for a new and an active account, IST greeting, prompts from `missing`/`schoolStatus`, goal parsing and ring text, difficulty, scope, links, the trend and its summary, recent rows;
  - charts: difficulty summary as label and caption, the score chart's label, hidden table, hatched self-marked bars, `<title>`s;
  - `DashboardView`: empty account, active account, stats, the class prompt saving, weekly-goal edit and validation;
  - `DashboardClient`: guest prompt with device progress, loading, error and retry;
  - `WeeklyGoalEditor` on the profile;
  - school picker: `checkNewSchool` messages, consent gate (no controls and no request), debounce and minimum length, pick by id, no results → add, browser validation, API field errors on the field, remove, a refused save explained;
  - default landing (`defaultLoginReturnTo`);
  - shell: Home for members, five tabs, Me not lit on the dashboard, the main-site link and row.
- Unit, `components/platform/__tests__/review-fixes.test.ts` (5 tests): `/tests` summary, badges and split; `unitsOf` school-only group; `priceParts`.
- Unit, `m34-components.test.tsx`: the plan price assertions read the price element (amount and suffix are now two spans). Same strings, nothing removed.
- e2e, `dashboard.spec.ts` (6 tests):
  - default landing from `/learn`, `/dashboard` → 307 → `/me/dashboard`, nonce CSP on the page, Home tab lit;
  - guests: prompt with device progress, axe and 360 px in light and dark, login comes back;
  - sign up → class prompt → practise 2 → solved, accuracy, difficulty, goal progress, active days, recent, heatmap and streak are non-zero; goal edit (5–300) persists; axe and 360 px (`innerWidth === 360`) in light and dark; `/learn` slimmed;
  - school with consent: debounced search → no results → add (validation first) → shown on `/me` and on the dashboard → found again → removed;
  - school without consent: locked line, no `/v1/schools` or school PATCH request, API 403;
  - owner screenshots (with 3 solved questions, one chapter test and a school).
- e2e, `review.spec.ts` (16 tests):
  - top bar at 10 widths for a guest and a consented member;
  - one container on 9 pages;
  - `/plans`;
  - `/tests` groups and badges;
  - school-only group (page and sidebar);
  - sidebar keeps the current chapter in view;
  - spot-check of 9 pages at 360 and 1280 px in light and dark, no overflow, with screenshots.
- e2e, `revamp.spec.ts`: two new tests, back to the main site on a phone (row) and on desktop (top bar), checking the marketing chrome is back and the platform theme is off `<html>`. The member screenshot of `/learn` is now named `learn-member`.
- e2e, `flag-off.spec.ts`: `/me/dashboard`, `/dashboard`, `/api/platform/v1/me/dashboard` and `/api/platform/v1/schools` → 404, plus `/dashboard` and `/me/dashboard` showing the marketing 404 with marketing chrome and no platform shell.
- e2e, `auth.spec.ts`: an email sign-up from `/learn` now lands on `/me/dashboard` (the new default landing; it was `/learn`).
- e2e, `bundle.mjs`: `/me/dashboard` is in the JS budget.

## Screenshots

`docs/platform/design/ui-revamp/after/`, as `{desktop,mobile}-{light,dark}-{page}.png`. Desktop shots are full page at 1280 px; mobile shots are the first screen at 360 px.
- New or replaced: `dashboard` (the new page: a member with 3 solved questions, one chapter test and a school; the old `*-dashboard.png` showed the `/learn` member view), `learn-member`, `me` (with the school and weekly goal), and the review pages `learn`, `class`, `subject`, `chapter`, `practice`, `tests`, `leaderboard-guest`, `ask` and `plans`.

## Known gaps / follow-ups

- `/dashboard` is a short link; the page is `/me/dashboard` (see "Route"). Making `/dashboard` canonical needs `proxy.ts` (shared file, ADR), `security.ts` and `security-headers.ts` changes.
- The school's "visible to others after 2 accounts pick it" rule is tested in the API suite only; one e2e account cannot show it.
- `/tests` makes 1 + N requests (the content list, then one `test-series` per subject with content, about 5 for CBSE 10). Fine for now; see API gaps.
- JS budget headroom on the heaviest pages is under 1 KB (test result 199.1, test player 198.8). The shell grew by the Home item and the site link, about 0.2 KB. The next shell addition should be lazy, or the test pages need trimming.
- An unverified school shows no "unverified" tag (only "Verified" when it is). Wording to agree with the owner if wanted.
- The accuracy delta compares two 7-day windows only. There is no longer history in the API (see API gaps), so no multi-week accuracy chart was drawn.

## API gaps (for backend-api; the web works without them)

1. **Which subjects have tests:** add `testCount` (or `hasTests`) and `hasContent` to `CatalogSubject`, or a class-level `GET /v1/test-series?board&class` summary. Today `/tests` and the class page infer "has content" from the daily-challenge list.
2. **Trends:** weekly series (solved, accuracy, active days for the last N IST weeks) would allow sparklines on the KPI tiles; today only this week vs last week and last 7 vs previous 7 days exist.
3. **`testHistory`** does not say whether written answers still await self-marking (already listed in the backend handoff); the dashboard shows "Self-marked" / "Auto-marked" only.
4. **Login landing:** `RETURN_TO_FALLBACK` (`/learn`, backend config) applies when no `returnTo` reaches the API at all; the web always sends one, so this is only for consistency.

## Decisions made

- No ADR: no shared or marketing file, global CSS, root layout or dependency changed. The changed files are `app/(platform)/**`, `components/platform/**` (including the kit icon set and platform-scoped CSS modules), `platform/shared/config/platform-routes.ts`, `platform/e2e/**` and this handoff with its screenshots. One exception, flagged here: `platform/shared/config/platform-routes.ts` is imported by the marketing Header/Footer; the added `/dashboard` prefix changes no marketing route (the regression and diff are green).
- Route `/me/dashboard` with `/dashboard` as a short link (security headers and return-to). Mobile: Home replaces Ranks. The default landing applies only to logins opened on `/learn` without `returnTo`. `/learn` keeps "where to learn next"; the dashboard holds the metrics. The SOYL mark stays the academy home, next to a labelled "‹ soylai.com" link. The tab bar shows below 1024 px. All platform pages use one 1280 px container.

## Needs from owner

None blocking. Please review the screenshots, the "‹ soylai.com" placement (a top-bar pill on desktop, a slim row above the bar on phones), and the default goal of 20 questions a week (config: `DASHBOARD.weeklyGoal`).
