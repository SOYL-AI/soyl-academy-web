-- 0011 SOYL Coins (D-037/D-038, ADR-021): coin_wallets (per-student lock row, check-in streak, equipped items),
-- coin_redemptions (store redemptions; encrypted shipping address) and the append-only coin_ledger with its
-- guard trigger (balance never negative, refund = redeem) and soyl_app INSERT/SELECT only. Down: 0011_coins.down.sql.
CREATE TABLE "coin_ledger" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"source" text NOT NULL,
	"amount" integer NOT NULL,
	"idempotency_key" text NOT NULL,
	"ist_day" date NOT NULL,
	"capped" boolean DEFAULT false NOT NULL,
	"redemption_id" uuid,
	"balance_after" integer DEFAULT 0 NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "coin_ledger_kind_check" CHECK ("coin_ledger"."kind" IN ('earn', 'redeem', 'refund', 'adjust')),
	CONSTRAINT "coin_ledger_source_check" CHECK ("coin_ledger"."source" IN ('checkin', 'checkin_streak', 'daily_challenge', 'solved_milestone', 'chapter_mastered', 'test_submitted', 'perfect_paper', 'live_participation', 'live_rank', 'league_promotion', 'league_top_finish', 'redemption', 'admin')),
	CONSTRAINT "coin_ledger_amount_sign_check" CHECK (("coin_ledger"."kind" = 'earn' AND "coin_ledger"."amount" >= 0)
       OR ("coin_ledger"."kind" = 'redeem' AND "coin_ledger"."amount" < 0)
       OR ("coin_ledger"."kind" = 'refund' AND "coin_ledger"."amount" > 0)
       OR ("coin_ledger"."kind" = 'adjust' AND "coin_ledger"."amount" <> 0)),
	CONSTRAINT "coin_ledger_redemption_check" CHECK (("coin_ledger"."kind" IN ('redeem', 'refund')) = ("coin_ledger"."redemption_id" IS NOT NULL)),
	CONSTRAINT "coin_ledger_source_kind_check" CHECK (("coin_ledger"."kind" IN ('redeem', 'refund')) = ("coin_ledger"."source" = 'redemption') AND ("coin_ledger"."kind" = 'adjust') = ("coin_ledger"."source" = 'admin')),
	CONSTRAINT "coin_ledger_balance_after_check" CHECK ("coin_ledger"."balance_after" >= 0)
);
--> statement-breakpoint
CREATE TABLE "coin_redemptions" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid,
	"item_key" text NOT NULL,
	"item_type" text NOT NULL,
	"price_coins" integer NOT NULL,
	"status" text NOT NULL,
	"status_reason" text,
	"address_enc" text,
	"address_submitted_at" timestamp with time zone,
	"address_erased_at" timestamp with time zone,
	"reviewed_by" uuid,
	"approved_at" timestamp with time zone,
	"fulfilled_at" timestamp with time zone,
	"tracking_ref" text,
	"closed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "coin_redemptions_status_check" CHECK ("coin_redemptions"."status" IN ('requested', 'parent_approval_pending', 'approved', 'fulfilled', 'cancelled', 'refunded')),
	CONSTRAINT "coin_redemptions_item_type_check" CHECK ("coin_redemptions"."item_type" IN ('digital', 'physical')),
	CONSTRAINT "coin_redemptions_reason_check" CHECK ("coin_redemptions"."status_reason" IS NULL OR "coin_redemptions"."status_reason" IN ('student_cancelled', 'staff_rejected', 'address_timeout', 'account_deleted', 'out_of_stock')),
	CONSTRAINT "coin_redemptions_price_check" CHECK ("coin_redemptions"."price_coins" > 0),
	CONSTRAINT "coin_redemptions_digital_check" CHECK ("coin_redemptions"."item_type" = 'physical' OR ("coin_redemptions"."status" = 'fulfilled' AND "coin_redemptions"."address_enc" IS NULL)),
	CONSTRAINT "coin_redemptions_tracking_check" CHECK ("coin_redemptions"."tracking_ref" IS NULL OR "coin_redemptions"."status" = 'fulfilled')
);
--> statement-breakpoint
CREATE TABLE "coin_wallets" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"checkin_streak" integer DEFAULT 0 NOT NULL,
	"checkin_longest" integer DEFAULT 0 NOT NULL,
	"last_checkin_ist_day" date,
	"equipped_frame" text,
	"equipped_theme" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "coin_wallets_streak_check" CHECK ("coin_wallets"."checkin_streak" >= 0 AND "coin_wallets"."checkin_longest" >= "coin_wallets"."checkin_streak")
);
--> statement-breakpoint
ALTER TABLE "coin_ledger" ADD CONSTRAINT "coin_ledger_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coin_ledger" ADD CONSTRAINT "coin_ledger_redemption_id_coin_redemptions_id_fk" FOREIGN KEY ("redemption_id") REFERENCES "public"."coin_redemptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coin_redemptions" ADD CONSTRAINT "coin_redemptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coin_redemptions" ADD CONSTRAINT "coin_redemptions_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coin_wallets" ADD CONSTRAINT "coin_wallets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "coin_ledger_idempotency_unique" ON "coin_ledger" USING btree ("idempotency_key");--> statement-breakpoint
CREATE UNIQUE INDEX "coin_ledger_one_redeem" ON "coin_ledger" USING btree ("redemption_id") WHERE "coin_ledger"."kind" = 'redeem';--> statement-breakpoint
CREATE UNIQUE INDEX "coin_ledger_one_refund" ON "coin_ledger" USING btree ("redemption_id") WHERE "coin_ledger"."kind" = 'refund';--> statement-breakpoint
CREATE INDEX "coin_ledger_user_created_idx" ON "coin_ledger" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "coin_ledger_user_day_idx" ON "coin_ledger" USING btree ("user_id","ist_day");--> statement-breakpoint
CREATE INDEX "coin_ledger_user_source_idx" ON "coin_ledger" USING btree ("user_id","source");--> statement-breakpoint
CREATE INDEX "coin_redemptions_user_created_idx" ON "coin_redemptions" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "coin_redemptions_item_status_idx" ON "coin_redemptions" USING btree ("item_key","status");--> statement-breakpoint
CREATE INDEX "coin_redemptions_status_created_idx" ON "coin_redemptions" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "coin_redemptions_reviewed_by_idx" ON "coin_redemptions" USING btree ("reviewed_by");--> statement-breakpoint
CREATE UNIQUE INDEX "coin_wallets_user_unique" ON "coin_wallets" USING btree ("user_id");
--> statement-breakpoint

