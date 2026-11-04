# CBSE Class 11 Political Science, Chapter 6: Judiciary

`cbse-11-political-science-ch06` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-sonnet-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch06/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 21 slides) with 4 SVG figures and the rest tables and flows; 7 notes sections; 31 flashcards; 73 questions worth 137 marks (incl. case parts and alternatives) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

- **t01 Independence and structure of the judiciary:** why an independent judiciary (rule of law, settling disputes, protecting rights, guarding the Constitution); what independence does and does not mean; appointment (President; collegium since 1993; NJAC Act 2014 struck down 2015; debate as some argue / others argue); security of tenure and removal; financial independence; protection from debate and contempt; integrated structure (Supreme Court, High Courts, district and subordinate courts); Articles 141 and 129; strength of 34 as of 2024.
- **t02 Jurisdiction, judicial review and judicial activism:** original (Article 131), writ (Article 32; Article 226 wider), appellate (special leave, Article 136) and advisory (Article 143) jurisdiction; judicial review and its sources (Articles 13, 32, 226); judicial activism and PIL (locus standi, letters as petitions, effects, criticisms); judiciary and Parliament (property rights and amending power, Kesavananda Bharati in one line, separation of powers).

### Decks
- **Part 1, Independence and Structure (20 slides):** independence-safeguards web SVG and court-hierarchy pyramid SVG; worked examples on a Chief Minister's announcement of a judge's dismissal and on who must follow whom; 4 checks (`m_njac`, `tf_acc`, `mt_safeguard`, `m_record`).
- **Part 2, Jurisdiction, Judicial Review and Judicial Activism (21 slides):** jurisdiction chart SVG and PIL flow SVG; worked examples on a dispute between two imagined states and on an imagined PIL report; 4 checks (`mt_jurisd`, `m_slp`, `m_art13`, `tf_locus`).
- Narration at most 90 words, no symbols, digits or quotation marks.

### Question bank (73 items)
Types: mcq 30, assertion-reason 6 (a, b, c, a, d, b), true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 10, short 3-mark 7, long 5-mark 6, case-based 4 (1 + 1 + 2 with either/or in part c). Difficulty d1 3, d2 25, d3 37, d4 8; 47% are application or above. Passages are imagined and labelled: a newspaper report of a PIL, a briefing note on a dispute between two states, a classroom discussion, a case log. Stems use imagined states (Varunadesh, Karnavar, Tilmora), towns and petitioners.

### Tests
- **Short (20 marks):** A m_indep, m_appoint, m_review, ar_tenure; B s_indep, s_review, s3_jurisdiction; C one of l_indep / l_pil; D c_report.
- **Long (40 marks):** A m_retire, m_removal_app, m_salary_app, m_structure, m_art141, m_original_app, m_writ_app, m_pil_app, ar_salary, ar_pil; B s_why, s_tenure, one of s_record / s_advis, s3_safeguards, one of s3_pil_crit / s3_appoint; C l_structure, one of l_jurisdiction / l_balance; D c_dispute, c_letter.

## How verified
Build prints `NO ERRORS`, `lint: 0 error(s), 0 warning(s)`; three consecutive builds give byte-identical `release.json` and `tests.json`; the near-duplicate scan reports 0 flags and the SVG check 0 issues. Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Independence of the judiciary means freedom from interference by the legislature and the executive in deciding cases; it does not mean freedom from accountability (reasoned judgments, bound by the Constitution, removal for proved misbehaviour or incapacity).
2. Four roles: rule of law, settling disputes, protecting rights, guarding the Constitution.
3. Judges are appointed by the President. Since the Second Judges case (1993), the Supreme Court's view is that the Chief Justice of India and a collegium of senior judges play the decisive role in recommending names (position as of 2024).
4. The National Judicial Appointments Commission Act (2014) was struck down by the Supreme Court in 2015. The appointment debate is given as some argue / others argue.
5. Retirement at 65 (Supreme Court) and 62 (High Courts).
6. Removal only by Parliament, on proved misbehaviour or incapacity, by a special majority in both Houses (a majority of the total membership of each House and at least two thirds of the members present and voting), after an inquiry, with the President ordering the removal.
7. Salaries and allowances of Supreme Court judges are charged on the Consolidated Fund of India and are not voted on.
8. The conduct of judges is not discussed in the legislature except during removal proceedings; courts can punish for contempt.
9. Integrated judiciary: Supreme Court, High Courts in the states, district and subordinate courts, one hierarchy.
10. Supreme Court strength: the Chief Justice of India and 33 other judges, 34 in all, as of 2024 (Parliament can change the number by law).
11. Article 141: the law declared by the Supreme Court binds all courts. Article 129: the Supreme Court is a court of record (proceedings preserved as records; power to punish for its own contempt).
12. Original jurisdiction, Article 131: disputes between the Union and states or between states.
13. Writ jurisdiction: Article 32 (Fundamental Rights; itself a Fundamental Right); High Courts have a wider writ power under Article 226 (Fundamental Rights and other legal rights).
14. Appellate jurisdiction: civil, criminal and constitutional appeals; special leave to appeal, Article 136, at the Court's discretion (the chart cites Articles 132 to 136 for appeals).
15. Advisory jurisdiction, Article 143: the President may seek the Court's opinion on a question of law or fact of public importance; the opinion is not binding.
16. Judicial review: power to test laws and executive actions against the Constitution and declare them invalid; not named as such in the text; flows from Articles 13, 32, 226 and others. Article 13: laws inconsistent with Fundamental Rights are void to that extent.
17. PIL began in the late 1970s and 1980s; locus standi relaxed; letters and news reports treated as petitions; examples prisoners' rights and bonded labour; Hussainara Khatoon (1979) on undertrial prisoners is named once, not quoted.
18. Effects (access to justice, attention to the rights of the poor) and criticisms (overburdened courts, judicial overreach) are framed as views.
19. Conflicts with Parliament over property rights and the amending power; Kesavananda Bharati (1973): Parliament cannot change the basic structure (one line, refers to Chapter 9); separation of powers.
20. No judge, office-holder, party or pending case is named; all states, towns, courts, petitioners, newspapers and passages in scenarios are imagined.

Unsure or noted: (a) the Article numbers cited (13, 32, 129, 131, 136, 141, 143, 226, and 132 to 136 in the chart) are from memory and should be checked once; (b) the strength of 34 is dated "as of 2024"; (c) the removal flow (motion, committee inquiry, both Houses, President) is stated in outline only; (d) High Court judges' salaries are not stated, as the brief names the Supreme Court only.
