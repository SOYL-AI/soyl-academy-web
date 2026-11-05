# ICSE Class 9 Biology, Chapter 5 — Seeds: Structure and Germination

`icse-9-biology-ch05` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (4 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch05_short` (20 marks, 30 min) and `t_icse9bio_ch05_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch05/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ICSE 2028 Class IX syllabus topics: structure of a dicot seed (bean) and a monocot grain (maize); differences between monocot and dicot seeds; germination of bean and maize with hypogeal and epigeal germination; conditions for germination and the experiments that show them.
- No removed topics for this chapter.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a lettered-diagram match or fill-in, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a bag of bean and maize seeds, gram seeds soaked overnight, four tubes of twenty seeds with dry cotton wool, boiled water with oil, an ice bath and a control, mustard seeds on moist cloth, a pea against a bean in pots) are written by SOYL and differ from CBSE 11 ch05, CBSE 10 Science and ISC 11 ch10. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Seeds: Structure and Germination; A bean seed: outside and inside; Parts of a bean seed and what they do; Quick check: the food store; A maize grain; Parts of a maize grain and what they do; Quick check: the shield; Dicot and monocot seeds compared; Worked example 1: counting cotyledons; Quick check: one cotyledon; Worked example 2: naming the seed from clues; Why each part matters; Summary; Exam tips. Part 2 (14 slides): Germination; Stages of germination of a bean; Two ways to germinate; Epigeal and hypogeal germination; Quick check: where do the cotyledons end up?; Germination of a maize grain; Quick check: the shoot guard; Worked example 1: which type, and how long?; Conditions needed for germination; An experiment with four tubes; Quick check: the oil layer; Worked example 2: reading the results; Summary; Exam tips.
- **Visuals (20 of 28 slides):** flow 2, svg 4, table 14.
- **Diagrams (6 distinct SVGs):** a bean seed from outside and opened (named, and lettered A-E for a match, two figure questions and a structured question); a maize grain in long section (named, and lettered A-E for two figure questions and a structured question); epigeal and hypogeal germination side by side; four test tubes P-S for the conditions experiment. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (the duplicated letter A on the lettered bean figure was removed).
- **Narration:** 3–48 words per slide (mean 29); no symbols or abbreviations.

## Question bank (71 items, 154 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 27 |
| assertion-reason | 6 | 6 |
| short-1 (terms, odd one out, give reason) | 8 | 8 |
| true-false | 3 | 3 |
| fill-blank-5 | 1 | 5 |
| numerical | 5 | 5 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 7 | 21 |
| long-10 (structured) | 6 | 60 |

- **MCQ deck-check items:** 6 of the mcq items (more checks are true-false); none is used in a test.
- **Structured questions:** 6, each 10 marks in 4 or 5 parts with the part marks in the stem; each has a labelled-diagram part.
- **Difficulty:** d1 15 · d2 39 · d3 16 · d4 1.
- **Competency:** recall 14 · understanding 20 · application 25 · analysis 12. Application or higher is **52% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** d c a c c b.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; computed values are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test stems were checked so that no item in a test names the answer of another.
- A classify-short model answer that fell below its word limit was lengthened.

## For a reviewer
- 'Bean' is taken as the French (kidney) bean, which is epigeal; the broad bean is hypogeal. Pea, gram and maize are given as hypogeal, bean, castor and cotton as epigeal, as in common ICSE books.
- The bean seed is called a dicot seed without a separate endosperm when ripe, and maize a monocot with a large endosperm; some dicots (castor) keep an endosperm, noted in the notes.
- The maize grain is described as a fruit (caryopsis) with the fruit wall joined to the seed coat; the aleurone layer is not drawn or asked.
- The experiment uses boiled, cooled water with a layer of oil to exclude oxygen and an ice bath for low temperature; real books use various set-ups. Most seeds are said not to need light.
- All counts, percentages, masses, lengths and days are imagined and illustrative.
