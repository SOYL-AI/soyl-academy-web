# CBSE Class 11 Biology, Chapter 16 — Excretory Products and their Elimination

`cbse-11-biology-ch16` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (3 sections, 1 display formula), 31 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch16_short` (20 marks, 40 min) and `t_cbse11bio_ch16_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (textbook kidney values; filtrate per day from GFR, percentage reabsorbed, PCT litres, concentration factor, renal share of cardiac output, osmolarity levels for the diagram, case values — each asserted with `check`), `svgs.mjs` (urinary system, kidney L.S., nephron with blood vessels, counter-current mechanism with the 300–1200 gradient), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch16/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered; the chapter has no removed topics in the 2026-27 syllabus. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth: ammonia, urea and uric acid; ammonotelism (bony fishes, aquatic amphibians, aquatic insects; diffusion across body surface and gills), ureotelism (mammals, terrestrial amphibians, marine fishes; urea made in the liver), uricotelism (reptiles, birds, land snails, insects; pellet or paste); protonephridia (Planaria, rotifers, some annelids, Amphioxus), nephridia, Malpighian tubules, antennal glands; human excretory system; kidney position, size and mass, hilum, pelvis, calyces, capsule, cortex, medulla, medullary pyramids, columns of Bertini; nephron (glomerulus, afferent and efferent arterioles, Bowman’s capsule, Malpighian body, PCT, Henle’s loop, DCT, collecting duct), cortical and juxtamedullary nephrons, peritubular capillaries, vasa recta; ultrafiltration through three layers (podocytes, filtration slits), renal blood flow 1100–1200 mL per minute, GFR 125 mL per minute and 180 L per day; JGA and renin; nearly 99 percent reabsorbed (active and passive); tubular secretion; roles of the PCT (70–80 percent), the two limbs of Henle’s loop, the DCT and the collecting duct; the counter-current mechanism (300 to 1200 mOsmol per L, NaCl and urea, nearly four times concentrated urine); ADH, renin–angiotensin–aldosterone and ANF; micturition reflex; urine (1–1.5 L, pH about 6, 25–30 g urea, glycosuria and ketonuria); lungs, liver, sweat and sebaceous glands, saliva; uraemia, kidney failure, haemodialysis, kidney transplantation, renal calculi, glomerulonephritis.

