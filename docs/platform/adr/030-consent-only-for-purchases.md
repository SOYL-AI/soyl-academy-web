# ADR-030: Consent only for purchases

Status: accepted (backend-api + web-platform, 2026-11-12)
Related: D-052 (owner decision, recorded by the Lead), D-014 (children's-data defaults, now superseded for feature gating), D-037/D-038 (SOYL Coins, physical merch off), D-039 (data minimisation + interim built-in consent), D-043 (school on the profile), D-044 (credits and learning bonuses), ADR-022 (built-in consent provider), ADR-016 (billing), OA-14 (legal view), AUTH-15 (unconsented-account purge), API-11 (consent gate).

Numbering: 028 and 029 are taken on other branches, so this takes 030.

## Context

Since D-014 (2026-10-25) every account whose consent status was not `granted` had AI features, photo uploads, leaderboards, leagues, live-mock ranks, coin rewards for ranks and leagues, AI learning bonuses and the school on the profile switched off. D-039/ADR-022 added the interim built-in provider (18+ self-declaration, or a parent's one-time code) so students could switch those on.

On 2026-11-12 the owner decided (D-052): "the consent step is necessary only when the student decides to move to a paid plan"; "for the leaderboard no need parent approval". Paid plans stay "coming soon" (`BILLING_ENABLED=false` in production). Production runs `CONSENT_PROVIDER=builtin`.

The gate was spread over two mechanisms:

1. route policies, `policies.member({ consent: '<feature>' })`, checked by `ConsentService.assertAllowed` against `CONSENT.gatedFeatures`;
2. about a dozen cached `consent_status === 'granted'` checks in domain code that run without a request (league placement, leaderboard names, live-rank and league coin awards, AI bonuses, the school on `/v1/me` and the dashboard), plus the purchase check inside `BillingService`.

## Options

1. **Delete the consent checks** for everything except billing. Smallest diff, but re-gating a feature later (for example when the DPDP Rules apply, or counsel answers OA-14) would mean finding and rewriting every check again.
2. **Switch the provider to "everyone granted".** Wrong: purchases must still need a real approval, and a fake `granted` would be recorded as consent.
3. **One per-feature config map, every check through it** (chosen). `CONSENT_REQUIRED: Record<ConsentFeature, boolean>` in `platform/shared/config/consent.ts` with pure helpers `consentRequiredFor(feature)` and `consentAllows(status, feature)`. `CONSENT.gatedFeatures` (security.ts) is derived from it, so the route policies keep working unchanged; every cached check calls `consentAllows` (or skips the database read when the feature is not gated); the web uses the same helper. Flipping one value re-gates a feature everywhere.

## Decision

Option 3.

- `CONSENT_FEATURES` gains `purchases`. `CONSENT_REQUIRED`: `purchases: true`, `physical_rewards: true`, everything else `false` (`ai`, `uploads`, `leaderboards`, `rank_cards`, `profile_school_city`, `notifications`, `merge_guest`, `test_attempts`).
- **Purchases.** `BillingService.assertCanPurchase` checks `consent.isGated('purchases')` and `consent.allows(status, 'purchases')` after `billing_disabled` (so production with billing off still answers `billing_disabled` first). Subscriptions and one-time orders both go through it. The billing route policies stay `consent: false` (the check lives in the service so the error order is unchanged).
- **Physical rewards stay gated.** Redeeming merch collects a child's name, phone and home address (D-037), so it keeps needing consent; it is off in production anyway (D-038, `COINS_PHYSICAL_REDEMPTION_ENABLED`). The address route keeps `consent: 'physical_rewards'`, and staff approval re-checks it.
- **Open without consent:** AI actions (quick doubt, hard doubt, explain slide, tutor, evaluation, paper from upload), photo uploads, weekly leagues (placement, standings, names), live-mock leaderboards and ranks, live-rank and league coin awards, AI learning bonuses (D-044), the school on the profile and the dashboard, school search. Leaderboards keep the auto-generated public names (D-039); no personal field is added.
- **Data on withdrawal.** Leaving `granted` (student withdraws, parent's link, adult re-declares as a minor) still deletes the AI conversations and uploads and clears school and city, as before. A withdrawal is the clearest "stop" signal a parent or student gives, and the copy says so ("as a privacy step"). The student can use AI again afterwards. Only a transition **out of `granted`** deletes anything: an account that never consented, or whose pending request is declined, keeps its AI data and school (tested in `consent-builtin.test.ts`).
- **AUTH-15 purge.** `UNCONSENTED_PURGE=auto` is now off with every consent provider (it was already off for `builtin` and `unavailable`); only `UNCONSENTED_PURGE=on` registers `account.purge-unconsented`. "Never consented" is the normal state of a student who does not buy.
- **Notice version.** The parent email and the 18+ agreement now describe approval as being for paid plans (and merch delivery), so `BUILTIN_CONSENT.policyVersion` moves to `2026-11-12`. Earlier approvals keep their recorded version.
- **API shape.** `GET /v1/credits` gains `billingEnabled` so the web can say "paid plans are coming soon" instead of suggesting a purchase without another request. `ranks.requiresConsent` on `GET /v1/live-events/:id` now reports the config (`false`). No other response shape changes.
- **Web.** Consent notices for AI, leaderboards, leagues, school and the dashboard tiles follow `consentAllows`, so they no longer appear. The consent page (now "Parent approval for paid plans") stays reachable from `/plans` and `/me`. With billing off, `/plans` says "Paid plans are coming soon" (with the free-credits sentence) and offers the approval link to members who have not approved; plan buttons stay "Coming soon". The paywall, quote and credit-guide dialogs say free credits refill at 00:00 IST and paid plans are coming soon, with no "See plans" button, while `billingEnabled` is false or unknown. The footer "Plans" link is unchanged: it is server-rendered and cannot know the billing state without a fetch.

## Consequences

- One config value re-gates a feature: the route policy (via `CONSENT.gatedFeatures`), the cached checks and the web all follow `CONSENT_REQUIRED`. The route-policy snapshot now marks declared but ungated features as `consent=<feature>(open)`.
- Every student gets AI with free credits, leaderboards, leagues, ranks, coin rewards and bonuses from sign-up. AI spend rises with the number of active students; the global spend breaker (`AI_DAILY_SPEND_CAP_INR`) and per-user rate limits are unchanged and remain the controls.
- The consent flow, its routes, tables, the withdraw link and the age-band step stay; they are now used only before buying.
- Production `CONSENT_PROVIDER=builtin` needs no new setting. `UNCONSENTED_PURGE` can stay `auto`.

## Residual risk

- **DPDP Act 2023, s.9.** Verifiable parental consent is tied to *processing a child's personal data*, not to payment. AI conversations, photo uploads and leaderboard participation are processing of a child's data, so opening them without consent is the owner's accepted business decision, not a legal reading. Mitigations that stay: data minimisation (D-039: email only, auto-generated public names, no third-party analytics), 30-day retention of AI conversations and uploads, moderation, no behavioural advertising, deletion on withdrawal and on account deletion.
- **Revisit before the DPDP Rules' consent obligations apply (~2027, OA-14).** If counsel says the platform must hold verifiable parental consent before processing, flip `ai`, `uploads`, `leaderboards`, `rank_cards` and `profile_school_city` back to `true` in `CONSENT_REQUIRED`; the gates, notices and the consent flow return without code changes. Data already collected from unconsented minors would then need a decision (delete, or ask for consent) — not automated today.
- A withdrawal deletes AI data that a never-consented student would keep. This asymmetry is deliberate (privacy-protective on an explicit "stop"), and documented in the copy.
