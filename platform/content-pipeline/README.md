# @soyl/content-pipeline

The content pipeline CLI (ARCHITECTURE §8). It turns the catalog into lessons, notes, flashcards and question banks by calling models through `@soyl/ai-core` (the single metered model client, D-021), then checks the output with deterministic rules. Stages 1–4 are implemented (M1); stages 5–9 are M2.

Run everything from `platform/`:

```
npm run content -- <command> [scope] [options]
```

## Commands

| Command | Stage | What it does |
|---|---|---|
| `catalog` | 1 | Loads and validates every `catalog/*/subjects.yaml`, syllabus and blueprint file with the shared schemas, plus cross-checks: directory ↔ subject id, syllabus subject exists, chapter numbering, chapter unit in `units[]`, duplicate ids across files, blueprint board/class/subject consistency, family mapping. Prints counts per board × class. Exit 1 on any error. |
| `plan` | — | Always a dry run. Lists units in scope with their outline / generate / lint status, and estimates tokens and INR for the model work still to do (stages 2–3), synchronous and with `--batch`, per chapter and in total, against the per-run and total budgets. |
| `outline` | 2 | Per chapter: a lesson outline from the model (parts, slide plan, planned visuals) plus a deterministic question plan (counts by type, difficulty and competency from the subject's blueprints, or the family default, and `content-targets.ts`). Writes `out/<unit>/outline.json`. |
| `generate` | 3 | Runs `outline` first for units without one, then generates per chapter: one deck per part (with the MCQs its check slides point to), notes, flashcards, practice questions in batches of ≤ 15, and case/source-based questions in batches of ≤ 4. Long chapters are split into parts of 12–25 slides. `--batch` sends everything as one Azure OpenAI Batch job (half price). |
| `lint` | 4 | Deterministic checks on `out/<unit>/` (rules below). Writes `out/<unit>/lint.json` and per-item results to the state store. Exit 1 if any unit has errors. `lint --exemplars` lints `platform/content-templates/exemplars/` instead. |
| `status` | — | Per-unit stage status in scope, recent runs (with in-flight Batch jobs) and the spend ledger (real vs simulated). |
| `coverage` | — | Board × class × subject × asset counts against targets (CONTEXT §4, §10; `content-targets.ts`). Table to stdout (per board × class, or per subject when scoped), JSON + Markdown to `out/coverage/coverage.{json,md}` (`--out` to change). **Launch gate**: `--gate` exits 1 unless every subject in scope is complete. |
| `verify`, `originality`, `assemble`, `tts`, `publish` | 5–9 | Not implemented (M2): print a message and exit 2. |

### Scope and options

| Flag | Meaning |
|---|---|
| `--board cbse\|cisce\|icse\|isc` `--class 7..12` `--subject <slug or id>` `--chapter <n>` | Scope. `--subject science` or `--subject cbse-10-science`. Subjects without a syllabus file have no units yet. |
| `--provider mock\|azure` | Default **mock**: deterministic placeholder output, no spend. `azure` needs the env below. |
| `--concurrency <n>` | Parallel model calls (default 4); Azure calls are also limited inside the provider. |
| `--batch` | Use Batch where the provider supports it (Azure and mock). |
| `--run <id>` | Resume a run: keeps its spend against the per-run cap and resumes an in-flight Batch job. |
| `--force` | Redo items already done (regenerates; costs money on Azure). |
| `--retry-review` | Retry items marked `needs_review`. |
| `--dry-run` | For `outline`/`generate`: print the plan and estimate, call nothing. |
| `--seed <s>` | Mock seed (default `soyl`). Same seed → same output. |
| `--poll <seconds>` | Batch poll interval (default 60). |
| `--verbose` | Show warnings and every finding. |

Example (the acceptance path):

```
npm run content -- catalog
npm run content -- plan --board cbse --class 10 --subject science
npm run content -- generate --board cbse --class 10 --subject science --chapter 1 --provider mock
npm run content -- lint --board cbse --class 10 --subject science --chapter 1
npm run content -- coverage
```

## Output

Generated artefacts never go to git (`out/` and `.state/` are ignored). Per unit:

```
out/<unit>/outline.json        ChapterOutline (shared/content/outline.ts)
out/<unit>/deck.p<N>.json      Deck; part is null when the chapter is one deck
out/<unit>/notes.json          Notes
out/<unit>/flashcards.json     FlashcardSet
out/<unit>/questions.json      QuestionBank: deck check MCQs, practice, case/source items
out/<unit>/items/<key>.json    raw per-call results (deck.p1, notes, flashcards, questions.b1…, cases.b1…)
out/<unit>/lint.json           stage-4 report
```

Files are shaped like the shared contract; a `ChapterRelease` is assembled from them at publish (M2). Every item records `provenance: { origin: 'pipeline', template_version: '<id>@<version>', model, generated_at }`. Final question ids are `<id_prefix>_NNN` (below), assigned in assembly order, and check slides are rewired to them.

## Budget behaviour

- Caps: `CONTENT_BUDGET_INR` per run (default ₹25,000) and `CONTENT_BUDGET_TOTAL_INR` across all runs (default ₹3,00,000). Both in rupees, env vars, read at run start.
- Every model call reserves its **worst case** (estimated prompt tokens + the template's full `max_output_tokens`) before it is made. If that could push spend past either cap, the call is refused and never sent. After the call the reservation is settled with the actual metered cost (tokens × `shared/config/models.ts` prices).
- When a call is refused the run **pauses only its model work**: remaining items are marked `paused`, the run ends `paused_budget` (exit 3), and everything free (lint, coverage, status) keeps working. Raise the cap and resume with `--run <id>`.
- Spend is written to an append-only ledger (`.state/ledger.jsonl`, later the content budget table) per call, with run, unit, item, tokens and cost. Mock calls are metered at the same prices but recorded as **simulated** and never count toward the real total cap.
- Prices in `models.ts` are **placeholders marked unverified** until the owner confirms Azure pricing (OA-02). `plan` prints the prices it used.

## Resuming and retries

- State per run, per unit × stage and per item lives in the `StateStore` (`src/state.ts`): file-backed in `.state/` now.
- Re-running a command skips items that are `done`, retries `failed` and `paused` ones, and leaves `needs_review` alone (use `--retry-review`).
- A failing item (provider error after the client's own retries, or output that still fails validation after one repair round-trip) is retried **twice** automatically; after the third failure it is `needs_review` (AGENTS §5.3) and the unit is not assembled.
- HTTP 429/5xx are retried inside the provider with exponential backoff + jitter, honouring `retry-after-ms`/`retry-after`.
- A Batch job id is stored on the run, so an interrupted `generate --batch` resumes polling with `--run <id> --batch`.

**Postgres state (M2).** `PostgresStateStore` implements the same interface over db-schema's tables: `RunRecord` → `pipeline_runs`, `UnitStageRecord` → `pipeline_unit_status` (unique unit, stage), `ItemRecord` → `pipeline_items` (unique unit, stage, item_key), `SpendEntry` → the content budget ledger (append-only; totals are `SUM` by provider and simulated). Writes are whole-record upserts, so several workers can run units in parallel; budget reservations move to a row-locked "reserved" column on the run so concurrent workers share one cap.

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
| `latex.backslash` | `ce{`, `frac{`… without a backslash, or a control character where a JSON escape ate one (`\f`rac, `\t`imes, `\r`ightarrow). |
| `chem.balance` | Atom balance of every `\ce{… -> …}` and chem visual. Deliberately unbalanced equations are allowed when the same slide / question stem / flashcard / notes section says "skeletal", "unbalanced", "not balanced" or "Balance …", or when the equation is a wrong option of an objective question. |
| `svg.allowlist`, `svg.style`, `svg.ids` | ADR-007: strict XML parse; allow-listed elements/attributes only; no scripts, handlers, style, external refs, DOCTYPE/entities; fragment-only href/url(); theme classes only; ≤ 60 KB; viewBox. Warnings: hard-coded colours, no `<title>`, ids reused across diagrams. |
| `visual.plot`, `visual.geometry`, `visual.flow`, `visual.table`, `visual.chem` | Specs compile: safe expression grammar (ADR-007), sampled finite; references resolve; tables rectangular; SMILES alphabet. |
| `banned.url`, `banned.html`, `banned.contact`, `banned.profanity` | Student-visible text: no external links or URLs (incl. markdown links/images, `javascript:`), no raw HTML, no emails or phone numbers, nothing on the profanity list (`config/pipeline.ts`, extendable with a newline-separated file named in `CONTENT_PROFANITY_LIST`). |
| `literature.quote`, `literature.verse` | Literature chapters only: quoted or block-quoted runs over 25 words, or more than 4 consecutive short lines (verse). |
| `narration.symbols` | Narration is read by TTS: no LaTeX, symbols, arrows or formulae (`H2O`, `$`, `\`, `→`, `°`…). Length ≤ 90 words is a schema rule. |
| `math.arithmetic`, `solution.answer` | In solutions, model answers and worked-example slides, every pair of adjacent purely numeric sides of an `=` chain is recomputed with the safe parser and must agree within 1% (`\dfrac{3}{5} \times 12 = 7.2`; use `\approx` for rounded values; sides with variables or units are skipped). Warning when a numerical question's solution never states its answer. Stage 5 (M2) re-solves every item independently. |
| `visual.geometry` (sanity) | Points inside the canvas (origin bottom-left, y up), circles on the canvas, right-angle marks ≈ 90°, degree labels match the drawn angle, numeric length labels on one scale — unless `not_to_scale` or the caption says "not to scale". |
| `topics.unknown`, `outline.coverage` | Topic ids exist in the chapter's syllabus; every topic is in some outline part (warning). |
| `refs.check-question`, `refs.unit` | Check slides point to an existing **objective** question; every item belongs to the unit. |
| `balance.competency`, `balance.difficulty` | Warnings: share of application-or-higher items outside 45–65% (board papers ≈ 50%); no difficulty 4–5 items. |
| `language.script` | Hindi content is written in Devanagari. |
| `provenance.missing`, `provenance.mock` | Pipeline items record template id@version and model; mock output is flagged (warning) and never counts for coverage. |
| `unit.incomplete` | A unit whose generate stage has not finished. |

## Subject families

`config/families.ts` maps every catalog subject to a template family by slug (ordered rules), with English and Hindi split per chapter (chapters listing literature texts use `*-literature`). Other languages and arts/PE/skill subjects map to `other` on purpose. A subject that matches no rule falls back to `other` and is reported by `catalog` and by the completeness test, so new catalog subjects force a decision.

## Mock provider

`--provider mock` (the default) returns deterministic, schema-valid, lint-clean **placeholder** content (`[MOCK] …`) for every asset so the whole pipeline runs offline. It records `model: "mock"`, never counts for coverage, must never be published, and refuses to start when `NODE_ENV=production` or `APP_ENV=prod` (GEN-3).

## Tests

`npm test -w @soyl/content-pipeline` — lint rules with pass/fail fixtures (including an SVG/markdown/KaTeX XSS corpus), the expression parser, chem balance, templates and few-shot trimming, family mapping and id-prefix uniqueness over the real catalog, planning, state/resume/retry/budget, Batch, and the end-to-end `plan → outline → generate → lint` for `cbse-10-science-ch01`. Every exemplar in `content-templates/exemplars/` must lint clean.
