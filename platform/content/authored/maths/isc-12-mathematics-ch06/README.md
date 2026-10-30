# ISC Class 12 Mathematics — Chapter 6: Methods of Differentiation (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026), written to the standard of `isc-12-mathematics-ch01`.

- **Author:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`.
- **Status:** all items are `status: "draft"` until review.
- **Builders:** the shared ISC lib `isc-12-mathematics-ch01/src/lib.mjs`, imported and not edited here.

## Scope (ISC 2027, Unit 3: Calculus)

| Topic | Content |
|---|---|
| t01 | **Implicit functions.** Chain-rule factor $\dfrac{dy}{dx}$; slopes at points; horizontal and vertical tangents read from $\dfrac{dy}{dx} = \dfrac{N}{D}$. |
| t02 | **Parametric form.** $\dfrac{dy/dt}{dx/dt}$, including trigonometric parameters and a self-crossing curve. |
| t03 | **One function with respect to another.** $\dfrac{du/dx}{dv/dx}$; the substitution trick $\cos^{-1}(1 - 2x^2) = 2\sin^{-1} x$ on $0 < x < 1$. |
| t04 | **Logarithmic differentiation.** $x^{x}$, $x^{2x}$, $(\log x)^{x}$, $x^{1/x}$, sums of variable powers, long products and quotients, the finite tower $x^{x^{x}}$, and the endless tower $y = x^{y}$. |
| t05 | **Second-order derivatives.** Explicit, implicit ($x^2 + y^2 = 25$, $y^2 = 8x$, an oval) and parametric functions; proving relations between $y$, $y'$ and $y''$. |

**Removed topic absent:** derivatives of order higher than two appear nowhere. One flashcard and the notes state that the syllabus stops at second order.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Implicit, parametric and relative derivatives" (t01–t03), 20 slides. Part 2 "Logarithmic and second-order derivatives" (t04–t05), 21 slides. |
| Worked examples | 4 + 6, each recomputed and asserted in `build.mjs` |
| Visuals | 32 of 41 slides: 8 plots, 9 flows, 15 tables. At most 2 slides in a row lack a visual. Every notes section has a visual. |
| Check slides | 4 + 5, all objective items that appear in neither test (q001, q035, q012, q004; q017, q018, q037, q040, q033) |
| Notes | 6 sections with key terms, formulas and visuals; exam tips with how marks are given and 5 common mistakes |
| Flashcards | 30 |
| Questions | 66 items, 119 marks |
| Difficulty | d1 4, d2 30, d3 26, d4 6 |
| Competency | recall 1, understanding 28, application 26, analysis 11. That is 56% of items and 72% of marks at application or above (lint band 45–65%). |
| Tests | `t_isc12math_ch06_short` (20 marks, 50 min) and `t_isc12math_ch06_long` (40 marks, 100 min) on the `isc-12-default` chapter-test blueprints, item for item. The two tests share no items. |

**Questions by type:**

| Type | Count | Notes |
|---|---|---|
| mcq | 25 | keys after rotation a7 b6 c6 d6 |
| assertion-reason | 6 | keys a d a b a c |
| true-false | 3 | |
| fill-blank | 3 | |
| numerical | 4 | |
| short, 2 marks | 9 | |
| short, 3 marks | 10 | |
| long, 5 marks | 6 | each in parts, 2 + 3 or 2 + 2 + 1 |

## Verifier record

Build from `platform/` with `npx tsx content/authored/maths/isc-12-mathematics-ch06/src/build.mjs`. The build runs the numeric re-solve, KaTeX strict parsing, plot checks, narration rules, the pipeline's stage-4 lint and stage-5 deterministic verify, and the shared lib's exact-stem originality pre-check.

- **Re-solve:** 114/114 checks pass (`src/resolve.log`, gitignored). How each kind of answer is checked:
  - **Implicit slopes:** compared with $-F_x/F_y$ from numeric partial derivatives.
  - **Implicit second derivatives:** compared with a central second difference on a Newton-solved branch of the curve.
  - **Parametric slopes and second derivatives:** compared with central differences in $t$.
  - **"With respect to" answers:** compared with a ratio of two numeric derivatives.
  - **Logarithmic answers:** compared with a central difference of the original function.
  - **The endless tower:** computed by iteration, its fixed point checked, then differentiated numerically.
  - **MCQ distractors:** evaluated the same way, so that exactly one option matches.
  - **"Show that" relations:** checked at three sample points.
- **Lint:** 0 errors, 0 warnings.
- **Verify:** stage-5 deterministic checks raise 0 flags.
- **KaTeX:** 1,242 maths strings parse in strict mode.
- **Plots:** 16 marked points, all on their curves.
- **Originality:**
  - The exact-stem check (maths stripped) finds no collision with any other authored chapter. One stem, `l04`, first collided with ISC ch02 `q069` on the prose "Let … (a) Show that … (b) Hence prove that …" and was reworded.
  - A near-duplicate scan with the pipeline's own rule (5-gram Jaccard ≥ 0.7) over 13,322 stems finds 0 pairs involving this chapter.
  - Set-ups are SOYL's own (pendant outline, garden path, toy car, drone, gear-tooth, calibration curve and so on). Well-known textbook exercises were avoided: no $xy = e^{x - y}$, $(\tan^{-1} x)^2$, $e^{a\cos^{-1} x}$, cycloid or astroid.
- **Narration:** 41 slides, at most 61 words each (mean 43), with no symbols or letter abbreviations.

## Facts and conventions a reviewer should check

- $\log$ means the natural logarithm throughout, as in ISC usage.
- `s309`: the outline $x = 3\cos t - \cos 3t$, $y = 3\sin t - \sin 3t$ gives $\tan 2t$ by sum-to-product, verified numerically.
- `s304`: the result 2 holds on $0 < x < 1$ because $0 < 2\theta < \pi$. The stem gives the hint.
- `ar3`: the general relation $\dfrac{d^2y}{dx^2} = -\dfrac{d^2x/dy^2}{(dx/dy)^3}$ goes slightly beyond the syllabus wording. It is used only to explain why $y''$ is not the reciprocal of $x''$.
- `m20` and worked example 7: the endless tower is stated "on the interval where it converges". The interval itself, $e^{-e} < x < e^{1/e}$, is not examined.

## Gaps and follow-ups

- **Audio:** narration audio is not generated yet (TTS stage).
- **Parametric plots:** the self-crossing curve is drawn as a `series` of computed points, so the plot-point lint (which needs functions) does not check its two marked points. They are asserted in `build.mjs` instead.
