# CBSE Class 11 Political Science, Chapter 4: Executive

`cbse-11-political-science-ch04` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-sonnet-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch04/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (19 and 21 slides) with 4 SVG figures and the rest tables and flows; 6 notes sections; 32 flashcards; 76 questions worth 140 marks (incl. case parts and alternatives) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

- **t01 Parliamentary executive in India:** the executive (political and permanent), three types (presidential, parliamentary, semi-presidential), President (nominal head, electoral college, single transferable vote, term, impeachment, powers, binding advice, discretion), Vice-President, Prime Minister and Council of Ministers (appointment, six-month rule, collective responsibility, 91st Amendment limit, Cabinet, party position and coalitions), one line on Governors and Chief Ministers.
- **t02 Permanent executive: bureaucracy:** merit, training, neutrality, role; All India, Central and State Services; UPSC and State Public Service Commissions, security of tenure; reservation (stated factually, dated); issues framed as some argue / others argue.

### Decks
- **Part 1, Types of Executive and the President (19 slides):** types comparison SVG, President's election-flow SVG; worked examples on classifying imagined countries (Arvelia, Brendoria, Calvaris) and on a hung House; 4 checks (`mt_types`, `m_nominated`, `m_pocket`, `m_vpacts`).
- **Part 2, Prime Minister, Council of Ministers and the Permanent Executive (21 slides):** Union executive structure SVG, civil-services structure SVG; worked examples on the 15 per cent limit and on a district officer's diary; 4 checks (`m_sixmonths`, `m_noconf`, `tf_ias`, `m_psc`).
- Narration at most 90 words, no symbols, digits or quotation marks.

### Question bank (76 items)
Types: mcq 33, assertion-reason 6 (a, a, b, b, c, d), true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 10, short 3-mark 7, long 5-mark 6, case-based 4 (1 + 1 + 2 with either/or in part c). Difficulty and competency are in the build stats; 47% are application or above. Passages are imagined and labelled: a newspaper report on a hung House, a District Collector's diary, a list of ministers of an imagined state, a classroom discussion.

### Tests
- **Short (20 marks):** A m_political, m_pmappt, m_tenure, ar_nominal; B s_nominal, s_upsc, s3_services; C one of l_types / l_president; D c_press.
- **Long (40 marks):** A m_college, m_advice, m_hung, m_collective, m_perm, m_upsc, m_reserv, m_brendoria, ar_stv, ar_civil; B s_college, s_collective, one of s_vp / s_neutral, s3_pm, one of s3_discretion / s3_issues; C l_pm_council, one of l_actual / l_bureau; D c_diary, c_table.

## How verified
See the report returned with this chapter: build output, byte-identical rebuilds, and the near-duplicate and SVG checks. Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. The executive implements laws and policies. The political executive is elected and temporary (ministers and the head of government); the permanent executive is the civil servants.
2. Presidential (example: the United States; the President is head of state and government, elected by the people for a fixed term; the US uses electors, so the chart says "voters, fixed term" and no item calls the election strictly direct), parliamentary (the United Kingdom and India; Prime Minister and Cabinet responsible to the legislature; nominal head of state), semi-presidential (France; directly elected President and a Prime Minister responsible to the legislature).
3. President of India: nominal (constitutional) head; executive power exercised in the President's name (Article 53) on the advice of the Council of Ministers (Article 74).
4. President elected indirectly by an electoral college of the elected members of both Houses of Parliament and of the elected members of the State Legislative Assemblies, including those of Delhi and Puducherry (Article 54; the Union Territory list follows the brief and should be checked against the current Article 54 explanation); proportional representation by single transferable vote; secret ballot. Nominated members of Parliament do not vote for the President but do vote for the Vice-President (the chapter relies on this).
5. President's term five years (Article 56); removal by impeachment for violation of the Constitution (Article 61).
6. Powers in four groups: executive (appoints the Prime Minister, judges, Governors and others), legislative (assent to bills, ordinances, addressing Parliament), financial (a money bill is introduced only on the President's recommendation), emergency (proclaiming an emergency on the advice of the Council).
7. 42nd Amendment (1976) made the advice binding; 44th Amendment (1978) lets the President return the advice once for reconsideration, after which the President must act on it.
8. Discretion in practice: returning the advice once; delaying assent to an ordinary bill (the pocket veto, since no time limit is set); choosing a Prime Minister when no party or alliance has a clear majority.
9. Vice-President: elected by the members of both Houses; five-year term; ex officio Chairman of the Rajya Sabha; acts as President when the office is vacant.
10. Prime Minister appointed by the President, usually the leader of the majority in the Lok Sabha; other ministers appointed on the Prime Minister's advice; ministers must be members of Parliament or become members within six months (Article 75(5)); collective responsibility to the Lok Sabha (Article 75(3)); a no-confidence motion can remove the government.
11. 91st Amendment (2003): the Council of Ministers (including the Prime Minister) limited to 15 per cent of the Lok Sabha's strength (Article 75(1A)); a similar limit for states (Article 164(1A)). The worked examples use Assemblies of 200 and 120 members and an imagined 240-member Assembly (limit 36). The statement "the Chief Minister is counted" follows the rule that the limit covers the whole Council including the head.
12. Council of Ministers has three ranks (Cabinet Ministers, Ministers of State, Deputy Ministers); the Cabinet is the inner group. Governors and Chief Ministers form a similar system in the states; in the states the Council is responsible to the Legislative Assembly.
13. Civil servants: recruited on merit, trained, politically neutral; implement policies and advise ministers.
14. All India Services (for example the Indian Administrative Service and the Indian Police Service; the Indian Forest Service is also one but is not named) are recruited by the Union and serve in the states; Central Services serve the Union; State Services serve a state. UPSC recruits for the Union services (including the All India Services); State Public Service Commissions for the state services. Members of the Commissions have security of tenure (Articles 315 to 323; no tenure details such as six years or age 65 are stated).
15. Reservation in recruitment: allowed by Article 16(4); in direct recruitment to Union posts, as of 2024, 15 per cent for Scheduled Castes, 7.5 per cent for Scheduled Tribes and 27 per cent for Other Backward Classes; states fix their own. Other categories of reservation are not mentioned.
16. The three amendments in order: 1976 (42nd), 1978 (44th), 2003 (91st); the Constitution in force 26 January 1950.
17. Issues about the bureaucracy are framed as some argue / others argue: political interference, accountability to citizens, red tape, responsiveness.
18. No current office-holder, party, government or coalition is named; all countries other than the United States, United Kingdom and France, and all states, districts, people, alliances and newspapers in scenarios are imagined.

Unsure or noted: (a) the Union Territory list for the electoral college follows the brief; (b) the Constitution article numbers cited here (53, 54, 56, 61, 74, 75, 164, 16(4), 315 to 323) are from memory and should be checked once; (c) the 15 per cent state limit also has a minimum of twelve ministers, which the chapter does not mention; (d) the reservation percentages are dated "as of 2024".
