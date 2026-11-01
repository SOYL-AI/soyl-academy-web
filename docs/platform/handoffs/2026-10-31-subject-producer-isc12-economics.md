# subject-producer — ISC Class 12 Economics, ch01–ch20 hand-authored — 2026-10-31 / 11-01

Status: done. All 20 chapters of `platform/catalog/cisce/isc-12/economics/syllabus.yaml` (ISC 2027, Class XII) are hand-authored, pass every gate and are committed, one commit per chapter.

Branch: `platform/subject-producer/isc-12-economics`, based on local `platform/main` a24d1f5. `platform/main` was merged in on 1 November (72be07f and later, keeping both specimen entries in `catalog/sources/cisce.md`). Hand-authored under D-025/D-026; every item has `status: "draft"`; family folder `economics-commerce`.

Session limits cut work off twice (about 00:00 and 05:00 IST on 1 November). Each chapter was committed only after a full gate run that started after its last file change. At most two chapter sub-agents ran at a time, and scripts lived in the private `scratchpad/isc-econ/`.

## Pattern and scope

- **ISC 2027 Economics specimen (856):** fetched from cisce.org on 31 October for **pattern only**; no question, table or answer is reused (D-036). It is recorded as `isc-2027-specimen-856-economics` in `platform/catalog/sources/cisce.md` (commit a2299b9).
  - 80 marks in three sections: A has 16 one-mark items (MCQs on diagrams, tables and dated extracts; assertion-reason; very short answers), B has eight 4-mark questions (2 + 2), and C has four 8-mark questions (4 + 4).
  - Internal choice in three questions of B and two of C.
  - Every subpart carries a cognitive tag.
- **Assertion-reason options:** ISC's option (d) reads "Both Assertion and Reason are false", unlike CBSE's "A false, R true". The shared lib uses the ISC options.
- **Tests:** each chapter has two tests, as instructed. Both use the **isc-12-default** blueprints: short (20 marks, 50 min) and long (40 marks, 100 min), with 1/2/3/5-mark slots, item for item including the internal-choice groups, disjoint, and with no deck-check items.
- **Blueprint mismatch:** the specimen's own marks are 1/4/8. Every bank therefore also carries **two to three 4-mark (2 + 2) and two 8-mark (4 + 4) items in ISC paper style**, outside the tests, ready for a subject-specific blueprint. **Suggestion:** add `isc-12-economics-chapter-test-*` blueprints with 1/4/8 marks (catalog owner).
- **Syllabus:** followed exactly, including micro (demand, utility, indifference curves, elasticity, supply, market mechanism, production, costs, revenue, market forms) and macro (income determination, money, banking, BoP, fiscal policy, budget, circular flow, national income).
- **Removed topics honoured:**
  - only the assumptions of the Law of DMU, not its criticisms;
  - numericals for elasticity of demand on the percentage method only;
  - the Law of Variable Proportions schedule not tested; returns to scale as meaning only;
  - cost-curve derivations as concepts only;
  - no diagram for long-run equilibrium under perfect competition; monopsony as meaning only;
  - money-supply measures as meanings only;
  - no diagrams of demand-pull or cost-push inflation.
- **Data:** all figures are imagined Indian scenarios, labelled as such, and every computed figure is asserted in `questions.mjs`. There are no current statistics: no repo, CRR or SLR values, no budget or BoP figures and no tax slabs. Real firms are never named.
- **Stems:** every stem is specific to its content. Each chapter passed the lib's build-time exact-stem check and a 5-gram near-duplicate scan using the gate's own rule against the whole repo (about 22,000 stems), including SOYL's CBSE 12 Economics.

## Build

- **Shared library:** `isc-12-economics-ch01/src/lib.mjs`, imported by every chapter. It is a copy of the CBSE 12 Computer Science lib with ISC assertion-reason options, and it includes the economics item builders, the `Svg` chart builder, the originality pre-check and `*.wip.json` parking.
- **Diagrams:** demand, supply, IC, cost, revenue, AD–AS, BoP and circular-flow figures are theme-coloured SVG computed from their equations. Every chapter passed the SVG label overflow and overlap check.
- **Build command:** `npx tsx content/authored/economics-commerce/isc-12-economics-chNN/src/build.mjs` from `platform/`. Edit `src/`, never the JSON.

