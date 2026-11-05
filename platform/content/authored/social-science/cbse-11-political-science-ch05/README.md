# CBSE Class 11 Political Science, Chapter 5: Legislature

`cbse-11-political-science-ch05` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-sonnet-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch05/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the output. The shared library is `../../cbse-11-political-science-ch01/src/lib.mjs` (not edited).

| File | What |
|---|---|
| `release.json` | 2 decks (19 and 22 slides) with 4 SVG figures (two-Houses chart, bill-to-law flowchart, control web, money-bill flow) and the rest tables and flows; 6 notes sections; 34 flashcards; 79 questions worth 146 marks (incl. case parts and alternatives) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

- **t01 Parliament: Lok Sabha and Rajya Sabha:** functions of a parliament, why two Houses (and the six State Legislative Councils, as of 2024), composition, election and term of each House, powers shared by both, money bills, the no-confidence motion, Articles 249 and 312.
- **t02 Law-making and control over the executive:** kinds of bills, the stages of an ordinary bill and assent, joint sitting (Article 108), money bills (Article 110), Question Hour, Zero Hour, calling attention, adjournment motion, financial control (budget, demands for grants, Comptroller and Auditor General, Public Accounts Committee), no confidence, standing and joint committees and why they matter, presiding officers, the anti-defection law, and the neutral "has Parliament declined" debate.

### Decks
- **Part 1, Parliament, the Lok Sabha and the Rajya Sabha (19 slides):** two-Houses comparison SVG, money-bill flow SVG; worked examples on an imagined Rajya Sabha election from Palmora and on the imagined Coastal Levy Bill; 4 checks (`m_rs_max`, `m_ls_dissolve`, `m_money_origin`, `m_noconf_rs`).
- **Part 2, Law-making, Control of the Executive and Committees (22 slides):** bill-to-law flowchart SVG, control-instruments web SVG; worked examples on the imagined Village Libraries Bill and the imagined Coastal Fisheries Bill deadlock; 4 checks (`m_first`, `m_joint_money`, `m_qhour`, `m_split`).
- Narration at most 90 words, no symbols, digits or quotation marks.

### Question bank (79 items)
Types: mcq 35, assertion-reason 6 (a, a, b, d, c, b), true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 10, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). 48% are application or above (see the competency fix below); difficulty d1 2, d2 19, d3 44, d4 13, d5 1. Passages are imagined and labelled: a newspaper report on a joint sitting, a Question Hour transcript, a standing committee report, a member's letter on the Tenth Schedule, and a table of sitting days for the imagined country of Veldora. Bills (Coastal Fisheries, Village Libraries, Urban Lakes Protection, Coastal Levy, Harbour Tax), members, parties, newspapers, the federation of Rhenia and Veldora are all imagined.

### Tests
- **Short (20 marks):** A m_rs_perm, m_money_14, m_zero, ar_bicam; B s_rs_elect, s_question, s3_bill; C one of l_houses / l_control; D c_bill.
- **Long (40 marks):** A m_why, m_certify, m_249, m_second, m_joint_trigger, m_pac, m_whip, m_ls_size, ar_perm, ar_defect; B s_bicam, s_terms, one of s_money / s_pac, s3_ls_special, one of s3_joint / s3_committees; C l_bill, one of l_powers / l_committees; D c_transcript, c_committee.
- Not in either test (spare practice): `c_defect`, `c_table`, `s3_rs_special`, `s3_defect`, and the deck-check items.

