# CBSE Class 12 Chemistry, Chapter 6 — Haloalkanes and Haloarenes

`cbse-12-chemistry-ch06` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 20 slides), notes (6 sections), 32 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch06_short` (20 marks, 40 min) and `t_cbse12chem_ch06_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are covered; the chapter has no removed topics.
- Classification (1°/2°/3°, allylic, benzylic, vinylic, aryl; gem/vic), IUPAC names, C–X polarity, length and strength; preparation from alcohols (HX/ZnCl₂, PCl₃, PCl₅, SOCl₂), alkenes (Markovnikov, peroxide effect), arenes (X₂/FeX₃), Sandmeyer, Finkelstein and Swarts; boiling point, density, solubility, melting of dichlorobenzenes; nucleophilic substitution with ambident nucleophiles (CN⁻/AgCN, NO₂⁻/AgNO₂), SN1 and SN2 (kinetics, mechanism, reactivity orders, inversion/racemisation, chirality), elimination and Saytzeff rule, Grignard, Wurtz, Wurtz–Fittig, Fittig; low reactivity of haloarenes (resonance), effect of o/p nitro groups, o/p-directing electrophilic substitution; CH₂Cl₂, CHCl₃ (phosgene), CHI₃, CCl₄, freons, DDT.
- Kept to Class 12 board depth: SN1 stereochemistry described as "mainly racemisation"; no E1/E2 mechanism detail.
- Generic reactions with R/X are only written in `\ce{}` when they balance (R and X count as symbols); mechanism arrows are drawn in SVG.
- Facts a reviewer may wish to double-check: C–X bond lengths (139, 178, 193, 214 pm) and enthalpies (452, 351, 293, 234 kJ mol⁻¹), dipole moments of CH₃X; boiling points of halomethanes (−78, −24, 4, 42 °C) and of the C₄H₉Br isomers (346, 364, 375 K); melting points of dichlorobenzenes (256, 249, 323 K); Dow-process conditions (623 K, 300 atm). The kinetics-case rates are illustrative.

## Shape
- **Part 1 (t01–t03), 18 slides:** classification; naming; worked example (four names and classes); polar C–X bond (diagram); bond length and strength; preparation from alcohols; from hydrocarbons and diazonium salts; halogen exchange; worked example (choosing preparations); physical properties; worked example (boiling points of C₄H₉Br isomers); melting points of dichlorobenzenes; summary; exam tips.
- **Part 2 (t04–t06), 20 slides:** nucleophilic substitution with ambident nucleophiles; SN2; SN2 diagram (backside attack, transition state, inversion); SN1; SN1 vs SN2; chirality; worked example (which reacts faster); elimination and Saytzeff; substitution vs elimination; reactions with metals; why haloarenes resist substitution (resonance diagram); reactions of haloarenes; worked example (five products); polyhalogen compounds; summary; exam tips.
- Layouts: title 2, concept 17, diagram 3, two-column 1, example 5, check 6, summary 2, exam-tips 2.
- **Visuals in decks (32 of 38 slides; no gap longer than one slide):** table 26, flow 3, svg 3.
- **Diagrams (3 hand-written SVGs):** polar C–X bond with nucleophile attack; SN2 of hydroxide with bromomethane (approach, transition state, inverted product); two resonance structures of chlorobenzene.
- **Narration:** 13–79 words (mean 55); "S N one/two" spelt out; no formulae.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b d a c) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1 or 2 (SN2 rate ×6; SN1 rate ×2; 5.8 g butane by Wurtz; 0.32 g methane from a Grignard reagent) |
| short | 6 + 4 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 9 · d2 29 · d3 18 · d4 6.
- **Competency:** recall 6 · understanding 26 · application 25 · analysis 5. Application or higher is **48% of items (50% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 7 · t02 9 · t03 7 · t04 19 · t05 18 · t06 8.
- **Cases:** rate data for two C₄H₉Br isomers (SN2 vs SN1; identify the tertiary bromide; why faster, or rate laws and a predicted rate); chloroform as an old anaesthetic (AgNO₃ test; 1.98 g phosgene from 2.39 g; storage, or why abandoned); freons and the ozone cycle (catalytic Cl; overall equation; why stability is the problem, or why ozone matters); making butane from bromoethane (Wurtz vs Grignard; ethane; why dry ether, or evaluate a mixed Wurtz).
- **Deck checks:** q001, q008, q015 (Part 1); q021, q033, q046 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q002, q009, q022 (MCQ), q027 (A-R) · B q007, q039 (2 marks), q032 (3 marks) · C q054 or q055 · D q059.
- **Long (40 marks, 90 min):** A q003, q010, q011, q016, q024, q026, q034, q045 (MCQ), q012, q017 (A-R) · B q031, q049, (q020 or q040), q014, (q041 or q042) · C q056 + (q057 or q058) · D q060, q061.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); 6 SVG visuals / 3 distinct diagrams pass the allow-list; narration ≤ 79 words with no symbols; check slides all objective; 5/5 scripted re-solves pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Every `\ce{}` equation with an arrow is atom-balanced (or contains a C=C, which the checker skips; those were balanced by hand).
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; IUPAC names were rebuilt from the rules. Findings and fixes:
1. **Ambiguous order removed.** A first SN1 ordering item compared benzyl chloride with tert-butyl chloride, whose relative SN1 rates depend on conditions; it was replaced by the unambiguous methyl < 1° < 2° < 3° series.
2. **Narration.** "SN1"/"SN2" read as formulae to the narration lint; now spelt "S N one"/"S N two". One elimination equation carried "(major)/(minor)" inside `\ce{}`; split into two equations with text labels.
3. **Count and word limits.** The first build had 58 questions; four were added (Lucas test, boiling points of halomethanes, SN1 stereochemistry true/false, Fittig reaction). The equation-only 3-mark preparation item has no word limit, and the polyhalogen long answer was tightened to fit 80–120 words (plus slack).
4. **Lint false positives avoided.** Text such as "[MA₃B₃]: …" or "data: …" is avoided because the lint reads it as a link or URL.
5. **Originality.** All examples and data are written fresh; no textbook or sample-paper wording.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
