# ADR-024: Invoices, credit notes and their PDFs

Status: accepted (billing-razorpay, 2026-10-28; Lead review at integration)
Related: ADR-016 (billing, Razorpay), ADR-013 (blob abstraction), ADR-004 (Drizzle, reversible migrations), D-003, D-038, D-041, D-044, OA-04, OA-21, OA-22, PII.md "Invoices".

## Context

The owner (2026-10-28): "focus on the razorpay payments part … invoice generation once we start taking payments is also important". When paid plans go live, every successful payment needs a numbered document the payer receives and the student can download later, and every refund needs a credit note. The owner's answers the same day:

- SOYL AI Private Limited is **not GST-registered yet**: no GST is charged and prices must not say "incl. GST". The GST tax-invoice mode must still exist so registering is a config change plus a GSTIN.
- Numbering: `SOYL/2026-27/000001`, gap-free per financial year (April–March, IST); credit notes `SOYL/CN/2026-27/000001`.
- Seller: SOYL AI Private Limited, trade name SOYL, Bengaluru 560043, Karnataka (29). Still missing: the street line of the registered office (required) and the optional PAN and CIN.

## Decision

### 1. Data (migration `0015_invoices`; renumbered 0016 if the credits/avatars migration merges first)

- `invoices`: one row per document (`tax_invoice` | `credit_note`), amounts in integer paise (taxable, CGST, SGST, IGST, total; a CHECK makes them add up), place of supply (state code), a snapshot of the seller and of the GST mode, the line items, the buyer's optional name and email, Razorpay references, and delivery state (PDF path, email attempts/backoff/claim, sent time).
- `invoice_sequences`: one counter per series (`tax_invoice`, `credit_note`) and financial year. The issuing transaction increments it with `INSERT … ON CONFLICT DO UPDATE … RETURNING`: the row lock serialises issuers and a rolled-back transaction rolls its number back, so the series has **no gaps**.
- Exactly once: an advisory lock per payment; a partial UNIQUE index (one tax invoice per payment); credit notes keyed by the cumulative refunded amount (UNIQUE (invoice, credited_through_paise)).
- Retention: invoices are GST records (8 years). `user_id` is SET NULL at the purge; the row stays. A trigger refuses DELETE and any change to tax content (`soyl_invoices_guard`). A trigger on `users.deleted_at` erases the buyer's name and email at account deletion (`soyl_billing_buyer_anonymise`); the worker then re-renders the stored PDF without them.
- `orders`/`subscriptions` get `place_of_supply` and `buyer_name` (optional "Invoice details" at checkout on /plans).

### 2. When documents are issued

Inside the transaction that records a captured payment or a refund (`billing/sync.ts` → `invoices/issue.ts`): webhooks, the post-Checkout refresh, cancel, reconciliation, the CLI. Reconciliation also lists each subscription's Razorpay invoices, so a charge whose webhooks were all lost is recorded with its invoice (this closed a pre-existing gap: such charges extended the plan without a payment row). The worker's `billing.invoices` sweep (every 10 minutes) issues anything still missing from database state, renders PDFs and sends due emails.

GST arithmetic is pure and tested (`platform/shared/billing/gst.ts`): taxable = round(total × 100 / 118), tax = total − taxable; intra-state CGST + SGST (odd paisa to CGST), inter-state IGST; credit notes mirror the invoice and the last step reverses it to the paisa. In "not registered" mode there are no tax lines.

Production refuses: `INVOICING_ENABLED=true` with any `OWNER_TO_PROVIDE` placeholder (or, once registered, an invalid GSTIN or a series longer than 16 characters) is a configuration error, and issuing refuses (alert log `invoicing_refused`) as a second line. Payments and entitlements are never blocked by invoicing.

### 3. PDF: a small built-in writer, no new dependency

**Options**

