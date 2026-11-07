# ISC Class 11 Mathematics - Chapter 7: Linear and Quadratic Inequalities (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Mathematics (860), Paper I, Class XI portion, Unit 2: Algebra.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` and `src/lint.mts` are unchanged copies of the shared ISC 11 Mathematics files (md5 of lib.mjs `363c4cfd...`). `src/ineq.mjs`, `src/iv.mjs` and `src/nl.mjs` are copies of the CBSE 11 ch05 exact-fraction, interval and number-line (allow-listed SVG) helpers; `src/rat.mjs` (exact polynomial factorisation and sign-chart solver for polynomial and rational inequalities, sign-chart tables) and `src/vis.mjs` (every computed visual) are written for this chapter.

## Scope (syllabus.yaml, ISC 2028)

- **t01** Algebraic solution of linear inequalities in one variable and representation on the number line (rules, brackets and fractions, double inequalities, no-solution and all-real cases, word problems, common part of two conditions).
- **t02** Quadratic inequalities by the method of intervals, including perfect squares (negative leading coefficient, quadratics with no real roots, "for every real x" conditions through the discriminant).
- **t03** Rational inequalities $\dfrac{f(x)}{g(x)}$ compared with a constant, excluding values that make the denominator zero (including an isolated zero from a square factor).
- **Removed topics:** none listed. The syllabus lists no modulus inequalities and no inequalities in two variables (graphical regions), so neither is taught (the CBSE 11 chapter on linear inequalities covers two-variable regions; ISC 11 does not).

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Rules, solving and the number line" (t01) 18 slides; Part 2 "Quadratic and rational inequalities" (t02, t03) 22 slides |
| Visuals | 31 of 40 slides carry one (every non-check slide; the 9 check slides carry none); never more than 1 slide in a row without a visual (table 19, flow 7, number line svg 3, plot 2) |
| Worked examples | 4 + 5 |
| Check slides | 4 + 5, objective items used in neither test: tf1, fb1, m05, fb5 (Part 1); m08, tf2, fb4, tf6, fb6 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with a mark split and common mistakes |
| Flashcards | 30 (formula 8, fact 8, exam-tip 7, definition 5, concept 2) |
| Questions | 77 items, 142 marks: mcq 22, assertion-reason 6 (keys a b c d a b), true-false 8, fill-blank 7, numerical 6, short-2 10, short-3 11, long-5 7 (all in parts, 5-step schemes) |
| MCQ keys | a 6, b 6, c 5, d 5 after rotation by the build |
| Difficulty | d1 7, d2 27, d3 33, d4 10 |
| Competency | recall 4, understanding 28, application 30, analysis 14, evaluation 1: application or higher is 58% of items, 73% of marks |
| Topics | t01 20 items, t02 41, t03 21 (multi-topic items counted under each topic) |
| Tests | `t_isc11math_ch07_short` (20 marks, 50 min) and `t_isc11math_ch07_long` (40 marks, 100 min) |

**Short test:** A m02 m09 m12 m17 ar1; B s202, [s203, s206]; C s301, [s305, s303]; D l01.

**Long test:** A m01 m04 m06 m10 m11 m14 m16 m18 m19 m22 ar3 ar4; B s201 s204 [s208, s209]; C s302 s304 s308 [s309, s310]; D l02, [l04, l05].

The tests are disjoint and use no deck-check item. Spares (practice only): m03 m07 m13 m15 m20 m21, ar2 ar5 ar6, tf3-tf5 tf7 tf8, fb2 fb3 fb7, n1-n6, s205 s207 s210, s306 s307 s311, l03 l06 l07.

## Verifier record

Run from `platform/`: `npx tsx content/authored/maths/isc-11-mathematics-ch07/src/build.mjs` (prints `NO ERRORS`; rebuilding twice gives byte-identical `release.json` and `tests.json`).

