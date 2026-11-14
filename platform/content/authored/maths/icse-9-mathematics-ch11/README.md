# ICSE Class 9 Mathematics — Chapter 11: Rectilinear Figures: Parallelograms (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE 2027 Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 4 Geometry)
- **t01** Opposite sides and opposite angles of a parallelogram (opposite sides equal, opposite angles equal with proof by co-interior angles, neighbouring angles supplementary, angle sum 360); finding unknown sides and angles (numbers and equations in $x$); one pair of opposite sides equal and parallel with the proof that the opposite angles are equal (join $AC$, $\triangle ABC \cong \triangle CDA$ by side angle side, then add the angles at $A$ and $C$).
- **t02** The diagonals of a parallelogram bisect each other (proof by $\triangle AOB \cong \triangle COD$, angle side angle); each diagonal divides the parallelogram into two congruent triangles (proof by angle side angle on the common diagonal), hence equal areas, and the four triangles at $O$ have equal area; lengths and perimeters from half-diagonals.
- **t03** Rhombus, rectangle and square as special parallelograms. Proof that the diagonals of a rhombus meet at right angles ($\triangle AOB \cong \triangle AOD$, side side side, then a straight line); diagonals bisect the angles of a rhombus; equal diagonals of a rectangle (side angle side) and $OA = OB = OC = OD$; the square as both; identifying the figure from its diagonals; lengths (Pythagoras on the half-diagonals), angles and areas in problems.
- **Removed topics** (syllabus `removed_topics`): the proof that both pairs of opposite sides of a parallelogram are equal, and the proof that one equal and parallel pair makes a parallelogram. Each appears once as a single line "not in the ICSE 2028 Class IX syllabus" (deck 1 slides 3 and 11, notes sections 1 and 2); the results are used, never proved. The chapter teaches synthetic geometry only: no coordinates in the teaching, no similarity.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Sides, angles and diagonals" (t01–t02) 22 slides; Part 2 "Rhombus, rectangle and square" (t03) 21 slides |
| Worked examples | 5 + 6 (all angles of a parallelogram; angles with $x$; sides with $x$ and the perimeter; diagonals with $x$; perimeter of a triangle at the centre; rhombus side from diagonals; angles of a rhombus; rectangle from a diagonal; angles of a rectangle; area of a square from its diagonal; a mixed rhombus problem), each with steps on the slide |
| Visuals | 43 of 43 slides (geometry 25, table 17, flow 1); no slide without a visual. Notes: 8 sections, each with a visual (geometry 5, flow 2, table 1) |
| Check slides | 3 + 3, all objective (q001 mcq, q029 true-false, q039 numerical; q012 mcq, q036 fill-blank, q032 true-false), none used in a test |
| Notes | 8 sections with key terms and formulas; a problem-solving routine (flow); exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 6, formula 5, concept 8, fact 5, example 3, exam-tip 2, diagram 1) |
| Questions | 65 items, 144 marks: mcq 23, assertion-reason 5 (keys c a b d c), true-false 5, fill-blank 5, numerical 7 (2 × 1 mark, 5 × 2 marks), short-2 8, short-3 6, long-10 6 (structured (a)(b)(c), 3 + 3 + 4, 7 step marks each) |
| Difficulty | d1 11, d2 22, d3 27, d4 5 |
| Competency | recall 3, understanding 22, application 24, analysis 16 — application or higher 62% of items, 80% of marks (lint band 45–65% of items) |
| Topics | t01 21, t02 16, t03 29 (items may carry two topics) |
| MCQ keys | a 6, b 6, c 6, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch11_short` (20 marks / 30 min: A = q002 q008 q014 q016 mcq, q026 AR, q047 short-2, q054 short-3; B = one of q060, q063) and `_long` (40 marks / 60 min: A = q003 q006 q009 q013 q015 q018 q023 mcq, q025 AR, q048 q050 q052 short-2, q057 q058 short-3; B = any two of q061 q062 q065), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank + one re-solve check per item),
`src/geo.mjs` (geometry helper), `src/figs.mjs` (shared figures and number words for the narration), `src/lib.mjs` (shared ICSE 9 builders, copied unchanged from `icse-9-mathematics-ch01`, `cmp` identical).
Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch11/src/build.mjs`.
Rebuilding is deterministic: two runs give identical `release.json` (md5 `c7d633c29963f8a1e667c6e3f9b750c4`) and `tests.json` (md5 `fcd47db6bdb7809f66ee758e92543ced`).

