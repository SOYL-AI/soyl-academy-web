# subject-producer — CBSE Class 12 Business Studies, hand-authored — 2026-10-29/30

Status: done. All 12 chapters of the 2026-27 syllabus are hand-authored, pass every gate and are committed, one commit per chapter.

Branch: `platform/subject-producer/cbse-12-business-studies`, based on `platform/main` a24f697. Hand-authored under D-025/D-026. Every item has `status: "draft"`. Family folder: `economics-commerce`.

## Timeline

- **Evening of 29 October:** ch01–ch06 were authored and passed the gates.
- **About 20:37 IST:** a session limit stopped work. The forks writing ch07–ch12 were cut off part-way.
- **About 01:30 IST on 30 October:** work resumed. ch01–ch06 were committed at once. The cut-off chapters were then finished, gated and committed one by one, as listed below.

## What changed

Each chapter is a new folder, `platform/content/authored/economics-commerce/cbse-12-business-studies-chNN/`, holding `README.md`, `release.json`, `tests.json` and `src/` (`lib.mjs`, `questions.mjs`, `build.mjs`).

- **Shared library:** `lib.mjs` is the CBSE 12 Economics authoring library. It is identical in every chapter and was committed first, with ch01.
- **Build:** run `npx tsx content/authored/economics-commerce/cbse-12-business-studies-chNN/src/build.mjs` from `platform/`. Edit `src/`, never the JSON.
- **What the build checks:** schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan and the editorial counts. If a build has errors, its output is parked as `*.wip.json` and never committed.
- **Figures:** every computed figure is asserted in `questions.mjs`. Examples: differential piece wages, manpower estimates, deviation from standard, EPS and trading on equity, T-bill discount, cost-plus price.
- **Case questions** follow the board pattern: an imagined business situation where the student names the concept and quotes the lines. Every case has an internal choice in part (c).

## Chapters

| Ch | Title | Commit | Decks (slides) | SVG on slides | Notes | Cards | Questions | Numericals | App.+ | Case-based |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 | Nature and Significance of Management | 058eaac | 18 + 17 | 4 | 6 | 28 | 67 | 1 | 54% | 5 |
| 02 | Principles of Management | 9a8286d | 20 + 19 | 3 | 7 | 32 | 77 | 2 | 58% | 4 |
| 03 | Business Environment | 918505f | 17 + 18 | 2 | 6 | 32 | 66 | 1 | 58% | 5 |
| 04 | Planning | aad99e5 | 18 + 19 | 2 | 6 | 30 | 72 | 1 | 57% | 5 |
| 05 | Organising | eda0539 | 19 + 20 | 4 | 6 | 30 | 76 | 0 | 51% | 5 |
| 06 | Staffing | e021a37 | 21 + 19 | 2 | 6 | 32 | 82 | 2 | 52% | 5 |
| 07 | Directing | 6cf0556 | 19 + 20 | 3 | 7 | 32 | 70 | 0 | 56% | 5 |
| 08 | Controlling | a3580df | 17 + 18 | 3 | 6 | 30 | 70 | 4 | 57% | 5 |
| 09 | Financial Management | c1e62ab | 18 + 20 | 5 | 6 | 32 | 82 | 6 | 50% | 5 |
| 10 | Financial Markets | 2ffe409 | 17 + 19 | 2 | 6 | 32 | 74 | 3 | 53% | 4 |
| 11 | Marketing Management | def770a | 20 + 21 | 2 | 6 | 30 | 77 | 3 | 58% | 5 |
| 12 | Consumer Protection | 6cc227b | 18 + 16 | 2 | 6 | 30 | 71 | 1 | 52% | 5 |
| **Total** | | | **24 decks, 448 slides** | 34 | 74 | 370 | **884** | 24 | | 58 |

"App.+" is the share of items at application or above. Every chapter is inside the lint band of 45–65%.

Every chapter has the following:
- **Decks:** two, each with a title slide and goals, 2–3 worked examples, 4 check slides pointing at objective items, a summary and exam tips. No more than 3 slides in a row lack a visual.
- **Questions:** all of mcq, assertion-reason, true-false, fill-blank, match, ordering, short (2 and 3 marks), long (5 marks) and case-based. Numericals appear where the topic has numbers.
- **Item fields:** each item has a marking scheme with step marks, topic ids from the syllabus, a difficulty level and a competency tag.
- **Tests:** two.
  - Short test: 20 marks in 40 minutes on `cbse-12-default-chapter-test-short`.
  - Long test: 40 marks in 90 minutes on `cbse-12-default-chapter-test-long`.
  - Both follow their blueprint item for item, including the internal-choice groups. The two tests share no questions, use no deck-check item, and Section D is case-based in both.

