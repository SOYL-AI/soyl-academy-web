# CBSE Class 10 Science, Chapter 9 — Light – Reflection and Refraction

`cbse-10-science-ch09` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 4 decks (21 + 14 + 13 + 21 slides), notes (8 sections), 32 flashcards, 86 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch09_short` (20 marks, 40 min) and `t_cbse10sci_ch09_long` (40 marks, 90 min), laid out as the default blueprints `cbse-10-default-chapter-test-short` / `-long`. No shared questions. |
| `src/optics.mjs` | **Ray-diagram generator.** Images are found with the mirror/lens formula (New Cartesian convention); incident rays are drawn to their exact intersection with the mirror sphere (or the thin-lens plane), and every reflected/refracted ray is aimed at the computed image point, so all rays meet at the image. Also draws the sign-convention, terms (P, F, C, R = 2f) and glass-slab figures (Snell's law with n = 1.5, i = 45°, lateral shift as a true perpendicular). `mirrorImage` / `lensImage` are reused by the re-solve checks. |
| `src/` (others) | `svgs.mjs` (19 diagrams), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; shared library `../cbse-10-science-ch06/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-10-science-ch09/src/build.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05). Derivations of the mirror and lens formulas are **not** required (syllabus) and are not given; the formulas are stated and applied.
- Sign convention: New Cartesian throughout, object on the left; mirror m = −v/u, lens m = v/u, mirror 1/v + 1/u = 1/f, lens 1/v − 1/u = 1/f; R = 2f for small apertures; power P = 1/f with f in metres, dioptre, lenses in contact add.
- Refraction: laws of refraction, Snell's law with given sines (no trigonometry beyond reading sines), absolute and relative refractive index from speeds (c = 3 × 10⁸ m/s), optical vs mass density (kerosene/water). Refractive index values are standard approximate values.
- Not included (other chapters or out of syllabus): total internal reflection, dispersion, the eye and its defects (Chapter 10), lens-maker's formula.

## Shape
- **Part 1 (t01), 21 slides:** laws of reflection; concave/convex; P, C, F, R = 2f (diagram); ray rules; six concave-mirror positions (six computed ray diagrams); image table; worked example (where to place a candle, f = 15 cm); convex mirror (diagram); uses; worked example (choosing mirrors); summary; exam tips.
- **Part 2 (t02), 14 slides:** sign-convention diagram; what the signs mean; mirror formula and magnification; worked examples (concave: u = −15, f = −10 → v = −30, m = −2, h′ = −8; convex: u = −30, f = +20 → v = +12, m = +0.4; dentist: m = +3, f = −12 → u = −8, v = +24); a plot of image distance against object distance (f = 10 cm, curve 10x/(x − 10) with three marked points that lie on it); sign summary; summary; exam tips.
- **Part 3 (t03), 13 slides:** refraction in everyday life; glass slab (diagram); laws and Snell's law; worked example (0.60/0.45 ≈ 1.33); refractive index and speed (with an n table); worked example (glass 2 × 10⁸ m/s, glass relative to water ≈ 1.13); optical vs mass density; summary; exam tips.
- **Part 4 (t04–t05), 21 slides:** convex vs concave lenses; terms and ray rules; six convex-lens positions (six computed ray diagrams); image table; concave lens (diagram); lens formula and magnification; worked examples (u = −18, f = +12 → v = +36, m = −2; u = −30, f = −15 → v = −10, m = +1/3; power −4 D and +2.5 D with −1.0 D in contact → +1.5 D, f ≈ 67 cm); power; summary; exam tips.
- **Visuals (57 of 69 slides; no gap longer than one slide):** table 33, svg 19, flow 4, plot 1. 18 distinct SVGs: 6 concave-mirror and 2 convex-mirror ray diagrams, 6 convex-lens and 2 concave-lens ray diagrams, the glass slab, the sign convention and the P/F/C/R = 2f figure (some reused in notes).
- **Narration:** 14–68 words (mean 54); every number, sign and formula spoken in words ("one over v plus one over u", "minus thirty centimetres", "F two", "two F one"); no symbols.

