# CBSE Class 11 Computer Science, Chapter 8 — Society, Law and Ethics

`cbse-11-computer-science-ch08` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-050) to the standard of the CBSE 11 Computer Science chapters. Four syllabus topics: t01 digital footprints, netizens, etiquette, data protection and safe behaviour; t02 intellectual property rights, their violation, open source software and licensing (Creative Commons BY, SA, NC, ND; GPL; Apache); t03 cyber crime, malware, cyber safety and the Information Technology Act, 2000 (amended 2008); t04 e-waste, health and technology, gender and disability issues.

**Building it.** Run `npx tsx content/authored/computer-science/cbse-11-computer-science-ch08/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build validates the schema, runs the pipeline lint and deterministic verify checks, the narration rules, the answer-leak scan, the cross-chapter stem originality check and the editorial counts, checks both tests against the `cbse-11-default` chapter-test blueprints, and writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 20 slides (30 visuals, all tables and flows; 8 check slides; 6 worked examples); 6 notes sections; 30 flashcards; 83 questions worth 151 marks |
| `tests.json` | `t_cbse11computerscience_ch08_short` (20 marks, 40 min) and `t_cbse11computerscience_ch08_long` (40 marks, 90 min), item for item on `cbse-11-default-chapter-test-short` / `-long`, with internal-choice groups. Disjoint, no deck-check item, Section D case-based. |
| `src/` | `lib.mjs` (unchanged copy of the CBSE 11 lib), `questions.mjs` (constants with JavaScript assertions, t01 and t02 items), `questions2.mjs` (t03 and t04 items), `build.mjs` (visuals, decks, notes, flashcards, tests) |

## How numbers are produced

This is a theory chapter: no program is executed and there is no `py-cache.json`. Every count stated anywhere (four Creative Commons elements, three IPR kinds, three violations, the lab clear-out of 48 computers split into 18, 20 and 10, the six screen breaks in a 120-minute class) is derived from constants in `questions.mjs` and asserted with `node:assert`. No section number, penalty amount or prison term of any law is cited, and no real incident, court case, person, brand or company is named.

## Question bank (83 items)

| Type | Count |
|---|---|
| mcq | 31 |
| assertion-reason | 8 (keys b, a, c, d, b, c, d, a) |
| true-false · fill-blank · match · ordering | 5 · 4 · 3 · 3 |
| short | 12 × 2 marks, 7 × 3 marks |
| long | 6 × 5 marks |
| case-based | 4 × 4 marks (digital footprint, Creative Commons licence, phishing, e-waste); internal choice in part (c) |

- Topics: t01 19, t02 21, t03 26, t04 17.
- Difficulty d1 8, d2 41, d3 32, d4 1, d5 1. Competency recall 7, understanding 37, application 32, analysis 6, evaluation 1 (47% application or above). The subject-producer's review retagged six scenario-labelling MCQs from application to understanding (`m_tm_scn`, `m_plag_scn`, `m_piracy_scn`, `m_ransom_scn`, `m_3r_scn`, `m_disability`) and raised `l_licences` to d5 evaluation.
- MCQ keys a7 b8 c8 d8.

## For a reviewer

- **Facts to check:** the IT Act set up the Cyber Appellate Tribunal for appeals; the notes and two model answers add that since 2017 its work has been done by the Telecom Disputes Settlement and Appellate Tribunal (Finance Act, 2017). Copyright arising on creation (no registration needed) is stated in general terms. The SA and ND elements of Creative Commons not being combinable is stated in the notes.
- **Wording:** several items speak of "a message from an address that misspells the bank's name"; no real address or URL appears anywhere.
- **Hardest items:** `l_licences` (licence comparison with a reasoned recommendation) is d5 evaluation; the cyber-law long answer is d4.
- **Not rendered yet:** no one has seen the decks on a phone at 360 px.
