# CBSE Class 9 Science, Chapter 8 — Atoms and Molecules

`cbse-9-science-ch08` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (6 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch08_short` (20 marks, 40 min) and `t_cbse9sci_ch08_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Laws of chemical combination; t02 Dalton's atomic theory; t03 Molecules, ions and chemical formulae; t04 Molecular mass and formula unit mass.
- The mole is not among this chapter’s learning outcomes; it is mentioned only as something met in Class 11.
- Facts a reviewer may wish to double-check: Atomic masses H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40; fixed mass ratios (water H : O = 1 : 8, CO₂ C : O = 3 : 8, ammonia N : H = 14 : 3); Dalton’s five postulates and limitations; all sample masses are labelled given or illustrative.

## Shape
- **Part 1, 16 slides:** law of conservation of mass; checking the law with a closed flask; worked example (marble and acid); law of constant proportions; two samples, one ratio; worked example (testing the law with data); worked example (burning magnesium); dalton's atomic theory; how the theory explains the two laws; limitations of the theory; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** atoms and molecules; atomicity; ions and ionic compounds; polyatomic ions; writing a formula: the criss-cross rules; the criss-cross method in four steps; worked example (three formulae); molecular mass and formula unit mass; worked example (molecular mass); worked example (formula unit mass); reading a formula correctly; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 4 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · svg 4 · table 20. Four SVGs (conservation of mass in a closed flask, constant proportions for two MgO samples, atomicity of He, O₂, O₃, P₄ and S₈ from computed counts, the criss-cross method) and an equation visual, rendered and checked. Narration 20–74 words (mean 57), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c a b d a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (17 atoms; 2.4 g; 21 g; 33 g; 2.1999999999999886 g; 60 u; 132 u; 164 u; 16 u) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 9 · d2 33 · d3 21 · d4 1.
- **Competency:** recall 6 · understanding 18 · application 33 · analysis 6 · evaluation 1. Application or higher is **63% of items (66% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 18 · t02 10 · t03 20 · t04 16.
- **Deck checks:** q001, q004, q015 (Part 1); q025, q026, q053 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q003, q016, q054, q032 · B q009, q038, q062 · C (q012 or q024) · D q043.
- **Long (40 marks, 90 min):** A q002, q005, q017, q027, q029, q030, q055, q056, q006, q031 · B q010, q022, (q021 or q037), q011, (q023 or q039) · C q041, (q042 or q063) · D q013, q064.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (11 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 23/23 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed formulae and masses.
2. **Fixes by the writer.** A check slide was given its own MCQ, a “data:” phrase reworded and two model answers lengthened.
3. **Formulae (criss-cross), molecular and formula-unit masses and mass ratios are computed by a formula parser in data.mjs and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

