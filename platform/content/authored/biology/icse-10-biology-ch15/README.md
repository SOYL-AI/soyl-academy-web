# ICSE Class 10 Biology, Chapter 15 — Human Evolution

`icse-10-biology-ch15` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 15 slides), notes (3 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch15_short` (20 marks, 30 min) and `t_icse10bio_ch15_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch15/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE syllabus topics: the **human ancestors** (Australopithecus, Homo habilis, Homo erectus, Neanderthal man, Cro-Magnon man and modern Homo sapiens sapiens) in sequence and compared in bipedalism and posture, cranial capacity, canine size, brow ridges, chin, body hair and height; **Lamarck's theory** of use and disuse and inheritance of acquired characters, with the giraffe's neck, human vestigial organs and Weismann's criticism; **Darwin's theory of natural selection** (overproduction, struggle for existence, variation, survival of the fittest) and the **peppered moth**. The cranial-capacity ratio and difference, moth percentages, the recapture ratio and the beetle survival percentage are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Human Evolution; The members of the human line; Skulls compared; Quick check: a modern feature; Bigger brains; Comparing the ancestors; Worked example 1: name the fossil; Quick check: the handy man; Worked example 2: how much bigger?; Quick check: brain size; Why walking upright mattered; Summary; Exam tips. Part 2 (15 slides): How Does Evolution Happen?; Lamarck's theory; The giraffe's neck: two explanations; Vestigial organs in humans; Quick check: a reduced organ; Why Lamarck was rejected; Darwin's theory of natural selection; Worked example 1: Darwin's giraffe, step by step; Quick check: the phrase; The peppered moth; Worked example 2: moth data; Quick check: competition; Lamarck and Darwin compared; Summary; Exam tips.
- **Visuals (20 of 28 slides):** flow 4, table 12, svg 4.
- **Diagrams (5 distinct SVGs):** all new, schematic — side views of an early-ancestor skull and a modern skull (named, and lettered A–E for the match and a case question); a bar chart of approximate cranial capacities; Lamarck's and Darwin's explanations of the giraffe's neck in two rows of panels; light and dark peppered moths on pale lichen-covered and soot-darkened bark. Every SVG was rendered and checked by eye.
- **Narration:** 4–49 words per slide (mean 30); no symbols or abbreviations.

## Question bank (62 items, 137 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 20 (keys a 5, b 5, c 5, d 5) |
| numerical | 2 | 2 |
| assertion-reason | 7 | 7 (ICSE option order; keys d b c b d c a) |
| true-false | 4 | 4 |
| fill-blank-1 | 3 | 3 |
| short-1 | 10 | 10 |
| short-2 | 5 | 10 |
| short-3 | 2 | 6 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 15 · d2 31 · d3 15 · d4 1.
- **Competency:** recall 13 · understanding 19 · application 14 · analysis 16. Application or higher is **48% of items (66% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (5/5/5/5) and assertion-reason keys use all four options.
- **Exact-stem duplicates** with CBSE 12 Biology ch06 (main points of Darwin's theory), ISC 12 Biology ch09 (vestigial organ in humans) and ISC 12 Biology ch10 (Homo habilis as handy man) were rewritten; the Darwin item is now an applied question on caterpillars and cabbages.
- **Competency balance:** the first build had 44% application or higher; the Darwin item above, a Cro-Magnon recall item (rewritten as a cave-site identification) and a rabbit overproduction item (re-tagged) bring it to 48%.
- **Bank size:** the first draft had 57 items; five were added (a Neanderthal identification, canine trend, appendix assertion-reason, interspecific struggle and natural-selection term) to reach 62.
- **Check slides:** a Part 2 check slide pointed at an MCQ that is also in the long chapter test; it now points at the interspecific-struggle MCQ, so no deck-check item is used in a test.
- **Figures:** skull labels were clipped at both edges, so the drawing was shifted right inside a translate group and the canvas widened; every SVG was then rendered to PNG and checked.
- Exact-stem check against every authored bank, `verify --authored` (0 blocking, 0 minor) and `originality --authored` (0 errors) pass.

## For a reviewer
- Cranial capacities are approximate school-textbook averages and vary between books: Australopithecus about 500, Homo habilis about 700, Homo erectus about 1000, Neanderthal man about 1450, Cro-Magnon man about 1600, modern man about 1400 cubic centimetres (the modern adult average is often quoted as about 1350).
- Homo erectus is called the first ancestor known to use fire and to walk fully upright, and Homo habilis the first tool-maker, as in ICSE textbooks; newer finds push both dates earlier.
- Neanderthal man is described as having little or no chin and burying the dead; Cro-Magnon man is called early modern humans in Europe with a chin and cave art.
- Weismann's mouse-tail experiment (1880s) is described as "over many generations" without a number; textbooks quote different numbers of generations.
- Dates: Lamarck's theory 1809, Darwin's Origin of Species 1859, the industrial 1800s and clean-air laws in the 1900s for the peppered moth.
- The moth recapture and survey numbers, the beetle example and the caterpillar example are imagined data, not results of real studies.
- The vestigial-organ list (appendix, coccyx, ear muscles, nictitating membrane, wisdom teeth) follows school textbooks; the appendix is now known to have some immune role, so "no clear use" is the safer wording used.
- A skull-case part says the chin is found only in Cro-Magnon and modern humans, the usual textbook position.
