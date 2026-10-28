# backend-api — M5 follow-ups (weekly leagues, live event detail, formative-only flags, AI answer reports) — 2026-10-27

Status: **done**, green (stand-in) per D-010. Everything ran against real PostgreSQL (embedded, from `@soyl/db`) with the in-memory KV. Nothing was deployed.

Branch: `platform/backend-api/m5-followups` (worktree `C:/Users/Prabhu/soyl-wt/backend-api-m5`). `origin/platform/main` is merged up to 7e266e0, which includes the `content.test.ts` empty-chapter fix (fixture chapter `cbse-10-science-ch98`) and English ch01/ch31.

## What changed

| Path | What |
|---|---|
| `platform/db/schema/gamification.ts`, `migrations/0010_leagues.sql` + hand-written `.down.sql`, `meta/` | New table `leagues` (IST week × scope × scope key × tier × division, `open`/`closed`, `closed_at`). New `league_memberships` columns: `league_id` (FK, cascade), `tier` (default 1), `outcome` (`promoted`/`stayed`/`relegated`). Checks and indexes. |
| `platform/db/schema/ops.ts` | `REPORT_CONTENT_TYPES` = content types + `ai_answer`. Migration 0010 widens `content_reports_type_check`; the down migration deletes `ai_answer` reports and restores the old check. |
| `platform/db/test/leagues.test.ts` (new), `schema.test.ts` (68 → 69 tables), `catalog-seed.test.ts` (+1 test), `PII.md`, `README.md` | Constraints, cascades, app-role grants, the `ai_answer` type, and `board_assessed` seeded exactly as the YAML says. db-schema owns `platform/db`. As the brief allowed, this agent added the migration and schema in db-schema's style. |
| `platform/shared/config/gamification.ts` | `LEAGUE_TIERS` (bronze, silver, gold, sapphire, diamond), `LEAGUES` (size 30, 1/6 promoted, 1/6 relegated, relegation from 6 players, 1 XP minimum to promote, `liveScopes: ['class']`, cron `35 * * * *`), `leagueZones(n, tier)`. |
| `platform/shared/config/security.ts` | Rate-limit bucket `leagues.read.user` (60/min). |
| `platform/api/src/domain/leagues/leagues.ts` (new), `modules/leagues.ts` (new), `app.ts`, `package.json` (export `./leagues/*`) | Leagues domain and `GET /v1/leagues/current`. |
| `platform/worker/src/jobs.ts`, `test/leagues-job.test.ts` (new), `test/jobs.test.ts` | Job `leagues.weekly`. The empty-run expectations now include it. |
| `platform/api/src/domain/tests/live.ts`, `modules/tests.ts`, `modules/tests-schemas.ts` | `GET /v1/live-events/:id` (`LiveEventDetail`). |
| `platform/api/src/domain/assessment.ts` (new), `domain/content.ts`, `modules/catalog.ts`, `modules/content-schemas.ts` | `schoolAssessment` kind and effective topic `boardAssessed` in the catalog chapters and the chapter hub. |
| `platform/api/src/domain/reports.ts`, `modules/reports.ts`, `modules/admin.ts` (via the type list) | `contentType: 'ai_answer'` on `POST /v1/content-reports`. |
| `platform/api/openapi.json`, `test/__snapshots__/route-policy.test.ts.snap`, `platform/shared/api-client/schema.gen.ts` | Regenerated. Two new routes in the policy table, reviewed. |
| `platform/api/test/leagues.test.ts` (new), `live.test.ts`, `reports-mfa.test.ts`, `catalog.test.ts` | Integration tests (below). |

`platform/api/src/ai/**` was **not** touched. The AI report identifies the answer by the stream's `requestId` or by the message id, so the gateway needs no change.

## Endpoints (browser path = `/api/platform` + path; JSON; errors RFC 7807)

