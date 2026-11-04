# CBSE Class 11 Political Science, Chapter 10: The Philosophy of the Constitution

`cbse-11-political-science-ch10` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch10/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (21 and 22 slides) with 4 own SVG figures (no maps) and the rest tables and flows; 7 notes sections; 31 flashcards; 79 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Single topic, **t01 Political philosophy and core features of the Constitution**: what a philosophy of a constitution means (moral values, democratic transformation, limiting power, the Constituent Assembly debates as a source); the Preamble's key words and ideals (named, not reproduced) with the dated 42nd Amendment note; the seven core features (individual freedom, social justice, respect for diversity and minority rights, the Indian model of secularism in brief, universal adult franchise, federalism with asymmetric arrangements, national identity); procedural achievements; the criticisms (unwieldy, unrepresentative, alien) with replies; the limitations (centralised notion of national unity, gender justice within the family, rights in the Directive Principles). Overlap with ch01 (making of the Constitution) and ICSE 9 ch01 (salient features) is avoided by building every stem on imagined countries, clauses, debates and letters. Secularism is kept brief (a later chapter covers it).

### Decks
- **Part 1, Ideals, Freedom, Justice, Diversity and Secularism (21 slides):** ideals chart SVG, core-features web SVG, Western versus Indian secularism SVG; worked examples on classifying imagined clauses of Zandria, the seat scheme of imagined Delvar, and Veldora versus Tarsia; 4 checks (`m_phil_def`, `mt_ideals`, `fb_42`, `tf_secular_sep`).
- **Part 2, Franchise, Federalism, Procedure, Criticisms and Limitations (22 slides):** criticism-and-reply chart SVG; worked examples on Halcor and Mirenia, planning a 5-mark answer, and reading an imagined student letter; 4 checks (`ord_franchise`, `m_asym`, `ord_consensus`, `m_alien`).
- Narration at most 90 words, no symbols, digits or quotation marks.

### Question bank (79 items)
Types: mcq 33, assertion-reason 6, true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 12, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Imagined: Veldora, Tarsia, Halcor, Mirenia, Norvale, Zandria, Brendale, Brenmark, the states Delvar, Orwen and Kalmar, Lakemoor and Pinewood schools, a charter, a handbook table, a newspaper report, a classroom discussion and a student letter.

### Tests
- **Short (20 marks):** A m_just_classify, m_ind_arrest_app, m_secular_support_app, ar_limit; B s_limit, s_minority, s3_social_justice; C one of l_ideals / l_diversity; D c_clauses.
- **Long (40 marks):** A m_transform, m_eq_opp, m_secular_model_app, m_franchise_compare, m_proc_app, m_crit_reply_app, m_lim_dp, m_minority_app, ar_secular, ar_reserve; B s_means, s_pre_nature, one of s_franchise / s_justice_forms, s3_secular_compare, one of s3_unrep / s3_limits; C l_core, one of l_criticisms / l_limits; D c_secular, c_franchise.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; repeated builds give byte-identical `release.json` and `tests.json`; the near-duplicate scan reports 0 flags and the SVG check 0 issues (see the writer's report). Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. The Preamble is not reproduced; only key words are listed. Nature of the state: sovereign, socialist, secular, democratic, republic.
2. Objectives named: justice (social, economic and political); liberty (of thought, expression, belief, faith and worship); equality (of status and of opportunity); fraternity (assuring the dignity of the individual and the unity and integrity of the nation).
3. Dated note: "socialist", "secular" and "integrity" were added by the 42nd Amendment (1976).
4. A philosophy of a constitution = the ideals and moral values behind its provisions; a constitution can reflect moral values, be a means of democratic transformation, and limit power. The Constituent Assembly debates are named as a source; only general positions are attributed (some members stressed individual liberty, others the removal of social inequality, many sought a balance); nothing is quoted.
5. Core features as the NCERT chapter lists them: individual freedom (freedom of expression; protection against arbitrary arrest, cited as Articles 19 and 22); social justice (reservations for Scheduled Castes and Scheduled Tribes as a means to equality of opportunity); respect for diversity and minority rights (community-based rights; the right of minorities to run educational institutions, cited as Article 30); secularism of the Indian kind; universal adult franchise; federalism with asymmetric arrangements (Article 371 and related Articles); one national identity beside other identities.
6. Standard definition of secularism used: the state does not identify itself with any one religion and treats all believers and non-believers equally. Western model in brief = strict separation, no state support for religious bodies, little intervention; Indian model = principled distance, may intervene to reform (untouchability given as the example) or support communities equally.
7. Universal adult franchise adopted from the start (Article 326); described as bold beside the gradual extension of the vote in many Western countries (no country or date named). Voting age: 21 years, lowered to 18 years by the 61st Amendment (1988).
8. Procedural achievements: faith in deliberation, a spirit of compromise and accommodation, decisions by consensus wherever possible.
9. Criticisms as NCERT lists them, introduced as "critics have argued": unwieldy (very long and detailed; reply: reflects India's needs, much detail is usual); unrepresentative (Assembly elected on a limited franchise and not by universal adult franchise; reply: diverse opinions, open debates); alien (many provisions borrowed; reply: adapted to Indian conditions and the ideals of the national movement).
10. Limitations as NCERT notes: a centralised notion of national unity; some issues of gender justice, for example within the family, not fully addressed; some social and economic rights placed in the Directive Principles rather than among the Fundamental Rights (Directive Principles described as not enforceable in court in the way Fundamental Rights are).
11. All countries (Veldora, Tarsia, Halcor, Mirenia, Norvale, Zandria, Brendale, Brenmark), states (Delvar, Orwen, Kalmar), schools, people, newspapers and documents are imagined and labelled; no map is used; no party, office-holder or live dispute is named. Uniform civil code and similar contested questions are not mentioned.

Unsure or noted: (a) Article numbers 19, 22, 30, 326 and 371 are from memory and should be checked once; (b) the voting-age line (61st Amendment, 1988) goes slightly beyond the NCERT chapter and may be deleted if the reviewer prefers; (c) the statement that the Assembly was "elected on a limited franchise" follows the brief and NCERT's wording and is not elaborated; (d) reservations are presented as a means to equality of opportunity with both views to weigh, and no current dispute about them is described.
