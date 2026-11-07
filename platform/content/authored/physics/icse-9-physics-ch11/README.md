# ICSE Class 9 Physics, Chapter 11 — Current Electricity

`icse-9-physics-ch11` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 15 slides), notes (6 sections), 30 flashcards, 83 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch11_short` (20 marks, 30 min) and `t_icse9phy_ch11_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs` (circuit symbols, circuits and graphs, with self-checks), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch11/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE 2028 Class IX topics of the chapter: free electrons, good and bad conductors, semiconductors and superconductors, charge in coulombs and its quantisation (q = n e); current as rate of flow of charge (I = Q ÷ t), conventional current and electron flow; potential difference (V = W ÷ q, W = q V) and resistance; simple circuits with standard symbols, open and closed circuits, ammeter in series; dry cells and accumulators as sources of direct current; Ohm's law and simple numericals.
- **Removed topics respected:** V = W ÷ q is used only as a definition (no derivation); how galvanometers and ammeters work is never asked (an ammeter appears only as a symbol that is joined in series); cells and accumulators get only names, uses and "rechargeable or not", with no construction, working or equations. Series and parallel combinations of resistors and resistivity are not in the Class IX scope and are not asked.
- **Overlap kept out:** internal resistance, e.m.f., combinations of resistors, factors affecting resistance, non-ohmic conductors and electrical power belong to ICSE 10 Physics ch08 and CBSE 10 Science and are not asked.
- **Values:** the charge of an electron is 1.6 × 10⁻¹⁹ C, stated in the stem of every item that needs it; all Ohm's law numericals are for a metallic conductor at constant temperature. Large or small answers are asked "in units of 10ⁿ" so that the key is a plain number.
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): short stems, numericals with formula, substitution and unit, circuit diagrams, graph reading and assertion-reason items in the specimen option order.
- **Calculation chapter:** 15 numerical items plus calculation short answers and structured parts.
- **Originality:** situations and numbers differ from ICSE 10 Physics ch08, CBSE 10 Science (electricity) and CBSE 12 Physics; exact-stem and originality checks report no duplicates (one repeated stem was reworded).

## Shape
- **Decks:** Part 1 (17 slides): Charge, current and resistance; Free electrons in a metal; Conductors, insulators, semiconductors and superconductors; Quick check: classifying materials; Electric charge and its quantisation; Worked example 1: counting electrons; Electric current; Worked example 2: a current from charge and time; Quick check: finding the current; Two directions of flow; Quick check: direction; Potential difference; Worked example 3: work done by a battery; Quick check: work and potential difference; Resistance and the ohm; Summary; Exam tips. Part 2 (15 slides): Circuits and Ohm's law; Circuit symbols; Open and closed circuits; Quick check: why the bulb is off; Sources of direct current; Ohm's law; The circuit for Ohm's law; Worked example 1: using the readings; Worked example 2: current in a bulb; Quick check: finding the p.d.; Worked example 3: finding the resistance; Quick check: finding the resistance; Quick check: the ammeter; Summary; Exam tips.
- **Visuals (32 of 32 slides):** flow 2, table 24, svg 6.
- **Diagrams (8 distinct SVGs):** free electrons in a metal (random motion and drift); a simple circuit with the conventional current and the electron flow, and a lettered version (A to D); open and closed circuits with the bulb off and on; the circuit symbols (cell, battery, open and closed key, bulb, resistor, rheostat, ammeter, voltmeter), and a lettered version (A to F); the Ohm's law circuit; the V–I graph of a coil. Symbol shapes and the circuit loops are computed from one symbol function and self-checked (7 checks); each SVG was rendered to PNG and checked by eye.
- **Narration:** 13–42 words per slide (mean 29); no symbols, formulae or unit abbreviations.

## Question bank (83 items, 168 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 (8 are deck-check items) | 32 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 2 | 2 |
| true-false | 4 | 4 |
| fill-blank | 3 (one with five blanks) | 7 |
| numerical | 15 | 15 |
| match-5 | 1 | 5 |
| short-2 | 9 | 18 |
| short-3 | 7 | 21 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 5 or 6 parts with part marks in the stem: a lettered circuit (with figure), the Ohm's law experiment (circuit figure and a table of readings), charge and current in a copper wire, p.d. and work for a bulb, classifying materials, sources of direct current with a torch.
- **Difficulty:** d1 34 · d2 39 · d3 9 · d4 1 (the Ohm's law structured question).
- **Competency:** recall 22 · understanding 19 · application 39 · analysis 3. Application or higher is **51% of items**, inside the 45–65% lint band. No tag was changed; the first draft was at 45%, so eight genuine application items (numericals and reasoning from Ohm's law) were added instead.
- **Assertion-reason keys:** c b d a (all four options used).

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every charge, number of electrons, current, work, p.d. and resistance is computed and asserted in `calc.mjs`, and the build's scripted re-solve checks all pass.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that no item states the answer to another in the same test (for example the Ohm's law, charge and materials structured questions are kept out of the long test's Section A topics, and the circuit and p.d. questions out of the short test's).

## For a reviewer
- **Electron charge:** 1.6 × 10⁻¹⁹ C, and one coulomb is about 6.25 × 10¹⁸ electrons (notes only).
- **Superconductor example:** mercury below about 4 K (the transition is at 4.2 K); the items use 3 K or "about 4 K".
- **Symbols:** the resistor is drawn as a rectangle (the IEC/BIS form); the older zigzag is also seen in some ICSE books. A cell is a long thin plate (positive) and a short thick plate (negative); a key is two terminals, joined when closed; the rheostat is a rectangle with an arrow through it. The figures use a voltmeter only in the Ohm's law circuit, where the p.d. must be measured; the syllabus lists the ammeter, not the voltmeter, among the symbols to draw.
- **Conventional current:** the figures show it leaving the long (positive) plate of the cell, clockwise, with the electron flow dashed in the opposite sense.
- **Ohm's law statement:** "at constant temperature the current through a metallic conductor is directly proportional to the potential difference across it".
- **"In units of 10ⁿ":** used for the electron-count and small-charge answers so that the numerical key is a plain number; the stem states the unit.
- **Not asked:** resistors in series or parallel, resistivity, power, internal resistance, working of meters and cells, alternating current.
