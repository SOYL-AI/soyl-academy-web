# ISC Class 12 Physics, Chapter 9 — Magnetism and Matter

`isc-12-physics-ch09` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 19 slides), notes (5 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch09_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch09_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch09/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch09: t01 the bar magnet as an equivalent solenoid (m = NIA, aligned atomic current loops), magnetic field lines as closed loops (no monopoles, S → N inside the magnet) compared with electric field lines (ending on charges, E opposite to p between them); t02 the field of a magnetic dipole end-on, (μ₀/4π)2md/(d² − l²)², and broadside-on, (μ₀/4π)m/(d² + l²)^(3/2), with the short-magnet forms 2m/d³ and m/d³, and the torque τ = m × B on a magnet in a uniform field (no net force, stable and unstable positions); t03 magnetic flux Φ = BA cos θ and flux density, with the weber, the tesla (Wb m⁻²) and the gauss (10⁻⁴ T); t04 magnetisation M, magnetic intensity H, B = μ₀(H + M), susceptibility χ and μr = 1 + χ, dia-, para- and ferromagnetism, domains, Curie’s law χ = C/T and the Curie temperature; t05 electromagnets (B ≈ μ₀μr nI, factors, saturation), the B–H loop with retentivity and coercivity (qualitative), and the choice of materials for permanent magnets, electromagnets and transformer cores.
- Removed in the ISC scope and not examined: derivations of the fields of a bar magnet on its axis and equator (the formulae are quoted and used), defining B by the force on a unit pole (no pole-strength items), and any quantitative treatment of the B–H loop (the loop area is said to measure the loss per cycle, but nothing is calculated from it).
- Not duplicated from ch08: the current loop as a magnetic dipole, the orbital moment of the electron and the galvanometer. The torque law is quoted from ch08 and applied to magnets. Changing flux and induction are left to ch10; eddy currents in transformer cores are only mentioned by the word “laminated”.

## Shape
- **Part 1 (t01–t03, 18 slides):** bar magnet field lines; the equivalent solenoid; worked: 0.90 A m² magnet as a 500-turn solenoid of radius 1.2 cm needs about 3.98 A; electric dipole and bar magnet lines compared; end-on and broadside-on formulae; worked: a 5.0 cm magnet of 0.40 A m² at 10 cm, 9.10 × 10⁻⁵ T end-on and 3.65 × 10⁻⁵ T broadside-on against 8.0 and 4.0 × 10⁻⁵ T from the short-magnet forms; the 1/d³ fall-off; torque on a magnet; worked: 0.60 A m² in 0.025 T, 0.015 N m and 7.5 × 10⁻³ N m at 30°; magnetic flux; units of B; worked: a 12 cm square loop in 0.50 T, 7.2 and 3.6 mWb and zero, 5000 G.
- **Part 2 (t04–t05, 19 slides):** M and H; χ and μr; worked: 2400 turns m⁻¹, 0.50 A, χ = 349, B ≈ 0.528 T, M = 4.188 × 10⁵ A m⁻¹; three kinds of material; dia, para and ferro compared; Curie’s law; worked: χ = 5.6 × 10⁻⁴ at 200 K, C = 0.112 K, 3.5 × 10⁻⁴ at 320 K, 8.0 × 10⁻⁴ at 140 K; domains and the Curie temperature; electromagnets; worked: 360 turns on 12 cm, 0.25 A, μr = 1400, 9.42 × 10⁻⁴ T empty and about 1.32 T with the core; the B–H loop; soft iron and steel compared; choosing materials.
- Visuals on 37 of 37 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 11 SVGs — bar magnet and equivalent solenoid field lines (traced from the solenoid’s turns, adapted from `cbse-12-physics-ch05/src/svgs.mjs`), an electric dipole beside a bar magnet (traced lines), end-on and broadside-on points with the field arrows in the computed ratio, the torque on a magnet, flux through a face-on and a tilted surface, dia-, para- and ferromagnetic samples in a uniform field (exact cylinder solution, from the CBSE chapter), domains, an electromagnet, a B–H loop with retentivity and coercivity marked, and soft-iron and steel loops compared; plots of the end-on and broadside-on fields against distance, of Φ/BA against θ and of χ against T for the Curie-law salt.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 7 | 1 (keys a 4, b 1, c 1, d 1) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 (units of quantities describing a magnetised steel bar) |
| numerical | 19 | 1 (9) or 2 (10) |
| short | 8 | 2 |
| short | 9 | 3 (equivalent solenoid with a current; finite-length against short-magnet field; torque and a reversed field; flux at three orientations; H, B and M in a cored solenoid; μr = 1 + χ derived with copper; atomic origin of the three kinds of magnetism; strengthening an electromagnet and saturation; the B–H loop described) |
| long | 5 | 5, set in parts with the marks shown (magnet and solenoid with m, B and Φ; end-on and broadside-on formulae with a field and a torque; a Rowland ring: H, μr, χ, M and heating above 1043 K; the three classes with Curie’s law and a salt; the B–H loop, soft iron against steel, and materials for a bell, a galvanometer and a transformer) |

- **Difficulty:** d1 8 · d2 26 · d3 32 · d4 5. **Competency:** recall 5 · understanding 21 · application 35 · analysis 9 · evaluation 1: application or higher **63% of items (70% of marks)**.
- **Topic tags:** t01 11 · t02 17 · t03 13 · t04 20 · t05 14.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q013, q027, q042, q055, q003 · B q006, (q048 or q061) · C q022, (q050 or q064) · D q067.
- **Long (40 marks, 100 min):** A q001, q008, q019, q020, q030, q040, q041, q043, q054, q056, q018, q059 · B q021, q034, (q049 or q062) · C q007, q024, q063, (q035 or q052) · D q068, (q069 or q071).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 38 scripted re-solve checks pass.
- 30 diagram self-checks (bar-magnet and solenoid lines closed, S → N inside and N → S outside; electric lines ending on −q with E opposite to p between the charges; end-on and broadside-on formulae against the pole model, the drawn arrows in the computed ratio 2.96 : 1 at d = 3l and the ratio tending to 2; the torque m × B and the drawn turning sense; 6 and 3 field lines crossing the two surfaces, a ratio of cos 60°; field inside the three cylinders; domain resultants; electromagnet polarity by the right-hand rule; B–H loop retentivity, coercivity, closure at saturation, traversal sense and first-magnetisation curve inside the loop; steel loop wider with larger coercivity and area, soft iron with the slightly larger retentivity): 0 failures.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-01)
Every question was re-solved from its stem. Findings and fixes:
1. **Competency balance:** the first build had 66% of items at application or above, over the 45–65% band of the stage-4 lint; the loudspeaker MCQ (q055) and the transformer-core short answer (q061), which ask for recalled reasons rather than a new situation, are now tagged understanding (63%).
2. **Wording:** the loudspeaker item now says “voice coil” (the usual name) instead of “speech coil”.
3. **Diagram:** the bar-magnet lines in the electric-dipole comparison were being cut off where they pass close to the end turns of the model solenoid; they are now traced with a finer step and all eight close.
4. **Facts double-checked:** inside a magnet B is along m while between the charges of a dipole E is opposite to p; the bent strip has m/√2 (two perpendicular moments of m/2); end-on 2md/(d² − l²)² and broadside-on m/(d² + l²)^(3/2) (both checked against the pole model in the build) with the short-magnet ratio 2; 1 : 4 for end-on at 20 cm against broadside-on at 10 cm; matching broadside-on distance 30/2^(1/3) ≈ 23.8 cm; neutral points of a magnet pointing north lie broadside-on (east–west line), 10 cm for 0.40 A m² in 4.0 × 10⁻⁵ T; m × B for m north and B east points down (clockwise from above); a flat loop on a bench in B at 30° above the horizontal has its normal at 60° to B; the flux through a hemispherical bowl equals that through its rim, πR²B; 1 G = 10⁻⁴ T; χ = μr − 1 = −1.0 × 10⁻⁴ for μr = 0.99990; copper χ ≈ −9.6 × 10⁻⁶; Curie temperatures iron ≈ 1043 K, cobalt ≈ 1390 K, nickel ≈ 631 K, gadolinium ≈ 293 K; at fixed H a paramagnet’s M ∝ 1/T; soft iron has a lower coercivity and a slightly higher retentivity than steel (as ISC texts state), and a narrower loop; the Rowland ring gives μ₀H = 4.0 × 10⁻⁴ T exactly, so μr = 1500.

