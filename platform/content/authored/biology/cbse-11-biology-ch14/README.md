# CBSE Class 11 Biology, Chapter 14 — Breathing and Exchange of Gases

`cbse-11-biology-ch14` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 16 slides), notes (4 sections, 2 display formulas), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch14_short` (20 marks, 40 min) and `t_cbse11bio_ch14_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (respiratory volumes and capacities for the low and high textbook ranges, minute ventilation, partial-pressure table and gradients, pO₂ of air from 760 × 20.9 percent, oxygen-dissociation model, delivered gas volumes, every worked number — each asserted with `check`), `svgs.mjs` (respiratory system with a lettered twin, alveolus and capillary, breathing mechanism, spirogram and dissociation curve computed from `calc.mjs`), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch14/src/build.mjs` (deterministic; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04) are covered. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth: respiratory organs of sponges to mammals; the human tract (nostrils to alveoli, fifth thoracic vertebra, incomplete cartilaginous rings, epiglottis, double pleura); conducting and exchange parts; the air-tight thoracic chamber; the five steps of respiration; inspiration and expiration (diaphragm and external intercostals, antero-posterior and dorso-ventral axes, intra-pulmonary pressure); TV, IRV, ERV, RV and IC, EC, FRC, VC, TLC; partial pressures and the diffusion membrane; oxygen transport (97 and 3 percent, four O₂ per haemoglobin, sigmoid dissociation curve) and carbon dioxide transport (20–25, 70 and 7 percent, carbonic anhydrase); the rhythm centre, pneumotaxic centre, chemosensitive area and aortic and carotid receptors; asthma, emphysema and occupational disorders.

## Shape
- **Part 1 (t01, t02), 18 slides:** respiratory organs; the tract; conducting versus exchange part; thoracic chamber and pleura; five steps; mechanism of breathing; volumes and capacities; two worked examples (capacities from readings; minute ventilation); summary; exam tips; 4 checks.
- **Part 2 (t03, t04), 16 slides:** exchange at the alveolus; partial-pressure table; worked example (gradients); oxygen and carbon dioxide transport; dissociation curve; worked example (5000 mL of blood delivers 250 mL O₂ and 200 mL CO₂); regulation; disorders; summary; exam tips; 4 checks.
- **Visuals (24 of 34 slides; no gap longer than one slide):** table 14, flow 4, svg 5, chem 1.
- **Diagrams (6 SVGs):** respiratory system, lettered respiratory system (A–E, used by two questions), alveolus and diffusion membrane, inspiration versus expiration, spirogram, oxygen dissociation curve. Every SVG was rasterised and checked by eye.
- **Narration:** 7–57 words (mean 35).

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 5 | 1 (keys a c d b c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 8 | 1 (3300; 4100; 5350; 7500; 3000 mL; 300 mL; 159 mm Hg; 140 mL) |
| short | 8 + 7 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 19 · d2 33 · d3 18 · d4 2 (evaluating a granite-workshop owner’s “no masks needed” argument; inspiratory reserve volume from total lung capacity, FRC and tidal volume).
- **Competency:** recall 14 · understanding 21 · application 34 · analysis 2 · evaluation 1. Application or higher is **51% of items (51% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 18 · t02 24 · t03 27 · t04 7.
- **Cases:** a spirometer practical (residual volume not measurable, VC 4700, IC 3600 and FRC 2300, or TLC 5900); a partial-pressure table (highest pO₂, 55 mm Hg, directions of CO₂ diffusion or why a gradient of 5 is enough); a PE-class run (chemosensitive area, 45000 mL per minute, oxyhaemoglobin release or the pneumotaxic centre); a granite quarry (occupational disorder, 15 percent, dust and masks or emphysema in a smoker).
- **Diagram items:** `fig-trachea-mcq` and `fig-diaphragm-mcq` use the lettered respiratory-system figure (A epiglottis, B larynx, C trachea, D primary bronchus, E diaphragm).
- **Deck checks:** epiglottis, pleura A-R, axis of intercostals, FRC (Part 1); solubility A-R, oxygen in plasma, rhythm centre, emphysema (Part 2) — all objective.
- **Re-solves:** 12 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A insect tracheae, singer’s inspiration, carbonic anhydrase inhibitor (MCQ), pneumotaxic centre (A-R) · B asthma versus emphysema (2), carbon dioxide clearance despite a small gradient (2), oxygen dissociation curve (3) · C structure of the respiratory system or the granite-workshop evaluation · D spirometer case.
- **Long:** A earthworm, bifurcation of the trachea, frog, spirometer, CO₂ gradient, carbamino-haemoglobin, diffusion-membrane layers, lettered trachea figure (MCQ), oxygen share, diaphragm (A-R) · B oxygen transport, conducting versus exchange part, (pleural air leak or diaphragm paralysis), capacities as sums, (bicarbonate or dust-particle pathway) · C mechanism of breathing + (transport of gases or regulation after stair climbing) · D exercise case, quarry case.

## Validation
- Author validator (in the build): 40 maths strings parse; 12 SVG uses / 6 distinct diagrams pass the allow-list; narration clean; 12/12 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: `stemdup` reports no duplicate stems; `verify --authored` shows 72/72 pass, 0 blocking and 0 minor flags; `originality --authored` shows 0 errors for this unit.

## Review pass (2026-11-01)
A previous writer left calc, svgs, decks, study and questions; this pass added `build.mjs` and:
1. Re-read every deck, note and answer against the syllabus topics (no Transport in Plants or Mineral Nutrition content).
2. Added a lettered (A–E) twin of the respiratory-system diagram and two MCQs that use it (the earlier bank had no diagram-based item).
3. Shortened the key of the chemosensitive-area MCQ so that it is not visibly longer than the distractors.
4. Rasterised all six SVGs and checked labels and leaders; no overlap or clipping remains.

## For a reviewer
- Volumes are the textbook’s typical adult ranges (TV about 500, IRV 2500–3000, ERV 1000–1100, RV 1100–1200 mL); the spirogram uses the upper values, and the notes state that values vary with age, sex and fitness.
- The oxygen dissociation curve is a Hill-type model (P50 26.8 mm Hg, n 2.7; right-shifted P50 36); the saturation values 97, 75 and 57 percent are illustrative and are labelled so in the deck, notes and diagram.
- The textbook’s 5 mL of O₂ and 4 mL of CO₂ per 100 mL of blood are quoted as “about”; the 5000 and 6000 mL blood flows, PE-class breathing rates and the quarry survey are illustrative.
- pO₂ of air = 760 × 20.9 percent = 158.84, rounded to the textbook’s 159 mm Hg; the item accepts a tolerance of 0.5.
- Receptors “associated with the aortic arch and the carotid artery” and the statement that the role of oxygen in regulation is “quite insignificant” follow the textbook.
- Diagrams are neutral front-view schematics, not to scale; the person’s right lung is drawn on the viewer’s left.
