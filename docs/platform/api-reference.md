# SOYL Academy Learning Platform — API reference

As built: 2026-10-28, generated from platform/main @ 49aa8a4 (first written at 2d76ef0; updated for the backend-api M5 follow-ups merge)

This lists **every route the Fastify API registers: 81 in total**. That is 80 public routes (2 health routes outside `/v1` plus 78 under `/v1`) and 1 dev-only hidden route. The count matches the reviewed route-policy snapshot, [`platform/api/test/__snapshots__/route-policy.test.ts.snap`](../../platform/api/test/__snapshots__/route-policy.test.ts.snap). The OpenAPI contract, [`platform/api/openapi.json`](../../platform/api/openapi.json), has 80 operations, because the dev-only route is hidden from it.

Sources, in order of authority: the route-policy snapshot (for roles, CSRF, rate limits, consent, fresh and MFA), `openapi.json` (for summaries and tags), [`platform/api/src/policy.ts`](../../platform/api/src/policy.ts) and [`platform/api/src/app.ts`](../../platform/api/src/app.ts) (for enforcement), [`platform/shared/config/security.ts`](../../platform/shared/config/security.ts) (for the numbers), and the handoffs cited per route. Where a handoff and the code disagree, the code wins.

---

## 1. How requests reach the API

| Caller | URL | Notes |
|---|---|---|
| Browser (platform pages) | `https://www.soylai.com/api/platform/v1/...` | Same-domain proxy ([ADR-005](adr/005-same-domain-proxy.md), [ADR-011 web headers and proxy](adr/011-platform-web-security-headers-and-proxy.md)). The Next.js route `app/(platform)/api/platform/[...path]/route.ts` removes the `/api/platform/` prefix and forwards the rest to `${PLATFORM_API_ORIGIN}/v1/...`. Only paths that match `^v1/[A-Za-z0-9/_\-.:]*$` are forwarded. Percent-encoding, `..` and empty segments are refused, and so are the health paths. |
| Razorpay | `https://www.soylai.com/api/platform/v1/webhooks/razorpay` | Goes through the same proxy. The proxy passes `x-razorpay-signature` and `x-razorpay-event-id` only on this path, and streams the body unchanged so the HMAC still verifies ([ADR-018 §2](adr/018-platform-web-tests-ai-plans.md), [runbook](runbooks/razorpay-webhook-replay.md)). |
| Probes (Container Apps) | `https://<api host>/healthz`, `/readyz` | Called directly on the API ingress. The proxy never forwards them. |

- **Base path:** every product route is under `/v1`. The test *"only health is outside /v1"* enforces that only `/healthz` and `/readyz` sit outside it. OpenAPI `servers[0].url` is `API_PUBLIC_PATH` (default `/api/platform`).
- **Edge auth (API-2):** every `/v1/*` request must carry `x-soyl-edge-auth` matching one of the configured edge secrets (env `EDGE_SECRETS`, or `EDGE_SECRET_CURRENT`/`EDGE_SECRET_PREVIOUS` from Key Vault). Otherwise the API answers `403 edge_auth_failed`. The proxy adds this header from `PLATFORM_EDGE_SECRET`, which is server-only. The client IP comes from `x-soyl-client-ip` (env `CLIENT_IP_HEADER`) and is trusted only after edge auth passes. `X-Forwarded-For` is never used.
- **Platform flag (GEN-4):** when `PLATFORM_ENABLED` is off, every route except health returns 404, and the proxy returns 404 too.
- **Proxy limits:** methods GET, POST, PUT, PATCH and DELETE only. HEAD and OPTIONS return 405. The default upstream timeout is 30 s. Request headers and response headers are each filtered against an allowlist (see `components/platform/server/api-proxy.ts`).

## 2. Authentication

- **Session cookie:** `__Host-soyl_session`. It is named `soyl_session` only on plain-http localhost. It is HttpOnly, and the cookie scheme is in [ADR-002](adr/002-auth-better-auth.md). Better Auth is the identity core: users, accounts and sessions in Postgres through its Drizzle adapter. **Better Auth's own HTTP handler is not mounted.** Every sign-in pathway is an explicit Fastify route under `/v1/auth/*` with a declared policy. The AUTH-1 test pins this list at exactly 13 routes.
- **Methods:** email OTP, phone OTP (+91 mobiles) and Google OIDC (PKCE + state + nonce). `AUTH_METHODS` switches methods off (D-031: production starts with email only). A disabled method answers `404 method_disabled`. `GET /v1/auth/methods` tells the web which methods to show.
- **Session lifetimes** (`SESSION` in `security.ts`):
  - Members: 90 days absolute, 30 days of inactivity.
  - Staff: 12 h absolute, 60 min of inactivity.
  - "Fresh" means the session is at most `SESSION.freshSeconds` = 600 s old.
