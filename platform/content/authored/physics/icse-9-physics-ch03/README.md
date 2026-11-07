# ICSE Class 9 Physics, Chapter 3 — Force and Newton's Laws of Motion

`icse-9-physics-ch03` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (5 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch03_short` (20 marks, 30 min) and `t_icse9phy_ch03_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs` (diagrams, with self-checks), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the shared authoring library is `../../icse-9-physics-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch03/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX topics of the chapter: contact forces (friction, normal reaction, tension) and non-contact forces (gravitational, electric, magnetic) with the inverse square dependence; units of force (newton, dyne, kgf, gf); Newton's first law, inertia of rest and of motion, and the definition of force; linear momentum p = mv, the second law as rate of change of momentum, F = ma and its use with the equations of motion, and the fielder's catch; Newton's third law and action-reaction pairs.
- **Removed topics respected:** inertial mass is never taught or asked (inertia is treated only as the tendency to keep the state of rest or motion, with no statement that mass measures it); kgf and gf appear **only in conversions**: every F = ma numerical uses newton or dyne.
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): short stems, "state", "define", "give a reason", numericals with formula, substitution and unit; assertion-reason items in the specimen option order.
- **Calculation chapter:** 13 numerical items plus calculation short answers and structured parts. Constants: 1 N = 10⁵ dyne; 1 kgf = 9.8 N (10 N where a stem says g = 10 m s⁻²); 1 gf = 980 dyne.
- **Originality:** situations and numbers differ from CBSE 11 Physics ch03 (laws of motion), CBSE 9 Science (force and laws of motion) and ICSE 10 Physics; exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): What is a force?; Contact forces; Non-contact forces and the inverse square law; Quick check: kinds of force; Units of force: newton and dyne; Gravitational units: kgf and gf; Worked example 1: converting units of force; Quick check: units; Newton's first law and inertia; Inertia of motion in everyday life; Quick check: inertia; Worked example 2: the inverse square law; Quick check: the inverse square law; Summary; Exam tips. Part 2 (16 slides): From momentum to force; Linear momentum; The second law: F = ma; Quick check: F = ma; Worked example 1: F = ma with equations of motion; Quick check: force and motion; Worked example 2: force from a change of momentum; Why a fielder draws the hands back; Quick check: a longer stopping time; Newton's third law; Pairs in walking, rowing and rockets; Why action and reaction do not cancel; Quick check: a pair; Worked example 3: finding a pair in a situation; Summary; Exam tips.
- **Visuals (31 of 31 slides):** flow 2, svg 7, table 22.
- **Diagrams (8 distinct SVGs):** a block with tension, friction, normal reaction and weight; the inverse square graph (36, 9, 4 and 2.25 N); a coin dropping into a tumbler (inertia of rest); a passenger in a braking bus (inertia of motion); a fielder catching a ball with hands fixed and drawn back; the boy-and-wall action-reaction diagram (named, and lettered A to E for a structured question); a rocket. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 9–46 words per slide (mean 33); no symbols, formulae or unit abbreviations.

## Question bank (71 items, 149 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 (8 are deck-check items) | 24 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 2 | 2 |
| true-false | 5 | 5 |
| fill-blank | 2 | 2 |
| numerical | 13 | 13 |
| match-5 | 1 | 5 |
| short-2 | 8 | 16 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem: units of force, inertia (coin, bus, seat belts), the second law with a truck, catching a ball (with figure), the boy-and-wall pairs (with the lettered figure), and a sled with F = ma and the equations of motion.
- **Difficulty:** d1 20 · d2 34 · d3 16 · d4 1 (the sled structured question).
- **Competency:** recall 14 · understanding 22 · application 30 · analysis 5. Application or higher is **49% of items**, inside the 45–65% lint band. No tag was changed.
- **Assertion-reason keys:** a c d b (all four options used).

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; all conversions, momenta, forces, accelerations, speeds and times are computed and asserted in `calc.mjs`, and the build's scripted re-solve checks all pass.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that none states the answer or the rule needed for another in the same test (for example the inertia and action-reaction items are kept apart from the tests that hold the matching structured questions).

## For a reviewer
- **Constants:** 1 N = 10⁵ dyne; 1 kgf = 9.8 N (a g = 10 m s⁻² stem uses 10 N, stated in the stem); 1 gf = 980 dyne. kgf and gf are conversion-only, as the removed-topic note on units other than cgs and SI in second-law numericals requires.
- **Definitions:** newton and dyne are defined from F = ma; first law "a body continues in its state of rest or of uniform motion in a straight line unless an external force acts on it"; force is "that which changes or tends to change the state of rest or of uniform motion"; second law in terms of the rate of change of momentum; the third law lists equal size, opposite direction, different bodies, same time.
- **Inverse square:** stated for "many" non-contact forces (gravitational, electric, magnetic between poles or charges), with numerical use limited to the proportionality F ∝ 1/r².
- **Inertial mass** is not mentioned; the notes say only that inertia is the tendency to keep the state of rest or motion.
- **Third law:** the weight of a book and the normal reaction on it are explicitly called out as not a pair; the boy-and-wall figure treats friction at the feet (E) as balancing the push of the wall (B) on the boy. Conservation of momentum is not used (not in the Class IX scope).
- **Second law numericals:** the fielder (0.14 kg at 30 m s⁻¹, 0.04 s against 0.14 s) gives 105 N against 30 N, a ratio of 3.5; the truck (2000 kg, 5 to 12 m s⁻¹ in 7 s) gives 14000 kg m s⁻¹ and 2000 N, checked against F = ma.
