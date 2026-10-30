# ISC Class 12 Mathematics — Chapter 3: Matrices (authored, v1)

Hand-authored production chapter (D-025, D-026) for ISC 2027 Mathematics (860), Paper I, Unit 2 (Algebra).

- **Author:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Style:** follows the CISCE 2027 specimen pattern (sources/cisce.md, anchor `isc-2027-specimen-860-mathematics`): 1-mark objective items including assertion-reason, then 2-, 3- and 5-mark questions, with the 5-mark ones set in parts and internal choice.
- **Shared library:** `isc-12-mathematics-ch01/src/lib.mjs`, imported and not copied.
- **Matrix arithmetic:** `src/mat.mjs` does it all with integers. Fractions only appear as an integer matrix over a common denominator, so every check is exact.

## Scope (ISC 2027 syllabus)

- **t01 Order, equality, types and transpose:**
  - order and the $a_{ij}$ notation, and matrices built from a rule;
  - row, column, zero, diagonal, scalar, identity and upper and lower triangular matrices, and how the types nest;
  - equality of matrices;
  - the transpose and its laws, including $(AB)' = B'A'$.
- **t02 Symmetric and skew-symmetric matrices:**
  - definitions, and why the diagonal of a skew-symmetric matrix is zero;
  - $A + A'$ is symmetric and $A - A'$ is skew-symmetric;
  - the split $A = \tfrac12 (A + A') + \tfrac12 (A - A')$ and its uniqueness;
  - only $O$ is both symmetric and skew-symmetric.
- **t03 Operations:**
  - addition, subtraction and scalar multiplication;
  - multiplication and compatibility, with the order of a product;
  - non-commutativity, with $(A + B)^2$ and $(A + B)(A - B)$ expanded with care;
  - non-zero matrices whose product is zero;
  - matrix polynomials, where a constant $c$ becomes $cI$.
- **t04 Singular and invertible matrices:**
  - singular and non-singular $2 \times 2$ matrices, using $ad - bc$ (the general determinant is left to ch04);
  - the definition $AB = BA = I$;
  - proof that the inverse is unique;
  - verifying inverses, finding a $2 \times 2$ inverse by solving $AB = I$ entry by entry, and finding inverses from matrix equations such as $A^2 - 5A + 7I = O$;
  - $(AB)^{-1} = B^{-1}A^{-1}$ verified on an example.
- **Removed topic respected:** no matrix of order greater than $3$ appears.
- **Left to ch04:** the inverse by the adjoint.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Order, types, transpose and symmetry" (t01–t02), 19 slides. Part 2 "Operations and invertible matrices" (t03–t04), 18 slides. |
| Visuals | 29 of 37 slides have a visual (23 tables and 6 flows), never more than 1 slide in a row without one. Every product, type, split and inverse shown is computed and asserted in `build.mjs`. |
| Worked examples | 3 + 4: a matrix from a rule, equality, a symmetric/skew split, a product, a matrix equation, an inverse from $AB = I$, and an inverse from $A^2 - 3A + 2I = O$ |
| Check slides | 4 + 4 on objective items that are not in either test (m04, m03, n01, m10; m15, m18, m22, n03) |
| Notes | 6 sections with key terms, formulas and visuals, plus exam tips on ISC step marking and 6 common mistakes |
| Flashcards | 30 |
| Questions | 68 items worth 121 marks: mcq 24 (keys balanced a6 b6 c6 d6), assertion-reason 6 (keys a a a c d b), true-false 3, fill-blank 4, numerical 6, short 2-mark 9, short 3-mark 10, long 5-mark 6 (each set in parts) |
| Difficulty | d1 12, d2 35, d3 16, d4 5 |
| Competency | recall 4, understanding 27, application 24, analysis 13. That is 54% of items and 69% of marks at application or above (lint band 45–65% of items). |
| Tests | `t_isc12math_ch03_short` and `t_isc12math_ch03_long`, below. The two tests share no items and use no deck-check items. |

**Short test:** 20 marks in 50 minutes.
- A: m02, m09, m14, m20 and ar1.
- B: s201, then s205 or s207.
- C: s302, then s305 or s307.
- D: l02.

**Long test:** 40 marks in 100 minutes.
- A: 10 MCQs, plus ar3 and ar5.
- B: s202, s204, then s206 or s208.
- C: s301, s304, s306, then s309 or s310.
- D: l01, then l03 or l04.

## Verifier record

Run from `platform/`: `npx tsx content/authored/maths/isc-12-mathematics-ch03/src/build.mjs`. It prints NO ERRORS, the stage-4 lint shows 0 errors and 0 warnings, and two builds give byte-identical `release.json` and `tests.json`.

- **Re-solve:** 119/119 checks pass (`src/resolve.log`, gitignored).
  - MCQ options typed as literal matrices are compared with the exact computed product, transpose, power or split. Exactly one option must match, and it must be the key.
  - Numericals are recounted by brute force: diagonal 0/1 matrices ($8$), orders for $18$ entries ($6$), and skew-symmetric matrices with entries from $\{-1, 0, 1\}$ ($27$, from all $3^9$ matrices).
  - Every matrix in a model answer is regenerated from the givens and must appear verbatim.
  - Inverses are checked with $AN = NA = kI$ in integers, where $A^{-1} = \tfrac1k N$.
  - "Not invertible" and "unique inverse" items are backed by exhaustive searches over small integer matrices.
- **KaTeX:** 1,263 maths strings parse in strict mode, with no LaTeX outside `$…$`.
- **Narration:** 37 slides, at most 58 words each (mean 40), with no symbols, abbreviations or letters mixed with digits.
- **Originality:**
  - Every set-up is SOYL's own: marks of two imagined Ooty students, a Kochi bakery, a Madurai ration bill, Mysuru tiffin stalls, Patna coaching centres, a Nagpur traffic study and a Guwahati seating code.
  - No CBSE 12 ch03, NCERT, ISC-textbook or past-paper matrix or wording is reused (D-036).
  - The lib's exact-stem pre-check, which compares prose with maths stripped against all authored chapters and exemplars, passes.

## For a reviewer

- **Singular matrices:** they are introduced through the $2 \times 2$ number $ad - bc$, because the syllabus places determinants in ch04. The 3-mark singular item (s208) also argues from the rows of the product, so it does not depend on determinants.
- **`ar6`:** it is keyed (b). $A + A'$ is symmetric, but not because $A$ and $A'$ are symmetric, which they are not here.
- **`l04`:** it gives $B^{-1} = -\tfrac12\begin{bmatrix} 9 & -7 \\ -8 & 6 \end{bmatrix}$ and asks students to verify it, rather than derive it. A distractor check confirms that $A^{-1}B^{-1}$ is not the inverse of $AB$.

## Gaps / follow-ups

- **Audio:** narration audio is not generated yet (TTS stage).
- **Visuals:** the chapter has no plots. Matrices are shown as tables and flows; matrices inside table cells are rendered by KaTeX inline.
