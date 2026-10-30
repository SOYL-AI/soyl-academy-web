# ISC Class 12 Biology, Chapter 5 — Principles of Inheritance

`isc-12-biology-ch05` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (6 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch05_short` (20 marks, 50 min) and `t_isc12bio_ch05_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (an independent Punnett engine: gametes, crosses, phenotype ratios, ABO, X-linked crosses, recombination frequency, polygenic classes — copied from CBSE 12 Biology ch04, same author), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch05/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics (t01–t06): terms (homologous chromosomes, autosomes, sex chromosomes, alleles, genotype, phenotype); Mendel’s principles and **reasons for his success**; monohybrid and dihybrid crosses, **back cross and test cross**; incomplete dominance (snapdragon), codominance and multiple alleles (ABO); polygenic inheritance (skin colour) and **pleiotropy (phenylketonuria, starch synthesis in pea)**; **pedigree analysis**; chromosomal theory, linkage and crossing over. Sex determination, sex-linked inheritance, mutation and genetic disorders belong to ch06.

## Shape
- **Part 1 (t01–t02), 14 slides:** terms; reasons for Mendel’s success; monohybrid cross; laws of dominance and segregation; worked example (test cross 1 : 1, computed); dihybrid cross; independent assortment; worked example (1600 seeds → 900, 300, 300, 100, computed); summary; exam tips.
- **Part 2 (t03–t06), 15 slides:** snapdragon; ABO; worked example (Iᴬi × Iᴮi: each group 1/4, computed); polygenic and pleiotropy; worked example (three genes: 7 classes, 1/64, computed); pedigree symbols; reading a pedigree; linkage and crossing over; worked example (120 of 1000 → 12 percent, computed); summary; exam tips.
- **Visuals (21 of 29 slides; no gap longer than two slides):** table 13, svg 6, flow 2.
- **Diagrams (7 SVGs, 16 uses):** Punnett squares for Tt × Tt, RrYy × RrYy and snapdragon Rr × Rr (cells computed by the engine), linkage and crossing over, pedigree symbols with an X-linked example (copied from CBSE 12 Biology ch04), and two new numbered pedigrees — autosomal dominant (three generations) and autosomal recessive with consanguineous parents — for pedigree questions. Every SVG was rasterised and checked by eye.
- **Narration:** 8–48 words (mean 31).

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6), 2 on the numbered pedigree |
| assertion-reason | 4 | 1 (ISC options; keys a b c d) |
| short, 1 mark | 2 | give-a-reason |
| fill-blank | 1 | 1 |
| numerical | 11 | 1 (4 and 8 gametes; 200 dwarf; 300 round green; 0.67 heterozygous; 200 pink; 0.25 group O; 5 classes; 0.0625; 0.25 from the pedigree; 17 percent) |
| short | 7 + 8 | 2 / 3, including Punnett squares, a paternity question and a four-gene map |
| long | 4 | 5, in marked parts (one on the numbered pedigree) |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 13 · d2 29 · d3 18 · d4 3.
- **Competency:** recall 7 · understanding 16 · application 30 · analysis 10. Application or higher is **63% of items (70% of marks)** — high, because genetics is problem-based, and inside the 45–65 % band.
- **Topic tags:** t01 6 · t02 18 · t03 14 · t04 7 · t05 7 · t06 11.
- **Re-solves:** 22 scripted checks recompute keys from the Punnett engine.

## Chapter tests (ISC defaults)
- **Short:** A test cross, group O, snapdragon, recessive from unaffected parents (MCQ), segregation (A-R) · B genotype vs phenotype; (independent assortment or polygenic vs pleiotropy) · C monohybrid Punnett square; (snapdragon F2 or recessive pedigree features) · D dihybrid cross in parts.
- **Long:** A Mendel’s traits, dominance, F1 genotype, rryy fraction, AB × O, codominance, phenylketonuria, pedigree pattern, Drosophila, gene order (MCQ), linked genes, ABO (A-R) · B test cross; pedigree symbols; (paternity or chromosomal theory) · C Mendel’s success; dihybrid as product; pea starch gene; (linkage or four-gene map) · D numbered pedigree in parts; (deviations with an ABO cross or Morgan’s linkage).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 30 maths strings parse; 16 SVG uses / 7 distinct diagrams pass the allow-list; narration clean; 22/22 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Narration.** Two narrations said "F1" and "F2", which the speech check refuses; they now say "first hybrid generation" and "second generation".
2. **Word limit.** The 3-mark pedigree-features answer was below 50 words and was expanded with reasons.
3. **Originality.** The segregation assertion-reason item was 73 % similar to a CBSE 12 Biology ch04 item (same author); it was rewritten around flower colour (VV × vv) so that it is specific to this chapter.
4. **Diagram after rasterising.** In the dominant pedigree the mating line of II-4 crossed a sibling’s symbol; the siblings were reordered so the affected daughter stands next to her husband.

## Facts a reviewer should double-check
- The recombination values 1.3 and 37.2 percent are the textbook’s examples of tight and loose linkage.
- Pedigrees are illustrative families, not real data; their keys follow from the rules stated in the notes.
