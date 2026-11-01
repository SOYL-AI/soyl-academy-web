# ICSE Class 10 History & Civics, Chapter 17 — The United Nations

`icse-10-history-civics-ch17` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the pattern of the ICSE 2027 History & Civics specimen (`icse-2027-specimen-501-history-civics`), which was used for pattern only. It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch17/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 16 slides, 26 with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 80 questions worth 176 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders, the asserted vote rule and counts) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch17_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min).
  - Part I: `m_obj_peace`, `m_ga_members`, `m_sc_p5`, `m_icj_seat`, `m_unicef_hq`, `ar_league_lesson`, and the 2-mark shorts `s_obj_two`, `s_sc_comp`.
  - Part II: one of `l_ga_full` and `l_icj_full`.
- `t_icse10historycivics_ch17_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min).
  - Part I: `m_founding_day`, `m_obj_scenario`, `m_ga_important`, `m_ga_budget`, `m_vote_veto`, `m_vote_abstain`, `m_icj_election`, `m_agency_vaccine`, `m_udhr_meaning`, `ar_sc_continuous`, and the 2-mark shorts `s_league_vs_un`, `s_ga_comp`, `s_veto_two`, `s_icj_functions`, `s_udhr_meaning`.
  - Part II: two of `l_sc_full`, `l_agencies_full` and `l_udhr_rights`.
- Spares in neither test: `l_veto_debate`, `l_organs_picture` (reads the SVG of the six organs), the three source items, and many objective and short items.

## Scope

Topics t01–t06 of the syllabus: objectives; the General Assembly; the Security Council and the veto; the International Court of Justice; UNICEF, WHO and UNESCO; the Universal Declaration of Human Rights.

- **Removed topics honoured:** the agencies are taught for **headquarters and functions only**, and the Declaration for its **meaning only**. No article of the Declaration or the Charter is listed or quoted.
- **Decks:**
  - Part 1 (t01–t03) has 18 slides and Part 2 (t04–t06) has 16.
  - Each part has 4 check slides on objective items that are in no test, and 2 worked examples: the two-thirds rule and four imagined Council votes; sorting jurisdiction and choosing an agency.
  - Narration is at most 60 words a slide and uses no symbols or abbreviations.

### Question bank (80 items, 176 marks)

| Type | Count |
|---|---|
| mcq | 36 (keys a9 b9 c9 d9) |
| assertion-reason (ICSE order, set by `verdict`) | 7 |
| true-false | 5 |
| fill-blank | 3 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 12 |
| short 3-mark | 5 (one reads the SVG vote bars) |
| long 10-mark, 3 + 3 + 4 parts | 7 |
| source-based | 3 |

- **Source items:** an imagined Model UN diary (Pune), an imagined district health newsletter and an imagined teacher's notes for Human Rights Day. Each is labelled imagined and has an either/or part (c).
- **Difficulty:** d1 21, d2 16, d3 38, d4 5.
- **Competency:** recall 25, understanding 16, application 21, analysis 16, evaluation 2. That puts 49% of items at application or above, reached with scenario items: imagined votes, states and requests.

## Facts for a reviewer (all stable and widely taught)

1. **Founding:** the Charter was signed at **San Francisco on 26 June 1945** and came into force on **24 October 1945** (United Nations Day). The headquarters are in **New York**.
2. **Membership:** **51 original members**, India among them (India signed in 1945, before independence), and **193 members as of 2024**.
3. **Objectives,** paraphrased only: peace and security; friendly relations based on equal rights and self-determination; international cooperation on economic, social, cultural and humanitarian problems; human rights; a centre for harmonising actions.
4. **Six principal organs:** General Assembly, Security Council, Economic and Social Council, Trusteeship Council (work suspended), International Court of Justice, Secretariat.
5. **General Assembly:**
   - All members; up to five representatives but one vote each.
   - Important questions need two-thirds of members present and voting; the computed example is two-thirds of 180 = 120.
   - Regular annual session from September.
   - Functions: deliberative, elective, joint with the Council (ICJ judges, admission and Secretary-General on the Council's recommendation), budgetary, constituent.
6. **Security Council:**
   - **15 members**: five permanent (China, France, Russia, the UK, the USA) and ten non-permanent, elected for two years, five each year, not immediately re-eligible. It was enlarged from 11 in 1965; this appears in one MCQ solution only.
   - Procedural matters need nine votes. Substantive matters need nine votes including the concurring votes of the permanent members; a permanent member's no is a veto. By practice an abstention is not a veto.
   - The four imagined votes are computed by this rule in code: A fails, B passes, C fails, D passes.
7. **Admission of members:** by Security Council recommendation, then a two-thirds vote of the General Assembly.
8. **International Court of Justice:**
   - **15 judges**, **9-year** terms, one-third elected every three years.
   - Elected by an absolute majority in both the General Assembly and the Security Council, voting separately; no two judges of the same nationality.
   - Seat: the **Peace Palace, The Hague**.
   - Contentious cases between states that accept its jurisdiction, with binding, final judgments; if a party does not comply, the other may approach the Security Council.
   - Advisory opinions to the General Assembly, the Security Council and authorised agencies. Individuals cannot be parties.
9. **Agencies:**
   - **UNICEF:** set up December 1946 as an emergency fund for children; **New York**.
   - **WHO:** constitution in force **7 April 1948**, now World Health Day; **Geneva**.
   - **UNESCO:** founded 1945; **Paris**; keeps the World Heritage List.
10. **Universal Declaration of Human Rights:** adopted by the General Assembly in **Paris on 10 December 1948** (Human Rights Day). It is a common standard, not a binding treaty, and it inspired constitutions and later treaties.
11. **Not stated:** no current office-holder is named, and no Charter or Declaration text is quoted. The specimen's wording on the ICJ's composition and the General Assembly's exclusive functions is not reused.

## Checks run on this chapter

- **Build:** NO ERRORS; lint 0 errors and 0 warnings. Two rebuilds give byte-identical `release.json` and `tests.json`.
- **Duplicates:** `scratchpad/icse-hc/checks.mjs` compared the 80 stems with about 24,850 others and found 0 flags, using the originality gate's 5-gram rule plus exact stems.
- **SVG labels:** 0 overflow or overlap issues in the 2 figures.
- **Rendering:** nobody has seen the SVG labels or the wide tables rendered, so they need a look at 360 px on staging.
