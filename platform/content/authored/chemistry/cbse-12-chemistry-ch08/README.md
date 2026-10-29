# CBSE Class 12 Chemistry, Chapter 8 — Aldehydes, Ketones and Carboxylic Acids

`cbse-12-chemistry-ch08` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 16 slides), notes (5 sections), 31 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch08_short` (20 marks, 40 min) and `t_cbse12chem_ch08_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed topics.
- Names of aldehydes and ketones; structure and polarity of C=O; preparation (oxidation of alcohols, ozonolysis, alkyne hydration, Rosenmund, Stephen, DIBAL-H, Etard, Gatterman–Koch, Friedel–Crafts acylation); nucleophilic addition (HCN, NaHSO₃, RMgX, alcohols, NH₂–Z derivatives incl. 2,4-DNP) and the reactivity of aldehydes vs ketones; reduction (NaBH₄/LiAlH₄, Clemmensen, Wolff–Kishner); oxidation, Tollens’ and Fehling’s tests; aldol (incl. crossed aldol), haloform and Cannizzaro reactions; carboxylic acids — preparation (oxidation, alkylbenzenes, nitriles, Grignard + CO₂), dimer hydrogen bonding, acidity with pKa table and substituent effects, NaHCO₃ test, acid chlorides, esters, amides, anhydrides, LiAlH₄ reduction, decarboxylation, HVZ, meta substitution; uses.
- Facts a reviewer may wish to double-check: pKa values (CF₃COOH 0.23, CCl₃COOH 0.65, CHCl₂COOH 1.26, FCH₂COOH 2.66, ClCH₂COOH 2.86, HCOOH 3.75, C₆H₅COOH 4.19, CH₃COOH 4.76, CH₃CH₂COOH 4.88); boiling points of propan-1-ol 370 K, ethanoic acid 391 K, propanal 322 K, propanoic acid 414 K, butan-1-ol 391 K. Tollens’ and Fehling’s equations are written as ionic equations and balance.

## Shape
- **Part 1 (t01–t03), 19 slides:** naming; carbonyl structure (diagram); preparing aldehydes and ketones; aromatic preparations; worked example (choosing named preparations); nucleophilic addition (diagram); addition reactions; reduction; oxidation and tests; worked example (identifying propanone from three tests); aldol and haloform; Cannizzaro; worked example (four products); summary; exam tips.
- **Part 2 (t04–t05), 16 slides:** naming and preparation of acids; worked example (two routes to propanoic acid; benzoic acid from propylbenzene); physical properties; acidity with carboxylate resonance (diagram); substituent effects with pKa table; worked example (ranking five acids); acid derivatives; reduction, decarboxylation, HVZ; worked example (distinguishing tests); uses; summary; exam tips.
- Layouts: title 2, concept 15, diagram 2, example 6, check 6, summary 2, exam-tips 2.
- **Visuals in decks (29 of 35 slides; no gap longer than one slide):** table 23, flow 3, svg 3.
- **Diagrams (3 hand-written SVGs):** planar polar carbonyl group with nucleophile attack; two-step nucleophilic addition (sp² → sp³); two equivalent resonance structures of carboxylate.
- **Narration:** 15–69 words (mean 52); no formulae.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys b a d a c a) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 3 | 2 |
| numerical | 5 | 1 or 2 (2.16 g Ag; 3.94 g iodoform; 2.24 L CO₂; Ka 1.74 × 10⁻⁵; 1.6 g CH₄) |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 13 · d2 29 · d3 20 · d4 3.
- **Competency:** recall 10 · understanding 25 · application 26 · analysis 4. Application or higher is **46% of items (52% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 5 · t02 10 · t03 24 · t04 6 · t05 26.
- **Cases:** three C₃ unknowns (propanal, propanone, propanoic acid from four tests); vinegar titration (0.80 M = 4.8 g per 100 mL, meets the standard; or baking soda); benzaldehyde in an old bottle (air oxidation to benzoic acid; Cannizzaro; separation by NaHCO₃ extraction, or Tollens’ vs Fehling’s); ethyl ethanoate for perfume (role of H₂SO₄; 60% yield; reasons, or Le Chatelier).
- **Deck checks:** q006, q015, q016 (Part 1); q035, q037, q038 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q001, q014, q039 (MCQ), q022 (A-R) · B q028, q048 (2 marks), q030 (3 marks) · C q057 or q058 · D q062.
- **Long (40 marks, 90 min):** A q002, q007, q008, q017, q018, q019, q031, q040 (MCQ), q023, q042 (A-R) · B q012, q050, (q029 or q049), q034, (q051 or q052) · C q059 + (q060 or q061) · D q063, q065.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); 6 SVG visuals / 3 distinct diagrams pass the allow-list; narration ≤ 69 words with no symbols; check slides all objective; 7/7 scripted re-solves pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Schema.** A long-answer marking scheme used 1.25-mark steps; the schema allows half marks only, so the steps were rebalanced (1.5 + 1).
2. **Count and competency.** The first build had 59 questions and 39% application-or-higher. Six items were added (identifying a C₄H₈O aldehyde from tests, substituted benzoic acids, a crossed aldol, soda-lime stoichiometry, a naming match, a polarity statement) and three conversion/identification items were retagged application. Final 65 questions, 46%.
3. **Word limits.** Two equation-based 2-mark answers have no word limit.
4. **A distractor cleaned.** One acid-order MCQ had a malformed correct option in the first draft; corrected to "HCOOH > CH₃COOH > CH₃CH₂COOH".
5. **Originality gate.** The first gate run flagged a bank duplicate: the naming match had the same stem as one in ch06 ("Match each structure with its IUPAC name."); the stem now reads "Match each aldehyde or ketone with its IUPAC name." Re-run: 0 errors.
6. **Originality.** All examples and data (vinegar titre 16.0 mL, 5.28 g ester, 0.44 g ethanal, etc.) are fresh; no textbook or sample-paper wording.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
