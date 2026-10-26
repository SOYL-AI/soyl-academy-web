# CBSE Class 10 Science, Chapter 2 — Acids, Bases and Salts

`cbse-10-science-ch02` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (23 + 21 + 19 slides), notes (7 sections), 34 flashcards, 77 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch02_short` (20 marks, 40 min) and `t_cbse10sci_ch02_long` (40 marks, 90 min). The two tests share no questions. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All seven syllabus topics (t01–t07) are covered; the syllabus lists no removed topics for this chapter and no topic is `board_assessed: false`.
- **Information-box material** (CBSE: "information in NCERT text boxes is not assessed") appears only as context: the list of natural acids (tamarind, curd, nettle), the dock-plant remedy, and the Taj Mahal / acid-rain link. No test question depends on it alone.
- Standard practicals on the CBSE list (indicator tests, reactions of acids with zinc and sodium carbonate, heating copper sulphate) are described in fresh words; all questions and contexts are new.

## Shape
- **Part 1 (t01–t03):** indicators (litmus, synthetic, natural, olfactory), acids with metals / carbonates / bases / metal oxides, zinc with sodium hydroxide, hydrogen ions, hydronium, alkalis, conductivity, safe dilution.
- **Part 2 (t04–t06):** strong vs weak vs concentrated, the pH scale, universal indicator, pH in the body, teeth, soil, acid rain and stings, salt families, pH of salt solutions, water of crystallisation.
- **Part 3 (t07):** common salt, chlor-alkali process and its products, bleaching powder, baking soda and baking powder, washing soda, plaster of Paris.
- Layouts across the three decks: title 3, concept 27, two-column 1, diagram 9, example 6, check 11, summary 3, exam-tips 3.
- **Visuals in decks (48 of 63 slides):** table 19, chem 10, svg 9, flow 9, plot 1. Notes add 8 SVGs (re-used deck diagrams), 4 tables, 1 plot and 1 flow, so every notes section has at least one visual.
- **Diagrams (9 hand-written SVGs):** litmus strips in acid and base, hydrogen from zinc with the pop test, carbon dioxide into lime water, conductivity circuit, safe dilution, labelled pH scale, heating blue copper sulphate, sea-salt pans, chlor-alkali cell. Litmus colours and the pH bar use the named hue tokens (`--diagram-red`, `--diagram-blue`) from ADR-009; every colour is also stated in a label.
- **Plot:** typical tooth-surface pH after a sugary snack against the critical pH 5.5 (deck 2 and notes), labelled as a typical pattern.
- **Narration:** every slide, 25–84 words (mean 67), no symbols or formulae; Indian contexts throughout (turmeric stain on a kurta, Nani's pickle jars, wedding-feast acidity, Soil Health Card, Assam tea, Bharuch chlor-alkali plants, dhokla and fruit salt, flood-time well disinfection, plaster casts).

## Question bank (77)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 |
| assertion-reason | 9 | 1 (keys a 4, b 2, c 1, d 2) |
| true-false | 5 | 1 |
| fill-blank | 4 | 1 |
| match | 3 | 2 |
| numerical | 3 | 2, 2, 1 (balancing coefficient, % water in CuSO₄·5H₂O, water lost by gypsum) |
| short | 8 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) is an either/or modelled with `alternatives` (`c-ii`) |

- **MCQ keys:** a 7, b 8, c 7, d 6.
- **Difficulty:** d1 11 · d2 32 · d3 27 · d4 6 · d5 1.
- **Competency:** recall 10 · understanding 30 · application 23 · analysis 12 · evaluation 2. Application or higher is **48% of items (59% of marks)**.
- **Topic tags:** t01 7 · t02 14 · t03 10 · t04 11 · t05 11 · t06 11 · t07 18.
- **Cases:** indicator data table (A–E), marble chips with strong vs weak acid (lab), tooth-surface pH readings (data, d4), chlor-alkali plant (industry), crucible masses for copper sulphate (data with a numerical part), pH of two acids on dilution (data, d5 evaluation).
- **Deck checks:** q001, q009, q011, q023 (Part 1); q031, q038, q047, q051 (Part 2); q057, q059, q061 (Part 3) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q008, q032, q041, q050 · B q026, q044, q018 · C q019 or q028 · D q073.
- **Long (40 marks, 90 min):** A q002, q010, q013, q021, q030, q039, q042, q048, q057, q060 · B q016, q036, (q054 or q067), q037, (q045 or q055) · C q046 + (q070 or q071) · D q072, q076.
- Same section pattern as the exemplar; `blueprint_id` is null (chapter-test blueprints are not used yet).

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars` (covers `content/authored` since d19bf5e): **0 errors, 0 warnings**.
- Scratch validator (ported from the exemplar handoff): 289 maths strings parsed (KaTeX 0.19.1 + mhchem, strict); 93 equations atom- and charge-balanced, including hydrates and the plaster-of-Paris fractions; 3 intentionally skeletal equations inside worked-example steps (labelled "skeletal"); 17 SVG visuals / 9 distinct diagrams pass the allow-list (class pattern, palette, viewBox, title, unique ids); narration max 84 words. Every SVG was rasterised and checked by eye.

## Verifier pass (2026-10-26)
Every question, case part and alternative was re-solved from its stem alone and compared with the key; equations were recounted by hand as well as by script. Findings and fixes:
1. **Competency balance:** the first draft had only 36% of items at application or higher. Instead of relabelling, eight items were rewritten into new contexts that need application or analysis: q012 (identify a metal from its oxide's litmus result), q021 (which pair conducts), q026 (is "it conducts, so it is an acid" justified?), q030 (cleaners by indicator colour), q035 (match problems to remedies), q048 (fertiliser salt pH), q054 (anhydrous copper sulphate as a test for water in "pure ethanol"), q058 (flat, bitter cake). Final share 48% of items.
2. **MCQ key spread:** no MCQ was keyed (d). Eight items had their options re-ordered by script (q001, q008, q020, q032, q039, q057 to d; q029, q047 to a). The script's first run also swapped the `c:` competency field of q029 and q047; both were repaired by hand and all keys re-checked.
3. **Lint false positives:** two marking-scheme steps began "…data: …", which the URL rule reads as a `data:` scheme. Reworded (q074 c-ii, q076 c).
4. **Layout:** after rasterising, the dilution label overlapped the pouring beaker, the "Cathode (−)" label crossed the tank wall, and the copper-sulphate leader line stopped short. All fixed.
5. **Facts double-checked:** zinc + sodium hydroxide gives sodium zincate; lime water clears with excess carbon dioxide; methyl orange red/yellow; phenolphthalein colourless/pink; tooth decay below pH 5.5; acid rain below pH 5.6; body pH 7.0–7.8; chlorine at the anode, hydrogen at the cathode, sodium hydroxide near the cathode; plaster of Paris made at 373 K; water of crystallisation 5 / 2 / 10.

## Known gaps
- Universal-indicator colours and household pH values are typical values and vary by brand and sample; the slides and questions say so.
- The bleaching powder formula is given as $\ce{CaOCl2}$ with a note that its real composition is more complex, as in the syllabus.
- `blueprint_id` is null on both tests, as for the exemplar.
