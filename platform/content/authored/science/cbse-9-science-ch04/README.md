# CBSE Class 9 Science, Chapter 4 — Exploring Mixtures and their Separation

`cbse-9-science-ch04` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 19 slides), notes (7 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch04_short` (20 marks, 40 min) and `t_cbse9sci_ch04_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch04/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Homogeneous and heterogeneous mixtures; t02 Solutions, suspensions and colloids; t03 Concentration of solutions and solubility; t04 Separation techniques.
- The “Indian traditional practices” of the syllabus are kept at textbook level: salt pans on the Gujarat coast (evaporation), winnowing, butter churning (compared with centrifugation, with the caution that churning joins fat droplets; the cream separator is the true centrifuge case), jaggery making (boiling and crystallisation on cooling) and the deg-bhapka distillation of attar in Kannauj (treated as steam or hydro-distillation). These descriptions are worth a reviewer’s check.
- Facts a reviewer may wish to double-check: Approximate solubilities (KNO₃ 32 g per 100 g water at 20 °C rising to 110 g at 60 °C and 169 g at 80 °C; NaCl about 36–38 g); particle sizes about 1 nm and 1000 nm as the solution–colloid–suspension limits (some books use 100 nm, noted in the SVG); boiling points acetone 56 °C, ethanol 78 °C; liquefied air gives nitrogen (−196 °C) before oxygen (−183 °C); sea water about 3.5 % dissolved salts (approximate).

## Shape
- **Part 1, 20 slides:** pure substances and mixtures; homogeneous and heterogeneous mixtures; how big are the particles?; solution, suspension and colloid compared; the Tyndall effect; colloids in everyday life; worked example (what kind of mixture is it?); how strong is a solution?; worked example (mass percentage); worked example (volume percentage and mass by volume); solubility, saturated and unsaturated solutions; reading solubility curves; worked example (crystals on cooling); temperature, gases and crystallisation; summary; exam tips; 3 checks.
- **Part 2, 19 slides:** choosing a method; evaporation and the salt pans of Gujarat; crystallisation, and jaggery; simple distillation; worked example (separating acetone and water); fractional distillation; attars of Kannauj: the deg and bhapka; paper chromatography; worked example (Rf values); centrifugation; butter from curd and cream from milk; sublimation, separating funnel and magnet; winnowing, sieving and decantation; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 15 · diagram 6 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 6 · table 23. Six SVGs (particle-size scale, Tyndall effect, distillation set-up, chromatography with computed Rf, computed solubility curves, centrifuge), rendered and checked. Narration 20–75 words (mean 57), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c a d b a b) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1–3 (20 %; 705 g; 22 %; 5 %; 160 g; 234 g; 27 %; 0.6) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 11 · d2 28 · d3 24 · d4 1.
- **Competency:** recall 5 · understanding 20 · application 26 · analysis 12 · evaluation 1. Application or higher is **61% of items (67% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 8 · t02 14 · t03 20 · t04 26.
- **Deck checks:** q001, q008, q020 (Part 1); q039, q040, q041 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q003, q011, q024, q014 · B q016, q053, q018 · C (q037 or q059) · D q038.
- **Long (40 marks, 90 min):** A q002, q009, q010, q021, q023, q042, q044, q045, q006, q027 · B q007, q035, (q017 or q054), q056, (q057 or q058) · C q062, (q060 or q061) · D q019, q063.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (12 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 11/11 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed the data, the traditional-practice wording and the diagrams.
2. **Fixes by the writer.** Four items re-tagged to understanding to bring application or higher into the band.
3. **Every concentration, solubility-curve and Rf numerical is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

