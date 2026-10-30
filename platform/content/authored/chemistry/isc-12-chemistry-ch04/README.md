# ISC Class 12 Chemistry, Chapter 4 — Electrolytic Conductance, Electrolysis, Batteries and Corrosion

`isc-12-chemistry-ch04` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 17 slides), notes (5 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch04_short` (20 marks, 50 min) and `t_isc12chem_ch04_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch04/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All six syllabus topics are covered: t01 metallic vs electrolytic conductance, resistance, specific resistance, conductance, specific conductance and cell constant; t02 **equivalent** and molar conductance and their variation with concentration; t03 Kohlrausch’s law and its applications (incl. solubility of a sparingly soluble salt); t04 Faraday’s first and second laws and **F = N_A e**; t05 dry cell, mercury cell, lead storage battery and fuel cell with electrode reactions; t06 corrosion, its mechanism, factors and prevention.
- Removed topic respected: no details of Millikan’s oil-drop experiment (only F = N_A e).
- Facts a reviewer may wish to double-check: limiting ionic conductances (H⁺ 349.6, OH⁻ 199.1, K⁺ 73.5, Cl⁻ 76.3, Na⁺ 50.1, CH₃COO⁻ 40.9, Ag⁺ 61.9, NO₃⁻ 71.4, Mg²⁺ 106.0, SO₄²⁻ 160.0 S cm² mol⁻¹); κ of 0.02 M KCl taken as 0.00277 S cm⁻¹; Λ°(AgCl) 138.3; cell voltages (dry 1.5, mercury 1.35, lead 2 V per cell).

## Shape
- **Part 1, 14 slides:** metallic vs electrolytic conductance; resistance, conductance and cell constant; molar and equivalent conductance; worked example (CaCl₂: κ, Λm = 250, Λeq = 125); variation with concentration (plot); Kohlrausch’s law; worked example (Λ° of CH₃COOH = 390.5); worked example (α and Ka of ethanoic acid); summary; exam tips; three checks.
- **Part 2, 17 slides:** electrolysis (diagram); Faraday’s laws; the faraday F = N_A e; worked example (1.18 g Cu); worked example (cells in series, 0.635 g Cu); primary and secondary cells; dry cell and mercury cell reactions; lead storage battery; H₂–O₂ fuel cell (diagram); corrosion (diagram); prevention; summary; exam tips; three checks.
- Layouts: title 2 · concept 10 · diagram 4 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · flow 4 · plot 1 · svg 3 · table 16. SVGs (from the CBSE 12 ch02 set): electrolytic cell, fuel cell, rusting under a water drop. Narration 10–76 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b a d c) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1 or 2 (κ = 5.0 × 10⁻⁴ S cm⁻¹; Λeq = 60; Λ°(HNO₃) = 421.0; Ka = 1.78 × 10⁻⁴; S(AgCl) = 1.345 × 10⁻⁵ M; 1.26 g Ag; 1930 s; F = 96 472 C/mol) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 4 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 17 · d2 35 · d3 13 · d4 1.
- **Competency:** recall 10 · understanding 26 · application 27 · analysis 3. Application or higher is **45% of items (48% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 11 · t02 11 · t03 12 · t04 16 · t05 11 · t06 9.
- **Deck checks:** q010, q020, q001 (Part 1); q031, q047, q058 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q011, q034, q048, q014 · B q008, (q028 or q054) · C q018, (q044 or q065) · D q066.
- **Long (40 marks, 100 min):** A q003, q004, q012, q013, q021, q022, q032, q035, q049, q061, q023, q062 · B q017, q043, (q042 or q064) · C q019, q029, q055, (q056 or q045) · D q030, (q046 or q057).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 8/8 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Equations with an amalgam.** The mercury-cell equations first wrote Zn(Hg), which the balance checker reads as Zn + Hg; they now write Zn (the amalgam is named in words).
2. **Competency.** The first build had 44% application-or-higher; two application items were added (solubility of AgCl from conductance; charge to liberate 11.2 L of Cl₂). Final 66 questions, 45%.
3. **Originality.** A fill-blank on the faraday had the same stem as a CBSE 12 ch02 item (gate finding) and was reworded; CBSE 12 ch02 covers the same ideas, so all data here are new. Re-run: 0 duplicates.
4. **Specific stems.** Short, generic stems (e.g. a bare “Match each … with …” or “Which of these is …”) were rewritten to name this chapter’s substances or situation, so they cannot collide with other chapters in the growing bank.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

