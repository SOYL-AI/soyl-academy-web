# CBSE Class 12 Political Science, Chapter 3 — Contemporary South Asia

`cbse-12-political-science-ch03` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters. Build it from `src/` by running `npx tsx content/authored/social-science/cbse-12-political-science-ch03/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 17 slides; notes in 7 sections; 30 flashcards; 78 questions worth 141 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch03_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short`, and `t_cbse12politicalscience_ch03_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. Section D is source-based. The two tests are disjoint and use no deck-check item. |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, identical in every chapter), `questions.mjs`, `build.mjs` |

## Scope

All four syllabus topics are covered:

| Topic | Content | Items tagged |
|---|---|---|
| t01 | Pakistan's alternation of military and elected rule; the birth of Bangladesh and its path to 1991 | 16 |
| t02 | Nepal from kingdom to republic; Sri Lanka's ethnic conflict and its democratic record | 22 |
| t03 | India–Pakistan wars and agreements; India's relations with Bangladesh, Nepal, Sri Lanka, Bhutan and the Maldives | 25 |
| t04 | SAARC, SAFTA, its limits, and outside powers in the region | 15 |

### Decks

- **Part 1** has 19 slides:
  - The region, then Pakistan, Bangladesh, Nepal and Sri Lanka.
  - An SVG regime timeline for Pakistan and Bangladesh, plus a comparison table.
  - Worked examples: reading the regime timeline, and a four-step method for source questions.
  - 4 check slides.
- **Part 2** has 17 slides:
  - India–Pakistan (an SVG timeline with conflicts above the line and agreements below), India's other neighbours, SAARC and SAFTA, and outside powers.
  - Worked examples: planning a 5-mark answer, and weighing SAARC for and against.
  - 4 check slides.
- Narration is at most 68 words per slide and uses no symbols.

### Question bank (78 items)

| Type | Count |
|---|---|
| mcq | 35 |
| assertion-reason | 8 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering (chronology) | 2 |
| short 2-mark | 8 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

There are no map items.

The five source-based items are all imagined and labelled as such:
- a Dhaka student's diary, 1971
- a Kathmandu student's letter, 2008
- a peace-studies newsletter, 2010
- a journalist's note on the 1999 Delhi–Lahore bus
- a report from a South Asian student exchange, 2012

**Balance:**
- Difficulty: d1 14, d2 33, d3 27, d4 4.
- Competency: 53% of items are application or above.
- Answer keys: MCQ keys are balanced (a9 b9 c8 d9); assertion-reason keys are a4 b1 c2 d1.

## Facts and neutrality

- **Dates used:** only stable, widely documented events up to 2015.
  - Pakistan: takeovers in 1958, 1977 and 1999; civilian rule in 1971, 1988 and 2008.
  - Bangladesh: 1970, 1971, 1972, 1975, 1990–91, and the caretaker government of 2007–08.
  - Nepal: 1990, 1996, 2005, 2006, 2008 and 2015.
  - Sri Lanka: 1948, 1956, the LTTE in 1976, war from 1983, the Accord and IPKF in 1987–90, and the end of the war in 2009.
  - India–Pakistan: 1947–48, 1960, 1965–66, 1971–72, 1998 and 1999.
  - India–Bangladesh: 1996 and 2015.
  - Maldives: 1988.
  - SAARC: 1985, 1987, 2004, 2006 and 2007.
- **The one later fact** is the dated note "no summit since 2014 (as of 2024)".
- **Left out:** events after 2015, such as Sri Lanka in 2022, Bangladesh in 2024 and India–Pakistan in 2025. Nothing in the chapter states the *current* status of the Indus Waters Treaty; it is described only as signed in 1960 with World Bank mediation.
- **Neutral wording:**
  - Kashmir and other disputes are stated as "conflicting positions", not as either side's claim being right.
  - Reasons for military rule in Pakistan are the standard ones: army, clergy and landed elite, security, and Cold War outside support.
  - Outside powers get one factual line each.
- **Originality:** no NCERT text, boxed source or cartoon, and no board or sample-paper item, is reused (D-036). Every source is SOYL's own and imagined.

## For a reviewer

- **Sri Lanka's capitals:** the table lists Sri Jayawardenepura Kotte as the official capital, with Colombo as well.
- **Afghanistan:** the table describes it only as "Joined SAARC in 2007", deliberately with no description of its current government.
- **Bangladesh caretaker:** the 2007–08 caretaker government is shown as "military-backed".
- **Free trade agreement:** India–Sri Lanka is dated 1998 (signed; in force 2000).
- **`s_indopak_issues`** includes Sir Creek; **`m_siachen`** uses the Gangotri, Zemu and Pindari glaciers as wrong options because they lie inside India.
- **SVG timelines:** a script check found no label overflow or overlap, but nobody has seen them rendered. They need a look at 360 px on staging.
