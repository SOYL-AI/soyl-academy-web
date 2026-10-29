# CBSE Class 12 Political Science, Chapter 6 — Environment and Natural Resources

`cbse-12-political-science-ch06` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the CBSE 12 standard set by the Economics and Business Studies chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch06/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 18 slides with 25 visuals (5 SVG, the rest tables and flows); 6 notes sections; 30 flashcards; 72 questions worth 133 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch06_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch06_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. Section D is source-based; the two tests share no questions and use no deck-check item. |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, identical in every chapter), `questions.mjs`, `build.mjs` |

## Scope

All four syllabus topics are covered:
- **t01** why the environment entered world politics; Limits to Growth and Stockholm/UNEP (1972); Brundtland (1987); the Rio Earth Summit (1992), its outcomes and the North–South divide; criticism of Agenda 21
- **t02** global commons (atmosphere, Antarctica, ocean floor, outer space) and why they are hard to manage; the Antarctic Treaty and the Montreal Protocol; CBDR; the UNFCCC, Kyoto and Paris
- **t03** India's stand: Kyoto ratified in 2002 with no binding cut; per capita and historical arguments; CBDR; finance and technology; right to development; domestic measures
- **t04** environmental movements (forest, anti-dam, against mining); resource geopolitics (oil, shared rivers); indigenous peoples

### Decks

- **Part 1:** global concerns, commons and shared responsibility. 20 slides, 4 checks.
  - Worked examples: reading a summit-diary source; comparing Kyoto and Paris.
  - SVGs: a 1959–2015 milestones timeline, the four global commons and a CBDR diagram.
- **Part 2:** India, movements, resources and indigenous peoples. 18 slides, 4 checks.
  - Worked examples: planning a 5-mark answer on India's stand; one valley source tested on three concepts.
  - SVGs: the three kinds of movement and a shared river with an upstream dam.
- Narration is at most 64 words per slide (mean 50) and uses no symbols.

### Question bank (72 items)

| Type | Count |
|---|---|
| mcq | 29 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 |
| short 2-mark | 8 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5 |

- **Source-based items:** five imagined, labelled documents: a delegate's summit diary, a research-station logbook, a negotiators' briefing note, a valley newspaper report and a school-assembly talk. Each has an internal choice in part (c).
- **Map items:** none.
- **Difficulty:** d1 7, d2 30, d3 32, d4 3.
- **Competency:** recall 12, understanding 19, application 11, analysis 27, evaluation 3. That puts 57% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a7 b7 c7 d8; assertion-reason keys are a, b, a, c, a, b, d.
- **Spares not used in either test:**
  - shorts: `s_rio_divide`, `s_india_home`, `s3_sustainable`, `s3_oil_geo`
  - long: `l_indigenous_geo`
  - sources: `sb_ice_station`, `sb_school_assembly`

## Facts a reviewer should double-check

- **Dates:**
  - Antarctic Treaty 1959, with its environmental protocol in 1991.
  - *Limits to Growth* (Club of Rome) 1972; Stockholm conference and UNEP 1972.
  - Brundtland Report 1987; Montreal Protocol 1987; the ozone hole over Antarctica found in the mid-1980s.
  - Rio Earth Summit June 1992, with the climate and biodiversity conventions, forest principles and Agenda 21.
  - Kyoto 1997; India signed and ratified it in August 2002; Paris 2015.
  - Energy Conservation Act 2001.
  - World Council of Indigenous Peoples 1975; UN Working Group on Indigenous Populations 1982; UN Declaration 2007.
- **Chipko:** dated to the 1970s, in the Himalayan hills of present-day Uttarakhand.
- **Anti-dam campaign abroad:** the Australian example is described only as "a well-known campaign to save a wild river in Australia in the early 1980s"; the river is not named.
- **India's stance:** "signed and ratified" follows the usual textbook wording; strictly, India acceded to the protocol in August 2002. India's position is summarised as equity, low per capita emissions, historical responsibility, CBDR, finance and technology, and the right to development. No emission or energy statistics are stated.
- **Not covered:** nothing after 2024, no current climate targets and no current office-holders. Oil reserves are described only as "concentrated in a few regions such as West Asia".
- **Originality:** every source and scenario is imagined and labelled, and no real person is quoted. No NCERT text, cartoon, box or exercise and no board or sample-paper item is reused (D-036).
- **SVG rendering:** a script check finds no label overflow or overlap in the 5 SVGs. The timeline uses four label tiers to avoid collisions. Nobody has seen them rendered, so they should be checked at 360 px on staging.
