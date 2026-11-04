# CBSE Class 11 Chemistry, Chapter 5 — Chemical Thermodynamics

`cbse-11-chemistry-ch05` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 22 slides), notes (6 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch05_short` (20 marks, 40 min) and `t_cbse11chem_ch05_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch05/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 4 syllabus topics are covered: t01 System, surroundings and state functions; t02 First law; internal energy and enthalpy; t03 Measurement of ΔU and ΔH; Hess's law; t04 Entropy, Gibbs energy and spontaneity.

- Facts a reviewer may wish to double-check: R 8.314 J K⁻¹ mol⁻¹; standard enthalpies of formation (NH₃ −46.1, NO +90.3, H₂O(l) −285.8, H₂O(g) −241.8, CO −110.5, CO₂ −393.5, CaCO₃ −1206.9, CaO −635.1, Fe₂O₃ −824.2 kJ mol⁻¹); combustion enthalpies (CH₄ −890.3, C₂H₆ −1559.7, C₂H₂ −1299.6, ethanol −1366.8); average bond enthalpies as in ch04 (C=O in CO₂ 799); fusion of ice 6.01 and vaporisation of water 40.7 kJ mol⁻¹; ΔS for CaCO₃ decomposition 160.5 J K⁻¹; Cp of N₂ 29.1 J K⁻¹ mol⁻¹. Calorimeter constants and some reaction data are labelled given or illustrative.

## Shape
- **Part 1, 19 slides:** system, surroundings and types of system; state functions and path functions; extensive and intensive properties; work and heat: the IUPAC sign convention; pressure–volume work as an area; expansion work formulas; worked example (irreversible and reversible work); internal energy and the first law; worked example (applying the first law); enthalpy; worked example (ΔH and ΔU); heat capacity and C_p − C_v = R; exothermic and endothermic changes; summary; exam tips; 3 checks.
- **Part 2, 22 slides:** measuring ΔU and ΔH: calorimetry; worked example (constant-pressure calorimetry); standard enthalpy changes: formation, combustion, atomisation, sublimation; phase transition, ionisation, solution and dilution; hess’s law of constant heat summation; a Hess cycle: graphite to carbon dioxide; worked example (ΔH from enthalpies of formation); worked example (ΔH_f from enthalpies of combustion); bond enthalpies; worked example (ΔH from bond enthalpies); entropy and the second law; worked example (entropy of fusion and vaporisation); gibbs energy and spontaneity; δG against temperature; worked example (temperature of spontaneity); δG° and the equilibrium constant; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 16 · diagram 4 · example 9 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 4 · table 29. Four SVGs (p–V work as areas for reversible and irreversible expansion; enthalpy level diagrams; a Hess cycle for carbon to carbon dioxide; ΔG against T for calcium carbonate), 6 self-checks. Narration 13–72 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys a a d c b c a) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (-2007 J; -810 J; -87.2 kJ; -1362 kJ mol⁻¹; -84.7 kJ mol⁻¹; -128 kJ; 220 J K⁻¹; 618 K; 5.75) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 8 · d2 30 · d3 24 · d4 4.
- **Competency:** recall 7 · understanding 19 · application 31 · analysis 9. Application or higher is **61% of items (68% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 6 · t02 23 · t03 24 · t04 17.
- **Deck checks:** q001, q006, q010 (Part 1); q023, q028, q036 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q011, q024, q042 · B q050, q054, q057 · C (q060 or q062) · D q066.
- **Long (40 marks, 90 min):** A q003, q007, q008, q012, q026, q029, q037, q039, q004, q041 · B q049, q051, (q052 or q053), q033, (q058 or q056) · C q034, (q035 or q061) · D q063, q065.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (6 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 26/26 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer checked the thermochemical data and the computed results (for example ΔH of CaCO₃ decomposition +178.3 kJ, ethyne formation +226.8 kJ) and rendered the SVGs.
2. **Fixes by the writer.** A J/kJ mix in a Δn_gRT step was corrected and the model answer lengthened; an “= value” step was added to the irreversible-work solution.
3. **Every numerical is computed and asserted; bond-enthalpy estimates are stated as approximate where they differ from formation-data values.**

## Known gaps
- Narration audio is not generated (TTS stage).

