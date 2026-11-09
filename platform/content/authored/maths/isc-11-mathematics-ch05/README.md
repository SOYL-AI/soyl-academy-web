# ISC Class 11 Mathematics - Chapter 5: Complex Numbers (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Mathematics (860), Paper I, Class XI portion, Unit 2: Algebra.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` and `src/lint.mts` are unchanged copies of the shared ISC 11 Mathematics files (md5 of lib.mjs `363c4cfd...`). `src/cx.mjs` (exact Gaussian-rational arithmetic with BigInt fractions, exact moduli as surds, exact complex square roots, the exact ring Z[w] for cube roots of unity, Argand and polar figure builders) follows the approach of the CBSE 11 ch04 helper but is written for this chapter; `src/ids.mjs` is this chapter's rule registry; `src/vis.mjs` holds every computed visual.

## Scope (syllabus.yaml, ISC 2028)

- **t01** Need for complex numbers; powers of $i$; algebra (sum, difference, product, quotient); additive and multiplicative inverse; equality of complex numbers.
- **t02** Conjugate, modulus and argument and their properties ($|z_1z_2| = |z_1||z_2|$, $\arg(z_1z_2) = \arg z_1 + \arg z_2$, triangle inequality).
- **t03** Argand plane and polar representation (conjugate and $-z$ as reflections, the parallelogram rule, $|z_1 - z_2|$ as a distance, a simple locus, conversion both ways, products and quotients in polar form).
- **t04** Square root of a complex number by $x^2 - y^2 = a$, $2xy = b$, $x^2 + y^2 = |z|$ (ISC-only; the CBSE 11 chapter does not cover it).
- **t05** Cube roots of unity and their properties (ISC-only).
- **Removed topics:** none listed. Quadratic equations with complex roots are chapter 6 and are not taught here; de Moivre's theorem is not in the ISC Class XI topic list, so powers of numbers in polar form are not taught.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Algebra, conjugate and modulus" (t01, t02) 20 slides; Part 2 "Argand plane, argument, polar form and roots" (t02-t05) 25 slides |
| Visuals | 37 of 45 slides carry one (every non-check slide; the 8 check slides carry none); never more than 1 slide in a row without a visual (flow 5, table 26, plot 4, geometry 2) |
| Worked examples | 5 + 6 |
| Check slides | 4 + 4, objective items used in neither test: tf1, fb1, fb2, m09 (Part 1); m12, tf2, fb4, fb5 (Part 2) |
| Notes | 8 sections with key terms, formulas and visuals; exam tips with a mark split and common mistakes |
| Flashcards | 30 (formula 14, definition 8, exam-tip 3, fact 2, diagram 2, concept 1) |
| Questions | 90 items, 150 marks: mcq 29, assertion-reason 6 (keys a b c d a c), true-false 12, fill-blank 9, numerical 6, short-2 10, short-3 11, long-5 7 (all in parts, 5-step schemes) |
| MCQ keys | a 8, b 7, c 7, d 7 after rotation by the build |
| Difficulty | d1 19, d2 35, d3 32, d4 4 |
| Competency | recall 10, understanding 30, application 40, analysis 10: application or higher is 56% of items, 69% of marks |
| Topics | t01 25 items, t02 29, t03 20, t04 10, t05 19 (multi-topic items counted under each topic) |
| Tests | `t_isc11math_ch05_short` (20 marks, 50 min) and `t_isc11math_ch05_long` (40 marks, 100 min) |

**Short test:** A m03 m11 m17 m20 ar2; B s203, [s205, s206]; C s301, [s305, s306]; D l01.

**Long test:** A m01 m04 m05 m07 m10 m13 m14 m16 m18 m21 ar4 ar5; B s201 s204 [s207, s209]; C s302 s304 s308 [s309, s311]; D l03, [l05, l06].

The tests are disjoint and use no deck-check item. Spares (practice only): m02 m06 m08 m15 m19 m22 m23 m24 m25 m26-m29, ar1 ar3 ar6, tf3-tf12, fb3 fb6-fb9, n01-n06, s202 s208 s210, s303 s307 s310, l02 l04 l07.

## Verifier record

Run from `platform/`: `npx tsx content/authored/maths/isc-11-mathematics-ch05/src/build.mjs` (prints `NO ERRORS`; rebuilding twice gives byte-identical `release.json` and `tests.json`).

