-- Down for 0011_consent_interim (D-039, ADR-022). Drops the built-in consent provider's records and the
-- public-name seed. The gate's cache (`consent_status`) is left as is: with the built-in provider gone the
-- API must run CONSENT_PROVIDER=unavailable or mock, which rewrite it on the next check.
ALTER TABLE "consent_records" DROP CONSTRAINT IF EXISTS "consent_records_user_id_users_id_fk";
DROP TABLE IF EXISTS "consent_records";
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "public_name_seed";
