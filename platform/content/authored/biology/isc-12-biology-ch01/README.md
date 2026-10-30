# ISC Class 12 Biology, Chapter 1 — Sexual Reproduction in Flowering Plants: Pre-fertilisation

`isc-12-biology-ch01` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (4 sections), 34 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch01_short` (20 marks, 50 min) and `t_isc12bio_ch01_long` (40 marks, 100 min), laid out as the ISC class defaults `isc-12-default-chapter-test-short` / `-long` (`catalog/cisce/blueprints/12`). The two tests share no questions. |
| `src/` | `lib.mjs` (the ISC 12 Biology authoring library, used by every chapter of this subject), `calc.mjs` (ploidy, pollen from sporangia and mother cells, embryo-sac nuclei), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch01/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## The ISC library (`src/lib.mjs`)
Copied from `cbse-12-biology-ch01/src/lib.mjs` and adapted for ISC:
- unit `isc-12-biology-chNN`, question ids `q_isc12bio_chNN_###`, test ids `t_isc12bio_chNN_short/long`;
- assertion-reason options as in the ISC 2027 Biology specimen paper: (a) both true, Reason explains; (b) both true, Reason does not explain; (c) Assertion true, Reason false; (d) **both false**;
- chapter tests on the ISC defaults: Section A objective (short 4 MCQ + 1 A-R; long 10 MCQ + 2 A-R), B 2-mark, C 3-mark and D 5-mark questions, with an internal choice in the last question of B and C (short) and of B, C and D (long).

## Scope
- All five syllabus topics (t01–t05), following the ISC 2027 syllabus rather than NCERT: anther and wall layers, microsporogenesis, pollen structure, **pollen viability and economic importance**, ovule, megasporogenesis, monosporic embryo sac; **chasmogamy and cleistogamy**, wind, water and insect pollination with adaptations; advantages of self- and cross-pollination; **outbreeding devices** (dichogamy, herkogamy, self-incompatibility, unisexuality); pollen–pistil interaction; **artificial hybridisation** (emasculation, bagging). Double fertilisation and post-fertilisation events belong to ch02.

## Shape
- **Part 1 (t01–t02), 16 slides:** whorls; anther T.S.; microsporogenesis; pollen grain; worked example (4 × 30 mother cells → 480 pollen grains with n = 12, computed); viability and importance; ovule; megasporogenesis; embryo sac; worked example (2³ = 8 nuclei in 7 cells, all n = 12, computed); summary; exam tips.
- **Part 2 (t03–t05), 16 slides:** kinds of pollination; chasmogamy and cleistogamy; wind and water; animals; worked example (identifying the agent of three flowers); self versus cross; outbreeding devices; worked example (castor, papaya and a self-incompatible plant); pollen–pistil interaction; artificial hybridisation; summary; exam tips.
- **Visuals (24 of 32 slides; no gap longer than two slides):** table 13, flow 6, svg 5.
- **Diagrams (7 SVGs, 13 uses):** anther T.S. with an enlarged microsporangium, pollen grain, anatropous ovule, embryo sac, kinds of pollination (copied from CBSE 12 Biology ch01, same author), plus two new lettered figures for diagram-based questions (embryo sac A–E; microsporangium wall P–T). Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 8–49 words (mean 32).

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7), 3 diagram-based with lettered figures |
| assertion-reason | 5 | 1 (ISC options; keys b d a c d) |
| short, 1 mark | 6 | give-a-reason (4), analogy (1), reason for free-nuclear division (1) |
| fill-blank | 2 | 1 |
| numerical | 4 | 1 (2000 pollen grains; 8 chromosomes; 8 nuclei; 20 chromosomes) |
| short | 7 + 8 | 2 / 3, including three labelled-diagram questions |
| long | 4 | 5, each in marked parts (2 + 2 + 1, 2 + 2 + 1, 2 + 1 + 2, 1 + 2 + 2) |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 24 short/long items except the analogy.
- **Difficulty:** d1 15 · d2 34 · d3 16 · d4 1.
- **Competency:** recall 14 · understanding 19 · application 29 · analysis 4. Application or higher is **50% of items (57% of marks)**, matching the ISC 2027 aim of about half the marks on higher-order skills.
- **Topic tags:** t01 20 · t02 14 · t03 19 · t04 8 · t05 6.
- **Re-solves:** 5 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A tapetum, monosporic, wind pollination, emasculation (MCQ), embryo sac (A-R) · B geitonogamy vs xenogamy; (ovule parts or pollen–pistil interaction) · C anther T.S.; (outbreeding devices or megasporogenesis) · D microsporogenesis in parts.
- **Long:** A exine, germ pore, rice pollen storage, synergids, anatropous ovule, geitonogamy, Commelina, Vallisneria, dioecy, maize female parent (MCQ), monoecy, cleistogamy (A-R) · B microsporogenesis; self vs cross; (wheat pollen viability or isolated tree) · C pollen grain diagram; wind vs insect; hybridisation plan; (embryo sac diagram or water pollination) · D ovule and embryo sac; (pollination in parts or hybridisation in parts).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- `npm run content -- assemble --board cisce --class 12 --subject biology --chapter 1 --source files` with `tests.json` moved aside assembled both chapter tests from the ISC defaults (2/2 papers, 0 generation requests), so the bank fills the blueprints on its own.
- Author validator (in the build): 15 maths strings parse; 13 SVG uses / 7 distinct diagrams pass the allow-list; narration clean; 5/5 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; the first build needed no fixes. Checked in particular: the ISC "both false" option is the key only where both statements are false; the lettered figures match their keys (S tapetum; E filiform apparatus; B polar nuclei).

## Facts a reviewer should double-check
- "Over 60 percent of angiosperms shed pollen at the 2-celled stage" and pollen viability figures follow the standard textbook account.
- Parthenium is described as having come to India with imported wheat, as in the textbook.
