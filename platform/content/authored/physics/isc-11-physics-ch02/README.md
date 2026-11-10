# ISC Class 11 Physics, Chapter 2 — Motion in a Straight Line

`isc-11-physics-ch02` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer chapter writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050; reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (21 + 21 slides), notes (5 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11phy_ch02_short` (20 marks, 50 min, `isc-11-default-chapter-test-short`) and `t_isc11phy_ch02_long` (40 marks, 100 min, `isc-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../isc-11-physics-ch01/src/lib.mjs` (read only). `npx tsx content/authored/physics/isc-11-physics-ch02/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the numerical helpers (derivative, Simpson integral, path length, root finder) used by the independent re-solves; `svgs.mjs` the seven diagrams with self-checks; `decks.mjs` all worked-example numbers, number-to-words for the narration and the plots; `questions.mjs`, `questions-short.mjs`, `questions-long.mjs` the bank; `study.mjs` notes and flashcards; `dump-svgs.mjs` writes the diagrams for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
Follows the ISC 2028 Class XI file `platform/catalog/cisce/isc-11/physics/syllabus.yaml` (chapter 2, topics t01–t05), not the CBSE chapter.
- **t01** frame of reference, point mass, rest and motion (relative); distance and displacement; average speed and average velocity; instantaneous velocity as the limit of Δx/Δt (chord to tangent).
- **t02** elementary calculus for physics, taught from first principles: the derivative as a rate of change (limit definition, shown for x² and x³), the power rule for any n (including negative powers), constants and constant multiples, term-by-term sums; derivatives of sin x, cos x, eˣ and ln x (angle in radian); integration of xⁿ (n ≠ −1), indefinite (with the constant fixed by a starting value) and definite (area under the curve, strips); v = dx/dt, a = dv/dt, x = ∫v dt, Δx = ∫v dt between limits.
- **t03** uniform and non-uniform motion, average and instantaneous acceleration, sign rules (speeding up or slowing down), the s–t, v–t and a–t graphs for uniform velocity and uniform acceleration, slope and signed area.
- **t04** v = u + at, s = ut + ½at² and v² = u² + 2as derived by the **graphical** method (slope and area of the v–t graph), the **calculus** method (integrating a = dv/dt and v = dx/dt, and a = v dv/dx) and the **analytical** method (definitions, mean velocity ½(u + v), algebra); s = ½(u + v)t and the distance in the nth second as applications; numericals.
- **t05** motion under gravity in one dimension: g = 9.8 m s⁻² downward at all times, free fall from rest (distances 1 : 3 : 5), a body thrown up (t = u/g, H = u²/2g, flight 2u/g, return speed u), the v–t graph of a ball thrown up and returning to the hand, a throw from a tower.
- Constants stated in the stems: g = 9.8 m s⁻²; 1 m s⁻¹ = 3.6 km h⁻¹; e = 2.718 where a number is printed. No textbook, specimen or past-paper text is used; contexts are Indian (canal road, cyclist to a market, toll plaza, palm coconut, bridge over a river, metro train, goods train, cliff).
- **Left out on purpose:** chain rule, product and quotient rules, and integrals other than xⁿ (the syllabus file removes "evaluation of integrals beyond the simple idea of integrating x^n"); the examples use sin t, eᵗ and ln t with the argument t itself so the chain rule is not needed. Relative velocity, reaction time and stopping distance (CBSE extras in the CBSE 11 chapter) are not taught here because the ISC file does not list them.

## Shape
- **Part 1 (t01, t02 and acceleration from t03, 21 slides, 6 worked examples, 4 checks):** frame of reference and point mass; distance and displacement (cyclist 900 m out and 350 m back: distance 1250 m, displacement 550 m, average speed 5.0 m s⁻¹, average velocity 2.2 m s⁻¹); average speed and velocity (table); two legs of a train journey (120 km at 40 and 120 km at 60 km h⁻¹ give 48 km h⁻¹, not 50); instantaneous velocity as a limit (chords of x = 2t² with slopes 12, 10, 9 m s⁻¹ closing in on the tangent slope 8); calculus 1 (derivative from first principles, power rule); worked x = 4t³ − 3t² + 2t + 6 (v(2) = 38, a(2) = 42, mean 42 m s⁻¹ over 1–3 s); calculus 2 (sin, cos, eˣ, ln, with the sin/cos curves plotted); worked 5 sin t, 2eᵗ, 3 ln t; calculus 3 (integration, definite integral as area under v = 3t² from 1 s to 3 s = 26 m by strips); worked v = 3t² + 4t (displacement 42 m, x(2) = 21 m with x₀ = 5 m); acceleration and sign rules; worked x = t³ − 6t² + 9t (rest at 1 s and 3 s, displacement 4 m, distance 12 m); summary; exam tips.
- **Part 2 (t03 graphs, t04, t05, 21 slides, 5 worked examples, 3 checks):** the six basic motion graphs; slope and area; worked metro v–t graph (704 m, 12.1 m s⁻¹); the three equations; **graphical** derivation (u = 5, v = 17, t = 6: a = 2 m s⁻², s = 66 m) in two slides (first two equations, then v² = u² + 2as from the trapezium and the slope); **calculus** derivation; **analytical** derivation; worked braking of a goods train (54 km h⁻¹ over 150 m: a = −0.75 m s⁻², 20 s); worked distance in the 6th second (8.25 m, two ways); motion under gravity (table of 1 : 3 : 5 : 7); worked coconut (2.5 s: 30.6 m, 24.5 m s⁻¹); thrown upward (strobe picture, u = 29.4 m s⁻¹: top 44.1 m at 3 s, flight 6 s); v–t graph of the throw (plot); worked stone thrown up from a 49 m tower (lands after 5 s at 34.3 m s⁻¹); summary; exam tips.
- Visuals on all 42 slides (14 SVG, 22 tables, 6 plots).
- **Diagrams (7 SVGs, 7 self-checks plus 7 worked-example checks in the build, all pass):** position axis along a canal road (0.4 px per metre); path length against displacement drawn to scale (0.36 px per metre); chord slopes of x = 2t² from pixel geometry equal to 4t + 2Δt and shrinking to the tangent slope 8 (numerical derivative agrees); strips under v = 3t² bracketing the shaded polygon area 26.003 m (exact 26 m); six s–t, v–t and a–t shapes tested on their slope behaviour; v–t rectangle + triangle = (u + v)t/2 and slope = a; strobe picture of the throw at 4 px per metre with heights and speeds symmetric about the top (u²/2g, u/g, 2u/g). All were rendered and inspected: three label overlaps, one clipped caption and the row spacing of the six-graph figure were fixed (see Verifier pass).
- **Plots (computed, 6):** sin t with cos t (the slope); x(t) and v(t) of the cubic particle (v = 0 marked by dashed lines); metro v–t line; ball thrown up, v–t line and y–t arch. Analytic `functions` where possible.
- **Narration:** 4–83 words per slide (mean 58), TTS-safe, numbers and units in words (generated from the same variables by `W()` in `decks.mjs`).
- **Notes:** 5 sections (one per topic) with extra figures and tables; 30 flashcards (t01 8, t02 8, t03 6, t04 5, t05 3).

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5) |
| assertion-reason | 6 | 1 (keys c, b, a, d, a, c: a 2, b 1, c 2, d 1) |
| true-false | 2 | 1 (false, true) |
| fill-blank | 2 | 1 (one with two blanks) |
| numerical | 10 | 1 (4), 2 (2), 3 (4) |
| short | 11 + 11 | 2 (30–50 words) / 3 (50–80 words; includes the derivations) |
| long | 7 | 5, set in parts with marks shown: van and toll plaza (t01); x = 3 sin t + 2t² (t02); v = 3t² − 6t, displacement and distance by integration (t02, t03); the three motion graphs and a lift (t03); graphical derivation of all three equations (t04); calculus derivation of all three equations plus a car (t04); thrown up at 39.2 m s⁻¹ (t05) |

