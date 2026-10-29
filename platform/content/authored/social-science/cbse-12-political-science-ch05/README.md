# CBSE Class 12 Political Science, Chapter 5 — Security in the Contemporary World

`cbse-12-political-science-ch05` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036) to the standard of the CBSE 12 Economics and Business Studies chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch05/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 18 slides with 26 visuals (5 SVG, 16 tables, 5 flows); 6 notes sections; 30 flashcards; 73 questions worth 131 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch05_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch05_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long` |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, unchanged copy), `questions.mjs`, `build.mjs` |

## Scope

All four syllabus topics are covered:
- **t01** traditional security, 25 tags: meaning; deterrence, defence, balance of power and alliances; internal security; limits on war; disarmament, arms control and confidence building with the NPT, BWC, ABM Treaty and CWC
- **t02** non-traditional security, 9 tags: human security (narrow and broad) and global security
- **t03** new threats, 19 tags: terrorism, human rights and the intervention debate, global poverty, refugees and internally displaced persons, epidemics
- **t04** cooperative security and India's four-part strategy, 16 tags

### Decks

- **Part 1:** traditional and non-traditional security. 19 slides, 4 checks, 2 worked examples (name the component; abolish or regulate?).
- **Part 2:** new threats, cooperation and India. 18 slides, 4 checks, 2 worked examples (reading a source; planning a 5-mark answer).
- The 5 SVGs are three choices facing a threatened state, a treaty timeline, nested narrow and broad human security, refugees against internally displaced persons across a border, and India's four pillars.
- Narration is at most 70 words per slide (mean 48) and uses no symbols.

### Question bank (73 items)

| Type | Count |
|---|---|
| mcq | 31 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 5 |
| source-based | 5 |

- **Source-based items:** an imagined defence review (Veloria), a relief worker's diary (Kesmara), a security white paper (Dravidia), a school debate, and a regional health accord (Saurya Islands). Each has an internal choice in part (c).
- **No map items:** the chapter has no map work.
- **Difficulty:** d1 6, d2 33, d3 30, d4 4.
- **Competency:** recall 7, understanding 24, application 15, analysis 22, evaluation 5. That puts 58% of items at application or above (band 45–65%).
- **Answer keys:** MCQ keys are a7 b8 c8 d8; assertion-reason keys are a, c, a, b, a, d, a.

### Tests

- **Short test:**
  - Section A: 3 MCQs and 1 assertion-reason.
  - Section B: two 2-mark shorts and one 3-mark short.
  - Section C: one of two 5-mark answers.
  - Section D: the relief-camp source.
- **Long test:**
  - Section A: 8 MCQs and 2 assertion-reason.
  - Section B: 2 + 2 + (2 or 2) + 3 + (3 or 3) marks.
  - Section C: the question on India's strategy, then one of two.
  - Section D: the defence review and the white paper.
- Both tests follow their blueprint item for item, share no questions and use no deck-check item.
- **Spare items** not used in either test: two sources (the debate and the health accord), `s3_traditional_coop`, `s3_global_why`, `s_disarm_control`, `s_confidence` and `s_india_internal`.

## Facts a reviewer should double-check

1. **Treaty years:**
   - NPT 1968: states that had tested before 1 January 1967 keep their weapons.
   - Biological Weapons Convention 1972 (the year it was opened for signature).
   - ABM Treaty 1972, between the USA and the USSR.
   - Chemical Weapons Convention 1992 (the year it was adopted).
2. **Classification:** the NPT and the ABM Treaty are taught as arms control; the BWC and CWC as disarmament.
3. **India:**
   - nuclear tests in 1974 and 1998
   - has not signed the NPT and calls it discriminatory
   - stated doctrine of credible minimum deterrence and no first use
   - four components of its security strategy (military capability, international norms and institutions, internal challenges handled democratically, economic development)
4. **Epidemics:** HIV/AIDS is named. Later outbreaks and pandemics are mentioned only in general terms, and nothing after 2024 is stated.
5. **Neutrality:** humanitarian intervention is presented with arguments on both sides. No current conflict, country or leader is discussed or judged.
6. **Originality:** every source, country and speaker is imagined and labelled as such. There are no quotations of real people, and no NCERT text, cartoon, box or exercise or board/sample-paper item is reused.
7. **SVG labels:** nobody has seen them rendered. A script check found no overflow or overlap, but they should still be checked at 360 px on staging.
