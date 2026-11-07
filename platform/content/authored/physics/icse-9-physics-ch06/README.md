# ICSE Class 9 Physics, Chapter 6 — Upthrust and Archimedes' Principle

`icse-9-physics-ch06` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (5 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch06_short` (20 marks, 30 min) and `t_icse9phy_ch06_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, no deck-check item is used in a test, and no item gives away the answer of another item in the same test. |
| `src/` | `calc.mjs` (every computed value, asserted), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. The shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (imported, not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch06/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: buoyancy and upthrust (definition, direction, factors); Archimedes' principle and apparent weight; relative density and its experimental determination for a solid denser than water and for a liquid; floatation (sink, float fully immersed, float partly immersed, the law of floatation, the fraction of volume immersed); applications to ships, submarines, icebergs and balloons.
- No removed topics for this chapter.
- **Numericals on all three cases:** sinking (num-up, num-app, num-iron, num-oil, and apparent-weight parts), floating fully immersed (num-brine; block B in long-float; the submarine ballast question) and floating partly immersed (num-wood, num-ice, num-boat, num-cork; block C in long-float; fl-short3).
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): "state", "define", "give a reason"; numericals with formula, substitution and unit; experiment-based items (spring balance readings); assertion-reason items in the specimen option order; 10-mark structured questions in parts.
- **Calculation chapter:** 12 numerical items, plus numerical MCQs, calculation short answers and structured parts. Constants: g = 10 m s⁻²; densities in kg m⁻³: water 1000, sea water 1030, brine 1200, oil 800, ice 900 (deck, iceberg figure and the structured iceberg question) and 920 (the numerical on ice), air 1.2, helium 0.18 (each stem gives the density it needs).
- **Originality:** situations are the writer's own (a body on a spring balance, an overflow can, three blocks, a pine log, an iron block, a boat, cork, an iceberg, a submarine of 3000 m³, a helium balloon). CBSE 11 Physics (mechanical properties of fluids) and CBSE 10 Science were read and not reused. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Why do we feel lighter in water?; Buoyancy and upthrust; A body in air and in water; Quick check: why does the reading fall?; Archimedes' principle; Apparent weight; Worked example 1: upthrust and apparent weight; Quick check: finding the upthrust; What upthrust depends on; Density and relative density; Finding the RD of a solid denser than water; Worked example 2: relative density of a metal piece; Quick check: relative density; Finding the RD of a liquid; Summary; Exam tips. Part 2 (16 slides): Why does a steel ship float?; Sink, float or rise?; Three cases in pictures; Quick check: will it sink?; The law of floatation; The fraction of the volume immersed; Worked example 1: a floating log; Quick check: how much is immersed?; Floating fully immersed; Ships; Icebergs; Submarines and balloons; Quick check: the submarine; Worked example 2: an iceberg; Summary; Exam tips.
- **Visuals (32 of 32 slides):** flow 2, table 26, svg 4.
- **Diagrams (5 distinct SVGs):** a body on a spring balance in air and in water (with readings, and lettered A to E with the scales left to be read); an overflow can; three cases of sinking, floating fully immersed and floating partly immersed; an iceberg drawn with its computed fractions. Drawn with the S helpers and palette colours, geometry computed, rendered to PNG and checked by eye.
- **Narration:** 7–43 words per slide (mean 34); no symbols, formulae, digits or unit abbreviations.

## Question bank (69 items, 146 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 (6 are deck-check items) | 26 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 3 | 3 |
| true-false | 3 | 3 |
| fill-blank | 2 (blanks: 1, 3) | 4 |
| numerical | 12 | 12 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem; one has a lettered A to E figure with a scale-reading part.
- **Difficulty:** d1 26 · d2 24 · d3 18 · d4 1 (the helium balloon).
- **Competency:** recall 17 · understanding 15 · application 29 · analysis 8. Application or higher is **54% of items**, inside the 45–65% lint band. No tag was changed.
- **Assertion-reason keys:** c b d a.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every upthrust, apparent weight, relative density, fraction, volume and force is computed and asserted in `calc.mjs`; numericals carry scripted re-solve checks.
- Test items were chosen so that no item names the answer of another in the same test (for example the iceberg multiple-choice item and the structured iceberg question are in different tests, as are the submarine items and the apparent-weight items).

## For a reviewer
- **Constants:** g = 10 m s⁻²; water 1000, sea water 1030, brine 1200, oil 800, ice 900 or 920, air 1.2, helium 0.18 kg m⁻³. 1 cm³ = 10⁻⁶ m³. Books give ice as 900 to 920 kg m⁻³ and sea water as 1020 to 1030, so every stem states the values used.
- **Relative density of a liquid:** the notes and the numericals use one solid that sinks in both liquids, with W₁ in air, W₂ in water and W₃ in the liquid: RD = (W₁ − W₃) ÷ (W₁ − W₂). Some books use a density bottle; the syllabus asks only for the experimental idea.
- **Plimsoll line:** named once in the notes as a fact about ships; no item asks about it.
- **Iceberg figure:** drawn with computed fractions for ice 900 and sea water 1030 (12.6% above, 87.4% below); the figure is not attached to a question, so the answer is not given away.
- **Ballast:** the submarine question asks for the weight (and mass, g = 10) of water needed to be just fully submerged; it ignores the air in the tanks and the pressure hull.
- **Balloon:** helium and air densities are given in the stem; the item ignores the volume of the envelope and the load, and the change of volume with height.
- **Apparent weight of a floating body:** the chapter defines apparent weight only for bodies that sink (upthrust less than weight), as the syllabus says; a floating body has U = W instead.
