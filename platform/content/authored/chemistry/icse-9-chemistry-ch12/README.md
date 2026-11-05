# ICSE Class 9 Chemistry, Chapter 12 — Study of Gas Laws

`icse-9-chemistry-ch12` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (5 sections), 30 flashcards, 74 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch12_short` (20 marks, 30 min) and `t_icse9chem_ch12_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (every gas-law value computed and asserted), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-chemistry-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch12/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: gas behaviour explained by molecular motion; Boyle's law (statement, form, derivation of the form, graphs, calculations); Charles's law (statement, form, graphs, absolute zero by extrapolation, calculations); Celsius and kelvin scales with STP; and the combined gas equation with reduction to STP.
- No removed topics for this chapter. Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): laws stated with their conditions, assertion-reason items in the specimen option order, numericals with working, and 10-mark structured questions in parts.
- **Calculation chapter:** 17 numerical items (5 are deck-check items), 2 calculation short answers and calculations inside the structured questions. Conventions used throughout: K = °C + 273, STP = 273 K and 760 mm Hg (1 atmosphere). No other pressure unit is used.
- **Originality:** ICSE 10 Chemistry ch05 deals with moles and molar volume (not P–V–T relations), so the closest items are CBSE 11 Chemistry ch11. That bank uses a syringe, a balloon warmed from 27 °C to 87 °C, a rising lake bubble, a rigid heated vessel and gas over water; this chapter uses a bicycle pump, a flask opened to a second flask, oxygen in a flexible bag, a weather balloon, neon in a bulb, a trapped gas in a water bath and a hill-station collection, with different data throughout. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (18 slides): Study of Gas Laws; Molecules of a gas in motion; Gas molecules in a cylinder; What is gas pressure?; Quick check: the cause of pressure; Heating a gas; Boyle's law; Testing Boyle's law; Readings from an experiment; Quick check: reading a table; Graph of P against V; Graph of P against 1/V; Quick check: which graph?; Worked example 1: a bicycle pump; Worked example 2: nitrogen expands; Quick check: compressing hydrogen; Summary; Exam tips. Part 2 (18 slides): Charles's Law and the Gas Equation; Heating a gas at constant pressure; Celsius and kelvin scales; Worked example 1: changing scales; Quick check: a kelvin temperature; Charles's law; Graph of V against Celsius temperature; Absolute zero; Quick check: the V–t line; Worked example 2: Charles's law; The combined gas equation; Worked example 3: the combined equation; Quick check: pressure and temperature; Standard temperature and pressure; Worked example 4: reduction to STP; Quick check: to STP; Summary; Exam tips.
- **Visuals (24 of 36 slides):** flow 5, table 12, svg 3, plot 4.
- **Diagrams (3 SVGs, one in a lettered version, and 4 plots):** gas molecules in three cylinders (compressed, heated); the gas-law apparatus (loaded piston, trapped gas, thermometer, pressure gauge, water bath; named, and lettered A to E for a structured question); the Celsius and kelvin scales one above the other. Plots: P against V, P against 1/V, V against t (°C) extrapolated to −273 °C, V against T (K) through the origin; a second P–V plot serves a structured question. All SVGs use the S helpers and palette colours, were rendered to PNG and checked by eye.
- **Narration:** 6–53 words per slide (mean 36); no symbols, formulae or unit abbreviations.

## Question bank (74 items, 156 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 (3 are deck-check items) | 20 |
| assertion-reason | 4 | 4 |
| short-1 (laws, terms, relations, a reason) | 7 | 7 |
| true-false | 4 | 4 |
| fill-blank | 1 (5 blanks) | 1 |
| numerical | 17 (5 are deck-check items) | 17 |
| match-5 | 1 | 5 |
| short-2 | 8 | 16 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 5 parts with part marks in the stem: Boyle data table; Charles data table and absolute zero; weather balloon with the gas equation; lettered apparatus (diagram question); reduction to STP; a P–V graph to read and use.
- **Difficulty:** d1 20 · d2 29 · d3 24 · d4 1 (the percentage-change numerical).
- **Competency:** recall 17 · understanding 19 · application 31 · analysis 7. Application or higher is **51% of items**, inside the 45–65% lint band. No item was retagged.
- **Assertion-reason keys:** d b a c.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).
- Items were chosen so that no item names the answer of another in the same test (for example Boyle's law is named only inside the structured questions, not in any MCQ stem of the same test; the STP values are asked for in the long test only through a short answer).

## Verifier pass
- Every question was re-solved from its stem; the 26 scripted re-solve checks pass. Conversions, gas-law answers, graph points, STP volumes and every percentage are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem.

## For a reviewer
- **Conventions:** absolute zero is taken as −273 °C (so K = °C + 273) and STP as 273 K and 760 mm Hg, as in ICSE Class IX books; the notes mention that some books use 273.15. Pressures are in mm Hg only.
- **Charles's law:** stated in the kelvin form (V ∝ T). The older Celsius form (volume changes by 1/273 of its volume at 0 °C per degree) is given in the notes and used in one numerical; both agree.
- **Absolute zero:** found by extrapolating the V–t line; the notes and items say that real gases liquefy before reaching it. The extrapolated graph and its readings are imagined (V = 0.5 T cm³).
- **Graph shapes:** P against V is described as a curve (rectangular hyperbola); P against 1/V as a straight line through the origin; P × V against P as a horizontal line. The 1/V axis is drawn as 100 ÷ V to keep readings tidy.
- **Imagined data:** every experiment table, flask, balloon and tyre scenario is illustrative; no real measurement is claimed. The tyre item (higher pressure after a journey) ignores the small change in tyre volume, as the stem says.
- **Molecular explanation:** pressure from collisions, and the effect of heating on speed, are stated at the level of the syllabus (no kinetic-theory derivation); "the average speed depends on temperature, not pressure" is a note for reviewers to confirm for Class IX.
- **Numerical tolerance:** all numerical items have exact answers (no rounding). The 20 per cent fall in volume for a 25 per cent rise in pressure is exact (V₂/V₁ = 0.8).
