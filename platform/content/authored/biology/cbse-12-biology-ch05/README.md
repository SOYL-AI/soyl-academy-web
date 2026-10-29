# CBSE Class 12 Biology, Chapter 5 — Molecular Basis of Inheritance

`cbse-12-biology-ch05` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (18 + 18 + 17 slides), notes (7 sections), 32 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch05_short` (20 marks, 40 min) and `t_cbse12bio_ch05_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (complement, transcription, translation with the full standard code table, Chargaff, DNA length, nucleosome count, Meselson–Stahl fractions), `svgs.mjs` (base pairs and gel lanes computed), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch05/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01–t06) are covered; the chapter has no removed topics in the 2026-27 syllabus.
- Class 12 depth: Griffith; Avery, MacLeod and McCarty; Hershey–Chase; properties of genetic material and DNA vs RNA; polynucleotide chemistry; the double helix (Chargaff, Wilkins and Franklin, dimensions); nucleoid, histone octamer, nucleosome, eu- and heterochromatin; semi-conservative replication and Meselson–Stahl; replication fork, leading and lagging strands, ligase; central dogma; transcription unit; bacterial (σ, ρ) and eukaryotic transcription (pol I/II/III; splicing, capping, tailing); the genetic code and its features; frameshift and point mutations; tRNA; translation (23S rRNA ribozyme); lac operon; HGP goals, methods and findings; DNA fingerprinting (VNTRs, steps, uses).

## Shape
- **Part 1 (t01–t02), 18 slides:** genome sizes; polynucleotides; double helix; Watson–Crick model; worked example (A 20% → T 20, G 30, C 30; 26 hydrogen bonds); worked example (6.6 × 10⁹ bp ≈ 2.2 m; E. coli ≈ 1.56 mm); packaging; nucleosomes; eu- and heterochromatin; Griffith; Avery and Hershey–Chase; DNA vs RNA; summary; exam tips.
- **Part 2 (t03–t04), 18 slides:** semi-conservative replication; Meselson–Stahl bands; worked example (hybrid 2/2ⁿ for n = 1–4, computed); replication fork; machinery; transcription unit; bacteria vs eukaryotes; genetic code; worked example (template → mRNA → Met–Phe–Gly–Lys, computed with the code table); reading frame and mutations; tRNA; translation; summary; exam tips.
- **Part 3 (t05–t06), 17 slides:** levels of regulation; lac operon diagram; the switch; worked example (i, operator and z mutants); HGP goals; methods; findings; worked example (2% of 3164.7 million ≈ 63.3 million; 0.1% ≈ 3.16 million); basis of fingerprinting; steps; reading a gel; summary; exam tips.
- **Visuals (41 of 53 slides; no gap longer than one slide):** table 25, flow 9, svg 7.
- **Diagrams (7 SVGs, 14 uses across decks and notes):** DNA ladder (complementary strand computed), nucleosomes, Meselson–Stahl tubes (band sizes computed), replication fork, transcription unit, lac operon off and on, DNA fingerprint gel (child's bands built from the mother's and man P's lanes). Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 10–73 words (mean 45); no formulae or symbol strings.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5) |
| assertion-reason | 6 | 1 (keys a b a a c a) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 10 | 1 (A 15% from G 35%; 31 H-bonds; 6.8 µm; 33 million nucleosomes; 75% light after 3 generations; 2 molecules with an original strand; 16 doublet codons; 24 amino acids from 75 nucleotides; 63.3 million coding bases; 3.16 million differences) |
| short | 6 + 7 | 2 / 3 |
| long | 6 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all short/long items.
- **Difficulty:** d1 8 · d2 27 · d3 28 · d4 3 · d5 1.
- **Competency:** recall 16 · understanding 20 · application 22 · analysis 8 · evaluation 1. Application or higher is **46% of items (43% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 9 · t02 13 · t03 8 · t04 18 · t05 7 · t06 12.
- **Cases:** six Griffith/Avery groups (transformation, three deaths, protease vs DNase or an RNase prediction); a short gene (mRNA, 4 amino acids, a nonsense mutation or a frameshift); lac operon mutants from enzyme data (M1 constitutive; inducer; M2 explanations or normal regulation); a paternity fingerprint (P is the father; 2 paternal bands; inheritance or restriction enzymes and Southern blotting).
- **Deck checks:** Chargaff, euchromatin, Hershey–Chase A-R (Part 1); Meselson–Stahl, RNA pol II, ribozyme A-R (Part 2); inducer, HGP chromosome, paternity A-R (Part 3) — all objective.
- **Re-solves:** 20 scripted checks recompute keys from `calc.mjs` (strands, mRNAs, translations, Chargaff, lengths, band fractions, gel bands).

## Chapter tests (default blueprints)
- **Short:** A DNase-treated extract, coding strand → mRNA, i-gene mutant (MCQ), purine–pyrimidine width (A-R) · B packaging, template → coding strand and mRNA (2 marks), the fork (3 marks) · C Meselson–Stahl or translation · D lac-mutant case.
- **Long:** A ³⁵S in the supernatant, histones, conservative model, lagging strand, translating an mRNA, a frameshift, repressor on the operator, VNTRs (MCQ), negative regulation, RNA mutation (A-R) · B DNA vs RNA, tRNA, (HGP goals or polymorphism), double helix, (RNA processing or lactose added) · C transcription + (lac operon or the evaluation of fingerprint evidence) · D gene-sequence case, paternity case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 26 maths strings (KaTeX strict + mhchem) parse; 14 SVG uses / 7 distinct diagrams pass the allow-list; narration clean; 20/20 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings; `verify` 67/67, 0 flags.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Arithmetic statement.** A nucleosome solution wrote "3.3 × 10⁷ = 33"; rewritten as a division by 10⁶ (stage-4 lint caught it).
2. **Nonsense-mutation case.** The first draft described a one-base change that actually needed two changes; rewritten as AAA → TAA (one base), giving a chain of only methionine, recomputed by the engine.
3. **Competency honesty.** The first build was 40% application or higher. The fork question was re-pitched to a prediction about two templates, and five application or analysis items were added (an original-strand count, tRNA anticodon pairing, codons → amino acids, genome differences, a single-stranded DNA sample); final 46%.
4. **Word limits and answers stated.** Two case answers were expanded to the 2-mark limit; one case solution now states its answer.
5. **Diagrams after rasterising.** Okazaki-fragment arrowheads now point away from the fork (5′ → 3′); Meselson–Stahl labels moved inside the canvas; the lac caption shortened to fit.

## Facts a reviewer should double-check
- HGP figures (3164.7 million bases; about 30,000 genes; chromosome 1 with 2968 genes and Y with 231; about 1.4 million SNPs; under 2 percent coding).
- E. coli replication rate statement (4.6 × 10⁶ bp in about 18 minutes, roughly 2000 bp per second), as given in the syllabus textbook.
- E. coli DNA length: 4.6 × 10⁶ bp × 0.34 nm = 1.56 mm (computed). Some printed sources give 1.36 mm for the same base-pair count; the chapter uses the computed value consistently.
