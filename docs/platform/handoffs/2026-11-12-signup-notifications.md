# backend-api — owner email at each new student sign-up — 2026-11-12

Status: done (branch `platform/backend-api/signup-notifications`; not merged, not deployed)

Owner request (2026-11-12): "every time there is a new sign up ... it would be nice if we get notifications on my email".

## What changed
- `platform/api/src/notifications/signup.ts` (new): `SignupNotifier` (DI: db, clock, email sender, rate limiter,
  address, public base URL) and the email builder `signupNoticeEmail`. On a new **student** account it sends, in the
  background after the account row is committed, one email to `SIGNUP_NOTIFY_EMAIL`:
  - subject `New SOYL sign-up (#<total>)`;
  - HTML + text in the platform email style: masked identifier (`a***@gmail.com`, or `+91******3210` for a phone
    sign-up; the existing `maskEmail` / `maskPhone` from `@soyl/shared/config/security`), method (Email code /
    Google / Phone code), time in IST, sign-ups today (IST day, active students) and active student accounts in
    total, link to `${PUBLIC_BASE_URL}/admin`;
  - never the full address or number, the user id, IP or user agent (D-039; reveals stay in /admin, audited, D-045).
  - Non-student roles are ignored (staff never sign up through sign-in: roles come from `admin bootstrap`, DB-7);
    re-logins create nothing; seeded fixture users never pass through sign-in.
  - Failure (email, DB or KV): `signup_notify_failed`, level error, `alert: true`, `errorClass` only; sign-up is
    unaffected. Flood guard: KV sliding window `signup-notify` (all instances), `SIGNUP_NOTIFY.maxPerHour` = 60;
    beyond it `signup_notify_suppressed` (warn) and no email. Success logs `signup_notified` (method only).
- `platform/shared/config/notifications.ts` (new): `SIGNUP_NOTIFY.maxPerHour`.
- `platform/api/src/auth/identity.ts`: `afterCreate` calls `signups.accountCreated(user, method, log)` after the
  `signup` interest counter (optional 8th constructor argument).
- `platform/api/src/config.ts`: optional `SIGNUP_NOTIFY_EMAIL` (zod email; unset or blank = off) → `config.signupNotifyEmail`.
- `platform/api/src/services.ts`, `app.ts`: wiring; the app logger as fallback; `onClose` drains notices in flight.
- `platform/infra/params/prod.bicepparam`: `SIGNUP_NOTIFY_EMAIL: 'ryan.gomez@soyl.cloud'` in `appSettings` (plain
  setting next to `FB_NOTIFY_EMAIL`; `main.bicep` maps every `appSettings` key to the api and worker env, no other
  wiring needed). dev/stg params unchanged (off there).
- Docs: `.env.example` (name only), `docs/platform/operations.md` (Sign-up notices paragraph), `platform/api/README.md` env table row.

## How to verify
From `platform/`:
- `npx vitest run test/signup-notifications.test.ts` in `api/` → 11 passed.
- Run 2026-11-12 on Windows 11 / Node 24:
  - `npm run typecheck` → exit 0 (all workspaces);
  - `npm test -w @soyl/api` → 47 files passed, 724 passed + 1 skipped (route-policy test unchanged);
  - `npm test -w @soyl/shared` → 19 files, 213 passed;
  - `npm run build` → api + worker bundles built, exit 0;
  - `BICEP_BIN=~/.azure/bin/bicep.exe node infra/validate.mjs --strict` (Bicep 0.47.16 from the Azure CLI; CI pins
    0.48.1) → 0 errors, 0 warnings, all four params files build.
- After deploy: sign up a new test account on production; the owner inbox gets "New SOYL sign-up (#N)" within
  seconds. App Insights: `traces | where customDimensions.event startswith "signup_notif"`.

## Tests added
`platform/api/test/signup-notifications.test.ts` (real PostgreSQL, mock outbox):
- email sign-up → exactly one notice to `SIGNUP_NOTIFY_EMAIL`, masked address, counts equal to the DB, `/admin`
  link, no full address / user id / IP / user agent;
- phone sign-up → counts +1, masked number; Google sign-up → method Google, masked email, no name;
- re-login → nothing; staff created by `admin bootstrap` signing in → nothing; non-student roles ignored;
- email outage → sign-up 200 + `signup_notify_failed` (alert, `errorClass: EmailDeliveryError`, no PII);
- setting unset → no notice; config: unset/blank off, bad address refused;
- flood guard: cap 2 → third suppressed and logged; resumes after the hour;
- builder: masking by method, IST time format, HTML escaping.

## Known gaps / follow-ups
- Counts race: two sign-ups within milliseconds can both read the same total (both say #N). Cosmetic.
- Pre-existing (not changed here): other background-failure logs use the key `err: (err as Error).name`; the pino
  `err` serializer turns a string into `{}`, so `fb_*_failed`, `invoice_*_failed`, `credit_topup_failed` lose the
  error class in logs. This module uses `errorClass` instead. Worth a small fix by the owners of those modules.
- No App Insights log alert yet on `signup_notify_failed` (the existing alert set does not key on `alert: true`).
- `platform/db/PII.md` not updated (outside owned paths): the notice sends a masked identifier to the owner inbox;
  suggest one line under "Staff views of accounts".

## Decisions made
No ADR: new optional app setting and a background email through the existing provider, same pattern as
`FB_NOTIFY_EMAIL` (ADR-027 §5). No new dependency, no marketing or shared-file change.

## Needs from owner
None. To change or stop the notices: edit `SIGNUP_NOTIFY_EMAIL` in `platform/infra/params/prod.bicepparam`
(empty = off) and redeploy the API.
