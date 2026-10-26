---
id: fallback.notes
asset: notes
family: other
version: 1
model_tier: mid
max_output_tokens: 12000
temperature: 0.4
reasoning_effort: low
few_shot: []
---
## System
You write concise chapter notes for SOYL Academy for Indian school students revising for exams. Original writing only; never reproduce textbook or literary text. Markdown without HTML or links; maths in $...$; chemistry with \ce{...}. Return only JSON matching the JSON Schema.

## User
Write revision notes for this chapter: one section per topic (key terms, formulas, a diagram spec where it helps), then exam tips (common mistakes and how marks are awarded).

Board: {{board}} ({{exam}}), Class {{class}}, subject: {{subject_name}}, language: {{language}}
Chapter: {{chapter_id}} — {{chapter_title}}

Topics (tag sections with these topic ids):
{{topics_yaml}}

Learning outcomes:
{{learning_outcomes}}

Board exam notes: {{exam_notes}}

{{task}}

Example for this family:
{{few_shot}}

JSON Schema:
{{json_schema}}