- **Staff second factor (AUTH-11, [ADR-011 staff TOTP](adr/011-staff-totp.md)):** routes marked `mfa` need a confirmed TOTP enrolment and a session that has passed `POST /v1/me/mfa/verify`.

## 3. The route policy model

Every route declares `config.policy = { roles, csrf, rateLimit, consent, fresh?, mfa? }`. The server refuses to start if any route lacks a valid policy (`MissingPolicyError`, API-6). This is the default-deny rule.

| Field | Meaning |
|---|---|
| `roles` | Who may call the route: `guest` (no session), `student`, `parent`, `reviewer`, `admin`. No session on a route without `guest` → `401 unauthenticated`. Wrong role → `403 forbidden`. |
| `csrf` | AUTH-12: on POST, PUT, PATCH and DELETE, the `Origin` header must exactly match the environment allowlist, otherwise `403 origin_not_allowed`. Bodies must be `Content-Type: application/json`, otherwise `415 unsupported_media_type`. The check has no effect on GET. **The only `csrf=false` route is `POST /v1/webhooks/razorpay`**, which is verified by HMAC (`X-Razorpay-Signature` over the raw body). A test pins this exemption. |
| `rateLimit` | `false` means no limits; only the health routes use it. Otherwise the API-RL-1 defaults `api.ip` and `api.user` apply, plus any extra `buckets`. `failClosed` (API-16): if the rate-limit store (Redis) is down, the route refuses with `503 service_unavailable` instead of letting the request through. Auth, OTP, MFA and AI routes set it. |
| `consent` | API-11: a feature from `CONSENT_FEATURES`. It is enforced only for features in `CONSENT.gatedFeatures`: `ai`, `uploads`, `leaderboards`, `rank_cards`, `profile_school_city` and `notifications`. Those need consent state `granted`, otherwise `403 consent_required` (or `503 consent_unavailable` when consent cannot be checked). `test_attempts` and `merge_guest` are **declared but not gated** (D-014 in [DECISIONS.md](DECISIONS.md): learning and tests stay free). In the tables below they carry the mark †. |
| `fresh` | AUTH-9: the session must be at most 600 s old, otherwise `403 fresh_session_required`. |
| `mfa` | AUTH-11: the staff session must have passed TOTP, otherwise `403 mfa_required`. |

**Enforcement order.** Everything below runs in `onRequest` hooks, before the body is parsed (`app.ts`, `policy.ts`):

1. Platform flag (GEN-4), then edge auth for `/v1/*` (API-2), then trusted client IP (API-3).
2. CSRF Origin check (AUTH-12).
3. IP rate limits: `api.ip` plus the IP-keyed buckets.
4. Session resolution.
5. User rate limits: `api.user` plus the user-keyed buckets. These run only when the request has a session.
6. Roles.
7. MFA (AUTH-11).
8. Fresh session (AUTH-9).
9. Consent (API-11).

After the hooks, the request goes through:
- JSON parsing, with a 64 KB default body limit and depth and array-length checks (API-5).
- Strict zod request validation (API-8).
- Zod response serialisation, which strips unknown fields (API-9).
- Security headers on every response (API-4): `nosniff`, `no-referrer`, `default-src 'none'` CSP, `x-trace-id`, and `cache-control: no-store` on personal and error responses.

### 3.1 Rate-limit buckets (`RATE_LIMITS` in `platform/shared/config/security.ts`)

