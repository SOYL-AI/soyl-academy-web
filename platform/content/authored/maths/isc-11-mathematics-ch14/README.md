# ISC Class 11 Mathematics - Chapter 14: Ellipse and Hyperbola (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 3: Coordinate Geometry.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib, unchanged from Chapters 11 and 12 (the assertion-reason options use the exact wording and order of the ISC 2027 Mathematics (860) specimen). Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/exact.mjs` is the exact-arithmetic helper (rationals on BigInt, exact surds; a copy of the Chapter 12 helper), `src/conic.mjs` holds the `Ellipse` and `Hyperbola` classes and the focus-directrix conic builder, and `src/vis.mjs` the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch14`, no removed topics)

- **t01** The ellipse $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ with $e < 1$ and $b^2 = a^2(1 - e^2)$, for $a > b$ and for $a < b$ (then $a^2 = b^2(1 - e^2)$); centre, vertices, major and minor axes, foci, directrices, latus rectum and its ends; reading an equation (including one that must first be divided to standard form); the equation from foci and vertices, from $e$ and an axis, from a latus rectum, or from points of the curve.
- **t02** The equation of an ellipse from a focus, a directrix and $e$ in general position (squared $PS = e \cdot PL$, a second-degree equation, with an $xy$ term when the directrix slants); the focal property $SP + S'P = 2a$ (proof from the two focus-directrix pairs, numerical checks), focal distances $a \pm ex$, and loci with a constant sum of distances (including the degenerate case $PA + PB = AB$).
- **t03** The hyperbola $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$ with $e > 1$ and $b^2 = a^2(e^2 - 1)$; the conjugate hyperbola with $\dfrac{1}{e^2} + \dfrac{1}{e'^2} = 1$; vertices, transverse and conjugate axes, foci, directrices, latus rectum; equations from data; the rectangular hyperbola ($a = b$, $e = \sqrt{2}$).
- **t04** The focal property $\lvert SP - S'P \rvert = 2a$, focal distances $ex \pm a$, loci with a constant difference of distances (hyperbola, two rays, or no point), and a hyperbola from a focus, a directrix and $e$.
- **Scope decision:** Chapter 13 (parabola and the general focus-directrix introduction) is a separate chapter; here $PS = e \cdot PL$ is recalled briefly and used. Tangents, normals, parametric forms, asymptote questions (asymptotes are drawn in figures and used for the conjugate pair only) and conics with a shifted centre are not in the ISC topic list for this chapter and are not tested, except that the focus-directrix long item l02 completes a square once, because a general-position second-degree equation naturally leads there.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "The ellipse" (t01-t02), 22 slides; Part 2 "The hyperbola" (t03-t04), 22 slides |
| Visuals | 36 of 44 slides have one (21 tables, 2 flows, 13 plots; the 8 check slides have none); never more than 1 slide in a row without a visual |
| Worked examples | 8 + 8, each recomputed and asserted in `vis.mjs` |
| Check slides | 4 + 4 on objective items used in neither test: fb1, tf1, fb4, n1 (Part 1); fb3, tf3, fb5, n3 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 32 |
| Questions | 70 items worth 130 marks: 20 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 6 numerical, 10 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 3, d2 26, d3 30, d4 10, d5 1 |
| Competency | recall 3, understanding 27, application 33, analysis 7: application or higher is 57% of items and 69% of marks |
| Topic spread | t01 24, t02 20, t03 19, t04 12 (l07 counts in all four) |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a c d b a c |
| Tests | `t_isc11math_ch14_short` and `t_isc11math_ch14_long` (details below) |

**Short test** (`t_isc11math_ch14_short`), 20 marks in 50 minutes:
- Section A: m02, m09, m14, m19 and ar1.
- Section B: s202, then s207 or s208.
- Section C: s301, then s304 or s308.
- Section D: l01.

**Long test** (`t_isc11math_ch14_long`), 40 marks in 100 minutes:
- Section A: m04, m05, m08, m10, m11, m12, m15, m17, m18, m20, ar5 and ar6.
- Section B: s204, s206, then s209 or s210.
- Section C: s302, s306, s307, then s310 or s311.
- Section D: l07, then l04 or l06.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Each test spans t01 to t04. Spare practice items: m01, m03, m06, m07, m13, m16, ar2, ar3, ar4, tf2, tf4, tf5, fb2, n2, n4 to n6, s201, s203, s205, s303, s305, s309, l02, l03 and l05.

## Verifier record (what the build computes and asserts)

- **Two routes to every fact.** Each axis, focus, directrix, eccentricity, latus rectum and focal distance is computed by a closed formula on exact rationals (`Fr` on BigInt, lengths as exact surds such as $6\sqrt{5}$ or $\dfrac{5\sqrt{3}}{6}$) and independently by floating-point sampling: `Ellipse.verify` tests 720 points of the curve for $SP + S'P = 2a$ and for the focal distances $a \mp ex$ (or $a \mp ey$), and `Hyperbola.verify` tests both branches at 50 values of the hyperbolic parameter for $\lvert SP - S'P \rvert = 2a$ and the focal distances $e\lvert u \rvert \mp a$, plus $b^2 = a^2(e^2 - 1)$ and $\dfrac{1}{e^2} + \dfrac{1}{e'^2} = 1$. The latus rectum end is tested on the curve exactly (squared coordinates).
- **Conics from a focus and a directrix** are built by `fdConic`: $(l^2 + m^2)\left[(x - p)^2 + (y - q)^2\right] = e^2(lx + my + n)^2$ collected into a quadratic and normalised to coprime integer coefficients; the raw and normalised coefficients are asserted proportional, the type is read from $B^2 - 4AC$, and the vertices, latus rectum ends and every other marked point are tested both in the quadratic and in $PS^2 = e^2 PL^2$ (`fdGap`, exact). The tilted ellipse and the tilted hyperbola are cross-checked by the standard forms (centre, $a$, $e$ from the vertices).
- **Equations from data.** Two-point ellipses are solved exactly (`solve2`) and both points substituted back; $k$ for a given eccentricity is found by search over a range; distractor equations are each built from a named wrong method (swapped axes, $e$ for $e^2$, $c^2 = a^2 + b^2$ for an ellipse, a wrong directrix) and asserted to fail at a vertex or a sampled point.
- **Loci.** The ellipse, hyperbola and degenerate cases are tested numerically on a grid (for $PA + PB = AB$ the locus is exactly the segment; $\lvert PA - PB \rvert$ never exceeds $AB$ on an $81 \times 81$ grid); the locus equations are the standard forms of the exact conics.
- **Distractors** are each computed from their own wrong method and asserted to differ from the key; each distractor explanation names its option by its value.
- **Plots:** an ellipse is drawn as an upper and a lower half on a domain that stops $0.001$ short of the ends of the horizontal axis; a hyperbola as four functions (two branches, upper and lower halves) starting $0.001$ beyond the vertices (or two functions for the conjugate); the tilted ellipse as the two roots of the quadratic in $y$. Marked foci and vertices are marked free (not on a plotted function) and are asserted by the focal property or the equation; latus rectum ends and other marked points are asserted on the curve, and every marked zero is located numerically.
- **Re-solve checks:** 142 of 142 pass. Stage-4 lint: 0 errors, 0 warnings. `verify-local`: 70 questions, 0 flags. Doubled-backslash scan: total 0. Originality gate: 0 errors. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The bank already holds the CBSE 11 Mathematics ch10 Conic Sections ellipse and hyperbola items. Their set-ups are not reused: the ellipses $\dfrac{x^2}{169} + \dfrac{y^2}{25}$, $\dfrac{x^2}{49} + \dfrac{y^2}{36}$, $\dfrac{x^2}{81} + \dfrac{y^2}{45}$, $25x^2 + 16y^2 = 400$, $\dfrac{x^2}{169} + \dfrac{y^2}{144}$, $\dfrac{x^2}{289} + \dfrac{y^2}{225}$, $16x^2 + 9y^2 = 576$, the foci $(\pm 6, 0)$ with $e = \dfrac{3}{5}$, the vertices $(0, \pm 17)$ with foci $(0, \pm 15)$ and the points $(3, 2)$, $(1, 6)$; the hyperbolas $\dfrac{x^2}{144} - \dfrac{y^2}{25}$, $\dfrac{x^2}{9} - \dfrac{y^2}{16}$, $\dfrac{x^2}{16} - \dfrac{y^2}{9}$, $\dfrac{x^2}{64} - \dfrac{y^2}{225}$, $4x^2 - 5y^2 = 20$, $16y^2 - 25x^2 = 400$ and the vertices $(\pm 6, 0)$ with foci $(\pm 10, 0)$. This chapter uses different denominators and data (for example $\dfrac{x^2}{49} + \dfrac{y^2}{24}$, $\dfrac{x^2}{400} + \dfrac{y^2}{144}$, $\dfrac{x^2}{81} - \dfrac{y^2}{19}$, $\dfrac{x^2}{36} - \dfrac{y^2}{13}$, the conjugate pair $\dfrac{x^2}{64} - \dfrac{y^2}{36}$, the loci with fixed points $(0, \pm 8)$, $(\pm 15, 0)$, $(0, \pm 13)$) and the focus-directrix items (a tilted ellipse, a tilted rectangular hyperbola, a shifted ellipse) have no counterpart in the CBSE chapter, whose conics are all parabolas in that role.
- The exact-stem gate reported seven clashes on the first build (with CBSE ch10 stems "The foci of the ellipse ... are", "An ellipse has its centre at the origin, its foci at ... and eccentricity ... Its equation is", "The foci of the hyperbola ... are", "The latus rectum of the hyperbola ... has length", "The foci of the ellipse ... lie on the x-axis", and two clashes inside this chapter's locus items); each was reworded, not just renumbered, and the gate now reports 0 errors.
- No CISCE specimen or past-paper question is reproduced; the specimen papers are used for the paper pattern only. All problems are purely coordinate-geometric, with no people or places.

## Known gaps

- Tangents, normals, parametric forms, asymptote questions and conics with a shifted centre (except the single completed square in l02) are out of scope (not in the ISC topic list for this chapter).
- Directrices are not drawn in the figures because the plot spec has no vertical-line element; they appear in the tables and the worked solutions (a slanting directrix is drawn as a function).
- No case-based item (the ISC 11 blueprints have no case-based slot).
- Plots draw each ellipse as two half-curves, so a faint gap of $0.001$ can appear at the ends of the horizontal axis.
