# subject-producer — CBSE Class 11 Mathematics (hand-authored) — 2026-11-04

Status: partial — chapters land one commit each after a fully green gate run (table below); this note is updated as they land

Branch: `platform/subject-producer/cbse-11-mathematics` (from `platform/main` 44dbe07). D-025/D-026/D-050: chapters are written by Sonnet 5.5 sub-agents (at most two at a time); the producer (Opus 5.5) reviews each returned chapter (recomputes a fixed sample of answers by hand, checks scope, removed topics and LaTeX), runs the full gates, fixes or sends back problems and commits. A chapter needing heavy fixing, or two Sonnet chapters in a row failing gates for content reasons, falls back to an Opus writer; the writer of each chapter is recorded below. Provenance `origin: "human"`, all items `status: "draft"`.

## What changed

New folders only: `platform/content/authored/maths/cbse-11-mathematics-chNN/` with `README.md`, `release.json`, `tests.json` and `src/`:
- `lib.mjs` — a per-chapter copy (unchanged) of the CBSE 11 builder lib, generated from `cbse-12-mathematics-ch01/src/lib.mjs` (ids `q_cbse11math_chNN_NNN`, tests `t_cbse11math_chNN_short|long` on `cbse-11-default-chapter-test-short|long`, long items with any mark value). `build()` runs one independent re-solve check per item, KaTeX strict parsing, plot and narration checks, scheme sums and MCQ key rotation.
- Chapter helpers for exact arithmetic and figure checks; rebuild from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-chNN/src/build.mjs` (prints `NO ERRORS`; byte-identical on rebuild).

| Ch | Title | Writer | Slides | With visual | Notes | Cards | Questions (marks) | App.+ | Commit |
|---|---|---|---|---|---|---|---|---|---|
| 01 | Sets | Sonnet 5.5 | 21 + 21 | 31 | 7 | 30 | 72 (140) | 58% | 7261c2c |
| 02 | Relations and Functions | Sonnet 5.5 | 20 + 24 | 32 | 8 | 30 | 76 (141) | 55% | 53a245d |
| 03 | Trigonometric Functions | Sonnet 5.5 | 25 + 22 | 33 | 8 | 30 | 77 (145) | 62% | 2cc6254 |
| 04 | Complex Numbers and Quadratic Equations | Sonnet 5.5 | 20 + 19 | 27 | 7 | 30 | 65 (123) | 55% | 6c16c4b |
| 05 | Linear Inequalities | Sonnet 5.5 | 18 + 18 | 26 | 7 | 31 | 68 (138) | 57% | d3e5430 |
| 06 | Permutations and Combinations | Sonnet 5.5 | 19 + 20 | 26 | 7 | 30 | 69 (137) | 55% | f3e5e5d |
| 07 | Binomial Theorem | Sonnet 5.5 | 19 + 17 | 24 | 7 | 30 | 69 (137) | 58% | abfef91 |
| 08 | Sequences and Series | Sonnet 5.5 | 19 + 23 | 29 | 8 | 30 | 73 (144) | 60% | f9f1aae |
| | **Total (8 chapters)** | | **325 slides** | | | **241** | **569 (1,105)** | | |

## How to verify

From `platform/` in the worktree, wrapped in `_tools/heavy.sh` (gate script `scratchpad/cbse11-maths/gates.sh`; logs `C:/Users/Prabhu/soyl-wt/cbse11-maths-gates*.log`): `npm run content -- catalog`, `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `npm run content -- verify --board cbse --class 11 --subject mathematics --authored`, `npm run content -- originality --authored` (whole bank, incl. CBSE 10/12, ISC 12 and ICSE 10 Mathematics), `npx vitest run --root db test/db6-split.test.ts`, `npx vitest run --root api test/content.test.ts`.

- Runs 1–3 (2026-11-04 00:31, 01:20 and 09:35 IST; ch01–ch04). Runs 1–2 failed only the API every-chapter leak scan: in run 1 it overlapped writers still building ch03/ch04 (this lib writes release.json even when its build fails), and in run 2 the scan timed out at 60 s (fixed on main by 852ea29, which gives it a 900 s budget; merged into this branch). Run 3, after the merge and with no writer active: catalog valid; content gate 3403 passed; lint 0/0; verify 4 units, 290 questions, 0 blocking, 0 minor; originality 486 units, 0 errors; DB-6 8/8; API 13/13. Producer review samples recomputed by hand, all correct (ch01 A − B, 2³ subsets, De Morgan; ch02 domain, n(A × B) = 30, pair equality; ch03 period of |sin x|, conversions, arc 628 m; ch04 z = 2 − 2i, quotient and product). From here on gate runs start only when no writer is mid-build.
- Run 4 (2026-11-04 10:06 IST; ch05–ch06, no writer active): catalog valid; content gate 3417 passed; lint 0/0; verify 6 units, 427 questions, 0 blocking, 0 minor; originality 488 units, 0 errors; DB-6 8/8; API 13/13. Producer review samples recomputed by hand, all correct (ch05 largest integer 13, integer sum −15, [5, 26] with 22 integers; ch06 ¹²C₄ = 495, 180 even numbers, 9000 / 4536 / 2296 / 952).
- Run 5 (2026-11-04 10:40 IST; ch07–ch08, no writer active): catalog valid; content gate 3431 passed; lint 0/0; verify 8 units, 569 questions, 0 blocking, 0 minor; originality 490 units, 0 errors; DB-6 8/8; API 13/13. Producer review samples recomputed by hand, all correct (ch07 coefficient 2160, term 560x⁵, all six terms of (a/2 − 2b)⁵; ch08 a₅ = 14, sixth GP term 2/3, AP with d = 7, S₂₀ = 1310, least n = 18). Producer fix in ch07 before gating: q058's model answer contained `\\left(\\dfrac…` (doubled backslashes from a raw/normal template mix), which KaTeX accepts but renders as a line break plus the word "left"; fixed in the source and rebuilt. A new scan (scratchpad dblslash.cjs) over every maths release in the bank found no other case.

## Scope decisions

- Topics follow `catalog/cbse/11/mathematics/syllabus.yaml` (2026–27 rationalised); the subject's removed topics (Mathematical Induction formative only; Mathematical Reasoning deleted) appear at most as one note; topics marked `board_assessed: false` are taught lightly and noted in the chapter README.
- Tests use the class defaults `cbse-11-default-chapter-test-short/-long` (the subject has only annual and half-yearly blueprints).
- Originality (D-036): fresh set-ups, content-specific stems; checked by the repo gate against the whole bank.

## Known gaps / follow-ups

- No narration audio (TTS stage).
- Renderer checks on staging at 360 px for wide tables and dense plots.

## Decisions made

None new (D-025, D-026, D-032, D-035, D-036, D-050).

## Needs from owner

None.
