# ADR-013: AI gateway — credits ledger, streaming, settlement, spend breaker, jobs, uploads

- Status: accepted (ai-gateway M4, 2026-10-27)
- Related: ARCHITECTURE §4.1 (ai, credits, evaluation), §6, §10, §11.1, §15; CONTEXT §5, §6, §7, §12; DECISIONS D-008, D-014, D-015, D-018, D-021, D-031; threat model AC-06..AC-08, AC-13..AC-17, F-008, F-009, F-013, F-027, F-028; requirements API-5, API-11, API-16; ADR-003 (pg-boss), ADR-012 (test engine), ADR-014 (retrieval), ADR-015 (moderation)

## Context

Every model call goes through one metered gateway (D-021, ARCHITECTURE §10). Students see AI usage as
credits (1 credit = ₹0.10; free 25/day, Plus 40, Pro and Board Exam Pass 60; reset at 00:00 IST; no
rollover). The cost is shown before an action, credits are reserved when it starts, charged when it
succeeds and refunded when it fails, and a student who runs out sees the reset time and the plans —
never a block on learning. The real INR cost of every request is metered; a global daily cap protects
the owner's budget, with a free-tier sub-budget (D-015) so free-tier abuse cannot stop paying students.
Children are the users: consent gates AI (D-014; production reports `pending` until OA-08, D-031),
moderation is mandatory on input and output, and nothing fails open (F-027).

## Decision

1. **Action registry** (`platform/shared/config/ai-actions.ts`): seven actions with tier, template,
   token caps, reasoning effort, price (flat, or per answer with a cap), plans, moderation policy,
   degrade tier, retrieval depth, upload kinds and reservation TTL. Prices/tiers/caps are config.
2. **Credits are authoritative in Postgres** (D-008); no Redis balance. `credit_ledger` is append-only.
   Today's balance is `SUM(amount)` of the user's rows for today's IST day, so there is no midnight job
   and no rollover. A reserve is one transaction holding the user's `credit_wallets` row lock
   (`SELECT … FOR UPDATE`, migration 0008): lazy daily grant (unique per user/day) → top-up if the
   plan's daily credits rose (plan bought mid-day) → balance check → `reserve` row. Parallel reserves
   serialise on the lock: 20 parallel 10-credit reserves on 25 credits → exactly 2 succeed (test).
   A plan downgrade never claws back. The day's grant is committed even when the reserve is refused.
3. **Settlement (F-008, AC-08).** A reservation resolves exactly once: the partial unique index
   `credit_ledger_one_resolution` makes the loser of a charge/refund/sweeper race insert nothing
   (`ON CONFLICT DO NOTHING`); the 0002 trigger refuses a resolution without a reserve or returning
   more than held. Refund: nothing was shown yet (provider error, client gone), input or output
   moderation block, our dependency failed (moderation, storage). Charge: output was shown — also when
   the client disconnects or the model fails afterwards. "Output shown" means a moderated chunk was
   sent, not merely produced. Per-answer actions charge for answers delivered and return the rest.
   Every reserve has a TTL (15 min streams, 1–2 h jobs, > the 120 s stream cap); the worker sweeper
   refunds expired ones; a job whose reservation was refunded never calls the model.
4. **Idempotency.** `Idempotency-Key` (8–128 chars) maps to `idem_<sha256(user, key)>` as the
   request id, so a retry finds its reservation and gets `409 duplicate_request` instead of a second
   charge. Without the header every request is new.
5. **Streaming** (`POST /v1/ai/:action` for stream actions): pre-flight errors are problem+json
   (402 `credits_exhausted` with `balance`, `required`, `resetAt`, `resetInSeconds`, `plan`,
   `plansUrl`; 403 `plan_required`; 503 `ai_paused` with Retry-After; 429 `ai_busy`; 409
   `ai_blocked_during_test`). After the reserve the response is `text/event-stream`: `meta`, `delta`*,
   then `refusal` or `error`, then `done` with the final balance. Output is moderated in ~400-character
   chunks cut at sentence ends before it is sent (AC-15). Fastify sends a PassThrough stream, so the
   normal onSend security headers apply. A per-user KV slot limits concurrent streams to 2 and fails
   closed with the KV store (F-027).
6. **Prompt layout for cache hits**: template rules (identical per template) → syllabus scope
   (identical per chapter) → retrieved context → recent history → the student's message with the
   per-turn directives last (mode, language). Student, document and answer text is only ever inside
   tags that the rules declare to be data; tag-like sequences are neutralised (AC-13, AC-14).
7. **Tutor behaviour**: hint first (`MODE HINT`); the full solution after the student sends an
   attempt, writes that they tried, or asks again in the same conversation (`reveal` or an explicit
   request). Language: Hindi for Hindi subjects, else Devanagari → Hindi, Hinglish markers → Hinglish,
   else English. The tutor is off while the student has a live mock in progress (AC-14).
