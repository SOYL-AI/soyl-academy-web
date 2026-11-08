# backend-api + web-platform (admin) — Future Builders registrations on the platform — 2026-11-08

Status: done (branch `platform/fb/backend`; not pushed or merged — the Lead integrates and deploys)

Replaces the Google Sheet: Future Builders (FB) paid registrations and enquiries are stored in Postgres, emailed
(parent confirmation + optional staff notice) and shown to superadmins at `/admin` → "Future Builders". Design and
alternatives: [ADR-027](../adr/027-future-builders-registrations-on-platform.md).

## What changed

**DB** (`platform/db`)
- Migration **`0017_future_builders`** (+ hand-written `.down.sql`, drizzle meta snapshot): `fb_enrollments`
  (unique `razorpay_payment_id`, unique gap-free receipt `FB-<cohort year>-NNNNNN`, integer paise, `currency='INR'`,
  UTC timestamps, `email_status pending|sent|failed`, attempts, last error class, staff-notified time; indexes on
  paid_at, (email_status, paid_at), order id) and `fb_leads` (kind `callback|notify|waitlist`, indexes on created_at,
  (kind, created_at), (phone, kind, created_at)). Schema `schema/future-builders.ts`; PII.md rows; README migration list;
  schema test table count 77 → 79. Renumber at integration if another 0017 merges first.

**API** (`platform/api/src/future-builders/`: `schemas.ts`, `service.ts`, `routes.ts`, `email.ts`, `programme.ts`)
- `POST /v1/ingest/future-builders/enrollments` → 200 `{enrollmentId, receiptNumber, created}`; idempotent on
  `razorpayPaymentId` (advisory-locked transaction; concurrent checkout + webhook reports give one row, one email).
- `POST /v1/ingest/future-builders/leads` → 201 `{leadId}`; same phone + kind + form within 24 h returns the first lead.
- Ingest auth: edge secret (403 without) **and** `x-soyl-ingest-key` = `FB_INGEST_KEY` / `FB_INGEST_KEY_PREVIOUS`
  (constant-time; 401 `ingest_auth_failed`, security event `ingest_auth_failed`), checked before the body is parsed.
  Per-IP bucket `fb.ingest.ip` (60/min). AUTH-12 exempt like the Razorpay webhook (route-policy test updated).
- Email: parent confirmation (HTML + text, platform email style; receipt / **Bill of Supply** wording from
  `INVOICING` while `gstRegistered` is false; IST date; ₹ en-IN; programme April–May 2027; next steps: WhatsApp within
  24 h, joining instructions, kit; WhatsApp +91 70225 09965; refund-policy link; reply-to `FB_REPLY_TO`, default
  `INVOICING.seller.email` = outreach@soyl.cloud). Sent after commit in the background; failure → row `failed` + log
  `fb_confirmation_email_failed` (`alert: true`), never a failed ingest. Optional staff notice to `FB_NOTIFY_EMAIL`.
  **No PDF** (the invoice renderer is built around platform invoices; the email carries every Bill of Supply field).
- Admin (superadmin policy, bucket `admin.fb.user`, every call audited with filters/counts only):
  `GET /v1/admin/future-builders/enrollments?from&to&emailStatus&limit&cursor` (+ summary count/totalPaise/emailFailed),
  `GET …/enrollments/export` (CSV), `POST …/enrollments/:id/resend`, `GET …/leads?from&to&kind&limit&cursor`,
  `GET …/leads/export` (CSV). `from`/`to` are IST days. `/v1/admin/me` adds section `future_builders` for superadmins.
- Shared bits: `config.ts` (`FB_INGEST_KEY` required outside local/test, `FB_INGEST_KEY_PREVIOUS`, `FB_NOTIFY_EMAIL`,
  `FB_REPLY_TO`), problem code `ingest_auth_failed`, `EmailMessage.replyTo` (ACS `replyTo`), two buckets in
  `platform/shared/config/security.ts`, `openapi.json` + `shared/api-client` regenerated (component order reshuffled
  by the generator), api-client type exports `FbEnrollment`, `FbEnrollmentsPage`, `FbLead`, `FbLeadsPage`, `FbResendResult`.

**Web** (`components/platform/admin/`)
- `future-builders/FutureBuildersPanel.tsx` (lazy chunk) + `future-builders/model.ts`: summary tiles (registrations,
  total collected ₹, failed confirmation emails, enquiries), IST date / email-status / kind filters, Registrations table
  (receipt, paid at IST, parent, student, email, phone, grade, amount ₹, offer, coupon, payment id, email status,
  Resend) and Enquiries table, "Load more", "Download CSV" (the server export through the proxy). Tab "Future Builders"
  in `AdminApp.tsx` / `analytics/model.ts` `tabsFor`.

## How to verify

```
cd platform
npm run typecheck
npm test -w @soyl/db                         # incl. migrations up → down → up on fresh and seeded DBs, PII inventory
cd api && npx vitest run test/future-builders.test.ts test/route-policy.test.ts test/unit.test.ts test/prod-auth.test.ts
npm run build                                # (from platform/)
# root
npm run lint
npx vitest run --config components/platform/vitest.config.mts components/platform/__tests__/admin-future-builders.test.tsx
```

