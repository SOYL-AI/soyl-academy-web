# Authored content

Hand-authored production chapters (DECISIONS D-026), written to the exemplar standard while no model endpoint is available.

```
content/authored/<family>/<chapter-id>/
  release.json   ChapterRelease (platform/shared/content/release.ts)
  tests.json     { "tests": TestDefinition[] } — the chapter's short and long tests
  README.md      author notes: scope, verifier pass, known gaps
```

`<family>` uses the same names as `content-templates/exemplars/` (science, maths, hindi-language, …).
Every chapter must pass the content gate: `npm test -w @soyl/content-templates` (schema, syllabus topic ids, deck rules, counts, tests) and the pipeline lint: `npm run content -- lint --exemplars` (covers exemplars and authored chapters).
Content is ingested into Postgres by the pipeline's publish stage (`ingestChapterRelease`, `ingestTestDefinition`).