| Bucket | Key | Limit | Where it applies |
|---|---|---|---|
| `api.ip` | IP | 600 / 60 s | Default on every `/v1` route |
| `api.user` | user | 300 / 60 s | Default on every `/v1` route (signed in) |
| `auth.ip` | IP | 60 / 60 s | Auth and OTP routes, dev OTP outbox |
| `ai.user` | user | 10 / 60 s | AI actions, conversations, AI evaluation |
| `uploads.user.hour` | user | 5 / 3600 s | `POST /v1/ai/uploads` |
| `uploads.user.day` | user | 20 / 86400 s | `POST /v1/ai/uploads` |
| `attempt.start.user` | user | 30 / 3600 s | Start or resume a test attempt |
| `attempt.autosave` | attempt | 8 / 15 s | Checked in the handler of `PUT /v1/attempts/:id/responses` |
| `attempt.submit` | attempt | 5 / 60 s | Checked in the handler of `POST /v1/attempts/:id/submit` |
| `attempt.read.user` | user | 120 / 60 s | Attempt resume, result, `me/attempts`, live leaderboard |
| `attempt.evaluate.user` | user | 60 / 60 s | Self-evaluation |
| `tests.custom.user` | user | 20 / 3600 s | Custom test builder |
| `live.register.user` | user | 30 / 3600 s | Live-mock registration |
| `reports.user` | user | 20 / 86400 s | Content reports |
| `reports.ip` | IP | 50 / 86400 s | Content reports |
| `account.create.ip` | IP | 20 / 86400 s (soft: alert only) | Checked in the sign-up path (`auth/identity.ts`) |
| `account.create.device` | device | 3 / 86400 s | Declared but **not enforced anywhere** at this commit |
| `me.write.user` | user | 30 / 3600 s | `PATCH /v1/me` |
| `practice.answer.user` | user | 60 / 60 s | Practice answers |
| `practice.answer.ip` | IP | 300 / 60 s | `POST /v1/practice/answers` |
| `progress.write.user` | user | 120 / 60 s | `PUT /v1/me/lesson-progress` |
| `mfa.user` | user | 20 / 900 s | Staff TOTP routes |

The policy hook only knows IP keys and user keys. The attempt-keyed buckets are therefore enforced in the handlers (`modules/tests.ts`). Those handler-level checks fail open when the rate-limit store is down.

Some limits live outside `RATE_LIMITS`:
- OTP send and verify limits per identifier and per IP (`OTP` in `security.ts`).
- `SMS_GLOBAL_HOURLY_CAP`.
- At most 2 concurrent AI streams per user (`AI_MAX_CONCURRENT_STREAMS`).

A route over its limit returns `429 rate_limited` with `Retry-After` and `retryAfterSeconds`.

### 3.2 Error envelope (API-13)

Every error is RFC 7807 `application/problem+json` (`platform/api/src/errors.ts`):

```json
{ "type": "https://www.soylai.com/problems/<code-with-dashes>", "title": "<generic text>", "status": 403,
  "code": "<stable_code>", "traceId": "<request id>", "detail": "?", "errors": [{ "path": "body.x", "message": "..." }],
  "retryAfterSeconds": 0 }
```

- `detail`, `errors` and `retryAfterSeconds` appear only when relevant.
- `credits_exhausted` (402) and `plan_required` (403) add `balance`, `required`, `resetAt`, `resetInSeconds`, `plan` and `plansUrl`.
- Stable codes include `validation_failed`, `unauthenticated`, `forbidden`, `origin_not_allowed`, `consent_required`, `fresh_session_required`, `mfa_required`, `not_found`, `method_disabled`, `attempt_closed`, `live_not_open`, `test_unavailable`, `bank_too_small`, `billing_disabled`, `already_subscribed`, `rate_limited`, `otp_locked`, `ai_paused`, `ai_busy`, `ai_blocked_during_test`, `duplicate_request`, `upload_rejected`, `internal` and `not_implemented`. The full list is in `PROBLEMS`.
- Bodies never contain stack traces, SQL or provider error text.

### 3.3 Table legend

- **Roles:**
  - **All** = guest, student, parent, reviewer, admin.
  - **Members** = student, parent, reviewer, admin (a session is required).
  - **Staff** = reviewer, admin.
  - **Student** = student only.
- **CSRF:** the value of `csrf` in the snapshot. It only has an effect on state-changing methods.
- **Rate limit:** `default` = `api.ip` + `api.user`. Extra buckets are listed after it. **FC** = fail-closed.
- **Consent:** the declared feature, or `—` for none. † means declared but not gated (see §3).
- **Fresh/MFA:** `fresh`, `mfa`, or `—`.

---

## 4. Health (2)

