-- 0017 future builders (backend-api, 2026-11-08; ADR-027): Future Builders summer-camp registrations (paid, posted
-- server-to-server by the marketing site after it verified the Razorpay payment) and enquiries (callback / notify /
-- waitlist). Replaces the Google Sheet. Not linked to platform accounts. Down: 0017_future_builders.down.sql.
--
-- Renumber at integration if another 0017 merges first (the README lists the current order).
CREATE TABLE "fb_enrollments" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"receipt_number" text NOT NULL,
	"receipt_year" integer NOT NULL,
	"receipt_seq" integer NOT NULL,
	"razorpay_order_id" text NOT NULL,
	"razorpay_payment_id" text NOT NULL,
	"amount_paise" integer NOT NULL,
	"currency" text DEFAULT 'INR' NOT NULL,
	"paid_at" timestamp with time zone NOT NULL,
	"cohort" text NOT NULL,
	"offer" text NOT NULL,
	"coupon" text,
	"friend_name" text,
	"parent_name" text NOT NULL,
	"student_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"grade" text NOT NULL,
	"source" text NOT NULL,
	"email_status" text DEFAULT 'pending' NOT NULL,
	"email_attempts" integer DEFAULT 0 NOT NULL,
	"email_sent_at" timestamp with time zone,
	"email_last_error" text,
	"staff_notified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "fb_enrollments_offer_check" CHECK ("fb_enrollments"."offer" IN ('diwali-2026', 'standard')),
	CONSTRAINT "fb_enrollments_source_check" CHECK ("fb_enrollments"."source" IN ('checkout', 'webhook')),
	CONSTRAINT "fb_enrollments_email_status_check" CHECK ("fb_enrollments"."email_status" IN ('pending', 'sent', 'failed')),
	CONSTRAINT "fb_enrollments_amount_check" CHECK ("fb_enrollments"."amount_paise" > 0),
	CONSTRAINT "fb_enrollments_currency_check" CHECK ("fb_enrollments"."currency" = 'INR'),
	CONSTRAINT "fb_enrollments_receipt_check" CHECK ("fb_enrollments"."receipt_seq" > 0 AND "fb_enrollments"."receipt_year" BETWEEN 2000 AND 2999),
	CONSTRAINT "fb_enrollments_email_attempts_check" CHECK ("fb_enrollments"."email_attempts" >= 0)
);
--> statement-breakpoint
CREATE TABLE "fb_leads" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"kind" text NOT NULL,
	"parent_name" text NOT NULL,
	"student_name" text,
	"email" text,
	"phone" text NOT NULL,
	"grade" text,
	"source" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "fb_leads_kind_check" CHECK ("fb_leads"."kind" IN ('callback', 'notify', 'waitlist'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX "fb_enrollments_razorpay_payment_id_unique" ON "fb_enrollments" USING btree ("razorpay_payment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "fb_enrollments_receipt_number_unique" ON "fb_enrollments" USING btree ("receipt_number");--> statement-breakpoint
CREATE UNIQUE INDEX "fb_enrollments_receipt_year_seq_unique" ON "fb_enrollments" USING btree ("receipt_year","receipt_seq");--> statement-breakpoint
CREATE INDEX "fb_enrollments_paid_at_idx" ON "fb_enrollments" USING btree ("paid_at");--> statement-breakpoint
CREATE INDEX "fb_enrollments_email_status_paid_at_idx" ON "fb_enrollments" USING btree ("email_status","paid_at");--> statement-breakpoint
CREATE INDEX "fb_enrollments_razorpay_order_id_idx" ON "fb_enrollments" USING btree ("razorpay_order_id");--> statement-breakpoint
CREATE INDEX "fb_leads_created_at_idx" ON "fb_leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "fb_leads_kind_created_at_idx" ON "fb_leads" USING btree ("kind","created_at");--> statement-breakpoint
CREATE INDEX "fb_leads_phone_kind_created_at_idx" ON "fb_leads" USING btree ("phone","kind","created_at");