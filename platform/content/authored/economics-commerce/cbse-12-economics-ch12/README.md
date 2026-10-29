# CBSE Class 12 Economics, Chapter 12 — Environment and Sustainable Development

`cbse-12-economics-ch12` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Indian Economic Development) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of `cbse-10-social-science-ch19` and CBSE 12 Economics ch06/ch10. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch12/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 18 slides; 27 visuals: 3 SVG, 15 tables, 9 flows; 4 + 4 checks; 2 + 2 worked examples; narration ≤ 71 words, no symbols), notes (6 sections), 30 flashcards, 71 questions (127 marks; 3 case-based items with internal choice in part (c)) |
| `tests.json` | `t_cbse12economics_ch12_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch12_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item, disjoint, no deck-check items |
| `src/` | `lib.mjs` (same copy as ch01), `questions.mjs` (bank and computed figures), `build.mjs` |

## Scope
- **t01** the environment (biotic and abiotic), its four functions, absorptive and carrying capacity, renewable and non-renewable resources, the supply–demand reversal behind the crisis, threats to India's environment (land degradation, biodiversity loss, air and water pollution; stated qualitatively), opportunity costs of degradation, global warming and ozone depletion with the Montreal, Kyoto and Paris agreements.
- **t02** sustainable development (Brundtland idea, paraphrased), why it matters for India, Herman Daly's principles (paraphrased), strategies: solar, wind and mini-hydel power; LPG and gobar gas in villages and CNG in cities; traditional knowledge; biocomposting; biopest control; a balanced view of growth and the environment.

### Decks
- **Part 1** (19 slides): route map, biotic/abiotic table, four-functions SVG, renewable vs non-renewable, the two conditions of carrying capacity, **worked example 1** (imagined forest: felling 2,000 t vs regrowth 1,500 t, net loss 500 t, stock 30,000 t lasts 60 years), supply–demand reversal (schematic SVG, labelled as such), threats to India, land-degradation flow, **worked example 2** (opportunity cost of dirty water to an imagined family: ₹3,600 + ₹2,400 + ₹1,800 = ₹7,800), global warming flow, agreements table, ozone flow, summary, exam tips. Four checks.
- **Part 2** (18 slides): route map, meaning of sustainable development, why it matters for India, Daly's principles, **worked example 3** (bamboo quota: regrowth 800 vs cutting 1,000, cut 200 poles or 20 per cent), non-conventional energy, cleaner fuels, **worked example 4** (solar panels ₹1,20,000, saving ₹30,000 a year, payback 4 years; SVG cumulative bars), gobar gas flow, traditional knowledge, biocomposting and biopest control, a balanced two-column view, summary, exam tips. Four checks.

### Question bank (71 items)
mcq 28 (keys a7 b7 c7 d7) · assertion-reason 7 (a3 b1 c2 d1) · numerical 6 (+ 3 inside cases) · true-false 4 (2 true, 2 false) · fill-blank 2 · match 2 · ordering 1 · short 7 (2 marks) + 5 (3 marks) · long 6 · case-based 3 (Neelsar lake waste table, Kesarpur fuel switch, Sagarpatnam fisheries report). Difficulty d1 10, d2 33, d3 24, d4 4. Competency recall 6, understanding 23, application 21, analysis 18, evaluation 3: **59% at application or above** (band 45–65%; three routine one-step items tagged understanding under D-035). Topics t01 40, t02 30, both 1.

**Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark (global warming | strategies); D Kesarpur. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C India's environment + (Daly | "grow first, clean up later"); D Neelsar lake and Sagarpatnam fisheries. Spare items: `l_opp_cost`, `s_ozone`, `s3_traditional` and several objective items.

## Data and facts
- **All figures are imagined** and computed by the build (asserts in `questions.mjs` and `build.mjs`): forest 48,000 t lasting 80 years; groundwater overdraft 25 per cent; pasture excess 30 cattle; pollution cost ₹7,500; biogas firewood saving 2,190 kg; school solar payback 5 years; Neelsar excess 10 t (equal cut 20 per cent); Kesarpur switch 65 per cent; fishing cut 25 per cent.
- **Real-world facts (please double-check):** Montreal Protocol 1987 (ozone-depleting substances); Kyoto Protocol 1997 (emission cuts for industrialised countries); Paris Agreement 2015 (national plans by all countries to limit warming; stated broadly, no temperature targets tested); Brundtland Commission (World Commission on Environment and Development) report 1987, definition paraphrased, not quoted; Central Pollution Control Board set up in 1974 (notes only, not tested); CFCs and halons as the main ozone-depleting substances.
- **No Indian environmental statistics** are stated; India's threats are described qualitatively. Policy wording is neutral: the "grow first, clean up later" question and the balanced-view slide give both sides.
- **Originality:** no NCERT text, box, table or exercise is reused; every case, report and figure is a SOYL original and labelled as imagined. Stems are written specifically to avoid identical stems elsewhere in the bank.

## Gaps
- The three SVG diagrams (four functions, schematic supply–demand reversal, solar payback bars) have labels placed by coordinates and have not been seen rendered; check at 360 px on staging.
- The supply–demand reversal chart is schematic by design (captioned "Schematic only, with no real figures").
