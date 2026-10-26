# subject-producer — CBSE 10 Mathematics ch01–ch04, hand-authored (D-025, D-026) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-maths-a` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-maths-a`), based on `platform/main`; merged `origin/platform/main` twice during the work (d19bf5e lint covers `content/authored`; bdab615 contract v2) and re-validated every chapter after each merge.

## What changed
| Path | What |
|---|---|
| `platform/content/authored/maths/cbse-10-mathematics-ch01/` | Real Numbers: `release.json`, `tests.json`, `README.md`, `src/` |
| `platform/content/authored/maths/cbse-10-mathematics-ch02/` | Polynomials: same layout |
| `platform/content/authored/maths/cbse-10-mathematics-ch03/` | Pair of Linear Equations in Two Variables: same layout |
| `platform/content/authored/maths/cbse-10-mathematics-ch04/` | Quadratic Equations: same layout |
| `…/cbse-10-mathematics-ch01/src/lib.mjs` | Shared authoring library used by all four chapters: builders (slides, decks, questions with `alternatives`, case parents with `passage_origin`, plot/table/flow/geometry, factor trees, chapter tests on the default blueprints), an **independent re-solve harness** (`opt`, `which`, `key`, `val`, `blank`, `model`, `sol`, `assert`) and the **validator** (KaTeX strict, lost backslashes, control characters / eaten escapes, narration, plot points-on-curve + every zero marked + intersections, schemes, MCQ key balancing, statistics) |
| `…/cbse-10-mathematics-ch01/src/lint.mts` | Runs the pipeline's `lintExemplar` on given chapter dirs |
| `…/cbse-10-mathematics-ch01/src/relabel.mjs` | Edits difficulty/competency of a bank item by key |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-maths-a.md` | This note |

`src/` holds the sources (`build.mjs` = decks, notes, flashcards, tests; `questions.mjs` = bank + one re-solve check per item). Rebuild from `platform/`: `npx tsx content/authored/maths/<chapter>/src/build.mjs` (deterministic; writes `release.json`, `tests.json`, `src/resolve.log` — the log is git-ignored by `platform/.gitignore` `*.log`). The gate only reads the three files at the chapter root.

Commits: 111eadc (ch01), c97e813 (ch02 + contract-v2 `passage_origin`), 420686b (ch03), 204afee (ch04 + validator hardening), d94dcf9 (MCQ key balance), and the handoff commit.

## Scope decisions
- **Syllabus (catalog `cbse/10/mathematics/syllabus.yaml`, Standard 041 and Basic 241 share it):** only the listed topic ids are used. Removed topics are absent everywhere, including distractors: Euclid's division lemma/algorithm and decimal expansions (ch01); zeroes–coefficients relations for cubics and the division algorithm (ch02; cubic graphs appear only to read zeroes, t01); cross-multiplication and equations reducible to linear form (ch03 — so no 1/x substitutions and no upstream/downstream pairs); completing the square (ch04 — the quadratic formula is **stated, never derived**).
- **Tests** match the default blueprints `cbse-10-default-chapter-test-short` / `-long` exactly (sections A objective, B short 2/3 with the blueprint's internal choices, C long 5 with choice, D case-based), so `blueprint_id` is set. This differs from the maths exemplar's A–E board layout; the default blueprint is the editable SOYL config, so I matched it. Short and long tests are disjoint.
- **Case-based items** use contract `alternatives` for the either/or part (c), carry `passage_origin: "soyl-original"`, and have full model answers per part.
- `word_limit` (contract v2, optional) is not set on maths short/long items: maths answers are marked by steps.

## Counts
| | ch01 Real Numbers | ch02 Polynomials | ch03 Linear Pair | ch04 Quadratics |
|---|---|---|---|---|
| Decks (slides) | 22 + 16 | 17 + 17 | 18 + 17 | 17 + 16 |
| Slides with a visual / max gap | 27 / 2 | 24 / 1 | 25 / 2 | 23 / 1 |
| Worked examples | 5 + 4 | 2 + 4 | 3 + 6 | 5 + 5 |
| Check slides (all objective) | 3 + 3 | 3 + 3 | 3 + 3 | 3 + 3 |
| Narration max / mean words | 71 / 57 | 68 / 53 | 67 / 53 | 66 / 51 |
| Notes sections | 8 | 8 | 6 | 6 |
| Flashcards | 32 | 30 | 30 | 30 |
| Questions / marks | 70 / 139 | 70 / 140 | 70 / 140 | 70 / 140 |
| Difficulty d1/d2/d3/d4/d5 | 9/34/21/4/2 | 12/29/23/4/2 | 12/36/17/4/1 | 12/27/19/11/1 |
| Application or higher | 47% items, 65% marks | 51%, 70% | 50%, 64% | 56%, 73% |
| AR keys | a b c d a c | a c d b a c | a d b c a d | a b c d a d |
| MCQ keys a/b/c/d | 6/6/6/5 | 6/6/6/5 | 6/6/6/5 | 6/6/6/5 |
| KaTeX strings (strict) | 1562 | 1469 | 1291 | 1291 |
| Re-solve checks | 141/141 | 137/137 | 129/129 | 144/144 |

Every bank: mcq 18 · assertion-reason 6 · true-false 5 · fill-blank 5 · numerical 9 (tolerance + unit) · short 2-mark 9 · short 3-mark 7 · long 5-mark 6 · case-based 5 (1 + 1 + 2, part (c) either/or). Ids `q_cbse10math_chNN_001…070`; tests `t_cbse10math_chNN_short|_long` (20 marks/40 min, 10 items; 40 marks/90 min, 22 items).

Visuals by kind (deck; notes/questions): ch01 geometry 8, table 13, flow 5, plot 1; 4/2/2/1 — factor trees, two-circle prime diagrams, √2 on the number line. ch02 plot 12, table 10, geometry 1, flow 1; plot 14, table 3, geometry 1. ch03 plot 10, table 11, flow 4; plot 9, table 2, flow 1. ch04 plot 7, table 13, flow 2, geometry 1; plot 6, table 3, flow 1, geometry 1.

## How to verify (output on the final tree)
```
cd platform && npm install
npm test -w @soyl/content-templates
 ✓ exemplars > maths/cbse-10-mathematics-ch01 > is a valid ChapterRelease
 ✓ exemplars > maths/cbse-10-mathematics-ch01 > is named after its chapter and has a README
 ✓ exemplars > maths/cbse-10-mathematics-ch01 > uses only topics from the chapter syllabus
 ✓ exemplars > maths/cbse-10-mathematics-ch01 > decks meet the visual lesson rules
 ✓ exemplars > maths/cbse-10-mathematics-ch01 > has enough flashcards and practice questions
 ✓ exemplars > maths/cbse-10-mathematics-ch01 > writes language subjects in their own script (NFC, well-formed, no Latin runs, TTS-safe narration)
 ✓ exemplars > maths/cbse-10-mathematics-ch01 > has a short and a long chapter test drawn from its own questions
   (the same 7 checks pass for ch02, ch03 and ch04)
 Test Files  1 passed (1)
      Tests  57 passed (57)

