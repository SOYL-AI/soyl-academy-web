# backend-api — M1 API foundation, auth, me, catalog, worker skeleton — 2026-10-26

Status: **done**, green (stand-in) per D-010. Every check ran against real PostgreSQL (the embedded server from `@soyl/db`) with the in-memory KV and mock providers. Nothing ran against real Google, SMS, email or consent services; none exist yet (OA list).

Branch: `platform/backend-api/m1` (worktree `C:/Users/Prabhu/soyl-wt/backend-api-m1`).

## What changed

| Path | What |
|---|---|
| `platform/api/` | New workspace `@soyl/api`: Fastify 5 + `fastify-type-provider-zod` 7 (zod 4.6.7) + `@fastify/swagger`, Better Auth 1.7.13 (identity core), openid-client 6 + jose (Google), ioredis 5 (KV). |
| `platform/api/openapi.json` | Generated contract (`npm run openapi -w @soyl/api`); a test fails if it is stale. |
| `platform/api/src/contract/guest.ts` | Guest-progress contract (`soyl_guest_v1`) for web-platform. Its only dependency is zod/v4. |
| `platform/worker/` | New workspace `@soyl/worker`: pg-boss 12 skeleton, purge/sweep jobs, health server, graceful stop. |
| `platform/shared/config/security.ts` | New: OTP, session, rate-limit, consent and display-name numbers, `TEST_PHONE_PREFIX`, `safeReturnTo` (AUTH-13), log masking helpers. Imports nothing, so the web can use it. |
| `docs/platform/adr/002-auth-better-auth.md`, `003-queue-pg-boss.md`, `005-same-domain-proxy.md` | ADRs. |
| `platform/package-lock.json` | New pinned dependencies. |

## Endpoints (all JSON; errors are RFC 7807 `application/problem+json` with `code` and `traceId`)

Browser path = `/api/platform` + API path (ADR-005). Every `/v1` call needs the edge secret, which the route handler adds.

| Method | Path | Who | Notes |
|---|---|---|---|
| GET | `/healthz`, `/readyz` | probes | No edge secret; `{status}` only. |
| GET | `/v1/session` | anyone | `{authenticated, user, consent, session:{id, expiresAt, fresh}}`; guest → `authenticated:false`. |
| POST | `/v1/auth/phone/send-otp` | anyone | `{phoneNumber}` (+91 mobiles; spaces/dashes ok) → `{sent:true, resendAfterSeconds}` (30, then 60, then 120). |
| POST | `/v1/auth/phone/verify` | anyone | `{phoneNumber, code, returnTo?}` → `SignInResponse {user, isNewUser, consent, returnTo}` + session cookie. |
| POST | `/v1/auth/email/send-otp` | anyone | `{email}`; disposable domains → 400. |
| POST | `/v1/auth/email/verify` | anyone | `{email, code, returnTo?}` → `SignInResponse`. |
| GET | `/v1/auth/google/start?returnTo=&intent=signin\|link` | anyone (link: signed in + fresh) | 302 to Google. **Navigate the browser here** (top-level, not fetch). |
| GET | `/v1/auth/google/callback` | Google redirect | 302 to `PUBLIC_BASE_URL + returnTo`. Failures add `?authError=<reason>` (below); a successful link adds `?linked=google`. |
| POST | `/v1/auth/sign-out` | anyone | 204, clears the cookie, `Clear-Site-Data: "cookies"`. |
| POST | `/v1/auth/link/phone/send-otp`, `/verify` | member, fresh | Adds a phone; verify returns `{phone, email, google}`. |
| POST | `/v1/auth/link/email/send-otp`, `/verify` | member, fresh | Adds an email. |
| POST | `/v1/auth/unlink` | member, fresh | `{method: phone\|email\|google}`; the last method → 409 `last_sign_in_method`. |
| GET | `/v1/me` | member | Profile, `consent`, `methods`, `guestMergedAt`. `schoolId` only when consent is granted. |
| PATCH | `/v1/me` | member | Only `displayName`, `board`, `classLevel`, `schoolId` (needs consent), `locale` (`en-IN`/`hi-IN`). Anything else → 400. |
| DELETE | `/v1/me` | member, fresh | Anonymises now, revokes all sessions, purge ≤ 30 days → `{deleted:true, purgeAfter}`. |
| POST | `/v1/me/merge-guest` | member | Body = `GuestProgress` (≤ 256 KB). Once per account; replays → `alreadyMerged:true`. |
| POST | `/v1/me/consent/start` | member | `{status, redirectUrl}`; mock: required → pending (auto-granted in local dev). |
| GET | `/v1/me/sessions` | member | List; `current` marks this one. |
| DELETE | `/v1/me/sessions/:id` | member | 204; someone else's id → 404. |
| DELETE | `/v1/me/sessions` | member | Sign out everywhere else → `{revoked}`. |
| GET | `/v1/catalog/boards` | anyone | Boards with classes; ETag + `Cache-Control: public, max-age=300, s-maxage=3600, stale-while-revalidate=86400`. |
| GET | `/v1/catalog/:board/:class/subjects` | anyone | `board` ∈ cbse, cisce; `class` 7–12. |
| GET | `/v1/catalog/subjects/:id/chapters` | anyone | `:id` is the subject key, e.g. `cbse-10-science`; chapters in board order with topics. |
| GET | `/v1/dev/otp-outbox?to=` | local/test only | Last mock OTP for `+91555000xxxx` or `*@example.com`; hidden from OpenAPI. |

