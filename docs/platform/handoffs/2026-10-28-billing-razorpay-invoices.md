# billing-razorpay — invoices, credit notes and the billing readiness review — 2026-10-28

Status: **done** on branch `platform/billing-razorpay/invoices` (merged with `origin/platform/main` 877f5bd; not merged into platform/main, not deployed). Invoicing stays refused in production until the owner sends the registered-office street line (OA-22) and infra adds the `invoices` container (below). Payments and plans never depend on invoicing.

Design: [ADR-024](../adr/024-invoice-pdf.md). Owner decisions applied (2026-10-28, D-046): **not GST-registered** → "Bill of Supply" documents without GST lines and prices without "incl. GST"; numbering `SOYL/2026-27/000001` and `SOYL/CN/2026-27/000001`, gap-free per financial year (April–March, IST); seller SOYL AI Private Limited, trade name SOYL, Bengaluru 560043, Karnataka (29) (also the default place of supply), contact outreach@soyl.cloud (`lib/seo/config.ts` `SITE_CONTACT_EMAIL`); street line a required placeholder; PAN and CIN optional (printed when set).

## What changed

| Area | Files | Change |
|---|---|---|
| GST + config | `platform/shared/billing/gst.ts` (+test), `platform/shared/config/invoicing.ts` (+test) | Pure GST arithmetic (taxable = round(total × 100/118), tax = total − taxable; CGST/SGST with the odd paisa to CGST; IGST inter-state; not registered = no tax lines), IST financial year, document numbers, amount in words (Indian numbering), GSTIN check character, state codes. Config: `gstRegistered: false`, seller, SAC 999293 (for the CA), series, titles (`Bill of Supply` / `Tax Invoice` / `Credit Note`), delivery settings; `invoicingProblems()` lists what blocks production; `FIXTURE_SELLER` for tests. |
| DB | `platform/db/schema/billing.ts`, `migrations/0015_invoices{,.down}.sql` + `meta/0015_snapshot.json` + journal, `PII.md` ("Invoices" section + inventory rows), `README.md`, `test/invoices.test.ts`, `test/schema.test.ts` (75 → 77 tables) | `invoices`, `invoice_sequences`; `place_of_supply` / `buyer_name` on orders and subscriptions; triggers `soyl_invoices_guard` (no DELETE; tax content immutable) and `soyl_billing_buyer_anonymise` (erases buyer name/email when `users.deleted_at` is set). |
| Issue | `platform/api/src/billing/invoices/issue.ts`; `billing/sync.ts`, `webhooks.ts`, `reconcile.ts`, `service.ts`, `cli.ts`, `config.ts` (`INVOICING_ENABLED`), `scripts/billing.ts` | Documents are issued in the transaction that records a captured payment or a refund (webhook, refresh, cancel, reconcile, CLI); `SyncResult.invoices` are delivered after commit. One invoice per payment (advisory lock + partial UNIQUE); credit notes per refund step keyed by the cumulative refunded amount; numbers from `invoice_sequences` in the same transaction (gap-free). |
| PDF | `billing/invoices/pdf.ts`, `document.ts` | Built-in A4 PDF writer, **no new dependency** (ADR-024 §3); CGST Rule 46 / Rule 53 fields; tests read the text back. |
| Delivery + API | `billing/invoices/service.ts`, `routes.ts`, `delivery.ts`; `billing/routes.ts`; `services.ts`; `auth/senders/email.ts` (optional `attachments`, additive); `shared/config/security.ts` (bucket `admin.invoices.user`) | PDFs in the private `invoices` container via the existing `BlobStore`; email with the PDF attached (ACS `attachments[]`) and a link to /me/invoices; claim, backoff (10 min × 2ⁿ, 8 attempts, then an alert); admin resend. |
| Counters | `billing/sync.ts`, `service.ts`, `webhooks.ts` | `services.counters.observe('checkout_complete', plan)` after commit when a checkout's payment is first captured (an order's payment, a subscription's first charge; renewals and duplicate webhooks do not count). |
| Razorpay client | `billing/razorpay/{types,http,stub}.ts` | `fetchSubscriptionInvoices` (`GET /invoices?subscription_id=`), payment `email`; stub `payerEmail`. |
| Worker | `platform/worker/src/{billing-jobs,jobs,worker}.ts` (+tests) | `billing.invoices` every 10 min: issue what is missing, render missing/stale PDFs, send due emails. Reconcile/expire issue documents when invoicing is configured. |
| Web | `app/(platform)/me/invoices/page.tsx`, `components/platform/billing/{InvoicesClient.tsx,invoices.module.css}`, `components/platform/plans/{PlansClient.tsx,plans.module.css}`, `app/(platform)/plans/page.tsx`; tests `components/platform/__tests__/{invoices.test.tsx,m34-components.test.tsx}` | /me/invoices: list, PDF download, empty/guest/error states, tokens (light/dark), 360 px. /plans: "incl. GST" and "Prices include GST" only when `pricesIncludeGst`; optional **Invoice details** (State select defaulting to Karnataka, with a hint, + name) sent with the purchase. |
| Contract | `platform/api/openapi.json`, `platform/shared/api-client/{schema.gen.ts,index.ts}`, `platform/api/test/__snapshots__/route-policy.test.ts.snap` | `PlansResponse.pricesIncludeGst` is now `boolean` (was the literal `true`) + `defaultPlaceOfSupply`; checkout requests accept `placeOfSupply` (GST state code) and `buyerName`; 5 routes below. |
| Docs | `docs/platform/adr/024-invoice-pdf.md` (+ index; next free ADR 025), `OWNER_ACTIONS.md` (OA-22), `runbooks/billing-go-live.md` (§0 capture check, §5a invoicing, §6c smoke test) | |
| Tests updated, not weakened | `platform/api/test/billing-gates.test.ts`, `platform/e2e/tests/platform/web/plans.spec.ts`, `components/platform/__tests__/m34-components.test.tsx` | The "GST-inclusive" assertions now follow config (`pricesIncludeGst()` / the API flag) and a not-registered case was added. |

