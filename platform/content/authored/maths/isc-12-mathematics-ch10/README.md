# ISC Class 12 Mathematics — Chapter 10: Definite Integrals (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026), following the pattern of `isc-12-mathematics-ch01` and `isc-12-mathematics-ch08`. Author `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`; every item is `status: "draft"` until review. Builders come from the shared ISC 12 lib `isc-12-mathematics-ch01/src/lib.mjs` (imported, not edited). Numeric checks use `src/calc.mjs`: tanh-sinh quadrature split at kinks and jumps, which never evaluates the endpoints, so integrable endpoint singularities such as $\log\sin x$ at $0$ are handled. Build from `platform/`: `npx tsx content/authored/maths/isc-12-mathematics-ch10/src/build.mjs`. Edit `src/`, never the JSON.

## Scope (ISC 2027, Unit 3 Calculus)
- **t01** Fundamental theorem of calculus, stated **without proof** (its proof is in the removed list). Evaluation; substitution with changed limits; why the theorem fails for $\int_{-1}^{1} x^{-2}\,dx$.
- **t02** Dummy variable, reversal of limits, splitting the interval; modulus integrands (split at sign changes) and greatest-integer integrands, for example $[x]$, $[x + \tfrac12]$, $[2x]$, $[x^2]$ and $x[x]$.
- **t03** $\int_a^b f(x)\,dx = \int_a^b f(a + b - x)\,dx$ and $\int_0^a f(x)\,dx = \int_0^a f(a - x)\,dx$, with "reflect and add". Covers quotients of powers and roots, $2^{\sin x}$ forms, $\log\tan x$, $x f(\sin x)$ on $[0, \pi]$, and $\log(3\sin x\cos x)$ from the given value of $\int_0^{\pi/2}\log\sin x\,dx$.
- **t04** The $[0, 2a]$ property, both doubling and zero cases; even and odd functions on $[-a, a]$, including splitting a mixed integrand into even and odd parts.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Evaluation, substitution and basic properties" (t01–t02), 18 slides; Part 2 "Reflection, symmetry, even and odd functions" (t03–t04), 18 slides |
| Worked examples | 4 + 4, each recomputed in `build.mjs` |
| Visuals | 28 of 36 slides carry one: 7 plots (signed area, modulus, staircase, reflection, odd, even, $\sin^3 x$), 16 tables and 5 flows. No more than 2 slides in a row lack a visual. |
| Check slides | 4 + 4, on items in neither test: m05, fb1, n06, m12; m15, n03, m19, tf2 |
| Notes | 6 sections with key terms, formulas and visuals; exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 68 items worth 121 marks: mcq 25 (keys a7 b6 c6 d6), assertion-reason 6, true-false 3, fill-blank 3, numerical 6, short-2 9, short-3 10, long-5 6 (each set in parts, 2 + 3) |
| Difficulty | d1 14, d2 28, d3 19, d4 7 |
| Competency | recall 6, understanding 24, application 23, analysis 14, evaluation 1. That is 56% of items and 73% of marks at application or above (lint band 45–65%). Nine routine one-step items were moved to understanding under D-035. |
| Tests | `t_isc12math_ch10_short` (20 marks / 50 min) and `_long` (40 marks / 100 min) on `isc-12-default-chapter-test-short/long`, item for item including the internal-choice groups. Disjoint, and no deck-check items. |

## Verifier record
- **Numeric re-solve:** 134/134 checks pass (`src/resolve.log`, gitignored).
  - Every key, every MCQ option value (exactly one may equal the integral), every numerical answer and every value in a model answer is recomputed by quadrature and compared with its exact form.
  - The worked examples, tables and flashcard values in `build.mjs` are checked the same way, and the build stops on any mismatch.
- **Lint and verify:** 0 errors and 0 warnings (stage 4). The stage-5 deterministic checks raise no blocking flags. KaTeX parses 984 maths strings in strict mode.
- **Originality:**
  - The lib's exact-stem pre-check found no collisions.
  - A near-duplicate scan used the originality gate's rule (5-gram Jaccard ≥ 0.7, maths stripped) against 13,207 stems in `content/authored`. It found 0 pairs.
  - All integrands and contexts are SOYL's own. Familiar textbook exercises were avoided on purpose, for example $\int_0^{\pi/2}\log\sin x$ is given rather than derived, $\int_0^{\pi/4}\log(1 + \tan x)$ is not used, and $\int_0^\pi \dfrac{x\sin x}{1 + \cos^2 x}$ is not used.

## For a reviewer
- `ar4` is keyed (d). The assertion applies the fundamental theorem to $\int_{-1}^{1} x^{-2}\,dx$, which is invalid because the integrand is unbounded at $0$. Tagged evaluation.
- `m16` and `s306` get $\int_0^\pi x\sin x\,dx$ and $\int_0^\pi x\sin^3 x\,dx$ by reflection, with no integration by parts (ch09).
- `l02(b)` gives $\int_0^{\pi/2}\log\sin x\,dx = -\tfrac{\pi}{2}\log 2$ as known and uses P4 to equate the $\log\cos$ integral. The answer is $\tfrac{\pi}{2}\log\tfrac34$.
- The greatest-integer plot draws three flat steps (domains end at 0.999 and 1.999); open ends are described in the alt text, not drawn.
- `log` means the natural logarithm throughout.
- Plot labels have not been seen rendered; check them at 360 px on staging.
