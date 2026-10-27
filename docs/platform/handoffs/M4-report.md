# M4 report — AI and billing

**Status: built, green (stand-in) (2026-10-27).** The AI gateway (credits, streaming tutor with hint-first answers, explain-this-slide, photo doubts, AI evaluation, paper-from-upload, fail-closed moderation, retrieval, spend breaker) and Razorpay billing (plans, subscriptions, Board Exam Pass orders, signed webhooks with exactly-once processing, entitlements, credit top-up, reconciliation) are built, with the web `/ask`, credits chip, paywall and `/plans`. Everything runs on stand-ins: a deterministic mock model, a local moderation rule set, an in-memory Blob store and a Razorpay stub with a signed-webhook simulator. No Azure OpenAI, Content Safety or Razorpay account exists yet (OA-02, OA-03, OA-04). AI and billing are not deployed to production.

Written 2026-10-28 by the technical writer from the handoffs below; numbers are as reported there.

## Exit criteria

| Criterion (AGENTS.md §3) | Result | Evidence |
|---|---|---|
| Credits + paywall | **green (stand-in)** | API `ai-credits`: 25 credits on first touch, one grant under 10 concurrent requests, 20 parallel reserves on 25 credits → exactly 2, sweeper races, 00:00 IST reset with no rollover, 402 paywall with countdown; web e2e `ai.spec.ts`: quote → stream → hint → full → refund on failure → photo doubt → explain slide → AI evaluation → paywall, practice still 200 ([ai-gateway M4](2026-10-27-ai-gateway-m4.md), [web M3/M4](2026-10-27-web-platform-m3-m4.md)) |
| Test-mode subscription end to end | **green (stand-in)** against `RazorpayStub` | 103 billing tests (97.9 % lines in `src/billing`): signature rejection, duplicate and concurrent deliveries, out-of-order events, halted/cancelled/refunded paths, entitlement ≤ 60 s after capture, reconciliation; web e2e `plans.spec.ts`: buy Plus via the Checkout stand-in, signed webhooks through our proxy, plan active < 60 s, one-byte-changed body refused ([billing M4](2026-10-27-billing-razorpay-m4.md)) |

Merged-tree totals at the billing merge: api 516 passed (on the memory and Redis-mock stores), worker 62, db 109, shared 79, ai-core 36.

## What was built

| Area | Summary | Handoff |
|---|---|---|
| AI gateway | 7 actions from `ai-actions.ts`; SSE protocol `meta`/`delta`/`refusal`/`error`/`done`; credits authoritative in Postgres (wallet row lock + append-only ledger with settlement trigger); Content Safety in and out with fail-closed behaviour and a local stand-in; tutor retrieval on pgvector with full-text fallback; uploads by user-delegation SAS with type sniffing, metadata stripping and PDF checks; AI evaluation as jobs, never counted in scores; spend breaker (degrade at 80 %, pause at 100 %, free tier ≤ 60 %); 5 worker jobs; migration 0008 | [ai-gateway M4](2026-10-27-ai-gateway-m4.md), merge 332fa57; [ADR-013](../adr/013-ai-gateway.md), [ADR-014](../adr/014-tutor-retrieval.md), [ADR-015](../adr/015-ai-moderation-fail-closed.md) |
| Billing | Plans synced from `plans.ts`; subscriptions (Plus/Pro, monthly/yearly) and Board Exam Pass orders; webhook HMAC over the raw body, re-fetch from Razorpay, exactly-once; entitlements with 48 h grace; credit top-up on plan change; nightly reconciliation and hourly expiry; operator CLI; consent required to buy; migration 0009 | [billing-razorpay M4](2026-10-27-billing-razorpay-m4.md), merge 34304ef; [ADR-016](../adr/016-billing-razorpay.md); [webhook runbook](../runbooks/razorpay-webhook-replay.md) |
| Web | `/ask` (modes with prices, quote → stream, hint → "Show full solution", stop, photo doubts with in-browser re-encode, history), Explain this slide in the player, credits chip and paywall, AI evaluation on the result page, `/plans` with Razorpay Checkout loaded on `/plans` only and per-page CSP, `/me` plan and credit history, `/leaderboard` (live ranks) | [web-platform M3/M4](2026-10-27-web-platform-m3-m4.md), merge 4c3da7f; [ADR-018](../adr/018-platform-web-tests-ai-plans.md) |

## Stand-in vs real (D-010)

| Real service | Stand-in | Switch-over |
|---|---|---|
| Azure OpenAI GPT-6 Luna / GPT-6.1 Sol (chat, vision, PDF input), embeddings | `@soyl/ai-core` MockProvider, MockEmbedder | OA-02; `AI_PROVIDER=azure`; confirm token prices in `models.ts` |
| Azure AI Content Safety | Local rule set (incl. syllabus exceptions, Hindi/Hinglish) | OA-03; `CONTENT_SAFETY_PROVIDER=azure` |
| Azure Blob for uploads | Memory store with SAS checks | `BLOB_PROVIDER=azure`; CORS from www.soylai.com; Defender malware scanning on quarantine |
| Razorpay test mode | `RazorpayStub` + signed-webhook simulator | OA-04; `RAZORPAY_PROVIDER=razorpay`; `sync-plans` |
| Parental consent that can say `granted` | Mock provider (local); `unavailable` in production | OA-08. Until then nobody can buy or use AI in production |

## Decisions taken in M4

D-033 (two models only: Luna and Sol, no Astra), D-034 ("Papers like my school's" is Pro and Board Exam Pass only, since it costs 60 credits and Plus grants 40), ADR-013 to ADR-016, ADR-018. Credits are authoritative in Postgres, superseding ARCHITECTURE §10's Redis balance.

## Issues found and fixed

- Plus could never afford paper-from-upload → D-034, plus a config test that every action fits every plan that offers it.
- The proxy had to forward the webhook body byte for byte; a reformatted body breaks the HMAC (tested: 400).

## Open at the end of M4

- Every Azure and Razorpay check against real services (OA-02, OA-03, OA-04); streaming through Vercel to be confirmed on a preview.
- Owner pricing: paper-from-upload's estimated cost (₹6.10) is above its credit value (₹6.00) (OA-18).
- Security (M6 review): S6-M01 PDF checks are regex-based and PDFs reach the model unchanged; S6-M02 account deletion leaves uploads in Blob; S6-L04/L05 partial-output refunds and job reservation sweeps.
- Not built: per-IP free-tier ceiling and multi-account alert (AC-06), sampled human review of flagged conversations, sharp re-encode and HEIC, PDF page rendering for Prompt Shields. "Report this AI answer" was added later in the M5 follow-ups (2026-10-28).
