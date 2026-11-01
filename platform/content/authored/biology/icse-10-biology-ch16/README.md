# ICSE Class 10 Biology, Chapter 16 — Pollution

`icse-10-biology-ch16` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 15 slides), notes (6 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch16_short` (20 marks, 30 min) and `t_icse10bio_ch16_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch16/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE syllabus topics: **air pollution** (vehicles, industry, burning garbage, brick kilns; carbon monoxide, sulphur dioxide, nitrogen oxides, particulate matter, carbon dioxide); **water, thermal and soil pollution** (detergents, sewage, industrial waste, oil spills, hot water, fertilisers, urban waste); **biomedical waste, radiation and noise**; **biodegradable and non-biodegradable wastes** and the **persistence of DDT** (biomagnification); the **greenhouse effect and global warming, acid rain and ozone depletion**; **control measures** (CNG, switching off engines at signals, social forestry, sewage treatment, plastic bans, organic farming, Bharat Stage norms) and the **Swachh Bharat Abhiyan**. DDT factors, the canteen waste share, the dissolved-oxygen fall, the pH ratio, the count of noisy places and the fuel saved at red lights are computed by `src/calc.mjs` from imagined or approximate data; time-sensitive facts are dated.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Pollution; Air pollutants and their sources; Quick check: winter haze; Water pollution; Worked example 1: why do fish die below a power plant?; Quick check: hot water; Soil pollution; Biomedical waste and radiation; Noise pollution; Worked example 2: reading a noise chart; Quick check: how many are too loud?; Summary; Exam tips. Part 2 (15 slides): Waste, Global Effects and Control; Biodegradable and non-biodegradable wastes; Quick check: why plastics stay; DDT in a food chain; Worked example 1: how much does DDT build up?; The greenhouse effect and global warming; Acid rain; Ozone layer depletion; Quick check: the ozone destroyers; Controlling pollution; Worked example 2: auditing a canteen; The Swachh Bharat Abhiyan; Quick check: Clean India; Summary; Exam tips.
- **Visuals (20 of 28 slides):** svg 6, table 13, flow 1.
- **Diagrams (7 distinct SVGs):** all new, schematic — a town beside a river with five pollution sources (named, and lettered A–E for the match and a case question); a bar chart of imagined sound levels against the harmful level; DDT concentration rising along a lake food chain; the greenhouse effect; the formation and effects of acid rain; the ozone layer thinned by CFCs. Every SVG was rendered and checked by eye.
- **Narration:** 3–51 words per slide (mean 31); no symbols or abbreviations.

## Question bank (68 items, 146 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 22 (keys a 6, b 6, c 5, d 5) |
| assertion-reason | 9 | 9 (ICSE option order; keys c d b d a c c a b) |
| short-1 | 13 | 13 |
| short-2 | 6 | 12 |
| fill-blank-1 | 4 | 4 |
| numerical | 2 | 2 |
| short-3 | 3 | 9 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 20 · d2 33 · d3 14 · d4 1.
- **Competency:** understanding 18 · recall 18 · application 14 · analysis 18. Application or higher is **47% of items (64% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (6/6/5/5) and assertion-reason keys use all four options.
- **Solution checks:** the dissolved-oxygen case part showed its subtraction inside the maths, so `verify` read 1.5 as the only computed result and raised a minor `numeric.final` flag against the key 16.5; the subtraction was moved into plain text. The pH item was reworded so that its one computed step gives the key (10).
- **Figures:** greenhouse labels were moved off the heat and sunlight arrows, ozone labels moved into the band and the CFC arrow re-routed, the acid-rain gas label and captions re-spaced and the lake enlarged, and the town scene widened with its labels moved off the field and roofs, after rendering every SVG to PNG.
- Exact-stem check against every authored bank, `verify --authored` (0 blocking, 0 minor) and `originality --authored` (0 errors) pass.

## For a reviewer
- Bharat Stage norms: BS-VI is said to apply across India since April 2020 (as of 2026); later norms, if announced, are not covered.
- Plastic bans: India banned a list of single-use plastic items from 1 July 2022 (notes only; no question depends on the date); state bans differ.
- Swachh Bharat Abhiyan: launched on 2 October 2014; its aims are given in general terms (clean India, end open defecation, solid-waste management, habits); later phases are not described.
- Biomedical waste: India's Bio-Medical Waste Management Rules, 2016 are cited as an example of colour-coded segregation; only sharps containers are described, not the full colour scheme.
- Ozone: the Antarctic ozone hole is dated to the 1980s and the Montreal Protocol to 1987; the layer is described as recovering slowly.
- Noise: long exposure above about 80 dB is taken as harmful; occupational limits are often given as 85 dB over eight hours and Indian ambient limits are lower and zone-specific. The sound readings are imagined.
- Acid rain: normal rain is given a pH of about 5.6 and the acid sample 4.6; each pH unit is taken as a tenfold change.
- Thermal pollution: dissolved oxygen of about 9.1 mg per litre at 20 °C and 7.6 at 30 °C are approximate saturation values.
- DDT: food-chain values are imagined; the notes say many countries, including India, have banned or restricted its farm use (India still permits limited public-health use).
- CNG buses in Delhi are mentioned without a date; the marble-monument item does not name a monument.
