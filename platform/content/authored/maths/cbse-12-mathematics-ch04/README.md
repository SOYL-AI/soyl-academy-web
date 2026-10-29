# CBSE Class 12 Mathematics — Chapter 4: Determinants (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the
CBSE 10 maths authored chapters. Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`,
`model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, 041)
- **t01** Determinants of order 1, 2 and 3: the 2 × 2 rule, expansion along any row or column with the chessboard signs, choosing the line with the most zeros, equations involving determinants.
- **t02** Area of a triangle from its vertices (half the absolute value; both signs when the area is given), collinearity, equation of the line through two points.
- **t03** Minors, cofactors, adjoint (transpose of the cofactor matrix, 2 × 2 shortcut), A(adj A) = (adj A)A = |A|I, singular / non-singular, A⁻¹ = adj A / |A|; results |adj A| = |A|ⁿ⁻¹, |kA| = kⁿ|A|, |A⁻¹| = 1/|A|, |AB| = |A||B| used as stated results.
- **t04** Systems of linear equations in two or three variables by the matrix method X = A⁻¹B; consistency (|A| ≠ 0 unique; |A| = 0 with (adj A)B ≠ O inconsistent; (adj A)B = O infinitely many or none).
- **Removed topic absent:** properties of determinants (row and column operations, factor-style simplification) are not taught or needed anywhere; every determinant is evaluated by direct expansion. Elementary row operations for the inverse are also absent (mentioned once each, in an exam-tip slide and the notes, as outside the 2026–27 syllabus).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Evaluating determinants, areas and collinearity" (t01–t02) 22 slides; Part 2 "Adjoint, inverse and systems of equations" (t03–t04) 22 slides |
| Worked examples | 8 + 6 (2 × 2; one 3 × 3 expanded along row 1 and along column 3; determinant equation; triangle area; unknown vertex from area with both signs; collinearity; line through two points; nine cofactors of Q; 2 × 2 and 3 × 3 inverses; two- and three-variable systems; singular systems) |
| Visuals | 34 of 44 slides (plot 9, table 19, flow 6); max 1 slide in a row without a visual. Notes: 7 sections, each with a visual (plus two extra plots); 1 question figure (collinear points) and 1 case figure (garden triangle) |
| Check slides | 4 + 4, all objective (q001, q026, q004, q007; q009, q015, q012, q017); none is used in either chapter test |
| Notes | 7 sections with key terms, formulas and a visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (definition 5, fact 2, formula 10, example 2, concept 4, exam-tip 6, diagram 1) |
| Questions | 68 items, 129 marks: mcq 18, assertion-reason 6 (keys a a d c b d), true-false 5, fill-blank 5, numerical 7, short-2 9, short-3 8, long-5 6, case-based 4 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 8, d2 33, d3 23, d4 3, d5 1 |
| Competency | recall 4, understanding 32, application 25, analysis 7 — application or higher 47% of items, 57% of marks (lint band 45–65%) |
| Tests | `t_cbse12math_ch04_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests; self-checks every slide and notes example), `src/questions.mjs`
(bank + re-solve checks), `src/det.mjs` (independent determinant, cofactor, adjoint, inverse, area and system code;
matrix helpers copied from `cbse-12-mathematics-ch03/src/mat.mjs`). The shared builders and validator are
`cbse-12-mathematics-ch01/src/lib.mjs`. Run from `platform/`:
`npx tsx content/authored/maths/cbse-12-mathematics-ch04/src/build.mjs`; lint this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch04`.

- **Re-solve:** 154/154 checks pass (`src/resolve.log`). Every determinant is recomputed by first-row expansion, independent of the row or column the text uses; every typed cofactor, adjoint and inverse is compared with the computed one and inverses are checked both ways (AB = BA = I); every system is solved by A⁻¹B and the typed answer compared; consistency is decided by |A|, (adj A)B and a rank comparison; unknowns from areas and determinant equations are found by integer search so every root is listed (e.g. k = 3 or −5, k = 4 or −2, x = ±7).
- **Slides and notes:** `build.mjs` stops if any worked example disagrees with `det.mjs` (both expansions of the 3 × 3 example give 72; the nine cofactors and adjoint of Q; the 2- and 3-variable systems; the singular pair with (adj A)B = (2, −1) and with (adj A)B = O).
- **Plots:** 37 marked points lie on their curves and match their labels (one origin vertex is marked `on_curve: false`), 5 zeros located numerically and all marked, 15 points checked on two drawn sides.
- **KaTeX:** 1294 math strings parse in strict mode; every bmatrix/vmatrix (233) checked for intact row separators.
- **Narration:** 44 slides, max 64 words, mean 49; no symbols, digits mixed with letters or letter abbreviations.
- **Pipeline checks on this chapter:** stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks 0 flags; bank near-duplicate check 0 flags; release and both tests parse with the shared zod schemas. Rebuilding is byte-identical.
- **Originality:** all matrices, systems, triangles and contexts are new. Familiar textbook set-ups were deliberately avoided (for example the (AB)⁻¹ = B⁻¹A⁻¹ verification and the triangle-area and 2 × 2 system items use fresh numbers). Case contexts: Annual Day prizes in Lucknow, fertiliser bags near Ludhiana, a garden in Chandigarh, kabaddi tickets in Chennai.

## Facts a reviewer should double-check
- c01 uses a coefficient matrix with |A| = 1, so A⁻¹ = adj A (the passage gives adj A).
- ar5 key (b): R is a consequence of a non-zero determinant, not the reason this determinant is non-zero.
- m08 and tf1 carry plain-text explanations; competency tags were set by what each item demands (routine expansion or a single formula = understanding; setting up and solving for an unknown, chaining two results, or consistency decisions = application or higher).

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Tables contain `bmatrix`/`vmatrix` inside `$…$` cells; the renderer must handle matrix environments in table cells (as in ch03).
- The triangle and garden plots draw sides as line segments with `domain`; a renderer that ignores `domain` would extend them across the plot.
