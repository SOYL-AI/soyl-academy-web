# CBSE Class 11 Biology, Chapter 5 — Morphology of Flowering Plants

`cbse-11-biology-ch05` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (3 sections, 1 display formula), 32 flashcards, 78 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch05_short` (20 marks, 40 min) and `t_cbse11bio_ch05_long` (40 marks, 90 min), laid out as the default blueprints. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (leaves per shoot, raceme buds, root elongation by region, ovules and seeds, mango mesocarp, maize endosperm, stamens, floral formulae built from a whorl specification as text and TeX, placentation letters — each asserted with `eq`), `svgs.mjs` (7 diagrams), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; library `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch05/src/build.mjs` (`CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03); no removed topics. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth: tap, fibrous and adventitious roots; root regions; root modifications (carrot, banyan prop, maize and sugarcane stilt, pneumatophores); stem and its modifications; leaf parts, venation, simple and compound leaves, phyllotaxy, leaf modifications; racemose and cymose inflorescences; flower whorls, symmetry, ovary position, aestivation, stamen and carpel types, placentation; fruit and pericarp, drupe, parthenocarpy; bean and maize seeds; family Solanaceae with floral formula and diagram.

## Shape
- **Part 1 (t01), 18 slides:** 2 worked examples (root elongation by region; leaves per shoot), 4 checks. **Part 2 (t02–t03), 18 slides:** 3 worked examples (raceme, mango and tomato, reading a formula), 4 checks.
- **Diagrams (7 SVGs):** parts of a flower (named and lettered A–E), placentation (named and lettered), dicot and monocot seeds, Solanaceae floral diagram, root regions. Each was rasterised and checked by eye; the flower was cropped, the maize labels moved clear of the grain, the Solanaceae ovule layout redrawn around the oblique septum.
- **Floral formula** is written in KaTeX (`\oplus`, subscripts, `\underline{G}`); the bisexual sign appears only in plain text.
- **Narration:** 8–71 words (mean 43).

## Question bank (78)
| Type | Count |
|---|---|
| mcq | 28 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 7 (keys a c a b d c d) |
| true-false / fill-blank / match | 4 / 3 / 2 |
| numerical | 6 |
| short | 9 two-mark + 7 three-mark |
| long | 8 |
| case-based | 4 (1 + 1 + 2, part (c) either/or) |

- **Difficulty:** d1 25 · d2 39 · d3 13 · d4 1 (evaluating a herbarium note with two errors).
- **Competency:** application or higher is 47% of items (45% of marks).
- **Topic tags:** t01 31 · t02 32 · t03 16.
- **Deck checks:** prop and stilt roots, potato eyes, venation, leaf count; ovary position, placentation (lettered), maize versus bean, formula reading.

## Chapter tests
- **Short:** A root zones, symmetry, Solanaceae gynoecium (MCQ), raceme (A-R) · B pneumatophores, aestivation, Solanaceae characters · C stem modifications or seeds · D lemon flower case.
- **Long:** A pericarp, compound leaf, phyllotaxy, stamens, lettered flower, radicle, Solanaceae family, formula choice, potato eyes, pea flower (A-R) · B leaf parts, stem modifications, (racemose versus cymose or placentation), venation, (ovary position or leaf modifications) · C root regions and modifications + (herbarium evaluation or Solanaceae) · D root elongation case, brinjal case.

## Validation
- Author validator: 47 maths strings, 13 SVG uses, narration clean, 14 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- `verify --authored` and `originality --authored` are run by the producer.

## Verifier pass (2026-11-02)
Every question was re-solved from its stem. Fixes: a 5-mark scheme using quarter marks was changed to half marks; tests were re-chosen so no stem in a test gives away another (tendril, pericarp and pneumatophore items moved out of tests that also ask about them); distractors were matched in length to the keys.

## For a reviewer
- The eyes of a potato are described as nodes with axillary buds on a modified stem (standard, but NCERT only says potato is a food-storing underground stem).
- Floral-formula conventions (brackets for union, line below G superior, line above G inferior, adhesion shown by a line over the letters) follow NCERT; the bisexual sign is in plain text only.
- Solanaceae: valvate aestivation, berry or capsule, endospermous seeds as in NCERT; the 20-mark and other counts (ovules, masses, root growth, 250 g maize sample at 82 percent endosperm) are illustrative.
- Perigynous flowers are given a half-inferior ovary; examples plum, rose, peach.
- Maize-grain parts and the bean hilum/micropyle drawing are schematic.
