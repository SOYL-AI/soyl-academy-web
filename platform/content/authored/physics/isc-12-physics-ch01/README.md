# ISC Class 12 Physics, Chapter 1 — Electric Charges and Fields

`isc-12-physics-ch01` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 16 slides), notes (5 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch01_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch01_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch01/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `questions-extra.mjs` holds the 4 items added in the verifier pass. |

All items are `status: "draft"` until a reviewer approves them.

## The ISC library (`src/lib.mjs`)
Copied from `physics/cbse-12-physics-ch01/src/lib.mjs` (same owner) and adapted to ISC: unit `isc-12-physics-chNN`, ids `q_isc12phy_chNN_###` and `t_isc12phy_chNN_{short,long}`, subject `isc-12-physics`; assertion-reason options in ISC wording with option (d) “Assertion is false and Reason is true” (the ISC 2027 Physics specimen keeps the CBSE-style option d, unlike ISC Biology); chapter tests on the `isc-12-default-chapter-test-short` / `-long` blueprints, using the section builder of the ISC 12 Biology library (it asserts each section’s exact type/mark/choice layout and that the tests are disjoint). Later ISC 12 Physics chapters import it from here.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch01: t01 frictional electricity, two kinds of charge, conductors and insulators, quantisation and conservation; t02 Coulomb’s law in vector form, permittivity of free space and of a medium, comparison with gravitation; t03 superposition; t04 electric field, field of point charges, F = qE, linear/surface/volume charge densities; t05 lines of force (properties and the four standard patterns); t06 dipole, dipole moment, axial and equatorial fields with the short-dipole approximation (both derivations); t07 dipole in a uniform field (zero net force, τ = p × E).
- Removed in the ISC scope and not used: Coulomb’s law written with position vectors r₁ and r₂. Gauss’s theorem is ISC ch02.

## Shape
- **Part 1 (t01–t04, 19 slides):** charging by friction; conductors, insulators; quantisation and conservation; worked: 2.4 × 10⁻¹⁹ C impossible, −3.2 nC = 2.0 × 10¹⁰ electrons; Coulomb’s law; medium and gravity compared; worked: 4.0 N in vacuum, 1.6 N in oil (K = 2.5); worked: F_e/F_g = 1.2 × 10³⁶ for two protons; superposition; worked: 1.57 N at 59.3°; electric field; worked: neutral point 0.20 m from 8 nC, 2400 N C⁻¹ at the midpoint; charge densities.
- **Part 2 (t05–t07, 16 slides):** properties of field lines; patterns; the dipole; axial and equatorial fields derived; worked: 45 N C⁻¹ and 22.5 N C⁻¹; worked: exact field 1.27 times the short-dipole value at r = 3a; dipole in a uniform field; worked: τ = 1.5 × 10⁻⁴ N m at 30°, 3.0 × 10⁻⁴ N m maximum.
- Visuals on 34 of 35 slides. Narration 9–75 words per slide (mean 58), TTS-safe.
- **Diagrams (8 SVGs):** field lines of +q, −q, a dipole and two like charges traced numerically from Coulomb’s law (every arrowhead checked against the computed field; dipole and neutral-point directions checked); Coulomb force directions; the superposition example drawn to scale (resultant angle checked); dipole fields at axial and equatorial points; the couple on a dipole. 11 self-checks, all pass. **Plots:** E ∝ 1/r²; exact ÷ short-dipole axial field against r/a.

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4) |
| assertion-reason | 4 | 1 (keys a 2, c 1, d 1) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 22 | 1 or 2 |
| short | 7 + 8 | 2 / 3 (derivations of the axial and equatorial fields and of the torque among the 3-mark items) |
| long | 5 | 5, set in parts with marks shown, e.g. [1] + [2] + [2] |

- **Difficulty:** d1 22 · d2 22 · d3 22 · d4 6. **Competency:** recall 8 · understanding 31 · application 26 · analysis 7: application or higher **46% of items (56% of marks)**.
- **Topic tags:** t01 12 · t02 16 · t03 8 · t04 16 · t05 8 · t06 13 · t07 9.
- No stimulus (case-based) items: the ISC Physics specimen sets its 5-mark questions in parts rather than as passages.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q002, q011, q032, q044, q037 · B q017, (q033 or q041) · C q024, (q049 or q050) · D q065.
- **Long (40 marks, 100 min):** A q023, q025, q029, q038, q045, q048, q052, q055, q056, q006, q015, q058 · B q007, q062, (q042 or q060) · C q018, q035, q040, (q059 or q068) · D q063, (q064 or q066).

## Validation
- Build: 0 validator errors, 0 warnings; 317 maths strings parsed (KaTeX strict); 28 SVG visuals / 8 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 32 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-10-31)
Every question was re-solved from its stem. Findings and fixes:
1. **Maths escapes:** “q = ne” in maths tripped lint latex.backslash (it reads as a lost `\ne`); written “q = n e” everywhere.
2. **Stems:** a draft oil-drop stem contained an editing note; rewritten (negatively charged drop, downward field). A 5-mark stem had a malformed mark tag; corrected to [1] + [1] + [3].
3. **Word limit:** the salt-in-water answer was 63 words against 30–50; tightened.
4. **Balance:** 43% application-or-higher at first; four application/analysis items were added (field falling with r, dipole moment from an axial field, proton against electron acceleration, equal force in oil).
5. **Originality:** every stem names its own set-up and numbers, different from the author’s CBSE 12 Physics ch01 bank (the originality gate compares the two).
6. **Facts double-checked:** q = ne; F = kq₁q₂/r², F/K in a medium; F₂₁ = −F₁₂; F_e/F_g = 1.24 × 10³⁶ (p–p), 2.27 × 10³⁹ (e–p); equilibrium point 0.20 m from +q for +q and +4q 0.60 m apart; 2F cos 30° for three equal charges; null point outside the pair for unlike charges; axial 2kpr/(r² − a²)², equatorial kp/(r² + a²)^(3/2), ratio exact/short at r = 2a = 16/9; τ = pE sin θ, stable at 0°, unstable at 180°; HCl effective charge ≈ 0.17e.

## Known gaps
- Field-line sketches and derivation figures asked for in answers are described in words; graders should accept any correct diagram.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
