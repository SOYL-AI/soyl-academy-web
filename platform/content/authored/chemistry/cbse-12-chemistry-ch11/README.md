# CBSE Class 12 Chemistry, Chapter 11 — Surface Chemistry (formative assessment only)

`cbse-12-chemistry-ch11` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

The syllabus marks this chapter `board_assessed: false` (formative assessment only). It is authored to the same standard as the board chapters so that schools can use it for periodic tests; the title slide says it is not in the board exam.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 20 slides), notes (5 sections), 31 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch11_short` (20 marks, 40 min) and `t_cbse12chem_ch11_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both syllabus topics are covered: t01 adsorption (physisorption and chemisorption, factors affecting adsorption of gases on solids) and t02 colloids, emulsions and coagulation.
- Adsorption vs absorption; adsorbate/adsorbent; desorption, sorption; ΔH, ΔS, ΔG of adsorption; physisorption vs chemisorption (enthalpy ranges, specificity, reversibility, layers, temperature); nature of gas (critical temperature), surface area, pressure (isotherms), temperature; Freundlich isotherm and its log plot; adsorption from solution; applications. True solutions, colloids and suspensions; eight types by phases; lyophilic and lyophobic sols; multimolecular, macromolecular and associated colloids (micelles, CMC, Kraft temperature); preparation (hydrolysis, double decomposition, Bredig’s arc, peptisation) and dialysis; Tyndall effect, Brownian movement, charge, electrophoresis; coagulation, Hardy–Schulze rule, coagulation value, protective colloids; emulsions (O/W, W/O, emulsifiers); everyday applications.
- Facts a reviewer may wish to double-check: critical temperatures (SO₂ 430 K, NH₃ 406 K, CO₂ 304 K, CH₄ 190 K, H₂ 33 K); enthalpy ranges (physisorption about 20–40, chemisorption about 80–240 kJ mol⁻¹); lists of positive and negative sols.

## Shape
- **Part 1 (t01), 18 slides:** everyday examples; adsorption vs absorption; why adsorption is exothermic; physisorption vs chemisorption; effect of temperature (plot); worked example (which kind of adsorption); nature of gas and surface area; isotherms (plot); Freundlich isotherm (log plot); worked example (Freundlich constants); adsorption from solution; worked example (ethanoic acid on charcoal); applications; summary; exam tips.
- **Part 2 (t02), 20 slides:** solution/colloid/suspension; worked example (classifying four mixtures); phases; lyophilic and lyophobic; multimolecular, macromolecular, associated; preparation and purification; Tyndall effect and Brownian movement (diagram); charge (diagram); electrophoresis; coagulation and Hardy–Schulze; worked example (coagulating power); protective colloids; emulsions; colloids around us; summary; exam tips.
- Layouts: title 2, concept 17, diagram 4, example 5, check 6, summary 2, exam-tips 2.
- **Visuals in decks:** table 26, plot 3, flow 1, svg 2 (no gap longer than one slide). **Diagrams (2 hand-written SVGs):** Tyndall effect (true solution vs sol, observer at right angles); a positively charged Fe₂O₃·xH₂O particle with adsorbed Fe³⁺ and a diffuse Cl⁻ layer. **Plots:** Freundlich isotherms at two temperatures; log(x/m) vs log p; physisorption vs chemisorption against temperature (illustrative).
- **Narration:** 13–77 words (mean 58); no formulae or symbols.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b a c d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 3 | 2 |
| numerical | 6 | 1 or 2 (Freundlich x/m = 6.0; n = 2.5; 0.30 g acid per g charcoal; pressure factor 2; coagulating-power ratio 80; 25 nm) |
| short | 7 + 4 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 13 · d2 28 · d3 20 · d4 1.
- **Competency:** recall 7 · understanding 21 · application 30 · analysis 4. Application or higher is **55% of items (55% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 28 · t02 34.
- **Cases:** dye removal with activated charcoal in Pune (temperature effect, 40 mg dye per g, surface area, or physisorption evidence); muddy Hooghly water (charge from electrophoresis, best coagulant, particle size, or why alum not salt); vanishing and cold creams (O/W vs W/O, emulsifier choice, role of emulsifier or a dye/conductance test); nitrogen on silica and hydrogen on nickel (Freundlich n = 2 and k = 0.5, physisorption vs chemisorption, or x/m at p = 4 and a limitation).
- **Deck checks:** q001, q002, q003 (Part 1); q027, q028, q029 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q004, q006, q030 (MCQ), q045 (A-R) · B q020, q050 (2 marks), q055 (3 marks) · C q025 or q056 · D q060.
- **Long (40 marks, 90 min):** A q005, q007, q008, q009, q031, q033, q035, q036 (MCQ), q014, q046 (A-R) · B q023, q052, (q051 or q053), q024, (q021 or q054) · C q057 + (q026 or q058) · D q059, q062.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; every numerical re-solved by the build.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Worked examples.** The first build of Part 2 had one worked example (the validator needs two); a worked example classifying four mixtures was added.
2. **Schema.** Notes formulas are now `{ latex, label }` objects; the Part 2 summary was trimmed to six bullets.
3. **Assertion–reason.** One draft A-R item about gelatin in ice cream was dropped (whether R explained A was arguable), and the NaCl vs Na₂SO₄ item was rewritten so that A is false and R is a correct statement of the Hardy–Schulze rule (key d).
4. **Word limit.** One 2-mark model answer was 63 words; it was tightened to the 30–50 band.
5. **Originality gate.** The first gate run flagged a bank duplicate: the Tyndall fill-blank was 93% similar to a CBSE 10 Science item; it was rewritten as an observation (torch beam through diluted milk vs salt water) and retagged application. Re-run: 0 errors.
6. **Originality.** All data (dye trial in Pune, Hooghly water, creams, nitrogen on silica, 0.60 M acid on 3.0 g charcoal) are fresh; no textbook or sample-paper wording.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Plots and case data are illustrative values, labelled as such.
