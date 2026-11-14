# ISC Class 11 Chemistry, Chapter 24 — Aromatic Hydrocarbons: Benzene

`isc-11-chemistry-ch24` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); build script, test layout and final fixes by the subject-producer (Opus 5.5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (7 sections), 32 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch24_short` (20 marks, 50 min) and `t_isc11chem_ch24_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `decks.mjs`, `molkit.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch24/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Aromatic compounds: IUPAC nomenclature; structure of benzene, Kekule resonance structures; aromaticity; t02 Preparation of benzene from sodium benzoate and from phenol; physical properties; t03 Electrophilic substitution with mechanism: halogenation, nitration, sulphonation, Friedel-Crafts alkylation and acylation; t04 Directive influence of substituents in monosubstituted benzene (ortho/para and meta directors); t05 Oxidation, reaction with ozone, addition of hydrogen, chlorine and bromine; pyrolysis to biphenyl; carcinogenicity, toxicity and uses.
- IUPAC names of benzene derivatives (ortho, meta, para and numbering), the Kekulé structures, resonance and the orbital picture of benzene, the evidence for its structure and its resonance energy, aromaticity and Hückel’s rule, preparation from sodium benzoate and from phenol, physical properties, electrophilic substitution with the mechanism of nitration (halogenation, nitration, sulphonation, Friedel–Crafts alkylation and acylation), the directive influence of substituents (ortho/para and meta directors, activation and deactivation), oxidation and ozonolysis, addition of hydrogen and chlorine, pyrolysis to biphenyl, and the toxicity, carcinogenicity and uses of benzene.
- Facts a reviewer may wish to double-check: Benzene: all C–C 139 pm (C–C 154, C=C 134), C–H 109 pm, 120°, 12 σ bonds and 6 delocalised π electrons. Enthalpies of hydrogenation to cyclohexane: cyclohexene −120, cyclohexa-1,3-diene −232, cyclohexa-1,4-diene −240 (about; isolated C=C), benzene −208 kJ mol⁻¹, so the resonance energy is 152 kJ mol⁻¹ (the deck quotes "about 150"). Mononitration (approximate literature values): toluene o 58, m 4, p 38%; nitrobenzene o 6, m 93, p 1%. Melting and boiling points (°C): benzene 5.5 and 80.1, methylbenzene −95 and 110.6, cyclohexane 6.5 and 80.7; xylenes melt at −25 (o), −48 (m) and 13 (p). Density of benzene 0.879 g mL⁻¹. Nitration at 323–333 K; hydrogenation over Ni at 473 K; ozonolysis gives three glyoxal; pyrolysis gives biphenyl.

## Shape
- **Part 1, 17 slides:** naming monosubstituted benzenes; ortho, meta, para and numbering; structure of benzene: Kekulé structures and resonance; the delocalised π cloud of benzene; evidence for the structure and stability of benzene; resonance energy from hydrogenation data; worked example (resonance energy); aromaticity and Hückel's rule; worked example (using Hückel's rule); physical properties of benzene; preparation of benzene; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** mechanism of electrophilic substitution: nitration; halogenation and sulphonation; friedel–Crafts alkylation and acylation; the five electrophilic substitutions at a glance; worked example (yield of nitrobenzene); directive influence of substituents; why? Resonance and product distribution; worked example (predicting the products); oxidation and ozonolysis of benzene; addition and pyrolysis; hazards, precautions and uses; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 7 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 2 · svg 7 · table 19. SVGs: the Kekulé structures and the hybrid, the delocalised π cloud, the hydrogenation energy levels, the nitration mechanism with the arenium ion, the five substitutions at a glance, the directing effect as nitration product bars against the statistical 40 : 40 : 20, and addition and pyrolysis; rendered and checked by eye. Narration 11–82 words (mean 62), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d c b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (10.4 kJ; 19.7 g; 16.8 L) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 8 · d2 30 · d3 27 · d4 1.
- **Competency:** recall 8 · understanding 25 · application 22 · analysis 11. Application or higher is **50% of items (60% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 17 · t02 9 · t03 19 · t04 11 · t05 14.
- **Deck checks:** q003, q006, q007 (Part 1); q011, q016, q023 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q008, q013, q019, q025 · B q046, (q044 or q049) · C q051, (q054 or q057) · D q065.
- **Long (40 marks, 100 min):** A q002, q004, q005, q009, q010, q012, q014, q017, q018, q021, q026, q027 · B q042, q048, (q047 or q050) · C q052, q053, q059, (q055 or q058) · D q063, (q061 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (38 diagram self-checks (formulae and geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. The writer drafted the decks, notes, flashcards, SVGs and all 66 items but stopped (usage limit) before writing the build script; the producer wrote build.mjs (the two ISC tests, seed and provenance) and reviewed every item.
2. Producer review (2026-11-14): names, the Hückel and resonance-energy items, the mechanism items, every product prediction and every numerical re-solved (152 kJ mol⁻¹, 10.4 kJ, 19.7 g, 16.8 L twice, 12.9 g and 9.45 g in the deck).
3. Fixes: negative enthalpies were printed with a hyphen ("-120"); they now use a true minus sign. The 3-mark resonance-energy item repeated the deck’s worked example with the same data (the conjugated 1,3-diene); it now compares benzene with the non-conjugated cyclohexa-1,4-diene (stabilisation 0), so the item is new and makes the point about isolated double bonds. A notes sentence read "C₆H₅-ring C₆H₆"; it now reads C₆H₆.
4. Competency tags: four items that ask for standard equations or conditions (nitration, sulphonation, preparation from sodium benzoate, hydrogenation and chlorine addition) moved from application to understanding. Application or higher went from 56% to 50% of items.

## Known gaps
- Narration audio is not generated (TTS stage).
- Written by the writer and finished by the producer after the writer stopped; the deck and SVGs were rendered and spot-checked (mechanism and directing-effect diagrams) rather than re-laid.
