# ISC Class 12 Biology, Chapter 16 — Organisms and Populations

`isc-12-biology-ch16` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch16_short` (20 marks, 50 min) and `t_isc12bio_ch16_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch16/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: **population attributes** (density and its measurement, natality, mortality, immigration, emigration, sex ratio, age pyramids, carrying capacity); **exponential and logistic growth** with equations and graphs; **life history variation** and reproductive fitness; **mutualism and competition** (interference, competitive release, **Gause’s principle**, resource partitioning); **predation** and anti-predator adaptations, **parasitism** (ecto-, endo-, brood), commensalism and amensalism.
- Birth and death rates, population sizes, densities, mark–recapture estimates, growth rates, doubling times, percentages and the competition model are computed by src/calc.mjs, not typed in.

## Shape
- **Decks:** Part 1, 16 slides: Populations; Population attributes; Measuring population density; Worked example 1: estimating density and size; What changes population density; Worked example 2: rates and change in numbers; Age pyramids; Sex ratio and carrying capacity; Quick check: density; Exponential and logistic growth; Phases of the logistic curve; Worked example 3: doubling time and logistic slowing; Quick check: logistic growth; Quick check: age pyramids; Summary; Exam tips. Part 2, 17 slides: Living together; Life history variation; Population interactions; Mutualism; Competition; Gause’s competitive exclusion principle; Worked example 1: reading the competition model; Resource partitioning; Quick check: Gause; Predation and anti-predator defences; Worked example 2: a keystone predator; Parasitism; Commensalism and amensalism; Quick check: brood parasites; Quick check: commensalism; Summary; Exam tips.
- **Visuals (25 of 33 slides):** flow 2, table 19, svg 4.
- **Diagrams (4 SVGs, 10 uses):** growth curves, age pyramids and the four processes changing density (copied from CBSE 12 ch11); new: a **Gause competition model** (Lotka–Volterra, computed) grown separately and together. Every SVG was rasterised and checked by eye.
- **Narration:** 9–50 words (mean 30).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 5 | 1 (ISC options; keys d a c a b) |
| fill-blank | 2 | 1 |
| numerical | 8 | 1 |
| short | 7 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 7 · d2 35 · d3 19 · d4 1.
- **Competency:** recall 6 · understanding 20 · application 31 · analysis 5. Application or higher is **58% of items (62% of marks)**, inside the 45–65 % band.
- **Re-solves:** 14 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A quadrat-mcq, jcurve-mcq, fig-mcq, cuscuta-mcq, logistic-ar · B attr-short, (phases-short or mutualism-short) · C pyramid-short, (growth-short or parasite-short) · D interactions-long.
- **Long:** A density-mcq, natality-mcq, immig-mcq, rvalue-mcq, k-mcq, salmon-mcq, connell-mcq, tortoise-mcq, commensal-mcq, pisaster-mcq, brood-ar, k-ar · B lifehistory-short, predation-short, (commensal-short or gause-short) · C density-short, competition-short, defence-short, (rates-short or release-short) · D pop-long, (growth-long or parasite-long).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 25 maths strings parse; 10 SVG uses / 4 distinct diagrams pass the allow-list; narration clean; 14/14 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes and notes:
1. **Rates and models.** Every rate, population size, mark–recapture estimate, growth rate and the competition curves are computed in `calc.mjs`; worked-example numbers differ from the textbook’s.
2. **Assertion-reason keys.** Keys are spread across (a)–(d) with no “Assertion false, Reason true” item.
3. **Originality.** Every stem names its own organism, case, sample or scenario; an exact-stem check against all authored banks and `originality --authored` report no duplicates.

## Facts a reviewer should double-check
- The Gause model values (r, K, competition coefficients) are illustrative, not Gause’s data.
- The Pisaster species counts in Worked example 2 are illustrative (“more than 10 species lost”).
