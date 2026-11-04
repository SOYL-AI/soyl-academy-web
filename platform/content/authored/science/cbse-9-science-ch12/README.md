# CBSE Class 9 Science, Chapter 12 — Earth as a System: Energy, Matter and Life

`cbse-9-science-ch12` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); a first Sonnet writer drew the SVGs and a second Sonnet writer wrote the chapter after a session limit; reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 32 flashcards, 60 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch12_short` (20 marks, 40 min) and `t_cbse9sci_ch12_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch12/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Earth as interconnected spheres; t02 Solar energy: nature, spectrum and interaction with Earth; t03 Biogeochemical cycles; t04 Human impact on Earth systems.
- The unit carries 5 marks, so the chapter is compact. Nitrification is given as ammonia to nitrates without the nitrite step, and the monsoon is explained as land–sea heating, both at Class 9 level.
- Facts a reviewer may wish to double-check: As of the early 2020s: CO₂ about 420 ppm (about 280 ppm before the late 1800s) and warming of about 1.1 °C since the late 1800s; approximate Mauna Loa values in a case table (317, 339, 370, 414 ppm for 1960–2020). Approximate: solar constant about 1361 W m⁻², about 30 % of sunlight reflected, mean surface about 15 °C against about −18 °C without greenhouse gases, sunlight about half infrared and two-fifths visible; axial tilt about 23.5°; air about 78 % nitrogen; about 97 % of Earth’s water in the oceans; urea about 46 % nitrogen.

## Shape
- **Part 1, 17 slides:** five spheres, one system; what is in each sphere?; worked example (the journey of a monsoon raindrop); when a volcano erupts; sunlight is radiation; what happens to sunlight on Earth?; light surfaces reflect, dark surfaces absorb; the greenhouse effect; latitude: the same beam, a bigger patch; worked example (energy at 30 degrees north); tilt of the axis and the seasons; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** energy flows, matter cycles; the carbon cycle; the nitrogen cycle; fixation, nitrification, denitrification; the water cycle; worked example (evaporation from a tank); human impact on the carbon cycle and the climate; worked example (how much has carbon dioxide risen?); warming and its effects; fertilisers and the nitrogen cycle; what can we do?; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 18 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 6 · svg 6 · table 16. Six SVGs (Earth’s spheres, sunlight at the equator against 60° N with patch lengths from 1/cos(latitude), axial tilt and seasons, carbon, nitrogen and water cycles), 21 self-checks, rendered and checked. Narration 12–81 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (60)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys b a c a a d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (953 W m⁻²; 450 W m⁻²; 10000 litres; 138 kg; 50 %) |
| short (2 marks) | 6 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 5 · d2 30 · d3 24 · d4 1.
- **Competency:** recall 4 · understanding 19 · application 19 · analysis 16 · evaluation 2. Application or higher is **62% of items (61% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 11 · t02 21 · t03 21 · t04 10.
- **Deck checks:** q001, q012, q018 (Part 1); q032, q034, q053 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q013, q014, q038, q019 · B q027, q047, q028 · C (q030 or q051) · D q031.
- **Long (40 marks, 90 min):** A q002, q004, q015, q017, q037, q035, q054, q055, q020, q040 · B q008, q048, (q056 or q026), q029, (q057 or q049) · C q050, (q010 or q058) · D q011, q052.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (21 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by Sonnet 5.5 writers (sub-agents spawned with model sonnet); the producer reviewed the climate data, the time-sensitive facts and the diagrams.
2. **Fixes.** The second writer redrew the carbon cycle (overlapping labels, a meaningless arrow), re-tagged five items to bring application or higher into the band and trimmed the decks. The producer removed a pixel measurement (“30 px”) from the latitude diagram’s caption.
3. **Every numerical (beam spreading, energy budget, rainwater volume, fertiliser nitrogen, CO₂ rise) is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

