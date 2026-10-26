# ADR-012: Test engine — attempts, autosave protocol, offline grace, grading, ranks

- Status: accepted (backend-api M3, 2026-10-27)
- Related: ARCHITECTURE §4.1 (tests, live, evaluation), §6, §9, §12, §16; CONTEXT §5, §10, §11; threat model AC-11, AC-12, AC-14, F-006, F-007, F-017; requirements API-5..API-9; D-014; ADR-003 (pg-boss), ADR-006 (releases), ADR-010 (answer separation)

## Context

Tests are free for signed-in students (CONTEXT §5) and must work on patchy mobile connections, so the
player keeps answering offline and syncs later. Timing must be server-authoritative (AC-12): the
client clock is for display only and a student must not be able to buy time by holding saves or
forging timestamps. Answers must not reach the browser before submission (API-9, F-006), live-mock
questions not before the start (AC-11). An All-India live mock is 5,000 students autosaving at once
(§16), with ranks during and after the event. Written answers are self-evaluated (free) or, from M4,
AI-evaluated; neither may influence ranks (AC-14).

## Decision

1. **Lifecycle** `created → in_progress → submitted | auto_submitted`. `POST /v1/tests/:id/attempts`
   creates or resumes the caller's single active attempt for that test key (any version; DB-2's
   partial unique index makes a parallel second tab resume the same row). `start` (default true)
   moves it to `in_progress` and sets `deadline_at = start + duration` (live: capped at
   `ends_at + late_start_minutes`); `{start:false}` makes a `created` attempt with no clock and no
   questions (instructions screen, live waiting room). Questions exist in a response only for a
   started attempt.
2. **Autosave protocol** (`PUT /v1/attempts/:id/responses`, ≤ 256 KB, ≤ 200 items). Each entry is the
   whole state of one item: `{itemId, seq, response|null, markedForReview?, timeSpentSec?, changedAt?}`.
   `seq` is a positive integer that the client increases with every change of that item (recommended:
   the change's `Date.now()`, which also orders two tabs and two devices by last change). The server
   applies an entry only if `seq` is greater than the stored `responses.client_seq` (one guarded upsert:
   `ON CONFLICT … DO UPDATE … WHERE client_seq < excluded.client_seq`), so retries, duplicates and
   out-of-order batches never regress an answer. The reply lists `applied`, `stale` (with the stored
   seq) and `rejected`; the client drops all three from its queue and retries only on network errors,
   5xx and 429. `timeSpentSec` is cumulative and never decreases; `tabSwitchCount` is cumulative, recorded
   and not punished (ARCHITECTURE §9). Saves take `FOR SHARE` on the attempt row and submit takes
   `FOR UPDATE`, so a save either lands before grading or sees the closed attempt (409 `attempt_closed`).
3. **Offline grace (F-007).** A save received by `deadline_at` is accepted. A save received in
   `(deadline, deadline + grace]` — grace 120 s, live 60 s (`TEST_ENGINE.graceSeconds`) — is accepted
   **per entry** only when its `changedAt` claims a time ≤ `deadline_at` (an offline queue flushing
   late); entries claiming later, or no time, are `rejected: after_deadline`. After deadline + grace
   every save is refused and the attempt is auto-submitted. Client times are advisory: a forged
   `changedAt` can buy at most the grace window, which bounds the exposure. A submit received after the
   grace is recorded as `auto_submitted` with `submitted_at = deadline_at`.
4. **Auto-submit** happens in two places with one code path (`finalizeAttempt`): lazily when any
   attempt route touches an attempt past deadline + grace, and in the worker's `attempts.auto-submit`
   cron (every minute, `FOR UPDATE SKIP LOCKED` batches). A cron sweep was chosen over one delayed
   pg-boss job per attempt: the API has no queue client, 5,000 live attempts would mean 5,000 jobs, and
   the sweep self-heals after outages. Worst case a forgotten attempt is graded ~1 minute after its grace.
5. **Grading** reuses the practice grader (all objective types, case/source children and their
   internal-choice alternatives, shared code-output/ordering helpers). An unreadable stored response
   scores 0 rather than failing a submit. Choice groups count the best `k` of `n` items. Two scores
   are kept: `auto_score` (auto-graded marks, best-of applied) and the total (auto + self marks).
   **Ranks and percentiles use `auto_score` only** (AC-14); self-evaluation changes the student's own
   total. Self-evaluation accepts marks per item, per marking-scheme step, or per written case part,
   each within its maximum. AI evaluation (`POST /v1/attempts/:id/ai-evaluation`) is declared now with
   its policy (consent `ai`, `ai.user` limit) and returns 501 `not_implemented` until M4.
6. **Percentiles** read `test_score_buckets` (migration 0007): one row per test version and half-mark
   bucket, incremented in the grading transaction for the student's first graded attempt
   (`attempts.counts_for_stats`). A percentile is `(below + ½·equal) / total` — two sums over at most
   2 × total_marks + 1 rows — shown once `total ≥ 50` (`TEST_ENGINE.percentileMinAttempts`).
7. **Delivery.** A test version's structure (items, sections, choice groups, student-safe question
   columns) is immutable, so it is cached in process for 10 minutes; keys are cached separately and only
   grading reads them. Embargo is checked with the application clock: a start is refused
   (`test_unavailable`) while any `live_reserved` item's `embargo_until` is in the future. Where the test
   allows it (`tests.shuffle`, set for live mocks), question order inside a section (choice groups move
   as one block) and MCQ option order are shuffled per attempt from `attempts.shuffle_seed`, except
   options that refer to other options ("all of the above", उपर्युक्त सभी …).
