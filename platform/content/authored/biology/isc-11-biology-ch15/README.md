# ISC Class 11 Biology, Chapter 15 — Plant Growth and Development

`isc-11-biology-ch15` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (5 sections), 30 flashcards, 88 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch15_short` (20 marks, 50 min) and `t_isc11bio_ch15_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck check-slide question is in a test. |
| `src/` | `calc.mjs` (growth lengths, doubling counts, absolute and relative rates, the logistic growth model, auxanometer magnification, Went curvature, culture-medium ratios, spray dilutions; all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch15/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics (t01–t05), no removed topics: hypogeal, epigeal and viviparous germination with examples; phases of growth in meristems, growth rate, direct measurement and the auxanometer, factors affecting growth; differentiation, dedifferentiation, redifferentiation and the sequence of development; the discovery of auxin (Went) and four effects each of auxins, gibberellins, cytokinins, ethylene and abscisic acid; agricultural and horticultural uses.

## Shape
- **Part 1 (t01–t03), 17 slides:** title; the three kinds of germination; comparison table; check; growth zones of a root tip; arithmetic versus geometric growth; worked example 1 (root 3 + 0.8t: 7 and 11 cm; 64 cells in 72 hours, computed); sigmoid curve; worked example 2 (equal absolute rates of 2 cm a day, relative 20 and 6.7 percent a day); check; arc auxanometer; worked example 3 (magnification 12; 18 mm gives 1.5 mm); factors and measurement; differentiation terms; check; summary; exam tips.
- **Part 2 (t04–t05), 16 slides:** title; Went's experiment; discovery table; worked example 1 (curvature test, with a plot); check; auxins; gibberellins and cytokinins; ethylene and abscisic acid; check; auxin to cytokinin ratio; worked example 2 (media M1 to M3 predicted roots, shoots, callus); uses table; worked example 3 (100 mL of 1000 ppm stock for 2 L of 50 ppm); check; summary; exam tips.
- **Visuals (25 of 33 slides; no gap longer than one slide):** table 17, svg 5, flow 2, plot 1.
- **Diagrams (7 SVGs):** the three germination types and a lettered P-Q-R version, root-tip zones and a lettered A–D version, the sigmoid curve (computed), the arc auxanometer, and Went's experiment. Every SVG was rasterised and checked by eye.
- **Narration:** 6–44 words (mean 29); no digits, symbols or unit abbreviations.

## Question bank (88)
| Type | Count | Marks |
|---|---|---|
| mcq | 36 | 1 (keys a 9, b 9, c 9, d 9); 3 are deck checks; 6 use figures |
| assertion-reason | 7 | 1 (ISC options; keys b a a c b a d) |
| short, 1 mark | 4 | give-a-reason |
| numerical | 11 | 1 (12.2 cm; 16 cells; 15 percent a day; 2 cm a day; 2.25 mm; 6.95 cm a day; 54.4 cm; 0.8 mg/L; ratio 6; 100 mL; 50 mg) |
| short | 14 + 10 | 2 / 3, including growth-rate, culture-medium and hedge-trimming questions |
| long | 6 | 5, in marked parts |

- **Difficulty:** d1 25 · d2 49 · d3 13 · d4 1.
- **Competency:** recall 21 · understanding 25 · application 40 · analysis 2. Application or higher is **48% of items (40% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 11 · t02 28 · t03 10 · t04 27 · t05 13.
- **Re-solves:** 16 scripted checks recompute keys and values from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A epigeal example, the factor missing in a flooded field, the stress hormone, the weedicide (MCQ), relative growth rates (A-R) · B viviparous germination; (auxanometer or effects of ethylene) · C differentiation terms; (regulators for three uses or the sigmoid curve) · D Went's experiment in parts.
- **Long:** A viviparous germination, pea against castor, the zone of elongation, geometric growth, differentiation, heterophylly, the bakanae substance, rooting, the ripening gas, fruit drop (MCQ), Went's bending and abscisic acid (A-R) · B developmental sequence; absolute versus relative rate; (effects of auxins or of cytokinins) · C two seedlings compared; factors; promoters and inhibitors; (hedge trimming or culture media) · D sigmoid curve in parts; (auxanometer drawing and calculation or two discoveries and their effects).

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Model values.** The growth-model asserts caught three expected values written by hand (the day-4 height and the phase gains); they now come from the computed curve.
2. **Word limit.** The three-use regulator answer was 30 words against 50–80; it was expanded with reasons.
3. **Difficulty band.** The first build had no difficulty 4 item; the Went assertion-reason was reclassified as difficulty 4.
4. **Give-aways in the tests.** The Went assertion-reason stayed out of any test that holds a Went description, and the auxanometer calculation item was kept out of the long test that asks for the auxanometer drawing.
5. **Diagrams after rasterising.** Labels in the germination figure overlapped stems and ran off the canvas, and the auxanometer note ran off the edge; all were moved.

## For a reviewer
- **Examples of germination:** epigeal castor, bean, cotton, sunflower; hypogeal pea, gram, maize, mango; viviparous Rhizophora and Sonneratia (some books add Heritiera). Books differ on a few seeds (for example groundnut); the chapter uses only the unambiguous ones.
- **Went's data:** 30 degrees per mg per litre is an illustrative, linear value, not Went's measurements.
- **Sigmoid model:** a logistic curve to 60 cm with its fastest growth at day 10 is a teaching model; phase boundaries (days 4 and 16) are where it reaches 5 and 95 percent of the final height.
- **Auxanometer:** pointer length 24 cm and pulley radius 2 cm are illustrative; the figure is not to scale.
- **Discovery history:** Darwin 1880, Boysen-Jensen, Went 1928, Kurosawa (bakanae), Skoog and Miller 1955 (kinetin), Cousins (ethylene) are given at the level of the Class 11 textbooks.
- **Regulator effects:** four effects each as listed in the notes; textbooks vary in which effects they list.
- **Dilutions:** ppm is taken as mg per litre.
