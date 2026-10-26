# ADR-011: Staff second factor — TOTP (AUTH-11)

- Status: accepted (backend-api M2, 2026-10-27)
- Related: ADR-002 (auth), security requirements AUTH-11, AUTH-9, API-6; migration 0005 (`user_mfa`, `sessions.mfa_verified_at`)

## Context

Reviewer and admin accounts can change content and see reports from children. AUTH-11 requires a second factor on top of Google Workspace sign-in. M1 had no storage for it, so routes with `policy.mfa` failed closed with 403 `mfa_required`. Passkeys/WebAuthn would be stronger, but they need a browser ceremony on the web tier and a credential store. TOTP works with every authenticator app and fits the API alone.

## Decision

- **TOTP, RFC 6238** (HMAC-SHA1, 6 digits, 30 s), ±1 step of drift. Each time step is accepted at most once per user (`user_mfa.last_used_step`, updated conditionally so two parallel uses cannot both pass).
- **Secret at rest:** AES-256-GCM with `MFA_ENCRYPTION_KEY` (32 bytes, Key Vault; a public development value exists only for local/test and is refused elsewhere). The user id is the associated data. The plaintext secret is shown once at enrolment (otpauth URI for a QR code) and never stored in the browser.
- **Recovery codes:** 10 codes, shown once at confirmation, stored as HMAC-SHA256 with the OTP pepper. Each works once.
- **Lockout:** 5 wrong codes in 15 minutes lock verification for that user (429 `otp_locked`). Every MFA route also has the `mfa.user` bucket and fails closed when the rate-limit store is down.
- **Routes (staff only):** `GET /v1/me/mfa` (status); `POST /v1/me/mfa/totp/enroll` (fresh session; 409 when already confirmed; an unconfirmed enrolment expires after 15 minutes); `POST /v1/me/mfa/totp/confirm` (first code, returns the recovery codes, verifies this session); `POST /v1/me/mfa/verify` (code or recovery code, verifies this session); `POST /v1/me/mfa/totp/disable` (fresh, verified session and a current code; clears the mark on every session).
- **Gate:** `policy.mfa` routes need a confirmed enrolment **and** `sessions.mfa_verified_at` on the calling session; otherwise 403 `mfa_required`. Staff sessions keep their M1 lifetime (12 h absolute, 60 min inactivity), so the verification lasts at most one staff session. The first gated route is `GET /v1/admin/reports`.
- Account deletion removes `user_mfa` in step 1 (PII.md).

## Consequences

- The web needs an enrolment screen (QR from `otpauthUri`, a code field, a one-time recovery-code display) and a verify prompt whenever a staff route returns `mfa_required`. `GET /v1/me/mfa` tells it which one to show.
- Losing both the authenticator and the recovery codes needs an admin reset. That is a database operation for now; an audited admin route comes with the admin milestone.
- Migrating to WebAuthn later is additive: a new factor type next to TOTP behind the same `mfa_verified_at` session mark.
