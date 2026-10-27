# CBSE Class 10 Science, Chapter 15 — Evolution (formative assessment only)

`cbse-10-science-ch15` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 21 slides), notes (7 sections), 32 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch15_short` (20 marks, 40 min) and `t_cbse10sci_ch15_long` (40 marks, 90 min), laid out as the default blueprints `cbse-10-default-chapter-test-short` / `-long`. No shared questions. |
| `src/` | `svgs.mjs` (7 diagrams; the vertebrate tree is computed from a nested cladogram), `decks.mjs`, `study.mjs`, `questions.mjs` (with small independent helpers for the re-solve checks: survivor share, half-lives), `build.mjs`; shared library `../cbse-10-science-ch06/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-10-science-ch15/src/build.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- The whole chapter is `board_assessed: false` in the 2026-27 syllabus: taught and assessed only through internal assessment (activities, projects, portfolio), never in the board theory paper. The Part 1 title slide and the first notes section say so. The chapter tests use the default chapter-test blueprints for practice only.
- All four syllabus topics: t01 acquired and inherited traits; t02 speciation (natural selection, genetic drift, geographical and reproductive isolation); t03 evolution and classification (shared characteristics, family trees, homologous and analogous organs, fossils and their dating, Archaeopteryx and feathers); t04 evolution by stages (the eye, artificial selection from wild cabbage, molecular phylogeny) and human evolution.
- **Misconceptions handled explicitly**, in slides, notes, flashcards and items: "humans evolved from chimpanzees" (they share a common ancestor; chimpanzees are cousins), "animals change because they need to", inheritance of acquired traits (giraffe necks, trimmed tails), "evolution is progress", homology judged by function, human "races" as separate kinds (all humans are one species).
- Heredity (Mendel, sex determination) is in ch08 and is not repeated here; this chapter starts from variation and its inheritance.
- Since the chapter is formative, items lean toward understanding, data and activities: a four-year grasshopper survey, a museum skeleton visit, fossil layers at a cliff in Kutch, a vegetable-market conversation, and an island population of rats.

