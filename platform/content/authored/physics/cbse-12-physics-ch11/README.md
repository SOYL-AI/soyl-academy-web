# CBSE Class 12 Physics, Chapter 11 — Dual Nature of Radiation and Matter

`cbse-12-physics-ch11` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (4 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch11_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch11_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch11/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 electron emission, work function and the observations of Hertz, Hallwachs and Lenard; t02 the experimental study (photocurrent against intensity, collector potential and frequency; stopping potential; threshold; why the wave theory fails); t03 photons and Einstein’s photoelectric equation (work function, threshold frequency and wavelength, stopping potential, V₀–ν graph); t04 matter waves and the de Broglie relation.
- The Davisson–Germer experiment is deleted from the 2026-27 syllabus and is not covered; electron diffraction by crystals is mentioned only as the reason electron wavelengths matter.
- Constants used throughout: h = 6.63 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3.0 × 10⁸ m s⁻¹, mₑ = 9.1 × 10⁻³¹ kg, m_p = 1.67 × 10⁻²⁷ kg, so hc ≈ 1243 eV nm (stems quote the constants they need).

## Shape
- **Part 1 (t01–t02, 16 slides):** work function (approximate values for five metals); discovery; worked: V₀ = 1.5 V → 2.4 × 10⁻¹⁹ J, 7.26 × 10⁵ m s⁻¹; the photocell; effect of intensity, potential and frequency (three computed graphs); worked: h ≈ 6.64 × 10⁻³⁴ J s and φ₀ ≈ 2.0 eV from two readings; four observations; why the wave theory fails.
- **Part 2 (t03–t04, 15 slides):** photons; worked: 2.49 eV at 500 nm, 9.55 × 10¹⁵ photons per second from a 3.0 mW laser; Einstein’s equation; worked: 400 nm on potassium (3.11 eV, 0.86 eV, λ₀ = 552 nm); wave–particle duality; electrons through V; worked: 0.123 nm at 100 V and 1.47 × 10⁻³⁴ m for a cricket ball; worked: λₑ/λ_p = 42.8 at equal K.
- Visuals on 30 of 31 slides.
- **Diagrams (3 SVGs):** the photocell circuit (electrons drawn from emitter to collector); the energy bar hν = φ₀ + K_max drawn to scale for 400 nm on potassium; photons below and above threshold. 4 self-checks, all pass (including the V₀–ν plot: slope h/e and intercepts φ₀/h computed). **Plots:** photocurrent against intensity; I–V curves for three intensities (common stopping potential) and for three frequencies (common saturation), computed from a smooth schematic model; V₀ against ν for potassium and zinc; electron de Broglie wavelength against V.
- **Narration:** 8–75 words per slide (mean 55), TTS-safe.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 14 | 1 (keys a 4, b 4, c 3, d 3) |
| assertion-reason | 6 | 1 (keys a 3, b 1, c 1, d 1) |
| true-false | 3 | 1 |
| fill-blank | 1 | 1 |
| match | 1 | 2 |
| numerical | 20 | 1 or 2 |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 (the experiment and its graphs; Einstein’s equation with numbers; finding h and φ₀ from four readings; de Broglie for charged particles; photons and a below-threshold laser) |
| case-based | 3 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 9 prose short answers.
- **Difficulty:** d1 14 · d2 27 · d3 14 · d4 8 · d5 1.
- **Competency:** recall 6 · understanding 28 · application 22 · analysis 8. Application or higher **47% of items (59% of marks)**.
- **Topic tags:** t01 8 · t02 20 · t03 29 · t04 16.
- **Cases:** caesium photocells on Lucknow streetlights (dusk, λ₀ = 592 nm, why caesium, or evaluate a zinc emitter); an electron microscope in Bengaluru (why electrons, 5.49 pm at 50 kV, 200 kV, or evaluate a proton claim); LEDs on a photocell in Guwahati (what V₀ measures, φ₀ = 2.02 eV, why red gives nothing, or evaluate a brighter red LED).

## Chapter tests
- **Short (20 marks, 40 min):** A q005, q034, q045, q046 · B q008, q041, q039 · C q056 or q058 · D q062.
- **Long (40 marks, 90 min):** A q001, q014, q016, q032, q033, q047, q054, q063, q007, q035 · B q019, q038, (q020 or q051), q017, (q018 or q053) · C q055 + (q057 or q059) · D q060, q061.

## Validation
- Build: 0 validator errors, 0 warnings; 313 maths strings parsed (KaTeX strict); 12 SVG visuals / 3 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 32 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Photon long answer:** the first model answer said a 650 nm laser ejects electrons from a 2.0 eV surface; the photon energy is only 1.91 eV, so there is no emission. Parts (c) and (d) were rewritten (no emission at 5 mW or 10 mW; light below about 622 nm is needed) and the re-solve check now asserts K < 0.
2. **Maths delimiters:** a scripted edit dropped two opening “$” signs in that answer (lint latex.backslash error); restored.
3. **Diagram text:** five labels at 9 px were raised to the 10 px minimum.
4. **Balance:** an X-ray photon-energy MCQ and an assertion-reason item with key (d) were added so that the long test has eight non-check MCQs and the AR keys cover a–d.
5. **Facts double-checked:** 1 eV = 1.6 × 10⁻¹⁹ J; Hallwachs (negative plate discharges, neutral plate turns positive); photocurrent ∝ intensity; eV₀ = K_max; same V₀ for different intensities, same saturation for different frequencies (idealised); V₀–ν slope h/e for every metal, intercept ν₀; no time lag; E = hν, p = h/λ; K_max = hν − φ₀; ν₀ = φ₀/h, λ₀ = hc/φ₀; doubling ν more than doubles K_max; λ = h/p = h/√(2mK) = h/√(2mqV); electron 1.227/√V nm; equal K → λ ∝ 1/√m; equal p → equal λ; λ_p/λ_α = √8 through the same V.

## Known gaps
- Graphs asked for in answers are described in words; graders should accept any correct sketch. The I–V curves in the slides are schematic (their saturation currents and stopping potentials are exact; the shape of the rise is a smooth model).
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
