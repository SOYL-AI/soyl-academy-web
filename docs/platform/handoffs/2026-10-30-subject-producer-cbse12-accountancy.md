# subject-producer — CBSE Class 12 Accountancy (hand-authored) — 2026-10-30

Status: done — all 12 chapters of `cbse-12-accountancy` gated and committed (one commit each)

Branch: `platform/subject-producer/cbse-12-accountancy` (from `platform/main` a24f697). Author `claude-opus-5-5 (subject-producer)`, D-025/D-026, provenance `origin: "human"`, all items `status: "draft"`. Two session-limit cut-offs (2026-10-29 20:37 IST and 2026-10-30 03:00 IST) interrupted the work; nothing partial was committed.

## What changed

New folders only: `platform/content/authored/economics-commerce/cbse-12-accountancy-chNN/` with `README.md` (scope, contents, verifier record, gaps), `release.json`, `tests.json` and `src/`:
- `lib.mjs` — a per-chapter copy of the CBSE 12 Economics lib (`cbse-12-economics-ch01/src/lib.mjs`, header comment changed only). Its `build()` validates the zod schema, runs the stage-4 lint and stage-5 deterministic verify, the answer-leak scan and narration rules, and parks output as `*.wip.json` on any failure. Each chapter carries its own copy, so the chapters are independent and can merge in any order.
- `acc.mjs` — the chapter's accounting engine: exact fractions for ratios, journal (debits = credits), ledger/T-accounts, columnar capital and current accounts, revaluation and realisation accounts, balance sheets, share-issue books, Schedule III notes. Every table and every figure in keys and model answers is generated from computed values (Indian digit grouping); the build throws on any mismatch, and key results are also pinned to hand-checked values.
- `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/cbse-12-accountancy-chNN/src/build.mjs`; rebuilding leaves the files byte-identical.

Tests use the accountancy blueprint override `cbse-12-accountancy-chapter-test-short` (20 marks, 40 min: A 3 MCQ + 1 A-R; B 2 × 3; C one of two 4-mark; D one of two 6-mark) and `cbse-12-accountancy-chapter-test-long` (40 marks, 90 min: A 6 MCQ + 2 A-R; B 3 × 3 + one of two; C 4 + one of two; D 6 + one of two). These mirror the board's 1/3/4/6-mark Accountancy pattern; the class defaults (`cbse-12-default-*`, with 2/3/5-mark and case slots) do not fit Accountancy. In every chapter the two tests are disjoint and use no deck-check question.

| Ch | Title | Slides | With visual | Notes | Cards | Questions (marks) | App.+ | Commit |
|---|---|---|---|---|---|---|---|---|
| 01 | Accounting for Partnership: Basic Concepts | 21 + 21 | 32 | 7 | 32 | 73 (147) | 56% | a40981d |
| 02 | Change in Profit-Sharing Ratio among Existing Partners | 19 + 18 | 26 | 7 | 30 | 76 (149) | 57% | bb1dfea |
| 03 | Admission of a Partner | 19 + 19 | 28 | 7 | 31 | 79 (164) | 58% | 4386026 |
| 04 | Retirement and Death of a Partner | 21 + 19 | 30 | 7 | 30 | 66 (150) | 58% | a5e2d16 |
| 05 | Dissolution of a Partnership Firm | 21 + 20 | 31 | 7 | 30 | 64 (142) | 50% | 447b045 |
| 06 | Accounting for Share Capital | 22 + 21 | 33 | 8 | 30 | 69 (150) | 58% | d2de240 |
| 07 | Issue of Debentures | 20 + 20 | 30 | 7 | 30 | 66 (144) | 58% | 64fd41e |
| 08 | Financial Statements of a Company | 19 + 20 | 29 | 7 | 30 | 74 (168) | 58% | 741a48d |
| 09 | Analysis of Financial Statements | 21 + 18 | 28 | 8 | 30 | 70 (154) | 57% | 0c35955 |
| 10 | Accounting Ratios | 19 + 17 | 26 | 7 | 30 | 69 (149) | 57% | 19db578 |
| 11 | Cash Flow Statement | 19 + 21 | 30 | 7 | 30 | 65 (143) | 57% | d145497 |
| 12 | Computerised Accounting (alternative to Part B) | 23 + 19 | 32 | 7 | 30 | 67 (145) | 58% | 76d405d |
| | **Total** | **24 decks, 482 slides** | | | **363** | **838 (1,805)** | | |

