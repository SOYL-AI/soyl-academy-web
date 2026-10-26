# subject-producer (CBSE 10 Science, batch C) — chapters 10–13 hand-authored — 2026-10-27

Status: **done** — four publish-quality chapters, all `status: "draft"` pending review. This completes the pilot subject’s board-assessed chapters together with the exemplar (ch01), batch A (ch02–ch05) and batch B (ch06–ch09, in progress on its own branch).

Branch: `platform/subject-producer/cbse-10-science-c` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-science-c`). `origin/platform/main` was merged in at 19c2977, which brought the stricter M2 lint; all four chapters were re-gated against it.

## What changed

| Path | What |
|---|---|
| `platform/content/authored/science/cbse-10-science-ch10/` | The Human Eye and the Colourful World — release.json, tests.json, README.md |
| `platform/content/authored/science/cbse-10-science-ch11/` | Electricity — release.json, tests.json, README.md |
| `platform/content/authored/science/cbse-10-science-ch12/` | Magnetic Effects of Electric Current — release.json, tests.json, README.md |
| `platform/content/authored/science/cbse-10-science-ch13/` | Our Environment — release.json, tests.json, README.md |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-science-c.md` | This note |

Every release: v1, academic year 2026-27, provenance `{ origin: "human", author: "claude-opus-5-5 (subject-producer)", model: null }`, `build.checks` filled from the validation runs. No files outside the owned paths were changed.

Commits: 310b6c2 (ch10), 19c2977 (merge of `platform/main`), 13b56f0 (ch11), be31504 (ch12), 081aa7d (ch13). The ch13 commit message also says it refreshes the `build.checks` of ch10–ch12. That is wrong: the rebuild produced identical files, and only ch13 is in that commit.

## Counts

| | ch10 Eye & colourful world | ch11 Electricity | ch12 Magnetic effects | ch13 Our environment |
|---|---|---|---|---|
| Decks (slides) | 2 (21, 24) | 3 (20, 21, 18) | 2 (20, 21) | 2 (19, 18) |
| Slides with a visual | 33 / 45 | 42 / 59 | 31 / 41 | 27 / 37 |
| Deck visuals by kind | table 18, svg 13, flow 1, plot 1 | table 30, svg 10, plot 1, flow 1 | table 19, svg 10, plot 1, flow 1 | table 15, svg 5, flow 5, chem 2 |
| Distinct hand-written SVGs | 13 | 11 | 10 | 5 |
| Worked examples / checks | 5 / 7 | 12 / 9 | 5 / 6 | 5 / 6 |
| Narration words (min–max, mean) | 20–73, 55 | 12–71, 52 | 12–69, 53 | 11–67, 48 |
| Notes sections | 6 | 6 | 6 | 4 |
| Flashcards | 32 | 30 | 30 | 30 |
| Questions | 80 | 90 | 79 | 70 |
| mcq · A-R · T/F · fill · match · num | 30 · 8 · 5 · 4 · 2 · 6 | 28 · 6 · 5 · 4 · 2 · 19 | 32 · 7 · 6 · 3 · 2 · 6 | 26 · 7 · 4 · 4 · 2 · 5 |
| short 2 / short 3 / long 5 / case 4 | 8 / 6 / 5 / 6 | 8 / 7 / 5 / 6 | 7 / 5 / 5 / 6 | 6 / 5 / 5 / 6 |
| Difficulty d1/d2/d3/d4/d5 | 15/30/28/6/1 | 27/37/17/7/2 | 23/24/22/9/1 | 24/24/16/6/0 |
| Application or higher (items / marks) | 50% / 59% | 59% / 72% | 49% / 54% | 50% / 60% |
| MCQ keys a/b/c/d | 8/8/7/7 | 7/7/7/7 | 8/8/8/8 | 7/7/6/6 |

Totals: **9 decks, 182 slides, 39 distinct SVG diagrams (plus 3 plots), 122 flashcards, 319 questions** (43 numerical items, 24 case-based), 8 chapter tests.