Problem `code`s the UI should handle: `validation_failed` (with `errors[{path,message}]`), `unauthenticated`, `forbidden`, `consent_required`, `consent_unavailable`, `fresh_session_required` (send the user through sign-in again, then retry), `otp_invalid`, `otp_expired`, `otp_locked` / `rate_limited` (with `retryAfterSeconds` + `Retry-After`), `phone_otp_paused` (offer email or Google), `identifier_unavailable`, `last_sign_in_method`, `origin_not_allowed`, `unsupported_media_type`, `payload_too_large`, `service_unavailable`, `staff_sign_in_requires_google`, `account_disabled`, `not_found`, `internal`.

Google `authError` values: `oauth_state` (expired, replayed or other-browser flow; just retry), `oauth_failed`, `email_unverified`, `account_exists_link_required` (an account already uses this email: sign in with email OTP, then link Google from /me), `identifier_unavailable`, `staff_domain_not_allowed`, `account_disabled`, `link_requires_fresh_session`.

## How web-platform should call auth

- All calls go to `/api/platform/v1/...` via the route handler in ADR-005. That ADR has the full contract: path allowlist, headers to set or strip, streaming, `set-cookie` pass-through, `redirect: 'manual'`.
- Every POST/PATCH/DELETE must be a `fetch` with `Content-Type: application/json` (when there is a body) from a page on the allowed origin. The browser's `Origin` goes through unchanged. A body-less POST (sign-out, consent/start) sends no content type.
- There is **no Better Auth client**: Better Auth's HTTP handler is not mounted (ADR-002). Use the typed client generated from `platform/api/openapi.json` into `platform/shared/api-client`.
- Session: HttpOnly cookie only (WEB-5). Read state with `GET /v1/session`. On 401, show the login modal. `returnTo` must pass `safeReturnTo()` from `platform/shared/config/security.ts` (AUTH-13, WEB-8), the same check the API applies.
- OTP form: `autocomplete="one-time-code"`, `inputmode="numeric"`, 6 digits. Use `resendAfterSeconds` for the resend button.
- Google: `window.location.assign('/api/platform/v1/auth/google/start?returnTo=' + encodeURIComponent(safeReturnTo(path)))`. On return, read `authError` / `linked` from the URL and remove them.
- Guest merge: after the first successful sign-in, `POST /v1/me/merge-guest` with the `soyl_guest_v1` object. When `merged || alreadyMerged`, clear completed items from localStorage. **Keep** incomplete lesson positions (`ignored.positionsNotStored`) until the lesson-progress table exists (schema request below).
- Consent: `consent` comes back on sign-in, `/v1/session` and `/v1/me`. Anything except `granted` hides AI, leaderboards, school/city and notifications (D-014). Tests, practice and merge stay open. `POST /v1/me/consent/start` starts the parent flow.

