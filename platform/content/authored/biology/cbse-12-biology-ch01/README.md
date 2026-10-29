# CBSE Class 12 Biology, Chapter 1 — Sexual Reproduction in Flowering Plants

`cbse-12-biology-ch01` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (19 + 17 + 20 slides), notes (8 sections), 33 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch01_short` (20 marks, 40 min) and `t_cbse12bio_ch01_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `lib.mjs` (authoring library, copied from `science/cbse-10-science-ch06/src/lib.mjs` and adapted to CBSE 12 Biology), `calc.mjs` (counting and ploidy rules), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch01/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04) are covered; the chapter has no removed topics in the 2026-27 syllabus.
- Class 12 depth: anther wall layers, micro- and megasporogenesis, monosporic embryo sac (7 cells, 8 nuclei), kinds and agents of pollination, outbreeding devices, pollen–pistil interaction, emasculation and bagging, double fertilisation, endosperm (free-nuclear and cellular), dicot and grass embryos, seed and fruit (true, false, parthenocarpic), apomixis and polyembryony and their use for hybrid seed.
- Not taught: ovule types beyond the inverted ovule drawn (named only as "inverted" in the diagram caption), detailed embryogeny stages beyond proembryo → globular → heart-shaped → mature, and bisporic or tetrasporic embryo sacs.

## Shape
- **Part 1 (t01), 19 slides:** the flower's two production lines; stamen and anther; microsporangium wall; microsporogenesis; pollen grain wall and cells; worked example (4 × 45 mother cells → 180 meioses → 720 pollen grains); pollen and people; pistil and ovule; megasporogenesis; building the embryo sac; mature embryo sac; worked example (ploidy of every ovule cell for 2n = 18); summary; exam tips.
- **Part 2 (t02), 17 slides:** three kinds of pollination; chasmogamous and cleistogamous flowers; worked example (classify four events by counting flowers and plants); agents; wind; water; insects and other animals; outbreeding devices; worked example (monoecious castor and maize vs dioecious papaya); pollen–pistil interaction; artificial hybridisation; summary; exam tips.
- **Part 3 (t03–t04), 20 slides:** pollen tube into a synergid; syngamy and triple fusion; worked example (ploidy after double fertilisation for 2n = 24); endosperm; albuminous and non-albuminous seeds; embryo stages; dicot embryo; grass embryo; ovule to seed; ovary to fruit; worked example (10 seeds → 10 pollen grains, 20 male gametes, at least 13 meioses); why seeds matter; apomixis; polyembryony and hybrid seed; summary; exam tips.
- **Visuals (44 of 56 slides; no gap longer than one slide):** table 25, flow 11, svg 8.
- **Diagrams (8 hand-written SVGs, 16 uses across decks and notes):** anther T.S. with one microsporangium enlarged (wall layers), two-celled pollen grain (exine, germ pore, intine, vegetative and generative cells), inverted ovule (funicle, hilum, integuments, micropyle, chalaza, nucellus, embryo sac), mature embryo sac (egg apparatus, filiform apparatus, polar nuclei, antipodals), double fertilisation, autogamy / geitonogamy / xenogamy, dicot embryo, grass embryo (scutellum, coleoptile, coleorhiza, epiblast). Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 14–71 words (mean 48), no symbols, formulae or abbreviations a TTS voice would spell out (the validator also refuses "2n"-style ploidy and MMC/PEN/PEC in narration).

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 6 | 1 (keys a c a c d b) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1 (pollen per anther 480; mitoses for 8 nuclei 3; endosperm for 2n = 14 is 21; 14 seeds → 18 meioses) |
| short | 8 + 7 | 2 / 3 |
| long | 6 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 21 short/long items.
- **Difficulty:** d1 11 · d2 21 · d3 32 · d4 4 · d5 1.
- **Competency:** recall 16 · understanding 21 · application 23 · analysis 8 · evaluation 1. Application or higher is **46% of items (51% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 21 · t02 22 · t03 17 · t04 11.
- **Cases:** ovule sections at four stages for a 2n = 16 plant (embryo sac development, ploidy); fruit set after five bagging / emasculation treatments (self-incompatibility, evaluation alternative); coconut, bean and maize seeds (endosperm, scutellum, ploidy 30); a farmer's hybrid rice yields over three years (segregation, 25% fall, apomixis or polyembryony alternative).
- **Deck checks:** tetrad, exine A-R, embryo sac count (Part 1); geitonogamy A-R, wind features, pollen-tube entry (Part 2); triple fusion, coleorhiza, apomixis vs parthenocarpy A-R (Part 3) — all objective.
- **Re-solves:** 9 scripted checks recompute every numerical key and the ploidy list from the rules in `calc.mjs` (one meiosis → 4 pollen grains but 1 functional megaspore; one pollen tube per ovule with 2 gametes; zygote n + n, endosperm n + n + n).

## Chapter tests (default blueprints)
- **Short:** A tapetum mutant, papaya garden, coconut water (MCQ), self-incompatibility (A-R) · B forgotten bag, endosperm first (2 marks), micro- vs megasporogenesis (3 marks) · C embryo sac formation or double fertilisation · D ovule-stages case.
- **Long:** A synergid ploidy, rice pollen transport, Commelina, emasculation, Yucca moth, seed coat genetics, orange polyembryony, hybrid seed (MCQ), polar nuclei, monoecy (A-R) · B tapetum, fossil pollen, (cucumber geitonogamy or Viola), maize wind features, (double fertilisation or apomixis) · C wheat hybridisation + (pollen–pistil interaction or seed and fruit) · D fruit-set case, hybrid rice case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 31 maths strings (KaTeX strict + mhchem) parse; 16 SVG uses / 8 distinct diagrams pass the allow-list; narration clean; 9/9 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem; biology facts were checked against the syllabus scope. Fixes made:
1. **A-R balance.** The first draft had five of six A-R keys at (a). Two reasons were rewritten as false statements that test a real misconception (polar nuclei "formed by meiosis"; self-pollen "never reaches the stigma"), giving keys a c a c d b.
2. **Competency honesty.** The first draft was 41% application or higher. Four items were re-pitched (apple cut across to locate the ovary; Commelina seed set; fossil pollen; micro- vs megasporogenesis as an analysis-level comparison); final 46% (51% of marks).
3. **Diagrams after rasterising.** Pollen-wall ornament no longer runs through the germ pore; the "Intine" label no longer clips; the double-fertilisation labels moved clear of the embryo sac outline; the geitonogamy label moved off flower B; the placenta label moved off the placenta.

## Facts a reviewer should double-check
- Pollen viability (rice and wheat about 30 minutes; some members of the rose, pea and potato families months) and storage in liquid nitrogen at about −196 °C.
- Seed longevity records (Arctic lupine about 10,000 years; date palm seed about 2000 years).
- Parthenium described as having reached India with imported wheat (stated as a commonly reported origin, not in an item key).
