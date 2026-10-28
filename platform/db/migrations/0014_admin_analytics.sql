-- 0015 admin analytics (backend-api, 2026-10-28; D-045, D-014). On this branch the file is numbered 0014 because
-- the migrator refuses gaps; the Lead renames it to 0015 after the AI/credits 0014 lands (README "Migrations").
-- 1. staff_capabilities: `superadmin` = role admin + a row here (dashboard, audited user lookup).
-- 2. analytics_counters: product-interest counters per (IST day, allowlisted event, dimension). By design no
--    user id, IP, session id, device id or user agent column (D-014: aggregate counts only).
-- 3. Range-read indexes for the dashboard's platform-wide IST-day aggregates (bounded to 180 days per query).
--    Plain CREATE INDEX (the migrator runs each migration in one transaction); the tables are small today.
-- Down: 0014_admin_analytics.down.sql.
CREATE TABLE "analytics_counters" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"ist_day" date NOT NULL,
	"event" text NOT NULL,
	"dimension" text DEFAULT '' NOT NULL,
	"count" bigint DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "analytics_counters_event_check" CHECK ("analytics_counters"."event" ~ '^[a-z][a-z0-9_]{1,63}$'),
	CONSTRAINT "analytics_counters_count_check" CHECK ("analytics_counters"."count" >= 0),
	CONSTRAINT "analytics_counters_dimension_check" CHECK (length("analytics_counters"."dimension") <= 64)
);
--> statement-breakpoint
CREATE TABLE "staff_capabilities" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"capability" text NOT NULL,
	"granted_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "staff_capabilities_capability_check" CHECK ("staff_capabilities"."capability" IN ('superadmin'))
);
--> statement-breakpoint
ALTER TABLE "staff_capabilities" ADD CONSTRAINT "staff_capabilities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff_capabilities" ADD CONSTRAINT "staff_capabilities_granted_by_user_id_users_id_fk" FOREIGN KEY ("granted_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "analytics_counters_day_event_dimension_unique" ON "analytics_counters" USING btree ("ist_day","event","dimension");--> statement-breakpoint
CREATE INDEX "analytics_counters_event_day_idx" ON "analytics_counters" USING btree ("event","ist_day");--> statement-breakpoint
CREATE UNIQUE INDEX "staff_capabilities_user_capability_unique" ON "staff_capabilities" USING btree ("user_id","capability");--> statement-breakpoint
CREATE INDEX "staff_capabilities_granted_by_user_id_idx" ON "staff_capabilities" USING btree ("granted_by_user_id");--> statement-breakpoint
CREATE INDEX "attempts_started_at_idx" ON "attempts" USING btree ("started_at");--> statement-breakpoint
CREATE INDEX "attempts_submitted_at_idx" ON "attempts" USING btree ("submitted_at");--> statement-breakpoint
CREATE INDEX "coin_ledger_day_kind_idx" ON "coin_ledger" USING btree ("ist_day","kind");--> statement-breakpoint
CREATE INDEX "credit_ledger_day_kind_idx" ON "credit_ledger" USING btree ("ist_day","kind");--> statement-breakpoint
CREATE INDEX "lesson_progress_created_at_idx" ON "lesson_progress" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "lesson_progress_completed_at_idx" ON "lesson_progress" USING btree ("completed_at");--> statement-breakpoint
CREATE INDEX "lesson_progress_updated_at_idx" ON "lesson_progress" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "practice_answers_answered_at_idx" ON "practice_answers" USING btree ("answered_at");