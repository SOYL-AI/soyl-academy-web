# CBSE Class 12 Accountancy, Chapter 4 — Retirement and Death of a Partner

`cbse-12-accountancy-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A, Unit 1: Accounting for Partnership Firms) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch04/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 19 slides), notes (7 sections), 30 flashcards, 66 questions (150 marks) |
| `tests.json` | `t_cbse12accountancy_ch04_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch04_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce builders, copied unchanged apart from its header), `acc.mjs` (accounting helpers: fractions and ratios, journal, ledger, columnar capital accounts, Revaluation Account, balance sheet, loan account, Indian-system number words for narration), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests) |

## Scope
All four syllabus topics (2026-27; the chapter has no deleted topics): t01 new ratio and gaining ratio (12 items tagged) · t02 goodwill under AS 26 (outgoing share credited, gaining partners debited; existing goodwill written off in the old ratio; a continuing partner who sacrifices is credited), revaluation, reserves and accumulated profits/losses incl. Workmen Compensation and Investment Fluctuation Reserves (24) · t03 settlement: capital accounts (fluctuating and fixed), payment at once / loan / instalments with interest, Section 37, the loan account, the balance sheet after retirement, capital adjustment to the new ratio (20) · t04 profit till the date of death on time (last year or average) and turnover bases via Profit and Loss Suspense, the deceased partner's capital account and the executor's account (17). Items with two topics are counted under both.

### Decks
- **Part 1** (21 slides): retirement vs death, the order of adjustments, three cases for the new ratio, sacrificing vs gaining ratio, goodwill (AS 26), old goodwill, the Revaluation Account format, reserves. Running imagined firm **Sitara Traders, Jaipur** (Arjun, Bela, Chirag 5:3:2; Chirag retires). **Worked examples (5):** ratios with and without agreement (5:3 vs 1:1); Riya/Sahil/Tenzin share bought equally (new 5:4, gain 1:1); goodwill ₹1,80,000 → Chirag ₹36,000; Revaluation Account (profit ₹25,000); reserves incl. Workmen Compensation Reserve with a claim. One SVG (share bars, widths computed from the fractions). Four checks.
- **Part 2** (19 slides): amount due, columnar capital accounts (Chirag ₹1,46,600: ₹46,600 by bank, ₹1,00,000 loan), modes of payment and Section 37, Chirag's loan account (₹60,000 and ₹55,000), the new balance sheet (₹5,42,400), capital adjustment to ₹3,60,000 in 3:2 (Arjun brings ₹7,500, Bela withdraws ₹3,900), death: the three bases for an imagined **Kaveri Handlooms, Mysuru** (₹18,000 / ₹17,500 / ₹21,000), Profit and Loss Suspense, Kabir's capital account (₹1,70,000) and executor's account. **Worked examples (6).** Four checks.
- 30 of 40 slides carry a visual (23 tables, 6 flows, 1 SVG); no more than 3 slides in a row without one. Narration ≤ 69 words (mean 51), TTS-safe: amounts and fractions are spoken in words generated from the computed values ("rupees one lakh forty-six thousand six hundred", "three fifths"), no digits, symbols or capitalised abbreviations.

### Question bank (66 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 21 | 1 | ratios (default, given, portion, one partner takes all, only one partner gains), goodwill entry, WCR excess claim, IFR, Section 37, loan instalment, capital adjustment, time and sales bases |
| assertion-reason | 6 | 1 | keys a2 b2 c1 d1 |
| true-false · fill-blank · match | 4 · 3 · 2 | 1 · 1–2 · 2 | T/F 2 true, 2 false |
| numerical | 6 | 1–2 | goodwill share, revaluation share, amount due, loan interest, average-profit and sales-basis profit till death |
| short | 10 | 3 | ratios (take, portion), sacrificing vs gaining, goodwill entries incl. a sacrificing continuing partner, reserves entries, Yash's capital account, loan schedule, profit till death + entry, executor's account |
| long | 7 + 7 | 4 / 6 | 4: Revaluation Account, goodwill/reserve entries, capital accounts, capital adjustment, loan account, both bases + entry, a d4 evaluation (seasonal Sivakasi firm: time ₹62,500 vs sales ₹30,000). 6: Revaluation + capitals + balance sheet (₹4,02,500), capital + loan account (₹74,400; ₹67,200), capital adjustment (Gagan brings ₹50,000, Heena ₹30,000), fixed capitals with current accounts, retirement journal (₹92,000 paid), deceased partner's capital + executor's accounts (₹2,18,250), death journal with goodwill at 2 years' purchase (₹1,69,500 due) |

- Difficulty d1/d2/d3/d4 = 8/22/30/6. Competency: recall 8, understanding 20, application 26, analysis 11, evaluation 1 — **58% at application or above** (lint band 45–65%).
- MCQ keys a5 b5 c6 d5.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B two 3-mark items; C Revaluation Account | loan account; D full retirement with balance sheet | deceased partner's capital + executor's accounts. Long = A 6 MCQ + 2 A-R; B 3 × 3 + (reserves entries | executor's account); C capital adjustment + (both bases | goodwill/reserve entries); D capital adjustment with revaluation + (capital and loan accounts | death journal).

## Verifier record (what the build computes and asserts)
- **Every figure is computed** by `acc.mjs` from the givens and rendered into stems, tables, keys and model answers with Indian digit grouping; no amount is typed twice. Amounts must be whole rupees or the build throws.
- **Asserted on every build:** each journal entry's debits = credits; every ledger account (Revaluation, loan, executor's, single-partner capital) totals equal; every columnar capital/current account balances per partner and closes at nil; every balance sheet totals on both sides (Sitara ₹5,90,000 before, ₹5,42,400 after; Akash/Bhumika ₹4,02,500); new shares add to 1 and gains cancel the outgoing share; goodwill debits = credits; splits by a ratio add back to the amount; loans are fully repaid; rates are whole percentages. Key results are also pinned to independently hand-checked values (e.g. Kriti/Lohit/Madhav due ₹92,000; Parth ₹2,18,250; Sanjay ₹1,69,500).
- Pipeline `verify --authored` on this unit: 66/66 pass, 0 flags; `originality --authored`: 0 errors, 0 warnings (no reference texts supplied, OA-16).

## Originality
No NCERT illustration, exercise or wording and no CBSE sample/past-paper item is reused; they define the pattern only. Every firm (Sitara Traders, Kaveri Handlooms, a Sivakasi fireworks wholesaler, a Guwahati tea trader, and others), every partner and every figure is SOYL's own and labelled imagined.

## For a reviewer to double-check
- **P&L Suspense closure:** the deck says the suspense balance is cleared when the year's profits are divided, and is shown on the assets side if a balance sheet is drawn up on the date of death; it does not name a closing entry.
- **Fixed capitals (`l6_retire_fixed`):** all adjustments go through current accounts and the retiring partner's current balance is transferred to his capital account before transfer to loan.
- **Executor's loan** is used as the name for the unpaid balance on death (`l6_death_full`, `l6_death_entries`, Kabir).
- **SVG** share bars place labels by pixel coordinates; check at 360 px on staging. Columnar capital-account tables are 8 columns wide and will scroll on a phone.

## Gaps
- No case-based items (optional per brief); no d5 items.
- Hidden goodwill on retirement and the Joint Life Policy are not covered (neither is named in this chapter's syllabus topics).
- Only the Profit and Loss Suspense method is used for profit till death (the alternative of debiting the continuing partners directly is not shown).
