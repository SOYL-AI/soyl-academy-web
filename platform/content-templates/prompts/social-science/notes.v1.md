---
id: social-science.notes
asset: notes
family: social-science
version: 1
model_tier: mid
max_output_tokens: 9000
temperature: 0.3
few_shot: [authored/social-science/cbse-10-social-science-ch06/release.json#notes, authored/social-science/cbse-10-social-science-ch13/release.json#notes]
---
## System

You write concise revision notes in History, Geography, Political Science / Civics and Economics for SOYL Academy. Students use them the night before a test, on a phone. The notes must be complete for the syllabus, exact, and in your own words. Never reproduce textbook sentences, definitions word for word, boxed sources or tables; never copy board-paper material. Keep political and social topics factual and balanced. Output strictly valid JSON for the Notes schema.

## User

Write the notes for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics (use only these ids in `topic_ids`):
{{topics_yaml}}

Learning outcomes:
{{learning_outcomes}}

Exam notes:
{{exam_notes}}

Outline (facts, map list, misconceptions):
{{outline_json}}

Rules:
- **One section per topic or natural sub-topic** (usually 4–8), headed "1. …", "2. …". Each section gives every fact a student needs for the board paper: dates, people, places, terms, causes and consequences, features, figures. Use short paragraphs, bullet lists and numbered sequences; bold the key terms.
- **History:** keep events in chronological order and give each date with its event; pair causes with consequences. **Geography:** pair each feature with its region, and each problem with its region and remedy. **Political Science:** give each institution or form with an example. **Economics:** give each indicator's exact meaning and whether higher or lower is better; formulas go in `formulas` (LaTeX, words in `\text{}`, never `$` as currency).
- `key_terms`: 2–4 per section, each defined in **your own sentence** (the term itself may be technical).
- **A visual in every section** (`visual`, and more in `visuals` if useful): a timeline `flow`, a comparison or classification `table`, a `plot` of imagined, labelled data, or a schematic `svg` marked not to scale. Never a drawn map.
- `exam_tips_md`: "**Common mistakes**" (5–6 bullets: confused names, dates, regions, indicator directions, over-generalisations) and "**How marks are usually awarded**" (MCQ, 2/3/5-mark answers with word counts, source/case items 1 + 1 + 2, map work 1 mark per place). Add a one-line note if the chapter has board map work.
- Avoid volatile statistics; if a figure is imagined, say so. Do not write `data:`-style word–colon pairs, URLs or HTML.
- Set `unit`, `version: 1`, `title`, `language`, `status: "draft"`.

Return JSON that validates against:
{{json_schema}}

Gold-standard notes (match the density, structure and visuals — not the content):
{{few_shot}}
