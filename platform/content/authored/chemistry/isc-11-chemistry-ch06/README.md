# ISC Class 11 Chemistry, Chapter 6 — Classification of Elements and Periodicity in Properties

`isc-11-chemistry-ch06` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 18 slides), notes (7 sections), 32 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch06_short` (20 marks, 50 min) and `t_isc11chem_ch06_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Need for classification; Mendeleev's periodic law and table: merits and defects; modern periodic law; t02 Long form of the periodic table: groups and periods; s, p, d and f blocks; IUPAC numbering of groups 1-18; IUPAC names for elements with Z > 100; t03 Periodic trends in atomic and ionic radii and valence electrons; factors such as nuclear charge and shielding (screening); t04 Ionisation enthalpy, electron gain enthalpy and electronegativity: trends in groups and periods; metallic and non-metallic character; t05 Periodicity of valence and oxidation states; anomalous properties of second-period elements; diagonal relationship; acidic and basic nature of oxides.
- The syllabus places this unit under Inorganic Chemistry. Temporary IUPAC names for Z > 100 are taught as the syllabus asks (with the note that elements up to 118 now have permanent names).
- Facts a reviewer may wish to double-check: First ionisation enthalpies (kJ mol⁻¹): H 1312, He 2372, Li 520, Be 899, B 801, C 1086, N 1402, O 1314, F 1681, Ne 2081, Na 496, Mg 737, Al 577, Si 786, P 1012, S 999, Cl 1256, Ar 1520, K 419, Ca 590, Rb 403, Cs 376. Electron gain enthalpies: F −328, Cl −349, Br −325, I −295, O −141, S −200, Ne +116. Atomic radii (pm, metallic for metals): Li 152, Na 186, K 231, F 64, Cl 99, S 104; ionic radii Na⁺ 102, Mg²⁺ 72, O²⁻ 140, F⁻ 133, Cl⁻ 181. Pauling electronegativities as usual (F 4.0, O 3.5, N 3.0, Cl 3.0). Mendeleev's eka-aluminium 68 against gallium 69.7. The simple Z_eff = Z − inner electrons is labelled simplified.

## Shape
- **Part 1, 19 slides:** the need for classification; Mendeleev’s law; merits of Mendeleev’s table; defects of the table; the modern periodic law; the long form of the periodic table; blocks, groups and IUPAC numbering; worked example (position from the configuration); iUPAC names for elements with Z above 100; worked example (names from atomic numbers); atomic radius and its trends; nuclear charge, shielding and valence electrons; ionic radii: cations and anions; isoelectronic species; worked example (ordering ionic radii); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** ionisation enthalpy and what controls it; the pattern and its irregularities; worked example (successive ionisation enthalpies); electron gain enthalpy; electronegativity; worked example (bond polarity from electronegativity); metallic and non-metallic character; valence and oxidation states; anomalous behaviour of second-period elements; diagonal relationship; acidic and basic nature of oxides; worked example (an amphoteric oxide); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 17 · diagram 2 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: svg 11 · table 20. SVGs: the long-form periodic table with all 118 symbols by block, atomic radii across period 3 and down group 1, Z_eff bars for period 3, atom and ion sizes to scale, an isoelectronic series, first ionisation enthalpy across periods 2 and 3, electron gain enthalpy bars, the period-3 oxides and the diagonal pairs; all rendered and checked by eye. Narration 49–75 words (mean 59), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c a b d c; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (2.4 %; 133 pm; 73.7 kJ; 2 electrons; 7) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 10 · d2 43 · d3 12 · d4 3.
- **Competency:** recall 7 · understanding 27 · application 24 · analysis 10. Application or higher is **50% of items (56% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 9 · t02 13 · t03 14 · t04 16 · t05 16.
- **Deck checks:** q001, q016, q023 (Part 1); q037, q040, q053 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q003, q010, q038, q055, q028 · B q007, (q018 or q032) · C q050, (q034 or q064) · D q022.
- **Long (40 marks, 100 min):** A q002, q012, q014, q025, q026, q039, q041, q042, q054, q056, q044, q058 · B q019, q033, (q048 or q063) · C q008, q020, q051, (q065 or q035) · D q052, (q036 or q067).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (21 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 24/24 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. A long answer said both Be and Al are rendered passive by concentrated nitric acid; the passivity claim is removed, and the Be–Al similarities given are the amphoteric oxides and the covalent chlorides soluble in organic solvents.
2. An assertion-reason item paired 'S has a more negative electron gain enthalpy than O' with 'O is more electronegative', a borderline (b); the reason is now 'oxygen is diatomic, sulfur forms S₈ rings', which is true and clearly not the explanation, so (b) is unambiguous.
3. The producer re-solved every objective key and numerical: all correct.
4. Writer fixes: the IUPAC-name helper for 113 (ununtrium), a missing '= value' step, three items raised to d4 for the lint, a check key name and an Mg²⁻ typo in the notes.

## Known gaps
- Narration audio is not generated (TTS stage).

