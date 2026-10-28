# backend-api (+ db-schema) — student dashboard API and school capture — 2026-10-28

Status: done
Branch: `platform/backend-api/dashboard-school` (from `platform/main` 24c9664). Contract-first commit `f544d8c` (web can merge it alone); implementation and migration in the later commits.

## What changed

| Route | Policy | Response (`components.schemas`) |
|---|---|---|
| `GET /v1/me/dashboard` | members, `dashboard.read.user` 30/min, no-store | `MyDashboard` (every field below) |
| `GET /v1/schools?q=&city=` | members, consent `profile_school_city` (403 `consent_required` / 503 `consent_unavailable`), `schools.search.user` 60/min | `SchoolSearch`: `{ schools: School[] }` (≤ 20) |
| `GET /v1/me` (changed) | unchanged | `Me` gains `school: School \| null` (null unless consent is `granted`) and `weeklyGoal: { target, isDefault }` |
| `PATCH /v1/me` (changed) | unchanged (`me.write.user`) | body gains `school` (`{ schoolId }` \| `{ name, city, state?, board? }` \| `null`) and `weeklyGoal` (int 5–300 \| null) |

`School = { id, name, city, state (one of 36 states/UTs or null), board ('cbse'|'cisce'|null), verified }`.

Migration **0013_school_capture** (+ hand-written down): `schools.name_normalized` (NOT NULL, backfilled), `city_normalized` (NOT NULL, default ''), `source` (`student`|`udise`|`cbse`, check), `verified_at`, `created_by_user_id` (FK users, ON DELETE SET NULL); partial UNIQUE (name_normalized, city_normalized) WHERE source = 'student'; `text_pattern_ops` indexes for prefix search (name; city + name); index on created_by_user_id; `profiles.weekly_goal` smallint (check 1–1000). No new table (schema.test count unchanged at 73).

Files:
- Contract: `platform/api/src/modules/dashboard-schemas.ts`, `schools-schemas.ts`, `me.ts` (Me/PatchMe), `platform/api/openapi.json`, `platform/shared/api-client/{schema.gen.ts,index.ts}` (aliases `MyDashboard`, `DashboardProfile`, `DashboardTotals`, `DashboardScope`, `DashboardMastery`, `AccuracyWindow`, `DayRange`, `SolvedByDifficulty`, `TestHistoryItem`, `FocusChapter`, `ChapterLink`, `RecentEvent`, `NextBadge`, `WeeklyGoal`, `School`, `SchoolSearch`, `SchoolStatus`, `SchoolPick`, `SchoolCreate`), route-policy snapshot.
- Config: `platform/shared/config/learning.ts` (`DASHBOARD`, `WEEKLY_GOAL_METRICS`), `platform/shared/config/schools.ts` (`SCHOOLS` limits, `SCHOOL_SOURCES`, name/city alias maps, `INDIAN_STATES`), `platform/shared/config/security.ts` (2 buckets).
- Pure functions (+ tests): `platform/shared/learning/dashboard.ts` (IST weeks/windows, accuracy, test %, day runs, focus picking, next badge, weekly goal, event ordering), `platform/shared/profile/school.ts` (cleaning, validation, dedupe keys, state names, search keys). The web can reuse both (they import config only).
- API: `platform/api/src/modules/{dashboard,schools}.ts`, `src/domain/insights/dashboard.ts`, `src/domain/schools.ts`; `me.ts` (school/goal), `domain/account-deletion.ts` (clear goal, delete/unlink schools), `consent/builtin.ts` (withdrawal clears school + city), `domain/gamification.ts` and `domain/insights/mastery.ts` (helpers exported for reuse, no behaviour change), `app.ts` (route registration).
- DB: `platform/db/schema/identity.ts`, `platform/db/migrations/0013_school_capture{,.down}.sql`, `meta/0013_snapshot.json`, `_journal.json`.
- Docs: `platform/db/PII.md`, `docs/platform/data-model.md`, `docs/platform/api-reference.md`.

## The dashboard contract, field by field

