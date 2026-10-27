# ADR-016: Billing with Razorpay — purchases, webhooks, entitlements, reconciliation, consent

- Status: accepted (billing-razorpay M4, 2026-10-27)
- Related: CONTEXT §5–§7, §12; ARCHITECTURE §4.1 (billing row), §6 (billing tables), §11.2, §19; threat model AC-09, AC-10, AC-17, AC-22; findings F-019, F-020; requirements AUTH-12, API-6, API-8, API-13..API-16, DB-1, DB-2, GEN-1, GEN-3; D-003, D-014, D-031; OA-04, OA-08; ADR-003 (pg-boss), ADR-013 (AI gateway, credits). (Numbered 016: ai-gateway took 013–015.)

## Context

Only AI is paid (CONTEXT §5, §7): Plus and Pro monthly/yearly (Razorpay Subscriptions API, UPI AutoPay
and cards), and a one-time Board Exam Pass valid until 31 March 2027 23:59:59 IST (Orders API). Prices
live in `platform/shared/config/plans.ts`, GST-inclusive, in paise. Learning and tests are never
paywalled. `BILLING_ENABLED` decides whether purchases are open; production is dark with it off (D-003,
D-031). There are no Razorpay keys yet (OA-04), so everything must run against a faithful stand-in and
switch to Razorpay test mode by configuration only.

Money changes state outside our process (the payer in Checkout, Razorpay's renewal scheduler, refunds
from the dashboard). Webhooks can be forged (AC-09), replayed, duplicated, delayed or reordered, and
the browser's Checkout success callback is attacker-controlled (AC-10, F-020: the marketing site's
Future Builders flow trusts it today). Entitlement must follow a payment within 60 s, and the credits
for a new plan must apply the same day (ARCHITECTURE §11.2).

The accounts are children's. D-014 keeps consent-gated features off until consent is `granted`, and
production runs with `CONSENT_PROVIDER=unavailable` (D-031: nobody can be granted yet).

## Decision

1. **One way to change billing state: re-fetch, bind, apply** (`api/src/billing/sync.ts`). Webhooks,
   the post-Checkout refresh, the cancel endpoint, nightly reconciliation and the replay CLI all call
   `syncOrder` / `syncSubscription` / `syncPayment`, which
   1. lock our row (`orders` / `subscriptions` `FOR UPDATE`) so concurrent events for one entity serialise;
   2. **re-fetch** the entity (and its payments / invoice) from the Razorpay API — the event body is
      only a pointer (F-019);
   3. **bind** it to the record we created for that student: amount, currency, receipt, the Razorpay
      plan id the subscription was created on (`subscriptions.razorpay_plan_id`), the price at creation
      (`subscriptions.amount_paise`; every captured charge must equal it), and our notes
      (`app=soyl-academy`, `soyl_user_id`, `soyl_plan`, `soyl_interval`). A mismatch is **rejected**:
      the savepoint is rolled back (no partial state), a `security=true` event is logged, the webhook is
      recorded with `outcome=rejected` and answered 200 (a payload that will never bind must not be
      retried for 24 h);
   4. write Razorpay's **current** state and derive the entitlement from it.

   Because state comes from Razorpay at processing time, event order does not matter (charged before
   activated, a stale `halted` after a recovery) and duplicates or replays are harmless — this is the
   "state precedence, not arrival order" rule of AC-09. Objects without our notes / rows (other
   Razorpay products on the account, such as Future Builders) are `ignored`.

2. **Webhook endpoint** `POST /v1/webhooks/razorpay`. Its own Fastify context with a Buffer body parser
   (256 KB), so `X-Razorpay-Signature` is verified as hex HMAC-SHA256 over the **raw bytes**, in constant
   time, against the current and previous secret (rotation, AC-22), **before** `JSON.parse` and before any
   database work. Policy: guests, `csrf=false` (the only AUTH-12 exemption; the route-policy test pins it),
   IP rate limits, edge secret required (it arrives through the web proxy like every `/v1` call).
   Exactly-once: one transaction takes `pg_advisory_xact_lock(event id)`, checks
   `webhook_events(provider, event_id)`, applies the event, and INSERTs the event row (payload, outcome,
   entity id, `processed_at`) last — `webhook_events` stays append-only for `soyl_app` (DB-1), and the
   UNIQUE index is the backstop. A Razorpay API failure aborts the transaction → 503, nothing recorded,
   Razorpay retries. Handled: `subscription.{authenticated,activated,charged,pending,halted,cancelled,
   completed,updated,paused,resumed}`, `payment.{authorized,captured,failed}`, `order.paid`,
   `refund.{created,processed,failed}`; anything else is recorded as `ignored`. The event-id header is
   not signed; re-sending a captured body under a new id only re-applies Razorpay's current state.

