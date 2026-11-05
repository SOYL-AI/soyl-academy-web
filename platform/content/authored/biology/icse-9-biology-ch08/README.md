# ICSE Class 9 Biology, Chapter 8 — Economic Importance of Bacteria and Fungi

`icse-9-biology-ch08` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 16 slides), notes (5 sections), 30 flashcards, 79 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch08_short` (20 marks, 30 min) and `t_icse9bio_ch08_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch08/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics: useful bacteria in medicine (antibiotics, serums, vaccines); bacteria in agriculture (the nitrogen cycle with nitrogen-fixing, nitrifying and denitrifying bacteria); bacteria in industry (curing of tea, tanning of leather); harmful bacteria (food spoilage, plant and animal diseases, bio-weapons, prevention of spoilage); useful fungi (yeast in baking and brewing, cheese making, edible mushrooms).
- **Removed topic respected:** the industrial processes of manufacture using fungi are not taught, named or asked anywhere. Antibiotics are treated only through a bacterial source (streptomycin from Streptomyces); the fungal production of an antibiotic and other industrial fungal products are left out, and the notes say the topic is not part of the course.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, flow charts and a graph, a 5-blank fill-in, a lettered-diagram match, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a village vaccination drive and a snake bite, a groundnut field after wheat, a flooded field, rice and milk left on a warm table, a tannery with vats, a baker's two doughs, a mushroom farm with trays) are written by SOYL and differ from CBSE 12 (microbes in human welfare), CBSE 11, ISC 11 and CBSE 10 Science. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Bacteria that Help Us; Antibiotics, serums and vaccines; Quick check; Worked example 1 (a vaccination drive); Nodules on the roots of a pulse plant; The nitrogen cycle; The bacteria of the cycle; Quick check; Worked example 2 (nitrogen in air); Quick check; Tea and leather; Quick check; Summary; Exam tips. Part 2 (16 slides): Harmful Bacteria and Useful Fungi; Harm done by bacteria; How fast bacteria multiply; Worked example 1 (bacteria in rice); Quick check; Preventing food spoilage; Quick check; Yeast and dough; Baking and brewing; Worked example 2 (yeast numbers and dough); Quick check; An edible mushroom; Cheese and mushrooms; Quick check; Summary; Exam tips.
- **Visuals (20 of 30 slides):** flow 2, svg 5, table 13.
- **Diagrams (6 distinct SVGs):** the nitrogen cycle (named, and lettered A–E for two figure questions, a match and a structured question); root nodules of a pulse plant with Rhizobium enlarged; a budding yeast cell with dough before and after rising; an edible mushroom; a bar chart of bacterial doubling in rice. All drawn with the S helpers and palette colours, rendered and checked by eye (the yeast labels, the dough bowls and the mycelium label were fixed after rendering).
- **Narration:** 3–44 words per slide (mean 28); no symbols or abbreviations.

## Question bank (79 items, 176 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 | 30 (8 are deck-check items) |
| assertion-reason | 6 | 6 (keys c d a c b c) |
| short-1 (terms, odd one out, give reason) | 7 | 7 |
| true-false | 5 | 5 |
| fill-blank-1 | 1 | 1 |
| fill-blank-5 | 1 | 5 |
| numerical | 3 | 3 |
| match-5 | 1 | 5 |
| short-2 | 10 | 20 |
| short-3 | 8 | 24 |
| long-10 (structured) | 7 | 70 |

- **Structured questions:** 7, each 10 marks in 4 parts with the part marks in the stem; each has a labelled diagram, flow chart or graph part.
- **Difficulty:** d1 18 · d2 44 · d3 16 · d4 1.
- **Competency:** recall 15 · understanding 23 · application 31 · analysis 10. Application or higher is **52% of items**, inside the 45–65% lint band.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; the numerical items (vaccinated children, nitrogen in air, bacterial and yeast doublings, dough volumes, mushrooms picked, hides in a tannery) are computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Tests were assembled by topic so that no item names the answer of another in the same test (items were grouped by the fact they test, and each test uses one item per fact).
- A model answer that fell below its word limit (nitrogen-fixing bacteria) was lengthened.

## For a reviewer
- Streptomyces is called a bacterium (it is an actinobacterium); some books give streptomycin as an example of an antibiotic from a "soil microbe".
- Serum is given as ready-made antibodies from an immunised animal (passive protection); vaccine as weakened or killed germs or their products (active protection). Class 9 books do not always use the words active and passive; the notes do not either.
- The nitrogen cycle is drawn with the steps nitrogen fixation, nitrification, absorption, decay and denitrification; lightning is mentioned in the notes only as a non-bacterial source. Nitrogen in air is given as about 78 percent by volume. Some books list Clostridium and Azotobacter as free-living fixers and Pseudomonas as the denitrifier, as here.
- Tea curing and tanning are given at the level of the syllabus (bacteria give flavour and aroma; bacteria loosen hair and fat); books differ on which bacteria and which stage of tea processing, so no species are named.
- Bacterial doubling times, vaccination, tannery, bread-dough and mushroom-farm numbers are illustrative, not real data.
- Cheese is covered through moulds that ripen it; the manufacturing steps are not described (removed topic).
