# CBSE Class 12 Accountancy, Chapter 1 — Accounting for Partnership: Basic Concepts

`cbse-12-accountancy-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A, Unit 1: Accounting for Partnership Firms) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch01/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 21 slides), notes (7 sections), 32 flashcards, 73 questions (147 marks) |
| `tests.json` | `t_cbse12accountancy_ch01_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch01_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared authoring lib, copied unchanged from the CBSE 12 Economics chapters except its header), `acc.mjs` (accounting helpers and assertions), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests, extra gates) |

## Scope
All six syllabus topics: t01 nature of partnership, the deed and the Act's rules when the deed is silent (11 items, plus 2 tagged t01+t03) · t02 fixed and fluctuating capitals, capital and current accounts, opening capital worked back (7, plus 2 tagged t02+t03) · t03 Profit and Loss Appropriation Account: charge vs appropriation, interest on capital (additions, insufficient profit, loss, charge), interest on drawings (average period and product method), salary, commission before and after charging, reserve (19) · t04 guarantee of minimum profit by the firm, by one partner, by two partners in an agreed ratio, and a guarantee given to the firm (8) · t05 past adjustments with a should-be/actual table whose net effect is zero and one entry (6) · t06 goodwill: nature, Accounting Standard 26, factors, average profit, weighted average, super profit, capitalisation of average and of super profit, capital employed (18). The syllabus lists no removed topics for this chapter; the annuity method is not taught (not in the 2026-27 syllabus).

### Decks
- **Part 1 (t01–t03), 21 slides, 16 with visuals:** features of partnership (an imagined dairy), deed clauses, rules when the deed is silent (with a 6% loan worked), fixed vs fluctuating capitals, where each item goes, charge vs appropriation, the appropriation account format, interest-on-capital rules, average periods, salary and commission. **Worked examples:** Tulsi Traders current accounts (divisible ₹93,500; balances ₹44,100 and ₹85,900); Neelgiri Tea House interest on capital with an addition when profit (₹31,800) is short, as appropriation and as charge; one ₹60,000 drawn at five timings (interest ₹1,950 … ₹1,350); Saraswati Prints full appropriation account (commission after charging ₹30,000, divisible ₹1,89,000). Four checks.
- **Part 2 (t04–t06), 21 slides, 16 with visuals:** the guarantee flow, Konark Tiles guarantee by the firm and by Dev alone (SVG bar chart of the three cases), a guarantee to the firm, past adjustments (flow), Godavari Traders omitted interest on capital and drawings (table and entry), goodwill nature and factors, methods. **Worked examples:** guarantee by the firm; by one partner; past-adjustment table; its entry; Malabar Boatworks average (₹5,47,500) and weighted average (₹5,67,000) goodwill, with a plot of normal profits and both averages; super profit (₹1,72,500); both capitalisation methods (₹4,60,000 each). Four checks.
- Visuals: 24 tables, 6 flows, 1 SVG, 1 plot. Narration up to 83 words (mean 59), written entirely in words: no digits, rupee sign, symbols or abbreviations (the build enforces this).

### Question bank (73 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 20 | 1 | keys a5 b5 c5 d5; includes commission before charging, normal profit, weighted average, a partner's guarantee |
| assertion-reason | 9 | 1 | keys a3 b2 c2 d2 |
| numerical | 9 | 1 | interest on drawings (middle of month, product method), commission after charging, interest on capital with an addition, guarantee deficiency, past adjustment, goodwill by average, super profit and capitalisation |
| true-false · fill-blank · match | 5 · 4 · 3 | 1 · 1 · 2 | T/F 3 true, 2 false |
| short | 10 | 3 | settling claims without a deed, deed contents, opening capital, insufficient profit (6:5:2), quarterly drawings, P&L vs appropriation, guarantee by two partners, wrong ratio plus omitted salary, factors of goodwill, weighted average goodwill |
| long | 7 | 4 | features, appropriation account, interest as appropriation vs charge vs loss, guarantee by the firm with interest on capital, omitted interest past adjustment, goodwill with abnormal items and a fair partner salary, super profit with capital employed |
| long | 6 | 6 | current accounts (fixed), capital accounts (fluctuating), three-partner appropriation with a partner's loan and commission after charging, two guarantees (to the firm and to a partner), a multi-error past adjustment, capital employed and both capitalisation methods |

