# ISC Class 11 Chemistry, Chapter 7 — Ionic Bonding

`isc-11-chemistry-ch07` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (6 sections), 32 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch07_short` (20 marks, 50 min) and `t_isc11chem_ch07_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Valence electrons; Kossel-Lewis approach; octet rule applied to electrovalent and covalent bonds; t02 Ionic bond: Lewis structures of NaCl, Li2O, MgO, CaO, MgF2 and Na2S; conditions for formation (ionisation enthalpy, electron gain enthalpy, lattice energy, electronegativity difference); t03 Formation of cations and anions; variable electrovalency due to inert pair effect and unstable core; t04 Lattice enthalpy and the Born-Haber cycle; characteristics of electrovalent compounds.
- ISC-specific content: electron-dot structures of the six prescribed compounds (NaCl, Li₂O, MgO, CaO, MgF₂, Na₂S), variable electrovalency by the inert pair effect and an unstable core, and the Born–Haber cycle with computed numericals.
- Facts a reviewer may wish to double-check: Born–Haber data (kJ mol⁻¹): NaCl — sublimation of Na 108, ½ Cl–Cl 121, IE(Na) 496, EGE(Cl) −349, lattice −788, ΔfH −412; KCl — sublimation 89, IE 419, lattice −717, ΔfH −437; NaF — F–F 158, EGE(F) −328, lattice −923, giving ΔfH −568 (tables about −574); NaBr — ½ Br₂(l) to Br(g) 112, EGE(Br) −325, lattice −752, ΔfH −361; MgCl₂ — sublimation 148, IE 738 and 1451, ΔfH −641 (U about −2522 against tabulated −2526, as the slide says). Other lattice enthalpies: LiF −1037, NaI −700, MgO −3791, CaO −3401. Values differ by a few kJ between sources.

## Shape
- **Part 1, 15 slides:** valence electrons and the Kossel–Lewis approach; the octet rule; sodium chloride by electron transfer; writing the electron-dot structure of an ionic compound; electron-dot structures of five ionic compounds; worked example (formula of magnesium nitride); conditions for forming an ionic bond; electronegativity difference; worked example (energy to make an ion pair); summary; exam tips; 3 checks.
- **Part 2, 17 slides:** formation of cations and anions; variable electrovalency: two causes; iron and lead in orbital boxes; the inert pair effect down a group; lattice enthalpy; the Born–Haber cycle for sodium chloride; worked example (lattice enthalpy of NaCl); a second cycle: magnesium chloride; worked example (lattice enthalpy of MgCl₂); characteristics of ionic compounds; why the melt conducts but the solid does not; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 7 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 9 · table 15. SVGs: NaCl electron transfer, electron-dot structures of Li₂O, MgO, CaO, MgF₂ and Na₂S, an electronegativity scale, Fe and Pb orbital boxes (unstable core, inert pair), Born–Haber energy-level diagrams for NaCl and MgCl₂ and solid against molten NaCl conduction; all rendered and checked by eye. Narration 37–71 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a a; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (78; -717 kJ mol⁻¹; -568 kJ mol⁻¹; -325 kJ mol⁻¹) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 15 · d2 26 · d3 24 · d4 2.
- **Competency:** recall 6 · understanding 26 · application 23 · analysis 12. Application or higher is **52% of items (60% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 9 · t02 18 · t03 16 · t04 24.
- **Deck checks:** q003, q012, q015 (Part 1); q031, q046, q056 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q010, q028, q048, q007 · B q008, (q022 or q037) · C q024, (q041 or q064) · D q065.
- **Long (40 marks, 100 min):** A q002, q004, q011, q013, q014, q016, q029, q030, q044, q049, q053, q020 · B q023, q039, (q058 or q060) · C q025, q040, q061, (q062 or q063) · D q026, (q043 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (47 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 16/16 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. An MCQ named the Li⁺ ion in its stem and printed the electron arrangements in the options, giving the answer away; the stem now speaks of four ions and the options give the ions only.
2. The producer re-solved every Born–Haber numerical and objective key: all correct.
3. Writer fixes: missing $ in three Born–Haber strings, a lost backslash, a 0.75-mark scheme step, two surplus assertion-reason items removed, and SVG label clipping.

## Known gaps
- Narration audio is not generated (TTS stage).

