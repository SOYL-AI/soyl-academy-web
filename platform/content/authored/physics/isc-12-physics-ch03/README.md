# ISC Class 12 Physics, Chapter 3 — Electrostatic Potential and Potential Energy

`isc-12-physics-ch03` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 14 slides), notes (5 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch03_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch03_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch03/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. `questions-extra.mjs` holds the 6 items added in the verifier pass. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch03: t01 potential and potential difference (V = W/q₀), equipotential surfaces and their properties; t02 potential of a point charge (derived), graphs of E and V against r; t03 potential of a system of charges and of a dipole (axial, equatorial and general point for a short dipole, derived); t04 U = qV and the potential energy of systems of two and three charges; t05 U = −p·E for a dipole (derived) with the 0°, 90° and 180° cases.
- No removed topics in this chapter. Conductors, capacitance and dielectrics are ISC ch04.

## Shape
- **Part 1 (t01–t03, 16 slides):** potential and potential difference; equipotentials; potential of a point charge derived; worked: 150 V and 500 V m⁻¹ at 30 cm from 5 nC (V/E = r); worked: −100 V and 2.0 × 10⁻⁴ J for 2 μC moved 20 cm along 500 V m⁻¹; systems of charges; worked: 120 V at the midpoint of +4 and −2 nC, V = 0 at 0.20 m and 0.60 m; dipole potential (axial, equatorial, general); worked: 5.4 V, 0 and 2.7 V; dipole equipotentials.
- **Part 2 (t04–t05, 14 slides):** U = qV and the electronvolt; worked: 100 eV, 5.9 × 10⁶ m s⁻¹; two charges; three charges; worked: 0.09 J for +3, +2 and −1 μC; dipole energy derived; worked: −1 mJ, 1 mJ to 90°, 2 mJ to 180°; field and potential compared.
- Visuals on 30 of 30 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 6 SVGs — point-charge equipotentials (radii r, 2r, 3r at V, V/2, V/3), dipole equipotentials traced numerically and checked constant with the V = 0 bisector, uniform-field equipotential planes, a triangle of charges, a dipole and a general point (exact potential within 3.5% of p cos θ/r² at r = 3.75a, checked), a dipole at 0°, 90° and 180° with its energy; plots of V and E against r and of U/pE against θ.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 18 | 1 (keys a 5, b 5, c 4, d 4) |
| assertion-reason | 5 | 1 (keys a 2, b 1, c 1, d 1) |
| true-false | 4 | 1 |
| fill-blank | 1 | 1 |
| numerical | 21 | 1 or 2 |
| short | 7 | 2 |
| short | 8 | 3 |
| long | 5 | 5, set in parts with the marks shown (point-charge potential derived with numbers; dipole potential derived; three-charge energy and the potential at the centroid; dipole energy derived with numbers; parallel plates, equipotentials and an accelerated electron) |

- **Difficulty:** d1 15 · d2 30 · d3 18 · d4 6. **Competency:** recall 4 · understanding 33 · application 26 · analysis 6: application or higher **46% of items (55% of marks)**.
- **Topic tags:** t01 19 · t02 11 · t03 16 · t04 18 · t05 10.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q001, q017, q032, q053, q045 · B q046, (q011 or q047) · C q022, (q030 or q054) · D q059.
- **Long (40 marks, 100 min):** A q002, q008, q009, q018, q035, q055, q036, q034, q014, q013, q031, q056 · B q033, q057, (q037 or q015) · C q012, q048, q049, (q023 or q024) · D q061, (q060 or q062).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; scripted re-solve checks all pass.
- 7 diagram self-checks (equipotentials of a dipole traced numerically and checked constant, its bisector at V = 0; point-charge equipotentials at V, V/2, V/3; uniform-field potentials falling along E; triangle of charges; dipole general point with the exact potential within 3.5% of p cos θ/r²; dipole energy rising from 0° to 180°): 0 failures
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-10-31)
Every question was re-solved from its stem. Findings and fixes:
1. **Balance:** the first build had 41% application-or-higher items and two check slides in Part 2; six application/analysis items were added (proton and alpha-particle energies, potential at a point in a uniform field, two-charge potential, closest approach of two protons, turning a dipole from 60° to 120°) and a check slide on the energy of a pair.
2. **Stems:** each stem names its own set-up and numbers, distinct from the author’s CBSE 12 Physics ch02 potential items.
3. **Facts double-checked:** V = kq/r and V/E = r; potentials add algebraically; dipole V = kp cos θ/r², zero on the equatorial line where E ≠ 0; V = 0 points for +6 and −2 nC at 0.30 m and 0.60 m from +6 nC; ring centre V = kQ/R, E = 0; U = kq₁q₂/r (−0.24 J for +4 and −2 μC at 0.30 m); four equal charges on a square U = (kq²/a)(4 + √2); U = −pE cos θ, W = pE(cos θ₁ − cos θ₂); the electron speeds 1.33 × 10⁷ m s⁻¹ (500 V) and 1.03 × 10⁷ m s⁻¹ (300 V), and 45.5 V to stop a 4.0 × 10⁶ m s⁻¹ electron.

## Known gaps
- Diagrams and graphs asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
