# ICSE Class 9 Mathematics — Chapter 2: Compound Interest (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) for ICSE Class IX Mathematics (unit "2. Commercial Mathematics"), built with the
ICSE 10 Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2028 Class IX syllabus, Commercial Mathematics)
- **t01** Compound interest as repeated simple interest on a growing principal, year by year for 2 or 3 years, without the formula (tables of principal, interest and amount).
- **t02** $A = P\left(1 + \frac{r}{100}\right)^n$ and $\text{CI} = A - P$; interest compounded half-yearly (halve the rate, double the time); different rates in successive years.
- **t03** Finding the principal, the rate or the time from the other quantities (rate by a perfect power, time by comparing powers; always checked forwards).
- **t04** Difference between compound and simple interest for the same principal, rate and time (direct working and the 2-year and 3-year formulas); finding the sum from the difference.
- **t05** Growth (population, bacteria) and depreciation (machines, vehicles); rises and falls by different rates.
- Removed topic (repaying a loan in equal instalments): one line in the notes and in the part 2 exam-tips slide, "not in the ICSE 2028 Class IX syllabus"; no item uses it.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "How the amount grows" (t01–t02) 19 slides; Part 2 "Inverse problems, differences, growth and depreciation" (t03–t05) 21 slides |
| Worked examples | 5 + 8 (₹8000 at 5% for 2 years year by year; ₹12500 at 8% for 3 years; formula on ₹16000 at 5%; half-yearly; three different rates; principal; rate; time; difference; sum from the difference; population; depreciation; a rise and a fall) |
| Visuals | 26 of 40 slides (table 19, flow 4, plot 3); max 2 consecutive slides without a visual (the check slides). Notes: 7 sections, each with a visual plus 15 more tables, 4 flows, 3 plots |
| Check slides | 4 + 4, all objective (q004 mcq, q034 fill-blank, q006 mcq, q028 true-false; q008 mcq, q042 numerical, q018 mcq, q029 true-false), none used in either test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split, 6 common mistakes and the scope line |
| Flashcards | 30 (definition 3, formula 9, concept 5, fact 4, example 5, exam-tip 3, diagram 1) |
| Questions | 64 items, 138 marks: mcq 20, assertion-reason 5 (keys c a b d c), true-false 6, fill-blank 6, numerical 7, short-2 8, short-3 6, long-10 6 (structured (a)(b)(c), 6 step marks each) |
| Difficulty | d1 6, d2 19, d3 31, d4 7, d5 1 |
| Competency | recall 4, understanding 23, application 26, analysis 10, evaluation 1 — application or higher 58% of items, 77% of marks (lint band 45–65% of items) |
| Topics | t01 10, t02 23, t03 12, t04 12, t05 13 (items may carry two or three topics) |
| Tests | `t_icse9math_ch02_short` (20 marks / 30 min: A = q003 q009 q011 q016 mcq, q022 AR, q046 short-2, q053 short-3; B = one of q059, q063) and `_long` (40 marks / 60 min: A = q005 q007 q010 q013 q015 q017 q020 mcq, q025 AR, q047 q048 q051 short-2, q054 q056 short-3; B = any two of q060 q061 q062), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/money.mjs` (exact compound-interest arithmetic), `src/work.mjs` (LaTeX working lines generated from `money.mjs`),
`src/lib.mjs` (shared ICSE 9 builders, copied unchanged from ch01). Run from `platform/`:
`npx tsx content/authored/maths/icse-9-mathematics-ch02/src/build.mjs`. Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact money arithmetic (`money.mjs`):** amounts are exact rationals (BigInt numerator and denominator), rates exact decimals. Nothing is rounded: converting an amount to rupees stops the build unless it is a whole number of paise, and a population or count stops unless it is a whole number. Amount, interest, successive rates, half-yearly compounding, principal, rate and time (the search must find exactly one candidate), CI minus SI (with the 2-year and 3-year closed forms asserted against direct CI and SI), growth, depreciation and rises and falls are all computed there.
- **Re-solve:** 117/117 checks pass. Keys, numerical values and numbers in model answers are typed as literals and recomputed from the givens; each MCQ's option values are typed independently so exactly one equals the re-solved target (distractors are the usual slips: simple interest instead of compound, the amount instead of the interest, one year's factor instead of two, forgetting to halve the rate, the 2-year difference formula for 3 years).
- **Slides, tables, plots, notes:** every worked example and table entry is recomputed in `build.mjs` (the build stops on a mismatch). Plots: ₹10000 at 10% (compound curve against simple line at 3 and 5 years), a population of 40000 at 5% against a straight line, a machine of ₹50000 at 10% against a fixed fall; 24 marked points lie on their curves and match their labels.
- **KaTeX:** 966 math strings parse in strict "error" mode; ₹ is always outside maths.
- **Narration:** 40 slides, max 71 words, mean 51; numbers in words, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 5).
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build.

## Originality
All set-ups, names and numbers are new (imagined depositors, towns, machines and banks; no named real bank). Principals, rates and times were chosen so that every amount is an exact number of paise and every population is whole; none is taken from a textbook, specimen paper or past paper (CISCE documents were used for pattern only).

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The repo-wide originality gate was not run by the writer (dependency install still pending in the worktree); the build was run from a scratch tree using the main checkout's `node_modules`.
- Tables use plain digits inside maths (so the arithmetic lint can read them) and grouped digits in prose; ₹1,25,000 and ₹1,05,800 use Indian grouping in prose only.
- Rates in the inverse problems are searched in steps of 0.25%; every inverse answer in the chapter is a unique rate of that kind.
