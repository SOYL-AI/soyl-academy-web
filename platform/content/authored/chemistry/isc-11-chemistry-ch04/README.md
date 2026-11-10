# ISC Class 11 Chemistry, Chapter 4 — Bohr's Model, Atomic Spectra and Dual Nature

`isc-11-chemistry-ch04` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (7 sections), 31 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch04_short` (20 marks, 50 min) and `t_isc11chem_ch04_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch04/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Emission and absorption spectra; line and band spectra; t02 Postulates and merits of Bohr's model; radii, velocity and energy of orbits (numericals, no derivation); t03 Hydrogen spectrum and Rydberg's formula; defects of Bohr's model; t04 Dual nature of matter and light: de Broglie's equation; Heisenberg's uncertainty principle (with numericals).
- Bohr's radius, velocity and energy are used as numericals only (r = 52.9 n²/Z pm, E = −2.18 × 10⁻¹⁸ Z²/n² J, v = 2.18 × 10⁶ Z/n m s⁻¹); the derivations are a removed topic and are not taught.
- Facts a reviewer may wish to double-check: R_H = 1.097 × 10⁷ m⁻¹; Balmer 656.3, 486.1, 434.1, 410.2 nm; Lyman first line 121.5 nm; Paschen first line 1875 nm; series limits Balmer 364.6, Lyman 91.2, Paschen 820.4 nm; ionisation energy of H 1313 kJ mol⁻¹, of He⁺ 5250 kJ mol⁻¹. Scenario numbers (57 g tennis ball at 60 m s⁻¹, electron Δx = 2.0 × 10⁻¹⁰ m, 1 μg dust grain) are illustrative. The Zeeman and Stark effects, many-electron atoms and the uncertainty principle are listed as defects of Bohr's model.

## Shape
- **Part 1, 17 slides:** emission and absorption spectra; line spectra and band spectra; the four spectra side by side; why atoms give lines; bohr’s postulates; bohr orbits drawn to scale; radius, speed and energy: numericals only; worked example (orbit of an He⁺ ion); energy changes and ionisation; worked example (excitation and ionisation of hydrogen); merits of Bohr’s model; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** series of lines in the hydrogen spectrum; energy levels and the series; the Rydberg formula; worked example (a Balmer line); defects of Bohr’s model; dual nature and de Broglie’s relation; standing electron waves in an orbit; worked example (de Broglie wavelengths); heisenberg’s uncertainty principle; worked example (uncertainty in speed); from orbits to orbitals; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 4 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 6 · table 20. SVGs: continuous, line-emission, line-absorption and band spectra computed from the Rydberg formula, Bohr orbits to scale for H and He⁺, the hydrogen energy levels with series arrows, and de Broglie standing waves on an orbit; all rendered and checked by eye. Narration 47–62 words (mean 56), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b d c a b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1–3 (212 pm; 1.45 × 10⁶ m s⁻¹; 434 nm; 97.2 nm; 1.94 × 10⁻³⁴ m; 2.89 × 10⁵ m s⁻¹) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 9 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 15 · d2 30 · d3 18 · d4 2.
- **Competency:** recall 11 · understanding 22 · application 26 · analysis 6. Application or higher is **49% of items (52% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 11 · t02 17 · t03 21 · t04 18.
- **Deck checks:** q005, q014, q015 (Part 1); q035, q033, q054 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q012, q030, q051, q041 · B q008, (q060 or q061) · C q025, (q046 or q045) · D q028.
- **Long (40 marks, 100 min):** A q002, q003, q013, q016, q017, q029, q032, q050, q052, q053, q040, q059 · B q009, q022, (q042 or q043) · C q010, q024, q026, (q062 or q063) · D q048, (q027 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (8 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 17/17 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. The first build sat at 43 % application or higher; the writer rewrote four MCQs into genuine application items (lamp identification from spectra, a Paschen line from the Rydberg formula, comparing a 4→2 line with the 656 nm line, a four-fold speed change in λ = h/mv). No tags were changed.
2. The producer re-solved every objective key and numerical (radii, energies, Rydberg wavelengths, de Broglie and uncertainty values): all correct.
3. Writer fixes: backslashes lost by a shell edit in two items, a narration slip about orbital speed, and label overlaps in three SVGs.

## Known gaps
- Narration audio is not generated (TTS stage).