## Known gaps
- Diagrams asked for in answers (field-line patterns, the B–H loop) are described in words; graders should accept any correct sketch.
- The B–H loop diagrams are qualitative models (the soft-iron and steel loops share one H scale, not to scale).
- Narration was not yet run through TTS (stage 8); slide `audio` is null.

## Competency audit 2026-11-05

Follow-up to the content-verifier audit `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`, which named ISC 12 Physics ch09 onwards as a lead (the handoff reports one-step items relabelled to stay under 65%). The subject-producer re-read every objective and numerical item tagged application or higher against the audit's definitions: a single formula substitution (with or without a unit conversion), or a stated rule applied directly, is **understanding**; chained relations, a non-routine step (plane vs normal, round trips, reversibility) or a new set-up keep application or analysis. Retagged application/analysis → understanding, with no text, key or solution changed: `q005` (I = m/NA), `q010` (end-on field of a short magnet), `q011` (broadside-on field, finite length), `q012` (end-on field, finite length), `q015` (τ = mB sin θ), `q016` (m from τ), `q019` (sin θ = ½), `q025` (m from a broadside-on field), `q031` (B = Φ/A in gauss), `q037` (χ = M/H), `q040` (χ = μr − 1, classify), `q065` (B = μr B₀).

Now: recall 5 · understanding 33 · application 23 · analysis 9 · evaluation 1; application or higher **33 of 71 = 46.5% of items (59% of marks)**, inside the 45–65% band. This supersedes the competency figures above. Short and long answers were not re-judged in this pass.
