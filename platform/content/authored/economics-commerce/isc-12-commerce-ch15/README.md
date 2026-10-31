# ISC Class 12 Commerce, Chapter 15 — Marketing Mix: Place and Promotion

`isc-12-commerce-ch15` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 13 slides), notes (4 sections), 29 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch15_short` (20 marks, 50 min) and `t_isc12commerce_ch15_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch15/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics: **channels of distribution** (zero-, one- and two-level, drawn as flows; the role of middlemen; product, market, company and competitive factors in choosing a channel); **physical distribution** and its elements — order processing, transportation, warehousing and inventory control — taught as meaning only, as the syllabus specifies; the **promotion mix** and its roles (inform, persuade, remind); and **advertising, sales promotion, personal selling and publicity** (meaning, features, objectives, the advertising–personal selling and sales promotion–publicity comparisons, and recommending a tool for a given product and market).
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Kolar Silk Reelers, Shimsha Jaggery Works, Pratishthan Paithani, Pearl City Macaroons, Aliyar Coconut Water, Doddabetta Chocolates, Amaravathi Home Linen, Hampi Denim, Pedana Kalamkari Prints, Bekal Beach Resort, Eluru Agro Sprayers, Meenachil Rubber Mats, Hosur Precision Gears, Sirumalai Banana Chips, Erai Valley Lodges); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on marketing. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Marketing Mix: Place and Promotion; What is a channel of distribution?; Levels of channels; Worked example 1: count the middlemen; Quick check: zero-level; Choosing a channel; Worked example 2: which factor?; Quick check: direct selling; Physical distribution; Elements of physical distribution; Quick check: storing near markets; Summary of Part 1; Exam tips. Part 2 (13 slides): The Promotion Mix; Promotion mix and its roles; Quick check: four tools together; The four tools; Sorting the tools; Advertising versus personal selling; Quick check: an analogy; Sales promotion versus publicity; Worked example 1: name the tool; Worked example 2: recommend a tool; Quick check: buy two, get one; Summary of Part 2; Exam tips.
- **Visuals (20 of 26 slides):** flow 5, table 12, svg 3. Two drawn figures: zero-, one- and two-level channels as arrowed rows, and a paid/unpaid by personal/impersonal grid that sorts the four promotion tools; the rest are tables and flows.
- **Narration:** 6–53 words per slide (mean 36).

## Question bank (63 items, 110 marks)
| Type | Count |
|---|---|
| mcq | 25 |
| assertion-reason | 6 |
| true-false | 5 |
| fill-blank | 4 |
| match | 2 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| case-based | 2 |

- **MCQ keys:** a 7, b 6, c 6, d 6; **assertion-reason keys:** a c a a b d.
- **Difficulty:** d1 7 · d2 30 · d3 25 · d4 1.
- **Competency:** recall 3 · understanding 25 · application 20 · analysis 14 · evaluation 1. Application or higher is **56% of items (62% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Competency balance.** Two count-the-middlemen MCQs were re-tagged from application to understanding, bringing application-or-higher to 56 %.
2. **Physical distribution** is kept to meaning only, as the syllabus specifies; the 3-mark item asks for meaning-level explanations with examples.
3. **Assertion-reason keys** use all four ISC options, with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used; all content is stable textbook concepts.
- Publicity is treated as one of the four elements of the promotion mix (as in the ISC syllabus wording); some textbooks use “public relations” instead. A reviewer may want to check that this wording matches the class textbook.
