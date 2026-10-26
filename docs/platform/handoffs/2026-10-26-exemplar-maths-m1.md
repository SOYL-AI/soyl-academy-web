# exemplar-author (maths) — M1 gold-standard chapter and maths prompt templates — 2026-10-26

Status: **done** (pending Lead approval of the exemplar; all items carry `status: "draft"` until then)

Branch: `platform/exemplar-author/m1-maths` (worktree `C:/Users/Prabhu/soyl-wt/exemplar-author-m1-maths`). It is based on `platform/main` at 2b06e13, which includes the science exemplar; the merge was a fast-forward.

## What changed

| Path | What |
|---|---|
| `platform/content-templates/exemplars/maths/cbse-10-mathematics-ch06/release.json` | `ChapterRelease` v1 for "Triangles" (2026-27, provenance `exemplar`). It holds 2 decks, notes, flashcards and 78 questions. `build.checks` records the validation results. |
| `platform/content-templates/exemplars/maths/cbse-10-mathematics-ch06/tests.json` | `t_cbse10math_ch06_short` (chapter-test-short, 20 marks, 40 min) and `t_cbse10math_ch06_long` (chapter-test-long, 40 marks, 90 min). Both use CBSE maths sections A–E with internal-choice groups. The two tests share no questions. |
| `platform/content-templates/exemplars/maths/cbse-10-mathematics-ch06/README.md` | Covers: why this is the standard, worked-example pacing, proof chunking, geometry-spec conventions, the question mix, 12 pitfalls, the content-verifier checklist for maths, and the verifier-pass record. |
| `platform/content-templates/prompts/maths/{outline,deck,notes,flashcards,questions,case-passages,verify}.v1.md` | Maths-family templates. They are generic (Classes 7–12: algebra, geometry, statistics, calculus), use placeholders only, and take `few_shot` from the exemplar. |
| `docs/platform/handoffs/2026-10-26-exemplar-maths-m1.md` | This note. |

There are no changes to the shared contract, the content-templates README or the gate test.

Commits: 0d81d9a (release + tests), 0e5de92 (README), 3a779d5 (templates), and the handoff commit.

## Scope decisions
- **Removed in 2026-27** (per `catalog/cbse/10/mathematics/syllabus.yaml`): areas of similar triangles, and proofs of Pythagoras and its converse. **Neither appears anywhere**, including distractors. The NCERT result "altitude on the hypotenuse makes similar triangles" (CD² = AD·DB) was also avoided, because it belongs to the removed Pythagoras section.
- **In scope:** the BPT proof is examined; it is taught over 5 slides and is a 5-mark item, q065. The converse of BPT and the AA/SSS/SAS criteria are **statement only**, and the decks and notes say so.
- Standard (041) and Basic (241) share this syllabus, so the bank serves both: d1–d3 suit Basic, d4–d5 stretch Standard.

## Counts
- **Decks:** Part 1, "Similar figures and the BPT" (t01–t02), 23 slides. Part 2, "Criteria for similarity and applications" (t03), 23 slides.
  - Layouts: title 2, concept 6, two-column 1, diagram 16, example 9, check 8, summary 2, exam-tips 2.
  - A visual appears on 31 of 46 slides. The largest gap without a visual is 2 slides.
  - The BPT proof spans 5 slides, one step each, with a figure for each step that highlights its triangles.
  - Worked examples:
    - numeric BPT;
    - the converse, with a contrast case;
    - a parallel-roads proof (Pune) plus its numerical use;
    - AA unknown sides;
    - a median cut by a parallel line (proof, 2 slides);
    - the Qutub Minar from shadows;
    - a lamp post on a Pune street.
- **Visuals by kind:**
  - Decks: geometry 24, table 5, flow 2.
  - Notes: geometry 5, table 2, flow 1 (every section has one).
  - Question assets: geometry 8.
  - **Raw SVG: 0.** All 32 geometry figures are computed specs.
- **Narration:** 46 slides; at most 72 words, mean 59. No symbols, LaTeX or abbreviations.
- **Notes:** 8 sections, with key terms, 13 formulas, a visual each, and `exam_tips_md` (mark split and 8 common mistakes).
- **Flashcards:** 34 (definition 8, concept 7, fact 5, formula 5, exam-tip 5, example 3, diagram 1). They cover all 3 topics.
- **Questions:** 78 items, 163 marks.
  - **By type:** mcq 20 · assertion-reason 6 (keys a, b, d, a, c, d) · true-false 5 · fill-blank 5 · numerical 10 · short 2-mark 10 · short 3-mark 8 · long 5-mark 8 · case-based 6 (each 1 + 1 + 2, with an either/or part (c); 18 child parts).
  - **By difficulty:** d1 7 · d2 26 · d3 28 · d4 13 · d5 4.
  - **By competency:** recall 7 · understanding 27 · application 21 · analysis 22 · evaluation 1. Application or higher is **56% of items (71% of marks)**.
  - **By topic tag:** t01 15 · t02 27 · t03 48.
- **Deck checks:** 8, all objective. Part 1: q001, q004, q005, q021. Part 2: q008, q011, q010, q012.
- **Tests:**
  - Short: A 4×1 · B 2 + (2|2) · C (3|3) · D (5|5) · E one case = 20 marks.
  - Long: A 7×1 · B 2 + 2 + (2|2) · C 3 + 3 + (3|3) · D 5 + (5|5) · E two cases = 40 marks.

## How to verify
```
cd platform && npm install
npm test -w @soyl/content-templates
```
Gate output (verbose, maths lines):
```
 ✓ exemplars > maths/cbse-10-mathematics-ch06 > is a valid ChapterRelease
 ✓ exemplars > maths/cbse-10-mathematics-ch06 > is named after its chapter and has a README
 ✓ exemplars > maths/cbse-10-mathematics-ch06 > uses only topics from the chapter syllabus
 ✓ exemplars > maths/cbse-10-mathematics-ch06 > decks meet the visual lesson rules
 ✓ exemplars > maths/cbse-10-mathematics-ch06 > has enough flashcards and practice questions
 ✓ exemplars > maths/cbse-10-mathematics-ch06 > writes language subjects in their own script
 ✓ exemplars > maths/cbse-10-mathematics-ch06 > has a short and a long chapter test drawn from its own questions
 Test Files  1 passed (1)
      Tests  15 passed (15)        (7 maths + 7 science + 1 directory check)
```

**Extra validation (scratch scripts outside the repo; Node 24; deps `katex@0.19.1`, `@resvg/resvg-js`).** The validator reads only the built JSON. Its source is below so that pipeline-engineer can port it to the lint and verify stages. Output on the final release:
```
mathStringsParsed: 1298   (KaTeX 0.19.1, throwOnError, strict) -> 0 failures; 0 commands missing "\"; 0 LaTeX outside $…$
geometry specs: 32        defined points only, in-canvas, right-angle marks measure 90°±0.5°, degree labels within 0.6°,
                          numeric length labels on one scale per figure (Part 2 s17 exempt: two scales, stated in caption)
relationsChecked: 37      figure-specific: DE ∥ BC with AD:DB = 2:3, feet of perpendiculars inside AD/AE, converse 3:4,
                          parallel roads 120:180 = 150:225 to scale, title/recap/AA ratios 1.75/1.5/1.6, SSS/SAS equiangular,
                          SSA two positions, median PR = RQ, Qutub same shape, lamp-post ray collinear (shadow 1.5 m),
                          crossing OA:OC = OB:OD and AB ∥ CD, river to scale (36 m), trapezium E-G-F collinear,
                          double parallel, PQRS parallelogram, garden paths ∥ BC, mirror equal angles (9 m)
reSolved: 86/86 checks pass; 5 proof items checked by hand (047, 052, 065, 066, 070)
narration: 46 slides, max 72 words, mean 59
tests: short 20 marks/40 min 12 items ABCDE; long 40 marks/90 min 20 items ABCDE; no shared questions
NO ERRORS
```
All 32 geometry figures were also rasterised, using a minimal y-up renderer and resvg, and checked by eye. One layout fix followed; see the verifier pass below.

