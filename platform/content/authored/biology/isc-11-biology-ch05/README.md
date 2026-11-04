# ISC Class 11 Biology, Chapter 5 — Animal Kingdom

`isc-11-biology-ch05` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (5 sections), 30 flashcards, 88 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch05_short` (20 marks, 50 min) and `t_isc11bio_ch05_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (the ten-phylum feature table with classification queries, the vertebrate-class table, a pond sample, a zoo list and the heart-chamber, comb-plate, tube-foot, parapodia and gill-slit arithmetic, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch05/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC Class XI syllabus topics (t01–t05): the **basis of classification** (levels of organisation, body plans, symmetry, diploblastic and triploblastic organisation, acoelomate, pseudocoelomate, coelomate and haemocoelomate cavities, segmentation); **non-chordates I** (Porifera, Cnidaria, Ctenophora, Platyhelminthes, Nematoda); **non-chordates II** (Annelida, Mollusca, Arthropoda, Echinodermata, Hemichordata); **Chordata** (notochord and the three subphyla); the **seven vertebrate classes** (Cyclostomata, Chondrichthyes, Osteichthyes, Amphibia, Reptilia, Aves, Mammalia). The syllabus lists no removed topics for this chapter.
- CBSE 11 ch04 covers similar ground. This chapter uses different set-ups (a body-plan classification table with computed counts, a pond sample, a zoo list, a figure of three body cavities with lettered parts, a rock-shore case), different organisms in each role, and different stems.

## Shape
- **Part 1 (t01–t03), 17 slides:** levels of organisation; symmetry; germ layers; body cavities; worked example (classify an animal by symmetry, germ layers and coelom, from the table in `calc.mjs`); segmentation; sponge; polyp and medusa; Ctenophora, Platyhelminthes, Nematoda; Annelida and Mollusca; Arthropoda, Echinodermata, Hemichordata; worked example (a pond sample of 48: 24 coelomate, 24 segmented, 12.5 percent flatworms); summary; exam tips. Checks: coelom, Cnidaria, pond sample.
- **Part 2 (t04–t05), 16 slides:** the four chordate features on a labelled chordate; chordates against non-chordates; the three subphyla; fishes; worked example (14 and 10 gill slits, difference 4); amphibians and reptiles; birds and mammals; hearts; worked example (a zoo list of 28 animals with 86 heart chambers and 10 warm-blooded); the seven classes compared; summary; exam tips. Checks: subphyla, heart chambers, class.
- **Visuals (25 of 33 slides; no gap longer than one slide):** table 17, svg 6, flow 2.
- **Diagrams (8 SVGs, 18 uses):** body symmetry; body cavities (named, and lettered A–C with D and E in C); a vase-shaped sponge; polyp and medusa; a simple chordate (named, and lettered A–E); vertebrate hearts drawn from the chamber counts in `calc.mjs`. Every SVG was rasterised and checked by eye; three labels that ran off the edge or overlapped a leader were moved.
- **Narration:** 6–51 words (mean 33); no symbols, digits with units or abbreviations.

## Question bank (88)
| Type | Count | Marks |
|---|---|---|
| mcq | 33 | 1 (keys a 9, b 8, c 8, d 8); 3 on the lettered body-cavity figure and 3 on the lettered chordate figure |
| assertion-reason | 5 | 1 (ISC options; keys a c a b d) |
| true-false / fill-blank | 1 / 1 | 1 |
| numerical | 12 | 1 (7 triploblastic phyla; 2 segmented phyla; 280 comb plates; 24 segmented and 24 coelomate animals; 12.5 percent; 600 tube feet; 180 parapodia; 32, 86 and 10 for hearts and warm blood; 4 gill slits) |
| short, 1 mark | 4 | give-a-reason |
| short | 11 + 13 | 2 / 3 |
| long | 7 | 5, in marked parts |
| case-based (stimulus) | 1 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 22 · d2 50 · d3 15 · d4 1 (all heart chambers in the zoo list).
- **Competency:** recall 12 · understanding 24 · application 43 · analysis 9. Application or higher is **59% of items (59% of marks)**, inside the 45–65% band; most items are scenarios (identify the phylum or class from a description).
- **Topic tags:** t01 20 · t02 18 · t03 20 · t04 12 · t05 25.
- **Re-solves:** 12 scripted checks recompute the numbers from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A radial symmetry, a flat parasite, jawless fish, feathers (MCQ), frog heart (A-R) · B chordate nerve cord and heart; (cnidarian forms or water vascular system) · C identify a reptile; (sponge or arthropod on land) · D body-plan terms in parts.
- **Long:** A the lettered body-cavity figure twice, diploblastic, metamerism, roundworm, ctenophore, tissue level, mollusc, cartilaginous fish, mammary glands (MCQ), haemocoel (A-R), jawless fish (A-R, both false) · B symmetry; annelid structures; (tunicate and lancelet or fish structures) · C flatworm parasite; echinoderms; Cnidaria; (egg-laying mammal or lamprey and shark) · D birds, amphibians and reptiles in a table; (sponge diagram or chordate diagram).

## Verifier pass
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Word limits.** Nine model answers were below the lower limit (including two case-part answers); eight were expanded and the two case-part answers were given a lower limit.
2. **Solutions without the answer.** Two numerical solutions did not state the number the lint looks for; the number is now in the sentence.
3. **Lamprey item.** A first draft of the lamprey and shark comparison mixed the textbook range (six to fifteen pairs) with a specific species; it now states seven and five pairs, as used in the arithmetic.
4. **Test giveaways.** The two chapter tests were rebuilt so that no item states another item's answer (for example the metamerism item and the segmentation answer are never in one test).
5. **Diagrams after rasterising.** The lettered pointers D and E in the body-cavity figure were moved onto the inner mesoderm ring and the cavity; the post-anal tail label was brought inside the frame; the mesoglea label no longer crosses the polyp labels.

## For a reviewer
- **Arthropods as haemocoelomate.** The syllabus lists haemocoelomate as a body-plan type, so arthropods are called that, and molluscs are called coelomate. Some books give both as coelomate; the notes say so.
- **Sponges.** Treated as the cellular grade with no true germ layers; some books call them diploblastic.
- **Ctenophora gut.** Described as a mouth with anal pores, not as a gut with one opening.
- **Gill slits.** The notes give the textbook range of 6–15 pairs for cyclostomes; the chapter's lamprey (7 pairs) and dogfish shark (5 pairs) are illustrations.
- **Hemichordata** are taught as a non-chordate phylum, as the syllabus lists them with the non-chordates.
- **Imagined numbers.** The pond sample, the zoo list, the comb-plate, tube-foot and parapodia counts are made up for arithmetic; they are not species data.
- **Arthropods as "over two thirds of named species".** This is the usual textbook figure and is approximate.
