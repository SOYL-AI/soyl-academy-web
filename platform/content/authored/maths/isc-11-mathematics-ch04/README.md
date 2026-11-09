# ISC Class 11 Mathematics - Chapter 4: Compound, Multiple and Sub-multiple Angles (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Mathematics (860), Paper I, Class XI portion, Unit 1.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` and `src/lint.mts` are unchanged copies of the shared ISC 11 Mathematics files (md5 of lib.mjs `363c4cfd...`). `src/trig.mjs` (exact arithmetic in Q(sqrt 2, sqrt 3), float grids) and `src/figs.mjs` (plot and unit-circle builders) follow the approach of the CBSE 11 ch03 helpers; `src/ids.mjs` is this chapter's identity registry; `src/h4.mjs` holds formatting helpers.

## Scope (syllabus.yaml, ISC 2028)

- **t01** Addition and subtraction formulae: $\sin(A \pm B)$, $\cos(A \pm B)$, $\tan(A \pm B)$, $\cot(A \pm B)$, $\tan(A + B + C)$ (with the special case $A + B + C = 180^\circ$); exact values such as $\sin 75^\circ$, $\tan 15^\circ$.
- **t02** Double, triple, half and one-third angle formulae ($\sin 2x$, $\cos 2x$, $\tan 2x$, $\sin 3x$, $\cos 3x$, $\tan 3x$, half-angle squares and tangent, one-third angle cubics); exact values such as $\cos 22.5^\circ$.
- **t03** Sum and difference to product ($\sin C \pm \sin D$, $\cos C \pm \cos D$).
- **t04** Product to sum or difference ($2\sin A\cos B$ and the other three).
- **Removed topics:** none listed. Trigonometric equations and conditional identities are not in the ISC topic list for this chapter and are not taught (CBSE 11 teaches equations; ISC lists the product formulae that CBSE 11 does not).

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Addition formulae and multiple angles" (t01, t02) 22 slides; Part 2 "Half-angle, one-third angle and product formulae" (t02-t04) 22 slides |
| Visuals | 35 of 44 slides carry one (every non-check slide; the 9 check slides carry none); never more than 1 slide in a row without a visual (flow 5, table 24, plot 5, geometry unit circle 1) |
| Worked examples | 5 + 6 |
| Check slides | 5 + 4, objective items used in neither test: tf1, fb1, tf2, fb2, tf3 (Part 1); fb3, tf4, fb4, fb5 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with a mark split and common mistakes |
| Flashcards | 30 (formula 22, concept 3, example 3, exam-tip 2) |
| Questions | 85 items, 145 marks: mcq 29, assertion-reason 6 (keys a b c d a c), true-false 8, fill-blank 7, numerical 7, short-2 10, short-3 11, long-5 7 (all in parts, 5-step schemes) |
| MCQ keys | a 8, b 7, c 7, d 7 after rotation by the build |
| Difficulty | d1 13, d2 33, d3 33, d4 6 |
| Competency | recall 7, understanding 25, application 43, analysis 10: application or higher is 62% of items, 70% of marks |
| Topics | t01 26 items, t02 38, t03 12, t04 12 (multi-topic items counted under each topic) |
| Tests | `t_isc11math_ch04_short` (20 marks, 50 min) and `t_isc11math_ch04_long` (40 marks, 100 min) |

**Short test:** A m02 m05 m11 m16 ar1; B s201, [s202, s208]; C s301, [s304, s309]; D l01.

**Long test:** A m03 m06 m09 m12 m14 m17 m19 m21 m22 m24 ar3 ar5; B s203 s205 [s207, s210]; C s303 s305 s307 [s306, s311]; D l03, [l04, l06].

The tests are disjoint and use no deck-check item. Spares (practice only): m01 m04 m07 m08 m10 m13 m15 m18 m20 m23 m25 m26-m29, ar2 ar4 ar6, s204 s206 s209 s302 s308 s310, l02 l05 l07, tf5-tf8 and the numerical, fill-blank and true-false items not used on slides.

## Verifier record

Run from `platform/`: `npx tsx content/authored/maths/isc-11-mathematics-ch04/src/build.mjs` (prints `NO ERRORS`; rebuilding twice gives byte-identical `release.json` and `tests.json`).