npm run content -- lint --exemplars
ok   cbse-10-mathematics-ch06: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch01: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch02: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch03: 0 error(s), 0 warning(s)
ok   cbse-10-mathematics-ch04: 0 error(s), 0 warning(s)
   (other units: hindi-a-ch02 ok, hindi-a-ch10 ok with 16 warnings, science-ch01 ok — not mine)

npx tsx content/authored/maths/cbse-10-mathematics-ch0N/src/build.mjs   (validator, per chapter)
ch01: KaTeX 1562 strings (0.19.0, throwOnError, strict: "error") 0 failures; reSolved 141/141; NO ERRORS
ch02: KaTeX 1469; plots: 53 marked points on their curves, 59 zeros located and all marked; reSolved 137/137; NO ERRORS
ch03: KaTeX 1291; plots: 44 points, 16 intersection points on both lines, 18 intercepts; reSolved 129/129; NO ERRORS
ch04: KaTeX 1291; plots: 24 points, 24 roots (incl. irrational and touching) all marked; reSolved 144/144; NO ERRORS
```
KaTeX is the platform's own `katex` package (0.19.0), strict mode `"error"`, over every `$…$`/`$$…$$` span, every `math[]` entry and every notes formula; the validator also rejects LaTeX commands without a backslash (including brace-less ones such as `Rightarrow`, `ne`), control characters, line breaks inside inline maths, LaTeX outside `$…$`, and Unicode maths symbols inside `$…$`.

## Verifier pass (done by the author)
**Method.** Every item has a re-solve check written from the givens, never from the written answer: gcd/lcm/factorisation code (ch01), quadratic formula and a numeric root finder on the plotted expression (ch02, ch04), Cramer's rule plus an independent determinant-based ratio classifier (ch03), brute-force searches for unknowns ($k$ values, multipliers, all HCF-16/LCM-960 pairs), and substitution of every word-problem answer back into the **story** (ages in past and future, round-trip times, coin values). Option sets are checked value-by-value with exactly one match (`which`), and the numbers inside solutions and model answers are checked (`model`, `sol`) — the exemplar's lesson that keys alone are not enough. Proof items (4, all in ch01: √5, √3 + hence, 7 + 2√3, 2√3/7) were checked step by step by hand and are listed as qualitative in the logs.

**Fixes made during the pass:**
1. **Lost backslash (ch02 q042):** a shell-edited replacement wrote `Rightarrow` without its backslash. The author validator caught it; the pipeline lint did not (its rule only covers commands followed by `{`).
2. **Eaten `\ne` (ch03 Part 2 s08):** rewording "$0 = 4$" as "$0 \ne 4$" inside a single-quoted JS string turned `\n` into a newline (`$0 ⏎e 4$`). Neither KaTeX nor either lint noticed (KaTeX renders "0 e 4"). I added a control-character / line-break-in-maths check to the validator, which then caught it; fixed.
3. **Garbled model answer (ch03 q064):** a half-written sentence ("$60 - 2x$… precisely") replaced with a clean substitution.
4. **Non-real zeroes (ch02 q042 original):** "$kx^2 + 2x + 3k$, sum = product" gives $k = -\frac23$ with non-real zeroes, which Class 10 avoids — replaced by $x^2 - (k + 2)x + 2k$ (double zero 2).
5. **Pipeline arithmetic lint vs deliberate false statements:** "$0 = 9$", "$0 = 5$", "$4 = 0$", "$2 = 0$", "$\frac21 = \frac51$" inside solutions were flagged as arithmetic errors (5 in ch03, 2 in ch04). Reworded as "left side 0, right side 9, and $0 \ne 9$" / "only the constant 2 is left". Stems may still quote "$0 = 9$" as the claim to test (stems are not arithmetic-checked).
6. **Markdown paragraphs:** question parts "(a) … (b) …" on single newlines would render as one paragraph; the builder now inserts paragraph breaks (all four chapters).
7. **MCQ key bias:** drafts had (a) as the key for 8–15 of 23 MCQs per chapter and (d) almost never. The builder now rotates options after the re-solve so keys cycle a→b→c→d, remaps every option letter quoted in solutions, schemes and case model answers, and verifies the key text is unchanged (sample reviewed by eye).
8. **Honest labels:** ch01 competency 43% → 47% application+ by relabelling three items whose demand is above routine (q002, q045, q027); ch02/ch03 d1 share cut from ~23% to 17% by relabelling eight two-step items to d2. No numeric key or solution number was wrong in the final re-solve.
9. **Checker-only fixes (content was right):** KaTeX Indian grouping `2{,}45{,}000`, negative accepted blanks, string-valued option sets.

**Originality:** no NCERT/RD Sharma/RS Aggarwal/CBSE-sample item is reused; famous configurations were avoided or re-imagined (each chapter README lists the ones deliberately avoided, e.g. NCERT's 3825 / 96 & 404 / 306 & 657, the six NCERT Ex 2.2 polynomials, "Aftab seven times/three times", the 100 km cars, taxi/library fixed-plus-rate pairs, the 528 m² plot, the 13 cm hypotenuse, the cottage-industry toys, the 80 m/400 m² park). Contexts are Indian and varied (Kolkata bus depot, Jaipur bangles, Brindavan fountains, Khurja diyas, Hyderabad museum, Eden Gardens, Ludhiana canal enclosure, Thiruvananthapuram diver, and more).

## Tests added
None (content only). The existing gate and lint cover the chapters.

## Known gaps / follow-ups
- **Narration audio** not generated (TTS stage); narration is TTS-safe (no symbols, no letter abbreviations such as HCF/LCM — spoken as words).
- **Renderer needs:** KaTeX inside table cells and plot point labels (e.g. `$3 + \sqrt2$`); `series` (scatter) in one ch01 plot; geometry point `label` strings for factor trees.
- **`PlotVisual` cannot draw vertical lines** ($x = 3$): such lines appear in text only in ch03.
- ch04 t03 has 7 tagged items (formula use is mostly tagged under t04/t05 where it is applied).
- Build sources live under `src/` in each chapter folder (owned path). If the Lead prefers chapter folders to hold only the three gate files, `src/` can move to a tooling location once one exists.

## Recommendations (for pipeline-engineer / Lead)
1. **Lint `latex.backslash`:** also flag brace-less commands that lost their backslash (`Rightarrow`, `ne`, `le`, `ge`, `pm`, `times`, `cdot`, `circ` as whole words inside maths), and treat any **line break or control character inside `$…$`** as an error — an eaten `\ne` currently passes both KaTeX and lint.
2. **Lint `math.arithmetic`:** allow an explicit opt-out for deliberately false statements (e.g. a `\text{(false)}` marker, or skip `=` chains where one side is a bare `0` and the text says "false"/"contradiction"), so authors need not contort "we get $0 = 4$".
3. **Lint balance check:** warn when one MCQ key letter exceeds ~40% of a chapter's MCQs, or one letter is under ~10% (the author drafts here were 65% (a)).
4. **Plot lint:** check that a marked point lies on a plotted function (or is explicitly free), and that when any zero of a function is marked, all its zeros in range are — the author validator does this (`plotChecks` in `lib.mjs`) and found no issues, but generated content will need it.
5. **Contract:** a `lines`/vertical-line primitive in `PlotVisual`; a documented convention for KaTeX in plot labels.

## Needs from owner
None.

The logs below are `src/resolve.log` from the final build. Option letters in them are the **authored** letters: the re-solve runs before the key-balancing rotation, which then remaps letters mechanically and verifies the key text is unchanged.

<details><summary>Numeric re-solve output, ch01 (141 checks)</summary>

```
001:m01                      expected a                                        got a                                                  OK
001:m01                      expected 588, 294, 147, 49, 504, 2352             got solution                                           OK
001:m01                      expected distractor values                        got assert                                             OK
002:m02                      expected c                                        got c                                                  OK
002:m02                      expected exactly one base always ends in 0        got assert                                             OK
003:m03                      expected 5                                        got $5$                                                OK
004:m04                      expected 36                                       got $36$                                               OK
004:m04                      expected 7560                                     got solution                                           OK
005:m05                      expected 180                                      got $180$                                              OK
005:m05                      expected distractors                              got assert                                             OK
006:m06                      expected gcd(n, n+1) = 1 for n < 500              got assert                                             OK
006:m06                      expected b                                        got b                                                  OK
007:m07                      expected 180                                      got $180$                                              OK
007:m07                      expected distractors                              got assert                                             OK
008:m08                      expected b                                        got b                                                  OK
008:m08                      expected 7.5, 12, 25, 7                           got solution                                           OK
009:m09                      expected 432                                      got $432$ s                                            OK
009:m09                      expected distractors                              got assert                                             OK
010:m10                      expected 60                                       got $60$                                               OK
010:m10                      expected remainders                               got assert                                             OK
011:m11                      expected which root is not a perfect square       got assert                                             OK
011:m11                      expected c                                        got c                                                  OK
012:m12                      expected root5 x root20 = 10                      got assert                                             OK
012:m12                      expected b                                        got b                                                  OK
013:m13                      expected b                                        got b                                                  OK
014:m14                      expected counter-example for (d)                  got assert                                             OK
014:m14                      expected b                                        got b                                                  OK
015:m15                      expected product = 1                              got assert                                             OK
015:m15                      expected b                                        got b                                                  OK
016:m16                      expected b                                        got b                                                  OK
017:m17                      expected 12                                       got $12$                                               OK
017:m17                      expected 1728                                     got solution                                           OK
018:m18                      expected HCF 1, LCM 30, product 900               got assert                                             OK
018:m18                      expected b                                        got b                                                  OK
019:ar1                      expected 12^n never ends in 0                     got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected HCF 13                                   got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected = 6                                      got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected counter-example                          got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected example                                  got assert                                             OK
024:ar6                      expected c                                        got c                                                  OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected example                                  got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected 22/7 differs from pi                     got assert                                             OK
028:tf4                      expected 3.1429, 3.1416                           got solution                                           OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected 10                                       got solution                                           OK
029:tf5                      expected f                                        got f                                                  OK
030:fb1                      expected 7                                        got 7                                                  OK
030:fb1                      expected 7 prime                                  got assert                                             OK
031:fb2                      expected given HCF                                got assert                                             OK
031:fb2                      expected 1872                                     got 1872                                               OK
032:fb3                      expected 360                                      got 360                                                OK
033:fb4                      expected 3                                        got 3                                                  OK
034:fb5                      expected 2                                        got 2|two                                              OK
035:n01                      expected 45                                       got 45                                                 OK
035:n01                      expected factorisations                           got assert                                             OK
036:n02                      expected 22680                                    got 22680                                              OK
036:n02                      expected 1020600, 1020600                         got solution                                           OK
037:n03                      expected 540                                      got 540                                                OK
037:n03                      expected HCF divides LCM                          got assert                                             OK
038:n04                      expected 5                                        got 5                                                  OK
038:n04                      expected 42                                       got solution                                           OK
039:n05                      expected 12                                       got 12                                                 OK
039:n05                      expected 300                                      got solution                                           OK
040:n06                      expected 168                                      got 168                                                OK
040:n06                      expected 3, 2, 6                                  got solution                                           OK
041:n07                      expected 108                                      got 108                                                OK
041:n07                      expected pair consistent                          got assert                                             OK
042:n08                      expected 33                                       got 33                                                 OK
042:n08                      expected 39204, 198                               got solution                                           OK
042:n08                      expected 198^2                                    got assert                                             OK
043:n09                      expected 23                                       got 23                                                 OK
043:n09                      expected co-prime                                 got assert                                             OK
044:s201                     expected factorisation                            got assert                                             OK
044:s201                     expected 2457, 819, 273, 91                       got model answer                                       OK
045:s202                     expected composite                                got assert                                             OK
045:s202                     expected 385, 386, 3474                           got model answer                                       OK
046:s203                     expected 35^n ends in 5                           got assert                                             OK
046:s203                     expected No                                       got model answer                                       OK
047:s204                     expected 66, 396                                  got model answer                                       OK
047:s204                     expected check                                    got assert                                             OK
048:s205                     expected 207, 33327                               got model answer                                       OK
048:s205                     expected consistent                               got assert                                             OK
049:s206                     expected qualitative                              got proof: structure checked by hand (assume rational, OK
050:s207                     expected 3 root 2                                 got assert                                             OK
050:s207                     expected 3\sqrt2                                  got model answer                                       OK
051:s208                     expected 6, 72, 432, 15552                        got model answer                                       OK
052:s209                     expected 10, 360                                  got model answer                                       OK
052:s209                     expected 40, 90                                   got solution                                           OK
053:s301                     expected 3, 31500, 94500                          got model answer                                       OK
053:s301                     expected product                                  got assert                                             OK
054:s302                     expected 2, 840                                   got model answer                                       OK
054:s302                     expected not product                              got assert                                             OK
055:s303                     expected qualitative                              got standard proof (syllabus LO): steps checked by han OK
056:s304                     expected qualitative                              got proof: structure checked by hand                   OK
057:s305                     expected 391, 425, 527, 17, 23, 25, 31            got model answer                                       OK
057:s305                     expected remainders                               got assert                                             OK
058:s306                     expected 144, 1008, 1013                          got model answer                                       OK
058:s306                     expected 869                                      got solution                                           OK
059:s307                     expected 60, 15, 900                              got model answer                                       OK
059:s307                     expected 75, 60, 45                               got solution                                           OK
060:l01                      expected qualitative                              got proof: steps checked by hand                       OK
061:l02                      expected 216, 2.16, 7, 5, 35, 6300                got model answer                                       OK
061:l02                      expected factorisations                           got assert                                             OK
062:l03                      expected 2772, 46, 12, 11, 9, 14                  got model answer                                       OK
063:l04                      expected 36, 1080, 38880, 1399680, 36             got model answer                                       OK
064:l05                      expected counter-example 6                        got assert                                             OK
064:l05                      expected 36, 6                                    got model answer                                       OK
065:l06                      expected 4 pairs                                  got assert                                             OK
065:l06                      expected 16, 960, 48, 320, 64, 240, 80, 192       got model answer                                       OK
066:c01.a                    expected b                                        got b                                                  OK
066:c01.b                    expected 180                                      got 180                                                OK
066:c01.c                    expected 900, 180, 5                              got model answer                                       OK
066:c01.cii                  expected 120                                      got model answer                                       OK
066:c01                      expected 8 am                                     got assert                                             OK
066:c01                      expected 180, 5, 120                              got model answer                                       OK
067:c02.a                    expected c                                        got c                                                  OK
067:c02.b                    expected 144                                      got 144                                                OK
067:c02.c                    expected 3, 4, 5, 12                              got model answer                                       OK
067:c02.cii                  expected 9, 12, 15, 36                            got model answer                                       OK
067:c02                      expected 48 common factor                         got assert                                             OK
068:c03.a                    expected 4                                        got 4                                                  OK
068:c03.b                    expected 70                                       got 70                                                 OK
068:c03.b                    expected 176400, 420                              got solution                                           OK
068:c03.cii                  expected LCM 1..10 = 2520                         got assert                                             OK
068:c03.cii                  expected 2520                                     got model answer                                       OK
069:c04.a                    expected P+Q=6                                    got assert                                             OK
069:c04.a                    expected a                                        got a                                                  OK
069:c04.b                    expected 7                                        got 7                                                  OK
069:c04.cii                  expected 6, 7                                     got model answer                                       OK
070:c05.a                    expected d                                        got d                                                  OK
070:c05.b                    expected 36                                       got 36                                                 OK
070:c05.c                    expected 11, 14, 17, 43                           got model answer                                       OK
070:c05.cii                  expected 18                                       got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch02 (137 checks)</summary>

```
001:m01                      expected b                                        got b                                                  OK
002:m02                      expected -1.5                                     got a (hits a)                                         OK
003:m03                      expected zeros -1,0,2                             got assert                                             OK
003:m03                      expected 3                                        got c (hits c)                                         OK
004:m04                      expected zeros 1                                  got assert                                             OK
004:m04                      expected 1                                        got b (hits b)                                         OK
005:m05                      expected no zeros, min (−1, 2)                    got assert                                             OK
005:m05                      expected c                                        got c                                                  OK
006:m06                      expected b                                        got b                                                  OK
007:m07                      expected c                                        got c                                                  OK
008:m08                      expected b                                        got b                                                  OK
009:m09                      expected zeros 2/3, 1                             got assert                                             OK
009:m09                      expected 1.6666666666666665                       got a (hits a)                                         OK
010:m10                      expected -2.25                                    got b (hits b)                                         OK
011:m11                      expected [1,-1,-12]                               got b (hits b)                                         OK
012:m12                      expected 28                                       got a (hits a)                                         OK
013:m13                      expected -1                                       got a (hits a)                                         OK
013:m13                      expected 2 is a zero                              got assert                                             OK
014:m14                      expected reciprocal zeros                         got assert                                             OK
014:m14                      expected 5                                        got a (hits a)                                         OK
015:m15                      expected opposite zeros                           got assert                                             OK
015:m15                      expected 3                                        got a (hits a)                                         OK
016:m16                      expected 0.8333333333333333                       got a (hits a)                                         OK
017:m17                      expected [1,-4,1]                                 got a (hits a)                                         OK
018:m18                      expected [1,-10,24]                               got a (hits a)                                         OK
019:ar1                      expected min 1 at −2                              got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected c                                        got c                                                  OK
021:ar3                      expected sum 3/2                                  got assert                                             OK
021:ar3                      expected d                                        got d                                                  OK
022:ar4                      expected zeros ±3                                 got assert                                             OK
022:ar4                      expected b                                        got b                                                  OK
023:ar5                      expected same zeros                               got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected zeros                                    got assert                                             OK
024:ar6                      expected c                                        got c                                                  OK
025:tf1                      expected p(2)=0                                   got assert                                             OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected equal products                           got assert                                             OK
028:tf4                      expected t                                        got t                                                  OK
029:tf5                      expected k = 2 also works                         got assert                                             OK
029:tf5                      expected f                                        got f                                                  OK
030:fb1                      expected 0.6                                      got 3/5|0.6                                            OK
031:fb2                      expected parabola                                 got parabola                                           OK
032:fb3                      expected 5                                        got 5                                                  OK
033:fb4                      expected x^2 - 5                                  got assert                                             OK
033:fb4                      expected 5                                        got 5                                                  OK
034:fb5                      expected -8                                       got -8                                                 OK
034:fb5                      expected zero 3                                   got assert                                             OK
035:n01                      expected -1                                       got -1                                                 OK
036:n02                      expected 38                                       got 38                                                 OK
037:n03                      expected 12                                       got 12                                                 OK
038:n04                      expected 6                                        got 6                                                  OK
038:n04                      expected other zero 2/3                           got assert                                             OK
039:n05                      expected 17                                       got 17                                                 OK
039:n05                      expected 529, 240, 289, 15, 8                     got solution                                           OK
040:n06                      expected -5.25                                    got -5.25                                              OK
041:n07                      expected 4                                        got 4                                                  OK
042:n08                      expected double zero 2                            got assert                                             OK
042:n08                      expected 2                                        got 2                                                  OK
043:n09                      expected zeros -1,5                               got assert                                             OK
043:n09                      expected 5                                        got 5                                                  OK
044:s201                     expected zeros                                    got assert                                             OK
044:s201                     expected -5, 3, -2, -15                           got model answer                                       OK
045:s202                     expected zeros                                    got assert                                             OK
045:s202                     expected 2x^2 - 5x - 3, 3, -\dfrac12              got model answer                                       OK
046:s203                     expected graph                                    got assert                                             OK
046:s203                     expected -2, 3, 6                                 got model answer                                       OK
047:s204                     expected zeros                                    got assert                                             OK
047:s204                     expected \dfrac43, -\dfrac{16}{9}                 got model answer                                       OK
048:s205                     expected x^2 - 5x - 6                             got assert                                             OK
048:s205                     expected 5, -6, x^2 - 5x - 6                      got model answer                                       OK
049:s206                     expected p and zeros                              got assert                                             OK
049:s206                     expected 1, -4                                    got model answer                                       OK
050:s207                     expected both                                     got assert                                             OK
050:s207                     expected Both                                     got model answer                                       OK
051:s208                     expected touch at 2                               got assert                                             OK
051:s208                     expected (2, 0)                                   got model answer                                       OK
052:s209                     expected sum −4                                   got assert                                             OK
052:s209                     expected \dfrac43, -1, -3                         got model answer                                       OK
053:s301                     expected zeros                                    got assert                                             OK
053:s301                     expected -\dfrac52, \dfrac32, -\dfrac{15}{4}      got model answer                                       OK
054:s302                     expected zero                                     got assert                                             OK
054:s302                     expected 6, 4, 14                                 got model answer                                       OK
055:s303                     expected poly                                     got assert                                             OK
055:s303                     expected 29, 100, x^2 - 29x + 100                 got model answer                                       OK
056:s304                     expected values                                   got assert                                             OK
056:s304                     expected 5, \dfrac{21}{4}                         got model answer                                       OK
057:s305                     expected zeros                                    got assert                                             OK
057:s305                     expected -2, 4, -8                                got model answer                                       OK
058:s306                     expected condition                                got assert                                             OK
058:s306                     expected 20, x^2 - 26x + 78                       got model answer                                       OK
059:s307                     expected sides                                    got assert                                             OK
059:s307                     expected 19, 84, 12, 7                            got model answer                                       OK
060:l01                      expected table 6,0,-4,-6,-6,-4,0,6                got assert                                             OK
060:l01                      expected min                                      got assert                                             OK
060:l01                      expected -2, 3, 1, -6                             got model answer                                       OK
061:l02                      expected 12,2,8,40                                got assert                                             OK
061:l02                      expected (e)                                      got assert                                             OK
061:l02                      expected 12, 2, 8, 40, 2x^2 - 4x + 1              got model answer                                       OK
062:l03                      expected k and zeros                              got assert                                             OK
062:l03                      expected 4, -1, -4                                got model answer                                       OK
063:l04                      expected graph                                    got assert                                             OK
063:l04                      expected expansion                                got assert                                             OK
063:l04                      expected -1, 1, 3                                 got model answer                                       OK
064:l05                      expected correct                                  got assert                                             OK
064:l05                      expected ravi zeros                               got assert                                             OK
064:l05                      expected 6x^2 - 5x - 6, (3x + 2)(2x - 3), (3x - 2 got model answer                                       OK
065:l06                      expected k                                        got assert                                             OK
065:l06                      expected 2,-9,8                                   got assert                                             OK
065:l06                      expected -1, \dfrac92, 4, 2x^2 - 9x + 8           got model answer                                       OK
066:c01.a                    expected c                                        got c                                                  OK
066:c01.b                    expected 4                                        got 4                                                  OK
066:c01.c                    expected 2, 4                                     got model answer                                       OK
066:c01.cii                  expected 6, 2                                     got model answer                                       OK
067:c02.a                    expected 82                                       got b (hits b)                                         OK
067:c02.b                    expected 420                                      got 420                                                OK
067:c02.c                    expected 21, 20                                   got model answer                                       OK
067:c02.cii                  expected 1681, 840, 841, 29                       got model answer                                       OK
068:c03.a                    expected a                                        got a                                                  OK
068:c03.b                    expected 3                                        got 3                                                  OK
068:c03.c                    expected Bala zeros                               got assert                                             OK
068:c03.cii                  expected Chitra                                   got assert                                             OK
068:c03.cii                  expected 10, 24                                   got model answer                                       OK
069:c04                      expected zeros                                    got assert                                             OK
069:c04.a                    expected b                                        got b                                                  OK
069:c04.b                    expected 4                                        got 4                                                  OK
069:c04.c                    expected 9, 9000                                  got model answer                                       OK
069:c04.cii                  expected 4, 10                                    got model answer                                       OK
070:c05                      expected rows 1, 2 correct                        got assert                                             OK
070:c05.a                    expected row 3 wrong                              got assert                                             OK
070:c05.a                    expected c                                        got c                                                  OK
070:c05.b                    expected -4                                       got -4                                                 OK
070:c05.cii                  expected doubled                                  got assert                                             OK
070:c05.cii                  expected 6, -16                                   got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch03 (129 checks)</summary>

```
001:m01                      expected b                                        got b                                                  OK
002:m02                      expected 7                                        got c (hits c)                                         OK
003:m03                      expected 2,3                                      got assert                                             OK
003:m03                      expected a                                        got a                                                  OK
004:m04                      expected b                                        got b                                                  OK
005:m05                      expected "infinite"                               got c (hits c)                                         OK
006:m06                      expected "none"                                   got b (hits b)                                         OK
007:m07                      expected k = 3 only fails                         got assert                                             OK
007:m07                      expected b                                        got b                                                  OK
008:m08                      expected true                                     got a (hits a)                                         OK
009:m09                      expected c                                        got c                                                  OK
010:m10                      expected [2,3]                                    got a (hits a)                                         OK
011:m11                      expected [9,5]                                    got a (hits a)                                         OK
012:m12                      expected true                                     got a (hits a)                                         OK
012:m12                      expected 19, 38                                   got solution                                           OK
012:m12                      expected x = 2                                    got assert                                             OK
013:m13                      expected [13,7]                                   got a (hits a)                                         OK
014:m14                      expected [8,13]                                   got a (hits a)                                         OK
014:m14                      expected conditions                               got assert                                             OK
015:m15                      expected 10                                       got a (hits a)                                         OK
016:m16                      expected b                                        got b                                                  OK
017:m17                      expected 2                                        got a (hits a)                                         OK
018:m18                      expected [1,2]                                    got a (hits a)                                         OK
019:ar1                      expected none                                     got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected infinite                                 got assert                                             OK
020:ar2                      expected d                                        got d                                                  OK
021:ar3                      expected solution                                 got assert                                             OK
021:ar3                      expected b                                        got b                                                  OK
022:ar4                      expected unique (4, 2)                            got assert                                             OK
022:ar4                      expected c                                        got c                                                  OK
023:ar5                      expected 0 = 9                                    got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected 8, 4                                     got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected t                                        got t                                                  OK
026:tf2                      expected t                                        got t                                                  OK
027:tf3                      expected f                                        got f                                                  OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected none                                     got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected not equal to                             got not equal to|≠|unequal to|different from           OK
031:fb2                      expected coincident                               got assert                                             OK
031:fb2                      expected infinitely many                          got infinitely many|infinite|infinitely                OK
032:fb3                      expected 3                                        got 3                                                  OK
033:fb4                      expected 6                                        got 6                                                  OK
034:fb5                      expected 2                                        got 2                                                  OK
035:n01                      expected 3                                        got 3                                                  OK
036:n02                      expected 4                                        got 4                                                  OK
037:n03                      expected 4                                        got 4                                                  OK
038:n04                      expected 50                                       got 50                                                 OK
038:n04                      expected 10, 540, 350                             got solution                                           OK
039:n05                      expected 18                                       got 18                                                 OK
039:n05                      expected 12                                       got solution                                           OK
040:n06                      expected 38                                       got 38                                                 OK
040:n06                      expected reversal                                 got assert                                             OK
041:n07                      expected 15000                                    got 15000                                              OK
041:n07                      expected interest                                 got assert                                             OK
042:n08                      expected apex                                     got assert                                             OK
042:n08                      expected 3                                        got 3                                                  OK
043:n09                      expected 5                                        got 5                                                  OK
044:s201                     expected unique (6, 0)                            got assert                                             OK
044:s201                     expected consistent                               got model answer                                       OK
044:s201                     expected 6, 0                                     got solution                                           OK
045:s202                     expected sol                                      got assert                                             OK
045:s202                     expected 2, 3, 14                                 got model answer                                       OK
046:s203                     expected sol                                      got assert                                             OK
046:s203                     expected 33, 8, 25, 5, -2                         got model answer                                       OK
047:s204                     expected k = 2                                    got assert                                             OK
047:s204                     expected 2                                        got model answer                                       OK
048:s205                     expected (1, 4)                                   got assert                                             OK
048:s205                     expected (1, 4)                                   got model answer                                       OK
049:s206                     expected sol                                      got assert                                             OK
049:s206                     expected 12, 4                                    got model answer                                       OK
050:s207                     expected correct and wrong                        got assert                                             OK
050:s207                     expected -11, -1, 3                               got model answer                                       OK
051:s208                     expected none                                     got assert                                             OK
051:s208                     expected parallel                                 got model answer                                       OK
052:s209                     expected 12, 13                                   got model answer                                       OK
053:s301                     expected sol                                      got assert                                             OK
053:s301                     expected 36, 14, 136, 8, 6                        got model answer                                       OK
054:s302                     expected sol                                      got assert                                             OK
054:s302                     expected 76, -18, 58, 2, -3                       got model answer                                       OK
055:s303                     expected coincident                               got assert                                             OK
055:s303                     expected 5, 1                                     got model answer                                       OK
056:s304                     expected 15, 5, 9000                              got model answer                                       OK
057:s305                     expected angles                                   got assert                                             OK
057:s305                     expected 35, 25, 50^\circ, 80^\circ               got model answer                                       OK
058:s306                     expected 38, 13, 50, 30                           got model answer                                       OK
059:s307                     expected classes                                  got assert                                             OK
059:s307                     expected (5, -3)                                  got model answer                                       OK
060:l01                      expected intersection                             got assert                                             OK
060:l01                      expected 3, 2, 8, -1, 13.5                        got model answer                                       OK
061:l02                      expected sol                                      got assert                                             OK
061:l02                      expected 30, 4, 34, 2, -1, 17                     got model answer                                       OK
062:l03                      expected 500, 200, 245000, 7, 1400                got model answer                                       OK
063:l04                      expected k = 6, never infinite                    got assert                                             OK
063:l04                      expected -1.5,5.5                                 got assert                                             OK
063:l04                      expected 6, -1.5, 5.5                             got model answer                                       OK
064:l05                      expected her answer                               got assert                                             OK
064:l05                      expected 114, 18, 12, 36                          got model answer                                       OK
065:l06                      expected parts                                    got assert                                             OK
065:l06                      expected x + y = 4, x - y = 2, (3, 1), x + y = 6, got model answer                                       OK
066:c01.a                    expected a                                        got a                                                  OK
066:c01.b                    expected 90                                       got 90                                                 OK
066:c01.c                    expected 60, 30, 30                               got model answer                                       OK
066:c01.cii                  expected 390                                      got model answer                                       OK
067:c02                      expected crossing                                 got assert                                             OK
067:c02.a                    expected c                                        got c                                                  OK
067:c02.b                    expected 4                                        got 4                                                  OK
067:c02.c                    expected 140, 170, 30                             got model answer                                       OK
067:c02.cii                  expected parallel                                 got assert                                             OK
067:c02.cii                  expected parallel                                 got model answer                                       OK
068:c03                      expected infinite,none,unique                     got assert                                             OK
068:c03.a                    expected "R"                                      got c (hits c)                                         OK
068:c03.b                    expected infinitely many                          got infinitely many|infinite|infinitely                OK
068:c03.c                    expected R                                        got assert                                             OK
068:c03.cii                  expected changed Q                                got assert                                             OK
068:c03.c                    expected 1                                        got model answer                                       OK
069:c04                      expected ages                                     got assert                                             OK
069:c04.a                    expected b                                        got b                                                  OK
069:c04.b                    expected 12                                       got 12                                                 OK
069:c04.c                    expected 2, 70, 14                                got model answer                                       OK
069:c04.cii                  expected 10                                       got model answer                                       OK
070:c05                      expected sol                                      got assert                                             OK
070:c05.a                    expected a                                        got a                                                  OK
070:c05.b                    expected 3                                        got 3                                                  OK
070:c05.c                    expected (2, 3)                                   got model answer                                       OK
070:c05.cii                  expected 60, 12, 16, 48                           got model answer                                       OK
```
</details>

<details><summary>Numeric re-solve output, ch04 (144 checks)</summary>

```
001:m01                      expected (c) simplifies to −3x² + x − 1           got assert                                             OK
001:m01                      expected c                                        got c                                                  OK
002:m02                      expected true                                     got a (hits a)                                         OK
003:m03                      expected 3                                        got a (hits a)                                         OK
003:m03                      expected root 2                                   got assert                                             OK
004:m04                      expected [-2,7]                                   got a (hits a)                                         OK
005:m05                      expected [-1.333333333,2]                         got a (hits a)                                         OK
006:m06                      expected [0,9]                                    got b (hits b)                                         OK
007:m07                      expected [0.267949192,3.732050808]                got a (hits a)                                         OK
008:m08                      expected true                                     got a (hits a)                                         OK
009:m09                      expected -8                                       got a (hits a)                                         OK
010:m10                      expected "equal"                                  got b (hits b)                                         OK
011:m11                      expected "none"                                   got c (hits c)                                         OK
012:m12                      expected [-10,10]                                 got b (hits b)                                         OK
013:m13                      expected true,true,true,true,false,false          got assert                                             OK
013:m13                      expected a                                        got a                                                  OK
014:m14                      expected opposite signs ⇒ distinct                got assert                                             OK
014:m14                      expected a                                        got a                                                  OK
015:m15                      expected [11,12]                                  got a (hits a)                                         OK
016:m16                      expected 6                                        got a (hits a)                                         OK
017:m17                      expected [0.333333333,3]                          got a (hits a)                                         OK
018:m18                      expected [0.633974596,2.366025404]                got a (hits a)                                         OK
019:ar1                      expected none                                     got assert                                             OK
019:ar1                      expected a                                        got a                                                  OK
020:ar2                      expected root                                     got assert                                             OK
020:ar2                      expected b                                        got b                                                  OK
021:ar3                      expected x² + 7 = 0 none                          got assert                                             OK
021:ar3                      expected c                                        got c                                                  OK
022:ar4                      expected equal                                    got assert                                             OK
022:ar4                      expected d                                        got d                                                  OK
023:ar5                      expected roots                                    got assert                                             OK
023:ar5                      expected a                                        got a                                                  OK
024:ar6                      expected roots                                    got assert                                             OK
024:ar6                      expected d                                        got d                                                  OK
025:tf1                      expected linear                                   got assert                                             OK
025:tf1                      expected f                                        got f                                                  OK
026:tf2                      expected f                                        got f                                                  OK
027:tf3                      expected example                                  got assert                                             OK
027:tf3                      expected t                                        got t                                                  OK
028:tf4                      expected none                                     got assert                                             OK
028:tf4                      expected f                                        got f                                                  OK
029:tf5                      expected example                                  got assert                                             OK
029:tf5                      expected t                                        got t                                                  OK
030:fb1                      expected b^2 - 4ac                                got b^2 - 4ac|b² − 4ac|b²-4ac|b^2-4ac|b² - 4ac|b*b - 4 OK
031:fb2                      expected -4                                       got -4|−4                                              OK
032:fb3                      expected no                                       got no|zero|0                                          OK
033:fb4                      expected 1                                        got 1                                                  OK
033:fb4                      expected roots                                    got assert                                             OK
034:fb5                      expected 9                                        got 9                                                  OK
035:n01                      expected 2.5                                      got 2.5                                                OK
036:n02                      expected 4.414214                                 got 4.41                                               OK
037:n03                      expected 8                                        got 8                                                  OK
037:n03                      expected equal                                    got assert                                             OK
038:n04                      expected 0                                        got 0                                                  OK
039:n05                      expected 11                                       got 11                                                 OK
039:n05                      expected odd and sum                              got assert                                             OK
040:n06                      expected 80                                       got 80                                                 OK
040:n06                      expected story                                    got assert                                             OK
041:n07                      expected 8                                        got 8                                                  OK
041:n07                      expected story                                    got assert                                             OK
042:n08                      expected 9                                        got 9                                                  OK
042:n08                      expected story                                    got assert                                             OK
043:n09                      expected 24                                       got 24                                                 OK
043:n09                      expected story                                    got assert                                             OK
044:s201                     expected standard form                            got assert                                             OK
044:s201                     expected x^2 - 6x + 8 = 0                         got model answer                                       OK
045:s202                     expected equal 5/3                                got assert                                             OK
045:s202                     expected \dfrac53                                 got model answer                                       OK
046:s203                     expected roots                                    got assert                                             OK
046:s203                     expected 4, \dfrac14                              got model answer                                       OK
047:s204                     expected roots                                    got assert                                             OK
047:s204                     expected 12, -1 \pm \sqrt3                        got model answer                                       OK
048:s205                     expected equal √6/3                               got assert                                             OK
048:s205                     expected 24, \dfrac{\sqrt6}{3}                    got model answer                                       OK
049:s206                     expected ±6                                       got assert                                             OK
049:s206                     expected 36, 6                                    got model answer                                       OK
050:s207                     expected none                                     got assert                                             OK
050:s207                     expected -16, 8                                   got model answer                                       OK
051:s208                     expected story                                    got assert                                             OK
051:s208                     expected 96, 8, 12                                got model answer                                       OK
052:s209                     expected k and roots                              got assert                                             OK
052:s209                     expected 2, -\dfrac12                             got model answer                                       OK
053:s301                     expected roots                                    got assert                                             OK
053:s301                     expected 33, \sqrt{33}                            got model answer                                       OK
053:s301                     expected 1.19, 1.69                               got solution                                           OK
054:s302                     expected k = 4                                    got assert                                             OK
054:s302                     expected 4, -1                                    got model answer                                       OK
055:s303                     expected parts                                    got assert                                             OK
055:s303                     expected 20, 15, -55                              got model answer                                       OK
055:s303                     expected 306.25                                   got solution                                           OK
056:s304                     expected story                                    got assert                                             OK
056:s304                     expected 7, 33, 2116, -39                         got model answer                                       OK
057:s305                     expected story                                    got assert                                             OK
057:s305                     expected 10, 15                                   got model answer                                       OK
058:s306                     expected roots                                    got assert                                             OK
058:s306                     expected 66, 3, -4                                got model answer                                       OK
059:s307                     expected cases                                    got assert                                             OK
059:s307                     expected 4, \dfrac12                              got model answer                                       OK
060:l01                      expected story                                    got assert                                             OK
060:l01                      expected 5625, 9, 12, 3, 4, -\dfrac{12}{7}        got model answer                                       OK
061:l02                      expected relations                                got assert                                             OK
061:l02                      expected 37, \sqrt{37}, \dfrac53, -\dfrac13       got model answer                                       OK
061:l02                      expected 1.85, 0.18                               got solution                                           OK
062:l03                      expected story                                    got assert                                             OK
062:l03                      expected 1936, 8, 20, 12000, 108, -\dfrac{20}{3}  got model answer                                       OK
063:l04                      expected identity 1,7,3                           got assert                                             OK
063:l04                      expected identity -2,5,0.5                        got assert                                             OK
063:l04                      expected identity 3,3,0                           got assert                                             OK
063:l04                      expected identity 0,-4,2                          got assert                                             OK
063:l04                      expected roots                                    got assert                                             OK
063:l04                      expected 72, 4 \pm 3\sqrt2                        got model answer                                       OK
064:l05                      expected designs                                  got assert                                             OK
064:l05                      expected 10, 15, 30, 20, 25                       got model answer                                       OK
065:l06                      expected story                                    got assert                                             OK
065:l06                      expected 32400, 40, -140, 16, 24                  got model answer                                       OK
066:c01                      expected 0,40                                     got assert                                             OK
066:c01.a                    expected c                                        got c                                                  OK
066:c01.b                    expected 40                                       got 40                                                 OK
066:c01.c                    expected 10, 30                                   got model answer                                       OK
066:c01.cii                  expected max 20                                   got assert                                             OK
066:c01.cii                  expected -80, 20                                  got model answer                                       OK
067:c02                      expected story                                    got assert                                             OK
067:c02.a                    expected b                                        got b                                                  OK
067:c02.b                    expected 3                                        got 3                                                  OK
067:c02.c                    expected 15, 9                                    got model answer                                       OK
067:c02.cii                  expected 3, -7                                    got model answer                                       OK
068:c03                      expected equal,distinct,none                      got assert                                             OK
068:c03.a                    expected "P"                                      got a (hits a)                                         OK
068:c03.b                    expected 25                                       got 25                                                 OK
068:c03.c                    expected Q roots                                  got assert                                             OK
068:c03.cii                  expected k = 1/4                                  got assert                                             OK
068:c03.cii                  expected \dfrac14                                 got model answer                                       OK
069:c04                      expected equal 15                                 got assert                                             OK
069:c04.a                    expected d                                        got d                                                  OK
069:c04.b                    expected equal                                    got equal|two equal|real and equal|equal real          OK
069:c04.c                    expected 15, 30                                   got model answer                                       OK
069:c04.cii                  expected D                                        got assert                                             OK
069:c04.cii                  expected -100, 450                                got model answer                                       OK
070:c05                      expected diver                                    got assert                                             OK
070:c05.a                    expected a                                        got a                                                  OK
070:c05.b                    expected 2                                        got 2                                                  OK
070:c05.c                    expected 1                                        got model answer                                       OK
070:c05.cii                  expected D                                        got assert                                             OK
070:c05.cii                  expected -15, 11.25                               got model answer                                       OK
```
</details>
