# backend-api — M3 tests and test series (catalogue, attempts, autosave, grading, results, custom tests, live mocks, load) — 2026-10-27

Status: **done**, green (stand-in) per D-010. Everything ran against real PostgreSQL (embedded, from `@soyl/db`) with the in-memory KV, and again on the Redis store over ioredis-mock. Content tests use the real authored releases. Nothing was deployed (D-025).

Branch: `platform/backend-api/m3` (worktree `C:/Users/Prabhu/soyl-wt/backend-api-m3`). `origin/platform/main` is merged up to 51590dd (D-030 vercel.json, D-031). CBSE 10 Maths ch10–14 were not on `origin/platform/main` at the final merge (it has ch01–05 and ch07–09), so they are not part of this run.

## What changed

| Path | What |
|---|---|
| `platform/db/schema/assessment.ts`, `migrations/0007_test_engine*`, `test/test-engine.test.ts`, `PII.md`, `README.md` | `responses.client_seq`; attempt score split (`auto_score`, `self_score`, `time_taken_sec`, `counts_for_stats`, `graded_at`); `test_score_buckets`. Reversible, with tests. |
| `platform/shared/config/tests.ts` (new) | `TEST_ENGINE` (grace 120/60 s, autosave cadence/limits, percentile threshold 50, custom-builder bounds, live settings), `LIVE_MOCK_SITTINGS` (13 Dec 2026 and 17 Jan 2027, 10:00–13:00 IST), `LIVE_MOCK_CLASSES`. |
| `platform/shared/config/gamification.ts`, `security.ts` | Test XP (`testSubmitted` 20, `customTestSubmitted` 5, `liveTestSubmitted` 40, `testPerfectBonus` 20, `TEST_XP_RULES`); badges `first-test`, `tests-10`, `perfect-score`, `test-streak-3`. Rate-limit buckets: `attempt.read.user`, `attempt.evaluate.user`, `tests.custom.user`, `live.register.user`; `attempt.autosave` changed from 3 to 8 per 15 s. |
| `platform/api/src/domain/tests/*` (new) | The test engine: `load` (cached immutable test structures and keys), `delivery` (student-safe paper, per-attempt shuffle), `attempts` (create/resume/start, state, autosave), `score` and `finalize` (grading, best-of, auto-submit), `results` (result, percentile, self-evaluation), `catalogue`, `custom`, `live`, `live-finalize`, `live-admin`. |
| `platform/api/src/modules/tests.ts`, `tests-schemas.ts` (new) | Routes with policies, strict request schemas and response schemas. |
| `platform/api/src/kv/*` | Sorted-set operations (`zAdd`, `zRem`, `zScore`, `zCard`, `zCountAbove`, `zRevRange`) in the memory and Redis stores, with contract tests. |
| `platform/api/src/domain/gamification.ts`, `practice.ts`, `progress.ts` | Test badges. Badge rows are synced before transactions, so a transaction never waits for a second pooled connection (see "Load test"). |
| `platform/api/src/modules/me.ts` | `DELETE /v1/me` removes the user's KV live ranks (PII.md). |
| `platform/api/src/errors.ts` | Problem codes `attempt_closed` (409), `live_not_open` (409), `test_unavailable` (409), `bank_too_small` (422), `not_implemented` (501). |
| `platform/api/src/config.ts`, `index.ts` | `DATABASE_POOL_MAX` (default 10). |
| `platform/api/scripts/live.ts` (new), `dev-content.ts`, `package.json` | `npm run live -w @soyl/api -- schedule\|list`. Dev start-up also assembles the series and schedules the live mocks. `@soyl/content-pipeline` is now a runtime dependency (the custom builder uses its engine). The package exports `./engine/*` for the worker. |
| `platform/worker/src/jobs.ts`, `test/engine-jobs.test.ts` | Jobs `attempts.auto-submit` (every minute) and `live.finalize` (every 5 min). The worker depends on `@soyl/api` (engine only). |
| `platform/load/**` (new) | `@soyl/load`: undici harness `src/attempts.mjs`, k6 script `k6/attempts.js`, `README.md`, and the recorded results in `results/`. |
| `platform/api/openapi.json`, `test/__snapshots__/route-policy.test.ts.snap` | Regenerated and reviewed (14 new routes). |
| `docs/platform/adr/012-test-engine.md` | ADR-012: lifecycle, autosave protocol, F-007 grace, auto-submit, grading and best-of, percentiles, delivery/shuffle/embargo, live mocks and ranks, custom builder, access. |

