# CBSE Class 12 Chemistry, Chapter 7 — Alcohols, Phenols and Ethers

`cbse-12-chemistry-ch07` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (5 sections), 31 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch07_short` (20 marks, 40 min) and `t_cbse12chem_ch07_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed topics.
- Classification and IUPAC names of alcohols, phenols and ethers; bond angles at oxygen and the shorter C–O bond of phenol; alcohols from alkenes (acid hydration, hydroboration–oxidation), carbonyl reduction and Grignard reagents; phenol from chlorobenzene, benzenesulfonate, diazonium salts and cumene; hydrogen bonding, boiling points and solubility; acidity (pKa table, resonance in phenoxide, substituent effects); esterification, HX and the Lucas test, dehydration (443 K vs 413 K), oxidation by class and over hot copper; electrophilic substitution of phenol (bromine water, CS₂, nitration, picric acid), Kolbe and Reimer–Tiemann reactions, Zn dust, oxidation to benzoquinone, FeCl₃ test; methanol and ethanol (manufacture, uses, toxicity, denaturing); Williamson synthesis, physical properties of ethers, HI cleavage (SN2 vs SN1, aryl ethers), electrophilic substitution of anisole.
- Facts a reviewer may wish to double-check: C–O–H 108.9°, C–O–C about 111.7°, C–O in phenol 136 pm vs methanol 142 pm; pKa values (ethanol 15.9, water 15.7, phenol 10.0, 4-methylphenol 10.2, 3-nitrophenol 8.3, 4-nitrophenol 7.1, picric acid 0.5); boiling points of ethanol 351 K, methoxymethane 248 K, propane 231 K; Kolbe conditions about 400 K and 4–7 atm; methanol synthesis over ZnO–Cr₂O₃ (573–673 K, 200–300 atm).

## Shape
- **Part 1 (t01–t02), 18 slides:** classification; naming; bond angles (diagram); worked example (four names); alcohols from alkenes; from carbonyl compounds and Grignard reagents; worked example (planning Grignard syntheses); preparation of phenol; cumene process; worked example (aniline → phenol); physical properties; hydrogen bonding (diagram); summary; exam tips.
- **Part 2 (t03–t05), 18 slides:** acidity with pKa table; phenoxide resonance (diagram); worked example (ranking acidity); esterification, HX and dehydration; oxidation; electrophilic substitution of phenol; Kolbe and Reimer–Tiemann; worked example (distinguishing tests); methanol and ethanol; Williamson synthesis; reactions of ethers; worked example (HI cleavage); summary; exam tips.
- Layouts: title 2, concept 15, diagram 3, example 6, check 6, summary 2, exam-tips 2.
- **Visuals in decks (30 of 36 slides; no gap longer than one slide):** table 23, flow 4, svg 3.
- **Diagrams (3 hand-written SVGs):** bond angles in methanol and methoxymethane; hydrogen-bonded chain of alcohol molecules; three resonance structures of phenoxide.
- **Narration:** 12–77 words (mean 56); no formulae.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys a a b c d a c) |
| true-false | 3 | 1 |
| fill-blank | 1 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1 or 2 (Ka ratio 7.9 × 10⁵; 1.12 L H₂; 4.8 g Br₂; 46 g ethanol from 90 g glucose; 5.4 g anisole) |
| short | 6 + 4 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 11 · d2 26 · d3 24 · d4 2.
- **Competency:** recall 9 · understanding 24 · application 26 · analysis 4. Application or higher is **48% of items (54% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 9 · t02 10 · t03 30 · t04 7 · t05 12 (t03 carries the most board weight).
- **Cases:** three unknown liquids (sodium, bromine water and Lucas tests; identify the ether, phenol and tertiary alcohol); Kolbe’s reaction for aspirin (13.8 g salicylic acid from 11.6 g phenoxide; ortho attack, or percentage yield 79.7%); a school hand sanitiser (350 mL ethanol for 500 mL at 70%; why not methanol, or glycerol); ethanol blending from molasses (zymase; 88 kg CO₂ from 180 kg glucose; distillation limit, or evaluate "carbon-free").
- **Deck checks:** q001, q009, q017 (Part 1); q018, q019, q043 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q002, q012, q021 (MCQ), q027 (A-R) · B q008, q035 (2 marks), q015 (3 marks) · C q055 or q057 · D q060.
- **Long (40 marks, 90 min):** A q003, q004, q010, q011, q020, q022, q024, q044 (MCQ), q014, q047 (A-R) · B q034, q049, (q042 or q036), q016, (q037 or q038) · C q056 + (q058 or q059) · D q061, q062.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); 6 SVG visuals / 3 distinct diagrams pass the allow-list; narration ≤ 77 words with no symbols; check slides all objective; 8/8 scripted re-solves pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. All `\ce{}` equations with an arrow balance (those containing C=C were balanced by hand).
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; names were rebuilt from the IUPAC rules. Findings and fixes:
1. **Count.** The first build had 58 questions; five were added (diol classification, methanol toxicity, ether + excess HI, oxidation of phenol, Williamson stoichiometry).
2. **Verify stage.** The Ka-ratio numerical stated 7.9 only through words; it now has an explicit "794328 ÷ 100000 = 7.94" step.
3. **Word limit.** The phenol long answer was tightened from 146 words to within the limit without losing a marking point.
4. **Originality.** All examples, data and cases are written fresh (no textbook or sample-paper wording).

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Data in case passages are realistic illustrative values, not cited measurements.
