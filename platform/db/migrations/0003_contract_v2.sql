-- Content contract v2 (pipeline-engineer M2): new question types and the writing rubric (key side, DB-6).
ALTER TABLE "questions" DROP CONSTRAINT "questions_type_check";--> statement-breakpoint
ALTER TABLE "question_keys" ADD COLUMN "rubric" jsonb;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_type_check" CHECK ("questions"."type" IN ('mcq', 'multi-select', 'assertion-reason', 'case-based', 'source-based', 'short', 'long', 'numerical', 'fill-blank', 'match', 'true-false', 'writing', 'map', 'code-output', 'ordering'));