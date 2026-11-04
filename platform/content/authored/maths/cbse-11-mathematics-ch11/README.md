# CBSE Class 11 Mathematics — Chapter 11: Introduction to Three-dimensional Geometry (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026, D-050) in the structure of the CBSE 12 Mathematics chapters. Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` (builders, re-solve harness, validator, CBSE 11 chapter-test layout), `src/lint.mts` and `src/gp.mjs` (exact BigInt rationals, copy of the ICSE 10 ch10 module) are unchanged shared copies. The lib stamps its own author string; `build.mjs` rewrites it to this chapter's author after the build. `src/space.mjs` holds the chapter's exact arithmetic and the oblique 3-D sketch helper; `src/visuals.mjs` the figures and tables.

## Scope (2026-27 syllabus, 041)
- **t01** Coordinate axes and planes; coordinates of a point; octants, with feet of perpendiculars, images and distances from planes and axes.
- **t02** Distance between two points (from the origin too), with collinearity, triangle types, parallelogram/square tests, equidistant points and the locus `x + y - z = 3`, and the sphere equation as a light extension.
- **t03** Section formula, `board_assessed: false` (formative assessment only): taught in deck 2 (3 slides) and the last notes section, limited to the internal section formula, mid-point, centroid and the ratio in which a coordinate plane cuts a segment; 16 of 69 items carry t03, mostly objective or short. Stated in the slides and notes as "not assessed in the board paper".
- Subject-level removed topics (Mathematical Induction, Mathematical Reasoning) do not appear. External division is not covered.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Axes, planes, coordinates and octants" 15 slides; Part 2 "Distance and the section formula" 17 slides |
| Worked examples | 3 + 6 (where points lie; octants; feet, images, distances; a distance with a surd; collinear test; right-angled triangle; equidistant point; dividing a segment; plane cutting a segment) |
| Visuals | 11 of 15 and 13 of 17 slides (3-D sketches, tables, flow); max 1 slide in a row without one. Notes: 8 sections each with a visual |
| Check slides | 3 + 3, all objective (m15, tf4, fb1; fb4, tf2, m16), none used in the tests |
| Notes | 8 sections (axes and planes; coordinates; octants; feet, images, distances; distance; using distances; section formula; choosing a method), key terms, formulas, exam tips with mark split and 7 common mistakes |
| Flashcards | 30 (formula 9, fact 9, exam-tip 6, concept 4, definition 2) |
| Questions | 69 items, 134 marks: mcq 18, assertion-reason 6 (keys a d c b a d), true-false 5, fill-blank 5, numerical 7, short-2 9, short-3 8, long-5 7, case-based 4 (each 1 + 1 + 2 with an either/or part (c)) |
| Difficulty | d1 6, d2 27, d3 30, d4 6 |
| Competency | recall 6, understanding 24, application 34, analysis 5: application or higher 57 % of items (72 % of marks) |
| Topics | t01 31 items, t02 31, t03 16 |
| Tests | `t_cbse11math_ch11_short` (20 marks / 40 min: A m04 m06 m11 ar2; B s204 s205 s304; C l03 or l06; D c02) and `_long` (40 marks / 90 min: A m01 m03 m05 m08 m10 m12 m13 m14 + ar3 ar4; B s201 s207 [s208 s209] s301 [s303 s307]; C l01 [l04 l07]; D c01 c04), on `cbse-11-default-chapter-test-short/-long`; disjoint, no deck-check item used |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-ch11/src/build.mjs` (prints stats and `NO ERRORS`; rebuilt twice, md5 of `release.json` and `tests.json` identical).
Lint: `npx tsx content/authored/maths/cbse-11-mathematics-ch11/src/lint.mts content/authored/maths/cbse-11-mathematics-ch11` → 0 errors, 0 warnings. `verify-local.mts`: 69 questions, 0 flags. `dblslash.cjs`: total 0. `npm run content -- originality --authored`: this unit 0 errors.

- **Re-solve:** 155/155 checks pass (`src/resolve.log`). Every octant, position, foot, image, distance (squared integers, simplified surds, cross-checked with `Math.hypot`), collinearity (cross product and the exact test `4ab = (c - a - b)^2`), triangle type, section point (checked by the squared-distance ratio and the vector identity), centroid (also divided on the median 2 : 1), plane-cutting ratio and equidistant point is computed in `space.mjs`; feet on axes are checked by minimising the distance over a grid. The locus `x + y - z = 3` is tested on 1,728 integer points and the sphere expansion on 1,859.
- **Figures:** oblique 3-D sketches (marked `not_to_scale`) built from real coordinates; every "(a, b, c)" label is parsed and compared with the drawn point, and distance and triangle figures are asserted (`AC^2 + CB^2 = AB^2`, `9 + 17 = 26`, `P = (1, 0, 3)`).
- **KaTeX / narration:** all maths parses in strict mode; no lost backslashes; narration is symbol-free, in words, at most 90 words.
- **Originality:** CBSE 12 ch11 and ISC 12 vector chapter points (e.g. `(1,2,3)`, `(2,3,-4)`, `(1,-2,3)`) and the ICSE 10 ch12 / CBSE 10 ch07 stems were read and avoided; three duplicate stems found by the gate were reworded.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Octants are drawn in an oblique projection; hidden edges are not distinguished from visible ones.
- External division, direction cosines and lines (CBSE 12) are outside this chapter.
