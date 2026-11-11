# ISC Class 11 Chemistry, Chapter 12 — Entropy, Free Energy and Spontaneity

`isc-11-chemistry-ch12` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (6 sections), 32 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch12_short` (20 marks, 50 min) and `t_isc11chem_ch12_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch12/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Inadequacy of the first law; spontaneous and non-spontaneous processes; second law of thermodynamics; t02 Entropy: physical significance, state function; second law in terms of entropy; entropy change of the universe; thermal death; t03 Gibbs and Helmholtz free energy and their relationship; criteria for spontaneity using delta G = delta H - T delta S; t04 Relation between standard free energy change and equilibrium constant; third law of thermodynamics (statement).
- The second law, entropy as a state function with ΔS = q_rev / T, ΔS of the universe and the thermal death of the universe, Gibbs and Helmholtz energies (G = A + pV) and the criteria of spontaneity, ΔG° = −2.303 RT log K, and the third law (statement).
- Facts a reviewer may wish to double-check: R = 8.314 J K⁻¹ mol⁻¹; 2.303RT = 5.706 kJ mol⁻¹ at 298 K. Transitions: ice 6.01 kJ mol⁻¹ at 273.15 K (22.0 J K⁻¹ mol⁻¹); water 40.7 kJ mol⁻¹ at 373.15 K (109 J K⁻¹ mol⁻¹); benzene fusion 9.87 at 278.7 K; propanone vaporisation 29.1 at 329.4 K; mercury fusion 2.29 at 234.3 K. S° (J K⁻¹ mol⁻¹): H₂ 130.7, N₂ 191.6, O₂ 205.1, NH₃ 192.5, H₂O(l) 69.9, H₂O(g) 188.8, NO₂ 240.1, N₂O₄ 304.3, CO₂ 213.8, MgO 26.9, MgCO₃ 65.7, graphite 5.7, diamond 2.4. Derived: N₂O₄ → 2NO₂ ΔH +57.2, ΔS +175.9 (crossover 325 K); MgCO₃ decomposition ΔH +100.7, ΔS +175.0 (575 K); 2NO + O₂ ΔH −114.2, ΔS −146.5 (780 K). ΔH and ΔS are taken as constant with temperature, as the stems say. H₂O₂ decomposition values are labelled illustrative.

## Shape
- **Part 1, 17 slides:** the first law is not enough; two spontaneous changes; spontaneous and non-spontaneous; the second law; entropy: disorder and a state function; entropy of water rises with temperature; entropy of fusion and vaporisation: ΔS = ΔH / T; worked example (entropy of vaporisation of benzene); entropy change on isothermal expansion of an ideal gas; worked example (expansion of 2 mol of gas); entropy of the universe decides; second law in terms of entropy; thermal death; summary; exam tips; 3 checks.
- **Part 2, 16 slides:** gibbs and Helmholtz free energy; the relation G = A + pV; criteria for spontaneity: ΔG = ΔH − TΔS; δG against temperature; worked example (ΔH° and ΔS° of the Haber reaction); worked example (ΔG° at 298 K and the crossover temperature); δG° and the equilibrium constant; worked example (ΔG° from K); the third law and absolute entropy; worked example (ΔS° from standard entropies); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 4 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 5 · table 20. SVGs: gas expansion and heat flow, S of water against T with jumps ΔH/T and S = 0 at 0 K, ΔS(universe) for ice melting at 283 K and 263 K, ΔG against T with the 325 K and 780 K crossovers, and log K against ΔG°; all rendered and checked by eye. Narration 47–65 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b a d c; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1–3 (88.3 J K⁻¹ mol⁻¹; 9.77 J K⁻¹ mol⁻¹; 40.1 J K⁻¹; 4.78 kJ; 575 K; 4.99) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 20 · d2 23 · d3 24 · d4 2.
- **Competency:** recall 9 · understanding 23 · application 28 · analysis 9. Application or higher is **54% of items (64% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 12 · t02 25 · t03 21 · t04 15.
- **Deck checks:** q004, q019, q016 (Part 1); q038, q039, q059 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q012, q034, q055, q007 · B q010, (q025 or q047) · C q029, (q049 or q065) · D q032.
- **Long (40 marks, 100 min):** A q002, q003, q013, q014, q015, q035, q036, q037, q056, q057, q008, q062 · B q011, q026, (q064 or q027) · C q050, q030, q051, (q066 or q067) · D q053, (q068 or q054).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (9 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 31/31 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. An assertion-reason item paired 'ΔvapS of water is about 109 J K⁻¹ mol⁻¹' with 'vaporisation takes place at constant temperature', which is part of why q/T applies (borderline); the reason is now 'water vapour is a greenhouse gas', true and clearly unrelated, so (b) is unambiguous.
2. The producer re-solved every numerical (entropies of transition, isothermal ΔS, ΔS of the universe, ΔG°, crossover temperatures, ΔA from ΔG, log K and K): all correct.

## Known gaps
- Narration audio is not generated (TTS stage).

