# ICSE Class 10 Physics, Chapter 2 — Work, Energy and Power

`icse-10-physics-ch02` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (12 + 14 slides), notes (6 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch02_short` (20 marks, 30 min) and `t_icse10phy_ch02_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Work done by a force: W = F s cos(theta); special cases at 0 and 90 degrees; work against gravity W = mgh; t02 Energy as capacity to do work; units of work and energy (joule, erg, calorie, kW h, eV) and conversions; t03 Power: P = W/t; units watt, kW, MW, GW and horsepower; t04 Mechanical energy: gravitational potential energy U = mgh and kinetic energy K = (1/2)mv^2 with derivations; t05 Other forms of energy and energy conversions in daily life; t06 Principle of conservation of energy; U + K constant for a freely falling body; simple pendulum (qualitative).
- Removed topics are respected: Numerical problems on kinetic and potential energy for rotational or vibrational motion (only translational motion is examined).
- Facts a reviewer may wish to double-check: Energy units: 1 J = 10⁷ erg, 1 cal ≈ 4.2 J, 1 kW h = 3.6 × 10⁶ J, 1 eV = 1.6 × 10⁻¹⁹ J; 1 hp = 746 W; g = 10 m s⁻²; only translational kinetic and potential energy are used in numericals (removed topic respected).

## Shape
- **Part 1, 12 slides:** work done by a force; worked example (pulling at an angle); energy and its units; worked example (converting units); power; worked example (climbing stairs); summary; exam tips; 3 checks.
- **Part 2, 14 slides:** potential energy: U = mgh; kinetic energy: K = ½mv²; worked example (potential and kinetic energy); other forms of energy and conversions; worked example (tracing energy changes); conservation of energy; free fall; worked example (energy at three heights); the simple pendulum; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 6 · diagram 2 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · plot 1 · svg 2 · table 15. Two SVGs with computed geometry (a force at 60° resolved into F cos θ and F sin θ; a simple pendulum with both extremes at h = L(1 − cos θ)) and one plot of U, K and U + K against height for a 2 kg ball falling 20 m. Narration 8–71 words (mean 48), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 18 | 1 (keys a 5, b 5, c 4, d 4; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a d d a c) |
| true-false | 6 | 1 |
| fill-blank | 7 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a definition, a name or a one-step answer) |
| numerical | 9 | 1 or 2 (100 J; 300.00000000000006 J; 500 cal; 2 kW h; 1000 W; 30 s; 200000 J; 20 m s⁻¹; 450 J) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 3 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 29 · d2 25 · d3 8 · d4 2.
- **Competency:** recall 14 · understanding 18 · application 27 · analysis 5. Application or higher is **50% of items (67% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 12 · t02 13 · t03 13 · t04 14 · t05 7 · t06 13.
- **Deck checks:** q001, q011, q021 (Part 1); q031, q042, q047 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q003, q022, q007, q009, q027, q010, q029 · B (q060 or q061).
- **Long (40 marks, 60 min):** A q004, q012, q023, q032, q048, q036, q038, q045, q054, q058, q039, q046, q057, q056 · B (q062 or q063 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (2 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 25/25 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own bodies and data (a porter on a platform, a 25 N pull on a sledge, a 60 kg student on 4.5 m of stairs, a 500 kg water pump, a 1000 kg car, a coconut falling 45 m, a solar garden lamp).
2. **Fixes after the first build.** One arithmetic chain with powers of ten in a conversion was rewritten so the check can evaluate it; a rupee sign inside maths was moved outside; two items were raised to difficulty 4. Rebuilt clean.
3. **Every numerical computed in code and asserted** by the build’s re-solve checks.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

