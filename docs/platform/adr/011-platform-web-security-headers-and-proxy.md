# ADR-011: Platform web security headers, CSP and the API proxy route

- **Status:** Proposed (web-platform M1; for Lead approval at integration)
- **Date:** 2026-10-27
- **Author:** web-platform
- **Related:** ADR-001 §4–§8 and §10, ADR-005 (proxy contract), ADR-009; DECISIONS D-014, D-016, D-017, D-018, D-019; ARCHITECTURE §3, §15, §17.5; security requirements WEB-1..WEB-12, AUTH-12, AUTH-13, GEN-4; findings F-004, F-010

## Context

Platform pages live in the `app/(platform)` route group inside the marketing app (ADR-001). WEB-3 and WEB-4 need
response headers (CSP, HSTS, Permissions-Policy, COOP, ...) on platform pages only. In Next.js 16 an App Router
page cannot set its own response headers. The options that can:

1. `headers()` in `next.config.ts` with platform `source` patterns. Static per path, so no per-request nonce
   (WEB-3 asks for a nonce on logged-in routes), and it edits a shared marketing file.
2. A root `proxy.ts` (the Next 16 name for middleware) whose `matcher` lists only platform prefixes.
3. Route handlers only. They cannot wrap pages.

## Decision

### 1. `proxy.ts` at the repo root, platform prefixes only (WEB-3, WEB-4)

- `matcher` is a literal list of platform page prefixes: `/learn`, `/me`, `/tests`, `/ask`, `/plans`,
  `/leaderboard`, `/admin` (each `/x` and `/x/:path*`). No marketing path can match (ARCHITECTURE §17.5).
  A unit test checks the matcher (`components/platform/__tests__/security-headers.test.ts`).
- With the platform flag off it returns `NextResponse.next()` untouched. It never rewrites, redirects or reads
  cookies.
