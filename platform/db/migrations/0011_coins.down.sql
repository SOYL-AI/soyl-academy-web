-- Down for 0011_coins (ADR-021): the coin tables, the guard trigger, and the conventions function with
-- the previous append-only list (0000). coin_ledger rows must go before coin_redemptions (FK).
DROP TRIGGER IF EXISTS soyl_coin_ledger_guard ON coin_ledger;
DROP FUNCTION IF EXISTS soyl_coin_ledger_guard();
DROP TABLE IF EXISTS "coin_ledger";
DROP TABLE IF EXISTS "coin_redemptions";
DROP TABLE IF EXISTS "coin_wallets";
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
