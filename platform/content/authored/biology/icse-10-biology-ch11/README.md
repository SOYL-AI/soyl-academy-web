# ICSE Class 10 Biology, Chapter 11 — Sense Organs: Eye and Ear

`icse-10-biology-ch11` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (5 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch11_short` (20 marks, 30 min) and `t_icse10bio_ch11_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch11/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE syllabus topics: **structure of the eye** and the functions of its parts (conjunctiva, sclera and cornea, choroid, ciliary body, iris and pupil, lens, aqueous and vitreous humour, retina with rods and cones, yellow spot, blind spot); **stereoscopic vision, adaptation to light and dark, and accommodation**; **defects of the eye** (myopia, hypermetropia, presbyopia, astigmatism, cataract) and their correction, with **ray diagrams only for myopia and hypermetropia** (ray diagrams of other defects are a removed topic and are not drawn or asked); **structure of the ear** (outer, middle and inner ear); **hearing and balance**. The binocular overlap of the two fields of view and the focal length of the lens correcting a myopic far point are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Sense Organs: Eye and Ear; Inside the eye; Parts of the eye and their functions; Quick check: the front window; The retina: rods, cones and two special spots; Quick check: the sharpest spot; Worked example 1: finding your blind spot; Accommodation; Quick check: focusing near and far; Adapting to bright and dim light; Light and dark adaptation; Stereoscopic vision; Worked example 2: how much do the fields overlap?; Quick check: two eyes; Summary; Exam tips. Part 2 (16 slides): Eye Defects, Hearing and Balance; Five eye defects; Myopia and its correction; Quick check: short sight; Hypermetropia and its correction; Quick check: long sight; Worked example 1: choosing a lens; Inside the ear; Parts of the ear and their functions; Quick check: hearing or balance?; How we hear; Quick check: the path of sound; How the ear keeps us balanced; Worked example 2: why we feel dizzy; Summary; Exam tips.
- **Visuals (22 of 32 slides):** flow 3, svg 7, table 12.
- **Diagrams (9 distinct SVGs):** all new — a vertical section of the eye (named, and lettered A–E for the diagram match and a case question); accommodation for distant and near objects; the pupil in bright and dim light; the fields of view of two eyes and their overlap, drawn from the computed angles; ray diagrams for myopia and for hypermetropia, each with its correcting lens; the internal structure of the ear (named, and lettered A–E for a case question and an MCQ). Every SVG was rendered and checked by eye.
- **Narration:** 4–47 words per slide (mean 31); no symbols or abbreviations.

## Question bank (72 items, 153 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 28 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 6 | 6 (ICSE option order; keys a a b c c d) |
| true-false | 3 | 3 |
| short-1 | 12 | 12 |
| short-2 | 5 | 10 |
| short-3 | 5 | 15 |
| numerical | 2 | 2 |
| fill-blank-1 | 2 | 2 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 16 · d2 39 · d3 16 · d4 1.
- **Competency:** recall 15 · understanding 23 · application 25 · analysis 9. Application or higher is **47% of items (64% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (a 7, b 7, c 7, d 7).
- **Test overlap:** the eye match sits in the long test with the myopia, cinema and stereoscopic cases and the ear fill-in; the eye-diagram case is in the short test; the accommodation assertion-reason item was kept out of the test whose case asks how the ciliary body works.
- **Within-chapter duplicate:** a flight-case part repeated the stem of the 3-mark sound-path question and was reworded.
- **Word limits:** the myopia/hypermetropia differences answer was trimmed into the 20–45 word band; one recall term (presbyopia) was removed to keep the bank at 72 items.
- **Figures:** the accommodation ray label was moved off the ciliary-muscle block and the fields-of-view figure was made taller so the head is not clipped.

## For a reviewer
- Accommodation: ciliary muscles contract for near vision (ligaments slacken, lens thicker); relax for distant vision.
- Bright light: circular muscles of the iris contract; dim light: radial muscles contract; visual purple (needs vitamin A) is rebuilt in the dark.
- Field of view taken as about 150° per eye and 180° for both (overlap 120°), round textbook values.
- The myopia items use the rule that a concave lens of focal length equal to the far point corrects distant vision (far point 200 cm, focal length 200 cm, given as a size without sign); no lens-formula calculation for hypermetropia is set.
- Presbyopia is attributed to loss of lens elasticity and weakening of the ciliary muscles; astigmatism to uneven curvature of the cornea, corrected with cylindrical lenses.
- The vestibule is credited with static balance (head position) and the semicircular canals with movement; the organ of Corti is named as the hearing receptor in the cochlea.
