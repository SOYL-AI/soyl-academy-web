# web (marketing) + payments — Future Builders summer camp relaunch — 2026-11-08

Status: done (code, tests, build, lint); see "Needs from the Lead" for the routes.ts inventory patch and env vars.
Branch: `platform/fb/marketing` (worktree `C:/Users/Prabhu/soyl-wt/fb-marketing`).

## What changed

Owner decisions of 8 Nov 2026 implemented from one source of truth, `content/future-builders.ts`:

- **Programme**: a 2-month summer camp, April–May 2027, month-level timing ("April–May 2027 · exact dates and timetable shared after registration"). `CAMP` replaces `COHORT`/`NEXT_COHORT`; exact `dates` are optional. No seat count, cohort size, session count, hours or "12-week" anywhere (`SEATS_TOTAL`, `CONTACT_HOURS`, `SCHEDULE`, `VALUE_LINE`, `PER_HOUR_UNDER` removed).
- **Registration**: open 8 Nov 2026 00:00 IST → 31 Mar 2027 23:59:59 IST (states `upcoming` / `open` / `closing-soon` / `waitlist` derived from the date).
- **Prices (rupees only)**: `LIST_PRICE` ₹11,999 (always struck through); `DIWALI_OFFER` ₹3,299 until 16 Nov 2026 00:00 IST (exclusive, i.e. through 15 Nov 23:59); then `STANDARD_OFFER` ₹9,999, no theme. `getActiveOffer(now)`.
- **Codes**: only `FRIEND500` (₹500 off, needs the friend's name): ₹2,799 during Diwali, ₹9,499 after. BUILDER10, SOYL500, ARNAV15 removed.
- **Dev preview**: `COHORT_PREVIEW_DATE` (dev only) now takes a day (noon IST) or a full timestamp and drives both the camp state and the offer, in pages and APIs.

### Pages and components
- `/future-builders` (`app/future-builders/page.tsx`): summer-camp copy throughout; Diwali offer band above the hero while the offer runs (`components/future-builders/Diwali.tsx`, `DiwaliCountdown.tsx`, `diwali.module.css`): "Diwali early-bird · ₹3,299 (₹11,999)", "Offer ends 15 Nov, 11:59 pm (IST)", live countdown (role=timer, minute-level accessible name, not a live region, no SSR mismatch), inline SVG diya + rangoli, maroon/marigold/saffron, flame flicker only without `prefers-reduced-motion`. Status card, price card, form, sticky bar, FAQ, JSON-LD (`Offer` price/validThrough by offer, `CourseInstance` startDate 2027-04 / endDate 2027-05) all follow the offer. `revalidate` 3600 → 300.
- `components/future-builders/Curriculum.tsx`: same curriculum; week numbers replaced by a proportional module bar and "Module 1–4"; milestones without weeks.
- `/future-builders/registered` (new, noindex, not in the sitemap): receipt number (from the URL), "Sent to <email>" (same-tab sessionStorage, never in a URL), next steps, WhatsApp help, FRIEND500 share.
- Homepage (`app/page.tsx`): `components/marketing/DiwaliOfferTab.tsx` replaces `FutureBuildersBanner.tsx` (deleted): fixed vertical tab on the right edge from md, compact pill bottom-right on phones (z-30, below the cookie bar and mobile menu), "Diwali offer · ₹3,299", links to /future-builders, dismissible (localStorage in try/catch), rendered by the server only while registration is open and the offer runs, and it hides itself in the browser at the offer's end. After the offer the homepage has no FB banner (simplest option; the home feature still shows the camp and fee). `revalidate` 3600 → 300.
- `components/home/FutureBuildersFeature.tsx`, `content/home.ts`: summer-camp status line with the fee.

### Payment flow
- `POST /api/razorpay`: zod-validated registrant (parentName, studentName, email, Indian mobile → E.164, grade 7–12, coupon, friendName); price from the server clock; Razorpay order notes carry product, cohort `summer-2027`, offer slug and the registrant (10 notes, each ≤ 256 chars); returns `keyId` (the `NEXT_PUBLIC_RAZORPAY_KEY_ID` build var is no longer read). Production (`NODE_ENV` or `VERCEL_ENV` = production) never mocks: 503 without keys.
- `POST /api/razorpay/verify` (new): timing-safe HMAC of `order_id|payment_id`; fetches order + payment; requires same order, amount = order amount, INR, `captured` (captures an `authorized` payment for the order amount first; a capture race re-reads the payment); records via the platform ingest; returns `{receiptNumber, email, created}`. Any failure → `{error, code}`; the form then shows "Payment received — we're confirming your registration. Please don't pay again…" with the payment reference and a WhatsApp link (never a blank failure).
- `POST /api/razorpay/webhook` (new): `X-Razorpay-Signature` over the raw body with `RAZORPAY_WEBHOOK_SECRET` (503 + log while unset); acts on `payment.captured` and `order.paid` through the same confirm-and-record path with `source: 'webhook'`; other events and non-FB orders are acknowledged and ignored; 502/503 only when a Razorpay retry can help.
- `POST /api/enroll`: call / notify / waitlist requests go to `POST /v1/ingest/future-builders/leads`; the Google Sheet path is removed. The waitlist/notify form now requires a mobile number (the leads contract requires `phone`).
- `lib/platform-ingest.ts` (new, server-only): `x-soyl-edge-auth` + `x-soyl-ingest-key`, plus `x-soyl-client-ip` (the parent's IP: first `x-forwarded-for` hop, else `x-real-ip`, IP literals only) on the checkout-verify and enroll paths so the platform's 60/min limit is per parent; the webhook sends none. 8 s timeout per attempt, one retry on network error/timeout/429/5xx (never on 400/401/403), response validated with zod. Phone always E.164 `+91[6-9]…`; order/payment ids are Razorpay's (`order_…`, `pay_…`; local dev mocks use `order_devmock…`/`pay_devmock…`).
- `lib/future-builders/{registration,razorpay,checkout,webhook,server}.ts`: pure logic (tested) and the server wiring.
- Form (`components/forms/FutureBuildersForm.tsx`): itemised total (list struck, offer, friend discount), re-prices from the server if the offer ended while the page was open ("The Diwali early-bird offer has ended. The fee is now ₹9,999. Press pay again"), `payment.failed` says no money was taken, analytics events unchanged (`fb_checkout_open`, `fb_payment_success`, `fb_coupon_applied`, `fb_callback_request`).

### Factual FB mentions on other pages (no restyling)
about, parents, students, what-we-teach ("weekend cohort"/"12-weekend" → summer camp), terms ("first weekend" → Session 1), refund-policy (removed "capped at 10 students"), privacy (example code BUILDER10 → FRIEND500; new sub-processor line: registrations stored on SOYL's platform, Microsoft Azure in India — the page never mentioned Google Sheets), `content/faqs.ts` (students + what-we-teach FAQs, also in llms-full.txt), `lib/seo/pages.ts` (FB title/description → summer camp; feeds llms.txt, OG card, sitemap). shipping-policy unchanged (its "week 3 or 4 of the programme" is still true). `lib/site.ts` nav copy ("Live online tech cohort") left alone: not wrong, and changing it would touch every page.

Also: `.env.example` (names only), `package.json` script `test:future-builders`.

## How to verify
All run on Windows 11 / Node 24 in the worktree, 2026-11-08.

| Gate | Command | Result |
|---|---|---|
| Unit tests | `npm run test:future-builders` | 5 files, **114 passed** |
| Lint | `npm run lint` | clean (exit 0) |
| Build (type-checks) | `npm run build` | exit 0; routes `/future-builders/registered` (static), `/api/razorpay`, `/api/razorpay/verify`, `/api/razorpay/webhook`, `/api/enroll` (dynamic) |
| Marketing diff | `npm run marketing:diff -w @soyl/e2e` (from platform/, with the routes.ts patch below applied in the working tree only) | exit 1 as expected: **20 visual diffs = 9 pages × mobile + desktop, plus the home first-visit cookie-bar shot ×2**; 28 passed (all other pages pixel-identical; route status incl. the new routes, sitemap 200s and "routes.ts covers every marketing route" all green) |
| Screenshots | dev server with `COHORT_PREVIEW_DATE=2026-11-10` (Diwali) and `2026-11-20` (ended), Playwright 1440×900 and 360×780 | looked at; see below |

Pages that differ in marketing:diff, and why:
- `/` — the Diwali offer side tab replaces the old FB banner (which showed while registration was open) and the FB feature status line now names the camp, months and fee; also the first-visit (cookie bar) shot.
- `/future-builders` — the relaunch itself (Diwali band, summer camp copy, prices, modules, FAQ).
- `/about`, `/parents`, `/students`, `/what-we-teach` — one sentence each ("weekend cohort" / "12-weekend" → summer camp); what-we-teach and students also via their FAQ answers.
- `/terms` — "first weekend of live classes" → "Session 1, the first live class".
- `/refund-policy` — removed "strictly capped at 10 students".
- `/privacy` — FRIEND500 example; Azure (India) registration-records line.
Unchanged (pixel-identical): /schools, /teachers, /method, /book-a-demo, /contact, /journal + 4 articles, /shipping-policy, 404.

After the diff run only server code changed (client-IP header, dev mock id prefix) plus one sentence on /future-builders under the module bar (already a differing page); lint, the 114 tests and the build were re-run green after that change.

Screenshots (`C:/Users/Prabhu/soyl-wt/fb-marketing-shots/`):
- Diwali on: `diwali-future-builders-desktop-top.png`, `diwali-future-builders-m360-top.png`, `diwali-future-builders-*-enroll.png`, `diwali-home-desktop-top.png` (vertical tab), `diwali-home-m360-top.png` (pill).
- Diwali ended: `ended-future-builders-desktop-top.png`, `ended-future-builders-m360-top.png`, `ended-future-builders-*-enroll.png`, `ended-home-*-top.png` (no tab).
- Production build full pages from marketing:diff: `diff/future-builders-desktop-head.png`, `diff/future-builders-m360-head.png`, `diff/home-desktop-head.png`.

Manual flow (local, no keys): `COHORT_PREVIEW_DATE=2026-11-10 npm run dev`, fill the form, "Pay ₹3,299 and register": a mock order (`order_devmock…`) skips the checkout window, verify returns `FB-DEV-000001` (or records on a local platform API if `PLATFORM_API_ORIGIN`/`PLATFORM_EDGE_SECRET`/`FB_INGEST_KEY` are set) and the browser lands on `/future-builders/registered?receipt=…`.

## Tests added
`lib/future-builders/__tests__/` (vitest, node env, `npm run test:future-builders`, 114 tests):
- `pricing.test.ts`: list/Diwali/standard prices, offer boundary (15 Nov 23:59:59.999 IST Diwali, 16 Nov 00:00 IST standard, UTC equivalents), FRIEND500 with/without/short name, retired codes, camp state boundaries (8 Nov open, 27 Mar closing-soon, 31 Mar 23:59 open, 1 Apr waitlist), preview parsing.
- `razorpay.test.ts`: checkout and webhook signatures (genuine, tampered, swapped, truncated, wrong secret, empty), webhook event parsing, phone normalisation, registrant schema, order notes limits and round-trip, payment checks, ingest payload mapping, production detection.
- `checkout.test.ts`: captured / authorised→capture / capture race / wrong amount never captured / other order / non-INR / failed / non-FB order / Razorpay error / platform error.
- `platform-ingest.test.ts`: config, headers and body, x-soyl-client-ip forwarding and parsing, retry on 5xx/429/network, no retry on 4xx, timeout, body validation, leads endpoint.
- `routes.test.ts`: the four route handlers (server pricing ignores a browser amount, 409 after close, 400 validation, 503 in production without keys/settings, invalid signature before any network call, dev mock receipt, webhook 503/400/ignored, enroll → leads with E.164).

## Known gaps / follow-ups
- `platform/e2e/marketing/routes.ts` (qa-e2e owned, outside my paths) must list the new routes or `marketing:diff`'s "routes.ts covers every marketing route" check fails. Patch in "Needs from the Lead".
- Emails are sent by the platform (fb-backend); this side only records. The confirmation page says the email was sent once the platform has recorded the payment.
- Kit delivery address is not collected at checkout (unchanged); the confirmation page says we ask for it before the camp.
- Webhook needs configuring in the Razorpay dashboard (events `payment.captured`, `order.paid`; URL `https://www.soylai.com/api/razorpay/webhook`).

## Decisions made
- Diwali offer end is exclusive at 16 Nov 2026 00:00 IST so all of 23:59 on 15 Nov counts.
- After the offer, no homepage banner or tab (simplest; brief allowed replacing the banner).
- Receipt number travels in the confirmation URL; the email address only in same-tab sessionStorage.
- Registrant data travels in the Razorpay order notes so the webhook can record a payment when the browser never comes back.

## Needs from the Lead / owner
- Vercel server env (production + preview): `FB_INGEST_KEY` (must match the API's key), `RAZORPAY_WEBHOOK_SECRET` (after the owner creates the webhook). Already set per the brief: `PLATFORM_API_ORIGIN`, `PLATFORM_EDGE_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`. Optional cleanup: `GOOGLE_SHEETS_WEBHOOK_URL` is still used by contact and book-a-demo, keep it.
- Apply the routes.ts inventory patch (three entries + updated notes) in platform/e2e: `git apply docs/platform/handoffs/2026-11-08-fb-marketing-routes-ts.patch` (verified with `git apply --check`; marketing:diff's route checks pass with it).
- marketing:diff will keep failing on the 9 pages above until merged to main (they are the intended, owner-approved changes).
