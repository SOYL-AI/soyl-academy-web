# CBSE Class 11 Chemistry, Chapter 1 — Some Basic Concepts of Chemistry

`cbse-11-chemistry-ch01` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (6 sections), 32 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch01_short` (20 marks, 40 min) and `t_cbse11chem_ch01_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 5 syllabus topics are covered: t01 Nature and properties of matter; measurement and uncertainty; t02 Laws of chemical combination and Dalton's theory; t03 Atomic and molecular masses; mole concept; t04 Percentage composition, empirical and molecular formulae; t05 Stoichiometry and limiting reagent.

- Facts a reviewer may wish to double-check: N_A 6.022 × 10²³ mol⁻¹; 1 u = 1.66 × 10⁻²⁷ kg; molar volume 22.4 L at 273.15 K and 1 atm (22.7 L at 1 bar); isotope data for Cl (34.97 u, 75.77 %; 36.97 u, 24.23 %), B and Cu; dates of the laws (Lavoisier 1789, Proust 1799, Dalton 1803, Gay-Lussac 1808, Avogadro 1811); reagent-bottle concentrations (HNO₃ 68 % at 1.41 g mL⁻¹ is 15.2 M; HCl 37 % at 1.19 g mL⁻¹ is 12.1 M; NH₃ 28 % at 0.90 g mL⁻¹ is 14.8 M). Law-of-combination data for tin, phosphorus, copper, sulfur and iron compounds are labelled illustrative.

## Shape
- **Part 1, 18 slides:** measurement and SI units; scientific notation, accuracy and precision; significant figures; worked example (significant figures); laws of chemical combination; worked example (testing the laws with data); dalton’s atomic theory; atomic mass, molecular mass and formula mass; worked example (average atomic mass); the mole and molar mass; the mole map; worked example (mole conversions); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** percentage composition; worked example (percentage composition); empirical and molecular formulae; worked example (empirical formula); stoichiometry from a balanced equation; worked example (mass to mass); the limiting reagent; limiting reagent in a picture; worked example (limiting reagent); expressing concentration; worked example (concentration terms); dilution and mixing; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 2 · example 9 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · svg 2 · table 23. Two SVGs (a mole map linking mass, particles, gas volume and solution amount; a limiting-reagent before-and-after bar chart) with computed geometry. Narration 11–70 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a c) |
| true-false | 3 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (3.7 g cm⁻³; 1.66; 1.09 × 10²¹ molecules; 8 atoms; 1.35 kg; 33.6 g; 17.8 g; 0.16 mol L⁻¹; 15.2 mol L⁻¹) |
| short (2 marks) | 8 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 9 · d2 36 · d3 20 · d4 3.
- **Competency:** recall 5 · understanding 23 · application 36 · analysis 4. Application or higher is **59% of items (75% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 12 · t02 11 · t03 10 · t04 10 · t05 26.
- **Deck checks:** q001, q012, q023 (Part 1); q033, q043, q044 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q013, q026, q005 · B q010, q009, q040 · C (q011 or q021) · D q020.
- **Long (40 marks, 90 min):** A q003, q004, q014, q015, q024, q034, q045, q046, q027, q028 · B q018, q019, (q031 or q062), q032, (q060 or q061) · C q041, (q065 or q066) · D q042, q067.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (3 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 44/44 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed facts, scope, numericals and the rendered SVGs and rebuilt from source.
2. **Fixes by the writer.** Application or higher was 72 % at first; nine one-step items were re-tagged as understanding (59 % now). Model answers were lengthened to the word limits, a reversed arrow label on the mole map and label collisions on the limiting-reagent chart were corrected.
3. **Originality gate.** The generic stem of the concentration-terms match item duplicated a CBSE 12 Solutions stem; the producer rewrote it around a labelled glucose solution.
4. **Every numerical (moles, masses, formulae, limiting reagent, concentration terms) is computed in the build and asserted by a re-solve check.**

## Known gaps
- Narration audio is not generated (TTS stage).