- **Rule registry (`src/ids.mjs`):** 20 rule families, each tested exactly in BigInt-fraction arithmetic on a grid of Gaussian rationals (about 7,000 pairs for two-number rules) or in Z[w]: the cycles of $i^n$ (n from -40 to 40) and $w^n$; commutativity, additive inverse, $z \cdot \frac{1}{z} = 1$, $\frac{1}{z} = \frac{\bar z}{|z|^2}$; conjugates of sums, products and quotients; $|z_1z_2|^2$, $|z_1/z_2|^2$, $|\bar z|$, the triangle inequality; square roots (every Gaussian square with parts from -7 to 7 returns its root); $w^3 = 1$, $1 + w + w^2 = 0$, $(1 + 2w)^2 = -3$, $(a + bw + cw^2)(a + bw^2 + cw) = a^2 + b^2 + c^2 - ab - bc - ca$, $x^3 - 1 = (x - 1)(x - w)(x - w^2)$, agreement of Z[w] with $w = \frac{-1 + i\sqrt{3}}{2}$; the argument rules (about 6,900 pairs, mod $360^\circ$) and the polar round trip.
- **Re-solve:** 160 of 160 checks pass (`src/resolve.log`, gitignored). Every MCQ option is typed as an independent value (a float pair for a complex option, an exact Z[w] value, or the result of testing a property on a grid) and compared with a target recomputed from the givens, so exactly one option matches; numerical, fill-blank and model-answer numbers are recomputed in exact arithmetic or with unique-solution searches over integer ranges (for example the unique $x$, $y$ of a linear complex equation); proofs are checked on grids at every stage of the model answer.
- **Build self-checks:** every table cell, alt-text number, figure coordinate and worked example in `vis.mjs` is computed and asserted (arguments by atan2, exact roots by squaring, equilateral side lengths, parallelogram and triangle inequality for the plotted numbers).
- **KaTeX:** 2,027 maths strings parse in strict mode.
- **Pipeline checks:** stage-4 lint 0 errors, 0 warnings; verify-local 90 questions, 0 flags; doubled-backslash scan 0; `content originality --authored` reports this unit `ok` (0 errors).
- **Narration:** 45 slides, at most 74 words each (mean 52), no symbols or abbreviations.

## Originality

All set-ups, values and wording are this chapter's own. The CBSE 11 Mathematics ch04 deck and question stems were read and not reused: its numbers ($7 - 5i$, $i^{58}$, $(5 - 2i)(3 + 4i)$, $5 + 12i$, $\frac{2 + 9i}{1 - 2i}$, $3 - 4i$, $8 - 6i$ and $5 + 12i$, $-4 - 9i$, $1 - i$, $-2 + 2i$, $-\sqrt{3} + i$, $2 - 3i$ with $-1 + 4i$, $z + 3\bar z = 8 + 4i$), its contexts and its wording. This chapter uses different numbers throughout (for example $6 + i$ with $2 - 3i$, $14 - 5i$ over $4 + i$, $1 + 4i$ with $5 - 2i$, $-12 - 5i$ and $-15 + 8i$, $-4\sqrt{3} - 4i$, $3\sqrt{3} + 3i$) and ISC-only content (square roots of a complex number, cube roots of unity, the argument rules, full polar form with products and quotients, a distance and a locus on the Argand plane). Four stems and one fill-blank that the originality gate matched against CBSE 11 or this chapter's own items were reworded. No contexts or people appear.

## Known gaps

- Plots and the unit-circle and polar figures have not been seen rendered.
- Polar form of products is taught as a rule for moduli and arguments only; de Moivre's theorem for powers is left out because it is not in the ISC Class XI topic list.
- Circles and loci beyond $|z| = k$ and $|z - a| = |z - b|$ are not taught.
- The share of application-or-higher items (56%) is in the upper middle of the lint band because the chapter is computational; 40 of 90 items are recall or understanding.

## Assertion-reason options (2026-11-09)

Options aligned with the ISC 2027 Mathematics specimen paper (860): (a) both true, R explains A; (b) both true, R does not explain A; (c) A true, R false; (d) A false, R true. For this chapter the order is unchanged ((d) "Assertion is false and Reason is true"); only the wording now follows the specimen, so no key changed. Keys in bank order: a b c d a c. Tests are unchanged (same items in the same slots).