## Verifier pass (done by the author after writing)
All 78 questions and 18 case children were re-solved from the stem alone. A scratch Node script recomputed every key, every numerical value and the key numbers in every short, long and case model answer, using independent arithmetic. For example:
- q045's crossing height is found by line intersection, not by the formula;
- q054's vertex correspondence is derived by sorting the sides;
- q026's SSA non-similarity is checked with the sine and cosine rules.

Fixed:
1. **q026 (critical, solution text).** The solution gave △ABC's angles as about 88.6° and 51.4°. The cosine rule gives ∠A ≈ 91.4°: BC is the longest side, so ∠A is obtuse. The angles are therefore 40°, 91.4° and 48.6°. The key (d) was right, but the explanation was wrong. The validator now checks the solution's angles as well. This is the lesson for the pipeline: **recompute every number in the solution, not only the key.**
2. **q072.** The stem was authored as a plain quoted string, so `\dfrac` would have become `dfrac`; this is the pitfall the science handoff warned about. It is now `String.raw`. The validator flags bare `dfrac{`, `triangle`, `parallel`, `Rightarrow` and similar.
3. **BPT construction figures** (Part 1 s09–s11, q065). The apex was close to 90°, so the feet M and N landed almost on A. The raster review caught this. The apex is now about 57°, and the validator asserts that each foot lies inside AD or AE.
4. **Narration.** Three slides said "BPT", which TTS reads as letters. They now say "the theorem" or "the proportionality theorem".
5. **Competency honesty.** The first build had 77% of items at application or higher. Sixteen routine one-step items were relabelled to understanding (q005, q009, q012, q013, q016, q024, q031, q034, q035, q037, q038, q039, q046, q048, q049, q050). The result is 56%, against the Standard paper's 54/24/22 split.
6. **Case-based parents.** The model answers were terse letter keys; they are now full answers for each part.
7. **Validator float noise.** `4.800000000000001` was a checker artefact; the content was already correct. It was fixed in the checker. The pitfall is listed in the README and the templates.

Originality: no item reuses an NCERT example or exercise, an RD Sharma or RS Aggarwal problem, or a CBSE sample-paper item. Familiar set-ups were deliberately changed:
- the walking girl and lamp post became fixed-distance and two-person shadow problems;
- CA² = CB·CD became a numeric AA item;
- ratio-of-medians and bisectors proofs were replaced by the median-cut-by-a-parallel, the trapezium converse, the quadrilateral → parallelogram and the crossed-SAS proofs.

## Tests added
None. The existing gate covers the exemplar and passes.

## Known gaps / follow-ups
- **The prompt templates have not been run yet.** The step "iterate until pipeline output on 3 other chapters matches" depends on pipeline stages 5–9 (M2). Good trial chapters for maths would be a proof-heavy one (ch10 Circles), an algebra one (ch04 Quadratic Equations) and a data one (ch13 Statistics, using `plot` bar series).
- **No chapter-test blueprints exist yet**, so `blueprint_id` is `null`. Section layout A–E (1/2/3/5/4 marks) follows the CBSE Mathematics board paper.
- **Ids** use the compact form `q_cbse10math_ch06_###` from the brief. As in science, the templates fall back to `q_{{chapter_id}}_NNN`; see recommendation 2.
- There is **no renderer for `geometry` or `plot` yet**, in design-system or web-platform. The conventions here (y up, in-canvas, one scale) must be adopted by the renderer, or this exemplar's figures will display upside down.

## Recommendations (contract / README / gate) — for the Lead and pipeline-engineer
1. **Contract, `GeometryVisual`, for proofs and real-world figures:**
   - (a) **document the coordinate system** (y up, origin bottom-left) in `visual.ts`. The renderer must flip.
   - (b) `points` with options: `{ at, label?: string | false, labelPos?: 'n'|'ne'|… }`. Helper points (ground ends G1/G2, road ends L1–N2, ray end X) currently show their labels, and crowded vertices need placement hints.
   - (c) **tick marks** on segments (`ticks: 1|2|3`) for equal lengths, and **arrow marks** (`parallel: 1|2`) for parallel lines. These are standard notation in every proof figure, and the exemplar had to rely on captions.
   - (d) **angle arc styles** (`arcs: 1|2|3`) to show equal angles without Greek letters.
   - (e) a `lines` / `rays` primitive (infinite or half-infinite), instead of helper endpoints.
   - (f) `polygons[].style: 'fill'|'hatch'|'accent'`, to highlight two triangles differently in a proof step. Today both get the same fill.
   - (g) an optional `scale: { unit: 'cm'|'m', per_unit: number }` and `not_to_scale: boolean`, so that lint can check labels against geometry without guessing.
2. **README placeholders:** add `{{content_json}}` (used by both the science and maths verify templates) and `{{id_prefix}}` (a compact id prefix such as `cbse10math_ch06`).
3. **Contract, `PlotVisual.functions[].expr`:** the expression syntax is unspecified. The maths templates assume a mathjs-style grammar (`x`, `^`, `*`, `sqrt`, `sin`, `log`, `abs`, …). Please pin this in `visual.ts`, and have lint parse every `expr`.
4. **Contract, `TableVisual`:** say whether cells render Markdown or LaTeX. The exemplar uses plain Unicode (△, ∥, ∼) to be safe. Maths tables would benefit from `$…$` in cells.
5. **Contract, case-based child-level internal choice:** this is the same issue science reported. Part (c) "either/or" is packed into one child. `alternatives: ChildQuestion[]` on a child would let each alternative be auto-graded (several (c) alternatives here are numerical).
6. **Gate / lint additions** (all implemented in the validator below):
   - KaTeX strict parse;
   - backslash-loss detection;
   - no LaTeX outside `$…$`;
   - narration free of symbols and TTS-hostile abbreviations;
   - geometry integrity (defined points, in-canvas, right-angle and degree-label measurement, one scale for length labels);
   - check-slide questions are objective;
   - competency share 45–65% (warning);
   - at least 3 items at d4–d5 (warning);
   - short and long tests disjoint (warning).
7. **Verify stage:** for maths, stage 5 should run a numeric or SymPy re-solve that recomputes the numbers **inside solutions**, not just keys. Item 1 of the verifier pass (q026) had a correct key but a wrong solution, so a key-only check would have passed it. The validator's `expectInModel` pattern is a cheap start.
8. **`Provenance`** has no author field (science made the same point). `model: "claude-opus-5-5"` with `origin: "exemplar"` is used here.

## Decisions made
- The chapter is split into 2 decks at the t02/t03 boundary, so that the examined proof can be chunked one step per slide and each part still holds all its required slides.
- Raw SVG is not used at all; every figure is a computed `geometry` spec.
- Competency rule: a routine one-step use of a result is understanding (written into the README and the templates).
- Tests use the CBSE maths sections A–E, and the short and long tests are disjoint.
- All items stay `status: draft` until the Lead signs off.

