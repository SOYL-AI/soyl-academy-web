# CBSE Class 11 Physics, Chapter 3 — Motion in a Plane

`cbse-11-physics-ch03` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (21 + 21 slides), notes (4 sections), 33 flashcards, 89 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch03_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch03_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch03/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the numerical helpers (vector arithmetic, closed-form and stepping projectile solvers, finite-difference acceleration, bisection) used by the independent re-solves; `svgs.mjs` the ten diagrams with self-checks; `decks.mjs` all worked-example numbers, plots and tables; `study.mjs` notes and flashcards; `questions.mjs` (t01–t02), `questions-t3.mjs`, `questions-t4.mjs` the bank; `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 scalars and vectors; multiplication by a real number and unit vectors; triangle and parallelogram laws; the formulas for the magnitude and direction of the resultant; subtraction; resolution into rectangular components and addition by components. **Relative velocity is not covered**: it was removed in the 2023 rationalisation (Lead ruling, 2026-11-04), as in ch02. t02 scalar (dot) and vector (cross) products with geometric meaning (projection, parallelogram area), component forms, the unit-vector table, a triangle area and a torque case. t03 position, velocity and acceleration vectors in a plane with constant acceleration; independence of the horizontal and vertical motions; horizontal projection; projectile at an angle (equation of path, time of flight, maximum height, range, maximum range at 45°, complementary angles, H/R = tan θ/4, launch from a height solved by the quadratic). t04 uniform circular motion: period, frequency, angular speed, v = ωr, centripetal acceleration v²/r = ω²r (derived from the change of velocity), scaling laws.
- Not taught: motion in a plane with variable acceleration, non-uniform circular motion, vector triple products, banked roads (chapter 4), torque beyond its use as a cross-product example.
- Data and constants stated where used: g = 9.8 m s⁻²; Earth radius 6.4 × 10⁶ m (slide); 1 m s⁻¹ = 3.6 km h⁻¹; orbital data for the satellite and the Moon are given in the stems. No NCERT, exemplar or past-paper text is used; contexts are Indian (Pune market, Kochi harbour, Indore warehouse, Chennai garage, Bhopal fire drill, Assam relief flight, Kolkata ground and giant wheel, Delhi fire brigade, Guwahati drone).

## Shape
- **Part 1 (t01–t02, 21 slides):** scalars and vectors; multiplying by a number (to-scale figure); triangle and parallelogram laws (to-scale figure: 6 and 4 at 60°); R and α formulas; worked: two cables (R = √76 = 8.72 kN, α = 23.4°); subtraction (|A − B| = √28 = 5.29); resolution and unit vectors (8 î + 6 ĵ, magnitude 10); adding by components; worked: three forces 12, 10, 8 N at 0°, 120°, 240° (3.46 N at 30°); dot product (projection figure, 6 × 3 = 18); worked: F = 6î + 2ĵ, d = 3î − 4ĵ (10, 71.6°); cross product (parallelogram area 24); unit-vector cross table; worked: (2î + 3ĵ) × (4î − ĵ) = −14 k̂ (angle 70.3°, triangle area 7); comparison table; summary; exam tips. 3 check slides.
- **Part 2 (t03–t04, 21 slides):** position, velocity, acceleration in a plane; worked: u = 3î, a = î + 2ĵ, t = 4 s (r = 20î + 16ĵ, v = 7î + 8ĵ, 10.6 m s⁻¹ at 48.8°); two independent motions (dropped against thrown ball); worked: 20 m s⁻¹ horizontally from 78.4 m (4 s, 80 m, 44.0 m s⁻¹ at 63.0°); equation of path (projectile to scale); T, H, R and range against angle; five trajectories at 20 m s⁻¹; worked: 39.2 m s⁻¹ at 30° (2 s, 19.6 m, 4 s, 135.8 m); scaling and path table; worked: greatest throw 90 m (29.7 m s⁻¹, H 22.5 m, 4.29 s); uniform circular motion (T, f, ω, v); centripetal acceleration from the Δv triangle; circle figure (r = 5 m, v = 4 m s⁻¹, a = 3.2 m s⁻²); worked: bike at 54 km/h on a 60 m track (0.25 rad s⁻¹, 25.1 s, 3.75 m s⁻²); worked: equator point (465 m s⁻¹, 0.0338 m s⁻²); summary; exam tips. 3 check slides.
- Visuals on all 42 slides (21 SVG, 14 tables, 7 plots).
- **Diagrams (9 SVGs, 9 self-checks, all pass; each rendered and inspected):** parallelogram and triangle laws (diagonal = A + B in pixels, law-of-cosines length and angle, dashed copies parallel); subtraction as A + (−B) and as the join of the tips; 2A, ½A, −A to scale; resolution of an 8-6-10 vector with î and ĵ; dot product as projection (6 × 3 = 18) and cross product as parallelogram (shoelace area 24); projectile at 39.2 m s⁻¹ and 30° (points on the equation of path, apex at R/2, symmetric heights, T = 4 s, H = 19.6 m, R = 135.8 m); dropped and horizontally thrown balls at equal heights each second (drops 1:4:9:16); uniform circular motion at four points (velocity ⟂ radius, acceleration to the centre, 40 px = 3.2 m s⁻²); the change of velocity (|Δv| = 2v sin(Δθ/2), pointing at the centre).
- **Plots (computed, 7):** path of a particle with constant acceleration; horizontal-projection parabola; five trajectories at 20 m s⁻¹ (analytic functions, 15° to 75°); range against angle; a against v and a against r for circular motion. release.json is about 414 KB.
- **Narration:** 8–60 words per slide (mean 43), TTS-safe, numbers taken from the computed values.
- **Notes:** 4 sections (one per topic) with extra figures and tables; 33 flashcards (t01 12, t02 8, t03 10, t04 3).

## Question bank (89)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6) |
| assertion-reason | 5 | 1 (keys a, d, c, a, b) |
| true-false | 4 | 1 (false, false, true, true) |
| fill-blank | 3 | 1 |
| numerical | 25 | 1, 2 or 3 |
| short | 11 + 6 | 2 / 3 |
| long | 5 | 5 (vector law and resultant; scalar and vector products with an orthogonal pair; projectile derivation with a 30 m s⁻¹ throw; horizontal projection from a bridge; centripetal acceleration derivation with a motorbike) |
| case-based | 5 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the prose short answers (the computational part-(c) answers carry none).
- **Difficulty:** d1 6 · d2 41 · d3 35 · d4 7.
- **Competency:** recall 4 · understanding 32 · application 47 · analysis 6 (the case alternatives add evaluation items). Application or higher **60% of items (69% of marks)**. Numericals are tagged application, as the team rule requires.
- **Topic tags:** t01 22 · t02 14 · t03 31 · t04 22.
- **Cases:** an Indore survey drone (120 m north, 90 m east: 210 m, 150 m, 36.9° east of north, or evaluate "displacement is 210 m"); a Chennai spanner (torque r × F: 10.4 N m, 12.0 N m at right angles, or evaluate "pushing along the spanner is best"); a Bhopal fire-drill jet at 24.5 m s⁻¹ and 30° (21.2 m s⁻¹, 7.66 m, 53.0 m, or evaluate "60° sends the water farther"); an Assam relief packet from 490 m at 80 m s⁻¹ (10.0 s, 800 m, 127 m s⁻¹, or evaluate "release it above the target"); a Kolkata giant wheel (r = 12 m, T = 40 s: 0.296 m s⁻², quarter turn 10 s and 18.8 m, or evaluate "nothing accelerates her").

## Chapter tests
- **Short (20 marks, 40 min):** A q001, q021, q051, q074 · B q016, q030, q058 · C q059 or q086 · D q020.
- **Long (40 marks, 90 min):** A q004, q005, q027, q037, q049, q052, q070, q068, q029, q053 · B q015, q056, (q055 or q082), q031, (q057 or q084) · C q032 + (q060 or q019) · D q033, q064.
- The same questions as before the rebalance (ids shifted when the replaced items were removed).
- Items are spread over all four topics in each test; the unused cases (Bhopal jet, Kolkata wheel) and several other items stay in the bank for practice.

## Validation
- Build: 0 validator errors, 0 warnings; 607 maths strings parsed (KaTeX strict); 30 SVG visuals / 9 distinct diagrams pass the allow-list (all text at least 10 px); stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 values in the subject-producer's report).
- 50 scripted re-solve checks pass: each numerical and number-bearing MCQ is re-solved by a different route (a leapfrog stepping integrator for every projectile time, height, range and landing speed; a second central difference of x(t), y(t) for every centripetal acceleration; component arithmetic against the law of cosines; cross and dot products by components against AB sin θ and AB cos θ). The ten worked examples are re-derived the same way in `build.mjs`. Every printed number in solutions, model answers and marking schemes is built from the same computed variables (rounded through `dec`/`R6` so no float noise prints).
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Float noise** in printed steps (24.000000000000007, 882.0000000000001, 12.249999999999998, 2.4999999999999996, 490.00000000000006, and 2.9999999999999996 as a ratio key) removed by rounding before printing; the ratio item's key is now exactly 3.
2. **Marking schemes:** three case part-(b) numericals (Bhopal, Assam, Kolkata) had two 1-mark steps for a 1-mark part (schema flagged); merged into one step. The Assam and Bhopal part-(c) short solutions had hand-typed "126 m/s", "784 m" and "2.5 s" that did not match the computed 127 m s⁻¹, 800 m; they are now built from the variables.
3. **Fill blank:** the period item listed two accepted answers as two blanks; fixed to one blank with two accepted spellings.
4. **Wording:** the three-forces MCQ said "the first set" although options are shuffled; it now names the set. The cross-product true/false was changed to a false statement so that the four true/false items are two true and two false.
5. **Classification (superseded by item 8):** the first draft was 64% application or higher and six one-step substitutions had been reclassified as understanding; the team rule (numericals are application) reversed that.
8. **Competency rebalance (2026-11-05):** with every numerical tagged application the band was 69% (limit 65%). Eight application numericals that are in no chapter test or check slide were replaced by fresh qualitative understanding items on the same topic: `rope-num` → `compind-mcq` (components depend on the axes, the vector does not); `mag-num` → `sumlimits-short` (can a resultant be smaller than both vectors); `dot-num` → `dotsign-mcq` (angle when A·B is negative); `kick-num` → `complair-short` (equal range, unequal time for 20° and 70°); `hose-num` → `hvstrobe-mcq` (reading a multi-flash photograph); `speedr-num` → `rangegraph-mcq` (shape of the range against angle graph); `round-num` → `omegaall-mcq` (which quantity is common on a turntable); `rpm-num` → `perp-short` (why a ⟂ v changes direction but not speed). No existing item was retagged. Result: 60% of items, topic counts unchanged (t01 22, t02 14, t03 31, t04 22), the two tests unchanged.
6. **Figures (each rendered and inspected):** the parallelogram figure footer was clipped and labels collided with the diagonal (re-laid out, two footer lines); the scaled-vector figure was small and its labels clipped (36 px per unit); the dot/cross figure ran off the right edge (18 px per unit); the rain figure's angle label sat on the arrow (now φ, value in the text below); the projectile figure's t = 4 s arrow crossed its label; the circle figure's labels were clipped; the Δv figure had a stray arc and overlapping labels. All text is now at least 10 px.
7. **Facts double-checked:** R = √76 = 8.718 kN and α = 23.41°; |A − B| = √28 = 5.292; (12 N, 10 N at 120°, 8 N at 240°) sum to (3, √3) = 2√3 N at 30°; (6, 2)·(3, −4) = 10, cos θ = 10/(√40 × 5) gives 71.57°; (2, 3) × (4, −1) = −14, sin θ = 14/√221 gives 70.3° (dot product 5 > 0, acute); 39.2 m s⁻¹ at 30°: u_y = 19.6, T = 4 s, H = 19.6 m, R = 33.95 × 4 = 135.8 m; 20 m s⁻¹ at 15° and 75° give 20.4 m, at 30° and 60° give 35.3 m, at 45° 40.8 m; stone from 78.4 m at 20 m s⁻¹: 4 s, 80 m, 44.0 m s⁻¹ at 62.97°; the roof throw (25 m, 20 m s⁻¹, 30°) lands after 3.50 s at 60.6 m; the football at 20 m s⁻¹ and 30° is 2.62 m high at 30 m (above a 2.44 m bar); a satellite at 7.0 × 10⁶ m with T = 5.8 × 10³ s has a = 8.21 m s⁻²; the Moon (3.84 × 10⁸ m, 27.3 d) a = 2.72 × 10⁻³ m s⁻²; a 3000 rpm centrifuge at 0.12 m reaches 1.21 × 10³ g (g = 9.8).

**Facts a reviewer should double-check:** (a) whether the scalar and vector products belong in this chapter of the 2026-27 rationalised book (the syllabus file lists them under ch03); (b) that the torque case and the work remark on the dot-product slide may read as slightly ahead of chapters 5 and 7, though each defines what it uses; (c) the case-alternative model answers (each gives the corrected numbers); (d) the Moon and satellite data, given in the stems; (e) the T, H, R formulas are stated for level ground only and the roof item shows the quadratic route.

### Subject-producer review (2026-11-04)
- **Scope change (Lead ruling):** relative velocity was removed in the 2023 rationalisation, so the writer's light treatment was taken out: the Part 2 slide, the RELV figure, the notes line, the key term and the flashcard. Its two items were replaced in-syllabus with vector subtraction: `dv-num` (change of velocity of a deflected hockey ball, 24 m/s east to 7.0 m/s north, |Δv| = 25 m/s) and `vsub-mcq` (A − B for 20 m east and 15 m north displacements, 25 m at 36.9° south of east). The flashcard now asks how to find a change of velocity.

### Subject-producer review, part 2 (2026-11-07)
After the honest-tag rule, the subject-producer retagged ten numericals from "understanding" to "application", which took the band to 69%; the writer then replaced eight application numericals (not in the tests) with genuine understanding items, giving 60%. Every remaining numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5) from the built bank: all keys and printed values check out (e.g. cross product 5î + 5ĵ − 5k̂, |A × B| = 8.66; building throw lands 60.6 m out; centrifuge 1210 g).

## Known gaps
- Motion in a plane with non-constant acceleration, and the general proof that the velocity is tangent to the path, are not taught.
- Graph sketches asked for in answers are described in words; plots in the slides are computed from stated formulae; the figures are drawn to the stated scales.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
