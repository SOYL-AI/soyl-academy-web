# ISC Class 12 Mathematics — Chapter 8: Indefinite Integrals: Standard Forms and Substitution (authored, v1)

This is a hand-authored production chapter (DECISIONS D-025, D-026), following the pattern of `isc-12-mathematics-ch01`.

- **Author:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`.
- **Status:** every item is `status: "draft"` until review.
- **Shared code:** builders come from the shared ISC 12 lib `isc-12-mathematics-ch01/src/lib.mjs`, imported and not edited. Numeric helpers are in `src/calc.mjs`, a copy of the CBSE 12 ch07 helpers.
- **Build:** from `platform/`, run `npx tsx content/authored/maths/isc-12-mathematics-ch08/src/build.mjs`. Edit `src/`, never the JSON.

## Scope (ISC 2027, Unit 3 Calculus)

- **t01** Integration as anti-differentiation and the constant of integration. Standard integrals of $(ax + b)^n$, $\dfrac1x$, $e^x$, $\sin x$, $\cos x$, $\sec^2 x$ and $\operatorname{cosec}^2 x$, plus $\sec x\tan x$. A linear inside $ax + b$ costs a factor $\dfrac1a$. Conditions fix $C$, for example cost, profit and temperature models with imagined data.
- **t02** $\sin^2 x$, $\cos^2 x$ and the fourth powers by the double-angle identity (used twice for fourth powers). $\sin^3 x$ and $\cos^3 x$ by keeping one factor, with products such as $\sin^2 x\cos^3 x$.
- **t03** Substitution. The forms $f'(x)[f(x)]^n$ and $\dfrac{f'(x)}{f(x)}$, exponentials, roots, $\log x$ and $\sqrt{x}$ substitutions. Derivations of $\displaystyle\int \tan x$, $\cot x$, $\sec x$ and $\operatorname{cosec} x$ (including $\log\left|\tan\dfrac x2\right|$).
- **Left out:** integration by parts, partial fractions and the special integrals of ISC ch09 appear nowhere. One MCQ distractor names a ch09 form only to rule it out.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Standard forms and powers of sine and cosine" (t01–t02), 18 slides; Part 2 "Integration by substitution" (t03), 17 slides |
| Worked examples | 4 + 4, each asserted in `build.mjs` (an antiderivative must differentiate back at sample points) |
| Visuals | 27 of 35 slides; at most 1 slide without a visual; 3 deck plots (family $x^2 + C$, $\sin^2 x$ with its antiderivative, $\tan x$ with $\log|\sec x|$), 16 tables, 8 flows |
| Check slides | 4 + 4 on objective items not used in either test (m04, tf1, fb3, m11; n03, m23, m16, tf4) |
| Notes | 6 sections, each with key terms, formulas and visuals; exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 67 items, 120 marks: mcq 25 (keys a7 b6 c6 d6), assertion-reason 6 (keys a a b a d a), true-false 4, fill-blank 3, numerical 4, short-2 9, short-3 10, long-5 6 (each set in parts, 2 + 3) |
| Difficulty | d1 10, d2 33, d3 21, d4 3 |
| Competency | recall 4, understanding 26, application 26, analysis 11 — application or higher 55% of items, 69% of marks (lint band 45–65%) |
| Tests | `t_isc12math_ch08_short` (20 marks / 50 min) and `_long` (40 marks / 100 min) on `isc-12-default-chapter-test-short/long`, item for item including the internal-choice groups; disjoint; no deck-check items |

## Verifier record

- **Numeric re-solve:** 122/122 checks pass (`src/resolve.log`, gitignored).
  - Every antiderivative is differentiated by central differences and compared with its integrand at 3–5 sample points inside its domain. That covers keys, all MCQ options (exactly one may differentiate back), model answers and both parts of every long answer.
  - Constants fixed by conditions are recomputed: $C(2) = 15$, $G(\tfrac{\pi}{4}) = 3$, $y(\tfrac{\pi}{2}) = \tfrac{\pi}{4} + 1$, $T(5) = 70 + 20e^{-2} \approx 72.7$.
  - The reduction identities for $\sin^4 x$ and $\cos^4 x$ are checked pointwise.
- **Build-time checks in `build.mjs`:** every table, worked example and flashcard formula is checked the same way, and the build stops on any mismatch.
- **Lint, verify and maths:**
  - KaTeX: 1,136 maths strings parse in strict mode.
  - Pipeline stage-4 lint: 0 errors, 0 warnings.
  - Stage-5 deterministic checks: 0 flags.
- **Originality:**
  - The lib's exact-stem check (prose with maths removed) finds no collision with any of about 13,000 stems in the repo, including CBSE 12 ch07 Integrals.
  - A 5-gram Jaccard near-duplicate scan (the originality gate's rule, threshold 0.7) finds 0 pairs.
  - Contexts and integrands are SOYL's own: a Nashik water tank, a Jalandhar cricket-ball maker, an Ooty ghat road profile and a Darjeeling canteen teapot. The textbook staples ($\int x^5$, $\int \sec x(\sec x + \tan x)$, $\int (\log x)^2/x$, $\int \frac{2x}{x^2 + 5}$) were deliberately avoided.

## For a reviewer

- **Notation:** $\log$ means the natural logarithm, as in ISC papers. Antiderivatives of $\dfrac1x$-type integrands keep the modulus unless the expression is always positive, such as $x^2 + 4$, $e^x + 1$, $3 + \sin x$ or $1 + \cos x$ on $(0, \pi)$.
- **`ar3`** is keyed (b): both statements are true, but the derivative of $\sec x$ does not explain $\int \tan x = \log|\sec x|$.
- **`l02`** asks students to show $\operatorname{cosec} x - \cot x = \tan\frac{x}{2}$.
- **`s310`** uses the half-angle identity $1 + \cos x = 2\cos^2\frac x2$, which is within t01 and t02 practice.
- **Rendering:** nobody has seen the plots rendered, so they need a look at 360 px on staging.

## Gaps / follow-ups

- Narration audio has not been generated (TTS stage).
