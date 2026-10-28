# ai-gateway (+ backend-api, db-schema) — D-044 credits and student avatars — 2026-10-28

Status: done. Merged origin/platform/main twice: the super-admin merge (877f5bd) took migration 0014, so this migration is now **0015_avatars_credit_bonus** (regenerated, same SQL); the GPT-6 reasoning-effort hotfix (da47d79) merged cleanly (D-044 prices kept, no 'minimal'). Final gates ran on 09214aa (Playwright e2e expectations updated but the e2e suite was not run here; see "How to verify")
Branch: `platform/ai-gateway/credits-avatars` from `origin/platform/main` a199175. Contract commit **`fbd478e`** (config, schemas, routes, migration, `openapi.json`, `api-client`, route-policy snapshot) plus `7d44242` (api-client type aliases): the web can merge those two alone. Tests, docs and this note follow.

## What changed

### Credits (D-044), config only

| Value | Before | Now | Where |
|---|---|---|---|
| Free / Plus / Pro / Board Exam Pass credits a day | 25 / 40 / 60 / 60 | **50 / 100 / 150 / 150** | `platform/shared/config/plans.ts` |
| Hard doubt | 6 | **7** | `platform/shared/config/ai-actions.ts` |
| AI marking, one answer / full paper | 6 per answer, cap 40 | **7 per answer, cap 50** | same |
| Photo doubt | 10 | **12** | same |
| Paper-from-upload | 60 | **80**, Pro and Board Exam Pass only | same |
| Quick doubt, explain this slide | 1 | 1 | same |
| `estCostPaise` (measured, D-040) | 53 / 56 / 89 / 610 | 67 / 72 / 115 / 768 | same |
| `AI_SPEND.dailyCapInrDefault` | 2,000 | **3,000** (free tier ≤ 60 % = 1,800) | `platform/shared/config/credits.ts` |

- **Paper-from-upload gate by feature, not credits (D-034).** Plus now has 100 credits, enough for 80, so the old "credits fit" argument no longer keeps it Pro-only. New `AiActionConfig.requiredFeature` (`'paper_from_upload'`), `actionAllowedOnPlan(action, plan)` and `plansWithFeature(feature)`; the gateway (`Preflight.assertPlan`), `GET /v1/credits` prices and `GET /v1/ai/quote` use it. Config test: an action's `plans` must equal the plans with its feature, and a plan listed on the action but lacking the feature is refused. The `plan_required` detail now names the right plans ("… part of the Pro and Board Exam Pass plans.").
- **Owner flag:** AI marking (`evaluate-answer`, `evaluate-paper`) is still priced slightly below measured cost (₹0.72 per answer vs 7 credits = ₹0.70), as CONTEXT §6 says; a config test pins this flag. Paper-from-upload is now above cost (₹7.68 vs ₹8.00).
- Every test that hard-coded 25/40/60 or 6/10/40/60 now expects the D-044 values (no test removed or weakened): API `ai-credits`, `ai-evaluation`, `ai-gateway`, `ai-spend`, `ai-uploads`, `ai-unit`, `billing-gates`, `billing-ops`, `billing-orders`; shared `plans`, `ai-actions`; e2e `ai.spec`, `plans.spec`, `consent.spec`. Where the old arithmetic no longer proved the point it was adapted, not dropped: e.g. "N parallel reserves never overspend" is now 20 × 12 on 50 → exactly 4 succeed; the free-student full-paper paywall now spends credits first (a full free day can now pay for one paper); the e2e paywall now spends the last 28 credits with four step-by-step doubts.
- The `POST /v1/attempts/:id/ai-evaluation` OpenAPI summary reads the price from config.

### Bonus credits for learning (D-044)

