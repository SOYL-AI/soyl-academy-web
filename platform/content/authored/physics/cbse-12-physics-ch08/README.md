# CBSE Class 12 Physics, Chapter 8 — Electromagnetic Waves

`cbse-12-physics-ch08` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (3 sections), 28 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch08_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch08_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch08/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. The authoring library is `../cbse-12-physics-ch01/src/lib.mjs` (same owner). `questions-extra.mjs` holds the 11 items added in the verifier pass (imported last). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 displacement current (basic idea), t02 EM waves and their characteristics (qualitative, with E₀ = cB₀, c = 1/√(μ₀ε₀) and c = fλ), t03 the EM spectrum with sources and uses.
- The field between the plates of a charging capacitor (one short answer, d4) is the only Ampere–Maxwell calculation; energy density, intensity and radiation pressure are mentioned only qualitatively.
- Band edges follow the usual approximate ranges (radio > 0.1 m, microwave 0.1 m–1 mm, infrared 1 mm–700 nm, visible 700–400 nm, ultraviolet 400 nm–1 nm, X-rays 1 nm–about 1 pm, gamma below about 1 pm). The README and the items say the edges are approximate; no item hinges on a value close to an edge, except the microwave oven (12.2 cm), which is classed by its source and the deck says so.

## Shape
- **Part 1 (t01–t02, 14 slides):** the Ampere’s-law puzzle for a charging capacitor; displacement current (worked: 0.177 A); from changing fields to waves; structure of a plane wave; speed and properties; worked: 1/√(μ₀ε₀) ≈ 3.00 × 10⁸ m s⁻¹; worked FM signal (λ = 3.0 m, E₀ = 6.0 V m⁻¹).
- **Part 2 (t03, 14 slides):** the spectrum on a log scale; table of bands, sources and uses; worked: microwave oven λ = 12.2 cm; radio and microwaves; infrared and visible; ultraviolet, X-rays and gamma rays; worked: placing 0.50 nm (X-rays) and 1.0 × 10¹⁵ Hz (300 nm, UV); trends across the spectrum.
- Layouts: title 2, concept 7, two-column 1, diagram 3, example 5, check 6, summary 2, exam-tips 2. Visuals on 26 of 28 slides (largest gap 1).
- **Diagrams (3 SVGs):** displacement current in a charging capacitor with two surfaces on one loop; a plane EM wave (E along y, B along z, travel along x — checked as E × B, and drawn in phase); the spectrum on a computed logarithmic wavelength scale (bands checked contiguous and ordered; visible band drawn narrow). 5 self-checks, all pass. **Plot:** E and B in phase along x.
- **Narration:** 14–76 words per slide (mean 54), TTS-safe.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6) |
| assertion-reason | 5 | 1 (keys a 2, b 1, c 1, d 1) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 9 | 1 or 2 |
| short | 6 + 4 | 2 / 3 |
| long | 5 | 5 (displacement current; EM wave with expressions for E and B; the spectrum; speed in a medium and n = √(εrμr); identifying four bands and ionising radiation) |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 6 prose short answers.
- **Difficulty:** d1 22 · d2 23 · d3 19 · d4 3.
- **Competency:** recall 12 · understanding 23 · application 30 · analysis 2. Application or higher **48% of items (57% of marks)**.
- **Topic tags:** t01 12 · t02 22 · t03 35.
- **Cases:** a microwave oven in Chennai (band, 12.2 cm, why the door mesh works, or evaluate a “radioactive food” fear); 5G antennas in Pune (band, 8.57 cm, why more antennas are needed, or evaluate “as harmful as X-rays”); a hospital in Patna (why bone shows, 0.10 nm, lead screen, gamma vs X-ray sources); UV at a Ladakh observatory (band of 280 nm, 1000 THz, ozone thinning, or evaluate a cool-day sunburn belief).
- **Deck checks:** displacement current (TF), E₀ from B₀ (numerical), transverse nature (AR) (Part 1); ordering, matching uses, ozone (Part 2).

## Chapter tests
- **Short (20 marks, 40 min):** A q004, q013, q030, q007 · B q008, q046, q024 · C q049 or q051 · D q054.
- **Long (40 marks, 90 min):** A q005, q014, q016, q020, q029, q031, q039, q038, q042, q044 · B q022, q023, (q045 or q047), q009, (q048 or q025) · C q050 + (q052 or q053) · D q055, q056.

## Validation
- Build: 0 validator errors, 0 warnings; 189 maths strings parsed (KaTeX strict); 19 SVG visuals / 3 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 27 scripted re-solve checks pass (every numerical, computed options, directions as E × B, case data and long-answer numbers).
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Bank size and balance:** the first build had 56 items (below the 60 minimum) and 43% application or above. Eleven items were added (AM vs FM wavelength, UV frequency, doubling the charging current, refractive index from speed, λ ∝ 1/f, E₀/B₀ in glass, a 940 nm remote control, sunburn, an aerial oscillating at 90 MHz, a displacement-current TF, and the Ladakh UV case). Now 67 items, 48%.
2. **Microwave-oven wording:** the first worked example tangled the 0.1 m band edge with the 12.2 cm wavelength; it now says plainly that 12 cm sits at the long edge of the band and that band edges are approximate.
3. **Directions double-checked:** E along +y and B along +z travel along +x; travel along −z with E along +x needs B along −y.
4. **Facts double-checked:** I_d = ε₀ dΦE/dt = C dV/dt = conduction current; Ampere–Maxwell law; accelerated charges radiate at their oscillation frequency; transverse, in phase, E₀ = cB₀, c = 1/√(μ₀ε₀), v = c/√(εrμr); frequency unchanged across media; band order, sources and uses; ozone absorbs UV; greenhouse gases absorb infrared; microwaves pass the ionosphere; X-rays from electrons striking a target, gamma rays from nuclei.

## Known gaps
- Diagrams asked for in answers are described in words; graders should accept any correct sketch.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
