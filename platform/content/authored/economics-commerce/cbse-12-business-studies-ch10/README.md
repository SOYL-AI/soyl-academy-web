# CBSE Class 12 Business Studies, Chapter 10 — Financial Markets

`cbse-12-business-studies-ch10` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Business Studies and Economics chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch10/src/build.mjs` from `platform/`). The build validates the schema and runs the pipeline lint, the deterministic verify checks, word limits, narration rules, the answer-leak scan and the editorial counts. It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks, notes (6 sections), 32 flashcards and 74 questions. The full stats are printed by the build. |
| `tests.json` | `chapter-test-short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short`, and `chapter-test-long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Each matches its blueprint item for item, the two are disjoint, and neither uses a deck-check item. |
| `src/` | `lib.mjs` (the shared economics-commerce lib, unchanged), `questions.mjs` (the bank and the computed figures, with asserts) and `build.mjs` (visuals, decks, notes, cards and tests). |

## Scope

All five syllabus topics are covered:
- **t01:** financial market concept and its four functions.
- **t02:** the money market and its five instruments.
- **t03:** the capital market; primary vs secondary markets; five methods of floatation.
- **t04:** the stock exchange, its functions, trading and settlement, dematerialisation and depositories.
- **t05:** SEBI, its objectives and its protective, developmental and regulatory functions.

### Decks

**Part 1** covers the financial market and the money market. Its worked examples are:
- the return on a 182-day treasury bill (₹9,65,000 paid, ₹10,00,000 received, gain ₹35,000);
- choosing the money market instrument for four imagined needs.

**Part 2** covers the capital market, the stock exchange and SEBI. Its worked examples are:
- a rights issue (2 for 5 on 1,500 shares gives 600 shares, costing ₹36,000);
- a sale through a broker (₹1,60,000 sale value, brokerage ₹320, net ₹1,59,680).

The two SVG figures are a bar chart of a treasury bill's price against its face value, and a diagram contrasting the primary and secondary markets. All other visuals are tables and flows.

### Question bank

The bank uses these types:
- mcq, assertion-reason, true-false, fill-blank, match and ordering (the trading procedure);
- numerical: treasury bill gain ₹4,000, brokerage ₹315, rights shares 600;
- short (2 and 3 marks) and long (5 marks);
- four case-based items: Suvarna Steels (commercial paper and commercial bill), Aarohan Electricals (methods of floatation), Kiran's diary (trading and demat) and the regulator's year (SEBI functions).

Each case asks the student to quote the clue, name the concept and explain it, with an internal choice in part (c).

## Facts a reviewer should double-check

- **Money market instruments:**
  - Treasury bills: issued by the RBI for the Central Government at a discount (zero-coupon), for 91, 182 or 364 days.
  - Commercial paper: 15 days to one year.
  - Call money: one to 15 days, mainly interbank.
  - Certificates of deposit: issued by commercial banks and development financial institutions.
- **The inverse link between the call rate and other short-term rates** is stated as a broad pattern in `ar_call_rate`.
- **SEBI** was set up in 1988 and became statutory under the SEBI Act, 1992. Investor education is classed as a **protective** function and internet trading through registered brokers as a **developmental** step, following common classroom classification.
- **Depositories** are NSDL and CDSL.
- **Settlement** is described only as "a short rolling cycle of one working day". No other current exchange rule, limit or fee is stated.
- **Minimum T-bill amounts are not stated.**
- **Figures and names:** the brokerage rates (0.25 and 0.2 per cent), the T-bill prices and the rights ratio are imagined and labelled. All firms and investors are imagined.

## Originality

Every scenario, case and figure was written for this chapter. No NCERT text or exercise and no board or sample-paper question is reused (D-036). Every case stem names its own firm or situation, so no stem duplicates another chapter.

## Gaps

- Nobody has seen the SVG labels rendered. They should be checked at 360 px on staging.
