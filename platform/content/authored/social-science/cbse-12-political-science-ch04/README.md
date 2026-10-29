# CBSE Class 12 Political Science, Chapter 4 — International Organisations

`cbse-12-political-science-ch04` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters.

**How it is built.** Run `npx tsx content/authored/social-science/cbse-12-political-science-ch04/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 18 slides, 25 visuals: 2 SVG, the rest tables and flows), 6 notes sections, 30 flashcards, 74 questions (133 marks; 15 source parts and alternatives) |
| `tests.json` | `t_cbse12politicalscience_ch04_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch04_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups, and Section D is source-based. The two tests share no questions and use no deck-check items. |
| `src/` | `lib.mjs` (the shared CBSE 12 authoring library, identical in every chapter), `questions.mjs`, `build.mjs` |

## Scope

All four syllabus topics are covered:
- **t01:** meaning of international organisations and why they are needed.
- **t02:** evolution of the UN from the League, its aims, the six principal organs, Security Council composition and voting, and the specialised agencies.
- **t03:** reform after the Cold War (structures and processes; jurisdiction), proposed criteria, the veto debate, the UN and a dominant power, and India's position, with the arguments made for it and the objections raised.
- **t04:** IMF, World Bank, WTO, IAEA, Amnesty International and Human Rights Watch.

### Decks

- **Part 1 (organisations and the UN):** 4 check slides and 2 worked examples. The examples are ordering events by era, and deciding whether three imagined Council resolutions pass.
- **Part 2 (reform, India, other organisations):** 3 check slides and 2 worked examples. The examples are weighing an imagined candidate state against the criteria, and matching imagined needs to organisations.
- **SVGs:** the six principal organs around the Charter, and the fifteen Council seats.
- **Narration:** at most 68 words per slide (mean 51), with no symbols.

### Question bank (74 items)

| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 |
| assertion-reason | 8 | 1 |
| true-false | 4 | 1 |
| fill-blank | 2 | 1–2 |
| match | 2 | 2 |
| ordering | 1 | 1 |
| numerical | 2 | 1 |
| short | 8 + 6 | 2 / 3 |
| long | 5 | 5 |
| source-based | 5 | 4 |

- **Source-based items:** five imagined documents, each labelled as written by SOYL. They are Model UN minutes, a school-magazine editorial, a finance official's diary, a news report on inspectors and a retired peacekeeper's letter. Each has an internal choice in part (c).
- **Numericals:** the minimum of 9 votes for a Council decision, and 10 ÷ 2 = 5 members elected each year.
- **Difficulty:** d1 7, d2 40, d3 23, d4 4.
- **Competency:** recall 9, understanding 26, application 14, analysis 23, evaluation 2. That puts 53% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a7 b8 c8 d8; assertion-reason keys are a4 b2 c1 d1.

## Data and facts

- **Dates and figures used:**
  - League of Nations 1920; Atlantic Charter 1941; Charter signed at San Francisco in June 1945; UN in existence from 24 October 1945.
  - 51 founding members and 193 today; India a founding member.
  - The six organs, with the Trusteeship Council inactive since 1994 (Palau).
  - Security Council: 15 members, the permanent five with a veto, 10 elected by the Assembly for two-year terms (five a year). A substantive decision needs 9 votes and no negative permanent vote; by practice an abstention is not a veto.
  - The ICJ sits at The Hague; UN headquarters is in New York.
  - Bretton Woods 1944; WTO 1995 after GATT 1948; IAEA 1957.
- **India:**
  - India works with Brazil, Germany and Japan (G4).
  - The notes say India has served as an elected Council member several times, most recently in 2021–22. No question tests the number of terms.
- **Not stated:** no current office-holder is named, and no budget shares or other statistics are given.
- **Neutral wording:** reform, the veto and India's claim are presented as arguments for and objections raised by different states. Evaluation items accept any side if it is reasoned.
- **Originality:**
  - All sources, states and votes are imagined and labelled.
  - No NCERT text, box, cartoon or exercise and no board or sample-paper item is reused (D-036).
  - No stem duplicates any other authored chapter.

## For a reviewer

- **Wording of objections:** the list of objections to India's claim (nuclear weapons, disputes with neighbours, regional representation, states opposing any new permanent seats) is phrased as positions of "some states". Please confirm the wording is acceptably neutral.
- **India's argument:** India is described as "one of the two most populous countries" to avoid a dated ranking.
- **SVG labels:** nobody has seen them rendered. A script check found no overflow or overlap, but they should be checked at 360 px on staging.
