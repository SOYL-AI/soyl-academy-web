# ICSE Class 9 Chemistry, Chapter 13 — Atmospheric and Environmental Chemistry

`icse-9-chemistry-ch13` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (5 sections), 30 flashcards, 91 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch13_short` (20 marks, 30 min) and `t_icse9chem_ch13_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values, including atom-balance and mass-conservation checks of every equation), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-chemistry-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch13/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: acid rain (oxides of sulphur and nitrogen, equations to sulphurous, sulphuric and nitric acids, effects on soil, water bodies and buildings); global warming (water vapour, carbon dioxide, methane and oxides of nitrogen, their sources, ways to reduce them); the ozone layer (equations for its formation, its function, and depleting chemicals); composition of natural water (dissolved oxygen and minerals); and harmful substances in water (Minamata disease and mercury, plastics, sewage, pesticides).
- **Removed topic respected:** "reactions of ozone-depleting chemicals (only names are required)". CFCs, halons, carbon tetrachloride and methyl bromide are given by name and former use only; no mechanism or equation for their action is taught or asked.
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): balanced equations, "name the gas", "state one effect", reasons, assertion-reason items in the specimen option order, and 10-mark structured questions in parts. pH is not used (it is not in the Class IX syllabus); acid rain is described as "more acidic than normal rain".
- **Originality:** ICSE 10 Chemistry ch14 mentions methane as a greenhouse gas only in a few items (paddy fields, cattle, landfill sites); this chapter uses different sources (cement making, coal mines, wetlands, fertilised farmland) and different stems. No equation, set-up or number is shared with CBSE 10 Science or ICSE 10. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (18 slides): Air, Rain and a Warming World; Where the gases come from; Sulphur oxides: from fuel to acid; How acid rain forms and where it falls; Quick check: sulphuric acid; Nitrogen oxides: from air to nitric acid; Worked example 1: following the nitrogen; Quick check: nitric acid; Effects of acid rain; Reducing acid rain; The greenhouse effect; Greenhouse gases and their sources; Quick check: a source; Worked example 2: a rise in carbon dioxide; Reducing greenhouse gas emissions; Quick check: a measure; Summary; Exam tips. Part 2 (18 slides): The Ozone Layer and Our Water; The ozone layer in the atmosphere; How ozone is formed; Worked example 1: counting atoms in ozone formation; Quick check: forming ozone; Why the ozone layer matters; What damages the ozone layer; Quick check: the shield; Dissolved oxygen and minerals in water; Warm water holds less oxygen; Worked example 2: oxygen in a pond; Quick check: dissolved oxygen; A toxic heavy metal: Minamata disease; Plastics, sewage and pesticides; Sewage and the loss of oxygen; Quick check: Minamata; Summary; Exam tips.
- **Visuals (26 of 36 slides):** flow 7, table 14, svg 3, chem 1, plot 1.
- **Diagrams (3 SVGs, each also in a lettered A–E version, and 1 plot):** how acid rain forms and where it falls (chimney and vehicle, cloud, rain, soil and trees, lake); the greenhouse effect (sunlight, the ground, infrared, a layer of greenhouse gases, heat sent back); the ozone layer in the atmosphere (ultraviolet radiation, ozone layer, stratosphere, troposphere, Earth's surface). Plot: dissolved oxygen against temperature. Three structured questions use the lettered versions. All SVGs use the S helpers and palette colours, were rendered to PNG and checked by eye.
- **Narration:** 4–54 words per slide (mean 33); no symbols, formulae or unit abbreviations.

## Question bank (91 items, 176 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 (7 are deck-check items) | 32 |
| assertion-reason | 4 | 4 |
| short-1 (names, equations, reasons) | 14 | 14 |
| true-false | 4 (1 is a deck-check item) | 4 |
| fill-blank | 1 (5 blanks) | 1 |
| numerical | 13 | 13 |
| match-5 | 1 | 5 |
| short-2 | 9 | 18 |
| short-3 | 7 | 21 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem: acid rain (lettered diagram); greenhouse effect (lettered diagram, with a carbon dioxide calculation); ozone layer (lettered diagram); dissolved oxygen against temperature (data table and calculations); mercury in a food chain (a case with a concentration calculation); a lake receiving sewage, fertiliser run-off and plastics.
- **Difficulty:** d1 30 · d2 46 · d3 14 · d4 1 (the percentage saved by switching from a car to a bus).
- **Competency:** recall 31 · understanding 15 · application 40 · analysis 5. Application or higher is **49% of items**, inside the 45–65% lint band. No item was retagged. (An early draft was at 45% and was brought up by adding application items: equation-writing, identification, scenario and calculation items.)
- **Assertion-reason keys:** c d a b.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).
- Items were chosen so that no item names the answer of another in the same test (for example the greenhouse-gas items sit in the long test only inside the structured question, and the dissolved-oxygen MCQs are kept out of the test that has the dissolved-oxygen structured question).

