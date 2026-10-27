# billing-razorpay — M4 Razorpay billing (plans, purchases, webhooks, entitlements, reconciliation) — 2026-10-27

Status: **done**, green (stand-in) per D-010. No Razorpay keys exist (OA-04), so everything runs against
`RazorpayStub` (faithful entity shapes/state machines) and the signed-webhook simulator; real Postgres
(embedded, `@soyl/db/testing`); KV in memory and on ioredis-mock (`TEST_KV=redis-mock`). Test-mode keys
switch the real client on by configuration only. `BILLING_ENABLED` stays false in production. Nothing
was deployed.

Branch: `platform/billing-razorpay/m4` (worktree `C:/Users/Prabhu/soyl-wt/billing-m4`), from
`platform/main` b3379cc (prod-readiness merge) + `origin/platform/main` 0dee08c merged. Design: ADR-016.
Runbook: `docs/platform/runbooks/razorpay-webhook-replay.md`.

## What changed

| Path | What |
|---|---|
| `platform/api/src/billing/**` (new) | `config.ts` (RAZORPAY_* / BILLING_ENABLED rules), `razorpay/` (client interface + zod entity schemas, `RazorpayHttpClient`, `RazorpayStub`, signature, webhook simulator), `plans.ts` (plans table + `syncPlans`), `sync.ts` (re-fetch → bind → apply; entitlements), `webhooks.ts` (raw-body verify, exactly-once processing), `entitlements.ts` (`BillingEntitlementService`, `CreditTopUpHook`), `service.ts` (purchases, cancel, view, refresh), `routes.ts`, `reconcile.ts` (reconciliation + expiry), `cli.ts` (operator CLI). |
| `platform/api/scripts/billing.ts`, `package.json` | `npm run billing -w @soyl/api -- …`; export `./billing/*` for the worker. |
| `platform/api/src/config.ts`, `services.ts`, `app.ts`, `errors.ts` | Minimal wiring: `config.billing`; `services.billing` (+ `AppDeps.billing.razorpay` injection); `registerBillingRoutes`; problem codes `billing_disabled` 403, `billing_unavailable` 503, `already_subscribed` 409, `plan_unavailable` 409. |
| `platform/api/test/billing-*.ts` (new), `route-policy.test.ts` (+ snapshot) | 102 billing tests (5 files) + the AUTH-12 exemption pinned to exactly `POST /v1/webhooks/razorpay`. |
| `platform/db/schema/billing.ts`, `migrations/0008_billing{,.down}.sql`, `meta/0008_snapshot.json` | Reversible. `subscriptions.razorpay_plan_id`, `amount_paise` (CHECK > 0), `paid_count`, `ended_at`; `webhook_events.outcome` (CHECK applied/ignored/rejected), `entity_id` (indexed). **Number collides with ai-gateway's 0008: renumber the second one merged to 0009 and regenerate its snapshot.** No new tables (65 stays 65). |
| `platform/shared/config/plans.ts` (+ test) | `planPrice`, `priceLabel` (₹199/month, ₹1,499/year, ₹499 one-time) and `BILLING` (grace 48 h, reuse 30 min, order expiry 24 h, `expire_by` 24 h, total_count 60/5, refresh 12/min, `notes.app`). Prices unchanged. |
| `platform/worker/src/billing-jobs.ts` (new), `jobs.ts`, `config.ts`, `worker.ts`, tests | Jobs `billing.reconcile` (22:00 UTC) and `billing.expire` (hourly); worker config reads the same RAZORPAY_* variables and uses only the real client. |
| `platform/api/openapi.json`, `platform/shared/api-client/schema.gen.ts` | Regenerated. |
| `docs/platform/adr/014-billing-razorpay.md`, `docs/platform/runbooks/razorpay-webhook-replay.md` | ADR-016; incident runbook (replay, resync, reconcile, secret rotation, webhook setup). |

## Endpoints (browser path = `/api/platform` + path)

