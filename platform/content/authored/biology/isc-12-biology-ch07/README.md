# ISC Class 12 Biology, Chapter 7 — Molecular Basis of Inheritance: DNA and Replication

`isc-12-biology-ch07` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 13 slides), notes (5 sections), 30 flashcards, 61 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch07_short` (20 marks, 50 min) and `t_isc12bio_ch07_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (base pairing, Chargaff ratios, DNA length, nucleosome counts and Meselson–Stahl fractions), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch07/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- The ISC syllabus topics t01–t05 for DNA: **properties of genetic material**; **Griffith**, **Avery–MacLeod–McCarty** and **Hershey–Chase** experiments; contributions of **Miescher, Chargaff, Wilkins and Franklin, Watson and Crick**; the double helix (dimensions, base pairing, antiparallel strands); DNA versus RNA and the three kinds of RNA; **nucleosomes, euchromatin and heterochromatin**, bacterial nucleoid; the **central dogma and reverse transcription**; **semi-conservative replication** with the **Meselson–Stahl** and **Taylor** experiments, DNA polymerase, DNA ligase and Okazaki fragments.
- Transcription, the genetic code, translation, the lac operon, the Human Genome Project and DNA fingerprinting belong to ch08.

## Shape
- **Part 1 (t01–t03), 16 slides:** properties of genetic material; Griffith; Avery, MacLeod and McCarty; Hershey and Chase; check; discovering the double helix; the double helix; worked example (Chargaff’s rules, computed); DNA, RNA and the three RNAs; nucleosomes; worked example (length of human DNA, computed); two checks; summary; exam tips.
- **Part 2 (t04–t05), 13 slides:** the central dogma; reverse transcription; check; semi-conservative replication; Meselson and Stahl; worked example (third-generation fractions, computed); Taylor’s experiment; the replication machinery; check; worked example (replication speed); check; summary; exam tips.
- **Visuals (21 of 29 slides; no gap longer than two slides):** table 12, svg 6, flow 3.
- **Diagrams (6 SVGs):** base-pair ladder, nucleosome, Meselson–Stahl bands and replication fork (copied from CBSE 12 ch05); new: **Griffith’s four injections** and the **Hershey–Chase ³²P / ³⁵S comparison**. Every SVG was rasterised and checked by eye.
- **Narration:** 6–44 words (mean 31).

## Question bank (61)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5) |
| assertion-reason | 5 | 1 (ISC options; keys b a d c b) |
| short, 1 mark | 1 | give-a-reason |
| fill-blank | 3 | 1 |
| numerical | 7 | 1 (15 % adenine; 150 turns; 16 hydrogen bonds; 50 nucleosomes; 1.7 mm; 0.875 light; 85 nm) |
| short | 8 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: Meselson–Stahl density table; Hershey–Chase radioactivity table |

- **Difficulty:** d1 16 · d2 29 · d3 15 · d4 1.
- **Competency:** recall 11 · understanding 21 · application 25 · analysis 4. Application or higher is **48% of items (50% of marks)**, inside the 45–65 % band.
- **Re-solves:** 11 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A ³⁵S label, HIV enzyme, euchromatin, first-generation hybrid band (MCQ), uniform helix width (A-R) · B Griffith’s mice; (three RNAs or Chargaff with 22 % thymine) · C Avery’s experiment; (double-helix features or Taylor-type labelling) · D transformation in parts.
- **Long:** A S strain capsule, DNase, Miescher, Franklin, G–C content, histones, reverse transcription, Taylor, Okazaki joining, slow polymerase (MCQ), continuous synthesis, RNA world (A-R) · B four properties; nucleosome; (central dogma or polymerase vs ligase) · C Hershey–Chase; packaging; Meselson–Stahl; (leading and lagging strands or RNA virus genome) · D replication fork in parts; (contributors and DNA diagram or packaging of 2.2 m of DNA).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 27 maths strings parse; 13 SVG uses / 6 distinct diagrams pass the allow-list; narration clean; 11/11 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Deck flow.** The title-slide flow had a self-loop; it was redrawn as a straight chain.
2. **Bank size and difficulty.** The first build had 51 questions and no difficulty-4 item; ten items were added (transcription with blocked ribosomes, reverse-transcriptase fill, TMV A-R, NHC proteins, euchromatin vs heterochromatin, 5′-end polarity, nucleoside, pitch numerical, ori, and a d4 analysis of what dispersive replication would have shown).
3. **Originality.** Every stem names its own experiment, organism or sequence, so it does not collide with the CBSE 12 ch05 bank by the same author; `originality --authored` reports 0 errors across 220 units.

## Facts a reviewer should double-check
- Dimensions follow the textbook: 0.34 nm between base pairs, pitch 3.4 nm, about 10 bp per turn, about 200 bp per nucleosome, 6.6 × 10⁹ bp (about 2.2 m) of DNA per human diploid cell.
- The *E. coli* replication figures in the long question (4.6 × 10⁶ bp in 18 minutes, about 2000 bp per second per fork) follow the textbook.
