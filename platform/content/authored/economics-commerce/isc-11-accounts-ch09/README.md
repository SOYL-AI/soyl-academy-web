# ISC Class 11 Accounts, Chapter 9 — Depreciation

`isc-11-accounts-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accountancy (858), Class XI, Unit 5: Depreciation) · provenance `human`, author `claude-sonnet-5-5 (subject-producer chapter writer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032, D-050) on the pattern of the CBSE 11 Accountancy depreciation chapter (structure, helper style; depreciation part only, since provisions and reserves are ISC Chapter 11) and the ISC 12 Accounts chapters (ISC presentation, 1/2/3/5-mark tests). Built from `src/` (`npx tsx content/authored/economics-commerce/isc-11-accounts-ch09/src/build.mjs` from `platform/`).

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 22 slides), notes (8 sections), 31 flashcards, 72 questions (134 marks) |
| `tests.json` | `t_isc11accounts_ch09_short` (20 marks, 50 min) on `isc-11-default-chapter-test-short` and `t_isc11accounts_ch09_long` (40 marks, 100 min) on `isc-11-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared ISC 11 Accounts lib, copied unchanged), `acc.mjs` (accounting engine, copied unchanged), `dep.mjs` (this chapter's engine: exact month counting, fleet of assets, asset / provision / disposal accounts, comparison), `fig.mjs` (deck figures, stacked multi-year accounts), `decks.mjs`, `qq.mjs`, `questions.mjs`, `q_obj.mjs`, `q_calc.mjs`, `q_long.mjs`, `build.mjs` |

## Scope
All four syllabus topics. The removed topic (change of method from SLM to WDV or vice versa) is not examined anywhere in this chapter. GST is not touched (theory only in ISC Class XI). Provisions and reserves are Chapter 11 and are not used here (the "provision for depreciation" is the accumulated depreciation account of this chapter).
- **t01** (14 items) meaning, need and objectives, causes (wear and tear, passage of time, obsolescence, depletion), characteristics, factors (cost, life, residual value).
- **t02** (23 items) straight line (formula, rate from cost, scrap and life), written down value, part-year depreciation by exact months, advantages, limitations, differences, choice of method.
- **t03** (15 items) depreciation credited to the asset account against the provision for depreciation (accumulated depreciation) account: journal entries and ledger accounts over two to three years; balance sheet presentation.
- **t04** (20 items) additions during the year, sale of an asset, book value, profit or loss on sale, with the asset account alone (no disposal account) and with an Asset Disposal Account; sale of one asset out of two.

### Decks
- **Part 1 (t01–t02), 20 slides, 16 with visuals, 3 worked examples, 3 checks:** route map, meaning, need, causes, characteristics, factors, Tindivanam Tiles (straight line from cost, scrap and life), straight line, WDV, Pollachi Feeds (WDV four years), part-year months flow, Bhimavaram Fisheries (bought 1 August; both methods), Hubballi Hydraulics (same rate, two methods, five years), advantages and limitations, choice of method.
- **Part 2 (t03–t04), 22 slides, 18 with visuals, 5 worked problems over 11 example slides, 3 checks:** two ways of recording, Sivaganga Stationers (asset account, journal and three-year ledger), provision method steps, Nanded Nurseries (Machinery A/c at cost and the provision, three years), additions flow, Vizianagaram Vessels (plant added on 1 October of year 2), sale rules, Aizawl Appliances (WDV loss, no disposal account), the disposal account in four entries, Dindigul Dairies (profit on sale through the disposal account, the provision after the sale).
- No more than one slide in a row without a visual (the checks and the exam-tips slide carry none). Narration up to 88 words (mean 55), entirely in words (the build enforces this).

### Question bank (72 items, 134 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 20 | 1 | keys a5 b5 c5 d5; 2 are deck checks |
| assertion-reason | 6 | 1 | keys in bank order a c b d a b (ISC specimen options; (d) = both false) |
| true-false · fill-blank | 5 · 5 | 1 (two two-blank fill-blanks carry 2) | true-false: 2 true, 3 false; one true-false and one fill-blank in each deck check |
| numerical | 8 | 1 | annual charge, rate on cost, third-year WDV charge, part-year straight line, WDV after a part year, book value after three years, loss on sale, provision balance after a sale |
| short | 10 | 2 | meaning, rate from cost-scrap-life, direct against provision, reasons for charging, factors, WDV limitations, book value and loss on sale, part-year WDV, two journal entries, credits of the disposal account |
| short | 11 | 3 | causes, straight line schedule, WDV schedule, SLM against WDV, journal entries (asset credited), journal entries (provision), asset and provision accounts for two years, sale calculation, disposal account, sale journal, addition during the year |
| long | 7 | 5 | asset and provision accounts (WDV, three years), two machines with a part-year sale through the disposal account, asset account only with a sale at a profit, WDV with an addition and balance sheet extract, comparison of two methods with a recommendation, theory (obsolescence, depletion, factors), disposal account with a loss on sale |

- Difficulty d1/d2/d3/d4 = 5/25/32/10. Competency: recall 9, understanding 25, application 32, analysis 6 — **53% at application or above** (brief 45–60%, lint band 45–65%).
- **Producer review (Opus, 14 Nov 2026):** tags changed: `m_prov_sale` analysis d4 to understanding d3, `m_compare_total` analysis d4 to application d3, `ar_obsol` analysis d3 to understanding d2, `n_slm_annual` and `s2_direct_vs_prov` application to understanding (one-step formula, two standard entries), `s3_diff` analysis d3 to understanding d2 (restates the notes); `m_loss_effect` d3 to d2. Items fixed: `ar_prov` assertion now states that the firm keeps a provision account (it was undecidable without it); `l5_disp_loss` (e) journal now includes the depreciation on machine B up to the date of sale; `l5_prov_sale` machine Q changed to ₹3,00,000 sold for ₹1,75,000 (the old figures made Q's accumulated depreciation equal the year's total charge, so the provision showed 93,120 on both sides); Aizawl Appliances machine B changed to ₹1,60,000 sold for ₹1,00,000 (the old figures gave equal charges in years 1 and 2 and an opening balance equal to machine A's cost). Deck: the straight line limitations rewritten (two were not meaningful); the Vizianagaram working note column now reads old plant. Notes: the disposal-account section now starts with the depreciation to the date of sale. Firms renamed for clashes: Nashik Nuts to Neemuch Nuts (ch07, ch14), Gonda Gaskets to Gangapur Gaskets and Bhadravati Bearings to Bettiah Bearings (ch14).
- Written answers keep the full working in `answer.model_answer_md` (working notes, multi-year asset, provision and disposal accounts, journals and balance-sheet extracts as Markdown tables); `solution_md` is a short method note. Every marking step is a whole number of marks and the steps add up to the item.

### Tests (ISC class defaults, item for item; disjoint; no deck-check item; no case-based or numerical items)
- **Short (20 marks, 50 min):** A 4 MCQ (definition, WDV second-year charge, what the provision holds, result on sale) + 1 A-R (need); B meaning + (rate from cost-scrap-life | direct against provision); C straight line schedule + (journal entries, asset credited | book value and result on sale); D asset and provision accounts for three years.
- **Long (40 marks, 100 min):** A 10 MCQ + 2 A-R (WDV against straight line; the cost left in the Machinery A/c); B reasons for charging, factors + (WDV limitations | book value and loss on sale); C causes, WDV schedule, journal entries with provision + (asset and provision accounts | disposal account); D two machines with a part-year sale through the disposal account + (asset account only with a sale at a profit | WDV with an addition).
- Each test spans t01 to t04.

## Verifier record (what the build computes and asserts)
`src/dep.mjs` (on top of `src/acc.mjs` `slm`, `schedule`, `onSale`, `ledger`, `journal`) computes every amount from the givens; deck and answer tables are generated from the results, so no figure is typed twice. Key figures are also pinned beside the item.
- **Months:** counted exactly from the dates by `monthsBetween` (a purchase on the 1st of a month; a sale on the 1st or the last day of a month), e.g. 1 August 2026 to 31 March 2027 = 8; any other day of the month is refused.
- **Schedules:** every yearly charge is a whole rupee; WDV charge in a full year = rate × opening book value (asserted); the opening book value of each year equals the previous closing; depreciation + book value left + book value of the asset sold = cost.
- **Accounts:** the asset account charged directly closes at the computed book value; the asset account at cost closes at the cost of the assets held; the Provision for Depreciation A/c closes at the accumulated depreciation of the assets held; cost less provision equals the book value found by the direct method; every account closes with c/d and b/d.
- **Sale:** book value on sale = cost − accumulated depreciation; profit or loss = sale price − book value and is the same in the asset account, the disposal account and the journal; the Asset Disposal A/c closes at nil.
- **Journals:** every entry has equal debits and credits.
- Key figures: Tindivanam ₹1,20,000 (15% on cost); Pollachi ₹1,60,000, 1,20,000, 90,000, 67,500; Bhimavaram ₹24,000 (8 months), then ₹36,000 and ₹33,600; Hubballi WDV total ₹4,20,200 against ₹6,25,000; Nanded provision ₹1,85,220 and book value ₹2,94,780; Vizianagaram ₹32,000, 40,000, 48,000; Aizawl loss ₹9,440 (book value ₹1,09,440); Dindigul profit ₹15,000 (book value ₹2,10,000); Chikmagalur loss ₹8,600 (book value ₹1,83,600).
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems inside the bank; test disjointness, no deck-check item in a test, and marks (20 and 40); whole-number marking steps.

## Flagged treatments (double-check)
- **Part-year depreciation** is by whole months (1/12 of the annual charge per month), with a purchase on the 1st of a month and a sale on the 1st or the last day; a purchase or sale in the middle of a month is not set.
- **WDV rounding:** figures are chosen so every charge is a whole rupee; the working shows rate × opening book value without rounding.
- **Sale in the year of purchase** is not set (the engine refuses it).
- **Depreciation on an asset sold** is charged up to the date of sale and, in the provision method, credited to the provision before the accumulated depreciation is transferred to the Asset Disposal A/c (the journal entries show both steps).
- **Direct method sale (no disposal account):** the sale proceeds and the profit or loss appear in the asset account itself, as in the CBSE 11 treatment; the profit or loss goes to the Profit and Loss A/c.
- **"Provision for depreciation"** here means the accumulated depreciation account of the ISC syllabus wording; it is a deduction from the asset, not a liability.
- **Rate of the straight line method** is stated on cost (items with a neat percentage), never on cost less scrap.
- **Land** is stated as normally not depreciated.

## Originality
No ISC or CBSE textbook illustration, exercise or wording (including T.S. Grewal and D.K. Goel) and no CISCE specimen or board item is reused; official documents defined pattern and scope only. Every firm (Tindivanam Tiles, Pollachi Feeds, Bhimavaram Fisheries, Hubballi Hydraulics, Sivaganga Stationers, Nanded Nurseries, Vizianagaram Vessels, Aizawl Appliances, Dindigul Dairies, Chikmagalur Cutters and the others) and figure was written for this chapter and is labelled imagined. Avoided, from the CBSE 11 depreciation chapter: Rana Engineering, Asha Printers, Bhavani Looms, Chitra Packaging, Meena Foods, Dhruv Engineering, their ₹4,00,000 and ₹2,40,000 machines, the 1 October 2025 / 1 January 2028 dates, the ₹5,00,000 twenty per cent five-year comparison (this chapter uses ₹6,25,000) and the ₹3,00,000 and ₹1,60,000 written down value pair. Years differ (2026-27 onward), assets include furniture, plant, vans and a cold room, and the rates (6%, 10%, 12%, 15%, 20%) are set against different bases.

## Gaps
- No case-based items; objective items carry the theory and written items the computation.
- No narration audio (TTS needs OA-03).
- The stacked three-year ledger tables have up to 40 rows; check them at 360 px on staging.
- The removed topic (change of method) has no item, slide or note.
