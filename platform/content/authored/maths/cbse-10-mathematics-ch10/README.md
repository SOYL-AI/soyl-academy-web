# CBSE 10 Mathematics — ch10 Circles (hand-authored, D-026)

Author: claude-opus-5-5 (subject-producer, batch C). Status: `draft` (pending review). Academic year 2026-27.

## Scope
Syllabus topics (catalog `cbse/10/mathematics/syllabus.yaml`): t01 tangent to a circle (secant/tangent, number of tangents from a point inside, on and outside); t02 tangent ⟂ radius (theorem with proof); t03 equal tangents from an external point (theorem with proof) and applications, including quadrilaterals and triangles circumscribing a circle. The chapter has no removed topics; constructions (a deleted chapter) are never asked — every figure is given.

## Contents
| | |
|---|---|
| Decks | Part 1 *Tangents and the radius* (16 slides), Part 2 *Tangents from an external point* (17 slides) |
| Worked examples | 3 + 5 (Rajasthan well rope, Pune park path, tangent–chord angle, circumscribed quadrilateral and triangle) |
| Check slides | 3 + 3, all objective |
| Visuals | 23 of 33 slides; never more than 1 slide without a visual. 19 distinct geometry figures + tables + a proof flow |
| Notes | 6 sections + exam tips |
| Flashcards | 30 |
| Questions | 70 (140 marks): mcq 18 · AR 6 · TF 5 · fill 5 · numerical 9 · short-2 9 · short-3 7 · long 6 · case 5 |
| Difficulty | d1 11 · d2 22 · d3 29 · d4 7 · d5 1; application or higher 56% of items, 69% of marks |
| Tests | `t_cbse10math_ch10_short` (20 marks) and `_long` (40 marks) on the default blueprints, disjoint |

## Figures
All figures are geometry specs computed in code (`src/build.mjs`, `src/questions.mjs`): points of contact from the exact tangent construction (`tangentPts`), incircles from the incentre formula, circumscribed quadrilaterals from their tangent lengths (`tangentialPolygon` solves Σ atan(tᵢ/r) = π for the inradius). Each figure carries self-checks run at build time — points on circles, right angles at points of contact, equal tangents, collinearity, labelled degrees and lengths to one scale — 157 checks, 0 failures. Unknowns are labelled `?`.

## Verifier pass
`npx tsx content/authored/maths/cbse-10-mathematics-ch10/src/build.mjs` (from `platform/`): KaTeX strict over 1635 maths strings, 0 failures; 142/142 re-solve checks. Angles are measured on coordinates built from the givens (e.g. the angle between tangents → tangent points → measured ∠AOB, ∠OAB), lengths by Pythagoras from the stem, tangent lengths of triangles by the semi-perimeter rule; proofs (s201, s204, s209) were checked by hand. Fixes during the pass: unrounded tangent points for the re-solve (rounded drawing points gave 0.001° noise); giant-wheel case redesigned — with the anchor 15 m from the foot the cable came out vertical and equal to the height, so the data changed to 24 m / 7 m (OA = 25, AT = 20).

## Originality
All items are original. Deliberately avoided: NCERT's 24/25 → 7 tangent, the 5 cm/3 cm concentric circles, the 8 cm chord of radius 5 with tangents meeting at T, the triangle with BD = 8, DC = 6 and r = 4, and the exact NCERT proof prompts "∠PTQ = 2∠OPQ" and "opposite sides subtend supplementary angles". Contexts: Mysuru Dussehra giant wheel, Chandigarh triangular park pond, a bangle in a tray, Nashik well ropes, Anand farm plot.

## Known gaps
Narration audio not generated (TTS stage). The renderer needs geometry point labels with KaTeX (`$Q_1$`).

## Changed by assessment-designer (2026-10-27)

Rewritten in `src/questions.mjs` (then rebuilt) because `originality --authored` flagged them as near-duplicates of other items in this chapter; each is now a different question (new numbers, context or skill) with its re-solve check: fb4 (q_cbse10math_ch10_033: angle between tangents from the angle between radii, new numbers).
