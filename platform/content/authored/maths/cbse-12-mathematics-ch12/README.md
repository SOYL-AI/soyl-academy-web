# CBSE Class 12 Mathematics — Chapter 12: Linear Programming (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the
structure of the CBSE 10 maths chapters (`content/authored/maths/cbse-10-mathematics-ch*`). Author:
`claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Terminology and formulation: decision variables, objective function, constraints, non-negativity, feasible / infeasible / optimal solutions; formulating a two-variable problem from a short situation ("at most" → ≤, "at least" → ≥, simplifying constraints, keeping units consistent).
- **t02** Graphical method: half-planes with a test point, feasible regions, corner points by solving pairs of boundary lines, the Corner Point Theorem for bounded regions, the open half-plane test for unbounded regions (minimum exists / no maximum), multiple optimal solutions along an edge, empty (infeasible) regions; at most three non-trivial constraints per problem.
- **Removed topic absent:** the classification of LPPs into types (manufacturing, diet, transportation problems) is not taught or asked; it is named only as "not in the 2026–27 syllabus" (deck 1 exam tips, notes section 7, flashcard f28). Short formulation contexts (a bakery, a tailoring unit, a fertiliser purchase, a bus hire) are kept because the syllabus asks for formulation, but none is labelled as a "type".

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Formulation and feasible regions" (t01–t02) 19 slides; Part 2 "The corner-point method" (t02) 19 slides |
| Worked examples | 3 + 5 (formulate the Kanpur bakery; corners of x + y ≤ 8, x + 2y ≤ 10; an "at least" constraint for a Kochi spice exporter; max of 3x + 5y = 28 at (6, 2); min 13.5 on an unbounded region with the half-plane test; no maximum of x + y; an edge of optimal points; the bakery solved, ₹2000 at (12, 16)) |
| Visuals | 28 of 38 slides (plot 14, table 10, flow 4); max 1 slide in a row without a visual; notes and questions add plot 4, table 3, flow 1. Region plots draw every non-vertical boundary as a function and vertical ones as `vlines`, with all corners marked (computed, not typed) |
| Check slides | 4 + 4, all objective (m03, m18, fb1, tf2; m11, m14, tf3, fb3); none is used in either test |
| Notes | 7 sections, each with key terms and a visual (formulas where relevant); exam tips with mark split and 8 common mistakes |
| Flashcards | 28 (definition 7, fact 4, concept 5, formula 2, example 4, exam-tip 4, diagram 2) |
| Questions | 71 items, 136 marks: mcq 19, assertion-reason 6 (keys a c d b a d), true-false 5, fill-blank 5, numerical 7, short-2 10, short-3 8, long-5 6, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 17, d2 26, d3 23, d4 4, d5 1 |
| Competency | recall 8, understanding 27, application 25, analysis 11 — application or higher 51% of items, 67% of marks (lint band 45–65%) |
| Topics | t01 17, t02 59 (some items carry both) |
| Tests | `t_cbse12math_ch12_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build and checks: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one independent
re-solve check per item), `src/lp.mjs` (linear-programming arithmetic), shared builders/validator in
`../cbse-12-mathematics-ch01/src/lib.mjs`. Run from `platform/`:
`npx tsx content/authored/maths/cbse-12-mathematics-ch12/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch12`.

- **Re-solve:** 142/142 checks pass (`src/resolve.log`). `lp.mjs` finds corners by intersecting every pair of boundary lines (axes included) and keeping the feasible ones; optima come from the corner values **and** a brute-force grid search of the region (600 × 600 points), so a wrong corner or a missed corner would show up as a better grid point; unbounded regions are detected by testing far points, and the half-plane test is the grid search over a box 30 times larger than the corners. Every MCQ key, numerical value, blank and the numbers inside model answers are recomputed from the givens; feasibility claims (points in or out, the empty region, translated constraints) are checked by substitution.
- **Worked examples:** every deck and notes example and the flashcard examples are re-derived in `build.mjs` before building; the build stops if any is wrong.
- **Plots:** 64 marked points all on their curves (or, for corners on an axis only, on a vline or flagged `on_curve: false`) and matching their labels; 20 zeros located numerically and all marked; 16 points checked on two lines.
- **KaTeX:** 1567 math strings parse with KaTeX in strict "error" mode; a separate scan found no command that lost its backslash (`\le`, `\ge`, `\text`, …) and no control characters.
- **Narration:** 38 slides, max 73 words, mean 50; no symbols, digits-with-letters or letter abbreviations ("LPP" appears only on screen, never in narration).
- **Pipeline checks on this chapter:** stage-4 lint 0 errors / 0 warnings; stage-5 deterministic checks (ch02's `verify-local.mts`) 71 questions, 0 flags; bank-duplicate check within the chapter (ch02's `originality-local.mts`) 0 flags; no `solution_md` repeats a ≥ 60-character sentence of the stem, passage or model answer.
- **Fixes during the pass:** n6 reworded (its stem matched m10 once maths was stripped); fb5's solution now states the digit 5.
- **Originality:** all regions, objectives and contexts are new (Kanpur bakery, Kochi spice exporter, Khurja potter, Patna electronics shop, Pune nursery, Anand dairy, Jalandhar sports shop, Varanasi weaver, Tiruppur tailoring unit, Lucknow school excursion, Nashik fertiliser purchase, Haryana wheat and mustard, Jaipur handicrafts, Delhi tiffin service). No NCERT example or exercise set-up or CBSE sample-paper question is reused.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Shading is not supported by the plot visual: the feasible region is described in alt text and captions and listed as a corner table instead.
- Region plots use the v2 `vlines` field for constraints such as $x \le 6$.
