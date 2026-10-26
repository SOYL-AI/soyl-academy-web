# CBSE Class 10 Science, Chapter 10 — The Human Eye and the Colourful World

`cbse-10-science-ch10` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (21 + 24 slides), notes (6 sections), 32 flashcards, 80 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch10_short` (20 marks, 40 min) and `t_cbse10sci_ch10_long` (40 marks, 90 min). The two tests share no questions. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are covered.
- **Removed topic respected:** the colour of the Sun at sunrise and sunset (excluded by CBSE for 2026-27) is not taught or asked; the notes' exam tips say so. Danger-signal colours, which are usually explained with the same idea, are also left out.
- The angle of deviation is taught from its definition (the sum of the turns at the two faces). The relation $\delta = i + e - A$ is used only where a question or passage states it.
- The near point is taught with the board convention (about 25 cm for a young adult); the illustrative near-point data in the presbyopia plot and case q078 follow that convention.
- NCERT text-box material (eye donation, why two eyes) is not used.

## Shape
- **Part 1 (t01–t02, 21 slides):** parts of the eye and their roles; light → retina → optic nerve → brain; pupil in bright and dim light; accommodation; near and far point; cataract; the three defects; myopia, hypermetropia and their corrections; presbyopia and bifocals with a near-point-vs-age plot. Worked examples: power of the eye lens for far and near objects (50 D → 54 D), myopia lens for a far point of 1.5 m (−0.67 D), reading glasses for a near point of 50 cm (+2 D).
- **Part 2 (t03–t06, 24 slides):** prism terms; ray through a prism; slab vs prism; dispersion and VIBGYOR; why colours separate; Newton's recombination; the rainbow in a drop and in the sky; atmospheric refraction (hot air, star position, twinkling vs planets, advance sunrise and delayed sunset); Tyndall effect; blue sky; particle size and colour. Worked examples: adding the deviation face by face (37.2°), where to look for a rainbow at 4:30 p.m. in Kochi.
- Layouts: title 2, concept 14, diagram 13, example 5, check 7, summary 2, exam-tips 2.
- **Visuals in decks (33 of 45 slides):** table 18, svg 13, flow 1, plot 1. Notes add 13 SVGs (re-used deck diagrams), 2 tables and the plot.
- **Diagrams (13 hand-written SVGs, geometry computed):** labelled eye cross-section; accommodation (thin vs thick lens, paraxial ray trace); myopia and hypermetropia, each in three panels (defect, eye's own far/near point, corrected with the right lens — ray paths traced through both lenses with the thin-lens equation, so the corrected rays really meet on the retina); ray through a prism (exact Snell's law, n = 1.5, i = 48°, giving r = 29.7°, e = 49.2°, δ = 37.2°, all quoted on the slide); dispersion (spread exaggerated, labelled); recombination by an inverted prism; Descartes ray through a raindrop (red n = 1.331 exits at 42.4°; violet index exaggerated, stated in the caption); rainbow geometry in the sky; star refraction through layered air (exaggerated); advance sunrise; Tyndall effect in salt solution vs milk-water; blue sky by molecular scattering. Named hues are used where colour is the point (red/blue rays, brown iris, yellow Sun) and every colour is also written in a label.
- **Narration:** 20–73 words (mean 55); no symbols, units as words ("dioptres", "centimetres"); contexts include a cinema hall, a school bus, a railway departure board, Lohri, Puri beach, Athirappilly falls, Hanle observatory, a Coorg coffee estate and a Jaipur dust storm.

## Question bank (80)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 | 1 (keys a 8, b 8, c 7, d 7) |
| assertion-reason | 8 | 1 (keys a 2, b 2, c 2, d 2) |
| true-false | 5 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 6 | 2 (accommodation 4 D, −0.4 D, far point 40 cm, +2.67 D, +1.5 D, deviation 36°) |
| short | 8 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` is set on the 13 of 19 short/long items whose model answers are prose. It is left out of numerical written answers and of multi-part 5-mark answers (q015, q064, q074), whose four sub-answers together run past 120 words.
- **Difficulty:** d1 15 · d2 30 · d3 28 · d4 6 · d5 1.
- **Competency:** recall 15 · understanding 25 · application 30 · analysis 9 · evaluation 1. Application or higher is **50% of items (59% of marks)**.
- **Topic tags:** t01 17 · t02 21 · t03 9 · t04 14 · t05 12 · t06 11.
- **Cases:** eye-camp data for four volunteers (data; myopia power, reading glasses or bifocals), prism lab with an i–e–δ table (data/lab; minimum-deviation trend, d4 part), rainbow in waterfall spray at 9 a.m. vs noon (everyday), near points of a family by age (data; evaluate a claim, d4 part), twinkling of Sirius vs steady Venus and high-altitude observatories (everyday), torch through four jars (lab; Tyndall effect, blue sky and white clouds).
- **Deck checks:** q002, q006, q017 (Part 1); q035, q043, q056, q066 (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q003, q036, q057, q042 · B q013, q062, q031 · C q015 or q054 · D q077.
- **Long (40 marks, 90 min):** A q001, q006, q017, q033, q044, q058, q066, q068, q020, q060 · B q014, q072, (q028 or q052), q030, (q040 or q063) · C q032 + (q064 or q074) · D q075, q080.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars`: **0 errors, 0 warnings**.
- Scratch validator: 209 maths strings parsed (KaTeX 0.19.1 + mhchem, strict); 42 numeric `=`/`≈` links recomputed after stripping units, none wrong; a "maths command without backslash" check (added in this batch, see the verifier pass); 26 SVG visuals / 13 distinct diagrams pass the allow-list (elements, attributes, class pattern, palette, viewBox, title, font size ≥ 11); narration max 73 words with no symbols or unit abbreviations; every check slide points to an objective item.
- Independent re-solve: 9/9 numerical items and parts, plus 36 other stated numbers (worked examples, written numericals, the prism table in case q076 against Snell's law with n = 1.5, diagram angles) recomputed by a separate script. Every SVG was rasterised and checked by eye.

## Verifier pass (2026-10-27)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Lost backslashes:** the first build of Part 1 and Part 2 had worked-example bullets written in ordinary JS strings, so `\dfrac` and `^\circ` lost their backslash. KaTeX still parsed them (as plain letters), so neither the parser nor the gate noticed. A new validator rule (maths command names without a backslash) caught 30 spans; the strings were converted to raw templates and re-checked.
2. **Near-point data vs the board convention:** the first presbyopia plot and case q078 used physiological near points (9–13 cm for teenagers and young adults). These contradict the "about 25 cm for a young adult" that students are taught. Both now follow the convention (young adults about 25 cm, steep rise after 40), and the case's answer keys were re-checked.
3. **Assertion–reason q020** could be read as keyed (a). Its assertion now names a person with both myopia and hypermetropia, so presbyopia (R) is clearly true but not the explanation, and the key (b) is unambiguous.
4. **Rainbow case q077, part (c)(ii):** a high Sun does not stop a bow forming in spray below eye level. The passage now places the spray at eye level, so the noon answer holds.
5. **Competency honesty:** the first draft had 41% of items at application or above. Eight items were rewritten into new contexts that genuinely need application or analysis rather than relabelled: q019 (bifocals at a railway station), q034 (a myopic girl tries reading glasses, d5), q036 (torch spot moving towards the base), q040 (slab vs prism measurements), q045 (setting up recombination), q059 (a star measured 1° above the sea), q068 (whitish sky after a dust storm), q073 (shafts of light in a misty estate). The share is now 50%.
6. **Word limits:** three multi-part long answers no longer carry `word_limit`. q030, q041 and q062 were tightened to fit theirs.
7. **Facts double-checked:** cornea does most refraction; iris controls pupil; real inverted image; accommodation (relaxed → thin → longer f); myopia causes (curvature, elongated eyeball) → concave; hypermetropia causes (long f, small eyeball) → convex; presbyopia (weak ciliary muscles, stiff lens); bifocal upper concave / lower convex; violet deviated most; refraction–internal reflection–refraction in drops, red outermost, Sun behind observer; stars as point sources, planets extended; about 2 min advance and delay; Tyndall effect in colloids only; red wavelength about 1.8 × blue; sky dark at very high altitude.

## Known gaps
- Ray diagrams in model answers are described in words (Markdown cannot draw them); graders should accept any correct drawing.
- Exaggerated angles (dispersion spread, rainbow red–violet separation, star bending) are stated in captions; the real values are about 2° for the rainbow and less than a degree for star positions.
- The near-point-vs-age plot and the eye-camp and family data are illustrative, not measurements.
- `blueprint_id` is null on both tests, as for the exemplar.
