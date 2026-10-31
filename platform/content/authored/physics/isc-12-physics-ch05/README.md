# ISC Class 12 Physics, Chapter 5 — Electric Current, Ohm’s Law and Resistivity

`isc-12-physics-ch05` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (5 sections), 30 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch05_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch05_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch05/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch05: t01 free-electron theory of conduction, relaxation time, drift velocity, mobility and I = neAv_d (derived); t02 Ohm’s law, current density, J = σE and the derivation of σ = ne²τ/m and ρ = m/(ne²τ); t03 resistance, resistivity, conductance and conductivity (R = ρl/A), V–I characteristics of ohmic and non-ohmic conductors; t04 temperature dependence of the resistivity of metals and semiconductors (explained through n and τ), R_T = R₀[1 + α(T − T₀)]; t05 electrical energy and power, P = VI = I²R = V²/R, the kilowatt hour and electricity billing.
- The syllabus lists no removed topics for this chapter. Cells, emf, internal resistance, Kirchhoff’s laws, bridges and the potentiometer are in ch06 and are not examined here.

## Shape
- **Part 1 (t01–t02, 14 slides):** electric current; free electrons and relaxation time; drift velocity and mobility; I = neAv_d derived from the slice v_dΔt; worked: 1.5 A in a 1.0 mm² copper wire drifts at 1.10 × 10⁻⁴ m s⁻¹ (about 9100 s per metre); J = σE and ρ = m/(ne²τ) derived; worked: gold, τ ≈ 2.51 × 10⁻¹⁴ s and μ ≈ 4.41 × 10⁻³ m² V⁻¹ s⁻¹; random and drift speeds compared.
- **Part 2 (t03–t05, 14 slides):** R = ρl/A, conductance and conductivity, stretching at constant volume; worked: a 1.5 m, 0.30 mm nichrome element, 23.3 Ω; ohmic and non-ohmic V–I graphs; temperature dependence of metals, semiconductors and alloys; worked: a 50 Ω motor winding at 20 °C reads 61.7 Ω at 80 °C and 60 Ω at 71.3 °C; power and the kilowatt hour; worked: a 1000 W, 230 V heater (52.9 Ω, 4.35 A, 756 W on 200 V); worked: a household bill of 216.9 kW h, ₹1518 at ₹7 per unit.
- Visuals on 28 of 28 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 4 SVGs — electrons drifting opposite to E and I through a slice v_dΔt long, the random path of a free electron without and with a field (same random kicks, net drift opposite to E), a wire of length l and cross-section A, a wire stretched to twice its length at constant volume drawn to scale; plots of I against V (ohmic wire and filament lamp) and of ρ/ρ₀ against temperature rise (copper and a semiconductor).

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 17 | 1 (keys a 5, b 4, c 4, d 4) |
| assertion-reason | 5 | 1 (keys a 2, b 1, c 1, d 1) |
| true-false | 2 | 1 |
| fill-blank | 3 | 1 |
| numerical | 18 | 1 or 2 |
| short | 7 | 2 |
| short | 8 | 3 |
| long | 5 | 5, set in parts with the marks shown (drift: random motion and drift, I = neAv_d, a cable’s current density and drift speed; resistivity derived with silver’s relaxation time; a constantan wire’s resistance, stretched; an immersion heater’s rating, low supply and monthly cost; aluminium against copper for power lines) |

- **Difficulty:** d1 18 · d2 19 · d3 23 · d4 5. **Competency:** recall 7 · understanding 27 · application 26 · analysis 5: application or higher **48% of items (58% of marks)**.
- **Topic tags:** t01 18 · t02 13 · t03 16 · t04 13 · t05 12.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q009, q033, q044, q055, q017 · B q007, (q023 or q059) · C q020, (q046 or q060) · D q063.
- **Long (40 marks, 100 min):** A q001, q003, q011, q014, q026, q028, q031, q032, q045, q051, q015, q035 · B q027, q024, (q034 or q047) · C q008, q016, q040, (q050 or q057) · D q061, (q062 or q064).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 28 scripted re-solve checks all pass.
- 7 diagram self-checks (electron drift arrows opposite to E and I, electrons inside the conductor, slice v_dΔt within it; random walk with the same kicks drifting opposite to E and kept inside its panels; wire dimension line end to end; stretched wire drawn to scale at constant volume, l/A × 4): 0 failures
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-10-31)
The chapter was started by an earlier session that stopped before the build; its source was reviewed in full and every question re-solved from its stem. Findings and fixes:
1. **Wrong numbers:** the drift-time item said “over 7 hours” for 1.09 × 10⁴ s (it is about 3 hours); the billing model rounded 364.5 kW h to 365 and then multiplied 364.5; the heater’s resistance showed 26.4 Ω against a scheme of 26.5 Ω (now 26.45 Ω throughout); the aluminium-cable answer called a 1.65 times larger cross-section “1.65 times thicker”; a narration put nichrome’s resistivity at a hundred times copper’s (about sixty); a kW h answer stored 26.999… (now 27).
2. **Originality against `cbse-12-physics-ch03`:** stems that echoed the CBSE chapter were rewritten with fresh set-ups and numbers — the mobility unit, I = neAv_d derivation, lamp-lights-instantly (now a ceiling fan), drift assertion, stretched wire (now 10 Ω drawn 50% longer → 22.5 Ω), ohmic graph, filament lamp (now torch-bulb readings, 5 Ω → 10 Ω), standard-resistor alloy, temperature explanation, semiconductor and metal assertions, lamps in series (now 40 W and 100 W, power ratio 2.5), monthly units, transmission loss, the coil and the two long-answer openings; worked examples 2–4 moved to gold, a 1.5 m nichrome element and a motor winding.
3. **Maths:** “ne” inside maths read as a lost \ne escape in the pipeline lint; written as `n e` throughout.
4. **Diagrams:** placeholder self-checks replaced by real ones; unused circuit-symbol helpers removed; the stretched-wire diagram added; plot curves start from ρ/ρ₀ = 1.
5. **Facts double-checked:** vd = I/(neA) and vd ∝ 1/A ∝ 1/d² for the same current; random speeds about 10⁵ m s⁻¹ against drift about 10⁻⁴ m s⁻¹ (ratio about 10⁹); vd = eEτ/m, so doubling l at fixed V halves vd; μ = eτ/m in m² V⁻¹ s⁻¹; J along E; ρ ∝ 1/n at fixed τ; stretching at constant volume R ∝ l² (×2.25 for 1.5 times); equal masses with l doubled give 4R; a 16 Ω wire cut in four and paralleled gives 1 Ω; slope of I–V is 1/R; metals: τ falls on heating; semiconductors: n rises and outweighs τ; α = 2.0 × 10⁻³ and 4.0 × 10⁻³ °C⁻¹ results; R doubles at 250 °C for α = 4.0 × 10⁻³ referred to 0 °C; series lamps P ∝ R ∝ 1/P_rated; transmission loss 20 kW at 250 V against 50 W at 5000 V; 1 kW h = 3.6 MJ; τ of aluminium 7.05 × 10⁻¹⁵ s and of silver 3.77 × 10⁻¹⁴ s; aluminium needs 1.65 times the area of copper but about half the mass.

## Known gaps
- Diagrams and graphs asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
