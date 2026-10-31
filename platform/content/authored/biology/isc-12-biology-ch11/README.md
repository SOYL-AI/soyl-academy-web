# ISC Class 12 Biology, Chapter 11 — Human Health and Disease: Infections, Cancer and Allergies

`isc-12-biology-ch11` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 14 slides), notes (4 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch11_short` (20 marks, 50 min) and `t_isc12bio_ch11_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch11/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics: viral (common cold, chikungunya, dengue) and bacterial (typhoid with the **Widal test**, pneumonia, diphtheria, plague) diseases; protozoan (amoebiasis, malaria with the **life cycle of Plasmodium**), helminthic (ascariasis, filariasis) and fungal (ringworm) diseases with prevention; **cancer** (benign and malignant tumours, contact inhibition, metastasis, causes, diagnosis, treatment); **allergies** (allergens, IgE, mast cells, histamine, symptoms). Immunity, AIDS and substance abuse are in ch12.
- Widal titres, fever-bout timings, cell doublings and percentages are computed by src/calc.mjs, not typed in.

## Shape
- **Decks:** Part 1, 16 slides: Infectious diseases; Viral diseases; Bacterial diseases; Typhoid and the Widal test; Quick check: typhoid; Worked example 1: reading a Widal test; Amoebiasis; Malaria and the life cycle of Plasmodium; The malaria fever cycle; Worked example 2: predicting the next bout; Worm and fungal diseases; Prevention and control; Quick check: vectors; Quick check: haemozoin; Summary; Exam tips. Part 2, 14 slides: Cancer and allergies; Contact inhibition; Benign and malignant tumours; Causes of cancer; Worked example 1: how many divisions make a tumour?; Diagnosis of cancer; Treatment of cancer; Quick check: contact inhibition; Worked example 2: biopsy results; Allergies; Quick check: metastasis; Quick check: allergens; Summary; Exam tips.
- **Visuals (22 of 30 slides):** flow 3, table 15, svg 4.
- **Diagrams (4 SVGs, 10 uses):** Plasmodium life cycle (copied from CBSE 12 ch07, with the fever wording changed to the 48-hour vivax cycle); new: a **computed malaria fever chart** (bouts every 48 hours), **contact inhibition** in culture, and **benign vs malignant tumours** with metastasis. Every SVG was rasterised and checked by eye.
- **Narration:** 9–51 words (mean 31).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5) |
| assertion-reason | 6 | 1 (ISC options; keys a a c a b d) |
| short, 1 mark | 3 | give-a-reason |
| fill-blank | 5 | 1 |
| numerical | 3 | 1 |
| short | 7 + 9 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 14 · d2 26 · d3 21 · d4 1.
- **Competency:** recall 17 · understanding 15 · application 23 · analysis 7. Application or higher is **48% of items (59% of marks)**, inside the 45–65 % band.
- **Re-solves:** 5 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A cold-mcq, dengue-mcq, sporozoite-mcq, contact-mcq, typhoid-ar · B viral-short, (mosquito-short or cancer-short) · C typhoid-short, (malaria-short or diagnosis-short) · D plasmodium-long.
- **Long:** A plague-mcq, diphtheria-mcq, pneumonia-mcq, anopheles-mcq, amoeba-mcq, filaria-mcq, ringworm-mcq, carcinogen-mcq, chemo-mcq, ige-mcq, vector-ar, metastasis-ar · B bacterial-short, helminth-short, (carcinogen-short or allergy-short) · C widal-short, prevention-short, treatment-short, (compare-short or allergy-short3) · D cancer-long, (infections-long or allergy-long).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 19 maths strings parse; 10 SVG uses / 4 distinct diagrams pass the allow-list; narration clean; 5/5 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes and notes:
1. **Marks.** A 1.5-mark scheme step was replaced by whole marks.
2. **Diagram text.** A clipped “RBCs burst” label and an overlapping “new tumour” label were moved after rasterising.
3. **Originality.** Every stem names its own organism, case, sample or scenario; an exact-stem check against all authored banks and `originality --authored` report no duplicates.

- **Gate fix (2026-10-31).** verify flagged a minor numeric.final on the tumour-doubling numerical; the solution now states k = 20 in a maths step.

## Facts a reviewer should double-check
- Vivax malaria bouts are shown every 48 hours (tertian); the textbook’s “every 3–4 days” covers all species.
- Biopsy, outbreak and Widal figures in worked examples and cases are invented for the exercises.
