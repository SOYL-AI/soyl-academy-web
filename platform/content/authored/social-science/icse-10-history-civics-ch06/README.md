# ICSE Class 10 History & Civics, Chapter 6 — The High Courts and Subordinate Courts

`icse-10-history-civics-ch06` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). Built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs` (imported, not copied). From `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch06/src/build.mjs`. The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 16 slides, 27 with visuals: an SVG court hierarchy, the rest tables and flows); notes (6 sections); 32 flashcards; 73 questions (168 marks) |
| `tests.json` | `t_icse10historycivics_ch06_short` (20 marks, 30 min) on `icse-10-history-civics-chapter-test-short`: Part I 5 MCQ + 1 AR + 2 × 2-mark, Part II one of two 10-mark questions. `t_icse10historycivics_ch06_long` (40 marks, 60 min) on `icse-10-history-civics-chapter-test-long`: Part I 9 MCQ + 1 AR + 5 × 2-mark, Part II two of three 10-mark questions. The two tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, court-hierarchy SVG, asserted special-majority counts), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All four syllabus topics are covered:
- t01: composition of a High Court; qualifications, appointment, transfer, removal and independence of judges
- t02: original, appellate and revisory jurisdiction; superintendence; writs and the comparison with the Supreme Court; judicial review; Court of Record
- t03: the Court of the District Judge and the Sessions Court
- t04: Lok Adalats: meaning, working, status of awards, advantages and limits

## Question bank (73 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 32 | keys a8 b8 c8 d8 |
| assertion-reason | 5 | ICSE option order, set by `verdict` (keys c, d, a, c, c) |
| true-false · fill-blank · match · ordering | 4 · 3 · 1 · 1 | match: the four writs; ordering: route of a criminal case |
| short 2-mark | 13 | |
| short 3-mark | 4 | |
| long 10-mark | 7 | each in 3 + 3 + 4 parts with step marks; `l_hierarchy` reads the SVG court hierarchy |
| source-based | 3 | imagined intern's diary, district cause list, district newsletter; each with an either/or part (c) |

- **Difficulty:** d1 7, d2 35, d3 28, d4 3.
- **Competency:** 52% of items are at application or above.
- **Decks:** Part 1 has 3 check slides (`m_common_hc`, `m_retire`, `m_227`) and 3 worked examples; Part 2 has 4 check slides (`m_dj_bar`, `tf_sessions_civil`, `m_la_fee`, `fb_la_people`) and 2 worked examples. Narration is at most 71 words a slide.

## Facts for a reviewer to double-check
1. **Composition (Articles 216, 224, 231):** a Chief Justice and other judges as the President decides; additional judges for up to two years; acting judges during absence; Parliament may set up a common High Court for two or more States or Union Territories.
2. **Qualifications (Article 217):** citizen of India; ten years in a judicial office in India or ten years as an advocate of a High Court (or of two or more in succession). No minimum age; retirement at 62.
3. **Appointment:** by the President after consulting the Chief Justice of India, the Governor and (for other judges) the Chief Justice of the High Court; the collegium practice "since the 1990s" is stated broadly, without case names. Oath before the Governor.
4. **Transfer (Article 222):** by the President after consulting the Chief Justice of India.
5. **Removal:** as for Supreme Court judges: an address by each House supported by a majority of its total membership and two-thirds of those present and voting, on proved misbehaviour or incapacity. The worked example uses 543 members and an imagined 480 voting (272, 320, both met at 320), computed and asserted.
6. **Independence:** salaries charged on the Consolidated Fund of the State and not reducible except in a financial emergency; a retired permanent judge may plead only before the Supreme Court and other High Courts (Article 220).
7. **Original jurisdiction:** writs under Article 226; election petitions for Parliament and the State Legislature; "in some High Courts" certain civil matters such as admiralty, company or matrimonial cases (stated cautiously).
8. **Writs:** Article 226 covers Fundamental Rights "and any other purpose"; Article 32 covers Fundamental Rights only and is itself a Fundamental Right. Prohibition is taught as issued while a case is pending; certiorari after the decision.
9. **Appellate, revisory and supervisory:** civil appeals from the District Judge; criminal appeals from the Sessions Court; confirmation of death sentences; revision where no appeal lies; superintendence under Article 227 over all courts and tribunals except military tribunals.
10. **Court of Record (Article 215):** judgements preserved, binding on lower courts and cited as precedents; power to punish for contempt. High Courts have no advisory jurisdiction (only the Supreme Court, under Article 143).
11. **Subordinate courts (Article 233):** District Judges appointed by the Governor in consultation with the High Court; seven years as an advocate for direct appointment. The District Judge hears civil appeals and important civil suits; the Sessions Court tries serious crimes and hears appeals from magistrates; the same officer usually holds both titles.
12. **Criminal procedure:** the notes give a dated line that the Bharatiya Nagarik Suraksha Sanhita, 2023 replaced the Code of Criminal Procedure from 1 July 2024 and keeps the rule that a Sessions Court's death sentence needs High Court confirmation. No question tests the new Act's name.
13. **Lok Adalats:** began in the early 1980s (no exact first date is tested); statutory status from the Legal Services Authorities Act, 1987; a bench usually of a serving or retired judicial officer with a lawyer or social worker; pending or pre-litigation cases, mainly civil and compoundable; award deemed a civil decree, final and binding, no appeal; no court fee, and fee paid on a pending case is refunded on settlement.
14. **Not stated:** no serving or past judge is named, no real person is quoted, and no statistics of pendency are given. The specimen's wording on original jurisdiction is not reused.

## Gaps
- Nobody has seen the SVG court hierarchy rendered; it needs a look at 360 px on staging, in light and dark mode.
- Narration audio is not generated yet (TTS stage).
