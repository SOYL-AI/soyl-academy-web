# ISC Class 12 Physics, Chapter 18 — Dual Nature of Radiation and Matter

`isc-12-physics-ch18` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 18 slides), notes (5 sections), 30 flashcards, 75 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch18_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch18_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch18/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. `src/dump-svgs.mjs <dir>` writes the diagrams out for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch18: t01 the photoelectric effect — Hertz’s spark-gap observation (and Hallwachs’s charged plate), Lenard’s apparatus, photocurrent against intensity, collector potential and frequency, saturation current, stopping potential, threshold frequency, instantaneous emission, and why the wave theory fails (including a numerical estimate of the wave-theory delay); t02 quantisation of radiation (photons, E = hf = hc/λ), Einstein’s equation K_max = hf − W₀ = eV₀, threshold frequency and wavelength, work function, numericals on K_max, stopping potential, maximum speed, threshold wavelength and photon counting; t03 Planck’s constant and the work function from the stopping potential–frequency graph (slope h/e, f-intercept f₀, V₀-intercept −W₀/e) and photon momentum p = h/λ = E/c (force of an absorbed or reflected beam); t04 wave–particle duality, de Broglie λ = h/p = h/(mv), λ = h/√(2mqV) ≈ 1.22/√V nm for an electron; t05 electron diffraction and the Davisson–Germer experiment, **qualitative only** (apparatus, the 54 V peak near 50°, conclusion; Thomson’s rings).
- **Removed in ISC and not examined:** the quantitative treatment of the Davisson–Germer experiment and electron diffraction. No item asks for a Bragg-type or grating calculation; the 54 V / 50° figures appear only as the observation to be described.
- **Constants (stated in the stems):** h = 6.6 × 10⁻³⁴ J s (the value the decks state; CBSE ch11 uses 6.63), e = 1.6 × 10⁻¹⁹ C, c = 3 × 10⁸ m/s, mₑ = 9.1 × 10⁻³¹ kg, mₚ = 1.67 × 10⁻²⁷ kg; hence hc/e = 1237.5 eV nm and λ ≈ 1.22/√V nm for electrons. Approximate work functions: Rb 2.1, Ba 2.5, Sr 2.6, Ca 2.9, Mg 3.7, Al 4.1, W 4.5, Cu 4.7, Pt 5.6 eV (typical values; items give the value they use).
- The I–V curves for different frequencies are drawn for the **same number of photons per second** (so the saturation currents are equal); one short item makes the point that at equal intensity in W m⁻² the lower frequency gives the larger current.

## Shape
- **Part 1 (t01–t02, 19 slides):** Hertz’s observation; Lenard’s apparatus; photocurrent, intensity and potential; the effect of frequency; why the wave theory fails; worked: the wave-theory delay for a 2.0 W lamp 1.5 m from barium (about 9 min); photons; worked: a 6.0 mW, 412.5 nm LED (3.0 eV, 1.25 × 10¹⁶ photons/s); Einstein’s equation (energy picture); work function and threshold (table); worked: 225 nm on magnesium (5.5 eV, K_max 1.8 eV, V₀ 1.8 V, v 7.95 × 10⁵ m/s, λ₀ 334 nm, f₀ 8.97 × 10¹⁴ Hz); the equation explains the facts; worked: the LED beam on barium (V₀ 0.5 V, 6.0 × 10¹³ electrons/s, one photon in about 208 frees an electron).
- **Part 2 (t03–t05, 18 slides):** V₀ against f (barium and magnesium lines); reading h and W₀; worked: four mercury lines (254, 313, 365, 405 nm → 2.87, 1.95, 1.39, 1.06 V) give h ≈ 6.60 × 10⁻³⁴ J s and W₀ ≈ 2.0 eV; photon momentum; worked: a 2.0 mW, 495 nm beam (p 1.33 × 10⁻²⁷, 5.0 × 10¹⁵ photons/s, F 6.67 × 10⁻¹² N = P/c); wave–particle duality; de Broglie’s hypothesis; electrons through V; worked: 240 V (v 9.19 × 10⁶ m/s, λ 79.0 pm); Davisson–Germer apparatus and result; electron diffraction rings.
- Visuals on 37 of 37 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 6 SVGs — Hertz’s spark gaps with the glass sheet; Lenard’s apparatus with potential divider and reversing key (adapted from `cbse-12-physics-ch11`, copied not imported); the energy picture of Einstein’s equation drawn to scale for 225 nm on magnesium (30 px per eV, with a deeper electron); the Davisson–Germer apparatus with the detector at 50°; Davisson–Germer polar curves at 44, 54 and 64 V (qualitative); electron diffraction rings. **Plots (computed):** photocurrent against collector potential for three intensities and for three frequencies (barium, 0.25 V steps); photon energy against wavelength with barium’s work function; V₀ against f for barium and magnesium; the mercury-line data with the fitted line; electron λ against V.

