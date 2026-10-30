# ISC Class 12 Biology, Chapter 6 — Sex Determination, Mutation and Genetic Disorders

`isc-12-biology-ch06` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 13 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch06_short` (20 marks, 50 min) and `t_isc12bio_ch06_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (the Punnett engine with X-linked crosses, copied from ch05), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch06/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics (t01–t05): sex determination in **humans, birds, honey bees and grasshoppers**; sex-linked inheritance of **eye and body colour in Drosophila**, haemophilia and colour blindness; **spontaneous and induced mutation; transition, transversion and frameshift**; Mendelian disorders (phenylketonuria, **α- and β-thalassaemia with their genes**, colour blindness, sickle-cell anaemia); chromosomal disorders (Down’s, Klinefelter’s, Turner’s).
- Sensitive content is factual: the deck and questions state that the father’s sperm decides a child’s sex and that blaming the mother is wrong.

## Shape
- **Part 1 (t01–t02), 14 slides:** four systems; humans; honey bees; Drosophila; haemophilia; worked example (carrier mother × normal father, computed by sex); colour blindness; worked example (colour-blind father × non-carrier mother, computed); summary; exam tips.
- **Part 2 (t03–t05), 13 slides:** spontaneous and induced mutation; point mutations; worked example (classifying four DNA changes); sickle-cell anaemia; other Mendelian disorders; worked example (two carrier parents: 0.25, 0.5, 0.25, computed); chromosomal disorders; summary; exam tips.
- **Visuals (19 of 27 slides; no gap longer than two slides):** table 12, svg 5, flow 2.
- **Diagrams (6 SVGs, 11 uses):** human sex-determination square and X-linked pedigree (copied from ch05); new: four sex-determination systems, an X-linked Punnett square (cells computed from the engine), the sickle-cell codon change with normal and sickled cells, and transition, transversion and frameshift on a short strand. Every SVG was rasterised and checked by eye.
- **Narration:** 6–53 words (mean 32).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 4 | 1 (ISC options; keys d a c b) |
| short, 1 mark | 2 | give-a-reason |
| fill-blank | 5 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1 (16 chromosomes in a drone; 0.0625 for four girls; 0.5 of sons; 0.5 of daughters; 0.25 affected) |
| short | 7 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 6 · d2 34 · d3 20 · d4 2.
- **Competency:** recall 9 · understanding 14 · application 29 · analysis 10. Application or higher is **63% of items (59% of marks)** — problem-based genetics, inside the 45–65 % band.
- **Re-solves:** 13 scripted checks recompute keys from the engine.

## Chapter tests (ISC defaults)
- **Short:** A birds, colour-blind father and son, transversion, Turner’s (MCQ), haemophilia (A-R) · B human 1 : 1; (carrier daughter of a colour-blind father or spontaneous vs induced) · C four sex-determination systems; (point mutations or thalassaemia) · D sex-linked inheritance in parts.
- **Long:** A grasshopper, drone, Drosophila criss-cross, criss-cross pattern, UV, frameshift, HbS at altitude, phenylketonuria, Down’s, Klinefelter’s (MCQ), sickle-cell, birds (A-R) · B phenylketonuria; Klinefelter’s vs Turner’s; (poultry or colour-blind father) · C Morgan’s cross; colour-blind girl; sickle-cell carriers; (Down’s or aneuploidy vs polyploidy) · D sickle-cell in parts; (chromosomal disorders or heterogamety).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 14 maths strings parse; 11 SVG uses / 6 distinct diagrams pass the allow-list; narration clean; 13/13 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Narration.** "males are XY" was rewritten in words for the speech check.
2. **Bank size and balance.** The first build had 58 questions at 67 % application or higher, above the band; four recall items (hemizygous, yellow body, X-rays, Langdon Down) were added, giving 62 at 63 %.
3. **Originality.** Every stem names its own organism, cross or patient, so it cannot be mistaken for a stem in another chapter.

## Facts a reviewer should double-check
- Chromosome numbers of the honey bee (queen 32, drone 16) and colour-blindness frequencies (about 8 percent of males, 0.4 percent of females) follow the textbook.
- Gene names and chromosomes for thalassaemia (HBA1, HBA2 on 16; HBB on 11) follow the textbook.
