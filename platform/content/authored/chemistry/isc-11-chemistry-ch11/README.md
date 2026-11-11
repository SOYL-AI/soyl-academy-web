# ISC Class 11 Chemistry, Chapter 11 — Thermochemistry

`isc-11-chemistry-ch11` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 32 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch11_short` (20 marks, 50 min) and `t_isc11chem_ch11_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Heat of reaction: standard heat of formation, combustion, solution, dilution and neutralisation; calorific value of a fuel; t02 Constancy of heat of neutralisation for strong acids and strong bases; t03 Enthalpies of bond dissociation, atomisation, sublimation, phase transition and ionisation; t04 Hess's law of constant heat summation and its applications.
- Heats of formation, combustion, solution, dilution and neutralisation; calorific value; constancy of the heat of neutralisation for strong acids and bases; bond dissociation, atomisation, sublimation, phase-transition and ionisation enthalpies; Hess's law with formation-data, combustion-data and bond-enthalpy cycles.
- Facts a reviewer may wish to double-check: ΔfH° (kJ mol⁻¹): CO₂ −393.5, H₂O(l) −285.8, H₂O(g) −241.8, CH₄ −74.8, C₂H₆ −84.7, C₂H₄ +52.3, C₂H₂ +226.7, CO −110.5, NH₃ −46.1, NO +90.3, NO₂ +33.2, C₃H₈ −103.8, C₂H₅OH(l) −277.7. Neutralisation: strong acid–strong base −57.1, ethanoic acid −55.2, HCN −12.1 kJ per mole of water. Solution: NaOH −44.5, NH₄NO₃ +25.7, CuSO₄ −66.5, CuSO₄·5H₂O +11.7. Bond enthalpies: H–H 436, O=O 498, Cl–Cl 242, C–H 414, C–C 347, C=C 611, C≡C 837, O–H 463, C=O 799. ΔsubH: C 716.7, Na 107.3, Mg 147.7, I₂ 62.4; IE Na 496, Mg 738 and 1451. Water ΔfusH 6.01, ΔvapH 40.7 kJ mol⁻¹. Glucose ΔcH −2803 kJ mol⁻¹ (given); limestone decomposition +178 kJ mol⁻¹.

## Shape
- **Part 1, 17 slides:** the enthalpy change of a reaction; standard enthalpy of formation and of combustion; formation and combustion are linked; worked example (enthalpy of combustion of propane); enthalpy of solution and of dilution; measuring a heat change: the calorimeter; calorific value of a fuel; worked example (a propane cylinder); heat of neutralisation of strong acids and bases; why weak acids and bases give less heat; worked example (temperature rise on neutralisation); summary; exam tips; 3 checks.
- **Part 2, 17 slides:** bond dissociation and mean bond enthalpy; enthalpy of atomisation; a Hess cycle for the atomisation of ethene; worked example (ΔH from bond enthalpies); phase-transition enthalpies; ionisation enthalpy; worked example (potassium solid to gaseous ions); hess’s law of constant heat summation; using Hess’s law; worked example (formation of ethene from combustion data); worked example (dehydrogenation of ethane); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 4 · example 7 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 7 · table 20. SVGs: formation and combustion of methane to scale, a coffee-cup calorimeter, neutralisation bars, fuel calorific values, the heating curve of water, the ethene atomisation cycle and the NO/NO₂ energy levels; all rendered and checked by eye. Narration 42–65 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (73)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys b a c a d c; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 5 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1–3 (11099.5 kJ; 15.57 kJ g⁻¹; 56 kJ mol⁻¹; 2336.7 kJ mol⁻¹; 108.5 kJ; 33.2 kJ mol⁻¹) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 22 · d2 25 · d3 23 · d4 3.
- **Competency:** recall 12 · understanding 18 · application 37 · analysis 6. Application or higher is **59% of items (73% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 25 · t02 14 · t03 21 · t04 16.
- **Deck checks:** q002, q010, q026 (Part 1); q038, q062, q064 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q023, q040, q058, q031 · B q017, (q018 or q033) · C q021, (q054 or q068) · D q071.
- **Long (40 marks, 100 min):** A q003, q004, q024, q025, q037, q039, q041, q060, q061, q059, q066, q049 · B q032, q051, (q019 or q067) · C q034, q035, q055, (q069 or q022) · D q036, (q056 or q072).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (13 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 39/39 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. The bank first sat at 64 % application or higher, at the top of the band. The producer replaced two one-step MCQs (a propane heat calculation and a fusion-plus-vaporisation sum) with a standard-state recall item and a frost-sublimation understanding item, and added a limestone ΔH-sign item, an atomisation fill-blank and an ionisation-enthalpy true-false. Now 59 %; no tags were changed.
2. The producer re-solved every numerical (calorific values, neutralisation heats and temperature rises, bond-enthalpy and formation-data cycles, the ice-to-steam heat): all correct.
3. Writer fixes: two 'data:' strings, a rounded '=' changed to ≈, and a wrong re-solve check (the question was right).

## Known gaps
- Narration audio is not generated (TTS stage).

