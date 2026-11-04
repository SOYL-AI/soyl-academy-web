# CBSE Class 11 Political Science, Chapter 13: Equality

`cbse-11-political-science-ch13` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch13/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 18 slides) with 4 own SVG figures (no maps) and the rest tables and flows; 6 notes sections; 33 flashcards; 72 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Topics **t01 Significance and dimensions of equality** and **t02 Promoting equality: affirmative action**.

- t01: why equality matters (French Revolution slogan, anti-colonial and anti-discrimination movements, Universal Declaration of Human Rights named only); the meaning and standard definition of equality; justified versus unjust differences in treatment; natural versus socially produced inequalities; political, social and economic equality; the perspectives of Ram Manohar Lohia, Marxism, liberalism and feminism, stated neutrally and not ranked.
- t02: formal equality and Articles 14, 15 and 17 (paraphrased); equality through differential treatment (ramps, maternity benefits); affirmative action and reservations in education and public jobs for Scheduled Castes, Scheduled Tribes and Other Backward Classes under Articles 15(4) and 16(4); the debate on reservations presented as some argue, others argue; one dated line on the 103rd Amendment.

Overlap with CBSE 10 Social Science and ch02 (Rights) on Articles 14 to 17 is avoided by building every stem on imagined clubs, companies, colleges, schools, towns, notices, tables and discussions.

### Decks
- **Part 1, Meaning, Dimensions and Perspectives (20 slides):** natural-versus-social, three-dimensions and perspectives SVGs; worked examples on sorting inequalities in imagined Veldmoor, naming the dimension, and planning a 5-mark answer; 4 checks (`m_def`, `tf_nat`, `fb_dim`, `mt_persp`).
- **Part 2, Promoting Equality and Affirmative Action (18 slides):** ladder SVG (formal equality, differential treatment, affirmative action); worked examples on sorting measures in imagined Quillby, weighing a seat scheme at imagined Hesk Polytechnic, and planning a 5-mark answer; 4 checks (`m_formal`, `ord_ladder`, `mt_art`, `ar_aa`).
- Narration at most 90 words (max 66), no symbols, digits or quotation marks.

### Question bank (72 items)
Types: mcq 29, assertion-reason 5, true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 10, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Topics: t01 40, t02 32. Application or above: 47%. Difficulty: d1 7, d2 15, d3 31, d4 17, d5 2. Imagined: Ostrel, Veldmoor, Quillby, Hesk, Lindor, the Brindle Hill Club, Marrowdale Foods Ltd, Hesk Polytechnic, and all people.

### Tests
- **Short (20 marks):** A m_social_app, m_dim_app_econ, m_aa_app, ar_nat_soc; B s_nat_soc, s_diff, s3_classify; C one of l_dims / l_ladder; D c_club.
- **Long (40 marks):** A m_unjust_app, m_dim_app_social, m_lib_app, m_persp, m_art14_app, m_diff_app, m_debate_app, m_res_art, ar_ident, ar_formal; B s_justified, s_formal, one of s_dim / s_art_aa, s3_persp, one of s3_debate / s3_ladder; C l_meaning, one of l_aa / l_persp; D c_hiring, c_admit.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; repeated builds give byte-identical `release.json` and `tests.json`; the near-duplicate scan reports 0 flags and the SVG check 0 issues. Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. French Revolution, 1789; its slogan joined liberty, equality and fraternity.
2. Universal Declaration of Human Rights, 1948: named only.
3. Standard definition: all persons deserve equal respect and consideration, equal rights, and equal opportunities to develop themselves; equality does not mean identical treatment in every case.
4. Natural inequalities (talent, ability) versus socially produced inequalities (caste, class, gender discrimination); differences are justified by need or work done and unjust when based on birth or status.
5. Dimensions: political (equal citizenship, voting and civil rights), social (equal opportunities, education and health care access, removal of discrimination), economic (reducing large gaps in wealth and income).
6. Ram Manohar Lohia named inequality between men and women, by skin colour, by caste, colonial rule of some peoples over others, and economic inequality (paraphrased; no quotation; described as a thinker and political leader of the twentieth century).
7. Marxism: inequality rooted in private ownership of resources. Liberalism: competition is fair if opportunities are equal; wary of concentrated power. Feminism: equal rights for women and men; challenges patriarchy (defined as a social system in which men hold the dominant power in family and society). No ranking.
8. Article 14: equality before the law and equal protection of the laws. Article 15: no discrimination on grounds such as religion, race, caste, sex or place of birth, with access to shops, restaurants and public places (Article 15(2)); Article 15(3): special provisions for women and children; Article 15(4): special provisions for socially and educationally backward classes, Scheduled Castes and Scheduled Tribes; Article 16(4): reservation in public appointments for backward classes not adequately represented; Article 17: abolition of untouchability. All paraphrased, no Article text reproduced.
9. Reservations in education and public jobs for Scheduled Castes, Scheduled Tribes and Other Backward Classes (as given in the brief).
10. 103rd Amendment, 2019: reservation for economically weaker sections; upheld by the Supreme Court in 2022; stated "as of 2024" with no evaluation (the brief's optional dated line).
11. Debate on reservations: some argue they correct long-standing disadvantage and make institutions representative; others argue for other or additional means (scholarships, coaching, hostels) or different criteria. No side taken; no real case named.
12. All towns, club, company, college, school, notices, tables and discussions are imagined and labelled. No map is used.

Unsure or noted: (a) item 8, the attribution of shop and restaurant access to Article 15(2) and special provisions for women and children to Article 15(3), is from memory of the Articles and should be checked once; (b) item 9 relies on the brief for the three groups; (c) the 2022 decision is stated only as the Supreme Court having upheld the amendment, with no detail of the judgment.
