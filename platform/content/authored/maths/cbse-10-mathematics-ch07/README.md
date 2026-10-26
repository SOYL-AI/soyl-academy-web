# CBSE Class 10 Mathematics — Chapter 7: Coordinate Geometry (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/cbse-10-mathematics-ch06`) and the pacing of the authored ch01–ch05.
Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are
`status: "draft"` until review.

## Scope (2026-27 syllabus, Standard 041 and Basic 241)
- **t01** Distance formula: derivation from Pythagoras, horizontal/vertical special cases, distance from the origin, unknown coordinates (both signs), equidistant points (on an axis, and the relation $3x = 2y$), collinearity **by distances only** (including a nearly-collinear triple settled exactly), classifying triangles (isosceles, equilateral, right-angled) and quadrilaterals (rhombus vs square, rectangle, parallelogram), map-scale applications.
- **t02** Section formula (internal division): derivation by similar right triangles (AA), the pairing rule, midpoint forwards and backwards, trisection and four equal parts, fractions of the way as ratios, the ratio in which a point or an axis divides a segment ($k : 1$), the fourth vertex of a parallelogram, the $2 : 1$ point on medians (as a section-formula application).
- **Removed topic absent:** area of a triangle using coordinates. It appears nowhere, not even as a distractor; the decks, notes and exam tips say collinearity is tested with distances.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "The distance formula" (t01) 18 slides; Part 2 "The section formula" (t02) 18 slides |
| Worked examples | 6 + 6 (two points; unknown coordinate with two answers; nearly collinear; right isosceles triangle; tilted square; water tank equidistant from two villages; 3 : 2 division; trisection; where the $x$-axis cuts; fourth vertex of a parallelogram; Punjab seed-dropping drone; unknowns from a midpoint) |
| Visuals | 26 of 36 slides, max 1 slide without a visual. Deck: plot 22 (coordinate figures: labelled points with segments drawn as line series), table 2, flow 2. Notes/questions: plot 11, table 2, flow 1 |
| Check slides | 3 + 3, all objective (q001, q007, q004; q010, q012, q014) |
| Notes | 6 sections, each with key terms and a visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (formula 5, concept 9, example 5, exam-tip 6, diagram 2, fact 3) |
| Questions | 70 items, 139 marks: mcq 18, assertion-reason 6 (keys a b c d a d), true-false 5, fill-blank 5, numerical 9, short-2 9, short-3 7, long-5 6, case-based 5 (1 + 1 + 2, part (c) either/or via `alternatives`, `passage_origin: soyl-original`; one carries a plot asset) |
| Difficulty | d1 14, d2 32, d3 18, d4 5, d5 1 |
| Competency | recall 4, understanding 21, application 34, analysis 10, evaluation 1 — application or higher 64% of items, 78% of marks |
| Topics | t01 44, t02 38 (items may carry two topics) |
| Tests | `t_cbse10math_ch07_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-10-default-chapter-test-short/long`; disjoint |

## Verifier record
Sources in `src/` (`build.mjs`, `questions.mjs`; library `../cbse-10-mathematics-ch05/src/lib.mjs`).
Run from `platform/`: `npx tsx content/authored/maths/cbse-10-mathematics-ch07/src/build.mjs`.

- **Numeric re-solve:** 161/161 checks pass. Distances use `Math.hypot`; division points are recomputed by **vector interpolation** $A + t(B - A)$ with $t = \frac{m}{m + n}$ (not the section formula the solutions use); ratios come from distances $AP / PB$ or from the axis intercept parameter; collinearity is checked by an independent cross-product test as well as by distances; every unknown coordinate is found by an integer search over $[-50, 50]$ (so both signs are always found); "is it a square / rhombus / right triangle" keys are checked side by side and diagonal by diagonal; equidistant relations ($3x = 2y$) are checked at points on and off the line; every case parent's summary answer is checked as well as each part.
- **Fix during the pass:** the parent model answer of the Bhopal playground case (q068) gave the centre as $(1.5, 3.5)$; the correct midpoint of both diagonals is $(1.5, 1.5)$ (the part (c)(ii) answer was already right). Fixed, and a parent-level check was added to every case in ch05 and ch07 so a summary answer can no longer drift from its parts.
- **Fix to the tests:** the first commit of this chapter put the 2-mark numerical q042 in section A of the long test (41 attempted marks against 40); the gate caught it and q043 (1 mark) replaced it. The builder now parses both tests and the release with the shared `TestDefinition` / `ChapterRelease` schemas before writing.
- **Plots:** 110 labelled points; every label such as "A(−3, 2)" is checked against the drawn position. No functions except one collinearity line ($y = 2x - 3$), on which all three marked points lie.
- **KaTeX:** 1436 math strings parse in strict "error" mode; no lost backslashes or control characters.
- **Narration:** 36 slides, max 64 words, mean 48; no symbols or abbreviations.
- **Labels:** three items relabelled from d1 to d2 after review (q002 sign trap, q023 the 3-4-5 converse, q044 two-part distance and midpoint).
- **Originality:** avoided NCERT's $(6, 5)$/$(-4, 3)$ point on the $y$-axis, $(3, 6)$/$(-3, 4)$ equidistant relation, $(1, 7), (4, 2), (-1, -1), (-4, 4)$ square, $(-1, -2), (1, 0), (-1, 2), (-3, 0)$ quadrilateral, $(-3, 10)$/$(6, -8)$ divided by $(-1, 6)$ (and its translates), $(5, -6)$/$(-1, -4)$ cut by the $y$-axis, $A(-2, 2)$/$B(2, 8)$ in four parts, $P(4, m)$ on $A(2, 3)$/$B(6, -3)$, the $(1, 2), (4, y), (x, 6), (3, 5)$ parallelogram, the sports-day flags and the classroom desks. Contexts: Chandigarh grid, Lalbagh flower bed, Wardha villages and health centre, Jaipur warehouse, Kolkata metro, Punjab drone, Shimla treasure hunt, Bhopal playground, Nashik irrigation pipe, Kanpur mobile tower, Hyderabad survey drone.
- **Pipeline stages 5–6 (`verify --authored`, `originality --authored`):** verify 70/70 pass, 0 flags; originality 0 errors after rewording five stems that, with maths stripped, matched or were 75–100% similar to others (q016, q031, q032, q034, q054).
- **MCQ key balance:** keys rotated after the re-solve to 6/6/6/5 (a/b/c/d), with per-option solution paragraphs re-sorted into a–d order.

## Gaps / follow-ups
- Coordinate figures are `plot` visuals with `series` of kind `line` for segments and KaTeX in a few point labels ($P(x_1, y_1)$); the renderer must support both (same need as noted for ch01–ch04).
- Evaluation-level items are few (1); the chapter's error-analysis items are mostly at analysis level.
- Narration audio not generated (TTS stage). `word_limit` not set on maths short/long items (marked by steps).
