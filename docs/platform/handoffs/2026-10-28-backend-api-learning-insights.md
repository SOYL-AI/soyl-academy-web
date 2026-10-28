# backend-api — learning insights (heatmap, mastery, practice status, player card) — 2026-10-28

Status: done
Branch: `platform/backend-api/learning-insights` (contract-first commit `3314bb8`, consumed by web-platform `platform/web-platform/ui-revamp`)

## What changed

Read-only API for the redesigned learning UI. Everything is computed on read from existing tables
(`practice_answers`, `lesson_progress`, `attempts`, `responses`, `evaluations`, `streaks`, `coin_ledger`, content views):
**no migration, no new table, no new stored field** (PII.md unchanged).

| Route | Policy | Response (`components.schemas`) |
|---|---|---|
| `GET /v1/me/activity?days=N` (1–371, default 365) | members, `insights.read.user` 60/min, no-store | `MyActivity`: `{ timezone: 'Asia/Kolkata', from, to, days, calendar: ActivityDay[] (active days only, oldest first: date, answered, solved, lessonsCompleted, testsSubmitted, total), totals {answered, solved, lessonsCompleted, testsSubmitted, activeDays}, streak: Streak, activeDaysAllTime }` |
| `GET /v1/me/mastery?subjectId=` | members, `insights.read.user` | `MyMastery`: `{ subjects: SubjectMastery[] }`; `SubjectMastery = { subjectId, name, classLevel, score 0–100, chapterCount, levels {not_started, attempted, familiar, proficient, mastered}, chapters: ChapterMastery[] }`; `ChapterMastery = { chapterId, number, title, level, score, components {lesson, coverage, accuracy, test: 0–1 or null}, firstTryAccuracy, nextLevel, hints[], evidence: ChapterEvidence }`. Without `subjectId`: every subject the student has activity in; with it: that subject (404 if unknown) |
| `GET /v1/me/card` | members, `insights.read.user` | `MyPlayerCard`: `{ publicName (D-039), level, xp, coins, overall 40–99, tier bronze/silver/gold/elite, provisional, formulaVersion, attributes: CardAttribute[] (key ACC/CON/SPD/BRE/MAS/TST, label, value 40–99, raw 0–1, weight, explain), asOfDay }` |
| `GET /v1/chapters/:id/practice` (changed) | unchanged (public read; guests cacheable) | items gain `difficulty` (`easy`/`medium`/`hard`) and `status` (`new`/`attempted`/`solved`, null for guests); page gains `summary: { total, byDifficulty {easy, medium, hard: {total, solved (null for guests)}}, byStatus {new, attempted, solved} or null }` (whole chapter, filters ignored). New filters: `difficulty=easy,hard,3` (bands and/or 1–5), `status=new,attempted` (guests: everything is `new`) |

Definitions (one place, so the list, mastery and heatmap agree):
- **solved** = a practice answer auto-checked right, or self-marked full marks (`grading='self'` and `marks_awarded >= max_marks`) — `solvedAnswer()` in `api/src/domain/practice.ts`.
- **first try** = the first auto-checked answer (`correct IS NOT NULL`) per question, by `answered_at`. Guest merge keeps one (the latest guest) answer per question, so that is the guest's first try.
- **active day** = an IST day with a practice answer, a lesson part finished or a test submitted (same as the streak). Slides viewed are not stored per day, so the heatmap counts lesson *parts* finished.
- **chapter test %** = latest graded attempt of a published `kind='chapter'` test containing the chapter: `score / max_score` (auto + self marks).

Files:
- `platform/shared/config/learning.ts` — config (CLAUDE.md rule 4): `DIFFICULTY_BAND_LEVELS` (1–2 easy, 3 medium, 4–5 hard), `MASTERY` (weights, confidence, per-level gates), `PLAYER_CARD` (floor 40, ceiling 99, attribute weights/targets, tiers elite ≥ 87, gold ≥ 75, silver ≥ 60, provisional rule), `ACTIVITY`.
- `platform/shared/learning/mastery.ts` — pure `chapterMastery(evidence)`, `subjectMastery(chapters)`, `difficultyBand`, `EMPTY_EVIDENCE`. **The web reuses it for guests** (feed it device progress; it imports only the config file).
- `platform/shared/learning/card.ts` — pure `playerCard(evidence)`: deterministic, every attribute has an `explain` line, no randomness/packs/purchases.
- `platform/api/src/modules/insights.ts`, `insights-schemas.ts`; `platform/api/src/domain/insights/{activity,mastery,card}.ts`.
- `platform/api/src/domain/practice.ts`, `modules/practice.ts` — status/difficulty/summary/filters.
- `platform/shared/config/security.ts` — `insights.read.user` bucket.
- `platform/api/openapi.json`, `platform/shared/api-client/{schema.gen.ts,index.ts}` (type aliases `MyActivity`, `ActivityDay`, `MyMastery`, `SubjectMastery`, `ChapterMastery`, `ChapterEvidence`, `MasteryLevel`, `DifficultyBand`, `PracticeStatus`, `PracticeSummary`, `MyPlayerCard`, `CardAttribute`), route-policy snapshot, `docs/platform/api-reference.md`.

