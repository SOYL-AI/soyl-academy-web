# ISC Class 11 Accounts, Chapter 1 — Introduction to Accounting

`isc-11-accounts-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accountancy (858), Class XI, Unit 1: Introduction to Accounting) · provenance `human`, author `claude-sonnet-5-5 (subject-producer chapter writer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 11 Accountancy chapter 1 (structure, helper style) and the ISC 12 Accounts chapter 1 (ISC presentation, 1/2/3/5-mark tests). Built from `src/` (`npx tsx content/authored/economics-commerce/isc-11-accounts-ch01/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules, the exact-stem originality pre-check against the whole bank and the editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json`). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 22 slides), notes (8 sections), 34 flashcards, 81 questions (143 marks) |
| `tests.json` | `t_isc11accounts_ch01_short` (20 marks, 50 min) on `isc-11-default-chapter-test-short` and `t_isc11accounts_ch01_long` (40 marks, 100 min) on `isc-11-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (ISC 11 Accounts lib: the CBSE 11 Accountancy lib with ISC assertion-reason options, copied unchanged), `acc.mjs` (accounting engine, copied unchanged), `figs.mjs` (computed and pinned figures), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests) |

## Scope
All five syllabus topics; no removed topics. ISC weightage for the unit is about 2 marks of 80, so the depth is conceptual with small computed items (capital, profit, closing stock, debtor balance, classification of lists). No GST anywhere.
- **t01** history of accounting (general, no dates beyond "late fifteenth century"), book-keeping, accounting and accountancy, the six-stage accounting cycle — 13 items.
- **t02** event, transaction (cash, credit), voucher, capital, drawings, expense vs loss, revenue vs income, profit vs gain — 22 items.
- **t03** assets (tangible, intangible, fixed, current, liquid, wasting, fictitious) and liabilities (internal, external, current, long-term, contingent), classification of lists, capital = assets − external liabilities — 17 items.
- **t04** goods, purchases, sales, trade debtors and creditors, raw material, work in progress, finished goods, opening and closing stock — 16 items.
- **t05** internal and external users and their needs, financial, cost and management accounting — 13 items.

### Decks
- **Part 1 (t01–t02), 20 slides, 17 with visuals:** history flow and table, three terms, the six-stage cycle (SVG), events and transactions, vouchers, capital and drawings, expense/loss, revenue/income, profit/gain. **Worked examples:** Sirsa Handloom Stores activities mapped to the stages; Nagaon Silk Cocoons events and cash/credit transactions; Raichur Cotton Ginners profit (income ₹9,66,000, expenses ₹7,96,000, profit ₹1,70,000, net profit ₹1,68,500 after a gain and a loss); its capital roll-forward (closing ₹6,66,500). Checks: order the cycle, a transaction, a gain (true/false).
- **Part 2 (t03–t05), 22 slides, 19 with visuals:** asset tree (SVG), fixed, current and liquid, wasting and fictitious, liability tree (SVG), kinds of liability, trade terms, stock flow (SVG), users web (SVG), needs, financial/cost/management comparison. **Worked examples:** Tezu Lemon Squash Works classification (assets ₹7,09,000, external liabilities ₹3,20,000, capital ₹3,89,000; the court claim left out); Bhuj Embroidery House capital (₹5,84,000); Kasganj Brass Bells debtor ₹30,000 and creditor ₹50,000 (machine seller not a trade creditor); Alwar Mustard Oil Mill stock (₹4,00,000 to ₹4,25,000); Pathankot Hosiery closing stock ₹82,000. Checks: intangible asset, work in progress (assertion-reason), match users.
- Narration up to 78 words (mean 47), entirely in words (no digits, rupee sign or symbols).

### Question bank (81 items, 143 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 23 | 1 | keys a6 b5 c6 d6; 2 are deck checks |
| assertion-reason | 6 | 1 | ISC options; keys a b c a d b (d = both false); 1 deck check |
| true-false · fill-blank · ordering · match | 5 · 5 · 1 · 1 | 1 · 1 · 2 · 2 | T/F 2 true, 3 false; ordering, match and one T/F are deck checks |
| numerical | 12 | 1 | profit, closing capital, expenses, profit worked back from capital, capital, liquid assets, capital change, closing stock from a flow, from units, debtor balance, net purchases, net sales |
| short | 10 | 2 | |
| short | 11 | 3 | |
| long | 7 | 5 | cycle applied to a sale; five distinctions; full profit and capital; classify eight assets and find capital; stocks and a debtor; five users and needs; branches of accounting |

- Difficulty d1/d2/d3/d4 = 3/30/38/10. Competency: recall 11, understanding 33, application 30, analysis 7: **46% at application or above** (lint band 45–65%).
- Written answers keep the working in `answer.model_answer_md`; `solution_md` is a short method note. Every marking step is a whole number of marks and the steps add up to the item's marks (the build checks both).

### Tests (ISC class defaults, item for item; disjoint; no deck-check item)
- **Short (20 marks, 50 min):** A 4 MCQ (history, voucher, fictitious asset, work in progress) + 1 A-R (users); B accounting vs book-keeping + (revenue vs income | contingent liability); C classify six items + (debtor and creditor from cases | users' needs); D full profit and capital.
- **Long (40 marks, 100 min):** A 10 MCQ + 2 A-R; B history, expense vs loss + (wasting vs fictitious | cost vs management accounting); C three terms, capital with a pending claim, kinds of stock + (profit vs gain | branches); D five distinctions + (classify eight assets and find capital | five users and their needs).

## Verifier record (what the build computes and asserts)
`src/figs.mjs` and the `same()` calls beside each item pin every amount to a hand-worked value; decks, notes, tables and model answers interpolate the computed values, so no figure is typed twice (the few hard-coded sums in a model answer, such as the ₹2,500 gain, are asserted next to it).
- Capital equals assets minus external liabilities in every capital item (Tezu ₹3,89,000, Bhuj ₹5,84,000, Koraput ₹5,11,000, Nakhatrana ₹4,65,000, Ambala ₹7,71,000).
- Profit, net profit and closing capital chain correctly (Raichur, Dhanera, Chandra, Gurpreet, Yamini); the closing-stock flow and unit counts agree.
- MCQ distractors come from a named wrong method (loan counted as current, cash sale counted as debtor, contingent claim added) and each solution names them by value.
- Build gates: ISC assertion-reason verdicts only; answer-leak scan; narration TTS rules; exact-stem originality pre-check against the whole bank; marks (20 and 40).

## Flagged treatments a reviewer should double-check
- **Fictitious assets** (preliminary expenses, deferred advertising) are counted among total assets in the capital examples (Bhuj, Koraput, Ambala), as the horizontal balance sheet shows them until written off.
- **Liquid assets** are taken as cash, bank balances and marketable securities; debtors and stock are not liquid in the items. Some books also count debtors and bills receivable, which notes section 5 says.
- **Revenue vs income** follows the common school definition (revenue: main activity; income: revenue plus other earnings and gains). The notes carry a one-line caution that books differ.
- **Wasting asset** is treated as a fixed asset (quarry, mine).
- **Contingent liability** is not deducted when finding capital.
- **History:** only the late-fifteenth-century printed account of double entry is mentioned, no names or other dates.

## Originality
No textbook illustration, exercise or wording (including T.S. Grewal, D.K. Goel and the ISC textbooks) and no CISCE specimen item is reused; official documents defined scope and pattern only. Every firm and person is imagined and labelled so: Sirsa Handloom Stores, Nagaon Silk Cocoons, Raichur Cotton Ginners, Tezu Lemon Squash Works, Bhuj Embroidery House, Kasganj Brass Bells, Alwar Mustard Oil Mill, Pathankot Hosiery and the firms in the bank. The CBSE 11 Accountancy ch01 set-ups (Meera Traders, Kaveri Bakery, Dhanpur Dairy, Anand Sports, Rohit Stationers, the dairy, tea company and bill examples) and the ISC 12 ch01 partnership firms were avoided; figures and stems are new. Every stem names its own firm or concept.

## Gaps
- No case-based items (the ISC Class 11 default tests carry none); objective and short items carry the theory.
- No narration audio (TTS needs OA-03).
- The five SVGs (cycle, asset tree, liability tree, users web, stock flow) place labels by pixel coordinates; check both themes.
- Tables of up to 11 rows (Tezu classification) and four columns (branches) should be checked at 360 px on staging.
