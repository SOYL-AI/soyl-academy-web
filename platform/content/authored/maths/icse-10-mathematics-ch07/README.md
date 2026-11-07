# ICSE Class 10 Mathematics — Chapter 7: Factorisation of Polynomials: Remainder and Factor Theorems (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** Remainder theorem: the division algorithm $f(x) = (x - a)q(x) + r$ with a constant remainder; remainder on division by $(x - a)$, $(x + a)$ and $(ax \pm b)$ (including $(1 - 2x)$); long division as a cross-check; one unknown coefficient from a given remainder, two unknowns from two remainders, equal remainders of two polynomials.
- **t02** Factor theorem: testing linear expressions (integer and fractional zeros), quick tests (coefficient sum $0$ gives $(x - 1)$; equal even/odd sums give $(x + 1)$), unknown coefficients from one or two given factors, a quadratic divisor split into two linear factors.
- **t03** Factorising a cubic completely after finding one factor by trial (divisors of the constant term; fractions when the leading coefficient is not $1$), dividing (long division or inspection, grouping where it applies), factorising the quadratic quotient, repeated factors, quadratic factors with negative discriminant that cannot be factorised further, checking by values.
- Removed for ICSE 2027: polynomials of degree higher than 3 — mentioned once, in notes section 1 ("not in the ICSE 2027 syllabus"); every polynomial in the chapter has degree ≤ 3 (asserted by `factorise`).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "The remainder theorem and the factor theorem" (t01–t02) 19 slides; Part 2 "Unknown coefficients and factorising cubics completely" (t02–t03) 17 slides |
| Worked examples | 6 + 5 (remainder on division by $(x + 3)$ with a division check; by $(2x - 1)$; one unknown from a remainder; two unknowns from two remainders; testing $(x - 3)$ and $(x + 1)$; showing $(2x + 3)$ is a factor; find $k$ from a factor then factorise; two given factors and the third factor; trial then divide; long division of $2x^3 - 3x^2 - 17x + 30$; a cubic with an irreducible quadratic factor) |
| Visuals | 24 of 36 slides (plot 8, table 13, flow 3); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 11 more. Question asset: plot on q017 |
| Check slides | 4 + 4, all objective (q002 mcq, q031 fill-blank, q006 mcq, q030 true-false; q039 numerical, q010 mcq, q014 mcq, q025 true-false) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 28 (definition 2, fact 4, formula 2, concept 8, example 6, diagram 1, exam-tip 5) |
| Questions | 67 items, 169 marks: mcq 18, assertion-reason 6 (keys c d b a c b), true-false 6, fill-blank 6, numerical 7 (3 × 1 mark, 4 × 2 marks), short-2 5, short-3 6, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4 or 3 + 4 + 3, 5–7 step marks each) |
| Difficulty | d1 11, d2 31, d3 23, d4 2 |
| Competency | recall 3, understanding 25, application 28, analysis 11 — application or higher 58% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 31, t02 31, t03 21 (items may carry two or three topics) |
| Tests | `t_icse10math_ch07_short` (20 marks / 45 min: A = q003 q007 q009 mcq, q020 AR, q050 q052 short-3; B = one of q061, q062) and `_long` (40 marks / 90 min: A = q004 q005 q008 q012 q013 q017 mcq, q019 q022 AR, q055 q056 q059 short-4; B = any two of q063 q065 q066), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/poly.mjs` (exact fractions and polynomials), `src/work.mjs` (working-line checker), `src/lib.mjs` (shared ICSE
builders, copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch07/src/build.mjs`;
lint only this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch07/src/lint.mts content/authored/maths/icse-10-mathematics-ch07`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Polynomials (`poly.mjs`):** all arithmetic is exact (reduced integer fractions, safe-integer asserted). Every remainder is computed twice — by substituting the zero of the divisor and by long division — and the two must agree; every division is checked back (divisor × quotient + remainder = dividend). Rational zeros are found among the candidates $\pm p/q$ and confirmed by exact substitution; every factorisation is expanded back and must equal the polynomial. Unknown coefficients are solved by exact elimination over fractions (each condition is first checked to be linear in the unknowns at extra points) and substituted back into every condition. Evaluation lines such as $f\left(-\dfrac{3}{2}\right) = \ldots = 0$ are generated term by term from the polynomial.
- **Working lines (`work.mjs`):** every equation typed in a worked example, note, flashcard or model answer is parsed from its TeX by an exact parser (fractions, powers, brackets, implicit multiplication, named polynomials such as $f(2)$ or $g\left(\dfrac{1}{2}\right)$) and evaluated with exact fractions. Neighbouring sides that both contain the unknown must be identical (nine sample points; for factorisation chains also a non-zero multiple of the verified polynomial or quotient), numeric sides must be equal exactly, and an equation between them must hold at a verified zero or at the solved coefficients; "or" alternatives must cover every solution; `\ne` claims are checked. Typed polynomials with unknowns ($x^3 + kx^2 - 7x + 4$, $x^3 + px^2 + qx - 6$, …) are compared with the templates used to solve them. A scratch negative test confirmed the checker rejects wrong values, wrong expansions, missing roots and wrong coefficients. An unparsable line stops the build.
- **Re-solve:** 373/373 checks pass (`src/resolve.log`). Keys and option values are typed as literals and compared with recomputed values; MCQ distractors are the usual slips, each recomputed (wrong sign of the substituted value, substituting $1$ or $2$ for $(2x - 1)$, $f(-3)$ instead of $f(3)$, the value of the quotient, a factorisation with all signs reversed, a wrong quotient). Factorisation options are compared with the polynomial by exact evaluation. The carton problem's edges and volume are checked against $V(6)$.
- **Plots:** 31 marked points lie on their curves and match their labels; 26 zeros located numerically (including the fractional zeros $\tfrac{3}{2}$, $-\tfrac{1}{2}$, $-\tfrac{3}{2}$) are all marked wherever any zero is marked; remainder points such as $(3, -10)$ are the computed values.
- **Tables:** division steps, remainder-by-division vs value, zero-of-divisor, conditions, trial tables, rules with examples, value checks of a factorisation — all computed and asserted in `build.mjs`.
- **KaTeX:** 1,430 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`.
- **Narration:** 36 slides, max 62 words, mean 43; numbers in words, no symbols, no capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note; a scan found no solution sentence of 60+ characters repeated in student-facing text.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`): 67 questions, 0 flags. **Originality** (`content originality --authored`): 0 errors, 0 warnings (the first run found five near-duplicate pairs inside this chapter — numbers are ignored — and one stem of each was reworded).

## Originality
CBSE 10 Mathematics ch02 (Polynomials) is in the bank; all its stems were read first. It covers zeros and the
relationship between zeros and coefficients, not division; no set-up, polynomial or wording is reused (in particular
not $x^3 - 3x^2 - x + 3$ or the "if 2 is a zero of …, find $k$" pattern). Very common textbook polynomials were
avoided on purpose (e.g. $x^3 - 6x^2 + 11x - 6$, $x^3 + 2x^2 - 5x - 6$, $x^3 - 4x^2 + x + 6$), and the well-known
exercise patterns "$ax^3 + 3x^2 - 13$ and $2x^3 - 5x + a$" and "$x^3 + ax^2 + bx + 6$ with factor $(x - 2)$ and
remainder 3" were not used. The only context (a carton whose edges are the factors) is imagined and labelled as
such. No item is taken from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past paper; CISCE documents
were used for pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Long division is shown as step tables and step lines (divide, multiply back, subtract), not in the traditional bracket layout.
- Model answers describe graphs in words (answers carry no visuals); only q017 carries a figure in the stem.
- Synthetic division is not used (not required by the syllabus).
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
