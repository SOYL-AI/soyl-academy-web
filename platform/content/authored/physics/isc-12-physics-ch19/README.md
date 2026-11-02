# ISC Class 12 Physics, Chapter 19 — Atoms

`isc-12-physics-ch19` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (6 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch19_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch19_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch19/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. `src/dump-svgs.mjs <dir>` writes the diagrams out for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch19: t01 the Geiger–Marsden α-scattering experiment (apparatus, observations and conclusions), Thomson’s model and why it fails, Rutherford’s nuclear model, the distance of closest approach d = (1/4πε₀)(2Ze²/K) as an upper limit to the size of the nucleus (numericals), sizes of atoms and nuclei, and the limits of Rutherford’s model (radiating electron, collapse, continuous spectrum); t02 Bohr’s three postulates, the radius r_n = ε₀n²h²/(πme²) = 0.53n² Å and speed v_n = e²/(2ε₀nh) = 2.2 × 10⁶/n m s⁻¹ (both derived), the kinetic, potential and total energy (K = −E, U = 2E, E_n = −13.6/n² eV, derived), the significance of negative total energy, ionisation and excitation energies, and the limits of Bohr’s model; t03 the energy-level diagram, the Lyman, Balmer, Paschen, Brackett and Pfund series with their regions, the Rydberg formula 1/λ = R(1/n₁² − 1/n₂²) with R = me⁴/(8ε₀²ch³) = 1.097 × 10⁷ m⁻¹, wavelengths in nm from transitions, series limits, identifying the series and region of a line, line counts n(n − 1)/2 and absorption by cool hydrogen.
- **Removed in ISC and not examined:** the mathematical theory of α-particle scattering (impact parameter, Rutherford’s scattering formula). The trajectory diagram and the count-against-angle plot show the behaviour qualitatively; no item uses the formulas.
- Constants used and stated in the stems: 1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg, h = 6.6 × 10⁻³⁴ J s (as in ch18), ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻² in the two derivation items, r₁ = 0.53 Å, v₁ = 2.2 × 10⁶ m s⁻¹, E₁ = −13.6 eV, R = 1.097 × 10⁷ m⁻¹, and hc = 1240 eV nm where energies and wavelengths are converted (consistent with 13.6 eV and R to 1 part in 4000). Region edges as in ch12: ultraviolet below 400 nm, visible 400–700 nm, infrared above.
- Not here: the orbital magnetic moment of the Bohr electron (ch08), de Broglie waves (ch18; the standing-wave picture of Bohr’s condition is not used), nuclei (ch20).

## Shape
- **Part 1 (t01–t02, 18 slides):** Thomson’s model and its prediction; the Geiger–Marsden apparatus; the observations and conclusions; how a tiny nucleus explains them (computed α paths); distance of closest approach (energy plot of U against r for gold); worked: 5.0 MeV α on gold, d = 4.55 × 10⁻¹⁴ m, the atom about 3100 times larger; sizes of atom and nucleus; why Rutherford’s atom should collapse; Bohr’s postulates; radius of the nth orbit (derivation); speed of the nth orbit (derivation, v₁ ≈ c/137); worked: n = 5, r = 1.325 nm, v = 4.4 × 10⁵ m s⁻¹, 5.29 × 10¹³ revolutions per second.
- **Part 2 (t02–t03, 18 slides):** K, U and E in terms of r; E_n = −13.6/n² eV (derivation, plot of K, U, E against n); negative energy, ionisation and excitation; worked: n = 4, K = 0.85, U = −1.70, E = −0.85 eV, ionisation 0.85 eV, excitation from the ground state 12.75 eV; photons and the Rydberg formula; the five series; worked: 5 → 2, λ = 434.1 nm, violet Balmer line (2.856 eV); series limits and overlaps (log-wavelength strip); worked: identifying a 1282 nm line as Paschen 5 → 3; how many lines, absorption from n = 1; finding R from the Balmer lines (straight line of 1/λ against 1/n²); successes and limits of Bohr’s model.
- Visuals on 36 of 36 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 7 SVGs: the Geiger–Marsden apparatus in an evacuated chamber (detector at 135°); α paths past a gold nucleus integrated under the Coulomb force (RK4), the head-on path turning back at d; the classical collapse spiral of a Rutherford atom; Bohr orbits n = 1–4 to scale (1 : 4 : 9 : 16) with tangent speed arrows ∝ 1/n and a table of r and v; the hydrogen energy levels to scale with ionisation (13.6 eV), absorption of 12.09 eV and the 1.89 + 10.2 eV cascade; a schematic level diagram (not to scale) with all five series and their limits; a logarithmic wavelength strip of the five series (80 nm–8 μm) with the visible band. Plots: relative α count (log scale) against angle; U(r) for α and gold with the 5.0 and 8.0 MeV turning points; K, U, E against n (scatter, 18 points); 1/λ against 1/n² for the Balmer lines. All plots are analytic functions or a few points (release.json is 367 KB). The Geiger–Marsden and trajectory code is adapted from `cbse-12-physics-ch12` (copied, not imported); the other figures are new.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 15 | 1 (keys a 4, b 4, c 4, d 3) |
| assertion-reason | 6 | 1 (keys a 3, b 1, c 1, d 1) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 (scattering results and what each shows; electron jumps and wavelengths) |
| numerical | 19 | 1 (10) or 2 (9) |
| short | 8 | 2 |
| short | 9 | 3 (derivations: closest approach with lead, Bohr radius with r₁ evaluated, K/U/E in terms of r, the Rydberg formula with R evaluated; problems: three detector angles, an orbit of energy −0.378 eV, identifying a 1005 nm line, R and the Balmer limit from two measured lines; evaluation: Rutherford against Bohr) |
| long | 5 | 5, set in parts with the marks shown (Geiger–Marsden with platinum; postulates, radius and an orbit of 33.92 Å; energy derivation and ionisation from n = 2; level diagram and the Pfund range; two lines from a gas cloud) |

- **Difficulty:** d1 13 · d2 34 · d3 22 · d4 2. **Competency:** understanding 32 · application 19 · analysis 18 · evaluation 2: application or higher **55% of items (66% of marks)** (within the 45–65% band the stage-4 lint applies to physics).
- **Topic tags:** t01 21 · t02 27 · t03 26 (the energy long item and the Bohr-limitations short are tagged t02 and t03, the Rutherford-against-Bohr short t01 and t02).

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q002, q025, q049, q070, q008 · B q033, (q065 or q015) · C q018, (q062 or q036) · D q043.
- **Long (40 marks, 100 min):** A q001, q003, q004, q005, q021, q026, q031, q038, q039, q048, q032, q059 · B q017, q035, (q037 or q066) · C q016, q034, q064, (q063 or q042) · D q020, (q067 or q068).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 56 scripted re-solve checks pass (closest approaches re-solved by integrating the head-on motion of the α particle from 1 nm under the Coulomb force until it turns back; Bohr radii, speeds and energies recomputed from e, mₑ, h and 1/4πε₀; wavelengths recomputed from the energy levels with hc = 1240 eV nm; line counts by enumerating level pairs).
- 21 diagram self-checks (k e² = 1.44 MeV fm; first-principles Bohr values within 1% of the rounded constants; Rydberg wavelengths equal hc/ΔE; detector on its circle; computed α deflections agree with the Coulomb-orbit result, fall with the aim distance, and the head-on path turns back at d; collapse spiral monotonic; orbit radii 1 : 4 : 9 : 16 with tangent arrows ∝ 1/n; levels and arrows to scale, cascade closing; schematic levels ordered with shrinking gaps and 20 transitions on their series levels; strip positions at log λ, Balmer 3–6 visible and 7 → 2 ultraviolet, the infrared overlaps): 0 failures.
- Rebuilding is byte-identical (release.json and tests.json md5 unchanged across two builds).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-01)
Every question was re-solved from its stem. Findings and fixes:
1. **Sign slip in a deck check:** worked example 4 first asserted E₅ − E₂ = −2.856 eV; the build’s number check caught it and the energy now reads +2.856 eV.
2. **Rounding shown as equality:** “−3.40 + 3.12 = −0.277” (397 nm item), “13.6/64 = 0.21” (orbit of 33.92 Å) and “1.54 × 10⁻¹²/1.6 × 10⁻¹³ = 9.6” (tin item) were rewritten with one more figure or with ≈; the 33.92 Å scheme now says K ≈ 0.21 eV like the model answer.
3. **Final steps written out:** the cricket-ball and n = 5 ionisation items now end with an “=” step giving the key (1.9 km, 0.544 eV).
4. **Difficulty spread:** the half-energy uranium item and the R-from-two-lines short are d4, so the bank has hard items.
5. **Originality:** every set-up was checked against `cbse-12-physics-ch12` (Atoms): no shared numbers or set-ups (the CBSE 7.7, 6.0 and 4.0 MeV gold items, the 10 fm and Z-finding items, the n = 3 kinetic energy and ionisation, the n = 4 → 2, Paschen-first, n = 5 line-count, longest-Lyman, Lyman/Balmer longest ratio, n = 4 list, 12.5 eV electron, He⁺, de Broglie and planetarium/Chandigarh/Hyderabad cases are not used). Transitions here are 5 → 2 (deck), 6 → 2, 3 → 1, 6 → 3, 7 → 3, 5 → 3, 7 → 2, 4 → 5 → 6 energies, 6 → 4, Brackett and Pfund lines and limits; ISC ch08 (Bohr magnetic moment) is not repeated.
6. **Facts double-checked:** k e² = 1.44 MeV fm; d = 45.5 fm (5.0 MeV, Au), 24.6 fm (5.5 MeV, Ag), 9.6 MeV for 15 fm (Sn), 42.8 fm (1.6 × 10⁷ m s⁻¹, Au, K = 5.31 MeV), 73.6 fm half-energy point (7.2 MeV, U; d = 36.8 fm), 65.0 fm (3.5 MeV, Au), 49.2 fm (4.8 MeV, Pb), 32.1 fm (7.0 MeV, Pt); proton/α at equal speed 2 : 1; 3/4 of K left at 4d; 1.9 km cricket-ball atom; r₇ = 2.60 nm; r₁ = 5.27 × 10⁻¹¹ m from ε₀, h, m, e; v₃ = 7.30 × 10⁵ m s⁻¹; c/v₁ = 136; K₇ = 0.278 eV; U₂ = −6.8 eV; ionisation from n = 5 0.544 eV; n = 4 → 6 0.472 eV; 13.06 eV photon to n = 5; 6 → 3: ΔK = +1.13, ΔU = −2.27 eV; 3 → 1: ΔK = +12.09, ΔU = −24.18 eV; −0.378 eV: n = 6, 1.91 nm, 3.67 × 10⁵ m s⁻¹; 33.92 Å: n = 8, 2.75 × 10⁵ m s⁻¹, 0.21 eV; n = 2 ionisation 3.4 eV, 365 nm; muonic radius 2.6 × 10⁻¹³ m; wavelengths 121.5, 102.6, 656.3, 434.1, 410.2, 397.0, 1094, 1005, 1282, 1875, 2625, 4051, 4653, 7458 nm; limits 91.2, 364.6, 820.4, 1459, 2279 nm; Brackett lines shorter than 1875 nm from n₂ = 9 (1818 nm); 15 lines from n = 6; 21 from n = 7 with 9 in the Paschen, Brackett and Pfund series; R = 1.097 × 10⁷ m⁻¹ from 656.3 and 486.1 nm (limit 364.5 nm); R = 1.10 × 10⁷ m⁻¹ from 13.6 eV/hc.
7. **For the reviewer:** the Balmer series is called “visible and near ultraviolet” (lines from n₂ ≥ 7 and the 364.6 nm limit are below 400 nm); “about 1 in several thousand” α particles rebounding and a gold nucleus “about 7 fm” are stated as round figures; the vacuum-chamber MCQ and the apparatus description follow the usual textbook account of the experiment; the coldgas assertion-reason item quotes a room-temperature thermal energy of about 0.03 eV.

## Known gaps
- Diagrams asked for in answers (apparatus, energy-level diagram) are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
