# CBSE Class 12 Accountancy, Chapter 8 — Financial Statements of a Company

`cbse-12-accountancy-ch08` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 3: Analysis of Financial Statements) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics and Accountancy chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch08/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 20 slides), notes (7 sections), 30 flashcards, 74 questions (168 marks) |
| `tests.json` | `t_cbse12accountancy_ch08_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch08_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce builders, copied unchanged apart from its header), `acc.mjs` (the Schedule III classification table and builders: share capital note, balance sheet with notes, Statement of Profit and Loss with notes, Indian-system number words for narration), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests) |

## Scope
Both syllabus topics (2026-27): **t01** meaning, components (Section 2(40)), Section 129 and Schedule III, nature (recorded facts, conventions, postulates, personal judgements), objectives, importance to users, limitations (19 items) · **t02** the Schedule III (Division I) balance sheet: major heads and sub-heads, operating cycle and the twelve-month rule, classifying items (calls in advance and in arrears, unpaid dividend, provision for tax and for gratuity, interest accrued, bank overdraft, current maturities of long-term borrowings, loose tools, stores and spares, capital work-in-progress, intangibles, current and non-current investments, loans and advances, share application money pending allotment, debit balance of profit and loss), notes to accounts, preparing a balance sheet from a list of balances, and a simple Statement of Profit and Loss (revenue from operations, other income, the seven expense heads, profit before tax, tax, profit for the year) and its link to the surplus (55 items).

**Removed for 2026-27:** exceptional and extraordinary items and discontinued operations appear only as one "not in the 2026–27 syllabus" line in notes section 7; the Statement of Profit and Loss format used everywhere goes straight from total expenses to profit before tax.

### Decks
- **Part 1** (19 slides): components, nature, objectives, users, importance, limitations, the Equity and Liabilities and Assets formats (generated from the classification table), the operating cycle, the current/non-current tests. **Worked examples (2):** the balance sheet equation for an imagined **Kaveri Paints Ltd, Hosur** (shareholders' funds ₹27,50,000, reserves and surplus ₹7,50,000); splitting a ₹8,00,000 term loan repayable in four instalments (₹2,00,000 current, ₹6,00,000 long-term), with an SVG timeline whose instalment positions are computed from the due dates. Four checks.
- **Part 2** (20 slides): share capital terms, reserves and surplus, the liabilities and assets students misplace (both tables generated from the classification table), notes to accounts, the Statement of Profit and Loss format and expense heads, the profit-to-surplus link. **Worked examples (5 slides):** share capital note of **Tapti Textiles Ltd, Surat** (₹13,94,000 after calls in arrears); balance sheet and notes of **Godavari Ceramics Ltd, Rajahmundry** (₹9,85,000), over two slides; Statement of Profit and Loss and notes of **Sabari Spices Ltd, Kochi** (profit for the year ₹3,85,000), over two slides. Four checks.
- 29 of 39 slides carry a visual (23 tables, 5 flows, 1 SVG); never more than 3 slides in a row without one. Narration ≤ 67 words (mean 49), TTS-safe: amounts spoken in words generated from the computed values, "Schedule Three", no digits, symbols or capitalised abbreviations.

### Question bank (74 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 22 | 1 | components, Section 129, nature, users, limitations; classification of calls in advance/arrears, unpaid dividend, provision for tax, gratuity, loose tools, capital work-in-progress, intangibles, share application money, accumulated loss, operating cycle (30-month winery), current maturity; revenue vs other income, finance costs, change in inventories |
| assertion-reason | 7 | 1 | keys a3 b1 c2 d1 |
| true-false · fill-blank · match | 4 · 4 · 4 | 1 · 1–2 · 2 | T/F 2 true, 2 false; matches: users, liabilities, assets, profit and loss heads |
| numerical | 6 | 2 | shareholders' funds, paid-up capital, total current liabilities, property plant and equipment, materials consumed, profit before tax |
| short | 12 | 3 | objectives, limitations, users (case), nature; share capital note, two classifications of six items, operating cycle, loan split, reserves with a larger debit balance (negative total), employee benefits and finance cost notes, property plant and equipment and intangibles notes |
| long | 8 + 7 | 4 / 6 | 4: two classifications of eight items, Equity and Liabilities part, Assets part, Statement of Profit and Loss (trader), shareholders' funds with arrears and a debit balance, users case, evaluation of an investor's claim (limitations). 6: three balance sheets with notes (Vaigai ₹22,80,000; Mahanadi ₹13,80,000 with arrears, a loan split, a debit balance and deductions; Sutlej ₹43,10,000 with share application money, capital work-in-progress, provisions and both kinds of loans), two Statements of Profit and Loss (manufacturer with materials and inventories, tax 25%; trader with a negative change in inventories, tax 30%), profit to surplus to shareholders' funds (Pench ₹16,70,000), one theory item |

- Difficulty d1/d2/d3/d4/d5 = 8/31/26/8/1. Competency: recall 8, understanding 23, application 32, analysis 10, evaluation 1 — **58% at application or above** (lint band 45–65%).
- MCQ keys a6 b5 c6 d5.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B classification of six items + objectives; C Equity and Liabilities part | investor's claim (limitations); D Vaigai balance sheet | Chambal Statement of Profit and Loss. Long = A 6 MCQ + 2 A-R; B share capital note, limitations, loan split + (classification | profit and loss notes); C classification of eight items + (Assets part | trader's Statement of Profit and Loss); D Mahanadi balance sheet + (Sutlej balance sheet | Ganga Statement of Profit and Loss).

## Verifier record (what the build computes and asserts)
- **One classification table** (`CLASSIFY` in `acc.mjs`, 62 balance sheet items; `PL_CLASSIFY`, 27 profit and loss items) drives every balance sheet, every note, every classification table in a model answer, the format and "tricky item" visuals and every classification option and match key. An item missing from the table, or a note mixing sub-heads, throws.
- **Asserted on every build:** each note's lines add to its total (deductions such as accumulated depreciation, provision for doubtful debts, calls in arrears and a debit balance of profit and loss shown inside the note); the share capital note reconciles (subscribed ≤ issued ≤ authorised; paid-up = called-up − arrears); every balance sheet totals on both parts (Godavari ₹9,85,000, Vaigai ₹22,80,000, Mahanadi ₹13,80,000, Sutlej ₹43,10,000) and every extract belongs wholly to one part (Wardha ₹15,50,000, Bhima ₹15,80,000, Netravati ₹5,70,500, Pench ₹16,70,000); the Statement of Profit and Loss re-adds (materials consumed, change in inventories, total income − total expenses = profit before tax, whole-rupee tax); the profit flows into the surplus. Key results are also pinned to independently hand-checked values (an early data error in the Sutlej assets was caught this way). The Mahanadi stem's balances are checked to equal the classified balances after the loan split.
- Pipeline `verify --authored` on this unit: 74/74 pass, 0 flags; `originality --authored`: 0 errors, 0 warnings (no reference texts supplied, OA-16).

## Originality
No NCERT illustration, exercise or wording and no CBSE sample/past-paper item is reused; they define the pattern only. Every company (Kaveri Paints, Tapti Textiles, Godavari Ceramics, Sabari Spices, Vaigai Polymers, Mahanadi Steel Tubes, Sutlej Agro, Chambal Foods, Ganga Home Appliances, Pench Paper and others) and every figure is SOYL's own and labelled imagined.

## For a reviewer to double-check
- **Current maturities of long-term borrowings** are placed under **Short-term Borrowings**, following the 2021 amendment to Schedule III; notes section 5 says older books show them under Other Current Liabilities. If the board's 2026-27 marking scheme expects Other Current Liabilities, change one line in `CLASSIFY` and rebuild (affected: `m_curr_mat` solution, `s3_curr_mat`, `l4_classify_b`, `l6_bs2`, deck 1 example 2 and its SVG text, the liabilities table, notes section 5, one flashcard).
- **Prepaid expenses / interest accrued on investments** → Other Current Assets; **advance to suppliers** → Short-term Loans and Advances; **capital advances** and **long-term loans to employees** → Long-term Loans and Advances.
- **Share application money pending allotment** is used only where the stem says it is not refundable.
- Deferred tax lines, Other Long-term Liabilities and Other Non-current Assets appear in the format only; no item is classified under them.
- Balance sheets show one year's column (the previous-year column is omitted in practice items). Note tables and the SVG timeline should be checked at 360 px on staging.

## Gaps
- No case-based items (optional per brief).
- The cash flow statement and the statement of changes in equity are named as components only (cash flow is chapter 11).