## Shape
- **Part 1 (t01–t02), 19 slides:** what evolution is (and is not); acquired vs inherited traits; worked example (sorting five of Asha’s traits); why acquired traits are not inherited (germ cells; the mouse-tail experiment); natural selection (grasshoppers SVG); five steps of selection; worked example (100 green + 100 brown, birds eat 1/2 and 1/10 → brown ≈ 64%); genetic drift vs selection; what a species is (dogs; horses, donkeys and mules); speciation (SVG); four factors; worked example (tree frogs with different calls → reproductive isolation); misunderstandings; summary; exam tips.
- **Part 2 (t03–t04), 21 slides:** classification follows evolution; vertebrate family tree (SVG); homologous forelimbs (SVG); analogous wings (SVG); worked example (dolphin/human, butterfly/sparrow, potato/sweet potato, bougainvillea thorn/cucumber tendril); fossils (kinds; dinosaur eggs in Gujarat and Madhya Pradesh); rock layers (SVG); dating methods; worked example (1/8 of carbon-14 left → 3 half-lives ≈ 17 190 years); Archaeopteryx and feathers; eye in stages; worked example (wild cabbage → kohlrabi, with a flow of five vegetables); molecular phylogeny; humans and chimpanzees as cousins (SVG); origin of Homo sapiens in Africa and one species; summary; exam tips.
- Layouts: title 2, concept 15, diagram 7, example 6, check 6, summary 2, exam-tips 2.
- **Visuals (34 of 40 slides; no gap longer than one slide):** table 21, svg 7, flow 6.
- **Diagrams (7 hand-written SVGs):** grasshoppers before/after selection; four-stage speciation by a river; vertebrate cladogram with backbone / four limbs / hair and milk marked; homologous forelimbs of human, cat, whale and bird (colour-coded bones); analogous wings of insect, bird and bat; fossil layers (trilobite, ammonite, fish, mammal bone; "illustrative"); gorilla–chimpanzee–human tree with the shared ancestor marked. All rasterised (resvg) and eye-checked; fixes: grass spikes overlapping the bottom row of grasshoppers, cladogram labels clipped or crossing branches (and one stray marker), the forelimb legend colliding with a caption, the "Older" label sitting on the arrow, and the gorilla-tree label crossing its stem.
- **Narration:** 10–67 words (mean 51); numbers, years and percentages in words; no symbols.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5) |
| assertion-reason | 7 | 1 (keys a d b a c b d: a 2, b 2, c 1, d 2) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1 (trimmed-tail puppies born = 0; brown share after predation 66.7%; carbon-14 at one-quarter ≈ 11 460 years; 90 cm of mud at 2 cm per 100 years = 4500 years) |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 5 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** `passage_origin: "soyl-original"` on every passage; `word_limit` on the 13 prose short/long items, left off classification and list answers.
- **Difficulty:** d1 8 · d2 20 · d3 29 · d4 7.
- **Competency:** recall 8 · understanding 26 · application 21 · analysis 8 · evaluation 1. Application or higher is **47% of items (48% of marks)**.
- **Topic tags:** t01 14 · t02 22 · t03 20 · t04 15.
- **Cases:** a four-year grasshopper survey near Jodhpur during a drought (80% brown in year 4; evaluation of "they turned brown to hide"); an island cut off by rising sea with about 30 founding rats (drift, reproductive isolation, selection for size); a museum skeleton visit in Kolkata (homologous vs analogous; evaluation of "bats are related to butterflies"); fossil layers in a Kutch cliff with carbon-14 at one-half (≈ 5730 years; why carbon-14 cannot date ammonites); a vegetable market in Shimla (artificial vs natural selection; evaluation of an argument from artificial selection).
- **Deck checks:** q006, q015, q020 (Part 1); q032, q033, q052 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short:** A q001, q016, q032 (MCQ), q052 (A-R) · B q009, q043 (2 marks), q028 (3 marks) · C q058 or q059 · D q060.
- **Long:** A q002, q004, q012, q014, q015, q031, q033, q048 (MCQ), q005, q036 (A-R) · B q026, q044, (q027 or q055), q045, (q056 or q057) · C q029 + (q011 or q046) · D q063, q064.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars`: **0 errors, 0 warnings**.
- `npm run content -- verify --board cbse --class 10 --authored`: 64/64 pass, 0 flags.
- `npm run content -- originality --authored`: 0 errors for this chapter.
- Author validator: 17 maths strings (KaTeX strict + mhchem) parse; 14 SVG visuals / 7 distinct diagrams pass the allow-list; narration clean; **9/9 scripted re-solves** (survivor shares recomputed from the predation rates, half-lives from the carbon-14 fractions with log₂, the layer arithmetic, the grasshopper table’s trend and year-4 share, the DNA-difference ranking).

## Verifier pass (2026-10-27)
Every item, case part and alternative was re-solved from its stem; no key was wrong. Fixes during authoring:
1. **Competency honesty.** The first draft was at 38% application or above (lint band 45–65%). Six items were rewritten into genuinely new contexts, not relabelled: natural selection now uses beach snails on volcanic ash (the deck uses grasshoppers); drift vs selection became a two-scenario classification (flood-killed beetles, soot-darkened moths); speciation became a prediction for squirrels split by a gorge; homologous/analogous became a classification of new pairs (horse/monkey, housefly/crow); Archaeopteryx became the interpretation of a newly found fossil; molecular phylogeny became a DNA-difference table for three birds. Final: 47%.
2. **Word limits.** Two 5-mark model answers (acquired traits; fossils) were 148 and 152 words against 80–120; both were tightened.
3. **Wrong shared feature.** The "most closely related" MCQ solution first said the lizard and mouse share four limbs (all three animals do); it now names the protective membrane around developing young as the extra shared feature.
4. **Thin space in maths.** "17\,190" in a worked example was rewritten as 17190 so the arithmetic lint reads it.
5. **Verify flag.** Stage-5 verify (minor `numeric.final`) noted that the 66.7% key was reached only with ≈; the solution now computes 160 × 100 / 240 = 200/3 exactly before rounding.
6. **Diagram fixes** (see Shape).

## Facts a reviewer should confirm
- Mouse-tail experiment "in the eighteen eighties" (Weismann, 1889); Homo sapiens arising in Africa "a few hundred thousand years ago" and spreading out of Africa "tens of thousands of years ago"; humans and chimpanzees sharing an ancestor "several million years ago" with DNA "close to 99%" alike. Dates are deliberately rounded.
- Carbon-14 half-life taken as 5730 years; carbon dating said to work only up to "some tens of thousands of years".
- Dinosaur egg fossils in Gujarat and Madhya Pradesh (Balasinor and Dhar areas).
- Homologous/analogous examples: bougainvillea thorns and cucumber tendrils as modified stems (homologous); potato (stem) and sweet potato (root) (analogous); octopus and human eyes (analogous, evolved separately).
- Wild-cabbage derivatives: cabbage (short stem, packed leaves), broccoli (flower-bud clusters), cauliflower (dense head of undeveloped flowers), kohlrabi (swollen stem), kale (large leaves).
- Case data (grasshopper counts, island rats, Kutch layers, DNA differences for birds P, Q, R) are illustrative and labelled so where needed.

## Known gaps
- Narration audio is not generated (TTS stage).
- The fossil-layer diagram is schematic: it shows "deeper is older" and should not be read as the order in which these groups first appeared.
- Bird and bat wings are treated as analogous as wings (flight evolved separately) while their forelimb bones are homologous; the deck states this nuance once, and the items avoid relying on it.
- Formative-only status is stated in content; the contract has no release-level field for it.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 2 item tag(s) and 3 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 8, understanding 28, application 19, analysis 8, evaluation 1 — application or higher 44% of items, 43% of marks (supersedes the competency figures above).
