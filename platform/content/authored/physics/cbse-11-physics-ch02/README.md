# CBSE Class 11 Physics, Chapter 2 — Motion in a Straight Line

`cbse-11-physics-ch02` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 20 slides), notes (4 sections), 30 flashcards, 77 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11phy_ch02_short` (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and `t_cbse11phy_ch02_long` (40 marks, 90 min, `cbse-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../cbse-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/cbse-11-physics-ch02/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the numerical helpers (derivative, Simpson integral, path length, root finder) used by the independent re-solves; `svgs.mjs` the six diagrams with self-checks; `decks.mjs` all worked-example numbers and the plots; `questions*.mjs` the bank (t01–t02, t03, t04, long and case-based items); `dump-svgs.mjs` writes the diagrams to a folder for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 frame of reference, position, path length and displacement (signed quantities along an axis); t02 average and instantaneous velocity, average and instantaneous speed, average and instantaneous acceleration, derivatives and elementary integration (v from a(t), x from v(t)); t03 the three equations of uniformly accelerated motion derived graphically and by calculus (including s = ½(u + v)t and the distance in the nth second as an application), free fall with g = 9.8 m s⁻², a vertical throw, stopping distance and reaction time (dropped-ruler method); t04 position–time, velocity–time and acceleration–time graphs (slopes, signed areas, interpretation, path length against displacement).
- **Relative velocity in one dimension is not taught.** The brief allowed it only if it remains in the rationalised NCERT chapter; the syllabus topics t01–t04 do not name it, so it is left out (see Known gaps).
- Data and constants stated in the stems: g = 9.8 m s⁻²; 1 m s⁻¹ = 3.6 km h⁻¹. No NCERT, exemplar or past-paper text is used; contexts are Indian (railway line, delivery riders, Mumbai lift, Hyderabad expressway, Chennai cricket ground, metro trains).

## Shape
- **Part 1 (t01–t02, 16 slides):** frame of reference and position axis; path length and displacement; worked: rider 1200 m out and 450 m back (path 1650 m, displacement 750 m, average speed 5.0 m s⁻¹, average velocity ≈ 2.27 m s⁻¹); average velocity and speed (table); worked: two halves at 30 and 45 km h⁻¹ give 36 km h⁻¹, not 37.5; instantaneous velocity as the tangent slope (x = 1.5 t²: chord 6 m s⁻¹, tangent 9 m s⁻¹); worked: x = 2t³ − 9t² + 12t (rest at 1 s and 2 s, displacement 9 m, path 11 m, average speed ≈ 3.67 m s⁻¹); acceleration (a = 12t − 18, v least −1.5 m s⁻¹ at 1.5 s); worked: 18 → 72 km h⁻¹ in 6 s gives 2.5 m s⁻²; summary and exam tips. 3 check slides.
- **Part 2 (t03–t04, 20 slides):** the three equations (with the variable each lacks); derivation from the v–t graph (u = 4, v = 16, t = 6: a = 2 m s⁻², s = 60 m); derivation by calculus (including a = v dv/dx); worked: metro from rest at 1.2 m s⁻² to 20 m s⁻¹ (16.7 s, 167 m); free fall and g (strobe picture, 1:3:5:7); worked: 3.0 s drop (44.1 m, 29.4 m s⁻¹); going up and coming down (y–t arch, v–t line); worked: u = 19.6 m s⁻¹ (top at 2 s and 19.6 m, flight 4 s, 14.7 m and −9.8 m s⁻¹ at 3 s); stopping distance and reaction time; worked: 20 m s⁻¹, 0.6 s, 5 m s⁻² (12 + 40 = 52 m; at 40 m s⁻¹ 184 m); reading graphs; worked: car graph (550 m, 15.7 m s⁻¹); worked: trolley with sign change (displacement 5 m, path 13 m); summary and exam tips. 4 check slides.
- Visuals on all 36 slides (14 SVG, 12 tables, 10 plots).
- **Diagrams (6 SVGs, 12 self-checks, all pass):** position axis along a railway line (0.4 px per metre); path length against displacement drawn to scale; strobe picture of free fall (gaps 1:3:5:7, speed arrows 1:2:3:4); stopping distances at 10, 20 and 30 m s⁻¹ to scale (reaction part ∝ v, braking part ∝ v²); v–t rectangle + triangle with the drawn area equal to (u + v)t/2; six x–t graph shapes with the slope behaviour checked numerically. Each was rendered and inspected.
- **Plots (computed, 8 distinct):** chord and tangent on x = 1.5t²; x(t) and v(t) of the cubic particle; y(t) and v(t) of a ball thrown up at 19.6 m s⁻¹; car v–t trapezoid; trolley v–t line crossing zero; walker x–t graph. Analytic `functions` where possible; release.json is 343 KB.
- **Narration:** 6–78 words per slide (mean 53), TTS-safe, numbers in words.
- **Notes:** 4 sections (one per topic) with extra figures; 30 flashcards (t01 7, t02 8, t03 10, t04 5).

