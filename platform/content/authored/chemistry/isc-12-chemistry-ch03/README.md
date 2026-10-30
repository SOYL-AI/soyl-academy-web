# ISC Class 12 Chemistry, Chapter 3 — Electrochemical Cells and Electrode Potential

`isc-12-chemistry-ch03` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (5 sections), 31 flashcards, 60 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch03_short` (20 marks, 50 min) and `t_isc12chem_ch03_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All five syllabus topics are covered: t01 electrolytic vs electrochemical cells, how a Daniell cell produces current, cell notation; t02 single electrode potential, the **SHE (preparation, use and limitations)** and how E° of Zn²⁺/Zn and Cu²⁺/Cu is measured; t03 **factors affecting electrode potential** (concentration, temperature, nature of electrode); t04 the electrochemical series and feasibility; t05 the Nernst equation, ΔG° and K.
- ISC-specific emphases (SHE preparation and limitations, measuring E° with the sign decided by electron flow, factors affecting E) have their own slides and questions.
- Facts a reviewer may wish to double-check: standard reduction potentials used (F₂ 2.87, Cl₂ 1.36, Br₂ 1.09, Ag⁺ 0.80, Fe³⁺/Fe²⁺ 0.77, I₂ 0.54, Cu²⁺ 0.34, Sn⁴⁺/Sn²⁺ 0.15, Pb²⁺ −0.13, Ni²⁺ −0.25, Fe²⁺ −0.44, Cr³⁺ −0.74, Zn²⁺ −0.76, Al³⁺ −1.66, Mg²⁺ −2.37, K⁺ −2.93 V).

## Shape
- **Part 1, 15 slides:** electrolytic vs electrochemical cells; Daniell cell (diagram); how current is produced and the salt bridge; cell notation; worked example (Fe–Ag cell notation); single electrode potential; SHE (diagram, preparation and limitations); measuring E° of Zn and Cu; worked example (E° of Ni from electron flow); summary; exam tips; three checks.
- **Part 2, 15 slides:** factors affecting E (Nernst plot for Cu²⁺/Cu); electrochemical series; worked example (Al–Ni cell, 1.41 V, n = 6); predictions from the series; worked example (storing CuSO₄ in iron or silver); Nernst equation; worked example (Ni–Cu cell, 0.62 V); emf, ΔG and K; worked example (Cu–Ag, ΔG° −88.8 kJ, K ≈ 3.9 × 10¹⁵); summary; exam tips; three checks.
- Layouts: title 2 · concept 10 · diagram 2 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · plot 1 · svg 2 · table 18. SVGs (from the CBSE 12 ch02 set): Daniell cell, standard hydrogen electrode. Narration 13–77 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (60)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b c d a) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1 or 2 (E(Ag) = 0.682 V; E°cell = 2.00 V; E = 2.68 V; ΔG° = −816.4 kJ/mol; log K = 26.44) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 4 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 13 · d2 30 · d3 16 · d4 1.
- **Competency:** recall 7 · understanding 18 · application 30 · analysis 5. Application or higher is **58% of items (61% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 10 · t02 10 · t03 8 · t04 15 · t05 20.
- **Deck checks:** q001, q010, q011 (Part 1); q020, q028, q041 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q004, q030, q043, q006 · B q007, (q016 or q037) · C q018, (q027 or q040) · D q060.
- **Long (40 marks, 100 min):** A q003, q012, q013, q021, q022, q029, q031, q032, q044, q045, q015, q049 · B q008, q038, (q053 or q054) · C q009, q039, q055, (q057 or q056) · D q058, (q019 or q059).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Link-reference false positive.** A solution containing “log[Cu²⁺]:” was read by the lint as a Markdown link reference; it was reworded.
2. **Narration.** One check-slide narration used the symbol E°; it now says “standard emf” in words.
3. **Count.** The first build had 59 questions; a concentration-cell MCQ was added (60).
4. **Originality.** One numerical had the same template stem as a CBSE 12 ch02 item (gate finding) and was reworded; CBSE 12 ch02 covers the same ideas, so all data here are new. Re-run: 0 duplicates.
5. **Specific stems.** Short, generic stems (e.g. a bare “Match each … with …” or “Which of these is …”) were rewritten to name this chapter’s substances or situation, so they cannot collide with other chapters in the growing bank.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

