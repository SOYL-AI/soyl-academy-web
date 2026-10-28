# backend-api + web-platform — SOYL Coins (D-037, D-038, D-039) — 2026-10-28

Status: done (launch scope per D-038: earning, balance and history live; store is "Exclusive rewards — coming soon"; redemptions built and tested behind switches that are off)
Branch: `platform/backend-api/soyl-coins` · ADR: [ADR-021](../adr/021-soyl-coins.md) · Migration: `0011_coins`

## What changed

**Config** — `platform/shared/config/coins.ts` (+ `coins.test.ts`, 14 consistency tests): earn rules, the daily
cap, check-in streak bonuses, solved milestones, rank/league tiers, the store items (drafts), `COIN_STORE`
switches and retention. `security.ts`: consent feature `physical_rewards` (gated), rate-limit buckets
`coins.write.user` (30/h) and `coins.redeem.user` (10/h); `/coins` and `/store` in the platform prefix lists.

**Database** — migration `0011_coins` (+ hand-written down):
- `coin_wallets` — per-student lock row; check-in streak (current, longest, last IST day); equipped frame/theme.
- `coin_ledger` — append-only for `soyl_app` (added to `soyl_apply_conventions`); kinds earn/redeem/refund/adjust
  with sign checks; **unique idempotency key** per award; trigger `soyl_coin_ledger_guard` locks the wallet
  row, refuses a negative balance, requires refund = redeem, writes `balance_after`; one redeem and at most
  one refund per redemption.
- `coin_redemptions` — status requested → parent_approval_pending → approved → fulfilled / cancelled /
  refunded; AES-256-GCM encrypted address (HKDF subkey of `MFA_ENCRYPTION_KEY`, AAD = redemption id);
  `user_id` SET NULL at the purge.
- `PII.md` rows for all three tables; account deletion (step 1) erases addresses and tracking refs, cancels
  open merch with a refund and unequips; the purge cascades the ledger and wallet.

**API** (`platform/api/src/domain/coins/*`, `modules/coins.ts`, `modules/coins-schemas.ts`):

| Route | Policy | Notes |
|---|---|---|
| `GET /v1/coins` | member | balance, lifetime, today vs cap + IST reset, check-in streak + next bonus, milestones, chapters mastered, equipped |
| `GET /v1/coins/history` | member | ledger, newest first, cursor paging |
| `POST /v1/coins/check-in` | member, `coins.write.user` | once per IST day, idempotent under concurrency |
| `GET /v1/coins/daily-challenge?board&class` | public | per subject, deterministic, practice pool, objective types; defaults to profile |
| `GET /v1/coins/store` | public | `redemptionEnabled` false → no items |
| `POST /v1/coins/redeem` | member, `coins.redeem.user` | 403 `redemption_disabled` at launch |
| `GET /v1/coins/redemptions` | member | own |
| `PUT /v1/coins/redemptions/:id/address` | member, consent `physical_rewards` | only after verification + consent + flags |
| `POST /v1/coins/redemptions/:id/cancel` | member | before approval; exact refund |
| `PUT /v1/coins/equipped` | member | owned digital items only; off at launch |
| `GET /v1/admin/coins/redemptions` | staff + MFA | address decrypted only under review/approved; audit-logged |
| `POST /v1/admin/coins/redemptions/:id/{approve,fulfil,reject}` | staff + MFA + fresh | consent re-checked on approve; audit-logged |

Award hooks (same transaction as the event): practice answer (`submitAnswer` → daily challenge, solved
milestones, chapter mastery), test grading (`finalizeAttempt` → series test, perfect paper, live
participation), league close (`closeLeague` → promotion, top finish; consent-gated). Practice-answer and
test-submit responses carry `coinsAwarded` and `coinAwards`. New problem codes: `coins_insufficient`,
`item_unavailable`, `out_of_stock`, `redemption_limit`, `not_eligible`, `verification_required`,
`redemption_disabled`. Env: `COINS_REDEMPTION_ENABLED`, `COINS_PHYSICAL_REDEMPTION_ENABLED` (both default off).

**Worker** — `coins.live-rank-awards` (every 15 min; rank tiers after results publish, consent `granted`
only, events with ≥ `liveRankMinParticipants`, 30-day window so late consent still counts) and
`coins.housekeeping` (daily 02:45 IST; erase shipped addresses after 30 days; cancel + refund merch requests
with no address after 14 days).

**Web** (web-platform sub-agent; see its section below): coins chip beside the credits chip, check-in with
streak, daily-challenge card on the hub, `/coins` (balance, today vs cap, how to earn from config,
milestones, history), `/store` "Exclusive rewards — coming soon", coin-award notes on practice/test results.

## Config for the owner to tune (`platform/shared/config/coins.ts`)

### Earning

