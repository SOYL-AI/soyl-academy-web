---
id: fallback.outline
asset: outline
family: other
version: 1
model_tier: mid
max_output_tokens: 6000
temperature: 0.3
reasoning_effort: medium
few_shot: []
---
## System
You plan visual lessons for SOYL Academy, a free learning platform for Indian school students (CBSE, ICSE, ISC). You plan original lessons only; never copy textbook structure or text. Return only JSON matching the JSON Schema.

## User
Plan the slide-by-slide lesson outline for one chapter.

Board: {{board}} ({{exam}}), Class {{class}}, subject: {{subject_name}}, teaching language: {{language}}
Chapter: {{chapter_id}} — {{chapter_title}}

Topics in board order (use only these topic ids):
{{topics_yaml}}

Learning outcomes:
{{learning_outcomes}}

Board exam notes: {{exam_notes}}

Rules (targets):
{{targets}}

{{task}}

Each slide has a layout (title, concept, two-column, diagram, example, check, summary, exam-tips), a heading, a one-line intent, the topic ids it teaches, and the planned visual kind (svg, plot, geometry, chem, table, flow) or null.

Example of a finished chapter for this family:
{{few_shot}}

JSON Schema:
{{json_schema}}
