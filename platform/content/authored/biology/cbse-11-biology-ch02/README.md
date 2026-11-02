# CBSE Class 11 Biology, Chapter 2 — Biological Classification

`cbse-11-biology-ch02` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (3 sections), 30 flashcards, 105 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch02_short` (20 marks, 40 min) and `t_cbse11bio_ch02_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (the five-kingdom table with counting helpers, a decision key, discovery years and gaps, bacterial doubling, spore and chromosome counts, survey percentages — each asserted with `eq`), `svgs.mjs` (five kingdoms, bacterial shapes with a lettered twin, four protists, fungal hyphae and mycelium, phage, virus and viroid, lichen section), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch02/src/build.mjs` (deterministic; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered. Plantae and Animalia are met only as the last two columns of the five-kingdom comparison. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth: the failings of the two-kingdom system; Whittaker (1969) and his five criteria; the comparison table; Monera (shapes, fission, archaebacteria with halophiles, thermoacidophiles and methanogens, eubacteria with cyanobacteria and heterocysts, chemosynthetic and heterotrophic bacteria, mycoplasma, importance); Protista (chrysophytes, dinoflagellates, euglenoids, slime moulds, four protozoan groups); Fungi (chitin, hyphae and mycelium, coenocytic and septate, nutrition, three modes of reproduction, plasmogamy, dikaryon, karyogamy, four classes with examples); lichens as symbiosis and pollution indicators; viruses (Ivanowsky 1892, Beijerinck 1898, Stanley 1935, capsid, DNA or RNA, bacteriophage, diseases) and viroids (Diener 1971).

## Shape
- **Part 1 (t01; Monera and Protista of t02), 17 slides:** two kingdoms versus five; the five criteria; the five-kingdom diagram; comparison table; worked example (placing a mushroom, Euglena and a tiger with a key); bacterial shapes; archaebacteria and eubacteria; bacteria in our lives; worked example (1 cell, 30 minutes, 3 hours: 64 cells); Protista and its groups; summary; exam tips; 3 checks.
- **Part 2 (Fungi of t02; t03), 18 slides:** hyphae and mycelium; nutrition; reproduction; the sexual cycle; worked example (8 chromosomes through the cycle: 16 in the dikaryon cell, 16 in the zygote, 8 in spores); four classes; lichens and pollution; worked example (lichen cover 2 to 60 percent: 30 times); viruses and viroids with their discovery; summary; exam tips; 3 checks.
- **Visuals (27 of 35 slides; no gap longer than one slide):** table 18, flow 3, svg 6.
- **Diagrams (7 SVGs):** five kingdoms; bacterial shapes plus a cyanobacterial filament; the lettered twin (A–E); Amoeba, Paramecium, Euglena and a diatom; coenocytic and septate hyphae with a mycelium; bacteriophage, virus particle and viroid; section of a lichen. Every SVG was rasterised and checked by eye; fixes are listed below.
- **Narration:** 9–46 words (mean 32).

## Question bank (105)
| Type | Count | Marks |
|---|---|---|
| mcq | 39 | 1 (keys a 10, b 10, c 10, d 9) |
| assertion-reason | 9 | 1 (keys a c a c c b d a d) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 13 | 1 (3 kingdoms; 24 spirilla; 40 percent; 256 cells; 45 percent; 1200 and 6000 spores; 12 chromosomes; 25 percent; 43 years; 3000 phages; 30 times; 25 percent) |
| short | 15 + 9 | 2 / 3 |
| long | 6 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 35 · d2 56 · d3 13 · d4 1 (evaluating the claim that viruses should be a sixth kingdom).
- **Competency:** recall 17 · understanding 31 · application 52 · analysis 4 · evaluation 1. Application or higher is **54% of items (46% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 17 · t02 63 · t03 25 (Monera, Protista and Fungi share one syllabus topic).
- **Cases:** a pond-water bacterial count (coccus and spirillum, 30 percent spiral, heterocyst or mycoplasma); a cyanobacterial bloom with a red tide (Monera, 96 filaments after five days, dinoflagellates or heterocysts); wheat rust (Basidiomycetes, 15 percent, parasite versus saprophyte or basidium); a clinic with viral cases and a viroid-infected potato crop (viroid, 30 percent, virus versus viroid or fungal cases).
- **Diagram items:** `fig-cyano-mcq`, `fig-vibrio-mcq` and `fig-spirillum-mcq` use the lettered bacterial figure (A coccus, B bacilli, C vibrio, D spirillum, E cyanobacterial filament).
- **Deck checks:** reading the table, heterocysts, Euglena (Part 1); hyphae, a basidiospore count, viroids (Part 2) — all objective.
- **Re-solves:** 17 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A red tide, methane from dung, a lichen (MCQ), diatom walls (A-R) · B coenocytic versus septate hyphae (2), plasmogamy versus karyogamy (2), three mould cultures (3) · C the five kingdoms or viruses · D pond-water case.
- **Long:** A two-kingdom weakness, chemosynthesis, a wall-less pathogen, phage DNA, the comma-shaped figure, chitin, curd bacteria, lichens as indicators (MCQ), Monera A-R, lichen A-R · B archaebacteria (2), fungal nutrition (2), (spore types or Ivanowsky and Beijerinck) (2), compare Plantae, Fungi and Animalia (3), (virus versus viroid or placing three organisms) (3) · C Protista + (the sixth-kingdom evaluation or the fungi answer) · D bloom case, wheat-rust case.

## Validation
- Author validator (in the build): 28 maths strings parse; 15 SVG uses / 7 distinct diagrams pass the allow-list; narration clean; 17/17 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: `stemdup` reports no duplicate stems; `verify --authored` shows 105/105 pass, 0 blocking and 0 minor flags; `originality --authored` shows 0 errors for this unit.

## Review pass (2026-11-01)
1. Marking schemes were made multiples of 0.5 (the Euglena and fungal-cycle answers); five short answers were lengthened to meet their word limits.
2. Assertion-reason keys were rebalanced (the first draft used only a and c) by replacing three items with a b-key and two d-key items.
3. A claim that mycoplasma pass through bacteria-proof filters was removed from an MCQ stem because the textbook does not state it.
4. Diagrams after rasterising: the Monera box text was shortened to fit, stray leader lines were removed from the bacterial and hyphae figures, the amoeba’s pseudopodia were redrawn as lobes, and the lichen caption and right-hand labels were shortened so nothing is clipped.

## For a reviewer
- **Virus and viroid details.** Viruses are kept outside the five kingdoms, as the textbook does; the notes add that whether they are “alive” is debated, and `virus-eval-long` asks students to weigh that. Ivanowsky 1892, Beijerinck 1898 (contagium vivum fluidum), Stanley 1935 and Diener 1971 follow the textbook.
- **Archaebacteria and the three domains.** Archaebacteria are taught as the textbook’s Monera group; chapter 1 mentions Woese’s three-domain scheme separately, so there is no conflict in the five-kingdom framework.
- **Mycorrhiza** is mentioned as a symbiotic association with roots of higher plants, in one table row and in the notes only; it is not tested.
- **Fungal cycle numbers.** The haploid chromosome number 8 (and 6 in a question) is illustrative. The dikaryon is described as n + n; the “16 chromosomes per dikaryotic cell” figure counts both haploid nuclei and is stated as such.
- **Ascospore and basidiospore counts.** Only the textbook’s four basidiospores per basidium are used; no ascospore count is claimed.
- **Illustrative figures:** generation time and growth, the swab and plankton counts, bloom doubling, lichen cover, phage burst, leaf and clinic counts.
- **Cell-wall of Protista** is “present in some” as in the textbook table; the diatom silica wall and the Euglena pellicle are given separately.
- The five-kingdom diagram is a schematic of relationships, not a phylogenetic tree; the protist drawings are not to scale.
