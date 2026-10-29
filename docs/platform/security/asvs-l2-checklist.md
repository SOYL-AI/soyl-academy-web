# OWASP ASVS 5.0.0 — Level 2 checklist for the SOYL Academy Learning Platform

> Owner: security-reviewer · Last updated: 2026-10-25
> Standard: OWASP Application Security Verification Standard **5.0.0** (released May 2025; requirement ids `Vx.y.z`, levels L1/L2/L3). Ids and levels taken from the official 5.0.0 CSV release. L2 includes all L1 items.
> Scope: platform pages (`app/(platform)`), the `/api/platform/*` edge path, the Azure API and worker, data stores, AI gateway, billing, admin. Marketing pages are out of scope except where they share the origin (see F-011 in the findings register).
> Columns: **Design** = how we meet it (requirement ids from [requirements-for-m1.md](requirements-for-m1.md), abuse cases `AC-xx` from [threat-model.md](threat-model.md)); **Verify** = T (automated test), S (scanner in CI), R (design/code review), M (manual pen-test at M6); **Owner** = agent. All statuses start **open**; security-reviewer sets `pass` only after verification evidence exists.
> Owner abbreviations: infra = infra-azure · db = db-schema · api = backend-api · ai = ai-gateway · bill = billing-razorpay · web = web-platform · ds = design-system · pipe = pipeline-engineer · qa = qa-e2e · lead = Lead.

---

## V1 Encoding and Sanitization

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 1.1.1 | Decode/unescape once, before validation | Fastify/zod parse once; no double URL-decoding of ids | R | api | open |
| 1.1.2 | Output encoding as the final step | React escaping; renderers in `components/platform/render` (WEB-6/7) | R, T | web, ds | open |
| 1.2.1 | Context-appropriate output encoding | React text nodes; JSON responses via serializer | R | web, api | open |
| 1.2.2 | Encode untrusted data in URLs | `encodeURIComponent` in API client; return-to rules AUTH-13 | T | web | open |
| 1.2.3 | Encode when building JS/JSON | JSON-LD escaping pattern (as `components/seo/StructuredData.tsx`); no string-built scripts | R | web | open |
| 1.2.4 | Parameterised queries | Drizzle only; raw SQL only via tagged `sql` templates; lint rule against `sql.raw` with input | S (CodeQL), R | db, api | open |
| 1.2.5 | OS command injection | No shell-outs in API; PDF/image processing via libraries, not CLI with user input | R | ai | open |
| 1.2.8 | LaTeX processors configured securely | KaTeX in browser with `trust:false`, macro/size limits (WEB-7); no server-side TeX | T | ds | open |
| 1.2.9 | Escape regex special characters | Search/filter inputs escaped or matched literally | R | api | open |
| 1.3.1 | Sanitise WYSIWYG/HTML input | Admin editor stores Markdown, not HTML; no raw HTML rendered (WEB-7) | T | web, ds | open |
| 1.3.2 | No `eval`/dynamic code | ESLint `no-eval`, `no-new-func`; CSP without `unsafe-eval` in prod | S | all | open |
| 1.3.3 | Sanitise before dangerous contexts | Display names, report text rendered as text (AC-18, AC-20) | T | web | open |
| 1.3.4 | **SVG scriptable content sanitised** | Allowlist sanitiser at pipeline stage 4, admin save and render; prefer structured specs (AC-19, F-012) | T | ds, pipe, web | open |
| 1.3.5 | **Markdown/CSS scriptable content sanitised** | Markdown without raw HTML; link/image allowlists (WEB-7) | T | ds | open |
| 1.3.6 | SSRF protection | No URL-based uploads; outbound allowlist; Razorpay/OAuth URLs fixed in config (AC-16) | R, T | ai, api | open |
| 1.3.7 | Template injection | Prompt templates are files in git; user text inserted as delimited data only (AC-13/14) | R | ai | open |
| 1.3.10 | Format strings | Structured logging (pino) with objects, not format strings with user input | R | api | open |
| 1.3.11 | Mail injection | Email OTP via provider API with fixed template; no user-controlled headers | R | api | open |
| 1.4.2 | Integer overflow / range | Money in integer paise, credits as integers with zod bounds; CHECK constraints (DB-2) | T | db, ai | open |
| 1.5.1 | Restrictive XML parsing | Applies to SVG: sanitiser parses without external entities/DTDs; uploaded SVG rejected (AC-16) | T | ds, ai | open |
| 1.5.2 | Safe deserialisation | JSON only, zod-validated; no `__proto__` merge (see 15.3.6) | T | api | open |

