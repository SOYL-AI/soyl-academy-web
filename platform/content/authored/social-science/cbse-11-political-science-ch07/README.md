# CBSE Class 11 Political Science, Chapter 7: Federalism

`cbse-11-political-science-ch07` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-sonnet-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch07/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (22 and 21 slides) with 4 SVG figures (no maps) and the rest tables and flows; 7 notes sections; 32 flashcards; 77 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

- **t01 Federalism in the Indian Constitution:** meaning and features of federalism, contrast with a unitary system, examples of federations (United States, Canada, Australia in general terms); Article 1 Union of States; the Seventh Schedule lists with examples (no subject counts), Union law prevailing on the Concurrent List, residuary powers (Article 248); federalism with a strong centre (reasons as commonly taught); centralising features (Article 3, Articles 352 and 356, Governor, All India Services, Article 249, financial dependence); fiscal and cooperative federalism (Finance Commission, Goods and Services Tax Council, NITI Aayog).
- **t02 Conflicts and special provisions:** general demands for state autonomy (no movement named); Governor and President's Rule; S. R. Bommai (1994) named with its limits; States Reorganisation Act 1956; new states of 2000 and 2014 as facts; boundary and river-water disputes with imagined states and the 1956 Act; asymmetric federalism (Article 371 and related Articles, no state named); Article 370 as dated facts only; overall view with both sides.

### Decks
- **Part 1, Federalism in the Indian Constitution (22 slides):** federal-versus-unitary SVG, three-lists SVG, unitary-features web SVG; worked examples on Kestria, on classifying imagined subjects, and on an imagined Finance Commission report; 4 checks (`m_fed_def`, `mt_lists`, `m_emerg`, `m_coop_app`).
- **Part 2, Conflicts and Special Provisions (21 slides):** timeline SVG (1950, 1956, 2000, 2014, 2015, 2017, 2019); worked examples on an imagined President's Rule report and on a river dispute between imagined Merivan and Sundara; 4 checks (`m_bommai`, `ord_time`, `ord_river`, `ar_asym`).
- Narration at most 90 words, no symbols, digits or quotation marks.

### Question bank (77 items)
Types: mcq 32, assertion-reason 6, true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 11, short 3-mark 8, long 5-mark 6, case-based 4 (1 + 1 + 2 with either/or in part c). Stems use imagined Kestria (three levels), Orlandia (unitary), states Merivan, Sundara, Kandara and Halvari, the river Sarpini, an imagined handbook table, newspaper report, letters and a classroom discussion.

### Tests
- **Short (20 marks):** A m_feature_app, m_list_state_app, m_fincom, ar_resid; B s_fed, s_conc, s3_lists; C one of l_features / l_strong; D c_kestria.
- **Long (40 marks):** A m_unitary_app, m_conflict_app, m_residuary, m_art3_app, m_356, m_river_app, m_asym_app, m_bommai_app, ar_umpire, ar_bommai; B s_resid, s_gov, one of s_bommai / s_river, s3_unitary_feat, one of s3_disputes / s3_autonomy; C l_lists, one of l_conflicts / l_special; D c_finance, c_river.

## How verified
Build prints `NO ERRORS`, `lint: 0 error(s), 0 warning(s)`; three consecutive builds give byte-identical `release.json` and `tests.json`; the near-duplicate scan reports 0 flags and the SVG check 0 issues (see the writer's report). Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Federalism: two or more levels of government, each with powers given by a written and supreme constitution; change of the division of powers needs both levels or a special procedure; an independent judiciary is umpire; contrast with a unitary system; United States, Canada and Australia named as examples in general terms.
2. Article 1 describes India as a Union of States; the Union is not the result of an agreement among the states and no state has a right to leave it.
3. Seventh Schedule: Union List (defence, foreign affairs, banking, currency, railways), State List (police, public order, agriculture, public health), Concurrent List (education, forests, marriage, trade unions); examples only, no subject counts. On a Concurrent subject the Union law prevails in a conflict.
4. Residuary powers lie with the Union, Article 248.
5. Reasons commonly taught for a strong centre: unity and security after Partition, planned development.
6. Article 3: Parliament can form new states and alter the area, boundaries and names of states by law; the President refers the bill to the state legislature for its views, which do not bind Parliament.
7. Article 352 national emergency; Article 356 President's Rule in a state (executive power of a state passes to the Union when the constitutional machinery is held to have failed).
8. The Governor is appointed by the President and can reserve a state bill for the President.
9. All India Services are common to the Union and the states (recruited and regulated by the Union, serving in the states).
10. Article 249: on a Rajya Sabha resolution passed by two thirds of members present and voting, Parliament can legislate on a State List subject in the national interest for a limited period.
11. Financial dependence of states on Union transfers.
12. Finance Commission, Article 280, constituted by the President usually every five years; recommends sharing of taxes between the Union and the states and grants.
13. Goods and Services Tax Council: 101st Amendment 2016; tax in force from 2017; example of cooperative federalism. (Council composition and voting weights are not stated.)
14. NITI Aayog set up in 2015, replacing the Planning Commission.
15. Some states have demanded more autonomy (larger share of revenue, less interference, own priorities); stated generally, no movement or state named; views set out as some argue / others argue.
16. S. R. Bommai case (1994), named only: a floor test to test a majority, and judicial review of a proclamation of President's Rule.
17. States Reorganisation Commission appointed 1953 (named once); States Reorganisation Act 1956, largely on linguistic lines.
18. New states by law of Parliament under Article 3: Chhattisgarh, Uttarakhand and Jharkhand in 2000; Telangana in 2014 (facts only; nothing said on the demands or their merits).
19. Inter-State River Water Disputes Act 1956: at a state's request the Union refers a dispute to a tribunal that gives an award. Article 131 (original jurisdiction of the Supreme Court in disputes between states) is mentioned for boundary disputes. Inter-State Council (Article 263) and Zonal Councils named as forums for talks.
20. Article 371 and related Articles give special provisions to several states (the North-East and some others named only as regions; no state or provision detail given): asymmetric federalism.
21. Article 370, one dated line set: provisions changed in 2019, Jammu and Kashmir reorganised into two Union Territories; the Supreme Court upheld the change in December 2023 (as of 2024). No evaluation, no debate. This is the only mention of Jammu and Kashmir.
22. Overall: federalism has helped accommodate diversity; some argue the centre is too strong, others that a strong centre is needed for unity.
23. Timeline years: 1950 Constitution in force; 1956; 2000; 2014; 2015; 2017; 2019. No map is used; every state, river, country (Kestria, Orlandia), newspaper, official and person in scenarios is imagined. The imagined Finance Commission report gives no real percentages.

Unsure or noted: (a) Article numbers 1, 3, 131, 248, 249, 263, 280, 352, 356, 370, 371 are from memory and should be checked once; (b) the Article 249 majority is stated as two thirds of members present and voting; (c) the States Reorganisation Commission year 1953 is mentioned once; (d) Article 370 and the 2023 decision are dated "as of 2024" and may need a note if later events change them.
