# pipeline-engineer — M2: content contract v2 and pipeline stages 5–9 with Postgres state — 2026-10-27

Status: **done**, green (stand-in, D-010).
- All nine stages run end to end on the mock provider and on hand-authored content, against embedded PostgreSQL locally.
- Azure OpenAI, Azure AI Speech and Azure Blob are implemented and tested against a fake `fetch`. They switch on by env once OA-02 is done; deployment is out of scope (D-025).

Branch: `platform/pipeline-engineer/m2` (worktree `C:/Users/Prabhu/soyl-wt/pipeline-engineer-m2`). `origin/platform/main` is merged up to 4f40e77, which includes the CBSE language syllabi, maths ch01–04 and science ch02–05. Part A was merged earlier as bdab615.

## What changed

| Path | What |
|---|---|
| `platform/shared/content/question.ts` | **Contract v2.**<br>- New types: `writing`, `map`, `code-output`, `ordering`. `code-output` and `ordering` are in `OBJECTIVE_TYPES`.<br>- `word_limit` on writing/short/long.<br>- `passage_origin` on case/source.<br>- `format`, `rubric`, `map_id`.<br>- Answer shapes `{order}`, `{output}`, `{places}`. |
| `platform/shared/content/{common,blueprint,visual,grading,script}.ts` | - `common.ts`: the underline marker `++word++`.<br>- `blueprint.ts`: `Blueprint.variant`.<br>- `visual.ts`: optional `PlotVisual.spec.vlines`/`hlines` and `points[].on_curve`.<br>- `grading.ts` (new): code-output and ordering graders.<br>- `script.ts` (new): generic Indic-script checks. |
| `platform/content-templates/exemplars.test.ts`, `README.md` | Gate:<br>- NFC.<br>- Well-formed Brahmic script.<br>- No ≥ 3-word Latin runs.<br>- TTS-safe narration.<br>- Script headings.<br>- Majority script.<br><br>The language comes from `subjects.yaml` `script`, otherwise from the content language. Helper folders without `release.json` are ignored. |
| `platform/ai-core/src/{budget,client}.ts` | `BudgetLedger` interface. `ModelClient` awaits reserve/settle/release, so a Postgres budget can plug in. |
| `platform/content-pipeline/src/state-pg.ts` | `PostgresStateStore` over the `pipeline_*` tables and `content_budget_ledger`. `PgBudget` keeps row-locked reservations (below). |
| `src/stores.ts` | `DbAccess`: `DATABASE_URL`, or the `@soyl/db` embedded dev server on port 54320. Also `--state pg\|file` selection and the migration check. |
| `src/sources.ts` | Loads `out/` units, `content/authored` and the exemplars. |
| `src/verify/checks.ts`, `src/commands/verify.ts` | Stage 5. |
| `src/originality/ngrams.ts`, `src/commands/originality.ts` | Stage 6. |
| `src/assemble/{engine,series}.ts`, `src/commands/assemble.ts` | Stage 7: blueprint engine, test-series planner, DB/file banks, test ingestion. |
| `src/blob.ts`, `src/tts/{speech,ogg-opus,audio}.ts`, `src/commands/tts.ts` | Stage 8:<br>- `BlobStore`: local, or Azure Blob REST.<br>- `SpeechProvider`: Azure Speech REST + SSML, or a mock that writes valid silent Ogg Opus.<br>- Content-addressed audio keys. |
| `src/commands/publish.ts` | Stage 9 publish and `rollback`. |
| `src/commands/coverage.ts` | Counts published content in Postgres, with a file fallback. |
| `src/cli.ts` | New commands and flags; exits with the command's code. |
| `src/lint/*` | Lint additions (below). Also: board/class default blueprints (`<board>/blueprints/<class>/*.yaml`) are now loaded; they were silently skipped before. |
| `templates/verify.v1.md` | Fallback independent-solve template. |
| `test/{lint-v2,stages,postgres,tts-blob}.test.ts` | New suites (below). |
| `platform/.gitignore` | `catalog/sources/reference/`: owner-supplied reference texts are never committed. |
| `docs/platform/adr/006-content-storage.md` | ADR-006 (Accepted): releases, Blob vs Postgres, versioning, audio keys, rollback. |