N/A in V1: 1.2.6 (LDAP), 1.2.7 (XPath), 1.3.8 (JNDI), 1.3.9 (memcache), 1.4.1/1.4.3 (memory safety — managed runtime; native deps covered by V15 scanning).

## V2 Validation and Business Logic

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 2.1.1 | Documented input validation rules | zod schemas in `platform/shared` are the documentation; OpenAPI generated | R | api | open |
| 2.1.2 | Documented cross-field consistency rules | Attempt/test/live-event rules (AC-11/12), credit rules (AC-07/08) | R | api, ai | open |
| 2.1.3 | **Documented business limits per user and global** | Rate limits and caps in requirements §3d, AUTH-5, AC-06 budgets; values in config | R | api, ai | open |
| 2.2.1 | Positive validation | zod `.strict()` schemas with lengths/enums (API-8) | T | api | open |
| 2.2.2 | Validation at a trusted layer | API validates everything; client validation is UX only | R | api | open |
| 2.2.3 | Combinations of data reasonable | e.g. board/class/subject must exist together in catalog; marks ≤ max | T | api | open |
| 2.3.1 | Business flows in order, no step skipping | Attempt state machine; OTP → session; checkout → webhook → entitlement | T | api, bill | open |
| 2.3.2 | Business limits implemented | Tests for every limit (requirements §3d) | T | api | open |
| 2.3.3 | Transactions all-or-nothing | Webhook processing, ledger writes, attempt submit in DB transactions | T | api, bill, ai | open |
| 2.3.4 | **Locking for limited resources** | Credits: atomic Redis Lua + ledger uniqueness (AC-07); one active attempt (DB-2) | T | ai, db | open |
| 2.4.1 | **Anti-automation on costly functions** | OTP/SMS caps, AI caps, account-creation caps, upload caps (AC-02, AC-06) | T | api, ai | open |

## V3 Web Frontend Security

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 3.2.1 | Prevent rendering in wrong context | `nosniff`, exact `Content-Type`, uploads served as attachments from SAS (AC-16) | T | api, web | open |
| 3.2.2 | Text rendered as text | React text nodes; `react/no-danger` lint (WEB-6) | S | web | open |
| 3.3.1 | Cookies `Secure` + prefix | `__Host-` session cookie (AUTH-8) | T | api | open |
| 3.3.2 | `SameSite` per purpose | `Lax` for session (top-level OAuth return needs it) + Origin check (AUTH-12) | T | api | open |
| 3.3.3 | `__Host-` prefix unless shared | Yes (AUTH-8) | T | api | open |
| 3.3.4 | `HttpOnly` for session tokens | Yes (AUTH-8) | T | api | open |
| 3.4.1 | HSTS | WEB-4 (platform); site-wide via F-011 ADR | T | web | open |
| 3.4.2 | CORS origin fixed | No CORS at all; same-origin via rewrite (API-4) | T | api | open |
| 3.4.3 | **CSP with `object-src 'none'`, `base-uri 'none'`, allowlist/nonce/hash** | WEB-3; ISR routes exception tracked in F-010 | T | web | open |
| 3.4.4 | `nosniff` on all responses | API-4, WEB-4 | T | api, web | open |
| 3.4.5 | Referrer policy | `strict-origin-when-cross-origin` pages; `no-referrer` API | T | web, api | open |
| 3.4.6 | `frame-ancestors` on every response | `'none'` on platform (WEB-3) | T | web | open |
| 3.5.1 | CSRF defence without relying on preflight | Exact Origin allowlist + JSON content type (AUTH-12) | T | api | open |
| 3.5.2 | Preflight cannot be bypassed | Not relied on; covered by 3.5.1 | R | api | open |
| 3.5.3 | Sensitive actions use non-safe methods | GET never mutates (AUTH-12) | T | api | open |
| 3.5.4 | **Separate apps on separate hostnames** | **Deviation:** marketing, platform and admin share `www.soylai.com` by design. Mitigations: CSP, headers, admin MFA; proposal `admin.soylai.com` (F-011) | R | lead, web | open (deviation) |
| 3.5.5 | `postMessage` origin checks | Only Razorpay Checkout on `/plans` (library-managed); no custom listeners without origin check | R | web, bill | open |
| 3.7.1 | Only supported client technologies | Modern browsers; no plugins | R | web | open |
| 3.7.2 | Redirects to other hosts only via allowlist/notice | Return-to relative only (AUTH-13); external links `noopener` | T | web | open |

