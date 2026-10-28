# M3 report — Tests

**Status: built, green (stand-in) (2026-10-27); two exit items are open on real infrastructure.** The test engine (series, attempts, autosave with offline grace, auto-submit, grading, results, percentiles, self-evaluation, custom builder, live All-India mocks with ranks) and the web test player are built and pass end to end against the real local API. CBSE 10 Science, Mathematics (Standard and Basic) and Social Science have complete frozen series (41 papers). The 1,000-student load test passed locally; it has not been run on Azure. A High security finding (S6-H01) blocks live mocks until fixed.

Written 2026-10-28 by the technical writer from the handoffs below; numbers are as reported there.

## Exit criteria

| Criterion (AGENTS.md §3) | Result | Evidence |
|---|---|---|
| Test series for Wave 1 subjects playable end to end | **green (stand-in) for three subjects:** Science 11 papers, Maths 19, SST 11 frozen in git (ADR-019), every board/May paper within ±3 marks of competency targets; chapter tests (2 per chapter) for all five core subjects. Hindi A and English series are not frozen yet. Other Wave 1 subjects (Class 12, other Class 10 subjects, ICSE/ISC) have no content | `content/authored/series/*.json`; `content-pipeline/test/series.test.ts`; [assessment-designer series](2026-10-27-assessment-designer-cbse10-series.md), [maths balance](2026-10-27-assessment-designer-cbse10-maths-balance.md), [science/SST balance](2026-10-27-assessment-designer-science-sst-balance.md) |
| Attempt survives refresh and 2 minutes offline; auto-submit; correct results | **green (stand-in)** | web e2e `tests.spec.ts`: reload resume, 2 min offline with the banner, reconnect flush, score equals the known answer set, auto-submit at the server deadline ([web M3/M4](2026-10-27-web-platform-m3-m4.md)) |
| 1,000-user load test green | **green locally, not on Azure:** 1,000 virtual students, 21,448 requests, 0 errors; autosave p95 28 ms, submit p95 246 ms (budget 500 ms) on one laptop | `platform/load/results/2026-10-26T16-36-38-733Z-1000vu-pool10-v2.json` ([backend-api M3](2026-10-27-backend-api-m3.md)). k6 has not been run; the 5,000-user live-mock run needs a staging-sized environment |

## What was built

| Area | Summary | Tests / evidence | Handoff |
|---|---|---|---|
| Test engine API | 14 routes: series catalogue, test metadata, attempts (create without clock / start / resume), batched autosave with client sequence numbers, idempotent submit, results with sections/topics/difficulty/time and percentile (from 50 attempts), self-evaluation by steps/parts/marks, custom builder (practice pool only), live events with registration, waiting room, late start and Redis ranks with a final Postgres snapshot; worker jobs `attempts.auto-submit` (every minute) and `live.finalize` (every 5 min); migration 0007 | api 308 passed (97.07 % lines; `src/domain/tests` 95.81 %); worker 47; db 104; migrations up/down | [backend-api M3](2026-10-27-backend-api-m3.md), merge 8f2b77e; [ADR-012](../adr/012-test-engine.md) |
| Web test player | Player with IndexedDB answer queue, server-offset timer, palette, choice groups, submit confirmation; result page with self-evaluation; series pages; builder; live-mock page with countdown and consent-gated leaderboard | web unit 171; UI kit 548; Playwright 55 flag-on (one timing assertion fixed and re-run) + 32 flag-off | [web-platform M3/M4](2026-10-27-web-platform-m3-m4.md), merge 4c3da7f; [ADR-018](../adr/018-platform-web-tests-ai-plans.md) |
| Frozen series | Assembler made board-faithful (chapter scopes, unit marks, board-assessed only, no near-duplicates, deterministic bank order) and competency-balanced; series frozen in git and published by the release step | `series.test.ts`; `postgres.test.ts` proves the release is idempotent | [ADR-019](../adr/019-frozen-test-series-in-release.md), merges 0ebdb12, e0d5de3, 42549a2 |
| Load harness | `@soyl/load`: undici driver (`src/attempts.mjs`) and k6 script (`k6/attempts.js`) | run above | [`platform/load/README.md`](../../../platform/load/README.md) |

## Stand-in vs real (D-010)

| Real | Stand-in | Remaining check |
|---|---|---|
| Azure Managed Redis for live ranks and rate limits | Memory KV and ioredis-mock locally; real Redis in CI | Live-mock run on Azure |
| Staging-sized load environment | One laptop | 5,000 concurrent test-takers, p95 < 500 ms, errors < 0.5 % (release gate) |
| AI evaluation | 501 at the end of M3; replaced in M4 | — |

## Decisions taken in M3

ADR-012 (test engine), ADR-019 (frozen series), D-035 (per-subject competency band). Autosave limit raised from 3 to 8 per 15 s (two tabs, page-hide flushes, offline replays).

## Issues found and fixed

- **Load test:** pool starvation in the grading transaction (it held one connection while asking for another) deadlocked submits at 10 concurrent; fixed by reading everything before the transaction, with a regression test on a pool of 2. Autosave rewritten as one guarded statement: p95 5,816 ms → 28 ms.
- First frozen Maths mocks missed the board's competency mix; 231 honest re-tags, 39 new items and engine balancing fixed it; Science and SST were re-tagged and re-frozen too.
- An empty-chapter API test fixture broke when every chapter got content (fixed e5c1a77).

## Open at the end of M3

- **S6-H01 (High):** an early submitter can read the live paper's answer keys while the event is running. Live mocks must not open until it is fixed (in progress on `platform/backend-api/security-fixes-m6`).
- No `live_reserved` items exist, so the two Wave 1 live sittings (13 Dec 2026, 17 Jan 2027) cannot be built from real content yet.
- Hindi A and English series; Class 12 and ICSE/ISC series.
- Rank-card image and live-mock anomaly flags are not built. Worker auto-submits are missing from provisional ranks until the final snapshot.
- 5,000-user load run on Azure.
