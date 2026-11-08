# ADR-027: Future Builders registrations and enquiries on the platform (Postgres + admin), replacing the Google Sheet

- Status: proposed (backend-api + web-platform, 2026-11-08, branch `platform/fb/backend`; the Lead integrates)
- Related: ADR-005 (same-origin proxy, edge secret D-016), ADR-024 (invoices, Bill of Supply wording, D-046), D-045 (superadmin capability), ADR-026 (staff sign-in), DB-5 (PII inventory), DB-8 (no personal data in audit rows)

## Context

Future Builders (FB) is the paid summer camp sold on the marketing site (`/future-builders`). Until now the marketing
server verified Razorpay payments and wrote each registration, and each "call me back" / "notify me" / waitlist
enquiry, to a Google Sheet. Registrations open now for a Diwali offer, and the owner wants them on the platform:
stored in the platform database, visible to staff in the superadmin admin panel, and every paid registration
confirmed to the parent by a professional email at once.

Constraints:

- The marketing site keeps Razorpay checkout and payment verification in its own server routes for now: it already
  holds the live Razorpay keys on Vercel, the checkout works, and the platform's own billing (ADR-016) is switched off
  (`BILLING_ENABLED=false`) and built around platform accounts, which FB parents do not have.
- The platform API is reachable only through the edge secret (D-016). The browser-facing proxy `/api/platform/*`
  forwards only allow-listed request headers (`FORWARDED_REQUEST_HEADERS`) and adds the edge secret itself, so a
  browser can reach every `/v1` route that has no other authentication.
- No Google Sheet anywhere afterwards.

## Decision

1. **Two tables** (migration `0017_future_builders`): `fb_enrollments` (one row per Razorpay payment id, unique;
   integer paise, `currency = 'INR'`, UTC timestamps; a gap-free receipt number `FB-<cohort year>-NNNNNN`; the
   confirmation-email state `pending | sent | failed`, attempts, last error class, staff-notified time) and `fb_leads`
   (kind `callback | notify | waitlist`, parent name, phone, optional student/email/grade, form slug). Not linked to
   platform accounts. PII.md lists every personal column (registrations: 8 years with payment records, pending OA-14;
   enquiries: 1 year, pending the owner's sign-off).
2. **Server-to-server ingest** (contract agreed with the marketing agent; do not change without the Lead):
   `POST /v1/ingest/future-builders/enrollments` (200 `{enrollmentId, receiptNumber, created}`, idempotent on
   `razorpayPaymentId`) and `POST /v1/ingest/future-builders/leads` (201 `{leadId}`).
3. **Ingest auth = edge secret AND a second shared key.** `x-soyl-edge-auth` (every `/v1` route; 403 without it) plus
   `x-soyl-ingest-key` equal to `FB_INGEST_KEY` (or `FB_INGEST_KEY_PREVIOUS` while rotating), compared in constant time
   (SHA-256 both sides + `timingSafeEqual`, the edge-secret routine); 401 `ingest_auth_failed` when missing or wrong,
   checked in a route `onRequest` hook, so before the body is parsed. The edge secret alone is not enough because the
   browser proxy attaches it to every request; the ingest key is a header the proxy never forwards, so it can only come
   from a server that holds the secret. Config refuses a key shorter than 32 characters, the public dev default outside
   local/test, and a key equal to the edge secret; like the edge secret it is required outside local/test (Key Vault
   secret `fb-ingest-key` in Azure). The routes are AUTH-12 (Origin) exempt, as the HMAC-verified Razorpay webhook is:
   no browser can produce the key. A per-IP bucket `fb.ingest.ip` (60/min) applies before the key check.
4. **Idempotency and numbering.** The insert runs in a transaction under `pg_advisory_xact_lock`, re-reads the payment
   id, and takes `max(receipt_seq) + 1` for the cohort year: the checkout callback and the webhook safety net reporting
   the same payment (even concurrently) give one row, and receipt numbers have no gaps (they are also the Bill of Supply
   serial). A repeat report returns the first record with `created: false` and sends nothing; one whose order id or
   amount differs is logged as `fb_enrollment_mismatch` (ids only) and the first is kept.
5. **Email after commit, never failing the ingest.** On create the parent's confirmation (HTML + text, platform email
   style, reply-to `FB_REPLY_TO`, default the contact address on invoices) and, if `FB_NOTIFY_EMAIL` is set, a short
   staff notice are sent in the background through the platform email provider (ACS). A failure marks the row `failed`
   with the error class and logs `fb_confirmation_email_failed` with `alert: true`; staff resend from the admin panel.
   While `INVOICING.gstRegistered` is false the email itself is the receipt and **Bill of Supply** (supplier name and
   address, serial number, date, recipient, description, amount, "not registered under GST" note, computer-generated
   note), worded as ADR-024's documents are. **No PDF**: the invoice renderer is built around platform invoices (plan
   keys, place of supply, account links), so a PDF would be a detour; the email carries every Bill of Supply field.
