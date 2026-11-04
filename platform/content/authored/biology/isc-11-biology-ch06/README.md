# ISC Class 11 Biology, Chapter 6 — Morphology of Root, Stem and Leaf

`isc-11-biology-ch06` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (4 sections), 30 flashcards, 81 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch06_short` (20 marks, 50 min) and `t_isc11bio_ch06_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (root, stem and leaf identification tables, leaflet, leaf, node, bud, plantlet, pneumatophore and insect arithmetic, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch06/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC Class XI syllabus topics (t01–t04): **roots** (tap, fibrous, adventitious; regions of a root tip; modifications for storage — fusiform, conical, napiform, tuberous — respiration and support); **stems** (nodes, internodes, buds; underground, sub-aerial and aerial modifications; why a potato is a stem and a sweet potato a root); **leaves** (parts, venation, simple and compound leaves, compound leaf against branch, phyllotaxy); **leaf modifications** (tendrils, spines, fleshy bulb leaves, reproduction, insectivorous plants). No removed topics are listed. Flower, inflorescence, fruit and seed are the next chapter.
- CBSE 11 ch05 covers similar ground. This chapter uses different organisms in each role (for example sugarcane stilt roots, lemon thorns, a lawn grass runner, Alstonia and China rose phyllotaxy), a different data set (a computed mixed shoot, a root tip with measured regions, plantlet and pneumatophore counts) and different stems.

## Shape
- **Part 1 (t01–t02), 15 slides:** root systems; root-tip regions; worked example (a 40 mm root: 31 mm maturation region, 15 percent elongation, 21 mm a week); modified roots; root modifications and functions; node and bud; modified stems; stem modifications; worked example (potato against sweet potato, 40 eyes, a runner with 25 nodes); summary; exam tips. Checks: root regions, root modification, runner.
- **Part 2 (t03–t04), 15 slides:** leaf parts; venation and compound leaves; compound leaf against branch; worked example (18, 7 and 30 leaflets); phyllotaxy; worked example (14, 18 and 30 leaves); modified leaves; leaf modifications; insectivorous plants; summary; exam tips. Checks: leaflets, phyllotaxy, pitcher insects.
- **Visuals (22 of 30 slides; no gap longer than one slide):** table 13, svg 7, flow 2.
- **Diagrams (9 SVGs, 20 uses):** root tip (named, and lettered A–D); modified roots; modified stems; a simple leaf (named, and lettered A–E); venation and compound leaves; phyllotaxy; modified leaves. Every SVG was rasterised and checked by eye.
- **Narration:** 6–51 words (mean 36); no symbols, digits with units or abbreviations.

## Question bank (81)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 | 1 (keys a 8, b 8, c 7, d 7); 3 on the lettered root-tip figure and 3 on the lettered leaf figure |
| assertion-reason | 4 | 1 (ISC options; keys a b c d) |
| true-false / fill-blank | 1 / 2 | 1 |
| numerical | 13 | 1 (31 mm; 21 mm; 180 pneumatophores; 25 nodes; 40 buds; 9, 18 and 30 leaflets; 30 leaves; 336 insects; 36 plantlets; 96 scale leaves; 108 blades) |
| short, 1 mark | 3 | give-a-reason |
| short | 11 + 11 | 2 / 3 |
| long | 5 | 5, in marked parts |
| case-based (stimulus) | 1 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 29 · d2 41 · d3 10 · d4 1 (blades on a mixed shoot).
- **Competency:** recall 12 · understanding 19 · application 44 · analysis 6. Application or higher is **62% of items (52% of marks)**, inside the 45–65% band; most items are identification scenarios.
- **Topic tags:** t01 24 · t02 22 · t03 22 · t04 19.
- **Re-solves:** 22 scripted checks recompute the numbers and the identifications from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A fibrous roots, a napiform root, parallel venation, a pitcher (MCQ), leaf tendrils (A-R) · B pneumatophores; (stipules or *Bryophyllum*) · C leaf parts; (phyllotaxy or root hairs after transplanting) · D stem modifications in parts.
- **Long:** A stilt roots, adventitious roots, a rhizome, a sweet potato, a runner, a corm, a thorn, a phylloclade, whorled phyllotaxy, pneumatophores (MCQ), potato as a stem (A-R), insectivorous plants (A-R, both false) · B root regions; venation; (leaf or stem tendril, or compound leaf against branch) · C storage roots; three leaf modifications; potato against sweet potato; (sub-aerial stems or why plants trap insects) · D labelled leaf in parts; (root tip or leaf modifications).

## Verifier pass
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Word limits.** Three 3-mark model answers were under the lower limit and were expanded; two case-part answers were given a lower limit.
2. **Difficulty.** The first build had no difficulty-4 item; a mixed-shoot counting item was added.
3. **Diagram text.** A font size of 9 in the root diagram was raised to 10; the label "Region of meristematic activity" ran off the edge of the root-tip figure and was shortened to "Meristematic region"; the eye label of the potato no longer touches the ginger title; the modified-roots figure was made taller so that its bottom labels are not clipped.
4. **Check slide.** The phyllotaxy check was changed from a guava twig to a China rose twig so that the guava example appears only in the teaching slides.
5. **Test giveaways.** The two chapter tests were built so that no item states another item's answer where it could be avoided; the remaining topical overlaps (for example two items on one phylum of plants) do not reveal an answer.

## For a reviewer
- **Bulb.** The onion bulb is placed with the leaf modifications (fleshy bulb leaves), as the syllabus lists it; the notes say that a bulb is a short stem with fleshy leaves, as some books place it among stem modifications.
- **Thorn and spine.** Thorns are treated as stem modifications (from an axillary bud) and the spines of *Opuntia* as leaf modifications; books differ on a few plants.
- **Beet.** Treated as napiform with turnip; some books call it conical.
- **Pitcher plant.** The pitcher is taken as the modified leaf blade; some books describe the lid as the blade and the pitcher as the petiole.
- **Imagined numbers.** The 40 mm root, the plot of mangroves, the shoots, the plantlet and scale-leaf counts are made up for arithmetic and are not plant data.
