# ICSE Class 10 Chemistry, Chapter 2 — Chemical Bonding

`icse-10-chemistry-ch02` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 13 slides), notes (6 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch02_short` (20 marks, 30 min) and `t_icse10chem_ch02_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Electrovalent (ionic) bonding: electron dot structures of NaCl, MgCl2 and CaO; t02 Properties of electrovalent compounds: state, melting and boiling points, conductivity and dissociation in solution or melt; t03 Covalent bonding: duplet and octet; non-polar molecules H2, Cl2, O2, N2, CCl4 and CH4; t04 Polar covalent molecules HCl, NH3 and H2O: electronegativity difference and structures; t05 Properties of covalent compounds; comparison of electrovalent and covalent compounds; t06 Coordinate bonding: lone pair; formation of hydronium (H3O+) and ammonium (NH4+) ions.
- Facts a reviewer may wish to double-check: NaCl melts at 801 °C and MgO at about 2850 °C; CH₄ and CCl₄ are tetrahedral and non-polar, NH₃ pyramidal and H₂O bent; water self-ionises as H₂O + H₂O ⇌ H₃O⁺ + OH⁻.

## Shape
- **Part 1, 13 slides:** octet rule and the electrovalent bond; electron dot diagrams: NaCl, MgCl₂ and CaO; worked example (predicting an ionic formula); when does an electrovalent bond form?; properties of electrovalent compounds; worked example (explaining conductivity); writing formulae from electrovalency; summary; exam tips; 3 checks.
- **Part 2, 13 slides:** covalent bonds: single, double and triple; non-polar molecules; worked example (drawing a covalent molecule); polar molecules: HCl, H₂O and NH₃; covalent compounds compared with electrovalent compounds; worked example (classifying from properties); coordinate bonds: H₃O⁺ and NH₄⁺; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 7 · diagram 3 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 3 · table 15. Three SVGs (electron dot diagrams of electron transfer in NaCl, MgCl₂ and CaO; shared pairs in Cl₂, O₂, N₂ and CH₄; H₂O and NH₃ with lone pairs and the formation of H₃O⁺ and NH₄⁺ with the coordinate bond arrowed from donor to acceptor). Narration 9–74 words (mean 50), no symbols, formulae or unit abbreviations.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b a a d) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 1 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 10 | 1 (a balanced equation, an observation or a name) |
| numerical | 2 | 1 or 2 (8; 12) |
| short (2 marks) | 6 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 13 · d2 35 · d3 12 · d4 2.
- **Competency:** recall 8 · understanding 17 · application 26 · analysis 10 · evaluation 1. Application or higher is **60% of items (62% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 14 · t02 11 · t03 15 · t04 11 · t05 9 · t06 15.
- **Deck checks:** q001, q013, q002 (Part 1); q021, q041, q047 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q003, q004, q024, q033, q006, q010, q031, q054, q020 · B (q058 or q061).
- **Long (40 marks, 60 min):** A q005, q014, q015, q022, q034, q042, q036, q009, q018, q030, q044, q055, q027, q046 · B (q059 or q060 or q062).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 2/2 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own atoms and compounds (Ca and O, E³⁺ and G²⁻, Li₃N, potassium chloride melt, MgO melting point, O₂ lone pairs, CCl₄ counts, HCl liquid versus solution, H₃O⁺ bonds, elements 19, 8 and 1). The CBSE 10 Science ch03/ch04 set-ups (KCl and MgCl₂ formation, the solid-NaCl assertion-reason, N₂ shared pairs, Cl₂ and H₂O structures) are not reused in the same form.
2. **Fixes after the first build.** Two notes sections lost the backslash in mhchem strings because they were plain template strings; they were made raw strings. The coordinate-bond arrows in the SVG were turned to point from the donor atom to H⁺. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** and every count re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