Outside `/v1`. No edge auth and no rate limits. They are served even when the platform flag is off. The policy hook skips them.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/healthz` | All | true | none | — | — | Liveness: `{status:"ok"}` | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md), [infra-azure M1](handoffs/2026-10-26-infra-azure-m1.md) |
| GET | `/readyz` | All | true | none | — | — | Readiness: database and key-value store answer (200 `ready` / 503 `not_ready`) | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md), [infra-azure M1](handoffs/2026-10-26-infra-azure-m1.md); open finding S6-L08 (unthrottled) in [security M6](handoffs/2026-10-27-security-reviewer-m6.md) |

## 5. Auth (13)

`modules/auth.ts`. Send responses never reveal whether an account exists (AUTH-5). Auth bodies are never logged.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/auth/methods` | All | true | default | — | — | Which sign-in methods are enabled (the login sheet hides the others) | [prod-readiness](handoffs/2026-10-27-prod-readiness.md) |
| POST | `/v1/auth/phone/send-otp` | All | true | default + `auth.ip` FC | — | — | Send a sign-in code by SMS (+91 mobiles only) | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| POST | `/v1/auth/phone/verify` | All | true | default + `auth.ip` FC | — | — | Verify the SMS code and sign in (creates the account on first use) | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| POST | `/v1/auth/email/send-otp` | All | true | default + `auth.ip` FC | — | — | Send a sign-in code by email | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| POST | `/v1/auth/email/verify` | All | true | default + `auth.ip` FC | — | — | Verify the email code and sign in (creates the account on first use) | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| GET | `/v1/auth/google/start` | All | true | default + `auth.ip` FC | — | — | Start Google sign-in (302 to Google). `intent=link` adds Google to the signed-in account (fresh session) | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| GET | `/v1/auth/google/callback` | All | true | default + `auth.ip` FC | — | — | Google redirect target. Signs in (or links), then 302s to the validated `returnTo`. On failure it adds `?authError=<reason>` | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| POST | `/v1/auth/sign-out` | All | true | default + `auth.ip` | — | — | Delete the session and send `Clear-Site-Data: "cookies"` | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| POST | `/v1/auth/link/phone/send-otp` | Members | true | default + `auth.ip` FC | — | fresh | Send a code to a phone number to add it to your account | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| POST | `/v1/auth/link/phone/verify` | Members | true | default + `auth.ip` FC | — | fresh | Verify the code and add the phone number | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) (written as `…/send-otp`, `/verify`) |
| POST | `/v1/auth/link/email/send-otp` | Members | true | default + `auth.ip` FC | — | fresh | Send a code to an email address to add it to your account | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| POST | `/v1/auth/link/email/verify` | Members | true | default + `auth.ip` FC | — | fresh | Verify the code and add the email address | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) (written as `…/send-otp`, `/verify`) |
| POST | `/v1/auth/unlink` | Members | true | default + `auth.ip` FC | — | fresh | Remove a sign-in method (never the last one). Stays available when the method is disabled | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |

## 6. Session and account (9)

`modules/session.ts`, `modules/me.ts`.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/session` | All | true | default | — | — | Current session (guest when not signed in) | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| GET | `/v1/me` | Members | true | default | — | — | Your profile, consent state and sign-in methods | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| PATCH | `/v1/me` | Members | true | default + `me.write.user` | — | — | Update profile fields (allowlist; display-name moderation) | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| DELETE | `/v1/me` | Members | true | default | — | fresh | Delete your account: personal data is removed now, the rest is purged within 30 days | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md), [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) (also clears live ranks); open finding S6-M02 (uploads left in Blob) in [security M6](handoffs/2026-10-27-security-reviewer-m6.md) |
| POST | `/v1/me/merge-guest` | Members | true | default | `merge_guest` † | — | Merge guest progress (localStorage `soyl_guest_v1`) into the account. Once per account; replays return `alreadyMerged`. Body limit 256 KB | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| POST | `/v1/me/consent/start` | Members | true | default | — | — | Start (or resume) the parental-consent flow (external providers) | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| GET | `/v1/me/consent` | Members | true | default | — | — | Consent state, age band, masked parent email, which flow applies (`builtin`/`external`/`none`) | [consent interim](handoffs/2026-10-28-consent-interim.md), [ADR-022](adr/022-interim-builtin-consent-provider.md) |
| POST | `/v1/me/consent/age-band` | Members | true | default + `consent.write.user` (fail-closed) | — | — | Declare 18+ (`agree: true`, self-declared consent) or under 18 | [consent interim](handoffs/2026-10-28-consent-interim.md) |
| POST | `/v1/me/consent/parent` | Members | true | default + `consent.write.user` (fail-closed) | — | — | Under 18: email the parent a one-time approval code (limits per account, parent email, IP) | [consent interim](handoffs/2026-10-28-consent-interim.md) |
| POST | `/v1/me/consent/verify` | Members | true | default + `consent.write.user` (fail-closed) | — | — | Enter the parent's code → `granted` | [consent interim](handoffs/2026-10-28-consent-interim.md) |
| POST | `/v1/me/consent/withdraw` | Members | true | default + `consent.write.user` (fail-closed) | — | — | Withdraw (or cancel a pending request); deletes AI conversations and uploads | [consent interim](handoffs/2026-10-28-consent-interim.md) |
| POST | `/v1/consent/parent/withdraw` | All | true | default + `consent.parent.ip` (fail-closed) | — | — | The parent's email link (no session): withdraw or decline; can only switch features off | [consent interim](handoffs/2026-10-28-consent-interim.md) |
| POST | `/v1/me/public-name` | Members | true | default + `public-name.user` | — | — | A new random public (leaderboard) name (D-039) | [consent interim](handoffs/2026-10-28-consent-interim.md) |
| GET | `/v1/me/sessions` | Members | true | default | — | — | Your active sessions | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| DELETE | `/v1/me/sessions` | Members | true | default | — | — | Sign out everywhere else | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| DELETE | `/v1/me/sessions/:id` | Members | true | default | — | — | Revoke one of your sessions | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |

## 7. Catalog (3)

`modules/catalog.ts`. Public reads.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/catalog/boards` | All | true | default | — | — | Boards and their classes | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| GET | `/v1/catalog/:board/:class/subjects` | All | true | default | — | — | Subjects for a board and class | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| GET | `/v1/catalog/subjects/:id/chapters` | All | true | default | — | — | Chapters (with topics) of a subject, in board order | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |

