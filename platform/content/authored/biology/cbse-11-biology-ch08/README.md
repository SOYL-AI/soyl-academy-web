# CBSE Class 11 Biology, Chapter 8 — Cell: The Unit of Life

`cbse-11-biology-ch08` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (5 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch08_short` (20 marks, 40 min) and `t_cbse11bio_ch08_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (cell sizes and ratios, magnification both ways, percentages and shares, microtubule counts, DNA per chromosome, chromosome arm ratios; every value asserted), `svgs.mjs` (bacterial cell, fluid mosaic membrane, animal cell, plant cell, mitochondrion and chloroplast, axoneme and centriole, chromosome types), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch08/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics are covered: t01 cell theory and prokaryotic and eukaryotic cells, t02 cell membrane and cell wall, t03 cell organelles. No topic of this chapter is removed in the 2026-27 syllabus.
- Class 11 depth, school-examination style in the CBSE pattern: Leeuwenhoek, Brown, Schleiden, Schwann, Virchow and the modern cell theory; sizes (Mycoplasma 0.3 µm, bacteria 3–5 µm, red cell 7 µm, ostrich egg, nerve cells) and shapes; prokaryote and eukaryote compared; plant and animal cells compared; bacterial shapes, envelope (glycocalyx as slime layer or capsule, wall, membrane), Gram reaction, mesosome, chromatophores, flagellum (filament, hook, basal body), pili, fimbriae, nucleoid and plasmids, 70S ribosomes (15 nm × 20 nm), polysomes, inclusion bodies and gas vacuoles; lipid bilayer, red cell membrane 52 % protein and 40 % lipid, integral and peripheral proteins, fluid mosaic model (Singer and Nicolson 1972), passive and active transport, sodium–potassium pump; cell wall composition in algae and other plants, primary and secondary walls, middle lamella, plasmodesmata; endomembrane system; RER and SER; Golgi (Camillo Golgi 1898, cisternae 0.5–1.0 µm, cis and trans faces, glycoproteins and glycolipids); lysosomes; vacuoles and the tonoplast (up to 90 % of a plant cell), contractile and food vacuoles; mitochondria (sizes, cristae, matrix, DNA, 70S ribosomes, fission); plastids (chloroplasts, chromoplasts, amyloplasts, elaioplasts, aleuroplasts; chloroplast size and number; grana, stroma lamellae, stroma); ribosomes (Palade 1953; 80S and 70S subunits; Svedberg unit); cytoskeleton; cilia and flagella (9 + 2 axoneme, radial spokes, linkers, basal bodies); centrosome and centrioles (nine triplets, hub, spokes); microbodies; nucleus (Brown 1831, Flemming, envelope, perinuclear space 10–50 nm, pores, nucleolus, chromatin, histones, 2 m of DNA in 46 chromosomes, cells without nuclei); centromere, kinetochores, four chromosome types and satellites.

## Shape
- **Part 1 (t01–t02), 17 slides:** cell theory; sizes and shapes; worked example (18 mm image of a 3 µm bacterium = magnification 6000, computed); prokaryotic and eukaryotic cells; bacterial cell (diagram); envelope and inclusions; plasma membrane (diagram); transport; worked example (classifying four movements); cell wall; summary; exam tips.
- **Part 2 (t03), 18 slides:** animal cell (diagram); plant cell (diagram); ER and Golgi; lysosomes, vacuoles and microbodies; worked example (which organelle is busy); mitochondria and chloroplasts (diagram); plastids; ribosomes and cytoskeleton; cilia, flagella and centrioles (diagram); nucleus; chromosome types (diagram); worked example (arm ratios 1, 2 and 11 and a missing short arm, computed); summary; exam tips.
- **Visuals (26 of 35 slides; no gap longer than two slides):** table 17, flow 2, svg 7.
- **Diagrams (7 SVGs, 14 uses across decks and notes):** rod-shaped bacterium; fluid mosaic membrane; animal cell; plant cell; mitochondrion and chloroplast; 9 + 2 axoneme and nine-triplet centriole; metacentric to telocentric chromosomes. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 7–54 words (mean 33), no symbols, unit abbreviations or formulae.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 | 1 (keys a 8, b 8, c 8, d 8) |
| assertion-reason | 4 | 1 (keys d a c b) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (red cell 23.3 times Mycoplasma; 3.2 mg lipid; 2 µm mitochondrion; 20 axoneme microtubules; 54 centrosome microtubules; 4.3 cm DNA per chromosome) |
| short | 6 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 18 · d2 38 · d3 13 · d4 1 (comparing mitochondria and chloroplasts and reasoning about their own DNA and ribosomes).
- **Competency:** recall 14 · understanding 22 · application 30 · analysis 4. Application or higher is **49% of items (48% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 19 · t02 14 · t03 37.
- **Cases:** a bacterial culture on antibiotic plates (Gram-positive, 75 % of plates, capsule and flagella or plasmids); red cell membranes (fluid mosaic model, 2.6 mg protein, bursting by osmosis or the bilayer); tracking labelled protein in pancreatic cells (rough ER, 87 minutes, Golgi faces or lysosomes); leaf and root plastids (thylakoids, 750 chloroplasts, chloroplast structure or leucoplasts).
- **Deck checks:** Mycoplasma, mesosome, lipid bilayer, middle lamella (Part 1); endomembrane system, stroma, Svedberg true-false (Part 2) — all objective, none used in a test.
- **Re-solves:** 10 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A plasmid, osmosis in red cells, Golgi faces (MCQ), power houses (A-R) · B cell theory (2 marks), RER or SER for two hormones (2 marks), classifying three movements (3 marks) · C prokaryotic cell or endomembrane system · D labelled-protein case.
- **Long:** A Virchow, fimbriae, inclusion bodies, sodium pumping, plasmodesmata, pancreatic RER, contractile vacuole, nucleoli (MCQ), Mycoplasma wall, lysosomes (A-R) · B bacterial envelope, cell wall functions, (plastids in four tissues or centrioles), fluid mosaic model, (plant or animal cell or chromosome types) · C mitochondria and chloroplasts compared + (membrane and wall or nucleus) · D antibiotic case, leaf and root case.

## Validation
- Author validator (in the build): 17 maths strings parse; 14 SVG uses / 7 distinct diagrams pass the allow-list; narration clean; 10/10 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- `npm run content -- verify --board cbse --class 11 --subject biology --authored`: 70/70 pass, 0 blocking + 0 minor flags. `npm run content -- originality --authored`: 0 errors. Exact-stem check against all authored chapters: no duplicate stems.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem; keys, schemes and word limits were checked. Fixes made:
1. **Word limit.** The leucoplast alternative in the leaf case had a 22-word model answer and was expanded.
2. **Numerical solution.** The red cell to Mycoplasma ratio solution had a rounded "=" step (7 ÷ 0.3 = 23.33) that is not exact; it now uses "≈" only.
3. **Deck length.** Part 2 had 19 slides; a fourth check slide (axoneme) was removed to keep 18.
4. **Diagrams after rasterising.** A chloroplast drawn over the Golgi stack of the plant cell was moved, and the Golgi leader re-pointed.

## For a reviewer
- Schwann is given no nationality (sources differ); Schleiden 1838, Schwann 1839, Virchow 1855, Brown 1831, Golgi 1898, Palade 1953, Singer and Nicolson 1972 follow the textbook.
- Numbers to check: Mycoplasma 0.3 µm; bacteria 3–5 µm; red cell 7 µm; prokaryotic ribosome 15 nm × 20 nm; red cell membrane 52 % protein and 40 % lipid; cisternae 0.5–1.0 µm; vacuole up to 90 %; mitochondria 0.2–1.0 µm × 1.0–4.1 µm; chloroplasts 5–10 µm × 2–4 µm, 1 in Chlamydomonas and 20–40 per mesophyll cell; perinuclear space 10–50 nm; 2 m of DNA in 46 chromosomes.
- The long answer on mitochondria and chloroplasts adds one sentence beyond the textbook (most of their proteins are coded by nuclear genes) to keep the conclusion accurate; it is not tested elsewhere.
- The A-R on lysosomes is keyed (b): Golgi origin is true but does not explain their digestive range.
- The labelled-protein case uses illustrative times; the order RER → Golgi → vesicles is the point being tested.
- Case figures (plate counts, membrane masses, chloroplast counts) are illustrative.
