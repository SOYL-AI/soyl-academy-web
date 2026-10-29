# CBSE Class 12 Political Science, Chapter 10 — Politics of Planned Development

`cbse-12-political-science-ch10` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the CBSE 12 standard. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch10/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 19 slides with 31 visuals (3 SVG, the rest tables and flows); 6 notes sections; 31 flashcards; 75 questions worth 130 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch10_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch10_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is source-based. |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, unchanged copy), `questions.mjs`, `build.mjs` |

## Scope

The chapter is taught from a political-science angle, not as economics. CBSE 12 Economics ch07 covers the economics, and no stem repeats it.

- **t01** (34 items, plus 4 that also tag t02):
  - development as a political question: who gains and who pays
  - the liberal-capitalist and socialist models, and India's mixed economy
  - the consensus on planning and the Bombay Plan (1944)
  - the Planning Commission (March 1950)
  - the First Plan (1951) and the Second Plan (1956)
  - the debates over agriculture versus industry and public versus private sector
  - other voices: K. N. Raj, J. C. Kumarappa, Chaudhary Charan Singh
- **t02** (37 items):
  - foundations: dams, steel plants (Bhilai), institutions
  - land reform, with mixed results
  - the food crisis and the annual plans of 1966–69
  - the Green Revolution and its political effects
  - Operation Flood (1970, Verghese Kurien, the Anand pattern)
  - displacement debates
  - NITI Aayog (1 January 2015) and cooperative federalism

### Decks

- **Part 1** (20 slides: 16 visuals, 4 checks, 2 worked examples):
  - SVGs: the two models with India's middle path, and a timeline from 1944 to 2015.
  - Worked examples: sorting debate arguments, and planning a five-mark answer.
- **Part 2** (19 slides: 15 visuals, 4 checks, 2 worked examples):
  - SVG: imagined district yields as bars.
  - Worked examples: reading yield data (computed in the build: 150 per cent against 20 per cent, with the gap growing from 2 to 18), and writing a comparison answer.
- **Narration:** at most 68 words per slide (mean 51), with no symbols.

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 34 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 |
| short 2-mark | 8 |
| short 3-mark | 5 |
| long 5-mark | 5 |
| source-based | 5, each with an internal choice in part (c) |

- **Map items:** none.
- **Difficulty:** d1 7, d2 28, d3 34, d4 6.
- **Competency:** recall 16, understanding 20, application 7, analysis 24, evaluation 8. That puts 52% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a8 b9 c8 d9; assertion-reason keys are a, b, c, d, a, c, b.
- **Sources** (all imagined SOYL documents, labelled as such, with no quotation of a real person):
  - minutes of a district planning meeting (1955)
  - a farmer's letter (1973)
  - a newspaper report on a dam (1985)
  - a milk-society secretary's diary (1978)
  - an official's note after a NITI Aayog Governing Council meeting

## Facts a reviewer should double-check

- **Planning Commission:** set up in March 1950 by a resolution of the Government of India; advisory, neither constitutional nor statutory; chaired by the Prime Minister. The National Development Council (1952) is mentioned in the notes only.
- **Bombay Plan (1944):** described as a joint proposal by leading industrialists for state-led planning with a private sector.
- **The Plans:**
  - First Plan from 1951, agriculture first. K. N. Raj's view is paraphrased, not quoted, as a steady, cautious pace.
  - Second Plan from 1956, heavy industry, P. C. Mahalanobis, protective tariffs.
- **Other dated facts:** annual plans 1966–69 (the "plan holiday"). Bhilai is described as built with Soviet collaboration, with production from 1959 (`m_bhilai` solution). Operation Flood from 1970.
- **NITI Aayog:**
  - Replaced the Planning Commission on 1 January 2015, by government resolution, with the Prime Minister as chair.
  - Governing Council of chief ministers and union territory heads.
  - Does not allocate plan funds (`m_niti_funds`, `s_niti_vs_pc`, `l_niti`). The concern about states losing a forum on funds is given as one side of a debate.
- **Green Revolution regions:** Punjab, Haryana and western Uttar Pradesh.
- **Neutrality:** the public sector, the Green Revolution, displacement and the NITI Aayog change are each presented with both sides. Nothing after 2024 is stated, and no current office-holder is named.
- **Data:** all figures are imagined: the Haripur and Dhoolgarh yields (12 to 30, and 10 to 12) are computed and asserted in `build.mjs`.
- **Rendering:** nobody has seen the SVG labels rendered. The overflow and overlap script finds no issues, but they should still be checked at 360 px on staging.
