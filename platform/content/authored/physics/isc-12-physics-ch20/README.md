# ISC Class 12 Physics, Chapter 20 — Nuclei and Nuclear Energy

`isc-12-physics-ch20` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 21 slides), notes (7 sections), 30 flashcards, 75 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch20_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch20_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch20/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. `src/dump-svgs.mjs <dir>` writes the diagrams out for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch20: t01 composition of the nucleus (protons, neutrons, Z, N, A, the strong force), isotopes, isobars and isotones, the unified atomic mass unit, the size R = R₀A^(1/3) and the proof that nuclear density 3m/(4πR₀³) does not depend on A; t02 E = mc², 1 u = 931.5 MeV/c², mass defect and binding energy in MeV (from atomic masses with m_H), pair production (threshold 2mₑc² = 1.022 MeV, nucleus needed for momentum) and annihilation (two 0.511 MeV photons); t03 the binding energy per nucleon curve (computed from atomic masses), stability of middle-order nuclei, why fission and fusion both release energy, the energy when a heavy nucleus splits into two halves; t04 fission with balanced equations, the controlled and uncontrolled chain reaction (qualitative), the reactor parts and their functions (fuel, moderator, control rods, coolant, shielding), the nuclear bomb; t05 fusion, hydrogen into helium (proton–proton chain), thermonuclear energy in the Sun and stars, the Coulomb barrier and why very high temperatures are needed, Q values of fusion reactions from masses, the hydrogen bomb.
- **Removed in ISC and not examined:** details of the chain reaction and quantitative reactor operation. The reactor and chain-reaction diagrams are qualitative; no item asks for reactor power, fuel consumption or neutron multiplication factors. **Radioactivity and the decay law are not in this ISC chapter** and are not used.
- Constants used and stated in the stems: m_H = 1.007825 u, mₙ = 1.008665 u (atomic masses are always used with m_H, never m_p, so the electron masses cancel), 1 u = 931.5 MeV (the accepted value; rounded SI constants give 931.6 and the worked example says so), mₑc² = 0.511 MeV, hc = 1240 MeV fm, 1 MeV = 1.6 × 10⁻¹³ J, 1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, k = 1.38 × 10⁻²³ J K⁻¹, R₀ = 1.2 fm (decks and most items) or 1.25 fm (two items, stated), mass of a nucleon 1.67 × 10⁻²⁷ kg, e²/4πε₀ = 1.44 MeV fm.
- Not here: Rutherford and Bohr (ch19), the semiconductor devices (ch21).
- The related CBSE chapter `cbse-12-physics-ch13` was skimmed and its set-ups avoided: no Li-7, O-16, C-12, Fe-56, deuteron or He-4 binding-energy items, no Sr-94/Xe-140 fission, no D–D → He-4 or D–T fusion, no 500/700/1000 MW reactor items, no coal or neutron-star items, no radius items for A = 125, 216, 27 or 8:64. Nuclides here: Ne-20, Na-24/Mg-24, Ca-40/Ca-39, Si-28, H-3/He-3, He-3 + He-3, D + D, D + He-3, Cs-140/Rb-93 and Ba-141/Kr-92 fission, the Ba-144/Kr-89 equation, Sn-120, Zn-64, Pb-208.

## Shape
- **Part 1 (t01–t02, 19 slides):** what is inside a nucleus; isotopes, isobars and isotones (drawn for C-12, C-13, N-13); a check; the size R = R₀A^(1/3) (plot); worked: Zn-64, R = 4.8 fm, ρ = 2.31 × 10¹⁷ kg m⁻³; nuclear density is independent of A (derivation, plot); a check (matchbox of nuclear matter); the unified atomic mass unit; worked: 1 u in J and MeV; mass defect and binding energy; worked: Ne-20, Δm = 0.17246 u, B = 160.65 MeV, 8.03 MeV per nucleon; a check (Ca-40); pair production; annihilation; worked: a 3.00 MeV photon; a check (threshold); summary; exam tips.
- **Part 2 (t03–t05, 21 slides):** the BE/A curve; stability of middle-order nuclei; worked: A = 236 into two halves, 212 MeV; a check; fission; worked: n + U-235 → Ba-141 + Kr-92 + 3n, Q = 173.3 MeV; the chain reaction (controlled and uncontrolled, qualitative); a check (balancing); the reactor; parts and functions; a check (the poorest moderator); the nuclear bomb; fusion and the proton–proton chain; why fusion needs very high temperatures; worked: Coulomb barrier 0.60 MeV and the temperature 4.64 × 10⁹ K, against 1.9 keV at 1.5 × 10⁷ K; worked: D + He-3, Q = 18.35 MeV; stars and the hydrogen bomb; a check; summary; exam tips.
- Visuals on 40 of 40 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 8 SVGs: C-12, C-13 and N-13 nucleon by nucleon with the isotope, isobar and isotone relations; the Ne-20 mass defect to scale with its binding energy; pair production and annihilation; the BE/A curve of 22 nuclides computed from atomic masses (peak Ni-62, 8.795 MeV, He-4 bump, fusion and fission arrows towards the peak); one fission event (adapted from `cbse-12-physics-ch13`, copied not imported); the chain reaction, 1, 2, 4, 8 against 1, 1, 1, 1; a schematic reactor with fuel rods, moderator, control rods between them, coolant circuit with heat exchanger, and shielding; the Coulomb barrier of two protons with the thermal energy at 1.5 × 10⁷ K drawn to scale. Plots: R against A^(1/3) (a straight line) and a flat density against A.

