# CBSE Class 11 Physics, Chapter 9 — Mechanical Properties of Fluids

`cbse-11-physics-ch09` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (22 + 22 slides), notes (4 sections), 30 flashcards, 87 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch09_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch09_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch09/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the constants and the independent numerical helpers (Simpson integral, bisection, derivative, an RK4 integrator, a capillary force-balance solver, a terminal-speed integrator); `data.mjs` every worked-example number and figure datum; `svgs.mjs` the 13 diagrams with self-checks; `decks.mjs` the slides, plots and tables; `study.mjs` notes and flashcards; `questions.mjs` (t01–t02, objective and short items), `questions-t3.mjs`, `questions-t4.mjs`, `questions-long.mjs` (long and case-based items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 pressure as force per area, pressure at a depth (P = P₀ + ρgh), atmospheric and gauge pressure with the mercury barometer and the U-tube manometer, Pascal's law and its applications (hydraulic lift, jack and brakes, with the distance and work argument); t02 streamline flow and the equation of continuity, Bernoulli's principle with its conditions, speed of efflux (Torricelli) and the range of the jet, the Venturi meter, dynamic lift of an aerofoil (with the Magnus effect mentioned for a spinning ball); t03 viscosity (F = ηAv/d, units, temperature dependence of liquids and gases), Stokes' law, terminal velocity with the force balance and its dependence on r², Reynolds number and laminar against turbulent flow (qualitative thresholds of about 1000 and 2000, critical velocity); t04 surface tension as force per length and energy per area, the soap film on a wire frame, angle of contact, excess pressure in a drop (2S/R) and a soap bubble (4S/R), capillary rise and depression, merging of drops.
- **Reynolds number is kept qualitatively**, as the syllabus outcome for t03 asks ("explain Reynolds number qualitatively"): Re = ρvd/η as a ratio that predicts laminar flow below about 1000 and turbulent flow above about 2000, examined by `rey-mcq` and `re-short`. The writer’s critical-speed numerical was removed in review because it treats Re quantitatively.
- Left out on purpose: Poiseuille's formula for flow through a tube, a tank draining over time, the temperature law of surface tension, the derivation of the angle of contact from the three interfacial tensions; none is named by the t01–t04 topics. The bulk modulus of water belongs to chapter 8 and is not repeated.
- Data and constants stated in the stems: g = 9.8 m s⁻²; ρ(water) = 1000 kg m⁻³; ρ(mercury) = 13 600 kg m⁻³; atmospheric pressure 1.013 × 10⁵ Pa; η(water) about 1.0 × 10⁻³ Pa s; S(water) = 0.072 N m⁻¹. Values for other materials (sea water 1030, kerosene 800, glycerine 1260 and η 1.4 Pa s, air η 1.8 × 10⁻⁵ Pa s and ρ 1.2, soap solution S = 0.025 to 0.030, mercury S = 0.465 N m⁻¹ and θ = 135° or 140°, ethyl alcohol S = 0.022) are given in each stem as data. No NCERT, exemplar or past-paper text is used; contexts are Indian (Pune and Hyderabad tanks, Nagpur and Rajkot workshops, a Dehradun hill-village tank, Goa and Visakhapatnam divers, a Shillong drizzle, Chennai cricket).

## Shape
- **Part 1 (t01–t02, 22 slides):** pressure and its units; pressure at a depth (bar figure at 0, 10, 20 m); worked: a tap 18 m below a tank (gauge 1.764 × 10⁵ Pa, absolute 2.777 × 10⁵ Pa); atmospheric, gauge and absolute pressure with the barometer; worked: mercury column 0.760 m, water column 10.3 m; Pascal's law and its devices; the hydraulic lift; worked: 1500 kg car, radii 3.0 and 12 cm (F₁ ≈ 919 N, narrow piston 2.4 m for 0.15 m, 2205 J each side); continuity; worked: hose to nozzle (2.0 to 8.0 m s⁻¹, 5.65 L s⁻¹); Bernoulli's principle with its three energy terms; worked: efflux from a hole 0.50 m below the surface of a 2.0 m tank (3.13 m s⁻¹, range 1.73 m); the range plot (maximum at H/2); the Venturi meter; worked: ΔP = 7.5 kPa gives 1.0 and 4.0 m s⁻¹ and 5.03 L s⁻¹; dynamic lift; summary and exam tips. 3 check slides.
- **Part 2 (t03–t04, 22 slides):** viscosity; η for air, water and glycerine; worked: plate on oil (8.0 N); Stokes' law and terminal velocity; worked: steel ball in oil (3.76 cm s⁻¹, Re ≈ 0.17, τ = 4.33 ms); what controls v_t; Reynolds number; worked: Re = 500 and 22 500; surface tension; worked: soap film (4.80 × 10⁻³ N, 8.00 × 10⁻³ m², 2.40 × 10⁻⁴ J); surface energy; angle of contact; excess pressure in drops and bubbles; worked: soap bubble 8.0 Pa, water drop 288 Pa; capillary rise; worked: water rises 2.94 cm, mercury falls 5.35 mm; summary and exam tips. 3 check slides.
- Visuals on all 44 slides (19 SVG slides, 20 tables, 5 plots).
- **Diagrams (13 SVGs, 25 self-checks, all pass):** pressure bars against depth (0.5 px per kPa, 8 px per metre); mercury barometer (0.22 px per mm); hydraulic lift (piston widths 24 and 96 px, area ratio 16, work in = work out); hose with five streamlines (radii 30 and 15 px, speed arrows 1:4); efflux jet landing exactly on the ground line; Venturi meter with two open tubes (Δh = 0.765 m, ρgΔh = ½ρ(v₂² − v₁²)); aerofoil with streamline gaps smaller above than below; viscous layers with linear speeds; falling-sphere forces drawn to one scale (B + D = W); soap film on a wire frame; angle of contact (tangent angles of the drawn drops 30° and 140°); force balance on half a drop and half a bubble; capillary rise and depression drawn at 30 px per cm. Each figure was rendered in Chromium and inspected; overlapping or clipped labels found in the first pass (tank, Venturi, shear, film, bubble, contact, barometer, Stokes) were moved.
- **Plots (computed, 4 distinct, 5 slides):** absolute pressure against depth; range against hole depth; speed of the steel ball against time; capillary rise against tube radius. All use analytic `functions`; release.json is 406 KB.
- **Narration:** 12–85 words per slide (mean 58), TTS-safe, numbers in words.
- **Notes:** 4 sections (one per topic) with extra figures; 30 flashcards (t01 8, t02 8, t03 7, t04 7).

## Question bank (87)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4) |
| assertion-reason | 6 | 1 (keys a, b, d, c, a, b: a 2, b 2, c 1, d 1) |
| true-false | 4 | 1 (true, false, false, true) |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 26 | 1 (6), 2 (14) or 3 (6) |
| short | 11 + 8 | 2 / 3 |
| long | 5 | 5 (P = P₀ + ρgh and a diver; Pascal's law and a jack; Bernoulli, efflux and two holes with equal range; Stokes' law and terminal speed of a lead pellet; capillary rise of kerosene) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 19 prose short answers.
- **Difficulty:** d1 12 · d2 36 · d3 34 · d4 6.
- **Competency:** recall 9 · understanding 33 · application 43 · analysis 3 (the case alternatives add evaluation items). Application or higher **52% of items (66% of marks)**.
- **Topic tags:** t01 25 · t02 22 · t03 20 · t04 25.
- **Cases:** a hill-village tank 30 m above a tap (gauge 294 kPa, 24.2 m s⁻¹, or evaluate "four times the height gives four times the speed": 48.5 m s⁻¹); a scooter's hydraulic brake (600 kPa, 360 N per slave piston, or evaluate "the pistons push with more total force, so the brake gives more energy": the master piston moves 8 times as far); a ball bearing in oil (η = 0.678 Pa s, or evaluate "a ball of twice the radius falls at the same speed": 4 times); capillary tubes of 0.20, 0.40 and 0.80 mm (rise 3.67 cm at 0.40 mm, or evaluate "doubling the radius doubles the rise": it halves).

## Chapter tests
- **Short (20 marks, 40 min):** A q003, q022, q042, q063 · B q018, q055, q038 · C q081 or q083 · D q088.
- **Long (40 marks, 90 min):** A q002, q005, q021, q025, q041, q044, q058, q062, q027, q045 · B q017, q037, (q075 or q054), q020, (q039 or q077) · C q080 + (q082 or q084) · D q085, q087.

## Validation
- Build: 0 validator errors, 0 warnings; 500 maths strings parsed (KaTeX strict); 32 SVG visuals / 13 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` fc378c36ab246b870113d9e991c32ef1, of `tests.json` a0497affe2a7b8c467cffcf3a3a2742b).
- 41 scripted re-solve checks pass: every numerical, the MCQs with numbers, the long answers and the case items are re-solved by a different route (integration of ρg over the depth, root finding of the barometer and Bernoulli equations, an RK4 integration of the equation of motion of a falling sphere to its terminal speed, a numerical force balance for capillary height, a numerical dA/dV for the drop). Every printed number in solutions, model answers and marking schemes is built from the same computed variables.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Floating-point artefacts:** the first dump printed 5.000000000000001 mN, 7840.000000000001 N and 359.99999999999994 N (film force, jack load, scooter slave piston); these constants are now rounded to 8 significant figures before printing. release.json was then searched for any number with 7 or more decimals: none remain.
2. **Solution endings and digits:** the mercury-depression item ended on a negative height, so the key (the magnitude, 6.17 mm) was only stated; it now ends "Depression = |h| = 6.17 mm". The bubble-work item showed ΔA = 0.0101 m² (3 significant figures) so that 0.030 × 0.0101 looked like 0.000303; it now prints ΔA = 0.01005 m².
3. **Check callbacks:** the range-num tolerance was tighter than the rounding of the key (1.3856 to 1.39), and the scooter case compared a difference with zero; both were rewritten. The drop-num check now differentiates area and volume (ΔP = S dA/dV).
4. **Word limits:** the two 3-mark answers on gauge pressure and Stokes' law were 28 and 38 words against 50–80 and were extended.
5. **Stems:** every stem names its own context and numbers; ICSE 10 physics, CBSE 9 and 10 science and the other CBSE 11 physics chapters were grepped for "Pascal", "Bernoulli", "capillary", "viscos", "surface tension", "hydraulic" and "upthrust": the only hits are chapter 1 (dimensional-analysis items using η and S) and chapter 8 (the pascal as the unit of stress), which share no set-up with this chapter.
6. **Facts double-checked:** 1000 × 9.8 × 18 = 176 400 Pa and 1.013 × 10⁵ + 1.764 × 10⁵ = 2.777 × 10⁵ Pa; mercury column 101 300 / (13 600 × 9.8) = 0.76005 m, water 10.337 m; lift area ratio (12/3)² = 16 so 14 700 / 16 = 918.75 N and 2.4 m for 0.15 m; hose v₂ = 2.0 × 4 = 8.0 m s⁻¹; efflux √(2 × 9.8 × 0.50) = 3.13 m s⁻¹ with R = 2√(0.50 × 1.5) = 1.732 m; Venturi with A₁/A₂ = 4 and ΔP = 7500 Pa gives v₁ = 1.0 m s⁻¹ because 500 × 15 = 7500; sphere v_t = 2 × 10⁻⁶ × 6900 × 9.8 / 3.6 = 0.03757 m s⁻¹; Re = 1000 × 0.05 × 0.01 / 10⁻³ = 500; soap film F = 2 × 0.030 × 0.080 = 4.8 × 10⁻³ N; ΔP = 4 × 0.030 / 0.015 = 8 Pa and 2 × 0.072 / 5 × 10⁻⁴ = 288 Pa; capillary rise 0.144 / 4.9 = 0.02939 m and mercury 2 × 0.465 × cos 140° / 133.28 = −5.345 mm; Venturi MCQ ΔP = ½ρ(16 − 1)v² = 7.5ρv²; eight drops merging into one halve the surface area.

**Facts a reviewer should double-check:** (a) the Reynolds-number depth and thresholds (about 1000 laminar, 2000 turbulent) against the rationalised book; (b) that the average-pressure idea in `gate-num` (net force on a sluice gate, 3 marks, d4) is acceptable at the rationalised depth; (c) the aerofoil and Magnus explanations, given as Bernoulli pressure differences; (d) the mercury angle of contact (140° in the worked example, 135° in `merc-num`, both stated as data in the stems); (e) typical viscosity and surface-tension values in the tables (air 1.8 × 10⁻⁵, glycerine 1.4 Pa s at about 20 °C, soap solution about 0.03, alcohol about 0.022 N m⁻¹), described as "about" and given again in every stem that uses them; (f) the case alternatives' model answers (each gives the corrected numbers).

### Subject-producer review (2026-11-05)
Every numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5): all keys check out. Scope fix: the syllabus asks for Reynolds number qualitatively, so the critical-speed numerical (crit-num) was removed; the qualitative Reynolds items stay. Six numericals tagged "understanding" were retagged "application" (application or higher now 59%, 87 items). Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Graph sketches asked for in answers are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae.
- The sluice-gate item and the Reynolds-number items depend on the scope decisions in the Scope section above.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