| Rule | Coins | Daily cap applies | Notes |
|---|---|---|---|
| Daily check-in (explicit button, once per IST day) | 1 | yes | signing in alone earns nothing |
| Check-in streak bonus | +5 every 7 days, +25 every 30 days | no | consecutive IST days, no freezes |
| Daily challenge (one question per board × class × subject per IST day) | 5 | yes | at most 1 award per day across subjects |
| Solved milestones (distinct first-correct practice answers in the app) | 20 at 50, 60 at 200, 150 at 500, 300 at 1000 | no | guest-merged answers never count |
| Chapter mastered (≥ 20 questions tried, ≥ 80% first-try accuracy) | 10 | yes | once per chapter |
| Series test, first graded submission, ≥ 50% answered | 5 | yes | once per test; custom tests never |
| Perfect paper (≥ 10 auto marks, all right) | 10 | yes | once per test; not custom |
| Live All-India mock participation (≥ 50% answered) | 15 | yes | once per event |
| Live mock rank (consent `granted`, ≥ 200 ranked) | 500 for 1st, 250 for top 10, 100 for top 100 | no | best tier only |
| Weekly league promotion (consent `granted`, XP > 0) | 10 | no | once per league |
| Weekly league top finish | 30 for 1st, 15 for top 3 | no | in addition to promotion |
| **Daily cap** on capped sources | **40** | — | past the cap an award is cut (0 still recorded) |

### Store (all drafts, `active: false`, per D-038)

| Key | Type | Price | Stock / window | Eligibility | Per student |
|---|---|---|---|---|---|
| `frame-saffron` | digital frame | 60 | — | — | 1 |
| `frame-constellation` | digital frame | 150 | — | solved 200 | 1 |
| `theme-midnight` | digital theme | 100 | — | — | 1 |
| `theme-streak-flame` | digital theme | 120 | — | 30-day check-in streak | 1 |
| `sticker-pack` | physical | 600 | — | — | 2 |
| `notebook` | physical | 1,200 | — | — | 2 |
| `bottle` | physical | 2,500 | — | — | 1 |
| `tee` | physical | 4,000 | — | — | 1 |
| `hoodie` | physical | 7,500 | — | — | 1 |
| `topper-jacket-2027` | physical, limited drop | 3,000 | 100 units, 1 Jan – 31 Mar 2027 IST | top 100 in a live mock | 1 |

A steady learner earns ~10–20 coins a day, so stickers take 1–2 months and the hoodie most of a school year.

To launch rewards: design the items (art keys in `image`), set prices and `active: true`, then set
`COINS_REDEMPTION_ENABLED=true` (digital). Merch additionally needs `COINS_PHYSICAL_REDEMPTION_ENABLED=true`,
the consent provider able to return `granted` (D-039 interim provider or OA-08), and the vendor (OA-19).

## How to verify

From `platform/`:
```
npm run typecheck
npm test -w @soyl/shared        # coins config + client drift
npm test -w @soyl/db            # 0011 up/down on fresh and seeded DBs; coin ledger guard/append-only/purge
npm test -w @soyl/api           # test/coins.test.ts (23) + route-policy snapshot
npm test -w @soyl/worker        # test/coins-jobs.test.ts
```
Root: `npm run lint`, `npm run build`, `npm run test:platform-web`, `npm run test:platform-ui`; e2e
`platform/e2e/tests/platform/web/coins.spec.ts`; marketing regression `--skip-lighthouse`.

GATE_RESULTS_PLACEHOLDER

## Tests added

- `platform/shared/config/coins.test.ts` — config consistency, exclusivity maths, D-038 drafts/switch, helpers.
- `platform/db/test/coins.test.ts` — guard (negative balance, refund = redeem, duplicate keys), checks, append-only for `soyl_app`, purge.
- `platform/api/test/coins.test.ts` — check-in (5 concurrent → one award; IST midnight 18:29:59 vs 18:30:00 UTC; missed day; 7-day bonus), daily challenge (deterministic, practice pool only, once a day), milestones (guest-merged never count; once), chapter mastery (first-try only), tests (series once, retake 0, custom 0, empty paper 0), daily cap (cut, 0 recorded, reset at IST midnight), D-038 refusals, digital redeem/limit/equip/history paging, no double spend (two items concurrently; five tabs; DB guard), physical gating order (verification → consent → flag; production `unavailable` refuses), merch flow with staff MFA + audit + consent re-check, cancel/reject refunds, address timeout, address retention, account deletion cascade, live-rank awards (consent, min participants, late consent), league awards.
- `platform/worker/test/coins-jobs.test.ts` and `jobs.test.ts` entries.
- Route-policy snapshot (+14 routes); OpenAPI and `platform/shared/api-client` regenerated.

## Known gaps / follow-ups

- Per-order parent approval through the consent system does not exist yet; `parent_approval_pending` is closed by staff review with a strict consent re-check (ADR-021 §5). Replace with the consent provider's call when OA-08 (or the interim provider) offers one.
- Address key is an HKDF subkey of `MFA_ENCRYPTION_KEY`; a dedicated Key Vault secret can replace it with a re-encryption job if security review asks.
- Daily challenge picks from objective practice items only; subjects with no objective practice items have no challenge.
- No staff UI for the merch queue (API only); not needed while redemptions are off.
- `consent-interim` also numbered its migration 0011: whoever merges second renumbers (and regenerates the drizzle snapshot).

## Decisions made

ADR-021 (this work). Problem codes and route policies as above.

## Needs from owner

- Tune the earn table and cap if wanted; design the rewards (D-038, OA-19 narrowed to merch design); confirm GST/TDS treatment of free merch with the accountant before merch launch.
