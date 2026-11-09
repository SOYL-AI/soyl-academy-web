# ISC Class 11 Mathematics - Chapter 15: Introduction to Three-Dimensional Geometry (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 3: Coordinate Geometry.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib (assertion-reason options as in the ISC 2027 specimen); its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/space.mjs` and `src/gp.mjs` are unchanged copies of the exact-arithmetic helpers of the CBSE 11 ch11 chapter on the same topic (integer coordinates, rationals on BigInt, exact surds, octants, feet, the section formula, centroid, triangle types, the oblique 3-D sketch). `src/x3.mjs` adds what ISC needs: external division, the fourth vertex of a parallelogram, the ratio in which a coordinate plane cuts a segment, collinearity by a common ratio, the centroid of a tetrahedron, the bisecting plane, the $PA^2 - PB^2 = k$ plane and the sphere equation (squared and expanded forms). `src/vis.mjs` holds the figures and tables with their assertions.

## Scope (syllabus `isc-11-mathematics-ch15`, no removed topics)

- **t01** Coordinate axes and planes in three dimensions; coordinates of a point; the eight octants and their signs; points on axes and in planes; feet of perpendiculars and distances of a point from the axes and the planes.
- **t02** The distance between two points: collinearity, triangle types, parallelograms, rhombuses and rectangles from distances, a point equidistant from given points, and simple loci (the plane $PA^2 = PB^2$, the plane $PA^2 - PB^2 = k$, and the equation, squared and expanded, of the points at a fixed distance from a point).
- **t03** The mid-point formula and the section formula (internal and external); the ratio in which a coordinate plane divides a segment; the centroid of a triangle (and of a tetrahedron as an extension); collinearity by a common ratio; the missing vertex of a parallelogram.
- **Scope decision:** direction cosines and lines and planes in vector form belong to ISC 12 and are not taught or tested. The sphere appears only as the equation of a locus (no centre-radius theory, tangents or sections). Images (reflections) of a point are not in the ISC topic list and are not used.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Points in space and the distance formula" (t01, t02), 22 slides; Part 2 "Quadrilaterals, loci and the section formula" (t02, t03), 25 slides |
| Visuals | 41 of 47 slides have one (29 tables, 2 flows, 4 oblique 3-D sketches marked not to scale, 6 plots that are projections on or cross-sections by the xy-plane); the only slides without a visual are the 6 check slides, never two in a row |
| Worked examples | 6 + 8, each recomputed and asserted in `vis.mjs` |
| Check slides | 3 + 3 on objective items used in neither test: fb1, tf2, fb2 (Part 1); fb3, fb5, tf5 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 30 |
| Questions | 70 items worth 130 marks: 20 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 6 numerical, 10 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 10, d2 21, d3 31, d4 8 |
| Competency | recall 8, understanding 22, application 31, analysis 9: application or higher is 57% of items and 73% of marks |
| Topics | t01 20 items, t02 26, t03 28 (long items touching two topics count in both) |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a b c d a b |
| Tests | `t_isc11math_ch15_short` and `t_isc11math_ch15_long` (details below) |

**Short test** (`t_isc11math_ch15_short`), 20 marks in 50 minutes:
- Section A: m03, m10, m16, m19 and ar1.
- Section B: s202, then s205 or s207.
- Section C: s301, then s304 or s310.
- Section D: l01.

**Long test** (`t_isc11math_ch15_long`), 40 marks in 100 minutes:
- Section A: m04, m05, m07, m08, m11, m12, m13, m17, m18, m20, ar3 and ar5.
- Section B: s203, s209, then s206 or s210.
- Section C: s302, s305, s307, then s308 or s311.
- Section D: l02, then l04 or l06.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m01, m02, m06, m09, m14, m15, ar2, ar4, ar6, tf1, tf3, tf4, fb4, n1 to n6, s201, s204, s208, s303, s306, s309, l03, l05 and l07.

## Verifier record (what the build computes and asserts)

