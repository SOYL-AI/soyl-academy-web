# ISC Class 11 Chemistry, Chapter 17 — Introduction, Classification and IUPAC Nomenclature of Organic Compounds

`isc-11-chemistry-ch17` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 19 slides), notes (7 sections), 31 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch17_short` (20 marks, 50 min) and `t_isc11chem_ch17_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `decks.mjs`, `molkit.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch17/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 3 syllabus topics are covered: t01 Vital force theory and its fall; importance of organic chemistry; tetravalency of carbon; catenation, isomerism and multiple bonding as reasons for the large number of compounds; t02 Classification: open chain, closed chain, homocyclic, heterocyclic, aromatic and alicyclic compounds; homologous series; functional groups; t03 IUPAC rules for naming aliphatic, alicyclic and aromatic compounds.
- The vital force theory and Wöhler’s urea synthesis, why carbon forms so many compounds (tetravalency, catenation, multiple bonding, isomerism), classification by carbon skeleton (open chain; homocyclic alicyclic and aromatic; heterocyclic), homologous series and functional groups, and IUPAC names of alkanes, alkenes, alkynes, compounds with one or more functional groups (priority order), alicyclic compounds and benzene derivatives (ortho, meta, para and the retained parents toluene, phenol, aniline, benzoic acid).
- Facts a reviewer may wish to double-check: Wöhler 1828 (NH₄CNO → NH₂CONH₂); alkane chain-isomer counts 2, 3, 5, 9, 18, 75 for C₄, C₅, C₆, C₇, C₈, C₁₀; principal-group priority –COOH > –SO₃H > –COOR > –COCl > –CONH₂ > –CN > –CHO > >C=O > –OH > –NH₂, with halo, nitro, alkoxy and alkyl always prefixes; molar masses with C 12, H 1, N 14, O 16. Every IUPAC name drawn in an SVG is checked against the formula and longest chain computed from the drawing.

## Shape
- **Part 1, 18 slides:** the vital force theory and its fall; wöhler’s synthesis of urea; why organic chemistry matters; why carbon forms so many compounds; catenation and isomerism multiply the possibilities; classification of organic compounds; ring compounds: alicyclic, aromatic, heterocyclic; homologous series; worked example (using the general formula); functional groups; common functional groups; worked example (functional groups in vanillin); summary; exam tips; 3 checks.
- **Part 2, 19 slides:** word root, suffix and prefix; reading an IUPAC name; rules for naming alkanes; alkyl groups as substituents; worked example (naming a branched alkane); alkenes and alkynes; principal functional group and suffixes; eight compounds, eight names; worked example (a compound with two groups); alicyclic compounds; aromatic compounds: benzene derivatives; worked example (disubstituted benzenes); writing a structure from a name; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 14 · diagram 5 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · flow 2 · svg 13 · table 15. SVGs: carbon skeletons, the classification tree, ring types, functional groups, vanillin, reading and building IUPAC names, eight named compounds, a two-group compound, alicyclic and benzene derivatives; rendered and checked by eye (the first producer re-laid four of them). Narration 12–70 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d c b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (4.08 g; 8; 8) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 17 · d2 27 · d3 19 · d4 2.
- **Competency:** recall 11 · understanding 17 · application 29 · analysis 8. Application or higher is **57% of items (63% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 15 · t02 23 · t03 28.
- **Deck checks:** q001, q015, q016 (Part 1); q037, q038, q039 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q002, q017, q037, q044, q005 · B q011, (q028 or q029) · C q031, (q056 or q058) · D q061.
- **Long (40 marks, 100 min):** A q003, q004, q016, q018, q019, q020, q040, q041, q042, q043, q021, q022 · B q012, q030, (q053 or q054) · C q013, q033, q057, (q059 or q060) · D q036, (q062 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (47 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 4/4 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. First producer (before the session ended): re-laid labels in four SVGs (a footnote, functional-group spacing, an aldehyde oxygen and locant sides on two worked examples).
2. Second producer review (2026-11-14): all 65 items re-read and every IUPAC name re-derived (3-methylhexane, 2,4-dimethylhexane, 4-methylpent-2-ene, 4-methylhex-2-yne, 4-hydroxybutan-2-one, cyclohex-2-en-1-ol, 4-hydroxybenzoic acid, 3,4-dimethylheptane, 3,3-dimethylhexane, 3-cyanopropanoic acid, 4-oxopentanal and the rest): all correct.
3. Fixes: the key of the ortho-nitrotoluene MCQ was the only option carrying a common name in brackets (a cue), now removed; the homologous-series table printed methane as C₁H₄, now CH₄.
4. Competency tags: two items moved from application to understanding (writing the next homologue of propan-1-ol, and picking the pair in one homologous series); application or higher is 57% of items.

## Known gaps
- Narration audio is not generated (TTS stage).

