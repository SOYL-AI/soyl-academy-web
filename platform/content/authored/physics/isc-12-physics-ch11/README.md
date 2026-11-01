# ISC Class 12 Physics, Chapter 11 — Alternating Current

`isc-12-physics-ch11` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 20 slides), notes (6 sections), 30 flashcards, 75 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch11_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch11_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch11/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch11: t01 sinusoidal AC, period, frequency, phase and phasors, the half-cycle mean 2I₀/π (derived) and the rms value I₀/√2 (derived; sine waves only); t02 AC through pure R, L and C with phasor diagrams, X_L = ωL and X_C = 1/ωC (derived from v = L di/dt and i = C dv/dt) and their graphs against frequency; t03 the series LCR circuit by phasors, Z = √(R² + (X_L − X_C)²) and tan φ = (X_L − X_C)/R (derived), RL and RC special cases, and graphs of Z and I against frequency; t04 average power V_rms I_rms cos φ (derived), power factor R/Z, active and wattless current, the choke coil; t05 resonance f₀ = 1/(2π√LC), half-power frequencies, bandwidth Δω = R/L and Q = ω₀L/R = (1/R)√(L/C) as formulae, V_L = QV, LC oscillations described qualitatively; t06 the AC generator (principle, construction, working, the emf NBAω sin ωt derived from Φ = NBA cos ωt) and the differences between AC and DC.
- Removed in the ISC scope and not examined: the derivations of bandwidth and the Q factor (the formulae are quoted and used) and any quantitative treatment of LC oscillations (the energy exchange is described in words and shown by a qualitative energy plot in the notes; no item asks for charge or energy as a function of time).
- Not duplicated from ch10: the transformer and eddy currents; Faraday’s and Lenz’s laws are used for the generator without being re-taught.

## Shape
- **Part 1 (t01–t03, 20 slides):** sinusoidal AC and phasors; the half-cycle mean; the rms value; worked: a 1.2 kW kettle on 230 V, 50 Hz mains, V₀ ≈ 325 V, I_rms ≈ 5.22 A, I₀ ≈ 7.38 A, half-cycle mean ≈ 4.70 A, T = 20 ms; R, L and C alone; the inductor (lags 90°, X_L = ωL); the capacitor (leads 90°, X_C = 1/ωC); reactance against frequency; worked: 0.35 H and 15 μF on the mains, 110 Ω and 2.09 A, 212 Ω and 1.08 A, and 440 Ω and 53.1 Ω at 200 Hz; the series LCR circuit; impedance and phase angle by phasors; worked: R = 48 Ω, X_L = 70 Ω, X_C = 50 Ω on 130 V, Z = 52 Ω, I = 2.5 A, V_R = 120 V, V_L = 175 V, V_C = 125 V, φ ≈ 22.6° (lagging); RL and RC cases; Z against frequency.
- **Part 2 (t04–t06, 20 slides):** average power; power factor; active and wattless current; worked: a pump motor, 230 V, 4.0 A, power factor 0.80, 920 VA, 736 W, 3.2 A active and 2.4 A wattless; the choke coil; worked: a 100 V, 4.0 A lamp on 230 V mains, 32.5 Ω wasting 520 W, or a choke of about 0.165 H; resonance; bandwidth and Q; worked: L = 25 mH, C = 4.0 μF, R = 10 Ω, 5.0 V, f₀ ≈ 503 Hz, I₀ = 0.50 A, V_L ≈ 39.5 V, Q ≈ 7.91, Δf ≈ 63.7 Hz; LC oscillations; the AC generator; its theory; worked: 150 turns of 20 cm × 12 cm at 50 rev s⁻¹ in 0.30 T, e₀ ≈ 339 V, e_rms ≈ 240 V; AC and DC compared.
- Visuals on 40 of 40 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 11 SVGs — one cycle of a sinusoidal current with its peak, rms and half-cycle mean drawn at the computed heights; rotating phasors with their projections onto the waveforms; R, L and C with their phasor diagrams (adapted from `cbse-12-physics-ch07/src/svgs.mjs`); the series LCR circuit of worked example 3, its phasor diagram and its impedance triangle to scale; the active and wattless components of a lagging current; a lamp run through a resistor and through a choke; four quarter-cycle states of an LC circuit; the AC generator (adapted from the CBSE chapter, with brushes, slip rings and load labelled) and an end-on view of its coil for the theory. Plots: sin ωt and sin² ωt with the mean 1/2; v and i for a pure inductor and a pure capacitor; X_L and X_C against f; Z against f; resonance curves for R = 10 Ω and 30 Ω with the half-power frequencies; v, i and p over a cycle at φ = 60°; flux and emf of the generator against angle; energy in C and L over a period (notes).

