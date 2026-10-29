# CBSE Class 12 Economics, Chapter 10 — Rural Development

`cbse-12-economics-ch10` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Indian Economic Development) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of `cbse-10-social-science-ch19` and CBSE 12 Economics ch02/ch06. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch10/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 18 slides; 30 visuals: 3 SVG, 15 tables, 12 flows; 3 + 4 checks; 2 + 2 worked examples; narration ≤ 70 words, no symbols), notes (7 sections), 31 flashcards, 78 questions (139 marks; 3 case-based items with internal choice in part (c)) |
| `tests.json` | `t_cbse12economics_ch10_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch10_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item, disjoint, no deck-check items |
| `src/` | `lib.mjs` (same copy as ch01), `questions.mjs` (bank and computed figures), `build.mjs` |

## Scope
- **t01** meaning of rural development; rural credit (need and gestation period; non-institutional lenders; commercial banks after 1969, RRBs 1975, cooperatives, NABARD 1982; SHGs and microcredit; problems of institutional credit); agricultural marketing (meaning, malpractices, distress sales, regulated markets, infrastructure, cooperative marketing, MSP, buffer stocks, PDS, alternative channels, price spread); dairy cooperatives (Anand pattern, Operation Flood).
- **t02** diversification (two aspects; why; animal husbandry, fisheries, horticulture, non-farm work, IT) and organic farming (meaning, benefits, limitations, evaluation).
- **Excluded:** Poverty and Infrastructure (deleted from the 2026-27 syllabus); roads and storage appear only as marketing measures.

### Decks
- **Part 1** (credit and marketing): route map, areas of rural development, gestation flow, credit-source tree, banking timeline, **worked example 1** (moneylender 4 per cent a month vs bank 8 per cent a year on ₹30,000 for 4 months: ₹4,800 vs ₹800; SVG bar chart), SHG flow and two-column appraisal, credit problems, marketing chain, losses at the market, **worked example 2** (onion price spread ₹21, farmer's share 40 per cent; SVG stacked bar), measures, MSP–buffer–PDS flow, summary, exam tips. Four checks.
- **Part 2** (cooperatives, diversification, organic farming): Anand three-tier flow, gains from cooperatives, two aspects of diversification, why diversify, allied activities, **worked example 3** (non-crop share 40 per cent; SVG bars), horticulture and fisheries value chain, IT flow, organic vs chemical table, **worked example 4** (one imagined acre: organic net ₹66,200 vs chemical ₹56,000, with the caution that the premium needs buyers), two-column appraisal, summary, exam tips. Four checks.

## Data and facts
- **All figures are imagined** and computed by the build (asserts in `questions.mjs` and `build.mjs`): moneylender ₹6,000 vs bank ₹700 (saving ₹5,300); tomato farmer's share 30 per cent; storage gain ₹15,000; SHG fund ₹36,000; non-crop share 40 per cent; organic vs chemical ₹80,000 vs ₹68,000; milk payment ₹12,000; faulty-scale loss ₹150; Kalyanpur institutional share 67 per cent; Hiware farmer +₹8, consumer −₹4 a kg.
- **Real-world facts (please double-check):** major banks nationalised 1969; RRBs set up 1975; NABARD set up 1982; Operation Flood began 1970 and spread the Anand (Gujarat) cooperative pattern; India among the world's largest milk producers (stated qualitatively); Sikkim declared a fully organic state in 2016 (notes only, not tested). MSP covers notified crops only; buffer stocks held by the Food Corporation of India.
- No credit-share, output or price statistics for India are stated. Farmers' markets are described generically (no scheme names tested).
- Policy wording is neutral: SHGs, IT and organic farming are evaluated with both benefits and limits; loan waivers are not discussed.

### Question bank (78 items)
mcq 28 (keys a7 b7 c7 d7) · assertion-reason 7 · numerical 8 · true-false 5 · fill-blank 2 · match 2 · ordering 1 · short 9 (2 marks) + 7 (3 marks) · long 6 · case-based 3 (Kalyanpur credit table, Hiware farmers' market, a hill farmer's organic diary). Difficulty d1 9, d2 35, d3 31, d4 3. Competency recall 7, understanding 25, application 21, analysis 20, evaluation 5: **59% at application or above** (band 45–65%). Topics t01 53, t02 25.

## Verifier notes
- Every MCQ solution explains the distractors; keys are set in code by the shared lib. Assertion-reason keys a, d, b, a, c, a, a.
- Answer-leak scan: no key-side sentence of 60+ characters appears in decks, notes, flashcards or public question fields.
- Diagram labels in the three SVG figures are placed by coordinates and have not been seen rendered; check at 360 px on staging.

## Gaps
- No map item (the chapter has no map work).