## Needs from owner
None.

<details><summary>Authoring helpers (geometry coordinates are computed, never typed)</summary>

```js
const lerp = (A, B, t) => [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];          // division point
const foot = (P, A, B) => { const dx = B[0]-A[0], dy = B[1]-A[1];                        // foot of perpendicular
  const t = ((P[0]-A[0])*dx + (P[1]-A[1])*dy) / (dx*dx + dy*dy); return [A[0]+t*dx, A[1]+t*dy]; };
// Triangle XYZ with |XY| = c along `dir` degrees from X, |XZ| = b, |YZ| = a (cosine rule), Z left of XY:
function triSides(X, a, b, c, dir = 0) {
  const x = (b*b + c*c - a*a) / (2*c), y = Math.sqrt(b*b - x*x), r = dir*Math.PI/180;
  const cs = Math.cos(r), sn = Math.sin(r);
  return [X, [X[0] + c*cs, X[1] + c*sn], [X[0] + x*cs - y*sn, X[1] + x*sn + y*cs]];
}
// Also: triAngles(X, c, angX, angY, dir) and triSAS(X, p, q, angle, dir); every coordinate rounded to 3 dp.
```
</details>

<details><summary>Numeric re-solve output (86 checks)</summary>

```
  q001   expected c                      key c                                        OK
  q002   expected 37.5                   key 37.5                                     OK
  q003   expected a                      key a                                        OK
  q004   expected c                      key c                                        OK
  q005   expected 7.5                    key 7.5                                      OK
  q006   expected 7                      key 7                                        OK
  q007   expected d                      key d                                        OK
  q008   expected a                      key a                                        OK
  q009   expected 5                      key 5                                        OK
  q010   expected 36                     key 36                                       OK
  q011   expected b                      key b                                        OK
  q012   expected 34.5                   key 34.5                                     OK
  q013   expected 5                      key 5                                        OK
  q014   expected 9                      key 9                                        OK
  q015   expected c                      key c                                        OK
  q016   expected 5.999999999999999      key 6                                        OK
  q017   expected 2/5                    key $\dfrac25$                               OK
  q018   expected 10.5                   key 10.5                                     OK
  q019   expected c                      key c                                        OK
  q020   expected 3                      key 3                                        OK
  q021   expected a                      key a                                        OK
  q022   expected b                      key b                                        OK
  q023   expected d                      key d                                        OK
  q024   expected a                      key a                                        OK
  q025   expected c                      key c                                        OK
  q026   expected d                      key d                                        OK
  q027   expected t                      key t                                        OK
  q028   expected f                      key f                                        OK
  q029   expected f                      key f                                        OK
  q030   expected t                      key t                                        OK
  q031   expected f                      key f                                        OK
  q032   expected equilateral            key equilateral                              OK
  q033   expected Thales                 key Thales|Thales'|Thales's|Thales theorem   OK
  q034   expected 1.5                    key 1.5|3/2|1.50                             OK
  q035   expected 0.42857142857142855    key 3/7|3:7|3 : 7                            OK
  q036   expected 30                     key 30|30 m|30.0                             OK
  q037   expected 3.6                    key 3.6                                      OK
  q038   expected 3.5                    key 3.5                                      OK
  q039   expected 21.6                   key 21.6                                     OK
  q040   expected 0.7999999999999999     key 0.8                                      OK
  q041   expected 58.800000000000004     key 58.8                                     OK
  q042   expected 7.200000000000001      key 7.2                                      OK
  q043   expected 4.5                    key 4.5                                      OK
  q044   expected 0.4                    key 0.4                                      OK
  q045   expected 3.5999999999999996     key 3.6                                      OK
  q046   expected 9                      key 9                                        OK
  q048   expected 8, 10                  key model answer                             OK
  q049   expected converse of BPT        key model answer                             OK
  q050   expected SSS, 1.5               key model answer                             OK
  q051   expected 50^\circ, EF           key model answer                             OK
  q053   expected AA, not                key model answer                             OK
  q054   expected \triangle ABC \sim \triangle DFE key model answer                             OK
  q055   expected 12, 15                 key model answer                             OK
  q056   expected x = 1, AD = 2, AE = 4  key model answer                             OK
  q057   expected 5, 7.5, 9              key model answer                             OK
  q058   expected SAS, AB \parallel CD   key model answer                             OK
  q059   expected 5                      key model answer                             OK
  q060   expected x = 1, d = 4.8         key model answer                             OK
  q061   expected 10, 4                  key model answer                             OK
  q062   expected 36                     key model answer                             OK
  q063   expected 12.5, 15, 17.5         key model answer                             OK
  q064   expected A and B are similar    key model answer                             OK
  q067   expected 6                      key model answer                             OK
  q068   expected PQ = 3, 1 : 3          key model answer                             OK
  q069   expected x = 1.5, y = 2, 2 - 1.5 = 0.5 key model answer                             OK
  q070   expected \dfrac{2}{3}           key model answer                             OK
  q071   expected 4.5, \dfrac{4}{11}, \dfrac57 key model answer                             OK
  q072   expected h = 6, 18              key model answer                             OK
  q073a  expected b                      key b                                        OK
  q073b  expected 37.2                   key 37.2                                     OK
  q073c  expected 29.76                  key model answer                             OK
  q074a  expected c                      key c                                        OK
  q074b  expected 15                     key 15                                       OK
  q074c  expected 20, 5, 0.3, 0.28       key model answer                             OK
  q075a  expected b                      key b                                        OK
  q075b  expected 2.5                    key 2.5                                      OK
  q075c  expected 1.67, 10, 12.5, 15     key model answer                             OK
  q076a  expected d                      key d                                        OK
  q076b  expected 9.000000000000002      key 9                                        OK
  q076c  expected 1.12                   key model answer                             OK
  q077a  expected a                      key a                                        OK
  q077b  expected 1                      key 1                                        OK
  q077c  expected BC = 1.2, \dfrac{13}{11} key model answer                             OK
  q078a  expected c                      key c                                        OK
  q078b  expected 3.6                    key 3.6                                      OK
  q078c  expected 18, 900                key model answer                             OK
```
</details>

<details><summary>validate.mjs (scratch validator; Node 24, dep: katex)</summary>

```js
// Independent checks on the built maths exemplar (reads only the JSON files):
// 1 KaTeX parse of every math string; 2 LaTeX commands that lost their backslash; 3 narration;
// 4 geometry/plot spec integrity (defined points, bounds, right-angle and degree labels, length labels vs scale);
// 5 figure-specific geometric relations; 6 numeric re-solve of every question; 7 statistics.
import fs from 'node:fs';
import katex from 'katex';

const DIR = process.argv[2];
const release = JSON.parse(fs.readFileSync(`${DIR}/release.json`, 'utf8'));
const { tests } = JSON.parse(fs.readFileSync(`${DIR}/tests.json`, 'utf8'));
const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const stats = {};

// ---------- collect strings
const strings = [];
(function walk(v, p) {
  if (typeof v === 'string') strings.push([p, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${p}.${k}`);
})(release, '$');

