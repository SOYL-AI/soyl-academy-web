# ISC Class 11 Chemistry, Chapter 8 — Covalent Bonding, VSEPR and Hybridisation

`isc-11-chemistry-ch08` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 20 slides), notes (6 sections), 32 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch08_short` (20 marks, 50 min) and `t_isc11chem_ch08_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 6 syllabus topics are covered: t01 Covalent bond: conditions, single, double and triple bonds; sigma and pi bonds (H2, O2, N2); Lewis structures of CH4, NH3, H2O, ethane, ethene, ethyne and CO2; t02 Bond parameters; polar and non-polar covalent bonds; dipole moment; characteristics of covalent compounds compared with ionic ones; t03 Variable covalency (P, S, Cl); formal charge; deviations from the octet rule (incomplete and expanded octets); t04 Fajan's rules: polarisation and covalent character of ionic bonds; t05 VSEPR theory and shapes of molecules; t06 Hybridisation involving s, p and d orbitals and molecular shapes.
- Lewis structures of the prescribed molecules (CH₄, NH₃, H₂O, ethane, ethene, ethyne, CO₂; H₂, O₂, N₂ with σ and π bonds), bond parameters and dipole moment with numericals, variable covalency (P, S, Cl), formal charge, octet deviations, Fajan's rules, VSEPR and hybridisation including sp³d and sp³d².
- Facts a reviewer may wish to double-check: e = 1.602 × 10⁻¹⁹ C; 1 D = 3.336 × 10⁻³⁰ C m. Bond enthalpies (kJ mol⁻¹): H–H 436, O=O 498, N≡N 946, C–C 347, C=C 611, C≡C 837, C–H 414. Bond lengths (pm): H–H 74, O=O 121, N≡N 109 (as in CBSE 11 ch04; measured about 110), C–C 154, C=C 134, C≡C 120. HX dipole moments (D) and lengths (pm): HF 1.91 / 91.7, HCl 1.03 / 127.4, HBr 0.79 / 141.4 (published HF values vary). Bond angles: NH₃ 107°, H₂O 104.5°, SF₄ about 102° and 173°. The 1.51 D O–H bond moment and the AB₂ / ±0.35e dipole data are illustrative.

## Shape
- **Part 1, 19 slides:** the covalent bond: single, double and triple; lewis structures of ethane, ethene and ethyne; sigma and pi bonds; worked example (bonds in acrylonitrile); bond parameters: length, enthalpy and order; why a bond has a definite length; polar bonds and dipole moment; shape decides whether the molecule is polar; worked example (percentage ionic character of HCl); covalent compared with ionic compounds; variable covalency: P, S and Cl; formal charge; deviations from the octet rule; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** fajan’s rules; worked example (ordering chlorides by covalent character); vSEPR theory: electron pairs repel; ideal shapes with no lone pairs; lone pairs change the shape; nH₃, H₂O and SO₂; shapes derived from the trigonal bipyramid and octahedron; worked example (shapes of SF₄ and XeF₂); hybridisation: why equal bonds from unequal orbitals; promotion and hybridisation of Be, B, C, P and S; the lobes and the geometry; hybridisation and shape together; worked example (hybridisation by counting pairs); hybridisation in ethane, ethene and ethyne; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 9 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 13 · table 18. SVGs (13): Lewis structures computed from coordinates, σ/π overlap, the H₂ potential-energy curve, bond dipoles of CO₂, H₂O and BF₃ with vector-sum checks, octet deviations, Fajan polarisation to scale, VSEPR shapes AB₂ to AB₆ and lone-pair shapes (views chosen by the CBSE 11 search so no atom hides behind the centre), promotion and hybridisation boxes and hybrid lobes; all rendered and checked by eye. Narration 36–72 words (mean 56), no symbols, formulae or unit abbreviations.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (11.6 %; 1.82 D; 2.17 D; 2831 kJ mol⁻¹; 3) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 5 | 5, set in parts |

- **Difficulty:** d1 14 · d2 32 · d3 23 · d4 1.
- **Competency:** recall 8 · understanding 20 · application 33 · analysis 9. Application or higher is **60% of items (68% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 14 · t02 18 · t03 13 · t04 8 · t05 10 · t06 9.
- **Deck checks:** q003, q015, q032 (Part 1); q045, q056, q063 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q002, q016, q054, q064, q008 · B q010, (q028 or q050) · C q011, (q042 or q061) · D q031.
- **Long (40 marks, 100 min):** A q004, q005, q014, q017, q033, q034, q046, q053, q055, q065, q038, q039 · B q027, q041, (q040 or q060) · C q012, q029, q043, (q051 or q069) · D q044, (q052 or q062).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (63 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 16/16 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. An assertion-reason item paired 'SF₄ is see-saw' with 'S has six valence electrons', which is part of the VSEPR count (borderline); the reason is now 'SF₄ is a gas at room temperature', true and clearly unrelated, so (b) is unambiguous.
2. The producer re-solved every numerical (percentage ionic character, dipole moments, bond-enthalpy sum, formal charge) and objective key: all correct.
3. Writer fixes: a dipole solution the arithmetic lint misread, a short narration, and label overlaps in seven SVGs.

## Known gaps
- Narration audio is not generated (TTS stage).