| Method | Path | Policy | Notes |
|---|---|---|---|
| GET | `/v1/leagues/current?scope=class` | member, consent `leaderboards` (D-014), limits default + `leagues.read.user` | Your weekly league. On the first visit of a week it may close your ended league and place you; this is idempotent. `scope=school\|city` → 501 `not_implemented`. `Cache-Control: no-store`. |
| GET | `/v1/live-events/:id` | public (guests allowed), default limits | One event: timeline, registration window, rank availability. Signed in, it also returns your status and result. `no-store`. |
| POST | `/v1/content-reports` (extended) | unchanged (everyone; `reports.ip`, `reports.user`; CSRF) | New `contentType: 'ai_answer'`: members only (401 for guests). 201 when created; 200 with the existing open report when the same answer is reported again. |
| GET | `/v1/catalog/subjects/:id/chapters`, `/v1/chapters/:id` (extended) | unchanged | New `schoolAssessment` on chapters and topics. Topics in the hub now carry `boardAssessed`. |

## Design: weekly leagues (ARCHITECTURE §12, CONTEXT §11)

- **Week.** An IST week runs from Monday 00:00 to the next Monday 00:00 IST, which is Sunday 18:30 UTC.
- **Week XP.** League XP is the XP the student earned in that week, summed from `xp_events.ist_day`. Nothing in the XP-awarding paths changed.
- **Cohort.** Class leagues are keyed `<board>-<class>` (`cbse-10`), taken from the profile. School and city leagues need consent-gated profile fields and are opt-in, so they return 501 for now. The tables already support them.
- **Tiers and divisions.** There are 5 tiers. Inside a cohort and tier, divisions hold at most 30 students.
- **Joining.** A student joins on their first visit of the week: the lowest division of their tier with room, or a new one. A transaction-scoped advisory lock per (week, cohort, tier) means concurrent first visits never overfill a division (tested with 32 at once). All queries inside a transaction use its own connection (pool safety).
- **`leagues.weekly` job.** Runs hourly at :35 UTC, so the first run of a week is Monday 00:05 IST. Later runs are no-ops or catch-ups.
  - It closes ended leagues, writing final XP, rank and outcome per member.
  - It then forms this week's leagues for last week's members who are still eligible: role student, not deleted, consent `granted`, board and class set. Their tier comes from last week's outcome and their cohort from the current profile. They are dealt into balanced divisions with a deterministic weekly shuffle.
  - If a group already has divisions (students who arrived early, or a re-run), the job fills them one student at a time instead of forming new ones.
  - The student's own visit also closes their ended league lazily, so the tier carries over even if the job has not run yet.
- **Ranking and zones.**
  - **Order.** XP descending, then whoever reached their total first, then whoever joined first.
  - **Promotion.** The top `max(1, floor(n/6))` places are promoted. There is no promotion from the top tier, and none with 0 XP.
  - **Relegation.** The bottom `floor(n/6)` places are relegated, only when the division has at least 6 students. There is no relegation from the bottom tier.
- **Privacy (D-014, F-017, AC-18, CONTEXT §12).**
  - **Standings.** They carry only `rank`, `xp`, `zone`, `isMe` and `name`. `name` is first name + last initial from the validated display name, and null when that student's consent is not granted (show "Student").
  - **Excluded.** No user ids, avatars, emails or surnames are returned. Deleted accounts are dropped from the standings.
  - **Placement.** Only students whose consent is granted are placed. The route itself needs consent, so production (`CONSENT_PROVIDER=unavailable`, where everyone is pending) answers 403 `consent_required` for everyone.
- **Snapshots.** Final standings live on `league_memberships` (`xp`, `final_rank`, `outcome`), which cascade with the account (PII.md). `leaderboard_snapshots` (unique per week/scope/key) is not used for divisions.

## What web needs

Regenerate nothing: `platform/shared/api-client/schema.gen.ts` is already regenerated. Schemas: `LeagueCurrent`, `LeagueTier`, `LeagueZone`, `LiveEventDetail`, `SchoolAssessment`, `ContentReportRequest` (extended).

