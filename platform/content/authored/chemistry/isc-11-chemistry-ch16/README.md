# ISC Class 11 Chemistry, Chapter 16 — Redox Reactions

`isc-11-chemistry-ch16` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5): data, SVGs, decks, notes and objective items drafted by one writer (stopped by a usage limit), written items and build by a second Sonnet writer; reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (6 sections), 31 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch16_short` (20 marks, 50 min) and `t_isc11chem_ch16_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `data.mjs`, `decks.mjs`, `q-objective.mjs`, `q-written.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch16/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Oxidation and reduction in terms of oxygen, hydrogen and electrons; examples of redox reactions; t02 Oxidation number: rules and calculation in molecules and ions such as K2Cr2O7 and S2O3 2-; redox as change in oxidation number; t03 Balancing redox equations in acidic and basic media by the oxidation number method and the ion-electron method; t04 Applications of redox in different types of chemical reactions.
- Oxidation and reduction in terms of oxygen, hydrogen and electrons; oxidation-number rules with K₂Cr₂O₇ and S₂O₃²⁻; redox as change in oxidation number; balancing in acidic and basic media by the oxidation-number and ion-electron methods; combination, decomposition, displacement and disproportionation. No electrochemical cells (Class 12).
- Facts a reviewer may wish to double-check: Atomic masses Na 23, S 32, Cl 35.5, K 39, Cr 52, Mn 55, Fe 56; M(Na₂SO₃) 126, M(K₂Cr₂O₇) 294, M(H₂O₂) 34. Every final ionic equation is checked in code for atoms and charge, e.g. 4Zn + NO₃⁻ + 10H⁺ → 4Zn²⁺ + NH₄⁺ + 3H₂O; 3C₂O₄²⁻ + 2MnO₄⁻ + 4OH⁻ → 6CO₃²⁻ + 2MnO₂ + 2H₂O; 8Al + 5OH⁻ + 3NO₃⁻ + 2H₂O → 8AlO₂⁻ + 3NH₃; 2Cr(OH)₃ + ClO₃⁻ + 4OH⁻ → 2CrO₄²⁻ + Cl⁻ + 5H₂O; 2MnO₄⁻ + 5H₂O₂ + 6H⁺ → 2Mn²⁺ + 5O₂ + 8H₂O; 3HNO₂ → HNO₃ + 2NO + H₂O. In S₄O₆²⁻ the terminal S atoms are +5 and the middle ones 0 (average +2.5). Skeletal equations appear only in text that says so.

## Shape
- **Part 1, 15 slides:** oxygen and hydrogen view; the electron view and the two agents; worked example (name the agents); oxidation number: the idea and the rules; exceptions, and fractional oxidation numbers; chlorine across its oxidation states; worked example (calculating oxidation numbers); redox as a change in oxidation number; worked example (is it redox?); summary; exam tips; 3 checks.
- **Part 2, 17 slides:** the oxidation number method: steps; equalising the rise and the fall; worked example (permanganate and iron(II), oxidation number method); the ion-electron method: steps; two half-reactions sharing electrons; worked example (dichromate and iron(II), ion-electron method); basic medium; worked example (basic medium, two methods); types of redox reaction; disproportionation: chlorine in cold alkali; worked example (classify and balance); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 4 · example 7 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 6 · table 17. SVGs: oxidation numbers of chlorine, electron transfer, the oxidation-number method, half-reactions, the four reaction types and disproportionation; all rendered and checked by eye. Narration 36–67 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (6; 1.47 g; 2.5; 20 mL; 0.1 mol) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 5 · d2 25 · d3 35 · d4 3.
- **Competency:** recall 4 · understanding 25 · application 27 · analysis 12. Application or higher is **57% of items (70% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 16 · t02 30 · t03 23 · t04 10.
- **Deck checks:** q001, q007, q031 (Part 1); q039, q016, q020 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q002, q006, q014, q021, q025 · B q044, (q048 or q051) · C q054, (q056 or q057) · D q064.
- **Long (40 marks, 100 min):** A q003, q004, q005, q008, q009, q011, q015, q017, q022, q024, q026, q028 · B q045, q046, (q049 or q052) · C q053, q055, q062, (q060 or q059) · D q063, (q065 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (8 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 46/46 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Competency tags: the second writer moved five one-step oxidation-number sums (Cr in K₂Cr₂O₇, S in S₂O₃²⁻, C in CH₃OH, a check-slide item and the electrons gained by one dichromate ion) from application to understanding. The producer re-judged all five: each is a single sum with no further step, so understanding is the honest tag.
2. Second writer: three r'…' strings, an Mn2+ typo caught by the load-time checker, a skeletal half-reaction labelled as such, two (b)-key reasons made clearly unrelated, significant figures in stems and a notes typo.
3. The producer re-solved every numerical and objective key (electrons transferred, coefficients, titration volumes and masses, average oxidation numbers): all correct.
4. Second producer review (2026-11-14): an MCQ asked which species has chlorine at the same oxidation number as in KClO₃ and keyed "the chlorate ion" (the same ion, so it tested nothing); the key is now dichlorine pentoxide, Cl₂O₅ (+5), and its solution, which had unpaired maths delimiters, was rewritten.
5. Competency tags: that item and the oxidation-number match (single sums) moved from application to understanding; application or higher is now 57% of items.

## Known gaps
- Narration audio is not generated (TTS stage).

