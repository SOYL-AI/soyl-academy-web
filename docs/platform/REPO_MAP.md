# REPO_MAP — what discovery found, allowed paths, commands

> Owner: repo-cartographer · Written in M0 (2026-10-25) against `platform/main` @ `9955f36` · Integration decision: [ADR-001](adr/001-repository-integration.md)
> Keep this file current: any agent that adds a marketing route, a shared-file change or a command updates it in the same PR.

## 1. Stack

| Area | Finding | Source |
|---|---|---|
| Framework | **Next.js 16.3.4**, App Router only (no `pages/`), **Turbopack** build (`next build` prints `▲ Next.js 16.3.4 (Turbopack)`) | `package.json`, build log |
| React | 19.2.8 (`react`, `react-dom`) | `package.json` |
| Language | TypeScript 5 strict, `@/*` → repo root alias, `moduleResolution: bundler` | `tsconfig.json` |
| Styling | **Tailwind CSS v4** via `@tailwindcss/postcss`; design tokens as CSS custom properties in `app/globals.css` (`@theme`, `--color-*`, `--radius-*`, `--duration-*`); helpers `clsx` + `tailwind-merge` (`lib/utils.ts` `cn`), `class-variance-authority` for buttons | `postcss.config.mjs`, `app/globals.css`, `components/notebook/Button.tsx` |
| Fonts | `next/font/google`: **Inter** (`--font-inter`, sans) and **Instrument Serif** 400 normal (`--font-instrument-serif`), `display: swap`, latin subset, set on `<html>` in the root layout | `app/layout.tsx` |
| Animation | **None as a library.** No GSAP, Lenis or Framer Motion is installed or imported (the README claims GSAP + Lenis; it is stale). Motion = short CSS transitions, one keyframe (`.sim-pop`), all disabled under `prefers-reduced-motion` | `package.json`, grep, `app/globals.css:335-355` |
| Forms | `react-hook-form` + `@hookform/resolvers` + **zod 3.25.76** (ships `zod/v4`, used by `platform/shared`, D-006) | `package.json`, `lib/validation/*` |
| Images | `next/image` with `formats: ['image/avif','image/webp']`. Every product screenshot/photo slot in `content/media.ts` currently has **no `src`**: in production they render nothing; in dev/preview they render labelled TODO frames | `next.config.ts`, `content/media.ts`, `components/notebook/ProductShot.tsx` |
| Payments | `razorpay` 2.9.8 (server SDK) + Razorpay Checkout script injected on demand in the Future Builders form | §6 |
| Analytics | `@vercel/analytics` 2.0.1 + `@vercel/speed-insights` 2.0.0, loaded only after cookie opt-in | §7 |
| Package manager | **npm** (`package-lock.json`, lockfileVersion 3); Node 24 on this machine | — |
| Lint | ESLint 9 flat config: `eslint-config-next` core-web-vitals + typescript; ignores `.next`, `out`, `build`, `next-env.d.ts`, `platform/**` | `eslint.config.mjs` |
| Tests | **None** in the marketing app (no test runner, no `test` script). Protection comes from the marketing regression (§9) | `package.json` |
| Other files | `DESIGN.md` (design system notes), `skills-lock.json` + `.agents/skills/` (agent design skills), `README.md` (partly stale: GSAP/Lenis/Sanity/Instrument Sans are not in the code) | — |

## 2. Build and deploy

- **Build:** `npm run build` → `next build` (Turbopack). 34 static pages generated; TypeScript checked during build. Next 16 **no longer prints per-route size / First Load JS** in the route table, so the regression measures it from `.next` (§9.3).
- **Hosting: Vercel** via Git integration. There is no `vercel.json`, no `.vercel/`, and no `.github/workflows/`; build settings live in the Vercel dashboard. `main` is the production branch (D-004). Pushed branches (including `platform/*`) likely get **preview deployments**; previews set `NEXT_PUBLIC_VERCEL_ENV=preview`, which makes TODO media frames visible (`lib/site.ts` `SHOW_CONTENT_TODOS`).
- **ISR:** `/` and `/future-builders` export `revalidate = 3600` (1 h). Everything else is static or SSG; `/api/*`, `/og`, `/llms.txt`, `/llms-full.txt` are dynamic (ƒ).
- **Existing product app on Azure:** the header's **"Sign in"** links to `APP_URL` = `NEXT_PUBLIC_APP_URL` or the default `https://soylacad-web.bravesmoke-98c7316a.centralindia.azurecontainerapps.io` (Azure Container Apps, Central India), described as "the product app" (teacher assignments, Grades 1–10). It is **not** in this repo and is separate from the new learning platform. See owner question Q-2 in §12.
- **Domain:** canonical origin is hard-coded as `https://www.soylai.com` (`lib/seo/config.ts`); an env value pointing at `soylacademy.com` is ignored on purpose (SOYL does not own it).

