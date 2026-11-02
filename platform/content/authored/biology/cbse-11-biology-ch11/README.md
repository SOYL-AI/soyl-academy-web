# CBSE Class 11 Biology, Chapter 11 — Photosynthesis in Higher Plants

`cbse-11-biology-ch11` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026; the producer reviews and gates)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (4 sections), 30 flashcards, 94 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch11_short` (20 marks, 40 min) and `t_cbse11bio_ch11_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (ATP and NADPH per CO2, per three turns and per glucose (C3 and C4), carbon bookkeeping of the cycle, water, oxygen, electrons and NADPH from water splitting, Rf values, CO2 mass for a mass of glucose, the minimum-of-factors rate model with its limiting factor — each asserted with `eq` or `same`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch11/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01 site and pigments, t02 light reaction, t03 Calvin cycle, C4 pathway and photorespiration, t04 factors) are covered; the chapter has no removed topics in the 2026-27 syllabus. Class 11 has no board exam, so items follow the CBSE school-examination pattern. Depth: the chloroplast (double membrane, grana, thylakoids, stroma lamellae, stroma); the four pigments with colours and order on a chromatogram, accessory pigments, absorption and action spectra; photosystems with P680 and P700; the Z scheme with plastoquinone, cytochrome b6f, plastocyanin and ferredoxin; water splitting and the source of oxygen; cyclic and non-cyclic photophosphorylation and where each occurs (stroma lamellae lack PS II and NADP reductase); the chemiosmotic hypothesis (three proton-moving events, CF0 and CF1); the Calvin cycle (RuBisCO, PGA, 2 ATP and 2 NADPH for reduction, 1 ATP for regeneration, 3 and 2 per CO2, 6 turns, 18 and 12 per glucose); the C4 pathway (Kranz anatomy, PEP, PEP carboxylase, oxaloacetic acid, 5 ATP per CO2); photorespiration; light, CO2, temperature and water with the 10 percent, 0.03-0.04 percent, 360 and 450 microlitre per litre figures; Blackman's law.

## Shape
- **Part 1 (t01–t02), 16 slides:** chloroplast; pigments; worked example (Rf from a chromatogram, computed); absorption and action spectra; photosystems; thylakoid membrane; Z scheme; cyclic versus non-cyclic; chemiosmosis; worked example (12 water give 6 oxygen, 24 electrons, 12 NADPH, computed); summary; exam tips; 3 checks.
- **Part 2 (t03–t04), 17 slides:** Calvin cycle; its three stages; worked example (6 turns, 18 ATP, 12 NADPH, computed); C4 pathway; Kranz anatomy and C3 versus C4; worked example (18 versus 30 ATP, ratios 1.5 and 2.5, computed); photorespiration; factors; Blackman graph; worked example (limiting factor from rate data, computed from the same model as the graph); summary; exam tips; 4 checks.
- **Visuals (24 of 33 slides; no gap longer than one slide):** flow 4, svg 10, table 10 (plus notes visuals).
- **Diagrams (10 distinct SVGs, 22 uses across decks, notes and questions):** chloroplast section; paper chromatogram with a centimetre ruler; absorption and action spectra; thylakoid membrane with electron and proton flow; Z scheme; the Calvin cycle for three turns; the C4 pathway across mesophyll and bundle sheath cells; the Blackman rate graph (drawn from the calc.mjs rate function); and lettered A–E versions of the thylakoid membrane (A ATP synthase, B photosystem I, C cytochrome b6f, D photosystem II, E NADP reductase) and of the chromatogram bands (C carotenoids, A xanthophylls, D chlorophyll a, B chlorophyll b), used in four questions. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 9–64 words (mean 44); no symbols, formulae or unit abbreviations.

