# backend-api — email reminders + optional confirmed parent email (D-055) — 2026-11-14

Status: done (ready for integration; nothing deployed)
Branch: `platform/backend-api/email-reminders` (from `main` 147d01db)

## What changed

Owner decision 2026-11-14, recorded as **D-055** (closes the reminders part of threat-model F-016): reminders by
email only, to the student's own address every few days; a parent only at an optional address the student adds and
the parent confirms.

**Config** (`platform/shared/config/notifications.ts` `REMINDERS`): `enabled`, `cron` `0 12 * * *` (17:30 IST),
`inactiveDays: 2`, `minGapDays: 3`, `maxUnanswered: 4`, `firstDayGraceHours: 24`, quiet hours 21:00–08:00 IST,
`studentDefault: true`, `parentMinGapDays: 7`, `parentConfirmTtlHours: 72`, confirmation-send limits (per account /
address / IP), `resendAfterSeconds`, `batchSize`, `staleClaimMinutes`, skipped fixture domains/TLDs. Two rate-limit
buckets in `security.ts`: `email.prefs.user`, `email.link.ip`. `gamification.ts` F-016 comment updated.

**Database** — migration `0018_email_reminders` (+ hand-written `.down.sql`), schema `platform/db/schema/notifications.ts`:
- `notification_preferences` (one row per student who changed something): `student_reminders`, `parent_email`
  (plain text, needed to send), `parent_status` none|pending|active (CHECK: address present iff not none),
  `parent_reminders`, `parent_generation` (binds links to the current address), `parent_confirm_sent_at` (binds the
  confirm link; a resend replaces it), `parent_confirmed_at`, `parent_unsubscribed_at`.
- `reminder_log` (user, kind student|parent, `ist_day`, status sending|sent|failed, attempts, claimed/sent times),
  UNIQUE (user, kind, ist_day) = the job's idempotency key; FK cascade.
- `PII.md`: new section "Email reminders (D-055)", inventory rows, deletion step 1 lists the table. `README.md` lists 0018.

**API** (`platform/api/src/notifications/`):
- `tokens.ts` — HMAC links, OTP_PEPPER under label `soyl/email/v1`: student unsubscribe `<uid>.s0.<mac>`, parent
  unsubscribe `<uid>.p<gen>.<mac>` (both non-expiring), parent confirm `<uid>.c<gen>.<mac over send time>`.
- `emails.ts` — student reminder, parent reminder, parent confirmation (text + HTML in the platform style; no images,
  no tracking; footer with why, unsubscribe, settings; `List-Unsubscribe` + `List-Unsubscribe-Post` RFC 8058).
- `links.ts` — page URLs (`/me/email/unsubscribe#t=`, `/me/email/parent-confirm#t=`, `/me#email-reminders`,
  `/dashboard`), one-click URL `${PUBLIC_BASE_URL}${API_PUBLIC_PATH}/v1/email/unsubscribe/one-click?token=`, lesson deep
  links (same rule as `components/platform/learn/links.ts`; parts use the canonical `?part=N`).
- `reminders.ts` — `runReminders({ db, email, links, now })` (the job), pure `reminderDue`, `isQuietHours`, `reminderAddress`.
- `preferences.ts` — `EmailPreferencesService` (view, update, setParentEmail, resendParentConfirm, removeParentEmail,
  confirmParent, unsubscribe); audit rows `email.parent_confirmed` / `email.parent_unsubscribed` (ids only).
- `routes.ts` — 8 routes (below); wired in `services.ts` (`emailTokens`, `emailLinks`, `emailPreferences`) and `app.ts`.
- `auth/senders/email.ts` — `EmailMessage.headers`, passed to ACS as the request body's `headers` object.
- `domain/account-deletion.ts` — `DELETE /v1/me` deletes the `notification_preferences` row in step 1.
- `errors.ts` — `email_link_invalid` (404), `email_link_expired` (410), `reminders_unavailable` (409).
- `package.json` exports `./notifications/*` and `./config` (the worker reuses the dev pepper placeholder).
- `openapi.json`, `platform/shared/api-client/schema.gen.ts` regenerated; client aliases `EmailPreferences`,
  `ParentEmailResponse`, `ParentConfirmResponse`, `EmailUnsubscribeResponse`. Route-policy snapshot +8 rows; the
  AUTH-12 exemption list gains `POST /v1/email/unsubscribe/one-click`.

