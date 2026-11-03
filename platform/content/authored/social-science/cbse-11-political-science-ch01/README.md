# CBSE Class 11 Political Science, Chapter 1 — Constitution: Why and How?

`cbse-11-political-science-ch01` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032). Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch01/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, and writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 19 slides with 30 visuals (20 tables, 7 flows, 3 SVG); 6 notes sections; 31 flashcards; 73 questions worth 137 marks, including 15 case parts and alternatives |
| `tests.json` | `t_cbse11politicalscience_ch01_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `t_cbse11politicalscience_ch01_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`. Disjoint, no deck-check item, Section D is case-based. |
| `src/` | `lib.mjs` (the shared CBSE 11 Political Science authoring library, imported by every CBSE 11 Political Science chapter), `questions.mjs`, `build.mjs` |

## Scope

Both syllabus topics are covered. Fundamental Rights and Directive Principles are named in one line only (chapter 2 teaches them).
- **t01** why a constitution: meaning, written and unwritten forms, the five functions, sources of authority, rigid and flexible design
- **t02** making of the Indian Constitution: the demand and the Nehru Report, the Constituent Assembly (formation, composition, officers, working), the Objectives Resolution, borrowing and adaptation, adoption and enforcement

### Decks

- **Part 1** (19 slides): meaning, an SVG web of the five functions, each function with an imagined case, written and unwritten, three sources of authority.
  - Worked examples: classifying clauses of an imagined charter; planning a 5-mark answer on functions.
  - Four checks.
- **Part 2** (19 slides): an SVG timeline 1928 to 1950, composition and officers of the Assembly, the Objectives Resolution, working, two views on representativeness, an SVG chart of borrowed ideas, dates.
  - Worked examples: evaluating a claim about the Assembly; a 3-mark answer on borrowing.
  - Four checks.
- **Narration:** at most 70 words per slide, with no symbols or quotation marks.

### Question bank (73 items)

| Type | Count |
|---|---|
| mcq | 28 |
| assertion-reason | 6 (keys a, a, c, b, d, a) |
| true-false | 5 |
| fill-blank | 4 |
| match | 2 |
| ordering | 2 |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| case-based | 5, each with an internal choice in part (c) |

- **Passages:** all imagined and labelled: a colony newspaper report, a school debate, a village council meeting, a student letter and a table of borrowed ideas.
- **Difficulty:** d1 10, d2 31, d3 28, d4 4.
- **Competency:** recall 14, understanding 21, application 22, analysis 13, evaluation 3 (52% of items at application or above).
- **Spares (in neither test nor deck):** 14 mcq, 3 assertion-reason, 3 two-mark shorts, 2 three-mark shorts, 1 long, 2 case items.

## How verified

- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three runs gave byte-identical `release.json` and `tests.json`.
- Near-duplicate scan: 73 stems against 33,833 others, 0 flags. SVG label check: 3 figures, 0 issues.
- No map, no `$`, no quotation of any text, speech or thinker; no `*.wip.json` left.

## Facts for a reviewer

1. A constitution is the body of fundamental rules and principles by which a country is governed (own-words definition).
2. Five functions: (i) basic rules for minimal coordination and assurance; (ii) who has power to decide and how government is constituted; (iii) limits on government power, e.g. through fundamental rights; (iv) enabling government to fulfil aspirations and create conditions for a just society; (v) expressing the fundamental identity of a people.
3. Three sources of authority: mode of promulgation (who made it, wide acceptance); substantive provisions (fair, a reason for everyone to accept it); balanced institutional design with checks and balances, neither too rigid nor too flexible.
4. Britain has no single written constitutional document; its rules are in statutes, conventions and judicial decisions. India's is written, among the longest written constitutions.
5. Nehru Report, 1928: an early outline of a constitution for India (its chair and content are not stated).
6. The Assembly was formed on the lines of the Cabinet Mission plan, 1946; members elected indirectly by members of the provincial legislative assemblies; princely-state representatives also included.
7. First meeting 9 December 1946.
8. After Partition the strength fell to about 299 members (stated as commonly taught).
9. Dr Rajendra Prasad was President of the Assembly; the Drafting Committee was chaired by Dr B. R. Ambedkar. The Drafting Committee is placed in 1947 on the timeline (year only).
10. Objectives Resolution moved by Jawaharlal Nehru on 13 December 1946 and adopted in January 1947 (no day given); it set out ideals that shaped the Preamble.
11. The Assembly worked through committees, aimed at consensus and open discussion, respected diverse views, and built on the inheritance of the national movement.
12. Government of India Act 1935 was the base for many administrative provisions.
13. Borrowed ideas (adapted, not copied): Britain, parliamentary government, rule of law, office of the Speaker, single citizenship; United States, bill of rights (fundamental rights), judicial review, independent judiciary; Ireland, Directive Principles; France, liberty, equality and fraternity; Canada, quasi-federal form with a strong centre and residuary powers with the centre.
14. Adopted 26 November 1949 (now observed as Constitution Day); in force 26 January 1950 (Republic Day); about 2 years, 11 months and 18 days (commonly given).
15. Distractor facts: Simon Commission report 1930, Indian Independence Act 1947, Regulating Act 1773, Morley-Minto reforms 1909; Mahatma Gandhi was not a member of the Assembly.
16. The Assembly's representativeness is presented as some argue and others argue; the remark that princely-state members came by a different route from election by provincial assemblies is a broad statement for a reviewer to confirm.

## Unsure or worth a second look

- The exact day of adoption of the Objectives Resolution and the date of the Drafting Committee's appointment are deliberately not stated.
- The strength after Partition (about 299) is the commonly taught figure; the original strength is not given.
