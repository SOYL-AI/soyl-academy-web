# ICSE Class 10 Biology, Chapter 12 — Endocrine System

`icse-10-biology-ch12` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (5 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch12_short` (20 marks, 30 min) and `t_icse10bio_ch12_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch12/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE syllabus topics: **endocrine and exocrine glands** and the location and shape of the **pituitary, thyroid, pancreas and adrenal glands**; the **pancreas** (insulin, glucagon; diabetes mellitus and hypoglycaemia) and the **thyroid** (thyroxine; cretinism, myxoedema, simple and exophthalmic goitre); the **adrenal gland** (cortical hormones and adrenaline, the emergency hormone); the **pituitary** as master gland (growth hormone, tropic hormones, ADH, oxytocin; dwarfism, gigantism, acromegaly, diabetes insipidus); **negative feedback** between TSH and thyroxine, also used to explain simple goitre. Blood-sugar rises and falls, the urine-volume ratio and the heart-rate rise come from imagined readings computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): The Endocrine System; Endocrine and exocrine glands; Where the glands are; The pancreas: a mixed gland; Quick check: a mixed gland; Insulin and glucagon keep sugar steady; Worked example 1: reading a sugar test; Too little or too much insulin; Quick check: insulin cells; The thyroid and thyroxine; Worked example 2: naming the disorder; Quick check: iodised salt; Summary; Exam tips. Part 2 (15 slides): Adrenal, Pituitary and Feedback; The adrenal gland; Adrenaline: fight or flight; Quick check: emergency sugar; Worked example 1: a fright in numbers; The pituitary: master gland; Pituitary hormones and their work; When pituitary hormones go wrong; Quick check: childbirth; Worked example 2: why so much urine?; Feedback: TSH and thyroxine; Quick check: low thyroxine; Feedback explains simple goitre; Summary; Exam tips.
- **Visuals (21 of 29 slides):** flow 4, table 12, svg 5.
- **Diagrams (5 distinct SVGs):** all new — the human body outline with the pituitary, thyroid, pancreas, adrenals and testes (named, and lettered A–E for the gland match and a case question); the pancreas with an exocrine acinus and an endocrine islet (alpha and beta cells beside a capillary); a blood-sugar line graph of two imagined people against the normal band; the TSH–thyroxine feedback loop with both feedback branches. Every SVG was rendered and checked by eye.
- **Narration:** 4–48 words per slide (mean 34); no symbols or abbreviations.

## Question bank (70 items, 151 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 24 (keys a 6, b 6, c 6, d 6) |
| short-1 | 12 | 12 |
| short-2 | 7 | 14 |
| short-3 | 4 | 12 |
| assertion-reason | 7 | 7 (ICSE option order; keys c d a c d c b) |
| true-false | 3 | 3 |
| fill-blank-1 | 3 | 3 |
| numerical | 1 | 1 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 13 · d2 40 · d3 15 · d4 2.
- **Competency:** recall 14 · application 16 · understanding 22 · analysis 18. Application or higher is **49% of items (65% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (6/6/6/6) and assertion-reason keys use all four options.
- **Bank size:** the first build had 76 items; six overlapping items (a second thyroid-overactivity item, two pairing items, two true-false items and a thyroxine-function item) were removed to bring the bank to 70.
- **Word limits:** two 2-mark case answers (gland figure part d, clinic case part b) were expanded into the 20–45 word band.
- **Figures:** all five SVGs were rendered to PNG and checked by eye; labels, leaders and the graph values sit clear of each other.
- Exact-stem check against every authored bank, `verify --authored` (0 blocking, 0 minor) and `originality --authored` (0 errors) pass.

## For a reviewer
- Normal blood sugar is given as about 80–120 mg per 100 mL of blood (the usual ICSE textbook band); clinical fasting ranges are quoted slightly differently (about 70–100 mg per dL).
- A typical adult urine output of about 1.5 litres a day is an approximate textbook value; the patient's 9 litres, the blood-sugar readings and the heart rates are imagined data.
- The lettered gland figure and match include a testis (E) as the target of FSH and LH; the syllabus names only the pituitary, thyroid, adrenal and pancreas.
- Cortisol and aldosterone are named only as examples of cortical hormones; the syllabus asks for their general role.
- Cretinism is described as "delayed mental development" rather than older textbook wording.
- Insulin is said to be given by injection because, as a protein, it would be digested if swallowed (newer oral and inhaled forms exist but are not taught).
