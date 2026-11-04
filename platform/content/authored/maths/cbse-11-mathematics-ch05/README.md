# CBSE Class 11 Mathematics — Chapter 5: Linear Inequalities (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050). Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Mathematics 041, Unit II Algebra)
- **t01** Linear inequalities in one variable: the four signs, the rules (reversal for a negative multiplier or divisor), solving with brackets and fractions, number-line solutions and interval notation, replacement sets, word problems, double inequalities, two conditions together (and = intersection, or = union).
- **t02** Graphical solution of inequalities in two variables (`board_assessed: false`, formative only): half-planes, boundary line and test point, solid or dashed line, systems and their common region with corner points. Taught and practised but kept light: 7 of 36 slides, 2 of 7 notes sections, 18 of 68 items (the rest of the chapter is t01), and none of these items is compulsory in either chapter test (only optional choices in the long test). Deck slides and notes sections say "formative only".
- **Removed topics:** none in this chapter (`removed_topics: []`). Mathematical Induction (formative only) and Mathematical Reasoning (deleted) appear only as one flashcard line (f31).
- No linear programming, no objective functions and no absolute-value inequalities (not in the syllabus topics).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Inequalities in one variable" (t01) 18 slides; Part 2 "Double inequalities, systems, and two variables" (t01 + t02) 18 slides |
| Worked examples | 4 + 4 (positive coefficient; negative coefficient with reversal; fractions; word problem; double inequality with reversal; pair of conditions; half-plane graph; triangle corner points) |
| Visuals | 26 of 36 slides (svg number lines 11, flow 5, tables 6, plots 4); max 1 slide without a visual. Notes: 7 sections, each with a visual, plus 17 more visuals. Question figures: 1 number line, 2 plots |
| Check slides | 4 + 4, all objective (q033 q030 q027 q004; q032 q029 q016 q039), none used in a test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 8 common mistakes |
| Flashcards | 31 (definition 8, fact 7, exam-tip 6, formula 3, concept 3, example 3, diagram 1) |
| Questions | 68 items, 138 marks: mcq 18, assertion-reason 6 (keys a c d b a c), true-false 5, fill-blank 5, numerical 5, short-2 9, short-3 8, long-5 7, case-based 5 (each 1 + 1 + 2 with an either/or part (c)) |
| Difficulty | d1 11, d2 26, d3 24, d4 7 |
| Competency | recall 4, understanding 25, application 26, analysis 13: application or higher 57% of items (lint band 45-65%) |
| Tests | `t_cbse11math_ch05_short` (20 marks / 40 min; A 3 mcq + 1 AR, B 2 short-2 + 1 short-3, C [long, long], D 1 case) and `_long` (40 marks / 90 min; A 8 mcq + 2 AR, B 2 short-2 + [short-2, short-2] + 1 short-3 + [short-3, short-3], C long + [long, long], D 2 cases), on `cbse-11-default-chapter-test-short/-long`; disjoint, no deck-check item |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank, one re-solve check per item), `src/ineq.mjs` (exact BigInt-fraction arithmetic, solver, interval and two-variable tools), `src/common.mjs`, `src/iv.mjs`, `src/nl.mjs` (number lines as allow-listed svg, same drawing code as CBSE 11 ch01), shared builders `src/lib.mjs`. From `platform/`:
`npx tsx content/authored/maths/cbse-11-mathematics-ch05/src/build.mjs`; lint with `npx tsx content/authored/maths/cbse-11-mathematics-ch05/src/lint.mts content/authored/maths/cbse-11-mathematics-ch05`. Rebuilding is deterministic (identical `release.json` / `tests.json` md5 on repeated runs).

- **Re-solve:** 141/141 checks pass (`src/resolve.log`). Every key, count and number in a solution or model answer is recomputed from the givens.
- **One variable:** each inequality is solved by the textbook method with exact fractions (`solve1`: collect, divide, reverse the sign for a negative coefficient). The resulting interval is then compared with the original inequality at every rational point $x = k/840$ for $|x| \le 24$ (more than 40 000 points) and just inside and outside each end point, and each end point's own membership is tested. Conjunctions ("and"), unions ("or") and empty intersections are brute-force checked in the same way. Integer lists, counts and sums (for example 12 integers with sum 18 in l03) are enumerated.
- **Number lines:** drawn from the interval objects; the alt text is generated from them and the captions name the open and the filled circles.
- **Two variables:** points are tested exactly in the original (strict or not) inequalities; boundary lines come from exact intercepts and intersections; plot expressions are asserted equal to the exact lines at sample points; for each bounded region the corner points are computed from all pairs of lines, and every grid point $k/4$ in a bounding box (957 points for the deck triangle) satisfies all the constraints exactly when it lies in the corner polygon; lattice points are enumerated (l04 18, l05 37, c05 25, m18 6); areas by the shoelace formula (16, 27, 16).
- **Plots:** every marked point lies on a plotted line and matches its label, every marked zero is the only zero of its line in range, intersection points lie on both lines; the free test point (origin) is marked as not on a curve. Shading is described in the alt text and caption (the plot builder has no shading).
- **KaTeX:** all 1465 math strings parse in strict "error" mode; no Unicode maths symbols inside `$...$`; no bare command words.
- **Narration:** 36 slides, max 79 words, mean 54; no symbols, digits mixed with letters or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve; keys a 6, b 6, c 6, d 5 including case parts.
- **Gates run:** build `NO ERRORS`; chapter lint 0 errors, 0 warnings; `verify-local` 68 questions, 0 flags; `originality --authored` unit 0 errors, 0 warnings.

## Originality
All contexts and numbers are new (an imagined bookstall, lift notice, hostel tank, hall hire, cold-storage sensor, syrup doses, school canteen, garden grid, water-delivery plans, notice board, fair ride). The stems of ICSE 10 Linear Inequations (replacement sets W, N, Z; taxi, mobile-plan and garden problems; Rhea and Kiran error items) and CBSE 12 Linear Programming (feasible region, objective function, corner-point optimisation) were read and their set-ups and wording avoided; this chapter has no optimisation. No NCERT text, example or exercise and no sample-paper or past-paper question was used. The originality check flagged one stem (m10) that matched an ICSE 10 stem after numbers were ignored; it was reworded.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Half-plane shading is described in the alt text and caption only; the plot builder draws lines and marked points, not shaded regions, and cannot draw vertical lines, so no region uses $x = c$ boundaries (axes bound the first-quadrant regions through inequalities in the text).
- The two-variable material is about 26% of the items (18 of 68), a little more than "light"; they are practice items outside the compulsory test items.
