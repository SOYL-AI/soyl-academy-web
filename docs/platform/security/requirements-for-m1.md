# Security requirements for M1 (MUST)

> Owner: security-reviewer · Status: draft for M1 briefs · Last updated: 2026-10-25
> Paste the sections that apply into each M1 task brief. Each item is a **MUST** unless it says otherwise and has a **Test** line that defines "done".
> Background and rationale: [threat-model.md](threat-model.md) · Checklist mapping: [asvs-l2-checklist.md](asvs-l2-checklist.md) · Open issues: findings.md was never committed (OA-13); the current register is the [M6 review](../handoffs/2026-10-27-security-reviewer-m6.md)
> Where a value is marked *(config)*, put it in `platform/shared/config/security.ts` (or env), not in code, so it can be tuned without a deploy of logic.

Abbreviations: **ACA** Azure Container Apps · **KV** Key Vault · **MI** managed identity · **RL** rate limit (Redis, sliding window, keyed as stated; on breach return `429` problem+json with `Retry-After`).

Note on IP-based limits: most Indian mobile users sit behind carrier-grade NAT, so many students share one public IP. IP limits below are deliberately loose and exist to stop scripted abuse; the tight limits are keyed on the phone number, email address, user or attempt.

---

## 0. All M1 agents

- **GEN-1 No secrets in git.** No keys, tokens, connection strings or real OTPs in code, tests, fixtures, docs or `.env.example` (names only). **Test:** `gitleaks` passes on the PR (see INFRA-14).
- **GEN-2 No real personal data in fixtures or seeds.** Seed users use `@example.com` addresses and phone numbers from a reserved test range in config. **Test:** reviewer grep of `platform/db/seed*` and test fixtures.
- **GEN-3 Mock providers cannot run in production.** The fixed-code OTP mock, mock OAuth, mock consent, mock Razorpay and mock AI providers throw on startup when `APP_ENV=prod`. In `stg`, the OTP mock only answers for numbers on a test allowlist *(config)*. **Test:** unit test boots the provider factory with `APP_ENV=prod` and asserts it throws for each mock.
- **GEN-4 Flags fail closed.** With `PLATFORM_ENABLED=false`, every platform page returns 404 and every API route except `/healthz` and `/readyz` returns 404. **Test:** integration test with the flag off.
- **GEN-5 New runtime dependencies** need an ADR (AGENTS §4.4) and must have no open high/critical advisory (`npm audit`). Pin exact versions in `platform/package-lock.json`. Use `zod` **≥ 4.6.6** in the API (see F-002).
- **GEN-6 Time.** Store UTC; compute IST days for credits/streaks; all logs in UTC ISO-8601.

---

## 1. infra-azure