### Changes under `platform/db` (outside my usual paths, as allowed)

- **Migration `0003_contract_v2`** (up + down + test `db/test/contract-v2.test.ts`):
  - `questions_type_check` gains the 4 new types.
  - Adds `question_keys.rubric jsonb`.
  - The down migration fails on purpose if v2-type questions exist.
- **Migration `0004_pipeline_state`** (up + down):
  - Run status `partial`.
  - `pipeline_runs.reserved_paise numeric(14,4)` and `pipeline_runs.detail jsonb`.
  - `pipeline_items.detail jsonb`.
  - backend-api has built 0005 on top of it. I agreed not to renumber or change it.
- **`db/src/student-questions.ts`:** the DB-6 split/join carries `format`, `word_limit`, `map_id` and `passage_origin` in the student body. `rubric` stays on the key side (`question_keys.rubric`, and `childKeys[].rubric`). `rubric` is added to `STUDENT_QUESTION_FORBIDDEN_FIELDS`.
- **`db/package.json`:** exports `./embedded`, so the content CLI can start the dev server.
- **`db/vitest.config.ts`:** testTimeout raised from 60 s to 240 s. The full catalog seed (now 7,440 chapters) timed out under parallel load. This was already failing on platform/main.

## Contract v2 summary (for renderers and the API)

**Question types**
- **`writing`.** The answer is `{ model_answer_md }`. Also required:
  - `format`: letter-formal, letter-informal, email, notice, message, advertisement, article, report, speech, essay, paragraph, story, diary, resume, precis, translation or other.
  - `word_limit: { min, max }`.
  - `rubric: [{ criterion, marks, descriptor_md? }]`, summing to `marks`. The rubric is key-side.

  Graded by self or AI evaluation against the rubric.
- **`map`.** The answer is `{ places: [{ id, name, accepted[], kind? }] }`. Optional `map_id`, e.g. `india-political`; the renderer defines the ids and must ship outline maps for them. The stem labels places A, B, … Graded by self or AI evaluation. Lint expects 1 mark per place.
- **`code-output`.** The stem contains a fenced block whose language is one of python, java, c, cpp, javascript, sql, html, css, bash, pseudocode or text. The answer is `{ output }`. It is auto-graded with `codeOutputMatches()` from `shared/content/grading.ts`: CRLF→LF, trailing spaces trimmed, leading and trailing blank lines dropped, inner spacing kept.
- **`ordering`.** The items are `options` (≥ 3). The answer is `{ order: [option ids] }`. It is auto-graded all-or-nothing with `orderingMatches()`; `orderingPositionsCorrect()` gives feedback. **Shuffle items at display time.**

**Other fields**
- **`word_limit` on `short`/`long`:** optional. Show it as "Answer in min–max words".
- **`passage_origin`:** soyl-original | soyl-commentary | licensed-excerpt. Show a label such as "SOYL commentary — not from the textbook" for literature passages. Lint refuses `licensed-excerpt` until licensing exists.
- **Underline:** `++word++` inside Markdown, on one line, with no spaces just inside the markers. Render it as an underlined inline element (`<ins>`/`<u>` styled), using `UNDERLINE_RE` from `shared/content/common.ts`. It is not recognised inside code or `$…$`; `C++` is left alone. `<u>` stays forbidden. `__x__` is bold in CommonMark, so it is not used.
- **Plot:** `vlines: [{ x, label?, dashed? }]` and `hlines: [{ y, label?, dashed? }]`, both optional and backwards compatible. `points[].on_curve: false` marks a deliberately free point.
- **Blueprint `variant: { code, name }`:** the assembler builds one mock series per variant. Until curriculum adds the field, the variant is taken from the id suffix (`…-board-basic` → "Basic").
- **`slide.audio: { key, duration_ms }`.**
  - Blob key `audio/<unit>/<deck>/<slide>-<hash>.ogg`.
  - The format is Ogg Opus (`audio/ogg`), default `ogg-24khz-16bit-mono-opus`. Azure has no AAC output.
  - **Web must check iOS Safari playback.** If it fails, the fallback is `AZURE_SPEECH_OUTPUT_FORMAT=webm-…-opus`, which needs an allow-list change in `speech.ts`.

