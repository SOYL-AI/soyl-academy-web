# ICSE Class 9 Physics, Chapter 2 — Motion in One Dimension

`icse-9-physics-ch02` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (5 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch02_short` (20 marks, 30 min) and `t_icse9phy_ch02_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs` (diagrams, with self-checks), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the shared authoring library is `../../icse-9-physics-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch02/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX topics of the chapter: scalars and vectors, rest and motion, distance and displacement; speed, velocity, uniform and variable motion, acceleration and retardation; distance-time and velocity-time graphs (slope and area); the four equations of uniformly accelerated motion derived graphically and used in numericals; motion under gravity (free fall and vertical throw).
- **Removed topic respected:** motion with non-uniform acceleration is never asked; every equation item states or implies uniform acceleration, and curved graphs appear only as the "variable speed" shape on a distance-time graph.
- **g = 10 m s⁻²** is stated in every free-fall stem (and in the notes and decks, with a note that some books use 9.8).
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): short stems, numericals with formula, substitution and unit, graph reading and graphical derivations; assertion-reason items in the specimen option order.
- **Calculation chapter:** 12 numerical items plus calculation short answers and structured parts.
- **Originality:** situations and numbers differ from CBSE 11 Physics ch02 (straight-line motion), CBSE 9 Science ch03 (motion) and ICSE 10 Physics; exact-stem and originality checks report no duplicates. Seven stems that were close to CBSE 9 Science ch03 items were reworded.

## Shape
- **Decks:** Part 1 (17 slides): Describing motion; Scalars and vectors; Distance and displacement; Quick check: displacement; Worked example 1: distance and displacement; Speed, velocity and uniform motion; Worked example 2: average speed; Quick check: average speed; Acceleration and retardation; Worked example 3: acceleration; Quick check: acceleration; Distance-time graphs; Velocity-time graphs; Worked example 4: reading a velocity-time graph; Quick check: reading a graph; Summary; Exam tips. Part 2 (17 slides): Equations for uniform acceleration; Derivations 1, 2 and 3; Which equation to use; Quick check; Worked example 1: a car speeds up; Worked example 2: stopping distance; Quick check: braking; Free fall; Worked example 3: a dropped stone; A body thrown vertically upward; Worked example 4: a ball thrown upward; Quick check: dropped body; Quick check: thrown upward; Summary; Exam tips.
- **Visuals (34 of 34 slides):** flow 2, table 23, svg 9.
- **Diagrams (11 distinct SVGs):** distance-time graph of a toy car (points lettered O, A, B, C); velocity-time graph of a tram, plain and with the areas shaded; the three standard shapes for each type of graph; the derivation figure (named, and lettered A to E for a structured question); the bus path (distance and displacement) and a number-line path; free fall positions each second; a vertical throw with height and velocity each second. All geometry is computed from `calc.mjs` data and self-checked (7 checks); each SVG was rendered to PNG and checked by eye.
- **Narration:** 14–47 words per slide (mean 32); no symbols, formulae or unit abbreviations.

## Question bank (70 items, 146 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 (8 are deck-check items) | 24 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 3 | 3 |
| true-false | 6 | 6 |
| fill-blank | 2 | 2 |
| numerical | 12 | 12 |
| match-5 | 1 | 5 |
| short-2 | 6 | 12 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem: a distance-time graph, a velocity-time graph, the graphical derivation (with the lettered figure), braking, a vertical throw, a stone in a well.
- **Difficulty:** d1 21 · d2 35 · d3 13 · d4 1 (the vertical-throw structured question).
- **Competency:** recall 14 · understanding 18 · application 34 · analysis 4. Application or higher is **54% of items**, inside the 45–65% lint band. No tag was changed.
- **Assertion-reason keys:** c b d a (all four options used).

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; all distances, speeds, accelerations, areas, stopping distances, heights and times are computed and asserted in `calc.mjs`, and the build's scripted re-solve checks all pass.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that none states the answer or the rule needed for another in the same test (for example the velocity-time area items are kept out of the tests that contain the graph questions).

## For a reviewer
- **g = 10 m s⁻²**, as the brief requires; the notes say some books use 9.8. Free-fall times and heights are therefore round numbers (45 m in 3 s, 20 m up from 20 m s⁻¹).
- **Sign convention:** equations of motion use the direction of motion as positive; retardation is written as a negative acceleration (for example −5 m s⁻²) and quoted as a positive retardation in words. For a throw, upward is positive and a = −g.
- **Definitions:** displacement is "the shortest distance from the initial to the final position in the direction from start to end" (ICSE textbook wording); uniform motion is "equal distances in equal intervals of time, however small".
- **Graphs:** velocity-time areas use triangles and rectangles only; the tram graph (0 to 12 m s⁻¹ in 6 s, 4 s steady, 12 to 0 in 3 s) gives 102 m and an average speed of 7.85 m s⁻¹ (to two decimals). The distance-time graph of the toy car has an average speed of 5 m s⁻¹.
- **Derivations:** the three graphical derivations (v = u + at from the slope; S = ut + ½at² from rectangle plus triangle; S = ½(u + v)t from the trapezium, then v² = u² + 2aS by eliminating t) follow the usual ICSE textbook treatment.
- **Not asked:** motion with non-uniform acceleration (removed); calculus; relative velocity.
