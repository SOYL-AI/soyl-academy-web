# Runbook: Razorpay webhook incidents (replay, resync, reconcile)

Design: ADR-014. Code: `platform/api/src/billing/` (CLI in `cli.ts`). Run commands from `platform/`.

Every command below re-fetches state **from Razorpay** and applies it; nothing is ever taken from a
webhook body or from the operator's input. They are safe to run more than once. Non-dry-run `replay`
and `resync` write an `audit_log` row (`billing.webhook.replay`, `billing.webhook.replay_import`,
`billing.resync`); reconciliation writes `billing.reconcile.repaired` / `.rejected`.

## 0. Environment

The CLI needs the same settings as the API for the environment you are fixing:

```bash
export APP_ENV=stg                       # or prod
export DATABASE_URL='postgres://<host>/<db>?sslmode=require'
export DATABASE_AUTH=entra               # managed identity / az login token (INFRA-2)
export RAZORPAY_PROVIDER=razorpay
export RAZORPAY_KEY_ID=rzp_test_...      # Key Vault: razorpay-key-id
export RAZORPAY_KEY_SECRET=...           # Key Vault: razorpay-key-secret   (never paste into chat/git)
export RAZORPAY_WEBHOOK_SECRET=...       # Key Vault: razorpay-webhook-secret
```

Output is one JSON object per line. Exit codes: 0 ok, 1 error, 2 usage, 3 drift/rejection found.
Always start with `--dry-run`.

## 1. Symptoms → what to run

| Symptom | First command |
|---|---|
| A parent paid but the student is still on Free | `npm run billing -w @soyl/api -- resync --order order_XXX --dry-run` (pass) or `--subscription sub_XXX` |
| Many payments not applied (endpoint was down, secret rotated wrongly, Razorpay disabled the webhook) | §3 reconcile |
| Alert `billing_drift` (`alert=true`) from the nightly job | §3 reconcile `--dry-run`, then §4 for each `rejected` item |
| Alert on `webhook_signature_invalid` spikes | §5 (secret rotation / forgery) |
| Razorpay dashboard shows failed webhook deliveries | §2 replay from the dashboard export, or simply "Resend" in the dashboard after the endpoint is healthy |

Find the ids: the student's `GET /v1/me/subscription` (support view), or

```bash
npm run billing -w @soyl/api -- events --entity order_XXX            # what we received for an entity
npm run billing -w @soyl/api -- events --outcome rejected --limit 50  # binding failures
npm run billing -w @soyl/api -- events --type subscription.halted
```

(`events` prints ids, types, outcomes and times — never payloads, which hold payer contact details.)

## 2. Replay one event

A **recorded** event (we received it; you want it applied again, e.g. after fixing a bug):

```bash
npm run billing -w @soyl/api -- replay --event-id <X-Razorpay-Event-Id> --dry-run
npm run billing -w @soyl/api -- replay --event-id <X-Razorpay-Event-Id>
```

No second `webhook_events` row is written (the event id is UNIQUE); an audit row is.

An event that **never arrived**: in the Razorpay dashboard (Settings → Webhooks → the endpoint →
the delivery), copy the request body into a file and note the event id, then

```bash
npm run billing -w @soyl/api -- replay --file event.json --event-id <id> --dry-run
npm run billing -w @soyl/api -- replay --file event.json --event-id <id>
```

The file only says *which* entity to look at; amounts and states come from Razorpay. The event is then
recorded, so a later real delivery of the same id is a no-op. Delete the file afterwards (it contains
payer contact details).

Alternatively, once the endpoint is healthy, "Resend" in the Razorpay dashboard delivers it normally.

## 3. Reconcile everything

```bash
npm run billing -w @soyl/api -- reconcile --dry-run            # report only
npm run billing -w @soyl/api -- reconcile                      # repair (same as the nightly job)
npm run billing -w @soyl/api -- reconcile --days 90 --dry-run  # look further back than 40 days
```

Each drift line shows the entity, `severity` (`alert` = money/entitlement, `info` = e.g. an abandoned
checkout Razorpay expired), `outcome` and field-level `changes` (`from` → `to`). `errors` lists entities
Razorpay did not answer for; re-run later.

## 4. A `rejected` entity (binding failure)

`rejected` means Razorpay's object no longer matches what we created for that student: amount, currency,
receipt, Razorpay plan id, or our notes (`soyl_user_id`, `soyl_plan`, `soyl_interval`, `app`). Nothing
was granted. **Do not "fix" it by editing our rows.**

1. `events --entity <id>` and `resync --order|--subscription <id> --dry-run` → the `reason`
   (e.g. `order_amount_mismatch`, `notes_soyl_user_id_mismatch`, `subscription_plan_mismatch`).
2. Compare with the Razorpay dashboard. A mismatch nobody can explain is a **security incident**
   (possible key compromise): rotate `razorpay-key-secret` and `razorpay-webhook-secret` (§5), tell the
   owner, keep the audit rows.
3. If the parent really paid the right amount and the mismatch is ours (a bug), refund from the
   Razorpay dashboard and ask the parent to buy again after the fix; record the case in the incident log.

## 5. Webhook secret rotation

1. Generate a new secret; in Razorpay set it on the webhook; in Key Vault set
   `razorpay-webhook-secret` = new and `razorpay-webhook-secret-previous` = old
   (`RAZORPAY_WEBHOOK_SECRET` / `RAZORPAY_WEBHOOK_SECRET_PREVIOUS`); restart the API revision.
2. Both are accepted; logs show which one matched (`secretIndex` on `webhook_processed`).
3. After 24 h (Razorpay's retry window), remove the previous secret.

A burst of `webhook_signature_invalid` with no rotation in progress is someone probing the endpoint:
nothing is processed without a valid signature, so watch, and check the edge-secret logs
(`edge_auth_failed`) — the endpoint is only reachable through the web proxy.

## 6. Setting up the webhook (once per environment, OA-04)

Razorpay dashboard → Settings → Webhooks → Add:

- URL: `https://<host>/api/platform/v1/webhooks/razorpay` (staging host for test mode;
  `https://www.soylai.com/api/platform/v1/webhooks/razorpay` for live)
- Secret: the value of `razorpay-webhook-secret`
- Active events: `subscription.authenticated`, `subscription.activated`, `subscription.charged`,
  `subscription.pending`, `subscription.halted`, `subscription.cancelled`, `subscription.completed`,
  `subscription.updated`, `payment.authorized`, `payment.captured`, `payment.failed`, `order.paid`,
  `refund.created`, `refund.processed`, `refund.failed`

Then `npm run billing -w @soyl/api -- sync-plans --dry-run`, `sync-plans`, and a test-mode purchase of
each plan (UPI `success@razorpay`, card 4111 1111 1111 1111).
