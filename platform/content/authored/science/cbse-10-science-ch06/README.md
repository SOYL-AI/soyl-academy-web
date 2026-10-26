# CBSE Class 10 Science, Chapter 6 — Control and Coordination

`cbse-10-science-ch06` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (23 + 23 slides), notes (7 sections), 33 flashcards, 80 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch06_short` (20 marks, 40 min) and `t_cbse10sci_ch06_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-10-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (shared by ch06–ch09: builders, balanced MCQ keys, case parts with `alternatives`, tests on the default blueprints, validator, re-solve harness, pipeline-lint call), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-10-science-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). The gate reads only the three files at the chapter root. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are covered; no removed or `board_assessed: false` topics exist for this chapter.
- Kept to Class 10 depth: impulses are "electrical inside, chemical across the synapse" (no ion channels or myelin); the reflex arc has the five parts used in the syllabus (receptor, sensory neuron, relay neuron in the spinal cord, motor neuron, effector); brain functions are the syllabus set (forebrain thinking/voluntary action; medulla blood pressure, salivation, vomiting; pons breathing; cerebellum posture, balance, precision); four plant hormones (auxin, gibberellins, cytokinins, abscisic acid — ethylene is not taught); the seven gland–hormone pairs of the syllabus (hypothalamus, pituitary, thyroid, pancreas, adrenal, testes, ovaries). Pineal gland and thymus appear only as labels on the gland map.
- The knee-jerk reflex is deliberately not used as a worked reflex arc (it has no relay neuron); every reflex example is a withdrawal reflex.
- Medical numbers used in data items are standard reference values: fasting blood sugar of 126 mg/dL or more suggests diabetes; about 150 micrograms of iodine a day for an adult; iodised salt about 30 micrograms of iodine per gram. Blood-glucose curves are typical illustrative values, as their captions say.

## Shape
- **Part 1 (t01–t03), 23 slides:** stimulus and coordination; receptors; neuron; impulse travel; synapse; voluntary, involuntary and reflex actions; reflex arc; worked example (pressure-cooker reflex); CNS and PNS; brain; forebrain; midbrain and hindbrain; worked example (which brain part?); protection; impulse to movement; limits of nerve impulses; worked example (conduction time 0.8 m + 0.8 m at 80 m/s = 20 ms); summary; exam tips.
- **Part 2 (t04–t06), 23 slides:** immediate vs growth movements; touch-me-not; tropisms; phototropism and geotropism; hydro-, chemo- and thigmotropism (tendril); auxin; worked example (three seedling treatments); plant hormones; hormones in animals; gland map; gland–hormone table; iodine and goitre; growth hormone and puberty; insulin and diabetes; feedback; worked example (blood-glucose graph); nervous vs hormonal; summary; exam tips.
- Layouts: title 2, concept 18, diagram 9, two-column 2, example 5, check 6, summary 2, exam-tips 2.
- **Visuals in decks (40 of 46 slides; no gap longer than one slide):** table 20, flow 10, svg 9, plot 1.
- **Diagrams (9 hand-written SVGs):** neuron with impulse direction; synapse with chemicals in the gap; reflex arc through a spinal-cord cross-section with a branch to the brain; side view of the brain (forebrain, midbrain, pons, medulla, cerebellum, pituitary, spinal cord); touch-me-not before and after touch; phototropism and geotropism (two panels); auxin on the shaded side of a bending shoot; tendril coiling around a stick; endocrine gland map (female ovaries and male testes on one outline, stated in the caption). Named hues: blue/green/red for the three neurons of the reflex arc, green for leaves, yellow for light, always with text labels too. Notes reuse the SVGs and add 3 tables and 1 flow.
- **Narration:** 16–72 words (mean 58); no symbols, formulae, unit abbreviations or gene/chromosome symbols. Contexts: cricket, hot tava and pressure cooker, jalebis, pani puri, railway platforms, chhui mui, bitter gourd and pea tendrils, iodised salt, health camps.

