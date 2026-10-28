-- Down for 0016_invoices. Drops the invoice tables (and every invoice in them: only on a database that never
-- issued real invoices), the triggers and the checkout columns on orders/subscriptions.
DROP TRIGGER IF EXISTS soyl_billing_buyer_anonymise ON "users";
DROP FUNCTION IF EXISTS soyl_billing_buyer_anonymise();
DROP TRIGGER IF EXISTS soyl_invoices_guard ON "invoices";
DROP FUNCTION IF EXISTS soyl_invoices_guard();
DROP TABLE IF EXISTS "invoices";
DROP TABLE IF EXISTS "invoice_sequences";
ALTER TABLE "subscriptions" DROP CONSTRAINT IF EXISTS "subscriptions_place_of_supply_check";
ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "orders_place_of_supply_check";
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "buyer_name";
ALTER TABLE "subscriptions" DROP COLUMN IF EXISTS "place_of_supply";
ALTER TABLE "orders" DROP COLUMN IF EXISTS "buyer_name";
ALTER TABLE "orders" DROP COLUMN IF EXISTS "place_of_supply";
