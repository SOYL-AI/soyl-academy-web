# backend-api + web-platform — interim built-in consent provider and D-039 data minimisation — 2026-10-28

Status: **done** (see "How to verify" for the gate runs). Nothing was deployed and no infra parameter was changed.

Branch: `platform/backend-api/consent-interim` (worktree `C:/Users/Prabhu/soyl-wt/consent-interim`), merged with `origin/platform/main` up to fe404f0 (security fixes M6).
Decision record: [ADR-022](../adr/022-interim-builtin-consent-provider.md) (code, not a click-to-approve link; why; residual risks).

## Flow

1. A student opens a consent-gated feature (`/ask`, `/leaderboard`, `/plans`, AI marking, explain-slide; `/coins` when it lands) and sees the existing consent-needed state, now with **"Ask a parent to approve"** → `/me/consent?next=<page>`. The same card is on `/me`.
2. **Age group** (never a date of birth): *Under 18* or *18 or older*.
   - 18+: tick "I am 18 or older and I agree to the privacy notice" → `granted` at once (`method self_declared`, audit row).
   - Under 18: the parent's or guardian's email (must differ from the student's own; not stored) → the API emails a **6-digit approval code** from `noreply@soylai.com` (new template: what unlocks, what data, privacy/terms links, withdraw link). Valid 48 h, 5 tries.
3. The parent gives the code to the student, who enters it → `granted` (`method parent_email_code`). AI, uploads, leaderboards/leagues and coin rewards switch on immediately (the gate's cache is rewritten on every transition).
4. **Withdrawal**: the student (from `/me`, with a confirm dialog) or the parent (link in the email → `/me/consent/parent#t=…`, no account, button press) → `revoked`. Features switch off at once and the AI data is deleted (AI conversations + messages, uploads + both blobs, via the S6-M02 purge path). A parent's link on a pending request **declines** it and kills the code.
5. An under-18 account cannot switch itself to 18+ (409 `age_band_locked`). An 18+ account that re-declares as under 18 loses its grant.
6. Lessons, practice and tests never need any of this (D-014).

## What changed

| Path | What |
|---|---|
| `platform/shared/config/security.ts` | `CONSENT_PROVIDERS` (`mock`, `unavailable`, `builtin`), `AGE_BANDS`, `CONSENT_METHODS`, `CONSENT_REVOKERS`, `BUILTIN_CONSENT` (policy version `2026-10-28`, code length/TTL/attempts, send and failure limits), rate-limit buckets `consent.write.user`, `consent.parent.ip`, `public-name.user`. |
| `platform/shared/config/public-names.ts` (+ test) | Auto-generated public names ("Brave Otter 417") from (user id, seed); child-safe word lists. |
| `platform/db/schema/identity.ts`, `migrations/0011_consent_interim.sql` + hand-written `.down.sql`, `meta/` | Table `consent_records`; column `profiles.public_name_seed`. |
| `platform/db/PII.md`, `README.md`, `test/schema.test.ts` (69 → 70 tables) | Data-minimisation and consent-withdrawal sections; inventory rows for every new column; deletion step 1 deletes `consent_records`. |
| `platform/api/src/consent/builtin.ts` (new) | `BuiltinConsentProvider` (implements the unchanged `ConsentProvider`) and `BuiltinConsentFlow` (state machine, hashing, limits, withdraw token, AI data deletion, audit rows). |
| `platform/api/src/consent/email.ts` (new) | Parent approval email (text + HTML). |
| `platform/api/src/modules/consent.ts` (new), `app.ts`, `services.ts`, `providers.ts`, `index.ts`, `config.ts`, `errors.ts` | Routes; wiring; `CONSENT_PROVIDER=builtin` (prod needs `EMAIL_PROVIDER=acs`); problem codes `consent_flow_unavailable`, `age_band_required`, `age_band_locked`, `consent_code_invalid`, `consent_code_expired`, `consent_link_invalid`. |
| `platform/api/src/modules/me.ts` | `publicName` in `GET /v1/me`; `POST /v1/me/public-name`; **`schoolId` removed** from `PATCH`/`GET /v1/me` (D-039: no school or city). |
| `platform/api/src/domain/tests/live.ts`, `domain/leagues/leagues.ts` (docs), `modules/leagues.ts`, `modules/tests*.ts` | Live-mock and league standings show the public name, never "first name + last initial". |
| `platform/api/src/auth/identity.ts` | Google sign-ups no longer store Google's name or picture (placeholder name, no image). |
| `platform/api/src/domain/account-deletion.ts` | Deletes `consent_records`; resets the public-name seed. |
| `platform/api/src/modules/dev.ts` | Dev outbox (local only) also returns the parent email's withdraw `link`. |
| `platform/worker/src/config.ts` (+ test) | `UNCONSENTED_PURGE=auto` stays **off** for `builtin` too (students who only learn never consent). |
| `platform/api/openapi.json`, `platform/shared/api-client/{schema.gen.ts,index.ts}`, `test/__snapshots__/route-policy.test.ts.snap` | Regenerated; 7 new routes in the policy table, reviewed. |
| `app/(platform)/me/consent/page.tsx`, `app/(platform)/me/consent/parent/page.tsx` (new) | The flow page and the parent's withdraw page (both per-request, nonce CSP; under the existing `/me` prefix, so no proxy/matcher change). |
| `components/platform/consent/*` (new) | `ConsentFlow`, `ConsentPageClient`, `ParentWithdrawClient`, styles (360 px, radio cards, OTP input). |
| `components/platform/me/MeClient.tsx` | Consent card → `ConsentFlow`; new "Your public name" card with "Give me a new name". |
| `components/platform/ai/AiDialogs.tsx`, `plans/PlansClient.tsx`, `auth/ConsentNotice.tsx`, `lib/problems.ts`, `leaderboard/*`, `tests/LiveEventClient.tsx`, `app/(platform)/leaderboard/page.tsx` | Consent-needed states link into `/me/consent?next=…`; copy says auto-generated names, never real names; messages for the new problem codes. |
| Tests | `platform/api/test/consent-builtin.test.ts` (new, 19), `me.test.ts`, `prod-auth.test.ts` (school now refused even with consent), `leagues.test.ts`, `live.test.ts` (public names; asserts no first names either), `helpers.ts` (`consentProvider` option); `components/platform/__tests__/consent-flow.test.tsx` (new, 11); `platform/e2e/tests/platform/web/consent.spec.ts` (new, 3 flows); e2e `api-e2e.ts` runs `CONSENT_PROVIDER=builtin`, `grantConsent` helper uses the 18+ path, `auth.spec.ts` checks the new card and public name. |
| Docs | ADR-022 + ADR index, `api-reference.md`, `data-model.md`, `ARCHITECTURE.md` §19 env list, `platform/api/README.md`. |

## Migration

`0011_consent_interim` (up: generated; down: hand-written, drops `consent_records` and `profiles.public_name_seed`). If `soyl-coins` lands its migration first, renumber this one (journal + snapshot) on merge.

## Endpoints (browser path = `/api/platform` + path)

| Method | Path | Policy | Notes |
|---|---|---|---|
| GET | `/v1/me/consent` | member | `ConsentView`: `flow` (`builtin`/`external`/`none`), `status`, `ageBand`, `method`, `parentEmailHint`, `codeExpiresAt`, `grantedAt`, `revokedAt`, `revokedBy`, `policyVersion`. |
| POST | `/v1/me/consent/age-band` | member, `consent.write.user`, fail-closed | `{ ageBand: 'adult', agree: true }` → granted; `{ ageBand: 'minor' }`. |
| POST | `/v1/me/consent/parent` | same | `{ parentEmail }` → pending + `resendAfterSeconds`. Limits: account 1/min, 3/h, 5/day; parent address 3/h, 5/day; IP 10/h, 30/day. Email failure → 503 and the code is killed. |
| POST | `/v1/me/consent/verify` | same | `{ code }` → granted. 400 `consent_code_invalid` / `consent_code_expired`; 10 wrong per day → 429 `otp_locked`. Replays after approval return the granted view. |
| POST | `/v1/me/consent/withdraw` | same | → revoked (`account_holder`); deletes AI data when leaving `granted`. Idempotent. |
| POST | `/v1/consent/parent/withdraw` | everyone (no session), `consent.parent.ip` 20/h, fail-closed | `{ token }` → `{ status, alreadyWithdrawn }`; 404 `consent_link_invalid` for forged/stale links. |
| POST | `/v1/me/public-name` | member, `public-name.user` 10/day | → `{ publicName }`. |

With `CONSENT_PROVIDER=mock` or `unavailable` all write routes answer 409 `consent_flow_unavailable`; `POST /v1/me/consent/start` and the gate behave exactly as before (tests for both providers included).

## Production setting change (for the Lead; not applied)

In `platform/infra/params/prod.bicepparam` → `appSettings` (shared by the api and worker apps), change one line:

```
CONSENT_PROVIDER: 'builtin'      // was 'unavailable' (D-039, ADR-022)
```

Keep `UNCONSENTED_PURGE: 'auto'` (it stays off for `builtin`) and `EMAIL_PROVIDER: 'acs'` (required by config for `builtin` in prod). No new secret: the code/hash/link keys derive from `OTP_PEPPER`. Deploy order: run migrations (0011) first, then the new api/worker images with the setting. `PUBLIC_BASE_URL` must be the web origin (it is: `https://www.soylai.com`), because the withdraw link points at `/me/consent/parent`. The web needs no new env var. AI itself still needs `AI_DAILY_SPEND_CAP_INR` > 0 and the AI runtime (D-038) to be useful once consent is granted.

## How to verify

GATES_PLACEHOLDER

## Known gaps / follow-ups

- `/coins` is not on `platform/main` yet; `soyl-coins` was told to route its consent-needed state to `/me/consent?next=%2Fcoins` (or `AiNotice kind consent`). Coin awards read `consent_status`, which this flow rewrites immediately.
- Re-consent on a policy-version bump is not enforced (recorded only).
- No admin tool to reset an age band declared by mistake (support would do it in SQL for now).
- Older Google accounts may still hold a Google name/picture in `users.name`/`users.image`; nothing displays them. A one-off backfill to the placeholder is optional.
- The parent email has not been sent through the real ACS resource (no credentials here); the ACS request shape is unchanged and unit-tested.

## Decisions made

ADR-022. D-039 implemented with these readings: school/city are refused outright (even with consent); Google profile name and picture are not stored; consent is asked at first use of a gated feature, not forced at first sign-in, so sign-in and learning stay unchanged.

## Needs from owner (OA-14 residual legal risks)

1. Is an emailed one-time code, entered by the child, "verifiable" parental consent under DPDP s.9? It does not prove the address belongs to a parent.
2. Self-declared 18+ is not age verification.
3. How long must consent evidence be kept after account deletion? Today: `consent_records` are deleted with the account; `audit_log` rows (ids and states only) stay 2 years.
4. Whether leaderboards/leagues/coins (even pseudonymous) are "behavioural monitoring" of children (open since D-014).
5. Privacy notice and terms (`/privacy`, `/terms`) should describe this flow, the 30-day AI retention and the public names; the email links to them. The policy version recorded is `2026-10-28`.
