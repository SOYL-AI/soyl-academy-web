# CBSE Class 11 Biology, Chapter 7 — Structural Organisation in Animals

`cbse-11-biology-ch07` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (4 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch07_short` (20 marks, 40 min) and `t_cbse11bio_ch07_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (real size from magnification, percentages, frog digits, cranial nerves, vasa efferentia, egg survival; every value asserted), `svgs.mjs` (simple epithelia, connective tissues, three muscles, neuron with neuroglia, frog external features, frog heart, male urinogenital system), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch07/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both syllabus topics are covered: t01 animal tissues, t02 morphology and anatomy of the frog. In the 2026-27 rationalised syllabus the frog is the only animal studied; earthworm and cockroach are not in scope and are not used.
- Class 11 depth, school-examination style in the CBSE pattern (Class 11 has no board exam): tissue definition; simple epithelia (squamous, cuboidal with microvilli, columnar, ciliated) with locations; glandular epithelium (unicellular goblet cells, multicellular salivary glands; exocrine and endocrine); compound epithelium; tight, adhering and gap junctions; connective tissue fibres and matrix; loose (areolar with fibroblasts, macrophages, mast cells; adipose), dense regular (tendons, ligaments) and dense irregular (skin); cartilage, bone and blood; skeletal, smooth and cardiac muscle with intercalated discs; neurons and neuroglia. Frog (Rana tigrina): poikilothermy, camouflage, aestivation and hibernation; skin and colour; head and trunk; nostrils, nictitating membrane, tympanum; four and five digits, webbed feet; vocal sacs and copulatory pads; short carnivore gut, common bile duct, chyme, villi; cutaneous and pulmonary respiration; closed circulation, lymphatic system, three-chambered heart with sinus venosus and conus arteriosus, hepatic and renal portal systems, nucleated red cells; kidneys, ureters, bladder, cloaca, ureotely; endocrine glands; brain divisions, ten pairs of cranial nerves, sense organs; testes, mesorchium, 10–12 vasa efferentia, Bidder’s canal, ovaries, oviducts, 2500–3000 ova, external fertilisation, tadpole and metamorphosis; importance of frogs.

## Shape
- **Part 1 (t01), 16 slides:** four basic tissues; simple epithelium (diagram); glandular epithelium; compound epithelium and junctions; connective tissue (diagram); types of connective tissue; worked example (6 mm at magnification 400 = 15 µm, computed); muscle (diagram); neural tissue (diagram); worked example (27 of 36 cuboidal cells = 75 percent, computed); summary; exam tips.
- **Part 2 (t02), 16 slides:** habitat and habits; external features (diagram); worked example (male or female from copulatory pads and vocal sacs); digestive system (flow); respiration; heart and circulation (diagram); excretory and male reproductive systems (diagram); nervous system and sense organs; worked example (2800 eggs → 1680 tadpoles → 84 froglets, computed); reproduction and importance; summary; exam tips.
- **Visuals (24 of 32 slides; no gap longer than one slide):** table 13, flow 4, svg 7.
- **Diagrams (7 SVGs, 14 uses across decks and notes):** simple epithelia on a basement membrane; areolar tissue, cartilage and bone; skeletal, smooth and cardiac muscle; neuron with neuroglia and impulse direction; frog dorsal view; frog heart in its pericardium; male urinogenital system. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 9–60 words (mean 37), no symbols, unit abbreviations or formulae.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 | 1 (keys a 8, b 8, c 7, d 7) |
| assertion-reason | 4 | 1 (keys a c b d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (60 µm; 70 %; 18 digits; 20 cranial nerves; 75 adults; 24 vasa efferentia) |
| short | 6 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 19 · d2 33 · d3 15 · d4 1 (evaluating whether the frog is fully adapted to land).
- **Competency:** recall 15 · understanding 20 · application 28 · analysis 4 · evaluation 1. Application or higher is **49% of items (50% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 32 · t02 36.
- **Cases:** four practical slides (ciliated epithelium, 15 µm, cartilage and skeletal muscle or the role of cilia); a knee injury (ligament, 37.5 % damaged fibres, cartilage or skeletal muscle); a year at a village pond (aestivation, 1000 hatchlings, breeding after rain or hibernation); a dissection model (male frog, vasa efferentia, urinogenital duct and cloaca or kidneys).
- **Deck checks:** compound epithelium, adipose tissue, cardiac muscle A-R (Part 1); nictitating membrane, sinus venosus, optic lobes (Part 2) — all objective, none used in a test.
- **Re-solves:** 9 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A microvilli, male frog features, smooth muscle (MCQ), compound epithelium (A-R) · B exocrine and endocrine glands (2 marks), frog breathing (2 marks), digestion of an insect (3 marks) · C epithelial tissue or frog circulation and excretion · D practical slides case.
- **Long:** A tendon, gap junctions, neuroglia, wrongly labelled slide, skin breathing in hibernation, blocked bile duct, renal portal system, route of sperms (MCQ), poikilothermy, frog red cells (A-R) · B tendon and ligament, sexes of frogs, (squamous lining of air sacs or lymph and blood), cell junctions, (path of blood through the heart or male and female ducts) · C is the frog fully adapted to land + (connective tissue or frog digestion and respiration) · D pond case, dissection case.

## Validation
- Author validator (in the build): 19 maths strings parse; 14 SVG uses / 7 distinct diagrams pass the allow-list; narration clean; 9/9 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- `npm run content -- verify --board cbse --class 11 --subject biology --authored`: 68/68 pass, 0 blocking + 0 minor flags. `npm run content -- originality --authored`: 0 errors. Exact-stem check against all authored chapters: no duplicate stems.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem; keys, schemes and word limits were checked. Fixes made:
1. **Diagrams after rasterising.** A stray neuroglia label duplicated the neuroglial-cell label and was removed; a glial cell under the nucleus leader was moved; the frog limbs were redrawn in the palette green; the rectum, bladder and cloaca labels of the urinogenital diagram were spaced so their leaders no longer cross the kidney; the sinus venosus leader was moved off the vena cava arrow.
2. **Heart label.** A placeholder text element in the heart diagram was replaced by a two-line sinus venosus label.

## For a reviewer
- Frog facts follow the rationalised NCERT account: Rana tigrina; camouflage by colour change; head and trunk only; four and five digits; vocal sacs and copulatory pads in males; three-chambered heart with sinus venosus (dorsal) and conus arteriosus (ventral); hepatic and renal portal systems; nucleated red cells; ureotelic; ten pairs of cranial nerves; optic lobes in the midbrain; testes held by the mesorchium; 10–12 vasa efferentia per testis opening into Bidder’s canal; ureters as urinogenital ducts in the male and separate openings in the female; 2500–3000 ova; external fertilisation and a tadpole.
- Tissue locations: squamous (blood vessel walls, lung air sacs), cuboidal (gland ducts, nephron tubules, microvilli in the proximal convoluted tubule), columnar (stomach, intestine), ciliated (bronchioles, fallopian tubes), compound (skin, buccal cavity, pharynx, salivary and pancreatic ducts), dense irregular (skin), cartilage (nose tip, outer ear, between vertebrae).
- The A-R on poikilothermy is keyed (b): burrowing is treated as a consequence of being cold-blooded, not its explanation.
- The urea statement in the evaluation answer (less water needed than for ammonia) is general physiology, not a frog-specific textbook line.
- Case figures (magnifications, cell counts, damaged fibres, egg numbers and survival percentages) are illustrative.
