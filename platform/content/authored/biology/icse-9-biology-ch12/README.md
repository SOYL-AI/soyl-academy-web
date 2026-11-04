# ICSE Class 9 Biology, Chapter 12 — The Skin

`icse-9-biology-ch12` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (3 sections), 30 flashcards, 76 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch12_short` (20 marks, 30 min) and `t_icse9bio_ch12_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch12/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX syllabus topics: structure of the skin (epidermis and dermis and their parts) and functions of the skin; derivatives of the skin (sweat glands, sebaceous glands, hair, nails and mammary glands); heat regulation by vasodilation and vasoconstriction (with sweating, erect hairs and shivering).
- No removed topics for this chapter. Skin diseases and disorders (acne, eczema, skin cancer) are not taught.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a lettered-diagram match or fill-in, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a farmer darker than his sister, a girl touching a hot pan, a washerwoman's hands, a cyclist's sweat and its heat, a mountaineer's toe in the snow, a boy with almost no sweat glands) are written by SOYL and differ from CBSE 10 Science (control and coordination, life processes), ISC 11 and CBSE 11 Biology. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): The Skin; A vertical section of the skin; The epidermis; The dermis; Quick check: the pigment; Functions of the skin; Worked example 1: counting sweat glands; The skin as a sense organ; Quick check: the outermost layer; Derivatives of the skin; Worked example 2: which derivative is at fault?; Quick check: sebum; Hair and nails; Summary; Exam tips. Part 2 (16 slides): Keeping the Temperature Steady; Why a steady temperature matters; Heat gain and heat loss; The skin on a hot day and on a cold day; A hot day: vasodilation; Quick check: widening vessels; A hot day: sweating; Worked example 1: heat lost by sweating; A cold day: vasoconstriction; Quick check: narrowing vessels; A cold day: other responses; Worked example 2: reading the fingertip temperature; Hot day and cold day compared; Quick check: cooling by sweat; Summary; Exam tips.
- **Visuals (23 of 31 slides):** flow 2, table 19, svg 2.
- **Diagrams (4 distinct SVGs):** a vertical section of the human skin (named, and lettered A-E); the skin on a hot day beside the skin on a cold day (named with the terms, and lettered P and Q with parts A-D so that the day is not given). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (the drops of sweat and the standing hairs in the lettered climate figure were cleared of their labels).
- **Narration:** 4–50 words per slide (mean 35); no symbols or abbreviations.

## Question bank (76 items, 164 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 28 |
| assertion-reason | 4 | 4 |
| short-1 (terms, odd one out, give reason) | 8 | 8 |
| true-false | 4 | 4 |
| fill-blank-5 | 1 | 5 |
| numerical | 6 | 6 |
| match-5 | 1 | 5 |
| short-2 | 10 | 20 |
| short-3 | 8 | 24 |
| long-10 (structured) | 6 | 60 |

- **MCQ deck-check items:** 6 of the mcq items; none is used in a test.
- **Structured questions:** 6, each 10 marks in 4 parts with the part marks in the stem; each has a labelled-diagram part (a hair with its follicle, a sweat gland, a skin section, the skin on a hot day, the skin on a cold day, a skin section again). The diagram part draws something that the other parts do not name.
- **Difficulty:** d1 23 · d2 45 · d3 7 · d4 1.
- **Competency:** recall 21 · understanding 14 · application 34 · analysis 6 · evaluation 1. Application or higher is **54% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** c a d b.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; computed values are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test items were chosen so that no stem or option names the answer of another item in the same test.

## For a reviewer
- **Epidermis layers:** the chapter names the horny layer (dead, keratin) and the Malpighian layer (living, dividing, melanin), as in ICSE textbooks. Modern books name four or five sub-layers (stratum corneum, lucidum, granulosum, spinosum, basale); these are not taught.
- **Fat layer:** shown below the dermis; books vary on calling it part of the dermis or a separate hypodermis.
- **Sweat:** water, salts and a little urea. Evaporative heat loss is taken as about 2.4 kilojoules for each millilitre of sweat, a commonly quoted value; the volumes and temperatures in the questions are imagined and illustrative.
- **Erect hairs:** the notes say that in humans this response is weak; the questions use it only as a standard ICSE point (hairs trap air, a poor conductor of heat).
- **Shivering:** is a response of the muscles, not of the skin; it is included in the cold-day answers because books list it with the skin's responses.
- **Mammary glands:** treated as skin derivatives (modified sweat glands), as in the syllabus; no lactation physiology is taught.
- The drawings are schematic (the skin section is not to scale; the climate figure shows only the features that change).
