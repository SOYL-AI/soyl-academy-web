# CBSE Class 11 Biology, Chapter 12 — Respiration in Plants

`cbse-11-biology-ch12` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026; the producer reviews and gates)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (3 sections), 30 flashcards, 90 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch12_short` (20 marks, 40 min) and `t_cbse11bio_ch12_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (glycolysis, link reaction and Krebs cycle counts per glucose and per turn, the ATP conventions (3 and 2 versus 2.5 and 1.5), ATP by stage and in total, O2 and CO2 per glucose, ethanol and CO2 masses with mass conservation, energy efficiency, respiratory quotients from balanced equations and from volumes — each asserted with `eq` or `same`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch12/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01 glycolysis and fermentation, t02 aerobic respiration with the Krebs cycle and electron transport, t03 energy relations and the respiratory quotient, with the amphibolic pathway) are covered; the chapter has no removed topics in the 2026-27 syllabus. Class 11 has no board exam, so items follow the CBSE school-examination pattern. Depth: the EMP pathway (2 ATP used, 4 made, net 2 ATP, 2 NADH, 2 pyruvic acid; substrate-level phosphorylation); alcoholic and lactic acid fermentation (enzymes, products, NAD+ regeneration, less than 7 percent of energy, 13 percent alcohol); the mitochondrion; the link reaction; the Krebs cycle (3 NADH, 1 FADH2, 1 ATP, 2 CO2 per turn, two turns per glucose); the electron transport system (complexes I to IV, ubiquinone, cytochrome c, oxygen as final acceptor, ATP synthase F0 and F1, proton gradient); the textbook ATP convention (3 per NADH, 2 per FADH2, 38 per glucose, with its assumptions; about 32 by newer values); 2870 kJ per mole of glucose and 30.5 kJ per mole of ATP; the respiratory quotient (carbohydrate 1, fat about 0.7, protein about 0.9, organic acids above 1, anaerobic infinite); the amphibolic pathway and entry of fats and proteins.

## Shape
- **Part 1 (t01 and the aerobic stages up to the Krebs cycle), 16 slides:** respiration and its sites; glycolysis (diagram and balance sheet); worked example (3 glucose: 6 net ATP, 6 NADH, 6 pyruvic acid, computed); fates of pyruvic acid; fermentation (table); worked example (90 g glucose gives 46 g ethanol and 44 g CO2, mass conserved, about 2.1 percent of the energy trapped, computed); mitochondrion; link reaction; Krebs cycle; summary; exam tips; 3 checks.
- **Part 2 (t02 electron transport, t03), 17 slides:** electron transport system and its components; oxidative phosphorylation; worked example (12 ATP from one acetyl CoA, computed); ATP bar chart; worked example (38 ATP, 1159 kJ, 40.4 percent versus 2.1 percent, computed); aerobic respiration versus fermentation with the convention stated; respiratory quotient (equations and table); worked example (RQ 0.7 for fat and 1.3 for an organic acid, computed); amphibolic pathway; summary; exam tips; 4 checks.
- **Visuals (24 of 33 slides; no gap longer than one slide):** flow 4, table 12, svg 8 (plus notes visuals).
- **Diagrams (7 distinct SVGs, 17 uses across decks, notes and questions):** glycolysis as a chain with ATP and NADH counts; the fates of pyruvic acid; the Krebs cycle as a ring with every CO2, NADH, FADH2 and ATP step; a mitochondrion; the electron transport system in the inner membrane; an ATP balance bar chart drawn from calc.mjs; and a lettered A–E version of the electron transport figure (A complex IV, B complex I, C ATP synthase, D complex III, E cytochrome c) used in three questions, with the reaction labels removed so that they do not give the letters away. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 7–60 words (mean 39); no symbols, formulae or unit abbreviations.