- **Identity registry (`src/ids.mjs`):** 36 identity families (sine, cosine, tangent, cotangent addition and subtraction; the four double-angle cosine and tangent-based forms; $\cos 4x$; $\sin 3x$, $\cos 3x$, $\tan 3x$ and their rewritings; the five half-angle forms; the two one-third angle relations; four sum-to-product and four product-to-sum formulae) plus $\tan(A + B + C)$ and the sum-equals-product relation. Each is tested numerically on a dense grid over $[-360^\circ, 360^\circ]$ (about 27,000 angle pairs for two-angle identities, about 480 angles for one-angle identities, undefined points skipped) and **exactly** in Q(sqrt 2, sqrt 3) at every admissible multiple of $15^\circ$ (up to 576 pairs; half-angle identities at multiples of $30^\circ$, one-third angle identities at multiples of $45^\circ$).
- **Re-solve:** 152 of 152 checks pass (`src/resolve.log`, gitignored). MCQ options are typed as independent numeric values (or expressions evaluated at five sample angle pairs) and compared with the re-solved target, so exactly one option matches; rational answers use exact fractions and are re-checked with an actual angle; surds are re-checked in Q(sqrt 2, sqrt 3) where possible; proofs are checked at sample angles in all quadrants and at every intermediate stage of the model answer.
- **Build self-checks:** every table cell, numerical-check column (quoted in the alt texts), unit-circle chord equality, plotted point and curve-coincidence claim is computed in `build.mjs` and asserted; the half-angle sign table is derived by sampling.
- **KaTeX:** 1,613 maths strings parse in strict mode.
- **Plots:** 5 deck plots + 5 notes plots; 26 marked points lie on their curves; the three zeros of the cubic plot are located numerically and all marked. Plots where two curves coincide (sine $2x$, cosine $3x$, the beats and the product-to-sum plot) are tested to coincide on 700 points.
- **Pipeline checks:** stage-4 lint 0 errors, 0 warnings; verify-local 85 questions, 0 flags; doubled-backslash scan 0; `content originality --authored` reports this unit `ok` (0 errors).
- **Narration:** 44 slides, at most 63 words each (mean 46), no symbols or abbreviations.

## Originality

All set-ups, values and wording are this chapter's own. The CBSE 11 Mathematics ch03 stems were read and not reused: its angles ($50^\circ$/$20^\circ$ numerical checks, $105^\circ$ and $165^\circ$ exact values, the $\tan 75^\circ$ and $\sin 20^\circ\sin 40^\circ\sin 80^\circ$ proofs, $\tan x = \frac{1}{5}, \frac{2}{3}$), its given ratios ($\frac{8}{17}$, $\frac{20}{29}$, $\frac{12}{13}$, $\frac{5}{13}$, $\frac{2}{7}$, $\frac{3}{4}$) and its equation and application items. This chapter uses different angles ($195^\circ$, $255^\circ$, $22.5^\circ$, $75^\circ$/$15^\circ$ products), different triples ($\frac{12}{37}$, $\frac{16}{65}$, $\frac{7}{25}$, $\frac{9}{41}$, $\frac{119}{169}$), and ISC-only content (cotangent formulae, $\tan(A + B + C)$, one-third angle cubics, sum-to-product and product-to-sum). Two assertion-reason stems that the originality gate matched against CBSE 11 / ISC 11 stems were reworded. No contexts or people appear.

## Known gaps

- Plots and the unit-circle figure have not been seen rendered.
- Half-angle exact values (e.g. $\cos 22.5^\circ$) are verified numerically and by squaring in the field, since the nested radicals lie outside Q(sqrt 2, sqrt 3).
- Competency share (62% application or higher) sits in the upper half of the lint band because the chapter's questions are largely computational.
- Practice-only case items are not included (the ISC blueprints have no case slot).

## Assertion-reason options (2026-11-09)

Options aligned with the ISC 2027 Mathematics specimen paper (860): (a) both true, R explains A; (b) both true, R does not explain A; (c) A true, R false; (d) A false, R true. For this chapter the order is unchanged ((d) "Assertion is false and Reason is true"); only the wording now follows the specimen, so no key changed. Keys in bank order: a b c d a c. Tests are unchanged (same items in the same slots).
