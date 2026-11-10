# CBSE Class 12 History, Chapter 1 — Bricks, Beads and Bones: The Harappan Civilisation

`cbse-12-history-ch01` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch01/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 21 + 21 slides with 35 visuals (5 SVG: three phases, Mohenjodaro schematic plan, courtyard-house plan, layers versus flat units, 1850–1950 discovery timeline; the rest tables and flows); 7 notes sections; 32 flashcards; 75 questions worth 138 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12history_ch01_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch01_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `lib.mjs` (shared CBSE 12 History library, kept once in this folder and imported by every CBSE 12 History chapter), `questions.mjs`, `build.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** subsistence strategies (food, ploughs, fields, water works); the three phases; planning at Mohenjodaro (Citadel and Lower Town, platforms first, brick ratio, drains, houses, Great Bath, warehouse) (14 tags, plus 2 shared with t05).
- **t02** social differences (burials; utilitarian objects and luxuries), craft production (Chanhudaro, materials, identifying workshops), procurement (settlements near sources, expeditions, distant lands) (18 tags, plus 1 shared).
- **t03** seals and sealings, script, weights, the question of authority (three views; the priest-king label) (15 tags, plus 1 shared).
- **t04** the end of the cities (Late Harappan, explanations, the invasion idea); discovery (Cunningham, Sahni, Banerji, Marshall, Wheeler, sites in India after 1947); interpretation of objects (21 tags, plus 3 shared).
- **t05** sources: archaeological reports. Carried by the five source-based items (each tagged with its content topic and t05) and two MCQs on reading reports; the decks teach it in the worked example on reading a report.

### Decks

- **Part 1:** farming, cities and craft (t01, t02). 21 slides, 3 checks, 3 worked examples (planning a 5-mark answer; spotting a craft centre; weighing evidence).
- **Part 2:** seals, rulers, decline and discovery (t03, t04, t05). 21 slides, 4 checks, 3 worked examples (weighing three views; dating by layers; reading an archaeological report).
- Narration is at most 66 words per slide (mean 47) and uses no symbols or quote marks.

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 30 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 (one chronology, one by layers) |
| short 2-mark | 10 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an excavation assistant's field diary from Mohenjodaro's Lower Town; a museum guide's notes on a craft town; a SOYL summary of what a report records about a storeroom (seal, sealing, weights); an imagined survey report along a dried riverbed; an imagined letter from a trench supervisor. Four are imagined documents and one is a labelled SOYL summary (`soyl-original`); none quotes a real person or any textbook source.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 12, d2 28, d3 27, d4 8.
- **Competency:** recall 13, understanding 26, application 15, analysis 19, evaluation 2. That puts 48% of items (36 of 75) at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a7 b7 c8 d8; assertion-reason keys are a4 b1 c1 d1.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (planning, priest-king label, Wheeler's method) + 1 assertion-reason (burials). **B:** two 2-mark (drains; Late Harappan) + one 3-mark (a site beside a steatite source). **C:** one of two longs (craft and procurement / Cunningham, Marshall and Wheeler). **D:** the seal-and-storeroom summary. |
| Long | **A:** 8 MCQ + 2 assertion-reason (Chanhudaro; decline). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** the Mohenjodaro planning long + (authority or decline). **D:** the field diary and the survey report. |

- The tests are disjoint and use no deck-check item (deck checks: `m_citadel`, `fb_bricks`, `m_shortughai`, `fb_steatite`, `tf_palace`, `m_late`, `ord_discovery`).
- Spares used in neither test nor deck: `m_period`, `m_houses`, `m_warehouse`, `tf_rice`, `mt_water`, `m_burial_inf`, `m_luxury`, `m_luxury_dist`, `m_meluhha`, `fb_meluhha`, `mt_procure`, `tf_ships`, `s_craft_identify`, `s_script`, `s_weights`, `s_interpret`, `s3_cunningham`, `s3_authority`, `l_social`, `m_seal_use`, `m_seal_new`, `m_authority_view`, `ar_standard`, `ar_authority`, `m_dales`, `m_cunningham_interest`, `m_method`, `m_regions`, `m_report_limit`, `m_report_infer`, `ar_marshall`, `ar_invasion`, `tf_late`, `ord_layers`, `sb_craft`, `sb_dig`.

## Facts a reviewer should double-check

- **Dates:**
  - Mature Harappan c. 2600–1900 BCE; most mature sites in Cholistan and nearby areas abandoned by about 1800 BCE.
  - Cunningham began work for the Survey in 1861 and later became its first Director-General (the year he took that title is not stated).
  - Sahni at Harappa 1921; Banerji at Mohenjodaro 1922; Marshall's announcement 1924; Wheeler Director-General from 1944; "after 1947" for the sites in India.
- **Numbers:** brick ratio 4:2:1; about 375–400 signs; lower weights 1, 2, 4, 8, 16, 32 and so on, higher ones decimal (the imagined weight set in `m_weights` is 1, 2, 4, 8, 16, 32, 64, then 640, 6,400 and 64,000, each larger value ten times the one before; it is illustrative).
- **Sites and materials:** Cholistan and Banawali plough models; Kalibangan ploughed field (furrows at right angles, "perhaps two crops"); canals at Shortughai; reservoirs at Dholavira; shell at Nageshwar and Balakot; lapis lazuli at Shortughai; Lothal near carnelian sources around Bharuch; steatite from south Rajasthan and north Gujarat; copper from the Khetri region and Oman; gold "probably" south India.
- **Great Bath and warehouse:** described only as a watertight tank with steps and a large building once called the granary. The claim in `m_warehouse` that the older name assumed a use the remains cannot establish is a cautious reading; no statement is made about whether grain was found.
- **Distant lands:** Meluhha "probably" the Harappan region, Dilmun Bahrain, Magan "probably" Oman. `m_meluhha` takes as its key that seals of the Harappan type have been found at Mesopotamian sites (reported from Mesopotamian cities; please confirm).
- **Invasion idea:** `ar_invasion` and `s3_invasion` rest on George Dales' critique of the massacre reading of the Mohenjodaro skeletons; the wording says only that they do not show a single event.
- **Rendering:** the five SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the labels at 360 px on staging (the plan, house and layers figures have the most text).
- **Competency tags:** source parents take the tag of most parts: in each source part (a) is recall and part (b) is a one-mark inference tagged application (except in the diary and the survey report where the parts differ), and part (c) is application or analysis. After producer review, 14 items were retagged to understanding and 12 rewritten into higher-order items.
- **Originality:** no NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). Real people are named but never quoted.
