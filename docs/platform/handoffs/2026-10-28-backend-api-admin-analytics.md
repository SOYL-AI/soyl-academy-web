# backend-api + web-platform — super-admin dashboard `/admin` (D-045) — 2026-10-28

Status: done (gates below); production use blocked on staff Google sign-in (OA-05, see "Needs from owner")
Branch: `platform/backend-api/admin-analytics` from `platform/main` 1640eb8. Contract commit **`1dee15d`** (zod schemas, routes, OpenAPI, api-client, route-policy snapshot; the web can build on it alone). Not merged, not deployed.

## What changed

### Roles: `superadmin` is a capability on `admin`
- New table `staff_capabilities (user_id, capability ∈ {superadmin}, granted_by_user_id)`; superadmin = `users.role = 'admin'` **plus** that row. Chosen over a new role value because it needs no change to `users.role`, `RoleSchema`, `POLICY_ROLES`, session lifetimes or the staff sign-in rules (Google Workspace + TOTP, no OTP-only staff login all keep applying as they key on `admin`), and no OpenAPI change for every `SessionUser`.
- Route policy gains `capability?: 'superadmin'` (checked after roles, before MFA; 403 `forbidden`, security event `authz_denied` reason `capability`). Helper `policies.superadmin(bucket)` = roles `['admin']`, `mfa: true`, `capability: 'superadmin'`, csrf, own bucket.
- `GET /v1/admin/me` (staff + MFA): `{ userId, role, capabilities, sections }`; superadmins get `['analytics','users','reports']`, other staff `['reports']`.
- CLI: `db admin bootstrap --email E [--role admin|superadmin]` (`platform/db/src/seed/admin.ts`, `cli.ts`). Idempotent (same role again: prints `unchanged (already) …`, no audit row); creates the account if missing (DB-7, as before); a role/capability change deletes the account's sessions (API-10) and writes `audit_log` `admin.bootstrap` with before/after. `--role admin` removes the capability.

### Analytics API (superadmin + MFA, `admin.analytics.user` 60/min, `no-store`)
`GET /v1/admin/analytics/{overview,growth,engagement,retention,ai,revenue,interest,content}?from=YYYY-MM-DD&to=YYYY-MM-DD` — IST days; default the last 30 days; 400 for a future `to`, `from > to`, invalid days or more than 180 days. Every response carries `range` (with the previous period of the same length).

| Section | Metrics (source) |
|---|---|
| overview | KPI tiles with previous-period values: sign-ups, total students, active students, average DAU, lessons completed, practice answers, tests submitted, AI requests, AI spend (paise), revenue (paise); daily sign-ups and DAU series |
| growth | sign-ups per day by method (inferred: Google identity created with the account / phone placeholder email / else email) and per IST week; total students; consent funnel now (none / waiting for parent / parent approved / 18+ / withdrawn); board and class distribution; student-added schools; guest merges per day; the exact server `signup` counter by method |
| engagement | DAU series, active students, WAU/MAU (7/30 days ending `to`), stickiness (avg DAU over 30 days ÷ MAU); per day: lessons opened/completed, practice answers/solved, tests started/submitted, live-mock joins; notes/flashcards opens (counters); top 10 chapters and subjects; current-streak distribution |
| retention | per sign-up IST week: size, D1/D7/D30 retained, eligible (reached the day) and rate (null when nobody reached it) |
| ai | actions per day by type; outcome totals (incl. moderation blocks per day); credits granted per reason (daily grant, plan top-up, staff adjustment and any D-044 bonus grant action, labelled "Learning bonus"), spent (reserve − returned), refunded, expired; INR spend per day vs `AI_DAILY_SPEND_CAP_INR` with the breaker status per day (normal / degraded ≥ 80 % / paused ≥ 100 %, free tier at 60 %), degraded requests, `ai_paused` refusals, paywall shown by action |
| revenue | `billingEnabled`; plans page views; checkouts started (orders + subscriptions created), completed (payments captured), failed; active subscriptions by plan/interval and MRR (yearly ÷ 12); revenue per day; refunds; Board Exam Pass sales; coins earned per day, store views, store items opened, redemptions by status. All zeros while billing is off (tested) |
| interest | every allowlisted counter: total, previous period, by dimension, daily series, server/client |
| content | published chapters per subject (active releases vs catalog chapters); open reports by age (< 24 h, 1–3 d, 3–7 d, older) and type; reports received / fixed in the range |

