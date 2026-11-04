# CBSE Class 11 Political Science, Chapter 16: Citizenship

`cbse-11-political-science-ch16` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch16/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, answer-leak scan, exact-stem originality pre-check and editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 19 slides) with 4 own SVG figures (no maps) and the rest tables and flows; 7 notes sections; 34 flashcards; 75 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Topics **t01 Full and equal membership; equal rights** and **t02 Citizen and nation; universal citizenship** (the syllabus title for t02; the brief also places global citizenship here).

- t01: the standard definition of citizenship, rights and obligations; Marshall's civil, political and social rights; struggles for equal citizenship in general terms (French Revolution, the struggle against apartheid, women's and Dalit movements in India); equal rights in practice (freedom to move and work with a neutral treatment of the debate on arrivals from other states, the urban poor, tribal people and forest dwellers, and why equal citizenship needs attention to disadvantaged groups); citizen and nation (criteria set by nation-states; India's Part II and Citizenship Act 1955 as amended over time; the five general modes; single citizenship; equality of citizenship).
- t02: universal citizenship; refugees and stateless persons; UNHCR; the choices states face (both views); global citizenship and the internet; the views that it complements national citizenship or that national citizenship remains the main source of rights.
- Left out on purpose: any current citizenship law amendment, register, or migration or refugee dispute, and any real group of migrants or refugees. All cases are imagined.

Originality: every stem is built on an imagined migrant mason in the imagined city of Kalvara, the Harbour Lane settlement and its petition, the Sarna Hills and Dhanvi Forest, the countries Torvania (with Brennick) and Ostrell, the Marlen family, the Lumen Global Youth Forum, a letter, a table and a report.

### Decks
- **Part 1, Full and Equal Membership (20 slides):** Marshall chart SVG, equal-citizenship web SVG and modes-of-citizenship flow SVG; tables for definition, obligations, struggles, freedom to move, urban poor, forest dwellers, nation criteria; worked examples on classifying situations in Kalvara, the Harbour Lane petition, and modes in imagined Torvania; 4 checks (`m_cit_def`, `mt_marshall`, `tf_equal_all`, `fb_citizenship`).
- **Part 2, Universal and Global Citizenship (19 slides):** national versus global comparison SVG; tables for universal citizenship, refugee versus stateless versus citizen, UNHCR, states' choices, global citizenship, the internet, the two views; worked examples on the Marlen family, an imagined forum discussion and planning a 5-mark answer; 4 checks (`m_refugee_def`, `tf_refugee_stateless`, `ord_global_steps`, `fb_stateless`).
- Narration at most 90 words (max 73), no symbols, digits or quotation marks (years spelled out).

### Question bank (75 items)
Types: mcq 29, assertion-reason 7, true-false 4, fill-blank 3, match 2, ordering 2, short 2-mark 10, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Topics: t01 49, t02 26. Application or above: 51%. Difficulty: d1 4, d2 20, d3 32, d4 17, d5 2.

### Tests
- **Short (20 marks):** A m_civil_app, m_stateless_app, m_global_app, ar_equal_attention; B s_cit_def, s_refugee_unhcr, s3_disadv; C one of l_marshall / l_universal; D c_petition.
- **Long (40 marks):** A m_political_app, m_social_app, m_modes_descent, m_forest_app, m_migr_neutral, m_states_views, m_both_views, m_enforce, ar_nation, ar_stateless; B s_marshall, s_migrant_app, one of s_stateless / s_global_internet, s3_modes, one of s3_states_choice / s3_global_views; C l_nation_modes, one of l_equal_practice / l_global; D c_worker, c_forum.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; consecutive builds give byte-identical `release.json` and `tests.json` (md5 checked); near-duplicate scan 0 flags (75 stems against 35541 others), SVG check 0 issues (4 figures). Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Standard definition: citizenship is full and equal membership of a political community, usually a nation-state; it carries rights and obligations.
2. T. H. Marshall, *Citizenship and Social Class*, 1950 (name, title and year only): civil rights (individual freedom, such as speech, thought, faith, property, a fair hearing), political rights (a share in power, such as voting and standing), social rights (welfare and security, such as schooling and health care). All paraphrased.
3. The French Revolution, 1789: people as citizens with equal rights and not subjects ranked by birth (general terms only; no named document).
4. Apartheid in South Africa: a system of racial discrimination that denied equal citizenship to most people; ended in the early 1990s; first democratic election in 1994.
5. Women's movements and movements of Dalits in India: equal rights, an end to untouchability, dignity (general terms; no law or Article cited for these movements).
6. Freedom to move freely and to reside and work in any part of India: Article 19, subject to reasonable restrictions (stated as a freedom and not tied to any case).
7. India has a single citizenship for the whole country (no separate state citizenship).
8. Part II of the Constitution and the Citizenship Act 1955 provide for citizenship; general modes only: birth, descent, registration, naturalisation, incorporation of territory, "as provided in the Act, which has been amended over time". The imagined descent and naturalisation cases are set in the imagined Torvania, not India.
9. Constitutional principle: citizenship is given equally to all, without distinction of religion, caste or gender (as the Constitution intends).
10. Refugee: a person forced to leave his or her country by persecution, war or violence and unable to return safely. Stateless person: a person whom no state considers a citizen. A refugee may still hold the home country's citizenship; a stateless person may never have left the country of birth.
11. UNHCR: the United Nations High Commissioner for Refugees, the United Nations refugee agency, created in 1950; works to protect refugees.
12. Universal Declaration of Human Rights, 1948: everyone has the right to a nationality.
13. Obligations listed: obey the laws, pay taxes, respect the rights of others.
14. Global citizenship: belonging to a world community with responsibilities toward humanity (environment, human rights, disaster relief); made easier by the internet; not citizenship of a world state. Views: complements national citizenship; or national citizenship remains the main source of rights because states enforce them.
15. Views on states' choices on admission (humanitarian duty versus limits on housing and services, first duty to own citizens, security checks) are given as "some argue, others argue" in imagined cases only.
16. All people, places, countries, petitions, letters, tables, reports and discussions are imagined and labelled. No map, party, office-holder, current dispute, real migrant or refugee group is mentioned.

Unsure or noted: (a) The syllabus title for t02 is "Citizen and nation; universal citizenship", and the brief assigns "citizen and nation" content to t01; items on modes and criteria are therefore tagged t01 and the t01/t02 split is 49/26, which a reviewer may rebalance. (b) The Article 19 reference and the "single citizenship" fact are stable but should be confirmed by a reviewer.
