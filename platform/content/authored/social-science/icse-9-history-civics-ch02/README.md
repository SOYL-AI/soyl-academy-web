# ICSE Class 9 History & Civics, Chapter 2 — Directive Principles and the Welfare State

`icse-9-history-civics-ch02` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus (elementary Civics: Articles are named, never quoted). Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch02/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (17 + 17 slides, 12 + 12 with visuals: 3 SVG figures, the rest tables and flows; 4 checks and 2 worked examples each); notes (6 sections); 30 flashcards; 79 questions |
| `tests.json` | `t_icse9historycivics_ch02_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch02_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, three SVG figures, asserted figures), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All three syllabus topics are covered (no removed topics for this chapter):
- t01: Directive Principles of State Policy: meaning, purpose, examples (including the three-group classification)
- t02: difference between Fundamental Rights and Directive Principles
- t03: meaning of a welfare state, and how the Directive Principles aim at it

## Question bank (79 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 30 | Keys a7 b7 c8 d8 |
| assertion-reason | 5 | ICSE option order; keys c, b, a, d, c |
| true-false · fill-blank · match · ordering | 3 · 4 · 2 · 1 | Match items: Articles to subjects; laws to principles. Ordering: dated steps 1950 to 2009 |
| short 2-mark | 15 | |
| short 3-mark | 9 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined documents: a newspaper report, project notes on a village, minutes of a classroom debate. Each has an either/or part (c). |

- **Difficulty:** d1 13, d2 35, d3 27, d4 4.
- **Competency:** recall 19, understanding 18, application 23, analysis 13, evaluation 6. That puts 53% of items at application or above.
- **Topics (items tagged):** t01 32, t02 18, t03 22, plus 7 items spanning two topics.

## Tests (item keys)
- Short: A = `m_articles`, `m_pol_soc`, `m_welfare_feature`, `m_old_age`, `ar_nonjust`, `s_two_diff`, `s3_features`; B = attempt 1 of `l_fr_dp`, `l_welfare`.
- Long: A = `m_state_duty`, `m_cottage`, `m_env1976`, `m_remedy`, `m_law_conflict`, `m_panchayat`, `m_nrega`, `ar_welfare`, `s_dp_meaning`, `s_classify_scenario`, `s_welfare_example`, `s3_groups`, `s3_court_refuse`; B = attempt 2 of `l_dp_meaning`, `l_marunadu`, `l_prefer`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars: 0 flags; SVG label overflow and overlap: 0 issues.
- Every stem is specific to an imagined state, village, scheme, petition or debate to stay clear of CBSE 11 Political Science and CBSE 10 Social Science wording.

## Facts for a reviewer to double-check
1. Directive Principles of State Policy are in **Part IV**, **Articles 36 to 51** (sixteen Articles; asserted in the code).
2. The idea of Directive Principles was inspired by the **Irish Constitution**.
3. **Article 37**: the principles are not enforceable by any court, yet fundamental in the governance of the country, and it is the duty of the State to apply them in making laws (paraphrased, never quoted).
4. Fundamental Rights are in **Part III**, **Articles 12 to 35** (twenty-four Articles; asserted). Fundamental Rights are justiciable and enforceable through the Supreme Court and High Courts.
5. Teaching classification (not in the Constitution; the figure says so): **socialistic/economic**, **Gandhian**, **liberal-intellectual**. Article numbers used for examples:
   - **39(a)** adequate means of livelihood; **39(b)** distribution of resources for the common good; **39(d)** equal pay for equal work for men and women;
   - **41** right to work, education and public assistance in unemployment, old age, sickness and disablement; **42** just and humane conditions of work and maternity relief; **43** living wage, and also cottage industries in rural areas;
   - **40** village panchayats; **46** educational and economic interests of weaker sections including the Scheduled Castes and Scheduled Tribes; **47** nutrition, standard of living, public health and prohibition of intoxicating drinks and drugs injurious to health except for medicinal use; **48** agriculture and animal husbandry on modern lines and protection of cows, calves and other milch and draught cattle (stated neutrally as a principle);
   - **44** the State to endeavour to secure a uniform civil code (stated only as a directive, no opinion); **49** protection of monuments and places of national importance; **50** separation of the judiciary from the executive; **51** promotion of international peace and security; **48A** protection and improvement of the environment, forests and wildlife.
6. **Article 48A** was added by the **42nd Amendment, 1976** (not in the original 1950 text).
7. Differences taught: justiciable versus non-justiciable; Fundamental Rights mostly negative restrictions on the State versus positive obligations in the principles ("mostly", because some rights, such as Article 21A, impose positive duties); rights secure political democracy, principles aim at social and economic democracy; a law violating a Fundamental Right can be declared void, but a law is not struck down merely for not implementing a Directive Principle.
8. **73rd Amendment, 1992** gave constitutional status to panchayats (linked to Article 40). It came into force in 1993; the chapter only uses 1992.
9. **Equal Remuneration Act, 1976** (equal pay for men and women for the same work; linked to Article 39(d)).
10. **86th Amendment, 2002** inserted **Article 21A** (education a Fundamental Right for children aged six to fourteen); the **Right to Education Act, 2009** gave it effect (the Act came into force in 2010; the chapter uses 2009).
11. The **rural employment guarantee Act of 2005** (linked to the right to work, Article 41). The items say "a law of 2005" and avoid its name, because the Act was later renamed and may since have been amended or replaced. **Reviewer: please confirm the present status of this law before release; if it has been replaced, adjust the wording of `m_nrega`, `mt_laws`, `vLaws` and the notes.**
12. The Preamble promises justice in its social, economic and political forms.
13. Timeline figure: 1950 (Constitution in force, 26 January), 1976, 1992, 2002, 2005, 2009, drawn evenly spaced and captioned "schematic, not to scale".

## Unsure / gaps
- Item 11 above (current status of the 2005 employment guarantee law).
- The 2002 change to Article 45 (early childhood care) is deliberately left out to keep the chapter elementary.
- The "night-watchman state" term is standard in textbooks but is not a constitutional term; it is used only for contrast in the welfare-state topic.
- No past-paper or specimen item was consulted; the built-in originality scan shows no duplicate stem.