## Endpoints (browser path = `/api/platform` + path; JSON; errors RFC 7807)

| Method | Path | Who | Notes |
|---|---|---|---|
| GET | `/v1/test-series?board&class&subject` | anyone | `subject` = key (`cbse-10-science`) or slug (`science`, with board+class). Returns `series[]` grouped by kind (`chapter`, `unit`, `term`, `full` per paper variant, `second_exam`) plus `liveEvents[]`. Members also get `me` per test (`attempts`, `bestScore`, `lastScore`, `maxScore`, `activeAttemptId`, `lastAttemptId`). Guests: public cache + ETag. Members: `no-store`. |
| GET | `/v1/tests/:id` | anyone (custom: creator only) | Metadata only: sections (`questionCount`, `maxMarks`, `choiceGroups {id, attempt, of}`), duration, marks, `autoGradedCount`, general `instructions[]`, `live` event, `me`. Never questions. |
| POST | `/v1/tests/custom` | member | `{subjectId, chapterIds[1..20], types?, difficulty?{min,max}, questionCount 5..60, durationMin?, title?}` → 201 TestMeta + `skippedChapters`. Practice pool only. `bank_too_small` (422) when the choices cannot be filled. Limit 20/h. |
| POST | `/v1/tests/:id/attempts` | member | Body optional `{start?: boolean}` (default true). Returns 201 (created) or 200 (resumed) `AttemptState`. Live: `live_not_open` before the start or after the late-start window; `attempt_closed` once you have taken it; `test_unavailable` while items are embargoed. |
| GET | `/v1/attempts/:id` | owner | `AttemptState` (paper, saved responses, `serverNow`, `deadlineAt`, `remainingSec`, `graceSeconds`). Auto-submits lazily after deadline + grace. |
| PUT | `/v1/attempts/:id/responses` | owner | Autosave batch (≤ 256 KB, ≤ 200 items) → `{applied, stale, rejected, serverNow, deadlineAt, status}`. 409 `attempt_closed`. 429 when over 8 per 15 s for the attempt. |
| POST | `/v1/attempts/:id/submit` | owner | Idempotent. Optional final batch in the body. → `{status submitted\|auto_submitted, alreadySubmitted, score, autoScore, maxScore, pendingSelfEvaluation, xpAwarded, badgesAwarded, streak}`. |
| GET | `/v1/attempts/:id/result` | owner | After submission only (409 `conflict` before). Includes score (total/auto/self/percentage/pending), sections, topics (mastery), byDifficulty, time, percentile `{value\|null, attempts, minAttempts: 50}`, `live` rank, and per item: status, marks, counted (best-of), response, question, `key` (answer, solution, marking scheme, rubric) and `parts[]`. |
| POST | `/v1/attempts/:id/self-evaluation` | owner | `{items:[{itemId, marks \| steps[] \| parts[{id, marks}]}]}`, each within its maximum → the updated result. The auto score (ranks, percentile) never changes. |
| POST | `/v1/attempts/:id/ai-evaluation` | owner, consent `ai` | **501 `not_implemented`** until M4. Policy and route are in place. |
| GET | `/v1/me/attempts?cursor&limit` | member | Your attempts, newest first. |
| GET | `/v1/live-events?board&class&subject` | anyone | Events with `phase` (`upcoming`, `registration_open`, `live`, `writing`, `closed`, `results_published`, `cancelled`), window times, `lateStartUntil`, `ranksBeta`. Members also get `me {registered, attemptId, attemptStatus}`. |
| POST | `/v1/live-events/:id/register` | member | Idempotent; open from registration until the late-start cutoff. Starting the test also registers you. |
| GET | `/v1/live-events/:id/leaderboard?limit` | member, **consent `leaderboards`** | `status` = `not_started`, `provisional` (KV) or `final` (Postgres). `entries [{rank, name, score, isMe}]`: `name` is first name + last initial, or null when that student's consent is not granted. `me {rank, score, percentile}`. |

