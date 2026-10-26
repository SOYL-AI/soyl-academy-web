# ai-gateway — M4 AI gateway (credits, tutor streaming, moderation, retrieval, uploads, AI evaluation, spend controls) — 2026-10-27

Status: **done**, green (stand-in) per D-010. Everything ran against real PostgreSQL (embedded, from
`@soyl/db`) with the in-memory KV, and the API suite again on the Redis store over ioredis-mock. The
model is `@soyl/ai-core`'s deterministic MockProvider, moderation the local rule set, Blob storage the
in-memory store with SAS checks. No Azure OpenAI, Content Safety or Storage resource exists yet
(OA-02/OA-03); the Azure adapters are written and unit-tested against their documented request
shapes, not against live resources. Nothing was deployed.

Branch: `platform/ai-gateway/m4` (worktree `C:/Users/Prabhu/soyl-wt/ai-gateway-m4`), from
`origin/platform/main` plus the backend-api M3 merge (8f2b77e, taken from the local `platform/main`
before it was pushed — the Lead's own merge commit, unchanged).

## What changed

| Path | What |
|---|---|
| `platform/shared/config/ai-actions.ts` (new), `credits.ts`, `ai-actions.test.ts` | Action registry (7 actions: tier, template, token caps, reasoning, price, plans, moderation policy, degrade tier, retrieval depth, upload kinds, reservation TTL), `quoteCredits`, upload limits (`AI_UPLOADS`), moderation thresholds and fixed messages (`AI_MODERATION`), spend-breaker settings (`AI_SPEND`: cap ₹2,000 default, free share 60 %, degrade at 80 %), gateway limits (`AI_GATEWAY`). |
| `platform/ai-core/src/*` | Vision/file inputs (`images`, `files` as `data:` URLs only), caller cancellation (`signal`, `CallerAbortedError`, never retried), partial-stream metering (`StreamInterruptedError` with metered `usage`), `DisabledProvider` (`AI_PROVIDER=disabled`), embeddings (`MockEmbedder`, `AzureOpenAIEmbedder`, `createEmbedder`), `MockText` fixtures, image token estimates. New tests: `gateway-support.test.ts`. |
| `platform/db/schema/ai-gateway.ts` (new), `ai-credits.ts`, `content.ts`, `migrations/0008_ai_gateway*`, `PII.md`, `README.md`, `test/schema.test.ts` | Migration 0008 (reversible): `credit_wallets`, `ai_spend_daily`, `ai_jobs`; `ai_requests.plan_id/degraded/simulated`; `uploads.processed_key/processed_content_type`; `content_chunks.search_vector` (generated tsvector, GIN). 65 → 68 tables. |
| `platform/api/src/ai/**` (new) | The gateway: `config`, `runtime` (injectable dependencies), `entitlements`, `credits` (ledger service), `spend` (breaker + alerts), `moderation/*`, `retrieval`, `prompts`, `fixtures` (mock answers), `gateway` (pre-flight + SSE run), `evaluation`, `jobs`, `uploads`, `blob` (Azure REST + SAS, memory stand-in), `media` (sniff/limits/clean), `maintenance` (sweeper, retention, guardrail), `routes`, `schemas`, `services`, `worker` (factory for the worker). The package exports `./ai/*`. |
| `platform/api/src/app.ts`, `services.ts`, `index.ts`, `errors.ts`, `schemas.ts`, `modules/tests.ts` | Minimal wiring: `registerAiRoutes`, `services.ai`, the runtime from env at start-up, new problem codes (+ RFC 7807 extension fields), the M3 `POST /v1/attempts/:id/ai-evaluation` 501 stub replaced. |
| `platform/api/test/ai-*.test.ts` (new), `helpers.ts`, `tests-engine.test.ts`, route-policy snapshot | 7 new suites (below); the harness accepts AI runtime overrides; the M3 "501" test now expects 409 before submission; snapshot +13 routes. |
| `platform/worker/src/ai-jobs.ts` (new), `jobs.ts`, `test/ai-jobs.test.ts`, `test/jobs.test.ts`, `test/registry.test.ts` | Five AI jobs (below); `JOB_NAMES` includes them. |
| `platform/api/openapi.json`, `platform/shared/api-client/schema.gen.ts` | Regenerated. |
| `docs/platform/adr/013-ai-gateway.md`, `014-tutor-retrieval.md`, `015-ai-moderation-fail-closed.md` | ADRs. (Numbers 013–015 were free on this branch; renumber at merge if another branch took them.) |

## Endpoints (browser path = `/api/platform` + path; JSON unless noted; errors RFC 7807)

| Method | Path | Who | Notes |
|---|---|---|---|
| GET | `/v1/credits` | member | `{plan, planName, dailyCredits, balance, grantedToday, reservedNow, spentToday, day (IST), resetAt, resetInSeconds, plansUrl, prices[{action, label, credits, perAnswer, maxCredits, allowedForPlan}]}`. Writes the day's lazy grant. No consent needed (nothing is spent). |
| GET | `/v1/credits/ledger?cursor&limit≤100` | member | `{entries[{id, kind: grant\|reserve\|charge\|refund\|expire, amount, action, label, day, createdAt}], nextCursor}`. A `charge` row's amount is the unused part returned (usually 0); the spend is its `reserve`. |
| GET | `/v1/ai/quote/:action?attemptId&answers` | member | `{action, label, credits, perAnswer, answers, maxCredits, tier, mode: stream\|job, requiresUpload, plan, allowedForPlan, balance, affordable, status: available\|degraded\|paused, resetAt, resetInSeconds, plansUrl}`. For `evaluate-paper` pass `attemptId` to price the real number of answers. |
| POST | `/v1/ai/:action` | member, consent `ai` | Stream actions `quick-doubt`, `explain-slide`, `hard-doubt`, `photo-doubt` → **SSE** (below). Job actions `evaluate-answer`, `evaluate-paper` (`{attemptId, itemIds?}`), `paper-from-upload` (`{uploadId, subjectId}`) → 202 `AiJobAccepted`. Body ≤ 16 KB, strict schema `AiActionRequest`. Optional `Idempotency-Key` header. Limit `ai.user` 10/min, fails closed. |
| GET | `/v1/ai/jobs/:id` | owner | `{id, kind, action, status: queued\|running\|succeeded\|failed, result, error, createdAt, finishedAt}`. |
| POST | `/v1/ai/uploads` | member, consent `uploads` + `ai` | `{kind: photo_doubt\|sample_paper, contentType: image/jpeg\|image/png\|image/webp\|application/pdf, bytes ≤ 10 MB}` → 201 `{uploadId, uploadUrl, method: PUT, headers, uploadExpiresAt (≤ 5 min), maxBytes, expiresAt (30 days)}`. Limits 5/h, 20/day. Photo doubts: images only. |
| POST | `/v1/ai/uploads/:id/complete` | owner | After the PUT. 202 `AiUpload` (status `uploaded`; processing starts). 409 `upload_not_ready` if nothing was uploaded. |
| GET | `/v1/ai/uploads/:id` | owner | `{status: pending_upload\|uploaded\|scanning\|ready\|rejected, rejectReason, contentType, bytes, pages, expiresAt}`. Expired uploads are 404. |
| GET | `/v1/ai/conversations?cursor&limit` | member | Newest first: `{conversations[{id, kind, chapterId, title, lastMessageAt, createdAt}], nextCursor}`. |
| POST | `/v1/ai/conversations` | member, consent `ai` | Optional (an action without `conversationId` starts one). `{kind?, chapterId?, title?}` → 201. |
| GET | `/v1/ai/conversations/:id` | owner | `{conversation, messages[{id, role, content, createdAt}]}` (30-day retention). |
| POST | `/v1/attempts/:id/ai-evaluation` | owner, consent `ai` | **Replaces the M3 501.** `{itemIds?}`: one id = evaluate-answer (6 credits), none/several = evaluate-paper (6 per answer, max 40). 202 `AiJobAccepted` (+ `answers`, `skipped[]`). 409 before submission or when nothing new is left. |
| GET | `/v1/attempts/:id/ai-evaluation` | owner | `{attemptId, items[{itemId, marks, maxMarks, confidence, lowConfidence, label, steps[{part, index, step, awarded, max, reason}], feedback, evaluatedAt}], totalMarks, maxMarks, countsForRanks: false, job}`. |

New problem codes: `credits_exhausted` (402; fields `balance`, `required`, `resetAt`, `resetInSeconds`,
`plan`, `plansUrl`), `plan_required` (403; `plan`, `plansUrl`), `ai_paused` (503 + Retry-After until
00:00 IST), `ai_unavailable` (503), `ai_busy` (429), `ai_blocked_during_test` (409),
`duplicate_request` (409), `upload_rejected` (422), `upload_not_ready` (409).

### SSE protocol (`POST /v1/ai/{quick-doubt|explain-slide|hard-doubt|photo-doubt}`)

`content-type: text/event-stream`. Each event is `event: <name>\ndata: <json>\n\n`:

1. `meta` `{requestId, conversationId, action, credits, balance, tier, degraded, mode: hint|full|explain, language: english|hinglish|hindi}` — credits are reserved.
2. `delta` `{text}` — Markdown (LaTeX in `$…$`), already moderated; append in order.
3. Either `refusal` `{kind: unsafe|off_topic|self_harm|output_blocked, message, creditsRefunded, balance}` (show `message` instead of an answer; for `self_harm` show it prominently, it has the helplines) or `error` `{code: ai_unavailable|ai_failed|ai_interrupted|internal, message, creditsRefunded|creditsCharged, balance}`.
4. `done` `{status, creditsCharged, balance, sources?}` — update the header balance from here.

Errors before the stream (paywall, plan, consent, breaker, validation) are normal problem+json.

## Schema changes (migration 0008, reversible)

- `credit_wallets (user_id UNIQUE → users CASCADE, plan_id, last_grant_day)` — the row-lock target.
- `ai_spend_daily (ist_day, scope all|free, spent_paise numeric(14,4), requests, alert_level; UNIQUE(ist_day, scope))`.
- `ai_jobs (kind evaluation|paper_from_upload|upload_process, user_id → users CASCADE, request_id UNIQUE, action, status queued|running|succeeded|failed, payload, result, error_code, attempts, locked_until, run_after, finished_at)`.
- `ai_requests + plan_id, degraded, simulated`; `uploads + processed_key, processed_content_type`.
- `content_chunks + search_vector tsvector GENERATED ALWAYS AS (to_tsvector('simple', text)) STORED` + GIN index.
- PII.md updated (wallets cascade; ai_jobs 30 days; spend aggregate only; processed upload key 30 days).

## Worker jobs (UTC crons)

| Job | Cron | What |
|---|---|---|
| `ai.jobs` | every minute | Queued or abandoned AI jobs (the API starts them at once; this is the safety net). |
| `credits.sweep-reservations` | every 5 min | Refund reservations past their TTL; close their `ai_requests`. |
| `ai.index-content` | :20 hourly | (Re)index published content into `content_chunks` (FTS; embeddings where pgvector + an embedder exist). |
| `ai.retention` | 21:00 (02:30 IST) | Messages/jobs older than 30 days, emptied conversations, expired uploads + blobs. |
| `ai.cost-guardrail` | 03:30 (09:00 IST) | 7-day real cost per charged request vs credit price (alert > 80 %); ledger invariants (alert on any violation). |

## What web needs for `/ask` and the credits UI

1. **Regenerate the client** (already done here: `platform/shared/api-client/schema.gen.ts`). Schemas: `Credits`, `CreditLedger`, `AiQuote`, `AiActionRequest`, `AiJobAccepted`, `AiJob`, `AiUploadRequest`, `AiUploadTarget`, `AiUpload`, `AiConversation(s)`, `AiConversationDetail`, `AiEvaluationRequest`, `AiEvaluation`, `Problem` (now with the paywall fields). Prices/labels can also be read from `platform/shared/config/ai-actions.ts` (type-only imports).
2. **Header balance**: `GET /v1/credits` once per page load; afterwards use `balance` from SSE `meta`/`done` and from 202 job responses.
3. **Cost before the action** (CONTEXT §6): before sending, show `GET /v1/ai/quote/:action` (`credits`, `affordable`, `status`). If `status: paused`, show "AI is taking a short break until midnight" and do not send. For full-paper evaluation pass `attemptId`.
4. **Streaming**: POST with `fetch` and read `response.body` as a stream (EventSource cannot POST). Parse events as above. Send an `Idempotency-Key` (e.g. a UUID per question; reuse it on retry). Abort with an `AbortController` when the student leaves; F-008: once text has appeared they are charged.
5. **Hint first**: the first reply is a hint (`meta.mode = hint`). Offer "Show full solution" → resend in the same `conversationId` with `reveal: true`, or let the student type their attempt into `attempt`.
6. **Paywall**: on 402 `credits_exhausted` show a countdown from `resetInSeconds` to `resetAt` and a link to `plansUrl`. On 403 `plan_required` show the plans. On 403 `consent_required` show the consent prompt (D-014). Never block lessons, practice or tests.
7. **Uploads** (photo doubt, sample paper): compress images in the browser to ≤ 2048 px (JPEG ~0.8) before upload (smaller, faster, and within Content Safety's 4 MB image limit when it is enabled); `POST /v1/ai/uploads` → `PUT uploadUrl` with exactly the returned `headers` → `POST …/complete` → poll `GET /v1/ai/uploads/:id` until `ready` or `rejected` (`rejectReason`: `unsupported_type`, `type_mismatch`, `too_large`, `too_many_pixels`, `too_many_pages`, `unsafe_pdf`, `corrupt`, `empty`, `unsafe_content`, `image_too_large_to_check`, `processing_failed`). Then `POST /v1/ai/photo-doubt {uploadId, message?, chapterId?}`. Locally the upload URL is `memory://…` (tests only); the PUT goes straight to Azure Blob in deployed environments (CORS must allow it, see owner actions).
8. **Explain this slide**: `POST /v1/ai/explain-slide {chapterId, slide: {part, slideId}}` from the lesson player.
9. **AI evaluation** on the result page: quote with `GET /v1/ai/quote/evaluate-paper?attemptId=…`, then `POST /v1/attempts/:id/ai-evaluation` (or `{itemIds:[id]}` for one answer), poll `GET /v1/ai/jobs/:jobId`, then show `GET /v1/attempts/:id/ai-evaluation`. Show each item's `label` ("AI-graded" / "AI-graded — check with your teacher") next to the marks, and keep AI marks visually separate from the score (they never count for scores, percentiles or ranks).
10. **Papers like my school's** (paid plans): upload a sample paper (`kind: sample_paper`, PDF or photo), `POST /v1/ai/paper-from-upload {uploadId, subjectId}`, poll the job; `result.testId` is a custom test — start it with the M3 test player.
11. **Conversations**: `/ask` history from `GET /v1/ai/conversations` and `/:id`; messages expire after 30 days.
12. **"Report this answer"** (AC-15): use the existing `POST /v1/content-reports` until an AI-specific report type exists (follow-up).

## What billing needs (EntitlementService contract)

- Implement `EntitlementService` (`platform/api/src/ai/entitlements.ts`): `planFor(userId, at): Promise<PlanId>` returns the plan in force at `at` from `entitlements`/`subscriptions` written by the webhook path (AC-10); `'free'` when nothing applies; throw only when the store is unreachable (AI then fails closed with 503). It is called once per AI request and per `GET /v1/credits`, **before** any credit transaction (it may use its own pool connection).
- Wire it in `createAiRuntime(...)` / `AppDeps.ai.runtime.entitlements` (one line in `src/index.ts`; tests already use `StaticEntitlementService`).
- When a plan starts or upgrades mid-day, call `services.ai.credits.applyPlanChange(userId, plan)`: today's grant is topped up to the new plan's daily credits (`plan_topup` ledger row). It is idempotent and also happens lazily on the next AI request. Downgrades never claw back.
- Plans and daily credits come from `platform/shared/config/plans.ts` (unchanged).

## Azure resources the owner must create (OA-02, OA-03) — Central India, keyless

| Resource | Exactly what | Env var (API + worker) |
|---|---|---|
| Azure OpenAI deployment `small` | GPT-6 Luna (chat), Standard or Data Zone deployment in an approved geography (ADR-008 pending) | `AZURE_OPENAI_DEPLOYMENT_SMALL` (e.g. `soyl-small-luna`) |
| Azure OpenAI deployment `mid` | GPT-6.1 Sol (chat + **vision**; PDF file input for sample papers) | `AZURE_OPENAI_DEPLOYMENT_MID` (e.g. `soyl-mid-sol`) |
| Azure OpenAI deployment `verify` | GPT-6 Astra (content pipeline only; not used by the gateway) | `AZURE_OPENAI_DEPLOYMENT_VERIFY` |
| Azure OpenAI deployment `embedding` | `text-embedding-3-small`, 1536 dimensions (must equal `EMBEDDING_DIMENSIONS`) | `AZURE_OPENAI_DEPLOYMENT_EMBEDDING` (e.g. `soyl-embed-3s`) |
| Azure OpenAI account | One endpoint for all deployments; default content filters ON (INFRA-5); API identity gets **Cognitive Services OpenAI User** | `AZURE_OPENAI_ENDPOINT`, `AI_PROVIDER=azure`, `AI_EMBEDDINGS=azure` |
| Azure AI Content Safety | One resource; API + worker identities get **Cognitive Services User** | `CONTENT_SAFETY_PROVIDER=azure`, `AZURE_CONTENT_SAFETY_ENDPOINT` |
| Storage account (Blob) | Containers `uploads-quarantine` and `uploads` (private); lifecycle rule deleting blobs after 30 days on both; **Defender for Storage malware scanning** on `uploads-quarantine` (ASVS 5.4.3); CORS allowing `PUT` from `https://www.soylai.com` with headers `content-type, x-ms-blob-type`; API + worker identities get **Storage Blob Data Contributor** and **Storage Blob Delegator** (user-delegation SAS) | `BLOB_PROVIDER=azure`, `BLOB_ACCOUNT_URL` |
| Budget | Daily AI cap in rupees (default 2000); free tier gets 60 % | `AI_DAILY_SPEND_CAP_INR` |
| Alerting | Application Insights log alert on traces with `customDimensions.alert == true` (kinds `spend_threshold`, `cost_guardrail`, `invariant`, `self_harm_signal`) → owner email/SMS | — |

Also confirm the token prices in `models.ts` (still `unverified`) once the models are deployed.
Credentials: pass the prod-readiness managed-identity `TokenProvider` into `createAiRuntime(…, { credential })`
in `src/index.ts` and the worker once that branch is merged (it satisfies `TokenCredentialLike`);
otherwise `@azure/identity` would be loaded lazily, which is not installed (vulnerable msal pin).

## Decisions and findings for the Lead (proposed DECISIONS entries)

1. **Pricing (owner):** `paper-from-upload` costs 60 credits but Plus grants 40/day, so Plus students can never afford it (CONTEXT §7 says Plus includes it). Options: price it at ≤ 40, give Plus 60, or make it Pro-only. Also its estimated real cost (₹6.10) is above its price (₹6.00); the cost guardrail will alert once real costs flow.
2. **Free tier and full-paper evaluation:** a full paper costs up to 40 credits; free students have 25/day, so they can evaluate about four answers a day (evaluate-answer) but not a whole paper. Consistent with CONTEXT, worth stating in the UI.
3. **Credits are authoritative in Postgres** (no Redis balance): wallet row lock + ledger. ARCHITECTURE §10's "Redis atomic, mirrored to ledger" is superseded for credits (D-008 already said Postgres is authoritative).
4. **Image moderation at upload:** every uploaded image goes through Content Safety `image:analyze` (local stand-in: a test marker) during processing, before any model sees it; unsafe → `unsafe_content`; outage → the upload stays unusable, then `processing_failed`. Content Safety accepts images ≤ 4 MB, so larger photos are refused with `image_too_large_to_check` when Azure is configured: the web must compress first. PDFs are not image-analysed (needs page rendering).
5. **Image cleaning without a native decoder:** metadata stripping + segment rebuild instead of a sharp re-encode (ADR-013 §11). HEIC is refused for now.

## How to verify (from `platform/`, 2026-10-27)

```
RESULTS_PLACEHOLDER
```

## Tests added

- **API `ai-unit`** (30): moderation rules incl. syllabus exceptions (sexual reproduction, STDs, Hiroshima…), Hindi/Hinglish, leetspeak; jailbreak/document-attack/off-topic; moderator policy and self-harm message; fail closed; Azure Content Safety request shapes, slicing, errors; language detection; hint-first; stable prompt prefix and delimiter neutralising; mark clamping; upload corpus (sniff, SVG/HEIC refused, EXIF/GPS and polyglot removal for JPEG/PNG/WebP, 40 MP bomb, PDF pages/JS/encrypt/launch, size); SAS strings and signatures, Azure Blob keyless/Azurite URLs and REST ops; memory SAS enforcement; IST time; config (GEN-3); idempotency ids; prices; FTS query sanitising; chunking; mock embeddings; runtime factory; log alert sink.
- **API `ai-credits`** (9): first-touch 25 credits and reset time; one grant under 10 concurrent first requests; Plus/Pro/Board Exam Pass grants and mid-day top-up, no claw-back; reserve/charge/refund exactly once incl. partial per-answer charge; **20 parallel reserves on 25 credits → exactly 2**; sweeper refunds expired reservations and races a charge with exactly one resolution; **00:00 IST reset, no rollover**, a pre-midnight reservation settles on its own day; ledger paging/labels; **quote before the action; 402 paywall with countdown and plans link; non-AI keeps working**.
- **API `ai-gateway`** (15): index (types, no keys, idempotent, FTS, scope); **consent gate**; SSE grounded hint → full solution, metering, spend, conversation, IDOR; Hinglish/Hindi; explain-slide; **moderation in** (unsafe, self-harm with helplines, jailbreak, off-topic → refunded); **moderation unavailable → fail closed, refunded**; **unsafe output never shown, refunded**; **provider failure before output → refunded, after output → charged**; **disconnect after output → charged, before → refunded**; Idempotency-Key; validation and 16 KB limit; plan_required; concurrent-stream limit; **KV down → 503**; live-test block.
- **API `ai-spend`** (6): alerts once at 50/80/100 % (concurrent increments); **free sub-budget pauses free while paid continue**; degraded → small tier, vision paused; **trip at 100 % and recover at 00:00 IST / cap raise**; zero cap; 7-day guardrail.
- **API `ai-uploads`** (9): SAS shape/TTL/expiry/IDOR; type/size/PDF-photo refusals, consent, rate limit; expired/forged SAS; cleaning (EXIF/GPS, polyglot); malicious corpus via the real pipeline; photo doubt sends a cleaned `data:` image; paper-from-upload builds a paper from our bank without storing school questions, 60 credits, Plus cannot afford; failed blueprint refunded; 30-day expiry.
- **API `ai-evaluation`** (5): quote per answer, job, clamped steps, confidence/label, **scores/percentiles/ranks unchanged**, free-tier paywall, IDOR; single answer 6 credits; **prompt-injection fixtures: an obedient model's 99 marks are clamped, confidence capped ≤ 0.3**; unsafe answers not sent or charged; provider failure refunds all; refunded reservation → no model call; worker sweep runs queued jobs once.
- **API `ai-retrieval-vector`** (1): pgvector path with mock embeddings where the extension exists (CI), FTS fallback otherwise.
- **ai-core `gateway-support`** (10), **shared `ai-actions`** (3), **worker `ai-jobs`** (6), **db** schema counts.

## Known gaps / follow-ups

- **Live Azure verification** (D-010): Azure OpenAI chat/vision/PDF file input, embeddings, Content Safety, Blob SAS (user delegation) and CORS have never run against real resources.
- **PDF text/page rendering** for Prompt Shields on sample papers (needs a PDF renderer in a sandboxed worker); **sharp re-encode** (native dependency; ADR); **HEIC**.
- **Per-IP free-tier AI ceiling and multi-account anomaly alert** (AC-06): not built; account-creation limits (D-015) are backend's.
- **"Report this answer"** admin queue for AI replies and sampled human review of flagged conversations (AC-15).
- **Job push**: results are polled; an SSE channel for jobs would be nicer.
- The worker's AI jobs use an in-process KV (no Redis client in the worker, same as M3's engine jobs).
- `ai_spend_daily` is one hot row per scope; shard or cache if AI traffic grows past ~10 requests/s.
