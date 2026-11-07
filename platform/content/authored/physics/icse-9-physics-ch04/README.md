# ICSE Class 9 Physics, Chapter 4 — Gravitation

`icse-9-physics-ch04` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (3 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch04_short` (20 marks, 30 min) and `t_icse9phy_ch04_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, no deck-check item is used in a test, and no item gives away the answer of another item in the same test. |
| `src/` | `calc.mjs` (every computed value, asserted), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. The shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (imported, not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch04/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX syllabus topics of the chapter: the universal law of gravitation (statement, equation, importance and applications, ratio-type changes); gravity, acceleration due to gravity and free fall; mass and weight (comparison, weight in newton and kgf).
- **Removed topic respected:** problems on the variation of g. No item asks for g at a height, at a depth or on another planet. The Moon appears only in qualitative items (mass the same, weight smaller because g is smaller).
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): "state", "define", "give a reason"; numericals with formula, substitution and unit; assertion-reason items in the specimen option order; 10-mark structured questions in parts.
- **Calculation chapter:** 11 numerical items, plus calculation short answers and structured parts. Constants: G = 6.67 × 10⁻¹¹ N m² kg⁻²; g = 10 m s⁻² or 9.8 m s⁻² (each stem says which); 1 kgf = 9.8 N (stated where used).
- **Originality:** situations are the writer's own (mango, steel balls, two ships, two girls, a tower, a coin-and-feather tube, a sack of rice). No textbook or specimen item is reproduced. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Why does the apple fall?; Every body attracts every other body; The universal law of gravitation; What each symbol means; Quick check: the unit of G; A pair of equal and opposite forces; Quick check: the pull of a mango; Changing the masses or the distance; Worked example 1: a ratio problem; Quick check: two factors at once; The graph of force against distance; Worked example 2: the pull between two students; Why the law matters; Summary; Exam tips. Part 2 (15 slides): Dropping things; Gravity and the acceleration due to gravity; Free fall; Speed and distance in free fall; Quick check: the strobe picture; Worked example 1: speed and distance after two seconds; Why heavy and light bodies fall together; Mass and weight; Weight on a spring balance; Quick check: reading the balance; Newton and kilogram force; Worked example 2: weight of a parcel; Quick check: kgf and newton; Summary; Exam tips.
- **Visuals (30 of 30 slides):** flow 2, table 24, svg 3, plot 1 (force against distance, F = 64 / r²).
- **Diagrams (4 distinct SVGs):** two bodies attracting with equal and opposite forces (labelled, and lettered A to E for a structured question); a strobe picture of a falling ball (0, 5, 20, 45 m at 0 to 3 s); a spring balance marked in kgf and newton. Drawn with the S helpers and palette colours, geometry computed, rendered to PNG and checked by eye.
- **Narration:** 15–46 words per slide (mean 36); no symbols, formulae, digits or unit abbreviations.

## Question bank (67 items, 144 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 (6 are deck-check items) | 25 |
| assertion-reason | 3 | 3 |
| short-1 (terms) | 3 | 3 |
| true-false | 3 | 3 |
| fill-blank | 3 (one with 3 blanks) | 5 |
| numerical | 11 | 11 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem; one has a lettered A to E figure, one is built on a data table.
- **Difficulty:** d1 25 · d2 29 · d3 12 · d4 1 (the mango and the Earth).
- **Competency:** recall 15 · understanding 18 · application 27 · analysis 7. Application or higher is **51% of items**, inside the 45–65% lint band. No tag was changed to reach the band.
- **Assertion-reason keys:** c b d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every force, ratio, time, speed, distance and weight is computed and asserted in `calc.mjs`; numericals carry scripted re-solve checks.
- Test items were chosen so that no item names the answer of another in the same test (for example the Moon items and the mango-and-Earth pair are kept in different tests from the structured questions that cover them).

## For a reviewer
- **Constants:** G = 6.67 × 10⁻¹¹ N m² kg⁻²; g = 9.8 m s⁻² with 10 m s⁻² used in most numericals (every stem states the value); 1 kgf = 9.8 N (the notes say books differ between 9.8 and 10).
- **Answers in standard form:** the numericals on G ask for the answer in units of 10⁻⁸ N so that the key is a plain number; the solutions show the full standard-form working.
- **Hypothetical force:** the structured question on the lettered figure gives "0.60 N" as the force at the drawn separation purely to practise the ratio method; it is not a claim about real lead spheres.
- **Earth's mass** (6 × 10²⁴ kg) is given in the stem of the mango question; the Earth's acceleration is 2.5 × 10⁻²⁵ m s⁻².
- **Scope calls:** v = g t and s = ½ g t² are used for free fall (equations of motion belong to Chapter 2 of this course); the item that asks about the acceleration at the top of a vertical throw is conceptual only. Qualitative remarks that g is smaller on the Moon are included; no numerical problem uses g on another body or at another height.
