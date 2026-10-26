# subject-producer — CBSE 10 Mathematics ch05, ch07, ch08, ch09, hand-authored (D-025, D-026) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-maths-b` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-maths-b`), based on `platform/main` 73e5dfc; merged `origin/platform/main` (3c190a9) once, at d4ea62a, and re-ran every check afterwards (no contract, lint or gate changes came in; the API dev server now publishes authored content).

## What changed
| Path | What |
|---|---|
| `platform/content/authored/maths/cbse-10-mathematics-ch05/` | Arithmetic Progressions: `release.json`, `tests.json`, `README.md`, `src/` |
| `platform/content/authored/maths/cbse-10-mathematics-ch07/` | Coordinate Geometry: same layout |
| `platform/content/authored/maths/cbse-10-mathematics-ch08/` | Introduction to Trigonometry: same layout |
| `platform/content/authored/maths/cbse-10-mathematics-ch09/` | Some Applications of Trigonometry: same layout, plus `src/figs.mjs` (heights-and-distances figure builders) |
| `…/cbse-10-mathematics-ch05/src/lib.mjs` | Copy of ch01's authoring library (ch01 untouched), shared by this batch, with the extensions listed below |
| `…/cbse-10-mathematics-ch05/src/lint.mts` | Copy of ch01's runner for the pipeline `lintExemplar` |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-maths-b.md` | This note |

Rebuild from `platform/`: `npx tsx content/authored/maths/<chapter>/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). The gate reads only the three files at the chapter root.

**Library extensions (`ch05/src/lib.mjs`):** plot `vlines`/`hlines` and `on_curve: false` (contract v2) and `series` tuples; **the pipeline's own `checkVisual` run on every visual** (so geometry degree labels, right-angle marks, scale and canvas bounds are enforced at build time, not only at lint); **`ChapterRelease` and `TestDefinition` parsed before writing** (added after a 41/40-mark long test slipped into a commit — see fixes); lost-backslash detection extended to `sin cos tan cot sec theta angle triangle perp parallel sim cong sum dots` with `\text{}`/`\operatorname{}` arguments stripped first; narration rejects `sin`, `cos`, `tan`, `sec`, `cot`, `AP`, `th`; per-option "(a) … (b) …" solution paragraphs are re-sorted into a–d order after MCQ key rotation; parent-level model-answer checks for case items.

Commits: 8b1d81b (ch05), c8cdbdc (ch07), 00d40a7 (ch07 test fix + schema checks in the builder), 21e7707 (ch08), 64665ef (ch09), d4ea62a (merge of `origin/platform/main`), ecde713 (verify/originality flags cleared), plus the README-count and handoff commits.

## Scope decisions
- **Syllabus** (`catalog/cbse/10/mathematics/syllabus.yaml`, Standard 041 and Basic 241): only the listed topic ids. Removed topics are absent everywhere, including distractors:
  - ch07 — **area of a triangle using coordinates**: collinearity is tested by distances only (and once by an exact surd comparison for a nearly collinear triple); decks, notes and exam tips say so.
  - ch08 — **ratios of complementary angles**: no item relates $A$ and $90^\circ - A$; the standard values are never written as "$\sin 30^\circ = \cos 60^\circ$"; a case alternative that would have verified $\cos 60^\circ = 1 - 2\sin^2 30^\circ$ was replaced by $\tan 60^\circ = \frac{\sin 60^\circ}{\cos 60^\circ}$.
  - ch09 — no removed topics, but the classic "complementary angles of elevation, $h = \sqrt{ab}$" configuration relies on ch08's removed topic, so it is absent. Every problem uses at most two right triangles and only $30^\circ$, $45^\circ$, $60^\circ$ (the syllabus LO).
  - ch05 — no removed topics.
- **Tests** match `cbse-10-default-chapter-test-short` / `-long` exactly (as ch01–ch04): A objective, B short 2/3 with the blueprint's internal choices, C long 5 with choice, D case-based; `blueprint_id` set; short and long tests disjoint.
- **Case items** use contract `alternatives` for the either/or part (c), carry `passage_origin: "soyl-original"`, and have full model answers per part and a parent summary.
- **Figures:** coordinate geometry uses `plot` (labelled points; segments as `series` of kind `line`). Trigonometry and heights-and-distances use `geometry` drawn **to scale from the true answers** with `scale: { unit: 'm', per_unit: k }` — no figure in ch08/ch09 needed `not_to_scale` (only ch05's hall plan is marked not to scale). Unknowns are labelled "?", $h$, $x$, $d$ or $k$-multiples, never with their answers.

## Counts
| | ch05 AP | ch07 Coordinate Geometry | ch08 Intro Trigonometry | ch09 Applications |
|---|---|---|---|---|
| Decks (slides) | 17 + 18 | 18 + 18 | 19 + 17 | 17 + 16 |
| Slides with a visual / max gap | 25 / 1 | 26 / 1 | 26 / 1 | 23 / 1 |
| Worked examples | 6 + 6 | 6 + 6 | 5 + 6 | 6 + 6 |
| Check slides (all objective) | 3 + 3 | 3 + 3 | 3 + 3 | 3 + 3 |
| Narration max / mean words | 66 / 53 | 64 / 48 | 65 / 44 | 64 / 47 |
| Notes sections | 7 | 6 | 6 | 6 |
| Flashcards | 30 | 30 | 30 | 30 |
| Questions / marks | 70 / 139 | 70 / 139 | 70 / 139 | 70 / 139 |
| Difficulty d1/d2/d3/d4/d5 | 12/29/21/7/1 | 14/32/18/5/1 | 14/35/15/5/1 | 15/25/24/5/1 |
| Application or higher | 61% items, 76% marks | 64%, 78% | 47%, 65% | 56%, 73% |
| AR keys | a b c d a d | a b c d a d | a b c d a d | a b c d a d |
| MCQ keys a/b/c/d | 6/6/6/5 | 6/6/6/5 | 6/6/6/5 | 6/6/6/5 |
| KaTeX strings (strict) | 1454 | 1436 | 1514 | 899 |
| Re-solve checks | 158/158 | 161/161 | 148/148 | 164/164 |
| Geometry figures checked | 3 | — | 19 | 28 |

Every bank: mcq 18 · assertion-reason 6 · true-false 5 · fill-blank 5 · numerical 9 (tolerance + unit) · short 2-mark 9 · short 3-mark 7 · long 5-mark 6 · case-based 5 (1 + 1 + 2, part (c) either/or). Ids `q_cbse10math_chNN_001…070`; tests `t_cbse10math_chNN_short|_long` (20 marks/40 min, 10 items; 40 marks/90 min, 22 items).

Visuals by kind (deck; notes/questions): ch05 plot 7 (incl. 2 bar charts), table 14, flow 2, geometry 2; plot 6, table 4, flow 2, geometry 1. ch07 plot 22, table 2, flow 2; plot 11, table 2, flow 1. ch08 geometry 11, table 13, flow 2; geometry 8, table 5, flow 1. ch09 geometry 17, table 4, flow 2; geometry 11, table 2, flow 1.

## How to verify (output on the final tree, after the merge)
```
cd platform && npm install
npm test -w @soyl/content-templates
 ✓ exemplars > maths/cbse-10-mathematics-ch05 > is a valid ChapterRelease
 ✓ exemplars > maths/cbse-10-mathematics-ch05 > is named after its chapter and has a README
 ✓ exemplars > maths/cbse-10-mathematics-ch05 > uses only topics from the chapter syllabus
 ✓ exemplars > maths/cbse-10-mathematics-ch05 > decks meet the visual lesson rules
 ✓ exemplars > maths/cbse-10-mathematics-ch05 > has enough flashcards and practice questions
 ✓ exemplars > maths/cbse-10-mathematics-ch05 > writes language subjects in their own script (NFC, well-formed, no Latin runs, TTS-safe narration)
 ✓ exemplars > maths/cbse-10-mathematics-ch05 > has a short and a long chapter test drawn from its own questions
   (the same 7 checks pass for ch07, ch08 and ch09)
 Test Files  1 passed (1)
      Tests  141 passed (141)

