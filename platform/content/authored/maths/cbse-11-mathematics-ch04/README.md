# CBSE Class 11 Mathematics — Chapter 4: Complex Numbers and Quadratic Equations (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026, D-050) written to the maths exemplar standard and the structure of the CBSE 12 Mathematics
chapters. Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` (builders, re-solve harness, validator, CBSE 11 chapter-test layout) and `src/lint.mts` are the shared CBSE 11 Mathematics copies, unchanged.
The shared lib stamps its own author string into provenance; `build.mjs` rewrites it to this chapter's author in `release.json` after the build.
`src/cx.mjs` holds this chapter's exact arithmetic: BigInt fractions, complex numbers with fraction real and imaginary parts (sum, product, quotient, conjugate, powers, squared modulus), exact surds for moduli, atan2 arguments, a quadratic solver that checks its roots by substitution, and the Argand-diagram and polar-form figure builders.

## Scope (2026-27 syllabus, 041)
- **t01** Need for complex numbers; algebra of complex numbers: the imaginary unit, $a + bi$, real and imaginary parts, powers of $i$ (cycle of four, negative exponents), equality, addition, subtraction, multiplication, reciprocal and division by the conjugate.
- **t02** Argand plane, modulus and conjugate: points $(a, b)$, quadrants, conjugate as a mirror image, sum as a parallelogram, modulus as distance (exact surds), $|z_1 z_2| = |z_1||z_2|$, $|z_1/z_2|$, $|\bar z| = |z|$, $z\bar z = |z|^2$, triangle inequality, $|z| = k$ as a circle.
- **t03** Polar form; quadratic equations in the complex number system — `board_assessed: false`, so formative only: one deck slide on polar form, one on principal arguments, one on complex quadratics (plus one worked example each), two of the seven notes sections, and a reduced share of the question items (13 of 65 carry topic t03, 20 %; two of them appear in the tests as single items).
- **Removed topics absent:** the chapter has none in the syllabus. Cube roots of unity, square roots of complex numbers, De Moivre and complex quadratics with complex coefficients are not taught (not in the topic list).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Complex numbers and their algebra" (t01) 20 slides; Part 2 "Argand plane, modulus, polar form and quadratic equations" (t02, t03) 19 slides |
| Worked examples | 3 + 3 (a product and a sum; a quotient $\dfrac{7 + 4i}{3 - 2i}$; find $x, y$ from equal complex numbers; modulus of $(2 + i)(3 - 2i)$ two ways; polar form of $-1 - \sqrt{3}\,i$; $x^2 + 2x + 5 = 0$) |
| Visuals | 27 of 39 slides (table 17, plot 6, flow 3, geometry 1; the 12 slides without a visual are goals, exam tips and the 8 check slides; max 1 slide in a row without one). Notes and questions: table 16, plot 7, geometry 2 |
| Check slides | 4 + 4, all objective (fb1, m05, n06, tf1; m13, fb3, tf6, n05), none used in the chapter tests |
| Notes | 7 sections, each with key terms, formulas and a visual; exam tips with a mark split and 8 common mistakes |
| Flashcards | 30 (formula 11, fact 7, definition 6, diagram 3, exam-tip 2, concept 1) |
| Questions | 65 items, 123 marks: mcq 19, assertion-reason 5 (keys a c d b a), true-false 5, fill-blank 5, numerical 6, short-2 8, short-3 7, long-5 6, case-based 4 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| MCQ keys | a 6, b 6, c 6, d 5 (rotated by the build) |
| Difficulty | d1 7, d2 28, d3 29, d4 1 |
| Competency | recall 3, understanding 26, application 33, analysis 3 — application or higher 55 % of items, 70 % of marks (lint band 45–65 % of items) |
| Topics | t01 32 items, t02 25, t03 13 |
| Tests | `t_cbse11math_ch04_short` (20 marks / 40 min: A m03 m09 m14 ar2; B s201 s207 s301; C l01 or l04; D c02) and `_long` (40 marks / 90 min: A m02 m04 m06 m08 m10 m12 m17 m11 + ar1 ar4; B s202 s205 [s204 s206] s302 [s303 s306]; C l02 [l03 l06]; D c01 c03), on `cbse-11-default-chapter-test-short/-long`; disjoint, and no deck-check item is used |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-ch04/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding is byte-identical, md5 checked twice for `release.json` and `tests.json`).
Lint this chapter: `npx tsx content/authored/maths/cbse-11-mathematics-ch04/src/lint.mts content/authored/maths/cbse-11-mathematics-ch04` (0 errors, 0 warnings).
`verify-local.mts` (numerical items need an "=" step ending at the key): 65 questions, 0 flags.

- **Re-solve:** 154/154 checks pass (`src/resolve.log`). Every complex number in a key, a distractor, a solution or a model answer comes from exact BigInt-fraction arithmetic (`cx.mjs`): sums, products, quotients, reciprocals, conjugates and powers of $i$ (also negative exponents, checked against $i^{n \bmod 4}$ for $n = -30 \dots 30$) are exact; products and quotients are cross-checked by multiplying back; moduli are exact surds (squared modulus is a fraction, the surd is simplified) and compared numerically with `Math.hypot` where a numeric key is used; arguments are computed with `atan2` and every polar form is expanded back to $a + bi$ with `r cos` and `r sin`; quadratic roots are checked by substitution (exactly with fractions when the roots are complex-rational, in floating point for surd roots), and sum and product of the roots are compared with $-b/a$ and $c/a$. Equality-of-parts items (find $x, y$; find $z$ from $z + 3\bar z$, $3z - 2\bar z$) are brute-forced over integer or half-integer grids and must have exactly one solution. MCQ options are typed independently of the text and compared with the re-solved answer (exactly one must match and it must be the key); distractors are the results of the plausible wrong method (forgetting $i^2 = -1$, dividing without the conjugate, treating the modulus as $a + b$, giving $|z|^2$ for $|z|$, omitting the division by $2a$, reading the related angle as the argument).
- **Build self-checks:** every table in the decks and notes (powers of $i$, sum and difference, product steps, conjugates, division steps, equality, modulus rules, arguments by position, roots of the three quadratics) is computed in `build.mjs` and the build throws if an assertion disagrees; the polar figure is built from computed coordinates and its $60^\circ$ and $150^\circ$ angles are measured by the lint.
- **Plots:** 47 marked points, all on their curves or deliberately free (`on_curve: false`: Argand points are not on a function); the circle plots mark only points off the real axis, so no zero of a plotted function is half-marked. Argand diagrams are plots with series segments from the origin and labelled points; no point carries a false label (`$z_1 + z_2$` is the computed sum).
- **KaTeX:** 1,412 maths strings parse with KaTeX in strict mode; no lost backslashes, no LaTeX outside `$…$`; a scan of `release.json` finds no bare command words inside maths.
- **Narration:** 39 slides, max 81 words, mean 53; no symbols, abbreviations or letter-digit mixes.
- **Stage-5 gates:** `npm run content -- originality --authored` reports this unit `ok` (0 errors, 0 warnings).
- **Originality:** no NCERT example or exercise set-ups are reused (no cube roots of unity, no $i^9 + i^{19}$, $(5i)(-\tfrac35 i)$, "$1 - 4i$" reciprocal sets, $x^2 + 3 = 0$ or $-3 \pm i\sqrt{\ldots}$ lists). The CBSE 10 chapter 4 and ICSE 10 chapter 5 quadratic stems were read: they have real roots only, and this chapter's quadratics all have a negative discriminant (fresh equations $x^2 + 2x + 10$, $x^2 + 6x + 25$, $3x^2 - 4x + 6$, $2x^2 - 6x + 5$, $x^2 - 10x + 169$, $x^2 + 4x + 29$) and no word problems with real roots. Fresh contexts: an imagined AC lab (impedances $8 + 6i$ and $2 - 3i$), a game screen with mirror and turn spells, a toy-spring equation, a robot arm in polar form, two relay towers of an imagined delivery company (conjugate towers $5 \pm 12i$).

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Argand diagrams are `plot` visuals with a series segment for each vector (no arrowheads); the polar figure is a `geometry` figure marked not to scale. Arrow tips and the argument arc are only drawn in the polar figure.
- Polar form and complex quadratics are `board_assessed: false`, so they stay light by design; the products and quotients in polar form, De Moivre's theorem, roots of unity and square roots of complex numbers are outside the syllabus list and are not covered.
- Only one d4 item (m20) and three analysis items: the board treatment of this chapter is procedural; the competency share is honest, not padded.
