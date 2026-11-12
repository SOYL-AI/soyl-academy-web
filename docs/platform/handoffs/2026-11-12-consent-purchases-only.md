# backend-api + web-platform — consent only for purchases (D-052) — 2026-11-12

Status: done (see "How to verify" for the gate results and what was not run). Nothing was pushed, merged or deployed.

Branch: `platform/backend-api/consent-purchases-only` (worktree `C:/Users/ryang/soyl-wt/consent-purchases-only`, from `main` 54643166).
Decision record: [ADR-030](../adr/030-consent-only-for-purchases.md). The Lead records the owner's decision as D-052 (DECISIONS.md was not touched here).

## What changed

| Path | What |
|---|---|
| `platform/shared/config/consent.ts` (new, + `consent.test.ts`) | `CONSENT_REQUIRED: Record<ConsentFeature, boolean>` — only `purchases` and `physical_rewards` are `true`. Pure helpers `consentRequiredFor`, `consentAllows`, `consentGatedFeatures`. Imports only types from security.ts. |
| `platform/shared/config/security.ts` | New consent feature `purchases`. `CONSENT.gatedFeatures` is now derived from `CONSENT_REQUIRED` (the route policies keep using it). `BUILTIN_CONSENT.policyVersion` 2026-10-28 → **2026-11-12** (the notice now says approval is for paid plans). AUTH-15 comment. Its only import is the sibling `./consent`. |
| `platform/shared/config/coins.ts` | Earn-table label "Live mock top ranks (with parent consent)" → "Live mock top ranks". |
| `platform/api/src/consent/service.ts` | `allows(status, feature)`; doc. Ungated features never read the cache or call the provider. |
| `platform/api/src/billing/service.ts`, `routes.ts` | Purchases (subscriptions and orders) check the `purchases` feature via `consent.isGated` / `consent.allows`, after `billing_disabled` (error order unchanged). |
| `platform/api/src/ai/bonuses.ts`, `guide.ts`, `schemas.ts`, `routes.ts` | AI learning bonuses for every student (`consentAllows(…, 'ai')`, no DB read while ungated). `GET /v1/credits` gains **`billingEnabled`** (the web uses it to say "coming soon"). Doc/summary text. |
| `platform/api/src/domain/leagues/leagues.ts`, `modules/leagues.ts` | League placement and weekly formation no longer require consent (`leftJoin` on consent_status; the condition is added only while `leaderboards` is gated). |
| `platform/api/src/domain/tests/live.ts`, `modules/tests.ts` | Leaderboard names for every non-deleted student; `ranks.requiresConsent` now reports the config (`false`) and `canView` follows it. |
| `platform/api/src/domain/coins/awards.ts` | Live-rank (`rank_cards`) and league (`leaderboards`) coin awards for every student. |
| `platform/api/src/domain/coins/store.ts`, `modules/coins-schemas.ts` | Physical merch stays consent-gated, now through `consent.isGated/allows('physical_rewards')`. |
| `platform/api/src/domain/schools.ts`, `modules/me.ts`, `modules/schools.ts`, `domain/insights/dashboard.ts`, `modules/dashboard*.ts` | School search/save/show and the dashboard school prompt need no consent. |
| `platform/api/src/consent/builtin.ts`, `email.ts`, `unavailable.ts`, `policy.ts`, `domain/gamification.ts`, `domain/practice.ts`, `modules/practice.ts` | Comments; parent email rewritten: approval is for paid plans and merch delivery; AI, leaderboards and coins are open without it; subject "Approve paid plans on SOYL Academy". |
| `platform/worker/src/config.ts`, `worker.ts`, `jobs.ts` | `UNCONSENTED_PURGE=auto` is **off with every provider** (only `on` registers `account.purge-unconsented`). |
| `platform/api/openapi.json`, `platform/shared/api-client/schema.gen.ts` | Regenerated: `Credits.billingEnabled` (new field) and description/summary text. |
| `components/platform/ai/*` | `CreditsProvider.aiAllowed` = member + `consentAllows(…, 'ai')`; new `billingEnabled`. `AskClient`, `ExplainSlideDialog` use the helper. `AiDialogs` (`useBillingOn`): while billing is off or unknown, the paywall/plan dialog and the unaffordable quote say free credits refill at 00:00 IST and paid plans are coming soon, with no "See plans". `CreditGuide`: same. |
| `components/platform/tests/BuilderClient.tsx`, `me/MeExtras.tsx` | "Upgrade to Pro" / "See plans" become "coming soon" text while billing is off. |
| `components/platform/leaderboard/*`, `tests/LiveEventClient.tsx`, `dashboard/*`, `me/SchoolSetting.tsx`, `me/MeClient.tsx`, `coins/StoreClient.tsx` | Consent checks through `consentAllows`; the consent-needed states only appear if a feature is re-gated. `DashboardView` takes `ai` and `leagues` instead of `consent`. `/me` keeps a saved school unless the change leaves `granted`. |
| `components/platform/consent/*`, `auth/ConsentNotice.tsx`, `app/(platform)/me/consent/**` | Copy: "Parent approval for paid plans"; only needed to buy a plan; withdraw dialog and parent page explain what withdrawal does. |
| `components/platform/plans/PlansClient.tsx` | Billing off: "**Paid plans are coming soon.** Everyone gets free AI credits every day (they refill at 00:00 IST)…" plus, for members without approval, "Set up approval" → `/me/consent?next=%2Fplans`. Buttons stay "Coming soon". Billing on: unchanged (consent notice before buying). |
| `docs/platform/adr/030-consent-only-for-purchases.md` (new) | Context, options, decision, consequences, residual risk (DPDP s.9, OA-14). |

