# CBSE Class 11 Biology, Chapter 9 — Biomolecules

`cbse-11-biology-ch09` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (4 sections, 1 display formula), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch09_short` (20 marks, 40 min) and `t_cbse11bio_ch09_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (bonds and water in chains, peptide masses, dry mass, carbonic anhydrase factor, rate doubling, average rates, hydrogen bonds, DNA turns and length, inhibition percentage, curve shapes; every value asserted), `svgs.mjs` (amino acids, peptide bond, lipids, glycogen and a nucleotide, protein levels, DNA ladder, enzyme steps, activation energy, temperature, pH and substrate graphs), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch09/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics are covered: t01 chemical constituents of living cells, t02 proteins, carbohydrates, lipids and nucleic acids, t03 enzymes. The rationalised textbook sections on the dynamic state of body constituents, the metabolic basis for living and the living state are not part of the 2026-27 scope and are not used (the ten-step glucose-to-pyruvate pathway appears only as an example of a chain of enzyme reactions, as in the enzymes section).
- Class 11 depth, school-examination style in the CBSE pattern: grinding in trichloroacetic acid, acid-soluble pool and acid-insoluble fraction; elements of crust and body; inorganic constituents; amino acids (α-carbon, R groups of glycine, alanine and serine; acidic, basic, neutral, aromatic; ionisable groups and zwitterions); fatty acids (palmitic 16 C, arachidonic 20 C), saturated and unsaturated, glycerol, glycerides, fats and oils, phospholipids (lecithin); bases, nucleosides and nucleotides; primary and secondary metabolites; micromolecules and macromolecules; average cell composition; proteins (peptide bond by dehydration, essential amino acids, functions, collagen and RuBisCO, four levels with haemoglobin 2α + 2β); polysaccharides (glycosidic bond, cellulose, starch and iodine, glycogen with reducing and non-reducing ends, inulin, chitin); nucleic acids (purines and pyrimidines, ribose and deoxyribose, phosphodiester bond, Watson–Crick B-DNA with 10 bp and 3.4 nm per turn, two and three hydrogen bonds); enzymes (ribozymes, active site, inorganic catalysts compared, thermostable enzymes, rate and the 10 °C rule, carbonic anhydrase, activation energy, induced fit, optimum temperature and pH, Vmax, competitive inhibition by malonate, six classes, prosthetic groups, coenzymes and metal ions).

