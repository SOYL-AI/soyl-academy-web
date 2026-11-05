# ICSE Class 9 Chemistry, Chapter 5 — Water of Crystallisation, Efflorescence, Deliquescence and Drying Agents

`icse-9-chemistry-ch05` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (3 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch05_short` (20 marks, 30 min) and `t_icse9chem_ch05_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-chemistry-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch05/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX topics of this chapter: water of crystallisation with hydrated and anhydrous substances (CuSO₄·5H₂O, FeSO₄·7H₂O, Na₂CO₃·10H₂O, Na₂SO₄·10H₂O; NaNO₃, KCl, PbCl₂, K₂SO₄); efflorescence, deliquescence and hygroscopy (washing soda, ferric chloride, quicklime, concentrated sulphuric acid); drying agents and dehydrating agents.
- No removed topics for this chapter. Calculations use relative molecular masses and proportion only (percentage of water, residue and water lost); no mole concept. Atomic masses H 1, C 12, O 16, Na 23, S 32, Fe 56, Cu 63.5 are stated in each stem.
- Class 9 has no board examination; items follow the ICSE 2027 Chemistry specimen style (522): equations, observations, give-reason items, differences, numericals with working, a lettered apparatus diagram, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (ferrous sulphate and Glauber's salt heating masses, washing soda efflorescence to the monohydrate with a mass-loss calculation, three dishes in open air, drying hydrogen and ammonia, sugar and concentrated acid) are written by SOYL. Copper sulphate and plaster of Paris items in CBSE 10 Science ch02 and ICSE 10 are not repeated: copper sulphate appears only as the colour-change and test-for-water example, and plaster of Paris is not used. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Water of Crystallisation; Hydrated salts; Anhydrous substances; Quick check: hydrate or not; Heating a hydrate; What you see on heating; Quick check: the observation; Worked example 1: heating ferrous sulphate crystals; A test for water; Worked example 2: percentage of water in a hydrate; Percentage of water in four hydrates; Quick check: a percentage; Worked example 3: mass of residue; Quick check: anhydrous crystals; Summary; Exam tips. Part 2 (15 slides): Left in the Open Air; Efflorescence, deliquescence, hygroscopy; Three dishes in the open air; Quick check: crumbling crystals; Worked example 1: efflorescence of washing soda; Quick check: a puddle; Telling them apart; Drying agent or dehydrating agent?; Drying a gas; Quick check: drying ammonia; Worked example 2: choose the drying agent; Concentrated sulphuric acid as a dehydrating agent; Quick check: dehydrating action; Summary; Exam tips.
- **Visuals (21 of 31 slides):** flow 3, table 11, svg 3, chem 4.
- **Diagrams (4 distinct SVGs):** heating hydrated crystals in a clamped hard glass tube with the mouth slightly down (named, and lettered A–E for a 5-pair match and a structured question); washing soda, ferric chloride and concentrated sulphuric acid in open air; drying a gas (concentrated sulphuric acid wash bottle and quicklime tower). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (labels moved clear of the flame and the clamp; a clipped inlet label was moved).
- **Narration:** 4–53 words per slide (mean 32); no symbols, formulae or unit abbreviations; formulae and numbers are written as words.

## Question bank (70 items, 164 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 22 |
| assertion-reason | 4 | 4 |
| short-1 (terms, formulae, equations, observations, odd one out, give reason) | 8 | 8 |
| true-false | 4 | 4 |
| numerical | 9 | 9 |
| fill-blank (5 blanks) | 1 | 5 |
| match-5 (a 5-pair match, and a lettered-diagram match) | 2 | 10 |
| short-2 | 7 | 14 |
| short-3 | 6 | 18 |
| long-10 (structured) | 7 | 70 |

- **Deck-check items:** 8 (5 mcq, 1 numerical, 2 true-false; 4 per deck); none is used in a test.
- **Numericals:** 9 one-mark numericals plus calculations in 1 short-3 item and 4 structured questions.
- **Structured questions:** 7, each 10 marks in 4 or 5 parts with the part marks in the stem; one uses the lettered apparatus figure, one asks for the labelled apparatus, one for a labelled wash bottle.
- **Difficulty:** d1 12 · d2 36 · d3 20 · d4 2.
- **Competency:** recall 12 · understanding 16 · application 33 · analysis 9. Application or higher is **60% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** b c a d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every mass and percentage is computed and asserted in `calc.mjs`. Equations were checked for atom balance by the pipeline.
- Structured-question schemes sum to 10 and part marks are shown in each stem; the test items were chosen so that no item names the answer of another item in the same test.

## For a reviewer
- **Colours and observations:** CuSO₄·5H₂O blue to white; FeSO₄·7H₂O pale green to whitish (some books say greyish-white); washing soda and Glauber's salt colourless to white powder; anhydrous copper sulphate white to blue with a little heat on adding water. Strong heating of ferrous sulphate (decomposition) is not taught.
- **Efflorescence of washing soda** is written as Na₂CO₃·10H₂O → Na₂CO₃·H₂O + 9H₂O (the monohydrate), the usual textbook form; some books say it loses all its water.
- **Deliquescent examples:** ferric chloride, sodium hydroxide and anhydrous calcium chloride; some books call anhydrous calcium chloride only hygroscopic. Quicklime and concentrated sulphuric acid are the hygroscopic examples. The notes say a deliquescent substance is also hygroscopic but not the reverse.
- **Gas drying:** concentrated sulphuric acid for hydrogen, chlorine and hydrogen chloride; quicklime for ammonia. The acid is unsuitable for ammonia: 2NH₃ + H₂SO₄ → (NH₄)₂SO₄.
- **Dehydrating action:** blue copper sulphate crystals turn white; sugar is charred (C₁₂H₂₂O₁₁ → 12C + 11H₂O, the equation shown in books). The real reaction also gives other products, which the chapter does not teach.
- **Mass-change values** (28.6 g washing soda, 5 g solid becoming 8 g, 100 g acid becoming 109 g) are imagined and illustrative.
