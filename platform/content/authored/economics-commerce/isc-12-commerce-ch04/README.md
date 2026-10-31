# ISC Class 12 Commerce, Chapter 4 — Short-term Sources of Funds

`isc-12-commerce-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 14 slides), notes (3 sections), 30 flashcards, 61 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch04_short` (20 marks, 50 min) and `t_isc12commerce_ch04_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch04/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ISC syllabus topics: short-term assistance from **commercial banks** (overdraft, cash credit, short-term loans, discounting of bills); **public deposits, trade credit and customer advances**; and **factoring, inter-corporate deposits and instalment credit**.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person, figure and case is imagined and labelled (Malabar Spice Traders, Kolar Kraft Papers Ltd, Ganjam Garments Ltd, Amravati Auto Parts Ltd, Champaran Chemicals Ltd, Kalinga Cables Ltd, Tirupur Tees Ltd, Sundergarh Steel Ltd, Bundi Bangles, Pindari Provisions, Bharuch Boilers Ltd, Mysuru Silk House, Bastar Bell Metal Crafts). An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Short-term Sources of Funds; Why short-term funds?; Four forms of bank assistance; Quick check: drawing beyond the balance; Worked example 1: cash credit or loan?; Quick check: security for cash credit; Discounting a bill; Worked example 2: how much cash now?; Bank finance: for and against; Public deposits; Quick check: public deposits; Summary of Part 1; Exam tips. Part 2 (14 slides): More Short-term Sources; Trade credit and customer advances; Quick check: paying the supplier later; Worked example 1: who finances whom?; How factoring works; Worked example 2: cash from factoring; Quick check: factoring; Inter-corporate deposits; Instalment credit; Worked example 3: the monthly instalment; Quick check: paying over time; Choosing a short-term source; Summary of Part 2; Exam tips.
- **Visuals (21 of 27 slides):** flow 4, table 15, svg 2. Two drawn figures: a bill-discounting timeline and a factoring triangle; the rest are tables and flows.
- **Narration:** 6–55 words per slide (mean 37).

## Question bank (61 items, 111 marks)
| Type | Count |
|---|---|
| mcq | 21 |
| assertion-reason | 4 |
| true-false | 5 |
| fill-blank | 4 |
| numerical | 4 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| match | 2 |
| case-based | 2 |

- **MCQ keys:** a 5, b 4, c 6, d 6; **assertion-reason keys:** a a a d.
- **Difficulty:** d1 3 · d2 27 · d3 30 · d4 1.
- **Competency:** understanding 23 · application 18 · analysis 20. Application or higher is **62% of items (76% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Figures** are computed in the build and asserted: bill discount ₹6,000 on ₹2 lakh for three months at 12 per cent (cash ₹1,94,000); cash-credit saving ₹4,000 for a month; factoring cash ₹7,80,000 on ₹10 lakh; instalment ₹36,000 (flat interest).
2. **Assertion-reason.** A draft item paired a false assertion with a true reason; it was rewritten (both true, key a).
3. **Competency balance** brought from 70% to 62% by re-tagging five identify-the-source items; **SVG labels** moved after rendering so no arrow crosses text.

## For the reviewer: facts to check
- No current interest rates, deposit ceilings or regulatory limits are stated. Public deposits are described as short-term and subject to legal limits, without the current period or ceiling under the deposit rules; a reviewer may add a dated note if the board expects one.
- Instalment interest is computed on a **flat** basis for simplicity; the item says so.