Formulas in short (numbers in config):
- Mastery score = weighted mean of the components a chapter has (lesson 0.15, coverage 0.25, first-try accuracy 0.30 shrunk until 10 checked answers, chapter test 0.30); a component the chapter cannot have (no lesson / no practice pool / no chapter test published) is left out. Levels: not_started (no evidence) → attempted → familiar (score ≥ 30) → proficient (≥ 60, first-try ≥ 70 %, ≥ 10 attempted) → mastered (≥ 85, first-try ≥ 80 %, coverage ≥ 60 %, ≥ 15 attempted, chapter test ≥ 80 % when one exists). `hints` say what is missing for the next level. Subject score = mean over **all** chapters of the subject (untouched = 0).
- Card attributes (value = 40 + 59 × raw): ACC first-try accuracy × confidence (full at 30), CON active days in last 28 (full at 16; the streak is deliberately not used, F-016), SPD expected ÷ spent time on test questions answered fully right (omitted under 10 items; rushing past 1.25× not rewarded), BRE chapters touched (full at 20), MAS mean mastery over max(touched, 5), TST mean latest-attempt % × confidence (full at 3 tests). Overall = weighted mean of present attributes.

## How to verify

From `platform/`:
```
npm run typecheck                                   # exit 0
npm test -w @soyl/shared                            # 11 files, 126 tests (27 new in learning/)
cd api && npx vitest run test/insights.test.ts      # 9 tests: auth, validation, IST midnight, practice status, mastery, card, guest merge
cd api && npx vitest run test/content.test.ts       # DB-6 scan green
cd api && npx vitest run test/route-policy.test.ts test/unit.test.ts   # snapshot + openapi staleness
bash C:/Users/Prabhu/soyl-wt/_tools/heavy.sh api npx vitest run --maxWorkers=2   # from platform/api: full suite
```
Manual: `npm run dev -w @soyl/api`, sign in a fixture user, `GET /v1/me/activity`, `/v1/me/mastery?subjectId=cbse-10-mathematics`, `/v1/me/card`, `/v1/chapters/cbse-10-mathematics-ch01/practice?status=new&difficulty=easy`.

## Tests added
- `platform/shared/learning/mastery.test.ts` (14): no data, attempted, shrinkage of lucky answers, level ladder, test gate with/without a published test, accuracy gate hints, lesson-only chapters, small pools, guest-merged evidence, clamping bad input, determinism, config ordering, subject aggregate, difficulty bands.
- `platform/shared/learning/card.test.ts` (13): new student (floor, bronze, provisional, no SPD), elite student, determinism, weighted overall with SPD redistribution, ACC volume, SPD bounds, MAS min chapters, TST confidence, CON cap, bad input, tiers, ratingFor, weights sum.
- `platform/api/test/insights.test.ts` (9, embedded Postgres, real CBSE 10 Maths ch01 content): guests 401 + guest practice page shape; query validation (400/404); new member (exact empty shapes, public name, floor card); activity across 23:59/00:01 IST with first-solved-day semantics, window start at 00:00 IST, API-7 isolation; `insights.read.user` 429; practice status/summary/filters + DB-6 key scan on answered member pages; full chapter → `mastered` with levels equal to the shared formula, test %, card (no real name, coins = `/v1/coins`, deterministic), mastery latency < 3 s; guest-merged answers on the guest's IST days; IST window helpers incl. leap day.

## Known gaps / follow-ups
- Heatmap counts lesson **parts** finished, not slides (slide views are not stored per day; storing them would need a new table — not worth it for now).
- Practice items answered in another academic year's chapter rows are not mapped across years (no year rollover yet).
- `GET /v1/me/mastery` without `subjectId` lists only subjects with activity; the UI should call it with `subjectId` for a subject page (all chapters, including untouched).
- SPD needs `responses.time_spent_sec` from the test player; without timing data the attribute is omitted (by design).
- `docs/platform/api-reference.md` totals table predates coins/consent merges (noted in the doc); a full refresh from the snapshot is due.
- Not deployed (Lead deploys). No load test was run for the new routes; every query is per-user on `user_id`-leading indexes, and the mastery test on a fully practised chapter (75 questions + test) answered well under the 3 s sanity bound.

## Decisions made
- No ADR: no shared/marketing file, no new dependency, no new infrastructure, no deviation from ARCHITECTURE (new read endpoints under the existing `/v1/me/*` member pattern).
- Self-marked full marks count as solved (otherwise written questions could never be solved and the "Solved n/N" header could never complete).
- Guests get 401 on the insights routes; the web computes guest mastery with the exported pure function.
- The card is private (member-only, no consent feature needed: nothing is shown to others) and shows only the D-039 public name.

## Needs from owner
None. Thresholds and weights are owner-tunable in `platform/shared/config/learning.ts` (bump `PLAYER_CARD.formulaVersion` when the card formula changes).
