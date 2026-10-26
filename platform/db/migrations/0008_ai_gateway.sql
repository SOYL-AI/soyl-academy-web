-- AI gateway (ai-gateway M4, ADR-013/014): credit wallets (row lock for reserve + lazy daily grant, AC-07),
-- daily AI spend per scope for the circuit-breaker (D-015), queued AI jobs (evaluation, paper-from-upload,
-- upload processing), ai_requests plan/degraded/simulated, uploads processed derivative, and the
-- full-text-search fallback for tutor retrieval (content_chunks.search_vector). Down: 0008_ai_gateway.down.sql.
CREATE TABLE "ai_jobs" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"kind" text NOT NULL,
	"user_id" uuid NOT NULL,
	"request_id" text,
	"action" text,
	"status" text DEFAULT 'queued' NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"result" jsonb,
	"error_code" text,
	"attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp with time zone,
	"run_after" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_jobs_kind_check" CHECK ("ai_jobs"."kind" IN ('evaluation', 'paper_from_upload', 'upload_process')),
	CONSTRAINT "ai_jobs_status_check" CHECK ("ai_jobs"."status" IN ('queued', 'running', 'succeeded', 'failed')),
	CONSTRAINT "ai_jobs_attempts_check" CHECK ("ai_jobs"."attempts" >= 0)
);
--> statement-breakpoint
CREATE TABLE "ai_spend_daily" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"ist_day" date NOT NULL,
	"scope" text NOT NULL,
	"spent_paise" numeric(14, 4) DEFAULT 0 NOT NULL,
	"requests" integer DEFAULT 0 NOT NULL,
	"alert_level" smallint DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_spend_daily_scope_check" CHECK ("ai_spend_daily"."scope" IN ('all', 'free')),
	CONSTRAINT "ai_spend_daily_values_check" CHECK ("ai_spend_daily"."spent_paise" >= 0 AND "ai_spend_daily"."requests" >= 0 AND "ai_spend_daily"."alert_level" >= 0)
);
--> statement-breakpoint
CREATE TABLE "credit_wallets" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"plan_id" text DEFAULT 'free' NOT NULL,
	"last_grant_day" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "content_chunks" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('simple'::regconfig, "text")) STORED;--> statement-breakpoint
ALTER TABLE "ai_requests" ADD COLUMN "plan_id" text;--> statement-breakpoint
ALTER TABLE "ai_requests" ADD COLUMN "degraded" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_requests" ADD COLUMN "simulated" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "uploads" ADD COLUMN "processed_key" text;--> statement-breakpoint
ALTER TABLE "uploads" ADD COLUMN "processed_content_type" text;--> statement-breakpoint
ALTER TABLE "ai_jobs" ADD CONSTRAINT "ai_jobs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_wallets" ADD CONSTRAINT "credit_wallets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ai_jobs_user_created_idx" ON "ai_jobs" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "ai_jobs_status_run_after_idx" ON "ai_jobs" USING btree ("status","run_after");--> statement-breakpoint
CREATE UNIQUE INDEX "ai_jobs_request_id_unique" ON "ai_jobs" USING btree ("request_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ai_spend_daily_day_scope_unique" ON "ai_spend_daily" USING btree ("ist_day","scope");--> statement-breakpoint
CREATE UNIQUE INDEX "credit_wallets_user_unique" ON "credit_wallets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "content_chunks_search_idx" ON "content_chunks" USING gin ("search_vector");