# CBSE Class 12 Biology, Chapter 10 — Biotechnology and its Applications

`cbse-12-biology-ch10` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (13 + 14 + 12 slides), notes (4 sections), 32 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch10_short` (20 marks, 40 min) and `t_cbse12bio_ch10_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (percentage change, percentage share, protein mass from concentration and volume, insulin chain lengths), `svgs.mjs` (insulin chains drawn from the chain lengths), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch10/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04) are covered; the chapter has no removed topics in the 2026-27 syllabus.
- Class 12 depth: three options for food production and GMOs; uses of GM plants and golden rice; Bt toxin (protoxin, alkaline activation, midgut pores and lysis; lepidopterans, coleopterans, dipterans); cry genes (cryIAc, cryIIAb, cryIAb); RNAi against *Meloidogyne incognita* (sense and antisense RNA via *Agrobacterium*); recombinant therapeutics (30 worldwide, 12 in India); insulin structure, proinsulin and C peptide, Eli Lilly 1983; ADA gene therapy (1990, retroviral vector, periodic infusions, permanent cure via early embryonic cells); molecular diagnosis (PCR, radioactive probes and autoradiography, ELISA); stem cells; transgenic animals and their five uses; Rosie (1997); GEAC; patents, basmati, turmeric and neem; biopiracy; second amendment of the Indian Patents Bill.

## Shape
- **Part 1 (t01), 13 slides:** GMOs; uses of GM crops; Bt and cry genes; how Bt toxin kills; worked example (Bt cotton: yield +31.3 %, sprays −66.7 %, computed); nematode problem and RNAi; RNAi tobacco; worked example (matching problems to Bt, RNAi and golden rice); summary; exam tips.
- **Part 2 (t02), 14 slides:** recombinant therapeutics; insulin chains; Eli Lilly process; worked example (21 + 30 = 51 amino acids, computed); gene therapy and ADA deficiency; ADA gene therapy steps; molecular diagnosis; stem cells; worked example (choosing PCR, probe or ELISA); summary; exam tips.
- **Part 3 (t03–t04), 12 slides:** transgenic animals and uses; Rosie; worked example (2.4 g/L × 5 L = 12 g, computed); biosafety and GEAC; patents and biopiracy; worked example (judging three cases for biopiracy); summary; exam tips.
- **Visuals (27 of 39 slides; no gap longer than two slides):** table 19, flow 5, svg 3.
- **Diagrams (3 SVGs, 6 uses across decks and notes):** Bt toxin action flow, proinsulin and mature insulin with disulphide bridges, RNAi in tobacco. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 8–62 words (mean 37).

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7) |
| assertion-reason | 6 | 1 (keys a b d c d a) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 4 | 1 (yield +30 %; sprays −70 %; 51 amino acids; 36 g protein in 15 L) |
| short | 6 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 17 · d2 34 · d3 15 · d4 2.
- **Competency:** recall 16 · understanding 20 · application 28 · analysis 2 · evaluation 2. Application or higher is **47% of items (51% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 20 · t02 23 · t03 13 · t04 12.
- **Cases:** Bt cotton field comparison (activation, +25 %, toxin specificity or protoxin); proinsulin and Eli Lilly (C peptide, chain B 58.8 %, why separate chains or why recombinant insulin); transgenic cow and mice (definition, 48 g per day, polio vaccine safety or other uses); village remedy patented abroad (biopiracy, GEAC, authorisation and compensation or biosafety).
- **Deck checks:** protoxin, RNAi A-R, cry gene (Part 1); insulin chains, periodic infusions, ELISA A-R (Part 2); mice, biopiracy A-R, GEAC (Part 3) — all objective.
- **Re-solves:** 7 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A protoxin, insulin chains, mice (MCQ), biopiracy (A-R) · B GEAC (2 marks), Bt toxin (2 marks), insulin production (3 marks) · C pest-resistant crops or ADA treatments · D Bt cotton case.
- **Long:** A cry gene, acidic gut, early HIV, probe, ADA, polio vaccine, α-1-antitrypsin, GEAC (MCQ), RNAi, ELISA (A-R) · B PCR diagnosis, Rosie, (transgenic animal or ELISA screening), RNAi tobacco, (ADA gene therapy or biopiracy) · C ethical issues + (molecular diagnosis or transgenic animals) · D insulin case, biopiracy case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 17 maths strings parse; 6 SVG uses / 3 distinct diagrams pass the allow-list; narration clean; 7/7 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Competency.** The first draft was at 39 % application or higher. Four items were re-pitched as scenarios (a permanent ADA cure, ELISA at a blood bank, GM mustard release, Rosie’s milk) and two application items added (an RNAi design for a root-feeding worm; PCR before testing a tumour gene), giving 68 at 47 %.
2. **Diagrams after rasterising.** The insulin label positions were moved inside the canvas, and the disulphide bridges were redrawn at A7–B7 and A20–B19 with the A chain aligned under the B chain.
3. **Accuracy.** The vaccine-safety answer now says transgenic mice *could* replace monkeys for polio-vaccine testing, as the syllabus text puts it.

## Facts a reviewer should double-check
- The insulin diagram is schematic: chain lengths (21 and 30) are exact, and the two inter-chain bridges sit at A7–B7 and A20–B19; the intra-chain bridge of chain A is not drawn.
- Field figures (yields, sprays) in worked examples and cases are illustrative, not survey data; their percentages are computed.
- The stem-cell slide and notes go slightly beyond the textbook text, as the syllabus topic names stem cell technology.
