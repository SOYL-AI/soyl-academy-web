# ISC Class 12 Economics, Chapter 20 — Measurement of National Income

`isc-12-economics-ch20` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 2027 Economics pattern (`catalog/sources/cisce.md`, entry `isc-2027-specimen-856-economics`). It is built from `src/`: run `npx tsx content/authored/economics-commerce/isc-12-economics-ch20/src/build.mjs` from `platform/`. The build uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`, which it does not copy or edit. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits and narration rules;
- runs the answer-leak scan and the exact-stem originality pre-check;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 17 slides with 24 visuals (1 SVG figure, tables and flows); 6 notes sections; 30 flashcards; 72 questions worth 152 marks, including 9 case parts |
| `tests.json` | `t_isc12economics_ch20_short` (20 marks, 50 min) and `t_isc12economics_ch20_long` (40 marks, 100 min), on `isc-12-default-chapter-test-short` and `-long` |
| `src/` | `questions.mjs` (the bank and every computed figure, with asserts) and `build.mjs` (decks, the SVG figure, notes, flashcards, tests) |

Both tests follow their blueprint item for item, including the internal-choice groups. They share no items and use no deck-check item.

## Scope

All four syllabus topics are covered:
- **t01** the value-added (product) method: value of output, change in stock, intermediate consumption, gross and net value added, double counting and the two ways to avoid it
- **t02** the income method: compensation of employees (cash, kind, employer social security contributions), operating surplus (rent, interest, profit and its three parts), mixed income, steps of the method
- **t03** the expenditure method: private and government final consumption, gross domestic capital formation (with change in stock), net exports, adjustment to national income, steps of the method
- **t04** precautions for each method (transfers, second-hand goods and commissions, financial assets and brokerage, imputed rent, self-consumption, windfall gains, payments in kind, repayable staff loans) and the difficulties of measuring national income in India

Aggregates and their conversions belong to ch19; here they are used only to finish a method (for example GDP at market price to national income).

### Decks

- **Part 1** (17 slides, t01–t02): 4 check slides (`m_double_mandya`, `n_pump_gva`, `m_kind`, `n_konark_profit`) and 3 worked examples (Pune pump maker to net value added at factor cost; the four-firm Vidarbha cotton chain; Suvarnagiri national income by the income method).
- **Part 2** (17 slides, t03–t04): 4 check slides (`m_exp_tamra`, `n_tamra_gdcf`, `mt_treatment`, `tf_windfall`) and 2 worked examples (Tamrapatna from final spending to national income; sorting the Shivgarh mixed list).
- **SVG figure**, built from code: three stacked bars for the Mandya sweets chain showing value added, factor incomes and final spending all equal to ₹800 crore.
- Narration is at most 77 words per slide (mean 45), with no symbols or abbreviations.

### Question bank (72 items)

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| assertion-reason | 5, ISC options with (d) "both false" (keys a, a, d, b, c) |
| true-false | 3 |
| fill-blank | 2 |
| numerical | 6 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 8 |
| short 3-mark | 9 |
| long 5-mark | 5, set in parts |
| 4-mark, ISC paper style (2 + 2), bank only | 3 |
| 8-mark, ISC paper style (4 + 4), bank only | 2 |
| case-based, each with an internal choice in part (c) | 3 |

- **Difficulty:** d1 8, d2 33, d3 26, d4 5.
- **Competency:** recall 4, understanding 27, application 30, analysis 9, evaluation 2. That puts 57% of items at application or above (lint band 45–65%). Three routine classification items (`m_pfce_eg`, `m_exp_exclude`, `m_imputed_rent`) were tagged understanding under D-035.

## Data and facts

- **Imagined figures, computed and asserted in `questions.mjs`:**
  - Mandya sweets chain (₹ crore): sales 300, 500, 800; value added 300 + 200 + 300 = 800 = factor incomes 450 + 60 + 90 + 200 = final spending 800; sum of sales 1,600.
  - Vidarbha cotton chain (₹ lakh): values of output 400, 680, 980, 1,550; value added 340 + 280 + 330 + 550 = 1,500 (sum of outputs 3,610). Garment unit: net indirect taxes 45 − 15 = 30, net value added at factor cost 550 − 40 − 30 = 480.
  - Pune pump maker (₹ lakh): value of output 2,300; inputs 1,300 (the 300 machine left out); GVA 1,000; NVA at factor cost 850.
  - Suvarnagiri (₹ crore): compensation of employees 1,590; profit 520; operating surplus 890; domestic income 3,090; national income 3,115. Interest on national debt, scholarships and interest-free staff loans left out.
  - Konark: profit as the remainder, 460. Tamrapatna: capital formation 780, net exports −50, GDP at market price 4,580, GNP at market price 4,545, national income 4,105. Kavalpur: GDP at market price 2,760, national income 2,520. Shivgarh: GDP at market price 1,480.
- **Real facts:** none beyond standard textbook conventions; no statistics.
- **Originality:** every economy, firm and case is imagined and labelled as such. Set-ups and numbers differ from SOYL CBSE 12 Economics ch01 and from the ISC 2027 specimen's expenditure (GNPmp/NI) and income-from-entrepreneurship tables. No textbook, specimen or past-paper item is reused (D-036).

## For a reviewer

- **Conventions taught:** interest on national debt is a transfer (excluded); employer contributions to social security and payments in kind are compensation of employees; an interest-free loan to staff is not income; imputed rent and production for self-consumption are included; commissions on second-hand goods and brokerage on shares are included.
- **`ar_imports_sub`** is keyed (b): paying in foreign currency is true but is not why imports are subtracted. **`ar_mixed_income`** is keyed (d): both statements are false.
- **`s4_konark_isc` (ii)** argues that unreported mixed income inflates profit found as the remainder when domestic income is estimated independently.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging; the thin rent and interest segments sit close together.