## 3. Environment variables used by the marketing code

| Variable | Where | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `lib/seo/config.ts` | Canonical origin (default `https://www.soylai.com`; `soylacademy.com` rejected) |
| `NEXT_PUBLIC_APP_URL` | `lib/site.ts` | "Sign in" target (default: Azure Container Apps URL above) |
| `NEXT_PUBLIC_SHOW_CONTENT_TODOS` | `lib/site.ts` | Force TODO frames on/off (default: on in dev and Vercel previews, off in production) |
| `NEXT_PUBLIC_VERCEL_ENV` | `lib/site.ts` | Set by Vercel; `preview` shows TODO frames |
| `NODE_ENV` | `lib/site.ts`, `content/future-builders.ts` | Dev-only behaviour |
| `COHORT_PREVIEW_DATE` | `content/future-builders.ts` | Dev only: preview cohort state on a date (ignored in production) |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | `app/layout.tsx` | Search-console meta tags |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_X_URL` | `lib/seo/config.ts` | `sameAs` links in JSON-LD |
| `GOOGLE_SHEETS_WEBHOOK_URL` | `app/api/enroll`, `app/contact/actions.ts`, `app/book-a-demo/actions.ts` | Form backend (Google Apps Script webhook); unset → simulated success |
| `RESEND_API_KEY` | `app/contact/actions.ts` | Only checked; email sending is **not implemented** (logs a line) |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | `app/api/razorpay` | Order creation; unset → mock order |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `components/forms/FutureBuildersForm.tsx` | Checkout key (fallback `rzp_test_mock`) |

`.env.example` also lists `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`, `NEXT_PUBLIC_SANITY_*`, `SANITY_API_TOKEN` and `NEXT_PUBLIC_GA_MEASUREMENT_ID`, which **no code reads** (no Sanity, no Google Analytics). Platform variables (ARCHITECTURE §19) do not collide with any of these names.

## 4. Marketing routes

From the `npm run build` route table, cross-checked with `app/` and `.next/app-path-routes-manifest.json`. The regression's `routes.ts` is checked against the build manifest on every run, so this list cannot silently go stale.

### 4.1 Pages (HTML)

| Route | Type | File | Notes |
|---|---|---|---|
| `/` | static, ISR 1 h | `app/page.tsx` | Home; shows `FutureBuildersBanner` only while a cohort is open/closing-soon |
| `/about` | static | `app/about/page.tsx` | |
| `/book-a-demo` | static | `app/book-a-demo/page.tsx` | Server action `submitDemoRequest` → Sheets webhook |
| `/contact` | static | `app/contact/page.tsx` (+ `layout.tsx`) | Server action `submitContact` → Sheets webhook |
| `/future-builders` | static, ISR 1 h | `app/future-builders/page.tsx` | Paid programme; registration form + Razorpay; state from dates in `content/future-builders.ts` (currently **waitlist**, the Oct 2026 cohort closed 22 Oct) |
| `/journal` | static | `app/journal/page.tsx` | |
| `/journal/[slug]` | SSG (`generateStaticParams`) | `app/journal/[slug]/page.tsx` | 4 slugs from `content/journal.ts`: `homework-after-chatgpt`, `why-outcomes-matter`, `should-schools-ban-ai`, `learning-to-defend-an-idea`; unknown slug → 404 |
| `/method` | static | `app/method/page.tsx` | |
| `/parents` | static | `app/parents/page.tsx` | |
| `/privacy` | static | `app/privacy/page.tsx` | DPDP Act / GDPR policy text (also the cookie policy) |
| `/refund-policy` | static | `app/refund-policy/page.tsx` | |
| `/schools` | static | `app/schools/page.tsx` | |
| `/shipping-policy` | static | `app/shipping-policy/page.tsx` | |
| `/students` | static | `app/students/page.tsx` | |
| `/teachers` | static | `app/teachers/page.tsx` | |
| `/terms` | static | `app/terms/page.tsx` | |
| `/what-we-teach` | static | `app/what-we-teach/page.tsx` | |
| (404) | static | `app/not-found.tsx` | Marketing 404; also what disabled platform routes render (ADR-001) |

### 4.2 Metadata routes, feeds, images

| Route | Type | File |
|---|---|---|
| `/sitemap.xml` | static | `app/sitemap.ts` (pages from `lib/seo/pages.ts` `PAGES` + journal articles, each with an `/og?path=` image) |
| `/robots.txt` | static | `app/robots.ts` (allow `/`, disallow `/api/` for all and for a named AI-crawler list) |
| `/manifest.webmanifest` | static | `app/manifest.ts` |
| `/icon.png`, `/apple-icon.png`, `/favicon.ico` | static | `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` |
| `/feed.xml` | static | `app/feed.xml/route.ts` (RSS of the journal) |
| `/llms.txt`, `/llms-full.txt` | dynamic | `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` |
| `/og?path=<page>` | dynamic | `app/og/route.tsx` (`next/og` 1200×630 card; text resolved server-side from the page registry, never from the query) |
| `/logo.png`, `/brand/soyl-mark-{64,128,512}.png` | static files | `public/` |

### 4.3 API routes and server actions

| Route | Methods | Behaviour |
|---|---|---|
| `/api/razorpay` | **POST only** (GET → 405) | Future Builders order creation. Returns **409** when the cohort is closed (now). Price computed server-side from coupon (`lib/future-builders/pricing.ts`), never from the browser. With `RAZORPAY_KEY_*` unset returns a mock order. **No webhook, no signature verification, no payment-status persistence** in this repo; payment id is forwarded to the Sheets webhook by the client after Checkout success. |
| `/api/enroll` | **POST only** (GET → 405) | Forwards enrolment/callback details to `GOOGLE_SHEETS_WEBHOOK_URL`; always answers 200 `{success:true}` (simulated when unset), 500 on bad JSON. No auth, no rate limit, no zod validation. |
| server action `submitContact` | (form POST to `/contact`) | zod-validated, honeypot, Sheets webhook |
| server action `submitDemoRequest` | (form POST to `/book-a-demo`) | zod-validated, honeypot, Sheets webhook |

The regression checks GET → 405 for both API routes and never POSTs them (they have side effects when env is set).

## 5. Middleware / proxy

**None.** No `proxy.ts` (Next 16 name) or `middleware.ts` at the root, in `app/` or anywhere else. ADR-001 keeps it that way; if one is ever added its `matcher` must be limited to platform prefixes.

## 6. Existing auth, consent and payment code

- **Auth:** none in this repo. No sessions, no login, no user store. "Sign in" is an external link to the product app on Azure (§2).
- **Cookie consent:** `components/legal/consent.ts` (localStorage key `soyl_cookie_consent_v1`, `{necessary, analytics, marketing, timestamp}`, event `soyl:consent-changed`), `CookieConsent.tsx` (non-modal bar, server-rendered, hidden pre-paint by an inline `<head>` boot script that sets `html[data-consent]`), `CookieSettingsButton.tsx` (footer "Cookie preferences"), `ConsentedAnalytics.tsx`. This is **cookie** consent only.
- **Parental consent: NOT in this repo.** Searched `app/ components/ lib/ content/ docs/ README.md DESIGN.md` for consent, guardian, parent, DPDP, verif(y/iable), OTP, auth, session. Hits are only: the cookie-consent code above; policy text in `/privacy` and `/terms` saying registrations of minors "must be submitted or authorized by a parent or legal guardian" (DPDP Act 2023 reference); marketing copy on `/parents`. There is no consent flow, API client, SDK, redirect or contract. → **Owner action OA-08** (integration contract) stays open; the platform builds against a `ConsentProvider` mock until then.
- **Payments:** Razorpay for the Future Builders programme only (§4.3). Checkout script `https://checkout.razorpay.com/v1/checkout.js` is injected by `FutureBuildersForm` on submit. The platform's billing (ARCHITECTURE §11.2) is separate: subscriptions and webhooks in the Azure API; it must **not** reuse `/api/razorpay`.

