# CBSE Class 12 Chemistry, Chapter 2 — Electrochemistry

`cbse-12-chemistry-ch02` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (22 + 23 slides), notes (6 sections), 32 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch02_short` (20 marks, 40 min) and `t_cbse12chem_ch02_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (same builder as ch01, copied so the folder is self-contained), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are covered; the chapter has no removed topics.
- Galvanic vs electrolytic cells, Daniell cell and salt bridge, cell notation, SHE and the electrochemical series, E°cell and feasibility; Nernst equation for electrodes and cells (including pH from a hydrogen electrode), ΔG° = −nFE°, E° = (0.059/n) log K; conductance, conductivity, cell constant, molar conductivity and its variation, Kohlrausch’s law and its uses (Λ° of weak electrolytes, α, Ka); Faraday’s laws and products of electrolysis (molten and aqueous NaCl, H₂SO₄, CuSO₄ with Pt or Cu electrodes, overpotential); dry cell, mercury cell, lead storage battery, Ni–Cd, H₂–O₂ fuel cell; corrosion as an electrochemical process and its prevention.
- Data a reviewer may wish to double-check: E° values (F₂ +2.87, Cl₂ +1.36, Ag⁺ +0.80, Cu²⁺ +0.34, Pb²⁺ −0.13, Sn²⁺ −0.14, Ni²⁺ −0.25, Fe²⁺ −0.44, Zn²⁺ −0.76, Al³⁺ −1.66, Mg²⁺ −2.37, Li⁺ −3.05 V; water reduction −0.83 V), λ° values (H⁺ 349.6, OH⁻ 199.1, Na⁺ 50.1, K⁺ 73.5, NH₄⁺ 73.5, Cl⁻ 76.3, HCOO⁻ 54.6, CH₃COO⁻ 40.9, Ca²⁺ 119.0, SO₄²⁻ 160.0 S cm² mol⁻¹), F = 96500 C mol⁻¹, 2.303RT/F = 0.059 V. The Λm–√c curves and the hydrometer densities in the solar-lamp case are illustrative.

## Shape
- **Part 1 (t01–t02), 22 slides:** two kinds of cell; Daniell cell diagram; half-cells and salt bridge; cell notation; SHE (diagram) and electrode potential; electrochemical series; worked examples (Mg–Ag 3.17 V; nickel spatula in silver nitrate 1.05 V); predictions; Nernst for electrodes and cells; worked examples (Daniell at 0.01 M Zn²⁺ 1.159 V; pH 3 from −0.177 V); ΔG° and K; worked example (Daniell ΔG° −212.3 kJ mol⁻¹, K ≈ 1.9 × 10³⁷); summary; exam tips.
- **Part 2 (t03–t06), 23 slides:** resistance to conductivity; cell constant; molar conductivity; worked example (κ 2.5 × 10⁻³, Λm 125); Λm–√c plot; Kohlrausch’s law with λ° table; worked examples (Λ°(NH₄OH) 272.6; methanoic acid α 0.082, Ka 1.8 × 10⁻⁴); electrolysis (diagram); Faraday’s laws; worked example (silver plating 1.08 g); products of electrolysis; batteries; lead storage battery; fuel cell (diagram); corrosion (diagram); prevention; summary; exam tips.
- Layouts: title 2, concept 18, diagram 6, example 9, check 6, summary 2, exam-tips 2.
- **Visuals in decks (39 of 45 slides; no gap longer than one slide):** table 26, flow 6, svg 5, plot 1, chem 1.
- **Diagrams (5 hand-written SVGs):** Daniell cell with salt bridge and voltmeter; standard hydrogen electrode; electrolytic cell with ion migration; H₂–O₂ fuel cell with lamp; rusting under a water drop (anodic centre, cathodic edge). Named hues: blue for copper sulfate solution, brown for copper and rust, yellow for the lamp, red for the anodic patch — always with text labels.
- **Narration:** 15–72 words (mean 60); numbers spoken as words, no symbols, formulae or unit abbreviations.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c a d c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1 or 2 (E° 1.24 V; E 0.932 V; ΔG° −239.3 kJ mol⁻¹; log K 15.59; E −0.59 V at pH 10; Λm 115; Λ°(Na₂SO₄) 260.2; Cu 1.18 g; t 5790 s) |
| short | 9 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 8 · d2 31 · d3 27 · d4 4.
- **Competency:** recall 9 · understanding 28 · application 30 · analysis 3. Application or higher is **47% of items (60% of marks)**, inside the 45–65% lint band.
- **Topic tags:** t01 13 · t02 14 · t03 16 · t04 13 · t05 10 · t06 8.
- **Cases:** silver plating in a Jaipur workshop (mass 1.34 g; why the anode thins, or time for 2.00 g); solar street lamps in Odisha (cathode reaction; 57.9 g of lead converted per night; hydrometer reading or why rechargeable); conductivity lab with KCl, HCl and ethanoic acid (Λm of HCl 411.5; H⁺ mobility, or α ≈ 0.042); corrosion on a Mumbai coastal bridge (electrolyte film; sacrificial metal; why blocks are replaced, or evaluate painting).
- **Deck checks:** q001, q002, q013 (Part 1); q024, q038, q055 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q003, q026, q048 (MCQ), q058 (A-R) · B q009, q036 (2 marks), q023 (3 marks) · C q062 or q065 · D q067.
- **Long (40 marks, 90 min):** A q004, q014, q015, q016, q025, q039, q040, q056 (MCQ), q006, q050 (A-R) · B q011, q045, (q035 or q010), q012, (q046 or q061) · C q064 + (q063 or q066) · D q068, q069.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); 10 SVG visuals / 5 distinct diagrams pass the allow-list; narration ≤ 72 words with no symbols; check slides all objective; 29/29 scripted re-solves pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem; every distractor was checked to come from a named slip (sign of E°, multiplying E° by coefficients, wrong n, forgetting the factor 1000, minutes for seconds). Findings and fixes:
1. **Competency band.** The first build had 37% of items at application or higher. Instead of relabelling, six items were rewritten into new situations: a student’s Λm unit error to diagnose; choosing the electrolyte with the highest Λ° from a λ° table; a falling battery-acid density to interpret; choosing a power source for a spacecraft; finding E°(Zn²⁺/Zn) from a voltmeter reading and electron direction; explaining pink phenolphthalein and green gas in a brine demonstration. One prediction MCQ (removing the salt bridge) was retagged application. Final 47%.
2. **Word limits.** The fuel-cell 2-mark answer is mostly equations, so it has no word limit (the lint counted only 23 words outside the maths).
3. **Originality.** Numerical data were chosen fresh (Ni|Ag⁺ cell at 0.001 M, Fe–Ag ΔG°, Sn/Pb K ≈ 2.2, methanoic acid by conductance, nickel plating, aluminium time, solar-lamp lead mass); textbook exercise combinations were deliberately avoided.
4. **Diagrams.** On a coordinate review the battery symbol in the electrolysis diagram was corrected (long thin plate positive, short thick plate negative), and labels that overlapped electrodes in the Daniell cell, SHE and rust diagrams were moved.

5. **Verify stage.** The first gate run gave one minor flag: the conductivity case part (Λm of HCl, 411.5) reached its key through a fraction with nested braces that the verifier’s arithmetic parser skips; the step is now written as 4.115 ÷ 0.010 = 411.5. Re-run: 0 flags.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
