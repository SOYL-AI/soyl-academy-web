# ICSE Class 10 Chemistry, Chapter 5 — Mole Concept: Gas Laws, Molar Volume and Avogadro's Number

`icse-10-chemistry-ch05` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (6 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch05_short` (20 marks, 30 min) and `t_icse10chem_ch05_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch05/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Gay-Lussac's law of combining volumes: statement, explanation and calculations; t02 Avogadro's law; atomicity of hydrogen, oxygen, nitrogen and chlorine from the formation of HCl, NH3 and NO; t03 The mole as a counting unit; Avogadro's number; gram atomic mass and gram molecular mass; t04 Molar volume: 22.4 litres of any gas at STP has a mass equal to its molar mass; t05 Vapour density and the relation molecular mass = 2 x vapour density.
- Removed topics are respected: Formal proof of the molar volume relation (may be taught but is not examined); Proof of atomicity of hydrogen, oxygen, nitrogen and chlorine; Formal proof of molecular mass = 2 x vapour density.
- Facts a reviewer may wish to double-check: STP is 273 K and 1 atm; molar volume 22.4 dm³; Avogadro’s number 6.022 × 10²³. Proofs of the molar volume, atomicity and M = 2 × VD relations are not examined, so the decks use the relations and explain the HCl volume ratio without a formal proof. Masses of 1 dm³ at STP are given as about 0.09 g (H₂), 1.43 g (O₂) and 1.96 g (CO₂); air is taken as vapour density 14.4.

## Shape
- **Part 1, 14 slides:** gay-Lussac's law of combining volumes; using the law: what counts and what does not; worked example (burning propane); worked example (one gas in excess); avogadro's law; volumes, molecules and coefficients; worked example (counting molecules from volumes); atomicity: why hydrogen and chlorine are diatomic; summary; exam tips; 3 checks.
- **Part 2, 15 slides:** the mole and Avogadro's number; gram atomic mass and gram molecular mass; worked example (moles, molecules and atoms); molar volume of a gas; worked example (identifying a gas from its mass); vapour density; worked example (using vapour density); the mole map: putting it together; worked example (one sample, four answers); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · example 7 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · flow 3 · svg 4 · table 15. Three SVGs (volume boxes for N₂ + 3H₂ → 2NH₃; three equal jars of gases holding equal numbers of molecules; the mole map, used twice). Narration 12–70 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b c d a) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 10 | 1 or 2 (325 cm³; 80 cm³; 0.25 mol; 29.4 g; 0.5 mol; 4.48 dm³; 16 g mol⁻¹; 0.3 mol; 11 g; 35.5) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 26 · d2 25 · d3 17 · d4 2.
- **Competency:** recall 16 · understanding 11 · application 31 · analysis 12. Application or higher is **61% of items (76% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 17 · t02 10 · t03 22 · t04 24 · t05 18.
- **Deck checks:** q001, q002, q015 (Part 1); q022, q037, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q003, q016, q025, q038, q005, q011, q032, q046, q013 · B (q066 or q067).
- **Long (40 marks, 60 min):** A q004, q017, q023, q024, q040, q051, q041, q019, q033, q059, q034, q012, q063, q064 · B (q068 or q069 or q070).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 19/19 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template; the chapter producer rebuilt it from source (validator, lint and verify clean) and re-computed all ten numericals (325 cm³ O₂ for 50 cm³ butane, 80 cm³ after CO + O₂, 0.25 mol CaCO₃, 29.4 g H₂SO₄, 0.5 mol glucose, 4.48 dm³ CO₂, 16 g mol⁻¹, 0.3 mol NH₃, 11 g, vapour density 35.5).
2. **Specific stems.** Every stem names its own gas and data; the ISC 12 ch01 mole and concentration stems are not reused.
3. **Every equation re-balanced** and every numerical re-computed by the build script.
4. **Fixes after the first build (helper).** A notes phrase ending in “data:” tripped the URL-scheme rule and was reworded; one notes body was made a raw string so its LaTeX escapes survive.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

