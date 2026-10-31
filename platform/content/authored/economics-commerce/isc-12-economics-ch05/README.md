# ISC Class 12 Economics, Chapter 5 — Theory of Supply and Elasticity of Supply

`isc-12-economics-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 2027 Economics question style (sources/cisce.md `isc-2027-specimen-856-economics`). Build it from `platform/` with `npx tsx content/authored/economics-commerce/isc-12-economics-ch05/src/build.mjs`. It uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`, imported and not copied. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- runs the exact-stem originality pre-check;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (16 + 17 slides, 24 visuals: 7 SVG, 11 tables, 6 flows), notes (6 sections), 30 flashcards, 76 questions (163 marks) |
| `tests.json` | `t_isc12economics_ch05_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12economics_ch05_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They share no questions and use no deck-check item. |
| `src/` | `questions.mjs` (the bank and the imagined figures, computed and asserted) and `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

## Scope

All five syllabus topics are covered:
- **t01** meaning of supply; stock versus supply for perishable and durable goods
- **t02** determinants of supply and the supply function Sx = f(Px, Pf, T, Tx, G, Pr, N)
- **t03** the law of supply, the market supply curve by horizontal summation, and exceptions (backward-bending labour supply, rare goods, agricultural goods, expected price rises)
- **t04** movement along versus shift of the supply curve (extension, contraction, increase, decrease)
- **t05** elasticity of supply: meaning, the five degrees, the percentage method (numericals) and the geometric method (where a straight line meets the axes)

The syllabus lists no removed topics for this chapter.

**Convention:** Es = (ΔQ ÷ Q) ÷ (ΔP ÷ P), with the **original** price and quantity. Es is normally positive, because price and quantity supplied move together.

## Contents

- **Decks:**
  - Part 1 (t01–t03): 16 slides, 12 visuals, 3 checks, 2 worked examples (an Anand dairy's paneer supply; deriving the Ludhiana market curve).
  - Part 2 (t04–t05): 17 slides, 12 visuals, 4 checks, 2 worked examples (Surat weaver's Es; Nashik onion trader's new quantity).
  - Narration is at most 64 words a slide (mean 44) and uses no symbols.
- **SVG figures:** all drawn from equations, with their points asserted:
  - the weaver's extension on Q = 0.12P − 20;
  - the shift to Q = 0.12P − 8;
  - the three knitting units and their horizontal sum;
  - the backward-bending labour supply;
  - the three special degrees;
  - the geometric method with three straight lines.
- **Notes and flashcards:** 6 notes sections and 30 flashcards.
- **Questions:** 76 items worth 163 marks.

| Type | Count |
|---|---|
| mcq | 27 (keys a7 b7 c7 d6) |
| assertion-reason | 5, ISC options (keys c a b a d) |
| true-false | 3 |
| fill-blank | 2 |
| numerical | 6 (percentage method and market supply) |
| match | 1 |
| ordering | 1 |
| short 2-mark | 8 |
| short 3-mark | 9 |
| long 5-mark | 6 |
| short 4-mark, ISC paper style (2 + 2), bank only | 3 |
| long 8-mark, ISC paper style (4 + 4), bank only | 2 |
| case-based | 3, each with an internal choice in part (c) |

- **Difficulty:** d1 10, d2 30, d3 30, d4 6.
- **Competency:** recall 7, understanding 24, application 24, analysis 18, evaluation 3. That puts 59% of items at application or above. Three routine one-step items (`m_wood_held`, `n_market_hose`, `n_es_saree`) are tagged understanding under D-035.

## Data and facts

- **Imagined figures, all computed and asserted in `questions.mjs`:**
  - Surat sarees: ₹500 → ₹600, 40 → 52 a week, Es 1.5.
  - Nashik onions: Es 0.5, 1,000 → 1,100 kg.
  - Ratnagiri mangoes: Es 1.
  - Kanpur belts: Es 2, new price ₹165.
  - Moradabad brass lamps: Es 0.5.
  - Coimbatore pumps: a price fall, Es 1.2.
  - Darjeeling tea this week: Es 0.
  - Ludhiana hosiery market supply: 15, 45, 75, 105 at ₹100 to ₹400; market Es between ₹200 and ₹300 is 1.333.
  - Kochi fish and Saharanpur woodcraft, for stock against supply.
- **Real facts:** none (no statistics or dates).
- **Originality:** all set-ups are our own. The ISC 2027 specimen's wheat-trader storage item is not reused. A 5-gram near-duplicate scan using the originality gate's rule compared these 76 stems with 18,486 others and found 0 flags.

## For a reviewer

- **`m_goal_sales`:** a sales-maximising firm "offers more at each price" than a profit-maximising one, the usual ISC classroom treatment of the goal of the firm.
- **`l_stock_law` (b):** treats a trader's expectation of a price rise as making current supply behave against the law, as the syllabus lists exceptions.
- **`ar_tech_shift` and `ar_movement_price`:** keyed (c) and (b). Their solutions explain why.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The geometric-method figure has three labelled lines close together.
