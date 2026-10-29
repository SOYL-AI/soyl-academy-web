# CBSE Class 12 Mathematics — Chapter 8: Application of Integrals (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the structure of the
CBSE 10 maths chapters. Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`.
All items are `status: "draft"` until review. Shared builders come from `../cbse-12-mathematics-ch01/src/lib.mjs`.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Area under simple curves: area as a sum of vertical strips; curves below the axis and curves crossing it (split at the crossing, add absolute values); horizontal strips for regions beside the y-axis; parabolas in standard form (x² = ky, y² = kx) cut off by a line parallel to an axis; circles x² + y² = a² (area πa², pieces cut off by x = h); ellipses x²/a² + y²/b² = 1 (area πab, strips, standard-form conversion such as 9x² + 25y² = 225); lines including |x − c|; symmetry factors 2 and 4.
- **Removed topic absent:** the area between two curves is not taught or required anywhere. Every region is bounded by ONE curve together with the axes or lines parallel to them; it is named only as deleted (deck 1 exam tips, notes section 7, flashcard f26).
- Curves are kept to the syllabus list (lines, parabolas, circles, ellipses in standard form); no trigonometric, exponential or cubic area questions.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Areas under lines and parabolas" 19 slides; Part 2 "Areas of circles and ellipses" 17 slides |
| Worked examples | 5 + 4 (line y = 2x + 1 with a trapezium check; x² = 3y; the crossing line y = 2x − 4 (0 vs 8); y² = 9x cut by x = 4; horizontal strips beside y = x²; circle r = 6; ellipse 7 × 4; piece of x² + y² = 16 right of x = 2; strip of x²/16 + y²/9 = 1) |
| Visuals | 36 of 36 slides (geometry 15 shaded-region figures, table 10, plot 10, flow 1); notes: 7 sections, each with a visual (plus 4 extra) |
| Check slides | 4 + 4, all objective (q002, q001, q005, q025; q006, q008, q014, q028); none used in the tests |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (formula 7, example 6, concept 5, exam-tip 4, fact 3, diagram 3, definition 2) |
| Questions | 65 items, 123 marks: mcq 18, assertion-reason 6 (keys d a b c a d), true-false 5, fill-blank 5, numerical 6, short-2 8, short-3 7, long-5 6, case-based 4 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 6, d2 28, d3 24, d4 6, d5 1 |
| Competency | recall 2, understanding 30, application 24, analysis 8, evaluation 1 — application or higher 51% of items, 67% of marks (lint band 45–65%) |
| Tests | `t_cbse12math_ch08_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests, worked-example self-checks), `src/questions.mjs` (bank + one independent
re-solve check per item), `src/area.mjs` (composite Simpson integrator with n = 200000 panels, and the shaded-region geometry builder).
Run from `platform/`: `npx tsx content/authored/maths/cbse-12-mathematics-ch08/src/build.mjs`; lint this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch08`.

- **Numeric re-solve:** 123/123 checks pass (`src/resolve.log`). Every area is recomputed by Simpson's rule on the stated curve (|f| for regions below or across the axis) and compared with the exact key (e.g. 12π − 9√3, 8π/3 − 2√3, 24/5 + 10 sin⁻¹(3/5), ∛54 for the equal-area cut); MCQ options are typed as numbers independently of their text and exactly one must match; the πab proof is spot-checked on three ellipses.
- **Worked examples:** every deck and notes example (and the two flashcard facts f11, f22/f27) is recomputed in `build.mjs`; the build stops if any disagrees.
- **Figures:** the 15 shaded-region geometry figures are generated from the curve itself (polygon vertices sampled on the curve, so the shading is exact to drawing accuracy) and refuse to build if a point leaves the canvas; 25 marked plot points lie on their curves and match their labels.
- **KaTeX:** 1082 math strings parse with KaTeX in strict "error" mode; a separate scan found no maths command that lost its backslash (pi, int, sqrt, sin, dfrac, le, ge …) and no control characters.
- **Narration:** 36 slides, max 70 words, mean 55; no symbols, digit-letter mixes or letter abbreviations.
- **Chapter-local gates:** stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks 0 flags on 65 questions; bank near-duplicate scan against all 108 authored releases (8122 questions) 0 flags (after rewording s201, which first matched m09 once the maths was stripped); no solution sentence of 60+ characters repeats student-facing text; release and both tests parse with the shared zod schemas.
- **Rebuild is deterministic** (identical checksums for `release.json`, `tests.json`, `resolve.log`).
- **Originality:** all numbers and contexts are new (y² = 9x with x = 4, x² = 3y, y² = 6x with an equal-area cut, x² = 2y by two slicings, circles of radius 4, 6 and 8 with cuts at x = 2, 3, 4, ellipses 7 × 4, 6 × 4, 4 × 3, 4 × 2, 10 × 7, 20 × 15; a Mysuru elliptical lawn, a Jaipur parabolic gateway, a Kolkata puja stage, a Ludhiana canal-side field). The textbook's signature set-ups (x²/9 + y²/4 = 1, y² = 4x with x = 4, x² = 4y between y = 1 and 4) were deliberately avoided.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Shaded regions are `geometry` figures (polygons with `highlight: 'shade'`, curves as many short segments, unlabelled helper points); plots cannot shade, so a plot sits beside a geometry figure where both help.
- `table` cells use `$…$` maths (including `\displaystyle\int`); renderers must support inline KaTeX in cells.
- Four plots use the v2 `vlines` field for the ordinates and three use a function `domain` to stop a half-curve at its end points.
