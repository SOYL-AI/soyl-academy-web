# CBSE Class 12 Mathematics — Chapter 11: Three Dimensional Geometry (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026), built to the maths exemplar standard
(`content-templates/exemplars/maths/`). It follows the conventions of the CBSE 12 maths chapters ch01–ch06.
Author: `claude-opus-5-5 (subject-producer)`. Provenance is `origin: "human"`, `model: null`. Every item is `status: "draft"` until it is reviewed.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01 Direction cosines and direction ratios:** the angles a line makes with the axes, l² + m² + n² = 1, direction ratios to direction cosines, a line through two points, and collinearity.
- **t02 Equation of a line:** vector form r = a + λb, through a point or through two points; Cartesian form; rewriting a line in standard form (for example (4 − z)/5 becomes (z − 4)/(−5)); general points; points at a given distance along a line.
- **t03 Angle between two lines:** the cos θ formula with a modulus, the perpendicular and parallel conditions, and finding unknown coefficients.
- **t04 Skew lines and shortest distance:**
  - classifying a pair as intersecting, parallel or skew;
  - the shortest distance between skew lines, written out as |(b₁ × b₂) · (a₂ − a₁)| / |b₁ × b₂|;
  - the distance between parallel lines;
  - the foot of the perpendicular from a point to a line.
- **Removed topic absent:** the plane is not taught or asked anywhere. That covers equations of a plane, angles between a line and a plane, and distances from planes. It appears only in "not in the 2026–27 syllabus" notes: deck 1 exam tips, notes exam tips, notes section 6 and flashcard f30. The scalar triple product notation [a b c] is not used, because it is deleted in ch10; the dot and cross products are written out instead.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Direction cosines and the equation of a line" (t01–t02): 19 slides. Part 2 "Angles between lines and shortest distance" (t03–t04): 19 slides |
| Worked examples | 6 + 5. Part 1: third direction angle, direction cosines from A to B, collinear points, line through a point parallel to a vector, line through two points, standard form first. Part 2: angle 60°, k for perpendicular lines, skew distance √3, parallel distance 2√2/3, intersecting lines meeting at (3, 2, 3) |
| Visuals | 28 of 38 slides; never more than 1 slide in a row without one. Deck: geometry 9, table 15, flow 4. Notes and questions: geometry 4, table 8, flow 1. Geometry figures are oblique 3-D sketches marked `not_to_scale` |
| Check slides | 4 + 4, all objective: m01, m05, m08, tf3 and m11, tf4, m15, m16. None is used in a chapter test |
| Notes | 7 sections, each with key terms, formulas and a visual; exam tips with the mark split and 8 common mistakes |
| Flashcards | 30: definition 3, formula 9, fact 4, example 5, concept 4, exam-tip 3, diagram 2 |
| Questions | 68 items, 129 marks: mcq 18, assertion-reason 6 (keys a b c d a c), true-false 5, fill-blank 5, numerical 7, short-2 9, short-3 8, long-5 6, case-based 4 (each 1 + 1 + 2, with an either/or part (c) via `alternatives`) |
| Difficulty | d1 14, d2 30, d3 21, d4 2, d5 1 |
| Competency | recall 6, understanding 25, application 28, analysis 9. Application or higher is 54% of items and 67% of marks, inside the lint band of 45–65% |
| Topics | t01 21, t02 21, t03 20, t04 20 (an item can carry two topics) |
| Tests | `t_cbse12math_ch11_short` (20 marks / 40 min, 10 items) and `t_cbse12math_ch11_long` (40 marks / 90 min, 22 items). They match `cbse-12-default-chapter-test-short/long` section by section and share no questions |

Case contexts:
- Gurugram interchange girders: skew lines, clearance and the closest points.
- Gangtok ropeway: direction cosines, cable length and a pylon on the line.
- Ahmedabad drone show: crossing paths, the angle between them, and a parallel path.
- Pune lab laser: the beam equation, the foot of the perpendicular from a sensor, and perpendicular beams.

## Verifier record
The chapter is built and checked by these files:
- `src/build.mjs`: decks, notes, flashcards and tests, plus self-checks on every worked example.
- `src/questions.mjs`: the question bank, with an independent re-solve check on every item.
- `src/vec.mjs`: 3-vector arithmetic, LaTeX writers and the oblique-sketch builder.
- `../cbse-12-mathematics-ch01/src/lib.mjs`: the shared builders and validator.

Run it from `platform/` with `npx tsx content/authored/maths/cbse-12-mathematics-ch11/src/build.mjs`.

Checks:
- **Re-solve:** 146/146 checks pass (`src/resolve.log`), and no item relies on a qualitative check alone.
  - Direction cosines, angles (acos), intersections and feet of perpendiculars are recomputed from the givens.
  - Every shortest distance is computed twice: by the vector formula, and independently by minimising the distance between points of the two lines numerically. The two must agree.
  - Option sets are checked by evaluating every option, not just the key. Examples: every candidate point is tested for lying on the line; every candidate k is tested for perpendicularity or parallelism.
- **Generated text:** line equations in stems and models (vector and Cartesian forms, `vtex`/`lineVec`/`cart`) are generated from the same numbers the checks use.
- **Worked examples:** every deck and notes worked example, and the example flashcards, are recomputed in `build.mjs`, and the build stops on any mismatch.
- **KaTeX:** 1296 math strings parse in strict mode. A scan for command words that lost their backslash inside `$…$` (vec, hat, cos, lambda, mu, theta, dfrac, sqrt, times, …) found none.
- **Narration:** 38 slides, at most 74 words, mean 53. It contains no symbols, no letter–digit mixes and no abbreviations; b₁ is spoken as "b one".
- **Chapter lint:** `src/lint.mts` (stage 4) gives 0 errors and 0 warnings.
- **Stage-5 deterministic verify** on this release: 68 questions, 0 flags.
- **Bank duplicates:** 0 within the chapter. Against the whole authored bank (8,054 questions) there are 0 exact and 0 near duplicates.
- **Answer text:** no `solution_md` sentence of 60 or more characters appears in the student-facing text.
- **Rebuild:** a second build gives byte-identical `release.json`, `tests.json` and `resolve.log`.

Fixes made during the pass:
- Lint flags list-style equations such as "4 − 2, 5 + 1, 0 − 3 = 2, 6, −3" as false arithmetic, so these are written as separate equalities.
- Four stems that differed from other items only in their numbers were reworded: fb2, tf1, s305, s306.

Originality:
- All points, lines and contexts are my own.
- Familiar textbook set-ups were deliberately avoided. Examples: the "(x − 5)/7 = (y + 2)/(−5) = z/1 is perpendicular to x/1 = y/2 = z/3" pair, the "perpendicular to both (x − 8)/3 = … and (x − 15)/3 = …" line, the image of (1, 6, 3) in a line, and the textbook values in the "find p for right angles" and angle-between-lines exercises.

## Gaps / follow-ups
- Narration audio is not generated yet (TTS stage).
- Table cells use inline `$…$` maths, so the renderer must support KaTeX in cells.
- 3-D figures are oblique 2-D sketches (x-axis drawn down-left), drawn as `geometry` with `not_to_scale: true`. There is no true 3-D renderer.
- Degree answers in the numerical items are written as "$\theta = 90$ degrees" in solutions, so that the stage-5 `numeric.final` check can find the computed value. The check does not read `^\circ`.