Each chapter: 2 decks with 3–7 worked examples each, 4 objective check slides per deck, summary and exam-tips slides, a visual at least every 3 slides (journal/ledger/statement tables, flows, SVG charts drawn from the figures); narration ≤ 83 words, amounts spoken in words, no digits, symbols or abbreviations; notes with key terms, formats and visuals plus exam tips (mark split, common mistakes); questions across mcq, assertion-reason, true-false, fill-blank, match, numerical, short (3), long (4 and 6), difficulty 1–5.

## How to verify

From `platform/` in the worktree, wrapped in `_tools/heavy.sh` (log `C:/Users/Prabhu/soyl-wt/cbse12-accountancy-gates.log`):

| Gate | Command | Result (final run 2026-10-30 10:29 IST, all 12 chapters in the tree) |
|---|---|---|
| Content gate | `npm test -w @soyl/content-templates` | 939/939 passed |
| Lint | `npm run content -- lint --exemplars` | all units ok; every accountancy chapter 0 errors, 0 warnings |
| Verify | `npm run content -- verify --board cbse --class 12 --subject accountancy --authored` | 12 units, 838 questions, 0 blocking, 0 minor flags |
| Originality | `npm run content -- originality --authored` | 134 units, 0 errors (an earlier run flagged ch08 q020 as 89 % similar to ch06 q030; ch08 q020 was reworded before ch08 was committed) |
| Answer separation | `npx vitest run --root db test/db6-split.test.ts` | 8/8 passed |
| API contract | `npx vitest run --root api test/content.test.ts` | 13/13 passed |

Every chapter build prints NO ERRORS (schema, lint, deterministic verify, answer-leak scan, narration, editorial counts inside `build()`) and rebuilds byte-identically. Logs: `C:/Users/Prabhu/soyl-wt/cbse12-accountancy-gates.log`, `cbse12-accountancy-gates2.log`, `cbse12-accountancy-gates3.log`.

## Scope decisions

- 2026–27 deletions: piecemeal distribution, sale of a firm to a company and insolvency of partners (ch05), redemption of debentures (ch07), exceptional/extraordinary items and discontinued operations (ch08) appear only as one "not in the 2026–27 syllabus" line each.
- Goodwill follows AS 26 throughout (no goodwill account raised; existing goodwill written off in the old ratio).
- Points flagged for a reviewer in the chapter READMEs: ch05 teaches Sections 41/42 with examples that keep insolvency out; ch06 debits shares issued to promoters to Incorporation Costs (some books use Goodwill); ch08 classifies current maturities of long-term borrowings under Short-term Borrowings (Schedule III as amended in 2021) — a one-line change in its classification table if the board expects the older treatment; ch02 uses a few 1.5-mark scheme steps in 6-mark items; ch09 adjusts one line by 0.01 (marked †) so a common-size balance sheet column totals 100.00 — plain rounding is a one-function change; ch10 states its definitions (debt includes long-term provisions, fixed-asset turnover on closing net fixed assets, operating expenses exclude finance costs) for review; ch11 treats short-term bank borrowings as financing and works the indirect method only; ch12 uses a generic four-digit coding scheme and no product names.
- Originality (D-036): all firms, companies, people and figures are imagined and labelled as such, with Indian names and places; no textbook or past-paper text.

## Known gaps / follow-ups

- No narration audio (TTS stage). No case-based items (the accountancy blueprints have no case slot).
- ch12: absolute cell references (`$B$2`) cannot be written because the shared lib rejects any `$` outside maths; they are described in words and shown with named cells. Allowing `$` inside code spans would need a lib/lint change (not made).
- Renderer checks on staging at 360 px: 6–10 column capital-account tables scroll sideways; SVG labels are placed by pixel position.
- Unit tests, mocks and frozen series for CBSE 12 Accountancy are for assessment-designer.

## Decisions made

None new (D-025, D-026, D-032, D-035, D-036).

## Needs from owner

None.
