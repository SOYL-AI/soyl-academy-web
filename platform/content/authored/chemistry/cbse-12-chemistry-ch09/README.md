# CBSE Class 12 Chemistry, Chapter 9 — Amines

`cbse-12-chemistry-ch09` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 16 slides), notes (5 sections), 30 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch09_short` (20 marks, 40 min) and `t_cbse12chem_ch09_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed topics.
- Classification (1°, 2°, 3° by groups on N), pyramidal structure, IUPAC names; preparation (reduction of nitro compounds with H₂/Ni or Fe/HCl, ammonolysis, nitrile and amide reduction, Gabriel phthalimide synthesis, Hoffmann bromamide degradation); physical properties; basicity (+I, solvation and steric effects, pKb table, resonance in aniline, substituent effects); reactions (salt formation, alkylation, acylation, carbylamine test, nitrous acid, Hinsberg test, bromination, protected nitration, sulphonation, no Friedel–Crafts); diazonium salts (preparation at 273–278 K, Sandmeyer and Gattermann, KI, Balz–Schiemann, H₃PO₂, hydrolysis to phenol, azo coupling).
- Facts a reviewer may wish to double-check: pKb values in the basicity table; boiling points of the C₃H₉N isomers (propan-1-amine 321 K, N-methylethanamine 310 K, trimethylamine 276 K); the Hoffmann equation (balanced with 4 NaOH).

## Shape
- **Part 1 (t01–t03), 18 slides:** naming; pyramidal structure (diagram); worked example (classify and name); reduction; ammonolysis and Gabriel; Hoffmann; worked example (choosing a preparation); physical properties; basicity; solvation and steric effects; why aniline is a weak base (resonance diagram); worked example (ranking basic strength); summary; exam tips.
- **Part 2 (t04–t05), 16 slides:** salts, alkylation, acylation; carbylamine and nitrous acid; Hinsberg test; worked example (identifying an amine); substitution in aniline; worked example (making 4-bromoaniline); diazonium salts; replacement reactions; coupling and uses; worked example (synthesis via diazonium salts); summary; exam tips.
- Layouts: title 2, concept 13, diagram 3, example 6, check 6, summary 2, exam-tips 2.
- **Visuals in decks:** table 20, flow 6, svg 2 (no gap longer than one slide). **Diagrams (2 hand-written SVGs):** pyramidal amine with lone pair; resonance delocalisation of the aniline lone pair.
- **Narration:** 13–73 words (mean 52); no formulae or symbols.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys a c a a d a c) |
| true-false | 2 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1 or 2 (9.3 g aniline; 3.1 g methanamine; Kb 4.17 × 10⁻⁴; 6.48 g anilinium chloride; 4.8 g Br₂ for tribromination; 0.224 L N₂ at STP) |
| short | 8 + 4 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 8 · d2 31 · d3 21 · d4 5.
- **Competency:** recall 5 · understanding 29 · application 26 · analysis 5. Application or higher is **48% of items (55% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 7 · t02 12 · t03 15 · t04 21 · t05 16.
- **Cases:** an orange azo dye made in a textile unit (diazotisation, yield, failed cooling or why alkaline coupling); three C₄H₁₁N unknowns from carbylamine/Hinsberg/HCl results; lemon juice on fish (amine smell and salt formation); paracetamol from 4-aminophenol.
- **Deck checks:** q001, q007, q017 (Part 1); q029, q032, q044 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q002, q006, q028 (MCQ), q020 (A-R) · B q015, q040 (2 marks), q027 (3 marks) · C q057 or q058 · D q062.
- **Long (40 marks, 90 min):** A q003, q008, q016, q018, q030, q031, q033, q045 (MCQ), q011, q036 (A-R) · B q041, q054, (q042 or q026), q056, (q043 or q055) · C q059 + (q060 or q061) · D q063, q064.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 7/7 scripted re-solves pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Count and competency.** The first build had 59 questions and 41% application-or-higher. Six application items were added (bromoethane → propan-1-amine route, benzylamine vs aniline basicity, anilinium chloride mass, separating aniline from nitrobenzene, a Hinsberg-based identification, aniline → benzoic acid), and the pKb → Kb calculation was retagged application. Final 65 questions, 48%.
2. **Word limit.** The long answer on tests for amines was 153 words; it was tightened to the 80–120 band.
3. **Originality.** The naming match uses its own stem ("Match each amine with its IUPAC name.") after the ch08 bank-duplicate finding. All examples and data (Surat dye unit, Kerala fish case, paracetamol yields) are fresh; no textbook or sample-paper wording.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
