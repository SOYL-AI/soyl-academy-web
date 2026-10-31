# ISC Class 12 Mathematics — Chapter 12: Differential Equations (authored, v1)

This production chapter was hand-authored under D-025/D-026 by `claude-opus-5-5 (subject-producer)`. Provenance is `origin: "human"`, `model: null`, and every item is `status: "draft"` until review. It follows the pattern of ISC 12 ch01–ch10, and its builders come from the shared ISC lib `isc-12-mathematics-ch01/src/lib.mjs`, which is not edited here. Its numeric helpers in `src/ode.mjs` are an unchanged copy of `cbse-12-mathematics-ch09/src/ode.mjs`: central differences, residual of an equation along a solution, RK4, order and degree, and a numeric homogeneity test.

## Scope (ISC 2027 syllabus, Mathematics 860, Unit 3: Calculus)
- **t01:** order and degree (degree not defined when a derivative sits inside a function; radicals cleared first), general and particular solutions, verifying a solution.
- **t02:** forming a differential equation by eliminating arbitrary constants (one, two and three constants).
- **t03:** variable separable equations, and equations reducible to that form by $v = x + y$ (or $x + y + 1$).
- **t04:** homogeneous functions and equations, solved with $y = vx$.
- **t05:** linear equations $\dfrac{dy}{dx} + Py = Q$ and $\dfrac{dx}{dy} + Px = Q$, plus growth, decay and Newton's-law-of-cooling models.
- **Removed topic:** second-order differential equations are never *solved* here. They appear only as the result of eliminating two constants, and in "verify that … satisfies" items (`m04`, `m08`, `s301`, `s302`, `s310`, `l04`).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Order, degree, formation and separable equations" (t01–t03), 19 slides; Part 2 "Homogeneous and linear equations, growth and decay" (t04–t05), 18 slides |
| Worked examples | 5 per deck, each recomputed and asserted in `build.mjs` |
| Visuals | 29 of 37 slides have a visual (8 plots, 13 tables, 8 flows); never more than 2 slides in a row without one |
| Check slides | 4 + 4, none used in a test: fb1, m05, m03, m09; m13, m15, m20, tf4 |
| Notes | 6 sections, each with key terms and visuals; exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 68 items, 121 marks |
| Difficulty | d1 8, d2 35, d3 20, d4 5 |
| Competency | recall 1, understanding 30, application 26, analysis 11; 54% of items and 67% of marks at application or above (lint band 45–65%) |
| Tests | `t_isc12math_ch12_short` (20 marks, 50 min) and `t_isc12math_ch12_long` (40 marks, 100 min) on the `isc-12-default` blueprints; the two tests share no items |

Questions by type:

| Type | Count |
|---|---|
| mcq | 25 |
| assertion-reason | 6 (keys a a a d b c) |
| true-false | 4 |
| fill-blank | 3 |
| numerical | 5 |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6, each set in parts |

## Verifier record
The build runs the shared lib's checks: KaTeX strict parse (1,211 maths strings), lost backslashes, narration rules, plot points on their curves, step marks, pipeline stage-4 lint (0 errors, 0 warnings), stage-5 deterministic verify, and the exact-stem originality pre-check.

- **Re-solve:** 123/123 checks pass (`src/resolve.log`, gitignored).
- **Solutions:** every stated solution (keys, MCQ options, model answers) is substituted back into its equation, with derivatives by central differences at three or more points. General solutions are checked for two values of the constant.
- **Particular solutions:** also checked at the initial point, and against an RK4 integration of the initial-value problem.
- **Formed equations:** checked on two or more members of the family.
- **Other numerics:**
  - Homogeneity: tested numerically.
  - Integrating factors: checked through μ′/μ = P.
  - Word problems: checked against RK4, including the cooling time (14.9 min), the bee colony's doubling (6.21 months) and the village population (31,250).
- **Near-duplicates:** a scan with the originality gate's rule (word 5-grams, Jaccard ≥ 0.7, maths stripped) over 13,733 stems in the repo found 0 pairs involving this chapter.
- **Originality:**
  - Every equation and context is SOYL's own. The contexts are a Pune co-operative deposit, a Mumbai hospital tracer, a Hyderabad culture, masala chai in a Kolkata canteen, an apiary in Coorg, a village near Nashik, a Chennai water-tank study, a Bengaluru circuit and an iron tawa.
  - Equations in the CBSE 12 ch09 bank were deliberately not reused, and well-known textbook exercises were avoided, such as the circles touching the y-axis and $(x - y)\dfrac{dy}{dx} = x + 2y$.

## For a reviewer
- **`m21`:** treats $A$ and $B$ in $y = A\cos(x + B)$ as independent constants, so the order is 2.
- **`n03`:** uses $\log\left(v + \sqrt{1 + v^2}\right)$ as the integral of $\dfrac{dv}{\sqrt{1 + v^2}}$, the standard result from the ISC special integrals in ch09.
- **`s305`:** the solution is valid for $1 \le x < \sqrt{e}$, and the model answer says so.
- **`l06`:** uses $\int e^{x}\sin x\,dx = \dfrac{e^{x}(\sin x - \cos x)}{2}$, from integration by parts in ch09.
- **Rendering:** nobody has seen the plot labels rendered, so they need a look at 360 px on staging.
