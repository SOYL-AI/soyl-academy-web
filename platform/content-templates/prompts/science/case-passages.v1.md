---
id: science.case-passages
asset: case-passages
family: science
version: 1
model_tier: mid
max_output_tokens: 10000
temperature: 0.5
few_shot: [exemplars/science/cbse-10-science-ch01/release.json#questions]
---
## System

You write case-based (source/passage-based) science questions for SOYL Academy in the style of the {{board}} competency-based section. Every passage is newly written, scientifically exact and set in a real Indian context, and its questions can only be answered by using it. Never reproduce or adapt passages or questions from textbooks, board sample or past papers, or other publishers. Output strictly valid JSON.

## User

Write case-based questions for {{board}} ({{exam}}) Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics (use only these ids):
{{topics_yaml}}

Board pattern and exam notes:
{{exam_notes}}

Blueprints (marks per case, child structure, internal choice):
{{blueprint_yaml}}

Outline (experiments, contexts, misconceptions):
{{outline_json}}

Rules:
- Write **at least 5 cases**, together covering the chapter's main topics. In the field `type: "case-based"`, use these kinds:
  - at least two **data cases**: a short scenario plus a markdown table of observations or measurements (for example readings over time, outcomes under different conditions, a comparison of samples). The questions require reading or extending the data.
  - at least one **lab case**: a school or field experiment described step by step in fresh words.
  - at least one **everyday or industry case**: a household, farm, health, transport or local-industry situation in an Indian town.
- **Passage (`passage_md`)**: 80–150 words, at Class {{class}} reading level. It contains every fact the questions rely on, plus nothing misleading. Name places and people realistically and vary them. Real colours, readings and units must be correct.
- **Children:** 3 or 4 child questions that add up to the parent's `marks` (4 marks unless the blueprint says otherwise). Use this pattern:
  - (a) 1-mark `mcq`, and (b) 1-mark `short`, `fill-blank` or `numerical`. These test reading and understanding of the passage.
  - (c) a 2-mark `short` with an **internal choice**. The stem begins "Answer **either** (i) **or** (ii)." and gives two alternatives of equal difficulty. `model_answer_md` answers both, and each `marking_scheme` step names how marks are split for (i) and for (ii).
  - At least one child per case must be at application or analysis level (using the data, predicting, explaining).
- Children have ids `a`, `b`, `c` (and `d`) and the full question fields (stem, options or answer, `solution_md` with steps, `marking_scheme` adding up to its marks, difficulty, competency, bloom, topic_ids, expected_time_sec). Children cannot contain passages.
- **Parent fields:** `id` `q_{{chapter_id}}_NNN` (continue after the practice bank's last number), `stem_md` "Read the passage and answer the questions that follow.", `answer.model_answer_md` (all parts), `solution_md` (all parts), `marking_scheme` with one step per part, overall `difficulty` and `competency`, union of `topic_ids`, `expected_time_sec` about 420–540, `status: "draft"`, `version: 1`.
- Maths and chemistry go in `$…$` (mhchem `\ce{}` balanced, with state symbols where asked); every expression must parse in KaTeX.
- Before answering, re-solve every child from the passage alone and confirm the key.

Return a JSON array of case-based questions that validates against:
{{json_schema}}

Gold-standard exemplar (see its case-based items — data tables, lab and everyday passages, either/or part (c)):
{{few_shot}}
