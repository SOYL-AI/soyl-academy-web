# ISC Class 12 Economics, Chapter 15 — Balance of Payments and Foreign Exchange Rate

`isc-12-economics-ch15` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 12 Economics pattern set by ch01–ch14. To build it, run `npx tsx content/authored/economics-commerce/isc-12-economics-ch15/src/build.mjs` from `platform/`. It uses the shared lib `isc-12-economics-ch01/src/lib.mjs`, imported rather than copied. Edit `src/`, not the JSON.

The build checks:
- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the exact-stem originality pre-check against every authored chapter.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 17 slides with 26 visuals (4 SVG figures computed from the data; the rest tables and flows); 6 notes sections; 30 flashcards; 73 questions worth 159 marks |
| `tests.json` | `t_isc12economics_ch15_short` (20 marks, 50 min) and `t_isc12economics_ch15_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`. Both follow their blueprint item for item, including the internal-choice groups. The tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the imagined data and the balance-of-payments and exchange-market engines, with asserts) and `build.mjs` (decks, SVGs, notes, cards and tests) |

## Scope (ISC 2027 syllabus)

All five topics are covered:
- **t01** meaning of the balance of payments; current and capital accounts; visible and invisible items; balance of trade; working out the balances
- **t02** disequilibrium (autonomous and accommodating items), causes of a deficit and corrective measures
- **t03** meaning of the exchange rate; fixed and flexible rates with merits and demerits; managed floating in general terms
- **t04** demand for and supply of foreign exchange, the equilibrium rate, excess demand and supply, and shifts of either curve
- **t05** depreciation, appreciation, devaluation and revaluation (meaning only), with who gains and loses from a depreciation

The syllabus lists no removed topics for this chapter.

### Decks

- **Part 1** (balance of payments, 16 slides):
  - 12 visuals; worked examples on classifying six transactions and on the Vanadesh accounts.
  - Check slides use `tf_ka_assets`, `n_vanadesh_bot`, `m_remittance` and `tf_reserves_fall`.
- **Part 2** (exchange rate, 17 slides):
  - 14 visuals; worked examples on finding the equilibrium and on a shift in demand.
  - Check slides use `m_fx_meaning`, `n_eq_quantity` and `m_revaluation`.
- **SVG figures:** the demand–supply equilibrium for US dollars, a rightward demand shift (rupee depreciates), a rightward supply shift (rupee appreciates), and signed bars of the Vanadesh balances. All curves are drawn from the asserted equations.
- **Narration:** at most 65 words per slide, with no symbols or abbreviations.

### Question bank (73 items, 159 marks)

| Type | Count |
|---|---|
| mcq | 22 (keys a6 b5 c6 d5) |
| assertion-reason | 5, ISC options with (d) "both false" (keys a c b a d) |
| true-false | 3 |
| fill-blank | 2 |
| numerical | 7 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 9 |
| long 5-mark | 5, in parts |
| 4-mark ISC paper style (2 + 2), bank only | 3 |
| 8-mark ISC paper style (4 + 4), bank only | 2 |
| case-based | 3, each with an internal choice in part (c) |

- **Difficulty:** d1 7, d2 30, d3 27, d4 9.
- **Competency:** recall 6, understanding 25, application 17, analysis 21, evaluation 4, so 58% of items are at application or above. Six routine classification and substitution items were tagged understanding under D-035.
- **Tests:**
  - Short: A `m_bop_meaning`, `m_classify_ca`, `m_measure_export`, `m_depreciation`, `ar_bot_bop`; B `s_bot_bop`, then `s_two_causes` or `s_fixed_vs_flex`; C `s3_ca_vs_ka`, then `s3_measures_three` or `s3_dep_effects`; D `l_determination`.
  - Long: A 10 MCQs plus `ar_bop_balances` and `ar_fixed_reserves`; B `s_ca_two_items`, `s_demand_reasons`, then `s_dep_vs_dev` or `s_import_substitution`; C `s3_vanadesh_classify`, `s3_causes_three`, `s3_excess_demand`, then `s3_fixed_merits` or `s3_flex_demerits`; D `l_bop_structure`, then `l_disequilibrium` or `l_fixed_flexible`.

## Data and facts

- **Imagined figures**, all computed and asserted in `questions.mjs` (₹ crore):
  - **Vanadesh:** trade −1,400, services 1,200, income −300, transfers 700; current account 200; capital account 200; overall 400, so reserves rise.
  - **Tamrapur:** trade −800, current account −300, capital account 100, overall −200, so reserves fall.
  - **Kesarpur:** a trade surplus of 200 but a current account deficit of 300.
- **Imagined foreign exchange market:** Qd = 300 − 4e and Qs = 6e − 200, with e in rupees per US dollar and Q in millions of US dollars.
  - Equilibrium: e = 50, Q = 100.
  - Demand up 40: e = 54, Q = 124 (the rupee depreciates).
  - Supply up 60: e = 44, Q = 124 (the rupee appreciates).
  - At ₹45 there is an excess demand of 50; at ₹55, an excess supply of 50.
- **Microscope:** priced at 3,000 US dollars, it costs ₹1,50,000 at 50 and ₹1,62,000 at 54.
- **No real statistics:** no current Indian balance-of-payments figure or exchange rate is stated. Every rate is an imagined number of rupees per US dollar, and managed floating is described only in general terms.
- **Originality:** the set-ups (countries, numbers and the market equations) differ from SOYL's CBSE 12 Economics ch05. No textbook, specimen or past-paper item is reused.

## Verifier pass (2026-11-01)

- **Keys:** every numerical key, MCQ distractor set and model-answer figure comes from the asserted engines. The equilibrium points on the SVGs are asserted to lie on both curves.
- **Conventions:**
  - Interest on a foreign loan is a current account (income) item; repaying the loan is a capital account item.
  - Disequilibrium refers to autonomous items, while the full account always balances in accounting terms.
  - Depreciation and appreciation are market changes under a flexible rate; devaluation and revaluation are official changes under a fixed rate.
- **Checks:**
  - The pipeline lint gives 0 errors and 0 warnings, and the deterministic verify raises 0 flags.
  - A 5-gram near-duplicate scan of the 73 stems against 21,714 others finds 0 flags.
  - The SVG label overflow and overlap check finds 0 issues.
  - A rebuild is byte-identical.

## Gaps

- **SVG rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The two shift diagrams have two equilibrium labels close together.
- **`ar_dev_imports`:** keyed (b). Both statements are true, but R names a different cause of deficits.
