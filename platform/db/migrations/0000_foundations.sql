-- 0000 foundations (hand-written). Functions the schema depends on, and the database roles.
-- Down: 0000_foundations.down.sql. ADR-004.

-- DB-1: roles. `soyl_migrator` owns/changes the schema; `soyl_app` (API, worker) gets DML only, and
-- INSERT/SELECT only on append-only tables (see soyl_apply_conventions). Both are NOLOGIN group roles:
-- real logins (Azure Entra managed identities) are granted membership — platform/db/README.md "Roles".
-- Creating a role needs CREATEROLE. Where the migrating user lacks it, the roles must be created once
-- by an administrator; the migration continues with a NOTICE instead of failing.
DO $$
DECLARE
  r text;
BEGIN
  FOREACH r IN ARRAY ARRAY['soyl_migrator', 'soyl_app'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = r) THEN
      BEGIN
        EXECUTE format('CREATE ROLE %I NOLOGIN', r);
      EXCEPTION
        WHEN duplicate_object OR unique_violation THEN NULL; -- created concurrently by another database's migration
        WHEN insufficient_privilege THEN RAISE NOTICE 'role % not created: %. Create it as an administrator (README "Roles").', r, SQLERRM;
      END;
    END IF;
  END LOOP;
END $$;
--> statement-breakpoint

-- No object creation in public for everyone (default since PG 15; explicit for older servers).
DO $$
BEGIN
  REVOKE CREATE ON SCHEMA public FROM PUBLIC;
EXCEPTION WHEN insufficient_privilege THEN
  RAISE NOTICE 'could not revoke CREATE on schema public: %', SQLERRM;
END $$;
--> statement-breakpoint

-- UUID v7 (RFC 9562) as the default for every `id` column. Portable to PostgreSQL 13+ (PG 18 has a
-- native uuidv7(), but CI and Azure versions may be older). App code normally supplies ids itself.
CREATE OR REPLACE FUNCTION uuid_generate_v7() RETURNS uuid
LANGUAGE sql VOLATILE PARALLEL SAFE AS $$
  SELECT encode(
    set_bit(
      set_bit(
        overlay(uuid_send(gen_random_uuid())
                PLACING substring(int8send((extract(epoch FROM clock_timestamp()) * 1000)::bigint) FROM 3)
                FROM 1 FOR 6),
        52, 1),
      53, 1),
    'hex')::uuid
$$;
--> statement-breakpoint

-- DB-3: email normalisation for users.email_normalized (generated column). Lower-case and trim; for
-- gmail.com/googlemail.com strip dots and +tag and use gmail.com; NULL for non-addresses and for
-- placeholder addresses on .invalid domains. TypeScript twin: src/normalize.ts normalizeEmail.
CREATE OR REPLACE FUNCTION soyl_normalize_email(raw text) RETURNS text
LANGUAGE sql IMMUTABLE STRICT PARALLEL SAFE AS $$
  SELECT CASE
    WHEN e !~ '^[^@[:space:]]+@[^@[:space:]]+$' THEN NULL
    WHEN split_part(e, '@', 2) = 'invalid' OR split_part(e, '@', 2) LIKE '%.invalid' THEN NULL
    WHEN split_part(e, '@', 2) IN ('gmail.com', 'googlemail.com')
      THEN replace(split_part(split_part(e, '@', 1), '+', 1), '.', '') || '@gmail.com'
    ELSE e
  END
  FROM (SELECT lower(regexp_replace(raw, '^[[:space:]]+|[[:space:]]+$', '', 'g')) AS e) AS s
$$;
--> statement-breakpoint

-- DB-3: phone to E.164 for users.phone_e164 (generated column). Indian national numbers become
-- +91XXXXXXXXXX; international (+ or 00) numbers are kept; NULL otherwise. Twin: normalizePhone.
CREATE OR REPLACE FUNCTION soyl_normalize_phone(raw text) RETURNS text
LANGUAGE sql IMMUTABLE STRICT PARALLEL SAFE AS $$
  SELECT CASE
    WHEN p ~ '^\+[1-9][0-9]{7,14}$' THEN p
    WHEN p ~ '^0?[6-9][0-9]{9}$' THEN '+91' || right(p, 10)
    WHEN p ~ '^91[6-9][0-9]{9}$' THEN '+' || p
    ELSE NULL
  END
  FROM (SELECT regexp_replace(regexp_replace(raw, '[[:space:]().-]', '', 'g'), '^00', '+') AS p) AS s
$$;
--> statement-breakpoint

-- Keeps updated_at right for raw SQL updates too (GEN-6: timestamptz, UTC).
CREATE OR REPLACE FUNCTION soyl_set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END $$;
--> statement-breakpoint

-- Idempotent conventions, re-applied after every `migrate up` (src/migrator.ts) so a new table can't
-- miss them: the updated_at trigger on every table with that column, and the soyl_app grants (DB-1).
CREATE OR REPLACE FUNCTION soyl_apply_conventions() RETURNS void
LANGUAGE plpgsql AS $$
DECLARE
  t record;
  append_only text[] := ARRAY['credit_ledger', 'audit_log', 'webhook_events', 'content_budget_ledger'];
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