## Question bank (75)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 5 | 1 (keys a 2, b 1, c 1, d 1) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 (neutron counts of nuclides; parts of a reactor and their functions) |
| numerical | 22 | 1 (3) or 2 (19) |
| short | 8 | 2 |
| short | 9 | 3 |
| long | 6 | 5, set in parts with the marks shown (Si-28 binding energy; pair production and annihilation; the BE/A graph and a fission estimate; fission with Q and control; the reactor; fusion with Q of D + D) |

- **Difficulty:** d1 15 · d2 32 · d3 25 · d4 3. **Competency:** recall 9 · understanding 20 · application 33 · analysis 12 · evaluation 1: application or higher **61% of items (67% of marks)** (within the 45–65% band the stage-4 lint applies to physics).
- **Topic tags:** t01 15 · t02 19 · t03 11 · t04 16 · t05 15 (the D–D barrier item is tagged t05 and t01).

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A isotones-mcq, threshold-mcq, ironend-mcq, shield-mcq, hot-ar · B massdefect-short2, (ironstar-short2 or roomtemp-short2) · C he4-short3, (moderator-short3 or fusionneed-short3) · D bea-long.
- **Long (40 marks, 100 min):** A halfradius, amu, defect, bind, fusionside, fall, xneutrons, poormod, ppchain, coretemp (mcq), density-ar, chain-ar · B classify-short2, annih-short2, (chainctl-short2 or hbomb-short2) · C density-short3, unit-short3, student-short3, (pair-short3 or sun-short3) · D si28-long, (fission-long or fusion-long).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 44 scripted re-solve checks pass (binding energies re-derived by the nuclear-mass route Z mₚ + N mₙ − (M − Z mₑ); radii by the cube root and the direct volume; densities by 3m/(4πR₀³); Q values by summing masses and, for fusion, by binding energies B(product) − ΣB(reactants); the momentum-sharing item by equal momenta; thresholds from 2 mₑc²; the barrier from 9 × 10⁹ e²/r).
- 14 diagram self-checks (binding energies agree between the two routes; k e² = 1.44 MeV fm; density equal for A = 8 and A = 216; nucleon counts and relations of the drawn nuclei; Ne-20 numbers and level gap to scale; annihilation photons back to back; the BE/A curve computed from masses, maximum at Ni-62, 22 nuclides in order of A; fission balance; chain generations; control rods between fuel rods; barrier 0.60 MeV and the 1.9 keV line to scale): 0 failures.
- Rebuilding is byte-identical (release.json and tests.json md5 unchanged across two builds).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-02)
Every question was re-solved from its stem. Findings and fixes:
1. **Wrong re-solve in the deck:** the first check of worked example 4 expected 2.43 pm for the pair-production threshold wavelength; the threshold wavelength is 1.21 pm (2.43 pm is the annihilation photon). The threshold MCQ keeps 2.43 pm as a distractor.
2. **Mass-number clash:** the BE/A curve had two nuclides of A = 3 (H-3 and He-3) and failed its "in order of A" check; He-3 was dropped from the curve (it stays in the mirror-nuclei item).
3. **Direction of the arrows:** the first drawing had the fusion arrow pointing left and the fission arrow right; both now point towards the peak (fusion rightwards from light nuclei, fission leftwards from uranium).
4. **Rounding shown as equality:** "4.03 × 10⁻¹⁴ = 4.03", "8.90 × 10³⁷ = 8.90" and "3.68 × 10⁹ = 3.68" (units of 10ⁿ) now end with a true step "x / 10ⁿ = key"; the fusion-by-BE/A item gets a tolerance of 0.6% because 56 × 0.19 = 10.64 is quoted to 3 figures as 10.6.
5. **Word limits:** the density, unit and He-4 short items are derivations or problems (no word limit); the mass-defect, chain-reaction and balance items were rewritten to fit their limits.
6. **Originality:** every set-up was checked against `cbse-12-physics-ch13` (see Scope): different nuclides and numbers (R₀ = 1.25 fm items, the matchbox, the atom-volume fraction, Zn-64, Sn-120, Ne-20, Ca-40, Si-28, Cs-140/Rb-93, the fragment kinetic energies, D–D barrier and temperature).
7. **For the reviewer:** atomic masses (Ne-20 19.992440, Na-23 22.98977, Mg-24 23.985042, Si-28 27.976927, Ca-40 39.962591, Ca-39 38.970710, H-3 3.016049, He-3 3.016029, He-4 4.002603, U-235 235.043930, Ba-141 140.914411, Kr-92 91.926156, Cs-140 139.917283, Rb-93 92.922039); results Ne-20 160.65 MeV (8.03 per nucleon), Ca-40 342.06 MeV, Si-28 236.5 MeV (8.448), Mg-24 Δm 0.2128 u, neutron separation of Ca-40 15.6 MeV, tritium more bound than He-3 by 0.764 MeV, fission Q 173.3 MeV (Ba/Kr) and 174.4 MeV (Cs/Rb), He-3 + He-3 12.86 MeV, D + D → He-3 + n 3.27 MeV, D + He-3 18.35 MeV, p–p net 26.7 MeV (positron annihilation included through atomic masses; neutrino energy ignored), U = 0.60 MeV at 2.4 fm and 0.476 MeV for two touching deuterons, 4.64 × 10⁹ K and 3.68 × 10⁹ K, 1.94 keV at 1.5 × 10⁷ K (ratio 309), 8.9 × 10³⁷ helium nuclei per second at 3.8 × 10²⁶ W; the "nearly flat from A about 30 to 170" statement for B/A; the p–p chain step energies (0.4, 5.5 and 12.9 MeV); that lead is a poor moderator; that the coretemp MCQ answer (a tiny fraction of fast protons) omits quantum tunnelling, which ISC does not require.