N/A in V3: none at L2 beyond those listed (3.1 is L3 documentation).

## V4 API and Web Service

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 4.1.1 | Correct `Content-Type` with charset | API-4 | T | api | open |
| 4.1.2 | Only user-facing endpoints redirect HTTP→HTTPS | API is HTTPS-only (`allowInsecure=false`), no redirects | T | infra | open |
| 4.1.3 | **Intermediary headers cannot be overridden by users** | Edge secret + trusted IP header (API-2/3, WEB-2) | T | api, web | open |
| 4.2.1 | Consistent HTTP message boundary parsing | Vercel edge + Fastify defaults; no custom proxies in between; reject ambiguous `Transfer-Encoding`/`Content-Length` (Node default) | R, M | infra, api | open |
| 4.4.x | WebSocket requirements | N/A now — streaming uses SSE over HTTPS. Re-assess if WebSockets are added for live mocks | — | api | n/a |

N/A in V4: 4.3.1–4.3.2 (no GraphQL).

## V5 File Handling

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 5.1.1 | Documented types, extensions, max size | Images (JPEG/PNG/WebP/HEIC) and PDF; ≤ 10 MB; ≤ 40 MP; ≤ 10 pages (AC-16) | R | ai | open |
| 5.2.1 | Size limits | SAS upload + worker check; quotas per user | T | ai | open |
| 5.2.2 | Extension matches content (magic bytes) | Magic-byte sniff; re-encode | T | ai | open |
| 5.2.3 | Compressed file limits | PDF stream/page limits; no archive uploads accepted | T | ai | open |
| 5.3.1 | Uploaded files never executed | Blob storage, never on web/app servers | R | infra | open |
| 5.3.2 | Internal file paths, not user filenames | Blob names are uuids | T | ai | open |
| 5.4.1 | Ignore user filenames; set `Content-Disposition` | Original name stored as metadata only; downloads `attachment` | T | ai | open |
| 5.4.2 | Encode served filenames (RFC 6266) | Use `filename*=` encoding if names are ever served | T | ai | open |
| 5.4.3 | **Antivirus scanning** | Defender for Storage malware scanning on `uploads-quarantine` (F-013) | R | infra | open |

