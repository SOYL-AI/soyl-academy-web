# CBSE Class 12 Mathematics — Chapter 6: Application of Derivatives (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the structure of the
CBSE 10 maths chapters. Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`.
All items are `status: "draft"` until review. Shared builders come from `../cbse-12-mathematics-ch01/src/lib.mjs`.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Rate of change of quantities: derivative as a rate; related rates (circle, sphere, cube, equilateral triangle, cylinder, inverted cone via similar triangles, ladders, a kite string, two vehicles leaving a junction); marginal cost and marginal revenue.
- **t02** Increasing and decreasing functions: definitions, the derivative test, sign charts, isolated zeros of f′ (x³), polynomial, exponential, logarithmic, rational and trigonometric examples, a parameter range (x³ + ax² + 3x + 1).
- **t03** Maxima and minima: critical points (including a corner), first and second derivative tests (and when the second fails), absolute extrema on closed intervals, optimisation (open boxes, fencing, an open cylindrical tank, a cost-minimising storage box, a cylinder in a cone, a rectangle under a parabola, nearest point on a curve, profit).
- **Removed topics absent:** tangents and normals, and approximations/differentials are not taught or required anywhere; they are only named as deleted (deck 1 exam tips, notes section 7, flashcard f29).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Rates of change; increasing and decreasing functions" (t01–t02) 21 slides; Part 2 "Maxima and minima" (t03) 22 slides |
| Worked examples | 5 + 5 (soap bubble surface; 5 m ladder; marginal revenue of chairs; sign chart of x³ − 3x² − 9x + 5; sin x − √3 cos x on [0, 2π]; first derivative test; second derivative test on x⁴ − 8x² + 3; closed interval x³ − 27x on [−4, 6] with a tied maximum; 30 cm open box; fencing against a wall) |
| Visuals | 33 of 43 slides (plot 15, table 12, flow 4, geometry 2); max 2 slides without a visual. Notes: 7 sections, each with a visual (plus 5 extra visuals) |
| Check slides | 4 + 4, all MCQ (q002, q004, q007, q010; q011, q014, q016, q018) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and 9 common mistakes |
| Flashcards | 30 (definition 4, formula 6, exam-tip 5, concept 4, example 4, diagram 3, fact 4) |
| Questions | 73 items, 151 marks: mcq 19, assertion-reason 6 (keys c a d b a d), true-false 5, fill-blank 5, numerical 6, short-2 9, short-3 9, long-5 9, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 8, d2 30, d3 25, d4 9, d5 1 |
| Competency | recall 5, understanding 29, application 30, analysis 9 — application or higher 53% of items, 70% of marks (lint band 45–65%) |
| Topics | t01 21, t02 20, t03 36 (items may carry two topics) |
| Tests | `t_cbse12math_ch06_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests, worked-example self-checks), `src/questions.mjs` (bank + one independent
re-solve check per item), `src/calc.mjs` (central-difference derivatives, sign sampling of f′, turning points, dense search for
extrema). Run from `platform/`:
`npx tsx content/authored/maths/cbse-12-mathematics-ch06/src/build.mjs`; lint this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch06`.

- **Numeric re-solve:** 146/146 checks pass (`src/resolve.log`). Rates are numeric time-derivatives of the stated relation along the stated motion (e.g. the ladder height √(100 − (6 + 0.7t)²) at t = 0, the kite angle atan(60/x)); intervals come from sampling the sign of f′ on each interval and on the wrong options; extrema come from a dense search with golden-section refinement and the turning-point finder; optimisation answers are brute-forced over the feasible domain. MCQ options are typed as numbers independently of their text and exactly one must match the re-solved value.
- **Worked examples:** every deck/notes example (bubble 4.8π, ladder −0.3 m/s, MR 100, both sign charts, the four extrema examples, the box and the fence) and the two formula flashcards (a/6 cut, S²/4 product) are recomputed in `build.mjs`; the build stops if any disagrees.
- **Visual checks:** 31 marked plot points lie on their curves and match their coordinate labels; the ladder figure is a 3-4-5 triangle on a 1 m scale and the sheet figure is 30 cm at 0.2 units per cm.
- **KaTeX:** 1472 math strings parse with KaTeX 0.19 in strict "error" mode; no Unicode maths symbols inside `$…$`.
- **Narration:** 43 slides, max 68 words, mean 52; no symbols, digit-letter mixes or letter abbreviations.
- **Lint / verify / bank duplicates (chapter-local runs):** stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks 0 flags on 73 questions; near-duplicate scan against the whole authored bank (7642 questions) 0 flags after rewording three stems (m10, s309, l09) that first matched sibling stems once maths was stripped. No solution or model-answer sentence of 60+ characters repeats student-facing text.
- **Rebuild is deterministic** (identical checksums for `release.json`, `tests.json`, `resolve.log`).
- **Originality:** all numbers and contexts are new (48 cm and 30 cm square sheets, a 40 × 25 cm sheet, 125π m³ open tank, 64 m³ storage box, cylinder in a 12 × 6 cone, rectangle under y = 12 − x², nearest point on y = x² to (3, 0), a Surat tea stall, a Mumbai oil slick, a Barmer water tank, a Nagpur junction, a Bengaluru app). The textbook's classic set-ups (18 cm square sheet, 28 m wire, the nearest point on y² = 4x, a stone in a pond) were deliberately avoided.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- `table` cells use `$…$` maths; renderers must support inline KaTeX in cells.
- Two plots (x³ − 27x on [−4, 6] and the box volume) use a function `domain` to stop the curve at the interval ends.
