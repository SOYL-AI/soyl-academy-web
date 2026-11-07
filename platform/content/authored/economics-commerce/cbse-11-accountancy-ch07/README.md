# CBSE Class 11 Accountancy, Chapter 7: Depreciation, Provisions and Reserves

`cbse-11-accountancy-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 2: Accounting Process) · provenance `human`, author `claude (subject-producer)` · every item `status: "draft"`

Run `npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch07/src/build.mjs` from `platform/`. The build checks schema, pipeline lint, verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check, near-duplicate stems inside the bank, test disjointness and the editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` on any error). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 22 slides; 17 + 18 visuals; 4 + 4 checks; 3 + 5 worked examples), notes (7 sections), 33 flashcards, 79 questions (145 marks) with 12 passage children |
| `tests.json` | `_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`; disjoint, no deck-check item, no numerical item |
| `src/` | `extra.mjs` (chapter helpers: `fleet()` depreciates several assets year by year with part-year charges and builds the Machinery Account, the Provision for Depreciation Account, the Asset Disposal Account and the journal entries under both ways of recording; `compare()` for straight line against written down value; `allocate()` for provision then general reserve; all asserted), `figures.mjs` (computed, asserted figures: Rana Engineering, Dhruv Engineering, Asha Printers, Bhavani Looms, Chitra Packaging, Meena Foods), `qq.mjs` (registration and mark-scheme check), `q_obj.mjs`, `q_calc.mjs`, `q_cases.mjs`, `questions.mjs`, `build.mjs`; uses the shared `../../cbse-11-accountancy-ch01/src/lib.mjs` and `acc.mjs` unchanged |

## Scope

| Topic | Coverage |
|---|---|
| t01 Depreciation: meaning, causes and methods | Meaning; four features; four causes; five needs; four factors (cost, residual value, depreciable cost, useful life); straight line method (formula and rate on cost, merits, limits); written down value method (merits, limits); part-year charges; comparison of the two methods in a table and in a book-value line chart |
| t02 Recording depreciation; disposal of assets | Two ways of recording (charge to the asset account; provision for depreciation account with the asset at cost); journal entries for both; transfer to the Profit and Loss A/c; disposal of an asset (part-year depreciation to the date of sale, book value, profit or loss, Asset Disposal A/c); sale of part of the assets; addition of an asset during the year; Machinery A/c over three years under SLM and WDV (Asha Printers, Bhavani Looms); provision method with three accounts (Chitra Packaging) |
| t03 Provisions and reserves | Provision (meaning, examples: depreciation, doubtful debts, taxation, repairs; the provision for doubtful debts is only named, ch09 covers its adjustments); reserve; five differences; general, specific, capital and secret reserves; importance of reserves; a profit flow (Meena Foods) |

Four original SVGs (causes web, two ways of recording, book-value line chart of SLM against WDV drawn from `schedule()`, profit flow of a provision against a reserve) and two flow diagrams. No maps.

### Decks
- **Part 1 (t01), 21 slides:** meaning, features, causes web, need, factors (Rana Engineering), straight line method, worked example (five-year schedule), merits and limits, written down value method, worked example (Sunder Tools), merits and limits, worked example of a part-year purchase (Tilak Presses), comparison table, same-rate line chart, summary, tips. Checks: `m_dep_meaning`, `tf_noncash_chk`, `n_slm_annual`, `n_wdv3`.
- **Part 2 (t02 and t03), 22 slides:** two ways of recording, journal entries, working and Machinery A/c of Asha Printers with the sale, steps in the sale of an asset, written down value with a sale (Bhavani Looms), the three accounts of the provision method, Provision for Depreciation A/c and Asset Disposal A/c (Chitra Packaging), addition and part sale, provisions, profit flow chart, differences, types of reserves, importance of reserves, summary, tips. Checks: `m_prov_method`, `ord_sale_entries`, `fb_disposal`, `n_reserve`.
- Narration: at most 87 words (mean 62), amounts in words, no digits or symbols (the build enforces it).

### Question bank (79 items, 145 marks)

