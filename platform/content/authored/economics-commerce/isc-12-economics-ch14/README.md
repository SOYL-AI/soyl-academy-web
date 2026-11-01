# ISC Class 12 Economics, Chapter 14 — Commercial Banks and the Central Bank

`isc-12-economics-ch14` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 12 Economics pattern set by ch01–ch12. To build it, run `npx tsx content/authored/economics-commerce/isc-12-economics-ch14/src/build.mjs` from `platform/`. It uses the shared lib `isc-12-economics-ch01/src/lib.mjs`, imported rather than copied. Edit `src/`, not the JSON.

The build checks:
- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the exact-stem originality pre-check against every authored chapter.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 18 slides with 29 visuals (3 SVG figures computed from the data; the rest tables and flows); 6 notes sections; 30 flashcards; 76 questions worth 158 marks |
| `tests.json` | `t_isc12economics_ch14_short` (20 marks, 50 min) and `t_isc12economics_ch14_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`. Both follow their blueprint item for item, including the internal-choice groups. The tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the imagined data and the credit-creation engine, with asserts) and `build.mjs` (decks, SVGs, notes, cards and tests) |

## Scope (ISC 2027 syllabus)

All five topics are covered:
- **t01** functions of commercial banks: deposits (demand and time), forms of lending, agency and general utility functions
- **t02** credit creation round by round, the credit multiplier (1 ÷ LRR), its limitations, and high-powered money
- **t03** functions of the RBI: bank of issue, banker to the government, bankers' bank, lender of last resort, custodian of foreign exchange, controller of credit
- **t04** quantitative credit control: repo, reverse repo, bank rate, CRR, SLR and open market operations, with directions against inflation and deficient demand
- **t05** qualitative credit control: margin requirements, credit rationing, moral suasion and direct action; quantitative versus qualitative

The syllabus lists no removed topics for this chapter.

### Decks

- **Part 1** (commercial banks and credit creation, t01–t02): 18 slides, 3 checks (`m_fixed_deposit`, `fb_demand_dep`, `n_vas_total`).
  - SVGs: deposit-creation rounds split into reserve and loan, and total deposits at four reserve ratios.
  - Worked examples: three customers and their accounts, Vasundhara Bank's rounds, and the Swarnapur ratio rise.
- **Part 2** (the RBI and credit control, t03–t05): 18 slides, 4 checks (`m_lolr_case`, `m_slr_where`, `n_lendable`, `m_moral_suasion`).
  - SVG: an imagined bank's deposits split by CRR and SLR.
  - Worked examples: lendable funds under imagined ratios, and a higher margin on pulses.
- **Narration:** at most 58 words per slide (mean 46), with no symbols.

### Question bank (76 items, 158 marks)

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| assertion-reason | 7, ISC options with (d) "both false" (keys a a c a c a b) |
| true-false | 4 |
| fill-blank | 2 |
| numerical | 5 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 9 |
| long 5-mark | 6, set in parts |
| 4-mark ISC paper style (2 + 2), bank only | 2 |
| 8-mark ISC paper style (4 + 4), bank only | 2 |
| case-based | 3, each with an internal choice in part (c) |

- **Difficulty:** d1 8, d2 42, d3 21, d4 5.
- **Competency:** recall 7, understanding 25, application 27, analysis 13, evaluation 4. That puts 58% of items at application or above (lint band 45–65%).

## Data and facts

- **Imagined figures, computed and asserted in `questions.mjs`:**
  - Vasundhara Bank: ₹50,000 at 20 per cent gives multiplier 5, deposits ₹2,50,000 and credit ₹2,00,000. The rounds are 50,000, 40,000, 32,000 and 25,600, and total reserves equal the first deposit.
  - Swarnapur: ₹1,000 crore at 10 per cent gives ₹10,000 crore, and at 12.5 per cent ₹8,000 crore.
  - Kosi Valley: ₹80 crore at 25 per cent gives deposits of 320 and credit of 240.
  - High-powered money: 640 + 160 = ₹800 crore.
  - Lendable funds: 600 − 30 − 120 = ₹450 crore, under an imagined CRR of 5 per cent and SLR of 20 per cent.
  - Margin example: ₹7 lakh at a 30 per cent margin and ₹5 lakh at 50 per cent, against pulses worth ₹10 lakh.
- **RBI facts are stable ones only:** set up in 1935 under the RBI Act, 1934; nationalised in 1949; sole issuer of currency notes except the one-rupee note (issued, like coins, by the Government of India).
- **No current rates:** no current repo, reverse repo, bank rate, CRR or SLR value is stated. Every ratio in an item is labelled imagined.
- **Originality:** all banks, places and figures are imagined. No textbook, specimen or past-paper item is reused, including the specimen's CRR/SLR trend and its dated repo-cut news item. The set-ups and stems differ from SOYL CBSE 12 Economics ch02 and ISC 12 Economics ch12.

## For a reviewer

- **Bank rate:** described in the textbook way, as the rate for longer-term lending or rediscounting without a repurchase agreement. Its present alignment with the marginal standing facility rate is not mentioned.
- **Reverse repo:** taught because the syllabus names it, although the RBI now uses a standing deposit facility as the floor of its corridor.
- **High-powered money:** defined as currency with the public plus banks' cash reserves (vault cash and deposits with the central bank). The RBI's reserve-money measure also includes "other deposits with the RBI", which this chapter does not use.
- **AR keys:** `ar_hpm_deposits` and `ar_crr_slr` are keyed (c); `ar_moral_force` is keyed (b).
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The CRR/SLR split bar has a narrow first segment.