## 8. Content (4)

`modules/content.ts`. Content reads are the same for everyone and are cacheable ([ADR-010](adr/010-content-api-caching-and-answer-separation.md)). Answers are never in these responses.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/chapters/:id` | All | true | default | — | — | Chapter hub: chapter, subject, and the published lesson, notes, flashcards, practice and tests, with counts | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| GET | `/v1/chapters/:id/deck` | All | true | default | — | — | Lesson slides for one deck part (default: the first). Check-slide questions come without answers | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| GET | `/v1/chapters/:id/notes` | All | true | default | — | — | Chapter notes | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| GET | `/v1/chapters/:id/flashcards` | All | true | default | — | — | Chapter flashcards | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |

## 9. Practice (3)

`modules/practice.ts`.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/chapters/:id/practice` | All | true | default | — | — | A chapter's practice questions (stems and options only), paged. For signed-in users, unanswered questions come first | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| POST | `/v1/practice/answers` | All | true | default + `practice.answer.ip` + `practice.answer.user` | — | — | Check a practice answer on the server. Returns correctness, the answer, the solution and the marking scheme. Guest answers are checked but not stored | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| PATCH | `/v1/practice/answers/:id` | Members | true | default + `practice.answer.user` | — | — | Self-assess the written parts of one of your practice answers against the marking scheme | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |

## 10. Progress and gamification (5)

`modules/progress.ts`.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/me/progress` | Members | true | default | — | — | Your XP, level, streak, and per-chapter lesson and practice progress | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| GET | `/v1/me/progress/chapters/:id` | Members | true | default | — | — | Your progress in one chapter (the private half of the chapter hub) | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| PUT | `/v1/me/lesson-progress` | Members | true | default + `progress.write.user` | — | — | Save your lesson position or completion (idempotent) | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| GET | `/v1/me/badges` | Members | true | default | — | — | Badges you can earn and the ones you have | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| GET | `/v1/leagues/current?scope=class` | Members | true | default + `leagues.read.user` | `leaderboards` | — | Your weekly league (IST week, 5 tiers, divisions of 30). The first visit of a week places you (idempotent). `school`/`city` → 501 | [backend-api M5 follow-ups](handoffs/2026-10-27-backend-api-m5-followups.md) |

## 11. Content reports (1)

`modules/reports.ts`.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| POST | `/v1/content-reports` | All | true | default + `reports.ip` + `reports.user` | — | — | Report a mistake in a lesson, notes, flashcard or question. Since M5 follow-ups also `contentType: ai_answer` (members only; names the answer by stream `requestId` or `messageId`; a repeat report returns 200 with the open report). Body limit 8 KB | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md), [M5 follow-ups](handoffs/2026-10-27-backend-api-m5-followups.md) |

## 12. Staff: two-step verification and admin (6)

`modules/mfa.ts`, `modules/admin.ts`. Staff sign in with Google only (`403 staff_sign_in_requires_google`).

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/me/mfa` | Staff | true | default | — | — | Your two-step verification status | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| POST | `/v1/me/mfa/totp/enroll` | Staff | true | default + `mfa.user` FC | — | fresh | Start setting up an authenticator app | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| POST | `/v1/me/mfa/totp/confirm` | Staff | true | default + `mfa.user` FC | — | — | Confirm the authenticator with a first code. Returns one-time recovery codes | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| POST | `/v1/me/mfa/verify` | Staff | true | default + `mfa.user` FC | — | — | Verify this session with an authenticator code or a recovery code | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| POST | `/v1/me/mfa/totp/disable` | Staff | true | default + `mfa.user` FC | — | fresh, mfa | Turn off the authenticator (needs a fresh, verified session and a current code) | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |
| GET | `/v1/admin/reports` | Staff | true | default | — | mfa | Content reports queue | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md) |

