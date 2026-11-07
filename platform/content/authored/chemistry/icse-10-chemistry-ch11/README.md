# ICSE Class 10 Chemistry, Chapter 11 — Study of Compounds: Nitric Acid

`icse-10-chemistry-ch11` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (7 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch11_short` (20 marks, 30 min) and `t_icse10chem_ch11_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Laboratory preparation of nitric acid from potassium or sodium nitrate: apparatus and precautions; t02 Manufacture by Ostwald's process (equations and conditions); t03 Nitric acid as an oxidising agent: reactions with copper, carbon and sulphur; t04 Acidic properties: with magnesium and manganese, oxides, hydroxides, carbonates, hydrogen carbonates, sulphites and hydrogen sulphites; t05 Test for nitric acid.
- Removed topics are respected: Plant details of Ostwald's process (only equations with conditions).
- Facts a reviewer may wish to double-check: Sulphites and hydrogen sulphites with dilute HNO₃ are written as giving SO₂, following the syllabus wording (strictly, nitric acid partly oxidises sulphite to sulphate). Ostwald’s process: NH₃ : air about 1 : 10, Pt gauze at about 800 °C, no plant details. Very dilute (about 1%) HNO₃ gives hydrogen only with Mg and Mn. Nascent-oxygen equations (2HNO₃ → H₂O + 2NO₂ + [O]) are in plain text only; the brown ring is attributed to FeSO₄·NO.

## Shape
- **Part 1, 15 slides:** laboratory preparation; an all-glass apparatus; why keep the temperature below 200 °C?; worked example (how much acid?); why the acid looks yellow; ostwald’s process: step 1; ostwald’s process: steps 2 and 3; worked example (acid from ammonia); physical properties; summary; exam tips; 3 checks.
- **Part 2, 15 slides:** why it oxidises; copper and concentrated nitric acid; copper and dilute nitric acid; worked example (volume of nitrogen dioxide); carbon and sulphur; hydrogen only from very dilute acid; nitric acid as an acid; worked example (matching equations to observations); tests for nitric acid; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 12 · diagram 2 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 5 · flow 1 · svg 2 · table 16. Two SVGs (all-glass retort apparatus with the receiver cooled in water, labelled no cork or rubber; the brown-ring test tube); Ostwald’s process as a flow. Narration 15–68 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c a d c b) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 3 | 1 or 2 (12.6 g; 8.96 L; 2.24 L) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 23 · d2 27 · d3 12 · d4 2.
- **Competency:** recall 13 · understanding 14 · application 27 · analysis 10. Application or higher is **58% of items (73% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 20 · t02 10 · t03 21 · t04 15 · t05 7.
- **Deck checks:** q001, q002, q017 (Part 1); q025, q026, q052 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q003, q028, q006, q053, q007, q012, q032, q055, q016 · B (q061 or q063).
- **Long (40 marks, 60 min):** A q018, q020, q040, q041, q042, q043, q021, q023, q047, q048, q049, q013, q057, q058 · B (q060 or q062 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Fixes.** A wrong aside about the nascent-oxygen ratio was corrected (one O per two HNO₃ for the concentrated acid, three O per two HNO₃ for the dilute acid); stems close to ICSE ch10 and CBSE 10 ch02 were reworded; the tests were rearranged so Section A does not give away Section B.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Chemistry specimen paper (522) order and wording; every key re-mapped so each item's meaning is unchanged.
