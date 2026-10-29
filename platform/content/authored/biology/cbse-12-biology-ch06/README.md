# CBSE Class 12 Biology, Chapter 6 — Evolution

`cbse-12-biology-ch06` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (17 + 18 + 14 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch06_short` (20 marks, 40 min) and `t_cbse12bio_ch06_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (Hardy–Weinberg from q² or p, allele frequency from counts, percentages, selection curves), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch06/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes to another folder for a trial build). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04) are covered; the chapter has no removed topics in the 2026-27 syllabus. The geological-period survey is not taught.
- Class 12 depth: origin of the universe and Earth (textbook figures), Pasteur, Oparin–Haldane, Miller; fossils and rock layers; homologous and analogous organs with animal and plant examples, divergent and convergent evolution; molecular homology; embryological evidence with von Baer's caution; industrial melanism and anthropogenic selection; Darwin and Wallace, fitness, Lamarck; adaptive radiation (Darwin's finches, Australian marsupials) and convergence with placental mammals; de Vries and saltation; Hardy–Weinberg (p + q = 1, p² + 2pq + q² = 1) and the five disturbing factors (gene flow, drift and founder effect, mutation, recombination, selection); stabilising, directional and disruptive selection; human evolution from Dryopithecus and Ramapithecus to Homo sapiens with brain capacities, cave art and agriculture.

## Shape
- **Part 1 (t01), 17 slides:** timeline; early ideas and Pasteur; chemical evolution; Miller; worked example (controlled Miller-type set-ups); fossils; homologous forelimbs; homology vs analogy; worked example (classify four pairs); molecular and embryological evidence; peppered moths and resistance; summary; exam tips.
- **Part 2 (t02–t03), 18 slides:** Darwin and Wallace; natural selection and fitness; Lamarck vs Darwin; adaptive radiation; de Vries; Hardy–Weinberg; the p–q square; worked example (q² = 0.16 → q 0.4, p 0.6, carriers 0.48); worked example (36 : 48 : 16 → p = 0.6, in equilibrium); disturbing factors; selection curves; three types of selection; summary; exam tips.
- **Part 3 (t04), 14 slides:** timeline; early hominins; brain chart; worked example (habilis → erectus 12.5 percent; erectus → Neanderthal about 55.6 percent); erectus and Neanderthals; Homo sapiens and culture; worked example (15 million ÷ 18 000 ≈ 833); trends; summary; exam tips.
- **Visuals (37 of 49 slides; no gap longer than one slide):** table 26, flow 6, svg 5.
- **Diagrams (5 SVGs, 10 uses across decks and notes):** Miller's apparatus, homologous forelimbs as bone blocks, three types of selection (curves computed), Hardy–Weinberg square (areas computed from p = 0.7), brain-capacity bar chart. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 10–64 words (mean 43).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5) |
| assertion-reason | 6 | 1 (keys c c a a a d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1 (42% carriers from 9% affected; p = 0.7 from counts; 9.5% carriers from 1 in 400; 16% recessive from p = 0.6; 55.6% brain increase) |
| short | 6 + 6 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 9 · d2 25 · d3 25 · d4 2 · d5 1.
- **Competency:** recall 12 · understanding 16 · application 28 · analysis 5 · evaluation 1. Application or higher is **55% of items (55% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 17 · t02 14 · t03 20 · t04 13.
- **Cases:** peppered-moth samples (dark form favoured, 80 percent, selection or clean-air prediction); a village survey of a recessive condition (q = 0.2, 320 carriers, carriers vs affected or gene flow); finch beak depth after a drought (directional selection, 0.6 mm, explanation or wet-year prediction); four skull casts (Homo habilis, Neanderthal man, brain trend or modern humans and cave art).
- **Deck checks:** Miller, analogous organs, peppered-moth A-R (Part 1); adaptive radiation, 2pq for p = 0.7, founder-effect A-R (Part 2); Homo habilis, Neanderthals, humans-and-apes A-R (Part 3) — all objective.
- **Re-solves:** 11 scripted checks recompute Hardy–Weinberg values, allele frequencies and percentages from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A whale flipper and bat wing, finch beak, birth weight, Hardy–Weinberg equilibrium (A-R) · B penguin and dolphin flippers, Lamarck vs Darwin (2 marks), q² = 0.25 (3 marks) · C evidence of evolution or the Hardy–Weinberg long answer · D peppered-moth case.
- **Long:** A rock layers, pesticide resistance, rural moths, the blacksmith, de Vries, insecticide resistance, disruptive selection, order of hominins (MCQ), von Baer, fitness (A-R) · B adaptive radiation, stabilising vs directional, (brain trend or founder birds), Darwin's theory, (disturbing factors or comparing three hominins) · C Darwin with finches + (stages of human evolution or the "just a theory" evaluation) · D village Hardy–Weinberg case, finch-drought case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 43 maths strings (KaTeX strict + mhchem) parse; 10 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 11/11 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Arithmetic statements.** Two solutions wrote "0.42 = 42" and "0.095 = 9.5"; rewritten as a multiplication by 100 (stage-4 lint caught them).
2. **Bank size.** The first build had 59 questions; three application items were added (Australopithecines from their features, q² from p = 0.6, marsupial and placental moles), giving 62.
3. **Bank near-duplicate.** The originality gate found one homology MCQ stem identical to a CBSE 10 Science item; it was reworded as a comparison of four pairs.
4. **Diagrams after rasterising.** The forelimb blocks were rescaled so the bat's limb fits, and the legend moved clear of the columns.

## Facts a reviewer should double-check
- The textbook figures for the age of the universe (about 20 billion years), the Earth and early life, and the approximate times and brain capacities of hominins.
- Peppered-moth and finch numbers in cases are illustrative SOYL data, labelled as samples, not historical counts.
