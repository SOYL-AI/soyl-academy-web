# ICSE Class 9 Chemistry, Chapter 8 — Chemical Bonding

`icse-9-chemistry-ch08` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (5 sections), 30 flashcards, 90 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch08_short` (20 marks, 30 min) and `t_icse9chem_ch08_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (configurations, ions formed and electrons transferred, ionic formulae by charge balance, shared pairs, lone pairs and valence-electron totals for each molecule with duplet and octet checks, and atom balance of the radical equations), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` of chapter 1 (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch08/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: the electrovalent bond and ion formation; orbit structures of NaCl, MgCl2 and CaO; the covalent bond with duplet and octet in single, double and triple bonds; orbit structures of H2, Cl2, O2, N2, HCl, H2O, NH3, CCl4 and CH4; radicals from the breaking of a covalent bond (each atom keeps one electron).
- No removed topics. Properties of ionic and covalent compounds, polar bonds, coordinate bonds and molecular shapes are not asked (they belong to Class 10 or are outside the Class 9 scope). Orbit structures use shells only.
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): configurations, ions with charges, "draw an orbit structure", counts of shared and lone pairs, assertion-reason items in the specimen option order and 10-mark structured questions in parts.
- **Originality:** the bank uses different compounds and roles from the ICSE 10 Chemistry bonding chapter and CBSE 11 Chemistry ch04 (potassium and fluorine ions, sodium oxide, calcium chloride, 10 formula units of sodium oxide, a Cl, O and N comparison, carbon tetrachloride electron counts, radicals from chlorine and methane). Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Giving and taking; Why atoms bond; Cations and anions; Worked example 1: potassium and fluorine ions; Quick check: ion charge; The electrovalent bond; Sodium chloride; Worked example 2: sodium oxide; Quick check: sodium ion; Magnesium chloride; Calcium oxide; The ratio of ions; Quick check: magnesium chloride; Summary: Part 1; Exam tips: Part 1. Part 2 (17 slides): Sharing and splitting; The covalent bond; Single, double and triple bonds; Single bonds: hydrogen, chlorine and hydrogen chloride; Double and triple bonds: oxygen and nitrogen; Worked example 1: the oxygen molecule; Quick check: shared pairs; Water and ammonia; Methane and carbon tetrachloride; Worked example 2: counting electrons in carbon tetrachloride; Quick check: lone pairs; Breaking a covalent bond: radicals; Radicals from hydrogen and chlorine; Worked example 3: methane to radicals; Quick check: radicals; Summary: Part 2; Exam tips: Part 2.
- **Visuals (32 of 32 slides):** flow 4, table 19, svg 8, chem 1.
- **Diagrams (10 distinct SVGs):** Orbit structures of NaCl (named, and lettered A to E for a structured question), MgCl2 and CaO; H2, Cl2 and HCl; O2 and N2; H2O and NH3 (and NH3 lettered A to E); CH4 and CCl4; and radicals from H2 and Cl2. Electrons of the two atoms are drawn as dots and crosses, and the diagrams are generated from the same electron counts as `calc.mjs`. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 13–48 words per slide (mean 34); no symbols, formulae or unit abbreviations.

## Question bank (90 items, 173 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 35 (6 are deck-check items) | 35 |
| assertion-reason | 4 | 4 |
| short-1 (terms, names, equations) | 10 | 10 |
| true-false | 5 | 5 |
| fill-blank | 5 | 5 |
| numerical | 6 | 6 |
| match-5 | 1 | 5 |
| short-2 | 11 | 22 |
| short-3 | 7 | 21 |
| long-10 | 6 | 60 |

- **Structured questions:** 6, each 10 marks in parts with part marks in the stem; two use a lettered orbit structure (the formation of sodium chloride and the ammonia molecule).
- **Difficulty:** d1 26 · d2 46 · d3 16 · d4 2.
- **Competency:** recall 19 · understanding 13 · application 46 · analysis 12. Application or higher is **64% of items**, inside the 45–65% lint band. The first build was at 67%, above the band; four genuine recall and understanding items (a cation definition, electrons in a single bond, the bond in nitrogen, why radicals are reactive) were added to bring it down. No existing item was retagged.
- **Assertion-reason keys:** c d a b.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every ion, formula, electron count, shared pair and lone pair is computed and asserted in `calc.mjs`, and the SVGs place electrons from the same counts.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that no item gives away another in the same test (for example the long test has no lone-pair item for Cl2, O2 or N2, NH3 or NaCl outside its structured questions).

## For a reviewer
- **Orbit structures:** shared pairs are shown in the overlap of the outer shells as one dot and one cross; the geometry of the molecules is schematic (water and ammonia are drawn with the bonds at convenient angles; carbon tetrachloride and methane with four bonds at right angles). Please confirm this level of drawing is acceptable for Class IX.
- **Bond symbols in visuals:** O=O and N≡N appear in tables and diagram captions only; reaction equations contain no bond characters.
- **Radical equations:** `\ce{H2 -> 2H.}`, `\ce{Cl2 ->[light] 2Cl.}` and `\ce{CH4 -> CH3. + H.}` are balanced by hand (atoms asserted in `calc.mjs`); the pipeline's balance checker skips equations containing the radical dot. The notes distinguish these free radicals (unpaired electron, no charge) from the valency radicals of chapter 1 (charged groups). Please confirm the textbook wording "radical" for this topic.
- **Names:** CCl4 is called carbon tetrachloride and CH4 methane, as in ICSE books; the CH3 radical is the methyl radical.
- **Compounds beyond the prescribed three** (sodium oxide, magnesium oxide, potassium chloride, calcium chloride, lithium fluoride, hydrogen sulphide as a distractor) are used only in short questions to test the same method.
- **Ion configurations:** Ca2+ 2, 8, 8 (argon arrangement), O2- 2, 8, Al3+ 2, 8 (aluminium is used only in a configuration and charge question).
