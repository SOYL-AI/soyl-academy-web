# Redesign: "The Working Notebook" (Oct 2026)

Branch: `redesign/working-notebook`. Brief: review of 25 Oct 2026 (8 problems) plus the
Working Notebook design direction. This file is the plan, the inventory, and the
hand-over TODO list.

## 1. Inventory (everything that must keep working, URLs unchanged)

| Route | Kind | Notes |
| --- | --- | --- |
| `/` | Home | Rebuilt |
| `/schools` | Audience page | Restyled; nav "For schools" |
| `/students` | Audience page | Kept (footer link); Pip slot lives here |
| `/method` | Content | Restyled; had horizontal scroll at 390 px |
| `/what-we-teach` | Content | Restyled (footer link) |
| `/about` | Content | Restyled |
| `/contact` | Form → `submitContact` server action → `GOOGLE_SHEETS_WEBHOOK_URL` | Restyled, same action |
| `/future-builders` | Paid cohort: Razorpay (`/api/razorpay`) + callback/waitlist (`/api/enroll` → Sheets) | Rebuilt around one cohort object |
| `/journal`, `/journal/[slug]` (4) | Articles | Restyled; AI images removed |
| `/privacy` (incl. cookie notice), `/terms`, `/refund-policy`, `/shipping-policy` | Legal | Restyled wrapper, text unchanged |
| `/api/enroll`, `/api/razorpay` | API | Kept; payment now refuses when registration is closed |
| `/og`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt`, `/llms-full.txt`, icons | SEO | Kept; OG card uses the mark |
| Cookie consent (footer "Cookie preferences") | Legal | Kept, restyled, no framer-motion; now actually gates analytics |

New: `/teachers`, `/parents`, `/book-a-demo`, `/feed.xml` (the layout already linked to it; it 404'd).

Removed: `FutureBuildersPromoModal` (auto-popup), `TopAnnouncementBar`, all AI-generated
people images, "Concept preview" / "invented for demonstration" labels, the photo-filled
footer wordmark, the "Story Of Your Life" footer tagline, GSAP and framer-motion
(JS budget), retired homepage sections.

## 2. Decisions

- **Tokens first** in `app/globals.css`: the brief's exact palette, Inter + Instrument Serif,
  13 px floor, notebook rules (`.rule`, `.graph-grid`, `.margin-line`). Legacy `brand-*`
  tokens are re-pointed at the new palette so nothing renders off-system mid-migration.
- **Shared components** in `components/notebook/`: `Logo`, `Button`, `Section`, `Module`,
  `Eyebrow`, `ProductShot`, `TodoSlot`, `Faq`, form fields.
- **Motion**: CSS only, under 300 ms, no scroll-linked or pinned sections; everything is
  visible in a static screenshot. `prefers-reduced-motion` respected globally.
- **Cohort state** (`content/future-builders.ts`): one `COHORT` object with ISO dates.
  `getCohortState(now)` returns `open` / `closing-soon` / `waitlist`. Pages using it
  revalidate hourly; the banner computes client-side; `/api/razorpay` re-checks server-side.
  As of 25 Oct 2026 the October cohort is closed, so the site shows the waitlist.
- **Book a demo** posts to the existing Google Sheets webhook (the repo's form backend) with
  `source: book_a_demo`. Note: Resend email sending is still simulated in `app/contact/actions.ts`.
- **Sign in** URL is one config value: `NEXT_PUBLIC_APP_URL` (fallback: the Azure container URL)
  in `lib/site.ts`.
- **Product screens / photos / proof**: nothing is invented. `content/media.ts` lists every
  screenshot slot; until a file exists, a clearly labelled TODO frame renders instead.
  `content/proof.ts` likewise shows TODO placeholders, never invented quotes or numbers.
- **Interactive mini-simulator** (hero): plot a point on a coordinate grid; attempt trail
  ✗ ✗ ✓; a hint nudges without giving the answer; "You worked it out · 3 tries · 1 hint".
  Keyboard operable, no library.
- **Analytics**: Vercel Analytics/Speed Insights (cookieless, no session replay) load only
  after the visitor allows analytics in the consent banner.

## 3. External dependencies

- Fonts: Inter + Instrument Serif via `next/font/google` (self-hosted at build).
- Brand mark: 64/128/512 px copied from the product app's public `/brand/`. **1024 px still needed.**
- Removed deps: `gsap`, `@gsap/react`, `framer-motion`.

## 4. Hand-over (25 Oct 2026)

### Results (production build, local)

| Check | Result |
| --- | --- |
| Homepage height at 1440 | 6,020 px on the live build, 7,267 px with TODO frames (was 17,008) |
| Horizontal scroll at 390 / 768 / 1024 / 1440 | None on any of 17 pages (was: `/method` at 390) |
| Lighthouse mobile, simulated (default) | Perf 92–96 · A11y 100 · BP 100 · SEO 100 on 14 pages |
| LCP, Lighthouse with applied throttling | 1.9–2.1 s (home, Future Builders, Book a demo, schools, teachers) |
| LCP, Lighthouse simulated model | 2.8–3.3 s (the model charges all early JS; see note) |
| Homepage JS (gzipped, modern browsers) | ~157 KB (195 KB incl. the `noModule` polyfill old browsers fetch) |
| CLS | 0 – 0.001 |
| Interaction suite (25 checks) | All pass: consent, simulator by keyboard and pointer, toggle, demo form, waitlist, payment refusal, mobile menu, no console errors |

Note on LCP: with real throttling the LCP is the hero text at first paint. Lighthouse's
simulated model adds the download of the React/Next runtime (~115 KB gz) to that estimate.
Getting the simulated figure under 2.5 s would mean removing client JS from the shell
(e.g. a server-only header) — worth revisiting once real screenshots add image weight.

### Content the SOYL team needs to supply

Every slot below renders as a labelled TODO frame in development and on Vercel preview
deploys, and is hidden on the live site (layouts fall back to text-only cells). Override with
`NEXT_PUBLIC_SHOW_CONTENT_TODOS=true|false`.

**Product screens** → `content/media.ts`, files in `/public/media` (1600×1000 unless noted)
- Student question screen with attempt trail and a hint (hero, future)
- Teacher uploads notes · teacher reviews/approves the draft · student with a hint · class heatmap
- Five simulator screens: confirm names (working titles: coordinate geometry, fractions, motion and forces, electric circuits, reactions)
- Parent view (4:3 crop)
- Optional short loops (MP4, muted) for any of the above

**Photography** (real, consented; no AI-generated people) → `content/media.ts`
- A teacher using SOYL in a pilot classroom · a pilot school session
- Future Builders: students with the ESP32 kit · a Demo Day pitch

**Proof** → `content/proof.ts`
- Pilot school names/logos (with permission)
- Two sourced numbers (e.g. pupils in the pilot, assignments completed)
- One quote from a pilot teacher or principal (name, role, school, permission)

**Brand**
- `soyl-mark-1024.png` (64/128/512 were copied from the product app's public `/brand/`)
- Pip mascot illustration for `/students`

**Decisions / facts to confirm**
- Next Future Builders cohort dates → replace `COHORT` in `content/future-builders.ts` (the site reopens registration automatically)
- Curriculum list for India (the site keeps the existing "Common Core, IB, IGCSE or local frameworks"; CBSE/ICSE/state boards?)
- Custom domain for the app → set `NEXT_PUBLIC_APP_URL`
- Domain: the site is `https://www.soylai.com`. **SOYL does not own `soylacademy.com`.** Before this
  change the live site's canonical, Open Graph, sitemap and JSON-LD URLs all pointed there. The code
  now falls back to `https://www.soylai.com` and ignores any `NEXT_PUBLIC_SITE_URL` on soylacademy.com.
  Also remove that value from the hosting provider's env settings if it's there.
- Email delivery: `app/contact/actions.ts` still only simulates Resend; forms reach the Google Sheet only if `GOOGLE_SHEETS_WEBHOOK_URL` is set

### Previewing cohort states

Run `COHORT_PREVIEW_DATE=2026-10-10 npm run dev` (open), `2026-10-20` (closing soon) or any
date after the close (waitlist). The override is ignored in production builds.

Since 28 Oct 2026 (D-038) there is a fourth state, **upcoming**: `NEXT_COHORT` in
`content/future-builders.ts` (Summer 2027 cohort, April–May 2027, registration opens
mid-November 2026). Any date after the October close now shows it; add
`COHORT_PREVIEW_NEXT=none` to preview the plain waitlist. While upcoming, the page collects
"notify me" sign-ups (`/api/enroll`, `mode: waitlist`, `source: fb_summer_2027`) and
`/api/razorpay` refuses payment. To open registration, set `NEXT_COHORT.registrationOpens`
and `NEXT_COHORT.dates` together (the state flips to open at that moment), and update
`SCHEDULE` / `CONTACT_HOURS` if the summer format differs from the weekend one.

The Future Builders page itself (sections, conversion decisions, analytics events) is
described in the report for branch `marketing/future-builders-cro`.
