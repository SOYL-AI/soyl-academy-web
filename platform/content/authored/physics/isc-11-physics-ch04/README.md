# ISC Class 11 Physics, Chapter 4 — Projectile Motion

`isc-11-physics-ch04` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer chapter writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 18 slides), notes (3 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11phy_ch04_short` (20 marks, 50 min, `isc-11-default-chapter-test-short`) and `t_isc11phy_ch04_long` (40 marks, 100 min, `isc-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../isc-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/isc-11-physics-ch04/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the numerical helpers (closed-form projectile quantities, a leapfrog stepping integrator, position differencing, bisection, golden-section search) used by the independent re-solves; `svgs.mjs` the six diagrams with self-checks; `words.mjs` number-to-words for the narration; `decks.mjs` all worked-example numbers, the plots and the tables; `questions.mjs`, `questions-short.mjs`, `questions-long.mjs` the bank; `study.mjs` notes and flashcards; `dump-svgs.mjs` writes the diagrams for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
Follows the ISC 2028 Class XI file `platform/catalog/cisce/isc-11/physics/syllabus.yaml` (chapter 4, topics t01–t03), not the CBSE chapter.
- **t01** projectile motion as two independent motions (horizontal: a = 0, v = u cos θ constant; vertical: a = −g, as in a vertical throw with speed u sin θ; they share only the time); why the horizontal velocity is constant and the vertical velocity changes; everyday examples (cricket ball, football, water jet) and non-examples (a rocket under thrust, a parachutist); the terms angle of projection, time of flight, maximum height and horizontal range; components of u; x(t), y(t), v_x(t), v_y(t).
- **t02** derivation of the equation of the trajectory by eliminating t, shown to be a parabola (y = ax − bx²); derivations of the time of flight T = 2u sin θ/g, the maximum height H = u² sin² θ/2g and the range R = u² sin 2θ/g (two ways for R: from T and by setting y = 0 in the trajectory); the maximum range R_max = u²/g at 45°; H/R = tan θ/4 and R = 4H at 45°; equal ranges for complementary angles (sin(180° − 2θ) = sin 2θ) with the different heights (H ∝ sin² θ) and times (T ∝ sin θ).
- **t03** velocity at any instant: v_x = u cos θ, v_y = u sin θ − gt, magnitude √(v_x² + v_y²), direction tan α = v_y/v_x above or below the horizontal, always tangent to the path; least speed u cos θ at the top; landing speed u and angle θ below the horizontal at the launch level; horizontal projection from a height h (y downward, u_y = 0): T = √(2h/g) independent of u, R = u√(2h/g), path y = gx²/(2u²) (half a parabola), landing velocity v = √(u² + 2gh), tan α = gT/u; thrown against dropped (same fall).
- Constants stated in the stems: g = 9.8 m s⁻² (every item that uses it). No textbook, specimen or past-paper text is used; contexts are Indian or everyday (cricket, a goal kick, tennis and volleyball serves, a fire-hose jet, a bridge over a river, a school roof, a catapult, relief supplies from an aircraft, a balcony, a rugby kick).
- **Left out on purpose:** projectile motion on an inclined plane (listed in the syllabus file as removed), launch from a height at an angle, air resistance, the equation of motion from energy (the speed at a height is mentioned once as v² = u² − 2gy and used only in one hard item, where it is also derived from components), and CBSE-only extras.

## Shape
- **Part 1 (t01 and the first half of t02, 16 slides, 2 worked examples, 3 checks):** what a projectile is (table of projectile and non-projectile motions); two independent motions (table of the horizontal and vertical motions); why the horizontal velocity is constant (plot of v_x and v_y against t for u = 39.2 m s⁻¹ at 30°: flat line and a line of slope −g crossing zero at 2 s); check on the velocity at the top; terms (figure at 45°: H = 39.2 m, R = 156.8 m, T = 5.66 s); position and velocity at time t (table each second); worked cricket hit (components 33.9 and 19.6 m s⁻¹; after 3 s the ball is 101.8 m along and 14.7 m up); derivation of the trajectory (plot, parabola with top 19.6 m at 67.9 m and landing at 135.8 m); check on the shape; time of flight (T = 4 s, top at 2 s); maximum height (y–t arch); worked goal kick (24.5 m s⁻¹ at 40°: top at 1.61 s, T = 3.21 s, H = 12.7 m); check on the ratio of times of flight; summary; exam tips.
- **Part 2 (second half of t02 and t03, 18 slides, 4 worked examples, 3 checks):** range derivation; range against angle (plot of R = u² sin 2θ/g, symmetric about 45°, marked at 30°, 45°, 60°); maximum range at 45° and R = 4H; equal ranges for complementary angles (figure of 30°, 45°, 60° at 39.2 m s⁻¹: 135.8 m, 156.8 m, 135.8 m); check on complementary angles; worked fire-hose jet (u = 21 m s⁻¹: R_max = 45 m; 35 m needs 25.5° or 64.5°); velocity at any instant (figure with the velocity arrows at 0 s, 2 s and 3 s); speed along the path (plot: 39.2, 33.9 at the top, 39.2 m s⁻¹); worked velocity of the goal-kick ball at 2.5 s (20.7 m s⁻¹ at 25° below the horizontal); check on the speed at the top; horizontal projection (figure: 20 m s⁻¹ from a 19.6 m cliff, T = 2 s, R = 40 m, v = 28.0 m s⁻¹ at 44.4° below); thrown against dropped (strobe figure); worked stone from a 45 m bridge at 12 m s⁻¹ (T = 3.03 s, R = 36.4 m, 32.0 m s⁻¹ at 68.0° below); check on a faster throw; worked relief packet (20 m s⁻¹ from 490 m: T = 10 s, R = 200 m, 100 m s⁻¹); summary; exam tips.
- Visuals on all 34 slides (14 SVG, 10 tables, 10 plots; 6 distinct SVGs, 5 distinct plots, 7 reusable tables plus a summary table in each deck).
- **Diagrams (6 SVGs, 6 self-checks plus 7 worked-example checks in the build, all pass):** strobe picture of a ball thrown at 39.2 m s⁻¹ at 30° (equal horizontal gaps of 33.9 m, vertical arrows shrinking by 9.8 m s⁻¹ per second, top at half the range and 19.6 m); terms at 45° (H/R = tan θ/4 = 1/4, launch slope tan 45° = 1, apex at half the range); three paths at one speed (30° and 60° land together at 135.8 m, 45° at u²/g = 156.8 m, heights in the ratio 1 : 2 : 3); velocity arrows tangent to the path at 0, 2 and 3 s (lengths |v| × 1.6 px, direction 16.1° below the horizontal at 3 s); horizontal launch at 6.6 px per metre (a quarter of the drop in half the time, T = 2 s, R = 40 m, v = 28.0 m s⁻¹); thrown and dropped balls at equal heights at five instants. All six were rendered and inspected (see Verifier pass).
- **Plots (computed, 5):** v_x and v_y against t; the trajectory y(x) with the launch, top and landing marked on the curve (vertical scale stretched); y(t); R(θ) with three marked angles; speed v(t) with its minimum at the top. All use analytic `functions`; every marked point lies on its curve (stage-4 lint).
- **Narration:** 9–81 words per slide (mean 58), TTS-safe, numbers and units in words (generated from the same variables by `W()` and `N()` in `words.mjs`).
- **Notes:** 3 sections (one per topic) with extra figures and tables; 30 flashcards (t01 9, t02 13, t03 8).

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5) |
| assertion-reason | 6 | 1 (keys a, d, c, b, d, a: a 2, b 1, c 1, d 2) |
| true-false | 2 | 1 (true, false) |
| fill-blank | 2 | 1 |
| numerical | 6 | 1 (1), 2 (3), 3 (2) |
| short | 12 + 13 | 2 (30–50 words) / 3 (50–80 words; includes the derivations of the trajectory, T, H, R, R_max, v(t) and horizontal projection) |
| long | 8 | 5, set in parts with marks shown: independent motions and the trajectory (t01, t02); T, H and H = gT²/8 (t02); R, maximum range and complementary angles (t02); horizontal projection from a balcony, derivation plus numbers (t03); velocity at time t, derivation plus numbers (t03); a rugby kick in five numerical parts (t02, t03); relief packet from an aircraft (t03); three angles at one speed (t02) |

