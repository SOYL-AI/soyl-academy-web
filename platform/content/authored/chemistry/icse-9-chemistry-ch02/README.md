# ICSE Class 9 Chemistry, Chapter 2 — Chemical Equations and Relative Masses

`icse-9-chemistry-ch02` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (4 sections), 30 flashcards, 78 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch02_short` (20 marks, 30 min) and `t_icse9chem_ch02_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values, including a balancing solver), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` of chapter 1 (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch02/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ICSE 2028 Class IX syllabus topics of the chapter: chemical equations (word and formula equations with one reactant and several products, two reactants and one product, two reactants and several products; the information a balanced equation conveys); balancing by hit and trial; relative atomic and molecular masses (hydrogen and carbon-12 standards); and percentage composition including water of crystallisation.
- No removed topics for this chapter. Moles, molar masses and mass-to-mass or volume calculations from equations belong to Class X and are not asked; equations are used only for atom counts and relative-mass totals.
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): "balance the equation", word equations, state one observation, relative-mass and percentage numericals with working, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Calculation chapter:** 9 numerical items, plus calculation short answers and structured parts. Atomic masses used (stated in the stems): H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40, Fe 56, Cu 63.5, Zn 65.
- **Originality:** the compounds and numbers differ from ICSE 10 Chemistry ch06 and CBSE 11 Chemistry ch01 (which use CaCO₃, SO₂, Ca(NO₃)₂, gypsum, CuSO₄·5H₂O, urea, NH₄NO₃, aspirin and bauxite): this chapter uses Al₂(SO₄)₃, MgSO₄, MgCl₂, Fe₂O₃, ZnSO₄·7H₂O, FeSO₄·7H₂O, Na₂SO₄·10H₂O, CaCl₂·6H₂O and Mg(OH)₂. The marble-and-acid structured question and the copper-with-nitric-acid slide differ in set-up from CBSE 10 Science ch01 and ICSE 10 ch03. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): A sentence in the language of chemistry; Word equation and formula equation; One reactant, several products; Two reactants, one product; Two reactants, several products; Quick check: reading a reaction; What a balanced equation tells us; Worked example 1: reading an equation; Quick check: what the equation says; Balancing by hit and trial; Worked example 2: balance aluminium burning in oxygen; Balancing with groups of atoms; Quick check: balancing; Summary; Exam tips. Part 2 (17 slides): Weighing atoms by comparison; Relative atomic mass; The standard for atomic masses; Relative molecular mass; Worked example 1: aluminium sulphate; Quick check: relative molecular mass; Water of crystallisation in the mass; Worked example 2: a hydrated salt; Percentage composition; Worked example 3: magnesium sulphate; Seeing the composition; Quick check: percentage; Worked example 4: percentage of water of crystallisation; Quick check: water percentage; Finding the mass of an element in a sample; Summary; Exam tips.
- **Visuals (32 of 32 slides):** flow 3, table 20, chem 6, svg 3.
- **Diagrams (4 distinct SVGs):** relative atomic masses as a bar chart against one-twelfth of a carbon-12 atom; percentage composition bars for MgSO₄ and FeSO₄·7H₂O; the laboratory set-up for heating hydrated crystals (named, and lettered A to E for a structured question). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 7–52 words per slide (mean 35); no symbols, formulae or unit abbreviations.

## Question bank (78 items, 153 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 (6 are deck-check items) | 29 |
| assertion-reason | 4 | 4 |
| short-1 (names, balancing, terms) | 7 | 7 |
| true-false | 6 | 6 |
| fill-blank | 4 | 4 |
| numerical | 9 | 9 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem; one has a lettered apparatus diagram.
- **Difficulty:** d1 23 · d2 30 · d3 24 · d4 1.
- **Competency:** recall 18 · understanding 10 · application 43 · analysis 7. Application or higher is **64% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** c b a d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; relative masses, percentages, masses of water or an element, equation mass totals and balancing coefficients are asserted in `calc.mjs`, and the balancing coefficients come from a solver there.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test items were chosen so that no item names the answer of another in the same test (for example the Fe₂O₃ + CO equation is used only in the short-answer item of the short test, and in the structured question of the long test).

## For a reviewer
- **Relative atomic mass** is defined against one-twelfth of a carbon-12 atom, with the hydrogen atom described as the earlier standard (as the syllabus says); it is stated to have no unit (some books write u).
- **Decimals:** Cu is 63.5 and Cl 35.5 as in the brief; percentages are rounded to one decimal place and the stems say so. MgSO₄ gives exactly 20 percent magnesium.
- **Observations and conditions:** heating ammonium dichromate (orange crystals swell, glow and give sparks, leaving a fluffy green chromium(III) oxide, with nitrogen and steam) is a practical named in the syllabus; copper with concentrated nitric acid gives a brown gas (nitrogen dioxide); marble with dilute hydrochloric acid fizzes and the gas turns lime water milky. The tube is clamped with its mouth slightly lower to stop condensed water running back on to the hot glass.
- Ammonium dichromate atom counts are asserted but its relative mass is not asked (chromium is outside the atomic-mass list of the brief).
- The syllabus phrase "equations with different numbers of reactants and products" is covered by one-reactant, two-reactant and several-product examples; state symbols are shown only where useful.
