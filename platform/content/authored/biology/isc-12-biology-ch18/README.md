# ISC Class 12 Biology, Chapter 18 — Biodiversity and its Conservation

`isc-12-biology-ch18` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (6 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch18_short` (20 marks, 50 min) and `t_isc12bio_ch18_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch18/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics: **genetic, species and ecosystem diversity**, global numbers and proportions of major taxa; **latitudinal gradient**, **species–area relationship** (graph and equation), **rivet popper hypothesis**, narrowly utilitarian, broadly utilitarian and ethical reasons; **loss of biodiversity** (recent extinctions; habitat loss, over-exploitation, alien species, co-extinction); **in-situ conservation** (biosphere reserves, national parks, sanctuaries, sacred groves, hotspots, Ramsar sites, Red Data Book); **ex-situ conservation**; the **Earth Summit and World Summit**.
- Species–area values, Z, ratios and percentages are computed by src/calc.mjs, not typed in.

## Shape
- **Decks:** Part 1, 16 slides: Biodiversity; Three levels of biodiversity; How many species are there?; India’s biodiversity; The latitudinal gradient; Why are the tropics so diverse?; Quick check: genetic diversity; The species–area relationship; Worked example 1: using S = CA^Z; Worked example 2: finding Z from two surveys; Importance of species diversity: the rivet popper hypothesis; Why should we conserve biodiversity?; Quick check: rivet popper; Quick check: tropics; Summary; Exam tips. Part 2, 15 slides: Loss and conservation; Loss of biodiversity; Worked example 1: reading the Red List; Causes: the evil quartet; Worked example 2: shrinking rain forests; Quick check: alien species; In-situ conservation: hotspots; Protected areas and biosphere reserves; Sacred groves, Ramsar sites and the Red Data Book; Quick check: hotspots; Ex-situ conservation; International efforts; Quick check: cryopreservation; Summary; Exam tips.
- **Visuals (23 of 31 slides):** flow 2, table 17, svg 4.
- **Diagrams (4 SVGs, 10 uses):** species–area curves, latitudinal bird counts and species shares (copied from CBSE 12 ch13); new: **zones of a biosphere reserve**. Every SVG was rasterised and checked by eye.
- **Narration:** 8–44 words (mean 28).

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 33 | 1 (keys a 9, b 8, c 8, d 8) |
| assertion-reason | 4 | 1 (ISC options; keys a c b d) |
| fill-blank | 2 | 1 |
| numerical | 6 | 1 |
| short | 7 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 11 · d2 39 · d3 15 · d4 1.
- **Competency:** recall 10 · understanding 21 · application 31 · analysis 4. Application or higher is **53% of items (60% of marks)**, inside the 45–65 % band.
- **Re-solves:** 9 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A species-mcq, colombia-mcq, coextinct-mcq, biosphere-mcq, rivet-ar · B levels-short, (rivet-short or exsitu-short) · C gradient-short, (evil-short or compare-short) · D patterns-long.
- **Long:** A genetic-mcq, humboldt-mcq, continent-mcq, utilitarian-mcq, nileperch-mcq, habitat-mcq, hotspot-mcq, sacred-mcq, seedbank-mcq, rio-mcq, fragment-ar, cryo-ar · B loss-short, insitu-short, (summits-short or ethical-short) · C sar-short, conserve-short, hotspot-short, (redlist-short3 or sacred-short3) · D evil-long, (insitu-long or conservation-long).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 17 maths strings parse; 10 SVG uses / 4 distinct diagrams pass the allow-list; narration clean; 9/9 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes and notes:
1. **Originality.** One stem matched the CBSE 12 ch13 bank (ex-situ method) and was rewritten as a scenario.
2. **Diagram text.** The biosphere caption was right-aligned so it is not clipped.
3. **Originality.** Every stem names its own organism, case, sample or scenario; an exact-stem check against all authored banks and `originality --authored` report no duplicates.

## Facts a reviewer should double-check
- Island and lake figures in the cases are invented for the exercises; IUCN counts follow the textbook (2004).
