# ICSE Class 10 Physics, Chapter 5 — Refraction through Lenses

`icse-10-physics-ch05` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (5 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch05_short` (20 marks, 30 min) and `t_icse10phy_ch05_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch05/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Convex and concave lenses; lens as a set of prisms; centre of curvature, principal axis, optical centre, foci, focal plane, focal length; t02 Principal (construction) rays and images formed by a convex lens for different object positions; t03 Images formed by a concave lens; t04 Sign convention, lens formula 1/v - 1/u = 1/f and magnification (direct numerical problems); t05 Power of a lens in dioptre; simple microscope (magnifying glass); applications of lenses.
- Removed topics are respected: Derivation of the lens formula; Scale drawing or graphical determination of images; Formula and numerical problems on magnifying power of a simple microscope.
- Facts a reviewer may wish to double-check: Sign convention as in ICSE (1/v − 1/u = 1/f); a 20 cm lens giving a real image three times the object needs u = −80/3 cm; a 40 mm camera lens is +25 D; only linear magnification is used (no magnifying-power formula, no lens-formula derivation, no scale drawing: removed topics respected).

## Shape
- **Part 1, 16 slides:** convex and concave lenses; terms used for a lens; the three principal rays; convex lens: object beyond 2F; convex lens: object at 2F; worked example (focal length from a distant tower); convex lens: object between F and 2F; worked example (choosing the object position); convex lens: object between O and F; images formed by a concave lens; summary; exam tips; 3 checks.
- **Part 2, 15 slides:** the New Cartesian sign convention; lens formula and magnification; worked example (a convex lens forming a real image); worked example (a concave lens); the magnifying glass; worked example (a stamp under a magnifying glass); power of a lens; worked example (reading a spectacle prescription); uses of lenses; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 5 · diagram 8 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 9 · table 15. Nine SVGs: convex-lens ray diagrams for objects beyond 2F, at 2F, between F and 2F, at F and within F, a concave-lens diagram, lens action on parallel beams, the lens as a stack of prisms and the sign convention; every image is the intersection of principal rays checked against the lens formula. Narration 12–68 words (mean 50), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 17 | 1 (keys a 5, b 4, c 4, d 4; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys a c b a a a a d) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 3 | 1 (a definition, a name or a one-step answer) |
| numerical | 9 | 1 or 2 (18 cm; -8 cm; 20 cm; 2.999999999999999; 26.7 cm; 0.333; 1.25 D; -80 cm; 12.5 cm) |
| short (2 marks) | 6 | 2 |
| short (3 marks) | 2 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 18 · d2 32 · d3 11 · d4 2.
- **Competency:** recall 11 · understanding 17 · application 26 · analysis 8 · evaluation 1. Application or higher is **56% of items (66% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 11 · t02 16 · t03 11 · t04 22 · t05 19.
- **Deck checks:** q001, q009, q024 (Part 1); q031, q030, q045 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q003, q014, q049, q006, q005, q019, q007, q029 · B (q059 or q062).
- **Long (40 marks, 60 min):** A q015, q016, q025, q032, q050, q041, q040, q051, q027, q057, q008, q044, q055, q034 · B (q060 or q061 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (12 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 21/21 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** Four items were added to reach the class-10 minimum and to balance assertion-reason keys; a projector stem was changed (u = 18, f = 12) away from a CBSE set-up; nine stems were reworded after an overlap scan.
3. **Every numerical computed in code and asserted**; twelve diagram self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

