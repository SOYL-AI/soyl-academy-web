# CBSE Class 11 Physics, Chapter 4 — Laws of Motion

`cbse-11-physics-ch04` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (21 + 21 slides), notes (4 sections), 30 flashcards, 77 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch04_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch04_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch04/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the numerical helpers used by the independent re-solves (Gaussian elimination for the force equations, bisection, Simpson integral, time stepping, banked-road limit solver); `svgs.mjs` the eight diagrams with self-checks; `decks.mjs` all worked-example numbers, plots and tables; `study.mjs` notes and flashcards; `questions.mjs` (t01, t02), `questions-t34.mjs` (t03, t04) and `questions-long.mjs` (long and case-based items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 Newton's three laws, inertia and inertial frames, momentum and F = dp/dt, impulse (area under F–t), free-body diagrams, lift (apparent weight) and connected-body problems (block on a smooth or rough table with a hanging block, Atwood machine); t02 conservation of linear momentum from the second and third laws, recoil of a gun, explosions (including a two-dimensional burst), sticking collisions, rocket propulsion; t03 equilibrium of concurrent forces (components and force triangle), static, limiting and kinetic friction, the laws of friction, angle of repose and friction on an incline, rolling friction and lubrication; t04 dynamics of uniform circular motion (a_c = v²/r = ω²r, centripetal force as the net inward real force), a vehicle on a level road, on a banked road without friction and with friction (maximum and minimum speeds).
- Pseudo forces, relative velocity and the variable-mass rocket equation are not taught (not named by the topics; the rocket is qualitative). Motion in a vertical circle is not taught (not in the topic list).
- Data and constants stated in the stems: g = 9.8 m s⁻²; 1 m s⁻¹ = 3.6 km h⁻¹. Friction coefficients are always given as data. No NCERT, exemplar or past-paper text is used; contexts are Indian (bullock cart, Kolkata hospital lift, Kochi fisherman, Surat godown, Bengaluru exit ramp, railway wagons, rifles, cricket, football). The authored CBSE 10 science, CBSE 12 physics, ISC 12 physics and ICSE 10 physics items were grepped for "friction", "impulse", "banked", "centripetal", "momentum" and "circular": ICSE 10 physics has only qualitative circular-motion items (CBSE 9 science is not authored in the repository); none of their set-ups, numbers or wording is reused.

## Shape
- **Part 1 (t01–t02, 21 slides):** Aristotle against Galileo and the first law (inertial frames); momentum and the second law (momentum–time plot, slope = force); worked: 250 kg cart, 400 N for 5 s (1.6 m s⁻², 8 m s⁻¹, 2000 kg m s⁻¹); impulse and the F–t graph; worked: 0.16 kg ball reversing 28 → 35 m s⁻¹ in 10 ms (J = 10.08 N s, F av 1008 N, peak 2016 N); third law (blocks A 3 kg and B 5 kg pushed by 24 N: 15 N between them, a = 3 m s⁻²); free-body diagrams and common forces; worked: 60 kg person in a lift (678, 588, 498, 0 N); blocks and strings; worked: 3 kg on a smooth table and 2 kg hanging (3.92 m s⁻², 11.76 N); worked: Atwood 3 and 5 kg (2.45 m s⁻², 36.75 N); conservation of momentum; worked: 3.6 kg rifle, 12 g bullet at 600 m s⁻¹ (V = 2.0 m s⁻¹, KE 2160 J against 7.2 J); explosions and sticking collisions (6 kg firework bursting 2 + 4 kg: 17.5 m s⁻¹, KE 300 → 637.5 J); worked: wagons 2.0 × 10⁴ kg at 3.0 m s⁻¹ with 3.0 × 10⁴ kg at rest (1.2 m s⁻¹). 3 check slides.
- **Part 2 (t03–t04, 21 slides):** equilibrium; worked: 5 kg lamp on ropes at 37° and 53° (T₁ 29.49 N, T₂ 39.13 N); static, limiting and kinetic friction (f against F plot); laws of friction; worked: 20 kg crate, μs 0.6, μk 0.4 (limit 117.6 N, kinetic 78.4 N, pushes of 100 N and 130 N, a = 2.58 m s⁻²); friction on an incline; worked: 4 kg block on 30° (f 19.6 N, N 33.9 N, μs ≥ 0.577) and sliding down 40° (3.67 m s⁻²); rolling friction and lubrication (suitcase table); worked: 5 kg on a rough table with 3 kg hanging (2.45 m s⁻², 22.05 N); uniform circular motion; worked: 0.25 kg stone, 0.8 m string, 2 rev/s (T 31.6 N, a_c 126 m s⁻²; a 40 N string allows 11.3 m s⁻¹); level road; worked: r = 50 m, μ 0.5 and 0.2 (15.7 and 9.9 m s⁻¹); banked road; worked: r = 100 m, 15°, μ 0.3 (16.2 m s⁻¹ with no friction, 24.6 m s⁻¹ at most, no lower limit as μ > tan θ). 3 check slides.
- Visuals on all 42 slides (22 SVG, 14 tables, 6 plots).
- **Diagrams (8 SVGs, 23 self-checks, all pass):** contact pair of blocks with both free-body diagrams (drawn net force on A = 3 a, on B = 5 a, reaction arrows equal and opposite on different bodies); block at rest on a 30° slope (weight, N and f summed to zero, N drawn 30° from the vertical, f/N = tan θ); blocks over a pulley (drawn nets equal m₁a and m₂a); three lift readings (N − mg = m a in each); lamp on two ropes with its force triangle (closes exactly; horizontal and vertical balance); recoil momenta (equal and opposite, sum zero); level road and banked road (drawn weight, N and f leave zero vertical force and a horizontal net m v²/r for the v from an independent solve); uniform circular motion at four points (v tangent and a to the centre, perpendicular, equal lengths, same sense). All eight were rendered in Chromium and inspected; text clipping, overlaps and a wrong arrow sense found in the first render were fixed (see Verifier pass). Minor remaining: the friction label on the slope diagram touches the slope line.
- **Plots (computed, 3 distinct):** momentum against time; the bat's F–t pulse (Simpson area = impulse); friction against applied force. release.json is 385 KB.
- **Narration:** 13–74 words per slide (mean 53), TTS-safe; numbers come from the same variables as the slide text.
- **Notes:** 4 sections (one per topic) with extra figures; 30 flashcards (t01 14, t02 6, t03 6, t04 4).

## Question bank (77)
| Type | Count | Marks |
|---|---|---|
| mcq | 18 | 1 (keys a 5, b 5, c 4, d 4) |
| assertion-reason | 6 | 1 (keys a, c, b, d, a, c: a 2, b 1, c 2, d 1) |
| true-false | 5 | 1 (false, true, false, true, false) |
| fill-blank | 3 | 1 |
| match | 1 | 2 (centripetal-force providers) |
| numerical | 17 | 1, 2 or 3 |
| short | 12 + 6 | 2 / 3 |
| long | 5 | 5 (conservation of momentum with a sticking collision; impulse of a kick and a catch; block on a rough incline; banked road with friction; blocks, friction and a pulley) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 18 prose short answers.
- **Difficulty:** d1 4 · d2 31 · d3 35 · d4 7.
- **Competency:** recall 3 · understanding 28 · application 35 · analysis 11 (the case alternatives add evaluation items). Application or higher **60% of items (67% of marks)**. All numericals are tagged application; the band was brought down by replacing six application numericals with genuine understanding items, not by retagging (see Verifier pass).
- **Topic tags:** t01 27 · t02 14 · t03 18 · t04 19.
- **Cases:** a Kolkata nurse's lift (539 N steady, 605 N accelerating, 473 N slowing, or evaluate "her weight increases"); a Kochi fisherman's anchor throw (total momentum zero, boat recoil 0.205 m s⁻¹, or evaluate "momentum is not conserved"); a Surat sack on a 20° ramp (stays at rest, friction 101 N; at 30° it slides at 1.93 m s⁻², or evaluate "friction equals μs m g cos θ"); a Bengaluru banked exit ramp (no friction at the design speed, 46.3 km h⁻¹, 24.6 m s⁻¹ at most when wet, or evaluate "a loaded truck must go slower").

## Chapter tests
- **Short (20 marks, 40 min):** A q006, q039, q053, q027 · B q019, q066, q035 · C q070 or q071 · D q076.
- **Long (40 marks, 90 min):** A q001, q004, q026, q025, q037, q038, q052, q054, q042, q056 · B q020, q049, (q021 or q067), q023, (q051 or q068) · C q069 + (q073 or q072) · D q074, q077.

## Validation
- Build: 0 validator errors, 0 warnings; 529 maths strings parsed (KaTeX strict); 30 SVG visuals / 8 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` c50d53b3eb0442ab01cafbf4984d9f99, of `tests.json` 7dc22998fa6d71fa573098e1929ccb21).
- 39 scripted re-solve checks pass: each numerical and each numeric MCQ, long answer and case item is re-solved by a different route (Gaussian elimination of the force equations for connected bodies, ropes, drag at an angle and banking; time stepping of the equations of motion for the variable force and the skid; Simpson integration of the impulse; component-wise momentum balance for the burst; sweeping the speed up to the friction limit for the level bend). Every printed number in solutions, model answers and marking schemes is built from the same computed variables.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Solver sign errors caught by the re-solve:** the Atwood helper and the rough-floor two-block check had a wrong right-hand side (a = 9.8, T = 0 printed in a solution); fixed in `phys.mjs` and the check.
2. **Duplicate options:** the impulse-triangle MCQ had two options equal to the key (6 m/s); the distractor is now the impulse itself (30 m/s).
3. **Rounding consistency:** the football item printed J = 11.3 N s and then 11.3/0.008 = 1410 N; it now prints 11.25 N s, 1406 N and 112.5 N. The cable item printed mg = 118 N and T = 227 N from 118/0.518; it now prints 117.6 N.
4. **Word limits:** the lift 3-mark answer, the Atwood derivation and three case-part (c) answers were too short for their word limits; plain-language sentences were added.
5. **Wording and keys:** "angle of friction" was removed as an accepted alias for angle of repose; the alternatives in the cases are evaluation items with corrected numbers.
6. **Figures:** first render found clipped captions (pair, recoil, road, lift), the normal-reaction label on the slope colliding with the subtitle, labels on top of arrows (pulley, lift, ropes), the banked-road weight arrow and text overlapping, and the circular-motion velocity arrows turning clockwise at the top and bottom but anticlockwise at the sides. All fixed; the circular-motion self-check now also tests that all four velocities turn the same way.
7. **Competency band (2026-11-05):** with every numerical tagged application the band was 68%. Six application numericals that are not in the chapter tests were replaced in place (same position in the bank, so ids and tests are unchanged) by fresh understanding items: `pull-num` → `hangten-mcq` (tension below the weight of an accelerating hanging block), `lift-num` → `cablelift-short` (why a lift cable's tension exceeds the weight only while speeding up), `mgun-num` → `iceball-short` (girl on ice throwing a ball: recoil from zero total momentum), `collide-num` → `single-tf` (only the total momentum is conserved, not each trolley's; false), `brake-num` → `skidmass-mcq` (loaded and empty truck skid the same distance), `turntable-num` → `coinslip-short` (static friction as centripetal force; coin leaves along the tangent). The numerical count fell from 23 to 17; every quantitative topic still has numericals (t01 4, t02 3, t03 5, t04 5).
8. **Stems:** every stem names its own context and numbers; none echoes the CBSE 10 force chapters or the ICSE 10 circular-motion items.
9. **Facts double-checked:** g = 9.8; 1 N s = 1 kg m s⁻¹; 72 km/h = 20 m s⁻¹; Atwood 4 kg and 6 kg: a = 1.96 m s⁻², T = 47.0 N; skater 60/40: 1.0 m s⁻¹; burst with masses 1:3 gives energies 3:1; three-piece burst: p = √(18² + 12²) = 21.6, v = 14.4 m s⁻¹, 33.7° south of west; lamp on 15° cable: T = 227 N; rough two-block problem: a = 3.04, T = 20.0 N; level bend 80 m, μ 0.6: 21.7 m s⁻¹ = 78.1 km h⁻¹; rail banking tan θ = 400/1960 gives 11.5°; banked 60 m, 20°, μ 0.4: 22.9 m s⁻¹; 80 m, 12°, μ 0.35: 21.8 m s⁻¹ (12.9 with no friction); 120 m, 8°: 12.9 m s⁻¹ = 46.3 km h⁻¹ and 24.6 m s⁻¹ wet.

**Facts a reviewer should double-check:** (a) the mark values of the numericals (3-mark items: stick-num, explode-num, crate-pull-num, cable-num, tworough-num, vmaxbank-num); (b) that the lower banked-road speed formula and its "no lower limit when μ > tan θ" remark are at rationalised-syllabus depth; (c) the illustrative rolling-friction coefficients on the suitcase table (stated as data, not as material facts); (d) that the F = dp/dt mass-variation item and the rocket explanation are acceptable at this level; (e) the case alternatives' model answers (each corrects the claim with the computed numbers).

### Subject-producer review (2026-11-07)
After the honest-tag rule, the subject-producer retagged five numericals from "understanding" to "application" (band 68%); the writer then replaced six application numericals (not in the tests) with genuine understanding items, giving 60%. Every remaining numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5): all keys and printed values check out (e.g. banked-curve maximum speeds 22.9 m/s and √476 m/s, explosion fragment 14.4 m/s, incline 3.21 m/s²). Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Pseudo (inertial) forces are not taught; the non-inertial frame appears only qualitatively (bus and train items).
- Free-body diagrams requested in answers are described in words; graders should accept any correct sketch. Plots in slides are computed from the stated numbers; the diagrams are drawn to the stated scales.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