## How verified
See the report returned with this chapter: build output (lint 0 errors, 0 warnings), byte-identical rebuilds, and the near-duplicate and SVG checks. Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Functions of Parliament: law-making, representation of the people and the States, control of the executive, debate.
2. Two Houses: to represent the States as well as the people and to allow reconsideration of bills. Only six States have a Legislative Council, as of 2024.
3. Rajya Sabha: at most 250 members, 238 elected and 12 nominated by the President for distinction in art, literature, science and social service. Notes add, as of 2024: 245 members, 233 elected, with seats also for Delhi and Puducherry.
4. Rajya Sabha elected indirectly by the elected members of State Assemblies, by proportional representation by the single transferable vote; seats broadly by population (unequal, unlike the US Senate with two per State); six-year term; permanent House, about one-third retire every second year; minimum age 30; the Vice-President is ex officio Chairman.
5. Lok Sabha: directly elected by first past the post; the Constitution allows up to 550 elected members (as of 2024); 543 constituencies; 530 for the States is mentioned only in a distractor explanation in `m_ls_size`; five-year term unless dissolved; minimum age 25; the Speaker presides.
6. The nomination of two Anglo-Indian members ended with the 104th Amendment (passed 2019, in effect 2020).
7. Powers shared: ordinary bills, constitutional amendments (special majority), election of the President (elected members of both Houses) and Vice-President (all members of both Houses). Nominated members vote on bills and for the Vice-President but not for the President.
8. Money bills (Article 110) start only in the Lok Sabha; the Speaker certifies; the Rajya Sabha has 14 days to return it with suggestions (Article 109); the Lok Sabha may accept or reject them; after 14 days it is deemed passed; no joint sitting; the President cannot return a money bill.
9. Only the Lok Sabha passes a no-confidence motion; the Council of Ministers is collectively responsible to it. Demands for grants are voted only in the Lok Sabha.
10. Article 249: a resolution of two-thirds of Rajya Sabha members present and voting, in the national interest, lets Parliament legislate on a State List subject. Article 312: the same majority lets Parliament create a new All India Service.
11. Ordinary bill: introduction and first reading; second reading (possible committee); consideration and third reading; the same in the other House; assent. The President may return an ordinary bill once; if passed again, assent must follow; no time limit for assent (the pocket veto).
12. Joint sitting (Article 108) for an ordinary bill: when a House rejects it, the Houses disagree on amendments, or more than six months pass without the other House acting; the Speaker presides; a majority of members present and voting decides. The Lok Sabha has more than twice the Rajya Sabha's members.
13. Government bill (introduced by a minister) versus private member's bill (by a non-minister, rarely passed).
14. Question Hour: first hour of a sitting; Zero Hour: a practice, not in the rules as such; calling attention; adjournment motion (Lok Sabha) for a definite matter of urgent public importance.
15. The Comptroller and Auditor General audits accounts and reports to Parliament; the Public Accounts Committee examines the reports. Department-related standing committees began in 1993. Joint parliamentary committees are ad hoc, with members of both Houses.
16. Anti-defection law: 52nd Amendment (1985), Tenth Schedule; disqualification for leaving the party or defying the whip without permission and without condonation within fifteen days; the presiding officer decides; the 91st Amendment (2003) removed the one-third split exception, leaving a merger agreed by two-thirds protected.
17. Order of dates used in `ord_dates`: 1950, 1985, 2003, 2019 (in effect 2020).
18. The decline debate is framed as some argue / others argue; no party or office-holder is named. All countries other than the United States, all bills, members, parties, newspapers and the Veldora data are imagined.

Unsure or noted: (a) the Article numbers 108, 109, 110, 249 and 312 are from memory and should be checked once; (b) the "more than six months" delay trigger in Article 108 and the fifteen-day condonation period in the Tenth Schedule are stated from memory; (c) the statement that a nominated member votes for the Vice-President but not the President should be confirmed; (d) the 245 and 233 Rajya Sabha figures are dated "as of 2024".

## Competency fix (2026-11-05)
An earlier pass had raised some tags to reach the application-or-above band. Tags are now honest, and the band is met by changing items.

**Honest retags (3)**
- `m_certify` (who certifies a money bill): application to recall.
- `m_first` (naming the first-reading stage from a description): application to understanding.
- `m_jpc` (naming an ad hoc joint committee): application to understanding.
- `m_private` stays application (classifying a bill from a scenario).

**Items rewritten as genuine application items (5; key, type, marks, topic and position unchanged)**
| Key | Old tag | New tag | What changed |
|---|---|---|---|
| `m_joint_presides` | recall | application | Was "who presides at a joint sitting". Now an imagined Urban Wetlands Bill passed by the Lok Sabha and left untouched by the Rajya Sabha for over six months: what can be done (joint sitting, Article 108). |
| `m_cag` | recall | application | Was "what does the Comptroller and Auditor General do". Now an imagined Salt Pan Tax Bill (money bill) that the Rajya Sabha votes to reject without returning it: position after 14 days (deemed passed). |
| `m_dept` | understanding | application | Was "why standing committees are valued". Now an imagined member who wants a ministry's work and budget studied in detail through the year: which instrument of control. |
| `m_split` | understanding | application | Was "which Amendment removed the split exception". Now 24 of 30 imagined legislators agreeing to merge with another party: disqualified or not (two-thirds merger protected). |
| `m_312` | recall | application | Was "who passes the resolution for a new All India Service". Now an imagined Coastal Service with 90 of 150 Rajya Sabha members in favour: can Parliament act under Article 312 (needs 100). |

`m_split` and `m_first` are deck-check items; `m_split` is still a valid check on the same topic. The facts used are those already in "Facts for a reviewer" (items 8, 10, 12, 16).

**New competency counts (79 items):** recall 12, understanding 29, application 31, analysis 4, evaluation 3. Application or above: 38 of 79 = 48.1%.
