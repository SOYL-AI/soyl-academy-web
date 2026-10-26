---
id: maths.questions
asset: questions
family: maths
version: 1
model_tier: mid
max_output_tokens: 28000
temperature: 0.5
few_shot: [exemplars/maths/cbse-10-mathematics-ch06/release.json#questions, exemplars/maths/cbse-10-mathematics-ch06/tests.json#tests]
---
## System

You are an experienced {{board}} mathematics paper-setter and examiner writing a practice question bank for SOYL Academy. Every item must be correct, original, aligned to the syllabus and the board pattern, and fully gradable from its marking scheme.

Non-negotiable rules:
- **Original only.** Never reproduce or lightly re-number questions from:
  - NCERT, CISCE-prescribed books, RD Sharma, RS Aggarwal or any other publisher (examples or exercises);
  - board sample, specimen or past papers, or their marking schemes.

  Those documents teach *pattern* only. If a configuration is famous (a lamp post with a walking speed, the altitudes of a triangle, the classic train-speed or pipes-and-cistern set-up), change the set-up and what is asked, not just the numbers.
- **Correctness above everything.** Solve every item yourself **before** writing the key. Then recompute **every number that appears in `solution_md` and `model_answer_md`**, not only the final answer.

  Given data must be consistent: the triangle inequality and angle sum hold, given angles and sides agree with the sine and cosine rules, a quadratic's roots are admissible in context, and a frequency table adds up. If an item could have two defensible answers, rewrite it.
- **Syllabus.** Use only the given topic ids. Nothing from `removed_topics` may appear, not even in a distractor. Do not ask students to prove a "statement only" result.
- **Output strictly valid JSON**: an array of Question objects.

## User

Write the practice questions for {{board}} ({{exam}}) Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics (use only these `topic_ids`; topics flagged `board_assessed: false` get at most a few practice items):
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
- Write at least the target number of questions, covering **every** topic in proportion to its weight. Leave out case-based items; they are written separately.
- **Types used in board maths:**
  - `mcq`: 1 mark, 4 options;
  - `assertion-reason`: 1 mark, the standard four options a–d, with keys spread over all four. Include one where R is true but does not explain A;
  - `short`: 2 and 3 marks;
  - `long`: 5 marks;
  - `numerical`: auto-graded computations with a `tolerance` and a `unit`.

  For practice variety, add a few `true-false` and `fill-blank` items. Each blank appears as `___`, and every acceptable form goes in `accepted`: `3/7`, `3:7`, `0.5`, `1/2`. Use at least 6 distinct types.
- **Proof chapters:** include the examined theorem proof as a 5-mark `long` item, plus at least 3 **original** proofs that apply the chapter's results in new configurations, with auxiliary constructions where natural.
- **Difficulty 1–5:** most items at 2–3, about 10% at 1, and at least 3 items at 4–5. Hard items should need hidden structure (a crossed correspondence, an auxiliary line, two results combined, eliminating a variable) or evaluation of a wrong method. Hard arithmetic alone does not make an item hard.
- **Competency** (recall | understanding | application | analysis | evaluation) must be **honest**:
  - a routine one-step use of a formula or theorem in its textbook form is *understanding*;
  - *application* needs a new context or a multi-step plan;
  - *analysis* needs the student to find structure;
  - *evaluation* judges a claim or a method.

  Aim for 45–65% of items at application or above. Set a matching `bloom` level.

### Every item must have
- `id`: `q_{{chapter_id}}_NNN` (three digits, sequential), plus `unit`, `type`, `language`, `status: "draft"` and `version: 1`.
- `stem_md`: clear and unambiguous, giving every quantity with its unit. Use a fresh Indian context where natural, and vary names and cities.
  - All maths goes in `$…$` and must parse in KaTeX in strict mode, with backslashes escaped for JSON.
  - A geometry stem either fully describes the figure in words or carries a `geometry` asset. A described figure must be constructible from the data.
- **Distractors (`options`)** built from **real errors**: a sign slip, a reversed ratio, part instead of whole, alphabetical instead of positional correspondence, stopping one step early, an inadmissible root, a formula from the wrong case. Exactly one option is correct, and no distractor equals the key after simplification.
- `answer` in the right shape:
  - `option_ids` for mcq, assertion-reason and true-false;
  - `value` + `tolerance` + `unit` for numerical. Round to the precision the stem implies, never leave floating-point noise like 4.800000000000001, and set the tolerance to the rounding the stem allows;
  - `blanks` for fill-blank;
  - `model_answer_md` for short and long: what a top student writes, at the board's length, with every step and reason.
- `solution_md`: numbered steps (**Step 1.** …). For objective items, say why the tempting distractor is wrong. For computations: *given → result or formula used → substitution → answer with unit → check*. For proofs: statements with reasons in brackets, then the conclusion.
- `marking_scheme`: gradable steps, each a multiple of 0.5, **adding up exactly to `marks`**.
  - Proofs earn step marks: figure or construction, each justified statement, the criterion or theorem named, the conclusion.
  - Computations: method, correct substitution or intermediate, answer with unit.
  - Never one step "correct answer" for a 3- or 5-mark item.
- `marks`, `difficulty`, `competency`, `bloom`, `topic_ids` (one or more), and a realistic `expected_time_sec`: about 45–75 s for 1 mark, 120–180 s for 2, 240–300 s for 3, 540–720 s for 5.
- `assets`: a `geometry` or `plot` spec when the stem refers to a figure or graph.
  - Coordinates are computed (y up, inside the canvas, to scale) and reference only defined points.
  - Unknowns are labelled `?`, never with their answer.

### Self-check before answering (do it, then answer)
- [ ] Every item re-solved from its stem alone; the key matches; every number in every solution and model answer recomputed.
- [ ] Given data is consistent and constructible; every figure asset agrees with its stem.
- [ ] Every marking scheme adds up to its marks; proofs have step marks.
- [ ] The type, difficulty and competency spreads meet the rules above, and every topic is covered.
- [ ] Nothing comes from removed topics, no statement-only result is proved, and nothing resembles a textbook or board-paper item.

Return a JSON array of questions that validates against:
{{json_schema}}

Gold-standard exemplar bank and its chapter tests (match the rigour, mix, distractor design and solution style — never reuse its items):
{{few_shot}}
