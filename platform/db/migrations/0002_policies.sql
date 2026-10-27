-- 0002 policies (hand-written): pgvector column, ledger settlement trigger, student-facing views, and
-- the first application of roles/grants/triggers. Down: 0002_policies.down.sql. ADR-004.

-- pgvector (ARCHITECTURE §10 tutor retrieval). Azure and CI have it; embedded Postgres used for local
-- development does not, so the column and its index are skipped there with a NOTICE. Dimension must
-- equal EMBEDDING_DIMENSIONS in schema/content.ts (test/schema.test.ts checks it where pgvector exists).
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_available_extensions WHERE name = 'vector') THEN
    -- On Azure, CREATE EXTENSION is permission-checked even with IF NOT EXISTS and even when the
    -- extension is installed, and soyl_migrator is not in azure_pg_admin. The migrate bootstrap installs
    -- it as the admin identity, so only create it here when it is genuinely missing (local/CI superuser).
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
      CREATE EXTENSION vector;
    END IF;
    ALTER TABLE content_chunks ADD COLUMN IF NOT EXISTS embedding vector(1536);
    CREATE INDEX IF NOT EXISTS content_chunks_embedding_hnsw_idx ON content_chunks USING hnsw (embedding vector_cosine_ops);
  ELSE
    RAISE NOTICE 'pgvector is not available on this server: content_chunks.embedding was not created (ADR-004).';
  END IF;
END $$;
--> statement-breakpoint

-- DB-2 / AC-08: a charge or refund must settle an existing reservation of the same user and request;
-- a refund returns exactly the reserved credits; a charge cannot return more than was reserved.
-- (The partial unique index credit_ledger_one_resolution makes charge-vs-refund races lose cleanly.)
CREATE OR REPLACE FUNCTION soyl_credit_ledger_settlement_check() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE
  reserved integer;
BEGIN
  IF NEW.kind IN ('charge', 'refund') THEN
    SELECT -amount INTO reserved
    FROM credit_ledger
    WHERE kind = 'reserve' AND request_id = NEW.request_id AND user_id = NEW.user_id;
    IF reserved IS NULL THEN
      RAISE EXCEPTION 'credit_ledger: % for request % has no matching reserve', NEW.kind, NEW.request_id
        USING ERRCODE = 'check_violation', CONSTRAINT = 'credit_ledger_settlement_check';
    END IF;
    IF NEW.kind = 'refund' AND NEW.amount <> reserved THEN
      RAISE EXCEPTION 'credit_ledger: refund of % must return exactly the % reserved credits', NEW.amount, reserved
        USING ERRCODE = 'check_violation', CONSTRAINT = 'credit_ledger_settlement_check';
    END IF;
    IF NEW.kind = 'charge' AND NEW.amount > reserved THEN
      RAISE EXCEPTION 'credit_ledger: charge returns % credits but only % were reserved', NEW.amount, reserved
        USING ERRCODE = 'check_violation', CONSTRAINT = 'credit_ledger_settlement_check';
    END IF;
  END IF;
  RETURN NEW;
END $$;
--> statement-breakpoint
CREATE TRIGGER soyl_credit_ledger_settlement_check
  BEFORE INSERT ON credit_ledger
  FOR EACH ROW EXECUTE FUNCTION soyl_credit_ledger_settlement_check();
--> statement-breakpoint

-- DB-6 / AC-11: the student-facing projection of questions. No answer, solution or marking scheme
-- (those are only in question_keys); only published/reviewed rows; live_reserved items stay hidden
-- until their embargo ends. security_barrier keeps the filter ahead of user-supplied predicates.
CREATE VIEW student_questions WITH (security_barrier = true) AS
SELECT
  id, key, version, unit, chapter_id, academic_year, language, status, is_current, type, pool,
  difficulty, competency, bloom, marks, expected_time_sec, topic_keys, body
FROM questions
WHERE status IN ('published', 'reviewed')
  AND (pool <> 'live_reserved' OR embargo_until <= now());
--> statement-breakpoint

-- Content pipeline spend vs CONTENT_BUDGET_INR (config_values, rupees). Mock spend is simulated and
-- does not count against the real cap.
CREATE VIEW content_budget AS
SELECT
  s.real_spent_paise,
  s.simulated_spent_paise,
  c.cap_paise,
  (c.cap_paise - s.real_spent_paise)::numeric(14, 4) AS remaining_paise,
  s.last_spend_at
FROM (
  SELECT
    coalesce(sum(cost_paise) FILTER (WHERE NOT simulated), 0)::numeric(14, 4) AS real_spent_paise,
    coalesce(sum(cost_paise) FILTER (WHERE simulated), 0)::numeric(14, 4) AS simulated_spent_paise,
    max(created_at) AS last_spend_at
  FROM content_budget_ledger
) AS s
CROSS JOIN (
  SELECT (SELECT ((value #>> '{}')::numeric * 100)::numeric(14, 4) FROM config_values WHERE key = 'CONTENT_BUDGET_INR') AS cap_paise
) AS c;
--> statement-breakpoint

SELECT soyl_apply_conventions();