- **Figures from coordinates (`geo.mjs` `fig`):** every figure is placed from coordinates in cm. The builder throws if a numeric length label differs from the real length, if segments sharing a tick count are not equal, if segments sharing an arrow count are not parallel (cross product), if a right-angle mark or numeric degree label disagrees with the measured angle, or if angle arcs of the same count are unequal. Figures with numeric labels carry an explicit `scale` (cm).
- **Theorems as computations:** `props` (opposite sides parallel and equal, opposite angles equal, neighbouring angles supplementary, angle sum 360, diagonals bisect each other, each diagonal gives two congruent triangles of half the area, four equal triangles at $O$), `oppAnglesProof`, `onePairProof` (alternate angles, side angle side congruence, $\angle B = \angle D$, $AD \parallel BC$, $\angle A = \angle C$ by addition), `diagProof` (alternate angles, angle side angle, $OA = OC$, $OB = OD$), `rhombus`/`rhombusProof` (four equal sides, perpendicular diagonals, bisected angles, side side side congruence, equal angles on a straight line), `rect`/`rectProof` (right angles, equal diagonals, $OA = OB = OC = OD$, side angle side), `square`. Every proof item (short-3 q054 to q059, long q060 to q065) asserts each fact its model answer uses, plus every number in it.
- **Narration numbers:** every number spoken in the 43 narrations is produced by `nw()` (number words) from the computed value, and no digit, symbol or capital abbreviation is used.
- **Counter-examples behind distractors:** a general parallelogram (sides 8 and 5, angle 70) with unequal diagonals, no right angle and unequal sides (m01, m06, m10, m20, m22, ar2); a rhombus with unequal diagonals (m12, tf5); a rectangle that is not a square with non-perpendicular diagonals (ar3, ar4); a parallelogram with perpendicular diagonals is a rhombus and one with equal diagonals is a rectangle, tested on built examples (m21).
- **Re-solve:** 136/136 checks pass (`src/resolve.log`, git-ignored). Numeric MCQ options are typed independently and `which` confirms exactly one equals the re-solved value (distractors: the opposite angle instead of the neighbour, the half-diagonal instead of the diagonal, the sum of the whole sides and diagonals, forgetting one of two equal sides, the area of the triangle instead of the parallelogram).
- **KaTeX:** 1,122 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no LaTeX outside `$…$`.
- **Narration:** 43 slides, max 90 words, mean 65; numbers in words, letters of figures separated ("A B C D"), no capital-letter abbreviations.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build and are clean.
- **Originality scan (scratch, not committed):** the stems of all 65 items were compared with every authored maths bank (117 banks, 8,017 questions) using the repo's rule (maths removed, exact stems of 6 or more words, Jaccard of word 5-grams at 0.7): 0 flags.

## Points for a reviewer
- **Scope vs the ICSE book:** only the proofs the syllabus asks for are given (opposite angles equal in both ways, diagonals bisect each other, diagonal gives congruent triangles, rhombus diagonals perpendicular). The proof that the diagonals of a rectangle are equal (deck 2 slide 11, notes section 5, long item q065) is an extra that the syllabus only requires as a property "used in problems"; drop it if the board does not expect it. Deck 2 slide "Identifying the shape from its diagonals" uses the converses (perpendicular diagonals give a rhombus, equal diagonals give a rectangle) with a one-line reason and no formal proof; they are used in m21 and ar4.
- **Facts used without proof** (marked as such on the slides): opposite sides equal; one equal and parallel pair gives a parallelogram (used in q047, m06, l02). The ICSE 2028 wording in the one-line notices follows the task brief.
- **Pythagoras** is used for rhombus and rectangle lengths (the syllabus teaches it in the chapter before this one). Areas of the rhombus and the square are found by adding the four (or two) triangles at the centre; no area formula for them is assumed.
- q060 to q065 are the structured long items: q060 (opposite angles, algebra, perimeter and cost), q061 (one equal parallel pair, d4), q062 (diagonals, perimeters of $\triangle AOB$ and $\triangle BOC$, equal areas, d4; $AB = 10.8$, $BC = 15.6$, $AC = 24$, $BD = 12$ satisfy the parallelogram law), q063 (a line through $O$, d4), q064 (rhombus: bisected angles, side, perimeter, area), q065 (rectangle: equal diagonals, equal half-diagonals, Pythagoras).
- In the tests, short $\to$ Section A mixes t01 to t03 (q002 t1, q008 t2, q014 t3, q016 t3, q026 t3, q047 t1, q054 t1) and Section B offers q060 (t01) or q063 (t02); the long test covers all three topics in Section A and Section B offers q061, q062 or q065. Check that no stem gives away another in the same test (the rhombus items q014/q057/q058 and the rectangle items q016/q026 are in different tests or ask different things).
- CBSE Class 9 ch10 ("4-gons") has a rhombus-diagonals proof, a rectangle-diagonals proof, a bisector-of-angle item and several numeric rhombus/rectangle items; none of its stems or numbers (diagonals 16 and 12, 12 by 9 and 5, 8 and 6, 4 and 6, the 12 by 5 gate, the 62 and 68 degree items, 14 and 10 m) is reused. ICSE 9 ch09 numbers (9, 14, 11 for the diagonal triangle; 7.2) are not reused for the same figures. Contexts here are imagined and unnamed or named by first name (window frame, gate leaf, mosaic piece, paper lantern, flower bed, signboard, brooch, banner, lawn, noticeboard, shelf, tray, napkin, inlay, dance floor, kite).
- Assertion-reason option wording follows the lib (ICSE 2027 specimen order). Fill-blank answers are numeric text (`31.4`, `113`, `52`, `23`, `200`).
- Model answers for the three-part long items give working for every part with step marks 3 + 3 + 4.
- `src/geo.mjs` was started by an earlier (interrupted) writer; it was reviewed, kept and extended with `paraDiag`, `paraTri` and `triASA` (and a misplaced doc comment fixed).

## Originality
No item is taken from a textbook (Selina, ML Aggarwal, RD Sharma, NCERT), specimen paper or past paper; the ICSE 2027 specimen was used for the assertion-reason option order only. Standard theorems are proved in the common textbook way (co-interior angles; alternate angles and congruent triangles), which is unavoidable for syllabus proofs, but every figure, letter set, number and context is the writer's own.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The proofs that opposite sides are equal and that one equal parallel pair makes a parallelogram are deliberately absent (removed topics).
- The converses used for identifying the special parallelogram are stated with a reason, not proved formally.
- Only one flow figure in the decks (the family of special parallelograms, deck 2 slide 1) plus two in the notes; all other visuals are geometry figures or tables.
