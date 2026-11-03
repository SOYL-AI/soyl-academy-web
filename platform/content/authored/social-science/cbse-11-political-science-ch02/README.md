# CBSE Class 11 Political Science, Chapter 2: Rights in the Indian Constitution

`cbse-11-political-science-ch02` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch02/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 17 slides with 29 visuals (4 SVG, the rest tables and flows); 6 notes sections; 33 flashcards; 80 questions worth 147 marks (incl. 12 case parts and alternatives) |
| `tests.json` | `t_cbse11politicalscience_ch02_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11politicalscience_ch02_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

- **t01 Fundamental Rights:** meaning of right and bill of rights, justiciable, the six categories with Articles, restrictions, preventive detention, Article 21A, Articles 32 and 226, the five writs, property (44th Amendment, Article 300A), National Human Rights Commission (50 item tags).
- **t02 Directive Principles of State Policy:** meaning, three commonly taught groups, relation to Fundamental Rights, conflicts and harmony, Fundamental Duties (30 item tags).

### Decks
- **Part 1, Fundamental Rights (20 slides, 16 visuals):** the six-categories SVG, the writs SVG; examples on Article 22 and on matching writs; 4 checks (`m_hotel`, `mt_cats`, `m_habeas`, `ord_remedy`).
- **Part 2, Directive Principles and Duties (17 slides, 13 visuals):** the rights-versus-principles comparison SVG, the 1950-2002 timeline SVG; examples on classifying items and a 5-mark plan; 4 checks (`m_panchayat`, `m_ecce`, `fb_42`, `ord_timeline`).
- Narration at most 77 words per slide (mean 51), no symbols, digits or quotation marks.

### Question bank (80 items)

| Type | Count |
|---|---|
| mcq | 35 |
| assertion-reason | 6 (keys a, a, a, c, d, b) |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 |
| short 2-mark | 11 |
| short 3-mark | 7 |
| long 5-mark | 6 |
| case-based (4 marks, 1 + 1 + 2 with either/or in part c) | 4 |

Difficulty d1 7, d2 29, d3 36, d4 8. Competency: recall 15, understanding 26, application 22, analysis 14, evaluation 3 (49% application or above). Passages are imagined and labelled (a newspaper report, a school debate, a letter to the editor, a town-council notice board).

### Tests
- **Short (20 marks):** A m_bill, m_prayer, m_dp_nature, ar_justiciable; B s_exploit, s_dp_def, s3_arrest; C one of l_freedom / l_fr_dp; D c_kiln.
- **Long (40 marks):** A m_part3, m_minority, m_mandamus, m_property, m_nhrc, m_fr_dp, m_duty_enf, m_court_dp, ar_dp_force, ar_property; B s_duties_two, s_property, one of s_21a_when / s_restrict, s3_equality, one of s3_dp_groups / s3_conflict; C l_writs, one of l_dp_kinds / l_duties_eval; D c_debate, c_letter.

## How verified
- Build: `NO ERRORS`, lint 0 errors and 0 warnings; three builds give byte-identical `release.json` and `tests.json`; no `*.wip.json` remains.
- Self-checks: near-duplicate scan (5-gram Jaccard 0.7 and exact stems) against 33,826 other stems gives 0 flags; SVG label overflow and overlap check gives 0 issues in 4 figures.
- Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Fundamental Rights are in Part III (Articles 12 to 35); Directive Principles in Part IV (Articles 36 to 51); Fundamental Duties in Part IVA, Article 51A.
2. Six categories and Articles: Equality 14 to 18; Freedom 19 to 22; Exploitation 23 and 24; Religion 25 to 28; Cultural and Educational 29 and 30; Constitutional Remedies 32.
3. Article 14 equality before law and equal protection; Article 15 no discrimination on religion, race, caste, sex, place of birth (special provisions for women, children and backward groups allowed); Article 16 equal opportunity in public employment; Article 17 abolishes untouchability; Article 18 abolishes titles (military and academic distinctions excepted).
4. Article 19: speech and expression, peaceful assembly without arms, association, movement, residence, profession, subject to reasonable restrictions (public order, security of the State and similar grounds). Article 20 protection in respect of conviction; Article 21 life and personal liberty.
5. Article 21A: free and compulsory education for children aged 6 to 14, inserted by the 86th Amendment (2002).
6. Article 22: grounds of arrest to be told, a lawyer of choice, production before the nearest magistrate within 24 hours excluding travel time; special rules for preventive detention.
7. Article 23: traffic in human beings and forced labour (begar). Article 24: no employment of children below 14 in factories, mines and hazardous work.
8. Articles 25 to 28: profess, practise, propagate religion (subject to public order, morality, health); manage religious affairs; no tax for a religion; no compulsory religious instruction in a wholly State-funded institution. Articles 29 and 30: protection of language, script and culture; minorities may establish and administer educational institutions.
9. Article 32: Supreme Court; Article 226: High Courts. Dr Ambedkar regarded Article 32 as the most important Article (paraphrased, not quoted).
10. Five writs and definitions: habeas corpus (produce the detained person), mandamus (compel a public official to do a legal duty), prohibition (higher court stops a lower court or tribunal exceeding jurisdiction while proceedings are on), quo warranto (by what authority a public office is held), certiorari (quash an order passed without authority).
11. Right to property removed from the Fundamental Rights by the 44th Amendment (1978); now a legal (constitutional) right under Article 300A.
12. National Human Rights Commission set up in 1993; inquires into violations and recommends action; cannot punish.
13. Directive Principles are non-justiciable but fundamental in governance. Article cites used in the deck: 39 (adequate livelihood, equal pay for equal work, fair distribution), 40 (village panchayats), 41 (work, education, public assistance), 43 (cottage industries), 44 (uniform civil code, listed neutrally as one principle), 45 (early childhood care and education below six), 51 (international peace). Prohibition of intoxicants and care of useful cattle are listed only.
14. Groups as commonly taught: goals; policies; non-justiciable rights.
15. Conflicts over property and land reform led to amendments; the Minerva Mills case (1980) is named only, as cited for reading the two parts in harmony.
16. Fundamental Duties: added by the 42nd Amendment (1976) with ten duties; an eleventh (parent or guardian to provide opportunities for education to a child aged 6 to 14) added by the 86th Amendment (2002); eleven as of 2024. Examples are paraphrased; not enforceable like rights.
17. Timeline: 1950 Constitution in force; 1976; 1978; 1993; 2002.

Unsure or noted: the wording of the groups of Directive Principles varies between textbooks (groups follow the brief); the Article numbers 39, 40, 41, 43, 44, 45 and 51 are from memory of the Constitution and should be checked once.
