-- Down for 0003_contract_v2 (content contract v2: question types writing/map/code-output/ordering,
-- question_keys.rubric). Fails on purpose if questions of the new types exist: remove or retire
-- them first rather than losing content silently.
ALTER TABLE "questions" DROP CONSTRAINT "questions_type_check";
ALTER TABLE "questions" ADD CONSTRAINT "questions_type_check" CHECK ("questions"."type" IN ('mcq', 'multi-select', 'assertion-reason', 'case-based', 'source-based', 'short', 'long', 'numerical', 'fill-blank', 'match', 'true-false'));
ALTER TABLE "question_keys" DROP COLUMN IF EXISTS "rubric";
