# ISC Class 12 Chemistry, Chapter 2 — Colligative Properties

`isc-12-chemistry-ch02` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (5 sections), 31 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch02_short` (20 marks, 50 min) and `t_isc12chem_ch02_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All five syllabus topics are covered: t01 relative lowering of vapour pressure and molar mass; t02 elevation of boiling point **with derivation**; t03 depression of freezing point **with derivation**; t04 osmosis and osmotic pressure — diffusion vs osmosis, semipermeable membranes, reverse osmosis, isotonic/hypotonic/hypertonic solutions and the **van’t Hoff–Boyle, Charles and Avogadro laws**; t05 abnormal molar masses, the van’t Hoff factor and degrees of dissociation and association.
- Removed topic respected: no experimental details of colligative measurements (the Rast method appears only as a calculation context).
- ISC-specific content beyond the CBSE treatment (derivations of ΔTb = Kb m and ΔTf = Kf m, the three van’t Hoff laws, diffusion vs osmosis) has its own slides, notes and questions.
- Facts a reviewer may wish to double-check: Kb (water 0.52, benzene 2.53, chloroform 3.63) and Kf (water 1.86, benzene 5.12, chloroform 4.79, camphor 37.7 K kg mol⁻¹); 0.9% NaCl isotonic with blood; the vapour-pressure plots near Tb and Tf are illustrative.

## Shape
- **Part 1, 16 slides:** colligative properties; vapour-pressure lowering (diagram); relative lowering and molar mass; worked example (M = 200 from benzene data); boiling point (plot); derivation of ΔTb = Kb m; worked example (M = 120); freezing point (plot); depression of freezing point and Kf; worked example (775 g glycol for −9.3 °C); summary; exam tips; three checks.
- **Part 2, 15 slides:** diffusion vs osmosis; osmotic pressure (diagram); van’t Hoff laws and π = CRT; worked example (enzyme of about 6.0 × 10⁴ g/mol); isotonic solutions and reverse osmosis (diagram); abnormal molar masses; van’t Hoff factor; worked examples (K₂SO₄, α ≈ 0.66; benzoic acid dimer, about 91%); summary; exam tips; three checks.
- Layouts: title 2 · concept 9 · diagram 4 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · flow 3 · plot 2 · svg 3 · table 16. SVGs (from the CBSE 12 ch01 set): vapour-pressure lowering, osmosis U-tube, reverse osmosis. Narration 12–75 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b d c a) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 7 | 1 or 2 (p = 3.56 kPa; ΔTb = 0.052 K; Kb = 2.4; M = 180; π = 1.23 atm; M = 1.0 × 10⁵; α = 0.75) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 9 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 17 · d2 31 · d3 16 · d4 1.
- **Competency:** recall 5 · understanding 19 · application 37 · analysis 4. Application or higher is **63% of items (71% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 10 · t02 14 · t03 11 · t04 19 · t05 16.
- **Deck checks:** q001, q024, q011 (Part 1); q034, q035, q053 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q012, q026, q036, q004 · B q007, (q020 or q048) · C q009, (q022 or q062) · D q052.
- **Long (40 marks, 100 min):** A q003, q013, q014, q025, q027, q037, q038, q039, q054, q055, q016, q044 · B q021, q030, (q047 or q061) · C q031, q032, q051, (q063 or q064) · D q023, (q033 or q065).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Arithmetic lint.** The lint read the symbol π in “π = 0.10 × 0.0821 × 300” as 3.14159 and flagged the equation; the two calculations now say “osmotic pressure =”.
2. **Bracket–charge quirk.** The model answer for K₄[Fe(CN)₆] writes the complex ion as Fe(CN)₆⁴⁻ inside \ce{} so that the pipeline balance checker (known caret-charge issue, logged by the Lead) reads it correctly.
3. **Originality.** CBSE 12 ch01 covers the same ideas, so every stem and data set here is new (e.g. a first-to-freeze item instead of a lowest-freezing item, raisins instead of a red blood cell); the originality gate reports 0 duplicates.
4. **Specific stems.** Short, generic stems (e.g. a bare “Match each … with …” or “Which of these is …”) were rewritten to name this chapter’s substances or situation, so they cannot collide with other chapters in the growing bank.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

