# CBSE Class 12 Biology, Chapter 8 — Microbes in Human Welfare

`cbse-12-biology-ch08` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (13 + 14 + 12 slides), notes (5 sections), 32 flashcards, 61 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch08_short` (20 marks, 40 min) and `t_cbse12bio_ch08_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (percentage changes, oxygen demand, model BOD stages), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch08/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered; the chapter has no removed topics in the 2026-27 syllabus.
- Class 12 depth: curd (LAB, vitamin B₁₂), idli/dosa and bread fermentation, toddy, Swiss and Roquefort cheese; beverages with and without distillation; penicillin (Fleming, Chain and Florey); citric, acetic, butyric and lactic acids and ethanol with their microbes; lipases, pectinases and proteases; streptokinase, cyclosporin A and statins; primary and secondary sewage treatment, flocs, BOD, activated sludge, anaerobic digesters, Ganga and Yamuna Action Plans; biogas, methanogens, rumen, biogas plants (IARI, KVIC); ladybirds, dragonflies, Bt, Trichoderma, baculoviruses and IPM; Rhizobium, Azotobacter, Azospirillum, mycorrhiza (Glomus), cyanobacteria; judicious use of antibiotics.
- Beverages are treated only as an industrial fermentation process, with a note that alcohol is harmful to health.

## Shape
- **Part 1 (t01), 13 slides:** household products; worked example (dough with and without yeast, warm and cold); beverages; penicillin; acids and enzymes; bioactive molecules; worked example (matching needs to products); summary; exam tips.
- **Part 2 (t02), 14 slides:** STP flow; primary treatment; secondary treatment; BOD (computed chart); worked example (BOD 300 → 200 → 30: 33.3 percent and 90 percent falls; 300 g vs 30 g of oxygen per 1000 L); sludge digestion and river action plans; biogas plant; worked example (dung cakes vs biogas); summary; exam tips.
- **Part 3 (t03), 12 slides:** biocontrol agents; narrow vs broad spectrum; worked example (8 → 3 sprays, 62.5 percent fewer); biofertilisers; worked example (2.5 → 3.0 t/ha, 20 percent, with a control-plot caution); judicious use of antibiotics; summary; exam tips.
- **Visuals (27 of 39 slides; no gap longer than two slides):** table 19, flow 5, svg 3.
- **Diagrams (3 SVGs, 6 uses across decks and notes):** sewage treatment plant flow, BOD bar chart (computed), biogas plant. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 6–61 words (mean 39).

## Question bank (61)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 6 | 1 (keys a b a a a c) |
| true-false | 3 | 1 |
| fill-blank | 1 | 1 |
| match | 1 | 2 |
| numerical | 4 | 1 (90% BOD fall; 20 g oxygen; 60% fewer sprays; 30% yield rise) |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 16 short/long items.
- **Difficulty:** d1 8 · d2 33 · d3 19 · d4 1.
- **Competency:** recall 11 · understanding 17 · application 27 · analysis 5 · evaluation 1. Application or higher is **54% of items (54% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 23 · t02 18 · t03 21.
- **Cases:** BOD at three points of an STP (secondary removes more, 90 percent, why or raw sewage in a river); chickpea plots with Rhizobium vs urea (nodules, 30 percent, evaluation or testing mycorrhiza); antibiotic discs with clear zones (choice, 14 mm, resistance or Fleming); curd setting at three temperatures (inoculum, 3 hours, temperature or nutrition).
- **Deck checks:** curd bacteria, citric acid, Fleming A-R (Part 1); BOD meaning, dung A-R, activated sludge (Part 2); Bt, mycorrhiza A-R, antibiotic course (Part 3) — all objective.
- **Re-solves:** 7 scripted checks recompute the numerical keys.

## Chapter tests (default blueprints)
- **Short:** A idli batter, cloudy juice, paddy biofertiliser (MCQ), statins (A-R) · B curd, methanogens (2 marks), secondary treatment (3 marks) · C microbes in household and industry or biocontrol and biofertilisers · D BOD case.
- **Long:** A Swiss cheese, oily stains, transplant drug, polluted river, returned sludge, aphids, baculoviruses, antibiotics for a cold (MCQ), primary treatment, baculovirus spectrum (A-R) · B BOD, streptokinase and statins, (Bt or resistance), village biogas plant, (penicillin or biofertilisers) · C sewage treatment + (organic-farming evaluation or judicious antibiotic use) · D field-trial case, antibiotic-disc case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 18 maths strings parse; 6 SVG uses / 3 distinct diagrams pass the allow-list; narration clean; 7/7 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings; `verify` 61/61, 0 flags.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Bank size.** The first build had 57 questions; four application items were added (warm vs cold dough, vinegar, spent slurry, a free-living nitrogen fixer for wheat).
2. **Word limit.** The three-product industry answer was expanded to the 3-mark limit.
3. **Diagrams after rasterising.** The BOD chart was rescaled so its title clears the tallest bar; biogas labels moved inside the canvas.

## Facts a reviewer should double-check
- BOD values in the chart, cases and examples are a labelled model of a treatment plant, not measured data.
- Yields and spray counts in examples and cases are illustrative SOYL data.
