# ADR-019: Frozen test series, published by the release step

Status: accepted (assessment-designer, 2026-10-27)
Related: D-023 (tests reference question versions), D-026 (authored content in git), ADR-012 (test engine), ARCHITECTURE §8 stage 7 / §9, CONTEXT §10.

## Context

CBSE Class 10 subjects need a complete test series in production: 3 unit / half-syllabus tests, at least 6 full mocks in board pattern per paper variant, and the May second-exam track. The production `release` step (migrate job, `migrate-entrypoint.mjs release`) runs `db seed catalog` → `content publish --authored`. Chapter tests already ship with each chapter (`tests.json`). Series papers did not reach production at all: only the local dev script ran `assemble --series --source db`.

Running the assembler inside the release was the obvious option, but it is not stable:

- The paper depends on the whole bank. Each time a producer adds or edits questions in any chapter, the seeded selection changes and every mock would be re-assembled with different questions. Students who had already taken mock 3 would find a different mock 3 (a new test version) after the next deploy.
- The db bank had no fixed order (`SELECT` without `ORDER BY`), so even an unchanged bank was not guaranteed to give the same paper.
- A paper produced inside a deploy job is never reviewed by a person before students see it.

## Options

1. **`assemble --series --source db` in the release step** for subjects whose bank is complete. Simple, but non-deterministic across content changes (above), so a re-run of the release after a content merge changes published mocks.
2. **Freeze the assembled series in git** and let `publish --authored` ingest it like a chapter's `tests.json`. The papers change only when someone re-freezes them in a reviewed commit.

## Decision

Option 2.

- `npm run content -- assemble --board cbse --class 10 --subject <s> --series --source files --freeze` writes `platform/content/authored/series/<subject id>.json` (`FrozenSeriesFile`, `content-pipeline/src/assemble/frozen.ts`): per paper the series key/title/track/position and the `TestDefinition` (question ids and blueprint layout). Freezing is refused unless every series paper of the subject assembles (a frozen series is complete or absent).
- `publish --authored` (unchanged release command) ingests every frozen series in scope **after** all chapters, with question versions remapped to the current published versions (the same rule as chapter `tests.json`). `ingestTests` leaves an unchanged paper alone and upserts the `test_series` row by key, so re-running the release is a no-op. If any referenced question is not published, the whole series is refused and the command exits 1 (never a partial series). A chapter-scoped publish (`--chapter`) does not touch series.
- `assemble --series` (any source, without `--freeze`) reuses frozen papers instead of re-assembling them and excludes their questions from any new paper of the same series. The local dev script (`api/scripts/dev-content.ts`) therefore ends with the same papers as production.
- The folder sits inside `content/authored/` so the migrations image already bundles it (`bundle-migrate.sh` copies `content/authored`, `CONTENT_AUTHORED_DIR`); chapter loaders ignore it (no `release.json`). No change to `migrate-entrypoint.mjs`, `release-cli.ts`, the Dockerfile or Bicep.

The engine was tightened at the same time, so the frozen papers are board-faithful:

- Blueprint sections and items may carry a chapter scope (`BlueprintSection.chapters`, `BlueprintItem.chapters`, optional): Science Biology / Chemistry / Physics, Social Science History / Geography / Political Science / Economics, the History map question from *Nationalism in India* only. The catalog checks the ids.
- Board and May papers carry the syllabus unit marks exactly (`unitTargets` from `syllabus.units[].marks`; a bounded seeded allocation of slots to units, internal-choice alternatives from the same unit). A unit that cannot be filled is a generation request, never an off-weight paper.
- Questions tagged only with `board_assessed: false` topics (project / formative-only) never enter series papers.
- Near-duplicate questions (`ORIGINALITY.samePaper`: word 5-gram Jaccard ≥ 0.5 over stem + passage) never share a paper.
- No question repeats inside a series (6 mocks: 0 % overlap); the May track avoids the main mocks' questions where the bank allows (soft).
- The bank is sorted by id before the seeded shuffle, so the same bank gives the same paper whatever order it was read in.

## Consequences

- Deterministic, idempotent releases: published mocks change only through a reviewed re-freeze commit. Editing a question that a frozen paper uses still gives that paper a new test version (new question version), exactly as for chapter tests; attempts keep referencing the old versions (D-023).
- When a chapter lands later (e.g. CBSE 10 Science ch14/ch15, formative only), its own `tests.json` adds its chapter tests; frozen papers are untouched. Subjects whose series is not frozen yet (CBSE 10 Social Science until Economics ch19–21 land) get no series in production; freezing them is one command plus a commit.
- Re-freezing is a deliberate act: it replaces the papers (new versions for the changed ones). Do it before students use a series, or add new papers (mock 7, …) instead of re-freezing old ones.
- The All-India live mocks are untouched: they are scheduled events built from the `live_reserved` pool with embargo (ADR-012, `live-admin.ts`); the frozen series use the practice bank only.
- Gate: `content-pipeline/test/series.test.ts` checks every frozen file against the current catalog and bank (complete plan, exact blueprint layout and chapter scopes, exact unit weightage, no repeats, no near-duplicates, only board-assessed questions, frozen papers reused unchanged); `postgres.test.ts` proves the release is idempotent with real PostgreSQL.
