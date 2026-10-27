# CBSE Class 10 Science, Chapter 12 — Magnetic Effects of Electric Current

`cbse-10-science-ch12` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 21 slides), notes (6 sections), 30 flashcards, 79 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch12_short` (20 marks, 40 min) and `t_cbse10sci_ch12_long` (40 marks, 90 min). The two tests share no questions. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Topics t01–t05 are taught and assessed in full.
- **t06 (electric motor, electromagnetic induction, generator) is `board_assessed: false`** in the 2026-27 syllabus (formative assessment only). Following the questions prompt ("at most a few practice items"), it gets one deck slide marked "Beyond the board paper", one notes section marked formative-only, one flashcard and **3 practice items** (q071–q073), each labelled "(Formative assessment.)" in its stem. **No t06 item is used in either chapter test.**
- Magnetism in medicine (an NCERT text box) is not used.

## Shape
- **Part 1 (t01–t02, 20 slides):** compass and magnetic field; bar-magnet field lines and their properties; Oersted’s observation; the field of a straight wire and the right-hand thumb rule; field strength vs current and distance; circular loop and number of turns; solenoid and its polarity; electromagnet vs permanent magnet. Worked examples: field direction around an upward current; polarity of a solenoid.
- **Part 2 (t03–t06, 21 slides):** force on a rod in a magnet; what changes the force; Fleming’s left-hand rule; uses (motors, loudspeakers); DC vs AC with a current–time plot; 50 Hz and its meaning; the domestic circuit; live, neutral and earth; earthing; short circuit vs overloading; safety devices; a formative-only slide on motors, induction and generators. Worked examples: left-hand rule on the rod; deflection of an electron beam; an overloaded 5 A circuit.
- Layouts: title 2, concept 14, diagram 10, example 5, check 6, summary 2, exam-tips 2.
- **Visuals in decks (31 of 41 slides):** table 19, svg 10, plot 1, flow 1. Notes add 10 SVGs (re-used deck diagrams), 2 tables, the plot and a flow.
- **Diagrams (10 SVGs):** the **field lines are traced numerically** (RK4 on the field of point poles for the bar magnet; on the summed fields of line currents for the loop section and the solenoid). So the bar-magnet lines really run N → S, the loop shows near-circles round each wire and straight lines at the centre, and the solenoid shows a uniform inside field with bar-magnet-like closing lines outside. Also drawn: Oersted’s set-up; a straight wire through cardboard with concentric circles and a right-hand thumb-rule icon; an electromagnet lifting nails; the rod between N and S blocks in perspective (field down, current towards the viewer, force right); Fleming’s left-hand rule axes; a domestic circuit (main fuse, meter, 15 A and 5 A circuits, live red / neutral black / earth green to an earth plate, earthed geyser body); electromagnetic induction (formative). Every arrow direction in these diagrams was checked with a cross product (see the verifier pass).
- **Plot:** AC (50 Hz sine) vs DC current against time over 40 ms.
- **Narration:** 12–69 words (mean 53), no symbols ("fifty hertz", "two hundred and twenty volts"). Contexts: a scrapyard crane, ceiling fans, a washing machine, a Lohri-season heater, a Hyderabad flat, a Kolkata flat, Alang ship-breaking yard.

## Question bank (79)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 | 1 (keys a 8, b 8, c 8, d 8) |
| assertion-reason | 7 | 1 (keys a 2, b 1, c 2, d 2) |
| true-false | 6 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 6 | 2 (field ratio of two coils, AC period, time between reversals, current of an AC unit, bulbs on a 5 A circuit, total current) |
| short | 7 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` is set on the 11 prose short/long answers.
- **Difficulty:** d1 23 · d2 24 · d3 22 · d4 9 · d5 1 (a compass inside a slot through a bar magnet).
- **Competency:** recall 17 · understanding 23 · application 32 · analysis 7. Application or higher is **49% of items (54% of marks)**.
- **Topic tags:** t01 11 · t02 20 · t03 14 · t04 10 · t05 22 · t06 3.
- **Cases:** electromagnet clips vs turns, current and core (data), Alang scrapyard crane (industry; polarity of the lifting face), the rod-in-magnet practical with missing entries (lab), current–time readings from two supplies (data; frequency 50 Hz), a washing machine with a loose earth wire (everyday; why the fuse did not blow, d4), a family’s two circuits and an overload (data; evaluation part).
- **Deck checks:** q004, q012, q025 (Part 1); q033, q044, q056 (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q003, q031, q053, q007 · B q023, q065, q066 · C q010 or q070 · D q076.
- **Long (40 marks, 90 min):** A q001, q012, q016, q029, q034, q044, q054, q057, q048, q062 · B q008, q038, (q026 or q049), q024, (q039 or q067) · C q027 + (q040 or q068) · D q074, q079.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars`: **0 errors, 0 warnings**.
- Scratch validator: 52 maths strings parsed (KaTeX 0.19.1, strict); 33 numeric links recomputed; 20 SVG visuals / 10 distinct diagrams pass the allow-list; narration max 69 words; every check slide points to an objective item.
- Independent re-solve: 9/9 numerical items and parts, plus **25 other checks**. **Every right-hand-rule and left-hand-rule answer** — deck examples, q012, q014, q015, q023, q031, q032, q039, case q076 and both force diagrams — was recomputed as a cross product (B ∝ I × r̂, F ∝ I × B) in explicit coordinates, alongside every stated current and count. Every SVG was rasterised and checked by eye.

## Verifier pass (2026-10-27)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Wrong direction in q039:** with the field to the right and the current into the page, the first draft said the force was upwards. The cross product gives downwards (out of the page gives upwards). The model answer, solution and scheme were corrected, and every other direction item was then checked the same way.
2. **Diagram fixes after rasterising:** the solenoid’s field lines were first traced in one direction only and missed half of each loop (now traced both ways from each interior seed). The Oersted compass was redrawn under the wire, with the needle deflected from the wire’s direction. Labels that overlapped field lines were moved, and captions were taken out of the SVGs.
3. **Competency honesty:** the first draft had 37% application or above. Ten items were rewritten into contexts that need application or analysis: q002 (compass inside a slot through a magnet, d5), q003 (reading field strength from a drawing), q013 (compass moved further from a wire), q015 (a loop on a table), q018 (a steel core in a bell), q024 (designing a model crane magnet), q034 (rotating the magnet), q053 (switch wrongly in the neutral wire), q054 (rats chewing a cable), q065 (a metal mixer on a two-pin adaptor). The share is now 49%.
4. **Assertion–reason q062** ("a fuse protects a person from shock") could be argued either way. The assertion now specifies an appliance that is **not earthed**, where the small leakage current through a person cannot blow the fuse, so the key (d) is unambiguous and matches case q078.
5. **Key balance:** MCQ keys rebalanced to 8/8/8/8 (q052’s options reordered).
6. **Facts double-checked:** field lines S → N inside a magnet; crowding = strength; Oersted 1820; concentric circles round a straight wire, weaker with distance; field at the loop centre ∝ turns × current; uniform field inside a solenoid; anticlockwise-end = N; soft iron vs steel; force largest when perpendicular, zero when parallel; Fleming’s left-hand rule with conventional current; Indian mains 220 V, 50 Hz, 100 reversals per second; live red, neutral black, earth green; switches and fuses in the live wire; short circuit vs overloading; MCB; fuse protects circuits, earthing protects people.

## Known gaps
- Field-line drawings in model answers are described in words; graders should accept any correct sketch.
- The traced field lines come from idealised models (point poles; infinite line currents for the loop and solenoid cross-sections). They are qualitatively right, not measured maps.
- Indian house-wiring colour codes are given as in the textbook tradition (red/black/green); newer installations may use brown/blue/green-yellow, which is not examined.
- `blueprint_id` is null on both tests, as for the exemplar.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 5 item tag(s) and 1 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 17, understanding 28, application 27, analysis 7, evaluation 0 — application or higher 43% of items, 47% of marks (supersedes the competency figures above).