- **Difficulty:** d1 4 · d2 27 · d3 34 · d4 5 · d5 2.
- **Competency:** recall 4 · understanding 32 · application 28 · analysis 8. Application or higher **50% of items (54% of marks)**. Derivations, explanations and AR items are `understanding` or `analysis`; items that apply a formula to numbers are `application`. The two d5 items are `analysis`: `halfh-mcq` (speed at half the maximum height) and `sameh-short3` (the two instants at one height and the distance between them).
- **Topic tags:** t01 15 · t02 38 · t03 25 (some items carry two tags).
- Every numerical item (1, 2 or 3 marks) is computed in code; numbers appear in every topic (components and speed at the top in t01, T/H/R/angles in t02, velocity and horizontal projection in t03).
- No case-based items (the ISC pattern sets 5-mark questions in parts).

## Chapter tests
Item numbers are the bank order (`q_isc11phy_ch04_NNN`); `*` marks an internal choice (attempt one of the pair).
- **Short (20 marks, 50 min, `isc-11-default-chapter-test-short`):** A q001, q007, q013, q021 (mcq) and q023 (AR) · B q040, q044 or q048 · C q052, q055 or q057 · D q068.
- **Long (40 marks, 100 min, `isc-11-default-chapter-test-long`):** A q002, q003, q005, q008, q012, q015, q017, q018, q019, q022 (mcq), q024 and q025 (AR) · B q041, q046, q047 or q051 · C q053, q054, q058, q061 or q060 · D q067, q069 or q071.

