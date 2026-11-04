# ISC Class 11 Biology, Chapter 9 — Structural Organisation in Animals: Frog

`isc-11-biology-ch09` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 14 slides), notes (3 sections), 30 flashcards, 78 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch09_short` (20 marks, 50 min) and `t_isc11bio_ch09_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (the order of the alimentary canal, glands, heart chambers, pond census, vocal-sac, feeding, gut-length, blood-output, oxygen-share, duct-count and nerve-conduction arithmetic, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch09/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ISC Class XI syllabus topics (t01–t03): the **morphology of the frog** (external features, the skin, eyes, tympanum and limbs, and how a male differs from a female); the **digestive, respiratory and circulatory systems** (brief account: the path of food, the digestive glands, respiration through skin, buccal cavity and lungs, the three-chambered heart and the portal systems); the **excretory, nervous and reproductive systems** (brief account: the kidneys, the urinogenital ducts of the male and of the female, the brain and the sense organs, fertilisation and development). No removed topics are listed.
- CBSE 11 ch07 covers the same frog. This chapter uses different set-ups in each role (a tray with two frogs, a frog in wax-plugged water, a tadpole's gut against an adult's, a dissection sheet, a damaged cerebellum) and different data (a 150-frog pond census, feeding counts, gut ratios, blood output, oxygen shares, duct counts, a nerve-conduction time), and different stems.

## Shape
- **Part 1 (t01–t02), 18 slides:** the frog; external features (diagram and table); male and female frogs; worked example (a pond census: 72 males, 48 females, 144 vocal sacs); check (male or female); the alimentary canal; digestion and the glands; check (path of food); worked example (180 insects; gut lengths 1.2 and 10 times the body); respiration (diagram and table); check (respiration); the heart and circulation; worked example (2.7 ml a minute, 162 ml an hour; 0.9, 1.0 and 0.1 ml of oxygen); check (the heart); summary; exam tips.
- **Part 2 (t03), 14 slides:** the male urinogenital system; the ducts of the two sexes; check (the ducts); worked example (a dissection sheet: 48 gonads and 66 ducts); the female system; fertilisation and development; check (fertilisation); the brain; the nervous system; worked example (5 ms); check (the brain); summary; exam tips.
- **Visuals (23 of 32 slides; no gap longer than one slide):** table 13, svg 8, flow 2.
- **Diagrams (10 SVGs, 22 uses):** a frog from above (named, and lettered A–E); the sexes; the alimentary canal (named, and lettered A–E); breathing; the heart and the route of the blood; the male and the female urinogenital systems; the brain. Every SVG was rasterised and checked by eye.
- **Narration:** 8–49 words (mean 35); no symbols, digits with units or abbreviations.

## Question bank (78)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6); 3 on the lettered frog figure and 3 on the lettered alimentary canal |
| assertion-reason | 5 | 1 (ISC options; keys a a c b d) |
| true-false / fill-blank | 2 / 3 | 1 |
| numerical | 8 | 1 (120 vocal sacs; 72 pads; 1.5 ml; 2.4 ml; 200 insects; 1.2 times; 12 ms; 52 ducts) |
| match | 2 | 2 (digestive parts; parts of the brain) |
| short, 1 mark | 6 | give-a-reason |
| short | 8 + 10 | 2 / 3 |
| long | 7 | 5, in marked parts |

- **Difficulty:** d1 28 · d2 39 · d3 10 · d4 1 (counting the ducts on a dissection sheet from the two plans of the sexes).
- **Competency:** recall 9 · understanding 31 · application 37 · analysis 1. Application or higher is **49% of items (39% of marks)**, inside the 45–65% band; the labelled-diagram answers are tagged understanding and the scenario items application.
- **Topic tags:** t01 18 · t02 34 · t03 26.
- **Re-solves:** 10 scripted checks recompute the numbers and the order of the canal from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A camouflage, the tongue, a portal vein, the bladder (MCQ), a short canal (A-R) · B respiration; (path of the ova or parts of the brain) · C external features; (fertilisation or the male urinogenital system) · D alimentary canal in parts.
- **Long:** A the lettered frog figure, the nictitating membrane, a short gut, the lettered canal figure, bile, the buccal floor, the cloaca, the testes, the cerebellum, urea (MCQ), mixed blood (A-R), external fertilisation (A-R, both false) · B the sexes; the heart; (digestive glands or the skin) · C limbs; portal systems; the nervous system; (respiration with plugged nostrils or the female system) · D heart in parts; (male system or brain).

## Verifier pass
Every question was re-solved from its stem. Fixes made:
1. **Diagram text.** The left-hand labels of the frog figure ran off the left edge and the figure was moved right; the label "Sinus venosus" ran out of its box and the box was widened; the labels "Truncus arteriosus" and "Copulatory pad" overlapped other labels and were moved; the glottis label was moved off its arrow.
2. **Test giveaways.** The long test has the single-ventricle assertion-reason item but not the mixed-blood MCQ, and the heart short answer asks for the chambers and the entry of blood rather than for the mixing; the short stems on the sexes and on the digestive glands do not name another item's answer.
3. **Originality.** The stems on the sexes, on respiration with the nostrils closed, and on the heart were written as scenarios and do not reuse the CBSE 11 set-ups; egg-survival arithmetic was left out.
4. **Check slides.** Each check slide points to an objective item that is in neither chapter test.

## For a reviewer
- **Producer review (2026-11-04):** the first draft said blood from the lungs *and skin* enters the left atrium. Corrected: the pulmonary veins bring blood from the lungs to the left atrium, while blood from the skin returns through the cutaneous veins with the body blood to the sinus venosus and right atrium (the pulmocutaneous arch still carries blood *to* the lungs and skin).
- **Brief accounts.** The syllabus asks for a brief account of the systems; the notes state the facts commonly given in ISC and NCERT-based books (for example ten pairs of cranial nerves, the vasa efferentia entering the kidney, two portal systems). Some books describe the arches leaving the truncus arteriosus or the mechanism of the buccal pump in more detail, and the notes do not.
- **Buccal pump.** The raising and lowering of the buccal floor is stated in the usual simple way; some books describe a two-stroke pump.
- **Tadpole gut.** The long gut of a plant-eating tadpole is used as a contrast with the short gut of the carnivorous adult; the figures in the arithmetic are made up.
- **Colour change.** The notes say the frog can change colour slightly to hide from enemies, as the books do; no mechanism is taught.
- **Imagined numbers.** The pond census, the feeding counts, the gut lengths, the heart rate and stroke volume, the oxygen shares, the dissection sheets and the nerve length and speed are made up for arithmetic and are not frog data.
