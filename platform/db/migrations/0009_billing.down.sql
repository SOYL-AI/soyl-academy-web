-- Down for 0009_billing (billing-razorpay M4). Drops the Razorpay binding columns on subscriptions and
-- the outcome/entity columns on webhook_events (event rows themselves are kept).
DROP INDEX IF EXISTS "webhook_events_entity_idx";
ALTER TABLE "webhook_events" DROP CONSTRAINT IF EXISTS "webhook_events_outcome_check";
ALTER TABLE "webhook_events" DROP COLUMN IF EXISTS "entity_id";
ALTER TABLE "webhook_events" DROP COLUMN IF EXISTS "outcome";
ALTER TABLE "subscriptions" DROP CONSTRAINT IF EXISTS "subscriptions_amount_check";
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "ended_at";
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "paid_count";
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "amount_paise";
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "razorpay_plan_id";
