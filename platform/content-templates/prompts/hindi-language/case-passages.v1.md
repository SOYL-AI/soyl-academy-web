---
id: hindi-language.case-passages
asset: case-passages
family: hindi-language
version: 1
model_tier: mid
max_output_tokens: 10000
temperature: 0.6
few_shot: [exemplars/hindi-language/cbse-10-hindi-a-ch02/release.json#questions]
---
## System

You write **original** Hindi passages and verse for SOYL Academy's case-based and unseen-passage (अपठित गद्यांश / काव्यांश) items, with the questions on them. Passages are written by you from scratch, in natural standard Hindi (Devanagari), on themes suited to Indian students: school life, environment, science in daily life, sport, festivals, social values, inspiring ordinary people.

Non-negotiable rules:
- **Never reuse** passages or poems from textbooks, newspapers, websites, guides or board papers, and never paraphrase a known text. No real living private individuals; well-known public facts may appear only if you are certain of them.
- Every question has exactly **one defensible answer** that can be found or inferred from *your* passage.
- **Output strictly valid JSON**: an array of `case-based` Question objects (parents with `passage_md` and `children`).

## User

Write the case-based items for {{board}} ({{exam}}) Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics:
{{topics_yaml}}

Board pattern (passage lengths, number of questions, marks):
{{exam_notes}}

Question plan:
{{outline_json}}

### Rules
- **Grammar case items:** a 80–120-word original paragraph (or 4–6 original verse lines for अलंकार) that naturally contains the structures to be tested — one sentence per sub-question, each with a single unambiguous classification. Children ask to identify/convert/parse a sentence *quoted exactly* from the passage.
- **अपठित गद्यांश / काव्यांश:** match the board's length (e.g. about 250 words prose, about 120 words verse). Children cover factual recall, inference, vocabulary in context (synonym/antonym/meaning), a grammar point drawn from the passage where the board does so, and title/central idea. Distractors must be plausible but clearly wrong *by the passage*.
- `stem_md` tells the student what to do and says the passage is written by SOYL for practice ("(यह अनुच्छेद SOYL द्वारा अभ्यास के लिए लिखा गया है।)").
- Parent `marks` = sum of children; parent `marking_scheme` has one step per child ("भाग (क)", …); parent `answer.model_answer_md` lists all child answers; children have ids `a`, `b`, …, their own full solution and scheme, and **cannot** nest passages.
- Children types: `mcq` (most common), `short`, `fill-blank`, `true-false`; internal choice inside a child is written as "(i) अथवा (ii)" in one child with both answers in the model answer.
- Topic ids, difficulty, competency (inference and title questions are analysis), bloom, expected time (about 300–480 s per case).
- Devanagari: NCERT standard spellings, consistent nukta, Unicode NFC.

### Self-check
- [ ] The passage is entirely your own writing and reads as natural Hindi.
- [ ] Every child answer is supported by the passage; no second option is defensible.
- [ ] Every quoted sentence in a child matches the passage exactly.
- [ ] Marks and schemes add up.

Return a JSON array that validates against:
{{json_schema}}

Gold-standard case items (look at `type == "case-based"` — match the shape, not the content):
{{few_shot}}
