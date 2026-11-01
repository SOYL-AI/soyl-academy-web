# ICSE Class 10 History & Civics, Chapter 3 — The President and the Vice-President

`icse-10-history-civics-ch03` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). Built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs` (imported, not copied). From `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch03/src/build.mjs`. The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 18 slides, 28 with visuals: 2 SVG, the rest tables and flows); notes (6 sections, 14 visuals); 30 flashcards; 77 questions (172 marks) |
| `tests.json` | `t_icse10historycivics_ch03_short` (20 marks, 30 min) on `icse-10-history-civics-chapter-test-short`: Part I 5 MCQ + 1 AR + 2 × 2-mark, Part II one of two 10-mark questions. `t_icse10historycivics_ch03_long` (40 marks, 60 min) on `icse-10-history-civics-chapter-test-long`: Part I 9 MCQ + 1 AR + 5 × 2-mark, Part II two of three 10-mark questions. The two tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, Electoral College SVG, asserted counts), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All six syllabus topics are covered:
- t01: qualifications, Electoral College, reasons for indirect election, term
- t02: impeachment
- t03: executive, legislative and financial powers
- t04: judicial and discretionary powers
- t05: the three emergencies, with two effects of each
- t06: the Vice-President

## Question bank (77 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 35 | Keys a9 b9 c8 d9. One MCQ reads the Electoral College SVG (asset). |
| assertion-reason | 6 | ICSE option order; keys c, b, d, c, a, a |
| true-false · fill-blank · match · ordering | 4 · 3 · 2 · 1 | The ordering item covers the steps of impeachment |
| short 2-mark | 11 | |
| short 3-mark | 5 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined documents: an MLA's diary of two elections, a law student's briefing note on an ordinance and a mercy case, a newspaper report on President's Rule. Each has an either/or part (c). |

- **Difficulty:** d1 12, d2 34, d3 28, d4 3.
- **Competency:** recall 15, understanding 24, application 19, analysis 16, evaluation 3. That puts 49% of items at application or above (lint band 45–65%).
- **Asserted counts:** one-fourth and two-thirds of a 543-member Lok Sabha (136, 362) and a 245-member Rajya Sabha (62, 164); a majority of all members of 245 is 123. These figures are computed in code and checked by asserts.

## Facts a reviewer should double-check
1. **President's qualifications:** citizen of India; completed 35 years; qualified for election to the Lok Sabha; no office of profit under the Union, a State or a local authority (minister, Governor and Vice-President are not counted as offices of profit).
2. **Electoral College (Article 54):** elected members of both Houses of Parliament, of the State Legislative Assemblies, and of the Delhi and Puducherry Assemblies (70th Amendment, in force 1992). Nominated members and Legislative Councils are excluded. The Jammu and Kashmir Union Territory legislature is not mentioned (Article 54 does not expressly name it).
3. **Method:** proportional representation by single transferable vote, secret ballot; an MLA's vote value depends on the State's population (stated broadly, no formula).
4. **Term:** five years; re-eligible; resignation addressed to the Vice-President.
5. **Impeachment (Article 61):** violation of the Constitution only; either House; written notice signed by at least one-fourth of the total members, 14 days in advance; two-thirds of the total membership in each House; the other House investigates and the President may appear or be represented. Nominated MPs take part; State legislators do not.
6. **Legislative powers:** summons and prorogues the Houses; dissolves the Lok Sabha; special address (Article 87) after each general election and at the first session of each year; nominates 12 members to the Rajya Sabha (the Anglo-Indian nomination to the Lok Sabha ended in 2020, mentioned once); absolute, suspensive and pocket veto; a Money Bill is not returned.
7. **Ordinances (Article 123):** only when a House is not in session; lapse six weeks after Parliament reassembles unless approved.
8. **Financial powers:** recommendation for Money Bills; the budget is laid in the President's name; advances from the Contingency Fund; the Finance Commission every five years.
9. **Article 72:** pardon, commutation, remission, respite and reprieve, including death sentences and court-martial cases.
10. **Advice (Article 74):** the 42nd Amendment (1976) made it binding; the 44th Amendment (1978) allowed one return for reconsideration.
11. **Emergencies:**
    - Article 352: war, external aggression or armed rebellion (in place of "internal disturbance" since 1978); the Cabinet's written decision; approval within one month by special majority. Effects taught: laws on the State List, directions to States, suspension of Article 19 in a war or external-aggression emergency (Article 358), extension of the Lok Sabha term.
    - Article 356: approval within two months. Effects: the Union runs the State executive through the Governor; Parliament makes the State's laws; the Assembly is suspended or dissolved.
    - Article 360: approval within two months. Effects: salary cuts including judges; State Money Bills reserved for the President. Stated as never proclaimed "as of 2024".
12. **Vice-President:** citizen; 35 years; qualified for the Rajya Sabha; no office of profit. Elected by all members of both Houses (elected and nominated), single transferable vote, secret ballot; five years. Removed by a Rajya Sabha resolution passed by a majority of all its then members and agreed to by the Lok Sabha, with 14 days' notice (no impeachment). Ex-officio Chairman of the Rajya Sabha (not a member), with a casting vote. Acts as President during a vacancy (filled within six months) and then does not preside over the Rajya Sabha.
13. **Excluded:** no current office-holder is named and no real person is quoted.

## Originality
Every scenario, diary, note and report is imagined and labelled as such. No textbook text, box or exercise, and no specimen or past-paper item, is reused (D-036). The specimen's question on removing the President is not reused in wording. Stems were checked against 23,714 stems in the repo: no exact or near duplicates (5-gram Jaccard 0.7 or more).

## Gaps
- Nobody has seen the SVG labels (the Electoral College diagram and the impeachment bar chart) rendered, so they need a look at 360 px on staging.
