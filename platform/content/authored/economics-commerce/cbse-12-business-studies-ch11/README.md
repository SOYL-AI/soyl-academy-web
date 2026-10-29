# CBSE Class 12 Business Studies, Chapter 11 — Marketing Management

`cbse-12-business-studies-ch11` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters. It is built from `src/`: run `npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch11/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 21 slides with 32 visuals (2 SVG, the rest tables and flows); 6 notes sections; 30 flashcards; 77 questions worth 141 marks, including 15 case parts and alternatives |
| `tests.json` | `t_cbse12businessstudies_ch11_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12businessstudies_ch11_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based. |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce authoring library, identical in every chapter), `questions.mjs`, `build.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** market, marketing, marketing vs selling, functions, the five philosophies (20 tags)
- **t02** marketing mix; product, branding, packaging (levels, functions, importance), labelling (15 tags)
- **t03** factors affecting price determination (10 tags)
- **t04** physical distribution: channels (zero to three levels), choice of channel, components (12 tags)
- **t05** promotion mix: advertising (merits, limitations, objections), personal selling, sales promotion, public relations (17 tags)

### Decks

- **Part 1:** marketing, philosophies and product. 20 slides, 4 checks, 2 worked examples.
- **Part 2:** price, place and promotion. 21 slides, 4 checks, 3 worked examples.
- Narration is at most 69 words per slide (mean 49) and uses no symbols.

### Question bank (77 items)

| Type | Count |
|---|---|
| mcq | 33 |
| assertion-reason | 6 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| numerical | 3 |
| short 2-mark | 7 |
| short 3-mark | 7 |
| long 5-mark | 6 |
| case-based | 5, each with an internal choice |

- **Difficulty:** d1 7, d2 41, d3 27, d4 2.
- **Competency:** recall 4, understanding 28, application 34, analysis 9, evaluation 2. That puts 58% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a8 b9 c8 d8; assertion-reason keys are a, c, b, a, a, d.

## Data and facts

- **Imagined figures, computed and asserted in `questions.mjs`:**
  - cost-plus price of a pressure cooker: (2,00,000 + 150 × 2,000) ÷ 2,000 = ₹250, plus 20 per cent = ₹300
  - a quantity gift of 20 per cent extra on a 500 g pack
  - a two-level shoe channel (factory price plus wholesaler and retailer margins)
  - a tiffin-box price set between cost and the rivals' price band
- **Real facts:** only the standard textbook classifications are used (philosophies, functions, packaging levels, price factors, channels, promotion tools). There are no dates or statistics.
- **Originality:** every firm, brand and person is imagined, and no real brand is named. No NCERT text, example or exercise and no board or sample-paper item is reused (D-036).

## For a reviewer

- `ar` on packaging is keyed (b). Protection is true but is not the reason packaging became a *marketing* tool; that reason is self-service, product differentiation and so on.
- Nobody has seen the SVG labels (the price band and the channel levels) rendered. They should be checked at 360 px on staging.
- This README was finished by the parent producer after the authoring fork was cut off by a session limit. The build output and the gates were re-run after that.
