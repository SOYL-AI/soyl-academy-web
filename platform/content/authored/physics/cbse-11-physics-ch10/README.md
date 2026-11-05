# CBSE Class 11 Physics, Chapter 10 — Thermal Properties of Matter

`cbse-11-physics-ch10` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (23 + 19 slides), notes (4 sections), 30 flashcards, 96 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch10_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch10_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch10/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the data constants and the independent re-solve helpers (enthalpy bookkeeping for mixtures and changes of state, Runge–Kutta integration of the cooling law, flux-continuity root for slabs in series); `svgs.mjs` the seven diagrams with self-checks; `decks.mjs` all worked-example numbers, plots and tables; `study.mjs` notes and flashcards; `questions*.mjs` the bank (t01–t02, t03, t04, long and case-based items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 temperature versus heat, the Celsius, Fahrenheit and Kelvin scales, linear, area and volume expansion (α, β = 2α, γ = 3α), uses of expansion (bimetallic strip, gaps, shrink fitting), the anomalous expansion of water (density table, frozen pond); t02 specific heat capacity and heat capacity, calorimetry (method of mixtures with a calorimeter), change of state, latent heats of fusion and vaporisation, sublimation, boiling point and pressure (pressure cooker), heating curves, mixtures that include ice or steam; t03 conduction (K, H = KA(T₁ − T₂)/L, thermal resistance, slabs in series), convection (natural and forced), radiation (qualitative: no medium, dull black versus shiny surfaces, black body as the ideal absorber), the vacuum flask; t04 Newton’s law of cooling (differential form, exponential solution, average-temperature form, rate of loss of heat).
- **Left out on purpose** (the syllabus topics do not name them and the rationalised book may not keep them; add them only if the owner confirms): Stefan’s law and Wien’s displacement law (radiation is qualitative, σ is never used); thermal stress; the triple point and the phase diagram; the constant-volume gas thermometer and the ideal-gas equation (ch12); molar heat capacities and thermodynamics (ch11–ch12); apparent versus real expansion of a liquid in a vessel; regelation. Parallel conduction is not examined.
- Data stated in the stems that use them: specific heat of water 4200 J kg⁻¹ K⁻¹ throughout (ice 2100, steam 2000, aluminium 900, lead 130 where used); L_f = 3.34 × 10⁵ and L_v = 2.26 × 10⁶ J kg⁻¹; α for steel 1.2, copper 1.7, aluminium 2.3 (and brass 1.9) × 10⁻⁵ K⁻¹; γ for petrol 9.5 × 10⁻⁴ K⁻¹; K for copper 385, aluminium 205, steel 50, glass 0.8, brick 0.6, foam 0.04, thermocol 0.035, air 0.025, wood 0.12 W m⁻¹ K⁻¹. No NCERT, exemplar or past-paper text is used; contexts are Indian (Delhi and Leh weather, Hyderabad metro viaduct, Pune and Nagpur tea stalls, Kochi fish box, Amritsar dhaba, Kolkata tea). ICSE 10 Physics "Heat" items were grepped for latent heat, calorimeter and specific heat; set-ups and numbers differ (steam condensing, a partly melting ice problem, aluminium-calorimeter mixtures, and conduction and cooling items that ICSE 10 does not have).

## Shape
- **Part 1 (t01–t02, 23 slides):** heat versus temperature; the three scales (diagram); worked: 113 °F = 45 °C = 318.15 K, F = 2C at 160 °C; linear expansion (rods of three metals); area and volume expansion; worked: 60 m girder, 23.04 mm; worked: hole in an aluminium plate (5.023 cm, area up 0.92 %); uses of expansion (bimetal diagram); anomalous expansion (density plot); frozen pond diagram; specific heat; worked: bucket heater (588 000 J, 392 s); calorimetry flow chart; worked: alloy in an aluminium calorimeter (c ≈ 502 J kg⁻¹ K⁻¹); latent heat; worked: ice at −20 °C to steam at 120 °C (774 000 J, 1548 s, boiling 1130 s); worked: 0.020 kg steam into 0.50 kg water (38.96 °C); summary and exam tips. 3 check slides.
- **Part 2 (t03–t04, 19 slides):** the three modes (table); conduction and K (lagged rod diagram); worked: copper rod (13.86 W); slabs in series; worked: cold-store wall (308.6 W, interface 30.71 °C); convection; radiation; vacuum flask diagram; Newton’s law (plot); average-temperature form; worked: tea 80 → 62 °C in 5 min (k = 0.0776 min⁻¹, 16.15 min to 40 °C); worked: coffee, average method (3.75 min against exact 3.76); cooling curves for two mugs; summary and exam tips. 3 check slides.
- Visuals on all 42 slides (11 SVG slides, 23 tables, 7 plots, 1 flow chart).
- **Diagrams (7 SVGs; 19 self-checks incl. the density table and 11 worked-example re-derivations, all pass):** three temperature scales lined up at every tick (37 °C = 98.6 °F = 310.15 K); rods of steel, copper and aluminium (extensions in the ratio of α, drawn 100 times too large); bimetallic strip (interface keeps its length, brass on the outer arc); frozen pond layers shaded by table density; lagged rod with straight profile (gradient 90 K m⁻¹); two slabs in series with the broken-line profile; vacuum flask section. Each was rendered and inspected.
- **Plots (computed, 4):** density of water 0–10 °C (table points); heating curve of 0.25 kg of ice at 500 W (series from the stage heats); cooling of tea (analytic exponential); two cooling constants (analytic). release.json is 289 KB.
- **Narration:** 6–87 words per slide (mean 59), TTS-safe, numbers in words.
- **Notes:** 4 sections (one per topic) with extra figures; 30 flashcards (t01 12, t02 10, t03 6, t04 2).

## Question bank (96)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5) |
| assertion-reason | 6 | 1 (keys a, c, b, d, c, a: a 2, b 1, c 2, d 1) |
| true-false | 4 | 1 (false, true, true, false) |
| fill-blank | 4 | 1 |
| match | 1 | 2 |
| numerical | 32 | 1 (3), 2 (17), 3 (12) |
| short | 11 + 8 | 2 / 3 |
| long | 5 | 5 (expansion; heating curve of ice; steam into water; single and double glazing; Newton’s law with numbers) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 19 prose short answers.
- **Difficulty:** d1 11 · d2 41 · d3 39 · d4 5.
- **Competency:** recall 6 · understanding 40 · application 44 · analysis 6 (the case alternatives add evaluation items). Application or higher **52% of items (65% of marks)**.
- **Topic tags:** t01 26 · t02 33 · t03 23 · t04 18 (some items carry two tags).
- **Cases:** a Hyderabad metro viaduct (18.0 mm for steel, 34.5 mm for aluminium, or evaluate "a 45 m girder needs the same gap"); a Pune tea-stall kettle (151.2 s to reach 100 °C, 226 s to boil away 0.30 kg, or evaluate "boiling away takes as long as heating"); an Amritsar ladle handle (1.80 W, wooden handle 0.00432 W, or evaluate "a 0 °C end doubles the heat current"); a Kolkata tea stall (51.6 °C after 12 min, 21.0 min to 40 °C, or evaluate "falls 24 K every 6 min").

## Chapter tests
- **Short (20 marks, 40 min):** A q012, q028, q054, q076 · B q019, q047, q070 · C q089 or q091 · D q096.
- **Long (40 marks, 90 min):** A q004, q013, q026, q030, q053, q057, q074, q072, q033, q058 · B q018, q048, (q068 or q069), q049, (q086 or q087) · C q088 + (q090 or q092) · D q093, q094.

## Validation
- Build: 0 validator errors, 0 warnings; 464 maths strings parsed (KaTeX strict); 18 SVG visuals / 7 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 in the hand-off report).
- 53 scripted re-solve checks pass: each numerical, the MCQs with numbers, the long answers and the case items are re-solved by a different route (enthalpy bookkeeping and bisection on the energy balance for every mixture and change of state, flux-continuity root for slabs in series, Runge–Kutta integration of Newton’s law, root finding for the unknown room temperature and the halved heat current). Every printed number in solutions, model answers and marking schemes is built from the same computed variables.
- Gate commands: see the subject-producer’s handoff note.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Float noise:** the first dump printed 55.00000000000001 (new-scale item) and 1.7999999999999998 (ladle case key), and the water-volume solution had lost its backslashes; keys and solutions now use rounded values and a clean solution string.
2. **Keys against printed values:** the alloy item printed 441.5 with key 441, the ice-remaining item 193.1 with key 193 and the chilled-water item 24.25 where 24.2 was asked; keys and text now agree (24.246 rounds to 24.2). The steam long answer’s total mass is printed 1.577 kg in the solution as in the scheme.
3. **Distractor:** the specific-heat-too-small item had a distractor ("weighed with its thread, making m too small") that read as correct; replaced by a clearly wrong cause (reading the final temperature before stirring, which would make c too large).
4. **Arithmetic lint:** the 45 m girder alternative wrote "= 27.0" mm after a value in metres; it now shows 0.0270 m = 27.0 mm. Three case part (c) model answers were below the 30-word floor and were extended.
5. **Figures:** the rod and slab diagrams overlapped their labels (H over the arrow, "insulation" wider than its slab, the 28 °C label on the axis); the bimetal and flask labels ran off the frame and the cork parts were invisible without the yellow and brown theme variables; all were moved and re-rendered.
6. **Facts double-checked:** −22 °C = −7.6 °F; a 25 °C rise is 25 K = 45 °F; α(brass) from 2.0038/2.000 m over 100 K = 1.9 × 10⁻⁵; rails 2 × 7.92 mm = 15.84 mm; copper block density 8737 kg m⁻³; iron tyre must reach 103.4 °C; steel/aluminium rods 31.36 cm and 16.36 cm; heat for 0.10 kg ice at −10 °C to steam = 303.5 kJ; 0.412 kg steam gives 1.0 MJ cooling to 60 °C; 0.30 kg ice at −10 °C in 0.50 kg water at 20 °C leaves 193.1 g of ice; 0.05 kg of ice in 0.25 kg water at 45 °C gives 24.2 °C; foam of 6.67 mm halves the heat flow through a 10 cm brick wall; interface of copper (40 cm) and steel (25 cm) rods at 82.8 °C; the ball cooling 80 → 70 → 62 °C implies a 30 °C room; double glazing cuts the heat current from 4800 W to 72.7 W.

