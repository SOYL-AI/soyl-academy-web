# ISC Class 11 Biology, Chapter 3 — Protista, Fungi, Lichens and Viruses

`isc-11-biology-ch03` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (4 sections), 30 flashcards, 86 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch03_short` (20 marks, 50 min) and `t_isc11bio_ch03_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (protozoan counts and percentages, nuclei and chromosomes through the fungal stages, spore counts, yeast growth, the fungal class key, dates of virus discoveries; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs` (not edited here). Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch03/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC Class XI syllabus topics (t01–t04): Kingdom Protista (chrysophytes, dinoflagellates, euglenoids, slime moulds, rhizopods, flagellates, ciliates, sporozoans, with locomotion and examples); Kingdom Fungi (characteristics, spores, isogamy, anisogamy, oogamy, plasmogamy, karyogamy, dikaryophase); the four fungal classes, uses in medicine, bakery and decomposition, lichens and mycorrhiza; viruses (link between living and non-living, TMV, bacteriophage, Ivanowsky, Beijerinck, Stanley), viroids and prions (BSE, CJD).
- **Removed topic respected:** no fungal life cycle is described or asked; only the stage terms are defined.

## Shape
- **Part 1 (t01–t02), 15 slides:** protist groups; protozoans and locomotion; locomotion diagram; worked example (percentages in a pond sample); fungi; hyphae; kinds of sexual union; plasmogamy, dikaryophase and karyogamy; worked example (nuclei and chromosomes, n = 4); three checks; summary; exam tips.
- **Part 2 (t03–t04), 17 slides:** four fungal classes; worked example (class from characters); uses; lichen; mycorrhiza; viruses between living and non-living; TMV; bacteriophage; worked example (timeline of discovery); viroids and prions; four checks; summary; exam tips.
- **Visuals (23 of 32 slides; no gap longer than two slides):** table 15, svg 5, flow 3.
- **Diagrams (6 SVGs, 13 uses):** locomotion of an amoeba, a flagellate and Paramecium; coenocytic and septate hyphae; a lichen section; TMV; a bacteriophage; and a **lettered (A–E) bacteriophage** for three diagram-based questions. Every SVG was rasterised and checked by eye.
- **Narration:** 7–46 words (mean 30).

## Question bank (86)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 | 1 (keys a 8, b 8, c 8, d 8), 3 on the lettered phage |
| assertion-reason | 8 | 1 (ISC options; keys a c b a b a d c) |
| short, 1 mark | 4 | give-a-reason (2) and analogy (2) |
| fill-blank | 2 | 1 |
| true-false | 2 | 1 |
| match | 1 | 2 |
| numerical | 10 | 1 (15 and 25 percent; 14 and 12 chromosomes; 80 yeast cells; 1200 ascospores; 240 basidiospores; 79 and 37 years; 10 particles) |
| short | 10 + 11 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: a hay-infusion count and three infectious agents |

- **Difficulty:** d1 28 · d2 46 · d3 11 · d4 1.
- **Competency:** recall 22 · understanding 24 · application 35 · analysis 4 · evaluation 1. Application or higher is **47% of items (38% of marks)**, inside the 45–65 % band for items.
- **Topic tags:** t01 23 · t02 16 · t03 21 · t04 26.
- **Re-solves:** 11 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A plasmogamy, fungal class pairing, genetic material of TMV, aseptate hypha, viruses outside a host (A-R) · B isogamy, anisogamy and oogamy; (lichens in polluted towns or viroid against prion) · C mycorrhiza; (bacteriophage parts or the work of Ivanowsky, Beijerinck and Stanley) · D protists in parts.
- **Long:** A silica walls, dinoflagellates, Euglena in the dark, Entamoeba, sporozoans, penicillin, the term contagium vivum fluidum, viroids, anisogamy, chitin, slime moulds (A-R), Giardia (A-R) · B viruses as a link; fungi in medicine and baking; (slime mould body or locomotion of rhizopods and ciliates) · C protozoan groups; features of fungi; classes of three fungi; (lichen partnership or virus, viroid and prion compared) · D hyphae, stages and classes in parts; (TMV, phage and Stanley or lichens, mycorrhiza and pollution).
- Items in the tests are not used on any deck check slide. Topics overlap inside each test because the chapter is small; stems were read so that none states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): 0 maths strings; 13 SVG uses / 6 distinct diagrams pass the allow-list; narration clean; 11/11 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Competency band.** The first build had 42% application-or-higher items; one long answer and one two-mark answer were also short of their word limits. Seven genuine application items were added (a baker's dough, phage injection, a pond cell to place, pine seedlings without their fungus, hyphae inside root cells, particle lengths and a basidiospore count) and the limits were corrected; the bank is now at 47%.
2. **Diagram labels.** The flagellum label crossed the amoeba's pseudopodium and the flagellum was shortened.
3. **Originality.** Set-ups differ from CBSE 11 Biology ch02 (no diatomaceous earth in a sugar filter, red-tide fishermen, yellow slime mould on leaves, wheat rust, bracket fungus, baker's yeast percentage, city and highway lichen cover or 1892-to-1935 year gap; new items use a lake-bed powder, hay-infusion count, dough with dead yeast, coal-fired plant and lichens, pine seedlings, sheep-brain agent and three agents W, X and Y). The exact-stem check found no duplicates against the ISC 11 or CBSE 11 worktrees.

## Facts a reviewer should double-check
- Basidia bear four basidiospores and asci eight ascospores (the usual textbook values); the 120 + 30 asci and 60 basidia are illustrative counts.
- The generation time of 90 minutes for yeast, the pond and hay-infusion counts and the 4 and 7 chromosomes per haploid nucleus are illustrative.
- TMV is about 300 nanometres long and 18 nanometres wide; textbooks round these values.
- Ectomycorrhiza is described as hyphae between cortical cells with a sheath outside; endomycorrhiza as hyphae inside the cortical cells (vesicular-arbuscular type).
- Viroid discovery is credited to T. O. Diener (1971) and the prion diseases are BSE and CJD, as in the syllabus; the coconut-palm viroid in the case study is cadang-cadang.