8. **Live mocks.** Registration from `registration_opens_at`; starting registers too. Starts are allowed
   in `[starts_at, starts_at + 15 min]`; while the window runs nobody else can open the paper; one attempt
   per event ever (DB-2). Provisional ranks: a KV sorted set per event (KV interface gains zset
   operations, memory + Redis, contract-tested), score = auto marks with a time tie-break, written by the
   API when it grades. Final ranks: the worker's `live.finalize` (every 5 minutes) auto-submits what is
   left after the window, ranks in one SQL statement (`rank()` by auto score, then time; `percent_rank()`),
   writes `live_registrations.final_rank/percentile/score` and publishes. The leaderboard is
   consent-gated (D-014) and shows first name + last initial from the validated display name, only for
   students whose consent is granted (F-017); others are ranked but unnamed. `DELETE /v1/me` removes the
   KV entries. After the event the paper can be taken again, unranked. Ranks are labelled beta (AC-11).
   Wave 1 sittings live in config (`LIVE_MOCK_SITTINGS`: 13 Dec 2026 and 17 Jan 2027, 10:00 IST);
   `npm run live -w @soyl/api -- schedule` assembles each live paper from the subject's `live_reserved`
   pool (no repeats across sittings) and creates the events.
9. **Custom tests** are assembled by the content pipeline's engine (`@soyl/content-pipeline/assemble/engine`,
   now a runtime dependency of the API, bundled by esbuild) from a one-off blueprint built from the
   request; the bank is the practice pool of the chosen chapters' active releases — never `test` or
   `live_reserved` items. Seeds are stored (`custom:<user>:<request hash>:<n>`).
10. **Access.** Everything except the catalogue needs sign-in. Attempts are declared under the
    `test_attempts` consent feature but not gated (D-014; `CONSENT.gatedFeatures`). Attempt reads and
    writes are owner-scoped (404 otherwise, API-7). Limits: `attempt.start.user`, `attempt.read.user`,
    `attempt.evaluate.user`, `tests.custom.user`, `live.register.user` per user; `attempt.autosave`
    (8 per 15 s) and `attempt.submit` per attempt.

## Consequences

- The web player must implement the queue semantics above (handoff: "test player contract").
- Live provisional ranks miss attempts the worker auto-submits until the final snapshot (the worker has
  no KV client); those are the last ones of the window anyway, and final ranks come from Postgres.
- Final ranks are published automatically after the window. AC-12's anomaly review (identical answer
  patterns, very short times) before publication is a follow-up; until then ranks say "beta".
- Percentiles are per test version; republishing a paper restarts its distribution.
- `responses.client_seq` is `bigint`: millisecond-epoch sequences fit.

## Alternatives considered

- **Last-write-wins by server receipt time:** regresses answers when an old offline batch arrives late.
- **Trusting client timestamps for acceptance:** unbounded time extension (F-007).
- **Ranks from Postgres on every leaderboard read:** a `rank()` over 5,000 rows per request during the
  event; the sorted set answers rank-of-me and top-N in O(log n).
- **A separate test-engine package:** cleaner, but outside this agent's paths; the worker imports the
  engine through `@soyl/api/engine/*` instead.
