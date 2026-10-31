# ISC Class 12 Mathematics — Chapter 13: Vector Algebra (authored, v1)

This is a hand-authored production chapter (D-025, D-026), written to the standard of the ISC 12 maths chapters ch01–ch12. Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

The builders come from the shared ISC 12 lib `isc-12-mathematics-ch01/src/lib.mjs`, which is imported and not edited here. The vector arithmetic for the re-solve checks is in `src/vec.mjs`, a copy of the CBSE 12 ch10 helpers with a LaTeX formatter added.

## Scope (ISC 2027, Unit 4)

- **t01** Vectors as directed segments; magnitude, unit vectors, direction cosines and ratios ($l^2 + m^2 + n^2 = 1$); zero, unit, equal, negative and collinear vectors.
- **t02** Position vectors, $\overrightarrow{AB} = \vec{b} - \vec{a}$, components, sum, difference and scalar multiples; triangle and parallelogram laws.
- **t03** Section formula, internal and external; midpoint and centroid; collinear points and the ratio of division.
- **t04** Scalar product: definition, components, properties, angle, perpendicularity, $|\vec{a} \pm \vec{b}|^2$, and scalar and vector projections.
- **t05** Vector product: definition, determinant form, right-hand rule, unit vectors perpendicular to two vectors, and areas of the triangle and parallelogram (also from diagonals). It also covers collinearity by $\vec{a} \times \vec{b} = \vec{0}$ and the identity $|\vec{a} \times \vec{b}|^2 + (\vec{a} \cdot \vec{b})^2 = |\vec{a}|^2|\vec{b}|^2$.
- **Removed topic:** proofs of geometrical theorems using vector algebra are on the ISC removed list. They are neither taught nor asked.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Vectors, components and the section formula" (t01–t03), 19 slides; Part 2 "Scalar and vector products" (t04–t05), 18 slides |
| Worked examples | 4 + 4, each recomputed and asserted in `build.mjs`: magnitudes and unit vectors; a vector joining two points; internal and external division in $2 : 3$; collinear points and their ratio; the angle between two vectors; scalar and vector projections; a cross product; the area of a triangle |
| Visuals | 29 of 37 slides carry one (6 geometry figures: directed segment, triangle law, position vectors, section formula, projection, parallelogram area; 21 tables; 2 flows). No two consecutive slides lack a visual. |
| Check slides | 4 + 4 on objective items used in neither test: m05, m08, m11, n02; m15, m25, tf2, n06 |
| Notes | 6 sections, each with key terms, formulas and visuals; exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 72 items worth 125 marks. mcq 28 (keys a7 b7 c7 d7), assertion-reason 6 (keys d a a c a c), true-false 4, fill-blank 3, numerical 6, short-2 9, short-3 10, long-5 6 (each set in parts, 2 + 3 or 3 + 2) |
| Difficulty | d1 17, d2 34, d3 17, d4 4 |
| Competency | recall 3, understanding 29, application 30, analysis 10. Application or higher is 56% of items and 69% of marks (lint band 45–65%). |
| Tests | Both built by `chapterTests()` on the `isc-12-default` blueprints, sharing no items (see below) |

**Tests:**
- **`t_isc12math_ch13_short`** (20 marks / 50 min):
  - A: m03 m09 m16 m23 ar3
  - B: s201, (s204 | s206)
  - C: s303, (s305 | s307)
  - D: l01
- **`t_isc12math_ch13_long`** (40 marks / 100 min):
  - A: m02 m07 m12 m13 m18 m19 m21 m22 m24 m26 ar1 ar4
  - B: s202 s203, (s205 | s207)
  - C: s301 s304 s306, (s308 | s309)
  - D: l02, (l03 | l04)

## Verifier record

- **Re-solve:** 116/116 checks pass (`src/resolve.log`, gitignored).
  - **How:** every key, MCQ option, numerical value and model-answer vector is recomputed from the givens with `src/vec.mjs`. MCQ distractors are evaluated so that exactly one option matches.
  - **Section points:** checked both ways, by the formula and by re-dividing the segment.
  - **Perpendicular vectors and areas:** perpendicular vectors are checked by zero dot products. Areas are checked by half the cross product, and the altitude in `l04` independently from the foot of the perpendicular.
- **Build gates:** the pipeline lint reports 0 errors and 0 warnings, and the stage-5 deterministic checks raise 0 flags. All maths strings parse with KaTeX in strict mode.
- **Duplicate checks:**
  - The lib's exact-stem pre-check is clean. It caught one collision on the first build: `tf1` had the same prose as a CBSE 12 ch10 item once maths was stripped, so it was reworded.
  - A 5-gram Jaccard scan (the originality gate's rule, threshold 0.7) over 13,228 stems finds 0 pairs involving this chapter.
- **Narration:** at most 60 words per slide (mean 42). It contains no symbols, digits mixed with letters, or letter abbreviations, so segment names are said in words.

## For a reviewer

- `ar5` (no point divides a segment externally in $1 : 1$) is keyed (a).
- `m19` and `m24` give only magnitudes and a dot product. Their checks build sample vectors with that angle.
- `s206` has a fractional answer, $\lambda = \tfrac45$.
- `l03(a)` leaves the angle as $\cos^{-1}(-\tfrac{4}{21})$.
- `l04(b)` has an altitude of $\sqrt{61/5}$ m.
- `n05` uses work done ($\vec{F} \cdot \vec{d}$) as an application of the scalar product. The formula is stated in the stem.
- **Scenarios:** all contexts and numbers are our own (kite string, survey drone, Ladakh tent, Shillong footbridge, metro stations, robotics lab). Familiar textbook data such as $|\vec{a}| = 3, |\vec{b}| = 5, |\vec{c}| = 7$ was deliberately avoided; `s306` uses $5, 8, 7$.
- **Rendering:** nobody has seen the geometry figures and wide tables rendered at 360 px, so they need a look on staging.
