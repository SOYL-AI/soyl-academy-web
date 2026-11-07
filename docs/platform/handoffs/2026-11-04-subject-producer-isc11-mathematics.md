# subject-producer — ISC Class 11 Mathematics (hand-authored) — 2026-11-04

Status: partial — chapters land one commit each after a fully green gate run (table below); this note is updated as they land

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
| | **Total (10 chapters)** | | **425 slides** | | | **304** | **749 (1,346)** | | |

## How to verify

From `platform/` in the worktree, wrapped in `_tools/heavy.sh` and started only when no writer is mid-build (gate script `scratchpad/isc11-maths/gates.sh`; logs `C:/Users/Prabhu/soyl-wt/isc11-maths-gates*.log`): `npm run content -- catalog`, `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `npm run content -- verify --board cisce --class 11 --subject mathematics --authored`, `npm run content -- originality --authored` (whole bank, incl. CBSE 11, CBSE 10/12, ISC 12 and ICSE 10 Mathematics), `npx vitest run --root db test/db6-split.test.ts`, `npx vitest run --root api test/content.test.ts`; plus the doubled-backslash scan `scratchpad/isc11-maths/dblslash.cjs`.

- Runs 1–2 (2026-11-05 00:37 and 01:24 IST; ch01–ch04) plus an isolated API rerun (09:17 IST). Run 2, no writer active: catalog valid; content gate 3928 passed; lint 0/0; verify 4 units, 311 questions, 0 blocking, 0 minor; originality 561 units, 0 errors; DB-6 8/8. In both runs the API content suite did not start: its vitest worker crashed natively at import (exit 0xC0000409, fail-fast) before any test ran — the same crash appears in older logs of other worktrees on this machine. The isolated rerun on the identical, unchanged files passed 13/13 (log `C:/Users/Prabhu/soyl-wt/isc11-maths-api2.log`). Doubled-backslash scan total 0; provenance author on every item is the Sonnet writer. Producer review samples recomputed by hand, all correct (ch01 n(A ∪ B) = 14, 64 subsets, roster sets, De Morgan; ch02 function test, n(A × B) = 24, relation not a function; ch03 −cos x, arc 5.76 m, 14π/45 and 117°, sector 157.5 cm²; ch04 sin 3x = 0.792, tan 2x = 0.75, tan 195° = 2 − √3, sin 255° = −(√6 + √2)/4). Competency retags reported by writers were spot-checked and are honest (ch01 n02 is a one-line inclusion–exclusion; ch02 added three genuinely easy items rather than relabelling; ch03 tags direct one-step conversions as understanding).
- Run 3 (2026-11-08 00:50 IST; ch05–ch10, on the tree merged with platform/main 72f2a9e, which includes the 900 s API hook budget; no writer active): catalog valid; content gate 4383 passed; lint 0/0 for ch01–ch10; verify 10 units, 749 questions, 0 blocking; originality 626 units, 0 errors; DB-6 8/8; API content 13/13 (log `C:/Users/Prabhu/soyl-wt/isc11-maths-gates3.log`). Doubled-backslash scan total 0; every rebuild byte-identical. Producer review samples recomputed by hand, all correct (ch05 |(12 + 5i)/(15 − 8i)| = 13/17 ≈ 0.7647, (5 + i)/(2 − 3i) = 7/13 + 17i/13, ((1 + 3i)/(1 − 3i))² = 7/25 − 24i/25, z^66 + z^-45 = −1 − i; ch06 α³ + β³ = 238, 95/8 and 4x² − 21x + 1 = 0; ch07 sum of integers in (−3, 4) = 3, x < −6; ch08 144, 2058, 7!/(2!2!) = 1260; ch09 coefficient −344064, Pascal rows 5–6; ch10 n = 23, a₂₀ = 81, a₁₀ = 21). Competency retags spot-checked: ch06's five reported downward retags (m06, fb2, n2, s205, l05) are honest one-step items; ch05 and ch07 met the band by adding genuinely easy items rather than relabelling; ch08–ch10 reported no retags.

## Scope decisions

- Topics follow `catalog/cisce/isc-11/mathematics/syllabus.yaml` (ISC 2028 syllabus, Class XI portion; 19 SOYL chapters in syllabus order), including topics CBSE 11 does not teach; removed topics appear at most as one note.
- Tests use the class defaults `isc-11-default-chapter-test-short/-long` (1/2/3/5-mark ISC pattern; no case slot).
- Originality (D-036): fresh set-ups and content-specific stems, written against the CBSE 11 Mathematics chapters on the same topics; checked by the repo gate against the whole bank.

## Known gaps / follow-ups

- No narration audio (TTS stage).
- No Class XI specimen paper is published for ISC Mathematics; question style follows the ISC 12 pattern and the syllabus.
- Renderer checks on staging at 360 px for wide tables and dense plots.

## Decisions made

None new (D-025, D-026, D-032, D-035, D-036, D-050).

## Needs from owner

None.
