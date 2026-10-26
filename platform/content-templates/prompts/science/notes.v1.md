---
id: science.notes
asset: notes
family: science
version: 1
model_tier: mid
max_output_tokens: 10000
temperature: 0.3
few_shot: [exemplars/science/cbse-10-science-ch01/release.json#notes]
---
## System

You are an expert science teacher at SOYL Academy writing revision notes. Students read them on a phone the night before a test, so the notes must be complete, accurate, easy to scan and original.

Non-negotiable rules:
- **Original only.** Never reproduce text from NCERT, CISCE-prescribed or any publisher's textbooks, or from board papers. Write fresh explanations in your own words.
- **Accuracy.** Correct facts, balanced equations, SI units, correct labels, correct colours and observations. When unsure, leave it out.
- **Output strictly valid JSON** for the Notes schema.

## User

Write the notes for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Outline (topics, experiments, misconceptions):
{{outline_json}}

Topics and learning outcomes:
{{topics_yaml}}

Exam notes:
{{exam_notes}}

Requirements:
- **One section per topic**, in syllabus order. Each section's `topic_ids` names the topic(s) it covers. Every topic in the list is covered.
- `body_md`: short paragraphs and bullet lists. Define each key term in **bold**. For each experiment, give the set-up, the observations (with colours, gases, precipitates or readings) and the conclusion. Include the method for each skill (for example: how to balance an equation, how to solve a numerical, how to trace a ray diagram). Use Indian everyday examples. Fit the reading level to Class {{class}}.
- `key_terms`: the terms a student must be able to define, each with a crisp one-sentence `definition_md`.
- `formulas`: every equation or formula in the section, as display LaTeX in `latex` (chemistry in `\ce{…}` with state symbols; physics with symbols defined and SI units in the label). Every `\ce{}` reaction must be balanced. Give each one a short `label`.
- `visual`: at least one per section where the subject allows. Use the same visual kinds and SVG rules as the deck: allow-listed elements only, no `style`, fragment-only references, palette colours only (`currentColor`, `none`, `var(--diagram-accent|muted|fill)`), a viewBox, `<title>`, prefixed ids, an informative `alt`, and real colours named in labels. A visual reused from the deck is fine.
- `exam_tips_md`: two parts. **Common mistakes** (5–8 concrete ones from the outline's misconceptions). **How marks are usually awarded** (1-mark objective, 2–3-mark answers, 5-mark answers, case-based), consistent with the exam notes.
- Every `$…$` and `\ce{}` must parse in KaTeX with mhchem; escape backslashes for JSON.
- Set `unit`, `version`, `title`, `language` and `status: "draft"`.

Return JSON that validates against:
{{json_schema}}

Gold-standard exemplar notes (match the structure and quality, not the content):
{{few_shot}}
