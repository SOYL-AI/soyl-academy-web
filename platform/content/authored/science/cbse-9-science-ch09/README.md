# CBSE Class 9 Science, Chapter 9 — Sound

`cbse-9-science-ch09` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (6 sections), 32 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch09_short` (20 marks, 40 min) and `t_cbse9sci_ch09_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Production and propagation of sound; t02 Characteristics of sound waves; t03 Human perception of sound; t04 Reflection of sound, echo and echolocation.
- C. V. Raman’s work is stated at a cautious level: he studied the tabla and mridangam and showed that the loaded patch on the drum skin makes the overtones harmonic, so these drums give a clear musical note. No dates or further details are given.
- Facts a reviewer may wish to double-check: Approximate speeds of sound (air about 344 m s⁻¹ near 22 °C, sea water about 1500 m s⁻¹, steel about 5000 m s⁻¹); persistence of hearing about 0.1 s and echo distance about 17 m; audible range about 20 Hz to 20 kHz; animal and device frequencies labelled “about”; tabla overtone frequencies illustrative.

## Shape
- **Part 1, 16 slides:** sound is produced by vibration; sound needs a medium; sound travels as a longitudinal wave; longitudinal and transverse waves; frequency, time period, amplitude and wavelength; the relation v = f λ; worked example (wavelength of a whistle); speed of sound in solids, liquids and gases; worked example (sound through steel and air); worked example (how far is the lightning?); summary; exam tips; 3 checks.
- **Part 2, 16 slides:** pitch, loudness and quality; pitch and loudness on a graph; the audible range, infrasound and ultrasound; uses of ultrasound and infrasound; reflection of sound and echo; sonar: measuring depth with echoes; worked example (echo distances); echolocation and reverberation; c. V. Raman and Indian drums; worked example (wavelength of a bat call); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 4 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 4 · table 18. Four SVGs (compression and rarefaction bands with the pressure graph, frequency and amplitude comparisons, the audible range on a log scale, sonar echo geometry), rendered and checked. Narration 12–79 words (mean 57), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a a c c b d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (0.573 m; 1376 Hz; 360 Hz; 0.677 s; 2.75 km; 275.2 m; 675 m; 13.8 mm; 344 m s⁻¹) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 18 · d2 33 · d3 11 · d4 3.
- **Competency:** recall 11 · understanding 22 · application 30 · analysis 2. Application or higher is **49% of items (54% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 13 · t02 16 · t03 19 · t04 23.
- **Deck checks:** q001, q016, q017 (Part 1); q029, q043, q044 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q033, q045, q006 · B q011, q039, q013 · C (q014 or q061) · D q015.
- **Long (40 marks, 90 min):** A q004, q018, q019, q030, q031, q046, q047, q048, q035, q049 · B q012, q057, (q027 or q056), q040, (q059 or q060) · C q028, (q042 or q062) · D q063, q065.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (11 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 21/21 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed the wave data and the Raman statement.
2. **Fixes by the writer.** A rounded division was written with ≈, two floating-point checks were corrected and a stray control character repaired; ICSE 10 Sound set-ups were avoided.
3. **Every numerical (v = fλ, echo distance, sonar depth, time period) is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

