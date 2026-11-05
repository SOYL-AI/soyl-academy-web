# CBSE Class 11 Political Science, Chapter 9: Constitution as a Living Document

`cbse-11-political-science-ch09` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch09/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (21 and 22 slides) with 4 SVG figures (no maps) and the rest tables and flows; 7 notes sections; 31 flashcards; 75 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

- **t01 Amendment procedure and contents of amendments:** why a constitution is amended; rigid and flexible constitutions (imagined Veldora and Quillan); Article 368 and the three ways as commonly taught (simple majority, special majority, special majority plus ratification by at least half of the state legislatures); examples of each; the matters needing ratification; either House, no joint sitting, assent obligatory (24th Amendment, 1971); number of amendments (as of 2024); kinds of amendments (technical, differing interpretations, political consensus, the 1970s) with the 42nd and 44th Amendments stated as facts.
- **t02 Basic structure doctrine:** Golaknath (1967), 24th Amendment (1971), Kesavananda Bharati (1973), Minerva Mills (1980, named with what it reaffirmed); features identified by the courts over time, for example; significance (balance of rigidity and flexibility, limit on the amending power); both views; the Constitution as a living document (amendment, judicial interpretation under Article 21, conventions, Parliament and the judiciary together).
- Not covered: any proposal currently debated (for example simultaneous elections), details of individual judgments, other amendments beyond those named, property-rights amendments in detail.

### Decks
- **Part 1, Amending the Constitution (21 slides, 17 visuals):** rigid-flexible scale SVG, three-methods chart SVG, amendment-process flow SVG; worked examples on counting votes in an imagined House of 540 members (imagined 140th Amendment Bill) and on sorting imagined bills by method; 4 checks (`m_art368`, `ord_process`, `m_joint`, `mt_kinds`).
- **Part 2, The Basic Structure and a Living Constitution (22 slides, 18 visuals):** timeline SVG (1950, 1963, 1967, 1971, 1973, 1976, 1978, 1980, 1985, 1988, 1992); worked examples on testing the imagined 143rd Amendment Act and on planning a five-mark answer; 4 checks (`m_44th`, `m_golak`, `tf_list`, `ord_time`).
- Narration at most 80 words (mean 50), no symbols, digits or quotation marks.

### Question bank (75 items)
Types: mcq 30, assertion-reason 6, true-false 3, fill-blank 3, match 2, ordering 2, short 2-mark 10, short 3-mark 8, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c). Competency: recall 16, understanding 22, application 21, analysis 10, evaluation 6 (application or above 49%). Difficulty: d1 3, d2 23, d3 34, d4 15. Stems use imagined bills (140th to 150th Amendment Bills and Acts), imagined countries Veldora (rigid), Quillan (flexible), Pellara (conventions) and Tarnovia (an amendment register), the imagined state of Merivia and the town of Halsey, an imagined bulletin, register, newspaper report, club discussion and class project.

### Tests
- **Short (20 marks):** A m_special_app, m_ratify_app, m_basic_app, ar_golak; B s_assent, s_golak, s3_methods; C one of l_procedure, l_basic; D c_bill.
- **Long (40 marks):** A m_simple_app, m_fr_app, m_technical_app, m_42nd, m_elements, m_cons_app, m_art21_app, m_convention_app, ar_special, ar_basic; B s_special, s_technical, one of s_kesav or s_conv, s3_kinds, one of s3_balance or s3_together; C l_kinds, one of l_balance or l_living; D c_merivia, c_debate.

## How verified
Run from `platform/`, results of this chapter:
1. Build prints `NO ERRORS`; `lint: 0 error(s), 0 warning(s)`.
2. Build run three times: `release.json` and `tests.json` byte-identical (md5), no `*.wip.json` left.
3. Near-duplicate scan against 35,089 other stems: 0 flags. SVG label overflow and overlap check: 4 figures, 0 issues.
4. Tree-wide gates, git and the other chapters were not run (the producer runs them).

