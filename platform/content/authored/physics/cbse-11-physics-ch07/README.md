# CBSE Class 11 Physics, Chapter 7 — Gravitation

`cbse-11-physics-ch07` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 19 slides), notes (4 sections), 30 flashcards, 83 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch07_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch07_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch07/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the constants (G, M_E, R_E, g) and the independent numerical helpers (Simpson integral, bisection, a leapfrog orbit integrator, period timing, radial infall and an escape test by integrating the motion) used by the re-solves; `svgs.mjs` the five diagrams with self-checks; `decks.mjs` all worked-example numbers, plots and tables; `questions*.mjs` the bank (t01–t02, t03, t04, long and case-based items); `study.mjs` the notes and flashcards; `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 Kepler's three laws (ellipse with the Sun at a focus, equal areas in equal times with the angular-momentum reason, T² ∝ a³ and T² = 4π²r³/GM for circular orbits), Newton's universal law of gravitation, G, superposition for two to three masses (including a point of zero force); t02 g = GM/R² (and (4/3)πGρR), g at a height h (exact and g(1 − 2h/R)) and at a depth d (uniform Earth, only the inner sphere pulls, g′ = g(1 − d/R), zero at the centre); t03 gravitational potential energy U = −GMm/r, potential V = −GM/r (a scalar, so potentials add), potential energy of a few masses, ΔU = mgRh/(R + h) and why it reduces to mgh; t04 escape speed √(2GM/R) = √(2gR), orbital speed and period of a circular orbit (independent of the satellite's mass), K, U and E of a satellite (E = −K, binding energy), raising an orbit, air drag.
- **Left out and stated here (not taught or examined):** the Earth's rotation and the latitude effect on g (the brief says it was removed earlier); geostationary and polar satellites, and weightlessness. The syllabus topics t01–t04 do not name them and the brief says to leave them out unless sure the rationalised book keeps them; the 2026–27 CBSE syllabus text may still list "geostationary satellites", so the owner may want a short add-on (period 24 h, the orbit radius that follows from T² = 4π²r³/GM, and two items). No 24-hour-period item is used anywhere.
- Constants stated in the stems: G = 6.67 × 10⁻¹¹ N m² kg⁻², M_E = 6.0 × 10²⁴ kg, R_E = 6.4 × 10⁶ m, g = 9.8 m s⁻²; where only g and R are given, GM = gR² is used and said so. Body data (Moon, Mars, Phobos, the Mars orbiter, the super-Earth) are given in the stems, never claimed as recalled facts. Indian contexts: Sriharikota, an ISRO-style Earth-observation satellite, an Indian Mars orbiter, a lunar orbiter, a mine shaft, a Himalayan summit, oil tankers.
- No NCERT, exemplar or past-paper text is used. The authored folders were grepped for "Kepler" and "escape speed" (only an ICSE history chapter matches, for another meaning) and the CBSE 10 and CBSE 12 physics/science units contain no gravitation items.

## Shape
- **Part 1 (t01–t02, 19 slides):** Kepler's laws; the law of areas on an ellipse (picture, angular momentum, v_p r_p = v_a r_a); the law of periods (T² against a³ plot of six planets, circular-orbit derivation); worked: a body at 2.25 AU (T = 3.375 years); a quick check; the law of gravitation; worked: Sun–Earth force 3.56 × 10²² N; superposition; worked: 4.0 kg mass with 2.0 kg and 3.0 kg at right angles (5.93 nN, 5.00 nN, 7.76 nN at 40.2°); a check; g from G, M, R; worked: Moon g = 1.62 m s⁻²; g above the surface; g below the surface (g profile plot); worked: 320 km up (8.89, approximate 8.82) and down (9.31 m s⁻²); a check; summary and exam tips. 5 worked examples, 3 checks.
- **Part 2 (t03–t04, 19 slides):** potential energy; worked: 250 kg at 1.0 × 10⁷ m (−1.00 × 10¹⁰ J); potential; worked: potential of 5.0 kg and 10 kg masses; a check; ΔU = mgRh/(R + h) (table of how far mgh drifts); worked: 120 kg to 3200 km (2.51 × 10⁹ J against 3.76 × 10⁹ J for mgh); escape speed (table for Earth, Moon, Mars); worked: Mars (5.01 km s⁻¹); a check; orbital speed and period (Newton's cannon picture); worked: orbit at 2R (5.6 km s⁻¹, 3.99 h); orbital and escape speed against r (plot); satellite energy (K, U, E plot); worked: raising 400 kg from 8.0 × 10⁶ m to 1.2 × 10⁷ m (3.34 × 10⁹ J); a check; summary and exam tips. 6 worked examples, 3 checks.
- Visuals on all 38 slides (13 SVG, 14 tables, 11 plots).
- **Diagrams (5 SVGs, 7 self-checks, all pass):** law of areas on an e = 0.7 ellipse (two wedges swept in equal mean-anomaly intervals have equal polygon area; Sun at a focus; speed ratio 5.67); superposition triangle at 400 px per metre (drawn resultant equals the vector sum of the two pulls; 3–4–5 geometry); Earth cross-section with points at height R and depth R/2 (distances 2R and R/2 from O, g/4 and g/2); Newton's cannon (orbits integrated numerically: v_c stays on r = 1.3, 1.2 v_c reaches the formula's 3.343 R, √2 v_c keeps E = 0 and leaves, slower launches reach the ground; the tower is drawn at 0.3 R so that slow launches have a visible flight); circular orbit at 2R (v = √(gR/2) = 5.600 km/s, T = 3.989 h). Each diagram was rendered in Chromium and inspected.
- **Plots (computed, 5):** T² against a³ for six planets; g against distance from the centre (linear inside, inverse-square outside); U against r; K, U and E against r; orbital and escape speed against r. Analytic `functions` throughout; `release.json` is 354 KB.
- **Narration:** 6–83 words per slide (mean 53), TTS-safe, units spelled out.
- **Notes:** 4 sections (one per topic) with extra figures; 30 flashcards (t01 9, t02 9, t03 5, t04 7).

## Question bank (83)
| Type | Count | Marks |
|---|---|---|
| mcq | 18 | 1 (keys a 5, b 5, c 4, d 4) |
| assertion-reason | 6 | 1 (keys a, c, d, a, b, c: a 2, b 1, c 2, d 1) |
| true-false | 5 | 1 (true, false, true, false, false) |
| fill-blank | 4 | 1 |
| match | 1 | 2 (four statements against Kepler's laws and the inverse-square law) |
| numerical | 23 | 1 or 2 |
| short | 9 + 8 | 2 / 3 |
| long | 5 | 5 (Phobos and the mass of Mars; g with height and depth; potential energy and the work to reach infinity; escape and orbital speed of a super-Earth; K, U and E of a satellite) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 17 prose short answers.
- **Difficulty:** d1 6 · d2 35 · d3 40 · d4 2 (the four evaluation alternatives are d4 as well).
- **Competency:** recall 3 · understanding 33 · application 42 · analysis 5 (the case alternatives add four evaluation items). Application or higher **57% of items (65% of marks)**.
- **Topic tags:** t01 21 · t02 20 · t03 16 · t04 26.
- **Cases:** an Indian Mars orbiter in a long ellipse (periapsis 3.82 × 10⁶ m at 4.6 km s⁻¹, apoapsis 8.04 × 10⁷ m: 219 m s⁻¹ at apoapsis, period 73.0 h from the semi-major axis, or evaluate "put r = r_p in the circular formula", which gives 1.99 h); a geophysics class with a 6.4 km shaft and tower (0.100% against 0.200%, or evaluate "g is infinite at the centre"); a 1200 kg payload lifted to 640 km (6.84 GJ exact, mgh 7.53 GJ, 10.0% too large, or evaluate "U = +mgh = +7.5 GJ" against U = −68.4 GJ); a lunar orbiter 100 km up (1.63 km s⁻¹, 118 min, or evaluate "it needs the 2.37 km s⁻¹ surface escape speed", while the escape speed at that radius is 2.31 km s⁻¹).

## Chapter tests
- **Short (20 marks, 40 min):** A q001, q026, q060, q047 · B q015, q049, q074 · C q075 or q078 · D q081.
- **Long (40 marks, 90 min):** A q002, q003, q025, q027, q038, q061, q063, q062, q006, q066 · B q034, q070, (q050 or q071), q036, (q051 or q073) · C q076 + (q077 or q079) · D q080, q082.

## Validation
- Build: 0 validator errors, 0 warnings; 532 maths strings parsed (KaTeX strict); 18 SVG visuals / 5 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` 7cac0196cae4e448b438fc0ce635c208, of `tests.json` 553ebf7d5c4f3adc367bb3bd039903e2).
- 41 scripted re-solve checks pass: each numerical is re-solved by a different route (numerical integration of the force for potential energy and work, integrated orbits for periods and speeds, an integrated radial infall for the meteoroid speed, an escape test by integrating the motion with launch speeds 1% below and above the key, a root finder for the point of zero force, a vector resolution for the equilateral triangle, the eccentricity form of the aphelion speed). The worked examples are checked the same way in `build.mjs`. Every printed number in solutions, model answers and marking schemes is built from the same computed variables.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Fill-blank schema:** the first draft listed alternatives as separate blanks (the lint reported 1 blank in the stem against 3 in the answer); each blank is now one entry with its accepted spellings.
2. **Marking schemes:** LaTeX (`\times`) leaked into plain-text schemes (the apple, paper-clip, Phobos and orbiter items); a plain scientific-notation helper (`xp`) now prints "3.27 × 10⁻²⁵". The paper-clip solution line said "about 4000 times" against 4100 in the model answer; both now say 4100.
3. **Numbers in solutions:** the escape-speed derivation ended "√(…) = 11.2" (arithmetic lint: 11200 against 11.2), so the metre-per-second value is stated first; solutions that ended with a unicode minus (−14.3) did not match the key for the verify stage and now use a plain minus; two numericals now end on an explicit "= key" step (0.275 per cent, 16.7 per cent).
4. **Word limits:** the derivation short answers were too short once maths is excluded from the count; all now carry 40 or more words of prose, as do the part (c) answers of the Mars, lift and lunar cases.
5. **Diagrams:** the Newton's-cannon figure originally launched from the surface, where any launch below the circular speed starts inside the planet and has no visible flight; it now launches from a tower at 0.3 R and the circle and ellipse are drawn for a full revolution. In the other figures the aphelion point was cut off by the frame, labels crossed lines (superposition and Earth sections), and "Data:" in a label was read by the lint as a URL scheme (now "Given:").
6. **Stems:** every stem names its own context and numbers; none repeats an existing authored item.
7. **Facts double-checked:** 11.2 km s⁻¹ = √(2 × 9.8 × 6.4 × 10⁶) exactly 11 200 m s⁻¹; 7.92 km s⁻¹ = √(gR); T = 84.6 min near the surface (the slide and notes say "about 85 minutes"); with G, M and R as stated GM = 4.002 × 10¹⁴ (so GM/R² = 9.77, and items that give g use GM = gR² = 4.014 × 10¹⁴ and say so); 9.0 AU gives 27 years; a 64-year comet with perihelion 0.40 AU has a = 16.0 AU and aphelion 31.6 AU; Phobos (9.4 × 10⁶ m, 7.65 h) gives 6.48 × 10²³ kg; the Mars orbiter's period is 73.0 h; Moon g = 1.62 m s⁻² and escape speed 2.37 km s⁻¹; Mars g = 3.69 m s⁻² and escape speed 5.01 km s⁻¹; E = −14.3 GJ for 500 kg at 7.0 × 10⁶ m.

