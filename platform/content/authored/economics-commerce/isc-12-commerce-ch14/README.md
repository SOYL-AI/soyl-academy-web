# ISC Class 12 Commerce, Chapter 14 — Marketing Mix: Product and Price

`isc-12-commerce-ch14` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 16 slides), notes (5 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch14_short` (20 marks, 50 min) and `t_isc12commerce_ch14_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch14/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: the **marketing mix** and how the four Ps work together; the **product** (meaning; consumer goods: convenience, shopping and specialty; industrial goods: raw materials and components, capital items, supplies; **product versus service** on tangibility, perishability, inseparability, variability and ownership); **branding** (brand, brand name, brand mark, trademark; merits; a good brand name), **labelling** and **packaging** (levels and features of good packaging); the **factors determining price** (cost, demand, competition, government regulation, marketing methods, pricing objectives); and **pricing strategies** — cost-plus, competitive, skimming, penetration and value-based — taught as meaning only, as the syllabus specifies.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Hirakud Ikat House, Deomali Coffee, Changthang Pashmina, Kalika Namkeen, Golden Dunes Camps, Kharkhoda Electricals, Japfu Pickles, Kumari Coir Products, Gooty Groundnut Oil, Manjara Dal Mills, Mewar Suitings, Thar Applique Works, Siang Valley Foods, Mullayanagiri Coffee Estates, Panchmura Terracotta, Kali River Fisheries); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on marketing. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Marketing Mix: Product and Price; The marketing mix; The four Ps must fit together; Quick check: the four Ps; What is a product?; Types of goods; Worked example 1: classify the goods; Quick check: little effort; Goods and services; Worked example 2: features of a service; Quick check: empty seats; Summary of Part 1; Exam tips. Part 2 (16 slides): Branding, Packaging and Price; Brand, brand name, brand mark, trademark; Why brand a product?; Quick check: the chilli symbol; Labelling; Levels of packaging; Features of good packaging; Worked example 1: designing a pack; What decides price?; Factors affecting price; Quick check: the price floor; Pricing strategies; Worked example 2: cost-plus and strategies; Quick check: an analogy; Summary of Part 2; Exam tips.
- **Visuals (23 of 29 slides):** flow 3, svg 4, table 16. Three drawn figures: the four Ps around the target buyers, three nested levels of packaging, and a price band with cost as the floor, value to buyers as the ceiling and the other factors acting between; the rest are tables and flows.
- **Narration:** 4–56 words per slide (mean 40).

## Question bank (66 items, 113 marks)
| Type | Count |
|---|---|
| mcq | 28 |
| assertion-reason | 7 |
| true-false | 5 |
| fill-blank | 3 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| match | 2 |
| long (5 marks) | 4 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 7, d 7; **assertion-reason keys:** a b a c a c d.
- **Difficulty:** d1 6 · d2 30 · d3 29 · d4 1.
- **Competency:** recall 2 · understanding 28 · application 20 · analysis 15 · evaluation 1. Application or higher is **55% of items (65% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Competency balance.** Nine straight identify-the-type, identify-the-factor or identify-the-strategy MCQs were re-tagged from application to understanding, bringing application-or-higher into the 45–65 % band.
2. **Arithmetic.** The cost-plus figures (₹400 + ₹100 = ₹500; ₹1,200 + ₹300; ₹240 + ₹60) were checked by hand; no “=” chains appear in solutions.
3. **Price-band figure.** A stray arrow crossed the band and the side arrows were slanted; both were fixed after rendering.
4. **Assertion-reason keys** use all four ISC options, with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used; all prices are imagined.
- Pricing strategies are kept to meaning only, as the syllabus specifies; the 5-mark item asking students to choose between skimming and penetration (d4, evaluation) goes slightly beyond meaning, so a reviewer may want to confirm it is in scope.