// ---------- 1 + 2 KaTeX and lost backslashes
let mathCount = 0;
const render = (where, tex, display) => {
  mathCount++;
  try { katex.renderToString(tex, { throwOnError: true, displayMode: display, strict: 'error' }); }
  catch (e) { err(where, `KaTeX: ${e.message}`); }
};
const CMDS = 'frac|dfrac|tfrac|triangle|angle|parallel|sim|cong|perp|times|text|operatorname|leftrightarrow|Longrightarrow|Rightarrow|neq|approx|circ|therefore|blacksquare|overset|quad|iff|cdot';
const lost = new RegExp(`(^|[^\\\\A-Za-z])(${CMDS})(\\{|\\b)`, 'g');
for (const [p, s] of strings) {
  if (/\.spec\./.test(p) && !/\.(rows|headers)/.test(p)) continue;
  const isRawMath = /\.math\[\d+\]$|\.latex$/.test(p);
  if (isRawMath) {
    render(p, s, true);
    for (const m of s.matchAll(lost)) if (!/^(text|angle|times|sim|circ|quad)$/.test(m[2]) || m[3] === '{') err(p, `"${m[2]}" without backslash`);
    continue;
  }
  const re = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  let m;
  while ((m = re.exec(s))) {
    const tex = m[1] ?? m[2];
    render(p, tex, !!m[1]);
    for (const l of tex.matchAll(lost)) if (l[3] === '{' || /^(dfrac|frac|triangle|parallel|perp|leftrightarrow|Longrightarrow|Rightarrow|neq|therefore|operatorname|cong)$/.test(l[2])) err(p, `"${l[2]}" without backslash in $${tex}$`);
  }
  if ((s.match(/\$/g) || []).length % 2) err(p, 'odd number of $ delimiters');
  // LaTeX outside $…$
  const outside = s.replace(/\$\$[^$]+\$\$|\$[^$]+\$/g, '');
  if (/\\[a-zA-Z]+/.test(outside)) err(p, `LaTeX command outside $…$: ${outside.match(/\\[a-zA-Z]+/)[0]}`);
}

// ---------- 3 narration
let maxWords = 0, sumWords = 0, nSlides = 0;
for (const d of release.decks) for (const s of d.slides) {
  const w = s.narration.trim().split(/\s+/u).length;
  maxWords = Math.max(maxWords, w); sumWords += w; nSlides++;
  if (w > 90) err(`deck${d.part}/${s.id}`, `narration ${w} words`);
  if (/[$\\=∥∼△∠÷×]|\b[A-Z]{2,3}\b(?<!\bA A\b)/.test(s.narration.replace(/\b(AA|SSS|SAS|SSA|BPT)\b/g, ''))) err(`deck${d.part}/${s.id}`, `narration has symbols or letter-clusters: ${s.narration.match(/[$\\=∥∼△∠÷×]|\b[A-Z]{2,3}\b/)}`);
  if (/\b(AA|SSS|SAS|BPT)\b/.test(s.narration)) err(`deck${d.part}/${s.id}`, 'narration uses an abbreviation TTS will mangle (say "A A", "side side side")');
}

// ---------- 4 geometry / plot spec integrity
const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
const angleAt = (V, A, B) => {
  const a = [A[0] - V[0], A[1] - V[1]], b = [B[0] - V[0], B[1] - V[1]];
  return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI;
};
const cross = (A, B, C, D) => (B[0] - A[0]) * (D[1] - C[1]) - (B[1] - A[1]) * (D[0] - C[0]);
const parallel = (A, B, C, D) => Math.abs(cross(A, B, C, D)) / (dist(A, B) * dist(C, D)) < 2e-3;
const collinear = (A, B, C) => Math.abs(cross(A, B, A, C)) / (dist(A, B) * dist(A, C)) < 2e-3;
const close = (a, b, tol = 0.01) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

const visuals = [];
release.decks.forEach((d) => d.slides.forEach((s) => s.visual && visuals.push([`deck${d.part}/${s.id}`, s.visual])));
release.notes.sections.forEach((s, i) => s.visual && visuals.push([`notes[${i}]`, s.visual]));
release.questions.forEach((q) => q.assets.forEach((v, i) => visuals.push([`${q.id}.assets[${i}]`, v])));
const byKind = {};
const NOT_TO_SCALE = new Set(['deck2/s17']); // two triangles deliberately drawn at different scales (stated in caption)
for (const [where, v] of visuals) {
  byKind[where.startsWith('deck') ? v.kind : `${v.kind} (notes/questions)`] = (byKind[where.startsWith('deck') ? v.kind : `${v.kind} (notes/questions)`] ?? 0) + 1;
  if (v.alt.length < 40) err(where, 'alt too short to describe what the visual shows');
  if (v.kind === 'table') {
    v.spec.rows.forEach((r, i) => r.length !== v.spec.headers.length && err(where, `table row ${i} has ${r.length} cells`));
    continue;
  }
  if (v.kind === 'flow') {
    const ids = new Set(v.spec.nodes.map((n) => n.id));
    if (ids.size !== v.spec.nodes.length) err(where, 'duplicate flow node ids');
    v.spec.edges.forEach((e) => (!ids.has(e.from) || !ids.has(e.to)) && err(where, `edge ${e.from}->${e.to} references unknown node`));
    continue;
  }
  if (v.kind !== 'geometry') continue;
  const { points: P, width, height } = v.spec;
  const need = (name, ctx) => { if (!(name in P)) err(where, `${ctx} references undefined point ${name}`); };
  for (const [k, [x, y]] of Object.entries(P)) if (x < 0 || y < 0 || x > width || y > height) err(where, `point ${k} (${x}, ${y}) outside ${width}x${height}`);
  v.spec.segments.forEach((s) => { need(s.from, 'segment'); need(s.to, 'segment'); });
  v.spec.polygons.forEach((pg) => pg.vertices.forEach((n) => need(n, 'polygon')));
  v.spec.circles.forEach((c) => {
    need(c.center, 'circle');
    const [x, y] = P[c.center];
    if (x - c.radius < 0 || y - c.radius < 0 || x + c.radius > width || y + c.radius > height) err(where, `circle at ${c.center} leaves the canvas`);
  });
  v.spec.angles.forEach((a) => {
    [a.at, a.from, a.to].forEach((n) => need(n, 'angle'));
    if (!(a.at in P && a.from in P && a.to in P)) return;
    const m = angleAt(P[a.at], P[a.from], P[a.to]);
    if (a.right && Math.abs(m - 90) > 0.5) err(where, `angle at ${a.at} marked right but measures ${m.toFixed(2)}°`);
    const deg = /^(\d+(?:\.\d+)?)°$/.exec(a.label ?? '');
    if (deg && Math.abs(m - Number(deg[1])) > 0.6) err(where, `angle at ${a.at} labelled ${a.label} but measures ${m.toFixed(2)}°`);
  });
  // numeric length labels must share one scale (drawing units per stated unit)
  if (!NOT_TO_SCALE.has(where)) {
    const scales = v.spec.segments
      .map((s) => [s, /^(\d+(?:\.\d+)?)(?:\s*(?:cm|m))?$/.exec(s.label ?? '')])
      .filter(([, m]) => m)
      .map(([s, m]) => [s, dist(P[s.from], P[s.to]) / Number(m[1])]);
    if (scales.length > 1) for (const [s, k] of scales) if (!close(k, scales[0][1], 0.01)) err(where, `segment ${s.from}${s.to} label ${s.label} off scale (${k.toFixed(4)} vs ${scales[0][1].toFixed(4)})`);
  }
}
stats.visualsByKind = byKind;

