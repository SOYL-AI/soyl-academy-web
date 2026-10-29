# CBSE Class 12 Physics, Chapter 2 — Electrostatic Potential and Capacitance

`cbse-12-physics-ch02` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (7 sections), 32 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch02_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch02_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch02/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. The authoring library is `../cbse-12-physics-ch01/src/lib.mjs` (same owner). `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are taught and assessed; the 2026-27 syllabus lists no deleted topics for this chapter.
- **t06:** the syllabus says “formula only, no derivation”, so the energy formulas are stated and used (with the V–Q area picture as a reason), and no item asks for a derivation of $U = \tfrac12 CV^2$.
- Polarisation is treated qualitatively (P proportional to E for most materials, bound charges reduce the field to E₀/K); susceptibility is not used, to avoid clashing conventions.
- The dipole potential-energy formula $U = -pE\cos\theta$ is derived in one long answer from the torque (t03 outcome: “potential energy of a dipole in an external field”).

## Shape
- **Part 1 (t01–t03, 17 slides):** potential and potential difference; point charge; two charges (worked: 180 V at the midpoint, zero points at 13.3 cm and 40 cm); dipole potential; equipotentials of a point charge, a dipole and a uniform field; E = −dV/dl; work and potential difference (worked: −1.6 × 10⁻⁴ J and 20 V); energy of a system (worked: three charges, −0.27 J); dipole energy −pE cos θ.
- **Part 2 (t04–t06, 17 slides):** electrostatics of conductors; potential of a charged sphere (graph); dielectrics and polarisation; capacitance; parallel plates; dielectric effect; worked: 177 pF → 885 pF; series and parallel; worked network (3 μF + 6 μF in series ∥ 4 μF on 12 V: 24, 24, 48 μC); stored energy (V–Q graph); worked: 432 μJ shared → 216 μJ.
- Layouts: title 2, concept 10, two-column 2, diagram 4, example 6, check 6, summary 2, exam-tips 2. Visuals on 31 of 34 slides (largest gap 1).
- **Diagrams (8 SVGs):** equipotentials of a dipole **traced numerically** (RK4 perpendicular to the field; the potential stays constant along every traced curve to better than 0.01 %, and the bisector is checked to be V = 0); point charge with radial lines and equipotentials at V, V/2, V/3 (radii r, 2r, 3r); uniform field with labelled equipotential planes; a charged conductor with field lines along the computed surface normal; parallel-plate capacitor; dielectric slab with induced charges and aligned molecular dipoles; series and parallel circuits; three charges on an equilateral triangle. 8 self-checks; four are geometric/numeric checks and four are by-construction labels (recorded in `build.checks.diagrams`).
- **Plots:** V and E of a point charge against r; V of a charged sphere against r (flat inside); V against Q for a capacitor (area = energy).
- **Narration:** 18–85 words per slide (mean 62), TTS-safe. Contexts: phone chargers, camera flashes, fan regulators.

## Question bank (73)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 7 | 1 (keys a 3, b 1, c 2, d 1) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 11 | 1 or 2 |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 (parallel-plate derivation with K; dielectric inserted with battery connected vs disconnected; dipole energy derivation; conductor properties and shielding; series/parallel derivation with a network) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 5 prose short answers.
- **Difficulty:** d1 15 · d2 23 · d3 29 · d4 6.
- **Competency:** recall 7 · understanding 31 · application 27 · analysis 6 · evaluation 2. Application or higher **48% of items (56% of marks)**, inside the 45–65% band. One-step substitutions (V = kq/r, E = ΔV/d, U = kq₁q₂/r, C = ε₀A/d, U = ½CV²) are tagged understanding (D-035 rule).
- **Topic tags:** t01 14 · t02 10 · t03 11 · t04 15 · t05 18 · t06 10.
- **Cases:** potential mapping on conducting paper in a Nagpur lab (data: field direction, 150 V m⁻¹, the 6 V equipotential, or work on a charge); a camera flash (6.75 J, 6.75 kW, why a capacitor, or evaluate 300 μF at 150 V); a capacitive keyboard (C rises on pressing, 5.31 pF, factor 5/3, or evaluate a higher-K layer); a science-centre charged sphere in Kolkata (potential inside, 2.5 μC, hair standing on end, or evaluate 1 MV against air breakdown).
- **Deck checks:** zero potential vs zero field (AR), work along an equipotential, rotating a dipole (numerical) (Part 1); shielding (TF), series combination, energy with a dielectric (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q005, q014, q047, q039 · B q019, q053, q028 · C q065 or q067 · D q071.
- **Long (40 marks, 90 min):** A q002, q006, q007, q021, q022, q037, q044, q048, q040, q060 · B q041, q029, (q042 or q054), q061, (q063 or q064) · C q066 + (q068 or q069) · D q070, q073.

## Validation
- Build: 0 validator errors, 0 warnings; 648 maths strings parsed (KaTeX strict); 25 SVG visuals / 8 distinct diagrams pass the allow-list; pipeline stage-4 lint 0 errors, 0 warnings; pipeline stage-5 deterministic checks run inside the build with 0 flags.
- 40 scripted re-solve checks pass (every numerical, computed options, case data and long-answer numbers).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Competency band:** the first draft had 45% application or above (lint warned at the band edge). Four items that need reasoning in a new situation were added: two connected spheres (σ ∝ 1/r, d4), a charge inside a hollow conductor (induced −q / +q, d4), a bird on a power line, and building 3 μF from three 2 μF capacitors. Now 48%.
2. **Word limit:** the thunderstorm evaluation answer was 61 words for a 30–50 word question; trimmed.
3. **Polarisation formula:** a draft wrote P = χₑε₀E; NCERT-style texts use a different convention for χ, so the deck now states only that P is proportional to E.
4. **Connected-battery energy (long answer):** the explanation now accounts for the energy exactly: the battery does 0.40 J, the stored energy rises by 0.20 J, and the rest is work done on the slab.
5. **Diagram fix after rasterising:** the parallel-circuit rails ran past the last capacitor; shortened.
6. **Facts double-checked:** V = kq/r; dipole V = kp cos θ/r², zero on the equatorial plane while E ≠ 0; equipotentials ⟂ field, spacing grows for a point charge; E = −dV/dl; U = kq₁q₂/r per pair; U = −pE cos θ, work 2pE for 0° → 180°; conductor: E = 0 inside, σ/ε₀ normal outside, equipotential, charge on the surface, shielding, σ larger at sharp points; C = Kε₀A/d; slab formula ε₀A/(d − t + t/K); series/parallel rules; U = Q²/2C = ½CV² = ½QV; dielectric with battery connected (U × K) vs disconnected (U ÷ K); charge sharing loses energy; air breaks down near 3 × 10⁶ V m⁻¹.

## Known gaps
- Circuit sketches in model answers are described in words; graders should accept any correct diagram.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
