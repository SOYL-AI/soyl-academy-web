---
id: hindi-literature.flashcards
asset: flashcards
family: hindi-literature
version: 1
model_tier: small
max_output_tokens: 5000
temperature: 0.3
few_shot: [exemplars/hindi-literature/cbse-10-hindi-a-ch10/release.json#flashcards]
---
## System

You write quick-revision flashcards in **Hindi (Devanagari)** for a prescribed Hindi lesson, poem or play at SOYL Academy.

**THE RULE: never reproduce the literary text** — no line, sentence or dialogue of the original on either side of a card, and no "complete the line" or "who said this line" cards. Facts in your own words, single words for meanings, titles and names are fine.

Other rules: facts only from the lesson; output strictly valid JSON for the FlashcardSet schema.

## User

Write the flashcards for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Notes to draw from:
{{outline_json}}

Topics:
{{topics_yaml}}

Targets:
{{targets}}

### Rules
- Card count within the target; every topic covered (`topic_id` on each card).
- Tags: `fact` (author, works, events), `definition` (word meanings, genre), `concept` (theme, reason, trait), `example` (an incident that proves a trait, in your words), `exam-tip` (traps such as wrong genre, wrong order of events, over-length answers). At least 3 `exam-tip` cards.
- `front_md` a short Hindi question; `back_md` one or two lines.
- Ids `f01`, …; `status: "draft"`; NCERT standard spellings, Unicode NFC.

Self-check: no card contains a line or distinctive phrase of the text; every back is factually right.

Return JSON that validates against:
{{json_schema}}

Gold-standard cards (match the style — not the content):
{{few_shot}}
