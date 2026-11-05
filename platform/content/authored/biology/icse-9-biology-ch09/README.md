# ICSE Class 9 Biology, Chapter 9 — Nutrition: Food and Balanced Diet

`icse-9-biology-ch09` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (5 sections), 30 flashcards, 76 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch09_short` (20 marks, 30 min) and `t_icse9bio_ch09_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch09/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics: classes of food (functions and common sources of carbohydrates, fats, proteins and water); mineral salts (calcium, iodine, iron, sodium); vitamins (sources, functions and deficiency diseases); balanced diet and the role of cellulose (roughage); malnutrition (causes, symptoms and prevention of kwashiorkor and marasmus). No removed topics for this chapter.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a 5-blank fill-in, matches (one on a lettered diagram), assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a school lunch and a breakfast with energy sums, a hill-village health camp, a clinic survey of vitamin deficiencies, a college hostel plan, a children's ward, a runner's sweat and body water, four clinic patients) are written by SOYL and differ from CBSE 11, ISC 11 and CBSE 10 Science. Exact-stem and originality checks report no duplicates. Food tests and digestion are left to their own chapters.

## Shape
- **Decks:** Part 1 (14 slides): Food and Nutrition; Carbohydrates, fats, proteins and water; Energy from a meal; Worked example 1 (energy in a breakfast); Quick check; Mineral salts; Where minerals are needed; Quick check; Vitamins; Quick check; Worked example 2 (a clinic survey); Quick check; Summary; Exam tips. Part 2 (15 slides): Eating Well; A balanced diet; A plate for a balanced diet; Quick check; Roughage: the role of cellulose; Worked example 1 (fibre in the diet); Quick check; Two kinds of severe malnutrition; Kwashiorkor and marasmus; Quick check; Worked example 2 (a children's ward); Preventing malnutrition; Quick check; Summary; Exam tips.
- **Visuals (19 of 29 slides):** flow 2, svg 4, table 13.
- **Diagrams (5 distinct SVGs):** a bar chart of the energy of a breakfast; a body outline showing where iodine, iron, sodium and calcium are needed; a plate model of a balanced diet (named, and lettered A–E for a figure question and a match); a child with kwashiorkor beside a child with marasmus. All drawn with the S helpers and palette colours, rendered and checked by eye (clipped labels on the body outline and the children were moved after rendering).
- **Narration:** 4–44 words per slide (mean 28); no symbols or abbreviations.

## Question bank (76 items, 176 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 27 (8 are deck-check items) |
| assertion-reason | 5 | 5 (keys a c b c d) |
| short-1 (terms, odd one out, give reason) | 7 | 7 |
| true-false | 4 | 4 |
| fill-blank-1 | 2 | 2 |
| fill-blank-5 | 1 | 5 |
| numerical | 3 | 3 |
| match-5 | 2 | 10 |
| short-2 | 11 | 22 |
| short-3 | 7 | 21 |
| long-10 (structured) | 7 | 70 |

- **Structured questions:** 7, each 10 marks in 4 parts with the part marks in the stem. Each has a diagram part: a labelled body outline, plate, child or flow diagram, or a labelled bar graph of data computed in the question.
- **Difficulty:** d1 21 · d2 40 · d3 14 · d4 1.
- **Competency:** recall 18 · understanding 20 · application 29 · analysis 9. Application or higher is **50% of items**, inside the 45–65% lint band.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; the numerical items (energy of meals, body water, calcium in milk, vitamin clinic counts and percentages, fibre, the ward) are computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Tests were assembled by topic and fact so that no item names the answer of another in the same test.
- Two short-3 model answers that fell below their word limits were lengthened.

## For a reviewer
- Energy values (17 kJ per gram for carbohydrate and protein, 37 kJ per gram for fat) are the common approximate textbook values; some books use 4, 4 and 9 kilocalories per gram, which the notes mention. Body water is given as about 70 percent of the body mass.
- Vitamins covered in questions are A, B1, C, D and K; vitamin E is named in the notes only (fat-soluble; some books link it to fertility). Rickets is attached to lack of vitamin D (and calcium); some books call the adult form osteomalacia, which is not used.
- Anaemia is attached to iron only (other causes are not discussed). Muscle cramps are given as the sodium-deficiency effect, as after heavy sweating; books differ.
- Cellulose is "not digested because humans lack the enzyme" and useful as roughage (bulk, prevents constipation).
- Kwashiorkor is given as protein deficiency in children of about 1 to 5 years, often after weaning, and marasmus as deficiency of energy and protein in infants under one year; ages are approximate and books differ.
- The plate model (cereals 40, pulses and animal foods 20, vegetables and fruit 25, milk 10, oil 5) is illustrative and is not an official ICSE or national proportion.
- Calcium need, fibre target, clinic counts and the ward are illustrative numbers.
