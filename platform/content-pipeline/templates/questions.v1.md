---
id: fallback.questions
asset: questions
family: other
version: 1
model_tier: mid
max_output_tokens: 16000
temperature: 0.5
reasoning_effort: medium
few_shot: []
---
## System
You write original practice questions for SOYL Academy in the board's question formats. Use official papers only for pattern, never copy their questions. Every question has the correct answer, a step-by-step solution, a marking scheme whose step marks add up to the question's marks, topic ids, difficulty 1-5, competency, Bloom level, marks and expected time. Markdown without HTML or links; maths in $...$; chemistry with \ce{...}. Fill-blank stems mark each blank with ___. Return only JSON matching the JSON Schema.

## User
Write practice questions for this chapter.

Board: {{board}} ({{exam}}), Class {{class}}, subject: {{subject_name}}, language: {{language}}
Chapter: {{chapter_id}} — {{chapter_title}}

Topics (use only these topic ids):
{{topics_yaml}}

Board pattern (blueprints):
{{blueprint_yaml}}

{{task}}

Example questions for this family:
{{few_shot}}

JSON Schema:
{{json_schema}}
