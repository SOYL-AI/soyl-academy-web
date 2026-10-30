# CBSE Class 12 Political Science, Chapter 12 — Challenges to and Restoration of the Congress System

`cbse-12-political-science-ch12` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036) to the standard of the CBSE 12 Economics and Business Studies chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch12/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 18 slides with 29 visuals (3 SVG, 18 tables, 8 flows); 6 notes sections; 30 flashcards; 78 questions worth 141 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch12_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch12_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is source-based. |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, unchanged copy), `questions.mjs`, `build.mjs` |

## Scope

All three syllabus topics are covered:
- **t01** political succession (23 tags, plus 2 shared): the fears of 1964, Nanda as interim, Kamaraj's consultations and Shastri, the 1965 war and food crisis, Tashkent, the 1966 secret ballot (Indira Gandhi and Morarji Desai), and the Syndicate
- **t02** the fourth general election of 1967 and coalitions (25 tags, plus 1 shared): the economic background and the 1966 devaluation, Lohia's non-Congressism, the results at the Centre and in the states, the DMK in Madras, SVD coalitions, defection and "Aya Ram, Gaya Ram"
- **t03** the Congress split and the 1971 election (27 tags, plus 3 shared): the rivalry with the Syndicate, the 1969 presidential election (Giri and Reddy, the conscience vote), the Congress (O) and Congress (R), bank nationalisation, privy purses, the Grand Alliance, *garibi hatao*, the 1971 result and how the restored Congress differed

### Decks

- **Part 1 (19 slides):** succession and the 1967 shock.
  - Worked examples: planning a five-mark answer on succession, and the defection arithmetic of the imagined 60-member Sonbhadra assembly (with an SVG bar chart).
  - SVG timeline 1964–71.
  - Four checks.
- **Part 2 (18 slides):** split and restoration.
  - Worked examples: reading a source on the split, and comparing the old and restored Congress.
  - SVG diagram of the 1969 split.
  - Four checks.
- **Narration:** at most 58 words per slide (mean 43), with no symbols.

### Question bank (78 items)

| Type | Count |
|---|---|
| mcq | 32 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 (chronology) |
| numerical | 2 (imagined assembly) |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5 |

- **Sources:** each is an imagined document written by SOYL and labelled as such: an official's diary 1964–66, a 1967 news report from Sonbhadra, a student's rally notes 1966, a party worker's letter 1969, and a researcher's field notes 1971. Each has an internal choice in part (c).
- **Map and cartoon items:** none.
- **Difficulty:** d1 6, d2 34, d3 34, d4 4.
- **Competency:** recall 12, understanding 25, application 14, analysis 23, evaluation 4. That puts 53% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a8 b8 c8 d8; assertion-reason keys are a, b, c, a, b, a, d; true-false is 1 true, 3 false.
- **Spares not used in either test:** the rally and the 1971 field-notes sources, `l_syndicate`, `s3_indira_early`, `s3_lohia_strategy`, `s_1966_contest`, `s_defection_meaning` and several objective items.

## Data and facts

- **Imagined figures, computed and asserted in `questions.mjs`:** in the Sonbhadra assembly of 60 seats, the majority mark is 31; a front with 33 seats has a surplus of 2; 4 defections leave 29, which is 2 short.
- **Real results, stated only broadly:** the Congress kept a narrow Lok Sabha majority in 1967, its lowest so far, and lost several states; the Congress (R) won about two-thirds of Lok Sabha seats in 1971. No seat or vote figures are given.
- **Dates used:**
  - 1964 to 1966: Nehru died May 1964; Nanda acting Prime Minister; Shastri took office June 1964; war with Pakistan 1965; Tashkent Declaration and Shastri's death January 1966; Indira Gandhi defeated Morarji Desai in a secret ballot of Congress MPs January 1966; rupee devalued 1966.
  - 1967: the ten-point programme; the DMK won a majority on its own in Madras; the "Aya Ram, Gaya Ram" phrase comes from a Haryana MLA in 1967.
  - 1969: Zakir Husain's death; banks nationalised July 1969 (fourteen); Giri elected August 1969; the split November 1969.
  - 1970 to 1972: privy purse attempt 1970 and the Twenty-sixth Amendment 1971; Lok Sabha dissolved December 1970; election March 1971; war of December 1971 and Bangladesh's independence; Congress wins in most states 1972.
- **Neutrality:**
  - Leaders and parties are described by what they did, with no evaluative adjectives.
  - The Syndicate is described as an informal group of organisational leaders.
  - The split is given in both framings: ideology, and a power struggle.
  - Evaluation items ask for both sides.
  - Nothing after 2024 is stated, and no real person is quoted.
- **Originality:** no NCERT text, box, cartoon or exercise and no board or sample-paper item is reused (D-036).

## For a reviewer

- The CPI is named as an ally of the Congress (R) in 1971 ("allies such as the CPI"). It supported the minority government in 1969–70 and allied with it in some states in 1971. Please confirm this wording is acceptable.
- The members of the Grand Alliance are given as the Congress (O), Jana Sangh, Swatantra and SSP. The Bharatiya Kranti Dal is not named.
- Nobody has seen the SVG labels rendered (timeline, defection bars, split diagram). A script check found no overflow or overlap, but they should be checked at 360 px on staging.
