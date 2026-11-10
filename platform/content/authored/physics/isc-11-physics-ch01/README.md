# ISC Class 11 Physics, Chapter 1 — Units and Measurement

`isc-11-physics-ch01` · release v1 · academic year 2026-27 · family `physics` · provenance `human`, hand-authored as deterministic builder code. Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 22 slides), notes (6 sections, one per syllabus topic), 30 flashcards, 79 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11phy_ch01_short` (20 marks, 50 min, `isc-11-default-chapter-test-short`) and `t_isc11phy_ch01_long` (40 marks, 100 min, `isc-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-11-physics-ch01/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `lib.mjs` is the shared ISC 11 Physics authoring library (used by every chapter, not edited here). `calc.mjs` holds the calculation helpers (significant-figure counting and rounding, a dimension algebra, order of magnitude, unit-system conversion by dimensions, error means, shared constants), `svgs.mjs` the seven diagrams with `SELF_CHECKS`, `decks.mjs` the two decks and their worked examples, `study.mjs` notes and flashcards, `questions.mjs` the objective items and numericals, `questions2.mjs` the written items, `build.mjs` the chapter tests and the run. `dump-svgs.mjs` writes the diagrams for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
Taught exactly as listed in `platform/catalog/cisce/isc-11/physics/syllabus.yaml`:
- **t01** physics as a science of measurement; a unit as a reference standard (well defined, reproducible, invariable, convenient); fundamental and derived quantities; systems CGS, FPS, MKS, MKSA and SI (units of length, mass, time, force and work).
- **t02** the seven SI base units (2019 definitions through constants named); radian and steradian as the former supplementary units (now dimensionless derived units); derived units (newton, joule, watt, pascal, hertz, coulomb, volt) in base units; the SI rules for writing unit names and symbols; prefixes atto to tera (atto, femto, pico, nano, micro, milli, centi, deci, deca, hecto, kilo, mega, giga, tera).
- **t03** fermi, angstrom, light year, astronomical unit, parsec and the unified atomic mass unit; parallax (D = b/p) and the definition of the parsec; methods for measuring length, mass and time at atomic, ordinary and astronomical scales.
- **t04** accuracy and precision; systematic, random and least-count errors; mean, absolute, mean absolute, relative and percentage error; significant figures (counting, arithmetic, rounding off with the "dropped exact 5 makes the last kept digit even" rule); order of magnitude (the 3.16 rule).
- **t05** dimensions and dimensional formulae of the usual quantities and of G, h, spring constant, surface tension, viscosity and the Boltzmann constant; dimensionless quantities; the principle of homogeneity.
- **t06** checking equations; dimensions of constants in an equation (van der Waals a and b); converting units (n2 = n1 [M1/M2]^a [L1/L2]^b [T1/T2]^c; N to dyne, J to erg, G to CGS); limitations (no pure numbers, no sums of terms or functions of dimensional quantities, correct is not the same as true, equal dimensions not distinguished).
- Left out because the ISC file does not list them: propagation of errors in sums, products and powers; deriving relations such as the pendulum period by dimensions (only checking, constants and conversion are taught, as the syllabus names them); the vernier callipers and screw gauge as constructions (they appear only as contexts for least count and zero error).
- Data stated in stems where used: c = 2.998 × 10⁸ m s⁻¹; 1 year = 3.156 × 10⁷ s; 1 ly ≈ 9.46 × 10¹⁵ m; 1 AU = 1.496 × 10¹¹ m; 1 pc = 3.08 × 10¹⁶ m (1 AU ÷ 4.85 × 10⁻⁶ rad); 1 arcsecond = 4.85 × 10⁻⁶ rad; 1 u = 1.66 × 10⁻²⁷ kg; G = 6.67 × 10⁻¹¹ N m² kg⁻².

## Shape
- **Part 1 (t01 to t03, 20 slides):** title with the log scale of lengths; unit as a reference standard (properties table); systems of units table; check (CGS work unit); seven SI base units; derived units; radian and steradian figure; rules for unit names and symbols table; check (writing units); prefixes atto to tera; worked: 270 km h⁻¹ = 75 m s⁻¹, 2.2 μF, 4.2 GHz, pascal in base units; practical units table; parallax figure; worked: parallax 0.4″ = 2.5 pc = 8.14 ly = 5.15 × 10⁵ AU; methods of measuring length, mass and time table; log-scale figure; check (light years, numerical); worked: oxygen atom 16 u = 2.66 × 10⁻²⁶ kg, gold nucleus 14 fm; summary; exam tips.
- **Part 2 (t04 to t06, 22 slides):** title with the ruler figure; kinds of error table; error definitions table; worked: swing times 1.86 ± 0.02 s (1.08 %) with the dot-plot figure; check (mean absolute error); significant figures and counting rules; worked: counting and rounding off; arithmetic rules; worked: 25.1, 90.2 and 32; check (addition); order of magnitude figure; worked: age of the universe 10¹⁸ s, heartbeats 10⁹; dimensional formulae table; dimensions of constants table; homogeneity balance figure; check (power); worked: four equations checked; unit conversion by dimensions table; worked: G in CGS, dimensions of a; limitations table; summary; exam tips.
- Visuals on all 42 slides (9 SVG slides, 33 tables); 3 check slides and at least 3 worked examples in each deck (3 and 6).
- **Diagrams (7 SVGs, all rendered and inspected):** a logarithmic scale of lengths from the fermi to the parsec; the parallax triangle (b/D = tan p, and 1 AU ÷ tan 1″ = 1 parsec within 0.5 %); the radian (arc end drawn at exactly 1 rad) and steradian; a strip against a millimetre scale (5.27 cm, last digit estimated); a dot plot of five readings with mean 1.86 s and the ± 0.02 s band; the order-of-magnitude decade with 3.16 at the log midpoint; the balance of dimensions in v² = u² + 2as. Each has `SELF_CHECKS` proving its geometry.
- **Narration:** 13–85 words per slide (mean 59), TTS-safe.

