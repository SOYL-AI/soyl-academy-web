# Content: contract, authoring, pipeline, gates and coverage

> As built: 2026-10-28, from `platform/main` @ 49aa8a4. Coverage numbers are computed from the files in `platform/content/authored/**` and `platform/content-templates/exemplars/**` (method at the end).
> Rules: [CONTEXT §8–§10](CONTEXT.md#8-content-standards-apply-to-every-piece-of-content). Design: [ARCHITECTURE §7–§8](ARCHITECTURE.md#7-content-system). Decisions: [D-025, D-026, D-032, D-035, D-036](DECISIONS.md), [ADR-006](adr/006-content-storage.md), [ADR-007](adr/007-diagram-rendering.md), [ADR-019](adr/019-frozen-test-series-in-release.md).
> Package guides: [`platform/content-pipeline/README.md`](../../platform/content-pipeline/README.md), [`platform/content/README.md`](../../platform/content/README.md), [`platform/content-templates/README.md`](../../platform/content-templates/README.md).

## 1. How content is produced today

| | Original design (ARCHITECTURE §8) | As built |
|---|---|---|
| Who writes chapters | The pipeline calls Azure OpenAI in bulk; agents operate and QA it | **Agents hand-author chapters** to the exemplar standard, because no model endpoint exists yet (OA-02). Owner instruction D-025, storage D-026. |
| Where content lives | Postgres + Blob only, never git | **In git** at `platform/content/authored/<family>/<chapter-id>/` (D-026), about 0.3 MB per chapter. The release job ingests it into Postgres and writes release JSON to Blob. |
| Test series | Assembled from the bank at release time | **Frozen in git** at `platform/content/authored/series/<subject>.json` and ingested by the release step (ADR-019). |
| Pipeline | Generates everything | All 9 stages are built and tested on the **mock** provider and on authored content; the Azure OpenAI and Speech adapters are written and unit-tested against their request shapes, never against a live resource. It switches on by configuration when OA-02/OA-03 are done. |

Status labels: authored items are written as `draft`; `publish --authored` moves them to `published` (the "beta" posture of ARCHITECTURE §7.3). Human review to `reviewed` happens after launch.

## 2. The content contract (v2)

zod schemas in `platform/shared/content/` (owned by pipeline-engineer since M1, D-011). One `ChapterRelease` per chapter (`release.ts`) holds:

| Part | Schema | Rules (from `platform/shared/config/content-targets.ts` and CONTEXT §8) |
|---|---|---|
| Decks | `deck.ts` | 12–25 slides per deck (split into parts); layouts `title, concept, two-column, diagram, example, check, summary, exam-tips`; narration ≤ 90 words per slide; a visual at least every 3 slides where the subject allows; 3–5 check questions; goals, summary and exam-tips slides. Optional `slide.audio {key, duration_ms}` (Ogg Opus) once TTS runs. |
| Visuals | `visual.ts`, `svg-allowlist.ts` | Diagrams as code: `svg` (allow-listed), `plot`, `geometry`, `chem` (SMILES), `table`, `flow` (ADR-007). Every visual has `alt`. |
| Notes | `study.ts` | Sections with key terms, formulas, visuals, exam tips. |
| Flashcards | `study.ts` | 20–40 per chapter. |
| Questions | `question.ts` | 15 types (below). Every question: answer, solution, marking scheme with step marks, topic ids, difficulty 1–5, competency, Bloom level, marks, expected time. ≥ 60 per chapter for Classes 10 and 12, ≥ 40 otherwise. |
| Chapter tests | `test.ts` (`tests.json`) | Two per chapter (short + long). Tests reference question **versions** and model internal choice as choice groups (D-023). |
| Blueprints | `blueprint.ts` | Paper patterns in the catalog; v2 adds `variant` (e.g. Maths Standard / Basic), chapter scopes per section/item, unit marks, `mark_shares` for competency. |

**Question types (15).** v1: `mcq`, `multi-select`, `assertion-reason`, `case-based`, `source-based`, `short`, `long`, `numerical`, `fill-blank`, `match`, `true-false`. v2 (M2, migration 0003): `writing` (format, word limit, rubric), `map` (places, `map_id`), `code-output`, `ordering`.
Auto-graded (`OBJECTIVE_TYPES`): mcq, multi-select, assertion-reason, numerical, fill-blank, match, true-false, code-output, ordering. The rest are self-evaluated (free) or AI-evaluated (credits) against the marking scheme or rubric.

**Other v2 fields:** `word_limit` on writing/short/long; `passage_origin` on case/source items (`soyl-original`, `soyl-commentary`, or `licensed-excerpt`, which lint refuses until licensing exists); `++word++` underline marker; plot `vlines`/`hlines`.

**Where the worked solution lives (D-032).** For written types (`short`, `long`, `writing`, case parts) the step-by-step working is `answer.model_answer_md`, shown with the marking scheme after the student answers; `solution_md` may be a short method note. A `solution_md` must not repeat verbatim a ≥ 60-character sentence from student-facing content (the DB-6 contract test treats that as leaked key text).

**Answer separation.** On ingest, every key-side field moves to `question_keys`; students only ever receive `questions.body` (see [data-model.md](data-model.md#answers-never-reach-students-db-6)).

## 3. Authoring workflow (hand-authored, D-025/D-026)

1. **Catalog first.** The chapter must exist in `platform/catalog/<board>/<class>/<subject>/syllabus.yaml` with topic ids. Blueprints for its paper types must exist (subject-specific or class defaults).
2. **Follow the exemplar for the family.** Gold-standard chapters live in `platform/content-templates/exemplars/` (science ch01, maths ch06, Hindi A ch02 grammar, Hindi A ch10 literature). Prompt templates per family are in `content-templates/prompts/` and are also the authoring brief.
3. **Write** `release.json` (decks, notes, flashcards, questions), `tests.json` (short + long chapter tests) and `README.md` (scope, verifier pass, facts a reviewer should double-check) under `platform/content/authored/<family>/<chapter-id>/`. Families: `science`, `maths`, `social-science`, `english-language`, `english-literature`, `hindi-language`, `hindi-literature`.
4. **Run every gate** (section 5). Fix, do not suppress.
5. **Commit** with `content(<board>-<class>-<subject>): ...` and write a handoff in `docs/platform/handoffs/`.
6. The Lead merges to `platform/main`. Production picks it up on the next release job ([publish-content runbook](runbooks/publish-content.md)).

### Originality rules (CONTEXT §8, D-036)

- Write original explanations, examples and questions. Never reproduce text from NCERT, CISCE-prescribed or publisher textbooks, or past papers. Official sample papers and marking schemes define **pattern and scope only**.
- **Literature:** summaries, themes, character sketches, devices, word meanings and questions in our own words. No poem, story or play text. Passages in literature chapters are SOYL commentary (`passage_origin: soyl-commentary`) and labelled as such.
- **D-036: no reconstructed source texts, even in private scratch folders.** Producers must not write out any part of a textbook text from memory to run overlap scans. Originality rests on authoring in own words from the start, a short forbidden-phrase guard list (≤ 4 words per phrase), the repo's `originality` and lint checks, and later the n-gram check against owner-supplied reference texts (`catalog/sources/reference/`, gitignored; none exist yet, OA-16).

## 4. The pipeline (9 stages)

CLI: `npm run content -- <command> [scope] [options]` from `platform/` (D-007: npm, not pnpm). Scope flags `--board cbse|cisce|icse|isc --class 7..12 --subject <slug|id> --chapter <n>`. Full reference: [`platform/content-pipeline/README.md`](../../platform/content-pipeline/README.md).

| # | Stage / command | Mock provider (today) | Azure (when OA-02/03 are done) |
|---|---|---|---|
| 1 | `catalog` | Deterministic: validates every `subjects.yaml`, syllabus and blueprint with the shared schemas | same |
| — | `plan` | Dry run: units in scope, token and INR estimate vs budgets | same, with confirmed prices |
| 2 | `outline` | Deterministic placeholder outline + question plan | GPT-6.1 Sol |
| 3 | `generate` | Placeholder decks/notes/cards/questions (marked mock, never publishable to prod) | GPT-6.1 Sol, `--batch` for Azure OpenAI Batch at about half price |
| 4 | `lint` | Deterministic: schema, KaTeX parse, visual specs, lengths, banned content, competency band, Indic-script checks | same |
| 5 | `verify` | Deterministic re-derivation (arithmetic, equation balance, answer letter vs key, duplicate options, match pairs, JS code-output in a sandbox) | + independent re-solve by the `verify` tier = **GPT-6.1 Sol** (D-033), batches of 12; flagged items regenerate ≤ 2 times, then `needs_review` |
| 6 | `originality` | n-gram overlap vs reference texts (skipped: none supplied), bank near-duplicates (5-gram Jaccard ≥ 0.7), literature rule | same + model check |
| 7 | `assemble` | Blueprint engine: chapter tests, `--series` unit tests / mocks / May track, competency balancing, `--freeze` | same |
| 8 | `tts` | Valid silent Ogg Opus, marked `#simulated` | Azure AI Speech (en-IN; hi-IN for Hindi), content-addressed audio in Blob |
| 9 | `publish` / `rollback` | Writes a `ChapterRelease` to the BlobStore and ingests + activates it in Postgres; `--authored` publishes authored chapters + exemplars + frozen series | same; mock content is always refused in production |
| — | `status`, `coverage` | Per-unit stage status; coverage vs CONTEXT targets (`--gate` exits 1 unless complete) | same |

Budget: every model call reserves its worst-case cost first against `CONTENT_BUDGET_INR` per run (default ₹25,000) and `CONTENT_BUDGET_TOTAL_INR` (default ₹3,00,000); with `--state pg` reservations are row-locked in Postgres so parallel runs share one cap. In production both are set to 0 while dark. State per run, unit, stage and item lives in `pipeline_*` tables (or `.state/` offline), so runs resume after failure.

Two models only (D-033): GPT-6 Luna (`small`) and GPT-6.1 Sol (`mid`, also the `verify` pass). No GPT-6 Astra. Token prices in `platform/shared/config/models.ts` are placeholders marked unverified until OA-02.

## 5. Gates and how to run them

Every authored chapter must pass all of these before merge (from `platform/`):

| Gate | Command | What it checks |
|---|---|---|
| Content gate | `npm test -w @soyl/content-templates` | Schema, syllabus topic ids, deck rules, counts vs targets, tests, NFC and Brahmic-script well-formedness, TTS-safe narration (≈ 700 tests over all chapters) |
| Lint | `npm run content -- lint --exemplars` | Stage 4 over exemplars **and** `content/authored/`; 0 errors required; competency band warning (D-035) |
| Verify | `npm run content -- verify --board cbse --class 10 --authored` | Stage 5 deterministic checks; 0 blocking flags required |
| Originality | `npm run content -- originality --authored` | Stage 6; 0 errors required |
| Answer separation | `npx vitest run --root db test/db6-split.test.ts` | Every real release splits and joins exactly; no key in `questions.body` |
| API contract | `npx vitest run --root api test/content.test.ts` | Every content/practice response is free of key names and key text |
| Frozen series | `npx vitest run --root content-pipeline test/series.test.ts` | Each frozen paper matches the catalog and bank: layout, chapter scopes, unit weightage, no repeats, no near-duplicates, only board-assessed items, competency within ±3 marks |

Latest full-tree evidence (2026-10-27, English h handoff on `platform/main` 3648363): content gate 694/694; lint 0 errors; `verify --authored` 99 units, 7,534 questions, 0 blocking flags; `originality --authored` 99 units, 0 errors; DB-6 split 8/8. The one API content-test failure in that run was a fixture assumption (no empty chapter left); fixed in e5c1a77.

### Competency balance (D-035)

- Lint warns when a chapter's share of application-or-higher items falls outside a band, set per subject in `LINT_COMPETENCY_BAND` (`content-pipeline/config/pipeline.ts`): default 45–65 %, **CBSE 10 Mathematics 20–65 %** (one bank serves both the Standard and Basic papers).
- Board and May papers are **balanced**, not just scored: the engine derives targets from the blueprint `mark_shares` and swaps items inside a slot until every band is within **±3 marks whichever internal-choice alternatives a student attempts** (`COMPETENCY_BALANCE.toleranceMarks`). A paper that cannot meet it is a generation request; `--freeze` refuses it.

### Frozen series (ADR-019)

- `assemble --series --source files --freeze` writes `content/authored/series/<subject>.json`; `--refreeze mocks,may` rebuilds only the named series.
- `publish --authored` ingests frozen series after chapters, remapping question versions to the published ones. Re-running the release changes nothing; a series referencing an unpublished question is refused whole.
- Re-freeze only in a reviewed commit, and only before students use the series. After launch, add papers (mock 7, …) instead.
- All-India live mocks are separate: scheduled events built from the `live_reserved` pool with an embargo (ADR-012). No `live_reserved` items exist yet.

## 6. Coverage (2026-10-28, computed from the repo)

### CBSE Class 10 core subjects (Wave 1): hand-authored, all gates clean

| Subject | Chapters | Decks | Slides | Questions | Flashcards | Chapter tests | Frozen series papers |
|---|---|---|---|---|---|---|---|
| Science (`cbse-10-science`) | **15 / 15** (ch01 exemplar) | 37 | 742 | 1,145 | 471 | 30 | 11: unit 1–3, mocks 1–6, May 1–2 |
| Mathematics (`cbse-10-mathematics`) | **14 / 14** (ch06 exemplar) | 28 | 487 | 1,027 | 426 | 28 | 19: Standard unit 1–3, mocks 1–6, May 1–2; Basic mocks 1–6, May 1–2 |
| Social Science (`cbse-10-social-science`) | **21 / 21** | 41 | 793 | 2,103 | 663 | 42 | 11: unit 1–3, mocks 1–6, May 1–2 |
| Hindi A (`cbse-10-hindi-a`) | **18 / 18** (ch02, ch10 exemplars) | 21 | 429 | 1,286 | 506 | 36 | none yet |
| English Language & Literature (`cbse-10-english-language-and-literature`) | **31 / 31** | 37 | 787 | 1,973 | 912 | 62 | none yet |
| **Total** | **99 / 99** (4 exemplars) | **164** | **3,238** | **7,534** | **2,978** | **198** | **41** |

Notes:
- Science ch14–15 and SST ch04 are not board-assessed (formative only); they have chapter tests but never appear in series papers.
- Hindi A and English have no frozen series yet: their supplementary-reader and कृतिका chapter scopes for board/unit blueprints are on the unmerged branch `platform/curriculum/cbse10-reader-blueprints`.
- No narration audio exists yet (TTS needs OA-03). Listen mode appears only for decks with `slide.audio` and never falls back to browser speech synthesis (ADR-017), so today every lesson is read mode only.
- **Production holds only 41 of these chapters** (82 chapter tests, no series): the release job last ran on 2026-10-27 from commit `0dee08c`. The next release publishes the rest ([publish-content runbook](runbooks/publish-content.md)).

### Everything else

| Scope | Status |
|---|---|
| CBSE Classes 7–9, 11–12 and other Class 10 subjects | Catalog only (syllabus files, blueprints); no lessons yet |
| CISCE (ICSE 7–10, ISC 11–12) | Catalog only: 323 subjects with syllabus files (3,627 chapters, 15,637 topics; 319 verified). **No ICSE/ISC blueprints on `platform/main` yet**; ICSE Class 10 board, chapter-test and unit-test blueprints for Mathematics, Physics, Chemistry, Biology, History & Civics, Geography, English Language, Literature in English, Hindi and Computer Applications are in progress on `platform/curriculum/icse10-blueprints`. No ICSE/ISC content. |
| Catalog totals | 767 subjects (CBSE 444, CISCE 323), 644 syllabus files, 7,440 chapters, 26,454 topics, 359 blueprints (329 board + 30 class defaults) on `platform/main`. Unverified files depend on OA-16. |

### How these numbers were computed

A script over the repo (no database): for each chapter folder with a `release.json` under `platform/content/authored/*/` and `platform/content-templates/exemplars/*/`, count `decks`, slides in each deck, `questions`, `flashcards.cards`, and the tests in `tests.json`; for each `content/authored/series/*.json`, count `tests[]` and read each `test.id`. The same totals appear in the pipeline's own run (`verify --authored`: 99 units, 7,534 questions). `npm run content -- coverage --source files` gives the coverage-vs-target view per board, class and subject.