**Facts a reviewer should double-check:** (a) that the rationalised book still teaches the exponential solution of Newton’s law and the average-temperature form (both are used; the quantitative radiation laws and thermal stress are not); (b) the 4200 J kg⁻¹ K⁻¹ value for water, used everywhere instead of 4186; (c) the CRC density values of water at one atmosphere (999.84 at 0 °C, 999.97 at 4 °C, 999.70 at 10 °C, rounded to two decimals); (d) the data K values stated in the stems; (e) the two flat stages of the heating curve and the 1130 s boiling time at 500 W; (f) that boiling point against pressure (pressure cooker) is acceptable at rationalised depth; (g) the case alternatives’ model answers (each gives the corrected numbers).

### Subject-producer review (2026-11-05)
Every numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5): all keys check out. In the tiffin long answer the model answer rounds k to 0.118 min⁻¹ but computes T(10 min) = 44.7 °C from the unrounded k (with 0.118 one gets 44.6 °C); graders should accept either. Four numericals tagged "understanding" were retagged "application" (application or higher now 56%). Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Stefan’s law, Wien’s law, thermal stress, the triple point and phase diagram, the gas thermometer and parallel conduction are omitted (see Scope); add them only with owner confirmation.
- Graph sketches asked for in answers are described in words; graders should accept any correct sketch. Plots in the slides are computed; the bimetal bend is exaggerated and the expansion extensions are drawn 100 times too large (stated on the figures).
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