- **Difficulty:** d1 8 · d2 35 · d3 23 · d4 4 · d5 1.
- **Competency:** recall 2 · understanding 33 · application 34 · analysis 2. Application or higher **51% of items (54% of marks)**. Derivations and explanations are `understanding`, numericals `application`; `meet-num` (two balls, one dropped and one thrown up) is `analysis`, d5, and the assertion-reason `riseequal-ar` is `analysis`.
- **Topic tags:** t01 15 · t02 17 · t03 12 · t04 14 · t05 15 (some items carry two tags).
- Every numerical item (1, 2 or 3 marks) is computed in code. Items with a negative result print "−" in plain text.
- No case-based items (the ISC pattern sets 5-mark questions in parts).

## Chapter tests
Item numbers are the bank order (`q_isc11phy_ch02_NNN`); `*` marks an internal choice (attempt one of the pair).
- **Short (20 marks, 50 min, `isc-11-default-chapter-test-short`):** A q002, q007, q019, q029 (mcq) and q038 (AR) · B q043, q046 or q049 · C q054, q060 or q061 · D q070.
- **Long (40 marks, 100 min, `isc-11-default-chapter-test-long`):** A q001, q003, q005, q008, q010, q018, q020, q027, q033, q034 (mcq), q013 and q030 (AR) · B q045, q047, q052 or q050 · C q055, q057, q059, q062 or q063 · D q067, q069 or q071.

