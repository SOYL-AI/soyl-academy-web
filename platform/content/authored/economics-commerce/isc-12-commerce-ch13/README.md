# ISC Class 12 Commerce, Chapter 13 — Marketing: Concept and Functions

`isc-12-commerce-ch13` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 14 slides), notes (5 sections), 30 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch13_short` (20 marks, 50 min) and `t_isc12commerce_ch13_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch13/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics: **market** (meaning as actual and potential buyers; types by area, by time and by nature of goods) and **marketing** (meaning and features); the **traditional** (production, product, selling) and **modern** (marketing, societal marketing) concepts and **marketing versus selling**; the **objectives** of marketing and its **importance** to firms, consumers and society; and the **functions** of marketing (market research, buying, assembling, standardisation, grading, storage, transport, financing, risk bearing, selling), grouped as exchange, physical supply and facilitating functions.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Gandhsar Attars, Kanch Kala Bangles, Purna Cotton Ginners, Kasauli Hill Mushrooms, Ekamra Electronics, Tapi Banana Ripeners, Hasdeo Roofing, Athangudi Tile Works, Gaula Furniture Mart, Mandovi Bakeries, Andaman Coconut Products, Mahananda Mango Exports, Mithila Makhana Co., Varuna Carpet Weavers, Burhi Gandak Litchi Farms, Kanchenjunga Tea Traders, Krishna Raisin Traders, Garo Hills Ginger Growers, Bidri Art Works, Kirti Durg Weaves); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on marketing. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Marketing: Concept and Functions; What is a market?; Types of market; Markets by time; Worked example 1: classify the market; Quick check: is a market a place?; Marketing and its features; Quick check: market by area; Concepts of marketing; Comparing the concepts; Worked example 2: name the concept; Quick check: which concept?; Marketing versus selling; Differences at a glance; Summary of Part 1; Exam tips. Part 2 (14 slides): Objectives, Importance and Functions; Objectives of marketing; Importance of marketing; Worked example 1: who gains?; Quick check: who benefits?; Following the goods; Three groups of functions; Standardisation and grading; Quick check: sorting produce; Storage, transport, financing and risk; Worked example 2: functions in a case; Quick check: which utility?; Summary of Part 2; Exam tips.
- **Visuals (24 of 30 slides):** flow 6, table 16, svg 2. Two drawn figures: a tree of market types (by area, time and nature of goods) and a bar showing that selling is one link in the marketing chain from needs to after-sales service; the rest are tables and flows.
- **Narration:** 5–55 words per slide (mean 38).

## Question bank (65 items, 113 marks)
| Type | Count |
|---|---|
| mcq | 27 |
| assertion-reason | 6 |
| true-false | 4 |
| fill-blank | 4 |
| match | 2 |
| short (2 marks) | 8 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 7, d 6; **assertion-reason keys:** a b c a a d.
- **Difficulty:** d1 6 · d2 32 · d3 26 · d4 1.
- **Competency:** recall 3 · understanding 27 · application 25 · analysis 10. Application or higher is **54% of items (61% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Marking scheme.** A 5-mark item used half-mark steps; it was re-split into whole-mark steps that add up to 5.
2. **Difficulty.** The bank had no difficulty-4 item; the product-concept case (identify, explain the failure, suggest a concept) was raised to d4 analysis.
3. **Competency balance.** Seven straight identify-the-type items were re-tagged from application to understanding, bringing application-or-higher into the 45–65 % band.
4. **Assertion-reason keys** use all four ISC options, with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used; all content is stable textbook concepts.
- Classification of markets by time and by nature of goods varies between textbooks (some add a secular period, or regional and commodity sub-types); this chapter uses very short, short and long period, and produce, manufactured goods, bullion and stock markets, and the notes say that some books add a secular period.
