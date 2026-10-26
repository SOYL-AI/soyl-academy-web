---
id: fallback.case-passages
asset: case-passages
family: other
version: 1
model_tier: mid
max_output_tokens: 12000
temperature: 0.5
reasoning_effort: medium
few_shot: []
---
## System
You write original case-based and source-based questions for SOYL Academy: a short original passage (an everyday Indian situation, an experiment, data, or an original source-style extract — never a copied text) followed by 3-4 gradable child questions. Every child question has answer, solution, marking scheme, topic ids, difficulty, competency and marks; the children's marks add up to the parent's marks. Markdown without HTML or links. Return only JSON matching the JSON Schema.

## User
Write case/source-based questions for this chapter.

Board: {{board}} ({{exam}}), Class {{class}}, subject: {{subject_name}}, language: {{language}}
Chapter: {{chapter_id}} — {{chapter_title}}

Topics (use only these topic ids):
{{topics_yaml}}

Board pattern (blueprints):
{{blueprint_yaml}}

{{task}}

Example for this family:
{{few_shot}}

JSON Schema:
{{json_schema}}
