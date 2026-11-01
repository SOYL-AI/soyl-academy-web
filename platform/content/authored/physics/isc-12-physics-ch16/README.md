# ISC Class 12 Physics, Chapter 16 — Optical Instruments

`isc-12-physics-ch16` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 19 slides), notes (5 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12phy_ch16_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12phy_ch16_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/isc-12-physics-ch16/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. They use the ISC library in `isc-12-physics-ch01/src/lib.mjs`. `src/dump-svgs.mjs <dir>` writes the diagrams out for viewing. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` ch16: t01 the simple microscope, ray diagram and magnifying power with the image at D and at infinity (both derived); t02 the compound microscope, ray diagram and magnifying power with the final image at D (derived), the approximation (L/f_o)(1 + D/f_e), and the **expression only** for the final image at infinity; t03 the refracting astronomical telescope, ray diagrams and magnifying power in normal adjustment and with the image at D (both derived), tube lengths; t04 the Cassegrain reflecting telescope with the image at infinity (M = F/f_e, F the focal length of the mirror system), chromatic and spherical aberration, advantages over refractors; t05 the resolving power of a compound microscope at formula level (1/d = 2n sin β/λ, numerical aperture, oil immersion, shorter wavelength, empty magnification), and the uses, advantages and drawbacks of optical instruments.
- **Removed in ISC and not examined:** the derivation of the magnifying power of a compound microscope with the final image at infinity (the decks say so; items use the expression only).
- Conventions: D = 25 cm; magnifying power M = β/α quoted as a magnitude; α is the angle of the object held at D (microscopes) or of the object where it is (telescopes). Lens and mirror formulas in New Cartesian form as in ch13 and ch15.
- Not examined here: resolving power of a telescope (qualitative mention only), the eye and its defects, prisms (ch14), lens combinations (ch15).

## Shape
- **Part 1 (t01–t02, 17 slides):** angular size and M = β/α; the simple microscope with the image at D (derivation) and at infinity; worked: a 12.5 cm reading magnifier (print at 8.33 cm, M = 3; at infinity M = 2); limits of a single lens (plot of M against f); the compound microscope (ray diagram, derivation at D, approximation); worked: f_o = 1.5 cm, object at 1.8 cm, f_e = 6.25 cm gives v_o = 9.0 cm, m_o = 5, m_e = 5, M = 25, lenses 14 cm apart; the image at infinity (expression only: M = 20, 15.25 cm); worked: a laboratory microscope f_o = 0.60 cm imaging at 18 cm with f_e = 2.0 cm: m_o = 29, M = 391.5 at D and 362.5 at infinity (estimate 405); choosing the lenses.
- **Part 2 (t03–t05, 19 slides):** the refracting telescope; normal adjustment (derivation, L = f_o + f_e); image at D (derivation); worked: f_o = 80 cm, f_e = 8.0 cm: M = 10, L = 88 cm; M = 13.2, L = 86.06 cm; inverted images and aperture; the Cassegrain telescope; worked: primary f = 60 cm, convex secondary f = −20 cm 45 cm in front, focus 15 cm behind the primary, F = 240 cm, M = 60 with a 4.0 cm eyepiece; chromatic and spherical aberration; advantages of reflectors; resolving power (formula) and how to increase it; worked: sin β = 0.90, 550 nm: d = 306 nm in air, 201 nm in oil of 1.52; uses, advantages and drawbacks.
- Visuals on 36 of 36 slides. Narration is TTS-safe (checked by the build).
- **Diagrams:** 9 SVGs, all instruments drawn to scale along the axis by a paraxial ray tracer (thin lens: slope − y/f; mirror: reversal plus y/f), vertical scales enlarged: the simple microscope with the image at D and at infinity (with the object at D for α); the compound microscope with the final image at D and at infinity; the refracting telescope in normal adjustment and with the image at D (α and β marked); a Cassegrain telescope (paraboloidal primary with a hole, convex secondary, eyepiece; mirror curvature exaggerated, rays reflected at the paraxial planes); chromatic aberration of a lens against a mirror (dispersion exaggerated); the cone of light of an oil-immersion objective at 60°. Plots: M of a simple microscope against f (image at D and at infinity); smallest resolvable separation against numerical aperture for 550 nm and 400 nm. The ray and arrow helpers are adapted from `isc-12-physics-ch15` and `cbse-12-physics-ch09` (copied, not imported); all figures and set-ups are new.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 15 | 1 (keys a 4, b 4, c 4, d 3) |
| assertion-reason | 5 | 1 (keys a 2, b 1, c 1, d 1) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 (instruments and a drawback of each; instrument settings and the lens separation) |
| numerical | 16 | 1 (7) or 2 (9) |
| short | 8 | 2 |
| short | 9 | 3 (derivations: simple microscope at D and infinity, compound microscope at D, telescope in normal adjustment; problems: a microscope designed for M = 135, a microscope at D and at infinity, a telescope at both settings, a Cassegrain with a convex secondary, choosing between a refractor and a reflector, an oil-immersion objective against empty magnification) |
| long | 5 | 5, set in parts with the marks shown (simple microscope with a +12 D lens; compound microscope at D; telescope with the image at D; Cassegrain diagram, advantages and eyepiece choice; resolving power in air and oil) |

- **Difficulty:** d1 11 · d2 33 · d3 22 · d4 2. **Competency:** understanding 31 · application 21 · analysis 13 · evaluation 3: application or higher **54% of items (68% of marks)** (within the 45–65% band the stage-4 lint applies to physics).
- **Topic tags:** t01 13 · t02 17 · t03 17 · t04 11 · t05 13 (the bird-watcher MCQ is tagged t03 and t05, the refractor-or-reflector short t04 and t05, the lens-separation match t02 and t03).

## Chapter tests (ISC defaults)
- **Short (20 marks, 50 min):** A q001, q014, q030, q046, q062 · B q009, (q052 or q064) · C q025, (q039 or q051) · D q043.
- **Long (40 marks, 100 min):** A q002, q004, q015, q018, q022, q035, q045, q047, q049, q057, q021, q037 · B q023, q040, (q042 or q010) · C q011, q026, q065, (q038 or q027) · D q028, (q056 or q068).

## Validation
- Build: 0 validator errors, 0 warnings; KaTeX strict on every maths string; SVGs pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags; 53 scripted re-solve checks pass (microscopes and telescopes are re-solved by tracing rays through the lenses and reading β/α and the image distance off the traced rays, independently of the formulas; the Cassegrain items by tracing through both mirrors and the eyepiece).
- 19 diagram self-checks (lens equation at each lens; traced rays or their backward extensions meet at the computed images; β/α from the drawn rays equals 1 + D/f = 3, D/f = 2, m_o(1 + D/f_e) = 25, m_o D/f_e = 20, f_o/f_e = 10, (f_o/f_e)(1 + f_e/D) = 13.2 and F/f_e = 60; the Cassegrain beam clears the hole and the secondary and focuses 15 cm behind the primary; f(blue) < f(red) for the lens, R/2 for the mirror; the resolving-power cone drawn at 60°): 0 failures.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md`.

## Verifier pass (2026-11-01)
Every question was re-solved from its stem. Findings and fixes:
1. **Wrong supporting statement:** the near-point short said both people view the object “from about 8 cm” with the lens; the object is 6.1 cm and 6.9 cm away, so the explanation now says 6–7 cm, β nearly equal, α halved.
2. **Self-contained stems:** the eyepiece-shift numerical referred to “the telescope of the previous kind”; it now states both focal lengths.
3. **Word limits:** two 2-mark lists (the Devasthal reasons, the resolving-power factors) carry no word limit, like the other model answers here.
4. **Competency band:** one-step items (loupe power, focal length for M = 12.5, the L/f_o estimate, eyepiece for M = 60, resolving-power ratio) are labelled understanding, giving 54% application or higher.
5. **Originality:** every set-up was checked against `cbse-12-physics-ch09` (Ray Optics and Optical Instruments): no shared numbers or set-ups (the CBSE 5.0 cm jeweller’s lens, 2.5 cm simple microscope, 0.50/2.5/16 cm and 1.0/5.0/15 cm microscopes, 2.0/6.25 cm long item, 120/4.0, 120/5.0, 100/5.0, 150/6.0 and 50/5.0 cm telescopes, the lens-choice and wrong-end telescope items and the Hanle telescope are not used); ISC ch15 lens-combination numbers are not reused.
6. **Facts double-checked:** f = 12.5 cm: print at 8.33 cm, M = 3 and 2; M_D = 4.5 → M_∞ = 3.5; +32 D loupe M = 8; 7.5 cm lens: leaf at 5.77 cm; 4.0 cm lens: stamp at 3.45 cm, M = 7.25; 10 cm lens at infinity 2.5; f = 8.0 cm with D = 25 and 50 cm: 4.13 and 7.25; 2.0 mm bead: 126; +12 D: M = 4 and 3, work at 6.25 cm; M_∞ = 12.5 → f = 2.0 cm; f_o 0.80, u_o 0.90, f_e 4.0: v_o = 7.2 cm, M = 58; f_o 1.2, u_o 1.5, f_e 3.0: separation 8.68 cm; m_o 30, f_e 2.0 at infinity: 375; f_o 1.0, u_o 1.1, f_e 4.0 at infinity: 62.5, lenses 15 cm apart; f_e = 4.0 cm eyepiece moves out 0.55 cm; f_o 0.40, v_o 20: m_o 49 against 50; M = 135 with f_e 2.0, f_o 1.5: |u_o| = 1.65 cm, separation 18.35 cm; f_o 0.75, u_o 0.80, f_e 2.0: M 202.5 (13.85 cm) and 187.5 (14.0 cm); f_o 1.25, u_o 1.5, f_e 3.0: M = 46.7, 10.18 cm; L/f_o estimate 18/0.45 × 25/5.0 = 200 (exact 195); 90/3.6 cm telescope: 93.6 cm, Jupiter 5.0 × 10⁻³ rad; 140/3.5 cm at D: 45.6, eyepiece in by 0.43 cm; 60/2.0 cm: 30, 62 cm; 32.4, 61.85 cm; M 35 and 108 cm: 105 and 3.0 cm; Moon 9.0 × 10⁻³ rad with f_o 160 cm: 1.44 cm image, 0.36 rad; 120/3.0 cm with 6 and 12 cm apertures: M 40 each, 4 × the light; 75/2.5 cm: 30, 77.5 cm; 33, 77.27 cm; 1.8 m objective, M 60: f_e 3.0 cm; R = 4.0 m mirror, 2.5 cm eyepiece: 80; F 3.2 m, 2.0 cm: 160; Cassegrain 100 cm primary, −25 cm secondary 80 cm in front: focus 20 cm behind, F = 500 cm, M = 125; F 6.0 m: 300 and 120; 480 nm, NA 0.80: 300 nm; 600 nm, 60°, n 1.52: 228 nm (346 nm dry); 675/450 nm: 1.5; 550 nm, NA 0.65: 423 nm, NA 1.25: 220 nm; 450 nm, 64°: 250 nm, 167 nm in oil of 1.5.
7. **For the reviewer:** the resolving-power formula is used in the form d = λ/(2n sin β) (no factor 1.22), as ISC texts write it; numerical items state the formula in the stem. The Cassegrain magnifying power uses F, the focal length of the mirror system; the R = 4.0 m item uses a plane folding mirror so that F = R/2. The Devasthal telescope is described as a Cassegrain-type (Ritchey–Chrétien) design of 3.6 m near Nainital.

## Known gaps
- Ray diagrams asked for in answers (microscopes, telescopes, Cassegrain) are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
