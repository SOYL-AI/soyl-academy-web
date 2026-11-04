# ISC Class 11 Biology, Chapter 16 — Breathing and Exchange of Gases

`isc-11-biology-ch16` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (4 sections), 30 flashcards, 77 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch16_short` (20 marks, 50 min) and `t_isc11bio_ch16_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck check-slide question is in a test. |
| `src/` | `calc.mjs` (spirometer volumes and capacities, ventilation, Boyle's law, partial pressures at altitude, the Hill form of the dissociation curve, oxygen content and delivery, carbon dioxide shares, lung-function percentages, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch16/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics (t01–t04) of `platform/catalog/cisce/isc-11/biology/syllabus.yaml`: respiratory organs in animals (recall) and the human respiratory system; the mechanism of breathing, the diaphragm and intercostal muscles, pulmonary volumes and capacities (TV, IRV, ERV, RV, VC, FRC and also IC, EC and TLC); pulmonary exchange of gases, transport of oxygen, the oxyhaemoglobin dissociation curve and the factors that shift it, transport of carbon dioxide and the chloride shift; regulation of breathing and asthma, emphysema and occupational disorders.
- The syllabus lists no removed topics for this chapter. Abbreviations folded in: IRV, ERV, RV, VC, FRC (and IC, EC, TLC), pO₂, pCO₂, Hb.
- Heart, blood and excretion belong to ch17 and ch18; the respiration of cells to ch14.

## Shape
- **Part 1 (t01–t02), 17 slides:** title (flow of the air path); respiratory organs in animals; check; the human respiratory system (labelled diagram); parts and functions; the mechanism of breathing (two-panel diagram); muscles in quiet and forced breathing; worked example 1 (a blocked airway: pressure falls from 760 to 744.5 mm Hg, computed); check; the spirometer record; volumes and capacities; worked example 2 (IC 2850, EC 1350, VC 3750, TLC 4800, computed); check; worked example 3 (same minute ventilation of 6300 mL, alveolar ventilation 4200 against 5250 mL, computed); check; summary; exam tips.
- **Part 2 (t03–t04), 18 slides:** title; partial pressures and the diffusion membrane; worked example 1 (oxygen pressure at four heights, computed); transport of oxygen; the dissociation curve (three computed curves); check; factors that shift the curve; worked example 2 (oxygen content 19.5 and 15.1 mL per 100 mL, 4.4 mL given up, 220 mL a minute, computed); check; the chloride shift (diagram); the three forms of carbon dioxide; worked example 3 (230 mL a minute split 161, 52.9 and 16.1 mL, computed); check; regulation of breathing (flow); respiratory disorders; check; summary; exam tips.
- **Visuals (27 of 35 slides; no gap longer than one slide):** table 19, svg 5, flow 3.
- **Diagrams (8 SVGs):** the human respiratory system and a lettered A–E version; inspiration and expiration side by side; a spirometer tracing drawn from the computed volumes, with a lettered A–E version; the oxyhaemoglobin dissociation curves (normal, right-shifted, left-shifted, drawn from the Hill formula in `calc.mjs`) and a lettered A–C version; carbon dioxide transport and the chloride shift. Every SVG was rasterised and checked by eye; overlaps found were fixed.
- **Narration:** 8–51 words (mean 36); no digits, symbols or unit abbreviations.

## Question bank (77)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6); 4 are deck checks; 7 use a lettered figure |
| assertion-reason | 3 | 1 (ISC options; keys a b d) |
| true-false | 3 | 1 |
| short, 1 mark | 4 | give-a-reason |
| fill-blank | 3 | 1 |
| match | 1 | 2 (volumes against descriptions) |
| numerical | 10 | 1 (1950 mL FRC; 5400 mL alveolar ventilation; 4150 mL VC; 21.9 percent; 742.2 mm Hg; 17.1 mL; 235.2 mL; 100.3 mm Hg; 175 mL; 22.7 percent) |
| short | 10 + 8 | 2 / 3, including a gradient question, a spirometer question and a comparison of oxygen with carbon dioxide transport |
| long | 7 | 5, in marked parts (a labelled respiratory system, a spirometer record, transport and the curve, the chloride shift, breath-holding and the centres, disorders, the mechanism) |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: altitude; emphysema with a lung-function table |

- **Difficulty:** d1 17 · d2 39 · d3 20 · d4 1.
- **Competency:** recall 12 · understanding 23 · application 33 · analysis 9. Application or higher is **55% of items (51% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 11 · t02 22 · t03 28 · t04 18.
- **Re-solves:** 18 scripted checks recompute keys and values from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A insect spiracles, forced expiration, gradients at a muscle, an asthma inhaler (MCQ), vital capacity against total lung capacity (A-R) · B nasal chamber; (dissociation curve or carbon dioxide and breathing rate) · C quiet inspiration; (right shift or emphysema against silicosis) · D respiratory system diagram and alveoli.
- **Long:** A vocal cords (lettered figure), alveoli, pressure with open airway, inspiratory capacity (lettered figure), haemoglobin, foetal haemoglobin and a right-shifted curve (lettered figure), release at rest, the pneumotaxic centre, asbestos (MCQ), bicarbonate and solubility, the chemosensitive area (A-R) · B the diaphragm; forced expiration; (chloride shift or asthma) · C organs of respiration; oxygen against carbon dioxide transport; a spirometer record; (gradients or the sequence of regulation) · D a swimmer's capacities; (the chloride shift diagram or breath-holding).

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem. Fixes and checks:
1. **Maths lint.** One worked-example line lost its opening dollar sign (an unclosed maths span); it was restored.
2. **Word limit.** The swimmer's 5-mark answer is mostly arithmetic, so its word limit was set to 25 to 200.
3. **Verifier.** The residual-volume percentage item stated 21.9 without an "=" step; its solution now shows 1050 / 4800 × 100 = 21.875 and then rounds.
4. **Boyle's law kept honest.** Both pressure items say the airway is blocked, so the arithmetic is true, and the slide says that with an open airway the fall is only a few mm Hg because air flows in at once.
5. **Different numbers.** The check slides and the bank questions use values other than the worked examples (ventilation check 600 mL at 12 breaths; haemoglobin 13 g; 250 mL of carbon dioxide; a 480 mm Hg mountain pass).
6. **Diagrams after rasterising.** The legend of the dissociation curves crossed the dashed pO₂ line and the "tissues" and "lungs" labels sat on the curves; the legend was moved to the right of the plot and the labels into the empty area. The respiratory system labels overlapped the right lung and were moved to the left margin. The right-hand text of the chloride-shift diagram ran off the canvas and the canvas was widened.

## For a reviewer
- **Volumes:** the usual values (TV about 500 mL, IRV 2500–3000, ERV 1000–1100, RV 1100–1200, VC 3500–4500, TLC 5000–6000, FRC about 2300) are ranges from the common textbooks; the chapter's students and the swimmer are invented and chosen to be plausible. The dead space of 150 mL is stated in the stem and is a standard value, though it is not named in the syllabus.
- **Partial pressures:** the table of oxygen and carbon dioxide at five sites uses the common textbook values (159 and 0.3; 104 and 40; 40 and 45; 95 and 40). The altitude pressures (560, 380 and 253 mm Hg) are rounded approximations for roughly 2500, 5500 and 8800 metres, and 20.9 percent oxygen is used throughout.
- **Dissociation curve:** drawn from a Hill equation with n = 2.7 and half-saturation at 26.8, 33 and 20 mm Hg. It gives 97, 90 and 75 percent at 100, 60 and 40 mm Hg, in line with textbook curves, but it is an illustration, not measured data. The right-shifting factors taught are pCO₂, hydrogen ions and temperature (the Bohr effect); foetal haemoglobin is given as a left-shifted example. Other books add 2,3-bisphosphoglycerate; it is not taught.
- **Oxygen content:** the 1.34 mL of oxygen bound per gram of haemoglobin comes from physiology texts and is not in the ISC syllabus; it is given in the stem of every question that uses it. The textbook's "5 mL per 100 mL of blood" is mentioned in the narration only.
- **Carbon dioxide:** the chapter uses about 70 percent bicarbonate, 20 to 25 percent carbamino compounds (23 in the arithmetic) and about 7 percent dissolved; the three add to 100 in the worked examples. The "Hamburger shift" is named as another name for the chloride shift.
- **Regulation:** the rhythm centre and the chemosensitive area are placed in the medulla and the pneumotaxic centre in the pons, as in the usual texts; receptors in the aortic arch and carotid artery are the peripheral sensors.
- **Disorders:** silicosis and asbestosis are the examples of occupational disorders; books differ in their examples (coal-miners' lung, byssinosis), so the questions ask for cause and symptoms and accept any correct occupational example. The emphysema case treats the raised residual volume as air trapping by damaged, inelastic alveoli, which is standard but is not stated in every Class XI book.
- **Original content:** scenarios, numbers and stems differ from the CBSE 11 Biology chapters 14 to 16 and the ICSE 10 chapters 7 to 9 (bell-jar model, blocked-airway Boyle example, swimmer and student volumes, a mountain trek, a woman's haemoglobin, a paper-bag experiment, an emphysema table).
