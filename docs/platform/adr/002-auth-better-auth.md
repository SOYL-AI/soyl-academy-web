# ADR-002: Authentication — Better Auth as the identity core, explicit Fastify auth routes

- **Status:** Accepted
- **Date:** 2026-10-26
- **Author:** backend-api
- **Related:** ARCHITECTURE §4, §5; DECISIONS D-008, D-010, D-012, D-014, D-016, D-025; security requirements AUTH-1..15, API-1..16, API-RL-*, DB-3, DB-4, GEN-3, GEN-5; threat model AC-01..AC-05, AC-17, AC-25..27; ADR-004 (Drizzle), ADR-005 (proxy); `platform/db/README.md` "Better Auth"

## Context

ARCHITECTURE §5 picks Better Auth inside the API, with sessions in Postgres and httpOnly cookies, for three methods: Google, phone OTP and email OTP. db-schema proved Better Auth 1.7.13 against our tables (`users`, `sessions`, `accounts`, `verifications`, plural, uuid v7) with the `phoneNumber`, `emailOTP` and `admin` plugins. It flagged two problems:

1. The `phoneNumber` plugin stores OTPs as plaintext `code:attempts` (violates AUTH-4).
2. Session tokens are stored unhashed, so the `bearer` plugin must never be enabled (DB-4).

The M1 security requirements add more that stock plugins do not give:

- every route declares a policy and appears in OpenAPI (API-6, AUTH-1);
- OTP attempts counted atomically so parallel guesses cannot exceed 5 (AC-01);
- HMAC-with-pepper storage bound to identifier and purpose (AUTH-4);
- per-number, per-IP and global send caps on Redis with trusted IPs (AUTH-5);
- PKCE + state + **nonce** with ID-token validation (AUTH-6);
- **no automatic account linking** (AUTH-7);
- role-specific session lifetimes and a 5-session cap (AUTH-9);
- `Clear-Site-Data` on logout (AUTH-10);
- staff restricted to a Workspace domain plus a second factor (AUTH-11).

## Options considered

1. **Better Auth end to end** (mount `auth.handler` at `/v1/auth/*`; stock plugins).
   Least code, but:
   - the auth surface becomes one wildcard route with no per-route policy or OpenAPI;
   - phone OTPs are stored in plaintext unless verification is reimplemented anyway;
   - OTP attempts are read-then-write, not atomic;
   - Better Auth's limiter trusts `X-Forwarded-For`;
   - its OAuth flow links accounts by email when linking is enabled;
   - the admin plugin exposes role changes and impersonation outside our audit and MFA rules.
