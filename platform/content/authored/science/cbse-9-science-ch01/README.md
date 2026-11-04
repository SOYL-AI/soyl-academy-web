# CBSE Class 9 Science, Chapter 1 — Cell

`cbse-9-science-ch01` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 19 slides), notes (6 sections), 31 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch01_short` (20 marks, 40 min) and `t_cbse9sci_ch01_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 5 syllabus topics are covered: t01 Discovery of the cell; plant and animal cells; t02 Prokaryotic and eukaryotic cells; t03 Cell organelles: structure and function; t04 Permeability of the cell membrane; diffusion and osmosis; t05 Cell division and recent advances.
- Where the syllabus line is thin (“recent advances”), the chapter keeps to established, cautious textbook-level points: stem cells (bone-marrow transplant as the established use), fluorescence and electron microscopy, cell culture; an evaluation item tests the claim that stem cells cure everything. Meiosis is taught as two divisions giving four cells with half the chromosome number; its stages are not named.
- Facts a reviewer may wish to double-check: Hooke 1665, Leeuwenhoek 1670s, Schleiden 1838, Schwann 1839, Virchow 1855; cell sizes (bacterium about 1–5 µm, eukaryotic cells about 10–100 µm, cheek cell about 60 µm); chromosome numbers (human 46, onion 16, maize 20, fruit fly 8, pea 14, rice 24); plants store starch, animals glycogen. Osmosis and magnification data are labelled illustrative.

## Shape
- **Part 1, 19 slides:** how cells were discovered; the cell theory; cells differ in size and shape; worked example (size from a drawing); a plant cell; an animal cell; plant cells and animal cells compared; prokaryotic and eukaryotic cells; examples and differences; nucleus, ER and Golgi apparatus; mitochondria, lysosomes and vacuoles; plastids and the cell wall; worked example (which cell is it?); summary; exam tips; 3 checks.
- **Part 2, 19 slides:** the membrane is selective; diffusion; osmosis; activity: an egg in water; activity: raisins and the potato osmometer; worked example (potato strips); hypotonic, isotonic and hypertonic solutions; osmosis in daily life; cell division: mitosis; cell division: meiosis; worked example (counting chromosomes); mitosis and meiosis compared; recent advances in cell biology; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 22 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · svg 6 · table 21. Six SVGs (plant cell, animal cell, prokaryotic against eukaryotic cell, osmosis set-up, a plant cell in three solutions, mitosis against meiosis chromosome flow), rendered and checked. Narration 13–68 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c d b a c) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (2 µm; 7.499999999999996 percent; 112) |
| short (2 marks) | 8 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 6 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 14 · d2 37 · d3 8 · d4 3.
- **Competency:** recall 9 · understanding 17 · application 23 · analysis 11 · evaluation 2. Application or higher is **58% of items (60% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 15 · t02 7 · t03 14 · t04 15 · t05 15.
- **Deck checks:** q001, q012, q018 (Part 1); q032, q033, q047 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q019, q035, q036 · B q040, q027, q010 · C (q029 or q045) · D q031.
- **Long (40 marks, 90 min):** A q003, q004, q013, q014, q021, q034, q048, q049, q015, q023 · B q008, q009, (q041 or q056), q028, (q043 or q058) · C q017, (q044 or q059) · D q046, q060.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (14 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the writer rendered every SVG. The producer reviewed facts, scope and the rendered diagrams and rebuilt from source.
2. **Fixes.** The writer moved the plant-cell nucleus off the vacuole (a self-check failed), fixed clipped and overlapping labels and added difficulty-4 items. The producer removed a duplicated “Cell wall” callout on the plant cell.
3. **Every numerical (magnification, osmosis mass changes, chromosome counts) is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