- Difficulty d1/d2/d3/d4/d5 = 12/34/19/5/3. Competency: recall 9, understanding 23, application 28, analysis 13 — **56% at application or above** (lint band 45–65%).
- Written answers keep the full working in `answer.model_answer_md`: journal entries, ledger and columnar capital/current accounts and appropriation accounts as Markdown tables, working notes; `solution_md` is a one-line method note. Marking schemes have step marks that the build checks add up to each item's marks.
- **Tests** are disjoint and use no deck-check item (the build asserts both). Short = A 3 MCQ + 1 A-R; B 2 × 3-mark; C one of two 4-mark (appropriation account | super profit goodwill); D one of two 6-mark (current accounts | two guarantees). Long = A 6 MCQ + 2 A-R; B 3 × 3-mark + (quarterly drawings | goodwill factors); C interest as appropriation/charge + (guarantee by the firm | omitted interest); D three-partner appropriation + (multi-error past adjustment | capitalisation).

## Verifier record (what the build computes and asserts)
`src/acc.mjs` computes every amount from the givens and throws on any mismatch; deck and answer tables are generated from these results, so no figure is typed twice.
- **Journal entries:** total debits equal total credits in every entry.
- **Accounts:** every two-sided account (appropriation accounts must agree without a balancing figure) and every columnar capital/current account closes, with debit or credit balances carried down on the correct side; per-partner totals asserted.
- **Shares:** every division of profit, loss, deficiency or reversal must be whole rupees and add up to the amount divided.
- **Interest:** simple interest by months; the average-period table (6½/6/5½, 7½/6/4½, 9/6/3) is re-derived from its formula; product method; commission before and after charging.
- **Past adjustments:** the net effects of all partners total zero, and the entry is built from them.
- **Goodwill:** normalised profits, simple and weighted averages, normal and super profit, capitalised value; capitalisation of average profit and of super profit are asserted equal.
- Every key figure is also asserted against the value worked out by hand (e.g. Rhea ₹1,06,680 and Sameer ₹92,320; Gauri ₹4,99,220 and Manav ₹3,27,780; Aditi, Bhavesh, Charu divisible ₹2,48,150; Asha +₹28,000, Bilal −₹11,300, Chitra −₹16,700; goodwill ₹1,00,000 both ways in `l6_gw_cap`).
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems inside the bank (the stage-6 5-gram Jaccard measure; none at 0.5 or above); test disjointness and marks (20 and 40).

## Facts a reviewer should double-check
- **Act defaults** (when the deed is silent): equal sharing, no interest on capital, no interest on drawings, no salary or commission, 6% a year on partners' loans as a charge.
- **Maximum partners: 50** (Companies Act, 2013 with Rule 10 of the Companies (Miscellaneous) Rules, 2014), used in `m_maxpartners`, the features table and notes.
- **Interest on capital** treated as an appropriation unless the deed calls it a charge (profit short → shared in the ratio of interest due; loss → none); interest on a partner's loan is always a charge.
- **Guarantee to the firm** (`l6_guar_combo`, Part 2 slide 6): the guarantor's capital is debited with the shortfall and the Profit and Loss Appropriation Account credited; the guaranteed profit is then divided among all partners. In `l6_guar_combo` the partner-to-partner deficiency is shown inside the distribution entry and the appropriation account (final shares), not as a separate entry.
- **Capital employed** excludes goodwill already in the books and fictitious assets.

## Originality
No NCERT illustration, exercise or wording and no CBSE sample-paper or board item is reused; official documents defined pattern and scope only. Every firm (Tulsi Traders, Neelgiri Tea House, Saraswati Prints, Konark Tiles, Godavari Traders, Malabar Boatworks and the firms in the bank), partner and figure is imagined and labelled as such. The Act's definition of partnership is paraphrased, not quoted.

## Gaps
- No case-based items (optional for this brief); objective items carry the theory, written items the computation.
- No narration audio (TTS needs OA-03).
- Columnar capital-account tables have six columns; check them at 360 px on staging.
- The SVG guarantee chart places labels by pixel coordinates; check it in both themes.
