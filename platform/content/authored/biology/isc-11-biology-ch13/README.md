# ISC Class 11 Biology, Chapter 13 — Photosynthesis in Higher Plants

`isc-11-biology-ch13` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (6 sections), 30 flashcards, 81 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch13_short` (20 marks, 50 min) and `t_isc11bio_ch13_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck check-slide question is in a test. |
| `src/` | `calc.mjs` (every number is computed and asserted with `eq`: Calvin-cycle ATP and NADPH, carbon bookkeeping of six turns, water split and oxygen released, proton-gradient fold change, glucose from carbon dioxide, photorespiratory carbon loss, spectra curves, Engelmann counts, the limiting-factor model), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch13/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics (t01–t06) of `platform/catalog/cisce/isc-11/biology/syllabus.yaml`, with no removed topics: photosynthesis as autotrophic nutrition, the chloroplast, pigments (chlorophyll a and b, carotenoids, xanthophylls), absorption and action spectra and **Engelmann's experiment**; photosystems I and II, light-harvesting complexes, cyclic and non-cyclic photophosphorylation with the **Z-scheme**, and **Mitchell's chemiosmotic hypothesis**; the **Calvin cycle** (carboxylation, reduction, regeneration; RuBisCO); the **C4 pathway (Hatch and Slack)** and **Kranz anatomy**, with C3 versus C4; **photorespiration**; and **Blackman's law of limiting factors** with light, carbon dioxide, temperature and water.
- Scientists and abbreviations folded in: Engelmann, Mitchell, Calvin, Hatch and Slack, Blackman; LHC, P680, P700, PQ, PC, NADP, PGA, RuBP, RuBisCO, G3P, PEP, OAA.

## Shape
- **Part 1 (t01–t02), 17 slides:** title; the overall equation; the chloroplast; pigments table; absorption and action spectra; Engelmann; check; photosystems and LHC; Z-scheme; worked example 1 (water and oxygen for one glucose: 12 NADPH, 24 electrons, 12 water, 6 oxygen, computed); cyclic versus non-cyclic; check; chemiosmosis; worked example 2 (pH 5.5 against 7.5, a 100-fold gradient, computed); check; summary; exam tips.
- **Part 2 (t03–t06), 18 slides:** title; Calvin cycle; three stages; worked example 1 (18 ATP, 12 NADPH, and the carbon count of six turns, computed); check; C4 pathway; C4 diagram; Kranz anatomy; C3 versus C4 table; worked example 2 (30 ATP for C4, 12 more than C3); check; photorespiration flowchart; worked example 3 (25 percent of the glycolate carbon lost); Blackman graph; worked example 4 (reading the limiting factor, computed); check; summary; exam tips.
- **Visuals (27 of 35 slides; no gap longer than one slide):** table 14, svg 8, flow 3, chem 1, plot 1.
- **Diagrams (9 SVGs):** labelled chloroplast and a lettered A–E version (diagram-based questions), absorption and action spectra (curves computed), Engelmann's experiment (counts computed), the Z-scheme with the cyclic loop, chemiosmosis across the thylakoid membrane, the Calvin cycle for three turns (numbers computed), the C4 pathway across mesophyll and bundle sheath, and Kranz anatomy. The Blackman graph is a `plot` visual from the model in `calc.mjs`. Every SVG was rasterised and checked by eye; overlaps found were fixed.
- **Narration:** 8–45 words (mean 31); no digits, symbols or unit abbreviations.

## Question bank (81)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 | 1 (keys a 8, b 8, c 8, d 8); 3 are deck checks; 3 use the figures |
| assertion-reason | 5 | 1 (ISC options; keys b a d c a) |
| true-false | 2 | 1 |
| short, 1 mark | 3 | give-a-reason |
| fill-blank | 1 | 1 |
| numerical | 10 | 1 (43.3 percent; 30 oxygen; 1000-fold; 27 ATP; 54 ATP; 0.9 g glucose; 20 ATP; 12 extra ATP; 4 carbon atoms; 48 units) |
| short | 11 + 12 | 2 / 3, including data questions on Hydrilla bubble counts and the graph |
| long | 5 | 5, in marked parts |

