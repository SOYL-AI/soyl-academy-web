# CBSE Class 12 Biology, Chapter 12 — Ecosystem

`cbse-12-biology-ch12` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (13 + 12 + 13 slides), notes (5 sections, 1 display formula), 33 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch12_short` (20 marks, 40 min) and `t_cbse12bio_ch12_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (NPP = GPP − R, 10 percent law, transfer efficiency, percentages, upright-pyramid test), `svgs.mjs` (energy flow with values from the 10 percent law, three pyramids, forest strata), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch12/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04) are covered. The rationalised chapter has no sections on ecological succession, nutrient cycles or ecosystem services, so these are not taught or tested (nutrient cycling is named only as one of the four components of ecosystem function).
- Class 12 depth: ecosystem definition and types; species composition and stratification; pond components, regulators and the four functions; primary production and productivity with units; GPP, R, NPP, secondary productivity; factors of primary productivity; biosphere NPP (170 billion tons, oceans 55); detritus and decomposition (fragmentation, leaching, catabolism, humification, mineralisation); factors (lignin, chitin, nitrogen, sugars, temperature, moisture, oxygen); energy flow (sun except hydrothermal vents, PAR under 50 percent, 2–10 percent captured, second law); GFC and DFC with land and water; food webs; trophic levels and standing crop; 10 percent law; pyramids of number, biomass and energy, inversions and limitations.

## Shape
- **Part 1 (t01), 13 slides:** definition; types; biotic and abiotic structure; stratification; pond; worked example (sorting pond items); functions; worked example (matching pond events to the four functions); summary; exam tips.
- **Part 2 (t02), 12 slides:** productivity terms; worked example (2400 − 900 = 1500, 37.5 percent respired, computed); factors and biosphere figures; worked example (land 115 billion tons, ocean 32.4 percent, computed); decomposition steps; factors; summary; exam tips.
- **Part 3 (t03–t04), 13 slides:** energy source and PAR; unidirectional flow; GFC and DFC; trophic levels and standing crop; worked example (50000 → 5000 → 500 → 50 J, computed); pyramids; worked example (150/1200 = 12.5 percent transfer, computed); limitations; summary; exam tips.
- **Visuals (26 of 38 slides; no gap longer than one slide):** table 18, flow 5, svg 3.
- **Diagrams (3 SVGs, 6 uses across decks and notes):** energy flow through four levels with heat losses (values from the 10 percent law), pyramids of number (upright), biomass in the sea (inverted) and energy (upright), forest stratification. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 6–58 words (mean 33).

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 5 | 1 (keys a b c a d) |
| true-false | 3 | 1 |
| fill-blank | 4 | 1 |
| match | 1 | 2 |
| numerical | 7 | 1 (NPP 1900; GPP 2400; 75 % available; 115 billion tons on land; 200 J to secondary consumers; 9000 J captured from PAR; 9 % transfer) |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 16 short/long items.
- **Difficulty:** d1 20 · d2 28 · d3 16 · d4 2.
- **Competency:** recall 14 · understanding 20 · application 29 · analysis 3. Application or higher is **48% of items (48% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 15 · t02 25 · t03 15 · t04 11.
- **Cases:** forest and grassland productivity (NPP 1600, NPP not GPP feeds consumers, respiration or factors); litter bags at two sites (70 % lost, climate, earthworms excluded or humus); grassland food chain (40 kJ to snakes, frog at level 3, heat loss or DFC on land); coastal sea pyramids (inverted biomass, 10 % transfer, why energy is upright or species at two levels).
- **Deck checks:** stratification, minerals vs energy A-R, pond decomposers (Part 1); NPP, earthworms, lignin A-R (Part 2); 10 percent law, energy pyramid, DFC A-R (Part 3) — all objective.
- **Re-solves:** 14 scripted checks recompute keys and pyramid shapes from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A strata, fragmentation, energy pyramid (MCQ), minerals vs energy (A-R) · B GPP and NPP (2 marks), functions (2 marks), decomposition steps (3 marks) · C energy flow or decomposition · D food-chain energy case.
- **Long:** A pond decomposers, aquarium, bogs, leaf litter, PAR, frog’s level, chain length, banyan tree (MCQ), DFC, sea biomass (A-R) · B 10 percent law, limitations, (comparing NPP or stratification), GFC and DFC, (decomposition factors or sea pyramid) · C pyramids + (ecosystem structure or productivity) · D productivity case, coastal pyramid case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 36 maths strings parse; 6 SVG uses / 3 distinct diagrams pass the allow-list; narration clean; 14/14 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Competency and difficulty.** The first build was at 44 % application or higher with no difficulty-4 items. Three items were re-pitched as scenarios (pond in summer and winter, a vent community, weighing grasshoppers as standing crop) and two analysis items raised to difficulty 4, giving 48 %.
2. **Diagram text.** Labels at font size 9 were raised to 10, the validator minimum.
3. **Diagrams after rasterising.** Tree trunks in the stratification diagram now stop at the canopy instead of crossing it.

## Facts a reviewer should double-check
- Pyramid values (grassland numbers, sea biomass 5 and 22 g m⁻²) and all productivity, litter and food-chain figures are illustrative, not survey data; the inverted sea pyramid follows the textbook’s description.
- "Nutrient cycling" is named as one of the four components of ecosystem function, as in the textbook, though nutrient cycles themselves are outside the rationalised syllabus.