## Question bank (75)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 8 | 1 (keys a 3, b 2, c 1, d 2) |
| true-false | 6 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 (photocell quantities and what each depends on; Davisson–Germer parts and roles) |
| numerical | 18 | 1 (6) or 2 (12) |
| short | 8 | 2 |
| short | 9 | 3 (wave-theory delay estimate; Lenard’s arrangement; a surface from one stopping potential; three graphs; the V₀–f line; a reflected laser beam; de Broglie for an accelerated electron (derivation); electron and photon of 2.0 keV; electron rings against X-ray rings) |
| long | 5 | 5, set in parts with the marks shown (Lenard’s apparatus and curves; Einstein’s equation with calcium at 248 nm; h and W₀ from four readings; de Broglie derivation with 1.5 kV electrons; the Davisson–Germer experiment) |

- **Difficulty:** d1 11 · d2 46 · d3 15 · d4 3. **Competency:** recall 3 · understanding 33 · application 24 · analysis 13 · evaluation 2: application or higher **52% of items (59% of marks)** (within the 45–65% band the stage-4 lint applies to physics) (superseded: see Competency audit 2026-11-05).
- **Topic tags:** t01 18 · t02 25 · t03 15 · t04 19 · t05 12 (multi-tagged items: the stopping-speed numerical and the LED photocurrent t01/t02; two shorts t01/t02; the two-metals MCQ t02/t03; the electron–photon momentum numerical t03/t04; the 2.0 keV short t04/t03; the microscope short and the de Broglie long t04/t05; the ring-evidence MCQ and the rings short t04/t05).

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q002, q016, q037, q051, q074 · B q012, (q062 or q072) · C q034, (q046 or q064) · D q066.
- **Long (40 marks, 100 min):** A q001, q003, q015, q017, q018, q019, q044, q050, q053, q068, q007, q060 · B q013, q045, (q033 or q065) · C q010, q011, q047, (q063 or q073) · D q036, (q049 or q075).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 43 scripted re-solve checks pass (photon energies recomputed in joules from hc/λ rather than the 1237.5 eV nm shortcut; speeds from ½mv²; de Broglie wavelengths from h/(mv) with v from the accelerating energy; graph items by re-deriving the readings from the found h and W₀).
- 7 diagram self-checks (hc/e = 1237.5 eV nm and λ√V = 1.2231 nm V^½; Hertz: every ultraviolet ray to the receiver gap crosses the glass; Lenard: light through the quartz window, electrons from C to A, slider on the rheostat; energy picture: drawn K_max = hf − W₀ = 1.8 eV and the deeper electron 1.0 eV; Davisson–Germer detector at 50°; the 54 V curve peaks at 50° with the largest spur; ring radii equal L tan θ of the drawn cones): 0 failures.
- Rebuild is byte-identical (md5 of release.json and tests.json unchanged across two builds). release.json is about 356 KB (plot series kept to 0.25 V steps).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-01)
Every question was re-solved from its stem. Findings and fixes:
1. **Wrong supporting fact:** the car assertion-reason said a car’s wavelength is of order 10⁻³⁸ m; for 1000 kg at 5 m/s it is 1.3 × 10⁻³⁷ m, so the solution now says 10⁻³⁷ m (the re-solve check caught it).
2. **Key traceable in the solution:** nine numericals asked “in units of 10ⁿ” only stated the scaled value in words; each solution now ends with an explicit step giving the key (e.g. n/10¹³ = 3.0, h/10⁻³⁴ J s = 6.6, 5.98 × 10⁻¹⁸/1.6 × 10⁻¹⁹ = 37.4 eV).
3. **Precision of a claim:** the electron-microscope short said electrons at 25 kV have a wavelength “10⁵ times” shorter than light; against 500 nm it is 6.5 × 10⁴, now stated.
4. **Wording:** the green-LED MCQ now gives hc before the stem ends; the Davisson–Germer crystal MCQ gives λ ≈ 0.1–0.2 nm for electrons of tens of eV; the duality short was trimmed to its 30–50-word limit.
5. **Difficulty spread:** the h-from-four-readings long, the 2.0 keV comparison and the wave-theory delay estimate are d4, so the bank has hard items (the lint asks for some).
6. **Originality:** every set-up was checked against `cbse-12-physics-ch11` (Dual Nature of Radiation and Matter): none of its metals and numbers are reused (potassium 2.25 eV with 400 nm, zinc 4.3 eV, caesium 2.1 eV, the 10 W sodium lamp, the 620, 500, 633, 650, 600, 589, 450, 470, 330/550, 300 and 250 nm items, stopping potentials 0.75, 1.5 and 2.0 V, electrons at 100, 150 and 400 V, the 0.10 nm and 1.0 nm items, the slow neutron, proton–alpha ratio, cricket ball and the 9.0/6.0 and 8.0/6.0 × 10¹⁴ Hz data); this chapter uses h = 6.6 × 10⁻³⁴ J s, so even similar set-ups give different numbers. Short stems (fill-blank, true-false, assertion-reason) name their own set-up (Lenard’s tube, strontium’s 476 nm, the garage doorway, the infrared heater).
7. **Facts double-checked:** 375 nm → 3.3 eV (5.28 × 10⁻¹⁹ J); 540 nm → 2.29 eV (only Rb of 2.1/2.9/4.1/5.6 eV); Sr 2.6 eV → 476 nm; W 4.5 eV → 1.09 × 10¹⁵ Hz; 210 nm on Cu 4.7 eV → 1.19 ≈ 1.2 V; 275 nm with V₀ 1.6 V → W₀ 2.9 eV; 3.0 eV with K 0.80 eV, λ halved → 3.8 eV; 12 mW, 365 nm, 1 in 200 → 17.7 μA; 4.8 μA → 3.0 × 10¹³ s⁻¹; V₀ 0.91 V → 5.66 × 10⁵ m/s; 1.0 W at 3.0 m, 2.0 × 10⁻²⁰ m², 3.0 eV → 2.7 × 10³ s (45 min); 480/240 nm on Rb → V₀ 0.48 and 3.06 V, current ratio 2 : 1; 1.25 V → 2.0 × 10⁻¹⁹ J; 410/680 nm on Ca 2.9 eV → 3.02 and 1.82 eV; Ba λ₀ 495 nm, 560 nm → 2.21 eV; 280 nm, 1.32 V → W₀ 3.10 eV, λ₀ 399 nm, 230 nm → 2.28 V; 248 nm on Ca → 2.09 eV, 8.57 × 10⁵ m/s; (7.5 × 10¹⁴, 0.62 V) and (1.15 × 10¹⁵, 2.27 V) → h 6.6 × 10⁻³⁴, W₀ 2.47 eV, f₀ 6.0 × 10¹⁴ Hz; f₀ 8.0 × 10¹⁴ with 1.65 V at 1.2 × 10¹⁵ → h 6.6 × 10⁻³⁴, W₀ 3.3 eV; 7/9/11/13 × 10¹⁴ Hz → 0.49/1.31/2.14/2.96 V → h 6.59 × 10⁻³⁴, f₀ 5.81 × 10¹⁴, W₀ 2.39 eV; 220 nm → 3.0 × 10⁻²⁷; 825 nm → electron 879 m/s; 3.0 W absorbed → 1.0 × 10⁻⁸ N; 8.0 mW, 660 nm reflected → 2.67 × 10¹⁶ s⁻¹, 5.33 × 10⁻¹¹ N; 0.11 nm vs 550 nm → 5000; equal speeds λₑ/λₚ 1835; λ/3 → 9V; 600 V → 49.9 pm; 0.20 nm → 37.4 eV; 66 kg at 10 m/s → 1.0 × 10⁻³⁶ m; 2.2 × 10⁶ m/s → 0.330 nm; 50/800 V → 4; 2.0 keV → photon 0.619 nm, electron 0.0273 nm, factor 23; 25 kV → 7.7 pm; 1.5 kV → 31.6 pm.
8. **For the reviewer:** the Davisson–Germer facts (nickel crystal, peak at 54 V near a 50° scattering angle, weaker at 44 and 64 V) are stated qualitatively; the polar figure is schematic. The I–V frequency figure assumes an equal photon rate. Work functions are typical values and vary with the surface; each item states the value used. The wave-theory delay items assume an electron collects energy over roughly an atomic area, as textbooks do.