## V6 Authentication

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 6.1.1 | Documented anti-automation for auth | AUTH-3/5 limits; `auth-pathways.md` | R | api | open |
| 6.1.3 | All auth pathways documented with consistent strength | `auth-pathways.md` (AUTH-1) | R | api | open |
| 6.3.1 | Credential-stuffing/brute-force controls | OTP limits (AUTH-3), no passwords | T | api | open |
| 6.3.2 | No default accounts | Admin bootstrap CLI only (DB-7) | T | db | open |
| 6.3.3 | **MFA or combination of factors** | **Deviation for students/parents:** single-factor OTP or Google (possession), chosen for children on shared low-end phones; mitigated by OTP limits, linking rules, session controls, optional second method. **Admins/reviewers: Google + TOTP** (AUTH-11). **Amended by ADR-026 (D-048): staff use the email code only, an owner-accepted deviation** (residual: allowlisted role grants via audited CLI, per-request superadmin check, 12 h / 60 min staff sessions, fresh session for writes, masked PII + audited reveal, OTP limits). Rationale to be recorded in `auth-pathways.md` | R | api | open (deviation) |
| 6.3.4 | No undocumented pathways | Route-policy snapshot (API-6) | T | api | open |
| 6.4.1 | System-generated codes random, expire, single use | AUTH-2 | T | api | open |
| 6.4.2 | No secret questions | None | R | api | open |
| 6.4.3 | Secure recovery not bypassing MFA | No passwords; admin MFA recovery via owner CLI (AUTH-11); moot while `STAFF_AUTH.secondFactor` is `none` (ADR-026) | R | api | open |
| 6.4.4 | Lost MFA factor → identity proofing | Owner-run CLI with identity check for admins | R | api | open |
| 6.5.1 | OTP usable once | AUTH-2 | T | api | open |
| 6.5.2 | Low-entropy codes stored hashed with salt | Keyed HMAC with KV pepper + identifier/purpose binding (AUTH-4) — stronger than a public salt for a 10⁶ space; note as equivalent control | R | api | open |
| 6.5.3 | CSPRNG for codes and TOTP seeds | `crypto.randomInt`; library TOTP | R | api | open |
| 6.5.4 | ≥ 20 bits entropy | 6 digits ≈ 20 bits | R | api | open |
| 6.5.5 | OOB lifetime ≤ 10 min | SMS 5 min, email 10 min (AUTH-2) | T | api | open |
| 6.6.1 | **SMS OTP only for validated numbers, stronger alternative offered, risks explained** | Phone validated by the first OTP; Google sign-in offered as alternative; short notice on SMS risks on `/me`. Partial — TOTP not offered to students (deviation, see 6.3.3) | R | api, web | open (partial) |
| 6.6.2 | OOB codes bound to the originating request | Bound to identifier + purpose (+ attempt id) (AUTH-2) | T | api | open |
| 6.6.3 | OOB brute-force rate limiting | AUTH-3 | T | api | open |
| 6.8.1 | No identity spoofing across IdPs | Identify by provider `sub`; no auto-merge (AUTH-6/7) | T | api | open |
| 6.8.2 | Validate assertion signatures | ID token verified by library (AUTH-6) | T | api | open |
| 6.8.4 | Enforce required auth strength from IdP | Admin requires Workspace domain + TOTP on our side (AUTH-11); **not enforced under ADR-026** (email code only, owner-accepted) | T | api | open |

N/A in V6: 6.2.x (no user passwords), 6.1.2 (no passwords → no context word list), 6.8.3 (no SAML).

## V7 Session Management

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 7.1.1 | Documented inactivity + absolute timeouts | AUTH-9 table | R | api | open |
| 7.1.2 | Documented concurrent session policy | 5 per student; admins: per AUTH-9 | R | api | open |
| 7.1.3 | Federated session behaviour documented | Google is login only; our session independent of Google session (`auth-pathways.md`) | R | api | open |
| 7.2.1 | Session verified by trusted backend | DB-backed sessions in API (AUTH-8) | T | api | open |
| 7.2.2 | Dynamic tokens, not static keys | Yes | R | api | open |
| 7.2.3 | Reference tokens unique, CSPRNG, ≥ 128 bits | AUTH-8 | T | api | open |
| 7.2.4 | New token on (re-)authentication | AUTH-10 | T | api | open |
| 7.3.1 | Inactivity timeout | AUTH-9 | T | api | open |
| 7.3.2 | Absolute lifetime | AUTH-9 | T | api | open |
| 7.4.1 | Terminated sessions unusable | Server-side delete on logout (AUTH-10) | T | api | open |
| 7.4.2 | Disable/delete account kills sessions | AUTH-10 | T | api | open |
| 7.4.3 | Option to kill other sessions after factor change | Prompt after link/unlink (AUTH-7/10) | T | api, web | open |
| 7.4.4 | Visible logout on authenticated pages | Header menu in platform layout | T | web | open |
| 7.4.5 | Admins can terminate a user's/all sessions | `/v1/admin/users/:id` revoke; global revoke via auth-secret rotation runbook | T | api | open |
| 7.5.1 | Re-auth before changing auth attributes | Fresh session ≤ 10 min (AUTH-9) | T | api | open |
| 7.5.2 | Users view/terminate active sessions | `/me` sessions list (AUTH-10) | T | api, web | open |
| 7.6.1 | RP/IdP session lifetimes as documented | `auth-pathways.md` | R | api | open |
| 7.6.2 | No silent session creation | Explicit sign-in action; no auto-login from Google One Tap without click | R | web | open |

