# CBSE Class 12 Chemistry, Chapter 4 — The d- and f-Block Elements

`cbse-12-chemistry-ch04` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 19 slides), notes (5 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch04_short` (20 marks, 40 min) and `t_cbse12chem_ch04_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (same builder as ch01, copied so the folder is self-contained), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch04/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed topics.
- Position of the d- and f-blocks, definition of a transition element (Zn, Cd, Hg excluded), 3d configurations with the Cr and Cu anomalies and configurations of ions; physical properties, radii, ionisation enthalpies, oxidation states, E° trends (Cu positive; Mn³⁺ and Co³⁺ oxidants; Cr²⁺ reductant), spin-only magnetic moments, colour by d–d transitions, catalysis, interstitial compounds, alloys; preparation, structures and oxidising reactions of K₂Cr₂O₇ and KMnO₄ (acid and neutral), titration ratios; lanthanoid configurations and oxidation states, lanthanoid contraction and its consequences, comparison with actinoids; applications.
- Kept to Class 12 board depth: crystal-field splitting is described only qualitatively ("d orbitals split into sets of slightly different energy"); the purple of permanganate is attributed to charge transfer without detail.
- Facts a reviewer may wish to double-check: E°(M²⁺/M) for Ti −1.63, V −1.18, Cr −0.90, Mn −1.18, Fe −0.44, Co −0.28, Ni −0.25, Cu +0.34, Zn −0.76 V; E°(M³⁺/M²⁺) Mn +1.57, Co +1.97, Fe +0.77, Cr −0.41 V; E° of Cr₂O₇²⁻/Cr³⁺ +1.33 V and MnO₄⁻/Mn²⁺ +1.52 V; colours of hydrated 3d ions; 3d metallic radii (Sc 164 … Zn 137 pm) and Ln³⁺ radii (La 103 → Lu 86 pm), both labelled approximate; Zr 160 and Hf 159 pm; enthalpies of atomisation V 515, Cr 397, Fe 416, Zn 126 kJ mol⁻¹; mischmetall about 95% lanthanoids with about 5% iron.

## Shape
- **Part 1 (t01–t02), 19 slides:** blocks of the periodic table (diagram); where the d- and f-blocks are; 3d configurations; worked example (configurations of Fe²⁺, Fe³⁺, Cu⁺, Mn²⁺); physical properties; radius trend (plot); ionisation enthalpy; oxidation states; E° values; worked example (why Cr²⁺ reduces and Mn³⁺ oxidises); magnetic properties; worked example (μ of Fe²⁺ 4.90 BM and Cu²⁺ 1.73 BM); colour; complexes, catalysts, interstitial compounds and alloys; summary; exam tips.
- **Part 2 (t03–t05), 19 slides:** making K₂Cr₂O₇; chromate/dichromate structures and pH (diagram); dichromate as oxidant; worked example (dichromate titration, 0.168 g Fe); making KMnO₄; manganate/permanganate structures (diagram); permanganate as oxidant; worked example (permanganate titration, 25.0 mL); f-block configurations and oxidation states; lanthanoid contraction (plot); consequences; lanthanoids vs actinoids; uses; summary; exam tips.
- Layouts: title 2, concept 16, diagram 4, two-column 1, example 5, check 6, summary 2, exam-tips 2.
- **Visuals in decks (32 of 38 slides; no gap longer than one slide):** table 23, flow 4, svg 3, plot 2.
- **Diagrams (3 hand-written SVGs + 2 plots):** periodic-table blocks; chromate and dichromate (shared corner oxygen, 126°); manganate (green, paramagnetic) and permanganate (diamagnetic). Plots: 3d metallic radii; Ln³⁺ radii. Named hues: yellow for chromate chromium, green for manganate, blue for f-block, always with text labels.
- **Narration:** 14–78 words (mean 58); orbitals spoken as words ("three d", "four s"), no formulae or symbols.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys a c d b a a c) |
| true-false | 2 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1 or 2 (μ of Ni²⁺ 2.83 BM; n = 5 from 5.92 BM; Cr +6 in dichromate; 20.0 mL KMnO₄ for oxalate; 0.101 g Fe by dichromate) |
| short | 7 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 9 · d2 27 · d3 26 · d4 2.
- **Competency:** recall 10 · understanding 24 · application 28 · analysis 2. Application or higher is **47% of items (50% of marks)**, inside the 45–65% lint band.
- **Topic tags:** t01 7 · t02 24 · t03 19 · t04 13 · t05 6.
- **Cases:** Mohr’s salt titration with permanganate (self-indicator; [Fe²⁺] = 0.074 M; why not HCl, or what happens without acid); magnetic moments of three unknown salts (Zn²⁺ at 0 BM; n = 5; which are coloured, or why Fe³⁺ matches Mn²⁺); zirconium for reactor fuel tubes (Zr/Hf similarity; lanthanoid contraction; cause, or another consequence); an early dichromate breath tester (Cr +6 → +3; 1.38 mg ethanol; role of acid, or a permanganate version).
- **Deck checks:** q001, q007, q008 (Part 1); q027, q028, q041 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q002, q009, q029 (MCQ), q046 (A-R) · B q006, q038 (2 marks), q025 (3 marks) · C q056 or q058 · D q061.
- **Long (40 marks, 90 min):** A q010, q011, q012, q013, q015, q030, q042, q044 (MCQ), q003, q047 (A-R) · B q022, q050, (q023 or q024), q039, (q026 or q051) · C q060 + (q057 or q059) · D q062, q063.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); 6 SVG visuals / 3 distinct diagrams pass the allow-list; narration ≤ 78 words with no symbols; check slides all objective; 10/10 scripted re-solves pass (magnetic moments, titrations, oxidation state, breath-tester mass).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Every ionic equation in questions and notes was balanced for atoms and charge by hand; those inside `\ce{}` are also checked by the lint/verify balance checker.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem; every distractor was checked to come from a named slip. Findings and fixes:
1. **Competency band.** The first build had only 30% of items at application or higher — this chapter is descriptive and the first draft leaned on recall. Nine items were rewritten into new situations (enthalpy-of-atomisation data for zinc; radius data Fe–Cu; four metals in dilute acid; V₂O₅ cycling in the contact process; carbon in steel; an unknown liquid turning dichromate green; choosing a lanthanoid oxidant; choosing a sink material; choosing materials for four needs) and two explanation items that interpret given data were retagged application. Final 47%.
2. **Lost escape.** One deck body was a plain string containing `\ce`, so the backslash was lost; it is now a raw template. A narration said "4s", which TTS would read as "4 seconds"; it now says "four s".
3. **Verify stage.** Numeric keys reached through ≈ or nested-brace fractions (titration volume, n from μ) now have explicit "=" steps that the checker can evaluate.
4. **Word limits.** Two very short or equation-only case answers have no word limit.
5. **Originality.** Data sets are fresh (Mohr’s salt titre 18.5 mL, 15.0 mL dichromate, oxalate 20.0 mL, breath tester 1.0 × 10⁻⁵ mol), and explanations are written in our own words.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
