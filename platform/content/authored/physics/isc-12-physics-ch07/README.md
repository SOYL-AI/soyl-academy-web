# ISC Class 12 Physics, Chapter 7 — Moving Charges and Magnetic Field

`isc-12-physics-ch07` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 17 slides), notes (6 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch07_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch07_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch07/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch07: t01 Oersted’s experiment, B defined by F = q(v × B) (tesla, gauss), the Biot–Savart law in vector form; t02 the field at the centre (derived) and on the axis (derived) of a circular coil of N turns; t03 Ampere’s circuital law, the long straight wire (derived), the long solenoid B = μ₀nI, and the formula for a finite straight conductor B = (μ₀I/4πa)(sin α + sin β); t04 the Lorentz force q(E + v × B) and its special cases: no work by the magnetic force, circular and helical motion, crossed fields (v = E/B); t05 the force on a conductor F = I(l × B) (derived from the drift of electrons), the force between parallel currents (derived), and the definitions of the ampere and the coulomb.
- Removed in the ISC scope and not examined: Ampere’s swimming rule (only the right-hand grip rule and the cross product are used), the derivation of the finite-conductor field (the formula is given and applied, including a square loop), and a qualitative treatment of the solenoid interior (the slide gives B = μ₀nI with one line on the Ampere-loop argument; no item asks for it).
- Torque on a current loop, the magnetic moment and the moving coil galvanometer belong to ch08 and are not touched here.

## Shape
- **Part 1 (t01–t03, 18 slides):** Oersted’s observation; defining B; worked: a 5.0 nC grain at 400 m s⁻¹ with 6.0 × 10⁻⁸ N gives 0.030 T (half the force at 30°); the Biot–Savart law; the centre of a coil derived; the axis of a coil; worked: 40 turns, 8.0 cm, 0.60 A gives 1.88 × 10⁻⁴ T at the centre and 0.512 of it 6.0 cm along the axis; Ampere’s law and the long wire; the long solenoid; the finite wire; worked: 12 A cable 8.0 × 10⁻⁵ T at 3.0 cm, 800 turns on 40 cm at 1.5 A 3.77 mT; worked: an 8.0 cm wire with 5.0 A gives 2.67 × 10⁻⁵ T at 3.0 cm, 0.80 of the long-wire value.
- **Part 2 (t04–t05, 17 slides):** the Lorentz force and its special cases (table); no work and circular motion; worked: an electron at 4.0 × 10⁶ m s⁻¹ in 2.0 mT, r = 1.14 cm, T = 1.79 × 10⁻⁸ s; helical motion; worked: a proton at 60° to 0.10 T, r = 2.71 cm, pitch 9.84 cm; crossed fields; the force on a conductor derived; worked: 60 cm wire, 5.0 A east in the Earth’s 4.0 × 10⁻⁵ T northward field, 1.2 × 10⁻⁴ N upwards; parallel currents derived; worked: 15 A and 4.0 A opposite at 6.0 cm, 2.0 × 10⁻⁴ N m⁻¹ repulsion; the ampere and the coulomb (with a note on the 2019 SI).
- Visuals on 35 of 35 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 12 SVGs — Oersted’s compass before and after (new), the force triad F = qv × B (new), a Biot–Savart element, the coil axis, Amperian circles round a wire, a solenoid section, a finite wire with its angles drawn to scale (new), a circular orbit, a helix with its pitch (new), crossed fields, a conductor in a field (new), and parallel currents (the unmarked ones copied from `cbse-12-physics-ch04/src/svgs.mjs`); plots of the coil’s axial field and of the finite-wire field against its length.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 6 | 1 (keys a 3, b 1, c 1, d 1) |
| true-false | 2 | 1 |
| fill-blank | 2 | 1 |
| numerical | 22 | 1 (8) or 2 (14) |
| short | 7 | 2 |
| short | 8 | 3 (derivations: field at the centre of a coil, long wire by Ampere’s law, radius and period of an orbit, force between parallel currents, F = I(l × B); plus the Biot–Savart/Coulomb comparison, the square loop and the three paths) |
| long | 5 | 5, set in parts with the marks shown (axis of a coil derived with a 5–12–13 numerical; Ampere’s law with a finite wire and a solenoid; Lorentz force with an electron orbit and the balancing electric field; parallel currents, the ampere and a wire held up magnetically; force on a conductor with a rod on rails) |

- **Difficulty:** d1 7 · d2 31 · d3 24 · d4 6. **Competency:** recall 4 · understanding 23 · application 29 · analysis 11 · evaluation 1: application or higher **60% of items (63% of marks)**.
- **Topic tags:** t01 15 · t02 11 · t03 16 · t04 15 · t05 14.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q001, q018, q030, q045, q063 · B q002, (q032 or q057) · C q036, (q050 or q060) · D q064.
- **Long (40 marks, 100 min):** A q006, q007, q008, q016, q017, q026, q027, q042, q044, q056, q034, q022 · B q009, q035, (q023 or q051) · C q010, q019, q047, (q033 or q061) · D q065, (q066 or q067).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; scripted re-solve checks all pass (28).
- 13 diagram self-checks (every field and force direction computed as a cross product and compared with the arrow drawn; finite wire and helix pitch drawn to scale): 0 failures. The diagrams were also rendered and inspected.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-10-31)
Every question was re-solved from its stem. Findings and fixes:
1. **Numerical solutions:** eleven solutions ended with “i.e. X in units of …” without an explicit “=” step to the key, which the stage-5 check flags; each now ends with a computed step (for example 3.14 × 10⁻⁴ / 10⁻⁴ = 3.14).
2. **Marking scheme:** the axis-of-a-coil long item’s scheme said 3.58 × 10⁻⁵ T; the computed value is 3.5749 × 10⁻⁵ T, so it now says 3.57.
3. **Word limits and narration:** the square-loop short (a calculation) is now free of the 50–80 word limit, as calculation items in ch04 are; the ampere-definition answer was cut from 63 to 55 words (inside the lint’s 20% slack on 30–50); one Part 2 narration was cut from 95 to 88 words.
4. **Facts double-checked:** with x east, y north, z up a northward current above a needle gives a westward field there (N pole swings west); x̂ × ŷ = ẑ for the Biot–Savart element; coil P (1 turn, R) and Q (3 turns, 3R) give equal central fields; rewinding a fixed wire into 2 turns gives 4 times the field; ∮B·dl = 7μ₀ for 4 + 6 − 3 A threading the loop; 1/(1 + 4)^(3/2) = 0.089 at x = 2R; a square loop of side 10 cm with 5.0 A gives 2√2μ₀I/πL = 5.66 × 10⁻⁵ T; the null point for 6 A and 4 A like currents 10 cm apart is 6.0 cm from the 6 A wire; r ∝ √(m/q) for the same accelerating voltage (alpha : proton = √2 : 1); a proton moving up in a northward field is pushed west, an electron moving east in an upward field north, a northward current in a downward field west; E = −v × B balances the beam; the coil cancelling 3.6 × 10⁻⁵ T needs 0.115 A with its plane perpendicular to the meridian; 3 A and 6 A wires feel equal forces.

## Known gaps
- Diagrams and graphs asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
- The definition of the ampere is given in its parallel-wire form, as the ISC syllabus asks; the slide notes that the 2019 SI fixes e instead.
