# ISC Class 12 Economics, Chapter 7 — Production Function and Law of Variable Proportions

`isc-12-economics-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 2027 Economics question style (sources/cisce.md `isc-2027-specimen-856-economics`). Build it from `platform/` with `npx tsx content/authored/economics-commerce/isc-12-economics-ch07/src/build.mjs`. It uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`, imported and not copied. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- runs the exact-stem originality pre-check;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (17 + 18 slides, 25 visuals: 5 SVG, the rest tables and flows), notes (6 sections), 30 flashcards, 74 questions (158 marks) |
| `tests.json` | `t_isc12economics_ch07_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12economics_ch07_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They share no questions and use no deck-check item. |
| `src/` | `questions.mjs` (the bank and the imagined figures, computed and asserted) and `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

## Scope

All four syllabus topics are covered:
- **t01** production function Q = f(L, K); fixed and variable factors; short-run and long-run production functions
- **t02** total, average and marginal product (AP = TP ÷ L, MP = TPn − TPn−1, TP = ΣMP) and the TP–MP and AP–MP relationships
- **t03** Law of Variable Proportions: statement, assumptions, the three stages on TP and AP/MP diagrams, causes (indivisibility and division of labour; scarcity of the fixed factor and imperfect substitution; overcrowding), and why a rational producer operates in Stage II
- **t04** returns to scale, meaning only (increasing, constant, diminishing), and how they differ from returns to a factor

**Removed topics honoured:**
- No item asks the student to read the three stages off a Law of Variable Proportions schedule. Schedules appear only to calculate MP, AP or TP, as the t02 learning outcome requires.
- Returns to scale is taught and tested as meaning and types only.

**Stage convention:** Stage I ends where AP is at its maximum (AP = MP); Stage II ends where TP is at its maximum (MP = 0); Stage III follows. The decks, notes and the stages table say that some books end Stage I at the point of inflexion instead. **No question depends on where Stage I ends.**

## Contents

- **Decks:**
  - Part 1 (t01–t02): 17 slides, 12 visuals, 4 checks, 2 worked examples (MP and AP for an imagined Nagpur packing shed; TP from MP for an imagined Thanjavur paddy plot).
  - Part 2 (t03–t04): 18 slides, 13 visuals, 4 checks, 2 worked examples (key points on the Bastar diagram; identifying returns to scale for three factories).
  - Narration is at most 66 words a slide (mean 45) and uses no symbols or abbreviations.
- **SVG figures:** all drawn from equations.
  - TP = 9L² − L³, with the point of inflexion K at 3 workers and the maximum M (108) at 6 workers; a second version marks the stages.
  - AP = 9L − L² and MP = 18L − 3L², with MP's maximum (27 at 3 workers), MP = AP = 20.25 at 4.5 workers and MP = 0 at 6 workers. The x-axis sits at zero, so negative MP is drawn below it; a second version marks the stages.
  - Bars for three factories doubling every input.
- **Questions (74 items, 158 marks):**

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| assertion-reason | 5, ISC options with (d) "Both Assertion and Reason are false" (keys a c a b d) |
| true-false | 5 |
| fill-blank | 2 |
| numerical | 4 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 9 |
| long 5-mark | 6 |
| ISC paper-style 4-mark (2 + 2), bank only | 3 |
| ISC paper-style 8-mark (4 + 4), bank only | 2 |
| case-based | 2, each with an internal choice in part (c) |

- **Difficulty:** d1 10, d2 34, d3 23, d4 7.
- **Competency:** recall 6, understanding 28, application 19, analysis 17, evaluation 4. That puts 54% of items at application or above (lint band 45–65%).

## Data and facts

- **Imagined figures:** all are computed and asserted in `questions.mjs`:
  - Nagpur orange-packing shed: TP 12, 30, 51, 68, 80, 84, 84, 80; MP 12, 18, 21, 17, 12, 4, 0, −4; AP 12, 15, 17, 17, 16, 14, 12, 10.
  - Thanjavur paddy plot: MP 6, 10, 13, 9, 5, 2, 0, −3 gives TP 6, 16, 29, 38, 43, 45, 45, 42.
  - Shillong bakery: MP of the 5th baker 25; AP with five bakers 37.
  - Tiruppur tailors: AP 8 with 6 tailors and MP 1 of the 7th gives AP 7.
  - Jodhpur bandhani workshop: TP 5, 14, 21, 24 and AP 5, 7, 7, 6.
  - Returns to scale: output +140 per cent (Kolhapur), +100 per cent (Ankleshwar) and +60 per cent (Ludhiana) when inputs double.
- **No real statistics.** Every firm, farm and town is imagined and labelled as such.
- **Originality:** no textbook, specimen or past-paper item is reused (D-036); the ISC 2027 specimen's "returns to scale or returns to a factor" image item is not used. The exact-stem pre-check passes. A 5-gram near-duplicate scan (Jaccard ≥ 0.7, maths stripped) of the 74 stems against 21,110 others in the repo finds 0 flags.

## For a reviewer

- **Stage I boundary:** confirm that ISC teachers accept the AP-maximum convention (some ISC texts use the point of inflexion). Items avoid relying on it.
- **`ar_lvp_fixed`:** keyed (b). The law is short-run because a fixed factor exists; that technology can change in the long run is true but is not the reason.
- **`ar_rts_crs`:** keyed (d), both false. Doubling output on doubled inputs is constant returns, and returns to scale change all inputs together.
- **`s3_rational_stage2`:** argues that Stage I is irrational because AP of the variable factor is still rising and the fixed factor is under-used. It does not use the marginal product of the fixed factor.
- **`mt_rts`:** carries 3 marks (1 per pair).
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The AP/MP figure with negative MP below the axis is the densest.
