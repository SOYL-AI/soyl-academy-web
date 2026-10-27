-- Down for 0010_leagues (backend-api M5). Removes AI-answer reports (the restored check cannot hold
-- them), the league columns on league_memberships and the leagues table.
DELETE FROM "content_reports" WHERE "content_type" = 'ai_answer';
ALTER TABLE "content_reports" DROP CONSTRAINT IF EXISTS "content_reports_type_check";
ALTER TABLE "content_reports" ADD CONSTRAINT "content_reports_type_check" CHECK ("content_reports"."content_type" IN ('deck', 'notes', 'flashcard_set', 'question', 'test'));
ALTER TABLE "league_memberships" DROP CONSTRAINT IF EXISTS "league_memberships_tier_check";
ALTER TABLE "league_memberships" DROP CONSTRAINT IF EXISTS "league_memberships_outcome_check";
DROP INDEX IF EXISTS "league_memberships_league_id_idx";
ALTER TABLE "league_memberships" DROP CONSTRAINT IF EXISTS "league_memberships_league_id_leagues_id_fk";
ALTER TABLE "league_memberships" DROP COLUMN IF EXISTS "outcome";
ALTER TABLE "league_memberships" DROP COLUMN IF EXISTS "tier";
ALTER TABLE "league_memberships" DROP COLUMN IF EXISTS "league_id";
DROP TABLE IF EXISTS "leagues";