## Question bank (79)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 6 | 1 (keys a b c d a b) |
| true-false | 3 | 1 (1 true, 2 false) |
| fill-blank | 3 | 1 |
| numerical | 8 | 1 (5) or 2 (3) |
| short | 13 + 13 | 2 / 3 |
| long | 7 | 5, set in parts with marks shown (systems of units; SI rules; parallax and the parsec; error analysis; significant figures; homogeneity and constants; unit conversion by dimensions) |

- **Large and small answers** are asked in units of 10ⁿ (for example "in units of 10⁸ m") so that the stage-5 check can find the key as a plain number in the solution.
- **Difficulty:** d1 14 · d2 41 · d3 19 · d4 3 · d5 2.
- **Competency:** recall 10 · understanding 20 · application 40 · analysis 9. Application or higher **62% of items (68% of marks)**.
- **Topic tags:** t01 10 · t02 14 · t03 17 · t04 19 · t05 9 · t06 12 (a few items carry two tags).
- Written items carry word limits (2-mark 30–50, 3-mark 50–80, 5-mark 80–120 words) and model answers inside them.

## Chapter tests
- **Short (20 marks, 50 min):** A q004 q006 q014 q020 q027 · B q049, (q052 or q059) · C q064, (q068 or q071) · D q074.
- **Long (40 marks, 100 min):** A q003 q005 q008 q011 q013 q016 q017 q021 q023 q025 q030 q031 · B q050, q051, (q055 or q056) · C q062, q063, q066, (q067 or q069) · D q073, (q078 or q079).
- Internal-choice pairs carry the same marks and similar difficulty.

## Validation
- Build: 0 validator errors, 0 warnings; 427 maths strings parsed (KaTeX strict); 16 SVG visuals / 7 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 0 `bank.duplicate`.
- 49 scripted re-solve checks pass (every item with a number in it); 11 diagram self-checks ok.
- Two consecutive builds are byte-identical: `release.json` md5 `b13bf2135558b9ad41daf7eb188d93e1`, `tests.json` md5 `91968f3ec4152d0fae9fdf9374d7ac94`.
- Gate commands and results: see the handoff note written by the subject-producer.

## Verifier pass
Every question was re-solved from its stem against the bank dump. Findings and fixes:
1. **Numerical keys:** the stage-5 check looks for the key as a plain number in the solution, which fails for 10⁻²⁵ or 10⁸ magnitudes; five numericals now ask for the value in units of 10ⁿ and the mercury density solution prints 13600.
2. **URL lint:** "[M L T⁻²]: consistent" in a marking scheme matched the reference-link pattern; reworded with "so".
3. **Word limit:** the joule-to-erg answer was 39 words against a 50–80 limit; extended.
4. **Tolerances:** the numerical tolerance of 1 % printed as 0.026400000000000003; `NV` now rounds it.
5. **Diagrams:** first render had the Earth label crossing the parallax ray, the mean label crossing the dashed mean line on the dot plot, and the "r" and angle labels colliding on the radian figure; moved and re-viewed.
6. **Competency and difficulty:** the first draft had no d5 item; the two hardest long answers and two multiple-choice items were graded up.
7. **Facts a reviewer should double-check:** trailing zeros of a whole number are not significant (2600 has two) and a dropped exact 5 makes the last kept digit even (5.835 → 5.84, 9.725 → 9.72, 6.355 → 6.36, 0.04725 → 0.0472); the 2019 SI definitions as named on the slide; 1 pc is taken as 3.08 × 10¹⁶ m although 1 AU ÷ tan 1″ gives 3.09 × 10¹⁶ m (the chapter says "about 3.1 × 10¹⁶ m"); the van der Waals dimensions treat the molar volume as L³ and ignore amount of substance; the order-of-magnitude rule uses 3.16 as the cut.

## Known gaps
- No error propagation (sums, products, powers) because the ISC syllabus lines do not list it; add if the owner wants it for ISC.
- No answer asks students to draw; the parallax and log-scale figures are schematic (the parallax angle is drawn about 10° so it shows).
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
