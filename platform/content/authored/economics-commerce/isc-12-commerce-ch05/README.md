# ISC Class 12 Commerce, Chapter 5 — Banking: Latest Trends

`isc-12-commerce-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 13 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch05_short` (20 marks, 50 min) and `t_isc12commerce_ch05_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch05/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: **RTGS, NEFT, IMPS and online demand drafts**; **e-banking** (features, advantages to customers and banks, disadvantages and safety); **mobile banking**; **ATMs, debit cards and credit cards** with their differences; and **digital banking, UPI and e-wallets** (meaning only, as the syllabus asks).
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every person, firm and case is imagined and labelled (Meher, Iqbal, Tenzing, Lalit, Fatima, Aarav, Rekha, Mr Banerjee, Mrs Tiwari; Lohargal Logistics, Kovalam Kayaks, Sanchi Sweets, Nongpoh Nurseries, Jhansi Jewellers, Dharwad Dairy Cooperative). An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Banking: Latest Trends; What you need for an electronic transfer; Quick check: IFSC; RTGS and NEFT: how they settle; RTGS, NEFT and IMPS compared; Quick check: round the clock; Worked example 1: choosing a method; Online demand drafts; E-banking; Worked example 2: spotting fraud; Quick check: the fake email; Summary of Part 1; Exam tips. Part 2 (13 slides): Mobile Banking, Cards and Digital Payments; Mobile banking; Quick check: the instant message; ATMs; Debit card or credit card?; Worked example 1: comparing the cards; Quick check: paying from savings; Digital banking, UPI and e-wallets; UPI moves money bank to bank; Quick check: the loaded app; Worked example 2: matching needs to tools; Summary of Part 2; Exam tips.
- **Visuals (20 of 26 slides):** flow 6, table 12, svg 2. Two drawn figures: RTGS one-by-one settlement against NEFT batches, and where the money comes from with a debit card and a credit card; the rest are tables and flows.
- **Narration:** 4–56 words per slide (mean 35).

## Question bank (62 items, 109 marks)
| Type | Count |
|---|---|
| mcq | 22 |
| assertion-reason | 7 |
| true-false | 6 |
| fill-blank | 4 |
| match | 2 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| long (5 marks) | 4 |
| case-based | 2 |

- **MCQ keys:** a 6, b 5, c 6, d 5; **assertion-reason keys:** a d a a a d c.
- **Difficulty:** d1 7 · d2 31 · d3 23 · d4 1.
- **Competency:** understanding 25 · application 16 · analysis 20 · evaluation 1. Application or higher is **60% of items (67% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Dated facts.** Every stem, table and note that uses a payment-system limit or timing carries an "as of 2026" note.
2. **Escaping.** Two appended items were damaged by shell escaping on the first build (parse error); they were repaired with exact edits before the clean build.

## For the reviewer: facts to check
- **Time-sensitive facts to confirm with the RBI before each session:** RTGS minimum ₹2 lakh, no RBI upper limit, 24x7 since 14 December 2020; NEFT 24x7 since 16 December 2019, settled in half-hourly batches, no RBI minimum or maximum; IMPS ₹5 lakh per transaction (raised in 2021).
- Credit-card interest-free periods, fees, card interest rates, UPI transaction limits and wallet limits are deliberately **not** stated, because they vary by bank and change over time.
- IMPS identification is described as mobile number with MMID, or account number with IFSC; UPI is described by UPI ID, mobile number and QR code.
