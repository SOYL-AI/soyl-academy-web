# CBSE Class 11 Chemistry, Chapter 9 — Hydrocarbons

`cbse-11-chemistry-ch09` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (23 + 23 slides), notes (7 sections), 32 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch09_short` (20 marks, 40 min) and `t_cbse11chem_ch09_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 4 syllabus topics are covered: t01 Alkanes: nomenclature, isomerism, conformations, properties; t02 Alkenes: structure, isomerism, preparation and reactions; t03 Alkynes: preparation and reactions; t04 Aromatic hydrocarbons: benzene, aromaticity, electrophilic substitution.

- Facts a reviewer may wish to double-check: Ethane torsional barrier about 12.5 kJ mol⁻¹; bond lengths and enthalpies as in ch04 and ch08; boiling points of C1–C5 alkanes and pentane isomers; cis/trans but-2-ene bp 277/274 K and mp 134/168 K; approximate pKa of ethyne 25, ethene 44, ethane 50; benzene resonance energy about 150 kJ mol⁻¹ (from −119.5 and −208.4 kJ mol⁻¹, given); toluene nitration about 58 % ortho, 4 % meta, 38 % para (approximate); reagents and conditions for controlled oxidation, aromatisation and nitration; benzene and benzpyrene toxicity at textbook level. Chlorination selectivity (tertiary H 5.0 times primary) is labelled given.

## Shape
- **Part 1, 23 slides:** families of hydrocarbons; naming alkanes and chain isomerism; worked example (naming and counting isomers); preparation of alkanes; physical properties of alkanes; chemical properties of alkanes; halogenation: a free-radical chain; conformations of ethane; energy and torsional strain; worked example (how often is ethane eclipsed?); alkenes: structure and geometric isomerism; preparation of alkenes; markovnikov addition: the carbocation path; why the secondary carbocation wins; peroxide effect and other additions; ozonolysis, Baeyer’s test and polymerisation; worked example (identify the alkene); summary; exam tips; 3 checks.
- **Part 2, 23 slides:** alkynes: structure; acidity of terminal alkynes; preparation of alkynes; addition reactions of alkynes; worked example (predict the products); cyclic polymerisation and combustion; benzene: Kekulé structures and resonance; the π cloud of benzene; resonance energy: how stable is benzene?; aromaticity and the Hückel rule; preparation of benzene; electrophiles for substitution; mechanism of electrophilic substitution; worked example (two substitutions); directive influence of substituents; worked example (reading isomer data); carcinogenicity and toxicity; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 21 · diagram 7 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · svg 9 · table 26. Eight SVGs (Newman and sawhorse projections; energy against dihedral angle computed from E = 6.25(1 + cos 3θ); cis and trans but-2-ene; HBr addition to propene with curly arrows; carbocation energy profile; benzene Kekulé structures and hybrid; π cloud; electrophilic substitution mechanism), 9 self-checks. Narration 10–78 words (mean 60), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 7 | 1–3 (6; 22 g; 6.4; 150.1 kJ mol⁻¹; 35.7 %; 5.8 g; 1.12 dm³) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 6 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 11 · d2 32 · d3 23 · d4 2.
- **Competency:** recall 7 · understanding 19 · application 33 · analysis 9. Application or higher is **62% of items (64% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 21 · t02 21 · t03 11 · t04 17.
- **Deck checks:** q008, q007, q015 (Part 1); q019, q024, q025 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q001, q011, q020, q026 · B q047, q048, q054 · C (q060 or q061) · D q065.
- **Long (40 marks, 90 min):** A q002, q003, q009, q013, q017, q021, q022, q023, q028, q029 · B q049, q050, (q051 or q052), q055, (q056 or q057) · C q062, (q063 or q064) · D q066, q067.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (9 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 17/17 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet), who rendered every SVG and fixed label overlaps; the producer reviewed mechanisms, named compounds and data.
2. **Fixes by the writer.** A KaTeX strict error, a three-quarter-mark scheme step and two short model answers were corrected; CBSE 12 haloalkane and aldehyde set-ups were avoided.
3. **Ozonolysis structure problems, molar masses and Hückel electron counts are computed and asserted. Equations with double or triple bonds in mhchem are skipped by the pipeline balance checker, so they were balanced by hand and reviewed.**

## Known gaps
- Narration audio is not generated (TTS stage).

