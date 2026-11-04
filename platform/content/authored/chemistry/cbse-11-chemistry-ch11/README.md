# CBSE Class 11 Chemistry, Chapter 11 — The Gaseous State (formative assessment only)

`cbse-11-chemistry-ch11` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (6 sections), 31 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch11_short` (20 marks, 40 min) and `t_cbse11chem_ch11_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 1 syllabus topics are covered: t01 Gas laws and the ideal gas equation; deviations.
- The syllabus marks this chapter **formative assessment only** (not in the annual theory paper); it is taught at textbook depth for school tests.

- Facts a reviewer may wish to double-check: R in five units (0.08314 L bar, 0.0821 L atm, 8.314 J, 62.36 L mmHg, 1.987 cal K⁻¹ mol⁻¹); 1 atm = 101.325 kPa = 760 mmHg; absolute zero −273.15 °C; vapour pressure of water (17.5 mmHg at 20 °C … 55.3 at 40 °C); critical constants (CO₂ 304.1 K and 73.8 bar, among others); van der Waals constants (CO₂ a 3.640 L² bar mol⁻², b 0.0427 L mol⁻¹, among others). The Z against p curves are schematic and the Z table illustrative.

## Shape
- **Part 1, 16 slides:** intermolecular forces and the state of matter; boyle’s law: pressure and volume; boyle isotherms; charles’s law and the Kelvin scale; the Charles plot; worked example (a weather balloon); gay-Lussac’s law and Avogadro’s law; the ideal gas equation and the gas constant; worked example (moles in a flask); density and molar mass of a gas; summary; exam tips; 3 checks.
- **Part 2, 16 slides:** dalton’s law of partial pressures; worked example (oxygen and nitrogen in a flask); a gas collected over water; worked example (oxygen collected over water); why real gases deviate from ideality; the compressibility factor Z; z against p for real gases; the van der Waals equation; worked example (ideal against van der Waals); liquefaction and critical temperature; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 12 · diagram 3 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: svg 3 · table 23. Three SVGs (Boyle isotherms as p–V and p–1/V; Charles plots extrapolating to −273.15 °C; schematic Z against p for H₂, N₂, CO₂ and an ideal gas), 10 self-checks. Narration 10–79 words (mean 60), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1–3 (4 atm; 3 L; 6.43 mL; 1.92 kg; 71.3 g mol⁻¹; 9.98 bar; 4.72 mmol; 22.4 bar) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 13 · d2 36 · d3 13 · d4 1.
- **Competency:** recall 6 · understanding 20 · application 26 · analysis 10 · evaluation 1. Application or higher is **59% of items (54% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 63.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q009, q010, q014, q021 · B q044, q048, q050 · C (q055 or q058) · D q060.
- **Long (40 marks, 90 min):** A q008, q011, q012, q013, q016, q017, q018, q019, q022, q024 · B q045, q046, (q047 or q049), q051, (q052 or q054) · C q056, (q059 or q057) · D q061, q063.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (10 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 20/20 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer checked constants and the computed gas-law answers.
2. **Fixes by the writer.** Two long model answers were lengthened, two narrations trimmed, a case MCQ with two correct answers reworded and the schematic CO₂ curve given a clear dip.
3. **Formative assessment only, as the title slides say; every gas-law numerical is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

