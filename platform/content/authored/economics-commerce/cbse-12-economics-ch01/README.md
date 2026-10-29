# CBSE Class 12 Economics, Chapter 1 — National Income and Related Aggregates

`cbse-12-economics-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Introductory Macroeconomics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Social Science economics chapters (`cbse-10-social-science-ch19`). Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch01/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 16 slides), notes (6 sections), 31 flashcards, 78 questions (137 marks; 3 case-based items with 9 parts and 3 alternatives) |
| `tests.json` | `t_cbse12economics_ch01_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch01_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (builders, validation, SVG builder; shared copy for the CBSE 12 Economics chapters), `questions.mjs` (bank and the national-income helpers `valueAdded`, `expenditure`, `income`, `deflator`), `build.mjs` |

## Scope
All five syllabus topics: t01 basic concepts — macroeconomics, consumption and capital goods, final and intermediate goods (end use), stocks and flows, gross and net investment, depreciation (15 items) · t02 two-sector circular flow — assumptions, real and money flows, why the three methods agree (9) · t03 value added, income and expenditure methods with precautions (22, plus 2 tagged t03+t04) · t04 aggregates — domestic territory, normal residents, NFIA, NIT, GDP/GNP/NDP/NNP at MP and FC (17) · t05 real and nominal GDP, GDP deflator, GDP and welfare (13).

### Decks
- **Part 1** (20 slides): macro vs micro, kinds of goods (paint as final for a family, intermediate for a builder), stocks and flows (two-column + table), investment and depreciation, the **two-sector circular flow** (SVG: outer solid real flows, inner dashed money flows), the three points of measurement, the product method and double counting (cotton–yarn–shirt chain), income and expenditure methods, the inclusion checklist. **Worked examples:** NVA at FC of a spinning mill (960 → 560 → 520 → 500, ₹ lakh); GDP at MP by expenditure (₹1,700 crore); NDP at FC by income (₹1,520 crore). Four checks.
- **Part 2** (16 slides): three pairs of concepts, domestic territory and normal residents, NFIA, the ladder from GDP at MP to national income (1,700 → 1,600 → 1,480 → 1,450), market price and factor cost (a bicycle's price), nominal vs real GDP (SVG bar chart), the GDP deflator, GDP and welfare. **Worked examples:** the ladder; real GDP and deflator for a two-good town (1,30,000 / 1,76,000 / 1,55,000; deflator 113.5). Four checks.
- 24 of 36 slides carry a visual (2 SVG, 6 flows, 16 tables); narration up to 71 words (mean 51), no symbols.

### Question bank (78 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 27 | 1 | end-use classification, stock/flow, domestic territory, a second-hand scooter with commission, a deflator item |
| assertion-reason | 8 | 1 | keys a3 b2 c2 d1 |
| numerical | 8 (+ 6 inside cases) | 1–2 | net investment, NVA at FC, GDP by expenditure, NDP by income, NFIA (negative), MP from FC with large subsidies, deflator, real GDP |
| true-false · fill-blank · match · ordering | 4 · 2 · 3 · 1 | 1 · 1 · 2 · 1 | ordering: one turn of the circular flow |
| short | 10 + 6 | 2 / 3 | `word_limit` 30–50 / 50–80 (blueprint guidance); includes a full firm NVA at FC (350) and conversions to national income |
| long | 6 | 5 | `word_limit` 80–120; two-firm value added (875), expenditure to national income (3,860), circular flow, income method, aggregates, a d4 evaluation of GDP and welfare |
| case-based | 3 | 4 | a tea chain in Assam (double counting; values added 400 + 500 + 400); the imagined Republic of Sundarvan (NDP at FC 5,000, NI 5,120, GDP at MP 5,800); the imagined town Meghpur (nominal 33,000 vs real 28,500; 32 vs 14 per cent growth; deflator 115.8) |

- Difficulty d1/d2/d3/d4 = 12/36/26/4. Competency: recall 8, understanding 26, application 30, analysis 12, evaluation 2 — **56% at application or above** (lint band 45–65%).
- MCQ keys a7 b7 c7 d6; T/F 2 true, 2 false.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the tea chain. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C the expenditure-method numerical + (two-firm value added | circular flow); D Sundarvan and Meghpur.

## Data and facts
- **All figures are imagined** and computed by the build with assertions (`questions.mjs` and `build.mjs` throw if any figure drifts). No Indian national-income statistics are stated anywhere.
- Definitions follow standard national accounting as taught in Class 12: value of output = sales + change in stock; NIT = indirect taxes − subsidies; NI = NNP at FC; operating surplus = rent + interest + profit; mixed income of the self-employed; domestic territory includes residents' ships, aircraft and fishing vessels in international waters and the country's own embassies abroad, and excludes foreign embassies and international organisations located in it.
- **Originality:** no NCERT example, table or exercise is reused; every firm, town and country (Coimbatore spinning mill, Saharanpur furniture firm, Kochi spice unit, the Assam tea chain, Sundarvan, Meghpur) and every figure is SOYL's own.

## For a reviewer to double-check
- **SVG layout:** the circular-flow diagram and the nominal-vs-real bar chart place labels by pixel coordinates; check them at 360 px on staging.
- **Shares:** `s_treat2` treats the purchase of shares as excluded and notes that later dividends are factor income; the solution of `m_shares` says brokerage is counted.
- **`l_exp_ni`:** gross domestic capital formation is built as net fixed capital formation + change in stock + consumption of fixed capital (500 + 60 + 140 = 700).
- **Basic prices:** the chapter uses market price and factor cost only (as in the syllabus wording), not GVA at basic prices.

## Gaps
- 78 questions, above the 60 minimum; no d5 items.
- No `plot`-type visual: the chapter has no curves; both charts are SVG.
