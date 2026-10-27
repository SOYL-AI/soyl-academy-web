# subject-producer (CBSE 10 Science, batch D) — ch14 and ch15 (formative-only) hand-authored — 2026-10-27

Status: **done**. Two chapters are ready for review, both `status: "draft"`. They complete CBSE 10 Science: the exemplar ch01 plus authored ch02–ch15.

Branch: `platform/subject-producer/cbse-10-science-d` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-science-d`), from `origin/platform/main` at 035356e.

## What changed

| Path | What |
|---|---|
| `platform/content/authored/science/cbse-10-science-ch14/` | Periodic Classification of Elements: release.json, tests.json, README.md, src/ (build scripts) |
| `platform/content/authored/science/cbse-10-science-ch15/` | Evolution: release.json, tests.json, README.md, src/ (build scripts) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-science-d.md` | This note |

Both chapters reuse the shared authoring library `content/authored/science/cbse-10-science-ch06/src/lib.mjs` without changing it. I changed no files outside my owned paths.

Commits: b79a53c (ch14) and 3abc088 (ch15), plus the commit that adds this note.

## Counts

| | ch14 Periodic Classification | ch15 Evolution |
|---|---|---|
| Decks (slides) | 2 (19, 21) | 2 (19, 21) |
| Slides with a visual | 34 / 40 | 34 / 40 |
| Deck visuals by kind | table 25, svg 5, flow 3, plot 1 | table 21, svg 7, flow 6 |
| Distinct hand-written SVGs | 5 | 7 |
| Worked examples / checks | 6 / 6 | 6 / 6 |
| Narration words (min–max, mean) | 10–65, 49 | 10–67, 51 |
| Notes sections / flashcards | 7 / 31 | 7 / 32 |
| Questions | 64 | 64 |
| mcq · A-R · T/F · fill · match · num | 22 · 7 · 4 · 4 · 2 · 4 | 22 · 7 · 4 · 4 · 2 · 4 |
| short 2 / short 3 / long 5 / case 4 | 6 / 5 / 5 / 5 | 6 / 5 / 5 / 5 |
| Difficulty d1/d2/d3/d4 | 10/26/24/4 | 8/20/29/7 |
| Application or higher (items / marks) | 47% / 55% | 47% / 48% |
| MCQ keys a/b/c/d · A-R keys | 6/6/5/5 · d a b a c c d | 6/6/5/5 · a d b a c b d |
| Scripted re-solves | 30/30 | 9/9 |

Totals: **4 decks, 80 slides, 12 distinct SVG diagrams plus 1 plot, 63 flashcards, 128 questions** (8 numerical, 10 case-based) and 4 chapter tests.

- **Formative-only handling:** both chapters are `board_assessed: false` for the whole chapter. Each Part 1 title slide and the first notes section say the chapter is assessed through school-based assessment, not the board theory paper. `build.checks.assessment` records this too. The banks are smaller than for board chapters (64 against 69–90) and lean toward understanding, data, activities and practicals: element cards, Newlands’ rows of seven, litmus tests of oxides, a triad data project, a grasshopper survey, a museum skeleton visit, fossil layers, and a vegetable market. Application or higher is 47% of items, at the low end of the 45–65% lint band. The chapter tests follow the default blueprints so students can practise; they are not board papers.
- **Current science:** ch14 uses IUPAC groups 1–18 and states that 118 elements are known. In the layout diagram, astatine and the period 7 p-block elements are left unshaded as "little known" instead of being forced into a category. ch15 handles these misconceptions directly in slides, flashcards and items: "humans evolved from chimpanzees" (taught as a common ancestor; chimpanzees are our cousins), "animals change because they need to", inheritance of acquired traits, "evolution is progress", homology judged by function, and humans as more than one species.
- **Cases:** each has 3 parts (1 + 1 + 2), and part (c) is an either/or via `alternatives` (`c-ii`). Every passage has `passage_origin: "soyl-original"`.
- **D-032:** the written items keep their worked steps in `answer.model_answer_md`, with a short method note in `solution_md`. No `solution_md` repeats student-facing text, and the API DB-6 leak test passes.

## Validation (final runs, real output tails)

