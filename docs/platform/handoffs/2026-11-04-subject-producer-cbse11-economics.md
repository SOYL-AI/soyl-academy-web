# subject-producer — CBSE Class 11 Economics, hand-authored chapters — 2026-11-04

**Status:** done. All 12 syllabus chapters (ch01–ch12) are committed, each after a fully green gate run.

**Branch:** `platform/subject-producer/cbse-11-economics`, worktree `C:/Users/Prabhu/soyl-wt/content-cbse11-economics`.
- The branch was fast-forwarded to `platform/main` 0f54d5b before work began. Not pushed by me.
- ch01–ch04 are already on main; the Lead integrated them in a wave.
- Still to merge: ch05–ch12 and this handoff.

**Writers (D-050):**
- **Sonnet 5.5** sub-agents wrote every chapter, at most two at a time. Opus (this agent) reviewed, fixed small problems, gated and committed.
- The Opus quality fallback was **not needed**.
- The first Sonnet writers for ch09 and ch10 hit a session limit before writing any files. Fresh Sonnet writers then wrote both chapters.

## Scope note (syllabus versus task message)
The task message mentioned "Statistics for Economics + Indian Economic Development" and dispersion. The syllabus file `catalog/cbse/11/economics/syllabus.yaml` is what the build follows:
- **Part A:** Statistics for Economics, ch01–ch07.
- **Part B:** Introductory Microeconomics, ch08–ch12.
- **Removed:** the file-level removed list deletes "Measures of dispersion; non-competitive markets".

So the chapters teach no Indian Economic Development and no dispersion. If the syllabus file is wrong, that is a curriculum-architect fix, and these chapters would need re-scoping.

## What changed
- **Chapter files:** `platform/content/authored/economics-commerce/cbse-11-economics-chNN/` holds `release.json`, `tests.json`, `README.md` and `src/{questions.mjs, build.mjs}`.
- **Shared lib** (committed with ch01, 82a7050): `cbse-11-economics-ch01/src/lib.mjs`, copied from the CBSE 11 Political Science lib, which is the CBSE 12 Economics/Pol Sci lib plus two additions:
  - the build-time exact-stem originality pre-check;
  - a semantic `verdict` for assertion-reason items, in CBSE option order.
- **Shared statistics helpers** (also committed with ch01): `cbse-11-economics-ch01/src/stats.mjs`. It holds:
  - central tendency: mean (direct, assumed, step-deviation, discrete, grouped); median and mode (individual and grouped);
  - correlation: Pearson; ranks with average ranks for ties (rank 1 = highest); Spearman with the (m³ − m)/12 correction;
  - index numbers: simple aggregative, price relatives, Laspeyres, Paasche, weighted relatives;
  - inflation; demand and supply elasticity; the expenditure-method verdict; marginal and average schedules;
  - `check()`, which pins a stated figure to its computed value.

  Its own self-checks run on import, against hand-verifiable data, so a broken helper fails every build.
- **Numbers:** every figure in every chapter is computed from imagined data with these helpers, interpolated into the text and pinned with `check()`. Many chapters also assert textbook relationships at build time:
  - Σ(x − x̄) = 0
  - the ogives cross at N/2
  - MP = AP at the maximum of AP
  - MC cuts AVC and AC at their minima
  - rising MRT along the PPF
  - the sign of each equilibrium shift

  No real official statistics (CPI, WPI, IIP values, GDP, census counts) are quoted.
- **Blueprints:** the subject's own blueprints are annual and half-yearly only, so the chapter tests use the class defaults `cbse-11-default-chapter-test-short` (20 marks, 40 min) and `-long` (40 marks, 90 min).
  - Tests use only mcq, AR, short, long and case-based items. They are disjoint and use no deck-check item.
  - `num` items appear in the bank and on deck checks only.
- **Item status:** all items are `status: "draft"`, provenance `human` (D-025/D-026).

| Chapter | Commit | Writer | Slides | Notes | Flashcards | Questions (num) | App+ |
|---|---|---|---|---|---|---|---|
| ch01 Introduction to Statistics (+ lib, stats) | 82a7050 | Sonnet 5.5 | 16 + 20 | 6 | 30 | 77 (3) | 58% |
| ch02 Collection of Data | 08163df | Sonnet 5.5 | 20 + 22 | 7 | 32 | 74 (4) | 53% |
| ch03 Organisation of Data | f1e05d7 | Sonnet 5.5 | 18 + 20 | 7 | 33 | 79 (11) | 58% |
| ch04 Presentation of Data | ec43c79 | Sonnet 5.5 | 20 + 19 | 7 | 30 | 77 (10) | 64% |
| ch05 Measures of Central Tendency | aef2a2e | Sonnet 5.5 | 20 + 21 | 7 | 32 | 77 (13) | 65% |
| ch06 Correlation | 061b26b | Sonnet 5.5 | 19 + 21 | 7 | 31 | 79 (14) | 62% |
| ch07 Introduction to Index Numbers | 7d36ff1 | Sonnet 5.5 | 20 + 22 | 7 | 31 | 79 (14) | 57% |
| ch08 Introduction to Microeconomics | 89e7e68 | Sonnet 5.5 | 19 + 22 | 7 | 32 | 79 (13) | 57% |
| ch09 Theory of Consumer Behaviour | 3fd2172 | Sonnet 5.5 (second writer) | 22 + 22 | 7 | 33 | 78 (13) | 56% |
| ch10 Production and Costs | 522fb87 | Sonnet 5.5 (second writer) | 21 + 22 | 7 | 31 | 79 (15) | 53% |
| ch11 The Theory of the Firm under Perfect Competition | 4c68d04 | Sonnet 5.5 | 21 + 22 | 7 | 30 | 78 (12) | 58% |
| ch12 Market Equilibrium | b116876 | Sonnet 5.5 | 20 + 22 | 7 | 32 | 80 (16) | 60% |

