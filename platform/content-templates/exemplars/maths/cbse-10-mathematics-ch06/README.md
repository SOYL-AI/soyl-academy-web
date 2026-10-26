# Exemplar: CBSE Class 10 Mathematics, Chapter 6 — Triangles

`cbse-10-mathematics-ch06` · release v1 · academic year 2026-27 · family `maths` · provenance `exemplar`

This chapter is the gold standard for every maths chapter the pipeline generates, from Class 7 arithmetic to Class 12 calculus. The `prompts/maths/*.v1.md` templates use it as their few-shot source, and the content-verifier measures generated chapters against it. If a generated chapter is clearly worse than this one on any point below, it fails.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (23 + 23 slides), notes (8 sections), 34 flashcards, 78 questions (163 marks). |
| `tests.json` | `t_cbse10math_ch06_short` (20 marks, 40 min) and `t_cbse10math_ch06_long` (40 marks, 90 min). The two tests share no questions. |

Every item has status `draft` until the Lead approves it; approval flips it to `reviewed`.

## Scope (2026-27 syllabus)
The chapter has three topics: t01 similar figures, t02 the Basic Proportionality Theorem (BPT) and its converse, and t03 the AA/SSS/SAS criteria with applications. The syllabus file lists two **removed** topics: *areas of similar triangles* and *proofs of Pythagoras' theorem and its converse*. Neither appears anywhere, not even as a distractor or a "fun fact". The proof of BPT is in scope and examined. The converse of BPT and the three criteria are **statements only**, and the deck and notes say so. Standard (041) and Basic (241) share this syllabus, so the bank serves both: d1–d3 items suit Basic, and d4–d5 items stretch Standard.

## Why it is the standard

### 1. Deck shape and pacing
- **Two complete parts.** Part 1 covers similar figures and BPT (t01–t02); Part 2 covers the criteria and applications (t03). The BPT proof alone takes 5 slides, so one deck of 25 or fewer slides could not keep one idea per slide. Each part has its own goals, examples, 4 checks, a summary and exam tips.
- **Teaching order inside a topic:** a picture or everyday hook, then the statement, then a visual, then a worked example, then a check. Checks sit straight after the idea they test (Part 1: s06, s14, s20, s21; Part 2: s10, s15, s19, s21) and always point at objective questions.
- **Layouts:** title 2, concept 6, two-column 1, diagram 16, example 9, check 8, summary 2, exam-tips 2. A visual appears on 31 of 46 slides, and there are never more than 2 slides in a row without one.
- **Worked-example pacing (9 example slides).** Each example has the problem in `body_md` and numbered `**Step n —**` bullets, one operation per step. It ends with a **check** line (substitute back, or test that all ratios agree) or a **contrast** line (what changes if a number changes). Numeric examples use the part-to-whole form when a whole side is given, so the algebra stays light. The examples are:
  1. a missing length from BPT;
  2. a converse decision, with a contrast case;
  3. a proof that three parallel roads cut two lanes in the same ratio (Pune), followed by a numerical use of it;
  4. unknown sides from AA, with an explicit scale factor;
  5. a median cut by a parallel line, proved with similarity;
  6. the height of the Qutub Minar from shadows;
  7. a lamp post on a Pune street, done in both directions (shadow from distance, and distance from shadow).

### 2. How proofs are chunked across slides
A proof is spread over **one slide per logical step**, and each slide has its own figure that highlights the triangles in play:

| Slide | Content | Visual |
|---|---|---|
| Given / To prove / Construction | three bullets | full construction, dashed |
| Step 1 | one area ratio, numbered (1) | only △ADE and △BDE shaded, with height EM |
| Step 2 | the other ratio, numbered (2) | △ADE and △DEC shaded, with height DN |
| Step 3 | the one place the parallel line is used, numbered (3) | △BDE and △CED shaded |
| Step 4 | the chain (1) → (3) → (2) with `\overset{(1)}{=}`, then derived forms | none (it is the conclusion) |

Two-part worked proofs (the parallel roads in Part 1, the median in Part 2) follow the same rule. Part (1) sets up the construction and the first similarity, and part (2) finishes the proof and uses it. The narration says why each step is needed ("this is the only place the parallel line is used"), not what the line says. The exam-tips slide, the notes' exam tips and q065's marking scheme give the same step-mark split (statement with given and to prove 1, figure with construction 1, each area ratio 1, equal areas with reason and conclusion 1), so what is taught and what is marked agree.

