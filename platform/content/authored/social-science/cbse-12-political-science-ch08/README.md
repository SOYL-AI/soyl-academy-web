# CBSE Class 12 Political Science, Chapter 8 — Challenges of Nation-Building

`cbse-12-political-science-ch08` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036) to the standard of the CBSE 12 Economics and Business Studies chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch08/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 19 slides with 25 visuals (3 SVG: the three-challenges diagram, a 1947–1960 timeline and a timeline of new states to 2014; the rest tables and flows); 6 notes sections; 30 flashcards; 76 questions worth 138 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch08_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short`, and `t_cbse12politicalscience_ch08_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long` |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, unchanged copy), `questions.mjs`, `build.mjs` |

## Scope

All three syllabus topics are covered:
- **t01** the three challenges (unity, democracy, development); Partition (two-nation theory, the four problems of drawing the line, consequences); the secular choice (29 tags, plus 2 shared with t03).
- **t02** integration of the princely states (paramountcy, the government's approach, the Instrument of Accession, Patel and V. P. Menon, Junagadh, Hyderabad, Manipur, Kashmir in brief) (21 tags, plus 1 shared).
- **t03** reorganisation of states (early caution, the Andhra movement, the SRC and the 1956 Act, later states to 2014, assessment) (23 tags, plus shared).

### Decks

- **Part 1:** three challenges and Partition. 16 slides, 4 checks, 2 worked examples (planning a 5-mark answer; reading a source).
- **Part 2:** princely states and reorganisation. 19 slides, 4 checks, 2 worked examples (reading a timeline; an evaluation question).
- Narration is at most 68 words per slide (mean 50) and uses no symbols.

### Question bank (76 items)

| Type | Count |
|---|---|
| mcq | 32 |
| assertion-reason | 7 |
| true-false | 5 |
| fill-blank | 2 |
| match | 2 |
| ordering | 2 (chronology) |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** a railway clerk's diary from Amritsar in 1947; a Bengal schoolteacher's letter; a princely-state dewan's notebook; a newspaper report from Madras in 1952; school-debate notes from 2005. All are imagined SOYL documents (`soyl-original`) labelled as such, and none quotes a real person.
- **Map items:** none. Cartoons: none.
- **Difficulty:** d1 14, d2 31, d3 26, d4 5.
- **Competency:** recall 19, understanding 18, application 10, analysis 24, evaluation 5. That puts 51% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a8 b8 c8 d8; assertion-reason keys are a3 b2 c2.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ + 1 assertion-reason. **B:** two 2-mark + one 3-mark. **C:** one of two longs (integration / reorganisation). **D:** the railway-clerk source. |
| Long | **A:** 8 MCQ + 2 assertion-reason. **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** the three-challenges long + (Partition or unity-with-diversity). **D:** the dewan's notebook and the 1952 report. |

- The tests are disjoint and use no deck-check item.
- Spares not used in either test: `s_three_challenges`, `s_approach`, `s_src`, `s3_difficult`, `s3_later`, `l_compare_cases`, `sb_boundary`, `sb_assembly`.

## Facts a reviewer should double-check

- **Dates:**
  - 15 August 1947.
  - Junagadh plebiscite in February 1948.
  - Hyderabad: Standstill Agreement in November 1947; police action in September 1948.
  - Manipur: elections under universal adult franchise in 1948; merger agreement in September 1949, signed without consulting the elected assembly.
  - Kashmir accession in October 1947, mentioned in one line and left to Chapter 14.
  - Gandhi assassinated on 30 January 1948.
  - Potti Sriramulu died in December 1952; Andhra State formed in October 1953.
  - SRC appointed in 1953; the 1956 Act created 14 states and 6 union territories.
  - Later states: Maharashtra and Gujarat 1960, Nagaland 1963, Punjab and Haryana 1966, Meghalaya, Manipur and Tripura 1972, Mizoram and Arunachal Pradesh 1987, Chhattisgarh, Uttarakhand and Jharkhand 2000, Telangana 2014.
  - The 2019 reorganisation of Jammu and Kashmir is **not** mentioned (left to Chapter 14). Nothing after 2024 is stated.
- **Numbers:** about 565 princely states. No death or migration figures are given; the text says that estimates vary widely.
- **Neutral wording:**
  - Partition violence is described as affecting people of every community, without blaming any group.
  - The Hyderabad events are stated as the Nizam's wish for independence, the Telangana peasant movement, Razakar violence and the police action.
  - Manipur's merger is presented as a source of grievance because the elected assembly was not consulted.
- **`ar_gandhi`:** keyed (b). Both statements are true, but the assassination does not explain his 1947 work in riot-hit areas.
- **Rendering:** nobody has seen the SVG labels rendered. A script check found no overflow or overlap, but they should be checked at 360 px on staging.
- **Originality:** no NCERT text, box, cartoon or exercise and no board or sample-paper item is reused (D-036).
