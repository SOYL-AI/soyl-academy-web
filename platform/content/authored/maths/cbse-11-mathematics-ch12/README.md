# CBSE Class 11 Mathematics — Chapter 12: Limits and Derivatives (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026, D-050) written to the maths exemplar standard and the structure of the CBSE 12 Mathematics chapters. Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` and `src/lint.mts` are the shared CBSE 11 Mathematics copies, unchanged. `src/calc.mjs` holds the exact helpers (BigInt fractions, polynomials with exact cancellation of `(x - a)` factors, numeric limits from both sides, five-point numeric differentiation, an exact first-principles check for polynomials). `src/visuals.mjs` holds every figure with its self-checks.

## Scope (2026-27 syllabus, 041)
- **t01** Intuitive idea of limits, left-hand and right-hand limits, algebra of limits, polynomial and rational functions (substitution, factorise and cancel), the standard limit `(x^n - a^n)/(x - a) = n a^(n-1)`, `sin x / x`, `tan x / x`, `(1 - cos x)/x` and `(1 - cos x)/x^2`, and the exponential and logarithmic limits `(e^x - 1)/x`, `ln(1 + x)/x`.
- **t02** Derivative as slope of the tangent and instantaneous rate of change; first principles for polynomials, a reciprocal, a square root, `sin x`, `cos x`.
- **t03** Algebra of derivatives (sum, difference, constant multiple, product, quotient); derivatives of polynomials (including negative and fractional powers) and of the six trigonometric functions.
- **t04** Chain rule is `board_assessed: false` (formative only): kept light (one concept and one worked-example slide, one notes section, two flashcards, one MCQ, 2 short items, flagged as formative in every stem).
- Not covered (outside the syllabus list): derivatives of `e^x` and `ln x`, limits at infinity, L'Hopital, continuity and mean value theorems (class 12).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Limits" (t01) 20 slides; Part 2 "Derivatives" (t02-t04) 21 slides |
| Worked examples | 5 + 6 |
| Visuals | 31 of 41 slides (tables, 5 plots, flow charts); max 1 slide in a row without one. Notes: 8 sections, each with visuals (tables 24, plots 6, flows 2) |
| Check slides | 4 + 4, all objective (m01 fb1 tf1 m02; m03 m04 tf2 fb2), none used in the tests |
| Notes | 8 sections with key terms, formulas and visuals; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (formula 14, exam-tip 6, fact 4, definition 3, concept 3) |
| Questions | 75 items, 143 marks: mcq 20, assertion-reason 6 (keys a d b c a d), true-false 6, fill-blank 6, numerical 7, short-2 10, short-3 9, long-5 7, case-based 4 (each 1 + 1 + 2 with an either/or part (c)) |
| MCQ keys | a 6, b 6, c 6, d 5 (rotated by the build) |
| Difficulty | d1 2, d2 27, d3 33, d4 11, d5 2 |
| Competency | recall 2, understanding 31, application 31, analysis 11: application or higher 56 % of items, 70 % of marks |
| Topics | t01 36 items, t02 14, t03 23, t04 3 |
| Tests | `t_cbse11math_ch12_short` (20 marks / 40 min: A m06 m11 m14 ar5; B s202 s205 s301; C l03 or l05; D c03) and `_long` (40 marks / 90 min: A m05 m07 m08 m09 m10 m12 m13 m15 + ar2 ar3; B s203 s204 [s206 s207] s302 [s304 s305]; C l01 [l04 l06]; D c01 c02), on `cbse-11-default-chapter-test-short/-long`; disjoint, no deck-check item used |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-ch12/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding is byte-identical, md5 checked for `release.json` and `tests.json`).
Chapter lint: 0 errors, 0 warnings. `verify-local.mts`: 75 questions, 0 flags. `dblslash.cjs` over `content/authored/maths`: total 0. `npm run content -- originality --authored`: this unit `ok` (0 errors, 0 warnings).

- **Re-solve:** 178/178 checks pass (`src/resolve.log`). Polynomial and rational limits are found by exact BigInt-fraction cancellation of `(x - a)` factors and re-checked by evaluating the original quotient exactly at `a +- 10^-k` (k = 2..6): the error must shrink on both sides. Trigonometric, exponential and logarithmic limits (and one-sided limits of split functions) are approached from both sides with shrinking h and must converge to the stated value. Every derivative in a key, distractor, solution or model answer is checked by five-point numeric differentiation at several points; polynomial derivatives are also compared exactly with the algebraic derivative and with the expanded product; first-principles algebra is verified as an exact identity in x and h at many rational values (e.g. `3x^2 + 2x - 1`, `1/(2x + 1)`, `2x^2 - 3/x`, the conjugate form for `sqrt(2x + 1)`, the sum-to-product identities for sine and cosine). MCQ options are typed independently and must single out the key; the conceptual options (which limit defines the derivative, product-rule and quotient-rule distractors, chain-rule options) are tested as functions against numeric differentiation. Existence and constant questions (`k = -6`, `a = 2`, `k = +-3`, `x = +-2`, rest times 2 and 3) are checked by exhaustive search over integers.
- **Build self-checks:** every number in a figure table is computed in `visuals.mjs` and the build throws on disagreement.
- **Plots:** 20 marked points, all on a plotted function or flagged `on_curve: false` (the hole `(0, 1)` of sin x / x); holes of removable discontinuities are marked on the line they interrupt and described in captions and alt text; the zeros of tan x in range (only the origin) are marked.
- **KaTeX:** 1,499 maths strings parse in strict mode; no lost backslashes.
- **Narration:** 41 slides, max 84 words, mean 59; numbers in words, no symbols or abbreviations.

## Originality
CBSE 12 ch05 (continuity and differentiability) and ch06 stems were read first. Avoided: its continuity set-ups, `(x^2 - 9)/(x - 3)`, `(1 - cos 4x)/x^2`, `sin 5x / 3x`, `(2x + 1)^5`, `(3x^2 - 1)^4`, `sin(x^3)`, `sqrt(1 + 4x^2)`, `tan^-1`, implicit, logarithmic and parametric differentiation. Every stem names its own content; the originality gate first flagged generic derivative lead-ins and five stems were rephrased. NCERT examples and exercises were not used. Contexts are imagined (toy car, bead on a wire, marble in a groove, weather station, glass tank, pendulum, potter's studio).

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- A removable hole is shown as a marked point on the continuing line (the plot kind cannot draw an open circle); captions explain it.
- Derivatives of `e^x` and `ln x` are not covered (not in the topic list); the limits `(e^x - 1)/x` and `ln(1 + x)/x` are.