## Choices to review

- **Physical rewards stay consent-gated** (`physical_rewards: true`): redemption collects a child's name, phone and home address. It is off in production anyway.
- **Withdrawal still deletes AI conversations/uploads and clears the school** when leaving `granted` (student, parent link, adult → minor). Nothing deletes anything for an account that never reached `granted` (test: "never deletes the AI data or school of an account that never reached `granted`"). If the owner prefers withdrawal to touch purchases only, remove the `deleteAiData` calls in `builtin.ts` and the copy.
- **`policyVersion` bumped** to 2026-11-12 because the notice's purpose changed.
- **`notifications`, `merge_guest`, `test_attempts`** are ungated (the latter two already were).
- **Footer "Plans" link unchanged**: `AppFooter` is a server component and cannot know the billing state without a fetch. `/me`'s plan card says "Paid plans (coming soon)" while billing is off (it already has `billingEnabled` from `/v1/me/subscription`).
- The route-policy snapshot now shows declared-but-ungated features as `consent=<feature>(open)` (15 lines changed; `physical_rewards` stays gated).
- ADR index (`docs/platform/adr/README.md`) not updated (not an owned path): the Lead adds the ADR-030 row.

## How to verify

Run on Windows 11, Node 24, in the worktree (heavy jobs one at a time). Read the vitest summaries, not only the exit code: `npm test -w <pkg>` exited 0 on a run that had failures.

| Command | Result |
|---|---|
| `cd platform && npm run typecheck` | pass (all workspaces, 0 errors) |
| `cd platform && npm test -w @soyl/shared` | 20 files, **218 passed** |
| `cd platform && npm test -w @soyl/api` | full run: 46 files, 718 passed, 1 skipped, 1 failed — the failure was `ai-uploads.test.ts` still asserting 403 for an unconsented upload, fixed afterwards; `ai-uploads` + `ai-credits` re-run alone: **23 passed** |
| `cd platform && npm test -w @soyl/worker` | 12 files, **71 passed** (after updating `coins-jobs`, `leagues-job`, `worker`, `prod-auth` for D-052) |
| `cd platform/api && npx vitest run test/route-policy.test.ts` | 9 passed; snapshot updated only for the consent column (15 lines: `consent=<feature>(open)` for ai, uploads, leaderboards, profile_school_city, merge_guest, test_attempts) |
| `npm run lint` (root) | pass (0 problems) |
| `npm run test:platform-web` | 23 files, **470 passed** |
| `npm run test:platform-ui` | 6 files, 645 passed, **1 failed: `visual-v2.test.tsx > … > table` ("script-like aria-label on <div>") — pre-existing: fails identically on `main` 54643166 with this branch's changes stashed**; not touched here |
| `npm run build` | pass (compiled, 52/52 static pages) |
| `npm run openapi -w @soyl/api && npm run generate:api-client -w @soyl/shared` | regenerated (new `Credits.billingEnabled`; text changes) |

