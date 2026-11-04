# CBSE Class 11 Political Science, Chapter 15: Rights

`cbse-11-political-science-ch15` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch15/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, answer-leak scan, exact-stem originality pre-check and editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (21 and 19 slides) with 4 own SVG figures (no maps) and the rest tables and flows; 6 notes sections; 31 flashcards; 73 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Topics **t01 What are rights; sources and kinds of rights** and **t02 Rights and responsibilities**. This is the theory chapter; the Fundamental Rights are covered in ch02, so the Indian Constitution appears only as one example of a constitution that lists legal rights.

- t01: the standard meaning of a right; the test that separates a right from a want; sources (natural, human, legal); kinds (political, civil liberties, economic, cultural); newer claims (clean environment, privacy, rights of children, rights of indigenous peoples) presented as increasingly recognised.
- t02: duties on the state (to act, to refrain); responsibilities of individuals (respect others' rights, balance clashes, care for shared goods, vigilance when rights are restricted for security, presented neutrally); rights are not absolute and reasonable limits.

Stems are made specific by imagined settings: the countries Karvale, Belmora, Orsolin and Marenia, the towns Pelham, Odrin and Quillon, the hamlet of Dunmere, a school debate, a newspaper report, a table, a letter and a village meeting note. No real case, party, office-holder or current dispute is named.

### Decks
- **Part 1, Meaning, Sources and Kinds (21 slides):** want-or-right decision flow SVG, sources-of-rights chart SVG, kinds-of-rights web SVG; worked examples on want or right in Odrin, sorting claims in Marenia, planning a 5-mark answer; 4 checks (`m_def`, `mt_sources`, `tf_want`, `fb_right`).
- **Part 2, Rights, Responsibilities and Limits (19 slides):** rights-and-responsibilities flow SVG; worked examples on act or refrain in Karvale, the loudspeaker in Pelham, testing limits in Odrin, planning a 5-mark answer; 4 checks (`m_state_duty`, `ord_clash`, `tf_absolute`, `fb_limits`).
- Narration at most 90 words (max 60), no symbols, digits or quotation marks.

### Question bank (73 items)
Types: mcq 28, assertion-reason 6, true-false 4, fill-blank 3, match 2, ordering 2, short 2-mark 10, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Topics: t01 43, t02 27, both 3. Application or above: 49%. Difficulty: d1 3, d2 24, d3 26, d4 17, d5 3.

### Tests
- **Short (20 marks):** A m_source_app, m_clash_app, m_economic_app, ar_limits; B s_right_def, s_limits, s3_balance; C one of l_right_sources / l_clash_limits; D c_debate.
- **Long (40 marks):** A m_notright_app, m_source_app2, m_civil_app, m_newclaim_app, m_equal_all, m_env_app, m_limit_app, m_limit_eval, ar_natural, ar_rr; B s_want_right, s_natural, one of s_state_duties / s_resp, s3_sources, one of s3_resp / s3_vigil; C l_state_resp, one of l_kinds / l_evaluate; D c_news, c_table.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; repeated builds give byte-identical `release.json` and `tests.json` (md5 checked); the near-duplicate scan reports 0 flags (73 stems against 35543 others) and the SVG check 0 issues (4 figures). Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Standard definition of a right: an entitlement or justified claim, recognised by society and usually by law, that lets a person live with dignity and freedom and places a duty on others to respect it.
2. Test of a right (used as a teaching device): necessary for a dignified life, accepted as justified, able to apply equally to all; a want that fails the test is not a right.
3. Natural rights: the idea, of the 17th and 18th centuries, that people have rights by nature, apart from any government; John Locke is associated with the rights to life, liberty and property (named, ideas paraphrased, no quotation).
4. Human rights: rights all persons have because they are human. The Universal Declaration of Human Rights, adopted by the United Nations in 1948, is named as the best-known statement; no article of it is described.
5. Legal rights: recognised and protected by law and the state; constitutions often list them; the Indian Constitution (Fundamental Rights) is named only as an example. No Article number is cited.
6. Kinds: political (to vote, to contest elections, to form parties); civil liberties (freedom of expression, a fair trial, safety from arbitrary arrest in the web chart); economic (basic needs, a minimum wage, livelihood); cultural (to preserve one's language and culture, education in the mother tongue).
7. Newer claims: clean environment, privacy, rights of children, rights of indigenous peoples, presented as claims that are increasingly recognised, at different times in different countries; no Indian or foreign law or case is named.
8. Duties on the state: to act (provide conditions) and to refrain (not violate).
9. Responsibilities of individuals: respect the rights of others; balance rights that clash (for example freedom of expression against privacy); care for shared goods such as the environment; be vigilant when governments restrict rights in the name of security (some argue restrictions can last or grow, others argue a real threat may justify reasonable limits; no real case).
10. Rights are not absolute; a reasonable limit is described as clear, announced, applied to all, protecting others or the common good, and leaving the right in place.
11. All countries, towns, people, debates, reports, tables, letters and notes are imagined and labelled.

Unsure or noted: (a) the web chart and notes list "safety from arbitrary arrest" as a civil liberty, one step beyond the two examples in the brief; a reviewer may confirm it fits the scope. (b) No jurisdiction is named for the newer claims, so no dated note is needed. (c) Application-or-above is 49%, close to the lower edge of the 45 to 60% band. (d) The sources chart (a picture, not narration) uses the abbreviation "UN" and numerals such as "17th".
