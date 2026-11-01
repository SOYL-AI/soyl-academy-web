# ICSE Class 9 History & Civics, Chapter 3 — Elections and the Election Commission

`icse-9-history-civics-ch03` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus (elementary Civics: Articles are named, never quoted). Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch03/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 20 slides, 13 + 15 with visuals: 4 SVG figures, the rest tables and flows; 4 checks each; 2 + 3 worked examples); notes (6 sections); 31 flashcards; 75 questions |
| `tests.json` | `t_icse9historycivics_ch03_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch03_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank and four SVG figures), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All four syllabus topics are covered (no removed topics for this chapter):
- t01: meaning of election; why essential in a representative democracy; direct and indirect elections with Indian examples
- t02: Election Commission of India: composition, appointment, term and the protection of its independence
- t03: functions of the Commission (rolls, EPIC, parties and symbols, schedule, nominations, polls, observers); the Model Code of Conduct
- t04: general election, mid-term election and by-election

## Question bank (75 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 29 | Keys a7 b7 c7 d8 |
| assertion-reason | 6 | ICSE option order; keys c, a, c, c, c, a |
| true-false · fill-blank · match · ordering | 3 · 4 · 3 · 2 | Match: methods of election; tasks and bodies; types of election. Ordering: history of the Commission (1950 to 2023); steps of an election |
| short 2-mark | 10 | |
| short 3-mark | 8 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined documents: a first-time voter's polling-day diary, a newspaper report on a by-election, a student's revision notes (with deliberate errors to correct). Each has an either/or part (c). |

- **Difficulty:** d1 8, d2 27, d3 31, d4 9.
- **Competency:** recall 17, understanding 20, application 22, analysis 12, evaluation 4. That puts 51% of items at application or above.
- **Topics (items tagged):** t01 15, t02 18, t03 21, t04 17, plus 4 items spanning two topics.

## Tests (item keys)
- Short: A = `m_meaning`, `m_composition`, `m_rolls`, `m_midterm`, `ar_independence`, `s_direct_indirect_diff`, `s3_mcc_purpose`; B = attempt 1 of `l_election_meaning`, `l_functions`.
- Long: A = `m_direct_ls`, `m_term_scenario`, `m_removal_cec`, `m_mcc_scenario`, `m_symbol`, `m_scn_by`, `m_bye_time`, `ar_mcc`, `s_meaning_election`, `s_safeguards`, `s_bye`, `s3_independence_scenario`, `s3_distinguish`; B = attempt 2 of `l_ec_composition`, `l_mcc`, `l_types`.
- Deck checks (not in any test): `m_why_rep`, `mt_direct_indirect`, `m_ec_removal`, `ord_ec`, `mt_functions`, `ord_poll_steps`, `m_mcc_period`, `mt_types`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars: 0 flags (75 stems vs 29,017 others); SVG label overflow and overlap: 0 issues.
- Every stem is specific to an imagined constituency, State, voter, document or situation, to stay clear of CBSE 9 Political Science (Electoral Politics) and CBSE 10 and 11 wording. No real party, no current office-holder, no recent election.
- Not run (outside the brief): tree-wide gates, `npm test`, e2e, git.

## Facts for a reviewer to double-check
1. The Election Commission of India is set up under **Article 324** (superintendence, direction and control of elections; named, never quoted).
2. It was set up on **25 January 1950** (the day before the Constitution came into force); that date is observed as **National Voters' Day**.
3. Composition: a **Chief Election Commissioner** and such other **Election Commissioners** as the **President** fixes. The Commission was **briefly multi-member in 1989-90** and has been a **three-member body (CEC and two Election Commissioners) since 1993** (timeline figure and `ord_ec`).
4. Appointment is by the **President**. **Dated note, "as of 2024":** a **2023 Act** has appointments made on the recommendation of a **selection committee** of the Prime Minister, a Union Cabinet Minister nominated by the Prime Minister, and the Leader of the Opposition in the Lok Sabha (or the leader of the largest opposition party). Stated neutrally, with no opinion. **Reviewer: confirm the Act's present status before release; if it has changed, adjust `m_selection2023`, `l_ec_composition`, the deck table `vAppoint`, the timeline, the notes and the flashcard on appointment.**
5. Term: **six years or until age 65, whichever is earlier** (`m_term_scenario` has an appointee aged 63 years 6 months retiring after about one and a half years).
6. Independence safeguards: the CEC is removable **only in the manner and on the grounds of a Judge of the Supreme Court**; the CEC's **service conditions cannot be varied to the CEC's disadvantage after appointment**; **other Election Commissioners are removable only on the CEC's recommendation**.
7. Functions: preparing and revising **electoral rolls**; issuing **EPIC** (Electors Photo Identity Card); **recognising parties** (national or State) and **allotting symbols**; **fixing the schedule**; supervising **filing and scrutiny of nominations** (the scrutiny itself is done by returning officers under the Commission's supervision; the chapter says "supervises"); conducting polls (**electronic voting machines with a voter-verifiable paper audit trail, VVPAT**, stated broadly); appointing **observers** (for the poll and, broadly, candidates' expenditure).
8. A separate **Delimitation Commission** redraws constituency boundaries (mentioned only to avoid confusion). **State Election Commissions** conduct **panchayat and municipal** elections (added beyond the brief, because the chapter calls panchayat elections direct).
9. **Model Code of Conduct:** guidelines for parties and candidates, in force **from the announcement of the schedule until the results**; purpose: free and fair elections, no misuse of official machinery (vehicles, staff, premises), no fresh announcements or grants to sway voters, no hatred. No claim is made about its legal force.
10. **Direct elections:** Lok Sabha, Legislative Assemblies, panchayats. **Indirect:** the President and the Vice-President (electoral colleges of elected members; the chapter says "an electoral college" and, in one model answer, that Members of Parliament choose the Vice-President), Rajya Sabha members from a State (elected by that State's **elected MLAs**).
11. **Universal adult suffrage, voting age 18** (used in `m_roll_scn`, `l_whole`, the diary and the roll flow). The 61st Amendment (1988) that lowered the age from 21 is deliberately not cited.
12. **General election:** all seats after the full term (five years for the Lok Sabha and a State Legislative Assembly). **Mid-term:** all seats after early dissolution. **By-election:** one seat vacant by death, resignation or disqualification, **generally filled within six months** (the legal rule has further conditions, for example about the remaining term; the chapter says "generally").
13. Timeline figure: 1950, 1989-90, 1993, 2023, evenly spaced and captioned "schematic, not to scale"; years are asserted in increasing order in the code.
14. All constituencies, States and people (Taralpur, Kesarwadi, Ambarpet, Lohitgarh, Sundarvel, Urvanta, Neelavan, Veluvanam, Harshpura and others) are imagined; the three source documents are labelled as imagined.

## Unsure / gaps
- Item 4: present status of the 2023 selection-committee Act.
- Item 10: the Vice-President's electoral college is Members of both Houses of Parliament; stated in one place as "Members of Parliament".
- Item 7: nomination scrutiny and the observers' role are stated broadly, as the brief asked.
- The imagined panchayat in the diary chooses its chairperson indirectly; in real life the method differs between States, so the diary is labelled imagined and the item asks only about the passage.
- The first draft had 111 items; it was cut to 75 (recall and understanding items not used in tests or checks) to meet the 66-80 range and the 45-60% application-or-above balance.
- No past-paper or specimen item was consulted; the built-in originality scan shows no duplicate stem.
