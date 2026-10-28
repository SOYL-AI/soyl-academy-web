-- 0015 invoices (billing-razorpay, 2026-10-28; ADR-024; becomes 0016 if credits/avatars merges first): numbered invoices for captured payments and credit
-- notes for refunds, gap-free per series and financial year (invoice_sequences); place of supply and an
-- optional buyer name captured at checkout (orders/subscriptions). Down: 0015_invoices.down.sql.
--
-- GST records are kept 8 years (PII.md): invoices are never deleted and their tax content never changes
-- (soyl_invoices_guard). At account deletion the buyer's name and email are erased from invoices and from
-- orders/subscriptions (soyl_billing_buyer_anonymise); the invoice itself, its number and amounts stay.
CREATE TABLE "invoice_sequences" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"series" text NOT NULL,
	"financial_year" text NOT NULL,
	"last_value" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invoice_sequences_series_check" CHECK ("invoice_sequences"."series" IN ('tax_invoice', 'credit_note')),
	CONSTRAINT "invoice_sequences_last_value_check" CHECK ("invoice_sequences"."last_value" >= 0)
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"number" text NOT NULL,
	"type" text NOT NULL,
	"financial_year" text NOT NULL,
	"sequence" integer NOT NULL,
	"gst_registered" boolean NOT NULL,
	"user_id" uuid,
	"payment_id" uuid NOT NULL,
	"razorpay_payment_id" text NOT NULL,
	"razorpay_order_id" text,
	"razorpay_subscription_id" text,
	"original_invoice_id" uuid,
	"credited_through_paise" integer,
	"plan_key" text NOT NULL,
	"issued_at" timestamp with time zone NOT NULL,
	"issue_date" date NOT NULL,
	"place_of_supply" text NOT NULL,
	"buyer_name" text,
	"buyer_email" text,
	"buyer_anonymised_at" timestamp with time zone,
	"line_items" jsonb NOT NULL,
	"taxable_paise" integer NOT NULL,
	"cgst_paise" integer DEFAULT 0 NOT NULL,
	"sgst_paise" integer DEFAULT 0 NOT NULL,
	"igst_paise" integer DEFAULT 0 NOT NULL,
	"total_paise" integer NOT NULL,
	"currency" text DEFAULT 'INR' NOT NULL,
	"seller" jsonb NOT NULL,
	"pdf_blob_path" text,
	"pdf_rendered_at" timestamp with time zone,
	"sent_at" timestamp with time zone,
	"email_attempts" integer DEFAULT 0 NOT NULL,
	"email_next_at" timestamp with time zone,
	"email_claimed_until" timestamp with time zone,
	"email_last_error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invoices_type_check" CHECK ("invoices"."type" IN ('tax_invoice', 'credit_note')),
	CONSTRAINT "invoices_amounts_check" CHECK ("invoices"."taxable_paise" >= 0 AND "invoices"."cgst_paise" >= 0 AND "invoices"."sgst_paise" >= 0 AND "invoices"."igst_paise" >= 0 AND "invoices"."total_paise" > 0 AND "invoices"."total_paise" = "invoices"."taxable_paise" + "invoices"."cgst_paise" + "invoices"."sgst_paise" + "invoices"."igst_paise"),
	CONSTRAINT "invoices_credit_note_check" CHECK (("invoices"."type" = 'credit_note') = ("invoices"."original_invoice_id" IS NOT NULL AND "invoices"."credited_through_paise" IS NOT NULL)),
	CONSTRAINT "invoices_place_of_supply_check" CHECK ("invoices"."place_of_supply" ~ '^[0-9]{2}$'),
	CONSTRAINT "invoices_sequence_check" CHECK ("invoices"."sequence" > 0)
);
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "place_of_supply" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "buyer_name" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "place_of_supply" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "buyer_name" text;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_original_invoice_id_invoices_id_fk" FOREIGN KEY ("original_invoice_id") REFERENCES "public"."invoices"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "invoice_sequences_series_year_unique" ON "invoice_sequences" USING btree ("series","financial_year");--> statement-breakpoint
CREATE UNIQUE INDEX "invoices_number_unique" ON "invoices" USING btree ("number");--> statement-breakpoint
CREATE UNIQUE INDEX "invoices_series_sequence_unique" ON "invoices" USING btree ("type","financial_year","sequence");--> statement-breakpoint
CREATE UNIQUE INDEX "invoices_payment_tax_invoice_unique" ON "invoices" USING btree ("payment_id") WHERE "invoices"."type" = 'tax_invoice';--> statement-breakpoint
CREATE UNIQUE INDEX "invoices_credit_note_step_unique" ON "invoices" USING btree ("original_invoice_id","credited_through_paise");--> statement-breakpoint
CREATE INDEX "invoices_user_issued_idx" ON "invoices" USING btree ("user_id","issued_at");--> statement-breakpoint
CREATE INDEX "invoices_issued_at_idx" ON "invoices" USING btree ("issued_at");--> statement-breakpoint
CREATE INDEX "invoices_payment_id_idx" ON "invoices" USING btree ("payment_id");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_place_of_supply_check" CHECK ("orders"."place_of_supply" IS NULL OR "orders"."place_of_supply" ~ '^[0-9]{2}$');--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_place_of_supply_check" CHECK ("subscriptions"."place_of_supply" IS NULL OR "subscriptions"."place_of_supply" ~ '^[0-9]{2}$');--> statement-breakpoint
-- Invoices are immutable records: only the delivery fields (PDF path, email state), the buyer's
-- anonymisation (name/email → NULL) and the purge's user_id → NULL may change; DELETE is refused.
CREATE FUNCTION soyl_invoices_guard() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'invoice % is a retained tax record and cannot be deleted', OLD.number USING ERRCODE = 'restrict_violation';
  END IF;
  IF NEW.number IS DISTINCT FROM OLD.number OR NEW.type IS DISTINCT FROM OLD.type
     OR NEW.financial_year IS DISTINCT FROM OLD.financial_year OR NEW.sequence IS DISTINCT FROM OLD.sequence
     OR NEW.gst_registered IS DISTINCT FROM OLD.gst_registered OR NEW.payment_id IS DISTINCT FROM OLD.payment_id
     OR NEW.razorpay_payment_id IS DISTINCT FROM OLD.razorpay_payment_id OR NEW.razorpay_order_id IS DISTINCT FROM OLD.razorpay_order_id
     OR NEW.razorpay_subscription_id IS DISTINCT FROM OLD.razorpay_subscription_id
     OR NEW.original_invoice_id IS DISTINCT FROM OLD.original_invoice_id OR NEW.credited_through_paise IS DISTINCT FROM OLD.credited_through_paise
     OR NEW.plan_key IS DISTINCT FROM OLD.plan_key OR NEW.issued_at IS DISTINCT FROM OLD.issued_at OR NEW.issue_date IS DISTINCT FROM OLD.issue_date
     OR NEW.place_of_supply IS DISTINCT FROM OLD.place_of_supply OR NEW.line_items IS DISTINCT FROM OLD.line_items
     OR NEW.taxable_paise IS DISTINCT FROM OLD.taxable_paise OR NEW.cgst_paise IS DISTINCT FROM OLD.cgst_paise
     OR NEW.sgst_paise IS DISTINCT FROM OLD.sgst_paise OR NEW.igst_paise IS DISTINCT FROM OLD.igst_paise
     OR NEW.total_paise IS DISTINCT FROM OLD.total_paise OR NEW.currency IS DISTINCT FROM OLD.currency
     OR NEW.seller IS DISTINCT FROM OLD.seller
     OR (NEW.user_id IS DISTINCT FROM OLD.user_id AND NEW.user_id IS NOT NULL)
     OR (NEW.buyer_name IS DISTINCT FROM OLD.buyer_name AND NEW.buyer_name IS NOT NULL)
     OR (NEW.buyer_email IS DISTINCT FROM OLD.buyer_email AND NEW.buyer_email IS NOT NULL)
     OR (OLD.buyer_anonymised_at IS NOT NULL AND NEW.buyer_anonymised_at IS DISTINCT FROM OLD.buyer_anonymised_at) THEN
    RAISE EXCEPTION 'invoice % is immutable (only delivery fields and the buyer''s erasure may change)', OLD.number USING ERRCODE = 'restrict_violation';
  END IF;
  RETURN NEW;
END $$;--> statement-breakpoint
CREATE TRIGGER soyl_invoices_guard BEFORE UPDATE OR DELETE ON "invoices" FOR EACH ROW EXECUTE FUNCTION soyl_invoices_guard();--> statement-breakpoint
-- Account deletion (PII.md): the users row gets deleted_at; the buyer's name and email go at once.
CREATE FUNCTION soyl_billing_buyer_anonymise() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  UPDATE "invoices" SET buyer_name = NULL, buyer_email = NULL, buyer_anonymised_at = NEW.deleted_at
    WHERE user_id = NEW.id AND buyer_anonymised_at IS NULL;
  UPDATE "orders" SET buyer_name = NULL WHERE user_id = NEW.id AND buyer_name IS NOT NULL;
  UPDATE "subscriptions" SET buyer_name = NULL WHERE user_id = NEW.id AND buyer_name IS NOT NULL;
  RETURN NEW;
END $$;--> statement-breakpoint
CREATE TRIGGER soyl_billing_buyer_anonymise AFTER UPDATE OF deleted_at ON "users" FOR EACH ROW
  WHEN (NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL) EXECUTE FUNCTION soyl_billing_buyer_anonymise();
