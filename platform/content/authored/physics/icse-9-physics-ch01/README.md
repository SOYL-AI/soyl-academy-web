# ICSE Class 9 Physics, Chapter 1 — Measurements and Experimentation

`icse-9-physics-ch01` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (5 sections), 30 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch01_short` (20 marks, 30 min) and `t_icse9phy_ch01_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs` (diagrams, with self-checks), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch01/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX topics of the chapter: SI units (fundamental and derived, cgs and fps, conversions); least count of a rule, measuring cylinder and stopwatch; Vernier callipers (least count, zero error, readings); micrometre screw gauge (pitch, least count, zero error, readings); the simple pendulum (T and f, T = 2π√(l/g) without derivation, the l against T² graph, g from its slope).
- **Removed topics respected:** the derivation of the pendulum formula is never asked. Non-pictorial Vernier and screw-gauge numericals are never asked: every item that needs a reading shows the scales as an SVG drawn to scale, and every zero-error item shows the closed-jaw figure (positive and negative cases for both instruments). Least-count calculations from division counts (not readings) are asked in words, as the learning outcomes require.
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): short stems, "state", "define", numericals with formula, substitution and unit, and graph reading; assertion-reason items in the specimen option order.
- **Calculation chapter:** 12 numerical items plus calculation short answers and structured parts. Constants: π = 3.14 and g = 10 m s⁻² (stated in the stems), 1 lb = 0.4536 kg, 1 ft = 30.48 cm.
- **Originality:** situations and numbers differ from CBSE 11 Physics ch01 (significant figures, errors, dimensions) and ICSE 10 Physics; exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Measuring is comparing; The seven fundamental SI quantities; Derived units; Quick check: fundamental or derived; Three systems of units; Worked example 1: converting units; Quick check: a conversion; Least count; Reading a measuring cylinder; Worked example 2: least count of a cylinder and a stopwatch; Quick check: finding a least count; Smaller least count, greater accuracy; Quick check: accuracy; Summary; Exam tips. Part 2 (17 slides): Instruments for small lengths; Vernier callipers and its least count; Quick check; Worked example 1: reading a Vernier callipers; Zero error of a Vernier callipers; Worked example 2: correcting a reading; Screw gauge: pitch and least count; Quick check; Worked example 3: reading a screw gauge; Zero error of a screw gauge; The simple pendulum; Worked example 4: the time period formula; Quick check; The l against T² graph; Quick check; Summary; Exam tips.
- **Visuals (32 of 32 slides):** flow 2, table 20, svg 10.
- **Diagrams (26 distinct SVGs):** a measuring cylinder (two levels); Vernier scales for every reading, a closed-jaw positive and negative zero error and the vernier labelled with its parts; screw-gauge sleeve and thimble readings (including closed-jaw zero errors) and the screw gauge with its parts (named and lettered A to E for a structured-question figure); a simple pendulum; l against T² graphs (one with the slope triangle). Geometry is computed in `svgs.mjs`: the coinciding vernier line and the thimble edge are placed from the reading data, so each picture agrees with its answer. All were rendered to PNG and checked by eye.
- **Narration:** 16–53 words per slide (mean 35); no symbols, formulae or unit abbreviations.

## Question bank (73 items, 153 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 (8 are deck-check items) | 27 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 3 | 3 |
| true-false | 5 | 5 |
| fill-blank | 2 (one with 4 blanks) | 5 |
| numerical | 12 | 12 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem. Four carry pictorial readings (Vernier with a negative zero error; screw gauge with a positive zero error and a cross-section area; the pendulum bob read on a Vernier then g from T; the l against T² graph), one is on units and conversions, one on least counts.
- **Difficulty:** d1 23 · d2 33 · d3 16 · d4 1 (the pendulum-bob structured question).
- **Competency:** recall 18 · understanding 9 · application 41 · analysis 5. Application or higher is **63% of items**, inside the 45–65% lint band. (The first draft was 70%; three application items were replaced by recall items and three recall items were added. No tag was changed.)
- **Assertion-reason keys:** d a c b (all four options used).

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; all readings, least counts, conversions, periods and g values are computed and asserted in `calc.mjs`, and 23 scripted re-solve checks pass in the build.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that no item names the answer or the rule needed for another in the same test (for example the zero-error rule items are kept out of the tests that contain the zero-error structured questions).

## For a reviewer
- **Constants and conventions:** π = 3.14 and g = 10 m s⁻² are stated wherever a pendulum numerical needs them; the graph-based g values (9.86 and 9.47 m s⁻²) therefore differ slightly from 9.8. 1 lb = 0.4536 kg and 1 ft = 30.48 cm. The slope of the l against T² line is g/4π² (the syllabus plots l against T²).
- **Vernier convention:** 1 main scale division = 1 mm, 10 vernier divisions = 9 main divisions, least count 0.1 mm = 0.01 cm. Positive zero error = (coinciding line) × LC, subtracted; negative = −(10 − n) × LC, added. The coinciding vernier line is placed so that exactly one line of 1 to 9 lines up.
- **Screw gauge convention:** pitch 1 mm, 100 circular divisions, least count 0.01 mm; the circular-scale numbers are drawn increasing downwards past the datum line. Positive error = n × 0.01 mm (division n, small, on the datum line when closed); negative = −(100 − n) × 0.01 mm (n near 100). Zero-error figures draw the thimble edge at the zero mark.
- **Pictorial figures** use a window of the scale (not the whole instrument), labelled in centimetres (Vernier) or millimetres (screw gauge), so the main scale reading is read from the numbers.
- **Removed topics:** the pendulum formula is never derived (only quoted); the effect of amplitude is stated only as "small swings".
- `1 kgf`, momentum in cgs and the units of force belong to Chapter 3; Chapter 1 asks only the unit of momentum in fundamental units and one momentum conversion.
