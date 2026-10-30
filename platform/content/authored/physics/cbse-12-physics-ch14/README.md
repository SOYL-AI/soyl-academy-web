# CBSE Class 12 Physics, Chapter 14 — Semiconductor Electronics: Materials, Devices and Simple Circuits

`cbse-12-physics-ch14` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (4 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch14_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch14_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch14/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `questions-extra.mjs` holds the 11 items added in the verifier pass. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 energy bands in conductors, semiconductors and insulators (qualitative, with λ = hc/E_g); t02 intrinsic semiconductors, electrons and holes, n-type and p-type doping, n_e n_h = n_i²; t03 the p-n junction (depletion layer, barrier potential), forward and reverse bias, I–V characteristics (knee, reverse saturation, breakdown), dynamic resistance; t04 half-wave and centre-tap full-wave rectifiers with waveforms (capacitor smoothing mentioned).
- Special-purpose diodes (Zener, LED, photodiode and solar-cell theory), transistors and logic gates are deleted from the 2026-27 syllabus and are not taught. An LED and a solar panel appear only as contexts for the band-gap relation.
- Data: E_g Si 1.1 eV, Ge 0.7 eV, diamond 5.4 eV; hc ≈ 1243 eV nm; n_i(Si) = 1.5 × 10¹⁶ m⁻³; silicon diode drop 0.7 V when conducting.

## Shape
- **Part 1 (t01–t02, 15 slides):** levels to bands; conductors, semiconductors and insulators (comparison table); worked: λ_max for Si 1130 nm, Ge 1776 nm, diamond 230 nm; electrons and holes; n-type and p-type doping; n-type and p-type compared; worked: 1 ppm arsenic in Si gives n_e = 5 × 10²² m⁻³ and n_h = 4.5 × 10⁹ m⁻³; temperature and conduction.
- **Part 2 (t03–t04, 16 slides):** depletion layer; forward and reverse bias; forward characteristic (computed from I = 10 mA × e^((V − 0.70)/0.05)); worked: r_d ≈ 2.6 Ω; reverse characteristic (schematic, μA scale, breakdown); worked: 4.3 mA through 1 kΩ from 5 V; half-wave and full-wave rectifiers; waveforms (computed plots); worked: 12 V rms → 17.0 V peak, 16.3 V across the load, 50 Hz and 100 Hz pulses.
- Visuals on all 31 slides.
- **Diagrams (6 SVGs):** band diagrams with gaps to scale; doped silicon lattices (As donor with a spare electron, B acceptor with a hole); the p-n junction with fixed ions and the field from n to p; forward- and reverse-bias circuits (cell polarity drawn correctly in each); half-wave and centre-tap full-wave rectifier circuits. 7 self-checks, all pass. **Plots:** forward and reverse characteristics; half-wave and full-wave waveforms.
- **Narration:** 7–75 words per slide (mean 54), TTS-safe.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 18 | 1 (keys a 5, b 5, c 4, d 4) |
| assertion-reason | 6 | 1 (keys a 3, b 1, c 1, d 1) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 18 | 1 or 2 |
| short | 6 + 4 | 2 / 3 |
| long | 5 | 5 (energy bands with λ = hc/E_g; intrinsic and extrinsic with the mass-action law; the junction and its characteristics; the full-wave rectifier with numbers; diode circuit problems) |
| case-based | 3 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 10 prose short answers.
- **Difficulty:** d1 13 · d2 29 · d3 20 · d4 5.
- **Competency:** recall 8 · understanding 28 · application 25 · analysis 6. Application or higher **46% of items (54% of marks)**.
- **Topic tags:** t01 14 · t02 16 · t03 20 · t04 18.
- **Cases:** a phone charger bought in Delhi (why diodes, 12.7 V peak, the smoothing capacitor, or evaluate a half-wave design); rooftop solar panels in Pune (which light works, 1130 nm, silicon against diamond, or evaluate bright 1500 nm light); a diode tester in a Chennai lab (forward orientation, 8.0 mA, why zero in reverse, or evaluate “the diode is faulty”).

## Chapter tests
- **Short (20 marks, 40 min):** A q003, q014, q039, q008 · B q007, q041, q020 · C q048 or q050 · D q054.
- **Long (40 marks, 90 min):** A q009, q022, q025, q026, q030, q035, q043, q044, q021, q045 · B q010, q019, (q033 or q042), q032, (q034 or q055) · C q049 + (q047 or q051) · D q052, q053.

## Validation
- Build: 0 validator errors, 0 warnings; 127 maths strings parsed (KaTeX strict); 20 SVG visuals / 6 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 25 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Band figure:** the first version drew the diamond conduction band off the top of the frame and the conductor’s bands with a gap; the frame is now taller (28 px per eV) and the conductor’s bands overlap (self-check asserts both).
2. **Reverse-bias figure:** the reverse circuit first reused the forward cell symbol while its labels said − +; it now draws the cell reversed.
3. **Bank size and balance:** the first draft had 56 items (lint editorial.practice, minimum 60) and 36% application-or-higher; eleven application/analysis items were added (Ge λ_max, LED band gap, doped germanium, choosing a series resistor, lamp with a diode on AC, full-wave peak, voltage across a reverse-biased diode, e² current ratio, pulse interval, doubling the doping, a specific carrier match), plus a full-wave short answer and an AR item with key (c).
4. **Word limit:** the half-wave short answer was 67 words against 30–50; tightened.
5. **Stems:** every stem names its own material, circuit or numbers (the match item says “silicon sample … charge carriers”), following the Lead’s note on cross-subject originality collisions.
6. **Facts double-checked:** band gaps and λ = hc/E_g; resistance of a semiconductor falls on heating; donors P, As, Sb and acceptors B, Al, In; neutrality of doped crystals; n_e n_h = n_i²; depletion-layer ions and field n → p; barrier 0.7 V Si, 0.3 V Ge; forward bias narrows and reverse bias widens the layer; reverse saturation current from minority carriers; half-wave output at f, full-wave at 2f; an open D₂ turns full-wave into half-wave; V₀ = √2 V_rms.

## Known gaps
- Circuit diagrams and waveforms asked for in answers are described in words; graders should accept any correct sketch. The reverse characteristic and breakdown voltage in the slides are schematic.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