## V8 Authorization

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 8.1.1 | Documented function- and data-level rules | Route policy table (API-6) + object rules (API-7, API-12) | R | api | open |
| 8.1.2 | Documented field-level rules | Writable fields per route (API-8); response DTOs (API-9) | R | api | open |
| 8.2.1 | Function-level access enforced | Route-policy test, default deny (API-6) | T | api | open |
| 8.2.2 | **Data-specific access (IDOR)** | Owner-scoped queries, 404 (API-7); IDOR matrix (AC-17) | T | api, qa | open |
| 8.2.3 | Field-level access | Answers hidden pre-submit (API-9); admin PII masked by default (AC-27) | T | api | open |
| 8.3.1 | Enforced at trusted service layer | API only; Next `proxy.ts` never used for authz (Next 16 docs say Proxy is not an authorization solution) | R | api, web | open |

N/A in V8: 8.4.1 (single tenant; schools are not tenants in beta).

## V9 Self-contained Tokens

N/A while sessions are DB-backed reference tokens. **Becomes applicable** if the auth library's signed cookie cache or any JWT is enabled (AUTH-8): then 9.1.1–9.1.3 and 9.2.1–9.2.4 apply (signature/MAC verified, algorithm allowlist, trusted keys, `exp`/`nbf`, type and audience checks). Owner: api.

## V10 OAuth and OIDC (we are an OAuth client / relying party of Google)

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 10.1.1 | Tokens only to components that need them | Google tokens stay in the API; not sent to browser; not stored unless needed (store none beyond `sub`/email) | R | api | open |
| 10.1.2 | Accept auth server values only from flows the client started | `state` + PKCE verifier bound to the browser session (AUTH-6) | T | api | open |
| 10.2.1 | CSRF protection in code flow | `state`/PKCE (AUTH-6) | T | api | open |
| 10.2.2 | Mix-up defence with multiple AS | Single AS (Google); `iss` checked | R | api | open |
| 10.5.1 | ID token replay (nonce) | Nonce checked (AUTH-6) | T | api | open |
| 10.5.2 | Identify user by `sub` | AUTH-6 | T | api | open |
| 10.5.3 | Reject AS impersonation via metadata | Google issuer/JWKS fixed in config | R | api | open |
| 10.5.4 | ID token `aud` check | Library default; test | T | api | open |
| 10.5.5 | Back-channel logout DoS | N/A — not used | — | api | n/a |

N/A in V10: 10.3.x (we are not a resource server for OAuth tokens), 10.4.x (not an authorization server), 10.6.x and 10.7.x (not an OpenID Provider).

## V11 Cryptography

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 11.1.1 | Key management policy and lifecycle | KV, rotation runbook (90 days shared secrets; on-suspicion rotation; two-secret overlap) (AC-21) | R | infra | open |
| 11.1.2 | Crypto inventory | Table in runbook: auth secret, OTP pepper, edge secret, Razorpay HMAC, TLS certs, DB/Redis TLS | R | infra | open |
| 11.2.1 | Industry-validated implementations | Node `crypto`, library TOTP, Azure-managed TLS | R | api | open |
| 11.2.2 | Crypto agility | Secret/algorithm ids stored with derived values (e.g. pepper version on OTP rows) | R | api | open |
| 11.2.3 | ≥ 128-bit security | HMAC-SHA256, 256-bit secrets, ≥ 128-bit session tokens | R | api | open |
| 11.3.1–11.3.3 | No ECB/weak padding; AES-GCM; authenticated encryption | No custom encryption planned; Azure at-rest encryption; if field encryption is added, AES-256-GCM | R | api | open |
| 11.4.1 | Approved hash functions | SHA-256 family only; no MD5/SHA-1 for security | S (CodeQL) | api | open |
| 11.4.2 | Password hashing | N/A for users (no passwords); applies if any password is ever stored | — | api | n/a |
| 11.4.3 | Collision-resistant hashes for integrity | SHA-256 | R | api | open |
| 11.5.1 | CSPRNG for non-guessable values | `crypto.randomBytes`/`randomInt`/`randomUUID`; lint against `Math.random` in auth/billing code | S | api | open |
| 11.6.1 | Approved algorithms for keys/signatures | Library defaults (Google RS256 verify) | R | api | open |

N/A in V11: 11.4.4 (no password-derived keys).

