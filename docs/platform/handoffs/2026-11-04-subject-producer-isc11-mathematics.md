# subject-producer — ISC Class 11 Mathematics (hand-authored) — 2026-11-04

Status: done — all 19 chapters of `catalog/cisce/isc-11/mathematics/syllabus.yaml` committed, one commit each after a fully green gate run (table below). Updated 2026-11-09 for ch11–ch19 (resumed after the 8 Nov pause; producer Opus 5.5).

Branch: `platform/subject-producer/isc-11-mathematics` (from pushed `platform/main` 5a91aaf). D-025/D-026/D-050: chapters are written by Sonnet 5.5 sub-agents (at most two at a time); the producer (Opus 5.5) reviews each returned chapter (recomputes a fixed sample of answers by hand, checks scope, removed topics and LaTeX), runs the full gates, fixes or sends back problems and commits. A chapter needing heavy fixing, or two Sonnet chapters in a row failing gates for content reasons, falls back to an Opus writer; the writer of each chapter is recorded below. Provenance `origin: "human"`, all items `status: "draft"`.

## What changed

New folders only: `platform/content/authored/maths/isc-11-mathematics-chNN/` with `README.md`, `release.json`, `tests.json` and `src/`:
- `lib.mjs` — a per-chapter copy (unchanged) of the ISC 11 builder lib, generated from `isc-12-mathematics-ch01/src/lib.mjs`: ids `q_isc11math_chNN_NNN`, tests `t_isc11math_chNN_short|long` on `isc-11-default-chapter-test-short|long`, long items with any mark value, and the **provenance author set to the real writer** (default `claude-sonnet-5-5 (subject-producer chapter writer)`; an Opus fallback writer calls `setAuthor(...)`). Inherited from the ISC 12 lib: one re-solve check per item, KaTeX strict parsing, plot/narration/scheme checks, stage-4 lint and stage-5 deterministic checks inside `build()`, an exact-stem pre-check against the whole bank, and parking of a failing build as `*.wip.json` so tree-wide gates never see a half-built chapter.
- Chapter helpers for exact arithmetic and figure checks; rebuild from `platform/`: `npx tsx content/authored/maths/isc-11-mathematics-chNN/src/build.mjs` (prints `NO ERRORS`; byte-identical on rebuild).

| Ch | Title | Writer | Slides | With visual | Notes | Cards | Questions (marks) | App.+ | Commit |
|---|---|---|---|---|---|---|---|---|---|
| 01 | Sets | Sonnet 5.5 | 22 + 21 | 41 | 7 | 30 | 70 (130) | 59% | 73ff71b0 |
| 02 | Relations and Functions | Sonnet 5.5 | 18 + 19 | 27 | 7 | 30 | 79 (141) | 63% | 69a97c39 |
| 03 | Angles and Trigonometric Functions | Sonnet 5.5 | 21 + 24 | 37 | 7 | 30 | 77 (143) | 61% | 5d085c8a |
| 04 | Compound, Multiple and Sub-multiple Angles | Sonnet 5.5 | 22 + 22 | 35 | 7 | 30 | 85 (145) | 62% | 02979dff |
| 05 | Complex Numbers | Sonnet 5.5 | 20 + 25 | 37 | 8 | 30 | 90 (150) | 56% | 1ca7b32f |
| 06 | Quadratic Equations | Sonnet 5.5 | 21 + 22 | 34 | 7 | 30 | 64 (110) | 53% | 987db5fa |
| 07 | Linear and Quadratic Inequalities | Sonnet 5.5 | 18 + 22 | 31 | 7 | 30 | 77 (142) | 58% | fb3e64bf |
| 08 | Permutations and Combinations | Sonnet 5.5 | 23 + 21 | 38 | 7 | 31 | 67 (124) | 57% | 2fe879ab |
| 09 | Binomial Theorem | Sonnet 5.5 | 21 + 21 | 42 | 7 | 31 | 69 (129) | 57% | 8a797361 |
| 10 | Sequences and Series | Sonnet 5.5 | 23 + 19 | 36 | 7 | 32 | 71 (132) | 62% | 4ac0859a |
| 11 | Straight Lines | Sonnet 5.5 | 23 + 21 | 38 | 7 | 33 | 70 (130) | 59% | 07ab724f |
| 12 | Circles | Sonnet 5.5 | 24 + 20 | 36 | 7 | 31 | 78 (138) | 59% | 5fd019e1, 14c718c7 (fix) |
| 13 | Conic Sections: Introduction and Parabola | Sonnet 5.5 | 19 + 23 | 36 | 8 | 32 | 70 (130) | 50% | a8d1cba3 |
| 14 | Ellipse and Hyperbola | Sonnet 5.5 | 22 + 22 | 36 | 7 | 32 | 70 (130) | 57% | c784b962 |
| 15 | Introduction to Three-Dimensional Geometry | Sonnet 5.5 | 22 + 25 | 41 | 7 | 30 | 70 (130) | 57% | 969db511 |
| 16 | Limits | Sonnet 5.5 | 24 + 25 | 43 | 8 | 31 | 76 (136) | 59% | 84c12110 |
| 17 | Derivatives | Sonnet 5.5 | 20 + 21 | 35 | 7 | 30 | 72 (132) | 60% | 53a9f112 |
| 18 | Statistics: Measures of Dispersion | Sonnet 5.5 | 23 + 24 | 41 | 7 | 31 | 80 (140) | 59% | fb24e53b |
| 19 | Probability | Sonnet 5.5 | 22 + 23 | 39 | 8 | 32 | 70 (130) | 59% | 906d69e5 |
| | **Total (19 chapters)** | | **828 slides** | | | **586** | **1,405 (2,542)** | | |

