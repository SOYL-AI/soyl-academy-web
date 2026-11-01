# ICSE Class 10 Mathematics — Chapter 4: Linear Inequations (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** Linear inequations in one variable; replacement set and solution set over $\mathbb{N}$, $\mathbb{W}$, $\mathbb{Z}$, $\mathbb{R}$ and over finite sets given in the question; roster form (finite, infinite with $\ldots$, empty set $\phi$) and set-builder form.
- **t02** Solving algebraically: brackets, clearing fractions with the LCM, collecting terms; the sign reversal when multiplying or dividing by a negative number (with the number-line reflection as the reason); combined (double) inequations, including those with $x$ in all three parts (split into two); intersection of two solution sets, and an empty intersection; word problems ("at most", "at least").
- **t03** Representation on the number line: filled dots for $\mathbb{N}$, $\mathbb{W}$, $\mathbb{Z}$; a thick line for $\mathbb{R}$ with a filled circle (end point included), an open circle (end point excluded) and an arrow where the set continues; reading a graph back into set notation.
- The chapter has no removed topics. Out of scope (not used): reciprocals of inequalities, quadratic or modulus inequations, inequations in two variables.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Replacement sets and solving" (t01–t02) 18 slides; Part 2 "Combined inequations and the number line" (t02–t03) 18 slides |
| Worked examples | 4 + 5 ($3x + 2 < 14$ over $\mathbb{W}$ and $\mathbb{N}$ by testing members; $7 - 3x \ge -8$ over $\mathbb{N}$ with the reversal; fractions over $\mathbb{Z}$, an infinite roster; $4(x - 1) > 2x + 5$ over $\mathbb{R}$ in set-builder form; a combined inequation over $\mathbb{R}$; a combined inequation divided by $-2$ over $\mathbb{Z}$; $A \cap B$ from two graphs; a lift-load word problem; an empty intersection) |
| Visuals | 24 of 36 slides (number line 12, table 10, flow 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 7 more. Questions: 2 number-line assets (q011, q066) |
| Number lines | 14 distinct figures (21 placements) drawn as allow-listed SVG: 7 filled circles, 11 open circles, 33 dots, 8 arrows |
| Check slides | 4 + 4, all objective (q002 mcq, q027 true-false, q004 mcq, q032 true-false; q008 mcq, q009 mcq, q011 mcq, q028 true-false) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 7, fact 3, concept 6, example 5, exam-tip 6, diagram 3) |
| Questions | 67 items, 162 marks: mcq 20, assertion-reason 6 (keys a b c d a d), true-false 6, fill-blank 7, numerical 6, short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–8 step marks each) |
| Difficulty | d1 10, d2 27, d3 27, d4 3 |
| Competency | recall 5, understanding 22, application 27, analysis 12, evaluation 1 — application or higher 60% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 38, t02 50, t03 18 (items may carry two or three topics) |
| Tests | `t_icse10math_ch04_short` (20 marks / 45 min: A = q003 q006 q010 mcq, q023 AR, q050 q051 short-3; B = one of q061, q062) and `_long` (40 marks / 90 min: A = q005 q012 q013 q015 q017 q019 mcq, q024 q025 AR, q055 q057 q058 short-4; B = any two of q063 q064 q065), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests, SVG check), `src/questions.mjs` (bank + one re-solve check per
item), `src/ineq.mjs` (exact solver), `src/work.mjs` (working-line checker), `src/nl.mjs` (number lines),
`src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch04/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch04/src/lint.mts content/authored/maths/icse-10-mathematics-ch04`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Solution sets (`ineq.mjs`):** inequations are held as exact rationals (BigInt). Each set is solved algebraically (collect terms, divide, reverse the sign for a negative divisor; combined inequations and $A \cap B$ by interval intersection) and then cross-checked: over $\mathbb{N}$, $\mathbb{W}$, $\mathbb{Z}$ every integer from $-300$ to $300$ is substituted into the **original** inequations and the list must equal the algebraic one (an infinite set must reach the edge of the window); over a given finite replacement set every member is tested; over $\mathbb{R}$ the original inequations are evaluated at every end point exactly, end points $\pm \frac{1}{1000}$ and $\pm \frac{1}{7}$, a $\frac{1}{8}$ grid and odd sevenths (about 6,000 points) and must agree with the interval. Roster and set-builder strings are generated from the verified set.
- **Working lines (`work.mjs`):** every inequality typed in a worked example, solution or model answer (e.g. `-6 < -2x \le 6 \Rightarrow 3 > x \ge -3`) is parsed from its TeX and evaluated at each end point exactly and $\pm 10^{-4}$ and at 321 points of a grid from $-40$ to $40$ offset from the integers; each piece must have exactly the verified solution set, so an unreversed sign, an arithmetic slip or a wrong end point stops the build.
- **Re-solve:** 215/215 checks pass (`src/resolve.log`). Rosters, set-builder forms, keys and numbers are typed as literals in the items and compared with the computed values; each MCQ's option values are typed independently so exactly one equals the re-solved target (distractors are the usual slips: no sign reversal, $0$ in $\mathbb{N}$, the wrong end included, a fraction term not multiplied by the LCM). Option inequations in q012 are each checked to match their stated solution set.
- **Number lines (`nl.mjs`):** drawn from the verified sets, never by hand: dots only at members inside the drawn range (the build stops if a member would be hidden, or if an infinite set does not reach the edge), circles only at the computed end points (filled iff included), arrows only where the set is unbounded. Alt text is generated from the set (e.g. "A thick line with a filled circle at minus 2, an open circle at 4, showing every real number from minus 2 (included) to 4 (not included)"), and the build requires each caption to name the end-point kinds drawn. Every SVG passes the pipeline's SVG allow-list check (`content-pipeline/src/lint/svg.ts`) with 0 errors and 0 warnings; colours are `currentColor` and `var(--diagram-accent)` only. Text, strokes and spacing scale with the width of the line (checked by rendering at 340 px).
- **Tables:** sign table ("is 3 a solution?"), testing table, operation table on $2 < 7$ and the lift-load table are computed and asserted in `build.mjs`.
- **KaTeX:** 1,145 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`; ₹ is always outside maths.
- **Narration:** 36 slides, max 62 words, mean 44; numbers in words, no symbols, no capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 5).
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`): 0 errors, 0 warnings.

## Number-line format (decision)
The brief suggested the `geometry` or `plot` builders. Both renderers draw every marked point as a solid dot
(`PlotVisual.tsx` notes this deliberately: "a hollow dot means excluded endpoint"), so an excluded end point cannot be
shown with them. Number lines are therefore `svg` visuals (allowed by `shared/content/visual.ts`, already used in
CBSE 10 Mathematics ch11, ch12, ch14), generated from data and checked as above.

## Originality
All set-ups, names and numbers are new: imagined people (Neha, Farida, Priya, Kiran, Rhea, Ravi) and imagined
businesses or places (a hill-town taxi, a mobile plan, a coach company, a goods lift, a garden bed), labelled as
imagined. No inequation, set-up or wording is taken from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past
paper; CISCE documents were used for pattern only. Similar shapes (several "greatest/smallest integer" and
"combined inequation" items) use different wording, since the bank duplicate check ignores numbers.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Model answers describe the required number-line graphs in words (answers carry no visuals); the stems of q011 and q066 carry number-line figures.
- t03 has fewer items (18) than t01/t02, because most number-line work sits inside t02 structured questions tagged with both topics.