// ---------- 5 figure-specific relations
const V = Object.fromEntries(visuals.map(([w, v]) => [w, v.spec?.points]));
const rel = (where, ok, msg) => { if (!V[where]) return err(where, 'visual missing for relation check'); if (!ok(V[where])) err(where, msg); else stats.relationsChecked = (stats.relationsChecked ?? 0) + 1; };
const ratio = (P, a, b, c, d) => dist(P[a], P[b]) / dist(P[c], P[d]);
rel('deck1/s01', (P) => close(ratio(P, 'P', 'Q', 'A', 'B'), 1.75) && close(ratio(P, 'Q', 'R', 'B', 'C'), 1.75) && close(ratio(P, 'R', 'P', 'C', 'A'), 1.75), 'title triangles not in ratio 1.75');
rel('deck1/s04', (P) => close(dist(P.A, P.B), 2) && close(dist(P.B, P.C), 2) && close(angleAt(P.A, P.B, P.D), 90, 0.005) && close(dist(P.E, P.F), 3.5) && close(dist(P.F, P.G), 2) && close(dist(P.I, P.J), 2) && close(dist(P.J, P.K), 2) && close(dist(P.K, P.M), 2) && close(angleAt(P.I, P.J, P.M), 60, 0.01), 'square/rectangle/rhombus dimensions wrong');
for (const s of ['deck1/s07', 'deck1/s08', 'deck1/s09', 'deck1/s10', 'deck1/s11', 'deck1/s12', 'notes[2]'])
  rel(s, (P) => parallel(P.D, P.E, P.B, P.C) && close(ratio(P, 'A', 'D', 'D', 'B'), 2 / 3) && close(ratio(P, 'A', 'E', 'E', 'C'), 2 / 3) && collinear(P.A, P.D, P.B) && collinear(P.A, P.E, P.C), 'BPT figure: DE not parallel to BC or ratios not 2:3');
rel('deck1/s09', (P) => dist(P.A, P.M) > 0.25 * dist(P.A, P.D) && dist(P.A, P.M) < dist(P.A, P.D) && dist(P.A, P.N) > 0.25 * dist(P.A, P.E) && dist(P.A, P.N) < dist(P.A, P.E) && collinear(P.A, P.M, P.B) && close(angleAt(P.M, P.A, P.E), 90, 0.01) && collinear(P.A, P.N, P.C) && close(angleAt(P.N, P.A, P.D), 90, 0.01), 'feet of perpendiculars wrong');
rel('deck1/s15', (P) => close(dist(P.P, P.Q), 6) && close(dist(P.P, P.R), 7.5) && close(dist(P.Q, P.R), 9) && close(dist(P.P, P.S), 2.4) && close(dist(P.P, P.T), 3) && parallel(P.S, P.T, P.Q, P.R), 'worked example 1 figure wrong');
for (const s of ['deck1/s16', 'notes[3]'])
  rel(s, (P) => close(dist(P.A, P.D), 3) && close(dist(P.D, P.B), 4) && close(dist(P.A, P.E), 3.3) && close(dist(P.E, P.C), 4.4) && parallel(P.D, P.E, P.B, P.C), 'converse figure wrong');
rel('deck1/s17', (P) => close(ratio(P, 'X', 'M', 'M', 'Y'), 3 / 5) && close(ratio(P, 'X', 'N', 'N', 'Z'), 4.5 / 7.5) && parallel(P.M, P.N, P.Y, P.Z) && close(ratio(P, 'X', 'M', 'X', 'N'), 3 / 4.5), 'worked example 2 figure wrong');
for (const s of ['deck1/s18', 'deck1/s19'])
  rel(s, (P) => parallel(P.L1, P.L2, P.M1, P.M2) && parallel(P.M1, P.M2, P.N1, P.N2) && collinear(P.A, P.B, P.C) && collinear(P.P, P.Q, P.R) && collinear(P.A, P.X, P.R) && Math.abs(P.X[1] - P.M1[1]) < 1e-3 && close(ratio(P, 'A', 'B', 'B', 'C'), 120 / 180) && close(ratio(P, 'P', 'Q', 'Q', 'R'), 150 / 225) && close(ratio(P, 'A', 'B', 'P', 'Q'), 120 / 150), 'roads figure wrong');
for (const s of ['deck2/s01', 'deck2/s16'])
  rel(s, (P) => parallel(P.A, P.C, P.P, P.R) && close(angleAt(P.B, P.C, P.A), 90, 0.005) && close(angleAt(P.Q, P.R, P.P), 90, 0.005), 'shadow rays not parallel');
rel('deck2/s02', (P) => close(ratio(P, 'P', 'Q', 'A', 'B'), 1.5) && close(ratio(P, 'Q', 'R', 'B', 'C'), 1.5) && close(ratio(P, 'R', 'P', 'C', 'A'), 1.5), 'recap triangles not in ratio 1.5');
rel('deck2/s04', (P) => close(angleAt(P.C, P.A, P.B), 70, 0.01) && close(angleAt(P.F, P.D, P.E), 70, 0.01) && close(ratio(P, 'D', 'E', 'A', 'B'), 1.6), 'AA figure third angle not 70°');
rel('deck2/s05', (P) => close(angleAt(P.A, P.B, P.C), angleAt(P.P, P.Q, P.R), 0.002) && close(angleAt(P.B, P.C, P.A), angleAt(P.Q, P.R, P.P), 0.002), 'SSS triangles not equiangular');
rel('deck2/s06', (P) => close(ratio(P, 'B', 'C', 'E', 'F') * 1.5, 1) && close(angleAt(P.B, P.A, P.C), angleAt(P.E, P.D, P.F), 0.002), 'SAS triangles not similar');
rel('deck2/s07', (P) => close(dist(P.B, P.C1), 3.5) && close(dist(P.B, P.C2), 3.5) && close(dist(P.A, P.B), 4.9) && collinear(P.A, P.C1, P.X) && collinear(P.A, P.C2, P.X) && close(angleAt(P.A, P.X, P.B), 40, 0.01) && !close(angleAt(P.C1, P.A, P.B), angleAt(P.C2, P.A, P.B), 0.05), 'SSA figure wrong');
rel('deck2/s12', (P) => close(angleAt(P.P, P.Q, P.R), angleAt(P.S, P.T, P.U), 0.002) && close(angleAt(P.Q, P.R, P.P), angleAt(P.T, P.U, P.S), 0.002) && close(ratio(P, 'T', 'U', 'Q', 'R'), 4 / 3) && close(dist(P.P, P.R) / 0.45, 9) && close(dist(P.T, P.U) / 0.45, 10), 'worked example 1 (part 2) figure wrong');
for (const s of ['deck2/s13', 'notes[5]'])
  rel(s, (P) => close(dist(P.B, P.D), dist(P.D, P.C), 0.001) && collinear(P.B, P.D, P.C) && parallel(P.P, P.Q, P.B, P.C) && collinear(P.P, P.R, P.Q) && collinear(P.A, P.R, P.D) && close(dist(P.P, P.R), dist(P.R, P.Q), 0.002), 'median figure wrong');
