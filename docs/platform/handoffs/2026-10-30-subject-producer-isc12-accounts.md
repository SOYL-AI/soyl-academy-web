# subject-producer — ISC Class 12 Accounts (hand-authored) — 2026-10-30/31

Status: partial — ch01–ch09 gated and committed; ch10–ch14 in progress (this note is updated as each chapter lands)

Branch: `platform/subject-producer/isc-12-accounts` (from local `platform/main` 4c30f89). Author `claude-opus-5-5 (subject-producer)`, D-025/D-026, provenance `origin: "human"`, all items `status: "draft"`. Session-limit cut-offs (2026-10-30 ~11:00 IST) interrupted the work; nothing partial was committed.

## What changed

New folders only: `platform/content/authored/economics-commerce/isc-12-accounts-chNN/` with `README.md` (scope, contents, verifier record, blueprint fit, gaps), `release.json`, `tests.json` and `src/`:
- `lib.mjs` — a per-chapter copy of the CBSE 12 Economics lib (`cbse-12-economics-ch01/src/lib.mjs`, header comment changed only): its `build()` validates the zod schema, runs stage-4 lint and stage-5 deterministic verify, the answer-leak scan and narration rules, and parks output as `*.wip.json` on any failure. Chapters are independent and merge in any order.
- `acc.mjs` — the chapter's accounting engine (same approach as CBSE 12 Accountancy): exact fractions, balanced journal entries, ledger/T-accounts, columnar capital and current accounts, revaluation/realisation accounts, horizontal balance sheets on reconstitution, full simulators for admission, retirement and dissolution. Every table and every figure in keys and model answers is generated from computed values; the build throws on any mismatch; key results are pinned to hand-checked values.
- `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-accounts-chNN/src/build.mjs` (byte-identical on rebuild).

Tests use the ISC defaults `isc-12-default-chapter-test-short` (50 min, 20 marks: A 4 MCQ + 1 A-R; B 2 + (2 | 2); C 3 + (3 | 3); D one 5-mark) and `isc-12-default-chapter-test-long` (100 min, 40 marks: A 10 MCQ + 2 A-R; B 2 + 2 + (2 | 2); C 3 + 3 + 3 + (3 | 3); D 5 + (5 | 5)), item for item; the two tests are disjoint and use no deck-check question.

| Ch | Title | Slides | With visual | Notes | Cards | Questions (marks) | App.+ | Commit |
|---|---|---|---|---|---|---|---|---|
| 01 | Fundamentals of Partnership | 22 + 22 | 34 | 7 | 31 | 88 (169) | 59% | 53aeed9 |
| 02 | Goodwill: Nature and Valuation | 21 + 20 | 31 | 8 | 32 | 79 (143) | 58% | 30cc4c7 |
| 03 | Reconstitution: Admission of a Partner | 19 + 20 | 29 | 8 | 31 | 77 (155) | 60% | b67d8b2 |
| 04 | Reconstitution: Retirement and Death of a Partner | 23 + 22 | 35 | 8 | 30 | 75 (150) | 60% | 03902e4 |
| 05 | Dissolution of a Partnership Firm | 20 + 18 | 28 | 7 | 31 | 71 (136) | 55% | 4dfb2cf |
| 06 | Issue and Forfeiture of Shares | 22 + 22 | 34 | 8 | 31 | 76 (150) | 58% | db58ad6 |
| 07 | Issue of Debentures | 20 + 21 | 31 | 8 | 31 | 71 (141) | 59% | 1cacda2 |
| 08 | Redemption of Debentures | 20 + 20 | 30 | 8 | 31 | 70 (141) | 56% | 33d106f |
| 09 | Final Accounts of Companies | 20 + 23 | 33 | 8 | 31 | 73 (146) | 59% | 4ef4017 |

## How to verify

From `platform/` in the worktree, wrapped in `_tools/heavy.sh` (script `isc-acc-gates.sh` in the producer scratchpad; logs `C:/Users/Prabhu/soyl-wt/isc12-accounts-gates*.log`):

