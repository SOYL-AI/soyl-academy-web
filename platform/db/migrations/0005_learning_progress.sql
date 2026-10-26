-- Learning progress (backend-api M2): lesson_progress, practice_answers, AUTH-11 user_mfa + sessions.mfa_verified_at.
CREATE TABLE "lesson_progress" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"chapter_id" uuid NOT NULL,
	"unit" text NOT NULL,
	"part" smallint DEFAULT 0 NOT NULL,
	"slide_position" smallint DEFAULT 0 NOT NULL,
	"mode" text DEFAULT 'read' NOT NULL,
	"completed_at" timestamp with time zone,
	"source" text DEFAULT 'app' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lesson_progress_mode_check" CHECK ("lesson_progress"."mode" IN ('read', 'listen')),
	CONSTRAINT "lesson_progress_source_check" CHECK ("lesson_progress"."source" IN ('app', 'guest_merge')),
	CONSTRAINT "lesson_progress_part_check" CHECK ("lesson_progress"."part" BETWEEN 0 AND 20),
	CONSTRAINT "lesson_progress_slide_check" CHECK ("lesson_progress"."slide_position" BETWEEN 0 AND 1000)
);
--> statement-breakpoint
CREATE TABLE "practice_answers" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"question_key" text NOT NULL,
	"question_version" integer NOT NULL,
	"chapter_id" uuid NOT NULL,
	"response" jsonb,
	"correct" boolean,
	"marks_awarded" numeric(6, 1),
	"max_marks" numeric(6, 1) NOT NULL,
	"grading" text DEFAULT 'auto' NOT NULL,
	"answered_at" timestamp with time zone NOT NULL,
	"source" text DEFAULT 'app' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "practice_answers_source_check" CHECK ("practice_answers"."source" IN ('app', 'guest_merge')),
	CONSTRAINT "practice_answers_grading_check" CHECK ("practice_answers"."grading" IN ('auto', 'self', 'none')),
	CONSTRAINT "practice_answers_marks_check" CHECK ("practice_answers"."marks_awarded" IS NULL OR ("practice_answers"."marks_awarded" >= 0 AND "practice_answers"."marks_awarded" <= "practice_answers"."max_marks"))
);
--> statement-breakpoint
CREATE TABLE "user_mfa" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"user_id" uuid NOT NULL,
	"totp_secret_enc" text NOT NULL,
	"confirmed_at" timestamp with time zone,
	"recovery_code_hashes" text[] DEFAULT '{}'::text[] NOT NULL,
	"last_used_step" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_mfa_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "mfa_verified_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_chapter_id_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_answers" ADD CONSTRAINT "practice_answers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_answers" ADD CONSTRAINT "practice_answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_answers" ADD CONSTRAINT "practice_answers_chapter_id_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_mfa" ADD CONSTRAINT "user_mfa_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_progress_user_chapter_part_unique" ON "lesson_progress" USING btree ("user_id","chapter_id","part");--> statement-breakpoint
CREATE INDEX "lesson_progress_chapter_id_idx" ON "lesson_progress" USING btree ("chapter_id");--> statement-breakpoint
CREATE INDEX "practice_answers_user_chapter_idx" ON "practice_answers" USING btree ("user_id","chapter_id","answered_at");--> statement-breakpoint
CREATE INDEX "practice_answers_question_id_idx" ON "practice_answers" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "practice_answers_chapter_id_idx" ON "practice_answers" USING btree ("chapter_id");--> statement-breakpoint
CREATE UNIQUE INDEX "practice_answers_guest_merge_unique" ON "practice_answers" USING btree ("user_id","question_key") WHERE "practice_answers"."source" = 'guest_merge';