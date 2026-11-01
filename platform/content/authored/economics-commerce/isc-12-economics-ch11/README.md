# ISC Class 12 Economics, Chapter 11 — Aggregate Demand, Consumption and Saving

`isc-12-economics-ch11` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 12 Economics pattern set by ch01–ch10. To build it, run `npx tsx content/authored/economics-commerce/isc-12-economics-ch11/src/build.mjs` from `platform/`. It uses the shared lib `isc-12-economics-ch01/src/lib.mjs`, which is imported, not copied. Edit `src/`, not the JSON.

The build checks:
- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the exact-stem originality pre-check against every authored chapter.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 17 slides with 23 visuals (3 SVG curves; the rest tables and flows); 6 notes sections; 30 flashcards; 73 questions worth 152 marks |
| `tests.json` | `t_isc12economics_ch11_short` (20 marks, 50 min) and `t_isc12economics_ch11_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, imagined data and asserts) and `build.mjs` (decks, SVGs, notes, cards, tests) |

## Scope (ISC 2027 syllabus)

All four topics are covered:
- **t01** ex ante (planned) and ex post (realised) values; why realised saving equals realised investment (unplanned stock changes); effective demand (AD = AS, which may be below full employment)
- **t02** aggregate demand C + I + G + (X − M) and its components; aggregate supply as the value of output, C + S in two sectors
- **t03** the consumption function C = c̄ + bY; APC and MPC; why 0 < MPC < 1; the break-even income
- **t04** the saving function; APS and MPS; APC + APS = 1 and MPC + MPS = 1; deriving saving schedules

Equilibrium income, the multiplier and excess or deficient demand belong to ch12 and are not taught here. The syllabus lists no removed topics for this chapter.

### Decks

- **Part 1** (plans, outcomes and aggregate demand): 16 slides with 4 checks. Its 2 worked examples are Navkhand's aggregate demand and a Ludhiana hosiery cluster's planned and realised investment.
- **Part 2** (propensities to consume and save): 17 slides with 4 checks. Its 3 worked examples are Neelgiri Pradesh's consumption and saving schedule, a Bhopal household's APC and MPC, and a Sundarban village whose MPC falls.
- **SVG figures**, each drawn from its equation:
  - the consumption curve with the 45° line and break-even B;
  - the saving curve with the income axis drawn at S = 0;
  - APC falling towards a flat MPC.
- **Narration:** at most 59 words per slide (mean 42), with no symbols or abbreviations.

### Question bank (73 items)

| Type | Count |
|---|---|
| mcq | 23 |
| assertion-reason | 5, ISC options (keys a, c, a, b, d) |
| true-false | 3 |
| fill-blank | 3 |
| numerical | 7 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 8 |
| short 3-mark | 9 |
| long 5-mark | 5 |
| 4-mark ISC paper style (2 + 2), bank only | 3 |
| 8-mark ISC paper style (4 + 4), bank only | 2 |
| case-based | 3, each with an internal choice in part (c) |

- **Difficulty:** d1 17, d2 25, d3 27, d4 4.
- **Competency:** recall 10, understanding 23, application 21, analysis 17, evaluation 2. That puts 55% of items at application or above.
- **Spares not in either test:** `s_effective_meaning`, `s3_why_components`, `l_mpc_falling`, all bank-only 4- and 8-mark items, and the cases.

## Data

Every figure is imagined, computed in `questions.mjs` and checked by asserts.
- **Neelgiri Pradesh:** C = 90 + 0.7Y (₹ crore). Break-even is 300. Consumption is 90, 160, …, 510 and saving −90, −60, …, 90 for incomes 0 to 600. APC falls from 1.6 to 0.85.
- **Bhopal household:** incomes 20, 30, 40 and 50 (₹ thousand a month) with consumption 22, 30, 38 and 46. MPC is 0.8, break-even 30, and APC 1.1, 1, 0.95 and 0.92.
- **Sundarban village:** incomes 100, 200, 300 and 400 (₹ lakh) with consumption 120, 200, 270 and 330. MPC is 0.8, 0.7 and 0.6, and MPS 0.2, 0.3 and 0.4.
- **Navkhand:** AD = 820 + 260 + 180 + (140 − 160) = 1,240.
- **Ludhiana hosiery cluster:** planned investment 150, unsold stock 25, realised investment 175.

No real statistics are stated.

## For a reviewer

- **Effective demand** is taught as the level of AD at which AD = AS. It is described as possibly below full employment; involuntary unemployment is only named, because it is developed in ch12.
- **AS = C + S** is used for the two-sector economy only.
- **`ar_mps_aps`** is keyed (b): both statements are true, but the identity does not explain why APS < MPS. **`ar_aps_one`** is keyed (d), both statements false.
- **`m_apc_falls` and `tf_apc_mpc`** rely on APC = b + c̄ ÷ Y for a straight-line consumption function.
- **Originality:**
  - Set-ups differ from the CBSE 12 Economics ch03 bank (which uses C = 100 + 0.75Y) and from the ISC 2027 specimen, which asks about the break-even point and MPS from the multiplier.
  - A 5-gram near-duplicate scan using the originality gate's own rule, over 73 stems against 21,409 others, finds 0 flags.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging.
