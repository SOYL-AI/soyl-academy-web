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
- **Board-pattern integrity** (unit tests, mocks, May track), from the syllabus data and never from stem text: no chapter with `board_assessed: false` (CBSE 10 SST ch04, Science ch14/ch15) is in scope, and no question tagged with **any** topic marked `board_assessed: false` (project / periodic or formative assessment only: SST ch03-t03, ch12-t02, ch21-t03; Science ch12-t06; and every topic of a non-assessed chapter) is selected. Chapter tests (shipped with the chapter) and the student's custom tests (practice pool, chapters the student picks) may use them.
- Near-duplicate questions (`ORIGINALITY.samePaper`: word 5-gram Jaccard ≥ 0.5 over stem + passage) never share a paper.
- No question repeats inside a series (6 mocks: 0 % overlap); the May track avoids the main mocks' questions where the bank allows (soft).
- The bank is sorted by id before the seeded shuffle, so the same bank gives the same paper whatever order it was read in.

## Consequences

- Deterministic, idempotent releases: published mocks change only through a reviewed re-freeze commit. Editing a question that a frozen paper uses still gives that paper a new test version (new question version), exactly as for chapter tests; attempts keep referencing the old versions (D-023).
- When a chapter lands later (e.g. CBSE 10 Science ch14/ch15, formative only), its own `tests.json` adds its chapter tests; frozen papers are untouched. Subjects whose series is not frozen yet (CBSE 10 Social Science until Economics ch19–21 land) get no series in production; freezing them is one command plus a commit.
- Re-freezing is a deliberate act: it replaces the papers (new versions for the changed ones). Do it before students use a series, or add new papers (mock 7, …) instead of re-freezing old ones.
- The All-India live mocks are untouched: they are scheduled events built from the `live_reserved` pool with embargo (ADR-012, `live-admin.ts`); the frozen series use the practice bank only.
- Gate: `content-pipeline/test/series.test.ts` checks every frozen file against the current catalog and bank (complete plan, exact blueprint layout and chapter scopes, exact unit weightage, no repeats, no near-duplicates, only board-assessed questions, frozen papers reused unchanged); `postgres.test.ts` proves the release is idempotent with real PostgreSQL.

## Addendum (2026-10-27, assessment-designer): competency balance and the Maths re-freeze

**Problem.** The first frozen CBSE 10 Maths mocks missed the board's competency mix (Standard 041 target 43 / 19 / 18 marks for recall+understanding / application / analysis+evaluation, mocks 30–36 / 23–29 / 20–23; Basic 241 target 60 / 12 / 8, mocks 29–42 / 21–35 / 13–19). The engine only scored competency softly, and the Maths bank tagged nearly every routine written answer as application or higher.

**Decision.**

- **Board-pattern papers are balanced, not just scored.** For paper types in `COMPETENCY_BALANCE.paperTypes` (`board`, `board-second-exam`; `content-pipeline/config/pipeline.ts`) the planner derives targets from the blueprint `mark_shares` (`competencyTargetsFor`, shares must add up to 1 within 1 %). After the greedy fill, the engine makes single swaps inside the same slot and unit scope (so blueprint layout, unit weightage, no-repeat and near-duplicate rules are untouched) to minimise the band deviation plus the band mismatch between internal-choice alternatives.
- **How marks are counted.** Case and source-based items count per part at each part's competency (`competencyMarksOf`; a part with alternatives splits its marks between them). The tolerance (`toleranceMarks: 3`) must hold **whichever alternatives a student attempts** (`competencyRangeByBand`: per band, the least and the most marks over every choice).
- **Never a silent miss.** A paper still outside the tolerance is built but returned with `shortfalls`: generation requests naming the band, slot type, marks and the unit's chapters. `assemble` records them like other requests, so `--strict` exits 2 and `--freeze` refuses the series. A frozen paper that is off target gets a note on every `assemble --series` run ("re-freeze to rebalance").
- **`--refreeze <series,…>`** (with `--freeze`) re-assembles only the listed series of a frozen file and keeps every other frozen paper as it is. A full `--freeze` gives the same mocks and May papers (assembly per series is independent); only the unit tests would be redrawn.
- **Rewritten former duplicates stay apart.** The pairs rewritten on 2026-10-27 (`ORIGINALITY.keepApart`) are added to the engine's conflicts, so they never share a paper even though their texts no longer look alike.

**Re-freeze of CBSE 10 Mathematics only.** `assemble --board cbse --class 10 --subject mathematics --series --source files --freeze --refreeze mocks,may,mocks_basic,may_basic` replaced the 16 Standard and Basic mocks and May papers; the 3 unit tests are byte-identical. This creates new test versions for those 16 papers. It is acceptable now because no series has been released to students (production has never published a frozen series); after launch, add papers (mock 7, …) instead. Science and Social Science frozen files are byte-identical; under the new per-part, any-choice measure all 16 of their board and May papers are off target. Science mocks 3, 5 and 6 and SST mocks 3–6 and May 2 are off even on average; the others are off because their choice alternatives mix bands. `assemble` reports them as notes and `series.test.ts` asserts that they are reported; re-freezing them is a separate, reviewed decision.

**Consequences.** Every frozen Maths board and May paper is within ±3 marks of its band targets whichever alternatives a student attempts (asserted by `series.test.ts`). Subjects frozen later fall under the rule automatically; only `FROZEN_BEFORE_COMPETENCY_BALANCE` in the test (CBSE 10 Science and Social Science) is exempt, and only until they are re-frozen.
