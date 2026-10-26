-- 0008 billing (billing-razorpay M4, ADR-014): Razorpay binding columns on subscriptions (plan id and
-- price at creation, paid count, end time) and the processing outcome + entity id on the append-only
-- webhook_events. Down: 0008_billing.down.sql. NOTE: ai-gateway M4 also adds a 0008; the Lead renumbers.
ALTER TABLE "subscriptions" ADD COLUMN "razorpay_plan_id" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "amount_paise" integer;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "paid_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "ended_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "webhook_events" ADD COLUMN "outcome" text DEFAULT 'applied' NOT NULL;--> statement-breakpoint
ALTER TABLE "webhook_events" ADD COLUMN "entity_id" text;--> statement-breakpoint
CREATE INDEX "webhook_events_entity_idx" ON "webhook_events" USING btree ("entity_id");--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_amount_check" CHECK ("subscriptions"."amount_paise" IS NULL OR "subscriptions"."amount_paise" > 0);--> statement-breakpoint
ALTER TABLE "webhook_events" ADD CONSTRAINT "webhook_events_outcome_check" CHECK ("webhook_events"."outcome" IN ('applied', 'ignored', 'rejected'));