## Question bank (80)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 (keys a 8, b 8, c 8, d 7; placed by seeded balanced shuffle) |
| assertion-reason | 9 | 1 (keys a c d b a c a b d: a 3, b 2, c 2, d 2) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 3 | 2 |
| numerical | 2 | 2 (reflex conduction time, 30 ms), 1 (grams of iodised salt, 5 g) |
| short | 8 + 7 | 2 / 3 |
| long | 6 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` is set on 19 of 21 short/long items (prose answers) and left out of the two list-style 3-mark items (brain part + region; hormone + promotes/inhibits).
- **Difficulty:** d1 16 · d2 28 · d3 26 · d4 9 · d5 1.
- **Competency:** recall 15 · understanding 27 · application 26 · analysis 11 · evaluation 1. Application or higher is **48% of items (55% of marks)**.
- **Topic tags:** t01 15 · t02 15 · t03 16 · t04 15 · t05 14 · t06 21 (t06 carries the most board weight in this chapter).
- **Cases:** ruler-drop reaction times in three conditions (data, d4, evaluation alternative); hot-tava reflex (everyday); helmet talk with two brain-injury patients (everyday, analysis); maize seedlings in three boxes (lab/data, prediction alternative); gibberellin sprays in a Nashik vineyard (industry, evaluation alternative); glucose drink for two volunteers (data, feedback).
- **Deck checks:** q008, q014, q024 (Part 1); q041, q045, q062 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q001, q057, q036, q049 (3 MCQ + 1 A-R) · B q020, q069 (2 marks), q043 (3 marks) · C q022 or q074 · D q076.
- **Long (40 marks, 90 min):** A q003, q016, q025, q034, q048, q047, q056, q059 (MCQ), q017, q061 (A-R) · B q009, q031, (q042 or q052), q021, (q071 or q072) · C q033 + (q044 or q073) · D q075, q080.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars`: **0 errors, 0 warnings** for this chapter.
- Author validator (`src/lib.mjs`): 22 maths strings parsed (KaTeX 0.19.0 + mhchem, strict); 18 SVG visuals / 9 distinct diagrams pass the allow-list (saxes parse, class pattern, palette incl. named hues, fragment-only refs, viewBox, title, per-page unique ids); narration ≤ 72 words with no symbols; check slides all objective; word limits within the lint slack; 4/4 scripted re-solves (conduction time, salt mass, glucose fall, ruler-drop times from t = √(2d/g)). Every SVG was rasterised (resvg, theme tokens substituted) and checked by eye.

## Verifier pass (2026-10-26)
Every question, case part and alternative was re-solved from its stem; biology facts were checked against the syllabus scope. Findings and fixes:
1. **Competency honesty.** The first draft had 35% of items at application or higher. Instead of relabelling, seven items were rewritten into new contexts that need application or analysis — a blocked nose at a perfume shop (which receptors?), a damaged facial nerve (cranial vs spinal, PNS), a broken back after a fall (why not bend it), a nail-pain case that localises damage to the motor neuron, a tissue-culture lab choosing a hormone, a kitchen garden with three hormone effects, and a hypothalamus injury with a healthy pituitary — one 3-mark item was recast as an evaluation of a student's claim, and five low-value recall items that duplicated others were removed. Final share 48% (55% of marks).
2. **MCQ key balance.** The first build drew one key pool for bank MCQs and case parts together, which left the bank at a 7/9/10/6 split; the builder now balances the bank and the case parts separately (final 8/8/8/7).
3. **Word limits.** Five model answers were over the 2-mark limit (30–50 words, lint slack 60); all were tightened without losing a marking point.
4. **URL rule.** A case solution began "Use the data: …", which the pipeline lint reads as a `data:` scheme; reworded to "From the table, …".
5. **Diagrams after rasterising.** The neuron's "Cell body" leader ran along a dendrite (label moved); the auxin diagram's cell outlines were confusing and were removed, leaving auxin dots on the shaded side.
6. **Accuracy choices.** Knee jerk avoided (no relay neuron); "thyroxine" spelled as in the syllabus; abscisic acid described as inhibiting growth and linked with wilting and stomatal closure under water stress; the reflex timing items state that synaptic delays are ignored.

## Known gaps
- Narration audio is not generated (TTS stage).
- The touch-me-not response is called a nastic movement once in the notes, as the syllabus topic title uses "nastic"; questions do not test the word.
- Data in case passages are realistic illustrative values (stated in captions or passages where relevant), not cited measurements.
