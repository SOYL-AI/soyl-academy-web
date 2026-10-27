# CBSE Class 10 Science, Chapter 5 — Life Processes

`cbse-10-science-ch05` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (23 + 22 + 18 slides), notes (7 sections), 31 flashcards, 84 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch05_short` (20 marks, 40 min) and `t_cbse10sci_ch05_long` (40 marks, 90 min). The two tests share no questions. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All seven syllabus topics (t01–t07) are covered; no removed or `board_assessed: false` topics.
- Kept to Class 10 depth: no Krebs cycle or light/dark-reaction detail, no named nephron segments beyond glomerulus, Bowman's capsule, tubule and collecting duct; blood groups and named white-cell types are not taught.
- Enrichment used only as context (no question depends solely on it): desert plants' night-time carbon dioxide uptake (in the syllabus text, kept brief), dengue and platelets, filariasis and lymph, anaemia, kidney donation.
- Standard practicals (variegated leaf, potassium hydroxide jar, lime water and exhaled air, yeast fermentation, starch digestion by saliva) are described in fresh words with new contexts and data.

## Shape
- **Part 1 (t01–t03):** what life processes are and why large organisms need systems; autotrophs and heterotrophs; photosynthesis equation and three events; stomata; variegated-leaf and black-paper experiments; raw materials; saprophytic, parasitic and holozoic nutrition; Amoeba; the human alimentary canal, mouth and stomach, small intestine juices, villi; worked example tracing rice, dal and ghee.
- **Part 2 (t04–t05):** three pathways of glucose breakdown, aerobic vs anaerobic, ATP, idli batter and cramps; gas exchange in plants and fish; respiratory system, breathing mechanism, alveoli; blood; heart; double circulation; why four chambers; arteries, veins and capillaries; cardiac-output worked example; blood pressure; lymph.
- **Part 3 (t06–t07):** xylem and phloem; root pressure and transpiration pull; a transpiration experiment; translocation; urinary system; nephron; urine formation; reabsorption worked example (180 L → 1.5 L); haemodialysis; excretion in plants.
- Layouts: title 3, concept 26, diagram 12, example 6, check 10, summary 3, exam-tips 3.
- **Visuals in decks (50 of 63 slides):** table 23, flow 13, svg 12, chem 2. Notes add 12 SVGs (re-used), 2 tables and 2 flows.
- **Diagrams (12 hand-written SVG schematics):** open and closed stomata (guard cells with chloroplasts), variegated leaf before/after iodine, Amoeba feeding in three stages, human alimentary canal with glands, villus with capillaries and lacteal, respiratory system, alveoli with gas exchange inset, heart section (four chambers, numbered great vessels with a key, valves, flow arrows), artery/vein/capillary cross-sections, transport in a plant (xylem and phloem arrows, transpiration), urinary system, nephron (glomerulus, Bowman's capsule, tubule, capillaries, collecting duct, filtration and reabsorption). Named hues: red/blue for oxygenated/deoxygenated blood, green for chlorophyll and phloem, brown for liver and soil, yellow for urine and lymph — always with text labels too. The heart is drawn "as seen from the front", which the caption states.
- **Narration:** 20–80 words (mean 64), no symbols or formulae; contexts include Mumbai trains, croton leaves, idli batter, school sports day, health camps, Kerala coconut palms, sugarcane, babool gum.

## Question bank (84)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 (keys a 8, b 8, c 8, d 7) |
| assertion-reason | 10 | 1 (keys a 5, b 2, c 2, d 1) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 |
| match | 3 | 2 |
| numerical | 4 | 1, 1, 2, 2 (CO₂ per glucose, air per minute, blood pumped per minute, % filtrate reabsorbed) |
| short | 7 + 7 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` is set on 32 of 36 short/long items (prose answers).
- **Difficulty:** d1 13 · d2 29 · d3 35 · d4 6 · d5 1.
- **Competency:** recall 13 · understanding 30 · application 24 · analysis 16 · evaluation 1. Application or higher is **49% of items (56% of marks)**.
- **Topic tags:** t01 5 · t02 13 · t03 16 · t04 16 · t05 15 · t06 8 · t07 12.
- **Cases:** Hydrilla bubbles vs lamp distance (data, d4), starch + saliva at different temperatures (data, d4), yeast fermentation (lab), blood-pressure readings at a health camp (everyday), potometer under four conditions (data, d4), dialysis patient with diabetes (everyday, with an evaluation alternative).
- **Deck checks:** q002, q008, q020, q023 (Part 1); q034, q037, q048 (Part 2); q062, q069, q070 (Part 3) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q009, q022, q049, q072 · B q015, q058, q030 · C q017 or q032 · D q081.
- **Long (40 marks, 90 min):** A q010, q021, q024, q035, q038, q051, q052, q063, q064, q070 · B q029, q044, (q066 or q076), q045, (q059 or q077) · C q046 + (q060 or q078) · D q079, q083.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars`: **0 errors, 0 warnings**.
- Scratch validator: 18 maths strings parsed (KaTeX 0.19.1 + mhchem, strict); 7 equations atom-balanced; 24 SVG visuals / 12 distinct diagrams pass the allow-list; narration max 80 words. Every SVG was rasterised and checked by eye, several times for the heart, nephron and digestive system.

## Verifier pass (2026-10-26)
Every question, case part and alternative was re-solved from its stem; biology facts were checked against the syllabus scope. Findings and fixes:
1. **Competency balance:** the first draft had 39% of items at application or higher. Eight items were rewritten into new contexts that need application or analysis — q015 (stomata closing on a hot Bikaner afternoon), q021 (overuse of antacids), q026 (no saliva: is starch still digested?), q029 (swallowing in orbit), q050 (low platelets in dengue), q058 (milky lymph; filariasis swelling), q061 (ink in a cut flower stem), q065 (translocation in sugarcane and mango). Final share 49%.
2. **Diagrams after rasterising:** the first heart drew vessels through the chambers; it was redrawn with opaque chambers, vessels behind them and a numbered key for the four great vessels. The nephron's left labels were clipped (canvas widened); the urinary system's aorta and vena cava ran through the bladder (shortened, renal vessels re-routed); the stomata "guard cells" label overlapped other text.
3. **Narration fact:** a comparison of the villi's surface to "a badminton court" was replaced with a safe statement ("many times larger than the skin"), because published estimates of intestinal surface area vary widely.
4. **Marking scheme of q005** had a fractional split; rewritten as all four (1) / two or three (0.5).
5. **Facts double-checked:** photosynthesis equation (6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O, balanced); three events; stomata open when guard cells take in water; bile has no enzymes; trypsin and lipase in pancreatic juice; pyruvate in cytoplasm; yeast → ethanol + CO₂, muscle → lactic acid; alveolar surface about 80 m²; pulmonary artery deoxygenated, pulmonary veins oxygenated; left ventricle thickest; normal BP about 120/80 mm Hg; hypertension from constriction of arterioles; root pressure at night, transpiration pull by day; translocation uses ATP; about 180 L filtrate per day vs 1–2 L urine; dialysis has no reabsorption; gums and resins in old xylem.

## Known gaps
- Diagrams are schematic and not to scale (stated in captions); the heart is shown from the front.
- Data in case passages (bubble counts, potometer readings, blood pressures) are realistic illustrative values, not measurements from a cited study.
- `blueprint_id` is null on both tests, as for the exemplar.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 4 item tag(s) and 2 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 13, understanding 34, application 20, analysis 16, evaluation 1 — application or higher 44% of items, 49% of marks (supersedes the competency figures above).