## Facts for a reviewer
1. The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950 (timeline starts at 1950).
2. Article 368: the power of Parliament to amend the Constitution and the procedure for doing so.
3. Three ways, as commonly taught: (i) simple majority of Parliament; (ii) special majority in each House; (iii) special majority plus ratification by at least half of the state legislatures.
4. Simple majority: Article 3 (formation of new states, alteration of areas, boundaries and names) and Article 169 (creation or abolition of a Legislative Council, after a resolution of the state Assembly) are made by ordinary law and are technically not amendments under Article 368. The kind of majority of the state Assembly resolution under Article 169 is deliberately not stated.
5. Special majority: a majority of the total membership of the House and two thirds of the members present and voting. The imagined vote (540 members in total; 360 present and voting; 271 needed for a majority of the total; 240 for two thirds of 360; 270 votes fail, 300 pass) is arithmetic on an imagined House.
6. Provisions needing ratification by at least half of the state legislatures: election of the President, executive power of the Union and the states, the Supreme Court and the High Courts, the lists of the Seventh Schedule, representation of states in Parliament, Article 368 itself (stated as the commonly taught list, not as the full text of the proviso).
7. Fundamental Rights are amended by the special majority alone, without state ratification.
8. An amendment bill can be introduced in either House of Parliament; a state legislature cannot begin it; there is no joint sitting for amendment bills.
9. 24th Amendment (1971): made the assent of the President to a duly passed constitution amendment bill obligatory, and asserted Parliament's power to amend any part of the Constitution.
10. More than one hundred amendments; the 106th Amendment, 2023, is the latest as of 2024 (dated note; its subject is not stated).
11. 15th Amendment (1963): retirement age of High Court judges raised from 60 to 62 (technical or administrative).
12. Political consensus: 52nd Amendment (1985, anti-defection), 61st Amendment (1988, voting age lowered to 18), 73rd and 74th Amendments (1992, rural and urban local government; the timeline uses 1992 as the year of passage).
13. 42nd Amendment (1976): passed during the national Emergency (1975 to 1977); changed many parts of the Constitution; added the words socialist, secular and integrity to the Preamble; added the Fundamental Duties.
14. 44th Amendment (1978): restored several provisions that the 42nd had changed (no list of provisions is given; no judgement of any person or party).
15. Golaknath case (1967): the Supreme Court held that Parliament cannot amend the Fundamental Rights.
16. Kesavananda Bharati case (1973): Parliament can amend any part of the Constitution but cannot alter its basic structure; heard by a bench of thirteen judges, described once as the largest bench in the history of the Court (Part 2 table and slide only).
17. Minerva Mills case (1980): reaffirmed the basic structure doctrine and the balance between the Fundamental Rights (Part III) and the Directive Principles (Part IV); named only.
18. Features identified by the courts over time, for example: supremacy of the Constitution, republican and democratic form of government, secular character, separation of powers, federal character, judicial review, rule of law. Presented as a non-exhaustive list with no fixed list in the text.
19. Significance: balance of rigidity and flexibility; limit on the amending power; both views set out as some argue and others argue.
20. Article 21: the right to life and personal liberty; courts have read, for example, the right to livelihood and the right to privacy into it (no case named).
21. Conventions as a source of change are illustrated with imagined Pellara only; no real convention or office-holder is named.
22. Everything else is imagined and labelled: the 140th to 150th Amendment Bills or Acts, the countries Veldora, Quillan, Pellara and Tarnovia, the state of Merivia, the new state Tarnia, the town Halsey, Harbour Road School, the Merivia Courier, the bulletin, register and project tables. No map is used.

Unsure or noted: (a) the Article 169 procedure is simplified to an ordinary law after a state Assembly resolution; (b) the thirteen-judge bench and "largest bench" statement for Kesavananda Bharati is from memory and should be checked once; (c) the proviso list of Article 368 is given as commonly taught, not exhaustively; (d) the year of the 73rd and 74th Amendments is given as 1992 (the Acts came into force in 1993); (e) the 106th Amendment (2023) is dated "as of 2024" and may need a note if later amendments are counted.

## Competency fix (2026-11-05)

Three tags were raised earlier only to reach the 45-65% band; they are now honest:
- `ar_44`: analysis to recall (date order of two amendments).
- `ar_golak`: analysis to understanding (a later amendment as a response, not a cause).
- `m_significance`: analysis to understanding (explaining a stated idea).

With honest tags the bank was at 33 of 75 (44%), so four items were rewritten as genuine scenario items (key, type, marks, topic and position unchanged):
- `m_special_def`: recall to application (d2 to d3). Was a definition of the special majority; now the student decides which of the three methods an imagined 147th Amendment Bill on High Courts needs, with the reason.
- `m_technical`: recall to application (d2 to d3). Was naming the 15th Amendment as a technical example; now the student sorts three imagined amendments of Tarnovia into technical, consensus and differing-interpretation kinds.
- `m_elements`: recall to application (d2 to d4). Was picking judicial review from a list; now the student judges whether an imagined 148th Amendment Act that removes the powers of the states would survive review under the basic structure doctrine.
- `m_living`: understanding to evaluation (d2 to d4). Was defining a living document; now the student judges an imagined claim that a rigid constitution cannot be living.

New counts: recall 16, understanding 22, application 21, analysis 10, evaluation 6 (75 items); application or above 37 = 49%. Difficulty: d1 3, d2 19, d3 36, d4 17.