All days are IST calendar days (Asia/Kolkata), weeks Monday–Sunday; everything is computed on read from the caller's rows (no new stored metric). "Solved" is D-042 (auto-checked right or self-marked full marks), counted on the IST day it was first solved; "active day" = a practice answer, a lesson part finished or a test submitted (same as `/v1/me/activity`).

| Field | How it is computed |
|---|---|
| `timezone` | Always `Asia/Kolkata`. |
| `today` | IST day of the request. |
| `thisWeek`, `lastWeek` | `{ from, to }` Monday–Sunday of today's IST week and the one before. |
| `profile.board`, `profile.classLevel` | From `profiles` (null when not set). |
| `profile.school` | The saved school, only when consent is `granted`; else null (never leaked). |
| `profile.schoolStatus` | `consent_required` (consent not granted), `set`, or `not_set`. |
| `profile.missing` | `board`, `classLevel` when null; `school` only when consent is granted and none is saved. The UI prompts from this. |
| `totals.solved.{allTime,thisWeek,lastWeek}` | Distinct practice questions by the timestamp of their first solving answer. |
| `totals.answered.{…}` | Practice answers saved (every attempt). |
| `totals.accuracy.recent` / `.previous` | Last 7 IST days (today included) and the 7 before: `checked` = auto-checked practice answers (`correct IS NOT NULL`, every attempt), `right` = of those right, `accuracy` = right ÷ checked (3 dp) or null. (Named `right`, not `correct`: the DB-6 leak scan reserves `correct`.) |
| `totals.lessonsCompleted.{…}` | Lesson deck parts with `completed_at` (first completion) in the period. |
| `totals.tests.submitted.{…}` | Attempts with `submitted_at` (incl. auto-submitted). |
| `totals.tests.distinctTests` | Different tests with a submitted attempt. |
| `totals.tests.averagePct`, `bestPct` | Mean and max of score ÷ max_score over every graded attempt with marks (retakes, custom and live included; 1 dp); null before any. |
| `totals.activeDays.{thisWeek,lastWeek,allTime}` | Active IST days in the period. |
| `scope` | Which chapters the next two blocks cover. `class`: subjects of the student's board + class that have published practice or lessons, plus any subject of that class the student has activity in (a class lists ~85 subjects incl. every language; most have no content). `activity`: board/class not set → subjects with activity (same rule as `/v1/me/mastery`). `none`: neither. `subjectCount`, `chapterCount` of the scope. |
| `solvedByDifficulty.{all,easy,medium,hard}` | `{ solved, total }` over the published practice pools of the scope's chapters (same pool, status and band rules as the practice list: 1–2 easy, 3 medium, 4–5 hard). |
| `mastery` | `subjectMastery` over every scope chapter with the shared `chapterMastery` formula: `score` (mean, untouched = 0), `chapterCount`, `levels` (not_started … mastered). Equal to `/v1/me/mastery` levels when the scope is one subject (tested). |
| `testHistory[]` (≤ 20) | Newest submitted attempts: `attemptId`, `testId` (key), `title`, `kind`, `subjectId`, `subjectName`, `submittedAt`, `day` (IST), `autoSubmitted`, `score`, `maxScore`, `percentage` (1 dp or null), `autoScore`, `selfScore`, `marking` (`self` if any self-evaluation exists or self marks > 0, else `auto`), `liveEventId`. The full paged list stays `GET /v1/me/attempts`. |
| `focus.weakest[]`, `focus.strongest[]` (≤ 3 each) | Over chapters "really attempted" (≥ 3 distinct practice questions answered, or a graded chapter test; any subject this year). Strongest = level proficient/mastered, highest score first; weakest = every other level, lowest score first; ties by first-try accuracy then chapter id; never on both lists. Each: `chapterId`, `number`, `title`, `subjectId`, `subjectName`, `level`, `score`, `firstTryAccuracy`, `practiceAttempted`, `practiceTotal`, `chapterTestPct`, `link { board, classLevel, subjectId, subjectSlug, chapterId, chapterSlug }` → `/learn/{board}/{classLevel}/{subjectSlug}/{chapterSlug}`. |
| `recent[]` (≤ 10) | Newest first, ties by kind then id. `lesson` (a deck part completed: chapter ref + `part`), `practice` (one chapter on one IST day: `answered`, distinct `solved`, `at` = last answer), `test` (submitted attempt: `attemptId`, `testId`, `title`, `testKind`, `percentage`), `badge` (`badgeKey`, `name`, `icon`). Every event has `id`, `at` (ISO), `day` (IST); chapter refs carry the same `link`. |
| `badges.earned`, `badges.total` | Badges awarded / configured (`BADGES`). |
| `badges.next` | Unearned badge with the highest current ÷ target (ties: config order); `current`, `target`, `progress` (0–1). Same quantities as `evaluateBadges`, except streak badges use the current streak and the test-day badge uses the current run of test days (honest "progress", since a broken run is not progress). Null when all are earned. |
| `weeklyGoal` | `metric: 'questions_solved'`; `target` = `profiles.weekly_goal` (clamped 5–300) or the default 20 (`isDefault`); `progress` = `totals.solved.thisWeek`; `remaining`, `met`, `weekStart`, `weekEnd`, `daysLeft` (today included). |

