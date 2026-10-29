# CBSE Class 12 Chemistry, Chapter 3 — Chemical Kinetics

`cbse-12-chemistry-ch03` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 24 slides), notes (5 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch03_short` (20 marks, 40 min) and `t_cbse12chem_ch03_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (same builder as ch01, copied so the folder is self-contained), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed topics.
- Average and instantaneous rate, rate in terms of each species, factors affecting rate; rate law, rate constant, order (including fractional and zero), units of k, method of initial rates, molecularity, elementary vs complex reactions and the rate-determining step; integrated rate equations and half-lives for zero and first order (including a gas-phase first-order reaction followed by total pressure), pseudo-first-order reactions; Arrhenius equation, energy profile, Maxwell–Boltzmann argument, activation energy from two temperatures or a plot, catalysts; collision theory with threshold energy, orientation and the steric factor.
- Kept to Class 12 board depth: integrated equations only for zero and first order; no second-order integrated form; the Maxwell–Boltzmann curve is qualitative.
- Generic reactions (R → P, A(g) → B(g) + C(g)) are written with `\mathrm{}` and `\rightarrow`, not `\ce{}`, so that the balance check does not read the letters as elements.
- Facts a reviewer may wish to double-check: rate law of the iodide-catalysed decomposition of H₂O₂ (first order in H₂O₂ and I⁻, slow step H₂O₂ + I⁻), H₂ + Br₂ rate law with order 1.5, CHCl₃ + Cl₂ rate law with ½ power, ammonia on hot platinum zero order at high pressure. The iodine-clock data, the drug-elimination table and the milk souring times are illustrative values, labelled as such.

## Shape
- **Part 1 (t01–t02), 19 slides:** what rate is; tangent plot; rate and coefficients; worked examples (average rate 0.02 mol L⁻¹ min⁻¹; NH₃ oxidation rates 0.006 / 0.030 / 0.036); factors; rate law; order; units of k; order vs molecularity; worked examples (initial rates, k = 2.0 L² mol⁻² s⁻¹; doubling A and halving B doubles the rate); rate-determining step; summary; exam tips.
- **Part 2 (t03–t05), 24 slides:** zero order (plot); first order (decay plot with half-lives); half-life; worked examples (zero order 10 / 20 min; first order 80% in 34.8 min; medicine 6.25% after 24 h); pseudo-first order; Arrhenius equation; energy profile (diagram); Maxwell–Boltzmann plot; two-temperature form with Arrhenius plot; worked examples (Ea 52.9 kJ mol⁻¹ from a doubling 298 → 308 K; catalyst lowering Ea by 25 kJ mol⁻¹ gives about 2.2 × 10⁴ times); catalysts; collision theory (diagram); limits of the theory; summary; exam tips.
- Layouts: title 2, concept 15, diagram 6, two-column 1, example 9, check 6, summary 2, exam-tips 2.
- **Visuals in decks (37 of 43 slides; no gap longer than one slide):** table 26, plot 5, flow 4, svg 2.
- **Diagrams (2 hand-written SVGs + 5 plots):** energy profile with uncatalysed and catalysed paths, Ea, Ea′ and ΔH; effective vs ineffective collision of OH⁻ with CH₃Br. Plots: concentration–time curve with tangent; zero-order line; first-order decay with half-lives; Maxwell–Boltzmann at two temperatures with the Ea line; Arrhenius line.
- **Narration:** 13–72 words (mean 57); numbers spoken as words, no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys b a a d c c) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1 or 2 (rate 0.003; k 0.01 min⁻¹; t 1000 s; t 100 s; Ea 53.6 and 18.2 kJ mol⁻¹; t½ 15 min; k 0.0223 min⁻¹) |
| short | 7 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 12 · d2 25 · d3 20 · d4 7.
- **Competency:** recall 7 · understanding 27 · application 26 · analysis 4. Application or higher is **47% of items (60% of marks)**, inside the 45–65% lint band.
- **Topic tags:** t01 8 · t02 13 · t03 23 · t04 18 · t05 10 (t03 and t04 carry the numericals the board paper favours).
- **Cases:** painkiller elimination (order from a halving table; k = 0.3465 h⁻¹; 10 h of effect, or a second dose); milk souring in Anand (16 times faster at 303 K; Ea ≈ 78 kJ mol⁻¹, or evaluate "the fridge stops souring"); iodine clock initial rates (order in iodide 1; k = 6.0 × 10⁻³; predict 9.0 × 10⁻⁶ M s⁻¹, or evaluate a "termolecular" claim); catalytic converter in Pune (lower Ea; surface area; cold start, or evaluate an equilibrium claim).
- **Deck checks:** q001, q008, q009 (Part 1); q019, q035, q046 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q002, q022, q036 (MCQ), q040 (A-R) · B q007, q044 (2 marks), q032 (3 marks) · C q056 or q058 · D q061.
- **Long (40 marks, 90 min):** A q003, q010, q011, q012, q020, q021, q037, q047 (MCQ), q013, q039 (A-R) · B q016, q031, (q017 or q049), q018, (q045 or q033) · C q059 + (q057 or q060) · D q062, q063.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); 4 SVG visuals / 2 distinct diagrams pass the allow-list; narration ≤ 72 words with no symbols; check slides all objective; 26/26 scripted re-solves pass (including every Arrhenius calculation, the gas-pressure first-order problem and the zero/first-order comparison).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem; every distractor was checked to come from a named slip. Findings and fixes:
1. **Lint on first build.** Generic equations written with `\ce{R -> P}` failed the balance check (R and P read as elements) — rewritten without `\ce`. A flow label "…[I⁻]: first order" was read as a Markdown link reference and a marking step "Uses the data: …" as a `data:` URL; both reworded. One model answer was over the 2-mark word limit; shortened.
2. **Count and competency.** The first build had 58 questions (below the Class 12 minimum of 60) and 40% at application or higher. Six items were added (plot match, ammonia-on-platinum explanation, two half-life numericals, Ea from a log k plot, effect of compression) and two recall/understanding MCQs were rewritten into new situations (predicting a zero-order half-life from two runs; a hospital tracer after one day). Final 64 questions, 47%.
3. **Verify stage.** Two Ea numericals reached the kJ value only through ≈; explicit "÷ 1000 =" steps were added. 0 flags.
4. **Originality.** Data sets were chosen fresh (SO₂/SO₃ rates, NH₃ oxidation, X + Y initial rates, A + 2B with zero order in B, Ea for 300 → 310 K and 500 → 700 K, 75% in 30 min, 20% in 10 min, the gas-pressure problem with 0.40 → 0.60 atm), avoiding the textbook’s worked problems.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
