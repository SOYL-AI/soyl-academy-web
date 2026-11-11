# ISC Class 11 Physics, Chapter 7 — Circular Motion

`isc-11-physics-ch07` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (subject-producer chapter writer; reviewed by claude-opus-5-5)`, hand-authored under D-025/D-026/D-050)

Written by a Sonnet 5.5 chapter sub-agent under D-050 (resumed after an earlier writer was cut off by an API stall); reviewed by the subject-producer before commit.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (21 + 21 slides), notes (4 sections), 30 flashcards, 80 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11phy_ch07_short` (20 marks, 50 min, `isc-11-default-chapter-test-short`) and `t_isc11phy_ch07_long` (40 marks, 100 min, `isc-11-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders using the shared library `../isc-11-physics-ch01/src/lib.mjs` (read only), seed 1207. `npx tsx content/authored/physics/isc-11-physics-ch07/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `phys.mjs` holds the numerical helpers used by the independent re-solves (finite differences of the position on a circle, bisection on the net force, a stepped rotation and an RK4-stepped pendulum for the vertical circle); `svgs.mjs` the seven diagrams with self-checks; `words.mjs` number-to-words for the narration; `decks.mjs` all worked-example numbers, the plots and the tables; `study.mjs` notes and flashcards; `questions.mjs`, `questions-short.mjs`, `questions-long.mjs` the bank; `dump-svgs.mjs` writes the diagrams for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
Follows the ISC Class XI file `platform/catalog/cisce/isc-11/physics/syllabus.yaml` (chapter 7, topics t01–t04; `removed_topics`: conical pendulum), not the CBSE chapter.
- **t01** angular displacement (radian, s = rθ, vector along the axis by the right-hand rule), angular velocity (ω = dθ/dt = 2π/T = 2πf, rpm conversion), angular acceleration (α = dω/dt; ω = ω₀ + αt and θ = ω₀t + ½αt² for constant α, ω–t graph), and the links to linear quantities: v = rω along the tangent, a_t = rα, the total acceleration as the vector sum of a_t and a_c at right angles.
- **t02** centripetal acceleration derived from the change in velocity (two velocities of equal size Δθ apart, isosceles triangle, |Δv| = 2v sin(Δθ/2) ≈ vΔθ, a = vω = v²/r = ω²r = 4π²r/T², direction towards the centre as Δθ → 0); how a scales; centripetal force as the **name of a direction**, never an extra force: the real force that plays the role is identified each time (tension, static friction, gravity, a component of the normal reaction); it is perpendicular to v and does no work; the "centrifugal force" mistake is answered in an item.
- **t03** vehicle on a level road (static friction supplies mv²/r, N = mg, v_max = √(μrg), independent of the mass, lower when wet); banking of roads (N cos θ = mg, N sin θ = mv²/r, tan θ = v²/(rg), design speed √(rg tan θ), what tends to happen above and below it); railway track (outer rail raised by h = l sin θ ≈ lv²/(rg) over the gauge l, flanges).
- **t04** vertical circle on a string: T + mg = mv²/r at the top, least speed √(gr) (T = 0), T − mg = mv²/r at the bottom, energy conservation over the fall 2r (v_b² = v_t² + 4gr), least speed √(5gr) at the bottom, T_bottom − T_top = 6mg for any speed, a string cannot push (slack string).
- Constants stated in the stems: g = 9.8 m s⁻² in every item that uses it. No textbook, specimen or past-paper text is used; contexts are Indian or everyday (a potter's wheel, a ceiling fan, a Nashik workshop, a Kochi junction, a ghat road, a Lonavala curve, a broad-gauge track, a geostationary satellite, a well bucket, a hammer throw in Patiala).
- **Left out on purpose:** the conical pendulum (removed from the syllabus), banking with friction (maximum and minimum speeds on a banked road: not listed), the tension at angles other than top, bottom and level with the centre (one Part 2 slide headed "Going further (not examined)" shows the general-angle curve for interest; it is not in the notes, flashcards or any item), non-uniform circular motion beyond a_t and a_c, and CBSE-only extras.

## Shape
- **Part 1 (t01, t02, 21 slides, 4 worked examples, 4 checks):** title (figure: a particle on a circle, θ = 0.9 rad, s = 1.8 m, ω = 1.5 rad s⁻¹, v = 3.0 m s⁻¹); angular displacement and the radian (table); angular velocity (table of rotations from the clock hand to the Earth); v = rω (table for a merry-go-round); check; worked example 1 (potter's wheel, 75 rpm); angular acceleration (computed ω–t plot); tangential acceleration; worked example 2 (fan tip: 20 rad s⁻¹, 80 rad, a_t = 1.50, a_c = 240.0 m s⁻²); check; uniform circular motion is accelerated; the velocity triangle (figure, 4.23 m s⁻¹); derivation of a = v²/r; how a scales (plot of a against r); check; worked example 3 (cyclist, 3.00 m s⁻², 210 N); centripetal force as a name (figure: stone, coin, satellite); worked example 4 (stone on a table, 31.58 N, break limit 50 N); check; summary; exam tips.
- **Part 2 (t03, t04, 21 slides, 4 worked examples, 3 checks):** title (car on a level curve); level curve; v_max = √(μrg); worked example 1 (dry and wet bend); check; why bank (figure at 22.2°); derivation of tan θ = v²/(rg); worked example 2 (expressway curve, 22.20°, N = 8468 N); railway track (figure, h = 0.136 m on a 1.676 m gauge, to scale); worked example 3 (500 m, 20 m s⁻¹, h = 136 mm); other speeds on a banked track (computed plot of θ against v); check; vertical circle (figure at the least speeds); least speed √(gr) at the top; √(5gr) at the bottom (energy); tension at bottom and top, difference 6mg; check; worked example 4 (bucket at a well); going further, not examined: tension around the circle (plot); summary; exam tips.
- Visuals on all 42 slides (10 SVG slides, 26 table slides, 6 plot slides); 7 distinct SVGs, 4 computed plots, 18 tables.
- **Diagrams (7 SVGs, 14 self-checks plus 10 worked-example checks in the build, all pass):** ang (A and B on the circle, angle AOB = 0.900 rad, arc = rθ = 1.8 m, v = 3.0 m s⁻¹ perpendicular to OB); vtri (|v₁| = |v₂| = 5 m s⁻¹, angle between them 50° = Δθ, Δv from the chord midpoint towards O, |Δv| = 4.23 m s⁻¹, the triangle closes); who (three panels, force arrow along the line to the centre, velocity perpendicular); level (N = W = 11760 N, f = μN = 7056 N = mv²/r at 18.78 m s⁻¹); bank (road at 22.2° with tan θ = v²/(rg), N perpendicular to the road, N cos θ = mg, N sin θ = 3200 N, resultant W + N drawn horizontal towards the centre); rail (sleeper 300 px for 1.676 m, outer rail 24.4 px higher = 300 sin θ, drawn to scale); vert (top: T = 0 and v = √(gr) = 2.97 m s⁻¹; bottom: T = 29.4 N drawn six times as long as W, v = 6.64 m s⁻¹). The worked examples are re-derived by position differences, a stepped rotation, root finding and a stepped pendulum.
- **Plots (computed, 4):** ω against t for the fan (the point t = 8 s, 20 rad s⁻¹ on the line); a against r at fixed v and at fixed ω (the crossing at 3 m marked); banking angle against speed for r = 100 m (5.8° and 22.2° marked); tension in units of mg against the angle from the lowest point (6, 3 and 0). Every marked point lies on its curve.
- **Narration:** 9–84 words per slide (mean 60), TTS-safe, numbers and units in words (generated from the same variables by `W()` and `N()` in `words.mjs`).
- **Notes:** 4 sections (one per topic) with the figures and tables; 30 flashcards (t01 10, t02 8, t03 7, t04 5).

## Question bank (80)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6) |
| assertion-reason | 6 | 1 (keys a, b, d, c, b, a) |
| true-false | 2 | 1 (true, false) |
| fill-blank | 2 | 1 |
| numerical | 13 | 1 (4), 2 (5), 3 (4) |
| short | 12 + 12 | 2 (30–50 words) / 3 (50–80 words; includes the derivations of a = v²/r, v_max on a level road, tan θ for banking, h ≈ lv²/(rg), the least speed √(gr), √(5gr) from energy and T_bottom − T_top = 6mg) |
| long | 6 | 5, set in parts with marks shown: angular quantities and a braking wheel (t01); the a = v²/r derivation and a ball on an ice rink (t02); level road with dry and wet limits (t03); banking with a force diagram and a number (t03); railway outer rail with a number and the approximation (t03); vertical circle, least speeds and tensions (t04) |

- **Difficulty:** d1 8 · d2 35 · d3 30 · d4 5 · d5 2 (the "angle of 45° with the radius" numerical, which needs a_t = a_c and a time to be found; the "ball given 6.0 m s⁻¹ cannot complete the circle" item, which needs the √(5gr) condition, the energy argument and the place where the string goes slack).
- **Competency:** recall 5 · understanding 27 · application 38 · analysis 7 · evaluation 3. Application or higher **60% of items (66% of marks)**. Derivations, definitions and explanations are `understanding` or `recall`; items applying a formula to numbers are `application`; the "who supplies the force" free-body items, the AR items on direction versus force and the two d5 items are `analysis` or `evaluation`.
- **Topic tags:** t01 22 · t02 22 · t03 22 · t04 18 (some items carry two tags). Numericals appear in every topic.
- Every numerical item (1, 2 or 3 marks) is computed in code; the answers are re-solved by a different route (see Validation).
- No case-based items (the ISC pattern sets 5-mark questions in parts).

## Chapter tests
Item numbers are the bank order (`q_isc11phy_ch07_NNN`); "or" marks an internal choice (attempt one of the pair).
- **Short (20 marks, 50 min, `isc-11-default-chapter-test-short`):** A q003, q008, q017, q023 (mcq) and q030 (AR) · B q052, q059 or q062 · C q063, q065 or q068 · D q078.
- **Long (40 marks, 100 min, `isc-11-default-chapter-test-long`):** A q002, q004, q009, q011, q012, q019, q020, q021, q024, q027 (mcq), q029 and q031 (AR) · B q051, q055, q060 or q058 · C q064, q066, q069, q072 or q071 · D q076, q077 or q080.

## Validation
- Build: 0 validator errors, 0 warnings; 672 maths strings parsed (KaTeX strict); 17 SVG visuals / 7 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; `bank.duplicate` pre-check: 0. Two consecutive builds are byte-identical (md5 of `release.json` 50549f7eb1790b6b735d101b17ff4401, of `tests.json` d974d3da0aebb1a18a7650dfc2b26dcf, after the subject-producer review).
- 41 scripted re-solve checks pass on the bank, plus 24 diagram and worked-example self-checks. Each numerical, MCQ, short and long answer with numbers is re-solved by a different route: finite differences of the position of a point on the circle (speed, centripetal acceleration, tension as m times the second difference), a stepped rotation for ω and θ, bisection on the net inward force for the greatest speed on a level road, bisection on the vertical force balance for the banking angle and the design speed, and a stepped RK4 pendulum for every vertical-circle number (speeds and tensions at top and bottom, the least bottom speed, and the failure of a slower ball to reach the top). Every printed number in solutions, model answers and marking schemes comes from the same computed variables.
- Gate commands (content gates, originality): see the subject-producer's handoff note.

## Verifier pass (2026-11-10, resumed build)
Every question was re-solved from its stem against the dumped bank. Findings and fixes:
1. **Re-solve tolerance:** two worked-example checks and one item re-solve failed only because the finite-difference second derivative used a step of 10⁻³ (relative error about 3 × 10⁻⁵ at ω = 20 rad s⁻¹) and one compared a rounded key at 10⁻⁹; the step is now 10⁻⁴ and the tolerance 10⁻⁶. The physics was right.
2. **Floating-point text:** the two-bead MCQ printed "2.9999999999999996 times"; the ratio is now computed as an integer (3 times, 9 times).
3. **Word limits (eleven items):** the 2-mark answers on "which force" and "centrifugal" were trimmed (62 and 61 words against 30–50); the 3-mark derivations and numericals and four 5-mark answers had 31–63 words outside the formulae against 50–80 and 80–120, and now explain each step in words. All 30 limited items sit inside their stated ranges.
4. **Pipeline flag:** the banking-angle numerical did not write "= value" for the angle in plain numbers (a degree sign makes the side non-numeric for the checker); it now writes "θ = 15.40 degrees".
5. **Typography:** minus signs in the braking-wheel scheme; "7.272 × 10⁻⁵" instead of an exponent in code notation.
6. **Two d5 items added** (45° numerical, ball that cannot complete the circle) so that the difficulty spread reaches 5; both are re-solved by root finding or by the stepped pendulum.
7. **Figures (all seven rendered and looked at):** no clipped text, no overlaps, no "outside viewBox" reports; arrows point as drawn in the self-checks (v anticlockwise at B; Δv towards O; N tilted towards the centre; W and N add to the horizontal mv²/r (fixed in the review below); the outer rail on the side away from the centre; top velocity leftwards and bottom velocity rightwards for one sense of rotation).
8. **Slide references:** slides 2 and 3 of Part 1 said "in the figure" while showing a table; they now point to the figure on the title slide.

**Facts a reviewer should double-check:** (a) the d5 labels on the 45° numerical and on `notcomplete-short3` (hardest in the bank, but short); (b) Part 2 slide 19 and the formula T = 3mg(1 + cos φ) go slightly beyond "top and bottom": they are the general-angle tension for the least bottom speed, shown only on one slide, one formula line and one plot and not asked in any item (drop them if the reviewer reads the syllabus strictly); (c) the "geostationary satellite" numerical uses r = 4.22 × 10⁷ m and T = 86 400 s (a = 0.223 m s⁻²); (d) the statements about banked roads above and below the design speed (outwards and up the slope, friction down the slope; inwards and down the slope) are qualitative, as the syllabus asks; (e) on a level road the sideways friction is called static friction, as the tyres do not slide.

### Subject-producer review (2026-11-10, Opus)
Rebuilt with a dump and re-solved every one of the 80 items by hand (keys, every number in solutions, model answers and schemes, step marks adding to the marks, MCQ distractors, AR keys, one-mark schemes with the final value); read all 42 slides, the notes and the 30 flashcards against the items and the syllabus; rendered and looked at all 7 SVGs. All keys and numbers were right. Findings and fixes:
1. **AR key ambiguity (q029 `vmax-ar`, key b):** R ("the centripetal force is supplied by friction") is half of the explanation of A (friction μmg is proportional to the mass), so (a) was arguable. R is now "On a level curve of larger radius the greatest safe speed is higher, for the same road surface": true, and plainly not the reason the mass drops out. Key stays b; AR keys a, b, d, c, b, a.
2. **Scope, T = 3mg(1 + cos φ):** the syllabus asks for the top and the bottom only. Part 2 slide 19 is now headed "Going further (not examined)" with a bullet and a narration sentence saying so; the formula line was removed from the notes section 4 formula list. No flashcard or item used it. The "level with the centre" row (T = mv²/r = 3mg) stays: it only needs the radial equation there.
3. **Figure BANK:** the dashed side of the force triangle was drawn from the head of N back to the tail of W, i.e. as −(W + N), so it pointed away from the centre (a closed equilibrium triangle for an accelerated car). It is now the resultant W + N, from the tail of W to the head of N, pointing towards the centre; a self-check asserts the direction. Re-rendered.
4. **q026 `bucket-mcq` solution** said the bucket must push the water down "with at least the force it needs"; it now gives N = mv²/r − mg ≥ 0, hence v ≥ √(gr).
5. **q016 `period-mcq` solution** listed "v or ωr" (the same thing) as two error sources; reworded.
6. **q043 `geo-num` solution** printed ω as 0.00007272; now 7.272 × 10⁻⁵ as in the scheme.
7. **q074 `notcomplete-short3`:** the negative v² printed with an ASCII hyphen; now a minus sign. The model answer said the tension falls to zero "above the level of the centre, where…", which read as if at that level; it now says at some point on the upper half.
8. **q001 `rad-mcq`:** the distractor "1°, because the arc is 40 m" now prints the arc from the variable.
9. **Slides:** Part 1 slide 13 narration "the change in speed vector" now "the size of the change in velocity"; Part 1 slide 8 table put "ω²" in the angular column for the centripetal row (now "uses ω"); Part 2 title slide "real force at work" now "real forces at work"; Part 2 exam tip "adding mg at the bottom instead of subtracting" was confusing (T = mv²/r + mg is right) and now names the actual mistake, writing T + mg = mv²/r at the bottom.
10. **Checked and left:** competency labels are honest (numericals and formula-applying MCQs are application; derivations are understanding); application or higher 60 % of items; every topic has numericals; check slides match their items; narration has no symbols or abbreviations; no option is referred to by position (all schemes use @K). The 3 rev s⁻¹ hammer item says "treating the wire as horizontal", which keeps it clear of the removed conical pendulum.

Final build: 0 errors, 0 warnings, lint 0/0, 41/41 re-solves, all self-checks ok, 0 `bank.duplicate`; two builds byte-identical (md5 above).

## Known gaps
- Sketches asked for in answers (force diagrams, velocity triangle) are described in words; graders should accept any correct sketch. Plots in the slides are computed from the stated formulae; the other figures are drawn to the stated scales.
- Banking with friction and the conical pendulum are not taught (syllabus scope).
- Narration was not run through TTS (stage 8); slide `audio` is null.
- The ISC file gives no Class XI specimen paper, so the 2-, 3- and 5-mark item styles follow the ISC 12 pattern; mark splits are the writer's.