## Question bank (86)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 9 | 1 (keys a c a d b b d c a: a 3, b 2, c 2, d 2) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 12 | 1–2 (v = −30 cm; m = −0.67; v = +6 cm; v = 2.4 × 10⁸ m/s; n = 1.56; n_dg = 1.61; n = 1.33; v = +30 cm; v = −10 cm; P = +2.5 D; f = 40 cm; m = +3) |
| short | 6 + 9 | 2 / 3 (most are step-marked numericals or ray diagrams) |
| long | 6 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives`; every case has a numerical part |

- **Contract v2:** `passage_origin: "soyl-original"` on every passage; `word_limit` only on the 8 prose short/long answers (numericals and ray-diagram answers are step-marked, so no word limit).
- **Difficulty:** d1 13 · d2 28 · d3 34 · d4 10 · d5 1.
- **Competency:** recall 9 · understanding 24 · application 42 · analysis 11. Application or higher is **62% of items (68% of marks)** — inside the lint band (45–65%) but higher than the biology chapters, because this chapter's board questions are largely numerical and diagram applications.
- **Topic tags:** t01 24 · t02 23 · t03 21 · t04 16 · t05 16.
- **Cases:** torch reflector with the bulb at 2, 4 and 6 cm (industry); a lab table of u and v for a concave mirror with a no-image trial (data, focal length −20 cm found from the data); convex mirrors on Himachal hill-road bends and "objects in mirror are closer than they appear" (everyday, m ≈ 0.11); Snell's-law data for three angles (lab, sines checked to three decimals); a watch repairer's loupe at 4 cm and 7 cm (everyday, +20 D, m = +5 vs real inverted); a camera focusing table (u = 100/50/20 cm → v = 11.1/12.5/20.0 cm).
- **Deck checks:** q001, q010, q006 (Part 1); q019, q027, q022 (Part 2); q035, q041, q045 (Part 3); q055, q068, q076 (Part 4) — all objective.

## Chapter tests (default blueprints)
- **Short:** A q004, q037, q073 (MCQ), q028 (A-R) · B q015, q077 (2 marks), q031 (3 marks) · C q018 or q080 · D q083.
- **Long:** A q008, q009, q025, q026, q036, q038, q056, q060 (MCQ), q011, q047 (A-R) · B q030, q051, (q050 or q065), q053, (q078 or q079) · C q054 + (q033 or q034) · D q082, q085.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars` (stricter M2 lint: bare LaTeX names, control characters in maths, key balance, plot points): **0 errors, 0 warnings**.
- Author validator: **289 maths strings** (KaTeX strict) parse; 30 SVG visuals / 18 distinct diagrams pass the allow-list; narration clean; **57/57 scripted re-solves**: every numerical, numeric MCQ, case value and table (e.g. the lab case's three (u, v) pairs all give f = −20 cm; the camera table; the Snell's-law sines recomputed from the angles) is recomputed from the givens with `mirrorImage` / `lensImage`, never from the written answer. Every ray diagram was rasterised (resvg) and checked by eye.

## Verifier pass (2026-10-27)
Every item, case part and alternative was re-solved; no key was wrong. Fixes during authoring:
1. **Ray geometry.** The first generator used "ray through C" for an object beyond C; with a realistic mirror that ray hit the sphere far outside the drawn aperture. The default rays were changed to the textbook pairs (parallel + through F beyond F; parallel + along the line from C inside F), and the aperture is now sized from the actual hit points.
2. **Image at infinity** (object at F, mirror and lens) produced an infinite image height and a collapsed canvas; handled explicitly (image height 0, parallel emergent rays drawn).
3. **Labels.** Base labels (B, B′) collided with point labels when the object or image sits on C or 2F; they are now omitted there, and point labels move left when an image arrow stands on them. The sign-convention and P/F/C figures were redrawn to stop clipping; the slab's lateral shift is now drawn as a true perpendicular between the incident direction and the emergent ray.
4. **Lost backslash.** One case answer had `\dfrac` inside a normal string (the escape was eaten); both the author validator and the M2 lint caught it; converted to `String.raw`.
5. **Check slide wording.** A Part 2 check slide described a different assertion–reason item than the one it pointed to; repointed to the magnification item.
6. **Difficulty.** The make-up mirror long question (calculation plus reasoning about moving beyond C) was raised to d5.

## Known gaps
- Narration audio is not generated (TTS stage).
- Diagram scale: mirrors use f = 60 px with small objects so that sagitta stays small; rays meet at the exact image, and the ray drawn "through F" passes within about 2 px of F because it reflects at the true curved surface.
- Plot points: the renderer must support a point label on a function plot (as for the maths chapters).
