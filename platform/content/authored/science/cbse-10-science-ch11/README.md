# CBSE Class 10 Science, Chapter 11 — Electricity

`cbse-10-science-ch11` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (20 + 21 + 18 slides), notes (6 sections), 30 flashcards, 90 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch11_short` (20 marks, 40 min) and `t_cbse10sci_ch11_long` (40 marks, 90 min). The two tests share no questions. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are covered; the chapter has no removed topics for 2026-27.
- Household wiring appears only as far as t04 needs ("why parallel"). Live, neutral and earth wires, overloading and short circuits belong to ch12 t05 and are only touched on here, where fuses are discussed (t05).
- **Resistivities** in the deck table are rounded measured values (copper 1.7 × 10⁻⁸, nichrome 1.1 × 10⁻⁶ Ω m, …). Every question that needs a resistivity states it in the stem, so no answer depends on which reference table a student uses.

## Shape
- **Part 1 (t01–t02, 20 slides):** current as rate of flow of charge; electrons vs conventional current; charge of an electron; potential difference and the volt; circuit symbols; ammeter in series and voltmeter in parallel; Ohm’s law, its verification with a rheostat, and the V–I graph. Worked examples: charge and electrons from a charger (0.5 A, 10 min), work on 20 C at 9 V, resistance from a table of readings.
- **Part 2 (t03–t04, 21 slides):** factors affecting resistance; resistivity with a table of materials; uses of conductors, alloys and insulators; series and parallel rules with derivations; combined circuits; why homes are wired in parallel. Worked examples: copper wire (0.68 Ω), stretched wire (×4), a series circuit (2/3/5 Ω on 6 V), a parallel circuit (6 ∥ 3 Ω on 6 V), a combined circuit (4 Ω + 6 ∥ 3 Ω on 12 V).
- **Part 3 (t05–t06, 18 slides):** origin of Joule heating and its derivation; the I² dependence; uses (heaters, filament lamps, fuses); fuse ratings; P = VI = I²R = V²/R; the kilowatt hour; a monthly bill; which bulb glows brighter in series and in parallel. Worked examples: heat in a 50 Ω resistor, choosing a fuse for a 2 kW heater, current and resistance of a 40 W bulb, a family’s 30-day bill (84 units, ₹504).
- Layouts: title 3, concept 18, diagram 11, example 12, check 9, summary 3, exam-tips 3.
- **Visuals in decks (42 of 59 slides):** table 30, svg 10, plot 1, flow 1. Notes add 10 SVGs (re-used deck diagrams), 2 tables and the V–I plot.
- **Diagrams (11 SVGs, drawn with a shared NCERT-style symbol library):** symbol chart (cell, battery, plug key open and closed, joint, crossing wires, bulb, resistor, rheostat, ammeter, voltmeter, wire); a simple circuit with meters; the Ohm’s-law set-up with a rheostat; electron flow vs conventional current; resistance vs length and area; series, parallel and combined circuits with values; household parallel wiring (live in red, neutral in blue); a filament lamp and a cartridge fuse; a wrongly connected circuit (question asset). Every meter’s + terminal faces the + side of the supply, and current arrows follow conventional current.
- **Plots:** V–I graph of a 5 Ω resistor (readings and fitted line) in the deck and notes; two-wire V–I comparison as a question asset (q017).
- **Narration:** 12–71 words (mean 52); no symbols or unit abbreviations ("ohms", "kilowatt hour"); contexts include a cricket-stadium gate, a fan regulator, a phone charger, a Punjab farm pump, Diwali lights, a Shimla heater, a Pune kitchen and a power bank.

## Question bank (90)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 6 | 1 (keys a 2, b 2, c 1, d 1) |
| true-false | 5 | 1 (2 true, 3 false) |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 19 | 2 (Q = It, electrons, W = VQ, Ohm’s law, resistivity, series/parallel, Joule heating, kWh, cost, bulb resistance) |
| short | 8 + 7 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` is set on the 7 prose short answers and left out of numerical and multi-part answers.
- **Difficulty:** d1 27 · d2 37 · d3 17 · d4 7 · d5 2. The d1 items are one-step numericals and definitions; the d4–d5 items are the stretched wire, making 4 Ω from three 6 Ω, cutting a wire into a parallel bundle, a heater cut too short, a bill saving, and bulbs in series.
- **Competency:** recall 15 · understanding 22 · application 45 · analysis 8. Application or higher is **59% of items (72% of marks)**. The share is high because this is the board’s most numerical chapter; it is within the lint band (45–65%).
- **Topic tags:** t01 16 · t02 13 · t03 16 · t04 19 · t05 16 · t06 19.
- **Cases:** Ohm’s-law readings with one bad reading (data), heater-element design in Coimbatore (industry; resistance from rating, length of nichrome), Diwali string lights in series (everyday), the Iyer family’s bill (data; which appliance uses most energy, monthly cost or saving from efficient fans), a Pune kitchen fuse that blows (everyday; overload calculation), a 10 000 mAh power bank (everyday; mAh as charge, energy, time).
- **Deck checks:** q003, q004, q017 (Part 1); q029, q042, q044 (Part 2); q058, q059, q071 (Part 3) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q003, q028, q058, q021 · B q012, q067, q053 · C q041 or q070 · D q087.
- **Long (40 marks, 90 min):** A q001, q004, q017, q020, q029, q043, q059, q072, q010, q051 · B q013, q052, (q065 or q081), q054, (q039 or q082) · C q055 + (q015 or q084) · D q088, q089.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars` (with the stricter M2 lint merged from `platform/main`): **0 errors, 0 warnings**.
- Scratch validator: 652 maths strings parsed (KaTeX 0.19.1 + mhchem, strict); 186 numeric `=`/`≈` links recomputed after stripping units, none wrong (links that are unit conversions, such as 1 kWh = 3.6 × 10⁶ J, are recognised and skipped); 21 SVG visuals / 11 distinct diagrams pass the allow-list; narration max 71 words; every check slide points to an objective item.
- Independent re-solve: **24/24** numerical items and parts, plus **61** other stated numbers (every worked example, every written numerical, case tables and bill totals), recomputed by a separate script with its own series, parallel, resistivity and power functions. Every SVG was rasterised and checked by eye.

## Verifier pass (2026-10-27)
Every question, case part and alternative was re-solved from its stem; all numbers were recomputed (see above). Findings and fixes:
1. **Meter polarity:** in the first series-circuit diagram, current entered the ammeter at its − terminal. The ammeter was moved to the side of the loop where conventional current enters its + terminal. Every other circuit was re-checked for polarity and current direction.
2. **Lint after merging `platform/main`:** the stricter rule for bare LaTeX command names read $Q = ne$ as a lost `\ne`. It is now written $Q = n e$ in the deck, notes and flashcards.
3. **Answers hidden by number formatting:** solutions wrote 21\,600 J and 11\,000 J. Neither the lint’s "solution states the answer" check nor a student copying the key would see 21600 there. Thin-space separators were removed from all solutions.
4. **True/false balance:** all five true/false items were keyed false; two (q022, q050) were rewritten as true statements of the same ideas.
5. **Originality:** the classic textbook fuse example (a 1 kW iron) was replaced by a 2 kW room heater, and the textbook’s numerical exercise values were avoided throughout.
6. **Validator false positives:** the unit-stripping arithmetic check flagged unit conversions (0.5 mm² = 5 × 10⁻⁷ m²; 1 kWh = 3.6 × 10⁶ J) as wrong arithmetic. Links between different units are now skipped. The content was correct.
7. **Physics double-checked:** conventional current opposite to electron flow; ammeter low resistance in series, voltmeter high resistance in parallel; Ohm’s law with the constant-temperature condition; slope of V–I = R; R ∝ l, R ∝ 1/A, n² rule for stretching; resistivity independent of size; series/parallel rules and that R_p < smallest; household parallel wiring; H = I²Rt; tungsten about 3380 °C with an inert-gas fill; fuse of low melting point in series; 1 kWh = 3.6 × 10⁶ J; in series the lower-wattage (higher-resistance) bulb is brighter.

## Known gaps
- Circuit diagrams in model answers are described in words; graders should accept any correct diagram with standard symbols.
- The bill and appliance figures are realistic but illustrative; real tariffs are usually slab-based, while the questions use one flat rate per unit.
- `blueprint_id` is null on both tests, as for the exemplar.
