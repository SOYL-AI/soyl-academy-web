# subject-producer — CBSE Class 12 Biology — 2026-10-29 / 30

Status: done — ch01–ch13 (all board-assessed chapters) committed and gated. ch14 Environmental Issues (formative-only, `board_assessed: false`) was left out of scope by the Lead.
Branch: `platform/subject-producer/cbse-12-biology` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse12-biology`, based on `platform/main` 9f3ea8f). Not pushed, not merged.

## What changed
Hand-authored (D-025/D-026), original content under `platform/content/authored/biology/` — a new family folder (`biology` is a pipeline family in `content-pipeline/config/families.ts`; the content gate and lint discover it without any code change).

| Chapter | Commit | Decks (slides) | Questions | Flashcards | Notes | Tests | SVG diagrams |
|---|---|---|---|---|---|---|---|
| ch01 Sexual Reproduction in Flowering Plants | 0eb6569 | 3 (19 + 17 + 20) | 69 | 33 | 8 sections | short + long | 8 |
| ch02 Human Reproduction | 2032ff3 | 3 (17 + 19 + 18) | 72 | 32 | 7 sections | short + long | 8 |
| ch03 Reproductive Health | fcd7ecb | 3 (15 + 20 + 15) | 63 | 32 | 6 sections | short + long | 5 |
| ch04 Principles of Inheritance and Variation | 337db94 | 3 (18 + 18 + 15) | 69 | 32 | 7 sections | short + long | 6 |
| ch05 Molecular Basis of Inheritance | 9d0405c | 3 (18 + 18 + 17) | 67 | 32 | 7 sections | short + long | 7 |
| ch06 Evolution | 496f0ca | 3 (17 + 18 + 14) | 62 | 30 | 5 sections | short + long | 5 |
| ch07 Human Health and Disease | e370626 | 3 (14 + 16 + 17) | 71 | 32 | 6 sections | short + long | 3 |
| ch08 Microbes in Human Welfare | ca75658 | 3 (13 + 14 + 12) | 61 | 32 | 5 sections | short + long | 3 |
| ch09 Biotechnology: Principles and Processes | ba24753 | 2 (18 + 15) | 64 | 30 | 4 sections | short + long | 5 |
| ch10 Biotechnology and its Applications | ff620b9 | 3 (13 + 14 + 12) | 68 | 32 | 4 sections | short + long | 3 |
| ch11 Organisms and Populations | fd3f1cb | 3 (12 + 12 + 13) | 67 | 35 | 3 sections | short + long | 3 |
| ch12 Ecosystem | 8420b47 | 3 (13 + 12 + 13) | 66 | 33 | 5 sections | short + long | 3 |
| ch13 Biodiversity and Conservation | 4690d27 | 3 (14 + 13 + 14) | 65 | 35 | 4 sections | short + long | 3 |

Each chapter folder has `release.json`, `tests.json` (`t_cbse12bio_chNN_short` / `_long` on blueprints `cbse-12-default-chapter-test-short` / `-long`, disjoint), `README.md` (scope, shape, bank statistics, verifier pass, facts to double-check) and `src/` (deterministic builders). All items are `status: "draft"`, provenance `human`.

- **Authoring library:** `biology/cbse-12-biology-ch01/src/lib.mjs`, copied from `science/cbse-10-science-ch06/src/lib.mjs` and adapted (unit/question/test id prefixes, cbse-12 blueprints, family `biology`, stricter narration check for "2n"-style ploidy and MMC/PEN/PEC). ch02 onward import it from ch01 (same owner, same branch). From ch06, `build.mjs` honours `CH_OUT=<dir>` so a trial build can be written outside the tree while gates run.
- **Computed content:** every chapter has a `src/calc.mjs` of rules; worked-example numbers, numerical keys and some diagrams are computed from it, and scripted re-solves check the keys (ch01 9, ch02 9, ch03 9, ch04 24, ch05 20, ch06 11, ch07 8, ch08 7, ch09 13, ch10 7, ch11 14, ch12 14, ch13 11 — ch04 has an independent Punnett engine for every square, ratio, probability, ABO and X-linked outcome).
- **Diagrams:** 62 hand-written, theme-coloured SVGs across ch01–ch13 (for example flower parts, embryo sac, double fertilisation; reproductive systems, hormone curves; Punnett squares, pedigree; DNA ladder, replication fork, lac operon; Miller’s apparatus, homologous limbs; Plasmodium life cycle; sewage treatment plant; EcoRI sticky ends, gel, pBR322, PCR, bioreactor; Bt toxin, insulin chains, RNAi; growth curves computed from the equations, age pyramids; energy flow by the 10 percent law, ecological pyramids, forest strata; species–area lines, bird species by latitude). Every SVG was rasterised with headless Chromium (theme tokens substituted) and checked by eye; layout fixes are listed in each README.

## How to verify
From `platform/` in the worktree (I ran each under `_tools/heavy.sh`):
```
npm test -w @soyl/content-templates            # Test Files 1 passed; Tests 785 passed (785)
npm run content -- lint --exemplars            # ok cbse-12-biology-ch01..ch13: 0 error(s), 0 warning(s); no errors anywhere
npm run content -- verify --board cbse --class 12 --subject biology --authored
                                               # 13 unit(s), 864 questions, 0 blocking flag(s); 0 minor flags per chapter