### Subject-producer review (2026-11-02)
- **Atomic masses** (u) checked against standard tables (AME): ¹H 1.007825, n 1.008665, p 1.007276, ²H 2.014102, ³H 3.016049, ³He 3.016029, ⁴He 4.002603, ⁶Li 6.015123, ⁹Be 9.012183, ¹⁰B 10.012937, ¹⁴N 14.003074, ¹⁶O 15.994915, ²⁰Ne 19.992440, ²³Na 22.98977, ²⁴Mg 23.985042, ²⁷Al 26.981539, ²⁸Si 27.976927, ³²S 31.972071, ³⁹Ca 38.970710, ⁴⁰Ca 39.962591, ⁵⁶Fe 55.934936, ⁶²Ni 61.928345, ⁹⁰Zr 89.904704, ¹²⁰Sn 119.902202, ¹³⁸Ba 137.905247, ²⁰⁸Pb 207.976652, ²³⁵U 235.043930, ²³⁸U 238.050788, ¹⁴⁰Cs 139.917283, ⁹³Rb 92.922039: all agree with the tables to within 1 × 10⁻⁵ u. ¹⁴¹Ba 140.914411 and ⁹²Kr 91.926156 are the long-standing textbook values; current tables differ by about 1 × 10⁻⁵ and 2 × 10⁻⁵ u (under 0.02 MeV in the 173 MeV Q value), so they were kept.
- **Derived values re-checked:** B(²⁰Ne) 160.6 MeV (8.03 MeV per nucleon), B(⁴He) 28.3 MeV, B(⁴⁰Ca) 342 MeV, B(²⁸Si) 236.5 MeV (8.45 per nucleon), ²⁴Mg Δm 0.2128 u, ³H − ³He binding difference 0.764 MeV, neutron separation from ⁴⁰Ca 15.6 MeV; fission Q 173.3 MeV (Ba + Kr + 3n) and 174.5 MeV (Cs + Rb + 3n); D–D 3.27 MeV, D–³He 18.35 MeV, ³He–³He 12.86 MeV, 4 ¹H → ⁴He 26.7 MeV.
- **Assertion-reason keys:** all five were keyed (a); three were rewritten so the keys are a 2, b 1, c 1, d 1 (nuclear density with a false reason, a steady chain reaction with a false assertion, fusion temperature with a true reason that does not explain it).
- **Fixes:** the Cs + Rb fission marking schemes said “after 235.865315 u, Δm = 0.187280 u”; the sum is 235.865317 u and Δm = 0.187278 u, as the solutions print (Q unchanged). The proton–proton chain table now gives step 1 as 0.42 MeV (1.44 MeV with the positron annihilating), so the steps visibly add up to 26.7 MeV (2 × 1.44 + 2 × 5.49 + 12.86).

## Known gaps
- Diagrams asked for in answers (BE/A graph, reactor) are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
