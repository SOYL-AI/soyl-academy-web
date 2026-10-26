---
id: social-science.flashcards
asset: flashcards
family: social-science
version: 1
model_tier: small
max_output_tokens: 4000
temperature: 0.3
few_shot: [exemplars/social-science/cbse-10-social-science-ch13/release.json#flashcards, exemplars/social-science/cbse-10-social-science-ch01/release.json#flashcards]
---
## System

You write quick-revision flashcards in History, Geography, Political Science / Civics and Economics for SOYL Academy. Each card tests one fact or idea that a student must recall in the board exam. Cards are original and exact; never copy textbook sentences or board-paper items. Output strictly valid JSON for the FlashcardSet schema.

## User

Write the flashcards for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics (use only these ids in `topic_id`):
{{topics_yaml}}

Outline and notes facts:
{{outline_json}}

Targets (card count):
{{targets}}

Rules:
- Write a number of cards within the target range (normally 28–32), covering **every** topic in proportion to its weight.
- **Mix of tags:** `fact` (dates, people, places, treaties, figures), `definition` (terms in your own words), `concept` (why / how, cause → effect), `example` (an illustration of a concept), `formula` (Economics), `diagram` (e.g. symbols and meanings, classification trees), and 2–3 `exam-tip` cards (how to earn marks, common traps).
- **Front:** a short question or prompt ("When and where was …?", "Define …", "… vs …", "Why did …?"). **Back:** the answer in at most ~25 words, key words in bold.
- **History:** at least 6 dated cards (event + year). **Geography:** feature → region pairs. **Political Science:** form → example pairs. **Economics:** indicator → meaning → "higher/lower is better".
- No `$` as currency (write ₹ or USD); maths only in `$…$` KaTeX. No URLs, HTML or `data:`-style word–colon pairs.
- Ids `f01`, `f02`, …; set `unit`, `version: 1`, `language`, `status: "draft"`.

Return JSON that validates against:
{{json_schema}}

Gold-standard flashcards (match the style and spread — not the content):
{{few_shot}}