- Config: `platform/shared/config/credit-bonuses.ts` (`CREDIT_BONUSES.dailyGoal` +10, `streakMilestone` +5 every 7 days, `CREDIT_HISTORY` 14/31 days) and `DAILY_PRACTICE_GOAL` (10 questions solved in an IST day) in `learning.ts`.
- Ledger: new kinds `bonus_goal` (action `daily_practice_goal`, metadata `{solved, target}`) and `bonus_streak` (action `streak_milestone`, metadata `{streakDays}`). Migration 0015: kind/amount checks widened (bonus > 0) and partial unique index `credit_ledger_one_bonus_per_day (user_id, ist_day, kind)`. A bonus counts towards its IST day only, so it lapses at 00:00 IST like the daily grant (no rollover, no job).
- Logic: `platform/api/src/ai/bonuses.ts`.
  - Daily goal: checked after a solving practice answer (`submitAnswer`, after its transaction commits) and after a full self-mark (`selfAssess`), so concurrent answers each count every committed solve; the insert is idempotent through the unique index. Cheap exits first (already granted today → consent). "Solved" is D-042; a question counts once, on the IST day of its first solve; the day's solving answer must be an app answer (guest-merged answers carry device timestamps and never earn credits).
  - Streak milestone: inside `recordActivity` (all callers: practice, lesson completion, test submit, worker auto-submit), when a new streak day is recorded and the streak is 7, 14, 21, … — under the streak row lock.
  - Consent: only `consent_status.status = 'granted'` (cached, as for coin rewards). Others earn nothing; the guide shows `bonuses: null`.
  - Coins and purchases never grant credits (D-037): nothing in coins or billing writes bonus rows.
- Balance: `GET /v1/credits` gains `bonusToday` (included in `balance`). Ledger entries have labels "Daily practice goal bonus" / "Streak milestone bonus".

### Credit guide and history

- `GET /v1/me/credits/guide` (`CreditGuide`), `GET /v1/me/credits/history?days=1..31` (default 14, `CreditHistory`): members, rate limit `credits.read.user` 60/min, `no-store`. Pure config + today's balance + two small reads.

### Avatars

- Config `platform/shared/config/avatars.ts`: `AVATARS` (64, ids = lower-case `PUBLIC_NAME_ANIMALS`), `AVATAR_BACKGROUNDS` (8), unlock rules, pure `unlockedAvatars(state)`, `avatarProgress(rule, state)`, `avatarUnlockLabel(rule)`, `defaultAvatar(userId, publicNameSeed)`, `effectiveAvatar(...)`. `public-names.ts` exports `publicNameAnimal(userId, seed)` and `fnv1a` (names unchanged).
- Migration 0015: `profiles.avatar_id`, `profiles.avatar_bg` (text, null), CHECKs against the config lists plus `(avatar_id IS NULL) = (avatar_bg IS NULL)`. Hand-written down (drops the columns; deletes bonus rows before restoring the old ledger checks — lossy for credit history).
- API (`platform/api/src/domain/avatars.ts`, `modules/avatar-schemas.ts`, `modules/me.ts`):
  - `GET /v1/me` → `avatar: { id, bg, isDefault }`.
  - `GET /v1/me/avatars` (`AvatarCatalog`, rate limit `avatars.read.user` 60/min): every avatar with rule, label, progress and lock state; I chose a separate endpoint so `/v1/me` stays cheap (unlocks need 2 aggregate reads).
  - `PATCH /v1/me { avatar: { id, bg } | null }`: locked → **403 `avatar_locked`** (extension member `avatar`); unknown id/bg → 400; null → default.
  - `POST /v1/me/public-name`: a picked avatar unlocked only as the old name's animal goes back to the default (so cycling names cannot collect animals).
  - Account deletion clears the avatar.
  - Public surfaces: `GET /v1/leagues/current` standings and `GET /v1/live-events/:id/leaderboard` entries gain `avatar: { id, bg } | null` (null exactly when `name` is null: no consent or deleted); `GET /v1/me/card` gains `avatar`. Still no user ids or real names (tests assert it).
- Docs: `platform/db/PII.md` (avatar is not personal data; cleared at deletion), `docs/platform/data-model.md` (0015, ledger kinds), `docs/platform/api-reference.md` (3 routes, 2 buckets, changed responses), `docs/platform/CONTEXT.md` §5/§7 and `docs/platform/README.md` (credit numbers that D-044 had not updated).

## For the web agent

Types: `@/platform/shared/api-client` exports `CreditGuide`, `CreditHistory`, `CreditBonusAward`, `CreditBonusKind`, `AvatarCatalog`, `AvatarRef`, `MyAvatar`, `AvatarChoice`, `AvatarUnlockRule`, `AvatarId`, `AvatarBackground`. Config the web may import (no runtime deps): `platform/shared/config/avatars.ts`, `credit-bonuses.ts`, `learning.ts` (`DAILY_PRACTICE_GOAL`).

