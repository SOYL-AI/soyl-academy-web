-- Down for 0015 admin analytics (numbered 0014 on its branch). Drops the range-read indexes, the
-- interest counters and the staff capabilities. Superadmins stay `admin` (users.role is untouched).
DROP INDEX IF EXISTS "practice_answers_answered_at_idx";
DROP INDEX IF EXISTS "lesson_progress_updated_at_idx";
DROP INDEX IF EXISTS "lesson_progress_completed_at_idx";
DROP INDEX IF EXISTS "lesson_progress_created_at_idx";
DROP INDEX IF EXISTS "credit_ledger_day_kind_idx";
DROP INDEX IF EXISTS "coin_ledger_day_kind_idx";
DROP INDEX IF EXISTS "attempts_submitted_at_idx";
DROP INDEX IF EXISTS "attempts_started_at_idx";
DROP TABLE IF EXISTS "staff_capabilities";
DROP TABLE IF EXISTS "analytics_counters";
