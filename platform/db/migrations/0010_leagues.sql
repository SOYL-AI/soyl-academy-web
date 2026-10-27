-- 0010 leagues (backend-api M5): weekly leagues (`leagues`: one row per IST week x cohort x tier x
-- division; `league_memberships.league_id/tier/outcome`) and the `ai_answer` report type on content_reports
-- ("Report this AI answer", AC-15). Down: 0010_leagues.down.sql.
CREATE TABLE "leagues" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"week_start" date NOT NULL,
	"scope" text NOT NULL,
	"scope_key" text NOT NULL,
	"tier" smallint NOT NULL,
	"division" smallint NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"closed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "leagues_scope_check" CHECK ("leagues"."scope" IN ('class', 'school', 'city')),
	CONSTRAINT "leagues_status_check" CHECK ("leagues"."status" IN ('open', 'closed')),
	CONSTRAINT "leagues_tier_check" CHECK ("leagues"."tier" >= 1),
	CONSTRAINT "leagues_division_check" CHECK ("leagues"."division" >= 1)
);
--> statement-breakpoint
ALTER TABLE "content_reports" DROP CONSTRAINT "content_reports_type_check";--> statement-breakpoint
ALTER TABLE "league_memberships" ADD COLUMN "league_id" uuid;--> statement-breakpoint
ALTER TABLE "league_memberships" ADD COLUMN "tier" smallint DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "league_memberships" ADD COLUMN "outcome" text;--> statement-breakpoint
CREATE UNIQUE INDEX "leagues_cohort_unique" ON "leagues" USING btree ("week_start","scope","scope_key","tier","division");--> statement-breakpoint
CREATE INDEX "leagues_status_week_idx" ON "leagues" USING btree ("status","week_start");--> statement-breakpoint
ALTER TABLE "league_memberships" ADD CONSTRAINT "league_memberships_league_id_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "league_memberships_league_id_idx" ON "league_memberships" USING btree ("league_id");--> statement-breakpoint
ALTER TABLE "league_memberships" ADD CONSTRAINT "league_memberships_outcome_check" CHECK ("league_memberships"."outcome" IN ('promoted', 'stayed', 'relegated'));--> statement-breakpoint
ALTER TABLE "league_memberships" ADD CONSTRAINT "league_memberships_tier_check" CHECK ("league_memberships"."tier" >= 1);--> statement-breakpoint
ALTER TABLE "content_reports" ADD CONSTRAINT "content_reports_type_check" CHECK ("content_reports"."content_type" IN ('deck', 'notes', 'flashcard_set', 'question', 'test', 'ai_answer'));