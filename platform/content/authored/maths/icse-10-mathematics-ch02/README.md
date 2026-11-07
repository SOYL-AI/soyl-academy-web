# ICSE Class 10 Mathematics — Chapter 2: Banking: Recurring Deposit Accounts (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 1 Commercial Mathematics)
- **t01** How a recurring deposit works (fixed monthly instalment, period in months, rate per annum, simple interest on each instalment for its own months); monthly balances and the principal for one month $P \times \frac{n(n+1)}{2}$; interest $I = P \times \frac{n(n+1)}{2 \times 12} \times \frac{r}{100}$; how the interest grows with the period.
- **t02** Maturity value $\text{MV} = P \times n + I$; comparing deposits.
- **t03** Inverse problems: monthly instalment (from MV or from the interest), rate (from MV or interest), number of months (from the interest: $n(n+1) = \frac{2400I}{Pr}$; from MV: a quadratic in $n$ with the negative root rejected); a target-amount problem with the instalment rounded up.
- The chapter has no removed topics. Nothing outside the board method is used (no compound interest, no tax deducted at source, no penalties for missed instalments).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "How the interest is earned" (t01) 18 slides; Part 2 "Maturity value and inverse problems" (t02–t03) 18 slides |
| Worked examples | 4 + 5 (₹500 × 6 months at 8%; 1.5 years at 7%; a 6.5% rate with paise; same deposits over 24 vs 12 months; a 3-year maturity value; instalment from MV; rate from MV; months from MV by a quadratic; months from the interest) |
| Visuals | 24 of 36 slides (table 18, flow 4, plot 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual plus 9 more (tables and flows) |
| Check slides | 4 + 4, all objective (q003 mcq, q033 fill-blank, q028 true-false, q012 mcq; q046 numerical, q008 mcq, q011 mcq, q031 true-false) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 4, formula 5, concept 6, fact 4, example 4, exam-tip 6, diagram 1) |
| Questions | 69 items, 164 marks: mcq 20, assertion-reason 6 (keys c d a b c b), true-false 6, fill-blank 7, numerical 8, short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 5–6 step marks each) |
| Difficulty | d1 12, d2 28, d3 23, d4 6 |
| Competency | recall 8, understanding 23, application 23, analysis 13, evaluation 2 — application or higher 55% of items, 80% of marks (lint band 45–65% of items) |
| Topics | t01 36, t02 22, t03 23 (items may carry two topics) |
| Tests | `t_icse10math_ch02_short` (20 marks / 45 min: A = q004 q006 q009 mcq, q023 AR, q053 q054 short-3; B = one of q063, q064) and `_long` (40 marks / 90 min: A = q005 q007 q010 q014 q015 q017 mcq, q024 q025 AR, q057 q059 q061 short-4; B = any two of q065 q066 q067), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/fin.mjs` (exact recurring-deposit arithmetic), `src/work.mjs` (LaTeX working lines generated from `fin.mjs`),
`src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch02/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch02/src/lint.mts content/authored/maths/icse-10-mathematics-ch02`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact money arithmetic (`fin.mjs`):** amounts in integer paise and rates in hundredths of a per cent, with BigInt. Interest is computed by the formula and cross-checked against the sum of the monthly balances formed term by term (which is itself asserted equal to the sum of "instalment × months it earns"); a figure that is not a whole number of paise stops the build. Inverse helpers solve for the instalment, the rate and the number of months and re-check every answer forwards; for $n$, the quadratic is reduced to integer coefficients, its discriminant must be a perfect square, and it must have exactly one positive integer root (the other root is asserted negative).
- **Re-solve:** 109/109 checks pass (`src/resolve.log`). Keys, numerical values and the numbers in model answers are typed as literals and recomputed from the givens; each MCQ's option values are typed independently so exactly one equals the re-solved target (distractors are the usual slips: not halving $n(n+1)$, a full year's interest on the whole deposit, $n$ in years, adding instead of subtracting the deposits). The target-amount question asserts that ₹1,923 falls short and ₹1,924 reaches ₹50,000.
- **Slides, tables, plots, notes:** every worked example and table entry is recomputed in `build.mjs` (the build stops on a mismatch). Plots: interest $2.5n(n+1)$ and maturity value $1000n + 2.5n(n+1)$ for ₹1,000 a month at 6% are asserted against `fin.mjs` at 12, 24 and 36 months; marked points lie on their curves (16 points; 2 lie on both curves of a plot).
- **KaTeX:** 888 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`; ₹ is always outside maths.
- **Narration:** 36 slides, max 64 words, mean 47; numbers in words, no symbols or capital-letter abbreviations ("recurring deposit", "maturity value" are spoken in full).
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 5).
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings.

## Originality
All set-ups, names and numbers are new: imagined depositors (Meera, Tenzin, Gurpreet, Zoya, Ishita, Farhan, Bhavna and others) and two banks labelled as imagined (Konkan Sahakari Bank, Narmada Co-operative Bank). Instalments, periods and rates were chosen so that every interest figure is an exact number of paise and every quadratic in $n$ factorises; none is taken from a textbook, specimen paper or past paper (CISCE documents were used for pattern only). Similar question shapes (two "find the maturity value" items, two "find the months" items) use different wording, since the bank duplicate check ignores numbers.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Tables use plain digits inside maths below one lakh (so the arithmetic lint can read them) and grouped digits in prose (₹60,243.75).
- No item uses a quarterly or half-yearly scheme, penalties, or premature closure; these are outside the ICSE 2027 topic list.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
