-- Pipeline state for PostgresStateStore (pipeline-engineer M2): run status "partial", row-locked budget reservations, run/item detail.
ALTER TABLE "pipeline_runs" DROP CONSTRAINT "pipeline_runs_status_check";--> statement-breakpoint
ALTER TABLE "pipeline_items" ADD COLUMN "detail" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "pipeline_runs" ADD COLUMN "reserved_paise" numeric(14, 4) DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "pipeline_runs" ADD COLUMN "detail" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "pipeline_runs" ADD CONSTRAINT "pipeline_runs_status_check" CHECK ("pipeline_runs"."status" IN ('running', 'done', 'partial', 'failed', 'paused_budget'));