**Totals:** 12 chapters, 491 slides, 377 flashcards, 936 questions, of which 138 are numerical.
- Application-or-above is 53–65%, inside the lint band of 45–65%.
- ch04, ch05 and ch06 are above the brief's 60% because they are computation-heavy chapters.

## How to verify
From `platform/` in the worktree, run each command one at a time; run the heavy gates via `_tools/heavy.sh`.
```
npm test -w @soyl/content-templates
npm run content -- catalog                         # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars                # ok for all 12 cbse-11-economics chapters, 0/0
npm run content -- verify --board cbse --class 11 --subject economics --authored   # 12 units, 0 blocking
npm run content -- originality --authored          # 0 error(s)
npx vitest run --root db test/db6-split.test.ts    # 8/8
npx vitest run --root api test/content.test.ts     # 13/13
```
- **Rebuild:** run `npx tsx content/authored/economics-commerce/cbse-11-economics-chNN/src/build.mjs`; it prints `NO ERRORS`. The output is deterministic (byte-identical md5s across 3 builds).
- **Stats helpers:** importing `stats.mjs` runs its self-checks.

### Gate runs (each fully green, exit 0)
| Run | Started (IST) | Covered | Result → committed |
|---|---|---|---|
| g1 | 18:17 | ch01–02 | templates 3753, verify 2 units 151 q, originality 536 units 0 errors, db6 8/8, api 13/13 → ch01, ch02 |
| g2 | 18:33 | ch01–04 | templates 3767, verify 4 units 307 q, originality 538 units, db6 8/8, api 13/13 → ch03, ch04 |
| g3 | 18:57 | ch01–06 | templates 3781, verify 6 units 463 q, originality 540 units, db6 8/8, api 13/13 → ch05, ch06 |
| g4 | 19:31 | ch01–08 | templates 3795, verify 8 units 621 q, originality 542 units, db6 8/8, api 13/13 → ch07, ch08 |
| g5 | 19:50 | ch01–10 | templates 3809, verify 10 units 778 q, originality 544 units, db6 8/8, api 13/13 → ch09, ch10 |
| g6 | 20:21 | ch01–12 | templates 3823, catalog 0/0, lint 0/0, verify 12 units 936 q 0 blocking, originality 546 units 0 errors, db6 8/8, api 13/13 → ch11, ch12 |

## Review (Opus): fixes and checks
- **AR verdicts:** checked every one against its A and R statements; all correct.
- **stats.mjs self-checks:** while writing them I found a hand-arithmetic slip in my own Pearson check. Σxy is 34, not 32, so r = 0.9220. The code was right; the check was corrected.
- **ch04 axis breaks:** the histogram, adjusted-histogram and ogive charts start the x-axis at 40 or 300. I added an axis-break mark to each. Time-series and scatter axes not starting at zero are left as they are, and their captions say where the axes start.
- **Flagged facts checked:**
  - index-number compilers (Labour Bureau for CPI-IW and CPI-AL; the NSO under MoSPI for CPI rural/urban/combined and IIP; Office of the Economic Adviser for WPI);
  - the median position (N+1)/2 for individual and discrete series, N/2 for grouped series;
  - the Spearman tie correction;
  - Laspeyres and Paasche;
  - the elasticity sign convention;
  - the shut-down rule (price below minimum AVC) and the break-even rule (minimum AC).
- **Writing-process lines:** none found in student-facing text. The remaining "neutral" hits are exam tips to students or `checks` build metadata.
- **Maps:** no maps. Every SVG is a chart or diagram drawn from computed data.

## Facts for a reviewer (each chapter README has the full numbered list)
- ch02:
  - The Census of India is decennial, run by the Office of the Registrar General and Census Commissioner; the first synchronous census was in 1881.
  - NSSO was set up in 1950. As of 2024 it is part of the National Statistics Office (MoSPI) after the 2019 merger.
  - No current census timing is given.
- ch07: no index values or base years are quoted, and the compilers are as above, as of 2024.
- ch09: where the percentage and expenditure methods disagree for large changes (a borderline case), no item applies both methods to the same data.
- ch11: when price equals MC exactly on a unit-step schedule, two outputs give equal profit. The chapter takes the larger output as the MR = MC output.

## Tests added
- No code tests were added.
- `stats.mjs` self-checks run on every build.
- Each chapter build runs: schema check, pipeline lint, deterministic verify, answer-leak scan, word and narration rules, the exact-stem originality pre-check, and its own build-time assertions on computed figures.
- Writers also ran `checks.mjs` (5-gram near-duplicate and SVG label checks): 0 flags and 0 issues on every chapter.

## Known gaps / follow-ups
- The scope question above: the syllabus file and the task message differ.
- The class-default blueprints are `source_status: unverified`.
- Only chapter tests were built; no half-yearly or annual papers.
- SVGs were checked by script. Only ch12's were also viewed in a browser, so a 360 px pass on staging is worthwhile, especially for the dense statistics charts in ch04, ch05 and ch06.
- Dated notes ("as of 2024") in ch02 and ch07 need an annual check.

## Decisions made
- D-050 followed.
- No new ADR. `stats.mjs` is local to the subject folder.

## Needs from owner
None. The syllabus-scope confirmation is for the Lead or curriculum-architect.
