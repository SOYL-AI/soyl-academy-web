# ISC Class 12 Chemistry, Chapter 8 — Inner Transition (f-Block) Elements: Lanthanoids and Actinoids

`isc-12-chemistry-ch08` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (4 sections), 31 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch08_short` (20 marks, 50 min) and `t_isc12chem_ch08_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All four syllabus topics are covered: t01 lanthanoid configurations (and of Ln³⁺ ions), atomic and ionic radii, oxidation states (+3, and the +2 and +4 ions with their redox behaviour), colour, complex formation and alloys (mischmetall); t02 the lanthanoid contraction, its cause and consequences (Zr/Hf, Nb/Ta, Mo/W, basicity of Ln(OH)₃, separation, density of 5d metals); t03 reactions of lanthanoids with oxygen, hydrogen, halogens, sulphur, nitrogen, carbon, water and acids, with balanced equations; t04 actinoid configurations, oxidation states and comparison with the lanthanoids.
- d-block properties stay in ch07; uses of f-block elements are included briefly as context.
- Facts a reviewer may wish to double-check: Ln³⁺ radii are rounded six-coordinate values (La³⁺ 103 pm to Lu³⁺ 86 pm); E°(Ce⁴⁺/Ce³⁺) = +1.74 V and E°(Eu³⁺/Eu²⁺) = −0.35 V; the actinoid oxidation-state plot shows highest common states; colours are those of the hydrated Ln³⁺ ions; densities of Zr, Hf, Mo and W are rounded.

## Shape
- **Part 1, 15 slides:** the f-block (periodic-table SVG); lanthanoids and actinoids: position; lanthanoid configurations; worked example (Nd³⁺, Gd³⁺, Tm³⁺, Lu³⁺); oxidation states; worked example (Ce⁴⁺ oxidising, Eu²⁺ reducing); colour, magnetism, complexes and alloys; the lanthanoid contraction (Ln³⁺ radius plot); consequences; worked example (basicity of hydroxides, density of Hf); summary; exam tips; three checks.
- **Part 2, 15 slides:** overview flow; general reactivity; reactions with non-metals; reactions with water and acids; worked example (equations for Sm, Gd, Eu and La); the actinoids; actinoid oxidation states (plot); worked example (uranium in UF₆, UO₂²⁺, UO₂); lanthanoids and actinoids compared (two-column); uses of f-block elements; summary; exam tips; three checks.
- Layouts: title 2 · concept 10 · two-column 1 · diagram 2 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · plot 2 · svg 1 · table 19. One SVG (periodic-table block outline) plus an Ln³⁺ ionic-radius plot and an actinoid highest-oxidation-state plot. Narration 9–72 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a d a b c) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1 or 2 (Gd³⁺ 7.94 BM; 16.5% decrease La³⁺ → Lu³⁺; Hf density ≈ 12.74 g cm⁻³ (same-volume estimate); 3.258 g La₂O₃; 0.672 L H₂; uranium +6 in Na₂U₂O₇; 3.78 g Ho₂O₃) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 12 · d2 35 · d3 18 · d4 3.
- **Competency:** recall 10 · understanding 25 · application 26 · analysis 7. Application or higher is **49% of items (53% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 19 · t02 15 · t03 17 · t04 17.
- **Deck checks:** q001, q002, q019 (Part 1); q033, q049, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q003, q020, q034, q051, q008 · B q014, (q029 or q045) · C q031, (q047 or q062) · D q064.
- **Long (40 marks, 100 min):** A q004, q005, q006, q021, q022, q023, q036, q038, q053, q054, q024, q039 · B q015, q030, (q061 or q016) · C q017, q032, q048, (q063 or q018) · D q065, (q066 or q067).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its element, ion or compound (erbium glass, ammonium cerium(IV) nitrate, Gd MRI agents, monazite, holmium sulphide, americium smoke detectors, sodium diuranate, …). CBSE 12 ch04 covers the f-block briefly; no stem or data set is reused from it.
2. **One lint fix.** The first build flagged lost LaTeX escapes in one Part 2 body (a plain string instead of a raw template); fixed. Rebuilt: validator, stage-4 lint and deterministic verify all clean.
3. **Every numerical re-computed** by the build script; every mhchem equation is balanced for atoms and charge.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

