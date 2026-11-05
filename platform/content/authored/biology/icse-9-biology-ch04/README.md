# ICSE Class 9 Biology, Chapter 4 — Pollination and Fertilisation

`icse-9-biology-ch04` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 14 slides), notes (5 sections), 30 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch04_short` (20 marks, 30 min) and `t_icse9bio_ch04_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch04/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics: self- and cross-pollination (advantages and disadvantages); agents of pollination with the features of insect-, wind- and water-pollinated flowers; how nature favours cross-pollination (unisexuality, dichogamy, self-sterility); the events from pollination to fertilisation (pollen tube, embryo sac, zygote); double fertilisation and triple fusion, and fruit and seed (definition and significance).
- No removed topics for this chapter. Chromosome counts are used only as simple arithmetic (half, sum and three sets), not as a genetics topic.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a lettered-diagram match or fill-in, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (bagged tomato buds, pollen germination in sugar solutions, a sage and a grass flower compared, Vallisneria in a tank, a pea-type crop, a protogynous flower timeline) are written by SOYL and differ from ISC 12 ch01-02, CBSE 12 ch02, CBSE 11 ch03 and CBSE 10 Science. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Pollination and Fertilisation; Self-pollination and cross-pollination; Advantages and disadvantages; Quick check: bagged flowers; Agents of pollination; An insect flower and a wind flower; Insect-pollinated and wind-pollinated flowers; Worked example 1: which agent?; Quick check: pollen of a wind flower; Pollination by water; How nature favours cross-pollination; Worked example 2: a protandrous flower; Quick check: separate sexes; Summary; Exam tips. Part 2 (14 slides): From Pollen to Seed; The pollen tube on its way; Events from pollination to fertilisation; Quick check: where the tube enters; Worked example 1: how long will the tube take?; Inside the embryo sac; Double fertilisation and triple fusion; Quick check: triple fusion; Worked example 2: counting chromosomes; From flower to fruit and seed; Quick check: ovary or ovule; Why fruit and seed matter; Summary; Exam tips.
- **Visuals (21 of 29 slides):** flow 4, table 13, svg 4.
- **Diagrams (6 distinct SVGs):** an insect-pollinated and a wind-pollinated flower side by side; a pistil after pollination (named, and lettered A-F for a match, two figure questions and a structured question); an embryo sac at fertilisation (named, and lettered A-E for a structured question); pollination in Vallisneria. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (a misplaced 'light, dry pollen' label in the flower comparison was moved to the wind flower).
- **Narration:** 6–46 words per slide (mean 30); no symbols or abbreviations.

## Question bank (73 items, 163 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 23 |
| assertion-reason | 7 | 7 |
| short-1 (terms, odd one out, give reason) | 11 | 11 |
| true-false | 5 | 5 |
| numerical | 4 | 4 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 8 | 24 |
| long-10 (structured) | 7 | 70 |

- **MCQ deck-check items:** 5 of the mcq items (more checks are true-false); none is used in a test.
- **Structured questions:** 7, each 10 marks in 4 or 5 parts with the part marks in the stem; each has a labelled-diagram part.
- **Difficulty:** d1 15 · d2 40 · d3 17 · d4 1.
- **Competency:** recall 15 · understanding 22 · application 21 · analysis 15. Application or higher is **49% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** d c b c a c b.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; computed values are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test stems were checked so that no item in a test names the answer of another.
- The chapter was begun by an earlier writer (calc, decks, svgs). Those files were reviewed and kept; three check-slide stems were reworded so that each is a single objective question, and the pollen-dust label in the flower comparison was moved to the correct flower.

## For a reviewer
- Self-pollination is taught as pollen reaching the stigma of the same flower; the notes add that pollen moved between flowers of the same plant is also treated as self-pollination (some books call this geitonogamy and group it with cross-pollination). Questions avoid this boundary case.
- Passion fruit is given as an example of self-sterility and sunflower as an example of protandry; books vary in the examples they quote. Papaya is the unisexual (dioecious) example.
- The sugary fluid on the stigma is described as what makes a pollen grain germinate, and the pollen germination data and the tube growth rate, style length, ripening days and pollen counts are imagined and illustrative.
- The embryo sac is the seven-cell, eight-nucleus type (egg cell with two synergids, two polar nuclei, three antipodal cells); the pollen tube enters through the micropyle (porogamy).
- The ovary wall is said to become the fruit wall and the integuments the seed coat; the endosperm is described as a food store without distinguishing the types of endosperm.
