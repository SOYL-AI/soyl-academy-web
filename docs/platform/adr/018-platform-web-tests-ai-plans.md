# ADR-018: Platform web tests, AI and plans — offline answer queue, proxy headers, page CSPs, uploads, e2e stand-ins

- **Status:** Proposed (web-platform, 2026-10-27; Lead to accept on merge of `platform/web-platform/m3-m4`)
- **Date:** 2026-10-27
- **Author:** web-platform
- **Related:** ARCHITECTURE §3.1–3.2, §9–§11, §15–§16; CONTEXT §5–§7, §10–§11; ADR-005 (proxy), ADR-011 (CSP), ADR-012
  (test engine), ADR-013 (AI gateway), ADR-016 (billing), ADR-017; D-014, D-018, D-031, D-034; WEB-1, WEB-3, WEB-4,
  WEB-5, WEB-10; F-007, F-008, F-013, F-028; AC-10, AC-12

## Context

M3 adds the test player and results; M4 adds the AI tutor, explain-this-slide, AI evaluation, uploads and the
Razorpay plans page. Six choices needed a record: where the offline answer queue lives, which extra request headers
the same-origin proxy forwards, how `/plans` (Razorpay) and the upload pages relax the CSP, how photos are uploaded,
how the test player stays within the route budget, and how the e2e drives the in-process Razorpay stub, the AI mock
and Blob storage. No dependency was added (root `package.json` unchanged).

## Decisions

### 1. The test player's answer queue lives in IndexedDB, per attempt

- One pending state per item `{itemId, seq, response, markedForReview, timeSpentSec, changedAt}`; `seq` = `Date.now()`
  at the change, strictly increasing per item and above any seq the server reported (`stale.storedSeq`). Logic:
  `components/platform/tests/autosave.ts` (pure, injected storage/transport/clock, unit-tested).
- **IndexedDB, not localStorage** (`soyl_tests` → `attempt_queue`, keyed by attempt id): written answers are free
  text, and WEB-5 keeps localStorage to `soyl_guest_v1` and UI preferences; WEB-10 allows the player's own offline
  queue. It is written on every change (typing debounced 400 ms), so a crash, reload or 10+ minutes offline loses
  nothing. It is deleted on submit and the whole database on logout (WEB-9/10). Without IndexedDB (some private
  modes) the queue falls back to memory: autosave still works, only reload-while-offline cannot.
- Flush: every 10 s while something changed, on `visibilitychange`→hidden and `pagehide` (fetch `keepalive`, batch of
  ≤ 25 for the 64 KB keepalive limit), immediately on `online`, and as the body of `POST …/submit` (one round trip).
  Retries with exponential backoff (2 s … 30 s, or Retry-After) only on network errors, 5xx and 429; `409
  attempt_closed` stops the queue and opens the result; any other 4xx is logged and the batch dropped.
- Timer: display only (AC-12): `offset = serverNow − Date.now()` from every attempt/autosave reply; at zero the player
  submits; late offline answers that the server rejects (`after_deadline`, F-007) are reported on the result page.

### 2. Proxy: two path-scoped request headers, and SSE without buffering

ADR-005's request-header allowlist gains headers **only for specific upstream paths**, each value-checked:
`idempotency-key` for `v1/ai/*` and `v1/attempts/:id/ai-evaluation`; `x-razorpay-signature` and `x-razorpay-event-id`
for `v1/webhooks/razorpay` only. The webhook body is already streamed through unchanged (never parsed or
re-serialised), so Razorpay's HMAC verifies; an e2e changes one byte and gets 400. Responses with
`content-type: text/event-stream` get `cache-control: no-store, no-transform` and `x-accel-buffering: no`, so Next's
response compression (and any buffering proxy) passes AI tokens through as they arrive.

### 3. CSP per page

- Logged-in client pages use the nonce policy (ADR-011): `/tests/attempt`, `/tests/result`, `/tests/builder`,
  `/tests/live`, `/ask`, `/leaderboard` join `/me` and `/admin`. `/tests`, the series pages and `/plans` stay static.
- `proxy.ts` now passes the pathname to `securityHeaders` (one line); everything else is in
  `components/platform/server/security-headers.ts`.

### 4. Razorpay Checkout only on `/plans`