rel('deck2/s17', (P) => close(ratio(P, 'A', 'B', 'B', 'C'), 1.6 / 2.4) && close(ratio(P, 'P', 'Q', 'Q', 'R'), 72.5 / 108.75) && close(angleAt(P.B, P.C, P.A), 90, 0.005) && close(angleAt(P.Q, P.R, P.P), 90, 0.005), 'Qutub triangles not same shape');
for (const s of ['deck2/s18', 'notes[6]'])
  rel(s, (P) => collinear(P.L, P.H, P.S) && close(dist(P.L, P.O), 6) && close(dist(P.H, P.B), 1.5) && close(dist(P.O, P.B), 4.5) && close(dist(P.B, P.S), 1.5), 'lamp-post figure wrong (shadow should be 1.5 m)');
rel('q_cbse10math_ch06_058.assets[0]', (P) => collinear(P.A, P.O, P.C) && collinear(P.B, P.O, P.D) && close(ratio(P, 'O', 'A', 'O', 'C'), 2 / 3) && close(ratio(P, 'O', 'B', 'O', 'D'), 2 / 3) && parallel(P.A, P.B, P.C, P.D), 'crossing figure wrong');
rel('q_cbse10math_ch06_062.assets[0]', (P) => collinear(P.T, P.C, P.E) && close(angleAt(P.B, P.C, P.T), 90, 0.005) && close(angleAt(P.D, P.C, P.E), 90, 0.005) && close(ratio(P, 'T', 'B', 'B', 'C'), 36 / 30) && close(ratio(P, 'D', 'E', 'C', 'D'), 12 / 10) && close(ratio(P, 'B', 'C', 'C', 'D'), 3), 'river figure wrong (width should be 36 m)');
rel('q_cbse10math_ch06_065.assets[0]', (P) => parallel(P.D, P.E, P.B, P.C) && close(angleAt(P.M, P.A, P.E), 90, 0.01), 'BPT construction wrong');
rel('q_cbse10math_ch06_066.assets[0]', (P) => parallel(P.A, P.B, P.D, P.C) && close(ratio(P, 'A', 'E', 'E', 'D'), ratio(P, 'B', 'F', 'F', 'C')) && parallel(P.E, P.G, P.D, P.C) && collinear(P.A, P.G, P.C) && collinear(P.E, P.G, P.F), 'trapezium figure wrong');
rel('q_cbse10math_ch06_067.assets[0]', (P) => parallel(P.D, P.E, P.B, P.C) && parallel(P.E, P.F, P.A, P.B) && close(ratio(P, 'A', 'D', 'D', 'B'), 1.5) && close(ratio(P, 'B', 'F', 'F', 'C'), 1.5), 'double-parallel figure wrong');
rel('q_cbse10math_ch06_070.assets[0]', (P) => parallel(P.P, P.S, P.B, P.D) && parallel(P.Q, P.R, P.B, P.D) && close(dist(P.P, P.S), dist(P.Q, P.R), 0.002) && close(ratio(P, 'A', 'P', 'P', 'B'), 2) && close(ratio(P, 'C', 'R', 'R', 'D'), 2), 'quadrilateral figure wrong');
rel('q_cbse10math_ch06_074.assets[0]', (P) => parallel(P.D, P.E, P.B, P.C) && parallel(P.F, P.G, P.B, P.C) && close(ratio(P, 'A', 'B', 'A', 'C'), 30 / 25) && close(ratio(P, 'B', 'C', 'A', 'B'), 32 / 30) && close(ratio(P, 'A', 'D', 'A', 'B'), 0.4) && close(ratio(P, 'A', 'G', 'A', 'C'), 0.8), 'garden figure wrong');
rel('q_cbse10math_ch06_076.assets[0]', (P) => close(angleAt(P.M, P.F, P.E), angleAt(P.M, P.B, P.T), 0.002) && close(dist(P.B, P.T), 9) && close(dist(P.M, P.B), 8.4), 'mirror figure wrong (tree should be 9 m)');

// ---------- 6 numeric re-solve (independent arithmetic, then compare with the key)
const qs = new Map(release.questions.map((q) => [q.id.slice(-3), q]));
const flat = new Map();
release.questions.forEach((q) => { flat.set(q.id.slice(-3), q); q.children.forEach((c) => flat.set(`${q.id.slice(-3)}${c.id}`, c)); });
const sinD = (d) => Math.sin((d * Math.PI) / 180), cosD = (d) => Math.cos((d * Math.PI) / 180), asinD = (x) => (Math.asin(x) * 180) / Math.PI;
const solveLinear = (f) => { const a = f(0), b = f(1) - f(0); return -a / b; }; // root of a linear function
const num = (s) => Number(String(s).replace(/[^\d.\-]/g, ''));
const resolved = [];
const expectOption = (k, value, tol = 0.01) => {
  const q = flat.get(k);
  const chosen = q.options.find((o) => o.id === q.answer.option_ids[0]);
  const v = num(chosen.text_md.replace(/\\dfrac\{(\d+)\}\{(\d+)\}/, (m, a, b) => String(a / b)));
  const others = q.options.filter((o) => o.id !== chosen.id).map((o) => num(o.text_md.replace(/\\dfrac\{(\d+)\}\{(\d+)\}/, (m, a, b) => String(a / b))));
  const ok = Math.abs(v - value) <= tol && others.every((x) => Math.abs(x - value) > tol);
  resolved.push([k, value, v, ok]);
  if (!ok) err(`q${k}`, `re-solve ${value} but key option gives ${v} (or a distractor also equals it)`);
};
const expectKey = (k, id) => { const q = flat.get(k); const ok = q.answer.option_ids[0] === id; resolved.push([k, id, q.answer.option_ids[0], ok]); if (!ok) err(`q${k}`, `re-solve gives option ${id}, key is ${q.answer.option_ids[0]}`); };
const expectValue = (k, value, tol = 1e-6) => { const q = flat.get(k); const ok = Math.abs(q.answer.value - value) <= Math.max(tol, 1e-9) && q.answer.tolerance <= Math.abs(value) * 0.02 + 0.05; resolved.push([k, value, q.answer.value, ok]); if (!ok) err(`q${k}`, `re-solve ${value}, key ${q.answer.value} (tol ${q.answer.tolerance})`); };
const expectBlank = (k, value) => { const q = flat.get(k); const acc = q.answer.blanks[0].accepted.map((a) => (a.includes('/') ? eval(a.replace(/\s/g, '')) : num(a))); const ok = acc.some((a) => Math.abs(a - value) < 1e-6); resolved.push([k, value, q.answer.blanks[0].accepted.join('|'), ok]); if (!ok) err(`q${k}`, `re-solve ${value} not accepted`); };
const expectInModel = (k, values) => { const q = flat.get(k); const text = q.answer.model_answer_md; const fmt = (v) => (typeof v === "number" ? String(+v.toFixed(6)) : v); const ok = values.every((v) => text.includes(fmt(v))); resolved.push([k, values.join(', '), 'model answer', ok]); if (!ok) err(`q${k}`, `model answer lacks ${values.map(fmt).filter((v) => !text.includes(v))}`); };

