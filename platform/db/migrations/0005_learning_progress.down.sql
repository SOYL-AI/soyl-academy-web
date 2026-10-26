-- Down for 0005_learning_progress (backend-api M2). Drops learning progress, practice answers and
-- staff TOTP enrolments; staff sessions lose their second-factor mark (staff routes then fail closed).
DROP TABLE IF EXISTS "user_mfa";
DROP TABLE IF EXISTS "practice_answers";
DROP TABLE IF EXISTS "lesson_progress";
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "mfa_verified_at";
