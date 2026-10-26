# @soyl/content-pipeline

The content pipeline CLI (ARCHITECTURE §8). It turns the catalog into lessons, notes, flashcards and question banks by calling models through `@soyl/ai-core` (the single metered model client, D-021), checks everything with deterministic rules and an independent solve, assembles tests from blueprints, makes narration audio, and publishes immutable releases into Postgres. All nine stages run today on the deterministic **mock** provider (no model endpoint yet, OA-02) and on hand-authored content (D-025/D-026).

Run everything from `platform/`:

```
npm run content -- <command> [scope] [options]
```

## Commands

| Command | Stage | What it does |
|---|---|---|
| `catalog` | 1 | Loads and validates every `catalog/*/subjects.yaml`, syllabus and blueprint file (subject blueprints in `<subject>/blueprints/`, board/class defaults in `<board>/blueprints/<class>/`) with the shared schemas, plus cross-checks. Exit 1 on any error. |
| `plan` | — | Dry run: units in scope, missing stages, token and INR estimate for stages 2–3 (sync and `--batch`) against the budgets. |
| `outline` | 2 | Lesson outline (model) + deterministic question plan per chapter → `out/<unit>/outline.json`. |
| `generate` | 3 | Decks (per part, with their check MCQs), notes, flashcards, practice questions (≤ 15 per call), case/source items (≤ 4 per call). `--batch` = Azure OpenAI Batch. |
| `lint` | 4 | Deterministic checks (rules below) → `out/<unit>/lint.json`. `--exemplars` lints `content-templates/exemplars/` **and** `content/authored/`. |
| `verify` | 5 | Deterministic re-derivation (below) + an independent solve by the `verify` tier (`<family>/verify.v1.md`, batches of 12). Flagged questions are regenerated (same slot and id) and re-verified up to 2 times, then `needs_review` (kept out of releases); the rest become `auto_verified`. `--authored`: deterministic checks only, report, files untouched. Exit 2 when items need review. |
| `originality` | 6 | Word 6-gram overlap with owner-supplied reference texts (`catalog/sources/reference/*.txt` or `*.md`, gitignored; none → a notice and the check is skipped), exact/near-duplicate questions across every chapter we hold (Jaccard of 5-grams ≥ 0.7; mock-vs-mock pairs ignored), and the literature rule. Generated questions that fail are regenerated ≤ 2 times, then `needs_review`. `--authored`: report only. |
| `assemble` | 7 | Blueprint engine: chapter tests (short + long) for chapters without them; `--series` adds unit tests, ≥ 6 full mocks per paper variant and the CBSE 10 May track (Classes 10/12), or unit tests + half-yearly/annual/term papers (7, 8, 9, 11). Bank = published questions in Postgres (`--source db`, default; tests are ingested, series rows created) or files (`--source files`). Missing questions → generation requests (never silent). |
| `tts` | 8 | Narration audio per slide (Azure AI Speech REST with SSML; `--provider mock` = valid silent Ogg Opus of the estimated length) → BlobStore `audio/<unit>/<deck>/<slide>-<hash>.ogg` (content-addressed: unchanged narration is not re-synthesised) and `slide.audio {key, duration_ms}`. `--authored` writes `out/<unit>/audio.json`, which publish merges. |
| `publish` | 9 | Builds a `ChapterRelease`, writes it to the BlobStore at `content/releases/<unit>/<version>.json`, ingests it (`ingestChapterRelease`, which activates it) with its chapter tests (`ingestTestDefinition`). Generated units need a clean lint and a verify report and ship only `auto_verified` questions; `--authored` publishes `content/authored` + exemplars (draft → published, beta posture §7.3). Unchanged content is skipped; changed items get version + 1. Mock output is refused unless `--allow-mock`, and always in production. |
| `rollback` | 9 | `--unit <chapter id> --to <version>`: re-activates an earlier release. |
| `status` | — | Per-unit status of every stage, recent runs, spend ledger. |
| `coverage` | — | Board × class × subject × asset counts vs targets (CONTEXT §4/§10). Source: published content in Postgres (default; falls back to files when no database is reachable) or `--source files`. Mock never counts. `--gate` exits 1 unless complete. |