### Network and identity
- **INFRA-1 Postgres is private.** PostgreSQL Flexible Server uses VNet integration (delegated subnet) or a private endpoint; **public network access disabled** in stg and prod (dev may allow the CI runner IP only). TLS required (`require_secure_transport=on`). **Test:** Bicep param check + a connection attempt from the internet times out.
- **INFRA-2 Postgres auth by Entra ID.** API, worker and migration job connect with their **managed identity** (Entra auth). If a password is unavoidable (e.g. a tool), it lives only in KV and is rotated every 90 days. Separate DB roles: `migrator` (DDL), `app` (DML), `readonly` (support/reporting). **Test:** app identity cannot run `CREATE TABLE` (integration test against stg).
- **INFRA-3 Redis is private and keyless.** Azure Managed Redis with private endpoint, TLS only, Entra/MI auth (access keys disabled where the SKU allows), eviction policy `noeviction` (credit and rate-limit keys must never be silently evicted). **Test:** Bicep review + `CONFIG GET maxmemory-policy` equivalent in the portal/CLI.
- **INFRA-4 Storage.** `allowBlobPublicAccess=false`, `allowSharedKeyAccess=false`, min TLS 1.2, soft delete on (7 days). Containers: `uploads-quarantine` and `uploads` (private, lifecycle rule deletes after 30 days), `content-releases` (private — releases contain answers), `public-assets` (decks' diagrams, audio; the **only** container behind Front Door). **Test:** anonymous GET on a `content-releases` and `uploads` blob URL returns 403/404; lifecycle rule present in Bicep.
- **INFRA-5 AI services keyless.** Azure OpenAI, Speech and Content Safety have `disableLocalAuth=true`; API/worker call them with MI. Azure OpenAI deployment type and region follow ADR-008 (record where prompts are processed). Keep the default Azure OpenAI content filters **on**. **Test:** Bicep param check; a call with an API key fails.
- **INFRA-6 Key Vault.** RBAC mode (no access policies), soft delete + **purge protection** on, one vault per environment, public network access restricted to the ACA environment (private endpoint or firewall). Each app's MI gets `Key Vault Secrets User` on that vault only. **Test:** Bicep review; worker identity cannot read a secret it does not use (if per-secret scoping is used).
- **INFRA-7 ACA ingress.** API app: external ingress, HTTPS only (`allowInsecure=false`), but every request without a valid edge secret is rejected by the API (API-2). Worker app: **no ingress**. ACR: admin user disabled, `AcrPull` via MI. **Test:** `curl` to the API's ACA FQDN without the edge header returns 403 on any `/v1/*` path.
- **INFRA-8 CI identity.** GitHub Actions authenticates to Azure with **OIDC workload-identity federation** (no client secret), one federated credential per environment, `prod` bound to a GitHub Environment with required reviewers. **Test:** no `AZURE_CLIENT_SECRET` in repo secrets; prod job requires approval.
- **INFRA-9 Region.** Every stateful resource and Log Analytics workspace is in **Central India**; record any exception (Front Door is global, Azure OpenAI per ADR-008) in an ADR. **Test:** Bicep `location` params; PSRule/Checkov rule or a script that lists resource locations.

### Containers
- **INFRA-10 Images.** Base image pinned by digest (Node 24 slim or distroless), runs as non-root, no build tools or secrets in the final stage, `NODE_ENV=production`. **Test:** `trivy image` (INFRA-15) + `docker inspect` user ≠ root.

### Logging and monitoring
- **INFRA-11 Log retention.** Log Analytics retention **≥ 180 days** for security-relevant logs (auth, admin, authorization failures, webhook, infra) to meet CERT-In's ICT-log direction; App Insights request telemetry with **no request bodies and no query strings that could hold personal data**. Final schedule follows the retention ADR (F-015). **Test:** Bicep param.
- **INFRA-12 Alerts** (in addition to ARCHITECTURE §14): OTP sends per hour above threshold *(config)*; failed OTP verifies per hour; 403s from missing edge secret; webhook signature failures; AI spend 50/80/100%. **Test:** alert rules exist in Bicep.
- **INFRA-13 Budgets** on every resource group with alerts at 50/80/100% (already in ARCHITECTURE §13) **plus** an SMS/email provider spend alert set up by the owner (OWNER_ACTIONS).

### CI/CD security gates (`.github/workflows/platform-*.yml`)
- **INFRA-14 Secret scanning:** `gitleaks` on every PR (diff) and a full-history scan once on `platform/main`; job fails on any finding. **Test:** a planted dummy key in a throwaway branch fails CI.
- **INFRA-15 Dependency and image scanning:** `npm audit --audit-level=high` for **both** `package-lock.json` (root) and `platform/package-lock.json`; `trivy image --severity HIGH,CRITICAL --ignore-unfixed --exit-code 1` on api/worker images; `trivy fs` on `platform/`; IaC scan of Bicep with **Checkov** (or PSRule for Azure). **Test:** jobs present and failing on a known-vulnerable fixture.
- **INFRA-16 SAST:** GitHub **CodeQL** (`javascript-typescript`, `security-extended` queries) on PRs touching `platform/**`, `app/(platform)/**`, `components/platform/**`.
- **INFRA-17 Workflow hardening:** top-level `permissions: contents: read`; third-party actions pinned by full commit SHA; no `pull_request_target` with checkout of PR code; Dependabot (or Renovate) enabled for npm and GitHub Actions in `platform/`. **Test:** reviewer check of workflow files.
- **INFRA-18 SBOM:** each image build produces a CycloneDX SBOM (`npm sbom --sbom-format cyclonedx` or `trivy image --format cyclonedx`) stored as a build artifact.
- **INFRA-19 Remediation SLA** (documented in the runbook): critical advisory in a deployed component — fix or mitigate in **48 h**; high — **7 days**; medium — 30 days.

---

## 2. db-schema

- **DB-1 Least-privilege grants.** Migrations run as `migrator`; the app role gets DML on app tables only. On `credit_ledger`, `audit_log` and `webhook_events` the app role gets **INSERT and SELECT only** (append-only; corrections are new rows). **Test:** integration test: `UPDATE credit_ledger ...` as the app role fails.
- **DB-2 Integrity constraints** (the database, not only code, prevents double-spend and duplicates):
  - `webhook_events(provider, event_id)` UNIQUE.
  - `credit_ledger`: one daily grant per user per IST date — UNIQUE `(user_id, grant_date)` WHERE `kind='grant'`; `request_id` UNIQUE per `(kind, request_id)` so a reserve/charge/refund for one AI request cannot be written twice; CHECK on amount sign per kind.
  - `attempts`: partial UNIQUE `(user_id, test_id)` WHERE `status IN ('created','in_progress')`; for live events UNIQUE `(user_id, live_event_id)` on attempts (one attempt per event, ever).
  - `accounts(provider_id, account_id)` UNIQUE; `users.email_normalized` and `users.phone_e164` UNIQUE where not null.
  - `guardian_links(parent_user_id, student_user_id)` UNIQUE with a `verified_at` column (null = not usable).
  **Test:** migration tests insert duplicates and expect constraint errors.
- **DB-3 Identifiers.** Normalise phone to E.164 (`+91XXXXXXXXXX`); store `email_normalized` (lower-case; for gmail.com/googlemail.com also strip dots and `+tag`) for uniqueness and abuse limits, keep the original for display. **Test:** unit test of the normaliser.
- **DB-4 Secrets at rest.** OTP codes are never stored in plain text (see AUTH-4). Session tokens stored hashed if the auth library supports it; otherwise document why not.
- **DB-5 Personal-data inventory.** Every column holding personal data is listed in `platform/db/PII.md` with its retention rule and what `DELETE /v1/me` does to it (delete / anonymise / retain-with-reason). **Test:** a schema test fails if a column named like `email|phone|name|ip|address|dob` is missing from the inventory.
- **DB-6 Answers separated from items students fetch.** Schema lets the API select question stems/options **without** `answer`, `solution_md`, `marking_scheme` (separate columns or table, never `SELECT *` into DTOs). Questions carry a `pool` field: `practice | test | live_reserved` (see F-006). **Test:** reviewed in DB PR.
- **DB-7 Seeds.** Admin bootstrap is a CLI that takes an explicit email; no default admin, no default password. **Test:** fresh seed has zero users with role `admin` until the CLI runs.
- **DB-8 Migrations** reversible and run by the pre-deploy ACA job with the `migrator` identity; no data migration that copies personal data into logs.

---

## 3. backend-api (including auth)

### 3a. Edge trust, transport, headers
- **API-1 Fixed base URL.** The API never builds absolute URLs from `Host` or `X-Forwarded-Host`. Auth base URL, OAuth redirect URIs, email links and trusted origins come from config per environment (e.g. prod: `https://www.soylai.com`). **Test:** request with `Host: evil.example` and `X-Forwarded-Host: evil.example` — OAuth redirect and any emitted URL still use the configured origin.
- **API-2 Edge authentication.** Every request to `/v1/*` must carry header `x-soyl-edge-auth` equal to one of the current secrets (two accepted during rotation), compared in constant time; otherwise **403** and a security log event. The web tier adds it on the `/api/platform/*` rewrite (WEB-2). Health endpoints are exempt and return no internal detail. **Test:** integration tests for missing/wrong/rotated secret.
- **API-3 Client IP.** Use the client IP only from the header the web tier sets (verify in an M1 spike which Vercel header is overwritten by Vercel and not client-controllable; candidates `x-real-ip` / `x-vercel-forwarded-for`), and only when API-2 passed. Fastify `trustProxy` must not trust arbitrary `X-Forwarded-For`. **Test:** e2e on staging: send a spoofed `X-Forwarded-For` through `www` and assert the API's logged IP is the real one.
- **API-4 Response headers on every API response:** `Content-Type` exact (JSON: `application/json; charset=utf-8`, errors `application/problem+json`), `X-Content-Type-Options: nosniff`, `Cache-Control: no-store` on any authenticated or personal response, `Referrer-Policy: no-referrer`; no `Access-Control-Allow-*` headers (same-origin only; no CORS). No `X-Powered-By`/version banners. **Test:** contract test over all routes.
- **API-5 Body limits.** Global JSON body limit **64 KB**; per-route overrides: `PUT /v1/attempts/:id/responses` 256 KB, `POST /v1/me/merge-guest` 256 KB, `POST /v1/ai/:action` 16 KB, content-report 8 KB. Uploads never go through JSON (see F-013). Reject JSON nesting deeper than 10 and arrays longer than the schema max **before** zod work where possible. **Test:** oversized bodies → 413.

### 3b. Authorization and route policy
- **API-6 Route policy declaration.** Every Fastify route declares `config.policy = { roles, csrf, rateLimit, consent, fresh? }`. Server startup fails if any route lacks it. Default is deny. **Test (route-policy test):** enumerate `fastify.printRoutes()`/route list and assert every route has a policy; snapshot the table so changes show up in review.
- **API-7 Object-level authorization.** Every resource fetched by id is loaded **scoped to the caller** (`WHERE id=$1 AND user_id=$2`, or an explicit guardian/role check). Unauthorized access returns **404** (not 403) to avoid id probing. **Test:** for each route with an `:id` of a user-owned resource (attempts, results, responses, evaluations, uploads, ai conversations/messages, credit ledger, subscriptions), a second user gets 404. qa-e2e keeps this as a generated test matrix.
- **API-8 Mass assignment.** zod request schemas are `.strict()` (unknown keys rejected); `role`, `user_id`, `status`, `score`, `credits`, `plan`, `valid_until`, `xp` are never accepted from clients. `PATCH /v1/me` allows only `board, class, school_id, display_name, locale`. **Test:** sending `role: "admin"` to `PATCH /v1/me` returns 400.
- **API-9 Response shaping.** Response zod schemas strip unknown fields; DTOs never spread DB rows. **Test:** contract test asserts that attempt/test payloads before submit contain none of the keys `answer`, `solution_md`, `marking_scheme`, `correct`, `explanation`.
- **API-10 Roles.** `student` default; `parent`, `reviewer`, `admin` only via audited admin action or bootstrap CLI. Role change revokes the user's other sessions. Admin/reviewer routes require MFA (AUTH-11) and a fresh session for writes.
- **API-11 Consent gate.** `ConsentProvider` adapter with states `required | pending | granted | revoked` cached in `consent_status` (TTL *(config)*, refreshed on login). Routes with `policy.consent=true` return `403 consent_required` problem+json unless `granted`. Default `consent=true` for: AI, uploads, test attempts, leaderboards/rank cards, merge-guest, profile fields beyond board/class. The exact list follows the owner's consent rules (OA-08); keep it in config. **Test:** integration tests with the mock in each state.
- **API-12 Guardian links.** A parent can read a student's data only through a `guardian_links` row with `verified_at` set by the consent flow (or an explicit student-side approval). No endpoint lets a user create a verified link by claiming a phone/email. **Test:** a parent account without a verified link gets 404 on the student's data.

### 3c. Authentication (Better Auth or ADR fallback)
- **AUTH-1 Methods.** Google, phone OTP (+91 mobile only: `^\+91[6-9]\d{9}$`), email OTP. No passwords for students/parents. Every pathway is listed in `docs/platform/security/auth-pathways.md` (written by backend-api) with the controls below; no other pathway exists. **Test:** route-policy snapshot shows no other auth routes.
- **AUTH-2 OTP generation.** 6 digits from a CSPRNG (`crypto.randomInt`), single use, bound to `(identifier, purpose)`; issuing a new code invalidates the previous one. Lifetime: **SMS 5 min, email 10 min**. **Test:** unit tests for reuse, expiry, purpose mismatch, superseded code.
- **AUTH-3 OTP verify limits.** Max **5** wrong attempts per code, then the code is dead. Per identifier: **10** failed verifies per rolling hour → identifier locked for **1 h** (no new sends). Per IP: **30** failed verifies per hour. Compare in constant time. **Test:** brute-force test hits the limits; the 6th try with the right code fails.
- **AUTH-4 OTP storage.** Store `HMAC-SHA256(otp_pepper, identifier || purpose || code)`; pepper in KV. Never log or return the code (except the non-prod mock, GEN-3). **Test:** DB row contains no 6-digit plaintext.
- **AUTH-5 OTP send limits (anti SMS-pumping).**
  - Phone: per number **1 per 30 s**, **3 per 15 min**, **6 per 24 h**; per IP **10 per hour**, **30 per 24 h**; global hourly cap `SMS_GLOBAL_HOURLY_CAP` *(config, start 1,000)* → beyond it, phone OTP is paused with a friendly message and an alert fires (email OTP and Google stay available).
  - Email: per address **3 per 15 min**, **6 per 24 h**; per IP **10 per hour**; block disposable-email domains (list in config).
  - Responses are identical whether or not the account exists ("If this number can receive SMS, we've sent a code").
  - Resend button UI cooldown 30 s, then 60 s, then 120 s (server enforces the limits above regardless).
  **Test:** integration tests for each limit; non-+91 number → 400 without calling the provider.
- **AUTH-6 OAuth (Google).** Authorization code flow with **PKCE + state** (and nonce for the ID token); exact-match redirect URIs per environment; validate `iss`, `aud`, `exp`, signature (library default); require `email_verified=true` before using the email for anything; identify the Google account by `sub`, never by email. Scopes: `openid email profile` only. **Test:** callback with tampered state → rejected; ID token with `email_verified=false` → no linking.
- **AUTH-7 Account linking.** Linking a new identifier to an existing account happens **only while signed in, with a fresh session (≤ 10 min)**, after verifying the new identifier (OTP or Google). **No automatic merge** of two existing accounts because they share an email/phone. When an identifier is linked or unlinked, notify the other verified channels. The last remaining sign-in method cannot be unlinked. **Test:** sign in with Google whose email equals an email-OTP account → a **new** session is not attached to the old account unless linking was explicitly done while signed in.
- **AUTH-8 Session cookie.** Database-backed sessions; cookie name with the **`__Host-`** prefix, `HttpOnly; Secure; SameSite=Lax; Path=/`, no `Domain`. If the auth library offers a signed "cookie cache" of session data, keep it **off** (or ≤ 5 min and still re-checked for revocation on writes). Session token ≥ 128 bits from CSPRNG. **Test:** e2e inspects `Set-Cookie` after login on staging (through the Vercel rewrite).
- **AUTH-9 Session lifetimes** *(config)*:
  | Role | Absolute max | Inactivity | Refresh |
  |---|---|---|---|
  | student / parent | 90 days | 30 days | rolled at most once per 24 h |
  | reviewer / admin | 12 h | 60 min | on activity |
  Fresh-session window for sensitive actions: **10 min** (link/unlink, change phone/email, delete account, role change, admin config/content publish). Max **5** concurrent sessions per student account (oldest revoked). **Test:** time-travel integration tests.
- **AUTH-10 Session lifecycle.** New session id on every login (no reuse of any pre-login cookie → no fixation); logout deletes the server-side session and sends `Clear-Site-Data: "cookies"`; account deletion and role change revoke all sessions; `/me` lists sessions and can revoke others. **Test:** old cookie after logout → 401.
- **AUTH-11 Admin/reviewer accounts.** Sign in with Google restricted to the owner's allowlisted Workspace domain(s) *(config)* **plus TOTP** (or passkey) second factor; no OTP-only admin login. MFA recovery only via owner-run CLI with identity check. **Test:** reviewer without TOTP cannot reach `/v1/admin/*`.
- **AUTH-12 CSRF.** All state-changing methods (POST/PUT/PATCH/DELETE) require an `Origin` header that **exactly** matches the environment's allowlist (prod: `https://www.soylai.com`; stg: the staging host). Missing or other Origin → 403. Never allow wildcards such as `*.vercel.app` (anyone can host there). Require `Content-Type: application/json` on JSON routes (415 otherwise). GET/HEAD never change state. Exempt only `POST /v1/webhooks/razorpay` (HMAC-verified). **Test:** cross-origin POST with the victim's cookie → 403; form-encoded POST → 415.
- **AUTH-13 Return-to URL.** Login return target accepted only if it is a relative path starting with a single `/`, not `//` or `/\`, without scheme, and matching the platform route allowlist; otherwise `/learn`. **Test:** `?returnTo=//evil.com`, `/\evil.com`, `https://evil.com`, `javascript:` all go to `/learn`.
- **AUTH-14 Auth logging.** Log every login success/failure, OTP send, OTP lockout, link/unlink, logout, session revocation, role change with user id (if known), masked identifier (`+91******1234`, `a***@gmail.com`), IP, user agent hash, outcome. **Test:** log-capture test.
- **AUTH-15 Unconsented / abandoned accounts.** Accounts that never reach `consent=granted` are deleted after `UNCONSENTED_ACCOUNT_TTL_DAYS` *(config; owner to set, default 30)* by a worker job. **Test:** job test.

### 3d. Rate limits (API-wide, in addition to AUTH-3/5)
- **API-RL-1** Defaults *(config)*: per user **300 req/min**; per IP **600 req/min**; auth routes per IP **60/min**.
- **API-RL-2** Route buckets ready for later milestones (declare now, enforce when the route lands): AI `POST /v1/ai/:action` **10/min per user, max 2 concurrent streams**; uploads **5/hour, 20/day per user**; attempt start **30/hour per user**; autosave **1 per 5 s per attempt (burst 3)**; submit **5/min per attempt**; content reports **20/day per user, 50/day per IP**; merge-guest **once per account** (idempotent); account creation **20/day per IP** (soft, alert), **3/day per device cookie**.
- **Test:** each limit has an integration test using a fake clock.

### 3e. Errors and logging
- **API-13 Errors.** RFC 7807 problem+json with a generic `title`, a stable `type`, and the trace id. Never return stack traces, SQL, provider error bodies or `error.message` from libraries. **Test:** forced DB error → generic 500 body.
- **API-14 Log redaction (pino `redact` + serializers).** Never log: `cookie`, `set-cookie`, `authorization`, `x-soyl-edge-auth`, `x-razorpay-signature`, any field named `otp|code|token|secret|password|key`, request/response bodies of `/v1/auth/*`, `/v1/ai/*`, uploads, AI prompts/outputs (those live only in `ai_messages` with 30-day retention). Phone/email masked as in AUTH-14. URLs logged without query strings. Log values are JSON-encoded (no log injection). **Test:** unit test feeds a request with an OTP, cookie and phone through the logger and asserts none appear in output.
- **API-15 Security events** logged at `warn`+ with a `security=true` field: authz denials, CSRF/Origin failures, edge-secret failures, rate-limit trips, webhook signature failures, admin actions (also to `audit_log`).
- **API-16 Fail closed.** If Redis (rate limits/credits), Content Safety, the consent provider or KV is unavailable, the affected feature is refused with a friendly 503 rather than allowed without the check. Learning content reads keep working. **Test:** fault-injection tests with each dependency down.

---

## 4. web-platform (and design-system for rendering helpers)

- **WEB-1 No third-party requests on platform routes.** Platform pages load scripts, styles, fonts, images and XHR only from the site origin and the CDN origin; **Razorpay Checkout only on `/plans`**. The root layout's Vercel Analytics/Speed Insights must **not** load on platform routes (F-004; needs an ADR because it touches the root layout or `components/legal/ConsentedAnalytics.tsx`). **Test:** Playwright visits every platform route with consent "Accept all" set in localStorage and fails on any request to a non-allowlisted origin.
- **WEB-2 Rewrite with edge secret.** `/api/platform/:path*` → `${PLATFORM_API_ORIGIN}/:path*`, adding `x-soyl-edge-auth` from a server-only env var (`PLATFORM_EDGE_SECRET`, never `NEXT_PUBLIC_`) and overwriting any client-supplied copy. Mechanism (Next 16 `proxy.ts` with a matcher limited to `/api/platform/:path*` and platform routes, or a route-handler BFF) is chosen in ADR-005; whichever is chosen must not run on marketing routes and must stream SSE responses. **Test:** e2e: a client-supplied `x-soyl-edge-auth: x` is not what reaches the API (API logs a valid secret id); marketing routes are untouched (marketing regression).
- **WEB-3 CSP on platform routes.** Minimum policy (ASVS V3.4.3):
  `default-src 'self'; script-src <see below>; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: <CDN>; media-src 'self' blob: <CDN>; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-src 'none'; frame-ancestors 'none'; worker-src 'self' blob:; upgrade-insecure-requests; report-to csp` with reports sent to a first-party endpoint.
  `script-src`: logged-in client routes (`/tests/attempt/*`, `/tests/result/*`, `/ask`, `/me`, `/admin/*`) use **per-request nonce + `'strict-dynamic'`** (these are dynamic anyway). Static/ISR routes (`/learn/**`) use `'self'` plus the **SHA-256 hash of the root layout's inline consent boot script**; if Next's inline runtime scripts make that impossible without `'unsafe-inline'`, record the exception in the CSP ADR (F-010) — never add third-party script hosts. `/plans` adds only the Razorpay Checkout origins required by Razorpay (verify in test mode) to `script-src`, `frame-src`, `connect-src`.
  **Test:** Playwright asserts the header on each route and zero CSP violation reports during the platform e2e suite.
- **WEB-4 Other headers on platform routes:** `Strict-Transport-Security: max-age=63072000; includeSubDomains` (confirm with owner that all `*.www.soylai.com` are HTTPS — there are none today), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()` (photo doubts use `<input type="file" accept="image/*" capture>`, which needs no camera permission), `Cross-Origin-Opener-Policy: same-origin` (`same-origin-allow-popups` on `/plans` if Razorpay needs it). **Test:** header assertions in Playwright.
- **WEB-5 No tokens in browser storage.** Session only in the HttpOnly cookie. `localStorage` holds only `soyl_guest_v1` (progress ids/scores, **no name, phone, email or free text**) and UI preferences. **Test:** Playwright reads localStorage after login and asserts only allowlisted keys.
- **WEB-6 Rendering untrusted text.** Platform code does not use `dangerouslySetInnerHTML` except in reviewed renderer components (`components/platform/render/**`) that sanitise first (WEB-7). ESLint `react/no-danger: error` for `app/(platform)/**` and `components/platform/**` with per-file overrides only in the renderer folder. **Test:** lint.
- **WEB-7 Content renderers (design-system owns the components; ready before M2 content).**
  - Markdown (`*_md`): CommonMark renderer **without raw HTML** (no `rehype-raw`); links only `https:`/`mailto:` and same-site paths, rendered with `rel="noopener noreferrer nofollow"`; images only from the CDN origin.
  - KaTeX: `trust: false`, `strict: 'warn'`, `maxExpand: 1000`, `maxSize: 10`, `throwOnError: false` (render error text, not HTML).
  - SVG diagrams: prefer structured specs rendered by our components. Raw SVG is sanitised with an allowlist (DOMPurify SVG profile or equivalent): no `script`, `foreignObject`, `iframe`, `object`, `embed`, `style` with `@import`/`url()`, no `on*` attributes, `href`/`xlink:href` only `#fragment`, no external `url()` references; then rendered. The same sanitiser runs at pipeline stage 4 and admin save (F-012).
  - AI tutor output: same Markdown rules; **no remote images** (prevents prompt-injection data exfiltration via image URLs).
  **Test:** renderer unit tests with an XSS corpus (`<script>`, `<img onerror>`, `javascript:` links, `<svg onload>`, `<foreignObject>`, KaTeX `\href{javascript:...}`, `\url`, nested macros) produce no executable output.
- **WEB-8 Return-to and redirects** follow AUTH-13 on the client too; no `window.location = <param>` without the same check.
- **WEB-9 Logout** clears in-memory state and calls the API logout; guest data is left alone (it is not personal), but any cached personal API responses in the service worker/cache are cleared.
- **WEB-10 Service worker / PWA** (if added): never caches `/api/platform/*` responses that require auth, except the test player's own offline queue, which is cleared on submit and logout.
- **WEB-11 Platform env vars.** Only `NEXT_PUBLIC_PLATFORM_ENABLED`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `NEXT_PUBLIC_CDN_BASE_URL` are public. A CI check fails if any env var name containing `SECRET`, `KEY_SECRET`, `TOKEN`, `PASSWORD` or `EDGE` is prefixed `NEXT_PUBLIC_`. **Test:** CI grep.
- **WEB-12 Forms.** OTP input uses `autocomplete="one-time-code"`, `inputmode="numeric"`; no OTP or phone number in URLs (`GET` query strings) — everything personal goes in POST bodies. **Test:** Playwright checks the URL after each auth step.

---

## 5. Hand-offs to later milestones (not M1, listed so schemas and interfaces leave room)
- ai-gateway (M4): credits rules AC-07/AC-08, upload pipeline F-013, moderation fail-closed, prompt-injection controls — see threat model §6 (AC-06..AC-08, AC-13..AC-16).
- billing-razorpay (M4): webhook rules AC-09, entitlement only from server-verified events.
- backend-api tests (M3): answer embargo and timer rules AC-11/AC-12.
