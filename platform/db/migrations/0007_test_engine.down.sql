-- Down for 0007_test_engine (backend-api M3). Drops the score buckets (percentiles are rebuilt from
-- attempts by re-grading), the autosave sequence numbers and the attempt score split columns.
DROP TABLE IF EXISTS "test_score_buckets";
DROP INDEX IF EXISTS "attempts_user_test_idx";
ALTER TABLE "responses" DROP CONSTRAINT IF EXISTS "responses_client_seq_check";
ALTER TABLE "responses" DROP COLUMN IF EXISTS "client_seq";
ALTER TABLE "attempts" DROP COLUMN IF EXISTS "graded_at";
ALTER TABLE "attempts" DROP COLUMN IF EXISTS "counts_for_stats";
ALTER TABLE "attempts" DROP COLUMN IF EXISTS "time_taken_sec";
ALTER TABLE "attempts" DROP COLUMN IF EXISTS "self_score";
ALTER TABLE "attempts" DROP COLUMN IF EXISTS "auto_score";
