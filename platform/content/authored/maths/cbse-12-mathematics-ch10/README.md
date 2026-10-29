# CBSE Class 12 Mathematics — Chapter 10: Vector Algebra (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the
CBSE 12 conventions of `cbse-12-mathematics-ch01` (shared authoring library `ch01/src/lib.mjs`, unchanged).
Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are
`status: "draft"` until review.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Vectors and scalars; magnitude, direction, direction cosines and ratios; types (zero, unit, coinitial, collinear, equal, negative); position vectors.
- **t02** Triangle and parallelogram laws, scalar multiplication, components, collinearity, section formula (internal, external, midpoint).
- **t03** Dot product, angle between vectors, perpendicularity, projection, expansions of |a ± b|², work as F · d.
- **t04** Cross product, unit vectors perpendicular to two vectors, areas of parallelograms (from sides and from diagonals) and triangles.
- **Removed topic absent:** the topic listed under `removed_topics` in `catalog/cbse/12/mathematics/syllabus.yaml` is not taught, used or asked anywhere (not even named as deleted).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Vectors, components and the section formula" (t01–t02) 22 slides; Part 2 "Dot product, cross product and their uses" (t03–t04) 22 slides |
| Worked examples | 4 + 5 (direction cosines of 6i − 2j + 3k; collinearity by ratios; vector joining two points and its unit vector; internal and external division; angle with cos θ = −4/9; projection; angle from magnitudes; perpendicular unit vectors; area of a triangle) |
| Visuals | 34 of 44 slides (geometry 12, table 19, flow 3); never more than 1 slide in a row without one. Geometry: a directed segment, triangle and parallelogram laws (with matching parallel marks), position vectors, section formula, projection with right angle at the foot, perpendicular vectors, parallelogram area with its height, collinear arrows, direction angles (sketch, not to scale) |
| Check slides | 4 + 4, all objective (q002, q006, q026, q009; q012, q014, q028, q016); none is used in the tests |
| Notes | 7 sections, each with key terms, formulas and a visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 32 (definition 3, formula 13, concept 4, fact 6, example 1, diagram 2, exam-tip 3) |
| Questions | 70 items, 134 marks: mcq 19, assertion-reason 6 (keys a b d a c d), true-false 5, fill-blank 5, numerical 7, short-2 9, short-3 8, long-5 6, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 16, d2 30, d3 20, d4 4 |
| Competency | recall 5, understanding 28, application 29, analysis 8 — application or higher 53% of items, 68% of marks |
| Topics | t01 22, t02 19, t03 26, t04 17 (items may carry two topics) |
| Tests | `t_cbse12math_ch10_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build and checks: `src/build.mjs` (decks, notes, flashcards, tests; re-derives every worked example and flashcard example and throws on a mismatch), `src/questions.mjs` (bank + re-solve checks), `src/vec.mjs` (independent 3-vector arithmetic). Run from `platform/`:
`npx tsx content/authored/maths/cbse-12-mathematics-ch10/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch10`.

- **Numeric re-solve:** 141/141 checks pass (`src/resolve.log`). Every MCQ key is chosen by comparing independently typed option values (vectors as arrays, surds as `Math.sqrt`) with the value recomputed from the givens; numerical keys, fill-blank keys and the numbers in model answers are recomputed (magnitudes, dot and cross products, angles via `acos`, projections, section points, areas). The two proofs (l05 midpoint theorem, s306 |a| = |b| ⇒ (a + b) ⊥ (a − b)) are checked on the given numbers and, for l05, on a second arbitrary triangle.
- **Errors caught by the re-solve during authoring:** l02(d) first said P divides SR in 2 : 1; the check showed 3 : 1 and the model answer was corrected.
- **Stage-4 lint:** 0 errors, 0 warnings (no competency-band warning). **Stage-5 deterministic verify** (via `ch02/src/verify-local.mts`): 70 questions, 0 flags (n04's solution was reworded so an "=" step computes 120). **Bank duplicates within the chapter** (`ch02/src/originality-local.mts`): 0.
- **KaTeX:** 1389 math strings parse with KaTeX 0.19 in strict "error" mode; a scan of `release.json` finds no `vec`, `hat`, `cos`, `sqrt`, `dfrac`, `cdot`, `times`, `theta`, `pi` and similar commands without their backslash inside `$…$`, and no control characters. All files were written with the editor tool (no shell heredocs).
- **Key-text leak scan:** no solution or model answer repeats a ≥ 60-character sentence of a stem, passage or option (DB-6 rule).
- **Narration:** 44 slides, max 71 words, mean 54; no symbols, digits mixed with letters or letter abbreviations.
- **Determinism:** two rebuilds give byte-identical `release.json`, `tests.json` and `src/resolve.log`.
- **Originality:** all vectors, points and contexts are new. Familiar textbook set-ups were deliberately avoided (for example the right-triangle triple 2i − j + k, i − 3j − 5k, 3i − 4j − 4k, the |a| = 3, |b| = 5, |c| = 7 angle problem and the "find b given a · b and a × b" exercise); case contexts are a Hyderabad medicine drone, a Hooghly ferry, a tent near Manali, a fielder at Eden Gardens and a Darjeeling ropeway.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Geometry labels are plain SVG text (the renderer does not typeset KaTeX in geometry labels), so vectors are labelled `a`, `b`, `a + b` without arrows; the arrowhead on each vector is the renderer's parallel mark (`arrows`), used with matching counts only on genuinely parallel sides.
- The direction-angle figure is a 2-D perspective sketch marked not to scale.
- `table` cells contain inline KaTeX, as in the sibling chapters.
