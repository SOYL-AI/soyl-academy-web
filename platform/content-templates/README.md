# Content templates

Owned by **exemplar-author** (AGENTS.md §2). Hand-authored gold-standard chapters and the prompt templates the content pipeline uses to generate everything else.

```
content-templates/
  exemplars/<family>/<chapter-id>/
    release.json        ChapterRelease (platform/shared/content/release.ts): decks, notes, flashcards, questions
    tests.json          { "tests": TestDefinition[] } — the chapter's short and long tests
    README.md           why this chapter is the standard: choices, density, visuals, pitfalls
  prompts/<family>/<asset>.v<N>.md
```

## Families
`maths`, `physics`, `chemistry`, `biology`, `science` (CBSE combined Science, Classes 7–10), `social-science` (history, civics/political science, geography), `economics-commerce`, `english-language`, `english-literature`, `hindi-language`, `hindi-literature`, `computer-science`, `other`.
The subject → family mapping lives in the pipeline config (`platform/content-pipeline`).

## Prompt template format
One file per asset and version: `prompts/<family>/<asset>.v<N>.md`, where `<asset>` is one of `outline`, `deck`, `notes`, `flashcards`, `questions`, `case-passages`, `verify`.

```markdown
---
id: science.deck
asset: deck
family: science
version: 1
model_tier: mid            # small | mid | verify (platform/shared/config/models.ts)
max_output_tokens: 16000
temperature: 0.4
few_shot: [exemplars/science/cbse-10-science-ch01/release.json#decks]
---
(system and user instructions; placeholders in double braces)
```

Placeholders the pipeline fills: `{{board}}`, `{{exam}}`, `{{class}}`, `{{subject_name}}`, `{{language}}`, `{{chapter_id}}`, `{{chapter_title}}`, `{{topics_yaml}}`, `{{learning_outcomes}}`, `{{exam_notes}}`, `{{blueprint_yaml}}`, `{{outline_json}}`, `{{json_schema}}`, `{{few_shot}}`, `{{targets}}`, `{{content_json}}` (the generated content a `verify` template checks), `{{id_prefix}}` (question id prefix derived from the chapter id, e.g. `q_cbse10sci_ch01`).
`few_shot` paths are relative to `content-templates/`; the prefix `authored/` points into `platform/content/authored/` so hand-authored chapters (D-026) can serve as examples without being copied.
A template must not hard-code anything a placeholder provides. The pipeline records `id@version` on every item it generates.

## Gate
`npm test -w @soyl/content-templates` validates every exemplar against the shared schemas and the editorial targets in `platform/shared/config/content-targets.ts`.
It covers `exemplars/` and the hand-authored chapters in `platform/content/authored/` (D-026). Per chapter:

| Check | Rule |
|---|---|
| Valid release | `ChapterRelease` (contract v2: `writing`, `map`, `code-output`, `ordering`, `word_limit`, `passage_origin`; see `platform/shared/content/question.ts`) |
| Named + README | directory = unit id; `README.md` present |
| Topics | every topic id is in the chapter's syllabus |
| Decks | 12–25 slides, summary, exam tips, 3–5 checks; non-text families also ≥ 2 worked examples and a visual every ≤ 3 slides |
| Counts | 20–40 flashcards; ≥ 60 (classes 10, 12) / ≥ 40 practice questions across ≥ 5 types |
| **Own script** (M2) | For a language taught in a non-Latin script (script from `subjects.yaml`, else the content language: hi → Devanagari, ta → Tamil, bn → Bengali, ur → Arabic …), every error rule in `platform/shared/content/script.ts`: Unicode **NFC**; **well-formed** Brahmic text (no vowel sign without a base, two vowel signs, virama + vowel sign, nukta after a non-consonant, doubled anusvara/virama, space before a danda, `।।`); **no run of ≥ 3 Latin words** in student-facing fields (maths, code, CBSE/NCERT/SOYL and (A)/(R) allowed); no field with Latin and none of the script; **narration** without Latin letters, digits (ASCII or native) or symbols; every slide heading in the script; question stems, notes sections and flashcards majority-script. Ported from the Hindi exemplar validator and generic by script. |
| Tests | a short and a long chapter test drawn from the chapter's own question versions, marks matching |

Pipeline lint (`npm run content -- lint --exemplars`) adds the warnings the gate does not fail on: quoted spans of ≥ 8 words in literature chapters (manual reproduction review), passages without `passage_origin` in literature chapters, Hindi non-standard spellings and nukta consistency, competency/difficulty balance.

**Underline.** Language items that need an underlined word ("रेखांकित पद") write `++word++` (one line, no surrounding spaces inside the markers). `<u>` is raw HTML and fails lint; `__word__` is bold in Markdown.
