# Super-admin dashboard and interest counters: privacy design (D-045)

For security-reviewer. Branch `platform/backend-api/admin-analytics`, 2026-10-28. Rules: D-014 (first-party aggregate analytics only, no per-child behavioural profiles, no third-party analytics), CONTEXT §12, AUTH-11, API-6, threat model "admins see masked PII by default with an audited reveal".

## Who can see what

| Who | Sees | Enforced by |
|---|---|---|
| Superadmin = role `admin` **and** a `staff_capabilities` row `superadmin` (migration 0015) | Analytics (aggregates), the user list (masked), search, reveal, summary, plus Reports | Route policy `roles: ['admin'], capability: 'superadmin', mfa: true` on every `/v1/admin/analytics/*` and `/v1/admin/users*` route; snapshot in `platform/api/test/__snapshots__/route-policy.test.ts.snap` |
| Admin without the capability, reviewer | Reports queue only (`/v1/admin/me` says `sections: ['reports']`) | 403 `forbidden` (`authz_denied`, reason `capability`) |
| Students, parents, guests | Nothing | 403 / 401 as before |

- Superadmin is a capability, not a new role, so every existing staff rule applies unchanged: Google Workspace sign-in only (no OTP-only staff login), TOTP on the session (AUTH-11), the 12 h / 60 min staff session lifetime. The capability is read on every request (one indexed lookup), so removing it takes effect at once.
- Granted only by the owner-run CLI `db admin bootstrap --email E --role superadmin` (audit-logged, idempotent). A role or capability change deletes the account's sessions (API-10).
- Order in the policy hook: roles → capability → MFA → … A non-superadmin learns nothing about MFA state of analytics routes.

## Analytics are aggregates

- Every analytics response is a count, sum or ratio over a bounded IST range (≤ 180 days); no response carries a user id, email, name or free text. Staff accounts are left out of user counts.
- Responses are `Cache-Control: no-store` (authenticated, API-4), rate-limited per user (`admin.analytics.user` 60/min).
- "Active" is derived from rows the features already keep (practice answers, lesson progress, attempts). No new per-user tracking was added.

## Interest counters (`analytics_counters`)

- One row per (IST day, event, dimension) with a count, upserted in place. The table has no user id, session id, device id, user agent or IP column (asserted by `admin-analytics.test.ts`).
- Events and dimension values are an allowlist in `platform/shared/config/analytics.ts`; one unknown name or value refuses the whole request (400) and writes nothing. Dimensions are fixed labels (plan id, AI action id, store item key, sign-up method, page area), never ids, URLs or text.
- **Server-observed** (`client: false`): `signup` (by method), `paywall_shown` (by AI action), `ai_paused`, `checkout_start` (by plan), `checkout_complete` (helper ready for billing). Counted by the API; `POST /v1/events` refuses them, so a browser cannot inflate them. No consent is involved because nothing about the person is stored.
- **Client** (`POST /v1/events`): guests and members; at most 10 events and 1 KB; `events.ip` 30/min per IP. The IP is only a rate-limit key (HMAC'd in the KV store, AC-26) and is never written to the database. The web helper (`components/platform/lib/interest.ts`) sends only when the visitor accepted analytics in the cookie bar (`readConsent()?.analytics === true`, the same stored choice marketing's `ConsentedAnalytics` reads; marketing code unchanged), batches, and sends a repeat of the same (event, dimension) at most once per 30 minutes per tab.
- No third-party analytics anywhere; nothing is sent off the platform's origin.

## User lookup (masked, audited)

- The list shows `a***@g***.com` / `+91******12`, sign-in method, board/class, consent state and the sign-up time. No names (the platform stores none, D-039).
- Search is by exact email, sent in a POST body (never in a URL or access log); the result stays masked.
- Revealing the full email (`POST /v1/admin/users/:id/reveal`), opening a summary (`GET …/summary`) and searching each write an `audit_log` row: actor id and role, action (`admin.user.reveal_email` / `admin.user.view_summary` / `admin.user.search`), target user id, request id, time. The audit row never contains the email.
- The summary is counts only (lessons, practice, tests, active days, streak, AI requests and credits, coins, plan, consent state, whether a school is saved). It never returns AI conversations, uploads, answers or report text.
- Per-user bucket `admin.users.user` (60 per 15 min) bounds bulk lookups.

## Points for review

1. Superadmin sessions can read every student's masked row; the 60/15 min bucket and the audit log are the controls. A per-day reveal cap or an alert on bursts could follow.
2. `bootstrap` creates a missing account as admin (existing DB-7 behaviour). With AUTH-7 (no Google attach by email), a staff member should sign up (or link Google) before the bootstrap.
3. In production only email sign-in is enabled (`AUTH_METHODS=email`), so staff cannot sign in until Google is enabled with `ADMIN_GOOGLE_DOMAINS` (OA-05). This design does not relax AUTH-11.
4. Counters are best effort (a failed upsert is logged, never retried), so they can under-count slightly; they are product signals, not billing data.