### 1. Weekly leagues — `GET /v1/leagues/current?scope=class`

```ts
LeagueCurrent = {
  status: 'active' | 'class_required' | 'students_only',
  scope: 'class' | 'school' | 'city',
  serverNow: string,                               // ISO
  week: { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD', startsAt: ISO, endsAt: ISO },  // endsAt = next Monday 00:00 IST
  cohort: { key: 'cbse-10', board: 'cbse' | 'cisce', classLevel: number } | null,
  league: {
    id: uuid, tier: { level: 1..5, key: 'bronze'|'silver'|'gold'|'sapphire'|'diamond', name, icon },
    division: number, size: number, capacity: 30,
    promotionPlaces: number, relegationPlaces: number, minXpToPromote: 1,
    isTopTier: boolean, isBottomTier: boolean,
  } | null,
  standings: { rank: number, name: string | null, xp: number, zone: 'promotion' | 'safe' | 'relegation', isMe: boolean }[],
  me: { rank, xp, zone } | null,
  lastWeek: { weekStart, tier: LeagueTier, finalRank: number | null, xp: number, outcome: 'promoted' | 'stayed' | 'relegated' | null } | null,
}
```
- **Errors.** 401 → sign-in prompt. 403 `consent_required` → the consent-needed state (as for live leaderboards). 501 `not_implemented` for `school`/`city`. 429 `rate_limited`.
- **`status`.** `class_required` → ask the student to set board and class (`PATCH /v1/me`). `students_only` → parent/staff accounts see an explanation, not a league.
- **Countdown.** Use `week.endsAt` with the `serverNow` offset. Show "Student" when `name` is null. Draw the promotion and relegation lines from `zone`. The tier names and icons are also in `LEAGUE_TIERS` (`shared/config/gamification.ts`, no imports).
- **`lastWeek.outcome`.** Use it for a "You were promoted to Gold" banner.

### 2. Live event page — `GET /v1/live-events/:id` (e.g. `live_cbse10sci_1`)

`LiveEventDetail` = every `LiveEvent` field plus:
```ts
{
  serverNow, lateStartMinutes, writingUntil /* saves accepted until */, latestDeadlineAt, graceSeconds,
  timeline: [{ phase: 'upcoming'|'registration_open'|'live'|'writing'|'closed'|'results_published', from: ISO|null, until: ISO|null }],  // 6 entries, in order
  registration: { open: boolean, opensAt: ISO, closesAt: ISO /* = lateStartUntil */ },
  ranks: { status: 'not_started'|'provisional'|'final'|'unavailable', beta: true, requiresConsent: true, consentGranted: boolean|null /* null = guest */, canView: boolean },
  me: { registered, attemptId, attemptStatus, deadlineAt, canRegister, canStart, canResume,
        result: { rank, score, percentile } | null } | null,   // null for guests
}
```
- **Buttons.**
  - `canRegister` → `POST /v1/live-events/:id/register`.
  - `canStart` → `POST /v1/tests/:testId/attempts`, which also registers you.
  - `canResume` → `GET /v1/attempts/:attemptId`.
- **Leaderboard link.** Show it only when `ranks.canView`. When `consentGranted === false`, show the consent prompt instead.
- **Cancelled events.** `phase: 'cancelled'` → `ranks.status: 'unavailable'`.
- **Errors.** 404 for an unknown event, 400 for a malformed id.

### 3. Formative-only chapters and topics

- **Fields.** Catalog chapters (`GET /v1/catalog/subjects/:id/chapters`) and the hub (`GET /v1/chapters/:id`) carry `boardAssessed: boolean` and `schoolAssessment: 'periodic' | 'project' | 'practical' | 'internal' | null` on the chapter and on every topic.
- **Label.** When `boardAssessed` is false, label it "School assessment only — not in the board exam". Optionally refine with the kind: "Periodic assessment only", "Project work", "Practical", or "Internal/formative assessment".
- **Topic flags are effective.** A topic of a school-only chapter is school-only too.
- **Kind.** It is read from the curriculum's wording in the title and unit. The YAML has no structured kind field yet; see gaps.
- **Data.** The seed already stored `board_assessed`; it is now tested against every syllabus file: 140 chapters/topics. Examples: `cbse-10-science-ch12-t06` and the CBSE 10 SST chapter "The Age of Industrialisation" (periodic).