-- Balance guard (ADR-021): serialise per student on the coin_wallets row, refuse a row that would take the
-- balance below zero, require a refund to return exactly its redeem, and record balance_after.
CREATE OR REPLACE FUNCTION soyl_coin_ledger_guard() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE
  bal bigint;
  redeemed integer;
BEGIN
  INSERT INTO coin_wallets (user_id) VALUES (NEW.user_id) ON CONFLICT (user_id) DO NOTHING;
  PERFORM 1 FROM coin_wallets WHERE user_id = NEW.user_id FOR UPDATE;
  IF NEW.kind = 'refund' THEN
    SELECT -amount INTO redeemed FROM coin_ledger
      WHERE redemption_id = NEW.redemption_id AND kind = 'redeem' AND user_id = NEW.user_id;
    IF redeemed IS NULL THEN
      RAISE EXCEPTION 'coin_ledger: refund for redemption % has no matching redeem', NEW.redemption_id
        USING ERRCODE = 'check_violation', CONSTRAINT = 'coin_ledger_settlement_check';
    END IF;
    IF redeemed <> NEW.amount THEN
      RAISE EXCEPTION 'coin_ledger: refund of % must return exactly the % redeemed coins', NEW.amount, redeemed
        USING ERRCODE = 'check_violation', CONSTRAINT = 'coin_ledger_settlement_check';
    END IF;
  END IF;
  SELECT coalesce(sum(amount), 0) INTO bal FROM coin_ledger WHERE user_id = NEW.user_id;
  IF bal + NEW.amount < 0 THEN
    RAISE EXCEPTION 'coin_ledger: balance would become %', bal + NEW.amount
      USING ERRCODE = 'check_violation', CONSTRAINT = 'coin_ledger_balance_check';
  END IF;
  NEW.balance_after := bal + NEW.amount;
  RETURN NEW;
END $$;
--> statement-breakpoint
CREATE TRIGGER soyl_coin_ledger_guard
  BEFORE INSERT ON coin_ledger
  FOR EACH ROW EXECUTE FUNCTION soyl_coin_ledger_guard();
--> statement-breakpoint

-- DB-1: coin_ledger is append-only for the app (same list as 0000 plus coin_ledger).
CREATE OR REPLACE FUNCTION soyl_apply_conventions() RETURNS void
LANGUAGE plpgsql AS $$
DECLARE
  t record;
  append_only text[] := ARRAY['credit_ledger', 'audit_log', 'webhook_events', 'content_budget_ledger', 'coin_ledger'];
BEGIN
  FOR t IN
    SELECT c.relname
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_attribute a ON a.attrelid = c.oid AND a.attname = 'updated_at' AND NOT a.attisdropped
    WHERE n.nspname = 'public' AND c.relkind = 'r'
  LOOP
    EXECUTE format(
      'CREATE OR REPLACE TRIGGER soyl_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION soyl_set_updated_at()',
      t.relname);
  END LOOP;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'soyl_app') THEN
    GRANT USAGE ON SCHEMA public TO soyl_app;
    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO soyl_app;
    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO soyl_app;
    -- DB-1: append-only for the app; corrections are new rows.
    FOR t IN SELECT c.relname FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
             WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relname = ANY (append_only) LOOP
      EXECUTE format('REVOKE UPDATE, DELETE, TRUNCATE ON public.%I FROM soyl_app', t.relname);
    END LOOP;
    -- The migrator's bookkeeping is not the app's business.
    IF to_regclass('public.soyl_schema_migrations') IS NOT NULL THEN
      REVOKE ALL ON public.soyl_schema_migrations FROM soyl_app;
    END IF;
  END IF;
END $$;