## What web and API need to do for the new types

1. **Web (web-platform / design-system).**
   - Renderers for `writing`: prompt, format badge, word-limit counter, and a textarea with a live word count; show the rubric after submission.
   - `map`: an outline map per `map_id` with labelled pins, or the "mark on your printed map" fallback.
   - `code-output`: show the code block, with a monospace textarea for the answer.
   - `ordering`: drag-to-order with a keyboard alternative, items shuffled.
   - The underline marker in `remark-soyl`.
   - Plot `vlines`/`hlines`.
   - A `passage_origin` label.
   - An audio player for `slide.audio`, with the Safari check above.
2. **API (backend-api).**
   - Grade `code-output` and `ordering` on submit with `shared/content/grading.ts`.
   - Treat `writing` and `map` like long answers (self or AI evaluation). AI evaluation should send the rubric and `word_limit`.
   - Expose `format`, `word_limit`, `map_id` and `passage_origin` from `questions.body`.
   - Expose `rubric` only after submission (it is in `question_keys`).
   - Resolve a unit's content through its **active release**. After `rollback`, `content_releases.status` flips, but the newer item rows stay `is_current` (see "Known gaps").
3. **Root build.** Run `npm run build` at the repo root after merging; the web compiles `platform/shared`. Every v2 field is optional or `.optional()`, and `common.ts` regexes use no lookbehind, so no breakage is expected (STATUS backlog lesson). I could not run the root build in this worktree because it has no root `node_modules`.

## Stage summary

**Stage 5 `verify`**
- **Deterministic checks**, in `verify/checks.ts`:

  | Check | Severity |
  |---|---|
  | Arithmetic inside solutions and model answers | critical |
  | Numerical key reached by the solution | major / minor |
  | Key-side equation balance | critical |
  | The solution's answer letter vs the key | critical |
  | Duplicate option texts | major |
  | Assertion-reason with 4 options | major |
  | Match pairs one-to-one | critical |
  | Blanks mentioned in the solution | minor |
  | `javascript` code-output run in a `node:vm` context (no host objects, no string code generation, 500 ms) | critical |

- **Independent solve:** by the verify tier, in batches of 12. Critical/major flags make a question regenerate with the same slot and id, then re-verify; after 2 regenerations it becomes `needs_review`.
- **Resume:** per question (`q:<id>`).
- **`--authored`:** deterministic checks only. All 12 hand-written chapters: 0 blocking flags.

**Stage 6 `originality`**
- **Reference overlap:** n-gram overlap with reference texts. A field fails on a shared run of ≥ 12 words or ≥ 20% of its 6-grams; literature chapters fail on ≥ 6 words.
- **Bank duplicates:** exact stems, or Jaccard of 5-grams ≥ 0.7. Pairs are found through an inverted index, so the check scales to the whole bank. Mock-vs-mock pairs are ignored.
- **Literature rule:** applied per field.
- **No reference texts exist yet,** so the overlap check prints a notice and is skipped.

**Stage 7 `assemble`**
- **Engine:**
  - Hard rules: type and marks match exactly (a `short`/`long` slot also takes a `numerical`); competency and difficulty constraints; no repeats within a paper or a series.
  - Every scope chapter must have questions.
  - Scored: chapter spread, topic coverage, difficulty ramp, and either/or alternatives from the same chapter.
  - Seeded and deterministic. Output is validated by `TestDefinition`, so marks are exact.
- **Series per CONTEXT §10:**
  - All classes: chapter tests.
  - Classes 10/12: 3 unit/half-syllabus tests, 6 mocks per variant, and the May track (CBSE 10).
  - Classes 7/8/9/11: unit tests, half-yearly + annual, and term 1/2.
  - The 2 live mocks are M3 events.
- **Shortages:** recorded as generation requests in `out/assemble/<subject>/generation-requests.json` and the state store, and printed.

**Stage 8 `tts`**
- Content-addressed audio.
- Mock audio is marked `#simulated`, so it never satisfies a real run.
- Authored chapters get an `audio.json` manifest that publish merges.

