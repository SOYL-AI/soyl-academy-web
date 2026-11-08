# ISC Class 12 Physics, Chapter 21 — Semiconductor Electronics: Materials, Diodes and Simple Circuits

`isc-12-physics-ch21` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 20 slides), notes (7 sections), 30 flashcards, 99 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch21_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch21_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch21/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. `src/dump-svgs.mjs <dir>` writes the diagrams out for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch21: t01 energy bands in solids, band diagrams of conductors, insulators and semiconductors, band gaps of carbon (diamond 5.5 eV), germanium (0.7 eV) and silicon (1.1 eV), photon cut-off wavelength λ = 1240/Eg nm; t02 intrinsic and extrinsic semiconductors, electrons and holes, doping, n-type and p-type, donor and acceptor impurities, majority and minority carriers, neutrality, conductivity σ = e(n μ) numericals; t03 the p-n junction (depletion region, barrier potential, built-in field), forward and reverse bias, V–I characteristics, knee voltage, dynamic resistance, simple diode-circuit numericals with the constant-drop model (0.7 V Si, 0.3 V Ge); t04 half-wave and two-diode centre-tap full-wave rectifiers with circuit diagrams and input/output waveforms, the role of each component, the filter capacitor and its ripple; t05 LED, photodiode and solar cell working principles, and the energy-saving importance of LEDs; t06 the Zener diode characteristic and its use as a voltage regulator with numericals on the series resistor and load current.
- **Removed in ISC and not examined:** crystal structure; the bridge rectifier with four diodes; quantitative band theory (bands are qualitative; band gaps appear only as photon energies). Each is mentioned only as "not examined" (deck exam tips, notes).
- **Not in this ISC entry and left out:** transistors and logic gates.
- Constants stated in the stems: hc = 1240 eV nm, e = 1.6 × 10⁻¹⁹ C, forward drops 0.7 V (Si) and 0.3 V (Ge), mains 230 V at 50 Hz.
- No CBSE 12 Physics semiconductor chapter exists in the authored bank. The few "diode" and "rectifier" mentions elsewhere (ISC ch05 and CBSE ch03 I–V graphs, ch12 microwave and infrared detectors) were checked: no shared set-up, number or wording.

## Shape
- **Part 1 (t01–t03, 19 slides):** energy bands from atomic levels; conductor, insulator, semiconductor (bands to scale); the band gap and light (λ = 1240/Eg plot); worked: cut-off wavelengths of Si, Ge, diamond; intrinsic semiconductors, electrons and holes (bond picture); doping, n-type and p-type; donor and acceptor levels; worked: doped against intrinsic silicon conductivity; the p-n junction (ions, field, potential barrier); forward and reverse bias; forward V–I curves of Si and Ge (model exponential curves); reverse characteristic and a table of the three states; worked: two diode circuits (24.09 mA, 35.33 mA, blocked branch); summary and tips.
- **Part 2 (t04–t06, 20 slides):** half-wave rectifier (circuit and computed waveforms); centre-tap full-wave rectifier (output coloured by the diode that conducts); roles of the components; worked: 12-0-12 supply (peak 16.27 V, 100 Hz); the filter capacitor (plot from a time-stepped simulation); worked: ripple 1.0 V full-wave, 2.0 V half-wave; the LED (recombination, series resistor); LED colours and energy saving (plot of λ against Eg); the photodiode; the solar cell; the Zener characteristic (plot); the Zener regulator; regulation plot (output against input); worked: 5.6 V regulator (I = 30 mA, I_L = 10 mA, I_Z = 20 mA, 112 mW; input +1 V gives I_Z = 30 mA); summary and tips.
- Visuals on 39 of 39 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 12 SVGs with 27 self-checks: band diagrams to scale (conductor, Ge, Si, diamond); covalent-bond pictures of intrinsic, n-type and p-type silicon; donor and acceptor levels; the unbiased junction with ions, field and potential curve; forward and reverse bias; two diode circuits; half-wave and full-wave rectifier circuits with waveforms; LED, photodiode and solar cell; the Zener regulator. 10 plot visuals (analytic functions and one 121-point series): gap against cut-off wavelength, forward Si and Ge, reverse current, Zener characteristic, regulation, filtered full-wave output, LED wavelength against gap. All figures were rendered and inspected. The circuit symbol kit follows ISC ch06 (copied, not imported).

## Question bank (99)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 7 | 1 (keys in bank order: a, d, b, a, a, d, c) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 |
| match | 2 | 2 (doped samples and carriers; devices and their bias) |
| numerical | 26 | 1 or 2 |
| short | 10 | 2 |
| short | 11 | 3 |
| long | 6 | 5, set in parts with the marks shown |

