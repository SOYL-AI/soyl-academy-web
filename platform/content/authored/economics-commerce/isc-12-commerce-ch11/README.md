# ISC Class 12 Commerce, Chapter 11 — Directing

`isc-12-commerce-ch11` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 14 slides), notes (5 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch11_short` (20 marks, 50 min) and `t_isc12commerce_ch11_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch11/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: meaning, features and importance of **directing**; **supervision**, the functions of a supervisor and **span of control** (with the factors that decide it); **motivation** and **Maslow's need hierarchy** with incentives for each level; **leadership** and the autocratic, democratic, laissez-faire and bureaucratic styles (meaning only, as the syllabus specifies); and **communication**: objectives, the process (sender, encoding, channel, decoding, receiver, feedback, noise), barriers (semantic, psychological, organisational, personal) and how to overcome them.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Lushai Handlooms, Yamuna Blankets, Kallai Timber Mart, Rispana Biscuits, Agnigarh Hospital Supplies, Sky Sarus Airways, Shivnath Steel Fabricators, Chilika Seafoods, Tawi Dry Fruits, Lakhota Brass Parts, Shevaroy Steel Utensils, Loktak Fish Farms, Swarna River Software, Kundanagari Foundry, Waltair Marine Fittings, Subarnarekha Agro Tools, Dharwad Pedha House, Panchganga Leather Works, Indravati Forest Produce Cooperative, Mahanadi Rice Exports, Sur Sangam Instruments); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on directing. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Directing; What is directing?; Features of directing; Why directing matters; Quick check: continuous or one-time?; Worked example 1: which importance?; Supervision; Span of control; What decides the span?; Quick check: span of control; Motivation and Maslow's hierarchy; Worked example 2: matching incentives to needs; Quick check: which need?; Summary of Part 1; Exam tips. Part 2 (14 slides): Leadership and Communication; What is leadership?; Four styles of leadership; Worked example 1: name the style; Quick check: rules decide; Communication and its objectives; The communication process; Quick check: an analogy; Barriers to communication; Worked example 2: barriers and remedies; Overcoming barriers; Quick check: rigid forms; Summary of Part 2; Exam tips.
- **Visuals (23 of 29 slides):** flow 6, table 15, svg 2. Two drawn figures: narrow and wide span of control, and Maslow's need hierarchy as stacked bands; the communication process is a flow with the feedback loop; the rest are tables and flows.
- **Narration:** 7–57 words per slide (mean 39).

## Question bank (66 items, 114 marks)
| Type | Count |
|---|---|
| mcq | 27 |
| assertion-reason | 6 |
| true-false | 5 |
| fill-blank | 4 |
| short (2 marks) | 8 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| match | 2 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 7, d 6; **assertion-reason keys:** b a a d c b.
- **Difficulty:** d1 8 · d2 29 · d3 28 · d4 1.
- **Competency:** recall 3 · understanding 27 · application 24 · analysis 12. Application or higher is **55% of items (66% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Answer leak.** The 2-mark span-of-control model answer repeated the deck definition word for word and was reworded.
2. **Competency balance.** Eleven straight identify-the-need or identify-the-style MCQs were re-tagged from application to understanding, bringing application-or-higher into the 45–65 % band.
3. **Leadership styles** are kept to meaning only, as the syllabus specifies; no qualities-of-a-leader or theory items.
4. **Assertion-reason keys** use all four ISC options, with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used; all content is stable textbook concepts.
- Some textbooks list a fifth barrier group (physical noise) or call personal barriers 'barriers related to superiors and subordinates'; the four-group classification here follows common ISC usage.