## 7. Third-party scripts in the root layout

| Script | How it loads | Notes |
|---|---|---|
| Consent boot script | inline `<script>` in `<head>` | first-party, tiny |
| JSON-LD (`StructuredData`) | inline `application/ld+json` | data, not code |
| **Vercel Web Analytics** (`@vercel/analytics/next`) | `ConsentedAnalytics` renders `<Analytics/>` only after the visitor allows analytics; script from same-origin `/_vercel/insights/script.js` | cookieless; data processed by Vercel |
| **Vercel Speed Insights** (`@vercel/speed-insights/next`) | same gate; `/_vercel/speed-insights/script.js` | RUM performance data to Vercel |
| Razorpay Checkout | not in the layout; injected on `/future-builders` submit | — |
| Google Analytics | **not present** (only a dead `.env.example` entry) | — |

**Conflict with CONTEXT §12** ("no third-party tracking on platform pages; first-party analytics only; all data in Azure Central India"): because platform pages share the root layout, a visitor who opted in on the marketing site would send platform page views and Web Vitals to Vercel. **Recommended resolution (adopted in ADR-001 §8):** in M1, web-platform makes `ConsentedAnalytics` render nothing on platform prefixes and adds a `beforeSend` filter that drops platform URLs in both components. Marketing behaviour stays identical (regression proves it); platform analytics are first-party events to the Azure API. Also: the platform CSP (ARCHITECTURE §15) cannot rely on blocking these scripts because they are same-origin, so the explicit exclusion is required.