### 3. Narration voice
Narration is spoken Indian English, warm and direct, 59 words on average (maximum 72; the limit is 90). **It contains no symbols, LaTeX or abbreviations.** Vertices are spelled with spaces ("A D over D B"), criteria are said in words ("A A", "side angle side"), and "BPT" becomes "the theorem", because TTS reads "BPT" and "SAS" badly. Each narration adds something the slide does not show: a ladder rung for BPT, a passport photo and a poster for similarity, a compass swing for the SSA trap, or why a lamp post differs from the sun. The Indian contexts in the chapter are the Qutub Minar, India Gate, the Vijay Stambh, Pune streets, a Durga Puja pandal, the Narmada, an A-frame ladder in Kochi, ten-rupee coins, a Surat print shop and a Bhopal flagpole.

### 4. Visuals and geometry-spec conventions
| Kind | Decks | Notes | Questions | Used for |
|---|---|---|---|---|
| `geometry` | 24 | 5 | 8 | Every triangle figure, construction, shadow, lamp post, mirror and river set-up |
| `table` | 5 | 2 | 0 | Congruent vs similar, the criteria compared, the correspondence read-out, summaries |
| `flow` | 2 | 1 | 0 | "Which criterion?" decision chart and the five-step proof frame |

There is no raw SVG: every figure is a `geometry` spec, so it is exact and re-renderable. The conventions below are the rules the pipeline must follow, and the validator checks them:

- **Coordinates:** mathematical axes. The origin is bottom-left and **y points up**. All points lie inside `[0, width] × [0, height]`. Canvases are about 8–14 units wide and 4–11 units tall, landscape where possible, and points stay at least 0.3 units from the edge.
- **Compute coordinates; never guess them.** The authoring source builds every figure from its defining data: sides via the cosine rule, angles, `lerp(A, B, t)` for division points, and the foot of a perpendicular by projection. Coordinates are rounded to 3 decimals. As a result:
  - parallel lines really are parallel (slope tolerance 0.2%);
  - a point described as dividing a side 2 : 3 really does;
  - a `right: true` angle measures 90°, and a "65°" label measures 65°.
- **To scale, with one scale per figure.** Numeric length labels such as `"2.4 cm"`, `"120 m"` or `"7.5"` all use one drawing-units-per-unit factor within a figure. A figure that cannot be drawn to one scale (the Qutub Minar beside a 1.6 m student) uses two triangles of the **same shape** at different scales, and the caption says so.
- **Bases are deliberately not always horizontal**, as in the BPT and median figures, so that students do not learn "parallel means horizontal". Apexes are kept acute where a perpendicular foot must fall inside a side.
- **Labels:**
  - Point names are single capitals (C1 and C2 for the two SSA positions).
  - Segment labels give a length with its unit, a role ("sun ray", "height EM") or `?` for the unknown.
  - Angle labels are degrees, or Greek letters (α, β, θ) to mark equal angles without giving values.
  - Unknown lengths are never labelled with their answer.
- **Highlighting:** `polygons` with `fill: true` pick out the triangles a proof step talks about, and `dashed` marks constructions and light rays.
- **Helper points:** ground lines and road ends need endpoints (G1, G2, L1, …). The current spec has no way to hide their labels; see the recommendations in the handoff.
- **Alt text** states what the figure shows, including the given lengths and which lines are parallel. It never just says "a triangle".
- **Table cells are plain text with Unicode maths** (△, ∥, ∼, ∠) because the contract does not say whether cells render Markdown/LaTeX.

### 5. Question bank: 78 items, all original
| Type | Count | Marks | Why |
|---|---|---|---|
| mcq | 20 | 1 | Section A. Distractors are real errors: alphabetical correspondence, part-vs-whole ratio, inverted shadow ratio, stopping at AO instead of AC |
| assertion-reason | 6 | 1 | Section A. Keys are spread a, b, d, a, c, d. q022 is a true reason that does not explain the assertion |
| true-false | 5 | 1 | Quick misconception probes |
| fill-blank | 5 | 1 | Recall plus one-step use, with accepted variants (`3/7`, `3:7`) |
| numerical | 10 | 1–2 | Auto-graded computations with tolerance and unit. One is d5 (the crossing strings: q045) |
| short | 10 + 8 | 2 / 3 | Sections B and C: computations, justifications, correspondence, a converse test, two-step SAS proofs |
| long | 8 | 5 | Section D: the BPT proof, three original proofs (trapezium converse, double parallel, quadrilateral → parallelogram), a crossed-SAS analysis, two applications, and one evaluation of a classmate's wrong method |
| case-based | 6 | 4 (1 + 1 + 2) | Section E. Each case is real data (tower shadows, a park with paths, a logo print shop, a mirror method, an A-frame ladder, a pinhole camera). Part (c) is always "Either (i) … Or (ii) …" |

