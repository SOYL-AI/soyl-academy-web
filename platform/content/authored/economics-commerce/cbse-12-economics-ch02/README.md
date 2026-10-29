# CBSE Class 12 Economics, Chapter 2 — Money and Banking

`cbse-12-economics-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Introductory Macroeconomics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Social Science economics chapters (`cbse-10-social-science-ch19`). Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch02/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 19 slides), notes (6 sections), 32 flashcards, 67 questions (119 marks; 3 case-based items with 9 parts and 3 alternatives) |
| `tests.json` | `t_cbse12economics_ch02_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch02_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (builders, validation, SVG builder; same copy as ch01), `questions.mjs` (bank and the deposit-creation helpers), `build.mjs` |

## Scope
All three syllabus topics: t01 money — barter, meaning, functions, legal tender and fiat money, supply of money (M1) (20 items) · t02 money creation by commercial banks — legal reserve ratio, rounds of deposit creation, money multiplier, assumptions and limits (20) · t03 the central bank (RBI) — functions and credit control by bank rate, repo, reverse repo, CRR, SLR, open market operations and margin requirements (27).

### Decks
- **Part 1** (21 slides): barter and its problems, what money is (evolution flow), four functions, legal tender and fiat money, M1 (SVG: inside and outside the money supply), commercial banks, the legal reserve ratio (CRR + SLR), deposit creation round by round (table and SVG bar chart computed from the ratio), the multiplier curve 1 ÷ LRR (plot), why real banks create less. **Worked examples:** which function is at work; calculating M1 with distractor items (₹7,865 crore); multiplier, total deposits and credit (₹10,000 at 20% → ₹50,000 and ₹40,000). Four checks.
- **Part 2** (19 slides): central vs commercial bank, six RBI functions, bank of issue and banker to the government, bankers' bank and lender of last resort, quantitative vs qualitative instruments, repo and reverse repo (SVG: who lends to whom), bank rate/CRR/SLR, open market operations, the toolkit for excess and deficient demand. **Worked examples:** repo rise to loan rates to aggregate demand; funds left to lend after CRR and SLR (₹800 crore → ₹624 crore); margin 25% → 40% on ₹10 lakh of shares (₹7.5 lakh → ₹6 lakh). Four checks.
- 29 of 40 slides carry a visual (16 tables, 9 flows, 3 SVG, 1 plot); narration 10–72 words (mean 53), no symbols.

### Question bank (67 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 25 | 1 | situations for each function of money, a "NOT in money supply" item, multiplier numericals, instrument-direction items |
| assertion-reason | 7 | 1 | keys a3 b1 c3 |
| numerical | 6 (+ 3 inside cases) | 1–2 | M1, credit created, initial deposit, LRR from the multiplier, funds left after CRR/SLR, margin loan; `value` + `unit` |
| true-false · fill-blank · match · ordering | 3 · 2 · 2 · 1 | 1 · 1 · 2 · 1 | ordering: one round of deposit creation |
| short | 7 + 5 | 2 / 3 | `word_limit` 30–50 / 50–80 (blueprint guidance) |
| long | 6 | 5 | `word_limit` 80–120; includes two d4 policy questions and one d4 evaluation of the multiplier's limits |
| case-based | 3 | 4 | the imagined island of Tamarind Bay (barter to money, M1 in "tamarinds"); deposit creation at the imagined Sahyadri Bank (25%); a policy statement of the imagined Reserve Bank of Suvarnadesh |

- Difficulty d1/d2/d3/d4 = 7/33/24/3. Competency: recall 10, understanding 22, application 24, analysis 9, evaluation 2 — **52% of items and 58% of marks at application or above** (lint band 45–65%).
- MCQ keys a7 b6 c6 d6; T/F 2 true, 1 false.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the Suvarnadesh case. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C the inflation-toolkit question + (5|5); D Tamarind Bay and Sahyadri Bank.

## Data and facts
- **Every figure is imagined and computed by the build** (`creation()` and `rounds()` in `questions.mjs`; assertions stop the build if a figure drifts): ₹20,000 at 10% → ₹2,00,000; ₹50,000 at 20% → credit ₹2,00,000; ₹6,00,000 total at 12.5% → initial ₹75,000; ₹25,000 → ₹1,25,000 means LRR 20%; ₹1,000 crore at 10% and 20% → ₹10,000 and ₹5,000 crore; Sahyadri Bank ₹40,000 at 25% → 30,000 / 22,500 / 16,875 lent in rounds 1–3, total ₹1,60,000, credit ₹1,20,000.
- **Facts stated (stable):** RBI issues currency notes except one-rupee notes; one-rupee notes and coins are issued by the Government of India; RBI set up in 1935 and nationalised in 1949; CRR is held with the RBI, SLR by banks in cash, gold and approved securities; repo = RBI lends to banks against government securities, reverse repo = RBI borrows (pays on parked funds); bank rate described as RBI lending to banks for longer periods without a repurchase deal.
- **No current policy-rate, CRR or SLR values** are stated; the 4% / 18% in two numericals are labelled imagined.
- **Politically neutral:** the policy passage describes an imagined central bank and says so.
- **Originality:** no NCERT example, table or exercise is reused; every scenario, table and passage is SOYL's own.

## Please double-check (reviewer)
1. The **M1** definition includes "other deposits with the RBI" as a third, small component (the textbook definition). The 2026-27 syllabus wording names only currency and net demand deposits.
2. The **bank rate** is described in the standard textbook way (longer-term lending without a repurchase agreement). In current RBI practice the bank rate is aligned with the marginal standing facility rate, which the chapter does not mention.
3. The **reverse repo** is taught as an instrument because the syllabus names it, although the RBI now uses a standing deposit facility as the floor of its corridor. The chapter does not discuss the corridor.

## Gaps
- No KaTeX: formulas are written in plain text (1 ÷ LRR), as in the SST chapters' lib, which refuses `$`.
- High-powered money and broad money (M3) are not taught (outside the 2026-27 topic list); M3 appears only as "broader measures".
