# ADR-021: SOYL Coins — earn-only ledger, daily check-in and challenge, store and merch redemption

- Status: accepted (backend-api + web-platform, 2026-10-28)
- Related: D-037 (owner decision), D-014 (consent gates), D-015 (farming controls), D-031 (production consent
  provider `unavailable`); OA-08 (consent contract), OA-19 (merch vendor and budget); CONTEXT §5, §11, §12;
  ARCHITECTURE §4, §6, §9, §12; ADR-012 (test engine), ADR-013 (credit ledger pattern), ADR-011 (platform
  proxy/CSP), ADR-001 (allowed paths); PII.md.

## Context

The owner wants coins that work "the way LeetCode merch works": exclusivity, earned by solving enough
questions, daily check-in, streaks (D-037). Coins cannot be bought, transferred or converted to cash or AI
credits. The accounts are children's: rewards must not become a grind or a gambling loop, and a physical
prize means collecting a child's home address, which CONTEXT §12 and D-014 only allow after parental
consent. Production runs `CONSENT_PROVIDER=unavailable` (D-031) and there is no merch vendor yet (OA-19).

## Decision

1. **Config, not code** (`platform/shared/config/coins.ts`, tested by `coins.test.ts` for internal
   consistency): earn amounts, streak bonuses, solved-question milestones, rank and league tiers, the daily
   cap, the store items (key, name, description, image placeholder, digital/physical, price, stock,
   limited-drop window, eligibility rule, per-student limit, active) and `COIN_STORE`.
2. **Earning sources and anti-grinding.** Daily check-in is an explicit action (signing in earns nothing:
   bots sign in), once per IST day, with 7- and 30-day streak bonuses (no freezes). A daily challenge per
   board × class × subject per IST day, chosen deterministically (`md5(key || ':' || istDay)`) from the
   published practice pool, auto-gradable types only, never test or live-reserved items (F-006); at most
   `dailyChallengeAwardsPerDay` per day. Solved milestones count **distinct first-correct practice answers
   given in the app** (guest-merged answers never count). Chapter mastery uses **first answers only** (a
   re-answered question cannot lift accuracy). Tests pay once per test key, only for series tests with
   `TEST_XP_RULES.testMinAnsweredShare` answered; custom tests pay nothing; perfect papers once per test;
   live mocks pay participation once per event. A per-IST-day cap (`COIN_DAILY_CAP`) covers the capped
   sources; milestones, streak bonuses, rank and league awards are uncapped (rare and one-off). An award
   past the cap is cut to what is left — possibly 0, still recorded so the event is not paid again later.
   No random rewards or loot boxes.
3. **Consent for comparative awards.** Live-mock rank coins (worker job `coins.live-rank-awards`, after
   results are published, only for events with `liveRankMinParticipants`) and league promotion/top-finish
   coins (in the league-close transaction) are paid only to students whose consent is `granted`. A student
   whose consent arrives within `liveRankAwardWindowDays` is paid on a later run.
4. **Ledger like credits (ADR-013), enforced by the database** (migration 0011):
   `coin_ledger` is append-only for `soyl_app` (added to `soyl_apply_conventions`); kinds
   earn/redeem/refund/adjust with sign checks; a **unique natural idempotency key per award**
   (`checkin:<user>:<istDay>`, `milestone:<user>:solved_200`, `test:<user>:<testKey>`, `live_rank:<user>:<event>`…);
   trigger `soyl_coin_ledger_guard` locks the student's `coin_wallets` row, sums the ledger and **refuses
   any row that would make the balance negative**, writing `balance_after`; one redeem and at most one
   refund per redemption, and a refund must return exactly what its redeem took. The API also locks the
   wallet row before every write, so one student's awards, check-ins and redemptions serialise (exact cap
   and balance checks) while different students never contend. Awards ride in the transaction of the event
   that earned them (practice answer, test grading, league close).
5. **Store and redemption.** Digital items are granted at once (a `fulfilled` redemption plus its `redeem`
   row) and can be equipped. Physical merch requires, in order: (a) a verified email or phone
   (`verification_required`), (b) consent `granted` from the consent provider, strict and fail-closed
   (`consent_required` / `consent_unavailable`; new consent feature `physical_rewards`), (c)
   `COINS_PHYSICAL_REDEMPTION_ENABLED` (default `false` until OA-19; `redemption_disabled`). Only then is the
   address accepted (`PUT /v1/coins/redemptions/:id/address`, gates re-checked). States:
   `requested → parent_approval_pending → approved → fulfilled`, or `cancelled` (student, address timeout,
   account deletion) / `refunded` (staff rejection); coins are taken on request and returned exactly on
   cancel/reject. Stock is enforced under a per-item advisory lock; lock order is always wallet → item.
   **Parent approval:** the consent system's per-order approval call does not exist yet (OA-08), so
   `parent_approval_pending` is closed by a staff review that re-checks the student's consent as `granted`
   (strict) at approval time; when OA-08 provides a per-order approval, the adapter replaces that step.
6. **Address minimisation (PII.md).** The address (recipient, two lines, city, state, PIN, courier phone)
   is AES-256-GCM encrypted with a key derived by HKDF-SHA256 from `MFA_ENCRYPTION_KEY` with the info string
   `soyl/coins-address/v1` (purpose-bound subkey; no new secret to provision), the redemption id as
   associated data. It is decrypted only for staff, only for redemptions under review or approved, and each
   view is audit-logged. It is erased on cancel/refund, on account deletion (step 1), and
   `addressRetentionDaysAfterFulfilment` days after shipping (`coins.housekeeping`). Redemptions are detached
   (`user_id` SET NULL) at the purge so stock counts survive without personal data; the ledger cascades.
7. **Staff endpoints** use the existing staff roles + TOTP-verified session (`mfa: true`); writes also need
   a fresh session (AUTH-9 "admin writes"). Every transition is audit-logged (ids and statuses only).
8. **Web.** `/coins` and `/store` are new platform routes, so the platform prefix lists
   (`platform-routes.ts`, `proxy.ts` matcher, `RETURN_TO_PREFIXES`, the marketing regression's route
   inventory) gain `/coins` and `/store`. Neither path exists on the marketing site, so marketing pages are
   unaffected (proven by the marketing regression). Both pages 404 when the platform flag is off.

## Options considered

- **Balance column on the wallet updated by the app** — simpler reads, but the app could write any value;
  rejected in favour of the ledger sum checked by a trigger (same reasoning as ADR-013).
- **Award coins for logging in** — trivially farmed by bots and multi-accounts; rejected for an explicit check-in.
- **Separate address key in Key Vault** — cleaner separation but a new secret for infra to provision before
  a feature that is switched off; the HKDF subkey is cryptographically independent of the TOTP key. A
  dedicated key can replace it with a re-encryption job if security review asks.
- **Collect the address at request time and approve afterwards** — would collect a child's address before
  the parent approved; rejected (D-037).

## Consequences

- Earning, check-in, the daily challenge, balance/history and digital redemptions work everywhere,
  including production with consent `unavailable`. Physical redemption is refused in production
  (`consent_required`) and shows "Coming soon" while the flag is off.
- The owner tunes every number in `coins.ts` (handoff table). Changing a store price affects new
  redemptions only (the price is copied onto the redemption).
- New problem codes: `coins_insufficient`, `item_unavailable`, `out_of_stock`, `redemption_limit`,
  `not_eligible`, `verification_required`, `redemption_disabled`.
- Follow-ups: per-order parent approval via the consent system (OA-08); vendor integration and artwork
  (OA-19); GST/TDS treatment of free merch (OA-19, accountant).