### Scope and options

| Flag | Meaning |
|---|---|
| `--board cbse\|cisce\|icse\|isc` `--class 7..12` `--subject <slug or id>` `--chapter <n>` | Scope. |
| `--provider mock\|azure` | Model and speech provider. Default **mock** (deterministic placeholder output, simulated cost). |
| `--state pg\|file` | Pipeline state store. Default `pg` when `DATABASE_URL` is set, else `file` (`.state/`, offline). |
| `--authored` | verify / originality / tts / publish work on hand-authored chapters + exemplars instead of `out/`. |
| `--allow-mock` | publish: allow mock placeholder content into a non-production database (dev and e2e only). |
| `--series`, `--source db\|files`, `--strict` | assemble options (`--strict`: exit 2 when any generation request was recorded). |
| `--concurrency`, `--batch`, `--run <id>`, `--force`, `--retry-review`, `--dry-run`, `--seed`, `--poll`, `--verbose` | As in M1. `--force` also re-synthesises audio. |

**Database.** Stages that touch Postgres (publish, rollback, assemble and coverage with the db source, `--state pg`) use `DATABASE_URL`; without it they start the persistent local embedded server of `@soyl/db` (`platform/db/.data/dev`, port 54320) for the command, exactly like `npm run db -w @soyl/db`. Migrate and seed first:

```
npm run db -w @soyl/db -- migrate up
npm run db -w @soyl/db -- seed catalog
npm run content -- publish --authored
npm run content -- assemble --board cbse --class 10 --subject science --series
npm run content -- coverage
```

**Blob store.** `CONTENT_BLOB_ACCOUNT_URL` (+ `CONTENT_BLOB_CONTAINER`, default `content`) selects Azure Blob (REST API, keyless `DefaultAzureCredential`, role Storage Blob Data Contributor); otherwise a local store under `out/blob` (`CONTENT_BLOB_DIR` moves it).

**Speech.** `tts --provider azure` needs `AZURE_SPEECH_REGION` (or `AZURE_SPEECH_ENDPOINT`) and `AZURE_SPEECH_RESOURCE_ID` (Entra auth `Authorization: Bearer aad#<resource id>#<token>`, role Cognitive Services Speech User). Output format `AZURE_SPEECH_OUTPUT_FORMAT` (default `ogg-24khz-16bit-mono-opus`; only Ogg Opus formats are accepted, Azure has no AAC output). Voices per language are in `src/tts/speech.ts` (`en-IN-NeerjaNeural`, `hi-IN-SwaraNeural`, …; pa/or/as fall back to hi-IN until their voices are confirmed against the voices list).

Mock end to end for one chapter with no hand-written content:

```
npm run content -- generate    --board cbse --class 12 --subject physics --chapter 1 --state pg
npm run content -- lint        --board cbse --class 12 --subject physics --chapter 1 --state pg
npm run content -- verify      --board cbse --class 12 --subject physics --chapter 1 --state pg
npm run content -- originality --board cbse --class 12 --subject physics --chapter 1 --state pg
npm run content -- tts         --board cbse --class 12 --subject physics --chapter 1 --state pg
npm run content -- publish     --board cbse --class 12 --subject physics --chapter 1 --state pg --allow-mock
```

## Stage 5 deterministic checks

`src/verify/checks.ts` (no model; numeric checks in JS, D-008):

