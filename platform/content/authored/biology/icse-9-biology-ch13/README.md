# ICSE Class 9 Biology, Chapter 13 — Diseases and their Transmission

`icse-9-biology-ch13` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (6 sections), 30 flashcards, 97 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch13_short` (20 marks, 30 min) and `t_icse9bio_ch13_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch13/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE 2028 Class IX syllabus topics: communicable and non-communicable diseases and the terms endemic, epidemic, pandemic and sporadic; modes of transmission (air, water, vectors: housefly, mosquito, cockroach); bacterial diseases (cholera, typhoid, tuberculosis); viral diseases (AIDS, chicken pox, hepatitis); protozoan diseases (malaria, amoebic dysentery, sleeping sickness); helminthic diseases (ascariasis, taeniasis, filariasis).
- **Removed topic respected:** scientific names of causative agents are not given or asked anywhere. Pathogens are named only by group (bacterium, virus, protozoan, roundworm, tapeworm). Only the names of the vectors (female Anopheles, Culex, tsetse fly) appear, since the vector is part of the syllabus topic on transmission.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a lettered-diagram match, a fill-in, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a bar chart of weekly cases, wards compared by cases per thousand, a boarding school with chicken pox, a flooded village with watery diarrhoea, a market sample of vegetables, two villages compared by rate, old tyres holding rainwater) are written by SOYL and differ from CBSE 12 Human Health and Disease, ISC 12 Biology, CBSE 10 Science and the ICSE 9 and ICSE 10 chapters on bacteria and fungi and on health. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Diseases and their Transmission; Communicable and non-communicable diseases; Endemic, epidemic, pandemic and sporadic; Quick check: a sudden rise; Worked example 1: is it an epidemic?; How pathogens travel; A housefly as a carrier; Vectors: housefly, mosquito and cockroach; Quick check: a vector; Worked example 2: tracing the source; Cholera and typhoid; Tuberculosis; Quick check: an airborne disease; Summary; Exam tips. Part 2 (16 slides): Viruses, Protozoans and Worms; AIDS; How AIDS spreads and how it does not; Quick check: the target of the virus; Chicken pox and hepatitis; Quick check: yellow skin; Malaria: how the mosquito spreads it; Malaria: symptoms and control; Worked example 1: the rhythm of the fever; Worked example 2: draining the breeding places; Amoebic dysentery and sleeping sickness; Quick check: the sleeping sickness vector; Helminthic diseases: worms; Quick check: swollen limbs; Summary; Exam tips.
- **Visuals (22 of 31 slides):** flow 2, table 18, svg 2.
- **Diagrams (5 distinct SVGs):** a housefly carrying germs from waste to food (named, and lettered A-E); how a mosquito passes malaria from person to person with eggs laid in stagnant water (named, and lettered A-E); a bar chart of new cases in six weeks of an outbreak. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 4–46 words per slide (mean 33); no symbols or abbreviations; numbers and units in words.

## Question bank (97 items, 195 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 36 | 36 |
| assertion-reason | 4 | 4 |
| short-1 (terms, odd one out, give reason) | 11 | 11 |
| true-false | 3 | 3 |
| fill-blank-5 | 1 | 5 |
| numerical | 10 | 10 |
| match-5 | 1 | 5 |
| short-2 | 14 | 28 |
| short-3 | 11 | 33 |
| long-10 (structured) | 6 | 60 |

- **MCQ deck-check items:** 7 of the mcq items; none is used in a test.
- **Structured questions:** 6, each 10 marks in 4 parts with the part marks in the stem; each has a diagram part (the route of a housefly, a pond with measures against breeding, a safe food store, the skin in chicken pox, a protected well, a flow diagram of undercooked meat and a tapeworm). The diagram part draws something that the other parts do not name.
- **Difficulty:** d1 27 · d2 63 · d3 6 · d4 1 (two villages compared by cases in every thousand people).
- **Competency:** recall 20 · understanding 19 · application 49 · analysis 9. Application or higher is **60% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** c b a d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; computed values are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test items were chosen so that no stem or option names the answer of another item in the same test.

## For a reviewer
- **Endemic, epidemic, pandemic, sporadic:** definitions follow the usual Class 9 wording; books differ on examples (for instance which disease is called endemic where, or whether typhoid is the sporadic example). The notes say so, and the questions set the pattern in a stem so that the answer does not depend on a particular textbook example.
- **Time-sensitive points (all stated as stable facts, or with "as of 2026"):** (1) vaccines against cholera, typhoid, chicken pox and hepatitis are described as available, with use decided by health authorities (notes: "as of 2026"); (2) AIDS: medicines control the virus but there is no cure (notes: "as of 2026"); (3) the childhood tuberculosis vaccine is mentioned without a schedule; (4) tsetse-borne sleeping sickness is placed in parts of Africa; (5) no national programme, dose schedule or case number is quoted anywhere, and all case counts and rates in the questions are imagined.
- **Vector names:** female Anopheles (malaria), Culex (filariasis) and tsetse fly are given because the syllabus asks for the vector. They are genus names of vectors, not of the causative agents.
- **Hepatitis:** only types A (food and water) and B (blood and body fluids) are contrasted; other types are not taught.
- **Typhoid fever pattern:** a fever rising step by step over days is the textbook description; the evening temperatures in the question are imagined.
- **Chicken pox:** the question says a vaccine exists and isolation helps; the Class 9 scope does not teach shingles or antiviral treatment.
- **Cholera:** oral rehydration is named as the first aid; the volumes of fluid lost are imagined.
- **Taeniasis:** the notes mention only the tapeworm and its larvae in undercooked meat, without naming the animal hosts beyond "meat".
- The drawings are schematic (the insects are not to scale, and the person figures show only the features needed).
