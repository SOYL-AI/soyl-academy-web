# ICSE Class 10 Physics, Chapter 4 — Refraction of Light at Plane Surfaces

`icse-10-physics-ch04` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (6 sections), 32 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch04_short` (20 marks, 30 min) and `t_icse10phy_ch04_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch04/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Partial reflection and refraction; laws of refraction; effect on speed, wavelength and frequency; t02 Refractive index: mu = c/v and v = f x lambda; typical values for water, glass and diamond; t03 Refraction through a rectangular glass block; lateral displacement; multiple images in a thick mirror; t04 Real and apparent depth; apparent bending of a stick in water; t05 Refraction through a triangular prism; deviation; t06 Critical angle and total internal reflection (mu = 1/sin C); conditions; TIR in triangular prisms (60-60-60, 30-60-90, 45-45-90); comparison with plane-mirror reflection.
- Facts a reviewer may wish to double-check: Critical angles: glass 41.8°, water 48.6°, diamond 24.4°; prism example with μ = 1.5, A = 60°, i = 40° gives r₁ = 25.4°, e = 58.5°, δ = 38.5°; sapphire μ = 1.76 at 5 × 10¹⁴ Hz gives 341 nm inside.

## Shape
- **Part 1, 14 slides:** partial reflection and refraction; the laws of refraction; speed, wavelength and frequency; refractive index; worked example (light in a sapphire); refraction through a rectangular glass block; worked example (angles in a glass block); multiple images in a thick plane mirror; summary; exam tips; 3 checks.
- **Part 2, 15 slides:** real and apparent depth; worked example (a fish tank); effects of apparent depth; refraction through a triangular prism; worked example (deviation by a prism); critical angle and total internal reflection; worked example (critical angle of glass); totally reflecting prisms; prism reflector or plane mirror?; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 5 · diagram 7 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · plot 1 · svg 7 · table 14. Seven SVGs traced with vector Snell’s law (refraction with partial reflection; glass block with lateral displacement equal to t sin(i − r)/cos r; thick-mirror multiple images; real and apparent depth; equilateral prism with r₁ + r₂ = A; critical angle and total internal reflection; 45-45-90 prisms turning light through 90° and 180°) and one Snell’s-law plot. Narration 10–71 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (73)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys c d c c a b c) |
| true-false | 6 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 4 | 1 (a definition, a name or a one-step answer) |
| numerical | 12 | 1 or 2 (1.41; 1.5 × 10⁻¹⁰ s; 1.47; 4 × 10¹⁴ Hz; 1.13; 2 cm; 1.2 m; 1.5; 41 °; 32 °; 48.6 °; 1.56) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 3 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 19 · d2 35 · d3 17 · d4 2.
- **Competency:** recall 11 · understanding 20 · application 31 · analysis 9 · evaluation 2. Application or higher is **58% of items (73% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 18 · t02 18 · t03 10 · t04 13 · t05 9 · t06 16.
- **Deck checks:** q001, q013, q027 (Part 1); q035, q046, q054 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q028, q057, q005, q008, q041, q010, q044 · B (q069 or q072).
- **Long (40 marks, 60 min):** A q015, q029, q039, q058, q049, q042, q031, q051, q062, q068, q033, q053, q065, q045 · B (q070 or q071 or q073).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (7 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 27/27 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item and rendered the SVGs to check layout; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** A subscript written as a template interpolation was escaped; the deck’s prism example numbers were recomputed to agree for μ = 1.5; five stems were reworded after an overlap scan against CBSE 10 ch09/ch10 and CBSE 12 optics.
3. **Every numerical computed in code and asserted**; seven diagram self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Physics specimen paper (521) order and wording; every key re-mapped so each item's meaning is unchanged.
