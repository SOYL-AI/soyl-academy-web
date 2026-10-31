# ISC Class 12 Commerce, Chapter 9 — Organising

`isc-12-commerce-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (5 sections), 28 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch09_short` (20 marks, 50 min) and `t_isc12commerce_ch09_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch09/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: the meaning, **steps** and **importance** of organising; **functional and divisional structures** with their merits, demerits and differences, and recommending one for a given business; **formal and informal organisation**, including the grapevine; **delegation of authority** with its three elements (responsibility, authority, accountability) and importance; and **centralisation and decentralisation**, with delegation versus decentralisation.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Haldwani Fruit Canners, Salem Sago Mills, Sundargarh Steel Furniture, Kota Doria Weavers' Cooperative, Navsari Group, Bilaspur Agro, Bhagalpur Silk House, Bokaro Engineering Works, Gwalior Stone Carvers, Udupi Tiffin Rooms, Karwar Fisheries, Siliguri Tea Traders, Erode Turmeric Traders, and unnamed organisations in Itanagar, Bhubaneswar, Guwahati, Thrissur, Ujjain and Kolkata); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on organising. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Organising; What is organising?; Steps in organising; Worked example 1: a college food stall; Quick check: the right person; Why organising matters; Quick check: is reporting part of it?; Functional structure; Divisional structure; Functional or divisional?; Worked example 2: which structure?; Quick check: an analogy; Summary of Part 1; Exam tips. Part 2 (15 slides): Formal, Informal, Delegation and Decentralisation; Formal organisation; Informal organisation; Formal versus informal; Quick check: an analogy; Worked example 1: formal or informal?; Delegation and its three elements; Why delegate?; Quick check: which way it flows; Centralisation and decentralisation; Delegation versus decentralisation; Worked example 2: who decides?; Quick check: four depots; Summary of Part 2; Exam tips.
- **Visuals (23 of 29 slides):** flow 5, table 16, svg 2. Two drawn figures: a functional organisation chart (imagined sago mill) and a divisional chart (imagined group with dairy, furniture and travel-bag divisions); the rest are tables and flows.
- **Narration:** 5–54 words per slide (mean 39).

## Question bank (63 items, 110 marks)
| Type | Count |
|---|---|
| mcq | 25 |
| ordering | 1 |
| assertion-reason | 7 |
| true-false | 5 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| fill-blank | 3 |
| match | 1 |
| case-based | 2 |

- **MCQ keys:** a 6, b 6, c 7, d 6; **assertion-reason keys:** a a d b c a c.
- **Difficulty:** d1 1 · d2 30 · d3 30 · d4 2.
- **Competency:** understanding 28 · application 23 · analysis 9 · evaluation 3. Application or higher is **56% of items (69% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Competency balance.** The first build had 68% of items at application or above; eight identify-the-concept items were relabelled as understanding, bringing it to 56%.
2. **Diagrams.** The first render of the two charts had solid department boxes with poor text contrast and uneven spacing; boxes are now lightly tinted and evenly spaced.
3. **Assertion-reason keys** use all four ISC options (a a d b c a c), with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used.
- Responsibility is described as flowing upward and accountability as never delegated, as in the usual Indian textbooks; check the wording against the ISC textbook in use.
- The merits and demerits listed for each structure and for formal and informal organisation are the common textbook set; the ISC textbook may list a slightly different selection.