**Credit guide** `GET /v1/me/credits/guide`:
```
{ plan, planName, dailyCredits, balance, bonusToday, creditValuePaise: 10, day, resetAt, resetInSeconds, plansUrl,
  plans: [{ id, name, creditsPerDay }],                      // display order
  actions: [{ action, label, guide, credits, perAnswer, maxCredits, mode: 'stream'|'job', requiresUpload,
              allowedForPlan, remainingToday,                // floor(balance / credits); 0 if the plan lacks it
              perDay: [{ plan, count }] }],                  // only plans that offer it
  bonuses: null | {                                          // null unless consent is granted
    dailyGoal: { credits: 10, target: 10, solvedToday, earnedToday },
    streakMilestone: { credits: 5, everyDays: 7, currentStreak, nextMilestone, earnedToday } } }
```
On Free with 50 credits: hard doubt `remainingToday: 7` ("≈ 7 hard doubts left today"), photo doubt 4, quick doubt 50; paper-from-upload `allowedForPlan: false`, `perDay: [{pro,1},{board_exam_pass,1}]`.

**History** `GET /v1/me/credits/history?days=14`: `{ timezone: 'Asia/Kolkata', from, to, days: [{ day, granted, bonus, spent, refunded, held, left }] }`, oldest first, every day present. `spent` = used by AI (refunds and unused per-answer credits excluded), `held` = reservations still open, `left` = the day's balance (lapsed at its reset; today: still usable).

**Bonus toasts:** `POST /v1/practice/answers` and `PATCH /v1/practice/answers/:id` responses carry `creditBonuses: [{ kind: 'bonus_goal'|'bonus_streak', credits, label }]` (empty for guests and without consent). Streak bonuses earned by finishing a lesson or a test are not echoed in those responses; `GET /v1/credits` (`bonusToday`) and the ledger show them.

**Avatars:**
- Ids (64, in this order): otter, falcon, panda, tiger, dolphin, eagle, koala, lynx, peacock, parrot, penguin, rabbit, robin, sparrow, squirrel, turtle, whale, zebra, badger, beaver, bison, camel, cheetah, crane, deer, elephant, finch, fox, gazelle, gecko, giraffe, heron, hornbill, ibex, jaguar, kingfisher, kiwi, lemur, leopard, lion, llama, macaw, mongoose, moose, myna, narwhal, owl, panther, pelican, puffin, quail, raven, rhino, seal, starling, swan, tapir, toucan, walrus, wombat, yak, bulbul, hoopoe, langur.
- Backgrounds (8): sky, mint, sunflower, coral, lavender, meadow, peach, ocean; token `p-avatar-<id>` (the design system defines these CSS custom properties; light and dark).
- Unlock rule shapes (`AvatarUnlockRule`): `{kind:'starter'}` · `{kind:'level', level}` · `{kind:'badge', badge}` (a `BADGES` key) · `{kind:'streak', days}` (longest streak) · `{kind:'league_tier', tier}` (1 = Bronze … 5 = Diamond, reached or higher) · `{kind:'live_mocks', count}` (live mocks with a submitted attempt). The catalog also gives `unlockLabel` ("Reach level 5", "Earn the Week warrior badge", "Keep a 14-day learning streak", "Play in the Gold league", "Take part in 3 live All-India mocks") and `progress: {current, target}`.
- Starters (16): otter, panda, dolphin, koala, penguin, rabbit, sparrow, squirrel, turtle, zebra, deer, elephant, fox, giraffe, kiwi, owl — plus the student's own public-name animal (`isPublicNameAnimal: true`). Levels: parrot/finch 2, camel/gecko 3, falcon/puffin 4, crane/heron 5, gazelle/lemur 6, llama/quail 7, moose/pelican 8, bison/seal 9, swan/tapir 10, whale/walrus 12, narwhal/wombat 15. Badges: myna first-lesson, beaver lessons-10, robin first-correct, macaw practice-50, rhino practice-250, bulbul streak-3, hoopoe streak-7, hornbill chapter-master, kingfisher first-test, raven tests-10, panther perfect-score, starling test-streak-3. Streak: badger 14, mongoose 21, lynx 30, ibex 50, yak 100. League: langur Bronze, leopard Silver, tiger Gold, jaguar Sapphire, peacock Diamond. Live mocks: toucan 1, eagle 3, cheetah 5, lion 10.
- Web copy still hard-codes the old free allowance (web code was out of scope here): `components/platform/ai/AskClient.tsx` lines 57 and 59 and `components/platform/ai/ExplainSlide.tsx` line 27 say "25 free AI credits every day". Read `creditsPerDay` from `/v1/plans` or `PLANS` instead.