- **Solver (`src/rat.mjs`):** a polynomial is factored over the rationals by the rational root theorem and repeated synthetic division; what remains must be a constant or a quadratic with negative discriminant (so its sign is known), otherwise the build stops. The solution set is read from the sign chart (open regions between the critical points plus the critical points, poles never included). Every `solvePoly` / `solveRational` / linear `S` call then re-checks the interval list against the inequality itself by brute force: every x = k/420 with |x| <= 12 plus both sides of every end point and every end point's own membership, in exact BigInt-fraction arithmetic (about 10,000 points per inequality).
- **Re-solve:** 96 of 96 checks pass (`src/resolve.log`, gitignored). Every interval-valued MCQ option is the TeX of a set, compared with the re-solved target so exactly one option matches (the distractors are typed wrong-method sets: complement, closed instead of open ends, sign not reversed, multiplying a fraction by an expression of unknown sign); count and value items are recomputed by enumeration over integer ranges (for example the integers of $-7 \le 3x - 1 < 11$, the count of integer k for $x^2 + kx + 9 > 0$ by exact minimum plus a quarter-step grid); the model answers' sets are interpolated from the solver.
- **Parameter items:** "for every real x" conditions (m15, n5, s306, l04) are confirmed on a fine grid against the exact minimum of the quadratic before the answer is used.
- **Build self-checks (`vis.mjs`):** every table cell, number line, plotted point, alt-text number and worked example is computed and asserted (the sign-chart tables recompute the factor signs at an exact sample of each region and check them against the solver); the "tempting wrong method" slide computes the wrong set from the false step and tests four values against the true inequality.
- **KaTeX:** 1,730 maths strings parse in strict mode.
- **Pipeline checks:** stage-4 lint 0 errors, 0 warnings; verify-local 77 questions, 0 flags; doubled-backslash scan 0; `content originality --authored` reports this unit `ok` (0 errors).
- **Narration:** 40 slides, at most 76 words each (mean 51), no symbols or abbreviations.

## Originality

All set-ups, values and wording are this chapter's own. The CBSE 11 Mathematics ch05 (Linear Inequalities) and ICSE 10 ch04 stems were read and not reused: their linear inequalities ($6x - 13 \ge 2x + 9$, $5x - 9 < 2x + 12$, $4 - 3x \le 19$, $2 \le 5 - 3x < 14$, $-2 \le x < 4$, $3 < 8$ and $2 < 5$ as the rules examples, the lift, crate, water-delivery and stationery contexts, the two-variable regions) and their wording. This chapter uses different numbers ($8x - 7 < 3x + 18$, $-3x + 7 \ge 22$-type negative coefficients, $-4 \le \frac{7 - 3x}{2} < 5$, $-2 < 6$ for the rules table) and contexts (an imagined canteen plan, a poster, a farmer's plot, a rocket, a notice board). The quadratic and rational parts have no counterpart in the CBSE 11 chapter (CBSE removed them). Three stems that the originality gate's exact-prose rule matched against CBSE 11 items (an "over the real numbers" solution-set lead-in, a "find the sum of all integers" numerical and a "write the answer as an interval" short answer) were reworded. People and organisations are imagined and labelled as such.

## Competency record

No item was retagged after the first build. After the first build the application-or-higher share was 61%, above the 60% target; instead of changing labels, three genuinely easier spare items were added (tf7 recall, tf8 understanding, fb7 recall), which brought the share to 58%.

## Known gaps

- Plots and number-line SVGs have not been seen rendered; they follow the same builders as the CBSE 11 and ICSE 10 chapters.
- Irrational critical points are not used (the solver factors over the rationals only); the textbook examples with $x^2 - 4x + 1$-type roots are not covered, and the parameter items avoid them.
- Inequalities with the unknown in a fraction on both sides are not taught (the syllabus compares a fraction with a constant).
- t01 has fewer items (20) than t02 (41); the linear skills are also used inside the later items (double inequalities, common parts and the word problems).
