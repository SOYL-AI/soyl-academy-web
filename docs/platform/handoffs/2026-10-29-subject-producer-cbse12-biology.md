# subject-producer — CBSE Class 12 Biology — 2026-10-29 / 30

Status: partial — ch01–ch07 committed and gated; ch08 onward in progress (this note is updated after each chapter)
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

Each chapter folder has `release.json`, `tests.json` (`t_cbse12bio_chNN_short` / `_long` on blueprints `cbse-12-default-chapter-test-short` / `-long`, disjoint), `README.md` (scope, shape, bank statistics, verifier pass, facts to double-check) and `src/` (deterministic builders). All items are `status: "draft"`, provenance `human`.

- **Authoring library:** `biology/cbse-12-biology-ch01/src/lib.mjs`, copied from `science/cbse-10-science-ch06/src/lib.mjs` and adapted (unit/question/test id prefixes, cbse-12 blueprints, family `biology`, stricter narration check for "2n"-style ploidy and MMC/PEN/PEC). ch02–ch04 import it from ch01 (same owner, same branch).
- **Computed content:** every chapter has a `src/calc.mjs` of rules; worked-example numbers, numerical keys and some diagrams are computed from it, and scripted re-solves check the keys (ch01 9, ch02 9, ch03 9, ch04 24 — ch04 has an independent Punnett engine for every square, ratio, probability, ABO and X-linked outcome).
- **Diagrams:** 27 hand-written, theme-coloured SVGs (flower parts, anther, pollen, ovule, embryo sac, double fertilisation, embryos; male and female systems, seminiferous tubule, sperm, ovary, hormone curves, blastocyst; IUD, sterilisation, amniocentesis, growth curve, fertile calendar; Punnett squares, sex determination, linkage, pedigree). Every SVG was rasterised with headless Chromium (theme tokens substituted) and checked by eye; layout fixes are listed in each README.

## How to verify
From `platform/` in the worktree (I ran each under `_tools/heavy.sh`):
```
npm test -w @soyl/content-templates            # Test Files 1 passed; Tests 722 passed (722)
npm run content -- lint --exemplars            # ok cbse-12-biology-ch01..ch04: 0 error(s), 0 warning(s); no errors anywhere
npm run content -- verify --board cbse --class 12 --subject biology --authored
                                               # 4 unit(s), 273 questions, 0 blocking flag(s); 0 minor flags per chapter
npm run content -- originality --authored      # 103 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # Test Files 1 passed; Tests 8 passed (8)
npx vitest run --root api test/content.test.ts    # Test Files 1 passed; Tests 13 passed (13)
```
Rebuild check: `npx tsx content/authored/biology/cbse-12-biology-chNN/src/build.mjs` for each chapter leaves `git status` clean (verified after each commit). `src/build.log` is gitignored.

## Quality notes
- **Class 12 standard:** ≥ 60 questions per chapter (63–72), 11 types in use (mcq, assertion-reason, true-false, fill-blank, match, numerical, short 2/3, long, case-based with either/or alternatives), step-mark schemes, word limits on every short/long item, difficulty 1–5, topic ids from the syllabus.
- **Competency (D-035):** application-or-higher share 46 % (ch01), 47 % (ch02), 46 % (ch03), 48 % (ch04) — all inside the 45–65 % band; each README says which items were re-pitched to get there.
- **Balanced keys:** MCQ keys spread a/b/c/d within one or two per letter; assertion-reason keys rewritten where too many were (a).
- **Reproductive content (ch02, ch03):** neutral, factual, age-appropriate; schematic diagrams labelled with syllabus terms only; explicit statements against blaming mothers for a baby's sex, against discrimination of people with HIV, and that infertility can lie with either partner.
- **Originality:** all text written fresh; official papers used for pattern only (D-036); no reconstructed source text anywhere.

## Known gaps / follow-ups
- **MTP week limits (ch03):** the textbook wording and the amended MTP Act differ, so the chapter states legalisation (1971), registered practitioners, "within the time limits of the law" and first-trimester safety, and no item depends on week limits. A reviewer may add the limits as a note.
- Facts flagged for reviewer double-checking are listed at the end of each README (e.g. pollen viability times, foetal milestones, population figures, colour-blindness frequencies).
- ch08–ch14 in progress (ch14 Environmental Issues is formative-only in the catalog).

## Decisions made
- New authored family folder `biology/` (the pipeline already has the family; no code or schema change).
- Shared library lives in ch01's `src/` and is imported by later chapters of this subject.

## Needs from owner
None.