**Facts a reviewer should double-check:** (a) the scope decision above (rotation of the Earth, geostationary and polar satellites and weightlessness left out); (b) the planet table (mean distances and periods of Mercury to Saturn, T²/a³ = 1.00 for each) is quoted from standard values; (c) the Mars orbiter data are adapted illustrative numbers, stated in the stem; (d) the uniform-Earth assumption for g at depth, stated in the stems that compute it (the assertion-reason and tower-versus-shaft items rely on it implicitly); (e) the tolerance on the percentage items (0.275, 16.7) and on the 3-sig-fig results; (f) in the cannon picture the 0.3 R tower is exaggerated and the speed unit is the circular speed at the launch height; (g) the six AR keys and the match item.

### Subject-producer review (2026-11-05)
Every numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5): all keys and printed values check out (e.g. orbit-change energy 4.29 GJ, Phobos gives 6.48 × 10²³ kg for Mars, satellite energies 22.2/−44.5/−22.2 GJ). One numerical tagged "understanding" was retagged "application" (application or higher now 58%). Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Geostationary and polar satellites, weightlessness and the effect of the Earth's rotation on g are omitted (see Scope).
- Graph sketches asked for in answers are described in words. Plots in the slides are computed from the stated formulae; the diagrams are drawn to the stated scales.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