## Validation
- Build: 0 validator errors, 0 warnings; 639 maths strings parsed (KaTeX 0.19.0 strict); 21 SVG visuals / 7 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; `bank.duplicate` pre-check (physics and science chapters, exemplars): 0. Two consecutive builds are byte-identical (md5 of `release.json` 5a2c16e64f0f42136e3ebd87d238848f, of `tests.json` 55f9fe9483a1203fa470345f51c2c1a3).
- 37 scripted re-solve checks pass: each numerical, the MCQs and short or long answers with numbers are re-solved by a different route (central-difference derivatives, Simpson integration of the velocity, sampled path length, bisection for the instants of rest, energy-free kinematic identities such as the fall from the top, the trapezium area against ut + ½at²). Every printed number in solutions, model answers and marking schemes comes from the same computed variables. The worked examples in the decks are re-derived by numerical calculus in `build.mjs` (7 self-checks).
- Gate commands (content gates, originality): see the subject-producer's handoff note.

## Verifier pass (2026-11-09)
Every question was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Word limits:** eight model answers (the first-principles derivative, the three accelerations/derivations, the last-second drop, the integration short, and two long answers) had too few words outside the formulae for the 3- and 5-mark limits; prose was added (explaining each step), not padding.
2. **Typography:** plain-text marking steps printed a hyphen for negative numbers (−12, −2, −19.6); a helper now prints the proper minus sign. One marking step said "m s⁻¹ per second" and was corrected to m s⁻².
3. **Narration:** the braking example said "fifty four kilometres per hour is fifteen" without the unit; it now says "fifteen metres per second".
4. **Figures:** the area figure's axis label overlapped its legend, the secant figure's legend overlapped the y-axis label, the six-graph figure's second row title collided with the first row's captions (row spacing 130 → 142 px, frame 300 px) and the strobe figure's last note was outside the frame (frame 300 px); the a = 0 graph is now drawn on the axis rather than just above it. A render check reports no clipping or overlap.
5. **Deck check slide:** the "at the top" check originally pointed to a key that did not exist; it now uses the assertion-reason on the highest point (`riseequal-ar`).
6. **Facts double-checked:** 54 km h⁻¹ = 15 m s⁻¹, 72 = 20, 90 = 25, 18 = 5; chords of x = 2t² have slope 4t + 2Δt, tangent 8 m s⁻¹ at 2 s; ∫₁³ 3t² dt = 26; x = t³ − 6t² + 9t has path 12 m and displacement 4 m in 4 s; v = 3t² − 6t gives x(2) = −4, x(4) = 16, distance 24 m; g(T − ½) = 24.5 gives T = 3 s and h = 44.1 m; the two balls (78.4 m tower, u = 39.2 m s⁻¹) meet at 2 s and 58.8 m; thrown at 39.2 m s⁻¹: H = 78.4 m, flight 8 s, v(6 s) = −19.6 m s⁻¹, y(6 s) = 58.8 m; tower throw: −49 = 14.7t − 4.9t² gives t = 5 s, landing speed 34.3 m s⁻¹.

**Facts a reviewer should double-check:** (a) that sin t, eᵗ and ln t with argument t (no chain rule) is the right depth for "derivatives of sin x, cos x, e^x and ln x"; (b) that the calculus derivation of v² = u² + 2as through a = v dv/dx (a one-line chain-rule step) is acceptable at the ISC level; (c) the 3-mark `rest-num`, `stopcar-num`, `thrown-num`, `meet-num` numericals (a single value with three scheme steps); (d) the d5 two-ball item, which uses only the equations of this chapter; (e) the narration for π/3 says "sixty degrees" for a radian argument.

## Known gaps
- Graph sketches asked for in answers (`lift-long` part a, `vtdesc-short3`, `st-short`) are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae; the other figures are drawn to the stated scales.
- No definite integrals of functions other than powers of x are asked; no product, quotient or chain rule (syllabus scope).
- Narration was not run through TTS (stage 8); slide `audio` is null.
- The ISC file gives no Class XI specimen paper, so the 2-, 3- and 5-mark item styles follow the ISC 12 pattern; mark splits are the writer's.