npm run content -- lint --exemplars
ok   cbse-10-mathematics-ch05: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch07: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch08: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch09: 0 error(s), 0 warning(s)
   (all other units ok: maths ch01–ch04, ch06; science ch01–ch05; hindi-a ch02; hindi-a ch10 ok with 17 warnings and science-ch01 with 1 — not mine)

npm run content -- verify --authored --state file --board cbse --class 10 --subject mathematics --chapter N   (stage 5, deterministic)
ok   cbse-10-mathematics-ch05 (authored): 70/70 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-mathematics-ch07 (authored): 70/70 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-mathematics-ch08 (authored): 70/70 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-mathematics-ch09 (authored): 70/70 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)

npm run content -- originality --authored --state file --board cbse --class 10 --subject mathematics --chapter N   (stage 6)
ok   cbse-10-mathematics-ch05 / ch07 / ch08 / ch09 (authored): 0 error(s), 0 warning(s)
   (reference-overlap check skipped: no owner-supplied reference texts; bank-duplicate check ran)

npx tsx content/authored/maths/cbse-10-mathematics-chNN/src/build.mjs   (author validator, per chapter)
ch05: KaTeX 1454 strings (0.19.0, throwOnError, strict: "error") 0 failures; plots: 52 marked points on their lines; geometry 3 figures pass the pipeline check; reSolved 158/158; NO ERRORS
ch07: KaTeX 1436; plots: 110 labelled points match their drawn positions; reSolved 161/161; NO ERRORS
ch08: KaTeX 1514; geometry: 19 figures (degree labels, right-angle marks, scale) pass; reSolved 148/148; NO ERRORS
ch09: KaTeX 899; geometry: 28 figures pass; reSolved 164/164; NO ERRORS
```
The pipeline `publish --authored` stage was **not** run: it needs the local Postgres migrated and seeded (`npm run db -w @soyl/db -- migrate up`, `seed catalog`), and the embedded dev server on port 54320 may be shared with other agents' worktrees, so I did not migrate it.

## Verifier pass (done by the author)
**Method.** Every item has an independent re-solve check written from the givens, never from the written answer, and option sets are checked value by value with exactly one match (`which`); numbers inside solutions, model answers and case parents are checked (`model`, `sol`).
- **ch05:** terms and sums are recomputed by **adding terms one at a time** (never by the $a_n$/$S_n$ formulas the solutions use); "which term / how many / first negative term" by searching over $n$; counting items brute-forced over the whole range (two-digit numbers $\equiv 1 \pmod 4$, three-digit numbers $\equiv 3 \pmod 8$, numbers ending in 7); stories re-run (400-block wall, train times in minutes, tank readings, both taxi tariffs); identities ($a_7 = 0 \Rightarrow S_{13} = 0$; $S_n = pn^2 + qn + r$ is an AP iff $r = 0$) checked on numeric cases.
- **ch07:** distances by `Math.hypot`; division points by **vector interpolation** $A + t(B - A)$, not the section formula; ratios from distances or axis-intercept parameters; collinearity by an independent cross-product test; unknown coordinates by integer search over $[-50, 50]$ (so both signs are always found); squares/rhombi/right triangles side by side and diagonal by diagonal.
- **ch08:** ratios from side lengths (Pythagoras) or `Math.sin/cos/tan` in degrees, never from the value table; angles by search over whole degrees; every identity evaluated on both sides at eight acute angles; "which value is possible" and "which is an identity" MCQs decided by testing each option.
- **ch09:** every answer verified by **rebuilding the scene** — the claimed heights and distances are placed as coordinates and each given angle is **measured back with `atan2`**; gaps and slant lengths measured with subtraction/`hypot`; eye heights applied at the eye; decimals checked against exact values within the stated tolerance ($\sqrt3 \approx 1.732$).
- **Figures (all chapters):** the pipeline `checkVisual` runs inside the build on every visual, so a figure with a wrong degree label, a non-90° right-angle mark, an off-scale length label or a point outside the canvas fails the build. ch09 figures are generated by `src/figs.mjs` from the true answers.

**Fixes made during the pass:**
1. **Wrong number in a case summary (ch07 q068, Bhopal playground):** the parent model answer gave the centre as $(1.5, 3.5)$; the correct common midpoint of both diagonals is $(1.5, 1.5)$ (part (c)(ii) itself was right). Parent-level `model` checks were then added to every case in all four chapters, so a summary can no longer drift from its parts.
2. **Long test over its marks (ch07):** section A of the long test included the 2-mark numerical q042 (41 attempted marks against 40). The gate caught it after the chapter commit; q043 (1 mark) replaced it (00d40a7), and the builder now parses tests and the release with the shared `TestDefinition`/`ChapterRelease` schemas before writing.
3. **Lost backslash (ch05 notes):** a key-term definition in a plain JS string turned `\ge` into "ge" ("$n$ ge $2$"); caught by the author validator, rewritten as a raw string.
4. **Draft artifact (ch09 q062):** a half-written part (d) ("how long after … $\ldots$? Instead: …") left in the balloon stem; replaced by a clean part (d).
5. **LaTeX in accepted answers (ch08 q030, q067b):** `\sqrt3` and `\dfrac{\sqrt3}{2}` forms removed from `accepted` (they would render as raw LaTeX); plain forms (√3, sqrt3, 1.732) kept.
6. **Option order after key rotation:** solutions that discuss each option in its own "(a) …" paragraph read (c), (d), (a), (b) after rotation; the builder now re-sorts them.
7. **Validator false positive:** the new trigonometric lost-backslash words flagged "angle" inside `\text{…}` (ch09 notes); text arguments are now stripped first, as in the pipeline's rule.
8. **Pipeline verify (stage 5) minor flags, 8 → 0:** fill-blank answers stated only in LaTeX (ch05 q068b, ch08 q031–q034, q067b) now also appear in plain form; two numerical keys reached only through "≈" (ch09 q041, q070b) now have an "=" step that computes them.
9. **Pipeline originality (stage 6) bank duplicates, 20 → 0:** nine stems that read identically once maths is stripped (e.g. "The $x$-axis divides …" vs "The $y$-axis divides …") were reworded (ch05 q030; ch07 q016, q031, q032, q034, q054; ch08 q014, q054, q056).
10. **Honest labels:** the lint's competency band flagged ch08 at 44% application+; two items whose demand is genuinely above routine were relabelled (q048 proving a new identity, q067 deriving ratios from a constructed figure) → 47%. d1 shares cut by relabelling three two-step items each in ch07 (q002, q023, q044) and ch09 (q001, q043, q045) to d2. No key or solution number was wrong in the final re-solve.

**Originality:** no NCERT / RD Sharma / RS Aggarwal / CBSE-paper item is reused; each chapter README lists the famous configurations deliberately avoided (e.g. three-digit multiples of 7, the 600/700 TV sets, "7 + 10½ + … + 84"; the $(6, 5)/(-4, 3)$ y-axis point, the $(-3, 10)/(6, -8)$ division and its translates, $A(-2, 2)/B(2, 8)$ in four parts; "15 cot A = 8", $AB = 24, BC = 7$, the Ex 8.4 identities; the circus rope, broken tree, 60 m kite, canal TV tower, 75 m lighthouse, 88.2 m balloon). Where a configuration type is unavoidable (same-side pair, object on top, moving object), the set-up, numbers and what is asked were changed. Contexts are Indian and varied (Pune autos, Nagpur trains, Anand dairy, Uttarayan kites, Chandigarh grid, Lalbagh, Wardha villages, Kolkata metro, Kozhikode roof truss, Madurai gopuram, Varkala cliff, Kollam lighthouse, Rishikesh zip-line, Jantar Mantar shadows, Pushkar balloon, Dehradun fire-watch tower, and more).

## Tests added
None (content only). The existing gate, lint, verify and originality stages cover the chapters; the builder additionally enforces the pipeline visual check and the shared schemas at build time.

## Known gaps / follow-ups
- **Publish stage not run** (local DB not migrated; see above).
- **Narration audio** not generated (TTS stage); narration is TTS-safe (ratios spoken as "sine", "cosine", "tangent"…; no "AP", no ordinals like "25th").
- **Renderer needs:** `series` of kind `line` (coordinate segments) and `bar` (ch05 savings and seats); KaTeX in plot point labels ($P(x_1, y_1)$) and geometry segment labels; geometry `arcs`, `scale`, `label: false` helper points.
- **Competency shares:** ch08 is 47% application+ (identity chapters are recall-heavy at the bottom); analysis/evaluation items are few in ch07 (evaluation 1) and ch09 (analysis 2). d4–d5 items are 5–8 per chapter.
- **Total marks 139** in each bank (two 1-mark numericals), as in ch01.
- `src/` holds sources inside each chapter folder (owned path); the shared library lives in `ch05/src/lib.mjs`. If a tooling location is created, ch01's and ch05's libraries should be merged there.

## Recommendations (for pipeline-engineer / Lead)
1. **Run `checkVisual` and `TestDefinition` in authoring loops**, not only at lint/gate: both caught real problems here at build time (a 41/40 test; geometry checks).
2. **Lint `latex.backslash`:** add the trigonometric names (`sin`, `cos`, `tan`, `sec`, `cot`, `csc`, `theta`) to `BARE_COMMAND` — "sin A" without a backslash renders in italics as s·i·n and is easy to miss.
3. **Originality `bank.duplicate`:** stems are compared with maths stripped, so "The $x$-axis divides …" and "The $y$-axis divides …" count as the same stem. Consider keeping single-letter maths tokens (or a hash of the maths) in the fingerprint; ch01 (6) and ch02 (16) also carry such findings.
4. **Verify `objective.blanks`:** accept LaTeX forms in the solution ($\dfrac{15}{8}$ for "15/8") so authors need not restate answers in plain text.
5. **Narration rule:** reject letter+digit ordinals ("25th") and trig abbreviations in narration at lint (the author validator does).

## Needs from owner
None.

The logs below are `src/resolve.log` from the final build. Option letters in them are the **authored** letters: the re-solve runs before the key-balancing rotation, which then remaps letters mechanically and verifies the key text is unchanged.

<details><summary>Numeric re-solve output, ch05 (158 checks, 158 OK)</summary>

```
001:m01                      expected true                                     got c (hits c)                                         OK
002:m02                      expected -0.5                                     got b (hits b)                                         OK
003:m03                      expected 3                                        got a (hits a)                                         OK
003:m03                      expected terms in AP                              got assert                                             OK
004:m04                      expected -31                                      got a (hits a)                                         OK
005:m05                      expected 15                                       got a (hits a)                                         OK
006:m06                      expected -4                                       got a (hits a)                                         OK
006:m06                      expected constant d                               got assert                                             OK
007:m07                      expected 46                                       got a (hits a)                                         OK
008:m08                      expected 5                                        got a (hits a)                                         OK
008:m08                      expected a13                                      got assert                                             OK
009:m09                      expected 219                                      got a (hits a)                                         OK
010:m10                      expected true                                     got a (hits a)                                         OK
011:m11                      expected 590                                      got a (hits a)                                         OK
011:m11                      expected a20                                      got assert                                             OK
012:m12                      expected true                                     got a (hits a)                                         OK
013:m13                      expected 338                                      got a (hits a)                                         OK
013:m13                      expected 13, 26                                   got solution                                           OK
014:m14                      expected 10                                       got a (hits a)                                         OK
015:m15                      expected 225                                      got a (hits a)                                         OK
016:m16                      expected 15                                       got a (hits a)                                         OK
017:m17                      expected 150                                      got a (hits a)                                         OK
017:m17                      expected 24                                       got solution                                           OK
018:m18                      expected 121                                      got a (hits a)                                         OK
019:ar1                      expected a17                                      got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected S10                                      got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected constant AP                              got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected 0 not a term                             got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected d = 4                                    got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected sum 0                                    got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected not AP                                   got assert                                             OK
025:tf1                      expected f                                        got f                                                  OK
026:tf2                      expected scaled AP                                got assert                                             OK
026:tf2                      expected t                                        got t                                                  OK
027:tf3                      expected a30                                      got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected counter-example                          got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected example                                  got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected 7                                        got 7                                                  OK
031:fb2                      expected 16                                       got 16                                                 OK
032:fb3                      expected 325                                      got 325                                                OK
033:fb4                      expected 6                                        got 6                                                  OK
033:fb4                      expected AP                                       got assert                                             OK
034:fb5                      expected 220                                      got 220                                                OK
035:n01                      expected 243                                      got 243                                                OK
035:n01                      expected 198                                      got solution                                           OK
036:n02                      expected 32                                       got 32                                                 OK
036:n02                      expected neighbours                               got assert                                             OK
036:n02                      expected 30.25, 31.25, 1, -3                      got solution                                           OK
037:n03                      expected 22                                       got 22                                                 OK
037:n03                      expected 13, 97, 21                               got solution                                           OK
038:n04                      expected 632                                      got 632                                                OK
038:n04                      expected 2, 77, 79                                got solution                                           OK
039:n05                      expected 861                                      got 861                                                OK
039:n05                      expected 21, 82                                   got solution                                           OK
040:n06                      expected 14                                       got 14                                                 OK
040:n06                      expected 3249, 57, 14.5, 29                       got solution                                           OK
041:n07                      expected 12.25                                    got 12.25                                              OK
041:n07                      expected 735, 105                                 got solution                                           OK
042:n08                      expected 23                                       got 23                                                 OK
042:n08                      expected neighbours                               got assert                                             OK
042:n08                      expected 760, 1975, 2010                          got solution                                           OK
043:n09                      expected 1640                                     got 1640                                               OK
044:s201                     expected AP                                       got assert                                             OK
044:s201                     expected 4, 6, 10, 14                             got model answer                                       OK
045:s202                     expected a15                                      got assert                                             OK
045:s202                     expected 7, 5, 127                                got model answer                                       OK
046:s203                     expected conditions                               got assert                                             OK
046:s203                     expected 35, 31, 27                               got model answer                                       OK
046:s203                     expected 7, -13                                   got solution                                           OK
047:s204                     expected n                                        got assert                                             OK
047:s204                     expected 15, 92, 84                               got model answer                                       OK
048:s205                     expected odd count                                got assert                                             OK
048:s205                     expected 31, 16, 111                              got model answer                                       OK
049:s206                     expected S22                                      got assert                                             OK
049:s206                     expected 105, 89, -979                            got model answer                                       OK
050:s207                     expected AP                                       got assert                                             OK
050:s207                     expected 2, 8, 14, 68                             got model answer                                       OK
050:s207                     expected 420, 352                                 got solution                                           OK
051:s208                     expected savings                                  got assert                                             OK
051:s208                     expected 290, 2900                                got model answer                                       OK
052:s209                     expected his value                                got assert                                             OK
052:s209                     expected 2, 63, 378                               got model answer                                       OK
052:s209                     expected 59                                       got solution                                           OK
053:s301                     expected d = 2                                    got assert                                             OK
053:s301                     expected d = -3                                   got assert                                             OK
053:s301                     expected d = 0.5                                  got assert                                             OK
053:s301                     expected a = -6d, 2a + 12d                        got model answer                                       OK
054:s302                     expected ends                                     got assert                                             OK
054:s302                     expected 112, 61712, 1102                         got model answer                                       OK
055:s303                     expected n                                        got assert                                             OK
055:s303                     expected 252, 43, 137, 5891                       got model answer                                       OK
056:s304                     expected 90, 49680, 1104                          got model answer                                       OK
057:s305                     expected n                                        got assert                                             OK
057:s305                     expected 490, 9801, 99, 10, 47                    got model answer                                       OK
058:s306                     expected 98, 138, 2070                            got model answer                                       OK
059:s307                     expected amounts                                  got assert                                             OK
059:s307                     expected 720, 8720, 10080, 18800                  got model answer                                       OK
059:s307                     expected 10800                                    got solution                                           OK
060:l01                      expected conditions                               got assert                                             OK
060:l01                      expected 100 not a term                           got assert                                             OK
060:l01                      expected -8, 5, 790, 79, 21.6, 22                 got model answer                                       OK
060:l01                      expected 2, 32                                    got solution                                           OK
061:l02                      expected sums                                     got assert                                             OK
061:l02                      expected general forms                            got assert                                             OK
061:l02                      expected 19, 83, 45, 3, 7, 3n + 4, 3n + 11        got model answer                                       OK
061:l02                      expected 38                                       got solution                                           OK
062:l03                      expected S14                                      got assert                                             OK
062:l03                      expected 2150, 15900, 826, 10201, 101, 14         got model answer                                       OK
062:l03                      expected 2950                                     got solution                                           OK
063:l04                      expected list                                     got assert                                             OK
063:l04                      expected r = 0                                    got assert                                             OK
063:l04                      expected r = 0                                    got assert                                             OK
063:l04                      expected r = 5                                    got assert                                             OK
063:l04                      expected 6, 9, 13, 4n + 1, 81, r = 0              got model answer                                       OK
064:l05                      expected wall                                     got assert                                             OK
064:l05                      expected 20, 630, 396, 432, 4                     got model answer                                       OK
065:l06                      expected n                                        got assert                                             OK
065:l06                      expected 210, 270, 282, 12, 15n + 45, 18n + 12    got model answer                                       OK
066:c01.a                    expected 255                                      got a (hits a)                                         OK
066:c01.b                    expected 16                                       got 16                                                 OK
066:c01.c                    expected 1875                                     got model answer                                       OK
066:c01.cii                  expected general term                             got assert                                             OK
066:c01.cii                  expected 5250, 3375                               got model answer                                       OK
066:c01                      expected 255, 16, 1875, 3375                      got model answer                                       OK
067:c02.a                    expected 0.5                                      got c (hits c)                                         OK
067:c02.b                    expected 9                                        got 9                                                  OK
067:c02.c                    expected 82.5                                     got model answer                                       OK
067:c02.cii                  expected 21, 147                                  got model answer                                       OK
067:c02                      expected 0.5, 9, 82.5, 21, 147                    got model answer                                       OK
068:c03.a                    expected b                                        got b                                                  OK
068:c03.b                    expected 7:28                                     got assert                                             OK
068:c03.b                    expected 7:28                                     got 7:28|7.28|7:28 am|07:28                            OK
068:c03.c                    expected 17, 540                                  got model answer                                       OK
068:c03.c                    expected 8:52                                     got assert                                             OK
068:c03.cii                  expected 1396, 89, 1056                           got model answer                                       OK
068:c03                      expected 7{:}28, 17, 89                           got model answer                                       OK
069:c04.a                    expected 2                                        got d (hits d)                                         OK
069:c04.b                    expected 10                                       got 10                                                 OK
069:c04.c                    expected an                                       got assert                                             OK
069:c04.c                    expected 10n - 8                                  got model answer                                       OK
069:c04.cii                  expected 20                                       got model answer                                       OK
069:c04.cii                  expected 1940, 1748                               got solution                                           OK
069:c04                      expected 2, 10, 10n - 8, 20                       got model answer                                       OK
070:c05.a                    expected 6850                                     got c (hits c)                                         OK
070:c05.b                    expected 15                                       got 15                                                 OK
070:c05.c                    expected 500 never                                got assert                                             OK
070:c05.c                    expected 9100, 800, 250                           got model answer                                       OK
070:c05.cii                  expected 5800, 3800, 1450                         got model answer                                       OK
070:c05                      expected 6850, 15, 5800, 3800                     got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch07 (161 checks, 161 OK)</summary>

