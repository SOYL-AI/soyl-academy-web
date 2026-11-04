# CBSE Class 11 Chemistry, Chapter 10 — s- and p-Block Elements (formative assessment only)

`cbse-11-chemistry-ch10` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 31 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch10_short` (20 marks, 40 min) and `t_cbse11chem_ch10_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 1 syllabus topics are covered: t01 General trends in s- and p-block elements.
- The syllabus marks this chapter **formative assessment only** (not in the annual theory paper); it is taught at textbook depth for school tests.

- Facts a reviewer may wish to double-check: NCERT-style group data: group 1 metallic radii (Li 152 … Cs 265 pm), ionic radii, first ionisation enthalpies (520, 496, 419, 403, 376 kJ mol⁻¹) and hydration enthalpies (−506, −406, −330, −310, −276 kJ mol⁻¹); group 2 radii and ionisation enthalpies; standard electrode potentials (Li −3.05 V and others); flame colours; group 13 radii (B 85, Al 143, Ga 135, In 167, Tl 170 pm) and ionisation enthalpies; group 14 covalent radii and E–E bond enthalpies; densities of diamond 3.51 and graphite 2.26 g cm⁻³ (fullerene about 1.7 is approximate); C₆₀ with 20 hexagons and 12 pentagons.

## Shape
- **Part 1, 17 slides:** valence configurations of the s-block and p-block; trends down a group: radius and ionisation enthalpy; group 1 trends as plots; ionisation enthalpy in groups 1 and 2; worked example (why Na⁺ but Mg²⁺?); flame colours; hydration enthalpy of the alkali metal ions; reducing character; lithium: the unique first element of group 1; diagonal relationships; worked example (beryllium, the odd one out of group 2); summary; exam tips; 3 checks.
- **Part 2, 17 slides:** group 13: configuration and data; group 13 trends as plots; oxidation states and the inert pair effect; worked example (energy cost of M³⁺); anomalous behaviour of boron; group 14: configuration and data; catenation in group 14; inert pair effect in group 14; anomalous behaviour of carbon; worked example (CCl₄ and SiCl₄ with water); allotropes of carbon (general); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 5 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: svg 5 · table 23. Five SVGs (group 1 and group 13 trend plots from the stated data; hydration-enthalpy bars; group 14 E–E bond-enthalpy bars; Li–Mg and Be–Al diagonal relationships), 12 self-checks. Narration 6–78 words (mean 60), no symbols, formulae or unit abbreviations.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (513.7 kJ; 115 kJ; 27.8 e nm⁻¹; 45.2 %) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 14 · d2 27 · d3 19 · d4 2.
- **Competency:** recall 9 · understanding 22 · application 16 · analysis 14 · evaluation 1. Application or higher is **50% of items (45% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 62.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q008, q009, q020, q024 · B q042, q046, q049 · C (q054 or q055) · D q059.
- **Long (40 marks, 90 min):** A q007, q010, q011, q013, q014, q016, q018, q021, q026, q027 · B q044, q045, (q047 or q048), q051, (q052 or q053) · C q056, (q057 or q058) · D q060, q061.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (12 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 14/14 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer checked the group data against NCERT-style values.
2. **Fixes by the writer.** A “data:” phrase that read as a URL scheme was reworded, two difficulty-4 items were added and two narrations shortened. Stems avoid ch03’s periodic-trend set-ups.
3. **Formative assessment only (not in the annual theory paper), as the title slides say.**

## Known gaps
- Narration audio is not generated (TTS stage).

