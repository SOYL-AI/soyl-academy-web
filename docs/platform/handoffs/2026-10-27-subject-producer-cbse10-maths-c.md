# subject-producer — CBSE 10 Mathematics ch10–ch14, hand-authored (D-025, D-026) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-maths-c` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-maths-c`), based on `platform/main`. At the Lead's request I merged `origin/platform/main` (1d3ad06: D-030 root `vercel.json`, not edited) before ch14 and re-ran the full gate and lint after the merge. Together with batch A (ch01–ch04) and batch B (ch05, ch07–ch09, merged in via platform/main), CBSE 10 Mathematics is now complete.

## What changed
| Path | What |
|---|---|
| `platform/content/authored/maths/cbse-10-mathematics-ch10/` | Circles: `release.json`, `tests.json`, `README.md`, `src/` |
| `…/cbse-10-mathematics-ch11/` | Areas Related to Circles (same layout; `src/figs.mjs` SVG figures) |
| `…/cbse-10-mathematics-ch12/` | Surface Areas and Volumes (`src/figs.mjs` solid drawings) |
| `…/cbse-10-mathematics-ch13/` | Statistics (`src/stat.mjs` grouped-data helpers) |
| `…/cbse-10-mathematics-ch14/` | Probability (`src/space.mjs` enumerated sample spaces) |
| `…/cbse-10-mathematics-ch10/src/lib.mjs` | Batch C library: a copy of batch A's `ch01/src/lib.mjs`, extended as listed below. ch11–ch14 import it from here. |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-maths-c.md` | This note |

**Library extensions over batch A**
- **Geometry self-checks**, declared next to each figure and run at build time. They check that:
  - points lie on their circles (`on`)
  - marked right angles are right angles (`perp`)
  - lengths that should be equal are equal (`eq`)
  - collinear points are collinear (`col`)
  - angles measure the stated value (`deg`)
  - every degree label matches the drawn angle within 0.1°
  - every right-angle mark measures 90° within 0.05°
  - numeric length labels share one scale within 0.2%
  - points and circles stay on the canvas
- **Exact construction helpers:**
  - `tangentPts` / `tangentPtsRaw`: points of contact from an external point
  - `tangentialPolygon`: solves Σ atan(tᵢ/r) = π to draw a quadrilateral round a circle from its tangent lengths
  - `incircle`, `triangleSSS`, `meet`, `foot`, `polar`
- **`Svg` builder** in maths coordinates (y up): exact arcs, sectors and segments; even-odd composite regions; half-ellipses; theme colours only.

Rebuild a chapter from `platform/` with `npx tsx content/authored/maths/<chapter>/src/build.mjs`. It is deterministic: rebuilding all five leaves the tree clean. It writes `release.json`, `tests.json` and `src/resolve.log` (the log is git-ignored).

Commits:
- c68c85b ch10
- fcb7225 ch11
- e8acdbe ch12
- 082389f ch13
- 1d3ad06 merge of platform/main (vercel.json)
- ef5c6ca ch14
- the handoff commit

## Scope decisions (syllabus file followed exactly)
- **ch10 Circles:** t01–t03, no removed topics. Constructions (a deleted chapter) are never asked; every figure is given.
- **ch11 Areas Related to Circles:**
  - Segments use only the LO's central angles: **60°, 90° and 120°**.
  - The separate "areas of combinations of plane figures" section is deleted. Simple shaded regions appear only inside problems, as the syllabus note allows.
  - Every stem states π (22/7 or 3.14), and √3 = 1.73 or √2 = 1.414 where needed. Keys use exactly those values.
- **ch12 Surface Areas and Volumes:**
  - **No conversion of solids** anywhere: no melting, recasting, digging or water flow.
  - **No frustum**, including in distractors.
  - Only combinations of two solids from {cube, cuboid, sphere, hemisphere, cylinder, cone}.
- **ch13 Statistics:**
  - **No ogive** is drawn or asked for. Cumulative frequency appears only in tables, including a "less than" table read as data.
  - Mode questions avoid bimodal data. One AR item asks the student to spot a tie.
  - The empirical relation 3 Median ≈ Mode + 2 Mean (NCERT text) appears in a few objective items.
