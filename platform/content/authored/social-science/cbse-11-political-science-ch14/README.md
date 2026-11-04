# CBSE Class 11 Political Science, Chapter 14: Social Justice

`cbse-11-political-science-ch14` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch14/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, answer-leak scan, exact-stem originality pre-check and editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (19 and 20 slides) with 4 own SVG figures (no maps) and the rest tables and flows; 6 notes sections; 32 flashcards; 75 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Topics **t01 Just distribution; Rawls' theory of justice** and **t02 Pursuing social justice**.

- t01: the standard meaning of justice; ideas of justice in dharma, Confucius, Plato's Republic and Kant (paraphrased); the three principles (equal treatment for equals, proportionate justice, recognition of special needs) and how they conflict and are balanced; just distribution, with land reforms and reserved places presented as policies a society may choose, with reasons on each side; Rawls' A Theory of Justice (1971): original position, veil of ignorance, the difference principle (paraphrased), fairness from impartial choice and not from altruism.
- t02: minimum basic needs; the case for free markets and the case for state intervention, each with reasons and presented neutrally; the combination that many societies use.

Overlap with CBSE 12 Economics and with ch13 (Equality) is avoided by building every stem on the imagined island of Tamberlay, the towns Norvale, Kesterby, Hollin and Brindle, the Vellmark Scholarship Committee, a letter, a table and a newspaper report. No current scheme, law, party, office-holder or dispute is named.

### Decks
- **Part 1, Justice, Three Principles and Just Distribution (19 slides):** three-principles chart SVG; tables for each principle, traditions, conflict, distribution and policies; worked examples on classifying situations in Hollin, one scholarship in Brindle, and planning a 5-mark answer; 4 checks (`m_just_def`, `mt_principles`, `tf_prop`, `fb_just`).
- **Part 2, Rawls and Pursuing Social Justice (20 slides):** veil-of-ignorance flow SVG, bar chart SVG of imagined income under two rule sets, and a free-market-versus-state comparison SVG; worked examples on reading the bar chart, comparing Norvale and Kesterby, and planning a 5-mark answer; 4 checks (`m_veil_def`, `ord_veil`, `tf_market`, `fb_needs`).
- Narration at most 90 words (max 65), no symbols, digits or quotation marks.

### Question bank (75 items)
Types: mcq 30, assertion-reason 6, true-false 4, fill-blank 3, match 2, ordering 2, short 2-mark 10, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Topics: t01 49, t02 22, both 4. Application or above: 52%. Difficulty: d1 5, d2 21, d3 27, d4 19, d5 3. Imagined: Tamberlay, Norvale, Kesterby, Hollin, Brindle, Hollin Exam Board, Brindle Library, the Vellmark Scholarship Committee, Kesterby Academy, and all people.

### Tests
- **Short (20 marks):** A m_p_prop_app, m_veil_app, m_market_app, ar_veil; B s_just_def, s_market, s3_veil_app; C one of l_principles / l_rawls; D c_scholar.
- **Long (40 marks):** A m_p_equal_app, m_p_special_app, m_conflict_prin, m_diff_app, m_state_app, m_needs_app, m_mixed, m_balance, ar_altruism, ar_state; B s_special, s_diff, one of s_needs / s_state, s3_conflict, one of s3_market_state / s3_rawls_notalt; C l_justice, one of l_market_state / l_evaluate; D c_island, c_towns.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; three consecutive builds give byte-identical `release.json` and `tests.json` (md5 checked); the near-duplicate scan reports 0 flags (75 stems against 35321 others) and the SVG check 0 issues (4 figures). Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Standard definition of justice: giving each person his or her due, treating people fairly according to accepted principles.
2. Traditions named, all paraphrased and without quotation: dharma in ancient Indian thought (a just order resting on duties and right conduct); Confucius (rulers should themselves be just); Plato, *Republic* (justice in a person and in a well-ordered community); Immanuel Kant (every person has dignity and deserves equal consideration).
3. Three principles: equal treatment for equals (equal rights, no discrimination by caste, religion or gender); proportionate justice (reward in proportion to effort, skill and the nature of the work); recognition of special needs (people with disadvantages such as disability or lack of access to education or health care may need special treatment).
4. Social justice includes the fair distribution of goods and opportunities. Land reforms and reserved places in education and jobs are described only as policies a society may choose, with "some argue, others argue" reasons; no scheme, law, Article, court case or figure is named.
5. John Rawls, *A Theory of Justice*, 1971 (title and year only; no quotation). Ideas paraphrased: original position, veil of ignorance, rational people choosing rules that make the worst-off as well off as possible (labelled the difference principle in the deck, notes and cards), fairness from impartial choice and not from altruism. The distractor "justice is the interest of the strong" in `m_kant` echoes a view voiced in Plato's Republic and is not attributed to anyone in the chapter.
6. Minimum basic needs listed: adequate nutrition, housing, clean drinking water, education, a minimum wage.
7. Free-market arguments: open competition rewards talent and effort; choice; markets generally serve people well; minimal state intervention. State-intervention arguments: markets favour those already advantaged; the state must ensure basic needs and equal opportunity through public services. Many societies combine the two. Both are presented neutrally.
8. The bar chart and tables of Tamberlay (worst-off fifth 20 and 40, middle 50 and 55, best-off fifth 130 and 90 units) are imagined illustrative figures; the differences quoted (20 more for the worst-off, 40 less for the best-off) follow directly.
9. All towns, committees, people, letters, tables and reports are imagined and labelled. No map, party, current office-holder or current scheme is mentioned.

Unsure or noted: (a) the paraphrases in the traditions table (dharma, Confucius, Plato) are deliberately general; a reviewer may want to confirm them. (b) The topic split is t01 49, t02 22, since t01 covers justice, principles, distribution and Rawls while t02 is a single discussion; a reviewer may rebalance tags. (c) "Difference principle" is used as a label for the paraphrased idea; it is the standard name in discussion of Rawls.
