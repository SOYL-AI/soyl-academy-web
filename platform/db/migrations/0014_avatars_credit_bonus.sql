-- 0014 avatars + credit bonus (ai-gateway, 2026-10-28; D-044). Down: 0014_avatars_credit_bonus.down.sql.
--
-- (1) Bonus credits for learning: two new credit_ledger kinds, bonus_goal (daily practice goal met) and
-- bonus_streak (7-day streak milestone), always positive, at most one per kind per user per IST day
-- (credit_ledger_one_bonus_per_day). They count towards that IST day's balance only, so they lapse at the
-- 00:00 IST reset like the daily grant. (2) Student avatars: profiles.avatar_id / avatar_bg, checked against
-- @soyl/shared/config/avatars (64 animal ids, 8 background themes) and set or cleared together.
ALTER TABLE "credit_ledger" DROP CONSTRAINT "credit_ledger_kind_check";--> statement-breakpoint
ALTER TABLE "credit_ledger" DROP CONSTRAINT "credit_ledger_amount_sign_check";--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "avatar_id" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "avatar_bg" text;--> statement-breakpoint
CREATE UNIQUE INDEX "credit_ledger_one_bonus_per_day" ON "credit_ledger" USING btree ("user_id","ist_day","kind") WHERE "credit_ledger"."kind" IN ('bonus_goal', 'bonus_streak');--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_avatar_id_check" CHECK ("profiles"."avatar_id" IN ('otter', 'falcon', 'panda', 'tiger', 'dolphin', 'eagle', 'koala', 'lynx', 'peacock', 'parrot', 'penguin', 'rabbit', 'robin', 'sparrow', 'squirrel', 'turtle', 'whale', 'zebra', 'badger', 'beaver', 'bison', 'camel', 'cheetah', 'crane', 'deer', 'elephant', 'finch', 'fox', 'gazelle', 'gecko', 'giraffe', 'heron', 'hornbill', 'ibex', 'jaguar', 'kingfisher', 'kiwi', 'lemur', 'leopard', 'lion', 'llama', 'macaw', 'mongoose', 'moose', 'myna', 'narwhal', 'owl', 'panther', 'pelican', 'puffin', 'quail', 'raven', 'rhino', 'seal', 'starling', 'swan', 'tapir', 'toucan', 'walrus', 'wombat', 'yak', 'bulbul', 'hoopoe', 'langur'));--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_avatar_bg_check" CHECK ("profiles"."avatar_bg" IN ('sky', 'mint', 'sunflower', 'coral', 'lavender', 'meadow', 'peach', 'ocean'));--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_avatar_pair_check" CHECK (("profiles"."avatar_id" IS NULL) = ("profiles"."avatar_bg" IS NULL));--> statement-breakpoint
ALTER TABLE "credit_ledger" ADD CONSTRAINT "credit_ledger_kind_check" CHECK ("credit_ledger"."kind" IN ('grant', 'reserve', 'charge', 'refund', 'expire', 'bonus_goal', 'bonus_streak'));--> statement-breakpoint
ALTER TABLE "credit_ledger" ADD CONSTRAINT "credit_ledger_amount_sign_check" CHECK (("credit_ledger"."kind" = 'grant' AND "credit_ledger"."amount" > 0)
       OR ("credit_ledger"."kind" = 'reserve' AND "credit_ledger"."amount" < 0)
       OR ("credit_ledger"."kind" = 'charge' AND "credit_ledger"."amount" >= 0)
       OR ("credit_ledger"."kind" = 'refund' AND "credit_ledger"."amount" > 0)
       OR ("credit_ledger"."kind" = 'expire' AND "credit_ledger"."amount" < 0)
       OR ("credit_ledger"."kind" IN ('bonus_goal', 'bonus_streak') AND "credit_ledger"."amount" > 0));