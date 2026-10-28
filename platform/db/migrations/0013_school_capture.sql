-- 0013 school capture + dashboard goal (backend-api, 2026-10-28; D-014): students whose consent is granted
-- may save their school (picked, or added as an unverified `student` school found-or-created by a
-- normalised name + city key), and a weekly goal for the dashboard. Down: 0013_school_capture.down.sql.
--
-- The keys are written by the API with @soyl/shared/profile/school (Unicode-aware, abbreviations
-- expanded, old city names mapped). Rows that exist before this migration (no code path writes schools
-- up to 0012) get an SQL approximation of the key; an exact duplicate among them would make the unique
-- index fail loudly rather than merge schools silently.
ALTER TABLE "profiles" ADD COLUMN "weekly_goal" smallint;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "name_normalized" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "city_normalized" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "source" text DEFAULT 'student' NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "verified_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "created_by_user_id" uuid;--> statement-breakpoint
UPDATE "schools" SET
	"name_normalized" = btrim(regexp_replace(lower(replace(regexp_replace("name", '[''’`]', '', 'g'), '&', ' and ')), '[^[:alnum:]]+', ' ', 'g')),
	"city_normalized" = coalesce(btrim(regexp_replace(lower(regexp_replace("city", '[''’`]', '', 'g')), '[^[:alnum:]]+', ' ', 'g')), ''),
	"source" = CASE WHEN "udise_code" IS NOT NULL THEN 'udise' ELSE 'student' END;--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "name_normalized" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" ADD CONSTRAINT "schools_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "schools_student_name_city_unique" ON "schools" USING btree ("name_normalized","city_normalized") WHERE "schools"."source" = 'student';--> statement-breakpoint
CREATE INDEX "schools_name_normalized_idx" ON "schools" USING btree ("name_normalized" text_pattern_ops);--> statement-breakpoint
CREATE INDEX "schools_city_name_normalized_idx" ON "schools" USING btree ("city_normalized","name_normalized" text_pattern_ops);--> statement-breakpoint
CREATE INDEX "schools_created_by_user_id_idx" ON "schools" USING btree ("created_by_user_id");--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_weekly_goal_check" CHECK ("profiles"."weekly_goal" IS NULL OR "profiles"."weekly_goal" BETWEEN 1 AND 1000);--> statement-breakpoint
ALTER TABLE "schools" ADD CONSTRAINT "schools_source_check" CHECK ("schools"."source" IN ('student', 'udise', 'cbse'));
