# CBSE Class 11 Chemistry, Chapter 2 — Structure of Atom

`cbse-11-chemistry-ch02` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 21 slides), notes (6 sections), 32 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch02_short` (20 marks, 40 min) and `t_cbse11chem_ch02_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 5 syllabus topics are covered: t01 Subatomic particles and atomic models; t02 Developments leading to Bohr's model; Bohr's model; t03 Towards the quantum mechanical model; t04 Quantum numbers and orbitals; t05 Electronic configuration.

- Facts a reviewer may wish to double-check: h 6.626 × 10⁻³⁴ J s; c 3.0 × 10⁸ m s⁻¹; m_e 9.11 × 10⁻³¹ kg; e/m 1.76 × 10¹¹ C kg⁻¹; R_H 1.097 × 10⁷ m⁻¹; E_n = −2.18 × 10⁻¹⁸/n² J; r_n = 52.9 n² pm; hydrogen ionisation 1.31 × 10³ kJ mol⁻¹; Balmer 656.3 and 486.2 nm, Lyman 121.5 nm, Paschen 1875 nm; Thomson 1897/1904, Chadwick 1932. Threshold data for the photo-cell metals are labelled illustrative.

## Shape
- **Part 1, 19 slides:** discovery of subatomic particles; thomson’s model; rutherford’s alpha-scattering experiment; rutherford’s conclusions and limitations; atomic number, mass number and isotopes; electromagnetic radiation; worked example (frequency, wavelength and wavenumber); planck’s quantum theory and the photoelectric effect; worked example (photon energy and photoelectron energy); the hydrogen line spectrum; bohr’s model of the hydrogen atom; energy levels and spectral series; worked example (a Bohr transition); summary; exam tips; 3 checks.
- **Part 2, 21 slides:** limitations of the Bohr model; dual nature of matter: de Broglie’s relation; worked example (de Broglie wavelength); heisenberg’s uncertainty principle; worked example (uncertainty in speed); orbitals: the quantum mechanical model; the four quantum numbers; worked example (counting orbitals and electrons); shapes of orbitals and nodes; pictures of s, p and d orbitals; energy of orbitals and the Aufbau principle; pauli exclusion principle and Hund’s rule; box diagrams and the exceptional cases; worked example (writing configurations); exceptional configurations: chromium and copper; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 17 · diagram 4 · example 7 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 4 · table 27. Four SVGs (Rutherford scattering; hydrogen energy levels drawn to scale with Lyman, Balmer and Paschen transitions and Rydberg-computed wavelengths; orbital shapes with nodes; orbital box diagrams for N, O, Cr and Cu), 11 self-checks. Narration 10–79 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a c) |
| true-false | 3 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (3.05 m; 266 kJ mol⁻¹; 1.59 × 10⁻¹⁹ J; 486 nm; 106 pm; 9.55 × 10¹⁵ photons s⁻¹; 364 pm; 1.04 × 10⁻³⁴ m; 5.79 × 10⁵ m s⁻¹) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 15 · d2 28 · d3 21 · d4 3.
- **Competency:** recall 7 · understanding 19 · application 36 · analysis 4 · evaluation 1. Application or higher is **61% of items (72% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 8 · t02 26 · t03 13 · t04 12 · t05 12.
- **Deck checks:** q001, q009, q010 (Part 1); q034, q044, q056 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q011, q045, q004 · B q027, q062, q008 · C (q030 or q054) · D q032.
- **Long (40 marks, 90 min):** A q003, q012, q014, q016, q017, q035, q046, q057, q018, q037 · B q007, q028, (q029 or q052), q063, (q064 or q065) · C q066, (q042 or q031) · D q055, q067.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (11 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 24/24 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed facts, numericals and the rendered SVGs and rebuilt from source.
2. **Fixes.** The writer rewrote scientific-notation divisions as fractions (the verify checker reads a/b × 10ⁿ left to right), used half-mark scheme steps, and corrected a reversed energy subtraction in a self-check. The producer fixed label overlaps on the energy-level diagram (n = ∞ label, Balmer wavelengths on two lines) and the orbital-shape captions (nodal planes and cones).
3. **Every numerical (frequencies, photon energies, photoelectric kinetic energies, Bohr energies and radii, transition wavelengths, de Broglie and uncertainty values) is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