**Worker**: `platform/worker/src/notification-jobs.ts` (`notifications.reminders`, cron `REMINDERS.cron`, stately,
3 retries from 10 min with backoff); registered in `jobs.ts`; `worker.ts` `notificationSettings()` (ACS sender via
`invoiceEmailSender`, the mock outbox locally); `config.ts` reads `REMINDERS_ENABLED`, `OTP_PEPPER`,
`PUBLIC_BASE_URL`, `API_PUBLIC_PATH`. Without an email sender or pepper the job logs `reminders_not_configured`
(alert) and does nothing; the worker still starts.

**Web**: `components/platform/me/EmailPreferences.tsx` (+ `.module.css`): the "Email reminders" card on /me
(`id="email-reminders"`, mounted after "Ways to log in"; hidden for staff), and `EmailPreferencesLinks.tsx` with the
unsubscribe and parent-confirm page clients; pages `app/(platform)/me/email/unsubscribe/page.tsx` and
`app/(platform)/me/email/parent-confirm/page.tsx`. Tests: `components/platform/__tests__/email-preferences.test.tsx`.

**Docs**: DECISIONS D-055, api-reference §3/§3.1/§6.1/§18/§20, threat-model F-016 note (AC-25 and open question 2),
STATUS row, PII.md, db README.

## API contract as built

| Method | Path | Who | Body / result |
|---|---|---|---|
| GET | `/v1/me/email-preferences` | student | → `{ studentEmail: masked \| null, reminders, remindersAvailable, parent: { email: masked \| null, status: 'none'\|'pending'\|'active', reminders, unsubscribedAt: ISO \| null } }` |
| PATCH | `/v1/me/email-preferences` | student | `{ reminders?, parentReminders? }` → settings; `reminders: true` without an email address → 409 `reminders_unavailable` |
| PUT | `/v1/me/parent-email` | student | `{ email }` → settings + `resendAfterSeconds`; sends ONE confirmation email; own address → 400; same confirmed address → no-op; 429 per account/address/IP; 503 if the email could not be sent (link killed) |
| POST | `/v1/me/parent-email/resend` | student | → same as PUT, to the stored pending address (old link dies); no-op unless pending |
| DELETE | `/v1/me/parent-email` | student | → settings; address erased, generation+1 |
| POST | `/v1/email/parent-confirm` | anyone, no session | `{ token }` → `{ status: 'active', alreadyConfirmed }`; 410 `email_link_expired` (TTL, replaced, address changed, forged MAC), 404 `email_link_invalid` (malformed / wrong kind) |
| POST | `/v1/email/unsubscribe` | anyone, no session | `{ token }` → `{ kind: 'student'\|'parent', alreadyOff }` (student switch off / parent address erased) |
| POST | `/v1/email/unsubscribe/one-click?token=` | mailbox provider | RFC 8058; `csrf=false`, accepts a form body (ignored); same result |

## How to verify

From `platform/`:
```
npm run typecheck                         # all workspaces: exit 0
npm test                                  # all workspaces green (summary lines in the Lead's report)
npm run build                             # api 6.3 MB, worker 3.6 MB bundles
SOYL_DEV_PG_PORT=54398 npm run db -w @soyl/db -- migrate up            # 19 migration(s) applied (fresh)
SOYL_DEV_PG_PORT=54398 npm run db -w @soyl/db -- migrate down --to 17  # rolled back 0018 and 0017
SOYL_DEV_PG_PORT=54398 npm run db -w @soyl/db -- migrate up            # 2 migration(s) applied
SOYL_DEV_PG_PORT=54398 npm run db -w @soyl/db -- migrate down --to 18  # rolled back 0018_email_reminders only; then up again
cd api && npx vitest run test/email-reminders-job.test.ts test/email-preferences.test.ts test/route-policy.test.ts
```
From the repo root: `npm run lint` (clean), `npm run build` (routes `/me/email/parent-confirm`, `/me/email/unsubscribe`
listed), `npm run test:platform-web` (30 files, 553 tests).

Note: `migrate down --to N` leaves N migrations applied, so `--to 17` also rolls back 0017; `--to 18` rolls back only 0018.

## Tests added

- `platform/api/test/email-reminders-job.test.ts` (24): quiet-hour edges; due rules (inactive 1 vs 2 days, gap,
  maxUnanswered); address rules (verified, `.invalid`, fixture domains); lesson links; token tamper/purpose/key;
  email content rules (no streak/missed-day wording, no images, footer, RFC 8058 headers) and the ACS request
  headers; integration on embedded Postgres with a fixed `now`: inactive 1 vs 2 days, greeting and continue target,
  "Hi there" + dashboard, idempotent re-run, gap, maxUnanswered and reset on activity, never-cases (phone-only,
  unverified, fixtures, opted out, deleted, banned, staff, parent role, first day), first reminder after sign-up,
  non-streak activity counts, parent pending vs active, parent gap and switch, quiet hours at start and mid-run,
  send failure → `failed` + throw → same-day retry sends once, stale-claim takeover, logs without addresses, purge cascade.
