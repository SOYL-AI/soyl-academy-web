# ICSE Class 10 Chemistry, Chapter 1 — Periodic Table, Periodic Properties and Variations of Properties

`icse-10-chemistry-ch01` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 14 slides), notes (6 sections), 30 flashcards, 60 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch01_short` (20 marks, 30 min) and `t_icse10chem_ch01_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Modern periodic law; periodicity based on atomic number; groups and periods up to period 4 (calcium); t02 Explaining periodic trends with nuclear charge and number of shells; t03 Atomic size: definition and trends in groups and periods; t04 Metallic and non-metallic character: trends in groups and periods; t05 Ionisation potential, electron affinity and electronegativity: definitions and trends; t06 Trends in the alkali metal (group 1) and halogen (group 17) families.
- Removed topics are respected: Questions on elements beyond period 4 (calcium); the full table is shown for exposure only; Explanation of periodicity in terms of orbitals (shells only).
- Facts a reviewer may wish to double-check: Period 3 atomic radii (Na 186 … Cl 99 pm), ionic radii (Na⁺ about 102 pm, Cl⁻ about 181 pm) and first ionisation potentials of Li, Na, K (520, 496, 419 kJ mol⁻¹) are standard data-book values; chlorine’s electron affinity is stated to be slightly higher than fluorine’s.

## Shape
- **Part 1, 13 slides:** the modern periodic law; groups and periods; worked example (placing an element); what controls the trends: nuclear charge and shells; atomic size; worked example (comparing sizes); size of ions (a useful link); summary; exam tips; 3 checks.
- **Part 2, 14 slides:** metallic and non-metallic character; ionisation potential; electron affinity and electronegativity; worked example (ordering elements); group 1: the alkali metals; group 17: the halogens; worked example (predicting reactions); all the trends together; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · diagram 1 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 2 · table 17. Two SVGs: the first twenty elements in periods 1–4 (transition block shown as a gap) and trend arrows across a period and down a group. Narration 12–76 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (60)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b c d a) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 2 | 1 or 2 (17; 6) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 18 · d2 30 · d3 10 · d4 2.
- **Competency:** recall 12 · understanding 15 · application 26 · analysis 7. Application or higher is **55% of items (57% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 13 · t02 6 · t03 11 · t04 9 · t05 20 · t06 13.
- **Deck checks:** q001, q002, q015 (Part 1); q023, q028, q045 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q003, q011, q024, q046, q012, q006, q019, q051, q014 · B (q056 or q058).
- **Long (40 marks, 60 min):** A q004, q016, q029, q030, q032, q047, q035, q007, q020, q026, q040, q052, q037, q043 · B (q057 or q059 or q060).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 2/2 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own elements or data (argon before potassium, configuration 2, 8, 6, period 2 group 15 hydride, Mg/Al/Si/S radii, chlorine water on KI, bromine water on NaCl and NaI, elements 11, 16 and 19, …). No CBSE 10 or ISC 12 chapter covers periodic properties in this form.
2. **Fixes after the first build.** SVG labels below font size 10 were raised to 10; a third check slide was added to each deck; a match of configurations to positions and two short numericals were added to reach 60 items. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

