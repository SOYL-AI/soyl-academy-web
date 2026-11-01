# ICSE Class 10 Biology, Chapter 3 — Absorption by Roots and the Ascent of Sap

`icse-10-biology-ch03` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch03_short` (20 marks, 30 min) and `t_icse10bio_ch03_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch03/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE syllabus topics: **imbibition, diffusion and osmosis** with osmotic pressure and the potassium permanganate, thistle funnel and potato osmoscope experiments; **turgidity, flaccidity, plasmolysis and deplasmolysis** with hypotonic, isotonic and hypertonic solutions; the **root hair** and root adaptations; **absorption of water and minerals**, with active and passive transport in brief; the **ascent of sap** (root pressure, cohesion, adhesion, transpiration pull) and the coloured-water experiment on conduction through the xylem. Experiment readings (potato strips, thistle funnel) are imagined; percentage changes, the isotonic strength and the rise per hour are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Absorption by Roots and the Ascent of Sap; Imbibition; Diffusion; Osmosis: the thistle funnel; Worked example 1: reading the funnel; Quick check: osmosis; The potato osmoscope; Hypotonic, isotonic, hypertonic; Turgid, flaccid and plasmolysed cells; Quick check: strong salt; Worked example 2: potato strips; Quick check: restoring a cell; Summary; Exam tips. Part 2 (14 slides): From Soil to Leaf; The root hair; Roots built for absorption; Quick check: what is a root hair?; Across the root to the xylem; Minerals: passive and active uptake; Worked example 1: waterlogged field; Quick check: against the gradient; The ascent of sap; Experiment: water travels in the xylem; Worked example 2: hot and windy or cool and still?; Quick check: the main lifting force; Summary; Exam tips.
- **Visuals (20 of 28 slides):** flow 3, table 10, svg 7.
- **Diagrams (8 distinct SVGs):** all new — a single root hair among soil particles (named, and lettered A–F for the diagram match and a case question); the thistle funnel experiment; the potato osmoscope with a control; turgid, flaccid and plasmolysed cells; the path of water across the root; diffusion of potassium permanganate; the coloured-water xylem experiment with a stem cross-section. Every SVG was rendered and checked by eye.
- **Narration:** 6–43 words per slide (mean 30); no symbols or abbreviations.

## Question bank (62 items, 141 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 21 (keys a 6, b 5, c 5, d 5) |
| true-false | 5 | 5 |
| assertion-reason | 5 | 5 (ICSE option order; keys c a c b a) |
| short-1 | 11 | 11 |
| short-2 | 7 | 14 |
| short-3 | 3 | 9 |
| fill-blank-1 | 1 | 1 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 10 · d2 29 · d3 21 · d4 2.
- **Competency:** application 20 · understanding 19 · analysis 12 · recall 11. Application or higher is **52% of items (70% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem.
- **Bank size:** the first build had 59 practice items (lint minimum 60); three items were added (62).
- **Word limits:** a 3-mark diagram part was marked as a drawing (no word limit) and a 3-mark path-of-water answer was expanded.
- **Figures:** clipped labels on the root hair, overlapping band labels in the path-of-water figure and soil particles overlapping the hair were fixed after rendering.

## For a reviewer
- Root pressure is described as able to lift water only a few metres (qualitative; no figure).
- The cell-to-cell osmotic gradient across the cortex is the simplified Class 10 account; apoplast and symplast pathways are not taught.
- The potato-strip readings (0–0.4 M, ±12 per cent) and the funnel readings are imagined.
