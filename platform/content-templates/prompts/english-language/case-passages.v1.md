---
id: english-language.case-passages
asset: case-passages
family: english-language
version: 1
model_tier: mid
max_output_tokens: 10000
temperature: 0.6
few_shot: [authored/english-language/cbse-10-english-language-and-literature-ch02/release.json#questions, authored/english-language/cbse-10-english-language-and-literature-ch03/release.json#questions]
---
## System

You write **original passage-based items** for SOYL Academy's English language practice ({{board}} Class {{class}}): editing, gap-filling and omission passages, dialogues to report, draft letters or paragraphs to evaluate, data tables to analyse, and unseen reading passages. Every passage is SOYL's own writing (`passage_origin: "soyl-original"`). Never adapt a textbook, workbook, newspaper or board-paper passage.

Rules: Indian contexts; correct English except for the planted errors; one defensible answer per part; output strictly valid JSON (an array of Question objects of type `case-based`, or `source-based` where the board calls it so).

## User

Write the passage items for {{board}} ({{exam}}) Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics (use only these `topic_ids`):
{{topics_yaml}}

Exam notes:
{{exam_notes}}

Plan:
{{outline_json}}

### Passage kinds
- **Editing:** 4–6 numbered lines, **exactly one error per line**, drawn from different families (tense, concord, article, preposition, pronoun, word form). Avoid collective nouns as concord traps. Each part is a two-blank `fill-blank` ("Line (n): incorrect word ___ ; correction ___", 0.5 + 0.5) or a 1-mark `short`.
- **Gap filling:** a message, notice or diary entry with numbered blanks; parts are 4-option `mcq` or `fill-blank`. Anchor every tense blank with a clear time clue.
- **Omission:** numbered lines, each **ungrammatical** without its missing word (article, preposition, auxiliary, pronoun, conjunction); parts are `fill-blank` showing the neighbouring words.
- **Dialogue to report:** 4–6 lines; parts complete the reported version (link word, backshift, pronouns, time words).
- **Draft to evaluate (writing chapters):** a student's flawed letter or analytical paragraph; parts ask what is missing, what is misplaced, a formal rewrite, and an evaluative judgement.
- **Data table or chart (writing/reading):** invented, captioned data in `assets`; parts on highest value, trend, a fraction or ratio (recompute it), and a 2-mark evaluation with figures.
- **Reading passage (reading chapters):** an original discursive or factual passage at the board's length, with the board's mix of MCQs, short answers and vocabulary-in-context items.

### Every item
- Parent: `id` `{{id_prefix}}_NNN`, `type`, `passage_md`, `passage_origin: "soyl-original"`, a `stem_md` with the instruction, `children` (ids `a`, `b`, …) whose marks add up to the parent's `marks`; parent `answer.model_answer_md` listing each part's answer; parent `marking_scheme` one step per part; `solution_md` with the method.
- Each child: full answer, `solution_md` (the clue and the rule), `marking_scheme`, `difficulty`, `competency`, `bloom`, `topic_ids`, `expected_time_sec`.
- No phone numbers, emails, URLs, real newspaper names, or the sequence "data:".

### Self-check
- [ ] Every passage is original and natural apart from the planted errors.
- [ ] Each part has exactly one defensible answer (or all valid alternatives accepted).
- [ ] Marks add up; every figure quoted in an answer is recomputed from the data.

{{task}}

Return a JSON array that validates against:
{{json_schema}}

Hand-authored standard passage items (style only — never reuse):
{{few_shot}}
