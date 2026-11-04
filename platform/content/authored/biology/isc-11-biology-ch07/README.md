# ISC Class 11 Biology, Chapter 7 — Morphology of the Flower and Inflorescence

`isc-11-biology-ch07` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (5 sections), 30 flashcards, 87 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch07_short` (20 marks, 50 min) and `t_isc11bio_ch07_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (identification table of the flowers named in the chapter, pollen-sac, floral-member, ovule, seed, survey and flower-opening arithmetic, and an aestivation-from-overlaps checker, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch07/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC Class XI syllabus topics (t01–t05): the **typical flower** (bracteate and ebracteate, actinomorphic and zygomorphic symmetry, merous condition, complete and incomplete flowers); **calyx and corolla** (gamo- and poly- forms, perianth) and **aestivation** (valvate, twisted, imbricate, vexillary); the **androecium** (cohesion: syngenesious, synandrous, mono-, di- and polyadelphous; adhesion: epipetalous, epiphyllous; monothecous and dithecous anthers); the **gynoecium** (position of the ovary, apocarpous and syncarpous, locules, five placentations); **racemose and cymose inflorescence**.
- **Removed topic.** The subtypes of racemose and cymose inflorescence are not taught or asked; the exam tips tell the student they are not required.
- CBSE 11 ch05 covers the same morphology. This chapter uses different plants in each role (for example gulmohar, datura, Calotropis, cotton, Bombax, pumpkin, Argemone, Dianthus, plum and jasmine), a different data set (pollen sacs, floral members, ovule and seed counts, days of flower opening, a computed overlap record of a bud) and different stems.

## Shape
- **Part 1 (t01–t03), 15 slides:** the whorls; a typical flower; bracteate, ebracteate and symmetry; merous condition and completeness; worked example (a pentamerous complete flower, 17 members); check (symmetry); calyx, corolla and perianth; aestivation; check (aestivation); cohesion and adhesion; anthers; worked example (96 and 20 pollen sacs, 120 and 240 for contrast); check (stamens); summary; exam tips.
- **Part 2 (t04–t05), 15 slides:** carpel; position of the ovary (diagram and table); check (ovary); apocarpous and syncarpous; placentation (diagram and table); worked example (4 carpels, 36 ovules, 27 seeds); check (lettered placentation figure); inflorescence; racemose against cymose; worked example (46 days, 11 open flowers, day 24); check (cyme); summary; exam tips.
- **Visuals (22 of 30 slides; no gap longer than one slide):** table 13, svg 7, flow 2.
- **Diagrams (9 SVGs, 21 uses):** a flower in L.S. (named, and lettered A–E); aestivation (four types as outlines of the bud); stamens (six conditions); anthers (dithecous and monothecous in T.S.); position of the ovary (three flowers in L.S.); placentation (named, and lettered A–E in a different order); racemose and cymose inflorescence with numbered flowers. Every SVG was rasterised and checked by eye.
- **Narration:** 9–53 words (mean 36); no symbols, digits with units or abbreviations.

## Question bank (87)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 | 1 (keys a 8, b 8, c 8, d 8); 3 on the lettered flower figure and 3 on the lettered placentation figure |
| assertion-reason | 5 | 1 (ISC options; keys c a d b a) |
| true-false / fill-blank | 4 / 5 | 1 |
| numerical | 8 | 1 (15 members; 65 percent; 96 and 240 pollen sacs; 72 joined filaments; 60 ovules; 500 seeds; 11 open flowers) |
| match | 2 | 2 (aestivation; condition of stamens) |
| short, 1 mark | 6 | give-a-reason |
| short | 9 + 10 | 2 / 3 |
| long | 6 | 5, in marked parts |

- **Difficulty:** d1 27 · d2 51 · d3 8 · d4 1 (an overlap record of a five-petalled bud that must be read as imbricate).
- **Competency:** recall 8 · understanding 32 · application 46 · analysis 1. Application or higher is **54% of items (50% of marks)**, inside the 45–65% band; most items are identification scenarios.
- **Topic tags:** t01 21 · t02 16 · t03 19 · t04 22 · t05 9.
- **Re-solves:** 11 scripted checks recompute the numbers and the aestivation record from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A symmetry (gulmohar and datura), twisted aestivation (cotton), anther sacs, hypogynous mustard (MCQ), sunflower ovary (A-R) · B merous condition; (aestivation or cohesion versus adhesion) · C describing a flower; (placentation or racemose against cymose) · D flower in L.S. in parts.
- **Long:** A bract, pumpkin male flower, trimerous flower, valvate aestivation, perianth, monadelphous, polyadelphous, epipetalous, axile placentation on the lettered figure, racemose (MCQ), zygomorphic (A-R), pea valvate (A-R, both false) · B symmetry; anthers; (ovary position or inflorescence) · C aestivation; cohesion; ovary position; (marginal and free central or epipetalous and epiphyllous) · D androecium in parts; (gynoecium or inflorescence).

## Verifier pass
Every question was re-solved from its stem. Fixes made:
1. **Diagram text.** The flower figure had a large empty band above the stigma and was cropped; the notes under the twisted and imbricate bud overlapped and were shortened; the stamen panels had titles at two different heights and were aligned; the label "Pollen sac" ran off the right edge of the anther figure; the word "younger" touched a flower in the cyme and the raceme and was moved.
2. **Test giveaways.** Short-answer stems that name a type of aestivation, cohesion or ovary position would have given away an MCQ in the same test; the stems were reworded to ask for "three of its types" and the "condition of each flower", and one MCQ was swapped out of the long test.
3. **Check slides.** Each check slide points to an objective item that is in neither chapter test.
4. **Word limits.** Every model answer was run against its word limit; five-mark answers use a 60–200 word range.

## For a reviewer
- **Pollen sacs.** A monothecous anther is taken to have two pollen sacs and a dithecous anther four; some books describe the two sacs of a monothecous anther as fused into one chamber. The notes say so.
- **Placentation and ovary position of examples.** Rose and plum are perigynous with a half-inferior ovary (some books call the ovary superior); tomato, datura and mustard are hypogynous; sunflower and cucumber are epigynous. The ovary position of the pea is not stated, because books differ.
- **Aestivation of gulmohar.** Taken as imbricate; finer names (ascending or descending) are not used.
- **Bracts.** Bougainvillea is given as bracteate (its showy parts are bracts) and mustard as ebracteate.
- **Lily.** Used for the perianth, trimerous and epiphyllous conditions; no statement is made on whether a flower with a perianth is "complete".
- **Cymose order.** The terminal flower is the oldest and the younger flowers lie below (basipetal). The figure shows a simple pattern only, so that no subtype is implied.
- **Imagined numbers.** The stamen counts of hibiscus (48 and 60), the florets, the flower survey, the locules and ovules, the seed fractions and the days between flower openings are made up for arithmetic and are not plant data.
