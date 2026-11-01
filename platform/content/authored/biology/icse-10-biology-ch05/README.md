# ICSE Class 10 Biology, Chapter 5 — Photosynthesis

`icse-10-biology-ch05` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (7 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch05_short` (20 marks, 30 min) and `t_icse10bio_ch05_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch05/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All seven ICSE syllabus topics: **definition, balanced equation and significance**; **chloroplast structure** (envelope, grana, stroma lamellae, stroma) as the site of the two phases, and **stomatal opening** supplying carbon dioxide; the **light phase** (activation of chlorophyll, photolysis, release of oxygen from water, ATP and NADPH); the **dark phase** in outline only (detailed dark-reaction equations are a removed topic and are neither taught nor asked); **leaf adaptations**; the **experiments** (destarching, the starch test, light screen, Moll's half-leaf with potassium hydroxide, variegated leaf, hydrilla oxygen with sodium bicarbonate); the **carbon cycle**. Atom counts of the equation and hydrilla rates, ratios and percentage rise are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Photosynthesis; The equation; Why photosynthesis matters; Quick check: day and night; The chloroplast; Stomata supply carbon dioxide; The light phase; Quick check: splitting water; The dark phase; Worked example 1: light phase or dark phase?; Worked example 2: checking the balance; A leaf built for photosynthesis; Quick check: the dark phase; Summary; Exam tips. Part 2 (15 slides): Experiments on Photosynthesis; Destarching; The starch test; Worked example 1: reading starch tests; Quick check: the colour of starch; Light is necessary; Carbon dioxide is necessary; Quick check: the black strip; Chlorophyll is necessary; Oxygen is released; Worked example 2: counting bubbles; Quick check: more bubbles; The carbon cycle; Summary; Exam tips.
- **Visuals (22 of 30 slides):** flow 5, chem 1, table 7, svg 9.
- **Diagrams (10 distinct SVGs):** all new — a chloroplast (named, and lettered A–E for the match and a figure MCQ); a section of a dorsiventral leaf; removing chlorophyll in a water bath; the light screen experiment before and after the starch test; Moll's half-leaf experiment with its result; a variegated leaf before and after the test; collecting oxygen from hydrilla; a bar chart of hydrilla bubble counts; the carbon cycle. Every SVG was rendered and checked by eye.
- **Narration:** 4–50 words per slide (mean 34); no symbols or abbreviations.

## Question bank (66 items, 145 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 26 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 8 | 8 (ICSE option order; keys d d c b c c a c) |
| true-false | 1 | 1 |
| short-1 | 11 | 11 |
| short-2 | 3 | 6 |
| numerical | 1 | 1 |
| short-3 | 5 | 15 |
| fill-blank-1 | 2 | 2 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 17 · d2 35 · d3 12 · d4 2.
- **Competency:** recall 14 · understanding 21 · analysis 18 · application 13. Application or higher is **47% of items (64% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (7/7/6/6) and assertion-reason keys use all four options.
- **Competency balance and size:** the first build had 69 items and only 39% application or higher. Three recall items (water molecules in the equation, a general importance MCQ, the site of the dark phase) were removed, two MCQs were rewritten as applied questions (large thin leaves on a forest floor; a traced-water experiment showing the source of oxygen), and two assertion-reason items were re-tagged as analysis: 66 items, 47%.
- **Word limits:** a 3-mark case alternative (other factors needed for photosynthesis) and a carbon-cycle alternative were expanded into the 35–70 word band.
- **Figures:** the combustion arrow of the carbon cycle was re-routed round the decomposer box and two labels moved off arrows, after rendering every SVG to PNG.
- The balanced equation is checked by KaTeX with mhchem and by the pipeline's balance check; atom counts are asserted in `calc.mjs`.
- Exact-stem check against every authored bank, `verify --authored` (0 blocking, 0 minor) and `originality --authored` (0 errors) pass.

## For a reviewer
- The equation is written in the ICSE form with 12 H₂O on the left and 6 H₂O on the right; some books show the simpler 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.
- The light phase uses ATP and NADPH; older ICSE books write NADPH₂.
- The dark phase is described in outline (carbon dioxide combines with hydrogen from NADPH using ATP to form glucose); the Calvin cycle and its equations are not taught (removed topic).
- Destarching is given as one to two days in darkness.
- The traced-water MCQ is based on the classic isotope experiment (oxygen-18 water) without naming the scientists or the isotope.
- Hydrilla bubble counts, lamp distances and the 50 per cent rise with sodium bicarbonate are imagined data; a heat screen is suggested as a precaution.
- Safety: alcohol is heated only in a water bath; potassium hydroxide is corrosive (not stated in student text).
- The carbon cycle is simplified to air, plants, animals, decomposers and fossil fuels; oceans and rocks are not shown.
- The chloroplast diagram shows a starch grain in the stroma, as in school textbooks.