```
001:m01                      expected 13                                       got a (hits a)                                         OK
002:m02                      expected 8                                        got a (hits a)                                         OK
003:m03                      expected true                                     got a (hits a)                                         OK
004:m04                      expected unique                                   got assert                                             OK
004:m04                      expected [0,-1]                                   got a (hits a)                                         OK
004:m04                      expected 58                                       got solution                                           OK
005:m05                      expected [-4,4]                                   got a (hits a)                                         OK
006:m06                      expected isosceles right                          got assert                                             OK
006:m06                      expected a                                        got a                                                  OK
007:m07                      expected collinear, B between                     got assert                                             OK
007:m07                      expected a                                        got a                                                  OK
008:m08                      expected 10                                       got a (hits a)                                         OK
009:m09                      expected [2,2]                                    got a (hits a)                                         OK
010:m10                      expected [3,5]                                    got a (hits a)                                         OK
010:m10                      expected distractor 3:2                           got assert                                             OK
011:m11                      expected [-1,-5]                                  got a (hits a)                                         OK
011:m11                      expected midpoint                                 got assert                                             OK
012:m12                      expected 0.49999999999999994                      got a (hits a)                                         OK
012:m12                      expected point (0, 2)                             got assert                                             OK
013:m13                      expected on line                                  got assert                                             OK
013:m13                      expected 1.5                                      got a (hits a)                                         OK
014:m14                      expected [3,4]                                    got a (hits a)                                         OK
014:m14                      expected diagonals bisect                         got assert                                             OK
015:m15                      expected [0,3]                                    got a (hits a)                                         OK
015:m15                      expected nearer A                                 got assert                                             OK
016:m16                      expected 2                                        got a (hits a)                                         OK
016:m16                      expected point                                    got assert                                             OK
017:m17                      expected 1000                                     got a (hits a)                                         OK
018:m18                      expected [8,7.5]                                  got a (hits a)                                         OK
018:m18                      expected 3/4 of the way                           got assert                                             OK
019:ar1                      expected 13                                       got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected both                                     got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected A true, R counter-example                got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected ratio 1:2                                got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected 3-4-5                                    got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected 2:1                                      got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected 5                                        got assert                                             OK
025:tf1                      expected f                                        got f                                                  OK
026:tf2                      expected collinear                                got assert                                             OK
026:tf2                      expected t                                        got t                                                  OK
027:tf3                      expected example                                  got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected closer to A                              got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected y = -3                                   got assert                                             OK
029:tf5                      expected y = 0                                    got assert                                             OK
029:tf5                      expected y = 2.5                                  got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected 5                                        got 5                                                  OK
031:fb2                      expected 3                                        got 3                                                  OK
032:fb3                      expected 17                                       got 17                                                 OK
033:fb4                      expected y = 2                                    got assert                                             OK
033:fb4                      expected 5                                        got 5                                                  OK
034:fb5                      expected 1:3                                      got assert                                             OK
034:fb5                      expected 1:3                                      got 1:3|1 : 3                                          OK
035:n01                      expected 24                                       got 24                                                 OK
036:n02                      expected -3,9                                     got assert                                             OK
036:n02                      expected 9                                        got 9                                                  OK
037:n03                      expected 10                                       got 10                                                 OK
038:n04                      expected 3                                        got 3                                                  OK
038:n04                      expected P                                        got assert                                             OK
039:n05                      expected ratio 1:2                                got assert                                             OK
039:n05                      expected 5                                        got 5                                                  OK
040:n06                      expected 26                                       got 26                                                 OK
041:n07                      expected 8.5                                      got 8.5                                                OK
042:n08                      expected D                                        got assert                                             OK
042:n08                      expected 6.082763                                 got 6.08                                               OK
043:n09                      expected 4                                        got 4                                                  OK
044:s201                     expected mid                                      got assert                                             OK
044:s201                     expected 10                                       got model answer                                       OK
045:s202                     expected -5,11                                    got assert                                             OK
045:s202                     expected 64, 11, -5                               got model answer                                       OK
046:s203                     expected (2, 3) equidistant                       got assert                                             OK
046:s203                     expected (4, 6) equidistant                       got assert                                             OK
046:s203                     expected (-2, -3) equidistant                     got assert                                             OK
046:s203                     expected off the line                             got assert                                             OK
046:s203                     expected 3x = 2y                                  got model answer                                       OK
047:s204                     expected P                                        got assert                                             OK
047:s204                     expected -2, 3                                    got model answer                                       OK
047:s204                     expected 6, 4                                     got solution                                           OK
048:s205                     expected mid                                      got assert                                             OK
048:s205                     expected 2, -5                                    got model answer                                       OK
049:s206                     expected ratio and point                          got assert                                             OK
049:s206                     expected 2, 4                                     got model answer                                       OK
050:s207                     expected his and correct                          got assert                                             OK
050:s207                     expected 5, 169, 13                               got model answer                                       OK
051:s208                     expected right at B                               got assert                                             OK
051:s208                     expected 72, 18, 90                               got model answer                                       OK
052:s209                     expected P                                        got assert                                             OK
052:s209                     expected 3, 0                                     got model answer                                       OK
053:s301                     expected square                                   got assert                                             OK
053:s301                     expected 5, 50                                    got model answer                                       OK
054:s302                     expected x                                        got assert                                             OK
054:s302                     expected -2, 5, 16                                got model answer                                       OK
055:s303                     expected equilateral                              got assert                                             OK
055:s303                     expected 6, 27, 1 + 3\sqrt3, 6.2                  got model answer                                       OK
056:s304                     expected points                                   got assert                                             OK
056:s304                     expected -1, 3, 2, 5, 7                           got model answer                                       OK
057:s305                     expected ratio                                    got assert                                             OK
057:s305                     expected P                                        got assert                                             OK
057:s305                     expected 2 : 3, 2                                 got model answer                                       OK
057:s305                     expected 6, 9                                     got solution                                           OK
058:s306                     expected parallelogram                            got assert                                             OK
058:s306                     expected 2.5, 4.5, 2, 4                           got model answer                                       OK
059:s307                     expected diameter                                 got assert                                             OK
059:s307                     expected 5, -7                                    got model answer                                       OK
060:l01                      expected rhombus                                  got assert                                             OK
060:l01                      expected 5, 8, 6                                  got model answer                                       OK
061:l02                      expected medians                                  got assert                                             OK
061:l02                      expected 4, -2, 1, -1, \dfrac73, \sqrt{61}, 7.81  got model answer                                       OK
062:l03                      expected W                                        got assert                                             OK
062:l03                      expected 10, 16, 200, 256, 132, 8.25, 6.25, 39.06 got model answer                                       OK
063:l04                      expected 2,4                                      got assert                                             OK
063:l04                      expected isosceles at 2                           got assert                                             OK
063:l04                      expected 20, x^2 - 6x + 8 = 0, \sqrt{10}, \sqrt{1 got model answer                                       OK
064:l05                      expected trisection                               got assert                                             OK
064:l05                      expected 2, 3, -3, 9\sqrt2, 3\sqrt2, 4.24         got model answer                                       OK
065:l06                      expected all                                      got assert                                             OK
065:l06                      expected 15, 5, 225, 25, 250                      got model answer                                       OK
066:c01.a                    expected 10                                       got b (hits b)                                         OK
066:c01.b                    expected 6                                        got 6                                                  OK
066:c01.c                    expected quarter                                  got assert                                             OK
066:c01.c                    expected 2.5, 4                                   got model answer                                       OK
066:c01.cii                  expected right at A                               got assert                                             OK
066:c01.cii                  expected 200                                      got model answer                                       OK
066:c01                      expected (2.5, 4), 10, 200                        got model answer                                       OK
067:c02.a                    expected [3,5]                                    got c (hits c)                                         OK
067:c02.b                    expected 4                                        got 4                                                  OK
067:c02.c                    expected 4, 4.47                                  got model answer                                       OK
067:c02.c                    expected AP                                       got assert                                             OK
067:c02.cii                  expected 1:3                                      got assert                                             OK
067:c02.cii                  expected 3.5                                      got model answer                                       OK
067:c02                      expected (3, 5), (1, 4), 2\sqrt5, (0, 3.5)        got model answer                                       OK
068:c03.a                    expected 5                                        got d (hits d)                                         OK
068:c03.b                    expected 7.071068                                 got 7.07                                               OK
068:c03.c                    expected square                                   got assert                                             OK
068:c03.c                    expected 5, \sqrt{50}                             got model answer                                       OK
068:c03.cii                  expected centre                                   got assert                                             OK
068:c03.cii                  expected 1.5, 3.54, 35.4                          got model answer                                       OK
068:c03                      expected (1.5, 1.5), 7.07, 3.54, 35.4             got model answer                                       OK
069:c04.a                    expected [2,1.5]                                  got a (hits a)                                         OK
069:c04.b                    expected 15                                       got 15                                                 OK
069:c04.c                    expected x-axis                                   got assert                                             OK
069:c04.c                    expected 4                                        got model answer                                       OK
069:c04.cii                  expected y-axis                                   got assert                                             OK
069:c04.cii                  expected 3                                        got model answer                                       OK
069:c04                      expected (2, 1.5), 15, (4, 0), (0, 3)             got model answer                                       OK
070:c05.a                    expected 5                                        got b (hits b)                                         OK
070:c05.b                    expected R outside                                got assert                                             OK
070:c05.b                    expected no                                       got no                                                 OK
070:c05.c                    expected M                                        got assert                                             OK
070:c05.c                    expected 1.5, 6.5, 12.5, 3.54                     got model answer                                       OK
070:c05.cii                  expected max                                      got assert                                             OK
070:c05.cii                  expected 5.66, 4\sqrt2                            got model answer                                       OK
070:c05                      expected (1.5, 6.5), 3.54, 5.66                   got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch08 (148 checks, 148 OK)</summary>

```
001:m01                      expected AC = 29                                  got assert                                             OK
001:m01                      expected 0.7241379310344828                       got a (hits a)                                         OK
002:m02                      expected 0.4166666666666665                       got a (hits a)                                         OK
003:m03                      expected true                                     got c (hits c)                                         OK
004:m04                      expected reciprocal                               got assert                                             OK
004:m04                      expected a                                        got a                                                  OK
005:m05                      expected 1.9999999999999998                       got a (hits a)                                         OK
006:m06                      expected 1.9999999999999984                       got a (hits a)                                         OK
007:m07                      expected 1.9999999999999998                       got a (hits a)                                         OK
008:m08                      expected 30                                       got a (hits a)                                         OK
009:m09                      expected tan 90 undefined                         got assert                                             OK
009:m09                      expected a                                        got a                                                  OK
010:m10                      expected decreasing 1 to 0                        got assert                                             OK
010:m10                      expected a                                        got a                                                  OK
011:m11                      expected 0.8660254037844386                       got a (hits a)                                         OK
012:m12                      expected constant 2                               got assert                                             OK
012:m12                      expected a                                        got a                                                  OK
013:m13                      expected true                                     got a (hits a)                                         OK
014:m14                      expected 1.25                                     got a (hits a)                                         OK
015:m15                      expected identity                                 got assert                                             OK
015:m15                      expected a                                        got a                                                  OK
016:m16                      expected 45                                       got assert                                             OK
016:m16                      expected 2                                        got a (hits a)                                         OK
017:m17                      expected 0.6                                      got a (hits a)                                         OK
018:m18                      expected 1                                        got a (hits a)                                         OK
019:ar1                      expected both                                     got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected both true                                got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected A true, R false                          got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected sin < 1                                  got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected identity                                 got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected 45                                       got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected tan 60                                   got assert                                             OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected scaled                                   got assert                                             OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected cos 0                                    got assert                                             OK
027:tf3                      expected f                                        got f                                                  OK
028:tf4                      expected not equal                                got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected identity                                 got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected value                                    got assert                                             OK
030:fb1                      expected √3                                       got √3|sqrt3|sqrt 3|root 3|sqrt(3)|1.732               OK
031:fb2                      expected 1.875                                    got 15/8|1.875                                         OK
032:fb3                      expected 0.5                                      got 1/2|0.5                                            OK
033:fb4                      expected identity                                 got assert                                             OK
033:fb4                      expected cosec^2 A                                got cosec^2 A|cosec²A|cosec² A|cosec^2A|cosec2A|csc^2  OK
034:fb5                      expected 0.882353                                 got 15/17                                              OK
035:n01                      expected -3                                       got -3                                                 OK
036:n02                      expected QR                                       got assert                                             OK
036:n02                      expected 2.4                                      got 2.4                                                OK
037:n03                      expected 0.75                                     got 0.75                                               OK
038:n04                      expected 4                                        got 4                                                  OK
039:n05                      expected 0.75                                     got 0.75                                               OK
040:n06                      expected 2.4                                      got 2.4                                                OK
041:n07                      expected 48                                       got 48                                                 OK
042:n08                      expected example angle                            got assert                                             OK
042:n08                      expected 0.48                                     got 0.48                                               OK
043:n09                      expected 4                                        got 4                                                  OK
044:s201                     expected values                                   got assert                                             OK
044:s201                     expected \dfrac{24}{25}, \dfrac{25}{7}            got model answer                                       OK
045:s202                     expected ratios                                   got assert                                             OK
045:s202                     expected 15, \dfrac45, \dfrac35, \dfrac43         got model answer                                       OK
046:s203                     expected 3.333333333333334                        got assert                                             OK
046:s203                     expected \dfrac52, \dfrac34, \dfrac{10}{3}        got model answer                                       OK
047:s204                     expected check                                    got assert                                             OK
047:s204                     expected 37.5, 7.5                                got model answer                                       OK
048:s205                     expected identity                                 got assert                                             OK
048:s205                     expected 2\cos^2\theta - 1                        got model answer                                       OK
049:s206                     expected identity                                 got assert                                             OK
049:s206                     expected 9                                        got model answer                                       OK
050:s207                     expected values                                   got assert                                             OK
050:s207                     expected 13, \dfrac{12}{13}                       got model answer                                       OK
051:s208                     expected value                                    got assert                                             OK
051:s208                     expected \dfrac45, \dfrac25                       got model answer                                       OK
052:s209                     expected value                                    got assert                                             OK
052:s209                     expected -\dfrac13                                got model answer                                       OK
053:s301                     expected value                                    got assert                                             OK
053:s301                     expected \dfrac45, \dfrac35, \dfrac{5}{11}        got model answer                                       OK
054:s302                     expected BC = 15                                  got assert                                             OK
054:s302                     expected 32, 17, 15, \dfrac{15}{17}, \dfrac{8}{17 got model answer                                       OK
055:s303                     expected equal                                    got assert                                             OK
055:s303                     expected \dfrac{1}{\sqrt3}                        got model answer                                       OK
056:s304                     expected identity                                 got assert                                             OK
056:s304                     expected \sec^2\theta - 1, \tan^2\theta           got model answer                                       OK
057:s305                     expected values                                   got assert                                             OK
057:s305                     expected 1.5625, 1.25, 0.8, 0.6, 0.36, 0.64       got model answer                                       OK
058:s306                     expected values                                   got assert                                             OK
058:s306                     expected 3, \dfrac53, \dfrac43                    got model answer                                       OK
059:s307                     expected max √2 at 45                             got assert                                             OK
059:s307                     expected 1.414, 1.5                               got model answer                                       OK
060:l01                      expected identities                               got assert                                             OK
060:l01                      expected AB^2 + BC^2 = AC^2, 90^\circ             got model answer                                       OK
061:l02                      expected value                                    got assert                                             OK
061:l02                      expected \dfrac45, \dfrac35, \dfrac{8}{10}, \dfra got model answer                                       OK
062:l03                      expected θ and identity                           got assert                                             OK
062:l03                      expected 30, -9, 1                                got model answer                                       OK
062:l03                      expected −9                                       got assert                                             OK
063:l04                      expected values                                   got assert                                             OK
063:l04                      expected two symmetric solutions                  got assert                                             OK
063:l04                      expected \dfrac{12}{25}, \dfrac{1}{25}, \dfrac15, got model answer                                       OK
064:l05                      expected length and angle                         got assert                                             OK
064:l05                      expected rise                                     got assert                                             OK
064:l05                      expected 130, \dfrac{5}{13}, \dfrac{12}{13}, \dfr got model answer                                       OK
065:l06                      expected identities                               got assert                                             OK
065:l06                      expected 7/16                                     got assert                                             OK
065:l06                      expected \dfrac{28}{64}, \dfrac{7}{16}, \dfrac{9} got model answer                                       OK
066:c01.a                    expected 2.5                                      got c (hits c)                                         OK
066:c01.b                    expected 0.28                                     got 0.28                                               OK
066:c01.c                    expected cos                                      got assert                                             OK
066:c01.c                    expected 0.96, 0.29                               got model answer                                       OK
066:c01.cii                  expected guideline                                got assert                                             OK
066:c01.cii                  expected 0.29, 0.083, 8.4                         got model answer                                       OK
066:c01                      expected 2.5, 0.28, 0.96, 0.29, 0.083             got model answer                                       OK
067:c02.a                    expected 3.4641016151377544                       got b (hits b)                                         OK
067:c02.b                    expected sin 60                                   got assert                                             OK
067:c02.b                    expected √3/2                                     got √3/2|sqrt3/2|(√3)/2|0.866                          OK
067:c02.c                    expected tan 30                                   got assert                                             OK
067:c02.c                    expected \dfrac{1}{\sqrt3}                        got model answer                                       OK
067:c02.cii                  expected tan 60                                   got assert                                             OK
067:c02.cii                  expected \sqrt3, \dfrac12                         got model answer                                       OK
067:c02                      expected 2\sqrt3, \dfrac{\sqrt3}{2}, \dfrac{1}{\s got model answer                                       OK
068:c03.a                    expected 0.7499999999999997                       got a (hits a)                                         OK
068:c03.b                    expected 0.6                                      got 0.6                                                OK
068:c03.c                    expected 1                                        got assert                                             OK
068:c03.c                    expected 1                                        got model answer                                       OK
068:c03.cii                  expected 16/9                                     got assert                                             OK
068:c03.cii                  expected \dfrac{16}{9}                            got model answer                                       OK
068:c03                      expected \dfrac34, 0.6, \dfrac{16}{9}             got model answer                                       OK
069:c04.a                    expected 4                                        got d (hits d)                                         OK
069:c04.b                    expected 2.309401                                 got 2.31                                               OK
069:c04.c                    expected rafter                                   got assert                                             OK
069:c04.c                    expected 4.62                                     got model answer                                       OK
069:c04.cii                  expected 120, 9.24                                got model answer                                       OK
069:c04                      expected 4, 2.31, 4.62, 120, 9.24                 got model answer                                       OK
070:c05.a                    expected true                                     got b (hits b)                                         OK
070:c05.b                    expected 1                                        got 1                                                  OK
070:c05.c                    expected identity i                               got assert                                             OK
070:c05.c                    expected \sin^2\theta                             got model answer                                       OK
070:c05.cii                  expected identity ii                              got assert                                             OK
070:c05.cii                  expected \dfrac14                                 got model answer                                       OK
070:c05                      expected Option (b), 1                            got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch09 (164 checks, 164 OK)</summary>

```
001:m01                      expected alternate angles                         got assert                                             OK
001:m01                      expected a                                        got a                                                  OK
002:m02                      expected increasing                               got assert                                             OK
002:m02                      expected a                                        got a                                                  OK
003:m03                      expected a                                        got a                                                  OK
004:m04                      expected measured                                 got assert                                             OK
004:m04                      expected 30                                       got a (hits a)                                         OK
005:m05                      expected 30                                       got a (hits a)                                         OK
006:m06                      expected ramp                                     got assert                                             OK
006:m06                      expected 5                                        got a (hits a)                                         OK
007:m07                      expected measured                                 got assert                                             OK
007:m07                      expected 5.196152422706632                        got a (hits a)                                         OK
008:m08                      expected measured                                 got assert                                             OK
008:m08                      expected 20.784609690826528                       got a (hits a)                                         OK
009:m09                      expected shadows                                  got assert                                             OK
009:m09                      expected 17.32050807568877                        got a (hits a)                                         OK
010:m10                      expected measured                                 got assert                                             OK
010:m10                      expected 40                                       got a (hits a)                                         OK
011:m11                      expected measured from the eye                    got assert                                             OK
011:m11                      expected 30                                       got a (hits a)                                         OK
012:m12                      expected measured                                 got assert                                             OK
012:m12                      expected 100                                      got a (hits a)                                         OK
013:m13                      expected measured                                 got assert                                             OK
013:m13                      expected 40                                       got a (hits a)                                         OK
014:m14                      expected measured                                 got assert                                             OK
014:m14                      expected 6.999999999999999                        got a (hits a)                                         OK
015:m15                      expected cable                                    got assert                                             OK
015:m15                      expected 173.20508075688772                       got a (hits a)                                         OK
016:m16                      expected equal for 10, 7                          got assert                                             OK
016:m16                      expected equal for 40, 40                         got assert                                             OK
016:m16                      expected equal for 5, 30                          got assert                                             OK
016:m16                      expected a                                        got a                                                  OK
017:m17                      expected scene                                    got assert                                             OK
017:m17                      expected 25.980762113533157                       got a (hits a)                                         OK
018:m18                      expected measured from the eye                    got assert                                             OK
018:m18                      expected 17.32050807568877                        got a (hits a)                                         OK
019:ar1                      expected 45                                       got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected A                                        got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected shorter                                  got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected equal                                    got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected measured                                 got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected 49.1066053508691                         got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected f                                        got f                                                  OK
026:tf2                      expected t                                        got t                                                  OK
027:tf3                      expected measured                                 got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected 16.102113751986018                       got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected f                                        got f                                                  OK
030:fb1                      expected elevation                                got elevation                                          OK
031:fb2                      expected measured                                 got assert                                             OK
031:fb2                      expected 25                                       got 25                                                 OK
032:fb3                      expected 60                                       got 60|60°                                             OK
033:fb4                      expected 50                                       got 50|50°                                             OK
034:fb5                      expected measured                                 got assert                                             OK
034:fb5                      expected 4                                        got 4                                                  OK
035:n01                      expected measured                                 got assert                                             OK
035:n01                      expected 23.094011                                got 23.09                                              OK
036:n02                      expected ladder                                   got assert                                             OK
036:n02                      expected 12.990381                                got 12.99                                              OK
037:n03                      expected measured                                 got assert                                             OK
037:n03                      expected 35                                       got 35                                                 OK
038:n04                      expected measured                                 got assert                                             OK
038:n04                      expected 13.856406                                got 13.86                                              OK
039:n05                      expected scene                                    got assert                                             OK
039:n05                      expected 17.320508                                got 17.32                                              OK
040:n06                      expected scene                                    got assert                                             OK
040:n06                      expected 47.320508                                got 47.32                                              OK
041:n07                      expected measured from the eye                    got assert                                             OK
041:n07                      expected 34.641016                                got 34.64                                              OK
042:n08                      expected scene                                    got assert                                             OK
042:n08                      expected 10                                       got 10                                                 OK
043:n09                      expected 60                                       got 60                                                 OK
044:s201                     expected measured                                 got assert                                             OK
044:s201                     expected 8\sqrt3, 13.86                           got model answer                                       OK
045:s202                     expected measured                                 got assert                                             OK
045:s202                     expected 24\sqrt3, 41.57                          got model answer                                       OK
046:s203                     expected rope                                     got assert                                             OK
046:s203                     expected 24, 12\sqrt3, 20.78                      got model answer                                       OK
047:s204                     expected 60                                       got assert                                             OK
047:s204                     expected \sqrt3, 60^\circ                         got model answer                                       OK
048:s205                     expected measured                                 got assert                                             OK
048:s205                     expected 10\sqrt3, 17.32                          got model answer                                       OK
049:s206                     expected correct and hers                         got assert                                             OK
049:s206                     expected 45\sqrt3, 77.94                          got model answer                                       OK
049:s206                     expected 25.98                                    got solution                                           OK
050:s207                     expected ramp                                     got assert                                             OK
050:s207                     expected 2.4, 1.2\sqrt3, 2.08                     got model answer                                       OK
051:s208                     expected scene                                    got assert                                             OK
051:s208                     expected 15\sqrt3, 25.98                          got model answer                                       OK
051:s208                     expected 45, 15                                   got solution                                           OK
052:s209                     expected scene                                    got assert                                             OK
052:s209                     expected 16.91, 23.09                             got model answer                                       OK
053:s301                     expected scene                                    got assert                                             OK
053:s301                     expected 15 + 5\sqrt3, 23.66                      got model answer                                       OK
053:s301                     expected 13.66                                    got solution                                           OK
054:s302                     expected scene                                    got assert                                             OK
054:s302                     expected 2(\sqrt3 + 1), 5.46                      got model answer                                       OK
054:s302                     expected 9.46                                     got solution                                           OK
055:s303                     expected measured                                 got assert                                             OK
055:s303                     expected 28.87, 48.87                             got model answer                                       OK
056:s304                     expected scene                                    got assert                                             OK
056:s304                     expected 12\sqrt3, 20.78, 32.78                   got model answer                                       OK
057:s305                     expected scene                                    got assert                                             OK
057:s305                     expected 20, 40                                   got model answer                                       OK
058:s306                     expected triples                                  got assert                                             OK
058:s306                     expected 3\sqrt3, 5.2, 15.59, 3                   got model answer                                       OK
059:s307                     expected scene                                    got assert                                             OK
059:s307                     expected 57.74, 28.87                             got model answer                                       OK
060:l01                      expected scene                                    got assert                                             OK
060:l01                      expected 25\sqrt3, 43.3, 25, 50\sqrt3, 86.6       got model answer                                       OK
061:l02                      expected scene                                    got assert                                             OK
061:l02                      expected 10(\sqrt3 + 1), 27.32, 10(3 + \sqrt3), 4 got model answer                                       OK
062:l03                      expected scene                                    got assert                                             OK
062:l03                      expected 57.74, 173.21, 115.47, 200               got model answer                                       OK
063:l04                      expected scene                                    got assert                                             OK
063:l04                      expected 10\sqrt3, 17.32, 30, 20                  got model answer                                       OK
064:l05                      expected shadows                                  got assert                                             OK
064:l05                      expected 20.78, 12, 6.93, 13.86, 45^\circ         got model answer                                       OK
065:l06                      expected scene                                    got assert                                             OK
065:l06                      expected 100\sqrt3, 173.2, 300, 473.2, 126.8      got model answer                                       OK
066:c01.a                    expected b                                        got b                                                  OK
066:c01.b                    expected 45 from eye                              got assert                                             OK
066:c01.b                    expected 71                                       got 71                                                 OK
066:c01.c                    expected 30 after walking back                    got assert                                             OK
066:c01.c                    expected 122.97, 51.97                            got model answer                                       OK
066:c01.cii                  expected sight                                    got assert                                             OK
066:c01.cii                  expected 100.4                                    got model answer                                       OK
066:c01                      expected 71, 51.97, 100.4                         got model answer                                       OK
067:c02.a                    expected 40                                       got a (hits a)                                         OK
067:c02.a                    expected P                                        got assert                                             OK
067:c02.b                    expected Q                                        got assert                                             OK
067:c02.b                    expected 69.282032                                got 69.28                                              OK
067:c02.c                    expected 29.28                                    got model answer                                       OK
067:c02.cii                  expected Q later                                  got assert                                             OK
067:c02.cii                  expected 23.09, 46.19                             got model answer                                       OK
067:c02                      expected 40, 69.28, 29.28, 46.19                  got model answer                                       OK
068:c03.a                    expected depression                               got assert                                             OK
068:c03.a                    expected 60                                       got c (hits c)                                         OK
068:c03.b                    expected 51.961524                                got 51.96                                              OK
068:c03.c                    expected 45 line                                  got assert                                             OK
068:c03.c                    expected 42.43                                    got model answer                                       OK
068:c03.cii                  expected half way                                 got assert                                             OK
068:c03.cii                  expected 15                                       got model answer                                       OK
068:c03                      expected 60, 51.96, 42.43, 15                     got model answer                                       OK
069:c04.a                    expected 9                                        got d (hits d)                                         OK
069:c04.b                    expected 5.196152                                 got 5.2                                                OK
069:c04.c                    expected 10.39                                    got model answer                                       OK
069:c04.c                    expected shortening                               got assert                                             OK
069:c04.cii                  expected same sun                                 got assert                                             OK
069:c04.cii                  expected 30                                       got model answer                                       OK
069:c04                      expected 9, 5.2, 10.39, 30                        got model answer                                       OK
070:c05.a                    expected scene                                    got assert                                             OK
070:c05.a                    expected 34.64101615137754                        got b (hits b)                                         OK
070:c05.b                    expected 20                                       got 20                                                 OK
070:c05.c                    expected 54.64                                    got model answer                                       OK
070:c05.cii                  expected 14.64                                    got model answer                                       OK
070:c05                      expected 20\sqrt3, 20, 54.64, 14.64               got model answer                                       OK
```
</details>