| Check | Severity | What |
|---|---|---|
| `numeric.arithmetic` | critical | Every purely numeric `=` step in solutions and model answers recomputes (1% tolerance). |
| `numeric.final` | major / minor | A numerical question's solution never reaches the key value (major), or states it without an `=` step computing it (minor). |
| `chem.balance` | critical | Every `\ce{… -> …}` on the key side balances unless the text marks it skeletal. |
| `objective.solution` | critical | The solution names another option as the answer ("the answer is (b)") than the key. |
| `objective.options`, `objective.match`, `objective.blanks` | major / critical / minor | Duplicate option texts, assertion-reason without 4 options; match pairs not one-to-one; an accepted blank answer the solution never mentions. |
| `code.output` | critical | `javascript` code-output items run in a `node:vm` context (no host objects, no code generation from strings, 500 ms) and must print the key after whitespace normalisation. Other languages are left to the independent solve. |

## Output

Generated artefacts never go to git (`out/` and `.state/` are ignored). Per unit:

```
out/<unit>/outline.json        ChapterOutline
out/<unit>/deck.p<N>.json      Deck (slide.audio filled by tts)
out/<unit>/notes.json          Notes
out/<unit>/flashcards.json     FlashcardSet
out/<unit>/questions.json      QuestionBank; status auto_verified / needs_review after verify
out/<unit>/items/<key>.json    raw per-call results
out/<unit>/lint.json           stage 4 report
out/<unit>/verify.json         stage 5 report (+ verify/<model batch | regenerated item>.json)
out/<unit>/originality.json    stage 6 report
out/<unit>/audio.json          stage 8 manifest {simulated, decks: {deck: {slide: {key, duration_ms}}}}
out/assemble/<subject>/tests/<test id>.json, generation-requests.json     stage 7
out/blob/content/releases/<unit>/<version>.json, out/blob/audio/…          local BlobStore
out/coverage/coverage.{json,md}
```

Every generated item records `provenance: { origin: 'pipeline', template_version: '<id>@<version>', model, generated_at }`. Final question ids are `<id_prefix>_NNN`; check slides are rewired to them; regenerated questions keep their id.

## Budget behaviour

- Caps: `CONTENT_BUDGET_INR` per run (default ₹25,000) and a total cap: `CONTENT_BUDGET_TOTAL_INR` (default ₹3,00,000), or, with `--state pg` and real money, the `content_budget` view (`config_values` key `CONTENT_BUDGET_INR`) when it is set.
- Every model call reserves its **worst case** first and is refused if either cap could be crossed. With `--state pg` the reservation lives in `pipeline_runs.reserved_paise`, taken inside a transaction that row-locks every running run (`ORDER BY id`), so parallel runs in any number of processes share one cap; finishing a run releases its reservations.
- A refused call pauses only that run's model work (`paused_budget`, exit 3); free stages keep working; resume with `--run <id>`.
- Spend goes to the append-only ledger (`.state/ledger.jsonl`, or `content_budget_ledger`) per call, with run, unit, stage and tokens. Mock spend is simulated and never counts toward the real cap.

## Resuming and retries

- State per run, unit × stage and item lives in the `StateStore`: `FileStateStore` (`.state/`) or `PostgresStateStore` (`pipeline_runs`, `pipeline_unit_status`, `pipeline_items`, `content_budget_ledger`; migration 0004 adds the run status `partial`, `reserved_paise` and `detail` columns).
- Re-running skips `done` items, retries `failed`/`paused`, and leaves `needs_review` alone (`--retry-review`). Verify resumes per question (`q:<id>`), model batch and regeneration.
- Failing items are retried twice automatically, then `needs_review` (AGENTS §5.3). Provider 429/5xx are retried with backoff inside the provider.

## Switching to Azure OpenAI

Nothing is needed in code. When OA-02 is done:

1. Install the credential package (optional peer dependency, kept out of the lockfile until needed because the current `@azure/identity` release pins an `@azure/msal-node` with a high advisory, GHSA-xcx6-jx8p-x3h5): `npm install @azure/identity -w @soyl/ai-core`, then `npm audit`.
2. Set (Key Vault / app settings in Azure; your shell locally — never in git):
   ```
   AZURE_OPENAI_ENDPOINT=https://<resource>.openai.azure.com
   AZURE_OPENAI_DEPLOYMENT_SMALL=<GPT-6 Luna deployment>
   AZURE_OPENAI_DEPLOYMENT_MID=<GPT-6.1 Sol deployment>
   AZURE_OPENAI_DEPLOYMENT_VERIFY=<GPT-6 Astra deployment>
   # optional Global-Batch deployments (default: the same names)
   AZURE_OPENAI_DEPLOYMENT_MID_BATCH=...
   CONTENT_BUDGET_INR=25000
   CONTENT_BUDGET_TOTAL_INR=300000
   ```