- **Difficulty:** d1 22 · d2 42 · d3 28 · d4 7. **Competency:** understanding 44 · application 33 · analysis 21 · evaluation 1: application or higher **56% of items (59% of marks)** (inside the 45–65% band) (superseded: see Competency audit 2026-11-05).
- **Topic tags:** t01 12 · t02 14 · t03 18 · t04 20 · t05 20 · t06 17 (the reverse-current assertion-reason is tagged t01 and t03; the device match t05 and t06).
- Several numericals are keyed in units of a power of ten (`× 10²¹ m⁻³`, `× 10⁻³ Ω m`, `× 10⁵`, `× 10⁶ V m⁻¹`, `× 10¹⁵ s⁻¹`) so that the key equals the final figure stated in the solution.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q012, q026, q044, q064, q089 · B q023, (q039 or q058) · C q040, (q060 or q081) · D q042.
- **Long (40 marks, 100 min):** A q001, q003, q013, q027, q029, q046, q048, q067, q084, q086, q007, q052 · B q010, q080, (q038 or q095) · C q011, q061, q097, (q041 or q098) · D q062, (q099 or q083).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on 216 maths strings; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 41 scripted re-solve checks pass. Re-solves do not reuse the solution text: photon energies from h, c and e; series circuits from a loop equation with a conduction test; the Zener regulator by bisection on the output node with a 0.01 Ω Zener slope resistance (currents, minimum load, input range, loss of regulation); the rectifier peak by sampling the waveform; the half-wave conduction fraction by counting samples; the ripple by a constant-current capacitor simulation (agrees with It/C within 5–12%, because the formula ignores the short conduction time, as the stems state); photon rates from h, c and e.
- 27 diagram self-checks (see `build.checks.diagrams`): 0 failures.
- Rebuilding is byte-identical (release.json and tests.json md5 unchanged across two builds).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-02)
Every question was re-solved from its stem and read for physics. Findings and fixes:
1. **Mixed units in arithmetic:** a first build had "= 18.2 mA" after a fraction that evaluates to 0.0182; every such step now ends in "× 10⁻³ A" or uses an explicit A. A ₹ sign inside maths was moved out of the maths.
2. **Keys the solution never reached:** five numericals whose key was a large or small power of ten were re-keyed in stated units so that the last line of the solution gives the key exactly.
3. **Stem punctuation:** "(hc = …), 1 eV = …" fixed to a single bracket in the two photon items.
4. **Distractor check:** MCQ and assertion-reason options were read for a second correct answer; none found. The bias item states the germanium threshold (0.3 V) so no option depends on memory; the centre-tap reverse-voltage item states ideal diodes.
5. **Originality:** stems were checked against ISC ch05/ch12 and CBSE ch03/ch12 for shared set-ups: none. Frequencies (a 40 Hz generator), transformer ratings (9-0-9, 12-0-12, 15-0-15, 6-0-6), capacitors, Zener ratings (5.1, 5.6, 6.0, 6.8, 9.1 V) and LED data are original to this chapter.
6. **Facts a reviewer should double-check:**
   - Band gaps C 5.5, Ge 0.7, Si 1.1 eV; hc = 1240 eV nm; visible photon energies 1.8–3.1 eV; thermal energy 0.026 eV.
   - Donor and acceptor depth "about 0.05 eV in silicon" (drawn deeper and labelled); doping "about one atom in 10⁷"; silicon 5.0 × 10²⁸ atoms per m³; intrinsic density 1.5 × 10¹⁶ m⁻³; mobilities 0.135 (electron) and 0.048 m² V⁻¹ s⁻¹ (hole) are rounded textbook values.
   - Depletion width "about 1 μm" and field "about 10⁶ V m⁻¹"; the 0.50 μm, 0.70 V numerical gives 1.4 × 10⁶ V m⁻¹ under the stated uniform-field assumption.
   - Forward V–I curves are model exponentials fixed to 1 mA at the knee (0.7 V Si, 0.3 V Ge); the reverse curve (−0.05 to −0.11 μA) and the Zener breakdown shape are illustrative; the Zener plot uses one current scale for forward and reverse.
   - Centre-tap reverse voltage 2V_m (ideal diodes); half-wave conduction fraction 48.4% at 14 V peak and 0.7 V drop; ripple ΔV = It/C with the whole interval between peaks as the discharge time (slightly high).
   - LED data: red about 1.9 eV, green 2.3 eV, blue 2.7 eV (typical, labelled "about"); solar cell voltage "about 0.5–0.7 V for silicon".
   - The reverse-current assertion-reason (silicon gap as the Reason) is keyed (b); a reviewer may prefer a different Reason.

## Known gaps
- Diagrams asked for in answers (circuits, V–I curves) are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.

## Competency audit 2026-11-05
Follows the audit's ISC 12 Physics lead (`docs/platform/content-qa/2026-11-05-competency-retag-audit.md`). Rule applied: one-formula substitutions (with or without a unit conversion) and directly applied stated rules are understanding; chained relations, a non-routine step or a new set-up keep application.
- **Retagged to understanding:** q004, q008, q009, q020, q033, q036, q044, q045, q049, q065, q074. Of these, q008 and q036 were then rewritten (below) and are application again for real.
- **Rewritten as genuine application items (same key, type, marks, topic, test slots):** q008 (decide which of two beams can lift electrons across the 1.1 eV gap, then count the pairs per second from the beam power and photon energy; d3); q036 (dynamic resistance from two readings, then predict the forward voltage for a new current; d3).
- **New counts (99 items):** understanding 53 · application 24 · analysis 21 · evaluation 1: application or higher 46/99 = **46.5% of items (53% of marks)**; difficulty d1 22 · d2 40 · d3 30 · d4 7.
- Short and long answers were not re-judged.
- Transistors and logic gates are deliberately absent: they are not in this ISC syllabus entry.
