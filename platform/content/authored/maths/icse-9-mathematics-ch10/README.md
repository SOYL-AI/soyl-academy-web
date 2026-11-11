# ICSE Class 9 Mathematics — Chapter 10: Pythagoras Theorem (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE 2027 Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 4 Geometry)
- **t01** Area-based proof of Pythagoras theorem: four congruent right-angled triangles in a square of side $a + b$, the tilted middle shape is a square of side $c$ ($x + y = 90^\circ$ on a straight line), the area counted two ways, with the algebra; checked with legs 3 and 5 (figure), 20 and 21, 11 and 60; a second area proof (square of side $c$, middle square of side $b - a$) in the long items; finding the hypotenuse, a leg, a surd or rounded answer, and a missing side from areas of squares.
- **t02** The converse with its proof (build a right-angled triangle with the same two shorter sides; hypotenuse equal; congruent by three equal sides); the three-step test; right-angled and not-right-angled examples ($28, 45, 53$ and $14, 48, 49$); Pythagorean triples from $m^2 - n^2, 2mn, m^2 + n^2$; scaling a triple (multiplying keeps the right angle, adding does not).
- **t03** Applications: ladders (including a ladder pulled outwards), routes east-then-north, diagonals of rectangles and squares, heights of isosceles and equilateral triangles, sides and perimeter of a rhombus from its diagonals, a quadrilateral split by a diagonal into two right triangles, an isosceles trapezium, and the result $AB^2 + CD^2 = AD^2 + BC^2$ for perpendicular diagonals (with proof).
- The chapter lists no removed topics. No trigonometry, no coordinate formulas and no similarity are used.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "The theorem and its area proof" (t01, start of t03) 23 slides; Part 2 "The converse, triples and applications" (t02–t03) 22 slides |
| Worked examples | 5 + 8 (the proof in numbers 20 and 21; hypotenuse of legs 2.8 and 4.5; a leg from hypotenuse 8.5; $\sqrt{130}$; a leg from areas of squares; converse $28, 45, 53$ and $14, 48, 49$; ladder 10.1 m; rectangle 9 by 40; square of side 8; equilateral side 12; rhombus with diagonals 32 and 60; a helicopter route 33 km and 56 km) |
| Visuals | 38 of 45 slides (geometry 20, flow 5, table 13); max 1 consecutive slide without a visual. Notes: 8 sections, each with a visual, plus 2 extra figures and a table; 15 geometry figures and 1 table in the questions |
| Check slides | 4 + 3, all objective (q001 mcq, q004 mcq, q002 mcq, q028 true-false; q007 mcq, q022 mcq, q029 true-false), none used in a test |
| Notes | 8 sections with key terms and formulas; exam tips with mark split and 5 common mistakes |
| Flashcards | 31 (definition 6, formula 8, concept 7, fact 4, example 3, exam-tip 2, diagram 1) |
| Questions | 65 items, 155 marks: mcq 22, assertion-reason 5 (keys c a b d c), true-false 5, fill-blank 5, numerical 7 (2 × 1 mark, 3 × 2 marks, 2 × 3 marks), short-2 8, short-3 6, long-10 7 (structured (a)(b)(c) with 7–10 step marks each, 3 + 3 + 4 or 2 + 4 + 4) |
| Difficulty | d1 3, d2 24, d3 33, d4 5 |
| Competency | recall 3, understanding 23, application 29, analysis 10 — application or higher 60% of items, 75% of marks (lint band 45–65% of items) |
| Topics | t01 12, t02 14, t03 37, t02 + t03 2 (items may carry two topics) |
| MCQ keys | a 6, b 6, c 5, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch10_short` (20 marks / 30 min: A = q003 q009 q013 q018 mcq, q025 AR, q048 short-2, q055 short-3; B = one of q059, q062) and `_long` (40 marks / 60 min: A = q005 q008 q010 q012 q016 q019 q021 mcq, q024 AR, q046 q049 q051 short-2, q054 q057 short-3; B = any two of q061 q063 q065), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank + one re-solve check per item),
`src/pyth.mjs` (geometry and arithmetic helper), `src/figs.mjs` (shared figures), `src/lib.mjs` (shared ICSE 9 builders, copied unchanged from `icse-9-mathematics-ch01`).
Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch10/src/build.mjs`.
Rebuilding is deterministic: two runs give identical `release.json` (md5 `4efaf86d2efa636f813e999665737904`) and `tests.json` (md5 `f9b7b81f367b781bfd5034aeaef339ae`).

