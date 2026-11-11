# ICSE Class 9 Mathematics — Chapter 3: Expansions (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE 2027 Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 3 Algebra)
- **t01** Recall of $(a \pm b)^2$, $(a + b)(a - b)$ and $(x + a)(x + b)$: area model, sign patterns, coefficients, finding an unknown from an expansion, checking with numbers.
- **t02** $(a + b + c)^2$ and its sign variants (three squares, three doubled cross terms); $a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)$; the case $a + b + c = 0$; $(a - b)^2 + (b - c)^2 + (c - a)^2$.
- **t03** $(a \pm b)^3$ (eight-block picture, derivation), $a^3 \pm b^3$ from the sum or difference and the product, $a^2 + \frac{1}{a^2}$ and $a^3 \pm \frac{1}{a^3}$ from $a \pm \frac{1}{a}$ and the reverse direction.
- **t04** Evaluating $103^2$-type squares, products of numbers either side of a round number and cubes such as $49^3$ with identities; choosing the identity by the shape of the problem.
- The chapter lists no removed topics. Not used: factorisation by these identities (chapter 4), $a^3 + b^3 + c^3 - 3abc$ (not in this chapter's topics), complex roots (conditions are always met by real witnesses).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Squares, products and three-term brackets" (t01–t02) 20 slides; Part 2 "Cubes, reciprocal identities and evaluating numbers" (t03–t04) 21 slides |
| Worked examples | 4 + 6 (a square rangoli $(5k + 2)^2$; $(z + 8)(z - 5)$; $(2x + 3y - 4z)^2$; $a^2 + b^2 + c^2$ from $14$ and $63$; $(4p + 1)^3$; $(2a - 5)^3$; $a + \frac{1}{a} = 10$; the reverse direction from $a^2 + \frac{1}{a^2} = 23$; $497 \times 503$; $49^3$) |
| Visuals | 29 of 41 slides (table 24, flow 3, geometry 1, plot 1 on slides); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 14 more (tables, flows, geometry, plot) |
| Check slides | 4 + 4, all objective (q002 mcq, q005 mcq, q008 mcq, q035 fill-blank; q012 mcq, q015 mcq, q037 fill-blank, q022 mcq), none used in a test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 32 (definition 5, formula 8, concept 5, fact 3, example 6, exam-tip 3, diagram 2) |
| Questions | 65 items, 160 marks: mcq 22, assertion-reason 5 (keys a b c d c), true-false 5, fill-blank 5, numerical 7 (3 × 1 mark, 4 × 2 marks), short-2 7, short-3 6, long-10 8 (structured (a)(b)(c), 3 + 3 + 4, 4–6 step marks each) |
| Difficulty | d1 5, d2 19, d3 36, d4 5 |
| Competency | recall 4, understanding 20, application 28, analysis 13 — application or higher 63% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 20, t02 14, t03 23, t04 14 (items may carry two topics) |
| MCQ keys | a 6, b 6, c 5, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch03_short` (20 marks / 30 min: A = q003 q009 q014 q019 mcq, q023 AR, q046 short-2, q052 short-3; B = one of q058, q063) and `_long` (40 marks / 60 min: A = q004 q006 q010 q013 q016 q018 q021 mcq, q026 AR, q045 q048 q051 short-2, q053 q055 short-3; B = any two of q059 q060 q064), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/poly.mjs` (exact polynomial arithmetic and TeX parser), `src/lib.mjs` (shared ICSE 9 builders, copied unchanged from ch01).
Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch03/src/build.mjs`.
Rebuilding is deterministic: `release.json` 4e6544f208e373c7b79520acdc7b707a, `tests.json` 4e1247de6d0a6f159d15f7fc464fbac5 on two runs.

- **Exact arithmetic (`poly.mjs`):** an expression is a Laurent polynomial (negative powers allowed, so $a + \frac{1}{a}$ identities are exact) in single-letter variables with rational coefficients. `P(tex)` parses a typed TeX expression (numbers and decimals, letters, `+ - \times \cdot`, brackets, powers, `\dfrac{..}{..}` with a number or monomial below, implicit multiplication) and `chain(lines)` requires every `=` segment of every typed working line to be the same polynomial. Every expansion, worked example, table row, note formula, flashcard and model answer is typed and checked that way, so a wrong expansion stops the build. The engine has built-in self-tests (known identities and numeric spot checks against direct evaluation).
- **Witness numbers:** every value that depends on a stated condition is also checked at numbers that satisfy it: integer witnesses where they exist (for example $a, b, c = 2, 4, 5$ for $a + b + c = 11$ and $ab + bc + ca = 38$; $4, 6, 8$ for a triangle with perimeter $18$ and $a^2 + b^2 + c^2 = 116$; $12, 9, 8$ for the box in q060), and the real root of the quadratic for the $a \pm \frac{1}{a}$ and $a + b = 6$, $ab = 7$ items (checked to $10^{-9}$). Each witness is asserted to meet the givens before the target is read off.
- **Re-solve:** 131/131 checks pass (`src/resolve.log`, git-ignored). Keys, option values, blanks and numerical answers are typed as literals and compared with recomputed values; each MCQ's options are typed independently so that exactly one equals the target (distractors are the usual slips: the missing factor $2$ or $3$, the wrong sign, $a^3 + b^3$ for $(a + b)^3$, $k^2 - 2$ against $k^2 + 2$).
- **Figures:** the area model is a table (cells multiplied out and compared); the square split into $a^2$, $ab$, $ab$, $b^2$ is a schematic geometry figure (`not_to_scale`); the graph of $(x + 2)^2$, $x^2 + 4x + 4$ and $x^2 + 4$ marks the zero at $x = -2$ (checked numerically) and every plotted point lies on a curve.
- **KaTeX:** 1,691 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$` (₹ is kept outside); no LaTeX outside `$…$`.
- **Narration:** 41 slides, max 78 words, mean 52; numbers in words, no symbols, no capital-letter abbreviations.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build and are clean.

## Originality
CBSE 9 Mathematics ch04 (Exploring Algebraic Identities) was read first for its stems; its numbers and set-ups are not reused
(no $(3x + 5)^2$, $105^2$, $998 \times 1002$, $a + b = 9$ with $ab = 14$, $x + \frac{1}{x} = 6$, $11, -4, -7$, $4.7$ and $5.3$,
$7.5^2 - 2.5^2$, the 8-block cube with $a = 5$, $b = 2$, or $99^3$ / $102^3$ / $101^3$, which turned up in the CBSE 9 and CBSE 11 banks and were replaced by $51^3$, $104^3$, $103^3$). Contexts are imagined and unnamed or named only by first
name (a hall and rug, a courtyard and pond, a banner, a signboard, a rangoli, a cuboid box, a triangular plot, cubical tanks and sweet boxes, a paddy field). A grep of the new
numbers against the other authored banks found no duplicate stem. No item is taken from a textbook (Selina, ML Aggarwal,
RD Sharma, NCERT), specimen paper or past paper; the ICSE 2027 specimen was used for the assertion-reason option order only. The repo-wide originality gate was not run (8 GB machine).

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The cube of side $a + b$ is shown as a table of the eight blocks, not a 3D drawing (no solid-figure visual kind).
- The area-model square is a schematic with dots at the region centres (the geometry kind draws a dot with each label).
- $a + b + c = 0$ gives $a^3 + b^3 + c^3 = 3abc$ in some textbooks; it is left to chapter 4 (factorisation), as the syllabus topics for this chapter do not list it.
- Fill-blank answers are numeric (the platform's fill-blank grader compares text), so q035 and q037 ask for a number only.
- Proof-style content (q057 and the derivation in q062) is verified by exact expansion; the wording of the reasoning is for the reviewer to read.