8. **Metering and the spend breaker.** Each request's usage (tokens → paise via models.ts; partial
   streams metered from the text produced; embeddings included) is written to `ai_requests` and added
   to `ai_spend_daily` (scopes `all` and, for free students, `free`) in one `UPDATE … RETURNING` that
   also bumps `alert_level`, so 50/80/100 % alerts fire once per day per scope even under concurrency.
   Before an action: share < 80 % normal; ≥ 80 % degraded (actions with `degradeTo` run on the small
   tier, the rest pause); ≥ 100 % paused until 00:00 IST. Free students are limited by the worse of
   `free` (60 % of the cap) and `all`; subscribers by `all` only. Recovery is automatic at the IST day
   boundary or when the cap is raised. Alerts go to an `AlertSink`; the default writes structured log
   lines with `alert: true` for an Azure Monitor log alert rule. A daily worker job compares each
   action's 7-day real cost per charged request with its credit price and alerts above 80 %, and
   checks the ledger invariants.
9. **Jobs** (`ai_jobs`): evaluation, paper-from-upload and upload processing run as jobs that the API
   starts immediately in-process and the worker's `ai.jobs` sweep (every minute) picks up when queued
   or abandoned (lock expiry 10 min, 3 attempts). Claiming is a conditional UPDATE. Results are polled
   with `GET /v1/ai/jobs/:id`. pg-boss is not used for these so the API needs no queue client and a job
   row carries its own state for the UI.
10. **AI evaluation** replaces M3's 501: `POST /v1/attempts/:id/ai-evaluation {itemIds?}` (one id =
    evaluate-answer, 6 credits; otherwise evaluate-paper, 6 per answer, max 40). Units are the written
    items (and written case parts) without a finished AI evaluation. Structured output (zod); every
    step clamped to [0, step max] in halves, unknown/duplicate steps ignored, item ≤ its maximum.
    Document attacks in an answer cap confidence at 0.3; confidence < 0.6 shows "AI-graded — check
    with your teacher". Results are `evaluations` rows with mode `ai`, which the test engine never
    reads for scores, percentiles or ranks (F-028). Answers with harmful content are not sent.
11. **Uploads** (D-018, F-013, AC-16): the API issues a ≤ 5-minute write-only (`cw`) SAS for one blob
    in `uploads-quarantine`; the browser PUTs there directly. `complete` starts processing: magic-byte
    sniff (JPEG/PNG/WebP/PDF; never SVG; HEIC refused until a decoder exists), declared type must
    match, ≤ 10 MB, ≤ 40 MP read from headers, PDFs ≤ 10 pages without encryption/JavaScript/launch/
    embedded files/forms. Images are rebuilt from image segments only (EXIF/GPS, XMP, ICC, comments,
    text chunks and anything after the end marker are dropped) — the dependency-free equivalent of a
    re-encode for metadata and polyglot payloads; a full decode/re-encode needs sharp/libvips and is a
    follow-up. Only the cleaned derivative is kept (`uploads` container); uploads expire after 30 days.
    Vision calls receive base64 `data:` URLs, never a URL the student chose (no SSRF).
12. **Paper from upload**: a vision call extracts a bounded blueprint (≤ 8 sections, types from an
    allowlist, chapter ids that must exist in our catalog for the subject, no question text); the paper
    is then built from **our** bank by the M3 custom builder (practice pool only). The school's
    questions are never stored or reused. Unbuildable blueprints are refunded.
13. **Entitlements** are read through `EntitlementService.planFor(userId, at)`; the default returns
    `free`. Billing replaces it and calls `CreditService.applyPlanChange` when a plan starts mid-day.
14. **Runtime injection**: the model provider, embedder, moderation provider, blob store,
    entitlements and alert sink are one `AiRuntime`, built from env (`AI_PROVIDER`, `AI_EMBEDDINGS`,
    `CONTENT_SAFETY_PROVIDER`, `BLOB_PROVIDER`, …) with one injectable credential (the managed-identity
    TokenProvider from prod-readiness once merged). Mock/local stand-ins refuse production (GEN-3);
    the production default is `disabled`, which refuses AI with 503 (fail closed) until the services
    exist.

## Consequences

- Credits never go negative and never double-settle; the invariants are tested and checked daily.
- The wallet lock serialises one student's AI starts (a few ms); different students never contend.
  `ai_spend_daily` is one hot row per scope; at ~10 AI requests/s that is fine, beyond it shard the
  counter or cache the breaker state.
- Paid students keep AI when free-tier spend trips its sub-budget.
- Real cost per request is visible per action in `ai_requests`; prices are re-tuned in config.
- Job results are polled, not pushed (a WebSocket/SSE job channel is a later improvement).
- Two pricing issues are inherited from CONTEXT and flagged to the owner: paper-from-upload costs 60
  credits but Plus grants 40 a day, and its estimated real cost (₹6.10) is above its price (₹6.00).
