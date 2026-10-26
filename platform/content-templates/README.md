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

Placeholders the pipeline fills: `{{board}}`, `{{exam}}`, `{{class}}`, `{{subject_name}}`, `{{language}}`, `{{chapter_id}}`, `{{chapter_title}}`, `{{topics_yaml}}`, `{{learning_outcomes}}`, `{{exam_notes}}`, `{{blueprint_yaml}}`, `{{outline_json}}`, `{{json_schema}}`, `{{few_shot}}`, `{{targets}}`.
A template must not hard-code anything a placeholder provides. The pipeline records `id@version` on every item it generates.

## Gate
`npm test -w @soyl/content-templates` validates every exemplar against the shared schemas and the editorial targets in `platform/shared/config/content-targets.ts`.
