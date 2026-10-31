# ISC Class 12 Commerce, Chapter 3 — Long-term Sources of Funds for a Joint Stock Company

`isc-12-commerce-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 14 slides), notes (6 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch03_short` (20 marks, 50 min) and `t_isc12commerce_ch03_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch03/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics: **equity shares** (features, advantages, disadvantages); **preference shares** and their types, with equity versus preference; **bonus shares, rights issue, ESOP, sweat equity and QIP**, with bonus versus rights; **retained earnings**; **debentures** and their kinds, with shares versus debentures; and **loans from commercial banks and financial institutions**.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person, figure and case is imagined and labelled (Periyar Polymers Ltd, Sutlej Seeds Ltd, Mahi Motorcycles Ltd, Netravati Networks Ltd, Krishna Kitchenware Ltd, Bhadra Batteries Ltd, Hooghly Hosiery Ltd, Rann Renewables Ltd, Pushkar Prints Ltd, Wardha Wires Ltd, Indravati Infra Ltd, Satpura Ceramics Ltd). An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Long-term Sources of Funds for a Company; Owners' funds and borrowed funds; Equity shares: features; Equity: for and against; Quick check: equity and borrowing; Preference shares and their types; Worked example 1: cumulative arrears; Quick check: shares that change; Equity versus preference; Five special ways of issuing shares; Bonus versus rights; Worked example 2: counting bonus and rights shares; Quick check: rewarding know-how; Summary of Part 1; Exam tips. Part 2 (14 slides): Retained Earnings, Debentures and Loans; Retained earnings; Worked example 1: how much is ploughed back?; Quick check: ploughing back; Debentures and their kinds; Debentures: for and against; Worked example 2: after-tax cost of debentures; Quick check: do lenders vote?; Shares versus debentures; Loans from banks and financial institutions; Quick check: keeping plans private; Choosing a long-term source; Summary of Part 2; Exam tips.
- **Visuals (23 of 29 slides):** flow 5, svg 2, table 16. Two drawn figures: a tree of owners' and borrowed long-term funds, and bonus-versus-rights cash flows; the rest are tables and flows.
- **Narration:** 6–59 words per slide (mean 38).

## Question bank (66 items, 114 marks)
| Type | Count |
|---|---|
| mcq | 24 |
| assertion-reason | 6 |
| true-false | 5 |
| fill-blank | 3 |
| short (2 marks) | 7 |
| short (3 marks) | 8 |
| numerical | 5 |
| match | 2 |
| long (5 marks) | 4 |
| case-based | 2 |

- **MCQ keys:** a 6, b 6, c 6, d 6; **assertion-reason keys:** a c a d c a.
- **Difficulty:** d1 5 · d2 34 · d3 26 · d4 1.
- **Competency:** understanding 25 · application 22 · analysis 19. Application or higher is **62% of items (69% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Figures** are computed in the build and asserted: bonus 2:5 on 500 shares = 200; rights 1:4 on 400 shares at ₹60 = ₹6,000; cumulative 8 per cent arrears for three years on ₹10 lakh = ₹2,40,000; after-tax cost of 9 per cent debentures at 25 per cent tax = 6.75 per cent; retained earnings ₹30 lakh.
2. **Assertion-reason.** A draft item paired a false assertion with a true reason, which has no ISC option; it was rewritten so both are false (key d).
3. **Word limit** of one 3-mark model answer expanded; **competency balance** brought from 67% to 62% by re-tagging three recall-style items.

## For the reviewer: facts to check
- **Companies Act, 2013 rules stated as stable facts:** only redeemable preference shares may be issued, normally within twenty years (longer for some infrastructure projects; not stated); preference shareholders vote on all resolutions once their dividend is unpaid for two years or more; sweat equity is issued at a discount or for know-how, intellectual property or value addition. A reviewer should confirm these against the current Act.
- **Bearer debentures** are kept as a textbook category (registered versus bearer); in practice Indian debentures are now issued in registered or dematerialised form. A reviewer may add a note if the board's current textbooks drop the category.
- **QIP** is described as a placement by a listed company with qualified institutional buyers, without SEBI regulation detail or limits.
