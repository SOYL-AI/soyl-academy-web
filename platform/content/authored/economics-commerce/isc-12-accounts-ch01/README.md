# ISC Class 12 Accounts, Chapter 1 — Fundamentals of Partnership

`isc-12-accounts-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accountancy (858), Section A, Unit 1: Partnership Accounts) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Accountancy chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-12-accounts-ch01/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 22 slides), notes (7 sections), 31 flashcards, 88 questions (169 marks) |
| `tests.json` | `t_isc12accounts_ch01_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12accounts_ch01_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared authoring lib, copied unchanged from the CBSE 12 Economics chapters except its header), `acc.mjs` (accounting engine and assertions), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests, extra gates) |

## Scope
All seven syllabus topics, following the ISC 2027 Accountancy syllabus rather than the CBSE chapter (goodwill is ISC ch02 and is not taught here):
- **t01** partnership (Section 4), features, and the Act's provisions on accounts and rights: true accounts (Section 9), taking part, majority decisions and the right to inspect and copy the books (Section 12) — 9 items.
- **t02** the deed, and Section 13 when it is silent (equal sharing, no remuneration, no interest on capital and, where agreed, only out of profits, no interest on drawings, 6% on advances as a charge) — 9 items.
- **t03** fixed and fluctuating capitals, current accounts, **interest on opening current-account balances** (allowed on credit, charged on debit), opening capital worked back — 9 items, plus 3 shared.
- **t04** Profit and Loss Appropriation Account: interest on capital with additions and withdrawals, profit short, loss year, interest as a charge; partner's salary; **partner's vs manager's commission** (before and after charging); reserve — 20 items, plus 5 shared.
- **t05** charges against profit (interest on a partner's loan, rent to a partner, manager's commission) through a **Profit and Loss Adjustment Account**; interest on drawings by the product method and by the average period (whole-year table and part-year (first + last) ÷ 2, cross-checked against the product method) — 16 items, plus 2 shared.
- **t06** guarantee of profits by the firm, by one partner, by two partners in an agreed ratio different from their profit ratio, after interest and salary, and in a loss year — 8 items, plus 2 shared.
- **t07** past adjustments: omitted interest on capital, salary, interest on drawings, wrong interest rate, wrong profit-sharing ratio, combinations, opening capitals worked back, adjusted capital accounts — 10 items, plus 1 shared.
- Removed topic (admission of a manager as a partner in guarantee and past-adjustment problems) appears only as one "not in the ISC 2027 syllabus" line in notes section 7.

### Decks
- **Part 1 (t01–t04), 22 slides, 17 with visuals:** features (an imagined bamboo-furniture firm in Kohima), the Act on books and rights, the deed, Section 13 defaults, fixed vs fluctuating, where each item goes, interest on current balances, appropriation format, interest-on-capital rules, partner vs manager commission. **Worked examples:** Kannauj Attar House claims with no deed (loan interest ₹5,400 for 9 months; ₹80,000 each); Bhagalpur Silk House current accounts with interest on current balances (divisible ₹1,08,050; balances ₹82,280 and ₹57,720); Majuli Mask Studio interest with an addition and a withdrawal when profit (₹44,800) is short, in a loss year and as a charge; Kollam Cashew Works manager's commission after charging (₹42,000) then a full appropriation account (divisible ₹2,54,400). Four checks.
- **Part 2 (t05–t07), 22 slides, 17 with visuals:** charge vs appropriation, Firozabad Glassworks Profit and Loss Adjustment then Appropriation (net ₹2,44,000), average-period table, an SVG of why monthly drawings average 6½ months, Bhadohi Carpet House product method (₹1,740) and a part-year average period agreeing with the product method (₹700), the guarantee flow, Makrana Marble Craft guarantee by two partners 3:1 vs by the firm (table and SVG bar chart), Kalimpong Orchid Nursery guarantee after interest on capital by one partner, Tezpur Tea Brokers omitted interest and salary with the entry and adjusted capitals, Aizawl Bamboo Crafts wrong ratio. Four checks.
- Deck visuals: 27 tables, 5 flows, 2 SVGs (51 tables across decks, notes and answers in the release). Narration up to 80 words (mean 54), entirely in words: no digits, rupee sign, symbols or abbreviations (the build enforces this).

### Question bank (88 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 23 | 1 | keys a6 b5 c6 d6; 4 are deck checks |
| assertion-reason | 9 | 1 | keys a3 b2 c2 d2 (CBSE-style option (d) "A false, R true", as in the shared lib) |
| numerical | 9 | 1 | closing capital, interest on capital with a withdrawal, partner's commission after a manager's, commission after charging, divisible profit, product method, part-year average period, guarantee in an agreed ratio, past adjustment |
| true-false · fill-blank · match | 7 · 5 · 2 | 1 · 1 · 2 | T/F 3 true, 4 false |
| short | 11 | 2 | partner or lender, Sections 9 and 12, why a deed, fixed vs fluctuating, manager's commission, profit short of interest, charge vs appropriation, quarterly drawings, why 6½ months, guarantee by one partner, wrong ratio |
| short | 11 | 3 | claims without a deed, deed clauses, opening capitals, interest with addition and withdrawal, appropriation vs charge, small appropriation account, product method, Profit and Loss Adjustment, guarantee by the firm after interest, omitted interest and salary, wrong rate plus omitted interest on drawings |
| long | 9 | 5 | five features, full no-deed settlement, current accounts with interest on current balances, manager plus full appropriation, three interest-on-capital cases, charges plus appropriation, guarantee by two partners after interest and salary, guarantee over three years including a loss, multi-error past adjustment with adjusted capitals |
| long | 2 | 6 | practice only: fluctuating capitals with addition, withdrawal, three interest-on-drawings methods and reserve; past adjustment with opening capitals worked back |

