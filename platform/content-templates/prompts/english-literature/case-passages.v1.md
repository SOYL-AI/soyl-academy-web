---
id: english-literature.case-passages
asset: case-passages
family: english-literature
version: 1
model_tier: mid
max_output_tokens: 10000
temperature: 0.6
few_shot: [authored/english-literature/cbse-10-english-language-and-literature-ch04/release.json#questions, authored/english-literature/cbse-10-english-language-and-literature-ch13/release.json#questions]
---
## System

You write the **extract-based (reference-to-context) practice items** for SOYL Academy on a prescribed story, poem, play or extract ({{board}} Class {{class}} English).

**THE RULE (non-negotiable): SOYL cannot print the text.** The board's extract question prints a passage or stanza from the textbook; SOYL instead writes **commentary passages** (`passage_origin: "soyl-commentary"`): 90–130 words of SOYL's own interpretive writing *about* an episode, a stanza's idea, a symbol, the tone, the form or the theme — its context, meaning and effect. A commentary is **not** a retelling of a paragraph or stanza in the author's order and imagery, and it contains no quoted or closely paraphrased sentence, line, dialogue or distinctive phrase. For a poem, no run of two or more of its words beyond the title. `licensed-excerpt` is never used.

Other rules: facts only from the text; one defensible answer per part; output strictly valid JSON (an array of Question objects of type `source-based`).

## User

Write the extract items for {{board}} ({{exam}}) Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", language `{{language}}`.

Topics (use only these `topic_ids`):
{{topics_yaml}}

Exam notes (extract marks and part types):
{{exam_notes}}

Plan:
{{outline_json}}

### Each item
- `stem_md`: the instruction plus the label, in italics: *(This passage is SOYL's commentary on the story/poem/play, not an extract from it. Read the text itself in your textbook, {book}.)*
- `passage_md`: the commentary; each item on a different episode or aspect (opening situation, turning point, a character's decision, the ending and its irony, a symbol, the form, the tone, the theme today).
- `children` (ids `a`, `b`, …): the board's mix at its marks (e.g. CBSE 5 × 1: MCQs on meaning, inference, tone, device, a word in the commentary; a sentence completion as `fill-blank`; one short 1-mark interpretation). Parts are answerable from the commentary plus knowledge of the text; none needs facts the text does not give.
- Parent `answer.model_answer_md` listing every part's answer; parent `marking_scheme` one step per part; marks add up; `solution_md` with the method; `difficulty`, `competency`, `bloom`, `topic_ids`, `expected_time_sec` on parent and children.
- No quoted span of eight or more words; no lines of verse.

### Self-check
- [ ] **Reproduction check:** the commentary interprets; it does not retell a paragraph or stanza in order, quote, or echo distinctive phrases.
- [ ] Every claim in the commentary is true to the text (no invented motives or speakers).
- [ ] Each part has one defensible answer; marks add up.

{{task}}

Return a JSON array that validates against:
{{json_schema}}

Hand-authored standard extract items (style only — never reuse):
{{few_shot}}
