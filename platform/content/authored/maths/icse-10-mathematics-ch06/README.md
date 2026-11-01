# ICSE Class 10 Mathematics — Chapter 6: Ratio and Proportion (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **Groundwork (tagged t01):** kinds of ratio built from $a : b$ — duplicate, triplicate, sub-duplicate, sub-triplicate, reciprocal and compound ratios.
- **t01** Proportion (extremes and means, $ad = bc$), fourth proportional; continued proportion of three and four numbers ($b^2 = ac$; $a : d$ is the triplicate ratio of $a : b$), mean proportional and third proportional.
- **t02** Invertendo, alternendo, componendo, dividendo, componendo and dividendo (and its converse); solving equations (linear-fractional, square-root and cubic forms) and finding ratios with componendo and dividendo; proving relations with the k-method.
- **t03** Direct simple applications: map scales and recipes (fourth proportional), changing ratios, a number added to or subtracted from terms to make them proportional or continued proportionals, mixtures, areas and volumes through duplicate and triplicate ratios, ages.
- **Removed for ICSE 2027** (applications beyond direct simple ones): one student-facing note only (notes §7).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Ratios, proportion and proportionals" (t01) 19 slides; Part 2 "Properties of proportion and applications" (t02–t03) 18 slides |
| Worked examples | 4 + 6 (compound of a duplicate and a sub-duplicate ratio; testing a proportion and a fourth proportional; mean and third proportionals with decimals; an unknown term in continued proportion; solving by C&D; finding $x : y$; a k-method proof; a square-root equation; a number added to make a proportion; a changing ratio) |
| Visuals | 25 of 37 slides (table 16, flow 4, plot 3, geometry 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, 20 visuals in all |
| Check slides | 4 + 4, all objective (q001 mcq, q004 mcq, q033 fill-blank, q012 mcq; q008 mcq, q009 mcq, q039 numerical, q014 mcq) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (formula 9, definition 7, example 6, concept 3, exam-tip 3, fact 1, diagram 1) |
| Questions | 66 items, 161 marks: mcq 20, assertion-reason 6 (keys a b c d a d), true-false 6, fill-blank 6, numerical 6, short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–8 step marks each) |
| Difficulty | d1 15, d2 29, d3 21, d4 1 |
| Competency | recall 7, understanding 21, application 29, analysis 9 — application or higher 58% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 37, t02 26, t03 14 (items may carry two topics) |
| Tests | `t_icse10math_ch06_short` (20 marks / 45 min: A = q003 q006 q017 mcq, q024 AR, q049 q053 short-3; B = one of q060, q062) and `_long` (40 marks / 90 min: A = q005 q010 q013 q015 q019 q020 mcq, q023 q025 AR, q054 q056 q058 short-4; B = any two of q061 q063 q065), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/prop.mjs` (exact ratio and proportion arithmetic), `src/lib.mjs` (shared ICSE builders, copied unchanged). Run from
`platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch06/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch06/src/lint.mts content/authored/maths/icse-10-mathematics-ch06`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact arithmetic (`prop.mjs`):** every quantity is a BigInt rational (decimals such as $0.32$ and $7.5$ are read as exact fractions). Ratios are reduced to lowest whole-number terms; sub-duplicate and sub-triplicate ratios, mean proportionals and the cube roots after componendo and dividendo must be exact roots or the build stops. `addToProp` / `subToCont` solve for the number added or subtracted and re-check the resulting proportion; `solveCD` solves $\frac{Px + Q}{Px - Q} = \frac{m}{n}$ and substitutes back; `kChange` solves changing-ratio problems and requires a positive whole-number multiplier.
- **Identities by substitution:** a small exact evaluator (`ev`) checks every "prove that" relation, every property of proportion and every k-method step at six fixed points satisfying the hypothesis ($a = bk$, $c = dk$; or $b = ak$, $c = ak^2$, $d = ak^3$ for continued proportion), and, where the result depends on the hypothesis, shows it fails at three points that do not satisfy it. (In l06 (a) the point with $k = 2$ is skipped because $a - 2b = 0$ there.)
- **Re-solve:** 147/147 checks pass (`src/resolve.log`). Keys, numerical values and the numbers in model answers and solutions are typed as literals and recomputed from the givens; each MCQ's option values are typed independently so exactly one equals the re-solved target (distractors are the usual slips: doubling instead of squaring, the average instead of the mean proportional, the third proportional in the wrong order, componendo alone, coefficients left in $x : y$, a forgotten square root). Equations are solved and substituted back; l01 (c) confirms both roots $\frac{3}{2}$ and $\frac{2}{3}$ and that there are no others.
- **Slides, tables, figures, notes:** every worked example and table entry is recomputed in `build.mjs` (the build stops on a mismatch); cross-product columns are generated from the numbers and asserted. Geometry figures are drawn from lengths in cm at a stated scale (squares of side 2 cm and 3 cm; a 12 cm by 3 cm rectangle and a 6 cm square). Plots: the proportion line $y = 1.75x$, the four terms $8, 12, 18, 27$ on $y = 8 \times 1.5^{x - 1}$, and $y = \frac{2x + 9}{2x - 9}$ meeting $y = \frac{5}{3}$ at $x = 18$; 16 marked points, all on their curves.
- **KaTeX:** 1,282 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`; ₹ is always outside maths.
- **Narration:** 37 slides, max 60 words, mean 42; numbers in words, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 5).
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`, 307 units): 0 errors for this unit.

## Originality
All set-ups and numbers are new (chosen so every answer is exact: e.g. $15, 23, 27, 59$ minus $11$; $7, 11, 23$ minus $5$; $\frac{x^3 + 3x}{3x^2 + 1} = \frac{189}{61}$; $\frac{x^3 + 27x}{9x^2 + 27} = \frac{35}{19}$). Well-known textbook exercises (the classic $\frac{341}{91}$ cubic, the $x = \frac{2ab}{a + b}$ sum, the $(a + b + c + d)(a - b - c + d)$ relation and similar) were deliberately avoided. People, maps, tanks, plots and the dairy are imagined. CISCE documents were used for pattern only. Similar question shapes use different wording, since the bank duplicate check ignores numbers and maths.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Addendo, subtrahendo and continued ratios of the form $\frac{a}{b} = \frac{c}{d} = \frac{e}{f}$ are not taught (not in the ICSE 2027 topic list); k-method proofs use two-ratio proportions and three- or four-term continued proportions only.
- Difficulty is concentrated at d1–d3 (one d4 item); most proofs are 3–4 marks.