Gate results (2026-11-08, Windows 11, Node 24):
- `npm run typecheck` (all platform workspaces): pass. `npm run build`: pass.
- `npm test -w @soyl/db`: 18 files; the one failure (PII row missing `fb_enrollments.email_sent_at`) was fixed and
  `schema.test.ts` + `migrations.test.ts` (up → down to 0 → up on fresh and seeded DBs) re-run green (14 passed, 1 skipped:
  pgvector, CI only).
- API: `future-builders` + `route-policy` 25/25 (snapshot updated: only the 7 new routes, reviewed); `unit` + `prod-auth`
  pass; `staff-sign-in`, `http-pipeline`, `invoices`, `email-otp`, `admin-analytics`, `content` 103/103.
  The full API suite was not run (8 GB machine; the files above cover everything this change touches).
- Root: `npm run lint` clean. `npm run test:platform-web` 463/464; the one failure was
  `avatars-assets.test.tsx` (untouched file, timing under load) and passes alone (93/93); the new
  `admin-future-builders.test.tsx` 7/7.
- Marketing regression: not run (no marketing files changed; `/admin` is a platform page).

## Smoke test after deploy (Lead)
```
# from a machine with the secrets (never from a browser); API origin = the Container App / Front Door origin
curl -sS -X POST "$API/v1/ingest/future-builders/leads" -H "x-soyl-edge-auth: $EDGE" -H "content-type: application/json" \
  -d '{"kind":"callback","parentName":"Smoke Test","phone":"+919999999999","source":"smoke"}'          # → 401 ingest_auth_failed
curl -sS -X POST "$API/v1/ingest/future-builders/leads" -H "x-soyl-edge-auth: $EDGE" -H "x-soyl-ingest-key: $FB_KEY" \
  -H "content-type: application/json" -d '{"kind":"callback","parentName":"Smoke Test","phone":"+919999999999","source":"smoke"}'  # → 201 {leadId}
```
Then a ₹1 / test-mode registration through the marketing checkout (or a hand-made enrollment POST with a fake
`pay_SMOKE…` id and your own email) → 200 `{created:true}`, the confirmation email arrives (check reply-to and
Bill of Supply lines), `/admin` → Future Builders shows it; repeat the POST → `created:false`, no second email.
Delete smoke rows by hand afterwards (`DELETE FROM fb_leads WHERE source='smoke'`; a smoke enrollment uses a receipt
number, so prefer a test-mode payment on staging for that part).

## Tests added
- `platform/api/test/future-builders.test.ts`: ingest auth (no edge 403; no/wrong key 401; edge secret is not a key;
  key rotation), validation (15 cases), create + email content + HTML escaping + staff notice, idempotency (sequential
  and concurrent: one row, one email), mismatch log, gap-free receipts under concurrency, email failure → resend →
  audit, failed resend keeps `sent`, leads (create, optional fields, dedupe, validation), per-IP limit, admin role
  enforcement (guest 401, student/reviewer/plain admin 403), filters/totals/paging, CSV (formula guard), audit rows
  without personal data, units (receipt year, IST/grade/phone/CSV formatting, GST-mode wording).
- `route-policy.test.ts`: AUTH-12 exemption list now names the two ingest routes; ingest without key → 401.
- `unit.test.ts`: FB_INGEST_KEY in the GEN-1 dev-default loop; short key / key = edge secret / bad notify email refused.
- `components/platform/__tests__/admin-future-builders.test.tsx`: model helpers, tab gating, panel (tiles, tables,
  resend, filters, CSV download), opening from the admin tabs.

## Known gaps / follow-ups
- No automatic retry sweep for failed confirmation emails (staff resend from /admin). Add a worker sweep if needed.
- No PDF receipt (see ADR-027 §5).
- Erasure requests for FB rows are manual (not linked to accounts).
- `platform/e2e/tests/platform/web/admin.spec.ts` iterates named tabs and does not visit "Future Builders" yet
  (qa-e2e path; add it to get the 360 px overflow + axe check on the new tab).
- `docs/platform/adr/README.md` index row for ADR-027 not added (outside owned paths).

## Decisions made
- ADR-027 (proposed). `FB_INGEST_KEY` is required outside local/test (GEN-1, like the edge secret).

## Needs from owner / Lead
- Create Key Vault secret `fb-ingest-key` (≥ 32 random chars) per env and add
  `{ secretName: 'fb-ingest-key', envName: 'FB_INGEST_KEY', apps: ['api'] }` to `appSecrets` in
  `platform/infra/params/{dev,stg,prod}.bicepparam` **before** deploying this API revision (it refuses to start without
  it). Give the same value to the marketing site on Vercel.
- Optional: `FB_NOTIFY_EMAIL` (staff inbox), `FB_REPLY_TO` (default outreach@soyl.cloud).
- Production must send email through ACS (`EMAIL_PROVIDER=acs`, already the case for sign-in codes).
