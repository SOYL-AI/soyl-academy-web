# CBSE Class 11 Chemistry, Chapter 3 — Classification of Elements and Periodicity in Properties

`cbse-11-chemistry-ch03` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 22 slides), notes (7 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch03_short` (20 marks, 40 min) and `t_cbse11chem_ch03_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 3 syllabus topics are covered: t01 Development of the periodic table and modern periodic law; t02 Electronic configurations and types of elements; t03 Periodic trends.

- Facts a reviewer may wish to double-check: NCERT-style data: atomic radii (Li 152 … F 64; Na 186, Mg 160, Al 143, Si 117, P 110, S 104, Cl 99 pm; metallic radii for the metals); ionic radii of the ten-electron series (N³⁻ 171, O²⁻ 140, F⁻ 133, Na⁺ 102, Mg²⁺ 72, Al³⁺ 54 pm) and the eighteen-electron series (P³⁻ 212, S²⁻ 184, Cl⁻ 181, K⁺ 138, Ca²⁺ 100, Sc³⁺ 75 pm); first ionisation enthalpies (H 1312 … Ne 2081; Na 496, Mg 737, Al 577, Si 786, P 1012, S 999, Cl 1256, Ar 1520; K 419, Ca 590 kJ mol⁻¹); successive ionisation enthalpies of Be, Mg, Al, Si and P; electron gain enthalpies (F −328, Cl −349, Br −325, I −295, O −141, S −200 kJ mol⁻¹); Pauling electronegativities (H 2.1, C 2.5, N 3.0, O 3.5, F 4.0); Br–Br 228 pm.

## Shape
- **Part 1, 20 slides:** döbereiner’s triads; newlands’ law of octaves; mendeleev’s periodic law; mendeleev’s predictions and limitations; worked example (using the triad rule); the modern periodic law; the long form: periods and groups; naming elements with Z greater than 100; worked example (systematic names); classifying by the last subshell: s, p, d and f blocks; finding period and group from the configuration; worked example (locating elements); metals, non-metals and metalloids; representative, transition and inner transition elements; summary; exam tips; 3 checks.
- **Part 2, 22 slides:** atomic radius; ionic radius; isoelectronic species; worked example (arranging by radius); ionisation enthalpy; trend in first ionisation enthalpy; anomalies in ionisation enthalpy; successive ionisation enthalpies; worked example (group from successive data); electron gain enthalpy; why chlorine releases more energy than fluorine; electronegativity; valency and chemical character across a period; worked example (an amphoteric oxide); anomalous behaviour of second-period elements; diagonal relationships; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 20 · diagram 4 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 4 · table 31. Four SVGs (schematic block layout of the periodic table, not a reproduced table; first ionisation enthalpy against atomic number; ionic radii of an isoelectronic series; electron gain enthalpy bars). Narration 9–68 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c c d a) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1–3 (76.4; 129; 50; 124 kJ; 8.24; 2188 kJ; 114 pm; 5) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 5 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 8 · d2 35 · d3 21 · d4 2.
- **Competency:** recall 6 · understanding 20 · application 28 · analysis 12. Application or higher is **61% of items (61% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 18 · t02 12 · t03 37.
- **Deck checks:** q005, q017, q018 (Part 1); q030, q031, q032 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q001, q033, q035, q043 · B q012, q055, q015 · C (q016 or q062) · D q029.
- **Long (40 marks, 90 min):** A q002, q003, q004, q019, q020, q036, q038, q039, q008, q044 · B q013, q025, (q056 or q057), q058, (q059 or q060) · C q026, (q063 or q064) · D q066, q027.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (14 diagram self-checks (geometry and data computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 11/11 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer checked every quoted value against NCERT-style data.
2. **Producer fixes.** Third-period ionisation enthalpies aligned to NCERT values (Mg 737, Al 577, S 999, Cl 1256, Ar 1520; the Mg 1st + 2nd numerical is now 2188 kJ); S atomic radius 104 pm (was 103); the period-2/3 radius table relabelled “atomic radii (metallic for metals, covalent for non-metals)”, since Li 152 and Na 186 pm are metallic radii.
3. **IUPAC names and symbols for Z > 100, block, period and group are computed from the atomic number in data.mjs and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

