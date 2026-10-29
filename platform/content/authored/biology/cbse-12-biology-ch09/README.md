# CBSE Class 12 Biology, Chapter 9 — Biotechnology: Principles and Processes

`cbse-12-biology-ch09` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 15 slides), notes (4 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch09_short` (20 marks, 40 min) and `t_cbse12bio_ch09_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (complement, reverse complement, palindrome test, restriction digest, expected site frequency, PCR copies, gel migration), `svgs.mjs` (EcoRI strands, gel bands and PCR bars computed), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch09/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both syllabus topics (t01–t02) are covered; the chapter has no removed topics in the 2026-27 syllabus. Two decks are used because the syllabus has two topics.
- Class 12 depth: definition of biotechnology; genetic and bioprocess engineering; Cohen and Boyer; restriction enzymes (history, naming, exo- vs endonucleases, palindromes, sticky ends), ligase; agarose gel electrophoresis and elution; vector features, pBR322, insertional inactivation, blue-white screening, Ti plasmid and retroviruses; competence (calcium, heat shock), micro-injection, biolistics; DNA isolation; PCR with primers and Taq polymerase; ligation, transformation and selection; continuous culture; stirred-tank bioreactors; downstream processing.

## Shape
- **Part 1 (t01), 18 slides:** two core techniques; first recombinant DNA; restriction enzymes and naming; palindromes and sticky ends; worked example (palindrome test on four sequences, computed); why sticky ends matter; gel electrophoresis; worked example (EcoRI digest of a strand into 3 fragments; about 5 sites expected in 20 480 bp, both computed); pBR322; vector features; insertional inactivation; plant and animal vectors and competence; summary; exam tips.
- **Part 2 (t02), 15 slides:** DNA isolation; cutting; PCR; worked example (2¹⁰ = 1024; 2³⁰ ≈ 1.07 × 10⁹); ligation, transformation, selection; obtaining the product; bioreactors; downstream processing; worked example (ordering a full project); summary; exam tips.
- **Visuals (25 of 33 slides; no gap longer than two slides):** table 14, flow 6, svg 5.
- **Diagrams (5 SVGs, 10 uses across decks and notes):** EcoRI cut with sticky ends, agarose gel with ladder and sample, pBR322 map, PCR cycle with doubling bars, stirred-tank bioreactor. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 7–71 words (mean 43).

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 5 | 1 (keys a b a c a) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (3 fragments from a cut circle; 4 fragments from a linear strand; 32 four-base sites in 8192 bp; 4 × 2²⁵; 10 cycles for 1000 copies; 3 × 2¹⁰ = 3072) |
| short | 6 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 10 · d2 29 · d3 23 · d4 2.
- **Competency:** recall 14 · understanding 20 · application 27 · analysis 2 · evaluation 1. Application or higher is **47% of items (48% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 37 · t02 27.
- **Cases:** plasmid digests on a gel (one EcoRI site, 4.4 kb, migration or staining and elution); ampicillin/tetracycline replica plating (recombinants, 25 percent, insertional inactivation or blue-white); forensic PCR from 50 copies (Taq, 52 428 800 copies, primers and contamination or denaturation); batch vs continuous culture (log phase, 70 percent, bioreactor control or downstream processing).
- **Deck checks:** EcoRI name, sticky-ends A-R, BamHI insert (Part 1); Taq, stirrer, ethanol A-R (Part 2) — all objective.
- **Re-solves:** 13 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A palindrome, gel distance, cellulase (MCQ), Ti plasmid (A-R) · B BamHI palindrome, competence (2 marks), gel electrophoresis (3 marks) · C tools of rDNA technology or the full process · D gel case.
- **Long:** A Cohen and Boyer, anode, ampicillin selection, white colonies, gene gun, primers, continuous culture, order of steps (MCQ), gel sieving, Taq (A-R) · B definition, EcoRI naming, (downstream or continuous culture), vector features, (pBR322 selection or PCR) · C selection of recombinants + (PCR evaluation or bioprocessing) · D replica-plating case, forensic PCR case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 25 maths strings parse; 10 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 13/13 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings; `verify` 64/64, 0 flags.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Deck schema.** A seven-bullet worked example exceeded the six-bullet limit; two steps were combined.
2. **Bank size and competency.** The first build had 58 questions at 38% application or higher. Two items were re-pitched (an RNA-contaminated preparation; a gene without an ori) and six application items added (matching sticky ends, kanamycin selection, micro-injection, a cut circle, chitinase, PCR from 3 copies), giving 64 at 47%.
3. **Verify flags.** Two numerical solutions now state their final value explicitly; the forensic PCR key is the exact copy number.
4. **Diagrams after rasterising.** The pBR322 map was enlarged so the EcoRI and PstI labels sit inside the canvas.

## Facts a reviewer should double-check
- The pBR322 map is schematic: positions of sites are illustrative, but which genes contain BamHI, SalI, PvuI and PstI follow the textbook.
- The gel migration scale is a labelled model (distance roughly linear in −log size), not measured data.
