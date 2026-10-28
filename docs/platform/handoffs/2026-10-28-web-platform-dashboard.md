# web-platform + design-system — student dashboard, school and weekly goal on the profile — 2026-10-28

Status: GATES_PENDING
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

GATES_TABLE