| Gate | Command | Result (2026-10-31 05:09 IST, ch01–ch05 in the tree) |
|---|---|---|
| Content gate | `npm test -w @soyl/content-templates` | 1261/1261 passed |
| Lint | `npm run content -- lint --exemplars` | every ISC Accounts chapter 0 errors, 0 warnings |
| Verify | `npm run content -- verify --board cisce --class 12 --subject accounts --authored` | 5 units, 390 questions, 0 blocking, 0 minor flags |
| Originality | `npm run content -- originality --authored` | 180 units, 0 errors |
| Cross-bank | scratchpad `isc-vs-cbse-acc.mts` (pipeline nearDuplicates vs the 12 CBSE 12 Accountancy chapters in the other worktree) | 1,228 questions, 0 flags involving ISC |
| Answer separation | `npx vitest run --root db test/db6-split.test.ts` | 8/8 passed |
| API contract | `npx vitest run --root api test/content.test.ts` | 13/13 passed |
| Catalog | `npm run content -- catalog` | catalog valid: 0 errors, 0 warnings |

Every chapter build prints NO ERRORS and rebuilds byte-identically.

Gate run for ch06–ch09 (2026-10-31 22:39 IST, ch01–ch09 in the tree): content gate 1289/1289; lint 0/0 for every ISC unit; verify 9 units, 680 questions, 0 flags; originality 184 units, 0 errors; cross-bank 1,518 questions, 0 ISC flags; DB-6 8/8; API 13/13; catalog valid. Log `C:/Users/Prabhu/soyl-wt/isc12-accounts-gates3.log`.

## Blueprint fit (no catalog edit)

Accounts has no ISC subject blueprint, so the chapters use the ISC 12 defaults (1/2/3/5 marks). They fit only by splitting problems: 2-mark items are a ratio working, an entry or a short computation; 3-mark items are one account or a set of entries; 5-mark items come in parts (2 + 3). Real ISC Accounts practicals (appropriation plus capital accounts, revaluation plus capitals plus balance sheet, a full dissolution) are 6–8 marks, so each chapter also carries 2–3 full 6- or 8-mark practicals as practice-only items kept out of the tests. Recommendation (for curriculum-architect / assessment-designer): an ISC Accounts chapter-test blueprint with 6- and 8-mark practical slots. The catalog was not edited.

## Sources

The ISC 2027 Accountancy specimen paper was not fetched and `catalog/sources/cisce.md` is unchanged; question style follows the syllabus `exam_notes` (horizontal balance sheets on reconstitution, Schedule III Part I for companies). The ch05 producer read the ISC 2027 Accountancy syllabus PDF already cited as `isc-2027-accounts` for its dissolution notes (funds related to assets go to Realisation; overdraft through Bank; values when the question is silent; no set-off of a partner's loan).

## Scope decisions

- Removed ISC 2027 topics appear at most as one "not in the ISC 2027 syllabus" line: admission of a manager as a partner (ch01); memorandum revaluation account, joint life and individual policies, admission during a year (ch03, ch04); admission-cum-retirement, amalgamation, sale to a company, piecemeal distribution and insolvency (ch05).
- Goodwill valuation is its own chapter (ch02); ch01 leaves it out and ch03/ch04 apply it.
- Reviewer points (also in chapter READMEs): ch01 treats a guarantee as absolute in a loss year; ch01's A-R option (d) is the lib's "A false, R true" (ISC Biology uses "both false") — the (d)-keyed items have A false and R true, so the keys hold; ch05 leaves out the workmen compensation reserve on dissolution and Sections 40–44 (not in the ISC topic); ch04 loans use equal principal instalments.
- Originality (D-036): fresh firms, people and places checked against ISC siblings and all 12 CBSE 12 Accountancy chapters (other worktree); every stem names its own content (including match/T-F/fill/A-R lead-ins).

## Known gaps / follow-ups

- No narration audio (TTS). No case-based items (the ISC default has no case slot).
- Renderer checks at 360 px: 8-column capital-account tables scroll sideways; SVG labels are placed by pixel position.
- Unit tests and mocks for ISC 12 Accounts are for assessment-designer.

## Decisions made

None new (D-025, D-026, D-032, D-035, D-036).

## Needs from owner

None.
