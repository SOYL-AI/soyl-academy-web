# CBSE Class 12 Mathematics — Chapter 7: Integrals (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the structure of the
CBSE 10 maths chapters. Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`.
All items are `status: "draft"` until review. Shared builders come from `../cbse-12-mathematics-ch01/src/lib.mjs`.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Integration as anti-differentiation: antiderivative families, constant of integration (fixed by a point), linearity, the standard table (powers, 1/x, eˣ, aˣ, trigonometric).
- **t02** Substitution: f(g(x))g′(x), f′/f, ∫tan, cot, sec, cosec; trigonometric powers via identities (sin², cos², tan², sin³).
- **t03** Special forms: dx/(x² ± a²), dx/(a² − x²), dx/√(x² ± a²), dx/√(a² − x²), completing the square, (px + q)/(ax² + bx + c) and its square-root variant.
- **t04** Partial fractions: distinct linear, repeated linear and linear × irreducible quadratic factors; improper fractions divided first.
- **t05** By parts: ILATE choice of u, repeated parts and solving for I (e²ˣ sin x), ∫log x, the eˣ[f + f′] pattern, ∫√(a² ± x²) and ∫√(x² − a²).
- **t06** Definite integrals: fundamental theorem (stated without proof), new limits on substitution, splitting at the zero of a modulus, a + b − x and a − x properties, odd/even functions.
- **Removed topic absent:** the definite integral as the limit of a sum is not taught or required anywhere; it is only named as deleted (deck 1 exam tips, notes section 6, flashcard f30).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Antiderivatives, substitution and special forms" (t01–t03) 20 slides; Part 2 "Partial fractions, integration by parts and definite integrals" (t04–t06) 21 slides |
| Worked examples | 5 + 7 (term by term; x² cos x³; tan² x; complete the square for x² − 8x + 25; (4x + 1)/(x² + 2x + 10); distinct factors; repeated factor; x sec² x by parts; eˣ(tan x + sec² x); 2x e^{x²} on [0, 1] with new limits; odd/even split on [−1, 1]; the mirror property on √x/(√x + √(4 − x))) |
| Visuals | 30 of 41 slides (plot 10, table 16, flow 4); max 1 slide in a row without a visual. Notes: 7 sections, each with a visual (plus 1 extra) |
| Check slides | 4 + 4, all objective (q001, q006, q010, q035; q013, q015, q039, q019); none is used in either test |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (formula 13, exam-tip 5, concept 3, example 3, fact 3, definition 2, diagram 1) |
| Questions | 70 items, 135 marks: mcq 20, assertion-reason 6 (keys a b c d a b), true-false 5, fill-blank 5, numerical 6, short-2 9, short-3 8, long-5 7, case-based 4 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 8, d2 27, d3 28, d4 7 |
| Competency | recall 6, understanding 27, application 31, analysis 6 — application or higher 53% of items, 67% of marks (lint band 45–65%) |
| Topics | t01 13, t02 12, t03 9, t04 6, t05 12, t06 25 (items may carry two topics) |
| MCQ keys | a 6, b 6, c 6, d 6 (after the builder's rotation) |
| Tests | `t_cbse12math_ch07_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests, worked-example self-checks), `src/questions.mjs` (bank + one independent
re-solve check per item), `src/calc.mjs` (central-difference derivative, antiderivative test at sample points, composite Simpson's
rule). Run from `platform/`: `npx tsx content/authored/maths/cbse-12-mathematics-ch07/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch07`.

- **Re-solve:** 138/138 checks pass (`src/resolve.log`), none qualitative. Every indefinite answer (keys, every MCQ option, model answers) is differentiated numerically and compared with the integrand at 3–4 sample points, so exactly one MCQ option passes; every definite value is recomputed by Simpson's rule (20,000–200,000 panels, kinks of |·| handled by tolerance); every partial-fraction split is evaluated on both sides at sample points; case parts recompute volumes, distances and costs from the stated rate functions.
- **Worked examples:** all 12 deck examples and the two shaded-area plots are recomputed in `build.mjs`, which throws on any mismatch.
- **Plots:** 19 marked points lie on their curves and match their labels; the one marked zero (|x − 1| at x = 1) is the only zero in range; the crossing point (2, 0.5) of the two mirror curves lies on both.
- **KaTeX:** 1099 math strings parse in strict mode; a separate scan found no maths command that lost its backslash (`log`, `sin`, `int`, `dfrac`, … always preceded by `\`), no literal `\n`, no control characters.
- **Stage 4/5/6 on this chapter:** chapter lint 0 errors, 0 warnings; deterministic verify checks 0 flags (one minor flag on fb3 fixed by naming the accepted answer in the solution); within-chapter duplicate check 0 flags; the release and both tests parse with `ChapterRelease` / `TestDefinition`.
- **Rebuild** is byte-identical (release.json, tests.json, resolve.log).
- **Originality:** every integrand, limit and context is my own choice; the textbook's signature examples (e.g. ∫₀^π x/(1 + sin x), ∫₋₁² |x³ − x|, ∫₀^{π/2} √sin x/(√sin x + √cos x)) were deliberately avoided. Cases: a Chennai apartment tank, a Mysuru cyclist, a Ludhiana hosiery unit's marginal cost, a Lucknow e-rickshaw between signals.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- No d5 item; the hardest items (repeated-factor partial fractions, by parts twice, mirror-property definite integrals) are d4.
- Shaded areas are shown with dashed `vlines` at the limits; the plot spec has no fill, so the region is described in the alt text and caption.
- `table` cells hold inline KaTeX (including `\displaystyle\int`); renderers must support maths in cells.
