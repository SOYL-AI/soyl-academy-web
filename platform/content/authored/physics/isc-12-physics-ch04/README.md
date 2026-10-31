# ISC Class 12 Physics, Chapter 4 — Capacitance and Dielectrics

`isc-12-physics-ch04` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch04_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch04_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch04/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch04: t01 conductors in electrostatics, free and bound charges, C = Q/V; t02 the parallel-plate capacitor (derived); t03 series and parallel combinations (derived) and mixed networks; t04 energy stored, U = ½CV² = ½QV = Q²/2C, energy density, energy lost when charged capacitors are joined; t05 dielectrics, polarisation (qualitative), K = C′/C₀, and the battery-connected and battery-disconnected cases; t06 a capacitor partly filled with a slab, C = ε₀A/(d − t + t/K).
- Removed in the ISC scope: the derivation of the energy stored. The slides explain the energy as the area under the V–Q line, but no item asks for the derivation; the energy-density expression is derived from ½CV² in one 2-mark item, as an application of the formula.

## Shape
- **Part 1 (t01–t03, 15 slides):** conductors in electrostatics; capacitance; worked: 10 pF for a 9 cm sphere and about 711 μF for the Earth; the parallel-plate capacitor derived; worked: 177 pF and 18 nC at 100 V; series and parallel derived; worked: a 6 μF network with 48, 24 μC and 4, 8 V; series and parallel compared.
- **Part 2 (t04–t06, 15 slides):** energy stored and energy density; worked: 0.10 J at 200 V on 5 μF and 0.18 J m⁻³ at 2 × 10⁵ V m⁻¹; worked: sharing between 4 μF and 1 μF, 40 V, 1 mJ lost; polarisation; dielectric constant; battery connected or disconnected (table); worked: 10 pF → 50 pF with K = 5 both ways; partly filled capacitor derived; worked: half filled with K = 4, C = 1.6C₀.
- Visuals on 30 of 30 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 5 SVGs — a charged conductor (field lines checked normal to the surface), a parallel-plate capacitor, a dielectric slab with induced surface charges, series and parallel combinations, a capacitor half filled with a slab drawn to scale; plots of V against Q (area = energy) and of C/C₀ against the filled fraction for K = 4.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 5 | 1 (keys a 3, c 1, d 1) |
| true-false | 2 | 1 |
| fill-blank | 2 | 1 |
| numerical | 22 | 1 or 2 |
| short | 7 | 2 |
| short | 8 | 3 |
| long | 5 | 5, set in parts with the marks shown (parallel-plate capacitor derived with charge, field and energy; series/parallel derived with a mixed network; dielectric with the battery on and off; partial and metal slabs; sharing charge between two charged capacitors) |

- **Difficulty:** d1 12 · d2 24 · d3 23 · d4 8. **Competency:** recall 3 · understanding 29 · application 26 · analysis 9: application or higher **52% of items (58% of marks)**.
- **Topic tags:** t01 13 · t02 10 · t03 15 · t04 14 · t05 13 · t06 6.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q002, q004, q031, q047, q009 · B q028, (q007 or q050) · C q018, (q027 or q060) · D q063.
- **Long (40 marks, 100 min):** A q010, q011, q019, q029, q030, q041, q043, q055, q056, q062, q032, q057 · B q012, q020, (q042 or q045) · C q008, q034, q040, (q051 or q054) · D q064, (q065 or q066).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; scripted re-solve checks all pass.
- 4 diagram self-checks (conductor field lines checked normal to the surface; plate polarities; induced charges facing the plates; slab drawn to scale d : t = 2 : 1): 0 failures
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-10-31)
Every question was re-solved from its stem. Findings and fixes:
1. **Maths delimiters:** one solution (the series voltage-rating item) lost an opening “$” to template interpolation; restored.
2. **Check slides:** two check slides were added (field inside a conductor; capacitance with a partial slab) so each deck has three.
3. **Facts double-checked:** E = 0 inside a conductor and σ ∝ 1/R on joined spheres; C = 4πε₀R (1 μF needs R = 9 km); C = ε₀A/d (1 F at 1 mm needs 1.13 × 10⁸ m²); pulling plates apart with Q fixed raises V; series/parallel results and the 240 V limit for 2 μF (200 V) and 4 μF (80 V) in series; three 2 μF make 3 μF as two in series plus one in parallel; ½ of the energy lost when sharing with an identical capacitor; U ratios 1 : 2 in parallel and 2 : 1 in series; dielectric with battery on keeps E = V/d; C/C₀ = 1.5 for a half-thickness slab needs K = 3; restoring C needs an extra gap t(1 − 1/K).

## Known gaps
- Diagrams and graphs asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
