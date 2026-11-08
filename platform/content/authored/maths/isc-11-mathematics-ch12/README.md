# ISC Class 11 Mathematics - Chapter 12: Circles (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 3: Coordinate Geometry.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib with one change from the copy used in Chapters 1-10: the assertion-reason options use the exact wording of the ISC 2027 Mathematics (860) specimen paper (same order (a)-(d) as before: both true and R explains; both true and R does not explain; A true and R false; A false and R true). Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/circ.mjs` holds the exact arithmetic (rationals on BigInt, radii as exact surds, the `Circle` class, relative position and contact point) and `src/vis.mjs` the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch12`, no removed topics)

- **t01** Equation of a circle in standard, diameter, general and parametric forms; centre and radius from the general equation; circles touching an axis, passing through the origin, and the condition for a real circle.
- **t02** A circle through three non-collinear points (and why collinear points fail); a circle through two points whose centre lies on a given line; a circle touching an axis at a given point.
- **t03** Intercepts on the axes (points, lengths $2\sqrt{g^2 - c}$ and $2\sqrt{f^2 - c}$, touching an axis); the five relative positions of two circles; circles touching externally and internally, the point of contact by the ratio of the radii, and circles of a given radius touching a given circle.
- **Scope decision:** tangents and normals, the length of a tangent, a chord with a given midpoint and the radical axis are not in the ISC topic list for this chapter (`syllabus.yaml` t01-t03), so they are not taught or tested. Contact between two circles is covered because the syllabus lists it.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Equations of a circle" (t01-t02), 24 slides; Part 2 "Intercepts and two circles" (t03), 20 slides |
| Visuals | 36 of 44 slides have one (23 tables, 2 flows, 11 plots, each circle drawn as an upper and a lower half with its domain); never more than 1 slide in a row without a visual |
| Worked examples | 8 + 6, each recomputed and asserted in `vis.mjs` |
| Check slides | 4 + 4 on objective items used in neither test: fb3, fb1, fb2, tf4 (Part 1); fb5, fb4, tf3, n5 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 31 |
| Questions | 78 items worth 138 marks: 21 mcq, 6 assertion-reason, 8 true-false, 7 fill-blank, 8 numerical, 10 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 12, d2 24, d3 34, d4 8 |
| Competency | recall 5, understanding 27, application 36, analysis 10: application or higher is 59% of items and 72% of marks |
| MCQ keys | a 6, b 5, c 5, d 5; assertion-reason keys a c d b a c |
| Tests | `t_isc11math_ch12_short` and `t_isc11math_ch12_long` (details below) |

**Short test** (`t_isc11math_ch12_short`), 20 marks in 50 minutes:
- Section A: m02, m09, m13, m18 and ar1.
- Section B: s202, then s205 or s207.
- Section C: s301, then s304 or s310.
- Section D: l01.

**Long test** (`t_isc11math_ch12_long`), 40 marks in 100 minutes:
- Section A: m03, m05, m07, m10, m11, m12, m14, m16, m17, m19, ar2 and ar5.
- Section B: s203, s204, then s209 or s210.
- Section C: s302, s303, s305, then s307 or s308.
- Section D: l02, then l03 or l06.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m01, m04, m06, m08, m15, m20, m21, ar3, ar4, ar6, tf1, tf2, tf5 to tf8, fb6, fb7, n1 to n4, n6 to n8, s201, s206, s208, s306, s311, l04, l05 and l07.

## Verifier record (what the build computes and asserts)

- **Two routes to every fact.** Each centre, radius, equation, intercept and contact point is computed by a closed formula on exact rationals (`Fr` on BigInt, radii as exact surds) and independently by point tests: substitution of marked points, squared distances, and a 720-point floating-point sampling of every circle against both the standard and the general equation (`Circle.verify`).
- **Equations from data.** The circle through three points is solved by exact elimination on the three linear equations and every point is substituted back; collinear triples are asserted to fail. Circles from a diameter, from a centre and a point, and from a general equation are each rebuilt and compared. Centres on a line are found by solving the line with the equal-distance condition (the bisector identity is checked on a $11 \times 11$ grid of centres) and by search.
- **Unknown constants by search.** Values such as $k$ for a given radius, touching an axis or passing through a point, and the radius $h$ of a circle touching an axis at a given point, are found by search over a range and compared with the algebraic answer.
- **Intercepts.** The roots of $y = 0$ and $x = 0$ come from the discriminant (exact when it is a perfect square, an exact surd otherwise); touching is asserted as a zero discriminant with a repeated root.
- **Two circles.** The relative position is classified twice: by exact squares ($d^2$ against $r_1^2 + r_2^2 \pm 2r_1r_2$) and by the rational numbers $d$, $r_1 + r_2$, $\lvert r_1 - r_2 \rvert$. The point of contact is computed by the section formula (internal or external ratio) and asserted on both circles; the circles-of-given-radius examples are found by search over the centre and every contact is classified.
- **Parametric form.** Sampled values of $\theta$ (every degree, or $720$ half-degree steps) are asserted on the circle; exact angles ($0$, $60$, $90$, $180$, $270$ degrees) are checked in exact arithmetic.
- **Distractors** are each computed from their own wrong method (for example $(g, f)$ as the centre, $g^2 + f^2 + c$, the internal formula for external contact, a swapped centre) and asserted to be wrong. In one item the swapped-centre distractor was found to pass through the given point, so the point was changed.
- **Plots:** each circle is drawn as an upper and a lower half with its domain; marked points are asserted on the circle (centres are marked free); marked zeros are all located numerically.
- **Re-solve checks:** 156 of 156 pass. KaTeX parses 2069 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 78 questions, 0 flags. Doubled-backslash scan: total 0. Originality gate: 0 errors. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The bank already holds the CBSE 11 Mathematics ch10 Conic Sections circle items. Their circles ($(-3, 1)$ radius $4$; centre $(-2, 5)$; diameter $(1, 2)$-$(7, 6)$; $x^2 + y^2 - 4x + 6y + 4 = 0$; the circle through $(1, 1)$, $(5, 1)$, $(1, 4)$; the circle on $O$, $A(8, 0)$, $B(0, 6)$; the first-quadrant circle touching both axes through $(9, 2)$; the centre on the $x$-axis through $(1, 3)$ and $(5, 1)$) are not reused. New circles are built from different centres, radii and points, and the stems use different wording.
- One stem matched the CBSE chapter's "find the centre and the radius" and another this chapter's own intercept item; both were reworded and the gate now reports 0 errors.
- No CISCE specimen or past-paper question is reproduced; the specimen papers are used for the paper pattern only. All people and places are absent; the problems are purely coordinate-geometric.

## Known gaps

- Tangents, normals and the radical axis are out of scope (not in the ISC topic list for this chapter).
- No case-based item (the ISC 11 blueprints have no case-based slot).
- Plots draw each circle as two half-curves, so a faint gap can appear at the extreme left and right points for circles whose radius is an irrational number.
