# ISC Class 12 Physics, Chapter 12 — Electromagnetic Waves

`isc-12-physics-ch12` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (6 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch12_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch12_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch12/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch12: t01 displacement current, basic idea only (the two-surface inconsistency of Ampère’s law for a charging capacitor, i_d = ε₀ dΦE/dt as a formula, i_d = dq/dt = C dV/dt = ε₀A dE/dt, continuity of current, the circular magnetic field round the gap, the Ampère–Maxwell law stated); t02 characteristics of EM waves (accelerated charges as sources, mutual regeneration of changing E and B, transverse nature with E ⊥ B ⊥ direction of travel along E × B, the labelled sketch, E and B in phase, c = 1/√(μ₀ε₀), E₀/B₀ = c, c = fλ, the properties common to all EM waves, Hertz’s confirmation); t03 the spectrum from radio to gamma rays (order both ways, approximate ranges, a source, a detector and uses for every band, ionising bands, the ozone layer and ionosphere, radar ranging d = ct/2).
- Removed in the ISC scope: the mathematical treatment of EM waves. No wave equation, wavenumber or field expression E = E₀ sin(kx − ωt) appears; numericals use only c = fλ, E₀ = cB₀, c = 1/√(μ₀ε₀), d = ct/2 and i_d = ε₀ dΦE/dt = C dV/dt. No photon energies are used (photons belong to later chapters).
- A short unit (2 marks of the paper) given the full chapter standard; with only three topics, t03 items are spread across many practical contexts (car key fob, DTH dish, GMRT, airport radar and baggage scanner, fever screening, banknote lamp, UV-C lamp, fibre links, dental X-rays, gamma sterilisation).

## Shape
- **Part 1 (t01–t02, 18 slides):** the two surfaces on one loop; displacement current and continuity; the circular B round the gap; worked: plates of 0.040 m², 1.5 mm apart, p.d. rising at 6.0 × 10⁵ V s⁻¹ give dE/dt = 4.0 × 10⁸ V m⁻¹ s⁻¹ and i_d = 0.142 mA (= C dV/dt); reading a q–t graph (3.0 mA, zero, 6.0 mA reversed); conduction and displacement current compared; how an EM wave sustains itself; the transverse sketch; c = 1/√(μ₀ε₀) and E₀ = cB₀; worked: c = 3.00 × 10⁸ m s⁻¹ and B₀ = 0.24 μT for E₀ = 72 V m⁻¹; properties common to all EM waves; worked: a 2.4 GHz Wi-Fi wave (12.5 cm, 4.17 × 10⁻¹⁰ s, 0.10 μs and 240 wavelengths across 30 m).
- **Part 2 (t03, 18 slides):** the seven bands and their ranges; the log-scale spectrum; worked: 2.45 GHz → 12.2 cm microwave, 3.0 μm → 1.0 × 10¹⁴ Hz infrared, 1.2 × 10¹⁸ Hz → 0.25 nm X-rays; one slide each for radio, microwaves, infrared, visible, ultraviolet, X-rays and gamma rays (source, detection, uses, hazards); worked: a 3.0 GHz radar with a 0.30 ms echo (10 cm, 45 km); the atmosphere and the spectrum.
- Visuals on 36 of 36 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 5 SVGs — a charging capacitor with a loop and two surfaces, and the circular B round the gap seen end-on (new), a plane EM wave with E, B and the direction of travel, the spectrum on a logarithmic wavelength scale (these three adapted from `cbse-12-physics-ch08/src/svgs.mjs`, with the radio/microwave boundary moved to 30 cm so that oven, phone and Wi-Fi frequencies fall in the microwave band), and what the atmosphere absorbs, passes and reflects (new); plots of the charge on a plate against time and of wavelength against frequency for 0.5–6 GHz; flow charts for a self-sustaining EM wave and for radar ranging.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 15 | 1 (keys a 4, b 4, c 4, d 3) |
| assertion-reason | 6 | 1 (keys a 2, b 1, c 1, d 2) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 (EM detectors; jobs in a city and the radiation that does them) |
| numerical | 17 | 1 (12) or 2 (5) |
| short | 8 | 2 |
| short | 9 | 3 (the proof that ε₀ dΦE/dt equals the lead current; a q–t graph; a capacitor’s C, dE/dt and i_d; the transverse sketch with B₀; how changing fields sustain a wave; classifying three radiations; ranges, sources and detectors; X-ray production and uses; evaluating a UV-C hand lamp) |
| long | 5 | 5, set in parts with the marks shown (displacement current with a constant charging current; the wave sketch and a green laser; a smartphone’s four kinds of wave; an airport radar with an approaching aircraft; infrared and ultraviolet) |

- **Difficulty:** d1 6 · d2 33 · d3 28 · d4 1. **Competency:** recall 3 · understanding 28 · application 25 · analysis 10 · evaluation 2: application or higher **54% of items (65% of marks)** (within the 45–65% band the stage-4 lint applies to physics) (superseded: see Competency audit 2026-11-05).
- **Topic tags:** t01 17 · t02 19 · t03 33 (one long is tagged t02 and t03).

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q002, q018, q034, q039, q028 · B q012, (q056 or q057) · C q014, (q060 or q033) · D q067.
- **Long (40 marks, 100 min):** A q001, q003, q017, q019, q020, q021, q035, q036, q037, q040, q010, q054 · B q013, q030, (q058 or q059) · C q015, q032, q062, (q016 or q063) · D q064, (q065 or q066).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 34 scripted re-solve checks pass (band names checked against the spectrum table with `bandOf`).
- 9 diagram self-checks (the plate the current enters drawn +, with E from + to −; B loops clockwise for i_d into the page, from z × x, with rings inside and outside the plate edge; E × B along the direction of travel and E, B in phase; spectrum bands contiguous and ordered, visible band narrow; atmosphere rays ending in the layer their fate says, and the fates matching the facts taught): 0 failures.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-01)
Every question was re-solved from its stem. Findings and fixes:
1. **Numerical keys:** the first build had seven numericals (MV s⁻¹, 10¹¹ V m s⁻¹, 10⁸ m s⁻¹, THz, 10¹⁴ Hz, cm) whose solutions gave the key only in words after the SI value; each now has an explicit “= key” conversion step, so the stage-5 check finds it.
2. **Word limits and difficulty:** the 2-mark answer on Maxwell’s value of c was 21 words of prose against 30–50 and was expanded; the radar long question (two echo times giving a speed) was raised to d4, as the lint asks for at least one harder item.
3. **Wording:** the speed gun in the jobs match is now a “radar gun” (many police guns are laser, i.e. infrared); the assertion-reason on UV-C now explains the (b) key by absorption, not by wavelength.
4. **Originality:** every set-up was checked against `cbse-12-physics-ch08` (Electromagnetic Waves), whose contexts collide easily: no shared numbers or scenes (e.g. a 50 nF timing capacitor and a 400 μF flash capacitor rather than 2.0 μF or 5.0 nF; square 12 cm plates rather than 0.050 m²; peak fields 72 V m⁻¹, 0.60 V m⁻¹, 4.5 μT, 15 V m⁻¹ and 600 V m⁻¹ rather than 120 V m⁻¹, 3.0 × 10⁻⁸ T or 48 V m⁻¹; a banknote lamp at 365 nm rather than a 250 nm germicidal lamp; a dental unit at 6.0 × 10¹⁸ Hz rather than 3.0 × 10¹⁸ Hz; no oven-wavelength, 5G, night-vision, TV-remote-wavelength, welder, greenhouse or sunburn items; a hospital subset for the order question rather than all seven bands).
5. **Facts double-checked:** i_d = ε₀ dΦE/dt = dq/dt for parallel plates; ε₀ × V m s⁻¹ gives amperes; B round the gap circles the axis, clockwise for i_d into the page; with x east, y north, z up, E east and travel north need B downward (x̂ × (−ẑ) = ŷ); E along +z and travel along +y need B along +x; E along x and travel along +z need B along y; c ∝ 1/√ε₀; a charge in uniform circular motion radiates (centripetal acceleration); band edges used: radio > 30 cm, microwave 1 mm–30 cm, infrared 700 nm–1 mm, visible 400–700 nm, ultraviolet 1–400 nm, X-rays 1 pm–1 nm, gamma < 10 pm; 433 MHz = 69 cm (UHF radio); 610 MHz = 0.492 m; 12 GHz = 2.5 cm; 1550 nm = 194 THz; 9.5 μm = 31.6 THz; 365 nm = 8.22 × 10¹⁴ Hz; 532 nm = 5.64 × 10¹⁴ Hz; radar d = ct/2 (0.40 ms → 60 km; 120 μs → 18 km and 100 μs → 15 km 10 s later, 300 m s⁻¹); 40 m band = 7.5 MHz, so 2.4 GHz is 320 times higher; half-wave dipole at 750 MHz = 20 cm; circular plates of radius 4.0 cm, 1.5 mm apart, at 0.15 A: dE/dt ≈ 3.37 × 10¹² V m⁻¹ s⁻¹, dV/dt ≈ 5.06 × 10⁹ V s⁻¹.

