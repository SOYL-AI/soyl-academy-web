# CBSE Class 11 Biology, Chapter 6 — Anatomy of Flowering Plants

`cbse-11-biology-ch06` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (2 sections), 31 flashcards, 76 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch06_short` (20 marks, 40 min) and `t_cbse11bio_ch06_long` (40 marks, 90 min), laid out as the default blueprints. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (real size from magnification, stomatal density and ratio, bundles per square millimetre and per section, leaf layer thicknesses and shares, xylem and phloem patch counts, sample percentages — each asserted with `eq`), `svgs.mjs` (8 SVGs), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; library `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch06/src/build.mjs` (`CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both syllabus topics (t01 tissues and tissue systems; t02 anatomy of dicot and monocot root, stem and leaf). **Secondary growth is not listed in `syllabus.yaml` and is not taught**; the notes say so, and cambium appears only as the strip that makes a dicot-stem bundle "open".
- Depth: apical and intercalary meristems; parenchyma, collenchyma, sclerenchyma (fibres, sclereids); xylem and phloem elements, protoxylem and metaxylem, endarch and exarch; epidermal, ground and vascular systems; radial, conjoint open and closed bundles; dicot and monocot root (endodermis with Casparian strips, pericycle, polyarch xylem, pith), stem (hypodermis, starch sheath, medullary rays, scattered closed bundles) and leaf (palisade and spongy, bundle sheath, isobilateral leaf, bulliform cells).

## Shape
- **Part 1 (t01), 16 slides:** 2 worked examples (real size from magnification; stomatal density), 4 checks. **Part 2 (t02), 16 slides:** 2 worked examples (bundle count by density; leaf layer shares), 3 checks.
- **Diagrams (8 SVGs, 7 uses in decks):** simple tissues, vascular bundle types, dicot root, monocot root, dicot stem, monocot stem (with an enlarged bundle), dicot leaf (named) and the same leaf lettered A–E. All were rasterised and checked by eye; labels were moved to clear the enlarged-bundle inset and the radial-bundle icon.
- **Narration:** 7–60 words (mean 39).

## Question bank (76)
| Type | Count |
|---|---|
| mcq | 26 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 7 (keys a b d a c c d) |
| true-false / fill-blank / match | 4 / 3 / 2 |
| numerical | 6 |
| short | 9 two-mark + 7 three-mark |
| long | 8 |
| case-based | 4 (1 + 1 + 2, part (c) either/or) |

- **Difficulty:** d1 23 · d2 42 · d3 10 · d4 1 (evaluating three wrong student conclusions).
- **Competency:** application or higher is 46% of items (43% of marks).
- **Topic tags:** t01 40 · t02 39.
- **Deck checks:** pear grit, vessel, guard cells, bundle type; dicot root, hypodermis, lettered leaf.

## Chapter tests
- **Short:** A companion cell, medullary rays, ground tissue (MCQ), xylem parenchyma (A-R) · B meristems, endodermis, dorsiventral versus isobilateral · C simple tissues or dicot versus monocot stems · D polyarch root case.
- **Long:** A intercalary meristem, parenchyma, ringed stem, bundle sheath, medullary rays, Casparian strips, pericycle, monocot root (MCQ), sclerenchyma and palisade (A-R) · B collenchyma and sclerenchyma, epidermis, (xylem or phloem elements), vascular bundle types, (dicot stem layers or ground tissue) · C dicot leaf + (student-notes evaluation or dicot root) · D pear and celery case, stomata case.

## Validation
- Author validator: 30 maths strings, 16 SVG uses, narration clean, 10 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- `verify --authored` and `originality --authored` are run by the producer.

## Verifier pass (2026-11-02)
Every question was re-solved from its stem. Fixes: a duplicated magnification set between a numerical and a case part was replaced; tests were re-chosen so no stem gives away another in the same test; the monocot-stem inset labels and the radial-bundle labels were moved after rasterising.

## For a reviewer
- Cambium in a dicot-stem bundle is mentioned only to define "open"; no secondary growth is taught.
- Facts drawn from NCERT: endodermis with Casparian strips of suberin, pericycle as the source of lateral roots, 2–4 xylem patches in dicot roots and more than six in monocot roots, sclerenchymatous hypodermis and absent phloem parenchyma in monocot stems, bulliform cells in grass leaves.
- Eight xylem arms for the monocot root and eight bundles in the dicot-stem ring are drawing choices ("more than six" and "a ring").
- Counts used in numerical items (stomata per field, bundles per field, layer thicknesses, 80-cell sample) are illustrative; micrograph magnifications are invented.
- The drawings are schematic transverse sections, not to scale.
