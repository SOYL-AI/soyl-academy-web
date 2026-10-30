# ISC Class 12 Mathematics — Chapter 9: Integration by Parts, Partial Fractions and Special Integrals (authored, v1)

This is a hand-authored production chapter (DECISIONS D-025, D-026) that follows the pattern of `isc-12-mathematics-ch01` and `isc-12-mathematics-ch08`.

- **Author:** `claude-opus-5-5 (subject-producer)`, with provenance `origin: "human"` and `model: null`.
- **Status:** every item is `status: "draft"` until review.
- **Shared code:** builders come from the shared ISC 12 lib `isc-12-mathematics-ch01/src/lib.mjs`, which is imported and not edited. The numeric helpers in `src/calc.mjs` are a copy of the ch08 helpers.
- **Build:** from `platform/`, run `npx tsx content/authored/maths/isc-12-mathematics-ch09/src/build.mjs`. Edit `src/`, never the JSON.

## Scope (ISC 2027, Unit 3 Calculus)

- **t01 Integration by parts:**
  - Choosing the first function in the order inverse trig, log, algebraic, trig, exponential.
  - $\log$ and $\tan^{-1}$ with $dv = dx$.
  - Integrals that reappear, such as $e^{ax}\sin bx$.
  - The pattern $e^x[f + f']$.
- **t02 Partial fractions:** linear factors, repeated linear factors, irreducible quadratic factors, and improper fractions (divide first).
- **t03 Quadratic forms:** $\dfrac{1}{x^2 \pm a^2}$, $\dfrac{1}{a^2 - x^2}$ and the square-root forms, reached by completing the square. Linear numerators $(px + q)$ are split into a multiple of the derivative plus a constant.
- **t04 Square roots of quadratics:** $\sqrt{a^2 - x^2}$, $\sqrt{x^2 \pm a^2}$, $\sqrt{ax^2 + bx + c}$ and $(px + q)\sqrt{ax^2 + bx + c}$.
- **t05 Trigonometric forms:**
  - $t = \tan\dfrac{x}{2}$ for $\dfrac{1}{a + b\cos x}$, $\dfrac{1}{a + b\sin x}$ and $\dfrac{1}{a\cos x + b\sin x + c}$.
  - Division by $\cos^2 x$ for $\dfrac{1}{a\cos^2 x + b\sin^2 x + c}$.
  - Writing the numerator as $A(\text{den}) + B(\text{den})'$.
- **t06 Special integrals:** $\dfrac{1 \pm x^2}{1 + x^4}$ (and a scaled version), $\sqrt{\tan x}$, and $\sqrt{\tan x} + \sqrt{\cot x}$.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1, "Integration by Parts and Partial Fractions" (t01–t02): 18 slides. Part 2, "Special Integrals" (t03–t06): 18 slides. |
| Worked examples | 5 + 4, each asserted in `build.mjs` (every antiderivative must differentiate back at sample points; every split must recombine) |
| Visuals | 28 of 36 slides; never more than one slide in a row without a visual. Types: 20 tables, 7 flows and 1 plot (the semicircle $y = \sqrt{9 - x^2}$). |
| Check slides | 4 + 4 on objective items used in neither test: m03, m04, m07, m10; m15, fb3, m21, m25 |
| Notes | 6 sections, each with key terms, a formula and visuals, plus exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 70 items worth 123 marks (counts below) |
| Difficulty | d1 6, d2 31, d3 25, d4 8 |
| Competency | recall 1, understanding 30, application 24, analysis 15. That puts 56% of items and 72% of marks at application or above (lint band 45–65%). |
| Tests | `t_isc12math_ch09_short` (20 marks in 50 min) and `_long` (40 marks in 100 min), on `isc-12-default-chapter-test-short` / `-long` |

| Question type | Count |
|---|---|
| mcq | 26 (keys a7 b7 c6 d6 after rotation) |
| assertion-reason | 7 (keys a a a c d b a) |
| true-false | 4 |
| fill-blank | 3 |
| numerical | 5 |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6, each set in parts (2 + 3 or 3 + 2) |

**Tests:** the two tests share no items.

| Test | A | B | C | D |
|---|---|---|---|---|
| Short | m02 m08 m13 m18 ar2 | s201, (s204 \| s205) | s301, (s304 \| s306) | l01 |
| Long | m01 m05 m06 m09 m12 m14 m17 m20 m22 m26 ar3 ar5 | s202, s203, (s206 \| s207) | s302, s303, s305, (s307 \| s308) | l02, (l04 \| l06) |

## Verifier record

- **Numeric re-solve: 129/129 checks pass** (`src/resolve.log`, which is gitignored).
  - Every antiderivative is differentiated by central differences and compared with its integrand at three to five points inside its domain. This covers keys, every MCQ option (exactly one may differentiate back), model answers and both parts of every long answer.
  - Every partial-fraction split and every completed square is compared with the original at sample points.
  - The $A(\text{den}) + B(\text{den})'$ constants are checked as identities.
- **KaTeX:** 1,063 maths strings parse in strict mode.
- **Pipeline checks:** stage-4 lint shows 0 errors and 0 warnings, and the stage-5 deterministic checks raise 0 flags.
- **Duplicate stems:**
  - The lib's exact-stem pre-check (prose with maths stripped) finds no collision with any other chapter, including CBSE 12 maths ch07 and ISC ch08.
  - A near-duplicate scan using the originality gate's rule (`nearDuplicates`, over 13,595 stems in the repo) finds 0 pairs.
- **Competency fix:** the first build came out at 69% application or above. Nine routine one-step items were retagged as understanding (m01, m02, m04, m06, m08, n01, n04, s203, s204).

## For a reviewer

- **Domains:** every answer states its interval. Examples: $x > 4$ for $\dfrac{1}{x^2 - 16}$; $(-\pi, \pi)$ for the half-angle substitution; $\left(0, \tfrac{\pi}{2}\right)$ for $\sqrt{\tan x}$; $x > 0$ for the special integrals with $\dfrac{x^2 - 1}{\sqrt2\,x}$.
- **`ar6`** is keyed (b). Both statements are true, but the oddness of $\tan x$ does not explain the $e^x[f + f']$ result.
- **`l06(a)`** gives $\dfrac{1}{2\sqrt2}\log\left|\dfrac{x^2 + \sqrt2 x + 1}{x^2 - \sqrt2 x + 1}\right|$. The sign comes from $\dfrac{1 - x^2}{1 + x^4} = -\dfrac{dt}{t^2 - 2}$ with $t = x + \dfrac1x$, and is verified numerically.
- **`s309`** uses $\sin x + \sqrt3\cos x = 2\sin\left(x + \dfrac{\pi}{3}\right)$ on $\left(-\tfrac{\pi}{3}, \tfrac{2\pi}{3}\right)$.
- **Originality:** all integrands are SOYL's own. The order for choosing $u$ is taught by name only on slides. Narration spells it out, because text-to-speech would read capital-letter abbreviations letter by letter.
- **Rendering:** nobody has seen the wide tables in the decks rendered at 360 px, so they need a look on staging.
