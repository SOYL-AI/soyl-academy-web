# ISC Class 12 Biology, Chapter 12 — Immunity, AIDS and Substance Abuse

`isc-12-biology-ch12` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch12_short` (20 marks, 50 min) and `t_isc12bio_ch12_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch12/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: **innate immunity** (physical, physiological, cellular and cytokine barriers; interferons); **acquired immunity** (active and passive, humoral and cell-mediated; primary and secondary lymphoid organs, MALT); **antibody structure** and **IgG, IgA, IgM, IgD, IgE**, vaccination, immunisation and autoimmunity; **AIDS** (HIV, transmission, replication of the retrovirus, diagnosis by **ELISA**, prevention); **alcohol, smoking and drugs** (opioids, cannabinoids, cocaine, barbiturates), reasons for addiction, prevention and control.
- Antibody chain counts, response peaks, ELISA cut-offs, pack-years and percentages are computed by src/calc.mjs, not typed in.

## Shape
- **Decks:** Part 1, 17 slides: Immunity; Innate immunity: four kinds of barrier; Interferons; Acquired immunity and memory; Worked example 1: comparing the two responses; Humoral and cell-mediated immunity; Active and passive immunity; Lymphoid organs; Quick check: passive immunity; Antibody structure; Five classes of antibodies; Worked example 2: counting chains; Vaccination, immunisation and autoimmunity; Quick check: antibody classes; Quick check: interferons; Summary; Exam tips. Part 2, 16 slides: AIDS and substance abuse; AIDS and HIV; Replication of HIV in the host; Course of the disease; Diagnosis by ELISA; Worked example 1: reading an ELISA; Prevention of AIDS; Quick check: HIV; Drugs of abuse; Alcohol and smoking; Worked example 2: pack-years; Addiction: reasons, dependence and prevention; Quick check: drugs; Quick check: smoking; Summary; Exam tips.
- **Visuals (25 of 33 slides):** flow 2, table 19, svg 4.
- **Diagrams (4 SVGs, 10 uses):** antibody structure and the primary and secondary responses (copied from CBSE 12 ch07; response curve computed); new: **replication of HIV in a helper T-cell** and an **ELISA plate** whose positives are computed from the cut-off. Every SVG was rasterised and checked by eye.
- **Narration:** 7–43 words (mean 31).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6) |
| assertion-reason | 6 | 1 (ISC options; keys a a d b c a) |
| short, 1 mark | 2 | give-a-reason |
| fill-blank | 4 | 1 |
| numerical | 3 | 1 |
| short | 7 + 9 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 12 · d2 28 · d3 21 · d4 1.
- **Competency:** recall 15 · understanding 18 · application 24 · analysis 5. Application or higher is **47% of items (55% of marks)**, inside the 45–65 % band.
- **Re-solves:** 7 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A barrier-mcq, cmi-mcq, igm-mcq, hivcell-mcq, interferon-ar · B innate-short, (activepassive-short or drugsource-short) · C hivrep-short, (lymphoid-short or smoking-short) · D immunity-long.
- **Long:** A colostrum-mcq, igg-mcq, thymus-mcq, vaccine-mcq, autoimmune-mcq, rt-hiv-mcq, opportunistic-mcq, poppy-mcq, cocaine-mcq, nicotine-mcq, co-ar, graft-ar · B humoral-short, ig-short, (aidsspread-short or addiction-short) · C memory-short, elisa-short, drugs-short, (antibodyclass-short or prevention-short) · D aids-long, (antibody-long or drugs-long).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 17 maths strings parse; 10 SVG uses / 4 distinct diagrams pass the allow-list; narration clean; 7/7 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes and notes:
1. **Bank size and word limits.** The first build had exactly 60 questions and one short model answer; an assertion-reason item and a fill-blank were added and the answer expanded.
2. **ELISA edge case.** Sample S5 equals the cut-off and is reported as not positive, with a retest note.
3. **Originality.** Every stem names its own organism, case, sample or scenario; an exact-stem check against all authored banks and `originality --authored` report no duplicates.

## Facts a reviewer should double-check
- Antibody-class proportions (IgG about 75–80 percent) and the 5–10-year HIV incubation period are approximate textbook values.
- Pack-year, ELISA and survey figures are invented for the exercises.
