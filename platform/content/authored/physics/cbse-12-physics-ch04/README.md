# CBSE Class 12 Physics, Chapter 4 — Moving Charges and Magnetism

`cbse-12-physics-ch04` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (6 sections), 30 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch04_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch04_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch04/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. The authoring library is `../cbse-12-physics-ch01/src/lib.mjs` (same owner). `questions-extra.mjs` holds the 14 items added in the verifier pass (imported last, so ids continue in order). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are taught and assessed; the 2026-27 syllabus lists no deleted topics for this chapter.
- **t03:** Ampere’s law is applied to the long straight wire; the solenoid is treated **qualitatively** with the result B = μ₀nI, as the outcome says (no toroid).
- The cyclotron is not used (not in the 2026-27 syllabus); circular and helical motion and the velocity selector cover t01.
- The ampere is given with its classic parallel-wire definition, with a note that the 2019 SI fixes e instead.

## Shape
- **Part 1 (t01–t03, 17 slides):** Lorentz force; circular motion (worked: a proton at 2.0 × 10⁶ m s⁻¹ in 0.50 T, r = 0.0418 m, T = 1.31 × 10⁻⁷ s); velocity selector (worked: 1.5 × 10⁶ m s⁻¹); Biot–Savart law; the loop-axis field with its derivation (worked: 100 turns, 2.51 mT at the centre, 0.889 mT at x = R); Ampere’s law and the wire; the solenoid (worked: 4.0 × 10⁻⁵ T and 2.51 mT).
- **Part 2 (t04–t06, 16 slides):** force on a conductor; parallel currents; the ampere (worked: 2.0 × 10⁻⁴ N m⁻¹, attractive); torque on a coil; the coil as a magnetic dipole (analogy table with the electric dipole); worked: m = 0.050 A m², τ = 5.0 × 10⁻³ N m; the moving coil galvanometer and radial field; conversions (worked: shunt 0.100 Ω, series 4950 Ω).
- Layouts: title 2, concept 6, two-column 2, diagram 6, example 7, check 6, summary 2, exam-tips 2. Visuals on 31 of 33 slides (largest gap 1).
- **Diagrams (9 SVGs):** circular motion in a field into the page; velocity selector; Biot–Savart element; loop-axis construction; field lines round a wire with Amperian loops; solenoid cross-section; parallel currents; side view of a coil with forces and moment; galvanometer conversions. **Every direction drawn is recomputed as a cross product** in explicit coordinates (x right, y down, z into the page): the centripetal force, the opposing selector forces, dB of the element (out of the page), the loop-axis components (Biot–Savart in 3D; perpendicular parts cancel), the anticlockwise field of a wire with current out of the page, the solenoid’s internal field and N pole, the attraction of like currents, the couple on the coil and the moment from the polygon-area formula. 10 self-checks, all pass.
- **Plots:** field along the axis of a loop (B/B₀ = 1/(1 + x²/R²)^{3/2}); field of a long wire against distance.
- **Narration:** 18–83 words per slide (mean 63), TTS-safe. Contexts: Oersted’s 1820 observation, particle beams, motors and loudspeakers, analogue meters.

## Question bank (73)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6) |
| assertion-reason | 7 | 1 (keys a 3, b 1, c 1, d 2) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 13 | 1 or 2 |
| short | 8 + 4 | 2 / 3 |
| long | 5 | 5 (loop-axis derivation; parallel currents and the ampere; galvanometer and current sensitivity; Lorentz force with selector and circle; torque on a coil and stable orientation) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 7 prose short answers.
- **Difficulty:** d1 9 · d2 26 · d3 36 · d4 2.
- **Competency:** recall 3 · understanding 36 · application 30 · analysis 3 · evaluation 1. Application or higher **47% of items (51% of marks)**, inside the 45–65% band; one-step substitutions tagged understanding (D-035 rule).
- **Topic tags:** t01 19 · t02 11 · t03 13 · t04 11 · t05 9 · t06 13.
- **Cases:** a mass spectrometer in Mumbai separating neon-20 and neon-22 (8.30 cm radius; 1.7 cm apart; why a velocity selector); an HVDC line near Chandrapur (4.0 μT, 8% of the Earth’s field; why AC would affect a compass even less); a current balance lifting a 20 g rod (0.98 A; reversing the current; evaluate a parallel field); converting a galvanometer for a Kochi school lab (0.100 Ω shunt; resistance of the ammeter; a 0.12 Ω shunt reads high).
- **Deck checks:** no work by a magnetic force (TF), doubling a loop’s radius, field of a wire (numerical) (Part 1); opposite currents (AR), zero torque, ideal ammeter (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q004, q016, q036, q028 · B q012, q048, q041 · C q051 or q053 · D q058.
- **Long (40 marks, 90 min):** A q002, q005, q017, q022, q025, q030, q039, q046, q010, q047 · B q019, q034, (q049 or q027), q013, (q035 or q050) · C q052 + (q054 or q055) · D q056, q059.

## Validation
- Build: 0 validator errors, 0 warnings; 573 maths strings parsed (KaTeX strict); 27 SVG visuals / 9 distinct diagrams pass the allow-list; pipeline stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 38 scripted re-solve checks pass (every numerical, computed options, direction answers as cross products, case data and long-answer numbers).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem; every right-hand-rule answer was recomputed as a cross product. Findings and fixes:
1. **Wrong direction (beam-short):** the first draft said an electron beam moving away from the viewer in an upward field is deflected to the right. The cross product (forward × up = right for a positive charge) gives **left** for electrons; the model answer and scheme were corrected.
2. **Diagram self-checks caught two drawing slips:** the loop-axis figure first used a hand-made direction rule; it is now built from the Biot–Savart cross product, with the current marked out of the page at the top and into it at the bottom so the drawn field points away from the loop. The coil’s magnetic-moment check first used the wrong order in the cross product (the drawn arrow was right; the check was fixed using the polygon-area formula).
3. **Count and competency:** the main bank had 59 items; 14 more were added (3 AR, 2 TF, 1 fill-in, 5 MCQ, 1 numerical, 2 short) so the bank has 73 and the application share is 47%.
4. **Layout after rasterising:** labels moved off the field circles (Ampere), the dB symbol moved inside the canvas (Biot–Savart), the solenoid label no longer sits on a field line, and the torque figure was made taller so the lower force label is clear.
5. **Facts double-checked:** F = q(E + v × B); no work by B; r = mv/qB, T = 2πm/qB independent of v; helix pitch v∥T; v = E/B; Biot–Savart with μ₀ = 4π × 10⁻⁷; loop axis μ₀IR²/2(R² + x²)^{3/2}, centre μ₀I/2R, semicircle μ₀I/4R; Ampere’s law, wire μ₀I/2πr, solenoid μ₀nI and the anticlockwise-end-is-N rule; F = Il × B; μ₀I₁I₂/2πd, like currents attract; 2 × 10⁻⁷ N m⁻¹ ampere definition; τ = NIAB sin θ with θ from the normal, m = NIA; radial field, φ = (NAB/k)I, current and voltage sensitivity; shunt and series-resistance formulas.

## Known gaps
- Field and force sketches asked for in answers are described in words; graders should accept any correct diagram.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
