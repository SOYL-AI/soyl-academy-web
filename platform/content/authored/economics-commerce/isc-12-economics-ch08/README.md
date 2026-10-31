# ISC Class 12 Economics, Chapter 8 — Concepts of Cost

`isc-12-economics-ch08` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ISC 12 Economics pattern set by ch01–ch05. To build, run `npx tsx content/authored/economics-commerce/isc-12-economics-ch08/src/build.mjs` from `platform/`. It uses the shared lib `isc-12-economics-ch01/src/lib.mjs`, which is imported, not copied. Edit `src/`, not the JSON.

The build checks:
- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the exact-stem originality pre-check against every authored chapter.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 16 slides with 22 visuals (4 SVG cost diagrams; the rest tables and flows); 6 notes sections; 30 flashcards; 77 questions worth 162 marks |
| `tests.json` | `t_isc12economics_ch08_short` (20 marks, 50 min) and `t_isc12economics_ch08_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, imagined data, cost-schedule engine and asserts) and `build.mjs` (decks, SVGs, notes, cards, tests) |

## Scope (ISC 2027 syllabus)

All five topics are covered:
- **t01** explicit, implicit, economic, money, real, private and social cost
- **t02** opportunity cost; accounting versus economic profit
- **t03** TFC, TVC, TC, AFC, AVC, AC and MC: schedules and curves
- **t04** relationships among MC, AVC and AC
- **t05** short-run and long-run cost curves (concepts)

**Removed topic:** the derivation of the long-run and short-run cost curves is not taught. The LAC appears only as the envelope concept, with a schematic diagram and its reasons, and the items ask for concepts only.

### Decks

- **Part 1** (kinds of cost, opportunity cost, total costs): 16 slides with 4 checks. Its 2 worked examples are a farmer's opportunity cost and a bakery's accounting against economic profit.
- **Part 2** (average and marginal costs, relationships, short run and long run): 16 slides with 4 checks. Its 2 worked examples are completing a schedule from TC and building costs from AVC.
- **Narration:** at most 63 words per slide (mean 46), with no symbols or cost abbreviations.

### Question bank (77 items)

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| assertion-reason | 6 (ISC options with (d) "Both Assertion and Reason are false"; keys a b a a c a) |
| true-false | 4 |
| fill-blank | 3 |
| numerical | 6 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 9 |
| long 5-mark | 6 |
| ISC paper-style 4-mark (2 + 2), bank only | 3 |
| ISC paper-style 8-mark (4 + 4), bank only | 2 |
| case-based | 3 (dyeing unit, bakery, mug unit cost sheet), each with an internal choice |

- **Difficulty:** d1 8, d2 34, d3 29, d4 6.
- **Competency:** recall 5, understanding 27, application 22, analysis 21, evaluation 2. That puts 58% of items at application or above.

## Data and facts

All figures are imagined. They are computed in `questions.mjs` and checked by asserts.

- **Khurja mug unit:** TFC 120 and TVC = Q³ − 12Q² + 60Q, in ₹ hundred.
  - The schedule for outputs 0–10 gives TVC 0, 49, 80, 99, 112, 125, 144, 175, 224, 297 and 400.
  - Continuous MC = 3Q² − 24Q + 60 is lowest at Q = 4 (12).
  - MC = AVC = 24 at Q = 6, the AVC minimum.
  - MC = AC at Q ≈ 7.17, the AC minimum, found by bisection.
  - Schedule (discrete) MC uses TCn − TCn−1.
- **Guntur pickles** (TFC 60, TC 60–230): AVC 40, 35, 30, 30, 34; MC 40, 30, 20, 30, 50.
- **Moradabad bells** (TFC 90, AVC 30, 25, 22, 24): MC 30, 20, 16, 30.
- **Ahmedabad kites** (TFC 50, MC 20, 15, 12, 18, 25): TC 50, 70, 85, 97, 115, 140.
- **Kozhikode bakery:** accounting profit ₹55,000, implicit costs ₹50,000, economic profit ₹5,000.
- **Vidarbha farmer:** the opportunity cost of cotton is ₹65,000, the soybean income and his next best alternative.
- **Pali dyeing unit:** social cost ₹5,50,000 (₹4,00,000 private plus ₹1,50,000 external).
- **Envelope diagram:** the LAC is drawn from LAC(Q) = 20 + 0.08(Q − 10)², and each SAC = LAC + 0.5(Q − q₀)², so every SAC touches the LAC at its own plant output and lies above it elsewhere.

No real statistics are used, and no textbook, specimen or past-paper item is reused (D-036).

## Checks run

- **Build:** NO ERRORS, with pipeline lint at 0 errors and 0 warnings and 0 deterministic-verify flags.
- **Duplicates:**
  - The exact-stem pre-check passes.
  - The private 5-gram near-duplicate scan (the originality gate's rule) compared 77 stems with 21,107 others (after the 1 Nov merge of platform/main) and found 0 flags.
- **SVG labels:** the label overflow and overlap check passes on all 4 figures.
- **Fixes from the first build:**
  - An MCQ asked for MC at the 4th jar, where MC equals AVC (both ₹30), so two options matched. It now asks for the 5th jar.
  - The opportunity-cost model answer repeated a notes sentence (answer leak), so it was reworded.

## For a reviewer

- `ar_accounting_oc` is keyed (b): R (accounting cost is recorded from bills) is true but does not explain A.
- `ar_gap_meet` is keyed (c): AFC approaches zero but never reaches it.
- In `m_mc_min_first` and `l_relationship`, the minima come from the continuous cost functions (MC at Q = 4, AVC at Q = 6, AC at Q ≈ 7.2). The schedule-based items use discrete MC, where MC at the 4th and 5th hundred both equal 13.
- Nobody has seen the SVG labels rendered, so they need a look at 360 px on staging, especially the four-curve average and marginal cost diagram.
