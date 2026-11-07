# ICSE Class 10 Mathematics — Chapter 8: Matrices (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** Order of a matrix ($m \times n$, rows first, $mn$ elements); row, column, square, zero (null) and identity matrices; equality of matrices to find unknown elements (single unknowns, pairs of linear equations, three unknowns).
- **t02** Compatibility for addition (same order) and multiplication (columns of the first = rows of the second; order of the product $m \times p$), including deciding which of $AB$, $BA$, $CA$, $AC$ exist.
- **t03** Addition and subtraction up to order $2 \times 2$; multiplication by an integer or a non-zero rational number ($\frac{1}{2}$, $\frac{3}{2}$); $A + O = A$, $A + (-A) = O$; matrix equations such as $2A + X = B$, $2X - A = B$, $\frac{1}{2}X + A = B$.
- **t04** Multiplication of a $2 \times 2$ matrix by a $2 \times 2$ or $2 \times 1$ matrix, and of a $1 \times 2$ matrix by a $2 \times 2$ matrix; $AB \ne BA$ shown by example; $AI = IA = A$; zero products with non-zero factors; $A^2$ and expressions such as $A^2 - 3A + 5I$, $A^2 = pA + qI$; unknowns from a product; $(A + B)^2$ and $(A + B)(A - B)$ for matrices; simple applications (takings, quiz points).
- **Removed for ICSE 2027** (arithmetic with matrices larger than $2 \times 2$): one student-facing note only (notes §7). Larger matrices appear only to state an order ($1 \times 3$, $2 \times 3$, $3 \times 2$) or in compatibility-by-orders items; no sum, difference or product larger than $2 \times 2$ is ever computed (`mat.mjs` refuses it).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Order, types, equality, addition and subtraction" (t01–t03) 20 slides; Part 2 "Multiplication of matrices" (t02, t04) 18 slides |
| Worked examples | 4 + 4 (unknowns from equal matrices; sum and difference; $3P - \frac{1}{2}Q$; solving $2A + X = B$; a juice stall's takings $SP$; $AB$ and $BA$; $A^2 - 3A + 5I = O$; unknowns from a product) |
| Visuals | 26 of 38 slides (table 21, flow 3, plot 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, 25 visuals in all |
| Check slides | 4 + 4, all objective (q001 mcq, q028 true-false, q034 fill-blank, q041 numerical; q006 mcq, q038 fill-blank, q029 true-false, q012 mcq) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 8, formula 7, example 5, concept 4, fact 3, exam-tip 2, diagram 1) |
| Questions | 66 items, 161 marks: mcq 20, assertion-reason 6 (keys a c b d c b), true-false 6, fill-blank 6, numerical 6, short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 7 step marks each) |
| Difficulty | d1 19, d2 30, d3 16, d4 1 |
| Competency | recall 6, understanding 21, application 29, analysis 10 — application or higher 59% of items, 83% of marks (lint band 45–65% of items) |
| Topics | t01 17, t02 11, t03 23, t04 33 (items may carry two or three topics) |
| Tests | `t_icse10math_ch08_short` (20 marks / 45 min: A = q004 q008 q011 mcq, q022 AR, q049 q052 short-3; B = one of q060, q063) and `_long` (40 marks / 90 min: A = q007 q010 q014 q018 q019 q020 mcq, q023 q026 AR, q054 q056 q057 short-4; B = any two of q061 q064 q066), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/mat.mjs` (exact integer matrix arithmetic and LaTeX helpers, with self-checks on import), `src/lib.mjs` (shared ICSE
builders, copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch08/src/build.mjs`;
lint only this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch08/src/lint.mts content/authored/maths/icse-10-mathematics-ch08`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact arithmetic (`mat.mjs`):** every matrix is an integer array; `add`, `sub`, `scal` (a rational scalar $p/q$ only when every entry stays an integer), `mul` (throws unless compatible, and throws for any factor larger than $2 \times 2$), `sq`, `solveInt` (integer Cramer rule, throws unless the solution is unique and integral). Self-checks on import include a Cayley–Hamilton identity and the refusal of a $1 \times 3$ by $3 \times 1$ product.
- **Re-solve:** 139/139 checks pass (`src/resolve.log`). Answer matrices in options, solutions and model answers are typed as literals (`M('a b; c d')`) and each check recomputes them from the givens and compares the LaTeX strings; MCQ option matrices are read back from the option text so exactly one option equals the re-solved answer, and each distractor is recomputed from the slip it models (entrywise product, columns instead of rows, transposed order, a dropped minus sign, a missed halving, squaring each element, $B - A$ for $A - B$). Unknowns are solved exactly and substituted back (e.g. $X N = R$ in l05, $AY = YA$ in l07, $A^2 = pA + qI$ in s406, $(A + B)(A - B) - (A^2 - B^2) = BA - AB$ in s403). Row-by-column working lines are generated from the givens (`prodWork`), so they cannot disagree with them.
- **Slides, tables, notes, flashcards:** every worked example, table entry and flashcard value is recomputed in `build.mjs` and asserted against the typed literal (the build stops on a mismatch). Plots: the lines $x + y = 11$, $x - y = 3$ meeting at $(7, 4)$ and $3x + y = 11$, $x - 2y = -1$ meeting at $(3, 2)$; 4 marked points, all on both lines.
- **KaTeX:** 1,468 math strings parse with KaTeX in strict "error" mode; all 531 `bmatrix` environments checked: 505 multi-row matrices all have their `\\` row breaks and no ragged rows; the 26 one-row matrices are genuine row matrices ($1 \times 2$ or $1 \times 3$); no bare command words inside `$…$`; ₹ is always outside maths.
- **Narration:** 38 slides, max 61 words, mean 42; numbers in words, no symbols or capital-letter abbreviations ("A times B", never "AB").
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 5).
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Verify** (stage-5 deterministic checks on this release): 66 questions, 0 flags. **Originality** (`content originality --authored`, 310 units): 0 errors for this unit.

## Originality
All set-ups and matrices are new and kept to Class 10 level. CBSE 12 Mathematics ch03 (Matrices) and the ISC 12 / CBSE 12 determinant chapters were checked mechanically: no numeric matrix with three or more non-zero entries in this chapter appears in any other unit of the maths bank (several first-draft matrices that coincided, e.g. in m11, m12, tf2, tf3, fb4, s303, s402, s406, l03, l04, l05, were replaced). Well-known textbook examples (the classic $A^2 - 5A + 7I = O$ matrix and similar) were deliberately avoided. People, the canteen, library, juice stall, fruit stall, bakery and inter-house quiz are imagined. CISCE documents were used for pattern only. Similar question shapes use different wording, since the bank duplicate check ignores numbers and maths.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Transpose, symmetric matrices, determinants and inverses are not taught (not in the ICSE 2027 Class 10 topic list); `T` in `mat.mjs` is used only to compute one distractor.
- Difficulty is concentrated at d1–d3 (one d4 item, l05).
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
