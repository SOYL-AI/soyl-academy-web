# CBSE Class 11 Biology, Chapter 1 — The Living World

`cbse-11-biology-ch01` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (3 sections), 30 flashcards, 79 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch01_short` (20 marks, 40 min) and `t_cbse11bio_ch01_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `lib.mjs` (the shared authoring library for all CBSE 11 Biology chapters; **not edited here**), `calc.mjs` (rank order, the lineage table of 13 organisms, lowest shared rank and shared-rank counts for any pair, a name-rule checker, survey percentages, branching and genus counts — each asserted with `eq`), `svgs.mjs` (hierarchy funnel with a lettered twin, domain tree, lineage tree, anatomy of a name — drawn from `calc.mjs`), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch01/src/build.mjs` (deterministic; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered. The syllabus does not list taxonomic aids (herbarium, museum, zoological parks, keys) or the characteristics of living organisms, so neither is taught or asked. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth: biodiversity and the 1.7–1.8 million described species; the need for classification; identification, nomenclature and classification; the three domains (Woese, 1990; Bacteria, Archaea, Eukarya, with the four kingdoms of Eukarya); taxonomy, systematics and taxon; the seven categories (phylum or division) with definitions; the species concept; lineages of tiger, lion, cat, dog, human, housefly, mango, wheat, potato, brinjal, chilli and rice; binomial nomenclature (Linnaeus, ICBN, ICZN, Latin, italics or separate underlining, capital genus and small epithet, author abbreviation).

## Shape
- **Part 1 (t01 and the meaning of taxonomy and systematics), 15 slides:** biodiversity; why classify; identification, nomenclature, classification; the three domains and their comparison; two worked examples (a microbe placed in a domain by clues; a campus survey with percentages); taxonomy and systematics; a species list as data; summary; exam tips; 3 checks.
- **Part 2 (t02 hierarchy, t03 binomial nomenclature), 16 slides:** the categories; the funnel; the species concept; hierarchy of four organisms; the lineage tree; two worked examples (lowest shared category of tiger and dog; correcting three wrongly written names); binomial rules; why a universal name matters; summary; exam tips; 3 checks.
- **Visuals (23 of 31 slides; no gap longer than one slide):** table 14, flow 5, svg 4.
- **Diagrams (5 SVGs):** funnel of seven categories (human example), a lettered twin for the tiger (A–E), the three-domain tree, the Carnivora lineage tree, anatomy of *Mangifera indica* Linn. in print and by hand. Every SVG was rasterised and checked by eye; the funnel was widened so “Species” fits.
- **Narration:** 9–43 words (mean 31).

## Question bank (79)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 7 | 1 (keys a d b c d a c) |
| true-false | 3 | 1 |
| fill-blank | 6 | 1 |
| match | 1 | 2 |
| numerical | 8 | 1 (12.5 percent; 42 percent; 0.2 percent; 4 categories; 120 species; 30 specimens; 60 species; mean 3) |
| short | 10 + 7 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 25 · d2 38 · d3 15 · d4 1 (evaluating “random codes are enough” against the purposes of classification).
- **Competency:** recall 13 · understanding 24 · application 39 · analysis 2 · evaluation 1. Application or higher is **53% of items (55% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 27 · t02 32 · t03 20.
- **Cases:** a forest-reserve survey (classification, 55 percent insects, standard names or 75 percent animals and domain); seed packets with the six local names of brinjal and the label “solanum Melongena” (broken rules, 5 more local names, correct forms or why a single name); a zoo’s four mammals (same genus, 5 shared categories, cat nearer to tiger or dog, why tiger and lion are close); microbial isolates from a hot spring (domain of group Y, 50 percent prokaryotes, X versus Y or the domain of group Z).
- **Diagram items:** `fig-family-mcq`, `fig-order-mcq` and `fig-phylum-mcq` use the lettered funnel for the tiger (A phylum, B class, C order, D family, E genus); `svgs.mjs` throws if the lettering drifts from `calc.mjs`.
- **Deck checks:** steps (identification), domains A-R, systematics (Part 1); rank order, shared rank, writing a name (Part 2) — all objective.
- **Re-solves:** 12 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A Woese, kingdoms of Eukarya, author abbreviation (MCQ), local names versus standard names (A-R) · B archaea versus bacteria (2), correcting “musca Domestica” (2), the two codes (3) · C the hierarchy or the “random codes” evaluation · D forest-survey case.
- **Long:** A tiger and dog figure, nomenclature, described species, genus, division, species concept, tiger and cat figure, taxon (MCQ), genus and species (A-R), family and genus (A-R) · B identification versus nomenclature, four rules, (mule species or order versus genus), taxonomy versus systematics, (benefits of a museum catalogue or tiger and housefly) · C the three domains + (potato, brinjal and rice or the whole nomenclature answer) · D brinjal-labels case, zoo-mammals case.

## Validation
- Author validator (in the build): 27 maths strings parse; 11 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 12/12 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: `stemdup` reports no duplicate stems; `verify --authored` shows 79/79 pass, 0 blocking and 0 minor flags; `originality --authored` shows 0 errors for this unit.

## Review pass (2026-11-01)
1. The assertions in `calc.mjs` caught two of the author’s own mistakes before release: tiger and lion share six, not seven, categories (they differ at species); and a one-word name breaks one rule, not two. The bank, decks and answers follow the corrected values.
2. Two short model answers (the three domains; the two codes) were lengthened to meet their word limits.
3. The lineage figure’s dashed ring was resized so the genus label sits inside it.

## For a reviewer
- **Three domains** are in the syllabus but are not in the main NCERT text of this chapter; the notes say so. The basis is Woese’s ribosomal-RNA work (1990); Archaea are described as prokaryotes without peptidoglycan, often in extreme habitats.
- **Species concept.** The textbook defines a species through fundamental similarities; the biological species concept (interbreeding, fertile offspring, reproductive isolation) is added as the commonly taught extension, and the notes say it fails for purely asexual organisms. `species-mcq` and `species-short2` (mule) use the extension.
- **Taxonomic aids** are left out because the syllabus does not list them.
- **Lineages:** the order is written “Primata” and the plant class “Dicotyledonae” and “Monocotyledonae”, as in the textbook; modern sources use Primates and treat dicots as a non-natural group. The brinjal, chilli, tiger, lion, cat and dog lineages are standard.
- **ICBN** has been renamed (algae, fungi and plants); the notes say the rules are unchanged. “Linn.” is given as the abbreviation of Linnaeus.
- All survey figures (campus 400 species, forest 600, pond 200, garden genera, museum drawer, the imaginary insect order, hot-spring isolates, register 3500 of 1.75 million) are illustrative.
- Names inside MCQ options use markdown italics; the narration reads them as plain words.
