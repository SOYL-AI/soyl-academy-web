# ISC Class 12 Economics, Chapter 13 — Money and Inflation

`isc-12-economics-ch13` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 12 Economics pattern set by ch01–ch12. To build it, run `npx tsx content/authored/economics-commerce/isc-12-economics-ch13/src/build.mjs` from `platform/`. It uses the shared lib `isc-12-economics-ch01/src/lib.mjs`, imported rather than copied. Edit `src/`, not the JSON.

The build checks:
- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the exact-stem originality pre-check against every authored chapter.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 18 slides with 28 visuals (4 SVG figures; the rest tables and flows); 6 notes sections; 30 flashcards; 77 questions worth 162 marks |
| `tests.json` | `t_isc12economics_ch13_short` (20 marks, 50 min) and `t_isc12economics_ch13_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`. Both follow their blueprint item for item, including the internal-choice groups. The tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the imagined price data and the price-index helpers, with asserts) and `build.mjs` (decks, SVGs, notes, cards and tests) |

## Scope (ISC 2027 syllabus)

All four topics are covered:
- **t01** meaning and kinds of money: barter and its difficulties; commodity, metallic (full-bodied and token), paper and credit money; legal tender (limited and unlimited), fiat money, optional money and near money
- **t02** functions of money: primary (medium of exchange, measure of value), secondary (standard of deferred payments, store of value, transfer of value) and contingent (basis of credit, distribution of national income, equalising marginal utilities, liquidity, guarantor of solvency)
- **t03** money supply: its meaning as a stock held by the public, and the meanings of M0 (reserve, high-powered money), M1, M2, M3 and M4, narrow and broad money, and their order of liquidity
- **t04** inflation: its meaning and measurement with a price index (rate of inflation, purchasing power, real value), demand-pull and cost-push inflation (wage-push, profit-push, input costs, indirect taxes)

**Removed topics respected:**
- **Money-supply measures beyond their meaning:** no item calculates an aggregate; items only define, classify or rank the measures.
- **Diagrams of demand-pull and cost-push inflation:** none are drawn or asked for. Both are explained in words, flows and tables, and the exam tips say no diagram is needed.

The money-supply definitions are the classic RBI measures as studied for ISC:
- M1 = currency with the public + demand deposits + other deposits with the RBI
- M2 = M1 + savings deposits with post office savings banks
- M3 = M1 + net time deposits of banks
- M4 = M3 + total post office savings deposits, excluding National Savings Certificates
- M0 = currency in circulation + bankers' deposits with the RBI + other deposits with the RBI

### Decks

- **Part 1** (meaning, kinds and functions of money, t01–t02): 18 slides, 4 checks (`m_limited_tender`, `m_near_money_eg`, `fb_store`, `m_contingent`).
  - SVG: the functions-of-money tree.
  - Worked examples: classifying a family's holdings as money or near money, and matching events at a dairy cooperative to functions.
- **Part 2** (money supply and inflation, t03–t04): 18 slides, 4 checks (`m_liquidity_order`, `m_money_held_public`, `n_infl_sonapur`, `m_profit_push`).
  - SVGs: a schematic liquidity ladder (order only), Sonapur price-index bars, and the purchasing-power curve 100 ÷ index.
  - Worked examples: placing holdings in the narrowest measure, and Sonapur's inflation rates.
- **Narration:** at most 66 words per slide (mean 43). It has no symbols and no measure names like "M1"; it says "narrow money".

### Question bank (77 items)

| Type | Count |
|---|---|
| mcq | 26 (keys a7 b7 c6 d6) |
| assertion-reason | 6, ISC options with (d) "both false" (keys a b a c d a) |
| true-false | 3 |
| fill-blank | 3 |
| numerical | 5 (inflation rate, purchasing power, basket rise, real salary, a second rate) |
| match | 1 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 9 |
| long 5-mark | 6, set in parts |
| ISC paper-style 4-mark (2 + 2), bank only | 3 |
| ISC paper-style 8-mark (4 + 4), bank only | 2 |
| case-based | 3 (Arunachal hill-village diary, Madurai post office conversation, Sonapur price report), each with an internal choice in part (c) |

- **Difficulty:** d1 11, d2 38, d3 24, d4 4.
- **Competency:** recall 7, understanding 28, application 25, analysis 15, evaluation 2. That puts 55% of items at application or above (lint band 45–65%).
- **Retagging:** one-step index calculations are tagged understanding under the D-035 rule; scenario identifications are tagged application.

## Data and facts

Every figure is imagined, computed in `questions.mjs` and asserted:
- **Sonapur price index:** 125, 135, 148.5, giving inflation of 8% and then 10%. The purchasing power of ₹1 at index 125 is ₹0.8.
- **Meghpur basket:** ₹4,000 rising to ₹4,600 gives index 115, a 15% rise. A salary of ₹46,000 is worth ₹40,000 in base-year rupees.
- **Other items:** 160 → 172 is 7.5%; 250 → 270 is 8%; purchasing power at index 200 is ₹0.5.

No current inflation, money-supply or policy statistics are stated. No textbook example, specimen-paper item or past-paper item is reused, and the set-ups differ from SOYL's CBSE 12 Economics ch02 (Money and Banking).

## Checks run on this chapter

- **Build:** NO ERRORS, with lint at 0 errors and 0 warnings.
- **Rebuild:** byte-identical `release.json` and `tests.json`.
- **Duplicates:** the 5-gram near-duplicate scan, using the originality gate's rule (77 stems against 21,558 others), finds 0 flags.
- **SVG labels:** 0 overflow or overlap issues in the 4 figures.

## For a reviewer

- **Classic definitions:** the M0–M4 definitions follow the classic RBI measures used in ISC textbooks. The RBI's newer monetary aggregates are not taught, because the syllabus names M0–M4.
- **Coin limits:** limited legal tender is described without stating rupee limits for coins.
- **AR keys:**
  - `ar_barter_coinc` is keyed (b): durability does not explain the end of the double coincidence.
  - `ar_m3_liquid` is keyed (c).
  - `ar_m1_postoffice` is keyed (d), both false.
- **Units:** `n_purch_power` uses the unit ₹ for purchasing power in base-year rupees.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging, especially the three-column functions tree.
