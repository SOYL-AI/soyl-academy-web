# CBSE Class 12 Physics, Chapter 7 — Alternating Current

`cbse-12-physics-ch07` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 18 slides), notes (5 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch07_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch07_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch07/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. The authoring library is `../cbse-12-physics-ch01/src/lib.mjs` (same owner). `questions-extra.mjs` holds the 9 items added in the verifier pass (imported last). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Topics t01 peak and rms, t02 R, L, C and reactance with phasors, t03 series LCR, impedance and resonance, t04 power, power factor and wattless current, t05 AC generator and transformer.
- **LC oscillations are deleted** in the 2026-27 syllabus (`removed_topics`) and are not used. Quality factor is mentioned only as the sharpness of resonance (smaller R, sharper peak), without a formula.
- Indian mains is taken as 220 V rms, 50 Hz, as in the earlier chapters. Transformer core losses are described as heating by currents induced in the core (the term “eddy currents”, deleted from Chapter 6, is not relied on).

## Shape
- **Part 1 (t01–t02, 15 slides):** AC waveforms; rms values; worked: a 1000 W heater (311 V peak, 4.55 A rms, 6.43 A peak); phasors; AC through an inductor and a capacitor; worked reactances on the mains (157 Ω, 1.40 A lagging; 159 Ω, 1.38 A leading); comparison of R, L, C; worked: identifying a capacitor from its phase and frequency response.
- **Part 2 (t03–t05, 18 slides):** the series LCR phasor diagram; impedance and phase; worked LCR (Z = 50 Ω, 4.4 A, 132/352/176 V, φ = 53.1°); resonance (worked: ω₀ = 1000 rad s⁻¹, f₀ = 159 Hz, 5 A); power and power factor (worked: cos φ = 0.60, 580.8 W = I²R); wattless current; the AC generator (worked: 314 V peak, 222 V rms); the transformer (worked: 11 V, 0.10 A).
- Layouts: title 2, concept 6, two-column 1, diagram 6, example 8, check 6, summary 2, exam-tips 2. Visuals on 31 of 33 slides (largest gap 1).
- **Diagrams (5 SVGs):** single-element phasors; the series LCR phasor diagram **drawn to scale** from the worked example (V at 53.1° checked against atan((XL − XC)/R), and V² = VR² + (VL − VC)² checked); the impedance triangle to scale; an AC generator with slip rings and brushes; a step-down transformer. 6 self-checks, all pass.
- **Plots:** sinusoidal voltage with the rms level; voltage and lagging current in an inductor; resonance curves for small and larger R.
- **Narration:** 11–85 words per slide (mean 60), TTS-safe.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5) |
| assertion-reason | 8 | 1 (keys a 4, b 1, c 1, d 2) |
| true-false | 3 | 1 |
| fill-blank | 1 | 1 |
| match | 1 | 2 |
| numerical | 16 | 1 or 2 |
| short | 6 + 4 | 2 / 3 |
| long | 5 | 5 (capacitor in AC with zero power; series LCR with resonance; average power and power factor; AC generator; transformer with efficiency) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 6 prose short answers.
- **Difficulty:** d1 17 · d2 24 · d3 27 · d4 2.
- **Competency:** recall 3 · understanding 31 · application 32 · analysis 4. Application or higher **51% of items (56% of marks)**.
- **Topic tags:** t01 8 · t02 18 · t03 19 · t04 15 · t05 16.
- **Cases:** a valve radio’s tuning circuit in Thrissur (resonance, 503 kHz at 200 pF, range 318–1010 kHz, or poor selectivity with an aged coil); power-factor correction in a Ludhiana workshop (60° lag, 1100 W, half the current at cos φ = 1, or evaluate “the capacitors are useless”); an 11 kV/440 V pole transformer in Bhopal (25 : 1, 100 A, 4.0 A and 625 × lower losses, or evaluate DC); a capacitor fan regulator (zero average power, X_C ≈ 1410 Ω, smaller C slower, or why resistor regulators got warm).
- **Deck checks:** frequency and reactance, capacitor phase (AR), rms value (numerical) (Part 1); resonance, wattless current (TF), transformer on DC (AR) (Part 2).

## Chapter tests
- **Short (20 marks, 40 min):** A q004, q014, q029, q010 · B q019, q041, q033 · C q053 or q056 · D q058.
- **Long (40 marks, 90 min):** A q002, q006, q015, q016, q026, q028, q038, q046, q031, q040 · B q008, q020, (q032 or q051), q021, (q042 or q052) · C q054 + (q055 or q057) · D q059, q060.

## Validation
- Build: 0 validator errors, 0 warnings; 346 maths strings parsed (KaTeX strict); 21 SVG visuals / 5 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 33 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **LCR long answer:** the first draft quoted Z ≈ 86.5 Ω and I ≈ 2.54 A; the script gives Z = 86.3 Ω (√(60² + 62.0²)) and I = 2.55 A. Text, scheme and check now use the computed values.
2. **Bank margin and AR keys:** the first build had 61 items with AR keys only a, b, d; nine items were added (AR with keys a, c, d; a step-up transformer TF; frequency-doubling, resonance-current, retuning, phase-angle and adaptor-turns items). Now 70 items, 51% application or above.
3. **Phasor figure:** the first layout clipped the V_L and V_C labels; it was rescaled to 0.40 px per volt.
4. **Facts double-checked:** I_rms = I₀/√2; 220 V rms ≈ 311 V peak; X_L = ωL (I lags 90°), X_C = 1/ωC (I leads 90°), zero average power in pure L or C; Z = √(R² + (X_L − X_C)²), tan φ = (X_L − X_C)/R; ω₀ = 1/√(LC), Z = R and φ = 0 at resonance, sharper for smaller R, V_L can exceed V; P = V_rms I_rms cos φ, cos φ = R/Z, wattless current I sin φ, capacitor correction of lagging loads; ε = NBAω sin ωt with maximum when the coil’s plane is along B; V_s/V_p = N_s/N_p = I_p/I_s; transformer losses and remedies; transformers need AC.

## Known gaps
- Phasor diagrams asked for in answers are described in words; graders should accept any correct diagram.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
