# CBSE Class 11 Biology, Chapter 3 — Plant Kingdom

`cbse-11-biology-ch03` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 17 slides), notes (2 sections), 30 flashcards, 82 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch03_short` (20 marks, 40 min) and `t_cbse11bio_ch03_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (algal classes from pigment and stored food, plant-group feature counts, life-cycle types, spores from spore mother cells, pollen mother cells, male gametes from ovules, ploidy of zygote, prothallus, leaf cell, PEN and endosperm, embryo-sac cell and nucleus counts — each asserted with `eq`), `svgs.mjs` (six drawings, five with a lettered twin), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch03/src/build.mjs` (deterministic; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both syllabus topics (t01 algae, bryophytes and pteridophytes; t02 gymnosperms and angiosperms) are covered; the chapter has no removed topics. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth: artificial, natural and phylogenetic systems; algae (forms, reproduction, uses; green, brown and red classes with pigments, stored food, walls, flagella, habitat, examples); bryophytes (liverworts and mosses, gemmae, protonema, foot–seta–capsule, Sphagnum and peat); pteridophytes (first vascular plants, prothallus, homospory and heterospory, four classes, seed-habit precursor); alternation of generations (haplontic, diplontic, haplo-diplontic); gymnosperms (naked seeds, Cycas coralloid roots, Pinus mycorrhiza, needle leaves, cones, microspores and megaspores, pollen grain, archegonia); angiosperms (dicots and monocots, stamen and pistil, 7-celled 8-nucleate embryo sac, double fertilisation, triploid endosperm).
- Life cycles are placed in t01 and used again in t02, as the NCERT text treats them after the groups; no detail beyond the textbook patterns is taught.

## Shape
- **Part 1 (t01), 18 slides:** classification systems; algae; three classes (table); brown alga body; worked example (naming the class from clues, computed); bryophytes; moss plant; pteridophytes; fern sporophyte; alternation of generations; worked example (40 spore mother cells give 160 spores, ploidy of moss and fern, computed); summary; exam tips; 4 checks.
- **Part 2 (t02), 17 slides:** gymnosperms; Cycas; gymnosperm reproduction; angiosperms (dicot versus monocot table); flower; embryo sac; double fertilisation; worked example (egg 12 chromosomes: zygote 24, PEN 36); worked example (30 ovules: 30 tubes, 60 male gametes, 30 seeds; 100 pollen grains from 25 meioses); five-group comparison table; summary; exam tips; 4 checks.
- **Visuals (25 of 35 slides; no gap longer than one slide):** table 15, flow 4, svg 6 (plus notes visuals).
- **Diagrams (6 drawings, 11 SVGs counting lettered twins):** brown alga (frond, stipe, holdfast); moss with sporophyte and gametophyte; fern sporophyte with sori and a coiled young frond; Cycas with coralloid roots and male cone; flower in section; embryo sac. Lettered A–C/E/F versions of the brown alga, moss, fern, flower and embryo sac serve diagram-based questions. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye; label overlaps were fixed (see below).
- **Narration:** 9–50 words (mean 35).

## Question bank (82)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 | 1 (keys a 8, b 8, c 8, d 8) |
| assertion-reason | 7 | 1 (keys b d a b c d a) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (160 spores; 1600 spores per sorus; 7 vascular plants of twelve; 27 chromosomes in a PEN; 25 pollen mother cells; 60 male gametes) |
| short | 10 + 7 | 2 / 3 |
| long | 7 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 24 short/long items.
- **Difficulty:** d1 21 · d2 46 · d3 14 · d4 1 (evaluating a student's claim that vascular tissue and seeds appeared together and that land plants no longer need water).
- **Competency:** recall 11 · understanding 29 · application 39 · analysis 2 · evaluation 1. Application or higher is **51% of items (52% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 50 · t02 36 (items spanning both topics count twice).
- **Cases:** a seaweed group's pigment table (class of S1, count of red-algal samples, agar or the class of S3); a moss wall with a fern prothallus (gametophyte, 36 × 4 = 144 spores, prothallus or why the fern is taller); a Cycas pair (coralloid roots, leaf cell 2n = 22 from a pollen grain of 11, why one sex alone gives no seed or naked seed); a mango-like tree (fruit from the ovary, endosperm 42 chromosomes, why two male gametes or the zygote number).
- **Deck checks:** brown-alga pigment, moss A-R, fern versus moss, haplontic cycle (Part 1); naked seeds, monocot features, triple fusion, water for fertilisation A-R (Part 2) — all objective.
- **Re-solves:** 15 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A brown-alga motile cell, holdfast (diagram), conifer needles (MCQ), fern frond A-R · B heterospory (2), embryo sac (2), haplontic versus diplontic (3) · C bryophytes or gymnosperms · D seaweed-samples case.
- **Long:** A agar, moss protonema, Cycas roots, pine pollen grain, Cycas cones, anther (diagram), antipodal cells, Fucus life cycle (MCQ), gymnosperm seed A-R, red alga A-R · B artificial versus natural, amphibians of the plant kingdom, (retained female gametophyte or gemmae), moss generations, (double fertilisation or fern life history) · C algae, (angiosperms or pteridophytes) · D moss-and-fern case, mango-like case.

## Validation
- Author validator (in the build): 28 maths strings parse; 19 SVG uses / 11 distinct SVGs pass the allow-list; narration clean; 15/15 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: no exact duplicate stems; `verify --authored` shows 0 blocking and 0 minor issues for this chapter; `originality --authored` shows 0 errors.

## Verifier pass (2026-11-02)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Short model answers.** Four case-part answers were under the word limit and were extended (agar choice, pyrenoids, naked seeds, zygote number).
2. **Diagrams after rasterising.** The young coiled frond was moved clear of the pinnae; right-hand flower labels were moved past the petals and the style leader lifted above the anther; the egg-cell and pollen-tube labels of the embryo sac were separated.
3. **Test hygiene.** Test items were chosen so that no stem states the answer to another item in the same test (for example, double fertilisation items are in different tests from the triple-fusion item).

## For a reviewer
- Pigment lists for the algal classes follow the NCERT table (green a, b; brown a, c, fucoxanthin; red a, d, r-phycoerythrin); other references give extra minor pigments.
- Habitat wording for the classes (green in fresh, brackish and salt water; red mostly marine, in warmer areas and at depth) is the NCERT text; the red-alga depth is stated as a fact, not explained.
- The fern sorus count (25 sporangia of 16 spore mother cells each, giving 64 spores per sporangium) is illustrative; real sporangia vary.
- All chromosome numbers (n = 8, 9, 10, 11, 12, 14; fern 2n = 48) are imagined, not those of named species.
- The Cycas drawing is schematic: leaf count and cone size are not to scale; the flower and embryo sac are schematic sections.
- The red alga "chlorophyll d" and the claim that carrageen comes from red algae are NCERT statements that some references qualify.
- The seed-habit item (`seedhab-mcq`, `seedhab-short`) restates the textbook's remark about retained female gametophytes in Selaginella and Salvinia.