## How to verify (from `platform/`, each under `_tools/heavy.sh`)

```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 12 --subject business-studies --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```

Two gate runs:
- **20:29–20:31 IST:** ch01–ch06 only.
- **01:42–01:44 IST:** all 12 chapters. No chapter file changed after this run started, and every chapter was committed from exactly this state.

| Gate | Result of the 01:42 run |
|---|---|
| Content gate | 939/939 passed |
| Lint | ch01–ch12 each 0 errors, 0 warnings |
| Verify | 12 units, 884 questions, 0 blocking flags |
| Originality | 134 units, 0 errors |
| DB-6 split | 8/8 passed |
| API content test | 13/13 passed |

Rebuilding all 12 chapters afterwards prints NO ERRORS 12 times and leaves `git status` clean. `lib.mjs` is identical in all 12 chapters (md5 `34eaf98b…`).

## Scope decisions

- **Syllabus:** only the topics in `platform/catalog/cbse/12/business-studies/syllabus.yaml` are taught. ch03 leaves out the deleted topic "LPG as impact on business". Demonetisation is taught in ch03 as its own topic, in neutral wording.
- **Originality:** every firm, brand, person and figure is imagined and labelled as such. No real company case text and no real brand is used, and there are no statistics. No NCERT text, example or exercise and no board or sample-paper question is reused (D-036).
- **Stems:** generic case stems ("Read the passage and answer…") collided across chapters under `bank.duplicate`. Every stem now names its own firm or situation.
- **ch11 README:** the authoring fork for ch11 was cut off after its build passed but before it finished the README. The parent producer wrote the README from the build stats and a review of the items.

## Facts a reviewer should double-check (details in each chapter README)

- **ch12, commission money limits (please decide):** the chapter teaches the limits from the December 2021 rules: District Commission up to ₹50 lakh, State up to ₹2 crore, National above ₹2 crore. The Act as notified in 2020 set ₹1 crore and ₹10 crore, and some textbook printings still show those. Switching means changing `LIMIT_DISTRICT` and `LIMIT_STATE` in `ch12/src/questions.mjs` and the matching figures in `build.mjs`; the asserts flag every affected example.
- **ch12, other conventions:**
  - The value paid for the goods decides the commission, not the compensation claimed.
  - Appeal periods are 45, 30 and 30 days.
  - FSSAI is used in place of the older FPO mark.
  - Forum examples use households, not commercial buyers.
- **ch10:**
  - Treasury bills run 91, 182 and 364 days and are zero-coupon.
  - Commercial paper runs 15 days to one year; call money one to 15 days.
  - SEBI was set up in 1988 and became statutory in 1992.
  - The depositories named are NSDL and CDSL.
  - Settlement is described only as "a short rolling cycle of one working day".
- **ch09:**
  - Vindhya EPS is 2.025, shown as ₹2.03, with a tolerance of 0.01.
  - Debt is described as "cheaper but riskier".
  - The DSCR wording is as stated.
- **ch08:**
  - Percentage deviation is always taken on the standard.
  - Revising an unrealistic standard counts as a corrective action.
- **ch07:**
  - Perquisites and retirement benefits are classed as financial incentives.
  - Fear of a challenge to one's authority is classed as a personal barrier.
  - The formal networks taught are single chain, wheel, circular, free flow and inverted V.
  - Only 2 items are d4; the difficulty mix is easy-leaning.
- **ch06:**
  - Staffing is taught as eight steps, with placement and orientation as one step.
  - In selection, the medical examination comes after the selection decision.
  - Vestibule training is classed as off-the-job.
- **ch05:**
  - Accountability cannot be delegated.
  - Decentralisation is an optional policy.
- **ch04:**
  - A policy is identified by "where possible" wording; a rule by "must" wording plus a penalty.
  - A procedure is an order of steps; a method is how one step is done.
- **ch03:**
  - Demonetisation was announced on 8 November 2016 (₹500 and ₹1,000 notes), in neutral wording with no statistics.
  - LPG impact is not taught.
- **ch02:** "contingent" is taught as a separate feature from "flexible".
- **ch01:** AIMA's code is optional, and no licence is required to be a manager.

## Known gaps / follow-ups

- **SVG labels have not been seen rendered.** A script check found no label overflow or overlap, but they should still be looked at at 360 px, in light and dark mode, on staging.
- **Content:** items are `draft`. The content-verifier sample has not been done. There is no frozen test series for this subject yet (an assessment-designer step).

Decisions made: none beyond this note (no ADR; no shared file touched).
Needs from owner: none.
