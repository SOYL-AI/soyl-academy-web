# ICSE Class 9 Mathematics — Chapter 9: Mid-Point and Intercept Theorems (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE 2027 Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 4 Geometry)
- **t01** The mid-point theorem with its proof (produce $DE$ to $F$ with $EF = DE$, congruent triangles, parallelogram $BDFC$); lengths, angles (corresponding angles), algebraic lengths, showing lines parallel; the triangle formed by joining the mid-points (sides half, perimeter half, area one quarter as a numerical consequence); the quadrilateral of mid-points is a parallelogram (proof via the diagonals) and its special cases (equal diagonals: rhombus; perpendicular: rectangle; both: square).
- **t02** The converse of the mid-point theorem with its proof (mid-point $E'$ and uniqueness of the parallel), applications (lengths, equations, chains of two uses), why both the mid-point and the parallel are needed (counter-examples with $AD : DB = 1 : 2$, a slanted line, $DE = \frac12 BC$ alone).
- **t03** The equal intercept theorem with its proof (two parallelograms and the converse of the mid-point theorem), counting intercepts, dividing a segment into $n$ equal parts, the trapezium results (mid-line $= \frac12(AB + DC)$ with proof, a line through the mid-point of one leg parallel to the bases bisects the other leg, segment joining the mid-points of the diagonals $= \frac12(DC - AB)$).
- The chapter lists no removed topics. Teaching and proofs are synthetic (congruent triangles and parallel lines): no coordinate formulas, no similarity, no basic proportionality theorem (that is Class X).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "The mid-point theorem" (t01) 22 slides; Part 2 "The converse and the equal intercept theorem" (t02–t03) 22 slides |
| Worked examples | 5 + 5 (finding a length; an equation in $x$; angles with corresponding angles; perimeter of the triangle of mid-points; a kite frame with the rectangle of mid-points; the converse in numbers; an equation from $AE = EC$; two uses of the converse; counting intercepts; mid-line and diagonals' mid-points of a trapezium) |
| Visuals | 38 of 44 slides (geometry 19, table 19); max 1 consecutive slide without a visual. Notes: 8 sections, each with a visual, plus 13 geometry figures and 1 flow in the questions |
| Check slides | 3 + 3, all objective (q001 mcq, q028 true-false, q033 fill-blank; q017 mcq, q042 numerical, q020 mcq), none used in a test |
| Notes | 8 sections with key terms and formulas; exam tips with mark split and 7 common mistakes |
| Flashcards | 30 (definition 6, formula 6, concept 8, fact 4, example 3, exam-tip 2, diagram 1) |
| Questions | 65 items, 151 marks: mcq 22, assertion-reason 5 (keys c a b d c), true-false 5, fill-blank 5, numerical 7 (4 × 1 mark, 3 × 2 marks), short-2 8, short-3 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 7–8 step marks each) |
| Difficulty | d1 9, d2 27, d3 24, d4 5 |
| Competency | recall 4, understanding 21, application 22, analysis 18 — application or higher 62% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 33, t02 13, t03 21 (items may carry two topics) |
| MCQ keys | a 6, b 6, c 5, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch09_short` (20 marks / 30 min: A = q004 q011 q006 q015 mcq, q027 AR, q047 short-2, q054 short-3; B = one of q059, q064) and `_long` (40 marks / 60 min: A = q003 q007 q009 q012 q014 q018 q021 mcq, q024 AR, q048 q049 q051 short-2, q053 q057 short-3; B = any two of q061 q063 q065), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank + one re-solve check per item),
`src/geo.mjs` (geometry helper), `src/figs.mjs` (shared figures), `src/lib.mjs` (shared ICSE 9 builders, copied unchanged from `icse-9-mathematics-ch01`).
Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch09/src/build.mjs`.
Rebuilding is deterministic: two runs give identical `release.json` (md5 `7697e00a7d49f33b852ff3eb58941376`) and `tests.json` (md5 `c4d7bed7be3c578ca59e0e15a9621a30`).

- **Figures from coordinates (`geo.mjs` `fig`):** every figure is placed from coordinates in cm. The builder throws if a numeric length label differs from the real length, if segments sharing a tick count are not equal, if segments sharing an arrow count are not parallel (cross product), if a right-angle mark or numeric degree label disagrees with the measured angle, or if angle arcs of the same count are unequal. Figures with numeric labels carry an explicit `scale` (cm).
- **Theorems as computations:** `midTheorem`, `midProof` (the construction point $F$, $AE = EC$, $DE = EF$, vertically opposite angles, $CF = AD = DB$, $BDFC$ a parallelogram), `converse`, `converseProof` (the uniqueness of the parallel through $D$), `medial`, `quadMid` (sides parallel to and half the diagonals, special cases), `trapezium` (mid-line, diagonals' mid-points on $MN$, $PQ = \frac12 |DC - AB|$), `intercepts`, `divide` (parallels through the marks cut $AB$ into $n$ equal parts). Every proof item (the structured long items q059 to q065 and the short proofs q053 to q058) asserts each fact its model answer uses, plus every number in it.
- **Counter-examples behind distractors:** the parallel from a point one third along $AB$ meets $AC$ one third along; a slanted line through the mid-point misses the mid-point of $AC$; the perpendicular to $AB$ at its mid-point misses it; a circle of radius $\frac12 BC$ about $D$ meets $AC$ in a second non-mid-point (q025); a right-angled and an isosceles triangle with $D$ at a third; the perpendicular-diagonal quadrilateral is a rectangle, not a rhombus.
- **Re-solve:** 147/147 checks pass (`src/resolve.log`, git-ignored). Numeric MCQ options are typed independently and `which` confirms exactly one equals the re-solved value (distractors: the doubled or halved-again length, the third side, the sum instead of the difference, the perimeter of the original triangle).
- **KaTeX:** 1,574 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no LaTeX outside `$…$`.
- **Narration:** 44 slides, max 87 words, mean 63; numbers in words, no symbols, letters of figures separated ("D E", "triangle A B C"), no capital-letter abbreviations.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build and are clean.

## Points for a reviewer
- **Scope vs the ICSE book:** the chapter proves the mid-point theorem with the standard construction (not by coordinates or similarity). Two statements go slightly beyond the syllabus wording and are marked as consequences: the area of the triangle of mid-points is one quarter (q044, via four congruent triangles) and the segment joining the mid-points of the diagonals of a trapezium (proved with the mid-point theorem in the notes and used in q016 and q043). Drop them if the board does not expect them.
- **Equal intercept theorem proof** (q064, deck 2 slides 12–14) uses two parallelograms and the converse of the mid-point theorem, so it follows the chapter's order. The proof is given for three lines; the theorem for more lines follows by applying it to consecutive triples.
- q059 (the mid-point theorem proof) and q060 (the converse proof) are the two key proof items; q062, q064 and q065 are hard (d4), as are q016 and q043.
- "Mid-line" (of a trapezium) is a common textbook term, defined in the notes and used in q014 and q015.
- CBSE Class 9 ch10 has mid-point theorem items; none of its stems or numbers (14 cm and 7 cm, 11.4, 17.6, the 18-24-30 m park, diagonals 12 and 8, 14 and 10, 40 and 30 m, the 9.6 m gable, 62 degrees, 9.5 cm, 7.2 and 15.6 cm) is reused. Contexts here are imagined and unnamed or named by first name (a banner, an A-shaped ladder, a sail, a gate, a kite frame, a slanting bar).
- Assertion-reason option wording follows the lib (ICSE 2027 specimen order). Fill-blank answers are numeric text (`0.65`, `18`, `11.1`, `5`, `19.3`).
- Model answers for the three-part long items give working for every part with step marks 3 + 3 + 4.

## Originality
The other maths banks were searched for mid-point-theorem items first; only CBSE 9 ch10 has them (above). No item is taken from a textbook (Selina, ML Aggarwal, RD Sharma, NCERT), specimen paper or past paper; the ICSE 2027 specimen was used for the assertion-reason option order only. The textbook-style trisection of a diagonal by lines to the mid-points of opposite sides of a parallelogram was avoided; the median-and-mid-point chain (q062, with $AF = \frac13 AC$) uses its own figure, letters and numbers.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The equal intercept theorem is proved for three lines only; the general case is stated as following from it.
- The basic proportionality theorem is not used (Class X); the counter-example table on "why the mid-point matters" observes the ratio from coordinates and does not prove it.
- Only one flow figure (notes section 8); all other visuals are geometry figures or tables.
