# CBSE Class 9 Science, Chapter 10 — Reproduction

`cbse-9-science-ch10` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 19 slides), notes (6 sections), 31 flashcards, 56 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch10_short` (20 marks, 40 min) and `t_cbse9sci_ch10_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Modes of reproduction; t02 Sexual reproduction in plants; t03 Sexual reproduction in humans; t04 Reproductive health and adolescence.
- Age-appropriate treatment for Class 9: factual, respectful language; human reproductive systems as simple labelled schematic outlines; puberty changes, menstrual and personal hygiene, nutrition, a myths-and-facts slide and a “whom to ask” slide. Contraception is not in this syllabus and is not covered.
- Facts a reviewer may wish to double-check: Adolescence about 10 to 19 years and puberty usually about 10 to 14; menstruation 3 to 7 days in a cycle of about 28 days (21 to 35 normal); gestation about nine months; pollination agents and examples (Vallisneria by water, silk cotton by birds and bats, maize and wheat by wind); fertilisation usually in the fallopian tube. Seed counts and calendar examples are illustrative.

## Shape
- **Part 1, 18 slides:** why do organisms reproduce?; fission and budding; fragmentation, regeneration and spores; vegetative propagation; worked example (which method is it?); sexual reproduction; parts of a flower; section through a flower; pollination; pollen tube and fertilisation; worked example (ovules to seeds); after fertilisation: seed and fruit; summary; exam tips; 3 checks.
- **Part 2, 19 slides:** gametes and fertilisation in humans; the male reproductive system; male organs and their functions; the female reproductive system; female organs and their functions; worked example (following an egg); adolescence and puberty; the menstrual cycle; worked example (marking the calendar); menstrual hygiene; looking after your body; myths and facts; whom to ask, and staying safe; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 8 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: svg 8 · table 21. Eight SVGs (fission and budding, Hydra, Spirogyra, Planaria and Rhizopus, vegetative propagation, flower, pollen tube and fertilisation, ovule to seed and ovary to fruit, female and male reproductive systems), rendered and checked. Narration 16–70 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (56)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b d a c c) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 2 | 1–3 (24 seeds; 11) |
| short (2 marks) | 6 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 16 · d2 33 · d3 6 · d4 1.
- **Competency:** recall 9 · understanding 20 · application 18 · analysis 8 · evaluation 1. Application or higher is **48% of items (42% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 14 · t02 18 · t03 9 · t04 15.
- **Deck checks:** q001, q015, q016 (Part 1); q033, q034, q042 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q017, q035, q020, q006 · B q010, q028, q011 · C (q013 or q030) · D q014.
- **Long (40 marks, 90 min):** A q002, q003, q005, q018, q019, q036, q043, q045, q021, q037 · B q027, q040, (q050 or q051), q012, (q029 or q052) · C q041, (q031 or q054) · D q032, q055.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (15 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 2/2 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed the sensitive content and every diagram.
2. **Fixes.** The producer sent two diagrams back to the writer: the male-system schematic drew the penis running through the scrotum, and the flower drew the stamen filaments starting inside the ovary. Both were redrawn correctly, with new self-checks (penis separate from and above the scrotum; filaments arising from the thalamus outside the ovary).
3. **The two numericals (seeds from fertilised ovules) are computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