- `platform/api/test/email-preferences.test.ts` (14): masked GET, PATCH, phone-only 409, roles/401/403/CSRF,
  invalid and own address, one confirmation email, GET never confirms, POST confirm + idempotent replay + audit,
  same address no-op, tampered/forged/wrong-kind/replaced/expired links, per-account rate limit, failed send kills
  the link, change kills old parent links, resend, remove, student unsubscribe (tamper, idempotent), one-click form
  POST without Origin/cookies, GET of one-click is 404, form bodies still 415 elsewhere, parent unsubscribe erases
  the address, account deletion removes the row at once and the log at purge.
- `platform/worker/test/notification-jobs.test.ts` (6): registration and cron, disabled / not-configured no-ops,
  a real run whose links verify with the same pepper, config defaults and pepper rules, settings builder.
- `components/platform/__tests__/email-preferences.test.tsx` (9): card toggle, phone-only note, add/pending/resend
  cooldown/remove, field error, active state, unsubscribed note, hidden for staff, fragment token parsing, both
  pages act only on the button press.

## Sample emails (rendered by the templates; text parts)

Student reminder:
```
Subject: Pick up Chemical Reactions and Equations where you left off
List-Unsubscribe: <https://www.soylai.com/api/platform/v1/email/unsubscribe/one-click?token=01936b2e-1c4a-7d00-8a10-3f2b5c6d7e8f.s0.xefxc3coQMsBoxYEroRZaDTb0XMTphupPheIjxTkPlw>
List-Unsubscribe-Post: List-Unsubscribe=One-Click

Hi Asha,

Fancy a short session? Here is the one thing to pick up:

Chemical Reactions and Equations
Science · Class 10 · you were partway through the lesson

Continue where you left off: https://www.soylai.com/learn/cbse/10/science/ch01/lesson?part=1

Stuck on something? Your free AI credits refresh every day, so the AI tutor is there when you need it.

Happy learning,
SOYL Academy

--
Why you got this: reminders are on for your SOYL Academy account. We send one at most every 3 days, and only when you have not opened SOYL Academy for a little while.
Unsubscribe from reminders: https://www.soylai.com/me/email/unsubscribe#t=01936b2e-1c4a-7d00-8a10-3f2b5c6d7e8f.s0.xefxc3coQMsBoxYEroRZaDTb0XMTphupPheIjxTkPlw
Manage email settings: https://www.soylai.com/me#email-reminders
```

Parent confirmation:
```
Subject: Confirm your email for SOYL Academy reminders

Hello,

A student on SOYL Academy (the account a***@gmail.com, shown to others as Brave Otter 417) added this address to get an occasional reminder when they have not studied for a few days.

Nothing is sent to this address unless you confirm. To confirm, open the link and press Confirm:
https://www.soylai.com/me/email/parent-confirm#t=01936b2e-1c4a-7d00-8a10-3f2b5c6d7e8f.c1.UsYAY0AsJs9EI70VKPK8HDgKr1jtUxMivGoDrA9yqVU

What you would get: at most one short email every 7 days, only when they have not opened SOYL Academy for a few days. It is not a progress report, and every email has a one-click unsubscribe.

The link works for 72 hours. If you do not know this student or do not want these emails, ignore this message: we will not email you again.

Privacy notice: https://www.soylai.com/privacy

SOYL Academy
```

Parent reminder (once confirmed):
```
Subject: A quick note from SOYL Academy

Hello,

Brave Otter 417 hasn’t opened SOYL Academy for a few days; they left Chemical Reactions and Equations halfway.
(Brave Otter 417 is the name your child’s SOYL Academy account uses.)

Nothing needs doing. If it suits, a friendly word may help them pick it up again. Lessons, practice and tests on SOYL Academy are free.

SOYL Academy

--
Why you got this: your child added this address on their SOYL Academy profile and you confirmed it. We send one at most every 7 days, only when they have not opened SOYL Academy for a few days. It is a reminder, not a progress report.
Unsubscribe: https://www.soylai.com/me/email/unsubscribe#t=01936b2e-1c4a-7d00-8a10-3f2b5c6d7e8f.p1.JHc4zRRClqIZiVGhBl-eoIkd72nKzyTBqe0VUCdhK3k
```
(Tokens above are from a throwaway sample pepper.)