## Guest-merge payload (`platform/api/src/contract/guest.ts`, schema `GuestProgress` in OpenAPI)

```ts
{
  v: 1,
  board?: 'cbse' | 'cisce',
  classLevel?: 7..12,
  lessons:  [{ chapter: 'cbse-10-science-ch01', slide: 0..1000, completed: boolean, updatedAt: ISO-8601 }]   // ≤ 500
  practice: [{ chapter: 'cbse-10-science-ch01', question: 'q_…', correct: boolean, answeredAt: ISO-8601 }]   // ≤ 3000
}
```
Strict: unknown keys or free text → 400. Server rules: ids must exist (current academic year; questions current, published/reviewed, practice pool). Completed lessons and correct practice answers become `xp_events` (`guest:chapter` / `guest:question` sources) with capped XP (AC-23: 2 per lesson, 1 per question, 200 total). Board/class fill an empty profile only.

## Local dev recipe (for web e2e)

```
cd platform && npm ci
npm run dev -w @soyl/api          # http://localhost:8787  (8080 is often taken locally; containers use PORT=8080)
```
- What it starts: embedded PostgreSQL (migrated, full catalog seeded, six fixture users), in-memory KV, mock SMS/email/consent (consent flow auto-grants), mock Google OIDC on `http://127.0.0.1:8090` (shows a one-field email form; `login_hint` skips it). The first run takes about 60 s while it initialises the cluster and seeds the catalog. Data is discarded on exit.
- Web `.env.local`: `PLATFORM_API_ORIGIN=http://localhost:8787`, `PLATFORM_EDGE_SECRET=local-dev-edge-secret-not-for-deployment-000000`, `NEXT_PUBLIC_PLATFORM_ENABLED=true`. The API expects the web on `http://localhost:3000` (`PUBLIC_BASE_URL`); cookies are `soyl_session` / `soyl_oauth` on http.
- Test identities: emails `*@example.com` (fixtures such as `student.cbse10@example.com`) and phones `+91555000xxxx` (fixture `+915550000001`). Get the code with `GET /api/platform/v1/dev/otp-outbox?to=<identifier>` (local/test only).
- Stop with Ctrl+C. The server closes the embedded database.

## How to verify (from `platform/`)

See the final report section in the Lead hand-back for the pasted outputs. Commands: `npm run typecheck`, `npm test -w @soyl/api -w @soyl/worker`, `npx vitest run --coverage` in `api/` and `worker/`, `npm run build -w @soyl/api`, `PORT=8787 node api/dist/index.js` + `curl localhost:8787/healthz`, `npm audit`.

## Tests added

API (`platform/api/test`): `route-policy` (every route has a policy; snapshot; AUTH-1 pathway list; a missing policy blocks start-up), `http-pipeline` (edge secret missing/wrong/rotated, client IP, CSRF Origin + 415, roles/MFA/fresh, headers, generic 500, response stripping, 413/depth, API-1 Host independence, flag off → 404), `email-otp`, `phone-otp` (lockouts, send caps, global cap, 50 parallel guesses), `google` (PKCE/state/nonce, tampered state, missing cookie, replay, PKCE mismatch, nonce/aud/iss/exp/signature, `email_verified=false`, no auto-link, alias emails, explicit link, staff domain, staff session lifetimes), `me` (allowlist, display names, school consent, sessions + IDOR, 5-session cap, member lifetimes, ban, deletion), `guest-merge`, `consent` (every state, fail-closed, refresh on login), `catalog` (shapes, 304, cache headers, KV-down behaviour), plus unit suites for config, providers (GEN-3), senders (fake fetch), KV, logging redaction, return-to, display names and OpenAPI drift.
Worker (`platform/worker/test`): job handlers and boundaries, cascades, pg-boss end to end, DB-1 role test, health, config, graceful stop.

## Deviations from ARCHITECTURE