26 mcq, 5 assertion-reason (verdicts a, c, b, a, d), 3 true-false, 2 fill-blank, 2 match, 2 ordering, 12 numerical (every value a computed variable), 10 short 2-mark, 7 short 3-mark, 6 long 5-mark, 4 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). Long items: Machinery A/c under SLM over three years with a part-year purchase and the sale of one machine (Asha Printers), the same under WDV (Bhavani Looms), Machinery, Provision for Depreciation and Asset Disposal accounts (Chitra Packaging), an SLM against WDV comparison table (Rekha Engineering), and two theory items (provisions against reserves; causes and need of depreciation). Cases: Kavya Plastics (SLM, part-year purchase), Jyoti Foods (provision method, loss on sale), Lakshmi Foods (provision then general reserve), Vivek Fabricators (choice of method).

Competency: recall 6, understanding 35, application 31, analysis 6, evaluation 1 (48% application or above). Difficulty: d1 7, d2 34, d3 28, d4 9, d5 1. Topics: t01 30, t02 25, t03 16, t01+t02 7, t02+t03 1.

### Tests

- **Short (20 marks, 10 items):** A = `m_dep_cause_obs`, `m_entry_direct`, `m_prov_def`, `ar_noncash`; B = `s2_dep_meaning`, `s2_disposal_def`, `s3_entries_direct`; C = one of `l5_slm_ledger` / `l5_wdv_ledger`; D = `cb_slm`.
- **Long (40 marks, 22 items):** A = `m_dep_cause_legal`, `m_slm_amount`, `m_wdv_feature`, `m_wdv_suits`, `m_entry_prov`, `m_loss_sale`, `m_prov_reserve_diff`, `m_secret`, `ar_wdv_rate`, `ar_prov_profit`; B = `s2_causes`, `s2_two_ways`, one of `s2_secret` / `s2_wdv_merit`, `s3_entries_prov`, one of `s3_compare` / `s3_reserve_types`; C = `l5_prov`, one of `l5_compare` / `l5_prov_reserve`; D = `cb_prov`, `cb_reserve`.
- Deck checks (in no test): `m_dep_meaning`, `tf_noncash_chk`, `n_slm_annual`, `n_wdv3`, `m_prov_method`, `ord_sale_entries`, `fb_disposal`, `n_reserve`.

## How verified

Every figure is computed with the shared `acc.mjs` (`slm`, `schedule`, `onSale`, `ledger`, `journal`) and the chapter helpers in `extra.mjs`, and asserted with `same()`:
- each year, depreciation plus closing book value equals cost, and the opening book value of a year equals the closing book value of the year before;
- the Machinery A/c of the direct method closes (as `ledger()` "Balance c/d") at the book value found independently from the per-machine schedules;
- under the provision method, the Machinery A/c at cost closes at the cost of the machines in hand, the Provision for Depreciation A/c closes at the accumulated depreciation of those machines, and cost less provision equals the direct method's closing balance;
- the Asset Disposal A/c closes with a nil balance; the book value at sale (cost less accumulated depreciation) and the profit or loss on sale (sale proceeds less book value, `onSale()`) are the same in the Machinery A/c, the Asset Disposal A/c and the Provision A/c;
- every journal entry balances (`journal()`); the profit allocation (provision, then a per cent of net profit to general reserve) adds up;
- every amount in a stem, solution, table or narration comes from a computed variable, and tables in the decks and model answers are generated from the same computed objects.

The build ran clean (`NO ERRORS`, lint 0 errors and 0 warnings); `release.json` and `tests.json` were byte-identical across repeated builds; the near-duplicate scan reported 0 flags against the rest of the tree and the SVG check reported 0 issues.

## Facts for a reviewer

