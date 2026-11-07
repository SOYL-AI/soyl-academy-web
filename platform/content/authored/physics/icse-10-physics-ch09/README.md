# ICSE Class 10 Physics, Chapter 9 — Electrical Power, Energy and Household Circuits

`icse-10-physics-ch09` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (6 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch09_short` (20 marks, 30 min) and `t_icse10phy_ch09_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Electrical energy W = QV = VIt = I^2Rt = (V^2/R)t and power P = VI = I^2R = V^2/R; t02 Commercial unit kW h; household consumption and electricity bills; t03 Power distribution and house wiring: live, neutral and earth; ring main system; main switch, fuse and MCB; t04 Two-way (staircase) switch; three-pin plug and socket; earthing; colour coding of wires; safety precautions.
- Facts a reviewer may wish to double-check: Distribution: generated at 11 kV, stepped up to 132 kV, down through 33 kV and 11 kV to 220 V; ring main protected at 30 A, lighting circuits about 5 A and power circuits about 15 A; order from the pole: company fuse, kWh meter, double-pole main switch, distribution board; colour code brown, light blue, green or green-yellow (old red, black, green); socket front view with live on the right and neutral on the left.

## Shape
- **Part 1, 15 slides:** electrical energy; electrical power; what a power rating means; worked example (a geyser on a low voltage); higher power, lower resistance; the kilowatt hour; worked example (a monthly bill); saving energy at home; worked example (heater coils in series and in parallel); summary; exam tips; 3 checks.
- **Part 2, 16 slides:** power distribution; from the pole to the circuits; switch and fuse in the live wire; worked example (choosing a fuse); the ring main system; worked example (will the MCB trip?); two-way (staircase) switch; the three-pin plug and socket; earthing; colour code and safety precautions; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 6 · diagram 8 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · plot 2 · svg 6 · table 15. Six SVGs (pole to distribution board; switch and fuse in the live wire, checked by nodal analysis; ring main; two-way staircase switch with its truth table found by path search; three-pin plug and socket with the longer, thicker earth pin; earthing during a fault with 110 A against a 15 A fuse) and two plots. Narration 12–70 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c d c b a) |
| true-false | 5 | 1 |
| fill-blank | 7 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 4 | 1 (a definition, a name or a one-step answer) |
| numerical | 8 | 1 or 2 (72 kJ; 88 Ω; 6 A; 45 kWh; 1632 ₹; 9 MJ; 3520 W; 220 A) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 3 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 25 · d2 29 · d3 13 · d4 1.
- **Competency:** recall 17 · understanding 16 · application 26 · analysis 8 · evaluation 1. Application or higher is **51% of items (57% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 17 · t02 16 · t03 22 · t04 18.
- **Deck checks:** q001, q016, q018 (Part 1); q028, q031, q046 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q033, q047, q035, q009, q054, q026, q059 · B (q064 or q068).
- **Long (40 marks, 60 min):** A q006, q017, q029, q048, q049, q036, q019, q039, q055, q062, q014, q042, q058, q044 · B (q065 or q066 or q067).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (9 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 26/26 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** Overlapping labels on three figures and one garbled sentence on the heater-coil slide were fixed.
3. **Every numerical computed in code and asserted**; nine circuit self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Physics specimen paper (521) order and wording; every key re-mapped so each item's meaning is unchanged.
