# CBSE Class 11 Physics, Chapter 8 — Mechanical Properties of Solids

`cbse-11-physics-ch08` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 20 slides), notes (2 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch08_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch08_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch08/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds material data and helpers; `svgs.mjs` the six diagrams with self-checks; `decks.mjs` the stress–strain curve model, all worked-example numbers and the plots; `study.mjs` notes and flashcards; `questions.mjs` (t01), `questions-t2.mjs` (t02), `questions-long.mjs` (long answers and cases); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 stress, strain and Hooke's law: elastic and plastic behaviour; tensile, compressive, shear and hydraulic stress and the matching strains; Hooke's law; the stress–strain curve of a ductile metal (proportional limit, elastic limit and yield point, ultimate stress, fracture), unloading parallel to the first straight part and permanent set, ductile and brittle solids, elastomers. t02 elastic moduli (Young's, shear, bulk; compressibility) and applications of elastic behaviour: wire extension F L / (A Y), wires in series and in parallel, crane and lift ropes with a safety factor, beams, girders and bridges (qualitative: I-section, deeper beam sags less).
- **Left out, on purpose:** Poisson's ratio and the elastic potential energy of a stretched wire (the syllabus topics name neither and the brief says to leave out what the rationalised book may have cut). The beam-sag formula is not given; only the qualitative result.
- Data stated in the stems wherever used: Y steel 2.0 × 10¹¹, copper 1.1 × 10¹¹, brass 9.1 × 10¹⁰, aluminium 7.0 × 10¹⁰ Pa; B of water 2.2 × 10⁹ Pa (steel 1.6 × 10¹¹, copper 1.4 × 10¹¹, air 1.0 × 10⁵, oil 1.6 × 10⁹ in the stems that use them); G of steel 8.4 × 10¹⁰, aluminium 2.5 × 10¹⁰, rubber 1.0 × 10⁶ and 8.0 × 10⁵ Pa; concrete Y 3.0 × 10¹⁰, bone Y 1.6 × 10¹⁰ Pa; g = 9.8 m s⁻²; water density 1000 kg m⁻³. Contexts: lift and crane ropes, a harbour crane, a Pune mall lift, bridge bearing pads, glue joints, a concrete pillar, a thigh bone, deep sea water, a school lab.

## Shape
- **Part 1 (t01, 17 slides):** elastic, plastic and elastomers; stress (four kinds); strain; worked: wire of 1.6 mm, 150 N (stress 7.46 × 10⁷ Pa, strain 3.2 × 10⁻⁴); Hooke's law (three straight lines); the curve with points A to D; unloading and permanent set; worked: rod yield and ultimate loads (15 and 24 kN); ductile against brittle; elastomers; worked: finding the Hooke limit from load–extension readings; summary and exam tips. 3 check slides.
- **Part 2 (t02, 20 slides):** Young's modulus; three wires, same load; worked: Y from a measurement (2.0 × 10¹¹ Pa), lift cable extension (5.51 mm); shear modulus; worked: steel block (θ = 1.0 × 10⁻⁵ rad, 1.0 μm); bulk modulus; worked: water at 4.0 km (1.78 percent); the three moduli side by side; ropes and cranes; worked: lift ropes (12.5 mm diameter); beams and bridges; worked: ratio of extensions (1/2); worked: steel and copper in series (2.535 mm); summary and exam tips. 3 check slides.
- Visuals on all 37 slides (11 SVG, 14 tables, 12 plots).
- **Diagrams (6 SVGs, self-checks all pass):** the four kinds of stress (forces equal, opposite and pointing the right way); shear strain with tan θ = Δx/h; a loaded wire with its extension drawn to a stated exaggeration; extension bars for steel, brass and aluminium in the ratio 1/Y; a cube under all-round pressure with volume ratio 1 − ΔV/V; a bent beam (fibre lengths shorter, equal, longer; surface strains ±(d/2)/R) with an I-section. Each was rendered and inspected.
- **Plots (computed):** Hooke lines for three metals; ductile curve (illustrative metal, Y = 7.0 × 10¹⁰ Pa; points A to D marked) with self-checks on the slope, order of the points, the maximum at C and monotone rise and fall; unloading line parallel to OA; ductile against brittle; an illustrative elastomer curve (S-shape, checked numerically); load–extension readings; extension against load for three metals; compression of water against pressure. release.json is 342 KB.
- **Narration:** 9–71 words per slide (mean 52), TTS-safe, units spelled out.
- **Notes:** 2 sections (one per topic) with extra figures; 30 flashcards (t01 14, t02 16).

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 5 | 1 (keys a, d, b, c, a) |
| true-false | 3 | 1 (false, true, false) |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 21 | 1, 2 or 3 |
| short | 7 + 6 | 2 / 3 |
| long | 5 | 5 (curve and yield load; Young's modulus with steel against copper; shear and bulk moduli; crane rope design; steel and brass wires in series) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 13 prose short answers.
- **Difficulty:** d1 14 · d2 35 · d3 19 · d4 3. **Competency:** recall 5 · understanding 29 · application 33 · analysis 4 (the case alternatives add evaluation items). Application or higher **52% of items (67% of marks)**.
- **Topic tags:** t01 31 · t02 42.
- **Cases:** a copper-wire experiment in Nagpur (Hooke range to 25 N, Y = 1.12 × 10¹¹ Pa, prediction 0.84 mm at 30 N, or evaluate "the wire must have broken"); a Pune mall lift on three ropes (tension 5880 N, extension 4.70 mm, safety factor 10.2, or evaluate "two ropes would exceed the breaking stress"); a submersible at 5.0 km (4.9 × 10⁷ Pa, 2.23 percent, hull 6.12 × 10⁻⁴ m³, or evaluate "squeezed to under half its volume"); a Kolkata bridge bearing pad (shear stress 4.0 × 10⁴ Pa, 2.0 mm, steel plate comparison, or evaluate "twice as thick doubles the shift").

## Chapter tests
- **Short (20 marks, 40 min):** A q001, q005, q030, q008 · B q023, q057, q026 · C q063 or q064 · D q068.
- **Long (40 marks, 90 min):** A q002, q004, q007, q029, q034, q036, q037, q033, q039, q040 · B q022, q058, (q024 or q059), q061, (q027 or q062) · C q066 + (q065 or q067) · D q069, q070.

## Validation
- Build: 0 validator errors, 0 warnings; 339 maths strings parsed (KaTeX strict); 16 SVG visuals / 6 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical.
- 33 scripted re-solve checks pass: each numerical, the MCQs with numbers, the long answers and the case items are re-solved by a different route (direct formula against stress-then-strain, composite sums, parallel-wire force by Y A ε). 33 diagram, curve and worked-example self-checks pass. Every printed number in solutions, model answers and marking schemes is built from the same computed variables.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Fill-blanks:** the first build declared the accepted synonyms as three blanks; they are now one blank with three accepted answers.
2. **Final steps:** twelve numerical solutions ended with a value in a `\text{unit}` span, so the verify stage could not read the key; the last step now ends "= value" with the unit outside the maths.
3. **Arithmetic lint:** two chains such as "150 / 2.01 × 10⁻⁶" were parsed left to right; they are now written as fractions.
4. **Float noise:** several intermediate numbers printed as 14700.000000000002 or 5599.999999999999; they are rounded where defined.
5. **Wording:** a distractor set in the deep-sea MCQ was generated as "50 × 10¹"; the three wrong options are now clean; one case alternative said "6.8 times smaller"; it now says the stress is well below the breaking stress.
6. **Figures:** the shear figure's side text overlapped the base and its label; the extension-bar labels printed "20.0 × 10¹⁰"; both fixed after rendering.
7. **Facts double-checked:** A = π(d/2)²; steel wire 1.6 mm, 150 N: 7.46 × 10⁷ Pa; lift cable strain 1.96 × 10⁻⁴, extension 7.84 mm for the 40 m cable and 4.70 mm for the 24 m rope; water: p = ρ g h = 3.92 × 10⁷ Pa at 4.0 km gives ΔV/V = 0.0178, and 4.9 × 10⁷ Pa at 5.0 km gives 0.0223; steel to copper extension ratio 0.55; ratio (2L, 2r) to (L, r) is 1/2; series total 4.215 mm (steel 1.592, brass 2.623); parallel total load 73.0 N (47.12 + 25.92).

**Facts a reviewer should double-check:** (a) the rationalised book's depth on the stress–strain curve: here B is taken as both the elastic limit and the yield point, and the curve is an illustrative metal with Y = 7.0 × 10¹⁰ Pa, not data for a real alloy; (b) that "G ≈ Y/3 for most metals" is acceptable at that depth (stated in one slide and one note only); (c) the elastomer curve is an illustrative model (neo-Hookean term plus a cubic stiffening term), described as such in the slide; (d) material constants quoted in stems (bone Y, concrete Y, B of copper, G of aluminium and rubber), which are given as data rather than claimed as facts; (e) safety-factor values 6 to 10 as typical for lifting ropes; (f) that Poisson's ratio and the elastic energy of a stretched wire may be omitted.

### Subject-producer review (2026-11-05)
Every numerical, long answer, case numerical and assertion-reason item was re-solved by the subject-producer (Opus 5.5). One fix: the solution summary of the steel–brass long answer printed 2.624 mm for the brass extension while the model answer gives 2.623 mm (the computed value); now 2.623 mm. Five numericals tagged "understanding" were retagged "application" (application or higher now 59%). Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Poisson's ratio and elastic potential energy of a stretched wire are omitted; add a slide and two items each if the owner confirms the rationalised book keeps them.
- Hysteresis of elastomers is not treated. The sag formula of a loaded beam is not given.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