Definitions: "active" = practice answer, lesson opened/moved on (lesson_progress created/updated), test started or submitted. Staff accounts are excluded from user counts. Code: `platform/api/src/domain/admin/analytics.ts`.

Cost: every query is bounded to the range (+30 days for MAU/retention) and uses range indexes added by the migration (`practice_answers.answered_at`, `lesson_progress.created_at/completed_at/updated_at`, `attempts.started_at/submitted_at`, `credit_ledger (ist_day, kind)`, `coin_ledger (ist_day, kind)`; `users.created_at` and `ai_requests.created_at` already existed). No read replica exists, so it reads the primary. **Rollup seam:** each section is `(db, range) → section`; when one gets slow, a nightly worker job writes closed IST days into a rollup table and the section reads closed days from it plus today raw, with no contract change. Additive per-day metrics roll up directly; WAU/MAU/retention stay raw (distinct users across days). No worker job was added: at today's scale the indexed raw reads are cheap.

### Interest counters (migration table `analytics_counters`)
- `(ist_day, event, dimension) → count`, unique, upserted in place. **No user id, IP, session id, device id or user agent column** (test asserts the column list).
- Allowlist: `platform/shared/config/analytics.ts` (`ANALYTICS_EVENTS`, `ANALYTICS_DIMENSIONS`; config, so adding an event needs no migration).
- Server-observed (`client: false`, refused from the browser): `signup` (by method, `auth/identity.ts` afterCreate), `paywall_shown` (by AI action, when an action answers 402 `credits_exhausted`), `ai_paused`, `checkout_start` (by plan, on 201 from `POST /v1/billing/{subscriptions,orders}`), `checkout_complete` (helper only; see follow-ups). Wiring: `domain/admin/observe.ts`, hooked in `app.ts` (error handler + onResponse), so `ai/**` and `billing/**` are untouched.
- `POST /v1/events {events:[{name, dimension?}]}`: guests and members, ≤ 10 events, 1 KB body, `events.ip` 30/min (the IP is a rate-limit key only, HMAC'd in the KV store), 202 `{accepted}`; one bad item → 400 and nothing written.
- Web helper `components/platform/lib/interest.ts` (+ `InterestPing.tsx`): sends only when `readConsent()?.analytics === true` (the cookie-bar choice marketing's `ConsentedAnalytics` reads; imported read-only, no marketing change), batches, debounces the same (event, dimension) for 30 min per tab, `keepalive`, failures ignored. Instrumented: `plans_view`, `plan_select`, `signup_prompt_click` (source `plans`) in `plans/PlansClient.tsx`; `store_view`, `store_item_view` in `coins/StoreClient.tsx`; `ask_ai_open` in `ai/AskClient.tsx`; `notes_open`, `flashcards_open` in `notes/NotesView.tsx`, `flashcards/FlashcardsView.tsx`.
- Privacy note for security-reviewer: [security/admin-analytics-privacy.md](../security/admin-analytics-privacy.md).

### Staff user lookup (superadmin + MFA, `admin.users.user` 60 per 15 min)
- `GET /v1/admin/users?limit=&cursor=`: newest non-staff accounts: masked email `a***@g***.com` (null for phone-only), masked phone `+91******12`, method, role, board/class, consent, created. No names.
- `POST /v1/admin/users/search {email}` (POST so the address is never in a URL/log): exact normalised match, masked; audited `admin.user.search` with `{found}`.
- `POST /v1/admin/users/:id/reveal`: full email; audited `admin.user.reveal_email`.
- `GET /v1/admin/users/:id/summary`: counts only (lessons, practice, tests, active days, last active, streak/XP, AI requests and credits over 30 days, coins, plan, consent/age band, school saved yes/no); audited `admin.user.view_summary`. Never chats, uploads, answers or text.
- Audit rows: existing `audit_log` (actor id + role, action, target user id, request id = `x-trace-id`, time; never the email).

### Web `/admin`
- `components/platform/admin/AdminApp.tsx`: after MFA, `GET /v1/admin/me` decides the view. Superadmin: tabs Overview, Growth, Engagement, Retention, AI and credits, Revenue, Interest, Content, Users, Reports (only the open tab renders/fetches). Reviewers and plain admins: the reports queue as before. Non-staff: unchanged ("Staff sign-in" / "Staff only"); the API answers 401/403.
- `components/platform/admin/analytics/`: `Analytics.tsx` (range picker 7/30/90/custom ≤ 180 days, sections), `UsersPanel.tsx`, `Charts.tsx` (hand-made inline SVG line charts and bar lists, KPI tiles with deltas, tables with CSV), `model.ts` (pure: geometry, text alternatives, formats, CSV with formula neutralising, ranges, tab gating), `analytics.module.css`. Analytics and Users are lazy chunks (reviewers never load them). No new dependency.
- Accessibility: each chart has a visible text summary and the same in its `aria-label`, a "Show as table" view, a legend for 2+ series plus distinct dash patterns and end markers (colour never the only cue), a crosshair tooltip on pointer and arrow keys. Retention is a real table with percentages and n/eligible as text over a one-hue heat ramp. Series palette validated with the dataviz validator for light (`#2b4fe6,#c2570c,#0f7a5c,#6d3fd6`) and dark (`#6f88ff,#e0703f,#2aa87c,#9d7bf0` on `#1f2024`): all checks pass. Works at 360 px (tables scroll inside their box, tiles reflow).

### Migration
`platform/db/migrations/0014_admin_analytics.sql` + `.down.sql` + `meta/0014_snapshot.json`: **this is migration 0015**. The migrator refuses gaps (`loadMigrations` throws "out of sequence"), so on this branch, which has no 0014, it is numbered 0014; naming it 0015 would stop every DB and API test. **Lead, when integrating after the AI/credits 0014:** rename both SQL files to `0015_admin_analytics{,.down}.sql` (update the header comment), drop this branch's `meta/0014_snapshot.json` and its `_journal.json` entry, and regenerate the 0015 snapshot with `npm run generate -w @soyl/db -- --name admin_analytics` on the merged schema (keep the hand-written SQL files; the generated SQL should match them). The SQL does not depend on 0014. Schema test table count: 73 → 75 (0014 may add more; adjust when merging).

## How to verify

```bash
cd platform
npm run typecheck                                   # exit 0
npm test -w @soyl/shared                            # 14 files, 167 tests
npm test -w @soyl/db                                # migration up/down incl. this one; bootstrap --role tests
cd api && npx vitest run test/admin-analytics.test.ts test/route-policy.test.ts test/reports-mfa.test.ts test/content.test.ts
cd .. && npm run build && npm test -w @soyl/api
cd .. && npm run lint && npm run test:platform-web -- --maxWorkers=2 && npm run test:platform-ui -- --maxWorkers=2 && npm run build
cd platform && PW_WEB_PORT=3350 PW_FLAG_OFF_PORT=3351 npm run test:platform-web -w @soyl/e2e
npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main
```
Local look: `npm run dev -w @soyl/api` + web dev, then `npm run db -w @soyl/db -- admin bootstrap --email you@<ADMIN_GOOGLE_DOMAINS domain> --role superadmin` against the dev DB, sign in with the mock Google, `/admin`.

Gate results: see the bottom of this file.

## Tests added
- `platform/api/test/admin-analytics.test.ts` (21): access matrix (guest 401, student/parent 403, reviewer 403 except reports/me, plain admin 403, superadmin without MFA `mfa_required`, superadmin 200 + `no-store`), policy of all 12 routes, range validation, every section against a fixture with known numbers incl. 00:10 / 23:50 / 00:00 IST boundaries and a 00:30 IST answer that is the previous UTC day, D1/D7/D30 cohorts, credits incl. a learning-bonus grant, breaker days, MRR, zeros for an empty period, events allowlist (unknown name/dimension, missing/extra dimension, server-only events, extra fields, empty, > 10, > 1 KB → nothing written), counters table columns (no user/IP/UA), IP rate limit, server-observed counters, masked list/cursor, audited search/reveal/summary.
- `platform/api/test/route-policy.test.ts`: the snapshot line now shows `cap=…`; reviewed snapshot adds 13 routes.
- `platform/db/test/catalog-seed.test.ts`: `--role superadmin` (promote a student with a session → revoked, audit before/after), idempotent re-run (no audit, no revocation), `--role admin` removes the capability, a missing account is created, bad role refused. `schema.test.ts` count 75.
- `platform/shared/config/analytics.test.ts` (3): allowlist and DB-check compatibility.
- `components/platform/__tests__/admin-analytics.test.tsx` (15): chart geometry, text alternatives, formats, deltas, CSV quoting and formula neutralising, ranges, tab gating by role (rendered), `mfa_required` from a section → verify step, rendered charts (legend, table view, keyboard crosshair), CSV download, interest helper (no consent → nothing; consent → batched; debounce; failures swallowed). `m2-components.test.tsx`: the two MFA tests now answer `GET /v1/admin/me` first (same assertions).
- `platform/e2e/tests/platform/web/admin.spec.ts` (2): a student gets no admin (UI + 403 on me/analytics/users); the owner flow (Google sign-up → real `bootstrapAdmin` via the e2e control server → sessions revoked, re-run unchanged → Google sign-in with the Workspace `hd` → TOTP enrolment computed from the shown key → Overview with sign-ups > 0) and every tab under axe + no horizontal overflow at 360 px in light and dark, then summary + audited reveal from Users. `api-e2e.ts` gains `/ctl/oidc-next-user`, `/ctl/bootstrap-admin` and `ADMIN_GOOGLE_DOMAINS=staff.e2e.example.com`.

## Production: make the owner (ryan.gomez@soyl.cloud) a superadmin

Preconditions (in this order):
1. This branch is integrated and deployed (migrate image with migration 0015 and the `--role` CLI; api image; web). Run the usual `migrate up` first (runbooks/update-dark-backend.md).
2. **Staff sign-in must be possible:** production has `AUTH_METHODS: 'email'` and staff accounts are refused email-OTP sign-in (AUTH-11, `staff_sign_in_requires_google`). The owner must decide (see "Needs from owner"); with option A the Lead enables Google (OA-05 client id/secret in Key Vault, `AUTH_METHODS` incl. `google`, `ADMIN_GOOGLE_DOMAINS: 'soyl.cloud'` in `prod.bicepparam`) and redeploys.
3. The owner signs up on www.soylai.com with **email OTP** as `ryan.gomez@soyl.cloud` (if the account does not exist yet), then, **while still a student**, opens the profile and links Google (`/api/platform/v1/auth/google/start?intent=link`, fresh session). AUTH-7 never attaches a Google identity by email, and after promotion the email-OTP sign-in is refused, so linking must happen first. (Or: sign up directly with Continue with Google.)

The step (idempotent; works whether the account exists or not; re-running prints `unchanged (already) superadmin …`):

```bash
export RG=rg-soyl-platform-prod MIGRATE_JOB=caj-soyl-migrate-prod
# SOYL_MIGRATE_IMAGE = the migrate image built from the integrated commit (as in update-dark-backend.md)
EXEC=$(az containerapp job start -g $RG -n $MIGRATE_JOB --image $SOYL_MIGRATE_IMAGE --container-name migrate \
  --args "/app/migrate-entrypoint.mjs" "admin" "bootstrap" "--email" "ryan.gomez@soyl.cloud" "--role" "superadmin" \
  --query name -o tsv)
until s=$(az containerapp job execution show -g $RG -n $MIGRATE_JOB --job-execution-name $EXEC --query properties.status -o tsv); \
      [ "$s" = Succeeded ] || [ "$s" = Failed ]; do echo "$s"; sleep 10; done; echo "bootstrap: $s"
```

The entrypoint runs `db admin bootstrap --email … --role superadmin` after its Entra bootstrap, non-interactively. Expected log line: `updated superadmin ryan.gomez@soyl.cloud (<uuid>); 1 session(s) revoked` (or `created …` when there was no account; or `unchanged (already) …`). Check with the job's console logs (Log Analytics `ContainerAppConsoleLogs`, job `caj-soyl-migrate-prod`). The email lives only in this command, not in config or seeds.

Then the owner signs in with Continue with Google, opens `/admin`, sets up the authenticator and saves the recovery codes (runbooks/admin-dashboard.md). To undo: the same command with `"--role" "admin"` (keeps staff, removes the dashboard), or set the role back to student with a DB operation.

## Known gaps / follow-ups
- `checkout_complete` counter: `services.counters.observe('checkout_complete', planKey)` should be called by billing where a payment is captured (`billing/**` was out of scope); the dashboard already counts completed checkouts from `payments`.
- Not instrumented because the files belong to parallel work: `dashboard_view` (`components/platform/dashboard`), `future_builders_click` and header `signup_prompt_click` (`components/platform/shell`). Each is one line: `trackInterest('dashboard_view')` on mount; `trackInterest('future_builders_click', 'menu' | 'footer')`; `trackInterest('signup_prompt_click', 'header')`.
- No "notify me" exists in the store, so store-item interest is `store_item_view` (opening the redeem dialog).
- No nightly rollup job yet (seam documented above).
- STATUS.md / handoffs INDEX left for the Lead.

## Decisions made
- Superadmin as a capability on `admin` (above). No ADR needed: no shared/marketing file, no new dependency, no infra; documented here and in the security note.
- Migration numbered 0014 on the branch (the migrator forbids gaps); renumber to 0015 at integration.

## Needs from owner
1. **How staff sign in to production (blocking).** A: switch on Google sign-in for staff (OA-05: Google OAuth client for www.soylai.com; confirm `soyl.cloud` is a Google Workspace domain so Google sends the `hd` claim; then `ADMIN_GOOGLE_DOMAINS=soyl.cloud`). B: an ADR to let staff use email OTP + TOTP (a deviation from AUTH-11 "no OTP-only admin login"; weaker than Workspace SSO; not implemented). Recommended: A.
2. Confirm the owner account `ryan.gomez@soyl.cloud` (confirmed by the Lead 2026-10-28) and who else, if anyone, should be superadmin.

## Gate results (2026-10-29, Windows 11, Node 24; heavy runs through `_tools/heavy.sh`)

| Gate | Result |
|---|---|
| `platform/`: `npm run typecheck` | exit 0 (all workspaces) |
| `npm test -w @soyl/shared` | 14 files, 167 passed |
| `npm test -w @soyl/db` (incl. migration up/down fresh + seeded, schema 75 tables, bootstrap `--role`) | 16 files, 120 passed, 1 skipped (pre-existing `skipIf`) |
| API targeted: admin-analytics, route-policy, reports-mfa, content (answer-leak), http-pipeline, unit, coins, email-otp, google | 9 files, 213 passed, 1 skipped (pre-existing) |
| `npm run build` (api + worker bundles) | exit 0 |
| `npm test -w @soyl/api` (full, once at the end) | 40 files, 630 passed, 1 skipped (pre-existing) |
| Root: `npm run lint` | exit 0 |
| `npm run test:platform-web -- --maxWorkers=2` | 17 files, 298 passed |
| `npm run test:platform-ui -- --maxWorkers=2` | 6 files, 606 passed |
| Root `npm run build` | exit 0 (`/admin` static shell) |
| e2e `PW_WEB_PORT=3350 PW_FLAG_OFF_PORT=3351 npm run test:platform-web -w @soyl/e2e` | flag ON 77 passed (incl. the 2 admin specs and the JS budget: `/admin` 182.8 KB gz first load, budget 200; other runs today 180.3–180.8 before this change); flag OFF 37 passed (`/admin` → 404) |
| `npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main` | 48 passed; HEAD renders the marketing site identically to its merge-base |
| gitleaks `origin/platform/main..HEAD` | no leaks |
