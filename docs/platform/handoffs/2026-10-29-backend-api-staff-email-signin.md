# backend-api — staff email sign-in (no Google, no TOTP) + invoice address without a street line — 2026-10-29

Status: done
Branch: `platform/backend-api/staff-email-signin` (from `platform/main` d8df615)

## What changed

**A. Staff sign-in policy as config (ADR-026, owner decision 2026-10-29)**
- `platform/shared/config/security.ts`: `STAFF_SIGN_IN_METHODS` (`email | google`; phone is never a staff method), `STAFF_SECOND_FACTORS` (`none | totp`), `StaffAuthPolicy`, **`STAFF_AUTH = { signInMethods: ['email'], secondFactor: 'none' }`** (comment cites the owner decision, the accepted risk and how to switch back), `staffAuthProblems()` (validated at API start).
- `platform/api/src/config.ts`: `Config.staffAuth`; `loadConfig(env, { staffAuth? })` (default `STAFF_AUTH`; tests inject other modes); an invalid policy is a `ConfigError` (the API does not start).
- `platform/api/src/auth/identity.ts`: staff OTP sign-in allowed only for `email` when the policy lists it; phone OTP always refused → `403 staff_sign_in_method_not_allowed` (with the Google-only policy, OTP keeps the original `403 staff_sign_in_requires_google`); Google for staff only when the policy lists `google`, then still `ADMIN_GOOGLE_DOMAINS` (`hd`) → otherwise `?authError=staff_sign_in_method_not_allowed`. Security event `staff_sign_in_refused` with `reason: 'method'` and the method. Constructor takes `{ domains, signInMethods }` (services.ts).
- `platform/api/src/errors.ts`: new problem `staff_sign_in_method_not_allowed` (403).
- `platform/api/src/app.ts`: `policy.mfa` enforced only when `config.staffAuth.secondFactor === 'totp'`. Capability check (per request), roles, fresh session, consent unchanged and in the same order.
- TOTP code, routes (`/v1/me/mfa*`), migration, storage untouched; comments in `auth/mfa.ts`, `modules/mfa.ts`, `modules/admin.ts`, `policy.ts`, `db/src/seed/admin.ts` updated.
- Web (`/admin`): the page already followed the API (TOTP steps only after `mfa_required`). Changed: the guest login reason now comes from `STAFF_AUTH` (`staffSignInReason()`: "Staff sign in with the email code sent to their SOYL email address."), header comments in `AdminApp.tsx` and `app/(platform)/admin/page.tsx`. `components/platform/lib/problems.ts`: messages for `staff_sign_in_method_not_allowed` (OTP and Google `authError`).
- Superadmin bootstrap: no code change needed. Proven: `bootstrapAdmin(--role superadmin)` for a new email creates the account and its **first email sign-in lands as superadmin** (verified email set on sign-in); for an account that signed up by email it revokes sessions and the next email sign-in is staff.
- No route, request or response schema changed: `npm run openapi -w @soyl/api` regenerates `openapi.json` with no diff (so no api-client regeneration, route-policy snapshot unchanged).

**B. Invoice seller address (owner, 2026-10-29)**
- `platform/shared/config/invoicing.ts`: `Seller.addressLine1: string | null`; `INVOICING.seller.addressLine1 = null`; dropped from the required list; placeholder detection unchanged. Documents now print "Bengaluru 560043" and "Karnataka (State code 29)" with no street line. `invoicingProblems(INVOICING)` is now empty, so **production may run with `INVOICING_ENABLED=true`** (the Lead decides when).
- `platform/api/src/billing/config.ts`: `loadBillingConfig(env, ctx, invoicingSettings = INVOICING)`.

**D. Docs**
- New `docs/platform/adr/026-staff-email-sign-in.md` (context, options Google+TOTP / email+TOTP / email only, decision = owner risk acceptance, consequences, how to switch back, residual mitigations); ADR index row + next free number 027 (`adr/README.md`).
- Amendment notes: ADR-002 "Staff (AUTH-11, API-10)", ADR-011 status line.
- `docs/platform/api-reference.md` (§2 staff line, `mfa` policy row, pipeline step 7, §12 intro), `docs/platform/ARCHITECTURE.md` (as-built authentication staff line; `/admin` as-built line).
- `docs/platform/runbooks/admin-dashboard.md` rewritten for production: email sign-in, the exact bootstrap job command (owner email as a shell variable, not written in the doc), expected log lines, prerequisites (an API image with ADR-026), undo, troubleshooting, how to switch TOTP/Google back on.

## How to verify

```bash
cd platform
npm run typecheck                                   # 0 errors
npm test -w @soyl/shared                            # incl. staff-auth.test.ts, invoicing.test.ts
npm test -w @soyl/api                               # incl. staff-sign-in.test.ts
npx vitest run test/staff-sign-in.test.ts test/invoices-unit.test.ts   # from platform/api, the focused set
cd .. && npm run lint && npm run build && npm run test:platform-web
cd platform && PW_WEB_PORT=3380 PW_FLAG_OFF_PORT=3381 npm run test:platform-web -w @soyl/e2e -- --on-only --grep "admin|superadmin"
```

