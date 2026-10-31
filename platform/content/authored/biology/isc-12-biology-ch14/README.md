# ISC Class 12 Biology, Chapter 14 — Biotechnology: Principles and Processes

`isc-12-biology-ch14` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch14_short` (20 marks, 50 min) and `t_isc12bio_ch14_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch14/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics: definition and principles of biotechnology; **isolation of DNA** and **gel electrophoresis**; **restriction enzymes** (discovery, naming, EcoRI and Hind II, palindromes, sticky ends) and ligase; steps of recombinant DNA technology; **cloning vectors** (features; pBR322, Ti plasmid, retroviruses, BAC, YAC); transfer into **competent hosts** (heat shock, microinjection, gene gun) and **selection** (antibiotic resistance, insertional inactivation, blue-white); **PCR** and in vivo amplification; **stirred-tank and sparged-tank bioreactors** and downstream processing.
- Restriction fragments, palindrome checks, expected site counts, gel order, PCR copy numbers and colony percentages are computed by src/calc.mjs and src/svgs.mjs, not typed in.

## Shape
- **Decks:** Part 1, 17 slides: Biotechnology; Definition and principles; Isolating genomic DNA; Gel electrophoresis; Worked example 1: sizing fragments on a gel; Restriction enzymes: discovery and naming; How EcoRI cuts DNA; Worked example 2: cutting a sequence; Joining DNA and the steps of recombinant DNA technology; Quick check: isolating DNA; Features of a good cloning vector; The plasmid pBR322; Other vectors; Quick check: palindromes; Quick check: ori; Summary; Exam tips. Part 2, 17 slides: From recombinant DNA to product; Making host cells competent; Other methods of gene transfer; Selecting recombinants; Blue-white selection; Worked example 1: counting recombinants; Quick check: competence; Gene amplification by PCR; Worked example 2: how many copies?; Amplification in vivo; Bioreactors; Stirred-tank and sparged-tank bioreactors; Downstream processing; Quick check: PCR enzyme; Quick check: insertional inactivation; Summary; Exam tips.
- **Visuals (26 of 34 slides):** flow 4, table 16, svg 6.
- **Diagrams (6 SVGs, 16 uses):** EcoRI sticky ends, agarose gel, pBR322 map, PCR doubling and stirred-tank bioreactor (copied from CBSE 12 ch09; the EcoRI duplex and gel sample sizes differ); new: a **blue-white selection plate** with colony colours computed. Every SVG was rasterised and checked by eye.
- **Narration:** 7–41 words (mean 30).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6) |
| assertion-reason | 5 | 1 (ISC options; keys a a c b d) |
| fill-blank | 4 | 1 |
| numerical | 5 | 1 |
| short | 7 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 10 · d2 34 · d3 17 · d4 1.
- **Competency:** recall 12 · understanding 20 · application 25 · analysis 5. Application or higher is **48% of items (55% of marks)**, inside the 45–65 % band.
- **Re-solves:** 11 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A lysis-mcq, sticky-mcq, marker-mcq, genegun-mcq, palindrome-ar · B principles-short, (nomen-short or heatshock-short) · C gel-short, (sticky-short or pcr-short) · D rdna-long.
- **Long:** A ethanol-mcq, gel-mcq, ecori-mcq, hind-mcq, ori-mcq, yac-mcq, calcium-mcq, bluewhite-mcq, taq-mcq, stirred-mcq, insertion-ar, competent-ar · B vector-short, bluewhite-short, (invivo-short or downstream-short) · C isolation-short, restriction-short, selection-short, (agro-short or bioreactor-short) · D vector-long, (pcr-long or bioreactor-long).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 10 maths strings parse; 16 SVG uses / 6 distinct diagrams pass the allow-list; narration clean; 11/11 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes and notes:
1. **Worked examples.** Part 1 first had one worked example; a computed gel-sizing example was added.
2. **Originality.** Four stems matched the CBSE 12 ch09 bank exactly (competent cells, stirred tank, PCR cycles, primers) and were rewritten around their own scenarios.
3. **Word limit.** One case answer was expanded.
4. **Originality.** Every stem names its own organism, case, sample or scenario; an exact-stem check against all authored banks and `originality --authored` report no duplicates.

- **Gate fix (2026-10-31).** verify flagged a minor numeric.final on the PCR-cycles numerical; the solution now states n = 10 in a maths step.

## Facts a reviewer should double-check
- pBR322 site positions follow the textbook map schematically, not to scale.