npm run content -- originality --authored      # 112 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # Test Files 1 passed; Tests 8 passed (8)
npx vitest run --root api test/content.test.ts    # Test Files 1 passed; Tests 13 passed (13)
```
Latest full run: 2026-10-30 09:30–09:32 IST, with ch01–ch13 in the tree (ch13 was committed after it; ch12 after a green run at 02:28–02:30 IST). Each earlier chapter was committed only after a full green run that included it.

Rebuild check: `npx tsx content/authored/biology/cbse-12-biology-chNN/src/build.mjs` for each chapter leaves `git status` clean (verified after each commit). `src/build.log` is gitignored.

## Quality notes
- **Class 12 standard:** ≥ 60 questions per chapter (63–72), 11 types in use (mcq, assertion-reason, true-false, fill-blank, match, numerical, short 2/3, long, case-based with either/or alternatives), step-mark schemes, word limits on every short/long item, difficulty 1–5, topic ids from the syllabus.
- **Competency (D-035):** application-or-higher share 46 % (ch01), 47 % (ch02), 46 % (ch03), 48 % (ch04), 46 % (ch05), 55 % (ch06), 46 % (ch07), 54 % (ch08), 47 % (ch09), 47 % (ch10), 46 % (ch11), 48 % (ch12), 49 % (ch13) — all inside the 45–65 % band; each README says which items were re-pitched to get there.
- **Balanced keys:** MCQ keys spread a/b/c/d within one or two per letter; assertion-reason keys rewritten where too many were (a).
- **Reproductive content (ch02, ch03):** neutral, factual, age-appropriate; schematic diagrams labelled with syllabus terms only; explicit statements against blaming mothers for a baby's sex, against discrimination of people with HIV, and that infertility can lie with either partner.
- **Originality:** all text written fresh; official papers used for pattern only (D-036); no reconstructed source text anywhere.

## Known gaps / follow-ups
- **MTP week limits (ch03):** the textbook wording and the amended MTP Act differ, so the chapter states legalisation (1971), registered practitioners, "within the time limits of the law" and first-trimester safety, and no item depends on week limits. A reviewer may add the limits as a note.
- Facts flagged for reviewer double-checking are listed at the end of each README (e.g. pollen viability times, foetal milestones, population figures, colour-blindness frequencies).
- ch14 Environmental Issues is formative-only in the catalog (`board_assessed: false`) and was not authored; the Lead scoped the subject as ch01–ch13.
- ch12 and ch13 follow the rationalised textbook: succession, nutrient cycles and ecosystem services are not taught or tested; counts of protected areas (textbook 14 / 90 / 448) are dated and not tested.
- ch11 follows the rationalised textbook: the "organism and its environment" section is not in the syllabus, so it is not taught or tested.

## Decisions made
- New authored family folder `biology/` (the pipeline already has the family; no code or schema change).
- Shared library lives in ch01's `src/` and is imported by later chapters of this subject.

## Needs from owner
None.