6. **Admin**: superadmin only (role admin + `superadmin` capability + staff MFA when configured), bucket
   `admin.fb.user`; lists with IST date range, email-status / kind filters, keyset paging and totals; CSV exports
   (formula-injection guarded); resend. Every call writes `audit_log` (filters and counts, never personal data). The
   web adds a "Future Builders" tab (`/v1/admin/me` section `future_builders`) to `/admin`.

## Why Razorpay stays on Vercel for now

Moving checkout to the platform needs platform billing on (BILLING_ENABLED, live-key go-live runbook), FB products in
the plan catalogue, and guest (account-less) orders, none of which exist today, and the Diwali offer is live now. The
marketing server already verifies the signature and fetches the payment from Razorpay (amount, order, status) before
it calls the ingest, so the platform receives only verified payments. A later ADR can move checkout behind the
platform's billing module; the tables keep the Razorpay ids needed to reconcile.

## Webhook safety net

If the parent closes the tab after paying, the checkout callback never reaches the marketing server. The marketing
server's Razorpay webhook (`payment.captured`) then posts the same payment with `source: 'webhook'`. Idempotency on
the payment id makes the order of the two reports irrelevant: one row, one email, whichever arrives first. The marketing
side must still answer the webhook 2xx only after the ingest returned 200, so Razorpay retries while the API is down.

## Alternatives considered

- **Keep the Google Sheet** (or write to both): personal data of children in a spreadsheet outside the platform's
  access control, retention and audit; the owner asked to replace it.
- **Edge secret only**: any browser could post fake registrations through `/api/platform/*` (the proxy adds the edge
  secret). Refused.
- **HMAC-signed body** (like Razorpay webhooks): stronger against replay, but a larger contract change for the
  marketing agent today; the idempotency on the payment id already makes replays harmless, and the key travels only
  between two servers over TLS. Can be added later behind the same header.
- **Platform calls Razorpay itself to re-verify each payment**: needs the live Razorpay keys on the API, which is
  exactly the billing go-live this ADR avoids for now.
- **PDF receipt**: deferred (see 5).

## Consequences

- New env/config: `FB_INGEST_KEY` (required outside local/test; Key Vault), optional `FB_INGEST_KEY_PREVIOUS`,
  `FB_NOTIFY_EMAIL`, `FB_REPLY_TO`. The API refuses to start in dev/stg/prod without `FB_INGEST_KEY`, so the Key Vault
  secret and the Container App reference must exist before this revision deploys.
- Shared config: two rate-limit buckets in `platform/shared/config/security.ts`; problem code `ingest_auth_failed`;
  `EmailMessage.replyTo` (ACS `replyTo`).
- The route-policy table and the AUTH-12 exemption list grow by the two ingest routes (test updated and reviewed).
- Erasure: registrations and enquiries are not tied to accounts, so `DELETE /v1/me` does not reach them; support
  handles requests by hand until a tool exists.
- An email that failed before a process crash stays `pending`/`failed` until staff resend; there is no automatic retry
  sweep yet (follow-up if volume grows).
