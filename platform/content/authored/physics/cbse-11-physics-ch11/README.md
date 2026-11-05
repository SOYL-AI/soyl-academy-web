# CBSE Class 11 Physics, Chapter 11 — Thermodynamics

`cbse-11-physics-ch11` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 19 slides), notes (4 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch11_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch11_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch11/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds R and the numerical helpers (Simpson integral of P dV, polygon area of a loop, area under a polyline, isotherm and adiabat generators) used by the independent re-solves; `svgs.mjs` the six diagrams with self-checks; `decks.mjs` all worked-example numbers, the plots and the tables; `study.mjs` notes and flashcards; `questions*.mjs` the bank (t01–t02, t03, t04, long and case-based items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Topics t01–t04 of the syllabus: t01 thermal equilibrium, the zeroth law, heat, work and internal energy (adiabatic and diathermic walls, internal energy as a state function, work converting to internal energy without heat flow); t02 the first law ΔU = Q − W (W is the work done by the system; the other sign convention is mentioned), work done by a gas as W = ∫P dV = the area under the P–V curve (path dependence), molar heat capacities Cv and Cp with the derivation of Cp − Cv = R; t03 quasi-static, isochoric, isobaric, isothermal, adiabatic (PV^γ = constant, TV^(γ−1) = constant, W = (P₁V₁ − P₂V₂)/(γ − 1)) and cyclic processes, free expansion; t04 the Kelvin–Planck and Clausius statements, reversible and irreversible processes, heat engines (η = W/Q₁ = 1 − Q₂/Q₁) and refrigerators (COP = Q₂/W).
- **The Carnot engine, Carnot's theorem and the Carnot efficiency 1 − T₂/T₁ are not taught.** The syllabus topics for this chapter (t04) name heat engines and refrigerators but not the Carnot cycle, and the 2023 rationalisation of the Class 11 book is the one thing the writer could not check; under the Lead's ruling (leave out what the syllabus file does not list and the writer is unsure about) it is omitted. Items that need an "impossible engine" use the Kelvin–Planck statement and energy balance only.
- Not taught: kinetic theory and equipartition (chapter 12). Cv = 3R/2 (monatomic, γ = 5/3) and 5R/2 (diatomic, γ = 1.4) are quoted as data wherever an item needs them and labelled "from kinetic theory (next chapter)". Heat capacity and calorimetry (specific heat, latent heat, Newton's law of cooling) belong to ch10 and are not repeated; the only calorimetric calculation is the brake-heating example (work → internal energy).
- Data and constants stated in the stems: R = 8.314 J mol⁻¹ K⁻¹; 1 kPa × 1 L = 1 J; γ = 1.40 for air, 5/3 for a monatomic gas; g is not used. No NCERT, exemplar or past-paper text is used; contexts are Indian (Bengaluru city bus, Pune cyclist, Odisha power plant, domestic refrigerator and window air-conditioner, diesel generator set). The CBSE 12, ISC 12 and ICSE 10 banks and the CBSE 9/10 Science chapters were grepped for "isothermal", "adiabatic", "first law of thermodynamics", "heat engine", "Carnot", "refrigerator", "internal energy", "zeroth law" and "work done by a gas": no authored thermodynamics exists in the repository yet, so there is nothing to echo.

## Shape
- **Part 1 (t01–t02, 17 slides):** thermal equilibrium and the two kinds of wall (table); the zeroth law (diagram: two blocks against one thermometer); heat, work and internal energy side by side (two-column + table); worked 1: a braking example (1200 kg car at 72 km h⁻¹ stopped, brakes of heat capacity 8.0 kJ K⁻¹, ΔT = 30 K); the first law and its sign convention (table); worked 2: four cases of Q and W (ΔU = +300, −300, +250, +500 J); work done by a gas as the area under the P–V curve (diagram of three paths); worked 3: A (2 L, 300 kPa) to B (5 L, 200 kPa) by three paths: W = 900, 600, 750 J, ΔU = 600 J, Q = 1500, 1200, 1350 J; molar heat capacities (plot: Q against ΔT at constant P and V); why Cp − Cv = R (derivation + table of gases); worked 4: 2.0 mol of a monatomic gas heated by 40 K at constant pressure (Q ≈ 1663 J, W ≈ 665.1 J, ΔU ≈ 997.7 J); summary and exam tips. 3 check slides (fill, MCQ, numerical).
- **Part 2 (t03–t04, 19 slides):** quasi-static processes (four-panel diagram); isochoric and isobaric (table); isothermal expansion (plot with the isotherm and adiabats); worked 5: 0.50 mol at 300 K to 3 times the volume (W = Q ≈ 1370 J); adiabatic processes (diagram: isotherm against adiabat, areas 554.5 J and 444.0 J); worked 6: 1.0 mol of a monatomic gas compressed adiabatically to half its volume (T₂ ≈ 476.2 K, P₂ ≈ 317.5 kPa, W ≈ −2198 J); cyclic processes (rectangular loop diagram, 800 J); worked 7: the rectangular loop as an engine (Q₁ = 3600 J, Q₂ = 2800 J, W = 800 J, η ≈ 22.2%); the Kelvin–Planck and Clausius statements (table); reversible and irreversible processes (table); engines and refrigerators (energy-flow diagram); worked 8: engine η = 24% and refrigerator COP = 4 with Q₁ = 2.25 MJ and a 125 W compressor; engine and refrigerator side by side; summary and exam tips. 3 check slides (numerical, match, numerical).
- Visuals on all 36 slides (10 SVG, 15 tables, 1 flow, 10 plots).
- **Diagrams (6 SVGs, 6 self-checks, all pass):** zeroth law (both blocks drawn touching the thermometer, equal readings); three paths on a P–V diagram (the shaded pixel areas equal PΔV, PΔV and the trapezoid: 900, 600, 750 J); isotherm against adiabat (drawn areas 554.5 J and 444.1 J match nRT ln 2 and (P₁V₁ − P₂V₂)/(γ − 1); the adiabat is γ times as steep at A); four processes from one state (P, V, PV and PV^γ constant on every plotted point, areas match the formulae); rectangular cycle (enclosed pixel area 800 J, clockwise); engine and refrigerator (bar widths proportional to energy with Q₁ = Q₂ + W, η = 24% and COP = 4 read off the widths). Each was rendered in Chromium and inspected; overlapping labels, a clipped title and sub-10 px text found in the first drafts were fixed.
- **Plots (computed, 6 distinct):** heat against temperature rise at constant P and V; an isotherm and an adiabat with the cooler isotherm through its end; the isotherm of Example 5; the adiabat of Example 6; the rectangular cycle; η against Q₂/Q₁. Analytic `functions` where possible; release.json is 368 KB.
- **Narration:** 10–84 words per slide (mean 58), TTS-safe, numbers in words, units spelled out.
- **Notes:** 4 sections (one per topic) with extra figures; 30 flashcards (t01 8, t02 10, t03 8, t04 4).

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 5 | 1 (keys b, a, d, c, a: a 2, b 1, c 1, d 1) |
| true-false | 3 | 1 (false, true, false) |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 21 | 1, 2 or 3 |
| short | 8 + 6 | 2 / 3 |
| long | 5 | 5 (three paths between two states; Cp − Cv = R with a diatomic gas; isothermal and adiabatic work with derivations; a rectangular cycle as an engine; the second-law statements, refrigerator COP and engine efficiency) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 14 prose short answers.
- **Difficulty:** d1 8 · d2 28 · d3 31 · d4 5 (the 4 case alternatives are d4 evaluation items on top).
- **Competency:** recall 3 · understanding 30 · application 32 · analysis 7 (the case alternatives add evaluation items). Application or higher **54% of items (66% of marks)**.
- **Topic tags:** t01 10 · t02 19 · t03 26 · t04 21.
- **Cases:** a Pune cyclist's quick pump stroke (adiabatic; T₂ ≈ 614 K; work on the air ≈ 131 J; or evaluate "a slow compression would give the same 614 K"); a monatomic gas taken A→B at 250 kPa and cooled B→C (W = 750 J; Q = −1125 J, or evaluate "pressure falling means negative work"); a syringe compressed slowly in a water bath against quickly in foam (isothermal 13.8 J given out; why the final pressure is higher when fast, or evaluate "same ΔV means same work"); an Odisha coal plant (1500 MW in, 450 MW out: η = 30%; 1050 MW rejected, or evaluate "perfect lubrication gives 100%").

## Chapter tests
- **Short (20 marks, 40 min):** A q001, q011, q046, q030 · B q008, q043, q063 · C q064 or q068 · D q069.
- **Long (40 marks, 90 min):** A q002, q003, q018, q019, q026, q028, q029, q048, q020, q052 · B q009, q021, (q022 or q044), q023, (q045 or q062) · C q067 + (q066 or q065) · D q070, q072.

## Validation
- Build: 0 validator errors, 0 warnings; 387 maths strings parsed (KaTeX strict); 16 SVG visuals / 6 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` 8828ff7060d986431cc11485d779e708, of `tests.json` 95dd8952ffe013d6c2ceca3ac819d459).
- 34 scripted re-solve checks pass: all 21 numericals, the MCQs with numbers, the long answers and the case items are re-solved by a different route (Simpson integration of P dV along the straight, isothermal and adiabatic paths, polygon area of loops, P V^γ constant with T = PV/nR, energy balances Q₁ = Q₂ + W). Every printed number in solutions, model answers and marking schemes is built from the same computed variables. The worked-example numbers are re-derived by Simpson integration and recorded as 8 extra self-checks in the build.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-05)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Schema:** the matching item had no stem (Column A / Column B text); added.
2. **Word limits:** two 3-mark short answers (the Cp − Cv derivation and the engine description) and the part (c) models of three cases were mostly mathematics and fell below the word-count slack; each was rewritten with explanatory prose.
3. **Key and solution endings:** the isothermal-compression numerical (key 799 J) ended on a negative step (−799.2) and the generator-power numerical stated the kilowatts only as "that is"; both now end on an "=" step that reaches the key (heat given out = −Q = 799 J; P = 24 kW). Minus signs in schemes use the proper "−".
4. **Wording:** the refrigerator-comparison MCQ printed "3.0" in one option and "4" in another (now 3 and 4); the first draft of the quasi-static slide said every curve in the chapter is quasi-static although the pump stroke is fast (now "an idealisation"); the "COP is often 3 to 5" remark became "commonly above 2".
5. **Figures:** the first renders had a clipped title and overlapping sub-labels (three-path diagram), annotation text on top of the curves (isotherm against adiabat), unreadable labels inside the cycle loop, a bottom row cut off (four-process panels) and "V (L)" printed over a tick number; all fixed, text at 10 px or more, then re-rendered.
6. **Stems:** every stem names its own context and numbers (a city bus, a mercury thermometer with a steel ball and a brass cylinder, a pump barrel, a syringe in a water bath, a window air-conditioner, a diesel generator set, an Odisha power plant); none echoes the CBSE 12, ISC 12, ICSE 10 or CBSE 9/10 items.
7. **Facts double-checked:** R = 8.314; 5R/2 = 20.785 and 7R/2 = 29.099 J mol⁻¹ K⁻¹; 8^0.4 = 2.297 (689 K from 300 K), 6^0.4 = 2.048 (614 K), 4^0.4 = 1.741 (522.3 K), 5^1.4 = 9.518 (952 kPa); 2^(5/3) = 3.175 (317.5 kPa) and 2^(2/3) = 1.587 (476.2 K); nRT ln 2 = 1728.9 J against nCv(T₁ − T₂) = 1384 J for the monatomic gas that doubles its volume; the rectangular cycles: 800 J, 3600 J, 2800 J, 22.2% and 600 J, 2950 J, 2350 J, 20.3%; ΔU is path independent in the three-path items (600 J, 150 J).

**Facts a reviewer should double-check:** (a) that omitting the Carnot engine and Carnot's theorem agrees with the rationalised 2026-27 book (if it is kept, add a slide and 3–4 items; the "possible engine" MCQ already avoids needing it); (b) that quoting Cv = 3R/2 and 5R/2 as data (derived in chapter 12) is acceptable at this chapter's depth; (c) the sign convention ΔU = Q − W (W by the system), which is the rationalised book's convention up to naming; (d) that the derivations of the isothermal and adiabatic work (long q066) are expected at Class 11 depth; (e) the claim that the ideal-gas free expansion leaves T unchanged (q028); (f) the numbers in the worked examples and the two cycle problems; (g) the remark in the Part 2 slide that the isothermal expansion does not violate the second law (the gas ends at a larger volume).

### Subject-producer review (2026-11-05)
Every numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5): all keys and printed values check out (cycle efficiencies 20.3% and 26.7%, adiabatic and isothermal works). Two numericals tagged "understanding" were retagged "application" (application or higher now 57%). The Carnot engine is left out as the README says. Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- The Carnot engine and Carnot's theorem are omitted (see Scope). The thermodynamic temperature scale, entropy and the equation of state of a real gas are not covered (outside the topics).
- Graph sketches asked for in answers are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae; the diagrams are drawn to the stated scales.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
