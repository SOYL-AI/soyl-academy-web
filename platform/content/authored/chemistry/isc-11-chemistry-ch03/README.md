# ISC Class 11 Chemistry, Chapter 3 — Subatomic Particles and Early Atomic Models

`isc-11-chemistry-ch03` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 17 slides), notes (6 sections), 32 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch03_short` (20 marks, 50 min) and `t_isc11chem_ch03_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Discovery of the electron, proton and neutron: production and properties of cathode rays and anode rays; Chadwick's experiment; t02 Atomic number, mass number, isotopes and isobars; t03 Thomson's model; Rutherford's alpha-scattering experiment and nuclear model; their limitations; t04 Limitations of electromagnetic wave theory: black body radiation and the photoelectric effect; Planck's quantum theory.
- Cathode and anode rays (production and properties), Chadwick's experiment (the nuclear equation is shown as a chem visual), isotopes and isobars, the Thomson and Rutherford models and their limitations, black-body radiation, the photoelectric effect and Planck's quantum theory with E = hν numericals.
- Facts a reviewer may wish to double-check: h = 6.626 × 10⁻³⁴ J s; c = 3.0 × 10⁸ m s⁻¹; N_A = 6.022 × 10²³; m_e = 9.11 × 10⁻³¹ kg; e = 1.602 × 10⁻¹⁹ C; proton 1.673 × 10⁻²⁷ kg, neutron 1.675 × 10⁻²⁷ kg; e/m = 1.76 × 10¹¹ C kg⁻¹; about 1 alpha in 20 000 rebounds; nucleus about 10⁻¹⁵ m, atom about 10⁻¹⁰ m. Work functions and threshold values (3.3 × 10⁻¹⁹ J, 5.4 × 10¹⁴ Hz, 620 nm) are labelled given.

## Shape
- **Part 1, 18 slides:** the discharge tube; properties of cathode rays; anode rays; chadwick and the neutron; worked example (mass of the electron); atomic number and mass number; isotopes and isobars; worked example (counting particles in ions); thomson’s model; rutherford’s alpha-scattering experiment; observations and conclusions; limitations of the nuclear model; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** what the wave theory could not explain; black-body radiation; planck’s quantum theory; energy of photons of different colours; worked example (frequency and energy of a photon); worked example (number of photons); the photoelectric effect; observations that wave theory cannot explain; kinetic energy against frequency; worked example (threshold wavelength and kinetic energy); brightness or frequency?; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 5 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · flow 2 · svg 6 · table 20. SVGs: discharge tubes for cathode and anode rays, the alpha-scattering apparatus with computed Coulomb paths, Thomson against Rutherford models, computed Planck black-body curves (peaks agree with Wien's law within 4 %), kinetic energy against frequency for two metals, and the electromagnetic spectrum; all rendered and checked by eye. Narration 49–64 words (mean 57), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d b a; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1–3 (1.76 × 10¹¹ C kg⁻¹; 4.82 × 10²³ neutrons; 3.37 × 10⁻¹⁹ J; 4.83 × 10¹⁸ photons s⁻¹; 471 kJ mol⁻¹; 1.86 × 10⁻¹⁹ J) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 9 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 13 · d2 31 · d3 21 · d4 2.
- **Competency:** recall 10 · understanding 22 · application 28 · analysis 7. Application or higher is **52% of items (59% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 15 · t02 15 · t03 16 · t04 21.
- **Deck checks:** q004, q016, q032 (Part 1); q056, q050, q054 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q018, q036, q047, q038 · B q011, (q026 or q027) · C q064, (q043 or q044) · D q066.
- **Long (40 marks, 100 min):** A q002, q003, q017, q020, q031, q033, q035, q048, q049, q053, q024, q025 · B q012, q042, (q061 or q062) · C q013, q065, q063, (q028 or q029) · D q030, (q015 or q045).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (12 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 16/16 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. The 620 nm threshold wavelength in a 3-mark item is now labelled (given).
2. An assertion-reason item paired 'almost all alpha particles pass straight through' with 'an alpha particle is much heavier than an electron', which partly explains A; the reason is now 'an alpha particle is a helium nucleus with charge +2', so key (b) is unambiguous.
3. Writer fixes: a 2-mark scheme that totalled 3, a 3-pair match with 0.667 marks per pair (now 4 pairs), short check-slide narrations, and label overlaps in five SVGs.

## Known gaps
- Narration audio is not generated (TTS stage).