## Validation
- Build: 0 validator errors, 0 warnings; 613 maths strings parsed (KaTeX 0.19.0 strict); 20 SVG visuals / 6 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; `bank.duplicate` pre-check (physics and science chapters, exemplars): 0. Two consecutive builds are byte-identical (md5 of `release.json` 78f17fd26bb8831de988618c4052be3e, of `tests.json` dd4c88733c8827a7809872e3744aa111).
- 39 scripted re-solve checks pass: each numerical, the MCQs and the short and long answers with numbers are re-solved by a different route (a leapfrog integration of the flight for T, H and R; position differencing for the velocity at an instant; a stepped free fall for the horizontal-projection times; the energy form v² = u² + 2gh for landing speeds; reading the range back by launching at the computed speed or angle; the other form of the formula for ratios such as H ∝ sin² θ). Every printed number in solutions, model answers and marking schemes comes from the same computed variables. The worked examples in the decks are re-derived by stepped integration in `build.mjs` (7 self-checks).
- Gate commands (content gates, originality): see the subject-producer's handoff note.

## Verifier pass (2026-11-09)
Every question was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Word limits:** thirteen model answers (the 3-mark numericals and derivations, two 2-mark answers and four long answers) had too few words outside the formulae for the limits; prose was added (explaining each step), not padding.
2. **Printed numbers:** floating-point artefacts were removed (a 3-mark solution printed 490.00000000000006; the shared closed-form values of the strobe ball such as T = 3.9999999999999996 are now rounded once with `R6` before printing); one solution wrote "+ −9.601²" inside a square root and had an odd `$`, which the pipeline arithmetic check caught, and now uses the magnitude.
3. **Algebra:** the long answer that proves H = gT²/8 first wrote u² sin² θ = (gT²/4)·g; it now writes g²T²/4. A short answer read "In this problem R = 3H, we have …" and was reworded.
4. **Figures:** after the first render the terms figure and the complementary-angle figure had a label outside the frame (heights raised to 230 px), the horizontal-launch figure had the landing label cut off and two lines of text overlapping (labels moved), the strobe figure had two time labels on top of each other (labels moved above the blue dots, frame 182 px), the strobe-ball figure had the last time label crossed by the red arrow (label moved left), the velocity figure's label 3 sat on the path (moved) and the u label overlapped the path (moved). The self-check for the velocity figure compared the angle with the wrong sign and was corrected. A render check now reports no clipping or overlap, and every PNG was viewed.
5. **Facts double-checked:** sin 30° : sin 60° = 1 : √3 for the times of flight, sin² 30° : sin² 60° = 1 : 3 for the heights; tan θ = 4 gives 75.96°; R = 3H gives tan θ = 4/3 and 53.13°; the speed at half the maximum height at 60° is u√(5/8) = 0.791 u (v_x² = u²/4, v_y² = 3u²/8); on the Moon R and T both scale as 1/g; 18 m s⁻¹ at 60° gives 9.0 and 15.6 m s⁻¹; 12 and 16 m s⁻¹ components give 20 m s⁻¹ at 53.1°; a ball at 39.2 m s⁻¹ and 30° has T = 4 s and H = 19.6 m; the packet falls 313.6 m in 8 s and lands 480 m ahead at 98.7 m s⁻¹.

**Facts a reviewer should double-check:** (a) that the one mention of v² = u² − 2gy (speed at a height) on the "speed along the path" slide and in `halfh-mcq` is acceptable before the work–energy chapter (it is derived from components in the item's solution); (b) the ISC range of derivations: the range is derived two ways (from T and from y = 0) and the maximum range from sin 2θ ≤ 1 with no calculus; (c) the two d5 items, which use only the equations of this chapter; (d) `rh-mcq` (tan θ = 4, about 76°) is rated d4; (e) the trajectory plot stretches the vertical scale (stated in the caption and alt text); (f) the 3-mark `hproj-num` and `findu-num` numericals (one value with three scheme steps).

## Known gaps
- Sketches asked for in answers (`sketch-long` part a) are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae; the other figures are drawn to the stated scales.
- Projectile motion on an inclined plane, launch from a height at an angle and air resistance are not taught (syllabus scope).
- Narration was not run through TTS (stage 8); slide `audio` is null.
- The ISC file gives no Class XI specimen paper, so the 2-, 3- and 5-mark item styles follow the ISC 12 pattern; mark splits are the writer's.