- **Exact arithmetic, two routes.** Coordinates are integers or exact rationals (`Rat` on BigInt); distances are kept as squared integers and written as simplified surds (`sqTex`, checked against `Math.hypot`). Octants are computed from the signs and cross-checked against the quadrant-plus-hemisphere rule; feet on planes are checked for perpendicularity and feet on axes by minimising the distance over a grid.
- **Section formula.** Every internal point is checked by the squared-distance ratio ($AP^2 n^2 = PB^2 m^2$) and by $AP = \frac{m}{m+n} AB$; every external point is the internal formula with $n \to -n$, checked to lie off the segment on the correct side (beyond $B$ when $m > n$, beyond $A$ when $m < n$); the external ratio $1 : 1$ is asserted not to exist. The ratio in which a coordinate plane cuts a segment is computed as $-a_k : b_k$ and independently as the parameter $t = a_k / (a_k - b_k)$ with the cut point reproduced by the section formula, and its internal or external kind is checked from the sign.
- **Centroids and vertices.** The triangle centroid is the average and is asserted to divide the median $2 : 1$; the tetrahedron centroid is asserted to divide the line from every vertex to the centroid of the opposite face $3 : 1$; the fourth vertex of a parallelogram is $A + C - B$ with equal diagonal mid-points asserted, and the three possible fourth vertices (long item) are each checked the same way and their triangle's centroid is compared with the original.
- **Triangles, quadrilaterals, collinearity.** `triangleKind` classifies by sorted squared sides (equilateral, isosceles, right-angled, right isosceles, scalene) and requires a non-degenerate cross product; collinearity is the cross product of the difference vectors, checked against the distance sums ($\sqrt{14} + 2\sqrt{14} = 3\sqrt{14}$ and similar) and against the common-ratio parameter $t$. The rhombus and rectangle items assert the common diagonal mid-point (planarity), all four sides, both diagonals, and for the rectangle a zero dot product of adjacent sides.
- **Loci.** The bisecting plane and the $PA^2 - PB^2 = k$ plane are derived by formula and then re-tested at the mid-point plus perpendicular offsets and at every lattice point of the plane in a $13 \times 13$ window; the sphere equation is checked in its squared and expanded forms at every lattice point in a box around the centre (they must agree both on and off the sphere).
- **Unknowns by search.** Values such as $k$ in a distance, an equidistant point on an axis, and a coordinate of a point at a given distance are found by search (over integers, or in steps of $\frac{1}{3}$ or $\frac{1}{4}$ for rational answers) and compared with the algebraic answer.
- **Distractors** are each computed from their own wrong method (sum instead of difference, the squared value, internal for external, the swapped ratio $n : m$, $m + n$ for $m - n$, $B + C - A$ for $A + C - B$, a foot on another axis or plane) and asserted to differ from the key. Each distractor explanation names its option by value.
- **Plots and sketches:** every plot is a projection on the xy-plane (or a cross-section by it) and says so; lines are drawn from exact slopes with their end points marked and asserted on the line; free points are flagged `on_curve: false`. The 3-D sketches are oblique, marked not to scale, and every labelled coordinate is asserted against its drawn point.
- **Re-solve checks:** 157 of 157 pass. KaTeX parses 1878 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 70 questions, 0 flags. Doubled-backslash scan: total 0. Originality gate: 0 errors for this unit. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The bank already holds the CBSE 11 Mathematics ch11 chapter on the same topic (and CBSE 10 ch07 coordinate geometry). Its set-ups and numbers are not reused: no item uses its points $(3, -4, 12)$, $(-3, 4, -2)$, $(5, -2, 7)$, $(6, -8, 3)$, its triangles, its cuboid, its parallelogram, its centroid examples or its case-based set-ups. The equidistant-point and locus items use different loci (a point on the $y$- and $z$-axes, the plane $PA^2 - PB^2 = k$) from its $PA = PB$ plane and its $x$-axis point.
- New set-ups not present in CBSE 11: external division, the ratio of a plane cutting a segment externally, the three possible fourth vertices of a parallelogram of unstated order and the equality of the two centroids, the tetrahedron $3 : 1$ property, the hypotenuse mid-point equidistant from three vertices, a rectangle and a rhombus in space (planarity by the diagonal mid-point), a box with a non-origin corner, and the harmonic pair of an internal and an external point.
- Ten stems matched the CBSE chapters on the first build ("The distance between the points ... is", "The mid-point of the segment joining ... is", "has $x$-coordinate", "Use the distance formula to show ...", and similar); all were reworded and the pre-check now reports none. The gate flagged one pair of similar items inside this chapter (m12 and s206); both were reworded.
- No CISCE specimen or past-paper question is reproduced; the specimen papers are used for the paper pattern only. All numbers are original; no people or places appear.

## Known gaps

- Direction cosines, lines and planes in vector form are out of scope (ISC 12). The sphere is only an equation.
- No case-based item (the ISC 11 blueprints have no case-based slot).
- The 3-D figures are oblique sketches (the plot spec is 2-D), so lengths in them are not to scale; the 2-D plots are projections or cross-sections and are labelled as such.
