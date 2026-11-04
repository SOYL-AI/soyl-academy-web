# ICSE Class 9 Biology, Chapter 2 — Tissues

`icse-9-biology-ch02` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 17 slides), notes (5 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch02_short` (20 marks, 30 min) and `t_icse9bio_ch02_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch02/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics: **meristematic tissues** (apical, intercalary, lateral); **permanent tissues**, simple (parenchyma, collenchyma, sclerenchyma) and complex (xylem, phloem with their components); **epithelial and connective tissues**; **muscular and nervous tissues** with a labelled neuron; the **role of tissues** in transport, support, gas exchange, movement and coordination. The chapter has no removed topics.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a 5-blank fill-in, a lettered-diagram match, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** all situations (the nail in a teak sapling, ink in celery, a lawn mower and grass leaves, a girdled branch, a smoker's windpipe, a gut slide count) are written by SOYL and differ from ISC 11 ch08, CBSE 11 ch07 and CBSE 10 Science. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Tissues; Where the meristems lie; Three kinds of meristem; Quick check; Worked example 1 (which meristem, shoot growth); Simple permanent tissues; Comparing the simple tissues; Quick check; Xylem and phloem; Components of xylem and phloem; Worked example 2 (the stained celery); Quick check; Summary; Exam tips. Part 2 (17 slides): Animal Tissues; Epithelial tissue; Types of epithelium; Quick check; Connective tissues; Types of connective tissue; Worked example 1 (naming the tissue); Quick check; Muscular tissue; Three kinds of muscle; Worked example 2 (a tireless muscle); Quick check; Nervous tissue: the neuron; Structure and role; Quick check; Summary; Exam tips.
- **Visuals (22 of 31 slides):** flow 2, svg 7, table 13.
- **Diagrams (8 distinct SVGs):** positions of the meristems; three simple tissues; xylem and phloem in long section; four epithelia; four connective tissues; three muscle tissues; a neuron (named and lettered A–E for a match and a figure question). All drawn with the S helpers and palette colours, rendered and checked by eye (the phloem labels were moved so no leader crosses another cell).
- **Narration:** 4–41 words per slide (mean 27); no symbols or abbreviations.

## Question bank (71 items, 153 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 25 (7 are deck-check items) |
| assertion-reason | 5 | 5 (keys c a c d b) |
| short-1 (terms, odd one out, give reason) | 8 | 8 |
| true-false | 3 | 3 |
| fill-blank-1 | 3 | 3 |
| fill-blank-5 | 1 | 5 |
| numerical | 5 | 5 |
| match-5 | 1 | 5 |
| short-2 | 8 | 16 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 parts with the part marks in the stem; each has a labelled-diagram part.
- **Difficulty:** d1 17 · d2 41 · d3 12 · d4 1.
- **Competency:** recall 13 · understanding 21 · application 26 · analysis 11. Application or higher is **52% of items**, inside the 45–65% lint band.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; the numerical items (shoot growth, ink speed, heartbeats, sieve tubes, percentage of striped cells, ring thickness, impulse time) are computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10; one scheme that summed to 9 was corrected.
- Test stems were checked so that no item in a test names the answer of another.

## For a reviewer
- The simple tissues are as in ICSE texts: parenchyma (living), collenchyma (living, corner thickening), sclerenchyma (dead, lignified). Some books also list aerenchyma and chlorenchyma as types of parenchyma; they are mentioned only in the notes.
- Xylem components: tracheids, vessels, fibres, parenchyma. Phloem: sieve tubes, companion cells, fibres, parenchyma.
- Cardiac muscle is stated to have usually one nucleus and intercalated discs; some books say it may have one or two nuclei.
- The myelin sheath and axon terminals are included in the neuron drawing (a labelled neuron is in the syllabus; the myelin sheath is not named in the outcome).
- Impulse speed (100 metres per second) and the heart rate values are illustrative, chosen for arithmetic.