## Design notes and changes from the brief

- **Pages under `/me/email/*`, not `/email/*`.** `proxy.ts`'s matcher is a literal list of platform prefixes; a new
  top-level `/email` prefix would change a shared root file (ADR needed) and `platform-routes.ts`. `/me/*` already gets
  the platform nonce CSP and is how `/me/consent/parent` works without sign-in.
- **Added `POST /v1/me/parent-email/resend`.** GET returns the parent address masked, so the web cannot re-send it to
  PUT; resend uses the stored pending address with the same limits.
- **Added `parent.unsubscribedAt`** to the GET shape: a parent's unsubscribe **erases** the address (data
  minimisation; we never keep an address we may not use), and the student sees when it happened.
- **Parent links are bound to an address generation**, not only user id + purpose, so a changed or removed address
  invalidates links sent to the old one. Confirm links also bind the send time (resend replaces; 72 h TTL).
- **The one-click route is a new AUTH-12 exemption** (`csrf=false`, form body accepted only in its own Fastify
  context). Gmail/Yahoo POST it server-side without an Origin; the HMAC token is the authorisation and it can only
  switch email off. The JSON-only rule stays everywhere else (tested: 415). Its token is in the query (RFC 8058 needs it
  in the URL); API logs strip queries, Vercel request logs may keep it.
- **"Active"** = the latest IST day of: account creation, streak day, lesson position, practice answer, attempt,
  AI request, session creation or daily session refresh. A browse-only visit can lag up to a day (sessions roll once a
  day), so the first reminder can occasionally come one day early for someone who only looked around.
- **Inactive rule:** `today − last active day ≥ 2` (active Monday → first reminder Wednesday 17:30 IST).
- **maxUnanswered** counts `sent` rows after the last active day, so it resets by itself on any activity; it applies
  to parent reminders too (counted separately).
- **Failures:** the run finishes the batch, marks failed claims `failed`, then throws so pg-boss retries (10/20/40 min;
  all before 21:00 IST from a 17:30 start; quiet hours checked before every send). A crash after the provider accepted
  a message but before the `sent` mark can repeat that one email on a same-day retry (documented at-least-once edge).
- **REMINDERS_ENABLED default:** on in local/test/dev, **off in stg/prod** until switched on, so deploying this code
  sends nothing to real students by surprise.
- **First name:** only `profiles.display_name` (first word); `users.name` is the sign-up placeholder and never used.
- **Parent emails name the student by public name** ("Brave Otter 417", D-039) with a one-line explanation; the
  confirmation email adds the masked student address, like the consent email.
- **Data export:** the platform has no self-service export endpoint today (searched API, web and docs). PII.md says an
  export must include `notification_preferences` when one is built.
- `migrate down --to 17` rolls back 0017 too (the CLI's N = migrations left applied); `--to 18` was also run.

## Known gaps / follow-ups

- **Infra (infra-azure / Lead) before production can send:** the worker has no `OTP_PEPPER`, no `ACS_ENDPOINT` /
  `EMAIL_FROM` and no ACS sender role today (they are API-only in `main.bicep`/params; this also affects the existing
  `billing.invoices` email sweep). Needed: `appSecrets` `otp-pepper` with `apps: ['api', 'worker']`; worker env
  `ACS_ENDPOINT`, `EMAIL_FROM`, `PUBLIC_BASE_URL`; the worker identity in `communication.bicep` `senderPrincipalIds`;
  then `REMINDERS_ENABLED: 'true'` for the worker (prod.bicepparam `appSettings` or a worker-only env) on the owner's
  go-ahead. Until then the job logs `reminders_not_configured` / "switched off" and sends nothing.
- Migration 0018 must run before the new API image (new tables are read by `/v1/me/email-preferences` and `DELETE /v1/me`).
- Privacy notice: one line about reminder emails and the optional parent address (Lead to propose to the owner).
- No e2e (Playwright) spec yet for the card or the link pages; covered by unit/component tests and the API tests.
- ACS custom headers: request shape unit-tested; not yet observed against the real ACS resource (check a delivered
  message shows Gmail's unsubscribe button after go-live).

## Decisions made

D-055 (DECISIONS.md). No new ADR: no shared/marketing file changed, no new dependency; the AUTH-12 exemption is
recorded in D-055, api-reference §3 and the route-policy test.

## Needs from owner

- Go-ahead to set `REMINDERS_ENABLED=true` in production (after the infra change above).
- Approve the privacy-notice line the Lead proposes.
