# ISC Class 12 Biology, Chapter 2 — Fertilisation, Seed and Fruit in Flowering Plants

`isc-12-biology-ch02` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 16 slides), notes (5 sections), 32 flashcards, 61 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch02_short` (20 marks, 50 min) and `t_isc12bio_ch02_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (ploidy of every seed and fruit tissue, gametes and meioses per seed), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch02/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics (t01–t05): events leading to fertilisation, double fertilisation and triple fusion with significance; **endosperm types (nuclear, cellular, helobial)**; perisperm; dicot and monocot embryo development; **bean seed and maize grain**; albuminous and non-albuminous seeds; **true and false fruits; L.S. of mango and coconut**; significance of seeds, fruits and dispersal; apomixis, polyembryony and parthenocarpy. (Helobial endosperm and the mango and coconut sections are ISC topics that the CBSE chapter does not have.)

## Shape
- **Part 1 (t01–t02), 14 slides:** double fertilisation; significance; worked example (2n = 14: zygote 14, PEN 21, perisperm and seed coat 14, computed); endosperm types; perisperm; dicot embryo; monocot embryo; worked example (40 seeds → 40 ovules, 40 pollen, 80 gametes, 40 + 10 = 50 meioses, computed); summary; exam tips.
- **Part 2 (t03–t05), 16 slides:** bean seed; maize grain; albuminous vs non-albuminous; worked example (classifying four seeds); true, false and parthenocarpic fruits; mango; coconut; worked example (edible parts and their origins); significance and dispersal; apomixis, polyembryony, parthenocarpy; summary; exam tips.
- **Visuals (22 of 30 slides; no gap longer than two slides):** table 13, svg 7, flow 2.
- **Diagrams (8 SVGs, 16 uses):** double fertilisation, dicot embryo and grass embryo (copied from CBSE 12 Biology ch01, same author); new: bean seed, L.S. of maize grain, lettered maize grain (A–F) for diagram questions, L.S. of mango and of coconut. Every SVG was rasterised and checked by eye.
- **Narration:** 6–51 words (mean 31).

## Question bank (61)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6), 2 diagram-based on the lettered maize grain |
| assertion-reason | 5 | 1 (ISC options; keys d d a b c) |
| short, 1 mark | 4 | give-a-reason (3), analogy (1) |
| fill-blank | 1 | 1 |
| match | 1 | 2 |
| numerical | 4 | 1 (PEN 30; 25 gametes in triple fusion; 75 meioses; 24 gametes) |
| short | 7 + 8 | 2 / 3, including three labelled-diagram questions and a six-tissue ploidy question |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 15 · d2 33 · d3 12 · d4 1.
- **Competency:** recall 13 · understanding 19 · application 24 · analysis 4 · evaluation 1. Application or higher is **48% of items (54% of marks)**.
- **Topic tags:** t01 12 · t02 20 · t03 12 · t04 13 · t05 10.
- **Re-solves:** 7 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A triple fusion, coleorhiza, groundnut, banana (MCQ), apple (A-R) · B double fertilisation; (endosperm vs perisperm or true vs false fruit) · C endosperm types; (maize grain diagram or apomixis) · D double fertilisation and ploidy in parts.
- **Long:** A synergid entry, no wasted food, coconut water, helobial, black pepper, embryo stages, maize figure, strawberry, coir, citrus polyembryony (MCQ), perisperm, apomixis (A-R) · B grass embryo parts; albuminous vs non-albuminous; (mango pericarp or dispersal) · C dicot embryo diagram; coconut diagram; six-tissue ploidy; (bean seed or three special modes) · D significance of seeds; (embryo comparison or apomixis and hybrid seed).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 21 maths strings parse; 16 SVG uses / 8 distinct diagrams pass the allow-list; narration clean; 7/7 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Bank size and competency.** The first build had 57 questions at 44 % application or higher. Four application items were added (a seed with fleshy cotyledons, the coleoptile at germination, cashew as a false fruit, 24 gametes for 12 seeds), giving 61 at 48 %.
2. **Word limits.** Three model answers were below their word limits and were expanded.
3. **Escaping.** A `\times` in an inserted solution had become a tab character; it was restored and the file checked for tabs.
4. **Diagrams after rasterising.** The bean seed's radicle label was moved to the left so its leader line no longer crosses the cotyledon.

## Facts a reviewer should double-check
- Examples of endosperm types (Petunia and Datura for cellular; Asphodelus for helobial) follow standard ISC references; the textbook names only coconut for nuclear endosperm.
- The lupine (about 10,000 years) and date palm (about 2,000 years) seed records follow the textbook.
