# ICSE Class 10 Physics, Chapter 6 — Spectrum

`icse-10-physics-ch06` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (5 sections), 31 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch06_short` (20 marks, 30 min) and `t_icse10phy_ch06_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Dispersion of white light by a prism; deviation depends on colour (wavelength); t02 Electromagnetic spectrum: names in order of wavelength and common properties; t03 Properties and uses of infrared and ultraviolet radiation; t04 Scattering of light; blue colour of the sky and other applications.
- Facts a reviewer may wish to double-check: Region boundaries: γ below 10⁻¹¹ m; X-rays 10⁻¹¹–10⁻⁸ m; UV to 4 × 10⁻⁷ m; visible 400–800 nm; IR to 10⁻³ m; microwaves to 0.3 m; crown glass μ 1.513 (red) and 1.532 (violet); scattering ratio (675/450)⁴ ≈ 5.

## Shape
- **Part 1, 14 slides:** dispersion of white light by a prism; why the colours separate; worked example (red and violet in glass); the visible spectrum; worked example (frequencies of violet and red); the electromagnetic spectrum; properties common to all EM waves; worked example (which region is it?); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** infrared radiation: production, detection and properties; uses of infrared; worked example (radiation from a heater); ultraviolet radiation: production, detection and properties; uses and dangers of ultraviolet; scattering of light; worked example (blue against red); blue sky and red sunrise; other effects of scattering; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 4 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: plot 1 · svg 4 · table 18. Four SVGs (dispersion by a flint prism with each colour traced at its own index; the electromagnetic spectrum on a scaled logarithmic band; the visible spectrum to a linear scale; sunlight paths at noon and sunrise) and one 1/λ⁴ scattering plot. Narration 10–64 words (mean 47), no symbols, formulae or unit abbreviations.

## Question bank (73)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys a b a d a c c a) |
| true-false | 6 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 4 | 1 (a definition, a name or a one-step answer) |
| numerical | 9 | 1 or 2 (1.96 × 10⁸ m/s; 2.3 °; 200 kHz; 16.7 cm; 3 × 10¹⁸ Hz; 2.9999999999999996 × 10¹³ Hz; 8.33 × 10¹⁴ Hz; 16; 3.84) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 2 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 22 · d2 41 · d3 9 · d4 1.
- **Competency:** recall 17 · understanding 20 · application 28 · analysis 7 · evaluation 1. Application or higher is **49% of items (61% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 19 · t02 22 · t03 23 · t04 16.
- **Deck checks:** q001, q016, q017 (Part 1); q034, q035, q053 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q019, q056, q008, q007, q042, q013, q065 · B (q069 or q072).
- **Long (40 marks, 60 min):** A q004, q020, q036, q037, q055, q044, q025, q024, q059, q067, q032, q049, q050, q052 · B (q070 or q071 or q073).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (4 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 15/15 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** An ozone assertion-reason and a radiation-use match stem were reworded away from CBSE 12 wording.
3. **Every numerical computed in code and asserted**; four diagram self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

