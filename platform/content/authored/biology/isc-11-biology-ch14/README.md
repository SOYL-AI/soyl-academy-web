# ISC Class 11 Biology, Chapter 14 — Respiration in Plants

`isc-11-biology-ch14` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 18 slides), notes (4 sections), 30 flashcards, 76 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch14_short` (20 marks, 50 min) and `t_isc11bio_ch14_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck check-slide question is in a test. |
| `src/` | `calc.mjs` (counts the atoms of every equation and throws if one does not balance; computes RQ, ATP, NADH, FADH2 and CO2 per glucose, ATP per stage under two conventions, fermentation masses and energy efficiencies, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch14/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics (t01–t04) of `platform/catalog/cisce/isc-11/biology/syllabus.yaml`: gas exchange in plants, aerobic and anaerobic respiration, alcoholic and lactic acid fermentation; **glycolysis and the Krebs (TCA) cycle as flowcharts**; the electron transport system, oxidative phosphorylation and the ATP yield of one glucose; the amphibolic pathway and the respiratory quotient of carbohydrates, fats, proteins and organic acids.
- **Removed topic respected:** "Detailed steps of glycolysis, Krebs' cycle and ETS beyond flowcharts" is not taught or asked. Glycolysis is shown as glucose, two three-carbon sugar phosphates, two pyruvate; the Krebs cycle as acetyl CoA + oxaloacetic acid, citric acid, a 5 C acid, 4 C acids; the chain as complexes I to IV with ubiquinone and cytochrome c. No enzyme or intermediate is named beyond these.
- Scientists and abbreviations folded in: Embden, Meyerhof and Parnas (EMP), Hans Krebs, Peter Mitchell; ETS, ATP, NADH, FADH2, OAA, UQ, RQ.

## Shape
- **Part 1 (t01–t02), 15 slides:** title; gas exchange in plants; the overall equation; fates of pyruvate; aerobic respiration and the two fermentations compared; check; the mitochondrion; glycolysis flowchart; worked example 1 (six glucose: 24 ATP formed, 12 used, net 12, 12 NADH, 12 pyruvate, computed); check; link reaction and Krebs cycle flowchart; worked example 2 (one glucose: 6 CO2, 8 NADH, 2 FADH2, 2 ATP, computed); check; summary; exam tips.
- **Part 2 (t03–t04), 18 slides:** title; the electron transport system; the parts of the chain; chemiosmosis in mitochondria and chloroplasts compared; check; worked example 1 (38 ATP: 8 + 6 + 24, computed); the ATP count under two conventions (38 and 32); worked example 2 (19 times; 40.4 against 2.1 percent of the energy of glucose); check; the amphibolic pathway; entry and exit points; RQ and its values; worked example 3 (RQ from balanced equations: glucose 1, stearic acid 0.69); worked example 4 (respirometer readings, RQ 0.8); two checks; summary; exam tips.
- **Visuals (24 of 33 slides; no gap longer than two slides):** table 15, svg 6, flow 2, chem 1.
- **Diagrams (7 SVGs):** labelled mitochondrion and a lettered A–E version (diagram-based questions), glycolysis flowchart, link reaction and Krebs cycle flowchart, the electron transport system with ATP synthase, the amphibolic pathway, and the fates of pyruvate. Every SVG was rasterised and checked by eye; overlaps found were fixed.
- **Narration:** 7–41 words (mean 28); no digits, symbols or unit abbreviations.

## Question bank (76)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6); 3 are deck checks; 6 use figures |
| assertion-reason | 5 | 1 (ISC options; keys a b c a d) |
| true-false | 1 | 1 |
| short, 1 mark | 4 | give-a-reason |
| fill-blank | 1 | 1 |
| numerical | 14 | 1 (46 g ethanol; 18 000 ATP; 18 ATP; 18 NADH; 24 CO2; 34 ATP twice; 114 ATP; 32 ATP; 40.4 percent; RQ 1.14, 0.7 and 4; 140 mL) |
| short | 8 + 10 | 2 / 3, including data questions on RQ and a respirometer |
| long | 6 | 5, in marked parts |

- **Difficulty:** d1 14 · d2 35 · d3 26 · d4 1.
- **Competency:** recall 13 · understanding 24 · application 34 · analysis 5. Application or higher is **51% of items (48% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 16 · t02 22 · t03 21 · t04 19.
- **Re-solves:** 19 scripted checks recompute keys and values from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A woody-stem gas exchange, the ETS site, the acceptor of acetyl CoA, entry of fatty acids (MCQ), fermentation versus aerobic yield (A-R) · B link reaction; (final acceptor or amphibolic pathway) · C three processes compared; (glycolysis flowchart or ATP at the inner membrane) · D respiratory quotient in parts.
- **Long:** A waterlogged roots, curd, regeneration of NAD+, the glycolysis site, CO2 from one pyruvate, link-reaction products, FADH2 versus NADH, the cristae (lettered figure), a leaky inner membrane, RQ of fermentation (MCQ), ETS without oxygen and amphibolic respiration (A-R) · B gas exchange; aerobic versus anaerobic; (oxidative phosphorylation or glycolysis of seven glucose) · C Krebs cycle; chemiosmosis compared; RQ of stearic acid; (fats and proteins as substrates or carbon and carriers of one glucose) · D ATP yield in parts; (ETS diagram or amphibolic pathway diagram).

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Maths lint.** Three worked-example lines mixed words and arithmetic in a way the arithmetic lint read as false (for example "ATP + 2 × 3 = 8"); the whole sum is now inside the maths, and rounded values use "approximately".
2. **Originality.** The fill-in on the EMP pathway was word for word the same as a CBSE 11 Biology stem; it was rewritten to ask for the third scientist.
3. **Give-aways in the tests.** The RQ of fermentation item named ethanol and carbon dioxide, which gave away the winemaker question; its stem was reworded, and the winemaker and RQ-data questions were kept out of the long test.
4. **Diagrams after rasterising.** The electron-transport arrows crossed complex II and covered the carrier labels; the carriers were moved above the membrane and the arrows redrawn. Labels in the Krebs and amphibolic diagrams were moved off arrows and the canvas edge.
5. **Proton label.** The bold superscript plus in "many H⁺" and "fewer H⁺" on the electron transport figure read like a minus sign; the labels are now plain text with "(protons)", and every ch14 text and SVG was searched for a stray H⁻ (none).
6. **Cristae.** In the mitochondrion figure and its lettered twin the cristae were free-floating rods; they are now drawn as infoldings of the inner membrane, each continuous with it at the base.

## For a reviewer
- **ATP yield:** the chapter teaches 3 ATP per NADH and 2 per FADH2, giving 38 per glucose (8 + 6 + 24). Current estimates (2.5 and 1.5) give 32, and some books give 36; both alternatives are stated and the assumption is asked for in the exam tips. The 686 kcal for glucose and 7.3 kcal for ATP are the usual textbook values, so the 40.4 and 2.1 percent are illustrative.
- **Krebs cycle:** ATP is shown as formed directly (GTP in animals, ATP in plants); the cycle is drawn at flowchart level with a 5 C acid and 4 C acids, as the syllabus allows.
- **RQ values:** carbohydrate 1.0, fats about 0.7, proteins about 0.9, organic acids above 1 (tartaric 1.6, succinic 1.14, oxalic 4), anaerobic infinite. The question giving pea seeds 0.9 treats that as protein or a mixture and says so; it is an illustration, not measured data.
- **Fermentation in plants:** alcoholic fermentation in flooded roots and seeds, lactic acid fermentation described for muscle and bacteria. The 13 percent alcohol limit for yeast is approximate.
- **Gas exchange:** stomata, lenticels and root hairs; the root route is stated simply as diffusion from soil air.
- **Mitochondrial complexes:** named I to IV only, with ubiquinone and cytochrome c, for flowchart level; the number of protons pumped at each is not taught.
