-- Down for 0004_pipeline_state. Runs recorded as "partial" are mapped to "done" first so the old
-- CHECK can be restored; reservations and detail are dropped.
ALTER TABLE "pipeline_runs" DROP CONSTRAINT "pipeline_runs_status_check";
UPDATE "pipeline_runs" SET "status" = 'done' WHERE "status" = 'partial';
ALTER TABLE "pipeline_runs" ADD CONSTRAINT "pipeline_runs_status_check" CHECK ("pipeline_runs"."status" IN ('running', 'done', 'failed', 'paused_budget'));
ALTER TABLE "pipeline_runs" DROP COLUMN IF EXISTS "detail";
ALTER TABLE "pipeline_runs" DROP COLUMN IF EXISTS "reserved_paise";
ALTER TABLE "pipeline_items" DROP COLUMN IF EXISTS "detail";