expectKey('001', 'c');
expectOption('002', 15 * (25 / 10));
expectKey('003', 'a'); // A-Q, B-R, C-P => AB/QR = BC/RP
expectKey('004', 'c');
expectOption('005', (5 * 3) / 2);
{ const x = solveLinear((x) => (x + 1) * (3 * x + 4) - (x + 3) * (3 * x - 1)); if (!((x + 1) / (3 * x - 1) === (x + 3) / (3 * x + 4) || close((x + 1) / (3 * x - 1), (x + 3) / (3 * x + 4)))) err('q006', 'ratio check'); expectOption('006', x); }
expectKey('007', 'd'); expectKey('008', 'a');
expectOption('009', (4 / 10) * 12.5);
expectOption('010', (1.2 * 27) / 0.9);
{ const C = 180 - 50 - 60, R = 180 - 70 - 50; const map = { A: 50, B: 60, C }; const tri = { P: 70, Q: 50, R }; const order = ['A', 'B', 'C'].map((v) => Object.keys(tri).find((k) => tri[k] === map[v])).join(''); expectKey('011', { PQR: 'a', QRP: 'b', RPQ: 'c', QPR: 'd' }[order]); }
expectOption('012', (6 + 8 + 9) * (9 / 6));
expectOption('013', (2 / 5) * 12.5);
expectOption('014', 36 / 4);
expectKey('015', 'c');
expectOption('016', (2.4 * 9) / 3.6);
{ const q = flat.get('017'); const ok = q.answer.option_ids[0] === 'b' && /dfrac25/.test(q.options[1].text_md); resolved.push(['017', '2/5', q.options[1].text_md, ok]); if (!ok) err('q017', 'key'); }
{ const OC = 3.5, AO = 2 * OC; expectOption('018', AO + OC); }
expectKey('019', 'c'); if (!(12 / 14 !== 8 / 10)) err('q019', 'ratios equal?');
expectOption('020', (4 * 9) / 12);
// assertion-reason
{ const ok = 3 / 6 === 2 / 4; expectKey('021', ok ? 'a' : 'd'); }
expectKey('022', 'b'); expectKey('023', 'd');
{ const EC = (3 * 4) / 2; expectKey('024', EC === 6 ? 'a' : 'd'); }
expectKey('025', 'c');
{
  // q026: are the triangles similar? ABC: AB=3, BC=4, B=40. PQR: PQ=6, QR=8, R=40 (SSA).
  const AC = Math.sqrt(9 + 16 - 24 * cosD(40));
  const Aang = asinD((4 * sinD(40)) / AC); const angA = 4 ** 2 > 3 ** 2 + AC ** 2 ? 180 - Aang : Aang; const angC = 180 - 40 - angA;
  const P1 = asinD((8 * sinD(40)) / 6), P2 = 180 - P1;
  const setABC = [40, angA, angC].sort((a, b) => a - b);
  const similar = [P1, P2].some((P) => { const Q = 180 - 40 - P; return Q > 0 && [40, P, Q].sort((a, b) => a - b).every((x, i) => Math.abs(x - setABC[i]) < 0.1); });
  stats.q026 = { ABC: setABC.map((x) => x.toFixed(1)), PQR_P: [P1.toFixed(1), P2.toFixed(1)], similar };
  expectKey('026', similar ? 'c' : 'd');
  { const sol = flat.get('026').solution_md; for (const a of [...setABC.map((x) => x.toFixed(1)), Math.round(P1), Math.round(P2), Math.round(180 - 40 - P1), Math.round(180 - 40 - P2)]) if (!sol.includes(String(+a))) err('q026', `solution lacks angle ${a}`); }
}
// true-false
expectKey('027', 't'); expectKey('028', 'f');
{ const AD = 1, DB = 1, BC = 6, DE = (AD / (AD + DB)) * BC; expectKey('029', AD / DB === DE / BC ? 't' : 'f'); }
expectKey('030', 't');
{ const r = [4 / 2, 6 / 3, 7 / 4]; expectKey('031', r.every((x) => x === r[0]) ? 't' : 'f'); }
// fill-blank
{ const q = flat.get('032'); const ok = q.answer.blanks[0].accepted.includes('equilateral'); resolved.push(['032', 'equilateral', q.answer.blanks[0].accepted.join('|'), ok]); }
{ const q = flat.get('033'); const ok = q.answer.blanks[0].accepted.includes('Thales'); resolved.push(['033', 'Thales', q.answer.blanks[0].accepted.join('|'), ok]); }
expectBlank('034', 7.5 / 5);
expectBlank('035', 3 / 7);
expectBlank('036', (2 / 3) * 45);
// numerical
expectValue('037', (3.2 / (3.2 + 4.8)) * 9);
expectValue('038', (2.5 * 4.9) / 3.5);
expectValue('039', (5.4 / 3.6) * (3.6 + 4.8 + 6));
expectValue('040', solveLinear((x) => 1.2 * (x + 4) - 7.2 * x));
expectValue('041', (42 * 2.1) / 1.5);
expectValue('042', (1.44 * 6) / 1.2);
expectValue('043', (3 / 8) * 12);
expectValue('044', 0.6 * (1.6 / 2.4));
{ // q045: crossing height by coordinates, independent of the formula
  const A = [0, 6], B = [0, 0], C = [15, 9], D = [15, 0];
  const t = ((C[0] - A[0]) * (B[1] - C[1]) - (C[1] - A[1]) * (B[0] - C[0])) / ((D[0] - A[0]) * (B[1] - C[1]) - (D[1] - A[1]) * (B[0] - C[0]));
  expectValue('045', A[1] + t * (D[1] - A[1]));
}
expectValue('046', (40 * 22.5) / 100);
// short / long: key numbers present in the model answer
expectInModel('048', [(4 / 9) * 18, (5 / 9) * 18]);
{ const ok = 1.5 / (4.5 - 1.5) === 2 / (6 - 2); if (!ok) err('q049', 'not parallel'); expectInModel('049', ['converse of BPT']); }
{ const r = [6 / 4, 9 / 6, 12 / 8]; if (!r.every((x) => x === 1.5)) err('q050', 'ratios'); expectInModel('050', ['SSS', '1.5']); }
expectInModel('051', [`${180 - 47 - 83}^\\circ`, 'EF']);
{ const t1 = [180 - 40 - 60, 40, 60].sort(), t2 = [180 - 60 - 80, 60, 80].sort(); if (t1.join() !== t2.join()) err('q053', 'angle sets differ'); expectInModel('053', ['AA', 'not']); }
{ // q054 correspondence by sorting sides
  const abc = { AB: 4, BC: 5, CA: 6 }, def = { DE: 9, EF: 7.5, FD: 6 };
  const a = Object.entries(abc).sort((x, y) => x[1] - y[1]), d = Object.entries(def).sort((x, y) => x[1] - y[1]);
  const ratios = a.map((x, i) => d[i][1] / x[1]); if (!ratios.every((r) => r === ratios[0])) err('q054', 'not similar');
  const pair = {}; a.forEach(([s], i) => (pair[s] = d[i][0]));
  const vert = (s1, s2) => [...s1].find((c) => s2.includes(c));
  const map = { A: vert(pair.AB, pair.CA), B: vert(pair.AB, pair.BC), C: vert(pair.BC, pair.CA) };
  expectInModel('054', [`\\triangle ABC \\sim \\triangle ${map.A}${map.B}${map.C}`]);
}
expectInModel('055', [4 * (21 / 7), 5 * (21 / 7)]);
{ const x = solveLinear((x) => 2 * x * (3 * x + 5) - (2 * x + 2) * (3 * x + 1)); expectInModel('056', [`x = ${x}`, `AD = ${2 * x}`, `AE = ${2 * x + 2}`]); }
expectInModel('057', [(4 / 10) * 12.5, 12.5 - 5, (3.6 * 10) / 4]);
{ if (!(2.4 / 3.6 === 3 / 4.5 || close(2.4 / 3.6, 3 / 4.5))) err('q058', 'ratios'); expectInModel('058', ['SAS', 'AB \\parallel CD']); }
{ const parallelOK = close(6 / 9, 4 / (10 - 4)); if (!parallelOK) err('q059', 'not parallel'); expectInModel('059', [(6 / 15) * 12.5]); }
expectInModel('060', [`x = ${solveLinear((x) => 1.35 * (x + 3) - 5.4 * x)}`, `d = ${+((1.6 * 5.4) / 1.35 - 1.6).toFixed(6)}`]);
{ const k = 15 / 6, AO = (k / (k + 1)) * 14; expectInModel('061', [AO, 14 - AO]); }
expectInModel('062', [(12 * 30) / 10]);
{ const k = 45 / (5 + 6 + 7); expectInModel('063', [5 * k, 6 * k, 7 * k]); }
{ const r = [1.2 / 0.8, 1.8 / 1.2, 2.4 / 1.8]; if (!(close(r[0], r[1]) && !close(r[2], r[0]))) err('q064', 'ratios'); expectInModel('064', ['A and B are similar']); }
expectInModel('067', [(3 / 5) * 10]);
{ const PQ = (1 / 3) * 9; expectInModel('068', [`PQ = ${PQ}`, '1 : 3']); }
{ const m = solveLinear((x) => 1.5 * (x + 3.5) - 5 * x), a = solveLinear((y) => 1.25 * (y + 6) - 5 * y); expectInModel('069', [`x = ${m}`, `y = ${a}`, `${a} - ${m} = ${a - m}`]); }
expectInModel('070', ['\\dfrac{2}{3}']);
{ if (close(4 / 11, 5 / 7)) err('q071', 'would be parallel'); expectInModel('071', [13.5 / 3, '\\dfrac{4}{11}', '\\dfrac57']); }
{ const h = 1.5 + ((2 - 1.5) / 1.2) * (1.2 + 9.6); const wrong = (2 / 1.2) * 10.8; expectInModel('072', [`h = ${h}`, String(+wrong.toFixed(6))]); }
// case children
expectKey('073a', 'b'); expectValue('073b', (1.5 / 2) * 49.6); expectInModel('073c', [(37.2 * 1.2) / 1.5]);
expectKey('074a', 'c'); expectValue('074b', 25 - (12 / 30) * 25); expectInModel('074c', [(24 / 30) * 25, 25 - 20, 9 / 30, 7 / 25]);
{ const opts = [[8, 10, 11], [6, 7.5, 9], [5, 6, 7], [8, 9, 10]]; const idx = opts.findIndex((o) => o.every((x, i) => close(x / [4, 5, 6][i], o[0] / 4))); expectKey('075a', 'abcd'[idx]); }
expectValue('075b', 15 / 6); expectInModel('075c', [(10 / 6).toFixed(2), 4 * 2.5, 5 * 2.5, 6 * 2.5]);
expectKey('076a', 'd'); expectValue('076b', (1.5 * 8.4) / 1.4); expectInModel('076c', [(1.2 * 8.4) / 9]);
expectKey('077a', 'a'); expectValue('077b', (1.6 / 2.4) * 1.5); expectInModel('077c', [`BC = ${(1 * 2.4) / 2}`, '\\dfrac{13}{11}']);
expectKey('078a', 'c'); expectValue('078b', (12 / 30) * 9); expectInModel('078c', [(12 * 9) / 6, (12 * 180) / 2.4]);
// qualitative items (no number to recompute) — listed so the coverage is explicit
const qualitative = ['047', '052', '065', '066', '070'];
const resolvedIds = new Set(resolved.map((r) => r[0].slice(0, 3)).concat(qualitative));
for (const id of qs.keys()) if (!resolvedIds.has(id)) err(`q${id}`, 'not covered by the re-solve');

