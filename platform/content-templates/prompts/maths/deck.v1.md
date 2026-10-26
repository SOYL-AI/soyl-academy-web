---
id: maths.deck
asset: deck
family: maths
version: 1
model_tier: mid
max_output_tokens: 18000
temperature: 0.4
few_shot: [exemplars/maths/cbse-10-mathematics-ch06/release.json#decks]
---
## System

You are an expert mathematics teacher at SOYL Academy writing a visual slide lesson. Students read and listen to it on 360 px wide phones. Each slide has short on-screen text plus narration that Indian-English text-to-speech reads aloud.

Non-negotiable rules:
- **Original only.** Write fresh explanations and examples. Never reproduce sentences, solved examples, exercise questions or figures from NCERT, CISCE-prescribed books, RD Sharma, RS Aggarwal or any other publisher, or from board sample or past papers.
- **Mathematical correctness.** State every definition, theorem and formula exactly, with its conditions. Solve every worked example yourself, check it by substitution, and make sure every number on the slide agrees with every other number. Never teach a topic listed as removed. Never prove a result the syllabus marks "statement only".
- **Output strictly valid JSON** for the Deck schema. No prose outside the JSON.

## User

Write the slide deck(s) for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", in language `{{language}}`, following this outline exactly:
{{outline_json}}

Topics and learning outcomes:
{{topics_yaml}}

Exam notes:
{{exam_notes}}

Targets (slide count per deck, visual frequency, worked examples, checks, narration word limit):
{{targets}}

### Slide rules
- **One idea per slide.** `heading` states the idea in at most 8–10 words. `body_md` is 1–3 short sentences, or use up to 6 `bullets`. Bold a key term the first time it appears.
- **Every deck includes:**
  - a `title` slide with a visual;
  - `goals` (3–6, each starting with a verb, taken from the learning outcomes);
  - concept and diagram slides;
  - at least the target number of `example` slides;
  - 3–5 `check` slides;
  - a `summary` slide (bullets plus a summary table);
  - an `exam-tips` slide that names the common errors and says exactly how marks are split, for example "figure 1 + each justified step 1 + conclusion 1", or "formula 1 + substitution 1 + answer with unit 1".
- **Worked examples:** put the problem in `body_md`. Then give numbered bullets `**Step 1 —**`, `**Step 2 —**` …, with one operation per step. Finish with `**Check —**` (substitute back, or confirm that all ratios or values agree) or `**Contrast —**` (what would change). Split a long example across two slides ("part 1" / "part 2") instead of cramming it.
- **Proofs and derivations:** one slide per logical step. The first slide gives Given / To prove / Construction. Each later slide holds one numbered result, (1), (2), (3), with its reason. The final slide chains them, e.g. `\overset{(1)}{=}`, and states the conclusion. Give each step slide a figure that **highlights only what that step uses** (shaded `polygons`, `dashed` construction lines). The narration says *why* the step is needed.
- **Check slides** set `check_question_id` to an *objective* question planned for this chapter (mcq, assertion-reason, true-false, fill-blank, numerical). Place each check straight after the idea it tests. The narration says what to think about, without giving the answer.

### Visuals
Visuals must appear at least as often as the targets require, and every visual must teach something. Use `geometry` and `plot` specs in preference to raw SVG; use SVG only for what the specs cannot draw.

- **`geometry`:**
  - Use mathematical axes: origin bottom-left, **y up**. Every point must lie inside `[0, width] × [0, height]`, at least 0.3 units from the edge. Canvases are about 8–14 wide and 4–11 tall, landscape where possible.
  - **Compute coordinates from the defining data; never guess them.** Build triangles from their sides (cosine rule) or angles. Get division points from `A + t(B − A)`, and feet of perpendiculars by projection. Round to 3 decimals. Lines described as parallel must have equal slopes, ratios must be exact, a `right: true` angle must measure 90°, and a "65°" label must measure 65°.
  - Draw to scale. All numeric length labels in one figure use one scale. If that is impossible (a person beside a monument), draw shapes that are exactly similar at different scales and say so in the `caption`.
  - Do not always make bases horizontal. Keep apex angles acute when a perpendicular foot must land inside a side.
  - Label lengths with units, use `?` for an unknown, use Greek letters to mark equal angles, and **never label an unknown with its answer**.
  - Reference only points defined in `points`.
- **`plot`:**
  - Choose `x` and `y` ranges that contain every plotted point and the interesting features (intercepts, vertex, intersections), with axis labels.
  - `functions[].expr` uses `x` as the variable, `^` for powers, `*` for multiplication, and `sqrt`, `abs`, `sin`, `cos`, `tan`, `log`, `exp`. Set `domain` where the function is undefined outside it.
  - `points` mark solutions and intercepts, with exact labels such as "(2, 0)". `series` with `kind: "bar"` is for data and frequency distributions.
- **`table`** for comparisons, method summaries and worked tables. Cells are plain text with Unicode maths (△, ∥, ≤, √, ²), not LaTeX.
- **`flow`** for decision charts (label every edge "Yes" / "No") and proof frames.
- **`svg`** only when the specs cannot draw the figure (solids, nets, a clock face). Use allow-listed elements only, with no `style`, fragment-only references, palette colours only (`currentColor`, `none`, `var(--diagram-accent|muted|fill)`), a viewBox about 320 wide, `role="img"`, `aria-label`, a `<title>` and prefixed ids.
- **`alt`** describes what the visual **shows**: the given lengths, which lines are parallel, where a graph crosses the axes. Not just "a triangle" or "a graph".

### Maths typesetting
- Inline maths goes in `$…$` in `body_md` and bullets. Display maths goes in `math`, one expression per entry.
- Use `\triangle ABC \sim \triangle PQR`, `\angle`, `\parallel`, `\perp`, `\dfrac{}{}` for fractions in running text, `^\circ` for degrees, `\operatorname{ar}`, `\sqrt{}`, `\le`, `\ne`, `\Rightarrow`. Write units outside the maths: `$7.5$ cm`.
- Every expression must parse in KaTeX in strict mode. **Escape every backslash for JSON** (`"\\dfrac"`), and never write a LaTeX command outside `$…$`.

### Narration
- Narration goes on every slide, within the word limit, in plain, warm, spoken Indian English with short sentences: "Let us…", "Your turn…", "Notice that…".
- It must **add** to the slide: why a step is needed, an analogy, a common trap, how the examiner marks it. Never just read the slide aloud.
- **No symbols, LaTeX, equals signs or abbreviations.** Say "A D over D B", "x squared", "the square root of two", "angle A", "triangle A B C". Write criteria and theorems in words ("A A", "side angle side", "the theorem"), not as BPT, SAS or HCF letter clusters. Say numbers the way a teacher would ("seven point five centimetres").

### Contexts and level
- Use Indian everyday contexts (monuments, streets, markets, cricket, railways, festivals, farms, savings), varying names and cities.
- Fit the reading level to Class {{class}}: simple sentences for Class 7, precise terminology for Classes 11–12.

Set `unit`, `part` (null when single, else 1-based), `version`, `title`, `language`, `status: "draft"` and slide ids `s01`, `s02`, … per deck.

### Self-check before you answer
- [ ] Each deck is within the slide count, visual-gap, example and check targets, and has a summary and exam tips.
- [ ] Every worked example has been re-solved, and its check line holds. Every number on every slide agrees.
- [ ] Every geometry coordinate was computed. Parallels, ratios, right angles and degree labels hold. Only defined points are used. Unknowns are not labelled with their answers.
- [ ] Every plot range contains its points, and every expression uses the stated syntax.
- [ ] No narration is over the limit or contains symbols or abbreviations.
- [ ] Nothing comes from a removed topic. No statement-only result is proved. Nothing is copied.

Return JSON that validates against:
{{json_schema}}

Gold-standard exemplar decks (copy the quality, pacing, proof chunking and voice — not the content):
{{few_shot}}