## Question bank (90)
| Type | Count | Marks |
|---|---|---|
| mcq | 33 | 33 (keys a 9, b 8, c 8, d 8) |
| true-false | 3 | 3 |
| fill-blank | 3 | 3 |
| assertion-reason | 7 | 7 (keys b a c a c d b) |
| match | 3 | 6 |
| numerical | 17 | 17 |
| short 2 | 8 | 16 |
| short 3 | 7 | 21 |
| long | 5 | 25 |
| case-based | 4 | 16 |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 24 short/long items.
- **Difficulty:** d1 23 · d2 44 · d3 22 · d4 1.
- **Competency:** recall 20 · application 35 · analysis 7 · understanding 28. Application or higher is **47% of items (47% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 25 · t02 36 · t03 32.
- **Cases (4, 4 marks each as 1 + 1 + 2, part (c) either/or via `alternatives`):** a sealed yeast flask (CO2 bubbles, 27.6 g ethanol from 54 g glucose, the two enzymes or why ethanol is made); a marathon runner's muscle (lactic acid, 324 fewer ATP from 9 glucose by the sprint route, why the yield is lower or why ATP continues to be made); an inhibitor of complex IV in isolated mitochondria (why oxygen uptake stops, 16 ATP from 4 NADH and 2 FADH2, why succinic acid gives less ATP per oxygen atom or why the Krebs cycle also stops); three respirometers of germinating seeds (batch Q fat-rich, RQ 0.9 for batch R, protein or what an oxygen-free batch would show).
- **Deck checks (7):** net ATP of glycolysis, a product-free fermentation, NADH per Krebs turn (Part 1); final electron acceptor, ATP from the ETS per glucose, why fats have a lower RQ, amphibolic A-R (Part 2) — all objective.
- **Re-solves:** 27 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A which process runs in a mitochondria-free extract, why the Krebs cycle turns twice, O2 and CO2 per glucose (MCQ), cristae (A-R) · B what amphibolic means (2), products of one Krebs turn (2), alcoholic fermentation (3) · C aerobic respiration after glycolysis or aerobic versus fermentation · D seed respirometer case.
- **Long (40 marks, 90 min):** A cristae, 13 percent alcohol, Krebs matrix, oxaloacetic acid, energy of fermentation, entry of fats, CO2 steps, substrate-level phosphorylation (MCQ), aerobic versus fermentation A-R, Krebs turns A-R · B ATP of glycolysis (2), RQ definition (2), (NAD+ regeneration or complexes and final acceptor) (2), the ATP convention (3), (oxidative phosphorylation or ETS path) (3) · C glycolysis and (RQ or the electron transport system) · D yeast flask case, runner case.
- Layout: short — A: 3 mcq, 1 assertion-reason · B: 2 short 2, 1 short 3 · C: 2 long (choose 1 of 2) · D: 1 case (4); long — A: 8 mcq, 2 assertion-reason · B: 4 short 2, 3 short 3 (choose 1 of 2) · C: 3 long (choose 1 of 2) · D: 2 case (4).

## Validation
- Author validator (in the build): 86 maths strings parse; 17 SVG uses / 7 distinct diagrams pass the allow-list; narration clean; 27/27 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: no exact duplicate stems against any authored bank in the worktree or the main checkout.
- `verify --authored` and `originality --authored` are run by the producer for the whole subject.

## Verifier pass (2026-11-01)
1. **Arithmetic.** An expected value of 18 ATP for 4 NADH and 2 FADH2 was caught by the calc.mjs assertion (the correct value is 16) before it reached any item; mass conservation is asserted for both fermentation and aerobic respiration of glucose.
2. **Diagrams after rasterising.** The glycolysis chain was re-spaced so the last step (pyruvic acid) is not cut off; the mitochondrion label that was clipped at the right edge was split over two lines; the electron transport figure had the ATP synthase name overlapped by a proton arrow and the FADH2 reaction misplaced, so names were moved below the complexes and the arrows shifted inside the rectangles; the ATP bar legend no longer sits on the total bar; every SVG text is at least 10 px.
3. **Duplicate stem.** A match item shared its stem with another CBSE 11 chapter; its wording was changed.
4. **Test leakage.** Tests were assembled so that no option, assertion or passage states the answer to a short or long item in the same paper (for example the Krebs-turns assertion is kept out of the paper that asks for the products of a Krebs turn).

## For a reviewer
- The ATP convention is the textbook's (3 per NADH, 2 per FADH2, 38 per glucose, NADH from glycolysis counted like mitochondrial NADH). Newer values (2.5 and 1.5, about 32) are given in the notes and in two items; the stems state which convention to use.
- Fermentation energy: 2 ATP × 30.5 kJ = 61 kJ of 2870 kJ is about 2.1 percent, consistent with the textbook's "less than 7 percent". The 40.4 percent aerobic efficiency uses the same 30.5 kJ per mole of ATP.
- Respiratory quotients: tripalmitin (102 ÷ 145 = 0.70), malic acid (4 ÷ 3 = 1.33) and oxalic acid (4) are computed from balanced equations; protein is quoted as about 0.9 as in the textbook, without an equation.
- The statement that the Krebs cycle also stops without oxygen (because NAD+ and FAD are not regenerated) is a standard deduction and is not worded this way in the textbook; check that it reads as intended for Class 11.
- The succinic acid item in the complex IV case (less ATP per oxygen atom because FADH2 enters at complex II) uses the textbook's 2 ATP per FADH2 and 3 per NADH.
- The sprinter, runner, yeast flask and respirometer set-ups are imagined; the 54 g of glucose, the seed volumes and the respirometer readings are illustrative.