- **Difficulty:** d1 15 · d2 38 · d3 26 · d4 2.
- **Competency:** recall 16 · understanding 26 · application 35 · analysis 4. Application or higher is **48% of items (43% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 17 · t02 23 · t03 12 · t04 13 · t05 7 · t06 11.
- **Re-solves:** 19 scripted checks recompute keys and values from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A primary pigment, P680, the CO2-fixing enzyme, Kranz anatomy (MCQ), xanthophylls (A-R) · B absorption versus action spectrum; (beakers of cyclic and non-cyclic thylakoids or Blackman's law) · C Calvin stages; (C4 pathway or chemiosmotic hypothesis) · D chloroplast in parts.
- **Long:** A ATP synthase without CF1, action spectrum, sites of the phases, labelled oxygen, Mitchell, final electron acceptor, the stage that uses ATP only, first product of sugarcane, a hot bright day for photorespiration, Blackman's law (MCQ), photorespiration and C4 (A-R) · B accessory pigments; Engelmann; (temperature or LHC) · C carbon count of six turns; the ATP : NADPH ratio; factors affecting the rate; (C4 versus C3 on a hot day or photorespiration steps) · D Z-scheme in parts; (Calvin cycle or C4 pathway).

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Maths in a solution.** The glucose ATP solution lost its backslashes to an escape; the lint caught it and it was rewritten.
2. **Originality.** The cyclic versus non-cyclic 2-mark question was word for word the same as a CBSE 11 Biology stem; it was rewritten as a two-beaker data question.
3. **Competency band.** The first build had only 41% application or higher; the light-harvesting, ATP synthase, oxygen-label and PGA-count items were rewritten as application items and two pure-recall items were dropped, giving 48%.
4. **Diagrams after rasterising.** The spectra legend covered the curves, the Z-scheme and C4 labels overlapped lines, and the chemiosmosis labels crossed the arrows; all were moved. Text at font size 9 was raised to 10.
5. **Give-aways in the tests.** Items that revealed each other (for example the light-harvesting item with the antenna short answer, the labelled-oxygen item with a water-splitting assertion) were kept in different tests or swapped.

## For a reviewer
- **Chlorophyll peaks and the spectra graph** are schematic Gaussians: chlorophyll a at 430 and 662 nm, chlorophyll b at 453 and 642 nm, carotenoids near 470 nm. The action spectrum drawn is a normalised sum of the three, an illustration and not measured data.
- **Photosystem locations:** photosystem II mainly in the grana thylakoids, photosystem I in the stroma lamellae and grana margins; cyclic photophosphorylation placed in the stroma lamellae. Some books say photosystem II is only in appressed regions of the grana.
- **Calvin cycle bookkeeping:** 3 ATP and 2 NADPH per CO2, 18 and 12 per glucose; the C4 extra cost is stated as 2 ATP per CO2 to regenerate PEP (30 ATP per glucose). Some books give different ATP totals for the C4 variants.
- **Temperature optima:** 20–25 degrees C for C3 and 30–45 degrees C for C4 plants, as in the standard Class 11 text.
- **Photorespiration:** the 25 percent carbon loss is for the glycine to serine step alone, using 2 glycolate (4 C) to 1 serine (3 C) + 1 CO2; it is not the net loss of the whole pathway. The "possible protective role" is flagged in the notes as suggested only.
- **Blackman model:** rate = min(0.6 times light in klux, cap) with caps of 24 and 48 arbitrary units is a teaching model, not data.
- **Proton gradient:** pH 5.5 (lumen) against 7.5 (stroma) and 4.8 against 7.8 are illustrative values; real values vary.
- **Dates:** Mitchell 1961; Blackman 1905; Engelmann's experiment is placed in the 1880s.
