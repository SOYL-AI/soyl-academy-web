-- Down for 0014_avatars_credit_bonus. Removes the avatar columns (students fall back to the default avatar)
-- and the bonus-credit ledger kinds. Bonus rows (bonus_goal, bonus_streak) are DELETED first so the old
-- kind/amount checks can be restored: this is lossy for credit history (bonus credits disappear from past
-- and current days' balances). The migrator runs as the owner role, so the app's append-only rule (DB-1)
-- does not block it.
ALTER TABLE "profiles" DROP CONSTRAINT IF EXISTS "profiles_avatar_pair_check";
ALTER TABLE "profiles" DROP CONSTRAINT IF EXISTS "profiles_avatar_bg_check";
ALTER TABLE "profiles" DROP CONSTRAINT IF EXISTS "profiles_avatar_id_check";
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "avatar_bg";
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "avatar_id";
DROP INDEX IF EXISTS "credit_ledger_one_bonus_per_day";
DELETE FROM "credit_ledger" WHERE "kind" IN ('bonus_goal', 'bonus_streak');
ALTER TABLE "credit_ledger" DROP CONSTRAINT IF EXISTS "credit_ledger_amount_sign_check";
ALTER TABLE "credit_ledger" DROP CONSTRAINT IF EXISTS "credit_ledger_kind_check";
ALTER TABLE "credit_ledger" ADD CONSTRAINT "credit_ledger_kind_check" CHECK ("credit_ledger"."kind" IN ('grant', 'reserve', 'charge', 'refund', 'expire'));
ALTER TABLE "credit_ledger" ADD CONSTRAINT "credit_ledger_amount_sign_check" CHECK (("credit_ledger"."kind" = 'grant' AND "credit_ledger"."amount" > 0)
       OR ("credit_ledger"."kind" = 'reserve' AND "credit_ledger"."amount" < 0)
       OR ("credit_ledger"."kind" = 'charge' AND "credit_ledger"."amount" >= 0)
       OR ("credit_ledger"."kind" = 'refund' AND "credit_ledger"."amount" > 0)
       OR ("credit_ledger"."kind" = 'expire' AND "credit_ledger"."amount" < 0));
