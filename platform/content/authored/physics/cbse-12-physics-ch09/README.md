# CBSE Class 12 Physics, Chapter 9 — Ray Optics and Optical Instruments

`cbse-12-physics-ch09` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (14 + 17 + 13 slides), notes (5 sections), 30 flashcards, 74 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch09_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch09_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch09/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. `optics.mjs` is a copy of the CBSE 10 Science ch09 ray-diagram module (mirror/lens formula, computed ray diagrams), re-pointed at this subject’s library. `questions-extra.mjs` holds the 11 items added in the verifier pass. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 spherical mirrors (mirror formula and magnification applied, not derived, as the outcome says), t02 refraction, TIR and optical fibres, t03 refraction at a spherical surface, the lens maker’s formula (derived), thin lens formula and power of lenses in contact, t04 the prism and minimum deviation (derived), t05 simple and compound microscopes, the refracting telescope (derived) and the reflecting telescope (described).
- The eye and its defects and scattering of light are not in this chapter’s 2026-27 outcomes; spectacles appear only in one case as an application of lens power.

## Shape
- **Part 1 (t01–t02, 14 slides):** mirror formula (worked: v = −37.5 cm, m = −1.5); convex mirrors (v = +12 cm, m = 0.4); Snell’s law and refractive index; TIR (worked critical angles: 41.8°, 48.8°, 24.4°); optical fibres (worked: 75.2° at a 1.50/1.45 boundary).
- **Part 2 (t03–t04, 17 slides):** refraction at a spherical surface (worked: image 90 cm inside glass); lens maker’s formula (worked: f = 20 cm); thin lens formula (worked: v = 60 cm, m = −2); concave lens; power and lenses in contact (worked: +3.0 D, 33.3 cm); prism and minimum deviation; δ–i graph; worked: n = 1.414 from A = 60°, δm = 30°.
- **Part 3 (t05, 13 slides):** simple microscope (worked: m = 6 and 5); compound microscope (worked: m ≈ 75); astronomical telescope (worked: m = 20, L = 105 cm); reflecting telescope (Cassegrain).
- Layouts: title 3, concept 6, diagram 9, example 11, check 9, summary 3, exam-tips 3. Visuals on 40 of 44 slides (largest gap 1).
- **Diagrams (10 SVGs):** concave and convex mirror and lens ray diagrams computed from the formulas (every ray aimed at the computed image); TIR from a point under water (Snell’s law, C = 48.8°); an optical fibre (72° > 69.0°); a prism at minimum deviation computed with Snell’s law at both faces (drawn deviation equals 2i − A = 37.18°); refraction at a spherical surface (ray obeys Snell within the paraxial limit); a compound microscope (both rays meet at the computed first image, inside f_e); a telescope in normal adjustment (tan β/tan α = f_o/f_e). 8 self-checks, all pass. **Plot:** δ against i computed point by point for A = 60°, n = 1.5.
- **Narration:** 10–82 words per slide (mean 55), TTS-safe.

## Question bank (74)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6) |
| assertion-reason | 7 | 1 (keys a 3, b 1, c 1, d 2) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 17 | 1 or 2 |
| short | 6 + 4 | 2 / 3 |
| long | 5 | 5 (TIR, fibres and diamond; lens maker’s formula derived with numbers; prism relations and minimum deviation; compound microscope; telescope and Cassegrain) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 5 prose short answers.
- **Difficulty:** d1 15 · d2 29 · d3 24 · d4 6.
- **Competency:** recall 4 · understanding 34 · application 32 · analysis 4. Application or higher **49% of items (51% of marks)**.
- **Topic tags:** t01 11 · t02 18 · t03 19 · t04 9 · t05 18.
- **Cases:** a dentist’s concave mirror in Kozhikode (why inside F, m = 4, the image, or evaluate a convex mirror); an endoscope in Lucknow (TIR, 69.8°, sharp bends, or evaluate lower-index cladding); spectacles in Indore (−2.5 D, −40 cm, combined −0.5 D, why only the converging lens magnifies); a school telescope in Pune (choice of objective, m = 10, 55 cm and inversion, or evaluate a 2.5 cm eyepiece).

## Chapter tests
- **Short (20 marks, 40 min):** A q003, q021, q034, q030 · B q010, q022, q036 · C q056 or q059 · D q060.
- **Long (40 marks, 90 min):** A q005, q019, q020, q033, q039, q047, q048, q049, q007, q050 · B q023, q041, (q052 or q053), q024, (q042 or q054) · C q055 + (q057 or q058) · D q061, q062.

## Validation
- Build: 0 validator errors, 0 warnings; 375 maths strings parsed (KaTeX strict); 32 SVG visuals / 10 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 39 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Prism figure:** the first version rotated the incident ray the wrong way (drawn deviation 60°); the incident direction now lies beyond the inside ray from the normal, and the drawn deviation equals 37.18°.
2. **Spherical-surface figure:** a ray at 5 cm height was not paraxial (Snell mismatch 6.7%); it is now drawn at 2.5 cm (1.7%).
3. **Verifier minor flags:** seven numerical solutions stated the key after “≈” only; each now has an explicit “=” step (e.g. C = sin⁻¹(0.625) = 38.7°).
4. **Originality and balance:** the originality gate flagged the first mirror numerical as 92% similar to a CBSE 10 Science item with the same numbers; it was rewritten (a candle and a screen, R = 48 cm, v = −72 cm). The first draft had no top-level d4–5 items and 44% application; four items were raised to d4 after re-reading their demands, and eleven items were added (fill-ins, a match, AR keys c and d, a diver’s window, lenses in contact, prism comparison, telescope lens choice, a watchmaker’s lens). A prism comparison first quoted δm ≈ 52° for n = 1.7; the computed value is 56.4°.
5. **Facts double-checked:** sign convention; mirror and lens formulas and magnifications; convex mirror images always virtual and diminished; Snell, n = c/v, apparent depth; sin C = n₂/n₁ and TIR conditions; fibres need n_core > n_cladding; spherical-surface formula; lens maker’s formula and its use in a liquid; P = 1/f and powers adding; r₁ + r₂ = A, δ = i + e − A, n = sin((A + δm)/2)/sin(A/2), thin prism δ = (n − 1)A; simple microscope 1 + D/f and D/f; compound microscope (L/f_o)(D/f_e); telescope f_o/f_e, length f_o + f_e, and (f_o/f_e)(1 + f_e/D) at the near point; reflecting telescope advantages.

## Known gaps
- Ray diagrams asked for in answers are described in words; graders should accept any correct diagram.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
