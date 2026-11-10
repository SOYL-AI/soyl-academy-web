# ISC Class 11 Chemistry, Chapter 10 — Thermodynamics: Systems and the First Law

`isc-11-chemistry-ch10` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 19 slides), notes (6 sections), 32 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch10_short` (20 marks, 50 min) and `t_isc11chem_ch10_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 System and surroundings; isolated, closed and open systems; intensive and extensive properties; state of a system and state functions; t02 Thermodynamic processes: reversible, irreversible, adiabatic, isothermal, isobaric, isochoric, cyclic; thermodynamic equilibrium; t03 First law: internal energy, heat and work; sign conventions; mathematical statement and significance; cyclic and isolated systems; t04 Reversible and irreversible work of expansion; graphical comparison; t05 Enthalpy as a state function; heat capacity and specific heat; Cv and delta U; Cp - Cv = R.
- Sign convention ΔU = q + w with work done on the system positive (w = −p_ext ΔV), stated once and used throughout; reversible against irreversible expansion work with a computed p–V comparison; ΔH = ΔU + Δn_g RT; heat capacity, C_V and ΔU, C_p − C_V = R. Thermochemistry and entropy are left to ch11 and ch12.
- Facts a reviewer may wish to double-check: R = 8.314 J K⁻¹ mol⁻¹ (0.0821 L atm K⁻¹ mol⁻¹); 1 L atm = 101.3 J; specific heat of water 4.18 J g⁻¹ K⁻¹, of copper 0.385 J g⁻¹ K⁻¹; monatomic C_V = 3R/2 = 12.47, C_p = 5R/2 = 20.79 J K⁻¹ mol⁻¹ (12.5 and 20.8 used in items). Illustrative values: CaCO₃ ΔU = +175.0 kJ at 1100 K, 2NO + O₂ ΔU = −112.0 kJ, PCl₅ ΔU = 80.0 kJ at 500 K.

## Shape
- **Part 1, 19 slides:** system, surroundings and boundary; classifying everyday systems; intensive and extensive properties; worked example (classify the properties); state of a system and state functions; state functions and path functions compared; thermodynamic processes; naming the process; reversible and irreversible processes; equilibrium; the first law and its sign convention; special cases of the first law; worked example (adiabatic expansion); cyclic processes; summary; exam tips; 3 checks.
- **Part 2, 19 slides:** work of expansion against a constant external pressure; reversible isothermal work; worked example (irreversible expansion); worked example (reversible isothermal expansion); reversible against irreversible work on a p–V graph; why reversible work is the maximum; enthalpy; relation between ΔH and ΔU; worked example (from ΔU to ΔH); heat capacity and specific heat; heat capacity at constant volume and constant pressure; c_V, ΔU and the relation C_p − C_V = R; worked example (heating at constant V and at constant p); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 7 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: svg 10 · table 22. SVGs: open, closed and isolated systems, intensive against extensive (halving a sample), two paths between the same states, the four processes on one p–V diagram (adiabat below the isotherm, checked), a rectangular cycle (net work 608 J), the sign convention, the computed one-step, two-step and reversible work areas (1871, 2495 and 3458 J; the reversible area integrated numerically agrees with 2.303 nRT log(V₂/V₁) within 0.2 %), heat against temperature rise at constant V and p, and rigid vessel against piston; all rendered and checked by eye. Narration 32–61 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c d b a b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1–3 (290 J; -54.4 K; -456 J; -608 J; -5153 J; 184.1 kJ; -416 J; 47 kJ) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 9 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 15 · d2 26 · d3 25 · d4 3.
- **Competency:** recall 5 · understanding 30 · application 25 · analysis 9. Application or higher is **49% of items (60% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 14 · t02 14 · t03 17 · t04 13 · t05 20.
- **Deck checks:** q002, q015, q025 (Part 1); q040, q050, q061 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q014, q038, q052, q060 · B q010, (q024 or q063) · C q023, (q034 or q065) · D q013.
- **Long (40 marks, 100 min):** A q003, q004, q005, q016, q017, q019, q028, q039, q051, q054, q043, q044 · B q012, q045, (q022 or q064) · C q046, q035, q067, (q047 or q066) · D q049, (q036 or q068).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (19 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 23/23 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. An assertion-reason item paired 'specific heat is intensive' with 'heat capacity is extensive', which partly explains A; the reason is now 'water has a larger specific heat than most common liquids', true and clearly unrelated, so (b) is unambiguous.
2. The first build sat at 45 % application or higher; the writer replaced three recall items with genuine application or analysis items (a state-function route problem, a molar heat capacity, a scenario-to-process match). No tags were changed.
3. The producer re-solved every numerical (first-law balances, expansion work, ΔH − ΔU, heat capacities, adiabatic ΔT): all correct.

## Known gaps
- Narration audio is not generated (TTS stage).

