# CBSE Class 12 Political Science, Chapter 1 — The End of Bipolarity

`cbse-12-political-science-ch01` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch01/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 18 slides with 30 visuals (18 tables, 8 flows, 4 SVG); 6 notes sections; 32 flashcards; 79 questions worth 141 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch01_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch01_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is source-based. |
| `src/` | `lib.mjs` (the shared CBSE 12 authoring library, unchanged), `questions.mjs`, `build.mjs` |

## Scope

All four syllabus topics are covered:
- **t01** the Soviet system: features, strengths, weaknesses, the arms race, Afghanistan (17 tags)
- **t02** Gorbachev's reforms, 1989 in Eastern Europe, nationalism, the August 1991 coup, the CIS, causes and consequences (26 tags)
- **t03** shock therapy: measures, economic, social and political consequences (19 tags)
- **t04** Chechnya and Dagestan, the Balkans, Central Asia, the Baltic states; India's relations with Russia (20 tags)

### Decks

- **Part 1** (20 slides): the bipolar world (SVG), a timeline from 1917 to 1991 (SVG), the Soviet system, strengths and weaknesses, the arms race, Gorbachev's reforms, 1989, nationalism, a timeline of the final years (SVG), causes and consequences.
  - Worked examples: reading an imagined 1984 Moscow diary for concepts; planning a 5-mark answer on the causes.
  - Four checks.
- **Part 2** (18 slides): the choice of path, shock-therapy measures and their consequences, tensions in Russia, the Balkans and Central Asia, and an India–Russia timeline (SVG) with the fields of cooperation.
  - Worked examples: linking lines of an imagined 1993 letter to concepts; a 3-mark answer on India–Russia ties.
  - Four checks.
- **Narration:** at most 67 words per slide (mean 49), with no symbols.

### Question bank (79 items)

| Type | Count |
|---|---|
| mcq | 33 (keys a8 b9 c8 d8) |
| assertion-reason | 7 (keys a, b, a, c, a, d, a) |
| true-false | 5 (2 false, 3 true) |
| fill-blank | 4 |
| match | 2 |
| ordering | 2 (chronology) |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Sources:** all are imagined, written by SOYL and labelled as such:
  - a Moscow teacher's diary, 1984
  - a newspaper report, December 1991
  - an engineer's letter from a factory town, 1993
  - a student's seminar notes on India and Russia, 2019
  - a traveller's journal from Central Asia, 2003
- **Difficulty:** d1 12, d2 37, d3 27, d4 3.
- **Competency:** recall 14, understanding 21, application 10, analysis 28, evaluation 6. That puts 56% of items and 70% of marks at application or above (lint band 45–65% of items).
- **Spares:** not used in either test are 3 two-mark shorts, 2 three-mark shorts, 1 long and 2 sources.

## Facts

- **Stable dates only:**
  - 1917 Revolution, 1922 Soviet Union, 1955 Warsaw Pact, 1971 Indo-Soviet treaty, 1979 Afghanistan
  - 1985 Gorbachev, November 1989 Berlin Wall, 1990 German unification
  - August 1991 coup attempt, December 1991 CIS and Gorbachev's resignation
  - 2000 India–Russia strategic partnership, 2004 Baltic states in the EU and NATO, 2017 India a full member of the SCO
- **Nothing after 2024** is stated. Current conflicts involving Russia are left out.
- **Neutral wording:** Chechnya, Dagestan, Tajikistan, Georgia and the Bosnia war are stated as facts without assigning blame. International intervention in Bosnia is mentioned without judgement.
- **Originality:** no NCERT text, boxed source, cartoon or phrase, and no board or sample-paper item, is reused (D-036). Sources are SOYL originals (`passage_origin: soyl-original`) with no quotations of real people.

## For a reviewer

- **"Most immediate cause":** the chapter calls nationalism in the republics the most immediate cause of the break-up and says most textbooks treat it so. `l_causes` accepts any reasoned choice.
- **Tajikistan:** its civil war is dated only as "in the 1990s", and Georgia's two breakaway regions are not named.
- **Shock-therapy recovery:** Russia's later recovery is attributed broadly to oil and gas exports, in the notes and `l_shock`.
- **SVGs:** they are 2 timelines with ordinal spacing (captioned "not to scale"), the bipolar diagram and the India–Russia timeline. A script check finds no label overflow or overlap, but nobody has seen them rendered, so they should be checked at 360 px on staging.
