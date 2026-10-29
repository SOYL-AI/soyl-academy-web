# CBSE Class 12 Business Studies, Chapter 5 — Organising

`cbse-12-business-studies-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters. Built from `src/`: run `npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch05/src/build.mjs` from `platform/`. The build checks:

- the schema
- the pipeline lint and the deterministic verify checks
- word limits and narration rules
- the answer-leak scan
- the editorial counts

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. `src/lib.mjs` is the shared CBSE 12 economics-commerce lib, copied unchanged.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 20 slides), notes (6 sections), 30 flashcards, 76 questions (140 marks; 15 case parts) |
| `tests.json` | `chapter-test-short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short`; `chapter-test-long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long` |

## Scope

All four syllabus topics are covered. The number in brackets is how many questions are tagged with that topic.

- **t01** concept, steps and importance of organising (19)
- **t02** functional and divisional structures (20)
- **t03** formal and informal organisation (14)
- **t04** delegation (authority, responsibility, accountability) and decentralisation, including how the two differ (23)

### Decks

**Part 1** (19 slides): what organising is, the four steps, importance, organisation structure, the functional structure (SVG chart, merits and limits), the divisional structure (SVG chart, merits and limits), and a comparison of the two.
- Worked examples: an imagined Guwahati events firm applying the four steps; choosing a structure for two imagined firms.
- 4 check slides.

**Part 2** (20 slides): formal and informal organisation (features, merits, limits, comparison), delegation and its elements (SVG of authority flowing down, responsibility and accountability flowing up), importance of delegation, decentralisation (SVG pyramid of levels), importance of decentralisation, and delegation compared with decentralisation.
- Worked examples: classifying formal and informal lines from an imagined call centre; naming the element of delegation in an imagined dairy manager's instructions.
- 4 check slides.

Across both decks, 30 of 39 slides carry a visual: 4 SVG, 21 tables and 5 flows. Narration is at most 72 words per slide and contains no symbols.

### Question bank (76 items)

| Type | Count |
|---|---|
| mcq | 32 (keys a8 b8 c8 d8) |
| assertion-reason | 8 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering | 1 |
| short, 2 marks | 9 |
| short, 3 marks | 7 |
| long, 5 marks | 6 |
| case-based | 5 |

The five case-based items are Mithaas Sweets (steps), Narmada Agro (choice of structure), Kaveri Pumps (formal and informal), Sanjeevani Hospital (elements of delegation) and Pahadi Mart (decentralisation). Each asks the student to quote lines and name concepts, and each has an internal choice in part (c).

There are no numericals, because the chapter has no quantitative content.

- **Difficulty:** d1 16, d2 34, d3 22, d4 4.
- **Competency:** 51% of items are application or above (lint band 45–65%).

**Tests:** the short and long tests are disjoint and use no deck-check item. Items not used in either test include:
- the cases Mithaas Sweets and Kaveri Pumps
- the long answer `l_div_merits`
- several shorts

## Facts and originality

- Only standard textbook concepts are used, written in SOYL's own words. There are no statistics and no real company cases.
- Every firm, person and passage is imagined and labelled: Mithaas Sweets, Narmada Agro, Kaveri Pumps, Sanjeevani Hospital, Pahadi Mart, Utsav Events and others.
- No NCERT text, case or exercise and no board or sample-paper item is reused (D-036).
- The build found no exact stem duplicate against any other authored chapter.

## For a reviewer to check

- **Conventions:** the chapter follows these classroom conventions:
  - responsibility flows upward
  - accountability cannot be delegated
  - decentralisation is an optional policy and delegation is compulsory
  - span of management is mentioned once, as a related idea only, and no question tests it
- **SVG labels:** they were placed by coordinates and have not been seen rendered. Check them at 360 px on staging.