Results: see "Gate results" below.

## Tests added / changed

- **New** `platform/api/test/staff-sign-in.test.ts`: default policy is the real `STAFF_AUTH`; admin and reviewer email-OTP sign-in → `/v1/admin/me` and `/v1/admin/reports` without TOTP (MFA status shows nothing enrolled); staff phone OTP refused (`staff_sign_in_method_not_allowed`, no cookie, security event); staff Google refused by default even from the allow-listed domain; staff email sessions: 60 min idle, 12 h absolute (checked every 55 min up to the cap); staff writes still need a fresh session; superadmin reaches the dashboard and the audited reveal (audit row) without TOTP; removing the capability closes the dashboard on the next request; bootstrap `--role superadmin` for a new email → first email sign-in is superadmin; bootstrap of an email-signed-up account revokes sessions → next email sign-in is staff; email+TOTP mode (`mfa_required` until enrol+confirm, new sessions verify again); Google-only+TOTP mode (OTP → `staff_sign_in_requires_google`); invalid policy refused by `loadConfig`.
- **New** `platform/shared/config/staff-auth.test.ts`: owner default; the previous policies are valid config; empty list / phone / duplicates / unknown second factor rejected.
- `phone-otp.test.ts`: staff phone OTP still 403 (code now `staff_sign_in_method_not_allowed`), plus no session cookie.
- `reports-mfa.test.ts`: runs with `STAFF_EMAIL_TOTP` (the TOTP suite keeps every guarantee: fail closed, enrol/confirm/verify, replay, lockout, recovery codes, disable).
- `google.test.ts`: runs with `STAFF_GOOGLE_TOTP` (the original AUTH-11 policy), so the Workspace `hd`/domain rules and staff session lifetimes stay proven.
- `http-pipeline.test.ts`: `mfa_required` proven with a TOTP-mode app on the same DB; new case: default policy → the same `mfa` route answers 200 for a reviewer (and 403 while still a student).
- `admin-analytics.test.ts`: superadmin without TOTP reaches overview and `/v1/admin/me` by default; the same account signed in on a TOTP-mode app gets `mfa_required` on both.
- `invoices-unit.test.ts`: production refusal proven with an injected placeholder config; new: the real INVOICING is ready in prod (no problems, `issueRefusal` null); new: the PDF seller block prints legal name, trade name, "Bengaluru 560043", "Karnataka (State code 29)", then "Not registered under GST" (no street line, no placeholder text).
- `invoicing.test.ts`: real config has no street line, no problems, address lines exactly `['Bengaluru 560043', 'Karnataka (State code 29)']`; placeholder in any field still refused; a street line, when set, prints first; required fields stay required.
- Web: `admin-analytics.test.tsx` (superadmin goes straight in without calling `/v1/me/mfa`; guest login reason follows `STAFF_AUTH`), `client-lib.test.ts` (new code mapped, not the generic fallback).
- e2e `platform/e2e/tests/platform/web/admin.spec.ts`: owner flow is now email sign-up at `/admin` → real `bootstrapAdmin --role superadmin` via the control server (sessions revoked; re-run unchanged) → email sign-in at `/admin` → dashboard directly (no authenticator step, `/v1/admin/me` 200) → every tab under axe in light and dark at 360 px → audited reveal. TOTP stays covered at API level and in the web unit tests (m2-components).

## Gate results

Run on the branch, Windows 11, Node 24, 2026-10-29 (heavy jobs one at a time through `_tools/heavy.sh`):

| Gate | Result |
|---|---|
| `cd platform && npm run typecheck` | 0 errors (all workspaces) |
| `npm test -w @soyl/shared` | 19 files, 213 passed |
| `npm test -w @soyl/api` | 45 files, 693 passed, 1 skipped (pre-existing) |
| `npm test -w @soyl/worker` (touched `billing-jobs.test.ts`) | 12 files, 71 passed |
| `npm test -w @soyl/db` (comment-only change in `seed/admin.ts`) | 18 files, 126 passed, 1 skipped (pre-existing) |
| `npm run openapi -w @soyl/api` | `openapi.json` regenerated with **no diff**, so no api-client regeneration; route-policy snapshot unchanged (passes in the api suite) |
| repo root `npm run lint` | clean |
| repo root `npm run build` | compiled successfully |
| repo root `npm run test:platform-web` (vitest) | 22 files, 457 passed |
| `PW_WEB_PORT=3380 PW_FLAG_OFF_PORT=3381 npm run test:platform-web -w @soyl/e2e -- --on-only --grep "a normal student gets no admin\|superadmin: email code only"` | 2 passed (1.9 min). The API web server prints a pg `ECONNRESET` while the embedded database stops at teardown, after the tests passed (noise). |
| `git diff --name-only platform/main` outside `platform/`, `docs/platform/`, `components/platform/`, `app/(platform)/` | none (no marketing files) |

