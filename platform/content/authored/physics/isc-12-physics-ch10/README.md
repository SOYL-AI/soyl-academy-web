# ISC Class 12 Physics, Chapter 10 — Electromagnetic Induction

`isc-12-physics-ch10` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 19 slides), notes (6 sections), 30 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch10_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch10_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch10/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch10: t01 magnetic flux (Φ = BA cos θ, the weber, flux linkage) and its rate of change, Faraday’s two laws, ε = −N dΦ/dt, the charge NΔΦ/R and reading Φ–t graphs; t02 Lenz’s law and its link to conservation of energy, motional emf ε = Blv (from Φ = Blx and from the force on free charges), the drag force B²l²v/R and the power (Blv)²/R; t03 eddy currents: causes, effects (heating, damping), uses (induction cooktops and furnaces, electromagnetic brakes, dead-beat galvanometers) and lamination; t04 self-induction (NΦ = LI, ε = −L dI/dt, the henry, L = μ₀N²A/l for a long solenoid, back emf); t05 mutual induction (N₂Φ₂ = MI₁, ε₂ = −M dI₁/dt, M = μ₀n₁n₂πr₁²l for coaxial solenoids, M₁₂ = M₂₁); t06 the transformer with ideal coupling (principle, construction, working, step-up and step-down, Vs/Vp = Ns/Np = Ip/Is, efficiency, the four losses and their reduction) and high-voltage power transmission.
- Removed in the ISC scope: the quantitative treatment of eddy currents. Every eddy-current item (9) is descriptive; no eddy-current magnitude is calculated anywhere.
- Not examined here because they belong to other chapters: flux density and the tesla as basics (ch09), the AC generator and AC circuit theory (ch11). Energy stored in an inductor is not in the ISC ch10 topic list and is not used.

## Shape
- **Part 1 (t01–t03, 18 slides):** flux through a tilted coil; Faraday’s laws with a table of his observations; worked: 50 turns of 80 cm², 0.10 → 0.50 T in 0.080 s, 5.0 Ω gives 2.0 V, 0.40 A, 0.032 C; reading a Φ–t graph; Lenz’s law (south pole pulled away from a solenoid) and energy conservation; worked: direction of the current in a loop entering, inside and leaving a field; motional emf; force, current and power; worked: 0.50 m bar at 4.0 m s⁻¹ in 0.40 T with 0.80 Ω gives 0.80 V, 1.0 A, 0.20 N, 0.80 W; eddy currents and lamination; uses of eddy currents.
- **Part 2 (t04–t06, 19 slides):** self-induction and the henry; L of a long solenoid; worked: 500 turns, 25 cm, 4.0 cm² gives 0.503 mH and 1.51 V when 3.0 A is cut in 1.0 ms; back emf; mutual induction; M of coaxial solenoids; worked: r₁ = 1.0 cm, 1200 and 800 turns per metre, 60 cm gives 0.227 mH and 11.4 mV at 50 A s⁻¹; the transformer and its ideal relations; worked: a 230 V to 6.0 V doorbell transformer, 12 secondary turns, 30 mA primary current; efficiency and losses; power transmission; worked: 500 kW through 5.0 Ω loses 10.3 kW at 11 kV and 1.15 kW at 33 kV.
- Visuals on 37 of 37 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 7 SVGs — a coil tilted at 30° to B with its normal at 60° (edge-on view), a south pole pulled away from a solenoid whose near face becomes N, a bar on rails in a field out of the page with v, I and the drag force (adapted from `cbse-12-physics-ch06/src/svgs.mjs`), eddy currents in a solid and a laminated core, a long solenoid, two coaxial solenoids, a step-up transformer on a laminated core (adapted from `cbse-12-physics-ch07/src/svgs.mjs`); plots of Φ against t (slopes 2.0, 0 and −6.0 mWb s⁻¹), of the power needed against the speed of the bar, and of the line loss against the transmission voltage; flow charts for finding an induced current’s direction and for the grid.

