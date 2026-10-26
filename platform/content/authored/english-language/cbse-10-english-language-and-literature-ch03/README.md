# CBSE Class 10 English Language and Literature — Chapter 3: Writing Skills

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch03` (family `english-language`) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 formal letter (complaint / to the editor / placing an order / enquiry) · t02 analytical paragraph on a map, chart, graph or cues. No removed topics. |
| Board weight | Section B writing, 10 marks: formal letter 5 + analytical paragraph 5, each about 100–120 words with a choice of A or B |
| Files | `release.json` (2 decks: 18 + 17 slides; 7 notes sections; 30 flashcards; 66 questions with 13 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; uses the shared library in `../cbse-10-english-language-and-literature-ch02/src/lib.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-language/cbse-10-english-language-and-literature-ch03/src/build.mjs`.

## Scope and shape

**Deck part 1, the formal letter (18 slides):** board task table → four letter types (table) → format (8-part flow) → format details → body: purpose / details / action (table) → formal vs informal register (two-column) → worked example: planning a complaint → the finished model letter → check (subject line) → letter to the editor → worked example: editor letter in key sentences → order vs enquiry (two-column) → worked example: order-letter body → 2 checks (format order; register) → how the letter is marked (rubric table) → summary → exam tips.

**Deck part 2, the analytical paragraph (17 slides):** what the task is → five moves (flow) → read the input for one minute (flow) → trend language (table) → comparison language (table) → worked example: reading a bar chart (plot) → the finished paragraph → check (overview) → tables and surveys: group, do not list (table) → worked example: a table in four sentences → check (*by* / *to*) → maps, plans and cues (then-and-now table) → worked example: plan from the table → check (correlation is not cause) → how the paragraph is marked (rubric table) → summary → exam tips.

Narration: max 72 words, mean 57. Visuals on 16 of 35 slides.

**The model letter is built step by step** (plan → finished letter → rubric), as the brief asked, and each worked example shows how marks are awarded. Writing models use Markdown hard line breaks (two spaces before the newline) for address lines.

## Question bank (66 items, 161 marks)

| Type | Count | Notes |
|---|---|---|
| writing, letter-formal | 8 | 2 each: complaint (water purifier, municipal officer), to the editor (noise, library), placing an order (books, sports goods), enquiry (coding camp, school tour). Models 103–121 words including the format lines. |
| writing, paragraph | 8 | bar charts (phone ownership, monsoon rainfall, EV sales), tables (travel survey, screen time, electricity mix, canteen), then-and-now village plan, cues (millets). Models 108–123 words. Data visuals in `assets` (`plot` bar series, `table`). |
| mcq | 16 | format, register, subject lines, overview, trend words, comparisons, percentage points, correlation; keys a/b/c/d = 4/4/4/4 |
| fill-blank | 6 | formal phrases, *by / to*, proportions, noun forms; alternatives accepted |
| ordering | 3 | letter parts; paragraph moves; six sentences of a paragraph |
| match | 3 | letter type ↔ purpose; informal ↔ formal; trend phrase ↔ shape |
| true-false | 5 | |
| assertion-reason | 5 | keys a, d, b, d, c |
| short | 8 | 2 marks (subject line + opening; register rewrite; fix a closing; overview; comparisons; conclusion) and 3 marks (a body paragraph; describing a pattern in 40–50 words), all with `word_limit` |
| long | 1 | compare two schools' results (80–100 words) |
| case-based | 3 | a draft letter to correct; a canteen sales table; a draft analytical paragraph to evaluate (`soyl-original`) |

- **Rubrics** (every writing item): letter — Format 1 · Content 2 · Organisation and expression 1 · Accuracy 1; analytical paragraph — Content 3 · Organisation and expression 1 · Accuracy 1. These are SOYL rubrics modelled on the CBSE marking pattern for 5-mark writing tasks; confirm the split against the 2026-27 marking scheme (see gaps).
- **Difficulty:** d1 7 · d2 23 · d3 28 · d4 8. **Competency:** recall 7 · understanding 19 · application 14 · analysis 19 · evaluation 7 → **61% application or higher**. Letters are labelled application (evaluation for the library proposal) and paragraphs analysis (evaluation for the electricity-mix task); all writing items use `bloom: create`.
- **Data integrity:** every data set is invented and captioned "illustrative data"; every ratio, fraction, percentage-point difference and total quoted in a model answer was recomputed (e.g. rainfall Oct + Nov = 630 of 1155 mm ≈ 55%; solar + wind 10% → 32%; EV growth +150%, +120%, +73%, +37%). Model paragraphs never invent causes the data does not show.

## Chapter tests (`tests.json`)
- **Short (20 marks, 40 min):** A letter, 1 of 2 · B analytical paragraph, 1 of 2 · C 10 one-mark objective items.
- **Long (40 marks, 90 min):** A two letters (one from each pair) · B two analytical paragraphs (one from each pair) · C 5 of 6 two-mark short answers · D draft-letter case (5) · E 5 objective items.
- The two tests share no questions. `blueprint_id` is null: the subject's chapter-test blueprints are built for literature chapters; their notes say writing chapters substitute writing tasks for long answers, which these tests do, using the board's 5-mark writing format.

## Pitfalls for generated writing content
1. **"data:" in prose** (e.g. "stay inside the data: no opinions") is read by the lint as a `data:` URL scheme (`banned.url`). Rephrase with a dash or "the figures".
2. **Invented causes** in model paragraphs ("because of the lockdown"). Models must describe what the data shows; causes only when the cues give them.
3. **Overclaiming in options** ("grew steadily" when only two end points are given).
4. **Phone numbers, emails or URLs in letters** fail `banned.contact` / `banned.url`. Use addresses with PIN codes only.
5. **Format lines in the word count:** the lint counts the whole model answer. Keep the body near 90 words so a full letter stays inside 100–120 (±20%).
6. **Fictional names for newspapers, companies and schools**; never a real newspaper's masthead.

## Verifier record (author pass, 2026-10-27)
- Every objective item and case part re-answered from its stem; every writing model checked against its cues (all used), the format (8 parts in order), the rubric and the word limit; every number in the analytical models recomputed.
- **Fixed:** a screen-time model sentence whose arithmetic was correct but meaningless ("equal … minus fifteen points") rewritten; the overview MCQ's key said "grew steadily" though the stem gives only two points → "grew substantially"; three uses of "data:" that tripped `banned.url`; assertion-reason keys rebalanced (a, d, a, d, d → a, d, b, d, c); competency labels revised after the lint band warning (74% → 61%).
- **Answer-leak fix (Lead, API contract DB-6):** the deck's worked examples (the study-table complaint, the museum chart, the editor and order letters, the travel table) had become practice items whose model answers repeated slide sentences. The complaint and the chart practice items now use new tasks (water purifier; phone ownership); the editor, order and travel models were reworded. The builder now fails on any key-side sentence of 60+ characters that appears in served content.
- **Pipeline checks:** `content lint --exemplars` 0 errors, 0 warnings for this unit; `verify --authored` 66/66 pass; `originality --authored` 0 errors; API `content.test.ts` (no answers in served content) passes.

## Known gaps
- **Map input:** the syllabus allows a map; there is no map visual here. The "then-and-now" village plan is given as a table. A drawn plan (SVG) would need the SVG allow-list review; left for a later pass.
- The CBSE 2026-27 marking-scheme split for the letter and the analytical paragraph should be confirmed; the rubrics are SOYL's and easy to change in `src/questions.mjs`.
