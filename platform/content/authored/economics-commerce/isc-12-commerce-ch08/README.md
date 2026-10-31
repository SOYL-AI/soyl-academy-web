# ISC Class 12 Commerce, Chapter 8 — Planning

`isc-12-commerce-ch08` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 14 slides), notes (5 sections), 29 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch08_short` (20 marks, 50 min) and `t_isc12commerce_ch08_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch08/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ISC syllabus topics: an overview of the **five functions of management** with the **meaning and importance of planning** as the primary function; the **seven steps** of the planning process and the **limitations** of planning; and the **types of plans** (objectives, strategies, policies, procedures, methods, rules, budgets and programmes), with identifying the type from an example.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Thanjavur Doll Makers, Cuttack Silver Filigree, Munnar Spice Trails, Hosur Rose Farms, Nagpur Orange Juices, Vadodara Solar Lamps, Ranchi Lac Bangles, Jammu Basmati Mills, Gorakhpur Terracotta, Kanpur Leather Bags, Patna Litti Café, Tezpur Tea Cafés, and unnamed firms in Lucknow, Kolkata, Gaya, Mysuru, Hyderabad, Chennai and Khurja); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on planning. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Planning; The five functions of management; What is planning?; Quick check: the order of functions; Why planning matters; Worked example 1: which benefit?; Quick check: do supervisors plan?; Steps in planning; Premises and alternatives; Worked example 2: a pottery school plans; Quick check: the last step; Summary of Part 1; Exam tips. Part 2 (14 slides): Limitations and Types of Plans; Limitations of planning; Worked example 1: spot the limitation; Quick check: no budget for a good idea; Plan anyway; Types of plans; Policy or rule?; Quick check: a general guide; Procedure or method?; Worked example 2: classify the statements; Quick check: spray, not brush; Budgets, programmes and strategies; Summary of Part 2; Exam tips.
- **Visuals (21 of 27 slides):** flow 6, table 15. No drawn figures: the functions cycle and the seven steps are flows; the rest are tables.
- **Narration:** 7–58 words per slide (mean 39).

## Question bank (63 items, 110 marks)
| Type | Count |
|---|---|
| mcq | 27 |
| assertion-reason | 6 |
| true-false | 4 |
| fill-blank | 3 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| ordering | 1 |
| match | 1 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 6, d 7; **assertion-reason keys:** a b a c d c.
- **Difficulty:** d1 3 · d2 25 · d3 33 · d4 2.
- **Competency:** recall 2 · understanding 26 · application 23 · analysis 11 · evaluation 1. Application or higher is **56% of items (65% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Competency balance.** The first build had 70% of items at application or above; nine identify-the-step or identify-the-type items were relabelled as understanding, bringing it to 56%.
2. **Statement-combination items** (importance of planning, limitations, rules in a museum-shop handbook) were checked so that exactly one option is correct.
3. **Assertion-reason keys** use all four ISC options (a b a c d c), with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used.
- Planning is taught with seven steps (objectives, premises, identifying, evaluating and selecting alternatives, implementation, follow-up) and six limitations; check that the ISC textbook in use does not merge or split any of them.
- Single-use and standing plans are not in the ISC syllabus wording and are not taught as a classification.
