# CBSE Class 12 Physics, Chapter 6 — Electromagnetic Induction

`cbse-12-physics-ch06` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (5 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch06_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch06_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch06/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. The authoring library is `../cbse-12-physics-ch01/src/lib.mjs` (same owner). `questions-extra.mjs` holds the 10 items added in the verifier pass (imported last). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Topics t01 Faraday’s laws, t02 Lenz’s law and energy conservation, t03 motional emf, t04 self- and mutual induction are taught and assessed.
- **Eddy currents are deleted** in the 2026-27 syllabus (`removed_topics`): they are not taught or assessed, and no item depends on them (the falling-magnet items use a closed ring or coil, where the induced current is ordinary).
- The AC generator is not in this chapter’s 2026-27 outcomes and is not used. The energy stored in an inductor, ½LI², appears as a formula in the notes and in two items, without derivation.

## Shape
- **Part 1 (t01–t02, 15 slides):** Faraday’s experiments; magnetic flux; Faraday’s law with a flux–emf graph; worked: 8.0 V when 0.20 T is switched off through 200 turns; Φ = 3t² + 2t gives 14 mV at 2 s; Lenz’s law for a loop and for a moving magnet; energy conservation; worked Lenz direction.
- **Part 2 (t03–t04, 16 slides):** motional emf in a sliding rod; worked: 0.60 V, 0.30 A, 0.045 N, 0.18 W = I²R; a rotating rod ½Bωl² (worked: 4.0 V); self-induction; L of a solenoid (worked: 0.503 mH, 0.10 V); mutual induction and its factors; M of coaxial solenoids; worked: 30 V.
- Layouts: title 2, concept 7, diagram 5, example 7, check 6, summary 2, exam-tips 2. Visuals on 28 of 31 slides (largest gap 1).
- **Diagrams (5 SVGs):** a loop in a growing inward field (anticlockwise induced current); a magnet approaching a coil (near face N); a rod on rails (current up the rod, opposing force left); a coil with back emf; two coaxial coils. **Every induced-current direction is checked with a cross product**: the loop current’s own field opposes the change, the induced moment of the coil points back at the magnet, q v × B in the rod points up and I l × B on the rod opposes the motion. 6 self-checks, all pass.
- **Plot:** flux rising, steady and falling, with the step-shaped emf −dΦ/dt.
- **Narration:** 12–82 words per slide (mean 58), TTS-safe.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 6 | 1 (keys a 3, c 1, d 2) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 13 | 1 or 2 |
| short | 6 + 4 | 2 / 3 |
| long | 5 | 5 (Faraday and Lenz with energy; motional emf with force and power; rotating rod; M of coaxial solenoids; self-induction with the spark on switching off) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 6 prose short answers.
- **Difficulty:** d1 10 · d2 24 · d3 31 · d4 3.
- **Competency:** recall 3 · understanding 30 · application 31 · analysis 4. Application or higher **51% of items (58% of marks)**.
- **Topic tags:** t01 19 · t02 15 · t03 15 · t04 24.
- **Cases:** flux data from a Kanpur search coil (zero-emf interval, 200 mV, 300 mV opposite, or evaluate “largest flux, largest emf”); a train on broad-gauge track (axle as conductor, 2.5 mV, speed from emf, or evaluate north–south travel); a wireless phone charger (mutual induction, 1.0 V, alignment, why AC); a magnet dropped through a coil with a data logger in Guwahati (opposite pulses, taller second pulse, closed circuit slows the fall, or equal areas ∫ε dt = NΔΦ).
- **Deck checks:** steady flux (TF), pulling a magnet away, emf from a changing field (numerical) (Part 1); motional emf (numerical), doubling turns, steady current in a coupled coil (AR) (Part 2).

## Chapter tests
- **Short (20 marks, 40 min):** A q006, q019, q044, q011 · B q020, q046, q049 · C q050 or q053 · D q055.
- **Long (40 marks, 90 min):** A q003, q008, q014, q016, q024, q025, q027, q040, q029, q042 · B q021, q047, (q012 or q048), q022, (q030 or q031) · C q051 + (q052 or q054) · D q056, q057.

## Validation
- Build: 0 validator errors, 0 warnings; 350 maths strings parsed (KaTeX strict); 18 SVG visuals / 5 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 33 scripted re-solve checks pass (every numerical, computed options, direction answers as cross products, case data and long-answer numbers).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; every direction answer was recomputed. Findings and fixes:
1. **Bank size and balance:** the first draft had 58 items (lint: below 60 for Class 12) and 45% application or above. Ten items were added (two-turn coil from the same wire, flipping a coil, a south pole approaching, the jumping ring, speed and force for a rod on rails, L from emf, flux per turn from L, reciprocity of M, a loop moving inside a uniform field). Now 68 items, 51%.
2. **Verifier minor flag:** the train-case numerical stated 2.5 mV without an “=” step computing it; the solution now converts explicitly.
3. **Directions double-checked:** a loop in a growing inward field (anticlockwise), a downward increasing field seen from above (anticlockwise), a loop moving away from an upward current on its right (clockwise), a south pole approaching (near face S, clockwise seen from the magnet), the rod on rails (current up the rod, force opposing motion), coaxial loops when one is switched on (repel).
4. **Facts double-checked:** Φ = BA cos θ in Wb; ε = −N dΦ/dt; q = NΔΦ/R independent of speed; Lenz’s law and energy conservation; ε = Blv, F = B²l²v/R, P = I²R; terminal speed mgR/B²l²; ε = ½Bωl²; spokes of a wheel in parallel; N Φ = LI, ε = −L dI/dt, L = μ₀N²A/l (∝ N², × μr); N₂Φ₂ = MI₁, M₁₂ = M₂₁, M = μ₀n₁n₂πr₁²l; perpendicular axes minimise M; U = ½LI².

## Known gaps
- Diagrams asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
