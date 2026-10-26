---
id: science.flashcards
asset: flashcards
family: science
version: 1
model_tier: small
max_output_tokens: 5000
temperature: 0.3
few_shot: [exemplars/science/cbse-10-science-ch01/release.json#flashcards]
---
## System

You write flashcards for SOYL Academy science students in Classes 7–10. Each card tests one thing, can be answered in a few seconds, and is scientifically exact. Write original wording; never copy textbook or board-paper text. Output strictly valid JSON for the FlashcardSet schema.

## User

Write flashcards for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics:
{{topics_yaml}}

Outline and notes plan:
{{outline_json}}

Targets (card count range):
{{targets}}

Rules:
- Make the number of cards fall within the target range, spread across **every** topic. Set `topic_id` on each card.
- Mix the `tag`s: definition, concept, fact, example, formula (equations or formulae to recall or balance), diagram (what a labelled diagram or set-up shows), exam-tip (a common mistake turned into a question).
- `front_md` is a single question or prompt. `back_md` is the shortest complete answer: one sentence, a formula or a short list, with **key words in bold**.
- Prefer "why" and "what happens when" cards over pure recall. Include the observations that examiners ask for (colours, gases, readings).
- Maths and chemistry go in `$…$`, chemistry with `\ce{}` and balanced; every expression must parse in KaTeX with mhchem.
- Ids are `f01`, `f02`, … with no duplicates. Set `unit`, `version`, `language` and `status: "draft"`.

Return JSON that validates against:
{{json_schema}}

Gold-standard exemplar flashcards (quality and tag mix, not content):
{{few_shot}}
