# CBSE Class 9 Science, Chapter 2 — Tissues

`cbse-9-science-ch02` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (7 sections), 31 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch02_short` (20 marks, 40 min) and `t_cbse9sci_ch02_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Levels of organisation; t02 Plant tissues: meristematic and permanent; t03 Animal tissues: epithelial, connective, muscular and nervous (overview); t04 Joints and care of the musculoskeletal system.

- Facts a reviewer may wish to double-check: Meristem types and positions; simple and complex permanent tissues; epithelial, connective, muscular and nervous tissues; joint types with textbook examples (shoulder and hip, elbow and knee, neck pivot, wrist and ankle gliding as a simplification, skull fixed); vitamin D and calcium (rickets). The calcium worked example uses about 1000 mg a day, a common guideline for 13 to 15 year olds, labelled illustrative; milk about 120 mg calcium per 100 mL.

## Shape
- **Part 1, 17 slides:** levels of organisation; why tissues are useful; two groups of plant tissue; meristematic tissue; worked example (which meristem?); simple permanent tissues; parenchyma, collenchyma and sclerenchyma compared; complex tissues: xylem and phloem; xylem and phloem compared; protective tissue: epidermis and cork; worked example (size of a vessel); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** the four animal tissues; epithelial tissue; types of epithelium and their jobs; connective tissue; kinds of connective tissue; worked example (name the tissue); muscular tissue; the three muscles compared; nervous tissue and the neuron; joints; caring for bones and muscles; worked example (calcium in milk); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 19 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · svg 8 · table 16. Eight SVGs (meristems, simple permanent tissues, xylem and phloem, epithelia, connective tissues, neuron, three muscle types, five joint types), rendered and checked. Narration 16–69 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c a d b c a) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (34 µm; 100800; 640) |
| short (2 marks) | 9 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 6 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 15 · d2 42 · d3 7 · d4 1.
- **Competency:** recall 7 · understanding 23 · application 24 · analysis 8 · evaluation 3. Application or higher is **54% of items (52% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 5 · t02 26 · t03 23 · t04 13.
- **Deck checks:** q006, q007, q008 (Part 1); q031, q032, q033 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q001, q014, q053, q015 · B q025, q045, q048 · C (q050 or q063) · D q051.
- **Long (40 marks, 90 min):** A q011, q012, q013, q034, q035, q036, q054, q055, q016, q038 · B q023, q024, (q047 or q060), q002, (q061 or q062) · C q029, (q049 or q028) · D q030, q065.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (8 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 3/3 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed facts and diagrams.
2. **Fixes.** The writer corrected quarter-mark scheme steps, added items on levels of organisation and tidied several SVGs after rendering. The producer raised the illustrative daily calcium need from 800 mg to about 1000 mg (closer to the guideline for this age), with the worked example and numerical recomputed (640 mg still needed).
3. **Every numerical is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