## 8. Route collisions with ARCHITECTURE §3.1

| Platform route | Marketing route with the same path? | Notes |
|---|---|---|
| `/learn/**` | no | — |
| `/tests/**` | no | — |
| `/ask` | no | — |
| `/plans` | no | Future Builders pricing lives on `/future-builders`; no pricing page exists |
| `/me` | no | — |
| `/leaderboard` | no | — |
| `/admin/*` | no | — |
| `/api/platform/*` (rewrite) | no | Only `/api/enroll`, `/api/razorpay` exist; `robots.txt` already disallows `/api/` |

**No path collisions.** Non-path overlaps to be aware of:
- `/students` and `/parents` market the existing teacher-assignment product (Grades 1–10; `SITE_DESCRIPTION` says the same), while the platform targets CBSE/CISCE Classes 7–12. Positioning/copy alignment is an owner decision (Q-1), not a code change.
- "Sign in" goes to the existing Azure product app; a platform login must not hijack it (Q-2).
- Platform pages using `notFound()` render the marketing `app/not-found.tsx`.
- Next forbids two route groups resolving to the same URL: a future marketing page at e.g. `/plans` would fail the build once `app/(platform)/plans` exists. The status suite's completeness check excludes `PLATFORM_PREFIXES`, so keep that list in sync.

## 9. Marketing regression (`platform/e2e`, workspace `@soyl/e2e`)

### 9.1 What is checked

| Check | Gate | Where |
|---|---|---|
| Full-page screenshots, every page in §4.1 (20 pages + 404) at **360×800** (mobile, touch) and **1280×800** (desktop), plus the first-visit home viewport with the cookie bar | **zero** changed pixels (`threshold: 0`, `maxDiffPixels: 0`) | `marketing/visual.spec.ts` |
| Status of every page, metadata route, feed, OG image and API route (§4) | exact expected status + content type | `marketing/status.spec.ts` |
| Every `<loc>` and `<image:loc>` in `/sitemap.xml` | 200 | `marketing/status.spec.ts` |
| Route inventory complete (build manifest vs `routes.ts`, excluding `(platform)` and `PLATFORM_PREFIXES`) | no unknown marketing route | `marketing/status.spec.ts` |
| Lighthouse 13.5 (local Chrome), mobile + desktop presets, `/ /schools /students /parents /future-builders /journal /about /contact`; warm-up request, then median of 5 (mobile) / 3 (desktop) runs; a suspected drop is re-measured 5 more times and judged on the median of all runs | no category drops **> 5** points vs baseline | `scripts/lib.mjs` |
| First-load JS/CSS per prerendered route | informational (printed delta) | `scripts/lib.mjs` `measureBuild` |

Baseline files: `platform/e2e/marketing-baseline/` → `screenshots/win32/{mobile,desktop}/*.png` (44 PNGs, ~11 MB, so all pages are kept; no key-page subset needed), `route-status.json`, `lighthouse.json`, `build-output.json`.

### 9.2 Determinism measures

