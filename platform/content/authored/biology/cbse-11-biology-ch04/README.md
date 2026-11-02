# CBSE Class 11 Biology, Chapter 4 — Animal Kingdom

`cbse-11-biology-ch04` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 16 slides), notes (3 sections), 30 flashcards, 107 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch04_short` (20 marks, 40 min) and `t_cbse11bio_ch04_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (phylum table with level, symmetry, germ layers, coelom and segmentation; class table with heart, temperature, covering and fertilisation; keys that name a phylum or class from features; reef, rock-pool, worm and zoo tallies; gill slits, heart chambers, comb plates, segments, museum species — each asserted with `eq`), `svgs.mjs` (five drawings, four with a lettered twin), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch04/src/build.mjs` (deterministic; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01 basis of classification, t02 non-chordates up to phyla, t03 chordates up to classes) are covered; the chapter has no removed topics. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth: levels of organisation, symmetry (asymmetrical, radial, bilateral), diploblastic and triploblastic layers with mesoglea, acoelomate, pseudocoelomate and coelomate bodies, metamerism, notochord, incomplete and complete gut, open and closed circulation; the ten non-chordate phyla (Porifera with the canal system, Coelenterata with cnidoblasts, polyp, medusa and metagenesis, Ctenophora, Platyhelminthes, Aschelminthes, Annelida, Arthropoda, Mollusca, Echinodermata, Hemichordata) with salient features and examples; Chordata (four features and ventral heart, contrast with non-chordates, three subphyla, Cyclostomata, Chondrichthyes, Osteichthyes, Amphibia, Reptilia, Aves, Mammalia).
- No classification below class level, no life-history detail and no anatomy of animal types beyond the textbook's salient features.

## Shape
- **Part 1 (t01, t02), 18 slides:** levels of organisation; symmetry; germ layers; coelom; segmentation, notochord, gut; worked example (naming the phylum from features, computed); sponge; coelenterates and ctenophores (polyp and medusa); three table slides for the other phyla; worked example (reef survey tally of eleven animals, computed); summary; exam tips; 3 checks.
- **Part 2 (t03), 16 slides:** chordate features; contrast with non-chordates; subphyla; classification flow; cartilaginous versus bony fishes; worked example (7 pairs of gill slits, 21 chambers in seven hearts, computed); amphibians and reptiles; birds and mammals; worked example (naming the class from clues, computed); seven-class comparison; summary; exam tips; 3 checks.
- **Visuals (26 of 34 slides; no gap longer than one slide):** table 18, flow 3, svg 5 (plus notes visuals).
- **Diagrams (5 drawings, 9 SVGs counting lettered twins):** three kinds of symmetry; three body cavities in cross-section; a sponge in section; polyp and medusa; a simple chordate with notochord, nerve cord, gill slits, heart and tail. Lettered versions of the symmetry, coelom, sponge and chordate drawings serve diagram-based questions, with scrambled panel order. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye; caption and label overlaps were fixed (see below).
- **Narration:** 6–54 words (mean 37).

## Question bank (107)
| Type | Count | Marks |
|---|---|---|
| mcq | 52 | 1 (keys a 13, b 13, c 13, d 13) |
| assertion-reason | 7 | 1 (keys b c d a d a c) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1 (192 comb plates; 60 arthropod species; 80 segments; 24 gill slits; 18 heart chambers) |
| short | 10 + 10 | 2 / 3 |
| long | 9 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 29 short/long items.
- **Difficulty:** d1 39 · d2 56 · d3 11 · d4 1 (evaluating a claim that whales and sharks are both fishes and that all warm-blooded animals are viviparous).
- **Competency:** recall 16 · understanding 38 · application 49 · analysis 3 · evaluation 1. Application or higher is **50% of items (43% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 27 · t02 47 · t03 39 (items spanning topics count more than once).
- **Cases:** an eight-animal rock-pool survey (radula, six coelomates, anemone versus urchin or ragworm versus crab); nine worms sorted by body plan (flame cells, three segmented worms, pseudocoelom or earthworm versus roundworm); an aquarium of shark, rohu, lamprey and toad (operculum, nine pairs of gill slits from 18, sinking shark or shark and toad hearts); a zoo of 31 animals (four-chambered hearts, 21 warm-blooded, ostrich or crocodile).
- **Deck checks:** coelom lining, cnidoblasts, sponge A-R (Part 1); urochordate notochord, frog heart, whale A-R (Part 2) — all objective.
- **Re-solves:** 13 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A germ layers, frog cloaca, shark buoyancy (MCQ), crocodile heart A-R · B radial versus bilateral symmetry (2), sponge water flow (2), flatworms versus roundworms (3) · C four phyla (arthropods to hemichordates) or fishes · D rock-pool case.
- **Long:** A levels of organisation, comb jelly, mosquito vectors, starfish movement, acorn worm, lancelet, rohu operculum, dolphin (MCQ), echinoderm larva A-R, bird skeleton A-R · B urochordates versus cephalochordates, metamerism, (diploblastic or cnidoblasts), arthropods, (bird flight or frog versus lizard) · C basis of classification, (chordate features or tetrapods) · D worm case, zoo case.

## Validation
- Author validator (in the build): 25 maths strings parse; 18 SVG uses / 9 distinct SVGs pass the allow-list; narration clean; 13/13 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: no exact duplicate stems; `verify --authored` shows 0 blocking and 0 minor issues for this chapter; `originality --authored` shows 0 errors.

## Verifier pass (2026-11-02)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Marks and word limits.** Scheme marks of 0.75 and 1.25 were changed to multiples of 0.5; three 3-mark model answers under the word limit were extended.
2. **Competency tags.** Five MCQs that apply a term to a described specimen (metamerism, regeneration, frog cloaca, cut-anywhere symmetry, mollusc body plan) were re-tagged from understanding to application, so the bank sits at 50% rather than on the 45% edge.
3. **Diagrams after rasterising.** The polyp was moved clear of its left-hand labels, the polyp and medusa captions were split into two lines to stop them colliding, and the chordate item that mixed exclusive and shared structures was reworded to ask for two named parts.
4. **Test hygiene.** Test items were chosen so that no stem states the answer to another item in the same test (for example, the sharks-sinking item and the shark A-R are in different tests).

## For a reviewer
- Phylum and class features are the NCERT text. The table gives Porifera no germ layers and no coelom (cellular grade); some books call sponges diploblastic.
- Coelenterata is written as in NCERT (Cnidaria in brackets); Hemichordata is a separate non-chordate phylum, as in the rationalised text.
- Cyclostomata heart and fertilisation are marked "not stated", because the textbook gives neither; other books give a two-chambered heart.
- Arthropods are called coelomate as in NCERT, although many books describe a haemocoel; "over two-thirds of named species" is quoted as the textbook says, and the museum numbers (90 species, 60 arthropods) are illustrative.
- All tallies (reef, rock pool, worm tray, zoo), the 192 comb plates (8 rows of 24) and the gill-slit counts (9 or 12 pairs, within the textbook's 6–15) are imagined.
- The echinoderm item that treats adults as radial and larvae as bilateral follows the textbook statement; some books note secondary radial symmetry.
- The sponge, polyp and medusa, and chordate drawings are schematic and not to scale.
