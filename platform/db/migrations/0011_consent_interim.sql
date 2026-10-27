-- 0011 consent interim (backend-api, D-039, ADR-022): `consent_records` for the built-in consent provider
-- (age band, status, method, policy version, keyed hash + masked hint of the parent email, hashed approval
-- code, withdraw-link generation, revocation) and `profiles.public_name_seed` (auto-generated public names).
-- Down: 0011_consent_interim.down.sql.
CREATE TABLE "consent_records" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"age_band" text,
	"status" text DEFAULT 'required' NOT NULL,
	"method" text,
	"policy_version" text,
	"parent_email_hash" text,
	"parent_email_hint" text,
	"code_hash" text,
	"code_expires_at" timestamp with time zone,
	"code_attempts" smallint DEFAULT 0 NOT NULL,
	"code_sent_at" timestamp with time zone,
	"revoke_generation" integer DEFAULT 0 NOT NULL,
	"declared_at" timestamp with time zone,
	"granted_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"revoked_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "consent_records_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "consent_records_status_check" CHECK ("consent_records"."status" IN ('required', 'pending', 'granted', 'revoked')),
	CONSTRAINT "consent_records_age_band_check" CHECK ("consent_records"."age_band" IN ('adult', 'minor')),
	CONSTRAINT "consent_records_method_check" CHECK ("consent_records"."method" IN ('self_declared', 'parent_email_code')),
	CONSTRAINT "consent_records_revoked_by_check" CHECK ("consent_records"."revoked_by" IN ('parent', 'account_holder', 'admin')),
	CONSTRAINT "consent_records_code_attempts_check" CHECK ("consent_records"."code_attempts" >= 0),
	CONSTRAINT "consent_records_code_pair" CHECK (("consent_records"."code_hash" IS NULL) = ("consent_records"."code_expires_at" IS NULL)),
	CONSTRAINT "consent_records_granted_complete" CHECK ("consent_records"."status" <> 'granted' OR ("consent_records"."method" IS NOT NULL AND "consent_records"."policy_version" IS NOT NULL AND "consent_records"."granted_at" IS NOT NULL AND "consent_records"."age_band" IS NOT NULL))
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "public_name_seed" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "consent_records" ADD CONSTRAINT "consent_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;