# ICSE Class 10 Biology, Chapter 10 — Nervous System

`icse-10-biology-ch10` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (5 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch10_short` (20 marks, 30 min) and `t_icse10bio_ch10_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch10/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE syllabus topics: the **neuron** (dendrites, cell body, axon, myelin sheath, nodes of Ranvier, axon endings, synapse; sensory, relay and motor neurons) and the **central, peripheral and autonomic** nervous systems in brief; the **brain** (cerebrum, cerebellum, thalamus, hypothalamus, pons, medulla oblongata) with their functions and the effects of damage; the **spinal cord** and the arrangement of **grey and white matter** in the brain and spinal cord; **voluntary, involuntary and reflex actions** and the **reflex arc**; **natural and acquired reflexes** (with Pavlov's experiment). The ruler-test means and percentage and the impulse travel times are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Nervous System; Divisions of the nervous system; The neuron; Parts of a neuron and the synapse; Quick check: the junction; Worked example 1: how fast is an impulse?; Three kinds of neuron; Quick check: the CNS; The human brain; Functions of the parts of the brain; Quick check: keeping balance; Worked example 2: predicting the effect of damage; Grey matter and white matter; Quick check: inside or outside?; Summary; Exam tips. Part 2 (15 slides): Actions and Reflexes; Three kinds of action; Quick check: what is a reflex?; The reflex arc; Steps in a reflex arc; Quick check: the order; Worked example 1: classifying actions; Spinal and brain reflexes; Natural and acquired reflexes; Quick check: a learnt reflex; Worked example 2: the ruler test; How a reflex is learnt; Quick check: inherited?; Summary; Exam tips.
- **Visuals (21 of 31 slides):** flow 4, table 13, svg 4.
- **Diagrams (7 distinct SVGs):** all new — a neuron with dendrites, cell body, myelinated axon, nodes and axon endings (named, and lettered A–E for a case question and an MCQ); a vertical section of the brain with cerebrum, corpus callosum, thalamus, hypothalamus, pituitary, pons, medulla oblongata, spinal cord and cerebellum (named, and lettered A–E for the diagram match); a reflex arc from a finger on a hot plate through a spinal-cord section to an arm muscle (named, and lettered A–E for a case question and an MCQ); grey and white matter in the cerebrum and spinal cord compared. Every SVG was rendered and checked by eye.
- **Narration:** 5–44 words per slide (mean 30); no symbols or abbreviations.

## Question bank (67 items, 146 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 25 (keys a 7, b 6, c 6, d 6) |
| numerical | 2 | 2 |
| assertion-reason | 6 | 6 (ICSE option order; keys c b a c a d) |
| true-false | 3 | 3 |
| fill-blank-1 | 2 | 2 |
| short-1 | 11 | 11 |
| short-2 | 5 | 10 |
| short-3 | 4 | 12 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 12 · d2 36 · d3 18 · d4 1.
- **Competency:** recall 10 · understanding 24 · application 22 · analysis 11. Application or higher is **49% of items (67% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (a 7, b 6, c 6, d 6).
- **Test overlap:** the brain match (functions of five parts) sits in the long test with the reflex, puppy and exam cases, not with the head-injury case; MCQs whose options state the direction of impulses or the synapse chemical were kept out of the test carrying the synapse assertion-reason item.
- **Exact-stem duplicate** with ch01 ('Name the part labelled B.') was reworded.
- **Competency balance:** two recall MCQs (thalamus, hypothalamus) were rewritten as application items about a patient (46% → 49% application or higher).
- **Figures:** clipped labels ('Receptor (in skin)', 'Axon endings') and an overlapping white-matter label were fixed after rendering.

## For a reviewer
- The knee-jerk and hand withdrawal are treated as spinal reflexes; blinking, pupil narrowing and sneezing as reflexes with centres in the brain.
- Impulse speeds of about 100 m per second (myelinated) and about 1 m per second (unmyelinated) are typical round values.
- Pairs of nerves given as 12 cranial and 31 spinal.
- The pons is described as connecting parts of the brain and helping to regulate breathing; the thalamus as relaying sensations except smell.
- Catching a dropped ruler is treated as a voluntary action that becomes quicker and more automatic with practice (like an acquired reflex).
- The ruler-test distances are imagined.