| Method | Path | Who | Notes |
|---|---|---|---|
| GET | `/v1/plans` | anyone | `{billingEnabled, currency:'INR', pricesIncludeGst:true, plans:[{id, name, creditsPerDay, features, validUntil, order, prices:[{interval, amountPaise, label}], purchasable}]}`. Public cache 60 s for guests, `no-store` signed in. Works with billing off. |
| POST | `/v1/billing/subscriptions` | student | `{plan:'plus'\|'pro', interval:'monthly'\|'yearly'}` → 201 `SubscriptionCheckout {kind, keyId, subscriptionId, plan, interval, amountPaise, currency, label, name, description, reused}`. No entitlement. 403 `billing_disabled` / `consent_required`; 409 `already_subscribed`; 503 `billing_unavailable` (Razorpay down or plans not synced) / `consent_unavailable`. |
| POST | `/v1/billing/orders` | student | `{plan:'board_exam_pass'}` → 201 `OrderCheckout {kind, keyId, orderId, plan, amountPaise, currency, label, name, description, validUntil, reused}`. Same errors; 409 `plan_unavailable` from 2027-04-01 IST. |
| POST | `/v1/billing/cancel` | student | Empty body or `{}`. Paid → cancel at period end (`cancelAtPeriodEnd:true`, plan kept until then); unpaid → now. 404 nothing to cancel. Not gated by consent or BILLING_ENABLED. → `MySubscription`. |
| POST | `/v1/billing/refresh` | student | Empty body or `{}` (Checkout's `razorpay_*` fields → 400). Re-syncs the student's open orders/subscriptions from Razorpay. 12/min. → `MySubscription`. |
| GET | `/v1/me/subscription` | member | `MySubscription {plan, planName, creditsPerDay, source: free\|subscription\|order\|admin\|promo, validUntil, subscription:{id, plan, interval, status, currentPeriodEnd, cancelAtPeriodEnd}\|null, billingEnabled}`. |
| POST | `/v1/webhooks/razorpay` | Razorpay (via the web proxy, edge secret) | Raw body ≤ 256 KB, `X-Razorpay-Signature`, `X-Razorpay-Event-Id`. 200 `{received, duplicate, outcome: applied\|ignored\|rejected}`; 400 bad/missing signature, event id or body; 415 non-JSON; 503 Razorpay re-fetch failed (not recorded → Razorpay retries); 404 when no provider is configured. `csrf=false` (only AUTH-12 exemption). |

## EntitlementService contract (for ai-gateway / the Lead's merge)

`BillingEntitlementService` (`services.billing.entitlements`) implements ai-gateway's
`EntitlementService` exactly: `name = 'billing'`, `planFor(userId, at): Promise<PlanId>` — the in-force
entitlement with the most daily credits (`valid_from ≤ at ≤ valid_until`, not revoked at `at`), else
`'free'`; never throws for "no plan"; throws only if Postgres is unreachable. Also `current(userId, at)`
(plan, source, validUntil, ids). Credit top-up: `services.billing.setCreditHook({ applyPlanChange })`
is called after the commit that makes a plan newly in force (failures logged, never fatal; the credits
service also tops up lazily). Wiring after both branches are merged, in `createServices`:

```ts
const billing = new BillingService({ db, clock, kv, config: config.billing, razorpay, consent });
const ai = new AiServices({ config, db, kv, clock, ai: { ...deps.ai, runtime: { ...deps.ai?.runtime, entitlements: billing.entitlements } } });
billing.setCreditHook(ai.credits);   // CreditService.applyPlanChange(userId, plan)
return { …, billing, ai };
```

(`index.ts` passes `createAiRuntime(...)`'s runtime, which carries `FreeEntitlementService`; the spread
order above replaces it.) The worker needs nothing: it never reads plans.

## Decisions taken here (details in ADR-016)

- **Consent (D-014):** purchases need consent `granted` → else 403 `consent_required` (+ `consent_denied`
  security event, `feature=purchases`); consent outage → 503. With `CONSENT_PROVIDER=unavailable`
  (production) nobody can buy, whatever `BILLING_ENABLED` says. Cancel/refresh/view/webhooks never
  depend on consent. Checked in the service (no `purchases` entry in `CONSENT_FEATURES`; the Lead may add
  one and move it to the route policy). Parent-account purchases for a linked child: deferred (OA-08).
- **Entitlement windows:** pass until 2027-03-31T23:59:59+05:30 (inclusive); subscriptions until
  `current_end + 48 h` while active/pending, `current_end` once cancelled/completed, revoked on halted /
  full refund; partial refunds keep the plan.
- **`BILLING_ENABLED` only closes purchases.** Renewals, cancels and webhooks continue.
- **Student role only** buys; no Checkout `prefill` (child's account, parent pays).

## Acceptance evidence

(see "Evidence" below — real output pasted)

## What web-platform needs for `/plans`

1. `GET /v1/plans` → render cards from `prices[].label` (already GST-inclusive INR); disable buttons when
   `purchasable` is false (billing off: "coming soon"; pass after its end date).
2. Load `https://checkout.razorpay.com/v1/checkout.js` **only on `/plans`** (WEB-1). CSP for `/plans` only:
   `script-src https://checkout.razorpay.com`; `frame-src https://api.razorpay.com https://checkout.razorpay.com`;
   `connect-src https://api.razorpay.com https://lumberjack.razorpay.com`; `img-src https://cdn.razorpay.com`
   — verify the exact list in test mode (WEB-3). COOP `same-origin-allow-popups` on `/plans` if UPI/3-DS
   popups need it (WEB-4).
3. Buy: `POST /v1/billing/subscriptions` or `/orders`. Handle 401 (login modal, return to `/plans`), 403
   `consent_required` (explain a parent must give consent; link to `POST /v1/me/consent/start` flow),
   403 `billing_disabled`, 409 `already_subscribed` (link to manage), 409 `plan_unavailable`, 503.
4. 201 → `new Razorpay({ key: keyId, subscription_id: subscriptionId | order_id: orderId, amount: amountPaise, currency, name, description, handler: onPaid, modal: { ondismiss } }).open()`.
   **No `prefill`.** `onPaid` must NOT send the Checkout response anywhere: call `POST /v1/billing/refresh`
   with `{}`, then poll `GET /v1/me/subscription` (every 2–3 s, up to 60 s) until `plan` changes; show
   "Payment received — activating your plan". Never decide the plan in the browser (AC-10).
5. Manage: `GET /v1/me/subscription` (plan, source, `validUntil`, `subscription.status`,
   `currentPeriodEnd`, `cancelAtPeriodEnd`) and a Cancel button → `POST /v1/billing/cancel`.
6. **The proxy route** (`app/(platform)/api/platform/[...path]/route.ts`) must forward
   `POST /v1/webhooks/razorpay` with the **body bytes unchanged** (no JSON re-serialisation), the
   `x-razorpay-signature` and `x-razorpay-event-id` headers and `content-type`, without requiring a
   cookie or Origin. Any re-encoding breaks the HMAC (tested: reformatted JSON → 400).
7. `NEXT_PUBLIC_RAZORPAY_KEY_ID` is optional: the API returns `keyId` with every checkout.

## What the owner must provide (OA-04)

1. Razorpay **test-mode** `key_id` + `key_secret` → Key Vault `razorpay-key-id`, `razorpay-key-secret`
   (stg); a **webhook secret** → `razorpay-webhook-secret`.
2. In the Razorpay dashboard (test mode): add the webhook URL
   `https://<staging host>/api/platform/v1/webhooks/razorpay` with that secret and the events listed in
   the runbook §6. For live: `https://www.soylai.com/api/platform/v1/webhooks/razorpay` with live keys in
   prod Key Vault only.
3. Start KYC for live keys before launch; confirm prices (CONTEXT §7) and the 48 h renewal grace.
4. Purchases also need a consent system that can return `granted` (OA-08) — until then nobody can buy.

Then: `RAZORPAY_PROVIDER=razorpay`, `npm run billing -w @soyl/api -- sync-plans --dry-run`, `sync-plans`,
test purchases (UPI `success@razorpay`, card 4111 1111 1111 1111), `reconcile --dry-run`.

## Risks / follow-ups

- Migration number collision with ai-gateway (0008) — renumber at merge.
- `errors.ts` / `services.ts` / `app.ts` / `package.json` exports are also touched by ai-gateway: textual
  merge conflicts expected, no semantic ones.
- The stub cannot prove Razorpay's exact Checkout behaviour (UPI AutoPay mandate timing, `authenticated`
  without an immediate charge for future-start subscriptions); rerun the flows in test mode (D-010).
- Webhook event-id header is unsigned; harmless by design (re-fetch), noted in ADR-016.
- `docs/platform/STATUS.md`, `OWNER_ACTIONS.md` (OA-04 detail), `ARCHITECTURE.md` §11.2 / §19 (new
  `RAZORPAY_PROVIDER`, `RAZORPAY_WEBHOOK_SECRET_PREVIOUS`, `RAZORPAY_API_BASE_URL`) and
  `platform/db/README.md` (migration list) are the Lead's files — please update.
