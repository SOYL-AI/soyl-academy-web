# ISC Class 11 Accounts, Chapter 4 — Ledger

`isc-11-accounts-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accountancy (858), Class XI, Unit 3: Journal, Ledger and Trial Balance) · provenance `human`, author `claude-sonnet-5-5 (subject-producer chapter writer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032, D-050) on the pattern of the CBSE 11 Accountancy ledger chapters and ISC 12 Accounts ch01. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-11-accounts-ch04/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Rebuilding is byte-identical. Edit `src/`, not the JSON. A first writer was cut off by an API failure; its `fig.mjs`, `qq.mjs` and `q_t01`–`q_t03` were reviewed, kept and finished here (decks, notes, cards, tests, this README).

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 21 slides), notes (7 sections), 35 flashcards, 79 questions (144 marks) |
| `tests.json` | `t_isc11accounts_ch04_short` (20 marks, 50 min) on `isc-11-default-chapter-test-short` and `t_isc11accounts_ch04_long` (40 marks, 100 min) on `isc-11-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` and `acc.mjs` (copied unchanged from the ISC 11 scratch lib and the CBSE 11 engine), `fig.mjs` (chapter engine: dated posting with journal folios, closing entries, two imagined firms, all asserted), `qq.mjs` (registration with whole-mark scheme check), `q_t01`–`q_t03.mjs` (bank), `questions.mjs`, `build.mjs` (decks, notes, cards, tests, extra gates) |

## Scope
All three syllabus topics; no removed topics. GST transactions are not used anywhere (syllabus note). The journal is Chapter 3 and is only recalled; the trial balance (Chapter 7) is mentioned once; full final accounts are Chapters 12 and 13, so adjusting entries are at introductory depth.
- **t01** ledger meaning, importance, T-form, running balance form (a mention: one deck slide, one 3-mark item), ledger and journal folios, posting with To and By naming the other account, Sundries for compound entries, opening entries and opening balances — 22 items (2 shared with t02).
- **t02** balancing real and personal accounts (balance c/d and b/d on the correct sides), closing nominal accounts by transfer (no balance carried down), reading debit and credit balances — 24 items.
- **t03** closing entries (purchases, sales, returns, opening stock, direct and indirect expenses, incomes, gross and net profit, drawings) and adjusting entries (closing stock, outstanding and prepaid expenses, accrued income, income received in advance, depreciation) — 33 items.

### Decks
- **Part 1 (t01–t02), 20 slides, 16 with visuals:** ledger meaning and a journal-versus-ledger table, T-form and running balance form, folios, the rule of posting, the opening entry, compound entries, balancing steps, reading balances, slips to avoid. **Worked examples (4):** posting simple entries to the Cash A/c of Parvati Coir Works; a supplier's account before balancing; balancing the Cash A/c (debit balance ₹1,25,000); balancing a creditor (₹85,000 credit) and reading a debtor's debit balance (₹50,000). Three checks.
- **Part 2 (t02–t03), 21 slides, 17 with visuals:** nominal versus real and personal accounts, what goes to Trading and Profit and Loss, the closing journal entries, the Trading Account (gross profit ₹1,65,000) and Profit and Loss Account (net profit ₹1,25,000) in ledger form, profit and drawings to capital (closing capital ₹5,49,000), adjusting entries of Hosur Candle Works, the rule table for adjusting entries, prepaid rent and depreciation in the ledger. **Worked examples (6 slides):** wages account closed; trading items; Trading Account (two slides); adjusting entries; prepaid rent and depreciation. Three checks.
- Narration up to 72 words (mean 54), entirely in words: no digits, rupee sign, symbols or abbreviations (the build enforces this). Every table in a deck is generated from the computed ledgers.

### Notes (7 sections)
Ledger meaning and format; folios and the rule of posting; opening entries; balancing; reading balances; closing nominal accounts and closing entries; adjusting entries. Each has key terms and a visual; exam tips give the usual split of ISC marks, step marks and common mistakes.

### Question bank (79 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 26 | 1 | keys a7 b7 c6 d6; 3 are deck checks |
| assertion-reason | 6 | 1 | keys a b a c b d (ISC specimen options; (d) = both false) |
| numerical | 9 | 1 | cash and debtor balances, equal totals after balancing, gross and net profit, depreciation, adjusted expenses and income; 1 is a deck check |
| true-false · fill-blank | 5 · 5 | 1 | 3 false, 2 true; one of each is a deck check |
| short | 10 | 2 | ledger meaning, folios, opening entry, nominal versus real, reading balances, balancing steps, adjusting and closing meaning, prepaid and accrued entries |
| short | 11 | 3 | posting two entries, running balance form, compound posting, balancing a debtor, reading balances, closing nominal accounts, closing entries, three adjusting entries, depreciation, income in advance, closing stock |
| long | 7 | 5 | journal versus ledger, posting and balancing three accounts, balancing and closing Sales, error-finding in a faulty Cash A/c, closing journal entries for a year, five adjusting entries, Trading and Profit and Loss in ledger form |