3. Authentication is keyless (INFRA-5): `DefaultAzureCredential` uses the managed identity in Azure, or `az login` locally. API keys are not supported.
4. Run `plan` first and check the estimate, then `generate ... --provider azure` (add `--batch` for half price).

The provider uses the Azure OpenAI v1 REST API (`/openai/v1/chat/completions`, `/files`, `/batches`) with the JSON Schema of the zod contract as `response_format` (non-strict; the client validates with zod and allows one repair round-trip).

## Prompt templates

Resolution for (family, asset): `content-templates/prompts/<family>/`, then the family's short name (`hindi-language` → `hindi`), then related families (`physics` → `science`, `*-literature` ↔ `*-language`), then `prompts/other/`, then this package's **fallback** templates in `templates/` (recorded as `fallback.<asset>@1`). Highest `v<N>` wins. Format: `platform/content-templates/README.md`, plus:

- `## System` / `## User` headings split the body; without them the whole body is the user message and a default system message is used.
- `{{task}}` is the instruction for this call (which deck part, exact question counts and types, how check slides link to questions). If a template does not place `{{task}}`, the pipeline appends it at the end of the user message under "Instructions for this call".
- `{{id_prefix}}` = `q_<exam><class><abbrev>_chNN`, e.g. `cbse-10-science-ch01` → `q_cbse10sci_ch01`. `<abbrev>` comes from `SUBJECT_ABBREVIATIONS` in `src/ids.ts` (sci, math, sst, phy, chem, bio, cs, eng…, hin…), otherwise the subject slug without hyphens. A test checks uniqueness per exam and class over the whole catalog.
- `{{content_json}}` is the content a `verify` template checks (stage 5, M2; "(not applicable)" before then).
- Unknown placeholders fail at load; missing values fail at render.

### few_shot references

`<path relative to content-templates>#<fragment>[?<query>]`:

- fragment: `key`, a JSON pointer `a/0/b`, each segment optionally sliced (`questions[0:8]`); `.md` files are included as text (first 3,000 characters).
- query: `type=case-based,source-based` keeps items of those types; `sample=N` keeps N items stratified by type (one per type first, in file order).
- **Default trimming** when a reference has no slice and no query: `#decks` → the first deck, ≤ 12 slides (the first slide of each layout, then in order); `#questions` → for the `questions` asset one item per non-case type (≤ 12), for `case-passages` only case/source items (≤ 2), otherwise ≤ 6 stratified; `#notes` → first 3 sections; `#flashcards` → first 12 cards; `#tests` → first test.
- All examples together are capped at 40,000 characters (`GENERATION.fewShotMaxChars`): whole examples are dropped from the end first.
- A missing exemplar file is reported (`generate` logs it) and the prompt says no example is available.

## Lint rules (stage 4)

Errors block a unit; warnings are reported. Rule ids appear in `lint.json`.

