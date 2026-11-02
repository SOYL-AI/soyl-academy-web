# CBSE Class 11 Biology, Chapter 20 — Digestion and Absorption

`cbse-11-biology-ch20` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 17 slides), notes (6 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch20_short` (20 marks, 40 min) and `t_cbse11bio_ch20_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (dental formula → 8 per half jaw, 32 teeth, 12 molars, 37.5 %; 28 teeth after wisdom-tooth removal; snack energy with physiological and gross values and in kJ; fat equivalent; starch hydrolysed in the mouth; hydrogen-ion folds from pH; liver share of body mass; surface-area factor; malnutrition survey; every value asserted), `svgs.mjs` (alimentary canal with glands, dental arch computed from the formula, gut wall section, duct system, villus), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch20/src/build.mjs` (deterministic; `CH_OUT=<dir>` writes a trial build elsewhere; `--dump <file>` writes a readable bank dump). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- **Formative assessment only.** In the 2026-27 CBSE syllabus this chapter is reading material assessed only in school (formative) assessment (`board_assessed: false` in `syllabus.yaml`). It is authored in full anyway, in the CBSE school-test pattern; the first slide, the notes and the exam tips say so.
- Both syllabus topics are covered: t01 alimentary canal, digestive glands and enzymes (with digestion and absorption), t02 nutritional and digestive disorders.
- Depth (NCERT): buccal cavity, thecodont, diphyodont and heterodont teeth, 2123/2123, enamel, tongue, frenulum, papillae; pharynx, epiglottis; oesophagus, gastro-oesophageal sphincter; stomach regions, pyloric sphincter; duodenum, jejunum, ileum; caecum, vermiform appendix, four parts of the colon, rectum, anus; serosa, muscularis, sub-mucosa, mucosa, rugae, villi, microvilli, lacteals, goblet cells, crypts; three pairs of salivary glands; liver (1.2–1.5 kg, two lobes, hepatic lobules, Glisson’s capsule), bile, gall bladder, cystic, hepatic and common bile ducts, hepato-pancreatic duct, sphincter of Oddi; pancreas; mastication, bolus, deglutition, peristalsis; saliva (electrolytes, amylase at pH 6.8 digesting about 30 % of starch, lysozyme); gastric glands (mucus neck, chief and parietal cells, intrinsic factor), chyme, 4–5 hours, pepsin at pH 1.8, rennin; bile, pancreatic juice, enterokinase, succus entericus, pH 7.8, Brunner’s glands; enzyme reactions; neural and hormonal control; absorption by diffusion, facilitated transport, osmosis and active transport; micelles, chylomicrons, lacteals; sites of absorption; assimilation, ileo-caecal valve, defaecation; calorific values; PEM (kwashiorkor, marasmus); jaundice, vomiting, diarrhoea, constipation, indigestion, intestinal infections.

## Shape
- **Part 1 (t01), 18 slides:** what digestion must achieve; alimentary canal; teeth and tongue; dental formula; worked example (2 + 1 + 2 + 3 = 8, 8 × 4 = 32 teeth; 12 molars = 37.5 %, computed); pharynx, oesophagus and stomach; intestines; gut wall; villi; digestive glands; duct system; worked example (1.5/60 = 2.5 % liver; 3 × 10 × 20 = 600 surface, computed); summary; exam tips. Checks: thecodont, microvilli, bile.
- **Part 2 (t01, t02), 17 slides:** digestion in the mouth; worked example (15 g of 50 g starch hydrolysed, 35 g left; saliva to stomach 10^5 times more hydrogen ions, computed); stomach; small intestine; absorption mechanisms; fat absorption; sites, assimilation and egestion; worked example (snack 390 kcal physiological, 425.25 kcal gross, about 1632 kJ, computed); digestive disorders; PEM; summary; exam tips. Checks: lysozyme, fat absorption, small-intestine A-R, marasmus.
- **Visuals (26 of 35 slides; no gap longer than one slide):** table 18, flow 3, svg 5.
- **Diagrams (5 SVGs, 10 uses across decks and notes):** alimentary canal with salivary glands, liver, gall bladder and pancreas; one jaw with teeth coloured by type and the dental formula (positions computed from the formula); transverse section of the gut wall; liver, gall bladder, pancreas and their ducts to the sphincter of Oddi; a villus with brush border, capillaries, lacteal, goblet cells and crypts, with an inset cell. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 6–52 words (mean 36).

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 5 | 1 (keys a b c d a) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (32 teeth; 390 kcal; 425.25 kcal; 1000000 times; 15 g starch; 600 times) |
| short | 8 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 19 short/long items and parts.
- **Difficulty:** d1 14 · d2 34 · d3 17 · d4 2 (hydrogen-ion fold between stomach and intestine; evaluating a blogger’s claim about the small intestine).
- **Competency:** recall 15 · understanding 18 · application 31 · analysis 2 · evaluation 1. Application or higher is **51% of items (52% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 53 · t02 16 (some items carry both).
- **Cases:** a dental chart without wisdom teeth (heterodont, 28 teeth, diphyodont and thecodont or molar share 37.5 %); a school snack (fat, 1632 kJ, gross versus physiological or starch digestion); a stone in the common bile duct (bile pigments, fats, emulsification or the duct path); a malnutrition survey (kwashiorkor, 12 %, marasmus versus kwashiorkor or feeding advice).
- **Re-solves:** 9 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A epiglottis, vitamin B12 and intrinsic factor, lactase (MCQ), fat absorption (A-R) · B heterodont and formula (2), gastric gland cells (2), gut wall layers (3) · C alimentary canal or digestion of food · D malnutrition case.
- **Long:** A diphyodont, dental formula, sub-mucosa, hepato-pancreatic block, rennin, enterokinase, colon and water, kwashiorkor (MCQ), stomach mucus, large intestine (A-R) · B swallowing, trypsin activation, (gall bladder removal or large intestine), chewing bread, (absorption mechanisms or fat path) · C digestive glands + (absorption or evaluating a claim) · D bile-duct stone case, dental chart case.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem against the key, solution and marking scheme. Fixes made:
1. **Diagrams after rasterising.** The dental legend was clipped at the right edge and was moved and shortened; the stomach was redrawn as a fuller J-shaped bag; the stomach and liver labels in the duct diagram were moved off the organs and the common bile duct label off the duct; the villus inset caption no longer collides with the lacteal label, the lacteal was made translucent, stray microvilli marks above the villus tip were removed, and the mucosa and villi leaders in the wall section no longer cross.
2. **Rounding helper.** The kJ conversion in the snack case uses the shared `round` from `calc.mjs` instead of a local helper.

## For a reviewer
- The chapter is formative-assessment reading material in the 2026-27 CBSE syllabus; its content follows the NCERT chapter as last printed in full (pre-rationalisation), so check any details that the current reading material drops.
- Calorific values (gross 4.1, 5.65, 9.45 kcal per g; physiological 4, 4, 9 kcal per g) and the PEM descriptions (kwashiorkor, marasmus) come from the older NCERT text; 1 kcal = 4.184 kJ.
- The reason given for physiological values being lower than gross values (incomplete digestion and absorption; protein nitrogen lost as urea) is our explanation, not NCERT wording.
- pH values (saliva 6.8, stomach 1.8, intestine 7.8), about 30 % of starch digested in the mouth, 4–5 hours in the stomach and liver mass 1.2–1.5 kg are NCERT figures; the hydrogen-ion folds (10^5, 10^6) are computed from them.
- The surface model (3 × 10 × 20 = 600), the 60 kg body with a 1.5 kg liver, the 50 g starch meal, the snack composition and the survey (18 + 12 of 250) are illustrative and labelled so.
- Beyond the NCERT text but standard: releasing trypsinogen in inactive form protects the pancreas; bilirubin comes from haemoglobin breakdown; a blocked bile duct gives pale stools; wisdom teeth are the third molars; talking while swallowing can let food into the windpipe.
- Brunner’s glands are named as sub-mucosal glands of the duodenum, as NCERT does.
