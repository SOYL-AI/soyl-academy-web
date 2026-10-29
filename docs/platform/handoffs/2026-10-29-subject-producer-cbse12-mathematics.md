# subject-producer — CBSE Class 12 Mathematics ch01–ch13 (hand-authored) — 2026-10-29

Status: done (all 13 chapters of `cbse-12-mathematics`, board order)

Branch: `platform/subject-producer/cbse-12-mathematics` (from `platform/main` 9f3ea8f). Author `claude-opus-5-5 (subject-producer)`, D-025/D-026, provenance `origin: "human"`, all items `status: "draft"`.

## What changed

New folders only, `platform/content/authored/maths/cbse-12-mathematics-ch01` … `-ch13`, each with `README.md` (scope, contents, verifier record, gaps), `release.json`, `tests.json` and `src/` (deterministic `build.mjs` + `questions.mjs` with one independent re-solve check per item, chapter helpers, `resolve.log`).

- **Shared authoring library:** `cbse-12-mathematics-ch01/src/lib.mjs`, adapted from `cbse-10-mathematics-ch01/src/lib.mjs` (ids `q_cbse12math_chNN_NNN`, tests `t_cbse12math_chNN_short|long` on blueprints `cbse-12-default-chapter-test-short|long`, generated_at 2026-10-29). Every other chapter imports it, so **ch01 must be merged with or before any other chapter.** `cbse-12-mathematics-ch01/src/lint.mts` lints one chapter with the pipeline's `lintExemplar`.
- Chapter helpers: ch01 `rel.mjs` (brute-force relation/function checks, arrow diagrams), ch02 `verify-local.mts` / `originality-local.mts` (run the pipeline's verify and bank-duplicate code on one release.json), ch03 `mat.mjs`, ch04 `det.mjs`, ch06 `calc.mjs`, ch07 `calc.mjs`, ch08 `area.mjs`, ch09 `ode.mjs`, ch10 `vec.mjs`, ch11 `vec.mjs`, ch12 `lp.mjs`, ch13 `prob.mjs`.
- Rebuild any chapter from `platform/`: `npx tsx content/authored/maths/cbse-12-mathematics-chNN/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding all 13 leaves the tree byte-identical).

| Ch | Title | Decks (slides) | Slides with visual | Notes sections | Flashcards | Questions | App.+ | Tests (short, long) |
|---|---|---|---|---|---|---|---|---|
| 01 | Relations and Functions | 2 (19 + 20) | 27 | 7 | 30 | 73 (147 marks) | 52% | 20 m / 10 items, 40 m / 22 items |
| 02 | Inverse Trigonometric Functions | 2 (21 + 19) | 27 | 7 | 30 | 68 (132 marks) | 54% | same |
| 03 | Matrices | 2 (23 + 20) | 35 | 7 | 32 | 69 (130 marks) | 51% | same |
| 04 | Determinants | 2 (22 + 22) | 34 | 7 | 30 | 68 (129 marks) | 47% | same |
| 05 | Continuity and Differentiability | 2 (21 + 23) | 34 | 8 | 32 | 72 (139 marks) | 47% | same |
| 06 | Application of Derivatives | 2 (21 + 22) | 33 | 7 | 30 | 73 (151 marks) | 53% | same |
| 07 | Integrals | 2 (20 + 21) | 30 | 7 | 30 | 70 (135 marks) | 53% | same |
| 08 | Application of Integrals | 2 (19 + 17) | 36 | 7 | 30 | 65 (123 marks) | 51% | same |
| 09 | Differential Equations | 2 (20 + 20) | 29 | 7 | 30 | 68 (132 marks) | 54% | same |
| 10 | Vector Algebra | 2 (22 + 22) | 34 | 7 | 32 | 70 (134 marks) | 53% | same |
| 11 | Three Dimensional Geometry | 2 (19 + 19) | 28 | 7 | 30 | 68 (129 marks) | 54% | same |
| 12 | Linear Programming | 2 (19 + 19) | 28 | 7 | 28 | 71 (136 marks) | 51% | same |
| 13 | Probability | 2 (21 + 19) | 29 | 7 | 30 | 68 (129 marks) | 57% | same |
| | **Total** | **26 decks, 530 slides** | | | **394** | **903 (1,746 marks)** | | **26 tests** |

Every chapter: worked examples in both decks (3–8 each, recomputed by the build), 3–4 objective check slides per deck (none used in a test), summary and exam-tips slides, never more than 2 slides in a row without a visual, narration ≤ 80 words and TTS-safe; notes with key terms, formulas and a visual per section plus exam tips (mark split, common mistakes); questions over mcq, assertion-reason, true-false, fill-blank, numerical, short-2, short-3, long-5 and case-based (1 + 1 + 2 with an either/or part (c)), difficulty 1–5, application-or-higher 47–57 % of items (lint band 45–65 %), MCQ keys rotated to balance a/b/c/d. Short and long chapter tests follow the blueprints section by section and are disjoint.

## How to verify

From `platform/` in the worktree, wrapped in `_tools/heavy.sh` (log: `C:/Users/Prabhu/soyl-wt/cbse12-mathematics-gates.log`):

| Gate | Command | Result (2026-10-29 20:15–20:25 IST, all 13 chapters in the tree) |
|---|---|---|
| Content gate | `npm test -w @soyl/content-templates` | 785/785 passed |
| Lint | `npm run content -- lint --exemplars` | 112 units, all `ok`, 0 errors; every `cbse-12-mathematics-ch01…13` 0 errors, 0 warnings (the `balance.competency` and literature warnings belong to existing CBSE 10 chapters) |
| Verify | `npm run content -- verify --board cbse --class 12 --subject mathematics --authored` | 13 units, 903 questions, 903 pass, 0 blocking, 0 minor flags |
| Originality | `npm run content -- originality --authored` | 112 units, 0 errors (all 13 chapters 0 errors, 0 warnings) |
| Answer separation | `npx vitest run --root db test/db6-split.test.ts` | 8/8 passed |
| API contract | `npx vitest run --root api test/content.test.ts` | 13/13 passed |

Also: every chapter's `build.mjs` prints `NO ERRORS` (re-solve checks 118–154 per chapter, all pass; KaTeX strict parse; plot points on curves; narration; scheme sums; tests vs blueprints and disjoint), and a full rebuild of all 13 chapters changes no file. Commits: ch01 091d839, ch02 5f258f9, ch03 22b1d29, ch04 e3501f3, ch05 030180d, ch06 219a86d, ch07 b0a42e7, ch08 ccd87df, ch09 478c6a3, ch10 e87226a, ch11 a8316df, ch12 dfe03f5, ch13 ccd8414.

## Scope decisions

- Deleted 2026-27 topics are never taught or required; where named at all, only as "not in the 2026–27 syllabus" (exam-tips slide, notes, one flashcard): ch01 composition/invertible functions/binary operations; ch02 elementary properties (values come from the principal-branch definition; sin⁻¹(sin θ)-type items are evaluated inside-out from the definition — a reviewer who counts that as a deleted property should look at ch02 m09–m11, ar2, tf5, n06, s207, s303, l03 and deck 2 slides 11–13); ch03 elementary row operations; ch04 properties of determinants (|adj A| = |A|ⁿ⁻¹, |kA| = kⁿ|A|, |AB| = |A||B| used as stated results); ch05 Rolle's and Lagrange's theorems; ch06 tangents/normals and approximations; ch07 definite integral as a limit of a sum; ch08 area between two curves (every region is one curve with the axes or lines parallel to them); ch09 formation of differential equations; ch10 scalar triple product (not even named); ch11 the plane (shortest distance written with dot and cross products, no [a b c] notation); ch12 "types of LPP" classification (short formulation contexts kept, not labelled as types); ch13 random variables, distributions, binomial.
- Originality (D-036): all explanations, examples, numbers and contexts are own; each chapter README lists familiar NCERT set-ups that were deliberately avoided. Cases use original Indian contexts with `passage_origin: soyl-original`.
- One integration fix by the Lead-side producer: ch05 q_cbse12math_ch05_070 stem had two lost `\\` row breaks inside `\begin{cases}` (KaTeX still parsed it); fixed and rebuilt. A repo-wide scan of all 13 releases for LaTeX commands without a backslash, lost matrix/cases row breaks and control characters is otherwise clean.

## Known gaps / follow-ups

- No narration audio (TTS stage).
- Renderer spot-checks worth doing on staging: inline KaTeX (including `bmatrix`/`vmatrix`) in table cells (ch03, ch04 and most chapters); `$…$` in geometry labels (ch13 trees); shaded-region geometry polygons drawn from many short segments (ch08); arrow diagrams drawn as geometry segments with `arrows: 1` (ch01, ch10); flat oblique 3-D sketches marked not to scale (ch11); plot `domain` and `vlines` (ch02, ch05, ch06, ch08, ch12). Plots cannot shade, so feasible regions (ch12) and areas (ch07) are described in alt text, captions and tables.
- Lint notes for other producers: the text "data:" (also "**Data:**") trips the banned-url rule; `math.arithmetic` rejects deliberately false numeric equations (write `\ne`); the bank duplicate check ignores numbers; in Git Bash quoted heredocs and `sed` eat backslashes, and JS `String.replace` with `$` patterns corrupts LaTeX — write content with the editor tools.
- The `numerical` degree answers in ch11 are written "90 degrees" because verify's final-value check does not read `^\circ`.
- Unit tests / mocks / frozen series for CBSE 12 Mathematics are not part of this task (assessment-designer).

## Decisions made

None new (D-025, D-026, D-032, D-035, D-036 followed).

## Needs from owner

None.
