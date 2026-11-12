# ISC Class 11 Mathematics - Chapter 17: Derivatives (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 4: Calculus.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib (unchanged copy). `src/calc.mjs` holds the chapter's helpers: an expression engine (one string gives both the printed TeX and the function that is tested), central-difference and forward-difference checks, and exact Laurent polynomials on fractions. `src/fr.mjs` is the exact fraction class; `src/vis.mjs` holds the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch17`, no removed topics)

- **t01** The derivative as a rate of change (average and instantaneous velocity of a body from a distance-time function) and as the slope of a tangent; secants approaching a tangent; the tangent at a point, and the point where the slope has a given value.
- **t02** Differentiation from first principles: $x^n$ (binomial theorem), $\sqrt{x}$, $\dfrac{1}{x+a}$, $x^{-2}$, $\sin x$, $\cos x$, $\sin 2x$, $\cos 3x$ and quadratics; the derivative at a point from $\lim_{x \to a}$.
- **t03** Constant multiples, sums and differences; the product rule and the quotient rule with checks (expanding, a value of $x$).
- **t04** Standard derivatives of polynomial and trigonometric functions (sin, cos, tan, sec, cosec, cot) with the rules; a derivative at a point; slope, horizontal tangent and simple rate questions.
- **Scope decision:** the chain rule beyond a linear argument, implicit and logarithmic differentiation, second derivatives and maxima/minima belong to ISC 12 and are not taught or tested. A linear argument ($\sin 3x$, $\cos(2x - 1)$) is used with the factor stated, and $(ax + b)^2$ is expanded before differentiating. Normals are not in the ISC topic list and are not used.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Rate of change, tangents and first principles" (t01-t02), 20 slides; Part 2 "Rules and standard derivatives" (t03-t04), 21 slides |
| Visuals | 35 of 41 slides have one (27 tables, 3 flows, 5 plots: distance-time graph with secant and tangent, secants approaching a tangent, a tangent to a quadratic, horizontal tangents, a tangent to a trigonometric curve); the 6 check slides have none, so never more than 1 slide in a row without a visual |
| Worked examples | 6 + 7, each recomputed and asserted in `vis.mjs` |
| Check slides | 3 + 3 on objective items used in neither test: fb1, n1, tf4 (Part 1); fb2, tf2, n2 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 30 |
| Questions | 72 items worth 132 marks: 20 mcq, 6 assertion-reason, 6 true-false, 6 fill-blank, 6 numerical, 10 short-2, 11 short-3, 7 long-5 (in labelled parts, 5 scheme steps each) |
| Difficulty | d1 7, d2 24, d3 33, d4 8 |
| Competency | recall 4, understanding 25, application 38, analysis 5: application or higher is 60% of items and 74% of marks |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a a d b c d |
| Tests | `t_isc11math_ch17_short` and `t_isc11math_ch17_long` (details below) |

**Short test** (`t_isc11math_ch17_short`), 20 marks in 50 minutes:
- Section A: m04, m06, m10, m11 and ar3.
- Section B: s202, then s205 or s209.
- Section C: s307, then s304 or s310.
- Section D: l04.

**Long test** (`t_isc11math_ch17_long`), 40 marks in 100 minutes:
- Section A: m01, m02, m03, m05, m08, m09, m14, m15, m17, m19, ar2 and ar5.
- Section B: s201, s204, then s206 or s208.
- Section C: s301, s303, s306, then s308 or s311.
- Section D: l01, then l03 or l06.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m07, m12, m13, m16, m18, m20, ar1, ar4, ar6, tf1, tf3, tf5, tf6, fb3 to fb6, n3 to n6, s203, s207, s210, s302, s305, s309, l02, l05 and l07.

## Verifier record (what the build computes and asserts)

