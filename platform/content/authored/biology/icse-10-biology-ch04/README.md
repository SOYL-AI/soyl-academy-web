# ICSE Class 10 Biology, Chapter 4 — Transpiration

`icse-10-biology-ch04` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 30 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch04_short` (20 marks, 30 min) and `t_icse10bio_ch04_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch04/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE syllabus topics: **transpiration** and its importance (stomatal, cuticular and lenticular routes; transpiration pull, cooling; a necessary evil); the **opening and closing of stomata by potassium ion exchange**; the **loss-of-weight, bell jar and cobalt chloride paper** experiments (dorsiventral and isobilateral leaves); **Ganong's potometer**, its precautions and limitations; **factors** affecting the rate (light, temperature, humidity, wind, soil water) and **adaptations** of desert plants; **guttation and bleeding**. Weight losses and rates, potometer rates and volumes, the stomata ratio and the share of absorbed water transpired are computed by `src/calc.mjs` from imagined readings.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Transpiration; What is transpiration?; Why transpiration matters; The stomatal apparatus; Potassium ion exchange; Quick check: the pore; Worked example 1: how much water is lost?; Quick check: which ions?; Experiment: the bell jar; Experiment: cobalt chloride paper; Worked example 2: the loss-of-weight experiment; Quick check: cobalt chloride; Summary; Exam tips. Part 2 (14 slides): Measuring and Controlling Water Loss; Ganong's potometer; Using the potometer; Limitations of the potometer; Quick check: the reservoir; Worked example 1: reading a potometer; Quick check: the fastest rate; Factors affecting transpiration; Adaptations that reduce water loss; Worked example 2: predicting the rate; Guttation and bleeding; Quick check: guttation drops; Summary; Exam tips.
- **Visuals (20 of 28 slides):** flow 3, table 11, svg 6.
- **Diagrams (7 distinct SVGs):** all new — a stoma open in light and closed in dark (named, and lettered A–E for the match, a figure MCQ and a case question); Ganong's potometer; the bell jar experiment with its control; cobalt chloride paper on a dorsiventral leaf; the loss-of-weight experiment with leafy and leafless shoots; a bar chart of potometer readings under four conditions. Every SVG was rendered and checked by eye.
- **Narration:** 4–52 words per slide (mean 34); no symbols or abbreviations.

## Question bank (65 items, 143 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 25 (keys a 7, b 6, c 6, d 6) |
| numerical | 2 | 2 |
| assertion-reason | 7 | 7 (ICSE option order; keys c d b c a d c) |
| short-1 | 10 | 10 |
| short-2 | 6 | 12 |
| fill-blank-1 | 2 | 2 |
| short-3 | 3 | 9 |
| true-false | 1 | 1 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 14 · d2 34 · d3 16 · d4 1.
- **Competency:** recall 12 · understanding 22 · application 17 · analysis 14. Application or higher is **48% of items (64% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (7/6/6/6) and assertion-reason keys use all four options.
- **Competency balance:** the first build had 45% application or higher (just under the band once rounded); two experiment items (the cobalt chloride observation and the polythene precaution) were re-tagged as application: 48%.
- **Figures:** the stoma drawing was redrawn so the closed pore actually closes and its labels moved to a left-hand column clear of the guard cells; the potometer cork and bubble labels were moved off the reservoir tube and the bell jar labels off the second jar, after rendering every SVG to PNG.
- Exact-stem check against every authored bank, `verify --authored` (0 blocking, 0 minor) and `originality --authored` (0 errors) pass.

## For a reviewer
- "Most" water is said to be lost through stomata, with no percentage; the 98.8 per cent of absorbed water transpired is an imagined example (textbooks quote about 98 to 99 per cent).
- The potassium ion exchange theory is given in outline (K+ from neighbouring epidermal cells in light, out in dark); the roles of malate, starch and abscisic acid are not covered.
- Stomata counts of about 300 and 50 per square millimetre on the lower and upper surfaces of a hibiscus leaf are imagined round numbers; real values vary by plant.
- All weighings, potometer distances and times, and the 1 square millimetre capillary are imagined data.
- Maize is used as an isobilateral leaf with roughly equal stomata on both surfaces (textbook simplification).
- Examples: Opuntia spines as modified leaves, oleander for sunken stomata, grasses for guttation, a cut vine or rose for bleeding.
- Safety: cobalt chloride paper is handled with forceps and kept dry in a desiccator; this is mentioned only as keeping it dry.
