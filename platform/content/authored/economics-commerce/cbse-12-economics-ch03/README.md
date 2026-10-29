# CBSE Class 12 Economics, Chapter 3 — Determination of Income and Employment

`cbse-12-economics-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Introductory Macroeconomics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Economics chapters (`social-science/cbse-10-social-science-ch19`). Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch03/src/build.mjs` from `platform/`); the build computes every numerical, draws every curve from its equation, validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 18 slides), notes (6 sections, 15 visuals), 32 flashcards, 70 questions (128 marks; 9 case parts and alternatives) |
| `tests.json` | `t_cbse12economics_ch03_short` (20 marks, 40 min) and `t_cbse12economics_ch03_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-short` / `-long`, item for item |
| `src/` | `lib.mjs` (builders, validation and the SVG chart builder), `questions.mjs`, `build.mjs` |

## Scope
All five syllabus topics: t01 aggregate demand and its components, ex-ante and ex-post, AS = C + S · t02 APC, MPC, APS, MPS, consumption and saving functions, break-even · t03 equilibrium by AD = AS and S = I, adjustment through unplanned inventories, the investment multiplier · t04 full employment, voluntary and involuntary unemployment · t05 excess and deficient demand, inflationary and deflationary gaps, fiscal and monetary corrective measures (repo/bank rate, CRR, SLR, open market operations, margin requirements).

### Decks
- **Part 1** (22 slides): assumptions of the short-run model, AD components, ex-ante/ex-post, AS, the consumption function and propensities, the saving function, equilibrium by AD = AS and by S = I, adjustment, the multiplier (rounds table and diagram). **Worked examples:** the four propensities from a schedule; equilibrium income with an S = I check; the multiplier and the new equilibrium. Four checks.
- **Part 2** (18 slides): full employment, voluntary vs involuntary unemployment, equilibrium below full employment, excess demand and its effects, deficient demand and its effects, fiscal and monetary measures. **Worked examples:** measuring an inflationary gap; a deflationary gap and the extra spending that closes it; diagnosing two imagined economies and prescribing measures. Four checks.
- 28 of 40 slides carry a visual: 7 SVG diagrams (consumption with 45° line, saving, AD–AS, saving–investment, multiplier shift, excess demand, deficient demand), 16 tables, 5 flows. Narration at most 71 words (mean 55), no symbols.

### Question bank (70 items)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 |
| assertion-reason | 6 (keys a, b, c, b, d, a) | 1 |
| numerical | 8 (+ 5 inside cases) | 1–2 |
| true-false · fill-blank · match · ordering | 3 · 2 · 2 · 1 | 1 · 1 · 2 · 1 |
| short | 8 + 6 | 2 / 3 |
| long | 6 | 5 |
| case-based | 3 (Sagarpur harbour multiplier; Pratapgarh Valley schedule; Varunpur slowdown) | 4 |

- Difficulty d1/d2/d3/d4 = 7/30/26/7. Competency: recall 6, understanding 25, application 21, analysis 17, evaluation 1 — **56% of items at application or above** (lint band 45–65%). Routine one-step formula items (APS, ΔC from MPS, K from MPS, ΔY from K, a gap from two given figures, choosing a measure) are tagged understanding, per the D-035 rule.
- MCQ keys a7 b6 c6 d6.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the harbour case. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C a full equilibrium-and-multiplier numerical + (5|5); D the schedule and the slowdown cases.

## Data and facts
- **All economies and figures are imagined** and labelled so. Deck economy: C = 100 + 0.75Y, I = 50 → break-even 400, equilibrium 600 (S = 50 = I), K = 4, ΔI = 20 → 680. Gap economy: AD = 240 + 0.5Y → equilibrium 480; full employment at 360 gives an inflationary gap of 60, at 600 a deflationary gap of 60 (closed by extra spending of 120 ÷ 2 = 60). The build asserts these values before writing the narration that quotes them.
- No Indian statistics are used. One institutional fact: the RBI's policy repo rate is set by its Monetary Policy Committee (since 2016).
- Policy wording is neutral: measures are described by their direction and effect on AD, not judged.
- **Originality:** standard relations (K = 1 ÷ MPS, AD = C + I) are stated in SOYL's words; every schedule, case and worked example is SOYL's own. No NCERT example, exercise or board/sample-paper item is reused.

## Verifier pass (2026-10-29)
- Every key re-derived in code from the stem's data; each MCQ solution names the key letter (set in code) and explains the distractors.
- Edge points checked: break-even and equilibrium kept separate everywhere; K minimum 1 at MPC = 0; APC > 1 possible, MPC > 1 not (usual model); gaps always measured at full-employment output.
- Pipeline lint and deterministic verify on this chapter: 0 errors, 0 warnings. Answer-leak scan clean. Rebuild is byte-identical.

## Gaps / for review
- The SVG diagrams are drawn to data scale; label placement was checked from coordinates, not by eye in the renderer. Please glance at the seven diagrams on staging (360 px).
- Public borrowing is listed as a fiscal measure against excess demand (it absorbs spending power), as in common Class 12 teaching; a reviewer may prefer to drop it.
- The reverse repo and the standing deposit facility are left to Chapter 2 (Money and Banking).