## Question bank (77)
| Type | Count | Marks |
|---|---|---|
| mcq | 16 | 1 (keys a 4, b 4, c 4, d 4) |
| assertion-reason | 6 | 1 (keys a, d, b, b, a, c: a 2, b 2, c 1, d 1) |
| true-false | 3 | 1 (true, false, false) |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 24 | 1, 2 or 3 |
| short | 9 + 6 | 2 / 3 |
| long | 5 | 5 (path length and average velocity of a taxi; x(t) calculus; derivations plus a train problem; a stone thrown up from a bridge; a trapezoidal v–t graph) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 15 prose short answers.
- **Difficulty:** d1 8 · d2 27 · d3 34 · d4 8.
- **Competency:** recall 4 · understanding 31 · application 34 · analysis 8 (the case alternatives add evaluation items). Application or higher **55% of items (61% of marks)**.
- **Topic tags:** t01 12 · t02 23 · t03 30 · t04 16.
- **Cases:** a Jaipur delivery rider (displacement 600 m, average speed 5.0 m s⁻¹, average velocity 2.5 m s⁻¹, or evaluate "average velocity must also be 5.0"); a Hyderabad expressway (21 m reaction distance, 75 m braking, 96 m against a truck 90 m ahead, or evaluate "halving the reaction time halves the stopping distance"); a metro v–t trapezoid (900 m, 12.9 m s⁻¹, or evaluate "average speed is 7.5 m s⁻¹"); a Chennai fielder's vertical throw at 34.3 m s⁻¹ (60.0 m, 7.0 s, or evaluate "a heavier ball takes longer to come down").

## Chapter tests
- **Short (20 marks, 40 min):** A q001, q017, q040, q021 · B q010, q066, q054 · C q069 or q072 · D q076.
- **Long (40 marks, 90 min):** A q002, q007, q018, q015, q041, q044, q055, q060, q046, q062 · B q009, q024, (q049 or q067), q026, (q027 or q053) · C q070 + (q071 or q073) · D q074, q075.

## Validation
- Build: 0 validator errors, 0 warnings; 525 maths strings parsed (KaTeX strict); 20 SVG visuals / 6 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags. Two consecutive builds are byte-identical (md5 of `release.json` 629de9db211fbff76c70d5138a7efe96, of `tests.json` ef2da26ced59309ec19c1c2da465a84b).
- 39 scripted re-solve checks pass: each numerical, the MCQs with numbers, the long answers and the case items are re-solved by a different route (kinematic identities, bisection root finding, finite-difference derivatives, Simpson integration of the velocity, sampled path length). Every printed number in solutions, model answers and marking schemes is built from the same computed variables.
- Gate commands: see the subject-producer's handoff note.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Floating-point artefacts:** the first dump printed 1.4999999999999998 s, 2.9999999999999996 s and 3.4999999999999996 s in the bridge-long and ball-case model answers; the times are now rounded to six decimals before printing.
2. **Solution endings:** the retardation item ended with a negative step ("a = −0.60") before stating the magnitude, so the verify stage flagged the key; the solution now computes |a| = 900/1500 = 0.60.
3. **Wording:** the vacuum-chamber MCQ had options that did not fit its stem ("They … the brick reaches first"); the stem now asks "Which statement is correct?".
4. **Figures:** the strobe figure's last speed arrow ran off the frame and its note overlapped it (frame enlarged, arrow scale 1 px per m s⁻¹); the v–t figure's side text was clipped (narrower time scale); the six-shape figure's captions were cut off at the bottom and used 9 px text (frame taller, 10 px); two plots had axes shorter than their curves (x(3.2 s) = 11.8 m and v(3.2 s) = 15.8 m s⁻¹ now fit).
5. **Stems:** every stem names its own context and numbers (a lift in a Mumbai tower, a goods train at 108 km/h, a ball rolling in a groove, a tram in Kolkata); none echoes the CBSE 9 and 10 motion chapters or the ICSE physics items, which were grepped for "velocity-time", "uniformly accelerated" and "free fall".
6. **Facts double-checked:** g = 9.8 m s⁻²; 108 km/h = 30 m s⁻¹, 72 km/h = 20, 54 km/h = 15; distances in successive seconds 4.9, 14.7, 24.5 m (1:3:5); H = u²/2g with u = 24.5, 19.6, 34.3 m s⁻¹ (30.6, 19.6, 60.0 m); the particle x = t³ − 6t² + 9t has path 12 m and displacement 4 m in 4 s (average speed 3 m s⁻¹); x = 2t³ − 15t² + 24t has x(1) = 11, x(4) = −16, x(5) = −5 (path 49 m, displacement −5 m, average speed 9.8 m s⁻¹); a = 6 − 2t from rest gives v(2) = 8 m s⁻¹ and x(3) = 18 m; the stone from the bridge reaches the water after 4.39 s at 28.4 m s⁻¹; the police motorcycle catches the car at t = 2u/a = 16 s after 320 m.

**Facts a reviewer should double-check:** (a) the number of items at each mark value for numericals (two numericals, `stopdist-num` and `trolley-num`, are 3 marks); (b) the metre-per-second/km-per-hour conversions in the tram, train and car items; (c) that the dropped-ruler method and the distance in the nth second are acceptable at rationalised-syllabus depth; (d) the 0.2–1 s range quoted for reaction times on the stopping-distance slide; (e) the case alternatives' model answers (each gives the corrected numbers).

### Subject-producer review (2026-11-04)
Every item, case part and alternative was re-solved by the subject-producer (Opus 5.5) from the built bank. One error fixed: the model answer of the path-length/displacement short (q010) gave a lift that rises 36 m and comes down 15 m a path length of 57 m; it is 51 m (displacement 21 m). The answer was also trimmed to the 50-word limit. All other keys, numbers, schemes and assertion-reason keys (a d b b a c) check out. Writer: Sonnet 5.5 chapter sub-agent under D-050.

## Known gaps
- Relative velocity (one dimension) is omitted; add a short slide and two items if the owner confirms it is still in the 2026-27 rationalised book.
- Graph sketches asked for in answers are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae; the strobe figure and stopping bars are drawn to the stated scales.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
