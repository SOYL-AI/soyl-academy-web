# ISC Class 11 Chemistry, Chapter 14 — Ionic Equilibrium: Acids, Bases and pH

`isc-11-chemistry-ch14` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5): data, SVGs and questions drafted by one writer (stopped by a usage limit), decks, notes, flashcards and build by a second Sonnet writer, who also reviewed the first writer's items; reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 17 slides), notes (6 sections), 32 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch14_short` (20 marks, 50 min) and `t_isc11chem_ch14_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `data.mjs`, `decks.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch14/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Strong and weak electrolytes; non-electrolytes; ionisation and degree of ionisation; t02 Arrhenius, Bronsted-Lowry and Lewis concepts of acids and bases; conjugate pairs; t03 Ostwald's dilution law (derivation); dissociation constants and acid strength; multistage ionisation of polybasic acids; t04 Ionic product of water; pH, pOH and pKw; t05 Acid-base indicators and their choice in titrations.
- Electrolytes and degree of ionisation, the Arrhenius, Brønsted–Lowry and Lewis concepts with conjugate pairs, Ostwald's dilution law with derivation, Ka and acid strength, stepwise ionisation of polybasic acids, Kw, pH, pOH and pKw (including Kw at other temperatures and strong acid–base mixtures), and indicators chosen from computed titration curves. Hydrolysis, buffers and Ksp are left to ch15.
- Facts a reviewer may wish to double-check: Kw = 1.0 × 10⁻¹⁴ at 298 K; Kw at 323 K 5.5 × 10⁻¹⁴ (given), at 373 K about 5.1 × 10⁻¹³ (sources give 5.1–5.5). Ka: CH₃COOH 1.8 × 10⁻⁵, HCOOH 1.8 × 10⁻⁴, HNO₂ 4.5 × 10⁻⁴, C₆H₅COOH 6.5 × 10⁻⁵, HCN 4.9 × 10⁻¹⁰; Kb: NH₃ 1.8 × 10⁻⁵, CH₃NH₂ 4.4 × 10⁻⁴; H₃PO₄ Ka1 7.5 × 10⁻³, Ka2 6.2 × 10⁻⁸, Ka3 4.8 × 10⁻¹³. Indicator ranges: methyl orange 3.1–4.4, methyl red 4.4–6.2, bromothymol blue 6.0–7.6, phenolphthalein 8.3–10.0. Titration curves are computed from the charge balance (equivalence pH 8.72 for 0.1 M ethanoic acid with NaOH, 5.28 for 0.1 M NH₃ with HCl). H₂SO₄ is taken as fully ionised in two stages where the stem says so.

## Shape
- **Part 1, 20 slides:** strong, weak and non-electrolytes; what a bulb tells us; degree of ionisation; three concepts of acids and bases; conjugate acid–base pairs; worked example (conjugate pairs in a reaction); a Lewis acid and a Lewis base; lewis acids and Lewis bases; ostwald's dilution law: derivation; degree of ionisation against concentration; worked example (degree of ionisation of ethanoic acid); ka, Kb and the strength of acids and bases; polybasic acids ionise in stages; phosphoric acid on a pKa scale; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** ionic product of water and temperature; pH, pOH and pKw; worked example (pH of a strong base); pH of weak acids and weak bases; worked example (pH of a weak base); mixing a strong acid with a strong base; worked example (a mixture); acid–base indicators; titration curves and indicator ranges; choosing an indicator; worked example (reading indicator colours); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 14 · diagram 5 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · svg 5 · table 22. SVGs: strong, weak and non-electrolytes with conductivity bulbs, the NH₃→BF₃ adduct, α against concentration, the H₃PO₄ pKa ladder and computed titration curves with indicator bands; all rendered and checked by eye. Narration 33–72 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d c a; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1–3 (0.042; 12.6; 1.81; 11.37; 6.63) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 11 · d2 32 · d3 23 · d4 2.
- **Competency:** recall 5 · understanding 29 · application 27 · analysis 7. Application or higher is **50% of items (57% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 9 · t02 14 · t03 17 · t04 22 · t05 10.
- **Deck checks:** q004, q013, q024 (Part 1); q045, q044, q061 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q010, q041, q060, q016 · B q007, (q020 or q053) · C q056, (q021 or q054) · D q037.
- **Long (40 marks, 100 min):** A q002, q003, q011, q014, q026, q027, q039, q042, q059, q062, q015, q029 · B q032, q052, (q034 or q066) · C q008, q067, q022, (q036 or q057) · D q068, (q038 or q058).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (17 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 23/23 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Second writer: an odd Lewis-acid set-up reworded, a (b)-key reason made clearly unrelated, an indicator stem that gave the equivalence pH removed, a long item that asked for a value already in its table re-set, a stray $ and a link-pattern lint fixed.
2. The producer re-solved every numerical and objective key (α and [H⁺] of weak acids, pH of dilutions, mixtures and bases, pure water at 323 K, indicator choice): all correct.
3. Second producer review (2026-11-14): all 68 items re-read; every numerical re-solved (Ostwald dilution, pH of mixtures, Kw at 323 K and 373 K, the H₃PO₄ quadratic, the computed titration table); no changes needed.

## Known gaps
- Narration audio is not generated (TTS stage).

