# CBSE Class 11 Political Science, Chapter 18: Secularism

`cbse-11-political-science-ch18` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter (the last chapter of the subject). Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch18/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, answer-leak scan, exact-stem originality pre-check and editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 19 slides) with 4 own SVG figures (no maps) and the rest tables and flows; 7 notes sections; 32 flashcards; 78 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Topics **t01 Meaning of secularism; Western and Indian models** and **t02 Criticisms of Indian secularism**.

- t01: inter-religious and intra-religious domination; the standard definition of secularism; the features of a secular state; the Western model (mutual exclusion, individual focus, little room for community rights) as commonly taught; the Indian model (principled distance, equal respect, freedom of religion, no state religion); the constitutional provisions; the 42nd Amendment and the Preamble.
- t02: the six criticisms (anti-religious, Western import, minoritism, interventionist, vote-bank politics, impossible project), each stated as critics have argued and answered with supporters respond or others argue; how to weigh a criticism.
- Left out on purpose: any real religion, community, incident, party, leader, current controversy, and the uniform civil code debate. Debates on personal laws are mentioned in one neutral line (a table row and the matching notes line) with no position. All cases are imagined, with invented faiths (Sunhold, Rivermark, Tessel), invented countries (Torvia, Calendra, Meridan) and towns (Dunmere, Pellmoor, Ashvale, Quillfield), and no suggestion of a real majority or minority.

Originality: every stem is built on an imagined case: the Linden Shrine in Dunmere (temple-entry case), Ember School in Pellmoor (school case), a hall and a main street in Ashvale, a Rivermark council in Quillfield, Torvia choosing between two models, imagined statements to classify, an imagined classroom debate and an imagined editorial.

### Decks
- **Part 1, Meaning and Two Models (20 slides):** SVGs on the two kinds of domination, the Western and Indian models compared, and the principled-distance flow; tables for the definition, secular state, Western model, Indian model, principled distance, provisions; worked examples on classifying statements, the Linden Shrine and Torvia's choice; 4 checks (`m_secdef`, `tf_official`, `mt_articles`, `fb_intra`).
- **Part 2, Criticisms and Replies (19 slides):** SVG chart of the six criticisms and replies; a table per criticism, a side-by-side table, how to weigh a criticism; worked examples on naming a criticism, an imagined class debate and planning a 5-mark answer; 4 checks (`m_antirel_reply`, `tf_antirel`, `fb_minoritism`, `ord_evaluate`).
- Narration at most 90 words (max 71), no symbols, digits or quotation marks (numbers spelled out).

### Question bank (78 items)
Types: mcq 32, assertion-reason 6, true-false 4, fill-blank 3, match 2, ordering 2, short 2-mark 11, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Topics: t01 49, t02 29. Application or above: 50%. Difficulty: d1 1, d2 16, d3 38, d4 20, d5 3.

### Tests
- **Short (20 marks):** A m_inter_app, m_western_app, m_classify_crit, ar_both; B s_def, s_art17_app, s3_compare; C one of l_meaning / l_models; D c_council.
- **Long (40 marks):** A m_intra_app, m_official_app, m_pd_app, m_compare_app, m_import_reply, m_votebank_reply, m_impossible_reply, m_minorism_app, ar_pd, ar_antirel; B s_kinds, s_pd, one of s_antirel / s_import, s3_pd_example, one of s3_minoritism / s3_impossible; C l_indian_features, one of l_torvia / l_crit3; D c_school, c_debate.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; consecutive builds give byte-identical `release.json` and `tests.json` (md5 checked); near-duplicate scan and SVG check results are in the producer report. Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Standard definition: secularism is a normative doctrine that seeks a society free from both inter-religious and intra-religious domination; it promotes freedom within religions and equality between them and keeps state power apart from the control of any religious group.
2. Inter-religious domination: one religious community dominating another. Intra-religious domination: domination within a religious community, for example by caste or gender.
3. A secular state: not run by any religious group, has no official religion, does not discriminate on grounds of religion.
4. Western model, as commonly taught: mutual exclusion (state and religion do not interfere in each other); focus on individual freedom and equality; little room for community-based rights; the United States and France are often given as examples and differ in detail. Stated as a textbook generalisation, not a full account of either country.
5. Indian model: principled distance (a distance from all religions, with intervention on principle to promote freedom and equality); equal respect and support for communities on an equal footing; freedom of religion; no state religion.
6. Principled distance is associated with the political theorist Rajeev Bhargava (name and term only).
7. Article 17: abolishes untouchability and forbids its practice. Opening of places of worship to all castes is cited as an example of principled intervention (stated generally; no Act is named).
8. Articles 25 to 28: freedom of religion (conscience and the right to profess and practise; religious denominations managing their own affairs; no compulsion to pay tax for promoting a religion; no religious instruction in institutions wholly maintained by the state). Stated in brief in one table row.
9. Article 30: religious and linguistic minorities may set up and administer educational institutions of their choice.
10. Article 15: no discrimination by the state on grounds of religion, race, caste, sex or place of birth.
11. The word secular was added to the Preamble by the 42nd Amendment, 1976 (which also added socialist and integrity, not stated in the chapter); the Constitution was secular in its provisions from the start; in force 26 January 1950.
12. The six criticisms and replies, as in NCERT Political Theory chapter 8 (ideas only, own wording): anti-religious (it opposes domination, not religion); Western import (grew from India's own conditions of diversity, differs from the Western model); minoritism (minority rights protect vulnerable groups, part of equal respect, fundamental interests deserve protection); interventionist (intervention promotes equality and freedom, as with untouchability); vote-bank politics (groups organising for interests is part of democracy, the concern is neglect of others); impossible project (an ambitious ideal that keeps diverse societies together, partial success is valuable).
13. Debates on personal laws exist: one neutral line (a deck table row and a notes line), no positions; the uniform civil code is not named.
14. All people, countries, towns, faiths, communities, shrines, schools, reports, letters, tables, editorials and debates are imagined and labelled. No map, party, office-holder, real incident or current dispute is mentioned.

Unsure or noted: (a) the Western-model description is a textbook generalisation, worded as commonly taught; a reviewer may prefer a further hedge. (b) Imagined faith names (Sunhold, Rivermark, Tessel) and hereditary-group name (Ostler) were chosen to suggest no real religion or caste; a reviewer should confirm. (c) The imagined passages involving gender and hereditary-group exclusion inside a faith are used to illustrate intra-religious domination as the standard definition requires. (d) The Article 30 questions ask which Indian provision is comparable to an arrangement in an imagined country.
