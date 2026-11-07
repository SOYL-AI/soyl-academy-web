# subject-producer — CBSE Class 11 Accountancy, hand-authored chapters — 2026-11-05 to 2026-11-08

Status: done. All 9 syllabus chapters (ch01–ch09) are committed, each after a fully green gate run.

**Branch:** `platform/subject-producer/cbse-11-accountancy`, worktree `C:/Users/Prabhu/soyl-wt/content-cbse11-accountancy`.
- Main was merged in on 2026-11-07 (72f2a9e), which includes a1ae318, the API hook timeout of 900 s.
- Not pushed or merged by me.

**Writers (D-050):** every chapter was written by **Sonnet 5.5** sub-agents, at most two at a time. Opus (this agent) built the shared accounting helpers, reviewed, gated and committed. The Opus quality fallback was **not needed**.
- Usage limits stopped the first writers of ch03, ch04 and ch09 partway through.
- In each case a second Sonnet writer read the source files against the brief, fixed what was wrong and finished the chapter. What they changed is recorded in each chapter's README and below.

## What changed
- **Chapter files:** each chapter is in `platform/content/authored/economics-commerce/cbse-11-accountancy-chNN/`, with `release.json`, `tests.json`, `README.md` and `src/`.
- **Shared library** (committed with ch01): `cbse-11-accountancy-ch01/src/lib.mjs`. It is the CBSE 11 Political Science lib, which is the CBSE 12 Accountancy/Economics lib plus the build-time exact-stem originality pre-check and a semantic `verdict` for assertion-reason items.
- **Shared accounting helpers** (written by Opus): `cbse-11-accountancy-ch01/src/acc.mjs`.
  - **From CBSE 12 Accountancy ch01:** the core asserts, Indian formatting, number words and Markdown tables.
  - **New for Class 11:**
    - `equation` (asserts Assets = Liabilities + Capital after every step)
    - `journal` (every entry balances)
    - `ledger` / `post` (accounts close with c/d and b/d)
    - `trialBalance` / `trialFromLedgers` (totals agree)
    - `brs` (reaches the other book's balance)
    - `slm` / `schedule` / `onSale` (depreciation, including part years)
    - `trading` / `profitLoss` / `balanceSheet` (the balance sheet balances)
    - `gst` (imagined rate, CGST/SGST split)
  - Self-checks run on import.
- **Chapter-specific helpers,** each asserting its own invariants:
  - ch04 `books.mjs`: cash book, petty cash, subsidiary books.
  - ch05 `recon.mjs`: textbook layout of the BRS starting from an overdraft, still asserted through `brs()`.
  - ch06 `extra.mjs`: error model, suspense account, effect on profit.
  - ch07 `extra.mjs`: asset fleet, provision method and asset disposal account.
  - ch09 `adj.mjs`: each adjustment's two effects, every trial-balance item used once, and the balance sheet balancing after adjustments.
- **Figures are computed:** every figure in every chapter comes from these helpers, using imagined firms and data. GST uses an imagined rate stated in each problem. No real rate, company or person appears.
- **Blueprints:** the subject's own blueprints are annual and half-yearly only, so the chapter tests use the class defaults: `cbse-11-default-chapter-test-short` (20 marks, 40 minutes) and `-long` (40 marks, 90 minutes).
  - The two tests share no item and use no deck-check or `num` item.
- **Status:** all items are `status: "draft"`, provenance `human` (D-025/D-026).

| Chapter | Commit | Writer | Slides | Notes | Flashcards | Questions (num) | App+ |
|---|---|---|---|---|---|---|---|
| ch01 Introduction to Accounting (+ lib, acc.mjs) | 11e56c4 | Sonnet 5.5 | 20 + 22 | 7 | 31 | 80 (6) | 59% |
| ch02 Theory Base of Accounting | 0a4e6d2 | Sonnet 5.5 | 19 + 21 | 6 | 31 | 78 (8) | 59% |
| ch03 Recording of Transactions – I | (060ebb3) | Sonnet 5.5 (two writers) | 18 + 22 | 6 | 34 | 78 (10) | 50% |
| ch04 Recording of Transactions – II: Special Purpose Books | (8a7e871) | Sonnet 5.5 (two writers) | 19 + 21 | 6 | 31 | 76 (10) | 57% |
| ch05 Bank Reconciliation Statement | (d1d5dec) | Sonnet 5.5 | 19 + 22 | 6 | 31 | 79 (11) | 57% |
| ch06 Trial Balance and Rectification of Errors | (68776cc) | Sonnet 5.5 | 19 + 22 | 7 | 33 | 76 (11) | 55% |
| ch07 Depreciation, Provisions and Reserves | (e0da685) | Sonnet 5.5 | 21 + 22 | 7 | 33 | 79 (12) | 48% |
| ch08 Financial Statements – I | (baadc89) | Sonnet 5.5 | 20 + 21 | 7 | 33 | 76 (12) | 58% |
| ch09 Financial Statements – II | (c3c49ec) | Sonnet 5.5 (two writers) | 19 + 22 | 6 | 31 | 78 (14) | 59% |

**Totals:** 9 chapters, 369 slides, 288 flashcards, 700 questions (94 of them numerical). Application-or-above runs from 48% to 59%.

## How to verify
From `platform/` in the worktree, run one at a time, with heavy gates via `_tools/heavy.sh`:
```
npm test -w @soyl/content-templates
npm run content -- catalog                         # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars                # ok for all 9 cbse-11-accountancy chapters, 0/0
npm run content -- verify --board cbse --class 11 --subject accountancy --authored   # 9 units, 0 blocking
npm run content -- originality --authored          # 0 error(s)
npx vitest run --root db test/db6-split.test.ts    # 8/8
npx vitest run --root api test/content.test.ts     # 13/13
```
- Rebuild a chapter with `npx tsx content/authored/economics-commerce/cbse-11-accountancy-chNN/src/build.mjs`; it prints `NO ERRORS`.
- Writers confirmed byte-identical output across 3 builds.
- Importing `acc.mjs` runs its self-checks.

### Gate runs
| Run | Started (IST) | Covered | Result |
|---|---|---|---|
| g1 | 2026-11-05 09:29 | ch01–03 (ch03 partial) | fully green → ch01, ch02 committed |
| g2 | 2026-11-07 10:40 | ch01–06 | all green except the API content test, which hit its 180 s setup timeout. That was a platform issue, fixed by a1ae318 on main. Nothing was committed on g2. |
| g3 | 2026-11-08 | ch01–08, after merging main | → ch03–ch08 |
| g4 | 2026-11-08 | ch01–09 | → ch09 |

## Review (Opus)
- **Assertion-reason verdicts:** checked every one against its A and R statements; all correct.
- **Competency tags:** checked every retag a writer reported. All were downward (an application or analysis tag lowered to understanding where the item only names a document, rule or treatment), so all are honest.
  - Where a lowered tag pushed a chapter below 45%, the writer added genuine analysis items instead of relabelling. ch03 added three error-finding items.
- **Writing-process wording:** writers removed "as commonly named", "computed", "used once" and the practice-label lines from student-facing text. What remains is exam advice to students and build metadata.
- **Errors writers caught or fixed:**
  - ch09: one pinned gross-profit figure was wrong (118,000 against the computed 114,000). The pin caught it; the item's value had always been computed.
  - ch05: three hand sums were wrong, and the pins caught all three.
  - Deck length: ch03, ch09 and ch04's predecessor deck were each trimmed to the 22-slide cap.
- **Gap in `acc.mjs` for a reviewer:** `brs()` computes correctly from an overdraft, but prints the Add and Less groups in the favourable-balance layout. ch05 uses its own `recon.mjs` for the textbook overdraft layout, still asserted through `brs()`. If a later chapter needs this, `brs()` should print a reversed layout for an overdraft start.
- **Flagged treatments for a reviewer** (all are standard school treatments, listed in each README):
  - Goods withdrawn, given as charity or free samples, or lost by fire are credited to Purchases.
  - Under the provision method, depreciation to the date of sale gets its own entry.
  - Profit on sale of an asset goes to the P&L, and may be transferred to a capital reserve.
  - One-sided errors are corrected by an explanatory entry before the trial balance and through a suspense account after it.
  - Interest on drawings is a per cent of the year's drawings, not worked out month by month.
  - The discount provision is on debtors after the provision for doubtful debts.
  - Timeliness is placed under relevance.
  - The ICAI Accounting Standards Board dates from 1977.
  - Ind AS were notified in 2015 and applied from the 2016–17 financial year.
  - GST (1 July 2017): CGST/SGST/IGST and input tax credit, with no real slabs. The slabs were restructured in 2025.
- **Maps:** none.

## Known gaps / follow-ups
- Only chapter tests were built; there are no half-yearly or annual papers.
- The class-default blueprints are `source_status: unverified`.
- The SVGs were checked only by script. Accounting tables are wide, so a pass at 360 px on staging is worthwhile.
- The dated notes (GST accounting, Ind AS, ICAI) need an annual check.

## Decisions made
- D-050 was followed.
- No new ADR. `acc.mjs` is local to the subject folder.

## Needs from owner
None.
