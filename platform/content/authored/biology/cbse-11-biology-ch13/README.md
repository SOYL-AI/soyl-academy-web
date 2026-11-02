# CBSE Class 11 Biology, Chapter 13 — Plant Growth and Development

`cbse-11-biology-ch13` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (2 sections, 2 display formulae), 32 flashcards, 78 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch13_short` (20 marks, 40 min) and `t_cbse11bio_ch13_long` (40 marks, 90 min), laid out as the default blueprints. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (arithmetic and geometric growth, doubling, two sigmoid data sets with increments and rates, relative growth, hormone masses and spray volumes, germination and rooting percentages, experiment letters — each asserted with `eq`), `svgs.mjs` (4 SVGs; the growth curve is drawn from the data in `calc.mjs`), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; library `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch13/src/build.mjs` (`CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both syllabus topics (t01 growth, differentiation and development; t02 plant growth regulators). **Photoperiodism and vernalisation are not in the syllabus and are not taught.** Stems and set-ups are new (bamboo shoot, callus on carrot, water buttercup, rose cuttings, tea pruning, barley malting, lettuce seeds, orchard spray) and avoid those of the ICSE 10 and CBSE 12 hormone banks.
- Depth: irreversibility and indeterminate growth; meristematic, elongation and maturation phases; measurement parameters; arithmetic ($L_t = L_0 + rt$) and geometric ($W_1 = W_0 e^{rt}$) growth; sigmoid curve; conditions; differentiation, dedifferentiation, redifferentiation; plasticity and heterophylly; development; auxins (IAA, IBA, NAA, 2,4-D; Darwin and Went), gibberellins (foolish seedling), cytokinins (kinetin, zeatin), ethylene (ethephon), abscisic acid and their interactions.

## Shape
- **Part 1 (t01), 17 slides:** 3 worked examples (arithmetic growth, geometric growth and doubling, reading the sigmoid data), 4 checks. **Part 2 (t02), 16 slides:** 2 worked examples (rooting-solution mass and spray volume; germination percentages), 4 checks.
- **Diagrams (4 SVGs):** arithmetic versus geometric growth with cell lineages and graphs; the S-shaped growth curve; the five coleoptile experiments (named) and the same panels lettered A–E. All were rasterised and checked by eye; the growth-curve labels were moved clear of the curve and the coleoptile panels cropped.
- **Narration:** 8–64 words (mean 36).

## Question bank (78)
| Type | Count |
|---|---|
| mcq | 28 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 7 (keys a d c a b d c) |
| true-false / fill-blank / match | 4 / 3 / 2 |
| numerical | 6 |
| short | 9 two-mark + 7 three-mark |
| long | 8 |
| case-based | 4 (1 + 1 + 2, part (c) either/or) |

- **Difficulty:** d1 19 · d2 46 · d3 12 · d4 1 (evaluating four wrong claims of a farmer).
- **Competency:** application or higher is 56% of items (52% of marks).
- **Topic tags:** t01 37 · t02 41.
- **Deck checks:** shoot length (arithmetic), lag phase, flooded pot, wound callus; coleoptile tip, tea pruning, detached leaves, drought stomata.

## Chapter tests
- **Short:** A elongation phase, seed dormancy, lateral shoots (MCQ), arithmetic growth (A-R) · B dry and waterlogged soils, ripening gas, plasticity · C growth-data analysis or auxin discovery and effects · D carrot callus case.
- **Long:** A reversible swelling, open growth, straight-line graph, buttercup leaves, rooting powder, foolish seedling, ripening bananas, 2,4-D (MCQ), callus (A-R), exponential culture (A-R) · B phases of growth, cytokinins, (gibberellins or auxin uses), S-curve, (Went experiment or tea-plucking) · C differentiation and development + (ethylene and ABA or farmer's claims evaluation) · D pea-seedling case, lettuce-seed case.

## Validation
- Author validator: 45 maths strings, 9 SVG uses, narration clean, 12 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- `verify --authored` and `originality --authored` are run by the producer.

## Verifier pass (2026-11-02)
Every question was re-solved from its stem. Fixes: phase boundaries in the data-analysis answer were corrected to match the computed growth rates; the cytokinin A-R was rebuilt so that its key and its solution agree; tests were re-chosen so that no stem gives away another in the same test.

## For a reviewer
- The $W_1 = W_0 e^{rt}$ form and "relative growth rate" follow NCERT; the numerical with e to the power 0.9 supplies 2.46 in the stem.
- Kinetin from autoclaved herring sperm DNA, zeatin from maize and coconut milk, foolish seedling of rice, and the uses of each regulator follow NCERT; the claim that 2,4-D kills dicot weeds is also NCERT.
- Cytokinins are said to be formed where cell division is rapid (root apices, shoot buds, young fruits).
- Ethephon is named as the common source of ethylene.
- Growth data (seedling heights, callus cell counts, seed counts, orchard area, hormone concentrations) are illustrative.
- The coleoptile drawing is schematic; panel E (Went's experiment) is drawn in the dark without light arrows.