- **Difficulty:** d1 7 · d2 26 · d3 28 · d4 13 · d5 4.
- **Competency:** recall 7 · understanding 27 · application 21 · analysis 22 · evaluation 1. Application or higher is **56% of items (71% of marks)**, against the Standard paper's 54 / 24 / 22.
- **Labels are honest.** A routine one-step use of BPT or a scale factor in its textbook form is *understanding*. *Application* needs a new context or a multi-step plan, and *analysis* needs the student to find hidden structure (a crossed correspondence, an auxiliary line, two similar pairs). Sixteen items were relabelled from application to understanding in the verifier pass for this reason.
- **Topic tags:** t01 15 · t02 27 · t03 48. t03 dominates, as it does in board papers.
- **Proof marking.** Every proof's marking scheme has 4–5 gradable steps. Each step is a statement plus its reason (for example "BPT in △ADC: AE/ED = AG/GC", or "construction: diagonal AC and EG ∥ DC"), never just "correct proof".
- **Originality.** No item reuses an NCERT example or exercise, an RD Sharma or RS Aggarwal problem, or a CBSE sample-paper item. Familiar *configurations* were deliberately changed:
  - the classic girl-walking-from-a-lamp-post problem became a fixed-distance shadow problem done in both directions, plus a two-person comparison;
  - the "CA² = CB·CD" proof became a numeric AA item (q014);
  - the median/altitude/bisector ratio proofs were replaced by the median-cut-by-a-parallel proof, the trapezium converse, the quadrilateral-to-parallelogram proof and the crossed SAS.

### 6. Chapter tests (`tests.json`)
Both tests follow the CBSE Mathematics board layout: **A** objective 1-mark, **B** 2-mark, **C** 3-mark, **D** 5-mark, **E** 4-mark cases. Internal choice is a `choice_group` of two equal-mark items with `attempt: 1`, as in the board paper.
- **Short** (20 marks, 40 min): A 4 × 1 · B 2 + (2 or 2) · C (3 or 3) · D (5 or 5) · E 1 case.
- **Long** (40 marks, 90 min): A 7 × 1 · B 2 + 2 + (2 or 2) · C 3 + 3 + (3 or 3) · D 5 + (5 or 5) · E 2 cases.

`blueprint_id` is `null` because no chapter-test blueprint exists yet.

