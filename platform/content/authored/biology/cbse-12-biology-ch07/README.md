# CBSE Class 12 Biology, Chapter 7 — Human Health and Disease

`cbse-12-biology-ch07` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (14 + 16 + 17 slides), notes (6 sections), 32 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch07_short` (20 marks, 40 min) and `t_cbse12bio_ch07_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (percentages, antibody chain counts, a model primary/secondary antibody-response curve), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch07/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04) are covered; the chapter has no removed topics in the 2026-27 syllabus.
- Class 12 depth: health and its determinants; typhoid, pneumonia, common cold, dengue, chikungunya, malaria (Plasmodium life cycle, haemozoin), amoebiasis, ascariasis, filariasis and ringworm with pathogens, symptoms and spread; personal and public hygiene and vector control (Gambusia); innate barriers, acquired immunity, B and T cells, H₂L₂ antibodies, primary and secondary responses, active and passive immunity, vaccines (hepatitis B from yeast), allergy, autoimmunity, lymphoid organs and MALT; HIV and AIDS (macrophages, reverse transcriptase, helper T cells, ELISA, prevention, NACO); cancer (contact inhibition, benign vs malignant, carcinogens, proto-oncogenes, detection, treatment); opioids, cannabinoids, cocaine, tobacco and alcohol; adolescence, addiction, dependence, withdrawal, prevention.
- **Treatment of sensitive content:** drug and alcohol content is factual and preventive (sources, effects, harms, warning signs, help) and never describes how to obtain or use drugs. HIV content stresses that casual contact carries no risk and that people living with HIV must not be excluded.
- Dengue and chikungunya are named in the syllabus but not described in detail in the textbook; their symptoms here are standard public-health descriptions (reviewer note below).

## Shape
- **Part 1 (t01), 14 slides:** what affects health; typhoid and pneumonia; viral and fungal diseases; protozoan and helminth diseases; Plasmodium life cycle; worked example (pathogen, route and targeted prevention for three diseases); prevention and control; worked example (Gambusia: 480 → 72 larvae, 85 percent fall); summary; exam tips.
- **Part 2 (t02), 16 slides:** innate barriers; acquired immunity; primary and secondary responses (computed curve); antibody structure; worked example (3 antibodies → 6 H + 6 L chains; secondary peak about 5.7 times the primary in the model); active and passive immunity; vaccines; allergy and autoimmunity; lymphoid organs; worked example (classify four cases); summary; exam tips.
- **Part 3 (t03–t04), 17 slides:** HIV spread; how HIV causes AIDS; worked example (helper T cells 900 → 350, about 61 percent fall); preventing AIDS; cancer; causes, detection, treatment; abused drugs; tobacco and alcohol; adolescence and dependence; worked example (18 of 60 students, 30 percent, peer pressure); prevention; summary; exam tips.
- **Visuals (35 of 47 slides; no gap longer than two slides):** table 27, flow 5, svg 3.
- **Diagrams (3 SVGs, 6 uses across decks and notes):** Plasmodium life cycle in two hosts, antibody (H₂L₂), primary and secondary responses (curve computed). Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 7–70 words (mean 44).

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 | 1 (keys a 8, b 8, c 7, d 7) |
| assertion-reason | 6 | 1 (keys a a a c d b) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1 (75% larvae fall; 20 chains in 5 antibodies; 62.5% helper T-cell fall; 30% peer pressure) |
| short | 7 + 7 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 19 short/long items.
- **Difficulty:** d1 11 · d2 37 · d3 21 · d4 2.
- **Competency:** recall 15 · understanding 23 · application 29 · analysis 3 · evaluation 1. Application or higher is **46% of items (48% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 21 · t02 21 · t03 16 · t04 13.
- **Cases:** a district’s monsoon disease register (mosquito-borne diseases, 55 percent of cases, vector control or a contaminated well); antibody levels after a first dose and a booster (secondary response, 6 times, memory cells or why boosters); helper T-cell records of an untreated HIV infection (macrophages, 80 percent fall, time lag or early testing and treatment); reasons adolescents gave for first use (curiosity, 30 percent peer pressure, school measures or dependence).
- **Deck checks:** Plasmodium fertilisation, Aedes, ringworm A-R (Part 1); H₂L₂, passive immunity, memory A-R (Part 2); helper T cells, tumours A-R, nicotine (Part 3) — all objective.
- **Re-solves:** 8 scripted checks recompute the numerical keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A typhoid diagnosis, kidney graft rejection, HIV no-risk situation (MCQ), typhoid carriers (A-R) · B typhoid vs pneumonia, benign vs malignant (2 marks), how HIV causes immunodeficiency (3 marks) · C Plasmodium life cycle or cancer · D booster-dose case.
- **Long:** A pneumonia, amoebiasis and houseflies, dengue and coolers, physiological barriers, pollen allergy, UV as a carcinogen, alcohol withdrawal, anabolic steroids (MCQ), vaccines, smoking (A-R) · B ringworm and towels, anti-tetanus serum vs vaccine, (allergy or carbon monoxide), village prevention plan, (innate vs acquired or harms of abuse) · C immunity + (HIV in school evaluation or school prevention programme) · D outbreak case, HIV-record case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 24 maths strings (KaTeX strict + mhchem) parse; 6 SVG uses / 3 distinct diagrams pass the allow-list; narration clean; 8/8 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Competency honesty.** The first build was 39% application or higher. Two items were re-pitched (a common-cold diagnosis from symptoms; a reverse-transcriptase-blocking drug) and four application items were added (malaria from a blood smear, snake antivenom, swollen tonsils, CT/MRI for spread); a carbon-monoxide answer was correctly tagged as application. Final 46%.
2. **A-R balance.** The smoking and tumour A-R items were rewritten (a true-but-irrelevant reason; a false claim that benign tumours spread), giving keys a a a c d b.
3. **Notation.** A subscript written as plain text ("T_H") was removed from a slide.

## Facts a reviewer should double-check
- Dengue and chikungunya symptoms (standard public-health descriptions, not textbook text).
- The antibody-response curve is a labelled model, not measured data; helper T-cell and survey numbers in examples and cases are illustrative SOYL data.