## Question bank (94)
| Type | Count | Marks |
|---|---|---|
| mcq | 36 | 36 (keys a 9, b 9, c 9, d 9) |
| numerical | 16 | 16 |
| true-false | 3 | 3 |
| fill-blank | 3 | 3 |
| assertion-reason | 7 | 7 (keys b a d c c a d) |
| short 2 | 10 | 20 |
| short 3 | 8 | 24 |
| long | 5 | 25 |
| match | 2 | 4 |
| case-based | 4 | 16 |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 27 short/long items.
- **Difficulty:** d1 22 · d2 45 · d3 26 · d4 1.
- **Competency:** application 38 · recall 19 · understanding 31 · analysis 5 · evaluation 1. Application or higher is **47% of items (42% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 20 · t02 28 · t03 30 · t04 20.
- **Cases (4, 4 marks each as 1 + 1 + 2, part (c) either/or via `alternatives`):** a spinach chromatogram (chlorophyll b band, Rf 0.5 for chlorophyll a, functions of accessory pigments or why carotenoids travel farthest); an acid-bath experiment on thylakoids (proton gradient is enough for ATP, 12 protons from 6 water, CF0 and CF1, or why a leaky membrane stops ATP); maize and wheat on a hot afternoon (photorespiration, 36 more ATP for 18 CO2, Kranz anatomy or why the extra ATP is worthwhile); tomato greenhouse rates (limiting factor from the table, rise of 15 units, Blackman's law, or CO2 enrichment).
- **Deck checks (7):** pigment on a chromatogram, source of the replacement electrons, side of proton accumulation (Part 1); ATP per CO2, location of RuBisCO in C4 plants, photorespiration A-R, effect of doubling light (Part 2) — all objective.
- **Re-solves:** 24 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A CF0, PEP as the C4 acceptor, action spectrum (MCQ), source of oxygen (A-R) · B why far-red light still gives ATP (2), the three proton-raising events (2), three differences between C3 and C4 (3) · C Calvin cycle or limiting factors · D spinach chromatogram case.
- **Long (40 marks, 90 min):** A green light, stroma lamellae, first product of the Calvin cycle, carbon in three turns, Kranz anatomy, light saturation, drought, phosphoglycolate (MCQ), cyclic flow A-R, C4 A-R · B accessory pigments (2), cost of the three stages (2), (pigments or Blackman's law) (2), the Z scheme (3), (C4 fixation or C3 versus C4 CO2 response) (3) · C light reaction and (C4 claim or chloroplast structure) · D acid-bath case, greenhouse case.
- Layout: short — A: 3 mcq, 1 assertion-reason · B: 2 short 2, 1 short 3 · C: 2 long (choose 1 of 2) · D: 1 case (4); long — A: 8 mcq, 2 assertion-reason · B: 4 short 2, 3 short 3 (choose 1 of 2) · C: 3 long (choose 1 of 2) · D: 2 case (4).

## Validation
- Author validator (in the build): 78 maths strings parse; 22 SVG uses / 10 distinct diagrams pass the allow-list; narration clean; 24/24 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: no exact duplicate stems against any authored bank in the worktree or the main checkout.
- `verify --authored` and `originality --authored` are run by the producer for the whole subject.

## Verifier pass (2026-11-01)
1. **Diagrams after rasterising.** Overlaps were fixed in the thylakoid figure (names moved below the complexes and clear of the light and proton arrows), the Z scheme (labels re-placed along the path), the Calvin figure (the net G3P label no longer sits on the carbon check), the Blackman graph (labels clear of the curves) and the spectrum (curve labels carry leader lines). The two lettered figures omit every reaction label that would give away a letter.
2. **Rate model.** The graph and the worked limiting-factor example are drawn from one function, so the plateau heights (30, 45 and 10 units) and the 10 percent light saturation at 450 microlitres per litre are consistent; the units are arbitrary and the model is a minimum of three straight lines, not a measured curve.
3. **Test leakage.** Items were chosen so that no MCQ option, assertion or case passage states the answer to a short or long item in the same test (for example the far-red ATP short answer is paired with the source-of-oxygen assertion, not with the cyclic-flow assertion, and the chromatogram case is not paired with the accessory-pigment short answers).
4. **Arithmetic checker.** Solutions state each key with an equals sign so that the stage-5 numeric check finds it.

## For a reviewer
- ATP and NADPH counts follow the textbook (3 and 2 per CO2 in C3 plants; 5 and 2 in C4 plants; 18 and 12 versus 30 and 12 per glucose); the cost of RuBP regeneration and of PEP regeneration is stated as in the textbook.
- Pigment band order on the chromatogram (carotenoids, xanthophylls, chlorophyll a, chlorophyll b from the top) is the textbook's; the Rf values and the 12 cm and 14 cm solvent fronts are illustrative, and the order can differ with other solvents.
- The CO2 figures (0.03–0.04 percent, 360 and 450 microlitres per litre) and the 10 percent light saturation are the textbook's; the arbitrary-unit rate model and every rate quoted from it are illustrative.
- Examples of C4 plants are maize and sugarcane (the textbook names maize and sorghum in places); wheat and rice are named as C3 plants.
- Blackman's date (1905) and wording follow the textbook; the state of knowledge on the oxygen-evolving complex is not taught beyond water splitting on the lumen side of PS II.
- Photorespiration is described as involving the chloroplast, peroxisome and mitochondrion and as having no known biological function, as the textbook says; the case on maize and wheat treats it as a loss of fixed carbon.
