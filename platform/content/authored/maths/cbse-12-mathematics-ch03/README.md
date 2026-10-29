# CBSE Class 12 Mathematics — Chapter 3: Matrices (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the structure of the
CBSE 10 maths chapters. Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`.
All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Mathematics 041, Unit II Algebra)
- **t01** Notation, order, general element $a_{ij}$, matrices from a rule, equality, types (row, column, square, diagonal, scalar, identity, zero).
- **t02** Addition, scalar multiplication, multiplication (conformability, row-by-column rule), properties, non-commutativity with 2 × 2 examples, zero products of non-zero matrices, matrix polynomials, a 2 × 2 matrix acting on the unit square.
- **t03** Transpose and its four properties (reversal law), symmetric and skew-symmetric matrices, $A = \frac12(A + A^T) + \frac12(A - A^T)$ with proof.
- **t04** Invertible matrices, proof that the inverse is unique, inverses of 2 × 2 matrices only by verifying $AB = BA = I$, by solving $AB = I$ for the entries, or from a relation such as $A^2 - 5A + 7I = O$.
- **Removed topic absent:** elementary row operations for the inverse appear nowhere (the notes and a flashcard say only that they are outside the 2026-27 syllabus). The determinant/adjoint method is left to ch04; determinants are not used in any solution.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Matrices, types and operations" (t01–t02) 23 slides; Part 2 "Transpose, symmetric matrices and inverses" (t03–t04) 20 slides |
| Worked examples | 4 + 5 (construct $a_{ij} = 3i - j$; unknowns from equality; a 2 × 3 by 3 × 2 product; $A^2 - 5A + 7I = O$; reversal law; symmetric + skew split; verify an inverse; inverse by solving $AB = I$; inverse from the relation) |
| Visuals | 35 of 43 slides (table 23, flow 10, geometry 2); max 1 slide without a visual. Notes: 7 sections, each with a visual plus 12 more (tables, flows, the unit-square figure) |
| Check slides | 3 + 3, all MCQ (q003, q006, q008; q013, q015, q017) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 8 common mistakes |
| Flashcards | 32 (definition 8, fact 6, formula 6, concept 4, example 3, exam-tip 4, diagram 1) |
| Questions | 69 items, 130 marks: mcq 19, assertion-reason 6 (keys a b c d a b), true-false 5, fill-blank 5, numerical 7, short-2 9, short-3 8, long-5 6, case-based 4 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 9, d2 28, d3 25, d4 6, d5 1 |
| Competency | recall 8, understanding 26, application 25, analysis 10 — application or higher 51% of items, 68% of marks (lint band 45–65% of items) |
| Topics | t01 14, t02 31, t03 19, t04 14 (items may carry two topics) |
| Tests | `t_cbse12math_ch03_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-12-default-chapter-test-short/long` (A objective, B short 2/3 with choice, C long with choice, D case); disjoint |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/mat.mjs` (independent matrix arithmetic and a LaTeX formatter), shared builders in
`../cbse-12-mathematics-ch01/src/lib.mjs`. Run from `platform/`:
`npx tsx content/authored/maths/cbse-12-mathematics-ch03/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch03`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Re-solve:** 148/148 checks pass (`src/resolve.log`). Every answer is typed as a literal; the check recomputes it from the givens with `mat.mjs` and compares: products and powers ($AB$, $BA$, $A^2$, $A^4$, $A^{10}$), transposes and the reversal law, symmetric and skew-symmetric parts (and that they add back to $A$), inverses by $AB = I$ **and** $BA = I$, matrix relations such as $A^2 - 4A + I = O$, which product is defined (by attempting it), and the totals in the canteen, cricket-kit, dairy and message-coding contexts. Each MCQ's options are tested independently so exactly one equals the re-solved target.
- **Proof items** (s207, s307, l04 (a)–(b), l06, tf4, ar4) also get numeric spot checks: the identity holds on sample matrices, associativity on a sample, $E(a)E(b) = E(a + b)$ for three pairs including fractions and negatives.
- **Slides and notes:** every worked example, table entry and the unit-square figure (corner images computed as $M$ times each corner; $R' = Q$ handled with one label) are recomputed in `build.mjs`; the build stops on any mismatch.
- **KaTeX:** 1575 math strings parse with KaTeX 0.19 in strict "error" mode; matrices use `bmatrix`; no Unicode maths symbols inside `$…$`.
- **Narration:** 43 slides, max 71 words, mean 53; no symbols, digits mixed with letters, or capital-letter abbreviations (products are spoken as "A times B").
- **MCQ key balance:** options rotated after the re-solve; keys cycle a → b → c → d (a 6, b 6, c 6, d 5 including case parts); option letters in solutions and case model answers are remapped.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings.

## Originality
All matrices, contexts and numbers are new (Pune school canteens, a Meerut cricket-kit dealer, an Anand dairy cooperative supplying Surat and Vadodara, a Kolkata football passing matrix, a Bhopal coding club's message code, a Jalandhar sports shop). Familiar exercise shapes (construct $a_{ij}$ from a rule, express as symmetric + skew-symmetric, inverse from a quadratic relation) use different rules and matrices from the textbook. No textbook, sample-paper or past-paper text was used.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- `table` cells use `$…$` maths (including `bmatrix`) per the current contract; renderers must support display-size matrices inside cells.
- The unit-square figure is a `geometry` visual without axes ticks (dashed segments stand in for the axes); point labels carry the real coordinates, drawing coordinates are offset by 0.6.
