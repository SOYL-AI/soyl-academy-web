# CBSE Class 10 Mathematics — Chapter 3: Pair of Linear Equations in Two Variables (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/cbse-10-mathematics-ch06`). Author: `claude-opus-5-5 (subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Standard 041 and Basic 241)
- **t01** Graphical method: solutions of one equation, graph as a line, solving a pair from the intersection, intersecting / parallel / coincident lines, triangles formed with an axis.
- **t02** Algebraic conditions: the ratio test on $a_1/a_2$, $b_1/b_2$, $c_1/c_2$; consistent / inconsistent / dependent; finding $k$ (and $a, b$) for a required number of solutions.
- **t03** Substitution, including clearing fractions first. **t04** Elimination, including the $0 = $ non-zero and $0 = 0$ outcomes and the add-and-subtract trick for swapped coefficients.
- **t05** Situational problems: tickets, stationery, notes, investments, tea blending, ages, digits, fractions, triangle angles, courier charges.
- **Removed topics absent:** no cross-multiplication method and no equations reducible to linear form (so no $\frac1x$ substitutions, no upstream/downstream or "time = distance/speed" pairs, which need them).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Graphs and the number of solutions" (t01–t02) 18 slides; Part 2 "Algebraic methods and word problems" (t03–t05) 17 slides |
| Worked examples | 3 + 6 (graphical solution; classifying three pairs; finding $k$ for infinitely many / no solutions; substitution; elimination; both-variables-vanish cases; museum tickets in Hyderabad; mother–daughter ages; investment at 6% and 8%) |
| Visuals | 25 of 35 slides, max 2 slides without a visual. Deck: plot 10, table 11, flow 4. Notes/questions: plot 9, table 2, flow 1 |
| Check slides | 3 + 3, all objective (q003, q008, q037; q017, q018, q014) |
| Notes | 6 sections (t01 twice: equations and the graphical method; then t02, t03, t04, t05), each with key terms and a visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (definition 4, fact 3, concept 7, formula 5, example 4, exam-tip 5, diagram 2) |
| Questions | 70 items, 140 marks: mcq 18, assertion-reason 6 (keys a d b c a d), true-false 5, fill-blank 5, numerical 9, short-2 9, short-3 7, long-5 6, case-based 5 (1 + 1 + 2, part (c) either/or via `alternatives`, `passage_origin: soyl-original`) |
| Difficulty | d1 12, d2 36, d3 17, d4 4, d5 1 |
| Competency | recall 7, understanding 28, application 25, analysis 7, evaluation 3 — application or higher 50% of items, 64% of marks |
| Topics | t01 13, t02 23, t03 9, t04 15, t05 18 (items may carry two topics) |
| Tests | `t_cbse10math_ch03_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-10-default-chapter-test-short/long`; disjoint |

## Verifier record
Sources in `src/` (`build.mjs`, `questions.mjs`; shared builders/validator in `../cbse-10-mathematics-ch01/src/lib.mjs`).
Run from `platform/`: `npx tsx content/authored/maths/cbse-10-mathematics-ch03/src/build.mjs`.

- **Numeric re-solve:** 129/129 checks pass. Every pair is re-solved by Cramer's rule from its coefficients; every "how many solutions" key is recomputed by an independent ratio classifier (determinant test, so no division by zero); every $k$ is found by search over candidate values; each word problem's answer is checked against the story conditions (e.g. the ages satisfy both the past and future statements); numbers inside model answers and solutions are checked (multipliers, intermediate sums, final values).
- **Plots:** 44 marked points lie on their lines and match their labels; 16 marked points lie on **two** lines (intersection points, so they are the exact solutions); 18 intercepts located numerically are all marked where a plot marks any; graph-reading assets (q003, q065, q067) were re-solved algebraically.
- **KaTeX:** 1282 math strings parse in strict "error" mode; no lost backslashes; KaTeX's `2{,}45{,}000` Indian grouping is used for lakh amounts.
- **Narration:** 35 slides, max 67 words, mean 53; no symbols or letter abbreviations.
- **Fixes during the pass:** (1) the l05 model answer contained a garbled half-sentence ("$60 - 2x$… precisely") — rewritten as a clean substitution; (2) the checker missed ₹$2{,}45{,}000$ in the l03 model answer until it learnt KaTeX's `{,}` grouping (content was right); (3) five routine items were relabelled from d1 to d2 after review (q015, q013, q035, q044, q049), bringing d1 to 17%; (4) the pipeline arithmetic lint rejected deliberately false outcomes written as "$0 = 4$" or "$dfrac21 = dfrac51$" in solutions, so they are now written as "left side $0$, right side $4$, and $0 
e 4$" — the stems may still quote "$0 = 9$" as the claim being tested; (5) the hardened validator (control characters, line breaks inside inline maths) then caught that this very rewrite had turned `
e` into a newline in a single-quoted deck string (Part 2 worked example 3) — fixed to `\ne`.
- **Originality:** NCERT/RS Aggarwal set-ups were deliberately avoided — no "Aftab seven times / three times", no 100 km cars, no taxi or library fixed-charge-plus-rate pairs, no 0.2x + 0.3y = 1.3, no "number is 4 times the sum of its digits". Contexts: Patna stationery, Hyderabad museum, Eden Gardens tickets, Mysuru Dussehra rides, Bhubaneswar couriers, Assam tea blend, a Lucknow grandmother, a wallet of ₹10/₹20 notes, a coin-equation error to evaluate.

- **MCQ key balance:** after the re-solve, the builder rotates each MCQ's options so the keys cycle a → b → c → d (authored drafts had most keys at (a) and almost none at (d)); option letters quoted in solutions, schemes and case model answers are remapped, and the key text is verified unchanged. Final keys per chapter: a 6, b 6, c 6, d 5.

## Gaps / follow-ups
- Vertical lines ($x = 3$) cannot be drawn with the `plot` contract (functions of $x$ only); they appear in text only (q-true/false on $x = 3$, $y = 2$). A `lines` primitive in `PlotVisual` would allow them.
- Narration audio not generated (TTS stage). `word_limit` not set on maths short/long items (marked by steps).
