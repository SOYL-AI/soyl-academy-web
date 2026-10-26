# subject-producer (CBSE 10 Science, batch B) — chapters 6–9 hand-authored — 2026-10-27

Status: **done** — four publish-quality chapters, all `status: "draft"` pending review.

Branch: `platform/subject-producer/cbse-10-science-b` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-science-b`), kept merged with `origin/platform/main` (merged twice: the M2 pipeline with the stricter lint, and the backend-M2 status commit 479080b). Every chapter was re-validated after each merge.

## What changed

| Path | What |
|---|---|
| `platform/content/authored/science/cbse-10-science-ch06/` | Control and Coordination — release.json, tests.json, README.md, `src/` |
| `platform/content/authored/science/cbse-10-science-ch07/` | How do Organisms Reproduce? — same layout |
| `platform/content/authored/science/cbse-10-science-ch08/` | Heredity — same layout |
| `platform/content/authored/science/cbse-10-science-ch09/` | Light – Reflection and Refraction — same layout, plus `src/optics.mjs` (ray-diagram generator) |
| `…/cbse-10-science-ch06/src/lib.mjs` | Shared authoring library for ch06–ch09: slide/deck/visual/SVG builders; question builders with **seeded, balanced MCQ key placement** (bank MCQs and case parts balanced separately; solutions use `@K/@1/@2/@3` placeholders that are rewritten with the final letters); case parents with `passage_origin` and `alternatives` (parent model answer/solution composed from the parts); tests built to the **default blueprints** with a structural check; a **validator** (KaTeX 0.19 strict + mhchem, lost backslashes, control characters incl. tab, `data:` prose, SVG allow-list via `saxes` incl. class pattern/palette/fragment refs/per-page ids, narration TTS check incl. unit abbreviations and gene/chromosome symbols, word limits with the lint's slack, deck shape); a **re-solve harness** (`add(key, q, check)`); and an in-process call to the pipeline's `lintExemplar` |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-science-b.md` | This note |

Every release: v1, academic year 2026-27, provenance `{ origin: "human", author: "claude-opus-5-5 (subject-producer)", model: null }`, `build.checks` filled by the build (KaTeX, SVG, narration, re-solve, pipeline lint, gate, verifier). Rebuild any chapter from `platform/` with `npx tsx content/authored/science/<chapter>/src/build.mjs` (deterministic; also writes the git-ignored `src/build.log`). The gate reads only the three files at each chapter root. Nothing outside the owned paths was changed.

Commits: 0462342 (ch06), 3005758 (ch07 checkpoint + main merge), b5dcfaf (ch07), c16bbca (ch08 checkpoint), ed17e90 (ch08), 9e621dc (ch09 checkpoint), 725b8f3 (ch09), merge of 479080b, and the handoff commit.

## Counts

| | ch06 Control & Coordination | ch07 Reproduction | ch08 Heredity | ch09 Light |
|---|---|---|---|---|
| Decks (slides) | 2 (23, 23) | 3 (21, 15, 19) | 2 (21, 16) | 4 (21, 14, 13, 21) |
| Slides with a visual / max gap | 40 / 46, 1 | 46 / 55, 1 | 31 / 37, 1 | 57 / 69, 1 |
| Deck visuals by kind | table 20, flow 10, svg 9, plot 1 | table 25, svg 12, flow 9 | table 21, flow 6, svg 4 | table 33, svg 19, flow 4, plot 1 |
| Distinct hand-written / generated SVGs | 9 | 12 | 4 | 18 (computed ray diagrams + slab, sign, terms) |
| Worked examples / checks | 5 / 6 | 7 / 9 | 5 / 6 | 10 / 12 |
| Narration words (min–max, mean) | 16–72, 58 | 11–71, 55 | 13–68, 53 | 14–68, 54 |
| Notes sections | 7 | 8 | 7 | 8 |
| Flashcards | 33 | 32 | 30 | 32 |
| Questions (marks) | 80 (148) | 78 (139) | 69 (124) | 86 (155) |
| mcq · A-R · T/F · fill · match · num | 31 · 9 · 4 · 4 · 3 · 2 | 31 · 9 · 3 · 4 · 2 · 4 | 24 · 9 · 4 · 4 · 1 · 5 | 28 · 9 · 4 · 4 · 2 · 12 |
| short 2 / short 3 / long 5 / case 4 | 8 / 7 / 6 / 6 | 7 / 7 / 5 / 6 | 6 / 5 / 5 / 6 | 6 / 9 / 6 / 6 |
| Difficulty d1/d2/d3/d4/d5 | 16/28/26/9/1 | 11/29/31/6/1 | 11/25/22/10/1 | 13/28/34/10/1 |
| Application or higher (items / marks) | 48% / 55% | 49% / 53% | 46% / 53% | 62% / 68% |
| MCQ keys a/b/c/d | 8/8/8/7 | 8/8/8/7 | 6/6/6/6 | 7/7/7/7 |
| A-R keys (a/b/c/d) | 3/2/2/2 | 3/2/2/2 | 3/2/2/2 | 3/2/2/2 |
| KaTeX strings / SVG visuals | 22 / 18 | 17 / 24 | 63 / 8 | 289 / 30 |
| Scripted re-solves | 4/4 | 7/7 | 22/22 | 57/57 |

