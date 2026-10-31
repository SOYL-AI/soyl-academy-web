# ISC Class 12 Physics, Chapter 8 — Torque on a Current Loop and the Moving Coil Galvanometer

`isc-12-physics-ch08` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (5 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch08_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch08_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch08/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch08: t01 torque on a rectangular coil in a uniform field (forces on the four sides, no net force, the couple of arm b sin θ, τ = NIAB sin θ derived), magnetic moment m = NIA with its direction by the right-hand rule, τ = m × B, stable and unstable equilibrium; t02 the current loop as a magnetic dipole (far axial field (μ₀/4π)2m/x³, N and S faces, comparison with the electric dipole) and the orbital magnetic moment of the electron in the Bohr model (μ = evr/2 = (e/2mₑ)L, opposite to L, μ = nμB, the Bohr magneton); t03 the moving coil galvanometer (construction, concave pole pieces and soft-iron core giving a radial field, principle, NIAB = cθ and I = kθ, current and voltage sensitivity, figure of merit); t04 conversion into an ammeter (shunt S = IgG/(I − Ig), ammeter resistance G/n) and into a voltmeter (R = V/Ig − G, two-range meters), and meters loading a circuit.
- Removed in the ISC scope: direction rules other than the right-hand rule. Every direction in the chapter (moments, torques, faces of a loop) is found with the right-hand rule or a cross product; no other rule is taught or examined.
- Not examined here because they belong to ch07 (written separately): the Biot–Savart law, fields of wires, loops and solenoids, the Lorentz force and the force between parallel currents. The axial field of a loop is quoted (as a chapter 7 result) only to show the dipole form; the force on a side, NIlB, is used without being re-derived. Eddy-current damping in the galvanometer frame is not mentioned (ch10).

## Shape
- **Part 1 (t01–t02, 16 slides):** forces on the four sides of a coil; τ = NIAB sin θ derived from the top view; worked: 120 turns, 5.0 cm × 3.0 cm, 0.40 A, 0.30 T gives 0.72 N per side, 2.16 × 10⁻² N m at most and 1.08 × 10⁻² N m with the plane at 60°; magnetic moment and the right-hand rule; τ = m × B and the orientation table; worked: a 40-turn coil of radius 5.0 cm with 2.5 A, m ≈ 0.785 A m², τ ≈ 1.57 × 10⁻² N m in 0.020 T, with the direction of turning; the loop as a magnetic dipole; electric dipole and current loop compared; the orbiting electron and the Bohr magneton; worked: hydrogen ground state, I ≈ 1.06 mA and μ ≈ 9.33 × 10⁻²⁴ A m² (one Bohr magneton).
- **Part 2 (t03–t04, 17 slides):** construction; why a radial field; I = kθ; worked: 60 turns of 5.0 cm² in 0.18 T with c = 4.5 × 10⁻⁸ N m rad⁻¹, 2.5 μA for 0.30 rad, 1.2 × 10⁵ rad A⁻¹; current and voltage sensitivity; worked: 30 divisions for 1.2 mA on 40 Ω, 40 μA per division, 25 div per mA, 0.625 div per mV; the shunt; worked: 24 Ω, 2.5 mA to 0–0.50 A, S ≈ 0.121 Ω, meter ≈ 0.120 Ω; the series resistance; worked: the same galvanometer as a 0–3 V and 0–12 V meter, 1176 Ω and 3600 Ω; meters loading a circuit (a 2.0 kΩ voltmeter reads 3.0 V instead of 4.0 V).
- Visuals on 33 of 33 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 9 SVGs — the coil face-on with the forces on its four sides, the coil from above with the couple and its arm b sin θ (adapted from `cbse-12-physics-ch04/src/svgs.mjs` TORQUE), the right-hand rule for m, field lines of a current loop as a magnetic dipole (r = L sin²φ), the Bohr orbit with L and μ, the galvanometer from above (radial field, coil at a 20° deflection) and from the front (construction), the ammeter with its shunt and the two-range voltmeter (worked-example values); plots of τ/τmax against θ, of the current needed against the deflection for a radial and a uniform field, and of a voltmeter’s reading against its resistance.

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 7 | 1 (keys a 4, b 1, c 1, d 1) |
| true-false | 2 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 (galvanometer parts and their roles) |
| numerical | 22 | 1 (8) or 2 (14) |
| short | 8 | 2 |
| short | 9 | 3 (four derivations: τ = NIAB sin θ, μ = (e/2mₑ)L with the Bohr magneton, I = kθ, the shunt and series resistance; the two sensitivities; and four problems) |
| long | 5 | 5, set in parts with the marks shown (torque derived with a coil problem and its rest position; the loop as a dipole and the electron in the third Bohr orbit; galvanometer construction, I = kθ and sensitivities; ammeter and voltmeter from one galvanometer; a voltmeter loading a divider, with the least meter resistance for 1% accuracy) |

- **Difficulty:** d1 5 · d2 32 · d3 29 · d4 6. **Competency:** recall 3 · understanding 23 · application 32 · analysis 11 · evaluation 3: application or higher **64% of items (68% of marks)**.
- **Topic tags:** t01 20 · t02 18 · t03 19 · t04 16.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q002, q019, q036, q054, q008 · B q009, (q044 or q064) · C q010, (q046 or q066) · D q070.
- **Long (40 marks, 100 min):** A q007, q011, q015, q021, q033, q037, q050, q048, q062, q063, q029, q039 · B q020, q045, (q024 or q065) · C q034, q047, q067, (q017 or q053) · D q068, (q069 or q071).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 39 scripted re-solve checks pass.
- 20 diagram self-checks (forces on the four sides and the couple as cross products; arm b sin θ; m by the right-hand rule in three drawings; dipole lines r = L sin²φ with the equatorial field opposite to m; L and μ opposite for the electron; radial field lines through the core centre and B in the coil plane at a 20° deflection; coil centred between the poles; shunt and series resistances re-solved against the drawn values): 0 failures.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-10-31)
Every question was re-solved from its stem. Findings and fixes:
1. **Numerical key:** the angle item (q006) reached its key 37° only through “≈”, which the stage-5 check reported; the solution now states θ = 36.9° and rounds it.
2. **Worked example 5:** a p.d. written as 1.2 × 10⁻³ × 40 = 48 (mV) failed the arithmetic lint; it is now written with units, 1.2 mA × 40 Ω = 48 mV.
3. **Wording:** the match item’s first role was made a full sentence like the others; the loading long answer now says that R_p is in kΩ and the 5.94 is in volts.
4. **Facts double-checked:** θ in τ = NIAB sin θ is from the normal (plane at 30° → θ = 60°); clockwise current seen from above gives m downwards; ẑ × x̂ = ŷ for the torque item; a wire rewound from one to two turns halves m (m = IL²/4πn); far axial field falls as 1/x³ (B/8 at 2x); μ/L = e/2mₑ ≈ 8.79 × 10¹⁰ C kg⁻¹; μB = eh/4πmₑ = 9.28 × 10⁻²⁴ A m² with the rounded constants (9.27 × 10⁻²⁴ quoted as the accepted value); I ∝ 1/n³ and μ ∝ n in Bohr orbits; in a uniform (not radial) field I ∝ φ/cos φ; doubling N doubles the current sensitivity but halves the figure of merit and leaves the voltage sensitivity unchanged when G doubles too; ammeter resistance is exactly G/n, so five times the range gives one fifth of the resistance; a 4.0 kΩ voltmeter across one of two 4.0 kΩ resistors on 12 V reads 4.0 V; 198 kΩ is the least voltmeter resistance for 1% accuracy across 6.0 kΩ in the 3.0 kΩ + 6.0 kΩ divider.

## Known gaps
- Diagrams asked for in answers (coil forces, galvanometer construction, meter circuits) are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
