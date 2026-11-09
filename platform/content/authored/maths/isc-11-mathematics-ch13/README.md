# ISC Class 11 Mathematics - Chapter 13: Conic Sections: Introduction and Parabola (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 3: Coordinate Geometry.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib, copied unchanged (assertion-reason options in the exact wording of the ISC 2027 Mathematics (860) specimen paper). Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/ex.mjs` holds the exact arithmetic (rationals on BigInt, exact surds, TeX helpers, copied from the ch12 helpers); `src/conic.mjs` holds the `Conic` class (equation from a focus, a directrix and $e^2$), the `Par` class (the four standard parabolas with a vertex $(h, k)$), the cone-section classifier and the plot helpers; `src/vis.mjs` the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch13`, no removed topics)

- **t01** Conics as sections of a double cone (circle, ellipse, parabola, hyperbola by the angle of the plane; the degenerate point, line and pair of lines); focus, directrix, eccentricity, latus rectum and the property $PS = e \cdot PL$; classification by $e < 1$, $e = 1$, $e > 1$; the equation of a conic from a focus, a directrix and $e$ in general position (including an $xy$ term); identifying the conic from $e$; the latus rectum $2ep$.
- **t02** The parabola in the standard forms $y^2 = \pm 4ax$ and $x^2 = \pm 4ay$: rough sketches, focus, vertex, directrix, axis, latus rectum (length $4a$ and its ends), reading these from an equation and finding the equation from data (a focus, a directrix, a point and an axis, a latus rectum); focal distance ($x_1 + a$ for $y^2 = 4ax$ and its three companions); parametric points $(at^2, 2at)$.
- **t03** The equation of a parabola from a focus and an oblique directrix ($PS^2 = PL^2$ with the perpendicular distance formula), shifted parabolas with vertex $(h, k)$ and reduction from a general equation, and application problems (a gateway arch, a dish, a cable, a water jet, a reflector, thrown and kicked balls).
- **Scope decision:** the ellipse and the hyperbola belong to Chapter 14. They are named only in the classification by $e$ (and as the type of two conics found from $PS = e \cdot PL$); their standard forms, axes, foci and latus rectums are not taught or tested here. The test $B^2 - 4AC$ is given as a check only; the type is always decided by $e$. Tangents, normals and chords of a parabola are not in the ISC topic list and are not covered.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Conics and the focus-directrix property" (t01), 19 slides; Part 2 "The parabola" (t02, t03), 23 slides |
| Visuals | 36 of 42 slides have one (22 tables, 2 flows, 12 plots); the six without are the quick-check slides, so never more than 1 slide in a row without a visual |
| Worked examples | 4 + 8, each recomputed and asserted in `vis.mjs` |
| Check slides | 3 + 3 on objective items used in neither test: fb1, tf2, n1 (Part 1); fb2, tf4, fb3 (Part 2) |
| Notes | 8 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 32 |
| Questions | 70 items worth 130 marks: 20 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 6 numerical, 10 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 5, d2 24, d3 31, d4 9, d5 1 |
| Competency | recall 5, understanding 30, application 29, analysis 6: application or higher is 50% of items and 68% of marks |
| Topic tags | t01 23, t02 29, t03 19 (an item can carry two topics) |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a b c d a c |
| Tests | `t_isc11math_ch13_short` and `t_isc11math_ch13_long` (details below) |

**Short test** (`t_isc11math_ch13_short`), 20 marks in 50 minutes:
- Section A: m03, m09, m18, m06 and ar5.
- Section B: s202, then s205 or s209.
- Section C: s301, then s304 or s310.
- Section D: l03.

**Long test** (`t_isc11math_ch13_long`), 40 marks in 100 minutes:
- Section A: m01, m04, m05, m07, m10, m12, m14, m16, m17, m20, ar2 and ar6.
- Section B: s201, s204, then s207 or s210.
- Section C: s302, s305, s308, then s303 or s309.
- Section D: l01, then l04 or l06.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m02, m08, m11, m13, m15, m19, ar1, ar3, ar4, tf1, tf3, tf5, fb4, fb5, n2 to n6, s203, s206, s208, s306, s307, s311, l02, l05 and l07.

## Verifier record (what the build computes and asserts)