// marking schemes, children
for (const q of release.questions) {
  const all = [q, ...q.children];
  for (const c of all) {
    const sum = c.marking_scheme.reduce((s, m) => s + m.marks, 0);
    if (Math.abs(sum - c.marks) > 1e-9) err(q.id, `scheme ${sum} vs marks ${c.marks}`);
    if (c.type === 'long' && c.marking_scheme.length < 4) err(q.id, 'long answer needs step marks');
  }
}

// ---------- 7 statistics
const count = (arr, f) => arr.reduce((m, x) => ((m[f(x)] = (m[f(x)] ?? 0) + 1), m), {});
const Q = release.questions;
stats.mathStringsParsed = mathCount;
stats.narration = { slides: nSlides, maxWords, meanWords: Math.round(sumWords / nSlides) };
stats.slides = release.decks.map((d) => d.slides.length);
stats.layouts = count(release.decks.flatMap((d) => d.slides), (s) => s.layout);
stats.maxGapWithoutVisual = Math.max(...release.decks.map((d) => { let g = 0, m = 0; d.slides.forEach((s) => { g = s.visual ? 0 : g + 1; m = Math.max(m, g); }); return m; }));
stats.slidesWithVisual = release.decks.flatMap((d) => d.slides).filter((s) => s.visual).length;
stats.checks = release.decks.map((d) => d.slides.filter((s) => s.check_question_id).map((s) => s.check_question_id.slice(-3)));
stats.checkTypes = release.decks.flatMap((d) => d.slides.filter((s) => s.check_question_id)).map((s) => Q.find((q) => q.id === s.check_question_id).type);
stats.flashcards = release.flashcards.cards.length;
stats.flashcardTags = count(release.flashcards.cards, (c) => c.tag);
stats.questions = Q.length;
stats.byType = count(Q, (q) => (q.type === 'short' ? `short-${q.marks}` : q.type));
stats.byDifficulty = count(Q, (q) => `d${q.difficulty}`);
stats.byCompetency = count(Q, (q) => q.competency);
const appPlus = Q.filter((q) => ['application', 'analysis', 'evaluation'].includes(q.competency));
stats.applicationOrHigher = `${Math.round((100 * appPlus.length) / Q.length)}% of items, ${Math.round((100 * appPlus.reduce((s, q) => s + q.marks, 0)) / Q.reduce((s, q) => s + q.marks, 0))}% of marks`;
stats.byTopic = count(Q.flatMap((q) => q.topic_ids), (t) => t.slice(-3));
stats.totalMarks = Q.reduce((s, q) => s + q.marks, 0);
stats.reSolved = `${resolved.filter((r) => r[3]).length}/${resolved.length} checks pass; ${qualitative.length} proof items checked by hand (${qualitative.join(', ')})`;
// tests
for (const t of tests) {
  const ids = t.sections.flatMap((s) => s.items.map((i) => i.question_id));
  stats[t.id] = `${t.total_marks} marks / ${t.duration_min} min, ${ids.length} items, sections ${t.sections.map((s) => s.id).join('')}`;
}
const [ts, tl] = tests.map((t) => new Set(t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
const overlap = [...ts].filter((x) => tl.has(x));
if (overlap.length) err('tests', `short and long share ${overlap}`);

console.log(JSON.stringify(stats, null, 1));
if (process.argv.includes('--resolve')) for (const r of resolved) console.log(`  q${r[0].padEnd(5)} expected ${String(r[1]).padEnd(22)} key ${String(r[2]).slice(0, 40).padEnd(40)} ${r[3] ? 'OK' : 'MISMATCH'}`);
console.log(errors.length ? `ERRORS (${errors.length}):\n  ${errors.join('\n  ')}` : 'NO ERRORS');
process.exitCode = errors.length ? 1 : 0;
```
</details>