## Question bank (75)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 7 | 1 (keys a 3, b 2, c 1, d 1) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 (graphs against frequency and the quantities they describe) |
| numerical | 21 | 1 (11) or 2 (10) |
| short | 8 | 2 |
| short | 10 | 3 (rms derived with the mains peak; capacitor current derived; a coil tested on DC and AC; Z and tan φ derived by phasors; a 35 Ω, 0.18 H, 120 μF circuit; reactance and impedance graphs described; average power derived; a 60 V lamp on a resistor or a choke; resonance with V_L = 10V; generator principle and parts) |
| long | 5 | 5, set in parts with the marks shown (rms and half-cycle mean with a capacitor on the mains; LCR phasors with a 55 Ω, 0.25 H, 30 μF circuit and its power; power factor, wattless current, choke and a coil’s L from a power reading; resonance with Q, bandwidth and LC energy exchange; the generator with its emf at 1/600 s) |

- **Difficulty:** d1 4 · d2 30 · d3 36 · d4 5. **Competency:** recall 3 · understanding 29 · application 31 · analysis 11 · evaluation 1: application or higher **57% of items (63% of marks)**.
- **Topic tags:** t01 12 · t02 15 · t03 15 · t04 14 · t05 15 · t06 11.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q002, q013, q038, q062, q055 · B q033, (q045 or q058) · C q011, (q035 or q070) · D q074.
- **Long (40 marks, 100 min):** A q001, q003, q012, q025, q026, q027, q049, q050, q061, q063, q032, q068 · B q010, q023, (q046 or q059) · C q024, q031, q047, (q060 or q048) · D q072, (q071 or q075).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 46 scripted re-solve checks pass.
- 19 diagram self-checks (half-cycle mean and rms lines at the numerically averaged heights 2/π and 1/√2 of the drawn wave, full-cycle mean zero; phasor projections equal to the waveform values at the marked instant, with the current drawn 40° behind; R, L and C current phasors at 0°, −90° and +90°; worked example 3 voltages adding as phasors to 130 V, its phasor diagram and impedance triangle to scale at 22.62°; 4.0 A resolved into 3.2 A active and 2.4 A wattless, 736 W; lamp and choke voltages at right angles adding to 230 V, L = 0.1648 H; the four LC states with the drawn current equal to the rate the top plate loses charge; the generator axis perpendicular to B; the end-on view with opposite emfs v × B in the two sides adding to a value ∝ sin θ, and the normal drawn at θ to B): 0 failures.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-01)
Every question was re-solved from its stem. Findings and fixes:
1. **Re-solve checks:** two scripted checks failed on the first build because the expected values had been estimated by hand (the 64 mH coil current, 9.1688 A, and the 35 Ω / 0.18 H / 120 μF impedance, 46.113 Ω); the build values were right, so only the check constants were corrected. The keys (9.17 A; 46.1 Ω and 4.99 A) were unchanged.
2. **Word limit:** the wattless-current short answer (q046) ran to 61 words against 30–50 and was tightened.
3. **Units:** the coil-inductance answer (q031) had written “≈ 25.5 mH” after an expression in henry; it now reads 0.0255 H, i.e. about 25.5 mH.
4. **Facts double-checked:** v₂ = 12 cos(200πt) leads v₁ = 12 sin(200πt) by T/4 = 2.5 ms; a DC moving-coil meter reads zero on 50 Hz AC while a hot-wire meter reads the rms value; the rms of a ±6.0 V square wave is 6.0 V (I₀/√2 is for sine waves only); e = 170 sin(120πt) first reaches 85 V at 1/720 s; half-cycle mean = (2√2/π) × rms = 0.900 × rms; at the voltage peak of a capacitor the current is zero and about to go negative; X_C at 150 Hz is a third of its 50 Hz value; X_L = X_C for 50 mH at 1.0 kHz needs 0.507 μF; X_C > X_L means a leading current (R = 40, X_L = 25, X_C = 55 Ω: 36.9°); V_R = 12 V and V_C = 16 V give 20 V with the current leading 53.1°; V_R = 60, V_L = 140, V_C = 60 V give 100 V; a coil drawing 2.0 A on 12 V DC and 1.2 A on 12 V, 50 Hz AC has R = 6 Ω, X_L = 8 Ω, L ≈ 25.5 mH; a 100 Ω resistor alone takes 529 W, with a 100 Ω inductor in series 265 W; a 1.5 Ω, 60 Ω choke has power factor ≈ 0.025; doubling L and halving C leaves f₀ unchanged and doubles Q = (1/R)√(L/C); 240 μH tunes to 702 kHz with 214 pF; f₀ does not depend on R; halving N and doubling ω leaves e₀ = NBAω unchanged and doubles the frequency; with the coil’s plane at 30° to B the normal is at 60°, so e = e₀ sin 60°; the generator emf is zero when the flux is greatest; 3000 rpm gives 50 Hz.

## Known gaps
- Diagrams asked for in answers (phasor diagrams, graphs against frequency, the labelled generator) are described in words; graders should accept any correct sketch.
- The resonance curves and the Z–f graph use one illustrative circuit (worked example 6); the reactance–frequency plot uses worked example 2.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
