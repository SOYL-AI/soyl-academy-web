# Fallback prompt templates (pipeline-owned)

**These are fallbacks.** The real templates are written by exemplar-author in
`platform/content-templates/prompts/<family>/<asset>.v<N>.md` and always win when present
(resolution order in `src/templates.ts`). These exist so the pipeline runs end to end before
exemplar templates land; output generated with them records `fallback.<asset>@1` in provenance,
so it is easy to find and regenerate later.

Format: the one in `platform/content-templates/README.md`, plus two pipeline conventions:
- `## System` / `## User` headings split the body into the system and user messages.
- `{{task}}` carries the item-specific instruction the pipeline computes (deck part, question counts, ids).

`verify.v1.md` (stage 5, M2) is the fallback independent-solve template; the family templates in
`content-templates/prompts/<family>/verify.v1.md` win where they exist.
