# ISC Class 12 Mathematics — Chapter 4: Determinants and Systems of Linear Equations (authored, v1)

Hand-authored production chapter (D-025, D-026) for ISC 2027 Mathematics (860), Paper I, Unit 2 (Algebra).

- **Author:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Style:** follows the CISCE 2027 specimen pattern (sources/cisce.md, anchor `isc-2027-specimen-860-mathematics`): 1-mark objective items including assertion-reason, then 2-, 3- and 5-mark questions. The 5-mark questions are set in parts (3 + 2, 2 + 3, 1 + 2 + 2), with internal choice in the tests.

## Build

From `platform/`, run `npx tsx content/authored/maths/isc-12-mathematics-ch04/src/build.mjs`.

- **Shared lib:** the build imports the ISC lib from `../../isc-12-mathematics-ch01/src/lib.mjs`, not a copy. That lib runs the stage-4 lint, the stage-5 deterministic checks, the originality pre-check of stem prose (maths stripped) against every other chapter, and the *.wip.json parking.
- **Arithmetic:** `src/det.mjs` holds this chapter's own exact integer helpers: determinant, minors, cofactors, adjoint, rank, exact solution as rationals, and LaTeX matrices.
- **Generated values:** every matrix printed in a stem is a constant. Every printed answer is generated from those constants and re-checked a second way:
  - expansion along a different row or column;
  - `A(adj A) = |A|I`;
  - substitution back into the equations;
  - ranks for consistency;
  - identities sampled at 25 integer points.

## Scope (ISC 2027 syllabus)

- **t01:** determinants of order 2 and 3, minors, cofactors, expansion along any line, and elements times the cofactors of another row adding to 0.
- **t02:** properties of determinants. ISC keeps these; CBSE 2026-27 dropped them. Coverage:
  - transpose, interchange, identical or proportional lines, factor out, `R_i → R_i + kR_j`, splitting;
  - determinant equations, for example `(t + 10)(t − 2)²` and `(y + 4)(y − 2)²`;
  - identities: a circulant arithmetic-progression determinant `−9d²(a + d)`, `(p + q, q + r, r + p)` cyclic equals `2 × (p, q, r)` cyclic, and cyclic differences equal `0`.
- **t03:** area of a triangle, collinearity, equation of a line through two points, and finding `k` from a given area (both signs).
- **t04:** adjoint, `A(adj A) = |A|I`, inverse by adjoint, `|adj A| = |A|²`, `adj(adj A) = |A|A`, `(AB)⁻¹ = B⁻¹A⁻¹`, `(Aᵀ)⁻¹ = (A⁻¹)ᵀ` and `|A⁻¹| = 1/|A|`.
- **t05:** consistency (`|A|`, then `(adj A)B`, then check the equations) and the matrix method `X = A⁻¹B` for two and three variables, including word problems: an imagined Lucknow stationery shop and an imagined Kochi bakery.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 (t01–t03) 18 slides; Part 2 (t04–t05) 17 slides. Every slide has a visual: 23 tables, 8 flows, 4 plots. |
| Worked examples | 4 + 4, each computed and asserted in `build.mjs` |
| Check slides | 4 + 4: m03, m07, n02, fb1; m19, fb2, m25, n04. None is used in a test. |
| Notes | 6 sections with key terms, formulas and visuals; exam tips list the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 68 items, 124 marks |
| Difficulty | d1 14, d2 32, d3 16, d4 6 |
| Competency | 54% of items and 71% of marks at application or above (lint band 45–65%) |
| Re-solve | 116/116 checks pass |
| KaTeX | 1,106 maths strings parse in strict mode |
| Tests | `t_isc12math_ch04_short` (20 marks, 50 min) and `_long` (40 marks, 100 min) on the `isc-12-default` blueprints; disjoint |

Question types, from the 68 items:

| Type | Count |
|---|---|
| mcq | 26 |
| assertion-reason | 5 |
| true-false | 3 |
| fill-blank | 3 |
| numerical | 4 |
| short 2-mark | 10 |
| short 3-mark | 11 |
| long 5-mark (in parts) | 6 |

Nine routine one-step items (m03, m08, m14, m20, n01, n02, n03, s202, s207) are tagged understanding under the D-035 rule.

## For a reviewer

- **Matrix method answers** write `A⁻¹` as `(1/|A|) adj A` rather than as a matrix of fractions, as ISC answers usually do.
- **`l02(a)`** proves the cyclic identity by column operations. It needs two column interchanges at the end; an even number keeps the sign. This is stated in the model answer.
- **`ar4`** is keyed (b): both statements are true, but the determinant fact in R does not explain the matrix identity in A.
- **`ar5`** is keyed (b): `|A| = 0` alone does not prove there is no solution.
- **Word problems** use prices and quantities that are imagined and labelled as such. The stationery shop prices are ₹40, ₹15 and ₹120; the bakery runs 6, 4 and 3 batches.
- **Originality:** every set-up and matrix is our own (D-036). Stems were checked by the build against every authored chapter, including CBSE 12 Mathematics ch04, for identical prose with maths removed, and none was found. No textbook or past-paper item is reused.
- **Rendering:** nobody has seen the plots (triangle, collinear points, parallel lines) or the wide matrices in table cells at 360 px, so they need a look on staging.
