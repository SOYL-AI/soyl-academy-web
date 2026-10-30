# ISC Class 12 Biology, Chapter 8 — Gene Expression, Human Genome Project and DNA Fingerprinting

`isc-12-biology-ch08` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (6 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch08_short` (20 marks, 50 min) and `t_isc12bio_ch08_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (complement, transcription, the standard genetic code, translation, codon counts; copied from CBSE 12 ch05), `svgs.mjs` (also computes anticodons and the gel lanes), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch08/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics: **transcription** (transcription unit, template and coding strands, bacterial RNA polymerase with sigma and rho, eukaryotic polymerases I–III) and **processing of hnRNA** (splicing, capping, tailing); the terms **intron, exon, cistron, recon, muton, monocistronic and polycistronic** (definitions only, as the syllabus limits them); the **genetic code** (Gamow, Khorana, Nirenberg, Ochoa; features); **translation** in prokaryotes (charging, initiation, elongation, termination; A and P sites; ribozyme; UTRs); the **lac operon**; the **Human Genome Project** (goals, ESTs and sequence annotation, BAC/YAC, salient features, applications); **DNA fingerprinting** (VNTRs, steps, applications, **ethical issues**).
- DNA structure and replication are in ch07.

## Shape
- **Part 1 (t01–t03), 15 slides:** gene to polypeptide; transcription unit; transcription in bacteria and eukaryotes; processing of hnRNA; gene terms; check; worked example (template → mRNA → peptide, computed); cracking the code; features of the code; translation; worked example (anticodons and a silent change, computed); two checks; summary; exam tips.
- **Part 2 (t04–t06), 16 slides:** regulation, genomes and fingerprints; levels of regulation; the lac operon; worked example (predicting the operon in mutants); check; Human Genome Project goals and methods; salient features; worked example (coding fraction of the genome, computed); check; applications; fingerprinting technique; reading a paternity gel (band matches computed); applications and ethics; check; summary; exam tips.
- **Visuals (23 of 31 slides; no gap longer than two slides):** table 15, svg 5, flow 3.
- **Diagrams (5 SVGs, 12 uses):** transcription unit, lac operon and paternity gel (copied from CBSE 12 ch05; gel lanes rescaled so every band sits inside its lane); new: **hnRNA processing** (exons, introns, cap and poly-A tail) and **translation on a ribosome** (codons, anticodons and amino acids computed from the code). Every SVG was rasterised and checked by eye.
- **Narration:** 8–50 words (mean 35).

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 6 | 1 (ISC options; keys a c b b c a) |
| short, 1 mark | 1 | give-a-reason |
| fill-blank | 3 | 1 |
| numerical | 4 | 1 (1800 nucleotides after splicing; 256 four-base codons; 4 amino acids; 47.5 million coding bp) |
| short | 9 + 10 | 2 / 3 |
| long | 5 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: lac operon mutant strains; paternity gel |

- **Difficulty:** d1 17 · d2 29 · d3 19 · d4 1.
- **Competency:** recall 20 · understanding 14 · application 29 · analysis 3. Application or higher is **48% of items (60% of marks)**, inside the 45–65 % band.
- **Re-solves:** 15 scripted checks recompute mRNAs, peptides, anticodons, codon counts and gel matches.

## Chapter tests (ISC defaults)
- **Short:** A rho mutant, insulin in E. coli, A site, permease (MCQ), operator (A-R) · B features of the code; (operon and genes or ethics of DNA databases) · C hnRNA vs mRNA; (Gamow, Khorana, Nirenberg or fingerprinting steps) · D lac operon in parts.
- **Long:** A coding strand to mRNA, polymerase III, cap, doublet code, frameshift, ribozyme, UAG, i⁻ mutant, chromosome Y, Southern blotting (MCQ), one strand transcribed, VNTRs (A-R) · B template and coding strands; tRNA with anticodon UAC; (SNPs or HGP goals) · C bacterial transcription; translation; lac operon on and off; (ESTs vs annotation or UUU mutations) · D translation in parts; (Human Genome Project or DNA fingerprinting).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 9 maths strings parse; 12 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 15/15 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Worked examples.** The first build of Part 1 had one worked example; a computed anticodon and silent-mutation example replaced a descriptive tRNA slide (the tRNA facts are in the notes and the translation slide).
2. **Diagram text.** Labels at 9 px were raised to 10 px; the intron labels, the stop label and the lowest gel band were moved after rasterising showed overlaps.
3. **Originality.** Every stem names its own gene, strain, sequence or case, so it does not collide with the CBSE 12 ch05 bank by the same author; `originality --authored` reports 0 errors across 221 units.

## Facts a reviewer should double-check
- Gene numbers follow the textbook: the goals cite about 20 000–25 000 genes, the salient features about 30 000 (both are stated, with the later estimate noted).
- Genome figures (3164.7 million bases, average gene 3000 bases, dystrophin 2.4 million, chromosome 1 with 2968 genes and Y with 231, 1.4 million SNPs) follow the textbook.