## Question bank (73)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 6 | 1 (keys a 3, b 1, c 1, d 1) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 (eddy-current devices; transformer losses and their remedies) |
| numerical | 19 | 1 (10) or 2 (9) |
| short | 9 | 2 |
| short | 10 | 3 (derivations: q = NΔΦ/R, ε = Blv from the force on free charges, L = μ₀μr n²Al, M for a coil wound over a solenoid, the ideal transformer relations; four problems: a Φ–t graph, a loop pulled out of a field, an L–R circuit at switch-on, two coupled coils; and the eddy-current description) |
| long | 5 | 5, set in parts with the marks shown (Faraday and Lenz with a coil whose field falls to zero; ε = Blv, power and the steady speed of a pulled bar; L of a solenoid and M with a small coil at its centre; transformer construction with an efficiency problem; a hydroelectric line at 6.0 kV and 60 kV) |

- **Difficulty:** d1 6 · d2 27 · d3 39 · d4 1. **Competency:** recall 4 · understanding 23 · application 30 · analysis 13 · evaluation 3: application or higher **63% of items (68% of marks)** (within the 45–65% band the stage-4 lint applies to physics).
- **Topic tags:** t01 14 · t02 16 · t03 9 · t04 12 · t05 10 · t06 14.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q008, q030, q037, q058, q018 · B q010, (q045 or q067) · C q026, (q055 or q068) · D q069.
- **Long (40 marks, 100 min):** A q001, q007, q014, q023, q016, q029, q043, q051, q062, q066, q044, q053 · B q011, q034, (q025 or q054) · C q013, q036, q056, (q027 or q046) · D q070, (q071 or q073).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 40 scripted re-solve checks pass.
- 10 diagram self-checks (normal of the tilted coil perpendicular to it and at 60° to B; induced moment pointing back at the retreating south pole; q v × B, the circuit sense and the drag force I l × B on the bar as cross products; laminations wider than their eddy loops; solenoid field direction from the current on the front of the turns; inner coaxial radius smaller than the outer and both the same length; transformer turns ratio matching its label): 0 failures.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-01)
Every question was re-solved from its stem. Findings and fixes:
1. **Word limits:** two descriptive 2-mark model answers (the stopped metro train, the 230 V village line) ran to 63 and 67 words and were cut to about 55.
2. **Competency band:** the first build had 70% of items at application or higher, above the 45–65% band the lint applies; five one-step or definitional items (the hanging ring, the copper pendulum, the flux linkage MI, the efficiency from the losses, the three ways of changing flux) were relabelled as understanding, which is what they test.
3. **Originality:** every set-up was checked against `cbse-12-physics-ch06`/`ch07` (Electromagnetic Induction; Alternating Current with the transformer) and ISC ch05 `transmission-short3` and ch07 `q068`: no shared numbers or set-ups (e.g. the solenoid stretched rather than its turns doubled; a field reversed rather than a coil flipped; a hanging ring repelled rather than a ring thrown off a solenoid; 132 → 400 kV and a 6.0/60 kV hydro line rather than 11 kV distribution).
4. **Facts double-checked:** plane at 30° to B means θ = 60° from the normal; a reversed field changes the flux by 2BA; q = NΔΦ/R is independent of time; loop leaving an inward field: clockwise; to the left of a wire carrying current up the page the field is out of the page, so a falling current gives an anticlockwise loop current; v east × B up points south (south end positive); antenna emf uses only the horizontal component (v × B_H is vertical); drag and power both scale as B²; terminal speed of a pulled bar v = FR/B²l² = 8.0 m s⁻¹; L ∝ N²r²/l (9/4 for 3N and r/2; halved when stretched to 2l); L–R circuit: dI/dt = (E − IR)/L gives 80 and 40 A s⁻¹; M uses the inner area πr₁² (M ∝ n₁r₁², so doubles for 2r₁ and n₁/2); a small coil at the centre of a solenoid has M = μ₀(N/l)N₂πr² = 3.95 × 10⁻⁵ H; ideal transformer Is/Ip = Np/Ns; (400/132)² ≈ 9.2; hydro line loss 480 kW at 6.0 kV against 4.8 kW at 60 kV.

## Known gaps
- Diagrams asked for in answers (transformer construction, direction sketches) are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
