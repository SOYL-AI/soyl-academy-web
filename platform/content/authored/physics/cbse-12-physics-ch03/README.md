# CBSE Class 12 Physics, Chapter 3 — Current Electricity

`cbse-12-physics-ch03` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (6 sections), 31 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch03_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch03_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch03/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. The authoring library is `../cbse-12-physics-ch01/src/lib.mjs` (same owner). Two-loop circuits are solved by a node-voltage helper in `questions.mjs` and `svgs.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are taught and assessed; the 2026-27 syllabus lists no deleted topics for this chapter.
- Series and parallel combinations of **resistors** are not a syllabus topic for Class 12; they are used only as Class 10 tools inside power, cell and bridge problems. Colour codes and the potentiometer are not used (not in the 2026-27 syllabus).
- The metre bridge is included as the application of the Wheatstone bridge named in the t06 outcome.

## Shape
- **Part 1 (t01–t03, 16 slides):** current; drift velocity; I = neAv_d and mobility; worked: drift speed 1.5 × 10⁻⁴ m s⁻¹ (about 1.9 hours per metre); Ohm’s law from the drift model, resistivity and conductivity; worked: 0.85 Ω for 50 m of copper and 13.1 Ω at 100 °C; linear vs non-linear V–I; resistivity vs temperature (metal, alloy, semiconductor); power; worked: a 1000 W heater on 200 V gives 826 W.
- **Part 2 (t04–t06, 15 slides):** emf and internal resistance; V–I line of a cell; worked: 2.0 A, 11.0 V, 24 A short-circuit; cells in series and parallel; Kirchhoff’s rules; worked two-loop circuit (2.4 A, −0.60 A so the 6 V cell charges, 1.8 A); Wheatstone bridge and its derivation; worked metre bridge (2.67 Ω).
- Layouts: title 2, concept 7, two-column 2, diagram 4, example 6, check 6, summary 2, exam-tips 2. Visuals on 29 of 31 slides (largest gap 1).
- **Diagrams (6 SVGs):** electron drift in a conductor; a cell with internal resistance, load and voltmeter; cells in series and in parallel; the two-loop Kirchhoff circuit (currents **solved by script**, junction and both loop equations verified, arrows drawn in the solved directions); Wheatstone bridge (balance potentials checked numerically); metre bridge with the jockey at the worked example’s 40 cm. All circuit symbols are drawn from a small kit (zigzag resistor, long/short cell plates, labelled meters).
- **Plots:** I–V for an ohmic resistor and a filament lamp; relative resistivity against temperature for copper, nichrome and a semiconductor (shapes); terminal voltage against current for a 12 V, 0.5 Ω cell with three marked points on the line.
- **Narration:** 17–80 words per slide (mean 60), TTS-safe. Contexts: a ceiling fan, a geyser, a car starter, phone charging.

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 7 | 1 (keys a 3, b 1, c 2, d 1) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 12 | 1 or 2 |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 (drift velocity and ρ = m/ne²τ; cells in series vs parallel; a two-loop Kirchhoff circuit; Wheatstone derivation and metre bridge; temperature dependence) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 7 prose short answers.
- **Difficulty:** d1 14 · d2 24 · d3 30 · d4 4.
- **Competency:** recall 7 · understanding 31 · application 28 · analysis 5 · evaluation 1. Application or higher **47% of items (56% of marks)**, inside the 45–65% band; one-step substitutions are tagged understanding (D-035 rule).
- **Topic tags:** t01 12 · t02 21 · t03 13 · t04 13 · t05 10 · t06 10.
- **Cases:** an overloaded extension cord in Lucknow (10 A on a 6 A cord; 0.23 Ω; 23 W; evaluate continued use); a car battery and starter motor (9.6 V, 450 W inside, why headlights dim, or evaluate a 0.010 Ω battery); charging a phone through a USB cable (direction, 5.0 A by the loop rule, 3.95 V terminal voltage, or a thinner cable’s 2.5 A); metre-bridge data from a Bhubaneswar lab (X = 3 Ω from three readings, which reading is most reliable, or evaluate a more sensitive galvanometer).
- **Deck checks:** drift in thick and thin sections, semiconductor heating (AR), bulbs in series (Part 1); parallel cells (numerical), junction rule (numerical), swapping the gaps in a metre bridge (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q006, q019, q041, q046 · B q009, q063, q026 · C q064 or q067 · D q070.
- **Long (40 marks, 90 min):** A q013, q024, q029, q032, q043, q044, q051, q056, q021, q062 · B q025, q036, (q037 or q054), q035, (q047 or q055) · C q066 + (q065 or q068) · D q069, q071.

## Validation
- Build: 0 validator errors, 0 warnings; 554 maths strings parsed (KaTeX strict); 19 SVG visuals / 6 distinct diagrams pass the allow-list; pipeline stage-4 lint 0 errors, 0 warnings; pipeline stage-5 deterministic checks run inside the build with 0 flags.
- 35 scripted re-solve checks pass (every numerical, every computed option, both two-loop circuits, case data and long-answer numbers).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Kirchhoff long answer:** the first draft quoted currents (1.6, −0.20, 1.4 A) that did not belong to the stated circuit; the script solution is 1.5 A, −0.25 A and 1.25 A with V_AB = 5.0 V, and the text, scheme and re-solve check now use those values.
2. **Rounding vs the verifier:** a drift speed written as 0.12 mm s⁻¹ after an exact 0.117 failed the 1% arithmetic check; the key is now 0.117 mm s⁻¹. A temperature computed as 69.999… is rounded to 70 °C.
3. **Lint `latex.backslash`:** products written `neA`, `ne^2`, `nev_d` were read as a lost `\ne`; written with spaces (`n e A v_d`).
4. **Competency band:** the first draft had 42% application or above; six new items need reasoning in a new situation (wire thickness from I–V slopes, a 5 A fuse and 100 W bulbs, two heaters in series, internal resistance from voltmeter readings, V_A − V_B along a branch, a metre bridge after adding a series resistor). Now 47%.
5. **Diagram fixes after rasterising:** the voltmeter in the cell circuit was first joined across part of the internal resistance; it now connects across the cell’s terminals outside the dashed box. Labels clipped at the edges of the Kirchhoff circuit and overlapping bridge labels were moved; electron labels raised to 10 px.
6. **Facts double-checked:** I = neAv_d; v_d = eEτ/m; μ = eτ/m in m² V⁻¹ s⁻¹; ρ = m/ne²τ ≈ 1.7 × 10⁻⁸ Ω m for copper with τ ≈ 2.5 × 10⁻¹⁴ s; stretching a wire k times multiplies R by k²; metals α > 0, alloys tiny α, semiconductors ρ falls; filament lamp and diode as non-ohmic, GaAs multi-valued; P = VI = I²R = V²/R and the series/parallel brightness rule; 1 kWh = 3.6 MJ; V = E − Ir (E + Ir when charging); series and parallel cell formulas; Kirchhoff’s rules from charge and energy conservation; Wheatstone balance P/Q = R/S independent of emf and galvanometer; metre bridge X = R l/(100 − l), most accurate near the middle.

## Known gaps
- Circuit diagrams asked for in answers are described in words; graders should accept any correct diagram.
- The resistivity–temperature plot shows shapes (the semiconductor curve is scaled to fit), not measured data.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
