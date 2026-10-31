# ISC Class 12 Chemistry, Chapter 17 — Benzaldehyde

`isc-12-chemistry-ch17` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (4 sections), 31 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch17_short` (20 marks, 50 min) and `t_isc12chem_ch17_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch17/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All four syllabus topics are covered: t01 laboratory preparation from toluene by the Etard reaction (with the benzal chloride and Gattermann–Koch routes for comparison) and physical properties; t02 oxidation, reduction, nucleophilic addition (HCN, NaHSO₃) and reactions with hydroxylamine, hydrazine, phenylhydrazine and PCl₅; t03 the Cannizzaro reaction (with hydride-transfer outline and the crossed version), benzoin condensation and Perkin reaction; t04 electrophilic substitution (halogenation, nitration, sulphonation) with the meta-directing effect of –CHO, tests that distinguish aromatic from aliphatic aldehydes, and uses.
- General aldehyde and ketone chemistry is in ch16.
- Facts a reviewer may wish to double-check: Benzaldehyde b.p. 452 K and density 1.04 g cm⁻³ are rounded; Perkin conditions about 453 K; nitration in the cold (273–283 K) to avoid oxidising –CHO.

## Shape
- **Part 1, 14 slides:** uses and occurrence; structure (no α-H, conjugation); the Etard reaction and other routes; worked example (routes from toluene and why not KMnO₄); physical properties; oxidation and reduction; nucleophilic addition of HCN and NaHSO₃ (SVG); ammonia derivatives and PCl₅; worked example (five products); summary; exam tips; three checks.
- **Part 2, 14 slides:** overview flow; Cannizzaro reaction; benzoin condensation; Perkin reaction; worked example (four named reactions); meta-directed electrophilic substitution; worked example (meta products, cold nitration); aromatic versus aliphatic aldehydes; uses; summary; exam tips; three checks.
- Layouts: title 2 · concept 11 · diagram 1 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 1 · table 18. One SVG (nucleophilic addition), reused from the CBSE 12 ch08 set. Narration 10–66 words (mean 45), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c a c c a) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 4 | 1 or 2 (6.36 g benzaldehyde (Etard, 60%); 2.16 g silver (Tollens’); 10.8 g benzyl alcohol (Cannizzaro); 10.36 g cinnamic acid (Perkin, 70%)) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 12 · d2 36 · d3 13 · d4 2.
- **Competency:** recall 10 · understanding 14 · application 34 · analysis 5. Application or higher is **62% of items (70% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 13 · t02 19 · t03 19 · t04 18.
- **Deck checks:** q001, q013, q012 (Part 1); q028, q043, q045 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q015, q030, q047, q007 · B q009, (q024 or q055) · C q027, (q041 or q056) · D q059.
- **Long (40 marks, 100 min):** A q003, q004, q014, q016, q017, q018, q029, q031, q044, q046, q033, q050 · B q010, q025, (q038 or q040) · C q011, q026, q042, (q057 or q063) · D q060, (q058 or q061).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 4/4 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own reagent or data set (chromyl chloride, benzal chloride, Gattermann–Koch, 50% KOH, KCN in ethanol, methanal crossed Cannizzaro, cold nitration, malachite green, …). CBSE 12 ch08 has a benzaldehyde case study; its stems (old-bottle crystals, cinnamaldehyde cross aldol) are not reused in the same form.
2. **Fixes after the first build.** The tests builder refused a layout that used one short-answer item in both tests, so a new comparison item was added; the competency share (68%) was brought inside the band by re-tagging four straightforward items as recall/understanding; one model answer on Tollens’ versus Fehling’s was rewritten to give the conjugation-based reason. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