## 13. Tests, attempts and evaluation (12)

`modules/tests.ts` and `ai/routes.ts` (GET ai-evaluation). Engine design: [ADR-012 test engine](adr/012-test-engine.md). Tests are free and need sign-in, except the catalogue and metadata reads.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/test-series` | All | true | default | — | — | A subject's test series: chapter, unit, term, full-mock and second-exam tests, and live mocks. For signed-in users, includes your status per test | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| GET | `/v1/tests/:id` | All | true | default | — | — | Test metadata: sections, duration, marks, instructions. Questions are delivered only inside an attempt | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| POST | `/v1/tests/custom` | Members | true | default + `tests.custom.user` | — | — | Build a custom test from the practice question bank (free) | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| POST | `/v1/tests/:id/attempts` | Members | true | default + `attempt.start.user` | `test_attempts` † | — | Create or resume your single active attempt. Starting sets the server deadline and delivers the paper (no answers) | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| GET | `/v1/attempts/:id` | Members | true | default + `attempt.read.user` | `test_attempts` † | — | Resume an attempt: the paper, your saved responses, server time and deadline | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| PUT | `/v1/attempts/:id/responses` | Members | true | default (+ `attempt.autosave` in the handler) | `test_attempts` † | — | Autosave a batch of item states. Idempotent per item: a state applies only if its `seq` is higher than the stored one. Body limit 256 KB | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md); open finding S6-L01 in [security M6](handoffs/2026-10-27-security-reviewer-m6.md) |
| POST | `/v1/attempts/:id/submit` | Members | true | default (+ `attempt.submit` in the handler) | `test_attempts` † | — | Submit (idempotent). An optional final batch is saved first. Objective items are graded now; written items wait for self-evaluation | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md); open finding S6-L01 in [security M6](handoffs/2026-10-27-security-reviewer-m6.md) |
| GET | `/v1/attempts/:id/result` | Members | true | default + `attempt.read.user` | `test_attempts` † | — | Result of a submitted attempt: scores, analysis, every answer with its solution and marking scheme, percentile, live rank | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md); **open High S6-H01** (live-mock keys shown to early submitters) in [security M6](handoffs/2026-10-27-security-reviewer-m6.md) |
| POST | `/v1/attempts/:id/self-evaluation` | Members | true | default + `attempt.evaluate.user` | `test_attempts` † | — | Self-evaluate written answers against the marking scheme (free). Returns the updated result | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| POST | `/v1/attempts/:id/ai-evaluation` | Members | true | default + `ai.user` FC | `ai` | — | AI evaluation of written answers. Costs 6 credits per answer, at most 40 per paper. Returns 202 with a job id. AI marks never count towards scores or ranks | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md), [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| GET | `/v1/attempts/:id/ai-evaluation` | Members | true | default | — | — | AI marks of your submitted attempt, per item, with step marks and confidence | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| GET | `/v1/me/attempts` | Members | true | default + `attempt.read.user` | — | — | Your attempts, newest first (cursor paging) | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |

## 14. Live mocks (4)

`modules/tests.ts`.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/live-events` | All | true | default | — | — | All-India live mocks with their windows and phase. For signed-in users, includes your registration and attempt | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| GET | `/v1/live-events/:id` | All | true | default | — | — | One live mock: timeline, registration window, rank availability; signed in, also your status, buttons (`canRegister`/`canStart`/`canResume`) and result | [backend-api M5 follow-ups](handoffs/2026-10-27-backend-api-m5-followups.md) |
| POST | `/v1/live-events/:id/register` | Members | true | default + `live.register.user` | — | — | Register for a live mock (idempotent). Starting the test also registers you | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |
| GET | `/v1/live-events/:id/leaderboard` | Members | true | default + `attempt.read.user` | `leaderboards` | — | Live mock leaderboard: provisional during the event, final once ranks are published (first name + last initial) | [backend-api M3](handoffs/2026-10-27-backend-api-m3.md) |

## 15. AI and credits (11)

