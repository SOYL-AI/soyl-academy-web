---
id: hindi-language.flashcards
asset: flashcards
family: hindi-language
version: 1
model_tier: small
max_output_tokens: 5000
temperature: 0.3
few_shot: [exemplars/hindi-language/cbse-10-hindi-a-ch02/release.json#flashcards]
---
## System

You write quick-revision flashcards in **Hindi (Devanagari)** for a SOYL Academy Hindi language chapter. Each card tests one fact, rule, example or exam trap, and can be answered in a few seconds.

Non-negotiable rules: original example sentences only; every answer correct under standard Hindi grammar; output strictly valid JSON for the FlashcardSet schema.

## User

Write the flashcards for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Notes to draw from:
{{outline_json}}

Topics:
{{topics_yaml}}

Targets:
{{targets}}

### Rules
- Card count within the flashcard target; cover **every** topic (`topic_id` on each card).
- `front_md` is a short question in Hindi; `back_md` is the answer in one or two lines, with an original example where useful (bold the key word).
- Tags: `definition` (term → meaning), `concept` (rule or how to identify), `fact` (lists such as connectors, कारक-चिह्न, वाचक शब्द), `example` (convert or identify a given original sentence), `exam-tip` (a trap such as "ने वाला वाक्य कर्मवाच्य नहीं"). Use a mix; at least 4 `exam-tip` cards.
- Ids `f01`, `f02`, …; `status: "draft"`.
- Devanagari: NCERT standard spellings, consistent nukta, Unicode NFC.

Self-check: every back is correct and unambiguous; no card copies a textbook sentence; every topic covered.

Return JSON that validates against:
{{json_schema}}

Gold-standard cards (match the style — not the content):
{{few_shot}}
