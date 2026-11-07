# ICSE Class 10 Physics, Chapter 10 — Electromagnetism

`icse-10-physics-ch10` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (5 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch10_short` (20 marks, 30 min) and `t_icse10phy_ch10_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Oersted's experiment; magnetic field due to a straight wire and a loop; right-hand thumb rule; t02 Electromagnets and their uses; comparison with permanent magnets; t03 Force on a current-carrying conductor; Fleming's left-hand rule; DC motor (parts and energy transfer); t04 Electromagnetic induction (elementary); Fleming's right-hand rule; AC generator (parts and energy transfer); frequency of household AC; t05 Advantages of AC over DC; transformers: step-up and step-down.
- Removed topics are respected: Laws of the magnetic effect of a current (principles only); Working of the DC motor and AC generator (parts and energy transfer only).
- Facts a reviewer may wish to double-check: Clock rule (anticlockwise current → north); electromagnet strength compared with turns × current (a simplification, no field formula); the ideal-transformer relation VpIp = VsIs is used in one difficulty-4 numerical and one long-answer part; mains peak 311 V for 220 V r.m.s.; the motor and generator are covered by parts and energy changes only (removed topic respected).

## Shape
- **Part 1, 16 slides:** oersted’s experiment; field of a straight wire; the right-hand thumb rule; field of a circular loop; the solenoid; worked example (which electromagnet is stronger?); electromagnets and permanent magnets; an electromagnet at work; force on a conductor; Fleming’s left-hand rule; worked example (using the left-hand rule); the DC motor: parts and energy; summary; exam tips; 3 checks.
- **Part 2, 16 slides:** electromagnetic induction; what makes the induced current larger?; fleming’s right-hand rule; worked example (direction of an induced current); the AC generator: parts and energy; household AC: frequency 50 Hz; worked example (frequency and period); advantages of AC over DC; the transformer; worked example (transformer voltages); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 3 · diagram 12 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: plot 1 · svg 11 · table 14. Eleven SVGs (Oersted’s experiment; fields of a straight wire for both current directions, a loop and a solenoid; an electromagnet; Fleming’s left- and right-hand rules; magnet-and-coil induction; DC motor and AC generator parts; a step-down transformer) with every direction derived from a computed cross product, and an AC waveform plot. Narration 10–67 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b d a c) |
| true-false | 5 | 1 |
| fill-blank | 9 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 4 | 1 (a definition, a name or a one-step answer) |
| numerical | 6 | 1 or 2 (16.666666666666668 ms; 9000; 24 V; 1500 turns; 0.2 A; 90 turns) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 3 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 25 · d2 33 · d3 10 · d4 3.
- **Competency:** recall 20 · understanding 18 · application 25 · analysis 8. Application or higher is **46% of items (58% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills. (superseded: see Competency audit 2026-11-05)
- **Topic tags:** t01 14 · t02 17 · t03 14 · t04 20 · t05 15.
- **Deck checks:** q001, q014, q025 (Part 1); q036, q040, q051 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q015, q038, q042, q021, q044, q023, q063 · B (q067 or q070).
- **Long (40 marks, 60 min):** A q027, q016, q039, q052, q054, q055, q007, q045, q057, q065, q034, q048, q013, q064 · B (q068 or q069 or q071).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (11 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 20/20 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** Application-or-higher was 39% at first; two recall MCQs were replaced by application items and three items retagged; assertion-reason keys were rebalanced; overlapping labels on four figures were fixed.
3. **Every numerical computed in code and asserted**; eleven diagram self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

## Competency audit 2026-11-05
Reference: `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`. Tags must describe the demand honestly; items were improved, not relabelled.
- **Honest retags only (text unchanged):** q038 (gen-mcq) application → recall; q040 (freq-mcq), q051 (trans-mcq) and q056 (trans-tf) → understanding. q046 (period-num) was rewritten (time for 15 cycles at 60 Hz, 250 ms) but is still essentially one step (15 ÷ 60), so the reviewer tagged it understanding. q040 and q051 are deck checks and keep their slides.
- **Rewritten as genuine application or analysis items (same key, type, marks, topics, test slots; ids unchanged):**
  - q004 (reverse-mcq): current reversed and compass moved to the opposite side of a vertical wire; the two changes cancel (application).
  - q012 (factors-short2): interpret compass-swing readings against distance, then decide what to change (analysis).
  - q014 (emag-mcq, deck check): predict clips lifted from a table of turns and current readings (analysis).
  - q015 (core-mcq): predict an electric bell with a steel core instead of soft iron (application).
  - q017 (perm-mcq): choose electromagnet or permanent magnet for a fail-safe fire-door holder (application).
  - q022 (pole-fill): solenoid polarity by the clock rule, then attraction with a bar magnet's south pole (application).
  - q028 (parallel-mcq): Fleming's left-hand rule in a new set-up, then the effect of reversing both current and field (application).
  - q036 (induce-mcq, deck check): predict the galvanometer through a sequence of magnet motions (application).
  - q041 (speed-mcq): direction and size of the swing when the magnet is pulled out faster (application).
  - q047 (cycles-num): cycles in 3 minutes, then reversals (two per cycle), 18000 (application).
  - q048 (emi-short2): predict direction and size of the swing for two described magnet motions, with reasons (application).
  - q053 (advantage-mcq): same power through the same cable at two voltages; compare heat loss (application).
  - q054 (stepdown-mcq): turns ratio, output voltage, output power, then mains current of an ideal transformer, 0.5 A (application).
  - q058 (vs-num): turns ratio to output voltage, then power delivered to a lamp, 12 W (application).
  - q059 (ns-num): ideal transformer, turns ratio from the two currents, then secondary turns, 1500 (application).
  - q061 (turns-num): efficiency from input and output powers, 80% (application).
  - q063 (acdc-short2): currents at 220 V and 22000 V for 22 kW, then which wastes less and why AC is needed (application).
- **Competency now:** recall 21 · understanding 17 · application 25 · analysis 8 (evaluation 0). Application or higher is **33 of 71 = 46.5%** of items, inside the 45–65% band. Difficulty: d1 23 · d2 17 · d3 28 · d4 3.
- Rebuilt twice with byte-identical `release.json` and `tests.json`; validator 0 errors, 0 warnings; lint 0 errors, 0 warnings; 23 re-solve checks pass.

