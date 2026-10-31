# ISC Class 12 Commerce, Chapter 6 — Nature and Significance of Management

`isc-12-commerce-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (6 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch06_short` (20 marks, 50 min) and `t_isc12commerce_ch06_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch06/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics: management as an **activity**, a **group**, a **discipline** and a **process**; the **organisational, social and personal objectives** and the **characteristics** of management (goal-oriented, pervasive, continuous, group activity, intangible); management as a **science, an art and a profession**; and the **importance** of management with the functions of the **top, middle and supervisory levels**.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Lonavla Chikki Works, Hampi Stoneware, Majuli Mask Studio, Dhauladhar Trekking Company, Chilika Prawn Exports, Coorg Pepper House, Bhimtal Candles, Pochampally Ikat House, Sinhagad Ridge Half Marathon, Pasighat Riverbank Music Festival, Konark Cashew Processors, Kuttanad Boat Clinic, Blue Tide Surf School, and unnamed firms in Shillong, Ongole, Goa, Aizawl, Udaipur and near Nalanda); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on the nature and significance of management. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Nature and Significance of Management; Four ways to read the word; Management as a process; Worked example 1: which sense?; Quick check: a field of study; Management as an activity; Objectives of management; Worked example 2: sorting objectives; Quick check: an analogy; Characteristics of management; Reading the clues in a case; Quick check: working together; Summary of Part 1; Exam tips. Part 2 (15 slides): Is Management a Science, an Art or a Profession?; Management as a science; Management as an art; Management as a profession; Worked example 1: science, art or profession?; Quick check: testing layouts; The verdict; Why management matters; Quick check: adapting to change; Levels of management; What each level does; Worked example 2: who is at which level?; Quick check: time at each level; Summary of Part 2; Exam tips.
- **Visuals (23 of 29 slides):** flow 5, table 17, svg 1. One drawn figure: a pyramid of the three levels of management with their functions; the rest are tables and flows.
- **Narration:** 7–58 words per slide (mean 42).

## Question bank (62 items, 109 marks)
| Type | Count |
|---|---|
| mcq | 25 |
| true-false | 5 |
| fill-blank | 4 |
| assertion-reason | 5 |
| match | 2 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| case-based | 2 |

- **MCQ keys:** a 7, b 6, c 7, d 5; **assertion-reason keys:** a b c d a.
- **Difficulty:** d1 2 · d2 31 · d3 27 · d4 2.
- **Competency:** recall 1 · understanding 26 · application 20 · analysis 13 · evaluation 2. Application or higher is **56% of items (66% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Competency balance.** The first build had 76% of items at application or above; twelve straightforward identify-the-concept items were relabelled as understanding, bringing it to 56%.
2. **Match item.** The levels-of-management match first had two answers that both meant top management; the fourth pair now uses operative staff, so every right-hand entry is distinct.
3. **Assertion-reason keys** use all four ISC options (a b c d a), with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used.
- The verdict that management is not yet a full profession in India (no restricted entry, no compulsory association, no legally binding code) is the standard textbook position; check it against the ISC textbook in use.
- Management as an activity is explained through interpersonal, informational and decisional tasks; confirm this matches the wording of the ISC textbook in use.
- The ISC syllabus lists five characteristics (goal-oriented, pervasive, continuous, group activity, intangible); multidimensional and dynamic, which some textbooks add, are not taught as separate characteristics here.
