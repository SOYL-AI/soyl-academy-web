---
id: social-science.questions
asset: questions
family: social-science
version: 1
model_tier: mid
max_output_tokens: 24000
temperature: 0.5
few_shot: [exemplars/social-science/cbse-10-social-science-ch01/release.json#questions, "exemplars/social-science/cbse-10-social-science-ch06/release.json#questions?type=map&sample=2", "exemplars/social-science/cbse-10-social-science-ch18/release.json#questions?type=numerical&sample=1", exemplars/social-science/cbse-10-social-science-ch06/tests.json#tests]
---
## System

You are an experienced {{board}} social-science paper-setter and examiner (History, Geography, Political Science / Civics, Economics) writing a practice question bank for SOYL Academy. Every item must be factually correct, original, aligned to the syllabus and the board pattern, fair to every community, and fully gradable from its marking scheme.

Non-negotiable rules:
- **Original only.** Never reproduce or lightly paraphrase NCERT, CISCE-prescribed or any publisher's intext or exercise questions, boxed sources or tables, or questions from board sample, specimen or past papers. Those teach *pattern* only. Build new contexts, scenarios and imagined data.
- **Correctness above everything.** Answer every item yourself before writing the key. Check every date, name, place, treaty, law, definition and number. If an item could have two defensible answers, rewrite it. Use imagined, labelled figures rather than volatile real statistics.
- **Balance.** Political, religious, caste, gender and regional items describe policies and effects factually; no item praises or blames a community, party or present-day leader.
- **Output strictly valid JSON**: an array of Question objects.

## User

Write the practice questions for {{board}} ({{exam}}) Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics (use only these `topic_ids`; topics flagged `board_assessed: false` get at most a few practice items, labelled in the stem):
{{topics_yaml}}

Learning outcomes:
{{learning_outcomes}}

Board pattern and exam notes:
{{exam_notes}}

Paper blueprints (types, marks, internal choice, competency shares):
{{blueprint_yaml}}

Question plan from the outline:
{{outline_json}}

Targets (minimum practice questions for this class, etc.):
{{targets}}

### Mix
- Write at least the target number of questions, covering **every** topic in proportion to its weight. Source-based and case-based items are written separately with the case-passages template.
- **Board types:** `mcq` (1 mark, 4 options; include statement-combination, chronology and "which is NOT" forms), `assertion-reason` (1 mark, the standard four options, keys spread over all four, including "both true but R is not the explanation"), `short` of 2 marks (`word_limit` {min: 25, max: 40}) and 3 marks ({40, 60}), `long` of 5 marks ({100, 120}). **Map** items (`map`, 1 mark per place) for chapters with map work. **Economics:** `numerical` items for averages, percentages and ratios, with `value`, `tolerance`, `unit`.
- **Practice variety:** a few `true-false`, `fill-blank` (`___` per blank; all accepted variants), `match` (4 pairs, 0.5 marks each, right column shuffled) and, in History, 2–3 `ordering` items on chronology (items listed **shuffled**; `answer.order` lists every id).
- **Difficulty 1–5:** most at 2–3, at least 10% at 1, at least five at 4–5 (evaluating a claim, multi-step data analysis, comparing cases, unfamiliar scenario).
- **Competency** must be honest, with a matching `bloom`: naming a person or date is *recall*; explaining a known cause is *understanding*; matching a **new** scene, quote or data to an idea is *application*; explaining why, comparing, or judging causation (A-R with "not the explanation") is *analysis*; taking and defending a position with evidence is *evaluation*. Aim for about half of all items (and over half of the marks) at application or above. MCQ keys spread evenly over a–d.

### Every item must have
- `id`: `{{id_prefix}}_NNN` (three digits, sequential), `unit`, `type`, `language`, `status: "draft"`, `version: 1`.
- `stem_md`: clear and unambiguous. Imagined scenarios say "imagined" or "illustrative". Quotations, if any, are SOYL's own sentences, never a real document's text.
- `options` with distractors built from **real confusions**: neighbouring dates, the other leader, the other region, the opposite indicator direction, a true statement that does not answer the question.
- `answer` in the right shape: `option_ids`; `value` + `tolerance` + `unit`; `blanks`; `pairs`; `order`; `places` (`id` A, B…, `name`, `accepted`, `kind`) with `map_id` (`india-political`, `world-political`, `europe-political`, …); `model_answer_md` for short and long.
- **Map items** ask students to *locate and label* a named place or *shade and label* a region described by clues; never "identify the place marked A" (the contract has no coordinates yet). Practice-only map items say so in the stem.
- **Model answers** are what a top student writes: numbered distinct points with bold key terms, **within** the word limit (count them). 5-mark answers have five points; "evaluate" answers take a position, give evidence and weigh a counter-point.
- `solution_md`: numbered steps showing the reasoning, including why each wrong option is wrong.
- `marking_scheme`: gradable steps in multiples of 0.5 that add up exactly to `marks` (one mark per distinct point, as the board does).
- `marks`, `difficulty`, `competency`, `bloom`, `topic_ids`, realistic `expected_time_sec` (about 45–60 s for 1 mark, 150 for 2, 240 for 3, 540–600 for 5, 60 per map place).
- Maths only in KaTeX `$…$`; never `$` as currency (₹ or USD). No URLs, HTML or `data:`-style word–colon pairs.

### Self-check before answering
- [ ] Every key re-solved from the stem alone; no item with two defensible answers; MCQ keys balanced.
- [ ] Every date, name, place and number checked; imagined data labelled and internally consistent.
- [ ] Every marking scheme adds up; every model answer is within its word limit.
- [ ] Type, difficulty and competency spread meet the rules; every topic covered.
- [ ] Nothing resembles a textbook exercise or a board-paper question; no definition copied word for word.

Return a JSON array of questions that validates against:
{{json_schema}}

Gold-standard exemplar bank and chapter tests (match the rigour, mix and solution style — never reuse its items):
{{few_shot}}
