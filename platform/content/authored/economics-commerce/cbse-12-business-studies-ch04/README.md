# CBSE Class 12 Business Studies, Chapter 4 — Planning

`cbse-12-business-studies-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters. It is built from `src/` by running `npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch04/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build does the following:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, the narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

A build with errors is parked as `*.wip.json` instead.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 19 slides), notes (6 sections), 30 flashcards, 72 questions (135 marks; 15 case parts and alternatives) |
| `tests.json` | `chapter-test-short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `chapter-test-long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. The two tests share no questions, use no deck-check items, and Section D is case-based. |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce authoring library, unchanged copy), `questions.mjs`, `build.mjs` |

## Scope

The chapter covers all three syllabus topics:

| Topic | Content | Items tagged |
|---|---|---|
| t01 | Concept, the seven features, six points of importance and six limitations | 30 |
| t02 | The seven-step planning process | 15 |
| t03 | Types of plans: single-use and standing; objective, strategy, policy, procedure, method, rule, programme, budget | 25 |
| t01 + t02 | Items covering both | 2 |

### Decks

**Part 1** has 18 slides:
- Content: meaning, primary function, features, planning at three levels, importance, the planning–controlling link, limitations, rigidity vs a dynamic environment, making planning work.
- Visuals: 13, including an SVG bar chart of targets vs actual sales for an imagined paint company.
- Worked examples (2): spotting a feature from a case line; finding limitations in an imagined exporter's case.
- Check slides: 4.

**Part 2** has 19 slides:
- Content: the process, premises, list–weigh–choose, implementation and follow-up, the two families of plans, objectives and strategy, policy and rule, procedure and method, programme and budget.
- Visuals: 14, including an SVG budget bar chart for an imagined weavers' cooperative.
- Worked examples (3): an imagined cloud kitchen through all seven steps; classifying five hotel-handbook statements; a sales budget computed by the build.
- Check slides: 4.

Narration runs 63 words at most per slide, with no symbols.

### Question bank (72 items)

| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 28 | 1 | mostly scenario-based identification; keys a7 b7 c7 d7 |
| assertion-reason | 7 | 1 | keys a4 b1 c1 d1 |
| true-false · fill-blank · match · ordering · numerical | 4 · 3 · 2 · 1 · 1 | 1–2 | ordering: the seven steps; numerical: a sales budget |
| short | 9 + 6 | 2 / 3 | `word_limit` 30–50 / 50–80 |
| long | 6 | 5 | includes the e-bike planning process and an evaluation of planning (d4) |
| case-based | 5 | 4 | Vegam Motors (process), Neelgiri Garments (types of plans), Rasoi Spices (limitations), Sanjeevani Hospital (importance), Kosa Weavers' Cooperative (programme and budget, with a computed part) |

- **Difficulty:** d1 10, d2 35, d3 24, d4 3.
- **Competency:** 57% of items are at application or above, inside the lint band of 45–65%. One-step identification items and the budget numerical are tagged understanding, following the D-035 rule.

## Data and facts

- No real-world statistics or dates are used; the chapter is purely conceptual.
- Every firm, person, handbook and figure is imagined and labelled as such.
- The build computes and asserts these figures:
  - the fair budget: 6,00,000 = 2,40,000 + 1,50,000 + 2,10,000;
  - the sales budgets: 12,000 × 1,250 = 1,50,00,000 and 8,000 × 900 = 72,00,000, with the last quarter 2,200;
  - the regional sales gaps: +4, −8 and 0 lakh.

## Verifier pass (2026-10-29)

- Every key was re-solved from its stem.
- **Classification edge cases:**
  - "Where possible / unless" marks a policy, not a rule.
  - A one-time event schedule is a programme (single-use).
  - A budget for one fair is single-use.
  - Listing options and weighing them are kept as separate steps.
- **Case answers** cite the passage by short quotation, so that no model-answer sentence of 60+ characters repeats served text (the answer-leak contract).
- **Originality:** no NCERT example, exercise or board-paper case is reused (D-036). Case stems name their firm, so no stem duplicates another chapter's.

## Gaps

- Nobody has seen the SVG labels rendered. They are placed by computed coordinates and should be checked at 360 px on staging.