**Stage 9 `publish`**
- **Writes:** a ChapterRelease to the BlobStore, ingested and activated together with its chapter tests.
- **Generated units:** need lint 0 errors and a verify report. Only `auto_verified` questions ship. If a check-slide question fails, the unit is refused.
- **Versioning:** unchanged content is skipped; changed items get version + 1.
- **Mock content:** refused unless `--allow-mock`, and always in production. It is recorded in `build.checks.mock` and never counts toward coverage.
- **`rollback --unit --to`** re-activates an earlier release.

**Budget**
- With `--state pg`, every reservation runs in a transaction that locks every running run row `FOR UPDATE ORDER BY id`.
- It checks run spend + reservations and total spend (ledger) + all reservations against the caps, then increments `reserved_paise`.
- Real-money total cap: `content_budget.cap_paise` (`config_values.CONTENT_BUDGET_INR`), else `CONTENT_BUDGET_TOTAL_INR`.
- Tested: 8 parallel reservations of 300 against a 1,000 cap from two runs → exactly 3 succeed.

**Lint additions (Part A and the maths producer's requests)**

| Rule | Severity |
|---|---|
| v2 type rules, `answer.word-limit` | warning |
| `passage.licensed` | error |
| `passage.origin`, `literature.quote-review` (quotes of 8–25 words) | warning |
| `markdown.underline` | error |
| `script.*` | error |
| `language.spelling`, `language.nukta` (Hindi) | warning |
| Bare LaTeX command names in maths without a backslash (`Rightarrow`, `times`, `ne` …) | error |
| Control characters or line breaks inside inline maths | error |
| `balance.answer-keys` (one position holds > 45% of MCQ keys, or a position is never used) | warning |
| `visual.plot-points` (marked points lie on a curve or on a `vlines`/`hlines` entry; if one zero is marked, all are) | error |
| Fenced code is never parsed as maths or HTML | — |

- **Arithmetic opt-out** (documented in the README): write deliberately false claims with `\ne`, or say "wrong", "incorrect", "mistake", "is false" or "not true" (गलत, त्रुटि) in the same sentence.
- **Real findings on existing content** (warnings, nothing blocks):
  - Hindi ch10 has 17 of 22 MCQ keys = (b).
  - Science ch01 has 11 of 24 keys = (b).
  - Hindi ch10 has 9 quotes for review and 6 passages without `passage_origin`.

## How to verify (from `platform/`; real output)

```
$ npm run typecheck                         → ai-core, api, content-pipeline, db, e2e, shared, worker: tsc clean (exit 0)
$ npm test -w @soyl/shared -w @soyl/ai-core -w @soyl/content-pipeline -w @soyl/content-templates -w @soyl/db
@soyl/shared             Test Files 4 passed (4)   Tests 46 passed (46)
@soyl/ai-core            Test Files 1 passed (1)   Tests 26 passed (26)
@soyl/content-pipeline   Test Files 7 passed (7)   Tests 233 passed (233)
@soyl/content-templates  Test Files 1 passed (1)   Tests 85 passed (85)
@soyl/db                 Test Files 10 passed (10) Tests 86 passed | 1 skipped (87)
```
One run of the db suite lost a worker to a Windows native crash: exit 0xC0000409 in `migrations.test.ts` while the machine was loaded. The suite was green on rerun, as shown.

```
$ npm audit --audit-level=high              → exit 0 (4 moderate: drizzle-kit → esbuild, dev-only; unchanged)

$ npm run db -w @soyl/db -- migrate down --to 0 && npm run db -w @soyl/db -- migrate up
applied 0000_foundations / 0001_schema / 0002_policies / 0003_contract_v2 / 0004_pipeline_state — 5 migration(s) applied
$ npm run db -w @soyl/db -- seed catalog
subjects 767, syllabi loaded 644, chapters 7440, topics 26454, blueprints 329, errors []

$ npm run content -- publish --authored
unit                      status     version  questions  tests  detail
cbse-10-hindi-a-ch02      published        1         95      2  blob content/releases/cbse-10-hindi-a-ch02/1.json; tests 2 new / 0 unchanged
cbse-10-hindi-a-ch10      published        1         68      2  …
cbse-10-mathematics-ch01  published        1         70      2  …   (ch02, ch03, ch04: 70 each; ch06: 78)
cbse-10-science-ch01      published        1         77      2  …   (ch02 77, ch03 69, ch04 78, ch05 84)
publish: 12 published, 0 unchanged, 0 refused/failed                     (exit 0)
$ npm run content -- publish --authored     → publish: 0 published, 12 unchanged, 0 refused/failed

$ npm run content -- assemble --board cbse --class 10 --subject science
cbse-10-science: bank 385 question(s) from db; 0/20 paper(s) assembled; 20 generation request(s)
  request t_cbse10sci_ch06_short 10 × * [cbse-10-science-ch06]: no published questions in scope yet: generate and publish the chapter first
  … (ch06–ch15 short + long)
  note: cbse-10-science-ch01..ch05: already has a published chapter-test-short/long (authored tests.json); not re-assembled
$ npm run content -- assemble --board cbse --class 10 --subject science --series
cbse-10-science: bank 385 question(s) from db; 1/31 paper(s) assembled; Postgres: 1 ingested, 0 unchanged; 30 generation request(s)
t_cbse10sci_unit_1  unit-test  50 marks  29 items  4 chapters
  (mocks and the May track need ch06–ch13: generation requests)

$ npm run content -- coverage
cbse   cbse  10   85 subjects  85 syllabi  1003 chapters  deck 12/1003  notes 12/1003  flashcards 12/1003  practice 12/1003  ch.tests 24/2006
subjects with content:
cbse-10-science      15 chapters  5/15 deck/notes/cards/practice  10/30 ch.tests  unit_tests 1/3, full_mocks 0/6, live_mocks 0/2, second_exam_track 0/1
cbse-10-mathematics  14 chapters  5/14 …                          10/28 ch.tests
cbse-10-hindi-a      18 chapters  2/18 …                           4/36 ch.tests
source: published content in Postgres (postgres://postgres:***@localhost:54320/soyl_dev)
total: 767 subjects (644 with syllabus), 7440 chapters; deck 12/7440, …, chapter_tests 24/14880
coverage gate: FAIL (0/767 subjects complete)

Mock end to end, CBSE 12 Physics ch01 (no hand-written content), --state pg:
[generate]     run …: done — {"done":9} — spend ₹26.73 (simulated)                         exit 0
[lint]         ok cbse-12-physics-ch01: 0 error(s), 4 warning(s) (provenance.mock ×4)        exit 0
[verify]       ok cbse-12-physics-ch01 (pipeline): 63/63 pass, 0 regenerated, 0 need review  exit 0
[originality]  notice: no reference texts … skipped; ok: 0 error(s)                          exit 0
[tts]          1 deck, 20 slides synthesized, 41,848 bytes (mock silence)                    exit 0
[publish]      refused: mock placeholder content: pass --allow-mock …                         exit 1
[publish --allow-mock]  published v1, 63 questions; blob content/releases/cbse-12-physics-ch01/1.json;
                        chapter tests: generation requests (1 × short/3m, 3 × short/3m missing)   exit 0
[status]       outline done 1/1 · generate done 8/8 · lint done 5/5 · verify done 69/69 · originality done 1/1 · tts done 1/1 · publish done 1/1
               spend ledger: real ₹0.00, simulated (mock) ₹33.12
[coverage]     cbse-12-physics: deck 0/14 …; 1 unit(s) hold mock placeholder content and are not counted
```
The full outputs are in the session scratchpad: `final1.txt`, `final2.txt`, `final3.txt`.

## Tests added

| Suite | Tests | Covers |
|---|---|---|
| `shared/content/contract-v2.test.ts` | 21 | Each new type (valid and invalid), field placement, passage_origin, variant, underline, grading, script checks across Deva, Taml and Beng |
| `content-pipeline/test/lint-v2.test.ts` | 15 | New lint rules and the maths producer's rules |
| `test/stages.test.ts` | 17 | See below |
| `test/postgres.test.ts` | 8 | See below |
| `test/tts-blob.test.ts` | 25 | Ogg CRC/granule/OpusHead; SSML escaping; Azure Speech + Blob request shapes; retries; key validation; synthesizeDeck |
| `db/test/contract-v2.test.ts` | 3 | v2 round trip through the DB; rubric kept out of the body; type CHECK |

`test/stages.test.ts` covers:
- The verify checks, including the JS sandbox escape attempts.
- The regenerate loop and needs_review after 2 tries.
- `--authored` gives 0 blocking flags.
- Originality: n-grams, duplicates, reference overlap.
- The engine: exact marks, choice groups, versions, the difficulty curve, determinism, no repeats in a series, generation requests, the scope rule.
- The series planner: maths variants Standard and Basic, the May track, term papers.
- File-mode assemble.
- tts.

`test/postgres.test.ts` covers:
- The state store round trip.
- The parallel shared cap.
- The cap from the `content_budget` view.
- Publish: idempotent, version bumps on edit, rollback.
- Test ingestion: unchanged tests stay, changed ones get a new version.
- Coverage from Postgres.
- The mock e2e generate → … → publish `--allow-mock` with mock refusal in production.

## Known gaps / follow-ups

- **Rollback and `is_current`.**
  - `activateRelease` (db-schema) flips `content_releases.status` only; item rows keep `is_current` on the newest version.
  - The API must read through the active release, or db-schema can extend `activateRelease` to re-point `is_current`. This is recorded in ADR-006.
- **db seed skips class-default blueprints.**
  - `seedCatalog` matches only `**/blueprints/*.yaml`, so the 30 board/class defaults in `<board>/blueprints/<class>/` are not in the `blueprints` table.
  - Effect: assembled tests built from defaults get `blueprint_id NULL`.
  - Fix is one regex in `db/src/seed/catalog.ts`, which belongs to db-schema/backend-api. I fixed the pipeline's own loader.
- **Hindi chapter-test overrides vs the exemplar bank.**
  - The CBSE 10 Hindi family overrides (7-, 6- and 8-mark long items; 5-mark source items) don't match the exemplar's question marks.
  - Assembled Hindi chapter tests therefore produce generation requests; the authored tests.json are used instead.
  - curriculum and exemplar authors should align the marks.
- **Mock chapter tests.** The mock question mix comes from the blueprints. Class 12 physics has too few 3-mark shorts for its chapter tests, so publish records generation requests. This is correct, but means mock units have no chapter tests.
- **No reference texts yet.** The originality overlap check is a no-op until the owner adds licensed or reference texts to `platform/catalog/sources/reference/` (gitignored).
- **Speech voices and audio format.**
  - pa-IN, or-IN and as-IN fall back to hi-IN until their voices are confirmed.
  - iOS Safari support for Ogg Opus must be checked by web.
- **`code-output` for non-JS languages** is checked only by the independent solve. There is no Python/Java runtime (D-008).
- **Flaky CLI exit 127.** The CLI exited 127 once when a command started right after the previous embedded-server stop. A rerun was clean; the db CLI behaves the same way. Under parallel load the db test workers can crash natively (0xC0000409); a rerun is green.
- **Blueprint `variant`.** Curriculum should add the `variant` field to Maths Basic and the other variant blueprints. The id-suffix fallback works meanwhile.

## Decisions made

- **Underline is `++text++`, not `__text__`,** because `__text__` is bold in CommonMark.
- **Writing rubric is key-side** (`question_keys.rubric`). It is shown after submission.
- **`numeric.final` is minor when the key is only stated,** because solutions often end with a "Check" line. Arithmetic slips stay critical.
- **Generation requests are recorded and assemble still exits 0.** `--strict` makes them exit 2. Coverage is the gate.
- **Mock content can be published only with `--allow-mock`, outside production.** It is labelled in the release and never counted.
- **Default state is `pg` when `DATABASE_URL` is set,** else `file`. Postgres-only stages start the embedded dev server when `DATABASE_URL` is unset.
- **ADR-006 accepted.**

## Needs from owner

- **OA-02:** Azure OpenAI deployments. Also Speech and Blob resources when deployment starts: the env names are in the README, and the roles are Storage Blob Data Contributor and Cognitive Services Speech User.
- **Optional:** reference texts for the originality stage, placed locally in `platform/catalog/sources/reference/` and never committed.