Not duplicated (the web calls these too): level, XP and coins → `GET /v1/me/card`; streak and the heatmap → `GET /v1/me/activity`; per-subject chapter lists → `GET /v1/me/mastery`; badge catalogue → `GET /v1/me/badges`.

## School capture

- **Gate (D-014):** consent feature `profile_school_city` (already in `CONSENT.gatedFeatures`). Search: route policy. Save: `assertAllowed` before anything is validated or created → 403 `consent_required` (503 `consent_unavailable`). Clearing (`school: null`) is always allowed. Reads (`/v1/me`, dashboard) show the school only while the status is `granted`. Built-in provider: leaving `granted` clears `school_id` and `city` in the AI-data deletion transaction (audit `after.schoolCleared`). Account deletion: profile school/city/goal nulled; unverified student schools no other profile uses are deleted; others are unlinked (`created_by_user_id` NULL).
- **Find-or-create:** name and city validated (`shared/profile/school.ts`): NFKC, spaces collapsed, 3–120 chars and ≥ 3 letters; letters (any script), digits and `. , ' & ( ) / -` only; no emails, links, domains, social-handle words, digit runs > 4 or > 6 digits in total; whole-word blocked words (DISPLAY_NAME list; long ones also with spaces removed). City: letters, spaces, `. ' -`, 2–60. State must be one of the 36 states/UTs. Keys: lower case, `&` → and, apostrophes dropped, punctuation → space, abbreviations expanded (Sr → senior, Sec → secondary, Govt → government, St → saint, …), old city names mapped (Bombay → mumbai, Bangalore → bengaluru, …). An existing row with the same keys is reused (verified/official first); otherwise an unverified `source='student'` row is inserted (`ON CONFLICT DO NOTHING` on the partial unique index, re-read on a race). At most 3 schools added per account per rolling 24 h (429).
- **Search:** keys of the query; the last word is tried as typed and expanded ("st" → "st…" and "saint…"); matches a name that starts with the key or has a word starting with it; optional city key; starts-with first, verified first, then name; ≤ 20. **Child safety:** an unverified student-added school appears to other students only once 2 accounts picked it (config `SCHOOLS.search.unverifiedMinStudents`); its creator always sees it; dedupe does not depend on search.

## How to verify

From `platform/` (heavy runs through `bash C:/Users/Prabhu/soyl-wt/_tools/heavy.sh`):
```
npm run typecheck                                    # exit 0
npm test -w @soyl/shared                             # 13 files, 164 tests (38 new)
npm test -w @soyl/db                                 # RESULT_DB (migration 0013 up/down on fresh + seeded DB)
cd api && npx vitest run test/dashboard.test.ts test/schools.test.ts test/me.test.ts test/consent-builtin.test.ts test/insights.test.ts test/content.test.ts test/route-policy.test.ts test/unit.test.ts
npm run build                                        # exit 0
npm test -w @soyl/api                                # RESULT_API
```
Manual: `npm run dev -w @soyl/api`, sign in a fixture user, `GET /v1/me/dashboard`; set consent granted, `PATCH /v1/me {"school":{"name":"St. Mary's Sr. Sec. School","city":"Bombay"}}`, then `GET /v1/schools?q=saint%20mary&city=mumbai`.