## Shape
- **Part 1 (t01–t02), 17 slides:** elements; amino acids (diagram); lipids (diagram); bases, nucleosides and nucleotides; metabolites; biomacromolecules and cell composition; worked example (40 g leaf, 85 % water → 6 g dry, computed); peptide bond (diagram); worked example (alanylalanine 2 × 89 − 18 = 160 Da; 49 bonds in a chain of 50, computed); protein structure (diagram); protein functions; summary; exam tips.
- **Part 2 (t02–t03), 18 slides:** glycogen and a nucleotide (diagram); kinds of polysaccharides; DNA double helix (diagram); worked example (150 bp → 15 turns, 51 nm; 3 A–T + 7 G–C → 27 hydrogen bonds, computed); what enzymes are (with carbonic anhydrase and its equation); activation energy (diagram); steps of enzyme action (diagram); factors (diagram); inhibitors; worked example (8 → 4 units on cooling by 10 °C; 0.6 units per minute from two readings, computed); six classes; cofactors; summary; exam tips.
- **Visuals (27 of 35 slides; no gap longer than one slide):** table 15, flow 3, svg 9.
- **Diagrams (9 SVGs, 18 uses across decks and notes):** amino acid structures; peptide bond formation; lipids; branched glycogen and a nucleotide; four levels of protein structure; DNA ladder; four steps of enzyme action; activation energy with and without an enzyme; activity against temperature, pH and substrate concentration (curves computed). Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 6–58 words (mean 36), no symbols, unit abbreviations or formulae.

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 33 | 1 (keys a 9, b 8, c 8, d 8) |
| assertion-reason | 4 | 1 (keys b c a d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1 (50 peptide bonds; 399 water molecules; triglycine 189 Da; 24 hydrogen bonds; 10.8 million times; 12 units per minute) |
| short | 6 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 18 · d2 36 · d3 17 · d4 1 (evaluating an eightfold prediction for salivary enzyme at 67 °C and designing a fair test).
- **Competency:** recall 17 · understanding 21 · application 29 · analysis 4 · evaluation 1. Application or higher is **47% of items (44% of marks)**, inside the 45–65 % band for items.
- **Topic tags:** t01 19 · t02 23 · t03 30.
- **Cases:** analysing 50 g of liver (retentate, 11 g dry mass, micromolecules or lipid vesicles); a four-chain oxygen-carrying protein (quaternary, 570 peptide bonds, helix and folding or primary sequence); a stomach enzyme across pH (optimum about 2, 3.6 units per minute, active site away from the optimum or heat denaturation); malonate and succinic dehydrogenase (competitive inhibitor, 25 % fall, recovery with more substrate or use against pathogens).
- **Deck checks:** serine, palmitic acid, RuBisCO (Part 1); reducing end true-false, induced fit, niacin (Part 2) — all objective, none used in a test.
- **Re-solves:** 10 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A filtrate of ground liver, iodine on potato and cotton, saturation at Vmax (MCQ), heat and enzymes (A-R) · B analysis with trichloroacetic acid (2 marks), the saturation curve (2 marks), four polysaccharides (3 marks) · C chemical constituents or enzymes and their factors · D pH case.
- **Long:** A crust and body elements, quaternary structure, peptide bond, G–C-rich DNA, enzymes of hot springs, refrigerated enzymes, hydrolases, zinc in carboxypeptidase (MCQ), cellulose and iodine, are all enzymes proteins (A-R) · B metabolites, a substrate look-alike drug, (protein functions or high fever), amino acid structure and classes, (levels of protein structure or steps of enzyme action) · C evaluating the eightfold prediction + (biomacromolecules or classes and cofactors) · D four-chain protein case, malonate case.

## Validation
- Author validator (in the build): 30 maths strings parse (one mhchem equation); 18 SVG uses / 9 distinct diagrams pass the allow-list; narration clean; 10/10 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- `npm run content -- verify --board cbse --class 11 --subject biology --authored`: 72/72 pass, 0 blocking + 0 minor flags. `npm run content -- originality --authored`: 0 errors. Exact-stem check against all authored chapters: no duplicate stems.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem; keys, schemes and word limits were checked. Fixes made:
1. **Fill-blank schema.** The alpha-carbon blank listed "alpha" and "α" as two blanks; they are now two accepted answers for one blank.
2. **Numerical solution.** The carbonic anhydrase answer is now reached by an explicit "=" step (10800000 ÷ 1000000 = 10.8), so the verifier can recompute the key.
3. **Notes.** The molecular-weight range of the acid-soluble pool was corrected to about 18–800 daltons.
4. **Diagrams after rasterising.** The serine label was moved inside the canvas; the peptide-bond leader no longer crosses the second amino acid; the substrate label of the energy diagram was moved off the curves.

## For a reviewer
- Element percentages (crust/body): H 0.14/0.5, C 0.03/18.5, O 46.6/65.0, N very little/3.3, S 0.03/0.3, Na 2.8/0.2, Ca 3.6/1.5, Mg 2.1/0.1, Si 27.7/negligible; cell composition water 70–90, proteins 10–15, carbohydrates 3, lipids 2, nucleic acids 5–7, ions 1 (percent).
- Amino acid classes use the textbook examples (glutamic acid, lysine, valine; tyrosine, phenylalanine, tryptophan).
- Carbonic anhydrase: about 200 molecules an hour uncatalysed and 600,000 a second catalysed (about ten million times; the bank uses the exact 10.8 million from these figures).
- Enzymes damaged above about 40 °C; thermostable enzymes to 80–90 °C; the 10 °C doubling rule is stated for chemical reactions in general.
- Residue masses (glycine 75 Da, alanine 89 Da, water 18 Da) are standard values used only in calculations; the 141- and 146-residue chains in the protein case are the human haemoglobin α and β chain lengths.
- The A-R on lipids is keyed (b): a low molecular weight is true but does not explain their place in the insoluble fraction.
- Case figures (dry mass, pH readings, rates) are illustrative.
