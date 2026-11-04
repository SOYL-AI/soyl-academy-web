# CBSE Class 9 Science, Chapter 5 — Force and Laws of Motion

`cbse-9-science-ch05` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (6 sections), 32 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch05_short` (20 marks, 40 min) and `t_cbse9sci_ch05_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch05/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Balanced and unbalanced forces; friction; t02 Newton's first law and inertia; t03 Newton's second law; momentum; t04 Newton's third law.
- Conservation of momentum appears only as a simple consequence of the third law (gun recoil, two trolleys, a skater and a boat), as the syllabus outcome is “apply the third law to everyday situations”.
- Facts a reviewer may wish to double-check: g = 9.8 m s⁻² (weight item); friction values (maximum static 20 N, sliding 14 N) and all masses, speeds and times are illustrative; friction shown as static, sliding and rolling with no coefficient of friction.

## Shape
- **Part 1, 17 slides:** force and the newton; balanced forces; unbalanced forces; worked example (net force); friction; friction as the push increases; worked example (friction and net force); increasing and reducing friction; newton's first law of motion; kinds of inertia; worked example (explaining with inertia); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** momentum; newton's second law; acceleration, force and mass; worked example (using F = ma); impulse and the force–time graph; worked example (catching a cricket ball); why a longer stopping time helps; newton's third law of motion; the third law in everyday life; recoil of a gun; worked example (recoil of a gun); worked example (two trolleys pushed apart); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 8 · example 7 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · plot 1 · svg 8 · table 17. Eight SVGs and a plot (balanced and unbalanced forces, friction against applied force, tablecloth-and-coin inertia, gun recoil, force–time area, action–reaction pairs, two trolleys; acceleration against force for two masses), rendered and checked. Narration 12–76 words (mean 59), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c a a b d c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (1.5 m s⁻²; 3000 N; 30 kg; 9 kg m s⁻¹; 100 N; 7500 N; 5 m s⁻¹; 1.5 m s⁻¹; 1.5 m s⁻¹) |
| short (2 marks) | 8 | 2 (30–50 words) |
| short (3 marks) | 7 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 12 · d2 31 · d3 22 · d4 1.
- **Competency:** recall 6 · understanding 22 · application 30 · analysis 8. Application or higher is **58% of items (60% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 16 · t02 13 · t03 27 · t04 16.
- **Deck checks:** q001, q003, q016 (Part 1); q029, q035, q051 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q004, q030, q021 · B q011, q010, q062 · C (q014 or q065) · D q015.
- **Long (40 marks, 90 min):** A q017, q031, q032, q033, q034, q052, q053, q054, q037, q056 · B q023, q046, (q045 or q061), q063, (q047 or q026) · C q048, (q027 or q049) · D q028, q050.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (6 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 17/17 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed the physics and the diagrams.
2. **Fixes by the writer.** An “= value” step was added to the recoil numerical, word limits fixed and several label collisions removed.
3. **Every numerical (F = ma, momentum change, impulse, recoil) is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

