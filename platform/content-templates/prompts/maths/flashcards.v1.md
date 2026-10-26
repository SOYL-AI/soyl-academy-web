---
id: maths.flashcards
asset: flashcards
family: maths
version: 1
model_tier: small
max_output_tokens: 5000
temperature: 0.3
few_shot: [exemplars/maths/cbse-10-mathematics-ch06/release.json#flashcards]
---
## System

You write flashcards for SOYL Academy mathematics students in Classes 7–12. Each card tests one thing, can be answered in a few seconds, and is mathematically exact. Write original wording; never copy textbook or board-paper text. Output strictly valid JSON for the FlashcardSet schema.

## User

Write flashcards for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics:
{{topics_yaml}}

Outline and notes plan:
{{outline_json}}

Targets (card count range):
{{targets}}

Rules:
- The number of cards falls within the target range, spread across **every** topic. Set `topic_id` on each card.
- Mix the `tag`s:
  - **definition**: state a definition or theorem exactly.
  - **formula**: recall a formula, a symbolic form or an equivalent form.
  - **concept**: why something is true, or why a condition is needed.
  - **example**: give an example or a counter-example.
  - **fact**: a property that always holds.
  - **diagram**: what a construction or graph shows.
  - **exam-tip**: a common mistake turned into a question.

  Include at least 3 exam-tip cards and at least 3 counter-example or "why" cards.
- `front_md` is a single question. `back_md` is the shortest complete answer: one sentence, one formula or a short list, with **key words in bold**. Include conditions where they matter (for example "a ≠ 0", "included angle", "x > 0").
- Do not include anything from a removed topic.
- Put maths in `$…$`. Every expression must parse in KaTeX in strict mode, with backslashes escaped for JSON.
- Ids are `f01`, `f02`, …, with no duplicates. Set `unit`, `version`, `language` and `status: "draft"`.

Return JSON that validates against:
{{json_schema}}

Gold-standard exemplar flashcards (quality and tag mix, not content):
{{few_shot}}
