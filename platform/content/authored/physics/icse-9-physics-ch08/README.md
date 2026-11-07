# ICSE Class 9 Physics, Chapter 8 — Reflection of Light at Plane Mirrors

`icse-9-physics-ch08` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (3 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch08_short` (20 marks, 30 min) and `t_icse9phy_ch08_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions and no deck-check item is used in a test. Section A items were chosen so that they do not state the answers of the Section B questions (the short test has no item on the laws or the periscope in Section A; the long test has none on the image distances, parallel mirrors or inclined-mirror counts). |
| `src/` | `calc.mjs` (every computed value and the ray geometry, asserted), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. The shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (imported, not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch08/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX syllabus topics of the chapter: laws of reflection and their experimental (pin) verification; characteristics of the image in a plane mirror (virtual, erect, same size, same distance, lateral inversion), the ray diagram for a point object, and uses of plane mirrors; images in a pair of mirrors, with multiple images in two parallel mirrors (brightness falls) and the number of images n = 360 ÷ θ − 1 for inclined mirrors with its cases.
- No removed topics for this chapter. Inclined mirrors go beyond the syllabus wording ("images in a pair of mirrors") only as far as the brief asked: the formula and the odd and even cases.
- **Overlap handled:** ray optics with spherical mirrors and lenses belongs to ch09 and to CBSE 10 Science, CBSE 12 and ISC 12 Physics; this chapter uses only plane mirrors. No situation or number from CBSE 10 Science (light) is reused.
- **Calculation chapter:** 12 numerical items, plus numerical MCQs, calculation short answers and structured parts (angles from the normal, image distances, speed of approach, parallel-mirror distances, image counts).
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): "state", "define", "give a reason", ray and pin-experiment items, assertion-reason items in the specimen option order, 10-mark structured questions in parts.
- **Originality:** situations are the writer's own (a girl or boy walking to a mirror, a toy moved away, a flower pot, a wall clock reading 8:20, ambulance lettering, a periscope, a kaleidoscope with mirrors at 60°). Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): How does a mirror turn light around?; Words we need; The two laws of reflection; Quick check: the first law; Verifying the laws with pins; What the readings show; Worked example 1: angles at a mirror; Quick check: angle with the mirror; The image of a point; Characteristics of the image; Quick check: the image; Lateral inversion; Worked example 2: distances to the image; Uses of plane mirrors; Summary; Exam tips. Part 2 (15 slides): Why do two mirrors give many images?; Two parallel plane mirrors; Finding the positions by reflection; Why the images become fainter; Quick check: parallel mirrors; Worked example 1: distances in parallel mirrors; Two mirrors at an angle; The number of images; Worked example 2: counting images; A picture for 60 degrees; Quick check: counting images; Limits of the formula; Quick check: why fainter?; Summary; Exam tips.
- **Visuals (31 of 31 slides):** flow 2, table 21, svg 8.
- **Diagrams (12 distinct SVGs), all computed:** a ray reflected at a mirror (plain and lettered A to E); the pin experiment (top view, with P3 and P4 on the reflected ray and the images of P1 and P2 behind the mirror); the image of a point from two rays; lateral inversion; an object between parallel mirrors (images drawn, and a plain version with distances for a question); inclined mirrors at 90° (plain and with letters P, Q, R) and at 60°, with every image on the circle through the object; a periscope (plain and lettered A to E). The build checks that each drawn ray obeys i = r (it throws otherwise), that the periscope mirrors are at 45°, and that the number of images found by repeated reflection equals 360 ÷ θ − 1 (and the odd-case rule) for θ = 30, 36, 40, 45, 60, 72, 90, 120 and 180 degrees, with the object on and off the bisector. Rendered to PNG and checked by eye; overlaps and clipping fixed.
- **Narration:** 11–44 words per slide (mean 33); no symbols, formulae, digits or unit abbreviations.

## Question bank (69 items, 150 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 (6 are deck-check items) | 24 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 3 | 3 |
| true-false | 3 | 3 |
| fill-blank | 1 (blanks: 3) | 3 |
| numerical | 12 | 12 |
| match-5 | 1 | 5 |
| short-2 | 9 | 18 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 to 5 parts with part marks in the stem; three have lettered figures (rays at a mirror with A to E, two mirrors at 90° with images P, Q, R, a periscope with A to E), one has a pin-experiment table and one a figure with distances.
- **Difficulty:** d1 19 · d2 30 · d3 19 · d4 1 (pm-mcq8, two mirrors at 40° with the object off the bisector).
- **Competency:** recall 16 · understanding 14 · application 31 · analysis 8. Application or higher is **57% of items**, inside the 45–65% lint band. No tag was changed.
- **Assertion-reason keys:** a c b d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; all angles, distances, speeds and image counts are computed and asserted; numericals carry scripted re-solve checks.

## For a reviewer
- **Angles:** every angle is measured from the normal; items that give the angle with the mirror are written so that the student must convert (90° minus the angle).
- **n = 360 ÷ θ − 1 and its cases:** the notes and items use: even 360 ÷ θ gives 360 ÷ θ − 1 for any position of the object; odd 360 ÷ θ gives 360 ÷ θ − 1 for an object on the bisector and 360 ÷ θ otherwise. This is the common ICSE textbook rule and was confirmed by computing the images by repeated reflection for nine angles. Books differ in how much of this they teach, and the syllabus names only parallel mirrors explicitly; if the reviewer wants to restrict Class 9 to even quotients, drop pm-mcq4, pm-mcq8, pm-short3b, num-off and the odd-case parts of long-incl (d).
- **Non-integer 360 ÷ θ** is not used anywhere.
- **Parallel mirrors:** distances in the examples (mirrors 40 cm apart, object 10 cm from M1) are computed by repeated reflection: images at 10 cm (I1) and 30 cm (I2) behind the mirrors, I3 70 cm behind M1, I4 50 cm behind M2. The infinite number of images is "in principle"; real mirrors show only a few.
- **Brightness:** attributed to light absorbed or scattered at each reflection, not to distance.
- **Clock in a mirror:** the rule "mirror reading = 12:00 − actual time" is stated in the notes and used in one MCQ.
- **Speed of approach:** a person approaching a mirror at s has an image approaching the person at 2s (the image also moves at s towards the mirror); stated in the notes.
- **Pin experiment:** P3 and P4 are placed in line with the images of P1 and P2; this is the standard description. The data table of the structured question is illustrative.