## Chapters

| Ch | Title | Commit | Decks | Cards | Questions (marks) | 4-/8-mark bank items | App.+ |
|---|---|---|---|---|---|---|---|
| 01 | Theory of Demand | 1fe80b5 | 17 + 17 | 30 | 75 (156) | 2/2 | 56% |
| 02 | Consumer Behaviour: Cardinal Utility Analysis | 30e1994 | 17 + 18 | 30 | 73 (151) | 2/2 | 59% |
| 03 | Consumer Behaviour: Indifference Curve Analysis | bff6375 | 18 + 18 | 30 | 77 (160) | 2/2 | 58% |
| 04 | Elasticity of Demand | b189df8 | 19 + 18 | 30 | 75 (167) | 3/2 | 59% |
| 05 | Theory of Supply and Elasticity of Supply | 6a556f3 | 16 + 17 | 30 | 76 (163) | 3/2 | 59% |
| 06 | Market Mechanism: Equilibrium Price and its Applications | 7c55c14 | 19 + 16 | 30 | 72 (153) | 2/2 | 57% |
| 07 | Production Function and Law of Variable Proportions | 1099760 | 17 + 18 | 30 | 74 (158) | 3/2 | 54% |
| 08 | Concepts of Cost | 7865e2e | 16 + 16 | 30 | 77 (162) | 3/2 | 58% |
| 09 | Revenue and Producer's Equilibrium | 85c6759 | 17 + 16 | 30 | 74 (158) | 3/2 | 57% |
| 10 | Market Forms and Equilibrium of a Firm under Perfect Competition | 991bc3f | 16 + 16 | 30 | 73 (150) | 2/2 | 56% |
| 11 | Aggregate Demand, Consumption and Saving | 939d17f | 16 + 17 | 30 | 73 (152) | 3/2 | 55% |
| 12 | Equilibrium Output, Multiplier and Problems of Demand | d4216de | 18 + 16 | 30 | 78 (158) | 3/2 | 58% |
| 13 | Money and Inflation | 21f9da3 | 18 + 18 | 30 | 77 (162) | 3/2 | 55% |
| 14 | Commercial Banks and the Central Bank | fa57cb8 | 18 + 18 | 30 | 76 (158) | 2/2 | 58% |
| 15 | Balance of Payments and Foreign Exchange Rate | ccd9800 | 16 + 17 | 30 | 73 (159) | 3/2 | 58% |
| 16 | Fiscal Policy | b686627 | 18 + 17 | 30 | 79 (160) | 3/2 | 52% |
| 17 | Government Budget and Deficits | d426c8b | 18 + 16 | 30 | 76 (160) | 2/2 | 58% |
| 18 | Circular Flow of Income | d5d9145 | 17 + 17 | 30 | 74 (159) | 3/2 | 57% |
| 19 | National Income Aggregates | 12417b0 | 17 + 17 | 30 | 77 (158) | 2/2 | 57% |
| 20 | Measurement of National Income | 732e5ec | 17 + 17 | 30 | 72 (152) | 3/2 | 57% |
| **Total** | | | **40 decks, 685 slides** | 600 | **1,501 (3,156)** | | |

"App.+" is the share of items at application or above. Every chapter is inside the lint band of 45–65%.

Every chapter has the following:
- **Notes:** 6 sections.
- **Decks:** each with 2–3 worked examples and 3–4 check slides.
- **Questions:** at least 22 MCQs and 5–7 ISC assertion-reason items, plus true-false, fill-blank, numerical, match, ordering, short (2/3/4 marks), long (5/8 marks) and 2–3 case-based items with internal choice.

## Gates (from `platform/`, each under `_tools/heavy.sh`)

