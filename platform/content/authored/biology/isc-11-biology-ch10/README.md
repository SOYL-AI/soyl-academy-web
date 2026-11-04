# ISC Class 11 Biology, Chapter 10 — Cell: The Unit of Life

`isc-11-biology-ch10` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 17 slides), notes (6 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch10_short` (20 marks, 50 min) and `t_isc11bio_ch10_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (surface-to-volume ratios, carrier and diffusion rates, marker-enzyme shares, scale-bar sizes, microtubule counts, chromosome arm data and a karyotype; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch10/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC Class XI syllabus topics (t01–t06): **historical aspects and the cell theory with Virchow's modification**, size and shape, prokaryotic versus eukaryotic and plant versus animal cells; the **cell wall and plasmodesmata**, the **fluid mosaic model (Singer and Nicolson)**, active and passive transport and **facilitated diffusion (uniport, symport, antiport)**; the **endomembrane system** (ER, Golgi complex, lysosomes, vacuoles); **mitochondria, plastids (chloroplast, chromoplast, leucoplast), ribosomes and microbodies**; the **cytoskeleton, cilia, flagella and centrioles** (9 + 2 and nine triplets); the **nucleus** (envelope, chromatin, nucleolus) and **chromosome types by centromere position, with the satellite**.
- No removed topics for this chapter.
- Settings differ from the CBSE 11 chapter 8: cube-shaped model cells (surface-to-volume ratio), a transport-rate graph (diffusion against a carrier), a cell-fractionation table of marker enzymes, a scale-bar micrograph, a ciliated cell of 250 cilia, a four-chromosome arm-length example and a five-chromosome karyotype. Scientists and dates: Hooke, Leeuwenhoek, Brown, Schleiden, Schwann, Virchow, Singer and Nicolson.

## Shape
- **Part 1 (t01–t03), 18 slides:** title; discovery and the cell theory; size and shape; worked example (cubes of side 2, 4 and 8, ratios 3, 1.5 and 0.75, computed); prokaryotic and eukaryotic cells; plant and animal cells; check (Virchow); cell wall and plasmodesmata; fluid mosaic model (diagram); passive and active transport; uniport, symport and antiport (diagram); worked example (reading the carrier and diffusion graph); check (transport); endomembrane system (diagram); ER, Golgi, lysosomes and vacuoles; check (Golgi); summary; exam tips.
- **Part 2 (t04–t06), 17 slides:** title; mitochondrion and chloroplast (diagram); their regions compared; plastids; worked example (scale bar: 1.8 micrometres, 90 ribosomes in a row); ribosomes and microbodies; check (plastids); cytoskeleton; cilia, flagella and centrioles (diagram); worked example (250 cilia: 5000 axonemal and 6750 basal-body microtubules); check (cilium); nucleus; chromosome types (diagram); worked example (four arm-length pairs classified); check (chromosome type); summary; exam tips.
- **Visuals (27 of 35 slides; no gap longer than one slide):** table 18, flow 2, svg 7.
- **Diagrams (9 SVGs, 18 uses across decks, notes and questions):** fluid mosaic membrane and a **lettered version (A–E)** for two diagram-based questions; uniport, symport and antiport carriers; the endomembrane route from rough ER to secretion and lysosome; mitochondrion and chloroplast; 9 + 2 axoneme and the nine-triplet centriole; four chromosome types and a **lettered version (A–D)** for two diagram-based questions; a **computed transport-rate graph**. Every SVG was rasterised (headless Chromium) and checked by eye; label overlaps and leader lines that crossed other parts were fixed.
- **Narration:** 7–44 words (mean 32), no symbols, unit abbreviations or formulae.

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 (keys a 8, b 8, c 8, d 7); 4 on lettered figures; 6 are deck checks |
| assertion-reason | 5 | 1 (ISC options; keys a c b a d) |
| short, 1 mark | 6 | give-a-reason (5) and analogy (1) |
| fill-blank | 1 | 1 |
| numerical | 5 | 1 (1.2 ratio; surface doubled; 45 units; 1.25 micrometres; 4860 microtubules) |
| short | 8 + 10 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: marker-enzyme fractions of a kidney homogenate, and a five-chromosome karyotype |

- **Difficulty:** d1 12 · d2 39 · d3 19 · d4 2.
- **Competency:** recall 12 · understanding 22 · application 30 · analysis 8. Application or higher is **53% of items (49% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 12 · t02 14 · t03 11 · t04 14 · t05 10 · t06 12.
- **Re-solves:** 12 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A cubes (ratio), symport carrier, smooth ER and a sleeping drug, large nucleoli, cell theory in sealed broth (A-R) · B active transport against facilitated diffusion; (Golgi complex functions or the arrangement of a cilium) · C bacterium against yeast; (route of an antibody protein or the nuclear envelope) · D fluid mosaic model in parts.
- **Long:** A Hooke's cork, a feature shared by bacterium and liver cell, peripheral protein on the lettered membrane, uptake in two cell types, a sodium–potassium pump, dissolved middle lamella, plasma cells, a ripening tomato, centrioles in a root tip, the satellite on the lettered chromosomes, plant cell in pure water (A-R), cilium and basal body (A-R) · B correcting the cell-theory statement, smooth ER, (mitochondrion structure or cytoskeleton filaments) · C plant against animal cell, the membrane model applied, lysosomes and the ER-Golgi link, (peroxisomes and glyoxysomes or four chromosome types) · D endomembrane system in parts; (mitochondrion and chloroplast diagrams or the nucleus and chromosome types).
- Items in the tests are not used on any deck check slide. Stems and options were read so that none states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): 18 maths strings parse; 18 SVG uses / 9 distinct diagrams pass the allow-list; narration clean; 12/12 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Competency band.** The first full bank (92 items) was only 41% application or higher; 20 recall and understanding items that no test or deck used were removed, giving 72 items at 53%.
2. **Test leaks.** A telocentric-letter item was replaced because its stem named a type that the long nucleus question asks for; the facilitated-diffusion assertion-reason was kept out of the long test because the uptake-in-two-cells item reveals it; a cristae item and a yeast item (80S in its stem) were kept out of the long test because mitochondrion and ribosome questions sit in the same test; lysosome and cilia items were checked against the long questions on the same organelles.
3. **Scenario accuracy.** A brown-fat stem was changed to a heart-muscle stem because brown-fat mitochondria are mainly heat producing.
4. **Diagrams after rasterising.** Carrier-panel labels, the nucleus label, the plasma-membrane label (clipped), the transport-graph labels (over the curves), the centriole ring and the cholesterol leader were moved or redrawn; a 9-point label was raised to 10 points.
5. **Originality.** No set-up from CBSE 11 Biology ch08 to ch10 or ICSE 10 ch01 is reused (no Mycoplasma-versus-red-cell division, pancreas pulse-chase, 6000-times magnification, 9 + 2 flagellum count, arm ratios 1, 2 and 11, or potato, castor-endosperm and chilli plastid items); the exact-stem check found no duplicates.

## For a reviewer
- **Symport and antiport.** The syllabus lists uniport, symport and antiport under facilitated diffusion; in many books the sodium–glucose symport and the sodium–potassium antiport are active (secondary and primary) transport. The chapter teaches the three modes as carrier modes that occur in both kinds of transport; the symport item uses a sodium-driven glucose carrier and the antiport item the ATP-driven sodium–potassium pump.
- **Chromosome cut-offs.** The syllabus asks for classification by centromere position. The numbers used for the computed examples (short arm at least 37.5% of the length: metacentric; 25–37.5%: submetacentric; below 25%: acrocentric; none: telocentric) are the writer's Levan-style approximation, and every stem also describes the position in words.
- **Illustrative data.** The carrier constants (maximum 60, half-maximum at 20, diffusion constant 0.25), the marker-enzyme table, the karyotype, the scale-bar values and the ciliated-cell count are model values, not measurements.
- **Sizes and dates.** Mycoplasma about 0.3 micrometre, red blood cell about 7 micrometres, ostrich egg as the largest single cell; filament widths of about 7, 10 and 25 nanometres; Virchow 1855 (some books give 1858); Hooke 1665, Leeuwenhoek 1674, Brown 1831, Schleiden 1838, Schwann 1839, Singer and Nicolson 1972.
- **Endomembrane system.** Mitochondria, chloroplasts and peroxisomes are left out of the system, following the usual textbook rule that their functions are not coordinated with it; the vacuole is included.
