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

**Web** (web-platform sub-agent; commits c90fc87, 295fddb, 53d272b), `app/(platform)/{coins,store}`,
`components/platform/coins/*`:
- `CoinChip` beside the credits chip in `PlatformHeader` (balance; dot while today's check-in is open), fed by
  `CoinsProvider` in the platform layout (one `GET /v1/coins` per page load for members).
- `CheckIn` (streak, best, next bonus; polite live region announcing what it paid; disabled once done).
- `DailyChallengeCard` on `/learn` and `/learn/[board]/[class]`; "Solve" lazy-loads `ChallengeSolver`, which reuses
  the practice `QuestionCard` and `usePracticeAnswer` (answers go through `POST /v1/practice/answers`).
- `/coins`: balance, today vs cap with the IST reset countdown, check-in, milestones, how to earn (`howToEarn()`),
  paged history.
- `/store`: "Exclusive rewards — coming soon" whenever `redemptionEnabled` is false (teasers, balance, how to earn;
  no items, prices, redeem, equip or address). The full store (12 item states, drop countdown, stock, redeem
  dialog, equip, `AddressForm` only after a `requested` redemption exists, own redemptions with cancel) renders
  only when the API reports `redemptionEnabled: true`.
- Coin-award announcements on practice answers and test submits; friendly copy for every coins problem code.
- `/coins` and `/store` added to `platform-routes.ts`, the `proxy.ts` matcher, `RETURN_TO_PREFIXES`,
  `NONCE_ROUTE_PREFIXES` (nonce CSP) and the marketing regression's route inventory (ADR-021 §8).

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

### Gate results (2026-10-28, Windows 11; the machine was under heavy memory pressure from other agents, so suites ran with fewer workers)

| Gate | Result |
|---|---|
| `npm run typecheck` (platform) | exit 0, every workspace |
| `npm test -w @soyl/shared` | 8 files, 95 passed (incl. client drift and coins config) |
| `npm test -w @soyl/db` | 16 files, 119 passed, 1 skipped (0011 up/down fresh + seeded; `coins.test.ts`) |
| `npm test -w @soyl/api` | 35 files: 27 passed in the full run (`--maxWorkers=2`; 480 tests), the 8 files that crashed with out-of-memory (ai-credits, ai-evaluation, ai-gateway, content, phone-otp, progress, billing-ops, reports-mfa) re-run with `--maxWorkers=1`: all passed (74 + 13 tests). `coins.test.ts` 23/23 |
| `npm test -w @soyl/worker` | 12 files, 68 passed |
| root `npm run lint` | exit 0 (web-platform, on 53d272b) |
| root `npm run build` | compiled, 44/44 static pages (web-platform) |
| `npm run test:platform-web` | 12 files, 221 passed (`--maxWorkers=1`) |
| `npm run test:platform-ui` | 6 files, 548 passed (`--maxWorkers=1`) |
| e2e flag on: `coins.spec.ts` + JS budget | 4 passed: check-in; daily challenge +5 once; store coming soon + API 403 `redemption_disabled`; budget (/coins 173.5 KB, /store 179.1 KB gz first load) |
| e2e flag off | 37 passed (includes /coins, /store and the coins API paths 404) |
| marketing regression `--skip-lighthouse` | 48 passed, "no visual diffs, all routes as expected" on the web commits before the D-038 store change (web-platform; marketing CSS byte-identical). Re-run on the final commit: **not completed** — `next build` died twice with system out-of-memory (exit 134). The D-038 change touches only `/store` and `/coins` platform files. Needs one re-run on a machine with free memory. |

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
- Web: the consent-needed state (only shown when redemption is on) links to `/me`; switch it to `/me/consent?next=` when the D-039 interim provider (ADR-022) lands. The daily-challenge solver infers Hindi from the subject id (the API sends no language). With both credits and coins chips the header is close to 360 px; the AI e2e (chips + consent) was not re-run.
- A stray process from an earlier e2e run (pid 30112 on :3320) could not be stopped by the agents (taskkill denied); the e2e above ran on alternate ports (`PW_*_PORT`).
- `consent-interim` also numbered its migration 0011: whoever merges second renumbers (and regenerates the drizzle snapshot).

## Decisions made

ADR-021 (this work). Problem codes and route policies as above.

## Needs from owner

- Tune the earn table and cap if wanted; design the rewards (D-038, OA-19 narrowed to merch design); confirm GST/TDS treatment of free merch with the accountant before merch launch.
