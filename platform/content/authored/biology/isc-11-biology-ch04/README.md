# ISC Class 11 Biology, Chapter 4 — Plant Kingdom

`isc-11-biology-ch04` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 18 slides), notes (4 sections), 30 flashcards, 84 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch04_short` (20 marks, 50 min) and `t_isc11bio_ch04_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (spore, ovule, megaspore, pollen and chromosome arithmetic, the algae class data and the shore survey, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch04/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC Class XI syllabus topics (t01–t04): **algae** (Chlorophyceae, Phaeophyceae, Rhodophyceae compared on pigments, stored food, cell wall, flagella, habitat and reproduction; economic importance); **bryophytes** (liverworts and mosses, the life cycle of *Funaria*, alternation of generations, economic importance); **pteridophytes** (Psilopsida, Lycopsida, Sphenopsida, Pteropsida with examples, the fern life cycle, homospory and heterospory, economic importance); **gymnosperms** (characters, the life cycle of *Pinus*, comparison with pteridophytes, economic importance). The syllabus lists no removed topics for this chapter.
- Not taught here: angiosperm life cycles (later chapters), viruses and fungi (earlier chapters), and any textbook text. CBSE 11 ch03 covers similar ground; this chapter uses different organisms in each role, a different data set (shore survey, fern frond, pine cone) and different stems.

## Shape
- **Part 1 (t01–t02), 16 slides:** what algae are; a brown alga body; the three classes compared; reproduction; worked example (a shore survey: 18, 27 and 15 algae, 45 percent brown, 45 with flagellate cells); economic importance; bryophytes; a moss plant; the *Funaria* life cycle; worked example (250 spore mother cells, 1000 spores, 24 and 12 chromosomes); summary; exam tips. Checks: pigments, spores, protonema.
- **Part 2 (t03–t04), 18 slides:** the four classes of pteridophytes; the fern life cycle; sporophyte and prothallus; homospory and heterospory; worked example (16 spore mother cells, 64 spores a sporangium, 2560 a sorus, 76 800 a frond, 24 chromosomes in the prothallus); uses; gymnosperm characters; the *Pinus* life cycle; worked example (120 ovules, 480 megaspores, 120 functional, 2000 pollen grains); comparison with pteridophytes; uses; summary; exam tips. Checks: spores per sorus, heterospory, megaspores, water and fertilisation.
- **Visuals (25 of 34 slides; no gap longer than two slides):** table 18, svg 5, flow 2.
- **Diagrams (6 SVGs, 13 uses):** graphic outlines of the life cycles of *Funaria*, a fern and *Pinus* (haploid boxes blue, diploid boxes red, meiosis and fertilisation marked); a brown alga (holdfast, stipe, midrib, air bladders, frond); and a moss plant with the sporophyte attached, once named and once lettered A–E for the figure-based questions. Every SVG was rasterised and checked by eye.
- **Narration:** 7–53 words (mean 35); no symbols, digits with units or abbreviations.

## Question bank (84)
| Type | Count | Marks |
|---|---|---|
| mcq | 34 | 1 (keys a 9, b 9, c 8, d 8); 3 on a lettered moss figure |
| assertion-reason | 5 | 1 (ISC options; keys a b d a c) |
| true-false / fill-blank | 1 / 1 | 1 |
| numerical | 9 | 1 (45 percent; 45 algae; 500 and 2560 spores; 24 chromosomes twice; 120 ovules, 360 degenerate megaspores and 2000 pollen grains) |
| short, 1 mark | 3 | give-a-reason |
| short | 11 + 14 | 2 / 3 |
| long | 5 | 5, in marked parts |
| case-based (stimulus) | 1 | 4 (1 + 1 + 2), part (c) is a short answer |

- **Difficulty:** d1 24 · d2 46 · d3 13 · d4 1 (the number of degenerate megaspores in a whole cone).
- **Competency:** recall 13 · understanding 32 · application 30 · analysis 9. Application or higher is **46% of items (42% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 19 · t02 26 · t03 23 · t04 26.
- **Re-solves:** 14 scripted checks recompute keys from `calc.mjs` (class from pigment, spore and chromosome counts, ploidy).

## Chapter tests (ISC defaults)
- **Short:** A brown alga flagella, gemmae, prothallus, coralloid roots (MCQ), Pinus in dry regions (A-R) · B Sphagnum uses; (heterospory or pollen tube) · C green and brown algae compared; (uses of algae or the megaspore mother cell in a pine ovule) · D *Funaria* life cycle in parts.
- **Long:** A Spirulina, holdfast, a lettered moss figure twice, amphibians of the plant kingdom, Equisetum, conifer needles, Azolla, naked seeds, Cycas and sago (MCQ), moss sporophyte dependence (A-R), fern prothallus (A-R, both false) · B brown-alga pigments; uses of algae; (pteridophyte uses or gymnosperm products) · C algal reproduction; bryophyte roles; fern sporophyte; (gymnosperm advances or liverworts and mosses) · D *Pinus* life cycle in parts; (algae table or pteridophytes and gymnosperms compared).

## Verifier pass
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Assertion-reason keys.** One draft item (fern) gave an unsolvable "false–true" pairing and one (Pinus) was not an ISC option; both were rewritten so that the keys are a, b, d, a, c.
2. **Case part (b).** The first wording left the prothallus out of the non-vascular specimens; the key now includes it (P, Q and R).
3. **Competency band.** The first build had 36% application or higher; five recall items were rewritten as scenarios and four new application or analysis items were added (46%).
4. **Word limits.** Five 3-mark model answers were under the lower limit and were expanded.
5. **Test giveaways.** The two chapter tests were rebuilt so that no item states another item's answer (for example a gemma item and the liverwort comparison, or the megaspore item and the Pinus long answer, are never in one test).
6. **Diagrams after rasterising.** The fertilisation labels on the fern and Pinus cycles overlapped box edges and the sporophyte box of *Funaria* clipped its text; the boxes were moved and widened. The brown-alga frond was redrawn as a single lobe so the midrib no longer runs past the blade.

## For a reviewer
- **Chromosome numbers (12, 24, 48) and the cone, frond and capsule counts** are imagined values chosen for arithmetic; they are not real species data. The 64 spores from 16 spore mother cells in a fern sporangium and the two ovules on a *Pinus* scale are textbook values.
- **Funaria sex organs.** Books differ on whether antheridia and archegonia lie on separate branches of one plant or at the apex of the main shoot; the notes say so and the questions only ask for both organs.
- **Pollination to fertilisation in Pinus.** Given as "many months to over a year"; books vary.
- **Algae uses.** "About half of the carbon dioxide fixation on Earth" is the textbook approximation.
- **Taxol** is from *Taxus* (yew) and **ephedrine** from *Ephedra*; both are in the ISC list of useful gymnosperms in common textbooks, but the syllabus names only "economic importance".
- **Red algae depth.** The give-a-reason on phycoerythrin and blue-green light is the standard textbook explanation.
