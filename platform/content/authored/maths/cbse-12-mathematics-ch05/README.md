# CBSE Class 12 Mathematics — Chapter 5: Continuity and Differentiability (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/`) and the structure of the CBSE 10 maths chapters. Author: `claude-opus-5-5 (subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review. Builders come from the shared CBSE 12 lib
`cbse-12-mathematics-ch01/src/lib.mjs` (not edited here).

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Continuity at a point and on an interval: the three-number test, jumps and removable gaps, unknown constants in piecewise functions (one and two constants, standard limits of $\dfrac{\sin u}{u}$, $\dfrac{e^u - 1}{u}$ and $1 - \cos$), algebra of continuous functions, the greatest integer function.
- **t02** Differentiability: one-sided derivatives, differentiable implies continuous (with proof), corners ($|x|$, $|x - 3|$, $|x + 1|$), smooth and non-smooth joins; chain rule with two and three layers.
- **t03** Derivatives of $\sin^{-1} x$, $\cos^{-1} x$, $\tan^{-1} x$ with the chain rule; implicit differentiation (slopes at points, second derivatives at a point).
- **t04** Exponential and logarithmic functions, $a^x$; logarithmic differentiation ($x^x$, $x^{\sin x}$, $(\sin x)^x$, $x^{3x} + (\cos x)^x$, long quotients).
- **t05** Parametric differentiation (first and second derivatives) and second-order derivatives, including "show that" relations.
- **Removed topic absent:** Rolle's and Lagrange's mean value theorems are not taught or required anywhere (one flashcard and the notes' exam tips say they are out of the 2026-27 syllabus). Tangents and normals (ch06, deleted there) are not used: slopes are described as derivatives only.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Continuity, differentiability and the chain rule" (t01–t02) 21 slides; Part 2 "Inverse trigonometric, implicit, logarithmic, parametric and second derivatives" (t03–t05) 23 slides |
| Worked examples | 4 + 5 (find $k$; all discontinuities of a three-piece function; a smooth join; $\sin^3 2x$; inverse trig with chain rule; implicit slope of $xy + y^2 = 6$; $x^{\sqrt{x}}$; $x = t^2$, $y = t^3$; $y'' - 2y' - 3y = 0$) — each recomputed in `build.mjs`, which stops if one is wrong |
| Visuals | 34 of 44 slides (deck: plot 14, table 15, flow 5); max 1 slide without a visual; every notes section has a visual |
| Check slides | 4 + 4, all MCQ (q002, q003, q006, q007; q010, q014, q015, q016) |
| Notes | 8 sections, each with key terms, formula(s) and a visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 32 (definition 2, concept 4, diagram 2, example 5, fact 4, exam-tip 6, formula 9) |
| Questions | 72 items, 139 marks: mcq 18, assertion-reason 6 (keys c a b d a d), true-false 5, fill-blank 5, numerical 8, short-2 10, short-3 9, long-5 6, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 5, d2 35, d3 27, d4 4, d5 1 |
| Competency | recall 4, understanding 34, application 24, analysis 10 — application or higher 47% of items, 66% of marks (lint band 45–65%) |
| Tests | `t_cbse12math_ch05_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-12-default-chapter-test-short/long` (A objective, B short 2/3 with choices, C long with choice, D case); disjoint |

## Verifier record
Build and checks: `src/build.mjs` (decks, notes, flashcards, tests, worked-example self-checks) and `src/questions.mjs` (bank + numeric
re-solve per item). Run from `platform/`: `npx tsx content/authored/maths/cbse-12-mathematics-ch05/src/build.mjs`; lint only this chapter
with `npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch05`.

- **Numeric re-solve:** 143/143 checks pass (`src/resolve.log`). Every derivative key (MCQ options, model answers, numerical values) is compared with a central-difference derivative of the original function at two or three sample points; MCQ distractors are evaluated the same way so exactly one option matches. Second derivatives use a second central difference. Continuity constants are checked with one-sided limits evaluated numerically; one-sided derivatives with one-sided difference quotients. Implicit slopes are checked against $-F_x/F_y$ from numeric partial derivatives (or an explicit branch of the curve); parametric slopes after eliminating $t$ (or by Newton inversion of $x(t)$ for $x = 3t - t^3$). Every "show that" relation is checked numerically at several points.
- **Plots:** 39 marked points all lie on their curves and match their labels; zeros marked on a curve are all its zeros in range; piecewise graphs use function domains.
- **KaTeX:** all maths strings parse with KaTeX in strict mode; a scan found no function name ($\log$, $\sin$, $\lim$ …) without its backslash.
- **Narration:** 44 slides, max 80 words, mean 55; no symbols, digits-with-letters or letter abbreviations ("d y by d x", "left-hand derivative").
- **Local pipeline checks:** stage-5 deterministic checks 72 questions, 0 flags; bank near-duplicate check within the chapter 0 flags; stage-4 lint 0 errors, 0 warnings.
- **Fixes during the pass:** exact-fraction model checks switched to string checks; four AR/MCQ items whose task is judging statements were tagged analysis, and three application items were added (q070–q072) to reach the lint band honestly; one stem reworded after the within-chapter duplicate check matched it to n02 once maths was stripped.
- **Originality:** contexts and numbers are SOYL's own (Coimbatore courier tariff, Bengaluru flyover approach, Hyderabad bacteria culture, Jaipur kite-festival balloon, Mysuru jogging track, Pune fixed deposit); familiar textbook functions were deliberately avoided (for example the implicit item uses $e^y + 2xy = e$ and the inverse-sine relation uses $y = e^{2\sin^{-1} x}$ with the $-4y$ term).

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Piecewise plots rely on the renderer honouring function `domain`; open/closed endpoints are described in alt text and captions, not drawn as hollow dots.
- The greatest integer function is drawn as three flat steps with domains ending at 0.999, 1.999, 2.999 so that no vertical connector is drawn.