- Every case has 3 parts (1 + 1 + 2); part (c) is an either/or modelled with `ChildQuestion.alternatives` (`c-ii`), and every passage has `passage_origin: "soyl-original"`. `word_limit` is set only where the model answer is prose, not on numerical answers or multi-part 5-mark answers.
- Tests follow the exemplar and the default blueprints: short = A 3 mcq + 1 A-R, B 2+2+3 (`short` items), C one of two 5-mark, D one case (20 marks, 40 min); long = A 8 mcq + 2 A-R, B 2+2+(2|2)+3+(3|3), C 5+(5|5), D two cases (40 marks, 90 min). Short and long tests are disjoint; `blueprint_id` is null.
- **Removed and formative-only topics:** ch10 excludes the colour of the Sun at sunrise and sunset (removed for 2026-27), and so also leaves out danger-signal colours. ch12 t06 (motor, induction, generator) is `board_assessed: false`. It has one slide marked "Beyond the board paper", one notes section, one flashcard and 3 practice items labelled "(Formative assessment.)", and **no t06 item appears in a test**.

## Validation (final run, all four chapters)

```
$ npm test -w @soyl/content-templates -- --reporter=verbose   (ch10–ch13 lines)
 ✓ … science/cbse-10-science-ch10 > is a valid ChapterRelease
 ✓ … science/cbse-10-science-ch10 > is named after its chapter and has a README
 ✓ … science/cbse-10-science-ch10 > uses only topics from the chapter syllabus
 ✓ … science/cbse-10-science-ch10 > decks meet the visual lesson rules
 ✓ … science/cbse-10-science-ch10 > has enough flashcards and practice questions
 ✓ … science/cbse-10-science-ch10 > writes language subjects in their own script (NFC, well-formed, no Latin runs, TTS-safe narration)
 ✓ … science/cbse-10-science-ch10 > has a short and a long chapter test drawn from its own questions
 (same 7 ✓ for ch11, ch12, ch13)
 Test Files  1 passed (1)
      Tests  113 passed (113)

$ npm run content -- lint --exemplars        (science lines)
ok   cbse-10-science-ch01: 0 error(s), 1 warning(s)     ← exemplar, not in this batch (new M2 rule)
ok   cbse-10-science-ch02 … ch05: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch10: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch11: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch12: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch13: 0 error(s), 0 warning(s)
```

Scratch validator (KaTeX 0.19.1 + mhchem strict parse; a rule for maths command names without a backslash, aligned with the M2 `BARE_COMMAND` list; numeric `=`/`≈` chains recomputed **after stripping units**, skipping links between different units and percentages; SVG allow-list incl. `SVG_RULES.classPattern`, palette with named hues, viewBox, `<title>`, font size ≥ 11, per-page unique ids; narration length, symbols and unit abbreviations; check slides → objective items; numerical answers stated in their solutions):

```
ch10 {"math":209,"arith":42,"svgs":26 (13 distinct),"narr":{"slides":45,"max":73},"errors":0}
ch11 {"math":652,"arith":186,"svgs":21 (11 distinct),"narr":{"slides":59,"max":71},"errors":0}
ch12 {"math":52,"arith":33,"svgs":20 (10 distinct),"narr":{"slides":41,"max":69},"errors":0}
ch13 {"math":65,"arith":10,"svgs":10 (5 distinct),"narr":{"slides":37,"max":67},"errors":0}
```

Independent numeric re-solve: a separate solver module per chapter recomputes each numerical item from physics or ecology functions written independently of the question text, plus other stated numbers (worked examples, written numericals, case tables, diagram angles):

```
ch10 numerical items re-solved: 9/9;   other stated numbers re-computed: 36/36  (incl. the case-q076 prism table vs Snell’s law, n = 1.5)
ch11 numerical items re-solved: 24/24; other stated numbers re-computed: 61/61  (Ohm, resistivity, series/parallel, Joule heating, P, kWh, ₹ bills)
ch12 numerical items re-solved: 9/9;   other stated numbers re-computed: 25/25  (incl. every right-hand / left-hand rule answer as a cross product)
ch13 numerical items re-solved: 8/8;   other stated numbers re-computed: 18/18  (10 percent law, magnification, waste, O-atom balance of the ozone equations)
```

Every SVG was rasterised (resvg, theme tokens and named hues substituted) and checked by eye; layout fixes are listed in each README.

## Diagrams: how they were made
- **Ray optics (ch10)** are computed, not sketched. Eye defects use paraxial thin-lens tracing through the spectacle lens and the eye lens, so corrected rays really meet on the retina. Prisms and the raindrop use exact Snell refraction: the prism diagram’s i, r, e and δ are quoted on the slide; the drop uses the Descartes ray. Exaggerations (dispersion spread, star bending) are stated in captions.
- **Circuits (ch11, ch12)** use a small NCERT-style symbol library: cell (long + plate), battery, plug key open/closed, zigzag resistor, rheostat, ammeter, voltmeter, bulb and joints. Meter + terminals face the + side of the supply, and current arrows follow conventional current.
- **Field lines (ch12)** are traced numerically with RK4: point poles for the bar magnet, summed line-current fields for the loop section and the solenoid.

