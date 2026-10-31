# ISC Class 12 Biology, Chapter 13 — Microbes in Human Welfare

`isc-12-biology-ch13` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (6 sections), 30 flashcards, 61 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch13_short` (20 marks, 50 min) and `t_isc12bio_ch13_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch13/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics: household microbes (**Lactobacillus**, **Saccharomyces**, **Propionibacterium**); industrial products (beverages, **penicillin**, citric, acetic, butyric and lactic acids, ethanol, lipase, pectinase, protease, **streptokinase**, **cyclosporin A**, **statins**); **sewage treatment** (primary, secondary, BOD, activated sludge); **biogas** (methanogens, composition, plant); **biocontrol** (ladybird, dragonfly, Bt, Trichoderma, baculoviruses), IPM and the harm of chemical pesticides; **biofertilisers** (Rhizobium, Azospirillum, Azotobacter, Glomus, cyanobacteria).
- Bacterial counts, curd pH values, fermentation masses, BOD falls, oxygen demands and biogas yields are computed by src/calc.mjs, not typed in.

## Shape
- **Decks:** Part 1, 14 slides: Useful microbes; Microbes in household products; How milk becomes curd; Worked example 1: multiplying lactic acid bacteria; Quick check: cheese; Fermented beverages; Antibiotics: the story of penicillin; Organic acids, alcohol and enzymes; Bioactive molecules for medicine; Worked example 2: products of fermentation; Quick check: statins; Quick check: penicillin; Summary; Exam tips. Part 2, 15 slides: Microbes for a cleaner environment; Sewage treatment; Biochemical oxygen demand; Worked example 1: how much did treatment help?; Methanogens and biogas; The biogas plant; Worked example 2: biogas from dung; Quick check: BOD; Biocontrol agents; Integrated pest management and the harm of pesticides; Biofertilisers; Quick check: methanogens; Quick check: Bt; Summary; Exam tips.
- **Visuals (21 of 29 slides):** flow 2, table 14, svg 5.
- **Diagrams (5 SVGs, 12 uses):** sewage treatment plant, BOD bars and biogas plant (copied from CBSE 12 ch08; ISC BOD values 360 → 240 → 24 mg/L); new: a **computed curd pH curve** and a **biocontrol agents** chart. Every SVG was rasterised and checked by eye.
- **Narration:** 8–41 words (mean 28).

## Question bank (61)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 5 | 1 (ISC options; keys a a c a b) |
| short, 1 mark | 2 | give-a-reason |
| fill-blank | 4 | 1 |
| numerical | 4 | 1 |
| short | 7 + 9 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 8 · d2 37 · d3 15 · d4 1.
- **Competency:** recall 14 · understanding 15 · application 27 · analysis 5. Application or higher is **52% of items (58% of marks)**, inside the 45–65 % band.
- **Re-solves:** 6 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A curd-mcq, citric-mcq, floc-mcq, glomus-mcq, penicillin-ar · B curd-short, (cheese-short or biofert-short) · C sewage-short, (biogasplant-short or ipm-short) · D sewage-long.
- **Long:** A swiss-mcq, statin-mcq, cyclosporin-mcq, streptokinase-mcq, lipase-mcq, beverage-mcq, bod-mcq, methanogen-mcq, ladybird-mcq, rhizobium-mcq, bt-ar, primary-ar · B antibiotic-short, bod-short, (biocontrol-short or methanogen-short) · C medicines-short, activated-short, biofert3-short, (pesticide-short or fermentation-short) · D biogas-long, (industry-long or organic-long).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 16 maths strings parse; 12 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 6/6 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes and notes:
1. **Model values.** The BOD stages differ from the CBSE 12 ch08 bank, and every BOD, fermentation and yield figure is computed in `calc.mjs`.
2. **Diagram text.** The curd “Milk” label and the 360 bar label were moved after rasterising.
3. **Originality.** Every stem names its own organism, case, sample or scenario; an exact-stem check against all authored banks and `originality --authored` report no duplicates.

## Facts a reviewer should double-check
- The biogas yield of about 40 litres per kilogram of dung is an approximate figure used only in exercises.