## Known gaps
- The approximate band edges differ between textbooks (some put the radio/microwave boundary at 10 cm); every classification question avoids the boundary regions, but reviewers should accept answers that quote other common edges. The decks place 2.45 GHz (12.2 cm, the oven) and the 3.0 GHz radar (10 cm) in the microwave band, as is usual for ovens and radar.
- Sketches asked for in answers (the EM wave) are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.

## Competency audit 2026-11-05
Follows the audit's ISC 12 Physics lead (`docs/platform/content-qa/2026-11-05-competency-retag-audit.md`). Rule applied: one-formula substitutions (with or without a unit conversion) and directly applied stated rules are understanding; chained relations, a non-routine step or a new set-up keep application.
- **Retagged:** q002, q008, q045, q046, q047, q048, q050 (application to understanding: one-formula substitutions); q017, q023, q024 (application to understanding); q021, q039 (analysis to understanding). Of these, q002, q008, q023, q045, q046, q047, q048 were then rewritten (below) and are application again for real.
- **Rewritten as genuine application items (same key, type, marks, topic, test slots):** q002 (charging current and plate diameter to dE/dt: area from the diameter, then i_d = ε₀A dE/dt; d3); q008 (capacitance not given: C = ε₀A/d from plate area and gap, then dV/dt = i_d/C; d3); q023 (E₀ to B₀ then the factor by which the Earth's field exceeds it, judging a claim; d3); q025 (round-trip delay minus processing time, then d = ct/2; d3); q045 (frequency limits from 8.0 and 14 μm, then the width of the detectable band; d3); q046 (f = c/λ then number of oscillations in a 2.0 ns flash; d3); q047 (λ = c/f then ratio of a 0.25 nm layer spacing to λ, to judge whether diffraction is noticeable; d3); q048 (λ = c/f then wavelengths across a 40 m dish; d3).
- **New counts (68 items):** recall 3 · understanding 32 · application 23 · analysis 8 · evaluation 2: application or higher 33/68 = **48.5% of items (62% of marks)**; difficulty d1 6 · d2 26 · d3 35 · d4 1.
- Short and long answers were not re-judged.
