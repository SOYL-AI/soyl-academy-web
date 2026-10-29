# CBSE Class 12 Business Studies, Chapter 1 — Nature and Significance of Management

`cbse-12-business-studies-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the CBSE 12 Economics standard. Built from `src/`: run `npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch01/src/build.mjs` from `platform/`. The build checks:

- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 17 slides), notes (6 sections), 28 flashcards, 67 questions |
| `tests.json` | `t_cbse12businessstudies_ch01_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-short` / `-long`, item for item, disjoint, no deck-check item |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce library, unchanged), `questions.mjs`, `build.mjs` |

## Scope

All four syllabus topics:

| Topic | Coverage |
|---|---|
| t01 | Concept, effectiveness and efficiency, objectives, characteristics, importance |
| t02 | Management as science, art and profession |
| t03 | Levels and functions |
| t04 | Coordination: meaning, characteristics, need, essence of management |

### Decks

**Part 1:** meaning, the effectiveness and efficiency grid (SVG), objectives, characteristics, importance, and science, art and profession. It has three worked examples:
- judging four imagined units as effective and/or efficient (verdicts computed in the build);
- spotting objectives in case lines;
- planning a 5-mark "profession" answer.

**Part 2:** the levels pyramid (SVG), what each level does, the functions cycle with coordination at its centre (SVG), and the time spent on each function by level. Then the meaning and characteristics of coordination, why it is needed, and why it is the essence of management. It has two worked examples:
- naming functions in a school annual day;
- answering a coordination case step by step.

Each deck has 4 check slides on objective items that are not used in the tests.

### Question bank

The bank covers mcq, assertion-reason, true-false, fill-blank, match, ordering, one numerical, short (2 and 3 marks), long (5 marks) and 5 case-based items.

Every case uses an imagined firm: Kaveri Agro Machines, Sindhu Finance, Godavari Garments, a class visit, and Malabar Coir. Each has an internal choice in part (c) and follows the board pattern of quote the line, name the concept, explain.

## Facts a reviewer should check

- **AIMA:** it has a code of conduct, but membership is not compulsory and the code has no legal force. No law requires a degree or licence to be a manager.
- **Time by level:** the split of time on functions by level is stated qualitatively.
- **Data:** all figures are imagined and computed in the build. No real company is named.

## Gaps

- SVG labels were placed by coordinates and have not been seen rendered; they need a look at 360 px.