## Verifier pass (summary; details in each chapter README)
1. **A wrong direction caught (ch12 q039):** with the field to the right and the current into the page, the draft said the force was upwards; the cross product gives downwards. After this, every rule-direction answer in ch12 — deck examples, MCQs, the case table and both force diagrams — was rechecked as a cross product in explicit coordinates.
2. **Lost backslashes (ch10):** worked-example bullets written in ordinary JS strings turned `\dfrac` and `^\circ` into plain letters. KaTeX still parsed them, so the gate did not notice. A validator rule for bare command names caught 30 spans; the authoring sources now use raw templates.
3. **Lint after merging main (ch11):** the new `BARE_COMMAND` rule read $Q = ne$ as a lost `\ne`; it is now written $Q = n e$.
4. **Hidden answers:** thin-space separators (21\,600 J) stopped the lint’s "solution states the answer" check from finding the key. They were removed from all solutions.
5. **Convention clash (ch10):** physiological near-point data (9–13 cm for young people) contradicted the board’s "about 25 cm". The presbyopia plot and the case data now follow the convention.
6. **Competency honesty:** first drafts of ch10, ch12 and ch13 were at 41%, 37% and 41% application or above. Twenty-four items were rewritten into genuinely new contexts (8 + 10 + 6), not relabelled; the finals are 50%, 49% and 50%. ch11 is 59%, within the 45–65% band, because it is the board’s most numerical chapter.
7. **Ambiguous assertion–reason items** were tightened: ch10 q020 (bifocals) and ch12 q062 (a fuse does not protect an unearthed user).
8. **Balance:** MCQ keys planned or rebalanced (a/b/c/d within 1–2 of each other); true/false keys rebalanced in ch11 and ch13.
9. **Diagram fixes after rasterising:** retina arcs drawn on the wrong side; series-circuit ammeter polarity; solenoid lines traced one way only; a sunlight arrow pointing out of the energy pyramid’s apex; about 25 label and overlap fixes.

## Known gaps / follow-ups
- **Hue tokens:** diagrams use `--diagram-red|blue|green|yellow|brown` (ADR-009). The palette has no violet, indigo or orange, so the ch10 spectrum labels I and V and draws them blue-dashed and grey-dashed, with letters V I B G Y O R on the screen. A `--diagram-violet` (and `--diagram-orange`) token would let spectra be drawn true to colour.
- **Illustrative data:** eye-camp near points, the presbyopia curve, bill tariffs (flat rate per unit), pesticide ppm values and the town’s waste composition are realistic but illustrative; passages say "typical" or "illustrative" where relevant.
- **Model answers that need drawings** (ray diagrams, circuits, field lines, food webs) are described in words; graders should accept any correct drawing.
- **Chapter-test blueprints** are not linked (`blueprint_id: null`), as for the exemplar and batch A.

## Recommendations (for pipeline-engineer / Lead)
1. **`solution.answer` lint:** normalise LaTeX thin spaces between digits (`21\,600` → `21600`) before searching the solution for the key, as the rule already does for commas.
2. **`BARE_COMMAND`:** `ne` and `pi` are common physics products (`n e`, `p i`). The rule is right to be strict, but the questions prompt should say "write products of single-letter symbols with a space ($Q = n e$)".
3. **Stage-5 verify for directions:** rule-direction items (right-hand thumb rule, Fleming’s left-hand rule) are the error class most likely to slip past every textual check; a verifier template that asks the model to set up coordinates and take a cross product would catch them, as the scratch solver did here.
4. **Plot spec:** bar series have no category labels, so appliance-energy charts were given as tables. Optional `categories` on bar series would help bills and data cases.
5. **Formative-only topics:** the questions prompt could say explicitly "label `board_assessed: false` items in the stem and never use them in board-pattern tests", as done in ch12.

## Decisions made
- Decks split by topic: ch10 (t01–t02 | t03–t06), ch11 (t01–t02 | t03–t04 | t05–t06), ch12 (t01–t02 | t03–t06 with one formative slide), ch13 (t01–t02 | t03–t04).
- Authored in a scratch toolkit (`String.raw` sources, a builder, the validator, a per-chapter independent solver, a rasteriser, and computed-geometry libraries for optics, circuits and field lines). The toolkit is not committed; the JSON in git is the source of truth (D-026).

## Needs from owner
None.
