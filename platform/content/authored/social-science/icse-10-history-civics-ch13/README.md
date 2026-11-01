# ICSE Class 10 History & Civics, Chapter 13 — Independence and Partition of India

`icse-10-history-civics-ch13` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the pattern of the ICSE 2027 History & Civics specimen (`icse-2027-specimen-501-history-civics`), which was used for pattern only. It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch13/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 18 slides, 30 of them with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 80 questions worth 174 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders and the asserted dates and counts) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch13_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min). Part I has 5 MCQ, 1 AR and 2 × 2-mark. Part II is one of `l_cm_full` and `l_mb_full`.
- `t_icse10historycivics_ch13_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min). Part I has 9 MCQ, 1 AR and 5 × 2-mark. Part II is two of `l_cm_aftermath`, `l_mb_choices` and `l_iia_full`.

## Scope

All three syllabus topics are covered. As the removed list says, only the clauses are required for the Cabinet Mission Plan and the Independence Act; t02 also asks for the reasons the Mountbatten Plan was accepted.
- **t01** the Cabinet Mission Plan: its members and date, its clauses (Union, residuary powers, Sections A, B and C, Constituent Assembly, princely states, interim government, no separate Pakistan), and the events of 1946 that made it unworkable (Direct Action Day, interim government, the Assembly's first meeting).
- **t02** the Mountbatten Plan: Attlee's statement, the clauses of 3 June 1947, and the reasons for its acceptance, with critics' concerns given for balance.
- **t03** the Indian Independence Act, 1947: dates and clauses.

### Decks

- **Part 1** (17 slides): the Cabinet Mission. Worked examples: placing provinces in their sections, and planning a 3 + 3 + 4 answer on the plan. Check slides: `m_chk_cm_year`, `tf_chk_section_c`, `m_chk_interim_head`, `m_cm_scenario_province`.
- **Part 2** (18 slides): the Mountbatten Plan and the Independence Act. Worked examples: how each area decided, and planning a 3 + 3 + 4 answer on the Act. Check slides: `m_chk_two_parts`, `fb_chk_radcliffe`, `m_chk_appointed_day`, `tf_chk_sos`.
- **Narration:** at most 68 words a slide (mean 46), with no symbols and no quotations.
- **SVG figures:** a January 1946–September 1947 timeline (captioned schematic) and a three-tier chart of the Cabinet Mission scheme (captioned schematic, not to scale). `l_cm_scheme_chart` reads the chart.

### Question bank (80 items)

| Type | Count |
|---|---|
| mcq | 35 (keys a9 b9 c8 d9) |
| assertion-reason | 6, ICSE option order set by `verdict` (keys c, b, c, d, c, a) |
| true-false | 6 |
| fill-blank | 4 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 13 |
| short 3-mark | 4 |
| long 10-mark, in 3 + 3 + 4 parts | 7 (one reads an SVG) |
| source-based, each with an either/or part (c) | 3 (an imagined clerk's diary from Delhi 1946, a teacher's letter from Amritsar 1947, a debating club's minutes from Lucknow 1947) |

- **Difficulty:** d1 13, d2 37, d3 26, d4 4.
- **Competency:** recall 20, understanding 21, application 22, analysis 15, evaluation 2. That puts 49% of items at application or above (lint band 45–65%). The first build came out at 38%. I raised it by rewriting nine recall or understanding items as imagined scenarios (an official sorting subjects, a provincial minister, a ruler and his adviser, a district officer, a dewan, a student's diary, a journalist, a newspaper report, a London clerk), not by retagging.

## Facts a reviewer should check

All are stable, widely taught facts; none is a statistic. Every clause is paraphrased, never quoted.
1. **Cabinet Mission:**
   - Members: Lord Pethick-Lawrence (Secretary of State for India), Sir Stafford Cripps and A. V. Alexander.
   - Arrived 24 March 1946, given as "March 1946" in items. Plan announced 16 May 1946.
2. **1946 plan clauses:**
   - A Union of India of British India and the princely states, for defence, foreign affairs and communications, with power to raise the money needed. Residuary and other powers with the provinces.
   - Sections: A (Madras, Bombay, United Provinces, Bihar, Central Provinces, Orissa), B (Punjab, NWFP, Sind) and C (Bengal, Assam). Groups could have their own executives and legislatures, and a province could leave its group after the first general election under the new constitution.
   - Constituent Assembly elected by the provincial assemblies by proportional representation, seats shared among General, Muslim and Sikh communities roughly by population. Given "as commonly taught" as 389 seats (292 + 4 + 93), in a deck table and the notes only; no question tests the number.
   - Princely states keep all subjects not ceded and negotiate their entry.
   - An interim government of Indian leaders, and a fully sovereign Pakistan not accepted.
3. **Responses and events of 1946:**
   - Both parties accepted the plan at first, with different readings of the grouping clauses. The League withdrew its acceptance in July 1946.
   - Direct Action Day: 16 August 1946. Violence in Calcutta and elsewhere is described without numbers or blame.
   - Interim government: took office 2 September 1946, Nehru as Vice-President of the Executive Council. The League joined in October 1946.
   - Constituent Assembly: first met 9 December 1946, with the League absent.
4. **Attlee and Mountbatten:** Attlee's statement of 20 February 1947 set June 1948 as the latest date. Mountbatten replaced Wavell as Viceroy in March 1947.
5. **Mountbatten Plan, 3 June 1947 (paraphrased):**
   - Two dominions.
   - The Punjab and Bengal assemblies to vote in two parts (Muslim-majority districts and the rest), a vote by either part to divide the province.
   - A boundary commission headed by Sir Cyril Radcliffe.
   - Sind to decide by its assembly; referendums in the NWFP and Sylhet.
   - Princely states free to join either dominion.
   - Power to pass on 15 August 1947.
   - `s_mb_nwfp_sylhet` states that both the NWFP and Sylhet voted to join Pakistan.
6. **Reasons for acceptance (paraphrased, neutral):** spreading violence and fear of civil war; deadlock in the interim government; an early transfer of power; a strong centre for the rest of India; partition as the lesser evil, accepted reluctantly. Critics' concerns are given for balance in `l_mb_choices` and the notes.
7. **Indian Independence Act:**
   - Royal assent 18 July 1947; in force 15 August 1947.
   - Two dominions.
   - Constituent Assemblies to frame constitutions and act as legislatures.
   - The Government of India Act, 1935, as adapted, to govern meanwhile.
   - A Governor-General for each dominion on its cabinet's advice; one person could serve both if they agreed.
   - Paramountcy lapses; the Secretary of State for India's office is abolished; the British Parliament loses power to legislate for the dominions.
8. **Partition violence:** described humanely in the notes as "very large numbers … displaced or killed, and estimates vary widely". No figures and no blame of any community.
9. **Dates asserted in code:**
   - The nine events are in date order.
   - 3 June to 15 August is about two months.
   - Independence came ten months before the June 1948 deadline.
   - The sections hold 6 + 3 + 2 = 11 provinces.

## Originality

- **Scenarios:** every diary, letter, minute and quiz scenario is imagined and labelled as SOYL's own.
- **No quotations:** no textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No clause of any plan or Act, and no speech, is quoted.
- **Duplicate checks:** the stem prose passed the lib's exact-stem check. A 5-gram near-duplicate scan using the originality gate's rule (80 stems against 24,527 others, including CBSE 12 Political Science ch08 on Partition) found 0 flags.

## Gaps

- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. A script estimate found no overflow or overlap.
- **Content:** items are `draft`, and the content-verifier sample has not been done.
