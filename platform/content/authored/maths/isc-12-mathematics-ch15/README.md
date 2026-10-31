# ISC Class 12 Mathematics — Chapter 15: Three-Dimensional Geometry: Planes (authored, v1)

Hand-authored production chapter (D-025, D-026). Author: `claude-opus-5-5 (subject-producer)`; provenance `origin: "human"`, `model: null`. Every item is `status: "draft"` until review.

The chapter is built with the shared ISC 12 maths lib, `isc-12-mathematics-ch01/src/lib.mjs`, which was not edited here. `src/vec.mjs` is a copy of the ch14 3-D vector helpers with plane helpers added for this chapter: `onPlane`, `distPlane`, `footPlane`, `meetPlane`, `samePlane`, `planeThrough`, `anglePlanes`, `angleLinePlane`, `distParallel`, `planeTex` and `planeVec`.

## Scope (ISC 2027, Unit 5, planes)

- **t01** Vector and Cartesian equations of a plane through a point with a given normal; reading the direction ratios of the normal; the plane through three points; parallel planes and planes through the origin.
- **t02** One-point, intercept and normal forms. In normal form $p \ge 0$, so the equation is divided by $-|\vec{n}|$ when the constant is negative. Special planes ($x = k$, a missing variable).
- **t03** Distance of a point from a plane (Cartesian and vector forms) and between parallel planes. The coefficients must be made equal first. Foot of the perpendicular and image of a point.
- **t04** The point where a line meets a plane; a line parallel to or lying in a plane; the angle between two planes (cosine of the normals) and between a line and a plane (sine).
- Lines on their own are ch14; this chapter only uses a line's general point and direction.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 (t01–t02) has 19 slides; Part 2 (t03–t04) has 19 slides |
| Visuals | All 38 slides carry one: 8 oblique 3-D sketches (`geom`, captioned "not to scale"), 24 tables and 6 flows |
| Worked examples | Part 1 has 4, Part 2 has 5. Each is recomputed and asserted in `build.mjs`: plane $2x + y - 2z = -6$; three points giving $x + z = 2$; intercepts $4, -10, 2$; normal form with $p = 3$; distance $2$; parallel planes $3$ apart; meeting point $(7, 2, -1)$; planes at $60^\circ$; line and plane at $30^\circ$ |
| Check slides | Part 1: q003, q005, q036, q010. Part 2: q015, q038, q021, q034. None is used in a test |
| Notes | 6 sections, each with key terms, a formula and visuals, plus exam tips (mark split and common mistakes) |
| Flashcards | 30 |
| Questions | 67 items worth 120 marks |

| Question type | Count |
|---|---|
| mcq | 26 (keys a7 b7 c6 d6 after the lib's rotation) |
| assertion-reason | 5 (keys a a a c d) |
| true-false | 3 |
| fill-blank | 3 |
| numerical | 5 |
| short, 2 marks | 9 |
| short, 3 marks | 10 |
| long, 5 marks (in parts) | 6 |

- **Difficulty:** d1 12, d2 30, d3 20, d4 5.
- **Competency:** recall 5, understanding 26, application 24, analysis 12. That puts 54% of items and 68% of marks at application or above.
- **Topics:** t01 18, t02 17, t03 17, t04 24 (some items carry two topics).

## Tests (`isc-12-default` blueprints, via `chapterTests()`)

- **Short** `t_isc12math_ch15_short`, 20 marks in 50 minutes:
  - A: m01, m07, m13, m17, ar1
  - B: s201, then s203 or s204
  - C: s301, then s304 or s306
  - D: l02
- **Long** `t_isc12math_ch15_long`, 40 marks in 100 minutes:
  - A: m02, m04, m08, m09, m11, m14, m16, m18, m19, m22, ar3, ar5
  - B: s202, s205, then s207 or s208
  - C: s302, s303, s305, then s307 or s309
  - D: l03, then l01 or l04
- The two tests share no item and use no deck-check item.

## Verifier record

Run from `platform/`: `npx tsx content/authored/maths/isc-12-mathematics-ch15/src/build.mjs`.

- **Re-solve:** 102/102 checks pass. Every point, normal and line in a stem is a constant in `questions.mjs`, and every printed answer is generated from it with `vec.mjs`, then checked a second way:
  - points are substituted into planes;
  - normals are tested perpendicular to two in-plane vectors;
  - distances by formula are compared with the length of the perpendicular found by projection (the foot is checked on the plane);
  - meeting points are substituted into both the line and the plane;
  - "same plane" answers are tested by proportional normals plus a shared point;
  - MCQ options are evaluated independently so that exactly one matches.
- **KaTeX:** 1,048 maths strings parse in strict mode.
- **Pipeline checks:** stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks 0 flags.
- **Narration:** at most 72 words a slide (mean 44), no symbols.
- **Originality:** the lib's exact-stem pre-check passes. A separate near-duplicate scan using the originality gate's rule (word 5-gram Jaccard ≥ 0.7, maths stripped) over 14,007 stems in the repo found 0 exact and 0 near pairs. All set-ups are SOYL's own (roof sheets, solar rows, glass walls, canopies, drone no-fly sheets, a double-glazed window). The well-known textbook pair (line through $(-1, 0, 3)$ with ratios $2, 3, 6$ against $10x + 2y - 11z = 3$) was deliberately not used.

## For a reviewer

- **Normal form:** `m10` treats $p < 0$ as not allowed, so option (b) describes the same plane but is not in normal form.
- **`ar2`:** keyed (a). R is the parallel-planes formula with equal coefficients, and the solution rewrites the second plane before applying it.
- **`ar4`:** keyed (c). A is true; R ("$p$ may be negative") is false.
- **`s302`:** the centroid-of-intercept-triangle set-up is a standard question type; the numbers $(2, -1, 3)$ are our own.
- **Rendering:** nobody has seen the 3-D sketch labels rendered, so they need a look at 360 px on staging.