Totals: **11 decks, 207 slides, 43 distinct SVG diagrams, 127 flashcards, 313 questions**, 8 chapter tests.

- Every case-based item has 3 parts (1 + 1 + 2); part (c) is an either/or modelled with `ChildQuestion.alternatives` (`c-ii`); the parent model answer, solution and marking scheme cover both. All passages are `passage_origin: "soyl-original"`; at least two data cases per chapter.
- `word_limit` is set only where the model answer is prose (2 marks 30–50, 3 marks 50–80, 5 marks 80–120, case 1-mark 5–30); left off crosses, Punnett squares, ray diagrams and numericals.
- **Tests follow the default blueprints exactly** (`cbse-10-default-chapter-test-short` / `-long`, now in the catalog), so `blueprint_id` is set (batch A used `null` because the blueprints did not exist yet): short = A 3 MCQ + 1 A-R, B 2 + 2 + 3, C 5-mark choice of two, D one case (20 marks, 40 min); long = A 8 MCQ + 2 A-R, B 2 + 2 + (2|2) + 3 + (3|3), C 5 + (5|5), D two cases (40 marks, 90 min). Short and long tests are disjoint; the builder refuses any layout that does not match.
- ch09 application share (62%) is higher than the biology chapters by design — its board questions are numericals and ray diagrams — and still inside the lint band.

## Validation (final run, after the last merge of `platform/main`)

```
$ npm test -w @soyl/content-templates -- --reporter=verbose   (science ch06–ch09 lines)
 ✓ … science/cbse-10-science-ch06 > is a valid ChapterRelease
 ✓ … science/cbse-10-science-ch06 > is named after its chapter and has a README
 ✓ … science/cbse-10-science-ch06 > uses only topics from the chapter syllabus
 ✓ … science/cbse-10-science-ch06 > decks meet the visual lesson rules
 ✓ … science/cbse-10-science-ch06 > has enough flashcards and practice questions
 ✓ … science/cbse-10-science-ch06 > writes language subjects in their own script (NFC, well-formed, no Latin runs, TTS-safe narration)
 ✓ … science/cbse-10-science-ch06 > has a short and a long chapter test drawn from its own questions
 (same 7 ✓ for ch07, ch08, ch09)
 Test Files  1 passed (1)
      Tests  113 passed (113)

$ npm run content -- lint --exemplars
ok   cbse-10-science-ch06: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch07: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch08: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch09: 0 error(s), 0 warning(s)
```
(Other units in the lint run are not mine; `cbse-10-science-ch01` shows 1 warning under the stricter M2 lint.)

Author validator (from each `build.checks`; KaTeX 0.19.0 strict "error" + mhchem; SVG allow-list via saxes):
```
ch06 {"math":22,"svgs":18,"distinctSvgs":9,"narr":{"slides":46,"max":72},"resolve":"4/4","errors":0}
ch07 {"math":17,"svgs":24,"distinctSvgs":12,"narr":{"slides":55,"max":71},"resolve":"7/7","errors":0}
ch08 {"math":63,"svgs":8,"distinctSvgs":4,"narr":{"slides":37,"max":68},"resolve":"22/22","errors":0}
ch09 {"math":289,"svgs":30,"distinctSvgs":18,"narr":{"slides":69,"max":68},"resolve":"57/57","errors":0}
```
Numeric re-solves are written from the givens, never from the answers: ch06 conduction times, iodised-salt mass, glucose fall and ruler-drop times from t = √(2d/g); ch07 2⁶, chromosome halving, seeds → pollen grains, 24/210, 17/20, 1000 − 905; ch08 an **independent Punnett engine** (`gametes`, `cross`) recomputes every monohybrid/dihybrid ratio, count and test-cross claim, plus (1/2)⁵¹ for the d5 evaluation; ch09 `mirrorImage` / `lensImage` (New Cartesian) recompute every v, m, f, P, n and every case table (lab (u, v) pairs → f = −20 cm; camera table; Snell sines recomputed from the angles to three decimals). Every SVG was rasterised with resvg (theme tokens substituted) and checked by eye.

