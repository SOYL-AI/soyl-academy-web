# ISC Class 12 Mathematics — Chapter 5: Continuity and Differentiability (authored, v1)

Hand-authored production chapter (D-025, D-026) for ISC 2027 Mathematics (860), Paper I.

- **Author:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Style:** follows the CISCE 2027 specimen pattern (sources/cisce.md, anchor `isc-2027-specimen-860-mathematics`): 1-mark objective items including assertion-reason, then 2-, 3- and 5-mark questions, with the 5-mark ones set in parts (2 + 3) and internal choice.
- **Shared library:** builders come from `isc-12-mathematics-ch01/src/lib.mjs`, imported and not edited. Its `build()` also runs the stage-4 lint, the stage-5 deterministic checks and the exact-stem originality pre-check against every authored chapter.

## Scope (ISC 2027 syllabus, Unit 3)

- **t01 Continuity:**
  - continuity at a point by one-sided limits, and continuity on an interval;
  - constants that make piecewise functions continuous, including standard limits ($\frac{\sin u}{u}$, $\frac{e^u - 1}{u}$, $1 - \cos$) and rationalising;
  - the algebra of continuous functions.
- **t02 Discontinuity and its types:**
  - removable discontinuity, in both of its types: value undefined, and value different from the limit;
  - jump and infinite discontinuities;
  - repairing a removable discontinuity.
- **t03 Differentiability:**
  - one-sided derivatives, and differentiable implies continuous;
  - corners of $|x|$, $|2x - 3|$ and $|x - 1| + |x + 2|$, and steps of $[x]$ and $x[x]$;
  - smooth joins, where both the value and the slope must match.
- **t04 Derivatives and the chain rule:**
  - derivatives of trigonometric, exponential (including base $a$) and logarithmic functions;
  - chain rule with two and three layers.
- **t05 Inverse trigonometric derivatives:**
  - all six standard derivatives;
  - trigonometric substitution with a principal-range check, including a formula whose derivative changes sign between $|x| < 1$ and $x > 1$.
- **ISC split respected:** implicit, parametric, logarithmic and second-order differentiation are in ch06 (Methods of Differentiation) and appear nowhere in this chapter.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Continuity, discontinuity and differentiability" (t01–t03), 21 slides; Part 2 "Derivatives and the chain rule" (t04–t05), 19 slides |
| Visuals | 32 of 40 slides have one (9 plots, 17 tables, 6 flows); never more than 1 slide in a row without a visual |
| Plots | a continuous join; a removable gap with the misplaced stored value; a jump; an infinite break; $\lvert x\rvert$; the $[x]$ staircase; $e^x$ and $\log x$; $\sin^{-1} x$ with its tangent; $\tan^{-1}\frac{2x}{1 - x^2}$ against $2\tan^{-1} x$ |
| Worked examples | 3 + 4, each recomputed and asserted in `build.mjs` |
| Check slides | 4 + 4 on objective items used in neither test: m07, tf4, fb4, m14 (Part 1); fb2, m19, tf3, m24 (Part 2) |
| Notes | 6 sections with key terms, formulas and visuals; exam tips on ISC step marking and common mistakes |
| Flashcards | 30 |
| Questions | 71 items worth 125 marks, by type below |
| Difficulty | d1 8, d2 34, d3 26, d4 3 |
| Competency | recall 3, understanding 26, application 27, analysis 15: application or higher is 59% of items and 70% of marks |
| Tests | `t_isc12math_ch05_short` and `t_isc12math_ch05_long` (details below) |

**Short test** (`t_isc12math_ch05_short`), 20 marks in 50 minutes:
- Section A: m02, m05, m13, m17 and ar2.
- Section B: s201, then s203 or s206.
- Section C: s301, then s304 or s306.
- Section D: l01.

**Long test** (`t_isc12math_ch05_long`), 40 marks in 100 minutes:
- Section A: m01, m03, m06, m08, m10, m11, m15, m18, m20, m23, ar3 and ar4.
- Section B: s202, s204, then s205 or s209.
- Section C: s302, s303, s305, then s307 or s308.
- Section D: l02, then l03 or l04.

The two tests are disjoint, and both follow the `isc-12-default` blueprints item for item.

| Question type | Count |
|---|---|
| mcq | 26 (keys balanced by the lib: a7 b7 c6 d6) |
| assertion-reason | 5 (keys d a c a a) |
| true-false | 4 |
| fill-blank | 4 |
| numerical | 6 |
| short, 2 marks | 10 |
| short, 3 marks | 10 |
| long, 5 marks, set in parts | 6 (spares: l05 tariff, l06 simplify-first) |

## Verifier record

Run from `platform/`: `npx tsx content/authored/maths/isc-12-mathematics-ch05/src/build.mjs`.

- **Re-solve:** 118 of 118 checks pass (the log is `src/resolve.log`, gitignored).
  - **Continuity constants:** checked with one-sided limits evaluated numerically.
  - **Discontinuities:** classified by a `kind()` helper from the numeric one-sided limits and the value (removable, jump or infinite).
  - **One-sided derivatives:** checked with one-sided difference quotients.
  - **Derivative keys:** every MCQ option, model answer and value is compared with a central-difference derivative at three sample points.
  - **MCQ distractors:** evaluated the same way, so exactly one option matches.
  - **Substitution identities:** checked numerically on their intervals, including the sign change of $\frac{d}{dx}\sin^{-1}\frac{2x}{1 + x^2}$ for $x > 1$.
- **KaTeX:** 1,337 maths strings parse in strict mode.
- **Plots:** 22 marked points all lie on their curves. The stored value $g(4) = 5$ in the removable-gap plot is deliberately off the line and is marked `on_curve: false`. 5 marked zeros are verified.
- **Pipeline checks:** stage-4 lint 0 errors and 0 warnings; stage-5 deterministic checks 0 flags; exact-stem pre-check 0 collisions against all authored chapters, including CBSE 12 maths ch05.
- **Narration:** 40 slides, at most 64 words each (mean 43), with no symbols or letter abbreviations.
- **Originality:** all functions and set-ups are SOYL's own, as are the contexts (an imagined data logger, a spreadsheet formula, a Guwahati auto-rickshaw tariff, a damped signal). Common textbook functions were avoided, and no stem repeats the CBSE 12 ch05 bank.

## For a reviewer

- **Removable discontinuity:** taught in its two types, value undefined (f(a) missing) and value different from the limit. Jump and infinite discontinuities are described as non-removable. Some ISC texts also call the jump a "discontinuity of the first kind"; that name is not used here.
- **One-sided derivative notation:** written as $Lf'(a)$ and $Rf'(a)$ in the notes only.
- **The sign question m14:** $x + |x|$ is listed as having a corner at $0$ (one-sided slopes $0$ and $2$).
- **Not yet rendered:** nobody has seen the plots rendered. The removable gap and the jump cannot show hollow dots, so captions and alt text describe the open ends; these need a look at 360 px on staging.
