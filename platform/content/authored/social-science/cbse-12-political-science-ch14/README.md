# CBSE Class 12 Political Science, Chapter 14 — Regional Aspirations

`cbse-12-political-science-ch14` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the other CBSE 12 Political Science chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch14/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 19 slides with 31 visuals (4 SVG: the range of regional demands, the three North-East issues, and two timelines); 6 notes sections; 30 flashcards; 73 questions worth 128 marks, with 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch14_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short`, and `t_cbse12politicalscience_ch14_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. Section D is source-based. The tests are disjoint and use no deck-check item. |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, identical to ch01), `questions.mjs` (with the `EVENTS` chronology, checked for order), `build.mjs` |

## Scope

All four syllabus topics are covered:
- **t01** region and the nation: India's approach, early tensions, the Dravidian movement
- **t02** Jammu and Kashmir (accession, Article 370, the two dimensions, phases, strands of separatism) and Punjab (1966 to 1992)
- **t03** the North-East: autonomy, secession (Mizo and Naga), movements against outsiders (Assam)
- **t04** lessons for accommodation and national integration, and the flexibility of the Constitution

### Decks

- **Part 1:** region and nation, Jammu and Kashmir, Punjab. 20 slides, 4 checks, 2 worked examples (reading a source; planning a 5-mark answer).
- **Part 2:** the North-East and lessons. 19 slides, 4 checks, 2 worked examples (comparing two movements; an evaluation question).
- Narration is at most 71 words per slide and uses no symbols.

### Question bank (73 items)

| Type | Count |
|---|---|
| mcq | 31 |
| assertion-reason | 7 |
| true-false | 6 |
| fill-blank | 2 |
| match | 2 |
| ordering (chronology) | 2 |
| short 2-mark | 8 |
| short 3-mark | 5 |
| long 5-mark | 5 |
| source-based | 5, each with an internal choice in part (c) |

- **Map and cartoon items:** none.
- **Difficulty:** d1 6, d2 31, d3 32, d4 4.
- **Competency:** recall 17, understanding 18, application 8, analysis 27, evaluation 3. That puts 52% of items at application or above.
- **Answer keys:** MCQ a7 b8 c8 d8; assertion-reason keys are a, a, b, d, a, c, a.
- **Spares not used in either test:**
  - the sources `sb_teacher_srinagar` and `sb_seminar_notes`
  - the shorts `s_why_regions`, `s_flexible` and `s3_kashmir_since48`
  - several objective items

## Facts and neutrality

- **Dates used:**
  - Jammu and Kashmir: accession October 1947; Sheikh Abdullah 1948, dismissed 1953, 1974 agreement; 1987 election; insurgency from 1989; 2002 election.
  - Punjab: reorganisation 1966; Akali governments 1967 and 1977; Anandpur Sahib Resolution 1973; Operation Blue Star June 1984; assassination of Indira Gandhi October 1984; Punjab Accord July 1985 (Longowal assassinated August 1985); elections 1992.
  - Tamil Nadu: anti-Hindi protests 1965.
  - North-East: Nagaland 1963; MNF campaign 1966; Meghalaya, Manipur and Tripura 1972; Sikkim 1975; Assam Movement 1979–85; Assam Accord 1985; Mizoram Accord 1986; Mizoram and Arunachal statehood 1987; Naga National Council declaration 1951.
- **2019:** the one fact after 2014 is stated once as a dated note, without evaluation: the special status ended in August 2019, Jammu and Kashmir and Ladakh became Union Territories, and the Supreme Court upheld the change in December 2023. Only one MCQ (`m_2019`) tests it, as a fact; no question asks for an opinion on it.
- **Neutral wording:**
  - The violence after October 1984 is described factually and humanely.
  - No community is blamed. The Assam Movement is described by its stated concern, migrants it regarded as outsiders, and is called not secessionist.
  - Kashmir separatism is presented as three strands, without judgement. The 1987 election is described as "followed by allegations that it was not fair".
- **Originality:** every source and scenario is imagined and labelled as written by SOYL. No real person is quoted, and no NCERT text, cartoon or exercise and no board or sample-paper item is reused (D-036).

## For a reviewer

- Check the 2019/2023 dated note against current policy for post-2014 facts.
- **Mizo famine:** it is described as "late 1950s ... felt to be poorly handled by the government of Assam". This is the standard textbook account; please confirm the wording.
- **`ar_punjab_1992`** is keyed (b): both statements are true, but the 1985 accord does not explain why elections were held in 1992.
- **SVG labels:** a script check found no overflow or overlap, but nobody has seen the labels rendered. They need a look at 360 px on staging.
