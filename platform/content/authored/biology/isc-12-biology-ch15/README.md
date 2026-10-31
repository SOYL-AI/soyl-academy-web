# ISC Class 12 Biology, Chapter 15 — Biotechnology and its Applications

`isc-12-biology-ch15` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 13 slides), notes (6 sections), 30 flashcards, 61 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch15_short` (20 marks, 50 min) and `t_isc12bio_ch15_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch15/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics: **micropropagation**, meristem culture and **somatic hybridisation**; advantages of **GM crops**; **Bt crops** (cry genes), **RNAi** against *Meloidogyne incognita*, **golden rice**; **genetically engineered insulin**, recombinant vaccines and **stem cells**; **gene therapy** for ADA deficiency (SCID) and molecular diagnosis (PCR, ELISA, probes); **transgenic animals** (α-1-antitrypsin, Rosie and α-lactalbumin, vaccine and chemical safety); **biosafety, GEAC, biopiracy** (basmati, turmeric, neem) and biopatents.
- Plantlet numbers, insulin chain arithmetic, protein yields and percentages are computed by src/calc.mjs, not typed in.

## Shape
- **Decks:** Part 1, 17 slides: Biotechnology at work; Plant tissue culture; Micropropagation multiplies plants fast; Worked example 1: how many plantlets?; Somatic hybridisation; Genetically modified crops; Bt crops; RNA interference against a nematode; Quick check: meristem culture; Golden rice; Genetically engineered insulin; Worked example 2: the insulin molecule; Vaccines and stem cells; Quick check: Bt toxin; Quick check: insulin; Summary; Exam tips. Part 2, 13 slides: Healing, testing and the questions it raises; Gene therapy for ADA deficiency; Worked example 1: how many cells were corrected?; Molecular diagnosis; Quick check: ADA; Transgenic animals; Worked example 2: Rosie the cow; Biosafety, GEAC and biopatents; Cases of biopiracy; Quick check: transgenic products; Quick check: biopiracy; Summary; Exam tips.
- **Visuals (22 of 30 slides):** flow 3, table 14, svg 5.
- **Diagrams (5 SVGs, 12 uses):** Bt toxin action, insulin chains and RNAi (copied from CBSE 12 ch10); new: a **micropropagation multiplication chart** (plantlet counts computed) and **protoplast fusion** to a somatic hybrid. Every SVG was rasterised and checked by eye.
- **Narration:** 8–42 words (mean 27).

## Question bank (61)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 3 | 1 (ISC options; keys a b c) |
| short, 1 mark | 1 | give-a-reason |
| fill-blank | 4 | 1 |
| numerical | 4 | 1 |
| short | 7 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 7 · d2 36 · d3 17 · d4 1.
- **Competency:** recall 12 · understanding 19 · application 26 · analysis 4. Application or higher is **49% of items (57% of marks)**, inside the 45–65 % band.
- **Re-solves:** 6 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A somatic-mcq, goldenrice-mcq, lilly-mcq, probe-mcq, cry-ar · B microprop-short, (bt-short or stemcell-short) · C rnai-short, (insulin-short or biopiracy-short) · D gene-long.
- **Long:** A meristem-mcq, gmadv-mcq, bollworm-mcq, rnai-mcq, proinsulin-mcq, allergy-mcq, ada-mcq, pcrdiag-mcq, alpha-mcq, geac-mcq, biopiracy-ar, antisense-ar · B diag-short, transgenic-short, (ethics-short or goldenrice-short) · C somatic-short, gm-short, gene-short, (probe-short or transgenic3-short) · D tissue-long, (gmcrop-long or transgenic-long).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 17 maths strings parse; 12 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 6/6 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes and notes:
1. **Diagram text.** The “Fusion (PEG)” label was moved off the potato protoplast after rasterising.
2. **Originality.** Stems are built around named scenarios (orchid nursery, Bt cotton district, family probe test) to avoid the CBSE 12 ch10 bank.
3. **Originality.** Every stem names its own organism, case, sample or scenario; an exact-stem check against all authored banks and `originality --authored` report no duplicates.

- **Gate fix (2026-10-31).** originality found the RNAi 3-mark stem 85 percent similar to a CBSE 12 ch10 stem; it was rewritten around a tobacco farmer’s nematode problem.

## Facts a reviewer should double-check
- Yields in the Bt cotton case and the gene-therapy cell counts are invented for the exercises.