- **Every conic is built from the definition.** `Conic.fromFocus` forms $PS^2 = e^2 PL^2$ on exact rationals from a focus, a directrix $ax + by + c = 0$ and $e^2$ (clearing the denominator $a^2 + b^2$ exactly), normalises to integer coefficients, and the build samples $\approx 1000$ points of each conic in floating point and tests $PS = e \cdot PL$ at every one. The class by $e$ (ellipse, parabola, hyperbola) is compared with the sign of $B^2 - 4AC$.
- **Two routes to every parabola.** `Par` writes the vertex form for the four orientations. Its equation is compared coefficient by coefficient with the conic that `Conic.fromFocus` builds from the parabola's own focus and directrix with $e = 1$; parametric points $(h + at^2, k + 2at)$ are tested on the curve with $PS^2 = PL^2$ and focal distance $a(t^2 + 1)$; the latus rectum ends are tested at distance $2a$ from the focus, the vertex at distance $a$.
- **Cone sections twice.** The section is classified from the angles ($\beta$ against $\alpha$, with the circle at $90^\circ$ and the degenerate cases through the vertex) and again from the sign of the determinant $\sin^2\beta - \tan^2\alpha\cos^2\beta$ of the cone's quadratic form restricted to the plane.
- **Latus rectum.** The length $2ep$ is checked against the chord of the conic on the line through the focus perpendicular to the axis (the two integer ends are found by search and tested with $PS^2 = e^2 PL^2$).
- **Unknown constants by search or substitution.** Values such as $a$ from a point, $t$ for a focal distance, the points at a given focal distance and the lattice points of a conic are found by search over a range and compared with the algebraic answer; expanded equations are compared with the unexpanded $PS^2 - e^2 PL^2$ on a $7 \times 7$ grid of integer points.
- **Distractors** are each computed from their own wrong method and asserted to be wrong (for example $e$ for $e^2$, $PL$ without the factor $a^2 + b^2$, the focus with the wrong sign, the inverted ratio, the directrix on the wrong side, the full width used as the half-width of an arch, $a$ for $2a$, the swapped coordinates). In one item the shifted-directrix distractor passed through the first test point, so the build now finds a lattice point that none of the wrong equations passes through.
- **Plots:** each parabola is drawn as a function of $x$ (vertical axis) or as an upper and a lower branch starting just after the vertex (horizontal axis); marked foci and vertices are marked free where they are not on a function, and every marked point on a curve (latus rectum ends, parametric points, rim points) is asserted on the exact curve. Horizontal directrices are drawn as functions; vertical ones are marked by a point on the $x$-axis and described in the caption.
- **Re-solve checks:** 140 of 140 pass. KaTeX parses all maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 70 questions, 0 flags. Doubled-backslash scan: total 0. Originality gate: see the report. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The bank already holds the CBSE 11 Mathematics ch10 Conic Sections items. Their parabolas ($y^2 = 24x$, $x^2 = -20y$, $y^2 = -10x$, $y^2 = -16x$, $y^2 = -32x$, $y^2 = -28x$, $x^2 = 28y$, $x^2 = 24y$, $x^2 = 18y$; focus $(5, 0)$ or $(0, -6)$; directrix $y = -9$; the points $(6, -3)$ and $(2, -8)$; the $48$ mm and $30$ cm reflectors; the footbridge cable between towers $100$ m apart; the footbridge arch $30$ m wide and $9$ m high) are not reused. New parabolas use different equations ($y^2 = -36x$, $x^2 = 14y$, $5y^2 = 12x$, $x^2 = 36y$, $y^2 = 20x$, $x^2 = -36y$, $y^2 = -9x$ and others), different points and different set-ups: a temple gateway, a solar cooker dish, a kicked or thrown ball, a water jet, a ropeway cable and a tunnel opening.
- The CBSE chapter also uses cone-section items with other angles ($35^\circ$, $25^\circ$, $30^\circ$); this chapter uses $28^\circ$, $33^\circ$, $36^\circ$, $40^\circ$, $47^\circ$ and $52^\circ$. The CBSE chapter has no focus-directrix items with an oblique directrix; those are new here.
- Four stems matched CBSE ch10 stems once maths was removed ("the parabola has its focus at", "the directrix of the parabola is the line", "the length of the latus rectum of the parabola is"); they were reworded and the gate reports no duplicate.
- No CISCE specimen or past-paper question is reproduced. People and places are imagined.

## Known gaps

- The ellipse and the hyperbola are not developed (Chapter 14); two worked examples and one item produce an ellipse or a hyperbola only as the type of the conic found from $PS = e \cdot PL$.
- No case-based item (the ISC 11 blueprints have no case-based slot) and no tangent, normal or focal-chord property (not in the ISC topic list).
- Vertical directrices cannot be drawn by the plot element (no vertical-line function): they are shown by a marked point and the caption, and horizontal directrices as constant functions.
- The oblique parabola figure starts its branches at $x = 1.0001$, so a faint gap shows at the leftmost point where the tangent is vertical.
