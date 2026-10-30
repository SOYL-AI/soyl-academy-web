# CBSE Class 12 Physics, Chapter 10 — Wave Optics

`cbse-12-physics-ch10` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (5 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch10_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch10_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch10/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 wavefronts and Huygens’ principle, with the proofs of the laws of reflection and refraction; t02 coherent sources, superposition and interference (I = 4I₀cos²(φ/2), conditions for sustained interference); t03 Young’s double-slit experiment, using β = λD/d without derivation as the outcome says (the path difference yd/D is given, not derived); t04 single-slit diffraction, qualitative, with the width of the central maximum.
- Polarisation is deleted from the 2026-27 syllabus and is not covered. Thin films, resolving power and the Fresnel distance are not in the outcomes and are left out.

## Shape
- **Part 1 (t01–t02, 16 slides):** wavefronts; Huygens’ principle; reflection and refraction proofs; worked: light entering glass (r = 28.1°, v = 2.0 × 10⁸ m s⁻¹, 400 nm); superposition and the bright/dark conditions; intensity 4I₀cos²(φ/2) and energy redistribution; coherent sources; worked: bright or dark (2.5λ dark, 2λ bright); worked: I_max/I_min = 9 and I = 3I₀ at φ = π/3.
- **Part 2 (t03–t04, 15 slides):** the double-slit set-up; fringe positions and β; worked: β = 3.0 mm, 9.0 mm and 4.5 mm, θ = 2.0 × 10⁻³ rad; what changes β (table); worked: λ = 550 nm from ten fringes, 1.24 mm in water; single-slit diffraction (two-halves argument); the single-slit pattern; worked: central maximum 12 mm; interference and diffraction compared.
- Visuals on 29 of 31 slides (largest gap 1).
- **Diagrams (5 SVGs):** wavefront types; Huygens reflection (BC = AE drawn equal, CE tangent to the wavelet from A); Huygens refraction (drawn lengths give sin i/sin r = v₁/v₂ = 1.5 for i = 45°, EC ⟂ AE); Young’s set-up with fringes at the computed β = 3.0 mm to scale; single slit with the path difference a sin θ marked. 6 self-checks, all pass. **Plots:** intensity against phase difference (coherent and incoherent); double-slit intensity against y/β; single-slit intensity computed point by point with zeros at a sin θ = ±λ, ±2λ, ±3λ (checked).
- **Narration:** 9–86 words per slide (mean 57), TTS-safe.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 15 | 1 (keys a 4, b 4, c 4, d 3) |
| assertion-reason | 7 | 1 (keys a 3, c 2, d 2) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 17 | 1 or 2 |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 (Huygens refraction with numbers; interference intensity derived from y₁ + y₂; YDSE positions and numbers; single slit; measuring λ with YDSE) |
| case-based | 3 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 7 prose short answers.
- **Difficulty:** d1 11 · d2 28 · d3 17 · d4 6 · d5 2.
- **Competency:** recall 5 · understanding 24 · application 29 · analysis 6. Application or higher **55% of items (65% of marks)**.
- **Topic tags:** t01 15 · t02 15 · t03 21 · t04 16.
- **Cases:** a two-slit laser experiment in Bhopal (covering a slit, β = 4.26 mm, red laser 5.2 mm, or evaluate two separate lasers); an adjustable razor-blade slit in Kochi (diffraction, 26 mm central band, why narrowing widens it, or evaluate a violet-laser claim); a ripple tank in Jaipur (frequency unchanged, r = 30.7°, Huygens explanation, or evaluate “attraction”).

## Chapter tests
- **Short (20 marks, 40 min):** A q006, q032, q050, q048 · B q024, q040, q041 · C q059 or q060 · D q062.
- **Long (40 marks, 90 min):** A q001, q004, q005, q008, q018, q023, q033, q047, q007, q016 · B q013, q039, (q025 or q054), q012, (q026 or q055) · C q057 + (q058 or q061) · D q063, q064.

## Validation
- Build: 0 validator errors, 0 warnings; 358 maths strings parsed (KaTeX strict); 15 SVG visuals / 5 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 30 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Phase item:** the first draft gave a path difference of 0.25 μm for 500 nm light and asked for 2I₀; that is λ/2 (φ = π, I = 0). The re-solve check caught it and the path difference is now 0.125 μm (φ = π/2, I = 2I₀).
2. **Match key:** the first solution text for the formula match listed the wrong letters for items 1, 3 and 4; it now matches the stored key (1 → s, 2 → q, 3 → p, 4 → r).
3. **Verifier minor flags:** eleven numerical solutions stated the key only after a unit change or an inverse sine; each now has an explicit “=” step (e.g. 2.0 × 10⁻³ × 10³ = 2.0 mm; r = sin⁻¹(0.429) = 25.4°).
4. **Diagrams:** the first render had labels overlapping rays and the medium names in the refraction figure; rays and labels were moved and the reflection figure now shows incident and reflected rays.
5. **Facts double-checked:** rays ⟂ wavefronts; Huygens forward envelope; i = r and sin i/sin r = v₁/v₂ = n₂/n₁; f unchanged, λ′ = λ/n; coherent = same frequency and constant phase difference; φ = 2πΔ/λ; I = I₁ + I₂ + 2√(I₁I₂)cos φ, I_max/I_min = (a₁ + a₂)²/(a₁ − a₂)², incoherent sum, average 2I₀; β = λD/d, nth dark fringe at (n − ½)β, angular width λ/d, β/n in a liquid, white central fringe; single-slit minima a sin θ = nλ, central maximum 2λ/a and 2λD/a, twice the width of secondary maxima; a = λ gives no minima; 2d/a fringes within the central diffraction maximum.

## Known gaps
- Diagrams asked for in answers are described in words; graders should accept any correct diagram.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
