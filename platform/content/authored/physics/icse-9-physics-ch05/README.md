# ICSE Class 9 Physics, Chapter 5 — Pressure in Fluids

`icse-9-physics-ch05` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (3 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch05_short` (20 marks, 30 min) and `t_icse9phy_ch05_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, no deck-check item is used in a test, and no item gives away the answer of another item in the same test. |
| `src/` | `calc.mjs` (every computed value, asserted), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. The shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (imported, not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch05/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX syllabus topics of the chapter: thrust and pressure with units and everyday examples; pressure of a liquid column p = h ρ g, the factors that affect it and the reasons for the shape of a dam and the suit of a diver; transmission of pressure in liquids, Pascal's law and simple numerical problems.
- **Removed topic respected:** the working of hydraulic machines. Nothing in the decks, notes or questions describes a hydraulic press, lift or brake. Pascal's law is taught with a closed vessel of liquid and two pistons, and only the force and pressure transmitted are asked (as the syllabus allows).
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): "state", "define", "give a reason"; numericals with formula, substitution and unit; assertion-reason items in the specimen option order; 10-mark structured questions in parts.
- **Calculation chapter:** 11 numerical items, plus numerical MCQs, calculation short answers and structured parts. Constants: g = 10 m s⁻² in every numerical (stated in the stems); densities in kg m⁻³: water 1000, sea water 1030, kerosene 800, mercury 13 600 (each stem gives the density it needs). Pressures are those of the liquid alone; atmospheric pressure is not included (stated in the notes).
- **Originality:** situations are the writer's own (a brick on a sponge, a girl in high heels, a camel, knife edge, jets from a tall vessel, reservoir and gate, a diver at 25 m, a tank with leaning walls). CBSE 11 Physics (mechanical properties of fluids) and CBSE 10 Science were read and not reused. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Why does a pin go in so easily?; Thrust and pressure; A brick on a sponge; Quick check: which face presses most?; Increasing and reducing pressure; Worked example 1: a girl standing on the floor; Quick check: the unit of pressure; Pressure inside a liquid; Pressure of a liquid column: p = h rho g; Worked example 2: pressure at the bottom of a lake; Quick check: doubling the depth; Pressure grows steadily with depth; Summary; Exam tips. Part 2 (14 slides): Why is a dam thicker at the bottom?; What the pressure depends on; Three vessels, one pressure; Quick check: shape does not matter; Pressure at one depth acts in all directions; Dams and divers; Worked example 1: force on a window under water; Liquids pass on pressure; Pascal's law; Quick check: what Pascal's law says; Worked example 2: force transmitted through a liquid; Quick check: force from pressure; Summary; Exam tips.
- **Visuals (28 of 28 slides):** flow 2, table 21, svg 4, plot 1 (pressure against depth for water, p = 10 000 h).
- **Diagrams (5 distinct SVGs):** a brick on a sponge in three positions (area, pressure, depth of dent); jets from a tall vessel with trajectories from y = x² / 4d (numbered holes 1 to 3); three vessels of different shape with one liquid level; a closed vessel with two pistons (plain, and lettered A to E for a structured question). Drawn with the S helpers and palette colours, geometry computed, rendered to PNG and checked by eye.
- **Narration:** 6–47 words per slide (mean 33); no symbols, formulae, digits or unit abbreviations.

## Question bank (72 items, 150 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 (6 are deck-check items) | 30 |
| assertion-reason | 3 | 3 |
| short-1 (terms) | 3 | 3 |
| true-false | 3 | 3 |
| fill-blank | 3 (blanks: 1, 3, 2) | 6 |
| numerical | 11 | 11 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem; one has a lettered A to E figure, one is built on the jets figure.
- **Difficulty:** d1 31 · d2 32 · d3 8 · d4 1 (the tank and the vessel with leaning walls).
- **Competency:** recall 16 · understanding 20 · application 31 · analysis 5. Application or higher is **50% of items**, inside the 45–65% lint band. The first build was at 46%; five application-level multiple-choice items were added (th-mcq8, lq-mcq8, lq-mcq9, pl-mcq6, pl-mcq7). No tag was changed.
- **Assertion-reason keys:** c b a.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every pressure, force, area, depth and density is computed and asserted in `calc.mjs`; numericals carry scripted re-solve checks.
- Test items were chosen so that no item names the answer of another in the same test (for example the dam, diver and shape-of-vessel items are spread so that no test item states what a structured question in the same test asks for).

## For a reviewer
- **Constants:** g = 10 m s⁻²; water 1000, sea water 1030, kerosene 800, mercury 13 600 kg m⁻³. 1 cm² = 10⁻⁴ m².
- **Pressure of the liquid only:** atmospheric pressure is left out of every calculation; the notes say so.
- **Pascal's law scope:** the two-piston vessel is used only to state that the pressure is the same everywhere and to find the transmitted pressure and the force on the second piston. Hydraulic machines are not mentioned.
- **Jets figure:** the trajectories are exact for ideal jets (speed from √(2 g d), drop x² / 4d), so jets from different holes cross each other; the holes lie in the upper part of the vessel so that deeper jets land farther.
- **Vessel with leaning walls (long-tank, part d):** the force on the base is p × A, the same as for the straight tank; the weight of liquid is greater than that force because the sloping walls carry part of it. This is a standard hydrostatic result and is marked as the hardest item of the chapter.
- **High-heel question:** a qualitative item only; no numbers.
