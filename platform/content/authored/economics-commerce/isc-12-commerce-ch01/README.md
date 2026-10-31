# ISC Class 12 Commerce, Chapter 1 — Business Environment

`isc-12-commerce-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 30 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch01_short` (20 marks, 50 min) and `t_isc12commerce_ch01_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch01/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: meaning, features and importance of business environment; **environmental scanning**; the **micro environment** (internal factors and the external micro factors: suppliers, customers, competitors, marketing intermediaries, financiers, public); the **macro environment** (economic, social, technological, political, legal, with the 1991 reforms as economic-environment changes); and **SWOT analysis** for a small Indian business.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person and case is imagined and labelled (Chinar Woollens, Pahadi Organics, Tamarind Tiffins, Lohit Tea Estate, Coromandel Cocoa, Zari Threads, Narmada Dairy Cooperative, Aravalli Stone Crafts, Sundarban Honey, Malwa Bakes, Shillong Bamboo Furniture, Kutch Salt Works, Sahyadri EV Scooters, Kosi Cane Crafts, Brahmaputra Boatworks, Kalimpong Kitchens); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on business environment. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Business Environment; What is business environment?; Features of business environment; Worked example 1: which feature?; Quick check: complexity; Why the environment matters; Opportunity or threat?; Quick check: uncertainty; Environmental scanning; Worked example 2: a scanning log; Quick check: scanning; Who scans, and how often?; Summary of Part 1; Exam tips. Part 2 (14 slides): Micro, Macro and SWOT; Internal factors; External micro factors; Quick check: inside or outside?; Micro versus macro; The macro environment; Economic policy changes since 1991; Worked example 1: classifying changes; Quick check: odd one out; SWOT analysis; Worked example 2: a simple SWOT; Quick check: a threat; Summary of Part 2; Exam tips.
- **Visuals (22 of 28 slides):** flow 5, svg 2, table 15. Two drawn figures: nested layers of the environment and a SWOT grid; the rest are tables and flows.
- **Narration:** 8–57 words per slide (mean 40).

## Question bank (65 items, 112 marks)
| Type | Count |
|---|---|
| mcq | 27 |
| assertion-reason | 6 |
| true-false | 5 |
| fill-blank | 4 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| match | 2 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 7, d 6; **assertion-reason keys:** a c b d a b.
- **Difficulty:** d1 8 · d2 31 · d3 25 · d4 1.
- **Competency:** recall 4 · understanding 20 · application 32 · analysis 9. Application or higher is **63% of items (69% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Answer leak.** A true/false solution repeated the SWOT figure caption word for word and was reworded.
2. **Word limit.** The 5-mark SWOT model answer was expanded to the 100–150-word range.
3. **Assertion-reason keys** use all four ISC options, with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- No time-sensitive figures are used. The 1991 reforms are described without dates or numbers beyond the year.
