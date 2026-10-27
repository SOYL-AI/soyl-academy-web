# CBSE Class 10 Science, Chapter 7 — How do Organisms Reproduce?

`cbse-10-science-ch07` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (21 + 15 + 19 slides), notes (8 sections), 32 flashcards, 78 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch07_short` (20 marks, 40 min) and `t_cbse10sci_ch07_long` (40 marks, 90 min), laid out as the default blueprints `cbse-10-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the shared library is `../cbse-10-science-ch06/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-10-science-ch07/src/build.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed or formative-only topics.
- Class 10 depth: germ cells "carry half the chromosomes" (meiosis is not named); one pollen tube per fertilised ovule (double fertilisation is not taught); the human systems use the syllabus labels (testis, scrotum, vas deferens, seminal vesicle, prostate, urethra; ovary, oviduct, uterus, cervix, vagina; placenta, villi, umbilical cord); STDs are the four syllabus examples; contraception covers barrier, hormonal, copper-T and surgical methods; female foeticide and the legal ban on prenatal sex determination are stated plainly.
- Human-reproduction content is written in neutral, factual, age-appropriate language, as in the syllabus; no images beyond schematic, labelled systems.
- Tissue culture is not taught. Yeast budding appears once as an extra example of budding.

## Shape
- **Part 1 (t01–t02), 21 slides:** why reproduce; DNA copying; variation; worked example (heat-wave bacteria); asexual methods table; binary and multiple fission; worked example (Amoeba doubling, 2⁶ = 64); fragmentation and regeneration; budding; spores; vegetative propagation (natural and by people); worked example (banana, mango, sugarcane); strengths and limits; summary; exam tips.
- **Part 2 (t03), 15 slides:** germ cells with half the chromosomes; worked example (potato 48 → 24 → 48); flower parts; unisexual and bisexual flowers; pollination; pollen tube and fertilisation; post-fertilisation changes; worked example (pea pod with 7 seeds); germination; summary; exam tips.
- **Part 3 (t04–t05), 19 slides:** puberty; male system; sperms and semen; female system; eggs and ovaries; fertilisation and implantation; placenta; worked example (tracing the sperm and egg); menstruation; STDs; contraception; worked example (matching methods to needs); every girl child counts; summary; exam tips.
- **Visuals (46 of 55 slides; no gap longer than one slide):** table 25, svg 12, flow 9.
- **Diagrams (12 hand-written SVGs):** binary fission (four stages), multiple fission, budding in Hydra, regeneration in Planaria, bread mould with sporangia, Bryophyllum leaf with plantlets, flower section, pollen tube to the ovule, germinating seed, male and female reproductive systems (schematic front views, captions say so), embryo with placenta and umbilical cord. Every SVG was rasterised and checked by eye.
- **Narration:** 11–71 words (mean 55), no symbols, formulae or abbreviations a TTS voice would spell out.

## Question bank (78)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 (keys a 8, b 8, c 8, d 7) |
| assertion-reason | 9 | 1 (keys a d c b a a c d b: a 3, b 2, c 2, d 2) |
| true-false | 3 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1 (bacteria after 2 h = 64; potato egg 24; pea pod 9 pollen grains; human sperm 23) |
| short | 7 + 7 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives`; 4 cases include a numerical part |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on 16 of 19 short/long items (left off list-style answers).
- **Difficulty:** d1 11 · d2 29 · d3 31 · d4 6 · d5 1.
- **Competency:** recall 12 · understanding 28 · application 27 · analysis 10 · evaluation 1. Application or higher is **49% of items (53% of marks)**.
- **Topic tags:** t01 11 · t02 21 · t03 21 · t04 16 · t05 13.
- **Cases:** pond bacteria at four temperatures plus offspring of survivors (data, %); plant nursery (everyday/industry, evaluation alternative); bread mould under three conditions (lab data); pumpkin flowers open / bagged / hand-pollinated (data, %); antenatal clinic and the placenta (everyday); district child sex ratio before and after a campaign (data, evaluation alternative).
- **Deck checks:** q002, q017, q013 (Part 1); q027, q035, q037 (Part 2); q046, q052, q062 (Part 3) — all objective.

## Chapter tests (default blueprints)
- **Short:** A q008, q012, q047 (MCQ), q036 (A-R) · B q022, q057 (2 marks), q043 (3 marks) · C q026 or q059 · D q074.
- **Long:** A q009, q011, q016, q028, q030, q050, q049, q064 (MCQ), q053, q066 (A-R) · B q006, q023, (q041 or q070), q058, (q007 or q071) · C q045 + (q060 or q072) · D q076, q078.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars` (after merging the stricter M2 lint from `platform/main`): **0 errors, 0 warnings**.
- Author validator: 17 maths strings (KaTeX strict + mhchem) parse; 24 SVG visuals / 12 distinct diagrams pass the allow-list; narration clean; 7/7 scripted re-solves (2⁶ = 64, 48/2, 9 seeds, 46/2, 24/210 ≈ 11%, 17/20 = 85%, 1000 − 905 = 95).

## Verifier pass (2026-10-27)
Every question, case part and alternative was re-solved from its stem; biology facts were checked against the syllabus. Fixes:
1. **Competency honesty.** The first draft was 32% application or higher. Eleven items were rewritten into new contexts (Leishmania in a kala-azar sample, breeding for rust resistance, three microscope slides, a watermelon vine with only male flowers, seeds in a tomato, a chromosome-doubling thought experiment, a cut-style experiment, no period in pregnancy, an STD cured by antibiotics, beehives for mustard but not maize, matching contraceptives to two couples) and seven duplicate recall items were removed. Final 49% (53% of marks).
2. **Accuracy.** A guava item was changed to a tomato (guava fruit includes floral-tube tissue, so "the fleshy part is the ovary" is not strictly true); the sex-ratio evaluation no longer treats 1000 as the natural benchmark (natural child sex ratios are a little below 1000); puberty onset widened to "about nine to fourteen"; yeast is linked to bread dough, not idli batter (idli fermentation is mainly bacterial).
3. **Diagrams after rasterising.** Hydra canvas enlarged so the "Tentacles" label clears the tentacles; Bryophyllum and flower leaders re-aimed at a notch and a filament; seed labels moved off their leaders; the placenta drawing was shifted so its labels sit outside the uterine wall.
4. **Difficulty.** The two-field disease question was raised to d5 (three-part reasoning in an unfamiliar context).

## Known gaps
- Narration audio is not generated (TTS stage).
- Illustrative data in cases (colony counts, mould days, fruit set, district sex ratios) are realistic values, not cited measurements; the sex-ratio district is fictional.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 2 item tag(s) and 3 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 12, understanding 30, application 25, analysis 10, evaluation 1 — application or higher 46% of items, 51% of marks (supersedes the competency figures above).
