# CBSE Class 11 Physics, Chapter 12 — Kinetic Theory

`cbse-11-physics-ch12` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 20 slides), notes (4 sections), 30 flashcards, 83 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch12_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch12_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch12/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the constants, a number-to-words helper for narration, the closed forms and independent numerical routes (a molecule-by-molecule wall-pressure sum, rms and mean of a list, a root finder) used by the re-solves; `svgs.mjs` the six diagrams with self-checks; `decks.mjs` all worked-example numbers, plots and tables; `study.mjs` notes and flashcards; `questions.mjs`, `questions-t3.mjs`, `questions-long.mjs` the bank (t01–t02, t03–t04, long and case-based items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 the equation of state of a perfect gas, P V = n R T = N k_B T, and Boyle, Charles, Gay-Lussac and Avogadro as special cases (isotherms, isobars, the combined law, density of a gas, ideal versus real gases); t02 the kinetic theory of an ideal gas: assumptions, the pressure P = (1/3) ρ v̄² derived from one wall of a cube, the kinetic meaning of temperature ((1/2) m v̄² = (3/2) k_B T), rms speed against mean speed, Dalton's law of partial pressures; t03 degrees of freedom (monatomic 3, rigid diatomic 5, non-linear polyatomic 6, each vibration adds 2), the law of equipartition, C_V = (f/2) R, C_P = C_V + R, γ = 1 + 2/f for monatomic, diatomic and polyatomic gases and for mixtures; t04 mean free path λ = 1/(√2 π d² n) with n = P/(k_B T) (dependence on n, d, P, T; collision frequency ≈ speed/λ) and Avogadro's number and law.
- **Not taught** (the syllabus topics do not name them, and the rationalised book is not certain to keep them): specific heats of solids and of water, the Maxwell speed distribution and the most probable speed (the speed plots are v_rms ∝ √T curves, a ten-molecule bar chart and rms bars to scale), a derivation of the mean free path formula, and the proof of C_P − C_V = R (taken from chapter 11, Thermodynamics, as a stated relation). Linear polyatomic molecules (CO₂) are not examined.
- Data and constants stated in the stems: R = 8.314 J mol⁻¹ K⁻¹; k_B = 1.38 × 10⁻²³ J K⁻¹; N_A = 6.02 × 10²³ mol⁻¹; 1 atm = 1.013 × 10⁵ Pa; T (K) = t (°C) + 273; 1 eV = 1.6 × 10⁻¹⁹ J; g = 9.8 m s⁻² and water density 1000 kg m⁻³ where used; molar masses and molecular diameters are always given in the stem. No NCERT, exemplar or past-paper text is used; contexts are Indian (a Jaipur bus tyre, a Pune balloon fair and hospital, a Bengaluru laboratory, the Moon, a satellite-test vacuum chamber).

## Shape
- **Part 1 (t01–t02, 19 slides):** the equation of state (constants table); the gas laws as special cases (isotherm plot); worked: 4.0 mol of helium in 0.050 m³ at 300 K gives 2.00 × 10⁵ Pa (1.97 atm); isotherm check; worked: density of air 1.18 kg m⁻³ and molar volume 24.6 L (isobar plot); real versus ideal gases; the kinetic model (five assumptions); pressure from one collision (molecule in a cube: 2 m vx, 2L/vx, m vx²/L); summing over molecules to P = (1/3) ρ v̄²; worked: hydrogen with ρ = 0.090 kg m⁻³ and v_rms = 1840 m s⁻¹ gives 1.02 × 10⁵ Pa; check; temperature as mean translational energy and v_rms = √(3RT/M); worked: nitrogen 517 m s⁻¹ and oxygen 484 m s⁻¹ at 300 K, mean energy 6.21 × 10⁻²¹ J; mean speed against rms speed (ten sample speeds, 400 and 435.9 m s⁻¹) with Dalton's law; worked: v_rms × 1.5 from 27 °C needs 675 K = 402 °C; AR check; summary; exam tips. 3 check slides.
- **Part 2 (t03–t04, 20 slides):** degrees of freedom (diagram); equipartition (table); worked: oxygen at 330 K, 1.14 × 10⁻²⁰ J per molecule, 6859 J per mole, 13.7 kJ for 2.0 mol; check (fill-blank); C_V, C_P and γ from f (bar chart); worked: 3.0 mol of nitrogen through 40 K needs 2494 J at constant volume and 3492 J at constant pressure (work 998 J); table of f, C_V/R, C_P/R, γ for four gas models; worked: 1.0 mol argon + 2.0 mol oxygen gives γ = 1.46; check (numerical); mean free path (zigzag diagram); its dependence on n, d, P and T (λ against P plot); worked: λ = 102 nm for molecules of diameter 3.0 × 10⁻¹⁰ m at 1 atm and 300 K, about 341 diameters, 4.6 × 10⁹ collisions per second; worked: at 0.010 Pa λ = 1.04 m, longer than a 0.5 m tube; check; Avogadro's number and law (molar volume 22.4 L, 2.69 × 10²⁵ m⁻³ at 0 °C); worked: 2.8 g of nitrogen has 6.02 × 10²² molecules, one molecule 4.65 × 10⁻²⁶ kg; AR check; summary; exam tips. 4 check slides.
- Visuals on all 39 slides (11 SVG, 21 tables, 7 plots).
- **Diagrams (6 SVGs; 16 self-checks in the build, all pass):** one molecule bouncing off the wall of a cube (reflection reverses vx, keeps vy and speed; 2 m vx ÷ (2L/vx) = m vx²/L); degrees of freedom of a monatomic, a rigid diatomic and a bent triatomic molecule (3N = translation + rotation + vibration; f = 3, 5, 6 and 3, 7, 12 with vibration); C_V and C_P bars in units of R (C_P − C_V = R, γ = 5/3, 7/5, 4/3); ten free paths of one molecule with their mean printed; ten sample speeds with mean 400 and rms 435.9 m s⁻¹; rms speeds of five gases at 300 K to scale (hydrogen ÷ oxygen = 4, helium ÷ nitrogen = √7). Each was rendered and inspected. A wall-pressure sum over 4000 molecules with directions spread evenly over a sphere agrees with (1/3) N m v²/V to 0.1%.
- **Plots (computed, 4 distinct):** isotherms of 1 mol at 250, 300 and 400 K; isobars at 100 and 200 kPa on the kelvin scale; v_rms against T for hydrogen and nitrogen; λ against P at 300 K. All are analytic `functions`; release.json is 354 KB.
- **Narration:** 9–77 words per slide (mean 56), TTS-safe, every number written in words by the helper `w()` or typed and checked against the computed value.
- **Notes:** 4 sections (one per topic) with extra figures and tables; 30 flashcards (t01 8, t02 10, t03 7, t04 5).

## Question bank (83)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4) |
| assertion-reason | 5 | 1 (keys a, d, c, b, a: a 2, b 1, c 1, d 1) |
| true-false | 3 | 1 (false, true, false) |
| fill-blank | 3 | 1 |
| numerical | 26 | 1, 2 or 3 (1 one-mark, 20 two-mark, 5 three-mark) |
| short | 10 + 8 | 2 / 3 |
| long | 5 | 5 (the pressure derivation with a numerical; kinetic energy, rms speed and a temperature problem; equipartition with specific heats and a heat problem; the gas equation with Boyle and Gay-Lussac, pressure, heating and number of molecules; mean free path with its formula, a calculation and a pressure) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 18 prose short answers.
- **Difficulty:** d1 6 · d2 34 · d3 37 · d4 6.
- **Competency:** recall 8 · understanding 29 · application 43 · analysis 3 (the case alternatives add evaluation items). Application or higher **55% of items (65% of marks)**.
- **Topic tags:** t01 19 · t02 28 · t03 20 · t04 18 (two items carry two tags).
- **Cases:** a Pune advertising balloon (120 mol, 3.15 m³ at 42 °C, or evaluate "volume rises in the ratio 42/27"); the Moon at 380 K (hydrogen 2180 m s⁻¹, ratio √14 = 3.74, or evaluate "nitrogen also has 2.2 × 10³ m s⁻¹"); a Bengaluru C_V measurement of 20.8 J mol⁻¹ K⁻¹ (f = 5, C_P = 29.1, 1.75 kJ for 2.0 mol through 30 K at constant pressure, or evaluate "the gas could be helium"); a satellite-test vacuum chamber (λ = 46.6 m at 5.0 × 10⁻⁴ Pa, 0.0116 Pa for λ = 2.0 m, or evaluate "heating the sealed chamber doubles λ").

## Chapter tests
- **Short (20 marks, 40 min):** A q017, q042, q059, q022 · B q013, q036, q057 · C q075 or q077 · D q082.
- **Long (40 marks, 90 min):** A q002, q001, q016, q020, q021, q043, q044, q061, q023, q046 · B q035, q054, (q071 or q014), q038, (q073 or q058) · C q076 + (q078 or q079) · D q081, q083.

## Validation
- Build: 0 validator errors, 0 warnings; 714 maths strings parsed (KaTeX strict); 17 SVG visuals / 6 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` and `tests.json` in the handoff report of the subject-producer).
- 46 scripted re-solve checks pass: each numerical, the MCQs with numbers, the long answers and the case items are re-solved by a different route (R = N_A k_B instead of R, number density × molecular mass for the density, a molecule-by-molecule wall-pressure sum for the kinetic pressure, v_rms from the mass of one molecule, the ratio v₂/v₁ recovered from the answer, the λ ∝ T/P form of the mean free path). Every printed number in solutions, model answers and marking schemes is built from the same computed variables; a plain-text `sciu` helper prints × 10ⁿ in schemes and table cells so that no LaTeX leaks into plain text.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-05)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Unit step in the Dalton item:** the first solution wrote "= 99.77" for a quantity of 99 768 Pa; each partial pressure is now written in Pa and then in kPa.
2. **Final steps:** the −23 °C item and the volume-fraction item did not end on "= key"; they now end "t₂ = 360 − 273 = 87 °C" and "fraction = 3.80" (in units of 10⁻⁴).
3. **Hand-typed summaries:** the one-line `sol` of the mean-free-path long answer said 654 Pa; it is 0.654 Pa (λ = 6.46 × 10⁻⁸ m; 1.013 × 10⁵ × 6.46 × 10⁻⁸ ÷ 1.0 × 10⁻² = 0.654). The vacuum-chamber case said 1.17 × 10⁻² Pa; it is now computed (0.0116 Pa). The temperature long answer printed 1370 m s⁻¹ in the model answer and 1368 in the summary; both now give 1368.
4. **Plain text with LaTeX:** marking-scheme steps and some table cells showed "6.42 \times 10^{-21}"; they now use unicode notation.
5. **Word limits:** five 3-mark answers and two case part (c) answers were shorter than their limits; they now meet them.
6. **Figures:** the speed bars overflowed the frame on the right and the title was clipped; the rms-speed bars overlapped their molar-mass labels; the diatomic panel of the degrees-of-freedom picture had a stray dashed fragment; the free-path caption ran to the edge; the legend showed "C_V" with an underscore. All fixed and re-rendered. The oxygen rms speed is 484 m s⁻¹ (483.6), not 483 as first typed in an alt text.
7. **Stems:** every stem names its own context and numbers; none echoes the CBSE 12, ISC or ICSE items (grepped for "rms speed", "equipartition", "mean free path", "degrees of freedom" and "ideal gas": only unrelated hits, such as the alternating-current rms in ISC 12, and the chemistry gas-law items).
8. **Facts double-checked:** v_rms at 300 K: N₂ 516.9, O₂ 483.6, H₂ 1934, He 1368, CO₂ 412, argon 432.5 m s⁻¹; 462 K gives hydrogen 2.4 × 10³ m s⁻¹; λ(He, 1 atm, 300 K, d = 2.0 × 10⁻¹⁰ m) = 230 nm; 3.0 mol of nitrogen through 40 K: Q_V 2494 J, Q_P 3492 J, W 998 J; γ(2 mol He + 3 mol N₂) = 15.5/10.5 = 1.476; molar volume at 0 °C and 1 atm 22.4 L; 2.69 × 10²⁵ molecules per m³.

**Facts a reviewer should double-check:** (a) that the rationalised book still teaches Dalton's law, the mean-free-path formula λ = 1/(√2 π d² n) and the specific heat of a gas mixture at this depth (the syllabus names the mean free path only "qualitatively"; about eleven of the 83 items use the formula); (b) the statement that vibrational modes are not excited at room temperature, used in `vib-mcq`, `vibmode-short3` and Part 2 (given as a fact, without quantum reasoning); (c) C_P − C_V = R is used from chapter 11 without proof; (d) the molecular diameters (2.0, 3.0 and 3.6 × 10⁻¹⁰ m) and the mean speeds 470 and 480 m s⁻¹ are given in the stems as data, not as claims about real gases; (e) the case alternatives' model answers (each gives the corrected numbers); (f) R = 8.314 and N_A k_B = 8.31 differ by 0.07%, so numerical keys carry a 1% tolerance and each stem names the constants it needs.

### Subject-producer review (2026-11-05)
Every numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5): all keys and printed values check out (mean free paths 230 nm, 23.3 m, 46.6 m, 64.6 nm; rms speeds 433, 1368, 2180 m/s). No competency tags needed changing. Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Specific heat capacity of solids and water, the Maxwell distribution and the most probable speed are omitted (see Scope); add them if the owner confirms the 2026-27 book keeps them.
- Linear polyatomic molecules (CO₂) and partly excited vibrational modes (between 5 and 7 degrees of freedom) are not covered.
- Graph sketches asked for in answers (isotherms) are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae; the bar charts and the free-path picture are drawn to the stated scales.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