```
$ npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  449 passed (449)          (7 checks each for ch14 and ch15 included)

$ npm run content -- lint --exemplars
ok   cbse-10-science-ch14: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch15: 0 error(s), 0 warning(s)

$ npm run content -- verify --board cbse --class 10 --authored
ok   cbse-10-science-ch14 (authored): 64/64 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-science-ch15 (authored): 64/64 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 64 unit(s), 5131 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)

$ npm run content -- originality --authored
ok   cbse-10-science-ch14 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-science-ch15 (authored): 0 error(s), 0 warning(s)
originality --authored: 64 unit(s), 28 error(s) (report only; files unchanged)
   (all 28 are pre-existing Maths/SST bank.duplicate flags that other agents are fixing; none in science)

$ npx vitest run --root api test/content.test.ts
 Test Files  1 passed (1)
      Tests  13 passed (13)

$ npx vitest run --root db test/db6-split.test.ts
 Test Files  1 passed (1)
      Tests  8 passed (8)
```

The author validator in `lib.mjs` runs on every build. It checks KaTeX strict + mhchem (ch14 has 21 maths strings, ch15 has 17), the SVG allow-list (9 and 14 SVG visuals), narration (no symbols or abbreviations, at most 90 words), check slides pointing to objective items, and word limits. For both chapters it reports 0 errors and 0 warnings, and the pipeline stage-4 lint runs inside the build with the same result. I rasterised every SVG with resvg and checked it by eye. The layout fixes are listed in each README.

## Verifier pass (summary; details in each README)
1. **ch15 competency:** the first draft was at 38% application or above. I rewrote six items into genuinely new contexts instead of relabelling them: snails on volcanic ash, flood beetles and soot moths, squirrels split by a gorge, horse/monkey and housefly/crow, a newly found feathered fossil, and a DNA-difference table. The final figure is 47%.
2. **ch14 stale ordinal:** one solution said "the first set" after the seeded key placement had moved that set to option (c). It now names the set by its numbers.
3. **ch14 period table:** a "shells being filled" column was wrong from period 4 on. It now shows the outermost shell.
4. **ch15:** I corrected a wrong shared feature in a solution (all three animals have four limbs). I tightened two 5-mark model answers to fit 80–120 words. I removed a `\,` thin space from the maths, and I made the 66.7% numerical compute 200/3 with "=", which clears the stage-5 `numeric.final` minor flag.
5. **SVG layout:** about 10 label, clipping and overlap fixes after rasterising.

## Facts for a reviewer to confirm
- **ch14:** the dates (Döbereiner in the early 1800s, Newlands 1866, Mendeléev 1869 with 63 elements, eka-aluminium in 1871 and gallium in 1875 at 69.7 u against about 68 u, Moseley 1913). Newlands placing cobalt and nickel together in the column of F, Cl and Br follows the usual textbook account; the slide shows only rows H–O and F–S and the start Cl, K, Ca. The "typical" radii in pm: period 3 Na 186, Mg 160, Al 143, Si 117, P 110, S 104, Cl 99; group 1 Li 152, Na 186, K 231, Rb 244, Cs 262. The metalloid list B, Si, Ge, As, Sb, Te, Po.
- **ch15:** the mouse-tail experiment in the 1880s; Homo sapiens arising in Africa "a few hundred thousand years ago" and leaving Africa "tens of thousands of years ago"; the common ancestor with chimpanzees "several million years ago", with DNA "close to 99%" alike; carbon-14 half-life 5730 years and a useful range of "some tens of thousands of years"; dinosaur eggs in Gujarat and Madhya Pradesh; bougainvillea thorn and cucumber tendril as homologous stem modifications; the five wild-cabbage derivatives. All case data are illustrative.

## Known gaps / follow-ups
- Narration audio has not been generated (TTS stage).
- The contract has no release-level "formative-only" field, so the API serves these chapters like board chapters. Formative status is shown only in the content. A flag from `syllabus.yaml` (`board_assessed: false`) could be surfaced in the chapter hub. This is for web-platform or backend-api.
- ch14’s radius plot has no per-point labels; the plot contract has none for series. The values appear in the slide body and the alt text.
- The ch15 fossil-layer diagram is schematic ("deeper is older"); it does not show the order in which these groups first appeared, and its caption says "illustrative".
- `blueprint_id` is set to the default chapter-test blueprints, as for ch06–ch09.

## Decisions made
- Decks were split by topic: ch14 (t01–t02 | t03) and ch15 (t01–t02 | t03–t04).
- The SVG generators and the independent re-solve helpers are committed in `src/`, following the ch06–ch09 convention (rebuild with `npx tsx content/authored/science/<chapter>/src/build.mjs` from `platform/`). `build.log` is gitignored.

## Needs from owner
None.
