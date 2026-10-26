# pipeline-engineer — M1: content pipeline stages 1–4 and @soyl/ai-core — 2026-10-26

Status: **done** (stand-in: everything runs end to end on the deterministic mock provider; the Azure OpenAI provider is implemented and tested against a fake `fetch`, and is switched on by env once OA-02 lands — D-010)

Branch: `platform/pipeline-engineer/m1` (worktree `C:/Users/Prabhu/soyl-wt/pipeline-engineer-m1`), merged with `origin/platform/main` up to the CISCE catalog, db-schema and the science + maths exemplars.

## What changed

| Path | What |
|---|---|
| `platform/ai-core/` (new workspace `@soyl/ai-core`) | The single metered model client (D-021). `ModelClient` (chat, structured JSON with the zod contract's JSON Schema via `z.toJSONSchema` + zod validation + one repair round-trip, streaming hook, Batch submit/poll/fetch), `AzureOpenAIProvider` (v1 REST API, keyless bearer token from `DefaultAzureCredential`, retries with exponential backoff + jitter on 408/429/5xx honouring `retry-after-ms`/`retry-after`, concurrency limiter, Batch via JSONL upload), `MockProvider` (deterministic by seed, fixture registry, schema-sampled fallback, refuses to construct in production — GEN-3), metering (input/cached/output tokens → paise on every call, `UsageRecord`), `BudgetGuard` (per-run and total caps; reserves worst case before every call; refuses instead of overspending). |
| `platform/shared/config/models.ts` | Tiers `small \| mid \| verify` → `AZURE_OPENAI_DEPLOYMENT_SMALL/MID/VERIFY` (+ optional `_BATCH`), display names GPT-6 Luna / GPT-6.1 Sol / GPT-6 Astra, INR per 1M input/cached/output tokens, Batch factor 0.5, embeddings (1536 dims), `costPaise()`. **Prices are placeholders marked `unverified`** (below). |
| `platform/content-pipeline/` (new workspace `@soyl/content-pipeline`) | CLI `npm run content -- <command>` from `platform/` (D-007): `catalog`, `plan`, `outline`, `generate`, `lint`, `status`, `coverage`; `verify`/`originality`/`assemble`/`tts`/`publish` exit 2 "not implemented (M2)". Template loader/renderer, fallback templates, subject → family mapping (`config/families.ts`), question planning, generation schemas, mock fixtures, file-backed `StateStore`, stage-4 lint engine. README documents everything. |
| `platform/shared/content/` | Contract extensions (below), all optional and backwards compatible; both exemplars still pass `@soyl/content-templates`. |
| `platform/package.json` | Added the `content` script only. |
| `docs/platform/adr/007-diagram-rendering.md` | ADR-007, **Accepted**: specs as code, the six kinds, what stage 4 rejects per kind, the plot grammar shared with design-system's renderer, chem balance rule, rendering parity notes. |

### Contract changes in `platform/shared/content`
- `outline.ts` (new): `LessonOutline`, `ChapterOutline` (outline + deterministic `QuestionPlan`), `QuestionPlan`, `QuestionBank`, `VISUAL_KINDS`.
- `question.ts`: `ChildQuestion.alternatives: AlternativeQuestion[]` (default `[]`) — internal choice inside a case/source part ("(c) either (i) or (ii)"), each alternative validated and worth the same marks as the part.
- `study.ts`: `NotesSection.visuals: Visual[]` (default `[]`); `visual` still works and is shown first.
- `common.ts`: `Provenance.author` (optional) for human/agent authors; `model` stays for generated items.
- `visual.ts`: geometry coordinate convention documented (origin bottom-left, y up); points as `[x, y]` or `{ at, label: string | false, label_position }` (+ `pointAt()`); segment `ticks`/`arrows`; `lines`, `rays`; angle `arcs`; polygon `highlight`; `scale`, `not_to_scale`. Plot `functions[].expr` grammar pinned (≤ 200 chars) and `samples`. Table cells documented as inline Markdown with `$…$`.
- `svg-allowlist.ts`: `SVG_RULES.classPattern` (`^diagram-[a-z0-9-]+$`) and `requireViewBox` (design-system parity).
- `index.ts` now also exports `outline` and `svg-allowlist`.

## How to verify (from `platform/`, real output)

```
$ npm run typecheck            # ai-core, content-pipeline, db, e2e, shared: tsc clean
$ npm test -w @soyl/ai-core -w @soyl/content-pipeline -w @soyl/shared
@soyl/ai-core           Test Files 1 passed (1)   Tests 26 passed (26)
@soyl/content-pipeline  Test Files 3 passed (3)   Tests 166 passed (166)
@soyl/shared            Test Files 3 passed (3)   Tests 25 passed (25)

$ npm run content -- catalog          # rows condensed per exam
board  exam  class  subjects  syllabi  chapters  topics  blueprints
cbse   cbse  7..12       448       70       916    2813           0
cisce  icse  7..10       187      187      2067    8863           0
cisce  isc   11..12      136      136      1560    6774           0
total                    771      393      4543   18450           0
unmapped subjects (fell back to "other"): none
catalog valid: 0 error(s), 0 warning(s)

$ npm run content -- plan --board cbse --class 10 --subject science
cbse-10-science-ch01  Chemical Reactions and Equations   science  1  missing  missing  missing  10  151k  54k  ₹62.05  ₹31.02
… (15 chapters, ₹56.39–₹62.09 each)
total remaining (stages 2–3): 150 calls, 22,27,507 input + 7,80,482 output tokens
  estimate ₹898.61 synchronous, ₹449.30 with --batch
  per-run cap (CONTENT_BUDGET_INR) ₹25,000: fits
  total cap (CONTENT_BUDGET_TOTAL_INR) ₹3,00,000, real spend so far ₹0.00, left ₹3,00,000.00: fits

$ npm run content -- generate --board cbse --class 10 --subject science --chapter 1 --provider mock
provider: mock (seed "soyl") — output is PLACEHOLDER text, costs are simulated
assembled 1/1 unit(s): cbse-10-science-ch01
run r-…: done — {"done":10} — spend ₹27.67 (simulated)
$ npm run content -- lint --board cbse --class 10 --subject science --chapter 1
ok   cbse-10-science-ch01: 0 error(s), 4 warning(s)
     warnings: provenance.mock ×4
lint: 1/1 unit(s) clean, 0 error(s), 4 warning(s)          (exit 0)

$ npm run content -- lint --exemplars
ok   cbse-10-mathematics-ch06: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch01: 0 error(s), 0 warning(s)

$ npm run content -- coverage
… 12 board × class rows …
total: 771 subjects (393 with syllabus), 4543 chapters; deck 0/4543, notes 0/4543, flashcards 0/4543, practice 0/4543, chapter_tests 0/9086
1 unit(s) in out/ hold mock placeholder content and are not counted
coverage gate: FAIL (0/771 subjects complete)
wrote content-pipeline/out/coverage/coverage.json and coverage.md

$ npm audit --audit-level=high   # exit 0: no high/critical. 4 moderate (esbuild via db-schema's drizzle-kit), none from these packages.
```

The 4 warnings on the mock unit are the intended `provenance.mock` flags ("placeholder content: never publish"), one per file.

## Dry-run estimate: CBSE Class 10 Science (stages 2–3)

| Chapter | Calls | In tokens | Out tokens | INR (sync) | INR (Batch) |
|---|---|---|---|---|---|
| ch01 Chemical Reactions and Equations | 10 | 151k | 54k | ₹62.05 | ₹31.02 |
| ch02 Acids, Bases and Salts | 10 | 152k | 54k | ₹62.09 | ₹31.05 |
| ch03 Metals and Non-metals | 10 | 149k | 53k | ₹60.60 | ₹30.30 |
| ch04 Carbon and its Compounds | 10 | 150k | 54k | ₹61.93 | ₹30.96 |
| ch05 Life Processes | 10 | 150k | 54k | ₹61.88 | ₹30.94 |
| ch06 Control and Coordination | 10 | 149k | 53k | ₹60.52 | ₹30.26 |
| ch07 How do Organisms Reproduce? | 10 | 148k | 51k | ₹59.18 | ₹29.59 |
| ch08 Heredity | 10 | 146k | 50k | ₹57.70 | ₹28.85 |
| ch09 Light – Reflection and Refraction | 10 | 149k | 51k | ₹59.28 | ₹29.64 |
| ch10 The Human Eye and the Colourful World | 10 | 148k | 53k | ₹60.47 | ₹30.24 |
| ch11 Electricity | 10 | 149k | 53k | ₹60.51 | ₹30.25 |
| ch12 Magnetic Effects of Electric Current | 10 | 149k | 53k | ₹60.57 | ₹30.29 |
| ch13 Our Environment | 10 | 146k | 50k | ₹57.73 | ₹28.86 |
| ch14 Periodic Classification (formative) | 10 | 146k | 48k | ₹56.39 | ₹28.19 |
| ch15 Evolution (formative) | 10 | 146k | 50k | ₹57.71 | ₹28.85 |
| **Total** | **150** | **2.23M** | **0.78M** | **₹898.61** | **₹449.30** |

Per chapter: 1 outline + 1 deck part + notes + flashcards + 4 practice batches (≤ 15 each) + 2 case batches = 10 mid-tier calls. Input is the exact rendered prompt (science templates incl. trimmed exemplar few-shot ≈ 10k tokens per call) + JSON Schema; output is the expected size per asset + 35% reasoning tokens. **Assumptions** (`models.ts`, all `unverified`, USD 1 = ₹88): small ₹22 / ₹2.2 / ₹176, mid ₹110 / ₹11 / ₹880, verify ₹176 / ₹17.6 / ₹1,408 per 1M input / cached input / output tokens; Batch 50%. These reproduce CONTEXT §6 (quick doubt ₹0.03, hard doubt ≈ ₹0.52, paper-from-upload ≈ ₹6.05). No prompt-cache discount is assumed, so this is conservative. Stage 5 (verify, M2) is not included.

For planning: the whole catalog with syllabi (771 subjects, 4,543 chapters) estimates **₹2,29,289 synchronous / ₹1,14,645 with Batch** (43,453 calls) for stages 2–3; 378 subjects still have no syllabus file. That fits the ₹3,00,000 total cap with Batch but needs ≈ 10 runs at ₹25,000 each; verify (stage 5) will add to it.

## Budget behaviour
`CONTENT_BUDGET_INR` (per run, default ₹25,000) and `CONTENT_BUDGET_TOTAL_INR` (all runs, default ₹3,00,000). Every call reserves its worst case first and is refused if either cap could be crossed; the run then pauses **only model calls** (`paused_budget`, exit 3) while lint/coverage/status keep working; `--run <id>` resumes after the cap is raised. Mock spend is metered at the same prices but recorded as simulated and never counts toward the real total.

## Tests added
- `ai-core/src/ai-core.test.ts` (26): metering maths and CONTEXT §6 reproduction, Batch discount, budget guard stops at the run and total caps without calling the provider, 429 with `retry-after`/`retry-after-ms`, backoff/jitter, limiter, mock determinism, mock refuses `NODE_ENV=production`/`APP_ENV=prod` unless the explicit test flag, Azure request shape with a fake fetch (URL, bearer token, no api-key, body, JSON Schema response_format, usage, request id), Batch file upload/create/poll/fetch, env config errors.
- `content-pipeline/test/lint-rules.test.ts`: every lint rule with pass/fail fixtures; XSS corpus for SVG (script, onload/onclick, `javascript:` and entity-encoded `&#106;avascript:`, `xlink:href` to http, `<foreignObject>`, `<style>`/style attr with `url()`, `<image>`, `<a>`, `<set>`/`<animate>`, `<iframe>`, `data:`, DOCTYPE entity expansion and XXE, undefined entities, PIs, CDATA, non-SVG namespaces, page-CSS classes, oversize), markdown (`<img onerror>`, `<script>`, links, autolinks, image beacons, emails, phones, profanity) and KaTeX (`\href{javascript:…}`, `\url`, `\html*`, `\def` bombs, `\includegraphics`); expression parser (valid grammar and 16 rejected inputs); chem balance; arithmetic in solutions; geometry sanity.
- `content-pipeline/test/templates-families.test.ts`: template parse/render/strictness, `{{task}}` auto-append, `content_json`/`id_prefix`, resolution order, every template in the repo parses, few-shot trimming on the real exemplar, family mapping completeness over the real catalog (771 subjects; zero unmapped; every core academic subject has a dedicated family), id-prefix uniqueness per exam and class, planning.
- `content-pipeline/test/pipeline.test.ts`: state store, end-to-end `plan → outline → generate → lint` for cbse-10-science-ch01 (lint-clean, estimate > 0, ids `q_cbse10sci_ch01_001…`, provenance `science.notes@1`/`mock`), determinism by seed, Batch, resume skips done items, 2 automatic retries then `needs_review` and `--retry-review`, budget pause + `--run` resume, M2 stubs exit 2, GEN-3 through the CLI path, Azure misconfiguration message, **every exemplar in content-templates lints clean**.
- `shared/content/contract-m1.test.ts`: alternatives, notes visuals, provenance author, outline, question bank, SVG class rule.

## Exemplar feedback folded in (Lead's two requests)
- Science: `alternatives`, notes `visuals`, `Provenance.author`; `{{content_json}}` and `{{id_prefix}}` (`q_<exam><class><abbrev>_chNN`, rule in `src/ids.ts` + README); few-shot fragment/query resolution and default trimming per asset (README); lint: KaTeX+mhchem everywhere, SVG allow-list + palette (warning) + duplicate/reused ids, atom balance with the documented skeletal/wrong-option exemption (no contract field needed: the text says "skeletal"/"unbalanced"/"Balance …"), narration symbols (error), check slides must be objective, competency band 45–65% and d4–5 presence (warnings), lost-backslash and eaten-JSON-escape detection.
- Maths: geometry contract additions above; plot grammar pinned and linted; table cells defined; `math.arithmetic` recomputes numeric `=` chains in solutions/model answers/worked examples; `solution.answer` warning; geometry sanity (in-canvas, right angles, degree labels, one scale, honouring `not_to_scale` or a "not to scale" caption). Both exemplars: 0 errors, 0 warnings.

## New runtime dependencies (GEN-5)
| Package | Where | Why | Audit |
|---|---|---|---|
| `katex` 0.19.0 | content-pipeline | Stage 4 must parse maths/mhchem exactly as the web renders it (WEB-7 settings); the renderer uses KaTeX too. | clean |
| `saxes` 6.0.0 | content-pipeline | A strict, non-validating XML parser (no DTD/entity expansion) so SVG is checked structurally, never by regex (F-012). One small dependency (`xmlchars`). | clean |
| `js-yaml` ^4.1.0 | content-pipeline | Catalog YAML (already used by content-templates). | clean |
| `tsx` 4.23.15 | content-pipeline | Runs the TypeScript CLI (`npm run content`); the shared contract uses extensionless imports, which Node's type stripping does not resolve. Dev-time tool; a worker build in M2 would bundle with esbuild (D-022) instead. | clean |
| `@azure/identity` ^4.13.3 | ai-core, **optional peer, not installed** | `DefaultAzureCredential` for keyless auth (INFRA-5). Not installed now because every current release pins `@azure/msal-node` 6.x with a high advisory (GHSA-xcx6-jx8p-x3h5) and npm `overrides` did not take inside this workspace; nothing can use Azure before OA-02 anyway. The factory imports it lazily and explains how to install it. | — |
No other runtime dependencies; the Azure provider uses `fetch`. `zod` is the existing `^4.6.7`.

## Known gaps / follow-ups (M2)
- **Postgres StateStore**: implement `PostgresStateStore` over db-schema's tables (`platform/db/schema/pipeline.ts`): `pipeline_runs`, `pipeline_unit_status`, `pipeline_items` (fill the `input_tokens`/`cached_input_tokens`/`output_tokens` int columns as well as `usage`; `last_run_id` FK), `content_budget_ledger` (provider/tier/model/unit/stage/tokens/cost/simulated; `provider = 'mock' ⇒ simulated`). Move budget reservations to a row-locked column so parallel workers share one cap; read the cap from `config_values` via the `content_budget` view. Interface and mapping are in `src/state.ts` and the README.
- **Stages 5–9**: verify (verify tier independent solve + JS numeric re-solve of every numerical answer and solution, building on `lint/arith.ts`; auto-regenerate flagged items up to 2 times), originality (n-gram overlap + model check), assemble (blueprint engine; no blueprints exist in the catalog yet), tts (Azure AI Speech), publish (assemble `ChapterRelease` from `out/<unit>/`, refuse `provenance.model === 'mock'`, ingest via db-schema's `ingestChapterRelease` / `ingestTestDefinition`).
- Real-provider path: first live run once OA-02 is done — install `@azure/identity` (or a release that fixes the msal advisory), set the deployment env vars, `plan`, then a single-chapter `generate --provider azure`, then tune templates with exemplar-author. Strict JSON Schema mode is not used (our schemas have optional fields); validation + one repair is relied on instead — measure the repair rate on the first real run.
- Prompt caching: the estimate assumes no cached input; the templates put the stable instructions and few-shot first, so real costs should come in lower.
- Exemplar templates do not place `{{task}}`; the pipeline appends it ("Instructions for this call"). Exemplar-author may move it into the templates. Templates still say ids `q_{{chapter_id}}_NNN`; ids are renumbered at assembly anyway, `{{id_prefix}}` is available.
- Blueprints: none in the catalog yet, so question plans use the family default mixes (`config/pipeline.ts`); they switch to blueprint mixes automatically when curriculum-cbse's blueprints land.
- Coverage counts pipeline output in `out/`; in M2 it should count published releases in Postgres.

## Decisions made
- Default provider is **mock** (no accidental spend); `--provider azure` is explicit.
- Budget: worst-case reservation before each call; refusal pauses only model calls (ADR-free, recorded in the README).
- Deliberately unbalanced equations are marked by their surrounding text, not a contract field (ADR-007).
- Plot grammar: implicit multiplication only before a name or `(` (agreed with design-system).
- Mock output never counts toward coverage and is flagged by lint.
- ADR-007 accepted.

## Needs from owner
- **OA-02**: Azure OpenAI deployments + Batch quota, and confirmation of real INR prices for the three tiers so `models.ts` can drop `unverified`.