## Schema changes (migration 0007, reversible)

- `responses.client_seq bigint NOT NULL DEFAULT 0 CHECK ≥ 0`.
- `attempts`: `auto_score`, `self_score` (numeric 6,1), `time_taken_sec`, `counts_for_stats boolean`, `graded_at`; index `attempts_user_test_idx (user_id, test_id)`.
- `test_score_buckets (test_id → tests CASCADE, bucket int ≥ 0, attempts int ≥ 0, UNIQUE(test_id, bucket))`.
- 64 → 65 tables. PII.md is updated, including the KV `lb:live:<event>` sorted sets.

## What web-platform M3 needs (test player contract)

1. **Regenerate the client** from `platform/api/openapi.json`. Schemas: `TestSeries`, `TestMeta`, `CustomTestRequest`/`CustomTest`, `StartAttemptRequest`, `AttemptState`, `SaveResponsesRequest`/`SaveResponsesResult`, `SubmitResult`, `AttemptResult`, `SelfEvaluationRequest`, `LiveEvent(s)`, `LiveLeaderboard`, `MyAttempts`. Shared numbers are in `platform/shared/config/tests.ts`; it has no imports, so the web can use it.
2. **Start/resume.** On the test page, read `GET /v1/tests/:id` (`me.activeAttemptId` means "Resume"). "Start" calls `POST /v1/tests/:id/attempts`. Optionally call it first with `{start:false}` for an instructions screen or live waiting room (no clock, no questions), then call it again to start. On a reload use `GET /v1/attempts/:id`.
3. **Timer sync.** Keep `offset = Date.parse(serverNow) - Date.now()` from every attempt or autosave response. Show `deadlineAt - (Date.now() + offset)`. The client timer is display only (AC-12). At zero, flush the queue and call submit. If the tab was asleep, the server has already auto-submitted (the next call returns `attempt_closed` or the state shows `auto_submitted`), so go to the result.
4. **Autosave queue.**
   - **Item state.** Keep one pending state per item: `{itemId, seq, response, markedForReview, timeSpentSec, changedAt}`.
   - **`seq`.** Use `Date.now()` at the change, kept strictly increasing per item (if the clock goes backwards, use `last + 1`). This also orders two tabs or two devices.
   - **`response`.** The same shapes as practice (`PracticeResponse`). Case/source items use `{parts:[{id, alternative?, response}]}`. `null` clears the item.
   - **`timeSpentSec`.** Cumulative.
   - **`changedAt`.** The device's ISO time of the change, sent always.
   - **Persisting.** Store the queue in IndexedDB/localStorage keyed by attempt id.
   - **When to flush.** Every `TEST_ENGINE.autosave.intervalSeconds` (10 s) when something changed, on `visibilitychange`/`pagehide`, and before submit. Send at most 200 items per batch, plus `tabSwitchCount` (cumulative; recorded, never punished).
   - **On reply.** Remove every entry listed in `applied`, `stale` or `rejected` whose seq ≤ the sent seq. Keep newer local changes.
   - **Retrying.** Retry with backoff only on network errors, 5xx and 429 (`Retry-After`). On 409 `attempt_closed`, stop and show the result. On 400, a programming error: log it and drop the batch.
   - **Offline.** Keep answering. When back online, flush at once.
   - **After the deadline.** Changes made before the deadline are accepted if they arrive within deadline + 120 s (live: 60 s). Later changes come back as `rejected: after_deadline`. Tell the student that answers made offline after time ran out did not count.
5. **Submit.** Call `POST /v1/attempts/:id/submit`, optionally with the remaining queue as the body (one round trip). It is idempotent: a double click or retry returns the same result with `alreadySubmitted: true`. Show `xpAwarded`, `badgesAwarded` and `streak`. Then call `GET /v1/attempts/:id/result`.
6. **Paper rendering.**
   - **Order.** Render `sections[].itemIds` in order. Items sharing a `choiceGroup` share a `number`: show "Attempt any `attempt` of these" and an "OR" between them.
   - **Answers.** Students may answer more than `attempt` items in a choice group; the best ones count (`counted` in the result).
   - **Shuffle.** Option order is already shuffled per attempt where allowed (live mocks). Never sort by id.
   - **Ordering items.** They arrive shuffled.
   - **Case/source internal choice.** Use `alternatives` as in practice.
