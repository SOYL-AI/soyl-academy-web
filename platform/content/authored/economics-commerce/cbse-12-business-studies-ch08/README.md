# CBSE Class 12 Business Studies, Chapter 8: Controlling

`cbse-12-business-studies-ch08` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item has `status: "draft"`

This chapter was hand-authored under D-025, D-026 and D-032, following the pattern of the CBSE 12 Business Studies chapters ch01–ch06.

**Build.** It is built from `src/` by running this from `platform/`:

```
npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch08/src/build.mjs
```

The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- then writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (17 + 18 slides), notes (6 sections), 30 flashcards, 70 questions |
| `tests.json` | `t_cbse12businessstudies_ch08_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short`, and `t_cbse12businessstudies_ch08_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. They follow the blueprints item for item, share no item and use no deck-check item. |
| `src/` | `lib.mjs` (an unchanged copy of the BST ch01 lib), `questions.mjs` (the bank, with the `dev()` helper and asserted figures), `build.mjs` (visuals, decks, notes, cards and tests) |

## Scope

The chapter covers both syllabus topics:

- **t01: concept and importance.**
  - Meaning of controlling.
  - Features: goal-oriented, pervasive, continuous, a primary function of every manager, backward- and forward-looking.
  - Six points of importance.
  - Four limitations.
  - The relationship between planning and controlling.
- **t02: the controlling process.** Its five steps:
  1. Set standards.
  2. Measure actual performance.
  3. Compare it with the standards.
  4. Analyse deviations, using critical point control and management by exception.
  5. Take corrective action.

### Decks

**Part 1** (17 slides):
- Covers meaning, features, back- and forward-looking control, importance, limitations, and planning and controlling as inseparable.
- Two worked examples: spotting a feature in case lines, and finding importance in lines from an imagined Mysuru bus depot.
- Four checks.

**Part 2** (18 slides):
- Covers the five steps.
- Quantitative and qualitative standards.
- Measurement techniques.
- A bar chart of an imagined Ludhiana bicycle factory against its standard.
- Critical point control.
- A management-by-exception band chart.
- Corrective action.
- Fixing the performance versus fixing the standard.
- Two worked examples: percentage deviations for an imagined Karnal dairy, and deciding which days to report under a 5% limit.
- Four checks.

There are three SVG figures, all theme-coloured with computed coordinates: the plan–act–control–correct cycle, the bicycle bar chart and the exception band. Every other visual is a table or a flow.

### Question bank (70 items)

| Type | Count |
|---|---|
| mcq | 26 |
| assertion-reason | 7 |
| numerical | 4 (plus 1 inside a case) |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 7 |
| short 3-mark | 5 |
| long 5-mark | 6 |
| case-based | 5 |

- **Case-based items:** Kesar Sweets (control report), Shanti Water Purifiers, Nayak Logistics, Aarohi Hotels and Vasant Fertilisers. Each has an internal choice in part (c).

## Data and facts

- **All firms, people and figures are imagined** and labelled as such. The build computes every figure and asserts it:

| Item | Standard → actual | Deviation |
|---|---|---|
| Shoe unit | 500 → 460 | 8% |
| Pickle jar | ₹200 → ₹212 | 6% |
| Electricity | ₹80,000 → ₹86,000 | 7.5%, against a 5% limit |
| Labour hours | 1,200 → 1,320 | 10% |
| Kesar Sweets | three items | 3%, 8% and 1%, against a 4% limit |
| Dairy | three items | 6%, 30% and 4% |
| Bicycles | daily output | 0%, 4%, 2%, 10% and 1%, against a 5% limit; only Thursday is reported |

- **No dated or statistical real-world facts** are used. The chapter is concept-only.
- **Originality:** no NCERT text, example or exercise and no board or sample-paper item is reused (D-036).

## For a reviewer to double-check

1. **Classroom conventions followed:**
   - The six points of importance and the four limitations.
   - "Planning without controlling is meaningless; controlling without planning is blind."
   - Critical point control is about **which areas** to watch; management by exception is about **which deviations** to report.
2. **Percentage deviation** is always taken on the **standard**.
3. **Revising the standard** is treated as a valid corrective action when a standard proves unrealistic.
4. **`cb_vasant` (c)(ii):** it credits critical point control for leaving minor bills to a supervisor, and notes the link with handling small matters lower down.
5. **SVG labels:** they are placed by coordinates and have not been seen rendered. They should be checked at 360 px on staging, in light and dark mode.
