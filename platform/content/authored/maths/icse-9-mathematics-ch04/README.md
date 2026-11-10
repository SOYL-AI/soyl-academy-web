# ICSE Class 9 Mathematics — Chapter 4: Factorisation (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE 2027 Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 3 Algebra)
- **t01** Factorising by taking out common factors (highest common factor of terms, a common bracket, a reversed bracket fixed with $b - a = -(a - b)$) and by grouping four terms (including a minus sign between the pairs and rearranging first).
- **t02** Difference of two squares $a^2 - b^2$: perfect-square terms, a common factor first, rearranging into a difference of squares ($x^2 - y^2 - 2y - 1$, $a^2 - 6ab + 9b^2 - 49$), using the identity twice ($16p^4 - 81q^4$) and number shortcuts.
- **t03** Sum and difference of two cubes $a^3 \pm b^3$, with a common factor first, and values of $x^3 \pm y^3$ from $x \pm y$ and $xy$.
- **t04** Quadratic trinomials $ax^2 + bx + c$ by splitting the middle term: $a = 1$ (signs of the two numbers), $a \ne 1$ (pair with sum $b$ and product $ac$), two letters, perfect-square trinomials, a bracket treated as one letter.
- Mixed items needing two methods in sequence, and "find the error in this factorisation" analysis items (wrong product, incomplete factorisation, sign slips).
- The chapter lists no removed topics. Not taught (Class 10): the remainder and factor theorems, and factorising cubic or higher polynomials by trial of zeros.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Common factors, grouping and the difference of two squares" (t01–t02) 22 slides; Part 2 "Cubes, quadratic trinomials and mixed methods" (t03–t04 and mixed) 22 slides |
| Worked examples | 7 + 8 (part 1: $36x^3y - 54x^2y^2 + 18xy$; a reversed bracket; grouping with a minus sign; rearranging then grouping; $72x^3 - 98xy^2$; $x^2 - y^2 - 2y - 1$; $16p^4 - 81q^4$. Part 2: $27m^3 + 64n^3$; $1000 - 27y^3$; $5x^4 + 40x$; $x^2 + 13x + 40$; $x^2 - 17x + 60$ and $x^2 + 4x - 45$; $8x^2 - 22x + 15$; $6x^2 - xy - 12y^2$; two mixed examples) |
| Visuals | 34 of 44 slides (table 28, geometry 5, flow 1); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual plus 1–5 more (tables, area models, a difference-of-squares figure, the method flow chart). Geometry figures: four area models (computed cell products) and the square-with-a-corner-cut figure |
| Check slides | 4 + 3, all objective (q001 mcq, q004 mcq, q005 mcq, q027 true-false; q011 mcq, q012 mcq, q017 mcq), none used in a test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 7 common mistakes |
| Flashcards | 30 (definition 5, formula 6, concept 4, fact 4, example 5, exam-tip 4, diagram 2) |
| Questions | 65 items, 151 marks: mcq 20, assertion-reason 5 (keys c b a d c), true-false 6, fill-blank 6, numerical 7 (4 × 1 mark, 3 × 2 marks), short-2 8, short-3 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 9–10 step marks each) |
| Difficulty | d1 5, d2 19, d3 26, d4 15 |
| Competency | recall 2, understanding 24, application 23, analysis 16 — application or higher 60% of items, 79% of marks (lint band 45–65% of items) |
| Topics | t01 24, t02 23, t03 14, t04 23 (items may carry two topics) |
| MCQ keys | a 5, b 5, c 5, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch04_short` (20 marks / 30 min: A = q002 q008 q009 q015 mcq, q021 AR, q046 short-2, q056 short-3; B = one of q060, q062) and `_long` (40 marks / 60 min: A = q003 q007 q010 q013 q016 q018 q020 mcq, q024 AR, q047 q048 q049 short-2, q054 q057 short-3; B = any two of q059 q063 q064), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/fact.mjs` (exact polynomial arithmetic), `src/figs.mjs` (area models and the difference-of-squares figure), `src/lib.mjs`
(shared ICSE 9 builders, copied unchanged from ch01). Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch04/src/build.mjs`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact arithmetic (`fact.mjs`):** polynomials with integer coefficients in several letters, held as monomial maps (safe-integer checked). `P(tex)` parses typed TeX (integers, single letters, `+ - \times \cdot`, brackets, whole-number powers, implicit multiplication) and `chain(tex)` requires every `=` segment of a working line to expand to the same polynomial, so every factorisation on a slide, table, note, flashcard, solution and model answer is multiplied back and compared with the original expression; a wrong line stops the build.
- **Complete factorisation:** `full(tex)` splits a typed product into its brackets and requires each bracket to be irreducible over the integers: no integer content, no letter common to all terms, a quadratic bracket with a non-square discriminant (one letter, a homogeneous form in two letters, or the conic determinant for a general two-letter quadratic), and cubic or higher binomial brackets that are neither a difference of squares nor a sum or difference of cubes. "Factorise completely" options are compared as `expansion|full` or `expansion|partial`, so that an incomplete product that multiplies back correctly is not accepted as the key; the incomplete forms also drive the error-finding items and the "find the error" table on the slides.
- **Splitting the middle term:** `splitPair(a, b, c)` searches for integers with $p + q = b$, $pq = ac$ and `assertSplit` verifies every split used in a slide, note, solution or option (the area models are built from the product of each column and row term and must add to the expanded product of the two brackets).
- **Re-solve:** 99/99 checks pass (`src/resolve.log`). Keys, option values, blanks and numerical answers are typed as literals and compared with recomputed values; MCQ options are typed independently so that exactly one equals the target (distractors are the usual slips: a sign error in the cubes quadratic, a swapped sign in the pair, an incomplete product, forgetting the $1$ left by a term equal to the common factor, $(x - y)^2$ for $(x - y)(x + y)$). Items on $x \pm y$ and $xy$ are cross-checked by brute force over the integer solutions. Numbers inside solutions and model answers are asserted to be present.
- **KaTeX:** 1,364 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no LaTeX outside `$…$`.
- **Narration:** 44 slides, max 70 words, mean 55; numbers in words, no symbols, no capital-letter abbreviations.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build and are clean.

## Originality
CBSE 9 Mathematics ch02 (Polynomials) and ch04 (Algebraic Identities and Factorisation), CBSE 10 polynomials and ICSE 10 ch07 were read first
for their stems and expressions; none of their expressions or set-ups are reused (no $x^2 - 81$, $4x^2 - 20x + 25$, $x^2 + 9x + 20$, $x^2 - 5x - 36$, $6x^2 + 7x - 3$,
$27a^3 - 8b^3$, $7.5^2 - 2.5^2$, $998 \times 1002$, $36^2 - 34^2$ or $a + b = 9$, $ab = 14$). Contexts are imagined (a school garden's beds, a vegetable plot, a mosaic panel, a banner, a stage floor, a hall to be tiled, a lawn with a pond, a trader's millet), named only by first name. A word 5-gram
Jaccard scan of all 65 stems against all 7,498 stems in the other authored banks gave a maximum of 0.16 (against the 0.7 gate); the only shared maths span is the generic identity
$a^2 - b^2 = (a - b)(a + b)$ and $\pi = \frac{22}{7}$. No item is taken from a textbook (Selina, ML Aggarwal, RD Sharma, NCERT), specimen paper or past paper; the ICSE 2027 specimen was used for the assertion-reason option order only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Variable names are chosen to avoid the build's lost-backslash scan (for example `12pu - 18pv` rather than `12pm - 18pn`, because `pm` is a TeX command).
- The area models label cells as points (a dot with the product); the reviewer may prefer cell labels without dots once the renderer is checked.
- Fill-blank answers are numeric (the platform's fill-blank grader compares text), so factorised answers are asked as a coefficient or constant (q032–q037).
- Long items are scored in parts (3 + 3 + 4) with step marks per part; a few parts mix methods on purpose (common factor, grouping and squares; squares then cubes in q065).
- The quartic $x^4 - 13x^2 + 36$ (q064) and $x^6 - 64$ (q065) go slightly beyond the plain patterns by treating $x^2$ or $x^3$ as one quantity; they are labelled application-level challenge parts and can be dropped from a test without changing the blueprint.
