# subject-producer — ISC Class 12 Commerce — 2026-10-31

Status: done. ISC 12 Commerce ch01–ch16 are hand-authored, gated and committed, one commit per chapter.
Branch: `platform/subject-producer/isc-12-commerce` (worktree `C:/Users/Prabhu/soyl-wt/content-isc12-commerce`, created from `platform/main` 0d8c7ac). Not pushed, not merged, not rebased.

## Style source (catalog)
- CISCE has published **no 2027 Commerce (857) specimen**, and its circular says the 2026 rubric applies. The pattern therefore comes from the **ISC 2026 Commerce specimen**, fetched from cisce.org on 2026-10-31 for pattern only.
  - It is recorded in `platform/catalog/sources/cisce.md`, anchors `isc-2026-specimen-papers` and `isc-2026-specimen-857-commerce`.
  - Commit a80ae31; this entry is already on `platform/main`, merged with the Economics entry.
- **Pattern used:**
  - Paper: 80 marks, 3 hours.
  - Section A has 1-mark items: case MCQs, P/Q/R/S statement-combination MCQs, assertion-reason, analogies, true/false, fill-in and identify-the-concept items.
  - Section B has 4-mark cases, Section C has 8-mark questions in parts, and some questions offer an internal choice.
- Chapter tests use the existing `isc-12-default-chapter-test-short` (20 marks, 50 min) and `-long` (40 marks, 100 min) blueprints, item for item.
- `npm run content -- catalog` gives 0 errors and 0 warnings.

## Authoring library
`src/lib.mjs` in each chapter is the CBSE 12 Business Studies library copied unchanged, with two exceptions:
- `DATE` is set to 2026-10-31.
- The assertion-reason options use the ISC wording, where (d) is "Both Assertion and Reason are false".

As a result, no item is designed to be "Assertion false, Reason true". Two drafts that paired a false assertion with a true reason (ch03, ch04) were rewritten.

## Chapters
Every chapter is in `platform/content/authored/economics-commerce/isc-12-commerce-chNN/` and contains:
- `release.json` and `tests.json`. The two tests are disjoint, and no deck-check item appears in a test.
- `README.md`, with scope, shape, bank statistics, the verifier pass and a list of facts for a reviewer.
- `src/`, with deterministic builders; a rebuild leaves the tree clean.

All items are `status: "draft"` with provenance `human`. Who authored what:
- ch01–ch05 by the subject-producer.
- ch06–ch10 by sub-agent A.
- ch11–ch16 by sub-agent B.

Both sub-agents worked under the same rules; the subject-producer reviewed their work and gated it.

| Chapter | Commit | Decks (slides) | Questions | Flashcards | Notes |
|---|---|---|---|---|---|
| ch01 Business Environment | dc93d16 | 2 (14 + 14) | 65 | 30 | 6 sections |
| ch02 Business Finance, Financial Planning and Capital | 4ce10e5 | 2 (14 + 16) | 69 | 30 | 5 sections |
| ch03 Long-term Sources of Funds for a Joint Stock Company | 637e814 | 2 (15 + 14) | 66 | 30 | 6 sections |
| ch04 Short-term Sources of Funds | ee2f24a | 2 (13 + 14) | 61 | 30 | 3 sections |
| ch05 Banking: Latest Trends | 31c3c63 | 2 (13 + 13) | 62 | 30 | 5 sections |
| ch06 Nature and Significance of Management | 1c7fa22 | 2 (14 + 15) | 62 | 30 | 6 sections |
| ch07 Principles of Management | b238237 | 2 (14 + 15) | 64 | 30 | 5 sections |
| ch08 Planning | 631cf4e | 2 (13 + 14) | 63 | 29 | 5 sections |
| ch09 Organising | 083f388 | 2 (14 + 15) | 63 | 28 | 5 sections |
| ch10 Staffing | d89bbb9 | 2 (14 + 15) | 62 | 28 | 4 sections |
| ch11 Directing | fec026c | 2 (15 + 14) | 66 | 30 | 5 sections |
| ch12 Controlling and Coordination | e5863e4 | 2 (13 + 15) | 64 | 27 | 4 sections |
| ch13 Marketing: Concept and Functions | cc1bd06 | 2 (16 + 14) | 65 | 30 | 5 sections |
| ch14 Marketing Mix: Product and Price | 92b78a3 | 2 (13 + 16) | 66 | 30 | 5 sections |
| ch15 Marketing Mix: Place and Promotion | d8c48ad | 2 (13 + 13) | 63 | 29 | 4 sections |
| ch16 Consumer Protection | 739502b | 2 (13 + 14) | 67 | 28 | 5 sections |

**Totals:** 16 chapters, 1,028 questions, 32 decks and 32 chapter tests.

