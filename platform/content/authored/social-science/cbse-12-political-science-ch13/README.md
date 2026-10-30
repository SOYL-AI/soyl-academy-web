# CBSE Class 12 Political Science, Chapter 13 — The Crisis of Democratic Order

`cbse-12-political-science-ch13` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the other CBSE 12 Political Science chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch13/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 21 slides with 31 visuals (4 SVG, the rest tables and flows); 6 notes sections; 32 flashcards; 72 questions worth 130 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch13_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch13_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is source-based. |
| `src/` | `lib.mjs` (shared authoring library, identical in every CBSE 12 Political Science chapter), `questions.mjs` (with an asserted 1971–1980 chronology), `build.mjs` |

## Scope

All three syllabus topics are covered:
- **t01** background to the Emergency (22 items): economic strain after 1971; the Gujarat and Bihar movements; JP and Total Revolution; the 1974 railway strike; the clash with the judiciary; the Allahabad verdict and the partial stay.
- **t02** declaration and consequences (23 items, plus 3 shared with t03): the proclamation under Article 352; rights and preventive detention (MISA); censorship; the habeas corpus case; Union power; the 42nd Amendment; the Twenty-Point Programme; the controversies examined by the Shah Commission; the debate on whether the Emergency was necessary.
- **t03** lessons and politics after (24 items): the 1977 election; the Janata Party and the Congress for Democracy; the Janata years and the 1980 return of the Congress; the 44th Amendment; lessons.

### Decks

- **Part 1** (18 slides): the road to June 1975. It has 2 SVG figures (a 1971–1975 timeline, and the 1975–1980 timeline in the notes), 4 checks and 2 worked examples: building a chronology, and planning a five-mark answer.
- **Part 2** (21 slides): the Emergency and after. It has a hub diagram of four areas of change and a balance diagram of the debate, 4 checks and 2 worked examples: classifying which freedom is affected, and a both-sides answer.
- Narration is at most 75 words per slide (mean 51) and uses no symbols.

### Question bank (72 items)

| Type | Count |
|---|---|
| mcq | 28 |
| assertion-reason | 9 |
| true-false | 3 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 5 |
| source-based | 5, each with an internal choice in part (c) |

- **Sources:** five imagined SOYL documents: a Patna student's diary (1974), a Delhi sub-editor's night-desk diary (1975), an Indore detainee's family letter (1976), a Lucknow postmaster's letter (1977) and minutes of a Delhi residents' meeting (1977).
- **No map, numerical or cartoon items:** the chapter has no quantitative or map content.
- **Difficulty:** d1 7, d2 30, d3 31, d4 4.
- **Competency:** recall 11, understanding 24, application 7, analysis 27, evaluation 3. That puts 51% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a7 b7 c7 d7; assertion-reason keys are a, d, a, a, b, a, d, c, b.

## Facts a reviewer should double-check

1. **Dates**
   - 1971 election (Garibi Hatao) and the December 1971 war.
   - April 1973: the Kesavananda Bharati judgment and the supersession of three judges.
   - October 1973: the rise in world oil prices.
   - Gujarat movement from January 1974; President's Rule; assembly polls in June 1975.
   - Bihar movement from March 1974; JP's march to Parliament in March 1975.
   - Railway strike in May 1974, led by George Fernandes, called off after about three weeks.
   - 12 June 1975: the Allahabad verdict on Raj Narain's petition (corrupt practice, use of government officials). 24 June 1975: the partial stay (she could remain an MP and Prime Minister but not vote).
   - 25 June 1975: the proclamation under Article 352 for internal disturbance, signed by President Fakhruddin Ali Ahmed; the Cabinet endorsed it on 26 June.
2. **Later events**
   - April 1976: the habeas corpus case, with one judge dissenting. No judges are named.
   - November 1976: the 42nd Amendment (six-year term, Fundamental Duties, Preamble words).
   - January 1977: elections announced. March 1977: results; Morarji Desai becomes Prime Minister; the Emergency is lifted.
   - 1977: the Shah Commission (Justice J. C. Shah) and Jagjivan Ram's Congress for Democracy.
   - December 1978: the 44th Amendment (armed rebellion; written Cabinet advice; special-majority approval within one month; Articles 20 and 21 protected).
   - 1979: Charan Singh briefly Prime Minister. January 1980: the Congress returns.
3. **Wording that a reviewer may want to adjust**
   - The 1977 result is given only as a broad pattern: routed in the north, with no seat in several states; held the south. There are no seat numbers.
   - Some newspapers left blank spaces, a few closed, and some writers returned state honours. No names are given.
   - Some organisations were banned. They are not named in student-facing text.
   - The demolitions are described as "in some Delhi localities". No locality is named.
4. **Neutrality:** the government's stated reasons are always given beside the critics' arguments. Individuals get no evaluative adjectives. Nothing after 2024 is mentioned, including later commemorations.
5. **Originality:** no NCERT text, cartoon or exercise and no board or sample-paper item is reused (D-036). No real person is quoted.
6. **Rendering:** the SVG labels pass the overflow and overlap script, but nobody has seen them rendered. They should be checked at 360 px on staging.
