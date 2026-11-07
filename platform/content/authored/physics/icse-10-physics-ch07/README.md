# ICSE Class 10 Physics, Chapter 7 — Sound

`icse-10-physics-ch07` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 15 slides), notes (5 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch07_short` (20 marks, 30 min) and `t_icse10phy_ch07_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Reflection of sound; echoes and the conditions for hearing them; numerical problems; t02 Uses of echoes: bats, dolphins, fishing, medical imaging and SONAR; t03 Natural, damped and forced vibrations; t04 Resonance as a special case of forced vibration; applications; t05 Characteristics of sound: loudness and intensity, pitch and frequency, quality and waveform; decibel; noise pollution.
- Facts a reviewer may wish to double-check: Persistence of hearing 0.1 s, giving a minimum echo distance of 17 m at 340 m/s; sea water 1500 m/s; each +10 dB is ten times the intensity (stated in the deck before use); prolonged exposure above about 80–85 dB is harmful, about 120 dB causes pain; loudness is related to amplitude squared; the Tacoma Narrows bridge (1940) is cited as harmful resonance.

## Shape
- **Part 1, 13 slides:** reflection of sound and the echo; conditions for hearing a distinct echo; worked example (minimum distance on a warm day); worked example (clapping near a building); echoes in nature and medicine; sONAR: measuring the depth of the sea; worked example (depth of the sea); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** natural and damped vibrations; forced vibrations; worked example (natural frequency of a swing); resonance: two pendulums on a common string; resonance: useful and harmful; loudness and pitch; quality (timbre); worked example (reading a waveform); the decibel and noise pollution; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 6 · diagram 5 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · plot 2 · svg 5 · table 14. Five SVGs with computed self-checks (an echo from a cliff drawn to scale; SONAR with fish at 300 m and seabed at 1200 m; Barton’s pendulums with the resonating pendulum of the driver’s length; sine waves of equal pitch and different loudness and of doubled pitch; a pure tone and a note with overtones of the same period) and two plots (damped oscillation; resonance curve). Narration 12–70 words (mean 50), no symbols, formulae or unit abbreviations.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys c c c b c c a) |
| true-false | 5 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a definition, a name or a one-step answer) |
| numerical | 12 | 1 or 2 (330 m/s; 374.00000000000006 m; 3 s; 333 m/s; 600 m; 60 m; 10 ms; 1.25 Hz; 0.664 m; 249.99999999999997 Hz; 9; 100) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 3 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 19 · d2 40 · d3 10 · d4 1.
- **Competency:** recall 13 · understanding 19 · application 28 · analysis 8 · evaluation 2. Application or higher is **54% of items (62% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 15 · t02 14 · t03 11 · t04 13 · t05 21.
- **Deck checks:** q001, q002, q015 (Part 1); q027, q036, q046 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q003, q016, q029, q011, q010, q057, q013, q044 · B (q066 or q070).
- **Long (40 marks, 60 min):** A q004, q017, q028, q038, q048, q033, q022, q032, q041, q064, q025, q034, q062, q045 · B (q067 or q068 or q069).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (5 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 21/21 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item and rendered the SVGs; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** A waveform self-check that counted zero crossings was changed to count crests; clipped Barton and SONAR layouts were fixed; a “Data:” label that tripped the URL-scheme rule was renamed; one match stem close to ch01 was reworded.
3. **Every numerical computed in code and asserted** (21 re-solve checks); five diagram self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Physics specimen paper (521) order and wording; every key re-mapped so each item's meaning is unchanged.