7. **Result and self-evaluation.**
   - **Written items.** Items with `status: pending_self` show the model answer, marking scheme and rubric (`key`).
   - **Posting marks.** Post per item one of: `steps` (one value per `key.marking_scheme` step, each ≤ its marks, 0.5 steps), `marks`, or `parts` (case items: the written part ids from `parts[]` with `grading: self`).
   - **Score label.** Show "Self-marked" next to `score.self`.
   - **Percentile.** Show it only when `percentile.value` is not null; it needs 50 or more students.
8. **Custom builder.**
   - **Picker.** The chapter picker comes from the catalog; types and difficulty are optional.
   - **Errors.** Handle `bank_too_small` (422 with `detail`) and show `skippedChapters`.
   - **After building.** The response is a `TestMeta`; go straight to start.
9. **Live mocks.**
   - **Listing.** List with `GET /v1/live-events?subject=…`.
   - **Phases.** `registration_open` shows Register (`POST …/register`). `live` shows Start (until `lateStartUntil`). `writing` means only students who started can resume. `closed` shows "results soon". `results_published` shows ranks.
   - **Leaderboard.** It needs consent: on 403 `consent_required`, show the consent prompt (D-014). Show "Student" when `name` is null. Label ranks "beta". After the event the same test can be taken unranked.
