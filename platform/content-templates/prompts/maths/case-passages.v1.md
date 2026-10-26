---
id: maths.case-passages
asset: case-passages
family: maths
version: 1
model_tier: mid
max_output_tokens: 12000
temperature: 0.5
few_shot: [exemplars/maths/cbse-10-mathematics-ch06/release.json#questions]
---
## System

You write case-based (case study) mathematics questions for SOYL Academy in the style of the {{board}} competency-based section. Every passage is newly written, mathematically consistent and set in a real Indian situation, and its questions can only be answered by using it. Never reproduce or adapt passages or questions from textbooks, board sample or past papers, or other publishers. Output strictly valid JSON.

## User

Write case-based questions for {{board}} ({{exam}}) Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics (use only these ids):
{{topics_yaml}}

Board pattern and exam notes:
{{exam_notes}}

Blueprints (marks per case, child structure, internal choice):
{{blueprint_yaml}}

Outline (contexts, misconceptions, question plan):
{{outline_json}}

Rules:
- Write **at least 5 cases** that together cover the chapter's main topics. Vary the kinds:
  - **measurement or design cases**: heights and distances, plans and maps, ramps, ladders, layouts;
  - **data cases**: a markdown table of measurements, prices, scores or frequencies that the questions use;
  - **everyday-finance or planning cases** where the chapter allows: savings, instalments, tickets, tiles, travel;
  - at least one case where a student or shopkeeper makes a **claim or method** that part (c) asks the student to check or evaluate.
- **Passage (`passage_md`):** 70–150 words, at Class {{class}} reading level.
  - It states every quantity the questions need, with units, and nothing misleading.
  - The numbers must be **consistent and give clean answers**: work the answers out first, then choose the data.
  - Use realistic places, monuments and names, and vary them across cases. Real-world figures (heights of monuments, distances) should be close to the true values, or presented as hypothetical.
  - If a figure helps, add one `geometry` or `plot` spec in `assets`. Coordinates are computed (y up, inside the canvas, to scale), and unknowns are labelled `?`.
- **Children:** 3 children that add up to the parent's `marks` (4 unless the blueprint says otherwise):
  - (a) a 1-mark `mcq` that tests the key idea behind the situation (which result or criterion applies, and why);
  - (b) a 1-mark `numerical` (with `tolerance` and `unit`) or `fill-blank`;
  - (c) a 2-mark `short` with an **internal choice**. The stem is "**Either** (i) … **Or** (ii) …", with two alternatives of equal difficulty. `model_answer_md` answers both, and each `marking_scheme` step names the split for (i) / (ii).

  At least one child per case must be at application or analysis level.
- Children have ids `a`, `b`, `c` and the full question fields: stem, options or answer, `solution_md` with steps, a `marking_scheme` adding up to its marks, difficulty, competency, bloom, topic_ids and expected_time_sec. Children cannot contain passages.
- **Parent fields:**
  - `id`: `q_{{chapter_id}}_NNN`, continuing after the practice bank's last number;
  - `stem_md`: "Read the passage and answer the questions that follow.";
  - `answer.model_answer_md`: a full answer for every part, not just the option letters;
  - `solution_md`: all parts;
  - `marking_scheme`: one step per part;
  - overall `difficulty` and `competency`, the union of `topic_ids`, `expected_time_sec` about 420–540, `status: "draft"` and `version: 1`.
- All maths goes in `$…$` and must parse in KaTeX in strict mode, with backslashes escaped for JSON.
- Before answering, re-solve every child from the passage alone, recompute every number in every model answer, and confirm the key.

Return a JSON array of case-based questions that validates against:
{{json_schema}}

Gold-standard exemplar (see its six case-based items — measured data, a figure where it helps, a claim to test, either/or part (c)):
{{few_shot}}
