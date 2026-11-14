# Lead — integration: email reminders + progress radar — 2026-11-14

Status: done (integrated, gates green). Not merged to `main`, not pushed, not deployed.
Branch: `platform/lead/reminders-radar` (from `platform/backend-api/email-reminders` @ 39b8c8f7)

## What changed
- 8040c32b: merge of `platform/web-platform/progress-radar` (bcfef06c). Clean, no conflicts. Details in the [radar handoff](2026-11-14-web-platform-progress-radar.md).
- Email reminders (D-055) come from the base branch. Details in the [reminders handoff](2026-11-14-backend-api-email-reminders.md).
- c73478cb `feat(platform-infra): worker can send email (reminders, invoices)`:
  - The `otp-pepper` secret now goes to `apps: ['api', 'worker']` in dev, stg and prod.
  - `containerApps.bicep` gains `workerExtraEnv`. `main.bicep` passes `ACS_ENDPOINT` and `EMAIL_FROM` to the worker and adds the worker identity to the ACS sender role.
  - prod sets `REMINDERS_ENABLED: 'false'` until the owner says go.
  - This also fixes a gap that existed before this work: the `billing.invoices` sweep in the worker had no email settings.

## How to verify
Run from `C:/Users/ryang/soyl-wt/reminders`.

| Gate | Result |
|---|---|
| `npm run lint` (root) | rc 0 |
| `npm run build` (root) | rc 0 |
| `npm run test:platform-web` | 30 files, 561 passed |
| `npm run test:platform-ui` | 805 passed, 1 failed (`visual-v2.test.tsx` "table"; this failure predates the work and is listed in the backlog) |
| `platform: npm run typecheck` | rc 0 |
| `platform: npm test` | every workspace passes: 6,590 passed, 2 skipped, 0 failed |
| e2e flag off | 58 passed |
| e2e flag on | 127 passed, 3 failed, 1 skipped (custom `PW_*` ports, run in parallel). See note below. |
| `infra/validate.mjs --strict` | 0 errors, 0 warnings |
| JS budget | every platform page ≤ 200 KB gz first load; `/me/progress` is 197.7 KB gz |

**Note on the e2e flag-on failures.** Two of the failures were caused by the harness, not the code: `auth.spec.ts:105` and `:144` hard-code the mock OIDC origin `127.0.0.1:8098`, and this run overrode the port. The third, the live mock, reached its 5-minute timeout at submit during the 60-minute parallel run. All three were re-run on the default ports with `--on-only --grep ...` and pass: 3/3 in 5.0 minutes, including a fresh flag-on build.

## Known gaps and follow-ups
- `auth.spec.ts` should read the OIDC port from `PW_OIDC_PORT` instead of hard-coding `8098`. Owner: qa-e2e.
- No e2e spec yet for the email-preferences card or the `/me/email/*` pages. The unit tests and the manual check in the reminders handoff cover them.
- ParentWithdrawClient has the same dev-only React Strict Mode token double-submit as the one fixed in the reminders work.
- Unused CSS remains in `me.module.css` after the rail card was removed.
- The e2e run rewrites `docs/platform/design/avatars-assets/*.png`. These were discarded here and not committed.

## Decisions made
- D-055: email-only reminders. The parent address is optional and only used once confirmed. See the reminders handoff.
- No new ADR. The Bicep change follows the ACS sender pattern the API already uses.

## Needs from owner
1. Go-ahead to merge to `main` and deploy, in this order:
   1. Migration 0018.
   2. API and worker images.
   3. Bicep redeploy, so the worker gets `OTP_PEPPER`, `ACS_ENDPOINT`, `EMAIL_FROM` and the sender role.
   4. Web, via Vercel on `main`.
2. Go-ahead to set `REMINDERS_ENABLED=true` in production.
3. Approval of the privacy-notice line about reminders (text in the reminders handoff).