## Pitfalls the pipeline must avoid (seen in drafts of this exemplar or common in generated maths)
1. **Removed topics leaking in.** Areas of similar triangles ("ratio of areas = square of ratio of sides") and Pythagoras proofs must not appear, not even in a distractor. Check the syllabus `removed_topics` for every chapter.
2. **Wrong correspondence.** Writing ratios from alphabetical order instead of the order in the similarity statement. Every similarity in a solution must be written in matching order and checked letter by letter.
3. **Part vs whole.** "AD/DB = DE/BC" is wrong. The parallel segment needs similarity (DE/BC = AD/AB), not BPT.
4. **Impossible figures and data.** Giving angles *and* all three sides that violate the sine or cosine rule, or numbers that make a "scalene" triangle isosceles. With no figure, data must still be consistent. Compute it.
5. **Hand-guessed coordinates.** A BPT figure whose "parallel" line is 3° off, a "right angle" at 87°, a foot of a perpendicular that lands outside the side or on top of a vertex (an early draft of this exemplar had M and N almost on A, because the apex was nearly 90°). Always compute coordinates.
6. **Wrong side facts in solutions.** The verifier pass caught q026's solution quoting angles of 88.6° and 51.4°; the correct values are 91.4° and 48.6°, because the angle opposite the longest side is obtuse. **Recompute every number that appears in a solution, not only the final key.**
7. **Lost backslashes.** Authoring LaTeX in a plain quoted string drops `\` (`\dfrac` → `dfrac`). Author with `String.raw` (one q072 stem was caught and fixed), and let the validator flag bare `dfrac{`, `triangle`, `parallel` and similar.
8. **Floating-point noise in answers.** Write 4.8, not 4.800000000000001. Round to the precision the stem implies.
9. **Narration that TTS mangles.** "BPT", "SAS", "△ABC", "=" and LaTeX are not allowed. Spell vertices out with spaces.
10. **Inflated competency labels** (see section 5), and difficulty bunched at d2–d3. Each chapter needs d4–d5 items: auxiliary constructions, crossed correspondences, two-similarity problems, and evaluation of a wrong method.
11. **"Prove" questions with no gradable steps**, such as a long answer with a one-line marking scheme.
12. **Copying.** Familiar textbook configurations (lamp post with a walking speed, altitudes of a triangle, ratio of medians or bisectors) must be re-imagined, not re-numbered.

## Content-verifier checklist for maths chapters
**Accuracy**
- [ ] Every key re-solved from the stem alone. Every number in `solution_md` and `model_answer_md` recomputed. Units and tolerance checked.
- [ ] Given data is internally consistent (triangle inequality; angle sum; given angles and sides agree with the sine and cosine rules; ratios as stated).
- [ ] Every similarity statement is written in matching vertex order, and the ratios follow that order.
- [ ] Proof steps are valid, in a sensible order, and each has a reason. Constructions are stated before they are used.
- [ ] Marking-scheme steps add up to `marks`, use steps of 0.5, and are gradable. Proofs have step marks. Case part (c) covers both alternatives.

**Alignment and pattern**
- [ ] Topic ids come only from the chapter syllabus; no `removed_topics` content; statement-only results are not asked to be proved.
- [ ] Types and marks match the board pattern (1-mark MCQ/AR, 2/3/5-mark constructed response, 4-mark case 1 + 1 + 2 with internal choice).
- [ ] Competency labels are honest; application or higher is 45–65% of items; difficulty spans 1–5 with at least 3 items at d4–d5.
- [ ] Chapter tests: section totals and choice groups add up to the paper total; choice groups pair equal marks; short and long tests are disjoint.

**Deck**
- [ ] 12–25 slides per part; one idea per slide; goals taken from the learning outcomes.
- [ ] At least 2 worked examples with numbered steps and a final check; proofs chunked one step per slide with a highlighting figure; 3–5 checks placed after the idea, pointing at objective items.
- [ ] A visual at least every 3 slides, each carrying information; geometry or plot specs before raw SVG.
- [ ] Narration is 90 words or fewer, spoken, with no symbols, LaTeX or abbreviations, and adds to the slide.

**Rendering**
- [ ] Every `$…$`, `math[]` and `formulas[].latex` parses in KaTeX (strict); no bare LaTeX outside `$…$`; no commands missing their backslash.
- [ ] Geometry specs reference only defined points, stay inside the canvas, and satisfy the stated relations (parallel, ratios, right angles, angle labels); length labels are to one scale or the caption says otherwise; unknowns are not labelled with their answers. Plot specs: functions defined on the domain, axes ranges contain the plotted points.

**Originality**
- [ ] No NCERT text, examples or exercises; no reference-book or board-paper items; familiar configurations re-imagined. Indian contexts are used and varied.

## Verifier pass (2026-10-26)
After writing, the author re-solved all 78 questions and the 18 case parts from the stem alone. A scratch validator then checked the built JSON independently. It is described in the handoff note (`docs/platform/handoffs/2026-10-26-exemplar-maths-m1.md`) so pipeline-engineer can port it to the lint stage. Results:
- **KaTeX:** 1298 math strings, 0 failures. There were no missing backslashes and no LaTeX outside `$…$`.
- **Geometry:** 32 specs, all referenced points defined and inside the canvas, all right-angle marks and degree labels measured, and length labels to one scale. **37 figure-specific relations** hold, including parallels, ratios, feet of perpendiculars, collinear light rays, and to-scale river and mirror set-ups. All 32 figures were also rasterised and checked by eye.
- **Numeric re-solve:** 86/86 checks pass, covering every objective key, numerical value, blank, model-answer number and case child. The five pure proofs (q047, q052, q065, q066, q070) were checked by hand.
- **Narration:** 46 slides, at most 72 words.

Findings fixed:
1. **q026**: the solution quoted △ABC's angles as about 88.6° and 51.4°. The correct values are 91.4° and 48.6°, because ∠A is obtuse. The re-solve now also checks the angles in the solution text.
2. **q072**: the stem was a plain quoted string, so `\dfrac` would have lost its backslash. It is now `String.raw`.
3. **BPT construction figures** (Part 1 s09–s11, q065): with a nearly right apex, M and N sat on top of A. The apex was changed to about 57°, so the feet fall inside AD and AE, and the validator now checks this.
4. **Narration**: three slides used "BPT", which TTS reads badly. They now say "the theorem".
5. **Competency**: 16 routine one-step items (q005, q009, q012, q013, q016, q024, q031, q034, q035, q037, q038, q039, q046, q048, q049, q050) were relabelled from application to understanding. Application or higher fell from 77% to 56% of items.
6. **Case-based model answers** were rewritten from terse keys into full answers per part.