`/plans` (static policy) adds exactly Razorpay's origins (billing M4 handoff): `script-src https://checkout.razorpay.com`;
`frame-src https://api.razorpay.com https://checkout.razorpay.com`; `connect-src https://api.razorpay.com
https://lumberjack.razorpay.com`; `img-src https://cdn.razorpay.com`; and `Cross-Origin-Opener-Policy:
same-origin-allow-popups` for UPI/3-D Secure popups. Every other platform page keeps `frame-src 'none'` and no
third-party host (unit + e2e). `checkout.js` is inserted only when the student presses Buy. Options carry no
`prefill`; the success handler ignores Checkout's response, calls `POST /v1/billing/refresh {}` and polls
`GET /v1/me/subscription` (2.5 s, ≤ 60 s) — the plan is decided by the API (AC-10). **Verify the origin list in
Razorpay test mode before launch (OA-04).**

### 5. Uploads go straight to Blob storage; the upload origin is a server-only setting

Photo doubts and sample papers follow ai-gateway M4: create → `PUT` the SAS URL with exactly the signed headers,
`credentials: 'omit'` → complete → poll. The browser PUT is cross-origin, so pages that upload (`/ask`,
`/tests/builder`) add **`PLATFORM_UPLOAD_ORIGIN`** (server-only env, https; plain http accepted only for loopback in
local e2e) to `connect-src`. Production value: the storage account's blob origin (e.g.
`https://<account>.blob.core.windows.net`), together with the Blob CORS rule from the ai-gateway handoff (OA-02/03).
This is the only non-CDN third-party origin outside `/plans`, and only on those two pages (WEB-1 note).
Images are re-encoded in the browser through a canvas (≤ 2048 px, JPEG ≈ 0.8, ≤ 4 MB for Content Safety): EXIF/GPS
and trailing data are dropped before anything leaves the device; HEIC that the browser can decode becomes JPEG. The
server still cleans every upload (ADR-013 §11).

### 6. Rendering and budget

Questions arrive as data in the player and result pages, so — as in practice (ADR-017 §3) — the Markdown/KaTeX
renderer is the lazily loaded `slots` chunk, never in first-load JS. AI text renders through the same reviewed
renderer with `allowImages={false}` (WEB-7). Explain-this-slide is a small button in the lesson player whose dialog
(and the SSE client) is a separate chunk loaded on first use. The header credit chip uses `GET /v1/credits` once per
page load (members with consent only, D-014) and then the balances from SSE `meta`/`done` and 202 job responses.

### 7. e2e stand-ins (`platform/e2e/tests/platform/web/api-e2e.ts`)

The e2e starts the API through its own injection points (`buildApp` deps) instead of `npm run dev -w @soyl/api`:
the same embedded database and content publish, plus (a) the in-memory `RazorpayStub` with plans synced and
`BILLING_ENABLED=true`, (b) the deterministic `MockProvider` with the gateway fixtures, streaming at 400 ms per 64-character chunk
and failing before output for one marker string, (c) the memory Blob store whose SAS URLs point at a local control
server over http (CORS like Azure's), and (d) a control server that plays Razorpay's side of a payment (returns the
signed webhooks, which the test POSTs **through the web proxy**), moves an attempt's deadline and moves the dev
live mock. All of it is local-only (`APP_ENV=local`) and lives in the e2e folder, not in the API.

## Consequences

- Students can keep answering through network loss and reloads; the server stays authoritative for time and marks.
- Three new values to configure at deployment: `PLATFORM_UPLOAD_ORIGIN` (web, server-only), the Blob CORS rule, and a
  Razorpay test-mode check of the `/plans` CSP list.
- Weekly leagues have no API yet; `/leaderboard` shows live-mock ranks and a "coming soon" leagues card (handoff).

## Alternatives considered

- **localStorage for the queue:** synchronous (simplest on `pagehide`) but stores free-text answers where WEB-5 forbids
  them, and is capped at ~5 MB shared with the guest store.
- **Service worker + Background Sync:** survives tab close, but WEB-10 asks for no service worker unless needed,
  Safari has no Background Sync, and the queue already flushes on the next open.
- **Proxying uploads through `/api/platform`:** keeps CSP at `'self'` but sends 10 MB bodies through Vercel and the API
  (D-018/F-013 chose direct SAS uploads).
- **A nonce policy on `/plans`:** would make the page dynamic; the static page with three Razorpay host allowances is
  simpler and keeps `/plans` cacheable.
