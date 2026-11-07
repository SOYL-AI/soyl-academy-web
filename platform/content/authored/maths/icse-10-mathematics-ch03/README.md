# ICSE Class 10 Mathematics — Chapter 3: Shares and Dividends (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 1 Commercial Mathematics)
- **t01** Face (nominal) value, market value; at par, at a premium, at a discount (in rupees and as a per cent of the face value); dividend and rate of dividend (always on the face value).
- **t02** Investment and number of shares (investment ÷ market value, a whole number); dividend on one share and annual income $n \times \text{FV} \times \frac{r}{100}$; number of shares and investment for a target income.
- **t03** Rate of return $\frac{\text{income}}{\text{investment}} \times 100 = \frac{\text{FV} \times r}{\text{MV}}$; premium lowers and discount raises the return; comparing two investments; price or rate of dividend for a stated return; splitting a sum between two shares for a stated income.
- **t04** Selling (proceeds, gain or loss) and reinvesting the proceeds; change in annual income; selling part of a holding.
- **Removed for ICSE 2027** (brokerage, fractional shares): one student-facing note only (notes §1). Every problem buys a whole number of shares and charges no brokerage; `fin.mjs` throws if a share count is not a positive whole number.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Shares, dividend and income" (t01–t02) 18 slides; Part 2 "Return, comparison and reinvesting" (t03–t04) 17 slides |
| Worked examples | 5 + 4 (reading three quotes; dividend and income; buying at a premium; buying at a discount; shares and investment for a target income; return by two routes; comparing two shares; price and rate for a given return; selling and reinvesting with the change in income) |
| Visuals | 23 of 35 slides (table 14, flow 7, plot 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual plus 12 more (tables, flows, plots) |
| Check slides | 4 + 4, all objective (q001 mcq, q033 fill-blank, q005 mcq, q028 true-false; q008 mcq, q010 mcq, q044 numerical, q031 true-false) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 5, formula 8, concept 6, fact 2, example 4, exam-tip 3, diagram 2) |
| Questions | 69 items, 164 marks: mcq 20, assertion-reason 6 (keys c d a b c d), true-false 6, fill-blank 7, numerical 8, short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 4–6 step marks each) |
| Difficulty | d1 11, d2 29, d3 25, d4 4 |
| Competency | recall 6, understanding 25, application 23, analysis 14, evaluation 1 — application or higher 55% of items, 79% of marks (lint band 45–65% of items) |
| Topics | t01 18, t02 30, t03 31, t04 13 (items may carry two topics) |
| Tests | `t_icse10math_ch03_short` (20 marks / 45 min: A = q003 q006 q011 mcq, q023 AR, q052 q054 short-3; B = one of q063, q064) and `_long` (40 marks / 90 min: A = q004 q007 q012 q013 q016 q019 mcq, q022 q025 AR, q057 q059 q061 short-4; B = any two of q065 q066 q067), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/fin.mjs` (exact shares arithmetic), `src/work.mjs` (LaTeX working lines generated from `fin.mjs`),
`src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch03/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch03/src/lint.mts content/authored/maths/icse-10-mathematics-ch03`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact arithmetic (`fin.mjs`):** every quantity is a BigInt rational. Money must be a whole number of paise, a number of shares a positive whole number, and a printed percentage must terminate (the one recurring return, $8\tfrac{1}{3}\%$, is compared as a rational and printed as a mixed number). Market value from a premium or discount is re-read as a quote and compared with the one given; number of shares is checked forwards (shares × MV = investment); income is found as $n \times \text{FV} \times \frac{r}{100}$ and as $n \times$ dividend on one share; return as income ÷ investment and as $\text{FV} \times r ÷ \text{MV}$; reinvested income as shares × dividend and as proceeds × return; gain as $n \times$ (sell − buy) and as proceeds − cost. Inverse helpers (shares for an income, price for a return, rate for a return, splitting a sum) re-check each answer forwards.
- **Re-solve:** 108/108 checks pass (`src/resolve.log`). Keys, numerical values and the numbers in model answers are typed as literals and recomputed from the givens; each MCQ's option values are typed independently so exactly one equals the re-solved target (distractors are the usual slips: dividend on the market value, dividing the investment by the face value, a per cent premium taken on the wrong value, choosing the higher rate instead of the higher return, sale proceeds or cost in place of the gain). The true-false item on reinvesting asserts a real counter-example (income falls from ₹360 to ₹300 despite a higher rate); the split-investment question asserts both parts buy whole shares and the incomes add to the stated total.
- **Slides, tables, plots, notes:** every worked example and table entry is recomputed in `build.mjs` (the build stops on a mismatch). Plots: income $9n$ and $12n$ for ₹100 shares, and return $\frac{1200}{\text{MV}}$ for ₹100 shares paying 12%, asserted against `fin.mjs`; marked points lie on their curves (16 points across deck and notes).
- **KaTeX:** 464 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`; ₹ is always outside maths.
- **Narration:** 35 slides, max 67 words, mean 46; numbers in words, no symbols or capital-letter abbreviations ("face value", "market value" are spoken in full).
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 5).
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`, 305 units): 0 errors for this unit.

## Originality
All set-ups, names and numbers are new. Every company is imagined and labelled as such (Brahmaputra Tea, Malabar Spices, Shivalik Pharma, Kaveri Agro Foods, Aravalli Cement, Satpura Minerals, Doon Electricals, Konkan Cashew, Pench Paints, Tapti Textiles, Konark Motors, Thar Salt Works, Sundarban Fisheries, Mahanadi Power, Palar Leather, Godavari Fertilisers, Kosi Rail Parts, Vindhya Steel, Nilgiri Dairy, Chambal Paper, Kaziranga Tours, Sabari Mills, Deccan Solar Power, Sahyadri Textiles, Coromandel Chemicals), and investors are imagined Indian names. Prices, rates and sums were chosen so every share count is whole and every figure an exact number of paise; none is taken from a textbook, specimen paper or past paper (CISCE documents were used for pattern only). Similar question shapes use different wording, since the bank duplicate check ignores numbers.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Tables use plain digits inside maths below one lakh (so the arithmetic lint can read them) and grouped digits in prose (₹31,500).
- No item uses brokerage, fractional shares, bonus or rights issues, or stock-exchange mechanics; these are outside the ICSE 2027 topic list.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
