# ISC Class 12 Commerce, Chapter 10 — Staffing

`isc-12-commerce-ch10` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (4 sections), 28 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch10_short` (20 marks, 50 min) and `t_isc12commerce_ch10_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch10/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics: the meaning, **eight steps** and **importance** of staffing; **recruitment** with its internal sources (promotion, transfer) and external sources, and their merits and demerits; the **selection procedure** (screening, five selection tests, interview, reference checks, decision, medical examination, job offer, contract of employment) and **recruitment versus selection**; and **training and development** — their differences, the types of training (induction, job instruction, apprenticeship, internship) and **on-the-job and off-the-job methods**.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Ambala Science Instruments, Bhilwara Yarn Mills, Hassan Coffee Curers, Pali Dye Works, Rajkot Diesel Engines, Durg Steel Fabricators, Kolar Silk Reelers, Mirzapur Carpets, Nellore Aqua Feeds, Kakinada Port Logistics, Tirunelveli Halwa House, and unnamed organisations in Kolhapur, Gangtok, Shimla and Ambala); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on staffing. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Staffing; What is staffing?; Steps in staffing; Worked example 1: which step?; Quick check: does it end at hiring?; Why staffing matters; Recruitment and internal sources; External sources; Quick check: a job portal; Internal or external?; Worked example 2: matching posts to sources; Quick check: an analogy; Summary of Part 1; Exam tips. Part 2 (15 slides): Selection, Training and Development; Steps in selection; Selection tests; Worked example 1: a school hires a bus driver; Quick check: an analogy; Recruitment versus selection; Training and development; Types of training; On-the-job methods; Off-the-job methods; Quick check: daily guidance; Worked example 2: choosing a method; Quick check: coaching; Summary of Part 2; Exam tips.
- **Visuals (23 of 29 slides):** flow 6, table 17. No drawn figures: the steps of staffing and of selection are flows; the rest are tables.
- **Narration:** 5–53 words per slide (mean 41).

## Question bank (62 items, 109 marks)
| Type | Count |
|---|---|
| mcq | 25 |
| assertion-reason | 6 |
| true-false | 4 |
| fill-blank | 4 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| match | 1 |
| ordering | 1 |
| case-based | 2 |

- **MCQ keys:** a 6, b 6, c 7, d 6; **assertion-reason keys:** a a d a c b.
- **Difficulty:** d1 2 · d2 31 · d3 27 · d4 2.
- **Competency:** understanding 28 · application 22 · analysis 10 · evaluation 2. Application or higher is **55% of items (66% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Answer leak.** The 2-mark model answer on the meaning of staffing repeated the notes' definition word for word and was reworded.
2. **Competency balance.** The first build had 68% of items at application or above; eight identify-the-step or identify-the-source items were relabelled as understanding, bringing it to 55%.
3. **Assertion-reason keys** use all four ISC options (a a d a c b), with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used.
- Staffing is taught with eight steps and selection with eight steps, as in the common Indian textbooks; check the ISC textbook in use, which may merge job offer and contract, or list placement and orientation separately.
- The four types of training (induction, job instruction, apprenticeship, internship) are the usual textbook set behind the syllabus phrase "types and methods"; confirm against the ISC textbook.
- Employment exchanges are described in general terms only; their present-day form (online national career services) is not described, to avoid dated detail.
