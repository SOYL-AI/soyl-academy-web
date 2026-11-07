# ISC Class 11 Mathematics - Chapter 3: Angles and Trigonometric Functions (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Mathematics (860), Paper I, Class XI portion, Unit 1.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`; all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` and `src/lint.mts` are unchanged copies of the shared ISC 11 Mathematics files. `src/trig.mjs` (exact arithmetic in Q(sqrt2, sqrt3) at multiples of 15 degrees, radian helpers, sampling grids) and `src/figs.mjs` (plot, unit-circle and sector builders) follow the approach of the CBSE 11 chapter on the same topic; `src/qh.mjs` holds small helpers.

## Scope (syllabus.yaml, ISC 2028)

- **t01** Positive and negative angles; degree and radian measure and conversion; arc length `l = r theta`; area of a sector.
- **t02** Unit-circle definition of the six functions; `sin^2 + cos^2 = 1` and its companions; quotient and reciprocal relations; signs by quadrant; finding all ratios from one; proving identities.
- **t03** Functions of any angle (reduction by whole turns, reference angle); allied angles (`-theta`, `90 +- theta`, `180 +- theta`, `270 +- theta`, `360 - theta`).
- **t04** Domain, range and period of the six functions; sketches of `sin`, `cos`, `tan`, `cosec`, `sec`, `cot` with asymptotes and all zeros.
- **Removed topics:** none listed. Compound, multiple and sub-multiple angles and the sum/product formulae are chapter 4 and are not taught here; trigonometric equations are not in the ISC Class XI topic list.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Angles, radian measure and the unit circle" (t01-t02) 21 slides; Part 2 "Any angle, allied angles and graphs" (t03-t04) 24 slides |
| Visuals | 37 of 45 slides carry one (geometry 9, flow 5, table 16, plot 7); never more than 1 slide in a row without a visual (check slides carry none) |
| Worked examples | 5 + 3 |
| Check slides | 4 + 4, objective items used in neither test: fb1, tf2, fb2, tf1 (Part 1); fb3, tf3, tf4, fb4 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with a mark split and common mistakes |
| Flashcards | 30 (definition 5, formula 10, fact 8, example 2, concept 2, diagram 1, exam-tip 2) |
| Questions | 77 items, 143 marks: mcq 22, assertion-reason 7 (keys a d b c a c b), true-false 6, fill-blank 6, numerical 6, short-2 10, short-3 12, long-5 8 (all in parts, 5-step schemes; l06 carries a plot) |
| MCQ keys | a 6, b 6, c 5, d 5 after rotation by the build |
| Difficulty | d1 11, d2 33, d3 27, d4 6 |
| Competency | recall 3, understanding 27, application 38, analysis 9 (application or higher 61 % of items) |

### Tests (built by `chapterTests`, blueprints `isc-11-default-chapter-test-short/-long`)

- **Short (20 marks, 50 min):** A m02 m07 m13 m20 ar2; B s202, (s206 | s209); C s301, (s305 | s311); D l01.
- **Long (40 marks, 100 min):** A m03 m04 m06 m09 m10 m14 m17 m19 m21 m22 ar3 ar5; B s201 s204 (s208 | s210); C s302 s303 s306 (s307 | s312); D l02, (l04 | l05).
- Short and long are disjoint; no deck-check item is in a test. Practice-only (in no test): mcq m01 m05 m08 m11 m12 m15 m16 m18, ar1 ar4 ar6 ar7, short s203 s205 s304 s308 s309 s310, long l03 l06 l07 l08, and the true-false, fill-blank and numerical items.

## Verifier record (what build.mjs computes and asserts)

- Every item has an independent re-solve check (139/139 pass): exact values at multiples of 15 degrees in Q(sqrt2, sqrt3) compared with floating-point trigonometry, Pythagorean triples in exact fractions with the angle recovered by `atan2`, radian and degree conversions by reduced fractions of pi, identities and ranges by sampling a 0.5-degree grid over [-360, 360] degrees (poles excluded), periods by searching multiples of pi/d, MCQ distractors computed from the wrong method and exactly one option matching the re-solved target.
- Deck tables are computed, not typed: conversions, coterminal reductions, the standard-value table (all six functions at 0, 30, 45, 60, 90 degrees, undefined cells asserted undefined), the domain/range/period table (periods found numerically), worked-example tables. The eight allied-angle rules are typed once and each cell is verified at many acute and negative angles.
- Plots (7 deck plots, 8 notes/question plots): 85 marked points all on their curves; 32 zeros located numerically and all marked; asymptotes drawn as dashed vertical lines and every branch drawn with a domain that avoids its asymptotes.
- KaTeX strict parse of all 1,900+ maths strings; narration at most 77 words (mean 54), no symbols or abbreviations; pipeline stage-4 lint 0 errors / 0 warnings; stage-5 deterministic checks and `verify-local` 0 flags; originality gate 0 errors for this unit; rebuild byte-identical.

## Originality notes

- CBSE 11 Mathematics ch03 (same topics, in the bank) was read for its stems and avoided: its 135 degree, 7 pi over 12, 252 degree and 11 pi over 18 conversions, the 45 cm pendulum, flywheel, minute-hand, flower-bed, observatory and railway-curve set-ups, the sin 210 / cos 5 pi over 3 / tan 7 pi over 6 evaluations, the cosine range 3 - 2 cos x and |sin x| period items, and all of its compound-angle items. This chapter uses a lighthouse lamp, wiper arm, Ferris wheel, saw blade, hour and minute hands at 3:00-7:30 and 8:20, and different angles, triples (20-21-29, 15-8-17, 7-24-25, 9-40-41, 5-12-13) and ranges (4 - 3 sin x, 5 sin x - 2, 1 / (3 - 2 sin x), 2 - cosec x). Four stems that the originality gate matched to CBSE items were reworded.
- Settings that look real (lighthouse, bus, Ferris wheel) are labelled imagined.

## Known gaps

- Exact values are required only at multiples of 30 and 45 degrees in this chapter; other multiples of 15 degrees appear in chapter 4 (compound angles).
- No case-based items (the ISC blueprints have no case slot).
- Geometry and plot visuals are validated structurally and numerically but were not viewed in a browser.
