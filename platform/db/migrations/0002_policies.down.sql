-- Down for 0002_policies. The vector extension itself is left installed (other databases may use it).
DROP VIEW IF EXISTS content_budget;
DROP VIEW IF EXISTS student_questions;
DROP TRIGGER IF EXISTS soyl_credit_ledger_settlement_check ON credit_ledger;
DROP FUNCTION IF EXISTS soyl_credit_ledger_settlement_check();
DROP INDEX IF EXISTS content_chunks_embedding_hnsw_idx;
ALTER TABLE content_chunks DROP COLUMN IF EXISTS embedding;
