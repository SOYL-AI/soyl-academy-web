# ICSE Class 10 Biology, Chapter 6 — Chemical Coordination in Plants

`icse-10-biology-ch06` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (4 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch06_short` (20 marks, 30 min) and `t_icse10bio_ch06_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch06/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both ICSE syllabus topics: **plant growth regulators** (auxins, gibberellins, cytokinins, abscisic acid and ethylene; one or more effects and uses of each; growth promoters versus growth inhibitors; apical dominance) and **tropic movements** (phototropism, geotropism, hydrotropism, thigmotropism and chemotropism; positive and negative responses; phototropism explained by unequal auxin distribution; coleoptile, clinostat and sieve experiments). Heights, rooting and greening percentages and ripening days in the imagined experiments are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Chemical Coordination in Plants; Plant growth regulators; Where the regulators act; Auxins; Quick check: the shoot tip hormone; Worked example 1: rooting cuttings; Gibberellins and cytokinins; Worked example 2: dwarf peas; Quick check: green leaves; Abscisic acid and ethylene; Quick check: a gaseous hormone; Promoters and inhibitors work together; Quick check: longer internodes; Summary; Exam tips. Part 2 (15 slides): Tropic Movements; Five tropisms; Phototropism; How auxin makes a shoot bend; The tip senses light; Quick check: a stem near a window; Worked example 1: naming the tropism; Geotropism; Quick check: a root that always grows down; Hydrotropism, thigmotropism and chemotropism; Worked example 2: predicting with a clinostat; Quick check: the rotating instrument; Quick check: roots and water; Summary; Exam tips.
- **Visuals (20 of 30 slides):** flow 3, table 12, svg 5.
- **Diagrams (6 distinct SVGs):** all new — phototropism of a seedling in a box lit from one side, with auxin on the shaded side and an inset of longer shaded-side cells; four oat coleoptiles (tip intact, tip cut off, opaque cap, opaque collar); geotropism of a seedling laid flat; hydrotropism, thigmotropism and chemotropism in three panels; a potted plant showing where the five regulators act (named, and lettered A–E for the diagram match). Every SVG was rendered and checked by eye.
- **Narration:** 4–46 words per slide (mean 30); no symbols or abbreviations.

## Question bank (66 items, 147 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 24 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 6 | 6 (ICSE option order; keys c a b a c d) |
| true-false | 3 | 3 |
| fill-blank-1 | 2 | 2 |
| numerical | 1 | 1 |
| short-1 | 11 | 11 |
| short-2 | 5 | 10 |
| short-3 | 5 | 15 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 12 · d2 33 · d3 20 · d4 1.
- **Competency:** application 23 · recall 11 · understanding 19 · analysis 13. Application or higher is **55% of items (70% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (a 6, b 6, c 6, d 6).
- **Test overlap:** items in each chapter test were checked so that no stem or match column gives away another item's answer (for example, the gibberellin match row keeps the gibberellin case out of the long test, and the auxin-explanation short answer was kept out of the test that carries the windowsill case).
- **Word limits:** all 2- and 3-mark model answers sit inside the 20–45 and 35–70 word bands (with the lint slack).
- **Figures:** clipped left-hand labels on the hormone map and the pollen-grain label were fixed after rendering.

## For a reviewer
- Abscisic acid is credited with promoting leaf fall (abscission) and bud dormancy, and ethylene is grouped with the growth inhibitors, following ICSE Class 10 convention.
- Cytokinins are described as made in root tips, with coconut water as a natural source.
- Root geotropism is explained, in one case answer, by auxin on the lower side slowing root-cell elongation (simplified Class 10 account).
- The folding of Mimosa leaflets is treated as not a tropism (odd one out); nastic movements are not otherwise taught.
- The selectivity of 2,4-D (kills broad-leaved dicot weeds, spares wheat) and the fungal discovery of gibberellin are used in stems.
- All experiment numbers (dwarf pea heights, rose cuttings, detached leaves, banana ripening days) are imagined.