1. **Better Auth is the identity core, not the HTTP surface** (ADR-002). Its handler is not mounted. Its OTP/admin/bearer plugins and social providers are not used. Every auth pathway is an explicit Fastify route with a policy and an OpenAPI entry. ARCHITECTURE §4.1 "`/v1/auth/*` (handled by auth library)" → handled by our routes on Better Auth's adapter.
2. **Account linking is explicit only.** ARCHITECTURE §5 says "account linking by verified email/phone". AUTH-7 forbids automatic merging, so a Google sign-in whose email matches an existing account is refused with `account_exists_link_required`.
3. **Extra endpoints** not in §4.1: `/v1/auth/link/*`, `/v1/auth/unlink`, `/v1/me/sessions*` (AUTH-10), `/v1/me/consent/start`, `/v1/dev/otp-outbox` (local only).
4. **JSON field names are camelCase** in API DTOs (`classLevel`, `displayName`, `schoolId`); content payloads keep their own snake_case schemas.
5. **Consent gate list follows D-014**, not API-11's default list: test attempts and merge-guest are **not** gated (both are in `CONSENT_FEATURES`, so adding them to `CONSENT.gatedFeatures` turns the gate on).
6. **Account purge is a daily sweep** (`account.purge`, worker) over `users.deleted_at`, rather than a per-user delayed job.

## Schema changes needed in @soyl/db (for the Lead to route)

1. **`lesson_progress`**: `(id uuid v7, user_id → users ON DELETE CASCADE, chapter_id → chapters, deck_id → decks NULL, position smallint, completed_at timestamptz NULL, source text CHECK IN ('app','guest_merge'), created_at, updated_at, UNIQUE(user_id, chapter_id))`. Stores lesson positions, including the ones merge-guest currently cannot store (`ignored.positionsNotStored`). Needed by M2 anyway.
2. **`practice_answers`** (or equivalent for M2 `POST /v1/practice/answers`): `(user_id, question_id → questions.id, question_key, correct boolean, answered_at, source)` with `UNIQUE(user_id, question_key, source)` where `source='guest_merge'`. Today merged practice survives only as `xp_events`.
3. **AUTH-11 TOTP**: `user_mfa (user_id PK → users CASCADE, totp_secret_enc text NOT NULL /* AES-GCM, key in KV */, confirmed_at timestamptz, recovery_codes_hash text[], created_at, updated_at)` and `sessions.mfa_verified_at timestamptz NULL`. Until these exist, routes with `policy.mfa` (all future `/v1/admin/*`) return 403 `mfa_required` (fail closed). Add both columns to PII.md.
4. **`TEST_PHONE_PREFIX`**: `@soyl/db` seed should import it from `platform/shared/config/security.ts` (same value `+91555000`) instead of defining its own.
5. Optional: `verifications.identifier` now holds `otp:<purpose>:<channel>:<HMAC(identifier)>`, not the raw email/phone. PII.md's description ("Email or phone an OTP was sent to") can be relaxed.

## Known gaps / follow-ups

- **Real providers untested**: MSG91 (DLT templates `otp`, `notice`), ACS Email, Google, and the consent adapter (OA-08). The request shapes are unit-tested with fake fetch. The production config refuses every mock (GEN-3), so prod cannot start until the real consent adapter exists. This is intended.
- **AUTH-11 TOTP** needs the schema above, so staff routes fail closed for now.
- **API-3 spike** on staging: confirm Vercel's `x-real-ip` cannot be spoofed (ADR-005).
- **Google `iss`**: Google may issue `accounts.google.com` without a scheme. openid-client checks `iss` against the discovery issuer exactly. Verify on staging; if it fails, normalise it.
- **Redis**: the ioredis store is exercised by the KV contract test only when `REDIS_URL` is set (CI redis:7). Locally, the memory store is used.
- **Device-cookie account-creation limit** (API-RL-2 "3/day per device cookie"): the bucket is declared, but no device cookie exists yet.
- `docs/platform/security/auth-pathways.md` (AUTH-1) belongs under security-reviewer's path. The pathway table is in ADR-002 §"Pathways"; security-reviewer can copy it.
- Uploads/blob deletion and Redis leaderboard cleanup in `DELETE /v1/me` land with those features (M3/M4).

## Decisions made

ADR-002 (auth), ADR-003 (pg-boss), ADR-005 (proxy contract).

## Needs from owner

None new. Existing: OA-08 (consent system contract), Google OAuth client, MSG91 + DLT templates, ACS Email resource (OWNER_ACTIONS).
