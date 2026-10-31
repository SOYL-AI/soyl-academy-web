# ISC Class 12 Physics, Chapter 6 — Cells, Kirchhoff’s Laws, Bridges and Potentiometer

`isc-12-physics-ch06` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (6 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch06_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch06_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch06/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch06: t01 emf as work per unit charge, internal resistance, terminal p.d. V = E − Ir (E = I(R + r) derived from energy conservation; V = E + Ir while charging); t02 grouping of identical cells in series, parallel and mixed grouping (maximum current when R = nr/m, derived), two cells of unequal emf in parallel (E_eq and r_eq derived) and n cells in series including reversed cells; t03 Kirchhoff’s junction and loop laws as conservation of charge and energy, sign conventions, two-loop circuits; t04 the Wheatstone bridge (balance derived from Kirchhoff’s laws) and the metre bridge; t05 the potentiometer: principle, potential gradient, sensitivity, use as an ideal voltmeter; t06 comparing emfs (incl. the sum-and-difference method) and the internal resistance of a cell.
- The potentiometer, deleted from the CBSE syllabus, is kept in ISC and gets a full treatment (half of deck 2, two notes sections, 24 items).
- The syllabus lists no removed topics for this chapter. Drift velocity, resistivity, temperature dependence, combinations of resistors and electrical power/energy belong to ch05 and are not examined here.

## Shape
- **Part 1 (t01–t03, 17 slides):** emf; internal resistance and E = I(R + r); worked: 4.5 V, 0.30 Ω on 2.7 Ω gives 1.5 A and 4.05 V; the V–I line of a cell; grouping of identical cells; mixed grouping and the best arrangement; worked: twelve 1.5 V, 0.60 Ω cells on 1.8 Ω, best as 2 rows of 6 (2.5 A, against 2.0 A all in series and 0.81 A all in parallel); two unequal cells in parallel; worked: 2.0 V/0.40 Ω with 1.5 V/0.60 Ω on 1.56 Ω, 1.8 V and 0.24 Ω, 1.0 A, the weaker cell charged at 0.1 A; Kirchhoff’s laws with a sign table; worked: two-loop circuit (10 V/2 Ω, 4 Ω, 8 V/4 Ω) with 1.5, 0.25 and 1.75 A.
- **Part 2 (t04–t06, 18 slides):** Wheatstone bridge derived; metre bridge; worked: 9.0 Ω balance at 55.0 cm gives X = 11.0 Ω, 45.0 cm after interchanging; potentiometer principle; potential gradient; worked: 4.0 m, 8.0 Ω wire with a 2.0 Ω rheostat and 2.0 V driver, k = 0.40 V m⁻¹, Daniell cell at 2.7 m; sensitivity; comparing emfs; worked: 1.44 V from 3.60 m against 2.70 m; internal resistance derived; worked: 3.00 m and 2.50 m with 9.0 Ω give r = 1.8 Ω; potentiometer against voltmeter. The three potentiometer examples use one instrument.
- Visuals on 35 of 35 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 9 SVGs — a cell on load with a voltmeter, mixed grouping of cells, two unequal cells in parallel with the solved currents, the two-loop Kirchhoff circuit with the solved currents, the Wheatstone bridge, the metre bridge with the jockey at 55.0 cm, and the potentiometer in three set-ups (principle, two-way key for comparing emfs, shunt resistance for internal resistance) with balance lengths drawn to scale; plots of terminal p.d. against current, current against the number of rows for twelve cells, and potential drop against length along the wire. The circuit-symbol kit and the bridge drawings are copied from `cbse-12-physics-ch03/src/svgs.mjs` with new values.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 18 | 1 (keys a 5, b 5, c 4, d 4) |
| assertion-reason | 7 | 1 (keys a 4, b 1, c 1, d 1) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| numerical | 19 | 1 (5) or 2 (14) |
| short | 8 | 2 |
| short | 9 | 3 (four derivations: E = I(R + r), mixed grouping and its maximum, unequal cells in parallel, Wheatstone balance; and the potentiometer method for r) |
| long | 5 | 5, set in parts with the marks shown (emf and internal resistance from two readings, with charging; two unequal cells in parallel with branch currents; generator, battery and headlamp solved with Kirchhoff’s laws; Wheatstone balance with a metre-bridge problem; potentiometer gradient, emf and internal resistance, and when no balance is possible) |

- **Difficulty:** d1 7 · d2 30 · d3 24 · d4 10. **Competency:** recall 2 · understanding 32 · application 26 · analysis 11: application or higher **52% of items (58% of marks)**.
- **Topic tags:** t01 12 · t02 15 · t03 9 · t04 11 · t05 15 · t06 11.

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q001, q015, q037, q044, q063 · B q009, (q032 or q054) · C q042, (q065 or q025) · D q069.
- **Long (40 marks, 100 min):** A q006, q012, q014, q026, q027, q038, q046, q048, q059, q060, q008, q039 · B q011, q041, (q023 or q055) · C q010, q033, q043, (q056 or q066) · D q071, (q068 or q070).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 35 scripted re-solve checks all pass.
- 19 diagram self-checks (every circuit solved by script: cell on load; best grouping of 12 cells is 2 rows of 6 with R = nr/m; unequal cells — junction rule and the weaker cell charging; Kirchhoff — junction rule, both loop equations and arrow directions; bridge balance; metre-bridge jockey at 55.0 cm; potentiometer — both + terminals towards A, the emf below the 1.6 V across the wire and the balance lengths drawn at E/k; internal-resistance numbers consistent): 0 failures
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-10-31)
Every question was re-solved from its stem. Findings and fixes:
1. **Word limit:** the emf/terminal p.d. 2-mark model answer ran to 62 words; tightened to 42.
2. **Internal resistance factors:** the 2-mark answer no longer claims a dependence on electrolyte concentration (textbooks disagree on its sign); it keeps electrode separation, immersed area and temperature.
3. **Re-solve checks:** two Kirchhoff checks compared a residual with zero using a relative tolerance; replaced by an absolute tolerance so they test what they claim.
4. **Facts double-checked:** V = E + Ir while charging (12.4 V for 8.0 A into 12 V, 0.050 Ω); r = E/I_short (0.50 Ω); two readings give E = 2.0 V, r = 1.0 Ω and E = 6.0 V, r = 0.20 Ω; best grouping of 16 cells (1.5 V, 0.50 Ω) on 2.0 Ω is 2 rows of 8 giving 3.0 A; two reversed cells in six cut the emf to 3.0 V with r unchanged; E_eq = 16/3 V for 6.0 V/1.0 Ω with 4.0 V/2.0 Ω; three-branch circuits: 7.2 V and 1.2 A (the 6.0 V battery charging at 0.40 A), 6.0 V with zero current in the 6.0 V cell, and 13.5 V with the car battery charging at 1.5 A; V_P − V_Q = 8.0 V entering a cell at its + terminal; S = 12 Ω; X = 8.5 Ω with the unknown in the right gap; shunting the 10 Ω arm moves the null point from 40.0 to about 57 cm; B above D for arms 2, 4, 3, 5 Ω; X = 6.0 Ω and Y = 4.8 Ω; k = 0.16 V m⁻¹; 380 Ω for 10 mV m⁻¹; doubling the wire with the driver directly across it doubles the balancing length; sum and difference lengths 4.5 and 1.5 m give 2 : 1; r = 2.0 Ω and R = 3.0 Ω; 51.9 cm for two 14 Ω coils against 26 Ω; series resistance below 4.5 Ω needed to balance 2.0 V on the 6.0 m wire.

## Known gaps
- Circuit diagrams asked for in answers are described in words; graders should accept any correct circuit.
- End corrections of the metre bridge are explained qualitatively only (no end-correction numericals).
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
