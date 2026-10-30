# CBSE Class 12 Political Science, Chapter 11 — India's External Relations

`cbse-12-political-science-ch11` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the CBSE 12 Political Science standard set by ch01–ch10. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch11/src/build.mjs` from `platform/`.

The build validates the schema and runs the pipeline lint, the deterministic verify checks, the word limits, the narration rules, the answer-leak scan and the editorial counts. It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 20 slides, 28 visuals, 5 distinct SVG figures), notes (6 sections), 30 flashcards, 78 questions (136 marks; 15 source parts and alternatives) |
| `tests.json` | `t_cbse12politicalscience_ch11_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch11_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups, and Section D is source-based. The two tests are disjoint and use no deck-check item. |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, identical in every chapter), `questions.mjs` (bank plus the `CHINA`, `PAKISTAN` and `NUCLEAR` chronologies, order-asserted), `build.mjs` |

## Scope

The chapter covers topics t01–t04:

- **t01, international context and non-alignment:** Nehru's goals, non-alignment as distinct from isolation and neutrality, Afro-Asian unity, Bandung 1955, Belgrade 1961, and the Janata government's "genuine non-alignment".
- **t02, China and the 1962 war:** recognition, Panchsheel 1954, Tibet and the 1959 asylum, the two disputed sectors, the war and its effects at home, and normalisation in 1976 and 1988.
- **t03, wars and peace with Pakistan:** Kashmir 1947–49, the Indus Waters Treaty 1960, the 1965 war and Tashkent 1966, the 1971 war with the Indo-Soviet Treaty and Bangladesh, Simla 1972, and Lahore and Kargil 1999.
- **t04, nuclear policy:** Bhabha, Nehru's view, China's 1964 test, the NPT, Pokhran 1974, the CTBT, Pokhran 1998, and no first use with credible minimum deterrence.

### Decks

- **Part 1:** non-alignment and China.
  - 4 checks: `tf_nam_isolation`, `fb_bandung`, `ord_china`, `tf_ceasefire`.
  - 2 worked examples: classifying a policy; planning a 5-mark answer.
- **Part 2:** Pakistan and nuclear policy.
  - 4 checks: `m_shastri_scenario`, `ord_pakistan`, `ord_nuclear`, `tf_nofirstuse`.
  - 2 worked examples: reading a source; an evaluation answer.
- **SVG figures:**
  - a three-panel diagram of the two blocs with non-alignment between them;
  - timelines of India–China, India–Pakistan and nuclear policy, with labels in four lanes;
  - a two-pillar diagram of the doctrine.
- **Narration:** at most 71 words per slide, with no symbols.

### Question bank (78 items)

| Type | Count |
|---|---|
| mcq | 33 (keys a8 b9 c8 d8) |
| assertion-reason | 8 (keys a, b, a, c, a, c, a, b) |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 3 (chronologies) |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 5 |
| source-based | 5 |

- **Source-based items:** each is an imagined SOYL document with an internal choice in part (c): an interpreter's diary from Belgrade in 1961, a Delhi editorial from December 1962, a relief volunteer's report from 1971, a college debate from 1998, and a Punjab farmer's letter from 1966.
- **Difficulty:** d1 11, d2 31, d3 29, d4 7.
- **Competency:** recall 13, understanding 24, application 13, analysis 21, evaluation 7. That puts 53% of items at application or above (lint band 45–65%).
- **Map items:** none.

## Facts a reviewer should double-check

- **Dates:**
  - Asian Relations Conference March 1947; Bandung 1955; Belgrade September 1961.
  - PRC 1949; Panchsheel 1954; Dalai Lama's asylum 1959; war October–November 1962, ended by China's unilateral ceasefire.
  - No-confidence motion 1963; CPI split 1964; full relations restored 1976; Rajiv Gandhi's visit 1988.
  - Kashmir: fighting 1947, the UN 1948, ceasefire line 1949.
  - Indus Waters Treaty 1960 (Nehru and Ayub Khan, World Bank).
  - 1965: Rann of Kutch in April, Jammu and Kashmir in August–September, UN-backed ceasefire in September; Tashkent January 1966 (Shastri and Ayub Khan, Soviet mediation).
  - 1971: Awami League won in 1970; crackdown from March 1971; Indo-Soviet Treaty August 1971; surrender at Dhaka 16 December 1971.
  - Simla July 1972 (Indira Gandhi and Z. A. Bhutto); Lahore bus journey February 1999; Kargil May–July 1999.
  - Atomic Energy Commission 1948; NPT 1968; Pokhran May 1974 and May 1998; CTBT 1996.
- **Assumptions to confirm:**
  - The NAM founders are named as the usual five.
  - Critics' view of a "Soviet tilt" is presented as a criticism, not a fact.
  - V. K. Krishna Menon's resignation is mentioned in the notes only.
  - "The USA and China leaned towards Pakistan" in 1971 is stated as the context for the Indo-Soviet Treaty.
- **Neutral wording:** Kashmir is described as "conflicting positions". The 1962 causes are the unsettled boundary and mistrust over Tibet. Kargil is described as intruders crossing the line of control. The nuclear evaluation gives both sides. Nothing after 2024 is stated and no real person is quoted.
- **SVG labels:** a script check found no overflow or overlap, but nobody has seen them rendered; they should be checked at 360 px on staging.
