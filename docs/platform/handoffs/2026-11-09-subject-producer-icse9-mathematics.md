# subject-producer — ICSE Class 9 Mathematics (hand-authored) — 2026-11-09

Status: partial — PAUSED by the owner on 2026-11-12 ("focus on getting 11th grade done; pause 9th grade"). ch01–ch11 of 21 gated and committed (one commit each); ch12–ch21 not started. Nothing is left uncommitted in the worktree and `C:/Users/Prabhu/soyl-wt/icse9-partial/` no longer exists (its ch10/ch11 drafts were finished and committed).

Branch: `platform/subject-producer/icse-9-mathematics` (fast-forwarded to `platform/main` 54643166, `npm ci` in `platform/` under the heavy lock). Provenance `origin: "human"`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, all items `status: "draft"` (D-025/D-026/D-050).

## What changed

New folders only: `platform/content/authored/maths/icse-9-mathematics-chNN/` with `README.md`, `release.json`, `tests.json` and `src/`:
- `lib.mjs` — per-chapter unchanged copy of the ICSE 9 maths lib (written by the producer in ch01): the ICSE 10 Mathematics lib with ids `q_icse9math_chNN_NNN`, `setUnit(unit, { author })`, the ICSE 2027 Mathematics specimen (511) A-R options ((a) A true, R false; (b) A false, R true; (c) both true, R explains; (d) both true, R does not explain — checked against the PDF), `mk.match` and, inside `build()`, the pipeline's stage-4 lint, stage-5 deterministic verify and the DB-6 answer-leak scan (from the CBSE 9 Mathematics lib), plus `chapterTests()` on `icse-9-default-chapter-test-short` (30 min, 20 marks: A = 4 mcq, 1 A-R, short-2, short-3; B = one of two 10-mark) and `-long` (60 min, 40 marks: A = 7 mcq, 1 A-R, 3 short-2, 2 short-3; B = any two of three 10-mark), with a blueprint shape check.
- Chapter helpers that compute and assert every answer, working line and figure: `surd.mjs` (exact p + q√c), `money.mjs` (BigInt paise), `poly.mjs`/`fact.mjs` (exact multivariate polynomials; factorisations multiplied back), `lin.mjs` (exact 2×2 solving, all three methods' working lines), `idx.mjs` (exact rational indices), `logs.mjs` (prime-exponent vectors), `tri.mjs`/`geo.mjs` (coordinate-built figures; labels, ticks, parallel marks and angle chases asserted).
- Rebuild from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-chNN/src/build.mjs` (prints `NO ERRORS`; byte-identical on rebuild).

| Ch | Title | Slides | With visual | Notes | Cards | Questions (marks) | App.+ | Writer | Commit |
|---|---|---|---|---|---|---|---|---|---|
| 01 | Rational and Irrational Numbers | 20 + 21 | 29 | 7 | 30 | 64 (149) | 59% | Sonnet 5.5 | 1da08af5 |
| 02 | Compound Interest | 19 + 21 | 26 | 7 | 30 | 64 (138) | 58% | Sonnet 5.5 | 4f8b3640 |
| 03 | Expansions | 20 + 21 | 29 | 7 | 32 | 65 (160) | 63% | Sonnet 5.5 | 22a55392 |
| 04 | Factorisation | 22 + 22 | 34 | 7 | 30 | 65 (151) | 60% | Sonnet 5.5 | f650f7f1 |
| 05 | Simultaneous Linear Equations | 20 + 22 | 30 | 7 | 30 | 65 (150) | 62% | Sonnet 5.5 (resumed once after a usage-limit cut-off) | 107eea08 |
| 06 | Indices (Exponents) | 21 + 21 | 30 | 7 | 30 | 64 (149) | 59% | Sonnet 5.5 | a6bab53f |
| 07 | Logarithms | 20 + 21 | 29 | 7 | 30 | 65 (151) | 63% | Sonnet 5.5 | 0862c540 |
| 08 | Triangles: Congruency and Inequalities | 21 + 23 | 34 | 7 | 30 | 65 (151) | 60% | Sonnet 5.5 | db0c0308 |
| 09 | Mid-Point and Intercept Theorems | 22 + 22 | 38 | 8 | 30 | 65 (151) | 62% | Sonnet 5.5 | 627071cf |
| 10 | Pythagoras Theorem | 23 + 22 | 38 | 8 | 31 | 65 (155) | 60% | Sonnet 5.5 (finished an interrupted draft's helpers) | aea65c26 |
| 11 | Rectilinear Figures: Parallelograms | 22 + 21 | 43 | 8 | 30 | 65 (144) | 62% | Sonnet 5.5 (finished an interrupted draft's helpers) | 45726d89 |
| | **Total (11 chapters)** | **471 slides** | | | **333** | **712 (1,649)** | | | |

Each chapter: two tests matching the blueprints exactly, disjoint, using no deck-check item; 3–4 check slides per deck, all objective; long items in parts 3 + 3 + 4 with 6–10 step marks; A-R keys spread a–d; MCQ keys rotated a/b/c/d.

## Producer review (D-050)

Every chapter's A-R items, MCQs, true-false and a sample of long items were read against their keys, solutions and syllabus topics; no wrong key found. Fixes before gating: ch01 q004 solution referred to "the third decimal" (wrong after option rotation); ch02 q006 solution's option-range phrase broken by rotation; ch09 q026 solution named an undefined point; originality duplicates (word-level, maths stripped) in ch03 q007/q008/q013/q024, ch04 q043/q056, ch06 q037 and ch08 q011 were reworded with contexts. Competency labels: writers relabelled single-step "application" items to "understanding" where honest (ch02, ch07, ch09; listed in their READMEs); every chapter sits at 58–63 % application-or-higher.

## How to verify

From `platform/`, under `_tools/heavy.sh` (script `C:/Users/Prabhu/soyl-wt/icse9-maths-gates.sh`, log `icse9-maths-gates3.log`, 2026-11-10 23:08–23:27 IST, after the final builds):
- 9 chapters built twice: all `NO ERRORS`, second build byte-identical (md5 check).
- `npm test -w @soyl/content-templates`: 4712/4712 passed.
- `npm run content -- lint --exemplars`: exit 0; every icse-9-mathematics unit 0 errors, 0 warnings.
- `npm run content -- verify --board cisce --class 9 --subject mathematics --authored`: 9 units, 582 questions, 0 blocking, 0 minor.
- `npm run content -- originality --authored`: 673 units, 0 errors (run 2 had 16 duplicate-stem errors, fixed above).
- `npx vitest run --root db test/db6-split.test.ts` 8/8; `--root api test/content.test.ts` 13/13 (it failed once in run 2 under machine contention — a hook timeout, 13 skipped — and passed alone in 649 s and again in run 3); `--root content-pipeline test/series.test.ts` 41/41.

- Run 4 — ch01–ch11 (2026-11-12 00:05–00:14 IST, log `icse9-maths-gates4.log`, after the ch10/ch11 final builds): 11 chapters rebuilt byte-identical; content-templates 4726/4726; lint exit 0, every icse-9-mathematics unit 0/0; verify 11 units, 712 questions, 0 blocking; originality 675 units, 0 errors; DB-6 8/8; API content 13/13; series 41/41.

## Scope decisions / points for a reviewer
- Topics follow `catalog/cisce/icse-9/mathematics/syllabus.yaml`; removed topics appear at most as one "not in the syllabus" line (ch02 loan instalments; ch08 inequality proofs).
- ch01: fill-blank surd answers are asked as a coefficient or rational value (the grader compares text); figures draw full compass circles (no arc primitive).
- ch02: 3-year CI − SI formula P(r/100)²(3 + r/100) used in notes; long items do not print part marks in the stem (they are in the schemes).
- ch03: a³ + b³ + c³ − 3abc left out (not listed in the Class IX topics).
- ch04: q064/q065 treat x² (or x³) as one quantity (x⁴ − 13x² + 36, x⁶ − 64); q064 is in the long test.
- ch05: cross-multiplication schemes keep negative denominators (e.g. y over −29); some long items use half-mark steps.
- ch06: `a⁰ = 1` stated for a ≠ 0 only (A-R q027 keys "every real number" false); q061 (aˣ = bʸ = cᶻ, b² = ac) is borderline Class IX and not in a test.
- ch07: fractional log values (log₈ 32 = 5/3) appear; log tables and change of base only mentioned as not required.
- ch08: one numerical (q044) uses the cosine rule — a reviewer may prefer an angle-only replacement; label placement on figures was not rendered.
- ch09: two items go slightly past the syllabus wording (mid-point triangle area one quarter; trapezium diagonal mid-points); equal-intercept proof is given for three lines.
- ch10: deck 1 has 23 slides; a second area proof (middle square b − a) appears only in long q060; the m, n triple parametrisation is stated without proof.
- ch11: the rectangle equal-diagonals proof and the "identify the shape from its diagonals" converses go slightly past the syllabus wording; Pythagoras (ch10) is used for rhombus lengths.
- Originality (D-036): imagined people, places and objects; content-specific stems; repo gate clean against all banks.

## Known gaps / follow-ups
- ch12–ch21 (Construction of Polygons through Distance Formula) not yet authored — paused by the owner on 2026-11-12. To resume: same lib (copy `icse-9-mathematics-ch01/src/lib.mjs`), writer brief pattern as above, gate script `C:/Users/Prabhu/soyl-wt/icse9-maths-gates.sh`.
- No narration audio (TTS stage); renderer checks at 360 px for geometry figures and wide tables still to do on staging.
- Unit tests and frozen series for ICSE 9 Mathematics are for assessment-designer.

## Decisions made
None new (D-025, D-026, D-035, D-036, D-050).

## Needs from owner
None.
