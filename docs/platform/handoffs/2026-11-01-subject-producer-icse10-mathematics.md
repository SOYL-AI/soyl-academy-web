# subject-producer — ICSE Class 10 Mathematics (hand-authored) — 2026-11-01

Status: partial — ch01–ch10 committed; ch11–ch24 in progress (this note is updated as chapters land)

Branch: `platform/subject-producer/icse-10-mathematics` (from `platform/main` 36babbf). Author `claude-opus-5-5 (subject-producer)`, D-025/D-026, provenance `origin: "human"`, all items `status: "draft"`.

## What changed

New folders only: `platform/content/authored/maths/icse-10-mathematics-chNN/` with `README.md` (scope, contents, verifier record, gaps), `release.json`, `tests.json` and `src/`:
- `lib.mjs` — a per-chapter copy (unchanged) of the ICSE builder lib, generated from `cbse-12-mathematics-ch01/src/lib.mjs`: ids `q_icse10math_chNN_NNN`; `long` items with any mark value (ICSE 10-mark structured questions in parts); `chapterTests()` builds both tests on `icse-10-mathematics-chapter-test-short` (45 min, 20 marks: A 3 MCQ + 1 A-R + 2 × 3-mark; B one of two 10-mark) and `-long` (90 min, 40 marks: A 6 MCQ + 2 A-R + 3 × 4-mark; B any two of three 10-mark) and throws if a section does not match the blueprint. `build()` runs one independent re-solve check per item, KaTeX strict parsing, plot and narration checks, scheme sums and MCQ key rotation.
- Chapter helpers (e.g. `fin.mjs` exact paise/rational arithmetic for GST, recurring deposits, shares; `ineq.mjs` solution sets checked by brute force; `work.mjs` working lines generated from the computed values).
- Rebuild from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-chNN/src/build.mjs` (prints `NO ERRORS`; byte-identical on rebuild).

| Ch | Title | Slides | With visual | Notes | Cards | Questions (marks) | App.+ | Commit |
|---|---|---|---|---|---|---|---|---|
| 01 | Goods and Services Tax (GST) | 20 + 20 | 28 | 7 | 32 | 66 (162) | 58% | c947acf |
| 02 | Banking: Recurring Deposit Accounts | 18 + 18 | 24 | 7 | 30 | 69 (164) | 55% | e6f68bc |
| 03 | Shares and Dividends | 18 + 17 | 23 | 7 | 30 | 69 (164) | 55% | ade63a9 |
| 04 | Linear Inequations | 18 + 18 | 24 | 7 | 30 | 67 (162) | 60% | af4f2c6 |
| 05 | Quadratic Equations in One Variable | 18 + 17 | 23 | 7 | 30 | 69 (173) | 57% | d39818d |
| 06 | Ratio and Proportion | 19 + 18 | 25 | 7 | 30 | 66 (161) | 58% | 5c1c1c4 |
| 07 | Factorisation of Polynomials: Remainder and Factor Theorems | 19 + 17 | 24 | 7 | 28 | 67 (169) | 58% | 2305169 |
| 08 | Matrices | 20 + 18 | 26 | 7 | 30 | 66 (161) | 59% | 01f711c |
| 09 | Arithmetic Progression | 20 + 19 | 27 | 7 | 29 | 68 (169) | 59% | 9108a77 |
| 10 | Geometric Progression | 20 + 19 | 27 | 7 | 28 | 66 (167) | 58% | 05da964 |
| | **Total (10 chapters)** | **371 slides** | | | **297** | **673 (1,652)** | | |

## How to verify

From `platform/` in the worktree, wrapped in `_tools/heavy.sh` (gate script `scratchpad/icse-maths/gates.sh`; logs `C:/Users/Prabhu/soyl-wt/icse10-maths-gates*.log`): `npm run content -- catalog`, `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `npm run content -- verify --board cisce --class 10 --subject mathematics --authored`, `npm run content -- originality --authored` (compares with the whole bank including CBSE 10 Mathematics), `npx vitest run --root db test/db6-split.test.ts`, `npx vitest run --root api test/content.test.ts`.

- Runs 1–3 (2026-11-01 06:43, 07:18, 07:47 IST; ch01–ch06): catalog valid; content gate 2129, 2143, 2157 passed; lint 0/0 for every ICSE unit; verify 0 blocking flags (run 2 showed one minor flag on ch03 q042, fixed before ch03 was committed; run 3: 6 units, 406 questions, 0 blocking, 0 minor); originality 304–308 units, 0 errors; DB-6 8/8; API 13/13.
- Run 4 (2026-11-01 12:56 IST; ch07–ch08 added): catalog valid; content gate 2171 passed; lint 0/0; verify 8 units, 539 questions, 0 blocking, 0 minor; originality 310 units, 0 errors; DB-6 8/8; API 13/13.
- Run 5 (2026-11-01 17:10 IST; ch09–ch10 added): catalog valid; content gate 2185 passed; lint 0/0; verify 10 units, 673 questions, 0 blocking, 0 minor; originality 312 units, 0 errors; DB-6 8/8; API 13/13.

## Scope decisions

- Topics follow `catalog/cisce/icse-10/mathematics/syllabus.yaml` exactly; removed ICSE 2027 topics appear at most as one "not in the ICSE 2027 syllabus" line (e.g. brokerage and fractional shares in ch03).
- Style follows the ICSE 2027 specimen (511) pattern only: compulsory short items, structured 10-mark questions in parts (a)(b)(c) worth 3 + 3 + 4, all working shown.
- Commercial mathematics is computed in exact paise/rational arithmetic and every chain is asserted (CGST = SGST, input-tax credit, tax payable; RD interest by formula cross-checked by summing monthly products; whole numbers of shares, dividend and return by two formulas).
- Points for a reviewer (also in chapter READMEs): ch01 practises with the classic 5/12/18/28 % rates, every problem states its rate, and the notes say rates are set by the GST Council; ch04 draws number lines as allow-listed `svg` (the geometry/plot renderers cannot show open circles).
- Originality (D-036): imagined people, shops, banks and companies; content-specific stems; checked by the repo originality gate against the whole bank including CBSE 10 Mathematics.

## Known gaps / follow-ups

- No narration audio (TTS stage).
- Renderer checks on staging at 360 px for wide tables and SVG number lines.
- Unit tests, board mocks and frozen series for ICSE 10 Mathematics are for assessment-designer.

## Decisions made

None new (D-025, D-026, D-032, D-035, D-036).

## Needs from owner

None.