## V12 Secure Communication

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 12.1.1 | TLS 1.2+ only | Vercel, ACA, Front Door, Postgres, Redis, Storage min TLS 1.2 (INFRA-1/3/4) | S (IaC scan) | infra | open |
| 12.1.2 | Strong cipher suites | Platform defaults (managed services) | R | infra | open |
| 12.2.1 | TLS for all external HTTP services, no fallback | HSTS, `allowInsecure=false` | T | infra, web | open |
| 12.2.2 | Publicly trusted certificates | Vercel/Azure-managed certs | R | infra | open |
| 12.3.1 | TLS for all inbound/outbound incl. DB, monitoring | `require_secure_transport`, Redis TLS, HTTPS to providers | R | infra | open |
| 12.3.2 | TLS clients validate certificates | Never set `rejectUnauthorized:false`; lint/grep in CI | S | api | open |
| 12.3.3 | TLS between internal services | API↔worker via Postgres queue (TLS); ACA internal traffic over HTTPS if any | R | infra | open |
| 12.3.4 | Trusted certs internally | Azure-managed | R | infra | open |

N/A in V12: 12.1.3 (no mTLS).

## V13 Configuration

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 13.1.1 | Communication needs documented | DFD in threat model §4; egress allowlist list | R | infra | open |
| 13.2.1 | Backend comms authenticated (no default/static creds where avoidable) | MI/Entra for Postgres, Redis, Storage, AI, KV (INFRA-2..6) | R | infra | open |
| 13.2.2 | Least privilege for backend comms | Per-app MI roles; DB roles (DB-1) | R | infra, db | open |
| 13.2.3 | No default credentials | No admin users on ACR/Postgres defaults | S (IaC) | infra | open |
| 13.2.4 | **Outbound allowlist** | Egress allowlist (Azure services, Razorpay, Google, SMS, email, consent) | R | infra, api | open |
| 13.2.5 | Server allowlist for requests/loads | Same as 13.2.4; no user-controlled URLs (AC-16) | R | api | open |
| 13.3.1 | Secrets management solution | Key Vault (INFRA-6) | R | infra | open |
| 13.3.2 | Least-privilege secret access | Per-app RBAC (INFRA-6) | R | infra | open |
| 13.4.1 | No source control metadata deployed | Docker build context excludes `.git` (`.dockerignore`) | T | infra | open |
| 13.4.2 | Debug modes off in prod | `NODE_ENV=production`, Fastify logger level, no stack traces (API-13) | T | api | open |
| 13.4.3 | No directory listings | Blob anonymous list disabled (INFRA-4) | T | infra | open |
| 13.4.4 | No TRACE | Fastify registers no TRACE routes; test | T | api | open |
| 13.4.5 | Docs/monitoring endpoints not exposed unintentionally | OpenAPI UI disabled in prod or admin-only; `/readyz` reveals no detail | T | api | open |

## V14 Data Protection

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 14.1.1 | Sensitive data identified and classified | Threat model §2 + DB-5 PII inventory | R | db, lead | open |
| 14.1.2 | Protection requirements per level | Retention ADR (F-015), residency ADR (F-014) | R | lead | open |
| 14.2.1 | No sensitive data in URLs | WEB-12; ids only in paths | T | web, api | open |
| 14.2.2 | No sensitive data cached in intermediaries | `Cache-Control: no-store` on personal responses (API-4); CDN serves only public assets | T | api, infra | open |
| 14.2.3 | **Sensitive data not sent to trackers** | No third-party analytics on platform routes (WEB-1, F-004) | T | web | open |
| 14.2.4 | Controls per data level (retention, logging, access) | DB-5, API-14, retention ADR | R | api, infra | open |
| 14.3.1 | Clear client data after logout | `Clear-Site-Data: "cookies"`; SW cache cleanup (WEB-9/10) | T | web | open |
| 14.3.2 | Anti-caching headers on sensitive data | API-4 | T | api | open |
| 14.3.3 | No sensitive data in browser storage | WEB-5 | T | web | open |

