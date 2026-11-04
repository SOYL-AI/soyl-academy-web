# ICSE Class 9 Biology, Chapter 11 — Skeleton: Movement and Locomotion

`icse-9-biology-ch11` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (3 sections), 30 flashcards, 75 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch11_short` (20 marks, 30 min) and `t_icse9bio_ch11_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch11/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX syllabus topics: functions of the human skeleton; axial and appendicular skeleton (classifying named bones); joints, immovable, slightly movable and freely movable (hinge, ball and socket, gliding, pivot) with locations and the movement each allows.
- No removed topics for this chapter. Muscle structure, the sliding filament theory and joint disorders (which belong to Class XI) are not taught.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a lettered-diagram match or fill-in, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a boy hit on the chest by a cricket ball, a giraffe's neck compared with a human neck, a dancer's hip, a carpenter's gate hinge, a plastic model skeleton without hands, a gymnast's joints, a robot arm built from hinge joints only) are written by SOYL and differ from CBSE 11 ch17, ISC 11 ch19 and CBSE 10 Science. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): The Human Skeleton; Functions of the skeleton; Who guards what; Quick check: protecting the brain; Axial and appendicular skeleton; The axial skeleton; The vertebral column; Quick check: an axial bone; Worked example 1: counting the axial skeleton; The appendicular skeleton; Worked example 2: counting the appendicular skeleton; Quick check: a limb bone; Worked example 3: sorting named bones; Summary; Exam tips. Part 2 (15 slides): Joints; Three kinds of joints; Immovable joints; Quick check: joints of the skull; Slightly movable joints; Freely movable joints; Four freely movable joints; Four joints compared; Quick check: the hinge joint; Worked example 1: which joint does the action?; Worked example 2: sorting a list of joints; Quick check: turning the head; Why have different kinds of joints?; Summary; Exam tips.
- **Visuals (22 of 30 slides):** flow 2, table 17, svg 3.
- **Diagrams (6 distinct SVGs):** the human skeleton from the front (named, with the axial skeleton in blue and the appendicular in green; and lettered A-E in one colour so that colour does not give the answer); four freely movable joints with movement arrows (named with locations, and lettered A-D); the vertebral column in five regions (named with counts, and lettered A-E). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (the pelvic girdle label was moved off the hand).
- **Narration:** 4–51 words per slide (mean 34); no symbols or abbreviations.

## Question bank (75 items, 161 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 29 |
| assertion-reason | 4 | 4 |
| short-1 (terms, odd one out, give reason) | 8 | 8 |
| true-false | 4 | 4 |
| fill-blank-5 | 1 | 5 |
| numerical | 5 | 5 |
| match-5 | 1 | 5 |
| short-2 | 10 | 20 |
| short-3 | 7 | 21 |
| long-10 (structured) | 6 | 60 |

- **MCQ deck-check items:** 6 of the mcq items; none is used in a test.
- **Structured questions:** 6, each 10 marks in 4 parts with the part marks in the stem; each has a labelled-diagram part (a rib cage with sternum, a lower limb, the rib cage again for the column question, the joint A, the knee joint, the bones of an upper limb). The diagram part of each question draws something that its other parts do not name, so no part gives away another.
- **Difficulty:** d1 24 · d2 41 · d3 9 · d4 1.
- **Competency:** recall 21 · understanding 17 · application 29 · analysis 7 · evaluation 1. Application or higher is **49% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** d b c a.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; computed values are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test items were chosen so that no item names the answer of another item in the same test. The labelled-diagram part of each structured question was set on a structure not named by its other parts.
- One short answer that fell below its word limit was lengthened; one true-or-false stem that matched an ISC 11 stem word for word was reworded.

## For a reviewer
- **Bone counts** follow the usual textbook totals: 206 bones in an adult, 80 axial and 126 appendicular. The axial total counts the skull (8 cranial and 14 facial), the hyoid (1), the ear bones (6), the vertebral column as 26 bones (24 separate vertebrae, the sacrum and the coccyx), the sternum (1) and 24 ribs. Some books leave out the hyoid and the ear bones (giving 73 axial bones) or count the column differently; the chapter says "about" in the notes.
- **Vertebral column:** 33 vertebrae in a child (7 cervical, 12 thoracic, 5 lumbar, 5 sacral and 4 coccygeal) and 26 bones in an adult after the sacral and coccygeal vertebrae fuse.
- **Ribs:** 12 pairs; the classification into true (7 pairs), false (3 pairs) and floating (2 pairs) is given in the notes only, as extra detail.
- **Upper and lower limb counts:** 30 bones each (humerus, radius, ulna, 8 carpals, 5 metacarpals, 14 phalanges; femur, patella, tibia, fibula, 7 tarsals, 5 metatarsals, 14 phalanges).
- **Joints:** hinge (elbow, knee, fingers), ball and socket (shoulder, hip), pivot (atlas on axis), gliding (wrist, ankle). Books vary on the ankle (some call the ankle proper a hinge joint) and on the joint between the radius and ulna (pivot); only the common examples are used. Saddle and condyloid joints are not taught.
- All counts in the questions are standard facts; the model-skeleton item and the joint tally are imagined set-ups. The drawings are schematic and not to scale.