Not run: Playwright e2e (`npm run test:platform-web -w @soyl/e2e`) and the marketing regression — too heavy to run next to the other agent's API tests on this machine. The e2e specs were updated to the new behaviour but have not been executed; run them before merging. No marketing file changed (only `app/(platform)/**`, `components/platform/**`, `platform/**`, docs).

Behaviour covered by the API integration tests (no separate manual run): a student who never consented — `POST /v1/ai/quick-doubt` streams and charges 1 credit; `GET /v1/leagues/current` 200 with public names; `PATCH /v1/me {school}` 200; with `BILLING_ENABLED=true`, `POST /v1/billing/orders` → 403 `consent_required` (covered by `billing-gates.test.ts`).

## Tests added / changed

- `platform/shared/config/consent.test.ts` (new): map covers every feature; only purchases + physical rewards gated; every other feature allowed in every state; flipping one value re-gates.
- API (embedded Postgres): `ai-gateway` (a `required`/`pending`/`revoked` student runs an AI action and is charged), `ai-uploads` (upload without consent), `ai-bonuses` (never-consented student earns and sees goal + streak bonuses), `coins` (live-rank and league coins without consent), `leagues` (open without consent; revoked still named; formation places never-consented and no-row students), `live` (leaderboard open and named without consent; `requiresConsent: false`, `canView: true`), `me` + `schools` + `dashboard` (school saved and shown without consent), `consent` (purchases gated, `ai` open even with the provider down), `consent-builtin` (gates; never-consented AI data and school are never deleted; withdrawal leaves AI on; new email copy), `prod-auth` (purchases gated, AI/leaderboard open; `gatedFeatures` = purchases + physical_rewards), `billing-gates` (unchanged assertions: checkout → 403 `consent_required` without consent, billing enabled), `ai-credits` (`billingEnabled`), route-policy snapshot.
- Worker: `prod-auth` (AUTH-15 purge off by default with every provider; `on` forces it), `worker` (the started worker registers every job but `account.purge-unconsented`), `coins-jobs` (live-rank coins for every ranked student), `leagues-job` (a revoked student keeps playing).
- Web (vitest): `m34-components` (AskClient and LeaderboardClient without consent; /plans billing-off copy and approval link; paywall/plan/quote dialogs with billing off and on), `dashboard` (`ai`/`leagues` props; a never-consented member gets the credits tile and the league; SchoolSetting editor without consent).
- e2e specs adjusted (not run, see above): `consent.spec.ts` (rewritten: AI and leaderboards without approval; approval asked for from `/plans`; withdrawal leaves AI/leaderboards on), `ai.spec.ts`, `dashboard.spec.ts`, `tests.spec.ts`, `avatars-assets.spec.ts`.

## Known gaps / follow-ups

- DECISIONS.md D-052 row, STATUS.md and the ADR index are the Lead's.
- Revisit before the DPDP Rules' consent obligations apply (~2027, OA-14): flipping values in `CONSENT_REQUIRED` re-gates features; data already collected from unconsented minors would need a decision.
- AI spend now scales with all active students (not just consented ones); the daily spend breaker is the control.

## Decisions made

- [ADR-030](../adr/030-consent-only-for-purchases.md).

## Needs from owner

- Confirm the two choices above (withdrawal still deletes AI data; physical rewards stay gated).
- OA-14 (counsel) remains open; ADR-030 records the residual DPDP risk.
