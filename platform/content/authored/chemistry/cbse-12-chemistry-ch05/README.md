# CBSE Class 12 Chemistry, Chapter 5 — Coordination Compounds

`cbse-12-chemistry-ch05` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (21 + 19 slides), notes (5 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch05_short` (20 marks, 40 min) and `t_cbse12chem_ch05_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (same builder as ch01, copied so the folder is self-contained), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch05/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed topics.
- Double salts vs complexes; Werner’s primary and secondary valency with AgNO₃ precipitation data; ligand, coordination number, coordination sphere, counter ion, polyhedron, homoleptic/heteroleptic; denticity, chelates, ambidentate ligands; IUPAC 2005 naming (chlorido, cyanido, ammine, aqua, carbonyl; -ate for anionic complexes; bis/tris); structural isomerism (ionisation, linkage, coordination, solvate) and stereoisomerism (cis/trans, fac/mer, optical); VBT (sp³, dsp², d²sp³, sp³d², inner/outer orbital) with magnetic moments; CFT (octahedral and tetrahedral splitting, Δt ≈ 4/9 Δo, spectrochemical series, high/low spin, colour, limitations); metal carbonyls and synergic bonding; applications.
- Kept to Class 12 board depth: no CFSE arithmetic beyond t₂g/e_g configurations; no MO theory.
- Facts a reviewer may wish to double-check: the spectrochemical series as printed; [Ti(H₂O)₆]³⁺ absorbs about 498 nm and appears violet; [Ni(H₂O)₆]²⁺ green, [Ni(en)₃]²⁺ violet; shapes of Ni(CO)₄, Fe(CO)₅, Cr(CO)₆; Mond process temperatures (about 330–350 K formation, 450–470 K decomposition); hydrate isomer colours (violet and grey-green); all IUPAC names listed in the bank. The hardness-titration data and the nickel colour sequence are illustrative.

## Shape
- **Part 1 (t01–t03), 21 slides:** double salts vs complexes; Werner’s theory with the cobalt–ammonia series; worked example (PtCl₄·5NH₃ giving 3 AgCl → [PtCl(NH₃)₅]Cl₃); terms; ligands and denticity; chelate ring (diagram); worked example (oxidation number and CN for K₃[Fe(C₂O₄)₃] and [CoCl₂(en)₂]Cl); naming rules; ligand names; worked examples (five names; three formulas); isomerism tree; structural isomers; geometrical isomers (diagram); optical isomers; summary; exam tips.
- **Part 2 (t04–t05), 19 slides:** VBT hybridisation table; worked examples ([Co(NH₃)₆]³⁺ vs [CoF₆]³⁻; [Ni(CN)₄]²⁻ vs [NiCl₄]²⁻); VBT limitations; CFT splitting (diagram); spectrochemical series and Δo vs P; worked example ([Fe(H₂O)₆]²⁺ vs [Fe(CN)₆]⁴⁻); tetrahedral complexes; colour; CFT limitations; metal carbonyls; synergic bonding (diagram); uses; summary; exam tips.
- Layouts: title 2, concept 17, diagram 4, example 7, check 6, summary 2, exam-tips 2.
- **Visuals in decks (34 of 40 slides; no gap longer than one slide):** table 26, flow 4, svg 4.
- **Diagrams (4 hand-written SVGs):** chelate ring of ethane-1,2-diamine vs two ammonia ligands; cis/trans isomers of square planar [PtCl₂(NH₃)₂] and octahedral [CoCl₂(NH₃)₄]⁺; octahedral and tetrahedral d-orbital splitting with the 0.6/0.4 barycentre and Δt ≈ 4/9 Δo; synergic σ/π bonding in M–CO. Named hues: green for chlorido, blue for nitrogen donors, always with text labels.
- **Narration:** 14–72 words (mean 57); no formulae ("vitamin B twelve", ligands named in words).

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a a a b c d) |
| true-false | 3 | 1 |
| fill-blank | 1 | 1 |
| match | 3 | 2 |
| numerical | 6 | 1 or 2 (0.020 mol AgCl; Co +3; 3 stereoisomers; μ 3.87 BM; 2 unpaired electrons; Δt 8000 cm⁻¹) |
| short | 7 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 11 · d2 25 · d3 25 · d4 5.
- **Competency:** recall 11 · understanding 22 · application 29 · analysis 4. Application or higher is **50% of items (60% of marks)**, inside the 45–65% lint band. Naming and formula-writing for compounds not used in the decks are tagged application.
- **Topic tags:** t01 15 · t02 10 · t03 12 · t04 24 · t05 12.
- **Cases:** EDTA hardness titration in Bengaluru (chelate stability; 240 ppm; evaluate ammonia instead, or why pH 10); cisplatin (formula; geometrical isomerism; why only cis binds DNA, or VBT of a 5d⁸ square planar complex); nickel complexes changing colour with ligand (spectrochemical order; two unpaired electrons; why the colour shifts, or evaluate a diamagnetism claim); the Mond process (Ni(0); 11.2 g CO for 5.87 g Ni; synergic bonding, or VBT shape and magnetism).
- **Deck checks:** q001, q014, q021 (Part 1); q031, q032, q052 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q002, q015, q033 (MCQ), q026 (A-R) · B q012, q048 (2 marks), q019 (3 marks) · C q060 or q059 · D q063.
- **Long (40 marks, 90 min):** A q003, q004, q016, q022, q024, q034, q036, q053 (MCQ), q006, q042 (A-R) · B q020, q056, (q029 or q049), q013, (q050 or q051) · C q061 + (q058 or q062) · D q064, q065.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); 8 SVG visuals / 4 distinct diagrams pass the allow-list (all text ≥ 10 px); narration ≤ 72 words with no symbols; check slides all objective; 12/12 scripted re-solves pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem; every IUPAC name was rebuilt from the rules (alphabetical ligands ignoring prefixes, -ate for anions, oxidation state from charge balance) and every hybridisation from the ion’s d count. Findings and fixes:
1. **Lint on first build.** Labels such as "[PtCl₂(NH₃)₂]: square planar" and a flashcard "[MA₃B₃]: three A …" were read as Markdown link-reference definitions; reworded. A narration said "vitamin B12", which reads as a formula; now "vitamin B twelve".
2. **Legibility.** SVG atom labels at 8–9 px were raised to 10 px.
3. **Word limits.** The three-formula Werner item is list-style and has no word limit.
4. **Originality.** Precipitation data use the platinum(IV)–ammonia series rather than the textbook’s chromium example; hardness, cisplatin, nickel-colour and Mond-process cases are written fresh.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
