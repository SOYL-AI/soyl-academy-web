# ISC Class 12 Chemistry, Chapter 13 — Haloarenes

`isc-12-chemistry-ch13` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (5 sections), 31 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch13_short` (20 marks, 50 min) and `t_isc12chem_ch13_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch13/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All five syllabus topics are covered: t01 the nature of the C–X bond in haloarenes (resonance, sp² carbon, bond length and dipole data) and preparation by electrophilic substitution and from benzenediazonium chloride (Sandmeyer, Gattermann, KI); t02 physical properties, including the high melting point of para-dihalobenzenes; t03 electrophilic substitution (chlorination, nitration with mechanism, sulphonation, Friedel–Crafts) and the deactivating but ortho/para-directing influence of halogen; t04 nucleophilic substitution (Cl → OH by the Dow process and via addition–elimination with ortho/para nitro groups; Cl → NH₂) and reduction to benzene; t05 Wurtz–Fittig and Fittig reactions, Grignard reagent formation, and the structure, manufacture and effects of DDT.
- Removed topic respected: no directive influence of halogens in polysubstituted haloarenes; nitro-substituted chlorobenzenes appear only for nucleophilic substitution.
- Facts a reviewer may wish to double-check: C–Cl bond lengths (169 vs 177 pm) and dipole moments (1.69 D chlorobenzene, 2.05 D chloroethane, 1.86 D chloromethane) are rounded literature values; melting points of the dichloro- and dibromobenzenes are rounded; conditions for hydrolysis of the nitrochlorobenzenes (623 K/300 atm, 443 K, 368 K, warm water) follow the usual textbook series.

## Shape
- **Part 1, 15 slides:** familiar haloarenes; aryl versus benzylic halides; nature of the C–X bond (resonance SVG); bond lengths and dipole moments; worked example (explaining the data); preparation by electrophilic substitution; preparation from benzenediazonium chloride; worked example (choosing a route); physical properties; worked example (melting and boiling points); summary; exam tips; three checks.
- **Part 2, 15 slides:** overview flow; halogen deactivating but o/p directing; mechanism of nitration of chlorobenzene; other electrophilic substitutions; worked example (products); nucleophilic substitution and the Dow process; addition–elimination with nitro groups; worked example (Cl → NH₂, Cl → H, effect of nitro position); Wurtz–Fittig, Fittig and Grignard; DDT; summary; exam tips; three checks.
- Layouts: title 2 · concept 12 · diagram 1 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 1 · table 20. One SVG (resonance structures of chlorobenzene), reused from the CBSE 12 ch06 set. Narration 11–72 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b a d c) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1 or 2 (16.9 g chlorobenzene at 75% yield; 1.12 L N₂; 8.46 g phenol (Dow, 90%); 35.45 g DDT; 5.52 g toluene (Wurtz–Fittig, 60%)) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 16 · d2 35 · d3 13 · d4 3.
- **Competency:** recall 10 · understanding 24 · application 23 · analysis 10. Application or higher is **49% of items (55% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 19 · t02 7 · t03 14 · t04 16 · t05 15.
- **Deck checks:** q001, q002, q018 (Part 1); q024, q036, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q007, q019, q025, q037, q008 · B q013, (q014 or q060) · C q016, (q035 or q048) · D q064.
- **Long (40 marks, 100 min):** A q004, q005, q006, q020, q026, q027, q038, q039, q040, q054, q042, q029 · B q015, q033, (q047 or q061) · C q017, q034, q049, (q062 or q023) · D q065, (q063 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own compound or data set (iodobenzene from KI, dark chlorination, 4-chloroacetophenone, 1-chloro-2,4-dinitrobenzene, iodomethane with iodobenzene, chloral, …). CBSE 12 ch06 treats haloarenes briefly; none of its stems or data is reused.
2. **Balance fix.** Stage-4 lint flagged two Sandmeyer/Gattermann equations for bromobenzene written from the diazonium chloride without HBr (Cl and Br unbalanced); they now read C₆H₅N₂Cl + HBr → C₆H₅Br + N₂ + HCl. Two items were re-tagged to keep the competency share inside the band. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** for atoms and charge; every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

