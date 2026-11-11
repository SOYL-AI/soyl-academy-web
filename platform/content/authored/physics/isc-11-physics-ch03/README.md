# ISC Class 11 Physics, Chapter 3 — Vectors

`isc-11-physics-ch03` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer chapter writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (22 + 20 slides), notes (5 sections), 30 flashcards, 81 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11phy_ch03_short` (20 marks, 50 min, `isc-11-default-chapter-test-short`) and `t_isc11phy_ch03_long` (40 marks, 100 min, `isc-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../isc-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/isc-11-physics-ch03/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the vector helpers and the independent numerical routes (component sums, pairwise law of cosines, atan2 of the cross product). `svgs.mjs` draws the diagrams with self-checks, `decks.mjs` the slides, `study.mjs` notes and flashcards, `questions.mjs` / `questions-short.mjs` / `questions-long.mjs` the bank, `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
Follows the ISC 2028 Class XI file `platform/catalog/cisce/isc-11/physics/syllabus.yaml` (chapter 3, topics t01–t05), not the CBSE chapter.
- **t01** scalars and vectors (current as a scalar with a sense), position and displacement vectors in 2-D and 3-D, equal, negative, null and coplanar vectors.
- **t02** unit vectors î, ĵ, k̂; A = Aₓî + A_yĵ + A_zk̂; magnitude √(Aₓ² + A_y² + A_z²); the unit vector Â = A/|A|; multiplication by a real number (magnitude |λ|A, reversal for λ < 0, parallel vectors).
- **t03** triangle and parallelogram laws; **derivation** of R = √(A² + B² + 2AB cos θ) and tan α = B sin θ/(A + B cos θ) from the right-angled triangle ONS (two slides, two 3-mark items, a 5-mark item); special cases (0°, 90°, 180°, equal vectors, 120°, |A − B| ≤ R ≤ A + B); subtraction, the two diagonals of the parallelogram as A + B and A − B, |A − B|, addition and subtraction in unit-vector form.
- **t04** resolution; rectangular components in 2-D and 3-D, direction cosines (l² + m² + n² = 1); resultant from ΣX and ΣY with the quadrant from the signs.
- **t05** scalar product A·B = AB cos θ (work W = F·s, power F·v), properties, component form, angle formula, perpendicular test; vector product A × B = AB sin θ n̂ (right-hand screw rule, area of the parallelogram, torque r × F), properties, unit-vector table, determinant form; special cases at 0°, 90°, 180°.
- Constants stated in the stems: none needed beyond the numbers given (no g in this chapter). No textbook, specimen or past-paper text is used; contexts are Indian (survey drone, kite, barge ropes, tempo, bullock cart, handcart, porter's trolley, spanner and door hinge).
- **Left out on purpose:** the proof of the commutative and associative laws of vector addition (listed under `removed_topics`; the deck says so once); relative velocity, projectiles and circular motion (later chapters); triple products and vector calculus (not in the syllabus).

## Shape
- **Part 1 (t01–t03, 22 slides, 4 worked examples, 4 checks):** scalars and vectors; position and displacement (drone P(2, 1) to Q(6, 4): Δr = (4, 3) m, 5 m); equal, negative, null, coplanar vectors; unit vectors on 3-D axes (A = 2î + 3ĵ + 6k̂, |A| = 7); magnitude and unit vector (4î − 3ĵ + 12k̂, 13 m); λA; triangle and parallelogram laws; derivation of R and α in two slides; special cases with a plot of |A + B| and |A − B| against θ; two ropes on a barge (7 N, 8 N at 60°: R = 13 N, α = 32.2°); subtraction and diagonals; sum and difference in unit-vector form (2î + 3ĵ + 6k̂ and 8î − 5ĵ + 2k̂).
- **Part 2 (t04–t05, 20 slides, 5 worked examples, 4 checks):** resolution (handcart 50 N at 30°); 3-D components and direction cosines (73.4°, 64.6°, 31.0°); resultant of three coplanar forces by components (40 N at 0°, 30 N at 90°, 20 N at 210°: 30.2 N at 41.4°); dot product and work; properties and component form; work and angle for F = (2, −3, 4) N, s = (5, 2, 3) m (16 J, 61.2°); cross product, torque; properties, determinant, unit-vector pattern; A × B = (−2, −8, −7) with perpendicularity checks and a 12 N m torque; dot and cross at 0°, 90°, 180°.
- Visuals on all 42 slides (19 SVG slides from 9 distinct diagrams, 21 tables, 2 plot slides).
- **Diagrams (9 SVGs, 9 self-checks plus 10 worked-example checks in the build, all pass):** position and displacement at 36 px per metre; i-j-k axes with A drawn from its projected unit vectors; λA lengths and directions; parallelogram and triangle laws with R² = 61; the derivation figure (ON = 7, SN = 3.46, tan α); the two diagonals with |A + B|² + |A − B|² = 2(A² + B²); 3–4–5 force components; work F·s = 36 J with the 6 N projection; parallelogram area 20 (shoelace on the drawn points) and a 6 N m spanner torque (cross product from the drawn vectors). All rendered and viewed (`dump-svgs.mjs` plus the renderer): no clipping, no text overlaps, font size ≥ 10.
- **Plots (computed, 1 analytic):** |A + B| and |A − B| against θ for A = 5, B = 4, marked at 90°.
- **Narration:** 7–80 words per slide (mean 53), TTS-safe, numbers and units in words (generated from the same variables by `W()` in `decks.mjs`).
- **Notes:** 5 sections (one per topic) with extra figures; 30 flashcards (t01 8, t02 5, t03 7, t04 4, t05 6).

## Question bank (81)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 6 | 1 (keys a, b, c, d, a, c) |
| true-false | 2 | 1 (false, true) |
| fill-blank | 2 | 1 |
| numerical | 12 | 1 (6), 2 (4), 3 (2) |
| short | 12 + 12 | 2 (30–50 words) / 3 (50–80 words; includes the derivations of R, α, the diagonals, the components and the dot and cross product component forms) |
| long | 7 | 5, set in parts with marks shown: displacement of a drone (t01, t02); parallelogram law and the derivation of R and α (t03); special cases and 8 N, 6 N at 60° (t03); resolution and three forces at 30°, 150°, 270° (t04); 3-D vectors with A + B, 2A − 3B, direction angle (t02–t04); scalar product, work and angle (t05); vector product, perpendicularity check and torque (t05) |

- **Difficulty:** d1 18 · d2 33 · d3 25 · d4 4 · d5 1.
- **Competency:** recall 12 · understanding 25 · application 40 · analysis 4. Application or higher **54% of items (56% of marks)**. Derivations and explanations are `understanding`, numericals `application`; `less-ar`, `fifteen-ar`, `maxmin-mcq` (largest and smallest resultants give the forces) and `perpres-mcq` (resultant perpendicular to one force, d5) are `analysis`.
- **Topic tags:** t01 15 · t02 12 · t03 24 · t04 14 · t05 21 (some items carry two tags).
- Every numerical item (1, 2 or 3 marks) is computed in code; printed plain-text negatives use the proper minus sign. No case-based items (ISC sets 5-mark questions in parts).

## Chapter tests
Item numbers are the bank order (`q_isc11phy_ch03_NNN`); `*` marks an internal choice (attempt one of the pair).
- **Short (20 marks, 50 min, `isc-11-default-chapter-test-short`):** A q002, q006, q019, q024 (mcq) and q031 (AR) · B q052, q056 or q059 · C q064, q065 or q071 · D q077.
- **Long (40 marks, 100 min, `isc-11-default-chapter-test-long`):** A q001, q004, q005, q008, q009, q012, q015, q021, q025, q026 (mcq), q030 and q033 (AR) · B q051, q060, q058 or q062 · C q063, q068, q070, q066 or q072 · D q076, q078 or q081.

## Validation
- Build: 0 validator errors, 0 warnings; 683 maths strings parsed (KaTeX strict); 29 SVG visuals / 9 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; `bank.duplicate` pre-check (physics and science chapters, exemplars): 0.
- 49 scripted re-solve checks pass: numericals are recomputed by a different route (component sums against the law of cosines, pairwise folding of forces, atan2 of the cross product against arccos of the dot product, Heron's formula against ½|A × B|, a scan over angles for the range and the perpendicular-resultant items, the triangle inequality for the equilibrium item); 19 diagram and worked-example self-checks pass.
- Two consecutive builds are byte-identical. md5 `release.json` `ad36116e3d3210643d049165a69a98e8`, `tests.json` `355052f4f04dae80dc25c7726faa2c88`.
- Gate commands (content gates, originality): see the subject-producer's handoff note.

## Verifier pass
The writer re-solved every item from its stem. Fixed during the pass: a floating-point artefact in the |A − B| item (9.999… printed), an unreplaced `{I}` placeholder in two worked examples and one model answer, five model answers that were too short once the maths is stripped from the word count, an item whose option order was referred to by position, one MCQ option that was arguably true, and rounding noise (1.8e-15) in the three-force example.
Facts a reviewer should double-check: electric current is taught as a scalar with the junction-addition reason (usual ISC answer); tan α is measured from the first vector A and the angle with B is θ − α; direction cosines are taught lightly (3-D resolution needs them); the unit-vector cross products use a right-handed system; AR keys a, b, c, d, a, c.

## Known gaps
- Closed-polygon (polygon law) and the "three vectors in equilibrium" idea appear only as items (`equil-mcq`, `equilib-short3`) and a line in the special-cases slide, because the syllabus names the triangle and parallelogram laws only.
- No diagram is drawn for the 3-D cross product direction beyond the 2-D out-of-page symbol (the right-hand screw rule is stated in words and in the torque figure).
- The library's `plot` points are not used; the plot marks θ = 90° with a vertical line instead.
