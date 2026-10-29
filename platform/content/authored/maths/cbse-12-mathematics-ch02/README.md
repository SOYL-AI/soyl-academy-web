# CBSE Class 12 Mathematics — Chapter 2: Inverse Trigonometric Functions (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the
structure of the CBSE 10 maths chapters (`content/authored/maths/cbse-10-mathematics-ch*`). Author:
`claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Definition, domain, range and principal value branches: why the trigonometric functions are restricted, the six principal value branches, principal values (positive and negative inputs, the excluded values of cosec⁻¹ and sec⁻¹, cot⁻¹ on (0, π)), domains of expressions such as sin⁻¹(3x − 2), combinations of principal values, simple equations solved from the definition, "inside-out" evaluation (sin⁻¹(sin θ) and similar: inner value first, then the principal value) and "outside-in" evaluation (a ratio of an inverse value by a right triangle with the sign fixed by the range).
- **t02** Graphs of sin⁻¹x, cos⁻¹x and tan⁻¹x: reflection of the restricted graphs in y = x, end points and asymptotes, increasing/decreasing, comparison of values and simple inequalities read from the graphs.
- **Removed topic absent:** elementary properties of inverse trigonometric functions (sin⁻¹x + cos⁻¹x = π/2, sum/difference and double-angle formulas for tan⁻¹, negative-argument and reciprocal rules, "simplest form" exercises) are neither taught nor needed by any item. Every value is computed from the definition of the principal branch; the deck and notes say explicitly that the properties are not in the 2026-27 syllabus.
- **Reviewer note (scope decision):** compositions such as sin⁻¹(sin 7π/10) are evaluated inside-out from the principal branch (find sin θ, then its principal value). The rule "sin⁻¹(sin θ) = θ only on the principal range" is presented as a consequence of the definition, not as a property to quote. If the reviewer reads this as part of the deleted properties, the affected items are m09–m11, ar2, tf5, n06, s207, s303, l03 (and deck 2 slides 11–13).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Principal value branches" (t01) 21 slides; Part 2 "Graphs and evaluating expressions" (t02 + compositions) 19 slides |
| Worked examples | 4 + 4 (sin⁻¹(−1/2); cos⁻¹(−1/√2); cot⁻¹(−√3) and cosec⁻¹(2/√3); domain of cos⁻¹(3 − 2x); comparing sin⁻¹0.8 and sin⁻¹0.6; sin⁻¹(sin 7π/10); sin(cos⁻¹(−5/13)); tan⁻¹(3x) = −π/3) |
| Visuals | 27 of 40 slides (plot 17, table 7, flow 2, geometry 1); max 1 slide without a visual; notes and questions add plot 7, table 5, flow 1, geometry 1. Plots of the restricted sin/cos/tan pieces, the three inverse graphs, reflections in y = x (with mirror point pairs), the full sine wave cut by y = 1/2, a domain number-line plot; tables of principal values computed by code; a 3-4-5 triangle |
| Check slides | 4 + 4, all objective (m01, tf1, m08, fb2; tf4, m15, m11, m17) |
| Notes | 7 sections, each with key terms, formula(s) where relevant and at least one visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (definition 1, fact 3, concept 6, formula 6, example 8, exam-tip 5, diagram 1) |
| Questions | 68 items, 132 marks: mcq 18, assertion-reason 6 (keys c d a b a b), true-false 5, fill-blank 5, numerical 6, short-2 9, short-3 8, long-5 6, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 8, d2 27, d3 25, d4 7, d5 1 |
| Competency | recall 6, understanding 25, application 28, analysis 8, evaluation 1 — application or higher 54% of items (lint band 45–65%) |
| Topics | t01 56, t02 17 (some items carry both) |
| Tests | `t_cbse12math_ch02_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build and checks: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one independent
re-solve check per item), shared builders/validator in `../cbse-12-mathematics-ch01/src/lib.mjs`. Run from `platform/`:
`npx tsx content/authored/maths/cbse-12-mathematics-ch02/src/build.mjs` (prints stats and `NO ERRORS`; deterministic — a rebuild leaves the tree unchanged).
Chapter-only gates: `npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch02` (stage-4 lint, 0 errors, 0 warnings);
`npx tsx content/authored/maths/cbse-12-mathematics-ch02/src/verify-local.mts content/authored/maths/cbse-12-mathematics-ch02/release.json` (stage-5 deterministic checks, 0 flags);
`npx tsx content/authored/maths/cbse-12-mathematics-ch02/src/originality-local.mts content/authored/maths/cbse-12-mathematics-ch02/release.json` (stage-6 bank-duplicate rule within the chapter, 0 flags).

- **Numeric re-solve:** 123/123 checks pass (`src/resolve.log`). Every principal value is recomputed with `Math.asin/acos/atan` (cosec⁻¹, sec⁻¹, cot⁻¹ from their branch definitions in `questions.mjs`) and compared with option values typed separately from the option text, with the fill-blank key, the numerical key, or — for written answers — the exact form `\dfrac{kπ}{n}` generated by `piTex()` from the computed value and required to appear in the model answer. Domains are checked both by solving the inequality and by scanning where the expression is defined; graph statements (decreasing, asymptotes, crossing of sin⁻¹ and cos⁻¹ found by bisection) are checked numerically.
- **Visual checks:** 77 marked plot points lie on their curves (and match numeric labels), 17 zeros located numerically and all marked, 12 intersection points checked on both curves; principal-value tables are filled by code from the computed values; the 3-4-5 triangle self-checks side lengths and that its angle is tan⁻¹(3/4).
- **KaTeX:** 1608 math strings parse with KaTeX in strict "error" mode; no LaTeX outside `$…$`; no Unicode maths symbols inside `$…$`.
- **Narration:** 40 slides, max 64 words, mean 50; no symbols, digits-with-letters or letter abbreviations (π is spoken as "pi").
- **Fixes during the pass:** stage-4 schema (geometry `scale` is an object, so the triangle uses the default common scale; one exam-tips slide had 7 bullets); stage-5 minor flags cleared (fill-blank solutions now state the accepted answer; numerical solutions compute the degree value in an "=" step); two stems rephrased after the bank-duplicate rule matched their prose (fb1 vs m01, n02 vs n01).
- **Originality:** all explanations, examples and questions are original. Standard textbook evaluation set-ups were avoided on purpose (e.g. sin⁻¹(sin 7π/10) instead of the common 2π/3 or 3π/5 forms; combinations such as 2cos⁻¹0 − 3tan⁻¹1 + sin⁻¹½ are new); case studies use own contexts (Bhopal station ramp, Konkan lighthouse, Jaipur ladder, Kota graph project, Pune giant wheel).

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Plots use `domain` on functions and `hlines`/`vlines` for asymptotes (contract v2); a renderer without them shows the full curve or no asymptote line.
- `src/verify-local.mts` and `src/originality-local.mts` run the pipeline's own check functions on this chapter only; the repo-wide gates (`content verify/originality --authored`) remain the authority.
