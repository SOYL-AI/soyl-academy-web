# ICSE Class 9 Physics, Chapter 9 — Spherical Mirrors

`icse-9-physics-ch09` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 14 slides), notes (5 sections), 30 flashcards, 74 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch09_short` (20 marks, 30 min) and `t_icse9phy_ch09_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions and no deck-check item is used in a test. Section A items were chosen so that they do not state the answers of the Section B questions (for example the short test has no terms or real-image numerical in Section A, and the long test has no item on the images of a concave mirror at C and F, the convex mirror image or the table numerical in Section A). |
| `src/` | `calc.mjs` (every computed value, asserted), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. The shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (imported, not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch09/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: concave and convex mirrors with pole, centre and radius of curvature, principal axis, focus, focal length and f = R/2; paths of the specific rays (parallel to the axis, through the focus, through the centre of curvature, parallel rays meeting on the focal plane); images by a concave mirror for an object at infinity, beyond C, at C, between C and F, at F and within F (simple ray diagrams); the image in a convex mirror and the uses of concave and convex mirrors; the Cartesian sign convention, 1/v + 1/u = 1/f and magnification, with direct numericals.
- **Removed topics (not taught, not asked):** the derivation of the mirror formula and f = R/2, and scale drawing or graphical representation of ray diagrams. f = R/2 and the mirror formula are used as given. Every ray diagram is a qualitative sketch, with the object and image positions fixed by the formula only so that the sketch is consistent; no item asks the student to draw to scale or to measure from a diagram.
- **Overlap handled:** the same ray optics is met again in CBSE 10 Science (light) and in CBSE 12 and ISC 12 Physics. The stems here use different situations (a shaving mirror and pimple, a dentist's mirror, a torch, a rear-view mirror and van, a shop security mirror, a candle flame, a pencil, a pin) and different numbers; those banks were read and not reused.
- **Calculation chapter:** 13 numerical items, plus numerical MCQs, calculation short answers and structured questions (focal length from R, image distance and magnification for concave and convex mirrors, object distance from the image, image height, focal length from the magnification).
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): "state", "define", "give a reason", ray-diagram and graph-reading style items, numericals showing sign convention, formula, substitution and unit, assertion-reason items in the specimen option order, 10-mark structured questions in parts.

## Shape
- **Decks:** Part 1 (18 slides): Mirrors that curve; The parts of a spherical mirror; Concave and convex, f = R/2; Worked example 1: f from R; Quick check: focal length; Specific rays; A parallel beam at an angle; Quick check: the specific rays; Object beyond C; At C; Between C and F; At F; Between F and P; All the cases in one table; Worked example 2: where is the object?; Quick check: object at C; Summary; Exam tips. Part 2 (14 slides): The mirror that sees more; The image in a convex mirror; Why a convex mirror cannot give a real image; Quick check: the convex mirror; Uses; The Cartesian sign convention; Signs for the two mirrors; The mirror formula and magnification; Worked example 1: a concave mirror; Quick check: the sign of u; Worked example 2: a convex mirror; Quick check: using the formula; Summary; Exam tips.
- **Visuals (32 of 32 slides):** flow 2, table 20, svg 10.
- **Diagrams (12 distinct SVGs), all computed:** a concave mirror with its terms (plain and lettered A to E); parallel rays to a concave and a convex mirror; a parallel beam at a small angle meeting on the focal plane; ray diagrams for a concave mirror with the object beyond C, at C, between C and F, at F and between F and P (the last two without a real image), the C-to-F case also lettered A to E; a convex mirror ray diagram; the sign convention. The mirror is drawn as an arc of radius R = 2f; the rays follow the standard rules and the build checks that the drawn reflected rays meet where 1/v + 1/u = 1/f puts the image (it throws if they are more than a few pixels apart). Rendered to PNG and checked by eye.
- **Narration:** 13–43 words per slide (mean 33); no symbols, formulae, digits or unit abbreviations.

## Question bank (74 items, 153 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 (6 are deck-check items) | 29 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 3 | 3 |
| true-false | 4 | 4 |
| fill-blank | 1 (blanks: 4) | 4 |
| numerical | 13 | 13 |
| match-5 | 1 | 5 |
| short-2 | 8 | 16 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 5 to 6 parts with part marks in the stem; two have lettered A to E figures (the terms of a concave mirror, and a concave-mirror ray diagram for an object between C and F), one has a convex mirror figure; four are numerical (concave real image, shaving mirror with a virtual image, convex mirror, a data-style question on a concave mirror).
- **Difficulty:** d1 25 · d2 26 · d3 22 · d4 1 (num-focal: the focal length from a magnification of −2).
- **Competency:** recall 21 · understanding 18 · application 30 · analysis 5. Application or higher is **47% of items**, inside the 45–65% lint band. No tag was changed; the band was reached by adding numerical items (num-focal, num-same).
- **Assertion-reason keys:** c a b d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every focal length, image distance, magnification and image height is computed and asserted in `calc.mjs`; numericals carry scripted re-solve checks. Image distances for the concave-mirror cases (f = −10 cm: −15, −20, −30, infinity, +10 cm) were checked against the ray diagrams.

## For a reviewer
- **Sign convention:** the "New Cartesian" convention as in ICSE books: the pole is the origin, light travels left to right, distances against the incident light are negative, heights above the axis positive; concave f and R negative, convex positive; u negative for a real object; v negative for a real image of a concave mirror and positive for a virtual image. Magnification m = h′/h = −v/u (negative for an inverted image). The notes and every solution use this form; no item uses the older "real is positive" convention.
- **Object at infinity** is treated as an extra row (image at F) in the notes and the table slide; the syllabus lists five finite positions plus the infinite case in the specific-ray topic, and both are covered.
- **Diagrams are sketches:** distances in the figures follow the formula (f = 90 px for the concave cases, 70 px for the convex one), but no item or slide invites measuring from them. The word "aperture" appears once, as a label on the terms figure; it is not examined.
- **Dentist's, shaving and headlight uses** are standard textbook uses; solar cookers are named as a use of the focusing property only.
- **Approximations:** the paraxial rules are used throughout (small aperture); spherical aberration is not mentioned.
- **Numericals:** answers carry their signs and units (for example −18 cm, +15 cm); the numeric tolerance allows 0.1 cm for decimal answers (−13.3, −22.5).