- Headers: `Content-Security-Policy`, `Reporting-Endpoints`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(),
  browsing-topics=()`, `Cross-Origin-Opener-Policy: same-origin`, `X-Frame-Options: DENY`, and
  `Strict-Transport-Security: max-age=63072000; includeSubDomains` on https only.
- Code: `proxy.ts` + `components/platform/server/security-headers.ts`.

### 2. CSP

Base policy (WEB-3): `default-src 'self'; style-src 'self' 'unsafe-inline'` (KaTeX and next/font inline styles,
ADR-009); `img-src 'self' data: blob: <CDN>`; `media-src 'self' blob: <CDN>`; `font-src 'self'`; `connect-src 'self'`;
`object-src 'none'`; `base-uri 'none'`; `form-action 'self'`; `frame-src 'none'`; `frame-ancestors 'none'`;
`worker-src 'self' blob:`; `upgrade-insecure-requests` (https only); reports to the first-party
`/api/platform/csp-report` (`report-uri` + `report-to csp`). `<CDN>` is the origin of `NEXT_PUBLIC_CDN_BASE_URL`
when it is https.

`script-src` has two forms:

- **Logged-in dynamic routes** (`/me` now; `/tests/attempt`, `/tests/result`, `/ask`, `/admin` later):
  `'self' 'nonce-<per request>' 'strict-dynamic' 'sha256-<consent boot script>'`. `proxy.ts` puts the CSP on the
  request headers too, so Next.js stamps the nonce on its own scripts. The root layout's inline consent boot
  script is allowed by its SHA-256, computed from `CONSENT_BOOT_SCRIPT` at start-up, so it can never drift.
  `/me` calls `connection()` so it is rendered per request.
- **Static/ISR routes** (`/learn/**`): `'self' 'unsafe-inline'`. **This is the F-010 exception.** Cached HTML
  cannot carry a per-request nonce, and Next's inline flight-data scripts differ per page and per build, so
  hashes are not workable either. Mitigations: no third-party script host anywhere; these pages render only
  catalog text through React (escaped), never user input or `dangerouslySetInnerHTML` (WEB-6 lint); the
  reviewed renderers sanitise content (ADR-009). Revisit when Next's SRI support (`experimental.sri`) is stable;
  it needs a `next.config.ts` change.
- `next dev` adds `'unsafe-eval'` (React dev tooling); never in production.
- `/plans` (M4) will add only Razorpay Checkout origins.

The Playwright suite fails on any CSP violation (`platform/e2e/tests/platform/web/fixtures.ts`).

### 3. API proxy route (ADR-005 web side, D-018)

`app/(platform)/api/platform/[...path]/route.ts` + `components/platform/server/api-proxy.ts` implement ADR-005's
nine items: 404 when the flag is off or `PLATFORM_API_ORIGIN`/`PLATFORM_EDGE_SECRET` is unset; path allowlist on
the raw path (no `%`, `..`, `.`, empty segments or backslashes); GET/POST/PUT/PATCH/DELETE, HEAD/OPTIONS → 405;
request header allowlist, then `x-soyl-edge-auth` and `x-soyl-client-ip` (from `x-real-ip`, IP literals only)
**set**; streamed body with `duplex: 'half'`; `redirect: 'manual'`, `cache: 'no-store'`, 30 s timeout combined
with the client's abort signal; response header allowlist + every `set-cookie`, `cache-control: no-store` forced
when a cookie is set or the API sent no caching header; 502 `upstream_unavailable` without upstream text.

Additions and deviations from ADR-005:

- **504 `upstream_timeout`** for timeouts (ADR-005 only names 502). `/v1/ai/*` gets 120 s (M4 SSE).
- **413 `payload_too_large`** at the proxy above 257 KB (largest API limit 256 KB, API-5), checked on
  `content-length` and while streaming. The API still enforces its per-route limits.
- `nosniff` and `Referrer-Policy: no-referrer` are added to proxied responses.
- **No `preferredRegion = 'bom1'`**: the route segment option is deprecated in Next 16. The function region
  (Mumbai, `bom1`) is set in the Vercel project settings at deployment (deployment agent, D-025).
- First-party CSP report endpoint `app/(platform)/api/platform/csp-report/route.ts` (a static segment, so it wins
  over the catch-all). It logs directive, blocked origin and page path only (no query strings), 16 KB cap.

### 4. Server-side catalog reads

ISR pages (`/learn/[board]/[class]/...`) call the API origin directly from the Next server with the edge secret
(`components/platform/server/catalog.ts`), not through the browser proxy, and cache for 1 h
(`next.revalidate`). `generateStaticParams` returns `[]`, so `next build` never needs the API.

### 5. Marketing touch points (ADR-001 §4, §8, D-017, D-019)

- `lib/site.ts`: a "Learn" entry is prepended to `MAIN_NAV` only when `NEXT_PUBLIC_PLATFORM_ENABLED === 'true'`
  at build time. `components/layout/Header.tsx` is unchanged.
- `components/legal/ConsentedAnalytics.tsx`: renders nothing on platform paths and passes `beforeSend` to both
  Vercel components to drop platform URLs (client navigation after the scripts loaded).
- The prefix list lives in `platform/shared/config/platform-routes.ts` (no imports). The marketing regression's
  copy in `platform/e2e/marketing/routes.ts` stays (its Node scripts import that file natively and cannot
  resolve an extensionless TS import); a unit test in `platform/shared/api-client/api-client.test.ts` keeps
  the two lists equal.

### 6. Lint scope (WEB-6)

`eslint.config.mjs` adds `react/no-danger: error` for `app/(platform)/**`, `components/platform/**` and
`proxy.ts`, turned off for `components/platform/ui/render/**` only (the reviewed renderers, ADR-009). Marketing
files are not affected.

### 7. Platform sitemap (ADR-001 §10, ARCHITECTURE §3.2)

`/learn/sitemap.xml` (route handler in the route group) lists `/learn`, the 12 class pages and every subject page
from the catalog API; 404 with the flag off. `app/sitemap.ts` and `app/robots.ts` are unchanged; adding the
platform sitemap to `robots.txt` is a flag-on change for later (needs its own ADR per ADR-001 §10).

## Consequences

- `proxy.ts` is a new root file. It runs only for platform URLs, so marketing requests never execute it. The
  flag-off HTML proof and the marketing regression show marketing output is unchanged (handoff
  `2026-10-27-web-platform-m1.md`).
- Static `/learn` pages carry `'unsafe-inline'` in `script-src` until SRI or nonce-capable caching is available
  (F-010 stays open with this rationale).
- Adding any platform route changes Next's prerender scheduling, which can move one `<meta name="next-size-adjust">`
  tag inside a marketing page's `<head>` (seen on `/method`; reproduced by adding empty dummy routes to the base).
  The tag set and the body are byte-identical. The proof script compares `<head>` as a set for this reason.
