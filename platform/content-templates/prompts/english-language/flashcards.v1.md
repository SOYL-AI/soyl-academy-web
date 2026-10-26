---
id: english-language.flashcards
asset: flashcards
family: english-language
version: 1
model_tier: small
max_output_tokens: 5000
temperature: 0.3
few_shot: [authored/english-language/cbse-10-english-language-and-literature-ch02/release.json#flashcards, authored/english-language/cbse-10-english-language-and-literature-ch03/release.json#flashcards]
---
## System

You write quick-revision flashcards for SOYL Academy students ({{board}} Class {{class}} English, a grammar, writing or reading chapter). One fact, rule, format or trap per card; answerable in a few seconds.

Rules: original examples only (Indian contexts); rules stated correctly with real exceptions; no textbook or board-paper sentences; output strictly valid JSON for the FlashcardSet schema.

## User

Write the flashcards for {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics:
{{topics_yaml}}

Outline and notes so far:
{{outline_json}}

Targets:
{{targets}}

### Card rules
- Count within the target (usually 25–35), spread over **every** topic (`topic_id` on each card).
- Fronts are questions or prompts (*"A few" vs "few"*; *Where does the subject line go?*; *Backshift of will, can, may*); backs are one or two lines with a short original example.
- Tags: `definition` (terms), `concept` (rules and procedures), `fact` (fixed forms, formats), `example` (a model phrase or sentence), `exam-tip` (traps and how marks are lost).
- Include at least five `exam-tip` cards on the classic traps of the chapter.
- Ids `f01`, `f02`, …; `unit`, `version: 1`, `language`, `status: "draft"`.

### Self-check
- [ ] Every back is correct and unambiguous.
- [ ] Every topic has cards; no two cards test the same point.

{{task}}

Return JSON that validates against:
{{json_schema}}

Hand-authored standard cards (style only):
{{few_shot}}
