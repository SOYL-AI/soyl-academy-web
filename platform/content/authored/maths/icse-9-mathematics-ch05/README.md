# ICSE Class 9 Mathematics — Chapter 5: Simultaneous Linear Equations (authored, v1)

Hand-authored chapter (D-025, D-026, D-050) in the ICSE Class IX presentation, built with the ICSE 10 Mathematics chapter approach (builders + independent re-solve). Author: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (syllabus Unit 3 Algebra)
- **t01** Linear equations in two variables with numerical coefficients; elimination (equating coefficients). Includes equations that first need brackets expanded or fractions cleared, and equations in $\frac1x$, $\frac1y$ reduced to a linear pair in $u$, $v$.
- **t02** Substitution.
- **t03** Cross-multiplication: $\frac{x}{b_1c_2-b_2c_1}=\frac{y}{c_1a_2-c_2a_1}=\frac{1}{a_1b_2-a_2b_1}$ for $a_ix+b_iy+c_i=0$, with the sign convention $c=-$(number after the equals sign) stated and drilled; the case $a_1b_2-a_2b_1=0$ is flagged.
- **t04** Framing equations: numbers, digits, ages, fractions, money, boat in a stream, perimeters.
- No removed topics. Graphical solution (ch20) is mentioned once (notes, section 1).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Elimination and substitution" 20 slides; Part 2 "Cross-multiplication, reciprocal forms and word problems" 22 slides |
| Worked examples | 7 + 8 (add, subtract, scale one, scale both, tidy first, substitution with unit coefficient and without; the scheme twice, tidy then scheme, reciprocal pair, digits, ages, boat, park) |
| Visuals | 30 of 42 slides (tables 24, flow charts 6); max 1 consecutive slide without a visual; notes 7 sections with visuals |
| Check slides | 4 + 4, all objective and outside both tests (q028 tf, q033 fill, q002 mcq, q009 mcq; q013 mcq, q026 AR, q041 numerical, q020 mcq) |
| Notes | 7 sections with key terms and formulas; exam tips with mark splits and 6 common mistakes |
| Flashcards | 30 (definition 5, formula 5, concept 6, fact 4, example 5, exam-tip 3, diagram 2) |
| Questions | 65 items, 150 marks: mcq 22, assertion-reason 5 (keys c b a d b), true-false 5, fill-blank 5, numerical 7, short-2 8, short-3 6, long-10 7 (each (a)(b)(c) = 3 + 3 + 4) |
| Difficulty | d1 9, d2 20, d3 28, d4 8 |
| Competency | recall 2, understanding 23, application 35, analysis 5 — application or higher 62% of items (81% of marks) |
| Topics | t01 28, t02 9, t03 11, t04 20 (items may carry several topics) |
| Tests | short (20 marks / 30 min): A = q005 q010 q008 q019 mcq, q024 AR, q049 short-2, q053 short-3; B = q059 or q062. long (40 marks / 60 min): A = q001 q004 q006 q007 q011 q012 q017 mcq, q023 AR, q045 q048 q052 short-2, q055 q056 short-3; B = any two of q061 q063 q065. Disjoint; no deck-check item used |

## Verifier record
Files: `src/lin.mjs` (exact solver and working-line generator/checker), `src/questions.mjs` + `src/questions2.mjs` (bank, one re-solve check per item; the second file is imported at the end of the first), `src/build.mjs` (decks, notes, flashcards, tests), `src/lib.mjs` (copied unchanged from ICSE 9 ch01). Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch05/src/build.mjs` (ends `NO ERRORS`; two runs give identical hashes: release.json `f065bb4dbb6ab2847ed711e45066e407`, tests.json `93f81408543dd4b4de6da917c9e88b7b`).
- **Exact systems:** every pair is a `Sys`: solution by Cramer's rule in exact fractions, cross-checked against lib `solve2`, substituted into both equations; a pair without a unique solution stops the build.
- **Generated working lines:** `elimSteps`, `substSteps`, `crossSteps` produce every line of the three methods (multipliers, scaled equations, sum/difference, back-substitution, the three denominators) from the computed values and assert each method reaches the exact solution; slide tables and model answers use them.
- **Typed lines:** parsed exactly (fractions, brackets, implicit multiplication, reciprocals) and asserted at the solution; deliberate slips (student errors) are asserted false. Cleared and rearranged forms are checked with `cleared`/`sameEq`.
- **Word problems:** answers are substituted back into the story; the two-digit puzzle (l04) is brute-forced over 10–99.
- **Re-solve:** 183/183 checks pass. MCQ options are typed independently; `C.which` needs exactly one match (distractors are usual slips). Keys rotated a 6, b 6, c 5, d 5.
- **Lint / KaTeX / narration:** stage-4 lint 0 errors, 0 warnings; 2,183 math strings parse; 42 narrations, max 84 words, numbers in words.

## Points for a reviewer
- Cross-multiplication shown with negative denominators kept (e.g. $\frac{y}{-29}$); confirm this matches the house style.
- ICSE ordering/wording of the scheme ($c_1a_2-c_2a_1$ under $y$) as given in the brief.
- Long-item step marks use halves (l04–l06). Short and long tests both take word problems (digits only in the short test via l04 and in the long test via q017: check you accept this).
- The $a_1b_2-a_2b_1=0$ warning slide goes slightly beyond the syllabus outcomes; drop slide 8 of part 2 if undesired.
- Originality: stems use own contexts and unusual coefficients; I did not run the repo originality gate.

## Known gaps
No graphs by design; consistency (no/infinite solutions) is not taught beyond the scheme warning.
