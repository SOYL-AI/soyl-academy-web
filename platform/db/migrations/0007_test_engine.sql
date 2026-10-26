-- Test engine (backend-api M3, ADR-012): per-item autosave sequence numbers, attempt score split
-- (auto vs self) with rank tie-break time and the percentile flag, and per-test score buckets.
CREATE TABLE "test_score_buckets" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"test_id" uuid NOT NULL,
	"bucket" integer NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "test_score_buckets_bucket_check" CHECK ("test_score_buckets"."bucket" >= 0),
	CONSTRAINT "test_score_buckets_attempts_check" CHECK ("test_score_buckets"."attempts" >= 0)
);
--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "auto_score" numeric(6, 1);--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "self_score" numeric(6, 1);--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "time_taken_sec" integer;--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "counts_for_stats" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "graded_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "responses" ADD COLUMN "client_seq" bigint DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "test_score_buckets" ADD CONSTRAINT "test_score_buckets_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "test_score_buckets_test_bucket_unique" ON "test_score_buckets" USING btree ("test_id","bucket");--> statement-breakpoint
CREATE INDEX "attempts_user_test_idx" ON "attempts" USING btree ("user_id","test_id");--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_client_seq_check" CHECK ("responses"."client_seq" >= 0);