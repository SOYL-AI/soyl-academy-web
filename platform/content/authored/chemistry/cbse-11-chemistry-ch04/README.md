# CBSE Class 11 Chemistry, Chapter 4 — Chemical Bonding and Molecular Structure

`cbse-11-chemistry-ch04` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 23 slides), notes (7 sections), 31 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch04_short` (20 marks, 40 min) and `t_cbse11chem_ch04_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch04/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 5 syllabus topics are covered: t01 Kössel–Lewis approach; ionic and covalent bonds; t02 Bond parameters and polarity; t03 VSEPR theory; t04 Valence bond theory and hybridisation; t05 Molecular orbital theory of homonuclear diatomics; hydrogen bond.

- Facts a reviewer may wish to double-check: NCERT-style data: dipole moments (HF 1.78, HCl 1.07, HBr 0.79, HI 0.38, H₂O 1.85, NH₃ 1.47, NF₃ 0.23, CHCl₃ 1.04 D; CO₂, BF₃, CH₄, CCl₄ zero); bond lengths (H–H 74, C–C 154, C=C 134, C≡C 120, N≡N 109, O=O 121, H–F 92, H–Cl 127 pm); bond enthalpies (H–H 436, C–H 414, C–C 347, C=C 611, C≡C 837, N≡N 946, O=O 498, F–F 159, Cl–Cl 242 kJ mol⁻¹). VSEPR shapes, formal charges, bond orders and unpaired electrons are computed from electron counts.

## Shape
- **Part 1, 18 slides:** the Kössel–Lewis approach and the octet rule; ionic bonds and lattice enthalpy; covalent bonds and Lewis structures; worked example (the nitrate ion); formal charge; exceptions to the octet rule; bond parameters; resonance; worked example (comparing bond orders and lengths); bond polarity and dipole moment; dipole moments of molecules; worked example (percentage ionic character of HCl); summary; exam tips; 3 checks.
- **Part 2, 23 slides:** vSEPR theory; shapes with no lone pairs: AB₂ to AB₆; effect of lone pairs on bond angles; shapes with lone pairs: ammonia, water and sulfur dioxide; lone pairs on five and six pairs; shapes derived from five and six pairs; worked example (predicting shapes); valence bond theory: sigma and pi bonds; hybridisation: sp, sp² and sp³; hybridisation involving d orbitals; worked example (hybridisation, sigma and pi bonds); molecular orbital theory; mO diagram of N₂: s–p mixing; mO diagram of O₂: paramagnetism; bond order and magnetism from H₂ to Ne₂; worked example (oxygen species); hydrogen bonding; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 17 · diagram 6 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 6 · table 28. Six SVGs (ideal VSEPR shapes AB2–AB6; lone-pair shapes NH₃, H₂O, SO₂, SF₄, ClF₃, XeF₂, BrF₅, XeF₄; orbital overlap; MO energy diagrams for N₂ with s–p mixing and O₂ without), with computed geometry and bond-angle checks. Narration 14–69 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c b a c d a) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (32; 1; 1.33; 40.3 %; -92 kJ; 9; 7; 2.5; 2) |
| short (2 marks) | 8 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 10 · d2 30 · d3 25 · d4 2.
- **Competency:** recall 3 · understanding 28 · application 28 · analysis 8. Application or higher is **54% of items (58% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 12 · t02 18 · t03 14 · t04 11 · t05 17.
- **Deck checks:** q001, q016, q017 (Part 1); q031, q039, q054 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q021, q052, q023 · B q012, q028, q029 · C (q037 or q063) · D q050.
- **Long (40 marks, 90 min):** A q003, q004, q018, q020, q032, q041, q053, q055, q022, q056 · B q013, q046, (q061 or q062), q036, (q030 or q014) · C q049, (q015 or q064) · D q065, q066.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (30 diagram self-checks (geometry and MO filling computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 10/10 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer checked the data and rendered every SVG.
2. **Producer fixes.** Bond data aligned with NCERT and with ch05 and ch09 (C–H 414, C=C 611, C≡C 837 kJ mol⁻¹; N≡N 109 pm, also in the N₂/O₂ case table). The VSEPR drawings were redrawn: atoms were hidden behind the central atom in the old oblique projection, so each shape now uses the smallest rotation from the textbook orientation that keeps every atom and lone pair clear, asserted by a self-check per shape.
3. **Formal charges, VSEPR shapes, MO bond orders and magnetic behaviour are computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

