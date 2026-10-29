# CBSE Class 12 Physics, Chapter 5 — Magnetism and Matter

`cbse-12-physics-ch05` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (6 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch05_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch05_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch05/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. The authoring library is `../cbse-12-physics-ch01/src/lib.mjs` (same owner). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- The 2026-27 syllabus has three topics: t01 bar magnet and field lines (bar magnet as an equivalent solenoid, **qualitative**), t02 magnetic dipole in a uniform field (**qualitative**), t03 magnetic properties of materials (dia-, para-, ferromagnetism, magnetisation, effect of temperature).
- Because t01–t02 are qualitative, the dipole-field and torque items use **ratios and reasoning** (1/r³, axial = 2 × equatorial, stable/unstable, 2mB) rather than formula derivations; the only torque numericals are one-step uses of τ = mB sin θ from Chapter 4.
- The Earth’s magnetism, hysteresis loops and the toroid are not in the 2026-27 syllabus and are not used. Soft vs hard ferromagnets appear only as the domain-level reason for choosing electromagnet and permanent-magnet materials.

## Shape
- **Part 1 (t01–t02, 16 slides):** properties of a bar magnet; its field lines; magnetic vs electric field lines; the equivalent solenoid (worked: m = 0.12 A m²); axial and equatorial fields by analogy (worked ratio example: B/2, B/8, B/16); a magnet in a uniform field; equilibrium and oscillation; worked torque (3.0 × 10⁻³ N m).
- **Part 2 (t03, 17 slides):** M, H, χ, μr; worked magnetisation (8.0 × 10⁵ A m⁻¹); the three classes in a field; diamagnetism (including the Meissner effect); paramagnetism and the Curie law; ferromagnetism and domains; comparison; worked iron-cored solenoid (B ≈ 1.26 T, M ≈ 1.0 × 10⁶ A m⁻¹); behaviour in non-uniform fields (U-tube, rods); temperature and the Curie temperature; worked Curie law (6.0 × 10⁻⁴ at 150 K, 1.5 × 10⁻⁴ at 600 K).
- Layouts: title 2, concept 7, two-column 2, diagram 6, example 6, check 6, summary 2, exam-tips 2. Visuals on 29 of 33 slides (largest gap 1).
- **Diagrams (6 SVGs):** the bar-magnet and solenoid field lines are **traced numerically from the Biot–Savart law summed over the solenoid’s circular turns** (3D field evaluated in the plane through the axis): all 8 traced lines close, point S → N inside and N → S outside (checked). Samples in a uniform field use the **exact solution for a long cylinder** of μr = 0.6, 1.5 and 30: the field inside is checked to be weaker (0.75), stronger (1.20) and much stronger (1.94) than outside, and the number of lines threading each sample rises dia → para → ferro. Also: axial and equatorial points, a magnet in a uniform field (torque sense checked), and random vs aligned domains.
- **Plots:** Curie law χ ∝ 1/T; spontaneous magnetisation of a ferromagnet falling to zero at T_C (shape).
- **Narration:** 13–83 words per slide (mean 57), TTS-safe.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7) |
| assertion-reason | 6 | 1 (keys a 3, b 1, c 1, d 1) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 7 | 1 or 2 (m = NIA, torque, ratio of fields, magnetisation, B from χ, μr from B and H, Curie law) |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 (equivalent solenoid with ratios; magnet in a uniform field; M, H, χ and μr = 1 + χ with numbers; comparing the three classes; choosing soft and hard magnetic materials) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 9 prose short answers.
- **Difficulty:** d1 17 · d2 21 · d3 31 · d4 1.
- **Competency:** recall 10 · understanding 25 · application 32 · analysis 3. Application or higher **50% of items (58% of marks)**.
- **Topic tags:** t01 17 · t02 19 · t03 37.
- **Cases:** Curie-law data from a Pune college (identify the law, C = 0.090 K, predict χ at 50 K, or evaluate a “ferromagnetic” claim); an Alang scrap-yard crane electromagnet (soft iron, B ≈ 1.51 T, domains, or evaluate a steel core); a smartphone magnetometer in Jaipur (1/r³ from two readings, 25 μT on the equator, direction, or evaluate a 1/r object); superconducting levitation at a Chennai exhibition (χ = −1, B = 0 inside, why it floats, or evaluate a copper disc).
- **Deck checks:** field lines (TF), halving the distance, force on a magnet in a uniform field (AR) (Part 1); classify by χ, the U-tube, above the Curie temperature (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q004, q020, q038, q045 · B q012, q049, q026 · C q055 or q058 · D q060.
- **Long (40 marks, 90 min):** A q007, q008, q015, q019, q023, q024, q034, q040, q010, q046 · B q013, q050, (q051 or q064), q027, (q052 or q054) · C q056 + (q057 or q059) · D q061, q062.

## Validation
- Build: 0 validator errors, 0 warnings; 271 maths strings parsed (KaTeX strict); 20 SVG visuals / 6 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 18 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-29/30)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Field-line figure:** a first 2D model (rows of infinite line currents) gave loops far larger than the canvas; the figure now sums Biot–Savart over the real circular turns, and every traced line closes inside the canvas.
2. **Competency band:** the first full draft had 45% application or above; six application items were added (turns for an equivalent solenoid, like poles facing, compass on the equatorial line, μr from B and H, the Curie law with a Celsius trap, a nickel ball losing its attraction near 360 °C). Now 50%.
3. **Word limit:** the compass-plotting answer (71 words for a 30–50 word question) was shortened.
4. **Formatting:** the Curie-data table used a broken exponent format; it now reads 9.00 × 10⁻⁴ etc.
5. **Facts double-checked:** closed field lines (S → N inside); no monopoles; zero net flux through a closed surface; m = NIA and the anticlockwise-end-is-N rule; far field ∝ 1/r³ with axial = 2 × equatorial; τ = m × B, stable at 0°, unstable at 180°, work 2mB; B = μ₀(H + M), M = χH, μr = 1 + χ; dia χ ≈ −10⁻⁵ (Bi, Cu, water), para χ ≈ +10⁻⁵ (Al, Na, O₂), ferro χ ≫ 1 (Fe, Co, Ni); superconductor χ = −1; Curie law χ = C/T in kelvin; Curie temperatures Fe ≈ 1043 K, Ni ≈ 631 K; soft iron for electromagnet cores, steel/alnico for permanent magnets.

## Known gaps
- Field-line sketches asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