## V15 Secure Coding and Architecture

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 15.1.1 | Remediation time frames for vulnerable components | INFRA-19 (48 h / 7 d / 30 d) | R | infra | open |
| 15.1.2 | SBOM maintained | INFRA-18 | S | infra | open |
| 15.1.3 | Resource-demanding functionality identified | AI actions, uploads, PDF export, live mocks, test assembly — listed in threat model AC-06/AC-16 | R | api, ai | open |
| 15.2.1 | Components within remediation windows | `npm audit` + Trivy gates (INFRA-15); currently failing (F-001..F-003) | S | infra, lead | open |
| 15.2.2 | Defences for resource-demanding functions | Rate limits, queues, caps, circuit breaker (AC-06) | T | ai, api | open |
| 15.2.3 | No extraneous functionality in prod | Mocks refuse to start in prod (GEN-3); dev routes disabled | T | api | open |
| 15.3.1 | Return only required fields | Response schemas (API-9) | T | api | open |
| 15.3.2 | Don't follow redirects on outbound calls unless intended | `fetch(..., { redirect: 'error' })` for provider calls | R | api | open |
| 15.3.3 | Mass-assignment protection | `.strict()` + allowlisted fields (API-8) | T | api | open |
| 15.3.4 | **Original client IP from trusted fields** | API-3 | T | api | open |
| 15.3.5 | Strict types/equality | TypeScript strict, zod; ESLint `eqeqeq` | S | all | open |
| 15.3.6 | Prototype pollution | Objects from JSON validated by zod `.strict()`; `Map` for dynamic keys; no deep-merge of request bodies | R, S | api | open |
| 15.3.7 | HTTP parameter pollution | Query params parsed by zod with single values; arrays explicit | T | api | open |

## V16 Security Logging and Error Handling

| ID | Requirement (short) | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| 16.1.1 | Logging inventory | Log inventory in runbook: what each layer logs, where, retention | R | infra, api | open |
| 16.2.1 | When/where/who/what metadata | pino JSON with trace id, user id, route, outcome | T | api | open |
| 16.2.2 | Synchronised time, UTC | Azure-managed NTP; UTC timestamps (GEN-6) | R | infra | open |
| 16.2.3 | Logs only to documented sinks | App Insights/Log Analytics only | R | infra | open |
| 16.2.4 | Common, parseable format | JSON | R | api | open |
| 16.2.5 | Sensitive data logged per protection level | Redaction (API-14) | T | api | open |
| 16.3.1 | All auth events logged | AUTH-14 | T | api | open |
| 16.3.2 | Failed authorization logged | API-15 | T | api | open |
| 16.3.3 | Security events and bypass attempts logged | API-15 (CSRF, edge secret, rate limits, webhook signature) | T | api | open |
| 16.3.4 | Unexpected errors and control failures logged | Error handler + dependency-failure logs (API-16) | T | api | open |
| 16.4.1 | Log injection prevented | JSON-encoded fields (API-14) | T | api | open |
| 16.4.2 | Logs protected from access/modification | Log Analytics RBAC; no delete rights for app identities | R | infra | open |
| 16.4.3 | Logs shipped to a separate system | Log Analytics workspace | R | infra | open |
| 16.5.1 | Generic error messages | API-13 | T | api | open |
| 16.5.2 | Secure operation when dependencies fail | Circuit breakers, timeouts, API-16 | T | api, ai | open |
| 16.5.3 | **Fail securely, no fail-open** | API-16; F-027 | T | api, ai | open |

## V17 WebRTC

N/A — no WebRTC, TURN or media servers (17.1.1, 17.2.1–17.2.4, 17.3.1–17.3.2).

---

## Platform-specific items not covered by ASVS (tracked here so they are not lost)

| ID | Item | Design | Verify | Owner | Status |
|---|---|---|---|---|---|
| X-1 | LLM prompt injection (direct and indirect) | AC-13, AC-14; Prompt Shields; structured outputs; no side-effecting tools | T (red-team set) | ai | open |
| X-2 | Unsafe content for minors | AC-15; strict moderation thresholds; fail closed | T (eval set) | ai | open |
| X-3 | Denial of wallet | AC-06; tier budgets | T (load) | ai | open |
| X-4 | Test integrity | AC-11, AC-12 | T | api | open |
| X-5 | DPDP children's obligations | AC-25; owner/counsel decisions (F-016) | R | lead | open |
| X-6 | CERT-In 6-hour incident reporting; 180-day ICT logs in India | Incident runbook; INFRA-11 | R | infra | open |