## Tests added

- `platform/shared/learning/dashboard.test.ts` (16): IST weeks across month/year/leap day, windows, accuracy, test %, day runs, level counts, focus (really attempted, ordering, ties, no overlap, determinism), next badge (new student, highest progress, caps, all earned), weekly goal (default, clamping, progress, days left), event ordering.
- `platform/shared/profile/school.test.ts` (22): dedupe keys (case, punctuation, abbreviations, Devanagari, city aliases), 15 rejected names (email, link, domain, phones, handle, blocked words, length, letters, control chars, symbols, emoji), real names accepted (incl. "Shitala Devi", "Essex"), cities, states, search keys (no LIKE wildcards).
- `platform/api/test/dashboard.test.ts` (3, embedded Postgres, real CBSE 10 Maths ch01): guests 401 + `dashboard.read.user` 429; empty new account (exact full response) then class scope after setting board/class; fixture student with practice on Tue, Sun 23:58/23:59 and Mon 00:01 IST, a lesson part and a self-marked chapter test → exact totals (solved 3/2/1, answered 5/2/3, accuracy 3/4 vs 0/1, lessons, tests, active days 2/2/4), difficulty bands, mastery equal to `/v1/me/mastery`, test history row, focus placement + link, recent events grouped by IST day, badges vs `/v1/me/badges`, weekly goal 2/5; DB-6 key scan and solution-text scan; API-7 isolation.
- `platform/api/test/schools.test.ts` (17): consent gate (401/403, no leak in `/v1/me` or the dashboard), dedupe across spellings and old city names, official school preferred, clear, unknown id, 7 validation rejects with field paths, strict body, per-day cap, search (prefix, word prefix, city, order, max 20), query validation + rate limit, child-safety visibility rule, account deletion (delete orphan / unlink shared).
- Changed: `platform/api/test/me.test.ts` — the D-039 test "school is never collected" is replaced by the D-014 rule this task introduces (raw `schoolId`/`city` still 400; `school` 403 without consent, nothing stored or created; 200 with consent; hidden again when consent is revoked) plus a weekly-goal test; `platform/api/test/consent-builtin.test.ts` — withdrawal clears the school (+1 test).

## Known gaps / follow-ups

- **Decision record:** D-039(a) says sign-up keeps "no school/city" and the old test said the school is never collected. This task makes the school an optional profile field for consent-granted accounts only (D-014 as written). Sign-up is unchanged. The Lead should add a DECISIONS entry (I did not edit DECISIONS.md).
- **Search engine:** prefix / word-prefix with `text_pattern_ops` btree indexes, no `pg_trgm` (on Azure it must be allow-listed in the server parameters, an infra change). Fine for student-added rows; before importing UDISE+ (~1.5 M schools), add `pg_trgm` (infra-azure) and a GIN trigram index.
- No staff tool yet to verify/merge/rename schools (`verified_at` is set by nothing today); the moderation queue should get one before school leaderboards.
- The dashboard does not repeat level/XP/coins/streak (see "Not duplicated"); the web makes 2–3 calls.
- `testHistory.marking` says whether self marks are included; it does not say whether some written answers are still waiting for self-evaluation (that needs the full grading pass; the result page has it).
- `averagePct` counts every graded attempt (retakes included); the player card's TST uses the latest attempt per test. Different questions, both documented.
- Not deployed (Lead deploys; 0013 is pending in production with 0011/0012).

## Decisions made

- No ADR: no shared/marketing file, no new dependency or infrastructure; new member routes under existing patterns. Schema change via migration 0013 (reversible).
- Most protective defaults (owner may change in config): school/city cleared on consent withdrawal (not just hidden); unverified student-added names hidden from others until 2 accounts pick them; ≤ 3 schools added per account per day; student-added schools that only the deleted account used are deleted with it; `profiles.city` is only ever the school's city.
- Weekly goal = practice questions first solved in the IST week (default 20, 5–300), stored on the profile, set through `PATCH /v1/me`.

## Needs from owner

None blocking. Tunable in config: default weekly goal (`DASHBOARD.weeklyGoal`), focus thresholds, the search visibility threshold and the daily add cap (`SCHOOLS`).