`npm test -w @soyl/content-templates`; `npm run content -- catalog`; `npm run content -- lint --exemplars`; `npm run content -- verify --board cisce --class 12 --subject economics --authored`; `npm run content -- originality --authored`; `npx vitest run --root db test/db6-split.test.ts`; `npx vitest run --root api test/content.test.ts`.

| Run (IST) | Chapters committed after it | Content gate | Catalog | Lint | Verify | Originality | DB-6 | API |
|---|---|---|---|---|---|---|---|---|
| 31 Oct 23:20 | ch01–ch02 (+ the specimen source entry) | 1765/1765 | 0 errors | 0/0 | 0 blocking | 252 units, 0 errors | 8/8 | 13/13 |
| 31 Oct 23:33 | ch03–ch04 | 1779/1779 | 0 errors | 0/0 | 0 blocking | 254 units, 0 errors | 8/8 | 13/13 |
| 1 Nov 03:47 (after the merge) | ch05–ch07 | 2066/2066 | 0 errors | 0/0 | 0 blocking | 295 units, 0 errors | 8/8 | 13/13 |
| 1 Nov 04:02 | ch08–ch10 | 2080/2080 | 0 errors | 0/0 | 0 blocking | 297 units, 0 errors | 8/8 | 13/13 |
| 1 Nov 04:15 | ch11–ch12 | 2094/2094 | 0 errors | 0/0 | 0 blocking | 299 units, 0 errors | 8/8 | 13/13 |
| 1 Nov 04:24 | ch13–ch14 | 2108/2108 | 0 errors | 0/0 | 0 blocking | 301 units, 0 errors | 8/8 | 13/13 |
| 1 Nov 04:34 | ch15–ch16 | 2122/2122 | 0 errors | 0/0 | 0 blocking | 303 units, 0 errors | 8/8 | 13/13 |
| 1 Nov 07:23 | ch17–ch20 | 2150/2150 | 0 errors | 0/0 | 20 units, 1,501 questions, 0 blocking, 0 minor | 307 units, 0 errors | 8/8 | 13/13 |

"Lint 0/0" means 0 errors and 0 warnings in every chapter.

## Facts and conventions a reviewer should check (details in each chapter README)

- **ch01:** inferior-good examples are framed as true for the families in the item, not universally.
- **ch04:** Ed is computed from the original values with the minus sign dropped, and every solution says so.
- **ch07:** Stage I ends where AP is at its maximum (AP = MP). Some ISC texts end it at the point of inflexion; the chapter notes both, and no question depends on the choice.
- **ch08:** the cost curves are continuous, while the schedule items use discrete MC.
- **ch09–ch10:** when profit ties in a schedule, the equilibrium is the output where MR = MC with MC rising.
- **ch13:** M0–M4 are the classic RBI definitions taught for ISC.
- **ch14:** the bank rate is described the textbook way, and reverse repo is taught because the syllabus names it, although the RBI now uses an SDF. High-powered money is currency with the public plus banks' reserves.
- **ch15:** interest on a foreign loan is a current account item and repaying it is a capital account item. Exchange rates are imagined rupees per US dollar.
- **ch16:** the only dated fact is GST from 1 July 2017. Debt-redemption items ignore interest, and each stem says so.
- **ch17:** a Union grant to a State is revenue spending for the Union and a revenue receipt for the State.
- **ch19–ch20:**
  - Interest on national debt is a transfer.
  - Interest-free loans to staff are not income.
  - Employers' social-security contributions count as compensation of employees.
  - National disposable income = NNP at market price + net current transfers from abroad.

## Known gaps / follow-ups

- **Blueprint (catalog owner):** an ISC Economics subject blueprint with the specimen's 1/4/8 marks would let the bank's ISC paper-style items be used in tests.
- **Rendering has not been checked.** Nobody has looked at the SVG labels at 360 px in light and dark mode on staging; the circular-flow, cost-curve and shift diagrams are the densest.
- **Content:** items are `draft`. The content-verifier sample has not been done. There is no frozen test series yet.

Decisions made: none beyond this note (no ADR). Shared files touched: `platform/catalog/sources/cisce.md` (the specimen entry, as the brief asked).
Needs from owner: none.
