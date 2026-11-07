# CBSE Class 11 Physics, Chapter 13 — Oscillations

`cbse-11-physics-ch13` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 21 slides), notes (3 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch13_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch13_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch13/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the constants, a number-to-words helper for narration, the closed forms and the independent numerical routes (a fourth-order Runge-Kutta integrator for the spring and pendulum equations of motion) used by the re-solves; `svgs.mjs` the four diagrams with self-checks; `decks.mjs` all worked-example numbers, plots and tables; `study.mjs` notes and flashcards; `questions.mjs`, `questions-t2.mjs`, `questions-t3.mjs`, `questions-long.mjs` the bank (t01, t02, t03, long and case-based items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 periodic and oscillatory motion, period, frequency and angular frequency; displacement as a function of time and x = A cos(ωt + φ) with the phase and the phase constant (found from x(0) and the direction of v(0)); SHM and uniform circular motion (the reference circle); velocity v = −Aω sin(ωt + φ) = ±ω√(A² − x²) and acceleration a = −ω²x, their maxima and their phases relative to x. t02 the force law F = −kx (ω² = k/m), the loaded spring and T = 2π√(m/k), kinetic, potential and total energy of SHM (E = ½kA²; KE = PE at x = A/√2; energy against position and against time). t03 the simple pendulum: the restoring force −mg sin θ, the small-angle approximation, T = 2π√(L/g), independence of the mass and of the amplitude (for small angles), the seconds pendulum, and the comparison with the spring oscillator.
- **Not taught** (removed in the rationalisation, or not named by the syllabus topics): damped oscillations, forced oscillations and resonance (the decks say once that they are not part of the course); vertical springs and springs in series or parallel; the pendulum in an accelerating lift; the large-angle correction to the period (only a table of θ against sin θ and a statement that the period is slightly longer); angular SHM and the torsional pendulum; the differential-equation derivation of x = A cos(ωt + φ) (SHM is defined by a = −ω²x and the cosine is taken as its solution, checked by integration in the build).
- Data and constants stated in the stems: g = 9.8 m s⁻² throughout (1.62 m s⁻² for the Moon in Example 10 and 3.7 m s⁻² for Mars in one item, always given in the text); angles for cos(ωt + φ) are in radian; masses, force constants and amplitudes are given in every stem. No NCERT, exemplar or past-paper text is used; contexts are Indian (a nurse's pulse count, a sewing machine, a hair trimmer, a Mysuru school laboratory, a Bhopal air track, a Hyderabad science museum, a Chennai spring experiment, a Kochi exhibition) and none repeats the pendulum items of CBSE 11 chapter 1 (temple pendulum of 3.0 s, Pune laboratory pendulum of 0.800 m) or the swing item in ICSE 10 sound.

## Shape
- **Part 1 (t01, 20 slides):** periodic and oscillatory motion (table of periodic / oscillatory / SHM examples); worked: a pulse of 72 beats per minute (T 0.833 s, f 1.20 Hz, ω 7.54 rad s⁻¹); displacement against time (cosine plot, A = 10 cm, T = 2 s); the equation, the phase and the phase constant (two plots shifted by π/3); worked: reading x = 0.12 cos(4πt + π/3) m (x(0) 0.060 m, v(0) −1.306 m s⁻¹, a(0) −9.475 m s⁻²); check; the reference circle (diagram); worked: from x = A to x = A/2 on a circle of radius 0.20 m at 1.5 rev s⁻¹ (T/6 = 0.111 s, v_max 1.885 m s⁻¹); velocity and acceleration (normalised plot of x, v, a over one period); phase relations (table); check; worked: A = 0.080 m, T = 0.40 s (v_max 1.257, a_max 19.74, v at 0.050 m 0.981 m s⁻¹, a 12.34 m s⁻²); worked: φ = 4π/3 from x(0) = −0.030 m moving towards +x; check; how to recognise SHM; check; summary; exam tips. 4 check slides, 5 worked examples.
- **Part 2 (t02–t03, 21 slides):** the force law (diagram of the block at −A, 0, +A); the loaded spring and T = 2π√(m/k) (T against m plot); worked: 0.50 kg on 80 N m⁻¹ (ω 12.65 rad s⁻¹, T 0.497 s); worked: 25 oscillations of a 2.4 kg glider in 20.0 s (k 148.0 N m⁻¹, 5.40 kg for T = 1.2 s); check; energy in SHM (energy against position plot); the energy bars (diagram); energy against time (plot); worked: 0.20 kg, 50 N m⁻¹, A = 0.060 m (E 0.090 J, KE 0.0675 J and v 0.822 m s⁻¹ at 0.030 m, v_max 0.949 m s⁻¹); worked: KE = PE at A/√2 = 0.0707 m, 64% kinetic at 0.060 m of 0.10 m; check; the pendulum and its restoring force (diagram); T = 2π√(L/g) (T against L plot, Earth and Moon); why the angle must be small (table of θ and sin θ at 2°, 5°, 10°, 20°, 30°); worked: the seconds pendulum (0.993 m; 4.919 s on the Moon); worked: a clock whose pendulum lengthens by 2.0% loses 851 s (14.2 min) per day; spring and pendulum compared; check; summary; exam tips. 3 check slides, 6 worked examples.
- Visuals on all 41 slides (6 SVG uses of 4 diagrams, 24 tables, 11 plots).
- **Diagrams (4 SVGs; 16 self-checks in the build, all pass):** the reference circle (|OP| = A, Q = A cos(50°), the drawn x-component of the tangential velocity agrees with the numerical slope of A cos(phase)); a block on a spring at −A, 0, +A with the restoring-force arrows opposite to and proportional to the displacement; a pendulum with the weight resolved into mg cos θ along the string and mg sin θ along the arc (the two components add back to mg numerically, are perpendicular, and the tension balances mg cos θ); five energy bars with KE + PE = E and PE ∝ x². Each was rendered in Chromium and inspected (the reference-circle labels were moved after the first render). A twelve-line check block in `build.mjs` re-derives every worked example by integrating the equation of motion, and checks the θ-against-sin θ table and the 10° period correction.
- **Plots (computed, 7 distinct, all analytic `functions`):** x = 10 cos(πt) cm; the same with φ = π/3; x/A, v/(Aω), a/(Aω²) against ωt; T against m for k = 20 and 80 N m⁻¹; PE and KE against x with the horizontal line E = 0.090 J; KE/E and PE/E against t/T; T against L on the Earth and the Moon. release.json is 313 KB.
- **Narration:** 7–75 words per slide (mean 56), TTS-safe, every number written in words by the helper `w()` or typed and checked against the computed value.
- **Notes:** 3 sections (one per topic) with extra figures and tables; 30 flashcards (t01 13, t02 11, t03 6).

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 17 | 1 (keys a 5, b 4, c 4, d 4) |
| assertion-reason | 5 | 1 (keys a, d, b, c, a: a 2, b 1, c 1, d 1) |
| true-false | 2 | 1 (true, false) |
| fill-blank | 3 | 1 |
| numerical | 21 | 1, 2 or 3 (2 one-mark, 8 two-mark, 11 three-mark) |
| short | 8 + 6 | 2 / 3 |
| long | 5 | 5 (SHM with v, a and numbers; the reference circle with numbers; the spring with derivation and numbers; energy with derivation and numbers; the pendulum with derivation and numbers) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 14 prose short answers.
- **Difficulty:** d1 10 · d2 29 · d3 30 · d4 2 (the case alternatives add four more d4 evaluation items).
- **Competency (as asked, never retagged to fit the band):** recall 6 · understanding 28 · application 35 · analysis 2 (the case alternatives add evaluation items). Application or higher **52% of items (65% of marks)**; every numerical is tagged application, the derivations and "explain why" items understanding. No tag was changed after the first build.
- **Topic tags:** t01 31 · t02 26 · t03 16 (two items carry two tags).
- **Cases:** a Mysuru trolley (T 0.80 s, ω 7.85 rad s⁻¹, 0.544 m s⁻¹ at 0.040 m, or evaluate "half the amplitude means half the maximum speed"); a Bhopal air-track glider (E 0.150 J, 0.866 m s⁻¹ at 0.025 m, or evaluate "half the energy is kinetic at A/2"); a Hyderabad museum pendulum (T 4.01 s, v_max 0.656 m s⁻¹ for a 6.0° release, or evaluate "a double-mass bob halves the period"); a Chennai T²-against-m experiment (k 101 N m⁻¹ from the 0.80 kg reading, 1.12 s for 3.2 kg, or evaluate "T is proportional to m"). The T²–m case is not used in the chapter tests.

## Chapter tests
- **Short (20 marks, 40 min):** A q004, q032, q049, q036 · B q027, q045, q061 · C q065 or q067 · D q068.
- **Long (40 marks, 90 min):** A q001, q009, q005, q030, q031, q033, q050, q051, q011, q035 · B q025, q046, (q026 or q059), q028, (q048 or q062) · C q063 + (q066 or q064) · D q069, q070.

## Validation
- Build: 0 validator errors, 0 warnings; 812 maths strings parsed (KaTeX strict); 10 SVG visuals / 4 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` and `tests.json` in the report to the subject-producer).
- 37 scripted re-solve checks pass: every numerical, the MCQs with numbers, the long answers and the case items are re-solved by a different route, mainly by integrating the equation of motion with a fourth-order Runge-Kutta scheme (`springAt`, `springPeriodSim`, `pendulumPeriodSim` in `phys.mjs`): the speed at a given displacement and the maximum speed are read from the integrated motion, the period is four times the first zero crossing, the phase constant is recovered from x(0) and the sign of v(0), the maximum acceleration is a finite difference of the integrated velocity, the pendulum periods use the full equation θ″ = −(g/L) sin θ at 0.05 rad (the 6.0° museum swing uses θ = 6°, and its SHM speed 0.656 m s⁻¹ is checked against energy conservation, 0.655 m s⁻¹). Every printed number in solutions, model answers and marking schemes is built from the same computed variables; a plain-text `sciu` helper is available for × 10ⁿ in schemes.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-05)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Key not reached:** the stage-5 check flagged the kinetic-energy-percentage item (the solution ended "KE/E = 0.510"; the key is 51.0 per cent); the last step now multiplies by 100 and ends "= 51.0 per cent".
2. **Word limits:** ten prose answers (derivations with long formulas, three case part (c) answers and the hockey-ball answer) were outside the 0.8–1.2 slack of their limits; the wording around the formulas was lengthened or trimmed.
3. **Rounding:** the glider case printed KE = 0.113 J and then used 0.1125 J; it now prints 0.1125 J in both places.
4. **Hand-typed numbers in schemes and slides:** "246.74", "22.05 and 39.478", "0.36" and the 0.5% / 4.7% error figures of the pendulum slide were typed by hand; all are now computed.
5. **Build-script bug:** the T²–m case check compared "0.4" with "0.40" as strings; fixed.
6. **Scope:** a bullet about a pendulum in orbit was removed as outside the syllabus.
7. **Figures:** in the reference circle the phase label overlapped the velocity arrow and the dashed projection line, and the −A / +A labels sat on the circle; the arrow moved below the diameter, the label became θ (with θ = ωt + φ in the text) and the end labels moved outside the circle.
8. **Stems:** every stem names its own context and numbers; grepped authored content for "pendulum", "simple harmonic", "time period", "spring constant" and "force constant": only the ch01 dimensional pendulum items, the ICSE 10 sound items and unrelated hits (a moving-coil galvanometer spring) — none shares a set-up or numbers with this chapter.
9. **Facts double-checked:** T(0.50 kg, 80 N m⁻¹) 0.4967 s; k (2.4 kg, 0.80 s) 148.04 N m⁻¹; L (seconds pendulum, g = 9.8) 0.99294 m and T on the Moon 4.919 s; clock loss 851.2 s (integrated pendulums: 851 s); 6.0° pendulum speed 0.6556 (SHM) against 0.6554 m s⁻¹ (energy); sin θ against θ at 10° and 30°: 0.51% and 4.72% (as a share of sin θ).

**Facts a reviewer should double-check:** (a) that the rationalised book still teaches the reference-circle derivation, the phase constant found from the initial conditions and the energy-against-time result (KE = E sin² ωt, period T/2) at this depth; (b) the statement "small angles, up to about 10°" and the table of θ against sin θ; (c) that the T²–m graph item (case 4 and its multiple-choice part) is acceptable as a "graph" item without an image (the data are in the passage); (d) the Moon (1.62 m s⁻²) and Mars (3.7 m s⁻²) values of g, given in the text, not asserted as facts to learn; (e) the 6.0° museum swing is treated as SHM, per the stem; (f) the case alternatives' model answers (each gives the corrected numbers); (g) the competency tags (all numericals are application, even one-step substitutions, per the team rule), which leave the bank at 52% application or higher.

### Subject-producer review (2026-11-07)
Every numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5) from the built bank: all keys and printed values check out (e.g. trimmer blade 853 m s⁻², phase constant 0.644 rad, clock at the hill station loses 88.2 s a day, two pendulums 1.00 m and 0.360 m). Competency tags are honest (every numerical is application); no tags were changed. Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Damped and forced oscillations, resonance, vertical and combined springs, the lift problem and the large-angle correction are omitted (see Scope); add them if the owner confirms the 2026-27 book keeps them.
- The graph sketches asked for in answers are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
- The bank has fewer t03 items (16) than t01 (31) because the pendulum has fewer distinct results; the tests still draw on all three topics.
