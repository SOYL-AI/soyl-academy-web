# CBSE Class 11 Political Science, Chapter 12: Freedom

`cbse-11-political-science-ch12` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch12/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (18 and 20 slides) with 4 own SVG figures (no maps) and the rest tables and flows; 6 notes sections; 31 flashcards; 78 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Topics **t01 Ideal of freedom; negative and positive liberty** and **t02 Harm principle and freedom of expression**.

- t01: freedom as the struggle against domination (two books named by title only); the standard two-part definition; sources of constraints (domination and external control; social and economic inequality); why some constraints are needed and the test of legitimacy; negative liberty and positive liberty with imagined examples; their conflict and complement, presented neutrally.
- t02: the harm principle (J. S. Mill, 1859) with self-regarding and other-regarding actions and the response to minor and serious harm; Mill's three reasons for free expression; the debate on bans using only imagined cases; constraints that are minimal and decided by due process; Article 19(1)(a) and the grounds of Article 19(2); a free society, informed choice and responsibility.

Overlap with ch02 (Rights in the Indian Constitution) and CBSE 12 on Article 19 is avoided by building every stem on imagined towns, councils, a play, a notice, a register and a letter.

### Decks
- **Part 1, The Ideal, Constraints, Negative and Positive Liberty (18 slides):** sources-of-constraints web SVG and negative-versus-positive comparison SVG; worked examples on sorting constraints in imagined Arvelle, Rhea of Kellin, and planning a 5-mark answer; 4 checks (`m_free_def`, `mt_liberty`, `tf_neg`, `fb_liberty`).
- **Part 2, The Harm Principle and Freedom of Expression (20 slides):** harm-principle decision-flow SVG and expression reasons-and-limits SVG; worked examples on classifying complaints in imagined Dorrow, the imagined play The Last Ferry in Arvelle, and planning a 5-mark answer; 4 checks (`m_harm_def`, `ord_hp`, `tf_mill`, `ar_dogma`).
- Narration at most 90 words (max 62), no symbols, digits or quotation marks.

### Question bank (78 items)
Types: mcq 33, assertion-reason 6, true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 11, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Topics: t01 34, t02 43, both 1. Application or above: 49%. Difficulty: d1 7, d2 18, d3 33, d4 18, d5 2. Imagined: Arvelle, Kellin, Dorrow, Mirrenhall, Pellam, Tavish, Pellam College, Mirrenhall College, the play The Last Ferry and its playwright, and all people.

### Tests
- **Short (20 marks):** A m_poverty_app, m_other_app, m_ban_app, ar_neg_pos; B s_neg_def, s_self_other, s3_classify; C one of l_neg_pos / l_harm; D c_report.
- **Long (40 marks):** A m_ineq_app, m_pos_app, m_both_app, m_conflict, m_minor_app, m_hp_not, m_clash_app, m_incite_app, ar_harm, ar_expr; B s_ideal, s_need_rules, one of s_pos_def / s_sources, s3_conflict, one of s3_ban / s3_mill_reasons; C l_freedom, one of l_expression / l_19; D c_rules, c_play.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; repeated builds give byte-identical `release.json` and `tests.json`; the near-duplicate scan reports 0 flags and the SVG check 0 issues. Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Freedom as the struggle against domination; two books named by title, author and year only, with no quotation: Nelson Mandela, *Long Walk to Freedom* (1994); Aung San Suu Kyi, *Freedom from Fear* (1991).
2. Standard definition: absence of external constraints, plus the existence of conditions in which people can develop their talents and make choices (self-determination).
3. Sources of constraints: domination and external control (by force or by laws imposed without consent); social and economic inequality (caste-based exclusion, poverty). Some constraints are needed; rules should be accepted through legitimate procedures and should protect freedom.
4. Negative liberty: freedom from interference, a minimum area of non-interference. Positive liberty: freedom to act and develop, needing enabling conditions (education, health, resources); the state may need to act. The distinction is associated with Isaiah Berlin (named only; no work or date is given).
5. Conflict and complement are presented as "some stress one, others the other"; no side is taken.
6. Harm principle: J. S. Mill, *On Liberty*, 1859. Self-regarding versus other-regarding actions; restriction only to prevent harm to others; minor harm may call for social disapproval, serious harm for legal punishment (all paraphrased).
7. Mill's three reasons for free expression, paraphrased: a false view may contain some truth; truth emerges through the clash of opinions; unchallenged truths become dead dogma.
8. Article 19(1)(a): freedom of speech and expression. Article 19(2): reasonable restrictions made by law on listed grounds. Grounds listed in the chapter: public order; decency or morality; sovereignty and integrity of India; security of the state; friendly relations with foreign states; defamation; contempt of court; incitement to an offence. The brief listed seven of these; "friendly relations with foreign states" was added from memory of the Article and should be checked once. The words "reasonable" and "by law" are stated as qualifiers; no Article text is reproduced.
9. Distractor Articles used in `m_19_1a`: 21A (education), 32 (constitutional remedies), 51A (fundamental duties); to be confirmed by the reviewer.
10. A free society lets individuals pursue their own interests with a minimum of constraints, and freedom includes informed choice and responsibility.
11. All towns, colleges, people, the play, the register, notice, letter and newspaper report are imagined and labelled. No real banned work, case, party, office-holder or current dispute is mentioned. No map is used.

Unsure or noted: (a) the eighth ground in item 8 and the distractor Article numbers in item 9 are from memory; (b) the syllabus gives only two topics, so the treatment of informed choice and responsibility is short and tied to the overall statement in the brief; (c) the due-process points (hearing, reasons, minimal restriction) are presented as principles of the theory chapter and not as a statement of any particular law or judgment.
