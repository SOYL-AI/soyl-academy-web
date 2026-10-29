# CBSE Class 12 Biology, Chapter 11 — Organisms and Populations

`cbse-12-biology-ch11` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (12 + 12 + 13 slides), notes (3 sections, 3 display formulas), 35 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch11_short` (20 marks, 40 min) and `t_cbse12bio_ch11_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (per capita rates, N(t+1) from B, I, D, E, exponential and logistic growth, doubling time, quoted r values), `svgs.mjs` (growth curves plotted from the equations, age pyramids, density processes), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch11/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered. The rationalised chapter has no "organism and its environment" section, so habitat, adaptation and regulation of body conditions are not taught or tested.
- Class 12 depth: population attributes (per capita birth and death rates, sex ratio, age distribution and pyramids, density by count, cover, biomass, relative density, pugmarks and fecal pellets); density change (B, I, D, E); exponential growth (r = b − d, dN/dt = rN, N(t) = N(0)e^(rt), r values for Norway rat, flour beetle, India 1981); logistic growth (K, phases, Verhulst-Pearl equation); life history variation; the six interactions with signs; predation (energy transfer, prickly pear, Pisaster, prey defences); competition (flamingoes and fishes, Abingdon tortoise, Balanus and Chthamalus, Gause, resource partitioning in warblers); parasitism (host specificity, adaptations, liver fluke, Cuscuta, brood parasitism); commensalism; mutualism (lichens, mycorrhizae, fig–wasp, Ophrys).

## Shape
- **Part 1 (t01), 12 slides:** population; attributes; worked example (birth rate 15/60 = 0.25, death rate 5/50 = 0.1, computed); sex ratio and age distribution; age pyramids; worked example (450/400/150 → 45/40/15 percent, expanding); density measures; summary; exam tips.
- **Part 2 (t02), 12 slides:** four processes; worked example (500 + 75 − 65 = 510, computed); exponential growth; growth curves; worked example (flour beetle 24 vs 19.2 per unit time, computed); life history variation; summary; exam tips.
- **Part 3 (t03), 13 slides:** interaction signs; predation; prey defences; competition; worked example (classifying four pairs); parasitism; commensalism and mutualism; worked example (Balanus removal and competitive release); summary; exam tips.
- **Visuals (25 of 37 slides; no gap longer than one slide):** table 19, flow 3, svg 3.
- **Diagrams (3 SVGs, 6 uses across decks and notes):** exponential and logistic curves computed from the equations with K marked, three age pyramids, four density processes with the N(t+1) equation. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 6–61 words (mean 35).

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 6 | 1 (keys d a c b a d) |
| true-false | 2 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 9 | 1 (death rate 0.05; birth rate 0.25; 60 % females; 50 % reproductive; 810 rabbits; 30 rats per year; logistic 45; r = 0.035; 271.8 after 10 days) |
| short | 8 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 18 short/long items.
- **Difficulty:** d1 17 · d2 34 · d3 14 · d4 2.
- **Competency:** recall 12 · understanding 24 · application 28 · analysis 2 · evaluation 1. Application or higher is **46% of items (47% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 17 · t02 22 · t03 30.
- **Cases:** spotted deer in a sanctuary (birth rate 0.25, 420 at year end, pyramid shape or indirect estimation); yeast growth table (logistic curve, dN/dt = 52 at N = 130, carrying capacity or phases); starfish removal on a rocky shore (competition, 46.7 % species lost, role of predators); goats on an island (exponential growth, about 90 goats after 5 years, competitive exclusion or logistic levelling).
- **Deck checks:** death rate, urn pyramid, tiger census (Part 1); density processes, logistic A-R, Pacific salmon (Part 2); Pisaster, fluke A-R, mutualism (Part 3) — all objective.
- **Re-solves:** 14 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A urn pyramid, density processes, mutualism (MCQ), logistic (A-R) · B natality and mortality (2 marks), roles of predators (2 marks), exponential vs logistic (3 marks) · C growth models or interactions · D yeast growth case.
- **Long:** A tiger census, banyan cover, salmon, carrying capacity, J-curve, Pisaster, warblers, koel eggs (MCQ), Gause, cattle egret (A-R) · B density estimation, fig–wasp, (life history or plant defences), classifying interactions, (parasite adaptations or barnacle experiment) · C predation + (competition evaluation or population attributes) · D deer case, rocky-shore case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 48 maths strings parse; 6 SVG uses / 3 distinct diagrams pass the allow-list; narration clean; 14/14 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Deck length.** Part 1 had 11 slides; a slide on sex ratio and age distribution was added.
2. **Markdown.** A flashcard used "++" for mutualism, which the lint reads as an underline marker; signs are now written as (+, +).
3. **Notes formulas.** Formula entries use the `latex` and `label` fields of the notes schema.
4. **Diagrams after rasterising.** The exponential-curve label was moved off the carrying-capacity line; the pyramid caption was moved closer to the pyramids.

## Facts a reviewer should double-check
- Growth curves are drawn from the equations with illustrative parameters (N0 = 10, r = 0.35, K = 400); they are models, not data.
- The yeast table, deer counts and rocky-shore numbers are illustrative.
- The textbook places the cattle egret with cattle under commensalism; the chapter follows that.
