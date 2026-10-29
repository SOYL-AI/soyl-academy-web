# CBSE Class 12 Business Studies, Chapter 3 — Business Environment

`cbse-12-business-studies-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters. It is built from `src/`: from `platform/`, run `npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch03/src/build.mjs`.

The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, the narration rules and the editorial counts;
- scans for answer leaks;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (17 + 18 slides), notes (6 sections), 32 flashcards, 66 questions (121 marks; 15 case parts and alternatives) |
| `tests.json` | `chapter-test-short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `chapter-test-long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item including the internal-choice groups. The two tests are disjoint and use no deck-check item; Section D is case-based in both. |
| `src/` | `lib.mjs` (identical copy of the CBSE 12 Economics lib), `questions.mjs`, `build.mjs` |

## Scope

The chapter covers syllabus topics t01–t03:
- **t01:** concept, the seven features and the six benefits of understanding the business environment.
- **t02:** the five dimensions (economic, social, technological, political, legal), including the political vs legal distinction and inter-relatedness across dimensions.
- **t03:** demonetisation: concept, features, and its short- and longer-term effects on business, in neutral wording.

The deleted topic, liberalisation, privatisation and globalisation as an impact on business, is **not** taught.

### Decks
- **Part 1** (17 slides): meaning; specific vs general forces (an SVG ring diagram); features in two tables; an inter-relatedness chain; importance (opportunities and threats, then the other four benefits); the response cycle.
  - Worked examples: spotting features in lines from an imagined Channapatna toy maker; applying the benefits to an imagined Anand dairy.
  - 4 checks.
- **Part 2** (18 slides): the five dimensions, each with an example table or flow; political vs legal; one change rippling across dimensions; demonetisation facts, features and effects.
  - Worked examples: classifying four changes for an imagined Darjeeling tea company; an imagined chemist's cash and digital receipts (an SVG stacked bar, shares computed).
  - 4 checks.
- **Visuals:** 25 of 35 slides carry one: 2 SVG, 17 tables and 6 flows. Narration runs to at most 70 words per slide and uses no symbols.

### Question bank (66 items)

| Type | Count |
|---|---|
| mcq | 23 |
| assertion-reason | 7 |
| true-false | 5 |
| fill-blank | 4 |
| match | 2 |
| ordering | 1 |
| numerical | 1 |
| short 2-mark | 8 |
| short 3-mark | 5 |
| long 5-mark | 5 |
| case-based | 5 |

- **Case-based items:** Saanjh Handlooms, Vidyut Motors, Shree Ganesh Traders (with a table), Kesar Foods and Tarang Water Purifiers. Every case asks students to quote lines and identify the feature, benefit or dimension, and each has an internal choice in part (c).
- **Difficulty:** d1 8, d2 31, d3 23, d4 4.
- **Competency:** 58% of items are at application or above (lint band 45–65%). I moved two routine one-step classification items to "understanding" under the D-035 rule.
- **Answer keys:** MCQ a6 b5 c6 d6; assertion-reason a3 b1 c1 d2.

## Facts and data
- **The only dated facts:** demonetisation was announced on **8 November 2016** and withdrew the legal-tender status of the then existing **₹500 and ₹1,000** notes. GST (1 July 2017) is named only to warn against confusing the two.
- **Demonetisation features** are the commonly taught ones: tax administration measure, curbing black money and counterfeit notes, push to a less-cash digital economy, formalisation of savings. No statistics or verdicts are given.
- **Figures:** all are imagined and computed in the build, with assertions:
  - the chemist's digital share is 30/200 = 15 per cent before and 80/200 = 40 per cent after;
  - the wholesaler's is 40/400 = 10 per cent and 190/400 = 47.5 per cent.
- **Originality:** every firm, person, town and case is imagined and labelled as such. No NCERT text, example or exercise and no board or sample-paper item is reused. The demonetisation stems are worded differently from the CBSE 12 Economics ch08 items, to avoid `bank.duplicate`.

## For a reviewer
- **Political vs legal:** the classification follows the usual textbook line. A binding rule or a court decision is **legal**; stability, law and order and the government's attitude are **political**. `m_legal_vs_pol` and `s3_pol_legal` test this.
- **`cb_tarang` (c)(i)** accepts either "opportunity" or "threat" for the new purifier design, provided the reasoning is sound.
- **SVG labels** were placed by coordinates and checked by script for overflow and overlap, but nobody has seen them rendered. They should be viewed at 360 px on staging; the ring diagram is the denser of the two.
