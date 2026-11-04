# CBSE Class 9 Science, Chapter 7 — Structure of an Atom

`cbse-9-science-ch07` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 20 slides), notes (6 sections), 32 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch07_short` (20 marks, 40 min) and `t_cbse9sci_ch07_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 3 syllabus topics are covered: t01 Subatomic particles and atomic models; t02 Distribution of electrons; valency; t03 Atomic number, mass number, isotopes and isobars.

- Facts a reviewer may wish to double-check: Electron mass about 1/1836 u; Goldstein 1886, Thomson 1897 (model about 1904), Rutherford 1911, Bohr 1913, Chadwick 1932; shells 2, 8, 8 for Z up to 20 and valency rules; isotope uses (cobalt-60, iodine-131, uranium-235, carbon-14) at textbook level; isobars Ar-40, K-40, Ca-40. The fraction of alpha particles that rebound is stated only as “roughly one in many thousands” (books quote 1 in 8000 or 1 in 12 000); the rebound counts in worked examples are illustrative.

## Shape
- **Part 1, 18 slides:** the atom can be divided; cathode rays and the electron; canal rays, the proton and the neutron; thomson's model: the plum pudding; rutherford's gold-foil experiment; scattering of alpha particles; worked example (how rare is a rebound?); rutherford's model and its limitation; bohr's model: shells; jumps between shells; worked example (how heavy are the electrons?); three models compared; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** rules for filling the shells; the first twenty elements; shell diagrams; valency from the outer electrons; worked example (distribution and valency); atomic number and mass number; worked example (counting particles); ions: atoms that gain or lose electrons; worked example (counting particles in ions); isotopes; comparing isotopes of hydrogen; uses of isotopes; isobars; worked example (average atomic mass); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 7 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: svg 7 · table 23. Seven SVGs (discharge tube with cathode and canal rays, Thomson model, Rutherford scattering, Bohr orbits, shell diagrams drawn from computed electron distributions, hydrogen isotopes), rendered and checked. Narration 18–78 words (mean 57), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a d b c a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (35 neutrons; 18 electrons; 40; 10.8 u; 24.3 u; 94 %; 13 neutrons; 29 particles; 0.025 %) |
| short (2 marks) | 6 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 12 · d2 35 · d3 15 · d4 1.
- **Competency:** recall 7 · understanding 16 · application 29 · analysis 10 · evaluation 1. Application or higher is **63% of items (60% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 23 · t02 11 · t03 30.
- **Deck checks:** q001, q002, q003 (Part 1); q023, q034, q035 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q004, q024, q036, q009 · B q015, q030, q018 · C (q019 or q032) · D q022.
- **Long (40 marks, 90 min):** A q005, q006, q007, q008, q025, q026, q037, q040, q042, q027 · B q016, q017, (q047 or q048), q031, (q049 or q051) · C q020, (q021 or q052) · D q033, q053.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (33 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 20/20 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed the atomic data and the diagrams.
2. **Fixes.** The writer corrected a wrong row index in the twenty-element table check and re-tagged three items. The producer replaced the specific “about 1 in 8000” rebound figure in the deck, notes, flashcard, SVG and a model answer with “roughly one in many thousands”, because textbooks quote different figures.
3. **Electron distributions, valencies, particle counts and average atomic masses are computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

