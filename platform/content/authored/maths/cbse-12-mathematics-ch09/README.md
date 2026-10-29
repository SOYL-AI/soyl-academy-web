# CBSE Class 12 Mathematics — Chapter 9: Differential Equations (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the structure of the
CBSE 10 maths chapters. Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`.
All items are `status: "draft"` until review. Shared builders come from `../cbse-12-mathematics-ch01/src/lib.mjs`.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Order, degree (defined only for a polynomial in derivatives; "not defined" cases taught explicitly), general and particular solutions, number of arbitrary constants = order, verifying a given solution by substitution.
- **t02** Variables separable: general and particular solutions, inverse-tangent and logarithmic forms, growth and decay (doubling times), Newton's law of cooling given as an equation.
- **t03** Homogeneous first-order first-degree equations: homogeneity test F(λx, λy) = λⁿF, the substitution y = vx, particular solutions, error-free return to x and y.
- **t04** Linear equations dy/dx + Py = Q and dx/dy + Px = Q: standard form, integrating factor (with a table of common ones), integration by parts inside the solution, particular solutions, constant-input models (drip, tank, savings with deposits).
- **Removed topic absent:** forming a differential equation by eliminating arbitrary constants is not taught or required anywhere; it is only named as deleted (deck 1 exam tips, notes section 3 and exam tips, flashcard f30).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Order, degree, solutions and separable equations" (t01–t02) 20 slides; Part 2 "Homogeneous and linear equations" (t03–t04) 20 slides |
| Worked examples | 5 + 6 (order/degree pair; verifying e⁻ˣ + 2x − 2; dy/dx = x(1 + y²); dy/dx = y cos x with y(0) = 2; food-blog growth; y/x + x/y; xy y′ = x² + 2y²; dy/dx + 3y = e⁻ˣ; cos x y′ + y sin x = cos²x; dx/dy + x = y + 1; a cooling bowl of soup) |
| Visuals | 29 of 40 slides (plot 11, table 14, flow 4); max 2 slides without a visual. Notes: 7 sections, each with a visual (plus 6 extra: verification table, growth plot, homogeneity table, linear flow, cooling and drip plots) |
| Check slides | 4 + 4, all objective (q025 tf, q004, q006, q040 numerical; q013, q014, q015, q017); none used in the tests |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (definition 6, example 7, formula 5, exam-tip 5, concept 4, fact 2, diagram 1) |
| Questions | 68 items, 132 marks: mcq 18, assertion-reason 6 (keys d b a c a d), true-false 5, fill-blank 5, numerical 6, short-2 9, short-3 8, long-5 6, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 8, d2 29, d3 25, d4 5, d5 1 |
| Competency | recall 6, understanding 25, application 27, analysis 10 — application or higher 54% of items, 70% of marks (lint band 45–65%) |
| Topics | t01 17, t02 20, t03 14, t04 20 (items may carry two topics) |
| Tests | `t_cbse12math_ch09_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests, worked-example self-checks), `src/questions.mjs` (bank + one independent
re-solve check per item), `src/ode.mjs` (central-difference derivatives, equation residual along a stated solution, RK4, order/degree
from a term structure, numeric homogeneity degree). Run from `platform/`:
`npx tsx content/authored/maths/cbse-12-mathematics-ch09/src/build.mjs`; lint this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch09`.

- **Numeric re-solve:** 118/118 checks pass (`src/resolve.log`). Every stated solution (keys, MCQ options, model answers, deck examples) is substituted back into its equation at 7 sample points with numeric first and second derivatives; wrong options must fail the same test and exactly one option must pass. Every particular value (y(1) = 5e, N(6) = 2700, V(10 log 2) = 25, 2√e, T(20) = 72.5, the case values 8000, 40 °C, ₹91106, 4 mg/L, t = 4 log 2) is recomputed by RK4 from the initial condition, not from the closed form. Integrating factors are checked through I′ = P·I; homogeneity degrees by F(λx, λy)/F(x, y) at several points and λ; the implicit answer of l02 (log y + y/x = 1) by integrating the equation numerically from (1, 1) and testing the relation at x = 0.6, 2 and 3.
- **Worked examples:** all 11 deck examples and the plotted solution families are re-verified in `build.mjs`; the build stops if any disagrees.
- **Visual checks:** 26 marked plot points lie on their curves and match their coordinate labels (e.g. the cooling points (5, 60), (10, 45), (15, 37.5); the family member through (1, 3)).
- **KaTeX:** 1379 math strings parse with KaTeX 0.19 in strict "error" mode; no Unicode maths symbols inside `$…$`; a scan for commands that lost their backslash (log, sin, cos, tan, sec, frac, text, left, right, lambda, pi) inside maths finds none (only `\operatorname{cosec}`).
- **Narration:** 40 slides, max 72 words, mean 51; no symbols, digit-letter mixes or letter abbreviations ("integrating factor" is always spoken in full).
- **Chapter-local gate runs:** stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks 0 flags on 68 questions; bank duplicates 0 within the chapter and 0 against the whole authored bank (8122 questions in 108 releases) after rewording two stems (s205, s301) that matched l01 once maths was stripped; no solution sentence of 60+ characters repeats student-facing text. Rebuilds are byte-identical.
- **Originality:** all equations, numbers and contexts are our own. Familiar textbook set-ups were deliberately avoided (e.g. x dy/dx + 2y = x² log x, (x + 3y²) dy/dx = y, (1 + e²ˣ) dy + (1 + y²)eˣ dx = 0, (x² + xy) dy = (x² + y²) dx, the dy/dx = e^{x+y} solve item is only used as an assertion about separability). Contexts: a Lucknow food blog, a Pune microbiology lab, a Delhi tea stall, a Chennai savings scheme, a Kochi hospital drip, an Ahmedabad design studio, a yeast culture, a leaking tank, a cooling metal rod and a bowl of soup.

## Facts a reviewer should double-check
- Notation: `log` means the natural logarithm throughout (CBSE convention); plot expressions use `ln`.
- s202 asks to "show" a family is a solution (verification), not to form the equation — this is within t01 and is not the deleted "formation" topic.
- l06 solves one equation both as homogeneous and as linear; c03 (ii) uses the linear method on dA/dt = 0.06A + 6000.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- `table` cells use inline `$…$` maths; renderers must support KaTeX in cells.
- Some plots use a function `domain` (the curve x² + y² = 2x⁴ is drawn only for x ≥ 0.75); horizontal reference lines (room temperature, the drip's steady level) are drawn as constant functions.