`ai/routes.ts`. Design: [ADR-013 AI gateway](adr/013-ai-gateway.md).
- AI actions are `quick-doubt`, `explain-slide`, `hard-doubt` and `photo-doubt` (Server-Sent Events) and `evaluate-answer`, `evaluate-paper` and `paper-from-upload` (202 + job id).
- Actions accept an optional `Idempotency-Key`, which the proxy forwards only on `v1/ai/*` and `v1/attempts/:id/ai-evaluation`.
- The action body limit is 16 KB.
- `POST /v1/ai/uploads` also checks consent `ai` in its handler, on top of the `uploads` policy.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/credits` | Members | true | default | — | — | Today's AI credits: balance, plan, reset time (00:00 IST) and prices | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| GET | `/v1/credits/ledger` | Members | true | default | — | — | Credit history, newest first (cursor paging) | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| GET | `/v1/ai/quote/:action` | Members | true | default | — | — | What an AI action will cost, before the student confirms. For evaluate-paper, pass `attemptId` to price the actual answers | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| POST | `/v1/ai/:action` | Members | true | default + `ai.user` FC | `ai` | — | Run an AI action (SSE stream or 202 job). Credits are reserved, then charged or refunded | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| GET | `/v1/ai/jobs/:id` | Members | true | default | — | — | Status and result of an AI job (yours only) | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| POST | `/v1/ai/uploads` | Members | true | default + `uploads.user.hour` + `uploads.user.day` FC | `uploads` | — | Get a short-lived, write-only upload URL for one photo (JPEG, PNG or WebP) or sample paper (also PDF), up to 10 MB. Deleted after 30 days. The upload goes straight to Blob storage, not through the proxy | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md); open finding S6-M01 (PDF checks) in [security M6](handoffs/2026-10-27-security-reviewer-m6.md) |
| POST | `/v1/ai/uploads/:id/complete` | Members | true | default FC | `uploads` | — | Tell the server the file is uploaded. It is checked and cleaned (metadata removed) before use | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| GET | `/v1/ai/uploads/:id` | Members | true | default | — | — | Upload status | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| GET | `/v1/ai/conversations` | Members | true | default | — | — | Your AI conversations, newest first | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| POST | `/v1/ai/conversations` | Members | true | default + `ai.user` FC | `ai` | — | Start a conversation (optional: an action without `conversationId` starts one) | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |
| GET | `/v1/ai/conversations/:id` | Members | true | default | — | — | A conversation's messages (kept 30 days) | [ai-gateway M4](handoffs/2026-10-27-ai-gateway-m4.md) |

`POST /v1/attempts/:id/ai-evaluation` and `GET /v1/attempts/:id/ai-evaluation` are also AI routes. They are listed under Tests in §13.

## 16. Billing (7)

`billing/routes.ts`. Design: [ADR-016 billing (Razorpay)](adr/016-billing-razorpay.md).
- Purchase routes answer `403 billing_disabled` while `BILLING_ENABLED=false`.
- They also answer `403 consent_required` until consent is `granted`. This is checked in the billing service (`billing/service.ts`); the policy itself declares no consent feature.
- A purchase response never grants anything. Entitlement follows only when Razorpay confirms the payment (webhook or refresh).
- Purchase routes are **student only**: parent and staff accounts get `403 forbidden`.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/plans` | All | true | default | — | — | Plans and prices (GST-inclusive INR, paise), with `billingEnabled` | [billing-razorpay M4](handoffs/2026-10-27-billing-razorpay-m4.md) |
| POST | `/v1/billing/subscriptions` | Student | true | default | — | — | Start a Plus or Pro subscription (returns Razorpay Checkout parameters) | [billing-razorpay M4](handoffs/2026-10-27-billing-razorpay-m4.md) |
| POST | `/v1/billing/orders` | Student | true | default | — | — | Buy the Board Exam Pass (returns Razorpay Checkout parameters) | [billing-razorpay M4](handoffs/2026-10-27-billing-razorpay-m4.md) |
| POST | `/v1/billing/cancel` | Student | true | default | — | — | Cancel the subscription (a paid period runs to its end) | [billing-razorpay M4](handoffs/2026-10-27-billing-razorpay-m4.md) |
| POST | `/v1/billing/refresh` | Student | true | default | — | — | Re-check open purchases with Razorpay (call after Checkout; takes no payment data) | [billing-razorpay M4](handoffs/2026-10-27-billing-razorpay-m4.md) |
| GET | `/v1/me/subscription` | Members | true | default | — | — | The plan in force and the subscription status | [billing-razorpay M4](handoffs/2026-10-27-billing-razorpay-m4.md) |
| POST | `/v1/webhooks/razorpay` | All | **false** | default | — | — | Razorpay webhook. Raw body up to 256 KB. `X-Razorpay-Signature` (HMAC over the raw body) and `X-Razorpay-Event-Id`, idempotent per event. Returns 200 `{received, duplicate, outcome}`, 400 for a bad signature, 503 when the re-fetch fails (Razorpay retries), and 404 when no provider is configured | [billing-razorpay M4](handoffs/2026-10-27-billing-razorpay-m4.md), [webhook runbook](runbooks/razorpay-webhook-replay.md) |