### Routes

| Route | Policy | Notes |
|---|---|---|
| `GET /v1/me/invoices` | member | own documents, newest first; served (empty) with billing off |
| `GET /v1/me/invoices/:id/pdf` | member | `application/pdf`, owner only (another user's id → 404) |
| `GET /v1/admin/invoices?from&to` | **superadmin** (admin + capability + TOTP), bucket `admin.invoices.user` | IST dates, ≤ 366 days |
| `GET /v1/admin/invoices/export?from&to` | superadmin | CSV, GSTR-1 style columns, formula-injection safe |
| `POST /v1/admin/invoices/:id/resend` | superadmin, CSRF | audit row `billing.invoice.resend` |

## For the Lead at integration

- **Migration number.** It is `0015_invoices` on this branch (after main's `0014_admin_analytics`). The credits/avatars branch also takes 0015: **whichever of the two merges second is renumbered** (rename `0015_invoices{,.down}.sql` → `0016_…`, regenerate the drizzle snapshot with `npm run generate -w @soyl/db -- --name invoices` on the merged schema, keep the hand-written down file and the trigger SQL at the end of the up file) and `test/schema.test.ts` table count adjusted.
- **/me link (one line, I did not edit `components/platform/me/**`):** in `MeClient.tsx`, next to the subscription / plan block: `<Link href="/me/invoices">Invoices and receipts</Link>`.
- **CONTEXT §7** ("GST-inclusive labels") and the "GST-inclusive" wording in ARCHITECTURE need a Lead edit (D-046 already supersedes them; CLAUDE.md was updated on main).
- **Proxy (optional, web-platform):** `content-disposition` is not in `PASSED_RESPONSE_HEADERS`; the /me/invoices link sets the file name with the `download` attribute, so nothing is broken.

## Billing readiness review (runbook + code against the stand-ins)

Walked `billing-go-live.md` and the code for: monthly / yearly / Board Exam Pass purchase → entitlement within 60 s, signature rejection, duplicate-event idempotency, failed / halted / cancelled flows, reconciliation. The existing suites cover each of these and pass (numbers below). Gaps found and fixed, each with a test:

1. **A subscription charge whose webhooks were all lost was never recorded.** Reconciliation only re-synced the subscription (paid_count and period, so the plan was extended) but never the payment, so no payment row and no invoice. Fix: `syncSubscriptionPayments` lists the subscription's Razorpay invoices and records any paid charge we do not have (`invoices.test.ts` "reconciliation issues the invoice for a payment whose webhooks never arrived (order and subscription charge)").
2. **A refund after an account purge was ignored** (`account_deleted`), so the payment's refund was never recorded and no credit note could be issued. Fix: `refundsOfDeletedAccount` updates the recorded payment and issues the credit note (no entitlement change) ("a refund after the account was purged is still recorded and gets its credit note").
3. **Payment capture setting (owner step, not code).** The platform grants only on a *captured* payment and never calls Razorpay's capture API. With manual capture on the live account, a purchase would stay "authorized" and be auto-refunded. Added as runbook §0.3.

Known gaps / follow-ups:
- `refund.failed` after a credit note was issued (Razorpay reverses `amount_refunded`): the credit note stays; a reversing document is not generated. Rare; handle manually with the accountant.
- Reconciliation repairs do not count `checkout_complete` (webhook, refresh and cancel paths do); the dashboard can still read completed checkouts from `payments`.
- A name typed in a non-Latin script cannot be printed (WinAnsi fonts); the checkout field accepts Latin letters only.
- `RAZORPAY_WEBHOOK_SECRET_PREVIOUS` is still not wired in Bicep (from the go-live handoff).
- D-044 risk stays open: at 150 credits/day a Pro student who maxes out costs ≈ ₹450/month against ₹299; confirm with real usage before selling plans.

## What the owner must provide (OA-22)

1. The **street line of the registered office**, exactly as on the certificate of incorporation (required; production refuses to issue until it is set).
2. Optional: **PAN** and **CIN** (printed when set).
3. Later: the **GSTIN** when the company registers — then also invoice / credit-note series of at most 16 characters (CGST Rules 46(b), 53(1A)(b); the approved `SOYL/2026-27/000001` is 19 characters, fine only while unregistered; `invoicingProblems` enforces this).
4. For the CA to confirm: SAC **999293** (alternative 998431/998439); the title "Bill of Supply" for an unregistered supplier (Rule 49 formally covers registered suppliers of exempt supplies; plain "Invoice" is the one-line alternative); 8-year retention.

## Remaining go-live steps (OA-21, OA-22, runbook)

1. 👤 Razorpay: Subscriptions product enabled; **automatic payment capture on** (§0.3); prices confirmed (§0.4).
2. 👤 Key Vault: `razorpay-key-id`, `razorpay-key-secret`, owner-generated `razorpay-webhook-secret` (OA-21, §1–2).
3. 🛠 `billingOn = true` deploy, `sync-plans` dry run → real → re-check (§3–5).
4. 👤 OA-22 street line (+ PAN/CIN) → 🛠 put into `invoicing.ts`, `npm test -w @soyl/shared`.
5. 🛠 infra-azure: private `invoices` container (no lifecycle deletion) + Blob Data Contributor for the API and worker identities; worker `EMAIL_PROVIDER=acs`, `ACS_ENDPOINT`, `EMAIL_FROM` + ACS sender role; `INVOICING_ENABLED` (api + worker), `'true'` only after step 4 (§5a).
6. 🛠 Deploy with the invoices migration (migrations job first).
7. 👤 At launch: register the webhook (17 events) (§6a); 🛠 `BILLING_ENABLED: 'true'` (§6b).
8. 👤🛠 Smoke test (§6c): Plus monthly purchase → plan within 60 s → bill of supply emailed and listed at /me/invoices → refund → credit note → superadmin CSV export.

## How to verify

```
cd platform
npm ci && npm run typecheck
npm test -w @soyl/shared
npm test -w @soyl/db
cd api && npx vitest run test/invoices.test.ts test/invoices-unit.test.ts test/billing-*.test.ts test/route-policy.test.ts test/content.test.ts test/openapi.test.ts
cd .. && npx vitest run --root worker test/billing-jobs.test.ts test/jobs.test.ts
npm run build && npm test -w @soyl/api
# repo root
npm run lint && npm run test:platform-web -- --maxWorkers=2 && npm run build
```

## Results (2026-10-29, on the merged branch, heavy jobs through _tools/heavy.sh)

| Gate | Result |
|---|---|
|  (platform) | clean |
|  | 16 files, **195 passed** |
|  (migration up/down incl. 0015_invoices, schema, PII inventory, invoices) | 17 files, **123 passed**, 1 skipped (pre-existing) |
| API targeted: invoices, invoices-unit, billing-gates/orders/subscriptions/ops/unit, route-policy, content (answer leak), openapi, admin-analytics | 10 files, **174 passed** |
|  | 12 files, **70 passed** |
|  (platform) | api + worker bundles built |
|  (full) | 42 files, **659 passed**, 1 skipped (pre-existing). An earlier full run (before the worker-test fix, same API code) summarised 41/42 files and 655 + 1 skipped of 660 without printing a failure line in my filtered log; the full rerun was green. |
| Repo root  | clean |
| Repo root > soyl-academy@0.1.0 test:platform-web
> vitest run --config components/platform/vitest.config.mts --maxWorkers=2

 RUN  v4.1.12 C:/Users/Prabhu/soyl-wt/invoices


 Test Files  18 passed (18)
      Tests  305 passed (305)
   Start at  02:54:09
   Duration  60.38s (transform 28.52s, setup 0ms, import 119.54s, tests 33.48s, environment 232.99s) | 18 files, **305 passed** |
| Repo root  | exit 0 (/me/invoices and /plans built) |
| gitleaks  | no leaks |

New tests:  (GST split for ₹199, ₹1,499, ₹2,499, ₹299, ₹499, ₹1 intra and inter-state; exhaustive reconciliation to ₹5,000; amount in words; FY rollover; GSTIN),  (owner values, production refusal while the street line is a placeholder, GST-mode rules),  (constraints, immutability, app role, gap-free rollback, deletion + purge),  (PDF structure and xref, Rule 46/53 fields read back, Bill of Supply / tax invoice / credit note, production refusal),  (checkout fields, one invoice per payment under duplicate webhooks, PDF in Blob + email attachment, credit notes incl. partial refunds reversing to the paisa and after an account purge, IGST, 20 concurrent payments gap-free, FY rollover at 1 April 00:00 IST, reconciliation backfill for orders and subscription charges, sweep backfill + email retry with backoff, production refusal, owner-only download (other user 404), billing off, account deletion keeps invoices and re-renders the PDF, superadmin list/CSV/resend and refusals, checkout_complete counter), worker  (sweep job + settings), web  and new PlansClient cases.


Decisions made: ADR-024 (built-in PDF writer, no new dependency; issue-in-transaction; gap-free sequences; retention triggers). Followed D-046 (Bill of Supply title) and D-045 (superadmin, counters).
Needs from owner: OA-22 (above).
