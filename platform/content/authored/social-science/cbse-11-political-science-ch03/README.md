# CBSE Class 11 Political Science, Chapter 3: Election and Representation

`cbse-11-political-science-ch03` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch03/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

## Scope
Topics t01 (Electoral systems: first past the post and proportional representation, reasons for India's choice, reserved constituencies, delimitation, women's reservation, franchise) and t02 (Election Commission and electoral reforms). The imagined country "Sundaria" (constituencies, vote tables, a school notice, a newspaper report, a letter, a classroom discussion) carries every scenario, so stems stay specific against the ICSE 9 History & Civics chapter on elections. No maps. Electoral bonds and current disputes are left out.

| File | What |
|---|---|
| `src/questions.mjs` | 78 questions (149 marks) |
| `src/build.mjs` | 2 decks (21 and 19 slides), notes (7 sections), 33 flashcards, 4 SVGs, 2 tests |
| `release.json`, `tests.json` | Built output |

## Contents
- **Deck 1 (21 slides, 17 visuals, 4 checks, 2 examples):** representation, first past the post, vote share against seat share (SVG), proportional representation, comparison chart (SVG), India's use of each, reasons for the choice, reservation, delimitation, women's reservation, franchise.
- **Deck 2 (19 slides, 15 visuals, 4 checks, 2 examples):** the Commission, independence, functions web (SVG), stages of an election, model code, symbols, machines and slips, reforms, reforms timeline (SVG), proposals (some argue, others argue).
- **Questions:** 32 mcq, 6 assertion-reason, 4 true-false, 3 fill-blank, 2 match, 2 ordering, 10 short 2-mark, 7 short 3-mark, 7 long 5-mark, 5 case-based. Application or above 50%; difficulty d1 7, d2 23, d3 42, d4 6.
- **Deck-check items (not in any test):** m_why_rep, tf_majority, m_gap, mt_bodies, m_repoll, ord_reforms, m_nota, tf_age.

### Tests
- **Short (20 marks):** A m_fptp_where, m_cec_remove, m_reserved_vote, ar_reserved; B s_fptp_def, s_ec_security, s3_gap; C one of l_fptp / l_ec; D c_news.
- **Long (40 marks):** A m_fptp_def, m_pr_def, m_why_fptp, m_stv, m_delim, m_age, m_art324, m_evm, ar_gap, ar_cec; B s_pr_def, s_reserved_def, one of s_mcc / s_nota, s3_why_india, one of s3_reserved / s3_functions; C l_compare, one of l_reforms / l_eval; D c_vel, c_debate.

## How verified
- Build: `NO ERRORS`, lint 0 errors and 0 warnings; three builds give byte-identical `release.json` and `tests.json`; no `*.wip.json` remains.
- Self-checks: near-duplicate scan (5-gram Jaccard 0.7 and exact stems) against 33,906 other stems gives 0 flags; SVG label overflow and overlap check gives 0 issues in 4 figures.
- Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Direct democracy (citizens decide) against indirect or representative democracy (citizens elect representatives).
2. First past the post: single-member constituencies, most votes wins (plurality, not necessarily a majority); used for the Lok Sabha and the State Legislative Assemblies.
3. Proportional representation: seats in proportion to votes. List system "as commonly taught" with Israel and the Netherlands (one large constituency). Imagined Sundaria data: 20 seats; vote shares 40, 30, 25, 5 per cent; first past the post seats 12, 6, 2, 0; list system seats 8, 6, 5, 1. Imagined Tarnagar votes 31,000, 29,000, 24,000, 16,000 (total 100,000); imagined Velpur votes 27,500, 26,800, 25,200, 10,500 (total 90,000).
4. India uses proportional representation by the single transferable vote for indirect elections: the Rajya Sabha (elected members of State Legislative Assemblies), the President (elected MPs and MLAs), the Vice-President (members of both Houses of Parliament), and, in part, the Legislative Councils (the rest are elected by other bodies; stated as "in part").
5. Reasons given for first past the post: simplicity for a large electorate with many first-time voters; voters know their representative; broad-based parties; stable governments.
6. Reserved constituencies: only SC or ST candidates contest, all voters vote. Lok Sabha seats reserved, as of 2024: 84 SC and 47 ST.
7. The Delimitation Commission draws constituency boundaries and settles reserved seats.
8. Constitution (106th Amendment) Act, 2023: one-third reservation for women in the Lok Sabha and State Legislative Assemblies, to take effect after the delimitation that follows the next census (as of 2024). The 150-seat question applies one-third to directly elected seats and says "once it takes effect".
9. Universal adult franchise. Voting age lowered from 21 to 18 by the 61st Amendment, 1988. Minimum age to contest the Lok Sabha: 25.
10. Election Commission: Article 324; the Chief Election Commissioner and other Election Commissioners; three members since 1993; the Chief Election Commissioner can be removed only in the manner of a Supreme Court judge; a 2023 law changed the method of appointment (as of 2024; one line, no detail).
11. Functions: supervises electoral rolls; sets the schedule; enforces the model code of conduct (from the announcement of the schedule); recognises parties and allots symbols; can order a repoll and postpone elections; deploys officers and observers.
12. Reforms: electronic voting machines in all constituencies from the 2004 Lok Sabha election; VVPAT slips; EPIC cards; candidates' affidavits on criminal records, assets and education; NOTA from 2013. As of 2024 NOTA does not change who wins (the leading candidate among the rest is declared elected).
13. Timeline dates used: 1988, 1993, 2003, 2004, 2013, 2023.
14. Proposals presented as some argue, others argue: state funding of elections, curbing money power and criminalisation, a mixed or PR system. Women's reservation is described as enacted.

Unsure or noted:
- The 2003 timeline entry (candidate affidavits) follows the usual textbook sequence (court directions of 2002, law and court ruling of 2003). The exact year the affidavit rule took final effect should be checked once.
- EPIC cards began in the early 1990s; no year is stated in the chapter. VVPAT is described but not dated.
- The Legislative Councils are stated as "in part" elected by the single transferable vote (a portion is elected by Assembly members; the rest by other groups).
- The Lok Sabha total of 543 elected seats is not stated in the chapter.