1. **Depreciation:** the decline in the book value of a fixed asset through use, the passage of time or obsolescence; in accounting, the allocation of the asset's depreciable cost over its useful life, charged against revenue. Described as a non-cash expense.
2. **Features (four):** decline in book value; applies to fixed assets; non-cash expense; charge against revenue.
3. **Causes (four):** wear and tear; expiry of legal rights (lease, patent, licence); obsolescence; abnormal factors (accident, fire, flood, theft).
4. **Need (five):** matching; true profit; true financial position; replacement funds; tax considerations. The tax point says only that depreciation is allowed in working out taxable profit "within the rules"; no section or rate is stated.
5. **Factors (four):** cost (price paid plus costs of making the asset ready for use); estimated residual value (net of selling costs, also scrap or salvage value); depreciable cost (cost less residual value); estimated useful life.
6. **Straight line method (fixed instalment):** (cost − residual value) ÷ life, equivalent to a fixed rate on original cost; equal charge each full year. Merits and limits are the usual textbook ones: simple, equal charge, can reach nil or the residual value; ignores rising repairs and the interest on money tied up.
7. **Written down value method (diminishing balance):** a rate on the opening book value; falling charge; book value never reaches nil; merits and limits as taught (more even total of depreciation and repairs; harder; late charges become very small).
8. **Part-year charge:** rate × months ÷ 12, from the date of purchase (or to the date of sale), counted in whole months; books close on 31 March. For an asset bought on the first of a month, months are counted from that date.
9. **Same rate, first year:** under both methods the first full-year charge is the same, because the opening book value equals the cost. The chapter uses this in the comparison.
10. **Two ways of recording:** (a) credit the asset account (asset at book value, one Machinery A/c); (b) credit a Provision for Depreciation (accumulated depreciation) A/c with the asset kept at cost. Entries: Depreciation A/c Dr. To Asset A/c, or To Provision for Depreciation A/c; then Profit and Loss A/c Dr. To Depreciation A/c.
11. **Sale of an asset, direct method:** the Machinery A/c is credited with the depreciation of the year (including the part-year on the machine sold), the sale proceeds and the loss on sale (or debited with the profit on sale); the balance carried down is the book value of the machines in hand. Some books use an asset disposal account even in the direct method; this chapter uses the account only with the provision method.
12. **Sale of an asset, provision method:** four entries (cost to Asset Disposal A/c; accumulated depreciation from the provision account; sale proceeds; profit or loss to the Profit and Loss A/c). The accumulated depreciation of the machine sold includes the part-year charge to the date of sale, which is passed through the Provision A/c by a separate entry on the date of sale.
13. **Profit on sale of an asset** is credited to the Profit and Loss A/c in the worked cases. A profit on the sale of a fixed asset is also described in t03 as a capital profit that may be kept in a capital reserve; please confirm that both statements may stand together.
14. **Sale of part of the assets and addition of an asset:** only the cost and depreciation of the part sold leave the accounts; an addition is depreciated from its date of purchase. Both are shown with the Asha Printers figures.
15. **Provision:** an amount charged against profit for a known liability or an expected loss whose amount cannot be determined exactly. Examples given: depreciation, doubtful debts, taxation, repairs. The provision for doubtful debts is named only; adjustments are left to ch09.
16. **Reserve:** a part of profit retained in the business, by appropriation, to strengthen it.
17. **Differences between provisions and reserves (five):** basic nature; effect on profit; presentation (provision deducted from an asset or shown among the liabilities, reserve with owners' funds); purpose; compulsion (a provision must be made even if there is no profit; a reserve needs profit and is by choice). Please confirm that "compulsion" matches the textbook's wording.
18. **Types of reserves:** revenue reserves (general reserve, specific reserve, for example dividend equalisation reserve); capital reserve (for example from the profit on sale of a fixed asset); secret reserve (not disclosed in the balance sheet; created by undervaluing assets or overvaluing liabilities). Company-law restrictions on reserves are not covered.
19. **Importance of reserves (four):** stronger position; meeting unexpected losses; expansion; even payouts.
20. **Land:** `ar_land` says freehold land is usually not depreciated because it does not wear out and its life is unlimited; mines, quarries and leasehold land are treated differently (the chapter's own lease examples are depreciated through expiry of legal rights).
21. **Account names and formats:** "Provision for Depreciation A/c" (also called accumulated depreciation), "Asset Disposal A/c" and "Depreciation A/c" are customary names, not prescribed. Ledger accounts use "To" and "By" lines with "Balance b/d" and "Balance c/d"; journal narrations are in brackets.
22. **Imagined data:** every firm, person and town is imagined; every amount is chosen to give whole rupees. No rate of goods and services tax appears in this chapter, and no depreciation rate is presented as a rate prescribed by any law.
23. **Unsure of:** whether a board expects the depreciation on the machine sold to be passed as a separate entry on the date of sale under the provision method (it is shown here); and whether the prescribed textbook gives the "Compulsion" row in its comparison of provisions and reserves.
