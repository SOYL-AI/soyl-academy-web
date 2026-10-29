# CBSE Class 12 Political Science, Chapter 2 — Contemporary Centres of Power

`cbse-12-political-science-ch02` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics and Business Studies chapters.

**Build:** run `npx tsx content/authored/social-science/cbse-12-political-science-ch02/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 21 + 19 slides, 32 of them with a visual (5 SVG, the rest tables and flows); 6 notes sections; 31 flashcards; 84 questions worth 151 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch02_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short`, and `t_cbse12politicalscience_ch02_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long` |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, identical in every chapter), `questions.mjs`, `build.mjs` |

**Tests:** both follow their subject blueprint item for item, including the internal-choice groups. Section D is source-based in both. The two tests share no questions and neither uses a deck-check item.

## Scope

All four syllabus topics are covered:
- **t01 European Union:** post-war cooperation, the OEEC, coal and steel, Rome, Maastricht, the euro, the EU as an actor, its limits and Brexit.
- **t02 ASEAN:** founding, membership to 1999, the ASEAN Way, the three pillars, the Regional Forum, and India's Look East and Act East policies.
- **t03 China and India–China:** pre-1978 planning, the reforms and SEZs, the WTO, the gradual path compared with shock therapy, the costs of growth, and Panchsheel to the present in neutral terms.
- **t04 Japan and South Korea:** the post-war rise, Article 9, the G7, division and war, export-led growth, democracy, UN and OECD membership, and partnerships with India.

### Decks

- **Part 1, the EU and ASEAN:** 21 slides.
  - SVG figures: a European integration timeline, the EU flag (twelve stars drawn from computed star polygons) and a step chart of ASEAN membership.
  - Worked examples: planning a 3-mark answer on influence, and spotting the ASEAN Way in a source.
- **Part 2, China, Japan and South Korea:** 19 slides.
  - SVG figures: an India–China timeline and a comparison of Japan and South Korea.
  - Worked examples: matching source lines to China's reforms, and planning a 5-mark comparison.
- **Both decks:** 4 check slides each. Narration is at most 69 words a slide (mean 48) and uses no symbols; it says "Group of Seven", never "G7".

### Question bank (84 items)

| Type | Count |
|---|---|
| mcq | 35 |
| assertion-reason | 9 |
| true-false | 5 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 (chronology) |
| short 2-mark | 10 |
| short 3-mark | 6 |
| long 5-mark | 7 |
| source-based | 5 |

- **Source-based items:** a student's travel diary, an editorial, a think-tank report, Model UN minutes and an exporter's notes. Each has an internal choice in part (c).
- **Difficulty:** d1 4, d2 31, d3 45, d4 4.
- **Competency:** recall 16, understanding 25, application 17, analysis 22, evaluation 4. That puts 51% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys a9 b9 c8 d9; assertion-reason keys a, b, c, a, d, a, c, a, b.

## Facts (stable, commonly taught; a reviewer should double-check)

- **Europe:**
  - OEEC 1948 (Marshall aid), Council of Europe 1949, Coal and Steel Community 1951 (six states), Treaty of Rome 1957 (EEC and Euratom).
  - Maastricht Treaty signed 1992, in force 1993. Euro as an accounting currency 1999; notes and coins 1 January 2002.
  - Draft constitution rejected in the French and Dutch referendums of 2005. Lisbon Treaty 2007 (named once, as a distractor).
  - United Kingdom left on 31 January 2020 after a 2016 referendum; 27 members remain.
  - Denmark and Sweden keep their own currencies. France is the EU's only permanent Security Council member.
- **ASEAN:**
  - Founded on 8 August 1967 by the Bangkok Declaration of five states. Brunei joined in 1984, Vietnam in 1995, Laos and Myanmar in 1997 and Cambodia in 1999.
  - AFTA 1992, ARF 1994, three-pillar Community agreed in 2003.
  - India's trade in goods agreement with ASEAN 2009; Act East policy 2014.
  - Timor-Leste's later accession is deliberately not mentioned, because it falls after 2024. The chapter speaks of "ten members by 1999".
- **China:** People's Republic 1949; reforms 1978; SEZs from 1980; WTO 2001.
- **India–China:**
  - Panchsheel 1954; war 1962; ambassadors restored 1976; prime-ministerial visit 1988.
  - Galwan valley clash in June 2020, stated neutrally with no casualty figures. Nothing later is stated.
- **Japan:** Hiroshima and Nagasaki, August 1945; Article 9; only Asian G7 member; seeks a permanent Security Council seat as part of the G4.
- **South Korea:** Korea divided near the 38th parallel in 1945; Korean War 1950–53; democratic transition in the late 1980s; both Koreas joined the UN in 1991; OECD 1996; India–South Korea CEPA 2010; strategic partnerships with India.
- **No statistics** (GDP, trade values, military figures) are stated anywhere.

## Originality and tone

- Every source is an imagined SOYL document and labelled as such. There are no quotations of real people, no textbook cartoons or boxes, and no NCERT text, exercise or board/sample-paper item (D-036).
- Disputes (the India–China boundary, the EU's internal disagreements) are described factually, with "critics argue" framing and no verdicts on contested current politics.

## Verifier pass

- **Keys and solutions:** every key was re-solved from its stem. Each MCQ solution names the key letter (set in code) and explains the distractors.
- **Rebuild:** a second build gives byte-identical `release.json` and `tests.json`.
- **Duplicate stems:** none within the chapter or against any other authored chapter or exemplar.
- **SVG labels:** a script check finds no label overflow or overlap. Nobody has seen them rendered, so they should still be checked at 360 px on staging.
