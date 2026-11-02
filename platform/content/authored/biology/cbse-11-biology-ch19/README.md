# CBSE Class 11 Biology, Chapter 19 — Chemical Coordination and Integration

`cbse-11-biology-ch19` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (7 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch19_short` (20 marks, 40 min) and `t_cbse11bio_ch19_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (pituitary hormone counts, iodine atoms removed in T4 → T3 and the iodine mass share of thyroxine, glucose mass in blood, glucose-curve model with peaks, three-hour values and percentage rises, half-life fraction, second-messenger amplification, islet tissue mass; every value asserted), `svgs.mjs` (endocrine map, hypothalamus–pituitary axis, mechanism of hormone action, glucose curves computed from `calc.mjs`), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch19/src/build.mjs` (deterministic; `CH_OUT=<dir>` writes a trial build elsewhere; `--dump <file>` writes a readable bank dump). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both syllabus topics are covered: t01 endocrine glands and hormones, t02 mechanism of hormone action and disorders. The chapter has no removed topics in the 2026-27 syllabus. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth (rationalised NCERT): hormones as non-nutrient intercellular messengers in trace amounts; hypothalamus (neurosecretory nuclei, releasing and inhibiting hormones, GnRH, somatostatin, portal system, direct neural control of the posterior lobe); pituitary (sella turcica; pars distalis GH, PRL, TSH, ACTH, LH, FSH; pars intermedia MSH, almost merged in humans; pars nervosa stores oxytocin and vasopressin; gigantism, dwarfism, acromegaly, diabetes insipidus); pineal melatonin; thyroid (lobes, isthmus, follicles, T4, T3, TCT; goitre, cretinism, hyperthyroidism, Graves’ disease); four parathyroids and PTH; thymus and thymosins; adrenal medulla (catecholamines, fight or flight) and cortex (three zones, glucocorticoids, mineralocorticoids, androgens; Addison’s disease); islets, glucagon, insulin, diabetes mellitus; testis and ovary hormones; ANF, erythropoietin, gastrin, secretin, CCK, GIP, growth factors; receptors, four chemical classes, second messengers, intracellular receptors and gene expression.

## Shape
- **Part 1 (t01), 18 slides:** endocrine glands; hypothalamus; hypothalamus–pituitary axis; anterior pituitary; pars intermedia and posterior pituitary; worked example (6 + 1 + 2 = 9 hormones, 7 made in the pituitary, computed); GH disorders; pineal and thyroid; worked example (25 percent of iodine removed in T4 → T3; 508/777 ≈ 65.4 percent iodine by mass, computed); parathyroid and thymus; summary; exam tips. Checks: hormone definition, oxytocin origin, goitre, vasopressin A-R.
- **Part 2 (t01, t02), 18 slides:** adrenal medulla; adrenal cortex; pancreas; glucose curves; worked example (5 L × 90 mg per dL = 4.5 g; peak rise ≈ 55.6 percent, computed); testis and ovary; heart, kidney and gut hormones; chemical classes and receptors; mechanism diagram; worked example (1 × 100 × 50 = 5000 products; 12.5 percent left after three half-lives, computed); disorders; summary; exam tips. Checks: adrenaline, ANF, receptor specificity, second messenger.
- **Visuals (26 of 36 slides; no gap longer than one slide):** table 20, flow 2, svg 4.
- **Diagrams (4 SVGs, 8 uses across decks and notes):** endocrine glands on a body outline; hypothalamus with portal system to the anterior lobe and neurosecretory axons to the posterior lobe; membrane-receptor versus intracellular-receptor pathways; blood glucose after a glucose drink (healthy and diabetic curves and the kidney threshold, computed). Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 8–59 words (mean 36); hormone symbols with digits are spoken as names (thyroxine, triiodothyronine).

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 5 | 1 (keys a b c d a) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (25 % iodine removed; 65.4 % iodine in thyroxine; 4.5 g glucose; 12.5 % after three half-lives; 5000 products; 1.35 g islet tissue) |
| short | 8 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 19 short/long items and parts.
- **Difficulty:** d1 7 · d2 38 · d3 20 · d4 2 (iodine mass share of thyroxine; evaluating a website’s claims about hormones).
- **Competency:** recall 11 · understanding 22 · application 28 · analysis 5 · evaluation 1. Application or higher is **51% of items (49% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 52 · t02 18 (some items carry both).
- **Cases:** glucose tolerance of two adults (insulin, 73.3 % rise, kidney threshold or insulin action); goitre survey in an iodine-poor village (24 %, cretinism or iodised salt); stage fright (adrenal medulla, piloerection, glycogenolysis or medulla versus cortex); a receptor experiment (adrenaline and estradiol, 5000 products, speed of action or receptor specificity).
- **Re-solves:** 9 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A somatostatin, Graves’ disease, secretin (MCQ), insulin (A-R) · B composite pancreas (2), ANF and erythropoietin (2), adrenal cortex zones and hormones (3) · C pituitary or mechanism of hormone action · D goitre-survey case.
- **Long:** A portal system, diabetes insipidus, acromegaly, PTH, thymus and age, glucagon, erythropoietin, steroid action (MCQ), adrenaline glucose, steroid second messenger (A-R) · B hypothalamic control, ADH, (thymus or glucagon versus cortisol), thyroid structure and functions, (emergency hormones or two kinds of diabetes) · C adrenal and pancreas + (thyroid and parathyroid or evaluating a hormone claim) · D glucose tolerance case, receptor experiment case.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem against the key, solution and marking scheme. Fixes made:
1. **Case table.** The three-hour glucose values are computed from the curve model in `calc.mjs` (rounded to the nearest 5) and asserted; the assertion caught a wrong hand estimate (95) for the healthy person, whose model value is about 90, so the table, curve and SVG now agree.
2. **Half-life item.** The stem was reworded (“released in a single burst, and no more is added”) so the conditions of the calculation are unambiguous.
3. **Diagrams after rasterising.** The parathyroid leader no longer runs through its label; the pars intermedia label was moved below the lobes; the receptor label was moved off the cell membrane; the “Healthy person” and kidney-threshold labels were moved clear of the curves.
4. **Unused value.** An illustrative calcium value that no item used was removed from `calc.mjs`.

## For a reviewer
- The NCERT definition of hormones (“non-nutrient chemicals … intercellular messengers … trace amounts”) is quoted in substance in several items.
- The count “9 hormones released, 7 made in the pituitary” is our framing of the NCERT list (6 + MSH + oxytocin and vasopressin).
- Thyroxine’s molar mass is rounded to 777 g per mol (776.9) and iodine to 127; the 65.4 % answer depends on these rounded values, which the stem gives.
- Blood glucose values (fasting 90 and 150, peaks 140 and 260 mg per dL), the kidney threshold (about 180 mg per dL), the 5 L blood volume, the 90 g pancreas, the 10-minute half-life and the 1 × 100 × 50 cascade are illustrative and labelled so; the kidney threshold and renal reabsorption limit go slightly beyond the NCERT text, which says only that glucose is lost in the urine.
- The calcium short answer says thyrocalcitonin lowers blood calcium (standard biology); NCERT says only that TCT “regulates blood calcium levels”.
- Exophthalmic goitre is attributed to hyperthyroidism, as NCERT does; NCERT’s causes of hyperthyroidism (cancer, nodules) are kept.
- Adrenal cortex zones are given from outside inwards (glomerulosa, fasciculata, reticularis); NCERT lists them inner to outer.
- Hormones of the heart, kidney and gut (ANF, erythropoietin, gastrin, secretin, CCK, GIP) are covered briefly as in the NCERT chapter; check that they are still in the 2026-27 rationalised text.
- The receptor experiment, stage-fright, village survey (96 of 400) and cortisol-cream scenarios are illustrative.
