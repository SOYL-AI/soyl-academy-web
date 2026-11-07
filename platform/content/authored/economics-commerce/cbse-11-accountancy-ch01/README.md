# CBSE Class 11 Accountancy, Chapter 1: Introduction to Accounting

`cbse-11-accountancy-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 1: Theoretical Framework) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch01/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules, the exact-stem originality pre-check and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` on any error). Rebuilding is byte-identical. Edit `src/`, not the JSON. This folder also holds the shared `lib.mjs` and `acc.mjs` that every CBSE 11 Accountancy chapter imports (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 22 slides), notes (7 sections), 31 flashcards, 80 questions (145 marks) |
| `tests.json` | `t_cbse11accountancy_ch01_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11accountancy_ch01_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/figs.mjs` | the computed, asserted figures of the imagined firms, shared by the bank and the decks |
| `src/questions.mjs`, `src/build.mjs` | question bank; decks, notes, cards, tests, build call |

## Scope
All three syllabus topics: t01 meaning, objectives, role, users (26 items) · t02 qualitative characteristics (11) · t03 basic terms (43). The syllabus lists no removed topics.

### Decks
- **Part 1 (t01 and t02), 20 slides, 17 visuals:** process flow SVG, book-keeping versus accounting, branches, objectives, roles, users web SVG, internal and external needs, reliability, relevance and understandability, comparability chart SVG. Worked examples: roles at Meera Traders, users at Kaveri Bakery, qualities in four imagined cases. Three checks (ordering, match, mcq).
- **Part 2 (t03), 22 slides, 19 visuals:** entity and transaction, capital and drawings, assets and liabilities classification tree SVG, capital of Meera Traders (assets 7,70,000 less liabilities 2,70,000 = 5,00,000), classification at Kaveri Bakery, capital and revenue expenditure, profit and loss terms, profit of Kaveri Bakery (40,000), discounts and a bill (45,000 invoice, 900 cash discount, 44,100 paid), goods, stock, debtors, creditors, net purchases (1,38,000) and net sales (2,25,000). Three checks (mcq, assertion-reason, ordering).
- Narration: at most 73 words (mean 46), amounts in words, no digits or symbols (the build enforces it).

### Question bank (80 items)
mcq 29 · assertion-reason 7 · numerical 6 · true-false 4 · fill-blank 3 · match 2 · ordering 2 · short 2-mark 10 · short 3-mark 7 · long 5-mark 6 · case-based 4. Difficulty d1/d2/d3/d4 = 14/35/26/5. Competency: recall 13, understanding 20, application 36, analysis 11 (59% at application or above). MCQ keys a7 b7 c7 d8. No competency tag was changed to fit a band.

### Tests (disjoint, no deck-check item, no numerical item)
- **Short (20 marks):** A `m_bank_need, m_neutral, m_capex, ar_reliable`; B `s_users_ie, s_trade_cash, s3_users_needs`; C one of `l_meaning_obj | l_classify`; D `c_loan`.
- **Long (40 marks):** A `m_bk_scope, m_branch_cost, m_hist, m_late_report, m_compare, m_drawings, m_gain, m_net_sales, ar_lender, ar_drawings`; B `s_bk_diff, s_cap_draw`, one of `s_language | s_compar`, `s3_chars_cases`, one of `s3_classify6 | s3_disc_calc`; C `l_users`, one of `l_chars | l_equation`; D `c_late, c_lists`.

## How verified
Every figure is computed with `acc.mjs` or `figs.mjs` and asserted with `same()` (capital as assets minus liabilities, net purchases and sales, trade and cash discount on three bills, debtor and creditor balances, gain and loss on sale, profit and the capital roll-forward, the accounting equation of Ishaan Cycles after each step). Stems, tables, narration and model answers interpolate the computed values. The build reports 0 lint errors and warnings and `NO ERRORS`; three builds give identical `release.json` and `tests.json`; the near-duplicate scan reports 0 flags against 42,277 other stems and the SVG label check reports 0 issues in 4 figures.

## Facts for a reviewer
1. Accounting is defined as a process of identifying, measuring, recording, classifying, summarising, analysing, interpreting and communicating financial information to users; the classical definition is paraphrased in general form with no body or year named (notes section 1).
2. Book-keeping is limited to recording and classifying; accounting adds summarising, analysing, interpreting and communicating.
3. Three branches: financial, cost and management accounting, with the one-line concerns given in the notes.
4. Four objectives: systematic records, profit or loss, financial position, information to users. Five roles: language of business, historical record, current economic reality, information system, service to users.
5. Internal users: owners, management, employees. External users: banks and lenders, investors, suppliers and creditors, government and tax authorities, consumers, researchers; the needs attached to each are the commonly taught ones.
6. Qualitative characteristics follow the four-way grouping: reliability (verifiability, neutrality, faithful representation), relevance (timeliness, predictive value, feedback value), understandability, comparability (across periods and across firms). Timeliness is placed under relevance, as many textbooks do; some place it as a separate quality.
7. Entity: a person or organisation with a separate existence for accounting. Business transaction: an exchange of money or money's worth with another party, measurable in money.
8. Capital = assets minus liabilities; drawings reduce capital and are not an expense.
9. Classification: non-current assets are tangible or intangible; current assets are expected to turn into cash within twelve months or the operating cycle; non-current liabilities are due after more than twelve months; current liabilities within twelve months or the operating cycle (the Schedule III style test, stated generally).
10. Goodwill and patents are treated as intangible non-current assets; land, machinery and furniture as tangible.
11. Capital expenditure gives lasting benefit or adds to an asset (installation cost of a machine included); revenue expenditure is used up within the year (repairs that only maintain an asset are revenue).
12. Expense, income, profit, gain and loss are defined as in the notes; a gain is taken to arise from an incidental event, income as including the main activity, and profit as income minus expenses.
13. Trade discount is on the list price and is not recorded; cash discount is on the invoice amount and is recorded as discount allowed or received. No GST is used anywhere in this chapter.
14. Net purchases = purchases minus purchases return; net sales = sales minus sales return; closing stock of one period is the opening stock of the next.
15. Debtor owes the firm; creditor is owed by the firm. A voucher is documentary evidence of a transaction (examples: cash memo, receipt).

Unsure or for a second look: whether timeliness should sit inside relevance (point 6); whether the notes' definition of income should say it includes gains (point 12; the bank only asks for the standard contrast between a gain and revenue from the main activity).

## Originality
No NCERT text, illustration, example or exercise and no board or sample-paper item is reused. Every firm (Meera Traders, Kaveri Bakery, Anand Sports, Kiran Stores, Hiral Electronics, Ishaan Cycles, Vikram Cycles, Rizwan Hardware, Dhanpur Dairy and others), person and place is imagined and labelled as such in the problem.

## Gaps
- No narration audio (TTS needs OA-03).