2. **Auth.js** (ARCHITECTURE's fallback). Built around Next.js rather than a standalone Fastify API, and has the same plugin-shaped gaps. Switching libraries would also throw away db-schema's proven table mapping.
3. **Better Auth as the identity core, our own routes for every credential (chosen).**
   - Better Auth's Drizzle adapter and `internalAdapter` own the user, account and session rows (uuid v7 ids, its field mapping, its token generator).
   - Every sign-in pathway is an explicit Fastify route with zod schemas, a policy and an OpenAPI entry.
   - Credential checks (OTP, OIDC) are our code, written to the requirements.
4. **Fully custom identity layer.** Possible, but it discards the proven adapter and a maintained session/account model for no extra security.

## Decision

Option 3.

### What Better Auth does

- `betterAuth({ database: drizzleAdapter(db, { provider: 'pg', schema, usePlural: true }), advanced.database.generateId: uuidv7 })`, as proven by db-schema.
- Users, accounts and sessions are created and read through `internalAdapter`:
  - `createUser` (phone/email sign-up);
  - `createOAuthUser` (Google);
  - `linkAccount`;
  - `createSession` (token = 32 chars from its CSPRNG alphabet, ~190 bits, AUTH-8);
  - `findSession`;
  - `deleteSession`.
- Plugin columns (`phoneNumber`, `phoneNumberVerified`, `role`, `banned`, `banReason`, `banExpires`) plus our `deletedAt` are declared as `user.additionalFields` with `input: false`.
- Disabled:
  - telemetry;
  - its rate limiter;
  - email/password;
  - the cookie cache (AUTH-8).

### What Better Auth does not do

- **The HTTP handler is not mounted.** No `/api/auth/*` catch-all exists.
- **No `phoneNumber` / `emailOTP` plugins.** `OtpService` replaces them for both channels (`src/auth/otp.ts`).
- **No `admin` plugin.** Roles change only via an audited admin action (future) or the bootstrap CLI (DB-7). There is no impersonation.
- **No `bearer` plugin.** Ever (DB-4).
- **No social providers / genericOAuth.** Google uses `openid-client` (`src/auth/google.ts`).

### OTP (AUTH-2..5, AC-01, AC-02) — `src/auth/otp.ts`

- Codes are 6 digits from `crypto.randomInt`. Lifetime: SMS 5 min, email 10 min.
- One `verifications` row per (purpose, channel, identifier):
  - `identifier` = `otp:<purpose>:<channel>:<HMAC(identifier)>`, so no readable phone or email is stored;
  - `value` = `v1:<attempts>:<HMAC-SHA256(OTP_PEPPER, channel:identifier \n purpose \n code)>`.
- A new code deletes the previous one in the same transaction.
- **Attempts:** a single conditional `UPDATE … SET attempts+1 WHERE attempts < 5 AND expires_at > now RETURNING hash`. The row lock serialises parallel guesses. Tested: 50 parallel wrong guesses → ≤ 5 evaluated, and the right code is dead afterwards.
- The code is compared with `timingSafeEqual`. Success deletes the row with `DELETE … RETURNING`; only one concurrent winner gets the row.
- **Lockouts** (KV sliding windows):
  - 10 failures per identifier per rolling hour → 1 h lock (no sends, no verifies; the live code is deleted);
  - 30 failures per IP per hour → 429.
- **Send caps:**
  - phone: 1/30 s, 3/15 min, 6/24 h per number; 10/h and 30/24 h per IP; `SMS_GLOBAL_HOURLY_CAP` (default 1,000/h) → phone OTP pauses (`503 phone_otp_paused`, alert event) while email and Google keep working;
  - email: 3/15 min and 6/24 h per address; 10/h per IP;
  - disposable domains are refused.
- KV key names use an HMAC of the identifier, not the identifier.
- **India only:** `^\+91[6-9]\d{9}$`. Outside prod, the reserved test range `+91555000xxxx` is also accepted. Bad numbers get 400 before any provider call.
- **Uniform responses:** `{sent: true, resendAfterSeconds}` whether or not an account exists. The UI ladder is 30 s, 60 s, 120 s.
- **Senders behind interfaces:**
  - `SmsSender`: `MockSmsSender`, and `Msg91SmsSender` (Flow API v5, DLT template ids from `SMS_DLT_TEMPLATE_IDS`);
  - `EmailSender`: `MockEmailSender`, and `AcsEmailSender` (Azure Communication Services, HMAC access-key or managed-identity token; India data location, AC-24);
  - both real senders are unit-tested with a fake fetch and have not been called against real accounts (OA list).

### Google (AUTH-6, AUTH-7, AUTH-11) — `src/auth/google.ts`, `src/auth/identity.ts`

- **Flow:** authorization code with PKCE S256, `state` (24 random bytes) and `nonce`; scopes `openid email profile`.
  - The redirect URI is fixed from config: `${PUBLIC_BASE_URL}${API_PUBLIC_PATH}/v1/auth/google/callback` (API-1).
  - The state record (verifier, nonce, returnTo, intent, user id for linking) lives in KV for 10 min and is taken exactly once.
  - The state is also bound to the browser by an HMAC-signed HttpOnly `__Host-soyl_oauth` cookie, which stops login CSRF and replay in another browser.
- **ID-token validation:**
  - `openid-client` checks iss, aud, exp and nonce.
  - The callback **also verifies the JWS signature against the issuer's JWKS with `jose`**. openid-client may skip the signature for code-flow ID tokens received over TLS (OIDC Core 3.1.3.7); a test with a wrongly signed token showed this.
- **Account rules:**
  - Accounts are identified by `sub` only.
  - `email_verified` must be true.
  - A new `sub` whose (normalised, DB-3) email already belongs to an account is **refused** (`account_exists_link_required`). The user signs in the original way and links Google from `/me`.
  - Linking any identifier requires a signed-in, fresh (≤ 10 min) session and proof of the new identifier (OTP or Google). An identifier owned by another account → `409 identifier_unavailable`. The last method cannot be unlinked. Other verified channels are notified on link/unlink.
- **Tokens:** Google access, refresh and ID tokens are not stored. The platform never calls Google APIs for the user.
- **Testing:** the issuer is configurable (`GOOGLE_ISSUER`) so tests and local dev use `src/dev/mock-oidc.ts`, a small provider that enforces client auth, exact redirect URI, single-use codes and PKCE. Config refuses any issuer except `https://accounts.google.com` in prod, and anything except https outside local/test (GEN-3).

### Sessions (AUTH-8..10) — `src/auth/sessions.ts`

- **Cookie:** `__Host-soyl_session` = `<token>.<HMAC-SHA256(AUTH_SECRET, token)>`, `HttpOnly; Secure; SameSite=Lax; Path=/`, no `Domain`. On http://localhost (dev only) the name is `soyl_session` without Secure.
  - Because of the signature, a database reader cannot forge a cookie (DB-4 mitigation).
  - Raw-token auth (bearer) never exists.
- **Lifetimes** (`SESSION` in `platform/shared/config/security.ts`):

  | Role | Absolute max | Inactivity | Expiry rolled |
  |---|---|---|---|
  | members | 90 d | 30 d | at most once per 24 h |
  | staff | 12 h | 60 min | on activity |

  Time-travel tests cover both rows.
- **Fresh session:** session age ≤ 10 min (policy `fresh`). Required for link/unlink and account deletion.
- **Login:** always creates a new session and deletes any session presented with the request (no fixation). Members are capped at 5 sessions (oldest revoked).
- **Logout:** deletes the row and sends `Clear-Site-Data: "cookies"`.
- **Revocation:** `/v1/me/sessions` lists sessions and revokes one or all others (someone else's id → 404). Account deletion revokes everything. Banned or deleted users' sessions stop working.

### Staff (AUTH-11, API-10)

- Reviewer and admin accounts sign in **only with Google** and only when the ID token's `hd` equals the email domain and is in `ADMIN_GOOGLE_DOMAINS`. OTP sign-in for staff → `403 staff_sign_in_requires_google`.
- **TOTP is not feasible in M1 without a schema change.** The `twoFactor` plugin needs a `twoFactors` table and `users.twoFactorEnabled`, and a session needs an MFA-verified marker. The policy framework has `mfa: true`. Every such route returns `403 mfa_required` until the tables exist (fail closed). Schema request: `user_mfa` + `sessions.mfa_verified_at` (handoff). No `/v1/admin/*` routes exist in M1.

### Consent (API-11, D-014, AUTH-15, OA-08) — `src/consent/*`

- `ConsentProvider { getStatus(userId), startFlow(userId) }`, states `required | pending | granted | revoked`. The only implementation is `MockConsentProvider` (configurable default, per-user overrides, failure injection). The owner's real system is unknown (OA-08), so the interface stays minimal and server-to-server.
- `consent_status` is a cache: refreshed on every sign-in and after `CONSENT.cacheTtlSeconds` (15 min).
- **Gate:** a route declares `policy.consent: <feature>`. Features listed in `CONSENT.gatedFeatures` need `granted`, otherwise `403 consent_required`. A stale cache with the provider down → `503 consent_unavailable` (fail closed, API-16).
- **Gated list (D-014):** AI, uploads, leaderboards, rank cards, school/city profile fields, non-essential notifications. Tests and guest merge are declared but not gated (D-014 overrides API-11's default list).
- The worker purges never-consented student accounts after 30 days (AUTH-15, ADR-003).
- Production cannot start with the mock (GEN-3) until a real adapter exists. This is intended.

### Return-to (AUTH-13)

`safeReturnTo()` in `platform/shared/config/security.ts` (dependency-free, for web and API) accepts only a relative path that starts with a single `/` and a platform prefix. It rejects:

- `//` and `/\`;
- schemes;
- control characters and backslashes;
- encoded tricks.

Anything else becomes `/learn`.

### Logging (AUTH-14, API-14, API-15)

- **Auth events:** `auth=true` lines for OTP send/verify, lockout, login success/failure, logout, link/unlink, session revocation, account creation and deletion. Each carries user id, masked identifier (`+91******1234`, `a***@gmail.com`), client IP, user-agent hash and outcome.
- **Security events:** `security=true` at warn.
- **Never logged:** bodies; headers other than the user-agent hash; query strings. A key scrubber redacts `otp|code|token|secret|password|key` and the `*Token/*Secret/*Password` variants, cookies, authorization and the edge secret.

### Local development and tests

- `npm run dev -w @soyl/api` starts everything locally (embedded Postgres, memory KV, mocks, mock OIDC).
- **Dev OTP outbox:** `DEV_OTP_OUTBOX=true` (refused unless `APP_ENV` is local/test) registers `GET /v1/dev/otp-outbox?to=`. It returns the last **mock** code only for `+91555000xxxx` numbers and `@example.com` addresses. It is hidden from OpenAPI, edge auth still applies, and it exists for Playwright e2e only.

## Pathways (AUTH-1 — for `docs/platform/security/auth-pathways.md`)

| Pathway | Route(s) | Controls |
|---|---|---|
| Phone OTP sign-in/up | `POST /v1/auth/phone/send-otp`, `/verify` | +91 only; AUTH-2..5; HMAC storage; atomic attempts; staff refused; auth.ip 60/min; fail closed if KV down |
| Email OTP sign-in/up | `POST /v1/auth/email/send-otp`, `/verify` | same, plus disposable-domain block |
| Google sign-in/up | `GET /v1/auth/google/start`, `/callback` | PKCE S256, state (KV, single use) + signed state cookie, nonce, JWKS signature + iss/aud/exp, `email_verified`, by `sub`, no auto-link, staff domain |
| Link phone/email | `POST /v1/auth/link/{phone,email}/send-otp`, `/verify` | signed in + fresh; OTP with purpose `link`; identifier not owned elsewhere; notify other channels |
| Link Google | `GET /v1/auth/google/start?intent=link` → callback | signed in + fresh at start and callback (same user) |
| Unlink | `POST /v1/auth/unlink` | signed in + fresh; never the last method; notify |
| Sign out | `POST /v1/auth/sign-out` | deletes session; Clear-Site-Data |
| Session management | `GET/DELETE /v1/me/sessions[/:id]` | owner-scoped (404 otherwise) |
| (local/test only) OTP outbox | `GET /v1/dev/otp-outbox` | registered only with `APP_ENV` local/test + `DEV_OTP_OUTBOX`; test identifiers only |

There is no password, magic link, bearer token or impersonation pathway. `test/route-policy.test.ts` asserts the exact list.

## Consequences

- Our code owns the credential logic, so its tests are the safety net: route-policy snapshot, OTP limit and concurrency tests, OIDC tamper tests, lifetime time-travel tests. Better Auth upgrades are lower risk because only `internalAdapter` and the adapter mapping are used. Re-run `platform/db/test/better-auth.test.ts` and the API suite on every upgrade.
- Session tokens remain unhashed in the database (Better Auth limitation). The mitigations are the signed cookie, no bearer, a private database and expiry. Revisit if Better Auth adds hashed storage.
- AUTH-11 TOTP waits for the schema change; until then staff routes fail closed.
- Real providers (Google client, MSG91 + DLT, ACS Email, the consent adapter) need owner credentials. Each is a config switch behind an interface (D-010, D-025).

### Dependencies (GEN-5; exact pins in `platform/package-lock.json`; `npm audit`: 0 high/critical)

| Package | Why |
|---|---|
| fastify 5.12.7 | HTTP server (ARCHITECTURE §4) |
| fastify-type-provider-zod 7.0.0 | zod 4 schemas → validation, serialisation, OpenAPI |
| @fastify/swagger 9.9.2 | OpenAPI generation |
| zod 4.6.7 | D-012 |
| better-auth 1.7.13 | identity core (adapter, sessions) |
| openid-client 6.8.8 | OIDC discovery, PKCE, code grant, claim checks |
| jose 6.2.13 | JWKS signature verification (already a dependency of openid-client and better-auth) |
| ioredis 5.11.1 | Redis KV (5.x chosen over the two-week-old 6.0.0 major) |
| pino 10.4.0 | logger (Fastify's own) |
| drizzle-orm, pg | via @soyl/db (ADR-004) |
