-- Down for 0013_school_capture. Drops the school dedupe/search keys, source, verification and creator
-- columns (with their indexes and constraints) and the dashboard weekly goal. School rows themselves and
-- profiles.school_id stay (they predate 0013); student-added rows become indistinguishable from others.
ALTER TABLE "schools" DROP CONSTRAINT IF EXISTS "schools_source_check";
ALTER TABLE "profiles" DROP CONSTRAINT IF EXISTS "profiles_weekly_goal_check";
DROP INDEX IF EXISTS "schools_created_by_user_id_idx";
DROP INDEX IF EXISTS "schools_city_name_normalized_idx";
DROP INDEX IF EXISTS "schools_name_normalized_idx";
DROP INDEX IF EXISTS "schools_student_name_city_unique";
ALTER TABLE "schools" DROP CONSTRAINT IF EXISTS "schools_created_by_user_id_users_id_fk";
ALTER TABLE "schools" DROP COLUMN IF EXISTS "created_by_user_id";
ALTER TABLE "schools" DROP COLUMN IF EXISTS "verified_at";
ALTER TABLE "schools" DROP COLUMN IF EXISTS "source";
ALTER TABLE "schools" DROP COLUMN IF EXISTS "city_normalized";
ALTER TABLE "schools" DROP COLUMN IF EXISTS "name_normalized";
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "weekly_goal";
