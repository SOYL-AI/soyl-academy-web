# CBSE Class 12 Chemistry, Chapter 1 — Solutions

`cbse-12-chemistry-ch01` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (24 + 23 slides), notes (6 sections), 32 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch01_short` (20 marks, 40 min) and `t_cbse12chem_ch01_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (builder adapted from `cbse-10-science-ch06/src/lib.mjs`: slides, balanced MCQ keys, case parts with `alternatives`, tests on the CBSE 12 default blueprints, validator, re-solve harness, pipeline-lint call with family `chemistry`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). The gate reads only the three files at the chapter root. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed topics.
- Concentration: mass %, volume %, mass by volume %, ppm, mole fraction, molarity, molality (and which are temperature-independent). Solubility of solids (like dissolves like, temperature by Le Chatelier) and gases (Henry’s law, temperature and pressure; bends, anoxia, carbonated drinks). Raoult’s law for volatile liquids and for non-volatile solutes, Raoult as a special case of Henry, ideal and non-ideal solutions, positive and negative deviation with signs of the enthalpy and volume of mixing, minimum- and maximum-boiling azeotropes. The four colligative properties with molar-mass determination; osmosis, isotonic/hypertonic/hypotonic, reverse osmosis; abnormal molar masses and the van’t Hoff factor for dissociation and association.
- Kept to Class 12 board depth: no derivation of ΔTb = Kb m from thermodynamics; no phase diagrams beyond the vapour-pressure–temperature sketch.
- Data a reviewer may wish to double-check: Henry’s constants in water (He 144.97, N₂ 76.48, O₂ 34.86 kbar at 293 K; CO₂ 1.67 kbar at 298 K), Kb/Kf of water (0.52 / 1.86) and benzene (2.53 / 5.12) K kg mol⁻¹, R = 0.083 L bar K⁻¹ mol⁻¹, vapour pressure of water 3.17 kPa at 298 K, hexane 20.2 kPa and heptane 6.1 kPa at 298 K, azeotropes ethanol–water (about 95% ethanol by volume, about 351 K) and nitric acid–water (about 68% by mass, about 393.5 K). The three-mixture vapour-pressure table in the distillation case and the plotted curves are labelled illustrative.

## Shape
- **Part 1 (t01–t03), 24 slides:** types of solution; mass/volume/ppm; mole fraction, molarity, molality; worked examples (glucose molality and mole fraction; 20% NaOH, density 1.2 → 6.0 M and 6.25 m); solubility of solids; Henry diagram; Henry’s law with K_H table; worked example (CO₂ in a soda bottle ≈ 1.8 g); daily-life applications; Raoult’s law; Raoult plot; worked example (hexane + heptane, vapour 0.525 hexane); Raoult vs Henry; ideal vs non-ideal; deviation plot; azeotropes; worked example (deviation from data); summary; exam tips.
- **Part 2 (t04–t05), 23 slides:** colligative idea; vapour-pressure lowering diagram; relative lowering; worked example (urea, 3.11 kPa); boiling-point plot; ΔTb; worked example (glucose, 373.41 K); ΔTf and uses; worked example (antifreeze, about 800 g); osmosis diagram; π = CRT and molar mass; worked example (protein, 4.0 × 10⁴ g mol⁻¹); isotonic and reverse osmosis (diagram); abnormal molar mass; van’t Hoff factor; worked examples (MgCl₂ α ≈ 0.85; ethanoic acid 90% dimerised); summary; exam tips.
- Layouts: title 2, concept 17, diagram 6, two-column 1, example 11, check 6, summary 2, exam-tips 2.
- **Visuals in decks (41 of 47 slides; no gap longer than one slide):** table 27, flow 6, svg 4, plot 3, chem 1.
- **Diagrams (4 hand-written SVGs):** Henry’s law (two cylinders, low and high gas pressure); vapour-pressure lowering (pure solvent vs solution surface); osmosis U-tube with membrane and height h; reverse osmosis tank with piston. Plots: ideal Raoult lines, positive/negative deviation curves, vapour pressure against temperature for water and a solution. Named hue: blue for liquids only, always with text labels.
- **Narration:** 24–75 words (mean 61); numbers spoken as words, no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; placed by seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d c a) |
| true-false | 3 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1 or 2 (molarity 0.4 M; molality 0.5 m; CO₂ pressure 1.67 bar; Raoult total 70 kPa; ΔTb 0.104 K; molar mass 250 g/mol; π 0.498 bar; i = 1.87) |
| short | 8 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` is set on prose short/long items and left off calculation items.
- **Difficulty:** d1 11 · d2 31 · d3 20 · d4 6.
- **Competency:** recall 10 · understanding 26 · application 26 · analysis 5 · evaluation 1. Application or higher is **47% of items (61% of marks)**, inside the 45–65% lint band.
- **Topic tags:** t01 14 · t02 11 · t03 15 · t04 20 · t05 13.
- **Cases:** coolant chart in a Shimla service centre (freezing point of a 750 g mixture; evaluate salt as antifreeze or compute the summer boiling point); reverse-osmosis plant near Chennai (π ≈ 30 bar; why 60 bar, or what happens at 10 bar); three lab mixtures vs Raoult predictions (ideal / negative / positive; azeotrope or mixing signs); diving in the Andamans (nitrogen ×3 at 20 m; bends or helium).
- **Deck checks:** q001, q015, q025 (Part 1); q038, q039, q053 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q004, q026, q040 (MCQ), q019 (A-R) · B q012, q058 (2 marks), q036 (3 marks) · C q060 or q064 · D q065.
- **Long (40 marks, 90 min):** A q003, q005, q016, q017, q028, q041, q054, q055 (MCQ), q042, q030 (A-R) · B q011, q022, (q035 or q049), q013, (q051 or q059) · C q062 + (q063 or q061) · D q066, q067.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); 8 SVG visuals / 4 distinct diagrams pass the allow-list; narration ≤ 75 words with no symbols; check slides all objective; 27/27 scripted re-solves pass (every numerical, numeric MCQ, case data and the numbers inside short/long model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem; distractors were checked to be the result of a named slip. Findings and fixes:
1. **Competency band.** The first build had 43% of items at application or higher. Two MCQs that ask students to infer the deviation from observations (warming and contraction on mixing) and the vapour composition from volatility were retagged application, and a recall MCQ on the van’t Hoff factor of a dimer was rewritten into a data item (observed molar mass twice the formula value → i = 0.5, dimerisation, not ions in benzene). Final 47%.
2. **Numeric key derivation.** A case part reached −22.5 °C only through ≈ steps, which the verify stage reads as "key stated but not computed"; the solution now has an explicit `= 0 − 22.5 = −22.5` step.
3. **Originality.** Numerical data were chosen fresh (e.g. 15% urea fertiliser, sulfur as S₈ from a freezing-point depression, 2.44 g benzoic acid 80% dimerised, normal saline vs glucose isotonic) rather than the textbook’s worked problems; no NCERT or sample-paper wording was used.
4. **Diagrams.** Label overlaps found on a coordinate review were fixed (vapour-pressure captions split into two lines; reverse-osmosis labels moved; push arrow moved over the right-hand piston).

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
