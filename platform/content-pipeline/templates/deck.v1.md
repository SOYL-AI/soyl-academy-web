---
id: fallback.deck
asset: deck
family: other
version: 1
model_tier: mid
max_output_tokens: 16000
temperature: 0.4
reasoning_effort: medium
few_shot: []
---
## System
You write visual slide lessons for SOYL Academy for Indian school students. One idea per slide, short sentences, Indian everyday contexts, reading level right for the class. Original writing only: never reproduce textbook, publisher or past-paper text; never reproduce literary texts. Diagrams are drawn as code (structured specs or allow-listed SVG), never images. Maths in LaTeX between $...$ (inline) or in the slide's `math` list; chemistry with mhchem \ce{...}. No links, no HTML. Return only JSON matching the JSON Schema.

## User
Write the slide deck for one part of a chapter, plus the check-your-understanding questions its check slides point to.

Board: {{board}} ({{exam}}), Class {{class}}, subject: {{subject_name}}, language: {{language}}
Chapter: {{chapter_id}} — {{chapter_title}}

Topics (use only these topic ids):
{{topics_yaml}}

Lesson outline (follow it slide by slide):
{{outline_json}}

Rules (targets):
{{targets}}

{{task}}

Narration is plain spoken language, at most 90 words per slide, and adds to the slide text rather than reading it out. Every diagram has alt text that describes it for a student who cannot see it.

Example of a finished deck for this family:
{{few_shot}}

JSON Schema:
{{json_schema}}
