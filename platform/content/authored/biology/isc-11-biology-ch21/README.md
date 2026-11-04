# ISC Class 11 Biology, Chapter 21 — Chemical Coordination and Integration

`isc-11-biology-ch21` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 18 slides), notes (5 sections), 30 flashcards, 86 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch21_short` (20 marks, 50 min) and `t_isc11bio_ch21_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (a negative-feedback model of thyroxine and TSH, a glucose-tolerance model, calcium shortfall, urine volumes, counts; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs` (shared by the ISC 11 chapters, not edited here). Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch21/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC Class XI syllabus topics (t01–t05): the **endocrine glands and their location**, the **hypothalamus and pituitary hormones** and **feedback control** of the tropic hormones (thyroxine); hormones of the **pineal, thymus, thyroid and parathyroid**; hormones of the **adrenal glands, pancreas, gonads and gastrointestinal tract** (gastrin, secretin, GIP, CCK-PZ); the **mechanism of hormone action** (cyclic AMP as a second messenger, and steroid hormones); and the disorders **dwarfism, acromegaly, cretinism, goitre, exophthalmic goitre (Graves disease), Addison disease, diabetes mellitus and diabetes insipidus**.
- No removed topics for this chapter. The hormone ANF (atrial natriuretic factor) belongs to the excretion chapter in this course and is not asked here.

## Shape
- **Part 1 (t01–t02), 17 slides:** hormones and chemical coordination; nervous and endocrine coordination; the endocrine glands of the human body; check (location); the hypothalamus and the pituitary; hormones of the pituitary; check (pituitary); negative feedback control of thyroxine; worked example (thyroxine at 40 percent, TSH 160 percent, and the first steps of recovery); the feedback loop over time; thyroid gland; parathyroid, pineal and thymus; worked example (calcium 7.6 against a lower limit of 9: 1.4 mg per dL, 15.6 percent); check (calcium); check (feedback); summary; exam tips.
- **Part 2 (t03–t05), 18 slides:** hormones of the body and their action; adrenal glands; check (adrenal); control of blood glucose; pancreatic hormones; the glucose tolerance test; worked example (two subjects: rises 57 and 130 mg per dL, fall 18.4 percent, verdicts); check (tolerance test); hormones of the gonads and the gut; how hormones act on cells; two mechanisms compared; check (mechanism); disorders of growth, thyroid and adrenal glands; diabetes mellitus and diabetes insipidus; worked example (12 L against 1.5 L: 8 times, 10.5 L extra, 84 L a week); check (disorders); summary; exam tips.
- **Visuals (25 of 35 slides; no gap longer than two slides):** table 16, flow 2, svg 7.
- **Diagrams (8 SVGs, 16 uses):** the **endocrine glands on the human body**; a **lettered body (A–E)** for two diagram-based questions; the **hypothalamus and pituitary**; the **thyroxine feedback loop** and its **computed time course**; **blood glucose control** by insulin and glucagon; a **glucose tolerance test** (computed); and the **mechanism of action** of protein and steroid hormones. Every SVG was rasterised and checked by eye.
- **Narration:** 8–44 words (mean 30).

## Question bank (86)
| Type | Count | Marks |
|---|---|---|
| mcq | 33 | 1 (keys a 9, b 8, c 8, d 8), 1 on the lettered figure |
| assertion-reason | 4 | 1 (ISC options; keys c b a d) |
| short, 1 mark | 5 | give-a-reason (3) and analogy (2) |
| fill-blank | 3 | 1 |
| true-false | 3 | 1 |
| numerical | 5 | 1 (150 percent; 0.9 mg per dL; 75 mg per dL; 40.6 percent; 6 times) |
| match | 1 | 2 (endocrine disorders and causes) |
| short | 12 + 12 | 2 / 3 |
| long | 6 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: three thyroid blood-test patterns and a glucose tolerance test |

- **Difficulty:** d1 20 · d2 44 · d3 21 · d4 1.
- **Competency:** recall 15 · understanding 29 · application 35 · analysis 7. Application or higher is **49% of items (39% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 20 · t02 16 · t03 24 · t04 11 · t05 15.
- **Re-solves:** 7 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A jet-lag tablet (pineal), fatty food in the duodenum (CCK-PZ), the position of a lipid-soluble hormone's receptor, a short girl with normal proportions, glucagon (A-R) · B oxytocin and vasopressin; (thyroid hormones or adrenal medulla) · C rats without parathyroids; (testis and ovary or mineralocorticoids and glucocorticoids) · D diabetes mellitus, diabetes insipidus and goitre in parts.
- **Long:** A cut portal vessels, thyroid failure symptoms, iodised salt, dilute urine, acromegaly, Graves disease, prolactin, aldosterone, labour and oxytocin, cyclic AMP in the liver, a fall in TSH (A-R), two hormones for calcium (A-R) · B lettered glands C and D; why steroids enter cells; (Addison disease or tropic hormones) · C pineal and thymus; three thyroid disorders; thyroxine, calcitonin and parathormone; (diabetes mellitus against insipidus or an anterior pituitary tumour) · D adrenal gland in parts; (pancreas in parts or mechanism of hormone action in parts).
- Items in the tests are not used on any deck check slide. Stems were read so that no stem or option states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): maths strings parse; 16 SVG uses / 8 distinct diagrams pass the allow-list; narration clean; scripted re-solves pass; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Feedback model.** A first draft of the loop used a gain that left thyroxine stuck at about 67 percent of the set point; the update rule was corrected so thyroxine returns to the set point from above and from below, and `calc.mjs` asserts this.
2. **Glucose model.** The glucose-tolerance values from the first draft (147, 150, 138 for the healthy subject) did not match the model and were recomputed to 146, 147, 134; the diabetic values were recomputed to 224, 261, 270.
3. **Word limits and difficulty.** Three answers were too short for their limits (the pituitary long answer, the thyroid hormones comparison and the gonad hormones answer) and were expanded; the bank had no difficulty-4 item, and an analysis item on high thyroxine with high TSH was added.
4. **Exact stem.** The match item stem duplicated the ISC 11 ch19 disorder match and was reworded for endocrine disorders.
5. **Diagrams after rasterising.** The pituitary captions overlapped and were spread apart; the lower connectors of the glucose diagram did not touch their boxes; the mechanism diagram's boxes and labels were clipped and were redrawn; the set-point label was clipped at the right edge and moved inside the plot.
6. **Originality.** Set-ups differ from CBSE 11 Biology ch19 (a surgeon at the base of the brain, a cut portal-vessel experiment, thyroxine tablets that shrink the thyroid, iodised salt, a jet-lag tablet, a girl with normal proportions, rats without parathyroids, a deer and a tiger, a castrated bull, cortisone tablets, three blood-test patterns, a glucose tolerance test; no dye, rings-and-shoes, hill goitre, night-shift nurse, ANF or erythropoietin items). The exact-stem check found no duplicates after fix 4.

## Facts a reviewer should double-check
- **Feedback model:** TSH is taken as 100 plus the shortfall of thyroxine (percent of normal) and thyroxine gains one quarter of the gap each step; this is an illustrative proportional loop, not a measurement.
- **Glucose values:** a fasting range of 70 to 110 mg per dL and tolerance-test limits of 126 (fasting) and 200 (two hours) are common clinical values; textbooks sometimes give 80 to 120 for the normal range. The tolerance curves are produced by a simple model and the subject data in the questions are invented.
- **Calcium range:** 9 to 11 mg per dL is an illustrative round range (books give about 9 to 10.5).
- **Hormone details:** TRH, CRH, GnRH and GHRH are given as examples of releasing hormones and somatostatin as an inhibiting hormone; MSH is mentioned for the intermediate lobe only in the notes; the thyroid hormones are written as thyroxine (T4) and triiodothyronine (T3); oxytocin and ADH are made in the hypothalamus and released from the posterior pituitary.
- **Mechanism:** protein hormones act through cyclic AMP; thyroid hormones are lipid soluble and act on nuclear receptors like steroids, although they are amino acid derivatives; a note says so.
- **Disorders:** gigantism is mentioned as the childhood counterpart of acromegaly; Graves disease is described as autoimmune; goitre is placed under iodine deficiency; simple goitre and exophthalmic goitre are treated as two different disorders.
- **Gut hormones:** gastrin, secretin, CCK-PZ and GIP are given with the usual textbook actions (GIP inhibits gastric secretion and movement); some books add that GIP stimulates insulin release.
