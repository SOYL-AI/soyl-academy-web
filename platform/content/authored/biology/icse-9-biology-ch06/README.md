# ICSE Class 9 Biology, Chapter 6 — Respiration in Plants

`icse-9-biology-ch06` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (4 sections), 30 flashcards, 74 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch06_short` (20 marks, 30 min) and `t_icse9bio_ch06_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch06/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ICSE 2028 Class IX syllabus topics: outline of respiration with glycolysis and the Krebs cycle and their significance; aerobic and anaerobic respiration with chemical equations; gaseous exchange in plants and the experiment showing that germinating seeds give out carbon dioxide; the thermos-flask experiment for heat production with the need for a control.
- No removed topics for this chapter. Lactic acid fermentation (animals) is mentioned only to be excluded.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a lettered-diagram match or fill-in, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (yeast in a closed bottle, a flooded field, lime-water flasks with twenty-five and fifty grams of seeds, two vacuum flasks read over four days, a leaf patch of stomata) are written by SOYL and differ from CBSE 11 ch12, ISC 11 ch14 and CBSE 10 Science. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Respiration in Plants; Respiration is not breathing; Where respiration happens; Glycolysis and the Krebs cycle; Quick check: the site of glycolysis; Aerobic respiration; Worked example 1: aerobic respiration of five glucose molecules; Anaerobic respiration; Aerobic and anaerobic compared; Quick check: alcohol; Worked example 2: anaerobic respiration of eight glucose molecules; Quick check: the larger energy yield; Summary; Exam tips. Part 2 (14 slides): Gaseous Exchange and Experiments; Gaseous exchange in plants; Respiration and photosynthesis; Quick check: openings in woody stems; Carbon dioxide from germinating seeds; The experiment step by step; Worked example 1: reading the times; Quick check: lime water; Why boiled seeds are the control; Heat from germinating seeds; Worked example 2: reading the thermometers; Quick check: the control flask; Summary; Exam tips.
- **Visuals (20 of 28 slides):** flow 2, table 13, svg 3, chem 2.
- **Diagrams (5 distinct SVGs):** a plant cell showing glycolysis in the cytoplasm and the Krebs cycle in the mitochondrion (named, and lettered A-E for a match, two figure questions and a structured question); two flasks of seeds with delivery tubes into lime water (with and without the results); two vacuum flasks with thermometers. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (the Krebs cycle label was moved off the cristae line, and the lettered cell figure no longer names the products).
- **Narration:** 4–43 words per slide (mean 30); no symbols or abbreviations.

## Question bank (74 items, 158 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 24 |
| assertion-reason | 7 | 7 |
| short-1 (terms, odd one out, give reason) | 10 | 10 |
| true-false | 4 | 4 |
| fill-blank-5 | 1 | 5 |
| numerical | 6 | 6 |
| match-5 | 1 | 5 |
| short-2 | 8 | 16 |
| short-3 | 7 | 21 |
| long-10 (structured) | 6 | 60 |

- **MCQ deck-check items:** 6 of the mcq items (more checks are true-false); none is used in a test.
- **Structured questions:** 6, each 10 marks in 4 or 5 parts with the part marks in the stem; each has a labelled-diagram part.
- **Difficulty:** d1 16 · d2 37 · d3 20 · d4 1.
- **Competency:** recall 15 · understanding 20 · application 24 · analysis 15. Application or higher is **53% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** c b c a c a d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; computed values are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test stems were checked so that no item in a test names the answer of another.
- Two short answers that fell below their word limits were lengthened; the equations in the decks use mhchem and pass the KaTeX check.

## For a reviewer
- Energy is taken as about 36 units (ATP) per glucose for aerobic respiration and 2 for anaerobic respiration; books give 36, 38 or 30 to 32 for the aerobic figure. The chapter states the numbers as 'about' and one numerical item gives them in its stem.
- Glycolysis is described as glucose (six carbons) to two pyruvate (three carbons each) in the cytoplasm with a little energy; the Krebs cycle takes place in the mitochondria and gives carbon dioxide, water and much more energy. The finer steps (link reaction, electron transport) are not taught; books vary on whether water is assigned to the Krebs cycle or to the electron transport that follows.
- Anaerobic respiration in plants and yeast gives alcohol (ethanol) and carbon dioxide; the lactic acid route of animals is excluded.
- The CO2 experiment uses lime water in flasks of soaked seeds, with boiled, cooled seeds as the control; the heat experiment uses vacuum flasks, cotton wool and thermometers. Books vary on the use of disinfectant-soaked seeds; boiled seeds are used here for simplicity.
- All times, temperatures, volumes, counts and masses are imagined and illustrative.
