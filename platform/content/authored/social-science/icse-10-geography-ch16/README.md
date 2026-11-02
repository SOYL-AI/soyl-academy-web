# ICSE Class 10 Geography, Chapter 16 — Mineral-based Industries: Iron and Steel, Petrochemicals and Electronics

`icse-10-geography-ch16` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (5 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch16_short` (20 marks, 30 min) and `t_icse10geo_ch16_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch16/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Integrated iron and steel plants: raw materials and location factors; t02 Tata Steel (Jamshedpur), Rourkela and Visakhapatnam steel plants; t03 Petrochemical industry: products, key centres and relevance; t04 Electronics industry: key centres and relevance in the modern world.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Tata Steel (private, 1907; Subarnarekha and Kharkai; ore from Noamundi and Joda; coal from Jharia); Rourkela (SAIL, German collaboration, 1959); Visakhapatnam (RINL, public sector as of the early 2020s, with privatisation proposed; shore-based; imported coking coal); Gujarat leading in petrochemicals and Jamnagar among the largest complexes (as of the early 2020s); Bengaluru as the electronic capital and mobile-phone hubs in Noida and Sriperumbudur (as of the early 2020s). Raw-material ratios, transport tonne-km and product shares are illustrative.

## Shape
- **Part 1, 14 slides:** raw materials of the iron and steel industry; inside an integrated steel plant; where steel plants are built; worked example (weighing transport costs); tata Steel, Jamshedpur; rourkela Steel Plant; visakhapatnam Steel Plant; worked example (comparing the three plants); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** what petrochemicals are; the petrochemical tree; key petrochemical centres; why petrochemicals matter; worked example (why Gujarat’s coast attracts petrochemicals); worked example (reading output shares); the electronics industry and its relevance; key electronics centres; worked example (how Bengaluru became the electronic capital); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · diagram 2 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · svg 3 · table 16. Three SVGs (integrated steel plant with input arrows sized to illustrative tonnes per tonne of steel; transport tonne-km at an ore-field site versus a market site; petrochemical product tree with illustrative shares) and a table of electronics centres. Narration 9–73 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys a d c b a c a d) |
| true-false | 5 | 1 |
| fill-blank | 4 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 5 | 1 or 2 (3.2 million t; 3.6 million t; 1070 tonne-km; 50 %; 15.6 %) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 4 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 15 · d2 40 · d3 13 · d4 1.
- **Competency:** recall 22 · understanding 14 · application 24 · analysis 9. Application or higher is **48% of items (62% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 20 · t02 22 · t03 17 · t04 16.
- **Deck checks:** q001, q004, q017 (Part 1); q034, q036, q049 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q003, q018, q035, q025, q031, q033 · II (q065 or q069).
- **Long (40 marks, 60 min):** I q005, q006, q007, q022, q024, q038, q040, q051, q026, q057, q032, q061, q013, q062 · II (q066 or q067 or q068).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (3 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 9/9 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author on Claude Opus 5.5 working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean) and reviewed facts and time-sensitive data.
2. **Fixes.** Application or higher was 42% at first; one true-false and a second match were added and three items reworded as named-place scenarios. CBSE 10 Social Science ch11 set-ups (the 4 : 2 : 1 steel ratio, integrated versus mini plants, the 1854 cotton mill) are not reused.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

