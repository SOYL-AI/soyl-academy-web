# CBSE Class 12 Biology, Chapter 2 — Human Reproduction

`cbse-12-biology-ch02` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (17 + 19 + 18 slides), notes (7 sections), 32 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch02_short` (20 marks, 40 min) and `t_cbse12bio_ch02_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (counting rules), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch02/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five syllabus topics (t01–t05) are covered; the chapter has no removed topics in the 2026-27 syllabus.
- Class 12 depth: male system (testis structure, Sertoli and Leydig cells, duct sequence, accessory glands, seminal plasma), female system (ovary, oviduct parts, uterine wall layers, birth canal, mammary glands), spermatogenesis with GnRH/LH/FSH control, sperm structure and fertility criteria, oogenesis and follicle stages, menstrual cycle phases and hormones, fertilisation and the block to other sperms, sex determination, cleavage, morula, blastocyst, implantation, placenta and pregnancy hormones, germ layers and stem cells, foetal milestones, parturition (foetal ejection reflex, oxytocin feedback) and lactation (colostrum).
- **Treatment of reproductive content:** neutral, factual, age-appropriate language throughout; diagrams are schematic front views labelled with the syllabus terms (captions say "schematic, not to scale"); insemination is described only as the transfer of sperms into the female tract. The hymen is mentioned once, factually, with the statement that it is not a reliable indicator of anything. Social points are stated plainly: the father's sperm decides the baby's sex, blaming mothers is wrong, and sex selection is illegal in India; missed periods can have causes other than pregnancy; menstrual hygiene is mentioned in the notes.

## Shape
- **Part 1 (t01), 17 slides:** six events of reproduction; male system; inside the testis; worked example (250 lobules × 1–3 tubules → 250–750 per testis, 500–1500 for two); duct system; accessory glands and semen; female system; ovaries and oviducts; uterine wall; worked example (where each event happens); external genitalia and mammary glands; summary; exam tips.
- **Part 2 (t02–t03), 19 slides:** seminiferous tubule; spermatogenesis with chromosome numbers; GnRH, LH, FSH; sperm structure; worked example (50 primary spermatocytes → 100 → 200 → 200 sperms; 46 → 23); oogenesis before birth; follicles; unequal meiosis and ovulation of the secondary oocyte; spermatogenesis vs oogenesis; menstrual cycle phases; hormone curves; control of each phase; worked example (days 3, 10, 14, 22 of a 28-day cycle); summary; exam tips.
- **Part 3 (t04–t05), 18 slides:** fertilisation; sex determination; worked example (P(girl) = 1/2; P(two girls) = 1/4); oviduct to uterus; blastocyst and implantation; placenta; pregnancy hormones; germ layers and stem cells; foetal milestones; worked example (250 million sperms → at least 150 million normal, 100 million motile); parturition; lactation; summary; exam tips.
- **Visuals (42 of 54 slides; no gap longer than one slide):** table 21, flow 13, svg 8.
- **Diagrams (8 hand-written SVGs, 16 uses across decks and notes):** male system, female system (oviduct parts and uterine wall layers), seminiferous tubule section, sperm, ovary with follicle stages and corpus luteum, 28-day hormone curves with phases and endometrium (qualitative, captioned so), path from ovulation to implantation, blastocyst. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 9–65 words (mean 48), no symbols, formulae or abbreviations a TTS voice would spell out (no "XX"/"XY" in narration; the slides show them).

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 5 | 1 (keys d a a c a) |
| true-false | 3 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1 (1500 tubules; 480 sperms; 120 − 30 = 90 more gametes; ovulation on 16 March; 0.125 for three boys; 23 in the first polar body; 16 blastomeres; 182 million normal sperms) |
| short | 8 + 6 | 2 / 3 |
| long | 7 | 5 |
| case-based | 3 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 21 short/long items.
- **Difficulty:** d1 11 · d2 24 · d3 34 · d4 2 · d5 1.
- **Competency:** recall 18 · understanding 20 · application 28 · analysis 5 · evaluation 1. Application or higher is **47% of items (45% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 16 · t02 20 · t03 15 · t04 15 · t05 9.
- **Cases:** relative LH, FSH, estrogen and progesterone on five days of one cycle (ovulation day, corpus luteum, fall of progesterone or the pregnancy alternative); three semen samples against the fertility criteria (99 million normal in sample B; motility defect or "why so many sperms" evaluation alternative); the first week of an embryo (morula, trophoblast, failed implantation or cleavage without growth).
- **Deck checks:** duct order, myometrium, alveoli (Part 1); secondary spermatocyte, oogonia, luteal A-R (Part 2); XY zygote, inner cell mass, oxytocin A-R (Part 3) — all objective.
- **Re-solves:** 9 scripted checks recompute every numerical key from the rules in `calc.mjs` (4 sperms but 1 ovum per meiocyte; 46 → 23; tubule ranges; percentages; independent 1/2 per birth).

## Chapter tests (default blueprints)
- **Short:** A undescended testis, ovulation of the secondary oocyte, colostrum (MCQ), oogenesis output (A-R) · B Sertoli vs Leydig, implantation (2 marks), spermatogenesis vs oogenesis (3 marks) · C spermatogenesis or oogenesis · D hormone-levels case.
- **Long:** A blocked vasa deferentia, missing fructose, LH receptor block, no acrosome, day 21, hCG test, zona pellucida block, relaxin (MCQ), Leydig location, sex determination (A-R) · B milk path, undescended testes, (follicle loss or missed period), XX/XY chart, (poor placenta or blocked oviducts) · C menstrual cycle + (insemination to implantation or the "three daughters" evaluation) · D semen case, embryo-week case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 25 maths strings (KaTeX strict + mhchem) parse; 16 SVG uses / 8 distinct diagrams pass the allow-list; narration clean; 9/9 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem; facts were checked against the syllabus scope. Fixes made:
1. **Competency honesty.** The first draft was 33% application or higher, below the 45–65 % band. Seven items were re-pitched into real scenarios (zona pellucida that fails to change, an oocyte that meets no sperm, a positive pregnancy test, a 24-week ultrasound report, a poorly working placenta, oxytocin-like medicine for slow labour, a missed period) and five application items were added (first polar body, four cleavage rounds, normal-sperm count, day-8 endometrium, ovaries removed). Final 47% (45% of marks).
2. **Diagrams after rasterising.** Oviduct labels (ampulla, isthmus) no longer cross; infundibulum and ovary labels separated; "Head" moved off the sperm-nucleus label; primary follicle moved clear of its label; fertilisation and uterus labels moved off the oviduct drawing.

## Facts a reviewer should double-check
- Foetal milestones (heart by month 1, limbs and digits by month 2, organ systems by 12 weeks, movements and head hair in month 5, eyelids and eyelashes by 24 weeks).
- Fertility criteria (at least 60% normal shape and size, at least 40% vigorous motility; 200–300 million sperms per ejaculate).
- Primary follicles left at puberty (about 60,000–80,000 per ovary).
