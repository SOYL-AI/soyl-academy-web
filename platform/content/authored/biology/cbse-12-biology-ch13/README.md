# CBSE Class 12 Biology, Chapter 13 — Biodiversity and Conservation

`cbse-12-biology-ch13` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (14 + 13 + 14 slides), notes (4 sections, 1 display formula), 35 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch13_short` (20 marks, 40 min) and `t_cbse12bio_ch13_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (species–area relation S = CA^Z, Z from two survey points, species gain for an area factor, percentages, bird counts by latitude, India’s land and species shares), `svgs.mjs` (species–area curves and log–log lines computed, latitude bars computed from the counts, species shares), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch13/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered; the chapter has no removed topics in the 2026-27 syllabus.
- Class 12 depth: Wilson; genetic, species and ecological diversity (Rauwolfia and reserpine, rice and mango strains, Western vs Eastern Ghats, India vs Norway); IUCN 1.5 million described, May’s 7 million; animals over 70 percent, plants at most 22 percent, insects over 70 percent of animals; India 2.4 percent land, 8.1 percent species, 12 mega diversity countries; latitudinal gradient (Colombia 1,400, New York 105, Greenland 56, India over 1,200 bird species; Ecuador vs Midwest; Amazon) and three explanations; Humboldt’s species–area relation, log S = log C + Z log A, Z 0.1–0.2 and 0.6–1.2; Tilman’s plots; Ehrlich’s rivet popper hypothesis; IUCN 784 extinctions, recent extinctions, sixth extinction, threatened shares; effects of loss; the evil quartet with examples (Amazon, Steller’s sea cow, passenger pigeon, Nile perch, Parthenium, Lantana, Eichhornia, Clarias gariepinus, co-extinctions); narrowly utilitarian, broadly utilitarian and ethical arguments; hotspots (34; India’s three); protected areas; sacred groves; Ramsar sites; Red Data Book; ex situ methods; Rio 1992 and Johannesburg 2002.

## Shape
- **Part 1 (t01), 14 slides:** levels; species numbers; worked example (8.1 / 2.4 ≈ 3.4, computed); latitudinal gradient; reasons; species–area; worked example (Z ≈ 0.15 from 40 species in 10 km² and 80 in 1000 km²; 10^0.15 ≈ 1.41, computed); importance; summary; exam tips.
- **Part 2 (t02), 13 slides:** recent extinctions; sixth extinction; worked example (87 of 784 ≈ 11.1 percent plants, computed); effects; habitat loss and over-exploitation; worked example (rain forest 14 → 6 percent, about 57.1 percent lost, computed); alien species and co-extinctions; summary; exam tips.
- **Part 3 (t03), 14 slides:** three arguments; hotspots; protected areas and sacred groves; Ramsar sites and Red Data Book; worked example (in situ or ex situ); ex situ methods; worked example (plan for a rare orchid and its pollinator); global commitments; summary; exam tips.
- **Visuals (29 of 41 slides; no gap longer than two slides):** table 22, flow 4, svg 3.
- **Diagrams (3 SVGs, 6 uses across decks and notes):** species–area curve and log–log lines for regions and continents, bird species by latitude, shares of described species. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 7–58 words (mean 32).

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 4 | 1 (keys a c b a) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 7 | 1 (3.4 times; 25 times; Z ≈ 0.13; 100^0.2 ≈ 2.51; 43.1 % vertebrates; 8.94 million km² of rain forest; 300 species saved) |
| short | 6 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 21 · d2 27 · d3 15 · d4 2.
- **Competency:** recall 15 · understanding 18 · application 29 · analysis 2 · evaluation 1. Application or higher is **49% of items (49% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 25 · t02 20 · t03 20.
- **Cases:** nested-area bird survey (Humboldt, Z ≈ 0.15, regional vs continental Z or the equation); an alien predator in a tropical lake (alien invasion, 60 % of species lost, Nile perch or co-extinction); a Meghalaya sacred grove (in situ, 15 % endemic, ex situ backup or value of groves); IUCN threatened shares (amphibians, 80 of 250, sixth extinction or effects of loss).
- **Deck checks:** Rauwolfia, tropics A-R, Z range (Part 1); extinction rate, fragmentation, Nile perch A-R (Part 2); pollination, hotspot A-R, ex situ (Part 3) — all objective.
- **Re-solves:** 11 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A Rauwolfia, extinction rate, seed bank (MCQ), hotspot (A-R) · B rivet popper (2 marks), hotspots (2 marks), evil quartet from news reports (3 marks) · C causes of loss or conservation methods · D alien-predator lake case.
- **Long:** A Z range, Western Ghats, insects, dodo, fragmentation, fig and wasp co-extinction, sacred groves, cryopreservation (MCQ), tropics, Nile perch (A-R) · B species–area argument, effects of loss, (alien species or fragmentation), levels of diversity, (classifying in situ and ex situ or tropical richness) · C patterns of biodiversity + (evaluating the case for conservation or levels and numbers) · D species–area case, sacred grove case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 27 maths strings parse; 6 SVG uses / 3 distinct diagrams pass the allow-list; narration clean; 11/11 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Deck checks.** Part 2 had only two check slides; a fragmentation check was added.
2. **Word limits.** Two 2-mark case alternatives were below 30 words and were expanded.
3. **Match item.** Two right-hand options both read "Genetic diversity"; they now name a crop and a medicinal plant so each pairing is unique.
4. **Diagrams after rasterising.** The regional-slope label was moved inside the canvas and above its line; the latitude arrow no longer runs through its caption; a narrow bar segment shows only its percentage.

## Facts a reviewer should double-check
- Counts of biosphere reserves, national parks and sanctuaries are not tested: the textbook figures (14, 90, 448) are dated, as the notes say.
- Ramsar sites and the Red Data Book are named in the CBSE syllabus but described only briefly in the textbook; the chapter gives a short factual description (Ramsar Convention, Iran, 1971; IUCN Red List categories) and avoids changing counts.
- The "rest 8 percent" segment of the species-share bar is the remainder after animals (over 70) and plants (at most 22); the textbook does not name it.
- Survey, lake, grove and threatened-species case figures are illustrative.
