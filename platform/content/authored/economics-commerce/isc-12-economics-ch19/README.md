# ISC Class 12 Economics, Chapter 19 — National Income Aggregates

`isc-12-economics-ch19` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 2027 Economics pattern (`catalog/sources/cisce.md`, entry `isc-2027-specimen-856-economics`). It is built from `src/`: run `npx tsx content/authored/economics-commerce/isc-12-economics-ch19/src/build.mjs` from `platform/`. The build uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`, which it does not copy or edit. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits and narration rules;
- runs the answer-leak scan and the exact-stem originality pre-check;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 17 slides with 24 visuals (2 SVG figures); 6 notes sections; 30 flashcards; 77 questions worth 158 marks, including 9 case parts |
| `tests.json` | `t_isc12economics_ch19_short` (20 marks, 50 min) and `t_isc12economics_ch19_long` (40 marks, 100 min), on `isc-12-default-chapter-test-short` and `-long` |
| `src/` | `questions.mjs` (the bank and every computed figure, with asserts) and `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

Both tests follow their blueprint item for item, including the internal-choice groups. They share no items and use no deck-check item.

## Scope

All five syllabus topics are covered:
- **t01** depreciation, net indirect taxes and net factor income from abroad; the eight aggregates (GDP, GNP, NDP, NNP at market price and factor cost); working forwards and backwards; domestic territory and normal residents
- **t02** national income (NNP at factor cost) and per capita income
- **t03** private income, personal income, personal disposable income, and gross and net national disposable income
- **t04** real and nominal GDP, and the GDP deflator
- **t05** GDP and welfare: distribution of income, non-monetary exchanges and externalities

The three methods of measuring national income belong to ch20 and are not taught here.

### Decks

- **Part 1** (17 slides, t01–t02): 4 check slides (`tf_fc_mp`, `n_tir_nfia`, `ord_ladder`, `fb_nnpfc`) and 3 worked examples (Ambarpur from GDP to national income; working back for Devgiri; Chandranagar per capita income).
- **Part 2** (17 slides, t03–t05): 4 check slides (`fb_pi`, `tf_pdi_spend`, `n_bha_real`, `tf_gdp_welfare`) and 2 worked examples (Lohitpur private income; the Ketakipur deflator).
- **SVG figures**, built from code: bars of Ambarpur's seven aggregates, and Ketakipur's nominal against real GDP.
- Narration is at most 59 words per slide (mean 43), with no symbols.

### Question bank (77 items)

| Type | Count |
|---|---|
| mcq | 25 (keys a7 b6 c6 d6) |
| assertion-reason | 7, ISC options with (d) "both false" (keys a, c, c, a, d, a, a) |
| true-false | 3 |
| fill-blank | 2 |
| numerical | 6 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 10 |
| short 3-mark | 10 |
| long 5-mark | 5, set in parts |
| 4-mark, ISC paper style (2 + 2), bank only | 2 |
| 8-mark, ISC paper style (4 + 4), bank only | 2 |
| case-based, each with an internal choice in part (c) | 3 |

- **Difficulty:** d1 8, d2 31, d3 32, d4 6.
- **Competency:** 57% of items are at application or above (lint band 45–65%). Three routine one-step items (`m_cha_pc`, `m_shi_def`, `n_rew_nndi`) are tagged understanding under D-035.

## Data and facts

- **Imagined economies (₹ crore), computed and asserted in `questions.mjs`:**
  - Ambarpur: GDP mp 4,800, depreciation 360, net indirect taxes 420, NFIA −60; NDP mp 4,440, GDP fc 4,380, NDP fc 4,020, GNP mp 4,740, NNP mp 4,380, GNP fc 4,320, national income 3,960.
  - Devgiri: national income 2,700 → NDP fc 2,660 → NDP mp 2,940 → GDP mp 3,150.
  - Phalguni Desh: subsidies 150 exceed indirect taxes 90, so NDP fc 1,860 exceeds NDP mp 1,800.
  - Tirthapur: received 260, paid 310, NFIA −50.
  - Chandranagar: 63,000 crore ÷ 1.8 crore people = ₹35,000; Saptagiri: per capita income falls from ₹25,000 to ₹24,000 while national income rises 8 per cent.
  - Lohitpur: private-sector share 8,300 → private income 9,000 → personal income 7,900 → PDI 7,100.
  - Mandakini: net NDI 5,340, gross 5,740. Rewa Desh: gross NDI 6,140, net 5,640.
  - Ketakipur (rice and cloth, base year 1): nominal 4,000 → 6,000; real 4,800; deflator 125; real growth 20 per cent. Kesari Ghat: deflator 110, real growth 5 per cent.
- **Conventions used:** interest on national debt is a transfer (in private income, not national income); embassies abroad are part of the domestic territory; net indirect taxes = indirect taxes − subsidies; national disposable income adds net current transfers to NNP at market price.
- **Real statistics:** none. No Indian GDP or per capita figure is stated.
- **Originality:** every economy and case is imagined and labelled; no textbook, specimen or past-paper item is reused. The specimen's assertion-reason on nominal per capita income and the standard of living, and its old-age pension item, are not reused. Set-ups differ from SOYL CBSE 12 Economics ch01.

## For a reviewer

- `ar_pc_welfare` is keyed (c): R wrongly says national income ignores depreciation. `ar_ndi_transfers` is keyed (d), both false.
- `l_dom_concepts` (spare) classifies three incomes as national only, domestic only and both.
- The 5-gram near-duplicate scan (originality gate rule) finds 0 flags against 22,009 other stems; the SVG label overflow and overlap check finds 0 issues.
- Nobody has seen the SVG labels rendered; the seven-bar aggregate chart should be checked at 360 px on staging.
