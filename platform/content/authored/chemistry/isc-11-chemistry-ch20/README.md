# ISC Class 11 Chemistry, Chapter 20 — Basic Concepts of Organic Reaction Mechanisms

`isc-11-chemistry-ch20` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 19 slides), notes (7 sections), 32 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch20_short` (20 marks, 50 min) and `t_isc11chem_ch20_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `decks.mjs`, `kit.mjs`, `q1.mjs`, `q2.mjs`, `q3.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `svgsA.mjs`, `svgsB.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch20/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Types of reactions: substitution, addition and elimination; t02 Homolytic and heterolytic fission; free radicals, carbocations and carbanions and their relative stabilities; t03 Electrophiles and nucleophiles, including neutral ones; t04 Electron displacement effects: inductive, electromeric, mesomeric (resonance) effects and hyperconjugation; t05 Free radical and polar mechanisms: SN1, SN2, E1 and E2 with conditions and examples.
- Types of organic reaction (substitution, addition, elimination), homolytic and heterolytic fission with fish-hook and full arrows, free radicals, carbocations and carbanions (structure and stability), electrophiles and nucleophiles (charged and neutral), the inductive, electromeric and mesomeric effects and hyperconjugation, and the mechanisms ISC asks for: free-radical chlorination of methane, SN1, SN2, E1 and E2 with their rate laws and stereochemistry.
- Facts a reviewer may wish to double-check: pKa at 298 K: CH₃COOH 4.76, ClCH₂COOH 2.86, Cl₂CHCOOH 1.29, Cl₃CCOOH 0.65 (this chapter uses the measured 4.76 for ethanoic acid; ch14 and ch15 use Ka = 1.8 × 10⁻⁵, pKa 4.74, as their stems state). Stability orders: carbocations and radicals 3° > 2° > 1° > methyl (9, 6, 3, 0 α C–H bonds); carbanions the reverse; the allyl cation is resonance-stabilised. Rate constants in the SN1 and SN2 numericals are labelled given. (R)-2-bromobutane gives (S)-butan-2-ol by SN2 because the priority order is the same before and after.

## Shape
- **Part 1, 15 slides:** substitution, addition and elimination; kinds of substitution, addition and elimination; two ways to break a bond; conditions for each kind of fission; free radicals, carbocations and carbanions; how stable are they?; worked example (ordering intermediates); electrophiles and nucleophiles; worked example (classifying reagents); summary; exam tips; 3 checks.
- **Part 2, 19 slides:** the inductive effect and acid strength; groups with +I and −I effects; worked example (comparing acid strengths); resonance, mesomeric and electromeric effects; mesomeric groups and the electromeric effect; hyperconjugation; the free-radical mechanism; sN2: one step, backside attack; sN1: two steps through a carbocation; sN1 and SN2 compared; worked example (using the rate law); e2 and E1 elimination; e1 and E2 compared; substitution against elimination; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 9 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · svg 9 · table 18. SVGs: substitution, addition and elimination; homolytic and heterolytic fission; stability of intermediates; the inductive effect along a chain; resonance, mesomeric and electromeric effects; hyperconjugation; SN2 with the transition state and energy profile; SN1 in three steps; E2 and E1; rendered and checked by eye. Narration 11–65 words (mean 47), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c c d b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1–3 (79; 0.22 mol L⁻¹; 0.000024 mol L⁻¹ s⁻¹; 1.5; 0.00006 mol L⁻¹ s⁻¹) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 5 | 5, set in parts |

- **Difficulty:** d1 16 · d2 28 · d3 19 · d4 2.
- **Competency:** recall 3 · understanding 29 · application 24 · analysis 9. Application or higher is **51% of items (67% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 8 · t02 16 · t03 7 · t04 13 · t05 21.
- **Deck checks:** q003, q016, q025 (Part 1); q039, q035, q046 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q011, q027, q033, q015 · B q020, (q030 or q041) · C q022, (q042 or q061) · D q063.
- **Long (40 marks, 100 min):** A q002, q004, q010, q012, q026, q032, q034, q036, q045, q047, q037, q050 · B q055, q040, (q056 or q057) · C q043, q059, q062, (q023 or q031) · D q044, (q064 or q065).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (8 diagram self-checks (curly-arrow schemes, alpha C–H counts and pKa values checked in the svgs): 0 failures); narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Producer review (2026-11-14): all 65 items re-read; stability orders, the α C–H counts (9 in 2-methylbut-2-ene), the R/S outcome of the SN2 item, the rate-law numericals (2.4 × 10⁻⁵, factor 1.5, 6.0 × 10⁻⁵) and the pKa arithmetic (10^1.90 = 79; 10^−0.65 = 0.22) all confirmed.
2. Fixes: a deck table printed Ka values in computer notation ("1.74e-5"); they now read 1.74 × 10⁻⁵ and 5.13 × 10⁻². A check-slide heading read "the fastest S N one reaction" (narration spelling leaked into the heading); it now reads SN1.
3. Competency tags checked item by item; no changes. Application or higher is 51% of items.

## Known gaps
- Narration audio is not generated (TTS stage).

