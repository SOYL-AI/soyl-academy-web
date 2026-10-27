# CBSE Class 10 Science, Chapter 4 — Carbon and its Compounds

`cbse-10-science-ch04` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (19 + 18 + 20 slides), notes (7 sections), 30 flashcards, 78 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch04_short` (20 marks, 40 min) and `t_cbse10sci_ch04_long` (40 marks, 90 min). The two tests share no questions. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All seven syllabus topics (t01–t07) are covered; no removed or `board_assessed: false` topics.
- Naming is limited to compounds with up to six carbon atoms, as the learning outcome states; locants (e.g. propan-1-ol) are not required and not used.
- Box-type enrichment (E20 ethanol petrol, denatured spirit, LPG odorant, vanaspati and health) appears as context only; no question depends solely on it.

## Shape
- **Part 1 (t01–t03):** why carbon shares electrons; electron-dot H₂, O₂, N₂, CH₄, CO₂ (and a worked NH₃ and ethene); properties of covalent compounds; diamond, graphite and fullerenes; catenation and tetravalency; saturated and unsaturated hydrocarbons; chains, branches, rings; isomers of butane; the first six alkanes.
- **Part 2 (t04–t05):** functional groups; homologous series with a plot of alkane boiling points; naming in three steps with worked examples; combustion and flame types; oxidation of alcohols; hydrogenation; substitution; a classification worked example.
- **Part 3 (t06–t07):** ethanol (uses, reaction with sodium, dehydration, methanol and denatured spirit, E20); ethanoic acid (weak acid, vinegar, glacial acid); esterification and saponification; reactions with bases and carbonates; distinguishing ethanol and ethanoic acid; soap molecule, micelles, hard water and scum, detergents; a soap-drop hardness test.
- Layouts: title 3, concept 22, diagram 10, example 7, check 9, summary 3, exam-tips 3.
- **Visuals in decks (45 of 57 slides):** table 20, svg 10, chem 10, flow 4, plot 1. Notes add 10 SVGs (re-used deck diagrams), 3 tables and the plot.
- **Diagrams (10 hand-written SVGs):** shared pairs in H₂/O₂/N₂ (dots and crosses), CH₄ and CO₂, diamond vs graphite, chains/branches/rings, ethane/ethene/ethyne structural formulas, clean blue vs sooty yellow flame, esterification in a water bath, micelle, soap molecule, soap vs detergent in hard water. Named hues are used where colour is the point (blue and yellow flames, yellow oil drop) and are also written in labels.
- **Narration:** 18–82 words (mean 63); no symbols or formulae (E20 is spoken as "E twenty"); contexts include LPG and CNG, hand sanitiser, sugar-mill ethanol, vanaspati, hard water in Jaipur and Bengaluru, a cold lab in Shimla.

## Question bank (78)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6) |
| assertion-reason | 9 | 1 (keys a 4, b 2, c 2, d 1) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 |
| match | 2 | 2 |
| numerical | 5 | 2, 1, 2, 1, 2 (bonds in propane, H in a C₅ alkyne, mass of 3rd alkene, O₂ for 3 CH₄, mass of ethyl ethanoate) |
| short | 7 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` is set on the 23 of 34 short/long items whose model answers are prose, and left out where the answer is a structure or an equation.
- **Difficulty:** d1 11 · d2 33 · d3 29 · d4 4 · d5 1.
- **Competency:** recall 11 · understanding 27 · application 25 · analysis 14 · evaluation 1. Application or higher is **51% of items (64% of marks)**.
- **Topic tags:** t01 10 · t02 5 · t03 13 · t04 15 · t05 17 · t06 15 · t07 9.
- **Cases:** alkane boiling points (data), identifying an unknown liquid as ethanol (lab), vanaspati plant near Rajkot (industry, with an evaluation alternative), esterification practical with leftover acid (lab), soap vs detergent drops for three water samples (data, d4), LPG composition and combustion (everyday).
- **Deck checks:** q002, q012, q017 (Part 1); q028, q029, q042 (Part 2); q053, q056, q066 (Part 3) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q003, q019, q041, q058 · B q015, q070, q009 · C q010 or q064 · D q076.
- **Long (40 marks, 90 min):** A q001, q012, q017, q027, q030, q042, q044, q045, q056, q067 · B q008, q024, (q037 or q050), q038, (q025 or q051) · C q052 + (q039 or q072) · D q073, q078.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars`: **0 errors, 0 warnings**.
- Scratch validator: 231 maths strings parsed (KaTeX 0.19.1 + mhchem, strict); 62 reaction equations atom-balanced, none unbalanced; structural equations written with "=" (e.g. ethene) checked by hand; 20 SVG visuals / 10 distinct diagrams pass the allow-list; narration max 82 words. Every SVG was rasterised and checked by eye.

## Verifier pass (2026-10-26)
Every question, case part and alternative was re-solved from its stem; every electron-dot description was recounted (8 around C, N, O, Cl; 2 around H). Findings and fixes:
1. **Narration:** "E20" on two slides would be read badly by text-to-speech and is caught by the validator's formula rule; now "E twenty".
2. **Difficulty:** only three items were at d4 or above. q013 (silicon vs carbon, R true but not the explanation) and q025 (formula → structure → flame) were re-rated d4; q072 (choose soap or detergent with chemistry and a caution) d5.
3. **Marking scheme of q039** had an unclear step split; rewritten as structures (2) + names (1) + isomers (1) + series features (1).
4. **Layout after rasterising:** the esterification lamp flame overlapped the beaker and the micelle's "oily dirt" label sat on the tails; both fixed.
5. **Facts double-checked:** N₂ triple bond; CO₂ two double bonds with two lone pairs per O; graphite three bonds per C; cyclohexane C₆H₁₂ (saturated, not CₙH₂ₙ₊₂); propane has 10 covalent bonds; boiling points of alkanes and alcohols (methanol 338 K, ethanol 351 K, propanol 370 K, butanol about 391 K); dehydration at 443 K with excess hot concentrated sulphuric acid; glacial acetic acid freezes at 290 K; vinegar 5–8 %; ethyl ethanoate 88 u; micelle orientation; soap scum equation balanced (C 36, H 70, O 4, Na 2, Ca 1, Cl 2).

## Known gaps
- Electron-dot structures in model answers are described in words (Markdown cannot draw them); graders should accept any correct drawing.
- Boiling points are rounded to the nearest kelvin.
- `blueprint_id` is null on both tests, as for the exemplar.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 14 item tag(s) and 6 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 11, understanding 41, application 11, analysis 14, evaluation 1 — application or higher 33% of items, 39% of marks (supersedes the competency figures above).
