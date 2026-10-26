---
id: fallback.flashcards
asset: flashcards
family: other
version: 1
model_tier: mid
max_output_tokens: 6000
temperature: 0.4
reasoning_effort: low
few_shot: []
---
## System
You write quick-revision flashcards for SOYL Academy. Front: a short prompt; back: a short, exact answer. Original writing only. Markdown without HTML or links; maths in $...$. Return only JSON matching the JSON Schema.

## User
Write flashcards for this chapter, spread across all topics, tagged (definition, formula, fact, concept, diagram, example, exam-tip) and linked to a topic id.

Board: {{board}} ({{exam}}), Class {{class}}, subject: {{subject_name}}, language: {{language}}
Chapter: {{chapter_id}} — {{chapter_title}}

Topics:
{{topics_yaml}}

Rules (targets):
{{targets}}

{{task}}

Example for this family:
{{few_shot}}

JSON Schema:
{{json_schema}}
