# CBSE Class 10 Science, Chapter 3 — Metals and Non-metals

`cbse-10-science-ch03` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (22 + 25 slides), notes (6 sections), 32 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch03_short` (20 marks, 40 min) and `t_cbse10sci_ch03_long` (40 marks, 90 min). The two tests share no questions. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are covered; the chapter has no removed or `board_assessed: false` topics.
- Material usually found in information boxes (aqua regia, anodising detail, "gold wire 2 km") is used only as colour in slides and notes, never as the sole basis of a test question. Froth flotation and other named concentration methods are not taught (only "concentration of ore"), in line with the learning outcomes.

## Shape
- **Part 1 (t01–t03):** physical properties and exceptions, metals with oxygen (basic and amphoteric oxides), water and steam, dilute acids (and why nitric acid usually gives no hydrogen), salt solutions, the reactivity series, ranking from displacement data.
- **Part 2 (t04–t06):** octet and ions, electron-dot formation of NaCl and MgCl₂, properties of ionic compounds, ores and gangue, extraction by reactivity (heat alone, roasting/calcination and reduction, thermit, electrolysis), electrolytic refining of copper, corrosion, rust prevention (galvanising), alloys.
- Layouts: title 2, concept 17, two-column 1, diagram 11, example 4, check 8, summary 2, exam-tips 2.
- **Visuals in decks (36 of 47 slides):** table 15, svg 11, chem 7, flow 3. Notes add 11 SVGs (re-used deck diagrams), 3 tables and 1 flow.
- **Diagrams (11 hand-written SVGs):** malleability and ductility, heat conduction along a rod, metal with steam apparatus, five metals in dilute acid, reactivity-series ladder with water/acid bands, electron-dot NaCl, electron-dot MgCl₂, ions locked in a solid vs moving in a melt, thermit welding of rails, electrolytic refining of copper, galvanised iron cross-section. Named hues (`--diagram-red`, `--diagram-blue`, `--diagram-brown`) are used where colour matters (molten iron, copper sulphate solution, copper electrodes), always with a text label as well.
- **Narration:** 22–79 words (mean 64), no symbols or formulae; Indian contexts (silver varq on kaju katli, temple bells, phuljhadi, Udaipur zinc, Jharkhand copper, Indian Railways thermit welding, Chennai sea air, Diwali cleaning of silver and copper).

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 7 | 1 (keys a 3, b 1, c 2, d 1) |
| true-false | 5 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 4 | 2, 1, 2, 1 (balancing coefficient, electrons in Mg²⁺, iron from 320 g Fe₂O₃, % gold in 22 carat) |
| short | 6 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or modelled with `alternatives` (`c-ii`) |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` (CBSE guidance: 1 mark 5–30, 2 marks 30–50, 3 marks 50–80, 5 marks 80–120 words) is set on the 24 of 34 short/long items whose model answers are prose, and left out where the answer is an equation, a structure or a diagram.
- **Difficulty:** d1 8 · d2 30 · d3 24 · d4 6 · d5 1.
- **Competency:** recall 8 · understanding 28 · application 20 · analysis 10 · evaluation 3. Application or higher is **48% of items (61% of marks)**.
- **Topic tags:** t01 6 · t02 19 · t03 11 · t04 11 · t05 16 · t06 11.
- **Cases:** metals P–S with water, steam and acid (data); four displacement tubes (lab); melting points and conductivity incl. CaO vs NaCl (data, d4); Udaipur zinc smelter with SO₂ capture (industry); night-time thermit rail repair (everyday/industry); five-nail rusting study incl. salt water and a galvanised nail (data, d4 evaluation).
- **Deck checks:** q003, q007, q010, q013 (Part 1); q030, q033, q044, q054 (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q002, q011, q025, q045 · B q020, q061, q022 · C q023 or q063 · D q065.
- **Long (40 marks, 90 min):** A q001, q008, q009, q012, q013, q015, q032, q042, q046, q056 · B q006, q037, (q050 or q053), q038, (q028 or q062) · C q039 + (q029 or q052) · D q064, q069.
- `blueprint_id` is null, as for the exemplar.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars` (now covers `content/authored`): **0 errors, 0 warnings**.
- Scratch validator: 180 maths strings parsed (KaTeX 0.19.1 + mhchem, strict); 82 equations atom- and charge-balanced; 1 skeletal equation in a worked example (labelled); 4 electrode half-equations with $\ce{e-}$ checked by hand; 22 SVG visuals / 11 distinct diagrams pass the allow-list; narration max 79 words. Every SVG was rasterised and checked by eye.

## Verifier pass (2026-10-26)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **q019** wrote a partial equation inside one `\ce{}` ("2Al + 3H2O -> Al2O3"), which the lint correctly flagged as unbalanced. Rewritten as separate `\ce{}` terms with $x$ outside.
2. **q014** was planned as a key-(d) assertion-reason item but still held a draft with key (a); rewritten ("sodium is stored under water" — false; "reacts vigorously with oxygen" — true) so A-R keys spread a 3, b 1, c 2, d 1.
3. **q029** (design an experiment to place an unknown metal) re-rated d5: it needs planning, interpretation and evaluation.
4. **Reactivity mnemonic** in the series narration had 14 words for 13 elements; corrected.
5. **Layout after rasterising:** malleability hammer redrawn, refining anode label was clipped, two lattice ions sat on the electrodes, steam-apparatus and ladder labels overlapped or overflowed. All fixed.
6. **Facts double-checked:** calcium floats because of hydrogen bubbles (it is denser than water); metals with steam give oxides ($\ce{Fe3O4}$, $\ce{Al2O3}$); nitric acid exceptions are Mg and Mn with very dilute acid; roasting = sulphide + excess air, calcination = carbonate + limited air; $\ce{2Cu2O + Cu2S -> 6Cu + SO2}$; thermit stoichiometry 320 g Fe₂O₃ → 224 g Fe; 22-carat gold = 91.7 % gold; anode impure / cathode pure in refining; iron rusts only with both air and water.

## Known gaps
- The CaO melting point in case q066 is given as "about 2900 K" (literature values are 2840–2900 K).
- Electrode half-equations are shown for enrichment and in one long answer; they are not required by the syllabus and are not needed in any 1–3-mark key.
- `blueprint_id` is null on both tests.
