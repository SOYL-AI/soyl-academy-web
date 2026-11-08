# ISC Class 11 Mathematics - Chapter 11: Straight Lines (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 3: Coordinate Geometry.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib with one change from the copy used in Chapters 1-10: the assertion-reason options use the exact wording of the ISC 2027 Mathematics (860) specimen paper (same order (a)-(d) as before: both true and R explains; both true and R does not explain; A true and R false; A false and R true). Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/ln.mjs` and `src/fr.mjs` are the exact line engine and exact fractions (copies of the CBSE 11 ch09 modules, unchanged); `src/geo.mjs` adds the ISC items (section formula, area, incentre, shifting the origin, lines at a given angle, angle bisectors, pencils of lines); `src/vis.mjs` holds the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch11`, no removed topics)

- **t01** Recall of 2-D geometry: internal and external section formula, ratio in which a line divides a segment, area of a triangle, collinearity, incentre and inradius; shifting of the origin (points and equations, both directions).
- **t02** Slope and inclination, angle between two lines, parallel and perpendicular lines, lines through a point at a given angle (45 degrees) to a line, using slopes to classify a quadrilateral.
- **t03** Forms of the equation of a line: parallel to an axis, point-slope, slope-intercept, two-point, intercept (and when it fails), normal form (including a 30 degree normal), general equation and conversions.
- **t04** Distance of a point from a line, distance between parallel lines (including a line at a fixed distance), equations of the two angle bisectors, the bisector of the angle containing the origin, and whether it is acute or obtuse.
- **t05** Family of lines through an intersection ($L_1 + \lambda L_2 = 0$) fixed by a point, the origin, a slope condition, equal intercepts, or a zero coefficient; locus of a point (equidistant from two points, constant $PA^2 - PB^2$, constant area).
- **Scope decision:** loci that give circles (constant ratio of distances, $x^2 + y^2$ equations) belong to Chapter 12 and are only named in the standard-loci table; no item asks for a circle. Every figure draws lines as functions, so vertical lines appear only in the questions' working, never in a plot.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Points, slopes and equations of lines" (t01-t03), 23 slides; Part 2 "Distances, bisectors, families of lines and locus" (t04-t05), 21 slides |
| Visuals | 38 of 44 slides have one (22 tables, 11 plots, 5 flows); never more than 1 slide in a row without a visual |
| Worked examples | 8 + 8, each recomputed and asserted in `vis.mjs` |
| Check slides | 3 + 3 on objective items used in neither test: tf1, fb1, tf2 (Part 1); tf3, fb2, tf4 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 33 |
| Questions | 70 items worth 130 marks: 20 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 6 numerical, 10 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 2, d2 27, d3 36, d4 5 |
| Competency | understanding 29, application 35, analysis 6: application or higher is 59% of items and 72% of marks |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a c d a b c |
| Topics (item tags) | t01 24, t02 10, t03 15, t04 13, t05 11 |
| Tests | `t_isc11math_ch11_short` and `t_isc11math_ch11_long` (details below) |

**Short test** (`t_isc11math_ch11_short`), 20 marks in 50 minutes:
- Section A: m05, m11, m15, m16 and ar1.
- Section B: s201, then s204 or s209.
- Section C: s301, then s305 or s308.
- Section D: l03.

**Long test** (`t_isc11math_ch11_long`), 40 marks in 100 minutes:
- Section A: m01, m03, m06, m09, m10, m12, m13, m17, m19, m20, ar3 and ar5.
- Section B: s203, s206, then s208 or s210.
- Section C: s302, s306, s311, then s304 or s309.
- Section D: l01, then l04 or l05.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m02, m04, m07, m08, m14, m18, ar2, ar4, ar6, tf5, fb3 to fb5, n1 to n6, s202, s205, s207, s303, s307, s310, l02, l06 and l07.

## Verifier record (what the build computes and asserts)

- **Exact arithmetic.** Points, slopes, intercepts, ratios, areas and equations use exact fractions (`Fr`); a line is stored as normalised integers $(a, b, c)$.
- **Two routes to every fact.** Section points are checked collinear with the ends, with $n^2 AP^2 = m^2 PB^2$ exactly, between the ends (internal) or outside (external), and against the parameter form $A + t(B - A)$. Areas are computed as a determinant, as a cross product and as half base times height from the exact distance of the apex to the base line. The incentre is checked at equal exact distance from the three sides, with that distance equal to area over semi-perimeter, and the three sub-triangle areas adding to the whole. Distances are checked against the exact foot of the perpendicular; parallel-line distances against the distance of a point of one line from the other. Point-slope, two-point and intercept forms are rebuilt and compared; the normal form checks $\cos^2 + \sin^2 = 1$, $p \ge 0$, a point of the line, and $\omega$ by atan2.
- **Bisectors and pencils.** Each bisector passes through the meeting point, points on it are equidistant (exact squared distance) from both lines, the two bisectors are perpendicular, and the origin-angle rule (positive constants, sign of $a_1a_2 + b_1b_2$, half-angle below or above 45 degrees) is asserted against the angle between the bisector and a line. Each family member passes through the meeting point; each $\lambda$ meets its stated condition.
- **Shifting the origin.** Shifted copies of points of the line satisfy the new equation, in both directions.
- **Searches.** Perpendicular $k$ (integers $-12$ to $12$), the two $k$ giving a stated area, the integer intercepts with a given sum (search $-30$ to $30$) and the loci (points on and off the claimed line tested against the distance or area condition) are each checked by enumeration or sampling, besides the algebra.
- **Distractors** are each computed from their own wrong method (swapped ratio, internal for external, missing $\frac{1}{2}$, adjacent-side incentre weights, wrong-direction shift, $1 - m_1m_2$, unscaled sum or difference for a bisector, un-normalised parallel-line distance) and asserted distinct from the key.
- **Re-solve checks:** 143 of 143 pass. KaTeX parses all maths strings in strict mode.
- **Gates:** stage-4 lint 0 errors, 0 warnings; `verify-local`: 70 questions, 0 flags; doubled-backslash scan: total 0; originality gate: 0 errors for this unit; rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The CBSE 11 Mathematics ch09 chapter (Straight Lines) and ICSE 10 ch12/ch13 cover close topics. This chapter reuses only their exact engine approach, not their lines, points, wording or set-ups. Every item uses its own coordinates and contexts; the stems name their own content (for example the $x$-axis cutting a segment, a triangular plot on a grid, a line cutting off intercepts with a given sum, a constant-area locus), and the bank's exact-stem rule found three clashes in the first build, all reworded (a perpendicular-slope blank, a triangle-area numerical and a triangle-with-axes numerical).
- ISC-only items (not in the CBSE 11 chapter): external division, ratio in which a line divides a segment, incentre and inradius, shifting the origin, lines at a given angle to a line, the normal form with a 30 degree angle, angle bisectors with the origin-angle rule, families of lines through an intersection, and loci.
- No textbook or specimen text is reproduced; people and places are not used.

## Known gaps

- No case-based items (not in the ISC blueprints).
- Plots are drawn as functions, so there is no figure of a vertical line, and the incentre figure shows the triangle sides as plot series, not a drawn incircle (the plot spec has no circle element).
- A locus giving a circle is deliberately left to Chapter 12.