3. **The browser never decides** (AC-10, F-020). `POST /v1/billing/subscriptions` and
   `POST /v1/billing/orders` create the Razorpay object (server-side price from plans.ts, our notes) and
   return Checkout parameters; nothing is granted. No endpoint accepts `razorpay_payment_id` /
   `razorpay_signature`: after Checkout's `handler` fires, the web calls `POST /v1/billing/refresh`
   (empty body; anything else is 400) which re-syncs the student's own open orders/subscriptions from
   Razorpay, then reads `GET /v1/me/subscription`. Entitlement therefore lands within seconds through
   either the webhook or the refresh, well inside 60 s, and the nightly reconciliation catches anything
   both missed.

4. **Entitlements.** One `entitlements` row per subscription (extended each period) and per order.
   Order: `valid_from = now`, `valid_until = plans.ts validUntil` (2027-03-31T18:29:59Z), granted only for
   a captured, not fully refunded payment of exactly the order amount; a full refund revokes, a partial
   refund keeps it. Subscription: `active`/`pending` with a paid period → until `current_end + 48 h`
   (`BILLING.renewalGraceHours`: the renewal webhook arrives after the boundary; `pending` means Razorpay
   is retrying); `cancelled`/`completed` → until `current_end` (a paid period is honoured, no grace);
   `halted`, `expired`, unpaid, or latest charge fully refunded → revoked. `paused` (we never pause) is
   treated as `halted`. `planFor(user, at)` = the in-force entitlement with the most daily credits
   (`valid_from ≤ at ≤ valid_until`, not revoked at `at`), else `free`.

5. **Contract with the AI gateway (ADR-013).** `BillingEntitlementService` (re-exported from `ai/entitlements.ts`) implements the gateway's
   `EntitlementService` (`name`, `planFor(userId, at)`; never throws for "no plan"; throws only when the
   database is unreachable). `AiServices` uses it by default (`createAiRuntime` no longer returns a placeholder; tests inject `StaticEntitlementService`), and `createServices` calls `billing.setCreditHook(ai.credits)`. When a sync makes a plan newly in force, after commit the billing service
   calls the `CreditTopUpHook` (`CreditService.applyPlanChange(userId, plan)`) so today's grant is topped
   up to the new plan's daily credits. A failing hook never fails the payment path: the credits service
   also tops up lazily because `planFor` already returns the new plan.

6. **Purchase rules.** Student role only. One purchase at a time per student
   (`pg_advisory_xact_lock`); an unpaid order/subscription for the same choice younger than 30 min is
   returned again instead of a new one; a second live subscription, or a plan the current entitlement
   already covers (e.g. Plus while holding the Board Exam Pass), is `409 already_subscribed`; the Board
   Exam Pass is `409 plan_unavailable` from its end date. Subscriptions are created with
   `customer_notify=0`, `total_count` 60 monthly / 5 yearly, `expire_by` = 24 h. Cancel: at cycle end for
   a paid subscription (`cancel_at_period_end=true`, plan until the period ends), immediately for an
   unpaid one. Checkout gets no `prefill`: the account is the child's, the payer is the parent.

