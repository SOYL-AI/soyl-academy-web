# CBSE Class 11 Physics, Chapter 14 — Waves

`cbse-11-physics-ch14` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 20 slides), notes (4 sections), 30 flashcards, 86 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch14_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch14_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch14/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds constants, the number-to-words helper for narration, closed forms and independent numerical routes (root-finding on boundary conditions for strings and pipes, a sampled-signal swell counter, central differences) used by the re-solves; `svgs.mjs` the seven diagrams with self-checks; `decks.mjs` all worked-example numbers, plots and tables; `study.mjs` notes and flashcards; `questions.mjs`, `questions-t3.mjs`, `questions-long.mjs` the bank (t01–t02; t03–t04; long and case-based items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 mechanical waves, transverse and longitudinal waves, speed of a wave: on a string v = √(T/μ); in a solid v = √(Y/ρ) and in a fluid √(B/ρ); sound in a gas by Newton (isothermal, √(P/ρ)) and Laplace (adiabatic, √(γP/ρ)), v = √(γRT/M) ∝ √T, pressure alone has no effect at constant temperature; t02 y = a sin(kx − ωt + φ), amplitude, phase, wavelength, angular wave number, period, frequency, v = ω/k = fλ, direction from the sign of ωt, particle velocity ∂y/∂t with maximum aω, phase difference kΔx = ωΔt; t03 principle of superposition (resultant amplitude of two waves of one frequency), reflection at a fixed and a free end, standing waves y = 2a sin kx cos ωt (nodes, antinodes, spacing λ/2), normal modes of a string (f = nv/2L), open pipes (nv/2L) and closed pipes ((2n−1)v/4L) with fundamental and harmonics, end corrections ignored; t04 beats, f_b = |f₁ − f₂|, pitch heard = average.
- **Not taught:** the effect of humidity on the speed of sound (the rationalised book is not certain to keep it); the Doppler effect (not in the syllabus entry); end corrections; wave intensity and power; transmission at a boundary between two strings. Temperature and pressure effects are given only as consequences of v = √(γRT/M).
- Data stated in the stems: speed of sound 340 m s⁻¹ (room temperature) unless another value is given, 331 m s⁻¹ at 0 °C, γ = 1.4 for air, P = 1.013 × 10⁵ Pa, ρ_air = 1.29 kg m⁻³ at 0 °C, material data (Young modulus and density of steel, density and γ of argon and hydrogen) given in the stem as data. Contexts are Indian (a Kolkata concert hall, Varanasi tanpura, Madurai bamboo flute, Pune violin student, Chennai ultrasound scan, a tabla, sitar, sarod and guitar strings). The chapter does not reuse the CBSE 11 ch01 string-speed numbers (F = 180 N, μ = 0.020 kg m⁻¹).

## Shape
- **Part 1 (t01–t02, 20 slides):** what a wave carries; transverse and longitudinal waves (diagram, table); v = √(T/μ) (plot); worked: 15 g, 2.5 m string at 120 N gives 141 m s⁻¹, doubled with four times the tension; check; sound speed: Newton and Laplace (table); worked: air at 0 °C gives 280 and 332 m s⁻¹; temperature and pressure (plot); worked: 347 m s⁻¹ at 27 °C, double the speed at 1092 K = 819 °C; check; the progressive-wave equation; worked: y = 0.0050 sin(8.0x − 2400t) gives λ 0.785 m, f 382 Hz, v 300 m s⁻¹, T 2.62 ms; particle velocity (diagram; a ω = 12 m s⁻¹); phase and phase difference; worked: 1.2 rad for 0.15 m, π at 0.393 m, 2.4 rad in 1.0 ms; check; worked: writing the equation of a 200 Hz sound wave moving along −x (k = 3.70 rad m⁻¹); summary; exam tips. 3 checks.
- **Part 2 (t03–t04, 20 slides):** superposition (plot); worked: 3.0 mm and 4.0 mm at 90° give 5.0 mm (7.0 and 1.0 for the extremes); reflection (diagram); worked: pulse on a 12 m, 3.0 kg rope at 75 N returns in 1.39 s, inverted; standing waves (plot with nodes); check; modes of a string (diagram); worked: guitar string 0.65 m, 150 N, 1.0 g m⁻¹ gives 298, 596, 894 Hz; organ pipes (diagram); worked: open 400, 800, 1200 Hz and closed 200, 600, 1000 Hz for 0.425 m; check; comparison table; worked: closed pipe resonating at 170 Hz is 0.50 m long, next 510 and 850 Hz; beats (diagram); worked: 256 and 260 Hz give 4 Hz, a swell every 0.25 s, pitch 258 Hz; worked: closed pipes of 0.500 m and 0.510 m give 3.33 Hz; check; summary; exam tips. 3 checks.
- Visuals on all 40 slides (10 SVG slides, 23 tables, 7 plots).
- **Diagrams (7 SVGs; 7 self-checks in the build plus 13 worked-example re-derivations, all pass):** transverse and longitudinal waves from one sine rule (particles keep their line; compressions where the spacing is least; crests λ apart); a snapshot of a travelling wave at t = 0 and T/8 (crest shifted by λ/8 = v Δt, one particle moving down); particle velocities at nine points (numerical derivative equals −aω cos(kx); zero at the crest; a point just right of a crest moves up); reflection of a pulse at a fixed and a free end by the method of images (fixed end: zero displacement at all times and an inverted return; free end: zero slope, upright, twice as tall at arrival); the first four string modes (n−1 interior nodes; frequencies 1 : 2 : 3 : 4 from root-finding sin kL = 0); open pipe modes 1, 2, 3 and closed pipe modes 1, 3, 5 (frequencies from the boundary-condition roots; interior nodes n and n−1; L = nλ/2 and (2n−1)λ/4); beats of 9 Hz and 12 Hz (swells counted from the sampled sum; peak 2a; the sum stays inside the envelope). Each was rendered and inspected; overlapping labels in three of them were moved.
- **Plots (computed, 4 distinct):** v against tension for two strings; v against T for air; two waves of equal frequency and their sum; three snapshots of a standing wave with the nodes marked. All are analytic `functions`; release.json is about 500 KB.
- **Narration:** 7–77 words per slide (mean 56), TTS-safe, numbers written as words by the helper `w()`.
- **Notes:** 4 sections (one per topic) with extra figures and tables; 30 flashcards (t01 10, t02 8, t03 9, t04 3).

## Question bank (86)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5) |
| assertion-reason | 5 | 1 (keys a, d, c, b, c) |
| true-false | 5 | 1 (four false, one true) |
| fill-blank | 4 | 1 |
| numerical | 26 | 1, 2 or 3 |
| short | 8 + 6 | 2 / 3 |
| long | 6 | 5 (string modes, pipes, progressive wave, sound speed, standing waves, beats) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the prose short answers (the four derivation short answers whose model answers are mostly mathematics, and the numerical short answers in the cases, carry no word limit).
- **Difficulty:** d1 14 · d2 32 · d3 38 · d4 2.
- **Competency:** recall 8 · understanding 29 · application 46 · analysis 2 · evaluation 1 (case alternatives add evaluation items). Application or higher **57% of items (68% of marks)**. No tag was changed to reach the band; the first build landed at 57% without edits.
- **Topic tags:** t01 20 · t02 19 · t03 35 · t04 14 (one item carries two tags).
- **Cases:** a Varanasi tanpura (88.4 Hz at 40 N, 133 Hz at 90 N, or evaluate "the wavelength becomes shorter"); a Madurai bamboo tube of 0.60 m (283 Hz open; 142 and 425 Hz corked, or evaluate "corking doubles the pitch"); a Pune violin tuned against 440 Hz (4 swells per second then 2: the string was 436 Hz, now 438 Hz, or evaluate "loosen it"); a Chennai ultrasound scan (0.770 mm, particle speed 0.126 m s⁻¹, or evaluate "particles move at 1540 m s⁻¹").

## Chapter tests
- **Short (20 marks, 40 min):** A q003, q020, q039, q076 · B q014, q059, q063 · C q080 or q081 · D q083.
- **Long (40 marks, 90 min):** A q001, q006, q018, q021, q038, q040, q042, q067, q034, q049 · B q013, q029, (q061 or q074), q031, (q062 or q075) · C q079 + (q078 or q082) · D q085, q086.

## Validation
- Build: 0 validator errors, 0 warnings; 650 maths strings parsed (KaTeX strict); 17 SVG visuals / 7 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` and `tests.json` in the report).
- 50 scripted re-solve checks pass: numericals, MCQs with numbers, long answers and case items are re-solved by a different route (root-finding on the boundary conditions sin kL = 0 and cos kL = 0 for string and pipe frequencies; swells counted from a sampled sum of two sinusoids; a numerical derivative for the particle speed; independent recomputation of v from √(γRT/M) for the density-based Laplace item; the standing-wave identity checked at sample points). Every printed number in solutions, model answers and marking schemes is built from the same computed variables.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-07)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Word limits:** five model answers were outside their limits (four derivations whose model answer is mostly mathematics were too short once the maths is stripped; the closed-pipe short answer was one word over). The four derivations now carry no word limit and the closed-pipe answer was shortened.
2. **Missing items:** two items named by check slides did not yet exist (the pressure-independence MCQ and the node-spacing numerical); both were added and the wavelength check slide was pointed at its real key.
3. **Beat counting:** the first swell counter confused the carrier ripple with the beats at 9 and 12 Hz, and a plain sine sum does not reach 2 at the swell centres; the beat figure now uses cosines (both waves in step at t = 0 and every 1/3 s) and the counter lists the peaks of |sum| and counts the merged maxima of those heights.
4. **Figures:** labels collided with the curves in the wave-type, snapshot and particle-velocity figures and the "f = f₁" label of the string-mode figure was clipped; all were moved and re-rendered.
5. **Signs:** the particle velocity in the velocity figure had the opposite sign in the first draft; the self-check caught it (a point just right of a crest must move up).
6. **Facts double-checked:** Newton 280.2 and Laplace 331.6 m s⁻¹ for air at 0 °C; 347.0 m s⁻¹ at 27 °C; 308 m s⁻¹ for argon from the data in the stem (which agrees with √(γRT/M) at M = 39.9 g mol⁻¹ to 0.1%); guitar string 297.9, 595.8, 893.8 Hz; open 0.60 m and 0.62 m pipes 283.33 and 274.19 Hz; every closed-pipe resonance in the bank is an odd multiple of its fundamental.

**Facts a reviewer should double-check:** (a) that the rationalised book still teaches Newton's formula and Laplace's correction and the temperature dependence v ∝ √T at this depth (humidity is deliberately left out), and the particle velocity aω; (b) that the open and closed pipe formulae are taught with end corrections ignored; (c) the stems give material data (Young modulus and density of steel, density and γ of argon and hydrogen) as data, not as claims; (d) 331 m s⁻¹ at 0 °C and 340 m s⁻¹ at room temperature are both used, each stated where needed; (e) the case alternatives' model answers (each evaluates a wrong claim with corrected numbers); (f) `beatpipe-num` carries both t03 and t04 tags; (g) only two items are d4.

### Subject-producer review (2026-11-08)
Every numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5) from the built bank: all keys check out (e.g. steel rail 5060 m/s, argon 308 m/s, hydrogen 1062 and 1256 m/s, closed-pipe resonances 100/300/500 Hz, beat frequency of two open pipes 9.14 Hz). One fix: the solution summary of the violin long answer printed 283 m/s and 428, 857, 1285 Hz, which did not match the model answer; it now reads 282.8 m/s and 428.5, 857.1, 1286 Hz. Competency tags are honest (every numerical is application); no tags were changed. Writer: Sonnet 5.5 chapter sub-agent under D-050.

### Subject-producer review, second pass (2026-11-09)
The resumed subject-producer (Opus 5.5) re-read every item, case part and alternative in the dumped bank, every slide (body, bullets, narration, visual), the notes and the 30 flashcards, and rendered all seven diagrams (headless Chromium, 840 px wide) to look at them. All keys and numbers re-check (e.g. 89.4 m/s, 218 N, 5060 m/s, 308 m/s, 0.636 s, 477 Hz, 4.62 rad/m, 1.88 m/s, 34.6 mm, 147 N, 750 Hz, 33.2 cm, 9.14 Hz, 42.2 N, 9.74 mm, 354.4 m/s, 2.51 m, 0.126 m/s). Fixes:
1. **q019 (wave along −x):** the solution named the equations by position ("the second and third"), but options are shuffled by the build, so the ordinals pointed at the wrong options; it now quotes the equations themselves.
2. **One-mark schemes:** the schemes of q073 (72 swells) and the case parts q083/b, q084/b, q085/b, q086/b gave the mark for a step without the asked answer; each now states the final value (72 swells, 88.4 Hz, 283 Hz, 0.25 s, 0.770 mm).
3. **Figures:** in the reflection figure the ring at the free end stayed on the axis while the string's end rose to twice the pulse height at arrival; the ring is now drawn at the end's displacement (it rides with the string). In the string-modes figure the label "f = f₁ (lowest)" ran past the right edge and the caption line lay below the viewBox (invisible); the label is now "f = f₁", the figure is taller and the caption shorter. The other five figures render cleanly and their physics was checked by eye (snapshot shift and particle motion, particle-velocity signs, pipe end conditions, beat swells every 1/3 s).
4. **Check slide (Part 2, beats):** the narration hint talked about how far apart the frequencies must be, but the linked item (q076) turns on whether two waves of different frequencies stay in phase; the hint now matches.
5. **Notes:** the "not treated" line spoke about the rationalised book to the student; it now simply lists humidity and the Doppler effect as not treated in this chapter.

## Known gaps
- Humidity, the Doppler effect, intensity of waves, end corrections and transmission at a boundary are omitted (see Scope).
- Graph sketches asked for in answers are described in words; graders should accept any correct sketch. Slide plots are computed from the stated formulae; the diagrams are drawn to the stated scales (the beats figure uses 9 Hz and 12 Hz to keep it legible).
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
