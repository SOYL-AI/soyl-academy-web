# ICSE Class 10 Chemistry, Chapter 12 — Study of Compounds: Sulphuric Acid

`icse-10-chemistry-ch12` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch12_short` (20 marks, 30 min) and `t_icse10chem_ch12_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch12/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Manufacture by the Contact process (equations and conditions); t02 Dilute sulphuric acid as a dibasic acid: reactions with metals, oxides, hydroxides, carbonates, hydrogen carbonates, sulphites, hydrogen sulphites and sulphides; t03 Concentrated sulphuric acid as an oxidising agent: oxidation of carbon and sulphur; t04 Concentrated sulphuric acid as a dehydrating agent: sugar and copper(II) sulphate crystals; t05 Non-volatile nature: reactions with sodium or potassium chloride and nitrate; tests for sulphuric acid.
- Removed topics are respected: Plant details of the Contact process (only equations with conditions).
- Facts a reviewer may wish to double-check: Contact process at about 450 °C as a compromise between rate and yield, V₂O₅ catalyst, 1–2 atm; boiling point of H₂SO₄ about 338 °C; H₂S cannot be dried by the concentrated acid (H₂S + H₂SO₄ → S + SO₂ + 2H₂O); marble with dilute H₂SO₄ stops because of a CaSO₄ coating; CuSO₄·5H₂O dehydration kept in plain text.

## Shape
- **Part 1, 15 slides:** contact process, step 1: sulphur dioxide; contact process, step 2: the catalytic step; contact process: the whole route; why not dissolve SO₃ in water?; worked example (acid from sulphur); a dibasic acid; dilute acid with metals, oxides and hydroxides; dilute acid with salts of weaker acids; worked example (the reaction that stops); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** oxidising agent: carbon and sulphur; worked example (gas from charcoal); dehydrating agent: sugar; dehydrating agent: blue vitriol; dehydration is not drying; which gases can it dry?; non-volatile acid; worked example (identifying a sulphate); tests for sulphuric acid; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 12 · diagram 2 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 3 · flow 2 · svg 2 · table 17. Two SVGs (sugar charred by concentrated sulphuric acid; blue copper sulphate crystals turning to white powder); the Contact process and the sulphate test as flows. Narration 13–66 words (mean 48), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a c d b a) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 3 | 1 or 2 (49 g; 23.3 g; 11.2 L) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 21 · d2 31 · d3 10 · d4 2.
- **Competency:** recall 10 · understanding 15 · application 31 · analysis 8. Application or higher is **61% of items (78% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 15 · t02 21 · t03 10 · t04 18 · t05 14.
- **Deck checks:** q001, q002, q014 (Part 1); q032, q037, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q004, q033, q038, q003, q041, q009, q035, q045, q047 · B (q061 or q063).
- **Long (40 marks, 60 min):** A q015, q016, q017, q018, q051, q052, q021, q024, q025, q026, q028, q054, q057, q058 · B (q060 or q062 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Specific stems.** The CBSE 10 ch02 set-ups (zinc and soap bubbles, the dilution assertion-reason, percentage of water in blue vitriol) and the ICSE ch09 dilute-HCl gas match are not reused.
3. **Every equation re-balanced** and every numerical re-computed by the build script (49 g, 11.2 L, 23.3 g and the long-question values).

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

