# ISC Class 11 Biology, Chapter 2 — Biological Classification: Domains, Kingdoms and Monera

`isc-11-biology-ch02` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 16 slides), notes (4 sections), 30 flashcards, 77 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch02_short` (20 marks, 50 min) and `t_isc11bio_ch02_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (kingdom table and counts, magnification, binary-fission growth, Gram percentage, biogas yield; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs` (not edited here). Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch02/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC Class XI syllabus topics (t01–t04): three domains (Woese) and five kingdoms (Whittaker); structure of a bacterial cell, classification by shape, nutrition and respiration, Gram-positive and Gram-negative bacteria; reproduction (**definitions only** for fission, conjugation, transduction, transformation), archaebacteria (methanogens, halophiles, thermoacidophiles) and Mycoplasma (PPLO); economic importance (sewage treatment, antibiotics, biogas, curd, cheese).
- **Removed topic respected:** no mechanism, diagram or stage of conjugation, transduction or transformation is taught or asked.

## Shape
- **Part 1 (t01–t02), 18 slides:** domains and their tree; five kingdoms; worked example (placing three organisms); labelled bacterial cell and parts; worked example (magnification, 2 micrometres to 2 millimetres); shapes; nutrition and respiration; Gram walls and staining steps; four checks; summary; exam tips.
- **Part 2 (t03–t04), 16 slides:** four definitions; worked example (growth by fission, 500 to 32000 in 4 hours); archaebacteria; Mycoplasma; comparison; sewage treatment; biogas; worked example (gas from dung, illustrative yield); antibiotics, curd and cheese; four checks; summary; exam tips.
- **Visuals (24 of 34 slides; no gap longer than two slides):** table 15, flow 5, svg 4.
- **Diagrams (5 SVGs, 11 uses):** the three-domain tree; a labelled bacterial cell; a **lettered (A–E) version of the cell** for three diagram-based questions; shapes of bacteria; Gram-positive and Gram-negative envelopes. Every SVG was rasterised and checked by eye.
- **Narration:** 7–42 words (mean 28).

## Question bank (77)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7), 3 on the lettered cell |
| assertion-reason | 7 | 1 (ISC options; keys c b b c d a a) |
| short, 1 mark | 4 | give-a-reason (2) and analogy (2) |
| fill-blank | 3 | 1 |
| true-false | 2 | 1 |
| match | 1 | 2 |
| numerical | 7 | 1 (2 kingdoms; 0.5 mm; 60 percent; 10 times; 32 and 4800 cells; 1.6 cubic metres) |
| short | 9 + 9 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: Gram smears and a curd culture |

- **Difficulty:** d1 19 · d2 48 · d3 9 · d4 1.
- **Competency:** recall 16 · understanding 22 · application 33 · analysis 5 · evaluation 1. Application or higher is **51% of items (51% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 16 · t02 23 · t03 26 · t04 13.
- **Re-solves:** 7 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A Woese, chain-forming cocci, tetanus bacterium, uptake of naked DNA, Mycoplasma and penicillin (A-R) · B Gram-positive against Gram-negative; (curd or sewage) · C three bacterial products; (bacterial structures or three extreme habitats) · D five kingdoms in parts.
- **Long:** A Whittaker's year, wholly prokaryotic kingdom, Eukarya, a silica-shelled protist, wall materials, three questions on the lettered cell, chemoautotroph, fission, Gram colours (A-R), obligate anaerobe (A-R) · B three domains; nucleoid and plasmid; (Mycoplasma or definitions) · C domains compared; kingdoms compared; shapes and nutrition; (a d4 two-organism placement or Mycoplasma features) · D Archaea in parts; (bacterial cell in parts or economic importance).
- Items in the tests are not used on any deck check slide. Topics overlap inside each test because the chapter is small; stems were read so that none states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): 0 maths strings; 11 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 7/7 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-03)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Word limits.** Five three-mark answers (domains, kingdoms, bacterial classification, extreme habitats, products) were list-style answers shorter than 50 words and were given a 25–90 word limit.
2. **Diagram labels.** The “Plasma membrane” label was clipped on the left; the Gram-negative panel was crowded and was redrawn with labels beside the bands; a stray caption on the domain tree was removed; the cytoplasm label was moved off the plasmid leader.
3. **Test leaks.** A-R items whose statements repeated an answer of another item in the same long test (sewage digestion, Gram colours) were swapped for items on other slices.
4. **Originality.** Set-ups differ from CBSE 11 Biology ch01 and ch02 (no hot-spring isolate, salt-pan worker, biogas-plant cow, red tide, Nostoc or campus-survey items; new Gram smear, curd culture, acid mine drain, paddy-field methane and lettered cell). The exact-stem check found no duplicates against the ISC 11 or CBSE 11 worktrees.

## Facts a reviewer should double-check
- The mesosome is drawn and listed because ISC textbooks do so; many modern workers regard it as a fixation artefact (noted in the notes).
- Archaeal walls: the notes say some have pseudomurein or protein, never peptidoglycan; the Gram-negative wall is drawn with a thin peptidoglycan layer in the periplasm.
- On the ribosomal RNA tree Archaea are sister to Eukarya; the domain tree follows this.
- Biogas yield of 0.04 cubic metre per kilogram of dung, the growth figures and the 100-cell smear counts are illustrative, not measured data.
- Mycoplasma size 0.1 micrometre and bacterial size 1 to 5 micrometres are textbook round values.
