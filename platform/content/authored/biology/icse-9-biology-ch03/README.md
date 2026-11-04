# ICSE Class 9 Biology, Chapter 3 — The Flower

`icse-9-biology-ch03` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 15 slides), notes (3 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch03_short` (20 marks, 30 min) and `t_icse9bio_ch03_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch03/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX syllabus topics: the **structure of a bisexual flower** and **complete and incomplete flowers**; the **essential whorls** (androecium, gynoecium) and **non-essential whorls** (calyx, corolla) with their parts and functions; **inflorescence and placentation (meaning only)**.
- **Removed topic respected:** the types of inflorescence and of placentation are not taught, named or asked anywhere (decks, notes, questions, flashcards); only the two definitions, the peduncle and the placenta are used.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a 5-blank fill-in, a lettered-diagram match, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a wheat flower under a hand lens, papaya trees, a mango flowering stalk with fruit set, a nursery sorting four flower kinds, a hibiscus practical) are written by SOYL and differ from ISC 11 ch07, CBSE 11 ch05 and CBSE 10 Science. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): The Flower; A bisexual flower; Parts of the flower; Quick check; The four whorls; Complete and incomplete flowers; Worked example 1 (classifying flowers); Quick check; Roles of sepals and petals; Worked example 2 (counting parts); Quick check; Summary; Exam tips. Part 2 (15 slides): Stamen, Pistil and Arrangement; Stamen and pistil; Functions of the parts; Quick check; Worked example 1 (counting pollen); Quick check; Essential and non-essential whorls; One flower or many; Inflorescence: the meaning; Quick check; Worked example 2 (fruit set on a branch); Placentation: the meaning; Quick check; Summary; Exam tips.
- **Visuals (19 of 28 slides):** flow 2, svg 4, table 13.
- **Diagrams (5 distinct SVGs):** a bisexual flower in long section (named, and lettered A–E for a match, two figure questions and a structured question); the four whorls from above; a stamen and a pistil (with the placenta); a single flower beside an inflorescence. All drawn with the S helpers and palette colours, rendered and checked by eye (label positions in the inflorescence, stamen and pistil drawings were fixed after rendering).
- **Narration:** 3–45 words per slide (mean 27); no symbols or abbreviations.

## Question bank (70 items, 149 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 26 (7 are deck-check items) |
| assertion-reason | 5 | 5 (keys a c b d c) |
| short-1 (terms, odd one out, give reason) | 9 | 9 |
| true-false | 4 | 4 |
| fill-blank-1 | 3 | 3 |
| fill-blank-5 | 1 | 5 |
| numerical | 3 | 3 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 parts with the part marks in the stem; each has a labelled-diagram part.
- **Difficulty:** d1 25 · d2 34 · d3 10 · d4 1.
- **Competency:** recall 21 · understanding 15 · application 23 · analysis 11. Application or higher is **49% of items**, inside the 45–65% lint band.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; the numerical items (essential parts, pollen per anther and per flower, fruit set, open flowers) are computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test stems were checked so that no item in a test names the answer of another.
- A scenario question whose part (b) asked two things at once was simplified.

## For a reviewer
- A complete flower is stated to be always bisexual, and a bisexual flower may be incomplete (wheat); some books use "complete" and "bisexual" interchangeably, which the notes warn against.
- Papaya is used for unisexual flowers on separate trees (dioecious); wheat for a bisexual flower without showy sepals and petals (its glumes, lemma and palea are not discussed).
- Calyx and corolla are called non-essential or accessory whorls; the notes give both names.
- The anther is shown as two lobes with pollen sacs, as in ICSE books; the pollen counts are illustrative.
- "Meaning only" for inflorescence and placentation follows the removed-topic note in the syllabus; the peduncle and placenta are used only to explain the meanings.