- Difficulty d1/d2/d3/d4/d5 = 11/36/25/5/2. Competency: recall 11, understanding 23, application 36, analysis 7, evaluation 2 — **57% at application or above** (lint band 45–65%). Tags were set from what each item demands; none was changed after the first build.
- Written answers keep the full working in `answer.model_answer_md` (journal tables, ledger accounts with c/d and b/d, closing entries); `solution_md` is a short method note. Every marking step is a whole number of marks and the steps add up to the item's marks (the build checks both). MCQ distractors come from a named wrong method, and each solution names a distractor by its text, never its position.

### Tests (ISC class defaults, item for item; disjoint; no deck-check item; no numerical items)
- **Short (20 marks, 50 min):** A 4 MCQ (ledger meaning, balance c/d and b/d, closing sales, nature of balances) + 1 A-R; B ledger meaning + (balancing steps | prepaid insurance entry); C posting two entries + (balance a debtor's account | closing entries to Trading); D balance and close accounts (`l5_balance_close`).
- **Long (40 marks, 100 min):** A 10 MCQ + 2 A-R spread over the three topics; B folios, opening entry + (nominal versus real | meaning of adjusting entries); C running balance form, compound posting, closing Purchases and Sales + (three adjusting entries | depreciation entries); D post and balance three accounts + (closing entries for a year | five adjusting entries).
- Each test spans all three topics. The 2/3/5-mark default fits this chapter well.

## Verifier record (what the build computes and asserts)
`src/fig.mjs` and `src/acc.mjs` compute every amount and throw on any mismatch; deck, note and answer tables are generated from the results, so no figure is typed twice.
- **Journal entries:** debits equal credits in every entry (`journal`, `jrnl`, `closingEntries`).
- **Ledgers:** every ledger is generated by `ledger()`/`post()` (and `postD`, which also writes the journal folio and asserts that its balances agree with `post()`); both sides total the same, with balance c/d and b/d on opposite sides.
- **Closing:** `closingEntries()` asserts gross and net profit against `trading()` and `profitLoss()`; every nominal account, the Trading Account and the Profit and Loss Account are asserted to close with no balance; closing capital (₹5,49,000), the post-closing trial balance and the balance sheet total agree.
- Key figures pinned to hand-worked values: Parvati Coir Works cash ₹1,25,000, Venkat Fibre Co. ₹85,000 credit, Ismail and Sons ₹50,000 debit, opening capital ₹4,60,000, gross profit ₹1,65,000, net profit ₹1,25,000, machinery ₹2,70,000 after depreciation of ₹30,000; Hosur Candle Works adjusted salaries ₹91,000, insurance ₹12,000, commission ₹25,000, rent ₹27,000.
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems inside the bank; test disjointness, no deck-check item in a test, marks (20 and 40).

## Flagged treatments
- **Closing entries one per account:** each nominal account is closed by its own entry so each ledger shows its own line; opening stock is closed from `Stock A/c`.
- **Closing stock:** brought in by Closing Stock A/c Dr to Trading A/c; it stays a debit balance carried down. Other valid routes (such as crediting Purchases) are not taught.
- **Adjusting entries** come before the closing entries; outstanding and prepaid items go through separate accounts (Outstanding Wages A/c, Prepaid Rent A/c, Accrued Interest A/c); rent received in advance is debited to Rent Received A/c.
- **Running balance form** is only a mention, per the topic note; the T-form is used everywhere else.
- **Trial balance** is previewed in one note only; preparing it is Chapter 7.

## Originality
No ISC or CBSE textbook illustration, exercise or wording (including T.S. Grewal and D.K. Goel) and no CISCE specimen or board item is reused; official documents defined pattern and scope only. Every firm (Parvati Coir Works, Hosur Candle Works and the firms in the bank), person and figure is imagined and labelled as such. The CBSE 11 Accountancy ledger chapters (ch03 and ch06) were read for structure only; their firms, figures, dates and wording are not reused. Every stem names its own firm or account. The build's exact-stem pre-check against the whole bank is clean.

## Gaps
- No case-based items; objective items carry the theory and written items the computation.
- No narration audio (TTS needs OA-03).
- The T-form format table has eight columns; check it at 360 px on staging.
- The closing entries of Worked example 2 are spread over three slides (trading items, expenses and incomes, profit and drawings); a producer may prefer one table.
