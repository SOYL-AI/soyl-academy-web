# ISC Class 11 Biology, Chapter 11 — Biomolecules

`isc-11-biology-ch11` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 30 flashcards, 79 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch11_short` (20 marks, 50 min) and `t_isc11bio_ch11_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (formula masses of sugars, amino acids and fats; hydrolysis by mass; peptide masses and counts; enzyme rates with and without a competitive inhibitor; temperature and pH curves; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch11/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC Class XI syllabus topics (t01–t06): **carbohydrates** (glucose, ribose, deoxyribose; maltose, lactose, sucrose; glycogen, starch, cellulose, inulin, chitin); **amino acids** (glycine, alanine and serine, the zwitterion, acidic, basic, neutral and sulphur-containing, essential and non-essential); **proteins** (primary to quaternary structure and the bonds of each, functions); **lipids** (classification, fats and oils); **enzymes** (properties, nomenclature, the six classes, prosthetic groups, coenzymes and metal ions, temperature, pH and substrate curves, competitive inhibition with malonate and succinic dehydrogenase); **secondary metabolites** (alkaloids, pigments, gums).
- No removed topics for this chapter.
- Settings differ from the CBSE 11 chapter 9: lactose intolerance, the Benedict's test on sucrose, a gut-enzyme and stomach-enzyme pair (trypsin, pepsin), a polar-fish enzyme, sulphonamide and methanol-ethanol examples, a pentapeptide of serine, glycine, cysteine, alanine and cysteine, masses of fats from fatty acids, and a rate table with and without an inhibitor; no liver acid-soluble pool, GLUT-4, haemoglobin chain counts, vinblastin, hot-spring enzymes, carbonic anhydrase counts or ten-degree doubling items.

## Shape
- **Part 1 (t01–t03), 17 slides:** title; classes of carbohydrates; disaccharides (diagram); polysaccharides; worked example (hydrolysing 171 grams of sucrose: 9 grams of water, 90 grams each of glucose and fructose); check (inulin); amino acids (diagram); the zwitterion (diagram); classes of amino acids; worked example (Gly-Ala-Ser, mass 233, six orders); check (zwitterion); four levels of protein structure (diagram); bonds and functions; worked example (280 amino acids in 4 chains, 276 peptide bonds); check (secondary structure); summary; exam tips.
- **Part 2 (t04–t06), 17 slides:** title; classes of lipids; fats and oils (diagram); worked example (tripalmitin 806, triolein 884, fat gives 2.25 times the energy); check (plant oil); enzyme properties; six classes; cofactors; temperature, pH and substrate (diagram); worked example (rates 26.7, 40, 60); competitive inhibition (diagram); worked example (rates with and without the inhibitor); check (class); check (inhibition); secondary metabolites; summary; exam tips.
- **Visuals (26 of 34 slides; no gap longer than two slides):** table 17, flow 2, svg 7.
- **Diagrams (9 SVGs, 18 uses across decks, notes and questions):** three amino acids; the zwitterion; the four levels of protein structure and a **lettered version (A–D)**; three enzyme graphs computed from `calc.mjs` and a **lettered version (A–F)** used for two diagram-based questions; competitive inhibition in three panels; a triglyceride with saturated and unsaturated chains; maltose, lactose and sucrose as two sugar rings joined with the loss of water. Every SVG was rasterised (headless Chromium) and checked by eye.
- **Narration:** 10–44 words (mean 31), no symbols, unit abbreviations or formulae.

## Question bank (79)
| Type | Count | Marks |
|---|---|---|
| mcq | 36 | 1 (keys a 9, b 9, c 9, d 9); 4 on lettered figures; 6 are deck checks |
| assertion-reason | 4 | 1 (ISC options; keys a b c d) |
| short, 1 mark | 6 | give-a-reason (4) and analogy (2) |
| numerical | 7 | 1 (36 g of water; 265 daltons; 24 tetrapeptides; 414 peptide bonds; 860 for a mixed fat; 60 and 57.1 enzyme rates) |
| short | 8 + 11 | 2 / 3 |
| long | 5 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: enzyme rates with and without an inhibitor, and a pentapeptide |

- **Difficulty:** d1 16 · d2 37 · d3 24 · d4 2.
- **Competency:** recall 13 · understanding 26 · application 32 · analysis 8. Application or higher is **51% of items (42% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 13 · t02 14 · t03 15 · t04 10 · t05 23 · t06 5.
- **Re-solves:** 12 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A basic amino acids and charge, a sickle-cell substitution, NAD in a niacin deficiency, morphine in poppy latex, a denatured protein (A-R) · B units of maltose and sucrose; (four groups of an amino acid or fats against oils) · C six classes of enzyme; (starch against cellulose or classes of lipid) · D carbohydrates in parts.
- **Long:** A lactate dehydrogenase, an isomerase, cellulose, deoxyribose, acidic amino acids, sulphur-containing amino acids, the item that is not a lipid, a magnesium-dependent kinase, maltose formation, a dipeptide, sucrose with Benedict's solution (A-R), glycine (A-R) · B bonds of primary and secondary structure, four properties of enzymes, (essential amino acids or secondary metabolites) · C classifying glucose, lactose and glycogen, protein functions, coenzyme by dialysis, (temperature curve or functions of lipids) · D lipids in parts; (competitive inhibition or protein structure in parts).
- Items in the tests are not used on any deck check slide. Stems, options and assertion-reason statements were read so that none states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): 15 maths strings parse; 18 SVG uses / 9 distinct diagrams pass the allow-list; narration clean; 12/12 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Competency band.** The first bank (89 items) was 45% at application or higher, on the edge of the band; ten recall and understanding items that no test or deck used were removed (an essential-name fill, an alanine item, a disulphide item, a quaternary-letter item, an ester item, a matching item, an analogy, two reasons and a 5-mark enzyme question), giving 79 items at 51%.
2. **Word limits.** Two three-mark answers (functions of lipids and the six classes) were too short and were expanded with examples.
3. **Test leaks.** The tests were composed so that an objective stem, option or assertion never states what a short or long item asks: for example no sucrose multiple-choice item sits with the sucrose assertion-reason or the non-reducing-sugar part, no basic or acidic amino-acid item sits with the amino-acid classification item in the same test, no denaturation item sits with the protein-structure essay, and the competitive-inhibition essay is the only item on inhibition in the long test.
4. **Rounding.** The percentage by which the inhibitor lowers a rate (33.25) is worked in tenths so that it rounds to 33.3 in every place.
5. **Diagrams after rasterising.** Labels that overlapped (temperature curves, protein-structure captions), a tangled tertiary-structure path and the double-bond marker on the triglyceride were redrawn.
6. **Originality.** No set-up from CBSE 11 Biology ch08 to ch10 or ICSE 10 ch01 is reused; the exact-stem check found no duplicates.

## For a reviewer
- **Amino-acid lists.** The essential amino acids are given as the eight usual ones, with histidine noted as essential for infants; arginine and histidine are listed as basic. Books differ on whether arginine is semi-essential.
- **Classification of lipids.** Simple lipids (fats, oils, waxes), compound lipids (phospholipids) and derived lipids (fatty acids, glycerol, steroids) follow the common Class XI table; some books place cholesterol under simple or compound lipids.
- **Enzyme classes.** The six classes with the example enzymes follow the usual Class XI table; the term "Michaelis constant" is used only in the worked examples and the stimulus case, as a way of reading the saturation graph.
- **Illustrative data.** The maximum rate of 80, the constants 10 and 20, the temperature and pH curves (bell-shaped models for a human and a polar-fish enzyme, pepsin and trypsin), the lysine values and the pentapeptide are model values, not measurements. Atomic masses are whole numbers (C 12, H 1, N 14, O 16, S 32), so masses such as 806 for tripalmitin differ slightly from tables.
- **Energy values.** Fat about 9 and carbohydrate about 4 kilocalories per gram are the usual rounded figures.
- **Sucrose.** Described as non-reducing (both reducing groups are in the glycosidic bond); some books say simply that it does not reduce Benedict's solution.
