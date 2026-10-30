# CBSE Class 12 Physics, Chapter 12 — Atoms

`cbse-12-physics-ch12` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (4 sections), 30 flashcards, 61 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch12_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch12_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch12/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 Thomson’s model, the Geiger–Marsden alpha-scattering experiment, Rutherford’s nuclear model, impact parameter (qualitative) and the distance of closest approach, drawbacks of the nuclear model; t02 Bohr’s postulates and the derivation of the radius, speed and energy of the nth orbit (the outcome asks for the derivation); t03 the hydrogen line spectrum explained qualitatively with energy levels (series, limits, line counts).
- The Rutherford scattering formula is shown only as a plot (N ∝ 1/sin⁴(θ/2)); it is not derived or examined. Hydrogen-like ions appear in one MCQ (He⁺ ground state, with the Z² factor given in the stem).
- Constants: 1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, h = 6.63 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg, hc ≈ 1243 eV nm, Eₙ = −13.6/n² eV, r₁ = 5.3 × 10⁻¹¹ m, v₁ = 2.18 × 10⁶ m s⁻¹. With these, the 3 → 2 line comes out at 658 nm; the slides and answers note that the measured value is 656 nm.

## Shape
- **Part 1 (t01, 16 slides):** Thomson’s model; the experiment; observations (with a computed N(θ) plot); the nuclear model; impact parameter; distance of closest approach; worked: 4.55 × 10⁻¹⁴ m for 5.0 MeV on gold; worked: 2.46 × 10⁻¹⁴ m for 5.5 MeV on silver; Thomson and Rutherford compared; the stability problem.
- **Part 2 (t02–t03, 16 slides):** Bohr’s postulates; radius and speed derived (r₁ and v₁ computed from the constants); energy; worked: n = 3 (4.77 × 10⁻¹⁰ m, 7.27 × 10⁵ m s⁻¹); worked: n = 2 energies (−3.4, +3.4, −6.8 eV); levels and lines; the series; worked: 3 → 2 line (1.89 eV, 658 nm); worked: Lyman limit 91.4 nm, first Lyman line 121.9 nm, six lines from n = 4; limits of the model (de Broglie standing waves).
- Visuals on 31 of 32 slides.
- **Diagrams (4 SVGs):** the Geiger–Marsden arrangement; alpha paths past a nucleus integrated numerically from the Coulomb force for five impact parameters (each deflection matches tan(θ/2) = d/2b; the head-on particle turns at r = d); Bohr orbits with radii 1 : 4 : 9 and a 3 → 2 photon; hydrogen energy levels to scale with the three series. 10 self-checks, all pass (including Bohr r₁, v₁, E₁ computed from ε₀, h, m, e within 1% of the rounded values). **Plots:** log N against θ; Eₙ against n.
- **Narration:** 10–72 words per slide (mean 55), TTS-safe.

## Question bank (61)
| Type | Count | Marks |
|---|---|---|
| mcq | 14 | 1 (keys a 4, b 4, c 3, d 3) |
| assertion-reason | 6 | 1 (keys a 3, b 1, c 1, d 1) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 16 | 1 or 2 |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 (the scattering experiment with closest approach; Bohr’s postulates and r, v derived; energy and the level diagram; the hydrogen spectrum; three models compared with the de Broglie check) |
| case-based | 3 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 7 prose short answers.
- **Difficulty:** d1 13 · d2 23 · d3 19 · d4 5 · d5 1.
- **Competency:** recall 8 · understanding 25 · application 22 · analysis 6. Application or higher **46% of items (57% of marks)**.
- **Topic tags:** t01 23 · t02 24 · t03 20.
- **Cases:** a hydrogen discharge tube in Chandigarh (series, 488 nm, why lines, or evaluate “more voltage, new colours”); a scattering simulation in Hyderabad (impact parameter, 37.9 fm, why most pass, or evaluate a thick foil); a hydrogen nebula at a Kolkata planetarium (13.6 eV, 658 nm, why it looks red, or evaluate “it glows because it is hot”).

## Chapter tests
- **Short (20 marks, 40 min):** A q004, q026, q043, q045 · B q013, q036, q051 · C q052 or q055 · D q057.
- **Long (40 marks, 90 min):** A q005, q011, q012, q015, q029, q034, q035, q038, q016, q037 · B q018, q019, (q032 or q049), q014, (q030 or q031) · C q053 + (q054 or q056) · D q058, q059.

## Validation
- Build: 0 validator errors, 0 warnings; 283 maths strings parsed (KaTeX strict); 19 SVG visuals / 4 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 22 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Trajectory figure:** the first integration started the alpha particles only 260 px from the nucleus with speed 1, so they had extra potential energy; the deflections came out 2–4° short of tan(θ/2) = d/2b and the head-on particle turned at 30 px instead of 34. The paths now start 20 000 px away with the correct energy and angular momentum, and all five deflections match to 0.1°.
2. **Worked examples:** Part 1 had only one worked example (lint editorial.examples); a silver-foil comparison was added and the later examples renumbered.
3. **Word limits:** two evaluation alternatives were 63 and 64 words against 30–50; both were tightened.
4. **Rounding:** the 4 → 2 wavelength (487.5 nm) was keyed as 488 nm but two schemes said 487 nm; all now say 488 nm.
5. **Facts double-checked:** Thomson predicts small deflections; about 1 in 8000 beyond 90°; thin gold foil for single scattering; d = 2Ze²/(4πε₀K) ∝ Z/K and ∝ projectile charge; nucleus/atom volume about 10⁻¹²; Bohr postulates; r ∝ n², v ∝ 1/n, f ∝ 1/n³, E = −13.6/n² eV, K = −E, U = 2E, L = nh/2π; 12.5 eV electrons reach n = 3 (12.09 eV) but not n = 4 (12.75 eV); He⁺ E₁ = −54.4 eV; series and regions; Lyman limit 91.4 nm; Balmer limit 366 nm; first Paschen line 1.88 μm; λ_L/λ_B (longest) = 5/27; n(n − 1)/2 lines; 2πr = nλ gives mvr = nh/2π, and πr₂ ≈ h/mv₂ (6.66 vs 6.68 × 10⁻¹⁰ m).

## Known gaps
- Diagrams and graphs asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