- **ch14 Probability:** classical probability only; no experimental probability.
- **Tests:** both tests match `cbse-10-default-chapter-test-short` / `-long` exactly, as in batch A (A objective; B short answer with the blueprint's internal choices; C long with choice; D case-based), with `blueprint_id` set. Short and long tests are disjoint.

## Counts
| | ch10 Circles | ch11 Areas | ch12 Surface/Vol | ch13 Statistics | ch14 Probability |
|---|---|---|---|---|---|
| Decks (slides) | 16 + 17 | 16 + 17 | 16 + 15 | 15 + 16 | 16 + 17 |
| Slides with a visual / max gap | 23 / 1 | 23 / 1 | 21 / 1 | 21 / 1 | 23 / 1 |
| Worked examples | 3 + 5 | 4 + 6 | 5 + 6 | 4 + 4 | 3 + 6 |
| Check slides (objective) | 3 + 3 | 3 + 3 | 3 + 3 | 3 + 3 | 3 + 3 |
| Narration max / mean words | 69 / 48 | 77 / 49 | 65 / 48 | 60 / 47 | 60 / 46 |
| Notes sections | 6 | 6 | 6 | 6 | 6 |
| Flashcards | 30 | 30 | 30 | 30 | 30 |
| Questions / marks | 70 / 140 | 70 / 141 | 70 / 141 | 70 / 141 | 70 / 140 |
| Difficulty d1/d2/d3/d4/d5 | 11/22/29/7/1 | 12/30/23/4/1 | 12/27/25/4/2 | 14/28/21/6/1 | 13/31/21/4/1 |
| Application or higher (items, marks) | 56%, 69% | 56%, 73% | 59%, 77% | 47%, 69% | 49%, 69% |
| AR keys | a b c d a d | a b c d a d | a b c d a d | a b c d a d | a b c d a d |
| MCQ keys a/b/c/d (incl. case parts) | 6/6/6/5 | 6/6/6/5 | 6/6/6/5 | 6/6/6/5 | 6/6/6/5 |
| KaTeX strings (strict) | 1635 | 1158 | 962 | 1369 | 1160 |
| Re-solve checks | 142/142 | 127/127 | 131/131 | 129/129 | 115/115 |
| Visuals (deck; notes and questions) | geometry 18, table 4, flow 1; geometry 16, flow 1 | svg 14, table 7, geometry 1, flow 1; svg 16, table 4, flow 1 | svg 14, table 5, flow 2; svg 15, table 3, flow 1 | table 17, plot 3, flow 1; table 9, plot 3, flow 1 | table 17, svg 4, flow 2; table 7, svg 3, flow 1 |

**Every bank:** mcq 18 · assertion-reason 6 · true-false 5 · fill-blank 5 · numerical 9 (tolerance + unit) · short 2-mark 9 · short 3-mark 7 · long 5-mark 6 · case-based 5 (1 + 1 + 2, with part (c) either/or through `alternatives`, and `passage_origin: "soyl-original"`). Ids run `q_cbse10math_chNN_001…070`. Tests are `t_cbse10math_chNN_short|_long`: 20 marks / 40 min with 10 items, and 40 marks / 90 min with 22 items.

## How to verify (output on the final tree)
```
cd platform && npm install
npm test -w @soyl/content-templates
 ✓ exemplars > maths/cbse-10-mathematics-ch10 > is a valid ChapterRelease
 ✓ … > is named after its chapter and has a README
 ✓ … > uses only topics from the chapter syllabus
 ✓ … > decks meet the visual lesson rules
 ✓ … > has enough flashcards and practice questions
 ✓ … > writes language subjects in their own script (NFC, well-formed, no Latin runs, TTS-safe narration)
 ✓ … > has a short and a long chapter test drawn from its own questions
   (the same 7 checks pass for ch11, ch12, ch13 and ch14)
 Test Files  1 passed (1)
      Tests  232 passed (232)

npm run content -- lint --exemplars
ok   cbse-10-mathematics-ch10: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch11: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch12: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch13: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch14: 0 error(s), 0 warning(s)
   (all other units, including maths ch01–ch09, also report 0 errors)

npx tsx content/authored/maths/cbse-10-mathematics-ch1N/src/build.mjs   (author validator, per chapter)
ch10: KaTeX 1635 strings (0.19.0, throwOnError, strict: "error"), 0 failures; 19 geometry figures, 157 exact checks; reSolved 142/142; NO ERRORS
ch11: KaTeX 1158; 1 geometry figure (4 checks) + exact-arc SVGs; reSolved 127/127; NO ERRORS
ch12: KaTeX 962; reSolved 131/131; NO ERRORS
ch13: KaTeX 1369; three mean methods agree for every distribution; reSolved 129/129; NO ERRORS
ch14: KaTeX 1160; 25 deck probabilities asserted against enumeration; reSolved 115/115; NO ERRORS
```

## Verifier pass (done by the author)
**Method.** Every item has a re-solve check written from the givens, never from the written answer. The checks also cover the numbers inside solutions and model answers (`sol`, `model`), not only the keys. How each chapter is re-solved:
- **ch10:** angles are *measured* on coordinates built from the givens. For example, the angle between two tangents gives the exact points of contact, and ∠AOB and ∠OAB are then measured. Lengths come from Pythagoras. Tangent lengths of circumscribed triangles come from the semi-perimeter rule. Circumscribed quadrilaterals are built from their tangent lengths.
- **ch11:** a formula library takes π and √3 as parameters, so each key uses the stem's own values. Shaded regions are checked two ways where possible. The crescent (l06) is checked with both 22/7 and the true π, confirming that the answer does not depend on π.
- **ch12:** a solid library computes the visible faces of each combined solid in code. Claims about hidden faces are checked separately: joining along a circle removes 2πr², and scooping a hemisphere changes the surface by +πr².
- **ch13:** stem tables and solution working tables are **generated from the data arrays** the checks use. Mean is computed by direct, assumed-mean and step-deviation methods, and the build fails if they disagree. Median is computed by the formula and by a separate cumulative walk. Mode is computed only after checking that the modal class is unique. Missing frequencies are found by brute-force search, which also confirms the median class.
- **ch14:** every probability is counted on an enumerated sample space: coins, the 36 ordered pairs of two dice, the 52 cards with rank, suit, colour and face flag, discs and bags. Fractions are compared in reduced form.

Proofs (ch10: s201, s204, s209) were checked step by step by hand and appear as qualitative in the logs. The two theorem proofs (l01, l02) also carry a numerical part that is re-solved.

**Fixes made during the pass:**
1. **Degenerate figure (ch10 c01):** with the anchor 15 m from the foot of the giant wheel, the tangent cable came out vertical and equal to the height, which made the question trivial. The data changed to 24 m / 7 m (OA = 25, AT = 20). The rendered contact sheet caught this.
2. **Rounded drawing points used in checks (ch10):** 4-decimal points gave 0.001° noise, so the checks now use unrounded tangent points (`tangentPtsRaw`). The content was right.
3. **Pipeline lint `banned.url` (ch13):** "wage data: mean …" matched the `data:` URL-scheme rule, giving 7 errors. Reworded. Worth knowing for other authors (see recommendations).
4. **Pipeline lint `balance.competency` (ch13):** application or higher was at 44% (band 45–65%). n02 and n03, which are multi-step items in new contexts, were relabelled to application. Now 47%.
5. **Difficulty balance:**
   - ch14: d1 was 30%, so eight items that need a count or a complement step were relabelled to d2 (now 19%).
   - ch13: three two-step items were relabelled from d1 to d2.
6. **Duplicate numbers (ch12 s305):** reused a deck example's numbers; it now uses r = 14, l = 50.
7. **Text quality:** rewrote three passages:
   - a garbled distractor note (ch13 m08)
   - a confused narration on the mode example (ch13)
   - a half-finished alternative in a model answer (ch14 l06)
8. **Checker-only fixes (content right):**
   - ch11 m18 and ch12 m07: option values were listed or rounded wrongly in the checks.
   - ch14: the fraction formatter did not match the text's `\dfrac18` shorthand, so 24 checks failed. The formatter now follows the text's convention.
9. **Figure QA.** I rendered every geometry, SVG and plot visual to PNG contact sheets with Playwright (a local preview script, not committed) and inspected them. Fixes:
   - ch11: the 120° segment was clipped and its labels overlapped.
   - ch12: dimension labels collided with radius labels (now drawn on the left), and the canvases were too small for the cuboid-with-cube, shamiana and test tube figures.
   - ch14: the probability-scale labels overlapped.

**Originality:** no NCERT, RD Sharma, RS Aggarwal or CBSE-paper item is reused. Each chapter README lists the famous set-ups deliberately avoided, for example:
- NCERT 24/25 → 7 and the 5 cm/3 cm concentric circles
- the lighthouse, wipers, umbrella and racing track
- the 4 m tent with 2.8 m slant, the 7 cm cube with a hemisphere, the capsule, the gulab jamuns and the pen stand
- the median 28.5 (n = 60) and mean 50 (n = 120) examples
- the 100 shirts, x black balls among 12, the 90 discs and the 2–101 cards

Contexts are Indian and varied: a Mysuru Dussehra giant wheel, Kolkata, Raipur and Chennai cricket grounds, an Ashoka Chakra, a Jaipur haveli doorway, an Old Delhi kulfi, Rann Utsav tents, Hampi pillars, Cherrapunji rainfall, Delhi AQI, a Ratnagiri mango orchard, Ludo in Guwahati, and a Diwali lucky dip.

## Tests added
None; this is content only. The existing gate and lint cover the chapters.

## Known gaps / follow-ups
- **Narration audio** is not generated yet (TTS stage). Narration is TTS-safe: no symbols, no letter abbreviations, and geometry names are spaced as letters ("O P").
- **Renderer needs:**
  - KaTeX in geometry point labels (`$Q_1$`, ch10) and in table cells.
  - Bar-series plots drawn with bars as wide as the class (ch13 histograms).
  - SVG theme variables, including the named colours `var(--diagram-blue/red/green/yellow)` (ch14 spinner and bag; the bag also states its counts in text).
- **ch12 solid drawings** are schematic 3D (tilted orthographic) SVG. The lint cannot check their geometry, although the cone silhouettes are exact.
- The build-check string "0 geometry figures" in ch12–ch14 is accurate (those chapters use SVG, tables and plots) but reads oddly.
- `src/` lives inside each chapter folder (an owned path), as in batch A.

## Recommendations (for pipeline-engineer / Lead)
1. **Lint `banned.url`:** `SCHEME_RE` flags ordinary English such as "data: …" and would also catch "tel: …". Require the scheme to be followed by a URL-like token (e.g. `data:[a-z]+/`, `javascript:\S`), or apply it only to link targets.
2. **Contract:** a `solid` visual kind (cylinder, cone, sphere, hemisphere, cuboid, with joins). Combined solids could then be rendered natively and checked, instead of drawn as SVG.
3. **Contract:** a `sector`/`arc` primitive with fill in `GeometryVisual`, so shaded sectors and segments (ch11) could be lint-checked like the rest of the geometry.
4. **Lint:** a geometry check that a labelled point of contact lies on its circle and that the tangent is perpendicular there. The author validator does this (`on`/`perp`); generated content will need it.
5. **Lint (statistics):** for tables with Class/Frequency headers, recompute any stated mean, median or mode. The `stat.mjs` approach could be lifted into the pipeline.

## Needs from owner
None.

The logs below are each chapter's `src/resolve.log` from the final build. Option letters in them are the **authored** letters: the re-solve runs before the key-balancing rotation, which then remaps letters mechanically and verifies the key text is unchanged.

<details><summary>Numeric re-solve output, ch10 (142 checks)</summary>

```
001:m01                      expected "one"                                    got a (hits a)                                         OK
002:m02                      expected "none"                                   got a (hits a)                                         OK
003:m03                      expected line at distance 3 < 5 meets twice       got assert                                             OK
003:m03                      expected a                                        got a                                                  OK
004:m04                      expected "tangent"                                got b (hits b)                                         OK
005:m05                      expected 24                                       got a (hits a)                                         OK
006:m06                      expected built with 35°                           got assert                                             OK
006:m06                      expected 55                                       got a (hits a)                                         OK
007:m07                      expected tangents at (0, 1) and (0, −1) are both  got assert                                             OK
007:m07                      expected a                                        got a                                                  OK
008:m08                      expected R on circle                              got assert                                             OK
008:m08                      expected 100                                      got a (hits a)                                         OK
009:m09                      expected 7                                        got a (hits a)                                         OK
010:m10                      expected 110                                      got a (hits a)                                         OK
011:m11                      expected AOB 130                                  got assert                                             OK
011:m11                      expected 65                                       got a (hits a)                                         OK
012:m12                      expected 4                                        got a (hits a)                                         OK
012:m12                      expected such a quadrilateral exists (tangent len got assert                                             OK
013:m13                      expected tangent lengths                          got assert                                             OK
013:m13                      expected 30                                       got a (hits a)                                         OK
014:m14                      expected 8                                        got a (hits a)                                         OK
015:m15                      expected 9                                        got a (hits a)                                         OK
016:m16                      expected 40                                       got a (hits a)                                         OK
017:m17                      expected 7.071067812                              got a (hits a)                                         OK
018:m18                      expected 15                                       got a (hits a)                                         OK
019:ar1                      expected every other point of the tangent y = 5 i got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected two tangents                             got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected AOB = 100                                got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected secant                                   got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected sum identity                             got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected rectangle 6 by 4 fails AB + CD = BC + DA got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected one                                      got assert                                             OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected 13                                       got assert                                             OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected equal                                    got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected at most two                              got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected counter-example 7 vs 6                   got assert                                             OK
029:tf5                      expected f                                        got f                                                  OK
030:fb1                      expected tangent                                  got tangent                                            OK
031:fb2                      expected point of contact                         got point of contact|point of tangency|contact point   OK
032:fb3                      expected 90                                       got 90|90°                                             OK
033:fb4                      expected AOB                                      got assert                                             OK
033:fb4                      expected 65                                       got 65|65°                                             OK
034:fb5                      expected 9                                        got 9                                                  OK
035:n01                      expected 35                                       got 35                                                 OK
036:n02                      expected 16                                       got 16                                                 OK
037:n03                      expected 36                                       got 36                                                 OK
037:n03                      expected 54                                       got solution                                           OK
038:n04                      expected 9                                        got 9                                                  OK
039:n05                      expected 8                                        got 8                                                  OK
039:n05                      expected 19, 7, 4                                 got solution                                           OK
040:n06                      expected 30                                       got 30                                                 OK
041:n07                      expected 12                                       got 12                                                 OK
041:n07                      expected 225, 144, 81                             got solution                                           OK
042:n08                      expected 108                                      got 108                                                OK
042:n08                      expected 12, 54                                   got solution                                           OK
043:n09                      expected 16                                       got 16                                                 OK
044:s201                     expected qualitative                              got proof: structure checked by hand (two perpendicula OK
045:s202                     expected PAB 62, AOB 124                          got assert                                             OK
045:s202                     expected 56, 124                                  got model answer                                       OK
046:s203                     expected AD                                       got assert                                             OK
046:s203                     expected 9, 36, 18                                got model answer                                       OK
047:s204                     expected qualitative                              got proof: contradiction structure checked by hand     OK
048:s205                     expected lengths                                  got assert                                             OK
048:s205                     expected 18, 5, 8                                 got model answer                                       OK
049:s206                     expected OQ 12, PQ 6√3                            got assert                                             OK
049:s206                     expected 12, 6\sqrt3, 10.39                       got model answer                                       OK
049:s206                     expected 108, 144                                 got solution                                           OK
050:s207                     expected 8                                        got assert                                             OK
050:s207                     expected 100, 36, 64, 8                           got model answer                                       OK
051:s208                     expected 7,5,3                                    got assert                                             OK
051:s208                     expected 15, 7, 5, 3                              got model answer                                       OK
052:s209                     expected qualitative                              got proof: RHS congruence checked by hand              OK
053:s301                     expected AB 24, OM 9                              got assert                                             OK
053:s301                     expected 20, 12, 24                               got model answer                                       OK
053:s301                     expected 9, 225, 81                               got solution                                           OK
054:s302                     expected 132                                      got assert                                             OK
054:s302                     expected 66, 132, 24                              got model answer                                       OK
055:s303                     expected diagonal                                 got assert                                             OK
055:s303                     expected 4, 4\sqrt2, 5.66                         got model answer                                       OK
056:s304                     expected r = 3, area check                        got assert                                             OK
056:s304                     expected 23, 17, 3                                got model answer                                       OK
056:s304                     expected 60, 20                                   got solution                                           OK
057:s305                     expected x = 4                                    got assert                                             OK
057:s305                     expected 4, 13, 52                                got model answer                                       OK
058:s306                     expected secant                                   got assert                                             OK
058:s306                     expected 5, 5\sqrt3, 8.66                         got model answer                                       OK
059:s307                     expected measured on the construction             got assert                                             OK
059:s307                     expected 32, 58, 122, 26                          got model answer                                       OK
059:s307                     expected 64                                       got solution                                           OK
060:l01                      expected 40                                       got assert                                             OK
060:l01                      expected 1600, 40                                 got model answer                                       OK
061:l02                      expected equilateral                              got assert                                             OK
061:l02                      expected 10, 30                                   got model answer                                       OK
062:l03                      expected x                                        got assert                                             OK
062:l03                      expected 4, 8, 7, 30, 15                          got model answer                                       OK
063:l04                      expected right triangle                           got assert                                             OK
063:l04                      expected both 5                                   got assert                                             OK
063:l04                      expected 5, 210, 42                               got model answer                                       OK
064:l05                      expected OT 50/3, TP 40/3                         got assert                                             OK
064:l05                      expected 6, \dfrac{50}{3}, \dfrac{40}{3}, 16.67,  got model answer                                       OK
064:l05                      expected \dfrac{32}{3}, \dfrac{1600}{9}           got solution                                           OK
065:l06                      expected incentre (6, 3), r = 3, AF = 4           got assert                                             OK
065:l06                      expected 8, 48, 16, 3, 4                          got model answer                                       OK
066:c01                      expected right angle at T                         got assert                                             OK
066:c01.a                    expected a                                        got a                                                  OK
066:c01.b                    expected 25                                       got 25                                                 OK
066:c01.c                    expected 20                                       got model answer                                       OK
066:c01.cii                  expected 20, 150, 300                             got model answer                                       OK
066:c01                      expected AT 20, area 300                          got assert                                             OK
067:c02                      expected triangle                                 got assert                                             OK
067:c02                      expected area 84, r 4                             got assert                                             OK
067:c02.a                    expected a                                        got a                                                  OK
067:c02.b                    expected 6                                        got 6                                                  OK
067:c02.c                    expected 7, 8                                     got model answer                                       OK
067:c02.cii                  expected 21, 4                                    got model answer                                       OK
068:c03                      expected square                                   got assert                                             OK
068:c03.a                    expected a                                        got a                                                  OK
068:c03.b                    expected 3.5                                      got 3.5                                                OK
068:c03.c                    expected 3.5\sqrt2, 4.95                          got model answer                                       OK
068:c03.cii                  expected 7                                        got model answer                                       OK
069:c04                      expected PA 5.6                                   got assert                                             OK
069:c04.a                    expected a                                        got a                                                  OK
069:c04.b                    expected 5.6                                      got 5.6                                                OK
069:c04.c                    expected 9.24, 18.48                              got model answer                                       OK
069:c04.cii                  expected 180                                      got model answer                                       OK
069:c04                      expected area                                     got assert                                             OK
070:c05                      expected sides 25,31,29,23                        got assert                                             OK
070:c05.a                    expected a                                        got a                                                  OK
070:c05.b                    expected 23                                       got 23                                                 OK
070:c05.c                    expected 15, 16, 13, 10                           got model answer                                       OK
070:c05.cii                  expected 108, 16200                               got model answer                                       OK
070:c05                      expected AP = 10 on the drawing                   got assert                                             OK
```
</details>

<details><summary>Numeric re-solve output, ch11 (127 checks)</summary>

```
001:m01                      expected fraction of the circle                   got assert                                             OK
001:m01                      expected a                                        got a                                                  OK
002:m02                      expected 22                                       got a (hits a)                                         OK
003:m03                      expected 308                                      got a (hits a)                                         OK
004:m04                      expected 43                                       got a (hits a)                                         OK
004:m04                      expected distractor (d) is the area               got assert                                             OK
005:m05                      expected 120                                      got a (hits a)                                         OK
006:m06                      expected 30.8                                     got b (hits b)                                         OK
007:m07                      expected 72                                       got a (hits a)                                         OK
008:m08                      expected 0.25                                     got a (hits a)                                         OK
009:m09                      expected 30.8                                     got a (hits a)                                         OK
010:m10                      expected 56                                       got a (hits a)                                         OK
011:m11                      expected 28.539816                                got a (hits a)                                         OK
012:m12                      expected 43.30127                                 got a (hits a)                                         OK
013:m13                      expected 560                                      got a (hits a)                                         OK
014:m14                      expected 56                                       got a (hits a)                                         OK
014:m14                      expected four quadrant segments                   got assert                                             OK
015:m15                      expected 462                                      got a (hits a)                                         OK
016:m16                      expected 42                                       got a (hits a)                                         OK
017:m17                      expected 500                                      got a (hits a)                                         OK
018:m18                      expected true                                     got a (hits a)                                         OK
019:ar1                      expected quarter                                  got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected 56                                       got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected 22                                       got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected four times                               got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected formula                                  got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected 42                                       got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected 77 = half of 154                         got assert                                             OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected decomposition                            got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected 180                                      got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected 90                                       got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected quadrant                                 got quadrant                                           OK
031:fb2                      expected 6                                        got 6                                                  OK
032:fb3                      expected segment                                  got segment                                            OK
033:fb4                      expected 90                                       got 90|90°                                             OK
034:fb5                      expected 22                                       got 22                                                 OK
035:n01                      expected 38.5                                     got 38.5                                               OK
036:n02                      expected 66                                       got 66                                                 OK
037:n03                      expected 188.4                                    got 188.4                                              OK
037:n03                      expected 452.16                                   got solution                                           OK
038:n04                      expected 45                                       got 45                                                 OK
038:n04                      expected 264                                      got solution                                           OK
039:n05                      expected 114                                      got 114                                                OK
039:n05                      expected 314, 200                                 got solution                                           OK
040:n06                      expected 3.27                                     got 3.27                                               OK
040:n06                      expected 18.84, 15.57                             got solution                                           OK
041:n07                      expected 115.5                                    got 115.5                                              OK
042:n08                      expected 15.84                                    got 15.84                                              OK
042:n08                      expected 220, 26400, 0.264                        got solution                                           OK
043:n09                      expected 192.5                                    got 192.5                                              OK
044:s201                     expected values                                   got assert                                             OK
044:s201                     expected 3850, 770, 220, 44                       got model answer                                       OK
045:s202                     expected values                                   got assert                                             OK
045:s202                     expected 132, 90, 1386, 346.5                     got model answer                                       OK
046:s203                     expected 14                                       got assert                                             OK
046:s203                     expected 38.5, 24.5, 14, 154, 140                 got model answer                                       OK
047:s204                     expected 94.2                                     got assert                                             OK
047:s204                     expected 108, 94.2                                got model answer                                       OK
048:s205                     expected values                                   got assert                                             OK
048:s205                     expected 11, 616, 77                              got model answer                                       OK
049:s206                     expected equal areas                              got assert                                             OK
049:s206                     expected 2880, 180                                got model answer                                       OK
050:s207                     expected 462                                      got assert                                             OK
050:s207                     expected 616, 38.5, 154, 462                      got model answer                                       OK
051:s208                     expected values                                   got assert                                             OK
051:s208                     expected 22, 50, 154                              got model answer                                       OK
052:s209                     expected values                                   got assert                                             OK
052:s209                     expected 22, 231, 190.7325, 40.27                 got model answer                                       OK
053:s301                     expected values                                   got assert                                             OK
053:s301                     expected 440, 22, 15400, 770                      got model answer                                       OK
054:s302                     expected 88.44                                    got assert                                             OK
054:s302                     expected triangle by OM                           got assert                                             OK
054:s302                     expected 150.72, 62.28, 88.44                     got model answer                                       OK
055:s303                     expected 86                                       got assert                                             OK
055:s303                     expected 157, 314, 86                             got model answer                                       OK
056:s304                     expected values                                   got assert                                             OK
056:s304                     expected 180, 157, 15, 37.68, 1.57                got model answer                                       OK
057:s305                     expected values                                   got assert                                             OK
057:s305                     expected 300, 128.33, 154, 25.67                  got model answer                                       OK
058:s306                     expected two ways                                 got assert                                             OK
058:s306                     expected 78.5, 50, 28.5, 57                       got model answer                                       OK
058:s306                     expected 157, 100                                 got solution                                           OK
059:s307                     expected values                                   got assert                                             OK
059:s307                     expected 392, 1232, 462, 132, 49.5                got model answer                                       OK
060:l01                      expected major                                    got assert                                             OK
060:l01                      expected 22, 231, 190.7325, 40.27, 1386, 1345.73  got model answer                                       OK
061:l02                      expected values                                   got assert                                             OK
061:l02                      expected 616, 154, 1764, 770, 994, 24850, 88      got model answer                                       OK
062:l03                      expected perimeter                                got assert                                             OK
062:l03                      expected 154, 98, 56, 616, 560, 19.796, 22, 41.8  got model answer                                       OK
063:l04                      expected values                                   got assert                                             OK
063:l04                      expected 3185, 10010, 1001, 396, 39.6, 120120     got model answer                                       OK
064:l05                      expected two ways                                 got assert                                             OK
064:l05                      expected 120, 104.67, 43.25, 61.42, 184.25, 314,  got model answer                                       OK
065:l06                      expected crescent = triangle, any pi              got assert                                             OK
065:l06                      expected 98, 154, 56                              got model answer                                       OK
066:c01.a                    expected 45                                       got b (hits b)                                         OK
066:c01.b                    expected 77                                       got 77                                                 OK
066:c01.c                    expected 11, 39                                   got model answer                                       OK
066:c01.cii                  expected 225, 385                                 got model answer                                       OK
067:c02.a                    expected 0.3333333333333333                       got c (hits c)                                         OK
067:c02.b                    expected 462                                      got 462                                                OK
067:c02.c                    expected 44                                       got model answer                                       OK
067:c02.cii                  expected 180, 693                                 got model answer                                       OK
068:c03.a                    expected 15                                       got a (hits a)                                         OK
068:c03.b                    expected 6.42                                     got 6.42                                               OK
068:c03.c                    expected 1.83                                     got model answer                                       OK
068:c03.cii                  expected 90, 38.5                                 got model answer                                       OK
069:c04.a                    expected d                                        got d                                                  OK
069:c04.b                    expected 3850                                     got 3850                                               OK
069:c04.c                    expected 2450, 1400                               got model answer                                       OK
069:c04.cii                  expected 110                                      got model answer                                       OK
070:c05.a                    expected b                                        got b                                                  OK
070:c05.b                    expected 1386                                     got 1386                                               OK
070:c05.c                    expected 69300                                    got model answer                                       OK
070:c05.cii                  expected 220, 176, 44                             got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch12 (131 checks)</summary>

```
001:m01                      expected half a sphere                            got assert                                             OK
001:m01                      expected a                                        got a                                                  OK
002:m02                      expected 13                                       got a (hits a)                                         OK
003:m03                      expected 462                                      got a (hits a)                                         OK
004:m04                      expected option (b) counts the joining circle twi got assert                                             OK
004:m04                      expected a                                        got a                                                  OK
005:m05                      expected 126                                      got a (hits a)                                         OK
005:m05                      expected four hidden faces of 9 cm²               got assert                                             OK
006:m06                      expected 19404                                    got a (hits a)                                         OK
007:m07                      expected 0.333333                                 got a (hits a)                                         OK
008:m08                      expected 1848                                     got a (hits a)                                         OK
009:m09                      expected 550                                      got a (hits a)                                         OK
010:m10                      expected 113.097336                               got a (hits a)                                         OK
011:m11                      expected 253.17                                   got a (hits a)                                         OK
012:m12                      expected visible faces                            got assert                                             OK
012:m12                      expected a                                        got a                                                  OK
013:m13                      expected 1000                                     got a (hits a)                                         OK
014:m14                      expected 3080                                     got a (hits a)                                         OK
015:m15                      expected difference 2πr²                          got assert                                             OK
015:m15                      expected a                                        got a                                                  OK
016:m16                      expected 94.2                                     got a (hits a)                                         OK
017:m17                      expected 7                                        got a (hits a)                                         OK
018:m18                      expected 0.666667                                 got a (hits a)                                         OK
019:ar1                      expected parts                                    got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected 462                                      got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected 18π                                      got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected identity                                 got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected 15π                                      got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected half                                     got assert                                             OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected 10a² for a = 2                           got assert                                             OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected 25                                       got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected +πr²                                     got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected √(r²+h²)                                 got √(r²+h²)|√(r² + h²)|sqrt(r^2+h^2)|sqrt(r^2 + h^2)| OK
031:fb2                      expected 0.333333                                 got 1/3|one-third|one third|⅓                          OK
032:fb3                      expected 1000                                     got 1000                                               OK
033:fb4                      expected 308                                      got 308                                                OK
034:fb5                      expected 36                                       got 36                                                 OK
035:n01                      expected 748                                      got 748                                                OK
036:n02                      expected 1914                                     got 1914                                               OK
036:n02                      expected 29, 841                                  got solution                                           OK
037:n03                      expected 320.28                                   got 320.28                                             OK
037:n03                      expected 282.6, 37.68                             got solution                                           OK
038:n04                      expected 2425.5                                   got 2425.5                                             OK
038:n04                      expected 1157.625                                 got solution                                           OK
039:n05                      expected 6160                                     got 6160                                               OK
039:n05                      expected 308                                      got solution                                           OK
040:n06                      expected 76.23                                    got 76.23                                              OK
040:n06                      expected 13.86, 69.3, 6.93                        got solution                                           OK
041:n07                      expected 361.1                                    got 361.1                                              OK
041:n07                      expected 13, 15.7, 23                             got solution                                           OK
042:n08                      expected 154                                      got 154                                                OK
042:n08                      expected 231                                      got solution                                           OK
043:n09                      expected 677                                      got 677                                                OK
043:n09                      expected 38.5, 77, 600                            got solution                                           OK
044:s201                     expected 682                                      got assert                                             OK
044:s201                     expected 220, 154, 308, 682                       got model answer                                       OK
045:s202                     expected 1488.67                                  got assert                                             OK
045:s202                     expected 770, 718.67, 1488.67                     got model answer                                       OK
046:s203                     expected 550                                      got assert                                             OK
046:s203                     expected 25, 550                                  got model answer                                       OK
047:s204                     expected 205.33                                   got assert                                             OK
047:s204                     expected 38.5, 115.5, 89.83, 205.33               got model answer                                       OK
048:s205                     expected three circles                            got assert                                             OK
048:s205                     expected 176, 220, 396                            got model answer                                       OK
048:s205                     expected 858, 154                                 got solution                                           OK
049:s206                     expected 2:1                                      got assert                                             OK
049:s206                     expected 2 : 1                                    got model answer                                       OK
050:s207                     expected 77                                       got assert                                             OK
050:s207                     expected 231, 154, 77                             got model answer                                       OK
051:s208                     expected capacity                                 got assert                                             OK
051:s208                     expected 13, 2002, 718.67, 2720.67, 2.72          got model answer                                       OK
052:s209                     expected 440                                      got assert                                             OK
052:s209                     expected 376, 64, 440                             got model answer                                       OK
053:s301                     expected 263.76                                   got assert                                             OK
053:s301                     expected 5, 9.42, 28, 263.76                      got model answer                                       OK
054:s302                     expected 561.192                                  got assert                                             OK
054:s302                     expected 600, 19.404, 38.808, 561.192             got model answer                                       OK
055:s303                     expected values                                   got assert                                             OK
055:s303                     expected 10, 18.84, 414.48, 207.24                got model answer                                       OK
056:s304                     expected 22.792                                   got assert                                             OK
056:s304                     expected 6.16, 3.7, 22.792                        got model answer                                       OK
056:s304                     expected 18.48, 4.312                             got solution                                           OK
057:s305                     expected values                                   got assert                                             OK
057:s305                     expected 2200, 1232, 3432, 1848, 4048             got model answer                                       OK
058:s306                     expected values                                   got assert                                             OK
058:s306                     expected 3, 6, 56.52, 216, 26.17                  got model answer                                       OK
059:s307                     expected 659.4                                    got assert                                             OK
059:s307                     expected 13, 15.7, 42, 659.4                      got model answer                                       OK
060:l01                      expected values                                   got assert                                             OK
060:l01                      expected 17.5, 1034, 82720, 1848, 2156, 4004      got model answer                                       OK
061:l02                      expected values                                   got assert                                             OK
061:l02                      expected 2.64, 1.54, 4.18, 0.462, 641.67, 1045    got model answer                                       OK
062:l03                      expected values                                   got assert                                             OK
062:l03                      expected 17.5, 1270.5, 346.5, 4042.5, 8489.25, 44 got model answer                                       OK
063:l04                      expected values                                   got assert                                             OK
063:l04                      expected 1176, 154, 1484, 2744, 718.67            got model answer                                       OK
064:l05                      expected values                                   got assert                                             OK
064:l05                      expected 9.57, 114.84, 5167.8, 1.54, 1.63         got model answer                                       OK
065:l06                      expected in π units                               got assert                                             OK
065:l06                      expected 30, \dfrac{10}{3}, 33, 29, 12.56, 103.62 got model answer                                       OK
066:c01.a                    expected 7.5                                      got a (hits a)                                         OK
066:c01.b                    expected 52.67                                    got 52.67                                              OK
066:c01.c                    expected 77.22                                    got model answer                                       OK
066:c01.cii                  expected 5266.8, 5.27                             got model answer                                       OK
067:c02.a                    expected c                                        got c                                                  OK
067:c02.b                    expected 3.5                                      got 3.5                                                OK
067:c02.c                    expected 66                                       got model answer                                       OK
067:c02.cii                  expected 49.28, 17.248, 66.528                    got model answer                                       OK
068:c03.a                    expected b                                        got b                                                  OK
068:c03.b                    expected 308                                      got 308                                                OK
068:c03.c                    expected 107.8, 415.8                             got model answer                                       OK
068:c03.cii                  expected 9.1, 100.1                               got model answer                                       OK
069:c04.a                    expected d                                        got d                                                  OK
069:c04.b                    expected 376.8                                    got 376.8                                              OK
069:c04.c                    expected 301.44                                   got model answer                                       OK
069:c04.cii                  expected 18.84                                    got model answer                                       OK
070:c05.a                    expected b                                        got b                                                  OK
070:c05.b                    expected 50.82                                    got 50.82                                              OK
070:c05.c                    expected 12.936, 19.404, 32.34                    got model answer                                       OK
070:c05.cii                  expected 67.914, 35.574                           got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch13 (129 checks)</summary>

```
001:m01                      expected 30                                       got a (hits a)                                         OK
002:m02                      expected step formula reproduces the mean         got assert                                             OK
002:m02                      expected a                                        got a                                                  OK
003:m03                      expected 26                                       got a (hits a)                                         OK
004:m04                      expected 43                                       got a (hits a)                                         OK
005:m05                      expected 38                                       got a (hits a)                                         OK
006:m06                      expected "30–40"                                  got a (hits a)                                         OK
007:m07                      expected formula (a) reproduces the mode          got assert                                             OK
007:m07                      expected a                                        got a                                                  OK
008:m08                      expected "20–30"                                  got a (hits a)                                         OK
009:m09                      expected preceding cf 17 gives the median         got assert                                             OK
009:m09                      expected a                                        got a                                                  OK
010:m10                      expected 46                                       got a (hits a)                                         OK
011:m11                      expected 35                                       got a (hits a)                                         OK
012:m12                      expected +5                                       got assert                                             OK
012:m12                      expected a                                        got a                                                  OK
013:m13                      expected 36                                       got a (hits a)                                         OK
014:m14                      expected a                                        got a                                                  OK
015:m15                      expected 30                                       got a (hits a)                                         OK
016:m16                      expected class marks                              got assert                                             OK
016:m16                      expected 6                                        got a (hits a)                                         OK
017:m17                      expected 19.5                                     got a (hits a)                                         OK
018:m18                      expected a                                        got a                                                  OK
019:ar1                      expected any a                                    got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected mode 46 ≠ class mark 45                  got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected independent of a                         got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected two modal classes                        got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected 33.75                                    got assert                                             OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected same                                     got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected last cf = n                              got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected 45                                       got 45                                                 OK
031:fb2                      expected 46                                       got 46                                                 OK
032:fb3                      expected preceding                                got preceding|before|just before|previous to           OK
033:fb4                      expected modal                                    got modal                                              OK
034:fb5                      expected 26                                       got 26                                                 OK
035:n01                      expected 52                                       got 52                                                 OK
035:n01                      expected 1560                                     got solution                                           OK
036:n02                      expected 31.24                                    got 31.24                                              OK
036:n02                      expected Σfd                                      got assert                                             OK
037:n03                      expected 648                                      got 648                                                OK
037:n03                      expected Σfu                                      got assert                                             OK
038:n04                      expected 20                                       got 20                                                 OK
038:n04                      expected 1200, 1140, 60                           got solution                                           OK
039:n05                      expected 42.5                                     got 42.5                                               OK
040:n06                      expected 33                                       got 33                                                 OK
041:n07                      expected 9                                        got 9                                                  OK
041:n07                      expected 33, 21                                   got solution                                           OK
042:n08                      expected 52                                       got 52                                                 OK
043:n09                      expected 25.5                                     got 25.5                                               OK
044:s201                     expected 8.2                                      got assert                                             OK
044:s201                     expected 164, 8.2                                 got model answer                                       OK
045:s202                     expected 76                                       got assert                                             OK
045:s202                     expected 70, 14, 8, 10, 76                        got model answer                                       OK
046:s203                     expected median class                             got assert                                             OK
046:s203                     expected 13, 26, 36, 40, 30–40                    got model answer                                       OK
047:s204                     expected values                                   got assert                                             OK
047:s204                     expected 460, 23, 28                              got model answer                                       OK
048:s205                     expected 28                                       got assert                                             OK
048:s205                     expected 84, 28                                   got model answer                                       OK
049:s206                     expected 18                                       got assert                                             OK
049:s206                     expected 180, 360, 18                             got model answer                                       OK
050:s207                     expected 7.5                                      got assert                                             OK
050:s207                     expected 12, 16, 7.5                              got model answer                                       OK
051:s208                     expected 25                                       got assert                                             OK
051:s208                     expected 16, 12, 25                               got model answer                                       OK
052:s209                     expected 145                                      got assert                                             OK
052:s209                     expected -300, 145                                got model answer                                       OK
053:s301                     expected 55                                       got assert                                             OK
053:s301                     expected -30, 55                                  got model answer                                       OK
053:s301                     expected 2200                                     got solution                                           OK
054:s302                     expected 262.5                                    got assert                                             OK
054:s302                     expected 250, 20, 16, 8, 12.5, 262.5              got model answer                                       OK
055:s303                     expected 260                                      got assert                                             OK
055:s303                     expected 22, 15, 260                              got model answer                                       OK
056:s304                     expected p                                        got assert                                             OK
056:s304                     expected 1680, 1472, 208, 13                      got model answer                                       OK
056:s304                     expected 2070                                     got solution                                           OK
057:s305                     expected x 15                                     got assert                                             OK
057:s305                     expected 25, 15, 10                               got model answer                                       OK
058:s306                     expected 46                                       got assert                                             OK
058:s306                     expected 46, 45                                   got model answer                                       OK
059:s307                     expected values                                   got assert                                             OK
059:s307                     expected 1130, 28.25, 28.33                       got model answer                                       OK
060:l01                      expected values                                   got assert                                             OK
060:l01                      expected 702, 14.04, -48, 0.96, -8                got model answer                                       OK
061:l02                      expected values                                   got assert                                             OK
061:l02                      expected 4300, 53.75, 53.33, 52, 52.5             got model answer                                       OK
062:l03                      expected x 17                                     got assert                                             OK
062:l03                      expected mode                                     got assert                                             OK
062:l03                      expected 40, 17, 23, 671.43                       got model answer                                       OK
063:l04                      expected p 11                                     got assert                                             OK
063:l04                      expected median                                   got assert                                             OK
063:l04                      expected 18, 82, 7, 11, 48                        got model answer                                       OK
064:l05                      expected values                                   got assert                                             OK
064:l05                      expected 53.75, 48.33, 2700, 54, 2500, 50         got model answer                                       OK
065:l06                      expected values                                   got assert                                             OK
065:l06                      expected -4, 34.2, 59, -13, 32.8, 34              got model answer                                       OK
066:c01.a                    expected "60–80"                                  got c (hits c)                                         OK
066:c01.b                    expected 67                                       got 67                                                 OK
066:c01.c                    expected 72                                       got model answer                                       OK
066:c01.cii                  expected 28, 70                                   got model answer                                       OK
067:c02.a                    expected 50                                       got b (hits b)                                         OK
067:c02.b                    expected 46.8                                     got 46.8                                               OK
067:c02.c                    expected 46.67                                    got model answer                                       OK
067:c02.cii                  expected 47.5                                     got model answer                                       OK
068:c03.a                    expected "200–250"                                got d (hits d)                                         OK
068:c03.b                    expected 215                                      got 215                                                OK
068:c03.c                    expected 225                                      got model answer                                       OK
068:c03.cii                  expected 24, 40                                   got model answer                                       OK
069:c04.a                    expected 1                                        got c (hits c)                                         OK
069:c04.b                    expected 72.6                                     got 72.6                                               OK
069:c04                      expected Σfu                                      got assert                                             OK
069:c04.c                    expected 75                                       got model answer                                       OK
069:c04.cii                  expected 73.33                                    got model answer                                       OK
070:c05.a                    expected 18                                       got a (hits a)                                         OK
070:c05.b                    expected 280                                      got 280                                                OK
070:c05.c                    expected 1, 276                                   got model answer                                       OK
070:c05.cii                  expected 277.78                                   got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch14 (115 checks)</summary>

```
001:m01                      expected 0                                        got a (hits a)                                         OK
002:m02                      expected true                                     got a (hits a)                                         OK
003:m03                      expected 0.65                                     got a (hits a)                                         OK
004:m04                      expected 0.3333333333333333                       got a (hits a)                                         OK
005:m05                      expected 0.5                                      got a (hits a)                                         OK
006:m06                      expected 0.75                                     got a (hits a)                                         OK
007:m07                      expected 0.038461538461538464                     got a (hits a)                                         OK
008:m08                      expected 0.23076923076923078                      got a (hits a)                                         OK
009:m09                      expected 0.6                                      got a (hits a)                                         OK
010:m10                      expected 0.2                                      got a (hits a)                                         OK
011:m11                      expected 0.16666666666666666                      got a (hits a)                                         OK
012:m12                      expected 0.16666666666666666                      got a (hits a)                                         OK
013:m13                      expected die sums to 1                            got assert                                             OK
013:m13                      expected a                                        got a                                                  OK
014:m14                      expected 1                                        got a (hits a)                                         OK
015:m15                      expected 0.375                                    got a (hits a)                                         OK
016:m16                      expected 0.8333333333333334                       got a (hits a)                                         OK
017:m17                      expected 0.4166666666666667                       got a (hits a)                                         OK
018:m18                      expected 0.6923076923076923                       got a (hits a)                                         OK
019:ar1                      expected complement                               got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected 0                                        got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected not equally likely                       got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected 6                                        got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected 3/8                                      got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected 1/2                                      got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected 6 vs 1                                   got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected 26                                       got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected 1                                        got 1                                                  OK
031:fb2                      expected 0                                        got 0                                                  OK
032:fb3                      expected 36                                       got 36                                                 OK
033:fb4                      expected 0.2                                      got 1/5|0.2|2/10                                       OK
034:fb5                      expected 12                                       got 12                                                 OK
035:n01                      expected 0.125                                    got 0.125                                              OK
035:n01                      expected \dfrac18                                 got solution                                           OK
036:n02                      expected 0.25                                     got 0.25                                               OK
036:n02                      expected \dfrac14                                 got solution                                           OK
037:n03                      expected 0.11                                     got 0.11                                               OK
037:n03                      expected \dfrac19                                 got solution                                           OK
038:n04                      expected 0.38                                     got 0.38                                               OK
038:n04                      expected \dfrac{5}{13}, 20                        got solution                                           OK
039:n05                      expected 0.92                                     got 0.92                                               OK
040:n06                      expected 0.03                                     got 0.03                                               OK
040:n06                      expected \dfrac{3}{100}                           got solution                                           OK
041:n07                      expected 9                                        got 9                                                  OK
041:n07                      expected 18                                       got solution                                           OK
042:n08                      expected 0.5                                      got 0.5                                                OK
042:n08                      expected \dfrac12                                 got solution                                           OK
043:n09                      expected 0.12                                     got 0.12                                               OK
043:n09                      expected 12                                       got assert                                             OK
044:s201                     expected \dfrac16, \dfrac12                       got model answer                                       OK
045:s202                     expected 4                                        got assert                                             OK
045:s202                     expected \dfrac12                                 got model answer                                       OK
046:s203                     expected 16                                       got assert                                             OK
046:s203                     expected 16, \dfrac{4}{13}                        got model answer                                       OK
047:s204                     expected \dfrac16, \dfrac56                       got model answer                                       OK
048:s205                     expected \dfrac35, \dfrac25                       got model answer                                       OK
049:s206                     expected 4                                        got assert                                             OK
049:s206                     expected \dfrac19                                 got model answer                                       OK
050:s207                     expected 5/7                                      got assert                                             OK
050:s207                     expected \dfrac57                                 got model answer                                       OK
051:s208                     expected 10                                       got assert                                             OK
051:s208                     expected 10, \dfrac13                             got model answer                                       OK
052:s209                     expected values                                   got assert                                             OK
052:s209                     expected 16, 8                                    got model answer                                       OK
053:s301                     expected \dfrac{7}{36}, \dfrac16                  got model answer                                       OK
054:s302                     expected 46                                       got assert                                             OK
054:s302                     expected \dfrac{10}{23}, \dfrac{3}{23}, \dfrac{1} got model answer                                       OK
055:s303                     expected \dfrac12, \dfrac18, \dfrac14             got model answer                                       OK
056:s304                     expected x 10                                     got assert                                             OK
056:s304                     expected 10, \dfrac49                             got model answer                                       OK
057:s305                     expected \dfrac{1}{36}, \dfrac16                  got model answer                                       OK
058:s306                     expected 50                                       got assert                                             OK
058:s306                     expected \dfrac{2}{25}, \dfrac{7}{50}, \dfrac{1}{ got model answer                                       OK
059:s307                     expected \dfrac38, \dfrac12, \dfrac12             got model answer                                       OK
060:l01                      expected 36, \dfrac{5}{36}, \dfrac{5}{18}, \dfrac got model answer                                       OK
061:l02                      expected \dfrac{1}{26}, \dfrac{6}{13}, \dfrac{3}{ got model answer                                       OK
062:l03                      expected x 8                                      got assert                                             OK
062:l03                      expected 8, \dfrac{7}{13}, \dfrac{5}{17}, 0.54, 0 got model answer                                       OK
063:l04                      expected sum 1                                    got assert                                             OK
063:l04                      expected \dfrac16, \dfrac13, \dfrac12             got model answer                                       OK
064:l05                      expected \dfrac{71}{80}, \dfrac{1}{10}, \dfrac15, got model answer                                       OK
064:l05                      expected 22 primes                                got assert                                             OK
065:l06                      expected values                                   got assert                                             OK
065:l06                      expected \dfrac14, \dfrac38, \dfrac38             got model answer                                       OK
066:c01.a                    expected 0.16666666666666666                      got a (hits a)                                         OK
066:c01.b                    expected 0.5                                      got 1/2|0.5|3/6                                        OK
066:c01.c                    expected \dfrac{11}{36}, 25                       got model answer                                       OK
066:c01.cii                  expected \dfrac{1}{36}                            got model answer                                       OK
067:c02.a                    expected 0.25                                     got b (hits b)                                         OK
067:c02.b                    expected 6                                        got 6                                                  OK
067:c02.c                    expected \dfrac{3}{26}                            got model answer                                       OK
067:c02.cii                  expected 39, \dfrac23                             got model answer                                       OK
068:c03.a                    expected 0.3                                      got c (hits c)                                         OK
068:c03.b                    expected 0.5                                      got 0.5                                                OK
068:c03.c                    expected \dfrac45                                 got model answer                                       OK
068:c03.cii                  expected 10                                       got model answer                                       OK
069:c04.a                    expected 8                                        got d (hits d)                                         OK
069:c04.b                    expected 0.375                                    got 0.375                                              OK
069:c04.c                    expected \dfrac78                                 got model answer                                       OK
069:c04.cii                  expected \dfrac12                                 got model answer                                       OK
070:c05.a                    expected 36                                       got b (hits b)                                         OK
070:c05.b                    expected 0.08                                     got 0.08                                               OK
070:c05.c                    expected 15, \dfrac{5}{12}                        got model answer                                       OK
070:c05.cii                  expected \dfrac14                                 got model answer                                       OK
```
</details>