7. **`BILLING_ENABLED` is a purchase switch, not a billing switch.** Off → the two purchase endpoints
   answer `403 billing_disabled` ("Plans cannot be bought yet. Lessons, practice and tests are free for
   everyone.") and `GET /v1/plans` reports `purchasable=false`. Webhooks, refresh, cancel, the
   subscription view and the jobs keep working whenever a provider is configured, so turning purchases
   off never strands a paying subscriber.

8. **Consent (D-014).** Purchases are for a parent. Until the account's consent status is `granted`,
   both purchase endpoints answer `403 consent_required` ("A parent or guardian needs to give consent
   before a purchase.") and a `consent_denied` security event (`feature=purchases`) is logged; a consent
   outage is `503 consent_unavailable` (API-16, fail closed). With `CONSENT_PROVIDER=unavailable`
   (production today) every account is `pending`, so **nobody can buy** even if `BILLING_ENABLED` were
   switched on — billing cannot open before the consent system exists (OA-08). Cancel, refresh, the
   subscription view and webhooks never depend on consent: a parent must always be able to stop a
   subscription. The check lives in the billing service because `CONSENT_FEATURES`
   (shared/config/security.ts) has no `purchases` feature; the Lead may add one and move the check to
   the route policy. A parent account buying for a linked child is deferred until verified
   `guardian_links` exist (OA-08); entitlements always belong to the student account.

9. **Plans sync.** `npm run billing -w @soyl/api -- sync-plans [--dry-run]` mirrors plans.ts into the
   `plans` table and ensures one Razorpay plan per recurring price, matched by notes (app, plan,
   interval) **and** amount, currency and period, so re-runs create nothing and a lost database re-links.
   Razorpay plans are immutable: a price change creates a new Razorpay plan for new subscribers; existing
   subscriptions keep the plan (and price) they were created with, which is what binding checks.

10. **Reconciliation and expiry** (worker, ADR-003). `billing.reconcile` (22:00 UTC = 03:30 IST) runs every
    candidate (non-terminal subscriptions, anything touched in 40 days, orders of the last 40 days)
    through the sync in dry-run mode; any change is drift. Drift that touches payments, refunds,
    entitlements or paid periods, or fails binding, is an **alert** (error log `billing_drift` with
    `alert=true` for the Log Analytics rule, plus an `audit_log` row per entity); the rest (an abandoned
    checkout that Razorpay expired) is informational. Then the drift is repaired by applying Razorpay's
    state; rejected entities are never repaired automatically. `billing.expire` (hourly) marks unpaid
    orders older than 24 h `expired` and re-syncs subscriptions whose period ended without a renewal
    webhook. The worker uses only the real Razorpay client: the stub is per process.

11. **Razorpay behind an interface** (`billing/razorpay/`). `RazorpayHttpClient` (Basic auth, 10 s
    timeout, zod-validated responses, error bodies never surfaced, ids validated before they reach a URL)
    and `RazorpayStub` (Razorpay's entity shapes, id prefixes and state machines; `simulate*` methods play
    the payer and the scheduler and return the webhooks Razorpay would send) plus `signWebhook`. Config:
    `RAZORPAY_PROVIDER=stub|razorpay|disabled` (stub default locally, disabled elsewhere; stub refused in
    prod, GEN-3), `RAZORPAY_KEY_ID` (live keys only with `APP_ENV=prod`), `RAZORPAY_KEY_SECRET`,
    `RAZORPAY_WEBHOOK_SECRET` (+ `_PREVIOUS`), `RAZORPAY_API_BASE_URL`. Public development placeholders
    are refused outside local/test (GEN-1). Test-mode keys switch the real client on with no code change.

12. **Schema** (migration `0009_billing`, reversible, after ai-gateway's `0008_ai_gateway`): `subscriptions.razorpay_plan_id`, `amount_paise`
    (CHECK > 0), `paid_count`, `ended_at`; `webhook_events.outcome` (`applied|ignored|rejected`, CHECK) and
    `entity_id` (indexed, for incident lookups). No new tables.

## Consequences

- Every webhook costs one to three Razorpay API reads inside a transaction; at beta volumes (hundreds of
  events a day) this is negligible, and it is what makes ordering, duplicates and forgery harmless.
- A Razorpay outage delays entitlement (503 → Razorpay retries for 24 h; refresh and reconciliation also
  retry) but never grants wrongly.
- A price change in plans.ts needs `sync-plans` before new subscriptions can start on the new price
  (`billing_unavailable` + `plans_not_synced` log until then). Existing subscribers keep their price.
- Production cannot sell anything until both `BILLING_ENABLED=true` and a consent provider that can
  return `granted` exist — intended.

## Alternatives considered

- **Trust the event body, order by `created_at`.** Rejected: a leaked webhook secret or a replayed body
  could then grant plans, and Razorpay does not guarantee ordering. Re-fetch costs little.
- **Verify the Checkout `razorpay_signature` server-side and grant on it** (AC-10 allows this with a
  re-fetch). Not needed: the refresh endpoint already re-fetches without taking any client data, which
  removes the signature-replay surface entirely.
- **UPDATE `webhook_events.processed_at` after processing.** Rejected by DB-1 (append-only); the single
  INSERT at the end of the processing transaction gives the same exactly-once guarantee.
- **Gate purchases with the route-level consent policy.** Would need a new `CONSENT_FEATURES` entry in a
  file billing does not own; kept in the service with the same 403/503 behaviour (see 8).
