# ICSE Class 10 Geography, Chapter 18 — Waste Management

`icse-10-geography-ch18` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 31 flashcards, 75 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch18_short` (20 marks, 30 min) and `t_icse10geo_ch18_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch18/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Impact of waste accumulation: spoilage of landscape, pollution and health hazards; t02 Need for waste management; t03 Key terms in brief: global warming, acid rain, eutrophication, biomagnification and thermal pollution; t04 Methods of safe disposal: segregation, dumping and composting; t05 Reduce, reuse and recycle: need and methods.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): As of the early 2020s: Solid Waste Management Rules 2016 require segregation at source; several single-use plastic items banned from July 2022; Indore ranked cleanest city in several national surveys. Swachh Bharat Mission launched in 2014; the 1994 Surat plague linked to poor sanitation after floods (worth a reviewer’s check); Ghazipur and Deonar dumps; Minamata; DDT and thin eggshells; green bin wet, blue bin dry; compost ready in about six to eight weeks. Household waste, town compost and food-chain concentration figures are illustrative.

## Shape
- **Part 1, 15 slides:** spoilt landscapes and pollution; health hazards; why waste management is essential; worked example (trouble at a city dump); global warming and acid rain; eutrophication; thermal pollution; biomagnification; worked example (reading the food chain); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** segregation at source: the first step; what is in a household bin?; worked example (how much can a household divert?); dumping: open dumps and sanitary landfills; inside a sanitary landfill; composting and vermicomposting; worked example (landfill or compost?); reduce, reuse, recycle; good practice in Indian cities and schools; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · diagram 4 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 4 · table 17. Four SVGs (illustrative household waste breakdown with computed shares; sanitary landfill cross-section; layered compost pit; illustrative pesticide concentrations rising along a food chain). Narration 9–70 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (75)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys a b a d c a b a) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 5 | 1 or 2 (20 %; 73 kg; 66 tonnes; 16.5 tonnes; 4 times) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 6 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 23 · d2 42 · d3 9 · d4 1.
- **Competency:** recall 11 · understanding 29 · application 25 · analysis 8 · evaluation 2. Application or higher is **47% of items (44% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 11 · t02 9 · t03 21 · t04 25 · t05 16.
- **Deck checks:** q001, q011, q018 (Part 1); q035, q038, q040 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q003, q019, q037, q051, q025, q017, q048 · II (q071 or q073).
- **Long (40 marks, 60 min):** I q002, q004, q012, q020, q021, q036, q039, q055, q042, q057, q047, q031, q010, q049 · II (q072 or q074 or q075).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (4 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author on Claude Opus 5.5 working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean) and reviewed facts and time-sensitive data.
2. **Fixes.** Clipped labels in two diagrams were fixed after rendering; the first build was otherwise clean.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

