# ISC Class 12 Physics, Chapter 2 — Electric Flux and Gauss’s Theorem

`isc-12-physics-ch02` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch02_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch02_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch02/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch02: t01 flux of a vector field, the area vector, flux for uniform and non-uniform fields (θ = 0°, 90°, 180°); t02 Gauss’s theorem, net enclosed charge, properties of a Gaussian surface; t03 field of an infinitely long line of charge; t04 field of an infinite plane sheet (and of two parallel sheets); t05 field of a thin spherical shell inside, on and outside, with the E–r graph. Each derivation the outcomes ask for (t03–t05) is a 3-mark item and part of a 5-mark question.
- No removed topics in this chapter. Charged conductors and capacitance are ISC ch04.

## Shape
- **Part 1 (t01–t02, 14 slides):** flux of a vector field; electric flux; worked: 20, 10 and 0 N m² C⁻¹ through a 10 cm square; Gauss’s theorem; worked: 226 N m² C⁻¹ for +3 nC and −1 nC inside (+5 nC outside ignored); worked: charge at a cube centre, 1.13 × 10⁵ per face; choosing a Gaussian surface; Gauss and Coulomb equivalent.
- **Part 2 (t03–t05, 14 slides):** line of charge derived; worked: 1.1 × 10⁶ N C⁻¹ at 5 cm from 3 μC m⁻¹; plane sheet derived; worked: 2.26 × 10⁵ N C⁻¹, two plates 4.52 × 10⁵ between and 0 outside; shell outside and inside derived; worked: 0, 1.8 × 10⁴ and 4500 N C⁻¹ at 5, 10 and 20 cm from a 20 nC shell of radius 10 cm; distance dependence compared.
- Visuals on 28 of 28 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 5 SVGs — flux through a tilted plate (area vector checked normal to the plate), a closed surface with two charges inside and one outside, Gaussian surfaces for a line, a sheet and a shell, a charge at the centre of a cube, two oppositely charged parallel sheets; plots of E against r for a shell (zero inside, jump at R, 1/r² outside) and for a point, a line and a sheet compared.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 5 | 1 (keys a 2, b 1, c 1, d 1) |
| true-false | 2 | 1 |
| fill-blank | 1 | 1 |
| numerical | 18 | 1 or 2 |
| short | 7 | 2 |
| short | 8 | 3 |
| long | 5 | 5, set in parts with the marks shown (flux and Gauss with a cube; line of charge derived with numbers; sheet and two plates; shell derived with the E–r graph; a line charge beside a sheet with the null point) |

- **Difficulty:** d1 13 · d2 25 · d3 16 · d4 7 · d5 1. **Competency:** recall 4 · understanding 28 · application 22 · analysis 8: application or higher **48% of items (58% of marks)**.
- **Topic tags:** t01 13 · t02 21 · t03 12 · t04 12 · t05 13.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q001, q004, q031, q035, q025 · B q020, (q034 or q042) · C q032, (q040 or q050) · D q055.
- **Long (40 marks, 100 min):** A q006, q007, q017, q018, q022, q030, q039, q048, q049, q019, q024, q054 · B q008, q023, (q053 or q027) · C q021, q026, q052, (q010 or q044) · D q058, (q056 or q057).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; scripted re-solve checks all pass.
- 3 diagram self-checks (area vector drawn normal to the tilted plate; charge drawn at the centre of the cube; parallel-sheet fields; Gaussian surfaces for line, sheet and shell): 0 failures
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-10-31)
Every question was re-solved from its stem. Findings and fixes:
1. **Balance:** the first build had 59 questions (minimum 60) and only two check slides in Part 2; three application/analysis items were added (two parallel wires, charge on a shell from its surface field, flux through a cylinder round a wire) and a check slide on the field of a wire.
2. **Stems:** each stem names its own set-up and numbers (cube corner, non-uniform field through a cube, hanging charged ball, concentric shells, a wire beside a sheet), distinct from the author’s CBSE 12 Physics ch01 Gauss items.
3. **Facts double-checked:** Φ = EA cos θ with θ from the normal (an item gives the angle from the plane, 30°, so θ = 60°); outside charges give no net flux; a charge at a cube corner gives q/8ε₀ through the cube; a closed cylinder in a uniform field has zero net flux with −EπR² through the entry face; E = λ/(2πε₀r), σ/2ε₀, σ/ε₀ between opposite sheets and 0 between like sheets; a shell gives 0 inside and kq/r² outside; the concentric-shell values 0, 1600 and 288 N C⁻¹; the null point between a positive line and a positive sheet at x = λ/(πσ) ≈ 0.191 m, and none beyond the wire.

## Known gaps
- Diagrams and graphs asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
