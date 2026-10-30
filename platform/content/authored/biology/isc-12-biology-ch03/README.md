# ISC Class 12 Biology, Chapter 3 — Human Reproduction

`isc-12-biology-ch03` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (14 + 15 + 14 slides), notes (6 sections), 33 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch03_short` (20 marks, 50 min) and `t_isc12bio_ch03_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (sperms and ova per meiocyte, tubule ranges, semen thresholds, sex probabilities), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs` (generated from a small spec by `soyl-wt/isc12-genbuild.cjs`; the file itself is the source of truth); the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch03/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All seven ISC syllabus topics (t01–t07): male system and T.S. of seminiferous tubule; female system and T.S. of ovary; spermatogenesis **with spermiogenesis and spermiation**, oogenesis with meiotic arrests, **hormonal control (GnRH, LH, FSH, androgens)**, sperm and ovum; menstrual cycle with hormones, menarche, menopause, **oestrous versus menstrual cycle**; **physico-chemical events of fertilisation** (capacitation, acrosomal reaction, block to polyspermy), cleavage, blastocyst, implantation; milestones and placental functions; parturition and lactation. The syllabus removes "structure and types of placenta", so placental types are not taught or tested.
- Reproductive content is neutral, factual and age-appropriate; the deck and notes state that the father’s sperm decides the baby’s sex (and that blaming the mother is wrong), and that the hymen is not a reliable indicator of sexual experience.

## Shape
- **Part 1 (t01–t02), 14 slides:** male system; ducts and glands; testis microstructure; worked example (500–1500 tubules; 150 and 100 million sperms, computed); female system; organs; ovary microstructure; worked example (path of a sperm to the ampulla); summary; exam tips.
- **Part 2 (t03–t04), 15 slides:** spermatogenesis; sperm; hormonal control; oogenesis; worked example (50 primary spermatocytes → 200 sperms; 50 primary oocytes → 50 ova; n = 23, computed); menstrual cycle; hormones and phases; worked example (reading a cycle); oestrous vs menstrual; summary; exam tips.
- **Part 3 (t05–t07), 14 slides:** fertilisation pathway; physico-chemical events; sex of the baby; cleavage, blastocyst, implantation; worked example (ordering six events with sites); placenta; milestones; parturition and lactation; worked example (colostrum); summary; exam tips.
- **Visuals (31 of 43 slides; no gap longer than two slides):** table 16, svg 8, flow 7.
- **Diagrams (9 SVGs, 17 uses):** male and female systems, T.S. of seminiferous tubule, sperm, ovary with follicles, 28-day hormone and endometrium chart, ovulation-to-implantation path, blastocyst (copied from CBSE 12 Biology ch02, same author), and a new lettered sperm (A–D) for diagram questions. Every SVG was rasterised and checked by eye.
- **Narration:** 7–49 words (mean 31).

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 (keys a 8, b 8, c 8, d 7), 1 diagram-based on the lettered sperm |
| assertion-reason | 5 | 1 (ISC options; keys a c d b a) |
| short, 1 mark | 3 | give-a-reason (2), analogy (1) |
| fill-blank | 1 | 1 |
| numerical | 6 | 1 (1500 tubules; 180 million; 120 sperms; 30 ova; 23 chromosomes; 0.125) |
| short | 9 + 8 | 2 / 3, including labelled diagrams of the tubule, female system and sperm, and a hormone-chart interpretation |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 14 · d2 38 · d3 15 · d4 2.
- **Competency:** recall 14 · understanding 21 · application 30 · analysis 4. Application or higher is **49% of items (53% of marks)**.
- **Topic tags:** t01 11 · t02 8 · t03 19 · t04 11 · t05 10 · t06 9 · t07 5.
- **Re-solves:** 7 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A Leydig cells, ampulla, spermiation, LH surge (MCQ), scrotum (A-R) · B accessory glands; (ovary microstructure or blocked oviducts) · C hormonal control of spermatogenesis; (tubule diagram or female system diagram) · D gametogenesis in parts.
- **Long:** A Sertoli cells, fructose, myometrium, FSH deficiency, sperm figure, progesterone fall, cow’s cycle, polyspermy, hCG test, colostrum (MCQ), meiosis II, oxytocin (A-R) · B sperm diagram; phases of the cycle; (implantation or sex determination) · C spermatogenesis vs oogenesis; fertilisation events; placenta; (hormone chart or milestones) · D menstrual cycle in parts; (pregnancy hormones and parturition or ovulation to implantation).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 16 maths strings parse; 17 SVG uses / 9 distinct diagrams pass the allow-list; narration clean; 7/7 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Difficulty and competency.** The first build had no difficulty-4 item and 46 % application or higher; the hormone-chart question and the meiosis-II assertion-reason were raised to difficulty 4, and two items were re-pitched as scenarios (stem cells from the blastocyst; sperms with a damaged acrosome), giving 49 %.
2. **Flow chart.** The parturition flow had a loop back to oxytocin; the positive feedback is now stated in a node, so the flow has no cycle.

## Facts a reviewer should double-check
- Semen thresholds (200–300 million; 60 percent normal shape; 40 percent vigorous motility) and the timings of milestones follow the standard textbook account.
- Capacitation and the cortical reaction are named as in common ISC references; the NCERT text describes the block to polyspermy without naming it.