### 4. Report this AI answer (AC-15) — `POST /v1/content-reports`

```json
{ "contentType": "ai_answer", "conversationId": "<uuid>", "requestId": "<from the SSE meta event>", "reason": "wrong_answer", "comment": "optional, ≤ 1000 chars" }
```
- **Naming the answer.** Give exactly one of `requestId` (from the stream's `meta` event, so the button works right after the answer) or `messageId` (the assistant message id from `GET /v1/ai/conversations/:id`).
- **Reasons.** `wrong_answer`, `wrong_content`, `inappropriate`, `rendering`, `other`.
- **Responses.**
  - 201: a new report. 200: an open report for the same answer already exists (same receipt).
  - 401: guest. 404: not your conversation, or not an assistant message. 400 `validation_failed`: the `errors[].path` names the field.
  - 429: `reports.user` (20/day) or `reports.ip` (50/day).
- **Content reports.** They now need `chapterId` explicitly (400 otherwise, as before when it was required), and must not carry `conversationId`/`messageId`/`requestId`.
- **What is stored.** `content_type ai_answer`, `content_id` = message id, `item_ref` = `conv:<id>`, `unit` = the conversation's chapter key or `ai`. The message text is **not** copied; the message itself is purged with the conversation after 30 days.
- **Alert.** `inappropriate` also logs an ops alert (`alertKind: ai_answer_reported_inappropriate`) without content. The admin queue (`GET /v1/admin/reports`) lists these with `contentType: 'ai_answer'`.

## How to verify (from `platform/`, after merging origin/platform/main 7e266e0)

```
npm run typecheck                              → ai-core, api, content-pipeline, db, e2e, shared, worker: exit 0
npm test -w @soyl/shared                       → Test Files 7 passed · Tests 80 passed (API-client drift test included)
npm test -w @soyl/db                           → Test Files 15 passed · Tests 114 passed | 1 skipped
                                                 (migrations.test.ts: up → down to 0 → up identical schema on a fresh DB, and on a seeded DB)
npm test -w @soyl/worker                       → Test Files 11 passed · Tests 64 passed
npm test -w @soyl/api                          → Test Files 33 passed · Tests 530 passed | 1 skipped (Redis contract, CI only)
coverage of the new/changed services (vitest --coverage on leagues, live, reports-mfa, catalog tests):
  domain/leagues/leagues.ts 100 % lines (92.5 % branches) · domain/assessment.ts 100 % · domain/reports.ts 96.7 %
  domain/tests/live.ts 99.1 % · modules/leagues.ts 100 % · modules/reports.ts 100 % · modules/catalog.ts 100 %
npm run openapi -w @soyl/api                   → regenerated; route-policy snapshot +2 routes
npm run generate:api-client -w @soyl/shared    → regenerated schema.gen.ts
```

Note: one full-suite run under `--coverage` timed out `live.test.ts › scheduling … dev fallback` at 60 s (69.5 s) while
other agents loaded the machine; the same test takes 9.4 s alone and passed in the plain gate run above.

## Tests added

- **API `leagues.test.ts` (9).**
  - IST week boundaries (Sunday 18:29:59Z vs 18:30Z).
  - Zones, tiers and balanced division sizes; the ranking tie-break.
  - **Gates.** 401 for guests; 403 without consent; 501 for school/city; 400 for a bad scope or extra parameters; `class_required`; `students_only`.
  - **Placement and standings.** Placement on the first visit; this-week-only XP; first name + last initial; no ids, emails or surnames.
  - **Isolation and repeat visits.** Other classes play elsewhere; a repeat visit is idempotent.
  - **Leaving.** After consent is revoked the student is unnamed and loses access. A deleted account leaves the standings.
  - **Close and carry-over.** Lazy close of last week with outcomes; tier carry-over and `lastWeek`.
  - **Concurrency.** 32 concurrent joins fill a division to exactly 30, then open division 2.
  - **Formation.** Formation for eligible returning students only (revoked consent, deleted or no class are excluded); cohort from the current profile; idempotent re-runs; filling instead of re-forming.
- **API `live.test.ts` (+1).** `GET /v1/live-events/:id` through every phase as guest, member and member without consent.
  - Covers 404/400, the timeline bounds, the registration window and `canRegister`/`canStart`/`canResume`.
  - Covers the deadline, provisional/final rank availability, the final result, and cancelled.
- **API `reports-mfa.test.ts` (+2).**
  - Reports by `messageId` and by `requestId`; the 200 dedupe; unit `ai` vs the chapter key; no message text stored; the inappropriate alert without content.
  - Refusals: 401 guest, 404 IDOR, 404 for a user turn, 404 for an unknown request.
  - Every validation path; content reports without a chapter or with AI fields.
- **API `catalog.test.ts` (+2).** The kind derivation on real curriculum wording; effective topic flags; catalog and hub responses for school-only and mixed chapters.
- **DB `leagues.test.ts` (3), `catalog-seed.test.ts` (+1).** League constraints, cascades and app-role grants; `ai_answer` accepted, unknown types rejected; seeded `board_assessed` equals the YAML for every chapter and topic.
- **Worker `leagues-job.test.ts` (2), `jobs.test.ts`.** Close with outcomes, then form by tier (promoted/stayed/relegated, revoked consent excluded); a second run is a no-op; the cron and queue options. The empty-database run covers the new job.

## Deviations / decisions

1. **Leagues use the `leaderboards` consent feature.** It is already gated (D-014); no new consent feature was added.
2. **League XP is computed from `xp_events`, not incremented.** No hook in the XP paths, and it is always consistent.
3. **The first visit places the student (GET with an idempotent side effect).** This avoids an empty league page for new or returning-after-a-gap students. It is rate-limited.
4. **No `leaderboard_snapshots` rows for divisions.** Its unique key (week, scope, key) cannot hold several divisions, so the final state lives on `league_memberships`.
5. **`schoolAssessment` is derived from wording.** The syllabus schema (`platform/shared/content/catalog.ts`, pipeline-engineer/curriculum) has only `board_assessed`. No seed change was needed: the seed already stored the flag, and it is now tested.
6. **The AI report needs no gateway change.** It accepts the stream `requestId`.

## Known gaps / follow-ups

- **Structured assessment mode.** Curriculum-architect could add an optional `assessment: periodic|project|practical|internal` to `syllabus.yaml` (`shared/content/catalog.ts`). The API would prefer it over the wording heuristic. Non-English titles, such as Urdu "پروجیکٹ ورک", fall back to `internal`.
- **School and city leagues** are not served (501). They need opt-in school/city fields, which are consent-gated.
- **Rank-card image** (ARCHITECTURE §9) is still not built.
- **Formation cost.** The job processes one cohort/tier group per transaction. That is fine for beta numbers; at 100k+ weekly players, batch the inserts.
- **AI message purge.** After 30 days the reported AI message is purged, and the report keeps only ids. If reviewers need the text longer, that is a retention decision for the owner (PII).
- **Not in this brief: S6-H01 (High, security-reviewer M6).** Live-mock answer keys are visible in `GET /v1/attempts/:id/result` to early submitters while the event is still running. It is in backend-api's area (`domain/tests/results.ts`) and needs a separate task: withhold `key` until the event's `writingUntil`.

## Decisions made

None new at ADR level. The migration has a reversible down (DB-8) and is recorded in `platform/db/README.md`.

## Needs from owner

None.