| Rule | Checks |
|---|---|
| `schema` | Each file against the shared zod contract (Deck, Notes, FlashcardSet, QuestionBank, ChapterOutline). |
| `editorial.*` | Per deck part: 12–25 slides, summary and exam-tips slides, 3–5 check slides; non-text families also ≥ 2 worked examples and no more than 3 slides in a row without a visual. Flashcards 20–40. Practice ≥ 60 (classes 10, 12) or ≥ 40, across ≥ 5 types. Multi-part chapters need part numbers. Targets come from `shared/config/content-targets.ts`. |
| `math.katex`, `math.katex-strict` | Every `$…$`, `$$…$$`, `math[]`, `formulas[].latex`, chem equation parses in KaTeX + mhchem with the web settings; `\href`, `\url`, `\html*`, `\def`, `\newcommand`… rejected; unclosed `$`. |
| `latex.backslash` | `ce{`, `frac{`… without a backslash, or a control character where a JSON escape ate one (`\f`rac, `\t`imes, `\r`ightarrow). Inside maths also: command names with no backslash even without a brace (`Rightarrow`, `times`, `ne`, `frac`, `theta` …; words inside `\text{}`/`\mathrm{}`/`\ce{}` are fine), and any line break or control character in inline maths (a JSON `"\ne"` becomes newline + `e`). |
| `chem.balance` | Atom balance of every `\ce{… -> …}` and chem visual. Deliberately unbalanced equations are allowed when the same slide / question stem / flashcard / notes section says "skeletal", "unbalanced", "not balanced" or "Balance …", or when the equation is a wrong option of an objective question. |
| `svg.allowlist`, `svg.style`, `svg.ids` | ADR-007: strict XML parse; allow-listed elements/attributes only; no scripts, handlers, style, external refs, DOCTYPE/entities; fragment-only href/url(); theme classes only; ≤ 60 KB; viewBox. Warnings: hard-coded colours, no `<title>`, ids reused across diagrams. |
| `visual.plot`, `visual.geometry`, `visual.flow`, `visual.table`, `visual.chem` | Specs compile: safe expression grammar (ADR-007), sampled finite; references resolve; tables rectangular; SMILES alphabet. |
| `banned.url`, `banned.html`, `banned.contact`, `banned.profanity` | Student-visible text: no external links or URLs (incl. markdown links/images, `javascript:`), no raw HTML, no emails or phone numbers, nothing on the profanity list (`config/pipeline.ts`, extendable with a newline-separated file named in `CONTENT_PROFANITY_LIST`). |
| `literature.quote`, `literature.verse`, `literature.quote-review` | Literature chapters only: quoted or block-quoted runs over 25 words, or more than 4 consecutive short lines (verse) — errors. Quoted spans of 8–25 words are listed as warnings for a manual reproduction review. |
| `passage.licensed`, `passage.origin` | `passage_origin: licensed-excerpt` is an error until licensed texts exist (`LITERATURE.allowLicensedExcerpts`); literature passages without `passage_origin` get a warning. |
| `answer.word-limit`, `writing.word-limit` | Model answer word count outside 80–120% of `word_limit` (writing, short, long) is a warning; a writing limit over 1,000 words is an error. |
| `code.output`, `code.length`, `code.input` | code-output: expected output ≤ 2,000 characters (error); code > 40 lines, or code that reads input when the stem supplies none (warnings). Fenced code is never parsed as maths or HTML. |
| `ordering.shuffled`, `map.id`, `map.marks` | Warnings: ordering items listed in the correct order; a map item without `map_id`; places ≠ marks. |
| `markdown.underline` | `++word++` underline markers must close on the same line; `<u>` is refused with a pointer to the marker. |
| `script.*` | Language subjects in a non-Latin script (subjects.yaml `script`, else the language): NFC, well-formed Brahmic text, no ≥ 3-word Latin runs, narration without Latin/digits/symbols, majority-script stems/notes/cards (`platform/shared/content/script.ts`, the same rules as the content gate). |
| `language.spelling`, `language.nukta` | Hindi warnings: non-standard spellings (`config/pipeline.ts` `HINDI_ORTHOGRAPHY`) and the same word with and without nukta. |
| `narration.symbols` | Narration is read by TTS: no LaTeX, symbols, arrows or formulae (`H2O`, `$`, `\`, `→`, `°`…). Length ≤ 90 words is a schema rule. |
| `math.arithmetic`, `solution.answer` | In solutions, model answers and worked-example slides, every pair of adjacent purely numeric sides of an `=` chain is recomputed with the safe parser and must agree within 1% (`\dfrac{3}{5} \times 12 = 7.2`; use `\approx` for rounded values; sides with variables or units are skipped). Warning when a numerical question's solution never states its answer. Stage 5 re-derives every item. **Deliberately false statements** (error-spotting items): write them with `\ne` (never checked), or say so in the same sentence — "wrong", "incorrect", "mistake", "is false", "not true" (Hindi गलत, त्रुटि) within ~120 characters of the span opts it out. |
| `visual.plot-points` | Every marked plot point lies on one of the functions or on a `vlines`/`hlines` entry (2% of the y range) unless `on_curve: false`; when a marked point is a zero of a function, every real zero of that function inside the view is marked too. `vlines`/`hlines` must lie inside the axes. |
| `balance.answer-keys` | Warning: with ≥ 8 single-answer MCQs in a chapter, one option position holds over 45% of the keys, or (≥ 12 MCQs) a position is never the key. |
| `visual.geometry` (sanity) | Points inside the canvas (origin bottom-left, y up), circles on the canvas, right-angle marks ≈ 90°, degree labels match the drawn angle, numeric length labels on one scale — unless `not_to_scale` or the caption says "not to scale". |
| `topics.unknown`, `outline.coverage` | Topic ids exist in the chapter's syllabus; every topic is in some outline part (warning). |
| `refs.check-question`, `refs.unit` | Check slides point to an existing **objective** question; every item belongs to the unit. |
| `balance.competency`, `balance.difficulty` | Warnings: share of application-or-higher items outside 45–65% (board papers ≈ 50%); no difficulty 4–5 items. |
| `language.script` | Language-subject content (Hindi, Tamil, Urdu …) is written in its own script. |
| `provenance.missing`, `provenance.mock` | Pipeline items record template id@version and model; mock output is flagged (warning) and never counts for coverage. |
| `unit.incomplete` | A unit whose generate stage has not finished. |

## Subject families

`config/families.ts` maps every catalog subject to a template family by slug (ordered rules), with English and Hindi split per chapter (chapters listing literature texts use `*-literature`). Other languages and arts/PE/skill subjects map to `other` on purpose. A subject that matches no rule falls back to `other` and is reported by `catalog` and by the completeness test, so new catalog subjects force a decision.

## Mock provider

`--provider mock` (the default) returns deterministic, schema-valid, lint-clean **placeholder** content (`[MOCK] …`) for every asset so the whole pipeline runs offline. It records `model: "mock"`, never counts for coverage, must never be published, and refuses to start when `NODE_ENV=production` or `APP_ENV=prod` (GEN-3).

## Tests

`npm test -w @soyl/content-pipeline` (7 files):
- `lint-rules`, `lint-v2`: every lint rule with pass/fail fixtures (incl. the SVG/markdown/KaTeX XSS corpus, contract v2 types, scripts, underline, bare LaTeX commands, arithmetic opt-out, key skew, plot points/zeros).
- `templates-families`: templates, few-shot trimming, family mapping and id prefixes over the real catalog, planning.
- `pipeline`: state/resume/retry/budget, Batch, end-to-end plan → outline → generate → lint, every exemplar and authored chapter lint-clean, CLI.
- `stages`: verify checks and the regenerate-twice-then-needs_review loop, originality (n-grams, duplicates, reference overlap), the blueprint engine (exact marks, choice groups, determinism, series no-repeat, generation requests) and series planner (variants, May track, term papers), tts.
- `tts-blob`: Ogg Opus writer/parser, SSML, Azure Speech and Azure Blob request shapes against a fake fetch, local blob store.
- `postgres` (real PostgreSQL: embedded locally, the service container in CI): PostgresStateStore, the row-locked shared budget under parallel reservations and the content_budget cap, publish (blob + ingest + activate, idempotent, version bumps), rollback, assembled test ingestion, coverage from Postgres, and the mock end to end generate → lint → verify → originality → tts → publish --allow-mock.
