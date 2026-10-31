# ISC Class 12 Chemistry, Chapter 22 — Proteins, Vitamins and Nucleic Acids

`isc-12-chemistry-ch22` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 14 slides), notes (5 sections), 31 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch22_short` (20 marks, 50 min) and `t_isc12chem_ch22_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch22/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All five syllabus topics are covered: t01 α-amino acids, essential and non-essential, neutral, acidic and basic amino acids, the zwitter ion and amphoteric behaviour, the isoelectric point and migration in an electric field; t02 the peptide bond, polypeptides, fibrous and globular proteins, and definitions of primary, secondary, tertiary and quaternary structure; t03 denaturation, enzymes (specificity, optimum conditions, urease, pepsin, invertase) and hormones (insulin, glucagon, thyroxine, adrenaline) at an elementary level; t04 vitamins A, B (B₁, B₂, B₆, B₁₂), C, D, E and K — fat- or water-soluble, sources and deficiency diseases; t05 nucleotides, purine and pyrimidine bases, the DNA double helix and base pairing, the types of RNA and a DNA–RNA comparison.
- Removed topics are respected: protein structures are given as definitions only (no structure diagrams), no chemical names or structures of vitamins are used, and no chemical structures of DNA or RNA are drawn (the DNA visual is a schematic ladder of base pairs).
- Facts a reviewer may wish to double-check: pKa values for alanine (2.34, 9.69) and approximate pI values (glutamic acid 3.2, glycine 6.0, lysine 9.7) are standard data-book values; insulin chain lengths 21 and 30; vitamin deficiency diseases follow the usual textbook table.

## Shape
- **Part 1, 15 slides:** proteins and their jobs; amino acids and their classification; the zwitter ion with equations; isoelectric point; worked example (glutamic acid, glycine and lysine in an electric field at pH 6); peptide bond (SVG); worked example (Gly–Ala–Val: bonds, molar mass, number of sequences); protein classes and levels of structure (definitions); denaturation; enzymes and hormones; summary; exam tips; three checks.
- **Part 2, 14 slides:** DNA → RNA → protein flow; fat- and water-soluble vitamins; sources and deficiency diseases; worked example (four deficiency cases); nucleotides and bases; the DNA double helix (SVG); worked example (base counting in 2000 base pairs); RNA and the DNA–RNA comparison; worked example (an RNA copy of a DNA sequence); summary; exam tips; three checks.
- Layouts: title 2 · concept 10 · diagram 2 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 2 · table 18. Two SVGs (peptide-bond formation; DNA base-pair ladder), reused from the CBSE 12 ch10 set; the other visuals are tables and flows. Narration 8–78 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b a c a d) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1 or 2 (pI of alanine 6.015; Gly–Ala–Ser 233 g mol⁻¹; 6 tripeptide sequences; 49 peptide bonds in insulin; 1800 cytosine bases (2500 bp, 700 A); 245 g mol⁻¹ and 480 guanine bases (short and long answers)) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 4 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 15 · d2 38 · d3 13 · d4 2.
- **Competency:** recall 19 · understanding 17 · application 25 · analysis 6 · evaluation 1. Application or higher is **47% of items (49% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 13 · t02 15 · t03 14 · t04 13 · t05 14.
- **Deck checks:** q001, q013, q028 (Part 1); q044, q042, q055 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q015, q045, q058, q008 · B q010, (q025 or q065) · C q026, (q052 or q066) · D q027.
- **Long (40 marks, 100 min):** A q003, q004, q005, q014, q016, q029, q030, q032, q046, q059, q036, q060 · B q024, q037, (q051 or q039) · C q011, q012, q040, (q067 or q053) · D q068, (q041 or q054).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own amino acid, protein, person or data set (lysine at pH 6, aspartic acid, serum albumin and wool keratin, the 70% ethanol hand rub, mercury(II) first aid, urease and methylurea, glucagon after a meal, a smog-bound town, a fisherman at sea, a vegetarian hostel, G–C–A–T–T–A as template, 2500 base pairs with 700 A, …). CBSE 12 ch10 treats biomolecules; its stems (boiled egg albumin, paneer, hexapeptide bonds, glycine–alanine dipeptides, polished rice and beriberi, carrots vs citrus, A–T–G–C–C–A pairing, 18% guanine, 100 base pairs with 40 G–C, the iodised-salt hormone question) are not reused in the same form.
2. **Fixes after the first build.** One check slide was moved so that no two slides in a row lack a visual. The competency balance was 41% application or higher; four scenario-based objective items were retagged as application after re-reading them (giving 47%), and the amylase experiment was raised to difficulty 4. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** (peptide formation, the zwitter-ion acid–base equations, urease) and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

