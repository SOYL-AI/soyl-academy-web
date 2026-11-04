# ISC Class 11 Biology, Chapter 8 — Anatomy of Flowering Plants

`isc-11-biology-ch08` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (5 sections), 30 flashcards, 81 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch08_short` (20 marks, 50 min) and `t_isc11bio_ch08_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (meristem, tissue and element tables, organ-difference tables, cell-doubling, vessel and sieve-tube counts, vascular strands, pith area, stomata, sap and stone-cell arithmetic, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch08/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC Class XI syllabus topics (t01–t05): **meristems** (characteristics; apical, intercalary, lateral; primary and secondary); **permanent tissues** (parenchyma, collenchyma, sclerenchyma; xylem and phloem with their elements); **tissue systems** (epidermal, ground, vascular); **internal structure of dicot and monocot roots and stems** (cellular diagrams of T.S.); **dicot (dorsiventral) and monocot (isobilateral) leaves** (cellular diagrams of V.S.). No removed topics are listed.
- CBSE 11 ch06 covers the same anatomy. This chapter uses different set-ups in each role (a bamboo internode, a pumpkin stem, guava stone cells, jute fibres, a water lily stalk, an aphid on a stem, sugarcane, wheat and paddy, a mango leaf) and a different data set (cell doublings, vessel and sieve-tube totals, vascular strands, pith area, stomata per leaf, aphid sap volume), and different stems.

## Shape
- **Part 1 (t01–t03), 15 slides:** meristem characteristics; apical, intercalary and lateral meristems; check (meristems); worked example (64 cells after 48 hours, 36 cm of bamboo growth); simple tissues (diagram and table); xylem and phloem (diagram and table of elements); check (complex tissues); worked example (72 vessels, 108 sieve tube elements, 4 dead kinds); tissue systems; check (tissue systems); summary; exam tips.
- **Part 2 (t04–t05), 17 slides:** dicot root; monocot root; roots compared; check (roots); dicot stem; monocot stem; stems compared; worked example (28 strands, 16 percent pith); check (stems); dicot leaf; monocot leaf; leaves compared; worked example (750 000 and 216 000 stomata); check (leaves); summary; exam tips.
- **Visuals (24 of 32 slides; no gap longer than one slide):** table 13, svg 9, flow 2.
- **Diagrams (11 SVGs, 26 uses):** meristems; simple tissues; elements of xylem and phloem; T.S. of dicot root and of monocot root; T.S. of dicot stem (named, and lettered A–E) and of monocot stem; V.S. of dicot leaf (named, and lettered A–E) and of monocot leaf. The cells are drawn as rings and grids of circles from the same helper functions. Every SVG was rasterised and checked by eye.
- **Narration:** 6–47 words (mean 33); no symbols, digits with units or abbreviations.

## Question bank (81)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 (keys a 8, b 8, c 8, d 7); 4 on the lettered stem figure and 3 on the lettered leaf figure |
| assertion-reason | 5 | 1 (ISC options; keys c a b a d) |
| true-false / fill-blank / match | 1 / 1 / 1 | 1 / 1 / 2 |
| numerical | 9 | 1 (32 cells; 105 vessels; 54 microlitres; 450 stone cells; 20 and 6 strands; 6.25 percent; 30 bundles; 720 000 stomata) |
| short, 1 mark | 6 | give-a-reason |
| short | 10 + 10 | 2 / 3 |
| long | 7 | 5, in marked parts |

- **Difficulty:** d1 19 · d2 56 · d3 5 · d4 1 (four statements about stem and root sections, two of them wrong).
- **Competency:** recall 8 · understanding 36 · application 35 · analysis 2. Application or higher is **46% of items (32% of marks)**, inside the 45–65% band; the long answers that ask for a labelled diagram are tagged understanding, and the scenario items application.
- **Topic tags:** t01 7 · t02 19 · t03 6 · t04 32 · t05 17.
- **Re-solves:** 10 scripted checks recompute the numbers from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A nipped root tip, collenchyma of a pumpkin stem, an open bundle, palisade cells (MCQ), xylem and phloem (A-R) · B tissue systems; (Casparian strips or dicot against monocot root) · C xylem against phloem; (dicot leaf mesophyll or epidermal system) · D dicot stem in parts.
- **Long:** A bamboo, guava stone cells, an aphid, epidermal system, endodermis, exarch xylem, pericycle, the lettered stem figure, the lettered leaf figure, bulliform cells (MCQ), collenchyma (A-R), monocot leaf (A-R, both false) · B apical against lateral meristem; phloem; (stem bundles or stoma) · C parenchyma; dicot root layers; monocot stem; (two stems compared or monocot leaf) · D dicot leaf in parts; (monocot stem or dicot root).

## Verifier pass
Every question was re-solved from its stem. Fixes made:
1. **Competency band.** The first full draft had 105 questions with 35% at application or higher, below the lint band. Twenty-four recall and understanding items that no test or deck uses were removed, which brought the share to 46%.
2. **Diagram text.** The left-hand labels of the stem figures sat inside the circle and the leaf labels ran off the right edge; the labels were moved outside and the leaf figures widened.
3. **Test giveaways.** Stems in the chapter tests were written so that they do not name the answer to another item (for example the lettered figures say "a stem section", not "a dicot stem").
4. **Check slides.** Each check slide points to an objective item that is in neither chapter test.

## For a reviewer
- **Cellular diagrams.** The T.S. and V.S. figures are schematic: cell sizes, counts and positions are illustrative, and the cambium, protoxylem and phloem are drawn as small groups of circles. The hypodermis, endodermis and pericycle follow the labels of the syllabus.
- **Dicot stem.** Taken as eight conjoint, open, endarch bundles in a ring with a starch-sheath endodermis and patches of sclerenchymatous pericycle; some books omit the pericycle patches.
- **Phloem parenchyma.** Stated as absent in the monocot stem and present in the dicot stem; books differ for some monocots.
- **Sieve tube and companion cell.** Taught as companion cells controlling the enucleate sieve tube elements.
- **Xylem elements.** Four are taught (tracheid, vessel, fibre, parenchyma) and four for phloem; the dead and living kinds are counted from `calc.mjs`.
- **Collenchyma.** Described with cellulose and pectin thickening at the corners, as in the books; the angular and lamellar subtypes are not taught.
- **Imagined numbers.** The doubling time, the bamboo growth rate, the bundle, vessel and sieve-tube counts, the stomatal densities, the aphid sap rate and the section radii are made up for arithmetic and are not plant data.
