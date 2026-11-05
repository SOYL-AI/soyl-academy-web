# CBSE Class 11 Physics, Chapter 6 — System of Particles and Rotational Motion

`cbse-11-physics-ch06` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 19 slides), notes (4 sections), 30 flashcards, 83 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch06_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch06_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch06/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `data.mjs` holds every worked-example number (and a number-to-words helper for narration); `svgs.mjs` the eleven diagrams with self-checks; `decks.mjs` the two decks, tables and three plots; `study.mjs` notes and flashcards; `questions-t1.mjs` … `questions-t4.mjs` the bank (`questions-t4.mjs` also holds the t04 long and case items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 centre of mass of particles (one line and in a plane), of simple uniform bodies (rod, ring, disc, sphere, rectangle, triangle) and of composite bodies (bent wire, plate with a part cut out); motion of the centre of mass, M a_cm = F_ext, P = M v_cm and conservation of momentum (shell bursting in flight, a child walking on a free sledge); t02 torque (τ = r F sin θ = F d, direction by the right-hand rule, unit N m), angular momentum of a particle (m v d, circular case m r² ω), τ = dL/dt, conservation of angular momentum (stool with weights, diver, roundabout, helicopter tail rotor); t03 equilibrium of a rigid body (ΣF = 0, Στ = 0, any point for moments), principle of moments, couple, centre of gravity and stability; t04 moment of inertia I = Σ m r², radius of gyration, standard values (ring/hollow cylinder, hollow sphere, disc/solid cylinder, solid sphere, thin rod about its centre — stated, not derived), L = I ω, τ = I α, K = ½ I ω².
- **Left out (not sure the rationalised book keeps them, or removed by the 2023 rationalisation, per the Lead's scope rulings):** the theorems of parallel and perpendicular axes; rolling motion (no rolling-down-a-slope items); the moment of inertia of a rod about its end and of rings and discs about a diameter (these need the axes theorems); the equations of rotational kinematics (ω = ω₀ + α t and the like — constant-torque items are done through L = τ t); work done by a torque and rotational power. Relative velocity is not touched.
- Data and constants stated in the stems: g = 9.8 m s⁻²; Earth and Moon masses and distance, and the Earth’s radius, in the Earth–Moon item; atomic masses 12 u and 16 u and bond length 0.113 nm in the CO item. No NCERT, exemplar or past-paper text is used; contexts are Indian (kolhu, bullock cart, Jaipur craft shop, Bengaluru roundabout, Punjab pump, railway workshop) and avoid the set-ups of ICSE 10 "Force" (no metre rule with gf weights, see-saw, door-hinge moment, wrench or spanner, tap or steering-wheel couple, crowbar) and of CBSE 11 chapters 1, 3, 4 and 5 (no fisherman’s boat, wagon coupling, gun recoil, shell at rest, spanner-and-nut torque, potter’s wheel at 120 rev/min).

## Shape
- **Part 1 (t01–t02, 20 slides):** CM of particles; worked: masses 2.0 and 6.0 kg on a 0.80 m rod (CM 0.60 m from the lighter mass, moments 11.76 N m on both sides); CM of rigid bodies (table of shapes); worked: three particles (1.2 m, 3.0 m); worked: bent wire (0.18 m, 0.08 m, off the wire); motion of the CM (internal and external forces); worked: shell 5.0 kg at 20 m s⁻¹, 2.0 kg piece at 45 m s⁻¹ (other piece 3.33 m s⁻¹, CM at 60 m after 3.0 s); worked: child 30 kg on a 90 kg, 2.4 m sledge (sledge slides 0.60 m, child 1.80 m); torque; worked: bicycle pedal (44.2 N m at 60°); angular momentum and τ = dL/dt; worked: ball on a straight line (12 kg m² s⁻¹); conservation of angular momentum; worked: rotating stool (I 2.52 → 0.72 kg m², ω 3.0 → 10.5 rad s⁻¹); summary and exam tips. 3 check slides.
- **Part 2 (t03–t04, 19 slides):** equilibrium; principle of moments with the carrying pole (18 and 12 kg, 0.60 m); worked: plank over a drain (514.5 N and 269.5 N); centre of gravity and stability; worked: bar on a bracket (T = 78.4 N, hinge 67.9 N and 19.6 N); couple; moment of inertia; worked: four masses on a square frame (0.36 kg m², k = 0.424 m); standard values with a bar chart; worked: ring and disc (0.500 and 0.250 kg m²); L = Iω, τ = Iα, K = ½Iω² (analogy table); worked: grinding wheel (474 J); worked: constant torque on a flywheel (ω = 15 rad s⁻¹, K = 225 J); summary and exam tips. 3 check slides.
- Visuals on all 39 slides (18 SVG, 18 tables, 3 plots).
- **Diagrams (11 SVGs, 11 self-checks, all pass):** CM2 (two masses balance about the CM, moments equal); LSHAPE (CM is the length-weighted mean of the arm midpoints, off the wire); SLED (the CM of child + sledge is at the same drawn position before and after); TORQUE (perpendicular distance computed from the drawn geometry, τ three ways, anticlockwise sense); LINEL (|r × m v| computed at three drawn positions, r = 5, 3, 5 m); SPIN (I₁ω₁ = I₂ω₂); BEAM (ΣF = 0 and Στ = 0 about four points); BRACKET (ΣFx, ΣFy and torque about the hinge and the far end); TOPPLE (plumb line inside the base at 12°, outside at 25°, critical 18.43°); MOIBARS (bar lengths proportional to 1, 2/3, 1/2, 2/5); POLE (moments about the shoulder equal). Each was rendered to PNG in headless Chromium and inspected; overlapping labels and clipped captions found on the first pass were fixed.
- **Plots (computed, 3):** horizontal distance against time for the shell pieces and the CM (analytic lines); ω = L/I; K = ½Iω² against ω. release.json is 364 KB.
- **Narration:** 12–76 words per slide (mean 56), TTS-safe, numbers in words generated from the computed values.
- **Notes:** 4 sections (one per topic) with extra figures; 30 flashcards (t01 9, t02 9, t03 6, t04 6).

## Question bank (83)
| Type | Count | Marks |
|---|---|---|
| mcq | 15 | 1 (keys a 4, b 4, c 4, d 3) |
| assertion-reason | 6 | 1 (keys a, c, a, d, c, b: a 2, b 1, c 2, d 1) |
| true-false | 6 | 1 (false, true, false, true, true, false) |
| fill-blank | 4 | 1 |
| numerical | 28 | 1, 2 or 3 |
| short | 9 + 6 | 2 / 3 |
| long | 5 | 5 (CM and its motion with a trolley problem; torque, angular momentum and a ball; equilibrium with a hinged bar and cable at 45°; moment of inertia and a flywheel; L = Iω, τ = Iα and a solid sphere) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 20 prose short and long answers (model answers inside the band).
- **Difficulty:** d1 17 · d2 29 · d3 34 · d4 3 (plus d4 alternatives in the cases).
- **Competency:** recall 9 · understanding 29 · application 40 · analysis 5 (the case alternatives add evaluation items). Application or higher **54% of items (66% of marks)**.
- **Topic tags:** t01 20 · t02 21 · t03 18 · t04 30 (a few items carry two tags).
- **Cases:** a Jaipur decoration with three bells (CM 0.533 m, or 0.400 m with an extra bell, or evaluate "tie at the midpoint"); a Bengaluru roundabout and a child stepping on (ω′ 0.94 rad s⁻¹, kinetic energy 225 J → 140.6 J, or evaluate "K must also be conserved"); a plank on two supports with a man at the overhanging end (R_B 735 N, R_A 49 N, or evaluate "A carries half the plank’s weight"); a Punjab pump flywheel ring (4.74 kJ, stops in 25.1 s, or evaluate "a disc stores the same energy").

## Chapter tests
- **Short (20 marks, 40 min):** A q001, q022, q040, q067 · B q033, q052, q080 · C q018 or q081 · D q038.
- **Long (40 marks, 90 min):** A q002, q006, q020, q021, q041, q042, q058, q062, q005, q066 · B q015, q034, (q053 or q076), q035, (q017 or q054) · C q037 + (q055 or q082) · D q019, q083.

## Validation
- Build: 0 validator errors, 0 warnings; 506 maths strings parsed (KaTeX strict); 29 SVG visuals / 11 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` 4e554712470a1cdea3c6fb9a8b967a9d, of `tests.json` 635579067c2ded7ac0cc7a36762a5c14).
- 43 scripted re-solve checks pass: each numerical, the MCQs with numbers, the long answers and the case items are re-solved by a different route (weighted averages, momentum and moment balances, geometry of the drawn diagrams, ω from L/I, K from ½Iω²). Every printed number in solutions, model answers and marking schemes is built from the same computed variables.
- Gate commands: see the subject-producer’s handoff note.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Word limits:** the first build had 14 model answers below the word-limit band (the derivations were mostly symbols); they were rewritten with explanatory prose and now sit inside the bands.
2. **Float noise and tolerance:** two keys printed as 1.2000000000000002 and 0.31500000000000006 (now rounded with the library helper); the plank key 208 N was 0.25 N away from the exact 208.25 N with tolerance 0.2 (tolerance raised to 0.5).
3. **Statements:** the true-false item on the moment of inertia of a rod referred to the rod’s end value, which is left out of this chapter; the explanation now contrasts the centre value M L²/12 with the almost zero value about the rod’s own length.
4. **Figures:** the sledge figure ran off the left edge and its arrow label overlapped a title; the torque figure’s text overlapped the force arrow; the plank figure’s dimension label overlapped its caption; the stool, pole, almirah and bar-chart captions were clipped at the right edge (all re-laid out and re-rendered); a zero-length arrow and a ω printed as "3" instead of "3.00" were corrected.
5. **Stems:** every stem names its own context and numbers; the bank was grepped against ICSE 10 physics (moments, couple, centre of gravity, lever), CBSE 12 and ISC 12 physics (torque on a dipole, angular momentum in Bohr’s model) and CBSE 11 ch01–ch05 (torque case with a spanner, boat and anchor, shell at rest, potter’s wheel) and none of their set-ups or numbers is reused.
6. **Facts double-checked:** 2.0 and 6.0 kg at 0.80 m: CM 0.60 m; three particles (4.0, 1.0, 3.0 kg): Y = 2.25 m, X = 1.375 m; Earth–Moon CM 4647 km from the Earth’s centre (inside the Earth, radius 6400 km); girl on trolley: 45 × 3.2/180 = 0.80 m; shell 8.0 kg: other piece 6.0 m s⁻¹; plate with a corner cut: X = 0.0280/0.12 = 0.233 m; kolhu: 2.5 × 420 × sin 50° = 804 N m; stool: ω₂ = 4.04 × 2.0/1.16 = 6.97 rad s⁻¹, K 8.08 → 28.14 J (+20.1 J); roundabout 200 × 1.5/320 = 0.9375 rad s⁻¹, K 225 → 140.6 J; ladder wall force 73.5 N; bar with cable at 45°: T = 34.6 N, H_y = 24.5 N; ring flywheel 40 kg, 0.50 m, 600 rev/min: 19.7 kJ; disc flywheel 20 kg, 0.40 m, 300 rev/min: 790 J, 6.28 s; pump flywheel ring: 4.74 kJ, 25.1 s; critical tilt of the almirah atan(0.60/1.80) = 18.43°.

**Facts a reviewer should double-check:** (a) that the rationalised 2026–27 book keeps the statement of I for a thin rod about its centre (M L²/12), the triangular-plate centroid statement, the couple, centre of gravity and stability discussion, the principle of moments for a pole and a ladder (used in two numericals) and τ = Iα and K = ½Iω² (they are included); (b) that the left-out items listed under Scope really are beyond the rationalised syllabus; (c) the use of the cross-product notation for torque and angular momentum with magnitudes only in the numericals (ch03 introduced the vector product); (d) the 4650 km Earth–Moon key against the 4647 km in the solution (tolerance 10 km); (e) the two items tagged t02 and t04 (stool kinetic energy and constant-torque wheel); (f) the case alternatives’ model answers; (g) the Earth–Moon item restates data a later gravitation chapter will also use.

### Subject-producer review (2026-11-05)
Every numerical, long answer and case numerical was re-solved by the subject-producer (Opus 5.5) from the built bank: all keys and printed values check out. Six numericals tagged "understanding" were retagged "application" under the honest-tag rule (application or higher now 61%). Scope note: the parallel- and perpendicular-axis theorems and rolling motion are left out as in the README; please confirm the rationalised book keeps τ = Iα and K = ½Iω². Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Parallel and perpendicular axes theorems, rolling motion, rotational kinematics equations and work–power in rotation are omitted (see Scope); add them with items only if the owner confirms they are in the 2026–27 book.
- Graph and free-body sketches asked for in answers are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae; the diagrams are drawn to stated scales.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