10. **Problem codes to handle:** `attempt_closed`, `live_not_open` (with `detail`), `test_unavailable`, `bank_too_small`, `not_implemented`, `conflict` (result before submit, or self-evaluating an unanswered/objective item), `rate_limited`, `validation_failed`, `not_found` (also for anyone else's attempt), `consent_required` (leaderboard).
11. **Local dev.** `npm run dev -w @soyl/api` publishes 28 chapters (2,143 questions, 56 chapter tests). It now also runs the pipeline's `assemble --series`:
    - **CBSE 10 Science:** 11 papers — unit 1–3, full mocks 1–6, May track 1–2.
    - **CBSE 10 Maths:** unit tests 1–2; the rest are generation requests.
    - **Live events:** `live_cbse10sci_1/2` (board paper) and `live_cbse10math_1/2` (unit-test paper) on the Wave 1 dates, plus `live_*_dev` starting `DEV_LIVE_IN` minutes after start-up (default 10; `off` skips it). Dev live papers use the practice pool (local only).
    - **Ports:** use `MOCK_OIDC_PORT` if 8090 is taken.

## Load test (local, 1,000 virtual students: M3 exit)

Scenario (platform/load): 1,000 students sign in (setup, not measured). They start a 10-item chapter test, staggered over 60 s. Each then autosaves 1–3 changed answers every 10 s (±10 %) for 3 minutes, submits, and reads the result. Command: `npm run attempts -w @soyl/load -- --base http://127.0.0.1:8791 --users 1000 --minutes 3 --ramp 60 --result` against `npm run dev -w @soyl/api` (one Node process, embedded PostgreSQL, memory KV, `DATABASE_POOL_MAX=10`).

```
endpoint   requests  errors   p50 ms   p95 ms   p99 ms   max ms
start          1000       0     13.8     24.3     54.4    305.4
autosave      18448       0      9.9     27.9     86.1   1860.7
submit         1000       0     38.4    246.0    399.5    533.9
result         1000       0     14.7     75.8    143.4    198.3
scenario: 21,448 requests, error rate 0 %, 85.8 req/s over 250 s
machine: Intel i5-11300H (4 cores / 8 threads), 7.8 GB RAM, Windows 11, Node 24.15
```
Results file: `platform/load/results/2026-10-26T16-36-38-733Z-1000vu-pool10-v2.json`. **Autosave p95 28 ms and submit p95 246 ms are within the 500 ms budget, with 0 errors.**

**Machine caveat.** The harness, the API, embedded PostgreSQL and two other agents' dev servers (with their own embedded databases) all shared this laptop. These numbers show per-request cost and that 1,000 students work. They are not an Azure capacity figure. The 5,000-student live mock still has to be run on the staging-sized load environment: `platform/load/README.md` has the steps, the k6 thresholds and the pass criteria. k6 is not installed here; its script was written, not run.

**What the load test found (fixed):**
1. **Pool starvation in the grading transaction.** The first 1,000-VU run stalled once submits began. The transaction held a pooled connection while asking the pool for another (loading the test structure, keys and badge rows). With 10 concurrent submits and a pool of 10, it deadlocked; autosaves then timed out. Fix: everything read from the pool happens before the transaction; the badge sync now runs before the practice and lesson transactions too. Regression test: six concurrent submits on a pool of 2 (`tests-engine.test.ts` "pool safety").
2. **Autosave round trips.** The second run had 0 errors but saturated: autosave p95 5.8 s, submit p95 7.6 s (`results/…-before-autosave-fix.json`). Autosave is now one statement: a CTE takes `FOR SHARE` on the attempt row and does the guarded upsert, with no explicit transaction. Test rows are also cached. Result: autosave p95 5,816 → 28 ms.

## How to verify (from `platform/`, 2026-10-27, after merging origin/platform/main 51590dd)

```
npm run typecheck                         → ai-core, api, content-pipeline, db, e2e, shared, worker: exit 0
npm test -w @soyl/api -w @soyl/worker -w @soyl/db
  api     Test Files 19 passed (19) · Tests 308 passed | 1 skipped (Redis contract, CI only)
  worker  Test Files 7 passed (7)   · Tests 47 passed
  db      Test Files 13 passed (13) · Tests 104 passed | 1 skipped
TEST_KV=redis-mock npx vitest run (api/)  → Test Files 19 passed · Tests 308 passed | 1 skipped
api coverage (npx vitest run --coverage)  → Lines 97.07 %, Statements 94.35 %, Branches 84.38 %, Functions 93.75 %
  src/domain/tests (new services)         → Lines 95.81 %: attempts 90.4, catalogue 94.5, custom 100, finalize 98.7,
                                            live 98.9, live-admin 90.8, live-finalize 100, load 82.0, results 100,
                                            score 100; modules/tests.ts 96.3
npm run db -w @soyl/db -- migrate up / status / down --to 6 / status / up / status   (SOYL_DEV_PG_PORT=54337)
                                          → 0006 and 0007 rolled back and re-applied; "8 applied, 0 pending"
                                            (db/test/migrations.test.ts also asserts an identical schema after up→down→up)
npm run openapi -w @soyl/api              → regenerated; route-policy snapshot updated (+14 routes)
npm run build -w @soyl/api / -w @soyl/worker → api/dist/index.js 5.6 MB, worker/dist/index.js 2.8 MB; both bundles load
npm audit                                 → 4 moderate (dev-only drizzle-kit → esbuild), 0 high, 0 critical
                                            (undici pinned to 8.12.3: 8.0.0–8.12.1 have a high advisory)
local 1,000-VU load run                   → above
```

## Tests added

- **API `tests-engine`.** Catalogue (guest cache/304, member status, bad queries); metadata without questions; lifecycle `created → in_progress` and resume; two tabs starting one attempt; IDOR on every attempt route.
  - Autosave: retries, out-of-order batches, two tabs, clearing, validation, API-8, tab switches, the 256 KB limit and the autosave rate limit.
  - F-007: inside grace, exactly at the boundary, 1 ms after.
  - Submit and grading: grading, double submit, closed-after-submit; result keys only after submit (contract scan before); self-evaluation by marks, steps and parts, with every refusal.
  - Best-of choice groups; the perfect-score bonus and badge; no XP for an empty paper; `/v1/me/attempts` paging; the test-streak badge; AI evaluation 501.
  - Auto-submit by the worker function and lazily; a late submit becomes `auto_submitted`; percentile threshold and maths; first-attempt-only stats; pool safety.
- **API `live`.** Phases; registration; waiting room without questions; start window and late cutoff; per-attempt shuffle stable on reload; deadline cap; one attempt per event; provisional leaderboard (names, consent-null names, no PII, consent gate); KV removal on account deletion; embargo refusal; final snapshot (ranks, time tie-break, percentile, idempotent); unranked attempt after the event; scheduling (Wave 1 dates, generation requests, production refusal, dev fallback, no overlap between sittings, idempotent re-run, dev sitting).
- **API `custom-tests`.** Practice pool only, against 80 test/live decoys; type and difficulty filters; skipped chapters; `bank_too_small`; foreign chapter; validation; ownership 404s; normal attempt flow; not listed in the series; build rate limit. Unit tests: best-of aggregation, empty answers, capacities, unreadable responses, scaling, deterministic shuffle and choice-group blocks, option-shuffle exclusions (incl. Hindi), largest-remainder allocation.
- **API `unit` (KV contract).** Sorted-set operations on memory and ioredis-mock (and real Redis in CI).
- **Worker `engine-jobs`.** Auto-submit only after grace, using what was saved; live finalize (auto-submit, ranks with ties, no-shows, publish once); crons. Existing job tests now count jobs dynamically.
- **DB `test-engine`.** `client_seq` guard semantics, score split, bucket increments under concurrency, cascades.

## Deviations / decisions

1. **`created` state.** `POST /v1/tests/:id/attempts {start:false}` creates without a clock. Starting is the same endpoint (no separate `/start`).
2. **Field naming.** Autosave and state use `response`, not `answer`, for the student's answer, so attempt payloads before submission contain none of API-9's keys (`answer`, `solution_md`, `marking_scheme`, `correct`, `explanation`). The contract test scans for those keys plus `rubric`, `key`, `accepted` and `childKeys`.
3. **Ranks and percentiles use auto-graded marks only (AC-14).** Self marks change the student's own total only.
4. **Auto-submit is a cron sweep plus a lazy check**, not one delayed job per attempt (ADR-012 §4).
5. **Live deadline.** The deadline is start + duration, capped at `ends_at + late_start_minutes`, so for a paper that fills the window the latest deadline is window start + duration + 15 min (AC-11). New starts are refused during the window after the late cutoff. After the event the paper can be taken unranked.
6. **Live results publish automatically** when the window closes (labelled beta). AC-12's anomaly review is a follow-up.
7. **Custom tests use the pipeline engine as a runtime dependency** of the API (`@soyl/content-pipeline/assemble/engine`) rather than a copy. Custom papers are `paper_type unit-test`, `kind custom`, not shuffled.
8. **Badges for tests are evaluated in the grading transaction**, by the API or the worker, through the same code.
9. **`attempt.autosave` changed from 3 to 8 per 15 s**, to leave room for two tabs, page-hide flushes and offline replays.
10. **Worker imports the engine from `@soyl/api/engine/*`.** A separate package would be cleaner, but it is outside this agent's paths.

## Known gaps / follow-ups

- **Content gaps.**
  - Live papers for the Wave 1 dates need `live_reserved` items. None exist yet, so in a real database `npm run live -- schedule` reports generation requests (pipeline/curriculum). Dev fills them from practice items.
  - Maths series papers: the bank fills unit tests 1–2 only; unit 3, the mocks and the May track are generation requests (27). Science fills all 11 series papers (4 generation requests left).
- **Provisional live ranks.** Attempts the worker auto-submits are missing from provisional ranks until the final snapshot, because the worker has no KV client.
- **Anomaly flags** (AC-12) and the shareable rank-card image (ARCHITECTURE §9) are not built.
- **5,000-user run** on the staging-sized load environment (OA-dependent: needs Azure). k6 has not been run anywhere.
- **Session resolution** (Better Auth adapter, M1) costs 1–2 queries per request. It is fine at 1,000 local users; watch it in the 5,000 run.
- **Percentile per test version.** Republishing a paper restarts its distribution.
- **Custom tests** pile up in `tests` (one row per build). Add a retention sweep for old unstarted custom tests if the table grows.

## Decisions made

ADR-012.

## Needs from owner

None new. For the 5,000-user run: a staging-sized load environment (Azure, D-025 out of scope here).