## How to verify

From `platform/` (each heavy step through `C:/Users/Prabhu/soyl-wt/_tools/heavy.sh`):
```
npm run typecheck                                  # exit 0 (all workspaces, after both merges)
npm test -w @soyl/shared                           # 16 files, 180 passed
npm test -w @soyl/db                               # 17 files, 123 passed, 1 skipped (incl. avatars-bonus.test.ts: 0015 down/up seeded)
cd api && npx vitest run test/ai-bonuses.test.ts test/avatars.test.ts test/ai-credits.test.ts ...   # 24 files, 321 tests; first run 7 stale-number failures, fixed and re-run green
npm run build                                      # exit 0 (api 6.2 MB, worker 3.5 MB)
npm test -w @soyl/api                              # 42 files, 646 passed, 1 skipped
# repo root
npm run test:platform-web -- --maxWorkers=2        # 17 files, 298 passed
```
Playwright (`npm run test:platform-web -w @soyl/e2e`) was not run in this task (8 GB machine, another agent's e2e held the lock); `ai.spec`, `plans.spec` and `consent.spec` expectations were updated to the new numbers and should be run before the web merge.

## Tests added
- `platform/shared/config/avatars.test.ts`, `credit-bonuses.test.ts`; `ai-actions.test.ts` (feature gate, below-cost flag), `plans.test.ts`.
- `platform/db/test/avatars-bonus.test.ts`: one bonus per rule per day (unique index), positive amounts, app role append-only, avatar checks, 0015 down/up on a seeded DB with bonus rows and avatars.
- `platform/api/test/ai-bonuses.test.ts`: goal exactly at the 10th solve (wrong answers and re-solves don't count), once under 5 concurrent answers and 10 racing checks, lapses at 00:00 IST (no rollover, next day starts from zero), no grant/visibility without consent, streak 7 and 14 (not 8, once per day), balance/ledger/history show it, the spend breaker still pauses AI, guide and history shapes, ledger invariants.
- `platform/api/test/avatars.test.ts`: default by seed, picking and resetting, 400s, catalog, lock → 403 `avatar_locked` → unlock for every rule kind (level, badge, streak, league tier, live mocks), public-name change drops a name-only avatar, deletion clears it.
- `leagues.test.ts` and `live.test.ts`: standings / leaderboards carry the avatar (picked or default), null with the name for non-consented students, no user ids.

## Known gaps / follow-ups
- Web: build the guide, history and avatar picker; show avatars on boards; replace the hard-coded "25 free credits" copy; define the 8 `p-avatar-*` tokens and 64 animal illustrations (design-system).
- Run the Playwright e2e with the new numbers before merging the web.
- Streak bonuses from lesson/test completion are not returned in those responses (only in the balance and ledger).
- A student whose consent becomes `granted` later in the day does not get a streak bonus for that day's earlier milestone (the goal bonus is still granted at their next solve that day).
- D-044's Pro margin risk (≈ ₹450/month at full use vs ₹299) stands; recheck before Razorpay go-live.

## Decisions made
- Bonus credits are new ledger kinds (`bonus_goal`, `bonus_streak`), not `grant` rows, so plan top-up arithmetic ignores them and history separates them.
- The daily-goal check is a follow-up after commit; the streak check is in the activity transaction.
- Avatar CHECKs use the config lists (adding an animal needs a migration, but the list is tied to public names, which are append-only anyway).
- `defaultAvatar(userId, publicNameSeed)` needs the account id too: the public-name animal depends on both.
- Separate `GET /v1/me/avatars`.

Needs from owner: confirm AI marking stays at 7 credits per answer (₹0.70 vs ₹0.72 measured), or reprice to 8.

Note for the Lead: the super-admin code merged as 0014 still says "migration 0015" in comments (api/src/domain/admin/*.ts, policy.ts, db/schema/{ops,progress,assessment,coins}.ts, shared/config/analytics.ts, db/test/schema.test.ts, PII.md, its 0014 SQL headers). 0015 is now this branch's avatars/credit-bonus migration; those comments should say 0014.
