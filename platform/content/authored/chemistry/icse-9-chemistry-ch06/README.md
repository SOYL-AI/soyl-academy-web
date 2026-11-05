# ICSE Class 9 Chemistry, Chapter 6 — Hard and Soft Water; Making Water Potable

`icse-9-chemistry-ch06` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (5 sections), 30 flashcards, 75 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch06_short` (20 marks, 30 min) and `t_icse9chem_ch06_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-chemistry-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch06/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX topics of this chapter: soft and hard water by the action of soap with advantages and disadvantages; temporary and permanent hardness and the salts that cause them; removal of hardness by boiling and by washing soda (balanced equations); making water potable (screening, alum, filtration, chlorination, defluoridation); diseases caused by polluted water (diarrhoea, typhoid, cholera, dysentery, hepatitis A, polio) and their prevention.
- No removed topics for this chapter. Calculations use only simple proportion and percentage from soap-test volumes, doses and case counts; no stoichiometry (the mass-conservation check of the boiling equation is only in `calc.mjs`).
- Class 9 has no board examination; items follow the ICSE 2027 Chemistry specimen style (522): balanced equations, observations, give-reason items, differences, simple numericals with working, a lettered flow diagram, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a three-sample soap test with volumes, a kettle crust, a town dosing alum and chlorine, a village outbreak before and after chlorinating a well, a hostel with excess fluoride) are written by SOYL. Washing soda appears here only as a water-softening reagent (not as a hydrate), so there is no overlap with ch05 or CBSE 10 Science ch02; exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Hard and Soft Water; The soap test; Soap test on four samples; Quick check: reading the soap test; Advantages and disadvantages; How water becomes hard; Temporary and permanent hardness; Quick check: which salt?; Worked example 1: what kind of hardness?; Removing temporary hardness by boiling; Quick check: boiling; Removing hardness with washing soda; Worked example 2: softening a sample; Quick check: choosing a method; Summary; Exam tips. Part 2 (15 slides): Making Water Potable; What makes water unsafe?; A water treatment works; Quick check: killing germs; The role of alum; Worked example 1: how much alum?; Quick check: why alum?; Chlorination and defluoridation; Worked example 2: putting steps in order; Quick check: fluoride; Diseases from polluted water; Preventing water-borne diseases; Quick check: a virus; Summary; Exam tips.
- **Visuals (21 of 31 slides):** flow 5, table 11, svg 2, chem 3.
- **Diagrams (3 distinct SVGs):** the soap test on four samples (soft, hard, temporary hard after boiling, permanent hard after boiling); the water-treatment flow (named, and lettered A–E for a 5-pair match and a structured question). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (the lettered flow has no "chlorine" label so that stage D is not given away; the "To homes" label was moved clear of the edge).
- **Narration:** 4–48 words per slide (mean 27); no symbols, formulae or unit abbreviations; numbers written as words.

## Question bank (75 items, 169 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 28 |
| assertion-reason | 5 | 5 |
| short-1 (terms, equation, observation, odd one out, give reason) | 8 | 8 |
| true-false | 4 | 4 |
| numerical | 7 | 7 |
| fill-blank (5 blanks) | 1 | 5 |
| match-5 (diseases; lettered treatment flow) | 2 | 10 |
| short-2 | 7 | 14 |
| short-3 | 6 | 18 |
| long-10 (structured) | 7 | 70 |

- **Deck-check items:** 8 (6 mcq and 2 true-false; 4 per deck); none is used in a test.
- **Numericals:** 7 one-mark numericals plus calculations inside 5 structured questions (percentage of temporary hardness, doses of alum and chlorine, fluoride to remove, village case percentages).
- **Structured questions:** 7, each 10 marks in 4 or 5 parts with the part marks in the stem; one uses the lettered flow diagram, one asks for labelled soap-test tubes, and equations appear in four of them.
- **Difficulty:** d1 17 · d2 37 · d3 19 · d4 2.
- **Competency:** recall 18 · understanding 16 · application 34 · analysis 7. Application or higher is **55% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** d c b c a.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every number is computed and asserted in `calc.mjs`. Equations were checked for atom balance by the pipeline.
- Structured-question schemes sum to 10 and part marks are shown in each stem; the test items were chosen so that no item names the answer of another item in the same test.

## For a reviewer
- **Equations:** boiling gives CaCO₃ and MgCO₃ (the usual ICSE form; magnesium carbonate is slightly soluble and some books give magnesium hydroxide). Washing soda reactions: CaCl₂ and MgSO₄ with Na₂CO₃ give the carbonate precipitate; Ca(HCO₃)₂ with Na₂CO₃ gives CaCO₃ and NaHCO₃. Soap is taken as sodium stearate in the notes; the scum equation is shown only in the notes' formula list.
- **Advantages and disadvantages:** hard water (taste, calcium, protective coat on lead pipes; wastes soap, scale, dulls cloth) and soft water (lather, no scale; may dissolve lead from pipes). Books vary a little.
- **Alum:** described as potash alum forming a jelly-like precipitate of aluminium hydroxide that traps fine particles. No equation is taught.
- **Treatment order and fluoride:** screening, alum, filtration, chlorination, with defluoridation added where needed. The fluoride limit is quoted as about 1 to 1.5 mg per litre in the notes and 1.5 mg per litre in a numerical; standards differ, so please confirm the value.
- **Doses and data are imagined and illustrative:** soap-test volumes, alum 30 mg per litre, chlorine 0.5 mg per litre (real doses differ), the village outbreak (250 households, 40 then 10) and soap bars per month.
- **Diseases:** cholera, typhoid and diarrhoea are given as bacterial, dysentery as bacteria or amoeba, hepatitis A and polio as viral; signs are simplified; vaccines are mentioned only as "where advised".