- **Figures from coordinates (`pyth.mjs` `fig`):** every figure is placed from coordinates. The builder throws if a numeric length label differs from the real length, if segments sharing a tick count are not equal, if segments sharing an arrow count are not parallel, if a right-angle mark or numeric degree label disagrees with the measured angle, or if angle arcs of the same count are unequal. Surd labels (such as $8\sqrt{2}$ or $6\sqrt{3}$) are generated from the exact squared length, never typed.
- **Exact arithmetic:** squared lengths are compared as integers (`E`, with a scale `u` for decimals such as 2.8, 4.5, 5.3 in tenths); a squared length that is not an integer to within 1e-6 throws. Surd answers are checked by `surd(n)` (largest square factor split off, the typed answer compared with its exact TeX); decimals are rounded by `rnd`/`sqrtTo`, which refuse values within 1e-4 of a rounding boundary. `classify` tests a triangle (right, acute, obtuse) on integer squares.
- **Theorems as computations:** `areaProof` (square of side $a + b$, four corner triangles each right-angled at the corner with legs $a$ and $b$, four equal slanting sides, four right angles, $x + y = 90^\circ$, big square = four triangles + middle square), `areaProofB` (the second proof: inner side $b - a$ from a rotated construction), `converseProof`, `iso`, `equi`, `rhombus`, `rectDiag`, `ladder`, `perpQuad` (four right triangles at $O$, $AB^2 + CD^2 = AD^2 + BC^2$) and `genTriple`. Every proof item (q059 to q065 and the short proofs) asserts the facts its model answer uses, plus every number in it; q062 builds the quadrilateral $ABCD$ with $AB = 33$, $BC = 56$, $CD = 60$, $DA = 25$ from coordinates and measures the right angle at $D$.
- **Counter-examples behind distractors:** a rhombus with four equal sides and no right angle (q005), $14, 48, 49$ against $14, 48, 50$ (q029), $+ 3$ on every side of $28, 45, 53$ (q021), the sums and differences of lengths used instead of squares, and the mistakes of forgetting to halve the base ($\sqrt{793}$ in q013) or the factor 2 in $2mn$ (q022).
- **Re-solve:** 143/143 checks pass (`src/resolve.log`, git-ignored). Numeric MCQ options are typed independently and `which` confirms exactly one equals the re-solved value.
- **KaTeX:** 1,503 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no LaTeX outside `$…$`.
- **Narration:** 45 slides, max 88 words, mean 68; numbers in words, no symbols, letters of figures separated ("A B C"), no capital-letter abbreviations.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build and are clean.
- **Originality scan (scratch, not committed):** word 5-gram Jaccard of every stem against all 8,017 authored maths items (CBSE 9/10/11/12, ICSE 9/10, ISC): no stem of this chapter reaches the 0.7 duplicate threshold, and none is an exact match after maths is stripped (one fill-blank stem that matched a CBSE 9 ch09 stem was rewritten).

## Points for a reviewer
- **Scope vs the ICSE book:** the area proof is the square-in-a-square proof (side $a + b$). The second area proof (q060, side $c$ with a middle square of side $b - a$) is an extra, kept to two long-item parts. Triples from $m^2 - n^2$, $2mn$, $m^2 + n^2$ are stated without proof (used in q022, deck 2 slide 8); drop them if the board does not expect them. The acute/obtuse side of the test (`classify`) is used only to assert "not right-angled"; the chapter never asks for acute or obtuse.
- **Topic balance:** t01 has 12 items against 39 for t03, because the syllabus has one proof outcome and the board's applications are mostly t03. The proof is also in q059, q060 and q001 to q005 (five objective items) and the two deck checks.
- **Deck 1 has 23 slides** (about 16–22 asked); the "reasons" slide (step 4) could be merged into step 3 if a shorter deck is wanted.
- q059 (the area proof) and q060 (the second proof) are the proof items; q062 (the quadrilateral from two right triangles), q063 (isosceles trapezium: height, diagonal, area) and q065 (perpendicular diagonals) are the hard long items; the d4 items are q020 (ladder slid outwards), q043 (a difference of squares from perpendicular diagonals), q056 (the proof for perpendicular diagonals), q060 and q065.
- CBSE 9/10 banks have Pythagoras and ladder items. None of their stems or triples (3-4-5, 5-12-13, 8-15-17, 7-24-25, 6 m ladder with 2.5 m, 13 m ladder) is reused; contexts here are a painter's pole, a firefighter's ladder, a courtyard, a notice board, a helicopter route, a rhombus tile, a tent flap, towers of 118 m and 19 m, and others, with less common triples ($20, 21, 29$; $11, 60, 61$; $28, 45, 53$; $33, 56, 65$; $39, 80, 89$; $13, 84, 85$; $9, 40, 41$; $36, 77, 85$).
- Assertion-reason option wording follows the lib (ICSE 2027 specimen order). Fill-blank answers are numeric text (`101`, `37`, `212`, `1681`) or the word `hypotenuse`.
- Numerical items carry the unit in the answer record (`m`, `km`, `ft`, `cm²`).

## Originality
No item is taken from a textbook (Selina, ML Aggarwal, RD Sharma, NCERT), specimen paper or past paper; the ICSE 2027 specimen was used for the assertion-reason option order only. All people, objects and numbers are imagined; the classic textbook ladder and flagpole problems were avoided in favour of own contexts.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The second area proof is tested only in q060; the notes teach the first proof.
- The general parametrisation of triples is not proved; examples and a check are given.
- Only 5 flow figures in the decks (plan of the proof, goals, test, converse proof, routine); the other visuals are geometry figures or tables.
