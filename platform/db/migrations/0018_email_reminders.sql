-- 0018 email reminders (backend-api, 2026-11-14; D-055): per-student email settings with the optional, confirmed
-- parent address for reminders (`notification_preferences`), and `reminder_log` (one row per user, kind and IST day:
-- the idempotency key of the daily notifications.reminders job; claim → sent | failed). PII.md lists parent_email.
-- Down: 0018_email_reminders.down.sql.
--
-- Renumber at integration if another 0018 merges first (the README lists the current order).
CREATE TABLE "notification_preferences" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"student_reminders" boolean DEFAULT true NOT NULL,
	"parent_email" text,
	"parent_status" text DEFAULT 'none' NOT NULL,
	"parent_reminders" boolean DEFAULT true NOT NULL,
	"parent_generation" integer DEFAULT 0 NOT NULL,
	"parent_confirm_sent_at" timestamp with time zone,
	"parent_confirmed_at" timestamp with time zone,
	"parent_unsubscribed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "notification_preferences_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "notification_preferences_parent_status_check" CHECK ("notification_preferences"."parent_status" IN ('none', 'pending', 'active')),
	CONSTRAINT "notification_preferences_parent_email_check" CHECK (("notification_preferences"."parent_status" = 'none') = ("notification_preferences"."parent_email" IS NULL)),
	CONSTRAINT "notification_preferences_parent_generation_check" CHECK ("notification_preferences"."parent_generation" >= 0)
);
--> statement-breakpoint
CREATE TABLE "reminder_log" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"ist_day" date NOT NULL,
	"status" text DEFAULT 'sending' NOT NULL,
	"attempts" smallint DEFAULT 1 NOT NULL,
	"claimed_at" timestamp with time zone NOT NULL,
	"sent_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reminder_log_kind_check" CHECK ("reminder_log"."kind" IN ('student', 'parent')),
	CONSTRAINT "reminder_log_status_check" CHECK ("reminder_log"."status" IN ('sending', 'sent', 'failed')),
	CONSTRAINT "reminder_log_attempts_check" CHECK ("reminder_log"."attempts" BETWEEN 1 AND 100)
);
--> statement-breakpoint
ALTER TABLE "notification_preferences" ADD CONSTRAINT "notification_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminder_log" ADD CONSTRAINT "reminder_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "reminder_log_user_kind_day_unique" ON "reminder_log" USING btree ("user_id","kind","ist_day");--> statement-breakpoint
CREATE INDEX "reminder_log_ist_day_idx" ON "reminder_log" USING btree ("ist_day");