- **Every derivative is checked numerically.** Each claimed derivative (options, keys, model answers, table entries) is compared with the central difference $\dfrac{f(x + h) - f(x - h)}{2h}$ at $h = 10^{-5}$ at 5 to 7 sample points chosen inside the domain (positive values for roots and reciprocals, $(0, \pi/2)$ for tan, sec, cosec and cot).
- **Option text is the tested function.** MCQ options and many answers are written once as an expression string (`calc.mjs`, `E(...)`); the same string produces the printed TeX and the function used in the check, so the text cannot differ from what was tested. For each derivative item exactly one option matches the derivative of the function and all options are asserted pairwise distinct as functions.
- **Exact arithmetic for polynomials.** Derivatives, product-rule results, expansions and quotient numerators ($u'v - uv'$) of polynomial items are recomputed on exact fractions (`Poly`), and zeros of derivatives are found by exact evaluation over integers or the stated fractions.
- **First principles.** Each simplified difference quotient shown (for example $12 + 3h$, $4x + 2h - 3$, $\dfrac{1}{\sqrt{x + h} + \sqrt{x}}$, $2\cos(2x + h)\dfrac{\sin h}{h}$) is asserted equal to $\dfrac{f(x + h) - f(x)}{h}$ at several pairs $(x, h)$ including negative $h$, and its limit is compared with the derivative; the forward quotient at $h = 10^{-6}$ is checked at chosen points. The table of $\dfrac{\sin h}{h}$ and $\dfrac{\cos h - 1}{h}$ is computed and asserted to approach $1$ and $0$.
- **Figures.** Each tangent line is built from the derivative (slope checked by central difference), marked points are asserted on the curve and on the lines through them, secant slopes are computed exactly (4, 3, then the tangent slope 2), and no marked point is a zero of a plotted function.
- **Distractors** each come from a named wrong method (for example the product of derivatives, $u'v - uv'$ in a product, a lost minus sign in cos, cosec or cot, $(x + h)^2 = x^2 + h^2$, distance read as velocity, a missing factor from a linear argument) and are asserted to be wrong.
- **Re-solve checks:** 134 of 134 pass. Stage-4 lint: 0 errors, 0 warnings. `verify-local`: 72 questions, 0 flags. Doubled-backslash scan: total 0. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The CBSE 11 Mathematics ch12 (Limits and Derivatives) derivative items use the functions $x^2 - 5x$, $2x^2 - \dfrac{3}{x}$, $\sqrt{2x + 1}$, $\cos x$ from first principles, $x\sin x$, $\dfrac{x - 1}{x + 2}$, $(3x - 1)(x^2 + 4)$, $\dfrac{1 + \sin x}{\cos x}$, $x^3 - 12x + 5$ and a chain-rule block. None is reused: this chapter uses $4x^2 - 3x + 7$, $\dfrac{1}{2x + 1}$, $\dfrac{1}{x + 5}$, $\sqrt{x + 4}$, $\dfrac{1}{x^2}$, $\cos 3x$, $\sin 3x$, $x\sec x$, $\dfrac{\sin x}{1 + \cos x}$, $\dfrac{2x + 1}{x - 3}$, $y = 2x^3 - 9x^2 + 12x - 4$ and so on, in new contexts (hand-cart, bead on a wire, toboggan, rail wagon, robot arm, reservoir, culture, pendulum bob).
- Four stems matched stems of CBSE 11 ch12 or of this chapter once the maths was removed (a "using the definition ... find" stem, "find the slope of the tangent ... at the point where", "differentiate ... and collect the terms", "find the equation of the tangent ... at the point where"); each was reworded and the gate reports 0 errors.
- No CISCE specimen or past-paper question is reproduced. All people and places are imagined or absent.

## Known gaps

- Second derivatives, the chain rule beyond a linear argument, implicit or logarithmic differentiation, and maxima/minima are out of scope (ISC 12).
- Normals to a curve are not in the ISC topic list for this chapter and are not taught.
- No case-based item (the ISC 11 blueprints have no case-based slot).
