# CBSE Class 11 Political Science, Chapter 11: Political Theory: An Introduction

`cbse-11-political-science-ch11` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch11/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (18 and 21 slides) with 4 own SVG figures (no maps) and tables and flows; 6 notes sections; 30 flashcards; 79 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Single topic, **t01 What is politics and political theory**: popular and wider views of politics, the idea of Aristotle, the standard definition and its parts, politics in the family, school, market and government; what political theory studies (ideas and principles; eight concepts), normative versus descriptive questions, clarifying concepts and testing opinions with reasons; nine thinkers named with a period and one idea each; theory in practice (reservation, gender equality and freedom of expression as questions on which people differ; the Fundamental Rights as applications of ideas); reasons for studying political theory. Freedom, equality, justice and the other concepts are only named and glossed; later chapters treat them. Every stem is built on an imagined school council, household, debate club, market, town, district, forum, newspaper report or letter.

### Decks
- **Part 1, What Is Politics? (18 slides):** web SVG "politics is everywhere"; worked examples on a school council, sorting imagined situations and planning a 5-mark answer; 4 checks (`tf_gov`, `p_def`, `fb_aristotle`, `p_power_app`).
- **Part 2, What Political Theory Does and Why We Study It (21 slides):** concepts-map SVG, descriptive-versus-normative chart SVG, thinkers timeline SVG; worked examples on classifying statements, clarifying the word fair and reasoning against impulse; 4 checks (`tf_normative`, `ord_debate`, `mt_thinkers`, `pr_art17`).
- Narration at most 90 words (max 62), no symbols, digits, abbreviations or quotation marks.

### Question bank (79 items)
Types: mcq 33, assertion-reason 6, true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 12, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Application or above: 53%. Difficulty: d1 3, d2 15, d3 45, d4 16.

### Tests
- **Short (20 marks):** A p_family_app, pt_norm_app, th_locke_app, ar_wider; B s_canteen, s_pt_def, s3_everywhere; C one of l_politics / l_pt; D c_council.
- **Long (40 marks):** A p_market_app, pt_clarify_app, th_hobbes_app, th_rousseau, pr_art19, pr_theory_app, w_reason_app, w_prejudice_app, ar_normative, ar_impulse; B s_def, s_negative, one of s_normdesc / s_clarify, s3_classify, one of s3_debates / s3_why; C l_normdesc, one of l_practice / l_why; D c_table, c_letter.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; repeated builds give byte-identical `release.json` and `tests.json`; the near-duplicate scan reports 0 flags and the SVG check 0 issues. Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Standard definition of politics used: the process by which groups make collective decisions about how to live together, who gets what, and how power is used.
2. Popular view: manipulation, scheming or self-interest of politicians. Wider view: the activity through which a society makes collective decisions, resolves differences and pursues common goals; it touches family, school, market and government.
3. Aristotle (ancient Greece): human beings are political by nature, living in communities (given in plain words, not quoted).
4. Political theory studies the ideas and principles that shape constitutions, governments and social life; concepts named: freedom, equality, justice, rights, democracy, citizenship, nationalism, secularism.
5. Normative questions ask what ought to be; descriptive questions ask what is.
6. Thinkers, period and one-line idea: Plato (ancient Greece; justice and the well-ordered state); Aristotle (ancient Greece; humans are political beings); Machiavelli (16th century; how rulers gain and keep power in practice); Hobbes (17th century; a common authority is needed for security); Locke (17th century; government rests on consent and protects natural rights, with life, liberty and property in one stem); Rousseau (18th century; people are free by nature yet bound in society, so how can common rules be consistent with freedom); Marx (19th century; economic arrangements and class conflict shape society); Gandhi (20th century; Hind Swaraj, 1909, on self-rule); Ambedkar (20th century; social justice and the removal of caste hierarchy). Only centuries are used, and 1909 for Hind Swaraj; no thinker is quoted.
7. Articles cited by number with a paraphrase: Article 14 (equality before the law), Article 17 (abolition of untouchability), Article 19 (freedom of speech and expression, among other freedoms), Article 25 (freedom of conscience and religion); Article 21 (life and personal liberty) appears only as a wrong option in a question on Article 17.
8. Reservation, gender equality and freedom of expression are presented only as questions on which people differ, with reasons to be weighed; no side is taken and no law or live dispute is named.
9. All schools, towns, districts, markets, clubs, families, forums and people (Kestrel Hill, Pinecrest, Hollin Park, Westmere, Orchard Vale, Fernwick, Brookfield, Marlow, Aldmere, Dunmore, Oakridge, Larkmoor, Larkspur Lane, Mirevale, Vorenza, Tarn-Vey, Zandria and others) are imagined and labelled; no map, party or office-holder is used.

Unsure or noted: (a) the Locke stem lists life, liberty and property as the things government protects, the usual textbook summary of his view; a reviewer may wish to confirm the wording; (b) the Hobbes, Rousseau and Marx one-liners are deliberately short summaries; (c) the NCERT chapter also mentions further examples; only the ones in the brief are covered.