ch11–ch19: all Sonnet 5.5 writers (no Opus fallback was needed); every item, deck worked example and solution reviewed by the producer (Opus 5.5), with the producer's fixes listed under "Producer review" below.

## How to verify

From `platform/` in the worktree, wrapped in `_tools/heavy.sh` and started only when no writer is mid-build (gate script `scratchpad/isc11-maths/gates.sh`; logs `C:/Users/Prabhu/soyl-wt/isc11-maths-gates*.log`): `npm run content -- catalog`, `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `npm run content -- verify --board cisce --class 11 --subject mathematics --authored`, `npm run content -- originality --authored` (whole bank, incl. CBSE 11, CBSE 10/12, ISC 12 and ICSE 10 Mathematics), `npx vitest run --root db test/db6-split.test.ts`, `npx vitest run --root api test/content.test.ts`; plus the doubled-backslash scan `scratchpad/isc11-maths/dblslash.cjs`.

- Runs 1–2 (2026-11-05 00:37 and 01:24 IST; ch01–ch04) plus an isolated API rerun (09:17 IST). Run 2, no writer active: catalog valid; content gate 3928 passed; lint 0/0; verify 4 units, 311 questions, 0 blocking, 0 minor; originality 561 units, 0 errors; DB-6 8/8. In both runs the API content suite did not start: its vitest worker crashed natively at import (exit 0xC0000409, fail-fast) before any test ran — the same crash appears in older logs of other worktrees on this machine. The isolated rerun on the identical, unchanged files passed 13/13 (log `C:/Users/Prabhu/soyl-wt/isc11-maths-api2.log`). Doubled-backslash scan total 0; provenance author on every item is the Sonnet writer. Producer review samples recomputed by hand, all correct (ch01 n(A ∪ B) = 14, 64 subsets, roster sets, De Morgan; ch02 function test, n(A × B) = 24, relation not a function; ch03 −cos x, arc 5.76 m, 14π/45 and 117°, sector 157.5 cm²; ch04 sin 3x = 0.792, tan 2x = 0.75, tan 195° = 2 − √3, sin 255° = −(√6 + √2)/4). Competency retags reported by writers were spot-checked and are honest (ch01 n02 is a one-line inclusion–exclusion; ch02 added three genuinely easy items rather than relabelling; ch03 tags direct one-step conversions as understanding).
- Run 3 (2026-11-08 00:50 IST; ch05–ch10, on the tree merged with platform/main 72f2a9e, which includes the 900 s API hook budget; no writer active): catalog valid; content gate 4383 passed; lint 0/0 for ch01–ch10; verify 10 units, 749 questions, 0 blocking; originality 626 units, 0 errors; DB-6 8/8; API content 13/13 (log `C:/Users/Prabhu/soyl-wt/isc11-maths-gates3.log`). Doubled-backslash scan total 0; every rebuild byte-identical. Producer review samples recomputed by hand, all correct (ch05 |(12 + 5i)/(15 − 8i)| = 13/17 ≈ 0.7647, (5 + i)/(2 − 3i) = 7/13 + 17i/13, ((1 + 3i)/(1 − 3i))² = 7/25 − 24i/25, z^66 + z^-45 = −1 − i; ch06 α³ + β³ = 238, 95/8 and 4x² − 21x + 1 = 0; ch07 sum of integers in (−3, 4) = 3, x < −6; ch08 144, 2058, 7!/(2!2!) = 1260; ch09 coefficient −344064, Pascal rows 5–6; ch10 n = 23, a₂₀ = 81, a₁₀ = 21). Competency retags spot-checked: ch06's five reported downward retags (m06, fb2, n2, s205, l05) are honest one-step items; ch05 and ch07 met the band by adding genuinely easy items rather than relabelling; ch08–ch10 reported no retags.

- ch11–ch19 (2026-11-09; gate script `scratchpad/isc11/gates.sh` in the 9 Nov session, which adds `npx vitest run --root content-pipeline test/series.test.ts`, the doubled-backslash scan and a key-side leak scan that mirrors the API F-006 check; logs `C:/Users/Prabhu/soyl-wt/isc11-maths-gates5..8.log`). Every chapter was rebuilt twice (byte-identical) before its run, and each commit follows a fully green run that started after the chapter's final build:
  - Run 5 (01:58 IST; ch11, ch12): catalog valid; content gate 4663 passed; lint 0/0; verify 12 units, 897 questions, 0 blocking; originality 666 units, 0 errors; DB-6 8/8; API content 13/13; series 41/41; backslash scan 0.
  - Run 6 (09:36 IST; ch13–ch16): everything green except the API F-006 scan: the ch13 item s206's method note ("The latus rectum is the chord through the focus perpendicular to the axis.") also appears in the deck, so key-side text was served. The note was rewritten; the leak scan was added to the gate script.
  - Run 7 (10:00 IST; ch13–ch16 after the fix): catalog valid; content gate 4712 passed; lint 0/0; verify 18 units, 1335 questions, 0 blocking; originality 673 units, 0 errors; DB-6 8/8; API content 13/13; series 41/41; leak 0; backslash 0.
  - Run 8 (ch12 follow-up fix and ch17–ch19): started 19:02 IST after a wait for the shared lock; catalog valid; content gate 4719 passed; lint 0/0 for ch01–ch19; verify 19 units, 1405 questions, 0 blocking; originality 674 units, 0 errors; DB-6 8/8; API content 13/13; series 41/41; leak 0; backslash 0.
- Producer review (ch11–ch19): every item's key, marks, scheme and competency read against the stem; every deck worked example recomputed. Fixes made: distractor explanations that named options by position ("the second option", "the first list") rewritten to name them by value, because the lib rotates option order (ch11 m14, m15; ch12 m12, m16 as a follow-up commit; ch14 m05, m09, m12, m20 — two of these were mapped to the wrong options; ch17 m18; ch19 m10); ch11 l05 now asks for equal non-zero intercepts; ch12 Part 2 worked example 4 working shown with the correct sign; ch12 three-point table terms printed as $3D + E$ rather than $+ -2D$; ch12 notes give intercept lengths as $\lvert 2g \rvert$, $\lvert 2f \rvert$. Writers' own competency changes (ch13 five downward retags of one-step items; ch18 three retags plus ten genuinely easy items added; ch16, ch17 easy items added instead of retagging) were spot-checked and are honest.

## Scope decisions

- Assertion-reason items in ch11–ch19 use the exact options, wording and order of the ISC 2027 Mathematics (860) specimen ((a) both true, R explains A; (b) both true, R does not explain; (c) A true, R false; (d) A false, R true), set once in each chapter's `lib.mjs`; ch01–ch10 were aligned to the same wording on platform/main in wave 35 (2aaf65ca).
- Topics follow `catalog/cisce/isc-11/mathematics/syllabus.yaml` (ISC 2028 syllabus, Class XI portion; 19 SOYL chapters in syllabus order), including topics CBSE 11 does not teach; removed topics appear at most as one note.
- Tests use the class defaults `isc-11-default-chapter-test-short/-long` (1/2/3/5-mark ISC pattern; no case slot).
- Originality (D-036): fresh set-ups and content-specific stems, written against the CBSE 11 Mathematics chapters on the same topics; checked by the repo gate against the whole bank.

## Known gaps / follow-ups

- No narration audio (TTS stage).
- No Class XI specimen paper is published for ISC Mathematics; question style follows the ISC 12 pattern and the syllabus.
- Renderer checks on staging at 360 px for wide tables and dense plots; ch15 (3-D sketches drawn as oblique 2-D projections), ch18 (no box-plot element: dot strips and histograms) and ch19 (no Venn element: two-way tables and a tree flow) were not viewed on screen.
- Fixed on 2026-11-10 after merging platform/main (wave 35): the position-named distractor explanations in ch03 q_isc11math_ch03_008, ch09 q_isc11math_ch09_012 and ch01 q_isc11math_ch01_004 now name the options by value; a scan of ch01–ch19 found no other position-based option references (gate run 9, 22:36 IST: catalog valid; content gate 4747 passed; lint 0/0; verify 19 units, 1405 questions, 0 blocking; originality 678 units, 0 errors; DB-6 8/8; API content 13/13; series 41/41; leak 0; backslash 0).
- The plot spec has no circle, conic or vertical-line element, so closed curves are drawn as upper and lower halves and vertical directrices appear in tables or captions.

## Decisions made

None new (D-025, D-026, D-032, D-035, D-036, D-050).

## Needs from owner

None.