Note for the Lead: the first full api run had 1 failure (`invoices.test.ts` relied on the real config having a placeholder; fixed in 5f3654a), yet `heavy.sh`/`npm test -w` reported `exit 0`. When gating on `npm test -w` in Git Bash, read the vitest summary lines, not the exit code.

## Known gaps / follow-ups

- Production needs a new API image (and the web build for the copy/messages) before staff can sign in; until then the old image answers `staff_sign_in_requires_google`. No env or Bicep change is needed (`AUTH_METHODS=email`, `EMAIL_PROVIDER=acs` already).
- `/ctl/oidc-next-user` in `api-e2e.ts` is now unused by the admin spec (left in place; harmless).
- Files touched outside the brief's listed owned paths, all small and directly required: `components/platform/lib/problems.ts` (+ `components/platform/__tests__/client-lib.test.ts`) for the new problem code's text, `components/platform/__tests__/admin-analytics.test.tsx`, `docs/platform/adr/README.md` (index row), and `platform/worker/test/billing-jobs.test.ts`: its OA-22 assertion relied on the real config having a placeholder. It now uses a hoisted mock with a placeholder seller for that one test, and asserts that prod accepts `INVOICING_ENABLED=true` with the real config. `platform/db/src/seed/admin.ts`: comment only.
- Also adjusted for B: `platform/api/test/invoices.test.ts`. The refusal test injects a placeholder; a new test shows production issues with the real seller and prints no street line.

## Lines the Lead (or security-reviewer) must change (not touched here)

- `docs/platform/security/requirements-for-m1.md:114` AUTH-11 — add "amended by ADR-026 (owner, 2026-10-29): email OTP only, no second factor, controlled by `STAFF_AUTH`; the original Google + TOTP policy is a config change"; the "Test: reviewer without TOTP cannot reach `/v1/admin/*`" line holds only with `secondFactor: 'totp'` (covered by reports-mfa / staff-sign-in tests in that mode).
- `docs/platform/security/requirements-for-m1.md:89` API-10 — "Admin/reviewer routes require MFA (AUTH-11)" → "…require MFA when `STAFF_AUTH.secondFactor` is `'totp'` (ADR-026: off by owner decision)".
- `docs/platform/security/admin-analytics-privacy.md:13` ("Google Workspace sign-in only (no OTP-only staff login), TOTP on the session (AUTH-11)"), `:42` (AUTH-7 / link Google before bootstrap — now only relevant if Google is re-enabled), `:43` ("staff cannot sign in until Google is enabled … This design does not relax AUTH-11") — all superseded by ADR-026.
- `docs/platform/security/asvs-l2-checklist.md:131` (6.8.4 "Admin requires Workspace domain + TOTP") and `:115` (6.3.3 MFA deviation: add staff as an owner-accepted deviation, ADR-026); `:119` (6.4.3 MFA recovery) is moot while `secondFactor` is `'none'`.
- `docs/platform/security/threat-model.md:405` mitigation "`AUTH-11` (Workspace Google + TOTP)" → "email OTP only (owner-accepted risk, ADR-026); short staff sessions, audited PII reveal, per-request capability check"; `:179` and `:25` mention admin TOTP.
- `docs/platform/DECISIONS.md:51` D-045 says "(superadmin role, staff TOTP MFA)" → add a D-0xx entry for the 2026-10-29 owner decisions (staff email-only sign-in = ADR-026; invoice address without street line) and amend D-045's parenthesis.
- `docs/platform/OWNER_ACTIONS.md:30` OA-22: the street line is no longer needed (owner: address is "Bengaluru 560043, Karnataka"); `invoicingProblems(INVOICING)` is now empty, so OA-22 is reduced to the CA review of SAC/title (or closed if those were settled). `:13` OA-05 is no longer a blocker for staff access (only for Google sign-in generally).
- `docs/platform/STATUS.md`: record this branch; note that staff/admin access in production now needs only an API deploy + the bootstrap job (runbook `admin-dashboard.md`).
- Not in the brief's list but stale: `docs/platform/README.md:35,47` ("staff TOTP" as the staff feature) and the earlier handoff `handoffs/2026-10-28-backend-api-admin-analytics.md:84-101` (Google + TOTP owner steps; superseded by the runbook).

## Decisions made

- ADR-026 (staff email sign-in, owner risk acceptance). Policy is config (`STAFF_AUTH`), not env: switching back is a reviewed code-config change plus a deploy, so it cannot be flipped silently in the portal.
- Strict reading of "email OTP only": Google is also refused for staff by default (it was effectively refused in production anyway: no client, no allow-listed domain).
- Kept `staff_sign_in_requires_google` for the Google-only policy so the original behaviour returns exactly when switched back; the new generic code covers every other refusal.

## Needs from owner

None for this task. (Reminder of the accepted risk is in ADR-026 and the runbook: protect the staff mailbox with its own two-step sign-in.)
