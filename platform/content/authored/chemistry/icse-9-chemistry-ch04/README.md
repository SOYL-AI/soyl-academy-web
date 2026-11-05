# ICSE Class 9 Chemistry, Chapter 4 — Water as a Universal Solvent: Solutions and Solubility

`icse-9-chemistry-ch04` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (3 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch04_short` (20 marks, 30 min) and `t_icse9chem_ch04_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-chemistry-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch04/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX topics of this chapter: water as a universal solvent with solutions, colloids and suspensions; saturated, unsaturated and supersaturated solutions and how to test one; the effect of temperature on solubility, with the solubility curves of calcium sulphate, potassium nitrate and sodium chloride, and crystallisation of potassium nitrate on cooling.
- No removed topics for this chapter. Calculations use only grams per 100 g of water and simple proportion (no mole concept).
- Class 9 has no board examination; items follow the ICSE 2027 Chemistry specimen style (522): terms, observations, give-reason items, differences, numericals with working, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (the crystal test in three beakers, torch beams through three liquids, salt Y, salt Z by evaporation, the lettered solubility graph) are written by SOYL. No other authored bank (ICSE 10, CBSE 11/12, ISC 12, CBSE 10 Science) has a solubility-curve chapter; exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Water as a Universal Solvent; Why water is a universal solvent; Quick check: a poor solvent case; Solution, colloid or suspension?; The Tyndall effect; Quick check: the beam of light; Worked example 1: sort the mixtures; Solute, solvent and solubility; Unsaturated, saturated, supersaturated; Testing with a crystal; Quick check: reading the test; Worked example 2: how to make a saturated solution; A supersaturated solution; Quick check: supersaturation; Summary; Exam tips. Part 2 (15 slides): Solubility Curves; Reading solubility; The three curves; Quick check: reading a curve; Three behaviours; Quick check: sodium chloride; Worked example 1: how much dissolves?; Cooling a hot saturated solution; Worked example 2: crystals on cooling; Quick check: why crystals appear; Worked example 3: saturated or not?; Separating two salts by cooling; Quick check: calcium sulphate; Summary; Exam tips.
- **Visuals (21 of 31 slides):** flow 5, table 13, svg 3.
- **Diagrams (5 distinct SVGs):** the solubility curves of potassium nitrate and sodium chloride with calcium sulphate on its own small scale (named, and lettered A, B, C, D, E for a match and a structured question); the crystal test in three beakers; a torch beam through a solution, a colloid and a suspension (named, and lettered P, Q, R). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 5–50 words per slide (mean 31); no symbols, formulae or unit abbreviations; numbers written as words.

## Question bank (69 items, 158 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 22 |
| assertion-reason | 5 | 5 |
| short-1 (terms, odd one out, give reason, observation) | 8 | 8 |
| true-false | 4 | 4 |
| numerical | 8 | 8 |
| fill-blank (5 blanks) | 1 | 5 |
| match-4 (lettered graph) | 1 | 4 |
| short-2 | 7 | 14 |
| short-3 | 6 | 18 |
| long-10 (structured) | 7 | 70 |

- **MCQ deck-check items:** 6 of the mcq items and 2 true-false items are the deck checks (4 per deck); none is used in a test.
- **Numericals:** 8 one-mark numericals plus calculations inside 2 short-3 items and 4 structured questions (solute in a given water, solution mass, crystals on cooling, solubility from evaporation, reading the graph).
- **Structured questions:** 7, each 10 marks in 4 or 5 parts with the part marks in the stem; two use a lettered figure and two ask for a labelled diagram.
- **Difficulty:** d1 11 · d2 34 · d3 22 · d4 2.
- **Competency:** recall 8 · understanding 17 · application 32 · analysis 12. Application or higher is **64% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** a d c b c.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every number is computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; the test items were chosen so that no item names the answer of another item in the same test.

## For a reviewer
- **All solubility data are illustrative.** Potassium nitrate (13, 21, 32, 46, 64, 85, 110, 138, 169, 202, 246 g per 100 g of water at 0 to 100 degrees Celsius in steps of 10), sodium chloride (36 to 39) and calcium sulphate (0.2 to 0.26, falling to 0.16 at 100 degrees Celsius) are rounded and textbook-shaped, not laboratory measurements; the chapter says so wherever a table or graph is shown. Textbooks differ by a few grams; please check that the values are acceptable as a teaching set.
- Calcium sulphate is drawn on its own scale (0 to 0.3) because the values are invisible on the main axis. Its slight rise to about 40 degrees Celsius and fall after that follow the usual textbook curve; some books draw it nearly flat.
- Particle-size bands for solution (below about 1 nm), colloid (about 1 to 1000 nm) and suspension (above about 1000 nm) are the usual textbook figures; books quote them slightly differently, and the notes say so.
- Milk and starch paste are the colloid examples; chalk powder and muddy water the suspension examples; egg white in water is used as a colloid in one structured question.
- The crystal test (dissolves = unsaturated, unchanged = saturated, crystals appear at once = supersaturated) is the textbook test; supersaturated solutions are made by slow, undisturbed cooling.
- The chapter treats "universal solvent" as a broad description and tells students that oil, wax and sand do not dissolve.
