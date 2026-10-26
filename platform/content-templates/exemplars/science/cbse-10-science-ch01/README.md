# Exemplar: CBSE Class 10 Science, Chapter 1 — Chemical Reactions and Equations

`cbse-10-science-ch01` · release v1 · academic year 2026-27 · family `science` · provenance `exemplar`

This is the gold standard for every science chapter the pipeline generates: CBSE combined Science for Classes 7–10, and the pilot subject. The `prompts/science/*.v1.md` templates use it as their few-shot source. The content-verifier also measures generated chapters against it. If a generated chapter is clearly worse than this one on any point below, it fails.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`. It holds 2 decks (21 + 22 slides), notes (7 sections), 32 flashcards and 77 questions. |
| `tests.json` | Two tests. `t_cbse10sci_ch01_short` is 20 marks in 40 min. `t_cbse10sci_ch01_long` is 40 marks in 90 min. |

All items have status `draft` until the Lead approves them, which flips them to `reviewed`.

## Why it is the standard

### 1. Deck shape and slide density
- **Two parts, not one long deck.** The chapter has 7 topics. A single deck of 25 or fewer slides cannot give each idea its own slide and still fit the 9–10 required slides (title, examples, checks, summary, exam tips). Part 1 covers t01–t03 and Part 2 covers t04–t07. Each part is complete on its own: it has its own goals, examples, checks, summary and exam tips.
- **One idea per slide.** Each heading states one idea. The body has at most 2–3 sentences or up to 6 bullets. Every equation sits on a slide that explains it.
- **Teaching order inside a topic:** a hook from daily life → the concept → a visual or experiment → a worked example → a check question. Checks come straight after the idea they test, never all together at the end.
- **Layouts used:** title 2, concept 14, two-column 2, diagram 8, example 6, check 7, summary 2, exam-tips 2.
- **Worked examples (6)** show every step as a numbered bullet, plus a table or equation as the visual. Balancing examples include the atom-count table at each stage, not only the final answer. Example 3 of Part 2 classifies one reaction three ways: displacement, redox and exothermic. That is the kind of integrated question the board asks.

### 2. Narration voice
- Narration is spoken Indian English, warm and direct: "Let us…", "Your turn…", "Think of…". It uses short sentences and is 31–87 words long (mean 67, limit 90).
- **No symbols or formulae in narration.** The text goes to text-to-speech (TTS), so it says "O two" or "calcium oxide", never `CaO` or `$\ce{...}$`. The validator rejects `$`, `\` and bare formulae in narration.
- The narration adds to the slide; it does not read it out. It gives the analogy (Lego bricks for conservation of mass, musical chairs for reactivity, partners swapping in a garba circle), the safety note, or the exam hint.
- Indian everyday contexts appear throughout: whitewash before Diwali, sparklers, curd, idli batter, LPG, iron gates in Chennai versus Jaipur, nitrogen-filled chips packets, GI buckets, steel tiffins, and a farmer's copper sulphate spray.

### 3. Visual choices (a visual on 32 of 43 slides; never more than 2 slides in a row without one)
| Kind | Count (decks) | Used for |
|---|---|---|
| `svg` | 10 | Apparatus and experiments: burning magnesium, heating ferrous sulphate, electrolysis of water, silver chloride in sunlight, reactivity ladder, iron nail in copper sulphate, ion-swap model, lead iodide precipitate, copper oxidation/reduction cycle, three-tube rusting experiment |
| `table` | 11 | Atom counts while balancing, "will it react?" predictions, precipitate colours, oxidation/reduction definitions, rust prevention, summaries |
| `chem` | 6 | A single headline equation with state symbols and arrow conditions |
| `flow` | 5 | Word → skeletal → balanced → state symbols; the three kinds of decomposition; the rancidity chain; the classification decision flow; the Part 2 route map |

The notes add 5 SVGs and 2 tables, so every notes section has a visual.

**SVG rules this exemplar follows.** The pipeline must follow them too:
- Use only the elements and attributes in `platform/shared/content/svg-allowlist.ts`. No `style` attributes, no `<style>` elements, and only fragment `url(#id)` references.
- Colours come only from `currentColor`, `none` and `var(--diagram-accent|muted|fill)`, so diagrams work in light and dark mode. **Colour words go in the labels** ("blue solution", "yellow precipitate"). A theme cannot show "yellow", and labels also help colour-blind students.
- Every diagram has a `viewBox` about 320 units wide, `font-size` of at least 11, `role="img"`, an `aria-label` and a `<title>`, and an `alt` that describes what the diagram *shows*, not what it *is*.
- **Ids are prefixed per diagram** (`fs-arrow`, `rs-arrow`, …). Several SVGs can be inlined on one page, so a repeated `id="arrow"` would make them clash.
- Subscripts in SVG text use Unicode (SO₂, PbI₂). Arrows such as "→" are avoided in SVG text because some fallback fonts lack them; the labels use words instead.
- Safety notes go in the `caption`.

### 4. Question bank: 77 items, all original
| Type | Count | Marks each | Why |
|---|---|---|---|
| mcq | 24 | 1 | Section A of the board paper; 7 are reused as deck checks |
| assertion-reason | 6 | 1 | Board VSA format; answer keys spread across a, a, b, a, c, d so "a" is not a reflex |
| true-false | 4 | 1 | Fast misconception probes for practice mode |
| fill-blank | 4 | 1 | Recall of key words, auto-graded with accepted variants |
| multi-select | 1 | 1 | Exo/endo sorting, all-or-nothing |
| match | 3 | 2 | Classifying several reactions at once; 0.5 per pair |
| numerical | 4 | 2 | Conservation of mass, electrolysis volume ratio, a coefficient by atom counting |
| short | 10 + 9 | 2 / 3 | Board Sections B and C |
| long | 6 | 5 | Board Section D: experiments with diagrams, compare/contrast, one evaluation task |
| case-based | 6 | 4 (1 + 1 + 2) | Board Section E: data tables, lab passages and everyday passages. Part (c) is always an internal-choice "either (i) or (ii)" |

- **Difficulty** by item count: d1 10 · d2 26 · d3 29 · d4 10 · d5 2.
- **Competency** by item count: recall 10 · understanding 24 · application 21 · analysis 19 · evaluation 3. Application or higher is **56% of items (63% of marks)**, against CBSE's 50% knowledge and understanding / 30% application / 20% analyse-evaluate-create. The share runs slightly high on purpose, because practice should push past recall.
- **Topic coverage** (items tagged): t01 9 · t02 13 · t03 21 · t04 16 · t05 12 · t06 10 · t07 14.
- **Labels must be honest.** Classifying a given reaction from a definition is *understanding*, not *application*. Nine items were relabelled during the verifier pass for this reason.
- Every item has a correct answer, a step-by-step `solution_md`, a marking scheme whose step marks add up to `marks`, topic tags, bloom level and expected time. Distractors are real misconceptions: decomposition vs combination, oxidising vs reducing agent, "air is mostly nitrogen anyway", and a true reason that does not explain the assertion (q028).

### 5. Chapter tests (`tests.json`)
- **Short test** (20 marks, 40 min): A = 4 × 1, B = 2 + 2 + 3, C = one 5-mark question chosen from two (choice group `C1`), D = one 4-mark case.
- **Long test** (40 marks, 90 min): A = 10 × 1, B = 2 + 2 + (2 or 2) + 3 + (3 or 3), C = 5 + (5 or 5), D = 2 cases × 4.
- Both use the CBSE sections A objective / B short / C long / D case-based. Internal choice is modelled with `choice_groups`, which always pair items of equal marks. Inside case-based questions the choice is written into child (c) as "either (i) or (ii)", because the schema has no child-level choice yet (see recommendations).

## Pitfalls the pipeline must avoid (seen in drafts of this exemplar or common in generated science)
1. **Unbalanced equations, or "balancing" by changing subscripts.** Every `\ce{... -> ...}` must balance. The only exceptions are skeletal equations shown on purpose and wrong MCQ options, and those must be labelled as such in the text around them.
2. **Wrong classification.** Displacement means a *free element* is a reactant; double displacement means two compounds swap. Neutralisation is double displacement *without* a precipitate. Most decompositions are endothermic, but **not all** (hydrogen peroxide decomposition is exothermic), and not every combination is exothermic (N₂ + O₂ → 2NO is endothermic).
3. **Wrong agents.** The oxidising agent is the substance that is *reduced*. Check every redox key twice.
4. **Wrong colours.** BaSO₄ and AgCl are white, PbI₂ is yellow, Cu(OH)₂ is blue, and Fe(OH)₃ is reddish-brown. CuSO₄ + Fe goes blue → pale green; CuSO₄ + Zn goes blue → colourless. Fumes from heating lead nitrate are brown (NO₂).
5. **Electrolysis polarity.** Hydrogen forms at the cathode (−), oxygen at the anode (+), in a 2 : 1 ratio by volume. A battery is drawn with the long thin plate as +.
6. **Copying.** Do not reuse textbook activity wording, intext or exercise questions (for example the familiar "why is the ribbon cleaned", "why do we paint iron", or "identify the substance oxidised in CuO + H₂"), or sample-paper items. Use the standard *experiments* (they are on the practical list), but describe them in fresh words and set fresh questions in new contexts.
7. **Formulae in narration**, LaTeX outside `$…$`, `\ce` missing its backslash, or JSON with double-escaped backslashes. The release validator catches all of these.
8. **Lazy visuals**: a decorative table on every slide to satisfy the "visual every 3 slides" rule. Visuals must carry information: apparatus, data or a process.
9. **Mislabelled competency** (see above) and difficulty clustered at 2–3. Make sure d4–d5 items exist: multi-step data analysis and evaluation of a claim.
10. **Generic cases.** A case passage needs data or a scenario that the questions actually use (tables of observations, volumes over time), and at least one part that requires analysis rather than recall.

## Content-verifier checklist for science chapters
Use this on every sampled item and on the deck as a whole.

**Accuracy**
- [ ] Every equation balanced (atoms and charge), with correct formulae and state symbols where asked; conditions on the arrow.
- [ ] Each reaction type, energy change and oxidising/reducing agent is correct.
- [ ] Observations (colours, gases, precipitates, smells) are correct and match the experiment.
- [ ] Every answer key re-solved from the stem alone; numerical answers have units and tolerance.
- [ ] Marking-scheme steps add up to `marks` and describe gradable steps (not only "correct answer").
- [ ] SI units and correct quantity symbols throughout.

**Alignment and pattern**
- [ ] Every item is tagged with a topic id from the chapter syllabus. No removed or formative-only topics (`board_assessed: false`) appear in board-pattern tests.
- [ ] The type mix covers the board pattern (MCQ, A-R, 2/3/5-mark constructed response, 4-mark case with internal choice).
- [ ] Competency labels are honest; application or higher is 45–65% of items.
- [ ] Difficulty spans 1–5, with at least 2 items at d4–d5.
- [ ] Chapter tests: section totals and choice groups add up to the paper total, and each choice group pairs equal marks.

**Deck**
- [ ] 12–25 slides per part, one idea per slide, and goals that match the syllabus learning outcomes.
- [ ] At least 2 worked examples with numbered steps; 3–5 checks placed after the idea they test; a summary and an exam-tips slide.
- [ ] A visual at least every 3 slides, and each visual carries information.
- [ ] Narration on every slide is 90 words or fewer, spoken style, with no formulae or symbols, and adds to the slide text.
- [ ] Indian everyday contexts appear; reading level suits the class.

**Rendering**
- [ ] All `$…$` and `\ce{}` parse in KaTeX with mhchem.
- [ ] SVGs pass the allow-list, use palette colours only, have a viewBox, a `<title>` and an `alt`, and use per-diagram id prefixes. Labels are readable at 360 px.

**Originality and safety**
- [ ] No sentences or questions from NCERT, other textbooks or board papers. Standard experiments are described in fresh words.
- [ ] Lab safety notes are present where hazards exist: flames, lead compounds, gases, bright light.

## Verifier pass (2026-10-26)
After writing, the author re-solved all 77 questions (and the 18 case-based child parts) from the stem alone and compared each result with the key. Automated checks ran alongside, using scratch scripts outside the repo:
- KaTeX 0.19.1 + mhchem parsed **229 math strings with 0 failures**.
- An atom-balance parser checked **132 reaction equations as balanced**. The 12 unbalanced ones are intentional skeletal equations or wrong MCQ options, each reviewed by hand. The rust equation, which contains *x*, was checked by hand.
- **15 SVGs** were checked against `svg-allowlist.ts`, palette colours, viewBox, title and unique ids, with **0 failures**.
- Narration on 43 slides is at most 87 words.

Findings fixed:
- `r'…'` strings in the authoring source were plain calls, not `String.raw` templates. They would have dropped every backslash (for example `\ce` became `ce`). They were converted, and the validator now flags `ce{` without a backslash.
- The bulk conversion briefly corrupted option and node ids `'r'` in three match questions and one flow visual. They were repaired, and the release re-validated.
- q024 solution had the typo "oxidisation".
- q046 used an mhchem fragment with a trailing `+`. It was rewritten as `\ce{2C4H10} + x\,\ce{O2} \rightarrow …`.
- q016: option (d) mentions an escaping gas. The reaction really does release ammonia, so the solution now explains why that does not account for the cooling.
- Deck 2, s16: the narration said silver blackens "for similar reasons". It now says silver reacts with substances in moist air. (The black layer is silver sulphide, not an oxide.)
- Competency relabelled from application to understanding on 9 items: q006, q010, q031, q040, q041, q058, q062, q066 and q070. q063 was raised to difficulty 5.
- SVG layout: the electrolysis label overlapped the electrodes, the ferrous sulphate label used a "→" glyph that the fallback font could not draw, and the hydrogen row of the reactivity series was crowded. All were fixed after a raster preview.