- Difficulty d1/d2/d3/d4/d5 = 22/33/25/7/1. Competency: recall 12, understanding 24, application 38, analysis 14 — **59% at application or above** (brief 45–60%, lint band 45–65%).
- Written answers keep the full working in `answer.model_answer_md` (journal entries, Profit and Loss Adjustment and Appropriation Accounts, columnar capital/current accounts and past-adjustment tables as Markdown tables); `solution_md` is a one-line method note. Every marking step is a whole number of marks and the steps add up to the item's marks (the build checks both).

### Tests (ISC class defaults, item for item; disjoint; no deck-check item)
- **Short (20 marks, 50 min):** A 4 MCQ + 1 A-R; B `s2_insuff` + (quarterly drawings | guarantee by one partner); C claims without a deed + (small appropriation account | omitted interest and salary); D manager plus full appropriation account.
- **Long (40 marks, 100 min):** A 10 MCQ + 2 A-R; B partner-or-lender, manager's commission + (why 6½ months | wrong ratio); C opening capitals, interest with addition and withdrawal, Profit and Loss Adjustment + (guarantee by the firm after interest | wrong rate and omitted interest on drawings); D charges plus appropriation + (guarantee by two partners | multi-error past adjustment).
- **Blueprint fit:** the 2/3/5-mark default fits this chapter reasonably. A full ISC practical (appropriation account plus capital or current accounts) usually carries 6–8 marks, so 5-mark items are trimmed to one or two accounts each; the two fuller problems are 6-mark practice items outside the tests.

## Verifier record (what the build computes and asserts)
`src/acc.mjs` computes every amount from the givens and throws on any mismatch; deck and answer tables are generated from these results, so no figure is typed twice.
- **Journal entries:** total debits equal total credits in every entry.
- **Accounts:** every Profit and Loss Adjustment and Appropriation Account agrees without a balancing figure; every columnar capital or current account closes with balances carried down on the correct side.
- **Shares:** every division of profit, loss, deficiency or reversal is whole rupees and adds up to the amount divided.
- **Interest:** simple interest by months (whole rupees asserted); the average-period table re-derived from its formula; part-year average periods cross-checked against the product method; commission after charging is asserted to equal the rate on what remains.
- **Guarantees:** the total profit (or loss) is unchanged and the guaranteed partner receives at least the minimum, including in a loss year.
- **Past adjustments:** net effects total nil, and the entry is built from them.
- Key figures are pinned to hand-worked values (e.g. Eshwar ₹82,280 and Jasleen ₹57,720; Kollam divisible ₹2,54,400; Makrana Akshara ₹1,66,500; Tezpur net −₹12,000, −₹2,000, +₹14,000; Ela, Madhavi, Ranjit capitals ₹6,48,622, ₹4,47,492, ₹2,06,686; Ameya −₹7,920, Bhargavi +₹16,080).
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems inside the bank (none at 0.5 or above); test disjointness, no deck-check item in a test, and marks (20 and 40); whole-number marking steps.

## Facts a reviewer should double-check
- **Section 13 defaults** (deed silent): equal sharing; no remuneration; interest on capital not allowed, and where agreed payable only out of profits; no interest on drawings; 6% a year on a partner's advance, as a charge.
- **Section 12(d)** right of every partner to have access to, inspect and copy the books; **Section 9** duty to render true accounts; Section 12 majority rule and consent of all to change the nature of business.
- **Interest on current balances** is treated through the Profit and Loss Appropriation Account (credit balance like interest on capital, debit balance like interest on drawings), as the deed provides.
- **Manager's commission** is a charge (Profit and Loss or Profit and Loss Adjustment Account); a partner's commission is an appropriation.
- **Guarantee in a loss year:** treated as absolute (deficiency = minimum + share of loss); `l5_guar_years` (c) and `tf_guar_loss` rely on this.
- **Maximum partners: 50** (Companies Act, 2013 with Rule 10 of the Companies (Miscellaneous) Rules, 2014).

## Originality
No ISC or CBSE textbook illustration, exercise or wording (including T.S. Grewal and D.K. Goel) and no CISCE specimen or board item is reused; official documents defined pattern and scope only. Every firm (Kannauj Attar House, Bhagalpur Silk House, Majuli Mask Studio, Kollam Cashew Works, Firozabad Glassworks, Bhadohi Carpet House, Makrana Marble Craft, Kalimpong Orchid Nursery, Tezpur Tea Brokers, Aizawl Bamboo Crafts and the firms in the bank), partner and figure is imagined and labelled as such. Partner names and places were checked against the CBSE 12 Accountancy chapters so none is reused. Every stem names its own firm, account or concept. The Act's provisions are paraphrased, not quoted.

## Gaps
- No case-based items; objective items carry the theory and written items the computation.
- No narration audio (TTS needs OA-03).
- Columnar capital and current-account tables have up to eight columns; check them at 360 px on staging.
- The two SVGs place labels by pixel coordinates; check both themes.
- Assertion-reason option (d) follows the shared lib ("A is false, but R is true"); the ISC Biology chapter uses "both false". Both (d)-keyed items here (`ar_fluct`, `ar_guar_total`) have A false and R true, so neither reading changes a key.