## 17. Dev-only (1, hidden)

Registered only when `DEV_OTP_OUTBOX=true`. Config refuses that setting unless `APP_ENV` is `local` or `test`, and the route needs the mock SMS and email senders. It is hidden from OpenAPI (`schema.hide`). Edge auth still applies.

| Method | Path | Roles | CSRF | Rate limit | Consent | Fresh/MFA | Purpose | Documented in |
|---|---|---|---|---|---|---|---|---|
| GET | `/v1/dev/otp-outbox` | All | true | default + `auth.ip` | — | — | **Dev-only, hidden.** Returns the last OTP the mock senders delivered, and only to reserved test identifiers (`+91555000xxxx` numbers or `@example.com` addresses). Any other identifier gets 404. Used by e2e tests | [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |

## 18. Totals

| Area | Routes |
|---|---|
| Health | 2 |
| Auth | 13 |
| Session and account | 9 |
| Catalog | 3 |
| Content | 4 |
| Practice | 3 |
| Progress and gamification | 5 |
| Content reports | 1 |
| Staff MFA and admin | 6 |
| Tests, attempts and evaluation | 12 |
| Live mocks | 4 |
| AI and credits | 11 |
| Billing | 7 |
| Dev-only (hidden) | 1 |
| **Total** | **81** (snapshot rows; 80 in `openapi.json`) |

## 19. Differences from ARCHITECTURE §4.1

[ARCHITECTURE.md §4.1](ARCHITECTURE.md) lists *key* endpoints. At this commit the code differs from it as follows:

- **Listed but not built:**
  - `/v1/leaderboards/:scope`. Leaderboards exist as `GET /v1/live-events/:id/leaderboard` (live mocks) and `GET /v1/leagues/current?scope=class` (weekly class leagues; school and city answer 501).
  - `/v1/admin/content/:type/:id`, `/v1/admin/config` and `/v1/admin/users/:id`. The only admin route is `GET /v1/admin/reports`.
- **Auth is not "handled by the auth library":** Better Auth's HTTP handler is not mounted. The 13 `/v1/auth/*` routes are explicit Fastify routes ([ADR-002](adr/002-auth-better-auth.md)).
- **Built but not listed in §4.1:**
  - `/v1/auth/link/*`, `/v1/auth/unlink` and `/v1/auth/methods`.
  - `/v1/me/sessions*` and `/v1/me/consent/start`.
  - `/v1/me/mfa*`.
  - `/v1/me/progress/chapters/:id`, `/v1/me/lesson-progress` and `PATCH /v1/practice/answers/:id`.
  - `GET /v1/tests/:id`, `GET /v1/attempts/:id`, `GET /v1/me/attempts` and `GET /v1/attempts/:id/ai-evaluation`.
  - `/v1/ai/jobs/:id`, `/v1/ai/uploads/:id(/complete)` and `/v1/ai/conversations*`.
  - `/v1/billing/refresh` and `/v1/me/subscription`.
  - `GET /v1/live-events/:id` and `GET /v1/leagues/current`.
  - The dev-only `/v1/dev/otp-outbox`.

## 20. Regenerating this reference

Run these from `platform/`:

```
npm run openapi -w @soyl/api                       # rewrites platform/api/openapi.json from the registered routes
npm run generate:api-client -w @soyl/shared        # regenerates the typed web client from openapi.json
cd api && npx vitest run test/route-policy.test.ts -u   # updates the route-policy snapshot; review the diff
```

- The staleness check for `openapi.json` is the test *"the committed openapi.json matches the routes"* in `platform/api/test/unit.test.ts`. The header comment of `scripts/openapi.ts` names it `test/openapi.test.ts`, but that file does not exist.
- The route-policy test also pins three things:
  - the AUTH-1 list of auth routes
  - the rule that only health routes sit outside `/v1`
  - the AUTH-12 rule that **only** `POST /v1/webhooks/razorpay` has `csrf=false`, because it is HMAC-verified
- When routes change, refresh this document from the two artifacts: the snapshot gives the Roles, CSRF, Rate limit, Consent and Fresh/MFA columns, and `openapi.json` gives the Purpose column. Then re-check the bucket table against `RATE_LIMITS` and the route count in §18.
