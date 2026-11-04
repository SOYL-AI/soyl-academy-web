# CBSE Class 9 Science, Chapter 11 — Diversity

`cbse-9-science-ch11` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); a first Sonnet writer drafted it and a second Sonnet writer finished it after a session limit; reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 19 slides), notes (7 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch11_short` (20 marks, 40 min) and `t_cbse9sci_ch11_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Importance of classification; five-kingdom classification; t02 Major divisions of plants and animals; t03 Binomial nomenclature; t04 Acellular entities: viruses; ecological roles of organisms.

- Facts a reviewer may wish to double-check: Whittaker’s five kingdoms (1969); cryptogams and phanerogams; eight invertebrate phyla plus Chordata with five vertebrate classes; heart chambers (amphibians three, reptiles three, crocodiles four); scientific names Mangifera indica, Azadirachta indica, Panthera tigris, Panthera leo, Homo sapiens, Pavo cristatus, Tamarindus indica, with ranks for tiger and mango; viruses about 20–300 nm (approximate). Survey and compost data are labelled given.

## Shape
- **Part 1, 18 slides:** why do we classify?; the hierarchy of ranks; worked example (who is the closest relative?); five kingdoms of Whittaker; the three questions side by side; monera and Protista; fungi, Plantae and Animalia; worked example (which kingdom?); classifying plants: divisions; thallophyta and Bryophyta; pteridophyta and gymnosperms; angiosperms: monocots and dicots; summary; exam tips; 3 checks.
- **Part 2, 19 slides:** animal kingdom: a tree of groups; animals without a backbone; chordata and the five vertebrate classes; worked example (which group?); binomial nomenclature; rules for writing a scientific name; worked example (correct the names); viruses: acellular entities; why viruses have no kingdom; how a virus multiplies; ecological roles: producers, consumers, decomposers; fungi and bacteria at work; worked example (roles in a pond); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 20 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 5 · table 23. Five SVGs (five-kingdom chart, plant divisions, animal classification tree, virus schematic with a scale bar, food-web roles), 20 self-checks, rendered and checked. Narration 12–69 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a a d b b c) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 2 | 1–3 (35 %; 25 times) |
| short (2 marks) | 10 | 2 (30–50 words) |
| short (3 marks) | 7 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 8 · d2 46 · d3 11 · d4 1.
- **Competency:** recall 5 · understanding 19 · application 27 · analysis 14 · evaluation 1. Application or higher is **64% of items (59% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 18 · t02 26 · t03 11 · t04 12.
- **Deck checks:** q001, q003, q019 (Part 1); q030, q045, q059 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q005, q022, q047, q049 · B q016, q051, q062 · C (q018 or q042) · D q043.
- **Long (40 marks, 90 min):** A q002, q004, q006, q020, q031, q033, q048, q055, q024, q034 · B q014, q026, (q039 or q061), q017, (q041 or q063) · C q029, (q054 or q064) · D q065, q066.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (20 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 2/2 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by Sonnet 5.5 writers (sub-agents spawned with model sonnet); the producer reviewed names, classification and diagrams.
2. **Fixes by the second writer.** The alternative to a dichotomous-key case part was wrong (a sponge fits neither branch of step 5) and was rewritten; two SVG label positions were fixed.
3. **The two numericals (size ratio, decomposition) are computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

