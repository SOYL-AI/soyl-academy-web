# CBSE Class 10 Science, Chapter 8 — Heredity

`cbse-10-science-ch08` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (21 + 16 slides), notes (7 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch08_short` (20 marks, 40 min) and `t_cbse10sci_ch08_long` (40 marks, 90 min), laid out as the default blueprints `cbse-10-default-chapter-test-short` / `-long`. No shared questions. |
| `src/` | `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs` (includes an independent Punnett-square engine used by the re-solve checks), `build.mjs`; shared library `../cbse-10-science-ch06/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-10-science-ch08/src/build.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04). Evolution is not in this chapter in the 2026-27 syllabus (it is assessed only formatively elsewhere), so "selection" appears only as the environment favouring existing variations (heat-tolerant bacteria, pesticide-tolerant insects) — no speciation, fossils or human evolution.
- Mendel: monohybrid (3 : 1, 1 : 2 : 1) and dihybrid (9 : 3 : 3 : 1) crosses with Punnett squares; dominant/recessive; genotype/phenotype (syllabus LO). A cross with a short plant is used to reveal a tall plant's genotype, described in words (the term "test cross" is not required).
- How traits are expressed: gene → enzyme → growth hormone → height (the syllabus example); chromosomes in pairs, one of each pair per germ cell.
- Sex determination: XX/XY with 22 autosome pairs; temperature in some reptiles and sex change in snails as non-genetic strategies.
- Earlobes are used only as an example of an inherited variation; no dominance claim is made about them (human earlobe inheritance is not a simple one-gene trait). Mendel's own published counts are not reused.

## Shape
- **Part 1 (t01–t02), 21 slides:** variation across generations (SVG tree); not all variations equal; earlobes (SVG); equal contribution of parents; Mendel's seven characters; monohybrid cross; Punnett square; dominant/recessive, genotype/phenotype; worked example (1240 plants → 930 : 310, 310 : 620 : 310); dihybrid cross; 16-box Punnett square; worked example (1600 → 900 : 300 : 300 : 100); independent inheritance; worked example (52 tall : 48 short → Tt); summary; exam tips.
- **Part 2 (t03–t04), 16 slides:** genes make proteins; gene → enzyme → hormone → height; worked example (why Tt is tall); chromosome pairs into germ cells (SVG); chromosomes explain Mendel; strategies of sex determination; XX/XY (SVG); X/Y Punnett square; worked example (fourth child after three daughters); myths and facts; summary; exam tips.
- **Visuals (31 of 37 slides; no gap longer than one slide):** table 21 (Punnett squares, ratios, comparisons), flow 6, svg 4. This chapter is naturally table-heavy: Punnett squares are tables.
- **Diagrams (4 hand-written SVGs):** accumulation of variation over three generations, free vs attached earlobes, chromosome pairs sorting into four kinds of germ cell, XX and XY sex chromosomes. Rasterised and eye-checked; two label fixes (the variation key overlapped the first node; earlobe labels were clipped at the edges).
- **Narration:** 13–68 words (mean 53); gene symbols are spoken as "capital T, small t", and generations as "first/second generation" (no "F1", no "XX").

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 9 | 1 (keys a d c a b b a c d: a 3, b 2, c 2, d 2) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1 (840 → 210 short; 960 → 480 Tt; 1120 → 70 yyrr; sperm 23; egg autosomes 22) |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** `passage_origin: "soyl-original"` on every passage; `word_limit` on 12 of 16 short/long items (left off cross/Punnett answers).
- **Difficulty:** d1 11 · d2 25 · d3 22 · d4 10 · d5 1 (plus a d5 case alternative).
- **Competency:** recall 11 · understanding 26 · application 18 · analysis 12 · evaluation 2. Application or higher is **46% of items (53% of marks)**.
- **Topic tags:** t01 8 · t02 34 · t03 11 · t04 18 (t02 is the heart of the chapter and of board questions).
- **Cases:** violet × white flowers through two generations (data, ratio 618/202 ≈ 3.1); yellow-round × green-wrinkled dihybrid with 992 seeds (data — the expected 1/16 is exactly 62); a dwarf pea rescued by hormone spray whose seeds stay dwarf (lab, evaluation alternative); olive ridley hatchery temperatures (data, climate evaluation); a family with three daughters (everyday, myth evaluation); a seed company testing three tall plants with short plants (data, d5 probability evaluation).
- **Deck checks:** q001, q025, q023 (Part 1); q040, q057, q053 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short:** A q010, q039, q048 (MCQ), q022 (A-R) · B q033, q060 (2 marks), q034 (3 marks) · C q036 or q063 · D q068.
- **Long:** A q002, q011, q013, q014, q017, q018, q049, q051 (MCQ), q021, q058 (A-R) · B q006, q045, (q032 or q061), q035, (q046 or q062) · C q037 + (q047 or q008) · D q064, q065.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars` (stricter M2 lint): **0 errors, 0 warnings**.
- Author validator: 63 maths strings (KaTeX strict) parse; 8 SVG visuals / 4 distinct diagrams pass the allow-list; narration clean; **22/22 scripted re-solves** — every ratio, count and germ-cell claim is recomputed by a small independent Punnett engine (`gametes`, `cross`) from the genotypes in the stem, not from the written answer (e.g. dihybrid 360/120/120/40 for 640 seeds, 600 tall of 800, Vv × vv = 1 : 1, (1/2)⁵¹ for the seed-company evaluation).

## Verifier pass (2026-10-27)
Every item, case part and alternative was re-solved from its stem; no key was wrong. Fixes before release:
1. A dihybrid case answer that is a calculation (colour and shape totals) had a prose word limit and tripped the word-count rule; the limit was removed, as for other cross/Punnett answers.
2. The four-part dihybrid long question was raised to d5.
3. A garbled solution string in the variation long question (an escaped "Step 3") was cleaned.
4. Planned AR keys and seeded MCQ placement kept both balanced (MCQ 6/6/6/6).

## Known gaps
- Narration audio is not generated (TTS stage).
- Breeding data in cases are realistic illustrative numbers chosen to sit near the expected ratios; turtle percentages are rounded illustrative values consistent with temperature-dependent sex determination in sea turtles.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 4 item tag(s) and 1 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 11, understanding 30, application 14, analysis 12, evaluation 2 — application or higher 41% of items, 46% of marks (supersedes the competency figures above).
