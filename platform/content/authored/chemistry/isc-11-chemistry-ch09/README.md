# ISC Class 11 Chemistry, Chapter 9 — Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding

`isc-11-chemistry-ch09` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5): one writer drafted the data, SVGs, decks and questions and was stopped by a usage limit; a second Sonnet writer kept that work and wrote the notes, flashcards and build; reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (6 sections), 32 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch09_short` (20 marks, 50 min) and `t_isc11chem_ch09_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Molecular orbital theory (qualitative) for homonuclear diatomic molecules from H2 to Ne2: bonding and antibonding orbitals, energy level diagrams, bond order; t02 Paramagnetism of O2; relative stabilities of O2, O2-, O2 2-, O2+ and of N2, N2+, N2-, N2 2-; t03 Coordinate (dative) bond: ammonium and hydronium ions, oxyacids of chlorine, nitric acid, ozone; t04 Resonance in ozone, carbon dioxide, carbonate ion and nitrate ion; t05 Hydrogen bonding: conditions, intermolecular (HF, water and ice, ethanol) and intramolecular.
- Qualitative MO theory for H₂ to Ne₂ with both energy orders (s–p mixing up to N₂, none for O₂ and F₂), bond order and magnetism, the O₂ and N₂ ion series; coordinate bonds in NH₄⁺, H₃O⁺, the chlorine oxyacids, HNO₃ and O₃; resonance in O₃, CO₂, CO₃²⁻ and NO₃⁻; inter- and intramolecular hydrogen bonding.
- Facts a reviewer may wish to double-check: MO fillings and bond orders are computed from electron counts in the build. Bond lengths (pm): H₂ 74, N₂ 110, O₂ 121, F₂ 142, O₂⁺ 112, O₂⁻ 128, O₂²⁻ 149; bond enthalpies (kJ mol⁻¹): H₂ 436, N₂ 946, O₂ 498, F₂ 159. Ozone O–O 128 pm and angle 117°; carbonate C–O 129 pm; CO₂ C=O 116 pm. Boiling points of group 16 hydrides H₂O 373, H₂S 213, H₂Se 232, H₂Te 271 K; ethanol 351 K, methoxymethane 249 K; ice 0.92 g cm⁻³.

## Shape
- **Part 1, 18 slides:** bonding and antibonding orbitals; the simplest cases: hydrogen and helium; bond order and what it tells us; two energy orders for the second-period diatomics; nitrogen: ten valence electrons, bond order three; worked example (diboron, B₂); oxygen: twelve valence electrons, two unpaired; homonuclear diatomic molecules from H₂ to Ne₂; bond order of the oxygen and nitrogen species; worked example (the superoxide ion, O₂⁻); why oxygen is attracted by a magnet; stability of N₂, N₂⁺, N₂⁻ and N₂²⁻; summary; exam tips; 3 checks.
- **Part 2, 18 slides:** the coordinate (dative) bond; oxyacids of chlorine; worked example (coordinate bonds in HClOₙ); nitric acid and ozone; resonance: more than one Lewis structure; carbonate and nitrate ions; worked example (bond order and charge in NO₃⁻ and CO₃²⁻); hydrogen bonding: conditions and strength; water and ice; boiling points of the hydrides; intermolecular and intramolecular hydrogen bonds; worked example (hydrogen bonds in a sample of ice); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 11 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: svg 15 · table 15. SVGs (15): MO shapes, MO diagrams for H₂, both energy orders, N₂ and O₂, the bond-order series, dative bonds in NH₄⁺ and H₃O⁺, the chlorine oxyacids, HNO₃ and O₃, resonance structures, hydrogen bonding in HF and water, the ice ring, o- against p-nitrophenol and hydride boiling points; all rendered and checked by eye. Narration 38–71 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c d a a b b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (1.5; 2; 1.33; 6 × 10²³) |
| short (2 marks) | 10 | 2 |
| short (3 marks) | 9 | 3 |
| long | 5 | 5, set in parts |

- **Difficulty:** d1 9 · d2 24 · d3 33 · d4 2.
- **Competency:** recall 4 · understanding 24 · application 32 · analysis 8. Application or higher is **59% of items (69% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 14 · t02 18 · t03 12 · t04 12 · t05 15.
- **Deck checks:** q003, q019, q014 (Part 1); q032, q044, q062 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q029, q040, q052, q038 · B q020, (q033 or q045) · C q023, (q035 or q058) · D q026.
- **Long (40 marks, 100 min):** A q002, q004, q009, q011, q028, q031, q042, q039, q050, q053, q049, q064 · B q022, q046, (q055 or q056) · C q024, q047, q036, (q034 or q059) · D q027, (q048 or q061).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (46 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 29/29 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. The producer re-solved every objective key (bond orders, unpaired electrons, coordinate-bond counts, resonance bond orders and charges, the hydrogen-bond count in ice): all correct; the assertion-reason keys are unambiguous.
2. Writer fixes: a numerical without an '= value' step, and a CO₂ bond length in the notes aligned with the diagram (116 pm).

## Known gaps
- Narration audio is not generated (TTS stage).

