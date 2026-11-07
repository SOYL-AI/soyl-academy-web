# ICSE Class 10 Physics, Chapter 12 — Radioactivity and Nuclear Energy

`icse-10-physics-ch12` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 13 slides), notes (5 sections), 30 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch12_short` (20 marks, 30 min) and `t_icse10phy_ch12_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch12/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Structure of the nucleus; atomic number Z and mass number A; isotopes; t02 Radioactivity as spontaneous disintegration; nature and properties of alpha, beta and gamma radiations; t03 Changes in the nucleus during alpha and beta decay; t04 Uses of radioisotopes; harmful effects; background radiation; safety precautions; X-rays and radioactive fallout; t05 Nuclear fission and fusion: basic introduction and equations; safe disposal of nuclear waste.
- Facts a reviewer may wish to double-check: Nuclide symbols are written in plain LaTeX (not mhchem); α = helium nucleus (+2e, 4 u), β = electron from the nucleus, γ = electromagnetic wave; U-238 → Pb-206 by 8 α and 6 β; example fission U-235 + n → Ba-141 + Kr-92 + 3n; X-rays are described as produced outside the nucleus.

## Shape
- **Part 1, 13 slides:** atomic number, mass number and isotopes; radioactivity; alpha, beta and gamma: charge and deflection; penetrating and ionising power; worked example (identifying radiation); changes in the nucleus: alpha and beta decay; worked example (a decay series); summary; exam tips; 3 checks.
- **Part 2, 13 slides:** uses of radioisotopes; harmful effects, background radiation and safety; worked example (choosing a source); nuclear fission; nuclear fusion; worked example (balancing nuclear equations); safe disposal of nuclear waste; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 2 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 2 · table 15. Two SVGs with checked directions (α, β and γ between charged plates: α towards the negative plate, β more strongly towards the positive plate, γ straight; penetration by paper, aluminium and lead). Narration 9–69 words (mean 50), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c a c c c b) |
| true-false | 5 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 4 | 1 (a definition, a name or a one-step answer) |
| numerical | 7 | 1 or 2 (13; 90; 226; 2; 143; 8; 6) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 1 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 25 · d2 26 · d3 11 · d4 3.
- **Competency:** recall 18 · understanding 17 · application 22 · analysis 8. Application or higher is **46% of items (52% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 9 · t02 16 · t03 15 · t04 14 · t05 14.
- **Deck checks:** q001, q008, q020 (Part 1); q030, q031, q040 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q009, q021, q012, q006, q015, q018, q037 · B (q061 or q065).
- **Long (40 marks, 60 min):** A q003, q010, q011, q033, q042, q045, q016, q036, q048, q059, q007, q029, q038, q019 · B (q062 or q063 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (2 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 18/18 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own nuclide and data (cobalt-60, polonium-210, strontium-90, thorium-232 sequences, bismuth-210, a foil-thickness gauge, a blood-flow tracer). The CBSE 12 Nuclei set-ups (U-238 neutron count, Xe/Sr fission, three differences between fission and fusion) are not reused.
2. **Fixes after the first build.** Maths delimiters lost before interpolated nuclide symbols were restored; template collisions in the notes were escaped; seven application items were added (58 → 65 items; application or higher 38% → 46%). Rebuilt clean.
3. **Every mass number and atomic number computed in code and asserted** by the build’s re-solve checks; two diagram self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Physics specimen paper (521) order and wording; every key re-mapped so each item's meaning is unchanged.
