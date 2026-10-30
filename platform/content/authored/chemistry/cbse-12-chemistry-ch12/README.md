# CBSE Class 12 Chemistry, Chapter 12 — General Principles and Processes of Isolation of Elements (formative assessment only)

`cbse-12-chemistry-ch12` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

The syllabus marks this chapter `board_assessed: false` (formative assessment only). It is authored to the same standard as the board chapters so that schools can use it for periodic tests; the title slide says it is not in the board exam.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 17 slides), notes (5 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch12_short` (20 marks, 40 min) and `t_cbse12chem_ch12_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch12/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- The single syllabus topic (t01: concentration, oxidation, reduction and refining) is covered in full, so every item carries t01.
- Minerals, ores, gangue; ores of Al, Fe, Cu, Zn; concentration (hydraulic washing, magnetic separation, froth flotation with collectors, frothers and depressants, leaching of bauxite and of gold/silver); calcination and roasting; flux and slag; thermodynamic principles (ΔG = ΔH − TΔS, coupled reactions) and the Ellingham diagram; blast furnace and the forms of iron; copper (matte, converter, self-reduction, blister copper); zinc; electrochemical principles (ΔG° = −nFE°) and the Hall–Héroult process; chlorine by oxidation; refining (distillation, liquation, electrolytic, zone refining, Mond and van Arkel methods, chromatography); uses of Al, Cu, Zn and Fe.
- Facts a reviewer may wish to double-check: the Ellingham lines are **approximate linear fits** (ΔG° per mol O₂: 2C→2CO −223 − 0.175T; 2CO→2CO₂ −564 + 0.173T; 2Fe→2FeO −527 + 0.13T; 2Zn→2ZnO −700 + 0.20T with a kink at 1180 K; 4/3Al → 2/3Al₂O₃ −1120 + 0.21T, kJ), labelled illustrative on the plot; the case and numerical data are taken from these lines. Blast-furnace zone temperatures and the Mond process temperatures (330 K, 450–470 K) follow common textbook ranges.

## Shape
- **Part 1, 14 slides:** steps of metallurgy; minerals, ores and gangue; hydraulic washing and magnetic separation; froth flotation (diagram); leaching (Bayer and cyanide processes); worked example (choosing a concentration method); calcination and roasting; worked example (SO₂ from roasting 194 kg ZnS); flux and slag; summary; exam tips.
- **Part 2, 17 slides:** reduction overview; thermodynamics of reduction; Ellingham diagram (plot); worked example (reading the diagram); iron; copper and zinc; electrochemical principles and aluminium; worked example (100 A for 1 h gives 33.6 g Al); chlorine by oxidation; distillation, liquation and electrolytic refining; zone and vapour phase refining (diagram); chromatography and uses; summary; exam tips.
- Layouts: title 2, concept 12, diagram 3, example 4, check 6, summary 2, exam-tips 2.
- **Visuals in decks:** table 19, flow 3, svg 2, plot 1 (no gap longer than one slide). **Diagrams (2 hand-written SVGs):** froth flotation cell; zone refining of a rod.
- **Narration:** 12–77 words (mean 54); no formulae or symbols.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c a d a) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1 or 2 (1.28 t SO₂; 560 kg Fe; ΔG° −62 kJ; 56.0 g Al; 6.35 g Cu; E° −2.0 V) |
| short | 9 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 13 · d2 26 · d3 24 · d4 3.
- **Competency:** recall 8 · understanding 27 · application 25 · analysis 6. Application or higher is **47% of items (49% of marks)**, inside the 45–65% band.
- **Cases:** an aluminium plant in Odisha (red mud, 50.4 kg Al per cell-hour at 150 kA, role of cryolite or why smelters sit near hydro power); a copper smelter in Jharkhand (FeSiO₃ slag, 3.175 kg Cu, converter reactions or anode mud); Ellingham data at 800 K and 1500 K (CO vs C for FeO, ΔG° −154 kJ, Al₂O₃ not reducible, slopes); cyanide leaching of low-grade gold in Karnataka (role of air, 0.825 g Zn, why leaching, displacement).
- **Deck checks:** q001, q002, q003 (Part 1); q022, q040, q049 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q004, q005, q026 (MCQ), q012 (A-R) · B q016, q021 (2 marks), q017 (3 marks) · C q039 or q060 · D q064.
- **Long (40 marks, 90 min):** A q006, q007, q023, q025, q034, q042, q050, q051 (MCQ), q028, q054 (A-R) · B q031, q047, (q055 or q057), q032, (q038 or q048) · C q061 + (q062 or q059) · D q063, q065.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; every numerical re-solved by the build.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Balance checker quirk.** The pipeline’s balance checker misreads a bracketed complex followed by a charge (`[Zn(CN)4]^2-`) and reported the (balanced) zinc–gold displacement as unbalanced. The complex is written `Zn(CN)4^2-` (no square brackets) inside `\ce{}`; the equation is unchanged. Noted for the pipeline owner in the handoff.
2. **Hydrate equations.** Equations with an unspecified “x H₂O” were replaced by definite hydrates (Al₂O₃·3H₂O, Al₂O₃·2H₂O) so that they balance.
3. **Assertion–reason.** A draft A-R item claimed pine oil is the collector (it is the frother, as the deck says); it was rewritten.
4. **Avoiding a repeat.** The aluminium numerical first used the same charge as the deck’s worked example (360 000 C); it now uses 250 A for 40 minutes (56.0 g).
5. **Word limits and numeric steps.** Five model answers were tightened to their word bands; two solutions gained explicit unit-conversion “=” steps.
6. **Originality.** All data (194 kg and 1.94 t ZnS, 80% haematite ore, Odisha and Jharkhand plants, 5 g/t gold ore) are fresh; no textbook or sample-paper wording.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- The Ellingham plot is schematic (approximate straight-line fits), as its caption says.