## Known gaps
- Diagrams asked for in answers (Lenard’s apparatus, the Davisson–Germer apparatus, graphs) are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.

## Competency audit 2026-11-05
Follows the audit's ISC 12 Physics lead (`docs/platform/content-qa/2026-11-05-competency-retag-audit.md`). Rule applied: one-formula substitutions (with or without a unit conversion) and directly applied stated rules are understanding; chained relations, a non-routine step or a new set-up keep application.
- **Retagged to understanding:** q008, q009, q015, q020, q044, q050, q051, q054, q058. Of these, q009, q015, q020, q044 and q058 were then rewritten (below) and are application again for real.
- **Rewritten as genuine application items (same key, type, marks, topic, test slots):** q009 (Einstein's equation then the electron speed: photon energy at 300 nm, minus the work function, then v = √(2K/m); d3); q015 (photon energy at 375 nm, then photons per second from a 2.0 mW output, MCQ with slip-based distractors; d2); q020 (interpret two stopping-potential readings: slope, then threshold frequency, then threshold wavelength; d3); q044 (equal-wavelength electron and photon: compare kinetic energy with photon energy through p = h/λ; d3); q058 (de Broglie wavelength of a 50 eV electron compared with the wavelength of a 50 eV photon; d3).
- **New counts (75 items):** recall 3 · understanding 37 · application 20 · analysis 13 · evaluation 2: application or higher 35/75 = **46.7% of items (56% of marks)**; difficulty d1 10 · d2 43 · d3 19 · d4 3.
- Short and long answers were not re-judged.