The site has no GSAP/Lenis/Framer Motion, so stabilisation is: Playwright `reducedMotion: 'reduce'` (the site's own reduced-motion CSS kicks in) + an injected stylesheet that sets `animation`/`transition: none` and hides the caret; `toHaveScreenshot` `animations: 'disabled'`; fixed client clock (`page.clock.setFixedTime`, timers still run); an "Essential only" cookie choice pre-seeded in localStorage (hides the bar, keeps Vercel scripts unloaded; `/_vercel/*` also blocked); `.mp4/.webm` requests aborted so video loops show their poster; lazy `next/image` images switched to eager and awaited (`decode()`); `document.fonts.ready`; `networkidle`; two animation frames. Bundled Chromium pinned by `@playwright/test` 1.64.0 (not system Chrome, which auto-updates). The build runs with a canonical environment: all `NEXT_PUBLIC_*`, `PLATFORM_*`, `BILLING_*`, `GOOGLE_*`, `BING_*`, `RAZORPAY_*`, `RESEND_*`, `COHORT_*`, `VERCEL*` variables are stripped, so platform flags are off; the script warns if any `.env*` file exists at the repo root.

Determinism proven in M0: two consecutive `marketing:regression` runs against the captured baseline both reported zero diffs (handoff note has the output).

### 9.3 Commands

Run from `platform/`:

```
npm run marketing:regression -w @soyl/e2e       # build + serve + visual + status + Lighthouse; fails on any diff
npm run marketing:regression -w @soyl/e2e -- --skip-build --skip-lighthouse   # quick local check (not a full gate)
npm run marketing:baseline   -w @soyl/e2e       # OWNER-APPROVED ONLY: re-capture everything
npm run marketing:diff       -w @soyl/e2e       # differential mode (CI, any OS), see 9.5
```

Options: `--skip-build`, `--skip-lighthouse`, `--lighthouse-runs N`, `--port N` (default 3100). Reports: `platform/e2e/test-results/html/index.html` (diff images on failure), `platform/e2e/test-results/marketing/` (build log, current route-status/lighthouse/build-output JSON). One full run takes ~12 min on this machine (≈1 min build, ~45 s screenshots, ~10 min Lighthouse for 64 runs).

### 9.4 When baselines legitimately change (re-capture with owner approval)

Any marketing content/design change; adding real media to `content/media.ts`; a new cohort in `content/future-builders.ts` (the page **and** the home banner change with the date, because state is computed at build/ISR time); the footer year (`new Date().getFullYear()`, rendered at build time) on **1 January**; a `@playwright/test` upgrade (new Chromium); a Next/React/Tailwind upgrade. Lighthouse baselines also shift with Chrome updates (local Chrome is used for Lighthouse); if a Chrome update alone causes a > 5 drop, re-capture Lighthouse only with owner approval and note it.

### 9.5 Differential mode (CI on Linux)

Committed baselines are Windows-only (`screenshots/win32/`) because font rasterisation differs between OSes. CI uses `scripts/marketing-diff.mjs`:

1. `base = git merge-base origin/main HEAD` (override with `--base <ref>`; falls back to local `main`).
2. `git worktree add --detach` the base into `$TMPDIR/soyl-marketing-diff/base`, `npm ci`, `npm run build`, `next start` on 3201; Playwright captures all pages into a temp snapshot dir (pages missing in the base are recorded and skipped later).
3. Build the current checkout, `next start` on 3202; Playwright compares against the base snapshots with zero tolerance and runs the full status suite.
4. `--lighthouse`: Lighthouse both builds and fail on a > 5 drop (off by default in CI: shared runners are noisy).
5. Clean up the worktree (`--keep` to inspect).

For infra-azure (M1 workflow): `actions/checkout` with `fetch-depth: 0`; `actions/setup-node` Node 24; `npm ci` at the root; `npm ci` in `platform/`; `npx playwright install --with-deps chromium` in `platform/e2e`; `npm run marketing:diff -w @soyl/e2e` from `platform/`; upload `platform/e2e/test-results/` as an artifact on failure. Exit code 0 = marketing renders identically to its merge-base with `main`.

## 10. Allowed paths

| Path | Who | Condition |
|---|---|---|
| `app/(platform)/**` | web-platform, design-system | free (new route group; its own `layout.tsx`, flag-gated with `notFound()`, ADR-001) |
| `components/platform/**` | web-platform, design-system | free (scoped styles, `platform-` namespace) |
| `platform/**` | per AGENTS.md roster | free (separate npm workspace root, D-005) |
| `docs/platform/**` | all agents (own subpaths) | free |
| `.github/workflows/platform-*.yml` | infra-azure | new files only; never edit marketing workflows (none exist today) |
| `next.config.ts` | web-platform | **ADR-001 §5 only**: add `rewrites()` for `/api/platform/:path*` when `PLATFORM_API_ORIGIN` is set. Anything else → new ADR |
| `tsconfig.json`, `eslint.config.mjs` | — | **done in Step 0** (`exclude: platform`, ignore `platform/**`); further changes → ADR |
| `lib/site.ts`, `components/layout/Header.tsx`, `components/layout/Footer.tsx` | web-platform | **ADR-001 §4 only**: platform nav entry points behind `NEXT_PUBLIC_PLATFORM_ENABLED`; flag-off output byte-identical |
| `components/legal/ConsentedAnalytics.tsx` | web-platform | **ADR-001 §8 only**: no Vercel Analytics/Speed Insights on platform paths |
| root `package.json` / `package-lock.json` | web-platform | **new ADR per dependency**: additive only, never change an existing version |
| `app/robots.ts` | web-platform | new ADR: add the platform sitemap URL when the flag is on |

**Forbidden without a new ADR + owner approval:** every other file under `app/`, `components/`, `content/`, `lib/`, `public/`; `app/layout.tsx`; `app/globals.css`; `app/not-found.tsx`; `app/sitemap.ts`; `postcss.config.mjs`; adding `proxy.ts`/`middleware.ts`; adding `vercel.json`. Every PR touching any listed shared file must show a green `marketing:regression` (or `marketing:diff` in CI).

## 11. Baseline numbers (M0)

See `platform/e2e/marketing-baseline/lighthouse.json` and `build-output.json` for the full data.

**Lighthouse** 13.5.0, Chrome 156.0.0.0, median of 5 (mobile) / 3 (desktop) runs, local production build:

| Page | Mobile perf / a11y / BP / SEO | Mobile LCP · TBT | Desktop perf / a11y / BP / SEO |
|---|---|---|---|
| `/` | 84 / 100 / 100 / 100 | 3.1 s · 275 ms | 100 / 100 / 100 / 100 |
| `/schools` | 91 / 100 / 100 / 100 | 2.0 s · 313 ms | 100 / 100 / 100 / 100 |
| `/students` | 96 / 100 / 100 / 100 | 2.7 s · 105 ms | 100 / 100 / 100 / 100 |
| `/parents` | 94 / 100 / 100 / 100 | 2.6 s · 181 ms | 100 / 100 / 100 / 100 |
| `/future-builders` | 95 / 100 / 100 / 100 | 2.7 s · 94 ms | 100 / 100 / 100 / 100 |
| `/journal` | 96 / 100 / 100 / 100 | 2.6 s · 129 ms | 100 / 100 / 100 / 100 |
| `/about` | 95 / 100 / 100 / 100 | 2.6 s · 151 ms | 100 / 100 / 100 / 100 |
| `/contact` | 97 / 100 / 100 / 100 | 2.3 s · 135 ms | 100 / 100 / 100 / 100 |

Mobile performance on localhost swings by up to ~12 points between single runs, which is why the gate uses medians and re-measures before failing (§9.1).

**Build output** (Next 16.3.4; Next 16 prints no sizes, measured from `.next`): first-load JS per prerendered page **190.8 KB gzip** (619.8 KB raw) on most pages, largest `/contact` **218.8 KB gz** (react-hook-form + zod), `/` 194.9 KB gz, `/future-builders` 195.7 KB gz; CSS 11.0 KB gz on every page; `.next/static` total 1110 KB (JS 760 KB, CSS 57 KB, fonts/media 294 KB).

**Route status:** all 21 pages (20 × 200 + 404 page), 12 endpoints and every sitemap URL incl. OG images as expected; 0 failures (`route-status.json`).

## 12. Questions for the owner raised by discovery

- **Q-1** The marketing site sells a teacher-assignment product for Grades 1–10 (`/students`, `/parents`, site description); the platform is a CBSE/CISCE Classes 7–12 learning product. Should marketing copy change at launch? (Marketing change → owner decision.)
- **Q-2** "Sign in" links to the existing product app on Azure Container Apps (`soylacad-web…centralindia.azurecontainerapps.io`). Is that app related to the learning platform (shared accounts?), and where should platform login live in the nav? Default until answered: keep "Sign in" as is; add a separate flag-gated "Learn" entry.
- **Q-3** OA-08 parental-consent contract (not in this repo; see §6).
- **Q-4** Confirm Vercel builds preview deployments for `platform/*` branches (the GitHub repo is public; previews are reachable by URL). If not wanted, restrict previews in Vercel settings.