**Bank shape.** Every chapter has:
- at least 7 two-mark short answers, 8 three-mark short answers and 4 five-mark long answers;
- at least 4 assertion-reason items;
- at least one difficulty-4 item;
- between 54% and 63% of items at application or higher (lint band 45–65%).

**Originality**
- The overlap with CBSE 12 Business Studies is in management, marketing, consumer protection and financial management. Every ISC chapter uses fresh imagined firms, people and set-ups, all labelled, and every stem is content-specific.
- An exact-stem check (`scratchpad/isc-com/stemdup.cjs`) against every authored bank found no duplicates.
- `originality --authored` reports 0 errors.
- The finance chapters use their own figures, all computed and asserted in the build:
  - EPS plans (₹1.5 and ₹2.25; tie at EBIT ₹4 lakh);
  - net working capital ₹3,80,000;
  - bonus and rights ratios;
  - cumulative arrears;
  - after-tax cost of debentures 6.75%;
  - bill discount, factoring and flat-rate instalment sums.

**Visuals.** Every drawn SVG was rendered and checked, and layout faults were fixed: ch02's chart peak was moved to the festival months, and labels were moved in ch04, ch09, ch12, ch14 and ch16.

## How to verify
From `platform/` in the worktree. This run used `_tools/heavy.sh` with `scratchpad/isc-com/gates.sh`, started 04:19 and finished 04:24 IST on 2026-11-01, with ch01–ch16 present.
```
npm test -w @soyl/content-templates            # Tests 1863 passed (1863)
npm run content -- catalog                     # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars            # ok isc-12-commerce-ch01..ch16: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 12 --subject commerce --authored
                                               # 16 unit(s), 1028 questions, 0 blocking flag(s); every unit 0 blocking + 0 minor
npm run content -- verify --board cbse --class 12 --subject business-studies --authored   # unchanged: 12 units, 884 questions, 0 blocking
npm run content -- originality --authored      # 266 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # 8 passed
npx vitest run --root api test/content.test.ts    # 13 passed
```
ch01, ch06 and ch11 also passed an earlier full gate run (2026-10-31, about 23:52 IST). After the last gate run, every chapter was rebuilt with `npx tsx content/authored/economics-commerce/isc-12-commerce-chNN/src/build.mjs`; the output was byte-identical and no `*.wip.json` files were left.

## Time-sensitive facts for a reviewer
Each fact is also listed in its chapter README.
- **ch05 Banking.** Every use carries an "as of 2026" note.
  - RTGS: minimum ₹2 lakh, no RBI upper limit, 24x7 since 14 December 2020.
  - NEFT: 24x7 since 16 December 2019, settled in half-hourly batches, with no RBI minimum or maximum.
  - IMPS: ₹5 lakh per transaction.
  - Not stated on purpose: card fees, interest-free periods, card interest rates, UPI limits and wallet limits.
- **ch16 Consumer Protection.**
  - CPA 2019 pecuniary limits as notified in December 2021: District up to ₹50 lakh; State above ₹50 lakh and up to ₹2 crore; National above ₹2 crore. They are based on the value paid as consideration and appear in 19 items, both decks, the notes and the flashcards.
  - The 1986 comparison: ₹20 lakh and ₹1 crore, based on value plus the compensation claimed.
  - CCPA penalties for misleading advertisements: up to ₹10 lakh, and up to ₹50 lakh for a subsequent contravention.
  - Given without detail on purpose: filing time limits, the e-filing portal name and the period for which an endorser can be barred.
- **ch03.** These Companies Act, 2013 rules are stated without section numbers:
  - only redeemable preference shares may be issued, normally within 20 years;
  - preference shareholders get full voting rights once their dividend has been unpaid for two years;
  - sweat equity is issued for know-how or intellectual property.
  - Bearer debentures are kept as a textbook category.
- **ch04.** No current deposit ceilings or rates are stated; all rates are imagined round numbers.
- **Textbook-variant choices** a reviewer may want to align with the class textbook:
  - ch07 teaches five Taylor principles, as the syllabus does.
  - ch11 uses four groups of communication barriers.
  - ch13's market classifications may differ between textbooks.
  - ch14 includes a 5-mark skimming-versus-penetration evaluation.
  - ch15 uses "publicity" as the fourth promotion element; the class textbook may say "public relations".

## Known gaps / follow-ups
- Narration audio (TTS) has not been generated, as with the other hand-authored subjects.
- Paper II (project work, 20 marks) is out of scope.
- From the ISC 2028 cohort, CISCE renames this subject Business Studies (857). The catalog note already records this; no change is needed for 2026–27.

## Decisions made
- The 2026 Commerce specimen is used for style because no 2027 specimen exists (see `sources/cisce.md`).
- No ADR is needed: there are no changes outside content and catalog paths.

## Needs from owner
None.
