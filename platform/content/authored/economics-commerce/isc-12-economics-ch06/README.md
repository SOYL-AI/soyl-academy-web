# ISC Class 12 Economics, Chapter 6 — Market Mechanism: Equilibrium Price and its Applications

`isc-12-economics-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters, in the ISC 2027 question style. Build it from `platform/` with `npx tsx content/authored/economics-commerce/isc-12-economics-ch06/src/build.mjs`. The build:
- uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`;
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- runs an exact-stem originality pre-check against every authored chapter;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 16 slides, 26 visuals including 7 SVG curve figures), notes (6 sections), 30 flashcards, 72 questions (153 marks) |
| `tests.json` | `t_isc12economics_ch06_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12economics_ch06_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They share no questions and use no deck-check item. |
| `src/` | `questions.mjs` (the bank and the imagined demand and supply equations, every equilibrium computed and asserted), `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

## Scope

All five syllabus topics are covered, and there are no removed topics for this chapter:
- **t01** market equilibrium and disequilibrium; excess demand and excess supply; adjustment back to equilibrium
- **t02** effect of an increase or decrease in demand, supply unchanged
- **t03** effect of a shift in supply, and of simultaneous changes in the same and opposite directions (equal and unequal)
- **t04** price ceiling, shortage, rationing and black markets
- **t05** price floor and the minimum support price, surplus, procurement and buffer stock

## Question bank (72 items)

| Type | Count |
|---|---|
| mcq | 23 (keys a6 b5 c6 d6), several read equations or schedules |
| assertion-reason | 5, ISC options with (d) "both false" (keys a c a a c) |
| true-false | 3 |
| fill-blank | 2 |
| numerical | 6 (equilibrium price, excess demand, new equilibria, quantity at a ceiling or floor) |
| match | 1 |
| ordering | 1 |
| short 2-mark | 8 |
| short 3-mark | 11 |
| long 5-mark | 6, set in parts |
| short 4-mark, ISC paper style (2 + 2) | 2, bank only |
| long 8-mark, ISC paper style (4 + 4) | 2, bank only |
| case-based | 2, each with an internal choice in part (c) |

- **Difficulty:** d1 6, d2 28, d3 30, d4 8.
- **Competency:** recall 6, understanding 25, application 15, analysis 22, evaluation 4. That puts 57% of items at application or above, inside the lint band of 45–65%. Ten routine one-step items are tagged understanding under the D-035 rule.
- **Check slides:** q008, q010, q020 and q033 in Part 1; q046, q049, q057 and q060 in Part 2. None is used in a test.

## Data

Every figure is imagined, labelled as such, computed in `questions.mjs` from linear equations and asserted:
- **Jaggery (Kolhapur mandi):** Qd = 120 − 2P, Qs = 3P − 30, giving E at ₹30 and 60 t.
  - Excess demand is 50 t at ₹20 and excess supply 50 t at ₹40.
  - Demand rising to 145 − 2P gives ₹35 and 75 t; falling to 95 − 2P gives ₹25 and 45 t.
  - Supply rising to 3P − 5 gives ₹25 and 70 t; falling to 3P − 55 gives ₹35 and 50 t.
  - Equal increases (145 − 2P with 3P − 5) give ₹30 and 85 t.
- **Atta (hill district):** Qd = 200 − 4P, Qs = 6P − 100, giving E at ₹30 and 80 t. A ceiling of ₹25 gives a shortage of 100 − 50 = 50 t.
- **Lentils (Madhya Pradesh district):** Qd = 500 − 5P, Qs = 5P − 100, giving E at 60 and 200. A support price of 70 gives a surplus of 250 − 150 = 100 thousand quintals.
- **Mango pulp (Ratnagiri):** Qd = 90 − 3P, Qs = 2P − 10, giving E at ₹20 and 30 t.
- **Kite string (Ahmedabad):** the schedule clears at ₹60 and 600 spools.
- **SVG curves:** all 7 are drawn from the same equations, so every marked point lies on its curves.

## Facts a reviewer should check

- **MSP:** minimum support prices for notified crops are announced by the Government of India on the recommendation of the Commission for Agricultural Costs and Prices (CACP). Procured grain is held as buffer stock and partly distributed through ration shops. All of this is stated broadly, with no MSP values.
- **Controls:** a price ceiling is effective only below equilibrium and a floor only above it, and the chapter teaches both this way.
- **`m_dshift_numbers`:** the solution explains why quantity rises by less than the shift (15 t, not 25 t).

## Originality

Every market, town, schedule and case is imagined, and no textbook, specimen or past-paper item is reused (D-036). The ISC 2027 specimen's app-cab ceiling-price item was deliberately not used.

A 5-gram near-duplicate scan using the originality gate's rule (72 stems against 18,490 others) finds 0 flags. The SVG label overflow and overlap check finds 0 issues in the 7 figures.

## Gaps

- **Rendering:** nobody has seen the SVG labels rendered. They need a look at 360 px on staging, especially the three-curve shift figures.
- **Narration audio** is not yet generated (TTS stage).
