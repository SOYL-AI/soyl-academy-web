# ISC Class 12 Chemistry, Chapter 21 — Carbohydrates

`isc-12-chemistry-ch21` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (5 sections), 31 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch21_short` (20 marks, 50 min) and `t_isc12chem_ch21_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch21/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All five syllabus topics are covered: t01 definition and classification (monosaccharides as aldoses and ketoses, oligosaccharides, polysaccharides), reducing and non-reducing sugars, importance; t02 the open-chain structure of glucose from its reactions with HI, hydroxylamine (and HCN), bromine water, acetic anhydride, nitric acid and phenylhydrazine (phenylhydrazone and osazone), the cyclic pyranose structure, anomers and mutarotation, D/L configuration; t03 open-chain and furanose structures of fructose, the cyanohydrin route to 2-methylhexanoic acid, and the bromine-water test; t04 sucrose, maltose and lactose with their units and glycosidic links, invert sugar; t05 starch (amylose, amylopectin), cellulose and glycogen.
- Proteins, vitamins and nucleic acids are in ch22.
- Facts a reviewer may wish to double-check: Specific rotations used: α-D-glucose +111°, β +19.2°, equilibrium +52.5°; D-fructose −92.4°; sucrose +66.5°; α-D-galactose +150.7°, β +52.8°, equilibrium +80.2° (standard data-book values). Branch spacings (amylopectin about every 20–25 units, glycogen about every 8–12) are the usual textbook descriptions.

## Shape
- **Part 1, 15 slides:** everyday carbohydrates; definition and classification; reducing and non-reducing sugars and importance; open-chain glucose (SVG); evidence 1 (HI, NH₂OH, HCN, bromine water); evidence 2 (acetic anhydride, nitric acid, phenylhydrazine); worked example (assembling the structure of a hexose from four results); cyclic structure and anomers; D and L configuration; worked example (percentage of β-glucose at equilibrium); summary; exam tips; three checks.
- **Part 2, 15 slides:** overview flow; fructose open chain and furanose ring (cyanohydrin route to 2-methylhexanoic acid); the bromine-water test; worked example (identifying two unlabelled sugar solutions); sucrose and invert sugar; maltose and lactose; worked example (identifying maltose from three observations); starch; cellulose and glycogen; worked example (glucose from 32.4 kg of starch); summary; exam tips; three checks.
- Layouts: title 2 · concept 12 · diagram 1 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 6 · svg 1 · table 17. One SVG, the Fischer projection of open-chain D-glucose, reused from the CBSE 12 ch10 set; the other visuals are tables and flows. No ring diagrams are drawn: the pyranose and furanose forms are described in words and tables. Narration 12–83 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys b a c d a b a) |
| true-false | 5 | 1 |
| fill-blank | 4 | 1 |
| match | 3 | 2 |
| numerical | 7 | 1 or 2 (16 stereoisomers (2⁴); 63.7% β-glucose at equilibrium; 7.80 g pentaacetate; 16.2 g phenylhydrazine; 0.800 g Br₂; −19.95° invert sugar; 54.0 g glucose from starch; 72.0% β-galactose (short answer)) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 4 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 10 · d2 38 · d3 19 · d4 2.
- **Competency:** recall 10 · understanding 24 · application 25 · analysis 10. Application or higher is **51% of items (59% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills. (superseded: see Competency audit 2026-11-05)
- **Topic tags:** t01 9 · t02 26 · t03 17 · t04 15 · t05 12.
- **Deck checks:** q001, q010, q015 (Part 1); q035, q048, q061 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q011, q037, q062, q018 · B q029, (q045 or q067) · C q032, (q059 or q068) · D q047.
- **Long (40 marks, 100 min):** A q003, q012, q013, q014, q016, q017, q036, q038, q049, q063, q019, q040 · B q007, q030, (q044 or q058) · C q008, q031, q046, (q033 or q009) · D q034, (q060 or q069).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own sugar or data set (raffinose, dihydroxyacetone, lactic acid, the fructose cyanohydrin route, bottles of glucose and fructose, trehalose, potato starch amylopectin, galactose rotations, …). CBSE 12 ch10 treats carbohydrates; its stems (bromine water and gluconic acid, iodine on rice water, sucrose → glucose mass, amylose and cellulose unit counts, the cyclic-structure observations, the sweet-shop syrup) are not reused in the same form.
2. **Fixes after the first build.** One short-answer part (on methyl glucosides) was rewritten to ask about mutarotation, and an equation with names in parentheses inside the mhchem string was rewritten. The competency balance was 45% application or higher; four items were retagged after re-reading them (two comparisons as analysis, two as application), giving 51%. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** (the HI, hydroxylamine, bromine-water, acetylation and osazone equations included) and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

## Competency audit 2026-11-05
Audit: `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`.
- **Retagged honestly:** q046, q067, q068 analysis → understanding; q003, q007, q012, q024, q028 application → understanding; q006, q036, q057 application → recall (q036 is now understanding after its rewrite). q006 stays retagged; six others (q003, q007, q012, q024, q028, q057) were then rewritten, so they are tagged application again on genuine demands (see below). q036 was also rewritten on a new substrate (which –OH of D-ribose closes its five-membered ring) but is a one-step ring count, so it stays understanding.
- **Rewritten as genuine application items (same key, type, marks, topic tags, test slots):** q003 (deduce a ketopentose from Tollens/bromine-water results and the cyanohydrin–HI product); q007 (reducing character and mutarotation of two unfamiliar disaccharides from their links); q012 (count –OH groups of sucrose from its formula, then moles of acetic anhydride); q024 (chiral centres of a ketohexose, then the D-series count); q028 (bromine water and acetic anhydride on D-ribose, new substrate, with balanced equations); q049 (deduce the link of a non-reducing, non-mutarotating difructose); q057 (judge a student's claim that only α-links give reducing disaccharides, using cellobiose); q058 (polarimeter reading before and after hydrolysis of 10 g sucrose, with the sign change); q060 (long: link of an unknown glucose disaccharide, then acetic anhydride moles and glucose mass).
- **Result:** recall 11 · understanding 25 · application 26 · analysis 7. Application or higher is **33 of 69 (47.8%) of items, 56% of marks**, inside the 45–65% band.