## Verifier pass (summary; details in each chapter README)
1. **Competency honesty over relabelling.** First drafts: ch06 35%, ch07 32% application-or-higher. 18 items were rewritten into genuinely new contexts (e.g. a blocked nose at a perfume shop, a facial-nerve injury, nail pain with no withdrawal → motor neuron, a hypothalamus injury with a healthy pituitary, Leishmania in a kala-azar sample, a cut-style experiment, no period in pregnancy, an STD cured by antibiotics) and 12 duplicate recall items were dropped. ch08 and ch09 were planned with application contexts from the start. Finals 48%, 49%, 46%, 62%.
2. **MCQ key balance.** The first ch06 build pooled bank and case-part MCQs, leaving the bank at 7/9/10/6; the builder now balances each separately (all chapters within one of even). A-R keys were planned up front (3/2/2/2 in every chapter).
3. **Accuracy.** ch07: guava → tomato (guava fruit includes floral-tube tissue); the sex-ratio evaluation no longer treats 1000 as the natural benchmark; puberty onset "about nine to fourteen"; yeast linked to bread dough (idli fermentation is mainly bacterial). ch06: knee jerk avoided (no relay neuron); ABA described as growth inhibitor linked with wilting and stomatal closure. ch08: earlobes used only as a variation example (no dominance claim); Mendel's own counts not reused.
4. **Lint/validator catches.** A "Use the data: …" phrase (URL rule) reworded; one eaten `\dfrac` in a normal JS string (ch09; caught by both the author validator and the new M2 `latex.backslash` rule) converted to `String.raw`; a stray tab in a deck string caught by the validator (tab is now in its control-character class); one check slide pointed at a different A-R item than its wording (repointed).
5. **Diagrams.** ch09's first generator drew the "through C" ray for an object beyond C, which hit the sphere outside the aperture; default rays changed to the textbook pairs and the aperture sized from the real hits; image-at-infinity cases (object at F) collapsed the canvas and were fixed; label collisions at C/2F handled. ch06/ch07/ch08: ~12 label/leader fixes (neuron cell body, auxin cells, Hydra tentacles, Bryophyllum and flower leaders, placenta labels moved outside the uterine wall, earlobe labels).

## Known gaps / follow-ups
- **Narration audio** is not generated (TTS stage); narration is TTS-safe (no symbols, unit abbreviations, F1, XX, TT…).
- **Renderer needs:** KaTeX in table cells (Punnett squares with $F_1$, power tables); plot point labels (ch06 glucose curve, ch09 image-distance curve); Unicode subscripts and primes in SVG text (F₁, A′).
- **Illustrative data** in case passages (ruler-drop, colonies, mould days, fruit set, district sex ratios, turtle percentages, torch beams) are realistic values, not cited measurements; passages say "typical" or use fictional districts where relevant.
- **ch09 drawing scale:** mirrors are drawn with true curvature, so the ray "through F" passes within ~2 px of F (rays are aimed at the exact image point, so the image is exact).
- Human-reproduction content (ch07 Part 3) is factual and syllabus-bounded; a reviewer may still want to check tone for the platform's age group.

## Recommendations (for pipeline-engineer / Lead)
1. **Lint: narration abbreviations.** `narration.symbols` catches formulae but not "5 cm", "2 D", "F1", "XX", "Tt"; the author validator's `NARR_EXTRA` pattern (in `lib.mjs`) could be ported as a warning.
2. **Lint: check-slide coherence.** A check slide's wording can drift from the question it points to; a cheap warning would compare the slide's question type words ("assertion", "numerical") with the target type.
3. **Ray diagrams as a visual kind.** `optics.mjs` shows that ray diagrams are best generated from (type, u, f, h) rather than hand-written SVG; a `ray` visual spec rendered client-side (or a pipeline helper that emits SVG) would let generated content reuse it. Geometry specs cannot draw arrowheads on rays or mirror arcs.
4. **Prompts:** state in the science questions template that MCQ letters should be planned (or rotated by the builder) and that biology chapters need deliberately designed application contexts — both were the main corrections again in this batch.

## Decisions made
- Decks split by topic: ch06 2 parts (t01–t03, t04–t06); ch07 3 (t01–t02, t03, t04–t05); ch08 2 (t01–t02, t03–t04); ch09 4 (t01, t02, t03, t04–t05) because one refraction-plus-lenses deck would exceed 25 slides.
- Build sources are committed under each chapter's `src/` (as the maths producer did), so the content can be rebuilt after an interruption; the JSON at the chapter root remains the source of truth (D-026).
- Tests use the default chapter-test blueprints with `blueprint_id` set.

## Needs from owner
None.
