# ISC Class 11 Mathematics - Chapter 6: Quadratic Equations (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 2: Algebra.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib, copied unchanged. Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/qe.mjs` holds the exact arithmetic of this chapter.

## Scope (syllabus `isc-11-mathematics-ch06`, no removed topics)

- **t01** Fundamental theorem of algebra (statement); solving by the formula, including complex roots.
- **t02** Equations reducible to quadratic form: $y = x^2$, a repeated bracket, and $y = x + \frac{1}{x}$ for palindromic equations.
- **t03** Nature of roots by the discriminant, conjugate pairs (real versus rational coefficients), sum and product of roots, and the conditions for equal, reciprocal, equal-and-opposite, zero, twice-the-other and square-of-the-other roots.
- **t04** Forming equations from roots, symmetric functions, equations whose roots are functions of the roots ($\alpha^3, \beta^3$; $\alpha + \frac{1}{\beta}$), and common roots.
- **t05** Quadratic functions: sign for $a > 0$ and $a < 0$ in all three discriminant cases, graph, vertex, greatest or least value (with a fenced-rectangle model).
- Inequalities are in ch07 and complex-number arithmetic is in ch05; neither is taught here.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Solving, reducible equations and nature of roots" (t01-t03), 21 slides; Part 2 "Forming equations, common roots and quadratic functions" (t04-t05), 22 slides |
| Visuals | 34 of 43 slides have one (4 plots on slides, 22 tables, 8 flows); never more than 1 slide in a row without a visual |
| Worked examples | 6 + 7, each recomputed and asserted in `build.mjs` |
| Check slides | 4 + 5 on objective items used in neither test: m18, tf1, fb4, fb1 (Part 1); n1, tf3, tf5, tf4, fb5 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 30 |
| Questions | 64 items worth 110 marks: 21 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 5 numerical, 8 short-2, 9 short-3, 5 long-5 (in parts, 5 or 6 scheme steps) |
| Difficulty | d1 5, d2 28, d3 28, d4 3 |
| Competency | recall 3, understanding 27, application 28, analysis 6: application or higher is 53% of items and 65% of marks |
| MCQ keys | a 6, b 5, c 5, d 5; assertion-reason keys a d b c d a |
| Tests | `t_isc11math_ch06_short` and `t_isc11math_ch06_long` (details below) |

**Short test** (`t_isc11math_ch06_short`), 20 marks in 50 minutes:
- Section A: m02, m07, m10, m14 and ar1.
- Section B: s201, then s202 or s203.
- Section C: s301, then s302 or s303.
- Section D: l01.

**Long test** (`t_isc11math_ch06_long`), 40 marks in 100 minutes:
- Section A: m01, m03, m04, m05, m06, m08, m09, m11, m12, m13, ar2 and ar3.
- Section B: s204, s205, then s206 or s207.
- Section C: s304, s305, s306, then s307 or s308.
- Section D: l02, then l03 or l04.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m15 to m17, m19 to m21, ar4 to ar6, s208, s309 and l05.

## Verifier record (what the build computes and asserts)

- **Roots by exact substitution.** Roots live in the ring $\mathbb{Q}[s]$ with $s^2 = d$ ($d$ the discriminant, or $-1$, $-5$, $-14$ and so on for complex-surd roots). Every root offered as a key or distractor is substituted into its polynomial; every distractor is shown not to be a root. Real surd roots ($d > 0$) and non-real roots ($d < 0$) use the same code.
- **Sum and product.** `verifyQuad` checks both formula roots by substitution and that their sum and product equal $-\frac{b}{a}$ and $\frac{c}{a}$.
- **Symmetric functions.** $\alpha^2 + \beta^2$, $\alpha^3 + \beta^3$, $\frac{\alpha}{\beta} + \frac{\beta}{\alpha}$ and products are computed from the actual roots (including irrational and non-real ones) and compared with the $S$, $P$ formulas.
- **Formed equations.** Every equation formed from transformed roots ($\alpha + 1$, $\frac{1}{\alpha}$, $\alpha^2$, $\alpha^3$, $\alpha + \frac{1}{\beta}$) is tested by substituting the transformed roots; every equation formed from given roots is expanded back.
- **Root conditions.** The conditions $c = a$, $b = 0$, $c = 0$, $2b^2 = 9ac$ and $ac^2 + a^2c + b^3 = 3abc$ are brute-forced over thousands of integer equations with real roots (both directions), and the cube roots of unity are checked for the square condition. The common-root elimination relation is checked against the $k$-values of s305.
- **Parameters.** Every value of $k$ or $m$ is found independently by search over a range (for example $k = 6, 12$ in m13; $k = 8, -27$ in s304; $k = 4$ in n5, l03).
- **Functions and graphs.** Vertices, extreme values and intercepts are exact fractions; sign statements are tested on a grid; plotted points lie on their curves and every zero in range is marked.
- **Re-solve checks:** 126 of 126 pass. KaTeX parses 1660 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 64 questions, 0 flags. Doubled-backslash scan: total 0.

## Originality notes

- Same-topic models read and avoided: CBSE 10 ch04, ICSE 10 ch05 and CBSE 11 ch04. None of their equations ($x^2 - 5x - 14$, $3x^2 - 2x - 8$, $2x^2 - 6x + 5$, $x^2 + 2x + 10$, $x^2 + 6x + 25$, $3x^2 - 4x + 6$, $x^2 - 10x + 169$, $2x^2 - 9x + 10$, $x^2 - 6x + 4$ and the like) is used. Word problems of those chapters (ages, trains, pipes, areas with a quadratic model) are not reused; the application items here are a thrown ball, a fenced rectangle and parameter conditions.
- The rewording of one fill-blank (fb2) was needed after the exact-stem pre-check matched an ICSE 10 stem; it now reads differently.
- Content that is new to this bank: complex-root solving with simplified surds, conjugate-pair reasoning with real versus rational coefficients, palindromic equations, the $2b^2 = 9ac$ and square-of-the-other conditions, $\alpha^3, \beta^3$ and $\alpha + \frac{1}{\beta}$ transformations, common roots with elimination, and sign and extreme-value work.
- No textbook, past-paper or specimen text is reproduced; the ISC pattern (1-, 2-, 3- and 5-mark items, internal choice, 5-mark questions in parts) is followed from the blueprints only.

## Competency changes after the first build (honest retags)

- m06, fb2, n2, s205: application to understanding (one routine condition, then a linear or direct step).
- l05: analysis to application (the parts are guided; the reasoning is routine).
- No item was retagged upward to reach the band; the first build was already inside it.

## Known gaps

- Complex-number arithmetic beyond conjugates and modulus (polar form, De Moivre) is ch05's and is not used here.
- Quadratic inequalities are ch07's: items on the sign of a quadratic use sign patterns only.
- No case-based item (the ISC blueprints have no case slot).