## Verifier pass
- Every question was re-solved from its stem; the scripted re-solve checks pass. Relative masses, percentages, every equation's atom balance and mass conservation, and every data calculation are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem.

## For a reviewer
**Time-sensitive points, each marked "as of 2026" in the notes or narration (please re-check before release):**
1. Carbon dioxide in the air "above 420 parts per million" against "about 280" before the Industrial Revolution (notes, section 2).
2. Average warming "roughly 1.2 °C or more" since the late 1800s (notes, section 2).
3. India supplies petrol and diesel to the Bharat Stage VI standard, with very low sulphur (notes, section 1; deck 1 narration on reducing acid rain).
4. The Montreal Protocol (1987) has phased out CFCs and similar chemicals, and the ozone layer is "slowly recovering", with full recovery expected only around the middle of the century (notes, section 3; deck 2 narration).
5. The Minamata Convention on Mercury has been in force since 2017 (notes, section 5; deck 2 narration says "an international treaty controls mercury").
6. India bans a list of single-use plastic items, in force since 2022 (notes, section 5).

**Facts and values to double-check against Class IX textbooks:**
- **Equations:** sulphur dioxide with water gives sulphurous acid; 2SO₂ + O₂ → 2SO₃ and SO₃ + H₂O → H₂SO₄ give sulphuric acid; N₂ + O₂ → 2NO at very high temperature, 2NO + O₂ → 2NO₂, and 4NO₂ + O₂ + 2H₂O → 4HNO₃. Books also write 3NO₂ + H₂O → 2HNO₃ + NO (given in the notes as an accepted alternative). Ozone: O₂ → O + O under ultraviolet radiation, then O + O₂ → O₃. All are written without bond characters and are atom-balanced by the pipeline checker and by `calc.mjs`.
- **Observations and colours:** nitric oxide is colourless and nitrogen dioxide is brown; blue litmus turns red in a solution of sulphur dioxide.
- **Dissolved oxygen against temperature:** approximate textbook values for fresh water in contact with air at sea-level pressure, 14.6, 11.3, 9.1, 7.6 and 6.5 mg per litre at 0, 10, 20, 30 and 40 °C; books differ slightly, and the notes say so. "Many fish need at least about 5 mg per litre" is approximate and depends on the species.
- **Minamata disease:** a factory at Minamata Bay, Japan, discharged mercury-containing waste; recognised in the 1950s; methylmercury built up in fish and shellfish; symptoms (numbness, loss of coordination, trouble with speech, sight and hearing; in severe cases paralysis and harm to unborn babies) are stated at textbook level.
- **Ozone layer:** described as a band inside the stratosphere; the diagram shows it as a band without altitude values. The ozone-depleting chemicals are given by name and former use only (CFCs: refrigerators, air conditioners, sprays and foams; halons: fire extinguishers; carbon tetrachloride: cleaning solvent; methyl bromide: soil fumigant).
- **Imagined data (all flagged as imagined in the stems):** carbon dioxide readings at a roadside and a bus stand, car and bus emissions per kilometre, mercury in fish and in a food chain, dissolved oxygen before and after a sewage discharge, plastic collected in a town, pesticide in a stream, a marble step wearing away. None is a claim about real measurements, and no real safe limit is stated.
- **Percentages:** sulphur in sulphur dioxide is exactly 50%; nitrogen in nitrogen dioxide 30.4% (to one decimal place); the car-to-bus saving 83.3% (to one decimal place); the fall in dissolved oxygen 62.5%.
- **Sources of nitrous oxide and methane** are given at textbook level; the greenhouse effect is described as "greenhouse gases absorb part of the infrared radiation from the ground and send some back".
