# ADR-026: Staff sign in with the email one-time code, no second factor (owner risk acceptance)

- Status: accepted (owner decision 2026-10-29, given to the Lead in chat; implemented by backend-api on `platform/backend-api/staff-email-signin`)
- Amends: AUTH-11 (`docs/platform/security/requirements-for-m1.md`), [ADR-002](002-auth-better-auth.md) "Staff (AUTH-11, API-10)", [ADR-011 staff TOTP](011-staff-totp.md)
- Related: D-045 (superadmin capability, admin dashboard), D-031 (production sign-in is email OTP only), OA-05 (Google OAuth client), API-10 (role grants), AUTH-9 (staff session lifetimes, fresh sessions)

## Context

AUTH-11 required reviewer and admin accounts to sign in with Google from an allow-listed Workspace domain **plus** a TOTP second factor (ADR-011). Production allows only email OTP (D-031) and has no Google OAuth client (OA-05), so no staff account could sign in to production, and the owner could not open the admin dashboard (D-045). The admin dashboard shows aggregate figures about students and, through the audited user lookup, children's email addresses and activity summaries.

The owner was told plainly that with email-only staff sign-in, anyone who can read the staff inbox can open the admin dashboard with children's data. The owner chose it anyway: "keep it simple".

## Options

1. **Google Workspace + TOTP** (AUTH-11 as written). Strongest: phishing a Workspace account still needs the authenticator. Needs OA-05 (Google client), `ADMIN_GOOGLE_DOMAINS`, account linking before promotion, and an authenticator app on the owner's phone. Blocked today.
2. **Email OTP + TOTP.** Works with production's email-only sign-in. The inbox alone is not enough. Needs an authenticator app and the recovery-code routine.
3. **Email OTP only.** Works today with nothing else to set up. Whoever controls the staff inbox (or can read one code from it) controls a staff session.

## Decision

Option 3, as an explicit owner risk acceptance, and **as config, not code** (CLAUDE.md rule 4):

```ts
// platform/shared/config/security.ts
export const STAFF_AUTH: StaffAuthPolicy = { signInMethods: ['email'], secondFactor: 'none' };
```

- `signInMethods` (`'email' | 'google'`): the only methods a reviewer/admin account may sign in with. Phone OTP is never a staff method (the type excludes it). Other methods: `403 staff_sign_in_method_not_allowed` (Google: `?authError=staff_sign_in_method_not_allowed`), logged as security event `staff_sign_in_refused` with `reason: 'method'`. With the Google-only policy, OTP keeps the original `403 staff_sign_in_requires_google`. Google, when allowed, still needs the Workspace `hd` in `ADMIN_GOOGLE_DOMAINS`.
- `secondFactor` (`'none' | 'totp'`): `policy.mfa` on staff routes is enforced only when it is `'totp'` (app.ts). The TOTP routes (`/v1/me/mfa*`), the `user_mfa` table, `sessions.mfa_verified_at`, the web enrolment/verify screens and their tests all stay. The `/admin` page already follows the API: it shows the TOTP steps only when a staff call answers `mfa_required`.
- The API validates the policy at start-up (`staffAuthProblems`: at least one method, no unknown or duplicate method, a known second factor) and refuses to start otherwise.

Unchanged: roles come only from an audited admin action or the bootstrap CLI (API-10), and a role or capability change revokes the account's sessions. The superadmin capability is checked on every request (D-045). Staff sessions last at most 12 hours and end after 60 minutes idle (AUTH-9). Staff writes need a fresh session. The PII reveal and user summary are audit-logged. The OTP send/verify limits and lockouts apply (AUTH-3, AUTH-5).

## How to switch back

Edit `STAFF_AUTH` and deploy the API (no migration, no data change):

- email + TOTP (ADR-011): `{ signInMethods: ['email'], secondFactor: 'totp' }`. On the next staff call, `/admin` asks each staff member to enrol an authenticator (fresh sign-in) and shows the recovery codes once.
- the original AUTH-11 policy: `{ signInMethods: ['google'], secondFactor: 'totp' }`, plus OA-05 (Google client in Key Vault, `AUTH_METHODS` including `google`) and `ADMIN_GOOGLE_DOMAINS`. Staff must link Google to their account before promotion (AUTH-7).

Both modes are covered by API tests that inject the policy (`api/test/staff-sign-in.test.ts`, `reports-mfa.test.ts`, `admin-analytics.test.ts`, `http-pipeline.test.ts`, `google.test.ts`).

## Consequences

- **Accepted risk:** the staff inbox is the single factor. A compromised, shared or forwarded mailbox, or one leaked code inside its 10-minute lifetime, gives a staff session: the reports queue for reviewers, and for a superadmin the analytics dashboard and the audited email reveal and summary of any student account.
- **Residual mitigations:**
  - email codes are single-use, last 10 minutes, die after 5 wrong tries, and lock the identifier after 10 failures per hour;
  - staff sessions are short (12 h / 60 min idle);
  - every reveal and summary is in `audit_log` with actor and time, and refused staff sign-ins are security events;
  - superadmin is one database row and can be removed at once (`admin bootstrap --role admin`), which also signs the account out;
  - writes need a fresh session.
  The owner should protect the staff mailbox itself: a strong password and the mail provider's own two-step sign-in, no shared or forwarded copies. Keep staff accounts few.
- Security documents that state AUTH-11 as "Google + TOTP" (requirements, threat model, ASVS checklist, admin-analytics privacy note) need an amendment note from the Lead/security-reviewer; the security-reviewer should record this as an owner-accepted risk rather than an open finding.
- If staff ever handle more sensitive data (for example raw AI conversations, which the dashboard never shows), revisit this ADR and turn on `secondFactor: 'totp'`.
