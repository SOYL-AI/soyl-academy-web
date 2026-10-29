# CBSE Class 12 Physics, Chapter 1 — Electric Charges and Fields

`cbse-12-physics-ch01` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 20 slides), notes (7 sections), 32 flashcards, 76 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch01_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch01_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch01/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `lib.mjs` is adapted from the CBSE 10 Science ch06 library (CBSE 12 ids, `cbse-12-default-*` blueprints, physics narration units, number helpers) and additionally runs the pipeline's stage-5 deterministic checks inside the build. `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are taught and assessed; the 2026-27 syllabus lists no deleted topics for this chapter.
- t04 (continuous distributions) is limited to defining λ, σ, ρ and **setting up** the field integral, as the syllabus outcome says; no hard integrals are evaluated.
- Constants as used in CBSE problems: $k = 9 \times 10^{9}$ N m² C⁻², $\varepsilon_0 = 8.85 \times 10^{-12}$ C² N⁻¹ m⁻², $e = 1.6 \times 10^{-19}$ C, $m_e = 9.1 \times 10^{-31}$ kg.

## Shape
- **Part 1 (t01–t02, 19 slides):** properties of charge; quantisation in practice; charging by induction; Coulomb’s law; vector form and dielectric constant; superposition; the electric field; field lines of single charges, a dipole and two like charges; properties of field lines. Worked examples: force between ±μC charges (6.0 N; 1.5 N at double distance); resultant of perpendicular forces (0.40 N and 0.30 N → 0.50 N at 53°); field at the midpoint of ±2 μC (3.6 × 10⁶ N C⁻¹).
- **Part 2 (t03–t06, 20 slides):** dipole and dipole moment; axial and equatorial fields (with the axial derivation); torque in a uniform field; continuous distributions; flux; Gauss’s law; choosing Gaussian surfaces; wire and sheet; thin shell. Worked examples: small dipole (18 and 9.0 N C⁻¹); torque (1.0 × 10⁻³ N m); field of a wire (4.0 × 10⁵ N C⁻¹, halves at 18 cm).
- Layouts: title 2, concept 11, two-column 3, diagram 7, example 6, check 6, summary 2, exam-tips 2. Visuals on 35 of 39 slides (largest gap 1).
- **Diagrams (12 SVGs, theme colours only):** field lines of +q, −q, a dipole and two equal positive charges are **traced numerically** (RK4 along the unit field of point charges); every arrowhead on a traced line is checked against the computed field. Also: Coulomb forces (like/unlike), superposition drawn to scale (resultant angle checked = 53.1°), dipole with axial and equatorial points (resultant at Q checked antiparallel to p), dipole in a uniform field (torque sense checked), flux through a tilted area (normal checked), a closed surface with inside/outside charges, Gaussian surfaces for wire/sheet/shell, and a continuous line charge. 13 self-checks in total; all pass (`build.checks.diagrams`).
- **Plots:** E against r for a thin shell (0 inside, 1/r² outside); E against r for a point charge, a long wire and a sheet.
- **Narration:** 22–79 words per slide (mean 64), numbers and symbols spoken in words. Contexts: a woollen sweater on a Delhi winter evening, water as a solvent, microwave ovens.

## Question bank (76)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7) |
| assertion-reason | 7 | 1 (keys a 3, b 2, c 1, d 1) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 10 | 1 or 2 (touching spheres, three charges on a line, point-charge field, field between two charges, axial dipole field, torque, flux through a cube face, flux through a square, sheet field, shell field) |
| short | 8 + 5 | 2 / 3 |
| long | 5 | 5 (axial-field derivation; Gauss’s law and the sheet; the shell with graph; superposition on a square; torque on a dipole) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`. `word_limit` is set on the 4 prose short answers; derivations and numerical short/long answers have none (their length is set by the working, not by words).
- **Difficulty:** d1 15 · d2 24 · d3 33 · d4 4.
- **Competency:** recall 8 · understanding 30 · application 31 · analysis 6 · evaluation 1. Application or higher is **50% of items (59% of marks)**, inside the 45–65% lint band. One-step formula substitutions (field of a point charge, flux through a square, sheet field) are tagged understanding under the D-035 rule.
- **Topic tags:** t01 20 · t02 16 · t03 14 · t04 5 · t05 11 · t06 14.
- **Cases:** inverse-square data from a Bhopal school lab (data; predict at 15 cm, find the charge, or predict in oil); water dipoles in a microwave oven (torque, why an alternating field heats, why oil heats slowly); a bus struck by lightning near Shillong (shielding, field outside a charged sphere, evaluating the “rubber tyres” claim); an industrial inkjet printer (deflection direction, force on a drop, deflection vs charge, why the field between plates is uniform).
- **Deck checks:** quantisation, doubling charges and distance, crossing field lines (Part 1); dipole field ratio, flux through a cube face, field inside a shell (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q005, q016, q043, q052 · B q057, q061, q065 · C q068 or q070 · D q073.
- **Long (40 marks, 90 min):** A q002, q009, q019, q026, q030, q035, q042, q049, q011, q045 · B q059, q060, (q058 or q062), q063, (q064 or q066) · C q069 + (q071 or q072) · D q074, q075.

## Validation
- Build: 0 validator errors, 0 warnings; 902 maths strings parsed (KaTeX strict); 27 SVG visuals / 12 distinct diagrams pass the allow-list; pipeline stage-4 lint 0 errors, 0 warnings; pipeline stage-5 deterministic checks (arithmetic in every `=` chain, numeric keys, options, blanks, match pairs) run inside the build with 0 flags.
- 36 scripted re-solve checks pass (every numerical, every computed MCQ option, the case data, and the long-answer numbers are recomputed from the givens).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Field-line self-check direction:** the first dipole-figure checks assumed p points right; in that figure +q is on the left, so p points left. The checks were corrected (the traced lines themselves were right).
2. **Lint `latex.backslash`:** `$q = ne$` was read by the lint as a lost `\ne`; written as `$q = n e$` everywhere.
3. **Arithmetic parse:** solutions written as `a × 10⁻¹⁹ / b × 10⁻¹⁹ = 3` would be evaluated left to right by the verifier; rewritten as fractions.
4. **Electron weight comparison:** the ratio of electric force to weight is 9 × 10¹⁴, so the model answer says “about 10¹⁵”, not 10¹⁴.
5. **Shielding item:** “hollow metal dome” changed to a closed thin hollow sphere, so the zero-field-inside result applies exactly.
6. **Diagram layout after rasterising:** the dE arrow of the line-charge figure ran off the canvas; force labels overlapped a charge; the torque label overlapped a field line; the dipole-moment arrow was added to the torque figure.
7. **Facts double-checked:** glass rubbed with silk is positive; charging by induction leaves the opposite sign (earth removed before the rod); F₂₁ along r̂₁₂ for like charges; dielectric constant of water about 80; field-line rules; dipole moment from −q to +q; axial field 2kp/r³ along p and equatorial kp/r³ opposite to p; τ = p × E, stable at 0°, unstable at 180°; Gauss’s law and the flux q/6ε₀ per cube face and q/8ε₀ for a corner charge; wire λ/2πε₀r, sheet σ/2ε₀, two opposite sheets σ/ε₀ between and 0 outside, shell kq/r² outside and 0 inside; a microwave field at 2.45 GHz reverses about 5 × 10⁹ times per second.

## Known gaps
- Field-line sketches in model answers are described in words; graders should accept any correct sketch.
- The bus-and-lightning case models the bus as a closed spherical shell; the general result for any closed conductor comes in Chapter 2 (electrostatics of conductors).
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
