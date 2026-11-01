# ISC Class 12 Commerce, Chapter 12 — Controlling and Coordination

`isc-12-commerce-ch12` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 15 slides), notes (4 sections), 27 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch12_short` (20 marks, 50 min) and `t_isc12commerce_ch12_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch12/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ISC syllabus topics: **controlling** (meaning, the five steps from setting standards to corrective action, quantitative and qualitative standards, percentage deviations against a permitted limit, and its importance); the **relationship between planning and controlling** (inseparable, each looking back and ahead) and **management by exception** with its benefits; and **coordination** (meaning, features, the reasons it is needed, coordination versus cooperation, and why it is the **essence of management**).
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Pennar Cement Works, Kalinga Eye Hospital, Kakatiya Granite, Netravati Cashew Exports, Siddheshwar Terry Towels, Hoysala Coffee Curers, Bhavani Turmeric Traders, Palar Leather Tanners, Kaveri Delta Rice Mill, Tala Nagri Locks, Kranti Sports Gear, Konkan Mango Packers, Betwa Bus Body Works, Brahmani Courier Services, Rapti Sugar Mill, Dalma Auto Components, Shivalik Herbal Remedies, Vishwamitri Pharma Labs, Pushkar Rose Water, Bhujodi Weavers Collective, Teesta Cardamom Growers, Tripura Bamboo Blinds, Theyyam Handloom Cooperative, Damodar Coal Washeries, Kshipra Incense Works, Barak Valley Tea Estate, Naini Lake Boat Club, Beas Apple Orchards, Phulkari Crafts, Godavari Mart, Karnal Basmati Foods, Kollam Cashew Roasters); none of them, and no set-up, comes from the CBSE 12 Business Studies chapters on controlling or on the nature of management. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Controlling; What is controlling?; The controlling process; Kinds of standards; Quick check: the first step; Worked example 1: the five steps in a plant; Quick check: which step?; Worked example 2: is the gap significant?; Analysing deviations and correcting them; Why controlling matters; Quick check: finding causes; Summary of Part 1; Exam tips. Part 2 (15 slides): Planning, Exception and Coordination; Planning and controlling are inseparable; Looking back and looking ahead; Management by exception; Quick check: what reaches the top?; Worked example 1: who handles the deviation?; Benefits of management by exception; Coordination; Quick check: once is not enough; Why coordination is needed; Coordination: the essence of management; Worked example 2: coordination in all five functions; Quick check: every level?; Summary of Part 2; Exam tips.
- **Visuals (22 of 28 slides):** flow 6, table 14, svg 2. Two drawn figures: a management-by-exception chart (monthly deviations against a five per cent band, plotted from the stated values) and a hub diagram of coordination running through the five functions; the controlling process and the planning–controlling cycle are flows with a loop-back edge; the rest are tables.
- **Narration:** 5–52 words per slide (mean 39).

## Question bank (64 items, 112 marks)
| Type | Count |
|---|---|
| mcq | 26 |
| assertion-reason | 6 |
| true-false | 4 |
| fill-blank | 4 |
| match | 2 |
| short (2 marks) | 8 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 6, d 6; **assertion-reason keys:** c b a c a d.
- **Difficulty:** d1 6 · d2 25 · d3 32 · d4 1.
- **Competency:** recall 3 · understanding 25 · application 20 · analysis 15 · evaluation 1. Application or higher is **56% of items (71% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Fill-blank key.** The analogy solution said “last (fifth) step”, which did not contain the accepted answer “last step”; it was reworded.
2. **Competency balance.** Seven identify-the-step or identify-the-reason items were re-tagged from application to understanding, bringing application-or-higher into the 45–65 % band.
3. **Arithmetic.** Every percentage deviation (6 per cent for 1,880 against 2,000; 10 per cent for 900 against 1,000) was re-checked by hand; no “=” chains are used.
4. **Assertion-reason keys** use all four ISC options, with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used; all content is stable textbook concepts and imagined figures.
- Coordination is taught here (as the ISC syllabus places it in this chapter); the CBSE course teaches it in the nature-of-management chapter.