1. **pdf-lib** (pure JS, MIT): well maintained, but ~1 MB unpacked, its own font handling, and a new runtime dependency in the API and worker bundles (an ADR-level change by itself). Tests would still need a separate parser to read the text back.
2. **pdfkit / jsPDF**: larger, Node-stream or browser oriented, extra transitive dependencies.
3. **A ~200-line writer in `billing/invoices/pdf.ts`** (chosen): one A4 page, the standard Type 1 fonts Helvetica and Helvetica-Bold (built into every PDF reader, so nothing is embedded), text, lines and filled rectangles, an exact xref table, uncompressed content streams.

Nothing in the dependency tree could render a PDF (checked both lockfiles). An invoice is a fixed, simple layout, so option 3 gives a ~5 KB document with zero new dependencies, and tests can read every printed string back (`extractPdfText`). Limits accepted: WinAnsi text only (the rupee sign is printed "Rs."; a name in Devanagari prints as "?", so the checkout field accepts Latin letters); no compression; one page (an invoice has one line). If documents ever need non-Latin text or several pages, revisit with pdf-lib and an embedded font.

The layout follows CGST Rule 46 (tax invoice) and Rule 53 (credit note): number and date; supplier name, trade name, address, state and code, GSTIN when registered (PAN and CIN when set); recipient (name if given, email); place of supply with state name and code; SAC; description; quantity; taxable value; rate and amount of each tax; total in figures and in words (Indian numbering); reverse charge "No"; the note that a computer-generated document needs no signature; for credit notes the original invoice number and date. Unregistered: titled **"Bill of Supply"** (D-046) with "The supplier is not registered under GST. No GST is charged on this supply." Note for the CA (OA-22): CGST Rule 49 bills of supply formally belong to registered suppliers of exempt supplies; an unregistered supplier is outside the GST invoice rules, so plain "Invoice" is the alternative. The title is config (`titles.unregistered`).

### 4. Storage, delivery, access

- PDFs go to a **private** `invoices` Blob container through the existing `BlobStore` abstraction (`ai/blob.ts`; locally the in-memory stand-in), key `<fy>/<type>/<id>.pdf`.
- Email: the sign-in email provider (ACS, `noreply@soylai.com`) gains optional attachments (ACS `attachments[]`, base64); the PDF is attached, with a link to `/me/invoices`. Sending claims the row (conditional UPDATE), marks it sent, and on failure backs off exponentially (10 min × 2ⁿ, 8 attempts, then an alert); admins can resend.
- `GET /v1/me/invoices`, `GET /v1/me/invoices/:id/pdf` (owner only; streamed through the API and the same-origin proxy because the storage account is private; another user's id → 404), `GET /v1/admin/invoices?from&to`, `GET /v1/admin/invoices/export` (CSV with GSTR-1 style columns, formula-injection safe), `POST /v1/admin/invoices/:id/resend` (the three admin routes are superadmin only: role admin + the `superadmin` capability + staff TOTP, D-045, with their own rate-limit bucket `admin.invoices.user`). A captured checkout payment also counts `checkout_complete` (D-045 interest counters).

## Consequences

- One more table pair, two triggers, a worker job and five routes; no new dependency.
- Infra follow-ups (infra-azure): the `invoices` container with Blob Data Contributor for the API and worker identities; ACS settings (`EMAIL_PROVIDER=acs`, `ACS_ENDPOINT`, `EMAIL_FROM`) and the ACS sender role for the worker identity; `INVOICING_ENABLED` in `prod.bicepparam` (only after OA-22). Until then the API issues, renders and emails, and the worker sweep issues and renders but cannot email.
- The web proxy does not pass `content-disposition`; the /me/invoices link sets the file name with the `download` attribute.
- Switching to GST-registered later: set `gstRegistered: true` and `seller.gstin`, choose series of at most 16 characters (the approved 19/22-character numbers are fine only while unregistered), and the /plans label switches to "incl. GST" from the same config.
