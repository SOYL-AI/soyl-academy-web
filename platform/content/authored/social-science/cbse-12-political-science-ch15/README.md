# CBSE Class 12 Political Science, Chapter 15 — Recent Developments in Indian Politics

`cbse-12-political-science-ch15` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the other CBSE 12 Political Science chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch15/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 18 slides with 23 visuals (3 SVG: a 1989–2024 timeline of governments, a seats-against-majority bar chart, and an imagined coalition-arithmetic bar); 6 notes sections; 30 flashcards; 79 questions worth 134 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch15_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch15_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups, and Section D is source-based. The two tests share no questions and use no deck-check items. |
| `src/` | `lib.mjs` (the shared CBSE 12 authoring library, unchanged), `questions.mjs` (the question bank plus computed figures with assertions), `build.mjs` |

## Scope

All four syllabus topics are covered:
- **t01** context of the 1990s and the coalition era
- **t02** Mandal and the political rise of the OBCs
- **t03** communalism, secularism and democracy; Ayodhya
- **t04** the new consensus, and the elections and governance of 2014–2024

### Question bank (79 items)

| Type | Count |
|---|---|
| mcq | 36 |
| assertion-reason | 8 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering | 1 |
| numerical | 4 |
| short 2-mark | 7 |
| short 3-mark | 5 |
| long 5-mark | 5 |
| source-based | 5, each with an internal choice in part (c) |

- **Map items:** none.
- **Difficulty:** d1 9, d2 34, d3 33, d4 3.
- **Competency:** recall 17, understanding 22, application 13, analysis 24, evaluation 3. That puts 51% of items at application or above.
- **Answer keys:** MCQ keys are a9 b9 c9 d9.
- **Spares not used in either test:** `s_state_role`, `s3_three_results`, `sb_mockhouse`, `sb_explainer`, and several objective items.

## Neutrality and facts (please double-check)

- **Neutrality rules:**
  - Facts are stated without evaluation, and no evaluative adjectives are applied to any party, government or leader.
  - No question asks a student to judge a current party, government or leader.
  - The one debate item (`l_coal_single`, coalition against single-party majority) asks for both sides and a conclusion on constitutional principles.
  - Nothing after 2024 is stated.
- **Governments at the Centre:**
  - National Front under V. P. Singh, 1989–90, with outside support from the BJP and the Left.
  - Chandra Shekhar, 1990–91, with Congress support.
  - Congress under P. V. Narasimha Rao, 1991–96.
  - A BJP-led government in 1996 that lasted about two weeks.
  - United Front under H. D. Deve Gowda, then I. K. Gujral, 1996–98, with Congress support from outside.
  - NDA under A. B. Vajpayee, 1998–2004; it lost a confidence vote by one vote in April 1999 and returned after the 1999 election.
  - UPA under Manmohan Singh, 2004–14, with Left support until 2008.
  - NDA under Narendra Modi from 2014.
- **Other dates:**
  - Rajiv Gandhi was assassinated in May 1991 during the campaign in Tamil Nadu.
  - The Mandal Commission was appointed in 1978, reported in 1980, and its recommendation was announced for implementation in August 1990.
  - In Indra Sawhney (1992) the Supreme Court upheld 27 per cent OBC reservation, with a 50 per cent ceiling and the creamy layer excluded.
  - Central reservation is 27 + 15 + 7.5 = 49.5 per cent.
  - The BSP was founded in 1984 under Kanshi Ram.
- **Ayodhya and communal violence:**
  - Shah Bano judgment 1985 and the 1986 law; the locks were opened in 1986 after a court order; a rath yatra in 1990.
  - The demolition was on 6 December 1992. It was followed by violence, the dismissal of the Uttar Pradesh government and a commission of inquiry.
  - In 2002, after a fire on a train at Godhra, violence spread across Gujarat in which many people, most of them Muslims, lost their lives, and the NHRC examined the state's response. Victims are described factually, and no community is blamed.
  - On 9 November 2019 the Supreme Court gave the site for a temple through a trust and directed five acres elsewhere in Ayodhya for a mosque.
- **Lok Sabha results:** the BJP's seats are given as the commonly reported 282 (2014), 303 (2019) and 240 (2024). The majority mark is 272 of 543. In 2024 the NDA formed the government and Narendra Modi was sworn in for a third term in June 2024. Please confirm these seat counts, or remove them, before release.
- **Imagined material:** every source, the mock parliament, the towns and their speakers are imagined, labelled and computed where numeric. No real person is quoted, and no NCERT text, cartoon or board or sample-paper item is reused (D-036).
- **SVG rendering:** nobody has seen the SVG labels rendered. They pass the overflow and overlap script, but they should be checked at 360 px on staging.
