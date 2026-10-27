# assessment-designer — CBSE 10 test series (Science, Mathematics, Social Science) — 2026-10-27

Status: **done** for all three subjects. Mathematics and Social Science pass `assemble --series --strict` (exit 0). Science exits 2 only because chapters ch14 and ch15 have no content yet. Both are formative-only chapters, and the Lead has assigned them to another producer.
Branch: `platform/assessment-designer/cbse10-series`, worktree `C:/Users/Prabhu/soyl-wt/assessment-cbse10-series`. It includes `origin/platform/main` up to d06cb0a, which adds SST ch04 and ch19–21.

## What was built

A test series per subject, as CONTEXT §10 requires: chapter tests for every chapter (these ship with each chapter's `tests.json`), 3 unit / half-syllabus tests, 6 full mocks per paper variant in exact board pattern, and the CBSE 10 May second-exam track (2 papers per variant). Each subject's series is frozen in `platform/content/authored/series/<subject>.json`, and the production `release` step publishes it (ADR-019).

| Subject | Series papers | Marks / time | Items per mock (incl. choice alternatives) | Mocks | Overlap across the mocks | May papers reusing a mock question |
|---|---|---|---|---|---|---|
| Science (086) | 11: unit 1–3, mock 1–6, May 1–2 | unit 50 / 120 min; mock and May 80 / 180 min | 45 (39 questions + 6 alternatives) | 6 | **0 %** (270 of 270 items distinct) | 8 / 90 |
| Mathematics Standard (041) | 3 unit tests (shared with Basic), mock 1–6, May 1–2 | as above | 44 (38 + 6) | 6 | **0 %** (264 of 264) | Standard + Basic May together: 81 / 176 (mostly questions from the *other* variant's mocks) |
| Mathematics Basic (241) | basic mock 1–6, basic May 1–2 | as above | 44 | 6 | **0 %** (264 of 264) | (above) |
| Social Science (087) | 11: unit 1–3, mock 1–6, May 1–2 | as above | 43 (38 + 5) | 6 | **0 %** (258 of 258) | 4 / 86 |

There are 41 frozen papers in total. Every paper is checked by `content-pipeline/test/series.test.ts`:
- **Blueprint match:** the paper matches its blueprint exactly: section order and titles, item type and marks per slot, internal-choice groups (`of` / `attempt`), and section and item chapter scopes.
- **Unit weightage:** every board and May paper carries the syllabus unit marks exactly.
  - Science: Unit I Chemical 25, II World of Living 25, III Natural Phenomena 12, IV Effects of Current 13, V Natural Resources 5.
  - Mathematics: Number Systems 6, Algebra 20, Coordinate Geometry 6, Geometry 15, Trigonometry 12, Mensuration 10, Statistics and Probability 11.
  - Social Science: 20 marks each for History, Geography, Political Science and Economics.
- **Discipline sections:** sections come from their own discipline. Science Section A is Biology (ch05–08, ch13), B is Chemistry (ch01–04), C is Physics (ch09–12). SST sections A–D are History, Geography, Political Science and Economics. The SST History map question comes from ch02 only.
- **Internal choice:** both alternatives of an internal choice come from the same unit.
- **No repeats or near-duplicates:** no question repeats inside a paper or a series. No two near-duplicate questions (stem similarity ≥ 0.5) share a paper, and none of the former duplicate pairs appears together in any paper.

Competency mark shares are a soft target; the engine scores towards the blueprint's `mark_shares`. The table gives recall+understanding / application / analysis+evaluation marks.

| Subject | Blueprint target | Mocks achieved |
|---|---|---|
| Science | 40 / 24 / 16 | 40/24/16 in mocks 1–5; 33/30/17 in mock 6 |
| Social Science | 24 / 15.6 / 40 | 24/15–16/40–41 |
| Maths Standard | 43 / 19 / 18 | 30–36 / 23–29 / 20–23 |
| Maths Basic | 60 / 12 / 8 | 29–42 / 21–35 / 13–19 |

Maths misses its shares because of how the bank is tagged, not because of the engine: almost all constructed-response items are tagged application or analysis, and no case-based item is tagged recall or understanding. See the gaps below.

## Generation requests found, and how they were filled

1. **SST History map work (Q9).** The board blueprint modelled map work as 1-mark `short` items, and the bank has none of those. Contract v2 has a `map` type, so the blueprint now asks for:
   - History Q9: 1 × `map` worth 2 marks, scoped to ch02 (the only History chapter on the CBSE map list).
   - Geography Q19: 1 × `map` worth 3 marks.
   - The History case question is set as `source-based`, as in the SQP.
   - Section totals are unchanged.
   
   The resulting requests were 6 × map/2 from ch02 and 3 × map/3 from Geography. I hand-authored these questions:

| Chapter | Added | Ids |
|---|---|---|
| SST ch02 Nationalism in India | 8 × map, 2 marks (pairs from Champaran, Kheda, Ahmedabad, Amritsar, Calcutta, Nagpur, Madras, Dandi) | `q_cbse10sst_ch02_099`–`106` |
| SST ch08 Water Resources | 1 × map, 3 marks (Bhakra Nangal, Hirakud, Nagarjuna Sagar) | `q_cbse10sst_ch08_115` |
| SST ch09 Agriculture | 1 × map, 3 marks (jute, rubber and coffee states) | `q_cbse10sst_ch09_121` |
| SST ch11 Manufacturing Industries | 2 × map, 3 marks (Bhilai, Salem, Jamshedpur; Mumbai, Kanpur, Coimbatore) | `q_cbse10sst_ch11_137`, `_138` |

2. **SST Economics section.** It could only be filled once ch19–21 landed; they are now merged and SST passes `--strict` with 0 requests.
3. **Science and Mathematics** needed no new questions. The bank already filled every slot with unit weightage, discipline sections and no repeats.

## Duplicate cleanup (Lead request)

`originality --authored` now reports **0 errors** (it was 28, then 30 after the merge). In each flagged pair, one question was rewritten into a genuinely different question (new numbers, context or skill), with its re-solve check updated. The Maths changes were made in `src/questions.mjs` and the chapters were rebuilt; every build reports "NO ERRORS".

- **Maths ch01:**
  - `_010`: HCF with remainders, now a notebooks-and-pens sharing context (84).
  - `_049`: now the sum and product of 5 ± √3.
  - `_054`: now an LCM problem with three lamps (720 s, 10 times in 2 h).
- **Maths ch02:**
  - `_016`: reciprocal sum, x² − 7x + 12.
  - `_017`: polynomial from a given sum and product.
  - `_037`: find k from the difference of the zeroes.
  - `_040`: find k from a given zero.
  - `_047`: graph crossing points of 25t² − 36.
  - `_053`: area and breadth of a mat, 6x² + 7x − 20.
  - `_055`: squares of the zeroes of x² − 5x + 3.
- **Maths ch10:**
  - `_033`: angle between the tangents from a 124° angle between radii.
- **Maths ch11:**
  - `_031`: area swept by a minute hand.
- **SST:**
  - `q_cbse10sst_ch18_041` and `q_cbse10sst_ch15_062`: both had the generic stem "Match each term with its meaning." Both stems were reworded and the items themselves are unchanged. `ch21_049` was not touched (another producer owns it), and it no longer collides with either.
  - Note: I changed ch18_041 before the Lead asked for ch15_062 to be the one changed. Both had to change anyway, because ch18_041 and ch21_049 would otherwise still share the same stem.
- **Papers:** no frozen paper contains both halves of a former pair (asserted by the test).

## Release-flow change (ADR-019)

`docs/platform/adr/019-frozen-test-series-in-release.md`. I chose to freeze the assembled series in git rather than run `assemble --source db` inside the release, for three reasons:
- **The bank changes.** It changes every time a producer merges, and a db-assembled mock would then be reshuffled on the next deploy.
- **Unordered reads.** The db bank was read without `ORDER BY`.
- **No review.** Nobody would review papers built inside a deploy job.

Mechanics:
- **Freezing.** `npm run content -- assemble --board cbse --class 10 --subject <s> --series --source files --freeze` writes `content/authored/series/<subject>.json`. Freezing is refused unless every series paper assembles.
- **Publishing.** `publish --authored`, the unchanged release command, ingests each subject's frozen series after all of its chapters, with question versions remapped to the published ones.
  - Unchanged papers are left alone, and `test_series` rows are upserted by key.
  - A paper that references an unpublished question refuses the whole series (exit 1).
  - `--chapter`-scoped publishes skip series.
- **No infra change.** `migrate-entrypoint.mjs` changed only in a comment. The folder sits inside `content/authored`, so `bundle-migrate.sh`, the Dockerfile and `CONTENT_AUTHORED_DIR` already ship it.
- **Assembling again.** `assemble --series` (db or files) reuses the frozen papers, so the dev script `api/scripts/dev-content.ts` ends with exactly the production papers.
- **Live mocks unchanged.** The All-India live mocks (live_reserved pool, embargo, `live-admin.ts`) are untouched. Frozen series use the practice bank only; no events were scheduled.
- **Ch14/ch15 landing.** When Science ch14/ch15 land, their chapter tests come with their own `tests.json`. Board-pattern papers never include non-assessed chapters, so the frozen series and published mocks stay unchanged.

## Engine changes (`content-pipeline/src/assemble/*`, `shared/content/blueprint.ts`, `catalog.ts`)

- `BlueprintSection.chapters` and `BlueprintItem.chapters` are optional chapter scopes; the catalog checks the ids. Scopes were added to the Science and SST `board.yaml` and `board-second-exam.yaml`.
- Exact unit weightage for board and May papers (`unitTargets` from `syllabus.units[].marks`). This uses a bounded seeded allocation of slots to units. If the bank cannot meet the weightage, the engine records a generation request rather than build an off-weight paper.
- **Board-pattern integrity** (Lead rule), driven by syllabus data and never by stem text. Unit tests, mocks and May papers never draw from a `board_assessed: false` chapter (SST ch04, Science ch14/ch15). They never use a question tagged with **any** `board_assessed: false` topic: SST ch03-t03, ch12-t02 and ch21-t03, Science ch12-t06, and every topic of a non-assessed chapter. The test also cross-checks that no item carries the "practice only, not assessed" stem label. Chapter tests and student custom tests (chapters the student picks) may still include these items.
- Near-duplicate conflicts never share a paper (`ORIGINALITY.samePaper` in `content-pipeline/config/pipeline.ts`).
- The May track avoids the same variant's mock questions (soft), and no question repeats within a series (hard).
- The bank is sorted by id before the seeded shuffle, so assembly is deterministic whatever the db read order.

## How to verify (from `platform/`)

```
npm run content -- assemble --board cbse --class 10 --subject social-science --series --source files --strict   # exit 0, 11 frozen papers reused
npm run content -- assemble --board cbse --class 10 --subject mathematics --series --source files --strict      # exit 0, 19 frozen papers
npm run content -- assemble --board cbse --class 10 --subject science --series --source files --strict          # exit 2: only ch14/ch15 chapter tests requested
npx vitest run --root content-pipeline test/series.test.ts      # frozen files vs blueprints, weightage, integrity, overlap
npx vitest run --root content-pipeline test/postgres.test.ts    # release idempotency on real PostgreSQL
```
Gate results are in the final report (and below).

## Tests added

- `content-pipeline/test/series.test.ts` (33 tests). For each frozen subject:
  - the file is valid;
  - the plan is complete (3 unit tests, ≥ 6 mocks per variant, May track 2 × variants) and holds no extra papers;
  - each paper matches its blueprint exactly;
  - series metadata matches the plan;
  - board-pattern integrity holds;
  - unit marks are exact, with same-unit choice pairs;
  - there are no repeats within a series;
  - there are no near-duplicates or former pairs in a paper;
  - frozen papers are reused unchanged.
  
  Engine tests check that assembly is independent of bank order, that discipline sections are filled with exact unit marks, that an impossible weightage becomes a request, that practice-only topics are excluded, and that frozen papers are reused while a missing question becomes a request.
- `content-pipeline/test/postgres.test.ts`, test "publishes a frozen series idempotently". It runs on real PostgreSQL:
  - **First publish:** publishes the series.
  - **Second publish:** unchanged, with no duplicate `test_series` or `tests` rows.
  - **New question in a chapter:** the chapter is re-released, and the series stays unchanged with an identical definition.
  - **`assemble --series --source db`:** reuses the frozen paper.
  - **Unpublished question:** a frozen paper that references one is refused with exit 1.

## Known gaps / follow-ups

- **Science ch14 and ch15** (Periodic Classification, Evolution; formative only) have no content. Until they land, their 4 chapter tests (`t_cbse10sci_ch14_short/long`, `t_cbse10sci_ch15_short/long`) are generation requests, and Science `--strict` exits 2. They assemble automatically (or ship via `tests.json`) once the chapters are authored. The frozen Science series does not change, and the release stays idempotent.
- **Maths competency shares** are below the blueprint targets, for Basic in particular, because of how the bank is tagged (see above). Fix this by re-tagging routine computations as understanding, or by adding recall/understanding constructed-response and case items. Then re-freeze before launch.
- **Standard and Basic Maths** draw from one bank, so their mocks share questions across variants. This is acceptable because a student takes one variant.
- **Re-freezing** is deliberate and produces new test versions. If more mocks are wanted later, add papers (mock 7…) rather than re-freezing mocks that students have already attempted.

## Decisions made

ADR-019. Blueprint changes for SST: map type, source-based History case, discipline scopes. Board-pattern integrity rule. The `ORIGINALITY.samePaper` threshold is 0.5.

## Needs from owner

None.

## Gate results (2026-10-27, after merging d06cb0a)

```
npm test -w @soyl/content-templates                          Test Files 1 passed · Tests 463 passed · exit 0
npm run content -- lint --exemplars                          all units 0 error(s) · exit 0
npm run content -- verify --board cbse --class 10 --authored  66 unit(s), 5352 questions, 0 blocking flag(s) · exit 0
npm run content -- originality --authored                    66 unit(s), 0 error(s) · exit 0
npm test -w @soyl/content-pipeline                           Test Files 8 passed · Tests 269 passed · exit 0
npx vitest run --root api test/content.test.ts               Test Files 1 passed · Tests 13 passed · exit 0
npx vitest run --root db test/db6-split.test.ts              Test Files 1 passed · Tests 8 passed · exit 0
npm run typecheck                                            all workspaces · exit 0
npm run content -- catalog                                   catalog valid: 0 error(s), 0 warning(s)
assemble --series --source files --strict                    social-science 0 · mathematics 0 · science 2 (ch14/ch15 chapter tests only)
```
