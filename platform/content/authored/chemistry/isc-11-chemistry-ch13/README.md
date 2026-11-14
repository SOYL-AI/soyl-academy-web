# ISC Class 11 Chemistry, Chapter 13 — Chemical Equilibrium

`isc-11-chemistry-ch13` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5): drafted by one writer (stopped by a usage limit before reporting), then checked and finished by a second Sonnet writer; reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (6 sections), 32 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch13_short` (20 marks, 50 min) and `t_isc11chem_ch13_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `data.mjs`, `decks.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch13/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Reversible and irreversible reactions; physical equilibria (solid-liquid, liquid-vapour, solid-vapour); dynamic nature and characteristics of equilibrium; t02 Law of mass action; equilibrium constants Kc and Kp; relation Kp = Kc(RT)^delta n (derivation); units and characteristics of K; t03 Le Chatelier's principle: effect of concentration, temperature, pressure, catalyst and inert gas; t04 Conditions for maximum yield: Haber process, dissociation of N2O4, hydrolysis of esters, contact process.
- Physical equilibria, the law of mass action, Kc and Kp with the derivation of Kp = Kc(RT)^Δn (ISC asks for it), units and characteristics of K, ICE-table numericals and degree of dissociation, Le Chatelier's principle including an inert gas at constant volume and at constant pressure, and the yield conditions for the Haber process, N₂O₄ dissociation, ester hydrolysis and the contact process. ΔG° = −2.303 RT log K (ch12) is recapped only.
- Facts a reviewer may wish to double-check: R = 0.0821 L atm K⁻¹ mol⁻¹. Esterification Kc = 4.0; N₂O₄ ⇌ 2NO₂ ΔH = +57.2 kJ, Kc = 4.6 × 10⁻³ mol L⁻¹; Haber ΔH = −92.4 kJ, about 200 atm, 700–720 K, iron with molybdenum promoter; contact ΔH = −196 kJ, about 720 K, 1–2 atm, V₂O₅; CO + 2H₂ ⇌ CH₃OH ΔH = −90.7 kJ; C + CO₂ ⇌ 2CO ΔH = +172 kJ. The Haber yield curve is an ideal-gas model (Kp(298 K) = 5.6 × 10⁵ atm⁻², ΔH constant) and the deck says real gases give lower yields. Other Kc, Kp and pressure data are labelled given.

## Shape
- **Part 1, 18 slides:** reversible and irreversible reactions; liquid and vapour in a sealed flask; three kinds of physical equilibrium; chemical equilibrium is dynamic; the same equilibrium from both sides; law of mass action and Kc; worked example (calculating Kc); kp, and the units of K; derivation: Kp = Kc (RT)^Δn; worked example (Kp from Kc); characteristics of the equilibrium constant; worked example (equilibrium amounts for an ester); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** le Chatelier's principle; effect of concentration; response to added reactant and to compression; effect of temperature; effect of pressure; what a catalyst does; effect of an inert gas; worked example (predicting shifts for methanol synthesis); worked example (pressure and the degree of dissociation); yield of ammonia against pressure and temperature; haber process: conditions; contact process, N₂O₄ and ester equilibria; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 14 · diagram 5 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 5 · table 22. SVGs: a sealed flask with forward and backward rates, equilibrium approached from both sides, responses to disturbances, a catalyst energy profile and the ideal-gas Haber yield against pressure; all rendered and checked by eye. Narration 35–63 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c c b d a; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 3 | 1–3 (0.05 atm; 0.001 mol L⁻¹; 0.0086 atm⁻²) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 12 · d2 23 · d3 28 · d4 3.
- **Competency:** recall 4 · understanding 26 · application 23 · analysis 13. Application or higher is **55% of items (63% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 9 · t02 27 · t03 23 · t04 10.
- **Deck checks:** q003, q011, q026 (Part 1); q037, q040, q057 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q002, q012, q039, q058, q005 · B q007, (q023 or q051) · C q029, (q052 or q063) · D q065.
- **Long (40 marks, 100 min):** A q004, q013, q014, q016, q017, q018, q038, q042, q045, q059, q047, q036 · B q008, q024, (q025 or q050) · C q030, q032, q054, (q064 or q055) · D q033, (q034 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (17 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 14/14 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Second writer: an assertion-reason item with key (b) had a reason that bears on the temperature effect; it is now clearly unrelated. The ΔG° = −2.303 RT log K recap was added to a deck slide and the notes.
2. The producer re-solved every numerical and objective key (K for combined and reversed reactions, the reaction quotient, degree of dissociation from molar mass, the esterification yield, Kp from pressures, Kc from moles, Kc to Kp): all correct; the assertion-reason keys are unambiguous.
3. Second producer review (2026-11-14, after the first producer's session ended): all 66 items re-read; keys, numericals (ICE tables, Kp from Kc, degree of dissociation, esterification quadratic) and assertion-reason logic confirmed. One solution line that printed the same value twice ("α² = 0.0588 = 0.0588") now shows the division. Tags left as they were: each matches what the item asks.

## Known gaps
- Narration audio is not generated (TTS stage).