## Shape
- **Part 1 (t01, filtration from t02), 16 slides:** wastes and modes; excretory structures in animals; urinary system; kidney in numbers; kidney L.S.; nephron; cortical and juxtamedullary nephrons; worked example (matching four animals to their wastes); glomerular filtration; worked example (125 × 1440 = 180000 mL = 180 L; 1100/5000 = 22 percent, computed); summary; exam tips; 3 checks.
- **Part 2 (t02–t03), 17 slides:** reabsorption and secretion; segment roles; worked example (180 − 1.5 = 178.5 L, ≈ 99.17 percent; PCT 126–144 L, computed); counter-current diagram; worked example (1200/300 = 4, computed); ADH; renin–angiotensin and ANF; micturition; other organs; disorders and dialysis; summary; exam tips; 4 checks.
- **Visuals (24 of 33 slides; no gap longer than one slide):** table 12, flow 6, svg 6 (plus notes visuals).
- **Diagrams (4 SVGs, 10 uses across decks and notes):** human excretory system (front view), longitudinal section of a kidney, nephron with its blood vessels across cortex and medulla, counter-current mechanism with the osmolarity gradient and water, NaCl and urea movements. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 8–65 words (mean 39).

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 6 | 1 (keys a b a c d b) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 7 | 1 (144 L; 99.44 %; 126 L; 4 times; 22 %; 20 g per L; 12 L) |
| short | 6 + 7 | 2 / 3 |
| long | 6 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 19 short/long items.
- **Difficulty:** d1 27 · d2 31 · d3 13 · d4 1 (comparing ADH, renin–angiotensin–aldosterone and ANF and predicting responses to sweating and a rapid drip).
- **Competency:** recall 14 · understanding 22 · application 32 · analysis 4. Application or higher is **50% of items (57% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 24 · t02 31 · t03 19.
- **Cases:** tadpole, frog and pigeon (ammonotelism, liver, habitat or uric acid paste); a GFR clinic (glomerulonephritis, 90 mL per minute → 129.6 L per day, JGA response or ultrafiltration); a runner on a hot day (ADH from the neurohypophysis, 99.67 percent reabsorbed, medullary gradient or aldosterone); a dialysis patient (uraemia, 66.7 percent urea removed, dialysing-fluid composition or transplant from a relative).
- **Deck checks:** least toxic waste, columns of Bertini, GFR (Part 1); descending limb, gradient A-R, hiker and ADH, dialysis principle (Part 2) — all objective.
- **Re-solves:** 10 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A hilum, Bowman’s capsule fluid, micturition (MCQ), ammonotelic animals (A-R) · B kidney L.S. (2), ultrafiltration (2), PCT, loop and DCT (3) · C excretory system and nephron or urine formation · D GFR-clinic case.
- **Long:** A bony fish, desert lizard, juxtamedullary nephron, renin, ANF after a drip, glycosuria, transplant donor, liver (MCQ), descending limb, sweat (A-R) · B habitat and wastes, JGA, (renin–angiotensin after blood loss or micturition reflex), three modes compared, (counter-current or haemodialysis steps) · C counter-current with prediction + (comparing the three regulators or kidney failure and its treatment) · D tadpole–frog–pigeon case, hot-day runner case.

## Validation
- Author validator (in the build): 26 maths strings parse; 10 SVG uses / 4 distinct diagrams pass the allow-list; narration clean; 10/10 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: no exact duplicate stems against this worktree or the main checkout (which holds ICSE 10 Biology); no near-duplicate stems (word 5-gram Jaccard ≥ 0.5) against either.
- `verify --authored` and `originality --authored` are run by the producer for the whole subject.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Answer-length cues.** In eight MCQs (juxtamedullary nephron, ascending limb, desert rodent, hiker and ADH, efferent arteriole, dialysis principle, heparin, transplant donor) the key was much longer than the distractors; distractors were rewritten to similar length.
2. **Diagrams after rasterising.** The bean-shaped kidney outline was redrawn (it first rendered as a crescent, and both kidneys faced the same way); renal vessels are now drawn behind the aorta and vena cava so the right renal artery reaches the aorta and the left renal vein the vena cava; the kidney section was moved right so the left-hand labels clear the outline; the cortex and medulla captions of the nephron were moved clear of the collecting duct.
3. **Word limit.** One long answer had a non-standard limit of 80–260 words; it now uses the chapter’s 80–240 like the other long items.

## For a reviewer
- Kidney size and mass, nephron number, renal blood flow, GFR, the 99 percent figure, PCT 70–80 percent, urine 1–1.5 L, pH 6.0, urea 25–30 g and lungs’ 200 mL of carbon dioxide per minute are the textbook’s typical values; real values vary with body size, diet and water intake, as the notes say.
- Renal blood flow is taken as 1100 mL of a 5000 mL cardiac output (22 percent) to illustrate “roughly one-fifth”.
- The filtrate’s osmolarity is taken as about 300 mOsmol per L (that of plasma and the cortex) for the “nearly four times” calculation; the textbook gives the 300 and 1200 values for the interstitium.
- The osmolarity levels 600 and 900 in the counter-current diagram are drawn as an even sketch between the textbook’s 300 and 1200.
- The tadpole-to-frog switch from ammonia to urea follows the textbook’s grouping of aquatic amphibians as ammonotelic and terrestrial amphibians as ureotelic.
- The desert-rodent and “NaCl not transported out of the ascending limb” items extend textbook ideas; check they read as intended for Class 11.
- Clinic, runner, dialysis (150 → 50 mg urea per 100 mL) and other case figures are illustrative.
