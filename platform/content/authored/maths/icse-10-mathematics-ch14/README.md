# ICSE Class 10 Mathematics — Chapter 14: Similarity (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 3 Geometry)
- **t01** Similarity as a size transformation; similar versus congruent figures (congruent = similar with $k = 1$); scale factor; why polygons with four or more sides need both equal angles and proportional sides.
- **t02** Conditions for similar triangles: AA, SSS and SAS, applied and never proved; naming triangles in corresponding order; shadows and common-angle applications; the altitude to the hypotenuse of a right-angled triangle (AA).
- **t03** Basic Proportionality Theorem and its converse (used without proof); equivalent forms; unknowns in the proportion; diagonals of a trapezium.
- **t04** Areas of similar triangles in the ratio of the squares of corresponding sides, and the reverse (square root); perimeters, altitudes and medians follow the sides; a line parallel to a side and the areas of the two parts.
- **t05** Maps and models: scale $1 : n$ and scale factor $k$; lengths $k$, areas $k^2$, volumes $k^3$; unit conversions.
- **Removed for ICSE 2027:** proofs of the similarity conditions (simple applications only). The chapter applies the conditions, the theorem and the area result without proof; the notes say so in one line.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Similar figures and the conditions for similar triangles" (t01–t02) 21 slides; Part 2 "Proportionality, areas, maps and models" (t03–t05) 23 slides |
| Worked examples | 6 + 9 (scale factor and missing sides; AA gives a length; test by SSS; SAS and a third side; height of a tree by shadows; triangles sharing an angle; finding a length by the theorem; an unknown in the proportion; is $DE \parallel BC$ (converse); a trapezium; ratio of areas; from areas to sides; a parallel line and areas; lengths, areas and a map; a scale model) |
| Visuals | 34 of 44 slides (geometry 22, table 11, flow 1); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual and further figures. Six questions carry a figure (q046, q056, q062–q065) |
| Check slides | 3 + 3, all objective mcq (q003 q006 q004; q010 q014 q016) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 8, formula 4, concept 5, example 10, exam-tip 3) |
| Questions | 68 items, 169 marks: mcq 18, assertion-reason 6 (keys c a b d c a), true-false 6, fill-blank 6, numerical 8 (5 × 1 mark, 3 × 2 marks), short-2 5, short-3 6, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–8 step marks each) |
| Difficulty | d1 9, d2 28, d3 28, d4 3 |
| Competency | recall 6, understanding 26, application 29, analysis 7 — application or higher 53% of items, 79% of marks (lint band 45–65% of items) |
| Topics | t01 8, t02 22, t03 17, t04 19, t05 16 (items may carry two or three topics) |
| Tests | `t_icse10math_ch14_short` (20 marks / 45 min: A = q001 q008 q012 mcq, q019 AR, q050 q051 short-3; B = one of q063, q068) and `_long` (40 marks / 90 min: A = q002 q005 q007 q011 q013 q015 mcq, q021 q024 AR, q056 q057 q059 short-4; B = any two of q062 q065 q067). Disjoint; no deck-check question in a test |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank + one
re-solve check per item), `src/qh.mjs` (fraction helpers and the figures used inside questions), `src/sim.mjs` (geometry
builder with assertions), `src/fr.mjs` and `src/work.mjs` (exact fractions and working-line checker, copied from ch13),
`src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch14/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch14/src/lint.mts content/authored/maths/icse-10-mathematics-ch14`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on repeated runs).

- **Figures (`sim.mjs`):** triangles are placed from real side lengths (law of cosines) or angles (law of sines) and scaled to drawing units. For every pair of triangles the builder asserts, to $10^{-9}$, equal angles and sides in the stated ratio; for $D$, $E$ on $AB$, $AC$ it asserts $AD : DB = AE : EC = m : n$, $DE$ at the height of the dividing ratio (so parallel to $BC$) and $DE : BC = m : (m + n)$; for trapezium figures that the diagonals meet in the ratio $AB : DC$ at one point; for shadow figures that the sun angles are equal; for the altitude figure that $BD \perp AC$ and $AD$, $DC$, $BD$ have the computed lengths. A numeric segment label must equal the true length and all numeric labels in one figure share one scale (also checked by the pipeline lint); a degree label must equal the measured angle. Figures whose lengths are labelled are drawn to scale; the geometry in the long questions is consistent with the data given (e.g. in q062 the triangle $15, 20, 25$ has area $150$; in q063's trapezium the height $15$ gives area of $\triangle AOB = 81$ and trapezium $225$).
- **Worked values:** every number in a worked example, table, note and flashcard is recomputed with exact fractions or checked line by line by the exact parser (`work.mjs`): numbers equal exactly; an equation in one unknown ($\dfrac{x}{6} = \dfrac{x + 2}{9} \Rightarrow x = 4$) must hold at the verified solution.
- **Re-solve:** 276/276 checks pass (`src/resolve.log`). Side ratios, which similarity condition holds (SSS by exact ratios, SAS by the including sides), the theorem and its converse by cross-multiplication, trapezium diagonals, area ratios as squares, perimeter and altitude ratios, and scale factors for lengths, areas and volumes are all recomputed from the givens. MCQ distractors are the slips they represent, each recomputed: ratio inverted, difference instead of ratio, ratio of areas used for sides (and the reverse), cubes for squares, a power of ten in a unit change, non-corresponding sides matched.
- **KaTeX:** 1,691 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no bare command words.
- **Narration:** 44 slides, max 81 words, mean 56; numbers in words, vertex names as spaced letters, no symbols or capital-letter abbreviations (AA, SSS, SAS are spoken as "angle angle", "side side side", "side angle side").
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`): 68 questions, 0 flags. **Originality** (`content originality --authored`): this unit 0 errors, 0 warnings.

## Originality
CBSE 10 Mathematics ch06 (Triangles) was not present in the worktree's bank, so this chapter's set-ups, numbers and wording were chosen independently (triangle sides, shadow lengths, map scales, models, trapezium and altitude data are all new for this chapter) and every stem names its own content; similar BPT, area and map items are worded differently (sail, truss, banner, plot, reserve, lighthouse, hospital block, fountain, water tower). No item is taken from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past paper; CISCE documents were used for pattern only. Re-run originality once CBSE 10 ch06 lands in the bank.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Only six questions carry a figure; most model answers describe the figure in words.
- Equal-angle marks use arcs without degree labels where side lengths are given with them (to avoid over-determining the triangle); degree labels appear only where the angles are exact.
- The altitude-on-the-hypotenuse result is used through AA similarity only (no mean-proportional theorem is quoted), as the syllabus lists only the conditions and simple applications.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
