# CBSE Class 12 Physics, Chapter 13 — Nuclei

`cbse-12-physics-ch13` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (4 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12phy_ch13_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12phy_ch13_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`). The two tests share no questions. |
| `src/` | Deterministic builders. `npx tsx content/authored/physics/cbse-12-physics-ch13/src/build.mjs` (from `platform/`) rewrites both JSON files byte for byte. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- t01 composition (Z, A, N; isotopes, isobars, isotones), size R = R₀A^(1/3) and nuclear density, properties of the nuclear force; t02 E = mc², mass defect, binding energy and the binding-energy-per-nucleon curve; t03 fission (including the chain reaction and the parts of a reactor) and fusion (including the Sun), explained with the curve.
- Radioactivity (decay laws, half-life, α/β/γ) is deleted from the 2026-27 syllabus and is not covered.
- Data: m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV = 1.6605 × 10⁻²⁷ kg, 1 MeV = 1.6 × 10⁻¹³ J, R₀ = 1.2 fm (one item uses 1.1 fm, stated in its stem); atomic masses of ²H, ³H, ⁴He, ⁷Li, ¹²C, ¹⁶O, ⁵⁶Fe, ⁹²Kr, ⁹⁴Sr, ¹⁴⁰Xe, ¹⁴¹Ba, ²³⁵U and ²³⁸U from standard tables, quoted in each stem that uses them.

## Shape
- **Part 1 (t01–t02, 16 slides):** composition (terms table); size; worked: ⁵⁶Fe radius 4.59 fm and density 2.3 × 10¹⁷ kg m⁻³; the nuclear force (schematic potential-energy plot); mass and energy; worked: 1 u ≈ 931.5 MeV; mass defect and binding energy; worked: ⁴He (0.0304 u, 28.3 MeV, 7.07 MeV per nucleon); the BE-per-nucleon curve and what it means.
- **Part 2 (t03, 15 slides):** fission; worked: Q = 173 MeV from the masses of U-235, Ba-141 and Kr-92 (about 200 MeV with the later decays); worked: Q ≈ 212 MeV from the curve; chain reaction and reactors (Kaiga, Rawatbhata); fusion; worked: D–T 17.6 MeV, 3.5 MeV per nucleon; the Sun and ITER; fission and fusion compared; worked: 1.0 g of U-235 → 8.2 × 10¹⁰ J.
- Visuals on all 31 slides.
- **Diagrams (3 SVGs):** He-4, C-12, Fe-56 and U-238 drawn to scale with R = R₀A^(1/3); a fission event (A and Z balance checked); D–T fusion (balance checked). **Plots:** the BE-per-nucleon curve (a semi-empirical trend line plus ten nuclides whose values are computed from their atomic masses, peak at ⁵⁶Fe checked); a schematic nucleon–nucleon potential energy (zero near 0.8 fm, minimum near 1 fm, negligible by 3 fm). 4 self-checks, all pass.
- **Narration:** 10–76 words per slide (mean 55), TTS-safe.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 14 | 1 (keys a 4, b 4, c 3, d 3) |
| assertion-reason | 6 | 1 (keys a 3, b 1, c 1, d 1) |
| true-false | 3 | 1 |
| fill-blank | 1 | 1 |
| match | 1 | 2 |
| numerical | 24 | 1 or 2 |
| short | 6 + 4 | 2 / 3 |
| long | 5 | 5 (composition, size and force; ⁵⁶Fe binding energy and the curve; fission with Q from masses and the reactor; D–T fusion; a 1000 MW power station compared with coal) |
| case-based | 3 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` on the 9 prose short answers.
- **Difficulty:** d1 18 · d2 21 · d3 23 · d4 4 · d5 1.
- **Competency:** recall 10 · understanding 26 · application 26 · analysis 5. Application or higher **46% of items (58% of marks)**.
- **Topic tags:** t01 19 · t02 20 · t03 30.
- **Cases:** the Rawatbhata heavy-water reactor (moderator, 2.19 × 10¹⁹ fissions per second, control rods, or evaluate “it could explode like a bomb”); ITER (why so hot, 17.6 MeV, energy per kilogram, or evaluate a steel container); a neutron star at a Bengaluru science festival (nuclear density, 3.87 × 10¹⁷ kg m⁻³, “one gigantic nucleus”, or evaluate “uranium nuclei are denser”).

## Chapter tests
- **Short (20 marks, 40 min):** A q013, q008, q043, q031 · B q011, q044, q027 · C q049 or q052 · D q055.
- **Long (40 marks, 90 min):** A q006, q023, q025, q029, q035, q036, q042, q058, q010, q030 · B q026, q028, (q045 or q060), q014, (q046 or q061) · C q050 + (q051 or q053) · D q054, q056.

## Validation
- Build: 0 validator errors, 0 warnings; 241 maths strings parsed (KaTeX strict); 15 SVG visuals / 3 distinct diagrams pass the allow-list; stage-4 lint 0 errors, 0 warnings; stage-5 deterministic checks inside the build: 0 flags.
- 34 scripted re-solve checks pass.
- Gate commands: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Nuclide notation:** the first deck draft built ${}^{A}_{Z}$X labels with template interpolation, which would have dropped the opening “$” and put a tab character into “\text”; they are now written literally (`$\,{}^{4}_{2}\text{He}$`).
2. **Size figure:** at 10 px per fm the four nuclei overflowed the 420 px frame; the scale is now 8 px per fm (self-check asserts the frame).
3. **1 u in MeV:** with e = 1.602 × 10⁻¹⁹ C the worked example gave 931.6 MeV; it now uses 1.6022 × 10⁻¹⁹ C and shows 931.5 MeV.
4. **Balance:** the first draft had 39% application-or-higher items and only two check slides in Part 2; six application/analysis items were added (splitting ¹²C into three alphas, why iron cannot release energy, A from R, fusion : fission per nucleon, U-235 equivalent of a tonne of coal, D–T mass fraction), one MCQ that requires computing energies per nucleon was re-tagged as application, and a check slide was added.
5. **Facts double-checked:** N = A − Z; isobars ³H/³He; R ∝ A^(1/3), V ∝ A, density independent of A; nuclear force strong, short-range, charge-independent, repulsive below 0.8 fm; Coulomb force between protons 1.5 fm apart ≈ 102 N; BE per nucleon from masses: ²H 1.11, ⁴He 7.07, ⁷Li 5.61, ¹²C 7.68, ¹⁶O 7.98, ⁵⁶Fe 8.79, ²³⁵U 7.59, ²³⁸U 7.57 MeV; n + ²³⁵U → ¹⁴⁰Xe + ⁹⁴Sr + 2n (Q ≈ 185 MeV); D–D → ⁴He 23.8 MeV; D–T 17.6 MeV; Sun loses ≈ 4.2 × 10⁹ kg s⁻¹; 500 MW thermal uses ≈ 0.527 kg of U-235 per day.

## Known gaps
- Diagrams and graphs asked for in answers are described in words; graders should accept any correct sketch. The nucleon–nucleon potential plot is schematic (a two-exponential shape chosen to match the stated features), not a fitted potential.
- Narration was not yet run through TTS (stage 8); slide `audio` is null.
