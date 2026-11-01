# ISC Class 12 Commerce, Chapter 7 — Principles of Management

`isc-12-commerce-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (5 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch07_short` (20 marks, 50 min) and `t_isc12commerce_ch07_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch07/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics: the **nature** of principles of management (universal, general guidelines, practice-based, flexible, mainly behavioural, cause and effect, contingent) and the **need** for them; **Taylor's five principles** of scientific management, with the mental revolution; **Fayol's fourteen principles**, including the scalar chain and gang plank and spotting a violated principle; and a **comparison** of Taylor and Fayol with their **relevance** in a modern Indian business. The techniques of scientific management (time study, functional foremanship and so on) are not in this ISC chapter and are not taught.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Aligarh Lock Company, Firozabad Bangle Works, Kannauj Attar House, Nashik Grape Packers, Ratnagiri Mango Packers, Mangaluru Tile Works, Bishnupur Terracotta Works, Thrissur Bell Metal, Kolhapuri Footwear Cooperative, Meerut Willow Works, Jalandhar Sports Goods, Port Blair Ferry Services, Leh Apricot Processors, Hubballi Bus Depot, Agartala Bamboo Works, Imphal Handloom Collective, Puducherry Paper Crafts, and unnamed firms in Visakhapatnam, Kollam, Kozhikode, Bengaluru, Kolkata and Bhubaneswar); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on principles of management. The scalar-chain diagram uses named posts (plant head, supervisors) rather than the usual lettered chain. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Principles of Management; What are principles of management?; Not like the laws of science; Worked example 1: which feature?; Quick check: everywhere?; Why managers need principles; Quick check: decisions by mood; F. W. Taylor and scientific management; Taylor's five principles; The mental revolution; Worked example 2: spot Taylor's principle; Quick check: an analogy; Summary of Part 1; Exam tips. Part 2 (15 slides): Fayol's Principles and Their Relevance; Fayol's principles: one to five; Fayol's principles: six to ten; Fayol's principles: eleven to fourteen; Unity of command or unity of direction?; Scalar chain and gang plank; Quick check: an analogy; Worked example 1: which principle is broken?; Quick check: tools on racks; Taylor and Fayol compared; Are the principles still relevant?; Worked example 2: an app-based firm; Quick check: where the ideas came from; Summary of Part 2; Exam tips.
- **Visuals (23 of 29 slides):** flow 6, table 16, svg 1. One drawn figure: a scalar chain at an imagined plant with a gang plank between two supervisors; the rest are tables and flows.
- **Narration:** 6–61 words per slide (mean 43).

## Question bank (64 items, 110 marks)
| Type | Count |
|---|---|
| mcq | 28 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| match | 1 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 7, d 7; **assertion-reason keys:** a d a c b a b.
- **Difficulty:** d1 4 · d2 27 · d3 31 · d4 2.
- **Competency:** recall 2 · understanding 27 · application 23 · analysis 10 · evaluation 2. Application or higher is **55% of items (65% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Competency balance.** The first build had 67% of items at application or above; eight straightforward identify-the-principle items were relabelled as understanding, bringing it to 55%.
2. **Statement-combination items** were checked so that exactly one option is correct (Taylor versus Fayol principles; violations at the bus depot; Taylor–Fayol comparison).
3. **Assertion-reason keys** use all four ISC options (a d a c b a b), with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used.
- Taylor's principles are taught as five (science, not rule of thumb; harmony, not discord; cooperation, not individualism; development of each person to greatest efficiency and prosperity; maximum, not restricted, output), as the ISC syllabus says; some textbooks list four, merging or dropping the last. Check against the ISC textbook in use.
- Features of principles are given as seven (including contingent); some textbooks list fewer. The ISC syllabus names universal, flexible and general guidelines.
