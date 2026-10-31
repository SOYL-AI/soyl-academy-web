# ISC Class 12 Biology, Chapter 17 — Ecosystem

`isc-12-biology-ch17` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 14 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch17_short` (20 marks, 50 min) and `t_isc12bio_ch17_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch17/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: ecosystem definition, types and components, and the **structure and function of a pond**; **GPP, NPP, secondary productivity**, PAR, **standing crop and standing state**; **decomposition** (fragmentation, leaching, catabolism, humification, mineralisation) and factors affecting it; **energy flow** (grazing and detritus food chains, food webs, trophic levels, 10 percent law); **pyramids of number, biomass and energy**.
- NPP values, percentages, energy transfers, efficiencies, litter decay and pyramid shapes are computed by src/calc.mjs, not typed in.

## Shape
- **Decks:** Part 1, 16 slides: The ecosystem; Types and components of ecosystems; A pond ecosystem; How a pond works; Quick check: pond; Productivity; Worked example 1: net primary productivity; PAR, global productivity, standing crop and standing state; Decomposition; Climate and the rate of decomposition; Worked example 2: comparing decomposition; Factors affecting decomposition; Quick check: productivity; Quick check: humus; Summary; Exam tips. Part 2, 14 slides: Energy in ecosystems; Food chains; Food webs and trophic levels; Energy flow and the 10 percent law; Worked example 1: applying the 10 percent law; Ecological pyramids; Upright and inverted pyramids; Worked example 2: is it upright?; Limitations of ecological pyramids; Quick check: detritus food chain; Quick check: 10 percent law; Quick check: pyramids; Summary; Exam tips.
- **Visuals (22 of 30 slides):** flow 2, table 16, svg 4.
- **Diagrams (4 SVGs, 11 uses):** energy flow and the three pyramids (adapted from CBSE 12 ch12 with ISC values); new: a **pond ecosystem** and a **computed litter-decomposition curve** for warm and cold habitats. Every SVG was rasterised and checked by eye.
- **Narration:** 5–41 words (mean 28).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 4 | 1 (ISC options; keys a c a d) |
| fill-blank | 4 | 1 |
| numerical | 7 | 1 |
| short | 7 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 10 · d2 31 · d3 20 · d4 1.
- **Competency:** recall 8 · understanding 22 · application 28 · analysis 4. Application or higher is **52% of items (60% of marks)**, inside the 45–65 % band.
- **Re-solves:** 18 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A abiotic-mcq, lignin-mcq, trophic-mcq, tree-mcq, npp-ar · B ecosystem-short, (standing-short or web-short) · C decomp-short, (productivity-short or energy-short3) · D pond-long.
- **Long:** A pond-mcq, gppdef-mcq, par-mcq, humus-mcq, frag-mcq, climate-mcq, dfc-mcq, tenpct-mcq, sea-mcq, limitation-mcq, pyramid-ar, decomp-ar · B pondfunc-short, factors-short, (pyramid-short or pyrlimit-short) · C pond-short3, gfcdfc-short, par-short3, (pyramid-short3 or litter-short) · D energy-long, (productivity-long or decomp-long).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 22 maths strings parse; 11 SVG uses / 4 distinct diagrams pass the allow-list; narration clean; 18/18 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes and notes:
1. **Lint.** A stem beginning “Data:” read as a URL scheme and was reworded.
2. **Originality.** Two stems matched the CBSE 12 ch12 bank (man-made ecosystem, humus) and were rewritten as scenarios.
3. **Diagram text.** The pond water label was moved off the marginal plant.
4. **Originality.** Every stem names its own organism, case, sample or scenario; an exact-stem check against all authored banks and `originality --authored` report no duplicates.

## Facts a reviewer should double-check
- Decay constants (0.25 and 0.03 per month) and lake energy values are illustrative.
